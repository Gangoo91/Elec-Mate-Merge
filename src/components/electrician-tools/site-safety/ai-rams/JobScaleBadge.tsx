import React from 'react';
import { cn } from '@/lib/utils';
import { chipBase, chipOn, chipOff, labelCn } from '@/components/forms/fieldStyles';

export interface JobScaleBadgeProps {
  scale: 'domestic' | 'commercial' | 'industrial';
  confidence: number;
  onManualChange?: (scale: 'domestic' | 'commercial' | 'industrial') => void;
}

const SCALES: Array<{ value: JobScaleBadgeProps['scale']; label: string }> = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];

/**
 * Job scale — detected from the brief, overridable in one tap.
 *
 * Was a coloured pill (green/blue/orange) plus a `<details>` disclosure. Three
 * problems with that: the colours were off-palette (the industrial orange in
 * particular), it used emoji icons, and the summary rendered the browser's
 * native ▶ marker *and* a hardcoded ▼, so it read "▶ ▼Not right? Change it".
 * Changing the scale also took two interactions.
 *
 * A segmented control shows the detected value AND the alternatives at once, so
 * correcting it is a single tap, and selection is carried by elec-yellow like
 * every other choice in the app.
 */
export const JobScaleBadge: React.FC<JobScaleBadgeProps> = ({
  scale,
  confidence,
  onManualChange,
}) => {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className={cn(labelCn, 'mb-0')}>Job scale</span>
        {confidence > 70 && (
          <span className="text-[11px] font-medium text-white">
            Detected from your brief
          </span>
        )}
      </div>

      <div
        role={onManualChange ? 'radiogroup' : undefined}
        aria-label="Job scale"
        className="grid grid-cols-3 gap-2"
      >
        {SCALES.map((s) => {
          const selected = s.value === scale;
          return (
            <button
              key={s.value}
              type="button"
              role={onManualChange ? 'radio' : undefined}
              aria-checked={onManualChange ? selected : undefined}
              disabled={!onManualChange}
              onClick={() => onManualChange?.(s.value)}
              className={cn(
                chipBase,
                selected ? chipOn : chipOff,
                'px-2',
                !onManualChange && 'cursor-default'
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
