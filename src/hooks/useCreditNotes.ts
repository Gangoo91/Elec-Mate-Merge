import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isPermanentPdfUrl } from '@/utils/pdfUrl';
import type { Json } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { QuoteItem, QuoteSettings } from '@/types/quote';
import {
  buildCreditNote,
  creditEverything,
  creditNoteReference,
  sumCreditsAgainst,
  REFUSAL_MESSAGE,
  type CreditNoteLine,
} from '@/utils/creditNote';

/**
 * Credit notes against an invoice — ELE-1704.
 *
 * All the accounting lives in `utils/creditNote.ts`; this is the plumbing.
 * The one rule worth restating here: **`alreadyCredited` is read from the
 * database immediately before the build, never carried in from a screen**.
 * A stale figure fails OPEN — the cap is computed against it, so a number
 * from thirty seconds ago lets a second credit through that a fresh read
 * would refuse.
 */

export interface CreditNoteRow {
  id: string;
  credit_note_number: string;
  invoice_id: string;
  invoice_number: string | null;
  invoice_date: string | null;
  total: number;
  cis_amount: number;
  status: 'draft' | 'issued' | 'void';
  reason: string | null;
  created_at: string;
}

/**
 * Render a credit note to PDF — ELE-1704.
 *
 * Reuses `generate-pdf-monkey` in `credit_note_mode`: a credit note has the
 * same lines, VAT treatment and CIS as an invoice, so the invoice payload
 * builder is reused rather than reimplemented.
 *
 * 🔴 **Everything printed comes from the STORED row, never from the screen.**
 *
 * The first version of this took the lines from the sheet's current tick
 * state and the settings from the live invoice. Both are wrong, and wrong in
 * a way that looks fine: opening the sheet (everything selected by default)
 * and downloading a credit note that had credited ONE line would have
 * rendered every line against that note's saved total. The migration stores
 * `lines` and `settings` on the row for exactly this reason — "so the
 * document can be re-rendered exactly as issued even if the invoice or the
 * company's rates change afterwards" — and the only correct source is that
 * row. (The function's stored-vs-recomputed guard would have caught it and
 * refused, so the failure mode was a dead button rather than a false
 * document. It was still broken.)
 */
