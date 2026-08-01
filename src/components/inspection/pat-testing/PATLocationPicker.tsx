/**
 * PATLocationPicker — Location input with copy/paste between appliances
 *
 * Stores recent locations in local state. "Paste from previous" pre-fills
 * the location from the last-used value.
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface PATLocationPickerProps {
  value: string;
  onChange: (value: string) => void;
  recentLocations: string[];
  onAddRecent: (location: string) => void;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

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
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="e.g. Kitchen, Office 1"
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
            className={inputCn}
          />
        </div>
        {uniqueRecent.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (uniqueRecent.length > 0) {
                onChange(uniqueRecent[0]);
              }
            }}
            className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-transform"
            title="Paste last location"
          >
            Paste
          </button>
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
              className="flex h-11 items-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm text-white touch-manipulation hover:bg-white/[0.09] transition-colors"
            >
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PATLocationPicker;
