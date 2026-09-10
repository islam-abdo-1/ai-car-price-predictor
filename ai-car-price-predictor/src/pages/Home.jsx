import { PredictionForm } from '../components/forms/PredictionForm';
import { SectionCard } from '../components/ui/SectionCard';
import { Sparkles, Cpu, Shield } from 'lucide-react';
import { CarIcon } from '../components/ui/CarIcon';

const features = [
    {
      icon: CarIcon,
      title: 'Comprehensive Vehicle Data',
      description: 'Enter detailed specifications including manufacturer, model, year, mileage, engine, and interior features.',
    },
  {
    icon: Cpu,
    title: 'Multiple ML Models',
    description: 'Choose from Random Forest, XGBoost, or CatBoost regression models for price prediction.',
  },
  {
    icon: Shield,
    title: 'Data-Driven Predictions',
    description: 'Predictions based on trained models with realistic automotive market data.',
  },
  {
    icon: Sparkles,
    title: 'Modern Dark Interface',
    description: 'Premium dark-themed UI designed for professional demonstration and ease of use.',
  },
];

export function Home() {
  return (
    <div className="container-main">
      <header className="text-center mb-12 md:mb-16 pt-8 md:pt-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-body-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Machine Learning-Based Vehicle Price Prediction</span>
        </div>
        <h1 className="text-display font-bold text-text-primary mb-4 text-balance">
          AI Car Price Predictor
        </h1>
        <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
          Enter your vehicle specifications and select a machine learning model to get an estimated market price.
          Built as part of the NTI Summer Training Program graduation project.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <SectionCard key={feature.title} className="text-center hover:border-accent/50 transition-colors" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10">
              <feature.icon className="w-7 h-7 text-accent" aria-hidden="true" />
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">{feature.title}</h3>
            <p className="text-body text-text-secondary">{feature.description}</p>
          </SectionCard>
        ))}
      </div>

      <PredictionForm />
    </div>
  );
}