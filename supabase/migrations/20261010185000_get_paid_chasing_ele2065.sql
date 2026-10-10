-- ELE-2065 Get paid: a chasing schedule per firm, the "Who owes me" data,
-- promise-to-pay notes, per-invoice / per-customer pause, retention release
-- reminders, and (ELE-2073) the firm's own quote follow-up schedule.
--
-- Additive only. New tables (RLS on), new functions, one new cron job.
-- The one change to existing code is a single predicate added to
-- run_employer_automations so the old "unpaid after 14 days" rule (ELE-1987)
-- never runs for a firm whose chasing schedule is on: the schedule supersedes it.
--
-- Sending: the tick claims a run in employer_automation_runs (unique per
-- firm/rule/ref, so a step can never send twice) and posts { run_id } to the
-- firm-chase-send edge function, which re-checks and calls the existing
-- send-payment-reminder (invoices) or sends the quote follow-up. SMS steps are
-- a hand-off: the office gets a bell asking them to text the customer.
--
-- Money is owner/admin only: every read and write goes through
-- can_see_firm_money(my_default_employer_id()).

-- ── Tables ────────────────────────────────────────────────────────────────

create table if not exists public.firm_chase_settings (
  employer_id uuid primary key,
  invoice_enabled boolean not null default false,
  invoice_enabled_at timestamptz,
  invoice_steps jsonb not null default '[
    {"offset": -3, "channel": "email", "tone": "gentle"},
    {"offset": 0,  "channel": "email", "tone": "gentle"},
    {"offset": 7,  "channel": "email", "tone": "firm"},
    {"offset": 14, "channel": "sms",   "tone": "firm"},
    {"offset": 30, "channel": "email", "tone": "final"}
  ]'::jsonb,
  quote_enabled boolean not null default false,
  quote_enabled_at timestamptz,
  quote_steps jsonb not null default '[{"day": 3}, {"day": 7}, {"day": 14}]'::jsonb,
  changed_by uuid,
  changed_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.firm_chase_settings enable row level security;
drop policy if exists "Firm money managers read chase settings" on public.firm_chase_settings;
create policy "Firm money managers read chase settings" on public.firm_chase_settings
  for select to authenticated using (public.can_see_firm_money(employer_id));

create table if not exists public.invoice_chase_state (
  invoice_id uuid primary key references public.quotes(id) on delete cascade,
  employer_id uuid not null,
  paused boolean not null default false,
  disputed boolean not null default false,
  dispute_note text,
  debtor_type text check (debtor_type in ('business', 'consumer')),
  promise_date date,
  interest_offered_at timestamptz,
  updated_by uuid,
  updated_by_name text,
  updated_at timestamptz not null default now()
);
create index if not exists invoice_chase_state_employer_idx on public.invoice_chase_state (employer_id);
alter table public.invoice_chase_state enable row level security;
drop policy if exists "Firm money managers read invoice chase state" on public.invoice_chase_state;
create policy "Firm money managers read invoice chase state" on public.invoice_chase_state
  for select to authenticated using (public.can_see_firm_money(employer_id));

create table if not exists public.invoice_chase_notes (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.quotes(id) on delete cascade,
  employer_id uuid not null,
  kind text not null check (kind in ('note', 'promise', 'dispute', 'resolved', 'chase', 'interest')),
  promise_date date,
  body text,
  created_by uuid,
  created_by_name text,
  created_at timestamptz not null default now()
);
create index if not exists invoice_chase_notes_invoice_idx on public.invoice_chase_notes (invoice_id, created_at desc);
alter table public.invoice_chase_notes enable row level security;
drop policy if exists "Firm money managers read invoice chase notes" on public.invoice_chase_notes;
create policy "Firm money managers read invoice chase notes" on public.invoice_chase_notes
  for select to authenticated using (public.can_see_firm_money(employer_id));

create table if not exists public.firm_chase_customer_pauses (
  employer_id uuid not null,
  customer_key text not null,
  label text,
  created_by uuid,
  created_by_name text,
  created_at timestamptz not null default now(),
  primary key (employer_id, customer_key)
);
alter table public.firm_chase_customer_pauses enable row level security;
drop policy if exists "Firm money managers read customer chase pauses" on public.firm_chase_customer_pauses;
create policy "Firm money managers read customer chase pauses" on public.firm_chase_customer_pauses
  for select to authenticated using (public.can_see_firm_money(employer_id));

-- Quotes whose built-in Electrical Hub follow-up (quote-automated-followup,
-- quotes.auto_followup_enabled) the firm's own schedule took over, so turning
-- the schedule off restores exactly those and nothing a user switched off.
create table if not exists public.firm_quote_followup_takeovers (
  quote_id uuid primary key references public.quotes(id) on delete cascade,
  employer_id uuid not null,
  taken_at timestamptz not null default now()
);
create index if not exists firm_quote_followup_takeovers_employer_idx
  on public.firm_quote_followup_takeovers (employer_id);
alter table public.firm_quote_followup_takeovers enable row level security;
drop policy if exists "Firm money managers read quote follow-up takeovers" on public.firm_quote_followup_takeovers;
create policy "Firm money managers read quote follow-up takeovers" on public.firm_quote_followup_takeovers
  for select to authenticated using (public.can_see_firm_money(employer_id));

comment on table public.firm_chase_settings is '[EMPLOYER HUB — MONEY] Chasing schedule (ELE-2065/2073): the firm''s invoice chase steps (days from due, email or SMS hand-off, wording) and quote follow-up days. Scope: one row per firm. Used by: Who owes me, run_firm_money_chase, firm-chase-send. Rule: written only by save_firm_chase_settings (owner/admin).';
comment on table public.invoice_chase_state is '[EMPLOYER HUB — MONEY] Per-invoice chasing state (ELE-2065): paused, disputed, promise-to-pay date, business or consumer debtor. Scope: one row per invoice (quotes row). Used by: Who owes me, run_firm_money_chase. Rule: written only by set_invoice_chase_state / add_invoice_chase_note.';
comment on table public.invoice_chase_notes is '[EMPLOYER HUB — MONEY] Promise-to-pay and chasing notes on an invoice (ELE-2065). Scope: invoice. Used by: Who owes me. Rule: written only by the chase RPCs.';
comment on table public.firm_chase_customer_pauses is '[EMPLOYER HUB — MONEY] Customers the firm has paused automatic chasing for (ELE-2065). Scope: firm. Rule: written only by set_customer_chase_pause.';
comment on table public.firm_quote_followup_takeovers is '[EMPLOYER HUB — MONEY] Quotes whose built-in follow-up the firm''s own follow-up schedule took over (ELE-2073), restored when the schedule is turned off. Rule: written only by run_firm_money_chase / save_firm_chase_settings.';

