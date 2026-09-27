import { cn } from '@/lib/utils';

const gbp = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

interface RangeBarProps {
  p25: number;
  median: number;
  p75: number;
  showLabels?: boolean;
  className?: string;
}

/**
 * Typical-range visual: track spans P25→P75 with a marker at the median's
 * relative position, so a skewed spread (median near one end) reads at a glance.
 */
const RangeBar = ({ p25, median, p75, showLabels = true, className }: RangeBarProps) => {
  const span = Math.max(p75 - p25, 1);
  const position = Math.min(Math.max(((median - p25) / span) * 100, 4), 96);

  return (
    <div className={cn('w-full', className)}>
      {/*
       * A NEUTRAL rail with one bright marker.
       *
       * This was a yellow gradient — `from-elec-yellow/25 via-/50 to-/25` —
       * which on a near-black panel renders as a flat khaki smudge: too dim
       * to read as data, too coloured to read as chrome. The range is already
       * stated by the two end labels and the caption, so the track does not
       * need to carry it in colour. Neutral rail, and the yellow spent where
       * it means something: the median.
       */}
      <div className="relative h-1.5 rounded-full bg-white/[0.12]">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-elec-yellow ring-2 ring-[#0a0a0a] shadow-[0_0_10px_rgba(250,204,21,0.55)]"
          style={{ left: `calc(${position}% - 7px)` }}
        />
      </div>
      {showLabels && (
        <div className="mt-2 flex justify-between">
          {/* 11px is the floor — 10px is unreadable on a phone at arm's length
              and is what `check:invoice-prompts` flags. */}
          <span className="text-[11px] text-white tabular-nums">{gbp(p25)}</span>
          <span className="text-[11px] text-white tabular-nums">{gbp(p75)}</span>
        </div>
      )}
    </div>
  );
};

export default RangeBar;
