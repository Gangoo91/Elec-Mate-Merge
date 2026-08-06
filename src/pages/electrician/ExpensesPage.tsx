import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  Download,
  Search,
  X,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn } from '@/components/shared/surfaceStyles';
import { useExpensesStorage } from '@/hooks/useExpensesStorage';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import { useExpenseSyncRecords } from '@/hooks/useExpenseSyncRecords';
import {
  ExpenseSummaryCard,
  ExpenseCard,
  ExpenseAddSheet,
  ExpenseEditSheet,
  ExpenseExportSheet,
} from '@/components/electrician/expenses';
import {
  EXPENSE_CATEGORIES,
  ExpenseCategory,
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput,
  taxYearStart,
} from '@/types/expense';
import { AccountingProvider } from '@/types/accounting';

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showExportSheet, setShowExportSheet] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'all'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncingExpenseId, setSyncingExpenseId] = useState<string | null>(null);

  const {
    expenses,
    filteredExpenses,
    dateGroupedExpenses,
    stats,
    loading,
    filters,
    setFilters,
    createExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses,
    downloadExport,
    syncExpenses,
  } = useExpensesStorage();

  const {
    integrations,
    hasConnectedProvider,
    syncExpenses: syncToAccounting,
  } = useAccountingIntegrations();

  /**
   * Sync outcomes, read from the records the sync itself writes.
   *
   * Success is taken from a 'synced' record OR the row flag — either is proof.
   * Failures matter just as much: every attempt on record so far has been
   * rejected by the provider over account codes, and the reason only ever
   * appeared in a toast that disappeared. Now it stays on the expense.
   */
  const { data: syncState, refetch: refetchSyncRecords } = useExpenseSyncRecords(
    hasConnectedProvider
  );
  const isSynced = useCallback(
    (expense: Expense) => !!expense.synced_to_accounting || !!syncState?.synced.has(expense.id),
    [syncState]
  );

  const connectedProvider = useMemo(() => {
    const connected = integrations.find(
      (i) => i.status === 'connected' && (i.provider === 'xero' || i.provider === 'quickbooks')
    );
    return connected?.provider || null;
  }, [integrations]);

  const handleSyncSingleExpense = useCallback(
    async (expenseId: string) => {
      if (!connectedProvider) return;
      setSyncingExpenseId(expenseId);
      try {
        const success = await syncToAccounting([expenseId], connectedProvider);
        if (success) {
          await Promise.all([refreshExpenses(), refetchSyncRecords()]);
        }
      } finally {
        setSyncingExpenseId(null);
      }
    },
    [connectedProvider, syncToAccounting, refreshExpenses, refetchSyncRecords]
  );

  const handleSyncAll = useCallback(async () => {
    if (!connectedProvider) return;
    const unsyncedExpenses = expenses.filter((exp) => !isSynced(exp));
    if (unsyncedExpenses.length === 0) return;
    setIsSyncing(true);
    try {
      const expenseIds = unsyncedExpenses.map((exp) => exp.id);
      const success = await syncToAccounting(expenseIds, connectedProvider);
      if (success) {
        await Promise.all([refreshExpenses(), refetchSyncRecords()]);
      }
    } finally {
      setIsSyncing(false);
    }
  }, [connectedProvider, expenses, isSynced, syncToAccounting, refreshExpenses, refetchSyncRecords]);

  const handleCreateExpense = async (data: CreateExpenseInput) => {
    const result = await createExpense(data);
    if (result) setShowAddSheet(false);
  };

  const handleUpdateExpense = async (data: UpdateExpenseInput): Promise<boolean> => {
    const success = await updateExpense(data);
    if (success) {
      setExpenseToEdit(null);
      toast({ title: 'Expense updated', description: 'Your changes have been saved.' });
    }
    return success;
  };

  const handleExpenseClick = (expenseId: string) => {
    const expense = expenses.find((e) => e.id === expenseId);
    if (expense) setExpenseToEdit(expense);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    const success = await deleteExpense(expenseId);
    if (success)
      toast({
        title: 'Expense deleted',
        description: 'The expense has been removed successfully.',
      });
    setExpenseToDelete(null);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshExpenses();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshExpenses]);

  const handleCategoryFilter = (category: ExpenseCategory | 'all') => {
    setSelectedCategory(category);
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const filterOptions = useMemo(() => {
    const categoryCount: Record<string, number> = { all: expenses.length };
    expenses.forEach((exp) => {
      categoryCount[exp.category] = (categoryCount[exp.category] || 0) + 1;
    });
    return [
      { id: 'all', label: 'All', count: categoryCount.all || 0 },
      ...EXPENSE_CATEGORIES.filter((cat) => (categoryCount[cat.id] || 0) > 0).map((cat) => ({
        id: cat.id,
        label: cat.label,
        count: categoryCount[cat.id] || 0,
      })),
    ];
  }, [expenses]);

  /**
   * Business miles already claimed since 6 April. Feeds the mileage form so a
   * journey crossing 10,000 miles is costed at HMRC's two rates rather than
   * flat 45p — the form stated that rule and then ignored it.
   */
  const milesClaimedThisTaxYear = useMemo(() => {
    const from = taxYearStart();
    return expenses.reduce((sum, exp) => {
      if (exp.category !== 'mileage' || !exp.mileage_miles) return sum;
      return new Date(exp.date) >= from ? sum + exp.mileage_miles : sum;
    }, 0);
  }, [expenses]);

  const trueUnsyncedCount = useMemo(
    () => (hasConnectedProvider ? expenses.filter((exp) => !isSynced(exp)).length : 0),
    [expenses, isSynced, hasConnectedProvider]
  );

  const canonical = `${window.location.origin}/electrician/expenses`;

  return (
    <div className="-mt-3 min-h-screen bg-background sm:-mt-4 md:-mt-6">
      <Helmet>
        <title>Expenses | Sole Trader Expense Tracking for Electricians</title>
        <meta
          name="description"
          content="Track and manage your business expenses. Receipt scanning, mileage tracking, and export to accounting software for UK electricians."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="sticky top-0 z-40 border-b border-white/[0.10] bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] lg:px-8">
        {showSearch ? (
          <div className="flex items-center h-14 px-4 gap-2">
            <div className="relative flex-1">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              )}
              <Input
                type="text"
                placeholder="Search vendors, descriptions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={cn(
                  'h-11 pr-9 text-base touch-manipulation rounded-xl bg-white/[0.05] border-white/[0.06] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20',
                  !searchQuery && 'pl-9'
                )}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white/[0.1] hover:bg-white/[0.15] touch-manipulation"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                handleSearch('');
              }}
              className="text-sm text-elec-yellow font-medium px-2 touch-manipulation"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center h-14 px-4 gap-2">
              <button
                onClick={() => navigate('/electrician/business')}
                aria-label="Go back"
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white">
                Expenses
              </h1>
              <button
                onClick={() => setShowSearch(true)}
                aria-label="Search expenses"
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setShowAddSheet(true)}
                aria-label="Add expense"
                className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation"
              >
                <Plus className="h-5 w-5 text-black" />
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 pb-3">
              <button
                onClick={() => setShowExportSheet(true)}
                className="flex items-center gap-2 text-elec-yellow active:opacity-70 touch-manipulation"
              >
                <Download className="h-4 w-4" />
                <span className="text-[14px] font-medium">Export</span>
              </button>
              <div className="flex-1" />
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                aria-label="Refresh expenses"
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
              >
                <RefreshCw
                  className={cn('h-4 w-4 text-white', isRefreshing && 'animate-spin')}
                />
              </button>
            </div>
          </>
        )}

        {!showSearch && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleCategoryFilter(option.id as ExpenseCategory | 'all')}
                className={cn(
                  chipBase,
                  'flex shrink-0 items-center gap-1.5',
                  selectedCategory === option.id ? chipOn : chipOff
                )}
              >
                {option.label}
                {option.count > 0 && (
                  <span
                    className={cn(
                      'min-w-[18px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums',
                      selectedCategory === option.id ? 'bg-black/20' : 'bg-white/[0.15]'
                    )}
                  >
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] space-y-4 px-4 py-4 pb-24 lg:px-8">
        <ExpenseSummaryCard
          stats={stats}
          unsyncedCount={trueUnsyncedCount}
          hasConnectedProvider={hasConnectedProvider}
          onShowUnsynced={handleSyncAll}
          isSyncing={isSyncing}
        />

        <section className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {selectedCategory === 'all'
                ? 'All Expenses'
                : EXPENSE_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <span className="text-sm text-white">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : dateGroupedExpenses.length === 0 ? (
            searchQuery.trim() ? (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-10 text-center">
                  <Search className="h-10 w-10 mx-auto text-white mb-3" />
                  <p className="font-medium">No expenses found</p>
                  <p className="text-sm text-white mt-1">
                    No expenses match &quot;{searchQuery}&quot;
                  </p>
                  <Button variant="outline" onClick={() => handleSearch('')} className="mt-4">
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-10 text-center">
                  <Receipt className="h-10 w-10 mx-auto text-white mb-3" />
                  <p className="font-medium">No expenses yet</p>
                  <p className="text-sm text-white mt-1">
                    Add your first expense to start tracking
                  </p>
                  <Button
                    onClick={() => setShowAddSheet(true)}
                    className="mt-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {dateGroupedExpenses.map((group) => (
                  <div key={group.date}>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        {group.label}
                      </span>
                      <span className="text-[12px] font-semibold text-white tabular-nums">
                        £{group.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 xl:grid-cols-3">
                      {group.expenses.map((expense, index) => (
                        <ExpenseCard
                          key={expense.id}
                          expense={expense}
                          onDelete={() => setExpenseToDelete(expense.id)}
                          onEdit={() => handleExpenseClick(expense.id)}
                          onClick={() => handleExpenseClick(expense.id)}
                          onSync={() => handleSyncSingleExpense(expense.id)}
                          isSyncing={syncingExpenseId === expense.id}
                          showSyncButton={hasConnectedProvider}
                          isSynced={isSynced(expense)}
                          syncUrl={syncState?.synced.get(expense.id)?.externalUrl ?? null}
                          syncError={syncState?.failed.get(expense.id)?.errorMessage ?? null}
                          delay={index * 0.03}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>

      <ExpenseAddSheet
        open={showAddSheet}
        onOpenChange={setShowAddSheet}
        onSave={handleCreateExpense}
        milesClaimedThisTaxYear={milesClaimedThisTaxYear}
      />

      <ExpenseExportSheet
        open={showExportSheet}
        onOpenChange={setShowExportSheet}
        onExport={downloadExport}
        stats={stats}
        expenseCount={filteredExpenses.length}
      />

      {expenseToEdit && (
        <ExpenseEditSheet
          expense={expenseToEdit}
          open={!!expenseToEdit}
          onOpenChange={(open) => !open && setExpenseToEdit(null)}
          onSave={handleUpdateExpense}
          onDelete={(id) => {
            setExpenseToEdit(null);
            setExpenseToDelete(id);
          }}
        />
      )}

      <ConfirmationDialog
        open={!!expenseToDelete}
        onOpenChange={(open) => !open && setExpenseToDelete(null)}
        onConfirm={() => expenseToDelete && handleDeleteExpense(expenseToDelete)}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ExpensesPage;
