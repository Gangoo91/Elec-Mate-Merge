/**
 * AM2HistoryTab — editorial session history.
 *
 * Past simulation sessions from am2_mock_sessions, redesigned to match
 * the apprentice hub language: editorial eyebrow, yellow accents on
 * interactive elements, semantic per-mode colour on rows (blue/orange/
 * yellow/purple by mode). Mobile-first single column; desktop the rows
 * stay narrow inside a max-w-3xl reading column rather than stretching
 * edge-to-edge.
 */

import { useState, useEffect } from 'react';
import { Lock, Gauge, Search, BookOpen, Loader2, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AM2_EYEBROW, AM2_LIST, AM2_SPLIT, AM2_TITLE } from '@/components/am2/layout';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AM2_SECTIONS } from '@/hooks/am2/useAM2Sections';
import { useAuth } from '@/contexts/AuthContext';
import { MISTAKE_LABEL } from '@/data/am2/sectionBRules';
import { ISOLATION_TAG_LABEL } from '@/data/am2/safeIsolationScenarios';
import { FAULT_LABEL } from '@/data/am2/sectionBDrills';
import { PRACTICE_BAY } from '@/data/am2/safeWorking';

/** What a saved mistake tag means, whichever section it came from. */
function labelFor(tag: string, sessionType: string): string {
  if (tag.startsWith('topic_')) return `Missed: ${tag.slice(6)}`;
  if (tag.startsWith('risk_')) {
    const o = PRACTICE_BAY.find((x) => x.id === tag.slice(5));
    return o ? `Risk assessment: ${o.hazard?.what ?? 'no action required'}` : 'Risk assessment';
  }
  // By section — B and C both use some of the same tag names (wrong_point).
  const map: Record<string, string> =
    sessionType === 'safe_isolation' || sessionType === 'safe_working'
      ? ISOLATION_TAG_LABEL
      : sessionType === 'fault_diagnosis'
        ? FAULT_LABEL
        : MISTAKE_LABEL;
  return map[tag] ?? tag.replace(/_/g, ' ');
}

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

interface SessionRecord {
  id: string;
  session_type: string;
  overall_score: number | null;
  time_spent_seconds: number | null;
  completed_at: string;
  component_scores?: { mode?: string } | null;
  session_data?: {
    sectionsAtBar?: string[];
    mistakes?: { tag?: string }[];
    seconds?: Record<string, number>;
  } | null;
}

/** Each section's own bar (C's is no mistakes at all), for colouring scores. */
const BAR_FOR: Record<string, number> = Object.fromEntries(
  AM2_SECTIONS.map((d) => [d.sessionType, d.bar])
);

/** Which runs count towards "ready" depends on the mode — show it. */
const MODE_PILL: Record<string, string> = {
  learn: 'Learn',
  practise: 'Practise',
  assessment: 'Assessment',
};

interface SessionConfig {
  icon: typeof Lock;
  label: string;
  accent: string;
  pill: string;
  tab: string;
}

const SESSION_CONFIG: Record<string, SessionConfig> = {
  safe_working: {
    icon: Lock,
    label: 'A1 · Safe working',
    accent: 'border-l-white/60',
    pill: 'bg-white/[0.06] text-white border-white/30',
    tab: 'safe-working',
  },
  safe_isolation: {
    icon: Lock,
    label: 'C · Safe isolation',
    accent: 'border-l-elec-yellow/70',
    pill: 'bg-white/[0.06] text-white border-elec-yellow/30',
    tab: 'safe-isolation',
  },
  testing_sequence: {
    icon: Gauge,
    label: 'B · Inspection and testing',
    accent: 'border-l-blue-400/70',
    pill: 'bg-blue-500/10 text-white border-blue-400/30',
    tab: 'testing',
  },
  fault_diagnosis: {
    icon: Search,
    label: 'D · Fault diagnosis',
    accent: 'border-l-orange-400/70',
    pill: 'bg-white/[0.06] text-white border-orange-400/30',
    tab: 'faults',
  },
  knowledge_test: {
    icon: BookOpen,
    label: 'E · Knowledge test',
    accent: 'border-l-purple-400/70',
    pill: 'bg-purple-500/10 text-white border-purple-400/30',
    tab: 'knowledge',
  },
  // Was missing, so mock days fell back to the safe-isolation label.
  mock_am2: {
    icon: Gauge,
    label: 'Mock AM2 day',
    accent: 'border-l-white/60',
    pill: 'bg-white/[0.06] text-white border-white/30',
    tab: 'mock-day',
  },
};

interface AM2HistoryTabProps {
  onNavigateToTab: (tab: string) => void;
}

