import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useAcDetail } from '@/hooks/useAcDetail';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { recordResourceEvent } from '@/hooks/useResourceAnalytics';

/* ==========================================================================
   AcDetailPage — /college/curriculum/ac/:qualCode/:unitCode/:acCode
   ELE-896 (B1). One page showing the AC's text, the resources tagged to
   it, the lessons that cover it, and learner progress against it.
   College Hub redesign (7 Oct 2026): landing ground, kit header with "?",
   figures, and three columns on a wide screen.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-ac-detail',
  title: 'An assessment criterion',
  what: 'Everything about one assessment criterion: what it says, which learners have met it, the resources that teach it and the lessons that cover it.',
  steps: [
    { title: 'See who is behind', body: 'Learners are listed with where they are: not started, in progress, or assessed and signed off. Tap one to open their record.' },
    { title: 'Teach it', body: 'Resources tagged to this criterion are ready to open or attach to a lesson.' },
    { title: 'Check coverage', body: 'Lessons that map to this criterion are listed. If none do, it is a gap in the scheme of work.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Green', body: 'assessed or signed off' },
    { swatch: 'bg-orange-400', label: 'Orange', body: 'not started' },
  ],
};

const STATUS_LABEL: Record<string, string> = {
  not_started: 'Not started',
  partial: 'In progress',
  collecting: 'Collecting evidence',
  ready_for_assessment: 'Ready to assess',
  assessed: 'Assessed',
  signed_off: 'Signed off',
};

const statusCn = (status: string) =>
  cn(
    'inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11.5px] font-semibold',
    status === 'signed_off' || status === 'assessed'
      ? 'border-emerald-400 text-emerald-400'
      : status === 'not_started'
        ? 'border-orange-400 text-orange-400'
        : 'border-white/[0.2] text-white'
  );

const label = (status: string) => STATUS_LABEL[status] ?? status.replace(/_/g, ' ');

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

  useSEO({
    title: `AC ${acCode ?? ''} · ${unitCode ?? ''} — College Hub`,
    description: 'Resources, lessons and learner progress against this Assessment Criterion.',
    noindex: true,
  });

  const learnerStats = learners.reduce(
    (acc, l) => {
      if (l.status === 'signed_off' || l.status === 'assessed') acc.done++;
      else if (l.status === 'not_started') acc.notStarted++;
      else acc.partial++;
      return acc;
    },
    { done: 0, partial: 0, notStarted: 0 }
  );

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title={acCode ? `AC ${acCode}` : 'Assessment criterion'}
        onBack={() => navigate(-1)}
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow={[qualificationCode, unitCode && `Unit ${unitCode}`, meta?.lo_number && `LO ${meta.lo_number}`].filter(Boolean).join(' · ')}
          title={acCode ? `Assessment criterion ${acCode}` : 'Assessment criterion'}
          description={meta?.ac_text ?? (loading ? 'Loading…' : undefined)}
        />

        {loading && <LoadingState />}

        {error && <div className="rounded-2xl border border-orange-400/40 px-5 py-4 text-[13.5px] text-white">{error}</div>}

        {!loading && meta && (
          <>
            <CollegeStats
              items={[
                { label: 'Assessed or signed off', value: String(learnerStats.done), sub: `of ${learners.length} learners`, good: learnerStats.done > 0 && learnerStats.done === learners.length },
                { label: 'In progress', value: String(learnerStats.partial), sub: 'collecting or ready to assess' },
                { label: 'Not started', value: String(learnerStats.notStarted), sub: 'no evidence yet', warn: learnerStats.notStarted > 0 },
                { label: 'Lessons covering it', value: String(lessons.length), sub: `${resources.length} resource${resources.length === 1 ? '' : 's'} tagged`, warn: lessons.length === 0 },
              ]}
            />

            {meta.lo_text && (
              <motion.section variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_CARD}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  Learning outcome {meta.lo_number ?? ''}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-white">{meta.lo_text}</p>
                {meta.unit_title && <p className="mt-2 text-[12.5px] text-white">{meta.unit_title}</p>}
              </motion.section>
            )}

            <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
              <section className="space-y-4">
                <CollegeSectionTitle title="Learners" sub={learners.length > 20 ? `First 20 of ${learners.length}` : `${learners.length} learners`} />
                {learners.length === 0 ? (
                  <CollegeEmpty title="No learners on this qualification yet" />
                ) : (
                  <motion.ul variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_LIST}>
                    {learners.slice(0, 20).map((l) => (
                      <li key={l.student_id}>
                        <button
                          type="button"
                          onClick={() => navigate(`/college/students/${l.student_id}`)}
                          className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14.5px] font-semibold text-white">{l.student_name}</span>
                            <span className="mt-0.5 block text-[12.5px] text-white">{l.evidence_count} evidence</span>
                          </span>
                          <span className={statusCn(l.status)}>{label(l.status)}</span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </section>

              <section className="space-y-4">
                <CollegeSectionTitle title="Resources that teach it" sub={`${resources.length} tagged`} />
                {resources.length === 0 ? (
                  <CollegeEmpty title="No resources tagged yet" body="Tag resources to this criterion from the Teaching resources library." />
                ) : (
                  <motion.ul variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_LIST}>
                    {resources.map((r) => (
                      <li key={r.id} className="flex min-h-[60px] items-start gap-3 px-5 py-3.5 sm:px-6">
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14.5px] font-semibold text-white">{r.title}</span>
                          {r.description && <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-white">{r.description}</span>}
                          <span className="mt-1 block text-[12px] text-white">
                            {[r.resource_type, !r.is_student_visible ? 'Staff only' : null].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                        {r.external_url && (
                          <a
                            href={r.external_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={() =>
                              void recordResourceEvent({ resourceId: r.id, eventKind: 'open_link', context: 'ac_page' })
                            }
                            className="inline-flex h-11 shrink-0 items-center rounded-xl border border-white/[0.14] px-3 text-[12.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                          >
                            Open
                          </a>
                        )}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </section>

              <section className="space-y-4">
                <CollegeSectionTitle title="Lessons covering it" sub={`${lessons.length} mapped`} />
                {lessons.length === 0 ? (
                  <CollegeEmpty title="No lessons mapped yet" body="No lesson plan maps to this criterion. That is a gap worth closing in the scheme of work." />
                ) : (
                  <motion.ul variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_LIST}>
                    {lessons.map((l) => (
                      <li key={l.lesson_plan_id}>
                        <button
                          type="button"
                          onClick={() => navigate(`/college/lessons/${l.lesson_plan_id}`)}
                          className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">{l.title}</span>
                            <span className="mt-0.5 block text-[12.5px] text-white">
                              {[l.scheduled_date ? new Date(l.scheduled_date).toLocaleDateString('en-GB') : 'No date', l.status ? label(l.status) : null]
                                .filter(Boolean)
                                .join(' · ')}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </section>
            </div>
          </>
        )}
      </HubBody>
    </HubPage>
  );
}
