-- ELE-1836 · Prove it is used (1/3): one event per employer/worker workflow step.
--
-- Why server-side and not PostHog: client events are consent-gated and land in
-- a third-party tool nobody can join to a firm (see the comment on
-- analytics_daily: client events capture ~0% of real activity). Every step
-- here already writes a row in its own table, so an AFTER trigger on that
-- table is the one choke point that cannot be skipped by a new screen, a
-- mobile build or a declined cookie banner.
--
-- Privacy: an event is (firm id, event name, actor id, actor role, ref id,
-- time). No titles, names, amounts or free text are ever copied in.
--
-- Safety: every trigger function swallows its own errors. Bookkeeping must
-- never be able to break the timesheet / invoice / snag it is counting.

create table if not exists public.employer_usage_events (
  id bigserial primary key,
  employer_id uuid not null,
  event text not null,
  actor_id uuid,
  actor_role text not null default 'external'
    check (actor_role in ('owner', 'manager', 'worker', 'external', 'backfill')),
  ref_id uuid,
  created_at timestamptz not null default now()
);

comment on table public.employer_usage_events is
  '[EMPLOYER] ELE-1836 usage funnel: one row per workflow step a firm or its team completed (invite_sent/accepted, job_created/assigned, timesheet_submitted/decided, expense_submitted/decided, snag_raised/resolved, pack_sent/signed, briefing_sent/signed, attestation_decided, invoice_sent/pay_link/paid, diary_moved, checklist_completed). Scope: employer_id = the firm (owner profiles.id). Written only by the trg_eu_* triggers via _eu_log (ids only, never content). Used by: admin_employer_liveness (Admin → Employers), employer weekly digest. Rule: (event, ref_id) is unique, so a step counts once per thing; no client access.';

create unique index if not exists employer_usage_events_once
  on public.employer_usage_events (event, ref_id) where ref_id is not null;
create index if not exists employer_usage_events_firm_time
  on public.employer_usage_events (employer_id, created_at desc);

alter table public.employer_usage_events enable row level security;
revoke all on public.employer_usage_events from public, anon, authenticated;

-- ─── helpers ──────────────────────────────────────────────────────────────

