import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSmartBack } from '@/lib/navHistory';
import { useCollegeScope } from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { FormSheet } from '@/components/forms/FormSheet';
import { QuietTabs } from '@/components/college/otj/hoursUi';
import { LeaveOutSheet } from '@/components/college/otj/LeaveOutSheet';
import { ConfirmedHoursSection } from '@/components/college/otj/ConfirmedHoursSection';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn } from '@/components/forms/fieldStyles';
import {
  approveAppLearning,
  undoAppLearningDecision,
  fetchCollegeOtj,
  fetchLearnerAppDays,
  type AppLearningDay,
  type CollegeOtjRow,
} from '@/hooks/useOtjSummary';

/* ==========================================================================
   CollegeOtjPage — /college/otj. The tutor's off-the-job hours, centralised.

   Andrew, 6 Oct 2026: "the tutor should see every person in their cohort,
   the time they've spent… so it's easy for them to see, judge and approve."

   Every learner, one row: the time they spent learning in the app this week
   and where (Study Centre, mock exams, flashcards, quizzes, revision, videos,
   AM2 and EPA practice), their counted hours against the standard's required
   total, and how much app learning is waiting for approval. Tap a learner for
   the day-by-day breakdown; approve one learner or the whole view at once.

   Every figure comes from get_otj_summary / get_college_otj — the same
   numbers the learner and employer see. Approving turns app learning into a
   verified entry with the tutor's name on it (approve_app_learning).

   Replaces the version that judged learners against a 6h/week minimum,
   which stopped being the rule in August 2025.
   ========================================================================== */

type Filter = 'all' | 'approve' | 'behind' | 'quiet';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'approve', label: 'To approve' },
  { key: 'behind', label: 'Behind' },
  { key: 'quiet', label: 'No training this month' },
];

const AREA_ORDER = [
  'Study Centre',
  'Mock exams',
  'Flashcards',
  'Quizzes',
  'Revision',
  'AM2 simulator',
  'EPA practice',
  'Videos',
  'Site diary',
];

// The words the off-the-job section uses for get_otj_summary's risk, so a
// learner reads the same on both screens.
const STATUS_WORD: Record<CollegeOtjRow['summary']['risk'], string> = {
  on_track: 'On track',
  slightly_behind: 'Behind',
  behind: 'At risk',
  unknown: 'Not judged',
};

function fmtH(h: number | null | undefined): string {
  const v = Number(h ?? 0);
  if (v <= 0) return '0h';
  if (v < 1) return `${Math.round(v * 60)}m`;
  return v < 10 ? `${v.toFixed(1)}h` : `${Math.round(v).toLocaleString('en-GB')}h`;
}

function fmtMins(m: number): string {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}

function fmtDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function areasLine(areas: Record<string, number>, max = 3): string {
  const list = Object.entries(areas)
    .filter(([, h]) => h > 0)
    .sort((a, b) => b[1] - a[1]);
  if (list.length === 0) return 'No app learning in 30 days';
  const shown = list.slice(0, max).map(([a, h]) => `${a} ${fmtH(h)}`);
  return list.length > max
    ? `${shown.join(' · ')} · +${list.length - max} more`
    : shown.join(' · ');
}

const isBehind = (r: CollegeOtjRow) =>
  r.summary.risk === 'behind' || r.summary.risk === 'slightly_behind';

// Funding rules para 89: some off-the-job training every calendar month.
const isQuiet = (r: CollegeOtjRow) => !r.trained_this_month;
const MONTH_NAME = new Date().toLocaleDateString('en-GB', { month: 'long' });

const HELP: PageHelpContent = {
  id: 'college-otj-hours',
  title: 'Off-the-job hours',
  what: 'Every learner’s off-the-job training against the total their standard requires. Time spent learning in Elec-Mate is measured as it happens and counts; you approve it.',
  steps: [
    {
      title: 'Approve app learning',
      body: 'One tap approves a learner, a day or the whole view. It is marked verified with your name.',
    },
    {
      title: 'Leave out what does not count',
      body: 'Open a learner’s days and leave out time that does not meet the rules, with a reason they will see.',
    },
    {
      title: 'Watch the monthly check',
      body: 'The rules expect some training every month. Learners with none this month are flagged.',
    },
  ],
  notes: [
    {
      title: 'Diary and work activities',
      body: 'What learners log themselves waits in Hours to verify.',
    },
    {
      title: 'Confirmed by apprentices',
      body: 'Register days and site diary days come to the apprentice as hours to confirm, so nobody types them twice. A register day kept to the lesson length counts straight away with the register marker’s name; anything else waits in Hours to verify. Each row says where it came from.',
    },
  ],
  source: 'Apprenticeship funding rules 2025/26, paragraphs 77 to 94.',
};

