import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Change the number on a single quote or invoice.
 *
 * Lives in the Actions sheet next to Download PDF, because that is where people
 * already go to do something to a document. It used to be a tappable heading in
 * the invoice list, which had two problems: nobody discovers that a heading is
 * editable, and that list only ever renders invoices — so quotes, which need
 * this just as much, had no way in at all.
 *
 * Two things make the write less trivial than it looks.
 *
 * **Uniqueness.** `quotes_user_invoice_number_uniq` / `..._quote_number_uniq`
 * are partial unique indexes per user, so a collision comes back as Postgres
 * 23505 rather than being silently accepted. That constraint is not decoration:
 * HMRC expects a unique sequential identifier per invoice, and a duplicate is
 * what QuickBooks rejects with fault 6140 — the collision behind Sean
 * Warrender's duplicate invoices.
 *
 * **Documents already in an accounting system.** Renumbering one used to be
 * unsafe, because the QuickBooks sync had no update path and every re-sync
 * created a second invoice. That is fixed (ELE-1523) — a re-sync now sends a
 * sparse update carrying `Id` + `SyncToken`, so the DocNumber is amended on the
 * invoice that already exists. The warning stays, because the change does not
 * reach their books until they sync again, and until then the two systems
 * disagree.
 */
export function DocumentNumberSheet({
  open,
  onOpenChange,
  quoteId,
  value,
  field,
  syncedProvider,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quoteId: string;
  value: string;
  field: 'invoice_number' | 'quote_number';
  /** e.g. "quickbooks" when this document has been pushed to an accounts package. */
  syncedProvider?: string | null;
  onSaved?: (next: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  const noun = field === 'invoice_number' ? 'invoice' : 'quote';
  const providerLabel = syncedProvider === 'quickbooks' ? 'QuickBooks' : syncedProvider;

  // Re-seed each time it opens, so cancelling and reopening does not leave a
  // stale draft from the previous attempt in the field.
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const save = async () => {
    const next = draft.trim();
    if (!next) {
      toast.error(`The ${noun} number cannot be empty`);
      return;
    }
    if (next === value) {
      onOpenChange(false);
      return;
    }

    setSaving(true);
    // Branched on the literal rather than a computed key. `{ [field]: next }`
    // widens to a plain index signature, which opts the whole update out of the
    // generated column types — the same shape of hole that let the Near Miss
    // insert ship two columns that did not exist.
    const { error } =
      field === 'invoice_number'
        ? await supabase.from('quotes').update({ invoice_number: next }).eq('id', quoteId)
        : await supabase.from('quotes').update({ quote_number: next }).eq('id', quoteId);
    setSaving(false);

    if (error) {
      // 23505 is the per-user unique index. Anything else is unexpected and
      // shown as-is rather than guessed at.
      if (error.code === '23505') {
        toast.error(`You already have a ${noun} numbered ${next}`, {
          description: 'Numbers must be unique — pick another.',
        });
      } else {
        toast.error(`Could not change the ${noun} number`, { description: error.message });
      }
      return;
    }

    onOpenChange(false);
    onSaved?.(next);
    toast.success(`Changed to ${next}`, {
      description: providerLabel ? `Re-sync to update it in ${providerLabel}.` : undefined,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto overscroll-contain border-t border-white/[0.10]"
      >
        <VisuallyHidden>
          <SheetTitle>Change {noun} number</SheetTitle>
          <SheetDescription>Edit the number on this {noun}.</SheetDescription>
        </VisuallyHidden>

        <div className="w-full px-4 sm:px-6 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
          <div className="mx-auto h-1 w-10 rounded-full bg-white/[0.15] mb-4" />

          <div className="pb-3 mb-4 border-b border-white/[0.08]">
            <p className="text-[15px] font-semibold text-white">
              Change {noun} number
            </p>
            <p className="text-[12px] text-white mt-0.5">
              Currently <span className="font-mono">{value || '—'}</span>
            </p>
          </div>

          <label
            htmlFor="document-number-input"
            className="mb-1 block text-[12px] font-medium text-white"
          >
            New number
          </label>
          <input
            id="document-number-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
            }}
            maxLength={50}
            enterKeyHint="done"
            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
          />

          <p className="mt-2 text-[11.5px] leading-relaxed text-white">
            Only this {noun} changes. To move the whole sequence, use{' '}
            {noun === 'invoice' ? 'Invoice' : 'Quote'} numbering in Settings → Business.
          </p>

          {providerLabel && (
            <p className="mt-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3 text-[11.5px] leading-relaxed text-amber-400">
              Already sent to {providerLabel} — the number there stays as it is until you sync
              again.
            </p>
          )}

          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-12 flex-1 touch-manipulation rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="h-12 flex-1 touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-[filter,transform] active:scale-[0.98] active:brightness-110 disabled:bg-white/[0.08] disabled:text-white/70"
            >
              {saving ? 'Saving…' : 'Save number'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DocumentNumberSheet;
