-- Team Certificates for the QS (Craig/ELE-1307 follow-on).
-- The company owner (or a designated principal QS) can view and edit the
-- certificates of Active, WORKER-CLAIMED team members — they are the
-- company's certs, issued under the company's scheme registration. Every
-- cross-user edit is logged and the engineer is notified.
--
-- SECURITY MODEL (audit 2026-07-17): employer_employees rows are
-- employer-writable, so a roster row alone MUST NOT grant access — any
-- account could insert {employer_id: me, user_id: victim} and read the
-- victim's certs. Access therefore requires the WORKER's consent signal:
-- claimed_at, which only the worker themselves (auth.uid() = user_id) can
-- set, enforced by trigger.
--
-- Rollback:
--   drop policy if exists "QS can view team reports" on public.reports;
--   drop policy if exists "QS can update team reports" on public.reports;
--   drop trigger if exists trg_report_edit_log on public.reports;
--   drop trigger if exists trg_reports_protect_ownership on public.reports;
--   drop function if exists public.log_report_edit();
--   drop function if exists public.protect_report_ownership();
--   drop table if exists public.report_edit_log;
--   drop function if exists public.is_team_qs_of(uuid);
--   drop trigger if exists trg_employee_claim_guard on public.employer_employees;
--   drop function if exists public.guard_employee_claim();
--   alter table public.employer_employees drop column if exists claimed_at;

-- ── Worker-consent signal ───────────────────────────────────────────────────
alter table public.employer_employees
  add column if not exists claimed_at timestamptz;

-- Existing linked memberships predate this column and were established via
-- the email-match claim flow — accept them as claimed.
update public.employer_employees
  set claimed_at = coalesce(claimed_at, now())
  where user_id is not null and claimed_at is null;

-- Only the worker themselves (or service role) may set/clear claimed_at.
-- Without this, the employer's blanket FOR ALL policy would let an attacker
-- forge the consent signal they need for cert access.
-- Fires on INSERT as well as UPDATE — otherwise an attacker could simply
-- insert the roster row with claimed_at already set and skip the guard.
create or replace function public.guard_employee_claim()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
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
$$;

drop trigger if exists trg_employee_claim_guard on public.employer_employees;
create trigger trg_employee_claim_guard
  before insert or update on public.employer_employees
  for each row execute function public.guard_employee_claim();

-- The worker-side claim flow marks consent when it links the row.
-- Mirrors the live definition (returns integer, confirmed-email guard) with
-- claimed_at stamped on link + backfilled for the worker's own legacy rows.
create or replace function public.claim_employee_records()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_email text;
  v_count integer;
begin
  select lower(email) into v_email
  from auth.users
  where id = auth.uid()
    and email_confirmed_at is not null;

  if v_email is null then
    return 0;
  end if;

  update public.employer_employees
     set user_id = auth.uid(),
         claimed_at = now(),
         updated_at = now()
   where employer_id is not null
     and user_id is null
     and lower(email) = v_email;

  get diagnostics v_count = row_count;

  -- Rows linked before claimed_at existed: mark consent when the worker
  -- themselves runs the claim.
  update public.employer_employees
     set claimed_at = now()
   where user_id = auth.uid() and claimed_at is null;

  return v_count;
end;
$$;

