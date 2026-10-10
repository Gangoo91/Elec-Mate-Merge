/**
 * XP per day for the last `days` days, Europe/London, oldest first — for the
 * Study Centre header chart. One read of the ledger; voided rows (double taps)
 * don't count. Today's bar takes the server's own "today" figure when it is
 * higher, so the chart and the number beside it always agree.
 */
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DayXP {
  key: string;
  /** One letter: M, T, W… */
  label: string;
  /** "Mon 6 Oct", for the bar's tooltip and screen readers. */
  long: string;
  xp: number;
  today: boolean;
}

const TZ = 'Europe/London';
const keyOf = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: TZ });

export function useDailyXP(days = 14, todayXp = 0) {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [byDay, setByDay] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(Boolean(uid));

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    // A day's margin either side of the London boundaries; the keys sort it.
    const since = new Date(Date.now() - (days + 1) * 86_400_000).toISOString();
    void supabase
      .from('learning_activity_log' as never)
      .select('xp_earned, created_at')
      .eq('user_id', uid)
      .is('voided_at', null)
      .gt('xp_earned', 0)
      .gte('created_at', since)
      .limit(5000)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) {
          const map: Record<string, number> = {};
          for (const r of data as Array<{ xp_earned: number; created_at: string }>) {
            const k = keyOf(new Date(r.created_at));
            map[k] = (map[k] ?? 0) + Number(r.xp_earned || 0);
          }
          setByDay(map);
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, days]);

  const series = useMemo<DayXP[]>(() => {
    const now = new Date();
    return Array.from({ length: days }, (_, i) => {
      // Calendar steps (setDate), not 24-hour steps, so the clock change in
      // late October doesn't skip or repeat a day.
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1 - i), 12);
      const key = keyOf(d);
      const today = i === days - 1;
      const xp = byDay[key] ?? 0;
      return {
        key,
        label: d.toLocaleDateString('en-GB', { weekday: 'narrow', timeZone: TZ }),
        long: d.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          timeZone: TZ,
        }),
        xp: today ? Math.max(xp, todayXp) : xp,
        today,
      };
    });
  }, [byDay, days, todayXp]);

  return { series, loading };
}
