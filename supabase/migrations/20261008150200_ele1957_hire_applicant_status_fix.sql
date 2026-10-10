-- ELE-1957 — "Hire & onboard" could never add a new person to the roster.
--
-- hire_applicant inserted the roster row with status 'active', but
-- employer_employees_status_check only allows 'Active' / 'On Leave' /
-- 'Archived'. Every hire of someone not already on the team raised 23514 and
-- the app showed "Could not complete the hire". Found while testing ELE-1957
-- (0 hires ever on the live table). Same function, correct status; the
-- roster row is otherwise unchanged (user_id stays null until the person
-- accepts the team invite the app now sends straight after the hire).

create or replace function public.hire_applicant(p_application_id uuid, p_fee_amount numeric default null::numeric)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := public.my_default_employer_id();
  v_app record;
  v_vac record;
  v_profile_employee_id uuid;
  v_worker_user_id uuid;
  v_existing_roster uuid;
  v_new_employee uuid;
  v_hire_id uuid;
  v_initials text;
begin
  if v_uid is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select * into v_app from employer_vacancy_applications where id = p_application_id;
  if v_app is null then return jsonb_build_object('error', 'application_not_found'); end if;

  select * into v_vac from employer_vacancies where id = v_app.vacancy_id;
  if v_vac is null or v_vac.employer_id <> v_uid then
    return jsonb_build_object('error', 'not_authorised');
  end if;

  select p.employee_id into v_profile_employee_id
    from employer_elec_id_profiles p where p.id = v_app.applicant_profile_id;
  if v_profile_employee_id is not null then
    select e.user_id into v_worker_user_id from employer_employees e where e.id = v_profile_employee_id;
  end if;

  update employer_vacancy_applications set status = 'Hired', updated_at = now()
    where id = p_application_id;

  v_initials := upper(coalesce(substring(split_part(v_app.applicant_name, ' ', 1) from 1 for 1), '')) ||
                upper(coalesce(substring(split_part(v_app.applicant_name, ' ', 2) from 1 for 1), ''));
  if v_initials = '' then v_initials := 'NW'; end if;

  select id into v_existing_roster from employer_employees
   where employer_id = v_uid
     and (
       (v_worker_user_id is not null and user_id = v_worker_user_id)
       or (v_app.applicant_email is not null and lower(email) = lower(v_app.applicant_email))
     )
   limit 1;

  if v_existing_roster is null then
    insert into employer_employees (
      name, role, team_role, status, email, phone, avatar_initials,
      hourly_rate, employer_id, user_id
    ) values (
      coalesce(v_app.applicant_name, 'New worker'),
      'electrician', 'Operative', 'Active',
      v_app.applicant_email, v_app.applicant_phone, v_initials,
      0, v_uid, null
    ) returning id into v_new_employee;
  end if;

  if not exists (
    select 1 from elec_id_hire_records
    where employer_id = v_uid and worker_profile_id = v_app.applicant_profile_id
  ) then
    insert into elec_id_hire_records (worker_profile_id, employer_id, job_type, fee_amount)
    values (v_app.applicant_profile_id, v_uid, v_vac.title, coalesce(p_fee_amount, 250.00))
    returning id into v_hire_id;
  end if;

  update employer_conversations set electrician_can_reply = true, updated_at = now()
    where employer_id = v_uid and electrician_profile_id = v_app.applicant_profile_id;

  return jsonb_build_object(
    'ok', true,
    'application_id', p_application_id,
    'roster_employee_id', coalesce(v_existing_roster, v_new_employee),
    'roster_created', v_new_employee is not null,
    'hire_record_id', v_hire_id,
    'worker_user_id', v_worker_user_id,
    'worker_name', v_app.applicant_name
  );
end;
$function$;
