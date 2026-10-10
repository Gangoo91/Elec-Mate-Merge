-- ELE-2065 / ELE-2067 — two fixes to the firm's chasing schedule.
--
-- 1. Imported invoices are never chased. An invoice brought in by "Bring your
--    data across" (settings.imported / job_details.imported) and never sent
--    from Elec-Mate (invoice_sent_at null) is left out of run_firm_money_chase
--    and refused again by firm_chase_run_check at send time. Imported quotes
--    are left out of quote follow-up as well (they already have no
--    first_sent_at; this makes it explicit).
--
-- 2. A step only counts once firm-chase-send has taken it. The tick used to
--    claim a step, mark it 'sending' and post to the function without looking
--    at the answer. With the function not deployed, every post 404s, the run
--    sits in 'sending' until run_employer_automations marks it failed an hour
--    later, and _invoice_chase_step counts the step as done: the reminder is
--    lost for good. Now:
--      * the post's request id is kept on the run;
--      * each tick first looks at the answers (net._http_response). A post
--        refused at the door (401/403/404, or never connected) is moved aside
--        as 'skipped' with ref 'undelivered:<run>:<old ref>', so the step is
--        pending again and is claimed on a later tick;
--      * while the latest answered post was undelivered, the sender counts as
--        down: one probe a tick, quote follow-ups are not taken over (and any
--        not yet followed up are handed back to the built-in follow-up), and
--        the old invoice_unpaid_reminder rule is not switched off by the
--        schedule (run_employer_automations, patched below).
--    Posts the function answered are finished by the function itself
--    (automation_finish_run). A timeout is NOT retried: the email may have
--    gone, so it is left to the existing one-hour 'Not confirmed' sweep.
--
-- Additive: new helper functions; run_firm_money_chase, firm_chase_run_check
-- keep their signatures (nothing in HEAD or build 49 calls them; the cron
-- does); run_employer_automations is patched in place with one condition.
-- No firm has chasing switched on today (firm_chase_settings is empty).

create or replace function public._invoice_is_unsent_import(p_settings jsonb, p_sent_at timestamptz, p_job_details jsonb)
returns boolean language sql immutable set search_path = public as $$
  select p_sent_at is null
     and (lower(coalesce(p_settings ->> 'imported', '')) = 'true'
          or jsonb_typeof(p_job_details -> 'imported') = 'object')
$$;
revoke all on function public._invoice_is_unsent_import(jsonb, timestamptz, jsonb) from public, anon;

-- Runs whose post never reached firm-chase-send: back to pending.
create or replace function public._firm_chase_reconcile_undelivered()
returns int language plpgsql security definer set search_path = public as $$
declare n int;
begin
  with gone as (
    select r.id, h.status_code, h.error_msg
      from public.employer_automation_runs r
      join net._http_response h
        on h.id = case when coalesce(r.detail ->> 'request_id', '') ~ '^[0-9]+$'
                       then (r.detail ->> 'request_id')::bigint end
     where r.rule_key in ('invoice_chase', 'quote_followup') and r.status = 'sending'
       and (h.status_code in (401, 403, 404)
            or (h.status_code is null and not coalesce(h.timed_out, false) and h.error_msg is not null))
  )
  update public.employer_automation_runs r
     set status = 'skipped',
         ref = 'undelivered:' || r.id::text || ':' || r.ref,
         finished_at = now(),
         summary = 'Not sent yet: the chasing service did not take it. It will be tried again on the next run.',
         detail = r.detail || jsonb_build_object('undelivered', true, 'http_status', g.status_code,
                                                 'error', left(coalesce(g.error_msg, ''), 200))
    from gone g
   where r.id = g.id and r.status = 'sending';
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public._firm_chase_reconcile_undelivered() from public, anon, authenticated;

-- Down = the most recent answered chase post was refused at the door.
create or replace function public._firm_chase_sender_down()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((
    select coalesce((r.detail ->> 'undelivered')::boolean, false)
      from public.employer_automation_runs r
     where r.rule_key in ('invoice_chase', 'quote_followup')
       and r.detail ? 'request_id' and r.status <> 'sending'
     order by coalesce(r.dispatched_at, r.created_at) desc
     limit 1), false)
$$;
revoke all on function public._firm_chase_sender_down() from public, anon, authenticated;

CREATE OR REPLACE FUNCTION public.run_firm_money_chase(p_now timestamp with time zone DEFAULT now())
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  v_req bigint;
  v_down boolean;
  v_probed boolean := false;
  n_back int := 0;
