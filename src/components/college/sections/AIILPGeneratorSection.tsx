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
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
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

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

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
    <>
      <HubKpiRow>
        <HubKpi
          accent
          label="No plan yet"
          value={String(stats.noIlp)}
          verdict={stats.noIlp > 0 ? 'Draft these first' : 'Every learner has a plan'}
          sentiment={stats.noIlp > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Review overdue"
          value={String(stats.overdue)}
          verdict={stats.overdue > 0 ? 'A fresh draft is a quick way back on schedule' : 'Reviews on schedule'}
          sentiment={stats.overdue > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="High or critical risk"
          value={String(stats.highRisk)}
          verdict={
            stats.critical > 0
              ? `${stats.critical} critical`
              : stats.highRisk > 0
                ? 'Plans for these need support strategies'
                : 'Nobody flagged high'
          }
          context={stats.total > 0 ? `${stats.total} on the roll` : undefined}
          sentiment={stats.highRisk > 0 ? 'bad' : 'neutral'}
          onClick={() => setFilterRisk(stats.critical > 0 ? 'critical' : 'high')}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <HubSectionHeading>Learners</HubSectionHeading>
          {/* The one solid volt control on this screen — drafts for whoever
              is at the top of the ranked list. */}
          {top && (
            <button
              type="button"
              onClick={() => setPicked({ id: top.id, name: top.name })}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
            >
              Draft a plan for {top.name.split(' ')[0]}
            </button>
          )}
        </motion.div>

        <motion.p variants={itemVariants} className="max-w-prose text-[13px] leading-relaxed text-white">
          Pick a learner and a plan is drafted from their attendance, criteria coverage, observations,
          off-the-job record, EPA verdicts and any prior plan. You review it before anything is saved.
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner"
            aria-label="Search learners"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setFilterRisk('all')} className={chipCn(filterRisk === 'all')}>
              All · {stats.total}
            </button>
            {(['critical', 'high', 'medium', 'low'] as const).map((r) => (
              <button key={r} type="button" onClick={() => setFilterRisk(r)} className={chipCn(filterRisk === r)}>
                {RISK_LABEL[r]} · {stats.countOf(r)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {summaries.length === 0
                ? 'No learners on the roll yet — add learners under People to draft plans.'
                : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filtered.map((s) => {
                const flags = [
                  s.hasNoIlp ? 'No plan' : null,
                  s.reviewOverdue ? 'Review overdue' : null,
                  s.attendanceRate !== null ? `attendance ${s.attendanceRate}%` : 'no attendance marks',
                ].filter(Boolean);
                const problem = s.risk === 'critical' || s.risk === 'high';
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setPicked({ id: s.id, name: s.name })}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          problem ? 'bg-red-400' : s.hasNoIlp || s.reviewOverdue ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {flags.join(' · ')}
                        </span>
                      </span>
                      {s.risk !== 'low' && (
                        <span
                          className={cn(
                            'shrink-0 text-[12px] font-semibold',
                            problem ? 'text-red-300' : 'text-elec-yellow'
                          )}
                        >
                          {RISK_LABEL[s.risk]}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      {picked && (
        <PickedSheet studentId={picked.id} studentName={picked.name} onClose={() => setPicked(null)} />
      )}
    </>
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
