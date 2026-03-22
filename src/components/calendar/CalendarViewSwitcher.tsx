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
  <div className="flex bg-white/[0.04] rounded-xl p-0.5">
    {views.map((v) => (
      <button
        key={v.value}
        type="button"
        onClick={() => onViewChange(v.value)}
        className={cn(
          'flex-1 h-11 text-xs font-bold rounded-[10px] touch-manipulation transition-all',
          view === v.value
            ? 'bg-elec-yellow text-black shadow-sm'
            : 'text-white active:bg-white/[0.06]'
        )}
      >
        {v.label}
      </button>
    ))}
  </div>
);

export default CalendarViewSwitcher;
