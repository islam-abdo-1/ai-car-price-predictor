import { useState, useEffect, useCallback } from 'react';
import { metadataService } from '../services/api';

export function useMetadata() {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetadata = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await metadataService.getMetadata();
      setMetadata(data);
    } catch (err) {
      setError(err.message || 'Failed to load metadata');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  const getModelsByManufacturer = useCallback(async (manufacturerId) => {
    if (!manufacturerId) return [];
    try {
      return await metadataService.getModelsByManufacturer(manufacturerId);
    } catch {
      return [];
    }
  }, []);

  return { metadata, loading, error, refetch: fetchMetadata, getModelsByManufacturer };
}