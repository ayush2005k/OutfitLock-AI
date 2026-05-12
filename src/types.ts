export type ConsistencyStatus = 'Consistent' | 'Minor Drift' | 'Review Needed';

export interface OutfitImage {
  id: string;
  file: File;
  preview: string;
}

export interface ReferenceImage {
  id: string;
  file: File;
  preview: string;
}

export interface GeneratedOutput {
  id: string;
  outfitId: string;
  imageUrl: string;
  status: ConsistencyStatus;
  createdAt: string;
}

export interface GenerationSession {
  id: string;
  outfits: { id: string; name: string; preview: string }[];
  references: { id: string; name: string; preview: string }[];
  outputs: GeneratedOutput[];
  timestamp: string;
}

export interface GenerationSettings {
  numOutputs: number;
  aspectRatio: string;
  category: string;
}

export type ProcessingStep = 'Idle' | 'Uploading' | 'Processing' | 'Generating AI images' | 'Finalizing outputs';
