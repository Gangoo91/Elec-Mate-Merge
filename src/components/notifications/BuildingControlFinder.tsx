import { useState, useEffect, useCallback } from 'react';
import { MapPin, Search, ArrowUpRight, Check, Loader2, Building2 } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';
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

const POSTCODE_RE = /[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i;

export const BuildingControlFinder = ({
  open,
  onOpenChange,
  onSelect,
  initialAddress = '',
}: BuildingControlFinderProps) => {
  const [searchQuery, setSearchQuery] = useState(initialAddress);
  const [results, setResults] = useState<BuildingControlResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const runSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        toast({ title: 'Enter a postcode', description: 'Type a UK postcode to find your council.', variant: 'destructive' });
        return;
      }
      setIsLoading(true);
      setSearched(true);
      try {
        const { data, error } = await supabase.functions.invoke('find-building-control', {
          body: { address: query },
        });
        if (error) throw error;
        setResults(data?.results || []);
        if (!data?.results?.length && data?.message) {
          toast({ title: 'No match', description: data.message });
        }
      } catch (err) {
        toast({
          title: 'Search failed',
          description: err instanceof Error ? err.message : 'Please try again.',
          variant: 'destructive',
        });
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // Effortless — when the job address has a postcode, resolve it on open.
  useEffect(() => {
    if (open) {
      setSearchQuery(initialAddress);
      setResults([]);
      setSearched(false);
      if (initialAddress && POSTCODE_RE.test(initialAddress)) {
        runSearch(initialAddress);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialAddress]);

  const handleSelect = (authority: BuildingControlResult) => {
    onSelect(authority.name);
    onOpenChange(false);
    toast({ title: 'Building Control set', description: `${authority.name} added to this notification.` });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/10 lg:left-64"
      >
        <div className="flex flex-col h-full">
          {/* Grab handle */}
          <div className="pt-3 pb-1 flex justify-center shrink-0">
            <div className="h-1 w-9 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-4 pt-1 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <h2 className="text-[16px] font-semibold tracking-tight text-white">Find your Building Control</h2>
            </div>
            <p className="mt-1 text-[12.5px] text-white/70">
              Your local council is the Building Control body — enter the job's postcode.
            </p>
          </div>

          {/* Search */}
          <div className="px-4 pb-3 shrink-0">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
                <input
                  inputMode="text"
                  autoCapitalize="characters"
                  placeholder="Postcode, e.g. CA28 8HE"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runSearch(searchQuery)}
                  className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                />
              </div>
              <button
                onClick={() => runSearch(searchQuery)}
                disabled={isLoading}
                className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-white/60">
                <Loader2 className="h-6 w-6 animate-spin mb-3" />
                <p className="text-[13px]">Finding your council…</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-[12px] text-white/60">
                  {results.length === 1 ? 'Your local authority' : `${results.length} councils cover this area`}
                </p>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                        <Building2 className="h-4 w-4 text-elec-yellow" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] font-semibold tracking-tight text-white leading-tight">
                          {result.name}
                        </h3>
                        <p className="mt-0.5 text-[12.5px] text-white/70 leading-snug">{result.address}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.website && (
                        <button
                          onClick={() => openExternalUrl(result.website!)}
                          className="group inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation transition-colors hover:border-elec-yellow/40 hover:bg-elec-yellow/[0.06] active:scale-[0.98]"
                        >
                          Contact &amp; forms
                          <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleSelect(result)}
                        className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
                      >
                        <Check className="h-3.5 w-3.5" /> Use this authority
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-3">
                  <MapPin className="h-5 w-5 text-white/40" />
                </span>
                <p className="text-[13.5px] font-medium text-white">
                  {searched ? 'No match for that postcode' : 'Enter a postcode to find your council'}
                </p>
                <p className="mt-1 text-[12px] text-white/60 max-w-xs">
                  {searched
                    ? 'Double-check the postcode, or search gov.uk for your local council.'
                    : 'Use the full postcode (e.g. CA28 8HE) for an exact match.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
