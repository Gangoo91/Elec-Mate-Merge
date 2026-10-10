import { useState, useCallback, useMemo, useEffect } from 'react';
import { OfficeReceiptsPanel } from '@/components/receipts/ReceiptsPanel';
import { useSearchParams } from 'react-router-dom';
import { format, startOfMonth } from 'date-fns';
import { Download } from 'lucide-react';
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
import { PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  FilterRow,
  Segments,
  SearchField,
  HeroActions,
  HeroPrimary,
  ToolButton,
  Rows,
  Row,
  StatusPill,
  PlainEmpty,
  panel,
  PanelTitle,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';

interface ExpensesSectionProps {
  mode?: 'admin' | 'employee';
  currentEmployeeId?: string;
}

const statusToTone = (status: string): PillTone => {
  switch (status) {
    case 'Approved':
    case 'Paid':
      return 'green';
    case 'Rejected':
      return 'red';
    default:
      return 'neutral';
  }
};

const formatCurrency = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EXPENSES_HELP: PageHelpContent = {
  id: 'employer-expenses',
  title: 'Expenses',
  what: (
    <>Receipts and mileage your team claims back. You approve them, then pay them in a pay run.</>
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
      body: 'Mileage pays at the rate shown in the Mileage rate panel. Change it there if your firm pays a different rate.',
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
        {
          target: 'expenses.tabs',
          text: 'To approve',
          caption: 'Tap To approve to see the claims waiting for you.',
          opens: true,
        },
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
        {
          target: 'expenses.reject',
          caption: 'Tap Reject, then type the reason so they know what to fix.',
        },
      ],
    },
    {
      title: 'Pay everyone in one run',
      steps: [
        'When claims are approved, the Pay back panel shows the total waiting. Tap Pay.',
        'Everyone approved is ticked. Untick a person or a claim to leave it for next time.',
        'Set Paid on to the day the money left, for example payroll day.',
        'Tap Export for a CSV your payroll or bank can use, then tap Mark … paid.',
      ],
      after: 'The claims move to Paid with that date, and Paid this month goes up.',
      tour: [
        {
          target: 'expenses.pay',
          caption: 'Tap Pay to pay every approved claim in one go.',
          opens: true,
        },
        { target: 'expenses.payrun-date', caption: 'Set the day the money left.' },
        {
          target: 'expenses.payrun-mark',
          caption: 'Tap Export for a payroll CSV, then Mark paid when the money has gone.',
        },
      ],
    },
    {
      title: 'Pay one claim',
      steps: [
        'Tap the To pay tab and open the claim.',
        'Tap Mark as paid. It is marked paid today.',
      ],
      tour: [
        { target: 'expenses.tabs', text: 'To pay', caption: 'Tap To pay.', opens: true },
        { target: 'expenses.list', caption: 'Tap the claim you have paid.', opens: true },
        { target: 'expenses.mark-paid', caption: 'Tap Mark as paid.' },
      ],
    },
    {
      title: 'Set the mileage rate',
      steps: [
        'Tap the rate in the Mileage rate panel, then Change.',
        'Pick HMRC approved rate (45p a mile, 25p after 10,000 miles) or Our own rate and type the pence per mile.',
        'Tap Save. New mileage claims use it.',
      ],
      who: 'Owner and admins. Everyone else sees the rate but cannot change it.',
      tour: [
        {
          target: 'expenses.mileage-rate',
          caption: 'Tap here to change the rate mileage is paid at.',
          optional: true,
        },
      ],
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
    const next = list.map((e) => e.payroll_payday as string).sort()[0];
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
      await exportExpensesToCSV(claims, `expenses-pay-run-${format(new Date(), 'yyyy-MM-dd')}.csv`);
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

  const pendingCount = stats?.pending?.count ?? 0;
  const statusLine = isEmployeeMode
    ? sectionDescription
    : [
        pendingCount > 0
          ? `${pendingCount} claim${pendingCount === 1 ? '' : 's'} to approve`
          : 'Nothing to approve',
        approvedClaims.length > 0 ? `${formatCurrency(approvedTotal)} approved to pay back` : null,
      ]
        .filter(Boolean)
        .join(', ') + '.';

  if (isLoading) {
    return (
      <PageColumn>
        <PageHero title={sectionTitle} description={sectionDescription} />
        <LoadingBlocks />
      </PageColumn>
    );
  }

  const tabOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'To approve', count: stats?.pending?.count || undefined },
    { value: 'approved', label: 'To pay', count: stats?.approved?.count || undefined },
    { value: 'paid', label: 'Paid' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'mileage', label: 'Mileage' },
  ];

  const filtersButton = (
    <button
      type="button"
      onClick={() => setShowFilterSheet(true)}
      className="relative inline-flex h-11 shrink-0 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-[14px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.08]"
    >
      Filters
      {activeFilterCount > 0 && (
        <span className="ml-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[11px] font-semibold tabular-nums text-black">
          {activeFilterCount}
        </span>
      )}
    </button>
  );

  const listPanel = (
    <section>
      <PanelTitle
        title="Claims"
        meta={`${sortedExpenses.length}`}
        action={!isEmployeeMode && sortedExpenses.length > 0 ? 'Export CSV' : undefined}
        onAction={!isEmployeeMode ? handleExport : undefined}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {sortedExpenses.length === 0 ? (
          <PlainEmpty
            bare
            text={
              searchQuery || activeFilterCount > 0
                ? 'No claims match that. Try a different search or filter.'
                : isEmployeeMode
                  ? 'Your expense claims will show here.'
                  : 'Claims your team submit from Worker Tools will show here.'
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
            <Rows>
              {sortedExpenses.map((expense) => {
                const submitterName = expense.employees?.name ?? 'Unknown';
                const amountNum = Number(expense.amount) || 0;
                const status = expense.status ?? 'Pending';
                const pay = expensePayState(expense);
                const tone = pay?.kind === 'in_payroll' ? 'neutral' : statusToTone(status);
                const statusLabel = expensePayLabel(expense) ?? status;
                return (
                  <Row
                    chevron={false}
                    key={expense.id}
                    title={expense.description || 'Untitled expense'}
                    detail={[
                      submitterName,
                      expense.category,
                      expense.receipt_url ? 'Receipt' : 'No receipt',
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    amount={formatCurrency(amountNum)}
                    status={<StatusPill tone={tone}>{statusLabel}</StatusPill>}
                    onClick={() => handleView(expense)}
                  />
                );
              })}
            </Rows>
          </div>
        )}
      </div>
      {!isEmployeeMode && (filters.status || filters.category) && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setFilters({});
              setActiveTab('all');
            }}
            className="h-11 px-4 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );

  const sidePanels = !isEmployeeMode && (
    <>
      {/* ELE-2071: receipts and supplier bills by photo, checked before they post */}
      <OfficeReceiptsPanel />
      <section>
        <PanelTitle title="Pay back" />
        <div className={cn(panel, 'overflow-hidden')}>
          <Rows>
            {approvedClaims.length > 0 ? (
              <Row
                title={`${formatCurrency(approvedTotal)} approved`}
                detail={`${approvedClaims.length} claim${approvedClaims.length === 1 ? '' : 's'} · ${(() => {
                  const n = new Set(approvedClaims.map((e) => e.employee_id)).size;
                  return `${n} ${n === 1 ? 'person' : 'people'}`;
                })()}`}
                action={
                  <button
                    type="button"
                    data-help="expenses.pay"
                    onClick={() => setShowPayRun(true)}
                    className="inline-flex h-11 items-center rounded-full bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation hover:bg-elec-yellow/90"
                  >
                    Pay
                  </button>
                }
              />
            ) : (
              <PlainEmpty bare text="Nothing approved and waiting to be paid." />
            )}
            {inPayroll.count > 0 && inPayroll.next && (
              <div data-help="expenses.in-payroll">
                <Row
                  title={`${inPayroll.count} claim${inPayroll.count === 1 ? '' : 's'} in payroll`}
                  detail={`Paid on ${shortPayday(inPayroll.next)}, marked paid by themselves`}
                />
              </div>
            )}
          </Rows>
        </div>
      </section>

      {(activeTab === 'mileage' || canSetRates) && (
        <section>
          <PanelTitle title="Mileage rate" />
          <div className={cn(panel, 'overflow-hidden')}>
            <button
              type="button"
              data-help="expenses.mileage-rate"
              onClick={() => canSetRates && setShowMileageRate(true)}
              disabled={!canSetRates}
              className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation transition-colors enabled:hover:bg-white/[0.04] sm:px-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">
                  {mileageRateText}
                </span>
                <span className="mt-0.5 block text-[13px] text-white">
                  Mileage claims pay at this rate
                </span>
              </span>
              {canSetRates && (
                <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Change</span>
              )}
            </button>
          </div>
        </section>
      )}
    </>
  );

  return (
    <PageColumn>
      <PageHero
        title={sectionTitle}
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary data-help="expenses.add" onClick={() => setShowCreateSheet(true)}>
              {addButtonLabel}
            </HeroPrimary>
            {!isEmployeeMode && sortedExpenses.length > 0 && (
              <ToolButton onClick={handleExport} label="Export to CSV">
                <Download className="h-4 w-4" />
              </ToolButton>
            )}
            {!isEmployeeMode && (
              <PageHelpButton
                help={EXPENSES_HELP}
                askContext={{ page: 'expenses', tab: activeTab }}
              />
            )}
          </HeroActions>
        }
      />

      {!isEmployeeMode && (
        <HowItWorks help={EXPENSES_HELP} askContext={{ page: 'expenses', tab: activeTab }} />
      )}

      <FigureStrip
        figures={[
          {
            label: 'To approve',
            value: pendingCount,
            sub: pendingCount > 0 ? formatCurrency(stats?.pending?.total ?? 0) : 'All caught up',
            tone: pendingCount > 0 ? 'volt' : undefined,
            onOpen: () => handleTabChange('pending'),
          },
          {
            label: 'To pay',
            value: formatCurrency(stats?.approved?.total ?? 0),
            sub: 'Approved, not paid',
            onOpen: () => handleTabChange('approved'),
          },
          {
            label: 'Paid this month',
            value: formatCurrency(paidThisMonth),
            sub: 'Reimbursed',
            onOpen: () => handleTabChange('paid'),
          },
          {
            label: 'Rejected',
            value: stats?.rejected?.count ?? 0,
            sub: 'Sent back',
            onOpen: () => handleTabChange('rejected'),
          },
        ]}
      />

      <PullToRefresh
        onRefresh={async () => {
          await refetch();
        }}
        disabled={!isMobile}
      >
        <div className="space-y-6 sm:space-y-8">
          <FilterRow>
            <div data-help="expenses.tabs" className="min-w-0">
              {/* Six filters: one row that scrolls sideways on a phone, not a 3×2 grid. */}
              <Segments
                items={tabOptions}
                value={activeTab}
                onChange={handleTabChange}
                className="flex w-auto overflow-x-auto overscroll-x-contain rounded-full [scrollbar-width:none] max-sm:-mr-4 max-sm:rounded-r-none max-sm:border-r-0 [&::-webkit-scrollbar]:hidden [&>button]:shrink-0 [&>button]:px-3.5"
              />
            </div>
            <div className="flex items-center gap-2">
              <SearchField
                className="w-full lg:w-72"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search expenses"
              />
              {filtersButton}
            </div>
          </FilterRow>

          <TwoColumn main={listPanel} side={sidePanels || undefined} />
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
    </PageColumn>
  );
}

export default ExpensesSection;
