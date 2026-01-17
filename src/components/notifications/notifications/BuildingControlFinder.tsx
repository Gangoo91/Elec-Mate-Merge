import { useState } from 'react';
import { MapPin, Search, ExternalLink, Phone, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface BuildingControlResult {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  distanceText?: string;
}

interface BuildingControlFinderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (authority: string) => void;
  initialAddress?: string;
}

export const BuildingControlFinder = ({
  open,
  onOpenChange,
  onSelect,
  initialAddress = '',
}: BuildingControlFinderProps) => {
  const [searchQuery, setSearchQuery] = useState(initialAddress);
  const [results, setResults] = useState<BuildingControlResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Search Required',
        description: 'Please enter a postcode or address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('find-building-control', {
        body: { address: searchQuery },
      });

      if (error) throw error;

      if (data?.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        toast({
          title: 'No Results',
          description: 'No building control offices found for this location',
        });
        setResults([]);
      }
    } catch (error: any) {
      console.error('Building control search error:', error);
      toast({
        title: 'Search Failed',
        description: error.message || 'Failed to search for building control offices',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (authority: BuildingControlResult) => {
    onSelect(authority.name);
    onOpenChange(false);
    toast({
      title: 'Building Control Selected',
      description: `${authority.name} has been added to this notification`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Find Your Local Council (Building Control)
          </DialogTitle>
          <DialogDescription>
            Enter your postcode or address to find your local council's building control office
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              )}
              <Input
                placeholder="Enter postcode or address (e.g., CA25 5EL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{ textAlign: 'left' }}
                className={cn("min-h-[48px] text-left placeholder:text-left", !searchQuery && "pl-10")}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="min-h-[48px] min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              <p className="text-sm font-medium text-muted-foreground">
                Found {results.length} building control office{results.length > 1 ? 's' : ''}
              </p>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-4 border rounded-lg space-y-2 hover:bg-accent transition-colors',
                    'sm:p-4 p-3'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base break-words">
                        {result.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words mt-1">
                        {result.address}
                      </p>
                      {result.distanceText && (
                        <p className="text-xs text-primary mt-1 font-medium">
                          {result.distanceText}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    {result.phone && (
                      <a
                        href={`tel:${result.phone}`}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-3 h-3 flex-shrink-0" />
                        <span className="break-all">{result.phone}</span>
                      </a>
                    )}
                    {result.website && (
                      <a
                        href={result.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Website</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    )}
                  </div>

                  <Button
                    onClick={() => handleSelect(result)}
                    className="w-full sm:w-auto min-h-[44px]"
                    variant="default"
                  >
                    Select This Authority
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Enter a postcode or address to find your local council</p>
              <p className="text-xs mt-2">Try entering your full postcode (e.g., CA25 5EL) for best results</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};