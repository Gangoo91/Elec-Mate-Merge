-- ELE-1987 — Employer automations: simple "when this, do that" rules.
--
-- Eight ready-made rules a firm switches on one at a time. They hook into the
-- events that already exist (job assignment, job stage → Complete, QS sign-off,
-- timesheets, invoices) and act through the existing plumbing
-- (notify_employer_bell, worker_notify, the job feed, employer_audit_log,
-- send-payment-reminder, the booking-confirmation email templates).
--
-- Safety, in this order:
--   * Every rule is OFF until the firm turns it on. Nothing here turns one on.
--   * A rule that emails a customer or touches money can only be turned ON by
--     the owner or an admin (can_see_firm_money). Anyone in the office can turn
--     any rule OFF.
--   * Who turned each rule on, and when, is stored and shown.
--   * One switch pauses every rule for the firm.
--   * Every run is a row in employer_automation_runs, unique per
--     (firm, rule, ref), so nothing is ever done twice; every finished run is
--     also written to employer_audit_log and, when it is about a job, the job
--     feed.
--   * Customer emails are never sent inside the trigger. The run is queued and
--     the 10-minute tick hands it to employer-automation-send at least two
--     minutes later, re-checking the rule is still on first.
--   * Triggers never break the write that fired them.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.employer_automation_rules (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  rule_key text not null,
  enabled boolean not null default false,
  settings jsonb not null default '{}'::jsonb,
  enabled_at timestamptz,
  changed_by uuid,
  changed_by_name text,
  changed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint employer_automation_rules_unique unique (employer_id, rule_key),
  constraint employer_automation_rules_key_check check (rule_key in (
    'eicr_job_pack',
    'job_assigned_tell_customer',
    'job_complete_draft_invoice',
    'job_complete_review_request',
    'timesheet_friday_reminder',
    'timesheet_waiting_reminder',
    'invoice_unpaid_reminder',
    'cert_signed_next_inspection'
  ))
);
comment on table public.employer_automation_rules is
  '[EMPLOYER] Automation rules (ELE-1987): which ready-made rules a firm has switched on, and who switched them. Scope: one row per firm per rule. Used by: Employer Hub > Automations, automation triggers and the tick. Rule: written only by set_employer_automation; customer or money rules need can_see_firm_money to switch on.';

create table if not exists public.employer_automation_settings (
  employer_id uuid primary key,
  paused boolean not null default false,
  changed_by uuid,
  changed_by_name text,
  changed_at timestamptz not null default now()
);
comment on table public.employer_automation_settings is
  '[EMPLOYER] Automation settings (ELE-1987): the firm-wide pause switch. Scope: one row per firm. Used by: Employer Hub > Automations. Rule: written only by set_employer_automations_paused.';

create table if not exists public.employer_automation_runs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  rule_key text not null,
  ref text not null,
  job_id uuid,
  status text not null default 'queued'
    check (status in ('queued', 'sending', 'done', 'skipped', 'failed')),
  summary text not null default '',
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  constraint employer_automation_runs_once unique (employer_id, rule_key, ref)
);
comment on table public.employer_automation_runs is
  '[EMPLOYER] Automation runs (ELE-1987): one row per thing a rule did, skipped or failed. Scope: firm. Used by: Employer Hub > Automations run log, employer-automation-send. Rule: unique per firm/rule/ref so nothing runs twice; written only by the automation functions.';

create index if not exists employer_automation_runs_firm_idx
  on public.employer_automation_runs (employer_id, created_at desc);
create index if not exists employer_automation_runs_pending_idx
  on public.employer_automation_runs (status, created_at)
  where status in ('queued', 'sending');

alter table public.employer_automation_rules enable row level security;
alter table public.employer_automation_settings enable row level security;
alter table public.employer_automation_runs enable row level security;

drop policy if exists "Firm managers read automation rules" on public.employer_automation_rules;
create policy "Firm managers read automation rules" on public.employer_automation_rules
  for select to authenticated using (employer_id in (select public.my_employer_scope()));
drop policy if exists "Firm managers read automation settings" on public.employer_automation_settings;
create policy "Firm managers read automation settings" on public.employer_automation_settings
  for select to authenticated using (employer_id in (select public.my_employer_scope()));
drop policy if exists "Firm managers read automation runs" on public.employer_automation_runs;
create policy "Firm managers read automation runs" on public.employer_automation_runs
  for select to authenticated using (employer_id in (select public.my_employer_scope()));

-- Writes only through the functions below.
revoke all on public.employer_automation_rules, public.employer_automation_settings,
  public.employer_automation_runs from anon, authenticated;
grant select on public.employer_automation_rules, public.employer_automation_settings,
  public.employer_automation_runs to authenticated;

