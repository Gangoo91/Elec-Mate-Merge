import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   MyEpaSimulatorCard — apprentice-side. Lists the apprentice's recent EPA
   mock simulator runs (knowledge tests + professional discussions), shows
   their latest predicted grade and whether the trend is moving up, and
   offers a primary CTA to take a new mock.

   The same `epa_mock_sessions` rows feed the tutor-side EPA readiness on
   Student 360 — so the apprentice acting here directly improves their
   tutor's read of where they're at.
   ========================================================================== */

type SessionType = 'professional_discussion' | 'knowledge_test';

interface SessionRow {
  id: string;
  session_type: SessionType;
  overall_score: number | null;
  predicted_grade: string | null;
  completed_at: string | null;
  status: string;
}

const TYPE_LABEL: Record<SessionType, string> = {
  professional_discussion: 'Pro discussion',
  knowledge_test: 'Knowledge',
};

const GRADE_TONE: Record<string, string> = {
  distinction: 'text-emerald-200',
  merit: 'text-emerald-200',
  pass: 'text-blue-200',
  fail: 'text-rose-300',
  refer: 'text-amber-200',
};

function fmtRel(iso: string | null): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  const days = Math.round((Date.now() - t) / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function gradeTone(grade: string | null): string {
  if (!grade) return 'text-white/85';
  const key = grade.toLowerCase();
  return GRADE_TONE[key] ?? 'text-white';
}

export function MyEpaSimulatorCard() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('epa_mock_sessions')
      .select('id, session_type, overall_score, predicted_grade, completed_at, status')
      .eq('user_id', uid)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(20);
    setSessions((data ?? []) as SessionRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — completing a mock should refresh the card live.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      chan = supabase
        .channel(`my_epa_mock:${uid}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'epa_mock_sessions',
            filter: `user_id=eq.${uid}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchAll]);

  const summary = useMemo(() => {
    const total = sessions.length;
    const latest = sessions[0] ?? null;
    let trendDelta: number | null = null;
    // Trend = latest score vs average of previous 3 (same type).
    if (latest && latest.overall_score != null) {
      const prior = sessions
        .filter((s) => s.id !== latest.id && s.session_type === latest.session_type)
        .slice(0, 3);
      if (prior.length >= 2) {
        const avg =
          prior.reduce((acc, s) => acc + (s.overall_score ?? 0), 0) /
          prior.filter((s) => s.overall_score != null).length;
        trendDelta = Math.round(latest.overall_score - avg);
      }
    }
    return { total, latest, trendDelta };
  }, [sessions]);

  if (loading) return <Skeleton />;

  const empty = sessions.length === 0;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
            EPA simulator
          </div>
          {summary.total > 0 && (
            <span className="text-[10.5px] tabular-nums text-white/85">
              {summary.total} {summary.total === 1 ? 'run' : 'runs'} so far
            </span>
          )}
        </div>

        {empty ? (
          <>
            <p className="mt-3 text-[12.5px] text-white/90 leading-snug">
              Practice your EPA before the real one. Knowledge tests, professional discussions, all
              marked instantly with a predicted grade.
            </p>
            <button
              type="button"
              onClick={() => navigate('/apprentice/epa-simulator?tab=readiness')}
              className="mt-4 w-full h-11 rounded-lg bg-amber-500 text-black text-[13px] font-semibold hover:bg-amber-400 transition-colors touch-manipulation"
            >
              Take your first mock
            </button>
          </>
        ) : (
          <>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-5">
              <div>
                <div
                  className={cn(
                    'text-[20px] sm:text-[24px] font-semibold leading-none capitalize',
                    gradeTone(summary.latest?.predicted_grade ?? null)
                  )}
                >
                  {summary.latest?.predicted_grade ?? '—'}
                </div>
                <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/95">
                  Latest predicted grade
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[20px] sm:text-[24px] font-semibold tabular-nums leading-none text-white">
                    {summary.latest?.overall_score ?? '—'}
                  </span>
                  {summary.latest?.overall_score != null && (
                    <span className="text-[12px] text-white/95">%</span>
                  )}
                  {summary.trendDelta != null && summary.trendDelta !== 0 && (
                    <span
                      className={cn(
                        'ml-1 text-[10.5px] font-medium tabular-nums',
                        summary.trendDelta > 0 ? 'text-emerald-300' : 'text-rose-300'
                      )}
                    >
                      {summary.trendDelta > 0 ? '+' : ''}
                      {summary.trendDelta}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/95">
                  Latest score
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11.5px] sm:text-[12px] text-white/85 leading-snug">
              Your tutor sees these results on Student 360 — the more you practice, the sharper
              their read of your readiness gets.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate('/apprentice/epa-simulator?tab=knowledge')}
                className="h-11 rounded-lg bg-amber-500 text-black text-[12.5px] font-semibold hover:bg-amber-400 transition-colors touch-manipulation"
              >
                Knowledge mock
              </button>
              <button
                type="button"
                onClick={() => navigate('/apprentice/epa-simulator?tab=discussion')}
                className="h-11 rounded-lg border border-amber-400/30 bg-amber-500/[0.08] text-[12.5px] font-semibold text-amber-200 hover:bg-amber-500/[0.14] transition-colors touch-manipulation"
              >
                Pro discussion
              </button>
            </div>

            <div className="mt-5 -mx-1">
              <div className="px-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
                Recent runs
              </div>
              <ul className="mt-2 divide-y divide-white/[0.05]">
                {sessions.slice(0, 4).map((s) => (
                  <li key={s.id} className="px-1 py-2.5 flex items-baseline justify-between gap-3">
                    <div className="min-w-0 flex items-baseline gap-2 flex-wrap">
                      <span className="text-[12.5px] font-medium text-white">
                        {TYPE_LABEL[s.session_type]}
                      </span>
                      <span className="text-[10.5px] text-white/85">{fmtRel(s.completed_at)}</span>
                    </div>
                    <div className="shrink-0 flex items-baseline gap-3 tabular-nums">
                      <span className="text-[11.5px] text-white">
                        {s.overall_score != null ? `${s.overall_score}%` : '—'}
                      </span>
                      <span
                        className={cn(
                          'text-[10.5px] uppercase tracking-tight font-medium',
                          gradeTone(s.predicted_grade)
                        )}
                      >
                        {s.predicted_grade ?? '—'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {sessions.length > 4 && (
                <button
                  type="button"
                  onClick={() => navigate('/apprentice/epa-simulator?tab=history')}
                  className="mt-2 px-1 text-[11.5px] font-medium text-amber-300 hover:text-amber-200 transition-colors touch-manipulation"
                >
                  See full history →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="h-3 w-28 rounded-full bg-white/[0.05]" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-20 rounded-md bg-white/[0.05]" />
              <div className="h-3 w-16 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-11 rounded-lg bg-white/[0.04]" />
      </div>
    </section>
  );
}
