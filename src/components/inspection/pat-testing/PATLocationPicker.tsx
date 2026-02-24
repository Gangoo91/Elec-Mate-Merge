/**
 * PATLocationPicker — Location input with copy/paste between appliances
 *
 * Stores recent locations in local state. "Paste from previous" pre-fills
 * the location from the last-used value.
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, ClipboardPaste } from 'lucide-react';

interface PATLocationPickerProps {
  value: string;
  onChange: (value: string) => void;
  recentLocations: string[];
  onAddRecent: (location: string) => void;
}

const PATLocationPicker: React.FC<PATLocationPickerProps> = ({
  value,
  onChange,
  recentLocations,
  onAddRecent,
}) => {
  const [showRecent, setShowRecent] = useState(false);

  const uniqueRecent = [...new Set(recentLocations.filter((l) => l.trim()))].slice(0, 8);

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="e.g., Kitchen, Office 1"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => {
              if (value?.trim()) {
                onAddRecent(value.trim());
              }
              // Delay to allow click on recent items
              setTimeout(() => setShowRecent(false), 200);
            }}
            onFocus={() => {
              if (uniqueRecent.length > 0) setShowRecent(true);
            }}
            className="h-11 text-base touch-manipulation"
          />
        </div>
        {uniqueRecent.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              if (uniqueRecent.length > 0) {
                onChange(uniqueRecent[0]);
              }
            }}
            className="h-11 w-11 shrink-0 touch-manipulation"
            title="Paste last location"
          >
            <ClipboardPaste className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showRecent && uniqueRecent.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {uniqueRecent.map((loc, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(loc);
                setShowRecent(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white text-xs touch-manipulation hover:bg-white/[0.1] transition-colors"
            >
              <MapPin className="h-3 w-3" />
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PATLocationPicker;
