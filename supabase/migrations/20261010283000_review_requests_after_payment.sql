-- Gap #9: review requests after payment.
--
-- When an invoice is paid (card, bank, marked paid), the customer gets ONE
-- polite review request after a delay the firm picks. It links to the firm's
-- own Google Business profile, and optionally Checkatrade, TrustATrader or
-- Facebook. Email by default; a text once the firm's messaging provider is live.
--
-- Additive only: three new tables (RLS on), new functions, one new cron job.
-- No trigger on quotes: the 10-minute tick looks for invoices paid since the
-- firm switched this on, so a bug here can never break a payment.
--
-- Safety, in order:
--   * Off for every firm until the owner or an admin turns it on.
--   * Only invoices paid AFTER it was turned on (invoice_paid_at >= enabled_at),
--     so switching on never mails a backlog. Imported invoices never
--     (_invoice_is_unsent_import).
--   * One request per invoice (unique), one per job, and never the same
--     customer twice inside the firm's chosen period (by customer and by address).
--   * Opt-outs: email_suppressions, firm_message_opt_outs, client_comms_consent
--     withdrawals, customers.campaign_opted_out_at, and this feature's own
--     "stop asking me" list. The firm-wide automations pause stops it too.
--   * Customers already asked by the payment receipt (company review CTA) or
--     by the "Ask for a review" automation are not asked again.
--   * Sent only Mon to Sat, 9am to 7pm UK time.
--   * CMA fake reviews guidance (CMA208, DMCC Act 2024 Sch 20 para 13): every
--     paid customer is asked the same way, no rating gate, no incentive, and the
--     wording is checked for rewards or star requests.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.employer_review_settings (
  employer_id uuid primary key references public.profiles(id) on delete cascade,
  enabled boolean not null default false,
  enabled_at timestamptz,
  delay_days integer not null default 3 check (delay_days between 0 and 30),
  cooldown_days integer not null default 365 check (cooldown_days between 30 and 1095),
  channel text not null default 'email' check (channel in ('email', 'sms')),
  wait_for_job_complete boolean not null default true,
  google_url text check (google_url is null or (google_url ~* '^https://[^\s<>"]+$' and length(google_url) <= 500)),
  checkatrade_url text check (checkatrade_url is null or (checkatrade_url ~* '^https://[^\s<>"]+$' and length(checkatrade_url) <= 500)),
  trustatrader_url text check (trustatrader_url is null or (trustatrader_url ~* '^https://[^\s<>"]+$' and length(trustatrader_url) <= 500)),
  facebook_url text check (facebook_url is null or (facebook_url ~* '^https://[^\s<>"]+$' and length(facebook_url) <= 500)),
  message text check (message is null or length(message) between 1 and 600),
  changed_by uuid,
  changed_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.employer_review_settings is
  '[EMPLOYER HUB] Review requests after payment (gap #9): on/off, delay after payment, the no-repeat period, email or text, the firm''s review links (Google, Checkatrade, TrustATrader, Facebook) and wording. Scope: one row per firm (employer_id = the owning account); owner/admin/office read via my_employer_scope(). Used by: Clients hub > Review requests, run_review_requests, employer-review-request-send, review-link. Rule: off by default; written only by save_review_settings (owner/admin).';

create table if not exists public.employer_review_requests (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  invoice_id uuid not null,
  job_id uuid,
  customer_id uuid,
  customer_key text not null,
  client_name text,
  invoice_number text,
  base_at timestamptz not null,
  due_at timestamptz not null,
  status text not null default 'queued'
    check (status in ('queued', 'sending', 'sent', 'skipped', 'failed')),
  summary text not null default '',
  channel text check (channel in ('email', 'sms')),
  to_address text,
  token uuid not null default gen_random_uuid() unique,
  message_id uuid,
  request_id bigint,
  attempts integer not null default 0,
  dispatched_at timestamptz,
  sent_at timestamptz,
  click_count integer not null default 0,
  clicks jsonb not null default '{}'::jsonb,
  first_clicked_at timestamptz,
  last_clicked_at timestamptz,
  opted_out_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint employer_review_requests_once unique (employer_id, invoice_id)
);
comment on table public.employer_review_requests is
  '[EMPLOYER HUB] One row per paid invoice the review-request feature looked at (gap #9): waiting, sent, skipped (with the reason) or failed, the channel and address used, and link clicks per platform. Scope: firm; owner/admin/office read via my_employer_scope(). Used by: Clients hub > Review requests, run_review_requests, employer-review-request-send, review-link. Rule: unique per invoice so nobody is asked twice; written only by the review functions.';
create index if not exists employer_review_requests_firm_idx
  on public.employer_review_requests (employer_id, created_at desc);
create index if not exists employer_review_requests_pending_idx
  on public.employer_review_requests (status, due_at) where status in ('queued', 'sending');
create index if not exists employer_review_requests_customer_idx
  on public.employer_review_requests (employer_id, customer_key, sent_at desc) where status = 'sent';
create index if not exists employer_review_requests_address_idx
  on public.employer_review_requests (employer_id, to_address, sent_at desc) where status = 'sent';

create table if not exists public.employer_review_opt_outs (
  employer_id uuid not null references public.profiles(id) on delete cascade,
  address text not null,
  request_id uuid,
  created_at timestamptz not null default now(),
  primary key (employer_id, address)
);
comment on table public.employer_review_opt_outs is
  '[EMPLOYER HUB] Customers who used "stop asking me" on a review request (gap #9). Scope: firm. Used by: run_review_requests (never asked again). Rule: written only by review_request_opt_out via the review-link function; never deleted.';

alter table public.employer_review_settings enable row level security;
alter table public.employer_review_requests enable row level security;
alter table public.employer_review_opt_outs enable row level security;

drop policy if exists "Firm office reads review settings" on public.employer_review_settings;
create policy "Firm office reads review settings" on public.employer_review_settings
  for select to authenticated using (employer_id in (select public.my_employer_scope()));
drop policy if exists "Firm office reads review requests" on public.employer_review_requests;
create policy "Firm office reads review requests" on public.employer_review_requests
  for select to authenticated using (employer_id in (select public.my_employer_scope()));
drop policy if exists "Firm office reads review opt-outs" on public.employer_review_opt_outs;
create policy "Firm office reads review opt-outs" on public.employer_review_opt_outs
  for select to authenticated using (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_review_settings, public.employer_review_requests,
  public.employer_review_opt_outs from anon, authenticated;
grant select on public.employer_review_settings, public.employer_review_requests,
  public.employer_review_opt_outs to authenticated;

-- ── Helpers ─────────────────────────────────────────────────────────────────

create or replace function public._review_default_message()
returns text language sql immutable set search_path to 'public' as $$
  select 'Thank you for choosing {firm_name}. If you have a minute, we would be grateful for an honest review of how the work went. Every review helps other local people choose who to call.'::text
$$;

-- Wording that ties a review to a reward or asks for a star rating.
-- CMA208 paras 2.10, 3.7 and the commissioning examples (Sch 20 para 13).
create or replace function public._review_wording_problem(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case
    when coalesce(p, '') ~* '(\mdiscount|\mvoucher|\mprize|\mraffle|\mcash ?back|\mgift ?card|\mreward|\mrefund|\mcoupon|\mfree (gift|service|check|test|visit)|£ ?[0-9])'
      then 'A review cannot be tied to a reward, discount or prize. Take that out of the wording.'
    when coalesce(p, '') ~* '([1-5] ?-? ?stars?|(one|two|three|four|five) ?-? ?stars?|\m(positive|good|great|glowing) review)'
      then 'Ask for an honest review, not a star rating or a good review.'
    else null
  end
$$;

-- The firm's links, in the order the customer sees them.
create or replace function public._review_links(s public.employer_review_settings)
returns jsonb language sql immutable set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object('key', k, 'label', l, 'url', u) order by o), '[]'::jsonb)
    from (values (1, 'google', 'Review us on Google', s.google_url),
                 (2, 'checkatrade', 'Review us on Checkatrade', s.checkatrade_url),
                 (3, 'trustatrader', 'Review us on TrustATrader', s.trustatrader_url),
                 (4, 'facebook', 'Review us on Facebook', s.facebook_url)) v(o, k, l, u)
   where u is not null and btrim(u) <> ''
$$;

create or replace function public._review_first_name(p_name text)
returns text language plpgsql immutable set search_path to 'public' as $$
declare v text := btrim(regexp_replace(coalesce(p_name, ''), '\(.*?\)', '', 'g'));
begin
  if v ~* '^(mr|mrs|ms|miss|dr|mx)\.?\s+\S' then
    v := split_part(v, ' ', 1) || ' ' || split_part(v, ' ', 2);
  else
    v := split_part(v, ' ', 1);
  end if;
  return nullif(v, '');
end $$;

create or replace function public._review_firm_name(p_firm uuid)
returns text language sql stable security definer set search_path to 'public' as $$
  select coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'us')
    from public.profiles p left join public.company_profiles cp on cp.user_id = p.id
   where p.id = p_firm limit 1
