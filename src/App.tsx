import { useState } from 'react';
import { HomeList } from './components/HomeList';
import { Workspace } from './components/Workspace';
import { AuditLog } from './components/AuditLog';
import { Sidebar } from './components/Sidebar';
import { Property, properties } from './data';
import { TooltipProvider } from '@/components/ui/tooltip';

export type ViewType = 'list' | 'workspace' | 'audit';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView('workspace');
  };

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-slate-100 font-sans text-slate-900">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {currentView === 'list' && (
            <HomeList onSelectProperty={handleSelectProperty} />
          )}
          {currentView === 'workspace' && selectedProperty && (
            <Workspace property={selectedProperty} onBack={() => setCurrentView('list')} onShowAudit={() => setCurrentView('audit')} />
          )}
          {currentView === 'audit' && (
            <AuditLog onBack={() => setCurrentView('list')} />
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
