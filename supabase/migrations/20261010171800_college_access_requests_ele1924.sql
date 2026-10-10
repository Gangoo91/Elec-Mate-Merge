-- ELE-1924: "Request access / get your college code" on the public
-- /for-colleges page. The college-request-info edge function (service role)
-- already adds the person to the warm-leads list and emails founder@; it now
-- also keeps the request here so nothing lives only in an inbox. Admin →
-- Colleges → Hub colleges lists them.
--
-- Additive only.

create table if not exists public.college_access_requests (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  email            text not null,
  organisation     text not null,
  role             text,
  provider_type    text check (provider_type is null or provider_type in ('fe_college', 'itp', 'employer_provider')),
  learner_estimate integer check (learner_estimate is null or learner_estimate between 0 and 100000),
  programmes       text,
  message          text,
  utm              jsonb not null default '{}'::jsonb,
  status           text not null default 'new' check (status in ('new', 'replied', 'code_sent', 'closed')),
  notes            text,
  updated_at       timestamptz not null default now()
);
create index if not exists college_access_requests_created_idx on public.college_access_requests (created_at desc);

comment on table public.college_access_requests is
  '[COLLEGE] ELE-1924. Requests from the public /for-colleges page ("Request access for your college"): who asked, their organisation and provider type, roughly how many learners, which programmes, their message and the campaign tags. Scope: platform. Written by: the college-request-info edge function (service role) alongside the Brevo warm-leads list and the founder@ notification. Used by: Admin → Colleges → Hub colleges → Access requests (admin_list_college_access_requests, admin_set_college_access_request). Rule: never readable by anon or ordinary users; platform admins only.';

alter table public.college_access_requests enable row level security;
revoke all on public.college_access_requests from anon, authenticated;

create or replace function public.admin_list_college_access_requests(p_limit integer default 50)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  return coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at desc)
                     from (select * from college_access_requests order by created_at desc
                            limit least(greatest(coalesce(p_limit, 50), 1), 200)) r), '[]'::jsonb);
end;
$$;
revoke all on function public.admin_list_college_access_requests(integer) from public, anon;
grant execute on function public.admin_list_college_access_requests(integer) to authenticated;

create or replace function public.admin_set_college_access_request(p_id uuid, p_status text, p_notes text default null)
returns void
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  if p_status not in ('new', 'replied', 'code_sent', 'closed') then
    raise exception 'Unknown status %', p_status;
  end if;
  update college_access_requests
     set status = p_status, notes = coalesce(p_notes, notes), updated_at = now()
   where id = p_id;
end;
$$;
revoke all on function public.admin_set_college_access_request(uuid, text, text) from public, anon;
grant execute on function public.admin_set_college_access_request(uuid, text, text) to authenticated;
