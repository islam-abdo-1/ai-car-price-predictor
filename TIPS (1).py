
# ==========================================
# CELL 1: Imports & Data Loading
# ==========================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set visual styles
sns.set_theme(style="whitegrid")
plt.rcParams["figure.figsize"] = (10, 5)

# Load dataset
df = pd.read_csv('car_price.csv')

print("Dataset Shape:", df.shape)
print("\nData Types and Info:")
df.info()

# ==========================================
# CELL 2: Exploratory Data Analysis & Initial Inspection
# ==========================================
print("Missing Values Per Column:")
print(df.isnull().sum())

print("\nDuplicate Rows Count:", df.duplicated().sum())

print("\nSummary Statistics of Numerical Features:")
display(df.describe())

# ==========================================
# CELL 3: Visualizing Distributions and Missingness
# ==========================================
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Target Variable Distribution
sns.histplot(df['price'], bins=50, kde=True, ax=axes[0, 0], color='skyblue')
axes[0, 0].set_title("Price Distribution (Target Variable)")

# Mileage Distribution
sns.histplot(df['mileage'], bins=50, kde=True, ax=axes[0, 1], color='salmon')
axes[0, 1].set_title("Mileage Distribution")

# Year Distribution
sns.countplot(data=df, x='year', ax=axes[1, 0], palette='viridis')
axes[1, 0].set_title("Car Count by Year")
axes[1, 0].tick_params(axis='x', rotation=45)

# Fuel Type Count
sns.countplot(data=df, x='fuelType', ax=axes[1, 1], palette='magma')
axes[1, 1].set_title("Fuel Type Distribution")

plt.tight_layout()
plt.show()

# ==========================================
# CELL 4: Correlation Matrix & Heatmap Visualization
# ==========================================
import seaborn as sns
import matplotlib.pyplot as plt

# Feature Engineering: Vehicle Age
df['car_age'] = 2026 - df['year']

# Select numerical features for correlation analysis
num_cols = ['price', 'mileage', 'tax', 'mpg', 'engineSize', 'car_age']
corr_matrix = df[num_cols].corr()

plt.figure(figsize=(9, 7))
sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, linewidths=0.5)
plt.title("Numerical Feature Correlation Heatmap", fontsize=14)
plt.show()

# Print strongest relationships with price
print("Correlation with Target (Price):")
print(corr_matrix['price'].sort_values(ascending=False))

# ==========================================
# CELL 5: Data Cleaning (Null Values & Duplicates)
# ==========================================
# 1. Drop duplicate rows
df = df.drop_duplicates()

# 2. Handle missing target variable (price)
# Rows missing 'price' cannot be reliably used for supervised training
df = df.dropna(subset=['price'])

# 3. Impute categorical missing values using mode
categorical_cols = ['model', 'transmission', 'fuelType', 'Make']
for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        mode_val = df[col].mode()[0]
        df[col] = df[col].fillna(mode_val)

# 4. Impute numerical missing values using median (robust to skewness)
numerical_cols = ['year', 'mileage', 'tax', 'mpg', 'engineSize']
for col in numerical_cols:
    if df[col].isnull().sum() > 0:
        median_val = df[col].median()
        df[col] = df[col].fillna(median_val)

# Clean up string formatting (e.g., stripping spaces from model names)
df['model'] = df['model'].str.strip()

print("Missing values after cleaning:")
print(df.isnull().sum())
print("\nRemaining rows:", len(df))

# ==========================================
# CELL 6: Outlier Detection and Handling
# ==========================================
# Boxplots before capping outliers
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
sns.boxplot(y=df['price'], ax=axes[0], color='lightblue').set_title("Price Boxplot")
sns.boxplot(y=df['mileage'], ax=axes[1], color='lightgreen').set_title("Mileage Boxplot")
sns.boxplot(y=df['mpg'], ax=axes[2], color='pink').set_title("MPG Boxplot")
plt.tight_layout()
plt.show()

# Clean logically impossible entries (e.g., engineSize == 0 or mpg == 0)
df = df[df['engineSize'] > 0]
df = df[df['mpg'] > 0]

# Capping numerical outliers using 1.5 * IQR Rule (Winsorization)
iqr_features = ['price', 'mileage', 'mpg', 'tax']

for col in iqr_features:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Cap values at upper bound (keep lower bound at natural minimum 0)
    df[col] = np.where(df[col] > upper_bound, upper_bound, df[col])

print("Outliers capped successfully. Revised Summary Statistics:")
display(df[['price', 'mileage', 'mpg', 'tax']].describe())

# ==========================================
# CELL 7: Feature Engineering & Preprocessing for ML Models
# ==========================================
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# 1. Feature Engineering: Vehicle Age
df['car_age'] = 2026 - df['year']
df = df.drop(columns=['year'])

# 2. Separate Features (X) and Target (y)
X = df.drop(columns=['price'])
y = df['price']

# Define feature types
num_features = ['mileage', 'tax', 'mpg', 'engineSize', 'car_age']
cat_features = ['model', 'transmission', 'fuelType', 'Make']

# 3. Build Preprocessing Pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), num_features),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), cat_features)
    ]
)

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. Fit & Transform Data
X_train_preprocessed = preprocessor.fit_transform(X_train)
X_test_preprocessed = preprocessor.transform(X_test)

print("X_train shape after preprocessing:", X_train_preprocessed.shape)
print("X_test shape after preprocessing:", X_test_preprocessed.shape)
print("Data is fully preprocessed and ready for regression modeling!")

# ==========================================
# CELL 8: Model Training & Comparison Setup
# ==========================================
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
import pandas as pd
import numpy as np

# Initialize regression models
models = {
    'Ridge Regression': Ridge(alpha=1.0),
    'Random Forest': RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42)
}

# Dictionary to store performance metrics
results = {}

for name, model in models.items():
    # Fit model on transformed training data
    model.fit(X_train_preprocessed, y_train)

    # Predict on test data
    predictions = model.predict(X_test_preprocessed)

    # Calculate performance metrics
    r2 = r2_score(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    mae = mean_absolute_error(y_test, predictions)

    results[name] = {
        'R2 Score': round(r2, 4),
        'RMSE (£)': round(rmse, 2),
        'MAE (£)': round(mae, 2)
    }

# Display results comparison table
results_df = pd.DataFrame(results).T
display(results_df)

# ==========================================
# CELL 9: Visualizing Actual vs. Predicted Prices
# ==========================================
import matplotlib.pyplot as plt

# Best Model: Random Forest Predictions
best_model = models['Random Forest']
rf_preds = best_model.predict(X_test_preprocessed)

plt.figure(figsize=(9, 6))
plt.scatter(y_test, rf_preds, alpha=0.3, color='teal')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.xlabel("Actual Price (£)")
plt.ylabel("Predicted Price (£)")
plt.title("Random Forest: Actual vs Predicted Used Car Prices")
plt.show()

# ==========================================
# CELL 10: svr model
# ==========================================

from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

model_df = df.dropna(subset=['price', 'mileage', 'car_age', 'engineSize', 'tax', 'mpg']).copy()

X = model_df[['car_age', 'mileage', 'tax', 'mpg', 'engineSize']]
y = model_df['price']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

svr_model = SVR(kernel='rbf', C=1000, gamma='scale')
print("Training SVR model (this may take a moment due to dataset size)...")
svr_model.fit(X_train_scaled[:10000], y_train[:10000])

y_pred = svr_model.predict(X_test_scaled)

print("\n--- SVR Model Evaluation ---")
print("R2 Score:", r2_score(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
print("MAE:", mean_absolute_error(y_test, y_pred))