/**
 * Am2TaskReadiness — AM2 practice against NET's own task list (ELE-1907).
 *
 * One component, shown to the learner (EPA page, Readiness tab) and to their
 * tutor (Student 360, AM2 practice), from the same am2_mock_sessions rows and
 * the same rules as the simulator's own readiness (buildSections: Assessment
 * runs only, ready = the last two at the practice bar, fading after 30 days;
 * weakSpotsFromRows for repeated mistakes). So both see the same answer.
 *
 * Honest about what it is: practice performance in the simulator. NET marks
 * each task Competent or Not Yet Competent on the day; nothing here predicts
 * that. The composite installation (A2–A6 on the AM2S v1) has no simulator,
 * and says so rather than being left off.
 *
 * Task lists and lengths are NET's (AM2S v1 Pre-Assessment Manual v2025.03;
 * older AM2 manual v2023.01). AM2S and AM2 are different assessments and are
 * never merged; the AM2E and AM2D task lists are not loaded, so for those
 * routes this says so instead of guessing.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  AM2_RUNS_LIMIT,
  AM2_SECTIONS,
  buildSections,
  countsTowardsReady,
  type AM2SectionKey,
  type AM2SectionState,
} from '@/hooks/am2/useAM2Sections';
import {
  WEAK_SECTION_TYPE,
  weakSpotsFromRows,
  type WeakSection,
} from '@/hooks/am2/useAM2WeakSpots';
import { DRILLS } from '@/data/am2/sectionBDrills';
import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import type { EpaRouteKind } from '@/lib/epa/readiness';

const db = supabase as unknown as SupabaseClient;

export interface Am2Row {
  session_type: string;
  overall_score: number | null;
  completed_at: string | null;
  component_scores: { mode?: string } | null;
  session_data: unknown;
}

/** One line of NET's task list. `section` = the simulator section that practises it. */
interface NetTask {
  key: string;
  title: string;
  onTheDay: string;
  section: AM2SectionKey | null;
  /** Why there's no practice data, when there's no simulator. */
  noSim?: string;
}

const sec = (k: AM2SectionKey) => AM2_SECTIONS.find((s) => s.key === k)!;

/** AM2S v1 (apprentices registered on the standard from September 2023). */
const AM2S_V1: NetTask[] = [
  { key: 'A1', title: sec('A1').title, onTheDay: '1 hour', section: 'A1' },
  {
    key: 'A2–A6',
    title: 'Composite installation',
    onTheDay: '10½ hours',
    section: null,
    noSim: 'Hands-on installation. No simulator: practised at college and at work.',
  },
  { key: 'B', title: sec('B').title, onTheDay: '3½ hours', section: 'B' },
  { key: 'C', title: sec('C').title, onTheDay: '30 minutes', section: 'C' },
  { key: 'D', title: sec('D').title, onTheDay: '2 hours', section: 'D' },
  { key: 'E', title: `${sec('E').title} (45 questions)`, onTheDay: '1½ hours', section: 'E' },
];

/** The AM2 (final unit of the C&G 2357 / EAL NVQ). */
const AM2: NetTask[] = [
  {
    key: 'A',
    title: 'Composite installation',
    onTheDay: 'see NET manual',
    section: null,
    noSim: 'Hands-on installation. No simulator: practised at college and at work.',
  },
  { key: 'B', title: sec('B').title, onTheDay: '3½ hours', section: 'B' },
  { key: 'C', title: sec('C').title, onTheDay: '30 minutes', section: 'C' },
  { key: 'D', title: sec('D').title, onTheDay: '2 hours', section: 'D' },
  { key: 'E', title: `${sec('E').title} (30 questions)`, onTheDay: '1 hour', section: 'E' },
];

const TASKS: Partial<Record<EpaRouteKind, { name: string; list: NetTask[]; source: string }>> = {
  am2s: {
    name: 'AM2S',
    list: AM2S_V1,
    source: 'NET task list for the AM2S v1 (apprentices registered from September 2023).',
  },
  am2: { name: 'AM2', list: AM2, source: 'NET task list for the AM2.' },
};

