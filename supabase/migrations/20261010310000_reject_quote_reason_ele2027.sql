-- ELE-2027 — a client declining from the quote link can say why, and the
-- decline can no longer undo an acceptance.
--
-- 1. Reason. The decline used to record name, email and IP only, so the
--    win/loss reason breakdown never heard from the client — only from the
--    electrician marking a quote lost by hand. The optional reason uses the
--    same keys as src/utils/declineReason.ts ('no_response' excluded: a client
--    who is replying has not gone quiet) and the same 'other:<note>' encoding,
--    so the existing analytics group it with no schema change.
--
-- 2. Guard. The UPDATE had no status check: anyone holding the link could
--    "decline" a quote the client had already accepted and signed, which
--    overwrote accepted_at / accepted_by_* / accepted_ip with the decline.
--    None of the 52 declined quotes on 10 Oct are signed, invoiced or paid, so
--    it has not happened; now it cannot. Only a quote still waiting for an
--    answer can be declined.
--
-- The old 5-argument signature is dropped so a named-argument call from an
-- older app build resolves to this one through the new parameter's default.

DROP FUNCTION IF EXISTS public.reject_quote_by_token(text, text, text, text, text);

CREATE OR REPLACE FUNCTION public.reject_quote_by_token(
  token_param text,
  rejected_name text DEFAULT 'Client',
  rejected_email text DEFAULT NULL,
  client_ip text DEFAULT 'unknown',
  client_user_agent text DEFAULT '',
  decline_reason text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_key text;
  v_note text;
  v_reason text;
  updated_count integer;
BEGIN
  IF token_param IS NULL OR length(token_param) = 0 THEN
    RETURN false;
  END IF;

  -- Accept a bare key or 'other:<note>'; anything else is dropped rather than
  -- refusing the decline over it.
  IF decline_reason IS NOT NULL THEN
    IF decline_reason LIKE 'other:%' THEN
      v_key := 'other';
      v_note := nullif(btrim(left(substr(decline_reason, 7), 300)), '');
    ELSE
      v_key := btrim(decline_reason);
    END IF;

    IF v_key IN ('price', 'timing', 'competitor', 'cancelled', 'other') THEN
      v_reason := CASE WHEN v_key = 'other' AND v_note IS NOT NULL
                       THEN 'other:' || v_note ELSE v_key END;
    END IF;
  END IF;

  UPDATE quotes
  SET
    acceptance_status = 'rejected',
    accepted_at = NOW(),
    accepted_by_name = left(coalesce(nullif(btrim(rejected_name), ''), 'Client'), 200),
    accepted_by_email = left(rejected_email, 320),
    accepted_ip = left(client_ip, 100),
    accepted_user_agent = left(client_user_agent, 500),
    status = 'rejected',
    declined_reason = coalesce(v_reason, declined_reason),
    updated_at = NOW()
  WHERE public_token = token_param
    AND public_token IS NOT NULL
    AND deleted_at IS NULL
    AND coalesce(acceptance_status, 'pending') = 'pending';

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count > 0;
END;
$function$;

REVOKE ALL ON FUNCTION public.reject_quote_by_token(text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reject_quote_by_token(text, text, text, text, text, text)
  TO anon, authenticated, service_role;
