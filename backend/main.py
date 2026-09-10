"""
FastAPI Backend for AI Car Price Prediction
Loads trained models and serves predictions via REST API
"""
import os
import gc
import json
import joblib
import subprocess
import sys
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Optional
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ==========================================
# CONFIGURATION
# ==========================================
SCRIPT_DIR = Path(__file__).parent
ARTIFACTS_DIR = SCRIPT_DIR / "model_artifacts"

REQUIRED_FILES = [
    "preprocessor.joblib", "ridge_model.joblib", "rf_model.joblib",
    "gb_model.joblib", "svr_model.joblib", "svr_scaler.joblib",
    "feature_info.json", "imputation_data.json", "mappings.json", "model_metrics.json",
]

# ==========================================
# GLOBAL STATE
# ==========================================
models_loaded = False
preprocessor = None
ridge_model = None
rf_model = None
gb_model = None
svr_model = None
svr_scaler = None
feature_info = None
imputation_data = None
mappings = None
model_metrics = None

MANUFACTURER_MAPPING = {}
FUEL_TYPE_MAPPING = {}
GEARBOX_MAPPING = {}

MODEL_DISPLAY_NAMES = {
    "ridge": "Ridge Regression",
    "random_forest": "Random Forest",
    "gradient_boosting": "Gradient Boosting",
    "svr": "SVR",
}


def load_models():
    """Load trained models and metadata from disk."""
    global models_loaded, preprocessor, ridge_model, rf_model, gb_model
    global svr_model, svr_scaler, feature_info, imputation_data, mappings, model_metrics
    global MANUFACTURER_MAPPING, FUEL_TYPE_MAPPING, GEARBOX_MAPPING

    print("Loading model artifacts...")
    preprocessor = joblib.load(ARTIFACTS_DIR / "preprocessor.joblib")
    ridge_model = joblib.load(ARTIFACTS_DIR / "ridge_model.joblib")
    rf_model = joblib.load(ARTIFACTS_DIR / "rf_model.joblib")
    gb_model = joblib.load(ARTIFACTS_DIR / "gb_model.joblib")
    svr_model = joblib.load(ARTIFACTS_DIR / "svr_model.joblib")
    svr_scaler = joblib.load(ARTIFACTS_DIR / "svr_scaler.joblib")

    with open(ARTIFACTS_DIR / "feature_info.json") as f:
        feature_info = json.load(f)
    with open(ARTIFACTS_DIR / "imputation_data.json") as f:
        imputation_data = json.load(f)
    with open(ARTIFACTS_DIR / "mappings.json") as f:
        mappings = json.load(f)
    with open(ARTIFACTS_DIR / "model_metrics.json") as f:
        model_metrics = json.load(f)

    MANUFACTURER_MAPPING = mappings["manufacturer_mapping"]
    FUEL_TYPE_MAPPING = mappings["fuel_type_mapping"]
    GEARBOX_MAPPING = mappings["gearbox_mapping"]

    models_loaded = True
    print("All artifacts loaded successfully!")


def train_models():
    """Run the training script to produce model artifacts."""
    print("Model artifacts not found. Training models from scratch...")
    subprocess.run(
        [sys.executable, str(SCRIPT_DIR / "train_models.py")],
        check=True, cwd=str(SCRIPT_DIR),
    )
    gc.collect()
    print("Training complete!")


# ==========================================
# LIFESPAN — startup / shutdown
# ==========================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: train if needed, then load models. Shutdown: nothing."""
    # Train if artifacts are missing
    if not ARTIFACTS_DIR.exists() or not all((ARTIFACTS_DIR / f).exists() for f in REQUIRED_FILES):
        train_models()
    load_models()
    yield

