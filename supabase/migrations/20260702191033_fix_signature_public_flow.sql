-- Fix public signing flow: get_signature_request_by_token selected nonexistent
-- columns (document_name/document_url -> real: document_title); add decline RPC.

CREATE OR REPLACE FUNCTION public.get_signature_request_by_token(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_row record;
begin
  select id, document_title, document_type, signer_name, signer_email,
         status, message, signed_at, expires_at, created_at
    into v_row
  from signature_requests
  where access_token = p_token
  limit 1;

  if v_row is null then
    return jsonb_build_object('error', 'not_found');
  end if;
  if v_row.expires_at is not null and v_row.expires_at < now() then
    return jsonb_build_object('error', 'expired');
  end if;

  update signature_requests
     set status = 'Viewed', updated_at = now()
   where access_token = p_token and status in ('Pending', 'Sent');

  return to_jsonb(v_row);
end;
$function$;

CREATE OR REPLACE FUNCTION public.decline_signature_request(
  p_token text,
  p_ip text DEFAULT NULL::text,
  p_notes text DEFAULT NULL::text
)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_id uuid;
begin
  update signature_requests
     set status = 'Declined',
         updated_at = now(),
         ip_address = coalesce(p_ip, ip_address),
         message = coalesce(nullif(p_notes, ''), message)
   where access_token = p_token
     and status is distinct from 'Signed'
     and status is distinct from 'Declined'
     and (expires_at is null or expires_at > now())
  returning id into v_id;

  if v_id is null then
    return jsonb_build_object('error', 'invalid_or_already_finalised');
  end if;
  return jsonb_build_object('success', true, 'id', v_id);
end;
$function$;

GRANT EXECUTE ON FUNCTION public.decline_signature_request(text, text, text) TO anon, authenticated;
