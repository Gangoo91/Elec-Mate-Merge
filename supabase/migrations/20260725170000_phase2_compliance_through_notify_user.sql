-- ELE-226 Phase 2 — route compliance + ECS expiry reminders through notify_user
-- so they PUSH (not just bell), with prefs + enriched metadata. The 14-day bell
-- anti-spam guard is preserved exactly; both functions are SECURITY DEFINER so
-- they can call the locked-down spine.

create or replace function public.notify_compliance_expiries()
returns void language plpgsql security definer set search_path to 'public'
as $function$
declare r record;
begin
  -- Public liability insurance
  for r in
    select cp.user_id,
      case when cp.insurance_expiry < current_date then 'Public liability insurance has expired'
           else 'Public liability insurance expires soon' end as title,
      'Your policy with ' || coalesce(cp.insurance_provider, 'your insurer')
        || case when cp.insurance_expiry < current_date then ' expired on ' else ' expires on ' end
        || to_char(cp.insurance_expiry, 'DD Mon YYYY')
        || '. Update it in Settings so your certificates stay right.' as message,
      to_char(cp.insurance_expiry,'YYYY-MM-DD') as ref
    from company_profiles cp
    where cp.insurance_expiry is not null
      and cp.insurance_expiry <= current_date + 30
      and cp.insurance_expiry >= current_date - 60
      and not exists (select 1 from user_notifications n
        where n.user_id = cp.user_id and n.type = 'compliance_insurance'
          and n.created_at > now() - interval '14 days')
  loop
    perform notify_user(r.user_id, 'compliance_insurance', r.title, r.message,
      jsonb_build_object('route','/settings?tab=business','ref_id', r.ref));
  end loop;

  -- Scheme registration (NICEIC / NAPIT / etc.)
  for r in
    select cp.user_id,
      case when cp.registration_expiry < current_date then 'Scheme registration has expired'
           else 'Scheme registration expires soon' end as title,
      'Your ' || coalesce(cp.registration_scheme, 'scheme') || ' registration'
        || case when cp.registration_expiry < current_date then ' expired on ' else ' expires on ' end
        || to_char(cp.registration_expiry, 'DD Mon YYYY') || '.' as message,
      to_char(cp.registration_expiry,'YYYY-MM-DD') as ref
    from company_profiles cp
    where cp.registration_expiry is not null
      and cp.registration_expiry <= current_date + 30
      and cp.registration_expiry >= current_date - 60
      and not exists (select 1 from user_notifications n
        where n.user_id = cp.user_id and n.type = 'compliance_scheme'
          and n.created_at > now() - interval '14 days')
  loop
    perform notify_user(r.user_id, 'compliance_scheme', r.title, r.message,
      jsonb_build_object('route','/settings?tab=business','ref_id', r.ref));
  end loop;

  -- Test instrument calibration
  for r in
    select distinct cp.user_id
    from company_profiles cp
    cross join lateral jsonb_array_elements(coalesce(cp.testing_instruments, '[]'::jsonb)) elem
    where (elem->>'calibration_due') ~ '^\d{4}-\d{2}-\d{2}'
      and (elem->>'calibration_due')::date <= current_date + 30
      and (elem->>'calibration_due')::date >= current_date - 60
      and not exists (select 1 from user_notifications n
        where n.user_id = cp.user_id and n.type = 'compliance_calibration'
          and n.created_at > now() - interval '14 days')
  loop
    perform notify_user(r.user_id, 'compliance_calibration',
      'Test instrument calibration due',
      'At least one of your test instruments is due calibration within 30 days. Certificates need an in-date meter.',
      jsonb_build_object('route','/settings?tab=business','ref_id','calibration'));
  end loop;
end;
$function$;

create or replace function public.notify_ecs_expiries()
returns void language plpgsql security definer set search_path to 'public'
as $function$
declare r record;
begin
  for r in
    select ee.user_id,
      case when ep.ecs_expiry_date < current_date then 'ECS card has expired'
           else 'ECS card expires soon' end as title,
      'Your ECS card'
        || case when ep.ecs_expiry_date < current_date then ' expired on ' else ' expires on ' end
        || to_char(ep.ecs_expiry_date, 'DD Mon YYYY')
        || '. Renew it and update your Elec-ID.' as message,
      to_char(ep.ecs_expiry_date,'YYYY-MM-DD') as ref
    from employer_elec_id_profiles ep
    join employer_employees ee on ee.id = ep.employee_id
    where ep.ecs_expiry_date is not null
      and ee.user_id is not null
      and ep.ecs_expiry_date <= current_date + 30
      and ep.ecs_expiry_date >= current_date - 60
      and not exists (select 1 from user_notifications n
        where n.user_id = ee.user_id and n.type = 'compliance_ecs_card'
          and n.created_at > now() - interval '14 days')
  loop
    perform notify_user(r.user_id, 'compliance_ecs_card', r.title, r.message,
      jsonb_build_object('route','/settings?tab=elec-id','ref_id', r.ref));
  end loop;
end;
$function$;
