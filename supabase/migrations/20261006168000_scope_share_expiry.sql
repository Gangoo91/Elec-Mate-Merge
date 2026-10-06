-- Review finding #20 (6 Oct). The token loaders (20261006149000) ignored
-- expires_at: an expired scope-of-works link still opened and could be signed.
-- The page already shows its "expired" screen for status = 'expired'.
create or replace function public.get_scope_share_by_token(p_token text)
returns setof public.scope_share_links
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_row public.scope_share_links%rowtype;
begin
  if p_token is null or length(p_token) < 16 then
    return;
  end if;
  update public.scope_share_links
     set view_count = coalesce(view_count, 0) + 1,
         last_viewed_at = now()
   where share_token = p_token
     and status = 'active'
     and (expires_at is null or expires_at > now());
  select * into v_row from public.scope_share_links where share_token = p_token limit 1;
  if not found then
    return;
  end if;
  if v_row.status = 'active' and v_row.expires_at is not null and v_row.expires_at <= now() then
    v_row.status := 'expired';
  end if;
  return next v_row;
end;
$function$;

create or replace function public.sign_scope_share(p_token text, p_client_name text, p_signature text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_id uuid;
begin
  if coalesce(trim(p_client_name), '') = '' or coalesce(p_signature, '') = '' then
    raise exception 'Name and signature are required';
  end if;
  if length(p_signature) > 2000000 then
    raise exception 'Signature is too large';
  end if;
  update public.scope_share_links
     set client_name = left(trim(p_client_name), 200),
         signature_data = p_signature,
         signed_at = now(),
         status = 'signed'
   where share_token = p_token
     and status = 'active'
     and (expires_at is null or expires_at > now())
  returning id into v_id;
  if v_id is null then
    raise exception 'This link has expired, has already been signed or is no longer active';
  end if;
  return jsonb_build_object('ok', true, 'id', v_id);
end;
$function$;
