-- ELE-1833 review fixes.
--  1. "One-to-one" isn't on the apprentice's list of training kinds, so it
--     arrived with no visible type. Offers are now the five kinds the
--     apprentice's form shows (mentoring covers a one-to-one).
--  2. The sender's name: "The says it counted…" when someone had no name.
--  3. Only an apprentice on that job can be offered training from it.
--  4. The office's note goes in the bell, not into the apprentice's
--     reflection box: the reflection must be theirs (funding rules).
--  5. Line breaks in the note are kept (%0A).
--  6. "Logged by them" ignores entries the college rejected.
--  7. Monthly note: hours the firm confirmed still count after the college
--     verifies them; "waiting" is only what this firm can confirm.

create or replace function public._url_param(p text)
returns text
language sql
immutable
set search_path = public
as $$
  select replace(replace(replace(replace(replace(replace(replace(replace(replace(p,
           '%', '%25'), '&', '%26'), '#', '%23'), '+', '%2B'), '?', '%3F'), ' ', '%20'), '=', '%3D'),
           E'\n', '%0A'), E'\r', '%0D')
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
  v_name text;
  v_who text;
  v_label text;
  v_note text := nullif(left(btrim(coalesce(p_note, '')), 300), '');
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
  if lower(coalesce(e.team_role, '')) <> 'apprentice'
     or not exists (select 1 from public.employer_job_assignments a where a.job_id = p_job and a.employee_id = p_employee) then
    raise exception 'Only an apprentice on this job';
  end if;
  if p_activity_type not in ('shadowing', 'mentoring', 'employer_meeting', 'manufacturer_training', 'industry_visit') then
    raise exception 'Only teaching time counts: shadowing, mentoring, a toolbox talk, manufacturer training or an industry visit';
  end if;
  if p_minutes is null or p_minutes < 15 or p_minutes > 600 then
    raise exception 'Between 15 minutes and 10 hours';
  end if;
  if v_date > (now() at time zone 'Europe/London')::date then
    raise exception 'Training can''t be in the future';
  end if;
  if exists (select 1 from public.employer_training_offers o
              where o.job_id = p_job and o.employee_id = p_employee
                and o.activity_type = p_activity_type and o.activity_date = v_date) then
    raise exception 'Already sent to them for that day';
  end if;

  insert into public.employer_training_offers (firm, job_id, employee_id, apprentice_user_id, activity_date,
                                               minutes, activity_type, note, offered_by)
  values (j.user_id, p_job, p_employee, e.user_id, v_date, p_minutes, p_activity_type, v_note, auth.uid())
  returning id into v_id;

  select nullif(btrim(coalesce(a.full_name, p.full_name, '')), '') into v_name
    from public.profiles p
    left join public.employer_admins a on a.user_id = p.id and a.employer_id = j.user_id and a.status = 'active'
   where p.id = auth.uid();
  v_who := split_part(v_name, ' ', 1);
  if v_who is not null and v_who = upper(v_who) then v_who := initcap(lower(v_who)); end if;
  v_who := coalesce(nullif(v_who, ''), 'The office');

  v_label := case p_activity_type
    when 'shadowing' then 'Shadowing' when 'mentoring' then 'Mentoring'
    when 'employer_meeting' then 'Toolbox talk' when 'manufacturer_training' then 'Manufacturer training'
    else 'Industry visit' end;

  -- No note in the link: the reflection box stays empty for the apprentice's own words.
  v_route := '/apprentice/ojt-hub?log=firm'
    || '&type=' || p_activity_type
    || '&mins=' || p_minutes
    || '&date=' || to_char(v_date, 'YYYY-MM-DD')
    || '&title=' || public._url_param(left(v_label || ': ' || j.title, 120));

  perform public.worker_notify(
    e.user_id, 'training_offer',
    v_who || ' says it counted as training',
    v_label || ' on ' || coalesce(j.title, 'the job') || ', ' || to_char(v_date, 'Dy DD Mon') || ', '
      || regexp_replace(trim(to_char(p_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h.'
      || coalesce(' "' || left(v_note, 140) || '"', '')
      || ' Write what you learned and submit it',
    jsonb_build_object('job_id', p_job, 'offer_id', v_id, 'route', v_route));

  insert into public.employer_job_comments (job_id, author_name, content, comment_type)
  values (p_job, coalesce(v_name, 'Office'),
          'Offered ' || coalesce(e.name, 'the apprentice') || ' ' || lower(v_label) || ' as off-the-job training ('
            || regexp_replace(trim(to_char(p_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h)',
          'comment');
  return v_id;
end;
$function$;
revoke all on function public.offer_training_from_job(uuid,uuid,integer,text,text,date) from public, anon;
grant execute on function public.offer_training_from_job(uuid,uuid,integer,text,text,date) to authenticated;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_job_training(uuid)'::regprocedure);
  if position('<> ''rejected''' in v_def) = 0 then
    v_def := replace(v_def, $q$                                               and x.created_at >= o.created_at))$q$,
      $q$                                               and x.created_at >= o.created_at
                                               and x.verification_status <> 'rejected'))$q$);
    if position('<> ''rejected''' in v_def) = 0 then raise exception 'get_job_training not patched'; end if;
    execute v_def;
  end if;
end $$;

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
               -- The firm's confirmations, still counted once the college has verified them too.
               || coalesce(regexp_replace(trim(to_char(nullif((
                    select sum(o.duration_minutes) from public.college_otj_entries o
                     where o.student_id = e.user_id
                       and o.source_kind = 'employer_attested'
                       and o.verification_status in ('verified_by_employer', 'verified')
                       and o.activity_date >= v_from and o.activity_date < v_to), 0) / 60.0, 'FM990.0')), '\.0$', '')
               || 'h confirmed', 'no hours confirmed')
               -- Waiting = what this firm can confirm, logged while they were on the team.
               || coalesce(', ' || nullif((select count(*) from public.college_otj_entries o
                                           where o.student_id = e.user_id and o.verification_status = 'pending'
                                             and o.source_kind in ('apprentice_submitted', 'in_app')
                                             and o.created_at >= e.created_at), 0)
                                  || ' waiting for you', '')
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
