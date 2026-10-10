-- ELE-2070 Customer inbox: two-way SMS, WhatsApp and email with customers,
-- threaded per client and job, alongside the existing portal messages.
--
-- Provider-agnostic. Every firm starts on the "sandbox" provider: messages are
-- stored exactly as they would be sent, counted against the allowance, and
-- never leave Elec-Mate. Elec-Mate (not the firm) switches a firm to a live
-- provider once the provider account exists, by setting provider + numbers
-- with the service role. The edge functions customer-message-send and
-- customer-message-inbound do the provider work; everything that decides
-- WHETHER a message may go (scope, consent, opt-out, allowance, WhatsApp
-- window) lives here so the app and the functions cannot disagree.
--
-- Additive only: four new tables, new functions, two notification types.
-- client_comms_consent (existing, empty, owner-only RLS) is written only by
-- the SECURITY DEFINER functions below.

-- 1 ─ Settings per firm ──────────────────────────────────────────────────────
create table if not exists public.firm_messaging_settings (
  firm_id uuid primary key references public.profiles(id) on delete cascade,
  provider text not null default 'sandbox'
    check (provider in ('sandbox', 'twilio', 'meta', 'bird', 'vonage')),
  sms_enabled boolean not null default true,
  whatsapp_enabled boolean not null default false,
  email_enabled boolean not null default true,
  -- The firm's two-way numbers (E.164), assigned by Elec-Mate on the provider.
  sms_number text check (sms_number is null or sms_number ~ '^\+[1-9][0-9]{7,14}$'),
  whatsapp_number text check (whatsapp_number is null or whatsapp_number ~ '^\+[1-9][0-9]{7,14}$'),
  whatsapp_phone_number_id text,
  -- One-way alphanumeric sender for messages that do not expect a reply.
  sender_name text check (sender_name is null or sender_name ~ '^(?=.*[A-Za-z])[A-Za-z0-9 ]{3,11}$'),
  -- Message credits a month (SMS segments + WhatsApp messages). Set by Elec-Mate.
  monthly_allowance integer not null default 100 check (monthly_allowance between 0 and 100000),
  crew_can_see_job_messages boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
comment on table public.firm_messaging_settings is
  '[EMPLOYER HUB] Customer inbox settings per firm (ELE-2070): provider (sandbox until Elec-Mate switches it on), two-way numbers, sender name, monthly message allowance, crew visibility. Scope: firm_id = the owning account; owner/admin/office read via my_employer_scope(). Used by: Settings › Messaging, queue_customer_message, customer-message-send/-inbound. Rule: firms change only their switches via save_firm_messaging_settings; provider, numbers and allowance are set by Elec-Mate with the service role.';
alter table public.firm_messaging_settings enable row level security;
drop policy if exists "Firm reads its messaging settings" on public.firm_messaging_settings;
create policy "Firm reads its messaging settings" on public.firm_messaging_settings
  for select to authenticated using (firm_id in (select public.my_employer_scope()));

-- Read inside RLS by crew, who cannot read the settings row itself.
create or replace function public.firm_allows_crew_messages(p_firm uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select coalesce((select crew_can_see_job_messages from public.firm_messaging_settings where firm_id = p_firm), false)
$$;
revoke all on function public.firm_allows_crew_messages(uuid) from public, anon;
grant execute on function public.firm_allows_crew_messages(uuid) to authenticated;

-- 2 ─ Messages (SMS, WhatsApp, email). Portal messages stay in employer_client_messages.
create table if not exists public.firm_customer_messages (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.profiles(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  job_id uuid references public.employer_jobs(id) on delete set null,
  channel text not null check (channel in ('sms', 'whatsapp', 'email')),
  direction text not null check (direction in ('in', 'out')),
  body text not null check (length(body) between 1 and 4000),
  template_key text,
  to_address text,
  from_address text,
  status text not null check (status in ('sandbox', 'queued', 'sending', 'sent', 'delivered', 'failed', 'received')),
  provider text not null,
  provider_message_id text,
  segments integer not null default 1 check (segments between 0 and 20),
  error text,
  sent_by uuid,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.firm_customer_messages is
  '[EMPLOYER HUB] SMS, WhatsApp and email messages to and from a firm''s customers (ELE-2070), linked to customers and employer_jobs. Portal messages stay in employer_client_messages; the inbox RPCs merge both. Scope: firm_id = the owning account; office via my_employer_scope(); crew read their job''s rows only when firm_allows_crew_messages. Used by: client record and job sheet Messages, Customer inbox, Settings usage. Rule: written only by queue_customer_message, _customer_inbound_record and the send function; status sandbox = stored, never sent.';
create unique index if not exists firm_customer_messages_provider_id_key
  on public.firm_customer_messages (provider, provider_message_id) where provider_message_id is not null;
create index if not exists firm_customer_messages_firm_customer_idx
  on public.firm_customer_messages (firm_id, customer_id, created_at desc);
create index if not exists firm_customer_messages_job_idx
  on public.firm_customer_messages (job_id, created_at desc) where job_id is not null;
create index if not exists firm_customer_messages_firm_month_idx
  on public.firm_customer_messages (firm_id, created_at) where direction = 'out';
create index if not exists firm_customer_messages_from_idx
  on public.firm_customer_messages (firm_id, from_address, created_at desc) where direction = 'in';
alter table public.firm_customer_messages enable row level security;
drop policy if exists "Firm office reads customer messages" on public.firm_customer_messages;
create policy "Firm office reads customer messages" on public.firm_customer_messages
  for select to authenticated using (firm_id in (select public.my_employer_scope()));
drop policy if exists "Crew read their job's customer messages when allowed" on public.firm_customer_messages;
create policy "Crew read their job's customer messages when allowed" on public.firm_customer_messages
  for select to authenticated using (
    job_id is not null
    and public.is_assigned_to_job(job_id)
    and public.firm_allows_crew_messages(firm_id));

-- 3 ─ Template wording the firm has changed (defaults live in code below).
create table if not exists public.firm_message_templates (
  firm_id uuid not null references public.profiles(id) on delete cascade,
  key text not null check (key in ('booking_confirmation', 'on_my_way', 'running_late', 'invoice', 'review_request')),
  body text not null check (length(body) between 1 and 1000),
  updated_at timestamptz not null default now(),
  updated_by uuid,
  primary key (firm_id, key)
);
comment on table public.firm_message_templates is
  '[EMPLOYER HUB] A firm''s own wording for the five customer message templates (ELE-2070). Scope: firm_id = the owning account. Used by: Settings › Messaging, preview_customer_message. Rule: no row = the default in _msg_default_template; written only by save_firm_message_template.';
alter table public.firm_message_templates enable row level security;
drop policy if exists "Firm reads its message templates" on public.firm_message_templates;
create policy "Firm reads its message templates" on public.firm_message_templates
  for select to authenticated using (firm_id in (select public.my_employer_scope()));

-- 4 ─ Opt-outs by address, so STOP holds even from a number with no client record.
create table if not exists public.firm_message_opt_outs (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.profiles(id) on delete cascade,
  channel text not null check (channel in ('sms', 'whatsapp', 'email')),
  address text not null,
  customer_id uuid references public.customers(id) on delete set null,
  source text not null check (source in ('stop_reply', 'manual', 'provider')),
  opted_out_at timestamptz not null default now(),
  opted_back_in_at timestamptz,
  recorded_by uuid,
  unique (firm_id, channel, address)
);
comment on table public.firm_message_opt_outs is
  '[EMPLOYER HUB] Numbers and email addresses that opted out of a firm''s messages (STOP reply or set by the office), ELE-2070. Scope: firm_id = the owning account. Used by: queue_customer_message (blocks sends), client record Messages. Rule: never delete; opting back in stamps opted_back_in_at. The per-client consent record is client_comms_consent.';
alter table public.firm_message_opt_outs enable row level security;
drop policy if exists "Firm office reads opt-outs" on public.firm_message_opt_outs;
create policy "Firm office reads opt-outs" on public.firm_message_opt_outs
  for select to authenticated using (firm_id in (select public.my_employer_scope()));

-- 5 ─ Helpers ────────────────────────────────────────────────────────────────
-- UK-first E.164: "07700 900123" → "+447700900123". Null when it is not a number.
create or replace function public._msg_e164(p text)
returns text language plpgsql immutable set search_path to 'public' as $$
declare d text := regexp_replace(coalesce(p, ''), '[^0-9+]', '', 'g');
begin
  if d = '' then return null; end if;
  if d like '+%' then d := '+' || regexp_replace(d, '[^0-9]', '', 'g');
  elsif d like '00%' then d := '+' || substr(d, 3);
  elsif d like '44%' and length(d) >= 12 then d := '+' || d;
  elsif d like '0%' then d := '+44' || substr(d, 2);
  else return null;
  end if;
  if d !~ '^\+[1-9][0-9]{7,14}$' then return null; end if;
  return d;
end $$;

-- SMS segments: GSM-7 160/153 (extension characters count twice), otherwise UCS-2 70/67.
create or replace function public._msg_segments(p_body text)
returns integer language plpgsql immutable set search_path to 'public' as $$
declare
  b text := coalesce(p_body, '');
  n integer := length(b);
  ext integer := length(regexp_replace(b, '[^][{}~|€^\\]', '', 'g'));
  basic text := regexp_replace(b, '[][{}~|€^\\]', '', 'g');
begin
  if n = 0 then return 0; end if;
  if basic ~ ('^[A-Za-z0-9 @£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&''()*+,./:;<=>?¡ÄÖÑÜ§¿äöñüà' || chr(10) || chr(13) || '-]*$') then
    n := n + ext;
    return case when n <= 160 then 1 else ceil(n / 153.0)::int end;
  end if;
  return case when n <= 70 then 1 else ceil(n / 67.0)::int end;
end $$;

create or replace function public._msg_default_template(p_key text)
returns text language sql immutable set search_path to 'public' as $$
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
      'Hi {first_name}, thanks for choosing {firm_name}. If you were happy with the work, a quick review really helps: {link}'
  end
$$;

-- Review requests can count as marketing (PECR reg 22): they always carry the
-- opt-out line, and respect a STOP like everything else.
create or replace function public._msg_is_marketing(p_key text)
returns boolean language sql immutable set search_path to 'public' as $$
  select coalesce(p_key, '') = 'review_request'
$$;

create or replace function public._msg_settings(p_firm uuid)
returns public.firm_messaging_settings
language plpgsql stable security definer set search_path to 'public' as $$
declare s public.firm_messaging_settings;
begin
  select * into s from public.firm_messaging_settings where firm_id = p_firm;
  if s.firm_id is null then
    s.firm_id := p_firm; s.provider := 'sandbox'; s.sms_enabled := true; s.whatsapp_enabled := false;
    s.email_enabled := true; s.monthly_allowance := 100; s.crew_can_see_job_messages := false;
  end if;
  return s;
end $$;
revoke all on function public._msg_settings(uuid) from public, anon, authenticated;

-- Credits used this calendar month (UK time): SMS segments + WhatsApp messages.
create or replace function public._msg_used_this_month(p_firm uuid)
returns integer language sql stable security definer set search_path to 'public' as $$
  select coalesce(sum(case when channel = 'sms' then segments when channel = 'whatsapp' then 1 else 0 end), 0)::int
    from public.firm_customer_messages
   where firm_id = p_firm and direction = 'out' and status <> 'failed'
     and created_at >= (date_trunc('month', now() at time zone 'Europe/London') at time zone 'Europe/London')
$$;
revoke all on function public._msg_used_this_month(uuid) from public, anon, authenticated;

-- The firm the caller acts for (owner, admin or office). Raises otherwise.
create or replace function public._msg_firm(p_firm uuid)
returns uuid language plpgsql stable security definer set search_path to 'public' as $$
declare v uuid := coalesce(p_firm, auth.uid());
begin
  if auth.uid() is null or v is null or v not in (select public.my_employer_scope()) then
    raise exception 'You do not have access to this firm''s messages' using errcode = '42501';
  end if;
  return v;
end $$;
revoke all on function public._msg_firm(uuid) from public, anon;

-- 6 ─ Settings for the Settings › Messaging panel ───────────────────────────
create or replace function public.get_firm_messaging(p_firm uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._msg_firm(p_firm);
  s public.firm_messaging_settings := public._msg_settings(v_firm);
  v_used integer := public._msg_used_this_month(v_firm);
begin
  return jsonb_build_object(
    'firm_id', v_firm,
    'provider', s.provider,
    'live', s.provider <> 'sandbox',
    'sms_enabled', s.sms_enabled,
    'whatsapp_enabled', s.whatsapp_enabled,
    'email_enabled', s.email_enabled,
    'sms_number', s.sms_number,
    'whatsapp_number', s.whatsapp_number,
    'sender_name', s.sender_name,
    'monthly_allowance', s.monthly_allowance,
    'used_this_month', v_used,
    'crew_can_see_job_messages', s.crew_can_see_job_messages,
    'can_manage', v_firm in (select public.my_employer_admin_scope()),
    'opt_outs', (select count(*) from public.firm_message_opt_outs o
                  where o.firm_id = v_firm and o.opted_back_in_at is null),
    'sent_this_month', (select count(*) from public.firm_customer_messages m
                         where m.firm_id = v_firm and m.direction = 'out'
                           and m.created_at >= (date_trunc('month', now() at time zone 'Europe/London') at time zone 'Europe/London')),
    'received_this_month', (select count(*) from public.firm_customer_messages m
                             where m.firm_id = v_firm and m.direction = 'in'
                               and m.created_at >= (date_trunc('month', now() at time zone 'Europe/London') at time zone 'Europe/London')),
    'templates', (select jsonb_agg(jsonb_build_object(
                     'key', k.key,
                     'body', coalesce(t.body, public._msg_default_template(k.key)),
                     'custom', t.body is not null,
                     'marketing', public._msg_is_marketing(k.key)) order by k.ord)
                    from (values ('booking_confirmation', 1), ('on_my_way', 2), ('running_late', 3),
                                 ('invoice', 4), ('review_request', 5)) k(key, ord)
                    left join public.firm_message_templates t on t.firm_id = v_firm and t.key = k.key)
  );
end $$;
revoke all on function public.get_firm_messaging(uuid) from public, anon;
grant execute on function public.get_firm_messaging(uuid) to authenticated;

-- Firm-editable settings only. Provider, numbers and allowance are Elec-Mate's.
create or replace function public.save_firm_messaging_settings(p_firm uuid, p_patch jsonb)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := coalesce(p_firm, auth.uid());
begin
  if auth.uid() is null or v_firm not in (select public.my_employer_admin_scope()) then
    raise exception 'Only the owner or an admin can change messaging settings' using errcode = '42501';
  end if;
  if p_patch ?| array['provider', 'sms_number', 'whatsapp_number', 'whatsapp_phone_number_id', 'monthly_allowance'] then
    raise exception 'Elec-Mate sets the provider, numbers and allowance' using errcode = '42501';
  end if;
  insert into public.firm_messaging_settings (firm_id) values (v_firm) on conflict (firm_id) do nothing;
  update public.firm_messaging_settings set
    sms_enabled = coalesce((p_patch->>'sms_enabled')::boolean, sms_enabled),
    whatsapp_enabled = coalesce((p_patch->>'whatsapp_enabled')::boolean, whatsapp_enabled),
    email_enabled = coalesce((p_patch->>'email_enabled')::boolean, email_enabled),
    crew_can_see_job_messages = coalesce((p_patch->>'crew_can_see_job_messages')::boolean, crew_can_see_job_messages),
    sender_name = case when p_patch ? 'sender_name' then nullif(btrim(p_patch->>'sender_name'), '') else sender_name end,
    updated_at = now(), updated_by = auth.uid()
   where firm_id = v_firm;
  return public.get_firm_messaging(v_firm);
end $$;
revoke all on function public.save_firm_messaging_settings(uuid, jsonb) from public, anon;
grant execute on function public.save_firm_messaging_settings(uuid, jsonb) to authenticated;

create or replace function public.save_firm_message_template(p_firm uuid, p_key text, p_body text)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := coalesce(p_firm, auth.uid()); v_body text := btrim(coalesce(p_body, ''));
begin
  if auth.uid() is null or v_firm not in (select public.my_employer_admin_scope()) then
    raise exception 'Only the owner or an admin can change templates' using errcode = '42501';
  end if;
  if public._msg_default_template(p_key) is null then
    raise exception 'Unknown template' using errcode = '22023';
  end if;
  if v_body = '' or v_body = public._msg_default_template(p_key) then
    delete from public.firm_message_templates where firm_id = v_firm and key = p_key;
    return;
  end if;
  if length(v_body) > 1000 then raise exception 'Keep a template under 1,000 characters' using errcode = '22023'; end if;
  insert into public.firm_message_templates (firm_id, key, body, updated_by)
  values (v_firm, p_key, v_body, auth.uid())
  on conflict (firm_id, key) do update set body = excluded.body, updated_at = now(), updated_by = auth.uid();
end $$;
revoke all on function public.save_firm_message_template(uuid, text, text) from public, anon;
grant execute on function public.save_firm_message_template(uuid, text, text) to authenticated;

-- 7 ─ Template preview with the client's and job's details filled in ───────
create or replace function public.preview_customer_message(
  p_customer_id uuid, p_template_key text, p_job_id uuid default null)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare
  c public.customers;
  j public.employer_jobs;
  v_firm uuid;
  v_body text;
  v_first text;
  v_firm_name text;
  v_sender text;
  v_inv_id uuid;
  v_inv_no text;
  v_link text;
  v_when timestamptz;
  v_all_day boolean;
begin
  select * into c from public.customers where id = p_customer_id;
  if c.id is null then raise exception 'Client not found' using errcode = '42501'; end if;
  v_firm := public._msg_firm(c.user_id);
  if p_job_id is not null then
    select * into j from public.employer_jobs where id = p_job_id and user_id = v_firm;
  end if;
  select coalesce(t.body, public._msg_default_template(p_template_key)) into v_body
    from (select 1) x left join public.firm_message_templates t on t.firm_id = v_firm and t.key = p_template_key;
  if v_body is null then raise exception 'Unknown template' using errcode = '22023'; end if;

  v_first := btrim(regexp_replace(coalesce(c.name, ''), '\(.*?\)', '', 'g'));
  v_first := case when v_first ~* '^(mr|mrs|ms|miss|dr|mx)\.?\s+\S' then split_part(v_first, ' ', 1) || ' ' || split_part(v_first, ' ', 2)
                  else split_part(v_first, ' ', 1) end;
  select coalesce(nullif(btrim(cp.company_name), ''), p.full_name) into v_firm_name
    from public.profiles p left join public.company_profiles cp on cp.user_id = p.id
   where p.id = v_firm limit 1;
  select split_part(btrim(coalesce(full_name, '')), ' ', 1) into v_sender from public.profiles where id = auth.uid();

  if j.id is not null then
    select e.start_at, coalesce(e.all_day, false) into v_when, v_all_day from public.calendar_events e
     where e.user_id = j.user_id and e.mirrored_from_job = j.id and coalesce(e.sync_status, '') <> 'pending_delete' limit 1;
  end if;

  if p_template_key = 'invoice' then
    select q.id, q.invoice_number into v_inv_id, v_inv_no from public.quotes q
     where q.user_id = v_firm and q.invoice_raised is true and q.deleted_at is null
       and (q.customer_id = c.id or (j.id is not null and q.employer_job_id = j.id))
       and q.invoice_paid_at is null
     order by (j.id is not null and q.employer_job_id = j.id) desc, q.invoice_date desc nulls last limit 1;
    if v_inv_id is not null then v_link := 'https://www.elec-mate.com/pay/' || v_inv_id; end if;
  elsif p_template_key = 'review_request' then
    select (select split_part(btrim(l->>'url'), ' ', 1) from jsonb_array_elements(case when jsonb_typeof(to_jsonb(cp.review_links)) = 'array'
                                                              then to_jsonb(cp.review_links) else '[]'::jsonb end) l
             where (l->>'url') ~* '^https?://' limit 1)
      into v_link from public.company_profiles cp where cp.user_id = v_firm limit 1;
  end if;

  v_body := replace(v_body, '{first_name}', coalesce(nullif(v_first, ''), 'there'));
  v_body := replace(v_body, '{firm_name}', coalesce(v_firm_name, 'us'));
  v_body := replace(v_body, '{sender_first_name}', coalesce(nullif(v_sender, ''), 'Someone'));
  v_body := replace(v_body, '{job_title}', coalesce(nullif(btrim(j.title), ''), 'your job'));
  v_body := replace(v_body, '{job_date}', coalesce(
              case when v_all_day then to_char(v_when at time zone 'Europe/London', 'FMDay FMDD FMMonth')
                   else to_char(v_when at time zone 'Europe/London', 'FMDay FMDD FMMonth "at" HH24:MI') end,
              to_char(j.start_date, 'FMDay FMDD FMMonth'), 'the agreed date'));
  v_body := replace(v_body, '{invoice_number}', coalesce(v_inv_no, ''));
  v_body := replace(v_body, '{link}', coalesce(v_link, ''));
  v_body := regexp_replace(v_body, '\s+([.,])', '\1', 'g');
  v_body := btrim(regexp_replace(v_body, '[ ]{2,}', ' ', 'g'));
  if public._msg_is_marketing(p_template_key) and v_body !~* 'reply stop' then
    v_body := v_body || ' Reply STOP to opt out.';
  end if;
  return v_body;
end $$;
revoke all on function public.preview_customer_message(uuid, text, uuid) from public, anon;
grant execute on function public.preview_customer_message(uuid, text, uuid) to authenticated;

-- 8 ─ The inbox: one row per client, across portal, SMS, WhatsApp and email ─
create or replace function public.get_firm_customer_inbox(p_firm uuid default null, p_limit integer default 100)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_firm uuid := public._msg_firm(p_firm);
begin
  return coalesce((
    select jsonb_agg(t order by t.last_at desc) from (
      select x.customer_id, x.address,
             coalesce(nullif(c.company_name, ''), c.name, x.address, 'Unknown sender') as customer_name,
             (array_agg(x.body order by x.at desc))[1] as last_message,
             (array_agg(x.source order by x.at desc))[1] as last_channel,
             (array_agg(x.direction order by x.at desc))[1] as last_direction,
             max(x.at) as last_at,
             count(*) filter (where x.direction = 'in' and x.read_at is null) as unread,
             array_agg(distinct x.source) as channels
        from (
          select m.customer_id, case when m.customer_id is null then m.from_address end as address,
                 m.body, m.channel as source, m.direction, m.created_at as at, m.read_at
            from public.firm_customer_messages m where m.firm_id = v_firm
          union all
          select p.customer_id, null, p.message, 'portal',
                 case when p.sender_type = 'client' then 'in' else 'out' end, p.created_at, p.read_at
            from public.employer_client_messages p
           where p.firm_id = v_firm and p.customer_id is not null
        ) x
        left join public.customers c on c.id = x.customer_id
       group by x.customer_id, x.address, c.company_name, c.name
       order by max(x.at) desc
       limit greatest(1, least(coalesce(p_limit, 100), 300))
    ) t), '[]'::jsonb);
end $$;
revoke all on function public.get_firm_customer_inbox(uuid, integer) from public, anon;
grant execute on function public.get_firm_customer_inbox(uuid, integer) to authenticated;

-- One client's conversation (optionally just one job). Office sees all of it;
-- crew on the job see that job's messages when the firm allows, without
-- the customer's number or address unless the job shares the contact.
create or replace function public.get_customer_conversation(p_customer_id uuid default null, p_job_id uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid;
  v_office boolean;
  c public.customers;
  j public.employer_jobs;
  s public.firm_messaging_settings;
  v_phone text;
  v_wa_last timestamptz;
  v_show_contact boolean;
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  if p_job_id is not null then
    select * into j from public.employer_jobs where id = p_job_id;
    if j.id is null then raise exception 'Job not found' using errcode = '42501'; end if;
    v_firm := j.user_id;
    if p_customer_id is null then p_customer_id := j.customer_id; end if;
  end if;
  if p_customer_id is not null then
    select * into c from public.customers where id = p_customer_id;
    if c.id is null then raise exception 'Client not found' using errcode = '42501'; end if;
    if v_firm is not null and c.user_id <> v_firm then raise exception 'Client not found' using errcode = '42501'; end if;
    v_firm := c.user_id;
  end if;
  if v_firm is null then raise exception 'Pick a client or a job' using errcode = '22023'; end if;

  v_office := v_firm in (select public.my_employer_scope());
  s := public._msg_settings(v_firm);
  if not v_office then
    if j.id is null or not public.is_assigned_to_job(j.id) or not s.crew_can_see_job_messages then
      raise exception 'You do not have access to these messages' using errcode = '42501';
    end if;
  end if;
  v_show_contact := v_office or coalesce(j.share_client_contact_with_crew, false);
  v_phone := public._msg_e164(coalesce(nullif(c.phone, ''), j.client_phone));
  select max(created_at) into v_wa_last from public.firm_customer_messages
   where firm_id = v_firm and channel = 'whatsapp' and direction = 'in'
     and (customer_id = c.id or (v_phone is not null and from_address = v_phone));

  return jsonb_build_object(
    'firm_id', v_firm,
    'customer_id', c.id,
    'customer_name', coalesce(nullif(c.company_name, ''), c.name, j.client),
    'job_id', j.id,
    'can_send', v_office,
    'provider', s.provider,
    'live', s.provider <> 'sandbox',
    'channels', jsonb_build_object(
      'portal', c.id is not null,
      'sms', s.sms_enabled and v_phone is not null,
      'whatsapp', s.whatsapp_enabled and v_phone is not null,
      'email', s.email_enabled and coalesce(nullif(btrim(c.email), ''), nullif(btrim(j.client_email), '')) is not null),
    'phone', case when v_show_contact then v_phone end,
    'email', case when v_show_contact then coalesce(nullif(btrim(c.email), ''), nullif(btrim(j.client_email), '')) end,
    'whatsapp_window_open', v_wa_last is not null and v_wa_last > now() - interval '24 hours',
    'opted_out', (select coalesce(jsonb_agg(distinct o.channel), '[]'::jsonb) from public.firm_message_opt_outs o
                   where o.firm_id = v_firm and o.opted_back_in_at is null
                     and (o.customer_id = c.id or o.address = v_phone
                          or o.address = lower(btrim(coalesce(c.email, j.client_email, ''))))),
    'messages', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', x.id, 'source', x.source, 'direction', x.direction, 'body', x.body,
               'at', x.at, 'status', x.status, 'template_key', x.template_key,
               'job_id', x.job_id, 'job_title', jj.title, 'read_at', x.read_at,
               'sender_name', nullif(split_part(btrim(coalesce(p.full_name, '')), ' ', 1), ''))
             order by x.at)
        from (
          select * from (
            select m.id, m.channel as source, m.direction, m.body, m.created_at as at, m.status,
                   m.template_key, m.job_id, m.read_at, m.sent_by as author
              from public.firm_customer_messages m
             where m.firm_id = v_firm
               and (case when p_job_id is not null then m.job_id = p_job_id
                         else (m.customer_id = c.id or (m.customer_id is null and v_phone is not null and m.from_address = v_phone)) end)
            union all
            select p2.id, 'portal', case when p2.sender_type = 'client' then 'in' else 'out' end, p2.message,
                   p2.created_at, case when p2.sender_type = 'client' then 'received' else 'sent' end,
                   null, p2.job_id, p2.read_at, p2.sender_user_id
              from public.employer_client_messages p2
             where p2.firm_id = v_firm
               and (case when p_job_id is not null then p2.job_id = p_job_id else p2.customer_id = c.id end)
          ) u order by u.at desc limit 300
        ) x
        left join public.employer_jobs jj on jj.id = x.job_id
        left join public.profiles p on p.id = x.author and x.direction = 'out'
    ), '[]'::jsonb)
  );
end $$;
revoke all on function public.get_customer_conversation(uuid, uuid) from public, anon;
grant execute on function public.get_customer_conversation(uuid, uuid) to authenticated;

create or replace function public.mark_customer_conversation_read(p_customer_id uuid)
returns integer language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid; v_n integer := 0; v_m integer := 0; v_phone text;
begin
  select user_id, public._msg_e164(phone) into v_firm, v_phone from public.customers where id = p_customer_id;
  v_firm := public._msg_firm(v_firm);
  update public.firm_customer_messages set read_at = now(), updated_at = now()
   where firm_id = v_firm and direction = 'in' and read_at is null
     and (customer_id = p_customer_id or (customer_id is null and v_phone is not null and from_address = v_phone));
  get diagnostics v_n = row_count;
  update public.employer_client_messages set read_at = now()
   where firm_id = v_firm and customer_id = p_customer_id and sender_type = 'client' and read_at is null;
  get diagnostics v_m = row_count;
  return v_n + v_m;
end $$;
revoke all on function public.mark_customer_conversation_read(uuid) from public, anon;
grant execute on function public.mark_customer_conversation_read(uuid) to authenticated;

-- 9 ─ Queue a message: every rule in one place ───────────────────────────────
create or replace function public.queue_customer_message(
  p_customer_id uuid, p_channel text, p_body text,
  p_job_id uuid default null, p_template_key text default null)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  c public.customers;
  j public.employer_jobs;
  s public.firm_messaging_settings;
  v_firm uuid;
  v_body text := btrim(coalesce(p_body, ''));
  v_to text;
  v_from text;
  v_segments integer;
  v_cost integer;
  v_used integer;
  v_id uuid;
  v_status text;
  v_wa_last timestamptz;
begin
  if p_channel not in ('sms', 'whatsapp', 'email') then
    raise exception 'Pick text, WhatsApp or email' using errcode = '22023';
  end if;
  select * into c from public.customers where id = p_customer_id;
  if c.id is null then raise exception 'Client not found' using errcode = '42501'; end if;
  v_firm := public._msg_firm(c.user_id);
  if p_job_id is not null then
    select * into j from public.employer_jobs where id = p_job_id and user_id = v_firm;
    if j.id is null then raise exception 'Job not found' using errcode = '42501'; end if;
  end if;
  if p_template_key is not null and public._msg_default_template(p_template_key) is null then
    raise exception 'Unknown template' using errcode = '22023';
  end if;
  if v_body = '' then raise exception 'Write a message first' using errcode = '22023'; end if;
  if length(v_body) > (case when p_channel = 'email' then 4000 else 1000 end) then
    raise exception 'That message is too long' using errcode = '22023';
  end if;
  if public._msg_is_marketing(p_template_key) and p_channel <> 'email' and v_body !~* 'reply stop' then
    v_body := v_body || ' Reply STOP to opt out.';
  end if;

  s := public._msg_settings(v_firm);
  if p_channel = 'sms' and not s.sms_enabled then raise exception 'Texts are switched off in Settings' using errcode = '22023'; end if;
  if p_channel = 'whatsapp' and not s.whatsapp_enabled then raise exception 'WhatsApp is switched off in Settings' using errcode = '22023'; end if;
  if p_channel = 'email' and not s.email_enabled then raise exception 'Email is switched off in Settings' using errcode = '22023'; end if;

  if p_channel = 'email' then
    v_to := lower(nullif(btrim(coalesce(nullif(btrim(c.email), ''), j.client_email)), ''));
    if v_to is null or v_to !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
      raise exception 'No email address for this client' using errcode = '22023';
    end if;
  else
    v_to := public._msg_e164(coalesce(nullif(btrim(c.phone), ''), j.client_phone));
    if v_to is null then raise exception 'No mobile number for this client' using errcode = '22023'; end if;
    if p_channel = 'sms' and v_to like '+44%' and v_to !~ '^\+447[1-57-9][0-9]{8}$' then
      raise exception 'That is not a UK mobile number, so it cannot get texts' using errcode = '22023';
    end if;
  end if;

  if exists (select 1 from public.firm_message_opt_outs o
              where o.firm_id = v_firm and o.channel = p_channel and o.address = v_to and o.opted_back_in_at is null)
     or exists (select 1 from public.client_comms_consent k
                 where k.customer_id = c.id and k.channel = p_channel and k.withdrawn_at is not null and k.consented is false) then
    raise exception 'This client has opted out of %', case p_channel when 'sms' then 'texts' when 'whatsapp' then 'WhatsApp' else 'email' end
      using errcode = '22023';
  end if;

  if p_channel = 'whatsapp' then
    select max(created_at) into v_wa_last from public.firm_customer_messages
     where firm_id = v_firm and channel = 'whatsapp' and direction = 'in' and from_address = v_to;
    if (v_wa_last is null or v_wa_last < now() - interval '24 hours') and p_template_key is null then
      raise exception 'WhatsApp only allows a template until they reply. Pick a template, or send a text.'
        using errcode = '22023';
    end if;
  end if;

  v_segments := case when p_channel = 'sms' then public._msg_segments(v_body) else 1 end;
  v_cost := case when p_channel = 'sms' then v_segments when p_channel = 'whatsapp' then 1 else 0 end;
  -- One firm at a time, so two quick sends cannot both squeeze under the cap.
  perform pg_advisory_xact_lock(hashtext('firm_customer_messages:' || v_firm::text));
  v_used := public._msg_used_this_month(v_firm);
  if v_cost > 0 and v_used + v_cost > s.monthly_allowance then
    raise exception 'This month''s % message allowance is used up', s.monthly_allowance using errcode = 'P0001';
  end if;

  v_from := case p_channel when 'sms' then coalesce(s.sms_number, s.sender_name)
                           when 'whatsapp' then s.whatsapp_number else null end;
  v_status := case when s.provider = 'sandbox' then 'sandbox' else 'queued' end;
  insert into public.firm_customer_messages
    (firm_id, customer_id, job_id, channel, direction, body, template_key, to_address, from_address,
     status, provider, segments, sent_by)
  values (v_firm, c.id, j.id, p_channel, 'out', v_body, p_template_key, v_to, v_from,
          v_status, case when p_channel = 'email' and s.provider <> 'sandbox' then 'resend' else s.provider end,
          v_segments, auth.uid())
  returning id into v_id;

  update public.customers set last_activity_at = now() where id = c.id;

  -- 80% of the allowance: tell the owner once a month.
  if s.monthly_allowance > 0 and v_used < s.monthly_allowance * 0.8 and v_used + v_cost >= s.monthly_allowance * 0.8 then
    insert into public.employer_expiry_sent (firm, ref)
    values (v_firm, 'messaging_allowance:' || to_char(now() at time zone 'Europe/London', 'YYYY-MM'))
    on conflict do nothing;
    if found then
      perform public.notify_employer_bell(v_firm, 'messaging_allowance',
        'Messages are 80% used this month',
        (v_used + v_cost) || ' of ' || s.monthly_allowance || ' message credits used.',
        jsonb_build_object('route', '/employer?section=settings&open=messaging'));
    end if;
  end if;

  return jsonb_build_object('id', v_id, 'status', v_status, 'dispatch', v_status = 'queued',
                            'segments', v_segments, 'used', v_used + v_cost, 'allowance', s.monthly_allowance);
end $$;
revoke all on function public.queue_customer_message(uuid, text, text, uuid, text) from public, anon;
grant execute on function public.queue_customer_message(uuid, text, text, uuid, text) to authenticated;

-- 10 ─ Opt-out and consent, by the office ────────────────────────────────────
create or replace function public.set_customer_message_opt_out(p_customer_id uuid, p_channel text, p_opted_out boolean)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare c public.customers; v_firm uuid; v_addr text;
begin
  select * into c from public.customers where id = p_customer_id;
  if c.id is null then raise exception 'Client not found' using errcode = '42501'; end if;
  v_firm := public._msg_firm(c.user_id);
  if p_channel not in ('sms', 'whatsapp', 'email') then raise exception 'Unknown channel' using errcode = '22023'; end if;
  v_addr := case when p_channel = 'email' then lower(nullif(btrim(c.email), '')) else public._msg_e164(c.phone) end;
  if p_opted_out then
    if v_addr is not null then
      insert into public.firm_message_opt_outs (firm_id, channel, address, customer_id, source, recorded_by)
      values (v_firm, p_channel, v_addr, c.id, 'manual', auth.uid())
      on conflict (firm_id, channel, address) do update
        set opted_out_at = now(), opted_back_in_at = null, source = 'manual', recorded_by = auth.uid(), customer_id = c.id;
    end if;
  else
    update public.firm_message_opt_outs set opted_back_in_at = now(), recorded_by = auth.uid()
     where firm_id = v_firm and channel = p_channel and opted_back_in_at is null
       and (customer_id = c.id or address = v_addr);
  end if;
  insert into public.client_comms_consent (customer_id, user_id, channel, consented, consent_method, consented_at, withdrawn_at)
  values (c.id, v_firm, p_channel, not p_opted_out, 'manual',
          case when p_opted_out then null else now() end, case when p_opted_out then now() else null end)
  on conflict (customer_id, channel) do update set
    consented = excluded.consented, consent_method = 'manual',
    consented_at = case when excluded.consented then now() else client_comms_consent.consented_at end,
    withdrawn_at = case when excluded.consented then null else now() end;
end $$;
revoke all on function public.set_customer_message_opt_out(uuid, text, boolean) from public, anon;
grant execute on function public.set_customer_message_opt_out(uuid, text, boolean) to authenticated;

-- 11 ─ Inbound (service role only: called by customer-message-inbound) ──────
create or replace function public._customer_inbound_record(
  p_firm uuid, p_channel text, p_from text, p_to text, p_body text,
  p_provider text, p_provider_message_id text)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  v_from text := case when p_channel = 'email' then lower(btrim(p_from)) else public._msg_e164(p_from) end;
  v_body text := left(btrim(coalesce(p_body, '')), 4000);
  v_word text := upper(regexp_replace(btrim(coalesce(p_body, '')), '[^A-Za-z]', '', 'g'));
  v_customer uuid;
  v_name text;
  v_job uuid;
  v_id uuid;
  v_kind text := 'message';
  v_recent integer;
begin
  if p_firm is null or v_from is null or v_body = '' or p_channel not in ('sms', 'whatsapp', 'email') then
    return jsonb_build_object('stored', false, 'reason', 'incomplete');
  end if;
  if p_provider_message_id is not null and exists (
       select 1 from public.firm_customer_messages
        where provider = p_provider and provider_message_id = p_provider_message_id) then
    return jsonb_build_object('stored', false, 'reason', 'duplicate');
  end if;

  -- Who is it? A client of this firm with that number (or email).
  select c.id, coalesce(nullif(c.company_name, ''), c.name) into v_customer, v_name
    from public.customers c
   where c.user_id = p_firm
     and (case when p_channel = 'email' then lower(btrim(c.email)) = v_from else public._msg_e164(c.phone) = v_from end)
   order by c.last_activity_at desc nulls last limit 1;
  -- Which job? The one we last wrote to them about, within 30 days.
  select m.job_id into v_job from public.firm_customer_messages m
   where m.firm_id = p_firm and m.direction = 'out' and m.to_address = v_from and m.job_id is not null
     and m.created_at > now() - interval '30 days'
   order by m.created_at desc limit 1;

  insert into public.firm_customer_messages
    (firm_id, customer_id, job_id, channel, direction, body, from_address, to_address, status, provider, provider_message_id, segments)
  values (p_firm, v_customer, v_job, p_channel, 'in', coalesce(nullif(v_body, ''), '(empty)'), v_from, p_to,
          'received', coalesce(p_provider, 'sandbox'), p_provider_message_id, 0)
  returning id into v_id;

  if p_channel <> 'email' and v_word in ('STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT', 'OPTOUT', 'REVOKE') then
    v_kind := 'opt_out';
    insert into public.firm_message_opt_outs (firm_id, channel, address, customer_id, source)
    values (p_firm, p_channel, v_from, v_customer, 'stop_reply')
    on conflict (firm_id, channel, address) do update
      set opted_out_at = now(), opted_back_in_at = null, source = 'stop_reply',
          customer_id = coalesce(excluded.customer_id, firm_message_opt_outs.customer_id);
    if v_customer is not null then
      insert into public.client_comms_consent (customer_id, user_id, channel, consented, consent_method, withdrawn_at)
      values (v_customer, p_firm, p_channel, false, 'reply', now())
      on conflict (customer_id, channel) do update set consented = false, consent_method = 'reply', withdrawn_at = now();
    end if;
  elsif p_channel <> 'email' and v_word in ('START', 'UNSTOP', 'YES') and exists (
          select 1 from public.firm_message_opt_outs
           where firm_id = p_firm and channel = p_channel and address = v_from and opted_back_in_at is null) then
    v_kind := 'opt_in';
    update public.firm_message_opt_outs set opted_back_in_at = now()
     where firm_id = p_firm and channel = p_channel and address = v_from and opted_back_in_at is null;
    if v_customer is not null then
      insert into public.client_comms_consent (customer_id, user_id, channel, consented, consent_method, consented_at)
      values (v_customer, p_firm, p_channel, true, 'reply', now())
      on conflict (customer_id, channel) do update set consented = true, consent_method = 'reply', consented_at = now(), withdrawn_at = null;
    end if;
  end if;

  if v_customer is not null then
    update public.customers set last_activity_at = now() where id = v_customer;
  end if;

  -- Ring the office bell, unless a flood is under way (then the inbox still has them).
  select count(*) into v_recent from public.firm_customer_messages
   where firm_id = p_firm and direction = 'in' and created_at > now() - interval '1 hour';
  if v_recent <= 60 then
    perform public.notify_employer_bell(
      p_firm, 'customer_message',
      case v_kind
        when 'opt_out' then coalesce(v_name, public._msg_display(v_from)) || ' opted out of ' || case p_channel when 'sms' then 'texts' else 'WhatsApp' end
        when 'opt_in' then coalesce(v_name, public._msg_display(v_from)) || ' opted back in'
        else case p_channel when 'sms' then 'Text' when 'whatsapp' then 'WhatsApp' else 'Email' end
             || ' from ' || coalesce(v_name, public._msg_display(v_from)) end,
      left(v_body, 140),
      jsonb_strip_nulls(jsonb_build_object(
        'customer_id', v_customer, 'job_id', v_job, 'message_id', v_id,
        'route', case when v_customer is not null
                      then '/employer?section=clients&client=' || v_customer || '&tab=messages'
                      else '/employer?section=inbox' end)));
  end if;

  return jsonb_build_object('stored', true, 'id', v_id, 'kind', v_kind, 'customer_id', v_customer, 'job_id', v_job);
end $$;
revoke all on function public._customer_inbound_record(uuid, text, text, text, text, text, text) from public, anon, authenticated;

create or replace function public._msg_display(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case when p like '+447%' and length(p) = 13 then '0' || substr(p, 4, 4) || ' ' || substr(p, 8)
              when p like '+44%' then '0' || substr(p, 4) else p end
$$;

-- Delivery receipts (service role only).
create or replace function public._customer_message_status(
  p_provider text, p_provider_message_id text, p_status text, p_error text default null)
returns boolean language plpgsql volatile security definer set search_path to 'public' as $$
declare v_status text := case lower(coalesce(p_status, ''))
    when 'delivered' then 'delivered' when 'read' then 'delivered'
    when 'sent' then 'sent' when 'queued' then 'sent' when 'accepted' then 'sent' when 'sending' then 'sending'
    when 'failed' then 'failed' when 'undelivered' then 'failed' else null end;
begin
  if v_status is null or p_provider_message_id is null then return false; end if;
  update public.firm_customer_messages
     set status = v_status, error = coalesce(left(p_error, 300), error), updated_at = now()
   where provider = p_provider and provider_message_id = p_provider_message_id and direction = 'out'
     -- never step backwards (delivered → sent)
     and not (status = 'delivered' and v_status in ('sent', 'sending'));
  return found;
end $$;
revoke all on function public._customer_message_status(text, text, text, text) from public, anon, authenticated;

-- 12 ─ Sandbox: the office can play the customer's reply, to see the loop work.
create or replace function public.sandbox_simulate_customer_reply(p_customer_id uuid, p_channel text, p_body text)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare c public.customers; v_firm uuid; s public.firm_messaging_settings; v_from text;
begin
  select * into c from public.customers where id = p_customer_id;
  if c.id is null then raise exception 'Client not found' using errcode = '42501'; end if;
  v_firm := c.user_id;
  if auth.uid() is null or v_firm not in (select public.my_employer_admin_scope()) then
    raise exception 'Only the owner or an admin can test replies' using errcode = '42501';
  end if;
  s := public._msg_settings(v_firm);
  if s.provider <> 'sandbox' then
    raise exception 'Test replies only work in sandbox mode' using errcode = '22023';
  end if;
  v_from := case when p_channel = 'email' then lower(btrim(c.email)) else public._msg_e164(c.phone) end;
  if v_from is null then raise exception 'This client has no % to reply from', case when p_channel = 'email' then 'email' else 'number' end using errcode = '22023'; end if;
  return public._customer_inbound_record(v_firm, p_channel, v_from, null, p_body, 'sandbox',
                                         'sandbox-' || gen_random_uuid());
end $$;
revoke all on function public.sandbox_simulate_customer_reply(uuid, text, text) from public, anon;
grant execute on function public.sandbox_simulate_customer_reply(uuid, text, text) to authenticated;

-- 13 ─ Lookups for the edge functions (service role only) ───────────────────
create or replace function public._msg_firm_for_number(p_channel text, p_to text)
returns uuid language sql stable security definer set search_path to 'public' as $$
  select firm_id from public.firm_messaging_settings
   where (p_channel = 'sms' and sms_number = public._msg_e164(p_to))
      or (p_channel = 'whatsapp' and (whatsapp_number = public._msg_e164(p_to) or whatsapp_phone_number_id = p_to))
   limit 1
$$;
revoke all on function public._msg_firm_for_number(text, text) from public, anon, authenticated;

-- 14 ─ Notification types ───────────────────────────────────────────────────
insert into public.notification_types (type, category, push, importance)
values ('customer_message', 'messages', true, 2),
       ('messaging_allowance', 'messages', true, 1)
on conflict (type) do nothing;

-- Internal helpers: callable only from the SECURITY DEFINER functions above.
revoke all on function public._msg_firm(uuid) from authenticated;
