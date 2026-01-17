
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegulationSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const RegulationSearchBar = ({ searchTerm, onSearchChange }: RegulationSearchBarProps) => {
  return (
    <Card className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-border">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            {!searchTerm && (
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80 pointer-events-none" />
            )}
            <Input
              type="text"
              placeholder="Search regulations, test values, or requirements..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn("bg-muted border-border text-foreground placeholder-gray-400 h-14 text-lg", !searchTerm && "pl-12")}
            />
          </div>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-14 px-8 text-lg font-semibold">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulationSearchBar;
