import { cn } from '../../utils/cn';
import { formatPrice, getModelDisplayName } from '../../utils/formatters';
import { Button } from './Button';
import { RefreshCw, DollarSign, Cpu } from 'lucide-react';

export function ResultCard({ 
  prediction, 
  onPredictAgain, 
  className = '',
  loading = false,
}) {
  if (!prediction) return null;

  const { predicted_price, model, currency, timestamp, inputSummary } = prediction;

  return (
    <div className={cn('result-card', className)} role="status" aria-live="polite">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-body-sm text-text-secondary mb-1">Estimated Price</p>
          <div className="flex items-baseline gap-2">
            <DollarSign className="w-8 h-8 text-accent flex-shrink-0" aria-hidden="true" />
            <span className="text-display font-bold text-text-primary tabular-nums">
              {loading ? (
                <span className="animate-pulse">$00,000</span>
              ) : (
                formatPrice(predicted_price)
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-right min-w-[160px]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg">
            <Cpu className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-body-sm font-medium text-accent">
              {getModelDisplayName(model)}
            </span>
          </div>
          {timestamp && (
            <p className="text-caption text-text-secondary">
              {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {inputSummary && (
        <div className="mb-6 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
          <p className="text-body-sm font-medium text-text-primary mb-3">Input Summary</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-body-sm">
            <div>
              <span className="text-text-secondary">Manufacturer:</span>
              <span className="ml-2 font-medium text-text-primary capitalize">{inputSummary.manufacturer}</span>
            </div>
            <div>
              <span className="text-text-secondary">Model:</span>
              <span className="ml-2 font-medium text-text-primary">{inputSummary.model}</span>
            </div>
            <div>
              <span className="text-text-secondary">Year:</span>
              <span className="ml-2 font-medium text-text-primary">{inputSummary.productionYear}</span>
            </div>
            <div>
              <span className="text-text-secondary">Mileage:</span>
              <span className="ml-2 font-medium text-text-primary">{Number(inputSummary.mileage).toLocaleString()} km</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button 
          variant="primary" 
          size="lg"
          onClick={onPredictAgain}
          className="flex-1"
        >
          <RefreshCw className="w-5 h-5" aria-hidden="true" />
          Predict Again
        </Button>
      </div>
    </div>
  );
}