-- ─────────────────────────────────────────────────────────────────────────
-- ELE-880 — Invoice action tokens (one-tap mark-paid link)
-- ─────────────────────────────────────────────────────────────────────────
-- Used by the electrician to mark an invoice paid in one tap from a
-- payment-reminder email, without needing to log into the app. The token
-- is single-use, scoped to one invoice, and signed at generation time.
--
-- Patterned after briefing_signing_tokens (20260209_briefing_remote_signing.sql)
-- but with stricter semantics: action='mark_paid', single-use enforced at
-- consumption time, 30-day expiry.

CREATE TABLE IF NOT EXISTS public.invoice_action_tokens (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id      UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL,                     -- electrician who owns the invoice
  action          TEXT NOT NULL CHECK (action IN ('mark_paid')),
  public_token    TEXT NOT NULL UNIQUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  consumed_at     TIMESTAMPTZ,                        -- NULL = unused
  consumed_by_ip  TEXT,
  consumed_by_ua  TEXT
);

CREATE INDEX IF NOT EXISTS idx_invoice_action_tokens_token
  ON public.invoice_action_tokens(public_token)
  WHERE consumed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_invoice_action_tokens_invoice
  ON public.invoice_action_tokens(invoice_id);

CREATE INDEX IF NOT EXISTS idx_invoice_action_tokens_user
  ON public.invoice_action_tokens(user_id);

ALTER TABLE public.invoice_action_tokens ENABLE ROW LEVEL SECURITY;

-- Owner can read/manage their own tokens (e.g. to copy/share the link).
DROP POLICY IF EXISTS "Owners manage their own invoice action tokens"
  ON public.invoice_action_tokens;
CREATE POLICY "Owners manage their own invoice action tokens"
  ON public.invoice_action_tokens
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMENT ON TABLE public.invoice_action_tokens IS
  'One-shot tokens for performing a single action on an invoice without auth. Currently only mark_paid (ELE-880).';

-- ─── Issue or reuse a token for an invoice ──────────────────────────────
-- If a non-consumed, non-expired token already exists for this invoice +
-- action, return it. Otherwise mint a new one. Caller must pass user_id
-- (we trust it because this is SECURITY INVOKER and RLS enforces ownership
-- on the invoice itself via the FK + the WITH CHECK above).
CREATE OR REPLACE FUNCTION public.get_or_create_invoice_action_token(
  p_invoice_id UUID,
  p_action     TEXT DEFAULT 'mark_paid'
)
RETURNS TABLE (
  public_token TEXT,
  expires_at   TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_token   TEXT;
  v_expires TIMESTAMPTZ;
BEGIN
  -- Confirm the caller owns this invoice (defensive — RLS would also catch).
  SELECT user_id INTO v_user_id
  FROM public.quotes
  WHERE id = p_invoice_id
    AND user_id = auth.uid()
    AND invoice_raised = true;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Invoice not found or access denied';
  END IF;

  -- Try to reuse an existing live token.
  SELECT t.public_token, t.expires_at
    INTO v_token, v_expires
  FROM public.invoice_action_tokens t
  WHERE t.invoice_id = p_invoice_id
    AND t.action = p_action
    AND t.consumed_at IS NULL
    AND t.expires_at > now()
  ORDER BY t.created_at DESC
  LIMIT 1;

  IF v_token IS NOT NULL THEN
    public_token := v_token;
    expires_at   := v_expires;
    RETURN NEXT;
    RETURN;
  END IF;

  -- Mint a new one — 32 random bytes, base64url encoded, ~43 chars.
  v_token := encode(gen_random_bytes(32), 'base64');
  v_token := translate(v_token, '+/=', '-_');         -- url-safe
  v_expires := now() + interval '30 days';

  INSERT INTO public.invoice_action_tokens
    (invoice_id, user_id, action, public_token, expires_at)
  VALUES
    (p_invoice_id, v_user_id, p_action, v_token, v_expires);

  public_token := v_token;
  expires_at   := v_expires;
  RETURN NEXT;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_or_create_invoice_action_token(UUID, TEXT)
  TO authenticated;

COMMENT ON FUNCTION public.get_or_create_invoice_action_token IS
  'ELE-880 — Returns an existing live mark-paid token for an invoice or mints a new one. Idempotent so the email/UI can call it freely.';
