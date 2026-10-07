-- ELE-1820: week diary + dispatch board (Employer Hub → Jobs → Diary) and the
-- worker's "My week" (Worker Tools).
--
-- * employer_job_assignments gains an optional start time and hours per day,
--   so a block can say "08:00 · 4h" and the board can show capacity.
-- * employer_dispatch_changes: who moved what, when — the worker sees
--   "Moved by Mark, 10:12"; the office sees what hasn't been sent yet.
--   Written only by trigger log_dispatch_change (every writer is covered).
-- * Pushes are batched: a move doesn't push at once. A worker's unsent
--   changes go out as ONE push once they've been quiet for 60 s (cron, max
--   wait 5 min), or straight away when the office taps "Send changes".
--   A brand-new assignment still pushes at once via notify_assignment
--   (unchanged), so its log row is born already-notified.
-- * RPCs (all SECURITY DEFINER, firm-scoped through my_employer_scope(), so
--   office managers can dispatch; nothing here returns money):
--     get_dispatch_board, dispatch_assign, dispatch_move, dispatch_unassign,
--     reschedule_job (timeline drag/resize, ELE-1961), copy_dispatch_week,
--     publish_dispatch_changes, get_my_week (worker).

-- ── Assignment time + hours ────────────────────────────────────────────────

alter table public.employer_job_assignments
  add column if not exists start_time time,
  add column if not exists hours_per_day numeric(4, 2);

alter table public.employer_job_assignments
  drop constraint if exists employer_job_assignments_hours_per_day_check;
alter table public.employer_job_assignments
  add constraint employer_job_assignments_hours_per_day_check
  check (hours_per_day is null or (hours_per_day > 0 and hours_per_day <= 24));

alter table public.employer_job_assignments
  drop constraint if exists employer_job_assignments_date_order_check;
alter table public.employer_job_assignments
  add constraint employer_job_assignments_date_order_check
  check (end_date is null or end_date >= start_date);

comment on column public.employer_job_assignments.start_time is
  'Optional start time on each day of the booking (Diary, ELE-1820). Null = no set time.';
comment on column public.employer_job_assignments.hours_per_day is
  'Optional hours booked per day (Diary capacity). Null = a full working day (8h).';

-- ── Change log ─────────────────────────────────────────────────────────────

create table if not exists public.employer_dispatch_changes (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references auth.users(id) on delete cascade,
  employee_id uuid not null references public.employer_employees(id) on delete cascade,
  -- No FK: a "taken off the job" row must outlive the assignment, and the
  -- title is snapshotted so the line still reads after a rename or delete.
  job_id uuid,
  assignment_id uuid,
  job_title text,
  kind text not null check (kind in ('assigned', 'moved', 'removed')),
  old_start date,
  old_end date,
  new_start date,
  new_end date,
  old_time time,
  new_time time,
  changed_by uuid references auth.users(id) on delete set null,
  changed_by_name text,
  -- clock_timestamp, not now(): a timeline drag writes several rows in one
  -- transaction and the batch must still know which came last.
  created_at timestamptz not null default clock_timestamp(),
  notified_at timestamptz
);

create index if not exists employer_dispatch_changes_firm_idx
  on public.employer_dispatch_changes (firm_id, created_at desc);
create index if not exists employer_dispatch_changes_employee_idx
  on public.employer_dispatch_changes (employee_id, created_at desc);
create index if not exists employer_dispatch_changes_assignment_idx
  on public.employer_dispatch_changes (assignment_id, created_at desc);
create index if not exists employer_dispatch_changes_unsent_idx
  on public.employer_dispatch_changes (firm_id, employee_id) where notified_at is null;

alter table public.employer_dispatch_changes enable row level security;

drop policy if exists "Managers read firm dispatch changes" on public.employer_dispatch_changes;
create policy "Managers read firm dispatch changes" on public.employer_dispatch_changes
  for select to authenticated
  using (firm_id in (select public.my_employer_scope()));

drop policy if exists "Worker reads own dispatch changes" on public.employer_dispatch_changes;
create policy "Worker reads own dispatch changes" on public.employer_dispatch_changes
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));

revoke all on table public.employer_dispatch_changes from anon, public;
grant select on table public.employer_dispatch_changes to authenticated;