export default function CollegeOtjPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rows, setRows] = useState<CollegeOtjRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  // /college/otj?filter=approve (from the Today screen) opens on "To approve".
  const [filter, setFilter] = useState<Filter>(() => {
    const f = new URLSearchParams(window.location.search).get('filter');
    return f === 'approve' || f === 'behind' || f === 'quiet' ? f : 'all';
  });
  const [cohort, setCohort] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [openRow, setOpenRow] = useState<CollegeOtjRow | null>(null);
  // ?learner=<college_students.id> (from the college inbox) opens their days.
  const [learnerOpened, setLearnerOpened] = useState(false);
  useEffect(() => {
    if (learnerOpened || rows.length === 0) return;
    const id = new URLSearchParams(window.location.search).get('learner');
    const hit = id ? rows.find((r) => r.college_student_id === id) : null;
    if (hit) {
      setOpenRow(hit);
      openedFromLink.current = true;
    }
    setLearnerOpened(true);
  }, [rows, learnerOpened]);
  // Closing a sheet the inbox opened goes straight back to the inbox, not to
  // the hours list underneath (opened cold, it just drops the ?learner).
  const openedFromLink = useRef(false);
  const smartBack = useSmartBack();
  const closeLearner = () => {
    setOpenRow(null);
    if (openedFromLink.current) {
      openedFromLink.current = false;
      smartBack('/college/otj');
    }
  };
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [approving, setApproving] = useState(false);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      setRows(await fetchCollegeOtj());
    } catch (e) {
      setLoadError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // ELE-1886: the one College Hub scope (masthead switch). Totals and the
  // whole-view approve follow it.
  const scope = useCollegeScope();
  const scopedRows = useMemo(
    () =>
      scope.set
        ? rows.filter((r) =>
            scope.inScope({ studentId: r.college_student_id, cohortId: r.cohort_id })
          )
        : rows,
    [rows, scope]
  );

  const cohorts = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of scopedRows) if (r.cohort_id) m.set(r.cohort_id, r.cohort_name ?? 'Cohort');
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [scopedRows]);

  const inCohort = useMemo(
    () => (cohort === 'all' ? scopedRows : scopedRows.filter((r) => r.cohort_id === cohort)),
    [scopedRows, cohort]
  );
  // A cohort that left the view (the scope changed) stops filtering.
  useEffect(() => {
    if (!loading && cohort !== 'all' && !cohorts.some(([id]) => id === cohort)) setCohort('all');
  }, [loading, cohort, cohorts]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    let list = inCohort;
    if (filter === 'approve') list = list.filter((r) => r.unapproved_app_hours > 0);
    if (filter === 'behind') list = list.filter(isBehind);
    if (filter === 'quiet') list = list.filter(isQuiet);
    if (needle) list = list.filter((r) => r.name.toLowerCase().includes(needle));
    // Behind first, then most waiting to approve, then name.
    return [...list].sort(
      (a, b) =>
        Number(isBehind(b)) - Number(isBehind(a)) ||
        b.unapproved_app_hours - a.unapproved_app_hours ||
        a.name.localeCompare(b.name)
    );
  }, [inCohort, filter, search]);

  const totals = useMemo(() => {
    let week = 0;
    let toApprove = 0;
    let signOff = 0;
    let toApproveLearners = 0;
    let behind = 0;
    let quiet = 0;
    for (const r of inCohort) {
      week += r.summary.app_learning_this_week_hours ?? 0;
      signOff += r.summary.pending_hours ?? 0;
      if (r.unapproved_app_hours > 0) {
        toApprove += r.unapproved_app_hours;
        toApproveLearners += 1;
      }
      if (isBehind(r)) behind += 1;
      if (isQuiet(r)) quiet += 1;
    }
    return { week, toApprove, toApproveLearners, behind, quiet, signOff };
  }, [inCohort]);

  const countFor = (key: Filter) =>
    key === 'all'
      ? inCohort.length
      : key === 'approve'
        ? totals.toApproveLearners
        : key === 'behind'
          ? totals.behind
          : totals.quiet;

  const approveAll = async () => {
    const ids = inCohort.filter((r) => r.unapproved_app_hours > 0).map((r) => r.user_id);
    if (ids.length === 0) return;
    setApproving(true);
    const res = await approveAppLearning(ids);
    setApproving(false);
    setConfirmBulk(false);
    if (res.error || !res.success) {
      toast({
        title: 'Not approved',
        description: res.error ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: `${fmtH(res.hours)} approved for ${res.learners} ${res.learners === 1 ? 'learner' : 'learners'}`,
      description: 'Each learner sees it as verified, with your name on it.',
      duration: 8000,
      action: res.entry_ids?.length
        ? {
            label: 'Undo',
            onClick: () => {
              void undoAppLearningDecision(res.entry_ids ?? []).then((ok) => {
                if (ok) void load();
              });
            },
          }
        : undefined,
    });
    void load();
  };

  // One row per learner, the same figures the page shows: counted, verified
  // or approved, app learning waiting for approval, waiting sign-off, planned
  // to date, forecast. Opens cleanly in Excel (BOM, quoted).
  const handleExport = () => {
    const header = [
      'Learner',
      'Cohort',
      'Required hours',
      'Requirement source',
      'Programme start',
      'Programme end',
      'Planned to date',
      'Counted hours',
      'Approved or verified hours',
      'App learning awaiting approval',
      'Waiting in Hours to verify',
      'App learning this week',
      'App learning last 30 days',
      'Forecast at end',
      'Status',
      'Last app learning',
    ];
    const q = (v: unknown) => {
      const t = v == null ? '' : String(v);
      return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
    };
    const lines = [header.join(',')];
    for (const r of inCohort) {
      const s = r.summary;
      lines.push(
        [
          r.name,
          r.cohort_name ?? '',
          s.required_hours ?? '',
          s.required_source,
          s.start_date ?? '',
          s.end_date ?? '',
          s.planned_to_date_hours ?? '',
          s.counted_hours,
          s.verified_hours,
          s.app_learning_hours,
          s.pending_hours,
          s.app_learning_this_week_hours,
          s.app_learning_last_30_days_hours,
          s.forecast_at_end_hours ?? '',
          s.risk.replace(/_/g, ' '),
          r.last_learning_at ?? '',
        ]
          .map(q)
          .join(',')
      );
    }
    try {
      const blob = new Blob(['\ufeff', lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `off-the-job-hours-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${inCohort.length} learners` });
    } catch (e) {
      toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Off-the-job hours" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow="Off-the-job"
          title={
            loading
              ? 'Gathering hours…'
              : totals.toApprove > 0
                ? `${fmtH(totals.toApprove)} of app learning to approve`
                : 'All app learning approved'
          }
          description={
            loading
              ? 'Every learner’s off-the-job hours against the total their standard requires.'
              : [
                  `${inCohort.length} ${inCohort.length === 1 ? 'learner' : 'learners'}, ${fmtH(totals.week)} learning in the app this week`,
                  totals.behind > 0
                    ? `${totals.behind} behind the planned hours to date`
                    : 'nobody behind',
                  totals.quiet > 0 ? `${totals.quiet} with no training in ${MONTH_NAME}` : null,
                  totals.signOff > 0
                    ? `${fmtH(totals.signOff)} logged by learners waiting in Hours to verify`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ') + '.'
          }
          help={HELP}
          actions={
            <>
              <CollegeScopeTabs onChange={() => setCohort('all')} />
              <button
                type="button"
                onClick={() => navigate('/college/otj/inbox')}
                className={COLLEGE_BTN}
              >
                Hours to verify
              </button>
              {totals.toApprove > 0 && (
                <button
                  type="button"
                  onClick={() => setConfirmBulk(true)}
                  disabled={loading}
                  className={COLLEGE_BTN_PRIMARY}
                >
                  Approve {fmtH(totals.toApprove)}
                </button>
              )}
            </>
          }
        />

        {cohorts.length > 1 && (
          <QuietTabs
            label="Filter by cohort"
            value={cohort}
            onChange={setCohort}
            tabs={[
              { key: 'all', label: 'All cohorts' },
              ...cohorts.map(([id, label]) => ({ key: id, label })),
            ]}
          />
        )}

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants}>
            <CollegeSectionTitle
              title="Learners"
              sub="Behind first, then most waiting to approve. Tap one for their days."
              action={
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={inCohort.length === 0}
                  className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation disabled:opacity-50"
                >
                  Export CSV
                </button>
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a learner"
              aria-label="Find a learner"
              enterKeyHint="search"
              className={inputCn}
            />
          </motion.div>

          <motion.div variants={itemVariants} className={COLLEGE_LIST}>
            <QuietTabs
              label="Filter learners"
              value={filter}
              onChange={setFilter}
              className="mx-0 border-white/[0.06] px-2 sm:px-3"
              tabs={FILTERS.map((f) => ({
                key: f.key,
                label: f.label,
                count: countFor(f.key),
                warn: f.key !== 'all',
              }))}
            />
            {loading ? (
              <div className="space-y-px animate-pulse">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-white/[0.04]" />
                ))}
              </div>
            ) : loadError ? (
              <p className="px-4 py-8 text-center text-[13px] text-white">
                Could not load hours. {loadError}
              </p>
            ) : filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-white">
                {rows.length === 0
                  ? 'No learners have joined yet.'
                  : 'No learners match this view.'}
              </p>
            ) : (
              // One column on a phone; two on a wide screen so a long list
              // doesn't stretch each bar across the whole page.
              <ul className="-mb-px grid grid-cols-1 xl:grid-cols-2">
                {filtered.map((r) => (
                  <li
                    key={r.college_student_id}
                    className="border-b border-white/[0.06] xl:odd:border-r"
                  >
                    <LearnerRow row={r} onClick={() => setOpenRow(r)} />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <p className="text-[12px] leading-relaxed text-white">
            Time a learner spends learning in Elec-Mate is recorded as it happens and counts towards
            their off-the-job hours. Approving it marks it verified with your name. Site diary and
            work activities they send you are in Hours to verify.
          </p>
        </motion.section>

        <ConfirmedHoursSection cohortId={cohort} />
      </HubBody>

      <LearnerHoursSheet
        row={openRow}
        onOpenChange={(o) => !o && closeLearner()}
        onChanged={() => void load()}
        onOpenStudent={(id) =>
          navigate(`/college?section=student360&studentId=${encodeURIComponent(id)}#otj`)
        }
      />

      <FormSheet
        width="wide"
        open={confirmBulk}
        onOpenChange={setConfirmBulk}
        eyebrow="Approve app learning"
        title={`Approve ${fmtH(totals.toApprove)} for ${totals.toApproveLearners} ${totals.toApproveLearners === 1 ? 'learner' : 'learners'}`}
        description="Everything recorded up to today in the view you are looking at. Each learner's hours are marked verified with your name, grouped by week, with the day and area listed."
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setConfirmBulk(false)}
              disabled={approving}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={approveAll}
              disabled={approving}
              className={buttonPrimaryCn}
            >
              {approving ? 'Approving…' : 'Approve'}
            </button>
          </div>
        }
      >
        <ul className="divide-y divide-white/[0.10]">
          {inCohort
            .filter((r) => r.unapproved_app_hours > 0)
            .map((r) => (
              <li
                key={r.college_student_id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-white">
                    {r.name}
                  </span>
                  <span className="block truncate text-[12px] text-white">
                    {areasLine(r.areas_30_days)}
                  </span>
                </span>
                <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                  {fmtH(r.unapproved_app_hours)}
                </span>
              </li>
            ))}
        </ul>
      </FormSheet>
    </HubPage>
  );
}

/* ──────────────────────────────────────────────────────── */

function LearnerRow({ row, onClick }: { row: CollegeOtjRow; onClick: () => void }) {
  const s = row.summary;
  const behind = isBehind(row);
  const required = s.required_hours ?? 0;
  const pct = required > 0 ? Math.min(100, (s.counted_hours / required) * 100) : 0;
  const status = !row.trained_this_month ? `No training in ${MONTH_NAME}` : STATUS_WORD[s.risk];
  const statusWarn = behind || !row.trained_this_month;

  // The name gets its own line (never cut to "Harvey Patel (fi…"); status,
  // what's waiting and this week's time sit on the line under it in words.
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5"
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 break-words text-[15px] font-semibold leading-snug text-white">
            {row.name}
          </span>
          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
            {fmtH(s.counted_hours)}
            {required > 0 ? ` of ${fmtH(required)}` : ''}
          </span>
        </span>
        <span className="mt-1 flex flex-wrap items-baseline gap-x-1 gap-y-0.5 text-[13px] leading-snug">
          <span
            className={cn(
              'font-semibold',
              statusWarn
                ? 'text-orange-300'
                : s.risk === 'on_track'
                  ? 'text-emerald-300'
                  : 'text-white'
            )}
          >
            {status}
          </span>
          {row.unapproved_app_hours > 0 && (
            <span className="font-semibold text-white">
              · {fmtH(row.unapproved_app_hours)} to approve
            </span>
          )}
          <span className="text-white">· {fmtH(s.app_learning_this_week_hours)} this week</span>
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-white">
          {areasLine(row.areas_30_days)}
        </span>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/[0.10]">
          <span
            className={cn('block h-full rounded-full', behind ? 'bg-orange-500' : 'bg-white')}
            style={{ width: `${pct}%` }}
          />
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
  );
}

function LearnerHoursSheet({
  row,
  onOpenChange,
  onChanged,
  onOpenStudent,
}: {
  row: CollegeOtjRow | null;
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
  onOpenStudent: (collegeStudentId: string) => void;
}) {
  const { toast } = useToast();
  const [days, setDays] = useState<AppLearningDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [leaveOut, setLeaveOut] = useState<AppLearningDay | null>(null);

  const userId = row?.user_id ?? null;
  const reload = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      setDays(await fetchLearnerAppDays(userId));
    } catch (e) {
      toast({
        title: 'Could not load days',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    setDays([]);
    void reload();
  }, [reload]);

  if (!row) return null;
  const s = row.summary;
  const totalMinutes = days.reduce((n, d) => n + d.minutes, 0);

  const approve = async (key: string, ids?: string[]) => {
    setBusy(key);
    const res = await approveAppLearning([row.user_id], ids);
    setBusy(null);
    if (res.error || !res.success) {
      toast({
        title: 'Not approved',
        description: res.error ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: `${fmtH(res.hours)} approved`,
      description: `${row.name}'s hours now show as verified.`,
      duration: 8000,
      action: res.entry_ids?.length
        ? {
            label: 'Undo',
            onClick: () => {
              void undoAppLearningDecision(res.entry_ids ?? []).then((ok) => {
                if (ok) {
                  onChanged();
                  void reload();
                }
              });
            },
          }
        : undefined,
    });
    onChanged();
    void reload();
  };

  const areas = Object.entries(row.areas_30_days ?? {})
    .filter(([, h]) => h > 0)
    .sort((a, b) => AREA_ORDER.indexOf(a[0]) - AREA_ORDER.indexOf(b[0]));

  return (
    <>
      <LeaveOutSheet
        open={!!leaveOut}
        onOpenChange={(o) => !o && setLeaveOut(null)}
        userId={row.user_id}
        learnerName={row.name.split(' ')[0] || row.name}
        dayLabel={leaveOut ? fmtDay(leaveOut.day) : ''}
        minutesLabel={leaveOut ? fmtMins(leaveOut.minutes) : ''}
        timeEntryIds={leaveOut?.time_entry_ids ?? []}
        onDone={() => {
          onChanged();
          void reload();
        }}
      />
      <FormSheet
        width="wide"
        open={!!row}
        onOpenChange={onOpenChange}
        eyebrow={row.cohort_name ?? 'Off-the-job hours'}
        title={row.name}
        description={
          s.required_hours
            ? [
                `${fmtH(s.counted_hours)} counted of ${fmtH(s.required_hours)} required`,
                s.planned_to_date_hours != null
                  ? `${fmtH(s.planned_to_date_hours)} planned by now`
                  : null,
                s.forecast_at_end_hours != null
                  ? `on this pace ${fmtH(s.forecast_at_end_hours)} by the end`
                  : null,
              ]
                .filter(Boolean)
                .join(' · ')
            : `${fmtH(s.counted_hours)} counted. No required total is set for this learner.`
        }
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenStudent(row.college_student_id)}
              className={buttonSecondaryCn}
            >
              Student 360
            </button>
            <button
              type="button"
              onClick={() =>
                approve(
                  'all',
                  days.flatMap((d) => d.time_entry_ids)
                )
              }
              disabled={busy !== null || totalMinutes === 0}
              className={buttonPrimaryCn}
            >
              {busy === 'all'
                ? 'Approving…'
                : totalMinutes > 0
                  ? `Approve ${fmtMins(totalMinutes)}`
                  : 'All approved'}
            </button>
          </div>
        }
      >
        {/* Wide screens: the summary and areas on the left, the days to
            decide on the right, so neither runs the full sheet width. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
          <div className="min-w-0 space-y-6 lg:sticky lg:top-0 lg:self-start">
            {/* Said in words: the header already gives counted against the target. */}
            <p className="text-[14px] leading-relaxed text-white">
              {fmtH(s.verified_hours)} approved or verified.{' '}
              {Number(s.app_learning_hours) > 0
                ? `${fmtH(s.app_learning_hours)} of app learning waiting for your approval below`
                : 'No app learning waiting for approval'}
              {Number(s.pending_hours) > 0
                ? `, and ${fmtH(s.pending_hours)} of work activities in Hours to verify.`
                : '.'}
            </p>

            <div>
              <h3 className="mb-2 text-[13px] font-semibold text-white">Last 30 days in the app</h3>
              {areas.length === 0 ? (
                <p className="text-[13px] text-white">No app learning in the last 30 days.</p>
              ) : (
                <ul className="space-y-2">
                  {areas.map(([area, hours]) => {
                    const max = Math.max(...areas.map(([, h]) => h));
                    return (
                      <li key={area} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 text-[13px] text-white">{area}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                          <span
                            className="block h-full rounded-full bg-white"
                            style={{ width: `${max > 0 ? (hours / max) * 100 : 0}%` }}
                          />
                        </span>
                        <span className="w-12 shrink-0 text-right text-[13px] font-semibold tabular-nums text-white">
                          {fmtH(hours)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-2 text-[13px] font-semibold text-white">Waiting for your approval</h3>
            {loading ? (
              <p className="text-[13px] text-white">Loading…</p>
            ) : days.length === 0 ? (
              <p className="text-[13px] text-white">
                Nothing waiting. Every recorded day is approved.
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10] rounded-2xl border border-white/[0.12]">
                {days.map((d) => (
                  <li
                    key={d.day}
                    className="flex flex-col gap-2 px-3.5 py-3 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[14px] font-semibold text-white">
                          {fmtDay(d.day)}
                        </span>
                        <span className="text-[13px] font-semibold tabular-nums text-white">
                          {fmtMins(d.minutes)}
                        </span>
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-white">
                        {d.activities
                          .slice(0, 4)
                          .map((a) => `${a.activity} · ${fmtMins(a.minutes)}`)
                          .join('  ·  ')}
                        {d.activities.length > 4 ? `  ·  ${d.activities.length - 4} more` : ''}
                      </span>
                    </span>
                    <span className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:gap-1.5">
                      <button
                        type="button"
                        onClick={() => setLeaveOut(d)}
                        disabled={busy !== null}
                        className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-semibold text-white hover:bg-white/[0.06] active:bg-white/[0.08] disabled:opacity-60"
                      >
                        Leave out
                      </button>
                      <button
                        type="button"
                        onClick={() => approve(d.day, d.time_entry_ids)}
                        disabled={busy !== null}
                        className="h-11 touch-manipulation rounded-xl border border-white/[0.14] px-3 text-[13px] font-semibold text-white hover:border-elec-yellow active:bg-white/[0.06] disabled:opacity-60"
                      >
                        {busy === d.day ? '…' : 'Approve'}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </FormSheet>
    </>
  );
}
