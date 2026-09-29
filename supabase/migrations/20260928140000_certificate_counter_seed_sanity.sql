-- Certificate counter seed sanity.
--
-- next_certificate_number seeds a firm's first counter of the year from the
-- highest numeric tail among its existing certificate numbers. The tail test
-- was "all digits", so a garbage number inherited from the old platform
-- (EIC-2026-107313, MW-2026-638323) seeded two counters into six digits:
--
--   scope 05dc6771 (a paying firm)  MW   next_value 638323   real max 6383
--   scope b0113c59 (Andrew, gangoo) EIC  next_value 107320   real max 3905
--
-- The firm's next Minor Works would have printed MW-2026-638324. Certificate
-- numbers are four-digit pads; anything longer is not a number this app ever
-- allocated, so the seed now ignores tails longer than four digits, and the
-- two poisoned counters are reset to their real maximum + 1 (checked by hand
-- 28 Sep 2026).

CREATE OR REPLACE FUNCTION public.next_certificate_number(p_prefix text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user   UUID    := auth.uid();
  v_scope  UUID;
  v_year   INTEGER := EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER;
  v_prefix TEXT    := UPPER(BTRIM(COALESCE(p_prefix, '')));
  v_next   INTEGER;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'next_certificate_number: not authenticated';
  END IF;

  IF v_prefix !~ '^[A-Z0-9/&._-]{1,32}$' THEN
    RAISE EXCEPTION 'next_certificate_number: invalid prefix %', p_prefix;
  END IF;

  -- Numbering belongs to the BUSINESS, not the seat (see the 21 Aug note in
  -- the previous version: one counter per firm, employees resolve to it).
  SELECT ee.employer_id INTO v_scope
    FROM employer_employees ee
   WHERE ee.user_id = v_user
     AND ee.employer_id IS NOT NULL
   ORDER BY ee.employer_id
   LIMIT 1;

  v_scope := COALESCE(v_scope, v_user);

  SELECT next_value INTO v_next
  FROM certificate_number_counters
  WHERE scope_id = v_scope AND prefix = v_prefix AND year = v_year
  FOR UPDATE;

  IF FOUND THEN
    UPDATE certificate_number_counters
       SET next_value = next_value + 1, updated_at = now()
     WHERE scope_id = v_scope AND prefix = v_prefix AND year = v_year
     RETURNING next_value INTO v_next;
  ELSE
    -- First allocation for this business/prefix/year: seed from the firm's
    -- own highest number THIS YEAR (single-year scope is deliberate — Andrew,
    -- 21 Aug 2026 — 2026 carries on from inherited numbers, later years start
    -- at 0001). Random-hex tails and anything longer than a four-digit pad are
    -- not numbers this app allocated and must not poison the seed.
    SELECT COALESCE(MAX(NULLIF(regexp_replace(r.certificate_number, '^.*-([^-]+)$', '\1'), '')::INTEGER), 0)
      INTO v_next
      FROM reports r
     WHERE r.deleted_at IS NULL
       AND (
         r.user_id = v_scope
         OR r.user_id IN (
              SELECT ee.user_id FROM employer_employees ee
               WHERE ee.employer_id = v_scope AND ee.user_id IS NOT NULL
            )
       )
       AND r.certificate_number LIKE v_prefix || '-' || v_year::TEXT || '-%'
       AND regexp_replace(r.certificate_number, '^.*-([^-]+)$', '\1') ~ '^[0-9]{1,4}$';

    v_next := v_next + 1;

    INSERT INTO certificate_number_counters (scope_id, prefix, year, next_value)
    VALUES (v_scope, v_prefix, v_year, v_next)
    ON CONFLICT (scope_id, prefix, year) DO UPDATE
      SET next_value = certificate_number_counters.next_value + 1,
          updated_at = now()
    RETURNING next_value INTO v_next;
  END IF;

  RETURN v_prefix || '-' || v_year::TEXT || '-' || LPAD(v_next::TEXT, 4, '0');
END;
$function$;

-- The two poisoned counters. Guarded so this is a no-op if either has moved.
UPDATE certificate_number_counters
   SET next_value = 6384, updated_at = now()
 WHERE scope_id = '05dc6771-3ac8-41bf-bcf5-7daf811bdb4a' AND prefix = 'MW' AND year = 2026 AND next_value = 638323;

UPDATE certificate_number_counters
   SET next_value = 3906, updated_at = now()
 WHERE scope_id = 'b0113c59-8611-4c5e-8503-1797a75bb64f' AND prefix = 'EIC' AND year = 2026 AND next_value = 107320;