insert into public.notification_types (type, category, push, importance) values
  ('invoice_chase_text', 'invoices_quotes', true, 1),
  ('retention_release_due', 'invoices_quotes', true, 1)
on conflict (type) do nothing;

-- ── Helpers ───────────────────────────────────────────────────────────────

create or replace function public._chase_customer_key(p_customer uuid, p_client jsonb)
returns text language sql immutable set search_path to 'public' as $$
  select coalesce(
    p_customer::text,
    'email:' || nullif(lower(btrim(coalesce(p_client->>'email', ''))), ''),
    'name:' || nullif(lower(btrim(coalesce(p_client->>'name', ''))), ''),
    'unknown')
$$;

-- Retention still held on an invoice (settings.retention), else 0.
create or replace function public._invoice_retention_held(p_settings jsonb, p_total numeric)
returns numeric language sql immutable set search_path to 'public' as $$
  select case
    when jsonb_typeof(p_settings->'retention') <> 'object' then 0
    when nullif(p_settings->'retention'->>'released_at', '') is not null then 0
    when (p_settings->'retention'->>'amount') ~ '^[0-9]+(\.[0-9]+)?$'
      then least((p_settings->'retention'->>'amount')::numeric, coalesce(p_total, 0))
    when (p_settings->'retention'->>'percent') ~ '^[0-9]+(\.[0-9]+)?$'
      then round(coalesce(p_total, 0) * least((p_settings->'retention'->>'percent')::numeric, 100) / 100, 2)
    else 0 end
$$;

create or replace function public._gbp(p numeric)
returns text language sql immutable set search_path to 'public' as $$
  select '£' || to_char(coalesce(p, 0), 'FM999,999,990.00')
$$;

-- Default wording, used when an invoice holds a retention (the branded
-- templates state the full balance, which would chase the retention early).
create or replace function public._chase_default_body(p_tone text)
returns text language sql immutable set search_path to 'public' as $$
  select case p_tone
    when 'final' then E'Dear {customer},\n\nThis is a final reminder that {amount} on invoice {invoice} is now {days_overdue} days overdue. Please pay today, or get in touch so we can sort it out.\n\n{pay_line}\n\nThank you,\n{company}'
    when 'firm' then E'Dear {customer},\n\nJust following up on invoice {invoice}. {amount} was due on {due_date} and is now {days_overdue} days overdue. Could you settle it when you get a moment, or let us know if there is a problem?\n\n{pay_line}\n\nThank you,\n{company}'
    else E'Dear {customer},\n\nA quick reminder that {amount} on invoice {invoice} is due on {due_date}. If you have already paid, thank you and please ignore this.\n\n{pay_line}\n\nThank you,\n{company}'
  end
$$;

create or replace function public._chase_render(
  p_text text, p_customer text, p_invoice text, p_amount numeric, p_due date,
  p_days_overdue int, p_company text, p_pay_url text)
returns text language sql immutable set search_path to 'public' as $$
  select replace(replace(replace(replace(replace(replace(replace(replace(coalesce(p_text, ''),
    '{customer}', coalesce(nullif(btrim(p_customer), ''), 'there')),
    '{invoice}', coalesce(p_invoice, '')),
    '{amount}', public._gbp(p_amount)),
    '{due_date}', coalesce(to_char(p_due, 'FMDD FMMonth YYYY'), 'the due date')),
    '{days_overdue}', greatest(coalesce(p_days_overdue, 0), 0)::text),
    '{company}', coalesce(nullif(btrim(p_company), ''), 'us')),
    '{pay_link}', coalesce(p_pay_url, '')),
    '{pay_line}', case when p_pay_url is not null then 'You can pay by card here: ' || p_pay_url
                       else 'Our bank details are on the invoice.' end)
$$;

-- The next chase step for one invoice, for display and for the tick.
-- A step is due on due_on + offset; it fires inside a 3-day window (so a
-- missed tick or a weekend still sends it) and never for a date before the
-- schedule was switched on (no backlog blast). Steps already claimed, or with
-- a later step claimed, are passed over.
create or replace function public._invoice_chase_step(
  p_firm uuid, p_invoice uuid, p_due date, p_steps jsonb, p_enabled_at timestamptz, p_today date)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  s jsonb;
  v_last_claimed int;
  v_due_step jsonb;
  v_next jsonb;
  v_date date;
  v_off int;
begin
  if p_due is null or p_steps is null or jsonb_typeof(p_steps) <> 'array' then return null; end if;
  select max(split_part(r.ref, ':', 2)::int) into v_last_claimed
    from public.employer_automation_runs r
   where r.employer_id = p_firm and r.rule_key = 'invoice_chase'
     and r.ref like p_invoice::text || ':%' and split_part(r.ref, ':', 2) ~ '^-?[0-9]+$';
  for s in select x from jsonb_array_elements(p_steps) x order by (x->>'offset')::int loop
    v_off := (s->>'offset')::int;
    v_date := p_due + v_off;
    if v_last_claimed is not null and v_off <= v_last_claimed then continue; end if;
    if p_enabled_at is not null and v_date < (p_enabled_at at time zone 'Europe/London')::date then continue; end if;
    if v_date between p_today - 3 and p_today then
      v_due_step := s || jsonb_build_object('date', v_date);   -- keep the latest due one
    elsif v_date > p_today and v_next is null then
      v_next := s || jsonb_build_object('date', v_date);
    end if;
  end loop;
  return jsonb_build_object('due', v_due_step, 'next', coalesce(v_due_step, v_next));
end;
$$;
revoke all on function public._invoice_chase_step(uuid, uuid, date, jsonb, timestamptz, date) from public, anon, authenticated;

