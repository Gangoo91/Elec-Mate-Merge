-- S8: daily jobs morning brief -> bell notifications (applied via MCP 2026-07-19)
-- One digest per user per day, only when there's something to say.
-- Rollback: select cron.unschedule('jobs-morning-brief'); drop function public.queue_daily_job_nudges();
create or replace function public.queue_daily_job_nudges()
returns int
language plpgsql security definer set search_path = ''
as $$
declare
  r record;
  v_parts text[];
  v_msg text;
  v_sent int := 0;
begin
  for r in
    with per_job as (
      select p.user_id, p.id, p.status, p.estimated_value,
             coalesce(q.n, 0) as qn, coalesce(q.accepted, false) as accepted, q.booked,
             coalesce(i.n, 0) as inv_n, coalesce(i.unpaid, 0) as inv_unpaid,
             coalesce(i.paid, 0) as inv_paid, coalesce(t.done, 0) as tdone
      from public.spark_projects p
      left join lateral (
        select count(*) as n,
               bool_or(qq.acceptance_status in ('accepted','accepted_pending_deposit')
                       or qq.status = 'approved') as accepted,
               max(qq.booked_slot_start) as booked
        from public.quotes qq where qq.project_id = p.id) q on true
      left join lateral (
        select count(*) filter (where iv.status <> 'draft') as n,
               count(*) filter (where iv.status in ('sent','overdue')) as unpaid,
               count(*) filter (where iv.status = 'paid') as paid
        from public.invoices iv where iv.project_id = p.id) i on true
      left join lateral (
        select count(*) filter (where st.status = 'done') as done
        from public.spark_tasks st where st.project_id = p.id) t on true
      where p.status <> 'cancelled'
    ),
    agg as (
      select user_id,
        count(*) filter (where accepted and inv_n = 0 and status <> 'completed'
                         and tdone = 0 and (booked is null or booked < now())) as won_unbooked,
        count(*) filter (where status = 'completed' and inv_n = 0) as bill_jobs,
        coalesce(sum(estimated_value) filter (where status = 'completed' and inv_n = 0), 0) as bill_value,
        count(*) filter (where booked >= date_trunc('day', now())
                         and booked < date_trunc('day', now()) + interval '1 day') as today_jobs,
        count(*) filter (where status in ('open','active') and inv_paid > 0 and inv_unpaid = 0) as paid_open
      from per_job group by user_id
    ),
    certs as (
      select user_id, count(*) as n
      from public.reports
      where expiry_date is not null
        and expiry_date >= now() and expiry_date <= now() + interval '30 days'
      group by user_id
    )
    select a.user_id, a.won_unbooked, a.bill_jobs, a.bill_value, a.today_jobs, a.paid_open,
           coalesce(c.n, 0) as expiring_certs
    from agg a
    left join certs c on c.user_id = a.user_id
    where (a.won_unbooked > 0 or a.bill_jobs > 0 or a.today_jobs > 0
           or a.paid_open > 0 or coalesce(c.n, 0) > 0)
  loop
    if exists (
      select 1 from public.user_notifications n
      where n.user_id = r.user_id and n.type = 'job_digest'
        and n.created_at >= date_trunc('day', now())
    ) then
      continue;
    end if;

    v_parts := array[]::text[];
    if r.today_jobs > 0 then
      v_parts := v_parts || (r.today_jobs || ' job' || case when r.today_jobs = 1 then '' else 's' end || ' on today');
    end if;
    if r.won_unbooked > 0 then
      v_parts := v_parts || (r.won_unbooked || ' accepted job' || case when r.won_unbooked = 1 then '' else 's' end || ' to book in');
    end if;
    if r.bill_jobs > 0 then
      v_parts := v_parts || ('£' || to_char(r.bill_value, 'FM999,999') || ' of finished work to invoice');
    end if;
    if r.paid_open > 0 then
      v_parts := v_parts || (r.paid_open || ' paid job' || case when r.paid_open = 1 then '' else 's' end || ' ready to close');
    end if;
    if r.expiring_certs > 0 then
      v_parts := v_parts || (r.expiring_certs || ' cert' || case when r.expiring_certs = 1 then '' else 's' end || ' expiring within 30 days — renewal work');
    end if;

    v_msg := array_to_string(v_parts, ' · ');

    insert into public.user_notifications (user_id, type, title, message, link)
    values (r.user_id, 'job_digest', 'Morning brief', v_msg, '/electrician/projects');
    v_sent := v_sent + 1;
  end loop;

  return v_sent;
end $$;

revoke execute on function public.queue_daily_job_nudges() from public, anon, authenticated;

select cron.schedule('jobs-morning-brief', '0 7 * * *', 'select public.queue_daily_job_nudges();');
