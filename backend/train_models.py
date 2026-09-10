"""
Training script that replicates TIPS.py exactly and serializes all models for deployment.
"""
import pandas as pd
import numpy as np
import joblib
import json
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

# ==========================================
# 1. LOAD AND CLEAN DATA (Cells 1-6 from TIPS.py)
# ==========================================
print("Loading dataset...")
df = pd.read_csv(r'C:\Users\islam\OneDrive\Desktop\NTI_UI\car_price.csv')

print("Dataset Shape:", df.shape)

# Drop duplicates
df = df.drop_duplicates()

# Handle missing target variable
df = df.dropna(subset=['price'])

# Impute categorical missing values using mode
categorical_cols = ['model', 'transmission', 'fuelType', 'Make']
for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        mode_val = df[col].mode()[0]
        df[col] = df[col].fillna(mode_val)

# Impute numerical missing values using median
numerical_cols = ['year', 'mileage', 'tax', 'mpg', 'engineSize']
for col in numerical_cols:
    if df[col].isnull().sum() > 0:
        median_val = df[col].median()
        df[col] = df[col].fillna(median_val)

# Clean up string formatting
df['model'] = df['model'].str.strip()

# Clean logically impossible entries
df = df[df['engineSize'] > 0]
df = df[df['mpg'] > 0]

# Cap outliers using 1.5 * IQR Rule (Winsorization)
iqr_features = ['price', 'mileage', 'mpg', 'tax']
for col in iqr_features:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    df[col] = np.where(df[col] > upper_bound, upper_bound, df[col])

print(f"Cleaned dataset shape: {df.shape}")

# ==========================================
# 2. FEATURE ENGINEERING (Cell 7 from TIPS.py)
# ==========================================
df['car_age'] = 2026 - df['year']
df = df.drop(columns=['year'])

# Separate Features (X) and Target (y)
X = df.drop(columns=['price'])
y = df['price']

# Define feature types (EXACT from TIPS.py)
num_features = ['mileage', 'tax', 'mpg', 'engineSize', 'car_age']
cat_features = ['model', 'transmission', 'fuelType', 'Make']

# Build Preprocessing Pipeline (EXACT from TIPS.py)
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_features),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), cat_features)
    ]
)

# Train-Test Split (EXACT from TIPS.py)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Fit & Transform Data
print("Fitting preprocessor...")
X_train_preprocessed = preprocessor.fit_transform(X_train)
X_test_preprocessed = preprocessor.transform(X_test)

print(f"X_train shape after preprocessing: {X_train_preprocessed.shape}")
print(f"X_test shape after preprocessing: {X_test_preprocessed.shape}")

# ==========================================
# 3. TRAIN MODELS (Cells 8, 10 from TIPS.py)
# ==========================================
models = {}
results = {}

# --- Ridge Regression ---
print("\nTraining Ridge Regression...")
ridge = Ridge(alpha=1.0)
ridge.fit(X_train_preprocessed, y_train)
ridge_preds = ridge.predict(X_test_preprocessed)
models['ridge'] = ridge
results['Ridge Regression'] = {
    'R2 Score': round(r2_score(y_test, ridge_preds), 4),
    'RMSE': round(np.sqrt(mean_squared_error(y_test, ridge_preds)), 2),
    'MAE': round(mean_absolute_error(y_test, ridge_preds), 2)
}

# --- Random Forest ---
print("Training Random Forest...")
rf = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)
rf.fit(X_train_preprocessed, y_train)
rf_preds = rf.predict(X_test_preprocessed)
models['random_forest'] = rf
results['Random Forest'] = {
    'R2 Score': round(r2_score(y_test, rf_preds), 4),
    'RMSE': round(np.sqrt(mean_squared_error(y_test, rf_preds)), 2),
    'MAE': round(mean_absolute_error(y_test, rf_preds), 2)
}

# --- Gradient Boosting ---
print("Training Gradient Boosting...")
gb = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42)
gb.fit(X_train_preprocessed, y_train)
gb_preds = gb.predict(X_test_preprocessed)
models['gradient_boosting'] = gb
results['Gradient Boosting'] = {
    'R2 Score': round(r2_score(y_test, gb_preds), 4),
    'RMSE': round(np.sqrt(mean_squared_error(y_test, gb_preds)), 2),
    'MAE': round(mean_absolute_error(y_test, gb_preds), 2)
}

