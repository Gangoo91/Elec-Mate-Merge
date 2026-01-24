-- ============================================================================
-- SECURE PUBLIC QUOTE ACCESS
-- ============================================================================
-- This migration removes insecure RLS policies and replaces them with
-- secure database functions that only allow access to specific quotes
-- by exact token match. This prevents anonymous users from viewing
-- or modifying other users' quotes.
-- ============================================================================

-- Remove insecure SELECT policy that allowed viewing ALL quotes with tokens
DROP POLICY IF EXISTS "Anon can view quotes by public_token" ON public.quotes;

-- Remove insecure UPDATE policy that allowed modifying ALL quotes with tokens
DROP POLICY IF EXISTS "Anon can accept quotes by public_token" ON public.quotes;

-- Remove redundant policy if it exists
DROP POLICY IF EXISTS "Public can view quotes via valid token" ON public.quotes;

-- ============================================================================
-- SECURE FUNCTION: Get quote by exact token match
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_quote_by_public_token(token_param text)
RETURNS SETOF quotes
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT *
  FROM quotes
  WHERE public_token = token_param
  AND public_token IS NOT NULL
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_quote_by_public_token(text) TO anon;

-- ============================================================================
-- SECURE FUNCTION: Accept quote by exact token match
-- ============================================================================
CREATE OR REPLACE FUNCTION public.accept_quote_by_token(
  token_param text,
  accepted_name text,
  accepted_email text,
  signature_data text,
  client_ip text DEFAULT 'unknown',
  client_user_agent text DEFAULT ''
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  -- Update the quote only if the token matches exactly
  UPDATE quotes
  SET
    acceptance_status = 'accepted',
    acceptance_method = 'in_app_signature',
    accepted_at = NOW(),
    accepted_by_name = accepted_name,
    accepted_by_email = accepted_email,
    accepted_ip = client_ip,
    accepted_user_agent = client_user_agent,
    signature_url = signature_data,
    status = 'approved',
    updated_at = NOW()
  WHERE public_token = token_param
  AND public_token IS NOT NULL;

  GET DIAGNOSTICS updated_count = ROW_COUNT;

  RETURN updated_count > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.accept_quote_by_token(text, text, text, text, text, text) TO anon;

-- ============================================================================
-- SECURE FUNCTION: Reject quote by exact token match
-- ============================================================================
CREATE OR REPLACE FUNCTION public.reject_quote_by_token(
  token_param text,
  rejected_name text DEFAULT 'Client',
  rejected_email text DEFAULT NULL,
  client_ip text DEFAULT 'unknown',
  client_user_agent text DEFAULT ''
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE quotes
  SET
    acceptance_status = 'rejected',
    accepted_at = NOW(),
    accepted_by_name = rejected_name,
    accepted_by_email = rejected_email,
    accepted_ip = client_ip,
    accepted_user_agent = client_user_agent,
    status = 'rejected',
    updated_at = NOW()
  WHERE public_token = token_param
  AND public_token IS NOT NULL;

  GET DIAGNOSTICS updated_count = ROW_COUNT;

  RETURN updated_count > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.reject_quote_by_token(text, text, text, text, text) TO anon;
