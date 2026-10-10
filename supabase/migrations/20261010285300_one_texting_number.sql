-- Gap analysis §4 item 10: customer texts had two numbers and two paths.
--
--   phone_lines.twilio_number   (ELE-2022 enquiries: missed calls, voicemail,
--                                texts; webhook twilio-inbound, DEPLOYED in
--                                test mode)
--   firm_messaging_settings.sms_number (ELE-2070 customer inbox; webhook
--                                customer-message-inbound, NOT deployed)
--
-- Live today: 0 phone_lines, 0 messaging settings, 0 messages, no Twilio
-- account. So this settles the design before any number exists.
--
-- Chosen: ONE number per account, the phone line (phone_lines). It has to be
-- that one: a Twilio number has a single voice URL and a single SMS URL, and
-- the voice side (missed calls, voicemail) only exists in twilio-inbound.
--   * Its SMS webhook is twilio-inbound. A text from someone who is already a
--     client (or whom the firm has texted in the last 30 days, or a STOP /
--     START reply) goes to the customer inbox through the inbox's own
--     _customer_inbound_record; anyone else is an enquiry, as now. That is
--     "enquiry texts from known clients show in the inbox", and a customer is
--     never answered from two places. Only for a firm (it has messaging
--     settings or staff); a sole trader's texts stay enquiries.
--   * customer-message-inbound keeps WhatsApp (Meta or Twilio), delivery
--     receipts and the internal relay. Its number lookup now also knows the
--     phone line, so either webhook finds the same firm.
--   * Sending: the inbox sends from the firm's sms_number if Elec-Mate set
--     one, else from the phone line, else the one-way sender name. Settings ›
--     Messaging shows that same number.
--
-- Additive: three new internal functions; _msg_firm_for_number (ELE-2070,
-- not called by HEAD) redefined with the same signature; queue_customer_message
-- and get_firm_messaging (ELE-2070, not called by HEAD) patched in place.

create or replace function public._firm_line_number(p_firm uuid)
returns text language sql stable security definer set search_path to 'public' as $$
  select public._msg_e164(pl.twilio_number) from public.phone_lines pl
   where pl.user_id = p_firm and pl.enabled and pl.twilio_number is not null
   order by pl.created_at limit 1
$$;
revoke all on function public._firm_line_number(uuid) from public, anon, authenticated;

create or replace function public._msg_firm_for_number(p_channel text, p_to text)
returns uuid language sql stable security definer set search_path to 'public' as $$
  select coalesce(
    (select firm_id from public.firm_messaging_settings
      where (p_channel = 'sms' and sms_number = public._msg_e164(p_to))
         or (p_channel = 'whatsapp' and (whatsapp_number = public._msg_e164(p_to) or whatsapp_phone_number_id = p_to))
      limit 1),
    -- Gap §4.10: the account's phone line is its texting number too.
    (select pl.user_id from public.phone_lines pl
      where p_channel = 'sms' and pl.enabled and pl.twilio_number is not null
        and public._msg_e164(pl.twilio_number) = public._msg_e164(p_to)
      order by pl.created_at limit 1))
$$;
revoke all on function public._msg_firm_for_number(text, text) from public, anon, authenticated;

-- Does a text from p_from belong in the firm's customer inbox rather than
-- the enquiries inbox? Service role only (twilio-inbound).
create or replace function public._msg_inbound_is_customer(p_firm uuid, p_from text)
returns boolean language sql stable security definer set search_path to 'public' as $$
  with f as (select public._msg_e164(p_from) as num)
  select p_firm is not null and (select num from f) is not null
     and (exists (select 1 from public.firm_messaging_settings s where s.firm_id = p_firm)
          or exists (select 1 from public.employer_employees e where e.employer_id = p_firm))
     and (exists (select 1 from public.customers c
                   where c.user_id = p_firm and public._msg_e164(c.phone) = (select num from f))
          or exists (select 1 from public.firm_customer_messages m
                      where m.firm_id = p_firm and m.direction = 'out' and m.to_address = (select num from f)
                        and m.created_at > now() - interval '30 days')
          or exists (select 1 from public.firm_message_opt_outs o
                      where o.firm_id = p_firm and o.address = (select num from f)))
$$;
revoke all on function public._msg_inbound_is_customer(uuid, text) from public, anon, authenticated;
grant execute on function public._msg_inbound_is_customer(uuid, text) to service_role;

do $do$
declare
  v_sig regprocedure;
  v_def text;
  v_from text;
begin
  -- Sending from the one number.
  select p.oid::regprocedure into v_sig from pg_proc p
   where p.pronamespace = 'public'::regnamespace and p.proname = 'queue_customer_message';
  v_def := pg_get_functiondef(v_sig);
  v_from := 'when ''sms'' then coalesce(s.sms_number, s.sender_name)';
  if position(v_from in v_def) = 0 then raise exception 'queue_customer_message: sender text not found'; end if;
  execute replace(v_def, v_from,
    'when ''sms'' then coalesce(s.sms_number, public._firm_line_number(v_firm), s.sender_name)');

  -- Settings › Messaging shows that number.
  v_sig := 'public.get_firm_messaging(uuid)'::regprocedure;
  v_def := pg_get_functiondef(v_sig);
  v_from := '''sms_number'', s.sms_number,';
  if position(v_from in v_def) = 0 then raise exception 'get_firm_messaging: sms_number text not found'; end if;
  execute replace(v_def, v_from, '''sms_number'', coalesce(s.sms_number, public._firm_line_number(v_firm)),');
end
$do$;
