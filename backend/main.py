"""
FastAPI Backend for AI Car Price Prediction
Loads trained models and serves predictions via REST API
"""
import os
import json
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ==========================================
# CONFIGURATION
# ==========================================
ARTIFACTS_DIR = Path(__file__).parent / "model_artifacts"

# ==========================================
# LOAD ARTIFACTS AT STARTUP
# ==========================================
print("Loading model artifacts...")

# Preprocessor (for Ridge, RF, GB)
preprocessor = joblib.load(ARTIFACTS_DIR / "preprocessor.joblib")

# Models
ridge_model = joblib.load(ARTIFACTS_DIR / "ridge_model.joblib")
rf_model = joblib.load(ARTIFACTS_DIR / "rf_model.joblib")
gb_model = joblib.load(ARTIFACTS_DIR / "gb_model.joblib")

# SVR (separate scaler and features)
svr_model = joblib.load(ARTIFACTS_DIR / "svr_model.joblib")
svr_scaler = joblib.load(ARTIFACTS_DIR / "svr_scaler.joblib")

# Feature info
with open(ARTIFACTS_DIR / "feature_info.json") as f:
    feature_info = json.load(f)

# Imputation data
with open(ARTIFACTS_DIR / "imputation_data.json") as f:
    imputation_data = json.load(f)

# Mappings
with open(ARTIFACTS_DIR / "mappings.json") as f:
    mappings = json.load(f)

# Model metrics
with open(ARTIFACTS_DIR / "model_metrics.json") as f:
    model_metrics = json.load(f)

print("All artifacts loaded successfully!")

# ==========================================
# MAPPING DICTIONARIES
# ==========================================
MANUFACTURER_MAPPING = mappings["manufacturer_mapping"]
FUEL_TYPE_MAPPING = mappings["fuel_type_mapping"]
GEARBOX_MAPPING = mappings["gearbox_mapping"]

# Reverse mapping for display
MODEL_DISPLAY_NAMES = {
    "ridge": "Ridge Regression",
    "random_forest": "Random Forest",
    "gradient_boosting": "Gradient Boosting",
    "svr": "SVR",
}

# ==========================================
# IMPUTATION HELPER
# ==========================================
def get_tax_imputation(make: str, fuel_type: str, transmission: str) -> float:
    """Hierarchical tax imputation: make+fuel+trans -> make+fuel -> make -> fuel -> trans -> global"""
    tax = imputation_data["tax"]
    
    # Level 1: Make + Fuel + Transmission
    key = f"('{make}', '{fuel_type}', '{transmission}')"
    if key in tax["by_make_fuel_trans"]:
        return tax["by_make_fuel_trans"][key]
    
    # Level 2: Make + Fuel
    key = f"('{make}', '{fuel_type}')"
    if key in tax["by_make_fuel"]:
        return tax["by_make_fuel"][key]
    
    # Level 3: Make only
    if make in tax["by_make"]:
        return tax["by_make"][make]
    
    # Level 4: Fuel only
    if fuel_type in tax["by_fuel"]:
        return tax["by_fuel"][fuel_type]
    
    # Level 5: Transmission only
    if transmission in tax["by_trans"]:
        return tax["by_trans"][transmission]
    
    # Level 6: Global
    return tax["global"]


def get_mpg_imputation(make: str, fuel_type: str, transmission: str) -> float:
    """Hierarchical MPG imputation: make+fuel+trans -> make+fuel -> make -> fuel -> trans -> global"""
    mpg = imputation_data["mpg"]
    
    # Level 1: Make + Fuel + Transmission
    key = f"('{make}', '{fuel_type}', '{transmission}')"
    if key in mpg["by_make_fuel_trans"]:
        return mpg["by_make_fuel_trans"][key]
    
    # Level 2: Make + Fuel
    key = f"('{make}', '{fuel_type}')"
    if key in mpg["by_make_fuel"]:
        return mpg["by_make_fuel"][key]
    
    # Level 3: Make only
    if make in mpg["by_make"]:
        return mpg["by_make"][make]
    
    # Level 4: Fuel only
    if fuel_type in mpg["by_fuel"]:
        return mpg["by_fuel"][fuel_type]
    
    # Level 5: Transmission only
    if transmission in mpg["by_trans"]:
        return mpg["by_trans"][transmission]
    
    # Level 6: Global
    return mpg["global"]


# ==========================================
# REQUEST/RESPONSE MODELS
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
    models_loaded: list
    timestamp: str


# ==========================================
# FASTAPI APP
# ==========================================
app = FastAPI(
    title="AI Car Price Predictor API",
    description="Machine Learning API for vehicle price prediction",
    version="1.0.0",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# PREDICTION LOGIC
# ==========================================
def map_frontend_to_ml(data: PredictionRequest) -> dict:
    """Map frontend form fields to ML model features"""
    
    # Map manufacturer
    make = MANUFACTURER_MAPPING.get(data.manufacturer.lower(), data.manufacturer)
    
    # Map fuel type
    fuel_type = FUEL_TYPE_MAPPING.get(data.fuelType, "Petrol")
    
    # Map gearbox
    transmission = GEARBOX_MAPPING.get(data.gearboxType, "Manual")
    
    # Calculate car_age (2026 - productionYear)
    car_age = 2026 - data.productionYear
    
    # Get imputed tax and mpg
    tax = get_tax_imputation(make, fuel_type, transmission)
    mpg = get_mpg_imputation(make, fuel_type, transmission)
    
    # Model name - use as-is (OneHotEncoder handles unknown)
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
    """Run prediction using specified model"""
    
    # Create DataFrame with correct column order
    if model_name == "svr":
        # SVR uses only numerical features
        svr_features = feature_info["svr_features"]
        X = pd.DataFrame([[features[f] for f in svr_features]], columns=svr_features)
        X_scaled = svr_scaler.transform(X)
        prediction = svr_model.predict(X_scaled)[0]
    else:
        # Tree-based models use full preprocessor
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
        status="ok",
        models_loaded=list(MODEL_DISPLAY_NAMES.keys()),
        timestamp=datetime.utcnow().isoformat(),
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        # Map frontend fields to ML features
        features = map_frontend_to_ml(request)
        
        # Run prediction
        model_key = request.predictionModel
        if model_key not in MODEL_DISPLAY_NAMES:
            raise HTTPException(status_code=400, detail=f"Invalid model: {model_key}")
        
        predicted_price = predict_price(features, model_key)
        
        # Build response
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
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/models/metrics")
async def get_model_metrics():
    return model_metrics


@app.get("/models/info")
async def get_model_info():
    return {
        "models": MODEL_DISPLAY_NAMES,
        "features": feature_info,
        "target_currency": "GBP",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)