/**
 * AIILPGeneratorSection — pick a learner, then open the real streamed ILP
 * generator (IlpGenerateSheet wrapping the ai-generate-ilp edge function).
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → draft for the top learner → filters → learners
 *
 * What went: the PageHero with its "AI" pill, the red/amber StatStrip, the
 * risk-toned initials and the red/amber flag pills. Colour encodes state only:
 * red on Critical or High risk, volt on Medium.
 *
 * One thing corrected. `risk_level` is Capitalised in the live table
 * (Critical, High, Medium) and this page compared it to 'high', 'medium' and
 * 'low' — so every learner sorted as low risk, the risk filters were always
 * empty and the "High risk" count was always 0. Compared case-insensitively
 * now, and Critical is recognised as the level above High.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { TeachTabs, TeachingScreen } from '@/components/college/teaching/TeachingKit';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useStudentIlp } from '@/hooks/useStudentIlp';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { IlpGenerateSheet } from '@/components/college/sheets/IlpGenerateSheet';

interface AIILPGeneratorSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type Risk = 'critical' | 'high' | 'medium' | 'low' | 'none';
const RISK_RANK: Record<Risk, number> = { critical: 40, high: 25, medium: 10, low: 0, none: 0 };
const RISK_LABEL: Record<Risk, string> = {
  critical: 'Critical risk',
  high: 'High risk',
  medium: 'Medium risk',
  low: 'Low risk',
  none: 'No risk score',
};

/** A learner with no risk score is "No risk score", never quietly "Low". */
const riskOf = (level: string | null | undefined): Risk => {
  const l = (level ?? '').toLowerCase();
  return l === 'critical' || l === 'high' || l === 'medium' || l === 'low' ? l : 'none';
};

/** Status chip: border and text only. */
const STATUS_CHIP =
  'inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold';

interface PickedStudent {
  id: string;
  name: string;
}

const HELP: PageHelpContent = {
  id: 'college-ilp-drafts',
  title: 'Draft learning plans',
  what: 'Drafts an individual learning plan for a learner from what their record already holds: attendance, criteria coverage, observations, off-the-job hours, end-point judgements and any earlier plan. It is written by AI; you review and edit it before anything is saved.',
  steps: [
    {
      title: 'Start at the top',
      body: 'Learners with no plan come first, then overdue reviews, then by risk.',
    },
    {
      title: 'Draft and review',
      body: 'Tap a learner. The draft streams in; change any goal or strategy before you save.',
    },
    {
      title: 'Save to their plan',
      body: "Saving writes the plan and goals to the learner's record, where you review it with them.",
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-400',
      label: 'Orange',
      body: 'high or critical risk, no plan, or review overdue',
    },
  ],
};

