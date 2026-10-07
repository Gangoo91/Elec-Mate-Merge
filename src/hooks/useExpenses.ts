import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useAuth } from '@/contexts/AuthContext';
import type { ExpenseClaim } from '@/services/financeService';
import { v4 as uuidv4 } from 'uuid';

// Category configuration
export const EXPENSE_CATEGORIES = [
  { id: 'Materials', icon: 'Wrench', color: 'blue', label: 'Materials' },
  { id: 'Travel', icon: 'Car', color: 'green', label: 'Travel' },
  { id: 'Mileage', icon: 'Route', color: 'cyan', label: 'Mileage' },
  { id: 'Parking', icon: 'ParkingCircle', color: 'purple', label: 'Parking' },
  { id: 'Tools', icon: 'Hammer', color: 'orange', label: 'Tools' },
  { id: 'PPE', icon: 'HardHat', color: 'red', label: 'PPE' },
  { id: 'Training', icon: 'GraduationCap', color: 'teal', label: 'Training' },
  { id: 'Meals', icon: 'UtensilsCrossed', color: 'pink', label: 'Meals' },
  { id: 'Other', icon: 'Package', color: 'gray', label: 'Other' },
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]['id'];

// Worker self-service submits lowercase categories ('travel', 'subsistence'…)
// while the employer side uses capitalised ids — normalise before comparing
// so employer filters/tabs don't silently drop worker claims.
const WORKER_CATEGORY_ALIASES: Record<string, ExpenseCategory> = {
  subsistence: 'Meals',
};

