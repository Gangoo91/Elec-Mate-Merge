-- Gap #9 part 2: deciding, the tick, the sender's helpers, click and opt-out
-- functions, and the cron job. See 20261010283000 for the tables.

-- ── Deciding whether a waiting request may go ───────────────────────────────
-- Returns {ok, channel, to, reason}. Reads only; the tick acts on it.
create or replace function public._review_decide(p_id uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  r public.employer_review_requests;
  s public.employer_review_settings;
  q public.quotes;
  c public.customers;
  j public.employer_jobs;
  m public.firm_messaging_settings;
  v_email text;
  v_phone text;
  v_prev timestamptz;
  v_cool interval;
  v_sms_ok boolean := false;
  v_email_ok boolean := false;
  v_email_reason text;
  v_sms_reason text;
begin
  select * into r from public.employer_review_requests where id = p_id;
  if r.id is null then return jsonb_build_object('ok', false, 'reason', 'Not sent: the request no longer exists.'); end if;
  select * into s from public.employer_review_settings where employer_id = r.employer_id;
  if s.employer_id is null or not s.enabled then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: review requests were turned off before it was due.');
  end if;
  if exists (select 1 from public.employer_automation_settings a where a.employer_id = r.employer_id and a.paused) then
    return jsonb_build_object('ok', false, 'wait', true, 'reason', 'Waiting: automations are paused for the firm.');
  end if;
  if jsonb_array_length(public._review_links(s)) = 0 then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: there is no review link in the settings.');
  end if;

  select * into q from public.quotes where id = r.invoice_id;
  if q.id is null or q.deleted_at is not null or q.user_id <> r.employer_id then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: the invoice was deleted.');
  end if;
  if lower(coalesce(q.invoice_status, '')) <> 'paid' then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: the invoice is no longer marked paid.');
  end if;
  if coalesce(public._invoice_is_unsent_import(q.settings, q.invoice_sent_at, q.job_details), false) then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: imported invoices are never followed up.');
  end if;

  if r.job_id is not null and exists (
       select 1 from public.employer_review_requests x
        where x.employer_id = r.employer_id and x.job_id = r.job_id and x.id <> r.id and x.status in ('sent', 'sending')) then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: this customer was already asked about this job.');
  end if;

  -- The payment receipt already carried the review buttons (Electrical Hub setting).
  if q.payment_thankyou_sent_at is not null and exists (
       select 1 from public.company_profiles cp
        where cp.user_id = r.employer_id and cp.review_request_enabled
          and jsonb_typeof(cp.review_links) = 'array' and jsonb_array_length(cp.review_links) > 0) then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: their payment receipt already asked for a review.');
  end if;

  if q.customer_id is not null then select * into c from public.customers where id = q.customer_id; end if;
  if q.employer_job_id is not null then select * into j from public.employer_jobs where id = q.employer_job_id; end if;
  if c.campaign_opted_out_at is not null then
    return jsonb_build_object('ok', false, 'reason', 'Not sent: this customer opted out of marketing messages.');
  end if;

  v_email := lower(nullif(btrim(coalesce(nullif(btrim(c.email), ''), nullif(btrim(q.client_data->>'email'), ''), j.client_email)), ''));
  v_phone := public._msg_e164(coalesce(nullif(btrim(c.phone), ''), nullif(btrim(q.client_data->>'phone'), ''), j.client_phone));
  v_cool := make_interval(days => s.cooldown_days);

  -- Never twice inside the period: same customer, same address, or the old automation.
  select max(x.sent_at) into v_prev from public.employer_review_requests x
   where x.employer_id = r.employer_id and x.status = 'sent' and x.id <> r.id
     and x.sent_at > now() - v_cool
     and (x.customer_key = r.customer_key
          or (v_email is not null and x.to_address = v_email)
          or (v_phone is not null and x.to_address = v_phone));
  if v_prev is null and v_email is not null then
    select max(a.finished_at) into v_prev from public.employer_automation_runs a
     where a.employer_id = r.employer_id and a.rule_key = 'job_complete_review_request' and a.status = 'done'
       and a.finished_at > now() - v_cool and lower(coalesce(a.detail->>'to', '')) = v_email;
  end if;
  if v_prev is not null then
    return jsonb_build_object('ok', false, 'reason',
      'Not sent: already asked for a review on ' || to_char(v_prev at time zone 'Europe/London', 'FMDD FMMonth YYYY') || '.');
  end if;

  -- Email
  if v_email is null or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    v_email_reason := 'there is no email address for them';
  elsif exists (select 1 from public.employer_review_opt_outs o where o.employer_id = r.employer_id and o.address = v_email)
     or exists (select 1 from public.firm_message_opt_outs o
                 where o.firm_id = r.employer_id and o.channel = 'email' and o.address = v_email and o.opted_back_in_at is null)
     or (c.id is not null and exists (select 1 from public.client_comms_consent k
                 where k.customer_id = c.id and k.channel = 'email' and k.consented is false and k.withdrawn_at is not null)) then
    v_email_reason := 'they opted out of emails from you';
  elsif exists (select 1 from public.email_suppressions e where lower(e.email) = v_email) then
    v_email_reason := 'their address is on the do-not-send list';
  else
    v_email_ok := true;
  end if;

  -- Text (only once the firm's provider is live)
  if s.channel = 'sms' then
    select * into m from public.firm_messaging_settings where firm_id = r.employer_id;
    if coalesce(m.provider, 'sandbox') = 'sandbox' or not coalesce(m.sms_enabled, true) then
      v_sms_reason := 'texts are not live yet';
    elsif v_phone is null or (v_phone like '+44%' and v_phone !~ '^\+447[1-57-9][0-9]{8}$') then
      v_sms_reason := 'there is no mobile number for them';
    elsif exists (select 1 from public.employer_review_opt_outs o where o.employer_id = r.employer_id and o.address = v_phone)
       or exists (select 1 from public.firm_message_opt_outs o
                   where o.firm_id = r.employer_id and o.channel = 'sms' and o.address = v_phone and o.opted_back_in_at is null)
       or (c.id is not null and exists (select 1 from public.client_comms_consent k
                   where k.customer_id = c.id and k.channel = 'sms' and k.consented is false and k.withdrawn_at is not null)) then
      v_sms_reason := 'they opted out of texts';
    elsif public._msg_used_this_month(r.employer_id) + 2 > coalesce(m.monthly_allowance, 100) then
      v_sms_reason := 'this month''s text allowance is used up';
    else
      v_sms_ok := true;
    end if;
  end if;

  if v_sms_ok then
    return jsonb_build_object('ok', true, 'channel', 'sms', 'to', v_phone);
  elsif v_email_ok then
    return jsonb_build_object('ok', true, 'channel', 'email', 'to', v_email,
                              'note', case when s.channel = 'sms' then 'Emailed because ' || v_sms_reason || '.' end);
  end if;
  return jsonb_build_object('ok', false, 'reason',
    'Not sent: ' || coalesce(case when s.channel = 'sms' then v_sms_reason || ', and ' end, '')
    || coalesce(v_email_reason, 'there is no way to reach them') || '.');
end $$;
revoke all on function public._review_decide(uuid) from public, anon, authenticated;

-- ── The tick ────────────────────────────────────────────────────────────────
create or replace function public.run_review_requests(p_now timestamptz default now())
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  v_local timestamp := p_now at time zone 'Europe/London';
  v_dow int := extract(isodow from v_local);
  v_hour int := extract(hour from v_local);
  v_key text;
  v_queued int := 0;
  v_sent int := 0;
  v_skipped int := 0;
  v_back int := 0;
  d jsonb;
  q record;
  v_req bigint;
begin
  -- 1. Paid invoices since the firm switched this on: one waiting row each.
  insert into public.employer_review_requests
    (employer_id, invoice_id, job_id, customer_id, customer_key, client_name, invoice_number, base_at, due_at, summary)
  select s.employer_id, x.id, x.employer_job_id, x.customer_id,
         public._chase_customer_key(x.customer_id, x.client_data),
         coalesce(nullif(btrim(x.client_data->>'name'), ''), c.name, j.client),
         x.invoice_number,
         greatest(x.invoice_paid_at, coalesce(j.completed_at, x.invoice_paid_at)),
         greatest(x.invoice_paid_at, coalesce(j.completed_at, x.invoice_paid_at)) + make_interval(days => s.delay_days),
         'Waiting to ask'
    from public.employer_review_settings s
    join public.quotes x on x.user_id = s.employer_id
    left join public.employer_jobs j on j.id = x.employer_job_id
    left join public.customers c on c.id = x.customer_id
   where s.enabled and s.enabled_at is not null
     and x.invoice_raised is true and x.deleted_at is null
     and lower(coalesce(x.invoice_status, '')) = 'paid'
     and x.invoice_paid_at is not null and x.invoice_paid_at >= s.enabled_at and x.invoice_paid_at <= p_now
     and not coalesce(public._invoice_is_unsent_import(x.settings, x.invoice_sent_at, x.job_details), false)
     -- "Job done and paid": with a job on the invoice, wait for the job to be complete.
     and (not s.wait_for_job_complete or x.employer_job_id is null or j.id is null
          or j.completed_at is not null or lower(coalesce(j.status, '')) in ('complete', 'completed'))
     and not exists (select 1 from public.employer_review_requests e
                      where e.employer_id = s.employer_id and e.invoice_id = x.id)
  on conflict (employer_id, invoice_id) do nothing;
  get diagnostics v_queued = row_count;

  -- 2. Posts the sender never took (not deployed, 401/404): back to waiting, a few times.
  for q in
    select r.id, r.attempts, h.status_code
      from public.employer_review_requests r
      join net._http_response h on h.id = r.request_id
     where r.status = 'sending'
       and (h.status_code in (401, 403, 404)
            or (h.status_code is null and not coalesce(h.timed_out, false) and h.error_msg is not null))
  loop
    if q.attempts >= 5 then
      update public.employer_review_requests
         set status = 'failed', summary = 'Not sent: the sending service did not answer. Nothing reached the customer.',
             updated_at = p_now
       where id = q.id and status = 'sending';
    else
      update public.employer_review_requests
         set status = 'queued', request_id = null, due_at = p_now + interval '1 hour', updated_at = p_now,
             summary = 'Waiting to ask (the sending service was not ready, trying again)'
       where id = q.id and status = 'sending';
      v_back := v_back + 1;
    end if;
  end loop;

  -- 3. Hand over what is due, Monday to Saturday, 9am to 7pm UK time.
  if v_dow between 1 and 6 and v_hour between 9 and 18 then
    select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    for q in
      select r.id from public.employer_review_requests r
       where r.status = 'queued' and r.due_at <= p_now
       order by r.due_at limit 25
       for update skip locked
    loop
      d := public._review_decide(q.id);
      if coalesce((d->>'ok')::boolean, false) then
        if v_key is null then
          raise warning '[run_review_requests] service_role_key not in vault';
          exit;
        end if;
        update public.employer_review_requests
           set status = 'sending', channel = d->>'channel', to_address = d->>'to',
               summary = coalesce(d->>'note', 'Sending'), dispatched_at = p_now,
               attempts = attempts + 1, updated_at = p_now
         where id = q.id;
        select net.http_post(
          url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-review-request-send',
          headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
          body := jsonb_build_object('request_id', q.id)) into v_req;
        update public.employer_review_requests set request_id = v_req where id = q.id;
        v_sent := v_sent + 1;
      elsif coalesce((d->>'wait')::boolean, false) then
        update public.employer_review_requests set summary = d->>'reason', updated_at = p_now where id = q.id;
      else
        update public.employer_review_requests
           set status = 'skipped', summary = d->>'reason', updated_at = p_now
         where id = q.id;
        v_skipped := v_skipped + 1;
      end if;
    end loop;
  end if;

  -- 4. Handed over but never confirmed for an hour: failed, not retried.
  update public.employer_review_requests
     set status = 'failed', updated_at = p_now,
         summary = 'Not confirmed as sent. Check with the customer before asking again.'
   where status = 'sending' and dispatched_at < p_now - interval '1 hour';

  return jsonb_build_object('queued', v_queued, 'dispatched', v_sent, 'skipped', v_skipped, 'retry', v_back);
end $$;
revoke all on function public.run_review_requests(timestamptz) from public, anon, authenticated;

-- ── For the sender (service role only) ──────────────────────────────────────

-- Everything the email or text needs, for a request that is `sending`.
create or replace function public.review_request_message(p_id uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  r public.employer_review_requests;
  s public.employer_review_settings;
  cp public.company_profiles;
  j public.employer_jobs;
  v_firm_name text;
  v_first text;
begin
  select * into r from public.employer_review_requests where id = p_id;
  if r.id is null or r.status <> 'sending' then return null; end if;
  select * into s from public.employer_review_settings where employer_id = r.employer_id;
  select * into cp from public.company_profiles where user_id = r.employer_id limit 1;
  if r.job_id is not null then select * into j from public.employer_jobs where id = r.job_id; end if;
  v_firm_name := public._review_firm_name(r.employer_id);
  v_first := public._review_first_name(r.client_name);
  return jsonb_build_object(
    'id', r.id, 'employer_id', r.employer_id, 'token', r.token, 'channel', r.channel, 'to', r.to_address,
    'job_id', r.job_id, 'job_title', nullif(btrim(j.title), ''),
    'client_name', r.client_name, 'first_name', v_first,
    'paragraph', public._review_paragraph(s.message, v_firm_name, v_first),
    'sms_body', public._review_sms_body(s.message, v_firm_name, v_first, public._review_link_base() || '?t=' || r.token),
    'links', public._review_links(s),
    'company', jsonb_build_object(
      'name', v_firm_name, 'email', cp.company_email, 'phone', cp.company_phone,
      'website', cp.company_website, 'address', cp.company_address,
      'logo_url', coalesce(cp.logo_url, cp.logo_data_url), 'color', coalesce(cp.accent_color, cp.primary_color)));
end $$;
revoke all on function public.review_request_message(uuid) from public, anon, authenticated;

-- A text: stored in the customer inbox like any other message, so the office
-- sees it in the thread and it counts against the allowance.
create or replace function public.review_record_sms(p_id uuid, p_body text)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  r public.employer_review_requests;
  s public.firm_messaging_settings;
  v_id uuid;
  v_status text;
begin
  select * into r from public.employer_review_requests where id = p_id;
  if r.id is null or r.status <> 'sending' or r.channel <> 'sms' then return null; end if;
  s := public._msg_settings(r.employer_id);
  v_status := case when s.provider = 'sandbox' then 'sandbox' else 'sending' end;
  insert into public.firm_customer_messages
    (firm_id, customer_id, job_id, channel, direction, body, template_key, to_address, from_address,
     status, provider, segments)
  values (r.employer_id, r.customer_id, r.job_id, 'sms', 'out', p_body, 'review_request', r.to_address,
          coalesce(s.sms_number, s.sender_name), v_status, s.provider, public._msg_segments(p_body))
  returning id into v_id;
  update public.employer_review_requests set message_id = v_id, updated_at = now() where id = p_id;
  return jsonb_build_object('message_id', v_id, 'status', v_status, 'provider', s.provider,
                            'from', coalesce(s.sms_number, s.sender_name),
                            'whatsapp_phone_number_id', s.whatsapp_phone_number_id);
end $$;
revoke all on function public.review_record_sms(uuid, text) from public, anon, authenticated;

create or replace function public.finish_review_request(p_id uuid, p_status text, p_summary text, p_detail jsonb default '{}'::jsonb)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare r public.employer_review_requests;
begin
  if p_status not in ('sent', 'skipped', 'failed') then raise exception 'bad status'; end if;
  update public.employer_review_requests
     set status = p_status,
         summary = coalesce(nullif(btrim(p_summary), ''), summary),
         sent_at = case when p_status = 'sent' then now() else sent_at end,
         updated_at = now()
   where id = p_id and status = 'sending'
  returning * into r;
  if r.id is null then return; end if;
  insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
  values (r.employer_id, null, 'review_request', 'employer_review_request', r.id,
          jsonb_build_object('status', r.status, 'summary', r.summary, 'invoice_id', r.invoice_id,
                             'job_id', r.job_id, 'channel', r.channel) || coalesce(p_detail, '{}'::jsonb));
  if r.status = 'sent' and r.job_id is not null then
    insert into public.employer_job_comments (job_id, author_name, content, comment_type)
    values (r.job_id, 'Automation', r.summary, 'customer_contact');
  end if;
end $$;
revoke all on function public.finish_review_request(uuid, text, text, jsonb) from public, anon, authenticated;

-- ── For review-link (service role only; the token is the key) ───────────────

-- The firm's links for a request, for the "pick a site" page.
create or replace function public.review_link_target(p_token uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select jsonb_build_object('firm_name', public._review_firm_name(r.employer_id),
                            'links', public._review_links(s),
                            'opted_out', r.opted_out_at is not null)
    from public.employer_review_requests r
    join public.employer_review_settings s on s.employer_id = r.employer_id
   where r.token = p_token and r.status = 'sent'
$$;
revoke all on function public.review_link_target(uuid) from public, anon, authenticated;

-- A click: count it and return where to send them. Only the firm's own saved
-- link is ever returned, so this can never redirect somewhere else.
create or replace function public.record_review_click(p_token uuid, p_platform text)
returns text language plpgsql volatile security definer set search_path to 'public' as $$
declare
  r public.employer_review_requests;
  v_url text;
begin
  if p_platform is not null and p_platform not in ('google', 'checkatrade', 'trustatrader', 'facebook') then
    return null;
  end if;
  select * into r from public.employer_review_requests where token = p_token and status = 'sent';
  if r.id is null then return null; end if;
  select l->>'url' into v_url
    from public.employer_review_settings s, jsonb_array_elements(public._review_links(s)) l
   where s.employer_id = r.employer_id and (p_platform is null or l->>'key' = p_platform)
   limit 1;
  if v_url is null then return null; end if;
  update public.employer_review_requests
     set click_count = click_count + 1,
         clicks = clicks || jsonb_build_object(coalesce(p_platform, 'any'),
                    coalesce((clicks->>coalesce(p_platform, 'any'))::int, 0) + 1),
         first_clicked_at = coalesce(first_clicked_at, now()),
         last_clicked_at = now(), updated_at = now()
   where id = r.id;
  return v_url;
end $$;
revoke all on function public.record_review_click(uuid, text) from public, anon, authenticated;

-- "Stop asking me": never asked by this firm again, on this address.
create or replace function public.review_request_opt_out(p_token uuid)
returns text language plpgsql volatile security definer set search_path to 'public' as $$
declare r public.employer_review_requests;
begin
  select * into r from public.employer_review_requests where token = p_token and status = 'sent';
  if r.id is null or r.to_address is null then return null; end if;
  insert into public.employer_review_opt_outs (employer_id, address, request_id)
  values (r.employer_id, r.to_address, r.id) on conflict do nothing;
  update public.employer_review_requests set opted_out_at = coalesce(opted_out_at, now()), updated_at = now()
   where id = r.id;
  return public._review_firm_name(r.employer_id);
end $$;
revoke all on function public.review_request_opt_out(uuid) from public, anon, authenticated;

-- ── Schedule ────────────────────────────────────────────────────────────────
do $$
begin
  perform cron.unschedule('employer-review-requests')
   where exists (select 1 from cron.job where jobname = 'employer-review-requests');
  perform cron.schedule('employer-review-requests', '3,13,23,33,43,53 * * * *', 'select public.run_review_requests();');
end $$;
