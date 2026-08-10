/**
 * ClientTypeSelector — who the explanation is for. Four chips, 2x2.
 *
 * Was four coloured icon tiles driven by a `colorMap` of ring / background /
 * icon colours in blue, green, purple and orange. That is a four-colour scheme
 * carrying nothing the four words don't already say, and it spent colour on
 * the OPTIONS — which left the app's one accent with no way to say which of
 * them is currently selected. Volt now means selected, here as everywhere.
 *
 * The icons went with it. A house glyph beside the word "Homeowner" is
 * decoration, and dropping it is what lets the chip be 60px instead of 66px
 * with a 40px tile inside it.
 */

import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export type ClientType = 'homeowner' | 'business' | 'landlord' | 'contractor';

interface ClientTypeSelectorProps {
  selected: ClientType;
  onSelect: (type: ClientType) => void;
}

const CLIENT_TYPES: { type: ClientType; label: string; desc: string }[] = [
  { type: 'homeowner', label: 'Homeowner', desc: 'Residential' },
  { type: 'business', label: 'Business', desc: 'Commercial' },
  { type: 'landlord', label: 'Landlord', desc: 'Rental' },
  { type: 'contractor', label: 'Contractor', desc: 'Trades' },
];

const ClientTypeSelector = ({ selected, onSelect }: ClientTypeSelectorProps) => {
  const haptic = useHaptic();

  return (
    <div className="grid grid-cols-2 gap-2">
      {CLIENT_TYPES.map(({ type, label, desc }) => {
        const on = selected === type;
        return (
          <button
            key={type}
            type="button"
            aria-pressed={on}
            onClick={() => {
              haptic.light();
              onSelect(type);
            }}
            className={cn(
              'min-h-[60px] rounded-xl border px-3 py-2.5 text-left',
              'transition-colors duration-150 touch-manipulation select-none',
              '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
              on
                ? 'border-elec-yellow bg-elec-yellow'
                : 'border-white/[0.12] bg-white/[0.06] hover:border-white/[0.28]'
            )}
          >
            <span
              className={cn(
                'block text-[14px] font-semibold leading-tight',
                on ? 'text-black' : 'text-white'
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'mt-0.5 block text-[11.5px] leading-tight',
                on ? 'text-black/70' : 'text-white'
              )}
            >
              {desc}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ClientTypeSelector;