insert into public.notification_types (type, category, push, importance)
values ('automation', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- ── Helpers ─────────────────────────────────────────────────────────────────

-- Rules that email a customer or create/chase money.
create or replace function public._automation_is_sensitive(p_rule text)
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  select p_rule in ('job_assigned_tell_customer', 'job_complete_draft_invoice',
                    'job_complete_review_request', 'invoice_unpaid_reminder')
$$;

create or replace function public._automation_on(p_firm uuid, p_rule text)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select p_firm is not null
     and exists (select 1 from public.employer_automation_rules r
                  where r.employer_id = p_firm and r.rule_key = p_rule and r.enabled)
     and not exists (select 1 from public.employer_automation_settings s
                      where s.employer_id = p_firm and s.paused)
$$;

create or replace function public._automation_is_eicr(p_title text, p_description text)
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  select (coalesce(p_title, '') || ' ' || coalesce(p_description, ''))
         ~* '(\meicr\M|periodic inspection|condition report)'
$$;

-- Claim a run. Returns null when this firm/rule/ref has already run (dedupe).
create or replace function public._automation_claim(
  p_firm uuid, p_rule text, p_ref text, p_job uuid, p_summary text,
  p_status text default 'queued', p_detail jsonb default '{}'::jsonb)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_id uuid;
begin
  insert into public.employer_automation_runs (employer_id, rule_key, ref, job_id, status, summary, detail)
  values (p_firm, p_rule, p_ref, p_job, p_status, coalesce(p_summary, ''), coalesce(p_detail, '{}'::jsonb))
  on conflict (employer_id, rule_key, ref) do nothing
  returning id into v_id;
  return v_id;
end;
$$;

-- Finish a run: final status + summary, audit log, job feed (done runs only).
create or replace function public._automation_finish(
  p_run uuid, p_status text, p_summary text, p_detail jsonb default '{}'::jsonb)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare r public.employer_automation_runs;
begin
  update public.employer_automation_runs
     set status = p_status,
         summary = coalesce(nullif(btrim(p_summary), ''), summary),
         detail = detail || coalesce(p_detail, '{}'::jsonb),
         finished_at = case when p_status in ('done', 'skipped', 'failed') then now() else finished_at end
   where id = p_run
  returning * into r;
  if r.id is null or p_status not in ('done', 'skipped', 'failed') then return; end if;

  insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
  values (r.employer_id, null, 'automation', 'automation_run', r.id,
          jsonb_build_object('rule', r.rule_key, 'status', r.status, 'summary', r.summary, 'job_id', r.job_id));

  if r.job_id is not null and r.status = 'done' then
    insert into public.employer_job_comments (job_id, author_name, content, comment_type)
    values (r.job_id, 'Automation', r.summary,
            case when r.rule_key in ('job_assigned_tell_customer', 'job_complete_review_request',
                                     'invoice_unpaid_reminder')
                 then 'customer_contact' else 'status_change' end);
  end if;
end;
$$;

-- A rule's block failed and rolled back: record it as failed (never raises).
create or replace function public._automation_fail(
  p_firm uuid, p_rule text, p_ref text, p_job uuid, p_error text)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_run uuid;
begin
  v_run := public._automation_claim(p_firm, p_rule, p_ref, p_job, 'Something went wrong', 'queued');
  if v_run is null then
    select id into v_run from public.employer_automation_runs
     where employer_id = p_firm and rule_key = p_rule and ref = p_ref;
  end if;
  perform public._automation_finish(v_run, 'failed', 'Did not run: something went wrong. Nothing was sent.',
                                    jsonb_build_object('error', left(coalesce(p_error, ''), 300)));
exception when others then
  raise warning '[_automation_fail] % / %: %', p_firm, p_rule, sqlerrm;
end;
$$;

create or replace function public._automation_actor_name(p_firm uuid)
returns text
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(
    (select nullif(btrim(a.full_name), '') from public.employer_admins a
      where a.employer_id = p_firm and a.user_id = auth.uid() and a.status = 'active' limit 1),
    (select nullif(btrim(p.full_name), '') from public.profiles p where p.id = auth.uid()),
    'Someone in the office')
$$;

create or replace function public._automation_first_names(p_job uuid)
returns text[]
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(array_agg(x.first order by x.first), '{}') from (
    select distinct split_part(btrim(regexp_replace(coalesce(p.name, ''), '\(.*?\)', '', 'g')), ' ', 1) as first
      from public.employer_job_assignments a
      join public.employer_employees p on p.id = a.employee_id
     where a.job_id = p_job
       and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
       and lower(coalesce(p.status, '')) <> 'archived') x
   where x.first <> ''
$$;

-- ── Trigger: someone is put on a job ────────────────────────────────────────
-- eicr_job_pack: an EICR job with no pack yet gets a Draft job pack with the
--   crew on it; the office is told to check it and send it. It is NOT sent to
--   site automatically: a RAMS must be checked by a competent person first.
-- job_assigned_tell_customer: queue an email to the customer naming who is
--   coming (sent by the tick, so a whole crew booked together is one email).

create or replace function public.trg_automation_job_assigned()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  j public.employer_jobs;
  v_firm uuid;
  v_run uuid;
  v_pack uuid;
  v_sent timestamptz;
  v_workers uuid[];
  v_name text;
  e public.calendar_events;
  v_ref text;
begin
  select * into j from public.employer_jobs where id = new.job_id;
  v_firm := j.user_id;
  if j.id is null or coalesce(j.is_template, false) or j.archived_at is not null then return new; end if;
  if lower(coalesce(new.status, 'assigned')) in ('removed', 'cancelled', 'ended') then return new; end if;
  select name into v_name from public.employer_employees where id = new.employee_id;

  -- eicr_job_pack
  if public._automation_on(v_firm, 'eicr_job_pack') and public._automation_is_eicr(j.title, j.description) then
    begin
      select p.id, p.sent_to_workers_at, p.assigned_workers into v_pack, v_sent, v_workers
        from public.employer_job_packs p where p.job_id = j.id order by p.created_at limit 1;
      if v_pack is null then
        v_run := public._automation_claim(v_firm, 'eicr_job_pack', j.id::text, j.id, 'Drafting the job pack');
        if v_run is not null then
          insert into public.employer_job_packs (
            employer_id, job_id, title, client, location, scope, hazards, assigned_workers, status,
            rams_generated, method_statement_generated, briefing_pack_generated, start_date,
            briefing_content, required_certifications)
          values (
            v_firm, j.id, j.title, coalesce(j.client, ''), coalesce(j.location, ''),
            'Periodic inspection and testing (EICR) of the electrical installation.',
            array['Live testing', 'Occupied building'], array[new.employee_id], 'Draft',
            false, false, false, j.start_date,
            'Safe isolation before any dead testing: prove the tester, isolate, lock off, prove dead, re-prove the tester. '
              || 'Live tests (Zs, Ze, PFC, RCD) only with GS38 probes and the area kept clear. '
              || 'Agree with the occupier when the supply will be off and protect anything that must stay on. '
              || 'Record any C1 straight away: make it safe and tell the duty holder before you leave.',
            '{}')
          returning id into v_pack;
          perform public._automation_finish(v_run, 'done',
            'Drafted the EICR job pack with ' || coalesce(v_name, 'the crew')
              || ' on it. Check it, add the RAMS and send it to the crew.',
            jsonb_build_object('pack_id', v_pack));
          perform public.notify_employer_bell(v_firm, 'automation',
            'Job pack drafted: ' || coalesce(j.title, 'EICR job'),
            'Check it, add the RAMS and send it to the crew before the job starts.',
            jsonb_build_object('job_id', j.id, 'pack_id', v_pack, 'rule', 'eicr_job_pack',
                               'route', '/employer?section=jobpacks&job=' || j.id));
        end if;
      elsif v_sent is null and not (new.employee_id = any (coalesce(v_workers, '{}'))) then
        -- Not sent yet: keep the crew on the draft pack in step.
        update public.employer_job_packs
           set assigned_workers = array_append(coalesce(assigned_workers, '{}'), new.employee_id),
               updated_at = now()
         where id = v_pack;
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'eicr_job_pack', j.id::text, j.id, sqlerrm);
    end;
  end if;

  -- job_assigned_tell_customer
  if public._automation_on(v_firm, 'job_assigned_tell_customer') then
    begin
      select * into e from public.calendar_events
       where user_id = v_firm and mirrored_from_job = j.id and coalesce(sync_status, '') <> 'pending_delete'
       order by start_at limit 1;
      if e.id is not null and e.start_at > now() then
        v_ref := j.id::text || ':' || to_char(e.start_at at time zone 'Europe/London', 'YYYY-MM-DD');
        if nullif(btrim(coalesce(j.client_email, '')), '') is null then
          v_run := public._automation_claim(v_firm, 'job_assigned_tell_customer', v_ref, j.id, '');
          if v_run is not null then
            perform public._automation_finish(v_run, 'skipped',
              'Not sent: ' || coalesce(j.title, 'the job') || ' has no customer email. Add one on the job, or send it by text.');
          end if;
        elsif e.confirmation_sent_at is not null then
          v_run := public._automation_claim(v_firm, 'job_assigned_tell_customer', v_ref, j.id, '');
          if v_run is not null then
            perform public._automation_finish(v_run, 'skipped',
              'Not sent: the customer was already told about this booking on '
                || to_char(e.confirmation_sent_at at time zone 'Europe/London', 'FMDD Mon') || '.');
          end if;
        else
          perform public._automation_claim(v_firm, 'job_assigned_tell_customer', v_ref, j.id,
            'Emailing ' || coalesce(nullif(btrim(j.client), ''), 'the customer') || ' who is coming',
            'queued', jsonb_build_object('event_id', e.id));
        end if;
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'job_assigned_tell_customer',
        coalesce(v_ref, j.id::text), j.id, sqlerrm);
    end;
  end if;

  return new;
