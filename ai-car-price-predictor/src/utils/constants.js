export const PREDICTION_MODELS = [
  { id: 'ridge', name: 'Ridge Regression', description: 'Regularized linear regression model' },
  { id: 'random_forest', name: 'Random Forest', description: 'Ensemble learning method using multiple decision trees' },
  { id: 'gradient_boosting', name: 'Gradient Boosting', description: 'Optimized gradient boosting framework' },
  { id: 'svr', name: 'SVR', description: 'Support Vector Regression for non-linear patterns' },
];

export const MODEL_OPTIONS = PREDICTION_MODELS.map(m => ({
  value: m.id,
  label: m.name,
}));

export const CURRENCY = 'GBP';
export const CURRENCY_SYMBOL = '£';

export const FORM_SECTIONS = [
  { id: 'basic', title: 'Basic Information', description: 'Essential vehicle identification details' },
  { id: 'specs', title: 'Vehicle Specifications', description: 'Technical specifications and performance data' },
  { id: 'exterior', title: 'Exterior & Interior', description: 'Physical attributes and interior features' },
  { id: 'model', title: 'Prediction Model', description: 'Select the ML model for price prediction' },
];

export const FIELD_CONFIG = {
  basic: [
    { name: 'manufacturer', label: 'Manufacturer', type: 'searchable-select', required: true, placeholder: 'Select manufacturer' },
    { name: 'model', label: 'Model', type: 'searchable-select', required: true, placeholder: 'Select model', dependsOn: 'manufacturer' },
    { name: 'productionYear', label: 'Production Year', type: 'number', required: true, placeholder: '2020', min: 1990, max: new Date().getFullYear() + 1 },
    { name: 'category', label: 'Category', type: 'select', required: true, placeholder: 'Select category' },
  ],
  specs: [
    { name: 'mileage', label: 'Mileage', type: 'number', required: true, placeholder: '50000', suffix: 'km', min: 0 },
    { name: 'engineVolume', label: 'Engine Volume', type: 'number', required: true, placeholder: '2.0', suffix: 'L', step: 0.1, min: 0.5, max: 8.0 },
    { name: 'turbo', label: 'Turbo', type: 'toggle', required: false },
    { name: 'cylinders', label: 'Cylinders', type: 'number', required: true, placeholder: '4', min: 1, max: 16 },
    { name: 'fuelType', label: 'Fuel Type', type: 'select', required: true, placeholder: 'Select fuel type' },
    { name: 'gearboxType', label: 'Gear Box Type', type: 'select', required: true, placeholder: 'Select gearbox type' },
    { name: 'driveWheels', label: 'Drive Wheels', type: 'select', required: true, placeholder: 'Select drive type' },
  ],
  exterior: [
    { name: 'doors', label: 'Doors', type: 'select', required: true, placeholder: 'Select doors' },
    { name: 'wheel', label: 'Wheel', type: 'select', required: true, placeholder: 'Select wheel position' },
    { name: 'color', label: 'Color', type: 'select', required: true, placeholder: 'Select color' },
    { name: 'leatherInterior', label: 'Leather Interior', type: 'toggle', required: false },
    { name: 'airbags', label: 'Airbags', type: 'number', required: true, placeholder: '6', min: 0, max: 20 },
  ],
  model: [
    { name: 'predictionModel', label: 'Prediction Model', type: 'select', required: true, placeholder: 'Select model', options: MODEL_OPTIONS },
  ],
};

export const DEFAULT_FORM_VALUES = {
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
};