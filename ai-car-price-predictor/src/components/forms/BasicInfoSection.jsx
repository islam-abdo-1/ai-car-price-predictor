import { SearchableSelect } from '../ui/SearchableSelect';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { VEHICLE_MODELS } from '../../utils/constants';

export function BasicInfoSection({ register, errors, watch, setValue, metadata, metadataLoading }) {
  const manufacturer = watch('manufacturer');
  const model = watch('model');

  const manufacturerOptions = metadata?.manufacturers?.map(m => ({ value: m.id, label: m.name })) || [];
  const modelOptions = (metadata?.models?.[manufacturer] || []).map(m => ({
    value: m.toLowerCase().replace(/\s+/g, '-'),
    label: m,
  }));
  const selectedModel = VEHICLE_MODELS[model] || VEHICLE_MODELS['default'];
  const categoryOptions = (metadata?.categories || selectedModel.category).filter(c => selectedModel.category.includes(c)).map(c => ({ value: c, label: c }));

  return (
    <section aria-labelledby="basic-info-heading" className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SearchableSelect
          label="Manufacturer"
          error={errors.manufacturer?.message}
          options={manufacturerOptions}
          placeholder="Select manufacturer"
          value={watch('manufacturer') || ''}
          onChange={(val) => {
            setValue('manufacturer', val, { shouldValidate: true, shouldDirty: true });
            setValue('model', '', { shouldValidate: true, shouldDirty: true });
          }}
          required
          disabled={metadataLoading}
          filterBy="label"
          emptyMessage="No manufacturers found"
        />

        <SearchableSelect
          label="Model"
          error={errors.model?.message}
          options={modelOptions}
          placeholder={manufacturer ? 'Select model' : 'Select manufacturer first'}
          value={watch('model') || ''}
          onChange={(val) => setValue('model', val, { shouldValidate: true, shouldDirty: true })}
          required
          disabled={metadataLoading || !manufacturer}
          filterBy="label"
          emptyMessage="No models found for this manufacturer"
        />

        <Input
          label="Production Year"
          error={errors.productionYear?.message}
          placeholder="2020"
          type="number"
          {...register('productionYear')}
          required
        />

        <Select
          label="Category"
          error={errors.category?.message}
          options={categoryOptions}
          placeholder="Select category"
          {...register('category')}
          required
          disabled={metadataLoading}
        />
      </div>
      {/* hidden inputs keep RHF aware of custom selects */}
      <input type="hidden" {...register('manufacturer')} />
      <input type="hidden" {...register('model')} />
    </section>
  );
}