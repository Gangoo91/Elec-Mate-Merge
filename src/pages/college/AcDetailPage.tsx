import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useAcDetail } from '@/hooks/useAcDetail';
import { useQualifications, useUnitDetail, type AcRow } from '@/hooks/useCurriculum';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  StatusChip,
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TEACH_PANEL,
  TEACH_ROW,
  TeachingEmpty,
  TeachingHeader,
  TeachingScreen,
  plural,
  type Tone,
} from '@/components/college/teaching/TeachingKit';
import { LessonGeneratorDialog } from '@/components/college/dialogs/LessonGeneratorDialog';
import { cn } from '@/lib/utils';
import { recordResourceEvent } from '@/hooks/useResourceAnalytics';

/* ==========================================================================
   AcDetailPage — /college/curriculum/ac/:qualCode/:unitCode/:acCode
   ELE-896 (B1). One page showing the AC's text, the resources tagged to
   it, the lessons that cover it, and learner progress against it.

   8 Oct 2026: the header says it in one sentence (no figure tiles); every
   learner on the qualification is listed with their portfolio state
   (get_portfolio_ac_state, via useAcDetail), worst first; and "Plan a
   lesson for this criterion" opens the lesson composer's shape step
   (LessonGeneratorDialog, keyed per opening as StartLessonPlanSheet does)
   with this criterion picked. Linked from the criterion panel in the
   qualification browser. Codes with a "/" (5357 unit 312/212) arrive
   URL-encoded and React Router decodes the params.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-ac-detail',
  title: 'An assessment criterion',
  what: 'Everything about one assessment criterion: what it says, where each learner on the qualification stands against it, the resources that teach it and the lessons that cover it.',
  steps: [
    {
      title: 'See who is behind',
      body: 'Every learner on a course for this qualification is listed with where they stand: passed, submitted, claimed, needs more or not started. Tap one to open their record.',
    },
    {
      title: 'Plan a lesson for it',
      body: 'Plan a lesson for this criterion opens the same lesson composer as the lesson plans list, with this criterion already picked.',
    },
    {
      title: 'Check coverage',
      body: 'Lessons that map to this criterion are listed. If none do, it is a gap in the scheme of work.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Green', body: 'passed, or confirmed by the IQA' },
    { swatch: 'bg-orange-400', label: 'Orange', body: 'the assessor asked for more evidence' },
  ],
  notes: [
    {
      title: 'Where the status comes from',
      body: 'For a learner with an account it is the same criterion state they and their assessor see in the portfolio. A learner who has not joined yet shows the older college record, if there is one.',
    },
  ],
};

/** The portfolio criterion states, plus the older coverage statuses. */
const STATUS: Record<string, { label: string; tone: Tone; rank: number }> = {
  referred: { label: 'Needs more', tone: 'action', rank: 0 },
  not_yet: { label: 'Needs more', tone: 'action', rank: 0 },
  iqa_rejected: { label: 'IQA sent back', tone: 'action', rank: 0 },
  submitted: { label: 'Submitted', tone: 'neutral', rank: 1 },
  ready_for_assessment: { label: 'Ready to assess', tone: 'neutral', rank: 1 },
  claimed: { label: 'Claimed', tone: 'neutral', rank: 2 },
  suggested: { label: 'Suggested', tone: 'neutral', rank: 2 },
  collecting: { label: 'Collecting evidence', tone: 'neutral', rank: 2 },
  partial: { label: 'In progress', tone: 'neutral', rank: 2 },
  not_started: { label: 'Not started', tone: 'neutral', rank: 3 },
  passed: { label: 'Passed', tone: 'done', rank: 4 },
  assessed: { label: 'Assessed', tone: 'done', rank: 4 },
  signed_off: { label: 'Signed off', tone: 'done', rank: 4 },
  iqa_confirmed: { label: 'IQA confirmed', tone: 'done', rank: 4 },
};
const statusOf = (s: string) =>
  STATUS[s] ?? { label: s.replace(/_/g, ' '), tone: 'neutral' as Tone, rank: 2 };

const LESSON_STATUS: Record<string, string> = {
  draft: 'Draft',
  ready: 'Ready',
  delivered: 'Delivered',
  scheduled: 'Scheduled',
};

const sentenceCase = (t: string | null | undefined) =>
  t ? t.charAt(0).toUpperCase() + t.slice(1) : t;

