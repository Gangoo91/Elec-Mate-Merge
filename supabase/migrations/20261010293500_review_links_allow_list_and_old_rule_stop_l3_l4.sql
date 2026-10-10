-- L4 + L3 (review of the review-request feature).
--
-- L4: review-link redirected to any https URL the firm had saved. Now a
-- review link is followed only when its host belongs to the platform it is
-- saved under: Google (google.*, g.page, goo.gl, g.co), Checkatrade,
-- TrustATrader, Facebook (facebook.com, fb.com, fb.me). Nothing else is
-- needed: the settings only hold those four platforms. A URL with a user part
-- (https://google.com@evil.example), a port, spaces or backslashes is refused.
-- review_click_target resolves a link WITHOUT counting it, for link scanners
-- and HEAD requests (review-link decides which; edge function).
--
-- L3: the older on-completion rule (job_complete_review_request, sent by
-- employer-automation-send) had no stop link. It gets one: review_stop_token
-- issues a token for (firm, address), stored in employer_review_stop_tokens,
-- and review_request_opt_out / review_link_target accept it, so the same
-- review-link ?a=stop page records the opt-out in employer_review_opt_outs.
-- The edge function also checks employer_review_opt_outs and the CMA wording
-- check (_review_wording_problem) and allows https links on the four
-- platforms only.
--
-- Additive: one new table (RLS on, no client access), new functions, and
-- three functions replaced with the same signatures (none is called by HEAD or
-- build 49; review-link and employer-automation-send call them).

create or replace function public._review_url_allowed(p_key text, p_url text)
returns boolean language sql immutable set search_path = public as $$
  with u as (
    select lower(substring(btrim(coalesce(p_url, '')) from '^https://([^/?#]+)')) as host,
           btrim(coalesce(p_url, '')) as url
  )
  select coalesce(
    u.url !~ '[\s\\]' and u.host is not null and u.host !~ '[@:]' and
    case lower(coalesce(p_key, ''))
      when 'google' then u.host ~ '^(([a-z0-9-]+\.)*google\.[a-z]{2,3}(\.[a-z]{2})?|g\.page|([a-z0-9-]+\.)*goo\.gl|g\.co)$'
      when 'checkatrade' then u.host ~ '^([a-z0-9-]+\.)*checkatrade\.com$'
      when 'trustatrader' then u.host ~ '^([a-z0-9-]+\.)*trustatrader\.com$'
      when 'facebook' then u.host ~ '^([a-z0-9-]+\.)*(facebook\.com|fb\.com|fb\.me)$'
      else false
    end, false)
  from u
$$;

create table if not exists public.employer_review_stop_tokens (
  token uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  address text not null,
  job_id uuid,
  created_at timestamptz not null default now(),
  unique (employer_id, address)
);
alter table public.employer_review_stop_tokens enable row level security;
revoke all on public.employer_review_stop_tokens from anon, authenticated;
comment on table public.employer_review_stop_tokens is
  '[EMPLOYER HUB] Stop-link tokens for the older on-completion review email (job_complete_review_request, L3). Scope: firm (employer_id = the owning account). Used by: employer-automation-send (review_stop_token), review-link (review_request_opt_out, review_link_target). Rule: no client access; one token per firm and address; opting out writes employer_review_opt_outs.';

create or replace function public.review_stop_token(p_firm uuid, p_address text, p_job uuid default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare v uuid; v_addr text := lower(btrim(coalesce(p_address, '')));
begin
  if p_firm is null or v_addr = '' then return null; end if;
  insert into public.employer_review_stop_tokens (employer_id, address, job_id)
  values (p_firm, v_addr, p_job)
  on conflict (employer_id, address) do update set job_id = coalesce(excluded.job_id, employer_review_stop_tokens.job_id)
  returning token into v;
  return v;
end $$;
revoke all on function public.review_stop_token(uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.review_stop_token(uuid, text, uuid) to service_role;

create or replace function public.review_request_opt_out(p_token uuid)
returns text language plpgsql security definer set search_path to 'public' as $function$
declare r public.employer_review_requests; t public.employer_review_stop_tokens;
begin
  select * into r from public.employer_review_requests where token = p_token and status = 'sent';
  if r.id is not null and r.to_address is not null then
    insert into public.employer_review_opt_outs (employer_id, address, request_id)
    values (r.employer_id, r.to_address, r.id) on conflict do nothing;
    update public.employer_review_requests set opted_out_at = coalesce(opted_out_at, now()), updated_at = now()
     where id = r.id;
    return public._review_firm_name(r.employer_id);
  end if;
  -- L3: the older on-completion email's stop link.
  select * into t from public.employer_review_stop_tokens where token = p_token;
  if t.token is null then return null; end if;
  insert into public.employer_review_opt_outs (employer_id, address, request_id)
  values (t.employer_id, t.address, null) on conflict do nothing;
  return public._review_firm_name(t.employer_id);
end $function$;
revoke all on function public.review_request_opt_out(uuid) from public, anon, authenticated;

create or replace function public.review_link_target(p_token uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $function$
  select coalesce(
    (select jsonb_build_object('firm_name', public._review_firm_name(r.employer_id),
                               'links', coalesce((select jsonb_agg(l) from jsonb_array_elements(public._review_links(s)) l
                                                   where public._review_url_allowed(l->>'key', l->>'url')), '[]'::jsonb),
                               'opted_out', r.opted_out_at is not null)
       from public.employer_review_requests r
       join public.employer_review_settings s on s.employer_id = r.employer_id
      where r.token = p_token and r.status = 'sent'),
    -- L3: a stop token knows the firm only; it has no review links.
    (select jsonb_build_object('firm_name', public._review_firm_name(t.employer_id),
                               'links', '[]'::jsonb,
                               'opted_out', exists (select 1 from public.employer_review_opt_outs o
                                                     where o.employer_id = t.employer_id and o.address = t.address))
       from public.employer_review_stop_tokens t where t.token = p_token))
$function$;
revoke all on function public.review_link_target(uuid) from public, anon, authenticated;

-- The link for a platform, allow-listed. Shared by the two functions below.
create or replace function public._review_click_url(p_token uuid, p_platform text)
returns text language sql stable security definer set search_path to 'public' as $$
  select l->>'url'
    from public.employer_review_requests r
    join public.employer_review_settings s on s.employer_id = r.employer_id
    cross join lateral jsonb_array_elements(public._review_links(s)) l
   where r.token = p_token and r.status = 'sent'
     and (p_platform is null or l->>'key' = p_platform)
     and public._review_url_allowed(l->>'key', l->>'url')
   limit 1
$$;
revoke all on function public._review_click_url(uuid, text) from public, anon, authenticated;

create or replace function public.record_review_click(p_token uuid, p_platform text)
returns text language plpgsql security definer set search_path to 'public' as $function$
declare v_url text;
begin
  if p_platform is not null and p_platform not in ('google', 'checkatrade', 'trustatrader', 'facebook') then
    return null;
  end if;
  v_url := public._review_click_url(p_token, p_platform);
  if v_url is null then return null; end if;
  update public.employer_review_requests
     set click_count = click_count + 1,
         clicks = clicks || jsonb_build_object(coalesce(p_platform, 'any'),
                    coalesce((clicks->>coalesce(p_platform, 'any'))::int, 0) + 1),
         first_clicked_at = coalesce(first_clicked_at, now()),
         last_clicked_at = now(), updated_at = now()
   where token = p_token and status = 'sent';
  return v_url;
end $function$;
revoke all on function public.record_review_click(uuid, text) from public, anon, authenticated;

-- Same target, not counted: link scanners and HEAD requests.
create or replace function public.review_click_target(p_token uuid, p_platform text)
returns text language sql stable security definer set search_path to 'public' as $$
  select case when p_platform is null or p_platform in ('google', 'checkatrade', 'trustatrader', 'facebook')
              then public._review_click_url(p_token, p_platform) end
$$;
revoke all on function public.review_click_target(uuid, text) from public, anon, authenticated;