export function useCreditNotePdf() {
  const { user } = useAuth();

  return useCallback(
    async (note: CreditNoteRow, invoice: RaiseArgs['invoice']): Promise<string | null> => {
      if (!user?.id) return null;

      const fail = (description: string) => {
        toast({
          title: 'Could not create the credit note PDF',
          description,
          variant: 'destructive',
        });
        return null;
      };

      /*
       * Re-read the note. `useCreditNotesForInvoice` deliberately does not
       * select `lines`/`settings` — they are heavy jsonb and the list has no
       * use for them — so the document is fetched here, at the one moment it
       * is needed.
       */
      const { data: stored, error: storedErr } = await supabase
        .from('credit_notes')
        .select('lines, settings, pdf_url')
        .eq('id', note.id)
        .single();

      if (storedErr || !stored) {
        return fail('We could not load this credit note. Try again.');
      }

      const storedLines = (stored.lines ?? []) as unknown[];
      if (!storedLines.length) {
        return fail('This credit note has no lines recorded against it.');
      }

      // A permanent URL is one of OUR storage URLs. A PDFMonkey signed link
      // dies after an hour (ELE-1330), so a cached one is never reusable.
      if (isPermanentPdfUrl(stored.pdf_url)) return stored.pdf_url as string;

      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return fail('You have been signed out. Sign in and try again.');

      const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          credit_note_mode: true,
          /*
           * The credited lines stand in for the invoice's items, and the
           * note's OWN settings stand in for the invoice's — the VAT rate
           * and CIS status as they were when the credit was raised.
           */
          quote: {
            ...invoice,
            items: storedLines,
            settings: stored.settings ?? invoice.settings,
            /*
             * 🔴 Cleared deliberately. `generate-pdf-monkey` MERGES
             * `items` with `additional_invoice_items` (ELE-970), so any
             * user-added invoice line riding along on the spread would be
             * printed on the credit note on top of the lines actually
             * credited — and the stored-vs-recomputed guard would then
             * refuse the document. No live invoice carries them today
             * (0 of 1,165), which is exactly why it would be missed.
             */
            additional_invoice_items: [],
          },
          companyProfile: company,
          creditNote: {
            number: note.credit_note_number,
            /*
             * The invoice number and date come off the CREDIT NOTE, not the
             * live invoice. They are denormalised onto the row precisely so
             * the statutory "credits invoice X dated Y" survives the invoice
             * being renumbered afterwards — reading them live would undo
             * that the moment it mattered.
             */
            reference: creditNoteReference(
              note.invoice_number ?? invoice.invoice_number,
              note.invoice_date ?? invoice.invoice_date
            ),
            issuedAt: note.created_at,
            reason: note.reason,
            total: Number(note.total) || 0,
            cisAmount: Number(note.cis_amount) || 0,
            /*
             * "Refundable to you" vs "settle the invoice net of this credit"
             * — the document says something different in each case, so this
             * has to be right.
             *
             * It is NOT "has anything been paid". £500 paid on a £1,480
             * invoice with £120 credited still leaves £860 owing: nothing
             * goes back. Money is only refundable where what has been paid
             * exceeds what is left owing AFTER the credit.
             */
            alreadyPaid:
              Number((invoice as { total_paid?: number }).total_paid) >
              (Number(invoice.total) || 0) - (Number(note.total) || 0) + 0.005,
          },
        },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      /*
       * The function's own refusals — no template configured yet, or a saved
       * total that disagrees with its lines — arrive as a message in `data`,
       * not as a transport error. Surfaced verbatim: "could not generate"
       * would hide the fact that one of them needs a person to fix something.
       */
      const message =
        (error as { message?: string })?.message || (data as { error?: string })?.error;
      if (message) return fail(message);

      /*
       * PDFMonkey is ASYNCHRONOUS. The create call usually comes back with a
       * documentId and no URL yet — taking `downloadUrl` from the first
       * response and giving up is why this button would have failed most of
       * the time. Same poll the invoice path uses.
       */
      let url: string | undefined = data?.downloadUrl;
      const documentId: string | undefined = data?.documentId;
      if (!url && documentId) {
        for (let i = 0; i < 45 && !url; i++) {
          await new Promise((res) => setTimeout(res, 2000));
          try {
            const { data: poll } = await supabase.functions.invoke('generate-pdf-monkey', {
              body: { documentId, mode: 'status' },
              headers: { Authorization: `Bearer ${session.access_token}` },
            });
            if (poll?.downloadUrl) url = poll.downloadUrl;
          } catch {
            // Network blip — keep polling.
          }
        }
      }

      if (!url) return fail('The document is taking longer than expected. Try again shortly.');

      /*
       * Only cache a URL that will still work later. Writing a PDFMonkey
       * signed link into `pdf_url` would store something that returns an S3
       * AccessDenied page an hour from now.
       */
      if (isPermanentPdfUrl(url)) {
        await supabase.from('credit_notes').update({ pdf_url: url }).eq('id', note.id);
      }
      return url;
    },
    [user?.id]
  );
}

/** Credit notes already raised against one invoice. */
export function useCreditNotesForInvoice(invoiceId?: string) {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['credit-notes', user?.id, invoiceId],
    enabled: Boolean(user?.id && invoiceId),
    queryFn: async (): Promise<CreditNoteRow[]> => {
      const { data: rows, error } = await supabase
        .from('credit_notes')
        .select(
          'id, credit_note_number, invoice_id, invoice_number, invoice_date, total, cis_amount, status, reason, created_at'
        )
        .eq('invoice_id', invoiceId!)
        .order('created_at', { ascending: true });

      // Fail CLOSED on a read error: returning [] would report "nothing
      // credited yet" and let the full value be credited again. An empty
      // list has to mean "there are none", not "we could not tell".
      if (error) throw error;
      return (rows ?? []) as CreditNoteRow[];
    },
  });

  const notes = data ?? [];
  const alreadyCredited = sumCreditsAgainst(notes);

  return { notes, alreadyCredited, isLoading, refetch };
}