comment on table public.employer_dispatch_changes is
  '[EMPLOYER HUB → WORKER TOOLS] Dispatch history: each assign / move / take-off of a person on a job, with who did it and when (ELE-1820). '
  'Scope: firm_id = owning account (profiles.id); employee_id → roster. '
  'Used by: Employer Hub Diary ("changes not sent"), Worker Tools My week ("Moved by Mark, 10:12"). '
  'Rule: written only by trigger log_dispatch_change on employer_job_assignments; notified_at set when the batched push goes (flush_dispatch_changes).';

-- ── Trigger: log every change to an assignment ─────────────────────────────

create or replace function public.trg_log_dispatch_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_title text;
  v_by uuid := auth.uid();
  v_name text;
begin
  select j.user_id, j.title into v_firm, v_title
    from public.employer_jobs j
   where j.id = coalesce(new.job_id, old.job_id);
  -- Job already gone (cascade delete): nothing to show anyone.
  if v_firm is null then
    return null;
  end if;

  select nullif(btrim(p.full_name), '') into v_name from public.profiles p where p.id = v_by;

  if tg_op = 'INSERT' then
    insert into public.employer_dispatch_changes
      (firm_id, employee_id, job_id, assignment_id, job_title, kind,
       new_start, new_end, new_time, changed_by, changed_by_name, notified_at)
    values
      (v_firm, new.employee_id, new.job_id, new.id, v_title, 'assigned',
       new.start_date, new.end_date, new.start_time, v_by, v_name,
       now()); -- notify_assignment already pushed this one
  elsif tg_op = 'DELETE' then
    insert into public.employer_dispatch_changes
      (firm_id, employee_id, job_id, assignment_id, job_title, kind,
       old_start, old_end, old_time, changed_by, changed_by_name)
    values
      (v_firm, old.employee_id, old.job_id, old.id, v_title, 'removed',
       old.start_date, old.end_date, old.start_time, v_by, v_name);
  elsif new.employee_id is distinct from old.employee_id then
    insert into public.employer_dispatch_changes
      (firm_id, employee_id, job_id, assignment_id, job_title, kind,
       old_start, old_end, old_time, changed_by, changed_by_name)
    values
      (v_firm, old.employee_id, old.job_id, old.id, v_title, 'removed',
       old.start_date, old.end_date, old.start_time, v_by, v_name);
    insert into public.employer_dispatch_changes
      (firm_id, employee_id, job_id, assignment_id, job_title, kind,
       new_start, new_end, new_time, changed_by, changed_by_name)
    values
      (v_firm, new.employee_id, new.job_id, new.id, v_title, 'assigned',
       new.start_date, new.end_date, new.start_time, v_by, v_name);
  elsif (new.start_date, new.end_date, new.start_time, new.hours_per_day)
        is distinct from (old.start_date, old.end_date, old.start_time, old.hours_per_day) then
    insert into public.employer_dispatch_changes
      (firm_id, employee_id, job_id, assignment_id, job_title, kind,
       old_start, old_end, old_time, new_start, new_end, new_time, changed_by, changed_by_name)
    values
      (v_firm, new.employee_id, new.job_id, new.id, v_title, 'moved',
       old.start_date, old.end_date, old.start_time, new.start_date, new.end_date, new.start_time,
       v_by, v_name);
  end if;
  return null;
exception when others then
  raise warning '[trg_log_dispatch_change] %', sqlerrm;
  return null;
end;
$$;

revoke all on function public.trg_log_dispatch_change() from public, anon, authenticated;

drop trigger if exists log_dispatch_change on public.employer_job_assignments;
create trigger log_dispatch_change
  after insert or update or delete on public.employer_job_assignments
  for each row execute function public.trg_log_dispatch_change();

-- ── Batched push ───────────────────────────────────────────────────────────

create or replace function public.dispatch_day_label(p_start date, p_end date)
returns text
language sql
stable
set search_path = public
as $$
  -- "Thu 8 Oct", "Thu 8 to Fri 9 Oct", "Fri 30 Oct to Mon 2 Nov"
  select case
    when p_start is null then 'no date'
    when p_end is null or p_end = p_start then to_char(p_start, 'Dy FMDD Mon')
    when date_trunc('month', p_start) = date_trunc('month', p_end)
      then to_char(p_start, 'Dy FMDD') || ' to ' || to_char(p_end, 'Dy FMDD Mon')
    else to_char(p_start, 'Dy FMDD Mon') || ' to ' || to_char(p_end, 'Dy FMDD Mon')
  end
