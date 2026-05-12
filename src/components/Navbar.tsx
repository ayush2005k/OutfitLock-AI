import React from 'react';
import { Shirt } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 min-h-[64px]">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span className="text-black font-semibold">Workspace</span>
        <span className="opacity-30">/</span>
        <span>New Outfit Lock Session</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center text-[10px] font-bold">JD</div>
      </div>
    </header>
  );
};
