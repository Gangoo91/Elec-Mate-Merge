import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as financeService from '@/services/financeService';
import type {
  Quote,
  Invoice,
  ExpenseClaim,
  Supplier,
  MaterialOrder,
} from '@/services/financeService';

// Quotes
export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: financeService.getQuotes,
  });
}

/** ELE-1990: save edits to a draft quote (quote builder edit mode). */
export function useUpdateQuoteDraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof financeService.updateQuoteDraft>[1] }) =>
      financeService.updateQuoteDraft(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not save the quote');
    },
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>) =>
      financeService.createQuote(quote),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success(created?.quote_number ? `Quote ${created.quote_number} saved` : 'Quote saved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create quote: ${error.message}`);
    },
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Quote> }) =>
      financeService.updateQuote(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success('Quote updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update quote: ${error.message}`);
    },
  });
}

export function useSendQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => financeService.sendQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success('Quote sent successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to send quote: ${error.message}`);
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Soft delete on the shared `quotes` table (employer_quotes retired):
      // the Electrical Hub and the hub lists both hide deleted_at rows, and
      // the record stays recoverable. Hard delete is owner-only by RLS.
      const { error } = await (await import('@/integrations/supabase/client')).supabase
        .from('quotes')
        .update({ deleted_at: new Date().toISOString() } as never)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success('Quote deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete quote: ${error.message}`);
    },
  });
}

// Invoices
export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: financeService.getInvoices,
  });
}

export function useOverdueInvoices() {
  return useQuery({
    queryKey: ['invoices', 'overdue'],
    queryFn: financeService.getOverdueInvoices,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) =>
      financeService.createInvoice(invoice),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success(created?.invoice_number ? `Invoice ${created.invoice_number} saved` : 'Invoice saved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create invoice: ${error.message}`);
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Invoice> }) =>
      financeService.updateInvoice(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update invoice: ${error.message}`);
    },
  });
}

export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => financeService.markInvoicePaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice marked as paid');
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark invoice as paid: ${error.message}`);
    },
  });
}

export function useSendInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, email }: { id: string; email?: string }) =>
      financeService.sendInvoice(id, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice sent successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to send invoice: ${error.message}`);
    },
  });
}

export function useGenerateInvoicePdf() {
  return useMutation({
    mutationFn: (id: string) => financeService.generateInvoicePdf(id),
    onSuccess: async (data) => {
      if (data.url) {
        const { openExternalUrl } = await import('@/utils/open-external-url');
        await openExternalUrl(data.url);
        return;
      }
      const newWindow = window.open();
      if (newWindow && data.html) {
        newWindow.document.write(data.html);
        newWindow.document.close();
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate PDF: ${error.message}`);
    },
  });
}

// Expense Claims
export function useExpenseClaims() {
  return useQuery({
    queryKey: ['expense_claims'],
    queryFn: financeService.getExpenseClaims,
  });
}

export function useCreateExpenseClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (claim: Omit<ExpenseClaim, 'id' | 'created_at' | 'updated_at' | 'employees'>) =>
      financeService.createExpenseClaim(claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense claim submitted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit expense: ${error.message}`);
    },
  });
}

export function useApproveExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approvedBy }: { id: string; approvedBy: string }) =>
      financeService.approveExpense(id, approvedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense approved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve expense: ${error.message}`);
    },
  });
}

export function useRejectExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approvedBy, reason }: { id: string; approvedBy: string; reason: string }) =>
      financeService.rejectExpense(id, approvedBy, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense rejected');
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject expense: ${error.message}`);
    },
  });
}

export function useMarkExpensePaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => financeService.markExpensePaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense_claims'] });
      toast.success('Expense marked as paid');
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark expense as paid: ${error.message}`);
    },
  });
}

// Suppliers
export function useSuppliers() {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: financeService.getSuppliers,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) =>
      financeService.createSupplier(supplier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier added');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add supplier: ${error.message}`);
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Supplier> }) =>
      financeService.updateSupplier(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update supplier: ${error.message}`);
    },
  });
}

// Material Orders
export function useMaterialOrders(jobId?: string | null) {
  return useQuery({
    queryKey: ['material_orders', jobId ?? 'all'],
    queryFn: () => financeService.getMaterialOrders(jobId ?? null),
  });
}

export function useCreateMaterialOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: Omit<MaterialOrder, 'id' | 'created_at' | 'updated_at' | 'suppliers'>) =>
      financeService.createMaterialOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material_orders'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] }); // committed cost
      toast.success('Order created');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      deliveryDate,
    }: {
      id: string;
      status: string;
      deliveryDate?: string;
    }) => financeService.updateOrderStatus(id, status, deliveryDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material_orders'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] }); // committed cost
      toast.success('Order status updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update order: ${error.message}`);
    },
  });
}

// Price book: see useFirmPriceBook (ELE-1991) — the firm's one price book is
// the owner's Electrical Hub materials_lists.

// Utility hooks for number generation
export function useNextQuoteNumber() {
  return useQuery({
    queryKey: ['quotes', 'next_number'],
    queryFn: financeService.getNextQuoteNumber,
  });
}

export function useNextInvoiceNumber() {
  return useQuery({
    queryKey: ['invoices', 'next_number'],
    queryFn: financeService.getNextInvoiceNumber,
  });
}

export function useNextOrderNumber() {
  return useQuery({
    queryKey: ['material_orders', 'next_number'],
    queryFn: financeService.getNextOrderNumber,
  });
}
