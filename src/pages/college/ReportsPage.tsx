import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import {
  PageFrame,
  PageHero,
  Pill,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/* ==========================================================================
   ReportsPage — /college/reports
   Single front door for every CSV report a tutor / HoD / IQA / audit
   inspector might want. Each report is a definition:
     - id, title, description, eyebrow, tone
     - which filters apply (cohort? date range? qualification?)
     - fetcher fn (from useCollegeReports.ts)
     - column shape for rowsToCsv

   No duplication: uses the existing csv.ts utility + the cohort-light hook.
   ========================================================================== */

type FilterFlag = 'cohort' | 'dateRange' | 'qualificationCode';

interface CsvColumn<R> {
  key: keyof R & string;
  header: string;
}

interface ReportDef<R> {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tone: Tone;
  filters: FilterFlag[];
  fetch: (f: ReportFilters) => Promise<R[]>;
  columns: CsvColumn<R>[];
  fileSlug: string;
}

const REPORTS: ReportDef<any>[] = [
  {
    id: 'otj',
    title: 'Off-the-job hours',
    eyebrow: 'ESFA · OTJ log',
    description: 'Every OTJ entry with duration, status, learner + cohort. Filter by date range or cohort.',
    tone: 'emerald',
    filters: ['cohort', 'dateRange'],
    fetch: fetchOtjReport,
    fileSlug: 'otj-hours',
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
    eyebrow: 'Funding · Audit',
    description: 'Per-session register entries with status + tutor notes. Filter by cohort + date range.',
    tone: 'amber',
    filters: ['cohort', 'dateRange'],
    fetch: fetchAttendanceReport,
    fileSlug: 'attendance',
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
    eyebrow: 'Curriculum coverage',
    description: 'Per-learner course progress + AC sign-off coverage. Snapshot for HoD review and SAR data.',
    tone: 'blue',
    filters: ['cohort'],
    fetch: fetchCohortProgressReport,
    fileSlug: 'cohort-progress',
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'student_name', header: 'Learner' },
      { key: 'status', header: 'Status' },
      { key: 'progress_percent', header: 'Progress %' },
      { key: 'risk_level', header: 'Risk level' },
      { key: 'ac_total', header: 'ACs tracked' },
      { key: 'ac_signed_off', header: 'ACs signed off' },
      { key: 'ac_signed_off_pct', header: 'Signed off %' },
    ],
  },
  {
    id: 'epa_readiness',
    title: 'EPA readiness pipeline',
    eyebrow: 'Gateway · EPA',
    description: 'Per-learner EPA status, gateway date, weeks to gateway, Maths + English Functional Skills status.',
    tone: 'green',
    filters: ['cohort'],
    fetch: fetchEpaReadinessReport,
    fileSlug: 'epa-readiness',
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'student_name', header: 'Learner' },
      { key: 'epa_status', header: 'EPA status' },
      { key: 'gateway_date', header: 'Gateway date' },
      { key: 'weeks_to_gateway', header: 'Weeks to gateway' },
      { key: 'result', header: 'Result' },
      { key: 'fs_maths_status', header: 'FS Maths' },
      { key: 'fs_english_status', header: 'FS English' },
    ],
  },
  {
    id: 'epa_pass_rate',
    title: 'EPA pass-rate by cohort',
    eyebrow: 'Achievement · Ofsted',
    description:
      'Per-cohort EPA outcomes — Distinction / Merit / Pass / Fail, pass rate and achievement rate (Distinction + Merit). Source data for Ofsted EIF judgements.',
    tone: 'emerald',
    filters: ['cohort'],
    fetch: fetchEpaPassRateReport,
    fileSlug: 'epa-pass-rate',
    columns: [
      { key: 'cohort_name', header: 'Cohort' },
      { key: 'total_apprentices', header: 'Apprentices' },
      { key: 'completed', header: 'Completed EPA' },
      { key: 'distinction', header: 'Distinction' },
      { key: 'merit', header: 'Merit' },
      { key: 'pass', header: 'Pass' },
      { key: 'fail', header: 'Fail' },
      { key: 'gateway_ready', header: 'Gateway ready' },
      { key: 'in_progress', header: 'In progress' },
      { key: 'pass_rate_pct', header: 'Pass rate %' },
      { key: 'distinction_merit_pct', header: 'Achievement rate %' },
    ],
  },
  {
    id: 'ac_coverage_gap',
    title: 'AC coverage gaps',
    eyebrow: 'Curriculum · Ofsted',
    description: 'Every assessment criterion with the count of lessons and resources mapped to it. Uncovered ACs flagged.',
    tone: 'red',
    filters: ['qualificationCode'],
    fetch: fetchAcCoverageGapReport,
    fileSlug: 'ac-coverage-gap',
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
  {
    id: 'quiz_results',
    title: 'Quiz results',
    eyebrow: 'Assessment · attempts',
    description: 'Per-attempt quiz results with score, pass mark and pass/fail. Filter by cohort + date range.',
    tone: 'purple',
    filters: ['cohort', 'dateRange'],
    fetch: fetchQuizResultsReport,
    fileSlug: 'quiz-results',
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
];

export default function ReportsPage() {
  useSEO({
    title: 'Reports — College Hub',
    description: 'Funding, Ofsted, awarding-body and quality reports.',
    noindex: true,
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('r');
  const active = useMemo(() => REPORTS.find((r) => r.id === activeId) ?? null, [activeId]);

  return (
    <PageFrame>
      <PageHero
        eyebrow="Reports"
        title="Funding, Ofsted & quality reports"
        description="Every export your funding inspector, awarding body or HoD might ask for. CSV downloads include a UTF-8 BOM so Excel renders pound signs and names correctly."
        actions={
          <SecondaryButton onClick={() => navigate('/college')}>
            ← Back to College Hub
          </SecondaryButton>
        }
      />

      {!active && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="px-4 pb-16"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((r) => (
              <ReportCard
                key={r.id}
                report={r}
                onOpen={() => setSearchParams({ r: r.id }, { replace: false })}
              />
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
            <SectionHeader eyebrow="Tip" title="Other places exports live" />
            <p className="mt-3 text-[13px] text-white/70 leading-relaxed">
              Quiz attempt detail also has a per-quiz CSV from the{' '}
              <button
                onClick={() => navigate('/college/quizzes')}
                className="underline underline-offset-2 text-elec-yellow hover:text-elec-yellow/80"
              >
                Quizzes page
              </button>
              . Funding ILR + awarding-body submission pipelines are on the integrations roadmap.
            </p>
          </section>
        </motion.div>
      )}

      {active && (
        <ReportRunner
          report={active}
          onClose={() => {
            const next = new URLSearchParams(searchParams);
            next.delete('r');
            setSearchParams(next, { replace: false });
          }}
        />
      )}
    </PageFrame>
  );
}

function ReportCard({ report, onOpen }: { report: ReportDef<any>; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
      className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] p-5 transition-colors touch-manipulation"
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
        {report.eyebrow}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{report.title}</h3>
      <p className="mt-2 text-[13px] text-white/70 leading-relaxed">{report.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {report.filters.map((f) => (
          <Pill key={f} tone={report.tone}>
            {filterLabel(f)}
          </Pill>
        ))}
      </div>
    </motion.button>
  );
}

function filterLabel(f: FilterFlag): string {
  if (f === 'cohort') return 'Cohort filter';
  if (f === 'dateRange') return 'Date range';
  return 'Qualification';
}

function ReportRunner({ report, onClose }: { report: ReportDef<any>; onClose: () => void }) {
  const { toast } = useToast();
  const { cohorts } = useCollegeCohortsLite();
  const [filters, setFilters] = useState<ReportFilters>({
    cohortId: null,
    startDate: null,
    endDate: null,
    qualificationCode: null,
  });
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

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

  const showCohortFilter = report.filters.includes('cohort');
  const showDateFilter = report.filters.includes('dateRange');
  const showQualFilter = report.filters.includes('qualificationCode');

  return (
    <div className="px-4 pb-16 space-y-5">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
              {report.eyebrow}
            </div>
            <h2 className="mt-1 text-xl font-semibold text-white">{report.title}</h2>
            <p className="mt-2 text-[13px] text-white/70 max-w-xl leading-relaxed">
              {report.description}
            </p>
          </div>
          <SecondaryButton onClick={onClose}>← All reports</SecondaryButton>
        </div>

        {/* Filter strip */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {showCohortFilter && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/70">Cohort</label>
              <Select
                value={filters.cohortId ?? 'all'}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, cohortId: v === 'all' ? null : v }))
                }
              >
                <SelectTrigger className="mt-1 h-11 bg-elec-gray border-white/30 touch-manipulation">
                  <SelectValue placeholder="All cohorts" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10 text-white">
                  <SelectItem value="all">All cohorts</SelectItem>
                  {cohorts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showDateFilter && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/70">From</label>
                <Input
                  type="date"
                  value={filters.startDate ?? ''}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, startDate: e.target.value || null }))
                  }
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/70">To</label>
                <Input
                  type="date"
                  value={filters.endDate ?? ''}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, endDate: e.target.value || null }))
                  }
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
              </div>
            </>
          )}

          {showQualFilter && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/70">
                Qualification code
              </label>
              <Input
                placeholder="e.g. 5357-02"
                value={filters.qualificationCode ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    qualificationCode: e.target.value || null,
                  }))
                }
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <PrimaryButton onClick={() => runFetch(filters)} disabled={loading}>
            {loading ? 'Running…' : 'Run report'}
          </PrimaryButton>
          <SecondaryButton onClick={handleDownload} disabled={loading || rows.length === 0}>
            Download CSV ({rows.length})
          </SecondaryButton>
        </div>
      </motion.div>

      {/* Preview table */}
      {hasRun && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 overflow-x-auto"
        >
          <SectionHeader eyebrow="Preview" title={`First 25 of ${rows.length} rows`} />
          {rows.length === 0 ? (
            <div className="mt-3 rounded-lg border border-dashed border-white/10 px-3 py-8 text-center text-sm text-white/70">
              No rows match the current filters.
            </div>
          ) : (
            <>
              {/* Mobile: stacked key/value cards (no horizontal-scroll table) */}
              <div className="mt-3 space-y-3 sm:hidden">
                {rows.slice(0, 25).map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/[0.06]"
                  >
                    {report.columns.map((c) => (
                      <div
                        key={c.key}
                        className="flex items-start justify-between gap-3 px-3 py-2"
                      >
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white/70 shrink-0">
                          {c.header}
                        </span>
                        <span className="text-[12.5px] text-white/90 text-right break-words">
                          {formatCell(r[c.key])}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* sm+: full table */}
              <div className="mt-3 hidden sm:block overflow-x-auto">
                <table className="min-w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      {report.columns.map((c) => (
                        <th
                          key={c.key}
                          className={cn(
                            'px-2 py-2 text-left font-medium uppercase tracking-wider text-white/70 whitespace-nowrap'
                          )}
                        >
                          {c.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 25).map((r, i) => (
                      <tr key={i} className="border-b border-white/5">
                        {report.columns.map((c) => (
                          <td
                            key={c.key}
                            className="px-2 py-2 text-white/90 whitespace-nowrap"
                          >
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
        </motion.div>
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
