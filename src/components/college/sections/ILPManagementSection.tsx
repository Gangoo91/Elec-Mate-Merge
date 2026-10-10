/**
 * ILPManagementSection — every learner's current learning plan.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   header + help → figures → review, plan and target charts → plans
 *   (left) with overdue reviews beside them (right). Mine first (ELE-1886).
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
import { Search, X } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { FilterChips, FilterSheetButton } from '@/components/college/people/peopleKit';
import { Ring, VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { Bars, ScopeToggle, useScope } from '@/components/college/assessment/AssessmentKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { CLearnerRow } from '@/components/college/assessment/CLearnerRow';
import { useCollegeILPs, useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { HubIlpSheet } from '@/components/college/sheets/HubIlpSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';

const DAY_MS = 86_400_000;

/** Today's calendar date in Europe/London as YYYY-MM-DD. */
function londonTodayIso(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}
function isoToUtc(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}
function addDaysIso(iso: string, days: number): string {
  return new Date(isoToUtc(iso) + days * DAY_MS).toISOString().slice(0, 10);
}

type Goal = { ilp_id: string; title: string; status: string };

const goalDone = (status: string) => status === 'completed' || status === 'verified';

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

type ReviewFilter = 'all' | 'overdue' | 'soon' | 'later' | 'none';

const HELP: PageHelpContent = {
  id: 'college-ilp-management',
  title: 'Learning plans',
  what: 'Every learner\u2019s current individual learning plan: its targets, how many are met, and when the plan is next reviewed. Overdue reviews sit on the right so nothing slips.',
  steps: [
    {
      title: 'Clear overdue reviews',
      body: 'The list on the right is every plan whose review date has passed, oldest first. Tap one to open the plan and review it.',
    },
    {
      title: 'Read the charts',
      body: 'Review status and plan status are tappable: tap a bar to filter the list to just those plans.',
    },
    {
      title: 'Create a plan',
      body: 'Create an ILP lets you pick a learner and build their plan. It is the same plan Student 360 shows.',
    },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Overdue', body: 'The review date has passed.' },
    { swatch: 'bg-elec-yellow', label: 'Due this week', body: 'Book it in before it slips.' },
    {
      swatch: 'bg-emerald-400',
      label: 'Targets met',
      body: 'Completed or verified targets on active plans.',
    },
  ],
  notes: [
    {
      title: 'My learners',
      body: 'Opens on the cohorts you lead. Switch to Everyone for the whole college.',
    },
  ],
};

