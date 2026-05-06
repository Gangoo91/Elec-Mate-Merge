/**
 * ScrollableChips — editorial horizontal spec chip strip.
 *
 * Drops the yellow gradient flood + icon glyph for tight editorial chip
 * with eyebrow label + tabular value. Same horizontal-scroll semantics.
 */

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChipItem {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface ScrollableChipsProps {
  items: ChipItem[];
  className?: string;
}

export function ScrollableChips({ items, className }: ScrollableChipsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn('flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1', className)}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="shrink-0 rounded-xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-3 py-2.5 min-w-[88px]"
        >
          <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
            {item.label}
          </span>
          <div className="mt-0.5 text-[14px] sm:text-[15px] font-semibold tabular-nums text-elec-yellow leading-tight">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollableChips;
