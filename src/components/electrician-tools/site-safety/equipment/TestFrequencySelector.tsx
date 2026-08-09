/**
 * Test interval picker.
 *
 * Selection used to be a `border border-elec-yellow/35` rectangle sliding behind
 * the label, with BOTH states rendered `text-white` — a dim gold hairline was the
 * entire difference between chosen and not chosen, on a control where getting it
 * wrong sets the wrong test interval on a piece of safety equipment. Selection is
 * now the solid volt chip the design system specifies for a small single-choice
 * set, so it is unambiguous in daylight.
 */

import { cn } from '@/lib/utils';

export type FrequencyOption = 90 | 180 | 365 | 730 | 'custom';

interface FrequencyChoice {
  value: number;
  label: string;
  shortLabel: string;
}

const frequencies: FrequencyChoice[] = [
  { value: 90, label: '3 months', shortLabel: '3mo' },
  { value: 180, label: '6 months', shortLabel: '6mo' },
  { value: 365, label: '12 months', shortLabel: '12mo' },
  { value: 730, label: '24 months', shortLabel: '24mo' },
];

interface TestFrequencySelectorProps {
  value: number | undefined;
  onChange: (days: number) => void;
  error?: string;
}

export function TestFrequencySelector({ value, onChange, error }: TestFrequencySelectorProps) {
  const currentPreset = frequencies.find((f) => f.value === value);

  return (
    <div className="space-y-2">
      <label className="mb-1 block text-[12px] font-medium text-white">Test frequency</label>

      <div className="grid grid-cols-4 gap-1.5">
        {frequencies.map((freq) => {
          const isSelected = value === freq.value;
          return (
            <button
              key={freq.value}
              type="button"
              onClick={() => onChange(freq.value)}
              aria-pressed={isSelected}
              className={cn(
                'h-11 rounded-xl border text-[12.5px] transition-colors duration-150',
                'touch-manipulation active:scale-[0.96] active:brightness-110',
                '[-webkit-tap-highlight-color:transparent]',
                isSelected
                  ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                  : 'border-white/[0.1] bg-white/[0.05] font-medium text-white'
              )}
            >
              {freq.shortLabel}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-white">
        {currentPreset
          ? `Due for testing every ${currentPreset.label}.`
          : 'Choose how often this equipment must be tested.'}
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