exception when others then
  raise warning '[trg_automation_job_assigned] %', sqlerrm;
  return new;
end;
$$;

drop trigger if exists zz_automation_job_assigned on public.employer_job_assignments;
create trigger zz_automation_job_assigned
  after insert on public.employer_job_assignments
  for each row execute function public.trg_automation_job_assigned();

-- ── Trigger: a job is marked Complete ───────────────────────────────────────
-- job_complete_draft_invoice: a DRAFT invoice (never sent) from the job's
--   accepted quote, or from the job value when there is no quote.
-- job_complete_review_request: queue a review request email.

create or replace function public.trg_automation_job_complete()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := new.user_id;
  v_run uuid;
  q public.quotes;
  cp record;
  v_inv uuid;
  v_num text;
  v_days int;
  v_due timestamptz;
  v_vat numeric;
  v_net numeric;
  v_vat_amt numeric;
  v_title text := coalesce(nullif(btrim(new.title), ''), 'the job');
begin
  if coalesce(new.is_template, false) then return new; end if;

  select company_name, payment_terms, default_vat_registered, review_request_enabled, review_links
    into cp from public.company_profiles where user_id = v_firm limit 1;

  -- job_complete_draft_invoice
  if public._automation_on(v_firm, 'job_complete_draft_invoice') then
    begin
      v_run := public._automation_claim(v_firm, 'job_complete_draft_invoice', new.id::text, new.id, 'Drafting the invoice');
      if v_run is not null then
        if exists (select 1 from public.quotes x where x.employer_job_id = new.id and x.invoice_raised and x.deleted_at is null) then
          perform public._automation_finish(v_run, 'skipped', 'No draft made: ' || v_title || ' already has an invoice.');
        else
          v_days := least(greatest(coalesce(substring(coalesce(cp.payment_terms, '') from '(\d+)')::int, 30), 0), 120);
          v_due := now() + make_interval(days => v_days);
          select * into q from public.quotes x
           where x.employer_job_id = new.id and not coalesce(x.invoice_raised, false) and x.deleted_at is null
             and coalesce(x.is_active_version, true)
             and (x.acceptance_status = 'accepted' or x.accepted_at is not null)
           order by x.accepted_at desc nulls last, x.created_at desc limit 1;

          if q.id is not null then
            insert into public.quotes (
              user_id, quote_number, client_data, items, settings, subtotal, overhead, profit, vat_amount, total,
              status, expiry_date, invoice_raised, invoice_status, invoice_date, invoice_due_date, invoice_notes,
              job_details, employer_job_id, customer_id)
            values (
              v_firm, null, q.client_data, q.items, q.settings, q.subtotal, q.overhead, q.profit, q.vat_amount, q.total,
              'approved', v_due, true, 'draft', now(), v_due,
              'Drafted automatically when the job was marked Complete, from quote ' || coalesce(q.quote_number, '') || '. Check it before you send it.',
              coalesce(q.job_details, '{}'::jsonb) || jsonb_build_object('title', new.title), new.id, q.customer_id)
            returning id, invoice_number into v_inv, v_num;
          elsif coalesce(new.value, 0) > 0 then
            v_vat := case when coalesce(cp.default_vat_registered, false) then 20 else 0 end;
            v_net := round(new.value, 2);
            v_vat_amt := round(v_net * v_vat / 100, 2);
            insert into public.quotes (
              user_id, quote_number, client_data, items, settings, subtotal, vat_amount, total,
              status, expiry_date, invoice_raised, invoice_status, invoice_date, invoice_due_date, invoice_notes,
              job_details, employer_job_id, customer_id)
            values (
              v_firm, null,
              jsonb_strip_nulls(jsonb_build_object('name', coalesce(new.client, ''),
                'email', nullif(btrim(coalesce(new.client_email, '')), ''),
                'phone', nullif(btrim(coalesce(new.client_phone, '')), ''),
                'customerId', coalesce(new.customer_id, new.client_id))),
              jsonb_build_array(jsonb_build_object(
                'id', gen_random_uuid(), 'description', new.title, 'quantity', 1, 'unit', 'each',
                'unitPrice', v_net, 'total', v_net, 'totalPrice', v_net, 'type', 'labour', 'category', 'labour')),
              jsonb_build_object('vatRate', v_vat, 'vatRegistered', v_vat > 0, 'reverseCharge', false, 'cisEnabled', false),
              v_net, v_vat_amt, v_net + v_vat_amt,
              'approved', v_due, true, 'draft', now(), v_due,
              'Drafted automatically when the job was marked Complete, from the job value. Check the lines and VAT before you send it.',
              jsonb_build_object('title', new.title), new.id, coalesce(new.customer_id, new.client_id))
            returning id, invoice_number into v_inv, v_num;
          end if;

          if v_inv is null then
            perform public._automation_finish(v_run, 'skipped',
              'No draft made for ' || v_title || ': it has no accepted quote and no job value to invoice from.');
          else
            perform public._automation_finish(v_run, 'done',
              'Drafted invoice ' || coalesce(v_num, '') || ' for ' || v_title
                || case when q.id is not null then ' from the accepted quote' else ' from the job value' end
                || '. It has not been sent.',
              jsonb_build_object('invoice_id', v_inv, 'invoice_number', v_num));
            perform public.notify_employer_bell(v_firm, 'automation',
              'Invoice drafted: ' || v_title,
              'Draft ' || coalesce(v_num, '') || ' is ready. Check it and send it from Quotes & invoices.',
              jsonb_build_object('job_id', new.id, 'invoice_id', v_inv, 'rule', 'job_complete_draft_invoice',
                                 'route', '/employer?section=quotes'));
          end if;
        end if;
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'job_complete_draft_invoice', new.id::text, new.id, sqlerrm);
    end;
  end if;

  -- job_complete_review_request
  if public._automation_on(v_firm, 'job_complete_review_request') then
    begin
      if nullif(btrim(coalesce(new.client_email, '')), '') is null then
        v_run := public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id, '');
        if v_run is not null then
          perform public._automation_finish(v_run, 'skipped',
            'No review request for ' || v_title || ': the job has no customer email.');
        end if;
      elsif not exists (
        select 1 from jsonb_array_elements(case when jsonb_typeof(to_jsonb(cp.review_links)) = 'array'
                                                 then to_jsonb(cp.review_links) else '[]'::jsonb end) l
         where coalesce(l->>'url', '') ~* '^https?://') then
        v_run := public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id, '');
        if v_run is not null then
          perform public._automation_finish(v_run, 'skipped',
            'No review request for ' || v_title || ': add your review link in Settings first.');
        end if;
      else
        perform public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id,
          'Asking ' || coalesce(nullif(btrim(new.client), ''), 'the customer') || ' for a review');
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'job_complete_review_request', new.id::text, new.id, sqlerrm);
    end;
  end if;

  return new;
