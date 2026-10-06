-- ELE-1986: owners had no way to add or remove co-admins (managers) — the
-- table, the claim-on-sign-in and the scope all existed, with no screen.
-- invite_co_admin() adds a pending manager by email; if they already have an
-- account they get a bell alert, and claim_employer_admin_rows() links them on
-- their next open (existing behaviour, useEmployerCoAdmin).

insert into public.notification_types (type, category, push, importance)
values ('co_admin_invite', 'tasks_projects', true, 2)
on conflict (type) do nothing;

create or replace function public.invite_co_admin(p_email text, p_full_name text default null, p_job_title text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid := auth.uid();
  v_email text := lower(trim(coalesce(p_email, '')));
  v_existing public.employer_admins%rowtype;
  v_invitee uuid;
  v_company text;
begin
  if v_owner is null then
    raise exception 'Sign in again';
  end if;
  -- Only the account owner adds managers (co-admins cannot add co-admins).
  if exists (select 1 from public.employer_admins a where a.user_id = v_owner and a.status = 'active') then
    raise exception 'Only the account owner can add managers';
  end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Enter a valid email address';
  end if;
  if v_email = (select lower(email) from auth.users where id = v_owner) then
    raise exception 'That is your own email';
  end if;

  select * into v_existing from public.employer_admins
   where employer_id = v_owner and lower(email) = v_email and status in ('pending', 'active')
   limit 1;
  if found then
    return jsonb_build_object('ok', true, 'already', true, 'status', v_existing.status);
  end if;

  insert into public.employer_admins (employer_id, email, full_name, job_title, status, invited_by)
  values (v_owner, v_email, nullif(trim(coalesce(p_full_name, '')), ''), nullif(trim(coalesce(p_job_title, '')), ''), 'pending', v_owner);

  select id into v_invitee from auth.users where lower(email) = v_email limit 1;
  if v_invitee is not null then
    select coalesce(cp.company_name, p.full_name, 'A firm') into v_company
      from public.profiles p left join public.company_profiles cp on cp.user_id = p.id
     where p.id = v_owner;
    perform public.worker_notify(
      v_invitee,
      'co_admin_invite',
      'You have been added as a manager',
      coalesce(v_company, 'A firm') || ' added you to manage their Employer Hub. Open it from the menu.',
      jsonb_build_object('route', '/employer')
    );
  end if;

  return jsonb_build_object('ok', true, 'already', false, 'has_account', v_invitee is not null);
end;
$$;

revoke execute on function public.invite_co_admin(text, text, text) from public, anon;
grant execute on function public.invite_co_admin(text, text, text) to authenticated;
