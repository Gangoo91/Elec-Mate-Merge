-- Mate that knows safety (ELE-1939): one read-only, firm-scoped safety brief
-- the Employer Mate edge function calls with the CALLER's JWT, so the guard
-- below (p_firm in my_employer_scope()) decides what Mate may read, not the
-- service role. Owner, admins and office managers all pass; nothing here is
-- money, so office managers see the same answer as the owner.
--
-- Same definitions as get_employer_home's safety block, with names and dates
-- instead of counts:
--   incidents  open reports, newest first, with the RIDDOR deadline
--              (10 days; 15 for over-7-day; none for occupational disease)
--   actions    overdue fixes: incident corrective actions + site actions
--   packs      job packs sent to the crew with signatures missing, and who
--   rams       RAMS awaiting sign-off (submitted / generated)
--   tickets    team credentials expired or expiring within p_days
--
-- p_search narrows incidents, packs and RAMS to a job / site / title match
-- ("Orchard Close"). p_since_days narrows incidents to the last N days.
-- Site Safety owns these tables; this only reads them.

create or replace function public.get_employer_safety_brief(
  p_firm uuid,
  p_search text default null,
  p_days integer default 30,
  p_since_days integer default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_like text;
  v_days integer := least(greatest(coalesce(p_days, 30), 0), 365);
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  v_like := case when v_q is null then null else '%' || replace(replace(v_q, '%', ''), '_', '') || '%' end;

  return (
    with
    roster as (
      select e.id, e.name from public.employer_employees e
       where e.employer_id = p_firm
         and lower(coalesce(e.status, 'active')) <> 'archived'
    ),
    inc as (
      select i.*, j.title as job_title,
             case when i.riddor_category is null or i.riddor_category = 'not_reportable'
                    or i.riddor_reported_at is not null then null
                  when i.riddor_category = 'occupational_disease' then null
                  else (coalesce(i.reported_at, i.created_at) at time zone 'Europe/London')::date
                       + case when i.riddor_category = 'over_7_day' then 15 else 10 end
             end as riddor_due,
             (i.riddor_category is not null and i.riddor_category <> 'not_reportable'
               and i.riddor_reported_at is null) as riddor_outstanding
        from public.employer_incidents i
        left join public.employer_jobs j on j.id = i.job_id
       where i.employer_id = p_firm
         and lower(coalesce(i.status, '')) not in ('closed', 'resolved')
         and (p_since_days is null
              or coalesce(i.reported_at, i.created_at) >= now() - make_interval(days => greatest(p_since_days, 0)))
         and (v_like is null or i.title ilike v_like or coalesce(i.location, '') ilike v_like
              or coalesce(j.title, '') ilike v_like or coalesce(j.location, '') ilike v_like)
    ),
    inc_actions as (
      select i.title as source, act ->> 'action' as action, act ->> 'owner_name' as owner,
             nullif(act ->> 'due_date', '')::date as due
        from public.employer_incidents i
        cross join lateral jsonb_array_elements(
          case when jsonb_typeof(i.corrective_actions) = 'array' then i.corrective_actions else '[]'::jsonb end
        ) act
       where i.employer_id = p_firm
         and lower(coalesce(i.status, '')) not in ('closed', 'resolved')
         and nullif(act ->> 'done_at', '') is null
    ),
    site_actions as (
      select coalesce(s.source_type, 'Site safety') as source, s.action_description as action,
             s.assigned_to as owner, s.target_date as due
        from public.safety_corrective_actions s
       where s.user_id = p_firm
         and lower(coalesce(s.status, '')) not in ('completed', 'cancelled')
    ),
    overdue as (
      select * from inc_actions where due < v_today
      union all
      select * from site_actions where due < v_today
    ),
    packs as (
      select p.id, p.title, coalesce(j.title, p.title) as job_title,
             coalesce(j.location, p.location) as location, p.sent_to_workers_at,
             (select count(*) from public.employer_job_pack_acknowledgements a
               where a.job_pack_id = p.id and a.acknowledged_at is not null) as signed,
             (select coalesce(jsonb_agg(coalesce(r.name, 'Unknown') order by r.name), '[]'::jsonb)
                from public.employer_job_pack_acknowledgements a
                left join public.employer_employees r on r.id = a.employee_id
               where a.job_pack_id = p.id and a.acknowledged_at is null) as not_signed
        from public.employer_job_packs p
        left join public.employer_jobs j on j.id = p.job_id
       where p.employer_id = p_firm
         and p.sent_to_workers_at is not null
         and exists (select 1 from public.employer_job_pack_acknowledgements a
                      where a.job_pack_id = p.id and a.acknowledged_at is null)
         and (v_like is null or p.title ilike v_like or coalesce(p.location, '') ilike v_like
              or coalesce(p.client, '') ilike v_like
              or coalesce(j.title, '') ilike v_like or coalesce(j.location, '') ilike v_like)
    ),
    rams as (
      select r.id, r.project_name, r.location, r.status, r.date, r.updated_at
        from public.rams_documents r
       where r.user_id = p_firm
         and r.status in ('submitted', 'generated')
         and (v_like is null or coalesce(r.project_name, '') ilike v_like
              or coalesce(r.location, '') ilike v_like)
    ),
    creds as (
      select e.name, c.qualification_name, c.expiry_date
        from roster e
        join public.employer_elec_id_qualifications c
          on c.profile_id = public._elec_id_profile_for_roster(e.id)
       where (c.training_status is null or c.training_status in ('Completed', 'Expired'))
         and c.expiry_date is not null
         and c.expiry_date <= v_today + v_days
    )
    select jsonb_build_object(
      'today', v_today,
      'search', v_q,
      'incidents', jsonb_build_object(
        'open', (select count(*) from inc),
        'unseen', (select count(*) from inc where acknowledged_at is null),
        'riddor_outstanding', (select count(*) from inc where riddor_outstanding),
        'items', coalesce((
          select jsonb_agg(jsonb_build_object(
                   'title', x.title, 'severity', x.severity, 'status', x.status,
                   'type', x.incident_type, 'job', x.job_title, 'location', x.location,
                   'reported', (coalesce(x.reported_at, x.created_at) at time zone 'Europe/London')::date,
                   'opened', x.acknowledged_at is not null,
                   'riddor', x.riddor_outstanding, 'riddor_category', x.riddor_category,
                   'riddor_due', x.riddor_due)
                 order by x.riddor_outstanding desc, coalesce(x.reported_at, x.created_at) desc)
            from (select * from inc order by riddor_outstanding desc,
                    coalesce(reported_at, created_at) desc limit 15) x), '[]'::jsonb)),
      'actions', jsonb_build_object(
        'open', (select count(*) from inc_actions) + (select count(*) from site_actions),
        'overdue', (select count(*) from overdue),
        'items', coalesce((
          select jsonb_agg(jsonb_build_object('action', o.action, 'source', o.source,
                   'owner', o.owner, 'due', o.due) order by o.due)
            from (select * from overdue order by due limit 15) o), '[]'::jsonb)),
      'packs', jsonb_build_object(
        'unsigned', (select count(*) from packs),
        'signatures_missing', (select coalesce(sum(jsonb_array_length(not_signed)), 0) from packs),
        'items', coalesce((
          select jsonb_agg(jsonb_build_object('title', k.title, 'job', k.job_title,
                   'location', k.location,
                   'sent', (k.sent_to_workers_at at time zone 'Europe/London')::date,
                   'signed', k.signed, 'not_signed', k.not_signed)
                 order by k.sent_to_workers_at)
            from (select * from packs order by sent_to_workers_at limit 15) k), '[]'::jsonb)),
      'rams', jsonb_build_object(
        'awaiting_signoff', (select count(*) from rams),
        'items', coalesce((
          select jsonb_agg(jsonb_build_object('project', r.project_name, 'location', r.location,
                   'status', r.status, 'date', r.date) order by r.updated_at desc)
            from (select * from rams order by updated_at desc limit 15) r), '[]'::jsonb)),
      'tickets', jsonb_build_object(
        'window_days', v_days,
        'expiring', (select count(*) from creds),
        'expired', (select count(*) from creds where expiry_date < v_today),
        'items', coalesce((
          select jsonb_agg(jsonb_build_object('name', c.name, 'ticket', c.qualification_name,
                   'expires', c.expiry_date, 'expired', c.expiry_date < v_today)
                 order by c.expiry_date)
            from (select * from creds order by expiry_date limit 25) c), '[]'::jsonb))
    )
  );
end;
$function$;

comment on function public.get_employer_safety_brief(uuid, text, integer, integer) is
  'Read-only safety brief for Employer Mate (ELE-1939): open incidents with RIDDOR deadlines, overdue safety actions, packs with missing signatures (and who), RAMS awaiting sign-off, expiring tickets. No money. Guard: p_firm in my_employer_scope(); call with the user''s JWT.';

revoke all on function public.get_employer_safety_brief(uuid, text, integer, integer) from public, anon;
grant execute on function public.get_employer_safety_brief(uuid, text, integer, integer) to authenticated;