exception when others then
  raise warning '[trg_automation_job_complete] %', sqlerrm;
  return new;
end;
$$;

drop trigger if exists zz_automation_job_complete on public.employer_jobs;
create trigger zz_automation_job_complete
  after update of status, board_stage on public.employer_jobs
  for each row
  when (lower(coalesce(new.status, '')) = 'completed' and lower(coalesce(old.status, '')) <> 'completed')
  execute function public.trg_automation_job_complete();

-- ── Trigger: a certificate is signed off in QS review ───────────────────────
-- cert_signed_next_inspection: offer to book the next inspection. Runs after
-- cert_signed_off_on_job (trigger names fire in order) so the job link exists.

create or replace function public.trg_automation_cert_signed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := new.employer_id;
  v_run uuid;
  v_job uuid;
  r record;
  v_label text;
begin
  if new.report_uuid is null or not public._automation_on(v_firm, 'cert_signed_next_inspection') then
    return new;
  end if;
  begin
    select l.job_id into v_job from public.employer_job_certificates l
     where l.report_uuid = new.report_uuid and l.employer_id = v_firm limit 1;
    v_run := public._automation_claim(v_firm, 'cert_signed_next_inspection', new.report_uuid::text, v_job, '');
    if v_run is null then return new; end if;

    select upper(split_part(coalesce(rp.report_type, 'certificate'), '-', 1)) as kind,
           coalesce(rp.certificate_number, rp.report_id) as num,
           nullif(btrim(rp.client_name), '') as client, rp.next_inspection_due as due
      into r from public.reports rp where rp.id = new.report_uuid;
    v_label := coalesce(r.kind, 'Certificate') || coalesce(' ' || r.num, '');

    if r.due is null then
      perform public._automation_finish(v_run, 'skipped',
        v_label || ' has no next inspection date, so there is nothing to book.');
    elsif v_job is not null and exists (
      select 1 from public.maintenance_contracts m
       where m.user_id = v_firm and m.source_job_id = v_job and m.status = 'active') then
      perform public._automation_finish(v_run, 'skipped',
        v_label || ': this job already repeats, so the next visit is booked for you.');
    else
      perform public._automation_finish(v_run, 'done',
        v_label || ' signed off. Next inspection due ' || to_char(r.due, 'FMDD Mon YYYY')
          || '. Offered to book it under Recurring work, Renewals.',
        jsonb_build_object('report_uuid', new.report_uuid, 'due', r.due));
      perform public.notify_employer_bell(v_firm, 'automation',
        'Book the next inspection: ' || coalesce(r.client, v_label),
        v_label || ' is due again ' || to_char(r.due, 'FMDD Mon YYYY') || '. Book it as a job now, or make it repeat.',
        jsonb_build_object('job_id', v_job, 'report_uuid', new.report_uuid, 'rule', 'cert_signed_next_inspection',
                           'route', '/employer?section=recurring&tab=renewals&ahead=12'));
    end if;
  exception when others then
    perform public._automation_fail(v_firm, 'cert_signed_next_inspection', new.report_uuid::text, v_job, sqlerrm);
  end;
  return new;
