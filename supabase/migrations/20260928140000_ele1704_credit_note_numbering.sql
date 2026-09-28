-- ELE-1704 follow-up — credit note NUMBERING was broken on first use.
--
-- The original migration claimed:
--
--   "Numbering needs no new machinery: next_document_number('credit_note')
--    (ELE-1466) is a generic per-user counter and creates its own row on
--    first use."
--
-- That was asserted, not checked, and both halves of it are wrong:
--
--  1. `document_number_counters.doc_type` carries a CHECK constraint allowing
--     ONLY ('quote','invoice','standalone_invoice','job'). The counter upsert
--     for 'credit_note' therefore raises a constraint violation — the very
--     first credit note anyone raised would have failed outright.
--
--  2. Past that, `next_document_number_for` routes every doc_type it does not
--     recognise into an ELSE branch that formats the candidate with the
--     'Invoice/' prefix and tests it for collisions against
--     `quotes.invoice_number` and `invoices.invoice_number`. A credit note
--     would have been numbered out of the INVOICE namespace — a user with 42
--     invoices would get "Credit/043" — burning counter values against a
--     sequence it has nothing to do with.
--
-- ── Why this does NOT touch next_document_number_for ─────────────────────
--
-- That function mints every quote, invoice and job number for 437 users with
-- live counter rows. Adding a branch to it would be a small change to a very
-- hot shared path. Credit notes need none of its invoice-collision logic —
-- their numbers live in one table with a unique index already on
-- (user_id, credit_note_number) — so the counter TABLE is reused (the rule
-- from ELE-1727: reuse document_number_counters, never a new sequence) while
-- the shared function is left exactly as it is.

-- ── 1. Let the counter hold credit notes ─────────────────────────────────
-- Purely permissive: widening a CHECK cannot invalidate an existing row or
-- reject an insert that previously succeeded.
ALTER TABLE public.document_number_counters
  DROP CONSTRAINT IF EXISTS document_number_counters_doc_type_check;

ALTER TABLE public.document_number_counters
  ADD CONSTRAINT document_number_counters_doc_type_check
  CHECK (doc_type = ANY (ARRAY[
    'quote'::text, 'invoice'::text, 'standalone_invoice'::text,
    'job'::text, 'credit_note'::text
  ]));

-- ── 2. Mint credit note numbers against the credit note namespace ────────
CREATE OR REPLACE FUNCTION public.generate_credit_note_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user  uuid := auth.uid();
  v_num   integer;
  v_candidate text;
  v_guard integer := 0;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'generate_credit_note_number: no authenticated user';
  END IF;

  LOOP
    v_guard := v_guard + 1;
    -- A backstop, not an expected path — mirrors next_document_number_for.
    IF v_guard > 5000 THEN
      RAISE EXCEPTION 'generate_credit_note_number: no free number for user % after % attempts',
        v_user, v_guard;
    END IF;

    -- The upsert takes a row lock, so two tabs serialise and can never be
    -- handed the same number.
    INSERT INTO public.document_number_counters AS c (user_id, doc_type, last_number)
    VALUES (v_user, 'credit_note', 1)
    ON CONFLICT (user_id, doc_type)
    DO UPDATE SET last_number = c.last_number + 1, updated_at = now()
    RETURNING last_number INTO v_num;

    -- Honours a per-user prefix/pad_width if one is ever set on the counter
    -- row, exactly as the other document types do; defaults to Credit/001.
    SELECT coalesce(c.prefix, 'Credit/')
           || CASE WHEN coalesce(c.pad_width, 3) > 0
                   THEN lpad(v_num::text, coalesce(c.pad_width, 3), '0')
                   ELSE v_num::text END
      INTO v_candidate
      FROM public.document_number_counters c
     WHERE c.user_id = v_user AND c.doc_type = 'credit_note';

    -- Collisions are only possible against OTHER credit notes. The unique
    -- index on (user_id, credit_note_number) is the real guarantee; this
    -- skips a number that is somehow already taken rather than failing.
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.credit_notes cn
      WHERE cn.user_id = v_user AND cn.credit_note_number = v_candidate
    );
  END LOOP;

  RETURN v_candidate;
END;
$$;

COMMENT ON FUNCTION public.generate_credit_note_number() IS
  'ELE-1704 — per-user credit note numbers off document_number_counters. Does NOT use next_document_number_for: that routes unknown doc_types through the invoice namespace.';