begin
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;

  -- 0. A send that never reached firm-chase-send did not happen. The function
  -- reports every send it handles (automation_finish_run); a run still
  -- 'sending' whose post came back 401/403/404, or never connected, was
  -- refused at the door, most often because the function is not deployed.
  -- Give the step back (the ref moves aside, so the step can be claimed
  -- again) and keep the row as a record of the attempt.
  n_back := public._firm_chase_reconcile_undelivered();
  v_down := public._firm_chase_sender_down();

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
         -- ELE-2067: an invoice brought in by an import and never sent from
         -- Elec-Mate is not ours to chase.
         and not public._invoice_is_unsent_import(q.settings, q.invoice_sent_at, q.job_details)
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
        -- The sender is not live: one probe a tick, the rest stay pending.
        if v_down and v_probed then continue; end if;
        v_run := public._automation_claim(f.employer_id, 'invoice_chase', i.id || ':' || v_off, null,
          'Chasing ' || coalesce(i.client, 'the customer') || ' about invoice ' || coalesce(i.invoice_number, ''),
          'queued', jsonb_build_object('invoice_id', i.id, 'offset', v_off, 'channel', 'email',
                                       'tone', coalesce(v_step->>'tone', 'gentle'),
                                       'subject', v_subject, 'body', v_body));
        if v_run is not null then
          -- Straight to sending: run_employer_automations only dispatches its own rules.
          update public.employer_automation_runs set status = 'sending', dispatched_at = p_now where id = v_run;
          select net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-chase-send',
            headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
            body := jsonb_build_object('run_id', v_run)) into v_req;
          update public.employer_automation_runs set detail = detail || jsonb_build_object('request_id', v_req) where id = v_run;
          v_probed := true;
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
    -- While the sender is not live, the built-in follow-up keeps going: hand
    -- back any quote taken over that this schedule has not followed up yet.
    if v_down then
      with back as (
        delete from public.firm_quote_followup_takeovers t
         where t.employer_id = f.employer_id
           and not exists (select 1 from public.employer_automation_runs r
                            where r.employer_id = f.employer_id and r.rule_key = 'quote_followup'
                              and r.ref like t.quote_id::text || ':%' and r.status in ('done', 'sending'))
        returning t.quote_id
      )
      update public.quotes q set auto_followup_enabled = true from back b
       where q.id = b.quote_id and q.status = 'sent' and q.acceptance_status = 'pending';
    end if;
    -- Take over the built-in follow-up so a customer is never chased twice.
    with taken as (
      insert into public.firm_quote_followup_takeovers (quote_id, employer_id)
      select q.id, f.employer_id from public.quotes q
       where q.user_id = f.employer_id and q.deleted_at is null and q.status = 'sent'
         and q.acceptance_status = 'pending' and coalesce(q.auto_followup_enabled, false)
         and not coalesce(q.invoice_raised, false)
         and not v_down
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
         and lower(coalesce(x.settings->>'imported', '')) <> 'true'
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
        if v_down and v_probed then continue; end if;
        v_run := public._automation_claim(f.employer_id, 'quote_followup', qr.id || ':' || v_off, null,
          'Following up quote ' || coalesce(qr.quote_number, '') || ' with ' || coalesce(qr.client, 'the customer'),
          'queued', jsonb_build_object('quote_id', qr.id, 'day', v_off,
                                       'subject', nullif(btrim(coalesce(v_step->>'subject', '')), ''),
                                       'body', nullif(btrim(coalesce(v_step->>'body', '')), '')));
        if v_run is not null then
          update public.employer_automation_runs set status = 'sending', dispatched_at = p_now where id = v_run;
          select net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-chase-send',
            headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
            body := jsonb_build_object('run_id', v_run)) into v_req;
          update public.employer_automation_runs set detail = detail || jsonb_build_object('request_id', v_req) where id = v_run;
          v_probed := true;
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
                              'quote_followups', n_quote, 'quotes_taken_over', n_take, 'retention_reminders', 0,
                              'given_back', n_back, 'sender_down', v_down);
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
                            'quote_followups', n_quote, 'quotes_taken_over', n_take, 'retention_reminders', n_ret,
                            'given_back', n_back, 'sender_down', v_down);
end;
$function$;

CREATE OR REPLACE FUNCTION public.firm_chase_run_check(p_run uuid)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    if public._invoice_is_unsent_import(q.settings, q.invoice_sent_at, q.job_details) then
      return 'Not sent: this invoice was imported from another system and has not been sent from Elec-Mate.';
    end if;
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
$function$;

-- The old unpaid-invoice rule stays on while the schedule cannot send.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.run_employer_automations(timestamptz)'::regprocedure);
  if position('_firm_chase_sender_down' in d) > 0 then return; end if;
  n := replace(d,
    $a$where cs.employer_id = r.employer_id and cs.invoice_enabled)$a$,
    $a$where cs.employer_id = r.employer_id and cs.invoice_enabled
                                    and not public._firm_chase_sender_down())$a$);
  if n = d then raise exception 'run_employer_automations patch did not apply'; end if;
  execute n;
end
$mig$;