exception when others then
  raise warning '[trg_automation_cert_signed] %', sqlerrm;
  return new;
end;
$$;

drop trigger if exists zz_automation_cert_signed on public.report_qs_reviews;
create trigger zz_automation_cert_signed
  after update of status on public.report_qs_reviews
  for each row
  when (new.status = 'approved' and old.status is distinct from 'approved')
  execute function public.trg_automation_cert_signed();

-- ── The tick (pg_cron, every 10 minutes) ────────────────────────────────────

create or replace function public.run_employer_automations()
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_local timestamp := now() at time zone 'Europe/London';
  v_dow int := extract(isodow from v_local);
  v_hour int := extract(hour from v_local);
  v_week_start date := date_trunc('week', v_local)::date;
  v_week_end date := date_trunc('week', v_local)::date + 4;
  f record;
  e record;
  q record;
  rq record;
  v_run uuid;
  v_n int;
  v_oldest date;
  v_key text;
  v_counts jsonb := '{}'::jsonb;
  v_made int;
begin
  -- 1. Friday 4pm: remind anyone on a job this week with no hours logged.
  if v_dow = 5 and v_hour >= 16 then
    v_made := 0;
    for f in select r.employer_id from public.employer_automation_rules r
              where r.rule_key = 'timesheet_friday_reminder' and r.enabled
                and public._automation_on(r.employer_id, r.rule_key) loop
      for e in
        select em.id, em.name, em.user_id from public.employer_employees em
         where em.employer_id = f.employer_id and em.user_id is not null
           and lower(coalesce(em.status, '')) = 'active'
           and exists (
             select 1 from public.employer_job_assignments a
               join public.employer_jobs j on j.id = a.job_id
              where a.employee_id = em.id
                and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                and j.archived_at is null and coalesce(j.status, '') <> 'Cancelled'
                and coalesce(a.start_date, j.start_date) <= v_week_end
                and coalesce(a.end_date, j.end_date, a.start_date, j.start_date) >= v_week_start)
           and not exists (
             select 1 from public.employer_timesheets t
              where t.employee_id = em.id and t.date between v_week_start and v_week_end
                and t.total_hours is not null)
      loop
        begin
          v_run := public._automation_claim(f.employer_id, 'timesheet_friday_reminder',
                     e.id::text || ':' || v_week_start, null, '');
          if v_run is not null then
            perform public.worker_notify(e.user_id, 'timesheet_reminder', 'Log this week''s hours',
              'You haven''t logged any hours this week. Add them before you finish so your pay is right.',
              jsonb_build_object('employee_id', e.id, 'route', '/electrician/worker-tools/timesheets'));
            perform public._automation_finish(v_run, 'done',
              'Reminded ' || coalesce(e.name, 'a team member') || ' to log this week''s hours.');
            v_made := v_made + 1;
          end if;
        exception when others then
          perform public._automation_fail(f.employer_id, 'timesheet_friday_reminder',
            e.id::text || ':' || v_week_start, null, sqlerrm);
        end;
      end loop;
    end loop;
    v_counts := v_counts || jsonb_build_object('timesheet_friday_reminder', v_made);
  end if;

  -- Office-hours rules: weekdays 9am to 5pm UK time.
  if v_dow between 1 and 5 and v_hour between 9 and 16 then
    -- 2. Timesheets waiting over 2 days: one nudge a day to the office.
    v_made := 0;
    for f in select r.employer_id from public.employer_automation_rules r
              where r.rule_key = 'timesheet_waiting_reminder' and r.enabled
                and public._automation_on(r.employer_id, r.rule_key) loop
      begin
        select count(*), min(t.date) into v_n, v_oldest
          from public.employer_timesheets t
          join public.employer_employees em on em.id = t.employee_id
         where em.employer_id = f.employer_id
           and lower(coalesce(t.status, '')) in ('pending', 'submitted')
           and t.total_hours is not null
           and coalesce(t.resubmitted_at, t.clock_out, t.created_at) < now() - interval '2 days';
        if v_n > 0 then
          v_run := public._automation_claim(f.employer_id, 'timesheet_waiting_reminder',
                     'day:' || v_local::date, null, '');
          if v_run is not null then
            perform public.notify_employer_bell(f.employer_id, 'automation',
              v_n || ' timesheet' || case when v_n = 1 then '' else 's' end || ' waiting over 2 days',
              'The oldest is from ' || to_char(v_oldest, 'FMDD Mon') || '. Approve them so pay runs on time.',
              jsonb_build_object('rule', 'timesheet_waiting_reminder',
                                 'route', '/employer?section=timesheets&tab=pending'));
            perform public._automation_finish(v_run, 'done',
              'Reminded the office: ' || v_n || ' timesheet' || case when v_n = 1 then '' else 's' end
                || ' waiting over 2 days.');
            v_made := v_made + 1;
          end if;
        end if;
      exception when others then
        perform public._automation_fail(f.employer_id, 'timesheet_waiting_reminder',
          'day:' || v_local::date, null, sqlerrm);
      end;
    end loop;
    v_counts := v_counts || jsonb_build_object('timesheet_waiting_reminder', v_made);

    -- 3. Invoices unpaid 14 days after sending: queue a polite reminder.
    --    Only invoices that reach 14 days AFTER the rule was turned on, so
    --    switching it on never chases a backlog of old invoices at once.
    v_made := 0;
    for rq in select r.employer_id, r.enabled_at from public.employer_automation_rules r
               where r.rule_key = 'invoice_unpaid_reminder' and r.enabled and r.enabled_at is not null
                 and public._automation_on(r.employer_id, r.rule_key) loop
      for q in
        select x.id, x.invoice_number, x.employer_job_id, nullif(btrim(x.client_data->>'name'), '') as client
          from public.quotes x
         where x.user_id = rq.employer_id and x.invoice_raised and x.deleted_at is null
           and lower(coalesce(x.invoice_status, '')) in ('sent', 'overdue')
           and x.invoice_sent_at is not null
           and x.invoice_sent_at <= now() - interval '14 days'
           and x.invoice_sent_at + interval '14 days' >= rq.enabled_at
           and (x.invoice_due_date is null or x.invoice_due_date < now())
           and coalesce(x.last_reminder_sent_at, '-infinity'::timestamptz) < now() - interval '7 days'
           and nullif(btrim(coalesce(x.client_data->>'email', '')), '') is not null
         order by x.invoice_sent_at
         limit 20
      loop
        if public._automation_claim(rq.employer_id, 'invoice_unpaid_reminder', q.id::text, q.employer_job_id,
             'Reminding ' || coalesce(q.client, 'the customer') || ' about invoice ' || coalesce(q.invoice_number, ''),
             'queued', jsonb_build_object('invoice_id', q.id)) is not null then
          v_made := v_made + 1;
        end if;
      end loop;
    end loop;
    v_counts := v_counts || jsonb_build_object('invoice_unpaid_reminder', v_made);
  end if;

  -- 4. Hand queued customer emails to the sender (after a 2 minute settle).
  v_made := 0;
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  for q in
    select r.id, r.employer_id, r.rule_key from public.employer_automation_runs r
     where r.status = 'queued' and r.created_at < now() - interval '2 minutes'
     order by r.created_at limit 25
     for update skip locked
  loop
    if not public._automation_on(q.employer_id, q.rule_key) then
      perform public._automation_finish(q.id, 'skipped',
        'Not sent: the rule was turned off or paused before it ran.');
    elsif v_key is null then
      raise warning '[run_employer_automations] service_role_key not in vault';
      exit;
    else
      update public.employer_automation_runs set status = 'sending' where id = q.id;
      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-automation-send',
        headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
        body := jsonb_build_object('run_id', q.id));
      v_made := v_made + 1;
    end if;
  end loop;
  v_counts := v_counts || jsonb_build_object('dispatched', v_made);

  -- 5. Anything the sender never answered for an hour: failed, not retried.
  for q in select r.id from public.employer_automation_runs r
            where r.status = 'sending' and r.created_at < now() - interval '1 hour' loop
    perform public._automation_finish(q.id, 'failed', 'Not confirmed as sent. Check with the customer before sending it again.');
  end loop;

  return v_counts;