-- ── Settings ──────────────────────────────────────────────────────────────

create or replace function public.get_firm_chase_settings()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := public.my_default_employer_id();
  r public.firm_chase_settings;
  d public.firm_chase_settings;
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can see the chasing schedule' using errcode = '42501';
  end if;
  select * into r from public.firm_chase_settings where employer_id = v_firm;
  if r.employer_id is null then
    -- Column defaults, without writing a row.
    d.invoice_steps := '[{"offset": -3, "channel": "email", "tone": "gentle"},
      {"offset": 0, "channel": "email", "tone": "gentle"}, {"offset": 7, "channel": "email", "tone": "firm"},
      {"offset": 14, "channel": "sms", "tone": "firm"}, {"offset": 30, "channel": "email", "tone": "final"}]'::jsonb;
    d.quote_steps := '[{"day": 3}, {"day": 7}, {"day": 14}]'::jsonb;
    r := d;
  end if;
  return jsonb_build_object(
    'firm_id', v_firm,
    'invoice_enabled', coalesce(r.invoice_enabled, false),
    'invoice_enabled_at', r.invoice_enabled_at,
    'invoice_steps', r.invoice_steps,
    'quote_enabled', coalesce(r.quote_enabled, false),
    'quote_enabled_at', r.quote_enabled_at,
    'quote_steps', r.quote_steps,
    'changed_by_name', r.changed_by_name,
    'updated_at', r.updated_at,
    'old_rule_on', exists (select 1 from public.employer_automation_rules a
                            where a.employer_id = v_firm and a.rule_key = 'invoice_unpaid_reminder' and a.enabled),
    'automations_paused', coalesce((select s.paused from public.employer_automation_settings s
                                     where s.employer_id = v_firm), false));
end;
$$;