-- ── Access predicate ────────────────────────────────────────────────────────
-- True when the CURRENT user is the employer-owner (or designated principal
-- QS) of a company that p_owner is an Active, worker-claimed member of.
create or replace function public.is_team_qs_of(p_owner uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select exists (
    select 1
    from public.employer_employees ee
    where ee.user_id = p_owner
      and ee.status = 'Active'
      and ee.claimed_at is not null
      and (
        ee.employer_id = auth.uid()
        or public.is_principal_qs_for(ee.employer_id)
      )
  );
$$;

revoke execute on function public.is_team_qs_of(uuid) from public, anon;
grant execute on function public.is_team_qs_of(uuid) to authenticated;

-- ── Reports access for the QS ───────────────────────────────────────────────
-- auto-drafts stay private: they're unsaved working state, not company certs.
drop policy if exists "QS can view team reports" on public.reports;
create policy "QS can view team reports" on public.reports
  for select
  using (
    deleted_at is null
    and status <> 'auto-draft'
    and public.is_team_qs_of(user_id)
  );

drop policy if exists "QS can update team reports" on public.reports;
create policy "QS can update team reports" on public.reports
  for update
  using (
    deleted_at is null
    and status <> 'auto-draft'
    and public.is_team_qs_of(user_id)
  )
  with check (
    deleted_at is null
    and public.is_team_qs_of(user_id)
  );

-- Ownership and soft-delete are NOT editable cross-user, whatever RLS says:
-- flipping user_id would move certs between accounts invisibly, and setting
-- deleted_at is a delete in edit's clothing.
create or replace function public.protect_report_ownership()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is not null and auth.uid() <> old.user_id then
    if new.user_id is distinct from old.user_id then
      raise exception 'certificate ownership can only be changed by its owner';
    end if;
    if new.deleted_at is distinct from old.deleted_at then
      raise exception 'certificates can only be deleted by their owner';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_reports_protect_ownership on public.reports;
create trigger trg_reports_protect_ownership
  before update on public.reports
  for each row execute function public.protect_report_ownership();

-- ── Edit trail — every cross-user edit is attributable ─────────────────────
create table if not exists public.report_edit_log (
  id uuid primary key default gen_random_uuid(),
  report_uuid uuid not null references public.reports(id) on delete cascade,
  editor_id uuid not null,
  report_owner_id uuid not null,
  changed_columns text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_report_edit_log_report on public.report_edit_log(report_uuid);

alter table public.report_edit_log enable row level security;

drop policy if exists "Owner and team QS can read edit log" on public.report_edit_log;
create policy "Owner and team QS can read edit log" on public.report_edit_log
  for select
  using (
    report_owner_id = auth.uid()
    or editor_id = auth.uid()
    or public.is_team_qs_of(report_owner_id)
  );

-- user_notifications has no INSERT policy (all writes are service-role edge
-- functions), so the in-session edit trigger can't create the engineer's
-- "your cert was updated" bell. Allow a team QS to notify a member they
-- actually supervise — scoped so it can't be used to spam arbitrary users.
drop policy if exists "Team QS can notify supervised member" on public.user_notifications;
create policy "Team QS can notify supervised member" on public.user_notifications
  for insert
  with check (public.is_team_qs_of(user_id));

-- Logs ONLY authenticated cross-user CONTENT edits:
--  - service role / crons (auth.uid() null) → no log
--  - owner editing their own cert → no log
--  - housekeeping columns (locks from QS approval, PDF regeneration,
--    auto-linking) → excluded, else every approval would show a phantom
--    "V2 edited by QS" and spam the engineer
create or replace function public.log_report_edit()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_editor uuid := auth.uid();
  v_changed text[];
  v_link text;
begin
  if v_editor is null or v_editor = old.user_id then
    return new;
  end if;

  select coalesce(array_agg(o.key), '{}') into v_changed
  from jsonb_each(to_jsonb(old)) o
  join jsonb_each(to_jsonb(new)) n on n.key = o.key
  where o.value is distinct from n.value
    and o.key not in (
      'updated_at', 'last_synced_at', 'edit_version',
      'locked_at', 'pdf_url', 'pdf_generated_at', 'pdf_payload',
      'customer_id', 'storage_path'
    );

  if coalesce(array_length(v_changed, 1), 0) = 0 then
    return new;
  end if;

  insert into public.report_edit_log (report_uuid, editor_id, report_owner_id, changed_columns)
  values (new.id, v_editor, old.user_id, v_changed);

  -- Close the loop with the engineer — but at most one unread notification
  -- per editor+cert per hour (autosave fires every 30s while the QS works).
  begin
    if not exists (
      select 1 from public.user_notifications un
      where un.user_id = old.user_id
        and un.type = 'qs_cert_edited'
        and un.is_read = false
        and un.metadata->>'report_uuid' = new.id::text
        and un.created_at > now() - interval '1 hour'
    ) then
      v_link := case
        when new.report_type in ('eicr','eic','minor-works')
          then '/electrician/inspection-testing?section=' || new.report_type
               || '&reportId=' || new.report_id
        when new.report_type in ('pat-testing','testing-only')
          then '/electrician/inspection-testing/' || new.report_type || '/' || new.report_id
        else '/electrician/inspection-testing?section=my-reports'
      end;
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (
        old.user_id,
        'qs_cert_edited',
        'Your certificate was updated',
        'Your ' || upper(coalesce(new.report_type, 'certificate')) || ' ' ||
          coalesce(new.certificate_number, new.report_id) ||
          ' was edited by your QS — now at a new version.',
        v_link,
        jsonb_build_object('report_uuid', new.id, 'editor_id', v_editor,
                           'changed_columns', to_jsonb(v_changed))
      );
    end if;
  exception when others then
    -- Never let a notification hiccup block the certificate save.
    null;
  end;

  return new;
end;
$$;

drop trigger if exists trg_report_edit_log on public.reports;
create trigger trg_report_edit_log
  after update on public.reports
  for each row execute function public.log_report_edit();
