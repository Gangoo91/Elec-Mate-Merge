-- Public Elec-ID verification by card number (applied to prod 2026-07-25 via MCP).
-- Mirrors share-token RPC protections (opt_out, archived employee) but returns
-- verification-grade basics only — no contact details, no section data.
create or replace function public.get_elec_id_by_number(p_number text)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_profile  employer_elec_id_profiles%rowtype;
  v_emp_name text; v_emp_photo text; v_emp_status text; v_emp_user uuid;
begin
  if p_number is null or length(trim(p_number)) = 0 then
    return jsonb_build_object('status', 'not_found');
  end if;

  select * into v_profile
  from employer_elec_id_profiles
  where upper(elec_id_number) = upper(trim(p_number)) and opt_out = false
  limit 1;

  if not found then
    return jsonb_build_object('status', 'not_found');
  end if;

  select e.name, e.photo_url, e.status, e.user_id
    into v_emp_name, v_emp_photo, v_emp_status, v_emp_user
  from employer_employees e
  where e.id = v_profile.employee_id;

  if lower(coalesce(v_emp_status, '')) = 'archived' then
    return jsonb_build_object('status', 'not_found');
  end if;

  if v_emp_user is not null then
    select coalesce(p.full_name, v_emp_name), coalesce(p.avatar_url, v_emp_photo)
      into v_emp_name, v_emp_photo
    from profiles p
    where p.id = v_emp_user;
  end if;

  return jsonb_build_object(
    'status', 'ok',
    'sections', to_jsonb(array['basics']),
    'profile', jsonb_build_object(
      'id', v_profile.id,
      'elec_id_number', v_profile.elec_id_number,
      'is_verified', coalesce(v_profile.is_verified, false),
      'verified_at', v_profile.verified_at,
      'job_title', v_profile.job_title,
      'ecs_card_type', v_profile.ecs_card_type,
      'ecs_expiry_date', v_profile.ecs_expiry_date
    ),
    'employee', jsonb_build_object(
      'name', v_emp_name,
      'job_title', v_profile.job_title,
      'photo_url', v_emp_photo
    )
  );
end;
$$;
