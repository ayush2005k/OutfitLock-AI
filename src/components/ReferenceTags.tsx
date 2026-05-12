import React from 'react';
import { cn } from '../lib/utils';

interface ReferenceTagsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const ReferenceTags = ({ categories, selectedCategory, onSelect }: ReferenceTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all",
            selectedCategory === category
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
