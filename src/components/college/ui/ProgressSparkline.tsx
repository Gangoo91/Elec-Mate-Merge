import { useMemo } from 'react';

interface ProgressSparklineProps {
  /** Array of percentage values (0-100) over time, most recent last */
  data: number[];
  /** Width of the sparkline in pixels */
  width?: number;
  /** Height of the sparkline in pixels */
  height?: number;
  /** Colour of the line */
  colour?: string;
  /** Show trend indicator (up/down/flat) */
  showTrend?: boolean;
}

/**
 * Tiny inline sparkline chart showing progress trend.
 * Designed to fit inside student cards next to progress %.
 */
export function ProgressSparkline({
  data,
  width = 60,
  height = 20,
  colour,
  showTrend = true,
}: ProgressSparklineProps) {
  const { path, trend, trendColour, autoColour } = useMemo(() => {
    if (!data || data.length < 2) {
      return { path: '', trend: 'flat' as const, trendColour: 'text-white', autoColour: '#888' };
    }

    const points = data.slice(-8); // Last 8 data points max
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const padding = 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const coords = points.map((val, i) => ({
      x: padding + (i / (points.length - 1)) * chartWidth,
      y: padding + chartHeight - ((val - min) / range) * chartHeight,
    }));

    const pathStr = coords
      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
      .join(' ');

    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    const diff = last - prev;

    let trendDir: 'up' | 'down' | 'flat';
    let tColour: string;
    let lineColour: string;

    if (diff > 2) {
      trendDir = 'up';
      tColour = 'text-success';
      lineColour = 'hsl(var(--success))';
    } else if (diff < -2) {
      trendDir = 'down';
      tColour = 'text-destructive';
      lineColour = 'hsl(var(--destructive))';
    } else {
      trendDir = 'flat';
      tColour = 'text-white';
      lineColour = 'hsl(var(--warning))';
    }

    return {
      path: pathStr,
      trend: trendDir,
      trendColour: tColour,
      autoColour: colour || lineColour,
    };
  }, [data, width, height, colour]);

  if (!data || data.length < 2) return null;

  return (
    <div className="flex items-center gap-1">
      <svg width={width} height={height} className="shrink-0">
        <path
          d={path}
          fill="none"
          stroke={autoColour}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showTrend && (
        <span className={`text-[10px] font-medium ${trendColour}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
        </span>
      )}
    </div>
  );
}
