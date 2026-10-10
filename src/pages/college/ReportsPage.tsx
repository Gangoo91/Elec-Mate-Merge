import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReturnTo } from '@/lib/navHistory';
import useSEO from '@/hooks/useSEO';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import {
  fetchOtjReport,
  fetchAttendanceReport,
  fetchCohortProgressReport,
  fetchEpaReadinessReport,
  fetchEpaPassRateReport,
  fetchAcCoverageGapReport,
  fetchQuizResultsReport,
  useCollegeCohortsLite,
  type ReportFilters,
} from '@/hooks/useCollegeReports';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LINK,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import {
  BarList,
  ChartEmpty,
  type BarRow,
  type Tone,
} from '@/components/college/quality/QualityKit';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';
import type { LearnerDocumentRequest } from '@/lib/documents/learnerDocuments';

/** Reports the server already makes as signed PDFs (learner-document-pdf). */
const PDF_REPORTS: Array<{ title: string; body: string; request: LearnerDocumentRequest }> = [
  {
    title: 'Compliance audit pack',
    body: 'Single central record, policies, sign-offs, named leads, the IQA chain, standardisation and interventions.',
    request: { kind: 'audit_pack' },
  },
  {
    title: 'IQA report',
    body: 'Sampling plans, verdicts, findings and actions, and the standardisation record.',
    request: { kind: 'iqa_report' },
  },
  {
    title: 'Quality report',
    body: 'Every headline figure against its target, the learners who need you, and the evidence behind each number.',
    request: { kind: 'quality_report' },
  },
  {
    title: 'Inspection readiness',
    body: 'Live evidence against each area Ofsted inspects further education and skills on.',
    request: { kind: 'ofsted_lens' },
  },
];

