-- ============================================================================
-- ELE-1095 — automated compliance expiry alerts (DBS / CPD / qualifications).
--
-- Daily pure-SQL cron (no net.http_post → avoids the silent-401 trap). Scans
-- staff_compliance_records and fires a staged in-app notification as each record
-- crosses 90 / 60 / 30 / 0 days to expiry, and once on becoming overdue.
-- Specific, not generic: "<name>'s <requirement> expires in N days (date)."
--
-- Recipients: the college's compliance leads (is_quality_nominee, or admin /
-- head_of_department) AND the staff member whose record it is (if they have an
-- app account). Deduped per (record, stage, recipient) via not-exists on
-- push_notification_log — fires each stage exactly once, no schema column needed.
--
-- NOT YET APPLIED — review + deploy. Follow-ups (separate): the Resend email
-- channel needs an edge function; and a "N expiring within 30 days" home banner
-- (FE) keyed off useComplianceStats.
-- ============================================================================

create or replace function public.notify_compliance_expiry()
returns int
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_count int;
begin
  insert into push_notification_log (user_id, type, reference_id, title, body)
  select recip.user_id,
         'compliance_expiry_' || x.stage,
         r.id::text,
         case when x.stage = 'overdue' then 'Compliance record expired'
              else 'Compliance record expiring' end,
         coalesce(sc.name, r.staff_name_snapshot, 'A staff member')
           || '''s ' || coalesce(crt.label, r.requirement_code)
           || case when x.stage = 'overdue'
                   then ' has EXPIRED (' || to_char(r.expires_at, 'DD Mon YYYY') || '). Renew it immediately.'
                   else ' expires in ' || (r.expires_at - current_date)
                        || ' day' || case when (r.expires_at - current_date) = 1 then '' else 's' end
                        || ' (' || to_char(r.expires_at, 'DD Mon YYYY') || '). Upload the renewal.'
              end
  from staff_compliance_records r
  join college_staff sc on sc.id = r.college_staff_id
  left join compliance_requirement_types crt on crt.code = r.requirement_code
  cross join lateral (
    select case
      when r.expires_at - current_date between 61 and 90 then '90'
      when r.expires_at - current_date between 31 and 60 then '60'
      when r.expires_at - current_date between 1 and 30 then '30'
      when r.expires_at - current_date = 0 then '0'
      when r.expires_at - current_date < 0 then 'overdue'
      else null end as stage
  ) x
  cross join lateral (
    select distinct lead.user_id
    from college_staff lead
    where lead.college_id = sc.college_id
      and lead.archived_at is null
      and lead.user_id is not null
      and (lead.is_quality_nominee
           or lead.role in ('admin', 'head_of_department')
           or lead.id = r.college_staff_id)
  ) recip
  where r.expires_at is not null
    and r.status is distinct from 'expired'
    and x.stage is not null
    and not exists (
      select 1 from push_notification_log l
      where l.reference_id = r.id::text
        and l.type = 'compliance_expiry_' || x.stage
        and l.user_id = recip.user_id
    );
  get diagnostics v_count = row_count;
  return v_count;
end;
$function$;

revoke execute on function public.notify_compliance_expiry() from anon, authenticated, public;

-- Daily at 07:00. Idempotent re-schedule.
do $$
begin
  perform cron.unschedule('compliance-expiry-alerts');
exception when others then null;
end $$;
select cron.schedule('compliance-expiry-alerts', '0 7 * * *',
  $$select public.notify_compliance_expiry();$$);

-- ============================================================================
-- ROLLBACK:
--   select cron.unschedule('compliance-expiry-alerts');
--   drop function if exists public.notify_compliance_expiry();
-- ============================================================================
