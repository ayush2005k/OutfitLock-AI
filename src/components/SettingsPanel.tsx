import React from 'react';

interface SettingsPanelProps {
  numOutputs: number;
  onNumOutputsChange: (val: number) => void;
  aspectRatio: string;
  onAspectRatioChange: (val: string) => void;
}

export const SettingsPanel = ({
  numOutputs,
  onNumOutputsChange,
  aspectRatio,
  onAspectRatioChange
}: SettingsPanelProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Outputs</label>
          <select
            value={numOutputs}
            onChange={(e) => onNumOutputsChange(Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-black transition-colors"
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n} Image{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => onAspectRatioChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-black transition-colors"
          >
            <option value="1:1">1:1 Square</option>
            <option value="3:4">3:4 Portrait</option>
            <option value="4:3">4:3 Landscape</option>
            <option value="9:16">16:9 Cinema</option>
          </select>
        </div>
      </div>
    </div>
  );
};
