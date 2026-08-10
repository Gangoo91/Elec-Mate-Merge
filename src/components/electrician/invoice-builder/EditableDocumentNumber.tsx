import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * Inline editor for an invoice or quote number.
 *
 * Two things make this less trivial than it looks.
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
 * sparse update carrying `Id` + `SyncToken`, so the DocNumber is amended on
 * the invoice that already exists. The warning stays, because the change does
 * not reach their books until they sync again, and until then the two systems
 * disagree.
 */
export function EditableDocumentNumber({
  quoteId,
  value,
  field,
  syncedProvider,
  onSaved,
  className,
}: {
  quoteId: string;
  value: string;
  field: 'invoice_number' | 'quote_number';
  /** e.g. "quickbooks" when this document has been pushed to an accounts package. */
  syncedProvider?: string | null;
  onSaved?: (next: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  const noun = field === 'invoice_number' ? 'Invoice' : 'Quote';

  const save = async () => {
    const next = draft.trim();
    if (!next) {
      toast.error(`${noun} number cannot be empty`);
      return;
    }
    if (next === value) {
      setEditing(false);
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
        toast.error(`You already have a ${noun.toLowerCase()} numbered ${next}`, {
          description: 'Numbers must be unique — pick another.',
        });
      } else {
        toast.error(`Could not change the ${noun.toLowerCase()} number`, {
          description: error.message,
        });
      }
      return;
    }

    setEditing(false);
    onSaved?.(next);
    toast.success(`${noun} number changed to ${next}`, {
      description: syncedProvider
        ? `Re-sync to update it in ${syncedProvider === 'quickbooks' ? 'QuickBooks' : syncedProvider}.`
        : undefined,
    });
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => {
          setDraft(value);
          setEditing(true);
        }}
        title={`Edit ${noun.toLowerCase()} number`}
        className={cn(
          'min-h-11 text-left underline-offset-4 transition-colors touch-manipulation hover:underline',
          className
        )}
      >
        {value}
      </button>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <input
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') setEditing(false);
          }}
          maxLength={50}
          className="h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
        />
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="h-11 shrink-0 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="h-11 shrink-0 px-2 text-[13px] font-medium text-white touch-manipulation"
        >
          Cancel
        </button>
      </div>
      {syncedProvider && (
        <p className="text-[11.5px] leading-relaxed text-amber-400">
          Already sent to {syncedProvider === 'quickbooks' ? 'QuickBooks' : syncedProvider} — the
          number there stays as it is until you sync again.
        </p>
      )}
    </div>
  );
}

export default EditableDocumentNumber;