function PdfReports() {
  const pdf = useLearnerDocumentDownload();
  const [which, setWhich] = useState<string | null>(null);
  return (
    <section className="space-y-4">
      <CollegeSectionTitle
        title="Ready-made PDFs"
        sub="Made from live records with your name on them. Each takes a few seconds."
      />
      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PDF_REPORTS.map((r) => {
          const busy = pdf.busy && which === r.title;
          return (
            <div
              key={r.title}
              className="group relative flex h-full flex-col overflow-hidden card-surface-interactive -mx-4 max-sm:!rounded-none max-sm:!border-x-0 !border-white/[0.08] p-4 sm:mx-0 sm:p-5 hover:!border-white/[0.16]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-80"
              />
              <p className="text-[14.5px] font-semibold text-white">{r.title}</p>
              <p className="mt-1.5 flex-1 text-[12.5px] leading-snug text-white">{r.body}</p>
              <button
                type="button"
                disabled={pdf.busy}
                onClick={() => {
                  setWhich(r.title);
                  void pdf.download(r.request);
                }}
                className={cn(COLLEGE_BTN, 'mt-4 w-full')}
              >
                {busy ? 'Making the PDF\u2026' : 'Download PDF'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ==========================================================================
   ReportsPage: /college/reports
   Single front door for every CSV report a tutor, head of department, IQA or
   auditor might want. Each report is a definition: title, purpose, which
   filters apply, its fetcher (useCollegeReports.ts) and its CSV columns.

   Redesigned to the College Hub kit on 7 Oct 2026: reports grouped by what
   they are for, and a run shows its headline figures and a breakdown chart
   above the preview, from the same rows the CSV downloads.
   ========================================================================== */

type FilterFlag = 'cohort' | 'dateRange' | 'qualificationCode';
type Group = 'funding' | 'achievement' | 'curriculum';

interface CsvColumn<R> {
  key: keyof R & string;
  header: string;
}

interface ReportDef<R> {
  id: string;
  title: string;
  description: string;
  group: Group;
  filters: FilterFlag[];
  fetch: (f: ReportFilters) => Promise<R[]>;
  columns: CsvColumn<R>[];
  fileSlug: string;
  /** Count rows by this field for the breakdown chart. */
  breakdown?: {
    key: string;
    title: string;
    labels?: Record<string, string>;
    tones?: Record<string, Tone>;
  };
  /** One bar per row (label field, value field) instead of a count. */
  bars?: { labelKey: string; valueKey: string; title: string; suffix?: string };
  /** Sum a numeric field for a headline figure. */
  sum?: { key: string; label: string; digits?: number };
}

const GROUPS: { key: Group; title: string; sub: string }[] = [
  { key: 'funding', title: 'Funding and audit', sub: 'What a funding auditor asks for first' },
  {
    key: 'achievement',
    title: 'Progress and achievement',
    sub: 'Learner progress, gateway and results',
  },
  {
    key: 'curriculum',
    title: 'Curriculum',
    sub: 'How well your teaching covers the qualification',
  },
];

const STATUS_TONES: Record<string, Tone> = {
  verified: 'good',
  'verified by employer': 'good',
  approved: 'good',
  present: 'good',
  late: 'warn',
  pending: 'warn',
  submitted: 'info',
  rejected: 'bad',
  absent: 'bad',
  unauthorised: 'bad',
  authorised: 'info',
  high: 'bad',
  medium: 'warn',
  low: 'good',
  passed: 'good',
  failed: 'bad',
  covered: 'good',
  'no coverage': 'bad',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REPORTS: ReportDef<any>[] = [
  {
    id: 'otj',
    title: 'Off-the-job hours',
    description: 'Every off-the-job entry with its length, status, learner and cohort.',
    group: 'funding',
    filters: ['cohort', 'dateRange'],
    fetch: fetchOtjReport,
    fileSlug: 'otj-hours',
    breakdown: { key: 'verification_status', title: 'Entries by status' },
    sum: { key: 'duration_hours', label: 'Hours logged', digits: 1 },
    columns: [
      { key: 'student_name', header: 'Learner' },
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'activity_date', header: 'Date' },
      { key: 'activity_type', header: 'Activity type' },
      { key: 'title', header: 'Title' },
      { key: 'duration_minutes', header: 'Duration (min)' },
      { key: 'duration_hours', header: 'Duration (hours)' },
      { key: 'verification_status', header: 'Status' },
      { key: 'verified_at', header: 'Verified at' },
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance log',
    description: 'Every register mark with its status and the tutor’s note.',
    group: 'funding',
    filters: ['cohort', 'dateRange'],
    fetch: fetchAttendanceReport,
    fileSlug: 'attendance',
    breakdown: { key: 'status', title: 'Marks by status' },
    columns: [
      { key: 'student_name', header: 'Learner' },
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'date', header: 'Date' },
      { key: 'status', header: 'Status' },
      { key: 'notes', header: 'Notes' },
    ],
  },
  {
    id: 'cohort_progress',
    title: 'Cohort progress',
    description:
      'Each learner’s criteria passed, submitted and needing more, out of their qualification’s total. For department reviews and the self-assessment.',
    group: 'achievement',
    filters: ['cohort'],
    fetch: fetchCohortProgressReport,
    fileSlug: 'cohort-progress',
    breakdown: { key: 'risk_level', title: 'Learners by risk level' },
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'student_name', header: 'Learner' },
      { key: 'status', header: 'Status' },
      { key: 'risk_level', header: 'Risk level' },
      { key: 'ac_total', header: 'Criteria on qualification' },
      { key: 'ac_passed', header: 'Criteria passed' },
      { key: 'ac_passed_pct', header: 'Passed %' },
      { key: 'ac_submitted', header: 'Submitted, not decided' },
      { key: 'ac_needs_more', header: 'Needs more' },
    ],
  },
  {
    id: 'epa_readiness',
    title: 'End-point assessment readiness',
    description:
      'Each learner’s gateway lines met and criteria passed (from the gateway check itself), their EPA record stage, gateway date, weeks to gateway and functional skills.',
    group: 'achievement',
    filters: ['cohort'],
    fetch: fetchEpaReadinessReport,
    fileSlug: 'epa-readiness',
    breakdown: { key: 'gateway_state', title: 'Learners by gateway' },
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'student_name', header: 'Learner' },
      { key: 'gateway', header: 'Gateway' },
      { key: 'criteria_passed', header: 'Criteria passed' },
      { key: 'epa_status', header: 'EPA record stage' },
      { key: 'gateway_date', header: 'Gateway date' },
      { key: 'weeks_to_gateway', header: 'Weeks to gateway' },
      { key: 'result', header: 'Result' },
      { key: 'fs_maths_status', header: 'FS Maths' },
      { key: 'fs_english_status', header: 'FS English' },
    ],
  },
  {
    id: 'epa_pass_rate',
    title: 'EPA results by cohort',
    description:
      'Distinction, merit, pass and fail per cohort, with pass rate and the share at merit or above. Source data for inspection and your self-assessment.',
    group: 'achievement',
    filters: ['cohort'],
    fetch: fetchEpaPassRateReport,
    fileSlug: 'epa-pass-rate',
    bars: {
      labelKey: 'cohort_name',
      valueKey: 'pass_rate_pct',
      title: 'Pass rate by cohort',
      suffix: '%',
    },
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'total_apprentices', header: 'Apprentices' },
      { key: 'completed', header: 'Completed EPA' },
      { key: 'distinction', header: 'Distinction' },
      { key: 'merit', header: 'Merit' },
      { key: 'pass', header: 'Pass' },
      { key: 'fail', header: 'Fail' },
      { key: 'gateway_ready', header: 'Every gateway line met' },
      { key: 'in_progress', header: 'Gateway lines open' },
      { key: 'pass_rate_pct', header: 'Pass rate %' },
      { key: 'distinction_merit_pct', header: 'Achievement rate %' },
    ],
  },
  {
    id: 'quiz_results',
    title: 'Quiz results',
    description: 'Every quiz attempt with score, pass mark and whether it passed.',
    group: 'achievement',
    filters: ['cohort', 'dateRange'],
    fetch: fetchQuizResultsReport,
    fileSlug: 'quiz-results',
    breakdown: {
      key: 'passed',
      title: 'Attempts passed',
      labels: { true: 'Passed', false: 'Failed' },
    },
    columns: [
      { key: 'student_name', header: 'Learner' },
      { key: 'quiz_title', header: 'Quiz' },
      { key: 'submitted_at', header: 'Submitted at' },
      { key: 'score', header: 'Score' },
      { key: 'total_points', header: 'Total points' },
      { key: 'pct', header: 'Percentage' },
      { key: 'passed', header: 'Passed' },
    ],
  },
  {
    id: 'ac_coverage_gap',
    title: 'Criteria coverage gaps',
    description:
      'Every assessment criterion with the lessons and resources mapped to it. Criteria nothing covers are flagged.',
    group: 'curriculum',
    filters: ['qualificationCode'],
    fetch: fetchAcCoverageGapReport,
    fileSlug: 'ac-coverage-gap',
    breakdown: {
      key: 'is_uncovered',
      title: 'Criteria covered',
      labels: { true: 'No coverage', false: 'Covered' },
    },
    columns: [
      { key: 'qualification_code', header: 'Qualification' },
      { key: 'unit_code', header: 'Unit' },
      { key: 'ac_code', header: 'AC code' },
      { key: 'ac_text', header: 'AC description' },
      { key: 'lesson_count', header: 'Lessons mapped' },
      { key: 'resource_count', header: 'Resources tagged' },
      { key: 'is_uncovered', header: 'No coverage?' },
    ],
  },
];

