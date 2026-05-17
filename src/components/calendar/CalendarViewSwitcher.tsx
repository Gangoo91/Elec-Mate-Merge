import type { CalendarView } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarViewSwitcherProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const views: { value: CalendarView; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const CalendarViewSwitcher = ({ view, onViewChange }: CalendarViewSwitcherProps) => (
  <div className="inline-flex bg-white/[0.04] rounded-lg p-0.5 border border-white/[0.06] self-start">
    {views.map((v) => (
      <button
        key={v.value}
        type="button"
        onClick={() => onViewChange(v.value)}
        className={cn(
          'px-3.5 h-8 text-[12.5px] font-semibold rounded-md touch-manipulation transition-colors',
          view === v.value
            ? 'bg-white/[0.10] text-white'
            : 'text-white/55 hover:text-white active:bg-white/[0.06]'
        )}
      >
        {v.label}
      </button>
    ))}
  </div>
);

export default CalendarViewSwitcher;