const STATUS: Record<
  AM2SectionState['status'],
  { label: string; tone: 'done' | 'action' | 'neutral' }
> = {
  ready: { label: 'At the bar', tone: 'done' },
  practising: { label: 'Practising', tone: 'action' },
  not_tried: { label: 'Not tried', tone: 'neutral' },
};

export interface WeakestTask {
  task: NetTask;
  state: AM2SectionState;
  drillLabel: string;
  drillPath: string;
}

/** The weakest practisable task and the drill for it. Lowest recent score
 *  among those still practising; else the first untried; null when all ready. */
export function weakestTask(
  tasks: NetTask[],
  states: Map<AM2SectionKey, AM2SectionState>,
  rows: Am2Row[]
): WeakestTask | null {
  const practisable = tasks
    .filter((t) => t.section)
    .map((t) => ({ task: t, state: states.get(t.section!)! }))
    .filter((x) => x.state && x.state.status !== 'ready');
  if (practisable.length === 0) return null;
  const practising = practisable
    .filter((x) => x.state.status === 'practising')
    .sort((a, b) => (a.state.recent[0]?.score ?? 0) - (b.state.recent[0]?.score ?? 0));
  const pick = practising[0] ?? practisable[0];
  const key = pick.task.section!;
  const def = sec(key);
  let drillLabel = `Practise section ${key}: ${def.title}`;
  let drillPath = `/apprentice/am2-simulator?tab=${def.tab}`;
  if (key !== 'A1') {
    const weakKey = key as WeakSection;
    const spots = weakSpotsFromRows(
      weakKey,
      rows
        .filter((r) => r.session_type === WEAK_SECTION_TYPE[weakKey] && r.session_data != null)
        .slice(0, 5),
      1
    ).spots;
    const top = spots[0];
    if (top?.drill) {
      drillLabel = `Drill: ${DRILLS[top.drill].title}`;
      drillPath = `/apprentice/am2-simulator?tab=b-drill&kinds=${top.drill}`;
    } else if (top && key === 'E') {
      drillLabel = `Topic paper: ${top.label}`;
      drillPath = `/apprentice/am2-simulator?tab=knowledge&topic=${encodeURIComponent(top.label)}`;
    }
  }
  return { ...pick, drillLabel, drillPath };
}