$$;
revoke all on function public._review_firm_name(uuid) from public, anon, authenticated;

-- The paragraph both channels use, placeholders filled in.
create or replace function public._review_paragraph(p_message text, p_firm_name text, p_first text)
returns text language sql immutable set search_path to 'public' as $$
  select btrim(regexp_replace(
           replace(replace(coalesce(nullif(btrim(p_message), ''), public._review_default_message()),
                   '{firm_name}', coalesce(nullif(p_firm_name, ''), 'us')),
                   '{first_name}', coalesce(nullif(p_first, ''), 'there')),
           '[ ]{2,}', ' ', 'g'))
$$;

-- The text message. One link: review-link sends a single-platform firm
-- straight there, or shows the firm's platforms to pick from.
create or replace function public._review_sms_body(p_message text, p_firm_name text, p_first text, p_link text)
returns text language sql immutable set search_path to 'public' as $$
  select 'Hi ' || coalesce(nullif(p_first, ''), 'there') || ', '
         || public._review_paragraph(p_message, p_firm_name, p_first)
         || ' ' || coalesce(p_link, '') || ' Reply STOP to opt out.'
$$;

create or replace function public._review_link_base()
returns text language sql immutable set search_path to 'public' as $$
  select 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/review-link'::text
$$;

create or replace function public._review_settings_row(p_firm uuid)
returns public.employer_review_settings
language plpgsql stable security definer set search_path to 'public' as $$
declare s public.employer_review_settings;
begin
  select * into s from public.employer_review_settings where employer_id = p_firm;
  if s.employer_id is null then
    s.employer_id := p_firm; s.enabled := false; s.delay_days := 3; s.cooldown_days := 365;
    s.channel := 'email'; s.wait_for_job_complete := true;
  end if;
  return s;
