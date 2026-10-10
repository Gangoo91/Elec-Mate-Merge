import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { FormSheet } from '@/components/forms/FormSheet';
import { LessonGeneratorDialog } from '@/components/college/dialogs/LessonGeneratorDialog';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import { COLLEGE_CARD, COLLEGE_LINK } from '@/components/college/ui/CollegeUi';
import {
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TeachingEmpty,
  plural,
} from '@/components/college/teaching/TeachingKit';
import type { AcRow } from '@/hooks/useCurriculum';
import {
  BUCKETS,
  BUCKET_FILL,
  BUCKET_LABEL,
  STATE_WORDS,
  bucketOf,
  summariseUnit,
  useCohortCriteriaGaps,
  weakestFirst,
  type CohortCriteriaGaps,
  type GapBucket,
  type GapCriterion,
  type GapQualification,
  type GapUnit,
  type UnitSummary,
} from '@/hooks/college/useCohortCriteriaGaps';

/* ==========================================================================
   Criteria gaps (8 Oct 2026): which criteria a class is weakest on, and one
   tap from there to a lesson that covers them.

   - gapsHeadline: the one sentence ("12 criteria nobody in L2 Electrical
     2025-A has started. Unit 202 is the weakest.")
   - CriteriaGapsView: units weakest first, each opening to its criteria with
     a stacked bar and words; tick criteria and "Plan a lesson for these"
     opens the lesson composer (LessonGeneratorDialog) with them and the
     cohort already picked; tap a criterion for who is where.
   - CriteriaGapsCard: the compact "Where your classes are weakest" card for
     the Curriculum hub and a cohort.
   Data: useCohortCriteriaGaps (get_cohort_criteria_gaps on the server, which
   reads get_portfolio_ac_state for every learner).
   ========================================================================== */

/** Every unit of every qualification in the group, weakest first. */
export function unitSummaries(d: CohortCriteriaGaps | undefined) {
  if (!d) return [] as { q: GapQualification; s: UnitSummary }[];
  return d.qualifications
    .flatMap((q) => q.units.map((u) => ({ q, s: summariseUnit(u, q.learners.length) })))
    .sort((a, b) => weakestFirst(a.s, b.s));
}

const pct = (x: number) => Math.round(x * 100);

/** "Unit 202" for a numeric code, the code alone otherwise. */
export const unitName = (code: string) => (/^\d/.test(code) ? `Unit ${code}` : code);

export function gapsHeadline(d: CohortCriteriaGaps | undefined, label: string): string {
  if (!d) return '';
  const learners = d.qualifications.reduce((n, q) => n + q.learners.length, 0);
  if (learners === 0) {
    if (d.hidden > 0) return `You cannot see the criteria of the learners in ${label}.`;
    return `No learners in ${label} are on a qualification with criteria yet.`;
  }
  const units = unitSummaries(d);
  const untouched = units.reduce((n, u) => n + u.s.untouched, 0);
  const weakest = units[0];
  const head =
    untouched === 0
      ? `Every criterion has been started by someone in ${label}.`
      : `${plural(untouched, 'criterion', 'criteria')} nobody in ${label} has started.`;
  return weakest
    ? `${head} ${unitName(weakest.s.unit.unit_code)} is the weakest, ${pct(weakest.s.passedShare)}% passed.`
    : head;
}

/* ── Bars and words ───────────────────────────────────────────────────── */

type Counts = Record<GapBucket, number>;

function countsOf(c: GapCriterion): Counts {
  return {
    passed: c.passed,
    with_assessor: c.with_assessor,
    sent_back: c.sent_back,
    claimed: c.claimed,
    nothing: c.nothing,
  };
}

function unitCounts(u: GapUnit): Counts {
  const t: Counts = { passed: 0, with_assessor: 0, sent_back: 0, claimed: 0, nothing: 0 };
  for (const c of u.criteria) for (const b of BUCKETS) t[b] += c[b];
  return t;
}

export function StackedBar({ counts, className }: { counts: Counts; className?: string }) {
  const total = BUCKETS.reduce((n, b) => n + counts[b], 0);
  return (
    <span
      className={cn('flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]', className)}
      role="img"
      aria-label={BUCKETS.filter((b) => counts[b] > 0)
        .map((b) => `${BUCKET_LABEL[b]} ${counts[b]}`)
        .join(', ')}
    >
      {total > 0 &&
        BUCKETS.map((b) =>
          counts[b] > 0 ? (
            <span
              key={b}
              className={cn('h-full', BUCKET_FILL[b])}
              style={{ width: `${(counts[b] / total) * 100}%` }}
            />
          ) : null
        )}
    </span>
  );
}

