import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubAlertLine } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeHeading as HubSectionHeading,
} from '@/components/college/ui/CollegeUi';
import { TeachMenu } from '@/components/college/teaching/TeachingKit';
import { StartLessonPlanSheet } from '@/components/college/sheets/StartLessonPlanSheet';
import { cleanLessonDeep, cleanLessonShown, cleanLessonText } from '@/lib/lessons/cleanLessonText';
import { duplicateLessonPlan } from '@/lib/lessons/duplicateLessonPlan';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';
import {
  useGenerateLesson,
  useLessonPlan,
  useRefineSection,
  type BloomLevel,
  type GenerateLessonInput,
  type GeneratedActivity,
  type GeneratedCitation,
  type GeneratedLessonPlan,
  type RagPreview,
  type RefinableSectionKey,
} from '@/hooks/useCurriculum';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { ScheduleLessonDialog } from '@/components/college/dialogs/ScheduleLessonDialog';
import { useLessonResources } from '@/hooks/useResourceLinks';
import { supabase } from '@/integrations/supabase/client';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';

/* ==========================================================================
   LessonPlanPage
   - /college/lessons/:id           → load persisted plan
   - /college/lessons/new?q=...     → stream a fresh generation

   Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`), the
   same one the College dashboard, Today and Marking use, so opening a plan
   from the Lesson Plans list reads as a continuation of that page.

     masthead → (saved alert) → identity line → teach it → the plan → manage

   What went, and why:

   The FLIGHT-PLAN COVER. A gradient hairline, a 44px title, a four-cell stat
   board (duration, objectives, activities, citations) and a truncated UUID —
   roughly 300px before a tutor reached the first objective, and every figure
   on the board was a count of something listed directly beneath it.

   The STICKY ACTION RAIL. Seven pills — two of them volt, three volt-outlined
   — plus a "More" sheet on phones. The three things a tutor does with a plan
   (deliver it, build slides, print it) are now the quick-start strip, with
   register or schedule as the fourth; the housekeeping (mark ready,
   duplicate, delete) is a row list at the end, where you are once you have
   read the plan.

   The 20-ENTRY SIDE NAV. Desktop-only anchor links into a page that is now
   a single column of cards under volt section headings.

   Every section is one CARD_SURFACE card under a HubSectionHeading, in
   teaching order: objectives → the session → briefing → craft →
   differentiation → assessment → safety and wider skills → resources → ACs
   covered → evidence → next lesson. Everything is `text-white`; the off-system
   phase palette (blue, cyan, purple, emerald, amber) is gone.

   Redesign 7 Oct 2026 (Andrew: "can be amazing"):
   - Status and the next action lead the page (PlanHeader); the bottom
     "Manage this plan" card is gone, its handlers moved into usePlanManage.
   - The plan is grouped (Overview, The session, Tutor briefing, ...) with a
     section index: a sticky rail on desktop, a sticky chip row on phones.
   - Long prose sections open as a short preview with "Read all".
   - Cards are the landing page surface (card-surface), like the list.
   - Saved text is shown through cleanLessonText (no "(facet 2,14)").
   ========================================================================== */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One content card: the landing page's card surface, as on the plans list. */
const CARD =
  '-mx-4 overflow-hidden card-surface max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border';

const HELP: PageHelpContent = {
  id: 'college-lesson-plan',
  title: 'A lesson plan',
  what: 'One lesson from start to finish: what learners will be able to do, the timed session, your briefing, how you will check learning, and the criteria it covers.',
  steps: [
    {
      title: 'Check it',
      body: 'Read the objectives and the session timings. Tap Rewrite on any section to have it redrafted, then keep or discard the suggestion.',
    },
    {
      title: 'Get ready',
      body: 'Build the slides, download a PDF copy, and schedule it for a cohort, date and room.',
    },
    {
      title: 'Teach it',
      body: 'Deliver opens the presenter view. Register takes attendance for the cohort in two taps.',
    },
    {
      title: 'Close it off',
      body: 'Mark it ready before the class and delivered after it. The button at the top always shows the next step; Duplicate and Delete are under More.',
    },
  ],
  notes: [
    {
      title: 'Rewrites',
      body: 'A rewrite is drafted by AI from the plan and the regulations it cites. Nothing changes until you accept it.',
    },
  ],
};
const ROW = 'px-4 py-4 sm:px-5';
/** In-card sub-label. Sentence case, white, small and bold — never an eyebrow. */
const SUB = 'text-[12px] font-semibold text-white';
const BODY = 'text-[13.5px] leading-relaxed text-white';
const MONO = 'font-mono tabular-nums';

/**
 * The live CHECK on `college_lesson_plans.status` is
 * draft | ready | published | delivered | archived — all lower case.
 */
const isReadyStatus = (s: string | null | undefined) =>
  ['ready', 'published'].includes((s ?? '').toLowerCase());

/**
 * The generator writes objective codes as "AC 1.1" on some plans and "1.1" on
 * others (the mapping table always holds "1.1"). Strip the prefix so the
 * label reads "AC 1.1 · 1.2", not "AC AC 1.1 · AC 1.2".
 */
function bareAcCode(code: string): string {
  return code.replace(/^\s*AC\s*/i, '').trim();
}

