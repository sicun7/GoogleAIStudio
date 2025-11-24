import React from 'react';
import { MOCK_LIBRARY } from '../constants';
import { FileText, MoreVertical, Search } from 'lucide-react';

const Library: React.FC = () => {
  return (
    <div className="flex-1 bg-google-bg p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-normal text-google-text mb-2">My library</h1>
          <p className="text-google-textSecondary">Manage your saved prompts and chats.</p>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-google-textSecondary" size={18} />
            <input 
              type="text" 
              placeholder="Search prompts" 
              className="w-full bg-google-surface2 border-none rounded-full py-2 pl-10 pr-4 text-google-text focus:ring-1 focus:ring-google-border placeholder-google-textSecondary"
            />
          </div>
          
          <select className="bg-transparent text-google-text font-medium text-sm border-none focus:ring-0 cursor-pointer">
            <option>Last modified</option>
            <option>Name (A-Z)</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_LIBRARY.map((item) => (
            <div key={item.id} className="group bg-google-surface border border-google-border rounded-xl p-4 hover:border-google-blue hover:shadow-md transition-all cursor-pointer relative">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <button className="p-1 text-google-textSecondary hover:text-google-text rounded-full hover:bg-google-surface2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <h3 className="font-medium text-google-text text-lg mb-1 truncate">{item.name}</h3>
              <p className="text-sm text-google-textSecondary line-clamp-2 mb-4 h-10">{item.preview}</p>
              
              <div className="text-xs text-google-textSecondary border-t border-google-border pt-3 flex justify-between">
                <span>Edited {item.updatedAt}</span>
                <span className="font-medium text-google-blue">Chat</span>
              </div>
            </div>
          ))}

           {/* Empty State Mock for "New" */}
           <div className="border border-dashed border-google-border rounded-xl p-4 flex flex-col items-center justify-center text-google-textSecondary hover:border-google-textSecondary hover:bg-google-surface/50 transition-all cursor-pointer min-h-[160px]">
              <span className="text-2xl mb-2">+</span>
              <span className="font-medium">Create new</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Library;