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
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/health`);
    return response.ok ? { status: 'ok', mode: 'real' } : { status: 'error', mode: 'real' };
  } catch {
    return { status: 'error', mode: 'real' };
  }
}