-- ELE-1832 — The certificate runs the job.
--
-- No certificate had ever been linked to a firm job (employer_job_certificates
-- was empty): the link was manual, from the office. This makes it automatic,
-- without touching the certificate forms (Andrew's "no more chrome" rule):
--
--  1. Worker Tools › My jobs › "Start a certificate" records which job the
--     sparky started a certificate for (employer_cert_starts).
--  2. When a certificate is completed, or sent for the firm's QS review, it is
--     linked to the firm job it belongs to: the job the sparky started it from
--     (last 14 days), else the one job they are on whose postcode matches the
--     installation address around that date. Ambiguous = no guess.
--  3. When QS signs it off, the job feed says so and the office gets a bell
--     that opens the certificate on the job, where the follow-ups are offered
--     (send to the customer, next inspection as a repeat visit, remedial quote).
--  4. get_job_certificates also returns the next inspection date and the open
--     C1/C2/FI observations, and names automatic links honestly.

-- 1 ---------------------------------------------------------------------------
create table if not exists public.employer_cert_starts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  report_type text,
  created_at timestamptz not null default now()
);
create index if not exists employer_cert_starts_user_idx on public.employer_cert_starts (user_id, created_at desc);
alter table public.employer_cert_starts enable row level security;
comment on table public.employer_cert_starts is
  '[EMPLOYER] A sparky tapped "Start a certificate" on a firm job (ELE-1832). Scope: the person. Used by: _auto_link_certificate (links the finished cert to that job). Rule: written only via note_cert_start; server-only reads.';

create or replace function public.note_cert_start(p_job uuid, p_report_type text default null)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not (public.is_assigned_to_job(p_job)
          or exists (select 1 from public.employer_jobs j where j.id = p_job and j.user_id in (select public.my_employer_scope()))) then
    raise exception 'Job not found';
  end if;
  insert into public.employer_cert_starts (user_id, job_id, report_type) values (auth.uid(), p_job, left(p_report_type, 40));
end;
$function$;
revoke all on function public.note_cert_start(uuid,text) from public, anon;
grant execute on function public.note_cert_start(uuid,text) to authenticated;

-- 2 ---------------------------------------------------------------------------
create or replace function public._uk_postcode(p text)
returns text
language sql
immutable
as $$
  select upper(regexp_replace(m[1], '\s', '', 'g'))
    from regexp_matches(upper(coalesce(p, '')), '([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})') as m
   limit 1
$$;

