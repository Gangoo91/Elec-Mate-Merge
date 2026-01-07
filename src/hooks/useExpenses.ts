import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { ExpenseClaim } from '@/services/financeService';

// Category configuration
export const EXPENSE_CATEGORIES = [
  { id: 'Materials', icon: 'Wrench', color: 'blue', label: 'Materials' },
  { id: 'Travel', icon: 'Car', color: 'green', label: 'Travel' },
  { id: 'Parking', icon: 'ParkingCircle', color: 'purple', label: 'Parking' },
  { id: 'Tools', icon: 'Hammer', color: 'orange', label: 'Tools' },
  { id: 'PPE', icon: 'HardHat', color: 'red', label: 'PPE' },
  { id: 'Training', icon: 'GraduationCap', color: 'teal', label: 'Training' },
  { id: 'Meals', icon: 'UtensilsCrossed', color: 'pink', label: 'Meals' },
  { id: 'Other', icon: 'Package', color: 'gray', label: 'Other' },
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]['id'];
export type ExpenseStatus = 'Pending' | 'Approved' | 'Paid' | 'Rejected';

export interface ExpenseFilters {
  status?: ExpenseStatus | ExpenseStatus[];
  category?: ExpenseCategory | ExpenseCategory[];
  employeeId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  hasReceipt?: boolean;
  jobId?: string;
  search?: string;
}

export interface ExpenseStats {
  pending: { count: number; total: number };
  approved: { count: number; total: number };
  paid: { count: number; total: number };
  rejected: { count: number; total: number };
  total: { count: number; total: number };
}

// Get all expense claims (employer view)
async function fetchExpenseClaims(): Promise<ExpenseClaim[]> {
  const { data, error } = await supabase
    .from('expense_claims')
    .select('*, employees(name, avatar_initials)')
    .order('submitted_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Get expense claims for a specific employee (electrician view)
async function fetchMyExpenseClaims(employeeId: string): Promise<ExpenseClaim[]> {
  const { data, error } = await supabase
    .from('expense_claims')
    .select('*, employees(name, avatar_initials)')
    .eq('employee_id', employeeId)
    .order('submitted_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Main expense hook for employer view
export function useExpenses(filters?: ExpenseFilters) {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['expense_claims'],
    queryFn: fetchExpenseClaims,
  });

  // Calculate stats
  const stats = useMemo((): ExpenseStats => {
    const result: ExpenseStats = {
      pending: { count: 0, total: 0 },
      approved: { count: 0, total: 0 },
      paid: { count: 0, total: 0 },
      rejected: { count: 0, total: 0 },
      total: { count: expenses.length, total: 0 },
    };

    expenses.forEach((expense) => {
      const amount = Number(expense.amount) || 0;
      result.total.total += amount;

      switch (expense.status) {
        case 'Pending':
          result.pending.count++;
          result.pending.total += amount;
          break;
        case 'Approved':
          result.approved.count++;
          result.approved.total += amount;
          break;
        case 'Paid':
          result.paid.count++;
          result.paid.total += amount;
          break;
        case 'Rejected':
          result.rejected.count++;
          result.rejected.total += amount;
          break;
      }
    });

    return result;
  }, [expenses]);

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    if (!filters) return expenses;

    return expenses.filter((expense) => {
      // Status filter
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        if (!statuses.includes(expense.status as ExpenseStatus)) return false;
      }

      // Category filter
      if (filters.category) {
        const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
        if (!categories.includes(expense.category as ExpenseCategory)) return false;
      }

      // Employee filter
      if (filters.employeeId && expense.employee_id !== filters.employeeId) return false;

      // Date range filter
      if (filters.dateFrom) {
        const expenseDate = new Date(expense.submitted_date);
        if (expenseDate < filters.dateFrom) return false;
      }
      if (filters.dateTo) {
        const expenseDate = new Date(expense.submitted_date);
        if (expenseDate > filters.dateTo) return false;
      }

      // Amount range filter
      const amount = Number(expense.amount) || 0;
      if (filters.minAmount !== undefined && amount < filters.minAmount) return false;
      if (filters.maxAmount !== undefined && amount > filters.maxAmount) return false;

      // Has receipt filter
      if (filters.hasReceipt !== undefined) {
        const hasReceipt = !!expense.receipt_url;
        if (filters.hasReceipt !== hasReceipt) return false;
      }

      // Job filter
      if (filters.jobId && expense.job_id !== filters.jobId) return false;

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesDescription = expense.description?.toLowerCase().includes(searchLower);
        const matchesEmployee = expense.employees?.name?.toLowerCase().includes(searchLower);
        const matchesCategory = expense.category?.toLowerCase().includes(searchLower);
        if (!matchesDescription && !matchesEmployee && !matchesCategory) return false;
      }

      return true;
    });
  }, [expenses, filters]);

  // Approve expense mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .update({
          status: 'Approved',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense approved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve: ${error.message}`);
    },
  });

  // Reject expense mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .update({
          status: 'Rejected',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
          rejection_reason: reason,
        })
        .eq('id', id)
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense rejected');
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject: ${error.message}`);
    },
  });

  // Mark as paid mutation
  const markPaidMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .update({
          status: 'Paid',
          paid_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', id)
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense marked as paid');
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark as paid: ${error.message}`);
    },
  });

  // Bulk approve mutation
  const bulkApproveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('expense_claims')
        .update({
          status: 'Approved',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
        })
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success(`${ids.length} expenses approved`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve: ${error.message}`);
    },
  });

  // Bulk reject mutation
  const bulkRejectMutation = useMutation({
    mutationFn: async ({ ids, reason }: { ids: string[]; reason: string }) => {
      const { error } = await supabase
        .from('expense_claims')
        .update({
          status: 'Rejected',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
          rejection_reason: reason,
        })
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: (_, { ids }) => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success(`${ids.length} expenses rejected`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject: ${error.message}`);
    },
  });

  // Create expense mutation
  const createMutation = useMutation({
    mutationFn: async (claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .insert(claim)
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense submitted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit expense: ${error.message}`);
    },
  });

  // Update expense mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ExpenseClaim> }) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .update(updates)
        .eq('id', id)
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update expense: ${error.message}`);
    },
  });

  // Delete expense mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('expense_claims')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete expense: ${error.message}`);
    },
  });

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    stats,
    isLoading,
    refetch,
    approve: approveMutation.mutate,
    reject: rejectMutation.mutate,
    markPaid: markPaidMutation.mutate,
    bulkApprove: bulkApproveMutation.mutate,
    bulkReject: bulkRejectMutation.mutate,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isMarkingPaid: markPaidMutation.isPending,
  };
}

