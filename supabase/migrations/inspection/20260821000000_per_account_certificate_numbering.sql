-- ELE-1542 — certificate numbers belong to the BUSINESS, not to one global
-- sequence shared by the whole platform.
--
-- Three faults, all from the same design, verified against production
-- 2026-08-21:
--
--   1. `generate_certificate_number` allocates from a Postgres sequence named
--      `certificate_seq_<type>_<year>`, shared by EVERY account. 202 different
--      firms drew this year's EICR numbers from one counter, so an
--      electrician's own numbers jump — 0847, then 0912 — because the gap is
--      other people's certificates.
--
--   2. That function only maps eicr / eic / minor-works to a prefix. Everything
--      else fell through, and the client (`certificateNumbering.ts`) had to
--      route specialist certs to a random-hex fallback instead —
--      EV-CHARGING-2026-09C6C2. Smoke/CO, fire alarm, EV charging, emergency
--      lighting, PAT and testing-only certificates are 100% random hex. They
--      have never been numbered at all.
--
--      The old function could not have handled them anyway: it interpolates the
--      raw report type into a sequence name, so 'ev-charging' produces
--      `certificate_seq_ev-charging_2026` — a syntax error at the hyphen
--      (ELE-1443).
--
--   3. Even on the three supported types the fallback fires — ~5% of this
--      year's EICR/EIC/MW numbers are random hex, so the RPC is erroring in
--      the field, not just in theory.
--
-- Fixed with a counter TABLE rather than dynamic sequences: one row per
-- (scope, prefix, year). No dynamic SQL, so no prefix can break it — 'FA/G6'
-- and 'EV-CHARGING' are just text. The old function is left in place and
-- untouched; nothing is renumbered.

DROP TABLE IF EXISTS public.certificate_number_counters;

CREATE TABLE public.certificate_number_counters (
  -- The BUSINESS the numbering belongs to, not necessarily the person typing.
  -- Always an auth user id: an employer's own id for a firm, or the
  -- electrician's own id for a sole trader. See the scope resolution below.
  scope_id   UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prefix     TEXT    NOT NULL,
  year       INTEGER NOT NULL,
  -- Highest number ISSUED so far. The next certificate gets next_value + 1.
  next_value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (scope_id, prefix, year)
);

-- No policies by design. The table is reached only through the SECURITY
-- DEFINER function below, which derives the scope from auth.uid(). RLS on with
-- zero policies means a direct client query returns nothing, which is what we
-- want: a counter is not user-editable data.
ALTER TABLE public.certificate_number_counters ENABLE ROW LEVEL SECURITY;

/**
 * Allocate the next certificate number for the calling account's business.
 *
 * Takes a prefix, not a report type. The prefix map already lives in
 * `src/utils/certificateNumbering.ts` and has to, because it carries cases the
 * database has no business knowing (FA/G1..G7, SMOKE-CO, G98/G99). Duplicating
 * it here is how the two drift.
 *
 * ⚠️ Deliberately takes NO user_id. A SECURITY DEFINER function that accepts a
 * user id lets any authenticated caller act as any account; this reads
 * auth.uid() instead, so a caller can only ever advance their own counter.
 */
CREATE OR REPLACE FUNCTION public.next_certificate_number(p_prefix TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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

  -- Anchor the prefix. Anything else could write junk rows into the counter
  -- table, and the prefix ends up printed on a legal document.
  IF v_prefix !~ '^[A-Z0-9/&._-]{1,32}$' THEN
    RAISE EXCEPTION 'next_certificate_number: invalid prefix %', p_prefix;
  END IF;

  -- Numbering belongs to the BUSINESS, not the seat.
  --
  -- Per-user counters would hand two electricians at the same firm the same
  -- certificate number — one firm on the platform today has three members and
  -- 309 certificates between them. Today's global sequence accidentally
  -- prevents that; per-user counters would reintroduce it as a within-firm
  -- duplicate, which is worse than the gaps this ticket set out to fix.
  --
  -- Certificate numbers do NOT need to be unique across companies —
  -- EICR-2026-0001 exists in every van in the country, same as a paper pad.
  -- Verified nothing depends on global uniqueness: every lookup is scoped by
  -- user_id, and public links are keyed on the row UUID, never the number.
  --
  -- `employer_employees.employer_id` IS the employer's auth user id (verified:
  -- all 11 rows resolve to auth.users), so an employer's own scope is their own
  -- id and their employees resolve to the same value. One counter per firm.
  SELECT ee.employer_id INTO v_scope
    FROM employer_employees ee
   WHERE ee.user_id = v_user
     AND ee.employer_id IS NOT NULL
   ORDER BY ee.employer_id   -- deterministic if anyone is ever in two firms
   LIMIT 1;

  v_scope := COALESCE(v_scope, v_user);

  -- Lock this business's counter for the duration of the transaction so two
  -- certificates started at once cannot be handed the same number.
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
    -- First allocation for this business/prefix/year.
    --
    -- 🔴 THE SEED IS DELIBERATELY SCOPED TO A SINGLE YEAR. Do not "improve"
    -- this by widening it across years — that quietly changes what prints on
    -- legal documents.
    --
    -- Two behaviours fall out of the single-year scope, and BOTH are intended
    -- (Andrew's decision, 2026-08-21):
    --
    --   • **2026 continues.** Firms already hold numbers inherited from the old
    --     platform-wide sequence (some in the 5000s). Seeding from their own
    --     highest means the next certificate carries on from where they are —
    --     no number ever goes backwards on a legal document.
    --
    --   • **Every later year starts a fresh pad at 0001.** On 1 Jan 2027 a firm
    --     has no numeric 2027 number yet, so MAX is null, the seed is 0, and
    --     they get EICR-2027-0001. Each business then runs its own clean
    --     sequence — exactly like a paper pad, and duplicated across companies
    --     on purpose. Widen the seed across years and every firm stays stuck in
    --     the 5000s forever.
    --
    -- Keeping this emergent rather than an explicit `IF v_year <= 2026` also
    -- makes it self-healing: if a counter row is ever lost mid-year it reseeds
    -- from that year's real maximum instead of restarting at 0001 and
    -- duplicating numbers already issued.
    --
    -- Random-hex tails (the old client fallback) are excluded by the ~ test so
    -- they cannot poison the seed.
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
       AND regexp_replace(r.certificate_number, '^.*-([^-]+)$', '\1') ~ '^[0-9]+$';

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
$$;

-- Only signed-in users, and only for their own business (enforced by auth.uid()
-- and the scope resolution above).
REVOKE ALL ON FUNCTION public.next_certificate_number(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.next_certificate_number(TEXT) TO authenticated;
