import axios from 'axios';
import { GenerationSettings, GeneratedOutput } from '../types';

/**
 * Placeholder API service for OutfitLock AI
 * Integration points for Django backend
 */

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fashionService = {
  /**
   * Uploads images to the backend
   */
  uploadImages: async (files: File[], type: 'outfit' | 'reference') => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    formData.append('type', type);

    // const response = await api.post('/upload/', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // return response.data;
    
    console.log(`Simulating upload for ${files.length} ${type} images`);
    return { status: 'success' };
  },

  /**
   * Triggers the AI generation process
   */
  generateOutfits: async (settings: GenerationSettings, outfitIds: string[], referenceIds: string[]) => {
    // const response = await api.post('/generate/', {
    //   settings,
    //   outfit_ids: outfitIds,
    //   reference_ids: referenceIds
    // });
    // return response.data;

    console.log('Simulating generation with settings:', settings);
    return { task_id: 'task_123' };
  },

  /**
   * Fetches results for a specific task
   */
  getResults: async (taskId: string): Promise<GeneratedOutput[]> => {
    // const response = await api.get(`/results/${taskId}/`);
    // return response.data;

    return [];
  }
};

export default api;
