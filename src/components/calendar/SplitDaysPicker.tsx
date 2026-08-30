/**
 * Pick the specific days a job is on site (ELE-1649).
 *
 * A month grid you tap. Deliberately NOT weekday toggles plus an until-date:
 * that is an RRULE wearing a disguise, and it cannot express "Mon, Wed, and
 * that one Saturday" — which is exactly the sort of week a spark actually has.
 * Tapping days handles every pattern, irregular ones included, and makes
 * "remove Thursday" the obvious gesture rather than a rule to reason about.
 *
 * Two shortcuts earn their place because they are the common shapes: the
 * weekdays of a week, and clearing back to nothing.
 */
import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, eyebrowCn } from './calendarStyles';

interface SplitDaysPickerProps {
  /** Currently chosen days. Order is irrelevant; the picker sorts for display. */
  value: Date[];
  onChange: (days: Date[]) => void;
  /** Days before this read as past and are dimmed, but stay tappable. */
  today?: Date;
}

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const sameDay = (a: Date, b: Date) => isSameDay(a, b);

const SplitDaysPicker = ({ value, onChange, today = new Date() }: SplitDaysPickerProps) => {
  const [month, setMonth] = useState<Date>(() => startOfMonth(value[0] ?? today));

  /* Six weeks from the Monday before the 1st: a fixed grid height, so the
     sheet does not jump as you page between a 4-row and a 6-row month. */
  const grid = useMemo(() => {
    const from = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const to = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start: from, end: to });
  }, [month]);

  const selected = useMemo(
    () => [...value].sort((a, b) => a.getTime() - b.getTime()),
    [value]
  );

  const toggle = (day: Date) => {
    const d = startOfDay(day);
    const without = value.filter((v) => !sameDay(v, d));
    onChange(without.length === value.length ? [...value, d] : without);
  };

  /** The Mon–Fri of whichever week is showing, added to what is already picked. */
  const addWeekdaysOfMonth = () => {
    const weekdays = grid.filter((d) => isSameMonth(d, month) && !isWeekend(d));
    const merged = [...value];
    for (const d of weekdays) {
      if (!merged.some((v) => sameDay(v, d))) merged.push(startOfDay(d));
    }
    onChange(merged);
  };

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-3">
      {/* Month header */}
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth(subMonths(month, 1))}
          aria-label="Previous month"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.06]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-[14px] font-semibold text-white">{format(month, 'MMMM yyyy')}</span>
        <button
          type="button"
          onClick={() => setMonth(addMonths(month, 1))}
          aria-label="Next month"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.06]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {WEEKDAY_LABELS.map((d, i) => (
          <span key={i} className="py-1 text-center text-[11px] font-semibold text-white opacity-60">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((day) => {
          const isOn = value.some((v) => sameDay(v, day));
          const outside = !isSameMonth(day, month);
          const past = isBefore(day, startOfDay(today));
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => toggle(day)}
              aria-pressed={isOn}
              aria-label={format(day, 'EEEE d MMMM')}
              className={cn(
                'flex h-11 items-center justify-center rounded-xl text-[14px] font-semibold tabular-nums touch-manipulation transition-colors',
                // De-emphasis is opacity on the whole cell, never a dimmed text
                // colour — see the note in calendarStyles.
                (outside || past) && !isOn && 'opacity-40',
                isOn
                  ? 'bg-elec-yellow text-black'
                  : 'text-white active:bg-white/[0.08]'
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button type="button" onClick={addWeekdaysOfMonth} className={cn(chipBase, chipOff)}>
          Add weekdays
        </button>
        {selected.length > 0 && (
          <button type="button" onClick={() => onChange([])} className={cn(chipBase, chipOff)}>
            Clear
          </button>
        )}
        <span className="ml-auto text-[12px] font-semibold tabular-nums text-elec-yellow">
          {selected.length} {selected.length === 1 ? 'day' : 'days'}
        </span>
      </div>

      {selected.length > 0 && (
        <div className="mt-3 border-t border-white/[0.10] pt-3">
          <span className={cn(eyebrowCn, 'mb-2 block')}>On site</span>
          <div className="flex flex-wrap gap-2">
            {selected.map((d) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => toggle(d)}
                aria-label={`Remove ${format(d, 'EEEE d MMMM')}`}
                className={cn(chipBase, chipOff, 'gap-1')}
              >
                {format(d, 'EEE d MMM')}
                <span aria-hidden className="text-white opacity-60">
                  ×
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitDaysPicker;