create or replace function public._auto_link_certificate(p_report uuid, p_firm uuid default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_firms uuid[];
  v_pc text;
  v_day date;
  v_job uuid;
  v_n int;
begin
  select id, user_id, installation_address, inspection_date, updated_at, deleted_at
    into r from public.reports where id = p_report;
  if r.id is null or r.deleted_at is not null or r.user_id is null then return null; end if;
  if exists (select 1 from public.employer_job_certificates where report_uuid = p_report) then return null; end if;

  -- The firms this person works for (crew, manager, or owner). Most people are
  -- on none, and leave here at once.
  select array_agg(distinct f) into v_firms from (
    select e.employer_id as f from public.employer_employees e
     where e.user_id = r.user_id and lower(coalesce(e.status, '')) <> 'archived'
    union select a.employer_id from public.employer_admins a where a.user_id = r.user_id and a.status = 'active'
    union select r.user_id where exists (select 1 from public.employer_jobs j0 where j0.user_id = r.user_id)
  ) x where f is not null and (p_firm is null or f = p_firm);
  if v_firms is null then return null; end if;

  v_pc := public._uk_postcode(r.installation_address);
  v_day := coalesce(r.inspection_date::date, r.updated_at::date, current_date);

  -- Started from the job in Worker Tools: the most recent wins.
  select s.job_id into v_job
    from public.employer_cert_starts s join public.employer_jobs j on j.id = s.job_id
   where s.user_id = r.user_id and s.created_at > now() - interval '14 days'
     and j.user_id = any (v_firms) and j.archived_at is null
   order by s.created_at desc limit 1;

  -- Else the one job they're on at that postcode around that date. Two = no guess.
  if v_job is null and v_pc is not null then
    select count(*), (array_agg(j.id))[1] into v_n, v_job
      from public.employer_jobs j
     where j.user_id = any (v_firms)
       and j.archived_at is null and coalesce(j.is_template, false) = false
       and public._uk_postcode(j.location) = v_pc
       and v_day between coalesce(j.start_date, v_day) - 14 and coalesce(j.end_date, j.start_date, v_day) + 30
       and (j.user_id = r.user_id
            or exists (select 1 from public.employer_admins a where a.employer_id = j.user_id and a.user_id = r.user_id and a.status = 'active')
            or exists (select 1 from public.employer_job_assignments a
                         join public.employer_employees e on e.id = a.employee_id
                        where a.job_id = j.id and e.user_id = r.user_id));
    if v_n <> 1 then v_job := null; end if;
  end if;
  if v_job is null then return null; end if;

  insert into public.employer_job_certificates (employer_id, job_id, report_uuid, linked_by)
  select j.user_id, j.id, p_report, null from public.employer_jobs j where j.id = v_job
  on conflict (report_uuid) do nothing;
  return v_job;
exception when others then
  raise warning '[_auto_link_certificate] %: %', p_report, sqlerrm;
  return null;
end;
$function$;
revoke all on function public._auto_link_certificate(uuid,uuid) from public, anon, authenticated;

create or replace function public.trg_auto_link_certificate()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if tg_table_name = 'reports' then
    if new.status = 'completed' and (tg_op = 'INSERT' or old.status is distinct from 'completed') then
      perform public._auto_link_certificate(new.id, null);
    end if;
  elsif tg_table_name = 'report_qs_reviews' then
    if new.report_uuid is not null then
      perform public._auto_link_certificate(new.report_uuid, new.employer_id);
    end if;
  end if;
  return new;
exception when others then
  raise warning '[trg_auto_link_certificate] %', sqlerrm;
  return new;
end;
$function$;

drop trigger if exists auto_link_certificate on public.reports;
create trigger auto_link_certificate
  after insert or update of status on public.reports
  for each row execute function public.trg_auto_link_certificate();
drop trigger if exists auto_link_certificate on public.report_qs_reviews;
create trigger auto_link_certificate
  after insert on public.report_qs_reviews
  for each row execute function public.trg_auto_link_certificate();

-- 3 ---------------------------------------------------------------------------
create or replace function public.trg_cert_signed_off_on_job()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_job uuid;
  v_title text;
  v_type text;
  v_num text;
  v_open int;
begin
  if not (new.status = 'approved' and old.status is distinct from 'approved') or new.report_uuid is null then
    return new;
  end if;
  perform public._auto_link_certificate(new.report_uuid, new.employer_id);
  select l.job_id, j.title into v_job, v_title
    from public.employer_job_certificates l join public.employer_jobs j on j.id = l.job_id
   where l.report_uuid = new.report_uuid and l.employer_id = new.employer_id;
  if v_job is null then return new; end if;

  select upper(split_part(coalesce(r.report_type, 'certificate'), '-', 1)), coalesce(r.certificate_number, r.report_id),
         (select count(*) from jsonb_array_elements(case when jsonb_typeof(r.data->'defectObservations') = 'array'
                                                         then r.data->'defectObservations' else '[]'::jsonb end) o
           where upper(coalesce(o->>'defectCode', '')) in ('C1', 'C2', 'FI')
             and coalesce((o->>'rectified')::text, 'false') not in ('true', 'yes'))
    into v_type, v_num, v_open
    from public.reports r where r.id = new.report_uuid;

  insert into public.employer_job_comments (job_id, author_name, content, comment_type)
  values (v_job, coalesce(new.reviewer_name, 'QS'),
          v_type || ' ' || coalesce(v_num, '') || ' signed off by ' || coalesce(new.reviewer_name, 'the QS')
            || case when v_open > 0 then '. ' || v_open || ' observation' || case when v_open = 1 then '' else 's' end || ' need remedial work' else '' end,
          'status_change');

  perform public.notify_employer_bell(
    new.employer_id, 'cert_signed_off',
    v_type || ' signed off: ' || coalesce(v_title, 'job'),
    case when v_open > 0 then v_open || ' to quote for. Send it to the customer and raise the remedial quote'
         else 'Send it to the customer and book the next inspection' end,
    jsonb_build_object('job_id', v_job, 'report_uuid', new.report_uuid,
      'route', '/employer?section=testing&job=' || v_job || '&cert=' || new.report_uuid));
  return new;
exception when others then
  raise warning '[trg_cert_signed_off_on_job] %', sqlerrm;
  return new;
end;
$function$;

drop trigger if exists cert_signed_off_on_job on public.report_qs_reviews;
create trigger cert_signed_off_on_job
  after update of status on public.report_qs_reviews
  for each row execute function public.trg_cert_signed_off_on_job();

-- 4 ---------------------------------------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_job_certificates(uuid)'::regprocedure);
  if position('next_inspection' in v_def) = 0 then
    v_def := replace(v_def,
      $q$coalesce(nullif(trim(lp.full_name), ''), 'Office') as linked_by_name,$q$,
      $q$coalesce(nullif(trim(lp.full_name), ''), case when l.linked_by is null then 'Elec-Mate, matched automatically' else 'Office' end) as linked_by_name,
          (select ce.expiry_date from public.certificate_expiry_reminders ce
            where ce.report_id = r.id order by ce.expiry_date desc limit 1) as next_inspection,
          (select coalesce(jsonb_agg(jsonb_build_object(
                    'code', upper(o->>'defectCode'), 'item', o->>'item',
                    'description', o->>'description', 'recommendation', o->>'recommendation')), '[]'::jsonb)
             from jsonb_array_elements(case when jsonb_typeof(r.data->'defectObservations') = 'array'
                                            then r.data->'defectObservations' else '[]'::jsonb end) o
            where upper(coalesce(o->>'defectCode', '')) in ('C1', 'C2', 'FI')
              and coalesce((o->>'rectified')::text, 'false') not in ('true', 'yes')) as remedials,$q$);
    if position('next_inspection' in v_def) = 0 then raise exception 'get_job_certificates not patched'; end if;
    execute v_def;
  end if;
end $$;

-- 5. The customer's portal shows certificates linked to their jobs ------------
-- A team member's certificate points at THEIR customer record, not the firm's,
-- so it never matched `r.customer_id = v_cust`. A certificate linked to one of
-- this customer's firm jobs is theirs too (QS gate and payment hold unchanged).
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.client_portal_get'::regproc);
  if position('employer_job_certificates' in v_def) = 0 then
    v_def := replace(v_def,
      $q$         where r.customer_id = v_cust
           and (r.user_id = v_firm or r.user_id in ($q$,
      $q$         where (r.customer_id = v_cust
                or exists (select 1 from public.employer_job_certificates l
                             join public.employer_jobs jj on jj.id = l.job_id
                            where l.report_uuid = r.id and l.employer_id = v_firm and jj.customer_id = v_cust))
           and (r.user_id = v_firm or r.user_id in ($q$);
    if position('employer_job_certificates' in v_def) = 0 then raise exception 'client_portal_get not patched'; end if;
    execute v_def;
  end if;
end $$;

-- 6. A sparky's own certificate, started from the job, links at once ---------
create or replace function public.link_my_certificate_to_job(p_report_ref text, p_job uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_report uuid;
  v_firm uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select r.id into v_report from public.reports r
   where r.report_id = p_report_ref and r.user_id = auth.uid() and r.deleted_at is null;
  if v_report is null then raise exception 'Certificate not found'; end if;
  select j.user_id into v_firm from public.employer_jobs j where j.id = p_job and j.archived_at is null;
  if v_firm is null
     or not (public.is_assigned_to_job(p_job) or v_firm in (select public.my_employer_scope()))
     or not public._firm_team_has_user(v_firm, auth.uid()) then
    raise exception 'Job not found';
  end if;
  insert into public.employer_cert_starts (user_id, job_id, report_type)
  select auth.uid(), p_job, r.report_type from public.reports r where r.id = v_report;
  insert into public.employer_job_certificates (employer_id, job_id, report_uuid, linked_by)
  values (v_firm, p_job, v_report, auth.uid())
  on conflict (report_uuid) do nothing;
end;
$function$;
revoke all on function public.link_my_certificate_to_job(text,uuid) from public, anon;
grant execute on function public.link_my_certificate_to_job(text,uuid) to authenticated;