export function normaliseExpenseCategory(raw: string | null | undefined): ExpenseCategory {
  const value = (raw || '').trim();
  if (!value) return 'Other';
  const alias = WORKER_CATEGORY_ALIASES[value.toLowerCase()];
  if (alias) return alias;
  const match = EXPENSE_CATEGORIES.find((c) => c.id.toLowerCase() === value.toLowerCase());
  return match ? match.id : 'Other';
}
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
    .from('employer_expense_claims')
    .select('*, employees:employer_employees(name, avatar_initials)')
    .order('submitted_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Get expense claims for a specific employee (electrician view)
async function fetchMyExpenseClaims(employeeId: string): Promise<ExpenseClaim[]> {
  const { data, error } = await supabase
    .from('employer_expense_claims')
    .select('*, employees:employer_employees(name, avatar_initials)')
    .eq('employee_id', employeeId)
    .order('submitted_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Main expense hook for employer view
export function useExpenses(filters?: ExpenseFilters) {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['expense_claims'],
    queryFn: fetchExpenseClaims,
  });

  // Live: a worker submitting (or editing) an expense — any change to the
  // company's rows (RLS-scoped) refreshes the employer list instantly.
  useRealtimeInvalidate(
    'expense-claims',
    [{ table: 'employer_expense_claims' }],
    [['expense_claims']]
  );

  // Calculate stats. When an employee filter is set (employee mode /
  // "My expenses") the stat strip must reflect only that person's claims,
  // not the whole company's.
  const statsBase = useMemo(
    () =>
      filters?.employeeId ? expenses.filter((e) => e.employee_id === filters.employeeId) : expenses,
    [expenses, filters?.employeeId]
  );

  const stats = useMemo((): ExpenseStats => {
    const result: ExpenseStats = {
      pending: { count: 0, total: 0 },
      approved: { count: 0, total: 0 },
      paid: { count: 0, total: 0 },
      rejected: { count: 0, total: 0 },
      total: { count: statsBase.length, total: 0 },
    };

    statsBase.forEach((expense) => {
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
  }, [statsBase]);

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    if (!filters) return expenses;

    return expenses.filter((expense) => {
      // Status filter
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        if (!statuses.includes(expense.status as ExpenseStatus)) return false;
      }

      // Category filter — normalised so worker-submitted lowercase
      // categories still match the employer's capitalised ids
      if (filters.category) {
        const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
        if (!categories.includes(normaliseExpenseCategory(expense.category))) return false;
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
        .from('employer_expense_claims')
        .update({
          status: 'Approved',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
        })
        .eq('id', id)
        // Only a Pending claim can be decided — protects the audit trail and
        // surfaces an RLS refusal (0 rows) instead of a false success toast.
        .eq('status', 'Pending')
        .select('*, employees:employer_employees(name, avatar_initials)')
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Claim is no longer pending');
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
        .from('employer_expense_claims')
        .update({
          status: 'Rejected',
          approved_by: profile?.full_name || 'Manager',
          approved_date: new Date().toISOString(),
          rejection_reason: reason,
        })
        .eq('id', id)
        .eq('status', 'Pending')
        .select('*, employees:employer_employees(name, avatar_initials)')
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Claim is no longer pending');
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

  // Pay run: mark several APPROVED claims paid in one go (ELE-1948).
  // Only rows still Approved change, so a double tap or a claim another
  // manager just rejected can never be paid by accident.
  const bulkMarkPaidMutation = useMutation({
    mutationFn: async ({ ids, paidDate }: { ids: string[]; paidDate: string }) => {
      if (ids.length === 0) return 0;
      const { data, error } = await supabase
        .from('employer_expense_claims')
        .update({ status: 'Paid', paid_date: paidDate })
        .in('id', ids)
        .eq('status', 'Approved')
        .select('id');
      if (error) throw error;
      return data?.length ?? 0;
    },
    onSuccess: (count, vars) => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      if (count === vars.ids.length) {
        toast.success(`${count} claim${count === 1 ? '' : 's'} marked paid`);
      } else {
        toast.warning(
          `${count} of ${vars.ids.length} marked paid — the rest were changed by someone else first`
        );
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark as paid: ${error.message}`);
    },
  });

  // Mark as paid mutation
  const markPaidMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('employer_expense_claims')
        .update({
          status: 'Paid',
          paid_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', id)
        .select('*, employees:employer_employees(name, avatar_initials)')
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
        .from('employer_expense_claims')
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
        .from('employer_expense_claims')
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
    mutationFn: async (
      claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>
    ) => {
      const { data, error } = await supabase
        .from('employer_expense_claims')
        .insert(claim)
        .select('*, employees:employer_employees(name, avatar_initials)')
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
        .from('employer_expense_claims')
        .update(updates)
        .eq('id', id)
        .select('*, employees:employer_employees(name, avatar_initials)')
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
      const { error } = await supabase.from('employer_expense_claims').delete().eq('id', id);
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
    bulkMarkPaid: bulkMarkPaidMutation.mutateAsync,
    isBulkMarkingPaid: bulkMarkPaidMutation.isPending,
    bulkApprove: bulkApproveMutation.mutate,
    bulkReject: bulkRejectMutation.mutate,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isMarkingPaid: markPaidMutation.isPending,
    isCreating: createMutation.isPending,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// The worker's own claims (ELE-2001 / ELE-2009).
//
// ONE source for Worker Tools → Expenses, Worker Tools → My pay and the office's
// Team member sheet: the same employer_expense_claims rows, the same status
// words the office Expenses page uses (Pending / Approved / Paid / Rejected).
//
// Writes beyond a plain insert go through SECURITY DEFINER functions that check
// the claim is the caller's own and still Pending (workers have no UPDATE or
// DELETE policy): submit_my_mileage_claim, update_my_expense_claim,
// withdraw_my_expense_claim. Receipts go to the PRIVATE expense-receipts bucket
// and are only ever opened through a signed URL (getSignedReceiptUrl).
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkerExpenseClaim extends ExpenseClaim {
  incurred_on?: string | null;
  mileage_miles?: number | string | null;
  mileage_from?: string | null;
  mileage_to?: string | null;
  mileage_return?: boolean | null;
  mileage_breakdown?: {
    rate_source?: 'hmrc' | 'firm';
    bands?: { miles: number; pence: number }[];
    ytd_miles_before?: number | null;
  } | null;
}

const RECEIPT_BUCKET = 'expense-receipts';
const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;

/**
 * Upload a worker's receipt and return the value stored on the claim. The
 * value is the bucket URL form (…/expense-receipts/<path>) because the firm's
 * storage read policy matches on it; the bucket is private, so it only ever
 * opens through a signed URL.
 */
export async function uploadWorkerReceipt(employeeId: string, file: File): Promise<string> {
  if (file.size > MAX_RECEIPT_BYTES) throw new Error('That receipt is over 10 MB. Try a photo instead.');
  const { compressImage } = await import('@/services/expenseReceiptService');
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
  const toSend = isPdf ? file : await compressImage(file, 1024);
  const ext = isPdf ? 'pdf' : (file.name.split('.').pop() || 'jpg').toLowerCase().slice(0, 5);
  const path = `receipts/worker/${employeeId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(RECEIPT_BUCKET)
    .upload(path, toSend, {
      cacheControl: '3600',
      upsert: false,
      contentType: isPdf ? 'application/pdf' : toSend.type || undefined,
    });
  if (error) throw new Error('The receipt did not upload. Check your signal and try again.');
  return supabase.storage.from(RECEIPT_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function removeWorkerReceipt(stored: string | null | undefined) {
  if (!stored) return;
  const { receiptPathFromUrl } = await import('@/services/expenseReceiptService');
  const path = receiptPathFromUrl(stored);
  if (!path) return;
  // Only the uploader can remove it (storage policy); a failure leaves an
  // orphan file, never a broken claim.
  await supabase.storage.from(RECEIPT_BUCKET).remove([path]);
}

const claimErrorMessage = (e: unknown, fallback: string) => {
  const msg = (e as { message?: string })?.message ?? '';
  if (msg.includes('claim_not_pending')) return 'The office has already dealt with this claim, so it can no longer be changed.';
  if (msg.includes('claim_not_found')) return 'That claim could not be found.';
  if (msg.includes('receipt_not_yours')) return 'That receipt could not be attached.';
  if (msg.includes('miles_out_of_range')) return 'Enter the miles for this journey (up to 2,000).';
  if (msg.includes('amount_out_of_range')) return 'Enter an amount between £0.01 and £10,000.';
  if (msg.includes('date_out_of_range')) return 'Pick a date in the last year, not in the future.';
  if (msg.includes('job_not_found')) return 'That job is no longer available.';
  if (msg.includes('row-level security')) return 'You can only claim for yourself.';
  return msg && msg.length < 140 ? msg : fallback;
};

export interface WorkerClaimInput {
  category: string;
  amount: number;
  description: string;
  jobId: string | null;
  incurredOn: string;
  /** New file to upload (replaces any existing receipt). */
  receiptFile?: File | null;
  /** Edit only: drop the existing receipt. */
  removeReceipt?: boolean;
}

export interface WorkerMileageInput {
  miles: number;
  from: string;
  to: string;
  isReturn: boolean;
  jobId: string | null;
  description: string;
  incurredOn: string;
  receiptFile?: File | null;
  removeReceipt?: boolean;
}

// Hook for a worker's own expense claims (and the office's per-person view)
export function useMyExpenses(employeeId?: string) {
  const queryClient = useQueryClient();

  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['my_expense_claims', employeeId],
    queryFn: () => fetchMyExpenseClaims(employeeId!) as Promise<WorkerExpenseClaim[]>,
    enabled: !!employeeId,
  });

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
      switch ((expense.status || '').toLowerCase()) {
        case 'pending':
          result.pending.count++;
          result.pending.total += amount;
          break;
        case 'approved':
          result.approved.count++;
          result.approved.total += amount;
          break;
        case 'paid':
          result.paid.count++;
          result.paid.total += amount;
          break;
        case 'rejected':
          result.rejected.count++;
          result.rejected.total += amount;
          break;
      }
    });
    return result;
  }, [expenses]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['my_expense_claims', employeeId] });
    queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
    queryClient.invalidateQueries({ queryKey: ['mileage-quote'] });
  };

  // Plain claim — RLS insert (Pending only, own roster row, own receipt).
  const submitMutation = useMutation({
    mutationFn: async (input: WorkerClaimInput) => {
      if (!employeeId) throw new Error('No team record');
      let receiptUrl: string | null = null;
      if (input.receiptFile) receiptUrl = await uploadWorkerReceipt(employeeId, input.receiptFile);
      const { data, error } = await supabase
        .from('employer_expense_claims')
        .insert({
          employee_id: employeeId,
          category: input.category,
          amount: input.amount,
          description: input.description.trim() || input.category,
          job_id: input.jobId,
          status: 'Pending',
          submitted_date: new Date().toISOString().split('T')[0],
          incurred_on: input.incurredOn,
          receipt_url: receiptUrl,
        } as never)
        .select('id')
        .single();
      if (error) {
        await removeWorkerReceipt(receiptUrl);
        throw new Error(claimErrorMessage(error, 'Could not send the claim.'));
      }
      return data;
    },
    onSuccess: invalidate,
  });

  const submitMileageMutation = useMutation({
    mutationFn: async (input: WorkerMileageInput) => {
      if (!employeeId) throw new Error('No team record');
      let receiptUrl: string | null = null;
      if (input.receiptFile) receiptUrl = await uploadWorkerReceipt(employeeId, input.receiptFile);
      const { data, error } = await supabase.rpc(
        'submit_my_mileage_claim' as never,
        {
          p_employee: employeeId,
          p_miles: input.miles,
          p_from: input.from,
          p_to: input.to,
          p_return: input.isReturn,
          p_job_id: input.jobId,
          p_description: input.description || null,
          p_incurred_on: input.incurredOn,
          p_receipt_url: receiptUrl,
        } as never
      );
      if (error) {
        await removeWorkerReceipt(receiptUrl);
        throw new Error(claimErrorMessage(error, 'Could not send the mileage claim.'));
      }
      return data as unknown as WorkerExpenseClaim;
    },
    onSuccess: invalidate,
  });

  // Edit a Pending claim (server checks it is yours and still Pending).
  const updateMutation = useMutation({
    mutationFn: async ({
      claim,
      plain,
      mileage,
    }: {
      claim: WorkerExpenseClaim;
      plain?: WorkerClaimInput;
      mileage?: WorkerMileageInput;
    }) => {
      if (!employeeId) throw new Error('No team record');
      const input = mileage ?? plain;
      if (!input) throw new Error('Nothing to save');
      let receiptUrl: string | null = claim.receipt_url ?? null;
      let uploaded: string | null = null;
      if (input.receiptFile) {
        uploaded = await uploadWorkerReceipt(employeeId, input.receiptFile);
        receiptUrl = uploaded;
      } else if (input.removeReceipt) {
        receiptUrl = null;
      }
      const { data, error } = await supabase.rpc(
        'update_my_expense_claim' as never,
        {
          p_claim: claim.id,
          p_category: plain ? plain.category : null,
          p_amount: plain ? plain.amount : null,
          p_description: input.description || null,
          p_job_id: input.jobId,
          p_receipt_url: receiptUrl,
          p_incurred_on: input.incurredOn,
          p_miles: mileage ? mileage.miles : null,
          p_from: mileage ? mileage.from : null,
          p_to: mileage ? mileage.to : null,
          p_return: mileage ? mileage.isReturn : null,
        } as never
      );
      if (error) {
        await removeWorkerReceipt(uploaded);
        throw new Error(claimErrorMessage(error, 'Could not save your changes.'));
      }
      // The old file is no longer on any claim — tidy it away.
      if (claim.receipt_url && claim.receipt_url !== receiptUrl) {
        await removeWorkerReceipt(claim.receipt_url);
      }
      return data as unknown as WorkerExpenseClaim;
    },
    onSuccess: invalidate,
  });

  const withdrawMutation = useMutation({
    mutationFn: async (claimId: string) => {
      const { data, error } = await supabase.rpc(
        'withdraw_my_expense_claim' as never,
        { p_claim: claimId } as never
      );
      if (error) throw new Error(claimErrorMessage(error, 'Could not withdraw the claim.'));
      await removeWorkerReceipt(data as unknown as string | null);
    },
    onSuccess: invalidate,
  });

  return {
    expenses,
    stats,
    isLoading,
    isError,
    refetch,
    submitClaim: submitMutation.mutateAsync,
    submitMileage: submitMileageMutation.mutateAsync,
    updateClaim: updateMutation.mutateAsync,
    withdrawClaim: withdrawMutation.mutateAsync,
    isSubmitting: submitMutation.isPending || submitMileageMutation.isPending,
    isUpdating: updateMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
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

// Get category config by ID (tolerates worker-submitted lowercase values)
export function getCategoryConfig(categoryId: string) {
  const normalised = normaliseExpenseCategory(categoryId);
  return (
    EXPENSE_CATEGORIES.find((c) => c.id === normalised) ||
    EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]
  );
}

// Fetch expenses by job ID
export function useExpensesByJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ['expense_claims', 'job', jobId],
    queryFn: async (): Promise<ExpenseClaim[]> => {
      if (!jobId) return [];

      const { data, error } = await supabase
        .from('employer_expense_claims')
        .select('*, employees:employer_employees(name, avatar_initials)')
        .eq('job_id', jobId)
        .order('submitted_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!jobId,
  });
}

// Fetch expenses by date range
export function useExpensesByDateRange(startDate: Date | undefined, endDate: Date | undefined) {
  return useQuery({
    queryKey: ['expense_claims', 'dateRange', startDate?.toISOString(), endDate?.toISOString()],
    queryFn: async (): Promise<ExpenseClaim[]> => {
      let query = supabase
        .from('employer_expense_claims')
        .select('*, employees:employer_employees(name, avatar_initials)')
        .order('submitted_date', { ascending: false });

      if (startDate) {
        query = query.gte('submitted_date', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        query = query.lte('submitted_date', endDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!(startDate || endDate),
  });
}

// Upload receipt image
export function useUploadReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ expenseId, file }: { expenseId: string; file: File }): Promise<string> => {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `receipts/${expenseId}/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('expense-receipts')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('expense-receipts').getPublicUrl(filePath);

      // Update expense with receipt URL
      const { error: updateError } = await supabase
        .from('employer_expense_claims')
        .update({ receipt_url: publicUrl })
        .eq('id', expenseId);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Receipt uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to upload receipt: ${error.message}`);
    },
  });
}

// Export expenses to CSV
export async function exportExpensesToCSV(
  expenses: ExpenseClaim[],
  filename?: string
): Promise<void> {
  const headers = [
    'Date',
    'Employee',
    'Category',
    'Description',
    'Amount',
    'Status',
    'Approved By',
    'Approved Date',
    'Paid Date',
    'Has Receipt',
  ];

  const rows = expenses.map((exp) => [
    exp.submitted_date,
    exp.employees?.name || 'Unknown',
    exp.category || '',
    exp.description || '',
    exp.amount?.toString() || '0',
    exp.status || '',
    exp.approved_by || '',
    exp.approved_date || '',
    exp.paid_date || '',
    exp.receipt_url ? 'Yes' : 'No',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    filename || `expenses-${new Date().toISOString().split('T')[0]}.csv`
  );
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Calculate expense totals by category
export function useExpenseTotalsByCategory() {
  const { allExpenses } = useExpenses();

  return useMemo(() => {
    const totals: Record<string, { total: number; count: number }> = {};

    allExpenses.forEach((exp) => {
      const category = exp.category || 'Other';
      if (!totals[category]) {
        totals[category] = { total: 0, count: 0 };
      }
      totals[category].total += Number(exp.amount) || 0;
      totals[category].count += 1;
    });

    return totals;
  }, [allExpenses]);
}

// Get expense stats by job
export function useExpenseStatsByJob() {
  const { allExpenses } = useExpenses();

  return useMemo(() => {
    const jobStats: Record<
      string,
      { total: number; count: number; pending: number; approved: number }
    > = {};

    allExpenses.forEach((exp) => {
      const jobId = exp.job_id || 'unassigned';
      if (!jobStats[jobId]) {
        jobStats[jobId] = { total: 0, count: 0, pending: 0, approved: 0 };
      }
      jobStats[jobId].total += Number(exp.amount) || 0;
      jobStats[jobId].count += 1;
      if (exp.status === 'Pending') jobStats[jobId].pending += 1;
      if (exp.status === 'Approved' || exp.status === 'Paid') jobStats[jobId].approved += 1;
    });

    return jobStats;
  }, [allExpenses]);
}
