import React from 'react';
import { motion } from 'motion/react';
import { ProcessingStep } from '../types';

interface LoaderProps {
  step: ProcessingStep;
}

export const Loader = ({ step }: LoaderProps) => {
  if (step === 'Idle') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 max-w-sm w-full flex flex-col items-center text-center shadow-2xl"
      >
        <div className="relative w-20 h-20 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-gray-100 border-t-black rounded-full"
          />
          <div className="absolute inset-4 bg-gray-50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Magic</h2>
        <p className="text-sm text-gray-500 mb-8 px-4">Our AI is meticulously stitching your outfit onto the reference model.</p>
        
        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: "10%" }}
            animate={{ 
              width: step === 'Uploading' ? "25%" : 
                     step === 'Processing' ? "50%" :
                     step === 'Generating AI images' ? "75%" : "100%" 
            }}
            className="h-full bg-black"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all">
            {step}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Please do not refresh</span>
        </div>
      </motion.div>
    </div>
  );
};