export function Am2TaskReadiness({
  userId,
  routeKind,
  audience,
  rows: given,
  name,
}: {
  userId: string | null;
  routeKind: EpaRouteKind;
  audience: 'learner' | 'tutor';
  /** Already-loaded runs (Student 360 reads them once for the whole section). */
  rows?: Am2Row[] | null;
  /** The learner's first name, for the tutor's wording. */
  name?: string;
}) {
  const navigate = useNavigate();
  const [fetched, setFetched] = useState<Am2Row[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (given !== undefined || !userId) return;
    let cancelled = false;
    db.from('am2_mock_sessions')
      .select('session_type, overall_score, completed_at, component_scores, session_data')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(AM2_RUNS_LIMIT)
      .then(({ data, error }) => {
        if (cancelled) return;
        setFailed(!!error);
        setFetched(error ? [] : ((data ?? []) as Am2Row[]));
      });
    return () => {
      cancelled = true;
    };
  }, [given, userId]);

  const rows = given !== undefined ? given : fetched;
  const plan = TASKS[routeKind];

  const view = useMemo(() => {
    if (!rows || !plan) return null;
    const built = buildSections(rows.filter(countsTowardsReady));
    const states = new Map(built.sections.map((s) => [s.key, s]));
    const practisable = plan.list.filter((t) => t.section);
    const atBar = practisable.filter((t) => states.get(t.section!)?.status === 'ready').length;
    return {
      states,
      practisable: practisable.length,
      atBar,
      weakest: weakestTask(plan.list, states, rows),
      runs: rows.length,
    };
  }, [rows, plan]);

  const who = audience === 'learner' ? 'You have' : `${name || 'They'} ${name ? 'has' : 'have'}`;

  if (!plan) {
    return (
      <div className={cn(LC_FRAME, 'p-4 sm:p-5')} data-testid="am2-task-readiness">
        <p className="text-[14px] text-white">
          The simulator practises AM2-family tasks. The NET task list for this route is not loaded
          here, so practice is not shown against it.
        </p>
      </div>
    );
  }

  return (
    <section
      className={LC_FRAME}
      data-testid="am2-task-readiness"
      aria-label={`${plan.name} task list`}
    >
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <p className="text-[13px] font-medium text-white">
          {plan.name} practice against NET&apos;s task list
        </p>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-white">
          {!view
            ? failed
              ? 'Practice could not be loaded.'
              : 'Loading practice…'
            : view.runs === 0
              ? `${who} not run the AM2 simulator yet.`
              : `${view.atBar} of ${view.practisable} practisable tasks at the practice bar.`}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          Practice in the Elec-Mate simulator, not a prediction. On the day NET marks each task
          Competent or Not Yet Competent.
        </p>
      </div>

      <ul className="divide-y divide-white/[0.07] border-t border-white/[0.08]">
        {plan.list.map((t) => {
          const st = t.section ? view?.states.get(t.section) : undefined;
          const last = st?.recent[0]?.score;
          return (
            <li
              key={t.key}
              className="flex min-h-[56px] items-center gap-3 px-4 py-3 sm:px-5"
              data-task={t.key}
            >
              <span className="flex h-9 min-w-[36px] shrink-0 items-center justify-center rounded-lg border border-white/[0.22] px-1.5 text-[13px] font-bold text-white">
                {t.key}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold leading-snug text-white">{t.title}</p>
                <p className="text-[12px] text-white">
                  {t.noSim
                    ? t.noSim
                    : `${t.onTheDay} on the day · bar ${sec(t.section!).barLabel}${st ? ` · ${st.runs} run${st.runs === 1 ? '' : 's'}` : ''}`}
                </p>
              </div>
              {st ? (
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={lcChip(STATUS[st.status].tone)}>{STATUS[st.status].label}</span>
                  {last != null && (
                    <span className="font-mono text-[12.5px] font-bold tabular-nums text-white">
                      Last {last}%
                    </span>
                  )}
                </div>
              ) : t.noSim ? (
                <span className={lcChip('neutral')}>No simulator</span>
              ) : null}
            </li>
          );
        })}
      </ul>

      {view?.weakest && (
        <div className="flex flex-col gap-2 border-t border-white/[0.08] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white">
              Weakest task: {view.weakest.task.key} · {view.weakest.task.title}
            </p>
            <p className="text-[13px] text-white">
              {audience === 'learner'
                ? view.weakest.drillLabel
                : `Suggested next: ${view.weakest.drillLabel}`}
            </p>
          </div>
          {audience === 'learner' && (
            <button
              type="button"
              onClick={() => navigate(view.weakest!.drillPath)}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-bold text-black touch-manipulation"
            >
              Start the drill
            </button>
          )}
        </div>
      )}

      <p className="border-t border-white/[0.07] px-4 py-2.5 text-[12px] text-white sm:px-5">
        {plan.source} At the bar = the last two Assessment runs at the practice bar, within 30 days.
      </p>
    </section>
  );
}

export default Am2TaskReadiness;

/**
 * The weakest practisable section from the readiness model's summary (for the
 * gateway list, which has statuses and last scores but not the runs). Same
 * rule as weakestTask: lowest last score still practising, else first untried.
 */
export function weakestSectionLabel(
  sections: Array<{ key: string; title: string; status: string; last: number | null }>
): string | null {
  const open = sections.filter((s) => s.status !== 'ready');
  if (open.length === 0) return null;
  const practising = open
    .filter((s) => s.status === 'practising')
    .sort((a, b) => (a.last ?? 0) - (b.last ?? 0));
  const s = practising[0] ?? open[0];
  return `${s.key} ${s.title}${s.last != null ? ` (last ${s.last}%)` : ''}`;
}
