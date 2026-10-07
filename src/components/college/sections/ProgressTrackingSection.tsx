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
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Search } from 'lucide-react';
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
  CollegeStats,
  chipCn,
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
import { ProgressUpdateSheet } from '@/components/college/sheets/ProgressUpdateSheet';
import { useToast } from '@/hooks/use-toast';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Band = 'ontrack' | 'attention' | 'behind';
type Filter = 'all' | 'atrisk' | Band;

const bandOf = (progress: number): Band =>
  progress >= 80 ? 'ontrack' : progress >= 60 ? 'attention' : 'behind';

const riskOf = (level: string | null): 'critical' | 'high' | 'medium' | null => {
  const l = (level ?? '').toLowerCase();
  return l === 'critical' || l === 'high' || l === 'medium' ? l : null;
};

const HELP: PageHelpContent = {
  id: 'college-progress-tracking',
  title: 'Progress tracking',
  what: 'Every active learner\u2019s progress score, attendance and risk flag in one place, so you can see who is on track and who needs you before it shows up at gateway.',
  steps: [
    { title: 'Start with who is at risk', body: 'Learners flagged Critical, High or Medium sit on the right, worst first. Tap one to open their Student 360.' },
    { title: 'Read the spread', body: 'The charts show where your learners sit by progress and how each cohort is doing. Tap a bar or a cohort to filter the list.' },
    { title: 'Update or contact', body: 'The \u2026 on a row gives a quick view, updates their progress score, or calls or emails them.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'On track', body: '80% or more and not flagged.' },
    { swatch: 'bg-white', label: 'Needs attention', body: 'Between 60% and 79%.' },
    { swatch: 'bg-orange-500', label: 'Behind or at risk', body: 'Below 60%, or flagged by the risk check.' },
  ],
  notes: [
    { title: 'My learners', body: 'Opens on the cohorts you lead. Switch to Everyone for the whole college.' },
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

  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [progressSheetOpen, setProgressSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-student-summaries'] });
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
          const progress = student.progress_percent ?? 0;
          const risk = riskOf(student.risk_level);
          return {
            student,
            progress,
            attendance: attendanceRateFor(student.id),
            band: bandOf(progress),
            risk,
            isAtRisk: risk !== null,
            mine: my.isMine({ studentId: student.id, userId: student.user_id, cohortId: student.cohort_id }),
          };
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [students, summaryByStudent, my.studentIds, my.cohortIds]
  );
  const mineCount = allActive.filter((p) => p.mine).length;
  const progressData = useMemo(
    () => (scope === 'mine' ? allActive.filter((p) => p.mine) : allActive),
    [allActive, scope]
  );

  const atRisk = progressData.filter((p) => p.isAtRisk);
  const criticalCount = atRisk.filter((p) => p.risk === 'critical').length;
  const onTrackCount = progressData.filter((p) => !p.isAtRisk && p.band === 'ontrack').length;
  const attentionCount = progressData.filter((p) => !p.isAtRisk && p.band === 'attention').length;
  const behindCount = progressData.filter((p) => !p.isAtRisk && p.band === 'behind').length;
  const avgProgress =
    progressData.length > 0
      ? Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / progressData.length)
      : null;

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
      return {
        ...cohort,
        avgProgress:
          rows.length > 0 ? Math.round(rows.reduce((sum, p) => sum + p.progress, 0) / rows.length) : null,
        studentCount: rows.length,
        atRiskCount: rows.filter((p) => p.isAtRisk).length,
      };
    })
    .filter((c) => c.studentCount > 0)
    .sort((a, b) => (a.avgProgress ?? 0) - (b.avgProgress ?? 0));

  // Progress spread in five bands of 20.
  const spread = [
    { key: '80', label: '80 to 100%', lo: 80, hi: 101, cls: 'bg-emerald-400' },
    { key: '60', label: '60 to 79%', lo: 60, hi: 80, cls: 'bg-white' },
    { key: '40', label: '40 to 59%', lo: 40, hi: 60, cls: 'bg-orange-400' },
    { key: '20', label: '20 to 39%', lo: 20, hi: 40, cls: 'bg-orange-400' },
    { key: '0', label: 'Under 20%', lo: -1, hi: 20, cls: 'bg-orange-400' },
  ].map((b) => ({ ...b, n: progressData.filter((p) => p.progress >= b.lo && p.progress < b.hi).length }));

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
            (filter !== 'atrisk' && !p.isAtRisk && p.band === filter);
          const matchesCohort = filterCohort === 'all' || p.student.cohort_id === filterCohort;
          return matchesSearch && matchesFilter && matchesCohort;
        })
        .sort((a, b) => a.progress - b.progress),
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
    const header = ['Name', 'ULN', 'Cohort', 'Progress %', 'Attendance %', 'Risk'];
    const lines = [
      header.join(','),
      ...filtered.map((p) =>
        [
          escape(p.student.name ?? ''),
          escape(p.student.uln ?? ''),
          escape(cohortName(p.student.cohort_id)),
          String(p.progress),
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
    ['ontrack', 'On track', onTrackCount],
    ['attention', 'Needs attention', attentionCount],
    ['behind', 'Behind', behindCount],
  ];
  const showList = () => document.getElementById('progress-learners')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
              : `${progressData.length} active ${progressData.length === 1 ? 'learner' : 'learners'}${scope === 'mine' ? ' in your cohorts' : ''}. ${atRisk.length ? `${atRisk.length} flagged at risk.` : 'Nobody flagged at risk.'}`
        }
        help={HELP}
        actions={
          <>
            <ScopeToggle scope={scope} onChange={setScope} my={my} mineCount={mineCount} allCount={allActive.length} />
            <button type="button" onClick={exportCsv} className={COLLEGE_BTN}>
              Export CSV
            </button>
          </>
        }
      />

      <CollegeStats
        items={[
          {
            label: 'At risk',
            value: String(atRisk.length),
            sub: criticalCount > 0 ? `${criticalCount} critical, check in today` : atRisk.length > 0 ? 'Worth a check-in this week' : 'Nobody flagged',
            warn: atRisk.length > 0,
            onClick: () => {
              setFilter('atrisk');
              showList();
            },
          },
          {
            label: 'On track',
            value: String(onTrackCount),
            sub: '80% or more, not flagged',
            good: onTrackCount > 0,
            onClick: () => {
              setFilter('ontrack');
              showList();
            },
          },
          {
            label: 'Needs attention',
            value: String(attentionCount),
            sub: behindCount > 0 ? `60 to 79% · ${behindCount} below 60%` : '60 to 79%',
            onClick: () => {
              setFilter('attention');
              showList();
            },
          },
          {
            label: 'Average progress',
            value: avgProgress === null ? '\u2014' : `${avgProgress}%`,
            sub: avgProgress === null ? 'No active learners' : `Across ${progressData.length} learner${progressData.length === 1 ? '' : 's'}`,
          },
        ]}
      />

      {progressData.length > 0 && (
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          <section className={VIS_CARD}>
            <VisHead title="Progress spread" sub="How many learners sit in each band" />
            <div className="mt-4">
              <Bars
                rows={spread.map((b) => ({ key: b.key, label: b.label, n: b.n, cls: b.cls }))}
                labelWidth="6.5rem"
              />
            </div>
          </section>
          <section className={VIS_CARD}>
            <VisHead title="Where they stand" sub="Tap a bar to filter the list" />
            <div className="mt-4">
              <Bars
                labelWidth="7.5rem"
                onPick={(k) => {
                  setFilter(k as Filter);
                  showList();
                }}
                rows={[
                  { key: 'atrisk', label: 'At risk', n: atRisk.length, cls: 'bg-orange-500' },
                  { key: 'behind', label: 'Behind', n: behindCount, cls: 'bg-orange-400' },
                  { key: 'attention', label: 'Needs attention', n: attentionCount, cls: 'bg-white' },
                  { key: 'ontrack', label: 'On track', n: onTrackCount, cls: 'bg-emerald-400' },
                ]}
              />
            </div>
          </section>
          <section className={VIS_CARD}>
            <VisHead title="By cohort" sub="Average progress, lowest first" />
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
                        <span className="block truncate text-[13px] font-semibold text-white">{c.name}</span>
                        <span className={cn('block text-[11.5px]', c.atRiskCount > 0 ? 'text-orange-300' : 'text-white')}>
                          {c.studentCount} learner{c.studentCount === 1 ? '' : 's'}
                          {c.atRiskCount > 0 ? ` · ${c.atRiskCount} at risk` : ''}
                        </span>
                      </span>
                      <span className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                        <span
                          className={cn('block h-full rounded-full', (c.avgProgress ?? 0) >= 80 ? 'bg-emerald-400' : (c.avgProgress ?? 0) >= 60 ? 'bg-white' : 'bg-orange-400')}
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

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0 space-y-3">
          <CollegeSectionTitle
            id="progress-learners"
            title="Learners"
            sub="Lowest progress first. Tap a learner to open their Student 360."
          />
          <div className="relative">
            <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ULN"
              aria-label="Search learners"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {filterChips.map(([value, label, n]) => (
              <button key={value} type="button" onClick={() => setFilter(value)} className={chipCn(filter === value)}>
                {label} <span className="tabular-nums">{n}</span>
              </button>
            ))}
          </div>
          {activeCohorts.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button type="button" onClick={() => setFilterCohort('all')} className={chipCn(filterCohort === 'all')}>
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

          {studentsLoading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[64px] animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <CollegeEmpty
              title={progressData.length === 0 ? (scope === 'mine' ? 'No active learners in your cohorts' : 'No active learners on the roll') : 'Nothing matches these filters'}
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
                  p.attendance !== null ? `attendance ${p.attendance}%` : 'no attendance marks',
                  p.student.expected_end_date
                    ? `due ${new Date(p.student.expected_end_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                const tone = p.isAtRisk || p.band === 'behind' ? 'warn' : p.band === 'ontrack' ? 'good' : 'plain';
                return (
                  <CLearnerRow
                    key={p.student.id}
                    name={p.student.name}
                    chips={p.isAtRisk ? [{ label: `${cap(p.risk!)} risk`, warn: true }] : undefined}
                    mine={scope === 'all' && p.mine}
                    sub={reason}
                    figure={`${p.progress}%`}
                    pct={p.progress}
                    tone={tone}
                    onOpen={() => goTo360(p.student.id)}
                    menu={
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label={`More for ${p.student.name}`}
                            className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                          >
                            <MoreHorizontal className="h-4 w-4" aria-hidden />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="h-11" onClick={() => goTo360(p.student.id)}>
                            Open Student 360
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11"
                            onClick={() => {
                              setSelectedStudent(p.student);
                              setProfileSheetOpen(true);
                            }}
                          >
                            Quick view
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11"
                            onClick={() => {
                              setSelectedStudentId(p.student.id);
                              setProgressSheetOpen(true);
                            }}
                          >
                            Update progress
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="h-11"
                            disabled={!p.student.phone}
                            onClick={() => {
                              if (p.student.phone) window.location.href = 'tel:' + p.student.phone;
                            }}
                          >
                            {p.student.phone ? `Call · ${p.student.phone}` : 'Call'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11"
                            disabled={!p.student.email}
                            onClick={() => {
                              if (p.student.email) window.location.href = 'mailto:' + p.student.email;
                            }}
                          >
                            Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    }
                  />
                );
              })}
            </ul>
          )}
        </section>

        <aside className="order-first space-y-3 xl:order-none xl:sticky xl:top-16">
          <CollegeSectionTitle title="At risk" sub="Worst first. Each one opens their Student 360." />
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
                  sub={[cohortName(p.student.cohort_id), p.attendance !== null ? `attendance ${p.attendance}%` : null].filter(Boolean).join(' · ')}
                  figure={`${p.progress}%`}
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

      <StudentDetailSheet student={selectedStudent} open={profileSheetOpen} onOpenChange={setProfileSheetOpen} />
      <ProgressUpdateSheet studentId={selectedStudentId} open={progressSheetOpen} onOpenChange={setProgressSheetOpen} />
    </PullToRefresh>
  );
}
