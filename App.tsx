import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './pages/Workspace';
import Library from './pages/Library';
import ApiKeys from './pages/ApiKeys';
import TunedModels from './pages/TunedModels';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const renderContent = () => {
    switch (currentPath) {
      case '/': return <Workspace />;
      case '/library': return <Library />;
      case '/apikeys': return <ApiKeys />;
      case '/tuned': return <TunedModels />;
      case '/settings': return <Settings />;
      default: return <Workspace />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-google-bg text-google-text overflow-hidden font-sans antialiased">
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;