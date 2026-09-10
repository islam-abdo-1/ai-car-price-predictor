# AI Car Price Predictor

A sophisticated Machine Learning application for vehicle price prediction built during the NTI Summer Training Program 2026.

## Features

- **Multiple ML Models**: Ridge Regression, Random Forest, Gradient Boosting, SVR
- **Real-time Predictions**: GBP (£) pricing via FastAPI Cloud backend
- **Dark-Themed UI**: Premium professional interface built with React + Tailwind CSS
- **Responsive Design**: Works seamlessly from mobile to desktop
- **Dynamic Form Validation**: VEHICLE_MODELS-based filtering for dependent dropdowns
- **Flip Card Team Section**: Interactive team member cards with skills display
- **Modern Architecture**: React 18, Vite, React Router, React Hook Form, Zod, Headless UI

## Tech Stack

**Frontend**: React 18, Vite, Tailwind CSS, React Router, React Hook Form, Zod, Headless UI  
**Backend**: FastAPI/Flask, scikit-learn, XGBoost, CatBoost, Pandas, NumPy  
**Deployment**: Vercel (Frontend), FastAPI Cloud (Backend API)

## Models

| Model | ID | Description |
|-------|-----|-------------|
| Ridge Regression | `ridge` | Regularized linear regression model |
| Random Forest | `random_forest` | Ensemble learning method using multiple decision trees |
| Gradient Boosting | `gradient_boosting` | Optimized gradient boosting framework |
| SVR | `svr` | Support Vector Regression for non-linear patterns |

## API Endpoints

- `GET /health` — Check health status
- `POST /predict` — Get car price prediction in GBP

## Live Demo

- **Frontend**: [https://ai-car-price-predictor.vercel.app](https://ai-car-price-predictor.vercel.app)
- **Backend**: [https://ai-car-price-predictor-74bc575d.fastapicloud.dev](https://ai-car-price-predictor-74bc575d.fastapicloud.dev)

## Project Structure

```
ai-car-price-predictor/
├── src/
│   ├── components/
│   │   ├── forms/           # Form sections (BasicInfo, VehicleSpecs, etc.)
│   │   ├── layout/          # Layout wrapper with Navbar/Footer
│   │   └── ui/              # Reusable UI components (Select, Input, Card, etc.)
│   ├── hooks/               # Custom hooks (useMetadata, usePrediction)
│   ├── pages/               # Page components (Home, About, Models, Team)
│   ├── services/            # API services
│   ├── utils/               # Constants, validation, formatters
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── routes.jsx           # Routing configuration
├── backend/                 # FastAPI backend (separate deployment)
└── public/                  # Static assets
```

## Development

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

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://ai-car-price-predictor-74bc575d.fastapicloud.dev
```

## Team

Built by 6 students from the NTI Summer Training Program 2026:

- **Yusuf Lotfy** — Team Lead
- **Lotfy El Shazly** — ML Engineer / Data Scientist
- **Islam Abdo** — Full-Stack Developer
- **Mohamed Hussein** — Frontend Developer / ML Engineer
- **Mahmoud El Shafiy** — ML Engineer / Full Stack
- **Mosab Ahmed** — ML Engineer

## License

This project was developed as part of the NTI Summer Training Program graduation project.