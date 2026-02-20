import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SiteVisit, PropertyType } from '@/types/siteVisit';

interface SiteVisitPropertyStepProps {
  visit: SiteVisit;
  onUpdateProperty: (
    updates: Partial<
      Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode' | 'propertyType' | 'accessNotes'>
    >
  ) => void;
}

export const SiteVisitPropertyStep = ({ visit, onUpdateProperty }: SiteVisitPropertyStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Property Details</h2>
        <p className="text-sm text-white mt-1">Where is the work being carried out?</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Property Address *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              value={visit.propertyAddress || ''}
              onChange={(e) => onUpdateProperty({ propertyAddress: e.target.value })}
              placeholder="123 High Street, Town"
              className="h-11 pl-10 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              autoCapitalize="words"
              autoComplete="street-address"
              enterKeyHint="next"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white">Postcode</label>
          <Input
            value={visit.propertyPostcode || ''}
            onChange={(e) => onUpdateProperty({ propertyPostcode: e.target.value.toUpperCase() })}
            placeholder="AB1 2CD"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 uppercase"
            maxLength={8}
            autoCapitalize="characters"
            autoComplete="postal-code"
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
            className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
            autoCapitalize="sentences"
            spellCheck
            enterKeyHint="done"
          />
        </div>
      </div>
    </div>
  );
};
