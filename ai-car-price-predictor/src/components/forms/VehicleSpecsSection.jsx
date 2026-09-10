import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { VEHICLE_MODELS } from '../../utils/constants';

export function VehicleSpecsSection({ register, errors, watch, setValue, metadata, metadataLoading }) {
  const turbo = watch('turbo');
  const model = watch('model');

  const selectedModel = VEHICLE_MODELS[model] || VEHICLE_MODELS['default'];

  const fuelTypeOptions = (metadata?.fuelTypes || []).filter(f => selectedModel.fuelType.includes(f)).map(f => ({ value: f, label: f }));
  const gearboxOptions = (metadata?.gearboxTypes || []).filter(g => selectedModel.gearboxType.includes(g)).map(g => ({ value: g, label: g }));
  const driveWheelsOptions = (metadata?.driveWheels || []).filter(d => selectedModel.driveWheels.includes(d)).map(d => ({ value: d, label: d }));

  return (
    <section aria-labelledby="vehicle-specs-heading" className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Mileage"
          error={errors.mileage?.message}
          placeholder="50000"
          type="number"
          suffix="km"
          {...register('mileage')}
          required
        />

        <Input
          label="Engine Volume"
          error={errors.engineVolume?.message}
          placeholder="2.0"
          type="number"
          step="0.1"
          suffix="L"
          {...register('engineVolume')}
          required
        />

        <div>
          <label className="label">Turbo</label>
          <Toggle
            checked={!!turbo}
            onChange={(checked) => setValue('turbo', checked, { shouldDirty: true })}
            label={turbo ? 'ON' : 'OFF'}
          />
        </div>

        <Input
          label="Cylinders"
          error={errors.cylinders?.message}
          placeholder="4"
          type="number"
          {...register('cylinders')}
          required
        />

        <Select
          label="Fuel Type"
          error={errors.fuelType?.message}
          options={fuelTypeOptions}
          placeholder="Select fuel type"
          {...register('fuelType')}
          required
          disabled={metadataLoading}
        />

        <Select
          label="Gear Box Type"
          error={errors.gearboxType?.message}
          options={gearboxOptions}
          placeholder="Select gearbox type"
          {...register('gearboxType')}
          required
          disabled={metadataLoading}
        />

        <Select
          label="Drive Wheels"
          error={errors.driveWheels?.message}
          options={driveWheelsOptions}
          placeholder="Select drive type"
          {...register('driveWheels')}
          required
          disabled={metadataLoading}
        />
      </div>
    </section>
  );
}