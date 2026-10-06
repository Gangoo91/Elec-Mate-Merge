-- Token-checked replacements for two open read policies the LIVE app still
-- relies on while signed out. The RPCs ship now (additive); the open SELECT
-- policies are dropped at release (release checklist), once the app calls
-- these instead.
--
-- scope_share_links: "Public read scope share links by token" is `true`, so
-- every link (client names, addresses, scope, signatures) was listable. And
-- the signed-out page's UPDATEs (view count, signature) had NO policy, so they
-- silently changed nothing: view_count is 0 on every link, and a customer who
-- signed remotely saw "Signed" while nothing was saved.
--
-- referral_codes: "Users can view any active code for validation" listed all
-- 2,229 codes with their owners. Sign-up and the invite page only ever need
-- one code's owner.

create or replace function public.get_scope_share_by_token(p_token text)
returns setof public.scope_share_links
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_token is null or length(p_token) < 16 then
    return;
  end if;
  update public.scope_share_links
     set view_count = coalesce(view_count, 0) + 1,
         last_viewed_at = now()
   where share_token = p_token
     and status = 'active';
  return query
    select * from public.scope_share_links where share_token = p_token limit 1;
end;
$$;

create or replace function public.sign_scope_share(p_token text, p_client_name text, p_signature text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
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
  returning id into v_id;
  if v_id is null then
    raise exception 'This link has already been signed or is no longer active';
  end if;
  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

create or replace function public.resolve_referral_code(p_code text)
returns table (user_id uuid, first_name text)
language sql
stable
security definer
set search_path = public
as $$
  select r.user_id,
         nullif(split_part(trim(coalesce(p.full_name, '')), ' ', 1), '')
    from public.referral_codes r
    left join public.profiles p on p.id = r.user_id
   where r.code = p_code
     and r.is_active = true
   limit 1
$$;

grant execute on function public.get_scope_share_by_token(text) to anon, authenticated;
grant execute on function public.sign_scope_share(text, text, text) to anon, authenticated;
grant execute on function public.resolve_referral_code(text) to anon, authenticated;
