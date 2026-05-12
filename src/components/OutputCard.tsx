import React from 'react';
import { Download, RefreshCw, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { GeneratedOutput, ConsistencyStatus } from '../types';
import { cn } from '../lib/utils';

interface OutputCardProps {
  output: GeneratedOutput;
  onRegenerate: (id: string) => void;
  onDownload: (id: string) => void;
  key?: string;
}

const StatusBadge = ({ status }: { status: ConsistencyStatus }) => {
  const configs = {
    'Consistent': { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
    'Minor Drift': { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
    'Review Needed': { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
  };

  const { color, text } = configs[status];

  return (
    <div className="flex items-center space-x-1">
      <span className={cn("w-2 h-2 rounded-full", color)}></span>
      <span className={cn("text-xs font-bold", text)}>{status}</span>
    </div>
  );
};

export const OutputCard = ({ output, onRegenerate, onDownload }: OutputCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm flex flex-col group transition-all hover:shadow-md h-full">
      <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
        <img
          src={output.imageUrl}
          alt="AI Fashion Generation"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
          ID: {output.id}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Consistency</span>
          <StatusBadge status={output.status} />
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onRegenerate(output.id)}
            className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            title="Regenerate"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={() => onDownload(output.id)}
            className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black"
            title="Download"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