create or replace function public.save_firm_chase_settings(p jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_name text;
  v_old public.firm_chase_settings;
  v_inv_steps jsonb;
  v_q_steps jsonb;
  s jsonb;
  v_n int;
  v_inv_on boolean;
  v_q_on boolean;
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can change the chasing schedule' using errcode = '42501';
  end if;
  select * into v_old from public.firm_chase_settings where employer_id = v_firm;

  v_inv_steps := coalesce(p->'invoice_steps', v_old.invoice_steps);
  if v_inv_steps is not null then
    if jsonb_typeof(v_inv_steps) <> 'array' or jsonb_array_length(v_inv_steps) > 8 then
      raise exception 'Up to 8 chasing steps';
    end if;
    for s in select x from jsonb_array_elements(v_inv_steps) x loop
      if coalesce(s->>'offset', '') !~ '^-?[0-9]+$' or (s->>'offset')::int not between -30 and 180 then
        raise exception 'Each step needs a day between 30 before and 180 after the due date';
      end if;
      if coalesce(s->>'channel', '') not in ('email', 'sms') then raise exception 'A step is email or text'; end if;
      if coalesce(s->>'tone', 'gentle') not in ('gentle', 'firm', 'final') then raise exception 'Unknown tone'; end if;
      if length(coalesce(s->>'subject', '')) > 200 or length(coalesce(s->>'body', '')) > 3000 then
        raise exception 'The wording is too long';
      end if;
    end loop;
    select count(*) - count(distinct x->>'offset') into v_n from jsonb_array_elements(v_inv_steps) x;
    if v_n > 0 then raise exception 'Two steps are on the same day'; end if;
  end if;

  v_q_steps := coalesce(p->'quote_steps', v_old.quote_steps);
  if v_q_steps is not null then
    if jsonb_typeof(v_q_steps) <> 'array' or jsonb_array_length(v_q_steps) > 5 then
      raise exception 'Up to 5 follow-ups';
    end if;
    for s in select x from jsonb_array_elements(v_q_steps) x loop
      if coalesce(s->>'day', '') !~ '^[0-9]+$' or (s->>'day')::int not between 1 and 60 then
        raise exception 'Each follow-up needs a day between 1 and 60 after sending';
      end if;
      if length(coalesce(s->>'subject', '')) > 200 or length(coalesce(s->>'body', '')) > 3000 then
        raise exception 'The wording is too long';
      end if;
    end loop;
    select count(*) - count(distinct x->>'day') into v_n from jsonb_array_elements(v_q_steps) x;
    if v_n > 0 then raise exception 'Two follow-ups are on the same day'; end if;
  end if;

  v_inv_on := coalesce((p->>'invoice_enabled')::boolean, v_old.invoice_enabled, false);
  v_q_on := coalesce((p->>'quote_enabled')::boolean, v_old.quote_enabled, false);
  v_name := public._automation_actor_name(v_firm);

  insert into public.firm_chase_settings as t (employer_id, invoice_enabled, invoice_enabled_at, invoice_steps,
    quote_enabled, quote_enabled_at, quote_steps, changed_by, changed_by_name, updated_at)
  values (v_firm, v_inv_on, case when v_inv_on then now() end,
          coalesce(v_inv_steps, '[]'::jsonb), v_q_on, case when v_q_on then now() end,
          coalesce(v_q_steps, '[]'::jsonb), auth.uid(), v_name, now())
  on conflict (employer_id) do update set
    invoice_enabled = excluded.invoice_enabled,
    invoice_enabled_at = case when excluded.invoice_enabled and not t.invoice_enabled then now()
                              when excluded.invoice_enabled then t.invoice_enabled_at end,
    invoice_steps = excluded.invoice_steps,
    quote_enabled = excluded.quote_enabled,
    quote_enabled_at = case when excluded.quote_enabled and not t.quote_enabled then now()
                            when excluded.quote_enabled then t.quote_enabled_at end,
    quote_steps = excluded.quote_steps,
    changed_by = excluded.changed_by, changed_by_name = excluded.changed_by_name, updated_at = now();

  -- Turning the firm's quote follow-up off hands the open quotes back to the
  -- built-in follow-up, but only the ones this schedule took over.
  if coalesce(v_old.quote_enabled, false) and not v_q_on then
    update public.quotes q set auto_followup_enabled = true
      from public.firm_quote_followup_takeovers t
     where t.employer_id = v_firm and t.quote_id = q.id
       and q.status = 'sent' and q.acceptance_status = 'pending' and q.deleted_at is null;
    delete from public.firm_quote_followup_takeovers where employer_id = v_firm;
  end if;

  if coalesce(v_old.invoice_enabled, false) is distinct from v_inv_on
     or coalesce(v_old.quote_enabled, false) is distinct from v_q_on then
    insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
    values (v_firm, auth.uid(), 'chase_schedule', 'firm_chase_settings', null,
            jsonb_build_object('invoice_enabled', v_inv_on, 'quote_enabled', v_q_on, 'by', v_name));
  end if;
  return public.get_firm_chase_settings();
end;
$$;

-- ── Who owes me ───────────────────────────────────────────────────────────

create or replace function public.get_firm_debtors()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_today date := (now() at time zone 'Europe/London')::date;
  cs public.firm_chase_settings;
  v_rows jsonb;
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can see who owes you' using errcode = '42501';
  end if;
  select * into cs from public.firm_chase_settings where employer_id = v_firm;

  with inv as (
    select r.id, r.invoice_number, r.client, r.balance, r.amount, r.paid_amount, r.due_on, r.issued_on,
           r.money_state, r.job_id, q.customer_id, q.client_data, q.settings, q.last_reminder_sent_at,
           q.reminder_count, q.stripe_payment_link_url, q.invoice_sent_at,
           public._chase_customer_key(q.customer_id, q.client_data) as ckey,
           public._invoice_retention_held(q.settings, q.total) as retention_held,
           case when r.due_on is not null and r.due_on < v_today then v_today - r.due_on else 0 end as days_over
      from public.finance_invoice_rows(array[v_firm]) r
      join public.quotes q on q.id = r.id
     where r.money_state in ('sent', 'overdue') and r.balance > 0
  )
  select coalesce(jsonb_agg(jsonb_build_object(
      'invoice_id', i.id,
      'invoice_number', i.invoice_number,
      'client', i.client,
      'client_email', nullif(btrim(coalesce(i.client_data->>'email', '')), ''),
      'client_phone', nullif(btrim(coalesce(i.client_data->>'phone', '')), ''),
      'customer_id', i.customer_id,
      'customer_key', i.ckey,
      'company_name', coalesce(nullif(btrim(c.company_name), ''), nullif(btrim(coalesce(i.client_data->>'company', '')), '')),
      'job_id', i.job_id,
      'amount', i.amount,
      'paid', i.paid_amount,
      'balance', i.balance,
      'retention_held', i.retention_held,
      'retention_release_date', nullif(i.settings->'retention'->>'release_date', ''),
      'due_now', greatest(i.balance - i.retention_held, 0),
      'issued_on', i.issued_on,
      'due_on', i.due_on,
      'days_overdue', i.days_over,
      'bucket', case when i.days_over = 0 then 'not_due' when i.days_over <= 30 then 'd1_30'
                     when i.days_over <= 60 then 'd31_60' when i.days_over <= 90 then 'd61_90' else 'd90_plus' end,
      'pay_url', i.stripe_payment_link_url,
      'paused', coalesce(st.paused, false),
      'customer_paused', cp.customer_key is not null,
      'disputed', coalesce(st.disputed, false),
      'dispute_note', st.dispute_note,
      'debtor_type', st.debtor_type,
      'promise_date', st.promise_date,
      'interest_offered_at', st.interest_offered_at,
      'last_chased_at', greatest(i.last_reminder_sent_at,
                                 (select max(coalesce(rr.finished_at, rr.created_at)) from public.employer_automation_runs rr
                                   where rr.employer_id = v_firm and rr.rule_key = 'invoice_chase'
                                     and rr.ref like i.id::text || ':%' and rr.status = 'done')),
      'reminder_count', coalesce(i.reminder_count, 0),
      'next_chase', case
        when not coalesce(cs.invoice_enabled, false) or i.due_on is null
          or coalesce(st.paused, false) or coalesce(st.disputed, false) or cp.customer_key is not null
          then null
        else (public._invoice_chase_step(v_firm, i.id, i.due_on, cs.invoice_steps, cs.invoice_enabled_at, v_today))->'next'
      end,
      'latest_note', (select jsonb_build_object('kind', n.kind, 'body', n.body, 'promise_date', n.promise_date,
                                                'by', n.created_by_name, 'at', n.created_at)
                        from public.invoice_chase_notes n where n.invoice_id = i.id
                       order by n.created_at desc limit 1),
      'note_count', (select count(*) from public.invoice_chase_notes n where n.invoice_id = i.id)
    ) order by i.days_over desc, i.due_on nulls last), '[]'::jsonb)
    into v_rows
    from inv i
    left join public.customers c on c.id = i.customer_id
    left join public.invoice_chase_state st on st.invoice_id = i.id
    left join public.firm_chase_customer_pauses cp on cp.employer_id = v_firm and cp.customer_key = i.ckey;

  return jsonb_build_object(
    'firm_id', v_firm,
    'today', v_today,
    'schedule_on', coalesce(cs.invoice_enabled, false),
    'rows', v_rows,
    'totals', (select jsonb_build_object(
        'owed', coalesce(sum((x->>'balance')::numeric), 0),
        'count', count(*),
        'not_due', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' = 'not_due'), 0),
        'd1_30', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' = 'd1_30'), 0),
        'd31_60', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' = 'd31_60'), 0),
        'd61_90', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' = 'd61_90'), 0),
        'd90_plus', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' = 'd90_plus'), 0),
        'overdue', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' <> 'not_due'), 0),
        'overdue_count', count(*) filter (where x->>'bucket' <> 'not_due'),
        'over_60', coalesce(sum((x->>'balance')::numeric) filter (where x->>'bucket' in ('d61_90', 'd90_plus')), 0),
        'retention_held', coalesce(sum((x->>'retention_held')::numeric), 0),
        'disputed_count', count(*) filter (where (x->>'disputed')::boolean))
      from jsonb_array_elements(v_rows) x));
end;
$$;

-- Invoice in this firm, for the money RPCs below. Raises otherwise.
create or replace function public._chase_invoice_firm(p_invoice uuid)
returns uuid language plpgsql stable security definer set search_path to 'public' as $$
declare v_firm uuid := public.my_default_employer_id();
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can chase invoices' using errcode = '42501';
  end if;
  if not exists (select 1 from public.quotes q where q.id = p_invoice and q.user_id = v_firm
                  and q.deleted_at is null and coalesce(q.invoice_raised, false)) then
    raise exception 'Invoice not found' using errcode = 'P0002';
  end if;
  return v_firm;
end;
$$;
revoke all on function public._chase_invoice_firm(uuid) from public, anon;

create or replace function public.set_invoice_chase_state(p_invoice uuid, p_patch jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._chase_invoice_firm(p_invoice);
  v_name text := public._automation_actor_name(v_firm);
  v_old public.invoice_chase_state;
  v_new public.invoice_chase_state;
begin
  select * into v_old from public.invoice_chase_state where invoice_id = p_invoice;
  if p_patch ? 'debtor_type' and nullif(p_patch->>'debtor_type', '') is not null
     and p_patch->>'debtor_type' not in ('business', 'consumer') then
    raise exception 'A customer is a business or a consumer';
  end if;
  insert into public.invoice_chase_state as t (invoice_id, employer_id, paused, disputed, dispute_note,
    debtor_type, promise_date, interest_offered_at, updated_by, updated_by_name, updated_at)
  values (p_invoice, v_firm,
          coalesce((p_patch->>'paused')::boolean, false),
          coalesce((p_patch->>'disputed')::boolean, false),
          nullif(btrim(coalesce(p_patch->>'dispute_note', '')), ''),
          nullif(p_patch->>'debtor_type', ''),
          nullif(p_patch->>'promise_date', '')::date,
          case when (p_patch->>'interest_offered')::boolean then now() end,
          auth.uid(), v_name, now())
  on conflict (invoice_id) do update set
    paused = case when p_patch ? 'paused' then coalesce((p_patch->>'paused')::boolean, false) else t.paused end,
    disputed = case when p_patch ? 'disputed' then coalesce((p_patch->>'disputed')::boolean, false) else t.disputed end,
    dispute_note = case when p_patch ? 'dispute_note' then nullif(btrim(coalesce(p_patch->>'dispute_note', '')), '')
                        else t.dispute_note end,
    debtor_type = case when p_patch ? 'debtor_type' then nullif(p_patch->>'debtor_type', '') else t.debtor_type end,
    promise_date = case when p_patch ? 'promise_date' then nullif(p_patch->>'promise_date', '')::date else t.promise_date end,
    interest_offered_at = case when (p_patch->>'interest_offered')::boolean then now() else t.interest_offered_at end,
    updated_by = auth.uid(), updated_by_name = v_name, updated_at = now()
  returning * into v_new;

  if coalesce(v_old.disputed, false) is distinct from v_new.disputed then
    insert into public.invoice_chase_notes (invoice_id, employer_id, kind, body, created_by, created_by_name)
    values (p_invoice, v_firm, case when v_new.disputed then 'dispute' else 'resolved' end,
            case when v_new.disputed then coalesce(v_new.dispute_note, 'Marked as disputed. Chasing stopped.')
                 else 'Dispute resolved. Chasing can carry on.' end,
            auth.uid(), v_name);
  end if;
  return to_jsonb(v_new);
end;
$$;

create or replace function public.add_invoice_chase_note(
  p_invoice uuid, p_kind text, p_body text, p_promise_date date default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._chase_invoice_firm(p_invoice);
  v_name text := public._automation_actor_name(v_firm);
  v_row public.invoice_chase_notes;
begin
  if p_kind not in ('note', 'promise', 'chase', 'interest') then raise exception 'Unknown note type'; end if;
  if p_kind = 'promise' and p_promise_date is null then raise exception 'A promise to pay needs a date'; end if;
  if length(coalesce(p_body, '')) > 2000 then raise exception 'The note is too long'; end if;
  insert into public.invoice_chase_notes (invoice_id, employer_id, kind, promise_date, body, created_by, created_by_name)
  values (p_invoice, v_firm, p_kind, p_promise_date, nullif(btrim(coalesce(p_body, '')), ''), auth.uid(), v_name)
  returning * into v_row;
  if p_kind = 'promise' then
    insert into public.invoice_chase_state as t (invoice_id, employer_id, promise_date, updated_by, updated_by_name)
    values (p_invoice, v_firm, p_promise_date, auth.uid(), v_name)
    on conflict (invoice_id) do update set promise_date = excluded.promise_date,
      updated_by = excluded.updated_by, updated_by_name = excluded.updated_by_name, updated_at = now();
  elsif p_kind = 'interest' then
    insert into public.invoice_chase_state as t (invoice_id, employer_id, interest_offered_at, updated_by, updated_by_name)
    values (p_invoice, v_firm, now(), auth.uid(), v_name)
    on conflict (invoice_id) do update set interest_offered_at = now(), updated_at = now();
  end if;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.get_invoice_chase_notes(p_invoice uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_firm uuid := public._chase_invoice_firm(p_invoice);
begin
  return jsonb_build_object(
    'notes', coalesce((select jsonb_agg(to_jsonb(n) order by n.created_at desc)
                         from public.invoice_chase_notes n where n.invoice_id = p_invoice), '[]'::jsonb),
    'runs', coalesce((select jsonb_agg(jsonb_build_object('status', r.status, 'summary', r.summary,
                                         'created_at', r.created_at, 'finished_at', r.finished_at)
                                       order by r.created_at desc)
                        from public.employer_automation_runs r
                       where r.employer_id = v_firm and r.rule_key = 'invoice_chase'
                         and r.ref like p_invoice::text || ':%'), '[]'::jsonb));
end;
$$;

create or replace function public.set_customer_chase_pause(p_key text, p_label text, p_paused boolean)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_firm uuid := public.my_default_employer_id();
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can pause chasing' using errcode = '42501';
  end if;
  if coalesce(btrim(p_key), '') = '' then raise exception 'Customer missing'; end if;
  if p_paused then
    insert into public.firm_chase_customer_pauses (employer_id, customer_key, label, created_by, created_by_name)
    values (v_firm, p_key, left(p_label, 200), auth.uid(), public._automation_actor_name(v_firm))
    on conflict (employer_id, customer_key) do nothing;
  else
    delete from public.firm_chase_customer_pauses where employer_id = v_firm and customer_key = p_key;
  end if;
  return jsonb_build_object('customer_key', p_key, 'paused', p_paused);
end;
$$;

-- ── The tick ──────────────────────────────────────────────────────────────

create or replace function public.run_firm_money_chase(p_now timestamptz default now())
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_local timestamp := p_now at time zone 'Europe/London';
  v_today date := (p_now at time zone 'Europe/London')::date;
  v_sending boolean := extract(isodow from v_local) between 1 and 5 and extract(hour from v_local) between 9 and 16;
  v_key text;
  f record;
  i record;
  qr record;
  v_step jsonb;
  v_off int;
  v_run uuid;
  v_company text;
  v_body text;
  v_subject text;
  v_pay text;
  n_email int := 0; n_sms int := 0; n_skip int := 0; n_quote int := 0; n_take int := 0; n_ret int := 0;
begin
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;

  -- 1. Invoice chasing.
  for f in
    select s.* from public.firm_chase_settings s
     where s.invoice_enabled
       and not exists (select 1 from public.employer_automation_settings a where a.employer_id = s.employer_id and a.paused)
  loop
    select coalesce(nullif(btrim(cp.company_name), ''), 'us') into v_company
      from public.company_profiles cp where cp.user_id = f.employer_id limit 1;
    for i in
      select r.id, r.invoice_number, r.client, r.balance, r.due_on, q.total, q.total_paid, q.settings,
             q.client_data, q.last_reminder_sent_at, q.stripe_payment_link_url,
             public._invoice_retention_held(q.settings, q.total) as retention_held
        from public.finance_invoice_rows(array[f.employer_id]) r
        join public.quotes q on q.id = r.id
       where r.money_state in ('sent', 'overdue') and r.balance > 0 and r.due_on is not null
         and not exists (select 1 from public.invoice_chase_state st where st.invoice_id = r.id
                          and (st.paused or st.disputed or (st.promise_date is not null and st.promise_date >= v_today)))
         and not exists (select 1 from public.firm_chase_customer_pauses cp
                          where cp.employer_id = f.employer_id
                            and cp.customer_key = public._chase_customer_key(q.customer_id, q.client_data))
       limit 200
    loop
      begin
        v_step := (public._invoice_chase_step(f.employer_id, i.id, i.due_on, f.invoice_steps, f.invoice_enabled_at, v_today))->'due';
        if v_step is null or jsonb_typeof(v_step) <> 'object' then continue; end if;
        v_off := (v_step->>'offset')::int;
        if not v_sending then continue; end if;

        -- Nothing left to ask for once the retention is set aside.
        if greatest(i.balance - i.retention_held, 0) <= 0 then
          v_run := public._automation_claim(f.employer_id, 'invoice_chase', i.id || ':' || v_off, null,
            'Not chased: only the retention is left on invoice ' || coalesce(i.invoice_number, '') || '.', 'skipped');
          if v_run is not null then
            update public.employer_automation_runs set finished_at = p_now where id = v_run;
            n_skip := n_skip + 1;
          end if;
          continue;
        end if;
        -- Chased by hand (or by anything else) in the last 2 days: skip this step.
        if i.last_reminder_sent_at is not null and i.last_reminder_sent_at > p_now - interval '2 days' then
          v_run := public._automation_claim(f.employer_id, 'invoice_chase', i.id || ':' || v_off, null,
            'Not sent: ' || coalesce(i.client, 'the customer') || ' was chased about invoice '
              || coalesce(i.invoice_number, '') || ' on ' || to_char(i.last_reminder_sent_at at time zone 'Europe/London', 'FMDD Mon') || '.',
            'skipped');
          if v_run is not null then
            update public.employer_automation_runs set finished_at = p_now where id = v_run;
            n_skip := n_skip + 1;
          end if;
          continue;
        end if;

        if v_step->>'channel' = 'sms' then
          v_run := public._automation_claim(f.employer_id, 'invoice_chase', i.id || ':' || v_off, null,
            'Asked the office to text ' || coalesce(i.client, 'the customer') || ' about invoice ' || coalesce(i.invoice_number, '') || '.',
            'queued', jsonb_build_object('invoice_id', i.id, 'offset', v_off, 'channel', 'sms'));
          if v_run is not null then
            update public.employer_automation_runs set status = 'sending' where id = v_run;
            perform public._automation_finish(v_run, 'done', null);
            perform public.notify_employer_bell(f.employer_id, 'invoice_chase_text',
              'Text ' || coalesce(i.client, 'the customer') || ' about invoice ' || coalesce(i.invoice_number, ''),
              'Your chasing schedule says send a text today. Open it to send the text from your phone.',
              jsonb_build_object('invoice_id', i.id,
                                 'route', '/employer?section=quotes&view=owed&invoice=' || i.id));
            n_sms := n_sms + 1;
          end if;
          continue;
        end if;

        -- Email: wording the owner wrote, or (for a retention invoice) the
        -- default wording; otherwise the branded template by tone.
        v_pay := case when coalesce(i.total_paid, 0) = 0 and i.retention_held = 0 then i.stripe_payment_link_url end;
        v_body := nullif(btrim(coalesce(v_step->>'body', '')), '');
        if v_body is null and i.retention_held > 0 then
          v_body := public._chase_default_body(coalesce(v_step->>'tone', 'gentle'));
        end if;
        v_subject := nullif(btrim(coalesce(v_step->>'subject', '')), '');
        if v_body is not null then
          v_body := public._chase_render(v_body, i.client, i.invoice_number, greatest(i.balance - i.retention_held, 0),
                      i.due_on, v_today - i.due_on, v_company, v_pay);
          v_subject := public._chase_render(coalesce(v_subject, 'Invoice {invoice}: {amount}'), i.client, i.invoice_number,
                      greatest(i.balance - i.retention_held, 0), i.due_on, v_today - i.due_on, v_company, v_pay);
        else
          v_subject := null;
        end if;

        if v_key is null then
          raise warning '[run_firm_money_chase] service_role_key not in vault';
          exit;
        end if;
        v_run := public._automation_claim(f.employer_id, 'invoice_chase', i.id || ':' || v_off, null,
          'Chasing ' || coalesce(i.client, 'the customer') || ' about invoice ' || coalesce(i.invoice_number, ''),
          'queued', jsonb_build_object('invoice_id', i.id, 'offset', v_off, 'channel', 'email',
                                       'tone', coalesce(v_step->>'tone', 'gentle'),
                                       'subject', v_subject, 'body', v_body));
        if v_run is not null then
          -- Straight to sending: run_employer_automations only dispatches its own rules.
          update public.employer_automation_runs set status = 'sending', dispatched_at = p_now where id = v_run;
          perform net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-chase-send',
            headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
            body := jsonb_build_object('run_id', v_run));
          n_email := n_email + 1;
        end if;
      exception when others then
        perform public._automation_fail(f.employer_id, 'invoice_chase', i.id || ':err:' || v_today, null, sqlerrm);
      end;
    end loop;
  end loop;

  -- 2. Quote follow-up (ELE-2073).
  for f in
    select s.* from public.firm_chase_settings s
     where s.quote_enabled
       and not exists (select 1 from public.employer_automation_settings a where a.employer_id = s.employer_id and a.paused)
  loop
    -- Take over the built-in follow-up so a customer is never chased twice.
    with taken as (
      insert into public.firm_quote_followup_takeovers (quote_id, employer_id)
      select q.id, f.employer_id from public.quotes q
       where q.user_id = f.employer_id and q.deleted_at is null and q.status = 'sent'
         and q.acceptance_status = 'pending' and coalesce(q.auto_followup_enabled, false)
         and not coalesce(q.invoice_raised, false)
      on conflict (quote_id) do nothing
      returning quote_id
    )
    update public.quotes q set auto_followup_enabled = false from taken t where q.id = t.quote_id;
    get diagnostics v_off = row_count;
    n_take := n_take + v_off;

    if not v_sending then continue; end if;
    for qr in
      select x.id, x.quote_number, x.first_sent_at, x.last_reminder_sent_at,
             nullif(btrim(x.client_data->>'name'), '') as client,
             (select max(split_part(r.ref, ':', 2)::int) from public.employer_automation_runs r
               where r.employer_id = f.employer_id and r.rule_key = 'quote_followup'
                 and r.ref like x.id::text || ':%' and split_part(r.ref, ':', 2) ~ '^[0-9]+$') as last_day
        from public.quotes x
       where x.user_id = f.employer_id and x.deleted_at is null and x.status = 'sent'
         and x.acceptance_status = 'pending' and x.expiry_date > p_now
         and not coalesce(x.invoice_raised, false)
         and x.first_sent_at is not null
         and nullif(btrim(coalesce(x.client_data->>'email', '')), '') is not null
       limit 200
    loop
      begin
        v_step := null;
        select s into v_step from jsonb_array_elements(f.quote_steps) s
         where (qr.first_sent_at at time zone 'Europe/London')::date + (s->>'day')::int between v_today - 2 and v_today
           and (qr.first_sent_at at time zone 'Europe/London')::date + (s->>'day')::int
               >= (f.quote_enabled_at at time zone 'Europe/London')::date
           and (qr.last_day is null or (s->>'day')::int > qr.last_day)
         order by (s->>'day')::int desc limit 1;
        if v_step is null then continue; end if;
        v_off := (v_step->>'day')::int;
        if qr.last_reminder_sent_at is not null and qr.last_reminder_sent_at > p_now - interval '2 days' then
          v_run := public._automation_claim(f.employer_id, 'quote_followup', qr.id || ':' || v_off, null,
            'Not sent: ' || coalesce(qr.client, 'the customer') || ' was reminded about quote '
              || coalesce(qr.quote_number, '') || ' in the last 2 days.', 'skipped');
          if v_run is not null then
            update public.employer_automation_runs set finished_at = p_now where id = v_run;
          end if;
          continue;
        end if;
        if v_key is null then exit; end if;
        v_run := public._automation_claim(f.employer_id, 'quote_followup', qr.id || ':' || v_off, null,
          'Following up quote ' || coalesce(qr.quote_number, '') || ' with ' || coalesce(qr.client, 'the customer'),
          'queued', jsonb_build_object('quote_id', qr.id, 'day', v_off,
                                       'subject', nullif(btrim(coalesce(v_step->>'subject', '')), ''),
                                       'body', nullif(btrim(coalesce(v_step->>'body', '')), '')));
        if v_run is not null then
          update public.employer_automation_runs set status = 'sending', dispatched_at = p_now where id = v_run;
          perform net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-chase-send',
            headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
            body := jsonb_build_object('run_id', v_run));
          n_quote := n_quote + 1;
        end if;
      exception when others then
        perform public._automation_fail(f.employer_id, 'quote_followup', qr.id || ':err:' || v_today, null, sqlerrm);
      end;
    end loop;
  end loop;

  -- 3. Retention release reminders: once, on or after the release date,
  -- looked for in the 8 o'clock hour only (the claim makes it once per invoice).
  if extract(hour from v_local) <> 8 then
    return jsonb_build_object('invoice_emails', n_email, 'invoice_texts', n_sms, 'skipped', n_skip,
                              'quote_followups', n_quote, 'quotes_taken_over', n_take, 'retention_reminders', 0);
  end if;
  for i in
    select q.id, q.user_id, coalesce(q.invoice_number, q.quote_number) as num,
           nullif(btrim(q.client_data->>'name'), '') as client
      from public.quotes q
     where jsonb_typeof(q.settings->'retention') = 'object'
       and coalesce(q.settings->'retention'->>'release_date', '') ~ '^\d{4}-\d{2}-\d{2}$'
       and (q.settings->'retention'->>'release_date')::date <= v_today
       and nullif(q.settings->'retention'->>'released_at', '') is null
       and coalesce(q.invoice_raised, false) and q.deleted_at is null
       and lower(coalesce(q.invoice_status, '')) not in ('cancelled', 'void')
     limit 200
  loop
    v_run := public._automation_claim(i.user_id, 'retention_release', i.id::text, null,
      'Reminded the office that the retention on invoice ' || coalesce(i.num, '') || ' is due for release.', 'queued');
    if v_run is not null then
      update public.employer_automation_runs set status = 'sending' where id = v_run;
      perform public._automation_finish(v_run, 'done', null);
      perform public.notify_employer_bell(i.user_id, 'retention_release_due',
        'Retention due on invoice ' || coalesce(i.num, ''),
        coalesce(i.client, 'The customer') || ' can now be asked to release the retention. Open it to chase or mark it released.',
        jsonb_build_object('invoice_id', i.id, 'route', '/employer?section=quotes&view=owed&invoice=' || i.id));
      n_ret := n_ret + 1;
    end if;
  end loop;

  return jsonb_build_object('invoice_emails', n_email, 'invoice_texts', n_sms, 'skipped', n_skip,
                            'quote_followups', n_quote, 'quotes_taken_over', n_take, 'retention_reminders', n_ret);
end;
$$;
revoke all on function public.run_firm_money_chase(timestamptz) from public, anon, authenticated;

-- For firm-chase-send (service role): is this run still worth sending?
-- Returns null when it is, else the reason it is not.
create or replace function public.firm_chase_run_check(p_run uuid)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare
  r public.employer_automation_runs;
  s public.firm_chase_settings;
  v_id uuid;
  st public.invoice_chase_state;
  q public.quotes;
begin
  select * into r from public.employer_automation_runs where id = p_run;
  if r.id is null or r.status <> 'sending' then return 'not_sending'; end if;
  select * into s from public.firm_chase_settings where employer_id = r.employer_id;
  if exists (select 1 from public.employer_automation_settings a where a.employer_id = r.employer_id and a.paused) then
    return 'Not sent: automations were paused before it ran.';
  end if;
  if r.rule_key = 'invoice_chase' then
    if not coalesce(s.invoice_enabled, false) then return 'Not sent: the chasing schedule was turned off before it ran.'; end if;
    v_id := (r.detail->>'invoice_id')::uuid;
    select * into q from public.quotes where id = v_id;
    if q.id is null or q.deleted_at is not null then return 'Not sent: the invoice no longer exists.'; end if;
    if q.invoice_paid_at is not null or lower(coalesce(q.invoice_status, '')) in ('paid', 'cancelled', 'void') then
      return 'Not sent: the invoice was paid or cancelled before it ran.';
    end if;
    select * into st from public.invoice_chase_state where invoice_id = v_id;
    if coalesce(st.disputed, false) then return 'Not sent: the invoice was marked as disputed.'; end if;
    if coalesce(st.paused, false) then return 'Not sent: chasing was paused for this invoice.'; end if;
    if st.promise_date is not null and st.promise_date >= (now() at time zone 'Europe/London')::date then
      return 'Not sent: the customer promised to pay by ' || to_char(st.promise_date, 'FMDD Mon') || '.';
    end if;
    if exists (select 1 from public.firm_chase_customer_pauses cp where cp.employer_id = r.employer_id
                and cp.customer_key = public._chase_customer_key(q.customer_id, q.client_data)) then
      return 'Not sent: chasing is paused for this customer.';
    end if;
    return null;
  elsif r.rule_key = 'quote_followup' then
    if not coalesce(s.quote_enabled, false) then return 'Not sent: quote follow-up was turned off before it ran.'; end if;
    select * into q from public.quotes where id = (r.detail->>'quote_id')::uuid;
    if q.id is null or q.deleted_at is not null then return 'Not sent: the quote no longer exists.'; end if;
    if q.acceptance_status <> 'pending' or q.status <> 'sent' then
      return 'Not sent: the customer already answered the quote.';
    end if;
    if q.expiry_date <= now() then return 'Not sent: the quote has expired.'; end if;
    return null;
  end if;
  return 'Not sent: this run is not a chase.';
end;
$$;
revoke all on function public.firm_chase_run_check(uuid) from public, anon, authenticated;
grant execute on function public.firm_chase_run_check(uuid) to service_role;

revoke all on function public.get_firm_chase_settings() from public, anon;
revoke all on function public.save_firm_chase_settings(jsonb) from public, anon;
revoke all on function public.get_firm_debtors() from public, anon;
revoke all on function public.set_invoice_chase_state(uuid, jsonb) from public, anon;
revoke all on function public.add_invoice_chase_note(uuid, text, text, date) from public, anon;
revoke all on function public.get_invoice_chase_notes(uuid) from public, anon;
revoke all on function public.set_customer_chase_pause(text, text, boolean) from public, anon;
grant execute on function public.get_firm_chase_settings() to authenticated;
grant execute on function public.save_firm_chase_settings(jsonb) to authenticated;
grant execute on function public.get_firm_debtors() to authenticated;
grant execute on function public.set_invoice_chase_state(uuid, jsonb) to authenticated;
grant execute on function public.add_invoice_chase_note(uuid, text, text, date) to authenticated;
grant execute on function public.get_invoice_chase_notes(uuid) to authenticated;
grant execute on function public.set_customer_chase_pause(text, text, boolean) to authenticated;

-- ── The old 14-day rule steps aside when the schedule is on ───────────────
do $do$
declare
  v_def text := pg_get_functiondef('public.run_employer_automations(timestamptz)'::regprocedure);
  v_from text := 'where r.rule_key = ''invoice_unpaid_reminder'' and r.enabled and r.enabled_at is not null';
  v_to text := 'where r.rule_key = ''invoice_unpaid_reminder'' and r.enabled and r.enabled_at is not null'
    || E'\n                 -- ELE-2065: the firm''s chasing schedule supersedes this rule.'
    || E'\n                 and not exists (select 1 from public.firm_chase_settings cs'
    || E'\n                                  where cs.employer_id = r.employer_id and cs.invoice_enabled)';
begin
  if position('firm_chase_settings' in v_def) > 0 then return; end if;  -- already patched
  if position(v_from in v_def) = 0 then
    raise exception 'run_employer_automations changed shape; patch it by hand';
  end if;
  execute replace(v_def, v_from, v_to);
end;
$do$;

-- ── Cron: every 30 minutes (sends only Mon to Fri, 9:00 to 16:59 UK time) ──
select cron.unschedule(jobid) from cron.job where jobname = 'firm-money-chase';
select cron.schedule('firm-money-chase', '7,37 * * * *', 'select public.run_firm_money_chase();');
