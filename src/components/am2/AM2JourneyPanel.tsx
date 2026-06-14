/**
 * AM2JourneyPanel
 *
 * Behavioural layer sitting above the per-mode readiness grid:
 *
 *   • Apprentice picks their booked AM2 date → we render a days-remaining
 *     countdown and a projected readiness score (linear extrapolation from
 *     score-vs-days-elapsed since first practice).
 *   • Practice streak — consecutive days they've completed at least one
 *     session in `am2_mock_sessions`. The motivational hook.
 *   • Last practice — when, what mode, score.
 *
 * Storage is intentionally light: target date via useAm2ExamDate (shared
 * localStorage key with the readiness ring — no schema change), session
 * data read from the already-deployed `am2_mock_sessions` table. Per-user
 * keyspace so multiple users on the same device don't collide. First-time
 * date entry lives in the readiness ring hero above; this panel keeps the
 * edit/clear affordance plus streak, last-practice and projection tiles.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Clock, TrendingUp, Pencil, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAm2ExamDate } from '@/hooks/useAm2Readiness';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface SessionStamp {
  id: string;
  session_type: string;
  overall_score: number | null;
  completed_at: string;
}

interface JourneyStats {
  /** Consecutive days with at least one completed session, today inclusive. */
  streak: number;
  /** Most recent completed session, if any. */
  lastSession: SessionStamp | null;
  /** Sessions logged in the last 14 days. */
  recentCount: number;
}

function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / 86_400_000);
}

/**
 * LOCAL yyyy-mm-dd key. Never toISOString here — that keys on UTC, so
 * during BST a run logged this morning lands on "today" while a
 * local-midnight cursor keys as "yesterday" and the streak silently
 * misses every same-day session.
 */
function localDayKey(d: Date): string {
  return d.toLocaleDateString('en-CA');
}

function computeStreak(sessions: SessionStamp[]): number {
  if (sessions.length === 0) return 0;
  // Days (local yyyy-mm-dd) that have at least one session, deduped.
  const dayKeys = new Set(sessions.map((s) => localDayKey(new Date(s.completed_at))));
  // Walk backwards from today until we miss a day.
  let streak = 0;
  let cursor = startOfDay(new Date());
  const todayKey = localDayKey(cursor);
  while (true) {
    const key = localDayKey(cursor);
    if (dayKeys.has(key)) {
      streak += 1;
      cursor = new Date(cursor.getTime() - 86_400_000);
    } else {
      // Allow today to be missing if it's still early — streak counts from
      // yesterday backwards in that case.
      if (streak === 0 && key === todayKey) {
        cursor = new Date(cursor.getTime() - 86_400_000);
        continue;
      }
      break;
    }
  }
  return streak;
}