# ==========================================
# FASTAPI APP (created FIRST so /health is available)
# ==========================================
app = FastAPI(
    title="AI Car Price Predictor API",
    description="Machine Learning API for vehicle price prediction",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# IMPUTATION HELPERS
# ==========================================
def get_tax_imputation(make: str, fuel_type: str, transmission: str) -> float:
    tax = imputation_data["tax"]
    for key in [
        f"('{make}', '{fuel_type}', '{transmission}')",
        f"('{make}', '{fuel_type}')",
    ]:
        if key in tax["by_make_fuel_trans"] if "('{make}', '{fuel_type}', '{transmission}')" in key else tax["by_make_fuel"]:
            pass
    # Level 1
    key1 = f"('{make}', '{fuel_type}', '{transmission}')"
    if key1 in tax["by_make_fuel_trans"]:
        return tax["by_make_fuel_trans"][key1]
    # Level 2
    key2 = f"('{make}', '{fuel_type}')"
    if key2 in tax["by_make_fuel"]:
        return tax["by_make_fuel"][key2]
    # Level 3
    if make in tax["by_make"]:
        return tax["by_make"][make]
    # Level 4
    if fuel_type in tax["by_fuel"]:
        return tax["by_fuel"][fuel_type]
    # Level 5
    if transmission in tax["by_trans"]:
        return tax["by_trans"][transmission]
    # Level 6
    return tax["global"]


def get_mpg_imputation(make: str, fuel_type: str, transmission: str) -> float:
    mpg = imputation_data["mpg"]
    key1 = f"('{make}', '{fuel_type}', '{transmission}')"
    if key1 in mpg["by_make_fuel_trans"]:
        return mpg["by_make_fuel_trans"][key1]
    key2 = f"('{make}', '{fuel_type}')"
    if key2 in mpg["by_make_fuel"]:
        return mpg["by_make_fuel"][key2]
    if make in mpg["by_make"]:
        return mpg["by_make"][make]
    if fuel_type in mpg["by_fuel"]:
        return mpg["by_fuel"][fuel_type]
    if transmission in mpg["by_trans"]:
        return mpg["by_trans"][transmission]
    return mpg["global"]


# ==========================================
# REQUEST / RESPONSE MODELS
# ==========================================
class PredictionRequest(BaseModel):
    manufacturer: str
    model: str
    productionYear: int
    mileage: float
    engineVolume: float
    fuelType: str
    gearboxType: str
    turbo: bool = False
    cylinders: int = 4
    driveWheels: str = "Front"
    category: str = "Sedan"
    doors: int = 4
    wheel: str = "Left"
    color: str = "White"
    leatherInterior: bool = False
    airbags: int = 6
    predictionModel: str = "random_forest"


class PredictionResponse(BaseModel):
    predicted_price: float
    model: str
    currency: str = "GBP"
    timestamp: str
    inputSummary: dict


class HealthResponse(BaseModel):
    status: str
    models_loaded: bool
    timestamp: str


# ==========================================
# PREDICTION HELPERS
# ==========================================
def map_frontend_to_ml(data: PredictionRequest) -> dict:
    make = MANUFACTURER_MAPPING.get(data.manufacturer.lower(), data.manufacturer)
    fuel_type = FUEL_TYPE_MAPPING.get(data.fuelType, "Petrol")
    transmission = GEARBOX_MAPPING.get(data.gearboxType, "Manual")
    car_age = 2026 - data.productionYear
    tax = get_tax_imputation(make, fuel_type, transmission)
    mpg = get_mpg_imputation(make, fuel_type, transmission)
    model_name = data.model.strip()
    return {
        "mileage": data.mileage,
        "tax": tax,
        "mpg": mpg,
        "engineSize": data.engineVolume,
        "car_age": car_age,
        "model": model_name,
        "transmission": transmission,
        "fuelType": fuel_type,
        "Make": make,
    }


def predict_price(features: dict, model_name: str) -> float:
    if model_name == "svr":
        svr_features = feature_info["svr_features"]
        X = pd.DataFrame([[features[f] for f in svr_features]], columns=svr_features)
        X_scaled = svr_scaler.transform(X)
        prediction = svr_model.predict(X_scaled)[0]
    else:
        all_features = feature_info["num_features"] + feature_info["cat_features"]
        X = pd.DataFrame([[features[f] for f in all_features]], columns=all_features)
        X_processed = preprocessor.transform(X)
        if model_name == "ridge":
            prediction = ridge_model.predict(X_processed)[0]
        elif model_name == "random_forest":
            prediction = rf_model.predict(X_processed)[0]
        elif model_name == "gradient_boosting":
            prediction = gb_model.predict(X_processed)[0]
        else:
            raise ValueError(f"Unknown model: {model_name}")
    return max(0, round(prediction, 2))


# ==========================================
# ENDPOINTS
# ==========================================
@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok" if models_loaded else "loading",
        models_loaded=models_loaded,
        timestamp=datetime.utcnow().isoformat(),
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    if not models_loaded:
        raise HTTPException(status_code=503, detail="Models still loading. Please retry in a few seconds.")
    try:
        features = map_frontend_to_ml(request)
        model_key = request.predictionModel
        if model_key not in MODEL_DISPLAY_NAMES:
            raise HTTPException(status_code=400, detail=f"Invalid model: {model_key}")
        predicted_price = predict_price(features, model_key)
        return PredictionResponse(
            predicted_price=predicted_price,
            model=MODEL_DISPLAY_NAMES[model_key],
            currency="GBP",
            timestamp=datetime.utcnow().isoformat(),
            inputSummary={
                "manufacturer": request.manufacturer,
                "model": request.model,
                "productionYear": request.productionYear,
                "mileage": request.mileage,
            },
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/models/metrics")
async def get_model_metrics():
    if not models_loaded:
        raise HTTPException(status_code=503, detail="Models still loading.")
    return model_metrics


@app.get("/models/info")
async def get_model_info():
    if not models_loaded:
        raise HTTPException(status_code=503, detail="Models still loading.")
    return {
        "models": MODEL_DISPLAY_NAMES,
        "features": feature_info,
        "target_currency": "GBP",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
