/**
 * useDiaryDayMarks — weekdays that weren't site days.
 *
 * UK apprentices are at college a day a week (or on block release), and have
 * holidays and sick days. The diary called every one of those a "missed day",
 * ringed it on the calendar and broke the streak every week. A mark (college,
 * off, holiday, sick) counts the day as covered. A diary entry on the same
 * date wins — the mark is then ignored. Table: site_diary_day_marks (6 Oct).
 */
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type DayMarkKind = 'college' | 'off' | 'holiday' | 'sick';

export const DAY_MARKS: { id: DayMarkKind; label: string; short: string }[] = [
  { id: 'college', label: 'College day', short: 'College' },
  { id: 'off', label: 'Day off', short: 'Off' },
  { id: 'holiday', label: 'Holiday', short: 'Holiday' },
  { id: 'sick', label: 'Off sick', short: 'Sick' },
];

export const dayMarkShort = (k: DayMarkKind) => DAY_MARKS.find((m) => m.id === k)?.short ?? k;

// The generated types predate the table.
const table = () => supabase.from('site_diary_day_marks' as never);

export function useDiaryDayMarks() {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [marks, setMarks] = useState<Record<string, DayMarkKind>>({});

  useEffect(() => {
    if (!uid) {
      setMarks({});
      return;
    }
    let cancelled = false;
    void table()
      .select('date, kind')
      .eq('user_id' as never, uid as never)
      .then(({ data, error }) => {
        if (cancelled || error) return;
        const next: Record<string, DayMarkKind> = {};
        for (const r of (data ?? []) as Array<{ date: string; kind: DayMarkKind }>)
          next[r.date] = r.kind;
        setMarks(next);
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  /** Mark a day, or clear its mark with null. Optimistic; rolls back on error. */
  const setMark = useCallback(
    async (date: string, kind: DayMarkKind | null) => {
      if (!uid) return false;
      const prev = marks[date];
      setMarks((m) => {
        const next = { ...m };
        if (kind) next[date] = kind;
        else delete next[date];
        return next;
      });
      const { error } = kind
        ? await table().upsert({ user_id: uid, date, kind } as never, {
            onConflict: 'user_id,date',
          })
        : await table()
            .delete()
            .eq('user_id' as never, uid as never)
            .eq('date' as never, date as never);
      if (error) {
        setMarks((m) => {
          const next = { ...m };
          if (prev) next[date] = prev;
          else delete next[date];
          return next;
        });
        toast.error('Couldn’t save that — check your connection');
        return false;
      }
      return true;
    },
    [uid, marks]
  );

  return { marks, setMark };
}
