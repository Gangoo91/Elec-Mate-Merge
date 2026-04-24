import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  LoadingState,
  PrimaryButton,
  itemVariants,
} from '@/components/college/primitives';
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

/* ==========================================================================
   LessonPlanPage
   - /college/lessons/:id           → load persisted plan
   - /college/lessons/new?q=...     → stream a fresh generation
   Design goal: a world-class tutor-facing lesson plan. Clear flight-plan
   cover, visual session timeline, clock-timed activity cards with teacher
   moves & AFL checks, craft sections (briefing, analogies, misconceptions,
   board-work, worked examples, cold-call, exit ticket, vocabulary),
   differentiation, H&S, homework, citations. Sticky section nav on desktop.
   ========================================================================== */

export default function LessonPlanPage() {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isNew = !id || id === 'new';
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
      navigate('/college', { replace: true });
      return;
    }

    const input: GenerateLessonInput = {
      qualification_code,
      unit_code,
      ac_codes: acsStr.split(','),
      session_length_mins: Number(search.get('len') ?? '90'),
      delivery_mode:
        (search.get('mode') as GenerateLessonInput['delivery_mode']) ?? 'classroom',
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
            navigate(`/college/lessons/${result.lesson_plan_id}`, { replace: true });
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

  const plan = isNew ? gen.result?.plan ?? null : saved.plan;
  const loading = isNew ? gen.loading : saved.loading;
  const error = isNew ? gen.error : saved.error;
  const brief = isNew ? gen.briefText : (saved.plan?.tutor_brief_markdown ?? '');
  const streaming = isNew && loading && !plan;

  return (
    <PageFrame className="max-w-[1280px] lesson-plan-print-root">
      {/* Back link */}
      <motion.div variants={itemVariants} className="no-print">
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
        >
          ← Back
        </button>
      </motion.div>

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
        <motion.div
          variants={itemVariants}
          className="bg-[hsl(0_0%_12%)] border border-red-500/30 rounded-2xl px-6 py-6 sm:px-8 sm:py-7"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300 mb-2">
            Generation failed
          </div>
          <p className="text-[13.5px] text-white leading-relaxed break-words">{error}</p>
          <PrimaryButton
            onClick={() => window.location.reload()}
            className="mt-5"
          >
            Try again
          </PrimaryButton>
        </motion.div>
      )}

      {plan && !loading && (
        <PlanView
          plan={plan}
          brief={brief ?? ''}
          lessonId={gen.result?.lesson_plan_id ?? id ?? null}
        />
      )}

      {!isNew && loading && <LoadingState />}
    </PageFrame>
  );
}

/* ==========================================================================
   Streaming view
   ========================================================================== */

