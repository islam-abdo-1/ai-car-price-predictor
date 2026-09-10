import { Select } from '../ui/Select';
import { MODEL_OPTIONS } from '../../utils/constants';

export function ModelSelectionSection({ register, errors }) {
  return (
    <section aria-labelledby="model-selection-heading" className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Prediction Model"
          error={errors.predictionModel?.message}
          options={MODEL_OPTIONS}
          placeholder="Select prediction model"
          {...register('predictionModel')}
          required
        />
        <div className="md:col-span-2">
          <p className="text-body-sm text-text-secondary">
            Select the machine learning model to use for price prediction.
            Each model uses different algorithms and may produce slightly different results.
          </p>
        </div>
      </div>
    </section>
  );
}