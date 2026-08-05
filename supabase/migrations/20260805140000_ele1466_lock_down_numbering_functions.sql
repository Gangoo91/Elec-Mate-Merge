-- ELE-1466 follow-up — stop the numbering internals being callable over RPC.
--
-- Postgres grants EXECUTE to PUBLIC on every new function, and PostgREST
-- exposes anything executable as /rest/v1/rpc/<name>. So the functions added
-- by 20260805130000 landed reachable by both `anon` and `authenticated`.
--
-- next_document_number_for(user_id, doc_type) is the dangerous one: it takes
-- an ARBITRARY user id and increments that user's counter. Left as-is, any
-- caller could bump another electrician's invoice counter at will, making
-- their numbering jump — which is precisely the complaint ELE-1466 exists to
-- fix, only deliberate. assign_document_numbers() is a trigger function and
-- has no business being callable directly at all.
--
-- Revoking EXECUTE does not affect internal use: both are called from
-- SECURITY DEFINER functions owned by `postgres`, which executes as the owner,
-- and a trigger's permissions are checked when the trigger is created rather
-- than each time it fires.

-- Internal only — no client role may call these.
REVOKE ALL ON FUNCTION public.next_document_number_for(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.assign_document_numbers() FROM PUBLIC, anon, authenticated;

-- Caller-scoped (they resolve the user from auth.uid(), so they can only ever
-- touch the caller's own counter). Signed-in users need them; anon does not.
REVOKE ALL ON FUNCTION public.next_document_number(text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.generate_invoice_number() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.generate_standalone_invoice_number() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.generate_quote_number() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.next_document_number(text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.generate_invoice_number() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.generate_standalone_invoice_number() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.generate_quote_number() TO authenticated, service_role;

-- Edge functions run as service_role and raise invoices server-side, so they
-- keep the explicit-user form.
GRANT EXECUTE ON FUNCTION public.next_document_number_for(uuid, text) TO service_role;