export function AIILPGeneratorSection({ onNavigate: _onNavigate }: AIILPGeneratorSectionProps) {
  void _onNavigate;
  const { students, attendance, ilps, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | Risk>('all');
  const [picked, setPicked] = useState<PickedStudent | null>(null);

  // Per-learner summary used to sort and flag the picker list.
  const summaries = useMemo(
    () =>
      students.map((s) => {
        const sessions = attendance.filter((a) => a.student_id === s.id);
        const present = sessions.filter(
          (a) => a.status === 'Present' || a.status === 'Late'
        ).length;
        const attendanceRate =
          sessions.length > 0 ? Math.round((present / sessions.length) * 100) : null;

        const studentIlps = ilps.filter((i) => i.student_id === s.id);
        const latestIlp = studentIlps[0] ?? null;
        const reviewDueAt = latestIlp?.review_date ? new Date(latestIlp.review_date) : null;
        const reviewOverdue = !!reviewDueAt && reviewDueAt < new Date();

        return {
          id: s.id,
          name: s.name,
          cohort: s.cohort_id,
          risk: riskOf(s.risk_level),
          attendanceRate,
          hasNoIlp: studentIlps.length === 0,
          reviewOverdue,
        };
      }),
    [students, attendance, ilps]
  );

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      summaries
        .filter(
          (s) =>
            (!q || s.name.toLowerCase().includes(q)) &&
            (filterRisk === 'all' || s.risk === filterRisk)
        )
        // Priorities to the top: no ILP, then overdue review, then risk.
        .sort((a, b) => {
          const score = (s: typeof a) =>
            (s.hasNoIlp ? 100 : 0) + (s.reviewOverdue ? 50 : 0) + RISK_RANK[s.risk];
          return score(b) - score(a);
        }),
    [summaries, q, filterRisk]
  );

  const stats = useMemo(() => {
    const noIlp = summaries.filter((s) => s.hasNoIlp).length;
    const overdue = summaries.filter((s) => !s.hasNoIlp && s.reviewOverdue).length;
    const highRisk = summaries.filter((s) => s.risk === 'critical' || s.risk === 'high').length;
    const critical = summaries.filter((s) => s.risk === 'critical').length;
    const countOf = (r: Risk) => summaries.filter((s) => s.risk === r).length;
    return { noIlp, overdue, highRisk, critical, total: summaries.length, countOf };
  }, [summaries]);

  const top = filtered[0];

  // Say plainly that AI writes the draft, then the counts the old tiles held.
  const summary = [
    'AI drafts a learner\u2019s individual learning plan from their record. You check and edit it before anything is saved.',
    isLoading
      ? ''
      : stats.noIlp > 0
        ? `${stats.noIlp} ${stats.noIlp === 1 ? 'learner has' : 'learners have'} no plan yet.`
        : 'Every learner has a plan.',
    !isLoading && stats.overdue > 0
      ? `${stats.overdue} ${stats.overdue === 1 ? 'plan is' : 'plans are'} past review.`
      : '',
    !isLoading && stats.highRisk > 0 ? `${stats.highRisk} at high or critical risk.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Learning plans"
        title="Draft learning plans"
        description={summary}
        help={HELP}
        actions={
          top ? (
            <button
              type="button"
              onClick={() => setPicked({ id: top.id, name: top.name })}
              className={cn(COLLEGE_BTN_PRIMARY, 'w-full sm:w-auto')}
            >
              Draft a plan for {top.name.split(' ')[0]}
            </button>
          ) : undefined
        }
      />

      <section className="space-y-4">
        <CollegeSectionTitle
          title="Learners"
          sub="No plan first, then overdue reviews, then by risk. Tap one to draft."
        />

        <div className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner"
            aria-label="Search learners"
            className="h-11 w-full lg:max-w-md rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[15px] text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
          />
          <TeachTabs
            label="Risk"
            value={filterRisk}
            onChange={setFilterRisk}
            tabs={[
              { value: 'all' as const, label: 'All', count: stats.total },
              ...(['critical', 'high', 'medium', 'low', 'none'] as const)
                .filter((r) => r !== 'none' || stats.countOf('none') > 0)
                .map((r) => ({ value: r, label: RISK_LABEL[r], count: stats.countOf(r) })),
            ]}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <CollegeEmpty
            title={
              summaries.length === 0
                ? 'No learners on the roll yet'
                : 'Nothing matches these filters'
            }
            body={
              summaries.length === 0
                ? 'Add learners under People to draft their plans.'
                : 'Clear the search or pick All.'
            }
          />
        ) : (
          <motion.ul
            variants={itemVariants}
            className={cn(COLLEGE_LIST, 'lg:grid lg:grid-cols-2 lg:divide-y-0')}
          >
            {filtered.map((s) => {
              const problem = s.risk === 'critical' || s.risk === 'high';
              return (
                <li key={s.id} className="lg:border-b lg:border-white/[0.06] lg:odd:border-r">
                  <button
                    type="button"
                    onClick={() => setPicked({ id: s.id, name: s.name })}
                    className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="truncate text-[14.5px] font-semibold leading-tight text-white">
                          {s.name}
                        </span>
                        {s.hasNoIlp && (
                          <span className={cn(STATUS_CHIP, 'border-orange-400/60 text-orange-300')}>
                            No plan
                          </span>
                        )}
                        {s.reviewOverdue && (
                          <span className={cn(STATUS_CHIP, 'border-orange-400/60 text-orange-300')}>
                            Review overdue
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">
                        {s.attendanceRate !== null
                          ? `Attendance ${s.attendanceRate}%`
                          : 'No attendance marks yet'}
                      </span>
                    </span>
                    <span
                      className={cn(
                        STATUS_CHIP,
                        problem
                          ? 'border-orange-400/60 text-orange-300'
                          : 'border-white/[0.16] text-white'
                      )}
                    >
                      {RISK_LABEL[s.risk]}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </section>

      {picked && (
        <PickedSheet
          studentId={picked.id}
          studentName={picked.name}
          onClose={() => setPicked(null)}
        />
      )}
    </TeachingScreen>
  );
}

/* ==========================================================================
   PickedSheet — wraps IlpGenerateSheet with the per-student `useStudentIlp`
   hook so the draft can be saved straight to the learner's ILP record.
   Mounted only when a learner is picked so the hook is not fired for every
   learner up-front.
   ========================================================================== */

function PickedSheet({
  studentId,
  studentName,
  onClose,
}: {
  studentId: string;
  studentName: string;
  onClose: () => void;
}) {
  const ilp = useStudentIlp({ collegeStudentId: studentId });

  return (
    <IlpGenerateSheet
      open
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      studentId={studentId}
      studentName={studentName}
      hookActions={{ upsertIlp: ilp.upsertIlp, addGoal: ilp.addGoal }}
      onSaved={onClose}
    />
  );
}
