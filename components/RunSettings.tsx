import React from 'react';
import { RunConfig } from '../types';
import { MODELS } from '../constants';
import { Info, ChevronDown } from 'lucide-react';

interface RunSettingsProps {
  config: RunConfig;
  setConfig: React.Dispatch<React.SetStateAction<RunConfig>>;
  isRunning: boolean;
}

const RunSettings: React.FC<RunSettingsProps> = ({ config, setConfig, isRunning }) => {
  const handleChange = (key: keyof RunConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 bg-google-bg border-l border-google-border flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-google-border">
        <h2 className="text-sm font-medium text-google-text uppercase tracking-wide mb-4">Run settings</h2>
        
        {/* Model Selector */}
        <div className="mb-6">
          <label className="text-xs text-google-textSecondary mb-1.5 block">Model</label>
          <div className="relative">
            <select
              value={config.model}
              onChange={(e) => handleChange('model', e.target.value)}
              className="w-full appearance-none bg-google-surface border border-google-border hover:border-google-textSecondary rounded-lg px-3 py-2 text-sm text-google-text focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors"
              disabled={isRunning}
            >
              {MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3 text-google-textSecondary pointer-events-none" />
          </div>
          <p className="mt-2 text-xs text-google-textSecondary">
            {MODELS.find(m => m.id === config.model)?.description}
          </p>
        </div>

        {/* Temperature */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-google-textSecondary flex items-center gap-1">
              Temperature
              <Info size={12} className="cursor-help" title="Controls randomness. Higher values mean more creative responses." />
            </label>
            <span className="text-xs font-mono text-google-text">{config.temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full h-1 bg-google-surface2 rounded-lg appearance-none cursor-pointer accent-google-blue"
            disabled={isRunning}
          />
        </div>

        {/* Safety Settings (Mock) */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-google-textSecondary">Safety settings</label>
            <button className="text-xs text-google-blue hover:text-google-blueHover">Edit</button>
          </div>
          <div className="bg-google-surface rounded px-3 py-2 text-xs text-google-textSecondary border border-google-border">
            Block some
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-sm font-medium text-google-text uppercase tracking-wide mb-4">Advanced settings</h2>
        
        {/* Top K */}
        <div className="mb-4">
           <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-google-textSecondary">Top K</label>
            <input 
              type="number" 
              value={config.topK}
              onChange={(e) => handleChange('topK', parseInt(e.target.value))}
              className="w-16 bg-google-surface border border-google-border rounded px-2 py-1 text-xs text-google-text text-right focus:border-google-blue focus:outline-none"
            />
          </div>
        </div>

        {/* Top P */}
        <div className="mb-4">
           <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-google-textSecondary">Top P</label>
             <input 
              type="number" 
              value={config.topP}
              step="0.05"
              onChange={(e) => handleChange('topP', parseFloat(e.target.value))}
              className="w-16 bg-google-surface border border-google-border rounded px-2 py-1 text-xs text-google-text text-right focus:border-google-blue focus:outline-none"
            />
          </div>
        </div>

        {/* Max Output Tokens */}
        <div className="mb-4">
           <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs text-google-textSecondary">Output token limit</label>
             <input 
              type="number" 
              value={config.maxOutputTokens}
              onChange={(e) => handleChange('maxOutputTokens', parseInt(e.target.value))}
              className="w-16 bg-google-surface border border-google-border rounded px-2 py-1 text-xs text-google-text text-right focus:border-google-blue focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunSettings;