import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { VEHICLE_MODELS } from '../../utils/constants';

export function ExteriorInteriorSection({ register, errors, watch, setValue, metadata, metadataLoading }) {
  const leatherInterior = watch('leatherInterior');
  const model = watch('model');

  const selectedModel = VEHICLE_MODELS[model] || VEHICLE_MODELS['default'];

  const doorsOptions = (metadata?.doors || []).filter(d => selectedModel.doors.includes(d)).map(d => ({ value: String(d), label: `${d} Doors` }));
  const wheelOptions = (metadata?.wheels || []).map(w => ({ value: w, label: w }));
  const colorOptions = (metadata?.colors || []).map(c => ({ value: c, label: c }));

  return (
    <section aria-labelledby="exterior-interior-heading" className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Doors"
          error={errors.doors?.message}
          options={doorsOptions}
          placeholder="Select doors"
          {...register('doors')}
          required
          disabled={metadataLoading}
        />

        <Select
          label="Wheel"
          error={errors.wheel?.message}
          options={wheelOptions}
          placeholder="Select wheel position"
          {...register('wheel')}
          required
          disabled={metadataLoading}
        />

        <Select
          label="Color"
          error={errors.color?.message}
          options={colorOptions}
          placeholder="Select color"
          {...register('color')}
          required
          disabled={metadataLoading}
        />

        <div>
          <label className="label">Leather Interior</label>
          <Toggle
            checked={!!leatherInterior}
            onChange={(checked) => setValue('leatherInterior', checked, { shouldDirty: true })}
            label={leatherInterior ? 'Yes' : 'No'}
          />
        </div>

        <Input
          label="Airbags"
          error={errors.airbags?.message}
          placeholder="6"
          type="number"
          {...register('airbags')}
          required
        />
      </div>
    </section>
  );
}