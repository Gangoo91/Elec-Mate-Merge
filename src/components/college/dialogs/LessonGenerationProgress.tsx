import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';

/** The landing-page card surface, edge to edge on a phone (same as the list and start sheet). */
const COLLEGE_CARD =
  '-mx-4 card-surface max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] p-5 sm:mx-0 sm:rounded-2xl sm:border sm:p-6';
import type { GeneratedActivity, GeneratedLessonPlan } from '@/hooks/useCurriculum';
import {
  friendlyGenerationError,
  type GenerationState,
  type StreamSource,
} from '@/hooks/useLessonGenerationStream';

/* ==========================================================================
   LessonGenerationProgress (7 Oct 2026)

   The live half of the lesson generator. Andrew: "the lesson plan part where
   the AI is streaming needs to be designed better". Instead of a byte count
   and a list of phase names, the tutor watches the plan arrive:

   - a staged rail, where every tick is earned by an event from the stream
     (see `deriveStages`), with the real elapsed time;
   - the regulation sources the plan is grounded in, by document and section;
   - the plan itself, as cards: objectives first, then the activity timeline
     with minute bars, then what else was written;
   - a clear stop, errors with a retry, and on completion the three next steps.
   ========================================================================== */

const DOC_LABEL: Record<StreamSource['document_type'], string> = {
  bs7671: 'BS 7671',
  gn3: 'Guidance Note 3',
  osg: 'On-Site Guide',
};

const PHASE_LABEL: Record<GeneratedActivity['phase'], string> = {
  starter: 'Starter',
  input: 'Input',
  modelling: 'Modelling',
  practice: 'Practice',
  practical: 'Practical',
  plenary: 'Plenary',
  afl: 'Check',
};

type StageState = 'pending' | 'active' | 'done' | 'warn';

interface Stage {
  key: string;
  label: string;
  state: StageState;
  detail?: string;
}

interface Props {
  state: GenerationState;
  acCount: number;
  unitCode: string;
  durationMins: number;
  onCancel: () => void;
  onRetry: () => void;
  onBack: () => void;
  onOpenPlan: () => void;
  onBuildSlides: () => void;
  onSchedule: () => void;
  scheduled: boolean;
}

/** Whole activities only: the one still being written has no time yet. */
function completeActivities(plan: Partial<GeneratedLessonPlan> | null): GeneratedActivity[] {
  const acts = Array.isArray(plan?.activities) ? plan!.activities : [];
  return acts.filter(
    (a): a is GeneratedActivity =>
      Boolean(a) &&
      typeof a.time_mins === 'number' &&
      typeof a.title === 'string' &&
      a.title.length > 0
  );
}

function deriveStages(
  s: GenerationState,
  acCount: number,
  unitCode: string,
  duration: number
): Stage[] {
  const has = (p: string) => s.phases.some((x) => x.phase === p);
  const done = s.status === 'done';
  const acts = completeActivities(s.partialPlan);
  const writingActs =
    Array.isArray(s.partialPlan?.activities) && s.partialPlan!.activities.length > 0;
  const objectives = Array.isArray(s.partialPlan?.learning_objectives)
    ? s.partialPlan!.learning_objectives.filter((o) => o && o.text).length
    : 0;
  const sum = acts.reduce((n, a) => n + a.time_mins, 0);
  const target = s.partialPlan?.duration_mins ?? duration;
  const live = s.status === 'running';

  const criteriaDone = has('embedding_query') || has('searching_rag') || s.sources !== null || done;
  const regsDone = s.sources !== null || done;
  const planDone = writingActs || s.planComplete || done;
  const actsDone = s.planComplete || done;
  const saveDone = done;

  const st = (isDone: boolean, isActive: boolean): StageState =>
    isDone ? 'done' : isActive && live ? 'active' : 'pending';

  const counts = s.sources
    ? (['bs7671', 'gn3', 'osg'] as const)
        .map((d) => [d, s.sources!.filter((x) => x.document_type === d).length] as const)
        .filter(([, n]) => n > 0)
        .map(([d, n]) => `${DOC_LABEL[d]} ${n}`)
        .join(', ')
    : '';

  const stages: Stage[] = [
    {
      key: 'criteria',
      label: 'Reading the criteria',
      state: st(criteriaDone, true),
      detail: `${acCount} ${acCount === 1 ? 'criterion' : 'criteria'} from unit ${unitCode}`,
    },
    {
      key: 'regs',
      label: 'Finding the regulations',
      state: st(regsDone, criteriaDone),
      detail: s.sources ? `${s.sources.length} sections: ${counts}` : undefined,
    },
    {
      key: 'plan',
      label: 'Planning the session',
      state: st(planDone, regsDone),
      detail:
        objectives > 0
          ? `${objectives} objective${objectives === 1 ? '' : 's'} written`
          : undefined,
    },
    {
      key: 'acts',
      label: 'Writing the activities',
      state: st(actsDone, planDone),
      detail: s.planRetrying
        ? 'Connection dropped, writing it again'
        : acts.length > 0
          ? `${acts.length} activit${acts.length === 1 ? 'y' : 'ies'}, ${sum} min so far`
          : undefined,
    },
    timingsStage(s, actsDone, sum, target),
    {
      key: 'save',
      label: 'Saving',
      state: st(saveDone, has('saving')),
      detail: done
        ? s.result?.lesson_plan_id
          ? 'Saved as a draft'
          : 'Not saved'
        : has('saving')
          ? undefined
          : actsDone && !s.briefComplete
            ? "Finishing the tutor's briefing"
            : undefined,
    },
  ];
  // Failed or stopped: the first unfinished stage is where it stopped.
  if (s.status === 'error' || s.status === 'cancelled') {
    const at = stages.find((x) => x.state !== 'done');
    if (at) at.state = 'warn';
  }
  return stages;
}

