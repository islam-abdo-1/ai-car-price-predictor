import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { CarIcon } from './CarIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-card border-t border-border-primary mt-auto">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-text-primary mb-4" aria-label="AI Car Price Predictor Home">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                <CarIcon className="w-6 h-6 text-amber-400" aria-hidden="true" />
              </div>
              <span className="font-bold text-h3">AI Car Price Predictor</span>
            </Link>
            <p className="text-body text-text-secondary max-w-md">
              Machine Learning-Based Vehicle Price Prediction.
              Built as part of NTI Summer Training Program graduation project.
            </p>
          </div>

          <div>
            <h4 className="text-body font-semibold text-text-primary mb-4">Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li><Link to="/" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Home</Link></li>
                <li><Link to="/models" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Models</Link></li>
                <li><Link to="/about" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">About</Link></li>
                <li><Link to="/team" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Team</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-body font-semibold text-text-primary mb-4">Models</h4>
            <ul className="space-y-2">
              <li><Link to="/models" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Ridge Regression</Link></li>
              <li><Link to="/models" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Random Forest</Link></li>
              <li><Link to="/models" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">Gradient Boosting</Link></li>
              <li><Link to="/models" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors">SVR</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-primary flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-text-secondary">
            © {currentYear} AI Car Price Predictor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-body-sm text-text-secondary">
            <span>NTI Summer Training Program</span>
            <span className="flex items-center gap-1.5 text-accent">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Graduation Project
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}