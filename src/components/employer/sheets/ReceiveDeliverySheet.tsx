import { useEffect, useState } from 'react';
import { Camera, Check, Minus, Plus } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  cardCn,
  labelCn,
  textareaCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useCreateGoodsReceipt } from '@/hooks/useGoodsReceipts';
import type { MaterialOrder, POLine } from '@/services/financeService';

/* Book a delivery in against a purchase order (ELE-1978). Owner, admin or
   office manager — quantities only, no prices — through
   receive_purchase_order_delivery, which clamps each line to what is still
   outstanding and moves the PO to Part-received / Received. */

interface ReceiveDeliverySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: MaterialOrder | null;
  onDone?: () => void;
}

export function ReceiveDeliverySheet({ open, onOpenChange, order, onDone }: ReceiveDeliverySheetProps) {
  const createReceipt = useCreateGoodsReceipt();
  const items = (order?.items as POLine[]) ?? [];
  const outstanding = (it: POLine) => Math.max(0, Number(it.qty) - Number(it.received_qty || 0));

  const [qty, setQty] = useState<Record<number, number>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  // Each line starts at what is still outstanding — the usual case is "all of it".
  useEffect(() => {
    if (!open || !order) return;
    const init: Record<number, number> = {};
    items.forEach((it, i) => {
      init[i] = outstanding(it);
    });
    setQty(init);
    setPhoto(null);
    setNotes('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, order]);

  const set = (i: number, v: number) =>
    setQty((q) => ({ ...q, [i]: Math.max(0, Math.min(outstanding(items[i]), v)) }));

  const submit = async () => {
    if (!order) return;
    const received = items.map((_, i) => ({ index: i, qty_received: qty[i] || 0 }));
    if (received.every((r) => r.qty_received === 0)) return;
    try {
      await createReceipt.mutateAsync({ order, received, photoFile: photo, notes });
      onOpenChange(false);
      onDone?.();
    } catch {
      /* hook toasts */
    }
  };

  const totalReceiving = items.reduce((s, _, i) => s + (qty[i] || 0), 0);
  const totalOutstanding = items.reduce((s, it) => s + outstanding(it), 0);

  return (
    <FormSheet
      open={open && !!order}
      onOpenChange={onOpenChange}
      eyebrow="Goods in"
      title="Book a delivery in"
      description={
        order
          ? `${order.order_number}${order.supplier?.name ? ` from ${order.supplier.name}` : ''}${order.job_title ? ` for ${order.job_title}` : ''}`
          : undefined
      }
      width="wide"
      footer={
        <div className="flex gap-2">
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'flex-1 px-4')}>
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={createReceipt.isPending || totalReceiving === 0}
            className={cn(buttonPrimaryCn, 'flex-[2] px-4')}
          >
            {createReceipt.isPending
              ? 'Saving…'
              : totalReceiving === totalOutstanding
                ? 'Everything arrived'
                : `Book in ${totalReceiving} item${totalReceiving === 1 ? '' : 's'}`}
          </button>
        </div>
      }
    >
      <div className="space-y-5 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-6 lg:space-y-0">
        <section className={cardCn}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[15px] font-semibold text-white">What arrived</h2>
            <button
              type="button"
              onClick={() => {
                const none: Record<number, number> = {};
                items.forEach((_, i) => (none[i] = 0));
                setQty(none);
              }}
              className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Clear all
            </button>
          </div>
          {items.length === 0 ? (
            <p className="text-[14px] text-white">This order has no lines.</p>
          ) : (
            <ul className="divide-y divide-white/[0.08]">
              {items.map((it, i) => {
                const already = Number(it.received_qty || 0);
                const out = outstanding(it);
                return (
                  <li key={`${it.name}-${i}`} className="flex items-center gap-3 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-white">{it.name}</p>
                      <p className="text-[12px] text-white">
                        {Number(it.qty)} {it.unit || ''} ordered
                        {already > 0 ? ` · ${already} already in` : ''}
                        {out === 0 ? ' · all in' : ''}
                      </p>
                    </div>
                    {out > 0 && (
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => set(i, (qty[i] || 0) - 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation"
                          aria-label={`One fewer ${it.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-9 text-center text-[16px] font-semibold tabular-nums text-white">{qty[i] ?? 0}</span>
                        <button
                          type="button"
                          onClick={() => set(i, (qty[i] || 0) + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation"
                          aria-label={`One more ${it.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className={cardCn}>
          <h2 className="text-[15px] font-semibold text-white">Delivery note</h2>
          <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.2] text-[14px] text-white touch-manipulation hover:border-elec-yellow">
            {photo ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" aria-hidden /> {photo.name.slice(0, 28)}
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" aria-hidden /> Photograph the delivery note
              </>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            />
          </label>
          <div>
            <label className={labelCn} htmlFor="receipt-notes">
              Anything to flag?
            </label>
            <textarea
              id="receipt-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={textareaCn}
              placeholder="Shortages, damage, back-orders"
            />
          </div>
        </section>
      </div>
    </FormSheet>
  );
}
