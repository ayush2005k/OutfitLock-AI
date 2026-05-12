import React, { useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadBoxProps {
  title: string;
  description: string;
  onFilesSelected: (files: File[]) => void;
  files: { id: string, name: string }[];
  onRemove: (id: string) => void;
  className?: string;
  labelStyle?: string;
}

export const UploadBox = ({ title, description, onFilesSelected, files, onRemove, className, labelStyle }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    onFilesSelected(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col">
        <label className={cn("text-[11px] font-bold text-gray-400 uppercase tracking-tighter", labelStyle)}>{title}</label>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer",
          isDragging ? "border-black bg-gray-50/50" : "border-gray-200 hover:border-gray-300 bg-gray-50"
        )}
      >
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <span className="text-xs text-gray-400 font-medium">Click or drag files</span>
        <div className="mt-1 flex space-x-1 opacity-40">
          <div className="w-5 h-5 bg-white border rounded shadow-sm flex items-center justify-center text-[8px]">JPG</div>
          <div className="w-5 h-5 bg-white border rounded shadow-sm flex items-center justify-center text-[8px]">PNG</div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto mt-1">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText size={12} className="text-gray-400" />
                <span className="text-[10px] font-medium text-gray-600 truncate max-w-[140px]">{file.name}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(file.id); }}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
