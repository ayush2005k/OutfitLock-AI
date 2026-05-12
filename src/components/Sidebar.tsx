import React from 'react';
import { LayoutDashboard, Upload, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
    active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
  )}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold tracking-tight text-black">OutfitLock AI</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">Fashion Image Generation</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        <div 
          onClick={() => onViewChange('dashboard')}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
            activeView === 'dashboard' ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
          )}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>
        <div 
          onClick={() => onViewChange('uploads')}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
            activeView === 'uploads' ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
          )}
        >
          <Upload size={18} />
          <span>My Uploads</span>
        </div>
        <div 
          onClick={() => onViewChange('gallery')}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
            activeView === 'gallery' ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
          )}
        >
          <ImageIcon size={18} />
          <span>Output Gallery</span>
        </div>
        <div 
          onClick={() => onViewChange('settings')}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors",
            activeView === 'settings' ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
          )}
        >
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        {/* Credits section removed */}
      </div>
    </aside>
  );
};
