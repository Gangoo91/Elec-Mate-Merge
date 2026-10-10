-- ELE-2075: hr_anonymise_leaver appended to text[] with ||, which Postgres reads
-- as an array literal. Same function, array_append instead.

create or replace function public.hr_anonymise_leaver(p_roster_id uuid, p_parts text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_left date;
  v_paths text[] := array[]::text[];
  v_done text[] := array[]::text[];
begin
  select e.*, h.left_on as hr_left_on, h.name_removed_at
    into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or not public.can_see_firm_money(r.employer_id) then
    raise exception 'not_found';
  end if;
  if lower(coalesce(r.status, '')) <> 'archived' then
    raise exception 'not_a_leaver';
  end if;
  v_left := coalesce(r.hr_left_on, r.updated_at::date);

  insert into public.employer_person_hr (roster_id, employer_id, left_on)
  values (r.id, r.employer_id, v_left)
  on conflict (roster_id) do update set left_on = coalesce(employer_person_hr.left_on, excluded.left_on);

  if 'contact' = any(p_parts) then
    update public.employer_employees
       set phone = null, email = null, photo_url = null,
           emergency_contact_name = null, emergency_contact_phone = null,
           emergency_contact_relationship = null, updated_at = now()
     where id = r.id;
    update public.employer_person_hr set contact_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'contact');
  end if;

  if 'rtw' = any(p_parts) then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'rtw')))::date > current_date then
      raise exception 'rtw_not_due';
    end if;
    select coalesce(array_agg(p), array[]::text[]) into v_paths
      from (
        select unnest(c.evidence_paths) p from public.employer_rtw_checks c where c.roster_id = r.id
        union
        select unnest(s.document_paths) from public.employer_rtw_submissions s where s.roster_id = r.id
      ) x;
    delete from public.employer_rtw_checks where roster_id = r.id;
    delete from public.employer_rtw_submissions where roster_id = r.id;
    update public.employer_person_hr set rtw_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'rtw');
  end if;

  if 'name' = any(p_parts) and r.name_removed_at is null then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'hr_file')))::date > current_date then
      raise exception 'name_not_due';
    end if;
    update public.employer_employees
       set name = 'Former team member', avatar_initials = 'FT', updated_at = now()
     where id = r.id;
    update public.employer_leave_requests set employee_name = 'Former team member'
     where employee_id = r.id;
    update public.employer_person_hr
       set name_removed_at = now(), probation_notes = null, updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'name');
  end if;

  return jsonb_build_object('success', true, 'done', to_jsonb(v_done), 'paths', to_jsonb(v_paths));
end;
$fn$;
revoke all on function public.hr_anonymise_leaver(uuid, text[]) from public, anon;
grant execute on function public.hr_anonymise_leaver(uuid, text[]) to authenticated;