# --- SVR (separate preprocessing as in TIPS.py Cell 10) ---
print("Training SVR (using separate StandardScaler on numerical features only)...")
# SVR uses only numerical features: car_age, mileage, tax, mpg, engineSize
svr_features = ['car_age', 'mileage', 'tax', 'mpg', 'engineSize']
X_svr = df[svr_features]
y_svr = df['price']

X_svr_train, X_svr_test, y_svr_train, y_svr_test = train_test_split(
    X_svr, y_svr, test_size=0.2, random_state=42
)

svr_scaler = StandardScaler()
X_svr_train_scaled = svr_scaler.fit_transform(X_svr_train)
X_svr_test_scaled = svr_scaler.transform(X_svr_test)

svr_model = SVR(kernel='rbf', C=1000, gamma='scale')
print("Training SVR model (this may take a moment)...")
# Train on subset as in TIPS.py (first 10000 samples)
train_subset = min(10000, len(X_svr_train_scaled))
svr_model.fit(X_svr_train_scaled[:train_subset], y_svr_train[:train_subset])

svr_preds = svr_model.predict(X_svr_test_scaled)
models['svr'] = svr_model
models['svr_scaler'] = svr_scaler
models['svr_features'] = svr_features
results['SVR'] = {
    'R2 Score': round(r2_score(y_svr_test, svr_preds), 4),
    'RMSE': round(np.sqrt(mean_squared_error(y_svr_test, svr_preds)), 2),
    'MAE': round(mean_absolute_error(y_svr_test, svr_preds), 2)
}

# ==========================================
# 4. PRINT RESULTS
# ==========================================
print("\n" + "="*60)
print("MODEL PERFORMANCE METRICS")
print("="*60)
results_df = pd.DataFrame(results).T
print(results_df)
print("="*60)

# ==========================================
# 5. COMPUTE IMPUTATION TABLES FOR TAX/MPG
# ==========================================
print("\nComputing imputation tables...")

# Tax imputation: hierarchical fallback
tax_by_make_fuel_trans = df.pivot_table(
    values='tax', index='Make', columns=['fuelType', 'transmission'], 
    aggfunc='median'
).to_dict()

tax_by_make_fuel = df.groupby(['Make', 'fuelType'])['tax'].median().to_dict()
tax_by_make = df.groupby('Make')['tax'].median().to_dict()
tax_by_fuel = df.groupby('fuelType')['tax'].median().to_dict()
tax_by_trans = df.groupby('transmission')['tax'].median().to_dict()
tax_global = df['tax'].median()

# MPG imputation: hierarchical fallback
mpg_by_make_fuel_trans = df.pivot_table(
    values='mpg', index='Make', columns=['fuelType', 'transmission'], 
    aggfunc='median'
).to_dict()

mpg_by_make_fuel = df.groupby(['Make', 'fuelType'])['mpg'].median().to_dict()
mpg_by_make = df.groupby('Make')['mpg'].median().to_dict()
mpg_by_fuel = df.groupby('fuelType')['mpg'].median().to_dict()
mpg_by_trans = df.groupby('transmission')['mpg'].median().to_dict()
mpg_global = df['mpg'].median()

imputation_data = {
    'tax': {
        'by_make_fuel_trans': {str(k): v for k, v in tax_by_make_fuel_trans.items()},
        'by_make_fuel': {str(k): v for k, v in tax_by_make_fuel.items()},
        'by_make': {str(k): v for k, v in tax_by_make.items()},
        'by_fuel': {str(k): v for k, v in tax_by_fuel.items()},
        'by_trans': {str(k): v for k, v in tax_by_trans.items()},
        'global': float(tax_global)
    },
    'mpg': {
        'by_make_fuel_trans': {str(k): v for k, v in mpg_by_make_fuel_trans.items()},
        'by_make_fuel': {str(k): v for k, v in mpg_by_make_fuel.items()},
        'by_make': {str(k): v for k, v in mpg_by_make.items()},
        'by_fuel': {str(k): v for k, v in mpg_by_fuel.items()},
        'by_trans': {str(k): v for k, v in mpg_by_trans.items()},
        'global': float(mpg_global)
    }
}