-- Is this account a firm (an Employer Hub owner)?
create or replace function public._eu_is_firm(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_uid is not null and (
    exists (select 1 from public.employer_employees e where e.employer_id = p_uid)
    or exists (select 1 from public.employer_jobs j where j.user_id = p_uid)
    or exists (select 1 from public.profiles p
                where p.id = p_uid
                  and (lower(coalesce(p.subscription_tier, '')) = 'employer' or p.role::text = 'employer'))
  );
$$;

-- The firm an office account acts for: itself if it is a firm, else the firm
-- it manages. Workers are deliberately NOT mapped (their own quotes and
-- briefings are their own business, not the firm's).
create or replace function public._eu_office_firm(p_uid uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select case
    when p_uid is null then null
    when public._eu_is_firm(p_uid) then p_uid
    else (select a.employer_id from public.employer_admins a
           where a.user_id = p_uid and a.status = 'active'
           order by a.created_at limit 1)
  end;
$$;

create or replace function public._eu_log(p_firm uuid, p_event text, p_ref uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_role text;
begin
  if p_firm is null or p_event is null then return; end if;
  v_role := case
    when v_uid is null then 'external'
    when v_uid = p_firm then 'owner'
    when exists (select 1 from public.employer_admins a
                  where a.employer_id = p_firm and a.user_id = v_uid and a.status = 'active') then 'manager'
    when exists (select 1 from public.employer_employees e
                  where e.employer_id = p_firm and e.user_id = v_uid) then 'worker'
    else 'external'
  end;
  insert into public.employer_usage_events (employer_id, event, actor_id, actor_role, ref_id)
  values (p_firm, p_event, v_uid, v_role, coalesce(p_ref, gen_random_uuid()))
  on conflict do nothing;
exception when others then
  raise warning '[_eu_log] % %: %', p_firm, p_event, sqlerrm;
end;
$$;

revoke all on function public._eu_is_firm(uuid) from public, anon, authenticated;
revoke all on function public._eu_office_firm(uuid) from public, anon, authenticated;
revoke all on function public._eu_log(uuid, text, uuid) from public, anon, authenticated;

-- ─── triggers, one per source table ──────────────────────────────────────

-- Team invites: sent / accepted
create or replace function public.trg_eu_team_invites()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    perform public._eu_log(new.employer_id, 'invite_sent', new.id);
  elsif (new.accepted_at is not null and old.accepted_at is null)
     or (lower(coalesce(new.status, '')) = 'accepted' and lower(coalesce(old.status, '')) <> 'accepted') then
    perform public._eu_log(new.employer_id, 'invite_accepted', coalesce(new.employee_id, new.id));
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_team_invites] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_team_invites;
create trigger eu_usage after insert or update of status, accepted_at on public.employer_team_invites
  for each row execute function public.trg_eu_team_invites();

-- Roster row claimed by a worker (team code / link) = invite accepted.
create or replace function public.trg_eu_employees()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.claimed_at is not null and old.claimed_at is null then
    perform public._eu_log(new.employer_id, 'invite_accepted', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_employees] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_employees;
create trigger eu_usage after update of claimed_at on public.employer_employees
  for each row execute function public.trg_eu_employees();

-- Jobs: created; and moved on the diary (dates changed).
create or replace function public.trg_eu_jobs()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if coalesce(new.is_template, false) = false then
      perform public._eu_log(new.user_id, 'job_created', new.id);
    end if;
  elsif old.start_date is not null
    and (new.start_date, new.end_date) is distinct from (old.start_date, old.end_date) then
    perform public._eu_log(new.user_id, 'diary_moved', null);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_jobs] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_jobs;
create trigger eu_usage after insert or update of start_date, end_date on public.employer_jobs
  for each row execute function public.trg_eu_jobs();

-- Dispatch history (written by trg_log_dispatch_change): assigned / moved.
create or replace function public.trg_eu_dispatch()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.kind = 'assigned' then
    perform public._eu_log(new.firm_id, 'job_assigned', coalesce(new.assignment_id, new.id));
  elsif new.kind = 'moved' then
    perform public._eu_log(new.firm_id, 'diary_moved', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_dispatch] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_dispatch_changes;
create trigger eu_usage after insert on public.employer_dispatch_changes
  for each row execute function public.trg_eu_dispatch();

-- Timesheets: submitted (same rule as trg_notify_timesheet_submission) / decided.
create or replace function public.trg_eu_timesheets()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  select e.employer_id into v_firm from public.employer_employees e where e.id = new.employee_id;
  if v_firm is null then return null; end if;
  if lower(coalesce(new.status, '')) in ('pending', 'submitted') and new.total_hours is not null
     and (tg_op = 'INSERT' or new.status is distinct from old.status
          or (old.total_hours is null and new.total_hours is not null)) then
    perform public._eu_log(v_firm, 'timesheet_submitted', new.id);
  elsif tg_op = 'UPDATE' and new.status is distinct from old.status
     and lower(coalesce(new.status, '')) in ('approved', 'rejected') then
    perform public._eu_log(v_firm, 'timesheet_decided', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_timesheets] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_timesheets;
create trigger eu_usage after insert or update of status, total_hours on public.employer_timesheets
  for each row execute function public.trg_eu_timesheets();

-- Expenses: submitted / decided.
create or replace function public.trg_eu_expenses()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  select e.employer_id into v_firm from public.employer_employees e where e.id = new.employee_id;
  if v_firm is null then return null; end if;
  if tg_op = 'INSERT' then
    perform public._eu_log(v_firm, 'expense_submitted', new.id);
  elsif new.status is distinct from old.status
     and lower(coalesce(new.status, '')) in ('approved', 'rejected') then
    perform public._eu_log(v_firm, 'expense_decided', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_expenses] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_expense_claims;
create trigger eu_usage after insert or update of status on public.employer_expense_claims
  for each row execute function public.trg_eu_expenses();

-- Snags / issues on a firm job: raised / resolved.
create or replace function public.trg_eu_snags()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if new.job_id is not null then
    select j.user_id into v_firm from public.employer_jobs j where j.id = new.job_id;
  end if;
  if v_firm is null and public._eu_is_firm(new.user_id) then v_firm := new.user_id; end if;
  if v_firm is null then return null; end if;
  if tg_op = 'INSERT' then
    perform public._eu_log(v_firm, 'snag_raised', new.id);
  elsif new.status is distinct from old.status
     and lower(coalesce(new.status, '')) in ('resolved', 'closed', 'done', 'fixed') then
    perform public._eu_log(v_firm, 'snag_resolved', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_snags] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.job_issues;
create trigger eu_usage after insert or update of status on public.job_issues
  for each row execute function public.trg_eu_snags();

-- Job packs: sent to the crew.
create or replace function public.trg_eu_packs()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.sent_to_workers_at is not null
     and (tg_op = 'INSERT' or old.sent_to_workers_at is null) then
    perform public._eu_log(new.employer_id, 'pack_sent', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_packs] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_job_packs;
create trigger eu_usage after insert or update of sent_to_workers_at on public.employer_job_packs
  for each row execute function public.trg_eu_packs();

-- Job packs: signed by a worker.
create or replace function public.trg_eu_pack_acks()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if new.acknowledged_at is not null and (tg_op = 'INSERT' or old.acknowledged_at is null) then
    select p.employer_id into v_firm from public.employer_job_packs p where p.id = new.job_pack_id;
    perform public._eu_log(v_firm, 'pack_signed', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_pack_acks] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_job_pack_acknowledgements;
create trigger eu_usage after insert or update of acknowledged_at on public.employer_job_pack_acknowledgements
  for each row execute function public.trg_eu_pack_acks();

-- Briefings (shared with the Electrical Hub — only firms count): sent.
create or replace function public.trg_eu_briefings()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(coalesce(new.status, '')) <> 'draft'
     and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) = 'draft')
     and public._eu_is_firm(new.user_id) then
    perform public._eu_log(new.user_id, 'briefing_sent', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_briefings] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.briefings;
