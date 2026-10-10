import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Copy, Search } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { LessonGeneratorDialog } from '@/components/college/dialogs/LessonGeneratorDialog';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import {
  useQualificationUnits,
  useQualifications,
  useUnitDetail,
  type AcRow,
} from '@/hooks/useCurriculum';
import { supabase } from '@/integrations/supabase/client';
import { duplicateLessonPlan } from '@/lib/lessons/duplicateLessonPlan';
import { cn } from '@/lib/utils';

/* ==========================================================================
   StartLessonPlanSheet (7 Oct 2026) — the lesson plan composer.

   "New plan" used to send a tutor to the qualifications catalogue, three
   screens deep, before anything happened. This sheet asks the same things in
   two steps, then hands over to the existing LessonGeneratorDialog ("Shape
   the session"), which starts the generation:

     1 Who and what   the cohort (optional), its qualification, the unit
     2 Criteria       grouped by learning outcome, each saying where it
                      stands for the cohort, with a live "Your lesson" panel
                      (CriteriaPicker, below)

   A third way in: duplicate a past plan (same copy as the plan page's
   Duplicate). There is no blank-plan path: a plan row with no content has
   nothing to edit, so the composer does not offer one.

   Data: the curriculum browser's hooks (useQualifications /
   useQualificationUnits / useUnitDetail) and lesson_plan_ac_mapping for what
   a cohort's plans already cover.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Preselect a cohort (e.g. the list's cohort filter). */
  initialCohortId?: string | null;
}

interface Handover {
  qualificationCode: string;
  qualificationTitle: string;
  unitCode: string;
  unitTitle: string | null;
  initialAcs: AcRow[];
  availableAcs: AcRow[];
  cohortId: string | null;
}

type Step = 'pick' | 'criteria' | 'duplicate';

export function StartLessonPlanSheet({ open, onOpenChange, initialCohortId = null }: Props) {
  const [handover, setHandover] = useState<Handover | null>(null);
  const [genKey, setGenKey] = useState(0);

  return (
    <>
      {/* Mounted only while open so the catalogue is fetched on demand and
          every opening starts on step 1. */}
      {open && (
        <Composer
          open={open}
          onOpenChange={onOpenChange}
          initialCohortId={initialCohortId}
          onNext={(h) => {
            setHandover(h);
            setGenKey((k) => k + 1);
            onOpenChange(false);
          }}
        />
      )}

      {handover && (
        // Keyed so the dialog's selected criteria and cohort, which it reads
        // once on mount, start from this choice every time.
        <LessonGeneratorDialog
          key={genKey}
          open={Boolean(handover)}
          onOpenChange={(v) => {
            if (!v) setHandover(null);
          }}
          qualificationCode={handover.qualificationCode}
          qualificationTitle={handover.qualificationTitle}
          unitCode={handover.unitCode}
          unitTitle={handover.unitTitle}
          initialAcs={handover.initialAcs}
          availableAcs={handover.availableAcs}
          cohortId={handover.cohortId}
        />
      )}
    </>
  );
}

/* ── Surfaces ─────────────────────────────────────────────────────────── */

const TILE =
  'relative w-full overflow-hidden card-surface-interactive rounded-2xl p-4 text-left transition-colors touch-manipulation';
const TILE_ON = '!border-elec-yellow';
const H3 = 'text-[15px] font-semibold tracking-tight text-white';
const HINT = 'mt-0.5 text-[13px] leading-snug text-white';
const BTN =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] disabled:opacity-50';
const BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13.5px] font-bold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-8 pr-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';

function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={SEARCH}
      />
    </div>
  );
}

function Tick({ on, square }: { on: boolean; square?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center border',
        square ? 'rounded-md' : 'rounded-full',
        on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3]'
      )}
    >
      {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </span>
  );
}

const fmtDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

/** The catalogue stores "Level 3" on some rows and "3" on others. */
const levelLabel = (l: string) => (/^level/i.test(l.trim()) ? l.trim() : `Level ${l}`);

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/* ── Composer ─────────────────────────────────────────────────────────── */