# ==========================================
# 6. CREATE MAPPING DICTIONARIES
# ==========================================
# Frontend manufacturer -> Dataset Make mapping
manufacturer_mapping = {
    'audi': 'audi',
    'bmw': 'BMW',
    'ford': 'Ford',
    'volkswagen': 'vw',
    'toyota': 'toyota',
    'skoda': 'skoda',
    'hyundai': 'Hyundai',
}

# Frontend fuelType -> Dataset fuelType mapping
fuel_type_mapping = {
    'Petrol': 'Petrol',
    'Diesel': 'Diesel',
    'Hybrid': 'Hybrid',
    'Plug-in Hybrid': 'Hybrid',
    'Electric': 'Electric',
    'CNG': 'Other',
    'LPG': 'Other',
}

# Frontend gearboxType -> Dataset transmission mapping
gearbox_mapping = {
    'Automatic': 'Automatic',
    'Manual': 'Manual',
    'CVT': 'Automatic',
    'DSG': 'Automatic',
    'Tiptronic': 'Automatic',
    'Semi-Automatic': 'Semi-Auto',
}

# ==========================================
# 7. SAVE ALL ARTIFACTS
# ==========================================
output_dir = Path('model_artifacts')
output_dir.mkdir(parents=True, exist_ok=True)

print(f"\nSaving artifacts to {output_dir}...")

joblib.dump(preprocessor, output_dir / 'preprocessor.joblib')
print("Saved preprocessor.joblib")

joblib.dump(models['ridge'], output_dir / 'ridge_model.joblib')
print("Saved ridge_model.joblib")

joblib.dump(models['random_forest'], output_dir / 'rf_model.joblib')
print("Saved rf_model.joblib")

joblib.dump(models['gradient_boosting'], output_dir / 'gb_model.joblib')
print("Saved gb_model.joblib")

joblib.dump(models['svr'], output_dir / 'svr_model.joblib')
joblib.dump(models['svr_scaler'], output_dir / 'svr_scaler.joblib')
print("Saved svr_model.joblib and svr_scaler.joblib")

feature_info = {
    'num_features': num_features,
    'cat_features': cat_features,
    'svr_features': svr_features,
    'target': 'price',
    'target_currency': 'GBP'
}
with open(output_dir / 'feature_info.json', 'w') as f:
    json.dump(feature_info, f, indent=2)
print("Saved feature_info.json")

with open(output_dir / 'imputation_data.json', 'w') as f:
    json.dump(imputation_data, f, indent=2)
print("Saved imputation_data.json")

mappings = {
    'manufacturer_mapping': manufacturer_mapping,
    'fuel_type_mapping': fuel_type_mapping,
    'gearbox_mapping': gearbox_mapping,
}
with open(output_dir / 'mappings.json', 'w') as f:
    json.dump(mappings, f, indent=2)
print("Saved mappings.json")

with open(output_dir / 'model_metrics.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Saved model_metrics.json")

dataset_categories = {
    'makes': sorted(df['Make'].dropna().unique().tolist()),
    'transmissions': sorted(df['transmission'].dropna().unique().tolist()),
    'fuel_types': sorted(df['fuelType'].dropna().unique().tolist()),
    'models': sorted(df['model'].dropna().unique().tolist()),
}
with open(output_dir / 'dataset_categories.json', 'w') as f:
    serializable = {k: [str(v) for v in vals] for k, vals in dataset_categories.items()}
    json.dump(serializable, f, indent=2)
print("Saved dataset_categories.json")

print("\n" + "="*60)
print("TRAINING COMPLETE - ALL ARTIFACTS SAVED")
print("="*60)
print(f"Output directory: {output_dir.absolute()}")
print("\nModel Metrics Summary:")
for model_name, metrics in results.items():
    print(f"  {model_name}: R2={metrics['R2 Score']}, RMSE=£{metrics['RMSE']}, MAE=£{metrics['MAE']}")