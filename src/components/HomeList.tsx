import { properties } from '../data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Home, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface HomeListProps {
  onSelectProperty: (id: string) => void;
}

export function HomeList({ onSelectProperty }: HomeListProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portfolio Pricing</h1>
          <p className="text-slate-500 mt-1">Review and approve AI-generated rental prices.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Search properties..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-white">
            <Filter className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-auto rounded-xl shadow-sm border-slate-200">
        <Table>
          <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>Overview</TableHead>
              <TableHead>Current Rent</TableHead>
              <TableHead>Last Priced</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => (
              <TableRow key={prop.id} className="group cursor-pointer hover:bg-slate-50 border-slate-100 transition-colors" onClick={() => onSelectProperty(prop.id)}>
                <TableCell>
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <img src={prop.image} alt="Property" className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-slate-900">{prop.address}</div>
                  <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <Home className="w-3 h-3" /> Chicago, IL
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-600 font-medium">{prop.beds} Beds • {prop.baths} Baths • {prop.sqft} sqft</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-medium">${prop.currentRent.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-slate-500">
                  {prop.lastPriced}
                </TableCell>
                <TableCell>
                  <Badge variant={prop.status === 'Ready' ? 'default' : prop.status === 'Completed' ? 'secondary' : 'outline'}
                    className={
                      prop.status === 'Ready' ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-transparent shadow-none" :
                      prop.status === 'Completed' ? "bg-green-100 text-green-800 hover:bg-green-100 border-transparent shadow-none" :
                      "bg-amber-50 text-amber-800 border-amber-200 shadow-none border"
                    }
                  >
                    {prop.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={(e) => { e.stopPropagation(); onSelectProperty(prop.id); }}>
                    Get Price <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
