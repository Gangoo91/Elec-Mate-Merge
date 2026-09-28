import React, { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ReceiptText, Download, Loader2, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Quote, QuoteItem } from '@/types/quote';
import { FIELD_UNDERLINE } from '@/components/electrician/shared/surfaces';
import {
  buildCreditNote,
  creditEverything,
  creditNoteReference,
  remainingToCredit,
  REFUSAL_MESSAGE,
  type CreditNoteLine,
} from '@/utils/creditNote';
import {
  useCreditNotesForInvoice,
  useRaiseCreditNote,
  useCreditNotePdf,
  useVoidCreditNote,
} from '@/hooks/useCreditNotes';

/**
 * Raise a credit note against an invoice — ELE-1704.
 *
 * The destination for advice the app has given for a long time without
 * offering anywhere to act on it: `InvoicesPage` warns twice that a credit
 * note is the correct instrument, and `mate-documents.ts` refuses the edit
 * outright three times and says the same.
 *
 * A bottom sheet, not a dialog: this is reached on a phone, on site, and a
 * centred modal cannot be worked one-handed.
 */

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

interface Props {
  invoice: Quote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRaised?: () => void;
}

export const CreditNoteSheet: React.FC<Props> = ({ invoice, open, onOpenChange, onRaised }) => {
  const { notes, alreadyCredited, isLoading } = useCreditNotesForInvoice(invoice?.id);
  const raise = useRaiseCreditNote();
  const makePdf = useCreditNotePdf();
  const [pdfBusyId, setPdfBusyId] = useState<string | null>(null);
  const voidNote = useVoidCreditNote();
  const [voidingId, setVoidingId] = useState<string | null>(null);

  const [reason, setReason] = useState('');
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmVoidId, setConfirmVoidId] = useState<string | null>(null);

  /*
   * Reset everything when the sheet is pointed at a DIFFERENT invoice.
   *
   * This component is mounted permanently by `InvoicesPage` — it is not
   * remounted per invoice — so without this, state written against one
   * invoice survived into the next. Two ways that bit:
   *
   *  • `selected` held the PREVIOUS invoice's line ids. Filtering the new
   *    invoice's lines by them matched nothing, so a perfectly creditable
   *    invoice refused with "already been credited in full" while the panel
   *    above it showed what was still creditable.
   *  • `reason` carried over, so a reason typed for one client's invoice
   *    could be raised onto another's.
   */
  const invoiceId = invoice?.id;
  useEffect(() => {
    setReason('');
    setSelected(null);
    setConfirmVoidId(null);
  }, [invoiceId]);

  const items: QuoteItem[] = useMemo(() => invoice?.items ?? [], [invoice]);
  const invoiceTotal = Number(invoice?.total) || 0;
  const remaining = remainingToCredit(invoiceTotal, alreadyCredited);

  /** null means "everything" — the common case, and one fewer decision. */
  const lines: CreditNoteLine[] = useMemo(() => {
    const all = creditEverything(items);
    if (selected === null) return all;
    return all.filter((l) => selected.has(l.sourceItemId));
  }, [items, selected]);

  /*
   * Priced with the SAME function that will run on save, so the figure on
   * the button is the figure that gets written. A preview computed a second
   * way is a preview that can disagree with the result.
   */
  const preview = useMemo(
    () =>
      invoice
        ? buildCreditNote(
            {
              isInvoice: Boolean(invoice.invoice_number),
              total: invoiceTotal,
              settings: invoice.settings,
              items,
            },
            lines,
            reason,
            alreadyCredited
          )
        : null,
    [invoice, invoiceTotal, items, lines, reason, alreadyCredited]
  );

  const toggle = (id: string) => {
    const base = selected ?? new Set(creditEverything(items).map((l) => l.sourceItemId));
    const next = new Set(base);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const isOn = (id: string) => (selected === null ? true : selected.has(id));

  const submit = async () => {
    if (!invoice || !preview?.ok) return;
    setBusy(true);
    try {
      const saved = await raise({ invoice: { ...invoice, items }, lines, reason });
      if (saved) {
        setReason('');
        setSelected(null);
        onOpenChange(false);
        onRaised?.();
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex h-full flex-col bg-background">
          <div className="flex items-start gap-3 border-b border-white/[0.08] p-4 pr-14">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-elec-yellow/[0.2] bg-elec-yellow/[0.12]">
              <ReceiptText className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-white">Raise a credit note</h2>
              <p className="mt-0.5 text-[12px] text-white">
                {creditNoteReference(invoice?.invoice_number, invoice?.invoice_date)}
              </p>
            </div>
            {/* No close button here — `SheetContent` renders one. A second
                was a duplicate control in the same corner. */}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* What is left. Stated up front because it is the constraint. */}
            <div className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-white">Invoice total</span>
                <span className="text-[13px] font-semibold text-white tabular-nums">
                  {gbp(invoiceTotal)}
                </span>
              </div>
              {alreadyCredited > 0 && (
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-[12px] text-white">
                    Already credited ({notes.filter((n) => n.status !== 'void').length})
                  </span>
                  <span className="text-[13px] text-white tabular-nums">
                    −{gbp(alreadyCredited)}
                  </span>
                </div>
              )}
              <div className="mt-1 flex items-baseline justify-between border-t border-white/[0.08] pt-1">
                <span className="text-[12px] font-semibold text-white">Still creditable</span>
                <span className="text-[15px] font-semibold text-elec-yellow tabular-nums">
                  {gbp(remaining)}
                </span>
              </div>
            </div>

            {/*
              ELE-1704 — the notes already raised, each openable.
              Without this the electrician can raise a credit note and then
              have no way to reach the document again, which is the one thing
              the customer actually needs sending.
            */}
            {notes.length > 0 && (
              <div>
                <p className="mb-2 text-[12px] font-medium text-white">
                  Already raised against this invoice
                </p>
                <div className="overflow-hidden rounded-xl border border-white/[0.10]">
                  {notes.map((n) => (
                    <div
                      key={n.id}
                      className="flex min-h-[56px] items-center gap-3 border-b border-white/[0.06] px-3 py-2 last:border-b-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-medium text-white">
                          {n.credit_note_number}
                          {n.status === 'void' && (
                            <span className="ml-2 text-[11px] font-semibold text-white/80">
                              Voided
                            </span>
                          )}
                        </p>
                        {n.reason && <p className="truncate text-[12px] text-white">{n.reason}</p>}
                      </div>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] text-white tabular-nums',
                          // A voided note gave nothing back, so its figure is
                          // struck through rather than removed: the number is
                          // spent and the row is part of the trail.
                          n.status === 'void' && 'line-through opacity-60'
                        )}
                      >
                        {gbp(Number(n.total) || 0)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Download ${n.credit_note_number}`}
                        disabled={pdfBusyId === n.id}
                        onClick={async () => {
                          if (!invoice) return;
                          setPdfBusyId(n.id);
                          try {
                            // No lines passed: the hook reads the note's
                            // OWN stored lines and settings. What is ticked
                            // on this screen has nothing to do with a credit
                            // note that was already raised.
                            const url = await makePdf(n, { ...invoice, items } as Parameters<
                              typeof makePdf
                            >[1]);
                            if (url) window.open(url, '_blank', 'noopener');
                          } finally {
                            setPdfBusyId(null);
                          }
                        }}
                        className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full hover:bg-white/[0.08] disabled:opacity-50"
                      >
                        {pdfBusyId === n.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <Download className="h-4 w-4 text-white" />
                        )}
                      </button>
                      {/*
                        Voiding is the ONLY remedy for a credit note raised in
                        error — the table has no delete policy, deliberately.
                        Without this a mistaken credit permanently reduced
                        what could be credited against the invoice.
                      */}
                      {n.status !== 'void' &&
                        (confirmVoidId === n.id ? (
                          /*
                            Confirm in place rather than instantly.
                            There is no un-void: the button sits beside
                            Download, both 44px, and a mis-tap on a phone
                            would permanently cancel a document that has
                            been sent to a customer.
                          */
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setConfirmVoidId(null)}
                              className="h-11 touch-manipulation rounded-full px-3 text-[13px] text-white hover:bg-white/[0.08]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={voidingId === n.id}
                              onClick={async () => {
                                setVoidingId(n.id);
                                try {
                                  await voidNote(n);
                                  setConfirmVoidId(null);
                                } finally {
                                  setVoidingId(null);
                                }
                              }}
                              className="h-11 touch-manipulation rounded-full bg-red-500/20 px-3 text-[13px] font-semibold text-red-300 hover:bg-red-500/30 disabled:opacity-50"
                            >
                              {voidingId === n.id ? 'Voiding…' : 'Void'}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Void ${n.credit_note_number}`}
                            onClick={() => setConfirmVoidId(n.id)}
                            className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full hover:bg-white/[0.08]"
                          >
                            <Ban className="h-4 w-4 text-white" />
                          </button>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-[12px] font-medium text-white">
                What are you crediting? Everything is selected by default.
              </p>
              <div className="rounded-xl border border-white/[0.10] overflow-hidden">
                {items.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => toggle(it.id)}
                    className={cn(
                      'flex min-h-[56px] w-full items-center gap-3 border-b border-white/[0.06] px-3 py-2 text-left last:border-b-0 touch-manipulation transition-colors',
                      isOn(it.id) ? 'bg-elec-yellow/[0.06]' : 'hover:bg-white/[0.03]'
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'h-5 w-5 shrink-0 rounded border flex items-center justify-center text-[11px] font-bold',
                        isOn(it.id)
                          ? 'bg-elec-yellow border-elec-yellow text-black'
                          : 'border-white/[0.25] text-transparent'
                      )}
                    >
                      ✓
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[14px] text-white">
                      {it.description || 'Item'}
                    </span>
                    <span className="shrink-0 text-[13px] text-white tabular-nums">
                      {gbp((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="credit-reason"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                Reason
              </label>
              <input
                id="credit-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Second circuit not required"
                className={cn(FIELD_UNDERLINE, 'w-full')}
              />
            </div>
          </div>

          <div className="border-t border-white/[0.08] p-4">
            {/*
             * The refusal is shown BEFORE the button, not after a failed tap.
             * The rules that can refuse — over-crediting, nothing left — are
             * knowable now, and letting someone commit to an action that
             * cannot succeed is the opposite of helpful.
             */}
            {preview && !preview.ok && preview.refusal && (
              <p className="mb-2 text-[12px] font-medium text-amber-400">
                {REFUSAL_MESSAGE[preview.refusal]}
              </p>
            )}
            <Button
              onClick={submit}
              disabled={busy || isLoading || !preview?.ok}
              className="h-11 w-full bg-elec-yellow text-black font-semibold hover:brightness-110 touch-manipulation"
            >
              {preview?.ok
                ? `Raise credit note for ${gbp(preview.draft!.total)}`
                : 'Raise credit note'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreditNoteSheet;
