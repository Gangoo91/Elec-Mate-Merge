-- ELE-1466 — per-user sequential numbering for quotes and invoices.
--
-- Reported: "the invoice numbers are not in numerical order. Today's invoice
-- is 515 the last one I did was 419." That jump of 96 is not deleted drafts —
-- it is 96 invoices raised by OTHER electricians. generate_invoice_number()
-- drew from `invoice_number_seq`, a single global sequence shared by every
-- user on the platform, so nobody's numbering was ever sequential.
--
-- Quotes had the opposite problem. Numbering was already per-user, but the
-- client derived it as `count(*) of the user's quotes + 1`, which reuses a
-- number as soon as a quote is deleted, and hands the same number to two
-- quotes created at once.
--
-- Both are replaced by one atomic per-user counter. A counter TABLE is used
-- rather than a sequence deliberately: a sequence never rolls back, so a
-- failed insert burns a number forever, whereas a counter row incremented
-- inside the caller's transaction unwinds with it.
--
-- HMRC expects each business to number its invoices uniquely and sequentially,
-- so this is a compliance fix as much as a cosmetic one. Historic gaps in
-- existing numbering cannot be undone — numbering is sequential from here on.

-- ── Counter store ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.document_number_counters (
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_type    text        NOT NULL CHECK (doc_type IN ('quote', 'invoice', 'standalone_invoice')),
  last_number integer     NOT NULL DEFAULT 0,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, doc_type)
);

-- Only the SECURITY DEFINER functions below may touch this table. RLS is on
-- with no policies, so direct client access is denied outright.
ALTER TABLE public.document_number_counters ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.document_number_counters IS
  'ELE-1466 — per-user, per-document-type numbering counters. Written only via next_document_number().';

-- ── Seed from existing data ──────────────────────────────────────────────
-- Every user continues from their own highest issued number. Seeding from 0
-- would restart at 001 and collide with numbers already sent to customers.
--
-- GREATEST(max parsed, row count) guards the old count-based quote scheme: if
-- a user deleted quotes, the count is lower than the highest number actually
-- issued, and trusting the count alone would reissue a number.
INSERT INTO public.document_number_counters (user_id, doc_type, last_number)
SELECT
  user_id,
  'quote',
  GREATEST(
    COALESCE(MAX(NULLIF((regexp_match(quote_number, '^\d{4}/(\d+)$'))[1], '')::int), 0),
    COUNT(*)
  )
FROM public.quotes
WHERE user_id IS NOT NULL
GROUP BY user_id
ON CONFLICT (user_id, doc_type) DO NOTHING;

-- Invoice numbers live in TWO tables, so both must be read to seed the
-- counter. public.quotes.invoice_number carries the number for an invoice
-- raised from a quote, but public.invoices holds its own invoice_number and
-- is not always mirrored back: 31 numbers exist there with no matching quotes
-- row, and 14 invoices have no quote_id at all.
--
-- Seeding from public.quotes alone therefore under-counts. One live user
-- (441a7720) has reached Invoice/323 in public.invoices while holding no
-- 'Invoice/NNN' number in public.quotes at all — they would get no counter
-- row, restart at Invoice/001, and re-issue 323 numbers already sent to
-- customers. The new unique index is on quotes(user_id, invoice_number) and
-- would not catch the collision, so the duplicates would be silent.
--
-- 'Invoice/NNN' (raised from a quote) and 'Invoice/SNNN' (standalone) share
-- these columns, so each pattern is matched separately.
INSERT INTO public.document_number_counters (user_id, doc_type, last_number)
SELECT user_id, 'invoice', MAX(n)
FROM (
  SELECT user_id, (regexp_match(invoice_number, '^Invoice/(\d+)$'))[1]::int AS n
  FROM public.quotes
  WHERE user_id IS NOT NULL AND invoice_number ~ '^Invoice/\d+$'
  UNION ALL
  SELECT user_id, (regexp_match(invoice_number, '^Invoice/(\d+)$'))[1]::int
  FROM public.invoices
  WHERE user_id IS NOT NULL AND invoice_number ~ '^Invoice/\d+$'
) AS issued
GROUP BY user_id
ON CONFLICT (user_id, doc_type) DO NOTHING;