/**
 * The function checks the timings once the briefing is in (and, from the
 * 7 Oct deploy, absorbs a small miss), emitting `checking_timings`. Until
 * that event or the final plan arrives this stage is waiting, not done.
 */
function timingsStage(
  s: GenerationState,
  actsDone: boolean,
  partialSum: number,
  target: number
): Stage {
  const base = { key: 'timings', label: 'Checking timings' };
  const check = s.phases.find((x) => x.phase === 'checking_timings')?.meta;
  const final = s.status === 'done' && s.result ? s.result.plan : null;
  if (final || check) {
    const finalActs = final ? completeActivities(final) : [];
    const sum = final ? finalActs.reduce((n, a) => n + a.time_mins, 0) : partialSum;
    const goal = final?.duration_mins ?? target;
    const adjusted = Boolean(check?.adjusted);
    const planned = typeof check?.planned === 'number' ? check.planned : null;
    if (adjusted || sum === goal) {
      return {
        ...base,
        state: 'done',
        detail:
          adjusted && planned !== null
            ? `Evened out from ${planned} to ${goal} min`
            : `Adds up to ${goal} min`,
      };
    }
    return { ...base, state: 'warn', detail: `${sum} of ${goal} min planned. Adjust on the plan.` };
  }
  if (!actsDone) return { ...base, state: 'pending' };
  return {
    ...base,
    state: s.status === 'running' ? 'active' : 'pending',
    detail: `${partialSum} of ${target} min so far`,
  };
}

function useElapsed(startedAt: number | null, finishedAt: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [startedAt, finishedAt]);
  if (!startedAt) return '0:00';
  const secs = Math.max(0, Math.floor(((finishedAt ?? now) - startedAt) / 1000));
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
}

export function LessonGenerationProgress(props: Props) {
  const { state: s, acCount, unitCode, durationMins } = props;
  const stages = useMemo(
    () => deriveStages(s, acCount, unitCode, durationMins),
    [s, acCount, unitCode, durationMins]
  );
  const elapsed = useElapsed(s.startedAt, s.finishedAt);
  const plan = s.partialPlan;
  const cited = useMemo(
    () => new Set((s.result?.plan?.cited_facets ?? []).map((c) => c.facet_id)),
    [s.result]
  );

  return (
    <div className="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      {/* Outcome first, across the top: ready / failed / stopped. */}
      {s.status !== 'running' && (
        <div className="lg:col-span-2">
          <Outcome {...props} />
        </div>
      )}

      {/* ── Left: the rail and the sources ── */}
      <div className="space-y-6 lg:sticky lg:top-0">
        <Rail
          stages={stages}
          elapsed={elapsed}
          running={s.status === 'running'}
          onCancel={props.onCancel}
        />
        <div className="hidden lg:block">
          <Sources sources={s.sources} cited={cited} running={s.status === 'running'} />
        </div>
      </div>

      {/* ── Right: the plan, arriving ── */}
      <div className="min-w-0 space-y-5">
        <PlanHeader plan={plan} running={s.status === 'running'} />
        <Objectives plan={plan} />
        <Timeline
          plan={plan}
          duration={durationMins}
          running={s.status === 'running'}
          planComplete={s.planComplete}
        />
        <AlsoWritten plan={plan} />
        <Briefing
          headings={s.briefHeadings}
          complete={s.briefComplete}
          running={s.status === 'running'}
        />
        <div className="lg:hidden">
          <Sources sources={s.sources} cited={cited} running={s.status === 'running'} />
        </div>
      </div>
    </div>
  );
}

