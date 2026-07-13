import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface InvoiceVariance {
  type: 'overcharge' | 'short_delivery' | 'price_hike' | string;
  detail: string;
  amount: number;
}
export interface MatchResult {
  matched: boolean;
  invoice_total: number;
  po_total: number;
  supplier_name: string | null;
  invoice_number: string | null;
  variances: InvoiceVariance[];
}
export interface SupplierInvoice {
  id: string;
  order_id: string;
  supplier_name: string | null;
  invoice_number: string | null;
  invoice_total: number;
  matched: boolean;
  variances: InvoiceVariance[];
  created_at: string;
}

const toBase64 = (file: File): Promise<{ data: string; type: string }> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve({ data: String(r.result).split(',')[1] ?? '', type: file.type });
    r.onerror = () => reject(new Error('Could not read the image.'));
    r.readAsDataURL(file);
  });

export const useSupplierInvoices = (orderId: string | undefined) =>
  useQuery({
    queryKey: ['supplier-invoices', orderId],
    enabled: !!orderId,
    queryFn: async (): Promise<SupplierInvoice[]> => {
      const { data, error } = await supabase
        .from('employer_supplier_invoices')
        .select('*')
        .eq('order_id', orderId as string)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as SupplierInvoice[];
    },
  });

export const useMatchInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, file }: { orderId: string; file: File }): Promise<MatchResult> => {
      const { data, type } = await toBase64(file);
      const { data: res, error } = await supabase.functions.invoke('match-supplier-invoice', {
        body: { order_id: orderId, image_base64: data, image_type: type },
      });
      if (error) throw error;
      if ((res as { error?: string })?.error) throw new Error((res as { error: string }).error);
      return res as MatchResult;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['supplier-invoices'] });
      if (res.matched) {
        toast.success('Invoice matches the PO — good to pay.');
      } else {
        toast.warning(`${res.variances.length} issue${res.variances.length === 1 ? '' : 's'} found — check before paying.`);
      }
    },
    onError: (e: Error) => toast.error(e.message || 'Could not match the invoice.'),
  });
};
