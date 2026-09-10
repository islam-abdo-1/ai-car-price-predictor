# AI Car Price Predictor

A sophisticated Machine Learning application for vehicle price prediction built during the **NTI Summer Training Program 2026** (120 Hours Graduation Project).

## 🎯 Project Overview

This application predicts vehicle market prices using trained ML regression models (Ridge, Random Forest, Gradient Boosting, SVR) based on vehicle specifications. Deployed with a modern React frontend on Vercel and FastAPI backend on FastAPI Cloud.

**Live Demo:**
- **Frontend:** https://ai-car-price-predictor.vercel.app
- **Backend API:** https://ai-car-price-predictor-74bc575d.fastapicloud.dev

---

## ✨ Features

- **Multiple ML Models**: Switch between Ridge Regression, Random Forest, Gradient Boosting, and SVR
- **Real-time GBP (£) Predictions**: Currency-formatted results with model attribution
- **Dynamic Form Validation**: Dependent dropdowns (models per manufacturer) with Zod schema
- **Interactive Team Section**: Flip cards showing assigned roles (front) and skills (back)
- **Dark-themed Professional UI**: Tailwind CSS with custom design system
- **Fully Responsive**: Mobile-first with Side Drawer navigation
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI Library |
| Vite | 5 | Build Tool |
| Tailwind CSS | 3 | Styling |
| React Router | 6 | Routing |
| React Hook Form | 7 | Form Management |
| Zod | 3 | Schema Validation |
| Headless UI | 1 | Accessible Components |

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI | API Framework |
| scikit-learn | ML Models (Ridge, RF, GB, SVR) |
| Pandas / NumPy | Data Processing |
| Joblib | Model Serialization |

### Deployment
| Platform | Role |
|----------|------|
| Vercel | Frontend Hosting + SPA Rewrites |
| FastAPI Cloud | Backend API Hosting |
| GitHub Actions | CI/CD (planned) |

---

## 🤖 ML Models

| Model | ID | Algorithm | Preprocessing |
|-------|-----|-----------|---------------|
| Ridge Regression | `ridge` | L2-regularized Linear Regression | StandardScaler + OneHotEncoder |
| Random Forest | `random_forest` | Ensemble of Decision Trees | StandardScaler + OneHotEncoder |
| Gradient Boosting | `gradient_boosting` | Gradient Boosted Trees | StandardScaler + OneHotEncoder |
| SVR | `svr` | Support Vector Regression | **Separate**: StandardScaler on 5 numeric features only |

**Features:** `mileage, tax, mpg, engineSize, car_age` (numeric) + `model, transmission, fuelType, Make` (categorical)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API info & links |
| `GET` | `/health` | Health check |
| `POST` | `/predict` | Price prediction |
| `GET` | `/models/metrics` | Model evaluation metrics |
| `GET` | `/models/info` | Models & features info |

**Request Example:**
```json
{
  "manufacturer": "Toyota",
  "model": "Corolla",
  "productionYear": 2020,
  "mileage": 50000,
  "engineVolume": 1.8,
  "fuelType": "Petrol",
  "gearboxType": "Automatic",
  "predictionModel": "random_forest"
}
```

---

## 👥 Team — NTI Summer Training Program 2026

| Member | Role | Skills | Assigned Roles | GitHub |
|--------|------|--------|----------------|--------|
| **Yusuf Lotfy** | Team Lead | Communication & Computer Engineer | Team Lead, Data Cleaning, Data Processing, Ridge Regression | [@Yusuf-Lotfy](https://github.com/Yusuf-Lotfy) |
| **Lotfy El Shazly** | Data Cleaning | Machine Learning Engineer, Data Scientist | Data Cleaning, Data Processing, Ridge Regression | [@lotfynsr-creator](https://github.com/lotfynsr-creator) |
| **Islam Abdo** | UI | Full-Stack Developer, Machine Learning & AI Engineer, Random Forest | UI, Deployment, Data Cleaning, Random Forest | [@islam-abdo-1](https://github.com/islam-abdo-1) |
| **Mohamed Hussein** | Random Forest | Machine Learning Engineer | Random Forest | [@mohamedmhmh123456789-sys](https://github.com/mohamedmhmh123456789-sys) |
| **Mahmoud El Shafiy** | SVR (Support Vector Regression) | Machine Learning Engineer, Full-Stack Developer | SVR | [@shaf3iiiii](https://github.com/shaf3iiiii) |
| **Mosab Ahmed** | Gradient Boosting | Machine Learning | Gradient Boosting | [@mosab06](https://github.com/mosab06) |

---

## 📁 Project Structure

```
ai-car-price-predictor/
├── src/
│   ├── components/
│   │   ├── forms/           # Form sections
│   │   ├── layout/          # Layout wrapper (Navbar, Footer)
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── utils/               # Constants, validation, formatters
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── backend/                 # FastAPI backend
│   ├── main.py
│   ├── train_models.py
│   └── model_artifacts/
├── public/                  # Static assets
└── README.md
```

---

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

---

## ⚙️ Environment Variables

Create `.env` in project root:
```env
VITE_API_URL=https://ai-car-price-predictor-74bc575d.fastapicloud.dev
```

---

## 📄 License

This project was developed as part of the **NTI Summer Training Program 2026** graduation project (120 hours). All rights reserved.