/** The words under a criterion: the gap first, then the rest. */
function criterionWords(c: GapCriterion, n: number): { lead: string; rest: string } {
  const lead =
    c.passed === n
      ? `All ${n} passed`
      : c.nothing > 0
        ? `${c.nothing} of ${n} ${c.nothing === 1 ? 'has' : 'have'} nothing yet`
        : `${c.passed} of ${n} passed`;
  const rest = [
    c.nothing > 0 && c.passed > 0 ? `${c.passed} passed` : null,
    c.with_assessor > 0 ? `${c.with_assessor} with the assessor` : null,
    c.sent_back > 0 ? `${c.sent_back} sent back` : null,
    c.claimed > 0 ? `${c.claimed} claimed` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return { lead, rest };
}

export function GapsLegend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
      {BUCKETS.map((b) => (
        <li key={b} className="flex items-center gap-1.5 text-[12px] text-white">
          <span className={cn('h-2.5 w-2.5 rounded-full', BUCKET_FILL[b])} aria-hidden />
          {BUCKET_LABEL[b]}
        </li>
      ))}
    </ul>
  );
}

/* ── The full view ────────────────────────────────────────────────────── */

interface Selection {
  q: GapQualification;
  unit: GapUnit;
  codes: Set<string>;
}

export function CriteriaGapsView({
  data,
  cohortId,
}: {
  data: CohortCriteriaGaps;
  /** The cohort the lesson is for; null when the view covers several. */
  cohortId: string | null;
}) {
  const units = useMemo(() => unitSummaries(data), [data]);
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(units[0] ? [`${units[0].q.code}|${units[0].s.unit.unit_code}`] : [])
  );
  const [sel, setSel] = useState<Selection | null>(null);
  const [who, setWho] = useState<{ q: GapQualification; unit: GapUnit; c: GapCriterion } | null>(
    null
  );
  const [gen, setGen] = useState<{ key: number; sel: Selection } | null>(null);
  const [quizFor, setQuizFor] = useState<Selection | null>(null);

  const toggleOpen = (key: string) =>
    setOpen((o) => {
      const n = new Set(o);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });

  // A lesson covers one unit, so ticking a criterion in another unit starts a
  // new selection there.
  const toggleAc = (q: GapQualification, unit: GapUnit, code: string) =>
    setSel((s) => {
      const same = s && s.q.code === q.code && s.unit.unit_code === unit.unit_code;
      const codes = new Set(same ? s.codes : []);
      if (codes.has(code)) codes.delete(code);
      else codes.add(code);
      return codes.size === 0 ? null : { q, unit, codes };
    });

  const toAc = (q: GapQualification, unit: GapUnit, c: GapCriterion): AcRow => ({
    qualification_code: q.code,
    unit_code: unit.unit_code,
    ac_code: c.ac_code,
    ac_text: c.ac_text,
    lo_number: c.lo_number,
    lo_text: c.lo_text,
  });

  const multiQual = data.qualifications.length > 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <GapsLegend />
        <p className="text-[12.5px] text-white">
          Weakest unit first. Tick criteria to plan a lesson.
        </p>
      </div>

      <ul className="space-y-3" data-testid="gaps-units">
        {units.map(({ q, s }) => {
          const key = `${q.code}|${s.unit.unit_code}`;
          const isOpen = open.has(key);
          const n = q.learners.length;
          return (
            <motion.li
              key={key}
              variants={itemVariants}
              className={cn(COLLEGE_CARD, '!p-0')}
              data-testid="gaps-unit"
              data-unit={s.unit.unit_code}
            >
              <button
                type="button"
                onClick={() => toggleOpen(key)}
                aria-expanded={isOpen}
                className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-semibold leading-snug text-white">
                    {unitName(s.unit.unit_code)}
                    {s.unit.unit_title ? (
                      <span className="font-normal"> · {s.unit.unit_title}</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                    {pct(s.passedShare)}% passed
                    {s.untouched > 0
                      ? ` · ${plural(s.untouched, 'criterion', 'criteria')} nobody has started`
                      : ''}
                    {` · ${plural(s.criteria, 'criterion', 'criteria')}`}
                    {multiQual ? ` · ${q.code}` : ''}
                  </span>
                  <StackedBar counts={unitCounts(s.unit)} className="mt-2" />
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-white transition-transform',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
                  {s.unit.criteria.map((c) => {
                    const checked =
                      !!sel &&
                      sel.q.code === q.code &&
                      sel.unit.unit_code === s.unit.unit_code &&
                      sel.codes.has(c.ac_code);
                    const words = criterionWords(c, n);
                    return (
                      <li
                        key={c.ac_code}
                        className="flex items-stretch gap-1 pl-1 pr-2 sm:pl-3 sm:pr-4"
                        data-testid="gaps-criterion"
                        data-ac={c.ac_code}
                      >
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          aria-label={`Select ${c.ac_code}`}
                          onClick={() => toggleAc(q, s.unit, c.ac_code)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center self-center touch-manipulation"
                        >
                          <span
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded-md border',
                              checked ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.35]'
                            )}
                          >
                            {checked && <Check className="h-3.5 w-3.5 text-black" aria-hidden />}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWho({ q, unit: s.unit, c })}
                          className="flex min-h-[64px] min-w-0 flex-1 items-center gap-3 py-2.5 text-left touch-manipulation hover:bg-white/[0.03]"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="flex gap-2 text-[13.5px] leading-snug text-white">
                              <span className="shrink-0 font-mono font-semibold tabular-nums">
                                {c.ac_code}
                              </span>
                              <span className="min-w-0 break-words">{c.ac_text}</span>
                            </span>
                            <span className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                              <StackedBar counts={countsOf(c)} className="sm:max-w-[220px]" />
                              <span
                                className="shrink-0 text-[12.5px] text-white"
                                data-testid="gaps-words"
                              >
                                <span
                                  className={cn(
                                    'font-semibold',
                                    c.nothing === n && n > 0 && 'text-orange-400'
                                  )}
                                >
                                  {words.lead}
                                </span>
                                {words.rest ? ` · ${words.rest}` : ''}
                              </span>
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.li>
          );
        })}
      </ul>

      {sel && (
        <div className="sticky bottom-3 z-20 -mx-4 sm:mx-0">
          <div className="mx-auto flex max-w-3xl flex-col gap-2 rounded-none border-y border-white/[0.12] bg-background px-4 py-3 shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border">
            <p className="text-[13.5px] text-white" data-testid="gaps-selection">
              {plural(sel.codes.size, 'criterion', 'criteria')} from {unitName(sel.unit.unit_code)}{' '}
              selected.{' '}
              <button
                type="button"
                onClick={() => setSel(null)}
                className="inline-flex h-11 items-center px-1 font-semibold text-white underline underline-offset-2 touch-manipulation"
              >
                Clear
              </button>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* ELE-1905: a quiz on the gap, drafted for the cohort. It stays a
                  draft until the tutor sets a due date and publishes, which
                  assigns it and pushes every learner. */}
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/[0.18] px-5 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.06] sm:w-auto"
                onClick={() => setQuizFor(sel)}
              >
                Set a quiz for these
              </button>
              <button
                type="button"
                className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
                onClick={() => setGen((g) => ({ key: (g?.key ?? 0) + 1, sel }))}
              >
                Plan a lesson for these
              </button>
            </div>
          </div>
        </div>
      )}

      <CriterionLearnersSheet who={who} onClose={() => setWho(null)} />

      {quizFor && (
        <CreateQuizSheet
          key={`${quizFor.unit.unit_code}|${[...quizFor.codes].join(',')}`}
          open
          onOpenChange={(v) => {
            if (!v) setQuizFor(null);
          }}
          cohortId={cohortId ?? (data.cohorts.length === 1 ? data.cohorts[0].id : null)}
          initialAcCodes={[...quizFor.codes].map((c) => `${quizFor.unit.unit_code}:${c}`)}
          initialTopic={quizFor.unit.unit_title ?? unitName(quizFor.unit.unit_code)}
        />
      )}

      {gen && (
        <LessonGeneratorDialog
          key={gen.key}
          open
          onOpenChange={(v) => {
            if (!v) setGen(null);
          }}
          qualificationCode={gen.sel.q.code}
          qualificationTitle={gen.sel.q.title ?? gen.sel.q.code}
          unitCode={gen.sel.unit.unit_code}
          unitTitle={gen.sel.unit.unit_title}
          initialAcs={gen.sel.unit.criteria
            .filter((c) => gen.sel.codes.has(c.ac_code))
            .map((c) => toAc(gen.sel.q, gen.sel.unit, c))}
          availableAcs={gen.sel.unit.criteria.map((c) => toAc(gen.sel.q, gen.sel.unit, c))}
          cohortId={cohortId ?? (data.cohorts.length === 1 ? data.cohorts[0].id : null)}
        />
      )}
    </div>
  );
}