// Hook for electrician's personal expenses
export function useMyExpenses(employeeId?: string) {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['my_expense_claims', employeeId],
    queryFn: () => fetchMyExpenseClaims(employeeId!),
    enabled: !!employeeId,
  });

  // Calculate personal stats
  const stats = useMemo((): ExpenseStats => {
    const result: ExpenseStats = {
      pending: { count: 0, total: 0 },
      approved: { count: 0, total: 0 },
      paid: { count: 0, total: 0 },
      rejected: { count: 0, total: 0 },
      total: { count: expenses.length, total: 0 },
    };

    expenses.forEach((expense) => {
      const amount = Number(expense.amount) || 0;
      result.total.total += amount;

      switch (expense.status) {
        case 'Pending':
          result.pending.count++;
          result.pending.total += amount;
          break;
        case 'Approved':
          result.approved.count++;
          result.approved.total += amount;
          break;
        case 'Paid':
          result.paid.count++;
          result.paid.total += amount;
          break;
        case 'Rejected':
          result.rejected.count++;
          result.rejected.total += amount;
          break;
      }
    });

    return result;
  }, [expenses]);

  // Submit expense mutation
  const submitMutation = useMutation({
    mutationFn: async (claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .insert({
          ...claim,
          status: 'Pending',
          submitted_date: new Date().toISOString().split('T')[0],
        })
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_expense_claims', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense submitted for approval');
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit expense: ${error.message}`);
    },
  });

  // Update pending expense
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ExpenseClaim> }) => {
      const { data, error } = await supabase
        .from('expense_claims')
        .update(updates)
        .eq('id', id)
        .eq('status', 'Pending') // Can only update pending expenses
        .select('*, employees(name, avatar_initials)')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_expense_claims', employeeId] });
      toast.success('Expense updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update expense: ${error.message}`);
    },
  });

  // Delete pending expense
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('expense_claims')
        .delete()
        .eq('id', id)
        .eq('status', 'Pending'); // Can only delete pending expenses
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_expense_claims', employeeId] });
      toast.success('Expense deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete expense: ${error.message}`);
    },
  });

  return {
    expenses,
    stats,
    isLoading,
    refetch,
    submit: submitMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isSubmitting: submitMutation.isPending,
  };
}

// Utility function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Utility function to format compact currency (e.g., £1.2k)
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `£${k % 1 === 0 ? k : k.toFixed(1)}k`;
  }
  return formatCurrency(amount);
}

// Get category config by ID
export function getCategoryConfig(categoryId: string) {
  return EXPENSE_CATEGORIES.find((c) => c.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
}
