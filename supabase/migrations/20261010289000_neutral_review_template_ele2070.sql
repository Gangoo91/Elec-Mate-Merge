-- ELE-2070 / ELE-2093 — the inbox's default "review request" text asked only
-- happy customers ("If you were happy with the work…"). CMA guidance on fake
-- reviews (CMA208, DMCC Act 2024 Sch 20, para 4.5) treats asking only satisfied
-- customers as cherry-picking. Ask everyone for an honest review instead.
-- Same signature and other templates unchanged. No firm has saved this
-- template yet (firm_message_templates holds 0 copies of the old wording).
create or replace function public._msg_default_template(p_key text)
returns text
language sql
immutable
set search_path to 'public'
as $function$
  select case p_key
    when 'booking_confirmation' then
      'Hi {first_name}, this is {firm_name}. Your booking for {job_title} is confirmed for {job_date}. Reply to this message if you need to change it.'
    when 'on_my_way' then
      'Hi {first_name}, {sender_first_name} from {firm_name} is on the way to you now.'
    when 'running_late' then
      'Hi {first_name}, sorry, we are running a little late today. We will be with you as soon as we can. {firm_name}'
    when 'invoice' then
      'Hi {first_name}, your invoice {invoice_number} from {firm_name} is ready. You can view and pay it here: {link}'
    when 'review_request' then
      'Hi {first_name}, thanks for choosing {firm_name}. We would be grateful for an honest review of the work: {link}'
  end
$function$;
