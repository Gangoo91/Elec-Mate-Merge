-- ELE-1704 — credit notes.
--
-- Once an invoice is sent it cannot simply be edited. The correct instrument
-- is a credit note: a separate document that formally reduces or cancels the
-- original. The app has recommended one in five places and offered no way to
-- raise it — `InvoiceItemsStep` twice as a warning, and `mate-documents.ts`
-- three times as a flat refusal.
--
-- ── Why its own table, and not another role on `quotes` ──────────────────
--
-- `public.quotes` already carries BOTH quotes and invoices (1,160 of its rows
-- have an invoice_number). ELE-1701 documents the cost of that overloading.
-- Adding a third document type with NEGATIVE value would be worse than
-- untidy: every existing sum over `quotes` — the dashboard, the "invoiced"
-- figure, the revenue charts, the CIS base — was written assuming the rows
-- are positive. A credit note in that table silently changes all of them, and
-- finding each one afterwards is harder than keeping them separate now.
--
-- So: its own table, referencing the invoice by id. Nothing that sums
-- `quotes` today changes behaviour.

CREATE TABLE IF NOT EXISTS public.credit_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,

  -- The invoice being credited. It lives on `quotes` — see above.
  -- RESTRICT, not CASCADE: a credit note is an accounting record of a
  -- correction that was issued to a customer. Deleting the invoice must not
  -- silently delete the evidence that it was credited.
  invoice_id uuid NOT NULL REFERENCES public.quotes (id) ON DELETE RESTRICT,

  -- Denormalised on purpose. HMRC expects a credit note to identify the
  -- invoice it corrects, and that statement has to survive the invoice
  -- number later being edited.
  invoice_number text,
  invoice_date timestamptz,

  credit_note_number text NOT NULL,

  -- Positive values. The document type carries the sign, never the number.
  subtotal numeric(12, 2) NOT NULL DEFAULT 0,
  vat_amount numeric(12, 2) NOT NULL DEFAULT 0,
  total numeric(12, 2) NOT NULL DEFAULT 0,
  -- CIS withheld on the credited labour; unwinds the deduction the
  -- contractor took on the invoice. 0 when the invoice was not under CIS.
  cis_amount numeric(12, 2) NOT NULL DEFAULT 0,

  reverse_charge boolean NOT NULL DEFAULT false,
  reason text,

  -- The credited lines and the settings they were priced under, so the
  -- document can be re-rendered exactly as issued even if the invoice or the
  -- company's rates change afterwards.
  lines jsonb NOT NULL DEFAULT '[]'::jsonb,
  settings jsonb,

  status text NOT NULL DEFAULT 'draft',
  issued_at timestamptz,
  pdf_url text,

  -- Accounting push (Xero CreditNotes / QuickBooks CreditMemo).
  external_provider text,
  external_id text,
  external_synced_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT credit_notes_status_check
    CHECK (status IN ('draft', 'issued', 'void')),
  -- Values are positive by construction; a negative here means a caller has
  -- started encoding the sign in the number, which is the thing this design
  -- exists to prevent.
  CONSTRAINT credit_notes_positive
    CHECK (subtotal >= 0 AND vat_amount >= 0 AND total >= 0 AND cis_amount >= 0)
);

-- A number is issued once per user. Matches the uniqueness the invoice and
-- quote numbers already rely on.
CREATE UNIQUE INDEX IF NOT EXISTS credit_notes_user_number_idx
  ON public.credit_notes (user_id, credit_note_number);

-- "What has already been credited against this invoice" is the hot read —
-- `buildCreditNote` needs it before every credit.
CREATE INDEX IF NOT EXISTS credit_notes_invoice_idx
  ON public.credit_notes (invoice_id);

CREATE INDEX IF NOT EXISTS credit_notes_user_created_idx
  ON public.credit_notes (user_id, created_at DESC);

ALTER TABLE public.credit_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credit notes"
  ON public.credit_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own credit notes"
  ON public.credit_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own credit notes"
  ON public.credit_notes FOR UPDATE USING (auth.uid() = user_id);
-- Deliberately NO delete policy. A credit note that has been issued to a
-- customer is not deletable — it is voided (`status = 'void'`), which leaves
-- the number spent and the trail intact. Drafts are updated, not removed.

COMMENT ON TABLE public.credit_notes IS
  'ELE-1704 — credit notes against invoices on public.quotes. Values POSITIVE; the document type carries the sign. Separate table so existing sums over quotes are unaffected.';

-- Numbering needs no new machinery: `next_document_number('credit_note')`
-- (ELE-1466) is a generic per-user counter and creates its own row on first
-- use. This wrapper only fixes the display format, matching
-- generate_invoice_number().
CREATE OR REPLACE FUNCTION public.generate_credit_note_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'Credit/' || LPAD(public.next_document_number('credit_note')::text, 3, '0');
END;
$$;
