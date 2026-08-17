/**
 * ELE-1555 — set (or clear) the manual RAG flag on a customer.
 *
 * Deliberately three big targets and one optional line of context. Anything
 * longer belongs in the customer's notes; this is the thing you tap once,
 * standing in a van, after a job has gone badly.
 *
 * The computed payment reliability is shown alongside so it is obvious when
 * the manual flag is about to contradict the invoice history — that is a
 * legitimate thing to do (the money is fine, the person isn't) but the user
 * should be able to see they are doing it.
 */

import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import {
  MANUAL_LABEL,
  MANUAL_DESCRIPTION,
  resolveCustomerRisk,
  type RiskRating,
} from '@/lib/customerRisk';
import type { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';

const RATINGS: RiskRating[] = ['green', 'amber', 'red'];

const OPTION_TONE: Record<RiskRating, { on: string; dot: string }> = {
  green: { on: 'border-emerald-400 bg-emerald-500/[0.16]', dot: 'bg-emerald-400' },
  amber: { on: 'border-amber-400 bg-amber-500/[0.16]', dot: 'bg-amber-400' },
  red: { on: 'border-red-400 bg-red-500/[0.16]', dot: 'bg-red-400' },
};

export interface CustomerRiskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName: string;
  /** Current manual flag, if any. */
  value?: RiskRating | null;
  reason?: string | null;
  /** Computed from invoice history — shown for contrast, never edited here. */
  paymentReliability?: ReliabilityLevel | null;
  onSave: (rating: RiskRating | null, reason: string) => Promise<void> | void;
}

export const CustomerRiskSheet = ({
  open,
  onOpenChange,
  customerName,
  value,
  reason,
  paymentReliability,
  onSave,
}: CustomerRiskSheetProps) => {
  const [rating, setRating] = useState<RiskRating | null>(value ?? null);
  const [note, setNote] = useState(reason ?? '');
  const [saving, setSaving] = useState(false);
  const { selection } = useHaptic();

  // Re-seed whenever the sheet reopens or the underlying customer changes.
  // Without this, opening the sheet on a second customer would show the first
  // one's flag — the component stays mounted between opens.
  useEffect(() => {
    if (open) {
      setRating(value ?? null);
      setNote(reason ?? '');
    }
  }, [open, value, reason]);

  // What the invoice history says on its own, ignoring any manual flag.
  const computed = resolveCustomerRisk({ paymentReliability });

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(rating, note.trim());
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  const dirty = (value ?? null) !== rating || (reason ?? '') !== note;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl p-0"
      >
        <div className="flex h-full flex-col bg-background">
          {/* Header */}
          <div className="shrink-0 border-b border-white/[0.08] px-4 pb-4 pt-5">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">
              Rate this customer
            </h2>
            <p className="mt-1 truncate text-[13px] text-white">{customerName}</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            {/* What the invoices already say */}
            {computed.rating && (
              <div className="mb-5 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', computed.dotClass)} />
                  <span className="text-[13px] font-medium text-white">
                    Invoice history says: {computed.label}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-white">
                  Worked out from how they've paid. Your own rating below overrides it
                  everywhere in the app.
                </p>
              </div>
            )}

            <span className={labelCn}>Your rating</span>
            <div className="space-y-2.5">
              {RATINGS.map((r) => {
                const selected = rating === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      selection();
                      setRating(selected ? null : r);
                    }}
                    aria-pressed={selected}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all touch-manipulation active:scale-[0.99]',
                      selected
                        ? OPTION_TONE[r].on
                        : 'border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.07]'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                        OPTION_TONE[r].dot
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-white">
                        {MANUAL_LABEL[r]}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                        {MANUAL_DESCRIPTION[r]}
                      </span>
                    </span>
                    {selected && (
                      <span className="mt-0.5 shrink-0 text-[12px] font-semibold text-elec-yellow">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-2.5 text-[12px] text-white">
              Tap the selected one again to clear it and go back to the automatic
              payment rating.
            </p>

            <div className="mt-6">
              <label htmlFor="risk-reason" className={labelCn}>
                Why (optional)
              </label>
              <Textarea
                id="risk-reason"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 200))}
                placeholder="Cash only — never pays on invoice"
                className={cn(textareaCn, 'min-h-[80px]')}
              />
              <p className="mt-1.5 text-[11.5px] text-white">
                {note.length}/200 · only you can see this
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="shrink-0 border-t border-white/[0.08] bg-background px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex gap-2.5">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 flex-1 touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !dirty}
                className="h-11 flex-1 bg-elec-yellow font-semibold text-black touch-manipulation hover:bg-elec-yellow/90"
              >
                {saving ? 'Saving…' : rating ? 'Save rating' : 'Clear rating'}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
