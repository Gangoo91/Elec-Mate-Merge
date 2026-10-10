/**
 * Your awards, on the Study Centre front page (10 Oct 2026).
 *
 * The Awards section lives at the foot of the leaderboard, where most learners
 * never scroll. This is the doorway: how many you have, how many are new since
 * you last looked, and the one you're closest to. One tap opens the section.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Award, ChevronRight } from 'lucide-react';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const supabase = typedSupabase as unknown as SupabaseClient;

interface Row {
  id: string;
  title: string;
  unlocked_at: string | null;
  current: number | null;
  target: number | null;
}

export function AwardsTeaser() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!user) return;
    let stale = false;
    void supabase.rpc('my_awards').then(({ data, error }) => {
      if (!stale && !error) setRows((data ?? []) as Row[]);
    });
    return () => {
      stale = true;
    };
  }, [user]);

  if (!user || !rows || rows.length === 0) return null;

  const got = rows.filter((r) => r.unlocked_at);
  // Same "since you last looked" as the Awards section (read only here).
  let since = Date.now() - 7 * 86400000;
  try {
    const v = Number(localStorage.getItem(`awards-seen-at:${user.id}`));
    if (v > 0) since = v;
  } catch {
    /* private mode */
  }
  const fresh = got.filter((r) => new Date(r.unlocked_at!).getTime() > since).length;
  const next = rows
    .filter((r) => !r.unlocked_at && r.target && (r.current ?? 0) > 0)
    .sort((a, b) => b.current! / b.target! - a.current! / a.target!)[0];
  const pct = next ? Math.min(100, Math.round((next.current! / next.target!) * 100)) : 0;

  return (
    <button
      type="button"
      onClick={() => navigate('/study-centre/leaderboard#awards')}
      className="-mx-4 flex w-[calc(100%+2rem)] items-center gap-4 card-landing-interactive px-5 py-4 text-left touch-manipulation max-sm:!rounded-none max-sm:!border-x-0 active:bg-white/[0.08] sm:mx-0 sm:w-full sm:rounded-2xl sm:px-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow">
        <Award className="h-5 w-5 text-black" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-semibold text-white">Your awards</span>
          <span className="text-[13px] font-medium tabular-nums text-white">
            {got.length} of {rows.length}
          </span>
          {fresh > 0 && (
            <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-bold text-black">
              {fresh} new
            </span>
          )}
        </span>
        {next ? (
          <>
            <span className="mt-1 block text-[13px] leading-snug text-white">
              Next: {next.title} · {next.current!.toLocaleString()} of{' '}
              {next.target!.toLocaleString()}
            </span>
            <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/[0.12]">
              <span
                className="block h-full rounded-full bg-elec-yellow"
                style={{ width: `${Math.max(pct, 3)}%` }}
              />
            </span>
          </>
        ) : (
          <span className="mt-1 block text-[13px] leading-snug text-white">
            Mock exams, revision, streaks and the monthly board all earn them.
          </span>
        )}
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-white" aria-hidden />
    </button>
  );
}