$$;

revoke all on function public.dispatch_day_label(date, date) from public, anon;
grant execute on function public.dispatch_day_label(date, date) to authenticated;

-- p_quiet / p_max_wait null = send everything now (the office's button).
create or replace function public.flush_dispatch_changes(
  p_firm uuid,
  p_quiet interval default null,
  p_max_wait interval default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_sent integer := 0;
  v_lines text[];
  v_by text;
  v_msg text;
  v_week date;
begin
  for r in
    select c.employee_id, e.user_id, array_agg(c.id) as ids
      from public.employer_dispatch_changes c
      join public.employer_employees e on e.id = c.employee_id
     where c.notified_at is null
       and (p_firm is null or c.firm_id = p_firm)
     group by c.employee_id, e.user_id
    having p_quiet is null
        or max(c.created_at) <= now() - p_quiet
        or min(c.created_at) <= now() - coalesce(p_max_wait, p_quiet)
  loop
    -- One line per job: the net effect of this batch.
    with batch as (
      select c.*,
             row_number() over (partition by coalesce(c.job_id, c.id) order by c.created_at desc) as rn,
             bool_or(c.kind = 'assigned') over (partition by coalesce(c.job_id, c.id)) as had_add,
             bool_or(c.kind = 'removed') over (partition by coalesce(c.job_id, c.id)) as had_remove
        from public.employer_dispatch_changes c
       where c.id = any (r.ids)
    ),
    net as (
      select b.*,
             case
               when b.kind = 'removed' and b.had_add then null          -- added then taken off: nothing
               when b.kind = 'removed' then 'Taken off ' || coalesce(b.job_title, 'a job')
               when b.had_add then 'Added to ' || coalesce(b.job_title, 'a job') || ', '
                                   || public.dispatch_day_label(b.new_start, b.new_end)
               else coalesce(b.job_title, 'A job') || ' is now '
                    || public.dispatch_day_label(b.new_start, b.new_end)
             end as line
        from batch b
       where b.rn = 1
    )
    select array_agg(line order by created_at) filter (where line is not null),
           (array_agg(initcap(split_part(changed_by_name, ' ', 1)) order by created_at desc)
              filter (where changed_by_name is not null))[1],
           min(coalesce(new_start, old_start))
      into v_lines, v_by, v_week
      from net;

    if r.user_id is not null and coalesce(array_length(v_lines, 1), 0) > 0 then
      v_msg := coalesce(v_by, 'The office') || ': '
               || array_to_string(v_lines[1:3], '. ')
               || case when array_length(v_lines, 1) > 3
                       then '. +' || (array_length(v_lines, 1) - 3) || ' more'
                       else '' end
               || '.';
      perform public.worker_notify(
        r.user_id,
        'dispatch_update',
        case when array_length(v_lines, 1) = 1 then 'Your week has changed'
             else 'Your week has changed (' || array_length(v_lines, 1) || ' changes)' end,
        v_msg,
        jsonb_build_object(
          'route', '/electrician/worker-tools/my-week'
                   || case when v_week is not null
                           then '?week=' || to_char(date_trunc('week', v_week)::date, 'YYYY-MM-DD')
                           else '' end,
          'employee_id', r.employee_id));
      v_sent := v_sent + 1;
    end if;

    update public.employer_dispatch_changes set notified_at = now() where id = any (r.ids);
  end loop;
  return v_sent;
end;
$$;

revoke all on function public.flush_dispatch_changes(uuid, interval, interval) from public, anon, authenticated;

create or replace function public.publish_dispatch_changes(p_firm uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  return public.flush_dispatch_changes(p_firm, null, null);
end;
$$;

revoke all on function public.publish_dispatch_changes(uuid) from public, anon;
grant execute on function public.publish_dispatch_changes(uuid) to authenticated;

-- Every minute: send each worker's changes once they've been quiet for 60 s.
do $cron$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'dispatch-changes-batch';
  perform cron.schedule(
    'dispatch-changes-batch',
    '* * * * *',
    $job$select public.flush_dispatch_changes(null, interval '60 seconds', interval '5 minutes')$job$
  );
end;
$cron$;

-- ── Guards shared by the dispatch RPCs ─────────────────────────────────────

create or replace function public.dispatch_job_firm(p_job uuid)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  select j.user_id into v_firm
    from public.employer_jobs j
   where j.id = p_job and j.archived_at is null;
  if v_firm is null or auth.uid() is null
     or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Job not found' using errcode = '42501';
  end if;
  return v_firm;
end;
$$;

revoke all on function public.dispatch_job_firm(uuid) from public, anon, authenticated;

create or replace function public.dispatch_check_person(p_firm uuid, p_employee uuid)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_name text;
begin
  select e.name into v_name
    from public.employer_employees e
   where e.id = p_employee
     and e.employer_id = p_firm
     and lower(coalesce(e.status, '')) <> 'archived';
  if v_name is null then
    raise exception 'That person is not on your team' using errcode = '42501';
  end if;
  return v_name;
end;
$$;

revoke all on function public.dispatch_check_person(uuid, uuid) from public, anon, authenticated;

-- ── Board read ─────────────────────────────────────────────────────────────

create or replace function public.get_dispatch_board(p_firm uuid, p_from date, p_to date)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 62 then
    raise exception 'Choose a range of up to 9 weeks' using errcode = '22023';
  end if;

  return jsonb_build_object(
    'people', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', e.id, 'name', e.name, 'initials', e.avatar_initials,
               'role', e.role, 'team_role', e.team_role, 'photo_url', e.photo_url,
               'linked', e.user_id is not null)
             order by lower(e.name))
        from public.employer_employees e
       where e.employer_id = p_firm
         and lower(coalesce(e.status, '')) <> 'archived'), '[]'::jsonb),

    'jobs', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', j.id, 'title', j.title, 'client', j.client, 'location', j.location,
               'start_date', j.start_date, 'end_date', j.end_date,
               'stage', j.board_stage, 'status', j.status, 'progress', j.progress)
             order by j.start_date nulls last, j.title)
        from public.employer_jobs j
       where j.user_id = p_firm
         and j.archived_at is null
         and not coalesce(j.is_template, false)
         and j.status <> 'Cancelled'
         and (
           (j.start_date is not null
              and j.start_date <= p_to
              and coalesce(j.end_date, j.start_date) >= p_from)
           or exists (
              select 1 from public.employer_job_assignments a
               where a.job_id = j.id
                 and a.start_date <= p_to
                 and coalesce(a.end_date, j.end_date, a.start_date) >= p_from)
           -- Won work with no date yet: the "to schedule" tray.
           or (j.start_date is null
               and j.board_stage in ('Confirmed', 'Scheduled', 'In Progress', 'Testing'))
         )), '[]'::jsonb),

    'assignments', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', a.id, 'job_id', a.job_id, 'employee_id', a.employee_id,
               'start_date', a.start_date,
               'end_date', coalesce(a.end_date, j.end_date, a.start_date),
               'start_time', to_char(a.start_time, 'HH24:MI'),
               'hours_per_day', a.hours_per_day,
               'role_on_job', a.role_on_job, 'notes', a.notes,
               'last_change', (
                 select jsonb_build_object('kind', c.kind, 'by', c.changed_by_name,
                                           'at', c.created_at, 'sent', c.notified_at is not null)
                   from public.employer_dispatch_changes c
                  where c.assignment_id = a.id
                  order by c.created_at desc limit 1)))
        from public.employer_job_assignments a
        join public.employer_jobs j on j.id = a.job_id
       where j.user_id = p_firm
         and j.archived_at is null
         and j.status <> 'Cancelled'
         and lower(coalesce(a.status, '')) not in ('removed', 'cancelled')
         and a.start_date <= p_to
         and coalesce(a.end_date, j.end_date, a.start_date) >= p_from), '[]'::jsonb),

    'leave', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', l.id, 'employee_id', l.employee_id, 'type', l.type,
               'start_date', l.start_date, 'end_date', l.end_date, 'half_day', l.half_day))
        from public.employer_leave_requests l
        join public.employer_employees e on e.id = l.employee_id
       where e.employer_id = p_firm
         and l.status = 'Approved'
         and l.start_date <= p_to
         and l.end_date >= p_from), '[]'::jsonb),

    'unsent', (
      select jsonb_build_object('changes', count(*), 'people', count(distinct c.employee_id))
        from public.employer_dispatch_changes c
       where c.firm_id = p_firm and c.notified_at is null)
  );
