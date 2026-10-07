-- ELE-2022 item 7: one inbox. Quote-page leads (/get-quote/:slug → employer_leads)
-- also arrive in Enquiries, read by AI with alerts and visit suggestions. The
-- Employer Hub Leads pipeline keeps its own row untouched.
-- Also adds the phone / SMS sources for the Twilio phase (item 5).

alter table public.enquiries drop constraint if exists enquiries_source_check;
alter table public.enquiries add constraint enquiries_source_check
  check (source in ('website','email','checkatrade','mybuilder','bark','ratedpeople','trustatrader',
                    'yell','form_post','manual','quote_page','phone','sms'));

alter table public.enquiries
  add column if not exists employer_lead_id uuid references public.employer_leads(id) on delete set null;
comment on column public.enquiries.employer_lead_id is 'The Employer Hub lead this enquiry mirrors (quote-page submissions).';

create or replace function public.tg_employer_lead_to_enquiry()
returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_token text;
  v_key text;
begin
  if coalesce(new.source, '') <> 'Quote page' then
    return new;
  end if;

  -- The account's inbox (created on first use, same as the app does)
  insert into public.enquiry_inboxes (user_id, token)
  values (new.user_id, substr(md5(gen_random_uuid()::text), 1, 10))
  on conflict (user_id) do nothing;
  select form_token into v_token from public.enquiry_inboxes where user_id = new.user_id and enabled;
  if v_token is null then
    return new;
  end if;

  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if v_key is null then
    return new;
  end if;

  -- Async: the lead is saved regardless of what happens next
  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/inbound-enquiry-email?token=' || v_token,
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
    body := jsonb_build_object(
      'name', new.name,
      'email', new.email,
      'phone', new.phone,
      'message', coalesce(new.notes, ''),
      'channel', 'quote_page',
      'employer_lead_id', new.id
    ),
    timeout_milliseconds := 30000
  );
  return new;
exception when others then
  -- Never block a lead because the mirror failed
  return new;
end $$;

drop trigger if exists employer_lead_to_enquiry on public.employer_leads;
create trigger employer_lead_to_enquiry after insert on public.employer_leads
  for each row execute function public.tg_employer_lead_to_enquiry();