/* ─── Rail ────────────────────────────────────────────────────── */

function Rail({
  stages,
  elapsed,
  running,
  onCancel,
}: {
  stages: Stage[];
  elapsed: string;
  running: boolean;
  onCancel: () => void;
}) {
  const current = stages.find((x) => x.state === 'active') ?? null;
  const doneCount = stages.filter((x) => x.state === 'done' || x.state === 'warn').length;

  return (
    <section className={COLLEGE_CARD} aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {running ? 'Building your plan' : 'How it was built'}
        </h3>
        <span
          className="font-mono text-[13px] tabular-nums text-white"
          aria-label={`Elapsed ${elapsed}`}
        >
          {elapsed}
        </span>
      </div>

      {/* Phone: one line and a segmented bar. */}
      <div className="mt-4 lg:hidden">
        <div className="flex gap-1" aria-hidden>
          {stages.map((x) => (
            <span
              key={x.key}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                x.state === 'done'
                  ? 'bg-elec-yellow'
                  : x.state === 'warn'
                    ? 'bg-orange-400'
                    : x.state === 'active'
                      ? 'animate-pulse bg-white/60'
                      : 'bg-white/[0.12]'
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-[14px] font-semibold text-white">
          {current
            ? current.label
            : running
              ? 'Starting'
              : `${doneCount} of ${stages.length} steps`}
        </p>
        {current?.detail && <p className="mt-0.5 text-[12.5px] text-white">{current.detail}</p>}
      </div>

      {/* Desktop: every stage. */}
      <ol className="mt-5 hidden lg:block">
        {stages.map((x, i) => (
          <li key={x.key} className="relative flex gap-3.5 pb-5 last:pb-0">
            {i < stages.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  'absolute left-[11px] top-7 h-[calc(100%-1.5rem)] w-0.5 rounded-full',
                  x.state === 'done' ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                )}
              />
            )}
            <StageDot state={x.state} />
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  'text-[14px] leading-tight text-white',
                  x.state === 'active' && 'font-semibold'
                )}
              >
                {x.label}
              </p>
              {x.detail && (
                <p
                  className={cn(
                    'mt-1 text-[12.5px] leading-snug',
                    x.state === 'warn' ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {x.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {running && (
        <button
          type="button"
          onClick={onCancel}
          className={cn(COLLEGE_BTN, 'mt-5 hidden w-full lg:flex')}
        >
          Stop generating
        </button>
      )}
    </section>
  );
}

function StageDot({ state }: { state: StageState }) {
  if (state === 'done')
    return (
      <span className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-[12px] font-bold text-black">
        ✓
      </span>
    );
  if (state === 'warn')
    return (
      <span className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400 text-[13px] font-bold text-black">
        !
      </span>
    );
  if (state === 'active')
    return (
      <span className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-elec-yellow bg-[hsl(0_0%_8%)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-elec-yellow" />
      </span>
    );
  return (
    <span className="relative z-[1] h-6 w-6 shrink-0 rounded-full border-2 border-white/[0.2] bg-[hsl(0_0%_8%)]" />
  );
}

/* ─── Sources ─────────────────────────────────────────────────── */

function Sources({
  sources,
  cited,
  running,
}: {
  sources: StreamSource[] | null;
  cited: Set<string>;
  running: boolean;
}) {
  const groups = useMemo(() => {
    if (!sources) return [];
    return (['bs7671', 'gn3', 'osg'] as const)
      .map((d) => ({ doc: d, rows: sources.filter((x) => x.document_type === d) }))
      .filter((g) => g.rows.length > 0);
  }, [sources]);
  const showCited = cited.size > 0;

  return (
    <section className={COLLEGE_CARD}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">Regulation sources</h3>
      {!sources ? (
        <p className="mt-2 text-[13px] leading-relaxed text-white">
          {running
            ? 'Searching BS 7671, Guidance Note 3 and the On-Site Guide for these criteria.'
            : 'No sources were found.'}
        </p>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1">
          <p className="text-[12.5px] leading-snug text-white">
            {showCited
              ? 'The plan cites the sections marked Cited. The rest were read for context.'
              : 'The plan is written against these, and it can only cite these.'}
          </p>
          <div className="mt-3 space-y-4">
            {groups.map((g) => (
              <div key={g.doc}>
                <p className="text-[12.5px] font-semibold text-white">
                  {DOC_LABEL[g.doc]}{' '}
                  <span className="font-normal tabular-nums">· {g.rows.length}</span>
                </p>
                <ul className="mt-1.5 divide-y divide-white/[0.06]">
                  {g.rows.map((r) => {
                    const isCited = r.facet_ids.some((id) => cited.has(id));
                    return (
                      <li key={r.key} className="flex items-baseline gap-2.5 py-2">
                        <span className="w-14 shrink-0 font-mono text-[12px] tabular-nums text-elec-yellow">
                          {r.reg_number ?? '·'}
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-white line-clamp-2">
                          {r.topic ?? 'Untitled section'}
                        </span>
                        {showCited && isCited && (
                          <span className="shrink-0 rounded-full border border-white/[0.2] px-2 py-0.5 text-[12px] font-semibold text-white">
                            Cited
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

/* ─── The plan, arriving ──────────────────────────────────────── */

function PlanHeader({
  plan,
  running,
}: {
  plan: Partial<GeneratedLessonPlan> | null;
  running: boolean;
}) {
  const title = typeof plan?.title === 'string' ? plan.title : '';
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-medium text-white">{running ? 'Writing now' : 'The plan'}</p>
      {title ? (
        <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
          {title}
        </h3>
      ) : (
        <div
          className="mt-2 h-6 w-2/3 animate-pulse rounded-md bg-white/[0.08]"
          aria-label="Title not written yet"
        />
      )}
      {typeof plan?.audience_note === 'string' && plan.audience_note && (
        <p className="mt-2 text-[13.5px] leading-relaxed text-white">{plan.audience_note}</p>
      )}
    </div>
  );
}

function Objectives({ plan }: { plan: Partial<GeneratedLessonPlan> | null }) {
  const items = Array.isArray(plan?.learning_objectives)
    ? plan!.learning_objectives.filter((o) => o && typeof o.text === 'string' && o.text)
    : [];
  if (items.length === 0) return <Placeholder title="Learning objectives" lines={3} />;
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={COLLEGE_CARD}
    >
      <h4 className="text-[15px] font-semibold tracking-tight text-white">Learning objectives</h4>
      <ol className="mt-3 space-y-2.5">
        {items.map((o, i) => (
          <li key={i} className="flex gap-3">
            <span className="w-5 shrink-0 text-[13px] font-semibold tabular-nums text-elec-yellow">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] leading-relaxed text-white">{o.text}</p>
              {Array.isArray(o.ac_codes) && o.ac_codes.length > 0 && (
                <p className="mt-0.5 font-mono text-[12px] tabular-nums text-white">
                  AC{' '}
                  {o.ac_codes
                    .filter(Boolean)
                    .map((c) => String(c).replace(/^AC\s*/i, ''))
                    .join(', ')}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </motion.section>
  );
}

const ALSO: { key: keyof GeneratedLessonPlan; one: string; many: string }[] = [
  { key: 'analogies', one: 'analogy', many: 'analogies' },
  { key: 'misconceptions', one: 'misconception', many: 'misconceptions' },
  { key: 'board_work', one: 'board sketch', many: 'board sketches' },
  { key: 'worked_examples', one: 'worked example', many: 'worked examples' },
  { key: 'cold_call_questions', one: 'question', many: 'questions' },
  { key: 'exit_ticket', one: 'exit ticket question', many: 'exit ticket questions' },
  { key: 'vocabulary', one: 'key term', many: 'key terms' },
  { key: 'british_values', one: 'British value', many: 'British values' },
  { key: 'stretch_challenge', one: 'stretch task', many: 'stretch tasks' },
  { key: 'inclusive_practice', one: 'inclusion strategy', many: 'inclusion strategies' },
  { key: 'health_safety', one: 'safety control', many: 'safety controls' },
];

function AlsoWritten({ plan }: { plan: Partial<GeneratedLessonPlan> | null }) {
  const items = ALSO.map((a) => {
    const v = plan?.[a.key];
    const n = Array.isArray(v) ? v.length : 0;
    return n > 0 ? `${n} ${n === 1 ? a.one : a.many}` : null;
  }).filter((x): x is string => Boolean(x));
  if (plan?.homework && typeof plan.homework === 'object') items.push('Homework');
  if (items.length === 0) return null;
  return (
    <section>
      <h4 className="text-[13px] font-semibold text-white">Also written for you</h4>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((t) => (
          <motion.li
            key={t.replace(/^\d+ /, '')}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full border border-white/[0.14] bg-white/[0.04] px-3 py-1.5 text-[12.5px] tabular-nums text-white"
          >
            {t}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function Timeline({
  plan,
  duration,
  running,
  planComplete,
}: {
  plan: Partial<GeneratedLessonPlan> | null;
  duration: number;
  running: boolean;
  planComplete: boolean;
}) {
  const acts = completeActivities(plan);
  const writing =
    running &&
    !planComplete &&
    Array.isArray(plan?.activities) &&
    plan!.activities.length > acts.length;
  const total = Math.max(
    plan?.duration_mins ?? duration,
    acts.reduce((n, a) => n + a.time_mins, 0),
    1
  );
  if (acts.length === 0 && !writing)
    return <Placeholder title="Activity timeline" lines={4} bars />;

  let cursor = 0;
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={COLLEGE_CARD}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[15px] font-semibold tracking-tight text-white">Activity timeline</h4>
        <span className="text-[12.5px] tabular-nums text-white">
          {acts.reduce((n, a) => n + a.time_mins, 0)} of {total} min
        </span>
      </div>
      <ol className="mt-4 space-y-4">
        {acts.map((a, i) => {
          const from = cursor;
          cursor += a.time_mins;
          return (
            <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-baseline gap-3">
                <span className="w-[68px] shrink-0 font-mono text-[12px] tabular-nums text-white">
                  {from}–{from + a.time_mins}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold leading-snug text-white">{a.title}</p>
                  <p className="mt-0.5 text-[12px] text-white">
                    {PHASE_LABEL[a.phase] ?? a.phase} · {a.time_mins} min
                  </p>
                </div>
              </div>
              {/* Where this sits in the session: offset and width in minutes. */}
              <div
                className="ml-[80px] mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
                aria-hidden
              >
                <div
                  className="h-full rounded-full bg-elec-yellow"
                  style={{
                    marginLeft: `${(from / total) * 100}%`,
                    width: `${(a.time_mins / total) * 100}%`,
                  }}
                />
              </div>
              {Array.isArray(a.resources_needed) && a.resources_needed.length > 0 && (
                <p className="ml-[80px] mt-2 text-[12px] leading-snug text-white">
                  <span className="font-semibold">Needs:</span> {a.resources_needed.join('; ')}
                </p>
              )}
            </motion.li>
          );
        })}
        {writing && (
          <li className="flex items-center gap-3">
            <span className="w-[68px] shrink-0 font-mono text-[12px] tabular-nums text-white">
              {cursor}–
            </span>
            <span
              className="h-4 flex-1 animate-pulse rounded-md bg-white/[0.08]"
              aria-label="Writing the next activity"
            />
          </li>
        )}
      </ol>
    </motion.section>
  );
}

function Briefing({
  headings,
  complete,
  running,
}: {
  headings: string[];
  complete: boolean;
  running: boolean;
}) {
  if (headings.length === 0 && !running) return null;
  return (
    <section className={COLLEGE_CARD}>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[15px] font-semibold tracking-tight text-white">Tutor's briefing</h4>
        <span className="text-[12.5px] text-white">
          {complete ? 'Written' : running ? 'Writing' : 'Incomplete'}
        </span>
      </div>
      <p className="mt-1 text-[12.5px] leading-snug text-white">
        How to teach it: the approach, analogies, misconceptions and a worked example.
      </p>
      {headings.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {headings.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-baseline gap-2 text-[13px] text-white"
            >
              <span className="text-elec-yellow" aria-hidden>
                {complete || i < headings.length - 1 ? '✓' : '·'}
              </span>
              {h}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Placeholder({ title, lines, bars }: { title: string; lines: number; bars?: boolean }) {
  return (
    <section className={COLLEGE_CARD}>
      <h4 className="text-[15px] font-semibold tracking-tight text-white">{title}</h4>
      <div className="mt-3 space-y-2.5" aria-hidden>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {bars && <span className="h-3 w-[56px] shrink-0 rounded bg-white/[0.06]" />}
            <span className="h-3 rounded bg-white/[0.06]" style={{ width: `${90 - i * 12}%` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Outcome ─────────────────────────────────────────────────── */

function Outcome({
  state: s,
  durationMins,
  onRetry,
  onBack,
  onOpenPlan,
  onBuildSlides,
  onSchedule,
  scheduled,
}: Props) {
  if (s.status === 'error') {
    return (
      <section className={cn(COLLEGE_CARD, 'sm:border-orange-400/40')} role="alert">
        <h3 className="text-[17px] font-semibold tracking-tight text-white">
          The plan could not be finished
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
          {friendlyGenerationError(s.error ?? '')}
        </p>
        <details className="mt-2">
          <summary className="inline-flex h-11 cursor-pointer items-center text-[12.5px] font-semibold text-white touch-manipulation">
            Technical detail
          </summary>
          <p className="break-words font-mono text-[12px] text-white">{s.error}</p>
        </details>
        <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={onRetry} className={COLLEGE_BTN_PRIMARY}>
            Try again
          </button>
          <button type="button" onClick={onBack} className={COLLEGE_BTN}>
            Change the settings
          </button>
        </div>
      </section>
    );
  }
  if (s.status === 'cancelled') {
    return (
      <section className={COLLEGE_CARD}>
        <h3 className="text-[17px] font-semibold tracking-tight text-white">Generation stopped</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
          You stopped it before it finished. Start again with the same settings, or change them
          first.
        </p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={onRetry} className={COLLEGE_BTN_PRIMARY}>
            Start again
          </button>
          <button type="button" onClick={onBack} className={COLLEGE_BTN}>
            Change the settings
          </button>
        </div>
      </section>
    );
  }
  if (s.status !== 'done' || !s.result) return null;

  const plan = s.result.plan;
  const id = s.result.lesson_plan_id;
  const acts = completeActivities(plan);
  const sum = acts.reduce((n, a) => n + a.time_mins, 0);
  const target = plan.duration_mins ?? durationMins;
  // Count sections, not facets: one section can arrive as several facets.
  const citedIds = new Set((plan.cited_facets ?? []).map((c) => c.facet_id));
  const citedCount = s.sources
    ? s.sources.filter((x) => x.facet_ids.some((f) => citedIds.has(f))).length
    : citedIds.size;
  const facts = [
    {
      label: 'Length',
      value: `${target} min`,
      warn: sum !== target,
      sub: sum !== target ? `Activities total ${sum} min` : 'Timings add up',
    },
    { label: 'Objectives', value: String(plan.learning_objectives?.length ?? 0) },
    { label: 'Activities', value: String(acts.length) },
    { label: 'Sources cited', value: String(citedCount) },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={COLLEGE_CARD}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-white">
            {id ? 'Saved as a draft' : 'Written but not saved'}
          </p>
          <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
            {plan.title}
          </h3>
          {!id && (
            <p className="mt-1.5 text-[13px] text-orange-300">
              Saving failed{s.result.save_error ? `: ${s.result.save_error}` : ''}. Try again to
              save a copy.
            </p>
          )}
        </div>
        {id ? (
          <div className="grid shrink-0 grid-cols-1 gap-2.5 sm:grid-cols-3">
            <button type="button" onClick={onOpenPlan} className={COLLEGE_BTN_PRIMARY}>
              Open the plan
            </button>
            <button type="button" onClick={onBuildSlides} className={COLLEGE_BTN}>
              Build slides
            </button>
            <button type="button" onClick={onSchedule} className={COLLEGE_BTN} disabled={scheduled}>
              {scheduled ? 'Scheduled' : 'Schedule it'}
            </button>
          </div>
        ) : (
          <button type="button" onClick={onRetry} className={COLLEGE_BTN_PRIMARY}>
            Try again
          </button>
        )}
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/[0.08] pt-4 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[12px] font-medium text-white">{f.label}</dt>
            <dd
              className={cn(
                'mt-1 text-[22px] font-bold leading-none tabular-nums',
                f.warn ? 'text-orange-400' : 'text-white'
              )}
            >
              {f.value}
            </dd>
            {f.sub && <dd className="mt-1 text-[12px] text-white">{f.sub}</dd>}
          </div>
        ))}
      </dl>
    </motion.section>
  );
}