end;
$$;

revoke all on function public.get_dispatch_board(uuid, date, date) from public, anon;
grant execute on function public.get_dispatch_board(uuid, date, date) to authenticated;

-- ── Assign / move / take off ───────────────────────────────────────────────

create or replace function public.dispatch_assign(
  p_job uuid,
  p_employee uuid,
  p_start date,
  p_end date default null,
  p_start_time time default null,
  p_hours numeric default null,
  p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid := public.dispatch_job_firm(p_job);
  v_end date := coalesce(p_end, p_start);
  v_id uuid;
  v_name text;
begin
  perform public.dispatch_check_person(v_firm, p_employee);
  if p_start is null or v_end < p_start then
    raise exception 'The end date is before the start date' using errcode = '22023';
  end if;
  if exists (select 1 from public.employer_jobs where id = p_job and status = 'Cancelled') then
    raise exception 'This job is cancelled' using errcode = '22023';
  end if;

  select a.id into v_id
    from public.employer_job_assignments a
   where a.job_id = p_job and a.employee_id = p_employee;

  if v_id is not null then
    -- Already on the job: this is a re-book of their dates.
    update public.employer_job_assignments
       set start_date = p_start, end_date = v_end,
           start_time = p_start_time, hours_per_day = p_hours,
           notes = coalesce(p_notes, notes),
           status = case when lower(coalesce(status, '')) in ('removed', 'cancelled')
                         then 'assigned' else status end,
           updated_at = now()
     where id = v_id;
  else
    select nullif(btrim(p.full_name), '') into v_name from public.profiles p where p.id = auth.uid();
    insert into public.employer_job_assignments
      (job_id, employee_id, start_date, end_date, start_time, hours_per_day, notes,
       status, assigned_by, assigned_by_id, notify_email)
    values
      (p_job, p_employee, p_start, v_end, p_start_time, p_hours, p_notes,
       'assigned', coalesce(v_name, 'Office'), auth.uid(), true)
    returning id into v_id;
  end if;

  -- The job covers everyone on it: extend, never shrink, its dates.
  update public.employer_jobs j
     set start_date = least(coalesce(j.start_date, p_start), p_start),
         end_date = greatest(coalesce(j.end_date, j.start_date, v_end), v_end),
         board_stage = case when j.board_stage = 'Confirmed' then 'Scheduled' else j.board_stage end,
         updated_at = now()
   where j.id = p_job;

  return v_id;
end;
$$;

revoke all on function public.dispatch_assign(uuid, uuid, date, date, time, numeric, text) from public, anon;
grant execute on function public.dispatch_assign(uuid, uuid, date, date, time, numeric, text) to authenticated;

create or replace function public.dispatch_move(
  p_assignment uuid,
  p_employee uuid,
  p_start date,
  p_end date,
  p_start_time time default null,
  p_hours numeric default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_a public.employer_job_assignments%rowtype;
  v_firm uuid;
  v_end date := coalesce(p_end, p_start);
  v_others integer;
  v_name text;
begin
  select * into v_a from public.employer_job_assignments where id = p_assignment;
  if v_a.id is null then
    raise exception 'Booking not found' using errcode = '42501';
  end if;
  v_firm := public.dispatch_job_firm(v_a.job_id);
  perform public.dispatch_check_person(v_firm, coalesce(p_employee, v_a.employee_id));
  if p_start is null or v_end < p_start then
    raise exception 'The end date is before the start date' using errcode = '22023';
  end if;

  if p_employee is not null and p_employee <> v_a.employee_id
     and exists (select 1 from public.employer_job_assignments
                  where job_id = v_a.job_id and employee_id = p_employee) then
    select name into v_name from public.employer_employees where id = p_employee;
    raise exception '% is already on this job', coalesce(v_name, 'That person')
      using errcode = '23505';
  end if;

  update public.employer_job_assignments
     set employee_id = coalesce(p_employee, employee_id),
         start_date = p_start,
         end_date = v_end,
         start_time = p_start_time,
         hours_per_day = p_hours,
         updated_at = now()
   where id = p_assignment;

  select count(*) into v_others
    from public.employer_job_assignments
   where job_id = v_a.job_id and id <> p_assignment;

  if v_others = 0 then
    -- The only booking on the job: the job moves with it.
    update public.employer_jobs
       set start_date = p_start, end_date = v_end, updated_at = now()
     where id = v_a.job_id;
  else
    -- Others are on it too: the job stretches to cover, never shrinks here
    -- (reshape the whole job on the Timeline).
    update public.employer_jobs j
       set start_date = least(coalesce(j.start_date, p_start), p_start),
           end_date = greatest(coalesce(j.end_date, j.start_date, v_end), v_end),
           updated_at = now()
     where j.id = v_a.job_id;
  end if;
end;
$$;

revoke all on function public.dispatch_move(uuid, uuid, date, date, time, numeric) from public, anon;
grant execute on function public.dispatch_move(uuid, uuid, date, date, time, numeric) to authenticated;

create or replace function public.dispatch_unassign(p_assignment uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job uuid;
begin
  select job_id into v_job from public.employer_job_assignments where id = p_assignment;
  if v_job is null then
    raise exception 'Booking not found' using errcode = '42501';
  end if;
  perform public.dispatch_job_firm(v_job);
  delete from public.employer_job_assignments where id = p_assignment;
end;
$$;

revoke all on function public.dispatch_unassign(uuid) from public, anon;
grant execute on function public.dispatch_unassign(uuid) to authenticated;

-- ── Timeline drag / resize (ELE-1961) — same dates the Diary uses ──────────

create or replace function public.reschedule_job(p_job uuid, p_start date, p_end date)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old_start date;
  v_delta integer;
  v_end date := coalesce(p_end, p_start);
begin
  perform public.dispatch_job_firm(p_job);
  if p_start is null or v_end < p_start then
    raise exception 'The end date is before the start date' using errcode = '22023';
  end if;

  select start_date into v_old_start from public.employer_jobs where id = p_job;
  v_delta := coalesce(p_start - v_old_start, 0);

  -- Everyone on the job slides with it, then is kept inside the new dates.
  update public.employer_job_assignments a
     set start_date = least(greatest(a.start_date + v_delta, p_start), v_end),
         end_date = case when a.end_date is null then null
                         else greatest(least(greatest(a.end_date + v_delta, p_start), v_end),
                                       least(greatest(a.start_date + v_delta, p_start), v_end)) end,
         updated_at = now()
   where a.job_id = p_job
     and (a.start_date is distinct from least(greatest(a.start_date + v_delta, p_start), v_end)
          or a.end_date is distinct from case when a.end_date is null then null
               else greatest(least(greatest(a.end_date + v_delta, p_start), v_end),
                             least(greatest(a.start_date + v_delta, p_start), v_end)) end);

  update public.employer_jobs
     set start_date = p_start, end_date = v_end, updated_at = now()
   where id = p_job;
end;
$$;

revoke all on function public.reschedule_job(uuid, date, date) from public, anon;
grant execute on function public.reschedule_job(uuid, date, date) to authenticated;

-- ── Copy last week ─────────────────────────────────────────────────────────
-- Anyone still on an open job on last week's Friday stays on it through this
-- week's Friday. Preview with p_apply = false; nothing is written.

create or replace function public.copy_dispatch_week(p_firm uuid, p_week_start date, p_apply boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_monday date := date_trunc('week', p_week_start)::date;
  v_last_fri date := date_trunc('week', p_week_start)::date - 3;
  v_fri date := date_trunc('week', p_week_start)::date + 4;
  v_rows jsonb;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'assignment_id', a.id, 'job_id', j.id, 'job_title', j.title,
           'employee_id', e.id, 'name', e.name, 'new_end', v_fri) order by e.name, j.title), '[]'::jsonb)
    into v_rows
    from public.employer_job_assignments a
    join public.employer_jobs j on j.id = a.job_id
    join public.employer_employees e on e.id = a.employee_id
   where j.user_id = p_firm
     and j.archived_at is null
     and j.status not in ('Completed', 'Cancelled', 'On Hold')
     and lower(coalesce(e.status, '')) <> 'archived'
     and a.start_date <= v_last_fri
     and coalesce(a.end_date, j.end_date, a.start_date) >= v_last_fri
     and coalesce(a.end_date, j.end_date, a.start_date) < v_monday;

  if p_apply then
    update public.employer_job_assignments a
       set end_date = v_fri, updated_at = now()
     where a.id in (select (x->>'assignment_id')::uuid from jsonb_array_elements(v_rows) x);
    update public.employer_jobs j
       set end_date = greatest(coalesce(j.end_date, j.start_date, v_fri), v_fri), updated_at = now()
     where j.id in (select (x->>'job_id')::uuid from jsonb_array_elements(v_rows) x);
  end if;

  return v_rows;
end;
$$;

revoke all on function public.copy_dispatch_week(uuid, date, boolean) from public, anon;
grant execute on function public.copy_dispatch_week(uuid, date, boolean) to authenticated;

-- ── Worker: My week ────────────────────────────────────────────────────────

create or replace function public.get_my_week(p_from date)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_from date := coalesce(p_from, date_trunc('week', (now() at time zone 'Europe/London'))::date);
  v_to date := coalesce(p_from, date_trunc('week', (now() at time zone 'Europe/London'))::date) + 6;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if not exists (select 1 from public.employer_employees e
                  where e.user_id = auth.uid() and e.employer_id is not null
                    and lower(coalesce(e.status, '')) = 'active') then
    return null;
  end if;

  return jsonb_build_object(
    'from', v_from,
    'to', v_to,
    'yard', (
      select nullif(btrim(coalesce(nullif(btrim(cp.office_address), ''),
                                   concat_ws(', ', nullif(btrim(cp.company_address), ''),
                                             nullif(btrim(cp.company_postcode), '')))), '')
        from public.employer_employees e
        join public.company_profiles cp on cp.user_id = e.employer_id
       where e.user_id = auth.uid() and lower(coalesce(e.status, '')) = 'active'
       order by e.created_at limit 1),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
               'assignment_id', a.id, 'job_id', j.id, 'title', j.title, 'client', j.client,
               'location', j.location, 'stage', j.board_stage,
               'start_date', a.start_date,
               'end_date', coalesce(a.end_date, j.end_date, a.start_date),
               'start_time', to_char(a.start_time, 'HH24:MI'),
               'hours_per_day', a.hours_per_day,
               'role_on_job', a.role_on_job, 'notes', a.notes,
               'last_change', (
                 select jsonb_build_object('kind', c.kind, 'by', c.changed_by_name, 'at', c.created_at,
                                           'old_start', c.old_start, 'old_end', c.old_end)
                   from public.employer_dispatch_changes c
                  where c.assignment_id = a.id and c.kind in ('moved', 'assigned')
                    and c.created_at > now() - interval '14 days'
                  order by c.created_at desc limit 1))
             order by a.start_date, a.start_time nulls last, j.title)
        from public.employer_job_assignments a
        join public.employer_employees e on e.id = a.employee_id
        join public.employer_jobs j on j.id = a.job_id
       where e.user_id = auth.uid()
         and lower(coalesce(e.status, '')) = 'active'
         and j.archived_at is null
         and j.status <> 'Cancelled'
         and lower(coalesce(a.status, '')) not in ('removed', 'cancelled')
         and a.start_date <= v_to
         and coalesce(a.end_date, j.end_date, a.start_date) >= v_from), '[]'::jsonb),
    'leave', coalesce((
      select jsonb_agg(jsonb_build_object('type', l.type, 'start_date', l.start_date,
                                          'end_date', l.end_date, 'half_day', l.half_day))
        from public.employer_leave_requests l
        join public.employer_employees e on e.id = l.employee_id
       where e.user_id = auth.uid()
         and l.status = 'Approved'
         and l.start_date <= v_to and l.end_date >= v_from), '[]'::jsonb),
    'changes', coalesce((
      select jsonb_agg(x order by (x->>'at') desc) from (
        select jsonb_build_object('kind', c.kind, 'job_title', c.job_title, 'job_id', c.job_id,
                                  'old_start', c.old_start, 'old_end', c.old_end,
                                  'new_start', c.new_start, 'new_end', c.new_end,
                                  'by', c.changed_by_name, 'at', c.created_at) as x
          from public.employer_dispatch_changes c
          join public.employer_employees e on e.id = c.employee_id
         where e.user_id = auth.uid()
           and c.created_at > now() - interval '14 days'
         order by c.created_at desc
         limit 12) s), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_my_week(date) from public, anon;
grant execute on function public.get_my_week(date) to authenticated;
