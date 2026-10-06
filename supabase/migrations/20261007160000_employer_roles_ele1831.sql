-- ELE-1831 phase 1: roles that match a real firm.
--
-- Until now every ACTIVE manager (employer_admins) had owner powers through
-- my_employer_scope(): money, certificate sign-off, OTJ confirmation, the lot.
-- Now a manager is either:
--   admin  — full owner powers (every existing manager is backfilled to this,
--            so Mulcahy Electrical's manager keeps exactly what they have);
--   office — runs the hub (jobs, team, quotes, invoices, approvals) but does
--            NOT see money (job profit, cost rates) and does NOT sign
--            certificates or confirm apprentice hours. New invites default here.
-- Roster members get an access role from their team_role (supervisor /
-- engineer / apprentice / subcontractor) via employer_access_role().
--
-- Andrew's decisions (6 Oct): only QS (plus owner/admin) sign certificates —
-- Supervisor and PM don't gain it; office keeps READ access to team
-- certificates; money hidden from office = cost rates, buy price/markup,
-- job_financials, job_cost_entries, P&L/ledger (tenders and supplier invoices
-- stay visible); comped seat cap unchanged; RAMS left to Site Safety.
-- Column-level hiding that would break the live app's select('*') is held in
-- supabase/release-held/ (not applied).

-- 1. Manager access role -------------------------------------------------
alter table public.employer_admins
  add column if not exists access_role text not null default 'office';
alter table public.employer_admins drop constraint if exists employer_admins_access_role_check;
alter table public.employer_admins add constraint employer_admins_access_role_check
  check (access_role in ('admin', 'office'));
-- Everyone who is a manager today keeps today's powers.
update public.employer_admins set access_role = 'admin' where created_at < now();
comment on column public.employer_admins.access_role is
  'admin = owner powers; office = runs the hub without money, certificate sign-off or OTJ confirmation (ELE-1831). Managers before 6 Oct 2026 were backfilled to admin.';

-- 2. Role helpers ---------------------------------------------------------
-- Owner + admin managers: the people who may see money and sign off.
create or replace function public.my_employer_admin_scope()
returns setof uuid
language sql
stable
security definer
rows 1
set search_path = public
as $$
  select auth.uid() where auth.uid() is not null
  union
  select a.employer_id from public.employer_admins a
   where a.user_id = auth.uid() and a.status = 'active' and a.access_role = 'admin'
$$;

create or replace function public.employer_access_role(p_team_role text)
returns text
language sql
immutable
set search_path = public
as $$
  select case lower(btrim(coalesce(p_team_role, '')))
    when 'qs' then 'supervisor'
    when 'supervisor' then 'supervisor'
    when 'project manager' then 'supervisor'
    when 'apprentice co-ordinator' then 'supervisor'
    when 'apprentice' then 'apprentice'
    when 'subcontractor' then 'subcontractor'
    else 'engineer'
  end
$$;

-- The caller's role in a firm: owner / admin / office / supervisor /
-- engineer / apprentice / subcontractor, or null if they have none.
create or replace function public.my_employer_role(p_firm uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when auth.uid() is null or p_firm is null then null
    when p_firm = auth.uid() then 'owner'
    else coalesce(
      (select a.access_role from public.employer_admins a
        where a.employer_id = p_firm and a.user_id = auth.uid() and a.status = 'active'
        limit 1),
      (select public.employer_access_role(e.team_role) from public.employer_employees e
        where e.employer_id = p_firm and e.user_id = auth.uid()
          and lower(coalesce(e.status, '')) = 'active'
        order by e.created_at limit 1)
    )
  end
$$;

create or replace function public.can_see_firm_money(p_firm uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_firm is not null and p_firm in (select public.my_employer_admin_scope())
$$;

create or replace function public.get_my_employer_roles()
returns table(employer_id uuid, role text, can_see_money boolean)
language sql
stable
security definer
set search_path = public
as $$
  select f.id, public.my_employer_role(f.id), public.can_see_firm_money(f.id)
    from (
      select auth.uid() as id where auth.uid() is not null
      union
      select a.employer_id from public.employer_admins a
       where a.user_id = auth.uid() and a.status = 'active'
      union
      select e.employer_id from public.employer_employees e
       where e.user_id = auth.uid() and e.employer_id is not null
         and lower(coalesce(e.status, '')) = 'active'
    ) f
$$;

do $$
declare f text;
begin
  foreach f in array array['my_employer_admin_scope()', 'my_employer_role(uuid)',
                           'can_see_firm_money(uuid)', 'get_my_employer_roles()'] loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated, service_role', f);
  end loop;
end $$;

-- 3. Certificates: reading stays as today; SIGNING needs owner/admin or a QS.
create or replace function public.is_qs_signer_for(p_employer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_employer_id in (select public.my_employer_admin_scope())
    or exists (
      select 1 from public.employer_employees
       where employer_id = p_employer_id
         and user_id = auth.uid()
         and team_role ilike 'qs'
         and status ilike 'active'
    );
$$;

create or replace function public.is_team_qs_signer_of(p_owner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.employer_employees ee
     where ee.user_id = p_owner
       and ee.status = 'Active'
       and ee.claimed_at is not null
       -- Same people as is_team_qs_of, minus office managers.
       and (
         ee.employer_id in (select public.my_employer_admin_scope())
         or public.is_principal_qs_for(ee.employer_id)
       )
  );
$$;
revoke execute on function public.is_qs_signer_for(uuid) from public, anon;
grant execute on function public.is_qs_signer_for(uuid) to authenticated, service_role;
revoke execute on function public.is_team_qs_signer_of(uuid) from public, anon;
grant execute on function public.is_team_qs_signer_of(uuid) to authenticated, service_role;

do $$
declare v_def text; n int;
begin
  -- approve / return: swap only the authorisation call.
  foreach v_def in array array[
    pg_get_functiondef('public.approve_qs_review'::regproc),
    pg_get_functiondef('public.return_qs_review'::regproc)] loop
    n := (length(v_def) - length(replace(v_def, 'is_qs_reviewer_for(', ''))) / length('is_qs_reviewer_for(');
    if n < 1 then raise exception 'QS sign-off function has no is_qs_reviewer_for call to swap'; end if;
    execute replace(v_def, 'is_qs_reviewer_for(', 'is_qs_signer_for(');
  end loop;

  -- Principal QS: the owner-is-QS branch now needs owner/admin, not any manager.
  v_def := pg_get_functiondef('public.is_principal_qs_for(uuid)'::regprocedure);
  if position('p_employer_id in (select public.my_employer_scope())' in v_def) = 0 then
    raise exception 'is_principal_qs_for: expected scope line not found';
  end if;
  execute replace(v_def, 'p_employer_id in (select public.my_employer_scope())',
                         'p_employer_id in (select public.my_employer_admin_scope())');

  -- 4. OTJ: office managers no longer confirm apprentice hours.
  v_def := pg_get_functiondef('public.can_confirm_otj_for(uuid)'::regprocedure);
  if position('ap.employer_id in (select public.my_employer_scope())' in v_def) = 0 then
    raise exception 'can_confirm_otj_for: expected scope line not found';
  end if;
  execute replace(v_def, 'ap.employer_id in (select public.my_employer_scope())',
                         'ap.employer_id in (select public.my_employer_admin_scope())');
end $$;

drop policy if exists "QS can update team reports" on public.reports;
create policy "QS can update team reports" on public.reports
  for update to authenticated
  using (deleted_at is null and status <> 'auto-draft' and public.is_team_qs_signer_of(user_id))
  with check (deleted_at is null and public.is_team_qs_signer_of(user_id));

drop policy if exists "QS comment resolve" on public.report_qs_review_comments;
create policy "QS comment resolve" on public.report_qs_review_comments
  for update to authenticated
  using (exists (
    select 1 from public.report_qs_reviews q
     where q.id = report_qs_review_comments.review_id
       and (public.is_qs_signer_for(q.employer_id) or report_qs_review_comments.author_id = auth.uid())
  ));

-- 5. Money: job profit and cost lines are owner/admin only.
drop policy if exists "Firm managers manage job_financials" on public.job_financials;
create policy "Firm admins manage job_financials" on public.job_financials
  for all to authenticated
  using (user_id in (select public.my_employer_admin_scope()))
  with check (user_id in (select public.my_employer_admin_scope()));

drop policy if exists "Firm managers read job_cost_entries" on public.job_cost_entries;
create policy "Firm admins read job_cost_entries" on public.job_cost_entries
  for select to authenticated
  using (user_id in (select public.my_employer_admin_scope()));

-- Only owner/admin change pay rates (office can still edit everything else).
create or replace function public.guard_roster_pay_rates()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and new.employer_id is not null
     and not public.can_see_firm_money(new.employer_id)
     and (new.hourly_rate is distinct from old.hourly_rate
          or new.annual_salary is distinct from old.annual_salary
          or new.overtime_multiplier is distinct from old.overtime_multiplier) then
    raise exception 'Only the owner or an admin can change pay rates';
  end if;
  return new;
end;
$$;
drop trigger if exists trg_guard_roster_pay_rates on public.employer_employees;
create trigger trg_guard_roster_pay_rates
  before update of hourly_rate, annual_salary, overtime_multiplier on public.employer_employees
  for each row execute function public.guard_roster_pay_rates();

-- 6. Manager invites carry a role; owner can change it.
drop function if exists public.invite_co_admin(text, text, text);
create or replace function public.invite_co_admin(p_email text, p_full_name text default null,
                                                  p_job_title text default null,
                                                  p_access_role text default 'office')
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_owner uuid := auth.uid();
  v_email text := lower(trim(coalesce(p_email, '')));
  v_role text := lower(coalesce(nullif(btrim(p_access_role), ''), 'office'));
  v_existing public.employer_admins%rowtype;
  v_invitee uuid;
  v_company text;
begin
  if v_owner is null then
    raise exception 'Sign in again';
  end if;
  if v_role not in ('admin', 'office') then
    raise exception 'Choose Admin or Office';
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

  insert into public.employer_admins (employer_id, email, full_name, job_title, status, invited_by, access_role)
  values (v_owner, v_email, nullif(trim(coalesce(p_full_name, '')), ''), nullif(trim(coalesce(p_job_title, '')), ''),
          'pending', v_owner, v_role);

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
revoke execute on function public.invite_co_admin(text, text, text, text) from public, anon;
grant execute on function public.invite_co_admin(text, text, text, text) to authenticated;

create or replace function public.set_co_admin_role(p_id uuid, p_access_role text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare v_role text := lower(coalesce(p_access_role, ''));
begin
  if v_role not in ('admin', 'office') then
    raise exception 'Choose Admin or Office';
  end if;
  update public.employer_admins
     set access_role = v_role, updated_at = now()
   where id = p_id and employer_id = auth.uid() and status <> 'revoked';
  if not found then
    raise exception 'Only the account owner can change a manager''s role';
  end if;
  return jsonb_build_object('ok', true, 'access_role', v_role);
end;
$$;
revoke execute on function public.set_co_admin_role(uuid, text) from public, anon;
grant execute on function public.set_co_admin_role(uuid, text) to authenticated;

drop function if exists public.get_my_co_admin_invites();
create function public.get_my_co_admin_invites()
returns table(invite_id uuid, company_name text, invited_by_name text, job_title text,
              created_at timestamptz, access_role text)
language sql
stable
security definer
set search_path = public
as $$
  select a.id,
         coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'A firm'),
         nullif(btrim(p.full_name), ''),
         a.job_title,
         a.created_at,
         a.access_role
    from public.employer_admins a
    join public.profiles p on p.id = a.employer_id
    left join public.company_profiles cp on cp.user_id = a.employer_id
   where a.user_id = auth.uid()
     and a.status = 'pending'
   order by a.created_at
$$;
revoke execute on function public.get_my_co_admin_invites() from public, anon;
grant execute on function public.get_my_co_admin_invites() to authenticated;
