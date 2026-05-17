import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, MessageSquare, Edit3, User, CheckCircle2 } from 'lucide-react';

interface AuditLogProps {
  onBack: () => void;
}

export function AuditLog({ onBack }: AuditLogProps) {
  const logs = [
    {
      id: 1,
      property: '1042 W Fulton Market, Unit 3B',
      user: 'Sarah Analyst',
      action: 'Price Overridden & Locked',
      detail: 'Adjusted down 2% due to road work on main street',
      time: 'Just now',
      tag: 'success'
    },
    {
      id: 2,
      property: '1042 W Fulton Market, Unit 3B',
      user: 'Sarah Analyst',
      action: 'Copilot Query',
      detail: 'Asked: "How does local construction affect this price?"',
      time: '12 mins ago',
      tag: 'info'
    },
    {
      id: 3,
      property: '1042 W Fulton Market, Unit 3B',
      user: 'Sarah Analyst',
      action: 'Comp Removed',
      detail: 'Removed 1100 W Fulton Market, Unit 1B (High noise rating)',
      time: '15 mins ago',
      tag: 'warning'
    },
    {
      id: 4,
      property: '1631 N Milwaukee Ave, Unit 401',
      user: 'John Manager',
      action: 'Price Approved',
      detail: 'Approved AI generated price of $2,100',
      time: '2 days ago',
      tag: 'success'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Audit Log & History</h1>
          <p className="text-slate-500 mt-1">Traceability matrix of portfolio pricing updates.</p>
        </div>
      </div>

      <Card className="flex-1 overflow-auto bg-white border border-slate-200 shadow-sm relative">
        <CardHeader className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-100">
          <CardTitle className="text-lg">Recent Pricing Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:inset-y-0 before:left-[17px] sm:before:left-[25px] before:w-[2px] before:bg-slate-100">
            {logs.map((log) => (
              <div key={log.id} className="relative">
                {/* Timeline dot/icon */}
                <div className={`absolute -left-[30px] sm:-left-[38px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center
                   ${log.tag === 'success' ? 'bg-emerald-500 text-white' : 
                     log.tag === 'warning' ? 'bg-amber-500 text-white' : 
                     'bg-blue-500 text-white'}`}
                >
                  {log.tag === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                   log.tag === 'warning' ? <Edit3 className="w-4 h-4" /> :
                   <MessageSquare className="w-4 h-4" />}
                </div>

                <div className="bg-white border text-sm border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 align-top">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-base">{log.action}</h4>
                      <div className="text-slate-500 text-xs mt-0.5">{log.property}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {log.time}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700 italic border-l-4 border-l-blue-200">
                    "{log.detail}"
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500 pt-3 border-t border-slate-50">
                    <div className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-3 h-3" />
                    </div>
                    {log.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
