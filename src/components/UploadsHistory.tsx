import React from 'react';
import { GenerationSession } from '../types';
import { OutputCard } from './OutputCard';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface UploadsHistoryProps {
  history: GenerationSession[];
}

export const UploadsHistory = ({ history }: UploadsHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-200">
        <ImageIcon size={48} className="text-gray-200 mb-4" />
        <p className="text-gray-400 font-medium">No upload history yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {history.map((session) => (
        <div key={session.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Session: {session.id}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{session.timestamp}</span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-xs font-bold text-black uppercase tracking-tight">Inputs</h4>
                <div className="grid grid-cols-2 gap-2">
                  {session.outfits.map(img => (
                    <div key={img.id} className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-100 relative group">
                      <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold uppercase">{img.name}</span>
                      </div>
                    </div>
                  ))}
                  {session.references.map(img => (
                    <div key={img.id} className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-100 relative group">
                      <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold uppercase">{img.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center lg:col-span-1">
                <ArrowRight className="text-gray-200" size={32} />
              </div>

              {/* Outputs */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-bold text-black uppercase tracking-tight">Generated Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {session.outputs.map(output => (
                    <OutputCard 
                      key={output.id} 
                      output={output} 
                      onRegenerate={() => {}} 
                      onDownload={() => {}} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
