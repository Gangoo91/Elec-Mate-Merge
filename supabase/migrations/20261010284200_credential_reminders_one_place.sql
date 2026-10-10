-- Gap #10, 10 Oct 2026: insurance and scheme renewal reminders come from one
-- place, employer_expiry_items -> notify_employer_expiries, deduped by
-- employer_expiry_sent (30 days, 7 days, overdue; once each).
--
-- Before: the Settings policy and scheme were reminded by
-- notify_compliance_expiries (every 14 days, 30 days before to 60 days after),
-- and register policies by notify_employer_expiries. A firm holding the same
-- cover in both would have been reminded twice.
--
-- Same signatures; no client calls these (cron only:
-- daily-compliance-expiry-reminders runs notify_compliance_expiries, which
-- calls notify_employer_expiries). The Settings items keep their old
-- notification types (compliance_insurance / compliance_scheme, so the
-- "Certificates & compliance" switch still governs them) and their old route
-- (/settings?tab=business, which works for every account). Recipients widen
-- from the owner to the owner and active admins, like every firm expiry.
-- Cutover: an item is held back while an old-style reminder of the same type
-- went out in the last 14 days, so nobody is told twice in a fortnight.

-- 1. The item list gains the Settings policy and scheme.
create or replace function public.employer_expiry_items()
 returns table(firm uuid, kind text, item_id uuid, field text, label text, due date, name text, route text)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select v.user_id, 'vehicle', v.id, f.field, f.label, f.due,
         coalesce(nullif(trim(v.registration), ''), nullif(trim(concat_ws(' ', v.make, v.model)), ''), 'A vehicle'),
         '/employer?section=fleet&vehicle=' || v.id
    from public.vehicles v
   cross join lateral (values
     ('mot_expiry', 'MOT', v.mot_expiry),
     ('tax_expiry', 'Road tax', v.tax_expiry),
     ('insurance_expiry', 'Insurance', v.insurance_expiry),
     ('next_service', 'Service', v.next_service)) f(field, label, due)
   where f.due is not null and coalesce(v.status, '') <> 'Off Road'
  union all
  select p.user_id, 'policy', p.id, 'review_date', 'Policy review', p.review_date,
         coalesce(nullif(trim(p.name), ''), 'A policy'), '/employer?section=policies'
    from public.employer_policies p
   where p.review_date is not null and coalesce(p.status, '') not in ('Draft', 'Archived')
  union all
  select d.user_id, 'compliance_document', d.id, 'expiry_date', 'Document renewal', d.expiry_date,
         coalesce(nullif(trim(d.title), ''), 'A compliance document'), '/employer?section=compliance&doc=' || d.id
    from public.compliance_documents d
   where d.expiry_date is not null and coalesce(d.status, '') <> 'Draft'
     and d.certificate_for is null
  union all
  -- Gap #10: the Settings policy and scheme (the one home for both).
  select s.firm,
         case s.area when 'insurance' then 'firm_insurance' else 'firm_scheme' end,
         s.profile_id,
         case s.area when 'insurance' then 'insurance_expiry' else 'registration_expiry' end,
         case s.area when 'insurance' then 'Public liability insurance' else 'Scheme registration' end,
         s.expiry,
         coalesce(s.provider, case s.area when 'insurance' then 'Your policy' else 'Your scheme' end),
         '/settings?tab=business'
    from public._settings_credentials() s
   where s.expiry is not null
  union all
  select t.user_id, 'tool', t.id, f.field, f.label, f.due,
         coalesce(nullif(trim(t.name), ''), 'A tool')
           || case when t.assigned_to_employee_id is not null or t.assigned_vehicle_id is not null
                   then ', with ' || public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id)
                   else '' end,
         '/employer?section=kit&tool=' || t.id
    from public.employer_company_tools t
   cross join lateral (values
     ('pat_due', 'PAT test', t.pat_due),
     ('next_calibration', 'Calibration', t.next_calibration)) f(field, label, due)
   where f.due is not null and coalesce(t.status, '') not in ('Lost', 'Written Off')
  union all
  select r.employer_id, 'team_credential', q.id, 'expiry_date',
         public.qualification_label(q.qualification_name), q.expiry_date,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=elecid&member=' || r.id
    from public.employer_employees r
    join public.employer_elec_id_qualifications q
      on q.profile_id = public._elec_id_profile_for_roster(r.id)
   where r.employer_id is not null
     and lower(coalesce(r.status, '')) <> 'archived'
     and q.expiry_date is not null
     and (q.training_status is null or q.training_status in ('Completed', 'Expired'))
  union all
  select r.employer_id, 'team_ecs_card', p.id, 'ecs_expiry_date', 'ECS card', p.ecs_expiry_date,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=elecid&member=' || r.id
    from public.employer_employees r
    join public.employer_elec_id_profiles p
      on p.id = public._elec_id_profile_for_roster(r.id)
   where r.employer_id is not null
     and lower(coalesce(r.status, '')) <> 'archived'
     and p.ecs_expiry_date is not null
  union all
  select d.employer_id, 'subcontractor_insurance', d.roster_id, 'insurance_expiry',
         'Insurance', d.insurance_expiry,
         coalesce(nullif(trim(r.name), ''), 'Subcontractor'),
         '/employer?section=subcontractors&member=' || r.id
    from public.employer_subcontractor_details d
    join public.employer_employees r on r.id = d.roster_id
   where d.insurance_expiry is not null
     and r.team_role = 'Subcontractor'
     and lower(coalesce(r.status, '')) <> 'archived'
  union all
  select l.employer_id, 'right_to_work', r.id, 'follow_up_due',
         'Right-to-work follow-up', l.follow_up_due,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from (select distinct on (c.roster_id) c.roster_id, c.employer_id, least(c.follow_up_due, c.permission_expires_on) as follow_up_due, c.check_type
            from public.employer_rtw_checks c
           where c.roster_id is not null
           order by c.roster_id, c.checked_on desc, c.created_at desc) l
    join public.employer_employees r on r.id = l.roster_id and r.employer_id = l.employer_id
   where l.follow_up_due is not null
     and l.check_type <> 'not_required'
     and lower(coalesce(r.status, '')) <> 'archived'
  union all
  select h.employer_id, 'probation', h.roster_id, 'probation_review',
         'Probation review', coalesce(h.probation_review_date, h.probation_end_date),
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from public.employer_person_hr h
    join public.employer_employees r on r.id = h.roster_id and r.employer_id = h.employer_id
   where coalesce(h.probation_review_date, h.probation_end_date) is not null
     and (h.probation_outcome is null or h.probation_outcome = 'extended')
     and lower(coalesce(r.status, '')) <> 'archived'
  union all
  select h.employer_id, 'qualifying_period', h.roster_id, 'qualifying_date',
         'Probation decision', public.hr_qualifying_date(coalesce(h.start_date, r.join_date), public._hr_firm_law(h.employer_id)),
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from public.employer_person_hr h
    join public.employer_employees r on r.id = h.roster_id and r.employer_id = h.employer_id
   where h.probation_end_date is not null
     and (h.probation_outcome is null or h.probation_outcome = 'extended')
     and coalesce(r.team_role, '') <> 'Subcontractor'
     and lower(coalesce(r.status, '')) <> 'archived'
     and public.hr_qualifying_date(coalesce(h.start_date, r.join_date), public._hr_firm_law(h.employer_id)) >= current_date
