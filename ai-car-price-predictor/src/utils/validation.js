import { z } from 'zod';

export const predictionSchema = z.object({
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  model: z.string().min(1, 'Model is required'),
  productionYear: z.coerce.number().positive('Production year must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  mileage: z.coerce.number().positive('Mileage must be a positive number'),
  engineVolume: z.coerce.number().positive('Engine volume must be a positive number'),
  turbo: z.boolean(),
  cylinders: z.coerce.number().positive('Cylinders must be a positive number'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  gearboxType: z.string().min(1, 'Gearbox type is required'),
  driveWheels: z.string().min(1, 'Drive wheels is required'),
  doors: z.coerce.number().positive('Doors must be a positive number'),
  wheel: z.string().min(1, 'Wheel is required'),
  color: z.string().min(1, 'Color is required'),
  leatherInterior: z.boolean(),
  airbags: z.coerce.number().nonnegative('Airbags cannot be negative'),
  predictionModel: z.enum(['ridge', 'random-forest', 'gradient-boosting', 'svr']),
});

/**
 * @typedef {z.infer<typeof predictionSchema>} PredictionFormData
 */

export const fieldErrorMessages = {
  manufacturer: 'Please select a manufacturer',
  model: 'Please select a model',
  productionYear: 'Please enter a valid production year',
  category: 'Please select a category',
  mileage: 'Please enter a valid mileage',
  engineVolume: 'Please enter a valid engine volume',
  cylinders: 'Please enter a valid number of cylinders',
  fuelType: 'Please select a fuel type',
  gearboxType: 'Please select a gearbox type',
  driveWheels: 'Please select drive wheels',
  doors: 'Please select number of doors',
  wheel: 'Please select wheel position',
  color: 'Please select a color',
  airbags: 'Please enter number of airbags',
  predictionModel: 'Please select a prediction model',
};