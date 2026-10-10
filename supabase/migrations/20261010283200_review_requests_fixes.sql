-- Gap #9 fixes after the rolled-back tests:
--  1. Two invoices for the same customer due in the same tick could both go:
--     the no-repeat check now counts a request that is already being sent.
--  2. Texts: with the default wording the text ran to 3 SMS credits. A text
--     with no custom wording now uses a short default (2 credits with the link).

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
  select max(coalesce(x.sent_at, x.dispatched_at)) into v_prev from public.employer_review_requests x
   where x.employer_id = r.employer_id and x.status in ('sent', 'sending') and x.id <> r.id
     and coalesce(x.sent_at, x.dispatched_at) > now() - v_cool
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

create or replace function public._review_sms_body(p_message text, p_firm_name text, p_first text, p_link text)
returns text language sql immutable set search_path to 'public' as $$
  select 'Hi ' || coalesce(nullif(p_first, ''), 'there') || ', '
         || case when nullif(btrim(coalesce(p_message, '')), '') is null
                 then 'thanks for choosing ' || coalesce(nullif(p_firm_name, ''), 'us')
                      || '. If you have a minute, an honest review would really help:'
                 else public._review_paragraph(p_message, p_firm_name, p_first) end
         || ' ' || coalesce(p_link, '') || ' Reply STOP to opt out.'
$$;
