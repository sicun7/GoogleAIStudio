import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Workspace from './pages/Workspace';
import Library from './pages/Library';
import ApiKeys from './pages/ApiKeys';
import TunedModels from './pages/TunedModels';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen w-screen bg-google-bg text-google-text overflow-hidden font-sans antialiased">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Workspace />} />
            <Route path="/library" element={<Library />} />
            <Route path="/apikeys" element={<ApiKeys />} />
            <Route path="/tuned" element={<TunedModels />} />
            <Route path="/settings" element={
                <div className="flex items-center justify-center h-full text-google-textSecondary">Settings Placeholder</div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;