INSERT INTO public.document_number_counters (user_id, doc_type, last_number)
SELECT user_id, 'standalone_invoice', MAX(n)
FROM (
  SELECT user_id, (regexp_match(invoice_number, '^Invoice/S(\d+)$'))[1]::int AS n
  FROM public.quotes
  WHERE user_id IS NOT NULL AND invoice_number ~ '^Invoice/S\d+$'
  UNION ALL
  SELECT user_id, (regexp_match(invoice_number, '^Invoice/S(\d+)$'))[1]::int
  FROM public.invoices
  WHERE user_id IS NOT NULL AND invoice_number ~ '^Invoice/S\d+$'
) AS issued
GROUP BY user_id
ON CONFLICT (user_id, doc_type) DO NOTHING;

-- ── Allocation ───────────────────────────────────────────────────────────
-- Internal form: takes an explicit user so triggers and service-role writes
-- work where auth.uid() is null. The upsert takes a row lock, so concurrent
-- callers serialise and can never receive the same number.
CREATE OR REPLACE FUNCTION public.next_document_number_for(p_user_id uuid, p_doc_type text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num integer;
BEGIN
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'next_document_number_for: user_id is required';
  END IF;

  INSERT INTO public.document_number_counters AS c (user_id, doc_type, last_number)
  VALUES (p_user_id, p_doc_type, 1)
  ON CONFLICT (user_id, doc_type)
  DO UPDATE SET last_number = c.last_number + 1, updated_at = now()
  RETURNING last_number INTO next_num;

  RETURN next_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.next_document_number(p_doc_type text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'next_document_number: no authenticated user';
  END IF;
  RETURN public.next_document_number_for(auth.uid(), p_doc_type);
END;
$$;

-- ── Public generators, now per-user ──────────────────────────────────────
-- Same names, same return formats, so every existing caller keeps working;
-- only the source of the number changes. The global sequences are left in
-- place but are no longer read — dropping them would break a rollback.
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'Invoice/' || LPAD(public.next_document_number('invoice')::text, 3, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_standalone_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'Invoice/S' || LPAD(public.next_document_number('standalone_invoice')::text, 3, '0');
END;
$$;

-- New: quote numbering moves server-side, off the racy client count.
-- Format is unchanged (YYYY/NNN). The year is presentational — the counter
-- does not reset annually, matching the previous behaviour, so a number is
-- never reused across years.
CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN to_char(now(), 'YYYY') || '/' ||
         LPAD(public.next_document_number('quote')::text, 3, '0');
END;
$$;

GRANT EXECUTE ON FUNCTION public.next_document_number(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_invoice_number() TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_standalone_invoice_number() TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_quote_number() TO authenticated;

-- ── Uniqueness scope ─────────────────────────────────────────────────────
-- quotes.invoice_number was declared `text UNIQUE` — globally unique across
-- every user. That constraint is the reason a global sequence existed at all:
-- per-user numbering is impossible while two users cannot both hold
-- 'Invoice/001'. Swap it for the per-user form, matching the equivalent
-- constraint quote_number has had since 20250906130113.
--
-- This only ever loosens the constraint, so it cannot fail on existing rows.
--
-- Found by lookup rather than by name. `DROP CONSTRAINT IF EXISTS
-- quotes_invoice_number_key` would be a silent no-op if the constraint were
-- ever recreated under a different name — and a silent no-op is the worst
-- outcome available here: the global uniqueness would survive, and every
-- second user to reach 'Invoice/001' would start hitting duplicate-key errors
-- on save. Drop whatever unique constraint or index covers invoice_number
-- alone, whatever it is called.
DO $$
DECLARE
  rec record;
  col_attnum smallint;
BEGIN
  SELECT attnum INTO col_attnum
  FROM pg_attribute
  WHERE attrelid = 'public.quotes'::regclass AND attname = 'invoice_number';

  FOR rec IN
    SELECT con.conname
    FROM pg_constraint con
    WHERE con.conrelid = 'public.quotes'::regclass
      AND con.contype = 'u'
      AND con.conkey = ARRAY[col_attnum]
  LOOP
    EXECUTE format('ALTER TABLE public.quotes DROP CONSTRAINT %I', rec.conname);
    RAISE NOTICE 'ELE-1466: dropped global unique constraint % on quotes.invoice_number', rec.conname;
  END LOOP;

  -- Same again for a bare unique index with no constraint behind it.
  FOR rec IN
    SELECT cls.relname AS conname
    FROM pg_index idx
    JOIN pg_class cls ON cls.oid = idx.indexrelid
    WHERE idx.indrelid = 'public.quotes'::regclass
      AND idx.indisunique
      AND idx.indnatts = 1
      AND idx.indkey[0] = col_attnum
      AND NOT EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conindid = idx.indexrelid)
  LOOP
    EXECUTE format('DROP INDEX public.%I', rec.conname);
    RAISE NOTICE 'ELE-1466: dropped global unique index % on quotes.invoice_number', rec.conname;
  END LOOP;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS unique_invoice_number_per_user
  ON public.quotes (user_id, invoice_number)
  WHERE invoice_number IS NOT NULL;

-- Fail loudly rather than leaving the table half-migrated: if any global
-- uniqueness on invoice_number survived, per-user numbering would break in
-- production the moment two users reached the same number.
DO $$
DECLARE
  col_attnum smallint;
  leftover   int;
BEGIN
  SELECT attnum INTO col_attnum
  FROM pg_attribute
  WHERE attrelid = 'public.quotes'::regclass AND attname = 'invoice_number';

  SELECT count(*) INTO leftover
  FROM pg_index idx
  WHERE idx.indrelid = 'public.quotes'::regclass
    AND idx.indisunique
    AND idx.indnatts = 1
    AND idx.indkey[0] = col_attnum;

  IF leftover > 0 THEN
    RAISE EXCEPTION 'ELE-1466: % global unique index(es) still cover quotes.invoice_number — per-user numbering would fail', leftover;
  END IF;
END $$;

-- ── Backstop ─────────────────────────────────────────────────────────────
-- The client mints numbers before writing, but a missed path (or a failed
-- client-side allocation falling back to a timestamp) must not leave a row
-- unnumbered. Assign from the same counter when the column is still null.
CREATE OR REPLACE FUNCTION public.assign_document_numbers()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.quote_number IS NULL OR NEW.quote_number = '' THEN
    NEW.quote_number := to_char(now(), 'YYYY') || '/' ||
      LPAD(public.next_document_number_for(NEW.user_id, 'quote')::text, 3, '0');
  END IF;

  -- Only once the invoice actually exists. A draft quote has no invoice
  -- number and must not consume one.
  IF NEW.invoice_raised IS TRUE
     AND (NEW.invoice_number IS NULL OR NEW.invoice_number = '' OR NEW.invoice_number = 'Invoice/TEMP')
  THEN
    NEW.invoice_number := 'Invoice/' ||
      LPAD(public.next_document_number_for(NEW.user_id, 'invoice')::text, 3, '0');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_document_numbers ON public.quotes;
CREATE TRIGGER trg_assign_document_numbers
  BEFORE INSERT OR UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_document_numbers();

COMMENT ON FUNCTION public.generate_invoice_number() IS
  'ELE-1466 — per-user sequential invoice number. Was a global sequence shared by all users.';
COMMENT ON FUNCTION public.generate_quote_number() IS
  'ELE-1466 — per-user sequential quote number. Replaces the client-side count(*)+1, which reused numbers after a delete.';
