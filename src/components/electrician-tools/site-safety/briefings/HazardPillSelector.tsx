/**
 * HazardPillSelector — choosing which hazards were covered in the briefing.
 *
 * This was a grid of 80px tiles: every hazard had its own icon and its own
 * accent colour, backed by a 130-line `colorMap` giving each of twelve colours
 * six variants (bg, bgSolid, border, text, ring, iconBg). Selecting three
 * hazards produced three differently coloured cards with three coloured icon
 * tiles and a floating yellow tick badge on each.
 *
 * None of that colour meant anything. Asbestos was rose and noise was orange
 * because the palette needed twelve entries, not because rose says anything
 * about asbestos — and a screen where everything is accented has no accent left
 * for the thing that matters. Severity is chosen separately on the risk slider,
 * which is where a colour judgement actually belongs.
 *
 * So this is now the selection chip documented in CLAUDE.md — `chipOn` /
 * `chipOff`, verbatim. Selected hazards are yellow on black and unmistakable;
 * unselected ones recede. Twelve fit in a wrap without scrolling, and the labels
 * can be read properly rather than truncated to fit a tile ("Hazardous Subs"
 * was not a phrase anyone uses).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SafetyDocField } from '../common/SafetyDocField';

interface Hazard {
  id: string;
  label: string;
}

const defaultHazards: Hazard[] = [
  { id: 'electrical', label: 'Electrical' },
  { id: 'fire', label: 'Fire' },
  { id: 'heights', label: 'Heights' },
  { id: 'falling-objects', label: 'Falling objects' },
  { id: 'confined-space', label: 'Confined space' },
  { id: 'manual-handling', label: 'Manual handling' },
  { id: 'hazardous-substances', label: 'Hazardous substances' },
  { id: 'noise', label: 'Noise' },
  { id: 'wet-slippery', label: 'Wet / slippery' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'machinery', label: 'Machinery' },
  { id: 'asbestos', label: 'Asbestos' },
];

/** Verbatim from CLAUDE.md → Design System → Form Controls. */
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

interface HazardPillSelectorProps {
  value: string[];
  onChange: (hazards: string[]) => void;
  error?: string;
}

export function HazardPillSelector({ value, onChange, error }: HazardPillSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customHazard, setCustomHazard] = useState('');
  const [customHazards, setCustomHazards] = useState<Hazard[]>([]);

  const allHazards = [...defaultHazards, ...customHazards];

  const toggleHazard = (hazardId: string) => {
    if (value.includes(hazardId)) {
      onChange(value.filter((id) => id !== hazardId));
    } else {
      onChange([...value, hazardId]);
    }
  };

  const addCustomHazard = () => {
    const trimmed = customHazard.trim();
    if (!trimmed) return;
    const id = `custom-${trimmed.toLowerCase().replace(/\s+/g, '-')}`;
    // Guard against adding the same custom hazard twice — the old version pushed
    // a duplicate id, rendering two identical chips that toggled as one.
    if (!allHazards.some((h) => h.id === id)) {
      setCustomHazards([...customHazards, { id, label: trimmed }]);
    }
    if (!value.includes(id)) onChange([...value, id]);
    setCustomHazard('');
    setShowCustomInput(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[12px] font-medium text-white">
          Hazards covered
          <span className="text-elec-yellow"> *</span>
        </label>
        <span className="shrink-0 text-[12px] font-medium tabular-nums text-white">
          {value.length} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allHazards.map((hazard) => {
          const isSelected = value.includes(hazard.id);
          return (
            <button
              key={hazard.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleHazard(hazard.id)}
              className={cn(
                'h-11 touch-manipulation rounded-full border px-4 text-[13px] transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                isSelected ? chipOn : chipOff
              )}
            >
              {hazard.label}
            </button>
          );
        })}

        {!showCustomInput && (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="h-11 touch-manipulation rounded-full border border-dashed border-white/25 px-4 text-[13px] font-medium text-white transition-colors hover:border-white/40"
          >
            Add another
          </button>
        )}
      </div>

      <AnimatePresence>
        {showCustomInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-end gap-2 pt-1">
              <div className="flex-1">
                <SafetyDocField
                  label="Other hazard"
                  placeholder="e.g. Overhead crane movements"
                  value={customHazard}
                  autoFocus
                  onChange={(e) => setCustomHazard(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomHazard();
                    }
                  }}
                />
              </div>
              <Button
                type="button"
                onClick={addCustomHazard}
                disabled={!customHazard.trim()}
                className="h-11 touch-manipulation bg-elec-yellow px-4 font-semibold text-black hover:brightness-110"
              >
                Add
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomHazard('');
                }}
                className="h-11 touch-manipulation px-3 font-medium text-white hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
    </div>
  );
}

export { defaultHazards };
