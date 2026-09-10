# AI Car Price Predictor

> Machine Learning-Based Vehicle Price Prediction

A modern, dark-themed web application for predicting car prices using machine learning models. Built as part of the NTI Summer Training Program graduation project.

## 🌟 Features

- **Multi-Model Prediction**: Choose between Random Forest, XGBoost, and CatBoost regression models
- **Comprehensive Vehicle Data**: Input manufacturer, model, year, specifications, and features
- **Smart Dropdowns**: Searchable manufacturer/model selection with dependent filtering
- **Real-time Validation**: Client-side form validation with Zod schemas
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Professional dark interface with blue accent colors
- **API Ready**: Clean service layer for easy backend integration
- **Mock Service**: Development-ready with realistic mock predictions

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Dark Mode)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **UI Components**: Headless UI (Combobox), Lucide React Icons
- **State**: React Context + Hooks

### Backend (Future - Phase 2)
- **API**: FastAPI or Flask
- **ML Models**: Scikit-learn, XGBoost, CatBoost
- **Deployment**: Docker, Cloud provider

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-car-price-predictor.git
cd ai-car-price-predictor

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_APP_NAME` | Application name | `AI Car Price Predictor` |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form sections
│   └── layout/          # Layout components
├── pages/               # Page components
├── services/            # API services (mock + real)
├── hooks/               # Custom React hooks
├── context/             # React Context providers
├── utils/               # Utilities (validation, formatters)
├── styles/              # Global styles
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── routes.jsx           # Routing configuration
```

## 🎨 Design System

### Colors
- **Background Primary**: `#0B0D0F`
- **Card Background**: `#14171A`
- **Input Background**: `#1C2024`
- **Border**: `#2A2F35`
- **Text Primary**: `#F5F5F5`
- **Text Secondary**: `#8B929A`
- **Accent**: `#3B82F6`
- **Button Primary**: `#2563EB`

### Typography
- **Font**: Inter (Google Fonts)
- **Display**: 56px
- **H1**: 36px
- **H2**: 24px
- **Body**: 16px

## 🔌 API Integration

The frontend uses a clean service abstraction layer:

```javascript
// services/api.js
export const predictionService = import.meta.env.DEV 
  ? mockPredictionService 
  : realPredictionService;
```

### Expected API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Get price prediction |
| `/metadata` | GET | Get dropdown options |
| `/health` | GET | Health check |

### Prediction Request
```json
{
  "manufacturer": "toyota",
  "model": "camry",
  "productionYear": 2020,
  "category": "Sedan",
  "mileage": 50000,
  "engineVolume": 2.5,
  "turbo": false,
  "cylinders": 4,
  "fuelType": "Petrol",
  "gearboxType": "Automatic",
  "driveWheels": "Front",
  "doors": 4,
  "wheel": "Left",
  "color": "White",
  "leatherInterior": true,
  "airbags": 6,
  "predictionModel": "xgboost"
}
```

### Prediction Response
```json
{
  "predicted_price": 24500,
  "model": "XGBoost",
  "currency": "USD",
  "timestamp": "2024-01-15T10:30:00Z",
  "inputSummary": { ... }
}
```

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

### Mock Data
The application includes realistic mock data for:
- 20+ car manufacturers
- Model lists per manufacturer
- Vehicle categories, fuel types, gearboxes, colors
- Simulated ML predictions with realistic pricing

## 📦 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Your production API URL

### Backend (Future)
Deploy FastAPI/Flask application to:
- Railway, Render, Fly.io, or similar
- Ensure CORS is configured for frontend domain

## 🔮 Phase 2: ML Integration

When the final ML code is provided:

1. **Inspect** the training pipeline and preprocessing
2. **Create** FastAPI/Flask backend with `/predict` endpoint
3. **Load** trained model artifacts at startup
4. **Implement** identical preprocessing in backend
5. **Replace** `mockPredictionService` with `realPredictionService`
6. **Test** end-to-end prediction flow

## 👥 Team

- Islam Abdo - Team Lead / Full Stack Developer
- Lotfy El Shazly - ML Engineer / Data Scientist
- Mosab - Backend Developer
- Mohamed El Sherif - Frontend Developer
- Mohamed - Data Engineer
- Youssef - QA / DevOps

## 📄 License

This project is developed as part of the NTI Summer Training Program.

## 🙏 Acknowledgments

- NTI Summer Training Program
- Open source libraries used in this project
- Automotive dataset providers