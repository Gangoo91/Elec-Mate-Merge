import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { MaterialOrder, POLine } from '@/services/financeService';

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
      return (data || []) as GoodsReceipt[];
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
      const items = (order.items as POLine[]) ?? [];

      // Accumulate received_qty onto each line, clamped to what's outstanding.
      const newItems: POLine[] = items.map((it, i) => {
        const alreadyIn = Number(it.received_qty || 0);
        const outstanding = Math.max(0, Number(it.qty) - alreadyIn);
        const r = received.find((x) => x.index === i);
        const add = r ? Math.min(Math.max(0, r.qty_received), outstanding) : 0;
        return { ...it, received_qty: alreadyIn + add };
      });

      const fully = newItems.every((it) => Number(it.received_qty || 0) >= Number(it.qty));
      const anyReceived = newItems.some((it) => Number(it.received_qty || 0) > 0);
      const newStatus = fully ? 'Received' : anyReceived ? 'Part-received' : order.status;

      const deliveryNoteUrl = photoFile ? await uploadDeliveryNote(photoFile) : null;

      // Receipt record — only the lines actually received this time.
      const receiptLines = received
        .filter((r) => r.qty_received > 0)
        .map((r) => ({ name: items[r.index]?.name ?? 'Item', qty_received: r.qty_received }));

      const { error: rErr } = await supabase.from('employer_goods_receipts').insert({
        order_id: order.id,
        lines: receiptLines,
        delivery_note_url: deliveryNoteUrl,
        notes: notes || null,
      });
      if (rErr) throw rErr;

      // Update the PO (trigger books actual cost when it flips to Received).
      const { error: oErr } = await supabase
        .from('employer_material_orders')
        .update({
          items: newItems,
          status: newStatus,
          delivery_date: fully ? new Date().toISOString().split('T')[0] : order.delivery_date,
        })
        .eq('id', order.id);
      if (oErr) throw oErr;

      return { fully };
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
