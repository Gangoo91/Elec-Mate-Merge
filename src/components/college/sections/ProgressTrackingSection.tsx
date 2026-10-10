/**
 * ProgressTrackingSection — progress scores, attendance and at-risk flags
 * for every active learner.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   header + help → figures → progress spread, status and cohort charts →
 *   learners (left) with at risk beside them (right). Mine first (ELE-1886).
 *
 * What went: the PageHero, the blue StatStrip, the `bg-[hsl(0_0%_12%)]`
 * "immediate attention" panel of red name-pills, the blue avatar rings and
 * the emerald attendance bars.
 *
 * Two things corrected:
 *
 * 1. `risk_level` is Capitalised in the live table — Critical, High, Medium —
 *    and this page compared it to 'high' and 'critical'. Nobody was ever at
 *    risk here: the filter was empty, the rail never drew and the callout
 *    listed a different set of learners from the rows beneath it. Compared
 *    case-insensitively now, and Critical counts (it is the worst level, and
 *    `useStudentsAtRisk` in collegeStudentService only asks for Medium and
 *    High — five Critical learners on the live roll were missing from it).
 *    The at-risk figure is now derived from the same rows as the list, so the
 *    KPI, the list and the filter agree.
 *
 * 2. "On track" was ≥80% in the KPI and ≥70% in the filter — the same word
 *    counting two different sets one tap apart. One definition now: On track
 *    ≥80, Needs attention 60–79, Behind <60, and At risk is a flag on top.
 *
 * Per-learner attendance still comes from the one server-side aggregation
 * (`useCollegeStudentSummaries`) rather than every attendance row.
 *
 * 8 Oct 2026: progress is criteria, not a typed-in score. The figure on every
 * row is the learner's criteria passed (passed or IQA confirmed) out of their
 * qualification's total, worked out by get_portfolio_ac_state on the server
 * via college_portfolio_overview. The old `progress_percent` was a number a
 * tutor typed; it read 0% for learners with passed criteria. Bands are now
 * pace: criteria passed against how far through the programme the learner
 * is, so a learner two months in is not "behind" for having 5%.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_LIST,
  COLLEGE_LINK,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { Bars, ScopeToggle, useScope } from '@/components/college/assessment/AssessmentKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { CLearnerRow } from '@/components/college/assessment/CLearnerRow';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import type { CollegeStudent } from '@/services/college/collegeStudentService';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useCollegeStudentSummaries } from '@/hooks/college/useCollegeStudentSummaries';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import {
  passedOf,
  useCollegePortfolioOverview,
} from '@/components/college/portfolio/useCollegePortfolioOverview';
import { useToast } from '@/hooks/use-toast';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { FilterChips, FilterSheetButton, RowMenu } from '@/components/college/people/peopleKit';

type Band = 'ontrack' | 'attention' | 'behind' | 'unknown';
type Filter = 'all' | 'atrisk' | Band;

/** Share of the programme elapsed today, 0–100, or null without both dates. */
function elapsedPct(start: string | null, end: string | null): number | null {
  if (!start || !end) return null;
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return null;
  return Math.max(0, Math.min(100, Math.round(((Date.now() - a) / (b - a)) * 100)));
}

/**
 * Pace: criteria passed against time elapsed. On pace within 10 points of
 * where a straight line would put them, a little behind within 25, then
 * well behind. Unknown when there are no criteria or no programme dates.
 */
const bandOf = (passedPct: number | null, elapsed: number | null): Band => {
  if (passedPct === null || elapsed === null) return 'unknown';
  const gap = elapsed - passedPct;
  return gap <= 10 ? 'ontrack' : gap <= 25 ? 'attention' : 'behind';
};

const riskOf = (level: string | null): 'critical' | 'high' | 'medium' | null => {
  const l = (level ?? '').toLowerCase();
  return l === 'critical' || l === 'high' || l === 'medium' ? l : null;
};

