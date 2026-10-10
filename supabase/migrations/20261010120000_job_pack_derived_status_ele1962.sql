-- ELE-1962: a job pack completes itself when everyone has signed, and the
-- office can chase everyone still to sign in one tap (plus a daily auto-chase).
--
-- Additive only:
--   * _pack_sync_status(pack)      derives Sent/Complete from the sign-offs
--   * trigger pack_sync_status     on employer_job_pack_acknowledgements; it can
--                                  never break the sign-off write (warning only)
--   * chase_pack_unsigned(pack)    office "Chase n unsigned"; once a day per worker
--   * chase_unsigned_pack_signoffs() daily cron: day 1 and day 3 after sending
--   * notification type pack_complete (route opens the exact pack)
--   * backfill: sent packs that everyone has already signed become Complete
-- Existing chase_pack_signoff / send_job_pack are untouched.

-- 1. Derive the status of one pack from its sign-offs ------------------------
create or replace function public._pack_sync_status(p_pack uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pack record;
  v_need int;
  v_signed int;
  v_new text;
begin
  select p.id, p.status, p.employer_id, p.title, p.job_id, p.assigned_workers
    into v_pack
    from public.employer_job_packs p
   where p.id = p_pack
   for update;
  if v_pack.id is null then return null; end if;
  -- A draft has not been sent: nothing to derive.
  if coalesce(v_pack.status, 'Draft') = 'Draft' then return v_pack.status; end if;

  -- Who must sign: everyone with a sign-off row, plus anyone assigned since
  -- the pack went out; a removed (archived) person is never waited on.
  with need as (
    select a.employee_id, bool_or(a.acknowledged_at is not null) as signed
      from public.employer_job_pack_acknowledgements a
     where a.job_pack_id = p_pack
     group by a.employee_id
    union all
    select w, false
      from unnest(coalesce(v_pack.assigned_workers, array[]::uuid[])) w
     where not exists (select 1 from public.employer_job_pack_acknowledgements a
                        where a.job_pack_id = p_pack and a.employee_id = w)
  )
  select count(*), count(*) filter (where n.signed)
    into v_need, v_signed
    from need n
    join public.employer_employees e on e.id = n.employee_id
   where lower(coalesce(e.status, '')) <> 'archived';

  v_new := case when v_need > 0 and v_signed = v_need then 'Complete' else 'In Progress' end;
  if v_new is distinct from v_pack.status then
    update public.employer_job_packs
       set status = v_new, updated_at = now()
     where id = p_pack;
    if v_new = 'Complete' then
      perform public.notify_employer_bell(
        v_pack.employer_id,
        'pack_complete',
        'Job pack signed by everyone',
        coalesce(v_pack.title, 'A job pack') || ': all ' || v_need ||
          case when v_need = 1 then ' person has' else ' people have' end || ' signed.',
        jsonb_build_object('job_pack_id', p_pack, 'job_id', v_pack.job_id,
          'route', '/employer?section=jobpacks&pack=' || p_pack));
    end if;
  end if;
  return v_new;
end;
$$;
revoke all on function public._pack_sync_status(uuid) from public, anon, authenticated;

create or replace function public.trg_pack_sync_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE'
     and new.acknowledged_at is not distinct from old.acknowledged_at
     and new.job_pack_id = old.job_pack_id then
    return null;
  end if;
  begin
    perform public._pack_sync_status(case when tg_op = 'DELETE' then old.job_pack_id else new.job_pack_id end);
    if tg_op = 'UPDATE' and new.job_pack_id <> old.job_pack_id then
      perform public._pack_sync_status(old.job_pack_id);
    end if;
  exception when others then
    raise warning '[trg_pack_sync_status] %', sqlerrm;
  end;
  return null;
end;
$$;
revoke all on function public.trg_pack_sync_status() from public, anon, authenticated;

drop trigger if exists pack_sync_status on public.employer_job_pack_acknowledgements;
create trigger pack_sync_status
  after insert or update or delete on public.employer_job_pack_acknowledgements
  for each row execute function public.trg_pack_sync_status();

-- 2. The office chases everyone still to sign --------------------------------
create or replace function public.chase_pack_unsigned(p_pack_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pack record;
  r record;
  v_chased int := 0;
  v_today int := 0;
  v_unlinked int := 0;
begin
  select p.id, p.title, p.employer_id into v_pack
    from public.employer_job_packs p
   where p.id = p_pack_id
     and p.employer_id in (select public.my_employer_scope());
  if v_pack.id is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  for r in
    select a.id, a.employee_id, e.user_id
      from public.employer_job_pack_acknowledgements a
      join public.employer_employees e on e.id = a.employee_id
     where a.job_pack_id = p_pack_id
       and a.acknowledged_at is null
       and lower(coalesce(e.status, '')) <> 'archived'
  loop
    if r.user_id is null then
      v_unlinked := v_unlinked + 1;
      continue;
    end if;
    -- 'log:' refs never count towards the office's daily summary email.
    insert into public.employer_expiry_sent (firm, ref)
    values (v_pack.employer_id, 'log:pack_chase:' || r.id || ':' || current_date)
    on conflict do nothing;
    if not found then
      v_today := v_today + 1;
      continue;
    end if;
    perform public.worker_notify(
      r.user_id, 'pack_chase',
      'Reminder: sign your job pack',
      coalesce(v_pack.title, 'Job pack') || ' is waiting for your signature before you start',
      jsonb_build_object('job_pack_id', p_pack_id, 'employee_id', r.employee_id,
        'route', '/electrician/worker-tools/signoffs?signoff=' || r.id));
    v_chased := v_chased + 1;
  end loop;

  return jsonb_build_object('success', true, 'chased', v_chased,
    'already_today', v_today, 'not_linked', v_unlinked);
end;
$$;
revoke all on function public.chase_pack_unsigned(uuid) from public, anon;
grant execute on function public.chase_pack_unsigned(uuid) to authenticated;

-- 3. Daily auto-chase: one day and three days after the pack went out --------
create or replace function public.chase_unsigned_pack_signoffs()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_stage int;
  v_n int := 0;
begin
  for r in
    select a.id, a.employee_id, e.user_id, p.id as pack_id, p.title, p.employer_id,
           p.sent_to_workers_at
      from public.employer_job_pack_acknowledgements a
      join public.employer_job_packs p on p.id = a.job_pack_id
      join public.employer_employees e on e.id = a.employee_id
      left join public.employer_jobs j on j.id = p.job_id
     where a.acknowledged_at is null
       and p.status = 'In Progress'
       and p.sent_to_workers_at is not null
       and p.sent_to_workers_at <= now() - interval '20 hours'
       and p.sent_to_workers_at >= now() - interval '14 days'
       and e.user_id is not null
       and lower(coalesce(e.status, '')) <> 'archived'
       and (j.id is null or (j.archived_at is null
            and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')))
  loop
    begin
      v_stage := case when r.sent_to_workers_at <= now() - interval '68 hours' then 3 else 1 end;
      insert into public.employer_expiry_sent (firm, ref)
      values (r.employer_id, 'log:pack_autochase:' || r.id || ':' || v_stage)
      on conflict do nothing;
      continue when not found;
      -- Counts as today's chase, so the office button doesn't send a second one.
      insert into public.employer_expiry_sent (firm, ref)
      values (r.employer_id, 'log:pack_chase:' || r.id || ':' || current_date)
      on conflict do nothing;
      continue when not found;
      perform public.worker_notify(
        r.user_id, 'pack_chase',
        'Reminder: sign your job pack',
        coalesce(r.title, 'Job pack') || ' is waiting for your signature before you start',
        jsonb_build_object('job_pack_id', r.pack_id, 'employee_id', r.employee_id,
          'route', '/electrician/worker-tools/signoffs?signoff=' || r.id));
      v_n := v_n + 1;
    exception when others then
      raise warning '[chase_unsigned_pack_signoffs] ack %: %', r.id, sqlerrm;
    end;
  end loop;
  return v_n;
end;
$$;
revoke all on function public.chase_unsigned_pack_signoffs() from public, anon, authenticated;

-- 4. Notification type for the office bell ------------------------------------
insert into public.notification_types (type, category, push, importance)
values ('pack_complete', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- 5. Backfill: packs already signed by everyone (no notification) -------------
with need as (
  select p.id as pack_id, x.employee_id, x.signed
    from public.employer_job_packs p
    cross join lateral (
      select a.employee_id, bool_or(a.acknowledged_at is not null) as signed
        from public.employer_job_pack_acknowledgements a
       where a.job_pack_id = p.id
       group by a.employee_id
      union all
      select w, false
        from unnest(coalesce(p.assigned_workers, array[]::uuid[])) w
       where not exists (select 1 from public.employer_job_pack_acknowledgements a
                          where a.job_pack_id = p.id and a.employee_id = w)
    ) x
   where p.status = 'In Progress'
), tally as (
  select n.pack_id, count(*) as need, count(*) filter (where n.signed) as signed
    from need n
    join public.employer_employees e on e.id = n.employee_id
   where lower(coalesce(e.status, '')) <> 'archived'
   group by n.pack_id
)
update public.employer_job_packs p
   set status = 'Complete', updated_at = now()
  from tally t
 where t.pack_id = p.id and t.need > 0 and t.signed = t.need and p.status = 'In Progress';

-- 6. Cron -----------------------------------------------------------------------
do $$
begin
  perform cron.unschedule('employer-pack-signoff-chase')
    where exists (select 1 from cron.job where jobname = 'employer-pack-signoff-chase');
  perform cron.schedule('employer-pack-signoff-chase', '40 8 * * *',
    'select public.chase_unsigned_pack_signoffs();');
end $$;