end;
$$;

-- ── Called by employer-automation-send (service role only) ──────────────────

create or replace function public.automation_finish_run(
  p_run uuid, p_status text, p_summary text, p_detail jsonb default '{}'::jsonb)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if p_status not in ('done', 'skipped', 'failed') then
    raise exception 'Unknown status';
  end if;
  if not exists (select 1 from public.employer_automation_runs where id = p_run and status = 'sending') then
    return;
  end if;
  perform public._automation_finish(p_run, p_status, p_summary, p_detail);
end;
$$;

-- What the sender needs about a job (firm-agnostic, so service role only).
create or replace function public.automation_job_message(p_job uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'job_id', j.id, 'firm_id', j.user_id, 'title', j.title, 'client', j.client,
    'client_email', nullif(btrim(coalesce(j.client_email, '')), ''),
    'location', j.location, 'status', j.status,
    'business_name', coalesce(nullif(btrim(cp.company_name), ''), pr.full_name),
    'crew', to_jsonb(public._automation_first_names(j.id)),
    'event', (select jsonb_build_object('id', e.id, 'start_at', e.start_at, 'end_at', e.end_at,
                                        'all_day', e.all_day, 'confirmation_sent_at', e.confirmation_sent_at)
                from public.calendar_events e
               where e.user_id = j.user_id and e.mirrored_from_job = j.id
                 and coalesce(e.sync_status, '') <> 'pending_delete'
               order by e.start_at limit 1),
    'review', jsonb_build_object('links', coalesce(to_jsonb(cp.review_links), '[]'::jsonb),
                                 'message', cp.review_request_message))
    from public.employer_jobs j
    left join public.company_profiles cp on cp.user_id = j.user_id
    left join public.profiles pr on pr.id = j.user_id
   where j.id = p_job
$$;

-- ── Called by the Automations screen ────────────────────────────────────────

