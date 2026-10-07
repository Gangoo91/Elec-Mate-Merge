-- Security review of 6 Oct night's work (roles, crew, notifications).
--  1. HIGH: an office manager could INSERT a roster row for THEMSELVES (team_role
--     QS / is_principal_qs) and gain certificate sign-off, principal QS and OTJ
--     confirmation. Managers may not self-roster on a firm they manage, and only
--     owner/admin may grant QS / principal QS.
--  3. Crew approvals treated an open clock-in (Pending, clock_out null) as
--     waiting; approving it made the clock-out impossible and lost the hours.
--  6. Expiry reminders de-duplicated against user_notifications, which "Clear
--     all" deletes, so they re-sent every morning. Own sent-log now.
--  7. A worker could be their own supervisor and approve their own requests.
--  9. Invoice-paid office emails mapped a manager's OWN invoices to the firm.
-- 10. respond_team_invite accepted archived rows; pay rates could be set by
--     office on INSERT.

-- 1 + 10 (pay on insert) ------------------------------------------------------
create or replace function public.guard_employee_claim()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if auth.uid() is not null and new.user_id is not null
     and (tg_op = 'INSERT' or new.user_id is distinct from old.user_id)
     and new.user_id <> auth.uid() then
    raise exception 'A team member links their own account. Add them by email and send the invite.';
  end if;

  -- A manager doesn't put themselves on the roster of a firm they manage: that
  -- would hand an office manager QS sign-off or OTJ confirmation.
  if auth.uid() is not null and new.user_id = auth.uid()
     and new.employer_id is not null and new.employer_id <> auth.uid()
     and (tg_op = 'INSERT' or new.user_id is distinct from old.user_id or new.employer_id is distinct from old.employer_id)
     and exists (select 1 from public.employer_admins a
                  where a.employer_id = new.employer_id and a.user_id = auth.uid() and a.status = 'active') then
    raise exception 'Managers can''t add themselves to the team. Ask the owner.';
  end if;

  -- QS / principal QS carry sign-off powers: owner or admin only.
  if auth.uid() is not null and new.employer_id is not null
     and not public.can_see_firm_money(new.employer_id)
     and (
       (tg_op = 'INSERT' and (lower(coalesce(new.team_role, '')) = 'qs' or coalesce(new.is_principal_qs, false)))
       or (tg_op = 'UPDATE' and (
             (lower(coalesce(new.team_role, '')) = 'qs') is distinct from (lower(coalesce(old.team_role, '')) = 'qs')
             or coalesce(new.is_principal_qs, false) is distinct from coalesce(old.is_principal_qs, false)))
     ) then
    raise exception 'Only the owner or an admin can make someone the QS';
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

create or replace function public.guard_roster_pay_rates()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or new.employer_id is null or public.can_see_firm_money(new.employer_id) then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if coalesce(new.hourly_rate, 0) <> 0 or new.annual_salary is not null then
      raise exception 'Only the owner or an admin can set pay rates';
    end if;
  elsif new.hourly_rate is distinct from old.hourly_rate
     or new.annual_salary is distinct from old.annual_salary
     or new.overtime_multiplier is distinct from old.overtime_multiplier then
    raise exception 'Only the owner or an admin can change pay rates';
  end if;
  return new;
end;
$$;
drop trigger if exists trg_guard_roster_pay_rates on public.employer_employees;
create trigger trg_guard_roster_pay_rates
  before insert or update of hourly_rate, annual_salary, overtime_multiplier on public.employer_employees
  for each row execute function public.guard_roster_pay_rates();

-- 3 + 7: crew ---------------------------------------------------------------
create or replace function public.my_crew_employee_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select e.id
    from public.employer_employees e
   where e.supervisor_employee_id in (select public.my_employee_ids())
     and e.id not in (select public.my_employee_ids())   -- never yourself
     and lower(coalesce(e.status, '')) = 'active'
$$;

create or replace function public.employee_supervisor_same_firm()
returns trigger
language plpgsql
set search_path = public
as $function$
begin
  if NEW.supervisor_employee_id is not null and NEW.supervisor_employee_id = NEW.id then
    raise exception 'Someone can''t be their own supervisor';
  end if;
  if NEW.supervisor_employee_id is not null and not exists (
    select 1 from public.employer_employees s
     where s.id = NEW.supervisor_employee_id and s.employer_id = NEW.employer_id
  ) then
    raise exception 'The supervisor must be on the same team';
  end if;
  return NEW;
