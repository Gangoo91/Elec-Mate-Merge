import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Expense,
  ExpenseCategory,
  CreateExpenseInput,
  UpdateExpenseInput,
  ExpenseStats,
  ExpenseGroup,
  DateGroup,
  ExpenseFilters,
  EXPENSE_CATEGORIES,
  getCategoryConfig,
} from '@/types/expense';
import { AccountingProvider } from '@/types/accounting';

export const useExpensesStorage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ExpenseFilters>({
    category: 'all',
    period: 'all',  // Show all expenses by default
  });

  // Convert database row to Expense object
  const convertDbRowToExpense = useCallback((row: any): Expense => ({
    id: row.id,
    user_id: row.user_id,
    category: row.category as ExpenseCategory,
    amount: parseFloat(row.amount),
    date: row.date,
    vendor: row.vendor,
    description: row.description,
    receipt_url: row.receipt_url,
    mileage_miles: row.mileage_miles ? parseFloat(row.mileage_miles) : null,
    mileage_rate: parseFloat(row.mileage_rate || '0.45'),
    mileage_from: row.mileage_from,
    mileage_to: row.mileage_to,
    tax_deductible: row.tax_deductible,
    vat_amount: row.vat_amount ? parseFloat(row.vat_amount) : null,
    ai_extracted: row.ai_extracted,
    synced_to_accounting: row.synced_to_accounting,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }), []);

  // Load expenses from Supabase on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user authenticated');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('sole_trader_expenses')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (error) {
          console.error('Error loading expenses:', error);
          return;
        }

        const expenseList = data?.map(convertDbRowToExpense) || [];
        setExpenses(expenseList);
        console.log('Expenses loaded from Supabase:', expenseList.length);
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();

    // Set up real-time subscription
    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const channel = supabase
        .channel('expense-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'sole_trader_expenses',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Expense change detected:', payload);
            refreshExpenses();
          }
        )
        .subscribe();

      return channel;
    };

    let channel: any = null;
    setupRealtimeSubscription().then(ch => { channel = ch; });

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [convertDbRowToExpense]);

  // Refresh expenses from database
  const refreshExpenses = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('sole_trader_expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error refreshing expenses:', error);
        return;
      }

      const expenseList = data?.map(convertDbRowToExpense) || [];
      setExpenses(expenseList);
      console.log('Expenses refreshed:', expenseList.length);
    } catch (error) {
      console.error('Error refreshing expenses:', error);
    }
  }, [convertDbRowToExpense]);

  // Create a new expense
  const createExpense = useCallback(async (input: CreateExpenseInput): Promise<Expense | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add expenses",
          variant: "destructive",
        });
        return null;
      }

      const expenseData = {
        user_id: user.id,
        category: input.category,
        amount: input.amount,
        date: input.date,
        vendor: input.vendor || null,
        description: input.description || null,
        receipt_url: input.receipt_url || null,
        mileage_miles: input.mileage_miles || null,
        mileage_rate: input.mileage_rate || 0.45,
        mileage_from: input.mileage_from || null,
        mileage_to: input.mileage_to || null,
        tax_deductible: input.tax_deductible ?? true,
        vat_amount: input.vat_amount || null,
        ai_extracted: input.ai_extracted || false,
      };

      const { data, error } = await supabase
        .from('sole_trader_expenses')
        .insert(expenseData)
        .select()
        .single();

      if (error) {
        console.error('Error creating expense:', error);
        toast({
          title: "Error",
          description: "Failed to add expense",
          variant: "destructive",
        });
        return null;
      }

      const newExpense = convertDbRowToExpense(data);
      setExpenses(prev => [newExpense, ...prev]);

      toast({
        title: "Expense Added",
        description: `${getCategoryConfig(input.category).label} - £${input.amount.toFixed(2)}`,
      });

      return newExpense;
    } catch (error) {
      console.error('Error creating expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
      return null;
    }
  }, [convertDbRowToExpense]);

  // Update an existing expense
  const updateExpense = useCallback(async (input: UpdateExpenseInput): Promise<boolean> => {
    try {
      const { id, ...updates } = input;

      const { error } = await supabase
        .from('sole_trader_expenses')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating expense:', error);
        toast({
          title: "Error",
          description: "Failed to update expense",
          variant: "destructive",
        });
        return false;
      }

      // Update local state
      setExpenses(prev => prev.map(exp =>
        exp.id === id ? { ...exp, ...updates, updated_at: new Date().toISOString() } : exp
      ));

      toast({
        title: "Expense Updated",
        description: "Changes saved successfully",
      });

      return true;
    } catch (error) {
      console.error('Error updating expense:', error);
      return false;
    }
  }, []);

  // Delete an expense
  const deleteExpense = useCallback(async (expenseId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('sole_trader_expenses')
        .delete()
        .eq('id', expenseId);

      if (error) {
        console.error('Error deleting expense:', error);
        toast({
          title: "Error",
          description: "Failed to delete expense",
          variant: "destructive",
        });
        return false;
      }

      // Update local state
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId));

      toast({
        title: "Expense Deleted",
        description: "Expense removed successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      return false;
    }
  }, []);

  // Get date range for period filter
  const getDateRangeForPeriod = useCallback((period: ExpenseFilters['period']) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (period) {
      case 'this-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return null;
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  }, []);

  // Filter expenses based on current filters
  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(exp => exp.category === filters.category);
    }

    // Period filter
    if (filters.period !== 'all') {
      const dateRange = getDateRangeForPeriod(filters.period);
      if (dateRange) {
        filtered = filtered.filter(exp =>
          exp.date >= dateRange.startDate && exp.date <= dateRange.endDate
        );
      }
    }

    // Custom date range
    if (filters.startDate) {
      filtered = filtered.filter(exp => exp.date >= filters.startDate!);
    }
    if (filters.endDate) {
      filtered = filtered.filter(exp => exp.date <= filters.endDate!);
    }

    // Search query
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(exp =>
        exp.vendor?.toLowerCase().includes(query) ||
        exp.description?.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [expenses, filters, getDateRangeForPeriod]);

  // Group expenses by category
  const groupedExpenses = useMemo((): ExpenseGroup[] => {
    const groups: Record<ExpenseCategory, Expense[]> = {} as Record<ExpenseCategory, Expense[]>;

    // Initialize all categories
    EXPENSE_CATEGORIES.forEach(cat => {
      groups[cat.id] = [];
    });

    // Group filtered expenses
    filteredExpenses.forEach(exp => {
      if (groups[exp.category]) {
        groups[exp.category].push(exp);
      }
    });

    // Convert to array and filter out empty groups
    return EXPENSE_CATEGORIES
      .map(config => ({
        category: config.id,
        config,
        expenses: groups[config.id],
        total: groups[config.id].reduce((sum, exp) => sum + exp.amount, 0),
        count: groups[config.id].length,
      }))
      .filter(group => group.count > 0)
      .sort((a, b) => b.total - a.total);
  }, [filteredExpenses]);

  // Count unsynced expenses
  const unsyncedCount = useMemo(() => {
    return expenses.filter(exp => !exp.synced_to_accounting).length;
  }, [expenses]);

  // Group filtered expenses by date (chronological)
  const dateGroupedExpenses = useMemo((): DateGroup[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
    const groupMap = new Map<string, { label: string; sortKey: string; expenses: Expense[] }>();
    const sorted = [...filteredExpenses].sort((a, b) => b.date.localeCompare(a.date));
    sorted.forEach(exp => {
      const dateStr = exp.date;
      let label: string;
      if (dateStr === todayStr) { label = 'Today'; }
      else if (dateStr === yesterdayStr) { label = 'Yesterday'; }
      else if (dateStr >= sevenDaysAgoStr) { label = dayNames[new Date(dateStr + 'T00:00:00').getDay()]; }
      else { label = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }); }
      const groupKey = dateStr >= sevenDaysAgoStr ? dateStr : dateStr.slice(0, 7);
      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, { label, sortKey: dateStr, expenses: [] });
      }
      groupMap.get(groupKey)!.expenses.push(exp);
    });
    return Array.from(groupMap.entries())
      .sort(([, a], [, b]) => b.sortKey.localeCompare(a.sortKey))
      .map(([key, group]) => ({
        label: group.label,
        date: key,
        expenses: group.expenses,
        total: group.expenses.reduce((sum, exp) => sum + exp.amount, 0),
        count: group.expenses.length,
      }));
  }, [filteredExpenses]);

  // Calculate expense statistics
  const stats = useMemo((): ExpenseStats => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];

    const monthlyExpenses = expenses.filter(exp => exp.date >= startOfMonth);
    const yearlyExpenses = expenses.filter(exp => exp.date >= startOfYear);

    const byCategory = {} as Record<ExpenseCategory, number>;
    EXPENSE_CATEGORIES.forEach(cat => {
      byCategory[cat.id] = expenses
        .filter(exp => exp.category === cat.id)
        .reduce((sum, exp) => sum + exp.amount, 0);
    });

    return {
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      totalTaxDeductible: expenses
        .filter(exp => exp.tax_deductible)
        .reduce((sum, exp) => sum + exp.amount, 0),
      monthlyAmount: monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      yearToDateAmount: yearlyExpenses.reduce((sum, exp) => sum + exp.amount, 0),
      byCategory,
      count: expenses.length,
    };
  }, [expenses]);

  // Export expenses for accounting software
  const exportExpenses = useCallback((
    format: 'xero' | 'sage' | 'quickbooks' | 'csv',
    expensesToExport?: Expense[]
  ): string => {
    const dataToExport = expensesToExport || filteredExpenses;

    const formatDate = (dateStr: string, ukFormat = false) => {
      const date = new Date(dateStr);
      if (ukFormat) {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      }
      return dateStr;
    };

    switch (format) {
      case 'xero':
        // Xero CSV format
        const xeroHeaders = ['Date', 'Description', 'Amount', 'Tax Code', 'Category'];
        const xeroRows = dataToExport.map(exp => [
          formatDate(exp.date),
          exp.vendor || exp.description || getCategoryConfig(exp.category).label,
          exp.amount.toFixed(2),
          exp.vat_amount ? 'T1' : 'T0',
          getCategoryConfig(exp.category).label,
        ]);
        return [xeroHeaders, ...xeroRows].map(row => row.join(',')).join('\n');

      case 'sage':
        // Sage CSV format (UK date format)
        const sageHeaders = ['Date', 'Reference', 'Description', 'Net Amount', 'VAT Amount', 'Gross Amount'];
        const sageRows = dataToExport.map(exp => [
          formatDate(exp.date, true),
          exp.id.slice(0, 8).toUpperCase(),
          exp.vendor || exp.description || getCategoryConfig(exp.category).label,
          (exp.amount - (exp.vat_amount || 0)).toFixed(2),
          (exp.vat_amount || 0).toFixed(2),
          exp.amount.toFixed(2),
        ]);
        return [sageHeaders, ...sageRows].map(row => row.join(',')).join('\n');

      case 'quickbooks':
        // QuickBooks CSV format
        const qbHeaders = ['Date', 'Vendor', 'Category', 'Amount', 'Description', 'Tax Deductible'];
        const qbRows = dataToExport.map(exp => [
          formatDate(exp.date),
          exp.vendor || '',
          getCategoryConfig(exp.category).label,
          exp.amount.toFixed(2),
          exp.description || '',
          exp.tax_deductible ? 'Yes' : 'No',
        ]);
        return [qbHeaders, ...qbRows].map(row => row.join(',')).join('\n');

      default:
        // Generic CSV
        const csvHeaders = ['Date', 'Category', 'Vendor', 'Description', 'Amount', 'VAT', 'Tax Deductible', 'Receipt'];
        const csvRows = dataToExport.map(exp => [
          formatDate(exp.date),
          getCategoryConfig(exp.category).label,
          exp.vendor || '',
          exp.description || '',
          exp.amount.toFixed(2),
          (exp.vat_amount || 0).toFixed(2),
          exp.tax_deductible ? 'Yes' : 'No',
          exp.receipt_url ? 'Yes' : 'No',
        ]);
        return [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n');
    }
  }, [filteredExpenses]);

  // Download expenses as CSV file
  const downloadExport = useCallback((
    format: 'xero' | 'sage' | 'quickbooks' | 'csv',
    expensesToExport?: Expense[]
  ) => {
    const csvContent = exportExpenses(format, expensesToExport);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses-${format}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Expenses exported in ${format.toUpperCase()} format`,
    });
  }, [exportExpenses]);

  // Sync expenses to accounting software
  const syncExpenses = useCallback(async (
    expenseIds: string[],
    provider: AccountingProvider
  ): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to sync expenses",
          variant: "destructive",
        });
        return false;
      }

      // Validate expense IDs
      if (!expenseIds.length) {
        toast({
          title: "Error",
          description: "No expenses to sync",
          variant: "destructive",
        });
        return false;
      }

      console.log(`Syncing ${expenseIds.length} expenses to ${provider}`);

      const response = await supabase.functions.invoke('accounting-sync-expense', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { expenseIds, provider },
      });

      // Check for error in response data
      if (response.data?.success === false || response.data?.error) {
        const errorMsg = response.data?.error || 'Failed to sync expenses';
        console.error('Sync error:', response.data);
        toast({
          title: "Sync Failed",
          description: errorMsg,
          variant: "destructive",
        });
        return false;
      }

      if (response.error) {
        console.error('Sync error:', response.error);
        toast({
          title: "Sync Failed",
          description: response.error.message || 'Failed to sync expenses',
          variant: "destructive",
        });
        return false;
      }

      const { synced, errors } = response.data;
      const syncedCount = synced?.length || 0;
      const errorCount = errors?.length || 0;

      // Update local state to reflect synced expenses
      if (syncedCount > 0) {
        const syncedIds = synced.map((s: any) => s.expenseId);
        setExpenses(prev => prev.map(exp =>
          syncedIds.includes(exp.id) ? { ...exp, synced_to_accounting: true } : exp
        ));
      }

      if (errorCount > 0 && syncedCount > 0) {
        toast({
          title: "Partial Sync",
          description: `Synced ${syncedCount} expense(s), ${errorCount} failed`,
        });
      } else if (syncedCount > 0) {
        toast({
          title: "Sync Complete",
          description: `${syncedCount} expense(s) synced to ${provider}`,
        });
      }

      return syncedCount > 0;
    } catch (error) {
      console.error('Error syncing expenses:', error);
      toast({
        title: "Sync Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  }, []);

  return {
    expenses,
    filteredExpenses,
    groupedExpenses,
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
    exportExpenses,
    downloadExport,
    syncExpenses,
  };
};
