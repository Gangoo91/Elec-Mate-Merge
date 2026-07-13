import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Check, PackageCheck } from 'lucide-react';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';
import { useCreateGoodsReceipt } from '@/hooks/useGoodsReceipts';
import type { MaterialOrder, POLine } from '@/services/financeService';

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

  const [qty, setQty] = useState<Record<number, string>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  // Default each line to its outstanding quantity when the sheet opens.
  useEffect(() => {
    if (!open || !order) return;
    const init: Record<number, string> = {};
    items.forEach((it, i) => {
      init[i] = String(outstanding(it));
    });
    setQty(init);
    setPhoto(null);
    setNotes('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, order]);

  const receiveAll = () => {
    const all: Record<number, string> = {};
    items.forEach((it, i) => (all[i] = String(outstanding(it))));
    setQty(all);
  };

  const submit = async () => {
    if (!order) return;
    const received = items.map((_, i) => ({ index: i, qty_received: Number(qty[i]) || 0 }));
    if (received.every((r) => r.qty_received === 0)) return;
    try {
      await createReceipt.mutateAsync({ order, received, photoFile: photo, notes });
      onOpenChange(false);
      onDone?.();
    } catch {
      /* hook toasts */
    }
  };

  const totalReceiving = items.reduce((s, _, i) => s + (Number(qty[i]) || 0), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden">
        {order && (
          <SheetShell
            eyebrow="Goods in"
            title="Receive delivery"
            description={order.order_number}
            footer={
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={submit}
                  disabled={createReceipt.isPending || totalReceiving === 0}
                  fullWidth
                >
                  <PackageCheck className="h-4 w-4 mr-1.5" />
                  {createReceipt.isPending ? 'Saving…' : 'Confirm receipt'}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="What arrived">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-white/55">Enter the quantity received for each line.</p>
                <button
                  type="button"
                  onClick={receiveAll}
                  className="text-[12px] text-elec-yellow/90 hover:text-elec-yellow touch-manipulation"
                >
                  Receive all
                </button>
              </div>
              <div className="space-y-2">
                {items.length === 0 && (
                  <p className="text-[13px] text-white/50">This PO has no line items.</p>
                )}
                {items.map((it, i) => {
                  const already = Number(it.received_qty || 0);
                  const out = outstanding(it);
                  return (
                    <div
                      key={`${it.name}-${i}`}
                      className="flex items-center gap-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-3 py-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white truncate">{it.name}</p>
                        <p className="text-[11px] text-white/45">
                          {Number(it.qty)} ordered
                          {already > 0 ? ` · ${already} already in` : ''}
                          {out === 0 ? ' · complete' : ''}
                        </p>
                      </div>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={out}
                        value={qty[i] ?? ''}
                        onChange={(e) => setQty((q) => ({ ...q, [i]: e.target.value }))}
                        className="w-16 h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-center text-[15px] tabular-nums focus:outline-none focus:border-elec-yellow touch-manipulation"
                      />
                    </div>
                  );
                })}
              </div>
            </FormCard>

            <FormCard eyebrow="Delivery note (optional)">
              <label className="flex items-center justify-center gap-2 h-12 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.03] text-[13px] text-white/70 cursor-pointer touch-manipulation hover:bg-white/[0.05]">
                {photo ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" /> {photo.name.slice(0, 28)}
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" /> Photograph the delivery note
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
              </label>
            </FormCard>

            <FormCard eyebrow="Notes">
              <Field label="Anything to flag? (shortages, damage…)">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${textareaClass} min-h-[70px]`}
                  placeholder="e.g. 1 drum short, back-ordered"
                />
              </Field>
            </FormCard>
          </SheetShell>
        )}
      </SheetContent>
    </Sheet>
  );
}