interface RaiseArgs {
  invoice: {
    id: string;
    invoice_number?: string | null;
    invoice_date?: Date | string | null;
    total: number;
    settings: QuoteSettings | null | undefined;
    items: QuoteItem[];
  };
  /** Omit to credit the whole invoice. */
  lines?: CreditNoteLine[];
  reason: string;
}

export function useRaiseCreditNote() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useCallback(
    async ({ invoice, lines, reason }: RaiseArgs): Promise<CreditNoteRow | null> => {
      if (!user?.id) return null;

      /*
       * Read what is already credited HERE, not from a prop. See the note at
       * the top: a figure held in a component is stale the moment another
       * tab, or the same user on their phone, raises a credit.
       */
      const { data: existing, error: readErr } = await supabase
        .from('credit_notes')
        .select('total, status')
        .eq('invoice_id', invoice.id);

      if (readErr) {
        toast({
          title: 'Could not raise the credit note',
          description:
            'We could not check what has already been credited against this invoice. Try again.',
          variant: 'destructive',
        });
        return null;
      }

      // Same function the list uses — the screen and the save cannot disagree.
      const alreadyCredited = sumCreditsAgainst(existing ?? []);

      const result = buildCreditNote(
        {
          isInvoice: Boolean(invoice.invoice_number),
          total: Number(invoice.total) || 0,
          settings: invoice.settings,
          items: invoice.items,
        },
        lines ?? creditEverything(invoice.items),
        reason,
        alreadyCredited
      );

      if (!result.ok || !result.draft) {
        toast({
          title: 'Credit note not raised',
          description: result.refusal ? REFUSAL_MESSAGE[result.refusal] : 'Nothing to credit.',
          variant: 'destructive',
        });
        return null;
      }

      // Numbering is server-side and atomic (ELE-1466), so two tabs cannot
      // mint the same number.
      const { data: number, error: numErr } = await supabase.rpc('generate_credit_note_number');
      if (numErr || !number) {
        toast({
          title: 'Could not allocate a credit note number',
          description: 'Nothing was saved. Try again.',
          variant: 'destructive',
        });
        return null;
      }

      const draft = result.draft;
      const { data: saved, error: saveErr } = await supabase
        .from('credit_notes')
        .insert({
          user_id: user.id,
          invoice_id: invoice.id,
          invoice_number: invoice.invoice_number ?? null,
          invoice_date: invoice.invoice_date ? new Date(invoice.invoice_date).toISOString() : null,
          credit_note_number: number as string,
          subtotal: draft.subtotal,
          vat_amount: draft.vatAmount,
          total: draft.total,
          cis_amount: draft.cisAmount,
          reverse_charge: draft.reverseCharge,
          reason: draft.reason || null,
          /*
           * Both columns are `jsonb`, typed `Json` by the generated types.
           * A TypeScript INTERFACE is never assignable to `Json` — interfaces
           * carry no implicit index signature — so the cast is structural,
           * not a shrug: these are plain data objects and jsonb stores them
           * verbatim. Same reason `useCompanyProfile` casts `worker_rates`.
           */
          lines: draft.lines as unknown as Json,
          settings: draft.settings as unknown as Json,
          status: 'draft',
        })
        .select(
          'id, credit_note_number, invoice_id, invoice_number, invoice_date, total, cis_amount, status, reason, created_at'
        )
        .single();

      if (saveErr || !saved) {
        toast({
          title: 'Could not save the credit note',
          description: saveErr?.message ?? 'Please try again.',
          variant: 'destructive',
        });
        return null;
      }

      queryClient.invalidateQueries({ queryKey: ['credit-notes', user.id, invoice.id] });
      // The invoice-list badges read a different query. Invalidated here as
      // well as by the page, so any other caller cannot leave them stale.
      queryClient.invalidateQueries({ queryKey: ['credit-note-totals', user.id] });

      toast({
        title: `Credit note ${saved.credit_note_number} raised`,
        description: creditNoteReference(invoice.invoice_number, invoice.invoice_date),
      });

      return saved as CreditNoteRow;
    },
    [user?.id, queryClient]
  );
}