end;
$function$;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_crew_approvals()'::regprocedure);
  if position('t.clock_out is not null' in v_def) = 0 then
    v_def := replace(v_def, $q$where t.status = 'Pending'), '[]'::jsonb),$q$,
                            $q$where t.status = 'Pending' and t.clock_out is not null and t.total_hours is not null), '[]'::jsonb),$q$);
    if position('t.clock_out is not null' in v_def) = 0 then raise exception 'get_crew_approvals not patched'; end if;
    execute v_def;
  end if;

  v_def := pg_get_functiondef('public.decide_crew_request(text,uuid,boolean,text)'::regprocedure);
  if position('clock_out is not null' in v_def) = 0 then
    v_def := replace(v_def,
      $q$     where id = p_id and status = 'Pending'
       and employee_id in (select public.my_crew_employee_ids());
  elsif p_kind = 'expense' then$q$,
      $q$     where id = p_id and status = 'Pending' and clock_out is not null
       and employee_id in (select public.my_crew_employee_ids());
  elsif p_kind = 'expense' then$q$);
    if position('clock_out is not null' in v_def) = 0 then raise exception 'decide_crew_request not patched'; end if;
    execute v_def;
  end if;
end $$;

-- 6: expiry sent-log -------------------------------------------------------
create table if not exists public.employer_expiry_sent (
  firm uuid not null,
  ref text not null,
  sent_at timestamptz not null default now(),
  primary key (firm, ref)
);
alter table public.employer_expiry_sent enable row level security;
comment on table public.employer_expiry_sent is
  '[EMPLOYER] One row per expiry/RAMS reminder ever rung, so clearing the bell can''t make it repeat. Scope: firm. Used by: notify_employer_expiries (cron 147). Rule: server-only, no client policies.';
insert into public.employer_expiry_sent (firm, ref, sent_at)
select n.user_id, n.metadata->>'ref_id', min(n.created_at)
  from public.user_notifications n
 where n.type = 'employer_expiry' and n.metadata ? 'ref_id'
 group by 1, 2
on conflict do nothing;

do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef('public.notify_employer_expiries()'::regprocedure);
  if position('employer_expiry_sent' in v_def) > 0 then return; end if;
  v_new := regexp_replace(v_def,
    'continue when exists \(\s*select 1 from public\.user_notifications n\s*where n\.user_id = r\.firm and n\.type = ''employer_expiry''\s*and n\.created_at > now\(\) - interval ''120 days''\s*and n\.metadata->>''ref_id'' = v_ref\);',
    'insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;', 'g');
  v_new := regexp_replace(v_new,
    'select count\(\*\) into v_new\s*from public\.user_notifications n\s*where n\.user_id = r\.firm and n\.type = ''employer_expiry''\s*and n\.created_at >= date_trunc\(''day'', now\(\)\);',
    'select count(*) into v_new from public.employer_expiry_sent s
         where s.firm = r.firm and s.sent_at >= date_trunc(''day'', now());', 'g');
  if (length(v_new) - length(replace(v_new, 'employer_expiry_sent', ''))) / length('employer_expiry_sent') < 3 then
    raise exception 'notify_employer_expiries: expected 3 replacements';
  end if;
  execute v_new;
end $$;

-- 9: invoice-paid email belongs to the invoice's own firm ------------------
create or replace function public.notify_office_invoice_paid()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.user_id is null then return new; end if;
  -- Firm invoices are raised under the firm's own id (managers included), so
  -- the row's user_id IS the firm. Never map a manager's personal invoices.
  perform public.queue_office_email(
    new.user_id, 'invoice_paid', tg_table_name || ':' || new.id,
    jsonb_build_object('source', tg_table_name, 'id', new.id));
  return new;
exception when others then
  raise warning '[notify_office_invoice_paid] %', sqlerrm;
  return new;
end;
$function$;

-- 10: no re-joining an archived row ------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.respond_team_invite(uuid,boolean)'::regprocedure);
  if position('archived' in v_def) = 0 then
    v_def := replace(v_def,
      $q$     and link_declined_at is null
     and lower(btrim(coalesce(email, ''))) = v_email
   for update;$q$,
      $q$     and link_declined_at is null
     and lower(coalesce(status, '')) <> 'archived'
     and lower(btrim(coalesce(email, ''))) = v_email
   for update;$q$);
    if position('archived' in v_def) = 0 then raise exception 'respond_team_invite not patched'; end if;
    execute v_def;
  end if;
end $$;
