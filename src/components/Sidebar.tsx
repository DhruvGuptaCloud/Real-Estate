import { Home, FileText, Settings, HelpCircle, Activity } from 'lucide-react';
import { ViewType } from '../App';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Fragment } from 'react';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'list', icon: Home, label: 'Properties' },
    { id: 'audit', icon: Activity, label: 'Audit Log' }
  ];

  return (
    <div className="w-16 md:w-64 bg-slate-900 text-slate-300 h-full flex flex-col justify-between py-4 transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
            AI
          </div>
          <span className="font-bold text-lg hidden md:block whitespace-nowrap text-white">Pricing Copilot</span>
        </div>

        <nav className="flex flex-col gap-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'list' && currentView === 'workspace');
            return (
              <Fragment key={item.id}>
                <Tooltip>
                  <TooltipTrigger render={
                    <button
                      onClick={() => setCurrentView(item.id as ViewType)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full text-sm",
                        isActive
                          ? "bg-slate-800 text-white font-medium"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="hidden md:block">{item.label}</span>
                    </button>
                  } />
                  <TooltipContent side="right" className="md:hidden bg-slate-800 text-white border-slate-700">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </Fragment>
            );
          })}
        </nav>
      </div>

      <div className="px-2 flex flex-col gap-2">
        <Tooltip>
           <TooltipTrigger render={
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-slate-800 transition-colors w-full text-sm">
              <Settings className="w-5 h-5 shrink-0" />
              <span className="hidden md:block">Settings</span>
            </button>
           } />
           <TooltipContent side="right" className="md:hidden bg-slate-800 text-white border-slate-700">Settings</TooltipContent>
        </Tooltip>

        <div className="mt-4 pt-4 border-t border-slate-800 px-3 flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-xs font-bold shrink-0">
            SA
          </div>
          <div className="flex flex-col hidden md:block overflow-hidden">
            <span className="text-sm font-semibold truncate leading-tight text-slate-200">Sarah Analyst</span>
            <span className="text-[10px] text-slate-400 truncate leading-tight uppercase font-medium">Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
