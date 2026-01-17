
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Search, FileText, Zap, Calculator, ShieldCheck } from 'lucide-react';
import { testingProceduresData } from './TestingProcedureData';
import { cn } from '@/lib/utils';

interface TestingProceduresFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const TestingProceduresFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory 
}: TestingProceduresFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Procedures', count: testingProceduresData.length, icon: <FileText className="h-4 w-4" /> },
    { id: 'continuity', label: 'Continuity', count: testingProceduresData.filter(p => p.category === 'continuity').length, icon: <Zap className="h-4 w-4" /> },
    { id: 'insulation', label: 'Insulation', count: testingProceduresData.filter(p => p.category === 'insulation').length, icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'impedance', label: 'Impedance', count: testingProceduresData.filter(p => p.category === 'impedance').length, icon: <Calculator className="h-4 w-4" /> },
    { id: 'rcd', label: 'RCD Testing', count: testingProceduresData.filter(p => p.category === 'rcd').length, icon: <ShieldCheck className="h-4 w-4" /> }
  ];

  const smartTabs: SmartTab[] = categories.map(category => ({
    value: category.id,
    label: `${category.label} (${category.count})`,
    icon: category.icon,
    content: <div></div> // Empty content as this is just for filtering
  }));

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80 pointer-events-none" />
        )}
        <Input
          placeholder="Search procedures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn("bg-card border-border text-foreground", !searchTerm && "pl-10")}
        />
      </div>
      
      <SmartTabs 
        tabs={smartTabs}
        value={activeCategory} 
        onValueChange={setActiveCategory} 
        className="w-full md:w-auto"
        breakpoint={3} // Use dropdown when more than 3 categories
      />
    </div>
  );
};

export default TestingProceduresFilter;
