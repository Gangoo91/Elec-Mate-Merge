import { useState, useCallback, useMemo } from 'react';
import { format, startOfMonth } from 'date-fns';
import { RefreshCw, Download, Plus } from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreateExpenseSheet } from '@/components/employer/expense/CreateExpenseSheet';
import { ExpenseDetailSheet } from '@/components/employer/expense/ExpenseDetailSheet';
import { ExpenseFilterSheet } from '@/components/employer/expense/ExpenseFilterSheet';
import { PayRunSheet } from '@/components/employer/expense/PayRunSheet';
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

  // Pay run works on every approved claim, whatever tab is showing.
  const approvedClaims = useMemo(
    () =>
      (allExpenses ?? []).filter(
        (e) =>
          e.status === 'Approved' && (!employeeIdForFilter || e.employee_id === employeeIdForFilter)
      ),
    [allExpenses, employeeIdForFilter]
  );
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
            <PrimaryButton onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              {addButtonLabel}
            </PrimaryButton>
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

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
                className="relative h-11 px-4 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-[12.5px] font-medium text-white touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
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
              <PrimaryButton onClick={() => setShowPayRun(true)}>Pay</PrimaryButton>
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
                  const tone = statusToTone(status);
                  return (
                    <ListRow
                      key={expense.id}
                      lead={<Avatar initials={getInitials(submitterName)} />}
                      title={expense.description || 'Untitled expense'}
                      subtitle={`${submitterName} · ${expense.category} · ${formatCurrency(amountNum)}`}
                      trailing={
                        <>
                          {expense.receipt_url && <Pill tone="cyan">Receipt</Pill>}
                          <Pill tone={tone}>{status}</Pill>
                        </>
                      }
                      onClick={() => handleView(expense)}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
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
