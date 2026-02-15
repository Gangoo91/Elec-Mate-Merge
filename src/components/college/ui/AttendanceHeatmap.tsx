import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface AttendanceRecord {
  date: string;
  status: string | null;
}

interface AttendanceHeatmapProps {
  records: AttendanceRecord[];
  /** Number of weeks to show */
  weeks?: number;
  className?: string;
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F'];

/**
 * Visual attendance heatmap like GitHub's contribution graph.
 * Shows colour-coded dots for each weekday over the past N weeks.
 * Green = present, Amber = late, Red = absent, Blue = authorised, Grey = no record.
 */
export function AttendanceHeatmap({ records, weeks = 8, className }: AttendanceHeatmapProps) {
  const grid = useMemo(() => {
    // Build a map of date → status
    const statusMap = new Map<string, string>();
    records.forEach((r) => {
      const dateKey = r.date.split('T')[0];
      if (r.status) statusMap.set(dateKey, r.status);
    });

    // Generate grid: weeks × 5 weekdays
    const today = new Date();
    const result: Array<{ date: string; status: string | null; dayOfWeek: number }[]> = [];

    // Find the Monday of the current week
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + mondayOffset);

    for (let w = weeks - 1; w >= 0; w--) {
      const week: Array<{ date: string; status: string | null; dayOfWeek: number }> = [];
      for (let d = 0; d < 5; d++) {
        const date = new Date(currentMonday);
        date.setDate(currentMonday.getDate() - w * 7 + d);
        const dateKey = date.toISOString().split('T')[0];
        const isFuture = date > today;
        week.push({
          date: dateKey,
          status: isFuture ? null : (statusMap.get(dateKey) ?? null),
          dayOfWeek: d,
        });
      }
      result.push(week);
    }

    return result;
  }, [records, weeks]);

  const getStatusColour = (status: string | null) => {
    switch (status) {
      case 'Present':
        return 'bg-success';
      case 'Late':
        return 'bg-warning';
      case 'Absent':
        return 'bg-destructive';
      case 'Authorised':
        return 'bg-info';
      default:
        return 'bg-white/10';
    }
  };

  const getMonthLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { month: 'short' });
  };

  // Get month labels for the bottom
  const monthLabels = useMemo(() => {
    const labels: Array<{ label: string; col: number }> = [];
    let lastMonth = '';
    grid.forEach((week, i) => {
      const month = getMonthLabel(week[0].date);
      if (month !== lastMonth) {
        labels.push({ label: month, col: i });
        lastMonth = month;
      }
    });
    return labels;
  }, [grid]);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-1">
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className="h-3 w-3 flex items-center justify-center text-[8px] text-white"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-1 flex-1 overflow-x-auto hide-scrollbar">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    'h-3 w-3 rounded-[2px] transition-colors duration-200',
                    getStatusColour(day.status)
                  )}
                  title={`${day.date}: ${day.status || 'No record'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Month labels */}
      <div className="flex gap-1 pl-4">
        {monthLabels.map((m) => (
          <div
            key={`${m.label}-${m.col}`}
            className="text-[9px] text-white"
            style={{
              marginLeft:
                m.col > 0
                  ? `${(m.col - (monthLabels[monthLabels.indexOf(m) - 1]?.col ?? 0)) * 16 - 16}px`
                  : 0,
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 text-[10px] text-white">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-success" />
          Present
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-warning" />
          Late
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-destructive" />
          Absent
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-info" />
          Authorised
        </div>
      </div>
    </div>
  );
}
