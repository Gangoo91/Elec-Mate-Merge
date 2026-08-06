import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn } from './calendarStyles';
import type { CalendarView } from '@/types/calendar';

interface CalendarViewSwitcherProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const views: { value: CalendarView; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

/**
 * Three views, so chips rather than a filled segment control — the grey pill it
 * replaces read as a disabled control, and its unselected labels were
 * `text-white/55`, which is grey.
 */
const CalendarViewSwitcher = ({ view, onViewChange }: CalendarViewSwitcherProps) => (
  <div className="flex gap-2">
    {views.map((v) => (
      <button
        key={v.value}
        type="button"
        onClick={() => onViewChange(v.value)}
        aria-pressed={view === v.value}
        className={cn(chipBase, view === v.value ? chipOn : chipOff)}
      >
        {v.label}
      </button>
    ))}
  </div>
);

export default CalendarViewSwitcher;