create or replace function public.get_employer_automations()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_money boolean;
  v_local timestamp := now() at time zone 'Europe/London';
  v_week_start date := date_trunc('week', now() at time zone 'Europe/London')::date;
  v_rule_on timestamptz;
  v_preview jsonb := '{}'::jsonb;
  n1 int; n2 int;
  v_links boolean;
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  v_money := public.can_see_firm_money(v_firm);

  -- Previews: what each rule would act on right now.
  select count(*) into n1 from public.employer_jobs j
   where j.user_id = v_firm and j.archived_at is null and not coalesce(j.is_template, false)
     and lower(coalesce(j.status, '')) not in ('completed', 'cancelled')
     and public._automation_is_eicr(j.title, j.description)
     and not exists (select 1 from public.employer_job_packs p where p.job_id = j.id);
  v_preview := v_preview || jsonb_build_object('eicr_job_pack', jsonb_build_object('count', n1,
    'line', case when n1 = 0 then 'No open EICR jobs without a pack right now.'
                 else n1 || ' open EICR job' || case when n1 = 1 then '' else 's' end || ' with no pack yet. The next person put on one gets a draft pack.' end));

  select count(*), count(*) filter (where nullif(btrim(coalesce(j.client_email, '')), '') is not null)
    into n1, n2
    from public.employer_jobs j
    join public.calendar_events e on e.user_id = j.user_id and e.mirrored_from_job = j.id
   where j.user_id = v_firm and j.archived_at is null and e.start_at > now()
     and e.confirmation_sent_at is null;
  v_preview := v_preview || jsonb_build_object('job_assigned_tell_customer', jsonb_build_object('count', n2,
    'line', case when n1 = 0 then 'No upcoming booked jobs waiting to be confirmed.'
                 else n2 || ' of ' || n1 || ' upcoming booked job' || case when n1 = 1 then '' else 's' end
                      || ' not yet confirmed ' || case when n1 = 1 then 'has' else 'have' end || ' a customer email.' end));

  if v_money then
    select count(*) into n1 from public.employer_jobs j
     where j.user_id = v_firm and lower(coalesce(j.status, '')) = 'completed'
       and j.completed_at > now() - interval '30 days'
       and not exists (select 1 from public.quotes x where x.employer_job_id = j.id and x.invoice_raised and x.deleted_at is null);
    v_preview := v_preview || jsonb_build_object('job_complete_draft_invoice', jsonb_build_object('count', n1,
      'line', case when n1 = 0 then 'Every job completed in the last 30 days has an invoice.'
                   else n1 || ' job' || case when n1 = 1 then '' else 's' end || ' completed in the last 30 days with no invoice yet. Only jobs completed after you turn this on get a draft.' end));
  else
    v_preview := v_preview || jsonb_build_object('job_complete_draft_invoice', jsonb_build_object('count', null,
      'line', 'Only the owner or an admin can see invoice figures.'));
  end if;

  select exists (select 1 from public.company_profiles cp,
                   jsonb_array_elements(case when jsonb_typeof(to_jsonb(cp.review_links)) = 'array'
                                             then to_jsonb(cp.review_links) else '[]'::jsonb end) l
                  where cp.user_id = v_firm and coalesce(l->>'url', '') ~* '^https?://')
    into v_links;
  v_preview := v_preview || jsonb_build_object('job_complete_review_request', jsonb_build_object('count', null,
    'ready', v_links,
    'line', case when v_links then 'Your review link is set. Customers with an email on the job get one short, branded email.'
                 else 'Add your Google or Checkatrade review link in Settings first, or nothing is sent.' end));

  select count(distinct em.id) into n1 from public.employer_employees em
   where em.employer_id = v_firm and em.user_id is not null and lower(coalesce(em.status, '')) = 'active'
     and exists (select 1 from public.employer_job_assignments a join public.employer_jobs j on j.id = a.job_id
                  where a.employee_id = em.id
                    and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                    and j.archived_at is null
                    and coalesce(a.start_date, j.start_date) <= v_week_start + 4
                    and coalesce(a.end_date, j.end_date, a.start_date, j.start_date) >= v_week_start)
     and not exists (select 1 from public.employer_timesheets t
                      where t.employee_id = em.id and t.date between v_week_start and v_week_start + 4
                        and t.total_hours is not null);
  v_preview := v_preview || jsonb_build_object('timesheet_friday_reminder', jsonb_build_object('count', n1,
    'line', case when n1 = 0 then 'Everyone on a job this week has logged hours so far.'
                 else n1 || (case when n1 = 1 then ' person' else ' people' end) || ' on a job this week ' || case when n1 = 1 then 'has' else 'have' end || ' logged no hours yet.' end));

  select count(*) into n1 from public.employer_timesheets t
    join public.employer_employees em on em.id = t.employee_id
   where em.employer_id = v_firm and lower(coalesce(t.status, '')) in ('pending', 'submitted')
     and t.total_hours is not null
     and coalesce(t.resubmitted_at, t.clock_out, t.created_at) < now() - interval '2 days';
  v_preview := v_preview || jsonb_build_object('timesheet_waiting_reminder', jsonb_build_object('count', n1,
    'line', case when n1 = 0 then 'No timesheets waiting over 2 days right now.'
                 else n1 || ' timesheet' || case when n1 = 1 then '' else 's' end || ' waiting over 2 days right now.' end));

  if v_money then
    select r.enabled_at into v_rule_on from public.employer_automation_rules r
     where r.employer_id = v_firm and r.rule_key = 'invoice_unpaid_reminder' and r.enabled;
    select count(*) into n1 from public.quotes x
     where x.user_id = v_firm and x.invoice_raised and x.deleted_at is null
       and lower(coalesce(x.invoice_status, '')) in ('sent', 'overdue')
       and x.invoice_sent_at <= now() - interval '14 days';
    v_preview := v_preview || jsonb_build_object('invoice_unpaid_reminder', jsonb_build_object('count', n1,
      'line', case when n1 = 0 then 'No invoices unpaid 14 days after sending right now.'
                   else n1 || ' invoice' || case when n1 = 1 then ' is' else 's are' end
                        || ' already past 14 days. ' || case when n1 = 1 then 'It is' else 'They are' end
                        || ' not chased: only invoices that reach 14 days after you turn this on.' end));
  else
    v_preview := v_preview || jsonb_build_object('invoice_unpaid_reminder', jsonb_build_object('count', null,
      'line', 'Only the owner or an admin can see invoice figures.'));
  end if;

  select count(distinct rp.id) into n1 from public.report_qs_reviews v
    join public.reports rp on rp.id = v.report_uuid
   where v.employer_id = v_firm and v.status = 'approved'
     and rp.next_inspection_due between current_date and current_date + 120;
  v_preview := v_preview || jsonb_build_object('cert_signed_next_inspection', jsonb_build_object('count', n1,
    'line', case when n1 = 0 then 'No signed-off certificates due for re-test in the next four months.'
                 else n1 || ' signed-off certificate' || case when n1 = 1 then ' is' else 's are' end || ' due for re-test in the next four months.' end));

  return jsonb_build_object(
    'firm_id', v_firm,
    'can_manage_sensitive', v_money,
    'paused', coalesce((select s.paused from public.employer_automation_settings s where s.employer_id = v_firm), false),
    'paused_by', (select s.changed_by_name from public.employer_automation_settings s where s.employer_id = v_firm and s.paused),
    'paused_at', (select s.changed_at from public.employer_automation_settings s where s.employer_id = v_firm and s.paused),
    'rules', coalesce((select jsonb_agg(jsonb_build_object(
                 'key', r.rule_key, 'enabled', r.enabled, 'enabled_at', r.enabled_at,
                 'changed_by', r.changed_by_name, 'changed_at', r.changed_at))
               from public.employer_automation_rules r where r.employer_id = v_firm), '[]'::jsonb),
    'stats', coalesce((select jsonb_object_agg(x.rule_key, jsonb_build_object('runs_30d', x.n, 'last_run_at', x.last_at))
               from (select rr.rule_key, count(*) filter (where rr.status = 'done') as n, max(rr.created_at) as last_at
                       from public.employer_automation_runs rr
                      where rr.employer_id = v_firm and rr.created_at > now() - interval '30 days'
                      group by rr.rule_key) x), '{}'::jsonb),
    'runs', coalesce((select jsonb_agg(jsonb_build_object(
                 'id', rr.id, 'rule', rr.rule_key, 'status', rr.status, 'summary', rr.summary,
                 'job_id', rr.job_id, 'created_at', rr.created_at, 'finished_at', rr.finished_at)
                 order by rr.created_at desc)
               from (select * from public.employer_automation_runs x
                      where x.employer_id = v_firm order by x.created_at desc limit 60) rr), '[]'::jsonb),
    'preview', v_preview);
