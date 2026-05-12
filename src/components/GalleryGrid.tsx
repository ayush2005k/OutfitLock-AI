import React from 'react';
import { GeneratedOutput } from '../types';
import { OutputCard } from './OutputCard';

interface GalleryGridProps {
  outputs: GeneratedOutput[];
  onRegenerate: (id: string) => void;
  onDownload: (id: string) => void;
}

export const GalleryGrid = ({ outputs, onRegenerate, onDownload }: GalleryGridProps) => {
  if (outputs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
        <p className="text-gray-400 text-sm italic">No images generated yet. Configure settings and click generate!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {outputs.map((output) => (
        <OutputCard
          key={output.id}
          output={output}
          onRegenerate={onRegenerate}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};
