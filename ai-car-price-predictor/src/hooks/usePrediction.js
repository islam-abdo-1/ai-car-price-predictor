import { useState, useCallback } from 'react';
import { predictionService } from '../services/api';

export function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const predict = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await predictionService.predict(formData);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'We couldn\'t generate a prediction. Please check your inputs and try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { predict, reset, loading, result, error };
}