/**
 * Credit totals for EVERY invoice, in one query — for the invoice list.
 *
 * The list needs "has this been credited, and by how much" on up to a
 * thousand-odd cards. Asking per card would be a query per row; this asks
 * once and hands back a lookup.
 *
 * ⚠️ PAGED deliberately. An unbounded PostgREST `.select()` silently stops at
 * 1000 rows — it does not error, it just returns the first page. This account
 * already holds 1,160 invoices, so a flat select would one day start
 * under-reporting credits with no signal at all. The loop runs until a page
 * comes back short.
 */
export function useCreditNoteTotals() {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['credit-note-totals', user?.id],
    enabled: Boolean(user?.id),
    staleTime: 30_000,
    queryFn: async (): Promise<Record<string, { total: number; count: number }>> => {
      const PAGE = 1000;
      const rows: { invoice_id: string; total: number | string; status: string }[] = [];

      for (let from = 0; ; from += PAGE) {
        const { data: page, error } = await supabase
          .from('credit_notes')
          .select('invoice_id, total, status')
          .eq('user_id', user!.id)
          .range(from, from + PAGE - 1);

        // NOT fail-closed, and it cannot be: react-query hands back
        // undefined on a throw, which this hook renders as an empty map —
        // i.e. "nothing credited" on every card. That is tolerable ONLY
        // because this feeds a badge and nothing else. The cap that actually
        // matters is enforced in `useRaiseCreditNote`, which re-reads the
        // credits fresh and fails closed there.
        if (error) throw error;
        rows.push(...((page ?? []) as typeof rows));
        if (!page || page.length < PAGE) break;
      }

      const byInvoice: Record<string, { total: number; count: number }> = {};
      for (const r of rows) {
        // Same rule as `sumCreditsAgainst`: a void note has given nothing back.
        if (r.status === 'void') continue;
        const bucket = (byInvoice[r.invoice_id] ??= { total: 0, count: 0 });
        bucket.total += Number(r.total) || 0;
        bucket.count += 1;
      }
      for (const k of Object.keys(byInvoice)) {
        byInvoice[k].total = Math.round(byInvoice[k].total * 100) / 100;
      }
      return byInvoice;
    },
  });

  return { creditedByInvoice: data ?? {}, isLoading, refetch };
}

/**
 * Void a credit note — ELE-1704.
 *
 * The only remedy for one raised in error, and until now there was none: a
 * mistaken credit permanently reduced what could still be credited against
 * the invoice, with nothing in the UI to undo it.
 *
 * VOID, never delete. The table has no DELETE policy on purpose — a credit
 * note issued to a customer is an accounting record. Voiding leaves the
 * number spent and the trail intact, and `sumCreditsAgainst` already ignores
 * voided rows, so the value returns to the invoice the moment this lands.
 */
export function useVoidCreditNote() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useCallback(
    async (note: CreditNoteRow): Promise<boolean> => {
      if (!user?.id) return false;

      const { error } = await supabase
        .from('credit_notes')
        .update({ status: 'void', updated_at: new Date().toISOString() })
        .eq('id', note.id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: 'Could not void the credit note',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      queryClient.invalidateQueries({ queryKey: ['credit-notes', user.id, note.invoice_id] });
      queryClient.invalidateQueries({ queryKey: ['credit-note-totals', user.id] });

      toast({
        title: `${note.credit_note_number} voided`,
        description: 'Its value is creditable against the invoice again.',
      });
      return true;
    },
    [user?.id, queryClient]
  );
}
