import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlacesAutocomplete } from '@/components/ui/PlacesAutocomplete';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import type { SiteVisit, PropertyType } from '@/types/siteVisit';

interface PreviousVisitResult {
  id: string;
  propertyAddress: string;
  status: string;
  updatedAt: string;
}

interface SiteVisitPropertyStepProps {
  visit: SiteVisit;
  onUpdateProperty: (
    updates: Partial<
      Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode' | 'propertyType' | 'accessNotes'>
    >
  ) => void;
}

export const SiteVisitPropertyStep = ({ visit, onUpdateProperty }: SiteVisitPropertyStepProps) => {
  const { searchPreviousVisits } = useSiteVisitStorage();
  const [previousVisits, setPreviousVisits] = useState<PreviousVisitResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search on address changes
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    const query = visit.propertyAddress || '';
    if (query.trim().length < 3) {
      setPreviousVisits([]);
      return;
    }

    searchTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchPreviousVisits(query);
      // Exclude current visit from results
      setPreviousVisits(results.filter((r) => r.id !== visit.id));
      setIsSearching(false);
    }, 300);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [visit.propertyAddress, visit.id, searchPreviousVisits]);

  // Handle Google Places selection — auto-fill address + postcode
  const handlePlaceSelect = useCallback(
    (place: { address: string; postcode?: string }) => {
      const updates: Partial<Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode'>> = {
        propertyAddress: place.address,
      };
      if (place.postcode) {
        updates.propertyPostcode = place.postcode.toUpperCase();
      }
      onUpdateProperty(updates);
    },
    [onUpdateProperty]
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
          Property details
        </h2>
        <p className="mt-1 text-[12.5px] text-white/65">
          Where is the work being carried out?
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Property Address *</label>
          <PlacesAutocomplete
            value={visit.propertyAddress || ''}
            onChange={(value) => onUpdateProperty({ propertyAddress: value })}
            onPlaceSelect={handlePlaceSelect}
            placeholder="Start typing an address..."
            className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
          />

          {/* Previous visits dropdown */}
          {previousVisits.length > 0 && (
            <div className="rounded-xl border border-white/10 overflow-hidden mt-1">
              <div className="px-3 py-1.5 bg-white/[0.02]">
                <p className="text-[11px] text-white font-medium">
                  Previous visits at this address
                </p>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {previousVisits.map((pv) => (
                  <button
                    key={pv.id}
                    onClick={() => window.open(`/electrician/site-visit/${pv.id}`, '_blank')}
                    className="w-full flex items-center gap-2 px-3 py-2 touch-manipulation active:bg-white/[0.05] text-left"
                  >
                    <Clock className="h-3.5 w-3.5 text-white flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{pv.propertyAddress}</p>
                      <p className="text-[11px] text-white">
                        {new Date(pv.updatedAt).toLocaleDateString('en-GB')} ·{' '}
                        {pv.status.replace('_', ' ')}
                      </p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-white flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Postcode</label>
          <Input
            value={visit.propertyPostcode || ''}
            onChange={(e) => onUpdateProperty({ propertyPostcode: e.target.value.toUpperCase() })}
            placeholder="AB1 2CD"
            className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] uppercase text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
            maxLength={8}
            autoCapitalize="characters"
            autoComplete="off"
            enterKeyHint="next"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Property Type</label>
          <Select
            value={visit.propertyType || ''}
            onValueChange={(val) => onUpdateProperty({ propertyType: val as PropertyType })}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
              <SelectItem value="residential" className="touch-manipulation">
                Residential
              </SelectItem>
              <SelectItem value="commercial" className="touch-manipulation">
                Commercial
              </SelectItem>
              <SelectItem value="industrial" className="touch-manipulation">
                Industrial
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Access Notes</label>
          <Textarea
            value={visit.accessNotes || ''}
            onChange={(e) => onUpdateProperty({ accessNotes: e.target.value })}
            placeholder="Gate code, parking, key safe location..."
            className="min-h-[80px] touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
            autoCapitalize="sentences"
            spellCheck
            enterKeyHint="done"
          />
        </div>
      </div>
    </div>
  );
};