export function AM2JourneyPanel() {
  const { user } = useAuth();
  const { data: readiness } = useAM2Readiness();

  // Shared with the readiness ring — same localStorage key, kept in sync
  // across instances via the hook's change event.
  const { examDate: targetDate, setExamDate } = useAm2ExamDate();
  const [editingTarget, setEditingTarget] = useState(false);
  const [draftTarget, setDraftTarget] = useState<string>('');
  const [stats, setStats] = useState<JourneyStats>({
    streak: 0,
    lastSession: null,
    recentCount: 0,
  });

  const saveTarget = useCallback(() => {
    if (!draftTarget) {
      setExamDate(null);
      setEditingTarget(false);
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draftTarget)) return;
    setExamDate(draftTarget);
    setEditingTarget(false);
  }, [draftTarget, setExamDate]);

  const clearTarget = useCallback(() => {
    setExamDate(null);
    setEditingTarget(false);
    setDraftTarget('');
  }, [setExamDate]);

  // Fetch last 30 days of sessions for streak + last + recent count
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const since = new Date(Date.now() - 30 * 86_400_000).toISOString();
      const { data } = await db
        .from('am2_mock_sessions')
        .select('id, session_type, overall_score, completed_at')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('completed_at', since)
        .order('completed_at', { ascending: false });
      if (cancelled) return;
      const sessions = (data ?? []) as SessionStamp[];
      const fourteenAgo = startOfDay(new Date(Date.now() - 14 * 86_400_000));
      const recentCount = sessions.filter((s) => new Date(s.completed_at) >= fourteenAgo).length;
      setStats({
        streak: computeStreak(sessions),
        lastSession: sessions[0] ?? null,
        recentCount,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [user, readiness]);

  // Derived target metrics. Parse as LOCAL midnight (bare yyyy-mm-dd is
  // UTC) so the countdown matches the hook's daysToGo to the day.
  const targetMetrics = useMemo(() => {
    if (!targetDate) return null;
    const today = startOfDay(new Date());
    const target = new Date(`${targetDate}T00:00:00`);
    if (!isFinite(target.getTime())) return null;
    const daysRemaining = daysBetween(today, target);
    const isPast = daysRemaining < 0;
    const isToday = daysRemaining === 0;
    return { daysRemaining, isPast, isToday, target };
  }, [targetDate]);

  // Linear projection: assume current readiness improves at the user's
  // recent practice rate (recentCount sessions in 14 days → ~recentCount/14
  // sessions/day; each session lifts overall by some assumed delta). It's a
  // motivational signal not a guarantee — we frame it as "if you keep this
  // pace" so the apprentice can act on it.
  const projection = useMemo(() => {
    if (!targetMetrics || !readiness) return null;
    if (targetMetrics.isPast) return null;
    const currentScore = readiness.overallScore;
    const sessionsPerDay = stats.recentCount / 14;
    // Empirical: each session lifts overall readiness by ~3 points on average
    // (clamped — the gauge can't exceed 100). Calibrate later from real data.
    const projectedLift = sessionsPerDay * targetMetrics.daysRemaining * 3;
    const projected = Math.max(0, Math.min(100, Math.round(currentScore + projectedLift)));
    return {
      projected,
      sessionsNeeded: Math.max(0, Math.ceil((70 - currentScore) / 3)),
    };
  }, [targetMetrics, readiness, stats.recentCount]);

  const lastSessionDays = stats.lastSession
    ? daysBetween(new Date(stats.lastSession.completed_at), new Date())
    : null;

  const lastSessionTone =
    lastSessionDays === null
      ? 'text-white/45'
      : lastSessionDays === 0
        ? 'text-emerald-300'
        : lastSessionDays <= 2
          ? 'text-white'
          : lastSessionDays <= 5
            ? 'text-amber-300'
            : 'text-red-300';

  const lastSessionLabel =
    lastSessionDays === null
      ? 'No sessions yet'
      : lastSessionDays === 0
        ? 'Today'
        : lastSessionDays === 1
          ? 'Yesterday'
          : `${lastSessionDays}d ago`;

  /* ─── Render ─────────────────────────────────────────────────── */

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.04] to-elec-yellow/[0.01] overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Your AM2 journey
          </div>
          {targetDate && (
            <button
              type="button"
              onClick={() => {
                setDraftTarget(targetDate);
                setEditingTarget(true);
              }}
              className="inline-flex items-center gap-1 text-[10.5px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              <Pencil className="h-3 w-3" />
              Edit date
            </button>
          )}
        </div>

        {/* Date picker — inline editing only. First-time entry happens in
            the readiness ring hero above, so the panel doesn't double up
            on "set your date" prompts. */}
        {editingTarget && (
          <div className="rounded-xl border border-elec-yellow/20 bg-white/[0.02] p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[12.5px] text-white/85">
              <Calendar className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
              <span className="font-medium">When is your AM2 booked?</span>
            </div>
            <p className="text-[11.5px] text-white/55 leading-snug">
              We'll show you days remaining and a projected readiness score so you can plan your
              practice rhythm.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={draftTarget}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDraftTarget(e.target.value)}
                className="flex-1 h-11 px-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.08] text-[14px] text-white focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation"
              />
              <button
                type="button"
                onClick={saveTarget}
                disabled={!draftTarget}
                className="h-11 px-5 rounded-lg bg-elec-yellow text-black font-bold text-[13px] hover:bg-elec-yellow/90 disabled:opacity-40 transition-colors touch-manipulation"
              >
                Save
              </button>
              {targetDate && (
                <button
                  type="button"
                  onClick={clearTarget}
                  className="h-11 px-3 rounded-lg border border-white/[0.10] bg-white/[0.04] text-white/70 hover:text-white text-[12px] font-medium touch-manipulation inline-flex items-center justify-center gap-1.5"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Live stats grid — only when target is set */}
        {targetDate && !editingTarget && targetMetrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <Tile
              icon={<Calendar className="h-3 w-3" />}
              label={
                targetMetrics.isPast ? 'AM2 was' : targetMetrics.isToday ? 'AM2 today' : 'AM2 in'
              }
              value={
                targetMetrics.isToday
                  ? 'Today'
                  : targetMetrics.isPast
                    ? `${Math.abs(targetMetrics.daysRemaining)}d ago`
                    : `${targetMetrics.daysRemaining}d`
              }
              sub={targetMetrics.target.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
              tone={
                targetMetrics.isPast
                  ? 'text-white/45'
                  : targetMetrics.daysRemaining <= 7
                    ? 'text-red-300'
                    : targetMetrics.daysRemaining <= 21
                      ? 'text-amber-300'
                      : 'text-elec-yellow'
              }
            />
            <Tile
              icon={<Flame className="h-3 w-3" />}
              label="Practice streak"
              value={`${stats.streak}d`}
              sub={
                stats.streak === 0
                  ? 'Start today'
                  : stats.streak === 1
                    ? 'Keep it going'
                    : "Don't break"
              }
              tone={
                stats.streak === 0
                  ? 'text-white/45'
                  : stats.streak >= 7
                    ? 'text-emerald-300'
                    : 'text-elec-yellow'
              }
            />
            <Tile
              icon={<Clock className="h-3 w-3" />}
              label="Last practice"
              value={lastSessionLabel}
              sub={
                stats.lastSession
                  ? `${stats.lastSession.session_type.replace(/_/g, ' ')}`
                  : 'Open any mode'
              }
              tone={lastSessionTone}
            />
            <Tile
              icon={<TrendingUp className="h-3 w-3" />}
              label="Projected on AM2 day"
              value={projection ? `${projection.projected}%` : '—'}
              sub={
                projection && projection.projected >= 70
                  ? 'On track to pass'
                  : projection
                    ? `~${projection.sessionsNeeded} more sessions for 70%`
                    : 'Practice for projection'
              }
              tone={
                projection && projection.projected >= 70
                  ? 'text-emerald-300'
                  : projection && projection.projected >= 50
                    ? 'text-amber-300'
                    : 'text-white/85'
              }
            />
          </div>
        )}

        {/* Last-session context line when no target date set */}
        {!targetDate && !editingTarget && stats.lastSession && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[12px] text-white/65 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-white/55 shrink-0" />
            <span>
              Last practice{' '}
              <span className={cn('font-semibold', lastSessionTone)}>{lastSessionLabel}</span>
              {stats.streak > 1 && (
                <>
                  <span className="mx-1.5 text-white/30">·</span>
                  <span className="text-elec-yellow font-semibold inline-flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {stats.streak}-day streak
                  </span>
                </>
              )}
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────── */

function Tile({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-3 sm:px-4 py-3">
      <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
        {icon}
        {label}
      </div>
      <div
        className={cn('mt-1.5 text-xl sm:text-2xl font-semibold tabular-nums leading-none', tone)}
      >
        {value}
      </div>
      <div className="mt-1 text-[10.5px] text-white/45 leading-tight line-clamp-2">{sub}</div>
    </div>
  );
}

export default AM2JourneyPanel;
