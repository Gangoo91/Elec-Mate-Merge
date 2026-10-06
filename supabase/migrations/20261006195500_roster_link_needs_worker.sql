-- Roster hole (reported 6 Oct by the College Hub session). "Employers can
-- manage employees" is FOR ALL scoped by employer_id only, and
-- my_employer_scope() always includes the caller. So ANY signed-in account
-- could insert a roster row with someone else's user_id and become that
-- person's "employer": see an apprentice's college progress and OTJ inbox,
-- mark their hours employer-verified (can_confirm_otj_for), and fire the seat
-- trigger with joined_worker_id = the victim (retires their own subscription
-- once WORKER_SEAT_REPLACES_SUB is switched on — it is not set today).
-- A second route: put a stranger's email on a row and claim_employee_records()
-- linked them automatically at their next sign-in.
--
-- Now only the worker links their own account:
--   * a trigger refuses any user_id that isn't the caller's (service role,
--     e.g. accept-team-invite after the person opened their invite link and
--     created the account, is unaffected);
--   * claim_employee_records() no longer links by email — the person gets a
--     "Firm X added you to their team — Join / Not me" prompt
--     (get_my_team_invites / respond_team_invite);
--   * hire_applicant() adds the hire unlinked, so they accept like anyone else.
-- Audit before the fix: 10 linked rows, all explained (9 claimed by the worker,
-- 1 via invite link, 2 email mismatches are on Andrew's own firm from 17 Jul).

alter table public.employer_employees
  add column if not exists link_declined_at timestamptz;
comment on column public.employer_employees.link_declined_at is
  'Set when the person this roster row''s email belongs to tapped "Not me" on the join prompt. The row stays for the firm; it is no longer offered to them.';

create or replace function public.guard_employee_claim()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  -- Only the worker links their own account to a roster row.
  if auth.uid() is not null and new.user_id is not null
     and (tg_op = 'INSERT' or new.user_id is distinct from old.user_id)
     and new.user_id <> auth.uid() then
    raise exception 'A team member links their own account. Add them by email and send the invite.';
  end if;

  if tg_op = 'INSERT' then
    if new.claimed_at is not null
       and auth.uid() is not null
       and (new.user_id is null or auth.uid() <> new.user_id) then
      raise exception 'claimed_at can only be set by the worker who owns the membership';
    end if;
  elsif new.claimed_at is distinct from old.claimed_at
     and auth.uid() is not null
     and (new.user_id is null or auth.uid() <> new.user_id) then
    raise exception 'claimed_at can only be set by the worker who owns the membership';
  end if;
  return new;
end;
$function$;

-- Sign-in no longer links by email; it only stamps claimed_at on rows the
-- person has already joined.
create or replace function public.claim_employee_records()
returns integer
language plpgsql
security definer
set search_path = public
as $function$
begin
  if auth.uid() is null then
    return 0;
  end if;
  update public.employer_employees
     set claimed_at = now()
   where user_id = auth.uid() and claimed_at is null;
  return 0;
end;
$function$;

create or replace function public.get_my_team_invites()
returns table(employee_id uuid, employer_id uuid, company_name text, role text, team_role text, added_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.employer_id,
         coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'A firm'),
         e.role, e.team_role, e.created_at
    from public.employer_employees e
    join auth.users u on u.id = auth.uid() and u.email_confirmed_at is not null
    left join public.company_profiles cp on cp.user_id = e.employer_id
    left join public.profiles p on p.id = e.employer_id
   where e.employer_id is not null
     and e.employer_id <> auth.uid()
     and e.user_id is null
     and e.link_declined_at is null
     and lower(coalesce(e.status, '')) <> 'archived'
     and lower(btrim(coalesce(e.email, ''))) = lower(u.email)
     and not exists (select 1 from public.employer_employees mine
                      where mine.user_id = auth.uid() and mine.employer_id = e.employer_id)
   order by e.created_at
$$;
revoke execute on function public.get_my_team_invites() from public, anon;
grant execute on function public.get_my_team_invites() to authenticated;

create or replace function public.respond_team_invite(p_employee_id uuid, p_accept boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_employees%rowtype;
  v_email text;
begin
  select lower(email) into v_email from auth.users
   where id = auth.uid() and email_confirmed_at is not null;
  if v_email is null then
    raise exception 'Confirm your email address first';
  end if;

  select * into v_row from public.employer_employees
   where id = p_employee_id
     and user_id is null
     and link_declined_at is null
     and lower(btrim(coalesce(email, ''))) = v_email
   for update;
  if not found then
    raise exception 'This invite is no longer open';
  end if;

  if p_accept then
    -- auth.uid() is the worker, so guard_employee_claim allows it; the seat
    -- trigger activates their seat as for any join.
    update public.employer_employees
       set user_id = auth.uid(), claimed_at = now(), updated_at = now()
     where id = p_employee_id;
    return jsonb_build_object('ok', true, 'status', 'joined', 'employer_id', v_row.employer_id);
  end if;

  update public.employer_employees set link_declined_at = now(), updated_at = now() where id = p_employee_id;
  perform public.notify_employer_bell(
    v_row.employer_id, 'team_invite_declined',
    coalesce(v_row.name, 'Someone') || ' said the invite isn''t for them',
    'Check the email address on their team record.',
    jsonb_build_object('route', '/employer?section=team'));
  return jsonb_build_object('ok', true, 'status', 'declined');
end;
$$;
revoke execute on function public.respond_team_invite(uuid, boolean) from public, anon;
grant execute on function public.respond_team_invite(uuid, boolean) to authenticated;

-- A hire is added unlinked; the person joins from their prompt.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.hire_applicant(uuid,numeric)'::regprocedure);
  if position('0, v_uid, v_worker_user_id' in v_def) > 0 then
    v_def := replace(v_def, '0, v_uid, v_worker_user_id', '0, v_uid, null');
    execute v_def;
  end if;
end $$;
