/**
 * BriefingTypePicker — choosing what kind of briefing this is.
 *
 * This was a three-across grid of 88px tiles, each with a coloured icon and a
 * one-word label: a hard hat, a lightning bolt, a spanner, a flame, an arrow, a
 * cog. Six tiles, six different accent colours, and the `description` written
 * for every one of them was never rendered — so "Toolbox" had to carry "daily
 * toolbox talk" on its own, and "Custom" told the user nothing at all.
 *
 * The specialist certificates make this kind of choice as a ruled list: the
 * option in full white, what it means underneath, and the selection carried by
 * the accent rather than by a filled box. That is what this is now. The
 * descriptions are visible, the six accent colours are gone, and a briefing type
 * reads as a decision rather than an icon you have to interpret.
 *
 * The icons are not swapped for better icons — they are removed. The design
 * system carries meaning in type (`.claude/rules/frontend.md`: "Section headings
 * are plain type: no icons, no dots, no gradient bars").
 */

import { cn } from '@/lib/utils';

export type BriefingType =
  'site-induction' | 'electrical' | 'toolbox-talk' | 'hot-works' | 'height-work' | 'custom';

interface BriefingTypeOption {
  id: BriefingType;
  label: string;
  description: string;
}

/**
 * Labels are the full name now rather than the tile-width abbreviation —
 * "Toolbox" was short because it had to fit a three-column grid, not because
 * that is what the briefing is called on paper.
 */
const briefingTypes: BriefingTypeOption[] = [
  {
    id: 'site-induction',
    label: 'Site induction',
    description: 'First day on site — layout, rules, welfare and emergency arrangements',
  },
  {
    id: 'electrical',
    label: 'Electrical safety',
    description: 'Isolation, proving dead, live working and the safe system of work',
  },
  {
    id: 'toolbox-talk',
    label: 'Toolbox talk',
    description: 'Short daily talk on a single topic before work starts',
  },
  {
    id: 'hot-works',
    label: 'Hot works',
    description: 'Cutting, grinding or soldering — permit, fire watch and extinguishers',
  },
  {
    id: 'height-work',
    label: 'Working at height',
    description: 'Access equipment, edge protection and dropped-object control',
  },
  {
    id: 'custom',
    label: 'Custom briefing',
    description: 'Anything else — you write the content and the hazards',
  },
];

interface BriefingTypePickerProps {
  value?: BriefingType;
  onChange: (type: BriefingType) => void;
  error?: string;
}

export function BriefingTypePicker({ value, onChange, error }: BriefingTypePickerProps) {
  return (
    <fieldset className="space-y-1">
      <legend className="mb-1 block text-[12px] font-medium text-white">
        Briefing type
        <span className="text-elec-yellow"> *</span>
      </legend>

      <div
        role="radiogroup"
        aria-invalid={error ? true : undefined}
        className="divide-y divide-white/[0.08] border-y border-white/[0.08]"
      >
        {briefingTypes.map((type) => {
          const isSelected = value === type.id;

          return (
            <button
              key={type.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(type.id)}
              className="flex w-full touch-manipulation items-start gap-3 px-1 py-3 text-left transition-colors active:bg-white/[0.04]"
            >
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'text-[15px] text-white',
                    isSelected ? 'font-semibold' : 'font-medium'
                  )}
                >
                  {type.label}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-white">{type.description}</p>
              </div>

              {/* Selection is a mark against the row, not a coloured fill. */}
              <span
                aria-hidden
                className={cn(
                  'mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors',
                  isSelected ? 'bg-elec-yellow' : 'bg-transparent'
                )}
              />
            </button>
          );
        })}
      </div>

      {error && <p className="mt-1 text-[11px] font-medium text-red-400">{error}</p>}
    </fieldset>
  );
}

export { briefingTypes };
