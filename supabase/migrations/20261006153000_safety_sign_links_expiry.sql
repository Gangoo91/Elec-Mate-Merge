-- Site Safety remote sign-off: links actually expire, sign-off is single-use,
-- and a closed or cancelled permit cannot be accepted.
--
-- Both functions ignored expires_at (default now() + 7 days) while the sender
-- was told "the link expires in 7 days" — a verifier could sign an isolation a
-- fortnight later, after the circuit was back on. The app now issues a fresh
-- link when the old one has expired, and the public pages show an expired
-- screen; this is the rule that makes that true.
--
-- sign_safety_doc_token was check-then-update: two submissions at once could
-- both pass the "not yet signed" check. The update is now conditional on the
-- row still being unsigned.
--
-- Bodies are the live definitions as of 6 Oct 2026 plus the new checks.
-- Briefing links (sign_briefing_by_token) are unchanged here.

create or replace function public.sign_safety_doc_token(token_param text, signer_name text, signature_data text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v record; n int;
begin
  select * into v from safety_signing_tokens where public_token = token_param;
  if v is null then return jsonb_build_object('success', false, 'error', 'This signing link is invalid or has expired.'); end if;
  if v.signed_signature is not null then return jsonb_build_object('success', false, 'error', 'This document has already been signed.'); end if;
  if v.expires_at is not null and v.expires_at < now() then
    return jsonb_build_object('success', false, 'error', 'This signing link has expired. Ask the sender for a new link.');
  end if;
  if signature_data is null or length(signature_data) < 50 then return jsonb_build_object('success', false, 'error', 'A signature is required.'); end if;
  if signature_data !~ '^data:image/(png|jpe?g);base64,[A-Za-z0-9+/=]+$' then
    return jsonb_build_object('success', false, 'error', 'Invalid signature format.');
  end if;
  update safety_signing_tokens set
    signed_name = coalesce(nullif(trim(signer_name), ''), signed_name),
    signed_signature = signature_data,
    signed_at = now()
  where id = v.id and signed_signature is null;
  get diagnostics n = row_count;
  if n = 0 then return jsonb_build_object('success', false, 'error', 'This document has already been signed.'); end if;
  return jsonb_build_object('success', true);
end; $function$;

create or replace function public.sign_permit_by_token(token_param text, signer_name text, signature_data text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_token record;
  v record;
begin
  select * into v_token from permit_signing_tokens where public_token = token_param;
  if v_token is null then return jsonb_build_object('success', false, 'error', 'This signing link is invalid or has expired.'); end if;
  if v_token.expires_at is not null and v_token.expires_at < now() then
    return jsonb_build_object('success', false, 'error', 'This signing link has expired. Ask the sender for a new link.');
  end if;
  select * into v from permits_to_work where id = v_token.permit_id;
  if v is null then return jsonb_build_object('success', false, 'error', 'Permit not found.'); end if;
  if v.status in ('closed', 'cancelled') then
    return jsonb_build_object('success', false, 'error', 'This permit is ' || v.status || ' and can no longer be accepted.');
  end if;
  if v.acceptance_status = 'accepted' and v.receiver_signature is not null then
    return jsonb_build_object('success', false, 'error', 'This permit has already been accepted.');
  end if;
  if signature_data is null or length(signature_data) < 50 then
    return jsonb_build_object('success', false, 'error', 'A signature is required.');
  end if;
  if signature_data !~ '^data:image/(png|jpe?g);base64,[A-Za-z0-9+/=]+$' then
    return jsonb_build_object('success', false, 'error', 'Invalid signature format.');
  end if;
  update permits_to_work set
    receiver_name = coalesce(nullif(trim(signer_name), ''), receiver_name),
    receiver_signature = signature_data,
    receiver_signed_at = now(),
    acceptance_status = 'accepted'
  where id = v_token.permit_id;
  delete from permit_signing_tokens where id = v_token.id;
  return jsonb_build_object('success', true);
end; $function$;
