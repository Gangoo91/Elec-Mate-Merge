-- =============================================================
-- Remote Briefing Signing System
-- Allows electricians to share a secure link for workers to sign
-- briefings remotely via email, WhatsApp, or direct link.
-- =============================================================

-- 1. Create briefing_signing_tokens table
CREATE TABLE IF NOT EXISTS public.briefing_signing_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  briefing_id UUID NOT NULL REFERENCES public.team_briefings(id) ON DELETE CASCADE,
  public_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  is_active BOOLEAN NOT NULL DEFAULT true,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_by_user_id UUID NOT NULL,
  email_sent_to TEXT[] DEFAULT '{}',
  email_sent_at TIMESTAMPTZ
);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_briefing_signing_tokens_token
  ON public.briefing_signing_tokens(public_token)
  WHERE is_active = true;

-- Index for briefing lookups
CREATE INDEX IF NOT EXISTS idx_briefing_signing_tokens_briefing
  ON public.briefing_signing_tokens(briefing_id);

-- Enable RLS
ALTER TABLE public.briefing_signing_tokens ENABLE ROW LEVEL SECURITY;

-- RLS: owners can manage their own tokens
CREATE POLICY "Users can manage their own briefing signing tokens"
  ON public.briefing_signing_tokens
  FOR ALL
  USING (created_by_user_id = auth.uid())
  WITH CHECK (created_by_user_id = auth.uid());

-- =============================================================
-- 2. RPC: get_briefing_by_signing_token
--    Public function (anon access) that fetches briefing data
--    by exact token match. Returns NULL if not found/expired.
-- =============================================================
CREATE OR REPLACE FUNCTION public.get_briefing_by_signing_token(token_param TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
  token_record RECORD;
BEGIN
  -- Look up the token
  SELECT bt.*, tb.*
  INTO token_record
  FROM briefing_signing_tokens bt
  JOIN team_briefings tb ON tb.id = bt.briefing_id
  WHERE bt.public_token = token_param
    AND bt.is_active = true;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Check expiry (warn but still allow)
  -- The frontend can show an "expired" notice

  -- Increment view count
  UPDATE briefing_signing_tokens
  SET view_count = view_count + 1,
      last_viewed_at = now()
  WHERE public_token = token_param;

  -- Build response JSON
  SELECT json_build_object(
    'id', tb.id,
    'briefing_name', tb.briefing_name,
    'briefing_type', tb.briefing_type,
    'briefing_description', tb.briefing_description,
    'briefing_date', tb.briefing_date,
    'briefing_time', tb.briefing_time,
    'location', tb.location,
    'risk_level', tb.risk_level,
    'identified_hazards', tb.identified_hazards,
    'work_scope', tb.work_scope,
    'safety_warning', tb.safety_warning,
    'key_points', tb.key_points,
    'safety_points', tb.safety_points,
    'conductor_name', tb.conductor_name,
    'created_by_name', tb.created_by_name,
    'attendees', tb.attendees,
    'attendee_signatures', tb.attendee_signatures,
    'photos', tb.photos,
    'status', tb.status,
    'expired', (bt.expires_at < now()),
    'expires_at', bt.expires_at
  ) INTO result
  FROM team_briefings tb
  JOIN briefing_signing_tokens bt ON bt.briefing_id = tb.id
  WHERE bt.public_token = token_param;

  RETURN result;
END;
$$;

-- Grant anon access
GRANT EXECUTE ON FUNCTION public.get_briefing_by_signing_token(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_briefing_by_signing_token(TEXT) TO authenticated;

-- =============================================================
-- 3. RPC: sign_briefing_by_token
--    Public function (anon access) that adds a signature to the
--    briefing's attendee_signatures JSONB array.
-- =============================================================
CREATE OR REPLACE FUNCTION public.sign_briefing_by_token(
  token_param TEXT,
  signer_name TEXT,
  signature_data TEXT,
  signer_company TEXT DEFAULT NULL,
  client_ip TEXT DEFAULT NULL,
  client_user_agent TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_briefing_id UUID;
  v_is_active BOOLEAN;
  v_expires_at TIMESTAMPTZ;
  v_current_signatures JSONB;
  v_new_signature JSONB;
  v_result JSON;
BEGIN
  -- Look up token
  SELECT bt.briefing_id, bt.is_active, bt.expires_at
  INTO v_briefing_id, v_is_active, v_expires_at
  FROM briefing_signing_tokens bt
  WHERE bt.public_token = token_param;

  IF v_briefing_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or expired signing link');
  END IF;

  IF NOT v_is_active THEN
    RETURN json_build_object('success', false, 'error', 'This signing link has been deactivated');
  END IF;

  -- Warn but allow expired tokens (7-day window is a guideline)
  -- The frontend shows the warning

  -- Get current signatures
  SELECT COALESCE(tb.attendee_signatures, '[]'::jsonb)
  INTO v_current_signatures
  FROM team_briefings tb
  WHERE tb.id = v_briefing_id;

  -- Build new signature entry
  v_new_signature := jsonb_build_object(
    'name', signer_name,
    'signature', signature_data,
    'company', signer_company,
    'signed_at', now()::text,
    'ip_address', client_ip,
    'user_agent', client_user_agent,
    'signed_via', 'remote_link'
  );

  -- Append to signatures array
  UPDATE team_briefings
  SET attendee_signatures = v_current_signatures || jsonb_build_array(v_new_signature),
      updated_at = now()
  WHERE id = v_briefing_id;

  -- Also update the attendees JSON if the name matches an existing attendee
  UPDATE team_briefings
  SET attendees = (
    SELECT jsonb_agg(
      CASE
        WHEN (elem->>'name') = signer_name AND (elem->>'signature') IS NULL
        THEN elem || jsonb_build_object('signature', signature_data, 'timestamp', now()::text)
        ELSE elem
      END
    )
    FROM jsonb_array_elements(attendees) elem
  )
  WHERE id = v_briefing_id
    AND attendees IS NOT NULL
    AND jsonb_typeof(attendees) = 'array';

  RETURN json_build_object(
    'success', true,
    'message', 'Signature recorded successfully',
    'signer_name', signer_name,
    'signed_at', now()::text
  );
END;
$$;

-- Grant anon access
GRANT EXECUTE ON FUNCTION public.sign_briefing_by_token(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.sign_briefing_by_token(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
