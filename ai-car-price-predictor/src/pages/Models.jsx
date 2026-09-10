import { SectionCard } from '../components/ui/SectionCard';
import { PREDICTION_MODELS } from '../utils/constants';
import { TreePine, Zap, Box, CheckCircle } from 'lucide-react';

const modelDetails = {
  'ridge': {
    icon: TreePine,
    color: 'text-blue-400',
    hex: '#60a5fa',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    pros: [
      'Fast training and inference',
      'Handles multicollinearity well',
      'Simple and interpretable',
      'L2 regularization prevents overfitting',
      'Works well with linear relationships',
    ],
    cons: [
      'Assumes linear relationships',
      'Sensitive to outliers',
      'Cannot capture complex patterns',
      'Requires feature scaling',
    ],
    useCases: 'Linear relationships, baseline models, when interpretability is key',
  },
  'random_forest': {
    icon: TreePine,
    color: 'text-green-400',
    hex: '#4ade80',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    pros: [
      'Handles mixed data types well',
      'Robust to outliers and noise',
      'Provides feature importance',
      'Less prone to overfitting',
      'Parallelizable training',
    ],
    cons: [
      'Can be slow for large datasets',
      'Less interpretable than single trees',
      'May struggle with extrapolation',
    ],
    useCases: 'Tabular data, mixed feature types, when feature importance is needed',
  },
  'gradient_boosting': {
    icon: Zap,
    color: 'text-yellow-400',
    hex: '#facc15',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    pros: [
      'High performance on structured data',
      'Built-in regularization',
      'Handles missing values',
      'Sequential learning improves accuracy',
      'Excellent for competition tasks',
    ],
    cons: [
      'Sensitive to hyperparameters',
      'Can overfit on noisy data',
      'Longer training time',
      'Requires careful tuning',
    ],
    useCases: 'Structured/tabular data, ranking, regression, classification competitions',
  },
  'svr': {
    icon: Box,
    color: 'text-purple-400',
    hex: '#c084fc',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    pros: [
      'Effective in high-dimensional spaces',
      'Memory efficient (uses support vectors)',
      'Versatile with different kernels',
      'Robust to outliers',
      'Good for non-linear patterns',
    ],
    cons: [
      'Slow on large datasets',
      'Requires feature scaling',
      'Sensitive to kernel choice',
      'Less interpretable',
    ],
    useCases: 'Non-linear regression, small-to-medium datasets, high-dimensional data',
  },
};

export function Models() {
  return (
    <div className="container-main">
      <header className="mb-12 animate-fade-in">
        <h1 className="text-display font-bold text-text-primary mb-4">Prediction Models</h1>
        <p className="text-body-lg text-text-secondary max-w-3xl">
          The AI Car Price Predictor uses three different gradient boosting and ensemble learning algorithms.
          Each model has unique strengths and may produce slightly different predictions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PREDICTION_MODELS.map((model, index) => {
          const details = modelDetails[model.id];
          const Icon = details.icon;
          
          return (
            <SectionCard key={model.id} className={`${details.border} hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl ${details.bg}`}>
                  <Icon className="w-7 h-7" style={{ color: details.hex }} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-h2 font-semibold text-text-primary">{model.name}</h2>
                  <p className="text-body-sm text-text-secondary">{model.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-body-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: details.hex }} aria-hidden="true" />
                    Strengths
                  </h3>
                  <ul className="space-y-1.5">
                    {details.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-body-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: details.hex }} aria-hidden="true" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-body-sm font-medium text-text-primary mb-3">Considerations</h3>
                  <ul className="space-y-1.5">
                    {details.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-body-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 border border-border-primary" aria-hidden="true" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border-primary">
                  <p className="text-body-sm text-text-secondary">
                    <span className="font-medium text-text-primary">Best for:</span> {details.useCases}
                  </p>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard className="hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
        <h2 className="text-h2 font-semibold text-text-primary mb-6">Model Comparison</h2>
        <p className="text-body text-text-secondary mb-6">
          All three models are trained on the same preprocessed dataset. Final model selection for production
          should be based on cross-validation metrics (R², MAE, RMSE) on the test set. The frontend allows
          users to select any model for comparison purposes.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left" role="table">
            <thead>
              <tr className="border-b border-border-primary">
                <th className="pb-3 font-medium text-text-primary">Aspect</th>
                <th className="pb-3 font-medium text-text-primary">Ridge</th>
                <th className="pb-3 font-medium text-text-primary">Random Forest</th>
                <th className="pb-3 font-medium text-text-primary">Gradient Boosting</th>
                <th className="pb-3 font-medium text-text-primary">SVR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary/50">
              <tr>
                <td className="py-3 font-medium text-text-primary">Algorithm Type</td>
                <td className="py-3 text-text-secondary">Linear (Regularized)</td>
                <td className="py-3 text-text-secondary">Bagging (Ensemble)</td>
                <td className="py-3 text-text-secondary">Gradient Boosting</td>
                <td className="py-3 text-text-secondary">Kernel-based</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">Categorical Features</td>
                <td className="py-3 text-text-secondary">Requires encoding</td>
                <td className="py-3 text-text-secondary">Requires encoding</td>
                <td className="py-3 text-text-secondary">Requires encoding</td>
                <td className="py-3 text-text-secondary">Numerical only</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">Missing Values</td>
                <td className="py-3 text-text-secondary">Requires imputation</td>
                <td className="py-3 text-text-secondary">Requires imputation</td>
                <td className="py-3 text-text-secondary">Requires imputation</td>
                <td className="py-3 text-text-secondary">Requires imputation</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">Training Speed</td>
                <td className="py-3 text-text-secondary">Very Fast</td>
                <td className="py-3 text-text-secondary">Fast (parallel)</td>
                <td className="py-3 text-text-secondary">Medium</td>
                <td className="py-3 text-text-secondary">Slow</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">Inference Speed</td>
                <td className="py-3 text-text-secondary">Very Fast</td>
                <td className="py-3 text-text-secondary">Medium</td>
                <td className="py-3 text-text-secondary">Fast</td>
                <td className="py-3 text-text-secondary">Medium</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">R² Score</td>
                <td className="py-3 text-text-secondary">0.8864</td>
                <td className="py-3 text-text-secondary">0.9385</td>
                <td className="py-3 text-text-secondary">0.9323</td>
                <td className="py-3 text-text-secondary">0.8086</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">RMSE (£)</td>
                <td className="py-3 text-text-secondary">2,606.50</td>
                <td className="py-3 text-text-secondary">1,918.08</td>
                <td className="py-3 text-text-secondary">2,011.46</td>
                <td className="py-3 text-text-secondary">3,383.16</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-text-primary">MAE (£)</td>
                <td className="py-3 text-text-secondary">1,944.18</td>
                <td className="py-3 text-text-secondary">1,318.24</td>
                <td className="py-3 text-text-secondary">1,441.89</td>
                <td className="py-3 text-text-secondary">2,482.92</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
          <p className="text-body-sm text-text-secondary">
            <strong>Note:</strong> All models are trained on the same preprocessed dataset.
            Performance metrics shown above are from actual evaluation on the test set.
            The frontend allows users to select any model for comparison purposes.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}