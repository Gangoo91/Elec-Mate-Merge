import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { MaterialOrder } from '@/services/financeService';

export interface GoodsReceipt {
  id: string;
  order_id: string;
  received_at: string;
  received_by: string | null;
  lines: { name: string; qty_received: number }[];
  /**
   * Bare job-photos storage path on new rows, full public URL on legacy rows.
   * Resolve with useStorageUrl(s)('job-photos', …) before rendering/opening.
   */
  delivery_note_url: string | null;
  notes: string | null;
}

// Delivery history for a PO (newest first).
export const useGoodsReceipts = (orderId: string | undefined) =>
  useQuery({
    queryKey: ['goods-receipts', orderId],
    enabled: !!orderId,
    queryFn: async (): Promise<GoodsReceipt[]> => {
      const { data, error } = await supabase
        .from('employer_goods_receipts')
        .select('*')
        .eq('order_id', orderId as string)
        .order('received_at', { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as GoodsReceipt[];
    },
  });

export interface ReceiptInput {
  order: MaterialOrder;
  /** qty received in THIS delivery, per line index */
  received: { index: number; qty_received: number }[];
  photoFile?: File | null;
  notes?: string;
}

async function uploadDeliveryNote(file: File): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${user.id}/delivery-notes/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('job-photos').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error && !error.message.includes('not found')) throw error;
  // Store the bare storage path — readers resolve it (and legacy full URLs)
  // via useStorageUrl(s), so this survives the job-photos privacy flip.
  return path;
}

export const useCreateGoodsReceipt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ order, received, photoFile, notes }: ReceiptInput) => {
      // One server call (ELE-1978): clamps each line to what is outstanding,
      // writes the receipt, moves the PO to Part-received / Received. Works for
      // office managers too, who cannot write the PO table (it holds costs).
      const deliveryNoteUrl = photoFile ? await uploadDeliveryNote(photoFile) : null;
      const { data, error } = await supabase.rpc('receive_purchase_order_delivery' as never, {
        p_order: order.id,
        p_received: received.filter((r) => r.qty_received > 0),
        p_note_path: deliveryNoteUrl,
        p_notes: notes || null,
      } as never);
      if (error) throw error;
      return { fully: (data as unknown as string) === 'Received' };
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['material_orders'] });
      qc.invalidateQueries({ queryKey: ['job-financials'] });
      qc.invalidateQueries({ queryKey: ['goods-receipts'] });
      toast.success(res.fully ? 'Delivery received in full.' : 'Partial delivery recorded.');
    },
    onError: (e: Error) => toast.error(e.message || 'Could not record the delivery.'),
  });
};