/* ── Who is where on one criterion ────────────────────────────────────── */

function CriterionLearnersSheet({
  who,
  onClose,
}: {
  who: { q: GapQualification; unit: GapUnit; c: GapCriterion } | null;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const groups = useMemo(() => {
    if (!who) return [];
    const by = new Map<GapBucket, { name: string; roll_id: string; state: string }[]>();
    who.q.learners.forEach((l, i) => {
      const state = who.c.states[i] ?? 'not_started';
      const b = bucketOf(state);
      const list = by.get(b) ?? [];
      list.push({ name: l.name, roll_id: l.roll_id, state });
      by.set(b, list);
    });
    // The gap first: nothing yet, sent back, claimed, with the assessor, passed.
    const order: GapBucket[] = ['nothing', 'sent_back', 'claimed', 'with_assessor', 'passed'];
    return order.filter((b) => by.has(b)).map((b) => ({ b, rows: by.get(b)! }));
  }, [who]);

  return (
    <FormSheet
      open={!!who}
      onOpenChange={(v) => !v && onClose()}
      width="wide"
      eyebrow={who ? `${unitName(who.unit.unit_code)} · ${who.c.ac_code}` : undefined}
      title={who ? who.c.ac_text : ''}
      description={
        who
          ? criterionWords(who.c, who.q.learners.length).lead + '. Tap a learner for their profile.'
          : undefined
      }
      bodyClassName="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
    >
      {groups.map(({ b, rows }) => (
        <section key={b} className="min-w-0 space-y-2">
          <h3 className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
            <span className={cn('h-2.5 w-2.5 rounded-full', BUCKET_FILL[b])} aria-hidden />
            {BUCKET_LABEL[b]} ({rows.length})
          </h3>
          <ul className={cn(TEACH_LIST, 'sm:mx-0')} data-testid="gaps-learners">
            {rows.map((r) => (
              <li key={r.roll_id}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate(
                      `/college?section=student360&studentId=${encodeURIComponent(r.roll_id)}`
                    );
                  }}
                  className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.04]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] leading-snug font-semibold text-white">
                      {r.name}
                    </span>
                    <span className="block text-[12.5px] text-white">
                      {STATE_WORDS[r.state] ?? r.state}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </FormSheet>
  );
}

/* ── The compact card ─────────────────────────────────────────────────── */

/**
 * "Where your classes are weakest": the sentence and the three weakest units,
 * linking to the full section. cohortId null = every cohort you teach.
 */
export function CriteriaGapsCard({
  cohortId = null,
  label,
  title = 'Where your classes are weakest',
}: {
  cohortId?: string | null;
  /** The class in the sentence; defaults to the cohort's name or "your cohorts". */
  label?: string;
  title?: string;
}) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCohortCriteriaGaps(cohortId);
  const units = useMemo(() => unitSummaries(data).slice(0, 3), [data]);
  const href = `/college?section=criteriagaps${cohortId ? `&cohortId=${encodeURIComponent(cohortId)}` : ''}`;
  const noCohorts = !!data && data.cohorts.length === 0;

  if (noCohorts) {
    return (
      <TeachingEmpty
        title={title}
        body="You are not the tutor on a cohort yet. Open criteria gaps to look at any cohort."
        action={
          <button type="button" className={COLLEGE_LINK} onClick={() => navigate(href)}>
            Open criteria gaps
          </button>
        }
      />
    );
  }

  return (
    <motion.section variants={itemVariants} className={COLLEGE_CARD} data-testid="gaps-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-1 text-[13.5px] leading-snug text-white">
            {isLoading
              ? 'Reading every learner’s criteria…'
              : error
                ? 'Could not read the criteria just now.'
                : gapsHeadline(
                    data,
                    label ?? (data?.cohorts.length === 1 ? data.cohorts[0].name : 'your cohorts')
                  )}
          </p>
        </div>
      </div>
      {units.length > 0 && (
        <ul className="mt-4 space-y-3">
          {units.map(({ q, s }) => (
            <li key={`${q.code}|${s.unit.unit_code}`} className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 text-[13.5px] leading-snug font-semibold text-white">
                  {unitName(s.unit.unit_code)}
                  {s.unit.unit_title ? (
                    <span className="font-normal"> · {s.unit.unit_title}</span>
                  ) : null}
                </span>
                <span className="shrink-0 text-[12.5px] tabular-nums text-white">
                  {pct(s.passedShare)}% passed
                </span>
              </div>
              <StackedBar counts={unitCounts(s.unit)} className="mt-1.5" />
            </li>
          ))}
        </ul>
      )}
      <button type="button" className={cn(COLLEGE_LINK, 'mt-2')} onClick={() => navigate(href)}>
        See every criterion
      </button>
    </motion.section>
  );
}
