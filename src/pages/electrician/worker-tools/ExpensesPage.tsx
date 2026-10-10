/**
 * ExpensesPage — Worker Tools → Expenses (ELE-2001).
 *
 * Mileage at the firm's rate (HMRC approved rate when the firm hasn't set its
 * own), receipts from the camera or a file (PDF too), your own receipt again
 * through a signed link, and change / withdraw while a claim is still waiting.
 *
 * Data: useMyExpenses (useExpenses.ts) — the SAME rows and status words as the
 * office Expenses page and My pay. Every write the worker can't do through RLS
 * goes through an own-row, Pending-only server function.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import { Plus, Receipt, Route } from 'lucide-react';
import { useMyJobs } from '@/hooks/useWorkerSelfService';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useMyExpenses, type WorkerExpenseClaim } from '@/hooks/useExpenses';
import { useFirmPaySettings, HMRC_MILEAGE } from '@/hooks/useFirmPaySettings';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  ActionTile,
  GroupLabel,
  SolidBadge,
  Verdict,
  WorkerPanel,
} from '@/components/worker-tools/WorkerUi';
import { FilterBar, LoadingBlocks, PrimaryButton, StatStrip } from '@/components/employer/editorial';
import {
  ExpenseClaimSheet,
  type ClaimKind,
} from '@/components/worker-tools/expenses/ExpenseClaimSheet';
import { ExpenseClaimDetailSheet } from '@/components/worker-tools/expenses/ExpenseClaimDetailSheet';
import {
  categoryLabel,
  gbp,
  isMileage,
  pence,
  shortDate,
  statusKey,
  STATUS_LABEL,
} from '@/components/worker-tools/expenses/expenseShared';
import { toast } from 'sonner';
import { WT_EXPENSES_HELP } from '@/components/worker-tools/help/worker-help-2';
import { ReceiptsPanel } from '@/components/receipts/ReceiptsPanel';
import { expensePayState, shortPayday } from '@/utils/expensePayroll';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Waiting' },
  { value: 'approved', label: 'Approved' },
  { value: 'paid', label: 'Paid' },
  { value: 'rejected', label: 'Rejected' },
];

/** Start of the UK tax year (6 April) containing `d`. */
function taxYearStart(d: Date): string {
  const y = d.getMonth() > 3 || (d.getMonth() === 3 && d.getDate() >= 6) ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}-04-06`;
}

export default function ExpensesPage() {
  const { data: employee } = useMyEmployeeRecord();
  const employeeId = employee?.id;
  const firmId = (employee as { employer_id?: string | null } | null | undefined)?.employer_id ?? null;

  const { data: jobs = [], isLoading: jobsLoading } = useMyJobs('active');
  const {
    expenses,
    isLoading,
    isError,
    refetch,
    submitClaim,
    submitMileage,
    updateClaim,
    withdrawClaim,
    isSubmitting,
    isUpdating,
    isWithdrawing,
  } = useMyExpenses(employeeId);
  const { data: settings } = useFirmPaySettings(firmId);
  const firmRate = settings?.mileage_rate_pence ?? null;

  // Live: an office decision (approve / reject / pay) lands without a reload.
  useRealtimeInvalidate(
    'worker-expenses',
    [{ table: 'employer_expense_claims', filter: `employee_id=eq.${employeeId}` }],
    [['my_expense_claims', employeeId]],
    Boolean(employeeId)
  );

  const [filter, setFilter] = useState('all');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetKind, setSheetKind] = useState<ClaimKind>('mileage');
  const [editing, setEditing] = useState<WorkerExpenseClaim | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [snapOpen, setSnapOpen] = useState(false);
  // Gap #3 / #21: from a job page (?job=<id>&new=mileage), the claim opens
  // with that job already picked, so it isn't picked again.
  const [params, setParams] = useSearchParams();
  const [presetJobId, setPresetJobId] = useState<string | null>(null);
  useEffect(() => {
    const job = params.get('job');
    const kind = params.get('new');
    if (!job && !kind) return;
    setPresetJobId(job);
    setEditing(null);
    if (kind === 'receipt') {
      setSnapOpen(true);
    } else {
      setSheetKind('mileage');
      setSheetOpen(true);
    }
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('job');
        next.delete('new');
        return next;
      },
      { replace: true }
    );
  }, [params, setParams]);
  // Derived, so an office decision arriving live updates the open sheet too.
  const viewing = useMemo(
    () => (viewingId ? (expenses.find((e) => e.id === viewingId) ?? null) : null),
    [viewingId, expenses]
  );

  const jobTitles = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  const sorted = useMemo(
    () =>
      [...expenses].sort((a, b) =>
        (b.created_at || b.submitted_date || '').localeCompare(a.created_at || a.submitted_date || '')
      ),
    [expenses]
  );

  const summary = useMemo(() => {
    let waiting = 0;
    let waitingN = 0;
    let owed = 0;
    let owedN = 0;
    let paid = 0;
    let taxYearMiles = 0;
    let nextPayday: string | null = null;
    const ty = taxYearStart(new Date());
    const counts: Record<string, number> = {};
    for (const e of expenses) {
      const s = statusKey(e.status);
      const amt = Number(e.amount) || 0;
      counts[s] = (counts[s] ?? 0) + 1;
      if (s === 'pending') {
        waiting += amt;
        waitingN += 1;
      } else if (s === 'approved') {
        owed += amt;
        owedN += 1;
        const pay = expensePayState(e);
        if (pay?.kind === 'in_payroll' && (!nextPayday || pay.payday < nextPayday)) nextPayday = pay.payday;
      } else if (s === 'paid') {
        paid += amt;
      }
      if (e.mileage_miles != null && s !== 'rejected' && (e.incurred_on || e.submitted_date || '') >= ty) {
        taxYearMiles += Number(e.mileage_miles) || 0;
      }
    }
    return { waiting, waitingN, owed, owedN, paid, counts, taxYearMiles, nextPayday };
  }, [expenses]);

  const shown = filter === 'all' ? sorted : sorted.filter((e) => statusKey(e.status) === filter);

  const openNew = (kind: ClaimKind) => {
    setEditing(null);
    setPresetJobId(null);
    setSheetKind(kind);
    setSheetOpen(true);
  };

  const verdict =
    summary.owed > 0
      ? {
          headline: `${gbp(summary.owed)} approved, coming back to you`,
          detail:
            summary.waitingN > 0
              ? `${gbp(summary.waiting)} more is waiting for the office to approve.`
              : summary.nextPayday
                ? `In payroll. Paid with your pay on ${shortPayday(summary.nextPayday)}.`
                : 'Paid with your wages or when the office pays expenses.',
        }
      : summary.waitingN > 0
        ? {
            headline: `${gbp(summary.waiting)} waiting for approval`,
            detail: `${summary.waitingN} claim${summary.waitingN === 1 ? '' : 's'} with the office. You can still change ${summary.waitingN === 1 ? 'it' : 'them'}.`,
          }
        : {
            headline: expenses.length ? 'Nothing waiting' : 'Spent your own money on the job?',
            detail: expenses.length
              ? 'Every claim has been dealt with.'
              : 'Log mileage or snap a receipt and the office pays you back.',
          };

  const rateCard = (
    <WorkerPanel>
      <GroupLabel>Mileage rate</GroupLabel>
      <div className="space-y-2 px-4 pb-4 sm:px-5">
        {firmRate != null ? (
          <p className="text-[14px] leading-snug text-white">
            Your firm pays <span className="font-semibold">{pence(firmRate)} a mile</span>.
          </p>
        ) : (
          <p className="text-[14px] leading-snug text-white">
            <span className="font-semibold">HMRC approved rate</span>: {HMRC_MILEAGE.firstPence}p a
            mile for your first {HMRC_MILEAGE.thresholdMiles.toLocaleString('en-GB')} business miles
            in the tax year, then {HMRC_MILEAGE.afterPence}p.
          </p>
        )}
        <p className="text-[13px] text-white">
          You&rsquo;ve claimed{' '}
          <span className="font-semibold tabular-nums">
            {summary.taxYearMiles.toLocaleString('en-GB', { maximumFractionDigits: 1 })} miles
          </span>{' '}
          since 6 April.
        </p>
      </div>
    </WorkerPanel>
  );

  const list = (
    <WorkerPanel>
      <GroupLabel>Your claims</GroupLabel>
      <div className="px-4 pb-3 sm:px-5" data-help="wt-expenses.filters">
        <FilterBar
          tabs={FILTERS.map((f) => ({
            value: f.value,
            label: f.label,
            count: f.value === 'all' ? expenses.length : (summary.counts[f.value] ?? 0),
          }))}
          activeTab={filter}
          onTabChange={setFilter}
        />
      </div>
      {shown.length === 0 ? (
        <p className="px-4 pb-5 text-[14px] text-white sm:px-5">
          {expenses.length === 0 ? 'No claims yet.' : 'No claims with that status.'}
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]" data-help="wt-expenses.list">
          {shown.map((e) => {
            const s = statusKey(e.status);
            const mileage = isMileage(e);
            const detail = mileage
              ? `${Number(e.mileage_miles ?? 0).toLocaleString('en-GB')} mi · ${e.mileage_to || e.description}`
              : e.description && e.description.toLowerCase() !== (e.category || '').toLowerCase()
                ? e.description
                : categoryLabel(e.category);
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setViewingId(e.id)}
                  className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation active:bg-white/[0.04] sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[16px] font-semibold tabular-nums text-white">
                        {gbp(Number(e.amount))}
                      </span>
                      <span className="truncate text-[13px] font-medium text-white">
                        {categoryLabel(e.category)}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-white">
                      {shortDate(e.incurred_on || e.submitted_date)} · {detail}
                    </span>
                    {s === 'rejected' && e.rejection_reason && (
                      <span className="mt-0.5 block text-[12.5px] text-red-300">
                        {e.rejection_reason}
                      </span>
                    )}
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1">
                    <SolidBadge
                      tone={
                        s === 'rejected' ? 'red' : s === 'paid' || s === 'approved' ? 'green' : 'neutral'
                      }
                    >
                      {(() => {
                        const pay = expensePayState(e);
                        return pay?.kind === 'in_payroll'
                          ? `Paid on ${shortPayday(pay.payday)}`
                          : (STATUS_LABEL[s] ?? e.status);
                      })()}
                    </SolidBadge>
                    {expensePayState(e)?.kind === 'in_payroll' && (
                      <span className="text-[11px] text-white">In payroll</span>
                    )}
                    {e.receipt_url && <span className="text-[11px] text-white">Receipt</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </WorkerPanel>
  );

  return (
    <WorkerToolPage
      eyebrow="Claims"
      title="Expenses"
      description="Mileage and receipts. The office approves them and pays you back."
      help={WT_EXPENSES_HELP}
      actions={
        <span className="hidden sm:inline-flex">
          <PrimaryButton onClick={() => openNew('mileage')}>
            <Plus className="mr-1.5 h-4 w-4" />
            New claim
          </PrimaryButton>
        </span>
      }
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : isError ? (
        <WorkerPanel className="p-4">
          <p className="text-[14px] text-white">Your claims didn&rsquo;t load.</p>
          <PrimaryButton className="mt-3" onClick={() => refetch()}>
            Try again
          </PrimaryButton>
        </WorkerPanel>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          <Verdict headline={verdict.headline} detail={verdict.detail} />

          <div className="grid grid-cols-2 gap-2.5 sm:max-w-xl">
            <div data-help="wt-expenses.mileage" className="grid">
              <ActionTile
                icon={Route}
                label="Log mileage"
                hint={firmRate != null ? `${pence(firmRate)} a mile` : 'HMRC approved rate'}
                onClick={() => openNew('mileage')}
              />
            </div>
            <div data-help="wt-expenses.receipt" className="grid">
              <ActionTile
                icon={Receipt}
                label="Claim a receipt"
                hint="Photo or PDF"
                onClick={() => {
                  setPresetJobId(null);
                  setSnapOpen(true);
                }}
              />
            </div>
          </div>

          {/* ELE-2071: snap a receipt or bill, read for you, checked before it posts.
              One entry: the "Claim a receipt" tile above opens its snap sheet. */}
          <ReceiptsPanel
            firmId={firmId}
            mode="worker"
            jobs={jobs.map((j) => ({ id: j.id, title: j.title }))}
            showSnap={false}
            snapOpen={snapOpen}
            onSnapOpenChange={(o) => {
              setSnapOpen(o);
              if (!o) setPresetJobId(null);
            }}
            snapJobId={presetJobId}
          />

          {expenses.length > 0 && (
            <StatStrip
              columns={3}
              className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x"
              stats={[
                {
                  label: 'Waiting',
                  value: gbp(summary.waiting),
                  sub: `${summary.waitingN} with the office`,
                  tone: summary.waitingN ? 'amber' : undefined,
                },
                {
                  label: 'Coming back to you',
                  value: gbp(summary.owed),
                  sub: `${summary.owedN} approved`,
                  tone: summary.owed ? 'emerald' : undefined,
                },
                { label: 'Paid back', value: gbp(summary.paid), sub: 'All your paid claims' },
              ]}
            />
          )}

          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-8">
            {list}
            {rateCard}
          </div>
        </div>
      )}

      <ExpenseClaimSheet
        open={sheetOpen}
        onOpenChange={(o) => {
          setSheetOpen(o);
          if (!o) setEditing(null);
        }}
        initialJobId={presetJobId}
        employeeId={employeeId}
        firmRatePence={firmRate}
        jobs={jobs}
        jobsLoading={jobsLoading}
        claim={editing}
        initialKind={sheetKind}
        busy={isSubmitting || isUpdating}
        onSubmitPlain={async (input) => {
          if (editing) {
            await updateClaim({ claim: editing, plain: input });
            toast.success('Claim updated');
          } else {
            const r = await submitClaim(input);
            if (r && 'queued' in r) queuedToast('Claim saved');
            else toast.success('Claim sent', { description: 'The office will approve it or ask you about it.' });
          }
        }}
        onSubmitMileage={async (input) => {
          if (editing) {
            await updateClaim({ claim: editing, mileage: input });
            toast.success('Mileage claim updated');
          } else {
            const r = await submitMileage(input);
            if (r && 'queued' in r) queuedToast('Mileage claim saved');
            else
              toast.success('Mileage claim sent', {
                description: 'The office will approve it or ask you about it.',
              });
          }
        }}
      />

      <ExpenseClaimDetailSheet
        claim={viewing}
        jobTitle={viewing?.job_id ? (jobTitles.get(viewing.job_id) ?? 'A job') : null}
        onOpenChange={(o) => {
          if (!o) setViewingId(null);
        }}
        withdrawing={isWithdrawing}
        onEdit={(c) => {
          setViewingId(null);
          setEditing(c);
          setSheetKind(isMileage(c) ? 'mileage' : 'receipt');
          setSheetOpen(true);
        }}
        onWithdraw={async (c) => {
          try {
            await withdrawClaim(c.id);
            toast.success('Claim withdrawn');
            setViewingId(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Could not withdraw the claim');
          }
        }}
      />
    </WorkerToolPage>
  );
}
