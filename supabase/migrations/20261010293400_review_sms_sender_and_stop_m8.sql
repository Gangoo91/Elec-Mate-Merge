-- M8 (review of the review-request feature): review texts went from
-- coalesce(sms_number, sender_name) and always said "Reply STOP to opt out."
--
-- Now review_record_sms picks the sender the way queue_customer_message does
-- since 20261010285300: the firm's own texting number, else its enabled phone
-- line (_firm_line_number), else the sender name. A text from a sender NAME
-- cannot be replied to, so "Reply STOP" would be a false promise: the line is
-- replaced with the request's own opt-out link (review-link ?a=stop, the same
-- link the email carries in List-Unsubscribe). The function returns the body
-- it recorded, and employer-review-request-send sends that body.
--
-- Signature unchanged (only employer-review-request-send calls it; not in
-- HEAD or build 49). Nothing is live: employer_review_requests is empty.

create or replace function public.review_record_sms(p_id uuid, p_body text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r public.employer_review_requests;
  s public.firm_messaging_settings;
  v_id uuid;
  v_status text;
  v_from text;
  v_body text := p_body;
begin
  select * into r from public.employer_review_requests where id = p_id;
  if r.id is null or r.status <> 'sending' or r.channel <> 'sms' then return null; end if;
  s := public._msg_settings(r.employer_id);
  v_status := case when s.provider = 'sandbox' then 'sandbox' else 'sending' end;
  v_from := coalesce(s.sms_number, public._firm_line_number(r.employer_id), s.sender_name);
  -- A name cannot take a reply: give the opt-out link instead of "Reply STOP".
  if coalesce(v_from, '') !~ '^\+?[0-9][0-9 ]{6,17}$' then
    v_body := replace(coalesce(p_body, ''), ' Reply STOP to opt out.',
                      ' To stop these texts: ' || public._review_link_base() || '?t=' || r.token || '&a=stop');
  end if;
  insert into public.firm_customer_messages
    (firm_id, customer_id, job_id, channel, direction, body, template_key, to_address, from_address,
     status, provider, segments)
  values (r.employer_id, r.customer_id, r.job_id, 'sms', 'out', v_body, 'review_request', r.to_address,
          v_from, v_status, s.provider, public._msg_segments(v_body))
  returning id into v_id;
  update public.employer_review_requests set message_id = v_id, updated_at = now() where id = p_id;
  return jsonb_build_object('message_id', v_id, 'status', v_status, 'provider', s.provider,
                            'from', v_from, 'body', v_body,
                            'whatsapp_phone_number_id', s.whatsapp_phone_number_id);
end $function$;
revoke all on function public.review_record_sms(uuid, text) from public, anon, authenticated;
