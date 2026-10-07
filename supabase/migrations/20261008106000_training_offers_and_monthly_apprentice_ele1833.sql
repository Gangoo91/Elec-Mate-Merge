-- ELE-1833 — the employer's side of the apprentice loop, without touching the
-- College Hub's OTJ tables.
--
-- 1. "Counts as training" from a firm job. The funding rules (paras 77–78) are
--    explicit that the apprentice DOING the work is on-the-job training, so a
--    whole job can't be offered. What the office can offer is the teaching
--    that happened on it: shadowing, mentoring, a one-to-one, a toolbox talk,
--    manufacturer training or an industry visit. The apprentice gets a bell
--    that opens their own log form already filled in; they add what they
--    learned and submit it themselves (never on their behalf). From there the
--    existing path runs: employer attests, college verifies.
-- 2. A monthly note to the firm on the 1st: per apprentice, hours the firm
--    confirmed last month, hours still waiting, college attendance.

create table if not exists public.employer_training_offers (
  id uuid primary key default gen_random_uuid(),
  firm uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  employee_id uuid not null references public.employer_employees(id) on delete cascade,
  apprentice_user_id uuid not null,
  activity_date date not null,
  minutes integer not null check (minutes between 15 and 600),
  activity_type text not null,
  note text,
  offered_by uuid,
  created_at timestamptz not null default now()
);
create index if not exists employer_training_offers_job_idx on public.employer_training_offers (job_id);
alter table public.employer_training_offers enable row level security;
drop policy if exists "Firm reads its training offers" on public.employer_training_offers;
create policy "Firm reads its training offers" on public.employer_training_offers
  for select to authenticated using (firm in (select public.my_employer_scope()));
comment on table public.employer_training_offers is
  '[EMPLOYER] Off-the-job training the office offered an apprentice from a firm job (ELE-1833). Scope: firm. Used by: offer_training_from_job, job sheet. Rule: written only via the RPC; the apprentice logs the entry themselves.';

create or replace function public._url_param(p text)
returns text
language sql
immutable
set search_path = public
as $$
  select replace(replace(replace(replace(replace(replace(replace(p,
           '%', '%25'), '&', '%26'), '#', '%23'), '+', '%2B'), '?', '%3F'), ' ', '%20'), '=', '%3D')
$$;

