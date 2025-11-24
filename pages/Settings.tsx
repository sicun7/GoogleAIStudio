import React from 'react';
import { User, Monitor, Shield, Database, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 bg-google-bg p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-normal text-google-text mb-2">Settings</h1>
          <p className="text-google-textSecondary">Manage your account and preferences.</p>
        </header>

        <div className="space-y-6">
          {/* Account Section */}
          <div className="bg-google-surface border border-google-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-google-blue/20 text-google-blue rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <h2 className="text-lg font-medium text-google-text">Account</h2>
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-google-border">
              <div>
                <div className="text-sm font-medium text-google-text">Profile</div>
                <div className="text-xs text-google-textSecondary">user@example.com</div>
              </div>
              <button className="text-sm text-google-blue hover:text-google-blueHover">Manage Google Account</button>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-300">
                 <LogOut size={16} />
                 <span className="text-sm font-medium">Sign out</span>
              </div>
            </div>
          </div>

          {/* General Preferences */}
          <div className="bg-google-surface border border-google-border rounded-xl p-6">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center">
                <Monitor size={18} />
              </div>
              <h2 className="text-lg font-medium text-google-text">General</h2>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-google-border">
               <span className="text-sm text-google-text">Theme</span>
               <select className="bg-google-surface2 border-none text-sm text-google-text rounded-lg px-3 py-2 focus:ring-1 focus:ring-google-blue">
                 <option>Dark</option>
                 <option>Light</option>
                 <option>System</option>
               </select>
            </div>
            <div className="flex items-center justify-between pt-4">
               <span className="text-sm text-google-text">Syntax Highlighting</span>
               <div className="w-10 h-5 bg-google-blue rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
               </div>
            </div>
          </div>

           {/* Data & Privacy */}
           <div className="bg-google-surface border border-google-border rounded-xl p-6">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                <Shield size={18} />
              </div>
              <h2 className="text-lg font-medium text-google-text">Data & Privacy</h2>
            </div>
            
            <div className="flex items-center justify-between py-3">
               <div>
                  <div className="text-sm text-google-text">API Data Usage</div>
                  <div className="text-xs text-google-textSecondary mt-1">Allow Google to use your data to improve models</div>
               </div>
                <div className="w-10 h-5 bg-google-surface2 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-google-textSecondary rounded-full absolute left-1 top-1"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;