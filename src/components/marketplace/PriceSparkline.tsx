import { PricePoint } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface PriceSparklineProps {
  history: PricePoint[];
  currentPrice: number;
  className?: string;
}

/**
 * Tiny SVG sparkline showing price trend over time.
 * Green line = price went down, red = went up, white = stable.
 * No external dependencies — pure SVG.
 */
export function PriceSparkline({ history, currentPrice, className }: PriceSparklineProps) {
  // Need at least 2 points to draw a line
  if (!history || history.length < 2) return null;

  const prices = history.map((p) => p.price);
  // Add current price as the last point
  prices.push(currentPrice);

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;

  // If price hasn't changed, don't show sparkline
  if (range === 0) return null;

  const width = 60;
  const height = 20;
  const padding = 1;

  // Generate SVG path points
  const points = prices.map((price, i) => {
    const x = padding + (i / (prices.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (price - min) / range) * (height - 2 * padding);
    return { x, y };
  });

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  // Determine trend colour
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const trendColor =
    lastPrice < firstPrice - 0.01
      ? '#22c55e' // green — price dropped
      : lastPrice > firstPrice + 0.01
        ? '#ef4444' // red — price increased
        : '#ffffff'; // white — stable

  // Trend label
  const pctChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const trendText =
    Math.abs(pctChange) < 1
      ? null
      : pctChange < 0
        ? `${Math.abs(pctChange).toFixed(0)}% lower`
        : `${pctChange.toFixed(0)}% higher`;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="flex-shrink-0"
        aria-label={trendText ? `Price trend: ${trendText}` : 'Price trend: stable'}
      >
        {/* Gradient fill under the line */}
        <defs>
          <linearGradient
            id={`spark-fill-${trendColor.replace('#', '')}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={trendColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <path
          d={`${pathData} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`}
          fill={`url(#spark-fill-${trendColor.replace('#', '')})`}
        />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={trendColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Current price dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2"
          fill={trendColor}
        />
      </svg>

      {trendText && (
        <span
          className={cn(
            'text-[10px] font-medium whitespace-nowrap',
            lastPrice < firstPrice ? 'text-green-500' : 'text-red-500'
          )}
        >
          {trendText}
        </span>
      )}
    </div>
  );
}

export default PriceSparkline;
