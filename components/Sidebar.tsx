import React from 'react';
import { PlusCircle, LayoutGrid, Sliders, Key, Settings } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const getNavClass = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
      isActive 
        ? 'bg-google-blue/20 text-google-blue' 
        : 'text-google-textSecondary hover:bg-google-surface2 hover:text-google-text'
    }`;

  return (
    <div className="w-64 h-full bg-google-bg border-r border-google-border flex flex-col flex-shrink-0">
      <div className="p-4 flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-xs">AI</span>
        </div>
        <span className="text-xl font-medium text-google-text tracking-tight">AI Studio</span>
      </div>

      <div className="px-3 mb-4">
        <div 
          onClick={() => onNavigate('/')} 
          className="flex items-center gap-2 bg-google-surface2 hover:bg-google-border text-google-blueHover px-4 py-3 rounded-xl transition-all shadow-sm group cursor-pointer"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">Create new</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="text-xs font-medium text-google-textSecondary px-3 py-2 uppercase tracking-wider">
          Library
        </div>
        <div onClick={() => onNavigate('/library')} className={getNavClass(currentPath === '/library')}>
          <LayoutGrid size={18} />
          <span>My library</span>
        </div>
        
        <div className="mt-6 text-xs font-medium text-google-textSecondary px-3 py-2 uppercase tracking-wider">
          Tune
        </div>
        <div onClick={() => onNavigate('/tuned')} className={getNavClass(currentPath === '/tuned')}>
          <Sliders size={18} />
          <span>Tuned models</span>
        </div>
      </nav>

      <div className="p-3 border-t border-google-border space-y-1">
        <div onClick={() => onNavigate('/apikeys')} className={getNavClass(currentPath === '/apikeys')}>
          <Key size={18} />
          <span>Get API key</span>
        </div>
        <div onClick={() => onNavigate('/settings')} className={getNavClass(currentPath === '/settings')}>
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;