export function AM2HistoryTab({ onNavigateToTab }: AM2HistoryTabProps) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  // The run whose detail is open.
  const [open, setOpen] = useState<SessionRecord | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      setIsLoading(true);
      const { data, error } = await db
        .from('am2_mock_sessions')
        .select(
          'id, session_type, overall_score, time_spent_seconds, completed_at, component_scores, session_data'
        )
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(30);
      // A failed read isn't "no runs" — say so, with a way to try again.
      setLoadFailed(!!error);
      if (!error && data) setSessions(data);
      setIsLoading(false);
    };
    fetchSessions();
  }, [user, attempt]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        <span className="text-[12.5px] text-white">Loading your sessions…</span>
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className="mx-auto max-w-md space-y-4 px-4 py-12 text-center">
        <p className="text-base font-semibold text-white">Couldn’t load your runs</p>
        <p className="text-[13px] text-white">Check your connection — your runs are still saved.</p>
        <button
          type="button"
          onClick={() => setAttempt((n) => n + 1)}
          className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation"
        >
          Try again
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    const starters: Array<{ tab: string; label: string; cfg: SessionConfig }> = [
      { tab: 'safe-isolation', label: 'Start safe isolation', cfg: SESSION_CONFIG.safe_isolation },
      { tab: 'testing', label: 'Start testing sequence', cfg: SESSION_CONFIG.testing_sequence },
      { tab: 'faults', label: 'Start fault finding', cfg: SESSION_CONFIG.fault_diagnosis },
      { tab: 'knowledge', label: 'Start knowledge test', cfg: SESSION_CONFIG.knowledge_test },
    ];
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:py-16 text-center space-y-5">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-white/[0.06] border border-elec-yellow/20 flex items-center justify-center">
          <RotateCcw className="h-7 w-7 text-elec-yellow" />
        </div>
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-white">No sessions completed yet</p>
          <p className="text-[12.5px] text-white max-w-xs mx-auto leading-relaxed">
            Complete a simulation to see your history here. Start with safe isolation in Learn mode
            — it’s the shortest section, and every other section relies on it.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          {starters.map((s) => (
            <button
              key={s.tab}
              type="button"
              onClick={() => onNavigateToTab(s.tab)}
              className={cn(
                'w-full h-11 rounded-xl border text-[12.5px] font-semibold touch-manipulation inline-flex items-center justify-between px-4 transition-colors',
                s.cfg.pill,
                'hover:brightness-125'
              )}
            >
              <span>{s.label}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(AM2_SPLIT, 'mx-auto w-full max-w-[1300px] py-5')}>
      <div className="space-y-3 lg:sticky lg:top-4">
        <div>
          <p className={AM2_EYEBROW}>AM2 practice</p>
          <h1 className={AM2_TITLE}>Your runs</h1>
          <p className="mt-2 text-[14px] text-white">
            The last {sessions.length} runs, most recent first. Tap one to see how it went.
          </p>
        </div>
        <ul className={AM2_LIST}>
          {Object.entries(SESSION_CONFIG).map(([type, cfg]) => {
            const mine = sessions.filter((x) => x.session_type === type);
            if (!mine.length) return null;
            // "Best" and "last" from Assessment runs — the ones that count. A
            // mock day is counted in sections at the bar, not a percentage.
            const counted = mine.filter((x) => x.component_scores?.mode === 'assessment');
            const scores = (counted.length ? counted : mine)
              .map((x) => x.overall_score)
              .filter((v): v is number => v != null);
            const isMock = type === 'mock_am2';
            const mockAtBar = mine[0]?.session_data?.sectionsAtBar?.length;
            return (
              <li key={type} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-white">{cfg.label}</span>
                  <span className="block text-[12px] tabular-nums text-white">
                    {mine.length} run{mine.length === 1 ? '' : 's'}
                    {!isMock && scores.length
                      ? ` · best${counted.length ? ' Assessment' : ''} ${Math.round(Math.max(...scores))}%`
                      : ''}
                  </span>
                </span>
                <span className="text-right text-[12px] text-white">
                  last
                  <span className="block text-[17px] font-bold tabular-nums">
                    {isMock
                      ? mockAtBar != null
                        ? `${mockAtBar}/4 at bar`
                        : '—'
                      : scores.length
                        ? `${Math.round(scores[0])}%`
                        : '—'}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className={AM2_LIST}>
        {sessions.map((session) => {
          const config = SESSION_CONFIG[session.session_type] || SESSION_CONFIG.safe_isolation;
          const Icon = config.icon;
          const score = session.overall_score;
          const bar = BAR_FOR[session.session_type];
          const isMockRow = session.session_type === 'mock_am2';
          const atBarCount = session.session_data?.sectionsAtBar?.length;
          const date = new Date(session.completed_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          const time = session.time_spent_seconds
            ? `${Math.floor(session.time_spent_seconds / 60)}m ${session.time_spent_seconds % 60}s`
            : null;

          return (
            <li key={session.id}>
              <button
                type="button"
                onClick={() => setOpen(session)}
                className={cn(
                  'w-full text-left flex items-center gap-3 px-4 sm:px-5 py-3.5 border-l-2 hover:bg-white/[0.02] transition-colors touch-manipulation',
                  config.accent
                )}
                aria-label={`${config.label} — see this run`}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.06]">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[13.5px] font-semibold text-white">
                    {config.label}
                    {session.component_scores?.mode && MODE_PILL[session.component_scores.mode] && (
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 text-[11px] font-bold',
                          session.component_scores.mode === 'assessment'
                            ? 'bg-elec-yellow text-black'
                            : 'border border-white/[0.25] text-white'
                        )}
                      >
                        {MODE_PILL[session.component_scores.mode]}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white tabular-nums">
                    {date}
                    {time && (
                      <>
                        <span className="mx-1.5 text-white">·</span>
                        {time}
                      </>
                    )}
                  </div>
                </div>
                <span className="text-right">
                  <span className="block text-lg font-semibold tabular-nums text-white">
                    {isMockRow
                      ? atBarCount != null
                        ? `${atBarCount}/4`
                        : '—'
                      : score != null
                        ? `${Math.round(score)}%`
                        : '—'}
                  </span>
                  {/* Judged against that section's own bar, in words not just colour */}
                  {!isMockRow && score != null && bar != null && (
                    <span className={cn('block text-[11px] font-semibold', 'text-white')}>
                      {score >= bar ? 'At the bar' : 'Below the bar'}
                    </span>
                  )}
                  {isMockRow && atBarCount != null && (
                    <span className="block text-[11px] font-semibold text-white">at the bar</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {open && (
        <RunDetail
          session={open}
          onClose={() => setOpen(null)}
          onAgain={() => {
            const tab = (SESSION_CONFIG[open.session_type] || SESSION_CONFIG.safe_isolation).tab;
            setOpen(null);
            onNavigateToTab(tab);
          }}
        />
      )}
    </div>
  );
}

/** One run: what it was, how it went against the day, what went wrong. */
function RunDetail({
  session,
  onClose,
  onAgain,
}: {
  session: SessionRecord;
  onClose: () => void;
  onAgain: () => void;
}) {
  const cfg = SESSION_CONFIG[session.session_type] || SESSION_CONFIG.safe_isolation;
  const def = AM2_SECTIONS.find((d) => d.sessionType === session.session_type);
  const counts = new Map<string, number>();
  for (const m of session.session_data?.mistakes ?? [])
    if (m.tag) counts.set(m.tag, (counts.get(m.tag) ?? 0) + 1);
  const mistakes = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const mins = session.time_spent_seconds ? Math.round(session.time_spent_seconds / 60) : null;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const mockScores =
    session.session_type === 'mock_am2'
      ? AM2_SECTIONS
          // Days saved before A1 existed have no A1 key — leave the row out
          // rather than show it as not done.
          .filter((d) => d.key in ((session.component_scores as Record<string, unknown>) ?? {}))
          .map((d) => ({
            d,
            score:
              (session.component_scores as Record<string, number | null> | null)?.[d.key] ?? null,
          }))
      : [];
  const isMock = session.session_type === 'mock_am2';
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/70"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-white/[0.12] bg-[hsl(0_0%_9%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:mx-auto sm:mb-6 sm:max-w-lg sm:rounded-2xl sm:border"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[12px] font-semibold text-white">
          {new Date(session.completed_at).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
          {session.component_scores?.mode
            ? ` · ${MODE_PILL[session.component_scores.mode] ?? ''}`
            : ''}
        </p>
        <p className="mt-1 text-[19px] font-bold text-white">{cfg.label}</p>
        <p className="mt-2 text-[14px] text-white">
          {isMock
            ? `${session.session_data?.sectionsAtBar?.length ?? 0} of ${(session.component_scores as Record<string, unknown> | null)?.A1 !== undefined ? 5 : 4} sections at the bar`
            : session.overall_score != null
              ? `${Math.round(session.overall_score)}%${def ? ` — ${session.overall_score >= def.bar ? 'at' : 'below'} the bar (${def.barLabel})` : ''}`
              : 'No score saved'}
        </p>
        {mins != null && (
          <p className="mt-1 text-[13px] text-white">
            {mins < 1 ? 'Under a minute' : `${mins} min`}
            {def ? ` · ${def.onTheDay} allowed on the day` : ''}
          </p>
        )}
        <div className="mt-4 border-t border-white/[0.1] pt-3">
          <p className="text-[13.5px] font-semibold text-white">
            {mistakes.length
              ? 'What went wrong'
              : isMock
                ? 'Sections'
                : 'No mistakes saved for this run'}
          </p>
          {mockScores.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {mockScores.map(({ d, score }) => (
                <li
                  key={d.key}
                  className="flex items-center justify-between gap-3 text-[13px] text-white"
                >
                  <span>
                    {d.key} · {d.title}
                  </span>
                  <span className="shrink-0 font-mono text-[12px]">
                    {score != null ? `${score}% · ${score >= d.bar ? 'at the bar' : 'below'}` : '—'}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {mistakes.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {mistakes.map(([tag, n]) => (
                <li
                  key={tag}
                  className="flex items-center justify-between gap-3 text-[13px] text-white"
                >
                  <span>{labelFor(tag, session.session_type)}</span>
                  <span className="shrink-0 font-mono text-[12px]">×{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onAgain}
            className="h-12 rounded-xl bg-elec-yellow text-[14.5px] font-bold text-black touch-manipulation"
          >
            Run it again
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-xl border border-white/[0.22] text-[14.5px] font-semibold text-white touch-manipulation"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AM2HistoryTab;