const HELP: PageHelpContent = {
  id: 'college-progress-tracking',
  title: 'Progress tracking',
  what: 'Every active learner\u2019s progress score, attendance and risk flag in one place, so you can see who is on track and who needs you before it shows up at gateway.',
  steps: [
    {
      title: 'Start with who is at risk',
      body: 'Learners flagged Critical, High or Medium sit on the right, worst first. Tap one to open their Student 360.',
    },
    {
      title: 'Read the spread',
      body: 'The charts show how many criteria your learners have passed, whether that is on pace for how far through the programme they are, and how each cohort compares. Tap a bar or a cohort to filter the list.',
    },
    {
      title: 'Assess or contact',
      body: 'The \u2026 on a row opens their criteria to assess, gives a quick view, or calls or emails them.',
    },
  ],
  legend: [
    {
      swatch: 'bg-emerald-400',
      label: 'On pace',
      body: 'Criteria passed are within 10 points of how far through the programme they are.',
    },
    {
      swatch: 'bg-white',
      label: 'A little behind',
      body: 'Between 10 and 25 points behind that pace.',
    },
    {
      swatch: 'bg-orange-500',
      label: 'Well behind or at risk',
      body: 'More than 25 points behind, or flagged by the risk check.',
    },
  ],
  notes: [
    {
      title: 'Where the figure comes from',
      body: 'Criteria passed counts every criterion an assessor has passed or an IQA has confirmed, out of the total for the learner\u2019s qualification. It is the same count as their portfolio and Student 360. Learners who have not joined the app have no criteria yet.',
    },
    {
      title: 'My learners',
      body: 'Opens on the cohorts you lead. Switch to Everyone for the whole college.',
    },
    { title: 'Export', body: 'Export CSV downloads the list exactly as it is filtered.' },
  ],
};