create trigger eu_usage after insert or update of status on public.briefings
  for each row execute function public.trg_eu_briefings();

-- Briefings: signed by an attendee.
create or replace function public.trg_eu_briefing_signed()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if new.acknowledged is true and (tg_op = 'INSERT' or old.acknowledged is not true) then
    select b.user_id into v_firm from public.briefings b where b.id = new.briefing_id;
    if public._eu_is_firm(v_firm) then
      perform public._eu_log(v_firm, 'briefing_signed', new.id);
    end if;
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_briefing_signed] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.briefing_attendees;
create trigger eu_usage after insert or update of acknowledged on public.briefing_attendees
  for each row execute function public.trg_eu_briefing_signed();

-- Apprentice off-the-job hours: the EMPLOYER's decision only (attested, or
-- sent back with an "Employer (...)" rationale by attest_otj_as_employer).
-- Tutor/college verifications are not employer workflow and are ignored.
create or replace function public.trg_eu_otj_attest()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if new.verification_status is distinct from old.verification_status
     and (new.verification_status = 'verified_by_employer'
          or (new.verification_status = 'rejected'
              and coalesce(new.verification_rationale, '') like 'Employer (%')) then
    select e.employer_id into v_firm from public.employer_employees e
     where e.user_id = new.student_id and e.employer_id is not null
     order by (lower(coalesce(e.status, '')) = 'active') desc limit 1;
    perform public._eu_log(v_firm, 'attestation_decided', new.id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_otj_attest] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.college_otj_entries;
