/**
 * DiaryCalendarView — the diary's month view, for finding and filling gaps.
 *
 * 6 Oct 2026 rebuild. A logged day shows a solid dot and any training time
 * sent that day; a past WORKING day with nothing logged is marked as a gap
 * you can tap to backfill; weekends without an entry are just quiet; future
 * days are visibly disabled (they looked the same as past days before). It
 * says what tapping does — that was never explained.
 *
 * A past weekday with nothing logged opens a small panel: log that day, or
 * mark it College / Off / Holiday / Sick (useDiaryDayMarks). A marked day
 * shows its label instead of a gap ring.
 */
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toLocalISODate, todayLocalISO } from '@/lib/localDate';
import { formatMinutes, type SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { DAY_MARKS, dayMarkShort, type DayMarkKind } from '@/hooks/site-diary/useDiaryDayMarks';

interface DiaryCalendarViewProps {
  entries: SiteDiaryEntry[];
  /** A day with entries — the page shows them. */
  onDayTap?: (date: string) => void;
  /** A past day with nothing logged — opens the entry sheet for that date. */
  onEmptyDayTap?: (date: string) => void;
  selectedDate?: string | null;
  /** Smaller cells and no hint — the desktop side rail. */
  compact?: boolean;
  marks?: Record<string, DayMarkKind>;
  onMarkDay?: (date: string, kind: DayMarkKind | null) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function DiaryCalendarView({
  entries,
  onDayTap,
  onEmptyDayTap,
  selectedDate,
  compact = false,
  marks = {},
  onMarkDay,
}: DiaryCalendarViewProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const byDate = useMemo(() => {
    const map = new Map<string, { count: number; minutes: number }>();
    for (const e of entries) {
      const cur = map.get(e.date) ?? { count: 0, minutes: 0 };
      cur.count++;
      cur.minutes += e.training_minutes ?? 0;
      map.set(e.date, cur);
    }
    return map;
  }, [entries]);

  const today = todayLocalISO();
  const markLimit = (() => {
    const d = new Date(today + 'T00:00:00');
    d.setDate(d.getDate() + 28);
    return toLocalISODate(d);
  })();
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const firstDow = new Date(month.year, month.month, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Monday first (UK)
  const monthName = new Date(month.year, month.month).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
  const step = (delta: number) =>
    setMonth((p) => {
      const m = p.month + delta;
      return { year: p.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous month"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-[14px] font-semibold text-white">{monthName}</p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next month"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className="py-1 text-center text-[12px] font-semibold text-white">
            {d}
          </div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = `${month.year}-${pad(month.month + 1)}-${pad(day)}`;
          const info = byDate.get(date);
          const dow = new Date(month.year, month.month, day).getDay();
          const weekend = dow === 0 || dow === 6;
          const future = date > today;
          // Up to four weeks ahead can be MARKED (a booked holiday, block
          // release) — never logged.
          const markable = !future || date <= markLimit;
          const isToday = date === today;
          const mark = !info ? marks[date] : undefined;
          const gap = !info && !mark && !future && !weekend && !isToday;
          const selected = date === selectedDate;
          return (
            <button
              key={date}
              type="button"
              disabled={!markable || (future && !onMarkDay)}
              onClick={() => {
                if (info) onDayTap?.(date);
                else if (onMarkDay) setPicked((p) => (p === date ? null : date));
                else onEmptyDayTap?.(date);
              }}
              aria-pressed={picked === date || undefined}
              aria-label={`${day} ${monthName}${
                info
                  ? `, ${info.count} logged`
                  : mark
                    ? `, ${dayMarkShort(mark)}`
                    : future
                      ? ''
                      : ', nothing logged'
              }`}
              className={cn(
                'flex flex-col items-center justify-center rounded-xl text-[13px] touch-manipulation',
                compact ? 'h-11' : 'min-h-[52px] sm:h-16',
                // Days to come: plain and smaller — never faded to grey.
                future && 'text-[12px] font-normal',
                !markable && 'cursor-default',
                selected || picked === date
                  ? 'bg-white font-bold text-black'
                  : isToday
                    ? 'border border-elec-yellow font-semibold text-white'
                    : 'text-white hover:bg-white/[0.06]'
              )}
            >
              <span className="leading-none">{day}</span>
              {info ? (
                <span
                  className={cn(
                    'mt-1 leading-none',
                    compact
                      ? 'h-1.5 w-1.5 rounded-full'
                      : 'text-[12px] font-semibold tracking-tight',
                    compact && (selected ? 'bg-black' : 'bg-elec-yellow')
                  )}
                >
                  {!compact &&
                    (info.minutes ? (
                      formatMinutes(info.minutes)
                    ) : (
                      <span
                        className={cn(
                          'inline-block h-1.5 w-1.5 rounded-full',
                          selected ? 'bg-black' : 'bg-elec-yellow'
                        )}
                      />
                    ))}
                </span>
              ) : mark ? (
                compact ? (
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                ) : (
                  <span className="mt-1 text-[12px] font-medium leading-none tracking-tight">
                    {dayMarkShort(mark)}
                  </span>
                )
              ) : gap ? (
                <span className="mt-1 h-1.5 w-1.5 rounded-full border border-white/50" />
              ) : null}
            </button>
          );
        })}
      </div>

      {picked && onMarkDay && (
        <div className="space-y-2 rounded-xl border border-white/[0.14] p-3">
          <p className="text-[13px] font-semibold text-white">
            {new Date(picked + 'T00:00:00').toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
            })}
          </p>
          <div className="flex flex-wrap gap-2">
            {picked <= today && (
              <button
                type="button"
                onClick={() => {
                  const d = picked;
                  setPicked(null);
                  onEmptyDayTap?.(d);
                }}
                className="h-11 rounded-xl border border-white bg-white px-4 text-[13.5px] font-semibold text-black touch-manipulation"
              >
                {picked === today ? 'Log today' : 'Log this day'}
              </button>
            )}
            {DAY_MARKS.map((m) => {
              const on = marks[picked] === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    onMarkDay(picked, on ? null : m.id);
                    setPicked(null);
                  }}
                  className={cn(
                    'h-11 rounded-xl border px-3 text-[13px] touch-manipulation',
                    on
                      ? 'border-white bg-white font-semibold text-black'
                      : 'border-white/[0.18] bg-white/[0.06] font-medium text-white'
                  )}
                >
                  {m.short}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!compact && (
        <p className="text-[12.5px] leading-snug text-white">
          A logged day shows a dot, or its training time if you logged some. A ring is a working day
          with nothing logged: tap it to add that day or mark it as college, off or holiday. Days in
          the next four weeks can be marked ahead, like a booked holiday.
        </p>
      )}
    </div>
  );
}

export default DiaryCalendarView;
