import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Menu, X, Sparkles } from 'lucide-react';
import { CarIcon } from './CarIcon';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/models', label: 'Models' },
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Team' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
      <nav className="container-main flex items-center justify-between h-16" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 text-text-primary" aria-label="AI Car Price Predictor Home">
<div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
              <CarIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
          <span className="font-bold text-h3 hidden sm:block">AI Car Price Predictor</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'nav-link',
                location.pathname === link.path && 'nav-link-active'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className="btn-primary">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            Predict Price
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-input transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/75 md:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-[70] w-[280px] md:hidden bg-bg-card border-l border-border-primary shadow-card overflow-y-auto animate-slide-in-right"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-text-primary" aria-label="AI Car Price Predictor Home">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                    <CarIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="font-bold text-h3">AI Car Price Predictor</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-input transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'nav-link block w-full',
                      location.pathname === link.path && 'nav-link-active'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-border-primary">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  Predict Price
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}