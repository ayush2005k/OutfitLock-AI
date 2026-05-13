import axios from 'axios';
import { GenerationSettings, GeneratedOutput } from '../types';

/**
 * OutfitLock AI API Service
 * Handles communication with Django backend
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fashionService = {

  /**
   * Upload outfit + reference images
   */
  uploadImages: async (
    outfitFiles: File[],
    referenceFiles: File[]
  ) => {

    const formData = new FormData();

    // ADD OUTFIT IMAGES
    outfitFiles.forEach((file) => {
      formData.append('outfits', file);
    });

    // ADD REFERENCE IMAGES
    referenceFiles.forEach((file) => {
      formData.append('references', file);
    });

    const response = await api.post(
      '/generate/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  /**
   * Generate AI outfit outputs
   */
  generateOutfits: async (
    settings: GenerationSettings,
    outfitIds: string[],
    referenceIds: string[]
  ) => {

    const response = await api.post('/generate/', {
      settings,
      outfit_ids: outfitIds,
      reference_ids: referenceIds,
    });

    return response.data;
  },

  /**
   * Get generation results
   */
  getResults: async (
    taskId: string
  ): Promise<GeneratedOutput[]> => {

    const response = await api.get(
      `/results/${taskId}/`
    );

    return response.data;
  },
};

export default api;