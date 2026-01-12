import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import * as financeService from "@/services/financeService";
import type { Quote, Invoice, ExpenseClaim, Supplier, MaterialOrder, PriceBookItem } from "@/services/financeService";

// Quotes
export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: financeService.getQuotes,
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quote: Omit<Quote, 'id' | 'created_at' | 'updated_at'>) => 
      financeService.createQuote(quote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success("Quote created successfully");
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
      toast.success("Quote updated successfully");
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
      toast.success("Quote sent successfully");
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
      const { error } = await (await import('@/integrations/supabase/client')).supabase
        .from('employer_quotes')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success("Quote deleted");
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success("Invoice created successfully");
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
      toast.success("Invoice updated successfully");
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
      toast.success("Invoice marked as paid");
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark invoice as paid: ${error.message}`);
    },
  });
}

export function useSendInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => financeService.sendInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success("Invoice sent successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to send invoice: ${error.message}`);
    },
  });
}

export function useGenerateInvoicePdf() {
  return useMutation({
    mutationFn: (id: string) => financeService.generateInvoicePdf(id),
    onSuccess: (data) => {
      // Open PDF in new window
      const newWindow = window.open();
      if (newWindow) {
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
      toast.success("Expense claim submitted");
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
      toast.success("Expense approved");
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
      toast.success("Expense rejected");
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
      toast.success("Expense marked as paid");
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
      toast.success("Supplier added");
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
      toast.success("Supplier updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update supplier: ${error.message}`);
    },
  });
}

// Material Orders
export function useMaterialOrders() {
  return useQuery({
    queryKey: ['material_orders'],
    queryFn: financeService.getMaterialOrders,
  });
}

export function useCreateMaterialOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: Omit<MaterialOrder, 'id' | 'created_at' | 'updated_at' | 'suppliers'>) => 
      financeService.createMaterialOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material_orders'] });
      toast.success("Order created");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, deliveryDate }: { id: string; status: string; deliveryDate?: string }) => 
      financeService.updateOrderStatus(id, status, deliveryDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material_orders'] });
      toast.success("Order status updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update order: ${error.message}`);
    },
  });
}

// Price Book
export function usePriceBook() {
  return useQuery({
    queryKey: ['price_book'],
    queryFn: financeService.getPriceBook,
  });
}

export function useLowStockItems() {
  return useQuery({
    queryKey: ['price_book', 'low_stock'],
    queryFn: financeService.getLowStockItems,
  });
}

// Price Book Search with pagination
export function useSearchPriceBook(query: string, category?: string) {
  return useInfiniteQuery({
    queryKey: ['price_book', 'search', query, category],
    queryFn: ({ pageParam = 0 }) => 
      financeService.searchPriceBook(query, category, pageParam),
    getNextPageParam: (lastPage, allPages) => 
      allPages.length * 20 < lastPage.total ? allPages.length : undefined,
    initialPageParam: 0,
    enabled: query.length >= 2,
  });
}

// Price Book Stats
export function usePriceBookStats() {
  return useQuery({
    queryKey: ['price_book', 'stats'],
    queryFn: financeService.getPriceBookStats,
  });
}

export function useCreatePriceBookItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Omit<PriceBookItem, 'id' | 'created_at' | 'updated_at' | 'markup' | 'suppliers'>) => 
      financeService.createPriceBookItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price_book'] });
      toast.success("Material added to price book");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add material: ${error.message}`);
    },
  });
}

export function useUpdatePriceBookItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<PriceBookItem> }) => 
      financeService.updatePriceBookItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price_book'] });
      toast.success("Material updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update material: ${error.message}`);
    },
  });
}

export function useBulkImportPriceBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: Omit<PriceBookItem, 'id' | 'created_at' | 'updated_at' | 'markup' | 'suppliers'>[]) => 
      financeService.bulkCreatePriceBookItems(items),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['price_book'] });
      if (result.errors > 0) {
        toast.warning(`Imported ${result.inserted} items with ${result.errors} errors`);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to import: ${error.message}`);
    },
  });
}

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