function Composer({
  open,
  onOpenChange,
  initialCohortId,
  onNext,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCohortId: string | null;
  onNext: (h: Handover) => void;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { cohorts, courses, students, lessonPlans } = useCollegeSupabase();
  const { data: qualifications, loading: qualsLoading } = useQualifications();

  const [step, setStep] = useState<Step>('pick');
  // Each step opens at its top, not where the last one was scrolled to.
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [step]);
  const [cohortId, setCohortId] = useState<string | null>(initialCohortId);
  const [qualCode, setQualCode] = useState<string | null>(null);
  const [qualPicked, setQualPicked] = useState(false);
  const [changingQual, setChangingQual] = useState(false);
  const [qualSearch, setQualSearch] = useState('');
  const [unitCode, setUnitCode] = useState<string | null>(null);
  const [unitSearch, setUnitSearch] = useState('');
  const [acs, setAcs] = useState<Set<string>>(new Set());
  const [dupSearch, setDupSearch] = useState('');
  const [duplicating, setDuplicating] = useState<string | null>(null);

  const today = todayIso();

  /* Cohorts, with what a tutor recognises them by. */
  const cohortCards = useMemo(
    () =>
      cohorts
        .filter((c) => (c.status ?? '').toLowerCase() !== 'archived')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => {
          const course = courses.find((co) => co.id === c.course_id);
          const learners = students.filter((s) => s.cohort_id === c.id).length;
          const nextLesson = lessonPlans
            .filter((l) => l.cohort_id === c.id && l.scheduled_date && l.scheduled_date >= today)
            .map((l) => l.scheduled_date as string)
            .sort()[0];
          return {
            id: c.id,
            name: c.name,
            course: course?.name ?? null,
            learners,
            next: nextLesson ?? null,
          };
        }),
    [cohorts, courses, students, lessonPlans, today]
  );

  /** The qualification a cohort's course delivers, when the catalogue has it. */
  const qualForCohort = (id: string | null): string | null => {
    if (!id) return null;
    const cohort = cohorts.find((c) => c.id === id);
    const course = courses.find((c) => c.id === cohort?.course_id);
    if (!course) return null;
    const byId = qualifications.find((q) => q.id === course.qualification_id);
    if (byId) return byId.code;
    return qualifications.find((q) => q.code === course.code)?.code ?? null;
  };
  const cohortQual = qualForCohort(cohortId);

  // Follow the cohort's qualification until the tutor picks one by hand.
  useEffect(() => {
    if (qualPicked) return;
    if (cohortQual && cohortQual !== qualCode) {
      setQualCode(cohortQual);
      setUnitCode(null);
      setAcs(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cohortQual, qualPicked]);

  const qual = qualifications.find((q) => q.code === qualCode) ?? null;
  const { data: units, loading: unitsLoading } = useQualificationUnits(qualCode);
  const unit = units.find((u) => u.unit_code === unitCode) ?? null;
  const { data: los, loading: losLoading } = useUnitDetail(qualCode, unitCode);
  const allAcs = useMemo(() => los.flatMap((lo) => lo.acs), [los]);

  /* What this cohort's plans already cover, per unit: planned and taught. */
  const cohortPlans = useMemo(
    () =>
      cohortId
        ? lessonPlans.filter(
            (l) => l.cohort_id === cohortId && (l.status ?? '').toLowerCase() !== 'archived'
          )
        : [],
    [lessonPlans, cohortId]
  );
  const [coverage, setCoverage] = useState<
    Map<string, { planned: Set<string>; taught: Set<string> }>
  >(new Map());
  /** "unit|ac" → the most recent plan for this cohort that covers it. */
  const [acHistory, setAcHistory] = useState<
    Map<string, { title: string; date: string | null; delivered: boolean }>
  >(new Map());
  useEffect(() => {
    if (!qualCode || cohortPlans.length === 0) {
      setCoverage(new Map());
      setAcHistory(new Map());
      return;
    }
    let cancelled = false;
    const delivered = new Set(
      cohortPlans.filter((l) => (l.status ?? '').toLowerCase() === 'delivered').map((l) => l.id)
    );
    supabase
      .from('lesson_plan_ac_mapping')
      .select('lesson_plan_id, unit_code, ac_code')
      .eq('qualification_code', qualCode)
      .in(
        'lesson_plan_id',
        cohortPlans.map((l) => l.id)
      )
      .then(({ data }) => {
        if (cancelled) return;
        const map = new Map<string, { planned: Set<string>; taught: Set<string> }>();
        const hist = new Map<string, { title: string; date: string | null; delivered: boolean }>();
        const planById = new Map(cohortPlans.map((l) => [l.id, l]));
        for (const r of (data ?? []) as Array<{
          lesson_plan_id: string;
          unit_code: string;
          ac_code: string;
        }>) {
          const e = map.get(r.unit_code) ?? {
            planned: new Set<string>(),
            taught: new Set<string>(),
          };
          e.planned.add(r.ac_code);
          if (delivered.has(r.lesson_plan_id)) e.taught.add(r.ac_code);
          map.set(r.unit_code, e);
          const plan = planById.get(r.lesson_plan_id);
          if (plan) {
            const key = `${r.unit_code}|${r.ac_code}`;
            const prev = hist.get(key);
            const date = plan.scheduled_date ?? null;
            const isDelivered = delivered.has(r.lesson_plan_id);
            // Prefer a delivered plan, then the latest dated one.
            if (
              !prev ||
              (isDelivered && !prev.delivered) ||
              (isDelivered === prev.delivered && (date ?? '') > (prev.date ?? ''))
            ) {
              hist.set(key, { title: plan.title, date, delivered: isDelivered });
            }
          }
        }
        setCoverage(map);
        setAcHistory(hist);
      });
    return () => {
      cancelled = true;
    };
  }, [qualCode, cohortPlans]);

  const unitCover = unitCode ? coverage.get(unitCode) : undefined;
  const uncovered = useMemo(
    () => allAcs.filter((a) => !unitCover?.planned.has(a.ac_code)).map((a) => a.ac_code),
    [allAcs, unitCover]
  );

  /* ── Choices ── */

  const pickCohort = (id: string | null) => {
    setCohortId(id);
    if (!qualPicked) setChangingQual(false);
  };
  const pickQual = (code: string) => {
    setQualPicked(true);
    setChangingQual(false);
    setQualCode(code);
    setUnitCode(null);
    setAcs(new Set());
  };
  const pickUnit = (code: string) => {
    setUnitCode(code);
    setAcs(new Set());
  };
  const toggleAc = (code: string) => {
    setAcs((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };
  const toggleLo = (codes: string[]) => {
    setAcs((prev) => {
      const next = new Set(prev);
      const all = codes.every((c) => next.has(c));
      codes.forEach((c) => (all ? next.delete(c) : next.add(c)));
      return next;
    });
  };

  const handover = () => {
    if (!qual || !unit) return;
    const chosen = allAcs.filter((a) => acs.has(a.ac_code));
    onNext({
      qualificationCode: qual.code,
      qualificationTitle: qual.title,
      unitCode: unit.unit_code,
      unitTitle: unit.unit_title,
      initialAcs: chosen,
      availableAcs: allAcs,
      cohortId,
    });
  };

  const duplicateFrom = async (id: string, title: string) => {
    setDuplicating(id);
    try {
      const newId = await duplicateLessonPlan(id, {
        title: `${title} (copy)`,
        ...(cohortId ? { cohort_id: cohortId } : null),
        scheduled_date: null,
        scheduled_start_time: null,
        scheduled_room: null,
      });
      void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({
        title: 'Plan duplicated',
        description: 'Opening the copy. It is a draft with no date yet.',
      });
      onOpenChange(false);
      navigate(`/college/lessons/${newId}`);
    } catch (e) {
      toast({
        title: 'Duplicate failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setDuplicating(null);
    }
  };

  /* ── Filtering ── */

  const qualList = useMemo(() => {
    const q = qualSearch.trim().toLowerCase();
    return q
      ? qualifications.filter((x) =>
          `${x.code} ${x.title} ${x.awarding_body} level ${x.level}`.toLowerCase().includes(q)
        )
      : qualifications;
  }, [qualifications, qualSearch]);
  const unitList = useMemo(() => {
    const q = unitSearch.trim().toLowerCase();
    return q
      ? units.filter((u) => `${u.unit_code} ${u.unit_title ?? ''}`.toLowerCase().includes(q))
      : units;
  }, [units, unitSearch]);
  const pastPlans = useMemo(() => {
    const q = dupSearch.trim().toLowerCase();
    return (
      [...lessonPlans]
        // The list read carries has_content, not the body itself (ELE-1912).
        .filter((l) => l.has_content ?? !!l.content)
        .filter((l) => (q ? l.title.toLowerCase().includes(q) : true))
        .sort((a, b) =>
          (b.scheduled_date ?? b.created_at ?? '').localeCompare(
            a.scheduled_date ?? a.created_at ?? ''
          )
        )
        .slice(0, 60)
    );
  }, [lessonPlans, dupSearch]);

  const cohortName = cohorts.find((c) => c.id === cohortId)?.name ?? null;
  const showQualList = !qual || changingQual;

  /* ── Header strip and footer ── */

  const STEPS: Array<{ id: Step | 'shape'; label: string }> = [
    { id: 'pick', label: 'Who and what' },
    { id: 'criteria', label: 'Criteria' },
    { id: 'shape', label: 'Shape the session' },
  ];
  const stepIndex = step === 'criteria' ? 1 : 0;

  const progress =
    step === 'duplicate' ? (
      <div className="flex min-h-11 items-center py-2 text-[13px] font-semibold text-white">
        Start from a past plan
      </div>
    ) : (
      <ol className="flex gap-2 py-3">
        {STEPS.map((s, i) => (
          <li key={s.id} className="min-w-0 flex-1">
            <span
              className={cn(
                'block h-1 rounded-full',
                i <= stepIndex ? 'bg-elec-yellow' : 'bg-white/[0.12]'
              )}
              aria-hidden
            />
            <span
              className={cn(
                'mt-1.5 block text-[12px] leading-snug text-white',
                i === stepIndex && 'font-semibold'
              )}
            >
              {i + 1} {s.label}
            </span>
          </li>
        ))}
      </ol>
    );

  const canNextPick = Boolean(qual && unit);
  const footer =
    step === 'duplicate' ? (
      <div className="flex">
        <button
          type="button"
          onClick={() => setStep('pick')}
          className={cn(BTN, 'w-full sm:w-auto')}
        >
          Back
        </button>
      </div>
    ) : step === 'pick' ? (
      <div className="flex items-center gap-3">
        <p className="hidden min-w-0 flex-1 truncate text-[13px] text-white sm:block">
          {[cohortName ?? 'No cohort', qual?.code, unit ? `Unit ${unit.unit_code}` : null]
            .filter(Boolean)
            .join(' · ')}
        </p>
        <button
          type="button"
          onClick={() => setStep('criteria')}
          disabled={!canNextPick}
          className={cn(BTN_PRIMARY, 'w-full sm:w-auto')}
        >
          {canNextPick ? 'Next: criteria' : qual ? 'Pick a unit' : 'Pick a qualification'}
        </button>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setStep('pick')} className={BTN}>
          Back
        </button>
        <button
          type="button"
          onClick={handover}
          disabled={acs.size === 0}
          className={cn(BTN_PRIMARY, 'flex-1 sm:flex-none')}
        >
          {acs.size > 0 ? `Next: shape the session (${acs.size})` : 'Pick at least one criterion'}
        </button>
      </div>
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Lesson plans"
      title="Start a plan"
      description="Pick who it is for and the unit, choose the criteria, then shape the session."
      subheader={progress}
      footer={footer}
      bodyClassName="space-y-8 pt-5"
    >
      <div ref={topRef} aria-hidden className="-mt-5 h-0" />
      {step === 'duplicate' && (
        <section className="space-y-4">
          <div>
            <h3 className={H3}>Duplicate a past plan</h3>
            <p className={HINT}>
              The copy is a draft with no date
              {cohortName ? `, for ${cohortName}` : ', for the same cohort as the original'}. Its
              criteria and references come with it.
            </p>
          </div>
          <div className="max-w-md">
            <SearchField value={dupSearch} onChange={setDupSearch} placeholder="Search plans" />
          </div>
          {pastPlans.length === 0 ? (
            <p className="text-[13px] text-white">No plans to copy yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {pastPlans.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => void duplicateFrom(l.id, l.title)}
                    disabled={duplicating !== null}
                    className={cn(TILE, 'flex h-full flex-col gap-1.5')}
                  >
                    <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
                      {l.title}
                    </span>
                    <span className="text-[12.5px] text-white">
                      {[
                        cohorts.find((c) => c.id === l.cohort_id)?.name ?? 'No cohort',
                        l.scheduled_date ? fmtDay(l.scheduled_date) : null,
                        l.duration_minutes ? `${l.duration_minutes} min` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                    <span className="mt-auto pt-2 text-[12.5px] font-semibold text-white">
                      {duplicating === l.id ? 'Duplicating…' : 'Duplicate this plan'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {step === 'pick' && (
        <>
          {/* Who */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className={H3}>Who is it for?</h3>
                <p className={HINT}>
                  Optional. The plan is pitched at the cohort and lands on its timetable.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('duplicate')}
                className={cn(BTN, 'gap-2')}
              >
                <Copy className="h-4 w-4" aria-hidden />
                Duplicate a past plan
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {cohortCards.map((c) => {
                const on = cohortId === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickCohort(on ? null : c.id)}
                      className={cn(TILE, 'flex h-full items-start gap-3', on && TILE_ON)}
                    >
                      <Tick on={on} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-semibold leading-snug text-white">
                          {c.name}
                        </span>
                        {c.course && (
                          <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                            {c.course}
                          </span>
                        )}
                        <span className="mt-2 block text-[12.5px] text-white">
                          {c.learners} learner{c.learners === 1 ? '' : 's'} ·{' '}
                          {c.next ? `next class ${fmtDay(c.next)}` : 'no class scheduled'}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => pickCohort(null)}
              className={cn(
                'inline-flex h-11 items-center gap-2.5 px-1 text-[13px] font-semibold text-white touch-manipulation'
              )}
            >
              <Tick on={cohortId === null} />
              Plan without a cohort
            </button>
          </section>

          {/* Qualification */}
          <section className="space-y-3">
            <div>
              <h3 className={H3}>Qualification</h3>
              {!showQualList && cohortQual === qualCode && !qualPicked && (
                <p className={HINT}>From {cohortName ?? 'the cohort'}'s course.</p>
              )}
            </div>
            {qualsLoading ? (
              <p className="text-[13px] text-white">Loading the catalogue…</p>
            ) : !showQualList && qual ? (
              <div
                className={cn(
                  TILE,
                  'flex flex-wrap items-center gap-3 sm:flex-nowrap',
                  'hover:!bg-[hsl(0_0%_15%)]'
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-white">
                    {qual.title}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-white">
                    {qual.awarding_body} · {qual.code} · {levelLabel(qual.level)}
                  </span>
                </span>
                <button type="button" onClick={() => setChangingQual(true)} className={BTN}>
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="max-w-md">
                  <SearchField
                    value={qualSearch}
                    onChange={setQualSearch}
                    placeholder="Search by code, title or level"
                  />
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {qualList.map((q) => {
                    const on = q.code === qualCode;
                    return (
                      <li key={q.code}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => pickQual(q.code)}
                          className={cn(TILE, 'flex h-full items-start gap-3', on && TILE_ON)}
                        >
                          <Tick on={on} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold leading-snug text-white">
                              {q.title}
                            </span>
                            <span className="mt-1 block text-[12.5px] text-white">
                              {q.awarding_body} · {q.code} · {levelLabel(q.level)}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {qualList.length === 0 && (
                  <p className="text-[13px] text-white">No qualification matches.</p>
                )}
              </div>
            )}
          </section>

          {/* Unit */}
          {qualCode && !showQualList && (
            <section className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className={H3}>Unit</h3>
                  <p className={HINT}>
                    {cohortId
                      ? 'With how much of each unit this cohort has in a plan already.'
                      : 'Pick the unit this lesson teaches.'}
                  </p>
                </div>
                {units.length > 6 && (
                  <div className="w-full sm:w-72">
                    <SearchField
                      value={unitSearch}
                      onChange={setUnitSearch}
                      placeholder="Search units"
                    />
                  </div>
                )}
              </div>
              {unitsLoading ? (
                <p className="text-[13px] text-white">Loading units…</p>
              ) : units.length === 0 ? (
                <p className="text-[13px] text-white">
                  This qualification has no units loaded yet. Pick another.
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {unitList.map((u) => {
                    const on = u.unit_code === unitCode;
                    const cov = coverage.get(u.unit_code);
                    return (
                      <li key={u.unit_code}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => pickUnit(u.unit_code)}
                          className={cn(TILE, 'flex h-full items-start gap-3', on && TILE_ON)}
                        >
                          <Tick on={on} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[12px] font-semibold text-white">
                              Unit {u.unit_code}
                            </span>
                            <span className="mt-0.5 line-clamp-2 block text-[14px] font-semibold leading-snug text-white">
                              {u.unit_title || `Unit ${u.unit_code}`}
                            </span>
                            <span className="mt-1.5 block text-[12.5px] text-white">
                              {u.ac_count} assessment criteria
                              {cohortId && cov
                                ? ` · ${cov.planned.size} in a plan${cov.taught.size > 0 ? `, ${cov.taught.size} taught` : ''}`
                                : cohortId
                                  ? ' · none planned yet'
                                  : ''}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </>
      )}

      {step === 'criteria' && qual && unit && (
        <>
          <div
            className={cn(
              TILE,
              'flex flex-wrap items-center gap-3 sm:flex-nowrap',
              'hover:!bg-[hsl(0_0%_15%)]'
            )}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-semibold text-white">
                {qual.code} · Unit {unit.unit_code}
                {cohortName ? ` · ${cohortName}` : ''}
              </span>
              <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-white">
                {unit.unit_title || `Unit ${unit.unit_code}`}
              </span>
            </span>
            <button type="button" onClick={() => setStep('pick')} className={BTN}>
              Change
            </button>
          </div>

          <CriteriaPicker
            los={los}
            losLoading={losLoading}
            allAcs={allAcs}
            acs={acs}
            unitCode={unit.unit_code}
            cohortName={cohortId ? cohortName : null}
            uncovered={uncovered}
            history={acHistory}
            onToggle={toggleAc}
            onToggleLo={toggleLo}
            onSet={(next) => {
              setAcs(new Set(next));
            }}
          />
        </>
      )}
    </FormSheet>
  );
}

/* ── Criteria picker ─────────────────────────────────────────────────────
   Step 2, redesigned 7 Oct (Andrew: "this criteria part needs to be
   designed better and be world class"). Each criterion says where it stands
   for the cohort (not planned yet / in a plan / taught), filters narrow to
   what still needs teaching, and a live "Your lesson" panel shows what is
   picked, how much of the unit that leaves, and when it is too much for one
   session. Nothing is guessed: history comes from this cohort's own plans
   (lesson_plan_ac_mapping), and with no cohort the history is simply absent. */

type CriteriaFilter = 'all' | 'unplanned' | 'planned';

/** Most single sessions cover three to six criteria well. */
const COMFORTABLE_MAX = 6;

function CriteriaPicker({
  los,
  losLoading,
  allAcs,
  acs,
  unitCode,
  cohortName,
  uncovered,
  history,
  onToggle,
  onToggleLo,
  onSet,
}: {
  los: Array<{ lo_number: number; lo_text: string; acs: AcRow[] }>;
  losLoading: boolean;
  allAcs: AcRow[];
  acs: Set<string>;
  unitCode: string;
  cohortName: string | null;
  uncovered: string[];
  history: Map<string, { title: string; date: string | null; delivered: boolean }>;
  onToggle: (code: string) => void;
  onToggleLo: (codes: string[]) => void;
  onSet: (codes: string[]) => void;
}) {
  const [filter, setFilter] = useState<CriteriaFilter>('all');
  const [query, setQuery] = useState('');
  const hasCohort = !!cohortName;
  const uncoveredSet = useMemo(() => new Set(uncovered), [uncovered]);
  const planned = allAcs.length - uncovered.length;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return los
      .map((lo) => ({
        ...lo,
        shown: lo.acs.filter((a) => {
          if (filter === 'unplanned' && !uncoveredSet.has(a.ac_code)) return false;
          if (filter === 'planned' && uncoveredSet.has(a.ac_code)) return false;
          return q ? `${a.ac_code} ${a.ac_text}`.toLowerCase().includes(q) : true;
        }),
      }))
      .filter((lo) => lo.shown.length > 0);
  }, [los, filter, query, uncoveredSet]);

  const picked = allAcs.filter((a) => acs.has(a.ac_code));
  const tooMany = picked.length > COMFORTABLE_MAX;
  const afterThis = new Set([
    ...allAcs.filter((a) => !uncoveredSet.has(a.ac_code)).map((a) => a.ac_code),
    ...acs,
  ]).size;

  const statusOf = (code: string) => {
    const h = history.get(`${unitCode}|${code}`);
    if (!hasCohort) return null;
    if (!h) return { text: 'Not planned yet', tone: 'todo' as const };
    const when = h.date ? ` · ${fmtDay(h.date)}` : '';
    return h.delivered
      ? { text: `Taught in "${h.title}"${when}`, tone: 'done' as const }
      : { text: `In "${h.title}"${when}`, tone: 'planned' as const };
  };

  const filterChip = (id: CriteriaFilter, label: string, n: number) => (
    <button
      type="button"
      onClick={() => setFilter(id)}
      aria-pressed={filter === id}
      className={cn(
        'inline-flex h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 text-[13px] font-semibold text-white touch-manipulation',
        filter === id ? 'border-elec-yellow' : 'border-transparent'
      )}
    >
      {label}
      <span className="tabular-nums">{n}</span>
    </button>
  );

  return (
    <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* Left: the criteria */}
      <div className="min-w-0 space-y-4">
        <div>
          <h3 className={H3}>What should this lesson teach?</h3>
          <p className={HINT}>
            {hasCohort
              ? `Each criterion shows where it stands for ${cohortName}. ${planned} of ${allAcs.length} are already in a plan.`
              : 'Pick the criteria this lesson teaches. Choose a cohort on step 1 to see which are already planned or taught.'}
          </p>
        </div>

        <div className="space-y-2">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Search criteria, e.g. 2.1 or emergency"
          />
          <div className="-mx-4 flex overflow-x-auto border-b border-white/[0.08] px-4 hide-scrollbar sm:mx-0 sm:px-0">
            {filterChip('all', 'All', allAcs.length)}
            {hasCohort && filterChip('unplanned', 'Not planned yet', uncovered.length)}
            {hasCohort && filterChip('planned', 'Already planned', planned)}
          </div>
        </div>

        {losLoading ? (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl card-surface" />
            ))}
          </div>
        ) : los.length === 0 ? (
          <p className="text-[13px] text-white">No criteria are listed for this unit yet.</p>
        ) : groups.length === 0 ? (
          <p className="text-[13px] text-white">
            Nothing matches.{' '}
            <button
              type="button"
              className="font-semibold underline underline-offset-4"
              onClick={() => {
                setFilter('all');
                setQuery('');
              }}
            >
              Show every criterion
            </button>
          </p>
        ) : (
          <div className="space-y-3">
            {groups.map((lo) => {
              const codes = lo.shown.map((a) => a.ac_code);
              const allOn = codes.every((c) => acs.has(c));
              const loPlanned = lo.acs.filter((a) => !uncoveredSet.has(a.ac_code)).length;
              const loPicked = lo.acs.filter((a) => acs.has(a.ac_code)).length;
              return (
                <div
                  key={lo.lo_number}
                  className="-mx-4 overflow-hidden border-y border-white/[0.08] card-surface sm:mx-0 sm:rounded-2xl sm:border"
                >
                  <div className="flex items-start gap-3 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-white">Outcome {lo.lo_number}</p>
                      <p className="mt-0.5 text-[14px] font-semibold leading-snug text-white">
                        {lo.lo_text.replace(/^./, (c) => c.toUpperCase())}
                      </p>
                      <p className="mt-1 text-[12px] text-white">
                        {lo.acs.length} criteria
                        {hasCohort ? ` · ${loPlanned} already planned` : ''}
                        {loPicked ? ` · ${loPicked} picked` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleLo(codes)}
                      className="inline-flex h-11 shrink-0 items-center rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-semibold text-white touch-manipulation hover:border-white/[0.3]"
                    >
                      {allOn
                        ? 'Clear these'
                        : `Pick ${codes.length === lo.acs.length ? 'all' : 'these'}`}
                    </button>
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {lo.shown.map((ac) => {
                      const on = acs.has(ac.ac_code);
                      const st = statusOf(ac.ac_code);
                      return (
                        <li key={ac.ac_code}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => onToggle(ac.ac_code)}
                            className={cn(
                              'flex min-h-[56px] w-full items-start gap-3 px-4 py-3 text-left transition-colors touch-manipulation sm:px-5',
                              on ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                            )}
                          >
                            <span className="pt-0.5">
                              <Tick on={on} square />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[14px] leading-snug text-white">
                                <span className="mr-1.5 font-semibold tabular-nums">
                                  {ac.ac_code}
                                </span>
                                {ac.ac_text.replace(/^./, (c) => c.toUpperCase())}
                              </span>
                              {st && (
                                <span
                                  className={cn(
                                    'mt-1 block truncate text-[12px]',
                                    st.tone === 'done'
                                      ? 'text-emerald-300'
                                      : st.tone === 'planned'
                                        ? 'text-white'
                                        : 'text-white'
                                  )}
                                >
                                  {st.text}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right: the lesson being built */}
      <aside className="-mx-4 card-surface border-y border-white/[0.08] p-4 sm:mx-0 sm:rounded-2xl sm:border sm:p-5 lg:sticky lg:top-4">
        <p className="text-[13px] font-semibold text-white">Your lesson</p>
        <p className="mt-1 text-[20px] font-bold leading-tight text-white">
          {picked.length === 0
            ? 'Nothing picked yet'
            : `${picked.length} ${picked.length === 1 ? 'criterion' : 'criteria'}`}
        </p>

        {hasCohort && allAcs.length > 0 && (
          <div className="mt-3">
            <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <span
                className="h-full bg-emerald-400"
                style={{ width: `${(planned / allAcs.length) * 100}%` }}
              />
              <span
                className="h-full bg-elec-yellow"
                style={{ width: `${((afterThis - planned) / allAcs.length) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[12px] text-white">
              With this lesson, {afterThis} of {allAcs.length} criteria in the unit are planned.
            </p>
          </div>
        )}

        {picked.length > 0 ? (
          <ul className="mt-4 max-h-[40vh] space-y-1.5 overflow-y-auto pr-1">
            {picked.map((a) => (
              <li
                key={a.ac_code}
                className="flex items-start gap-2 rounded-xl bg-white/[0.04] px-3 py-2"
              >
                <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-white">
                  <span className="font-semibold tabular-nums">{a.ac_code}</span>{' '}
                  {a.ac_text.replace(/^./, (c) => c.toUpperCase())}
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(a.ac_code)}
                  aria-label={`Remove ${a.ac_code}`}
                  className="-my-1.5 -mr-1.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white touch-manipulation hover:bg-white/[0.08]"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[13px] leading-relaxed text-white">
            Tap the criteria on the left. A good session usually teaches three to six.
          </p>
        )}

        {tooMany && (
          <div className="mt-4 rounded-xl border border-orange-500/40 p-3">
            <p className="text-[12.5px] font-semibold text-orange-300">
              That is a lot for one session
            </p>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              {picked.length} criteria will make a thin plan. Keep the first {COMFORTABLE_MAX} and
              plan the rest as a second lesson.
            </p>
            <button
              type="button"
              onClick={() => onSet(picked.slice(0, COMFORTABLE_MAX).map((a) => a.ac_code))}
              className="mt-2 inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-semibold text-white touch-manipulation hover:border-white/[0.3]"
            >
              Keep the first {COMFORTABLE_MAX}
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
          {hasCohort && uncovered.length > 0 && (
            <button
              type="button"
              onClick={() => onSet(uncovered.slice(0, COMFORTABLE_MAX))}
              className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-semibold text-white touch-manipulation hover:border-white/[0.3]"
            >
              Pick the next {Math.min(COMFORTABLE_MAX, uncovered.length)} not planned
            </button>
          )}
          {picked.length > 0 && (
            <button
              type="button"
              onClick={() => onSet([])}
              className="inline-flex h-11 items-center px-2 text-[12.5px] font-semibold text-white underline-offset-4 touch-manipulation hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </aside>
    </section>
  );
}
