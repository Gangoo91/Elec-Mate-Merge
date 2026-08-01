/**
 * RiskLevelSlider — the overall risk rating for the briefing.
 *
 * Three 100px cards in a three-across grid, each with a shield icon in a
 * coloured tile, a coloured label, an animated pulse on selection, a floating
 * indicator dot and a description squeezed into a third of the screen width —
 * "Additional safety measures required" wrapped to four lines on a phone, so
 * the sentence explaining the choice was the hardest thing on screen to read.
 *
 * It is now a segmented chip row with the selected level explained underneath at
 * full width. Same three choices, one line each, and the description is legible.
 *
 * On colour: selection is yellow, the same as every other chip in the document,
 * because selection is selection. Severity is carried by the level name in the
 * sentence below — amber for medium, red for high — so the meaning survives
 * without three competing fills fighting the accent. Low is plain white rather
 * than green: "low risk" is the ordinary case and does not need celebrating,
 * and a green tick on a safety document is exactly the kind of unearned
 * reassurance this app should not be handing out.
 */

import { cn } from '@/lib/utils';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskLevelSliderProps {
  value: RiskLevel;
  onChange: (level: RiskLevel) => void;
  error?: string;
}

const riskLevels: { id: RiskLevel; label: string; description: string; severity: string }[] = [
  {
    id: 'low',
    label: 'Low',
    description: 'Standard precautions apply.',
    severity: 'text-white',
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Additional safety measures required.',
    severity: 'text-amber-400',
  },
  {
    id: 'high',
    label: 'High',
    description: 'Strict controls and supervision needed.',
    severity: 'text-red-400',
  },
];

/** Verbatim from CLAUDE.md → Design System → Form Controls. */
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function RiskLevelSlider({ value, onChange, error }: RiskLevelSliderProps) {
  const selected = riskLevels.find((l) => l.id === value);

  return (
    <div className="space-y-3">
      <label className="block text-[12px] font-medium text-white">
        Overall risk level
        <span className="text-elec-yellow"> *</span>
      </label>

      <div role="radiogroup" className="grid grid-cols-3 gap-2">
        {riskLevels.map((level) => {
          const isActive = level.id === value;
          return (
            <button
              key={level.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(level.id)}
              className={cn(
                'h-11 touch-manipulation rounded-full border text-[14px] transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                isActive ? chipOn : chipOff
              )}
            >
              {level.label}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="text-[13px] leading-snug text-white">
          <span className={cn('font-semibold', selected.severity)}>{selected.label} risk</span>
          {' — '}
          {selected.description}
        </p>
      )}

      {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
    </div>
  );
}
