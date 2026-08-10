import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * Numbering settings for invoices or quotes.
 *
 * Shared because the two are the same mechanism — `document_number_counters`
 * is keyed `(user_id, doc_type)`, so a quote sequence and an invoice sequence
 * differ only by that one string.
 *
 * The important control here is **next number**, not the prefix. An electrician
 * arriving from another system is already on invoice 450; if Elec-Mate starts
 * at 001 their books have two documents fighting over every number for the
 * next 450 invoices. Setting the start is what makes the app join an existing
 * sequence rather than compete with it.
 */
export type NumberingDocType = 'invoice' | 'quote';

interface Row {
  doc_type: string;
  prefix: string | null;
  pad_width: number;
  last_number: number;
  next_preview: string;
}

export function DocumentNumberingFields({ docType }: { docType: NumberingDocType }) {
  const [prefix, setPrefix] = useState('');
  const [padWidth, setPadWidth] = useState(3);
  const [nextNumber, setNextNumber] = useState<number | null>(null);
  const [serverPreview, setServerPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const noun = docType === 'invoice' ? 'invoice' : 'quote';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc('get_document_numbering');
      if (cancelled) return;
      if (error) {
        console.error('Could not load numbering settings', error);
        setLoading(false);
        return;
      }
      const row = (data as Row[] | null)?.find((r) => r.doc_type === docType);
      if (row) {
        setPrefix(row.prefix ?? '');
        setPadWidth(row.pad_width ?? 3);
        setNextNumber((row.last_number ?? 0) + 1);
        setServerPreview(row.next_preview);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [docType]);

  /*
   * Previewed locally as the user types, so the effect of a prefix is visible
   * before saving. Mirrors the SQL exactly — including the empty-prefix case,
   * where the legacy default applies rather than an empty string.
   */
  const preview = (() => {
    const n = nextNumber ?? 1;
    const fallback = docType === 'quote' ? `${new Date().getFullYear()}/` : 'Invoice/';
    const head = prefix.trim() ? prefix : fallback;
    const tail = padWidth > 0 ? String(n).padStart(padWidth, '0') : String(n);
    return `${head}${tail}`;
  })();

  const save = useCallback(async () => {
    if (nextNumber !== null && (!Number.isInteger(nextNumber) || nextNumber < 1)) {
      toast.error('Next number must be a whole number of 1 or more');
      return;
    }
    setSaving(true);
    const { data, error } = await supabase.rpc('set_document_numbering', {
      p_doc_type: docType,
      // Empty input means "use the default", which is NULL in the database —
      // not an empty prefix, which would produce a bare "001".
      p_prefix: prefix.trim() ? prefix : null,
      p_pad_width: padWidth,
      p_next_number: nextNumber,
    });
    setSaving(false);
    if (error) {
      toast.error(`Could not save ${noun} numbering`, { description: error.message });
      return;
    }
    setServerPreview(data as string);
    toast.success(`Next ${noun} will be ${data}`);
  }, [docType, prefix, padWidth, nextNumber, noun]);

  if (loading) {
    return <p className="text-[12.5px] text-white">Loading numbering…</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block text-[12px] font-medium text-white">Prefix</Label>
          <Input
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder={docType === 'quote' ? `${new Date().getFullYear()}/` : 'Invoice/'}
            maxLength={20}
            className="h-11 touch-manipulation"
          />
        </div>
        <div>
          <Label className="mb-1 block text-[12px] font-medium text-white">Next number</Label>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            value={nextNumber ?? ''}
            onChange={(e) => setNextNumber(e.target.value ? Number(e.target.value) : null)}
            className="h-11 touch-manipulation"
          />
        </div>
      </div>

      <div>
        <Label className="mb-1 block text-[12px] font-medium text-white">Digits</Label>
        <div className="flex gap-2">
          {[0, 3, 4, 5].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setPadWidth(w)}
              aria-pressed={padWidth === w}
              className={cn(
                'h-11 flex-1 touch-manipulation rounded-xl border text-[13px] transition-colors',
                padWidth === w
                  ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                  : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
              )}
            >
              {w === 0 ? 'None' : `${w}`}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[12px] text-white">
          Next {noun} will be{' '}
          <span className="font-semibold tabular-nums text-elec-yellow">{preview}</span>
        </p>
        {/* Said plainly, because it is the question everyone asks and getting
            it wrong would mean silently rewriting issued paperwork. */}
        <p className="mt-1 text-[11.5px] leading-relaxed text-white">
          {noun === 'invoice' ? 'Invoices' : 'Quotes'} you have already issued keep their existing
          numbers — this only affects new ones.
        </p>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="h-11 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-[filter] active:brightness-110 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save numbering'}
      </button>

      {serverPreview && serverPreview !== preview && (
        <p className="text-[11.5px] text-amber-400">
          Unsaved changes — saved value is {serverPreview}.
        </p>
      )}
    </div>
  );
}

export default DocumentNumberingFields;
