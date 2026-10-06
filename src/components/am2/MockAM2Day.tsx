/**
 * MockAM2Day — Sections A1, B, C, D and E back to back, in AM2S order.
 *
 * Each existing simulator is reused; it hands back the score of the run it
 * just finished through onSessionComplete, and the wrapper shows that
 * against the section's practice bar before moving on.
 *
 * Rebuilt 5 Oct 2026. The old version ran safe isolation first ("the first
 * checkpoint", which it isn't — it's Section C), showed made-up time targets
 * and a "counts for 15%" weighting the AM2 doesn't have, and — the real bug —
 * read each phase's score from the readiness hook's BEST-EVER score, so a
 * mock day reported your best previous run rather than the one you'd just
 * done.
 *
 * One am2_mock_sessions row (session_type 'mock_am2') is written at the end
 * with each section's result, so it shows in Your runs.
 */
import { useState, useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AM2_SECTIONS, useAM2Sections, type AM2SectionDef } from '@/hooks/am2/useAM2Sections';
import { motion } from 'framer-motion';
import { containerVariants } from '@/components/college/primitives';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  AM2_EYEBROW,
  AM2_LIST,
  AM2_PAGE,
  AM2_PRIMARY,
  AM2_SPLIT,
  AM2_TITLE,
} from '@/components/am2/layout';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { SafeWorkingPractices } from '@/components/am2/safe-working/SafeWorkingPractices';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { AM2KnowledgeQuiz } from '@/components/am2/AM2KnowledgeQuiz';

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

type Stage = { kind: 'setup' } | { kind: 'section'; index: number } | { kind: 'summary' };

interface SectionResult {
  score: number | null;
  seconds: number;
}

interface MockAM2DayProps {
  onExit: () => void;
  onSessionComplete?: () => void;
  /** Open one section's own practice (from a card on the setup screen). */
  onPractise?: (tab: AM2SectionDef['tab']) => void;
  /** True while a section is under way — the page asks before leaving. */
  onInProgressChange?: (inProgress: boolean) => void;
}

function fmtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h ? `${h}h ${m}m` : `${m}:${String(s).padStart(2, '0')}`;
}

function simulatorFor(def: AM2SectionDef, onDone: (score?: number) => void) {
  switch (def.key) {
    case 'A1':
      return <SafeWorkingPractices onSessionComplete={onDone} forceMode="assessment" />;
    case 'B':
      return <TestingSimulator onSessionComplete={onDone} forceMode="assessment" />;
    case 'C':
      return <SafeIsolationAssessment onSessionComplete={onDone} forceMode="assessment" />;
    case 'D':
      return <FaultFindingSimulator onSessionComplete={onDone} forceExam />;
    case 'E':
      return <AM2KnowledgeQuiz onSessionComplete={onDone} forceExam />;
  }
}

