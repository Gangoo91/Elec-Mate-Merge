/**
 * DiaryCalendarView
 *
 * Month grid with mood-coloured dots on days that have entries.
 * Multiple dots for multiple entries per day (max 3).
 * Tapping a day with entries filters the feed via onDayTap callback.
 * Today gets a ring highlight even without entries.
 */

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';

/** Returns dot colour based on mood rating */
function moodDotColour(mood: number | null): string {
  if (!mood) return 'bg-white/30';
  if (mood >= 4) return 'bg-green-400';
  if (mood === 3) return 'bg-amber-400';
  return 'bg-red-400';
}

interface DiaryCalendarViewProps {
  entries: SiteDiaryEntry[];
  onDayTap?: (date: string) => void;
  selectedDate?: string | null;
}

export function DiaryCalendarView({ entries, onDayTap, selectedDate }: DiaryCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  // Map of date -> array of entries for that date
  const entryMap = useMemo(() => {
    const map: Record<string, SiteDiaryEntry[]> = {};
    for (const e of entries) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    }
    return map;
  }, [entries]);

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  // Adjust for Monday-first weeks (UK)
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const monthName = new Date(currentMonth.year, currentMonth.month).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/15 touch-manipulation"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <h3 className="text-sm font-semibold text-white">{monthName}</h3>
        <button
          onClick={nextMonth}
          className="h-11 w-11 flex items-center justify-center rounded-lg active:bg-white/15 touch-manipulation"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-[10px] text-white font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEntries = entryMap[dateStr] || [];
          const hasEntries = dayEntries.length > 0;
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;

          // Get up to 3 dots with mood colours
          const dots = dayEntries.slice(0, 3).map((e, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${moodDotColour(e.mood_rating)}`}
            />
          ));

          return (
            <button
              key={day}
              onClick={() => hasEntries && onDayTap?.(dateStr)}
              className={`aspect-square min-h-[44px] flex flex-col items-center justify-center rounded-lg text-xs touch-manipulation transition-colors ${
                isSelected
                  ? 'bg-elec-yellow/25 text-elec-yellow font-bold ring-2 ring-elec-yellow/40'
                  : isToday
                    ? 'ring-1 ring-elec-yellow/30 text-elec-yellow font-semibold'
                    : hasEntries
                      ? 'text-white active:bg-white/15'
                      : 'text-white/30'
              }`}
            >
              <span>{day}</span>
              {hasEntries && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  {dots}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