export function ILPManagementSection() {
  const { data: ilps = [], isLoading: ilpsLoading } = useCollegeILPs();
  const { data: overdueReviews = [] } = useOverdueILPReviews();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const { data: cohorts = [] } = useCollegeCohorts();
  const my = useMyLearners();
  const [scope, setScope] = useScope('ilpmanagement', my);

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
  const [filterReview, setFilterReview] = useState<ReviewFilter>('all');
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
  const isMineStudent = (id: string | null) => {
    if (!id) return false;
    const st = studentById.get(id);
    return my.isMine({ studentId: id, userId: st?.user_id, cohortId: st?.cohort_id });
  };
  const allIlps = ilps;
  const mineIlpCount = allIlps.filter((i) => isMineStudent(i.student_id)).length;
  const scopedIlps =
    scope === 'mine' ? allIlps.filter((i) => isMineStudent(i.student_id)) : allIlps;
  const scopedStudents = scope === 'mine' ? students.filter((s) => isMineStudent(s.id)) : students;
  const scopedOverdue =
    scope === 'mine' ? overdueReviews.filter((i) => isMineStudent(i.student_id)) : overdueReviews;
  const activeCohorts = useMemo(
    () =>
      cohorts.filter(
        (c) =>
          (c.status ?? '').toLowerCase() === 'active' && (scope === 'all' || my.cohortIds.has(c.id))
      ),
    [cohorts, scope, my.cohortIds]
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

  const activeIlps = scopedIlps.filter((i) => statusOf(i.status) === 'active');
  const draftCount = scopedIlps.filter((i) => statusOf(i.status) === 'draft').length;
  const archivedCount = scopedIlps.filter((i) => statusOf(i.status) === 'archived').length;

  // Compare calendar dates as ISO strings against today in London, never
  // new Date('YYYY-MM-DD') (UTC midnight) against Date.now(): that made a
  // review due today read "Overdue" here but not in the header count.
  const todayIso = londonTodayIso();
  const weekIso = addDaysIso(todayIso, 7);
  const reviewState = (reviewDate: string | null): 'overdue' | 'soon' | 'later' | 'none' => {
    if (!reviewDate) return 'none';
    const d = reviewDate.slice(0, 10);
    if (d < todayIso) return 'overdue';
    if (d <= weekIso) return 'soon';
    return 'later';
  };

  const dueThisWeek = activeIlps.filter((i) => reviewState(i.review_date) === 'soon').length;

  const activeLearnersWithoutPlan = useMemo(() => {
    const withPlan = new Set(activeIlps.map((i) => i.student_id));
    return scopedStudents.filter(
      (s) => (s.status ?? '').toLowerCase() === 'active' && !withPlan.has(s.id)
    ).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, activeIlps, scope, my.studentIds]);

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
      scopedIlps
        .filter((ilp) => {
          const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
          const goals = goalsByIlp.get(ilp.id) ?? [];
          const matchesSearch =
            !q ||
            (student?.name ?? '').toLowerCase().includes(q) ||
            goals.some((g) => (g.title ?? '').toLowerCase().includes(q));
          const matchesStatus = filterStatus === 'all' || statusOf(ilp.status) === filterStatus;
          const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
          const matchesReview =
            filterReview === 'all' || reviewState(ilp.review_date) === filterReview;
          return matchesSearch && matchesStatus && matchesCohort && matchesReview;
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
    [scopedIlps, studentById, goalsByIlp, q, filterStatus, filterCohort, filterReview]
  );

  const overdueRows = scopedOverdue
    .map((ilp) => {
      const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
      const overdueDays = ilp.review_date
        ? Math.max(
            0,
            Math.round((isoToUtc(todayIso) - isoToUtc(ilp.review_date.slice(0, 10))) / DAY_MS)
          )
        : null;
      return { ilp, student, overdueDays };
    })
    .sort((a, b) => (b.overdueDays ?? 0) - (a.overdueDays ?? 0));

  const reviewCounts = {
    overdue: activeIlps.filter((i) => reviewState(i.review_date) === 'overdue').length,
    soon: dueThisWeek,
    later: activeIlps.filter((i) => reviewState(i.review_date) === 'later').length,
    none: activeIlps.filter((i) => reviewState(i.review_date) === 'none').length,
  };
  // One sentence carries what the old row of four tiles repeated.
  const summary = [
    `${activeIlps.length} active ${activeIlps.length === 1 ? 'plan' : 'plans'}${scope === 'mine' ? ' in your cohorts' : ''}.`,
    scopedOverdue.length
      ? `${scopedOverdue.length} ${scopedOverdue.length === 1 ? 'review is' : 'reviews are'} overdue${dueThisWeek ? ` and ${dueThisWeek} due this week` : ''}.`
      : dueThisWeek
        ? `${dueThisWeek} ${dueThisWeek === 1 ? 'review is' : 'reviews are'} due this week.`
        : 'No reviews overdue.',
    activeLearnersWithoutPlan > 0
      ? `${activeLearnersWithoutPlan} active ${activeLearnersWithoutPlan === 1 ? 'learner has' : 'learners have'} no plan.`
      : '',
    targets.total > 0 ? `${targets.done} of ${targets.total} targets met.` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const showList = () =>
    document.getElementById('ilp-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const clearFilters = () => {
    setFilterStatus('all');
    setFilterCohort('all');
    setFilterReview('all');
    setSearchQuery('');
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title="Learning plans"
        description={
          ilpsLoading
            ? 'Every learner\u2019s plan, its targets and when it is next reviewed.'
            : summary
        }
        help={HELP}
        actions={
          <>
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineIlpCount}
              allCount={allIlps.length}
            />
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className={COLLEGE_BTN_PRIMARY}
            >
              Create an ILP
            </button>
          </>
        }
      />

      {/* On a phone the list comes first and the charts follow it. */}
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="order-last grid grid-cols-1 items-stretch gap-4 sm:order-none lg:grid-cols-3">
          <section className={VIS_CARD}>
            <VisHead title="Reviews" sub="Active plans by next review. Tap to filter." />
            <div className="mt-4">
              <Bars
                labelWidth="7rem"
                onPick={(k) => {
                  setFilterStatus('active');
                  setFilterReview(k as ReviewFilter);
                  showList();
                }}
                rows={[
                  {
                    key: 'overdue',
                    label: 'Overdue',
                    n: reviewCounts.overdue,
                    cls: 'bg-orange-500',
                  },
                  {
                    key: 'soon',
                    label: 'Due this week',
                    n: reviewCounts.soon,
                    cls: 'bg-elec-yellow',
                  },
                  { key: 'later', label: 'Later', n: reviewCounts.later, cls: 'bg-emerald-400' },
                  { key: 'none', label: 'No date set', n: reviewCounts.none, cls: 'bg-white' },
                ]}
              />
            </div>
          </section>
          <section className={VIS_CARD}>
            <VisHead title="Plans" sub="Plan status across learners. Tap to filter." />
            <div className="mt-4">
              <Bars
                labelWidth="7rem"
                onPick={(k) => {
                  if (k === 'none') return setCreateOpen(true);
                  setFilterReview('all');
                  setFilterStatus(k);
                  showList();
                }}
                rows={[
                  { key: 'active', label: 'Active', n: activeIlps.length, cls: 'bg-emerald-400' },
                  { key: 'draft', label: 'Draft', n: draftCount, cls: 'bg-white' },
                  { key: 'archived', label: 'Archived', n: archivedCount, cls: 'bg-white/40' },
                  {
                    key: 'none',
                    label: 'No plan yet',
                    n: activeLearnersWithoutPlan,
                    cls: 'bg-orange-400',
                  },
                ]}
              />
            </div>
          </section>
          <section className={cn(VIS_CARD, 'flex flex-col')}>
            <VisHead title="Targets" sub="Met on active plans" />
            <div className="flex flex-1 items-center justify-center pt-2">
              <Ring
                pct={targets.pct}
                value={targets.pct === null ? '\u2014' : `${targets.pct}%`}
                label={
                  targets.total === 0 ? 'No targets yet' : `${targets.done} of ${targets.total} met`
                }
                sub="Completed or verified"
              />
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="min-w-0 space-y-3">
            <CollegeSectionTitle
              id="ilp-plans"
              title="Plans"
              sub="Overdue first, then the soonest review. Tap a plan to open it."
              action={
                filterStatus !== 'all' ||
                filterCohort !== 'all' ||
                filterReview !== 'all' ||
                searchQuery ? (
                  <button type="button" onClick={clearFilters} className={COLLEGE_LINK}>
                    Clear filters
                  </button>
                ) : undefined
              }
            />
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by learner or target"
                aria-label="Search learning plans"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>
            <FilterChips
              label="Plan status"
              value={filterStatus}
              onChange={setFilterStatus}
              items={[
                { value: 'all', label: 'All', count: scopedIlps.length },
                { value: 'active', label: 'Active', count: activeIlps.length },
                { value: 'draft', label: 'Draft', count: draftCount },
                { value: 'archived', label: 'Archived', count: archivedCount },
              ]}
            />
            {(activeCohorts.length > 1 || filterReview !== 'all') && (
              <div className="flex flex-wrap items-center gap-2">
                {activeCohorts.length > 1 && (
                  <FilterSheetButton
                    label="Cohort"
                    value={filterCohort}
                    onChange={setFilterCohort}
                    items={[
                      { value: 'all', label: 'All cohorts' },
                      ...activeCohorts.map((c) => ({ value: c.id, label: c.name })),
                    ]}
                  />
                )}
                {filterReview !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setFilterReview('all')}
                    aria-label="Clear the review date filter"
                    className={COLLEGE_BTN}
                  >
                    {
                      {
                        overdue: 'Overdue',
                        soon: 'Due this week',
                        later: 'Later',
                        none: 'No date',
                      }[filterReview]
                    }
                    <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </button>
                )}
              </div>
            )}

            {ilpsLoading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-[64px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : filteredILPs.length === 0 ? (
              <CollegeEmpty
                title={
                  scopedIlps.length === 0
                    ? scope === 'mine'
                      ? 'No plans for your learners yet'
                      : 'No learning plans yet'
                    : 'Nothing matches these filters'
                }
                body={
                  scopedIlps.length === 0
                    ? 'Create an ILP for a learner. Targets, review dates and progress then show here and in their Student 360.'
                    : 'Try another status, review or cohort, or clear the search.'
                }
                action={
                  scopedIlps.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setCreateOpen(true)}
                      className={COLLEGE_BTN_PRIMARY}
                    >
                      Create an ILP
                    </button>
                  ) : (
                    <button type="button" onClick={clearFilters} className={COLLEGE_LINK}>
                      Clear filters
                    </button>
                  )
                }
              />
            ) : (
              <ul className={COLLEGE_LIST}>
                {filteredILPs.map((ilp) => {
                  const student = ilp.student_id ? studentById.get(ilp.student_id) : undefined;
                  const goals = goalsByIlp.get(ilp.id) ?? [];
                  const done = goals.filter((g) => goalDone(g.status)).length;
                  const state = reviewState(ilp.review_date);
                  const status = statusOf(ilp.status);
                  const reason = [
                    cohortName(student?.cohort_id),
                    tutorName(ilp.reviewed_by),
                    goals.length === 0 ? 'No targets yet' : null,
                    ilp.review_date ? `review ${shortDate(ilp.review_date)}` : 'no review date',
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  const chips: Array<{ label: string; warn?: boolean }> = [];
                  if (state === 'overdue') chips.push({ label: 'Review overdue', warn: true });
                  else if (state === 'soon') chips.push({ label: 'Review this week' });
                  if (status !== 'active') chips.push({ label: statusLabel(ilp.status) });
                  const pct = goals.length > 0 ? Math.round((done / goals.length) * 100) : null;
                  return (
                    <CLearnerRow
                      key={ilp.id}
                      name={student?.name ?? 'Unknown learner'}
                      chips={chips}
                      mine={scope === 'all' && isMineStudent(ilp.student_id)}
                      sub={reason}
                      figure={goals.length === 0 ? undefined : `${done} of ${goals.length}`}
                      figureSub={goals.length === 0 ? undefined : 'targets met'}
                      pct={pct}
                      tone={
                        state === 'overdue' ? 'warn' : pct !== null && pct >= 100 ? 'good' : 'plain'
                      }
                      onOpen={() => openIlp(ilp.student_id)}
                    />
                  );
                })}
              </ul>
            )}
          </section>

          <aside className="order-first space-y-3 xl:order-none xl:sticky xl:top-16">
            <CollegeSectionTitle
              title="Overdue reviews"
              sub="Longest overdue first. Tap to open the plan."
            />
            {overdueRows.length === 0 ? (
              <CollegeEmpty
                title="No reviews overdue"
                body="When a plan passes its review date it appears here until it is reviewed."
              />
            ) : (
              <ul className={COLLEGE_LIST}>
                {overdueRows.slice(0, 10).map(({ ilp, student, overdueDays }) => (
                  <CLearnerRow
                    key={ilp.id}
                    name={student?.name ?? 'Unknown learner'}
                    sub={[
                      cohortName(student?.cohort_id),
                      ilp.review_date ? `due ${shortDate(ilp.review_date)}` : 'review overdue',
                    ].join(' · ')}
                    figure={
                      overdueDays !== null
                        ? `${overdueDays} ${overdueDays === 1 ? 'day' : 'days'}`
                        : undefined
                    }
                    figureSub={overdueDays !== null ? 'overdue' : undefined}
                    // A month late is when a plan stops steering anything.
                    tone={overdueDays !== null && overdueDays >= 28 ? 'warn' : 'plain'}
                    onOpen={() => openIlp(ilp.student_id)}
                  />
                ))}
                {overdueRows.length > 10 && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterStatus('active');
                        setFilterReview('overdue');
                        showList();
                      }}
                      className="flex h-12 w-full items-center justify-center text-[13px] font-semibold text-white hover:bg-white/[0.04]"
                    >
                      {overdueRows.length - 10} more overdue
                    </button>
                  </li>
                )}
              </ul>
            )}
          </aside>
        </div>
      </div>

      {/* Unified ILP editor, same data + UI as Student 360 (writes
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
