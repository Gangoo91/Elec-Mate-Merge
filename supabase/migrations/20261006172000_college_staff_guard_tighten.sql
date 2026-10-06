-- Tighten 20261006171000: in a college with no linked admin/head of department,
-- staff could still promote themselves (Northgate's managers are unlinked rows).
-- Now: only a real manager (or Elec-Mate) grants admin / head of department /
-- lead duties; in an unmanaged college staff may add and edit tutors only;
-- nobody changes their own role or duties.
create or replace function public._is_college_manager(p_college uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
      select 1 from public.college_staff s
      where s.college_id = p_college and s.user_id = auth.uid() and s.archived_at is null
        and s.role in ('admin', 'head_of_department'))
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.college_id = p_college and p.college_role = 'admin');
$$;

create or replace function public._college_unmanaged_staff(p_college uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select not exists (
      select 1 from public.college_staff s
      where s.college_id = p_college and s.user_id is not null and s.archived_at is null
        and s.role in ('admin', 'head_of_department'))
    and exists (
      select 1 from public.college_staff s
      where s.college_id = p_college and s.user_id = auth.uid() and s.archived_at is null);
$$;

create or replace function public._college_staff_role_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
declare
  v_college uuid := coalesce(new.college_id, old.college_id);
  v_own boolean := coalesce(old.user_id, new.user_id) = auth.uid();
  v_priv_new boolean := false;
  v_priv_change boolean := false;
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin() then
    return coalesce(new, old);
  end if;
  if tg_op = 'UPDATE' and new.college_id is distinct from old.college_id
     and not public._is_college_manager(new.college_id) then
    raise exception 'cannot move staff to another college' using errcode = '42501';
  end if;

  if tg_op in ('INSERT', 'UPDATE') then
    v_priv_new := new.role in ('admin', 'head_of_department')
      or coalesce(new.is_dsl, false) or coalesce(new.is_deputy_dsl, false)
      or coalesce(new.is_prevent_lead, false) or coalesce(new.is_h_and_s_lead, false)
      or coalesce(new.is_quality_nominee, false) or coalesce(new.is_mental_health_lead, false);
  end if;
  if tg_op = 'UPDATE' then
    v_priv_change := new.role is distinct from old.role
      or new.user_id is distinct from old.user_id
      or new.status is distinct from old.status
      or new.archived_at is distinct from old.archived_at
      or new.archived_by is distinct from old.archived_by
      or new.is_dsl is distinct from old.is_dsl
      or new.is_deputy_dsl is distinct from old.is_deputy_dsl
      or new.is_prevent_lead is distinct from old.is_prevent_lead
      or new.is_h_and_s_lead is distinct from old.is_h_and_s_lead
      or new.is_quality_nominee is distinct from old.is_quality_nominee
      or new.is_mental_health_lead is distinct from old.is_mental_health_lead;
  end if;

  -- Real managers: anything except changing their own role / duties.
  if public._is_college_manager(v_college) then
    if v_own and tg_op = 'UPDATE' and v_priv_change then
      raise exception 'you cannot change your own role or duties' using errcode = '42501';
    end if;
    return coalesce(new, old);
  end if;

  -- Unmanaged college: staff can add and edit tutors, never grant manager
  -- roles or lead duties, never change their own role.
  if public._college_unmanaged_staff(v_college) then
    if tg_op = 'DELETE' then
      if old.role in ('admin', 'head_of_department') or v_own then
        raise exception 'only a college admin can remove that staff member' using errcode = '42501';
      end if;
      return old;
    end if;
    if (tg_op = 'INSERT' and v_priv_new)
       or (tg_op = 'UPDATE' and v_priv_change and (v_own or v_priv_new
            or old.role in ('admin', 'head_of_department'))) then
      raise exception 'ask Elec-Mate or your college admin to grant that role or duty'
        using errcode = '42501';
    end if;
    return new;
  end if;

  -- Everyone else: own row, non-privileged fields only.
  if tg_op <> 'UPDATE' or not v_own or v_priv_change then
    raise exception 'only a college admin or head of department can manage staff'
      using errcode = '42501';
  end if;
  return new;
end; $$;
