-- Design audit 2 (with ELE-2094): "Mrs Patel" must find "DEMO — Mrs Patel".
--
-- 1. _client_name_key drops titles (Mr, Mrs, Ms, Miss, Mx, Dr) anywhere in the
--    name, not only at the start ("DEMO — Mrs Patel" -> "demo patel").
-- 2. _client_name_keys: the whole-name key plus a key for each part either
--    side of a dash, pipe, colon or slash ("DEMO — Mrs Patel" -> {demo patel,
--    demo, patel}), so a prefix or a "Company — Contact" label still matches.
-- 3. match_firm_client compares those parts both ways. Same signature, same
--    output; only called by today's uncommitted ClientMatchHint (not HEAD, not
--    build 49). No index uses these helpers.

create or replace function public._client_name_key(p_name text)
returns text
language sql immutable
set search_path to 'public'
as $$
  select nullif(btrim(regexp_replace(
           regexp_replace(
             regexp_replace(
               regexp_replace(
                 regexp_replace(lower(coalesce(p_name, '')), '&', ' and ', 'g'),
               '\mlimited\M', 'ltd', 'g'),
             '[^a-z0-9 ]+', ' ', 'g'),
           '\m(mr|mrs|ms|miss|mx|dr)\M', ' ', 'g'),
         '\s+', ' ', 'g')), '');
$$;

create or replace function public._client_name_keys(p_name text)
returns text[]
language sql immutable
set search_path to 'public'
as $$
  select coalesce(array_agg(distinct k) filter (where k is not null and length(k) >= 3), '{}')
    from (
      select public._client_name_key(p_name) as k
      union all
      select public._client_name_key(part)
        from regexp_split_to_table(coalesce(p_name, ''), '\s*(—|–|\s-\s|\||:|/)\s*') as part
    ) x;
$$;

create or replace function public.match_firm_client(p_firm uuid, p_name text, p_email text default null::text, p_phone text default null::text)
returns jsonb
language plpgsql stable security definer
set search_path to 'public'
as $function$
declare
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := public._client_phone_key(p_phone);
  v_name text := public._client_name_key(p_name);
  v_keys text[] := public._client_name_keys(p_name);
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if v_email is null and v_phone is null and (v_name is null or length(v_name) < 3) then
    return '[]'::jsonb;
  end if;

  return coalesce((
    select jsonb_agg(to_jsonb(m) - 'rank' order by m.rank, m.name)
      from (
        select c.id, c.name, c.company_name, c.email, c.phone, c.address,
               case when v_email is not null and lower(btrim(c.email)) = v_email then 'email'
                    when v_phone is not null and public._client_phone_key(c.phone) = v_phone then 'phone'
                    when v_name is not null and (public._client_name_key(c.name) = v_name
                         or public._client_name_keys(c.name) && v_keys) then 'name'
                    else 'similar' end as reason,
               case when v_email is not null and lower(btrim(c.email)) = v_email then 1
                    when v_phone is not null and public._client_phone_key(c.phone) = v_phone then 2
                    when v_name is not null and (public._client_name_key(c.name) = v_name
                         or public._client_name_keys(c.name) && v_keys) then 3
                    else 4 end as rank,
               coalesce((v_email is not null and lower(btrim(c.email)) = v_email)
                 or ((coalesce(public._client_phone_key(c.phone) = v_phone, false)
                      or coalesce(public._client_name_key(c.name) = v_name, false))
                     and (v_email is null or nullif(btrim(c.email), '') is null)), false) as exact
          from public.customers c
         where c.user_id = p_firm
           and ((v_email is not null and lower(btrim(c.email)) = v_email)
                or (v_phone is not null and public._client_phone_key(c.phone) = v_phone)
                or (v_name is not null and public._client_name_key(c.name) = v_name)
                or (v_name is not null and public._client_name_keys(c.name) && v_keys)
                or (v_name is not null and length(v_name) >= 4
                    and similarity(public._client_name_key(c.name), v_name) >= 0.55))
         order by rank, c.name
         limit 3
      ) m), '[]'::jsonb);
end;
$function$;

revoke all on function public.match_firm_client(uuid, text, text, text) from public, anon;
grant execute on function public.match_firm_client(uuid, text, text, text) to authenticated;