const RISK_RANK = { critical: 0, high: 1, medium: 2 } as const;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ProgressTrackingSection() {
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: cohorts = [] } = useCollegeCohorts();
  const collegeId = students[0]?.college_id ?? undefined;
  const { data: studentSummaries = [] } = useCollegeStudentSummaries(collegeId);
  const summaryByStudent = useMemo(
    () => new Map(studentSummaries.map((s) => [s.student_id, s])),
    [studentSummaries]
  );
  const my = useMyLearners();
  const [scope, setScope] = useScope('progresstracking', my);
  // Criteria state per learner, from get_portfolio_ac_state on the server.
  const { data: overview, isLoading: overviewLoading } = useCollegePortfolioOverview();
  const criteriaByStudent = useMemo(
    () => new Map((overview?.learners ?? []).map((l) => [l.student_id, l])),
    [overview]
  );

  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-student-summaries'] });
    await queryClient.invalidateQueries({ queryKey: ['college-portfolio-overview'] });
  };

  /** null when there are no marks, never a made-up 100%. */
  const attendanceRateFor = (studentId: string): number | null => {
    const s = summaryByStudent.get(studentId);
    if (!s || s.attendance_total === 0) return null;
    return Math.round((s.attendance_present_late / s.attendance_total) * 100);
  };

  const allActive = useMemo(
    () =>
      students
        .filter((s) => (s.status ?? '').toLowerCase() === 'active')
        .map((student) => {
          const c = criteriaByStudent.get(student.id)?.criteria ?? null;
          const total = c?.total ?? 0;
          const passed = passedOf(c);
          // null when there are no criteria to count (not joined, or no qualification).
          const progress = c && total > 0 ? Math.round((passed / total) * 100) : null;
          const elapsed = elapsedPct(student.start_date, student.expected_end_date);
          const risk = riskOf(student.risk_level);
          return {
            student,
            progress,
            passed,
            total,
            joined: !!student.user_id,
            elapsed,
            attendance: attendanceRateFor(student.id),
            band: bandOf(progress, elapsed),
            risk,
            isAtRisk: risk !== null,
            mine: my.isMine({
              studentId: student.id,
              userId: student.user_id,
              cohortId: student.cohort_id,
            }),
          };
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [students, summaryByStudent, criteriaByStudent, my.studentIds, my.cohortIds]
  );
  const mineCount = allActive.filter((p) => p.mine).length;
  const progressData = useMemo(
    () => (scope === 'mine' ? allActive.filter((p) => p.mine) : allActive),
    [allActive, scope]
  );

  const atRisk = progressData.filter((p) => p.isAtRisk);
  const criticalCount = atRisk.filter((p) => p.risk === 'critical').length;
  const onTrackCount = progressData.filter((p) => p.band === 'ontrack').length;
  const attentionCount = progressData.filter((p) => p.band === 'attention').length;
  const behindCount = progressData.filter((p) => p.band === 'behind').length;
  const unknownCount = progressData.filter((p) => p.band === 'unknown').length;
  const counted = progressData.filter((p) => p.progress !== null);
  const passedAll = counted.reduce((n, p) => n + p.passed, 0);
  const totalAll = counted.reduce((n, p) => n + p.total, 0);

  const cohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const activeCohorts = useMemo(
    () =>
      cohorts.filter(
        (c) =>
          (c.status ?? '').toLowerCase() === 'active' &&
          (scope === 'all' || progressData.some((p) => p.student.cohort_id === c.id))
      ),
    [cohorts, scope, progressData]
  );

  const cohortAverages = activeCohorts
    .map((cohort) => {
      const rows = progressData.filter((p) => p.student.cohort_id === cohort.id);
      const withCriteria = rows.filter((p) => p.progress !== null);
      return {
        ...cohort,
        // Mean of each learner's share passed, over learners with criteria only.
        avgProgress:
          withCriteria.length > 0
            ? Math.round(
                withCriteria.reduce((sum, p) => sum + (p.progress ?? 0), 0) / withCriteria.length
              )
            : null,
        studentCount: rows.length,
        atRiskCount: rows.filter((p) => p.isAtRisk).length,
      };
    })
    .filter((c) => c.studentCount > 0)
    .sort((a, b) => (a.avgProgress ?? 0) - (b.avgProgress ?? 0));

  // Criteria passed, in quarters, plus the learners with nothing to count.
  const spread = [
    { key: '75', label: 'Three quarters or more', lo: 75, hi: 101, cls: 'bg-emerald-400' },
    { key: '50', label: 'Half to three quarters', lo: 50, hi: 75, cls: 'bg-white' },
    { key: '25', label: 'A quarter to half', lo: 25, hi: 50, cls: 'bg-white' },
    { key: '0', label: 'Under a quarter', lo: -1, hi: 25, cls: 'bg-white' },
  ]
    .map((b) => ({
      key: b.key,
      label: b.label,
      cls: b.cls,
      n: progressData.filter((p) => p.progress !== null && p.progress >= b.lo && p.progress < b.hi)
        .length,
    }))
    .concat([
      {
        key: 'none',
        label: 'Nothing to count',
        cls: 'bg-white/40',
        n: progressData.filter((p) => p.progress === null).length,
      },
    ]);

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      progressData
        .filter((p) => {
          const matchesSearch =
            !q ||
            p.student.name.toLowerCase().includes(q) ||
            (p.student.uln ?? '').toLowerCase().includes(q);
          const matchesFilter =
            filter === 'all' ||
            (filter === 'atrisk' && p.isAtRisk) ||
            (filter !== 'atrisk' && p.band === filter);
          const matchesCohort = filterCohort === 'all' || p.student.cohort_id === filterCohort;
          return matchesSearch && matchesFilter && matchesCohort;
        })
        // Furthest behind pace first; learners with nothing to count last.
        .sort((a, b) => {
          const gap = (p: typeof a) =>
            p.progress === null || p.elapsed === null ? -999 : p.elapsed - p.progress;
          return gap(b) - gap(a) || (a.progress ?? 0) - (b.progress ?? 0);
        }),
    [progressData, q, filter, filterCohort]
  );

  const goTo360 = (studentId: string) =>
    navigate(`/college?section=student360&studentId=${encodeURIComponent(studentId)}`);

  const atRiskSorted = [...atRisk].sort((a, b) => RISK_RANK[a.risk!] - RISK_RANK[b.risk!]);

  const exportCsv = () => {
    // Real CSV export of the currently filtered list — no backend round-trip,
    // just serialise the rows we already have.
    if (filtered.length === 0) {
      toast({
        title: 'Nothing to export',
        description: 'Adjust the filters so the list has at least one learner.',
        variant: 'destructive',
      });
      return;
    }
    const escape = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const header = [
      'Name',
      'ULN',
      'Cohort',
      'Criteria passed',
      'Criteria total',
      'Programme elapsed %',
      'Attendance %',
      'Risk',
    ];
    const lines = [
      header.join(','),
      ...filtered.map((p) =>
        [
          escape(p.student.name ?? ''),
          escape(p.student.uln ?? ''),
          escape(cohortName(p.student.cohort_id)),
          p.progress === null ? '' : String(p.passed),
          p.progress === null ? '' : String(p.total),
          p.elapsed === null ? '' : String(p.elapsed),
          p.attendance === null ? '' : String(p.attendance),
          escape(p.student.risk_level ?? ''),
        ].join(',')
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Export ready',
      description: `${filtered.length} learner${filtered.length === 1 ? '' : 's'} downloaded as CSV.`,
    });
  };

  const filterChips: Array<[Filter, string, number]> = [
    ['all', 'All', progressData.length],
    ['atrisk', 'At risk', atRisk.length],
    ['behind', 'Well behind', behindCount],
    ['attention', 'A little behind', attentionCount],
    ['ontrack', 'On pace', onTrackCount],
    ...(unknownCount > 0
      ? ([['unknown', 'No figure', unknownCount]] as Array<[Filter, string, number]>)
      : []),
  ];
  const showList = () =>
    document
      .getElementById('progress-learners')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title="Progress tracking"
        description={
          studentsLoading
            ? 'Progress, attendance and risk for every active learner.'
            : progressData.length === 0
              ? 'Progress, attendance and risk for every active learner.'
              : [
                  `${progressData.length} active ${progressData.length === 1 ? 'learner' : 'learners'}${scope === 'mine' ? ' in your cohorts' : ''}.`,
                  overviewLoading
                    ? ''
                    : totalAll > 0
                      ? `${passedAll.toLocaleString('en-GB')} of ${totalAll.toLocaleString('en-GB')} criteria passed between them.`
                      : 'No criteria passed yet.',
                  behindCount > 0 ? `${behindCount} well behind pace.` : '',
                  atRisk.length
                    ? `${atRisk.length} flagged at risk${criticalCount ? `, ${criticalCount} critical` : ''}.`
                    : 'Nobody flagged at risk.',
                ]
                  .filter(Boolean)
                  .join(' ')
        }
        help={HELP}
        actions={
          <>
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineCount}
              allCount={allActive.length}
            />
            <button type="button" onClick={exportCsv} className={COLLEGE_BTN}>
              Export CSV
            </button>
          </>
        }
      />

      {/* On a phone the list comes first and the charts follow it. */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {progressData.length > 0 && (
          <div className="order-last grid grid-cols-1 items-stretch gap-4 sm:order-none lg:grid-cols-3">
            <section className={VIS_CARD}>
              <VisHead title="Criteria passed" sub="Share of each learner’s qualification passed" />
              <div className="mt-4">
                <Bars rows={spread} labelWidth="9.5rem" />
              </div>
            </section>
            <section className={VIS_CARD}>
              <VisHead
                title="Pace"
                sub="Criteria passed against time on programme. Tap to filter."
              />
              <div className="mt-4">
                <Bars
                  labelWidth="7.5rem"
                  onPick={(k) => {
                    setFilter(k as Filter);
                    showList();
                  }}
                  rows={[
                    { key: 'atrisk', label: 'At risk', n: atRisk.length, cls: 'bg-orange-500' },
                    { key: 'behind', label: 'Well behind', n: behindCount, cls: 'bg-orange-400' },
                    {
                      key: 'attention',
                      label: 'A little behind',
                      n: attentionCount,
                      cls: 'bg-white',
                    },
                    { key: 'ontrack', label: 'On pace', n: onTrackCount, cls: 'bg-emerald-400' },
                    ...(unknownCount > 0
                      ? [
                          {
                            key: 'unknown',
                            label: 'No figure',
                            n: unknownCount,
                            cls: 'bg-white/40',
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            </section>
            <section className={VIS_CARD}>
              <VisHead title="By cohort" sub="Average share of criteria passed, lowest first" />
              {cohortAverages.length === 0 ? (
                <p className="mt-4 text-[13px] text-white">No learners are in a cohort yet.</p>
              ) : (
                <ul className="mt-3 space-y-1">
                  {cohortAverages.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setFilterCohort(c.id);
                          showList();
                        }}
                        className="grid min-h-[44px] w-full grid-cols-[minmax(0,1fr)_5rem_2.75rem] items-center gap-3 rounded-lg px-1 text-left touch-manipulation hover:bg-white/[0.04]"
                      >
                        <span className="min-w-0">
                          <span className="block line-clamp-2 text-[13px] font-semibold leading-snug text-white">
                            {c.name}
                          </span>
                          <span
                            className={cn(
                              'block text-[12px]',
                              c.atRiskCount > 0 ? 'text-orange-300' : 'text-white'
                            )}
                          >
                            {c.studentCount} learner{c.studentCount === 1 ? '' : 's'}
                            {c.atRiskCount > 0 ? ` · ${c.atRiskCount} at risk` : ''}
                          </span>
                        </span>
                        <span className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                          <span
                            className="block h-full rounded-full bg-white"
                            style={{ width: `${c.avgProgress ?? 0}%` }}
                          />
                        </span>
                        <span className="text-right text-[13px] font-semibold tabular-nums text-white">
                          {c.avgProgress === null ? '\u2014' : `${c.avgProgress}%`}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="min-w-0 space-y-3">
            <CollegeSectionTitle
              id="progress-learners"
              title="Learners"
              sub="Furthest behind pace first. Tap a learner to open their Student 360."
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
                placeholder="Search by name or ULN"
                aria-label="Search learners"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>
            <FilterChips<Filter>
              label="Pace"
              value={filter}
              onChange={setFilter}
              items={filterChips.map(([value, label, n]) => ({ value, label, count: n }))}
            />
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

            {studentsLoading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-[64px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <CollegeEmpty
                title={
                  progressData.length === 0
                    ? scope === 'mine'
                      ? 'No active learners in your cohorts'
                      : 'No active learners on the roll'
                    : 'Nothing matches these filters'
                }
                body={
                  progressData.length === 0
                    ? scope === 'mine'
                      ? 'Switch to Everyone to see the whole college, or ask an admin to set you as tutor on a cohort.'
                      : 'Add learners from People, and their progress shows here.'
                    : 'Try another band or cohort, or clear the search.'
                }
                action={
                  progressData.length > 0 ? (
                    <button
                      type="button"
                      className={COLLEGE_LINK}
                      onClick={() => {
                        setFilter('all');
                        setFilterCohort('all');
                        setSearchQuery('');
                      }}
                    >
                      Clear filters
                    </button>
                  ) : scope === 'mine' ? (
                    <button type="button" className={COLLEGE_LINK} onClick={() => setScope('all')}>
                      Show everyone
                    </button>
                  ) : undefined
                }
              />
            ) : (
              <ul className={COLLEGE_LIST}>
                {filtered.map((p) => {
                  const reason = [
                    cohortName(p.student.cohort_id),
                    p.elapsed !== null
                      ? `${p.elapsed}% through the programme`
                      : 'no programme dates',
                    p.attendance !== null ? `attendance ${p.attendance}%` : 'no attendance marks',
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  const tone = p.isAtRisk || p.band === 'behind' ? 'warn' : 'plain';
                  const chips: Array<{ label: string; warn?: boolean }> = [];
                  if (p.isAtRisk) chips.push({ label: `${cap(p.risk!)} risk`, warn: true });
                  if (p.band === 'behind') chips.push({ label: 'Well behind pace', warn: true });
                  else if (p.band === 'attention') chips.push({ label: 'A little behind' });
                  return (
                    <CLearnerRow
                      key={p.student.id}
                      name={p.student.name}
                      chips={chips.length ? chips : undefined}
                      mine={scope === 'all' && p.mine}
                      sub={reason}
                      figure={
                        p.progress === null
                          ? p.joined
                            ? 'None yet'
                            : 'Not joined'
                          : `${p.passed} of ${p.total}`
                      }
                      figureSub={p.progress === null ? 'no criteria' : 'criteria passed'}
                      pct={p.progress}
                      tone={tone}
                      onOpen={() => goTo360(p.student.id)}
                      menu={
                        <RowMenu
                          title={p.student.name}
                          triggerLabel={`More for ${p.student.name}`}
                          items={[
                            { label: 'Open Student 360', onClick: () => goTo360(p.student.id) },
                            {
                              label: 'Quick view',
                              onClick: () => {
                                setSelectedStudent(p.student);
                                setProfileSheetOpen(true);
                              },
                            },
                            {
                              label: 'Assess criteria',
                              disabled: !p.joined,
                              onClick: () =>
                                navigate(
                                  `/college?section=student360&studentId=${encodeURIComponent(p.student.id)}#assess`
                                ),
                            },
                            {
                              label: p.student.phone ? `Call · ${p.student.phone}` : 'Call',
                              disabled: !p.student.phone,
                              separated: true,
                              onClick: () => {
                                if (p.student.phone)
                                  window.location.href = 'tel:' + p.student.phone;
                              },
                            },
                            {
                              label: 'Email',
                              disabled: !p.student.email,
                              onClick: () => {
                                if (p.student.email)
                                  window.location.href = 'mailto:' + p.student.email;
                              },
                            },
                          ]}
                        />
                      }
                    />
                  );
                })}
              </ul>
            )}
          </section>

          <aside className="order-first space-y-3 xl:order-none xl:sticky xl:top-16">
            <CollegeSectionTitle
              title="At risk"
              sub="Worst first. Each one opens their Student 360."
            />
            {atRiskSorted.length === 0 ? (
              <CollegeEmpty
                title="Nobody flagged"
                body="When the risk check flags a learner Critical, High or Medium, they appear here with the reason."
              />
            ) : (
              <ul className={COLLEGE_LIST}>
                {atRiskSorted.slice(0, 10).map((p) => (
                  <CLearnerRow
                    key={p.student.id}
                    name={p.student.name}
                    chips={[{ label: cap(p.risk!), warn: p.risk !== 'medium' }]}
                    sub={[
                      cohortName(p.student.cohort_id),
                      p.attendance !== null ? `attendance ${p.attendance}%` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    figure={p.progress === null ? undefined : `${p.passed} of ${p.total}`}
                    figureSub={p.progress === null ? undefined : 'passed'}
                    tone={p.risk === 'medium' ? 'plain' : 'warn'}
                    onOpen={() => goTo360(p.student.id)}
                  />
                ))}
                {atRiskSorted.length > 10 && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setFilter('atrisk');
                        showList();
                      }}
                      className="flex h-12 w-full items-center justify-center text-[13px] font-semibold text-white hover:bg-white/[0.04]"
                    >
                      {atRiskSorted.length - 10} more at risk
                    </button>
                  </li>
                )}
              </ul>
            )}
          </aside>
        </div>
      </div>

      <StudentDetailSheet
        student={selectedStudent}
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
      />
    </PullToRefresh>
  );
}
