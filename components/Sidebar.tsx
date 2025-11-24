import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusCircle, LayoutGrid, Sliders, Key, Settings, HelpCircle, FileText } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
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
        <NavLink 
          to="/" 
          className="flex items-center gap-2 bg-google-surface2 hover:bg-google-border text-google-blueHover px-4 py-3 rounded-xl transition-all shadow-sm group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">Create new</span>
        </NavLink>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="text-xs font-medium text-google-textSecondary px-3 py-2 uppercase tracking-wider">
          Library
        </div>
        <NavLink to="/library" className={navClass}>
          <LayoutGrid size={18} />
          <span>My library</span>
        </NavLink>
        
        <div className="mt-6 text-xs font-medium text-google-textSecondary px-3 py-2 uppercase tracking-wider">
          Tune
        </div>
        <NavLink to="/tuned" className={navClass}>
          <Sliders size={18} />
          <span>Tuned models</span>
        </NavLink>
      </nav>

      <div className="p-3 border-t border-google-border space-y-1">
        <NavLink to="/apikeys" className={navClass}>
          <Key size={18} />
          <span>Get API key</span>
        </NavLink>
        <NavLink to="/settings" className={navClass}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;