export default function AcDetailPage() {
  const { qualificationCode, unitCode, acCode } = useParams<{
    qualificationCode: string;
    unitCode: string;
    acCode: string;
  }>();
  const navigate = useNavigate();
  const { meta, resources, lessons, learners, loading, error } = useAcDetail(
    qualificationCode ?? null,
    unitCode ?? null,
    acCode ?? null
  );
  // The unit's criteria, so the composer can add more to the lesson.
  const { data: los } = useUnitDetail(qualificationCode ?? null, unitCode ?? null);
  const unitAcs = useMemo(() => los.flatMap((lo) => lo.acs), [los]);
  const { data: quals } = useQualifications();
  const qualTitle =
    quals.find((q) => q.code === qualificationCode)?.title ?? qualificationCode ?? '';
  const [genKey, setGenKey] = useState(0);
  const [genOpen, setGenOpen] = useState(false);

  useSEO({
    title: `Criterion ${acCode ?? ''} · Unit ${unitCode ?? ''} — College Hub`,
    description: 'Resources, lessons and learner progress against this assessment criterion.',
    noindex: true,
  });

  const sorted = useMemo(
    () =>
      [...learners].sort(
        (a, b) =>
          statusOf(a.status).rank - statusOf(b.status).rank ||
          a.student_name.localeCompare(b.student_name)
      ),
    [learners]
  );
  const counts = useMemo(() => {
    const c = { done: 0, action: 0, started: 0, none: 0 };
    for (const l of learners) {
      const st = statusOf(l.status);
      if (st.tone === 'done') c.done++;
      else if (st.tone === 'action') c.action++;
      else if (l.status === 'not_started') c.none++;
      else c.started++;
    }
    return c;
  }, [learners]);

  const thisAc: AcRow | null = meta
    ? {
        qualification_code: meta.qualification_code,
        unit_code: meta.unit_code,
        ac_code: meta.ac_code,
        ac_text: meta.ac_text ?? '',
        lo_number: meta.lo_number ?? 0,
        lo_text: meta.lo_text ?? '',
      }
    : null;

  const learnerSentence =
    learners.length === 0
      ? 'No learner at the college is on a course for this qualification.'
      : [
          `${plural(learners.length, 'learner')} on this qualification`,
          counts.done > 0 ? `${counts.done} passed` : 'none passed yet',
          counts.action > 0
            ? `${counts.action} need${counts.action === 1 ? 's' : ''} more evidence`
            : null,
          counts.started > 0 ? `${counts.started} under way` : null,
          counts.none > 0 ? `${counts.none} not started` : null,
        ]
          .filter(Boolean)
          .join(', ') + '.';

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title={acCode ? `Criterion ${acCode}` : 'Assessment criterion'}
        backTo="/college?section=courses"
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <TeachingScreen>
          <TeachingHeader
            eyebrow={[
              qualificationCode,
              unitCode && `Unit ${unitCode}`,
              meta?.lo_number && `LO ${meta.lo_number}`,
            ]
              .filter(Boolean)
              .join(' · ')}
            title={acCode ? `Assessment criterion ${acCode}` : 'Assessment criterion'}
            help={HELP}
            summary={meta ? sentenceCase(meta.ac_text) : loading ? 'Loading…' : undefined}
            sub={
              !loading && meta
                ? `${learnerSentence} ${
                    lessons.length === 0
                      ? 'No lesson plan covers it yet.'
                      : `${plural(lessons.length, 'lesson plan')} cover${lessons.length === 1 ? 's' : ''} it.`
                  }`
                : undefined
            }
            actions={
              thisAc ? (
                <button
                  type="button"
                  onClick={() => {
                    setGenKey((k) => k + 1);
                    setGenOpen(true);
                  }}
                  className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
                >
                  Plan a lesson for this criterion
                </button>
              ) : undefined
            }
          />

          {loading && <LoadingState />}

          {error && (
            <div className={cn(TEACH_PANEL, 'p-5 text-[13.5px] text-white')}>
              Could not load this criterion: {error}
            </div>
          )}

          {!loading && !error && !meta && (
            <TeachingEmpty
              title="Criterion not found"
              body={`There is no criterion ${acCode ?? ''} in unit ${unitCode ?? ''} of ${qualificationCode ?? 'this qualification'} in the catalogue.`}
            />
          )}

          {!loading && meta && (
            <>
              {meta.lo_text && (
                <motion.section variants={itemVariants} className={cn(TEACH_PANEL, 'p-4 sm:p-5')}>
                  <p className="text-[12px] font-semibold text-white">
                    Learning outcome {meta.lo_number ?? ''}
                    {meta.unit_title ? ` · ${meta.unit_title}` : ''}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white">
                    {sentenceCase(meta.lo_text)}
                  </p>
                </motion.section>
              )}

              <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <section className="min-w-0 space-y-4">
                  <CollegeSectionTitle
                    title="Learners"
                    sub={
                      learners.length > 0
                        ? 'Needs more first, then submitted, claimed, not started and passed.'
                        : undefined
                    }
                  />
                  {learners.length === 0 ? (
                    <TeachingEmpty
                      title="No learners on this qualification"
                      body="Learners appear here once they are on a course that leads to this qualification. Courses are set in Course setup."
                    />
                  ) : (
                    <motion.ul variants={itemVariants} className={TEACH_LIST}>
                      {sorted.map((l) => {
                        const st = statusOf(l.status);
                        return (
                          <li key={l.student_id}>
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/college?section=student360&studentId=${l.student_id}`)
                              }
                              className={TEACH_ROW}
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[14.5px] font-semibold text-white">
                                  {l.student_name}
                                </span>
                                <span className="mt-0.5 block truncate text-[12.5px] text-white">
                                  {l.source === 'coverage'
                                    ? 'Not joined yet · older college record'
                                    : l.source === 'unknown'
                                      ? 'Could not read their portfolio'
                                      : l.evidence_count > 0
                                        ? `${plural(l.evidence_count, 'piece')} of evidence`
                                        : 'No evidence yet'}
                                </span>
                              </span>
                              <StatusChip tone={st.tone}>{st.label}</StatusChip>
                              <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </section>

                <div className="min-w-0 space-y-8">
                  <section className="space-y-4">
                    <CollegeSectionTitle title="Lessons covering it" />
                    {lessons.length === 0 ? (
                      <TeachingEmpty
                        title="No lesson covers it yet"
                        body="No lesson plan maps to this criterion. That is a gap worth closing in the scheme of work."
                      />
                    ) : (
                      <motion.ul variants={itemVariants} className={TEACH_LIST}>
                        {lessons.map((l) => (
                          <li key={l.lesson_plan_id}>
                            <button
                              type="button"
                              onClick={() => navigate(`/college/lessons/${l.lesson_plan_id}`)}
                              className={TEACH_ROW}
                            >
                              <span className="min-w-0 flex-1">
                                <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
                                  {l.title}
                                </span>
                                <span className="mt-0.5 block text-[12.5px] text-white">
                                  {l.scheduled_date
                                    ? new Date(l.scheduled_date).toLocaleDateString('en-GB', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                      })
                                    : 'Not in the timetable'}
                                </span>
                              </span>
                              {l.status && (
                                <StatusChip
                                  tone={
                                    l.status === 'draft'
                                      ? 'action'
                                      : l.status === 'ready' || l.status === 'delivered'
                                        ? 'done'
                                        : 'neutral'
                                  }
                                >
                                  {LESSON_STATUS[l.status] ??
                                    sentenceCase(l.status.replace(/_/g, ' '))}
                                </StatusChip>
                              )}
                              <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </section>

                  <section className="space-y-4">
                    <CollegeSectionTitle title="Resources that teach it" />
                    {resources.length === 0 ? (
                      <TeachingEmpty
                        title="No resources tagged to it"
                        body="When a resource in Teaching resources is mapped to this criterion, it shows here."
                      />
                    ) : (
                      <motion.ul variants={itemVariants} className={TEACH_LIST}>
                        {resources.map((r) => (
                          <li
                            key={r.id}
                            className="flex min-h-[60px] items-start gap-3 px-4 py-3.5 sm:px-5"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block text-[14.5px] font-semibold text-white">
                                {r.title}
                              </span>
                              {r.description && (
                                <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-white">
                                  {r.description}
                                </span>
                              )}
                              <span className="mt-1 block text-[12px] text-white">
                                {[r.resource_type, !r.is_student_visible ? 'Staff only' : null]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </span>
                            </span>
                            {r.external_url && (
                              <a
                                href={r.external_url}
                                target="_blank"
                                rel="noreferrer noopener"
                                onClick={() =>
                                  void recordResourceEvent({
                                    resourceId: r.id,
                                    eventKind: 'open_link',
                                    context: 'ac_page',
                                  })
                                }
                                className={cn(TEACH_BTN, 'shrink-0')}
                              >
                                Open
                              </a>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </section>
                </div>
              </div>
            </>
          )}
        </TeachingScreen>

        {genOpen && thisAc && (
          <LessonGeneratorDialog
            key={genKey}
            open
            onOpenChange={(v) => {
              if (!v) setGenOpen(false);
            }}
            qualificationCode={thisAc.qualification_code}
            qualificationTitle={qualTitle}
            unitCode={thisAc.unit_code}
            unitTitle={meta?.unit_title ?? null}
            initialAcs={[thisAc]}
            availableAcs={unitAcs.length > 0 ? unitAcs : [thisAc]}
          />
        )}
      </HubBody>
    </HubPage>
  );
}
