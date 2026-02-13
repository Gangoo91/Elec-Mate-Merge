import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RAMSSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const RAMSSearchBar = ({ searchTerm, onSearchChange }: RAMSSearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      {!searchTerm && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
      )}
      <Input
        type="text"
        placeholder="Search by project, location, or assessor..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn("pr-10 h-11 bg-background border-border", !searchTerm && "pl-10")}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSearchChange('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
