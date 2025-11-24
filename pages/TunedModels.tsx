import React from 'react';
import { Sliders, Lock } from 'lucide-react';

const TunedModels: React.FC = () => {
  return (
    <div className="flex-1 bg-google-bg p-8 flex flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-google-surface2 rounded-full flex items-center justify-center mx-auto mb-6 text-google-blue">
          <Sliders size={40} />
        </div>
        <h1 className="text-2xl font-normal text-google-text mb-3">Model Tuning</h1>
        <p className="text-google-textSecondary mb-8">
          Customize Gemini models with your own data to improve performance on specific tasks. 
          Tuning is currently available for select models.
        </p>
        
        <button className="bg-google-blue text-google-bg font-medium px-6 py-3 rounded-full hover:bg-google-blueHover transition-colors mb-4 w-full">
          Create tuned model
        </button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-google-textSecondary">
          <Lock size={12} />
          <span>Requires OAuth authentication for persistent storage</span>
        </div>
      </div>
    </div>
  );
};

export default TunedModels;