export function MockAM2Day({
  onExit,
  onSessionComplete,
  onPractise,
  onInProgressChange,
}: MockAM2DayProps) {
  const { user } = useAuth();
  const [stage, setStage] = useState<Stage>({ kind: 'setup' });
  const [results, setResults] = useState<Record<string, SectionResult>>({});
  const [dayStartedAt, setDayStartedAt] = useState(0);
  // Frozen when the day ends, so the summary (and what's copied for the tutor)
  // matches what was saved instead of ticking on with each re-render.
  const [dayEndedAt, setDayEndedAt] = useState(0);
  const [sectionStartedAt, setSectionStartedAt] = useState(0);
  const [justFinished, setJustFinished] = useState<AM2SectionDef | null>(null);

  // Mid-day: tell the page (so Back asks first) and the browser (a refresh or
  // close would throw away hours of sections).
  const inProgress = stage.kind === 'section';
  useEffect(() => {
    onInProgressChange?.(inProgress);
    if (!inProgress) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => {
      window.removeEventListener('beforeunload', warn);
      onInProgressChange?.(false);
    };
  }, [inProgress, onInProgressChange]);
  // Looking at the section's own debrief before moving on.
  const [reviewing, setReviewing] = useState(false);

  const start = () => {
    const now = Date.now();
    setDayStartedAt(now);
    setSectionStartedAt(now);
    setResults({});
    setStage({ kind: 'section', index: 0 });
  };

  /** The simulator passes the score of the run it just finished. */
  const handleSectionDone = (score?: number) => {
    if (stage.kind !== 'section') return;
    const def = AM2_SECTIONS[stage.index];
    // One go per section on the day — a re-run from inside its debrief
    // doesn't replace the result.
    if (results[def.key]) return;
    const seconds = Math.round((Date.now() - sectionStartedAt) / 1000);
    setResults((r) => ({
      ...r,
      [def.key]: { score: score != null ? Math.round(score) : null, seconds },
    }));
    setJustFinished(def);
  };

  const continueOn = async () => {
    if (stage.kind !== 'section') return;
    setJustFinished(null);
    setReviewing(false);
    if (stage.index < AM2_SECTIONS.length - 1) {
      setSectionStartedAt(Date.now());
      setStage({ kind: 'section', index: stage.index + 1 });
      return;
    }
    const endedAt = Date.now();
    setDayEndedAt(endedAt);
    await saveDay(endedAt);
    setStage({ kind: 'summary' });
    onSessionComplete?.();
  };

  const saveDay = async (endedAt: number) => {
    if (!user) return;
    const scored = AM2_SECTIONS.map((s) => results[s.key]?.score).filter(
      (v): v is number => v != null
    );
    const componentScores = Object.fromEntries(
      AM2_SECTIONS.map((s) => [s.key, results[s.key]?.score ?? null])
    );
    try {
      await db.from('am2_mock_sessions').insert({
        user_id: user.id,
        session_type: 'mock_am2',
        status: 'completed',
        overall_score: scored.length
          ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length)
          : null,
        component_scores: componentScores,
        session_data: {
          sectionsAtBar: AM2_SECTIONS.filter((s) => (results[s.key]?.score ?? -1) >= s.bar).map(
            (s) => s.key
          ),
          seconds: Object.fromEntries(AM2_SECTIONS.map((s) => [s.key, results[s.key]?.seconds])),
        },
        time_spent_seconds: Math.round((endedAt - dayStartedAt) / 1000),
        started_at: new Date(dayStartedAt).toISOString(),
        completed_at: new Date(endedAt).toISOString(),
      });
    } catch {
      /* the summary still shows; Your runs just won't list this day */
    }
  };

  // The page frame for this tab is full-height with overflow hidden, so the
  // setup and summary screens scroll themselves.
  if (stage.kind === 'setup') {
    return (
      <div className="h-full overflow-y-auto">
        <SetupScreen onStart={start} onExit={onExit} onPractise={onPractise} />
      </div>
    );
  }

  if (stage.kind === 'summary') {
    return (
      <div className="h-full overflow-y-auto">
        <SummaryScreen
          results={results}
          totalSeconds={Math.round((dayEndedAt - dayStartedAt) / 1000)}
          onExit={onExit}
          onPractise={onPractise}
        />
      </div>
    );
  }

  const def = AM2_SECTIONS[stage.index];
  return (
    <div className="flex h-full flex-col">
      {/* Where you are in the day — same ground as the page, not a separate band. */}
      <div className="shrink-0 border-b border-white/[0.08] px-3 py-2.5 sm:px-4 lg:px-5">
        <ol className="flex items-center gap-1.5 overflow-x-auto sm:gap-2">
          {AM2_SECTIONS.map((sec, i) => {
            const done = i < stage.index;
            const current = i === stage.index;
            const r = results[sec.key];
            return (
              <li key={sec.key} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {i > 0 && <span className="h-px w-3 bg-white/20 sm:w-6" aria-hidden />}
                <span
                  className={cn(
                    'inline-flex h-9 items-center gap-2 rounded-full border pl-1 pr-3 text-[12.5px] font-semibold',
                    current
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : done
                        ? 'border-white/[0.18] text-white'
                        : 'border-white/[0.12] text-white'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold',
                      current
                        ? 'bg-black text-elec-yellow'
                        : done
                          ? (r?.score ?? -1) >= sec.bar
                            ? 'bg-emerald-400 text-black'
                            : 'bg-amber-400 text-black'
                          : 'bg-white/[0.1] text-white'
                    )}
                  >
                    {sec.key}
                  </span>
                  <span className={cn(!current && 'hidden md:inline')}>
                    {done && r?.score != null ? `${r.score}%` : sec.title.split(',')[0]}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{simulatorFor(def, handleSectionDone)}</div>

      {justFinished && !reviewing && (
        <ResultSheet
          def={justFinished}
          result={results[justFinished.key]}
          isLast={stage.index === AM2_SECTIONS.length - 1}
          onContinue={() => void continueOn()}
          onReview={() => setReviewing(true)}
        />
      )}

      {/* Reading the section's debrief — the way on stays in reach */}
      {justFinished && reviewing && (
        <div className="shrink-0 border-t border-white/[0.12] bg-[hsl(0_0%_9%)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
            <p className="min-w-0 flex-1 text-[13px] font-semibold text-white">
              Section {justFinished.key} done — take your time with the debrief.
            </p>
            <button
              type="button"
              onClick={() => void continueOn()}
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[14.5px] font-bold text-black touch-manipulation"
            >
              {stage.index === AM2_SECTIONS.length - 1
                ? 'See the day'
                : `Continue to Section ${AM2_SECTIONS[stage.index + 1]?.key}`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function SetupScreen({
  onStart,
  onPractise,
}: {
  onStart: () => void;
  onExit: () => void;
  onPractise?: (tab: AM2SectionDef['tab']) => void;
}) {
  const { data } = useAM2Sections();
  const lastMock = data?.lastMock;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[1400px] space-y-8 px-4 pb-12 pt-6 sm:space-y-10 sm:px-6 lg:px-10"
    >
      {/* Header + record */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-10">
        <div>
          <p className="text-[12px] font-semibold text-white">Full practice day</p>
          <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-white lg:text-[38px]">
            Mock AM2 day
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
            The five sections you can practise here, back to back in the order you&apos;ll meet them
            on the day. Each one is judged against its practice bar the moment you finish it.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-elec-yellow px-10 text-[16px] font-bold text-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] touch-manipulation active:scale-[0.98] sm:w-auto"
          >
            Start the day with Section B
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          <HubKpi
            accent
            label="Your last full day — sections at the bar"
            value={lastMock ? `${lastMock.atBar} of ${lastMock.of}` : '—'}
            verdict={
              lastMock
                ? new Date(lastMock.at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })
                : 'Not done yet'
            }
          />
          <HubKpi
            label="Sections ready"
            value={data ? `${data.readyCount} of ${AM2_SECTIONS.length}` : '—'}
            verdict={
              data && data.readyCount === AM2_SECTIONS.length
                ? 'Every section — a good time for a full day'
                : 'Ready = last two runs at the bar'
            }
          />
        </div>
      </div>

      {/* The day */}
      <section className="space-y-3">
        <HubSectionHeading>The day, in order</HubSectionHeading>
        <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
          {AM2_SECTIONS.map((sec, i) => {
            const mine = data?.sections.find((x) => x.key === sec.key);
            const last = mine?.recent[0]?.score;
            return (
              <li key={sec.key}>
                <button
                  type="button"
                  onClick={() => onPractise?.(sec.tab)}
                  disabled={!onPractise}
                  className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full p-4 lg:p-5')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-elec-yellow text-[17px] font-bold text-black">
                      {sec.key}
                    </span>
                    <span className="text-[12px] font-semibold text-white">Step {i + 1}</span>
                  </div>
                  <p className="mt-3 text-[16px] font-semibold leading-tight text-white">
                    {sec.title}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white">{sec.summary}</p>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                    <div>
                      <p className="text-[11.5px] text-white">Bar</p>
                      <p className="text-[13.5px] font-semibold text-white">{sec.barLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11.5px] text-white">Your last run</p>
                      <p
                        className={cn(
                          'text-[13.5px] font-semibold tabular-nums',
                          last == null ? 'text-white' : 'text-white'
                        )}
                      >
                        {last == null ? 'Not tried' : `${last}%`}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-2 text-[12px] text-white">
                    <span>{sec.onTheDay} on the real day</span>
                    {onPractise && (
                      <span className="inline-flex items-center gap-1 font-semibold">
                        Practise <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Before you start */}
      <section className="space-y-3">
        <HubSectionHeading>Before you start</HubSectionHeading>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {[
            ['Take breaks', "The next section doesn't start until you tap Continue."],
            [
              'Have your books',
              'On the day you’re given BS 7671, GN3, the On-Site Guide and the IET guide to the Building Regulations. Have yours to hand.',
            ],
            [
              'The installation is separate',
              'The composite installation (A2–A6) is hands-on — practise that on a real board.',
            ],
          ].map(([t, d]) => (
            <li
              key={t}
              className={cn(
                'flex flex-col rounded-2xl border border-white/[0.14] p-4',
                CARD_SURFACE
              )}
            >
              <span className="text-[14px] font-semibold text-white">{t}</span>
              <span className="mt-1 text-[12.5px] leading-snug text-white">{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────── */

function ResultSheet({
  def,
  result,
  isLast,
  onContinue,
  onReview,
}: {
  def: AM2SectionDef;
  result: SectionResult | undefined;
  isLast: boolean;
  onContinue: () => void;
  onReview: () => void;
}) {
  const score = result?.score ?? null;
  const atBar = score != null && score >= def.bar;
  const next = AM2_SECTIONS[AM2_SECTIONS.findIndex((s) => s.key === def.key) + 1];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label={`Section ${def.key} done`}
    >
      <div className="w-full rounded-t-2xl border-t border-white/[0.12] bg-[hsl(0_0%_9%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:mx-auto sm:max-w-lg sm:rounded-2xl sm:border sm:mb-6">
        <p className="text-[12px] font-semibold text-white">
          Section {def.key} · {def.title}
        </p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[40px] font-bold leading-none tabular-nums text-white">
              {score != null ? `${score}%` : '—'}
            </p>
            <p
              className={cn(
                'mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold',
                'text-white'
              )}
            >
              {atBar ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {score == null
                ? "Result didn't save"
                : atBar
                  ? `At the bar (${def.barLabel})`
                  : `Below the bar (${def.barLabel})`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-white">Time</p>
            <p className="text-[18px] font-semibold tabular-nums text-white">
              {fmtTime(result?.seconds ?? 0)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98]"
        >
          {isLast ? 'See the day' : `Continue to Section ${next?.key}`}
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onReview}
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/[0.2] text-[14px] font-semibold text-white touch-manipulation"
        >
          See the debrief first
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function SummaryScreen({
  results,
  totalSeconds,
  onExit,
  onPractise,
}: {
  results: Record<string, SectionResult>;
  totalSeconds: number;
  onExit: () => void;
  onPractise?: (tab: AM2SectionDef['tab']) => void;
}) {
  const atBar = AM2_SECTIONS.filter((s) => (results[s.key]?.score ?? -1) >= s.bar);
  const below = AM2_SECTIONS.filter((s) => !atBar.includes(s));
  const [copied, setCopied] = useState(false);

  // A plain-text summary to paste to a tutor or an employer.
  const summaryText = [
    `Mock AM2 day — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `${atBar.length} of ${AM2_SECTIONS.length} sections at the practice bar · total ${fmtTime(totalSeconds)}`,
    '',
    ...AM2_SECTIONS.map((s) => {
      const r = results[s.key];
      const ok = (r?.score ?? -1) >= s.bar;
      return `Section ${s.key} · ${s.title}: ${r?.score != null ? `${r.score}%` : 'not finished'} (bar ${s.barLabel}) — ${ok ? 'at the bar' : 'below the bar'} · ${fmtTime(r?.seconds ?? 0)}`;
    }),
    '',
    'Practice on Elec-Mate. Not affiliated with or endorsed by NET or any awarding organisation.',
  ].join('\n');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className={AM2_PAGE}>
      <div className={AM2_SPLIT}>
        <div className="space-y-5">
          <div>
            <p className={AM2_EYEBROW}>Mock AM2 day · done</p>
            <h1 className={AM2_TITLE}>
              {atBar.length} of {AM2_SECTIONS.length} sections at the bar
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
              {below.length === 0
                ? 'Every section met its practice bar. Keep it there with another day closer to your AM2.'
                : `Work on Section${below.length > 1 ? 's' : ''} ${below.map((s) => s.key).join(', ')} next — that's where this day fell short.`}{' '}
              Total time {fmtTime(totalSeconds)}.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={onExit} className={AM2_PRIMARY}>
              Back to AM2
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.22] px-5 text-[14px] font-semibold text-white touch-manipulation"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : null}
              {copied ? 'Copied' : 'Copy for your tutor'}
            </button>
          </div>
          <p className="text-[11.5px] leading-relaxed text-white">
            Practice for the AM2. Not affiliated with or endorsed by NET or any awarding
            organisation.
          </p>
        </div>
        <ul className={AM2_LIST}>
          {AM2_SECTIONS.map((s) => {
            const r = results[s.key];
            const ok = (r?.score ?? -1) >= s.bar;
            return (
              <li key={s.key} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] text-[17px] font-bold text-white">
                  {s.key}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-white">{s.title}</p>
                  <p className="mt-0.5 text-[12.5px] tabular-nums text-white">
                    {fmtTime(r?.seconds ?? 0)} here · {s.onTheDay} on the day · bar {s.barLabel}
                  </p>
                  {!ok && onPractise && (
                    <button
                      type="button"
                      onClick={() => onPractise(s.tab)}
                      className="mt-2 inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.22] px-3 text-[12.5px] font-semibold text-white touch-manipulation"
                    >
                      Practise Section {s.key} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <span className={cn('text-[20px] font-bold tabular-nums', 'text-white')}>
                  {r?.score != null ? `${r.score}%` : '—'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MockAM2Day;
