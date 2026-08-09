import { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

/**
 * Chart chrome for the calculators.
 *
 * Every chart in the suite goes through here so the axes, grid and type match
 * each other and the rest of the app. Two rules it enforces that the older
 * charts in the codebase break:
 *
 *   NO GREY. `SalaryProgressionChart` and friends use `text-white/55` for axis
 *   labels and `text-white/70` for captions. Low-opacity white renders as grey,
 *   which the design rules disallow — and on a chart it is worse than usual,
 *   because an axis you cannot read makes the plot decorative.
 *
 *   NO INVENTED DATA. A chart is only worth drawing when every point comes from
 *   the calculator's own model. Anything a chart would need but the calculator
 *   does not compute (a monthly irradiance profile, say) is a reason not to draw
 *   the chart, not a reason to make the numbers up.
 */
export const CHART_AXIS = 'rgba(255,255,255,0.92)';
export const CHART_GRID = 'rgba(255,255,255,0.10)';
export const CHART_VOLT = '#F5C400';
export const CHART_FAIL = '#F87171';

interface CalculatorChartProps {
  title: string;
  /** One line saying what the plot shows — not a restatement of the title. */
  caption?: string;
  /** Height in px. Charts are short on phones; 200 is the floor for legibility. */
  height?: number;
  children: ReactNode;
  className?: string;
}

export const CalculatorChart = ({
  title,
  caption,
  height = 220,
  children,
  className,
}: CalculatorChartProps) => (
  <section className={cn('space-y-2 border-t border-white/[0.10] pt-3.5', className)}>
    <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
      {title}
    </h4>
    {caption && <p className="text-[12px] leading-relaxed text-white">{caption}</p>}
    {/* `ResponsiveContainer` needs a parent with a real width; `min-w-0` stops a
        long axis label pushing the pane's grid track wider than its half. */}
    <div className="min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children as never}
      </ResponsiveContainer>
    </div>
  </section>
);

/** Shared tick styling — full white, small, tabular so figures don't jitter. */
export const chartTick = { fill: CHART_AXIS, fontSize: 11 };

/** Tooltip styling matched to the app's popover surface. */
export const chartTooltip = {
  contentStyle: {
    background: 'hsl(0 0% 11%)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 12,
  },
  labelStyle: { color: '#fff', fontSize: 11 },
  itemStyle: { color: '#fff' },
};

export default CalculatorChart;
