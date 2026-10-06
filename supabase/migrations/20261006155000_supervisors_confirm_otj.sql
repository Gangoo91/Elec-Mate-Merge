-- Andrew, 6 Oct: supervisors and apprentice co-ordinators SHOULD confirm
-- apprentices' off-the-job hours (until now only owner + co-admins could,
-- while the apprentice's OTJ page already told them their supervisor could).
--
-- Who can confirm (attest) or send back an apprentice's hours:
--   * the firm's managers (owner + active co-admins)        — as before
--   * the apprentice's named workplace supervisor             — new
--   * active Supervisor / Project Manager / Apprentice Co-ordinator on the
--     same team                                               — new
-- Never the apprentice themselves. College verification is untouched.

create or replace function public.can_confirm_otj_for(p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and p_student is not null
     and p_student <> auth.uid()
     and exists (
       select 1
         from public.employer_employees ap
        where ap.user_id = p_student
          and ap.employer_id is not null
          and lower(coalesce(ap.status, '')) = 'active'
          and (
            ap.employer_id in (select public.my_employer_scope())
            or ap.supervisor_employee_id in (select public.my_employee_ids())
            or exists (
              select 1 from public.employer_employees me
               where me.user_id = auth.uid()
                 and me.employer_id = ap.employer_id
                 and lower(coalesce(me.status, '')) = 'active'
                 and me.team_role in ('Supervisor', 'Project Manager', 'Apprentice Co-ordinator')
            )
          )
     )
$$;

revoke execute on function public.can_confirm_otj_for(uuid) from public, anon;
grant execute on function public.can_confirm_otj_for(uuid) to authenticated;

create or replace function public.get_employer_pending_otj_attestations()
returns table(entry_id uuid, student_user_id uuid, employee_id uuid, apprentice_name text,
              activity_date date, activity_type text, title text, description text,
              duration_minutes integer, source_kind text, evidence_urls text[],
              created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $function$
  select * from (
    select distinct on (o.id)
           o.id as entry_id, o.student_id as student_user_id, ee.id as employee_id, ee.name as apprentice_name,
           o.activity_date, o.activity_type, o.title, o.description, o.duration_minutes,
           o.source_kind, o.evidence_urls, o.created_at
      from public.employer_employees ee
      join public.college_otj_entries o on o.student_id = ee.user_id
     where lower(coalesce(ee.status, '')) = 'active'
       and ee.employer_id is not null
       and o.verification_status = 'pending'
       and o.source_kind in ('apprentice_submitted', 'in_app')
       and public.can_confirm_otj_for(ee.user_id)
     order by o.id
  ) x
  order by x.activity_date desc, x.created_at desc
$function$;

create or replace function public.attest_otj_as_employer(p_entry_id uuid, p_decision text default 'attest', p_comment text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_uid uuid := auth.uid();
  v_entry record;
  v_name text;
  v_email text;
  v_comment text := nullif(left(btrim(coalesce(p_comment, '')), 2000), '');
begin
  if v_uid is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;
  if p_decision not in ('attest', 'send_back') then
    return jsonb_build_object('error', 'Unknown decision');
  end if;

  select o.* into v_entry
    from public.college_otj_entries o
   where o.id = p_entry_id
     and public.can_confirm_otj_for(o.student_id);
  if v_entry is null then
    return jsonb_build_object('error', 'You cannot confirm hours for this apprentice');
  end if;
  if v_entry.verification_status <> 'pending' then
    return jsonb_build_object('error', 'This entry has already been reviewed');
  end if;

  select coalesce(nullif(btrim(p.full_name), ''), 'Employer') into v_name
    from public.profiles p where p.id = v_uid;
  select u.email into v_email from auth.users u where u.id = v_uid;

  if p_decision = 'attest' then
    update public.college_otj_entries
       set source_kind = 'employer_attested',
           verification_status = 'verified_by_employer',
           verified_at = now(),
           attested_by_name = v_name,
           attestation_email = v_email,
           attestation_comment = v_comment,
           updated_at = now()
     where id = p_entry_id;
    return jsonb_build_object('success', true, 'status', 'verified_by_employer',
                              'attested_by', v_name, 'attested_at', now());
  end if;

  if v_comment is null then
    return jsonb_build_object('error', 'Say what needs changing so the apprentice can fix it');
  end if;
  update public.college_otj_entries
     set verification_status = 'rejected',
         verification_rationale = 'Employer (' || v_name || '): ' || v_comment,
         updated_at = now()
   where id = p_entry_id;
  return jsonb_build_object('success', true, 'status', 'rejected');
end;
$function$;

-- Tell the people on site, not just the office. Managers already get the
-- firm bell from notify_employer_otj_submission(); this reaches the named
-- supervisor and the team's supervisors / co-ordinators in Worker Tools.
create or replace function public.notify_otj_supervisors()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ap record;
  v_recipient uuid;
  v_hours text;
  v_first text;
  v_sent uuid[] := array[]::uuid[];
begin
  if coalesce(NEW.source_kind, '') <> 'apprentice_submitted'
     or coalesce(NEW.verification_status, '') <> 'pending' then
    return NEW;
  end if;
  if TG_OP = 'UPDATE' and coalesce(OLD.verification_status, '') = 'pending' then
    return NEW;
  end if;

  v_hours := trim(to_char(coalesce(NEW.duration_minutes, 0) / 60.0, 'FM990.0'));

  for ap in
    select e.employer_id, e.name, e.supervisor_employee_id
      from public.employer_employees e
     where e.user_id = NEW.student_id
       and e.employer_id is not null
       and lower(coalesce(e.status, '')) = 'active'
  loop
    v_first := split_part(coalesce(ap.name, 'Your apprentice'), ' ', 1);
    for v_recipient in
      select distinct s.user_id
        from public.employer_employees s
       where s.employer_id = ap.employer_id
         and s.user_id is not null
         and s.user_id <> NEW.student_id
         and lower(coalesce(s.status, '')) = 'active'
         and (s.id = ap.supervisor_employee_id
              or s.team_role in ('Supervisor', 'Project Manager', 'Apprentice Co-ordinator'))
    loop
      continue when v_recipient = any(v_sent);
      v_sent := v_sent || v_recipient;
      perform public.worker_notify(
        v_recipient,
        'apprentice_hours_to_confirm',
        v_first || ' logged ' || v_hours || ' training hour' || case when v_hours = '1.0' then '' else 's' end,
        coalesce(NEW.title, 'Off-the-job training') || ' · ' || to_char(NEW.activity_date, 'DD Mon') || ' · tap to confirm',
        jsonb_build_object('route', '/electrician/worker-tools/apprentice-hours?entry=' || NEW.id, 'entry_id', NEW.id)
      );
    end loop;
  end loop;
  return NEW;
exception when others then
  raise warning '[notify_otj_supervisors] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

drop trigger if exists trg_notify_otj_supervisors on public.college_otj_entries;
create trigger trg_notify_otj_supervisors
  after insert or update of verification_status on public.college_otj_entries
  for each row execute function public.notify_otj_supervisors();