const PHASES = [
  { id: 'fetching_curriculum', label: 'Loading criteria' },
  { id: 'embedding_query', label: 'Analysing' },
  { id: 'searching_rag', label: 'Searching BS 7671' },
  { id: 'composing', label: 'Drafting' },
  { id: 'saving', label: 'Saving' },
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
    return Math.max(0, PHASES.findIndex((p) => p.id === phase));
  }, [phase, brief.length, planBytes, briefComplete, planComplete]);

  const extractedTitle = useMemo(() => {
    const h1 = brief.match(/^#\s+(.+)$/m);
    return h1 ? h1[1].trim() : null;
  }, [brief]);

  return (
    <>
      {/* Flight-plan header */}
      <motion.div variants={itemVariants} className="relative pt-4 sm:pt-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          AI lesson generator · drafting
        </div>
        <h1 className="mt-2 text-[26px] sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight leading-[1.1]">
          {extractedTitle || 'Composing your lesson plan…'}
        </h1>
        <p className="mt-3 text-[13px] sm:text-sm text-white max-w-2xl leading-relaxed">
          Grounded in BS 7671:2018+A4:2026, Guidance Note 3 and the On-Site Guide. Sarah
          is drafting the tutor's briefing and structuring the session plan in parallel.
        </p>
      </motion.div>

      {/* Phase stepper */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/[0.06]">
            {PHASES.map((p, i) => {
              const state =
                i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'pending';
              return (
                <div
                  key={p.id}
                  className="bg-[hsl(0_0%_12%)] px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <div className="flex items-center gap-2">
                    <StepDot state={state} />
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div
                    className={cn(
                      'mt-2 text-[12.5px] leading-snug',
                      state === 'active'
                        ? 'text-white font-medium'
                        : state === 'done'
                          ? 'text-white'
                          : 'text-white'
                    )}
                  >
                    {p.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 sm:px-6 py-3.5 border-t border-white/[0.06] text-[11.5px] text-white flex items-center gap-x-4 gap-y-1 flex-wrap">
            {ragPreview && (
              <>
                <span>
                  <span className="text-white tabular-nums">{ragPreview.facets.length}</span>{' '}
                  regulation references loaded
                </span>
                <span className="text-white/25">·</span>
                <span>
                  <span className="tabular-nums">{ragPreview.bs7671}</span> BS 7671
                </span>
                <span className="text-white/25">·</span>
                <span>
                  <span className="tabular-nums">{ragPreview.gn3}</span> GN3
                </span>
                <span className="text-white/25">·</span>
                <span>
                  <span className="tabular-nums">{ragPreview.osg}</span> OSG
                </span>
                {ragPreview.a4_changes > 0 && (
                  <>
                    <span className="text-white/25">·</span>
                    <span className="text-amber-300">
                      <span className="tabular-nums">{ragPreview.a4_changes}</span> A4:2026
                    </span>
                  </>
                )}
              </>
            )}
            {!ragPreview && (meta?.facets_used as number) && (
              <span>Loading references…</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* RAG preview — grounding sources as three distinct cards */}
      {ragPreview && ragPreview.facets.length > 0 && (
        <motion.div variants={itemVariants}>
          <SectionEyebrow eyebrow="Grounded in" title="Regulation references" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <RagSourceCard
              title="BS 7671"
              subtitle="Wiring Regulations"
              facets={ragPreview.facets.filter((f) => f.document_type === 'bs7671')}
              regPrefix=""
            />
            <RagSourceCard
              title="Guidance Note 3"
              subtitle="Inspection & Testing"
              facets={ragPreview.facets.filter((f) => f.document_type === 'gn3')}
              regPrefix="§"
            />
            <RagSourceCard
              title="On-Site Guide"
              subtitle="Practical guidance"
              facets={ragPreview.facets.filter((f) => f.document_type === 'osg')}
              regPrefix=""
            />
          </div>
        </motion.div>
      )}

      {/* Live tutor's briefing */}
      <motion.div variants={itemVariants}>
        <SectionEyebrow eyebrow="Live" title="Tutor's briefing" />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-7 sm:px-10 sm:py-9 lg:px-12 lg:py-11">
          {brief.length === 0 ? (
            <div className="flex items-center gap-3 py-4">
              <div
                className="h-3 w-3 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin"
                aria-hidden
              />
              <span className="text-[13px] text-white">
                Sarah is preparing your lesson briefing…
              </span>
            </div>
          ) : (
            <MarkdownBrief text={brief} isStreaming={!briefComplete} />
          )}
        </div>
      </motion.div>

      {/* Structured plan progress */}
      <motion.div variants={itemVariants}>
        <div
          className={cn(
            'bg-[hsl(0_0%_12%)] border rounded-2xl px-6 py-5 sm:px-8 sm:py-6',
            phase === 'plan_retrying'
              ? 'border-amber-500/30'
              : 'border-white/[0.06]'
          )}
        >
          <div className="flex items-center gap-3">
            {planComplete ? (
              <span
                className="inline-block h-3 w-3 rounded-full bg-elec-yellow"
                aria-hidden
              />
            ) : (
              <div
                className={cn(
                  'h-3 w-3 rounded-full border-2 animate-spin',
                  phase === 'plan_retrying'
                    ? 'border-amber-500/20 border-t-amber-400'
                    : 'border-white/15 border-t-elec-yellow'
                )}
                aria-hidden
              />
            )}
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  'text-[12.5px]',
                  phase === 'plan_retrying' ? 'text-amber-200' : 'text-white'
                )}
              >
                {planComplete
                  ? 'Session plan structured.'
                  : phase === 'plan_retrying'
                    ? 'Connection hiccup — retrying the plan draft…'
                    : 'Structuring the session plan, activities and citations…'}
              </div>
              {planBytes > 0 && !planComplete && phase !== 'plan_retrying' && (
                <div className="mt-1 text-[11px] text-white tabular-nums">
                  {planBytes.toLocaleString('en-GB')} chars drafted
                </div>
              )}
              {phase === 'plan_retrying' && (
                <div className="mt-1 text-[11px] text-amber-200/70">
                  This usually succeeds on the second attempt.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function StepDot({ state }: { state: 'pending' | 'active' | 'done' }) {
  if (state === 'done') {
    return (
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" aria-hidden />
    );
  }
  if (state === 'active') {
    return (
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow animate-pulse"
        aria-hidden
      />
    );
  }
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
  );
}

/* ==========================================================================
   Markdown briefing renderer — editorial "chapter" layout
   ========================================================================== */

function normaliseBriefMarkdown(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    // Ensure blank line before every heading
    .replace(/([^\n])\n(#{1,3}\s)/g, '$1\n\n$2')
    // Ensure blank line after every heading
    .replace(/(^|\n)(#{1,3} [^\n]+)\n(?!\n)/g, '$1$2\n\n')
    // Double-newline between sentence-boundaries joined by single newline
    .replace(/([.!?])\n(?!\n|[-*\d#]|\s*$)/g, '$1\n\n');
}

function parseBriefSections(
  md: string
): Array<{ title: string | null; body: string }> {
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
  'prose-h3:text-[15px] sm:prose-h3:text-[16px] prose-h3:font-semibold prose-h3:mt-7 prose-h3:mb-2',
  'prose-p:text-[14.5px] sm:prose-p:text-[16px] prose-p:leading-[1.75] prose-p:text-white',
  'prose-p:my-0 [&_p+p]:mt-5',
  // First paragraph in the body gets a lead treatment — brighter, slightly larger
  '[&>p:first-child]:text-[15px] sm:[&>p:first-child]:text-[17px] [&>p:first-child]:text-white [&>p:first-child]:leading-[1.7] [&>p:first-child]:font-normal',
  'prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-2 prose-ol:space-y-2',
  'prose-li:text-[14px] sm:prose-li:text-[15px] prose-li:text-white prose-li:leading-[1.65] prose-li:pl-1',
  'prose-li:marker:text-elec-yellow/70',
  'prose-strong:text-white prose-strong:font-semibold',
  'prose-em:text-white prose-em:italic',
  'prose-code:text-elec-yellow prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[12.5px] prose-code:before:content-none prose-code:after:content-none',
  'prose-blockquote:border-l-2 prose-blockquote:border-elec-yellow/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:my-6',
  'prose-hr:border-white/[0.08] prose-hr:my-8'
);

const BriefChapter = memo(function BriefChapterInner({
  chapterNumber,
  title,
  body,
  showCaret,
}: {
  chapterNumber: number | null;
  title: string | null;
  body: string;
  showCaret?: boolean;
}) {
  const numeralLabel =
    chapterNumber !== null ? String(chapterNumber).padStart(2, '0') : null;

  // Preamble before the first H2: plain prose, no numeral rail.
  if (!title) {
    return (
      <div className={cn(BRIEF_PROSE_CLASSES, 'max-w-[72ch]')}>
        <ReactMarkdown>{body}</ReactMarkdown>
        {showCaret && (
          <span
            className="inline-block w-[3px] h-[1.1em] align-[-0.1em] bg-elec-yellow animate-pulse ml-0.5"
            aria-hidden
          />
        )}
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Mobile: eyebrow stacked */}
      {numeralLabel && (
        <div className="md:hidden text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85 mb-3">
          Chapter {numeralLabel}
        </div>
      )}

      <div className="md:grid md:grid-cols-[88px_minmax(0,1fr)] md:gap-x-8 lg:gap-x-12">
        {/* Desktop: giant numeral rail */}
        <div className="hidden md:block">
          <div className="sticky top-8 pt-1 text-right">
            <div className="text-[56px] lg:text-[72px] font-semibold tabular-nums text-white/[0.12] leading-none tracking-tight">
              {numeralLabel}
            </div>
            <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Chapter
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 max-w-[68ch]">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-semibold text-white tracking-tight leading-[1.15] mb-6 sm:mb-7">
            {title}
          </h2>
          <div className={BRIEF_PROSE_CLASSES}>
            <ReactMarkdown>{body}</ReactMarkdown>
            {showCaret && (
              <span
                className="inline-block w-[3px] h-[1.1em] align-[-0.1em] bg-elec-yellow animate-pulse ml-0.5"
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

const MarkdownBriefInner = ({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming?: boolean;
}) => {
  const sections = useMemo(() => {
    const normalised = normaliseBriefMarkdown(text);
    return parseBriefSections(normalised);
  }, [text]);

  // Assign chapter numbers only to sections that have a title.
  let running = 0;
  const rendered = sections.map((s) => {
    const num = s.title ? ++running : null;
    return { ...s, num };
  });

  const lastIndex = rendered.length - 1;

  return (
    <div className="space-y-14 sm:space-y-16 lg:space-y-20">
      {rendered.map((s, i) => (
        <div key={i}>
          {/* Hairline divider between titled chapters (not before the first) */}
          {i > 0 && s.title && (
            <div className="hidden md:block h-px bg-white/[0.06] md:mb-14 lg:mb-20" />
          )}
          <BriefChapter
            chapterNumber={s.num}
            title={s.title}
            body={s.body}
            showCaret={Boolean(isStreaming && i === lastIndex)}
          />
        </div>
      ))}
    </div>
  );
};

const MarkdownBrief = memo(MarkdownBriefInner);

/* ==========================================================================
   Saved / complete plan view — WORLD-CLASS LESSON PLAN LAYOUT
   ========================================================================== */

function PlanView({
  plan: planProp,
  brief: briefProp,
  lessonId,
}: {
  plan: GeneratedLessonPlan;
  brief: string;
  lessonId: string | null;
}) {
  // Local, mutable copy so accepted AI refinements appear instantly.
  const [plan, setPlan] = useState<GeneratedLessonPlan>(planProp);
  const [brief, setBrief] = useState<string>(briefProp);
  useEffect(() => {
    setPlan(planProp);
    setBrief(briefProp);
  }, [planProp, briefProp]);

  const { toast } = useToast();

  // Persist an accepted refinement to the plan row's content JSON
  const applyRefinement = async (
    key: RefinableSectionKey,
    value: unknown
  ): Promise<boolean> => {
    if (!lessonId) return false;
    try {
      const next: GeneratedLessonPlan = { ...plan, [key]: value };
      const nextBrief = key === 'tutor_brief_markdown' ? (value as string) : brief;
      const { error } = await supabase
        .from('college_lesson_plans')
        .update({ content: JSON.stringify({ ...next, tutor_brief_markdown: nextBrief }) })
        .eq('id', lessonId);
      if (error) throw error;
      setPlan(next);
      if (key === 'tutor_brief_markdown') setBrief(value as string);
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

  const a4Count = (plan.cited_facets ?? []).filter((c) => c.is_a4_change).length;

  const sections = useMemo(() => {
    const list: { id: string; label: string }[] = [];
    list.push({ id: 'goals', label: 'Learning goals' });
    if (plan.a4_change_summary) list.push({ id: 'a4', label: 'A4:2026 changes' });
    list.push({ id: 'timeline', label: 'Timeline' });
    list.push({ id: 'session', label: 'Session plan' });
    if (brief) list.push({ id: 'briefing', label: "Tutor's briefing" });
    if (plan.analogies?.length) list.push({ id: 'analogies', label: 'Analogies' });
    if (plan.misconceptions?.length)
      list.push({ id: 'misconceptions', label: 'Misconceptions' });
    if (plan.board_work?.length) list.push({ id: 'boardwork', label: 'Board-work' });
    if (plan.worked_examples?.length)
      list.push({ id: 'worked', label: 'Worked examples' });
    if (plan.cold_call_questions?.length)
      list.push({ id: 'coldcall', label: 'Cold-call' });
    if (plan.exit_ticket?.length) list.push({ id: 'exit', label: 'Exit ticket' });
    if (plan.vocabulary?.length) list.push({ id: 'vocab', label: 'Vocabulary' });
    if (plan.differentiation) list.push({ id: 'diff', label: 'Differentiation' });
    if (plan.health_safety?.length) list.push({ id: 'hs', label: 'Health & safety' });
    if (plan.homework) list.push({ id: 'hw', label: 'Homework' });
    if (plan.cited_facets?.length) list.push({ id: 'evidence', label: 'Evidence' });
    if (plan.next_lesson_hint) list.push({ id: 'next', label: 'Next lesson' });
    return list;
  }, [plan, brief]);

  return (
    <motion.div variants={itemVariants} className="relative">
      {/* Real action rail — only shown for persisted plans with a real UUID */}
      {lessonId && UUID_RE.test(lessonId) && (
        <PlanActionBar lessonId={lessonId} plan={plan} />
      )}

      {/* Flight-plan cover */}
      <Cover plan={plan} lessonId={lessonId} a4Count={a4Count} />

      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
        {/* Section nav — sticky on desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-1 pr-4 border-r border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-3">
              On this plan
            </div>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-[12.5px] text-white hover:text-white py-1.5 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-14 sm:space-y-16 min-w-0">
          {/* Learning goals */}
          <Section id="goals" eyebrow="Outcomes" title="What apprentices will master">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
              {plan.learning_objectives?.map((o, i) => (
                <div
                  key={i}
                  className="px-5 sm:px-7 py-5 sm:py-6 flex items-start gap-5"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full border border-elec-yellow/30 bg-elec-yellow/[0.06] flex items-center justify-center">
                    <span className="text-[12px] font-mono tabular-nums text-elec-yellow">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14.5px] sm:text-[15px] text-white leading-relaxed">
                      {o.text}
                    </div>
                    {o.ac_codes?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {o.ac_codes.map((ac) => (
                          <span
                            key={ac}
                            className="text-[10.5px] font-mono text-elec-yellow/90 bg-elec-yellow/[0.06] border border-elec-yellow/20 rounded-full px-2 py-0.5"
                          >
                            AC {ac}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {plan.audience_note && (
              <p className="mt-5 text-[13px] text-white leading-relaxed">
                <span className="text-white font-medium">Audience · </span>
                {plan.audience_note}
              </p>
            )}
            {plan.prior_knowledge?.length > 0 && (
              <div className="mt-4">
                <div className="text-[11px] text-white mb-2">Assumed prior knowledge</div>
                <div className="flex flex-wrap gap-1.5">
                  {plan.prior_knowledge.map((k, i) => (
                    <span
                      key={i}
                      className="text-[12px] text-white bg-white/[0.04] border border-white/[0.08] rounded-full px-2.5 py-0.5"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* A4:2026 */}
          {plan.a4_change_summary && (
            <Section id="a4" eyebrow="What's new" title="BS 7671 Amendment 4:2026">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] px-6 py-6 sm:px-7 sm:py-7">
                <p className="text-[14px] text-white leading-relaxed">
                  {plan.a4_change_summary}
                </p>
              </div>
            </Section>
          )}

          {/* Timeline */}
          <Section id="timeline" eyebrow="The arc" title="Session timeline">
            <Timeline activities={plan.activities ?? []} total={plan.duration_mins} />
          </Section>

          {/* Session plan */}
          <Section
            id="session"
            eyebrow={`${plan.duration_mins} minutes`}
            title="The session"
          >
            <div className="space-y-3">
              {(() => {
                const facetLookup = new Map(
                  (plan.cited_facets ?? []).map((c) => [c.facet_id, c])
                );
                let clockCursor = 0;
                return plan.activities?.map((a, i) => {
                  const startMin = clockCursor;
                  clockCursor += a.time_mins;
                  return (
                    <ActivityCard
                      key={i}
                      index={i}
                      a={a}
                      startMin={startMin}
                      endMin={clockCursor}
                      facetLookup={facetLookup}
                    />
                  );
                });
              })()}
            </div>
          </Section>

          {/* Tutor's briefing */}
          {brief && (
            <RefinableSection
              id="briefing"
              eyebrow="Teacher's craft"
              title="Tutor's briefing"
              lessonId={lessonId}
              sectionKey="tutor_brief_markdown"
              onAccept={(v) => applyRefinement('tutor_brief_markdown', v)}
              renderPreview={(v, isStreaming) => (
                <MarkdownBrief text={typeof v === 'string' ? v : ''} isStreaming={isStreaming} />
              )}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-7 sm:px-10 sm:py-9 lg:px-12 lg:py-11">
                <MarkdownBrief text={brief} />
              </div>
            </RefinableSection>
          )}

          {/* Analogies */}
          {plan.analogies && plan.analogies.length > 0 && (
            <RefinableSection
              id="analogies"
              eyebrow="Make it click"
              title="Analogies"
              lessonId={lessonId}
              sectionKey="analogies"
              onAccept={(v) => applyRefinement('analogies', v)}
              renderPreview={renderAnalogiesPreview}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.analogies.map((a, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-5 py-5 sm:px-6 sm:py-6"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/90">
                      {a.name}
                    </div>
                    <p className="mt-2.5 text-[13.5px] text-white leading-relaxed">
                      {a.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
                      <span className="text-white font-medium">When to use · </span>
                      {a.when_to_use}
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Misconceptions */}
          {plan.misconceptions && plan.misconceptions.length > 0 && (
            <RefinableSection
              id="misconceptions"
              eyebrow="Watch for"
              title="Common misconceptions"
              lessonId={lessonId}
              sectionKey="misconceptions"
              onAccept={(v) => applyRefinement('misconceptions', v)}
              renderPreview={renderMisconceptionsPreview}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.misconceptions.map((m, i) => (
                  <div
                    key={i}
                    className="px-5 sm:px-7 py-5 sm:py-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
                  >
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85 mb-2">
                        Apprentice believes
                      </div>
                      <div className="text-[13.5px] text-white leading-relaxed">
                        {m.belief}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85 mb-2">
                        Correction
                      </div>
                      <div className="text-[13.5px] text-white leading-relaxed">
                        {m.correction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Board-work */}
          {plan.board_work && plan.board_work.length > 0 && (
            <RefinableSection
              id="boardwork"
              eyebrow="At the board"
              title="Board-work to sketch"
              lessonId={lessonId}
              sectionKey="board_work"
              onAccept={(v) => applyRefinement('board_work', v)}
              renderPreview={renderBoardWorkPreview}
            >
              <div className="space-y-3">
                {plan.board_work.map((b, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-5 py-5 sm:px-7 sm:py-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] font-mono tabular-nums text-white mt-1 shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-white">{b.title}</div>
                        <p className="mt-2 text-[13.5px] text-white leading-relaxed">
                          {b.description}
                        </p>
                        {b.labels?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {b.labels.map((label, li) => (
                              <span
                                key={li}
                                className="text-[11px] font-mono text-elec-yellow/90 bg-elec-yellow/[0.05] border border-elec-yellow/20 rounded-full px-2 py-0.5"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Worked examples */}
          {plan.worked_examples && plan.worked_examples.length > 0 && (
            <RefinableSection
              id="worked"
              eyebrow="Modelling"
              title="Worked examples"
              lessonId={lessonId}
              sectionKey="worked_examples"
              onAccept={(v) => applyRefinement('worked_examples', v)}
              renderPreview={renderWorkedExamplesPreview}
            >
              <div className="space-y-3">
                {plan.worked_examples.map((w, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 py-5 border-b border-white/[0.06]">
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                        Scenario {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[14px] text-white leading-relaxed">
                        {w.scenario}
                      </div>
                    </div>
                    <ol className="px-5 sm:px-7 py-5 space-y-2.5">
                      {w.working?.map((step, si) => (
                        <li key={si} className="flex items-start gap-4">
                          <span className="text-[11px] font-mono tabular-nums text-elec-yellow mt-1 shrink-0 w-5">
                            {si + 1}
                          </span>
                          <span className="text-[13.5px] text-white leading-relaxed">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <div className="px-5 sm:px-7 py-4 bg-elec-yellow/[0.05] border-t border-elec-yellow/20">
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow mb-1">
                        Answer
                      </div>
                      <div className="text-[13.5px] text-white leading-relaxed font-medium">
                        {w.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Cold-call */}
          {plan.cold_call_questions && plan.cold_call_questions.length > 0 && (
            <RefinableSection
              id="coldcall"
              eyebrow="AFL"
              title="Cold-call question bank"
              lessonId={lessonId}
              sectionKey="cold_call_questions"
              onAccept={(v) => applyRefinement('cold_call_questions', v)}
              renderPreview={renderColdCallPreview}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.cold_call_questions.map((q, i) => (
                  <div key={i} className="px-5 sm:px-7 py-5 sm:py-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] font-mono tabular-nums text-white mt-1 shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="text-[14.5px] text-white leading-relaxed flex-1 min-w-0">
                            {q.question}
                          </div>
                          <BloomBadge level={q.bloom_level} />
                        </div>
                        {q.expected_answer && (
                          <div className="mt-3 text-[12.5px] text-white leading-relaxed">
                            <span className="text-white font-medium">Expected · </span>
                            {q.expected_answer}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Exit ticket */}
          {plan.exit_ticket && plan.exit_ticket.length > 0 && (
            <RefinableSection
              id="exit"
              eyebrow="Check for understanding"
              title="Exit ticket"
              lessonId={lessonId}
              sectionKey="exit_ticket"
              onAccept={(v) => applyRefinement('exit_ticket', v)}
              renderPreview={renderExitTicketPreview}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {plan.exit_ticket.map((e, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-5 py-5"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                      Q{i + 1}
                    </div>
                    <div className="text-[13.5px] text-white font-medium leading-relaxed">
                      {e.question}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/[0.06] text-[12.5px] text-white leading-relaxed">
                      <span className="text-elec-yellow/90 font-medium">Answer · </span>
                      {e.answer}
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Vocabulary */}
          {plan.vocabulary && plan.vocabulary.length > 0 && (
            <RefinableSection
              id="vocab"
              eyebrow="Language"
              title="Key vocabulary"
              lessonId={lessonId}
              sectionKey="vocabulary"
              onAccept={(v) => applyRefinement('vocabulary', v)}
              renderPreview={renderVocabularyPreview}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.vocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="px-5 sm:px-7 py-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-8"
                  >
                    <div className="text-[13.5px] font-semibold text-white">{v.term}</div>
                    <div className="text-[13px] text-white leading-relaxed">
                      {v.definition}
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Differentiation */}
          {plan.differentiation && (
            <Section id="diff" eyebrow="Inclusion" title="Differentiation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DiffBox label="Stretch" items={plan.differentiation.stretch} />
                <DiffBox label="Support" items={plan.differentiation.support} />
                {plan.differentiation.send && plan.differentiation.send.length > 0 && (
                  <DiffBox label="SEND strategies" items={plan.differentiation.send} />
                )}
                {plan.differentiation.eal && plan.differentiation.eal.length > 0 && (
                  <DiffBox label="EAL strategies" items={plan.differentiation.eal} />
                )}
              </div>
            </Section>
          )}

          {/* Health & safety */}
          {plan.health_safety && plan.health_safety.length > 0 && (
            <Section id="hs" eyebrow="Safe practice" title="Health & safety">
              <div className="space-y-3">
                {plan.health_safety.map((h, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto]">
                      <div className="px-5 sm:px-6 py-4 md:border-r border-white/[0.06]">
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85 mb-2">
                          Risk
                        </div>
                        <div className="text-[13.5px] text-white leading-relaxed">
                          {h.risk}
                        </div>
                      </div>
                      <div className="px-5 sm:px-6 py-4 md:border-r border-white/[0.06] border-t md:border-t-0 border-white/[0.06]">
                        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85 mb-2">
                          Control
                        </div>
                        <div className="text-[13.5px] text-white leading-relaxed">
                          {h.control}
                        </div>
                      </div>
                      {h.reg_ref && (
                        <div className="px-5 sm:px-6 py-4 border-t md:border-t-0 border-white/[0.06] md:min-w-[160px]">
                          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                            Reg ref
                          </div>
                          <div className="text-[12px] font-mono text-elec-yellow">
                            {h.reg_ref}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Homework */}
          {plan.homework && (
            <Section
              id="hw"
              eyebrow={`Independent study · ${plan.homework.estimated_mins} min`}
              title="Homework"
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6 sm:px-7 sm:py-7">
                <p className="text-[14px] text-white leading-relaxed">
                  {plan.homework.description}
                </p>
              </div>
            </Section>
          )}

          {/* AFL quick bullets */}
          {plan.assessment_for_learning?.length > 0 && (
            <Section id="afl" eyebrow="Quick AFL" title="Checks-for-understanding">
              <ul className="space-y-2">
                {plan.assessment_for_learning.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[13.5px] text-white leading-relaxed"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 rounded-full bg-elec-yellow shrink-0"
                      aria-hidden
                    />
                    <span className="flex-1">{it}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* British Values */}
          {plan.british_values && plan.british_values.length > 0 && (
            <RefinableSection
              id="british-values"
              eyebrow="Ofsted · DfE"
              title="British Values"
              lessonId={lessonId}
              sectionKey="british_values"
              onAccept={(v) => applyRefinement('british_values', v)}
              renderPreview={renderBritishValuesPreview}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.british_values.map((bv, i) => (
                  <div key={i} className="px-5 sm:px-7 py-5 flex items-start gap-4">
                    <span className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-500/10 text-red-200 border border-red-500/25 text-[10px] font-mono tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85">
                        {britishValueLabel(bv.value)}
                      </div>
                      <p className="mt-1.5 text-[13.5px] text-white leading-relaxed">
                        {bv.how_embedded}
                      </p>
                      {bv.activity_ref && (
                        <div className="mt-2 text-[11px] text-white/55">
                          Tied to: {bv.activity_ref}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Stretch & challenge */}
          {plan.stretch_challenge && plan.stretch_challenge.length > 0 && (
            <RefinableSection
              id="stretch"
              eyebrow="Raise the bar"
              title="Stretch & challenge"
              lessonId={lessonId}
              sectionKey="stretch_challenge"
              onAccept={(v) => applyRefinement('stretch_challenge', v)}
              renderPreview={renderStretchChallengePreview}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.stretch_challenge.map((s, i) => (
                  <div
                    key={i}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-5 py-5"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/90">
                        {s.title}
                      </div>
                      <BloomBadge level={s.bloom_level as BloomLevel} />
                    </div>
                    <p className="mt-2.5 text-[13.5px] text-white leading-relaxed">
                      {s.task}
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11.5px] text-white/70 leading-relaxed">
                      <span className="text-white/90 font-medium">For · </span>
                      {s.target_learner}
                    </div>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Inclusive practice */}
          {plan.inclusive_practice && plan.inclusive_practice.length > 0 && (
            <RefinableSection
              id="inclusive"
              eyebrow="Inclusion"
              title="Inclusive practice"
              lessonId={lessonId}
              sectionKey="inclusive_practice"
              onAccept={(v) => applyRefinement('inclusive_practice', v)}
              renderPreview={renderInclusivePracticePreview}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.inclusive_practice.map((ip, i) => (
                  <div key={i} className="px-5 sm:px-7 py-4 sm:py-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
                        {inclusiveNeedLabel(ip.need)}
                      </span>
                      {ip.activity_ref && (
                        <>
                          <span className="text-white/25 text-[10px]">·</span>
                          <span className="text-[10.5px] text-white/55">
                            {ip.activity_ref}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-1.5 text-[13.5px] text-white leading-relaxed">
                      {ip.strategy}
                    </p>
                  </div>
                ))}
              </div>
            </RefinableSection>
          )}

          {/* Evidence / citations */}
          {plan.cited_facets?.length > 0 && (
            <Section
              id="evidence"
              eyebrow="Evidence"
              title={`Regulation citations · ${plan.cited_facets.length}`}
            >
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                {plan.cited_facets.map((c) => (
                  <div key={c.facet_id} className="px-5 sm:px-7 py-4 sm:py-5">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                      <span>
                        {c.document_type === 'bs7671'
                          ? 'BS 7671'
                          : c.document_type === 'gn3'
                            ? 'Guidance Note 3'
                            : 'On-Site Guide'}
                      </span>
                      {c.reg_number && (
                        <>
                          <span className="text-white/25">·</span>
                          <span className="font-mono text-elec-yellow normal-case tracking-normal">
                            {c.reg_number}
                          </span>
                        </>
                      )}
                      {c.is_a4_change && (
                        <>
                          <span className="text-white/25">·</span>
                          <span className="text-amber-300">A4:2026</span>
                        </>
                      )}
                    </div>
                    {c.citation_note && (
                      <p className="mt-2 text-[13px] text-white leading-relaxed">
                        {c.citation_note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Attached resources — from the Materials library */}
          {lessonId && UUID_RE.test(lessonId) && (
            <AttachedResourcesSection lessonId={lessonId} />
          )}

          {/* Next lesson */}
          {plan.next_lesson_hint && (
            <Section id="next" eyebrow="Scheme of work" title="Suggested next lesson">
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
                <p className="text-[13.5px] text-white leading-relaxed">
                  {plan.next_lesson_hint}
                </p>
              </div>
            </Section>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   Action rail — real actions that operate on the persisted plan
   ========================================================================== */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function PlanActionBar({
  lessonId,
  plan,
  onStatusChange,
}: {
  lessonId: string;
  plan: GeneratedLessonPlan;
  onStatusChange?: (newStatus: string) => void;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [busy, setBusy] = useState<null | 'duplicate' | 'ready' | 'delete'>(null);
  const [status, setStatus] = useState<string>('draft');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleMeta, setScheduleMeta] = useState<{
    scheduled_date: string | null;
    scheduled_start_time: string | null;
    scheduled_room: string | null;
    cohort_id: string | null;
  } | null>(null);

  // Hydrate current status + scheduling — only when we have a real persisted id
  useEffect(() => {
    if (!UUID_RE.test(lessonId)) return;
    let cancelled = false;
    supabase
      .from('college_lesson_plans')
      .select('status, scheduled_date, scheduled_start_time, scheduled_room, cohort_id')
      .eq('id', lessonId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return;
        if (data.status) setStatus(data.status);
        setScheduleMeta({
          scheduled_date: (data.scheduled_date as string | null) ?? null,
          scheduled_start_time: (data.scheduled_start_time as string | null) ?? null,
          scheduled_room: (data.scheduled_room as string | null) ?? null,
          cohort_id: (data.cohort_id as string | null) ?? null,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const refreshSchedule = async () => {
    const { data } = await supabase
      .from('college_lesson_plans')
      .select('scheduled_date, scheduled_start_time, scheduled_room, cohort_id')
      .eq('id', lessonId)
      .maybeSingle();
    if (data) {
      setScheduleMeta({
        scheduled_date: (data.scheduled_date as string | null) ?? null,
        scheduled_start_time: (data.scheduled_start_time as string | null) ?? null,
        scheduled_room: (data.scheduled_room as string | null) ?? null,
        cohort_id: (data.cohort_id as string | null) ?? null,
      });
    }
  };

  const isReady = status === 'Approved' || status === 'ready' || status === 'Published';

  const handleDuplicate = async () => {
    setBusy('duplicate');
    try {
      const { data: src, error: srcErr } = await supabase
        .from('college_lesson_plans')
        .select('*')
        .eq('id', lessonId)
        .maybeSingle();
      if (srcErr || !src) throw new Error(srcErr?.message ?? 'Plan not found');

      const { id: _omitId, created_at: _omitCa, updated_at: _omitUa, ...copy } = src;
      const newRow = {
        ...copy,
        title: `${src.title ?? plan.title} (copy)`,
        status: 'draft',
      };
      const { data: inserted, error: insErr } = await supabase
        .from('college_lesson_plans')
        .insert(newRow)
        .select('id')
        .maybeSingle();
      if (insErr || !inserted) throw new Error(insErr?.message ?? 'Duplicate failed');

      const newId = inserted.id as string;

      // Copy AC mappings
      const { data: mappings } = await supabase
        .from('lesson_plan_ac_mapping')
        .select('qualification_code, unit_code, ac_code, mapping_source, confidence')
        .eq('lesson_plan_id', lessonId);
      if (mappings && mappings.length > 0) {
        await supabase.from('lesson_plan_ac_mapping').insert(
          mappings.map((m) => ({
            lesson_plan_id: newId,
            qualification_code: m.qualification_code,
            unit_code: m.unit_code,
            ac_code: m.ac_code,
            mapping_source: m.mapping_source,
            confidence: m.confidence,
          }))
        );
      }

      // Copy regulation refs
      const { data: refs } = await supabase
        .from('lesson_regulation_refs')
        .select('facet_id, document_type, cited_how, is_a4_change')
        .eq('lesson_plan_id', lessonId);
      if (refs && refs.length > 0) {
        await supabase.from('lesson_regulation_refs').insert(
          refs.map((r) => ({
            lesson_plan_id: newId,
            facet_id: r.facet_id,
            document_type: r.document_type,
            cited_how: r.cited_how,
            is_a4_change: r.is_a4_change,
          }))
        );
      }

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

  const handleMarkReady = async () => {
    setBusy('ready');
    try {
      const next = isReady ? 'draft' : 'Approved';
      const { error } = await supabase
        .from('college_lesson_plans')
        .update({ status: next })
        .eq('id', lessonId);
      if (error) throw error;
      setStatus(next);
      onStatusChange?.(next);
      toast({
        title: isReady ? 'Marked as draft' : 'Marked as ready',
        description: isReady
          ? 'This plan is back in drafts.'
          : 'This plan is ready to teach.',
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
      const { error } = await supabase
        .from('college_lesson_plans')
        .delete()
        .eq('id', lessonId);
      if (error) throw error;
      toast({ title: 'Plan deleted' });
      navigate('/college');
    } catch (e) {
      toast({
        title: 'Delete failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
      setBusy(null);
    }
  };

  const handlePrint = () => {
    // Opens a dedicated light-themed print route in a new window/tab, which
    // auto-invokes window.print() once the plan has loaded. Tutors can then
    // select "Save as PDF" or send to a real printer.
    window.open(`/college/lessons/${lessonId}/print?auto=1`, '_blank', 'noopener');
  };

  const statusLabel = isReady ? 'Ready to teach' : 'Draft';
  const statusDot = isReady ? 'bg-emerald-400' : 'bg-amber-400';
  const isScheduled = Boolean(
    scheduleMeta?.scheduled_date && scheduleMeta?.scheduled_start_time
  );
  const scheduleSummary =
    isScheduled && scheduleMeta
      ? `${new Date(scheduleMeta.scheduled_date as string).toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })} · ${scheduleMeta.scheduled_start_time?.slice(0, 5)}${
          scheduleMeta.scheduled_room ? ` · ${scheduleMeta.scheduled_room}` : ''
        }`
      : null;

  return (
    <>
      <div className="no-print sticky top-0 z-30 -mx-4 sm:-mx-6 mb-6 bg-[hsl(0_0%_8%)]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[11.5px] text-white mr-auto min-w-0">
            <span className={cn('inline-block h-1.5 w-1.5 rounded-full shrink-0', statusDot)} />
            <span className="uppercase tracking-[0.14em] font-medium">{statusLabel}</span>
            {scheduleSummary && (
              <>
                <span className="text-white/25 mx-1">·</span>
                <span className="text-elec-yellow/90 truncate">{scheduleSummary}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <ActionBtn
              label="Deliver"
              onClick={() => navigate(`/college/lessons/${lessonId}/deliver`)}
              primary
            />
            <ActionBtn
              label={isScheduled ? 'Reschedule' : 'Schedule'}
              onClick={() => setScheduleOpen(true)}
              accent
            />
            <ActionBtn
              label={isReady ? 'Mark draft' : 'Mark ready'}
              onClick={handleMarkReady}
              loading={busy === 'ready'}
            />
            <ActionBtn
              label="Duplicate"
              onClick={handleDuplicate}
              loading={busy === 'duplicate'}
            />
            <ActionBtn label="Print" onClick={handlePrint} />
            <ActionBtn
              label="Delete"
              onClick={() => setConfirmDelete(true)}
              destructive
            />
          </div>
        </div>
      </div>

      <ScheduleLessonDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        lessonId={lessonId}
        planTitle={plan.title}
        defaultDurationMins={plan.duration_mins}
        initialCohortId={scheduleMeta?.cohort_id ?? null}
        onScheduled={refreshSchedule}
      />

      <ConfirmationDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this lesson plan?"
        description="This removes the plan, its AC mappings and regulation references. This cannot be undone."
        confirmText="Delete plan"
        variant="destructive"
        loading={busy === 'delete'}
        onConfirm={handleDelete}
      />
    </>
  );
}

function ActionBtn({
  label,
  onClick,
  loading,
  primary,
  accent,
  destructive,
}: {
  label: string;
  onClick: () => void;
  loading?: boolean;
  primary?: boolean;
  accent?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        'h-9 px-3.5 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation disabled:opacity-50',
        primary
          ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
          : accent
            ? 'text-elec-yellow hover:text-black hover:bg-elec-yellow border border-elec-yellow/40 hover:border-elec-yellow'
            : destructive
              ? 'text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20'
              : 'text-white hover:text-white hover:bg-white/[0.06] border border-white/[0.1]'
      )}
    >
      {loading ? '…' : label}
    </button>
  );
}

/* ==========================================================================
   Cover — the "flight plan" header
   ========================================================================== */

function Cover({
  plan,
  lessonId,
  a4Count,
}: {
  plan: GeneratedLessonPlan;
  lessonId: string | null;
  a4Count: number;
}) {
  return (
    <div className="relative pt-4 sm:pt-6">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70',
          a4Count > 0
            ? 'from-amber-500/70 via-amber-400/70 to-yellow-400/70'
            : 'from-elec-yellow/70 via-amber-400/70 to-orange-400/70'
        )}
      />
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        Lesson plan · draft
      </div>
      <h1 className="mt-2 text-[26px] sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight leading-[1.05] break-words">
        {plan.title}
      </h1>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
        <CoverCell label="Duration" value={`${plan.duration_mins} min`} />
        <CoverCell
          label="Objectives"
          value={`${plan.learning_objectives?.length ?? 0}`}
        />
        <CoverCell
          label="Activities"
          value={`${plan.activities?.length ?? 0}`}
        />
        <CoverCell
          label={a4Count > 0 ? 'A4:2026 changes' : 'Citations'}
          value={
            a4Count > 0
              ? `${a4Count}`
              : `${plan.cited_facets?.length ?? 0}`
          }
          accent={a4Count > 0 ? 'amber' : undefined}
        />
      </div>

      {lessonId && (
        <div className="mt-4 text-[10px] font-mono text-white">
          {lessonId.slice(0, 8)}
        </div>
      )}
    </div>
  );
}

function CoverCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: 'amber';
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] px-5 py-5 sm:px-6 sm:py-6">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        {label}
      </div>
      <div
        className={cn(
          'mt-2.5 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight leading-none',
          accent === 'amber' ? 'text-amber-300' : 'text-white'
        )}
      >
        {value}
      </div>
    </div>
  );
}

/* ==========================================================================
   Timeline ribbon — visual session arc
   ========================================================================== */

const PHASE_TONE: Record<GeneratedActivity['phase'], string> = {
  starter: 'bg-elec-yellow/75',
  input: 'bg-blue-400/75',
  modelling: 'bg-cyan-400/75',
  practice: 'bg-emerald-400/75',
  practical: 'bg-emerald-500/75',
  afl: 'bg-purple-400/75',
  plenary: 'bg-amber-400/75',
};

function Timeline({
  activities,
  total,
}: {
  activities: GeneratedActivity[];
  total: number;
}) {
  if (!activities.length || total <= 0) return null;
  let cursor = 0;
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-6 sm:px-6 sm:py-7">
      {/* Bar */}
      <div className="flex rounded-lg overflow-hidden h-10 bg-white/[0.04]">
        {activities.map((a, i) => {
          const pct = Math.max(2, (a.time_mins / total) * 100);
          const left = (cursor / total) * 100;
          cursor += a.time_mins;
          return (
            <div
              key={i}
              className={cn('relative flex items-center justify-center', PHASE_TONE[a.phase])}
              style={{ width: `${pct}%` }}
              title={`${a.title} · ${a.time_mins} min`}
            >
              <span className="text-[10px] font-mono tabular-nums text-black/75 px-1 truncate">
                {a.time_mins}m
              </span>
              {left > 0 && (
                <span className="absolute left-0 top-0 bottom-0 w-px bg-black/30" />
              )}
            </div>
          );
        })}
      </div>
      {/* Minute ticks */}
      <div className="mt-2.5 relative h-3">
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <span
            key={p}
            className="absolute top-0 -translate-x-1/2 text-[10px] font-mono tabular-nums text-white"
            style={{ left: `${p * 100}%` }}
          >
            {Math.round(p * total)}′
          </span>
        ))}
      </div>
      {/* Phase legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/65">
        {Array.from(new Set(activities.map((a) => a.phase))).map((p) => (
          <div key={p} className="inline-flex items-center gap-2">
            <span className={cn('inline-block h-2 w-2 rounded-sm', PHASE_TONE[p])} />
            <span className="capitalize">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Activity card — the heart of the plan
   ========================================================================== */

function ActivityCard({
  index,
  a,
  startMin,
  endMin,
  facetLookup,
}: {
  index: number;
  a: GeneratedActivity;
  startMin: number;
  endMin: number;
  facetLookup: Map<string, GeneratedCitation>;
}) {
  const regs = (a.cited_facet_ids ?? [])
    .map((id) => facetLookup.get(id))
    .filter((c): c is GeneratedCitation => Boolean(c));
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden grid grid-cols-[auto_minmax(0,1fr)]">
      {/* Clock gutter */}
      <div className="bg-[hsl(0_0%_10%)] border-r border-white/[0.06] px-4 sm:px-5 py-5 flex flex-col items-start justify-start min-w-[92px]">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="mt-2 font-mono text-[13px] text-white tabular-nums leading-tight">
          {formatClock(startMin)}
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-white tabular-nums">
          → {formatClock(endMin)}
        </div>
        <div className="mt-3 text-[11px] text-elec-yellow font-mono tabular-nums">
          {a.time_mins} min
        </div>
      </div>

      {/* Body */}
      <div className="min-w-0">
        <div className="px-5 sm:px-7 py-5 border-b border-white/[0.06] flex items-start gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <PhasePill phase={a.phase} />
            <div className="mt-2 text-[16px] sm:text-[17px] font-semibold text-white leading-snug">
              {a.title}
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-5 space-y-5">
          <p className="text-[13.5px] text-white leading-relaxed">{a.description}</p>

          {a.student_focus && (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
                Student focus
              </div>
              <div className="text-[13px] text-white leading-relaxed">
                {a.student_focus}
              </div>
            </div>
          )}

          {a.teacher_moves && a.teacher_moves.length > 0 && (
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2.5">
                Teacher moves
              </div>
              <ul className="space-y-2">
                {a.teacher_moves.map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-[9px] h-1 w-1 rounded-full bg-elec-yellow shrink-0"
                      aria-hidden
                    />
                    <span className="text-[13px] text-white leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {a.check_for_understanding && (
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] px-4 py-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow mb-2">
                Check for understanding
              </div>
              <div className="text-[13px] text-white leading-relaxed">
                {a.check_for_understanding}
              </div>
            </div>
          )}

          {((a.resources_needed && a.resources_needed.length > 0) || regs.length > 0) && (
            <div className="pt-2 space-y-3 border-t border-white/[0.06]">
              {a.resources_needed && a.resources_needed.length > 0 && (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white shrink-0">
                    Resources
                  </span>
                  <span className="text-[12.5px] text-white leading-relaxed">
                    {a.resources_needed.join(' · ')}
                  </span>
                </div>
              )}
              {regs.length > 0 && (
                <div className="flex items-start gap-3 flex-wrap">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white shrink-0 pt-1">
                    Regs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {regs.map((r) => (
                      <RegChip key={r.facet_id} citation={r} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhasePill({ phase }: { phase: GeneratedActivity['phase'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] border rounded-full px-2.5 py-0.5',
        'text-white border-white/[0.12]'
      )}
    >
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', PHASE_TONE[phase])} />
      {phase}
    </span>
  );
}

function formatClock(mins: number): string {
  const m = Math.floor(mins);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/* ==========================================================================
   Shared small components
   ========================================================================== */

function Section({
  id,
  eyebrow,
  title,
  children,
  refine,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /**
   * Optional refine control. Can be either a plain React node (rendered in the
   * header row) or a function returning { button, draft } — in which case the
   * button is placed in the header and the draft panel is rendered full-width
   * between the header and the section body.
   */
  refine?:
    | React.ReactNode
    | { button: React.ReactNode; draft: React.ReactNode | null };
}) {
  const hasSplit =
    refine !== null &&
    typeof refine === 'object' &&
    refine !== undefined &&
    'button' in (refine as object);
  const button = hasSplit
    ? (refine as { button: React.ReactNode }).button
    : (refine as React.ReactNode);
  const draft = hasSplit
    ? (refine as { draft: React.ReactNode | null }).draft
    : null;

  return (
    <section id={id} className="scroll-mt-6 group">
      <div className="flex items-end justify-between gap-4">
        <SectionEyebrow eyebrow={eyebrow} title={title} />
        {button && <div className="no-print shrink-0">{button}</div>}
      </div>
      {draft && <div className="mt-5 no-print">{draft}</div>}
      <div className={cn('mt-5', draft && 'opacity-60 transition-opacity')}>
        {children}
      </div>
    </section>
  );
}

function SectionEyebrow({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div>
      {eyebrow && (
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  );
}

/* ==========================================================================
   Section refine — AI edit for a single section
   ========================================================================== */

const REFINE_PRESETS: Record<string, { label: string; instruction: string }[]> = {
  default: [
    { label: 'Shorter', instruction: 'Make this section shorter and tighter. Cut filler.' },
    { label: 'More detail', instruction: 'Expand with more concrete detail and specific examples.' },
    { label: 'Simpler', instruction: 'Simplify the language for Level 2 apprentices.' },
    { label: 'Harder', instruction: 'Raise the challenge — Level 3 / HND depth.' },
    { label: 'More practical', instruction: 'Lean into practical, hands-on content rather than theory.' },
    { label: 'Add an example', instruction: 'Add one more concrete worked example.' },
  ],
  cold_call_questions: [
    { label: 'Harder', instruction: 'Make the questions harder — push into analyse and evaluate.' },
    { label: 'Simpler', instruction: 'Simpler questions for early apprentices.' },
    { label: 'Add 3 more', instruction: 'Add three more questions covering different ACs.' },
    { label: 'More scenario-based', instruction: 'Convert questions into scenario-based prompts from real jobs.' },
  ],
  vocabulary: [
    { label: 'Add 5 more', instruction: 'Add five more essential terms for this topic.' },
    { label: 'Simpler definitions', instruction: 'Simpler one-line definitions for apprentices.' },
    { label: 'Focus on A4:2026', instruction: 'Emphasise terms new or changed in BS 7671 Amendment 4:2026.' },
  ],
  tutor_brief_markdown: [
    { label: 'Shorter', instruction: 'Tighten the whole briefing by about a third.' },
    { label: 'More analogies', instruction: 'Add richer analogies throughout the briefing.' },
    { label: 'Deeper subject knowledge', instruction: 'Go deeper on the physics / regulatory reasoning.' },
    { label: 'More warmth', instruction: 'Warmer, more colleague-to-colleague tone.' },
  ],
};

/**
 * Splits into two render slots:
 *   - `button`: goes in the section header
 *   - `draft`: goes full-width between the header and the section body
 * Use via `<Section refine={{ button, draft }}>`.
 */
function useSectionRefine({
  lessonId,
  sectionKey,
  onAccept,
  renderPreview,
}: {
  lessonId: string;
  sectionKey: RefinableSectionKey;
  onAccept: (value: unknown) => Promise<boolean>;
  renderPreview: (value: unknown, isStreaming: boolean) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [saving, setSaving] = useState(false);
  const refine = useRefineSection();

  const presets = REFINE_PRESETS[sectionKey] ?? REFINE_PRESETS.default;

  const submit = (text: string) => {
    if (!text.trim() || refine.loading) return;
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
    const ok = await onAccept(refine.value);
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

  const phaseLabel = refine.loading
    ? refine.phase === 'loading_plan'
      ? 'Loading plan…'
      : refine.phase === 'loading_rag'
        ? 'Loading references…'
        : refine.phase === 'composing'
          ? 'Rewriting…'
          : 'Starting…'
    : refine.value
      ? 'Draft ready — accept or discard below'
      : '';

  const button = (
    <div className="relative">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation"
        >
          Refine with AI →
        </button>
      ) : (
        <button
          onClick={() => {
            if (refine.loading) return;
            setOpen(false);
            if (refine.value === null) {
              refine.reset();
              setInstruction('');
            }
          }}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
        >
          Close
        </button>
      )}

      {open && (
        <div className="absolute right-0 top-8 z-30 w-[min(92vw,460px)] bg-[hsl(0_0%_11%)] border border-white/[0.08] rounded-2xl shadow-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.label}
                disabled={refine.loading}
                onClick={() => submit(p.instruction)}
                className="text-[11.5px] text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-full px-3 py-1 transition-colors disabled:opacity-40"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={refine.loading}
              placeholder="Or tell me exactly what to change…"
              className="w-full min-h-[60px] resize-none bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] text-white/50 truncate">{phaseLabel}</div>
              <button
                onClick={() => submit(instruction)}
                disabled={refine.loading || !instruction.trim()}
                className="h-9 px-4 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12.5px] font-medium disabled:opacity-40 transition-colors"
              >
                {refine.loading ? 'Refining…' : 'Refine'}
              </button>
            </div>
          </div>
          {refine.error && (
            <div className="text-[11.5px] text-red-300 leading-relaxed">
              {refine.error}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const showDraft = refine.loading || refine.value !== null;
  const draft = showDraft ? (
    <div className="bg-[hsl(0_0%_11%)] border border-elec-yellow/30 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
          AI draft · {refine.loading ? 'streaming' : 'ready to review'}
        </div>
        {refine.value !== null && !refine.loading && (
          <div className="flex items-center gap-2">
            <button
              onClick={discard}
              disabled={saving}
              className="h-8 px-3 rounded-full text-[12px] font-medium text-white hover:text-white border border-white/[0.12] hover:bg-white/[0.06] transition-colors disabled:opacity-40"
            >
              Discard
            </button>
            <button
              onClick={accept}
              disabled={saving}
              className="h-8 px-4 rounded-full text-[12px] font-medium bg-elec-yellow hover:bg-elec-yellow/90 text-black transition-colors disabled:opacity-40"
            >
              {saving ? 'Saving…' : 'Accept draft'}
            </button>
          </div>
        )}
      </div>
      <div className="text-[13px] text-white">
        {renderPreview(
          refine.value ?? refine.streamText,
          refine.loading && refine.value === null
        )}
      </div>
    </div>
  ) : null;

  return { button, draft };
}

/**
 * Section with inline AI refinement. The button sits in the header, the draft
 * panel renders full-width between the header and the section body — so they
 * can't overlap.
 */
function RefinableSection({
  id,
  eyebrow,
  title,
  children,
  lessonId,
  sectionKey,
  onAccept,
  renderPreview,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  lessonId: string | null;
  sectionKey: RefinableSectionKey;
  onAccept: (value: unknown) => Promise<boolean>;
  renderPreview: (value: unknown, isStreaming: boolean) => React.ReactNode;
}) {
  // Hooks must run unconditionally; guard the rendered output instead.
  const canRefine = Boolean(lessonId && UUID_RE.test(lessonId));
  const { button, draft } = useSectionRefine({
    lessonId: lessonId ?? '',
    sectionKey,
    onAccept,
    renderPreview,
  });

  return (
    <Section
      id={id}
      eyebrow={eyebrow}
      title={title}
      refine={canRefine ? { button, draft } : undefined}
    >
      {children}
    </Section>
  );
}

function DiffBox({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-5 py-5 sm:px-6 sm:py-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-3">
        {label}
      </div>
      <ul className="space-y-1.5">
        {(items ?? []).map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[13.5px] text-white leading-relaxed"
          >
            <span
              className="mt-[9px] h-1 w-1 rounded-full bg-white/55 shrink-0"
              aria-hidden
            />
            <span className="flex-1">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RagSourceCard({
  title,
  subtitle,
  facets,
  regPrefix,
}: {
  title: string;
  subtitle: string;
  facets: RagPreview['facets'];
  regPrefix: string;
}) {
  if (facets.length === 0) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 opacity-40">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {subtitle}
        </div>
        <div className="mt-0.5 text-[15px] font-semibold text-white">{title}</div>
        <div className="mt-5 text-[11.5px] text-white">No references matched</div>
      </div>
    );
  }

  // Dedupe: keep first occurrence per reg_number (or per topic when no reg).
  const seen = new Set<string>();
  const dedup = facets.filter((f) => {
    const key = f.reg_number ?? `t:${f.primary_topic ?? ''}` ?? `f:${f.facet_id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const a4Count = dedup.filter((f) => f.is_a4_change).length;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {subtitle}
          </div>
          <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white truncate">
            {title}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[22px] sm:text-[26px] font-semibold tabular-nums text-white leading-none tracking-tight">
            {facets.length}
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
            {facets.length === 1 ? 'ref' : 'refs'}
          </div>
        </div>
      </div>

      {a4Count > 0 && (
        <div className="mb-3 text-[10.5px] text-amber-300/90 flex items-center gap-2">
          <span className="inline-block h-1 w-1 rounded-full bg-amber-400" aria-hidden />
          <span className="tabular-nums">{a4Count}</span>
          <span>{a4Count === 1 ? 'change' : 'changes'} in A4:2026</span>
        </div>
      )}

      <div className="space-y-2 flex-1">
        {dedup.map((f) => (
          <RegReferenceTile
            key={f.facet_id}
            regNumber={f.reg_number ? `${regPrefix}${f.reg_number}` : null}
            topic={f.primary_topic}
            isA4={f.is_a4_change}
          />
        ))}
      </div>
    </div>
  );
}

/* Shared tile for a single regulation reference — used in the Grounded-in
 * panel and the Evidence citations section. Reg number is the hero, topic
 * the supporting line, A4 marker is a discrete corner pill. */
function RegReferenceTile({
  regNumber,
  topic,
  isA4,
  citationNote,
}: {
  regNumber: string | null;
  topic: string | null;
  isA4: boolean;
  citationNote?: string | null;
}) {
  return (
    <div
      className={cn(
        'relative bg-[hsl(0_0%_9%)] border rounded-lg px-3.5 py-3 transition-colors',
        isA4
          ? 'border-amber-500/20 hover:border-amber-500/35'
          : 'border-white/[0.05] hover:border-white/[0.12]'
      )}
    >
      {isA4 && (
        <span
          className="absolute top-2.5 right-2.5 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-amber-300 bg-amber-500/[0.12] border border-amber-500/30 rounded-full px-1.5 py-[1px] leading-none"
          title="New or changed in BS 7671 Amendment 4:2026"
        >
          A4
        </span>
      )}

      {regNumber ? (
        <div
          className={cn(
            'font-mono tabular-nums text-[15px] sm:text-[16px] font-semibold leading-none tracking-tight',
            isA4 ? 'text-amber-200' : 'text-elec-yellow'
          )}
        >
          {regNumber}
        </div>
      ) : topic ? (
        <div className="text-[13px] font-medium text-white leading-snug">{topic}</div>
      ) : (
        <div className="text-[12px] text-white italic">Reference</div>
      )}

      {regNumber && topic && (
        <div className="mt-1.5 text-[11.5px] text-white/65 leading-snug line-clamp-2">
          {topic}
        </div>
      )}

      {citationNote && (
        <div className="mt-2 pt-2 border-t border-white/[0.05] text-[12px] text-white leading-relaxed">
          {citationNote}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Preview renderers for AI refinements
   ========================================================================== */

function StreamingJsonHint() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-3 w-3 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin"
        aria-hidden
      />
      <span className="text-[12.5px] text-white">Rewriting this section…</span>
    </div>
  );
}

function renderAnalogiesPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['analogies'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {items?.map((a, i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-4 py-4"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/90">
            {a.name}
          </div>
          <p className="mt-1.5 text-[13px] text-white leading-relaxed">{a.description}</p>
          <div className="mt-2 pt-2 border-t border-white/[0.06] text-[11.5px] text-white/65 leading-relaxed">
            <span className="text-white font-medium">When · </span>
            {a.when_to_use}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderMisconceptionsPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['misconceptions'];
  return (
    <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
      {items?.map((m, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 py-3.5">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85 mb-1">
              Believes
            </div>
            <div className="text-[12.5px] text-white leading-relaxed">{m.belief}</div>
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85 mb-1">
              Correction
            </div>
            <div className="text-[12.5px] text-white leading-relaxed">{m.correction}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderBoardWorkPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['board_work'];
  return (
    <div className="space-y-2.5">
      {items?.map((b, i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-4 py-4"
        >
          <div className="text-[13.5px] font-semibold text-white">{b.title}</div>
          <p className="mt-1 text-[12.5px] text-white leading-relaxed">{b.description}</p>
          {b.labels?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {b.labels.map((l, li) => (
                <span
                  key={li}
                  className="text-[10.5px] font-mono text-elec-yellow/90 bg-elec-yellow/[0.05] border border-elec-yellow/20 rounded-full px-2 py-0.5"
                >
                  {l}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function renderWorkedExamplesPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['worked_examples'];
  return (
    <div className="space-y-2.5">
      {items?.map((w, i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/[0.06] text-[12.5px] text-white">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white mr-2">
              Scenario
            </span>
            {w.scenario}
          </div>
          <ol className="px-4 py-3 space-y-1.5">
            {w.working?.map((step, si) => (
              <li key={si} className="flex items-start gap-3 text-[12.5px] text-white">
                <span className="font-mono tabular-nums text-elec-yellow w-4 shrink-0">
                  {si + 1}
                </span>
                <span className="flex-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <div className="px-4 py-2.5 bg-elec-yellow/[0.06] border-t border-elec-yellow/20 text-[12.5px] text-white font-medium">
            {w.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderColdCallPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['cold_call_questions'];
  return (
    <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
      {items?.map((q, i) => (
        <div key={i} className="px-4 py-3.5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="text-[11px] font-mono tabular-nums text-white shrink-0 w-5 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[13px] text-white leading-relaxed">{q.question}</span>
            </div>
            <BloomBadge level={q.bloom_level} />
          </div>
          {q.expected_answer && (
            <div className="mt-1.5 ml-8 text-[11.5px] text-white/65 leading-relaxed">
              {q.expected_answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function renderExitTicketPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['exit_ticket'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      {items?.map((e, i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-4 py-4"
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-white mb-1.5">
            Q{i + 1}
          </div>
          <div className="text-[12.5px] text-white font-medium leading-relaxed">{e.question}</div>
          <div className="mt-2 pt-2 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
            <span className="text-elec-yellow/90 font-medium">Answer · </span>
            {e.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

const BRITISH_VALUE_LABELS: Record<string, string> = {
  democracy: 'Democracy',
  rule_of_law: 'The rule of law',
  individual_liberty: 'Individual liberty',
  mutual_respect: 'Mutual respect',
  tolerance_of_faiths_beliefs: 'Tolerance of faiths & beliefs',
};
function britishValueLabel(v: string) {
  return BRITISH_VALUE_LABELS[v] ?? v.replace(/_/g, ' ');
}

const INCLUSIVE_NEED_LABELS: Record<string, string> = {
  send: 'SEND',
  eal: 'EAL',
  ehcp: 'EHCP',
  neurodivergent: 'Neurodivergent',
  prior_attainment_low: 'Lower attainment',
  prior_attainment_high: 'Higher attainment',
  physical_access: 'Physical access',
  other: 'Other',
};
function inclusiveNeedLabel(v: string) {
  return INCLUSIVE_NEED_LABELS[v] ?? v.replace(/_/g, ' ');
}

function renderBritishValuesPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['british_values'];
  return (
    <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
      {items?.map((bv, i) => (
        <div key={i} className="px-4 py-3 flex items-start gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300/85 shrink-0 w-28 pt-0.5">
            {britishValueLabel(bv.value)}
          </span>
          <span className="text-[12.5px] text-white leading-snug flex-1">
            {bv.how_embedded}
          </span>
        </div>
      ))}
    </div>
  );
}

function renderStretchChallengePreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['stretch_challenge'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {items?.map((s, i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-4 py-3.5"
        >
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/90">
              {s.title}
            </div>
            <BloomBadge level={s.bloom_level as BloomLevel} />
          </div>
          <p className="mt-2 text-[12.5px] text-white leading-snug">{s.task}</p>
          <div className="mt-2 text-[11px] text-white/65">
            <span className="text-white/85 font-medium">For: </span>
            {s.target_learner}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderInclusivePracticePreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['inclusive_practice'];
  return (
    <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
      {items?.map((ip, i) => (
        <div key={i} className="px-4 py-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
            {inclusiveNeedLabel(ip.need)}
          </div>
          <p className="mt-1 text-[12.5px] text-white leading-snug">{ip.strategy}</p>
        </div>
      ))}
    </div>
  );
}

function renderVocabularyPreview(v: unknown, isStreaming: boolean) {
  if (isStreaming || !Array.isArray(v)) return <StreamingJsonHint />;
  const items = v as GeneratedLessonPlan['vocabulary'];
  return (
    <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
      {items?.map((w, i) => (
        <div
          key={i}
          className="px-4 py-3 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-5"
        >
          <div className="text-[12.5px] font-semibold text-white">{w.term}</div>
          <div className="text-[12px] text-white leading-relaxed">{w.definition}</div>
        </div>
      ))}
    </div>
  );
}

function RegChip({ citation }: { citation: GeneratedCitation }) {
  const sourceShort =
    citation.document_type === 'bs7671'
      ? 'BS 7671'
      : citation.document_type === 'gn3'
        ? 'GN3'
        : 'OSG';
  const label = citation.reg_number ?? 'Ref';
  const a4 = citation.is_a4_change;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[11px] rounded-full border px-2.5 py-0.5',
        a4
          ? 'text-amber-300 bg-amber-500/[0.08] border-amber-500/30'
          : 'text-white bg-white/[0.04] border-white/[0.1]'
      )}
      title={citation.citation_note ?? undefined}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-75">
        {sourceShort}
      </span>
      <span
        className={cn(
          'font-mono tabular-nums',
          a4 ? 'text-amber-200' : 'text-elec-yellow'
        )}
      >
        {label}
      </span>
      {a4 && (
        <span className="text-[9px] font-medium uppercase tracking-wide">A4</span>
      )}
    </span>
  );
}

function BloomBadge({ level }: { level: BloomLevel }) {
  const labels: Record<BloomLevel, string> = {
    recall: 'Recall',
    understand: 'Understand',
    apply: 'Apply',
    analyse: 'Analyse',
    evaluate: 'Evaluate',
    create: 'Create',
  };
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 border border-white/[0.12] rounded-full px-2.5 py-0.5 shrink-0">
      {labels[level] ?? level}
    </span>
  );
}

/* ==========================================================================
   AttachedResourcesSection — renders resources linked to this lesson plan
   ========================================================================== */

function AttachedResourcesSection({ lessonId }: { lessonId: string }) {
  const { resources, loading } = useLessonResources(lessonId);

  if (!loading && resources.length === 0) return null;

  return (
    <Section id="resources" eyebrow="Materials" title={`Attached resources · ${resources.length}`}>
      {loading ? (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 animate-pulse">
          <div className="h-3 w-32 bg-white/[0.06] rounded-sm" />
          <div className="mt-3 h-3 w-full bg-white/[0.06] rounded-sm" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resources.map((r) => {
            const kindLabel =
              r.kind === 'document'
                ? 'Doc'
                : r.kind === 'slide'
                  ? 'Slides'
                  : r.kind === 'sheet'
                    ? 'Sheet'
                    : r.kind === 'image'
                      ? 'Image'
                      : r.kind === 'video'
                        ? 'Video'
                        : r.kind === 'audio'
                          ? 'Audio'
                          : r.kind === 'link'
                            ? 'Link'
                            : 'File';
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
              <button
                key={r.id}
                type="button"
                onClick={onOpen}
                className="text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:border-white/[0.15] rounded-xl px-4 py-3.5 transition-colors touch-manipulation"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-elec-yellow/85">
                  {kindLabel}
                </div>
                <div className="mt-1.5 text-[13.5px] font-medium text-white truncate">
                  {r.title}
                </div>
                {r.mime_type && (
                  <div className="mt-1 text-[11px] font-mono text-white/45 truncate">
                    {r.mime_type}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </Section>
  );
}
