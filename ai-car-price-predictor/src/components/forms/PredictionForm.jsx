import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { predictionSchema } from '../../utils/validation';
import { usePrediction } from '../../hooks/usePrediction';
import { useMetadata } from '../../hooks/useMetadata';
import { BasicInfoSection, VehicleSpecsSection, ExteriorInteriorSection, ModelSelectionSection } from './index';
import { SectionCard } from '../ui/SectionCard';
import { Button } from '../ui/Button';
import { ResultCard } from '../ui/ResultCard';
import { AlertCircle } from 'lucide-react';

export function PredictionForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      manufacturer: '',
      model: '',
      productionYear: '',
      category: '',
      mileage: '',
      engineVolume: '',
      turbo: false,
      cylinders: '',
      fuelType: '',
      gearboxType: '',
      driveWheels: '',
      doors: '',
      wheel: '',
      color: '',
      leatherInterior: false,
      airbags: '',
      predictionModel: 'gradient_boosting',
    },
    mode: 'onTouched',
  });

  const { predict, reset: resetPrediction, loading: predicting, result, error: predictionError } = usePrediction();
  const { metadata, loading: metadataLoading } = useMetadata();

  const watchedValues = watch();
  const busy = predicting || isSubmitting;

  const onSubmit = async (data) => {
    try {
      await predict(data);
    } catch {
      // error handled in usePrediction
    }
  };

  const handlePredictAgain = () => {
    reset();
    resetPrediction();
  };

  const sectionProps = { register, errors, watch, setValue, metadata, metadataLoading };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <SectionCard
        title="Basic Information"
        description="Essential vehicle identification details"
      >
        <BasicInfoSection {...sectionProps} />
      </SectionCard>

      <SectionCard
        title="Vehicle Specifications"
        description="Technical specifications and performance data"
      >
        <VehicleSpecsSection {...sectionProps} />
      </SectionCard>

      <SectionCard
        title="Exterior & Interior"
        description="Physical attributes and interior features"
      >
        <ExteriorInteriorSection {...sectionProps} />
      </SectionCard>

      <SectionCard
        title="Prediction Model"
        description="Select the ML model for price prediction"
      >
        <ModelSelectionSection register={register} errors={errors} />
      </SectionCard>

      {predictionError && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-fade-in" role="alert">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-body text-red-300">{predictionError}</p>
        </div>
      )}

      {!result && (
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={busy}
            disabled={busy}
            className="flex-1 sm:flex-none min-w-[220px]"
          >
            {busy ? 'Predicting...' : 'Predict Car Price'}
          </Button>

          {Object.values(watchedValues).some(v => v !== '' && v !== false && v !== undefined) && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handlePredictAgain}
              disabled={busy}
              className="flex-1 sm:flex-none min-w-[200px]"
            >
              Reset Form
            </Button>
          )}
        </div>
      )}

      {result && (
        <ResultCard
          prediction={result}
          onPredictAgain={handlePredictAgain}
        />
      )}
    </form>
  );
}