-- Daily compliance-expiry reminders: insurance, scheme registration, instrument
-- calibration. Feeds the user_notifications bell (no edge function needed).
-- Re-reminds every 14 days while unresolved; stops 60 days past expiry.
-- (Applied to production 2026-07-25 via MCP apply_migration.)

create or replace function public.notify_compliance_expiries()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into user_notifications (user_id, type, title, message, link)
  select cp.user_id,
    'compliance_insurance',
    case when cp.insurance_expiry < current_date
      then 'Public liability insurance has expired'
      else 'Public liability insurance expires soon' end,
    'Your policy with ' || coalesce(cp.insurance_provider, 'your insurer')
      || case when cp.insurance_expiry < current_date then ' expired on ' else ' expires on ' end
      || to_char(cp.insurance_expiry, 'DD Mon YYYY')
      || '. Update it in Settings so your certificates stay right.',
    '/settings?tab=business'
  from company_profiles cp
  where cp.insurance_expiry is not null
    and cp.insurance_expiry <= current_date + 30
    and cp.insurance_expiry >= current_date - 60
    and not exists (
      select 1 from user_notifications n
      where n.user_id = cp.user_id
        and n.type = 'compliance_insurance'
        and n.created_at > now() - interval '14 days');

  insert into user_notifications (user_id, type, title, message, link)
  select cp.user_id,
    'compliance_scheme',
    case when cp.registration_expiry < current_date
      then 'Scheme registration has expired'
      else 'Scheme registration expires soon' end,
    'Your ' || coalesce(cp.registration_scheme, 'scheme') || ' registration'
      || case when cp.registration_expiry < current_date then ' expired on ' else ' expires on ' end
      || to_char(cp.registration_expiry, 'DD Mon YYYY') || '.',
    '/settings?tab=business'
  from company_profiles cp
  where cp.registration_expiry is not null
    and cp.registration_expiry <= current_date + 30
    and cp.registration_expiry >= current_date - 60
    and not exists (
      select 1 from user_notifications n
      where n.user_id = cp.user_id
        and n.type = 'compliance_scheme'
        and n.created_at > now() - interval '14 days');

  insert into user_notifications (user_id, type, title, message, link)
  select distinct cp.user_id,
    'compliance_calibration',
    'Test instrument calibration due',
    'At least one of your test instruments is due calibration within 30 days. Certificates need an in-date meter.',
    '/settings?tab=business'
  from company_profiles cp
  cross join lateral jsonb_array_elements(coalesce(cp.testing_instruments, '[]'::jsonb)) elem
  where (elem->>'calibration_due') ~ '^\d{4}-\d{2}-\d{2}'
    and (elem->>'calibration_due')::date <= current_date + 30
    and (elem->>'calibration_due')::date >= current_date - 60
    and not exists (
      select 1 from user_notifications n
      where n.user_id = cp.user_id
        and n.type = 'compliance_calibration'
        and n.created_at > now() - interval '14 days');
end;
$$;

do $$
begin
  perform cron.unschedule('daily-compliance-expiry-reminders');
exception when others then
  null;
end;
$$;

select cron.schedule(
  'daily-compliance-expiry-reminders',
  '15 8 * * *',
  $$select public.notify_compliance_expiries()$$
);

-- Only pg_cron (postgres) should run the sweep — not the REST API.
revoke execute on function public.notify_compliance_expiries() from public;
revoke execute on function public.notify_compliance_expiries() from anon;
revoke execute on function public.notify_compliance_expiries() from authenticated;