end;
$$;

create or replace function public.set_employer_automation(p_rule text, p_enabled boolean)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_name text;
  v_was boolean;
  v_id uuid;
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  if p_rule not in ('eicr_job_pack', 'job_assigned_tell_customer', 'job_complete_draft_invoice',
                    'job_complete_review_request', 'timesheet_friday_reminder', 'timesheet_waiting_reminder',
                    'invoice_unpaid_reminder', 'cert_signed_next_inspection') then
    raise exception 'Unknown rule';
  end if;
  -- Anyone in the office can switch a rule OFF. Only the owner or an admin
  -- can switch ON one that emails customers or touches money.
  if coalesce(p_enabled, false) and public._automation_is_sensitive(p_rule)
     and not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can turn this rule on';
  end if;
  v_name := public._automation_actor_name(v_firm);
  select enabled into v_was from public.employer_automation_rules where employer_id = v_firm and rule_key = p_rule;

  insert into public.employer_automation_rules (employer_id, rule_key, enabled, enabled_at, changed_by, changed_by_name, changed_at)
  values (v_firm, p_rule, coalesce(p_enabled, false), case when p_enabled then now() end, auth.uid(), v_name, now())
  on conflict (employer_id, rule_key) do update
     set enabled = excluded.enabled,
         enabled_at = case when excluded.enabled and not public.employer_automation_rules.enabled then now()
                           when excluded.enabled then public.employer_automation_rules.enabled_at
                           else null end,
         changed_by = excluded.changed_by, changed_by_name = excluded.changed_by_name, changed_at = now()
  returning id into v_id;

  if coalesce(v_was, false) is distinct from coalesce(p_enabled, false) then
    insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
    values (v_firm, auth.uid(), case when p_enabled then 'automation_on' else 'automation_off' end,
            'automation_rule', v_id, jsonb_build_object('rule', p_rule, 'by', v_name));
  end if;
  return jsonb_build_object('rule', p_rule, 'enabled', coalesce(p_enabled, false));
end;
$$;

create or replace function public.set_employer_automations_paused(p_paused boolean)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_name text;
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  v_name := public._automation_actor_name(v_firm);
  insert into public.employer_automation_settings (employer_id, paused, changed_by, changed_by_name, changed_at)
  values (v_firm, coalesce(p_paused, false), auth.uid(), v_name, now())
  on conflict (employer_id) do update
     set paused = excluded.paused, changed_by = excluded.changed_by,
         changed_by_name = excluded.changed_by_name, changed_at = now();
  insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
  values (v_firm, auth.uid(), case when p_paused then 'automations_paused' else 'automations_resumed' end,
          'automation_rule', null, jsonb_build_object('by', v_name));
  return jsonb_build_object('paused', coalesce(p_paused, false));
end;
$$;

-- ── Grants ──────────────────────────────────────────────────────────────────

revoke all on function public._automation_is_sensitive(text) from public, anon;
revoke all on function public._automation_on(uuid, text) from public, anon, authenticated;
revoke all on function public._automation_is_eicr(text, text) from public, anon;
revoke all on function public._automation_claim(uuid, text, text, uuid, text, text, jsonb) from public, anon, authenticated;
revoke all on function public._automation_finish(uuid, text, text, jsonb) from public, anon, authenticated;
revoke all on function public._automation_fail(uuid, text, text, uuid, text) from public, anon, authenticated;
revoke all on function public._automation_actor_name(uuid) from public, anon, authenticated;
revoke all on function public._automation_first_names(uuid) from public, anon, authenticated;
revoke all on function public.trg_automation_job_assigned() from public, anon, authenticated;
revoke all on function public.trg_automation_job_complete() from public, anon, authenticated;
revoke all on function public.trg_automation_cert_signed() from public, anon, authenticated;
revoke all on function public.run_employer_automations() from public, anon, authenticated;
revoke all on function public.automation_finish_run(uuid, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.automation_job_message(uuid) from public, anon, authenticated;
grant execute on function public.automation_finish_run(uuid, text, text, jsonb) to service_role;
grant execute on function public.automation_job_message(uuid) to service_role;
grant execute on function public.run_employer_automations() to service_role;

revoke all on function public.get_employer_automations() from public, anon;
revoke all on function public.set_employer_automation(text, boolean) from public, anon;
revoke all on function public.set_employer_automations_paused(boolean) from public, anon;
grant execute on function public.get_employer_automations() to authenticated;
grant execute on function public.set_employer_automation(text, boolean) to authenticated;
grant execute on function public.set_employer_automations_paused(boolean) to authenticated;

-- ── Schedule ────────────────────────────────────────────────────────────────

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'employer-automations-tick';
  perform cron.schedule('employer-automations-tick', '*/10 * * * *', 'select public.run_employer_automations();');
end $$;