create trigger eu_usage after update of verification_status on public.college_otj_entries
  for each row execute function public.trg_eu_otj_attest();

-- Invoices (quotes table): sent / pay link added / paid — firms only.
create or replace function public.trg_eu_invoices()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_sent boolean;
  v_link boolean;
  v_paid boolean;
  v_firm uuid;
begin
  v_sent := new.invoice_sent_at is not null and (tg_op = 'INSERT' or old.invoice_sent_at is null);
  v_link := nullif(new.stripe_payment_link_url, '') is not null
            and (tg_op = 'INSERT' or nullif(old.stripe_payment_link_url, '') is null);
  v_paid := new.invoice_status = 'paid' and (tg_op = 'INSERT' or old.invoice_status is distinct from 'paid');
  if not (v_sent or v_link or v_paid) then return null; end if;

  v_firm := public._eu_office_firm(new.user_id);
  if v_firm is null and new.employer_job_id is not null then
    select j.user_id into v_firm from public.employer_jobs j where j.id = new.employer_job_id;
  end if;
  if v_firm is null then return null; end if;

  if v_sent then perform public._eu_log(v_firm, 'invoice_sent', new.id); end if;
  if v_link then perform public._eu_log(v_firm, 'invoice_pay_link', new.id); end if;
  if v_paid then perform public._eu_log(v_firm, 'invoice_paid', new.id); end if;
  return null;
exception when others then
  raise warning '[trg_eu_invoices] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.quotes;
create trigger eu_usage after insert or update of invoice_sent_at, stripe_payment_link_url, invoice_status on public.quotes
  for each row execute function public.trg_eu_invoices();

-- Job checklist: the last item on a job ticked = checklist completed.
create or replace function public.trg_eu_checklist()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if new.is_completed is true and old.is_completed is not true
     and not exists (select 1 from public.employer_job_checklist_items i
                      where i.job_id = new.job_id and i.is_completed is not true) then
    select j.user_id into v_firm from public.employer_jobs j where j.id = new.job_id;
    perform public._eu_log(v_firm, 'checklist_completed', new.job_id);
  end if;
  return null;
exception when others then
  raise warning '[trg_eu_checklist] %', sqlerrm; return null;
end; $$;
drop trigger if exists eu_usage on public.employer_job_checklist_items;
create trigger eu_usage after update of is_completed on public.employer_job_checklist_items
  for each row execute function public.trg_eu_checklist();

do $$
declare f text;
begin
  foreach f in array array['trg_eu_team_invites','trg_eu_employees','trg_eu_jobs','trg_eu_dispatch',
    'trg_eu_timesheets','trg_eu_expenses','trg_eu_snags','trg_eu_packs','trg_eu_pack_acks',
    'trg_eu_briefings','trg_eu_briefing_signed','trg_eu_otj_attest','trg_eu_invoices','trg_eu_checklist']
  loop
    execute format('revoke all on function public.%I() from public, anon, authenticated', f);
  end loop;
end $$;