$function$;

-- 2. The sender: the Settings items keep their old types.
create or replace function public.notify_employer_expiries()
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  r record;
  v_stage text;
  v_ref text;
  v_days int;
  v_ts int; v_ts_oldest date; v_leave int; v_exp int; v_new int;
  v_list jsonb;
  v_hr record;
  v_type text;
begin
  for r in
    select * from public.employer_expiry_items() i
     where i.firm is not null
       and i.due <= current_date + 30
       and i.due >= current_date - 60
  loop
    begin
      v_stage := case when r.due < current_date then 'overdue'
                      when r.due <= current_date + 7 then 'due7'
                      else 'due30' end;
      v_ref := r.kind || ':' || r.item_id || ':' || r.field || ':' || r.due || ':' || v_stage;
      -- Gap #10: the Settings policy and scheme keep the types they had under
      -- notify_compliance_expiries. Cutover: hold one back while an old-style
      -- reminder of that type went out in the last 14 days.
      v_type := case r.kind when 'firm_insurance' then 'compliance_insurance'
                            when 'firm_scheme' then 'compliance_scheme'
                            else 'employer_expiry' end;
      if v_type <> 'employer_expiry' and exists (
           select 1 from public.user_notifications n
            where n.user_id = r.firm and n.type = v_type
              and n.created_at > now() - interval '14 days'
              and coalesce(n.metadata->>'kind', '') <> r.kind) then
        continue;
      end if;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      v_days := r.due - current_date;
      if public._hr_expiry_kind(r.kind) then
        -- HR (ELE-2061/2075): owner and admins only, plain wording.
        select * into v_hr from public._hr_expiry_text(r.kind, r.label, r.name, r.due, v_stage);
        perform public.notify_employer_admins_bell(
          r.firm, 'employer_expiry', v_hr.title, v_hr.message,
          jsonb_build_object('route', r.route, 'ref_id', v_ref, 'kind', r.kind, 'item_id', r.item_id, 'due', r.due)
        );
        continue;
      end if;
      perform public.notify_employer_bell(
        r.firm,
        v_type,
        r.label || case when v_stage = 'overdue' then ' overdue' else ' due' end || ' · ' || r.name,
        case when v_stage = 'overdue' then 'Was due ' || to_char(r.due, 'FMDD Mon YYYY') || '.'
             when v_days = 0 then 'Due today.'
             else 'Due ' || to_char(r.due, 'FMDD Mon YYYY') || ' (in ' || v_days ||
                  case when v_days = 1 then ' day).' else ' days).' end
        end,
        jsonb_build_object('route', r.route, 'ref_id', v_ref, 'kind', r.kind, 'item_id', r.item_id, 'due', r.due)
      );
    exception when others then
      raise warning '[notify_employer_expiries] item %: %', r.item_id, sqlerrm;
    end;
  end loop;

  for r in
    select j.user_id as firm, d.id, j.title as job_title, j.start_date, d.status,
           coalesce(nullif(trim(d.project_name), ''), j.title, 'RAMS') as name
      from public.rams_documents d
      join public.employer_jobs j on j.id = d.employer_job_id
     where j.start_date between current_date and current_date + 3
       and j.archived_at is null
       and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')
       and lower(coalesce(d.status, '')) not in ('approved', 'issued')
  loop
    begin
      v_ref := 'rams:' || r.id || ':' || r.start_date;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      perform public.notify_employer_bell(
        r.firm,
        'employer_expiry',
        'RAMS not signed off · ' || coalesce(r.job_title, r.name),
        'The job starts ' || to_char(r.start_date, 'FMDD Mon') || ' and its RAMS is still ' ||
          case lower(coalesce(r.status, '')) when 'generated' then 'an AI draft' else coalesce(lower(r.status), 'a draft') end || '.',
        jsonb_build_object('route', '/employer?section=rams', 'ref_id', v_ref, 'kind', 'rams', 'item_id', r.id)
      );
    exception when others then
      raise warning '[notify_employer_expiries] rams %: %', r.id, sqlerrm;
    end;
  end loop;

  if extract(isodow from (now() at time zone 'Europe/London')) < 6 then
    for r in
      select cp.user_id as firm
        from public.company_profiles cp
       where nullif(trim(cp.notification_email), '') is not null
    loop
      begin
        select count(*), min(t.date) into v_ts, v_ts_oldest
          from public.employer_timesheets t
          join public.employer_employees e on e.id = t.employee_id
         where e.employer_id = r.firm
           and lower(coalesce(t.status, '')) in ('pending', 'submitted')
           and t.total_hours is not null;
        select count(*) into v_leave
          from public.employer_leave_requests l
          join public.employer_employees e on e.id = l.employee_id
         where e.employer_id = r.firm and lower(coalesce(l.status, '')) = 'pending';
        select count(*) into v_exp
          from public.employer_expense_claims x
          join public.employer_employees e on e.id = x.employee_id
         where e.employer_id = r.firm and lower(coalesce(x.status, '')) in ('pending', 'submitted');
        select count(*) into v_new from public.employer_expiry_sent s
         where s.firm = r.firm and s.sent_at >= date_trunc('day', now())
           and s.ref not like 'mine:%' and s.ref not like 'log:%'
           -- HR (ELE-2061/2075): not in the office email.
           and s.ref not like 'probation:%' and s.ref not like 'qualifying_period:%'
           and s.ref not like 'right_to_work:%';

        continue when v_ts + v_leave + v_exp + v_new = 0;

        select coalesce(jsonb_agg(x order by x->>'due'), '[]'::jsonb) into v_list
          from (
            select jsonb_build_object('label', i.label, 'name', i.name, 'due', i.due, 'route', i.route) as x
              from public.employer_expiry_items() i
             where i.firm = r.firm
               and i.due <= current_date + 30 and i.due >= current_date - 60
               -- HR (ELE-2061/2075): not in the office email.
               and not public._hr_expiry_kind(i.kind)
             order by i.due
             limit 12
          ) s;

        perform public.queue_office_email(
          r.firm, 'daily_summary', to_char(current_date, 'YYYY-MM-DD'),
          jsonb_build_object(
            'timesheets', v_ts, 'timesheets_oldest', v_ts_oldest,
            'leave', v_leave, 'expenses', v_exp,
            'expiring', v_list));
      exception when others then
        raise warning '[notify_employer_expiries] summary %: %', r.firm, sqlerrm;
      end;
    end loop;
  end if;
