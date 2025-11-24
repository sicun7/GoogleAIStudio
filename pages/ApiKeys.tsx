import React from 'react';
import { MOCK_API_KEYS } from '../constants';
import { Key, Trash2, Copy, ExternalLink, Plus } from 'lucide-react';

const ApiKeys: React.FC = () => {
  return (
    <div className="flex-1 bg-google-bg p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-google-border pb-6">
          <h1 className="text-3xl font-normal text-google-text mb-4">API keys</h1>
          <p className="text-google-textSecondary text-sm leading-relaxed max-w-2xl">
            Your API keys allow you to access the Gemini API programmatically. 
            Keep them secure. Do not share them in public repositories.
            <a href="#" className="inline-flex items-center text-google-blue ml-2 hover:underline">
              View documentation <ExternalLink size={12} className="ml-1" />
            </a>
          </p>
        </header>

        <div className="mb-8">
          <button className="flex items-center gap-2 bg-google-accent hover:bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md">
            <Plus size={18} />
            Create API Key
          </button>
        </div>

        <div className="bg-google-surface border border-google-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-google-surface2 text-xs font-medium text-google-textSecondary uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Key</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-google-border">
              {MOCK_API_KEYS.map((key) => (
                <tr key={key.id} className="hover:bg-google-surface2/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-google-text">{key.name}</td>
                  <td className="px-6 py-4 text-sm font-mono text-google-textSecondary flex items-center gap-2">
                    {key.keyMasked}
                    <button className="text-google-textSecondary hover:text-google-text" title="Copy">
                      <Copy size={14} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-google-textSecondary">{key.createdAt}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      key.plan === 'Paid' ? 'bg-green-900/30 text-green-400' : 'bg-gray-700/50 text-gray-300'
                    }`}>
                      {key.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-google-textSecondary hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_API_KEYS.length === 0 && (
             <div className="p-8 text-center text-google-textSecondary">
                No API keys found. Create one to get started.
             </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-google-surface2/30 border border-google-border rounded-lg flex gap-4 items-start">
           <div className="p-2 bg-yellow-900/20 text-yellow-500 rounded-lg">
             <Key size={20} />
           </div>
           <div>
             <h4 className="text-sm font-medium text-google-text mb-1">Security Best Practices</h4>
             <p className="text-xs text-google-textSecondary">
               Never expose your API keys in client-side code. Use environment variables and backend proxies to keep your keys safe.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;