-- ─── backfill from the source tables (actor_role = 'backfill') ───────────
-- So liveness and the aha metric mean something from day one.
insert into public.employer_usage_events (employer_id, event, actor_role, ref_id, created_at)
select employer_id, event, 'backfill', ref_id, created_at from (
  select i.employer_id, 'invite_sent' event, i.id ref_id, i.created_at from employer_team_invites i
  union all
  select i.employer_id, 'invite_accepted', coalesce(i.employee_id, i.id), i.accepted_at
    from employer_team_invites i where i.accepted_at is not null
  union all
  select e.employer_id, 'invite_accepted', e.id, e.claimed_at
    from employer_employees e where e.claimed_at is not null and e.employer_id is not null
  union all
  select j.user_id, 'job_created', j.id, j.created_at from employer_jobs j
   where coalesce(j.is_template, false) = false and j.user_id is not null
  union all
  select d.firm_id, case d.kind when 'assigned' then 'job_assigned' else 'diary_moved' end,
         case d.kind when 'assigned' then coalesce(d.assignment_id, d.id) else d.id end, d.created_at
    from employer_dispatch_changes d where d.kind in ('assigned', 'moved')
  union all
  select e.employer_id, 'timesheet_submitted', t.id, t.created_at
    from employer_timesheets t join employer_employees e on e.id = t.employee_id
   where t.total_hours is not null and e.employer_id is not null
  union all
  select e.employer_id, 'timesheet_decided', t.id, coalesce(t.approved_at, t.updated_at)
    from employer_timesheets t join employer_employees e on e.id = t.employee_id
   where lower(coalesce(t.status, '')) in ('approved', 'rejected') and e.employer_id is not null
  union all
  select e.employer_id, 'expense_submitted', x.id, x.created_at
    from employer_expense_claims x join employer_employees e on e.id = x.employee_id
   where e.employer_id is not null
  union all
  select e.employer_id, 'expense_decided', x.id, coalesce(x.approved_date, x.updated_at)
    from employer_expense_claims x join employer_employees e on e.id = x.employee_id
   where lower(coalesce(x.status, '')) in ('approved', 'rejected', 'paid') and e.employer_id is not null
  union all
  select j.user_id, 'snag_raised', s.id, s.created_at
    from job_issues s join employer_jobs j on j.id = s.job_id
  union all
  select j.user_id, 'snag_resolved', s.id, coalesce(s.resolved_at, s.updated_at)
    from job_issues s join employer_jobs j on j.id = s.job_id
   where lower(coalesce(s.status, '')) in ('resolved', 'closed', 'done', 'fixed')
  union all
  select p.employer_id, 'pack_sent', p.id, p.sent_to_workers_at
    from employer_job_packs p where p.sent_to_workers_at is not null and p.employer_id is not null
  union all
  select p.employer_id, 'pack_signed', a.id, a.acknowledged_at
    from employer_job_pack_acknowledgements a join employer_job_packs p on p.id = a.job_pack_id
   where a.acknowledged_at is not null and p.employer_id is not null
  union all
  select b.user_id, 'briefing_sent', b.id, b.created_at
    from briefings b where lower(coalesce(b.status, '')) <> 'draft' and public._eu_is_firm(b.user_id)
  union all
  select b.user_id, 'briefing_signed', a.id, coalesce(a.acknowledged_at, a.updated_at, a.created_at)
    from briefing_attendees a join briefings b on b.id = a.briefing_id
   where a.acknowledged is true and public._eu_is_firm(b.user_id)
  union all
  select (select e.employer_id from employer_employees e
           where e.user_id = o.student_id and e.employer_id is not null
           order by (lower(coalesce(e.status, '')) = 'active') desc limit 1),
         'attestation_decided', o.id, coalesce(o.verified_at, o.updated_at)
    from college_otj_entries o
   where o.verification_status = 'verified_by_employer'
      or (o.verification_status = 'rejected' and coalesce(o.verification_rationale, '') like 'Employer (%')
  union all
  select f.firm, 'invoice_sent', q.id, q.invoice_sent_at
    from quotes q cross join lateral (select public._eu_office_firm(q.user_id) firm) f
   where q.invoice_sent_at is not null and f.firm is not null
  union all
  select f.firm, 'invoice_pay_link', q.id, coalesce(q.invoice_sent_at, q.updated_at)
    from quotes q cross join lateral (select public._eu_office_firm(q.user_id) firm) f
   where nullif(q.stripe_payment_link_url, '') is not null and f.firm is not null
  union all
  select f.firm, 'invoice_paid', q.id, coalesce(q.invoice_paid_at, q.updated_at)
    from quotes q cross join lateral (select public._eu_office_firm(q.user_id) firm) f
   where q.invoice_status = 'paid' and f.firm is not null
) s
where employer_id is not null and created_at is not null
on conflict do nothing;
