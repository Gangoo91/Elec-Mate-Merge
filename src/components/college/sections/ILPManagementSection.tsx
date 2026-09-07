/**
 * ILPManagementSection — every learner's current learning plan.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → overdue reviews (needs you) → create an ILP → filters → plans
 *
 * What went: the PageHero, the orange StatStrip, the `bg-[hsl(0_0%_12%)]`
 * cohort select, the red/amber avatar rings and the green/amber/blue status
 * pills. Colour now encodes state only: a red date on a review that is
 * overdue, volt on one due this week.
 *
 * The hub's KPI already counts overdue reviews, so this row carries what the
 * hub does not — reviews due this week, learners with no plan at all, and how
 * many targets across the active plans have been met.
 *
 * Data unchanged: current versions only (`college_ilps.is_current`), goals
 * from `college_ilp_goals` keyed by plan, the same HubIlpSheet Student 360
 * uses for both viewing and creating.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
  HubWorkList,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { useCollegeILPs, useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { HubIlpSheet } from '@/components/college/sheets/HubIlpSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';

const DAY_MS = 86_400_000;

type Goal = { ilp_id: string; title: string; status: string };

const goalDone = (status: string) => status === 'completed' || status === 'verified';

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

export function ILPManagementSection() {
  const { data: ilps = [], isLoading: ilpsLoading } = useCollegeILPs();
  const { data: overdueReviews = [] } = useOverdueILPReviews();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const { data: cohorts = [] } = useCollegeCohorts();

  // Goals are unified with Student 360 in college_ilp_goals — pull them for the
  // listed ILPs and key by ilp_id so this list shows the same goals 360 does.
  const ilpIds = useMemo(() => ilps.map((i) => i.id), [ilps]);
  const { data: allGoals = [] } = useQuery({
    queryKey: ['college-ilp-goals', ilpIds],
    queryFn: async () => {
      if (!ilpIds.length) return [] as Goal[];
      const { data } = await supabase
        .from('college_ilp_goals')
        .select('ilp_id, title, status')
        .in('ilp_id', ilpIds);
      return (data ?? []) as Goal[];
    },
    enabled: ilpIds.length > 0,
  });
  const goalsByIlp = useMemo(() => {
    const m = new Map<string, Goal[]>();
    for (const g of allGoals) {
      const arr = m.get(g.ilp_id) ?? [];
      arr.push(g);
      m.set(g.ilp_id, arr);
    }
    return m;
  }, [allGoals]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  // The unified ILP editor (shared with Student 360). `viewStudent` opens an
  // existing learner's plan; `createOpen` shows the learner picker first.
  const [viewStudent, setViewStudent] = useState<{ id: string; name: string } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const queryClient = useQueryClient();
  const refreshIlps = () => {
    void queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    void queryClient.invalidateQueries({ queryKey: ['college-ilp-goals'] });
  };
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    await queryClient.invalidateQueries({ queryKey: ['college-ilp-goals'] });
  };

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const staffById = useMemo(() => new Map(staff.map((s) => [s.id, s])), [staff]);
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );
  const cohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const tutorName = (reviewedBy: string | null) =>
    !reviewedBy ? 'No tutor' : staffById.get(reviewedBy)?.name || 'Unknown tutor';

  const openIlp = (studentId: string | null) => {
    if (!studentId) return;
    const student = studentById.get(studentId);
    setViewStudent({ id: studentId, name: student?.name || 'Learner' });
  };

  // Status is unified-lowercase (active / draft / archived) to match Student 360.
  const statusOf = (s: string | null) => (s ?? '').toLowerCase();
  const statusLabel = (status: string | null): string => {
    const s = statusOf(status);
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown';
  };

  const activeIlps = ilps.filter((i) => statusOf(i.status) === 'active');
  const draftCount = ilps.filter((i) => statusOf(i.status) === 'draft').length;
  const archivedCount = ilps.filter((i) => statusOf(i.status) === 'archived').length;

  const now = Date.now();
  const reviewState = (reviewDate: string | null): 'overdue' | 'soon' | 'later' | 'none' => {
    if (!reviewDate) return 'none';
    const t = new Date(reviewDate).getTime();
    if (t < now) return 'overdue';
    if (t <= now + 7 * DAY_MS) return 'soon';
    return 'later';
  };

  const dueThisWeek = activeIlps.filter((i) => reviewState(i.review_date) === 'soon').length;

  const activeLearnersWithoutPlan = useMemo(() => {
    const withPlan = new Set(activeIlps.map((i) => i.student_id));
    return students.filter(
      (s) => (s.status ?? '').toLowerCase() === 'active' && !withPlan.has(s.id)
    ).length;
  }, [students, activeIlps]);

  const targets = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const ilp of activeIlps) {
      for (const g of goalsByIlp.get(ilp.id) ?? []) {
        total += 1;
        if (goalDone(g.status)) done += 1;
      }
    }
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : null };
  }, [activeIlps, goalsByIlp]);

  const q = searchQuery.trim().toLowerCase();
  const filteredILPs = useMemo(
    () =>
      ilps
        .filter((ilp) => {
          const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
          const goals = goalsByIlp.get(ilp.id) ?? [];
          const matchesSearch =
            !q ||
            (student?.name ?? '').toLowerCase().includes(q) ||
            goals.some((g) => (g.title ?? '').toLowerCase().includes(q));
          const matchesStatus = filterStatus === 'all' || statusOf(ilp.status) === filterStatus;
          const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
          return matchesSearch && matchesStatus && matchesCohort;
        })
        // Overdue first, then soonest review.
        .sort((a, b) => {
          const rank = { overdue: 0, soon: 1, later: 2, none: 3 } as const;
          const ra = rank[reviewState(a.review_date)];
          const rb = rank[reviewState(b.review_date)];
          if (ra !== rb) return ra - rb;
          return (a.review_date ?? '').localeCompare(b.review_date ?? '');
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ilps, studentById, goalsByIlp, q, filterStatus, filterCohort]
  );

  const overdueItems: HubWorkItem[] = overdueReviews.map((ilp) => {
    const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
    const overdueDays = ilp.review_date
      ? Math.max(0, Math.floor((now - new Date(ilp.review_date).getTime()) / DAY_MS))
      : null;
    return {
      id: `overdue-${ilp.id}`,
      title: student?.name ?? 'Unknown learner',
      reason: [
        cohortName(student?.cohort_id),
        ilp.review_date ? `Review was due ${shortDate(ilp.review_date)}` : 'Review overdue',
      ].join(' · '),
      trailing: overdueDays !== null ? `${overdueDays}d` : undefined,
      // A month late is when a plan stops steering anything.
      urgent: overdueDays !== null && overdueDays >= 28,
      onClick: () => openIlp(ilp.student_id),
    };
  });

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      {/* The hub counts overdue reviews; this row carries what it does not. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Reviews due this week"
          value={String(dueThisWeek)}
          verdict={dueThisWeek > 0 ? 'Book them in before they slip' : 'Nothing falls due this week'}
          context={overdueReviews.length > 0 ? `${overdueReviews.length} already overdue` : undefined}
          sentiment={dueThisWeek > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Active plans"
          value={String(activeIlps.length)}
          verdict={activeIlps.length > 0 ? 'Current versions on file' : 'No plans yet'}
          context={
            draftCount > 0 || archivedCount > 0
              ? [draftCount > 0 ? `${draftCount} draft` : null, archivedCount > 0 ? `${archivedCount} archived` : null]
                  .filter(Boolean)
                  .join(' · ')
              : undefined
          }
          onClick={() => setFilterStatus('active')}
        />
        <HubKpi
          label="No plan"
          value={String(activeLearnersWithoutPlan)}
          verdict={
            activeLearnersWithoutPlan > 0
              ? 'Active learners with no current ILP'
              : 'Every active learner has a plan'
          }
          sentiment={activeLearnersWithoutPlan > 0 ? 'bad' : 'neutral'}
          onClick={activeLearnersWithoutPlan > 0 ? () => setCreateOpen(true) : undefined}
        />
        <HubKpi
          label="Targets met"
          value={targets.pct === null ? '—' : `${targets.pct}%`}
          verdict={
            targets.total === 0
              ? 'No targets set on active plans'
              : `${targets.done} of ${targets.total} across active plans`
          }
        />
      </HubKpiRow>

      {/* Renders nothing when no review is overdue. */}
      <HubWorkList label="Overdue reviews" items={overdueItems} unit="review" />

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
          <HubSectionHeading>Learning plans</HubSectionHeading>
          {/* The one solid volt control on this screen. */}
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            Create an ILP
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner or target"
            aria-label="Search learning plans"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['all', `All · ${ilps.length}`],
                ['active', `Active · ${activeIlps.length}`],
                ['draft', `Draft · ${draftCount}`],
                ['archived', `Archived · ${archivedCount}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterStatus(value)}
                className={chipCn(filterStatus === value)}
              >
                {label}
              </button>
            ))}
          </div>
          {activeCohorts.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFilterCohort('all')}
                className={chipCn(filterCohort === 'all')}
              >
                All cohorts
              </button>
              {activeCohorts.map((cohort) => (
                <button
                  key={cohort.id}
                  type="button"
                  onClick={() => setFilterCohort(cohort.id)}
                  className={chipCn(filterCohort === cohort.id)}
                >
                  {cohort.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {ilpsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filteredILPs.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {ilps.length === 0
                ? 'No learning plans yet — create one to start.'
                : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredILPs.map((ilp) => {
                const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
                const goals = goalsByIlp.get(ilp.id) ?? [];
                const done = goals.filter((g) => goalDone(g.status)).length;
                const state = reviewState(ilp.review_date);
                const status = statusOf(ilp.status);
                const reason = [
                  cohortName(student?.cohort_id),
                  tutorName(ilp.reviewed_by),
                  goals.length > 0 ? `${done}/${goals.length} targets met` : 'No targets yet',
                  status !== 'active' ? statusLabel(ilp.status) : null,
                ]
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <li key={ilp.id}>
                    <button
                      type="button"
                      onClick={() => openIlp(ilp.student_id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          state === 'overdue'
                            ? 'bg-red-400'
                            : state === 'soon'
                              ? 'bg-elec-yellow'
                              : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {student?.name ?? 'Unknown learner'}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      {ilp.review_date && (
                        <span
                          className={cn(
                            'shrink-0 text-right text-[12px] font-semibold tabular-nums leading-tight',
                            state === 'overdue'
                              ? 'text-red-300'
                              : state === 'soon'
                                ? 'text-elec-yellow'
                                : 'text-white'
                          )}
                        >
                          {state === 'overdue' ? 'Overdue' : 'Review'}
                          <span className="block">{shortDate(ilp.review_date)}</span>
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

      {/* Unified ILP editor — same data + UI as Student 360 (writes
          college_ilps + college_ilp_goals, never the legacy JSONB targets). */}
      <HubIlpSheet
        mode="view"
        open={viewStudent !== null}
        onOpenChange={(o) => {
          if (!o) setViewStudent(null);
        }}
        student={viewStudent}
        onClosed={refreshIlps}
      />
      <HubIlpSheet
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
        students={students.map((s) => ({
          id: s.id,
          name: s.name,
          photo_url: s.photo_url,
          cohort_id: s.cohort_id,
        }))}
        getCohortName={cohortName}
        onClosed={refreshIlps}
      />
    </PullToRefresh>
  );
}