function formatScheduledDate(iso: string): string {
  // A bare `YYYY-MM-DD` parses as UTC midnight; pin it to midday so the
  // wall date survives the BST offset.
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/* ==========================================================================
   Plan row metadata — status, schedule, cohort. Lifted out of the old action
   bar so the identity line, the quick-start strip and the manage rows read
   one fetch rather than three.
   ========================================================================== */

interface PlanMeta {
  title: string;
  status: string;
  duration_minutes: number | null;
  objectives: string | null;
  scheduled_date: string | null;
  scheduled_start_time: string | null;
  scheduled_room: string | null;
  cohort_id: string | null;
  cohort_name: string | null;
}

function usePlanMeta(lessonId: string | null) {
  const [meta, setMeta] = useState<PlanMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const tokenRef = useRef(0);

  const refresh = useCallback(async () => {
    if (!lessonId || !UUID_RE.test(lessonId)) {
      setMeta(null);
      return;
    }
    const token = ++tokenRef.current;
    setLoading(true);
    const { data } = await supabase
      .from('college_lesson_plans')
      .select(
        'title, status, duration_minutes, objectives, scheduled_date, scheduled_start_time, scheduled_room, cohort_id'
      )
      .eq('id', lessonId)
      .maybeSingle();
    if (token !== tokenRef.current) return;
    if (!data) {
      setMeta(null);
      setLoading(false);
      return;
    }
    let cohort_name: string | null = null;
    if (data.cohort_id) {
      const { data: c } = await supabase
        .from('college_cohorts')
        .select('name')
        .eq('id', data.cohort_id)
        .maybeSingle();
      if (token !== tokenRef.current) return;
      cohort_name = (c?.name as string | undefined) ?? null;
    }
    setMeta({
      title: data.title,
      status: data.status ?? 'draft',
      duration_minutes: data.duration_minutes ?? null,
      objectives: (data.objectives as string | null) ?? null,
      scheduled_date: (data.scheduled_date as string | null) ?? null,
      scheduled_start_time: (data.scheduled_start_time as string | null) ?? null,
      scheduled_room: (data.scheduled_room as string | null) ?? null,
      cohort_id: (data.cohort_id as string | null) ?? null,
      cohort_name,
    });
    setLoading(false);
  }, [lessonId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setStatus = useCallback((status: string) => {
    setMeta((m) => (m ? { ...m, status } : m));
  }, []);

  return { meta, loading, refresh, setStatus };
}

/* ==========================================================================
   Page
   ========================================================================== */

export default function LessonPlanPage() {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isNew = !id || id === 'new';
  // Set by the generation flow below when it lands here on the freshly
  // saved plan — the moment to offer the slide deck as the next step.
  const justCreated =
    !isNew && Boolean((location.state as { justCreated?: boolean } | null)?.justCreated);
  const startedRef = useRef(false);

  const saved = useLessonPlan(isNew ? null : (id ?? null));
  const gen = useGenerateLesson();

  useEffect(() => {
    if (!isNew) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const qualification_code = search.get('q');
    const unit_code = search.get('u');
    const acsStr = search.get('ac');
    if (!qualification_code || !unit_code || !acsStr) {
      toast({
        title: 'Missing parameters',
        description: 'Lesson generation requires qualification, unit and AC codes.',
        variant: 'destructive',
      });
      navigate('/college?section=lessonplans', { replace: true });
      return;
    }

    const input: GenerateLessonInput = {
      qualification_code,
      unit_code,
      ac_codes: acsStr.split(','),
      session_length_mins: Number(search.get('len') ?? '90'),
      delivery_mode: (search.get('mode') as GenerateLessonInput['delivery_mode']) ?? 'classroom',
      include_homework: search.get('hw') !== '0',
      include_differentiation: search.get('diff') !== '0',
      include_hs: search.get('hs') !== '0',
      cohort_id: search.get('cohort') || null,
      save_to_db: true,
    };

    gen
      .generate(input, {
        onDone: (result) => {
          if (result.lesson_plan_id) {
            navigate(`/college/lessons/${result.lesson_plan_id}`, {
              replace: true,
              state: { justCreated: true },
            });
          }
        },
        onError: (msg) => {
          toast({
            title: 'Generation failed',
            description: msg,
            variant: 'destructive',
          });
        },
      })
      .catch(() => {
        /* onError already handled */
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  const plan = isNew ? (gen.result?.plan ?? null) : saved.plan;
  const loading = isNew ? gen.loading : saved.loading;
  const error = isNew ? gen.error : saved.error;
  const brief = isNew ? gen.briefText : (saved.plan?.tutor_brief_markdown ?? '');
  const streaming = isNew && loading && !plan;

  const lessonId = gen.result?.lesson_plan_id ?? (isNew ? null : (id ?? null));
  const persisted = Boolean(lessonId && UUID_RE.test(lessonId));
  const {
    meta,
    loading: metaLoading,
    refresh: refreshMeta,
    setStatus,
  } = usePlanMeta(persisted ? lessonId : null);

  const streamingTitle = useMemo(() => {
    const h1 = gen.briefText.match(/^#\s+(.+)$/m);
    return h1 ? h1[1].trim() : null;
  }, [gen.briefText]);

  const title = streaming
    ? (streamingTitle ?? 'New lesson plan')
    : (plan?.title ?? meta?.title ?? (isNew ? 'New lesson plan' : 'Lesson plan'));

  // A plan row with no generated content — three real rows on the live
  // table, created by hand with a title, a cohort and a time. The old page
  // rendered nothing at all for them.
  const contentless = !isNew && !loading && !error && !plan && !metaLoading && meta !== null;

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title={title}
        backTo="/college?section=lessonplans"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <div className="lesson-plan-print-root space-y-8 sm:space-y-10">
          {/* Next step after a fresh generation. Nothing is generated until
              the tutor confirms on the deck page (it costs an OpenAI call). */}
          {plan && !loading && justCreated && id && (
            <div className="no-print">
              <HubAlertLine
                text="Lesson plan saved. Next: build the slide deck."
                action="Build slides"
                onClick={() => navigate(`/college/lessons/${id}/slides`)}
              />
            </div>
          )}

          {streaming && (
            <StreamingView
              phase={gen.phase}
              meta={gen.streamMeta}
              brief={gen.briefText}
              briefComplete={gen.briefComplete}
              planBytes={gen.planBytes}
              planComplete={gen.planComplete}
              ragPreview={gen.ragPreview}
            />
          )}

          {error && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <HubSectionHeading>Generation failed</HubSectionHeading>
              <motion.div variants={itemVariants} className={cn(CARD, ROW)}>
                <p className={cn(BODY, 'break-words')}>{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 h-11 w-full rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
                >
                  Try again
                </button>
              </motion.div>
            </motion.section>
          )}

          {persisted && lessonId && (plan || contentless) && !loading && (
            <PlanHeader
              lessonId={lessonId}
              meta={meta}
              title={plan?.title ?? meta?.title ?? 'Lesson plan'}
              durationFallback={plan?.duration_mins ?? null}
              objectiveCount={plan?.learning_objectives?.length ?? 0}
              hasContent={Boolean(plan)}
              onScheduled={refreshMeta}
              onStatusChange={setStatus}
            />
          )}

          {plan && !loading && <PlanView plan={plan} brief={brief ?? ''} lessonId={lessonId} />}

          {contentless && meta && <ContentlessPlan meta={meta} />}

          {!isNew && loading && <LoadingState />}
        </div>
      </HubBody>
    </HubPage>
  );
}

/* ==========================================================================
   Header — what this plan is, where it stands, and the next thing to do.

   Redesign 7 Oct 2026: "Mark as ready", Duplicate and Delete used to sit in
   a "Manage this plan" card at the very bottom of a ~13,000px page. Status
   and the one next action now lead: a draft's primary action is "Mark ready
   to teach", a ready plan's is Deliver, and a past lesson nobody closed off
   is "Mark delivered". Duplicate and Delete live in the "…" menu. The
   handlers are the ones the old Manage card used (usePlanManage below).
   ========================================================================== */

/** Today as YYYY-MM-DD in local time, the shape `scheduled_date` arrives in. */
function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type PlanPhase = 'draft' | 'ready' | 'unmarked' | 'delivered' | 'archived';

function planPhase(status: string, scheduled: string | null | undefined): PlanPhase {
  const s = (status ?? '').toLowerCase();
  if (s === 'delivered') return 'delivered';
  if (s === 'archived') return 'archived';
  if (scheduled && scheduled < todayIso()) return 'unmarked';
  return isReadyStatus(s) ? 'ready' : 'draft';
}

const PHASE_WORD: Record<PlanPhase, string> = {
  draft: 'Draft',
  ready: 'Ready to teach',
  unmarked: 'Not marked delivered',
  delivered: 'Delivered',
  archived: 'Archived',
};

const PHASE_HINT: Record<PlanPhase, string> = {
  draft: 'Check the objectives and the session, then mark it ready to teach.',
  ready: 'Ready for the class. Deliver opens the presenter view.',
  unmarked: 'The lesson date has passed. Mark it delivered once it has been taught, or re-date it.',
  delivered: 'Taught and closed off.',
  archived: 'Archived. It no longer shows on timetables.',
};

function PhaseWord({ phase }: { phase: PlanPhase }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-[12px] font-semibold',
        phase === 'unmarked'
          ? 'border-orange-400/50 text-orange-300'
          : phase === 'ready'
            ? 'border-emerald-400/50 text-emerald-300'
            : 'border-white/[0.16] text-white'
      )}
    >
      {PHASE_WORD[phase]}
    </span>
  );
}

function PlanHeader({
  lessonId,
  meta,
  title,
  durationFallback,
  objectiveCount,
  hasContent,
  onScheduled,
  onStatusChange,
}: {
  lessonId: string;
  meta: PlanMeta | null;
  title: string;
  durationFallback: number | null;
  objectiveCount: number;
  /** False for a hand-made row with no plan JSON — nothing to deliver or print. */
  hasContent: boolean;
  onScheduled: () => void;
  onStatusChange: (next: string) => void;
}) {
  const navigate = useNavigate();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  const isScheduled = Boolean(meta?.scheduled_date && meta?.scheduled_start_time);
  const duration = meta?.duration_minutes ?? durationFallback;
  const status = meta?.status ?? 'draft';
  const hasCohort = Boolean(meta?.cohort_id);
  const phase = planPhase(status, meta?.scheduled_date);

  const manage = usePlanManage({ lessonId, title, status, onStatusChange });

  // ELE-2017: the A4 copy is a PDF made server-side from the saved plan
  // (learner-document-pdf, lesson_plan), not a browser print.
  const pdf = useLearnerDocumentDownload();
  const handleDownload = () => void pdf.download({ kind: 'lesson_plan', lessonPlanId: lessonId });

  const when = meta?.scheduled_date
    ? [
        formatScheduledDate(meta.scheduled_date),
        meta.scheduled_start_time?.slice(0, 5),
        meta.scheduled_room ? `in ${meta.scheduled_room}` : null,
      ]
        .filter(Boolean)
        .join(' ')
    : 'Not scheduled';
  const metaLine = [
    when,
    duration ? `${duration} min` : null,
    objectiveCount > 0 ? `${objectiveCount} objective${objectiveCount === 1 ? '' : 's'}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  type Act = { label: string; onClick: () => void; disabled?: boolean };
  const deliver: Act = {
    label: 'Deliver',
    onClick: () => navigate(`/college/lessons/${lessonId}/deliver`),
  };
  const markReady: Act = {
    label: manage.busy === 'ready' ? 'Saving…' : 'Mark ready to teach',
    onClick: () => void manage.setStatus('ready'),
    disabled: manage.busy !== null,
  };
  const markDelivered: Act = {
    label: manage.busy === 'delivered' ? 'Saving…' : 'Mark delivered',
    onClick: () => void manage.setStatus('delivered'),
    disabled: manage.busy !== null,
  };
  const schedule: Act = {
    label: isScheduled ? 'Reschedule' : 'Schedule',
    onClick: () => setScheduleOpen(true),
  };
  const register: Act = { label: 'Register', onClick: () => setRegisterOpen(true) };

  let primary: Act | null;
  let secondary: Act[];
  if (!hasContent) {
    // A row with no plan JSON has nothing to deliver, print or turn into
    // slides; what a tutor can still do with it is run the class and fill
    // it in.
    primary = hasCohort ? register : schedule;
    secondary = [
      ...(hasCohort ? [schedule] : []),
      { label: 'Generate the plan', onClick: () => setStartOpen(true) },
    ];
  } else {
    const slides: Act = {
      label: 'Slides',
      onClick: () => navigate(`/college/lessons/${lessonId}/slides`),
    };
    const download: Act = {
      label: pdf.busy ? 'Making the PDF…' : 'Download PDF',
      onClick: handleDownload,
      disabled: pdf.busy,
    };
    const rest = [slides, download, schedule, ...(hasCohort ? [register] : [])];
    if (phase === 'draft') {
      primary = markReady;
      secondary = [deliver, ...rest];
    } else if (phase === 'ready') {
      primary = deliver;
      secondary = rest;
    } else if (phase === 'unmarked') {
      primary = markDelivered;
      secondary = [deliver, ...rest];
    } else {
      primary = null;
      secondary = [deliver, ...rest];
    }
  }

  const menuItems: Array<{ label: string; onClick: () => void; destructive?: boolean }> = [];
  if (isReadyStatus(status) && phase !== 'unmarked')
    menuItems.push({ label: 'Back to draft', onClick: () => void manage.setStatus('draft') });
  if (phase === 'unmarked')
    menuItems.push({
      label: isReadyStatus(status) ? 'Back to draft' : 'Mark ready to teach',
      onClick: () => void manage.setStatus(isReadyStatus(status) ? 'draft' : 'ready'),
    });
  if (phase === 'ready' || phase === 'draft')
    menuItems.push({ label: 'Mark delivered', onClick: () => void manage.setStatus('delivered') });
  if (phase === 'delivered')
    menuItems.push({
      label: 'Not delivered after all',
      onClick: () => void manage.setStatus('ready'),
    });
  menuItems.push({
    label: manage.busy === 'duplicate' ? 'Duplicating…' : 'Duplicate',
    onClick: () => void manage.duplicate(),
  });
  menuItems.push({ label: 'Delete plan', onClick: () => manage.askDelete(), destructive: true });

  return (
    <>
      <motion.header
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="no-print space-y-5"
      >
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-elec-yellow">
            {meta?.cohort_name ?? (hasCohort ? 'Cohort' : 'No cohort yet')}
          </p>
          <h1 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
            {title}
          </h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white">{metaLine}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <PhaseWord phase={phase} />
          <p className="min-w-0 text-[13.5px] leading-snug text-white">
            {hasContent
              ? PHASE_HINT[phase]
              : 'No plan content yet. Generate it from the unit assessment criteria.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {primary && (
            <button
              type="button"
              onClick={primary.onClick}
              disabled={primary.disabled}
              className={cn(COLLEGE_BTN_PRIMARY, 'w-full px-5 sm:w-auto')}
            >
              {primary.label}
            </button>
          )}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {secondary.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={a.onClick}
                disabled={a.disabled}
                className={COLLEGE_BTN}
              >
                {a.label}
              </button>
            ))}
            <TeachMenu
              title={title}
              items={menuItems}
              trigger={(p) => (
                <button
                  type="button"
                  {...p}
                  className={cn(COLLEGE_BTN, 'px-3')}
                  aria-label="More for this plan"
                >
                  <MoreHorizontal className="h-5 w-5" aria-hidden />
                  <span className="sm:hidden">More</span>
                </button>
              )}
            />
          </div>
        </div>
      </motion.header>

      <ScheduleLessonDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        lessonId={lessonId}
        planTitle={meta?.title ?? 'Lesson plan'}
        defaultDurationMins={duration ?? 90}
        initialCohortId={meta?.cohort_id ?? null}
        onScheduled={onScheduled}
      />

      {meta?.cohort_id && (
        <QuickRegisterSheet
          open={registerOpen}
          onOpenChange={setRegisterOpen}
          cohortId={meta.cohort_id}
          lessonTitle={meta.title}
          lessonPlanId={lessonId}
          date={registerDate(meta.scheduled_date)}
        />
      )}

      <StartLessonPlanSheet
        open={startOpen}
        onOpenChange={setStartOpen}
        initialCohortId={meta?.cohort_id ?? null}
      />

      {manage.dialog}
    </>
  );
}

/** A register can't be taken for a future day: a future lesson date opens on today. */
function registerDate(scheduled: string | null | undefined): string {
  const today = todayIso();
  return scheduled && scheduled <= today ? scheduled : today;
}

/* ==========================================================================
   A plan row with no generated content
   ========================================================================== */

function ContentlessPlan({ meta }: { meta: PlanMeta }) {
  const [startOpen, setStartOpen] = useState(false);
  const objectives = useMemo(() => {
    if (!meta.objectives) return [] as string[];
    try {
      const parsed = JSON.parse(meta.objectives) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .map((o) => (typeof o === 'string' ? o : ((o as { text?: string })?.text ?? '')))
          .filter(Boolean);
      }
    } catch {
      /* plain text objectives */
    }
    return meta.objectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }, [meta.objectives]);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>The plan</HubSectionHeading>
      <motion.div variants={itemVariants} className={CARD}>
        {objectives.length > 0 && (
          <ul className="divide-y divide-white/[0.06]">
            {objectives.map((o, i) => (
              <li key={i} className={cn(ROW, 'flex items-start gap-3')}>
                <span className={cn(MONO, 'shrink-0 text-[12px] font-semibold text-white')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={BODY}>{cleanLessonText(o)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className={cn(ROW, objectives.length > 0 && 'border-t border-white/[0.10]')}>
          <p className={BODY}>
            This plan has a title, a cohort and a time, but no content yet. It was created by hand.
            Generate it from the unit's assessment criteria to fill it in.
          </p>
          <button
            type="button"
            onClick={() => setStartOpen(true)}
            className={cn(COLLEGE_BTN, 'mt-3')}
          >
            Generate the plan
          </button>
        </div>
      </motion.div>
      <StartLessonPlanSheet
        open={startOpen}
        onOpenChange={setStartOpen}
        initialCohortId={meta.cohort_id}
      />
    </motion.section>
  );
}

/* ==========================================================================
   Status, duplicate, delete — the handlers the old "Manage this plan" card
   used, unchanged, lifted into a hook so the header can drive them.
   ========================================================================== */

function usePlanManage({
  lessonId,
  title,
  status,
  onStatusChange,
}: {
  lessonId: string;
  title: string;
  status: string;
  onStatusChange: (next: string) => void;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<null | 'duplicate' | 'ready' | 'delivered' | 'draft' | 'delete'>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDuplicate = async () => {
    setBusy('duplicate');
    try {
      // Same copy as before: every column, its criteria mappings and
      // regulation references, as a draft titled "(copy)".
      const newId = await duplicateLessonPlan(lessonId, { title: `${title} (copy)` });

      void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({ title: 'Plan duplicated', description: 'Opening the copy…' });
      navigate(`/college/lessons/${newId}`);
    } catch (e) {
      toast({
        title: 'Duplicate failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  /*
   * This used to write 'Approved', which the CHECK constraint on
   * `college_lesson_plans.status` (draft | ready | published | delivered
   * | archived) rejects — so "Mark ready" failed with a constraint error
   * every single time. Always the lowercase value.
   */
  const setStatus = async (next: 'draft' | 'ready' | 'delivered') => {
    if (next === (status ?? '').toLowerCase()) return;
    setBusy(next);
    try {
      const { error } = await supabase
        .from('college_lesson_plans')
        .update({ status: next })
        .eq('id', lessonId);
      if (error) throw error;
      onStatusChange(next);
      void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({
        title:
          next === 'ready'
            ? 'Marked ready to teach'
            : next === 'delivered'
              ? 'Marked as delivered'
              : 'Back in drafts',
        description:
          next === 'ready'
            ? 'It shows as ready on the cohort timetable.'
            : next === 'delivered'
              ? title
              : 'This plan is a draft again.',
      });
    } catch (e) {
      toast({
        title: 'Update failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async () => {
    setBusy('delete');
    try {
      // Remove children first (in case cascade isn't configured)
      await supabase.from('lesson_plan_ac_mapping').delete().eq('lesson_plan_id', lessonId);
      await supabase.from('lesson_regulation_refs').delete().eq('lesson_plan_id', lessonId);
      const { error } = await supabase.from('college_lesson_plans').delete().eq('id', lessonId);
      if (error) throw error;
      void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({ title: 'Plan deleted' });
      navigate('/college?section=lessonplans');
    } catch (e) {
      toast({
        title: 'Delete failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
      setBusy(null);
    }
  };

  const dialog = (
    <ConfirmationDialog
      open={confirmDelete}
      onOpenChange={setConfirmDelete}
      title="Delete this lesson plan?"
      description="This removes the plan, its criteria mappings and regulation references. This cannot be undone."
      confirmText="Delete plan"
      variant="destructive"
      loading={busy === 'delete'}
      onConfirm={handleDelete}
    />
  );

  return {
    busy,
    setStatus,
    duplicate: handleDuplicate,
    askDelete: () => setConfirmDelete(true),
    dialog,
  };
}

/* ==========================================================================
   Streaming view — a card filling in, not a spinner over a hero
   ========================================================================== */

const PHASES = [
  { id: 'fetching_curriculum', label: 'Loading the assessment criteria' },
  { id: 'embedding_query', label: 'Analysing the topic' },
  { id: 'searching_rag', label: 'Searching BS 7671, GN3 and the On-Site Guide' },
  { id: 'composing', label: 'Drafting the briefing and the session plan' },
  { id: 'saving', label: 'Saving the plan' },
];

function StreamingView({
  phase,
  meta,
  brief,
  briefComplete,
  planBytes,
  planComplete,
  ragPreview,
}: {
  phase: string | null;
  meta: Record<string, unknown> | null;
  brief: string;
  briefComplete: boolean;
  planBytes: number;
  planComplete: boolean;
  ragPreview: RagPreview | null;
}) {
  const activeIdx = useMemo(() => {
    if (planComplete && briefComplete) return PHASES.length - 1;
    if (planBytes > 0 || brief.length > 0) return 3;
    return Math.max(
      0,
      PHASES.findIndex((p) => p.id === phase)
    );
  }, [phase, brief.length, planBytes, briefComplete, planComplete]);

  const retrying = phase === 'plan_retrying';

  const sources = ragPreview
    ? [
        { key: 'bs7671' as const, label: 'BS 7671', count: ragPreview.bs7671, prefix: '' },
        { key: 'gn3' as const, label: 'Guidance Note 3', count: ragPreview.gn3, prefix: '§' },
        { key: 'osg' as const, label: 'On-Site Guide', count: ragPreview.osg, prefix: '' },
      ]
    : [];

  return (
    <>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="-mb-4 flex min-h-11 flex-wrap items-center gap-x-2 text-[12.5px] text-white sm:-mb-6"
      >
        <span className="font-semibold text-elec-yellow">Drafting</span>
        <span aria-hidden className="opacity-40">
          ·
        </span>
        <span>{retrying ? 'Retrying the plan draft' : PHASES[activeIdx].label}</span>
      </motion.div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Progress</HubSectionHeading>
        <motion.div variants={itemVariants} className={CARD}>
          <ul className="divide-y divide-white/[0.06]">
            {PHASES.map((p, i) => {
              const state = i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'pending';
              return (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    aria-hidden
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      state === 'pending' ? 'bg-white/[0.25]' : 'bg-elec-yellow',
                      state === 'active' && 'animate-pulse'
                    )}
                  />
                  <span
                    className={cn(
                      'min-w-0 flex-1 text-[13.5px] leading-tight text-white',
                      state === 'active' && 'font-semibold'
                    )}
                  >
                    {p.label}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[12px] font-semibold',
                      state === 'active' ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {state === 'done' ? 'Done' : state === 'active' ? 'Now' : ''}
                  </span>
                </li>
              );
            })}
          </ul>
          {planBytes > 0 && !planComplete && (
            <div
              className={cn(
                'border-t border-white/[0.10] px-4 py-3 text-[12px] text-white sm:px-5',
                MONO
              )}
            >
              {planBytes.toLocaleString('en-GB')} characters of session plan drafted
            </div>
          )}
          {planComplete && (
            <div className="border-t border-white/[0.10] px-4 py-3 text-[12px] text-white sm:px-5">
              Session plan structured.
            </div>
          )}
          {retrying && (
            <div className="border-t border-white/[0.10] px-4 py-3 text-[12px] text-white sm:px-5">
              Connection hiccup. Retrying the plan draft. This usually succeeds on the second
              attempt.
            </div>
          )}
          {!ragPreview && Boolean(meta?.facets_used) && (
            <div className="border-t border-white/[0.10] px-4 py-3 text-[12px] text-white sm:px-5">
              Loading references…
            </div>
          )}
        </motion.div>
      </motion.section>

      {ragPreview && ragPreview.facets.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <div className="flex items-end justify-between gap-4">
            <HubSectionHeading>Grounded in</HubSectionHeading>
            <span className={cn('text-[12px] font-semibold text-white', MONO)}>
              {ragPreview.facets.length} references
            </span>
          </div>
          <motion.div variants={itemVariants} className={CARD}>
            <ul className="divide-y divide-white/[0.06]">
              {sources.map((s) => {
                const facets = ragPreview.facets.filter((f) => f.document_type === s.key);
                const seen = new Set<string>();
                const dedup = facets.filter((f) => {
                  const key =
                    f.reg_number ?? (f.primary_topic ? `t:${f.primary_topic}` : `f:${f.facet_id}`);
                  if (seen.has(key)) return false;
                  seen.add(key);
                  return true;
                });
                return (
                  <li key={s.key} className={ROW}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] font-semibold text-white">{s.label}</span>
                      <span className={cn('text-[12px] font-semibold text-white', MONO)}>
                        {facets.length === 0
                          ? 'No references matched'
                          : `${facets.length} ${facets.length === 1 ? 'reference' : 'references'}`}
                      </span>
                    </div>
                    {dedup.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {dedup.map((f, di) => (
                          <span key={`${f.facet_id}-${di}`} className="text-[12.5px] text-white">
                            {f.reg_number ? (
                              <span className={cn(MONO, 'font-semibold text-elec-yellow')}>
                                {s.prefix}
                                {f.reg_number}
                              </span>
                            ) : null}
                            {f.reg_number && f.primary_topic ? ' ' : ''}
                            {f.primary_topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.section>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Tutor's briefing</HubSectionHeading>
        <motion.div variants={itemVariants} className={cn(CARD, 'px-4 py-5 sm:px-6 sm:py-6')}>
          {brief.length === 0 ? (
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-3 w-3 animate-pulse rounded-full bg-elec-yellow" />
              <span className="text-[13px] text-white">Preparing the tutor's briefing…</span>
            </div>
          ) : (
            <MarkdownBrief text={brief} isStreaming={!briefComplete} />
          )}
        </motion.div>
      </motion.section>
    </>
  );
}

/* ==========================================================================
   Markdown briefing renderer
   ========================================================================== */

function normaliseBriefMarkdown(raw: string): string {
  return (
    raw
      .replace(/\r\n/g, '\n')
      // Ensure blank line before every heading
      .replace(/([^\n])\n(#{1,3}\s)/g, '$1\n\n$2')
      // Ensure blank line after every heading
      .replace(/(^|\n)(#{1,3} [^\n]+)\n(?!\n)/g, '$1$2\n\n')
      // Double-newline between sentence-boundaries joined by single newline
      .replace(/([.!?])\n(?!\n|[-*\d#]|\s*$)/g, '$1\n\n')
  );
}

function parseBriefSections(md: string): Array<{ title: string | null; body: string }> {
  const parts: Array<{ title: string | null; body: string }> = [];
  const lines = md.split('\n');
  let cur: { title: string | null; body: string } = { title: null, body: '' };
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      if (cur.body.trim() || cur.title) parts.push(cur);
      cur = { title: m[1].trim(), body: '' };
    } else {
      cur.body += line + '\n';
    }
  }
  if (cur.body.trim() || cur.title) parts.push(cur);
  return parts;
}

const BRIEF_PROSE_CLASSES = cn(
  'prose prose-invert max-w-none',
  'prose-headings:tracking-tight prose-headings:text-white',
  'prose-h1:text-[20px] prose-h1:font-semibold prose-h1:mt-0 prose-h1:mb-4',
  'prose-h3:text-[15px] prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2',
  'prose-p:text-[14.5px] sm:prose-p:text-[15px] prose-p:leading-[1.7] prose-p:text-white',
  'prose-p:my-0 [&_p+p]:mt-4',
  'prose-ul:my-4 prose-ol:my-4 prose-ul:space-y-1.5 prose-ol:space-y-1.5',
  'prose-li:text-[14px] prose-li:text-white prose-li:leading-[1.6] prose-li:pl-1',
  'prose-li:marker:text-white',
  'prose-strong:text-white prose-strong:font-semibold',
  'prose-em:text-white prose-em:italic',
  'prose-code:text-elec-yellow prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[12.5px] prose-code:before:content-none prose-code:after:content-none',
  'prose-blockquote:border-l-2 prose-blockquote:border-white/30 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:my-5',
  'prose-hr:border-white/[0.10] prose-hr:my-6'
);

const StreamCaret = () => (
  <span
    className="ml-0.5 inline-block h-[1.1em] w-[3px] animate-pulse bg-elec-yellow align-[-0.1em]"
    aria-hidden
  />
);

const BriefChapter = memo(function BriefChapterInner({
  title,
  body,
  showCaret,
}: {
  title: string | null;
  body: string;
  showCaret?: boolean;
}) {
  return (
    <section className="min-w-0 max-w-[72ch]">
      {title && (
        <h2 className="mb-3 text-[17px] font-semibold leading-tight tracking-tight text-white sm:text-[19px]">
          {title}
        </h2>
      )}
      <div className={BRIEF_PROSE_CLASSES}>
        <ReactMarkdown>{body}</ReactMarkdown>
        {showCaret && <StreamCaret />}
      </div>
    </section>
  );
});

const MarkdownBriefInner = ({ text, isStreaming }: { text: string; isStreaming?: boolean }) => {
  const sections = useMemo(() => parseBriefSections(normaliseBriefMarkdown(text)), [text]);
  const lastIndex = sections.length - 1;
  return (
    <div className="divide-y divide-white/[0.06] [&>*+*]:pt-6 [&>*+*]:mt-6">
      {sections.map((s, i) => (
        <BriefChapter
          key={i}
          title={s.title}
          body={s.body}
          showCaret={Boolean(isStreaming && i === lastIndex)}
        />
      ))}
    </div>
  );
};

const MarkdownBrief = memo(MarkdownBriefInner);

/* ==========================================================================
   Saved text, cleaned for reading. Plans generated before 7 Oct carry the
   generator's context ids ("HSG85 (facet 2,14)"). The raw plan is what gets
   saved back; only what is shown goes through the cleaner. Markdown is
   cleaned line by line so its line breaks and list indents survive.
   ========================================================================== */

const cleanShown = cleanLessonShown;
const cleanDeep = cleanLessonDeep;

/* ==========================================================================
   The plan
   ========================================================================== */

type GroupId =
  | 'overview'
  | 'session'
  | 'briefing'
  | 'inclusion'
  | 'assessment'
  | 'safety'
  | 'resources'
  | 'references'
  | 'next';

const GROUP_LABEL: Record<GroupId, string> = {
  overview: 'Overview',
  session: 'The session',
  briefing: 'Tutor briefing',
  inclusion: 'Differentiation',
  assessment: 'Assessment',
  safety: 'Safety and values',
  resources: 'Resources',
  references: 'References',
  next: 'Next lesson',
};

function PlanView({
  plan: planProp,
  brief: briefProp,
  lessonId,
}: {
  plan: GeneratedLessonPlan;
  brief: string;
  lessonId: string | null;
}) {
  // Local, mutable copy so accepted AI refinements appear instantly. `raw`
  // is what is saved back; `plan` is the cleaned copy that is shown.
  const [raw, setRaw] = useState<GeneratedLessonPlan>(planProp);
  const [rawBrief, setRawBrief] = useState<string>(briefProp);
  useEffect(() => {
    setRaw(planProp);
    setRawBrief(briefProp);
  }, [planProp, briefProp]);
  const plan = useMemo(() => cleanDeep(raw), [raw]);
  const brief = useMemo(() => cleanShown(rawBrief), [rawBrief]);

  const { toast } = useToast();
  const canRefine = Boolean(lessonId && UUID_RE.test(lessonId));

  // Persist an accepted refinement to the plan row's content JSON
  const applyRefinement = async (key: RefinableSectionKey, value: unknown): Promise<boolean> => {
    if (!lessonId) return false;
    try {
      const next: GeneratedLessonPlan = { ...raw, [key]: value };
      const nextBrief = key === 'tutor_brief_markdown' ? (value as string) : rawBrief;
      /*
       * `content` is jsonb. This used to send `JSON.stringify(...)`, which
       * stores a JSON *string* scalar rather than an object — the generator
       * writes the object (its own comment says so), the slide-deck function
       * reads `plan.content.activities` off it directly, and the Lesson
       * Plans list reads `lesson.content` as an object. Send the object.
       */
      const { error } = await supabase
        .from('college_lesson_plans')
        .update({ content: { ...next, tutor_brief_markdown: nextBrief } as never })
        .eq('id', lessonId);
      if (error) throw error;
      setRaw(next);
      if (key === 'tutor_brief_markdown') setRawBrief(value as string);
      toast({ title: 'Refinement applied' });
      return true;
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const facetLookup = useMemo(
    () => new Map((plan.cited_facets ?? []).map((c) => [c.facet_id, c])),
    [plan.cited_facets]
  );

  const refineProps = { lessonId: canRefine ? lessonId : null, onAccept: applyRefinement };

  // A4 tags removed 7 Oct: updated_in is the source edition, not "changed by A4".

  const has = {
    briefing:
      Boolean(brief) ||
      Boolean(plan.analogies?.length) ||
      Boolean(plan.misconceptions?.length) ||
      Boolean(plan.board_work?.length) ||
      Boolean(plan.worked_examples?.length) ||
      Boolean(plan.vocabulary?.length),
    inclusion:
      Boolean(plan.differentiation) ||
      Boolean(plan.stretch_challenge?.length) ||
      Boolean(plan.inclusive_practice?.length),
    assessment:
      Boolean(plan.cold_call_questions?.length) ||
      Boolean(plan.exit_ticket?.length) ||
      Boolean(plan.assessment_for_learning?.length),
    safety: Boolean(plan.health_safety?.length) || Boolean(plan.british_values?.length),
    resources: canRefine,
    references: canRefine || Boolean(plan.cited_facets?.length),
    next: Boolean(plan.next_lesson_hint),
  };
  const groups: GroupId[] = [
    'overview',
    'session',
    ...(Object.keys(has) as Array<keyof typeof has>).filter((k) => has[k]),
  ];

  return (
    <div className="lg:grid lg:grid-cols-[188px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[208px_minmax(0,1fr)]">
      <SectionIndex groups={groups} />

      <div className="min-w-0 space-y-12 sm:space-y-14">
        <PlanGroup id="overview">
          <PlanSection heading="Learning objectives">
            <div className={CARD}>
              <ol className="divide-y divide-white/[0.06]">
                {plan.learning_objectives?.map((o, i) => (
                  <li key={i} className={cn(ROW, 'flex items-start gap-3.5')}>
                    <span
                      className={cn(
                        MONO,
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.16] text-[12px] font-semibold text-white'
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn(BODY, 'block text-[14.5px]')}>{o.text}</span>
                      {o.ac_codes?.length > 0 && (
                        <span className="mt-1 block text-[12px] font-semibold text-white">
                          Criteria {o.ac_codes.map(bareAcCode).join(', ')}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
              {(plan.audience_note || plan.prior_knowledge?.length > 0) && (
                <div
                  className={cn(
                    ROW,
                    'grid grid-cols-1 gap-4 border-t border-white/[0.06] md:grid-cols-2'
                  )}
                >
                  {plan.audience_note && (
                    <div>
                      <div className={SUB}>Who it is for</div>
                      <p className={cn(BODY, 'mt-0.5')}>{plan.audience_note}</p>
                    </div>
                  )}
                  {plan.prior_knowledge?.length > 0 && (
                    <div>
                      <div className={SUB}>Learners should already know</div>
                      <ul className="mt-1 space-y-1">
                        {plan.prior_knowledge.map((k, i) => (
                          <li key={i} className={cn(BODY, 'flex items-start gap-2.5')}>
                            <span
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white"
                              aria-hidden
                            />
                            <span className="flex-1">{k}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </PlanSection>
        </PlanGroup>

        <PlanGroup id="session">
          <PlanSection
            heading="Timeline"
            trailing={`${plan.duration_mins} min · ${plan.activities?.length ?? 0} activities`}
          >
            <Timeline activities={plan.activities ?? []} total={plan.duration_mins} />
            <ActivityList activities={plan.activities ?? []} facetLookup={facetLookup} />
          </PlanSection>

          {plan.homework && (
            <PlanSection heading="Homework" trailing={`${plan.homework.estimated_mins} min`}>
              <div className={cn(CARD, ROW)}>
                <p className={BODY}>{plan.homework.description}</p>
              </div>
            </PlanSection>
          )}
        </PlanGroup>

        {has.briefing && (
          <PlanGroup id="briefing">
            {brief && (
              <RefinableSection
                heading="Briefing notes"
                sectionKey="tutor_brief_markdown"
                collapsible
                renderPreview={(v, isStreaming) => (
                  <MarkdownBrief text={typeof v === 'string' ? v : ''} isStreaming={isStreaming} />
                )}
                {...refineProps}
              >
                <div className={cn(CARD, 'px-4 py-5 sm:px-6 sm:py-6')}>
                  <MarkdownBrief text={brief} />
                </div>
              </RefinableSection>
            )}

            {plan.analogies && plan.analogies.length > 0 && (
              <RefinableSection
                heading="Analogies"
                sectionKey="analogies"
                collapsible
                renderPreview={listPreview(AnalogiesList)}
                {...refineProps}
              >
                <AnalogiesList items={plan.analogies} />
              </RefinableSection>
            )}

            {plan.misconceptions && plan.misconceptions.length > 0 && (
              <RefinableSection
                heading="Common misconceptions"
                sectionKey="misconceptions"
                collapsible
                renderPreview={listPreview(MisconceptionsList)}
                {...refineProps}
              >
                <MisconceptionsList items={plan.misconceptions} />
              </RefinableSection>
            )}

            {plan.board_work && plan.board_work.length > 0 && (
              <RefinableSection
                heading="Board-work to sketch"
                sectionKey="board_work"
                collapsible
                renderPreview={listPreview(BoardWorkList)}
                {...refineProps}
              >
                <BoardWorkList items={plan.board_work} />
              </RefinableSection>
            )}

            {plan.worked_examples && plan.worked_examples.length > 0 && (
              <RefinableSection
                heading="Worked examples"
                sectionKey="worked_examples"
                collapsible
                renderPreview={listPreview(WorkedExamplesList)}
                {...refineProps}
              >
                <WorkedExamplesList items={plan.worked_examples} />
              </RefinableSection>
            )}

            {plan.vocabulary && plan.vocabulary.length > 0 && (
              <RefinableSection
                heading="Key vocabulary"
                sectionKey="vocabulary"
                collapsible
                renderPreview={listPreview(VocabularyList)}
                {...refineProps}
              >
                <VocabularyList items={plan.vocabulary} />
              </RefinableSection>
            )}
          </PlanGroup>
        )}

        {has.inclusion && (
          <PlanGroup id="inclusion">
            {plan.differentiation && (
              <PlanSection heading="Stretch and support" collapsible>
                <div className={CARD}>
                  <ul className="divide-y divide-white/[0.06]">
                    <DiffRow label="Stretch" items={plan.differentiation.stretch} />
                    <DiffRow label="Support" items={plan.differentiation.support} />
                    {plan.differentiation.send && plan.differentiation.send.length > 0 && (
                      <DiffRow label="SEND strategies" items={plan.differentiation.send} />
                    )}
                    {plan.differentiation.eal && plan.differentiation.eal.length > 0 && (
                      <DiffRow label="EAL strategies" items={plan.differentiation.eal} />
                    )}
                  </ul>
                </div>
              </PlanSection>
            )}

            {plan.stretch_challenge && plan.stretch_challenge.length > 0 && (
              <RefinableSection
                heading="Stretch and challenge tasks"
                sectionKey="stretch_challenge"
                collapsible
                renderPreview={listPreview(StretchList)}
                {...refineProps}
              >
                <StretchList items={plan.stretch_challenge} />
              </RefinableSection>
            )}

            {plan.inclusive_practice && plan.inclusive_practice.length > 0 && (
              <RefinableSection
                heading="Inclusive practice"
                sectionKey="inclusive_practice"
                collapsible
                renderPreview={listPreview(InclusiveList)}
                {...refineProps}
              >
                <InclusiveList items={plan.inclusive_practice} />
              </RefinableSection>
            )}
          </PlanGroup>
        )}

        {has.assessment && (
          <PlanGroup id="assessment">
            {plan.cold_call_questions && plan.cold_call_questions.length > 0 && (
              <RefinableSection
                heading="Cold-call questions"
                sectionKey="cold_call_questions"
                collapsible
                renderPreview={listPreview(ColdCallList)}
                {...refineProps}
              >
                <ColdCallList items={plan.cold_call_questions} />
              </RefinableSection>
            )}

            {plan.exit_ticket && plan.exit_ticket.length > 0 && (
              <RefinableSection
                heading="Exit ticket"
                sectionKey="exit_ticket"
                collapsible
                renderPreview={listPreview(ExitTicketList)}
                {...refineProps}
              >
                <ExitTicketList items={plan.exit_ticket} />
              </RefinableSection>
            )}

            {plan.assessment_for_learning?.length > 0 && (
              <PlanSection heading="Checks for understanding" collapsible>
                <div className={CARD}>
                  <ul className="divide-y divide-white/[0.06]">
                    {plan.assessment_for_learning.map((it, i) => (
                      <li key={i} className={cn(ROW, 'py-3 sm:py-3.5')}>
                        <p className={BODY}>{it}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </PlanSection>
            )}
          </PlanGroup>
        )}

        {has.safety && (
          <PlanGroup id="safety">
            {plan.health_safety && plan.health_safety.length > 0 && (
              <PlanSection heading="Health and safety" collapsible>
                <div className={CARD}>
                  <ul className="divide-y divide-white/[0.06]">
                    {plan.health_safety.map((h, i) => (
                      <li
                        key={i}
                        className={cn(ROW, 'grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2')}
                      >
                        <div>
                          <div className={SUB}>Risk</div>
                          <p className={cn(BODY, 'mt-0.5')}>{h.risk}</p>
                        </div>
                        <div>
                          <div className={SUB}>Control</div>
                          <p className={cn(BODY, 'mt-0.5')}>{h.control}</p>
                          {h.reg_ref && (
                            <div className="mt-1.5 text-[12px] font-semibold text-white">
                              {h.reg_ref}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </PlanSection>
            )}

            {plan.british_values && plan.british_values.length > 0 && (
              <RefinableSection
                heading="British values"
                sectionKey="british_values"
                collapsible
                renderPreview={listPreview(BritishValuesList)}
                {...refineProps}
              >
                <BritishValuesList items={plan.british_values} />
              </RefinableSection>
            )}
          </PlanGroup>
        )}

        {has.resources && lessonId && (
          <PlanGroup id="resources">
            <AttachedResourcesSection lessonId={lessonId} />
          </PlanGroup>
        )}

        {has.references && (
          <PlanGroup id="references">
            {canRefine && lessonId && (
              <AcsCoveredSection lessonId={lessonId} objectives={plan.learning_objectives ?? []} />
            )}

            {plan.cited_facets?.length > 0 && (
              <PlanSection
                heading="Regulation citations"
                trailing={`${plan.cited_facets.length}`}
                collapsible
              >
                <div className={CARD}>
                  <ul className="divide-y divide-white/[0.06]">
                    {plan.cited_facets.map((c, ci) => (
                      <li key={`${c.facet_id}-${ci}`} className={cn(ROW, 'py-3.5')}>
                        <div className="flex flex-wrap items-baseline gap-x-2 text-[13px] text-white">
                          <span className="font-semibold">{sourceLabel(c.document_type)}</span>
                          {c.reg_number && (
                            <span className={cn(MONO, 'font-semibold')}>{c.reg_number}</span>
                          )}
                        </div>
                        {c.citation_note && <p className={cn(BODY, 'mt-1')}>{c.citation_note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </PlanSection>
            )}
          </PlanGroup>
        )}

        {has.next && (
          <PlanGroup id="next">
            <PlanSection heading="Suggested next lesson">
              <div className={cn(CARD, ROW)}>
                <p className={BODY}>{plan.next_lesson_hint}</p>
              </div>
            </PlanSection>
          </PlanGroup>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   Section index — a sticky rail on desktop, a sticky chip row on phones.
   Highlights the group in view.
   ========================================================================== */

/** Where sticky things sit: below the app header and the 48px hub masthead. */
const STICKY_TOP = 'calc(var(--header-height, 0px) + 48px)';

function SectionIndex({ groups }: { groups: GroupId[] }) {
  const [active, setActive] = useState<GroupId>(groups[0]);
  const key = groups.join(',');

  useEffect(() => {
    const els = groups
      .map((g) => document.getElementById(`plan-${g}`))
      .filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace('plan-', '') as GroupId);
      },
      { rootMargin: '-120px 0px -55% 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Keep the active chip in view on the phone row.
  useEffect(() => {
    document
      .getElementById(`plan-chip-${active}`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  const go = (g: GroupId) => {
    setActive(g);
    document.getElementById(`plan-${g}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Phone and tablet: chips under the masthead. */}
      <nav
        aria-label="Sections"
        className="no-print sticky z-30 -mx-4 mb-8 border-b border-white/[0.06] px-4 backdrop-blur-sm lg:hidden"
        style={{
          // Under the app header and the 48px masthead, which stick the same way.
          top: STICKY_TOP,
          backgroundColor: 'hsl(var(--hub-ground, 0 0% 10%) / 0.95)',
        }}
      >
        <div className="-mx-4 flex overflow-x-auto px-2 hide-scrollbar">
          {groups.map((g) => (
            <button
              key={g}
              id={`plan-chip-${g}`}
              type="button"
              onClick={() => go(g)}
              aria-current={active === g ? 'true' : undefined}
              className={cn(
                'relative inline-flex h-11 shrink-0 items-center whitespace-nowrap px-3 text-[13px] text-white transition-colors touch-manipulation',
                active === g ? 'font-semibold' : 'font-medium'
              )}
            >
              {GROUP_LABEL[g]}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-3 bottom-0 h-[2px] rounded-full',
                  active === g ? 'bg-elec-yellow' : 'bg-transparent'
                )}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: a rail beside the plan. */}
      <nav aria-label="Sections" className="no-print hidden lg:block">
        <div className="sticky" style={{ top: `calc(${STICKY_TOP} + 24px)` }}>
          <p className="mb-2 px-3 text-[13px] font-semibold text-white">In this plan</p>
          <ul className="space-y-0.5">
            {groups.map((g) => (
              <li key={g}>
                <button
                  type="button"
                  onClick={() => go(g)}
                  aria-current={active === g ? 'true' : undefined}
                  className={cn(
                    'flex h-11 w-full items-center rounded-xl px-3 text-left text-[13.5px] transition-colors touch-manipulation',
                    active === g
                      ? 'bg-white/[0.08] font-semibold text-white'
                      : 'font-medium text-white hover:bg-white/[0.04]'
                  )}
                >
                  {GROUP_LABEL[g]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

function PlanGroup({ id, children }: { id: GroupId; children: React.ReactNode }) {
  return (
    <section
      id={`plan-${id}`}
      className="space-y-5"
      // Clear the app header, the masthead and (on phones) the chip row.
      style={{ scrollMarginTop: `calc(${STICKY_TOP} + 80px)` }}
      aria-labelledby={`plan-${id}-h`}
    >
      <h2
        id={`plan-${id}-h`}
        className="border-b border-white/[0.08] pb-3 text-[22px] font-bold tracking-tight text-white sm:text-[24px]"
      >
        {GROUP_LABEL[id]}
      </h2>
      {children}
    </section>
  );
}

/* ==========================================================================
   Collapse — a long section opens as a short preview with "Read all".
   ========================================================================== */

function Collapse({ children, preview = 220 }: { children: React.ReactNode; preview?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollHeight > preview + 64);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [preview]);

  const clipped = overflows && !open;
  return (
    <div>
      <div
        ref={ref}
        className={cn(
          clipped &&
            'overflow-hidden print:!max-h-none print:overflow-visible print:![mask-image:none]'
        )}
        style={
          clipped
            ? {
                maxHeight: preview,
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
              }
            : undefined
        }
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(COLLEGE_BTN, 'no-print mt-3')}
        >
          {open ? 'Show less' : 'Read all'}
        </button>
      )}
    </div>
  );
}

/* ==========================================================================
   Section shells
   ========================================================================== */

function PlanSection({
  heading,
  trailing,
  action,
  panel,
  collapsible,
  children,
}: {
  heading: string;
  /** Quiet figure on the right of the heading — a count, a duration. */
  trailing?: string;
  /** A control on the right of the heading (the refine toggle). */
  action?: React.ReactNode;
  /** Full-width panel between the heading and the body (the refine draft). */
  panel?: React.ReactNode;
  /** Long prose: open as a short preview with "Read all". */
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.div variants={itemVariants} className="flex min-h-11 items-end justify-between gap-4">
        <h3 className="text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
          {heading}
        </h3>
        {action ? (
          <div className="no-print shrink-0">{action}</div>
        ) : trailing ? (
          <span className="shrink-0 pb-0.5 text-[12px] font-semibold text-white">{trailing}</span>
        ) : null}
      </motion.div>
      {panel && (
        <motion.div variants={itemVariants} className="no-print">
          {panel}
        </motion.div>
      )}
      <motion.div variants={itemVariants} className={cn('space-y-3', panel && 'opacity-60')}>
        {collapsible ? <Collapse>{children}</Collapse> : children}
      </motion.div>
    </motion.section>
  );
}

/* ==========================================================================
   Timeline — the session arc, in one neutral bar
   ========================================================================== */

const PHASE_LABEL: Record<GeneratedActivity['phase'], string> = {
  starter: 'Starter',
  input: 'Input',
  modelling: 'Modelling',
  practice: 'Practice',
  practical: 'Practical',
  afl: 'Check',
  plenary: 'Plenary',
};

function Timeline({ activities, total }: { activities: GeneratedActivity[]; total: number }) {
  if (!activities.length || total <= 0) return null;
  return (
    <div className={cn(CARD, ROW)}>
      <div className="flex h-10 overflow-hidden rounded-lg">
        {activities.map((a, i) => {
          const pct = Math.max(2, (a.time_mins / total) * 100);
          return (
            <div
              key={i}
              className={cn(
                'flex min-w-0 items-center justify-center',
                i % 2 === 0 ? 'bg-white/[0.18]' : 'bg-white/[0.10]',
                i > 0 && 'border-l border-elec-dark'
              )}
              style={{ width: `${pct}%` }}
              title={`${a.title} · ${a.time_mins} min`}
            >
              <span className={cn(MONO, 'truncate px-1 text-[12px] font-semibold text-white')}>
                {a.time_mins}′
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2 h-4">
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <span
            key={p}
            className={cn(MONO, 'absolute top-0 -translate-x-1/2 text-[12px] text-white')}
            style={{ left: `${p * 100}%` }}
          >
            {Math.round(p * total)}′
          </span>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Activities
   ========================================================================== */

function formatClock(mins: number): string {
  const m = Math.floor(mins);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/**
 * The references an activity cites, once each. The generator can cite the
 * same regulation under several context ids, which used to print
 * "OSG 12.5 · OSG 12.5 · OSG 12.5". A reference with no number shows the
 * document name alone (it used to say "ref"), and only when that document
 * has no numbered reference in the same activity.
 */
function activityRefs(ids: string[] | undefined, lookup: Map<string, GeneratedCitation>) {
  const seen = new Set<string>();
  const out: Array<{ key: string; doc: string; num: string | null; note: string | null }> = [];
  const cited = (ids ?? [])
    .map((id) => lookup.get(id))
    .filter((c): c is GeneratedCitation => Boolean(c));
  const numberedDocs = new Set(
    cited.filter((c) => c.reg_number?.trim()).map((c) => c.document_type)
  );
  for (const c of cited) {
    const num = c.reg_number?.trim() || null;
    if (!num && numberedDocs.has(c.document_type)) continue;
    const key = `${c.document_type}|${num ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ key, doc: sourceShort(c.document_type), num, note: c.citation_note ?? null });
  }
  return out;
}

function ActivityList({
  activities,
  facetLookup,
}: {
  activities: GeneratedActivity[];
  facetLookup: Map<string, GeneratedCitation>;
}) {
  if (activities.length === 0) {
    return (
      <div className={cn(CARD, ROW)}>
        <p className={BODY}>No activities in this plan yet.</p>
      </div>
    );
  }
  let cursor = 0;
  return (
    <div className={CARD}>
      <ol className="divide-y divide-white/[0.06]">
        {activities.map((a, i) => {
          const start = cursor;
          cursor += a.time_mins;
          const end = cursor;
          const regs = activityRefs(a.cited_facet_ids, facetLookup);
          return (
            <li
              key={i}
              className={cn(
                ROW,
                'grid grid-cols-1 gap-y-2 py-5 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-x-6 sm:py-6'
              )}
            >
              {/* A phone gets the times on one line above the activity; the
                  narrow time column squeezed the title. */}
              <div
                className={cn(
                  MONO,
                  'flex flex-wrap items-baseline gap-x-2 text-[13px] leading-tight text-white sm:block sm:text-[12px]'
                )}
              >
                <div className="text-[15px] font-semibold">{formatClock(start)}</div>
                <div className="sm:mt-0.5">to {formatClock(end)}</div>
                <div className="font-semibold sm:mt-2 sm:inline-flex sm:h-6 sm:items-center sm:rounded-full sm:border sm:border-white/[0.16] sm:px-2 sm:text-[12px]">
                  <span className="sm:hidden">· </span>
                  {a.time_mins} min
                </div>
              </div>
              <div className="min-w-0 space-y-3">
                <div>
                  <div className={SUB}>
                    {i + 1}. {PHASE_LABEL[a.phase] ?? a.phase}
                  </div>
                  <div className="mt-0.5 text-[16px] font-semibold leading-snug text-white">
                    {a.title}
                  </div>
                  <p className={cn(BODY, 'mt-1.5 max-w-[80ch]')}>{a.description}</p>
                </div>

                {a.student_focus && (
                  <p className={cn(BODY, 'max-w-[80ch]')}>
                    <span className="font-semibold">Learners: </span>
                    {a.student_focus}
                  </p>
                )}

                {a.teacher_moves && a.teacher_moves.length > 0 && (
                  <div>
                    <div className={SUB}>Teacher moves</div>
                    <ul className="mt-1 max-w-[80ch] space-y-1">
                      {a.teacher_moves.map((m, mi) => (
                        <li key={mi} className={cn(BODY, 'flex items-start gap-2.5')}>
                          <span
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white"
                            aria-hidden
                          />
                          <span className="flex-1">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {a.check_for_understanding && (
                  <div className="max-w-[80ch] rounded-xl bg-white/[0.05] px-3.5 py-2.5">
                    <div className={SUB}>Check for understanding</div>
                    <p className={cn(BODY, 'mt-0.5')}>{a.check_for_understanding}</p>
                  </div>
                )}

                {((a.resources_needed && a.resources_needed.length > 0) || regs.length > 0) && (
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-6">
                    {a.resources_needed && a.resources_needed.length > 0 && (
                      <p className={cn(BODY, 'min-w-0 flex-1 text-[12.5px]')}>
                        <span className="font-semibold">Resources: </span>
                        {a.resources_needed.join(', ')}
                      </p>
                    )}
                    {regs.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-0.5 text-[12.5px] font-semibold text-white">Regs</span>
                        {regs.map((r) => (
                          <span
                            key={r.key}
                            title={r.note ?? undefined}
                            className="inline-flex h-6 items-center gap-1 rounded-full border border-white/[0.16] px-2.5 text-[12px] text-white"
                          >
                            {r.doc}
                            {r.num && <span className={cn(MONO, 'font-semibold')}>{r.num}</span>}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function sourceShort(t: GeneratedCitation['document_type']) {
  return t === 'bs7671' ? 'BS 7671' : t === 'gn3' ? 'GN3' : 'OSG';
}
function sourceLabel(t: GeneratedCitation['document_type']) {
  return t === 'bs7671' ? 'BS 7671' : t === 'gn3' ? 'Guidance Note 3' : 'On-Site Guide';
}

/* ==========================================================================
   List cards — one component per section, shared by the plan and by the
   refine preview so a draft looks exactly like what it will replace.
   ========================================================================== */

type Items<T> = { items: T[] | undefined };

function AnalogiesList({ items }: Items<NonNullable<GeneratedLessonPlan['analogies']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((a, i) => (
          <li key={i} className={ROW}>
            <div className="text-[14px] font-semibold text-white">{a.name}</div>
            <p className={cn(BODY, 'mt-1')}>{a.description}</p>
            <p className={cn(BODY, 'mt-1.5 text-[12.5px]')}>
              <span className="font-semibold">When to use · </span>
              {a.when_to_use}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MisconceptionsList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['misconceptions']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((m, i) => (
          <li key={i} className={cn(ROW, 'grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2')}>
            <div>
              <div className={SUB}>Apprentice believes</div>
              <p className={cn(BODY, 'mt-0.5')}>{m.belief}</p>
            </div>
            <div>
              <div className={cn(SUB, 'text-white')}>Correction</div>
              <p className={cn(BODY, 'mt-0.5')}>{m.correction}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoardWorkList({ items }: Items<NonNullable<GeneratedLessonPlan['board_work']>[number]>) {
  return (
    <div className={CARD}>
      <ol className="divide-y divide-white/[0.06]">
        {items?.map((b, i) => (
          <li key={i} className={cn(ROW, 'flex items-start gap-3')}>
            <span className={cn(MONO, 'shrink-0 pt-0.5 text-[12px] font-semibold text-white')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold text-white">{b.title}</div>
              <p className={cn(BODY, 'mt-1')}>{b.description}</p>
              {b.labels?.length > 0 && (
                <div className={cn(MONO, 'mt-1.5 text-[12px] text-white')}>
                  {b.labels.join(' · ')}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WorkedExamplesList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['worked_examples']>[number]>) {
  return (
    <div className={CARD}>
      <ol className="divide-y divide-white/[0.06]">
        {items?.map((w, i) => (
          <li key={i} className={cn(ROW, 'space-y-2.5')}>
            <div>
              <div className={SUB}>Scenario {String(i + 1).padStart(2, '0')}</div>
              <p className={cn(BODY, 'mt-0.5')}>{w.scenario}</p>
            </div>
            <ol className="space-y-1.5">
              {w.working?.map((step, si) => (
                <li key={si} className={cn(BODY, 'flex items-start gap-3')}>
                  <span className={cn(MONO, 'w-4 shrink-0 font-semibold text-white')}>
                    {si + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-xl bg-white/[0.05] px-3.5 py-2.5">
              <div className="text-[12px] font-semibold text-white">Answer</div>
              <p className={cn(BODY, 'mt-0.5 font-medium')}>{w.answer}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ColdCallList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['cold_call_questions']>[number]>) {
  return (
    <div className={CARD}>
      <ol className="divide-y divide-white/[0.06]">
        {items?.map((q, i) => (
          <li key={i} className={cn(ROW, 'flex items-start gap-3')}>
            <span className={cn(MONO, 'shrink-0 pt-0.5 text-[12px] font-semibold text-white')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className={cn(BODY, 'min-w-0 flex-1 text-[14px]')}>{q.question}</p>
                <BloomLabel level={q.bloom_level} />
              </div>
              {q.expected_answer && (
                <p className={cn(BODY, 'mt-1.5 text-[12.5px]')}>
                  <span className="font-semibold">Expected · </span>
                  {q.expected_answer}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ExitTicketList({ items }: Items<NonNullable<GeneratedLessonPlan['exit_ticket']>[number]>) {
  return (
    <div className={CARD}>
      <ol className="divide-y divide-white/[0.06]">
        {items?.map((e, i) => (
          <li key={i} className={ROW}>
            <div className={SUB}>Q{i + 1}</div>
            <p className={cn(BODY, 'mt-0.5 font-medium')}>{e.question}</p>
            <p className={cn(BODY, 'mt-1.5 text-[12.5px]')}>
              <span className="font-semibold text-white">Answer · </span>
              {e.answer}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function VocabularyList({ items }: Items<NonNullable<GeneratedLessonPlan['vocabulary']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((w, i) => (
          <li
            key={i}
            className={cn(ROW, 'grid grid-cols-1 gap-1 py-3 sm:grid-cols-[200px_1fr] sm:gap-6')}
          >
            <div className="text-[13.5px] font-semibold text-white">{w.term}</div>
            <p className={BODY}>{w.definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const BRITISH_VALUE_LABELS: Record<string, string> = {
  democracy: 'Democracy',
  rule_of_law: 'The rule of law',
  individual_liberty: 'Individual liberty',
  mutual_respect: 'Mutual respect',
  tolerance_of_faiths_beliefs: 'Tolerance of faiths and beliefs',
};
function britishValueLabel(v: string) {
  return BRITISH_VALUE_LABELS[v] ?? v.replace(/_/g, ' ');
}

const INCLUSIVE_NEED_LABELS: Record<string, string> = {
  send: 'SEND',
  eal: 'EAL',
  ehcp: 'EHCP',
  neurodivergent: 'Neurodivergent',
  prior_attainment_low: 'Lower prior attainment',
  prior_attainment_high: 'Higher prior attainment',
  physical_access: 'Physical access',
  other: 'Other',
};
function inclusiveNeedLabel(v: string) {
  return INCLUSIVE_NEED_LABELS[v] ?? v.replace(/_/g, ' ');
}

function BritishValuesList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['british_values']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((bv, i) => (
          <li key={i} className={ROW}>
            <div className={SUB}>
              {britishValueLabel(bv.value)}
              {bv.activity_ref ? ` · ${bv.activity_ref}` : ''}
            </div>
            <p className={cn(BODY, 'mt-0.5')}>{bv.how_embedded}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StretchList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['stretch_challenge']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((s, i) => (
          <li key={i} className={ROW}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="text-[14px] font-semibold text-white">{s.title}</div>
              <BloomLabel level={s.bloom_level as BloomLevel} />
            </div>
            <p className={cn(BODY, 'mt-1')}>{s.task}</p>
            <p className={cn(BODY, 'mt-1.5 text-[12.5px]')}>
              <span className="font-semibold">For · </span>
              {s.target_learner}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InclusiveList({
  items,
}: Items<NonNullable<GeneratedLessonPlan['inclusive_practice']>[number]>) {
  return (
    <div className={CARD}>
      <ul className="divide-y divide-white/[0.06]">
        {items?.map((ip, i) => (
          <li key={i} className={ROW}>
            <div className={SUB}>
              {inclusiveNeedLabel(ip.need)}
              {ip.activity_ref ? ` · ${ip.activity_ref}` : ''}
            </div>
            <p className={cn(BODY, 'mt-0.5')}>{ip.strategy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiffRow({ label, items }: { label: string; items: string[] }) {
  return (
    <li className={ROW}>
      <div className={SUB}>{label}</div>
      <ul className="mt-1 space-y-1">
        {(items ?? []).map((it, i) => (
          <li key={i} className={cn(BODY, 'flex items-start gap-2.5')}>
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white" aria-hidden />
            <span className="flex-1">{it}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function BloomLabel({ level }: { level: BloomLevel }) {
  const labels: Record<BloomLevel, string> = {
    recall: 'Recall',
    understand: 'Understand',
    apply: 'Apply',
    analyse: 'Analyse',
    evaluate: 'Evaluate',
    create: 'Create',
  };
  return (
    <span className="shrink-0 text-[12px] font-semibold text-white">{labels[level] ?? level}</span>
  );
}

/** Wraps a list card as a refine preview: a streaming hint until the draft parses. */
function listPreview<T>(List: (props: Items<T>) => JSX.Element) {
  return (v: unknown, isStreaming: boolean) => {
    if (isStreaming || !Array.isArray(v)) return <StreamingHint />;
    return <List items={v as T[]} />;
  };
}

function StreamingHint() {
  return (
    <div className={cn(CARD, ROW, 'flex items-center gap-3')}>
      <span aria-hidden className="h-3 w-3 animate-pulse rounded-full bg-elec-yellow" />
      <span className="text-[13px] text-white">Rewriting this section…</span>
    </div>
  );
}

/* ==========================================================================
   Section refine — AI edit for a single section
   ========================================================================== */

const REFINE_PRESETS: Record<string, { label: string; instruction: string }[]> = {
  default: [
    { label: 'Shorter', instruction: 'Make this section shorter and tighter. Cut filler.' },
    {
      label: 'More detail',
      instruction: 'Expand with more concrete detail and specific examples.',
    },
    { label: 'Simpler', instruction: 'Simplify the language for Level 2 apprentices.' },
    { label: 'Harder', instruction: 'Raise the challenge to Level 3 / HND depth.' },
    {
      label: 'More practical',
      instruction: 'Lean into practical, hands-on content rather than theory.',
    },
    { label: 'Add an example', instruction: 'Add one more concrete worked example.' },
  ],
  cold_call_questions: [
    { label: 'Harder', instruction: 'Make the questions harder: push into analyse and evaluate.' },
    { label: 'Simpler', instruction: 'Simpler questions for early apprentices.' },
    { label: 'Add 3 more', instruction: 'Add three more questions covering different ACs.' },
    {
      label: 'More scenario-based',
      instruction: 'Convert questions into scenario-based prompts from real jobs.',
    },
  ],
  vocabulary: [
    { label: 'Add 5 more', instruction: 'Add five more essential terms for this topic.' },
    { label: 'Simpler definitions', instruction: 'Simpler one-line definitions for apprentices.' },
    {
      label: 'Link to the regulations',
      instruction:
        'Tie each term to the regulation or guidance section it comes from, using only the references already cited in this plan.',
    },
  ],
  tutor_brief_markdown: [
    { label: 'Shorter', instruction: 'Tighten the whole briefing by about a third.' },
    { label: 'More analogies', instruction: 'Add richer analogies throughout the briefing.' },
    {
      label: 'Deeper subject knowledge',
      instruction: 'Go deeper on the physics / regulatory reasoning.',
    },
    { label: 'More warmth', instruction: 'Warmer, more colleague-to-colleague tone.' },
  ],
};

/**
 * A section whose body can be rewritten by AI. The toggle sits on the right
 * of the heading as a volt text label; the instruction panel and the draft
 * render full-width between the heading and the body, never as a popover —
 * a 460px absolute panel was unreachable on a phone.
 */
function RefinableSection({
  heading,
  children,
  lessonId,
  sectionKey,
  onAccept,
  renderPreview,
  collapsible,
}: {
  heading: string;
  children: React.ReactNode;
  collapsible?: boolean;
  lessonId: string | null;
  sectionKey: RefinableSectionKey;
  onAccept: (key: RefinableSectionKey, value: unknown) => Promise<boolean>;
  renderPreview: (value: unknown, isStreaming: boolean) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [saving, setSaving] = useState(false);
  const refine = useRefineSection();

  const presets = REFINE_PRESETS[sectionKey] ?? REFINE_PRESETS.default;

  const submit = (text: string) => {
    if (!lessonId || !text.trim() || refine.loading) return;
    refine
      .refine({
        lesson_plan_id: lessonId,
        section_key: sectionKey,
        instruction: text,
        preset: null,
      })
      .catch(() => {
        /* surfaced via error state */
      });
  };

  const accept = async () => {
    if (refine.value === null || refine.value === undefined) return;
    setSaving(true);
    const ok = await onAccept(sectionKey, refine.value);
    setSaving(false);
    if (ok) {
      refine.reset();
      setOpen(false);
      setInstruction('');
    }
  };

  const discard = () => {
    refine.reset();
    setInstruction('');
  };

  const close = () => {
    if (refine.loading) return;
    setOpen(false);
    if (refine.value === null) {
      refine.reset();
      setInstruction('');
    }
  };

  const phaseLabel = refine.loading
    ? refine.phase === 'loading_plan'
      ? 'Loading plan…'
      : refine.phase === 'loading_rag'
        ? 'Loading references…'
        : refine.phase === 'composing'
          ? 'Rewriting…'
          : 'Starting…'
    : refine.value
      ? 'Draft ready. Accept or discard it below.'
      : '';

  const toggle = lessonId ? (
    <button
      type="button"
      onClick={() => (open ? close() : setOpen(true))}
      className="-my-1 inline-flex h-11 items-center rounded-xl border border-white/[0.16] px-3.5 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4]"
    >
      {open ? 'Close' : 'Rewrite'}
    </button>
  ) : undefined;

  const showDraft = refine.loading || refine.value !== null;

  const panel =
    open || showDraft ? (
      <div className={cn(CARD, '!border-white/[0.24]')}>
        {open && (
          <div className={cn(ROW, 'space-y-3')}>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  disabled={refine.loading}
                  onClick={() => submit(p.instruction)}
                  className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.10] disabled:opacity-60"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={refine.loading}
              placeholder="Or say exactly what to change…"
              rows={2}
              className="input-underline w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="min-w-0 truncate text-[12px] text-white">{phaseLabel}</span>
              <button
                type="button"
                onClick={() => submit(instruction)}
                disabled={refine.loading || !instruction.trim()}
                className="h-11 w-full rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:border disabled:border-white/[0.12] disabled:bg-transparent disabled:text-white sm:w-auto"
              >
                {refine.loading ? 'Refining…' : 'Refine'}
              </button>
            </div>
            {refine.error && (
              <p className="text-[12.5px] leading-relaxed text-red-300">{refine.error}</p>
            )}
          </div>
        )}

        {showDraft && (
          <div className={cn(open && 'border-t border-white/[0.10]')}>
            <div className={cn(ROW, 'flex flex-wrap items-center justify-between gap-3 py-3')}>
              <span className="text-[12px] font-bold text-elec-yellow">
                {refine.loading
                  ? 'Suggested rewrite · writing'
                  : 'Suggested rewrite · ready to review'}
              </span>
              {refine.value !== null && !refine.loading && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={discard}
                    disabled={saving}
                    className="h-11 rounded-full border border-white/[0.12] px-4 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={accept}
                    disabled={saving}
                    className="h-11 rounded-full bg-elec-yellow px-4 text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:border disabled:border-white/[0.12] disabled:bg-transparent disabled:text-white"
                  >
                    {saving ? 'Saving…' : 'Accept draft'}
                  </button>
                </div>
              )}
            </div>
            {/* The preview components render their own CARD; inside this
                panel that would be a card in a card, so strip it back to
                the rows. */}
            <div className="[&>div]:mx-0 [&>div]:!border-0 [&>div]:!bg-transparent [&>div]:shadow-none [&>div]:!rounded-none">
              {renderPreview(
                cleanDeep(refine.value ?? refine.streamText),
                refine.loading && refine.value === null
              )}
            </div>
          </div>
        )}
      </div>
    ) : null;

  return (
    <PlanSection heading={heading} action={toggle} panel={panel} collapsible={collapsible}>
      {children}
    </PlanSection>
  );
}

/* ==========================================================================
   Attached resources — from the Materials library
   ========================================================================== */

function AttachedResourcesSection({ lessonId }: { lessonId: string }) {
  const navigate = useNavigate();
  const { resources, loading } = useLessonResources(lessonId);

  const kindLabel = (kind: string | null | undefined) =>
    kind === 'document'
      ? 'Document'
      : kind === 'slide'
        ? 'Slides'
        : kind === 'sheet'
          ? 'Sheet'
          : kind === 'image'
            ? 'Image'
            : kind === 'video'
              ? 'Video'
              : kind === 'audio'
                ? 'Audio'
                : kind === 'link'
                  ? 'Link'
                  : 'File';

  return (
    <PlanSection
      heading="Attached from the library"
      action={
        <button
          type="button"
          onClick={() => navigate('/college?section=teachingresources')}
          className="-my-1 inline-flex h-11 items-center rounded-xl border border-white/[0.16] px-3.5 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4]"
        >
          Open the library
        </button>
      }
    >
      <div className={CARD}>
        {loading ? (
          <div className={cn(ROW, 'text-[13px] text-white')}>Loading resources…</div>
        ) : resources.length === 0 ? (
          <div className={cn(ROW, 'text-[13px] text-white')}>
            Nothing attached yet. Link a document, deck or video to this plan from the library.
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {resources.map((r) => {
              const onOpen = async () => {
                if (r.external_url) {
                  window.open(r.external_url, '_blank', 'noopener');
                  return;
                }
                if (r.file_path) {
                  const { data } = await supabase.storage
                    .from('college-resources')
                    .createSignedUrl(r.file_path, 60 * 10);
                  if (data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener');
                }
              };
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={onOpen}
                    className="flex min-h-11 w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {cleanLessonText(r.title)}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                        {[kindLabel(r.kind), r.mime_type].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </PlanSection>
  );
}

/* ==========================================================================
   ACs covered — the mapping rows the generator wrote, which is what the
   coverage matrix and the Lesson Plans filters actually read. Falls back to
   the codes on the objectives for a plan generated without a save.
   ========================================================================== */

interface AcMappingRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  mapping_source: string;
}

const MAPPING_SOURCE_LABEL: Record<string, string> = {
  tutor: 'Tagged by tutor',
  ai_suggested: 'Suggested by AI',
  ai_confirmed: 'Confirmed',
};

function AcsCoveredSection({
  lessonId,
  objectives,
}: {
  lessonId: string;
  objectives: GeneratedLessonPlan['learning_objectives'];
}) {
  const [rows, setRows] = useState<AcMappingRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('lesson_plan_ac_mapping')
      .select('qualification_code, unit_code, ac_code, mapping_source')
      .eq('lesson_plan_id', lessonId)
      .order('unit_code')
      .order('ac_code')
      .then(({ data }) => {
        if (cancelled) return;
        setRows((data ?? []) as AcMappingRow[]);
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const fallback = useMemo(() => {
    const codes = new Set<string>();
    for (const o of objectives ?? []) for (const c of o.ac_codes ?? []) codes.add(bareAcCode(c));
    return Array.from(codes).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [objectives]);

  const grouped = useMemo(() => {
    const map = new Map<string, AcMappingRow[]>();
    for (const r of rows ?? []) {
      const key = `${r.qualification_code} · Unit ${r.unit_code}`;
      map.set(key, [...(map.get(key) ?? []), r]);
    }
    return Array.from(map.entries());
  }, [rows]);

  const count = rows ? rows.length : fallback.length;

  return (
    <PlanSection heading="Criteria covered" trailing={rows === null ? undefined : `${count}`}>
      <div className={CARD}>
        {rows === null ? (
          <div className={cn(ROW, 'text-[13px] text-white')}>Loading…</div>
        ) : grouped.length > 0 ? (
          <ul className="divide-y divide-white/[0.06]">
            {grouped.map(([unit, list]) => (
              <li key={unit} className={ROW}>
                <div className={SUB}>{unit}</div>
                <div className={cn(MONO, 'mt-1 text-[13px] font-semibold text-white')}>
                  {list.map((r) => r.ac_code).join(' · ')}
                </div>
                <div className="mt-1 text-[12px] text-white">
                  {Array.from(
                    new Set(
                      list.map((r) => MAPPING_SOURCE_LABEL[r.mapping_source] ?? r.mapping_source)
                    )
                  ).join(' · ')}
                </div>
              </li>
            ))}
          </ul>
        ) : fallback.length > 0 ? (
          <div className={ROW}>
            <div className={cn(MONO, 'text-[13px] font-semibold text-white')}>
              {fallback.join(' · ')}
            </div>
            <div className="mt-1 text-[12px] text-white">
              From the objectives. Not yet mapped against the qualification.
            </div>
          </div>
        ) : (
          <div className={cn(ROW, 'text-[13px] text-white')}>
            No assessment criteria mapped to this plan.
          </div>
        )}
      </div>
    </PlanSection>
  );
}
