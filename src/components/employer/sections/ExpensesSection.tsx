import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, startOfMonth } from 'date-fns';
import { RefreshCw, Download, Plus } from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreateExpenseSheet } from '@/components/employer/expense/CreateExpenseSheet';
import { ExpenseDetailSheet } from '@/components/employer/expense/ExpenseDetailSheet';
import { ExpenseFilterSheet } from '@/components/employer/expense/ExpenseFilterSheet';
import { PayRunSheet } from '@/components/employer/expense/PayRunSheet';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import { MileageRateSheet } from '@/components/employer/expense/MileageRateSheet';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useFirmPaySettings, useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import {
  useExpenses,
  exportExpensesToCSV,
  type ExpenseFilters,
  type ExpenseStatus,
} from '@/hooks/useExpenses';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import type { ExpenseClaim } from '@/services/financeService';
import { toast } from 'sonner';
import { expensePayLabel, expensePayState, isInPayroll, shortPayday } from '@/utils/expensePayroll';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  TextAction,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';

interface ExpensesSectionProps {
  mode?: 'admin' | 'employee';
  currentEmployeeId?: string;
}

const getInitials = (name?: string) => {
  if (!name) return '··';
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const statusToTone = (status: string): Tone => {
  switch (status) {
    case 'Pending':
      return 'orange';
    case 'Approved':
      return 'emerald';
    case 'Rejected':
      return 'red';
    case 'Paid':
      return 'cyan';
    default:
      return 'amber';
  }
};

const formatCurrency = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EXPENSES_HELP: PageHelpContent = {
  id: 'employer-expenses',
  title: 'Expenses',
  what: (
    <>
      Receipts and mileage your team claims back. You approve them, then pay them in a pay run.
    </>
  ),
  steps: [
    {
      title: 'The team claims',
      body: 'Workers photograph a receipt or log mileage on their phone. It lands here waiting for you.',
    },
    {
      title: 'Approve or reject',
      body: 'Open a claim to see the receipt and the job it is for. Reject with a reason so they know what to fix.',
    },
    {
      title: 'Pay them back',
      body: 'Send them with payroll from Accounting and they are marked paid on payday by themselves. Or pay them yourself: Export the list, pay them, then mark them all paid in one go.',
    },
  ],
  notes: [
    {
      title: 'In payroll',
      body: 'A claim sent with a payroll run shows In payroll and the payday. On payday it is marked Paid with that date, and the worker gets one message with their total. You do not need to mark it paid.',
    },
    {
      title: 'Mileage rate',
      body: 'Mileage pays at the rate shown above the list. Change it there if your firm pays a different rate.',
    },
  ],
  tasks: [
    {
      title: 'Approve a claim',
      steps: [
        'Tap the To approve tab.',
        'Tap the claim. Check the amount, the linked job and tap View receipt if there is one.',
        'Tap Approve. It moves to To pay and counts as a cost on the job.',
      ],
      tour: [
        { target: 'expenses.tabs', text: 'To approve', caption: 'Tap To approve to see the claims waiting for you.', opens: true },
        { target: 'expenses.list', caption: 'Tap a claim to open it.', opens: true },
        { target: 'expenses.approve', caption: 'Check the receipt and job, then tap Approve.' },
      ],
    },
    {
      title: 'Send a claim back',
      steps: [
        'Open the claim from To approve.',
        'Tap Reject.',
        'Type the reason, for example the receipt is missing, then tap Reject expense.',
      ],
      after: 'The claim moves to Rejected and the worker sees your reason on it in Worker Tools.',
      tour: [
        { target: 'expenses.tabs', text: 'To approve', caption: 'Tap To approve.', opens: true },
        { target: 'expenses.list', caption: 'Tap the claim that needs fixing.', opens: true },
        { target: 'expenses.reject', caption: 'Tap Reject, then type the reason so they know what to fix.' },
      ],
    },
    {
      title: 'Pay everyone in one run',
      steps: [
        'When claims are approved, a green bar shows the total waiting. Tap Pay.',
        'Everyone approved is ticked. Untick a person or a claim to leave it for next time.',
        'Set Paid on to the day the money left, for example payroll day.',
        'Tap Export for a CSV your payroll or bank can use, then tap Mark … paid.',
      ],
      after: 'The claims move to Paid with that date, and Paid this month goes up.',
      tour: [
        { target: 'expenses.pay', caption: 'Tap Pay to pay every approved claim in one go.', opens: true },
        { target: 'expenses.payrun-date', caption: 'Set the day the money left.' },
        { target: 'expenses.payrun-mark', caption: 'Tap Export for a payroll CSV, then Mark paid when the money has gone.' },
      ],
    },
    {
      title: 'Pay one claim',
      steps: ['Tap the To pay tab and open the claim.', 'Tap Mark as paid. It is marked paid today.'],
      tour: [
        { target: 'expenses.tabs', text: 'To pay', caption: 'Tap To pay.', opens: true },
        { target: 'expenses.list', caption: 'Tap the claim you have paid.', opens: true },
        { target: 'expenses.mark-paid', caption: 'Tap Mark as paid.' },
      ],
    },
    {
      title: 'Set the mileage rate',
      steps: [
        'Tap the Mileage claims pay at line above the list, then Change.',
        'Pick HMRC approved rate (45p a mile, 25p after 10,000 miles) or Our own rate and type the pence per mile.',
        'Tap Save. New mileage claims use it.',
      ],
      who: 'Owner and admins. Everyone else sees the rate but cannot change it.',
      tour: [{ target: 'expenses.mileage-rate', caption: 'Tap here to change the rate mileage is paid at.', optional: true }],
    },
    {
      title: 'Add a claim for someone',
      steps: [
        'Tap Add expense.',
        'Basic info: pick the Employee, then the Amount and Description. Tap Continue.',
        'Add the category and job, then a receipt photo or PDF. Tap Continue each time.',
        'Check it on Review & submit and tap Submit expense. It lands in To approve.',
      ],
      tour: [{ target: 'expenses.add', caption: 'Tap Add expense to log a claim for someone.' }],
    },
  ],
};

export function ExpensesSection({ mode, currentEmployeeId }: ExpensesSectionProps) {
  const isEmployeeMode = useMemo(() => {
    if (mode === 'admin') return false;
    if (mode === 'employee') return true;
    // ELE-1948: this section is only mounted inside the Employer Hub, where the
    // viewer is the firm (owner or co-admin). profile.role describes the
    // person's trade, not their place in the firm: most owners are
    // 'electrician', so the old role check put 5 of 6 real employers into
    // "My expenses" with approve/reject/pay/export hidden. Workers submit
    // from Worker Tools → Expenses, never from here.
    return false;
  }, [mode]);

  // employer_expense_claims.employee_id FKs to employer_employees.id, NOT
  // profiles.id — resolve the caller's employee record for employee mode.
  const { data: myEmployeeRecord } = useMyEmployeeRecord();
  const employeeIdForFilter =
    currentEmployeeId || (isEmployeeMode ? myEmployeeRecord?.id : undefined);
  const isMobile = useIsMobile();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<ExpenseClaim | null>(null);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [showPayRun, setShowPayRun] = useState(false);
  // ELE-2001: the firm's mileage rate (owner/admin set it; everyone sees it).
  const [showMileageRate, setShowMileageRate] = useState(false);
  const { data: roleInfo } = useEmployerRole();
  const canSetRates = roleInfo?.role === 'owner' || roleInfo?.role === 'admin';
  const { data: officeFirmId } = useOfficeFirmId();
  const { data: firmPay } = useFirmPaySettings(isEmployeeMode ? null : officeFirmId);
  const mileageRateText =
    firmPay?.mileage_rate_pence != null
      ? `${firmPay.mileage_rate_pence}p a mile (your own rate)`
      : 'HMRC approved rate: 45p a mile, 25p after 10,000 miles';

  const mergedFilters = useMemo(
    () => ({
      ...filters,
      ...(employeeIdForFilter ? { employeeId: employeeIdForFilter } : {}),
    }),
    [filters, employeeIdForFilter]
  );

  const {
    expenses,
    allExpenses,
    isLoading,
    stats,
    refetch,
    approve: handleApprove,
    reject: handleReject,
    markPaid: handleMarkPaid,
    create: handleCreate,
    delete: handleDelete,
    bulkMarkPaid,
    isBulkMarkingPaid,
    isApproving,
    isCreating,
  } = useExpenses(mergedFilters);

  const { data: jobsData = [] } = useJobs();
  const jobs = useMemo(
    () => jobsData.map((j) => ({ id: j.id, title: j.title || j.client || 'Untitled Job' })),
    [jobsData]
  );

  // Employee dropdown comes from the roster, not from existing claims —
  // deriving it from claims meant the first-ever expense could never be
  // created (empty dropdown) and unclaimed employees never appeared.
  const { data: rosterEmployees = [] } = useEmployees();
  const employees = useMemo(
    () => rosterEmployees.map((e) => ({ id: e.id, name: e.name })),
    [rosterEmployees]
  );

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setFilters((prev) => ({ ...prev, status: undefined, category: undefined }));
    } else if (tab === 'mileage') {
      setFilters((prev) => ({ ...prev, status: undefined, category: 'Mileage' }));
    } else {
      const statusMap: Record<string, ExpenseStatus> = {
        pending: 'Pending',
        approved: 'Approved',
        paid: 'Paid',
        rejected: 'Rejected',
      };
      setFilters((prev) => ({
        ...prev,
        status: statusMap[tab],
        category: undefined,
      }));
    }
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      expense.description?.toLowerCase().includes(q) ||
      expense.employees?.name?.toLowerCase().includes(q) ||
      expense.category?.toLowerCase().includes(q)
    );
  });

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.submitted_date).getTime() - new Date(a.submitted_date).getTime()
  );

  // Pay run works on every approved claim, whatever tab is showing. Claims
  // already in a payroll run are paid on payday, so they are left out.
  const approvedClaims = useMemo(
    () =>
      (allExpenses ?? []).filter(
        (e) =>
          e.status === 'Approved' &&
          !isInPayroll(e) &&
          (!employeeIdForFilter || e.employee_id === employeeIdForFilter)
      ),
    [allExpenses, employeeIdForFilter]
  );
  // In payroll, waiting for payday: count and the next payday (no £ here).
  const inPayroll = useMemo(() => {
    const list = (allExpenses ?? []).filter(
      (e) => isInPayroll(e) && (!employeeIdForFilter || e.employee_id === employeeIdForFilter)
    );
    const next = list
      .map((e) => e.payroll_payday as string)
      .sort()[0];
    return { count: list.length, next: next ?? null };
  }, [allExpenses, employeeIdForFilter]);
  const approvedTotal = approvedClaims.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  // Local date, not toISOString(): in BST midnight on the 1st is 23:00 UTC
  // on the last day of the previous month.
  const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  const paidThisMonth = (allExpenses ?? [])
    .filter((e) => e.status === 'Paid' && (e.paid_date ?? '') >= monthStart)
    .reduce((s, e) => s + (Number(e.amount) || 0), 0);

  const handleView = useCallback((expense: ExpenseClaim) => {
    setSelectedExpense(expense);
    setShowDetailSheet(true);
  }, []);

  // Deep link from the bell / push: ?section=expenses&expense=<id> opens that
  // claim once the list has loaded, then drops the param.
  const [searchParams, setSearchParams] = useSearchParams();
  const expenseParam = searchParams.get('expense');
  useEffect(() => {
    if (!expenseParam || isLoading) return;
    const hit = (allExpenses ?? expenses).find((e) => e.id === expenseParam);
    if (hit) handleView(hit);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('expense');
        return next;
      },
      { replace: true }
    );
  }, [expenseParam, isLoading, allExpenses, expenses, handleView, setSearchParams]);

  const handleCreateSubmit = useCallback(
    (data: any) => {
      handleCreate(data);
      setShowCreateSheet(false);
    },
    [handleCreate]
  );

  const handleRejectWithReason = useCallback(
    (id: string, reason?: string) => {
      handleReject({ id, reason: reason || 'Rejected' });
    },
    [handleReject]
  );

  const handleExport = useCallback(async () => {
    try {
      await exportExpensesToCSV(sortedExpenses);
      toast.success('Expenses exported to CSV');
    } catch (error) {
      toast.error('Failed to export expenses');
    }
  }, [sortedExpenses]);

  const handleExportRun = useCallback(async (claims: ExpenseClaim[]) => {
    try {
      await exportExpensesToCSV(
        claims,
        `expenses-pay-run-${format(new Date(), 'yyyy-MM-dd')}.csv`
      );
      toast.success('Pay run exported');
    } catch {
      toast.error('Failed to export');
    }
  }, []);

  const activeFilterCount = [
    filters.status,
    filters.category,
    filters.employeeId,
    filters.hasReceipt !== undefined,
    filters.dateFrom,
  ].filter(Boolean).length;

  const sectionTitle = isEmployeeMode ? 'My expenses' : 'Expenses';
  const sectionDescription = isEmployeeMode
    ? 'Submit and track your expense claims with photo receipt capture.'
    : 'Team expenses and mileage with photo receipts.';
  const addButtonLabel = isEmployeeMode ? 'Submit expense' : 'Add expense';

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title={sectionTitle}
          description={sectionDescription}
          tone="orange"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title={sectionTitle}
        description={sectionDescription}
        tone="orange"
        actions={
          <>
            {!isEmployeeMode && sortedExpenses.length > 0 && (
              <IconButton onClick={handleExport} aria-label="Export to CSV">
                <Download className="h-4 w-4" />
              </IconButton>
            )}
            <PrimaryButton data-help="expenses.add" onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              {addButtonLabel}
            </PrimaryButton>
            {!isEmployeeMode && (
              <PageHelpButton help={EXPENSES_HELP} askContext={{ page: 'expenses', tab: activeTab }} />
            )}
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      {!isEmployeeMode && (
        <HowItWorks help={EXPENSES_HELP} askContext={{ page: 'expenses', tab: activeTab }} />
      )}

      <StatStrip
        columns={4}
        stats={[
          { label: 'To approve', value: stats?.pending?.count ?? 0, tone: 'orange' },
          { label: 'To pay', value: formatCurrency(stats?.approved?.total ?? 0), tone: 'emerald' },
          { label: 'Paid this month', value: formatCurrency(paidThisMonth), tone: 'cyan' },
          { label: 'Rejected', value: stats?.rejected?.count ?? 0, tone: 'red' },
        ]}
      />

      <PullToRefresh onRefresh={refetch} disabled={!isMobile}>
        <div className="space-y-6">
          <div data-help="expenses.tabs">
          <FilterBar
            tabs={[
              { value: 'all', label: 'All' },
              {
                value: 'pending',
                label: stats?.pending?.count ? `To approve · ${stats.pending.count}` : 'To approve',
              },
              {
                value: 'approved',
                label: stats?.approved?.count ? `To pay · ${stats.approved.count}` : 'To pay',
              },
              { value: 'paid', label: 'Paid' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'mileage', label: 'Mileage' },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search expenses…"
            actions={
              <button
                onClick={() => setShowFilterSheet(true)}
                className="relative h-11 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12.5px] font-medium text-white touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            }
          />
          </div>

          {!isEmployeeMode && (activeTab === 'mileage' || canSetRates) && (
            <button
              type="button"
              data-help="expenses.mileage-rate"
              onClick={() => canSetRates && setShowMileageRate(true)}
              disabled={!canSetRates}
              className="-mx-4 sm:mx-0 flex min-h-[52px] w-[calc(100%+2rem)] sm:w-full items-center gap-3 border-y sm:border sm:rounded-2xl border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-left touch-manipulation"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] text-white">Mileage claims pay at</span>
                <span className="block truncate text-[13.5px] font-semibold text-white">
                  {mileageRateText}
                </span>
              </span>
              {canSetRates && (
                <span className="text-[12.5px] font-semibold text-elec-yellow">Change</span>
              )}
            </button>
          )}

          {!isEmployeeMode && approvedClaims.length > 0 && (
            <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-white">
                  {formatCurrency(approvedTotal)} approved, waiting to be paid
                </p>
                <p className="text-[12px] text-white">
                  {approvedClaims.length} claim{approvedClaims.length === 1 ? '' : 's'} ·{' '}
                  {(() => {
                    const n = new Set(approvedClaims.map((e) => e.employee_id)).size;
                    return `${n} ${n === 1 ? 'person' : 'people'}`;
                  })()}
                </p>
              </div>
              <PrimaryButton data-help="expenses.pay" onClick={() => setShowPayRun(true)}>
                Pay
              </PrimaryButton>
            </div>
          )}

          {!isEmployeeMode && inPayroll.count > 0 && inPayroll.next && (
            <div
              data-help="expenses.in-payroll"
              className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-sky-500/30 bg-sky-500/10 px-4 py-3"
            >
              <p className="text-[14px] font-semibold text-white">
                {inPayroll.count} claim{inPayroll.count === 1 ? '' : 's'} in payroll, paid on{' '}
                {shortPayday(inPayroll.next)}
              </p>
              <p className="text-[12px] text-white">
                Sent with a payroll run. They are marked paid on payday by themselves.
              </p>
            </div>
          )}

          {sortedExpenses.length === 0 ? (
            <EmptyState
              title="No expenses found"
              description={
                searchQuery || activeFilterCount > 0
                  ? 'Try adjusting your search or filters.'
                  : isEmployeeMode
                    ? 'Submit your first expense claim to see it here.'
                    : 'No expense claims have been submitted yet.'
              }
              action={searchQuery || activeFilterCount > 0 ? 'Clear filters' : addButtonLabel}
              onAction={() => {
                if (searchQuery || activeFilterCount > 0) {
                  setSearchQuery('');
                  setFilters({});
                  setActiveTab('all');
                } else {
                  setShowCreateSheet(true);
                }
              }}
            />
          ) : (
            <div data-help="expenses.list">
            <ListCard>
              <ListCardHeader
                tone="orange"
                title="Expenses"
                meta={<Pill tone="orange">{sortedExpenses.length}</Pill>}
                action={!isEmployeeMode && sortedExpenses.length > 0 ? 'Export CSV' : undefined}
                onAction={!isEmployeeMode ? handleExport : undefined}
              />
              <ListBody>
                {sortedExpenses.map((expense) => {
                  const submitterName = expense.employees?.name ?? 'Unknown';
                  const amountNum = Number(expense.amount) || 0;
                  const status = expense.status ?? 'Pending';
                  const pay = expensePayState(expense);
                  const tone = pay?.kind === 'in_payroll' ? 'blue' : statusToTone(status);
                  const statusLabel = expensePayLabel(expense) ?? status;
                  return (
                    <ListRow
                      key={expense.id}
                      lead={<Avatar initials={getInitials(submitterName)} />}
                      title={expense.description || 'Untitled expense'}
                      subtitle={`${submitterName} · ${expense.category} · ${formatCurrency(amountNum)}`}
                      trailing={
                        <>
                          {expense.receipt_url && <Pill tone="cyan">Receipt</Pill>}
                          <Pill tone={tone}>{statusLabel}</Pill>
                        </>
                      }
                      onClick={() => handleView(expense)}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
            </div>
          )}

          {!isEmployeeMode && (filters.status || filters.category) && (
            <div className="flex justify-center">
              <TextAction
                onClick={() => {
                  setFilters({});
                  setActiveTab('all');
                }}
              >
                Clear all filters
              </TextAction>
            </div>
          )}
        </div>
      </PullToRefresh>

      <ExpenseFilterSheet
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        filters={filters}
        onFiltersChange={setFilters}
        employees={isEmployeeMode ? [] : employees}
      />

      <CreateExpenseSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
        onSubmit={handleCreateSubmit}
        employees={employees}
        jobs={jobs}
        isSubmitting={isCreating}
        employeeMode={isEmployeeMode}
        currentEmployeeId={employeeIdForFilter}
      />

      {!isEmployeeMode && (
        <PayRunSheet
          open={showPayRun}
          onOpenChange={setShowPayRun}
          approved={approvedClaims}
          onConfirm={(ids, paidDate) => bulkMarkPaid({ ids, paidDate })}
          onExport={handleExportRun}
          busy={isBulkMarkingPaid}
        />
      )}

      {canSetRates && !isEmployeeMode && (
        <MileageRateSheet open={showMileageRate} onOpenChange={setShowMileageRate} />
      )}

      <ExpenseDetailSheet
        expense={selectedExpense}
        open={showDetailSheet}
        onOpenChange={setShowDetailSheet}
        onApprove={isEmployeeMode ? undefined : handleApprove}
        onReject={isEmployeeMode ? undefined : handleRejectWithReason}
        onMarkPaid={isEmployeeMode ? undefined : handleMarkPaid}
        onDelete={isEmployeeMode ? undefined : handleDelete}
      />
    </PageFrame>
  );
}

export default ExpensesSection;
