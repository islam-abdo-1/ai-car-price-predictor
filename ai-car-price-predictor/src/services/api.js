import { mockPredictionService, realPredictionService } from './mockPredictionService';
import { getMetadata, getModelsByManufacturer } from './mockMetadataService';

const isDevelopment = import.meta.env.DEV;

export const predictionService = isDevelopment ? mockPredictionService : realPredictionService;

export const metadataService = {
  getMetadata,
  getModelsByManufacturer,
};

export async function checkApiHealth() {
  if (isDevelopment) {
    return { status: 'ok', mode: 'mock' };
  }
  
  try {
    const response = await fetch('/api/health');
    return response.ok ? { status: 'ok', mode: 'real' } : { status: 'error', mode: 'real' };
  } catch {
    return { status: 'error', mode: 'real' };
  }
}