end;
$function$;

-- 3. The old Settings loops go; calibration and the rest stay.
create or replace function public.notify_compliance_expiries()
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  r record;
begin
  -- Gap #10: public liability insurance and scheme registration now come
  -- from employer_expiry_items (notify_employer_expiries, called below),
  -- deduped by employer_expiry_sent, with the same types and route.

  -- Test instrument calibration. Naming the instrument makes it actionable;
  -- "at least one of your test instruments" sends someone hunting.
  for r in
    select cp.user_id,
           count(*) as due_count,
           min(elem->>'calibration_due') as soonest,
           (array_agg(coalesce(nullif(btrim(elem->>'name'), ''), 'a test instrument')
                      order by elem->>'calibration_due'))[1] as first_name
    from company_profiles cp
    cross join lateral jsonb_array_elements(coalesce(cp.testing_instruments, '[]'::jsonb)) elem
    where (elem->>'calibration_due') ~ '^\d{4}-\d{2}-\d{2}'
      and (elem->>'calibration_due')::date <= current_date + 30
      and (elem->>'calibration_due')::date >= current_date - 60
      and not exists (select 1 from user_notifications n
        where n.user_id = cp.user_id and n.type = 'compliance_calibration'
          and n.created_at > now() - interval '14 days')
    group by cp.user_id
  loop
    perform notify_user(r.user_id, 'compliance_calibration',
      case when r.due_count > 1
           then r.due_count::text || ' instruments due calibration'
           else 'Test instrument calibration due' end,
      r.first_name || ' is due ' || to_char(r.soonest::date, 'DD Mon YYYY')
        || case when r.due_count > 1
                then ', with ' || (r.due_count - 1)::text || ' more.'
                else '.' end
        || ' A certificate needs an in-date meter behind it.',
      jsonb_build_object('route','/settings?tab=business','ref_id','calibration'));
  end loop;

  -- ELE-2006: the worker's own credentials (60 / 14 days / expired).
  begin
    perform public.notify_my_credential_expiries();
  exception when others then
    raise warning '[notify_compliance_expiries] my credentials: %', sqlerrm;
  end;

  -- ELE-1955: Monday nudge when apprentice hours have waited 3+ days.
  begin
    perform public.notify_employer_waiting_otj();
  exception when others then
    raise warning '[notify_compliance_expiries] waiting otj: %', sqlerrm;
  end;

  -- ELE-1988: firm-level expiries + the office summary email.
  begin
    perform public.notify_employer_expiries();
  exception when others then
    raise warning '[notify_compliance_expiries] employer expiries: %', sqlerrm;
  end;
end;
$function$;