end $$;
revoke all on function public._review_settings_row(uuid) from public, anon, authenticated;

-- Links already saved in the Electrical Hub (company_profiles.review_links),
-- sorted into platforms, to prefill an empty form.
create or replace function public._review_suggested_links(p_firm uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  with l as (
    select btrim(x->>'url') as url
      from public.company_profiles cp,
           jsonb_array_elements(case when jsonb_typeof(cp.review_links) = 'array' then cp.review_links else '[]'::jsonb end) x
     where cp.user_id = p_firm and btrim(coalesce(x->>'url', '')) ~* '^https://[^\s<>"]+$'
  )
  select jsonb_strip_nulls(jsonb_build_object(
    'google_url', (select url from l where url ~* '(google\.|g\.page|goo\.gl)' limit 1),
    'checkatrade_url', (select url from l where url ~* 'checkatrade' limit 1),
    'trustatrader_url', (select url from l where url ~* 'trustatrader' limit 1),
    'facebook_url', (select url from l where url ~* '(facebook\.|fb\.)' limit 1)))
$$;
revoke all on function public._review_suggested_links(uuid) from public, anon, authenticated;

-- ── What the Clients hub and the settings sheet read ────────────────────────

create or replace function public.get_review_requests(p_firm uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := coalesce(p_firm, public.my_default_employer_id());
  s public.employer_review_settings;
  m public.firm_messaging_settings;
  v_since timestamptz := now() - interval '30 days';
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'You do not have access to this firm''s review requests' using errcode = '42501';
  end if;
  s := public._review_settings_row(v_firm);
  select * into m from public.firm_messaging_settings where firm_id = v_firm;
  return jsonb_build_object(
    'firm_id', v_firm,
    'firm_name', public._review_firm_name(v_firm),
    'can_manage', v_firm in (select public.my_employer_admin_scope()),
    'saved', exists (select 1 from public.employer_review_settings x where x.employer_id = v_firm),
    'settings', jsonb_build_object(
      'enabled', s.enabled, 'enabled_at', s.enabled_at, 'delay_days', s.delay_days,
      'cooldown_days', s.cooldown_days, 'channel', s.channel,
      'wait_for_job_complete', s.wait_for_job_complete,
      'google_url', s.google_url, 'checkatrade_url', s.checkatrade_url,
      'trustatrader_url', s.trustatrader_url, 'facebook_url', s.facebook_url,
      'message', s.message, 'changed_by_name', s.changed_by_name, 'updated_at', s.updated_at),
    'default_message', public._review_default_message(),
    'suggested_links', public._review_suggested_links(v_firm),
    'texts_live', coalesce(m.provider, 'sandbox') <> 'sandbox' and coalesce(m.sms_enabled, true),
    'automations_paused', exists (select 1 from public.employer_automation_settings a
                                   where a.employer_id = v_firm and a.paused),
    'old_rule_on', exists (select 1 from public.employer_automation_rules r
                            where r.employer_id = v_firm and r.rule_key = 'job_complete_review_request' and r.enabled),
    'receipt_asks', coalesce((select cp.review_request_enabled from public.company_profiles cp
                               where cp.user_id = v_firm), false),
    'stats', (select jsonb_build_object(
        'asked_30', count(*) filter (where r.status = 'sent' and r.sent_at >= v_since),
        'clicked_30', count(*) filter (where r.status = 'sent' and r.sent_at >= v_since and r.click_count > 0),
        'asked_all', count(*) filter (where r.status = 'sent'),
        'clicked_all', count(*) filter (where r.status = 'sent' and r.click_count > 0),
        'waiting', count(*) filter (where r.status in ('queued', 'sending')),
        'skipped_30', count(*) filter (where r.status = 'skipped' and r.updated_at >= v_since),
        'failed_30', count(*) filter (where r.status = 'failed' and r.updated_at >= v_since))
      from public.employer_review_requests r where r.employer_id = v_firm),
    'recent', coalesce((select jsonb_agg(x order by x.sort_at desc) from (
        select r.id, r.invoice_id, r.job_id, r.customer_id, r.client_name, r.invoice_number,
               r.status, r.summary, r.channel, r.due_at, r.sent_at, r.click_count, r.clicks,
               r.first_clicked_at, r.opted_out_at, r.created_at,
               coalesce(r.sent_at, r.due_at) as sort_at
          from public.employer_review_requests r
         where r.employer_id = v_firm
         order by coalesce(r.sent_at, r.due_at) desc
         limit 50) x), '[]'::jsonb)
  );
end $$;
revoke all on function public.get_review_requests(uuid) from public, anon;
grant execute on function public.get_review_requests(uuid) to authenticated;

-- ── Settings (owner or admin) ───────────────────────────────────────────────

create or replace function public.save_review_settings(p_firm uuid, p_patch jsonb)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  v_firm uuid := coalesce(p_firm, public.my_default_employer_id());
  old public.employer_review_settings;
  v_on boolean;
  v_delay integer;
  v_cool integer;
  v_channel text;
  v_msg text;
  v_problem text;
  v_url text;
  v_key text;
  v_links jsonb := '{}'::jsonb;
  v_name text;
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_admin_scope()) then
    raise exception 'Only the owner or an admin can change review requests' using errcode = '42501';
  end if;
  p_patch := coalesce(p_patch, '{}'::jsonb);
  old := public._review_settings_row(v_firm);

  v_on := coalesce((p_patch->>'enabled')::boolean, old.enabled);
  v_delay := coalesce((p_patch->>'delay_days')::int, old.delay_days);
  v_cool := coalesce((p_patch->>'cooldown_days')::int, old.cooldown_days);
  v_channel := coalesce(p_patch->>'channel', old.channel);
  if v_delay not between 0 and 30 then raise exception 'Pick a delay between 0 and 30 days' using errcode = '22023'; end if;
  if v_cool not between 30 and 1095 then raise exception 'Pick a period between 30 days and 3 years' using errcode = '22023'; end if;
  if v_channel not in ('email', 'sms') then raise exception 'Pick email or text' using errcode = '22023'; end if;

  foreach v_key in array array['google_url', 'checkatrade_url', 'trustatrader_url', 'facebook_url'] loop
    if p_patch ? v_key then
      v_url := nullif(btrim(coalesce(p_patch->>v_key, '')), '');
      if v_url is not null and v_url ~* '^http://' then v_url := 'https://' || substr(v_url, 8); end if;
      if v_url is not null and v_url !~* '^https?://' then v_url := 'https://' || v_url; end if;
      if v_url is not null and (v_url !~* '^https://[^\s<>"]+\.[^\s<>"]+$' or length(v_url) > 500) then
        raise exception 'That does not look like a web link: %', left(v_url, 80) using errcode = '22023';
      end if;
      v_links := v_links || jsonb_build_object(v_key, v_url);
    else
      v_links := v_links || jsonb_build_object(v_key, to_jsonb(old) -> v_key);
    end if;
  end loop;

  if p_patch ? 'message' then
    v_msg := nullif(btrim(coalesce(p_patch->>'message', '')), '');
    if v_msg = public._review_default_message() then v_msg := null; end if;
  else
    v_msg := old.message;
  end if;
  if v_msg is not null and length(v_msg) > 600 then
    raise exception 'Keep the wording under 600 characters' using errcode = '22023';
  end if;
  v_problem := public._review_wording_problem(v_msg);
  if v_problem is not null then raise exception '%', v_problem using errcode = '22023'; end if;

  if v_on and coalesce(v_links->>'google_url', v_links->>'checkatrade_url',
                       v_links->>'trustatrader_url', v_links->>'facebook_url') is null then
    raise exception 'Add at least one review link before turning this on' using errcode = '22023';
  end if;

  select coalesce(nullif(btrim(full_name), ''), 'Someone') into v_name from public.profiles where id = auth.uid();

  insert into public.employer_review_settings as t (
    employer_id, enabled, enabled_at, delay_days, cooldown_days, channel, wait_for_job_complete,
    google_url, checkatrade_url, trustatrader_url, facebook_url, message, changed_by, changed_by_name, updated_at)
  values (
    v_firm, v_on, case when v_on then now() end, v_delay, v_cool, v_channel,
    coalesce((p_patch->>'wait_for_job_complete')::boolean, old.wait_for_job_complete),
    v_links->>'google_url', v_links->>'checkatrade_url', v_links->>'trustatrader_url', v_links->>'facebook_url',
    v_msg, auth.uid(), v_name, now())
  on conflict (employer_id) do update set
    enabled = excluded.enabled,
    -- Switching on stamps the start; payments before it are never asked about.
    enabled_at = case when excluded.enabled and not t.enabled then now()
                      when excluded.enabled then t.enabled_at else t.enabled_at end,
    delay_days = excluded.delay_days, cooldown_days = excluded.cooldown_days,
    channel = excluded.channel, wait_for_job_complete = excluded.wait_for_job_complete,
    google_url = excluded.google_url, checkatrade_url = excluded.checkatrade_url,
    trustatrader_url = excluded.trustatrader_url, facebook_url = excluded.facebook_url,
    message = excluded.message, changed_by = excluded.changed_by,
    changed_by_name = excluded.changed_by_name, updated_at = now();

  -- A new delay applies to anything still waiting.
  if v_delay <> old.delay_days then
    update public.employer_review_requests
       set due_at = base_at + make_interval(days => v_delay), updated_at = now()
     where employer_id = v_firm and status = 'queued';
  end if;

  insert into public.employer_audit_log (employer_id, actor_id, action, entity, entity_id, detail)
  values (v_firm, auth.uid(), 'review_settings', 'employer_review_settings', null,
          jsonb_build_object('enabled', v_on, 'was_enabled', old.enabled, 'delay_days', v_delay,
                             'cooldown_days', v_cool, 'channel', v_channel));

  return public.get_review_requests(v_firm);
end $$;
revoke all on function public.save_review_settings(uuid, jsonb) from public, anon;
grant execute on function public.save_review_settings(uuid, jsonb) to authenticated;

-- The exact wording, for the preview in Settings. Same functions the sender uses.
create or replace function public.preview_review_request(p_firm uuid, p_message text default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := coalesce(p_firm, public.my_default_employer_id());
  v_name text;
begin
  if auth.uid() is null or v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'You do not have access to this firm''s review requests' using errcode = '42501';
  end if;
  v_name := public._review_firm_name(v_firm);
  return jsonb_build_object(
    'subject', 'How did we do? ' || v_name,
    'greeting', 'Hi Sam,',
    'paragraph', public._review_paragraph(p_message, v_name, 'Sam'),
    'sms', public._review_sms_body(p_message, v_name, 'Sam', public._review_link_base() || '?t=…'),
    'sms_segments', public._msg_segments(public._review_sms_body(p_message, v_name, 'Sam',
                      public._review_link_base() || '?t=00000000-0000-0000-0000-000000000000')),
    'problem', public._review_wording_problem(p_message));
end $$;
revoke all on function public.preview_review_request(uuid, text) from public, anon;
grant execute on function public.preview_review_request(uuid, text) to authenticated;

