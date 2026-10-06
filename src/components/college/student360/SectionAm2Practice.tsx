/**
 * SectionAm2Practice — a learner's AM2 simulator practice, for their tutor.
 *
 * AM2 plan, Phase 4 (6 Oct 2026). Reads the same am2_mock_sessions rows the
 * learner's own AM2 home reads, through the same functions (buildSections for
 * readiness, weakSpotsFromRows for weak spots), so the tutor and the learner
 * see the same picture:
 *   - each section A1–E: status, last counted score, how many runs
 *   - the mistakes the learner keeps repeating, across sections
 *   - the last few runs, with the mode each was run in
 *
 * Readiness counts Assessment runs only (exam sittings for Section E), as on
 * the learner's side. Tutors can read these rows through the
 * "college staff read their students' AM2 sessions" policy.
 */
import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { supabase } from '@/integrations/supabase/client';
import {
  AM2_RUNS_LIMIT,
  AM2_SECTIONS,
  buildSections,
  countsTowardsReady,
} from '@/hooks/am2/useAM2Sections';
import {
  WEAK_SECTION_TYPE,
  weakSpotsFromRows,
  type WeakSection,
} from '@/hooks/am2/useAM2WeakSpots';

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

interface Row {
  session_type: string;
  overall_score: number | null;
  completed_at: string | null;
  component_scores: { mode?: string } | null;
  session_data: unknown;
}

const MODE_LABEL: Record<string, string> = {
  learn: 'Learn',
  practise: 'Practise',
  assessment: 'Assessment',
};

const SECTION_FOR_TYPE: Record<string, string> = {
  testing_sequence: 'B',
  safe_isolation: 'C',
  fault_diagnosis: 'D',
  knowledge_test: 'E',
  mock_am2: 'Mock day',
};

