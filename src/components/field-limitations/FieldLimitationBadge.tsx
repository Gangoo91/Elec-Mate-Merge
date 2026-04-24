import React from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export type FieldMarker = 'LIM' | 'N/V' | 'N/A';

interface FieldLimitationBadgeProps {
  /** Current field value — marker is matched by equality. */
  value: string;
  /** Call with the new value (either the marker string or '' to clear). */
  onChange: (value: string) => void;
  /** Which markers this field supports. Defaults to just LIM. */
  markers?: FieldMarker[];
  /** Optional: called after the badge flips ON so the parent can clear sibling fields. */
  onMarkerActive?: (marker: FieldMarker) => void;
  /** Optional: called after the badge flips OFF. */
  onMarkerCleared?: () => void;
  className?: string;
  /** Compact mode — smaller height for inline use beside inputs. */
  compact?: boolean;
}

const MARKER_CLASSES: Record<FieldMarker, string> = {
  LIM: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
  'N/V': 'bg-slate-500/20 border-slate-500/40 text-slate-300',
  'N/A': 'bg-zinc-500/20 border-zinc-500/40 text-zinc-300',
};

/**
 * FieldLimitationBadge — small marker toggle (LIM / N/V / N/A).
 *
 * Matches the existing Main Protective Device LIM pattern from
 * `SupplyCharacteristicsSection`. When the current field value equals a
 * marker, that marker button is highlighted. Clicking a highlighted marker
 * clears the field. Clicking an inactive marker sets the field to that
 * marker and fires `onMarkerActive` so the caller can clear sibling fields
 * (e.g. when Ze = LIM, also clear Ipf-related noise).
 */
export const FieldLimitationBadge: React.FC<FieldLimitationBadgeProps> = ({
  value,
  onChange,
  markers = ['LIM'],
  onMarkerActive,
  onMarkerCleared,
  className,
  compact = false,
}) => {
  const haptic = useHaptic();

  const toggle = (marker: FieldMarker) => {
    haptic.light();
    if (value === marker) {
      onChange('');
      onMarkerCleared?.();
    } else {
      onChange(marker);
      onMarkerActive?.(marker);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {markers.map((marker) => (
        <button
          key={marker}
          type="button"
          onClick={() => toggle(marker)}
          className={cn(
            'rounded-lg font-semibold touch-manipulation transition-colors shrink-0 active:scale-[0.98] border',
            compact ? 'h-7 px-2 text-[10px]' : 'h-8 px-3 text-[10px]',
            value === marker
              ? MARKER_CLASSES[marker]
              : 'bg-white/[0.05] border-white/[0.08] text-white/70 hover:text-white'
          )}
          aria-pressed={value === marker}
          aria-label={`${marker} marker`}
        >
          {marker}
        </button>
      ))}
    </div>
  );
};

/** Helper — does the field hold a marker? */
export const isFieldMarker = (value: string | undefined | null): value is FieldMarker => {
  return value === 'LIM' || value === 'N/V' || value === 'N/A';
};