create or replace function public.offer_training_from_job(
  p_job uuid, p_employee uuid, p_minutes integer, p_activity_type text,
  p_note text default null, p_date date default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
  e public.employer_employees;
  v_id uuid;
  v_date date := coalesce(p_date, (now() at time zone 'Europe/London')::date);
  v_who text;
  v_label text;
  v_route text;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  select * into e from public.employer_employees where id = p_employee and employer_id = j.user_id;
  if e.id is null or e.user_id is null or lower(coalesce(e.status, '')) <> 'active' then
    raise exception 'That apprentice has not joined the team yet';
  end if;
  if p_activity_type not in ('shadowing', 'mentoring', 'one_to_one', 'employer_meeting', 'manufacturer_training', 'industry_visit') then
    raise exception 'Only teaching time counts: shadowing, mentoring, a one-to-one, a toolbox talk, manufacturer training or an industry visit';
  end if;
  if p_minutes is null or p_minutes < 15 or p_minutes > 600 then
    raise exception 'Between 15 minutes and 10 hours';
  end if;
  if v_date > (now() at time zone 'Europe/London')::date then
    raise exception 'Training can''t be in the future';
  end if;

  insert into public.employer_training_offers (firm, job_id, employee_id, apprentice_user_id, activity_date,
                                               minutes, activity_type, note, offered_by)
  values (j.user_id, p_job, p_employee, e.user_id, v_date, p_minutes, p_activity_type,
          nullif(left(btrim(coalesce(p_note, '')), 500), ''), auth.uid())
  returning id into v_id;

  select coalesce(a.full_name, p.full_name, 'The office') into v_who
    from public.profiles p
    left join public.employer_admins a on a.user_id = p.id and a.employer_id = j.user_id and a.status = 'active'
   where p.id = auth.uid();
  v_who := split_part(btrim(coalesce(v_who, 'The office')), ' ', 1);
  v_label := case p_activity_type
    when 'shadowing' then 'Shadowing' when 'mentoring' then 'Mentoring' when 'one_to_one' then 'One-to-one'
    when 'employer_meeting' then 'Toolbox talk' when 'manufacturer_training' then 'Manufacturer training'
    else 'Industry visit' end;

  v_route := '/apprentice/ojt-hub?log=firm'
    || '&type=' || p_activity_type
    || '&mins=' || p_minutes
    || '&date=' || to_char(v_date, 'YYYY-MM-DD')
    || '&title=' || public._url_param(left(v_label || ': ' || j.title, 120))
    || coalesce('&desc=' || public._url_param(nullif(left(btrim(coalesce(p_note, '')), 300), '')), '');

  perform public.worker_notify(
    e.user_id, 'training_offer',
    v_who || ' says it counted as training',
    v_label || ' on ' || coalesce(j.title, 'the job') || ', ' || to_char(v_date, 'Dy DD Mon') || ', '
      || regexp_replace(trim(to_char(p_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h. Add what you learned and submit it',
    jsonb_build_object('job_id', p_job, 'offer_id', v_id, 'route', v_route));

  insert into public.employer_job_comments (job_id, author_name, content, comment_type)
  values (p_job, coalesce(v_who, 'Office'),
          'Offered ' || coalesce(e.name, 'the apprentice') || ' ' || lower(v_label) || ' as off-the-job training ('
            || regexp_replace(trim(to_char(p_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h)',
          'comment');
  return v_id;
end;
$function$;
revoke all on function public.offer_training_from_job(uuid,uuid,integer,text,text,date) from public, anon;
grant execute on function public.offer_training_from_job(uuid,uuid,integer,text,text,date) to authenticated;

create or replace function public.get_job_training(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id not in (select public.my_employer_scope()) then
    return '[]'::jsonb;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'employee_id', e.id, 'name', e.name, 'joined', e.user_id is not null,
             'offers', (select coalesce(jsonb_agg(jsonb_build_object(
                          'date', o.activity_date, 'minutes', o.minutes, 'type', o.activity_type,
                          'logged', exists (select 1 from public.college_otj_entries x
                                             where x.student_id = o.apprentice_user_id
                                               and x.activity_date = o.activity_date
                                               and x.activity_type = o.activity_type
                                               and x.created_at >= o.created_at))
                          order by o.created_at desc), '[]'::jsonb)
                          from public.employer_training_offers o
                         where o.job_id = p_job and o.employee_id = e.id))
           order by e.name)
      from public.employer_employees e
     where e.employer_id = j.user_id
       and lower(coalesce(e.team_role, '')) = 'apprentice'
       and lower(coalesce(e.status, '')) <> 'archived'
       and exists (select 1 from public.employer_job_assignments a where a.job_id = p_job and a.employee_id = e.id)
  ), '[]'::jsonb);
end;
$function$;
revoke all on function public.get_job_training(uuid) from public, anon;
grant execute on function public.get_job_training(uuid) to authenticated;

-- 2 ---------------------------------------------------------------------------
create or replace function public.notify_employer_apprentice_month()
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_from date := date_trunc('month', (now() at time zone 'Europe/London') - interval '1 month')::date;
  v_to date := date_trunc('month', (now() at time zone 'Europe/London'))::date;
  v_ref text := 'apprentice_month:' || to_char(v_from, 'YYYY-MM');
  v_lines text;
begin
  for r in
    select e.employer_id as firm
      from public.employer_employees e
     where e.employer_id is not null and e.user_id is not null
       and lower(coalesce(e.team_role, '')) = 'apprentice' and lower(coalesce(e.status, '')) = 'active'
     group by e.employer_id
  loop
    begin
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      select string_agg(x.line, '; ' order by x.name) into v_lines from (
        select e.name,
               split_part(btrim(regexp_replace(coalesce(e.name, ''), '\(.*?\)', '', 'g')), ' ', 1) || ': '
               || regexp_replace(trim(to_char(coalesce((
                    select sum(o.duration_minutes) from public.college_otj_entries o
                     where o.student_id = e.user_id and o.verification_status = 'verified_by_employer'
                       and o.activity_date >= v_from and o.activity_date < v_to), 0) / 60.0, 'FM990.0')), '\.0$', '')
               || 'h confirmed'
               || coalesce(', ' || nullif((select count(*) from public.college_otj_entries o
                                           where o.student_id = e.user_id and o.verification_status = 'pending'), 0)
                                  || ' waiting', '')
               || coalesce(', attendance ' || (
                    select round(100.0 * count(*) filter (where a.status in ('Present', 'Late')) / nullif(count(*), 0))::int
                      from public.college_students cs join public.college_attendance a on a.student_id = cs.id
                     where cs.user_id = e.user_id and a.date >= v_from and a.date < v_to) || '%', '') as line
          from public.employer_employees e
         where e.employer_id = r.firm and e.user_id is not null
           and lower(coalesce(e.team_role, '')) = 'apprentice' and lower(coalesce(e.status, '')) = 'active'
      ) x;
      if v_lines is null then continue; end if;
      perform public.notify_employer_bell(
        r.firm, 'apprentice_month',
        'Apprentices in ' || to_char(v_from, 'FMMonth'),
        v_lines,
        jsonb_build_object('route', '/employer?section=apprentices'));
    exception when others then
      raise warning '[notify_employer_apprentice_month] %: %', r.firm, sqlerrm;
    end;
  end loop;
end;
$function$;
revoke all on function public.notify_employer_apprentice_month() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule('employer-apprentice-month') where exists (select 1 from cron.job where jobname = 'employer-apprentice-month');
  perform cron.schedule('employer-apprentice-month', '0 8 1 * *', 'select public.notify_employer_apprentice_month();');
end $$;

-- Wording: a name stored in capitals, and a month with no hours.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.offer_training_from_job(uuid,uuid,integer,text,text,date)'::regprocedure);
  if position('initcap(lower(v_who))' in v_def) = 0 then
    v_def := replace(v_def, $q$  v_who := split_part(btrim(coalesce(v_who, 'The office')), ' ', 1);$q$,
      $q$  v_who := split_part(btrim(coalesce(v_who, 'The office')), ' ', 1);
  -- Names typed in capitals read as shouting in a notification.
  if v_who = upper(v_who) then v_who := initcap(lower(v_who)); end if;$q$);
    execute v_def;
  end if;
  v_def := pg_get_functiondef('public.notify_employer_apprentice_month()'::regprocedure);
  if position('no hours confirmed' in v_def) = 0 then
    v_def := replace(v_def, $q$               || regexp_replace(trim(to_char(coalesce((
                    select sum(o.duration_minutes) from public.college_otj_entries o
                     where o.student_id = e.user_id and o.verification_status = 'verified_by_employer'
                       and o.activity_date >= v_from and o.activity_date < v_to), 0) / 60.0, 'FM990.0')), '\.0$', '')
               || 'h confirmed'$q$,
      $q$               || coalesce(regexp_replace(trim(to_char(nullif((
                    select sum(o.duration_minutes) from public.college_otj_entries o
                     where o.student_id = e.user_id and o.verification_status = 'verified_by_employer'
                       and o.activity_date >= v_from and o.activity_date < v_to), 0) / 60.0, 'FM990.0')), '\.0$', '')
               || 'h confirmed', 'no hours confirmed')$q$);
    execute v_def;
  end if;
end $$;

-- One offer per apprentice, job, kind and day: a double tap mustn't send two bells.
create unique index if not exists employer_training_offers_once
  on public.employer_training_offers (job_id, employee_id, activity_type, activity_date);
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.offer_training_from_job(uuid,uuid,integer,text,text,date)'::regprocedure);
  if position('Already sent' in v_def) = 0 then
    v_def := replace(v_def, $q$  insert into public.employer_training_offers (firm, job_id, employee_id, apprentice_user_id, activity_date,$q$,
      $q$  if exists (select 1 from public.employer_training_offers o
              where o.job_id = p_job and o.employee_id = p_employee
                and o.activity_type = p_activity_type and o.activity_date = v_date) then
    raise exception 'Already sent to them for that day';
  end if;
  insert into public.employer_training_offers (firm, job_id, employee_id, apprentice_user_id, activity_date,$q$);
    if position('Already sent' in v_def) = 0 then raise exception 'offer not patched'; end if;
    execute v_def;
  end if;
end $$;
