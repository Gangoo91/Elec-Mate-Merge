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
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { TeachingScreen } from '@/components/college/teaching/TeachingKit';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useStudentIlp } from '@/hooks/useStudentIlp';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { IlpGenerateSheet } from '@/components/college/sheets/IlpGenerateSheet';

interface AIILPGeneratorSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type Risk = 'critical' | 'high' | 'medium' | 'low';
const RISK_RANK: Record<Risk, number> = { critical: 40, high: 25, medium: 10, low: 0 };
const RISK_LABEL: Record<Risk, string> = {
  critical: 'Critical risk',
  high: 'High risk',
  medium: 'Medium risk',
  low: 'Low risk',
};

const riskOf = (level: string | null | undefined): Risk => {
  const l = (level ?? '').toLowerCase();
  return l === 'critical' || l === 'high' || l === 'medium' ? l : 'low';
};

interface PickedStudent {
  id: string;
  name: string;
}


const HELP: PageHelpContent = {
  id: 'college-ilp-drafts',
  title: 'Draft learning plans',
  what: 'Drafts an individual learning plan for a learner from what their record already holds: attendance, criteria coverage, observations, off-the-job hours, end-point judgements and any earlier plan. It is written by AI; you review and edit it before anything is saved.',
  steps: [
    { title: 'Start at the top', body: 'Learners with no plan come first, then overdue reviews, then by risk.' },
    { title: 'Draft and review', body: 'Tap a learner. The draft streams in; change any goal or strategy before you save.' },
    { title: 'Save to their plan', body: 'Saving writes the plan and goals to the learner\'s record, where you review it with them.' },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Orange', body: 'high or critical risk, no plan, or review overdue' },
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
        const present = sessions.filter((a) => a.status === 'Present' || a.status === 'Late').length;
        const attendanceRate = sessions.length > 0 ? Math.round((present / sessions.length) * 100) : null;

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
        .filter((s) => (!q || s.name.toLowerCase().includes(q)) && (filterRisk === 'all' || s.risk === filterRisk))
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

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Learning plans"
        title="Draft learning plans"
        description="Draft a learner's individual learning plan from their record. You review it before anything is saved."
        help={HELP}
        actions={
          top ? (
            <button type="button" onClick={() => setPicked({ id: top.id, name: top.name })} className={COLLEGE_BTN_PRIMARY}>
              Draft a plan for {top.name.split(' ')[0]}
            </button>
          ) : undefined
        }
      />

      <CollegeStats
        items={[
          { label: 'No plan yet', value: String(stats.noIlp), sub: stats.noIlp > 0 ? 'draft these first' : 'every learner has a plan', warn: stats.noIlp > 0 },
          { label: 'Review overdue', value: String(stats.overdue), sub: stats.overdue > 0 ? 'a fresh draft gets you back on track' : 'reviews on schedule', warn: stats.overdue > 0 },
          {
            label: 'High or critical risk',
            value: String(stats.highRisk),
            sub: stats.critical > 0 ? `${stats.critical} critical` : stats.highRisk > 0 ? 'plans need support strategies' : 'nobody flagged high',
            warn: stats.highRisk > 0,
            onClick: () => setFilterRisk(stats.critical > 0 ? 'critical' : 'high'),
          },
          { label: 'On the roll', value: String(stats.total), sub: 'learners' },
        ]}
      />

      <section className="space-y-4">
        <CollegeSectionTitle title="Learners" sub="No plan first, then overdue reviews, then by risk. Tap one to draft." />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner"
            aria-label="Search learners"
            className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[15px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end">
            <button type="button" onClick={() => setFilterRisk('all')} className={chipCn(filterRisk === 'all')}>
              All · {stats.total}
            </button>
            {(['critical', 'high', 'medium', 'low'] as const).map((r) => (
              <button key={r} type="button" onClick={() => setFilterRisk(r)} className={chipCn(filterRisk === r)}>
                {RISK_LABEL[r]} · {stats.countOf(r)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <CollegeEmpty
            title={summaries.length === 0 ? 'No learners on the roll yet' : 'Nothing matches these filters'}
            body={summaries.length === 0 ? 'Add learners under People to draft their plans.' : 'Clear the search or pick All.'}
          />
        ) : (
          <motion.ul variants={itemVariants} className={cn(COLLEGE_LIST, 'lg:grid lg:grid-cols-2 lg:divide-y-0')}>
            {filtered.map((s) => {
              const flags = [
                s.hasNoIlp ? 'No plan' : null,
                s.reviewOverdue ? 'Review overdue' : null,
                s.attendanceRate !== null ? `attendance ${s.attendanceRate}%` : 'no attendance marks',
              ].filter(Boolean);
              const problem = s.risk === 'critical' || s.risk === 'high';
              return (
                <li key={s.id} className="lg:border-b lg:border-white/[0.06] lg:odd:border-r">
                  <button
                    type="button"
                    onClick={() => setPicked({ id: s.id, name: s.name })}
                    className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
                  >
                    <span
                      aria-hidden="true"
                      className={cn('h-9 w-1 shrink-0 rounded-full', problem || s.hasNoIlp || s.reviewOverdue ? 'bg-orange-400' : 'bg-white/[0.14]')}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">{s.name}</span>
                      <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">{flags.join(' · ')}</span>
                    </span>
                    {s.risk !== 'low' && (
                      <span className={cn('shrink-0 text-[12.5px] font-semibold', problem ? 'text-orange-400' : 'text-white')}>
                        {RISK_LABEL[s.risk]}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </section>

      {picked && <PickedSheet studentId={picked.id} studentName={picked.name} onClose={() => setPicked(null)} />}
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
