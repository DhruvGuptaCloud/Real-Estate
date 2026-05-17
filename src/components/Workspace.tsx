import { useState } from 'react';
import { Property, mockComps, CompProperty } from '../data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, Building, TrendingUp, HelpCircle, X, Check, XCircle, Search, ThumbsUp, Send, Home } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';

interface WorkspaceProps {
  property: Property;
  onBack: () => void;
  onShowAudit: () => void;
}

export function Workspace({ property, onBack, onShowAudit }: WorkspaceProps) {
  const [activeComps, setActiveComps] = useState<CompProperty[]>(mockComps);
  const [overridePrice, setOverridePrice] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [status, setStatus] = useState<string>('Ready for Review');
  const [aiPrice, setAiPrice] = useState(3350);

  const handleApplyFeedback = () => {
    setStatus('Price Updated & Logged');
    setTimeout(() => {
      onShowAudit();
    }, 1500);
  };

  return (
    <div className="flex h-full overflow-hidden w-full relative">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 text-slate-500 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight">{property.address}</h2>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 shadow-none font-medium text-xs">
                  {status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                <span className="font-medium text-slate-700">{property.beds} Bed, {property.baths} Bath, {property.sqft} sqft</span>
                <span>•</span>
                <span>Current Rent: <span className="font-mono font-medium">${property.currentRent.toLocaleString()}</span></span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onShowAudit}>Audit Log</Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800">Save Progress</Button>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6 pb-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm border-slate-200 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-5">
                <TrendingUp className="w-48 h-48" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-500 text-sm font-semibold uppercase tracking-wider">AI Recommendation</CardTitle>
                <div className="flex justify-between items-start mb-4 mt-2">
                  <div>
                     <p className="text-4xl font-bold text-slate-900">${aiPrice.toLocaleString()}<span className="text-lg font-normal text-slate-400 ml-1">/mo</span></p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">+4.2% VS PREV</div>
                </div>
                <CardDescription className="text-slate-600 font-medium">Confidence Range: ${aiPrice - 100} - ${aiPrice + 150}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    Primary Price Drivers
                    <Tooltip>
                      <TooltipTrigger><HelpCircle className="w-4 h-4 text-slate-400" /></TooltipTrigger>
                      <TooltipContent>Factors calculated from comp comparisons and localized data</TooltipContent>
                    </Tooltip>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600">Comparable Rents</span>
                      </div>
                      <span className="font-mono font-medium text-emerald-600">+$250</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600">School Quality (A+)</span>
                      </div>
                      <span className="font-mono font-medium text-emerald-600">+$120</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600">Proximity to Transit</span>
                      </div>
                      <span className="font-mono font-medium text-emerald-600">+$80</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-slate-600">Construction Noise</span>
                      </div>
                      <span className="font-mono font-medium text-red-500">-$100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base text-slate-800">Analyst Override</CardTitle>
                <CardDescription>Adjust the price manually if needed</CardDescription>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Final Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-medium text-slate-500">$</span>
                    <Input 
                      type="number" 
                      placeholder={aiPrice.toString()} 
                      className="pl-7 font-mono text-lg font-medium"
                      value={overridePrice}
                      onChange={e => setOverridePrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Override Rationale</label>
                  <Textarea 
                    placeholder="E.g., Adjusted down 2% due to road work on main street..." 
                    className="resize-none h-24 text-sm"
                    value={overrideReason}
                    onChange={e => setOverrideReason(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleApplyFeedback}>
                   <Check className="w-4 h-4 mr-2" /> Apply & Submit
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center justify-between">
              Comp Explorer
              <Button variant="outline" size="sm" className="h-8 shadow-sm">
                <Search className="w-4 h-4 mr-1.5 text-slate-500" /> Find More Comps
              </Button>
            </h3>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
              
              <div className="xl:col-span-2 overflow-y-auto pr-2 space-y-3">
                {activeComps.map(comp => (
                  <Card key={comp.id} className="comp-card border-l-4 border-l-transparent hover:border-l-blue-600 hover:bg-blue-50/30 transition-all shadow-sm border-y border-r border-slate-200 overflow-hidden flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-32 sm:h-auto shrink-0 relative bg-slate-100">
                      <img src={comp.image} alt={comp.address} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 flex items-center">
                        <Badge className="bg-emerald-100 hover:bg-emerald-100 text-emerald-800 shadow-sm border-0 font-bold text-[10px] px-1.5 py-0.5 rounded">
                          {comp.matchScore}% Match
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 truncate">{comp.address}</h4>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                            <span>{comp.beds} Bed, {comp.baths} Bath, {comp.sqft} sqft</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono font-medium text-lg text-slate-900">${comp.currentRent.toLocaleString()}</div>
                          <div className="text-xs text-slate-400">{comp.lastPriced}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                        <div className="flex flex-wrap gap-1.5 flex-1">
                          {comp.differences.map((diff, i) => (
                            <Badge key={i} variant="secondary" className={`font-normal text-xs px-2 ${
                              diff.type === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {diff.label}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Popover>
                            <PopoverTrigger render={
                              <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2">
                                Why this comp?
                              </Button>
                            } />
                            <PopoverContent className="w-72 p-4 text-sm shadow-xl" side="top">
                              <h5 className="font-semibold text-slate-900 mb-2 border-b border-slate-100 pb-2">AI Inclusion Rationale</h5>
                              <p className="text-slate-600 mb-3 leading-relaxed">
                                Extremely similar floorplan within a 0.5 mile radius. Last priced recently, reflecting current market conditions. 
                              </p>
                              <div className="space-y-2">
                                {comp.differences.map((diff, i) => (
                                  <div key={i} className="flex justify-between text-xs">
                                    <span className="text-slate-500">{diff.detail}</span>
                                    <span className={`font-mono font-medium ${diff.type === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>
                                      {diff.detail.split(' ').pop()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setActiveComps(activeComps.filter(c => c.id !== comp.id))}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              
              <div className="bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200">
                {/* CSS simulated map for prototype */}
                <div className="absolute inset-0 opacity-100" 
                     style={{
                       background: 'linear-gradient(45deg, #e2e8f0 25%, #cbd5e1 25%, #cbd5e1 50%, #e2e8f0 50%, #e2e8f0 75%, #cbd5e1 75%, #cbd5e1 100%)',
                       backgroundSize: '40px 40px'
                     }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Subject pin */}
                  <div className="absolute z-10 -translate-y-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-110">
                      <Home className="w-4 h-4" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
                    </div>
                  </div>
                  
                  {/* Comp pins */}
                  {activeComps.map((comp, i) => {
                    const positions = [
                      { top: '30%', left: '30%' },
                      { top: '65%', left: '70%' },
                      { top: '40%', left: '60%' }
                    ];
                    const pos = positions[i % positions.length];
                    return (
                      <div key={comp.id} className="absolute hidden md:block" style={{ top: pos.top, left: pos.left }}>
                         <div className="group relative">
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white cursor-pointer transform transition-transform hover:scale-110">
                            <span className="text-[10px] font-bold">{i + 1}</span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-emerald-500"></div>
                          </div>
                          {/* Mini detail card on hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-white text-slate-900 shadow-xl rounded-md border border-slate-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                             <div className="font-semibold text-xs truncate">{comp.address}</div>
                             <div className="font-mono text-xs mt-1 text-slate-500">${comp.currentRent}</div>
                          </div>
                         </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-slate-200/50 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div> Subject Property</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Comps</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Right Sidebar Component: Copilot Chat */}
      <ChatSidebar />
    </div>
  );
}
