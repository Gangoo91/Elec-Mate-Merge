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
      <div className="relative h-1.5 rounded-full bg-gradient-to-r from-elec-yellow/25 via-elec-yellow/50 to-elec-yellow/25">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-elec-yellow border-2 border-background shadow-[0_0_8px_rgba(250,204,21,0.45)]"
          style={{ left: `calc(${position}% - 7px)` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white tabular-nums">{gbp(p25)}</span>
          <span className="text-[10px] text-white tabular-nums">{gbp(p75)}</span>
        </div>
      )}
    </div>
  );
};

export default RangeBar;