function when(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function SectionAm2Practice({
  id,
  studentName,
  userId,
}: {
  id?: string;
  studentName: string;
  userId: string | null;
}) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  // The learner's booked AM2 date (they set it in the simulator).
  const [examDate, setExamDate] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void db
      .from('profiles')
      .select('am2_exam_date')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled)
          setExamDate((data as { am2_exam_date?: string | null } | null)?.am2_exam_date ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setRows([]);
      return;
    }
    let cancelled = false;
    db.from('am2_mock_sessions')
      .select('session_type, overall_score, completed_at, component_scores, session_data')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(AM2_RUNS_LIMIT)
      .then(({ data, error }) => {
        if (cancelled) return;
        // A failed read isn't "no practice" — say so instead of implying they haven't started.
        setFailed(!!error);
        setRows(error ? [] : ((data ?? []) as Row[]));
      });
    return () => {
      cancelled = true;
    };
  }, [userId, attempt]);

  const view = useMemo(() => {
    if (!rows) return null;
    const counted = rows.filter(countsTowardsReady);
    const sections = buildSections(counted);
    const weak = (['B', 'C', 'D', 'E'] as WeakSection[]).flatMap((sec) => {
      const res = weakSpotsFromRows(
        sec,
        // Same window as the learner's own view: runs with saved mistakes, newest 5.
        rows
          .filter((r) => r.session_type === WEAK_SECTION_TYPE[sec] && r.session_data != null)
          .slice(0, 5),
        2
      );
      return res.spots.map((s) => ({ ...s, sec, looked: res.runsLooked }));
    });
    weak.sort((a, b) => b.runs - a.runs || b.count - a.count);
    const runsBySection = Object.fromEntries(
      AM2_SECTIONS.map((d) => [d.key, rows.filter((r) => r.session_type === d.sessionType).length])
    );
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = rows.filter(
      // A mock day saves each section as its own run too — don't count the day twice.
      (r) =>
        r.session_type !== 'mock_am2' &&
        r.completed_at &&
        new Date(r.completed_at).getTime() > weekAgo
    ).length;
    return { sections, weak: weak.slice(0, 4), recent: rows.slice(0, 6), runsBySection, thisWeek };
  }, [rows]);

  const first = studentName.split(' ')[0] || 'This learner';

  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <HubSectionHeading>AM2 practice</HubSectionHeading>
      {!view ? (
        <div
          className={cn(
            'rounded-2xl border border-white/[0.14] p-5 text-[13.5px] text-white',
            CARD_SURFACE
          )}
        >
          Loading…
        </div>
      ) : failed ? (
        <div className={cn('rounded-2xl border border-white/[0.14] p-5', CARD_SURFACE)}>
          <p className="text-[14.5px] font-semibold text-white">Couldn’t load AM2 practice</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            Something went wrong reading {first}’s runs.
          </p>
          <button
            type="button"
            onClick={() => {
              setRows(null);
              setAttempt((n) => n + 1);
            }}
            className="mt-3 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-bold text-black touch-manipulation"
          >
            Try again
          </button>
        </div>
      ) : rows && rows.length === 0 ? (
        <div className={cn('rounded-2xl border border-white/[0.14] p-5', CARD_SURFACE)}>
          <p className="text-[14.5px] font-semibold text-white">No AM2 practice yet</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            {first} hasn’t run the AM2 simulator. It’s in their Apprentice Hub under AM2 — the
            sections, a full mock day and drills built from their mistakes.
          </p>
        </div>
      ) : (
        <>
          {/* At a glance: when the AM2 is, and whether they're practising */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-white">
            <span>
              <span className="font-semibold">AM2:</span>{' '}
              {examDate
                ? new Date(`${examDate}T00:00:00`).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'date not set'}
            </span>
            <span>
              <span className="font-semibold">Last practised:</span>{' '}
              {when(view.recent[0]?.completed_at ?? null)}
            </span>
            <span>
              <span className="font-semibold">Runs this week:</span> {view.thisWeek}
            </span>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {/* Sections */}
            <div
              className={cn(
                'overflow-hidden rounded-3xl border border-white/[0.08]',
                CARD_SURFACE
              )}
            >
              <div className="flex items-center justify-between border-b border-white/[0.1] px-4 py-3 sm:px-5">
                <p className="text-[13px] font-semibold text-white">Sections</p>
                <p className="text-[12.5px] font-semibold text-white">
                  {view.sections.readyCount} of {view.sections.sections.length} ready
                </p>
              </div>
              <ul className="divide-y divide-white/[0.07]">
                {view.sections.sections.map((s) => {
                  const last = s.recent[0]?.score;
                  return (
                    <li key={s.key} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-elec-yellow text-[15px] font-bold text-black">
                        {s.key}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-semibold text-white">{s.title}</p>
                        <p className="text-[12px] text-white">
                          {view.runsBySection[s.key] ?? 0} run
                          {(view.runsBySection[s.key] ?? 0) === 1 ? '' : 's'} · bar {s.barLabel}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-[15px] font-bold tabular-nums text-white">
                          {last != null ? `${last}%` : '—'}
                        </p>
                        <p className={cn('text-[11.5px] font-semibold', 'text-white')}>
                          {s.status === 'ready'
                            ? 'Ready'
                            : s.status === 'practising'
                              ? 'Practising'
                              : 'No assessment yet'}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-white/[0.07] px-4 py-2.5 text-[11.5px] text-white sm:px-5">
                Ready = the last two Assessment runs at the bar (exam sittings for E).
              </p>
            </div>

            <div className="space-y-3">
              {/* Weak spots */}
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border border-white/[0.14]',
                  CARD_SURFACE
                )}
              >
                <p className="border-b border-white/[0.1] px-4 py-3 text-[13px] font-semibold text-white sm:px-5">
                  Keeps going wrong
                </p>
                {view.weak.length === 0 ? (
                  <p className="px-4 py-3 text-[13px] text-white sm:px-5">
                    No repeated mistakes in recent runs.
                  </p>
                ) : (
                  <ul className="divide-y divide-white/[0.07]">
                    {view.weak.map((w) => (
                      <li
                        key={`${w.sec}-${w.tag}`}
                        className="flex items-center gap-3 px-4 py-2.5 sm:px-5"
                      >
                        <span className="shrink-0 rounded-md border border-white/[0.25] px-1.5 py-0.5 text-[11px] font-bold text-white">
                          {w.sec}
                        </span>
                        <span className="min-w-0 flex-1 text-[13px] text-white">
                          {w.sec === 'E' ? `Missed: ${w.label}` : w.label}
                        </span>
                        <span className="shrink-0 text-[12px] text-white">
                          {w.runs} of {w.looked} run{w.looked === 1 ? '' : 's'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recent runs */}
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border border-white/[0.14]',
                  CARD_SURFACE
                )}
              >
                <p className="border-b border-white/[0.1] px-4 py-3 text-[13px] font-semibold text-white sm:px-5">
                  Recent runs
                </p>
                <ul className="divide-y divide-white/[0.07]">
                  {view.recent.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                      <span className="w-14 shrink-0 text-[12px] text-white">
                        {when(r.completed_at)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                        {SECTION_FOR_TYPE[r.session_type] ?? r.session_type}
                        {r.component_scores?.mode
                          ? ` · ${MODE_LABEL[r.component_scores.mode] ?? ''}`
                          : ''}
                      </span>
                      <span className="shrink-0 font-mono text-[13px] font-bold tabular-nums text-white">
                        {r.session_type === 'mock_am2'
                          ? Array.isArray(
                              (r.session_data as { sectionsAtBar?: unknown } | null)?.sectionsAtBar
                            )
                            ? `${(r.session_data as { sectionsAtBar: string[] }).sectionsAtBar.length}/4 at bar`
                            : '—'
                          : r.overall_score != null
                            ? `${Math.round(r.overall_score)}%`
                            : '—'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SectionAm2Practice;
