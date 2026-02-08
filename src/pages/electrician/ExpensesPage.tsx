import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, RefreshCw, Download, Search, X, CloudUpload, Check, Loader2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useExpensesStorage } from '@/hooks/useExpensesStorage';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import {
  ExpenseSummaryCard,
  ExpenseCard,
  ExpenseAddSheet,
  ExpenseEditSheet,
  ExpenseExportSheet,
} from '@/components/electrician/expenses';
import { EXPENSE_CATEGORIES, ExpenseCategory, CreateExpenseInput, Expense, UpdateExpenseInput } from '@/types/expense';
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
    unsyncedCount,
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

  const connectedProvider = useMemo(() => {
    const connected = integrations.find(
      i => i.status === 'connected' && (i.provider === 'xero' || i.provider === 'quickbooks')
    );
    return connected?.provider || null;
  }, [integrations]);

  const handleSyncSingleExpense = useCallback(async (expenseId: string) => {
    if (!connectedProvider) return;
    setSyncingExpenseId(expenseId);
    try {
      const success = await syncToAccounting([expenseId], connectedProvider);
      if (success) await refreshExpenses();
    } finally { setSyncingExpenseId(null); }
  }, [connectedProvider, syncToAccounting, refreshExpenses]);

  const handleSyncAll = useCallback(async () => {
    if (!connectedProvider) return;
    const unsyncedExpenses = expenses.filter(exp => !exp.synced_to_accounting);
    if (unsyncedExpenses.length === 0) return;
    setIsSyncing(true);
    try {
      const expenseIds = unsyncedExpenses.map(exp => exp.id);
      const success = await syncToAccounting(expenseIds, connectedProvider);
      if (success) await refreshExpenses();
    } finally { setIsSyncing(false); }
  }, [connectedProvider, expenses, syncToAccounting, refreshExpenses]);

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
    const expense = expenses.find(e => e.id === expenseId);
    if (expense) setExpenseToEdit(expense);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    const success = await deleteExpense(expenseId);
    if (success) toast({ title: 'Expense deleted', description: 'The expense has been removed successfully.' });
    setExpenseToDelete(null);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshExpenses();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshExpenses]);

  const handleCategoryFilter = (category: ExpenseCategory | 'all') => {
    setSelectedCategory(category);
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const filterOptions = useMemo(() => {
    const categoryCount: Record<string, number> = { all: expenses.length };
    expenses.forEach(exp => {
      categoryCount[exp.category] = (categoryCount[exp.category] || 0) + 1;
    });
    return [
      { id: 'all', label: 'All', count: categoryCount.all || 0 },
      ...EXPENSE_CATEGORIES
        .filter(cat => (categoryCount[cat.id] || 0) > 0)
        .map(cat => ({ id: cat.id, label: cat.label, count: categoryCount[cat.id] || 0 })),
    ];
  }, [expenses]);

  const canonical = `${window.location.origin}/electrician/expenses`;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background animate-fade-in">
      <Helmet>
        <title>Expenses | Sole Trader Expense Tracking for Electricians</title>
        <meta name="description" content="Track and manage your business expenses. Receipt scanning, mileage tracking, and export to accounting software for UK electricians." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        {showSearch ? (
          <div className="flex items-center h-14 px-4 gap-2">
            <div className="relative flex-1">
              {!searchQuery && <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />}
              <Input type="text" placeholder="Search vendors, descriptions..." value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={cn("h-11 pr-9 text-base touch-manipulation rounded-xl bg-white/[0.05] border-white/[0.06] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20", !searchQuery && "pl-9")}
                autoFocus />
              {searchQuery && (
                <button onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white/[0.1] hover:bg-white/[0.15] touch-manipulation">
                  <X className="h-3 w-3 text-white" />
                </button>
              )}
            </div>
            <button onClick={() => { setShowSearch(false); handleSearch(''); }}
              className="text-sm text-elec-yellow font-medium px-2 touch-manipulation">Cancel</button>
          </div>
        ) : (
          <>
            <div className="flex items-center h-14 px-4 gap-2">
              <button onClick={() => navigate('/electrician/business')}
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="flex-1 text-xl font-bold">Expenses</h1>
              <button onClick={() => setShowSearch(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation">
                <Search className="h-5 w-5 text-white/80" />
              </button>
              <button onClick={() => setShowAddSheet(true)}
                className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation">
                <Plus className="h-5 w-5 text-black" />
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 pb-3">
              <button onClick={() => setShowExportSheet(true)}
                className="flex items-center gap-2 text-elec-yellow active:opacity-70 touch-manipulation">
                <Download className="h-4 w-4" />
                <span className="text-[14px] font-medium">Export</span>
              </button>
              <div className="flex-1" />
              <button onClick={handleRefresh} disabled={isRefreshing}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50">
                <RefreshCw className={cn("h-4 w-4 text-white/60", isRefreshing && "animate-spin")} />
              </button>
            </div>
          </>
        )}

        {!showSearch && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filterOptions.map((option) => (
              <button key={option.id}
                onClick={() => handleCategoryFilter(option.id as ExpenseCategory | 'all')}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]",
                  selectedCategory === option.id ? "bg-elec-yellow text-black" : "bg-white/[0.08] text-white"
                )}>
                {option.label}
                {option.count > 0 && (
                  <span className={cn("text-[11px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-semibold",
                    selectedCategory === option.id ? "bg-black/20" : "bg-white/[0.15]")}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="px-4 py-4 space-y-4 pb-24">
        <ExpenseSummaryCard stats={stats} unsyncedCount={unsyncedCount} hasConnectedProvider={hasConnectedProvider} />

        {hasConnectedProvider && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <button onClick={handleSyncAll} disabled={isSyncing || unsyncedCount === 0}
              className={cn(
                "w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all touch-manipulation active:scale-[0.98]",
                unsyncedCount > 0 ? "bg-elec-yellow text-black" : "bg-green-500/15 text-green-400 border border-green-500/20"
              )}>
              {isSyncing ? (<><Loader2 className="h-4.5 w-4.5 animate-spin" />Syncing...</>)
                : unsyncedCount > 0 ? (<><CloudUpload className="h-4.5 w-4.5" />Sync All ({unsyncedCount})</>)
                : (<><Check className="h-4.5 w-4.5" />All Synced</>)}
            </button>
          </motion.div>
        )}

        <section className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {selectedCategory === 'all' ? 'All Expenses' : EXPENSE_CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </h2>
            <span className="text-sm text-muted-foreground">
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
                  <Search className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="font-medium">No expenses found</p>
                  <p className="text-sm text-muted-foreground mt-1">No expenses match &quot;{searchQuery}&quot;</p>
                  <Button variant="outline" onClick={() => handleSearch('')} className="mt-4">Clear search</Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-10 text-center">
                  <Receipt className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="font-medium">No expenses yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Add your first expense to start tracking</p>
                  <Button onClick={() => setShowAddSheet(true)} className="mt-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
                    <Plus className="h-4 w-4 mr-2" />Add Expense
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
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.label}</span>
                      <span className="text-xs text-muted-foreground">£{group.total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                      {group.expenses.map((expense, index) => (
                        <ExpenseCard key={expense.id} expense={expense}
                          onDelete={() => setExpenseToDelete(expense.id)}
                          onEdit={() => handleExpenseClick(expense.id)}
                          onClick={() => handleExpenseClick(expense.id)}
                          onSync={() => handleSyncSingleExpense(expense.id)}
                          isSyncing={syncingExpenseId === expense.id}
                          showSyncButton={hasConnectedProvider}
                          delay={index * 0.03} />
                      ))}
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>

      <ExpenseAddSheet open={showAddSheet} onOpenChange={setShowAddSheet} onSave={handleCreateExpense} />

      <ExpenseExportSheet open={showExportSheet} onOpenChange={setShowExportSheet}
        onExport={downloadExport} stats={stats} expenseCount={filteredExpenses.length} />

      {expenseToEdit && (
        <ExpenseEditSheet expense={expenseToEdit} open={!!expenseToEdit}
          onOpenChange={(open) => !open && setExpenseToEdit(null)}
          onSave={handleUpdateExpense}
          onDelete={(id) => { setExpenseToEdit(null); setExpenseToDelete(id); }} />
      )}

      <ConfirmationDialog open={!!expenseToDelete}
        onOpenChange={(open) => !open && setExpenseToDelete(null)}
        onConfirm={() => expenseToDelete && handleDeleteExpense(expenseToDelete)}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete" cancelText="Cancel" />
    </div>
  );
};

export default ExpensesPage;
