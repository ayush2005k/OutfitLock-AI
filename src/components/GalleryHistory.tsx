import React from 'react';
import { GenerationSession } from '../types';
import { GalleryGrid } from './GalleryGrid';
import { ImageIcon } from 'lucide-react';

interface GalleryHistoryProps {
  history: GenerationSession[];
}

export const GalleryHistory = ({ history }: GalleryHistoryProps) => {
  const allOutputs = history.flatMap(s => s.outputs);

  if (allOutputs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-200">
        <ImageIcon size={48} className="text-gray-200 mb-4" />
        <p className="text-gray-400 font-medium">No results in gallery history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black uppercase tracking-tight">Full Archive</h2>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{allOutputs.length} Images</span>
      </div>
      <GalleryGrid 
        outputs={allOutputs} 
        onRegenerate={() => {}} 
        onDownload={() => {}} 
      />
    </div>
  );
};
