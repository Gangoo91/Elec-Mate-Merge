-- Polish on the 6 Oct notification triggers (review pass):
-- 1. OTJ: "1.0 training hours" → "1 training hour"; whole hours drop the ".0".
-- 2. OTJ: the apprentice is now told when the employer attests or sends an
--    entry back (attest_otj_as_employer writes verified_by_employer / rejected
--    with a rationale starting 'Employer'). Before, the loop closed silently on
--    the apprentice's side. College verification is untouched and separate.
-- 3. Incidents: an owner logging their own incident no longer alerts themselves
--    (co-admins and workers logging one still alert the owner).

create or replace function public.notify_employer_otj_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_name text;
  v_hours numeric;
  v_hours_txt text;
  v_attester text;
begin
  v_hours := round(coalesce(NEW.duration_minutes, 0) / 60.0, 1);
  v_hours_txt := case when v_hours = trunc(v_hours) then trunc(v_hours)::int::text else v_hours::text end
                 || case when v_hours = 1 then ' training hour' else ' training hours' end;

  -- Employer decision → tell the apprentice.
  if TG_OP = 'UPDATE'
     and NEW.verification_status is distinct from OLD.verification_status
     and coalesce(OLD.verification_status, '') = 'pending' then
    if NEW.verification_status = 'verified_by_employer' then
      v_attester := split_part(coalesce(NEW.attested_by_name, 'Your employer'), ' ', 1);
      perform public.worker_notify(
        NEW.student_id,
        'otj_attested',
        initcap(v_attester) || ' confirmed your hours',
        coalesce(NEW.title, 'Off-the-job training') || ' (' || v_hours_txt ||
          ') now counts as workplace-attested. Your college still verifies it separately.',
        jsonb_build_object('route', '/apprentice/ojt-hub', 'entry_id', NEW.id)
      );
      return NEW;
    elsif NEW.verification_status = 'rejected'
          and coalesce(NEW.verification_rationale, '') like 'Employer%' then
      perform public.worker_notify(
        NEW.student_id,
        'otj_sent_back',
        'Your employer sent some hours back',
        coalesce(NEW.title, 'Off-the-job training') || ': ' ||
          left(regexp_replace(NEW.verification_rationale, '^Employer \([^)]*\):\s*', ''), 140),
        jsonb_build_object('route', '/apprentice/ojt-hub', 'entry_id', NEW.id)
      );
      return NEW;
    end if;
  end if;

  -- Apprentice submission → tell the firm.
  if coalesce(NEW.source_kind, '') <> 'apprentice_submitted'
     or coalesce(NEW.verification_status, '') <> 'pending' then
    return NEW;
  end if;
  if TG_OP = 'UPDATE' and coalesce(OLD.verification_status, '') = 'pending' then
    return NEW;
  end if;

  for r in
    select distinct e.employer_id, e.name
      from public.employer_employees e
     where e.user_id = NEW.student_id
       and e.employer_id is not null
       and e.status = 'Active'
  loop
    v_name := split_part(coalesce(r.name, 'Your apprentice'), ' ', 1);
    perform public.notify_employer_bell(
      r.employer_id,
      'apprentice_hours_submitted',
      case when TG_OP = 'UPDATE'
           then v_name || ' resubmitted ' || v_hours_txt
           else v_name || ' logged ' || v_hours_txt end,
      coalesce(NEW.title, 'Off-the-job training') || ' · ' ||
        to_char(NEW.activity_date, 'FMDD Mon') || ' · tap to review',
      jsonb_build_object(
        'route', '/employer?section=apprentices&entry=' || NEW.id,
        'entry_id', NEW.id
      )
    );
  end loop;

  return NEW;
exception when others then
  raise warning '[notify_employer_otj_submission] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

create or replace function public.notify_incident()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reporter_name text;
  v_reporter_user uuid;
  v_job_title text;
  v_kind text;
begin
  if NEW.reported_by is not null then
    select e.name, e.user_id
      into v_reporter_name, v_reporter_user
      from public.employer_employees e
     where e.id::text = NEW.reported_by;
  end if;

  if NEW.job_id is not null then
    select j.title into v_job_title from public.employer_jobs j where j.id = NEW.job_id;
  end if;

  v_kind := case when NEW.incident_type ilike '%near%' then 'Near miss' else 'Incident' end;

  if TG_OP = 'INSERT' then
    -- The owner logging it themselves doesn't need telling.
    if auth.uid() is not null and auth.uid() = NEW.employer_id then
      return NEW;
    end if;
    perform public.notify_employer_bell(
      NEW.employer_id,
      'incident',
      v_kind || ' reported' || coalesce(' by ' || v_reporter_name, ''),
      coalesce(v_job_title || ': ', '') || left(coalesce(NEW.description, NEW.title, ''), 140),
      jsonb_build_object(
        'route', '/employer?section=incidents&incident=' || NEW.id,
        'incident_id', NEW.id,
        'severity', NEW.severity,
        'job_id', NEW.job_id
      )
    );
    return NEW;
  end if;

  if TG_OP = 'UPDATE'
     and NEW.status in ('resolved', 'closed')
     and coalesce(OLD.status, '') not in ('resolved', 'closed')
     and v_reporter_user is not null then
    perform public.worker_notify(
      v_reporter_user,
      'incident_closed',
      'Your safety report was closed',
      coalesce(nullif(NEW.actions_taken, ''), 'The office has closed your report.'),
      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)
    );
  end if;

  return NEW;
exception when others then
  raise warning '[notify_incident] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;
