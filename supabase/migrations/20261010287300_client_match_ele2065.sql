-- ELE-2065 / gap analysis §3A #14: clients were matched by free-text name
-- (findOrCreateClientByName: ilike on the whole name), so "Mrs Patel",
-- "mrs  patel" and "J Patel" became three clients, and a client typed with a
-- new spelling never met their own email or phone.
--
-- New functions (additive; nothing is merged or changed in existing data):
--   _client_name_key(name)   lower case, titles (Mr, Mrs, Ms, Miss, Dr) off,
--                            & as "and", "limited" as "ltd", punctuation and
--                            extra spaces gone.
--   _client_phone_key(phone) digits only, +44 / 0044 as 0; null under 10 digits.
--   match_firm_client(firm, name, email, phone)
--                            up to 3 of the firm's clients that look like this
--                            one, strongest first: same email, same phone, same
--                            name once tidied, then a close spelling (pg_trgm).
--                            "exact" is true for the first three kinds unless
--                            both sides have a different email, so the app can
--                            link on its own only when it is safe, and asks
--                            ("This looks like an existing client") otherwise.
--   get_firm_client_duplicates(firm)
--                            read-only report: groups of the firm's clients that
--                            share an email, a phone or a tidied name.
-- Firm scope: p_firm must be in my_employer_scope() (the customers RLS rule).

create or replace function public._client_name_key(p_name text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select nullif(btrim(regexp_replace(
           regexp_replace(
             regexp_replace(
               regexp_replace(
                 regexp_replace(lower(coalesce(p_name, '')), '&', ' and ', 'g'),
               '\mlimited\M', 'ltd', 'g'),
             '[^a-z0-9 ]+', ' ', 'g'),
           '^\s*(mr|mrs|ms|miss|mx|dr)\s+', ''),
         '\s+', ' ', 'g')), '');
$$;
revoke all on function public._client_name_key(text) from public, anon;

create or replace function public._client_phone_key(p_phone text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case when length(d) >= 10 then d end
    from (select case
                   when x like '0044%' then '0' || substr(x, 5)
                   when x like '44%' and length(x) >= 12 then '0' || substr(x, 3)
                   else x
                 end as d
            from (select regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g') as x) a) b;
$$;
revoke all on function public._client_phone_key(text) from public, anon;

create or replace function public.match_firm_client(p_firm uuid, p_name text, p_email text default null,
                                                    p_phone text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := public._client_phone_key(p_phone);
  v_name text := public._client_name_key(p_name);
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
                    when v_name is not null and public._client_name_key(c.name) = v_name then 'name'
                    else 'similar' end as reason,
               case when v_email is not null and lower(btrim(c.email)) = v_email then 1
                    when v_phone is not null and public._client_phone_key(c.phone) = v_phone then 2
                    when v_name is not null and public._client_name_key(c.name) = v_name then 3
                    else 4 end as rank,
               -- Safe to link without asking: same email; or same phone / name
               -- and no clash of two different emails.
               coalesce((v_email is not null and lower(btrim(c.email)) = v_email)
                 or ((coalesce(public._client_phone_key(c.phone) = v_phone, false)
                      or coalesce(public._client_name_key(c.name) = v_name, false))
                     and (v_email is null or nullif(btrim(c.email), '') is null)), false) as exact
          from public.customers c
         where c.user_id = p_firm
           and ((v_email is not null and lower(btrim(c.email)) = v_email)
                or (v_phone is not null and public._client_phone_key(c.phone) = v_phone)
                or (v_name is not null and public._client_name_key(c.name) = v_name)
                or (v_name is not null and length(v_name) >= 4
                    and similarity(public._client_name_key(c.name), v_name) >= 0.55))
         order by rank, c.name
         limit 3
      ) m), '[]'::jsonb);
end;
$$;
revoke all on function public.match_firm_client(uuid, text, text, text) from public, anon;
grant execute on function public.match_firm_client(uuid, text, text, text) to authenticated;
comment on function public.match_firm_client(uuid, text, text, text) is
  'ELE-2065 §3A #14: up to 3 of the firm''s clients that look like this one (email, phone, tidied name, then close spelling), with reason and whether it is safe to link without asking. Read-only. my_employer_scope.';

create or replace function public.get_firm_client_duplicates(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object('reason', g.reason, 'clients', g.clients) order by g.reason_rank, g.first_name)
      from (
        select distinct on (ids) reason, reason_rank, clients, first_name
          from (
            select k.reason, k.reason_rank,
                   array_agg(c.id order by c.id) as ids,
                   jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'email', c.email,
                                                'phone', c.phone, 'created_at', c.created_at)
                             order by c.created_at) as clients,
                   min(c.name) as first_name
              from public.customers c
              cross join lateral (values
                ('email', 1, nullif(lower(btrim(c.email)), '')),
                ('phone', 2, public._client_phone_key(c.phone)),
                ('name', 3, public._client_name_key(c.name))) k(reason, reason_rank, key)
             where c.user_id = p_firm and k.key is not null
             group by k.reason, k.reason_rank, k.key
            having count(*) > 1
          ) x
         order by ids, reason_rank
      ) g), '[]'::jsonb);
end;
$$;
revoke all on function public.get_firm_client_duplicates(uuid) from public, anon;
grant execute on function public.get_firm_client_duplicates(uuid) to authenticated;
comment on function public.get_firm_client_duplicates(uuid) is
  'ELE-2065 §3A #14: read-only report of the firm''s clients that share an email, a phone or a tidied name. Nothing is merged. my_employer_scope.';