const HELP: PageHelpContent = {
  id: 'college-reports',
  title: 'Reports',
  what: 'Every export a funding auditor, awarding body, inspector or head of department might ask for: ready-made PDFs, and spreadsheets you can open in Excel.',
  steps: [
    {
      title: 'Pick a report',
      body: 'Ready-made PDFs download straight away. The spreadsheets are grouped by what they are for: funding and audit, progress and achievement, and curriculum.',
    },
    {
      title: 'Narrow it down',
      body: 'Choose a cohort, a date range or a qualification where the report allows it, then tap Run report.',
    },
    {
      title: 'Check, then download',
      body: 'The figures and chart summarise exactly the rows you will download. The first 25 rows show below so you can check before you send it.',
    },
  ],
  notes: [
    {
      title: 'Opening in Excel',
      body: 'Downloads include a marker so Excel shows pound signs and accented names correctly.',
    },
    { title: 'Other exports', body: 'Each quiz also has its own export on the Quizzes page.' },
  ],
};

export default function ReportsPage() {
  useSEO({
    title: 'Reports | College Hub',
    description: 'Funding, Ofsted, awarding-body and quality reports.',
    noindex: true,
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('r');
  const active = useMemo(() => REPORTS.find((r) => r.id === activeId) ?? null, [activeId]);

  // Back from a report returns to the list it was opened from (same scroll),
  // instead of pushing the list again on top of the report, which made the
  // list's own Back step back into the report.
  const returnTo = useReturnTo();
  const close = () => returnTo('/college/reports');

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Reports"
        backTo="/college?section=qualityhub"
        onBack={active ? close : undefined}
      />
      <HubBody
        pushContext="Get notified about marking, off-the-job hours and learners who need you"
        hidePushPrompt
      >
        {!active ? (
          <>
            <CollegePageHeader
              eyebrow="Reports"
              title="Funding, inspection and quality reports"
              description={`Every export your funding auditor, awarding body, inspector or head of department might ask for: ${PDF_REPORTS.length} ready-made PDFs and ${REPORTS.length} spreadsheets.`}
              help={HELP}
            />
            {(() => {
              const card = (r: ReportDef<unknown>) => (
                <CollegeLinkCard
                  key={r.id}
                  title={r.title}
                  body={
                    <>
                      {r.description}
                      <span className="mt-2 block font-semibold">
                        Can filter {r.filters.map(filterLabel).join(' or ')}
                      </span>
                    </>
                  }
                  onClick={() => setSearchParams({ r: r.id }, { replace: false })}
                />
              );
              const group = (k: Group) => REPORTS.filter((r) => r.group === k);
              const meta = (k: Group) => GROUPS.find((g) => g.key === k)!;
              const grid = 'grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2';
              return (
                <>
                  <PdfReports />
                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    <section className="space-y-4">
                      <CollegeSectionTitle
                        title={meta('funding').title}
                        sub={meta('funding').sub}
                      />
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={grid}
                      >
                        {group('funding').map(card)}
                      </motion.div>
                    </section>
                    <section className="space-y-4">
                      <CollegeSectionTitle
                        title="Curriculum and other exports"
                        sub={meta('curriculum').sub}
                      />
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={grid}
                      >
                        {group('curriculum').map(card)}
                        <CollegeLinkCard
                          title="Per-quiz results"
                          body="Each quiz has its own attempt-by-attempt export on the Quizzes page."
                          onClick={() => navigate('/college/quizzes')}
                        />
                      </motion.div>
                    </section>
                  </div>
                  <section className="space-y-4">
                    <CollegeSectionTitle
                      title={meta('achievement').title}
                      sub={meta('achievement').sub}
                    />
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className={cn(grid, 'xl:grid-cols-4')}
                    >
                      {group('achievement').map(card)}
                    </motion.div>
                  </section>
                </>
              );
            })()}
          </>
        ) : (
          <ReportRunner report={active} onClose={close} />
        )}
      </HubBody>
    </HubPage>
  );
}

function filterLabel(f: FilterFlag): string {
  if (f === 'cohort') return 'by cohort';
  if (f === 'dateRange') return 'by date';
  return 'by qualification';
}

function prettyKey(v: unknown, labels?: Record<string, string>): string {
  const raw = v === null || v === undefined || v === '' ? 'Not set' : String(v);
  if (labels && labels[raw]) return labels[raw];
  return raw.charAt(0).toUpperCase() + raw.slice(1).replace(/_/g, ' ');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReportRunner({ report, onClose }: { report: ReportDef<any>; onClose: () => void }) {
  const { toast } = useToast();
  const { cohorts } = useCollegeCohortsLite();
  const [filters, setFilters] = useState<ReportFilters>({
    cohortId: null,
    startDate: null,
    endDate: null,
    qualificationCode: null,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  // The filters the rows on screen were actually run with. The form above
  // can be changed without running, so the figures read these, not `filters`.
  const [applied, setApplied] = useState<ReportFilters>(filters);

  // Auto-run with no filters on first open so the user sees something
  useEffect(() => {
    void runFetch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report.id]);

  const runFetch = async (f: ReportFilters) => {
    setLoading(true);
    try {
      const data = await report.fetch(f);
      setRows(data);
      setApplied(f);
      setHasRun(true);
    } catch (e) {
      toast({
        title: 'Could not run report',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (rows.length === 0) {
      toast({ title: 'Nothing to export', variant: 'destructive' });
      return;
    }
    const csv = rowsToCsv(rows, report.columns);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(csv, `${report.fileSlug}-${stamp}`);
    toast({ title: 'CSV downloaded' });
  };

  const chartRows: BarRow[] = useMemo(() => {
    if (report.bars) {
      const b = report.bars;
      return rows.slice(0, 12).map((r) => ({
        label: String(r[b.labelKey] ?? 'Unnamed'),
        n: Math.round(Number(r[b.valueKey] ?? 0)),
        tone: 'volt' as Tone,
      }));
    }
    if (report.breakdown) {
      const b = report.breakdown;
      const m = new Map<string, number>();
      for (const r of rows) {
        const k = prettyKey(r[b.key], b.labels);
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      return Array.from(m.entries())
        .map(([label, n]) => ({
          label,
          n,
          tone: STATUS_TONES[label.toLowerCase()] ?? ('volt' as Tone),
        }))
        .sort((a, b2) => b2.n - a.n)
        .slice(0, 8);
    }
    return [];
  }, [rows, report]);

  const total = report.sum ? rows.reduce((s, r) => s + (Number(r[report.sum!.key]) || 0), 0) : null;
  const learners = new Set(rows.map((r) => r.student_name).filter(Boolean)).size;
  const cohortName = applied.cohortId ? cohorts.find((c) => c.id === applied.cohortId)?.name : null;

  const showCohortFilter = report.filters.includes('cohort');
  const showDateFilter = report.filters.includes('dateRange');
  const showQualFilter = report.filters.includes('qualificationCode');
  const chartTitle = report.bars?.title ?? report.breakdown?.title ?? '';
  // Only filters this report uses AND that were set when it last ran.
  const appliedParts = [
    showCohortFilter && applied.cohortId ? (cohortName ?? 'One cohort') : null,
    showDateFilter && (applied.startDate || applied.endDate)
      ? `${applied.startDate ?? 'start'} to ${applied.endDate ?? 'today'}`
      : null,
    showQualFilter && applied.qualificationCode ? applied.qualificationCode : null,
  ].filter((x): x is string => Boolean(x));
  const dirty =
    hasRun &&
    (filters.cohortId !== applied.cohortId ||
      filters.startDate !== applied.startDate ||
      filters.endDate !== applied.endDate ||
      filters.qualificationCode !== applied.qualificationCode);

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Reports"
        title={report.title}
        description={report.description}
        help={HELP}
        actions={
          <>
            <button type="button" className={COLLEGE_BTN} onClick={onClose}>
              All reports
            </button>
            <button
              type="button"
              className={hasRun && !dirty ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN}
              onClick={handleDownload}
              disabled={loading || rows.length === 0}
            >
              Download CSV ({rows.length})
            </button>
          </>
        }
      />

      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className={COLLEGE_CARD}
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {showCohortFilter && (
            <div>
              <label className={labelCn}>Cohort</label>
              <MobileSelectPicker
                value={filters.cohortId ?? 'all'}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, cohortId: v === 'all' ? null : v }))
                }
                title="Cohort"
                options={[
                  { value: 'all', label: 'All cohorts' },
                  ...cohorts.map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
            </div>
          )}
          {showDateFilter && (
            <>
              <div>
                <label className={labelCn} htmlFor="report-from">
                  From
                </label>
                <input
                  id="report-from"
                  type="date"
                  value={filters.startDate ?? ''}
                  onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value || null }))}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="report-to">
                  To
                </label>
                <input
                  id="report-to"
                  type="date"
                  value={filters.endDate ?? ''}
                  onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value || null }))}
                  className={inputCn}
                />
              </div>
            </>
          )}
          {showQualFilter && (
            <div>
              <label className={labelCn} htmlFor="report-qual">
                Qualification code
              </label>
              <input
                id="report-qual"
                placeholder="e.g. 5357-02"
                value={filters.qualificationCode ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, qualificationCode: e.target.value || null }))
                }
                className={inputCn}
              />
            </div>
          )}
          <div className="flex items-end">
            <button
              type="button"
              className={cn(
                !hasRun || dirty ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN,
                'w-full sm:w-auto'
              )}
              onClick={() => runFetch(filters)}
              disabled={loading}
            >
              {loading ? 'Running…' : dirty ? 'Run with these filters' : 'Run report'}
            </button>
          </div>
        </div>
      </motion.section>

      {hasRun && (
        <>
          <p className="text-[15px] leading-relaxed text-white">
            {loading
              ? 'Running the report\u2026'
              : [
                  `${rows.length.toLocaleString('en-GB')} ${rows.length === 1 ? 'row' : 'rows'} in the download`,
                  learners > 0 ? `${learners} ${learners === 1 ? 'learner' : 'learners'}` : null,
                  total !== null && report.sum
                    ? `${total.toLocaleString('en-GB', { maximumFractionDigits: report.sum.digits ?? 0 })} ${report.sum.label.toLowerCase()}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(', ') +
                `. ${appliedParts.length ? `Filtered to ${appliedParts.join(', ')}.` : 'Everything on record, no filters.'}`}
          </p>
          <div className="grid grid-cols-1 items-stretch gap-4">
            {chartTitle && (
              <motion.section
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={VIS_CARD}
              >
                <VisHead title={chartTitle} sub="From the rows below" />
                <div className="mt-5">
                  {chartRows.length === 0 ? (
                    <ChartEmpty text="No rows to chart" />
                  ) : (
                    <BarList
                      rows={chartRows}
                      max={report.bars?.suffix === '%' ? 100 : undefined}
                      suffix={report.bars?.suffix}
                    />
                  )}
                </div>
              </motion.section>
            )}
          </div>

          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={VIS_CARD}
          >
            <VisHead
              title="Preview"
              sub={
                rows.length > 25
                  ? `First 25 of ${rows.length.toLocaleString('en-GB')} rows`
                  : `${rows.length} rows`
              }
              aside={
                rows.length > 0 ? (
                  <button type="button" className={COLLEGE_LINK} onClick={handleDownload}>
                    Download
                  </button>
                ) : undefined
              }
            />
            {rows.length === 0 ? (
              <ChartEmpty
                className="mt-4"
                text="No rows match these filters. Widen the dates or pick All cohorts."
              />
            ) : (
              <>
                {/* Phone: stacked key/value cards, no sideways-scrolling table */}
                <div className="mt-4 space-y-3 sm:hidden">
                  {rows.slice(0, 25).map((r, i) => (
                    <div
                      key={i}
                      className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                    >
                      {report.columns.map((c) => (
                        <div
                          key={c.key}
                          className="flex items-start justify-between gap-3 px-3 py-2"
                        >
                          <span className="shrink-0 text-[12px] font-medium text-white">
                            {c.header}
                          </span>
                          <span className="break-words text-right text-[12.5px] text-white">
                            {formatCell(r[c.key])}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* sm+: full table */}
                <div className="mt-4 hidden overflow-x-auto sm:block">
                  <table className="min-w-full text-[12.5px]">
                    <thead>
                      <tr className="border-b border-white/[0.1]">
                        {report.columns.map((c) => (
                          <th
                            key={c.key}
                            className="whitespace-nowrap px-2 py-2 text-left font-semibold text-white"
                          >
                            {c.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 25).map((r, i) => (
                        <tr key={i} className="border-b border-white/[0.05]">
                          {report.columns.map((c) => (
                            <td key={c.key} className="whitespace-nowrap px-2 py-2 text-white">
                              {formatCell(r[c.key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </motion.section>
        </>
      )}
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T/.test(v)) {
      return new Date(v).toLocaleDateString('en-GB');
    }
    return v;
  }
  return String(v);
}
