-- Review finding (6 Oct): any signed-in account could make any email a manager
-- of its "firm", and the invitee was switched on automatically the next time
-- they opened the app. An active manager row also lifts the subscription gate
-- (ProtectedRoute), and moves the invitee's Employer Hub writes into the
-- inviter's firm (my_default_employer_id). The owner's ALL policy let the same
-- thing happen by inserting an 'active' row with user_id set directly.
--
-- Now:
--   * only an employer account can invite (same rule as the client's
--     isEmployerUser: employer tier/role, an admin, or the pre-launch list);
--   * the claim only LINKS the invite to the account; it stays pending until
--     the person taps Accept (respond_co_admin_invite);
--   * owners read and remove rows directly, but every insert/update goes
--     through the RPCs;
--   * invite_co_admin no longer says whether the email has an account.

create or replace function public.is_employer_account(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.profiles p
      left join auth.users u on u.id = p.id
     where p.id = p_user
       and (
         lower(coalesce(p.subscription_tier, '')) like 'employer%'
         or lower(coalesce(p.role, '')) = 'employer'
         or p.admin_role is not null
         -- Keep in step with EMPLOYER_ALLOWED_EMAILS (src/config/employerAccess.ts).
         or lower(coalesce(u.email, '')) in (
           'founder@elec-mate.com', 'andrewgangoo91@gmail.com', 'info@precisionei.co.uk',
           'jason@aeeyorkshire.co.uk', 'sean@mulcahyelectrical.co.uk')
       )
  )
$$;
revoke execute on function public.is_employer_account(uuid) from public, anon;
grant execute on function public.is_employer_account(uuid) to authenticated;

create or replace function public.invite_co_admin(p_email text, p_full_name text default null, p_job_title text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
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
  if exists (select 1 from public.employer_admins a where a.user_id = v_owner and a.status = 'active') then
    raise exception 'Only the account owner can add managers';
  end if;
  if not public.is_employer_account(v_owner) then
    raise exception 'Managers come with an Employer plan';
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

  -- Tell them in the app if they already have an account. The reply to the
  -- owner is the same either way, so this can't be used to test emails.
  select id into v_invitee from auth.users where lower(email) = v_email limit 1;
  if v_invitee is not null then
    select coalesce(cp.company_name, p.full_name, 'A firm') into v_company
      from public.profiles p left join public.company_profiles cp on cp.user_id = p.id
     where p.id = v_owner;
    perform public.worker_notify(
      v_invitee,
      'co_admin_invite',
      coalesce(v_company, 'A firm') || ' asked you to be a manager',
      'Open Elec-Mate to accept or decline. Nothing changes until you accept.',
      jsonb_build_object('route', '/dashboard')
    );
  end if;

  return jsonb_build_object('ok', true, 'already', false);
end;
$function$;

-- Link only. Acceptance is a separate, explicit step.
create or replace function public.claim_employer_admin_rows()
returns integer
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_email text;
  v_count integer;
begin
  select lower(email) into v_email from auth.users where id = auth.uid();
  if v_email is null then
    return 0;
  end if;

  update public.employer_admins
     set user_id = auth.uid(),
         updated_at = now()
   where user_id is null
     and status = 'pending'
     and lower(email) = v_email
     and employer_id <> auth.uid();

  get diagnostics v_count = row_count;
  return v_count;
end;
$function$;

create or replace function public.get_my_co_admin_invites()
returns table(invite_id uuid, company_name text, invited_by_name text, job_title text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select a.id,
         coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'A firm'),
         nullif(btrim(p.full_name), ''),
         a.job_title,
         a.created_at
    from public.employer_admins a
    join public.profiles p on p.id = a.employer_id
    left join public.company_profiles cp on cp.user_id = a.employer_id
   where a.user_id = auth.uid()
     and a.status = 'pending'
   order by a.created_at
$$;
revoke execute on function public.get_my_co_admin_invites() from public, anon;
grant execute on function public.get_my_co_admin_invites() to authenticated;

create or replace function public.respond_co_admin_invite(p_invite_id uuid, p_accept boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_admins%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Sign in again';
  end if;
  select * into v_row from public.employer_admins
   where id = p_invite_id and user_id = auth.uid() and status = 'pending'
   for update;
  if not found then
    raise exception 'This invite is no longer open';
  end if;

  if p_accept then
    -- One firm at a time: my_default_employer_id() only resolves a single firm.
    if exists (select 1 from public.employer_admins
                where user_id = auth.uid() and status = 'active' and id <> p_invite_id) then
      raise exception 'You already manage another firm. Ask them to remove you first.';
    end if;
    update public.employer_admins set status = 'active', updated_at = now() where id = p_invite_id;
    perform public.worker_notify(
      v_row.employer_id, 'co_admin_accepted',
      coalesce(v_row.full_name, v_row.email) || ' is now a manager',
      'They can open your Employer Hub.',
      jsonb_build_object('route', '/employer?section=settings'));
    return jsonb_build_object('ok', true, 'status', 'active');
  end if;

  delete from public.employer_admins where id = p_invite_id;
  return jsonb_build_object('ok', true, 'status', 'declined');
end;
$$;
revoke execute on function public.respond_co_admin_invite(uuid, boolean) from public, anon;
grant execute on function public.respond_co_admin_invite(uuid, boolean) to authenticated;

-- Owners read and remove; all writes go through the functions above.
drop policy if exists "Employer manages own co-admins" on public.employer_admins;
drop policy if exists "Employer reads own co-admins" on public.employer_admins;
drop policy if exists "Employer removes own co-admins" on public.employer_admins;
create policy "Employer reads own co-admins" on public.employer_admins
  for select to authenticated using (employer_id = (select auth.uid()));
create policy "Employer removes own co-admins" on public.employer_admins
  for delete to authenticated using (employer_id = (select auth.uid()));
-- A manager can step down themselves.
drop policy if exists "Co-admin leaves" on public.employer_admins;
create policy "Co-admin leaves" on public.employer_admins
  for delete to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Co-admin reads own membership" on public.employer_admins;
create policy "Co-admin reads own membership" on public.employer_admins
  for select to authenticated using (user_id = (select auth.uid()));
