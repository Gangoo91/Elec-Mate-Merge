-- ELE-2077 Public REST API and webhooks for firms.
--
--   * firm_api_keys       per-firm keys, minted by the OWNER only, SHA-256 at rest,
--                         scoped per resource, rate-limited, revocable.
--   * firm_api_access_log every call by a known key (rate limit counts from here).
--   * firm_webhooks       the owner's endpoints + the events they want, with a
--                         signing secret the app never reads back.
--   * firm_webhook_deliveries  the outbox: one row per event per endpoint,
--                         retried with backoff by the firm-webhook-dispatch function.
--   * _firm_api_read      the only way the firm-api function reads data: every
--                         query is pinned to the key's firm.
--   * three AFTER triggers (employer_jobs, quotes, employer_job_certificates)
--     that enqueue events ONLY for firms with a live webhook. Each trigger
--     body is wrapped so that a failure can never block the write it rides on.
--
-- Additive: new tables, functions and AFTER ROW triggers. Nothing existing changes.

-- 1 ─ API keys ───────────────────────────────────────────────────────────────
create table if not exists public.firm_api_keys (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.profiles(id) on delete cascade,
  label text not null check (length(btrim(label)) between 1 and 80),
  key_prefix text not null,
  key_hash text not null unique,
  scopes text[] not null check (
    cardinality(scopes) > 0
    and scopes <@ array['jobs', 'customers', 'quotes', 'invoices', 'timesheets', 'certificates']::text[]),
  rate_limit_per_minute integer not null default 60 check (rate_limit_per_minute between 1 and 600),
  created_by uuid,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  revoked_by uuid
);
comment on table public.firm_api_keys is
  '[EMPLOYER HUB] Read-only REST API keys a firm owner mints (ELE-2077). Only a SHA-256 hash and a short display prefix are stored; the key is shown once. Scope: firm_id = the owning account, resource scopes, per-minute rate limit. Used by: Settings › Developers, firm-api edge function. Rule: owner only; never select key_hash to a client; revoke, never delete.';
create index if not exists firm_api_keys_firm_idx on public.firm_api_keys (firm_id, created_at desc);
alter table public.firm_api_keys enable row level security;
-- No client policies: listing, minting and revoking go through the functions below.

create table if not exists public.firm_api_access_log (
  id bigint generated always as identity primary key,
  firm_id uuid not null,
  key_id uuid not null references public.firm_api_keys(id) on delete cascade,
  resource text,
  status_code integer not null,
  row_count integer,
  detail text,
  ip_hash text,
  created_at timestamptz not null default now()
);
comment on table public.firm_api_access_log is
  '[EMPLOYER HUB] Every call made with a firm API key (ELE-2077): resource, status, rows, a salted IP hash. Scope: firm_id = the owning account. Used by: firm-api rate limit, Settings › Developers call counts. Rule: written only by firm-api (service role); the key itself is never logged.';
create index if not exists firm_api_access_log_key_idx on public.firm_api_access_log (key_id, created_at desc);
alter table public.firm_api_access_log enable row level security;

-- 2 ─ Webhooks ───────────────────────────────────────────────────────────────
create table if not exists public.firm_webhooks (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.profiles(id) on delete cascade,
  url text not null check (url ~ '^https://[^\s/$.?#][^\s]*$' and length(url) <= 500),
  events text[] not null check (
    cardinality(events) > 0
    and events <@ array['job.created', 'job.updated', 'job.completed',
                        'invoice.created', 'invoice.sent', 'invoice.paid', 'invoice.updated',
                        'certificate.linked']::text[]),
  secret text not null,
  description text,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_success_at timestamptz,
  last_failure_at timestamptz,
  consecutive_failures integer not null default 0
);
comment on table public.firm_webhooks is
  '[EMPLOYER HUB] A firm''s webhook endpoints and the events each wants (ELE-2077). Scope: firm_id = the owning account. Used by: Settings › Developers, the enqueue triggers, firm-webhook-dispatch. Rule: owner only, through the firm_webhook_* functions; the signing secret is shown once and never selected to a client.';
create index if not exists firm_webhooks_firm_idx on public.firm_webhooks (firm_id) where active;
alter table public.firm_webhooks enable row level security;

create table if not exists public.firm_webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  webhook_id uuid not null references public.firm_webhooks(id) on delete cascade,
  firm_id uuid not null,
  event text not null,
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'delivering', 'delivered', 'failed', 'dead')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_status_code integer,
  last_error text,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);
comment on table public.firm_webhook_deliveries is
  '[EMPLOYER HUB] Webhook outbox (ELE-2077): one row per event per endpoint, retried with backoff (1m, 5m, 30m, 2h, 12h, 24h) then dead. Scope: firm_id = the owning account. Used by: firm-webhook-dispatch, Settings › Developers recent deliveries. Rule: written by the enqueue triggers and the dispatcher only.';
create index if not exists firm_webhook_deliveries_due_idx
  on public.firm_webhook_deliveries (next_attempt_at) where status in ('pending', 'failed', 'delivering');
create index if not exists firm_webhook_deliveries_hook_idx
  on public.firm_webhook_deliveries (webhook_id, created_at desc);
alter table public.firm_webhook_deliveries enable row level security;

-- 3 ─ Owner-only management ─────────────────────────────────────────────────
-- "Owner" = the firm account itself (auth.uid() is the firm id). Co-admins
-- and office managers cannot create credentials that read the whole firm.
create or replace function public._firm_owner_only()
returns uuid language plpgsql stable security definer set search_path to 'public' as $$
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  return auth.uid();
end $$;
revoke all on function public._firm_owner_only() from public, anon;

create or replace function public.firm_api_key_mint(p_label text, p_scopes text[], p_rate integer default 60)
returns json language plpgsql volatile security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._firm_owner_only();
  v_key text := 'emf_' || encode(extensions.gen_random_bytes(24), 'hex');
  v_id uuid;
begin
  if coalesce(btrim(p_label), '') = '' then raise exception 'Give the key a name' using errcode = '22023'; end if;
  if p_scopes is null or cardinality(p_scopes) = 0 then raise exception 'Pick at least one thing the key can read' using errcode = '22023'; end if;
  if (select count(*) from public.firm_api_keys where firm_id = v_firm and revoked_at is null) >= 10 then
    raise exception 'A firm can hold 10 live keys. Revoke one first.' using errcode = 'P0001';
  end if;
  insert into public.firm_api_keys (firm_id, label, key_prefix, key_hash, scopes, rate_limit_per_minute, created_by)
  values (v_firm, btrim(p_label), left(v_key, 12), encode(extensions.digest(v_key, 'sha256'), 'hex'),
          (select array_agg(distinct s order by s) from unnest(p_scopes) s),
          least(greatest(coalesce(p_rate, 60), 1), 600), auth.uid())
  returning id into v_id;
  return json_build_object('id', v_id, 'key', v_key, 'prefix', left(v_key, 12));
end $$;
revoke all on function public.firm_api_key_mint(text, text[], integer) from public, anon;
grant execute on function public.firm_api_key_mint(text, text[], integer) to authenticated;

create or replace function public.firm_api_key_revoke(p_key uuid)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := public._firm_owner_only();
begin
  update public.firm_api_keys set revoked_at = now(), revoked_by = auth.uid()
   where id = p_key and firm_id = v_firm and revoked_at is null;
  if not found and not exists (select 1 from public.firm_api_keys where id = p_key and firm_id = v_firm) then
    raise exception 'Key not found' using errcode = '42501';
  end if;
end $$;
revoke all on function public.firm_api_key_revoke(uuid) from public, anon;
grant execute on function public.firm_api_key_revoke(uuid) to authenticated;

create or replace function public.firm_api_keys_list()
returns table (id uuid, label text, key_prefix text, scopes text[], rate_limit_per_minute integer,
               created_at timestamptz, last_used_at timestamptz, revoked_at timestamptz, calls_24h bigint)
language sql stable security definer set search_path to 'public' as $$
  select k.id, k.label, k.key_prefix, k.scopes, k.rate_limit_per_minute, k.created_at, k.last_used_at, k.revoked_at,
         (select count(*) from public.firm_api_access_log l where l.key_id = k.id and l.created_at > now() - interval '24 hours')
    from public.firm_api_keys k
   where auth.uid() is not null and k.firm_id = auth.uid()
   order by k.revoked_at nulls first, k.created_at desc
$$;
revoke all on function public.firm_api_keys_list() from public, anon;
grant execute on function public.firm_api_keys_list() to authenticated;

create or replace function public.firm_webhook_save(
  p_id uuid, p_url text, p_events text[], p_description text default null, p_active boolean default true)
returns json language plpgsql volatile security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._firm_owner_only();
  v_url text := btrim(coalesce(p_url, ''));
  v_host text;
  v_secret text;
  v_id uuid;
begin
  if v_url !~ '^https://' then raise exception 'The address must start with https://' using errcode = '22023'; end if;
  v_host := lower(split_part(split_part(split_part(substr(v_url, 9), '/', 1), '?', 1), ':', 1));
  if v_host in ('localhost', '') or v_host ~ '^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2[0-9]|3[01])\.)'
     or v_host ~ '\.(local|internal|localhost)$' or v_host like '[%' then
    raise exception 'That address is not reachable from the internet' using errcode = '22023';
  end if;
  if p_events is null or cardinality(p_events) = 0 then raise exception 'Pick at least one event' using errcode = '22023'; end if;
  if p_id is null then
    if (select count(*) from public.firm_webhooks where firm_id = v_firm) >= 10 then
      raise exception 'A firm can have 10 webhooks' using errcode = 'P0001';
    end if;
    v_secret := 'whsec_' || encode(extensions.gen_random_bytes(24), 'hex');
    insert into public.firm_webhooks (firm_id, url, events, secret, description, active, created_by)
    values (v_firm, v_url, (select array_agg(distinct e order by e) from unnest(p_events) e),
            v_secret, nullif(btrim(coalesce(p_description, '')), ''), coalesce(p_active, true), auth.uid())
    returning id into v_id;
    return json_build_object('id', v_id, 'secret', v_secret);
  end if;
  update public.firm_webhooks set
    url = v_url,
    events = (select array_agg(distinct e order by e) from unnest(p_events) e),
    description = nullif(btrim(coalesce(p_description, '')), ''),
    active = coalesce(p_active, active),
    consecutive_failures = case when coalesce(p_active, active) and not active then 0 else consecutive_failures end,
    updated_at = now()
   where id = p_id and firm_id = v_firm;
  if not found then raise exception 'Webhook not found' using errcode = '42501'; end if;
  return json_build_object('id', p_id);
end $$;
revoke all on function public.firm_webhook_save(uuid, text, text[], text, boolean) from public, anon;
grant execute on function public.firm_webhook_save(uuid, text, text[], text, boolean) to authenticated;

create or replace function public.firm_webhook_rotate_secret(p_id uuid)
returns json language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := public._firm_owner_only(); v_secret text := 'whsec_' || encode(extensions.gen_random_bytes(24), 'hex');
begin
  update public.firm_webhooks set secret = v_secret, updated_at = now() where id = p_id and firm_id = v_firm;
  if not found then raise exception 'Webhook not found' using errcode = '42501'; end if;
  return json_build_object('id', p_id, 'secret', v_secret);
end $$;
revoke all on function public.firm_webhook_rotate_secret(uuid) from public, anon;
grant execute on function public.firm_webhook_rotate_secret(uuid) to authenticated;

create or replace function public.firm_webhook_delete(p_id uuid)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := public._firm_owner_only();
begin
  delete from public.firm_webhooks where id = p_id and firm_id = v_firm;
  if not found then raise exception 'Webhook not found' using errcode = '42501'; end if;
end $$;
revoke all on function public.firm_webhook_delete(uuid) from public, anon;
grant execute on function public.firm_webhook_delete(uuid) to authenticated;

create or replace function public.firm_webhooks_list()
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', w.id, 'url', w.url, 'events', w.events, 'description', w.description, 'active', w.active,
           'created_at', w.created_at, 'last_success_at', w.last_success_at, 'last_failure_at', w.last_failure_at,
           'consecutive_failures', w.consecutive_failures,
           'pending', (select count(*) from public.firm_webhook_deliveries d
                        where d.webhook_id = w.id and d.status in ('pending', 'failed', 'delivering')),
           'recent', (select coalesce(jsonb_agg(jsonb_build_object(
                         'id', d.id, 'event', d.event, 'status', d.status, 'attempts', d.attempts,
                         'last_status_code', d.last_status_code, 'last_error', d.last_error,
                         'created_at', d.created_at, 'delivered_at', d.delivered_at) order by d.created_at desc), '[]'::jsonb)
                        from (select * from public.firm_webhook_deliveries d2 where d2.webhook_id = w.id
                               order by d2.created_at desc limit 10) d)
         ) order by w.created_at), '[]'::jsonb)
    from public.firm_webhooks w
   where auth.uid() is not null and w.firm_id = auth.uid()
$$;
revoke all on function public.firm_webhooks_list() from public, anon;
grant execute on function public.firm_webhooks_list() to authenticated;

-- 4 ─ The outbox ────────────────────────────────────────────────────────────
create or replace function public._firm_webhook_enqueue(p_firm uuid, p_event text, p_data jsonb)
returns integer language plpgsql volatile security definer set search_path to 'public' as $$
declare n integer;
begin
  insert into public.firm_webhook_deliveries (webhook_id, firm_id, event, payload)
  select w.id, w.firm_id, p_event,
         jsonb_build_object('id', 'evt_' || replace(gen_random_uuid()::text, '-', ''),
                            'type', p_event, 'created_at', now(), 'firm_id', p_firm, 'data', p_data)
    from public.firm_webhooks w
   where w.firm_id = p_firm and w.active and p_event = any (w.events);
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public._firm_webhook_enqueue(uuid, text, jsonb) from public, anon, authenticated;

-- A test event, from Settings › Developers.
create or replace function public.firm_webhook_send_test(p_id uuid)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare v_firm uuid := public._firm_owner_only();
begin
  insert into public.firm_webhook_deliveries (webhook_id, firm_id, event, payload)
  select w.id, w.firm_id, 'ping',
         jsonb_build_object('id', 'evt_' || replace(gen_random_uuid()::text, '-', ''), 'type', 'ping',
                            'created_at', now(), 'firm_id', w.firm_id, 'data', jsonb_build_object('message', 'Test event from Elec-Mate'))
    from public.firm_webhooks w where w.id = p_id and w.firm_id = v_firm;
  if not found then raise exception 'Webhook not found' using errcode = '42501'; end if;
end $$;
revoke all on function public.firm_webhook_send_test(uuid) from public, anon;
grant execute on function public.firm_webhook_send_test(uuid) to authenticated;

-- Dispatcher: claim due deliveries (lease 2 minutes), then report each result.
create or replace function public._firm_webhook_claim(p_limit integer default 50)
returns table (id uuid, webhook_id uuid, url text, secret text, event text, payload jsonb, attempts integer)
language plpgsql volatile security definer set search_path to 'public' as $$
#variable_conflict use_column
begin
  return query
  with due as (
    select d.id from public.firm_webhook_deliveries d
      join public.firm_webhooks w on w.id = d.webhook_id and w.active
     where d.status in ('pending', 'failed', 'delivering') and d.next_attempt_at <= now()
     order by d.next_attempt_at
     limit greatest(1, least(coalesce(p_limit, 50), 200))
     for update of d skip locked
  )
  update public.firm_webhook_deliveries d
     set status = 'delivering', next_attempt_at = now() + interval '2 minutes', attempts = d.attempts + 1
    from due, public.firm_webhooks w
   where d.id = due.id and w.id = d.webhook_id
  returning d.id, d.webhook_id, w.url, w.secret, d.event, d.payload, d.attempts;
end $$;
revoke all on function public._firm_webhook_claim(integer) from public, anon, authenticated;

create or replace function public._firm_webhook_result(p_id uuid, p_ok boolean, p_status integer, p_error text)
returns void language plpgsql volatile security definer set search_path to 'public' as $$
declare
  d public.firm_webhook_deliveries;
  v_backoff interval[] := array['1 minute', '5 minutes', '30 minutes', '2 hours', '12 hours', '24 hours']::interval[];
begin
  select * into d from public.firm_webhook_deliveries where id = p_id;
  if d.id is null then return; end if;
  if p_ok then
    update public.firm_webhook_deliveries
       set status = 'delivered', delivered_at = now(), last_status_code = p_status, last_error = null
     where id = p_id;
    update public.firm_webhooks set last_success_at = now(), consecutive_failures = 0 where id = d.webhook_id;
  else
    update public.firm_webhook_deliveries
       set status = case when d.attempts >= 7 then 'dead' else 'failed' end,
           next_attempt_at = now() + coalesce(v_backoff[d.attempts], interval '24 hours'),
           last_status_code = p_status, last_error = left(p_error, 300)
     where id = p_id;
    update public.firm_webhooks
       set last_failure_at = now(), consecutive_failures = consecutive_failures + 1,
           -- an endpoint that has failed 100 times in a row is switched off
           active = case when consecutive_failures + 1 >= 100 then false else active end
     where id = d.webhook_id;
  end if;
end $$;
revoke all on function public._firm_webhook_result(uuid, boolean, integer, text) from public, anon, authenticated;

-- 5 ─ Enqueue triggers. Cheap exit when the firm has no live webhook, and a
--     failure here is swallowed so it can never block the job/invoice/cert write.
create or replace function public.tg_firm_webhook_job()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_event text;
begin
  -- Cheap exit first (no subtransaction) for the many firms with no webhook.
  if not exists (select 1 from public.firm_webhooks w where w.firm_id = new.user_id and w.active) then
    return null;
  end if;
  begin
  if coalesce(new.is_template, false) then return null; end if;
  if tg_op = 'INSERT' then
    v_event := 'job.created';
  elsif new.completed_at is not null and old.completed_at is null then
    v_event := 'job.completed';
  elsif (new.status, new.board_stage, new.start_date, new.end_date, new.title, new.archived_at)
        is distinct from (old.status, old.board_stage, old.start_date, old.end_date, old.title, old.archived_at) then
    v_event := 'job.updated';
  else
    return null;
  end if;
  perform public._firm_webhook_enqueue(new.user_id, v_event, jsonb_build_object(
    'job', jsonb_build_object(
      'id', new.id, 'title', new.title, 'client', new.client, 'customer_id', new.customer_id,
      'location', new.location, 'status', new.status, 'stage', new.board_stage, 'job_type', new.job_type,
      'start_date', new.start_date, 'end_date', new.end_date, 'completed_at', new.completed_at,
      'archived_at', new.archived_at, 'updated_at', new.updated_at)));
  exception when others then
    raise warning '[tg_firm_webhook_job] %', sqlerrm;
  end;
  return null;
end $$;
revoke all on function public.tg_firm_webhook_job() from public, anon, authenticated;

drop trigger if exists zz_firm_webhook_job on public.employer_jobs;
create trigger zz_firm_webhook_job
  after insert or update on public.employer_jobs
  for each row execute function public.tg_firm_webhook_job();

create or replace function public.tg_firm_webhook_invoice()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_event text;
begin
  if new.invoice_raised is not true or new.deleted_at is not null then return null; end if;
  if not exists (select 1 from public.firm_webhooks w where w.firm_id = new.user_id and w.active) then
    return null;
  end if;
  begin
  if tg_op = 'INSERT' or old.invoice_raised is not true then
    v_event := 'invoice.created';
  elsif new.invoice_paid_at is not null and old.invoice_paid_at is null then
    v_event := 'invoice.paid';
  elsif new.invoice_sent_at is not null and old.invoice_sent_at is null then
    v_event := 'invoice.sent';
  elsif (new.invoice_status, new.total, new.invoice_due_date, new.total_paid)
        is distinct from (old.invoice_status, old.total, old.invoice_due_date, old.total_paid) then
    v_event := 'invoice.updated';
  else
    return null;
  end if;
  perform public._firm_webhook_enqueue(new.user_id, v_event, jsonb_build_object(
    'invoice', jsonb_build_object(
      'id', new.id, 'invoice_number', new.invoice_number, 'quote_number', new.quote_number,
      'customer_id', new.customer_id, 'job_id', new.employer_job_id,
      'client_name', new.client_data->>'name', 'status', new.invoice_status,
      'invoice_date', new.invoice_date, 'due_date', new.invoice_due_date,
      'sent_at', new.invoice_sent_at, 'paid_at', new.invoice_paid_at,
      'subtotal', new.subtotal, 'vat', new.vat_amount, 'total', new.total, 'total_paid', new.total_paid,
      'updated_at', new.updated_at)));
  exception when others then
    raise warning '[tg_firm_webhook_invoice] %', sqlerrm;
  end;
  return null;
end $$;
revoke all on function public.tg_firm_webhook_invoice() from public, anon, authenticated;

drop trigger if exists zz_firm_webhook_invoice on public.quotes;
create trigger zz_firm_webhook_invoice
  after insert or update on public.quotes
  for each row execute function public.tg_firm_webhook_invoice();

create or replace function public.tg_firm_webhook_certificate()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare r record;
begin
  if not exists (select 1 from public.firm_webhooks w where w.firm_id = new.employer_id and w.active) then
    return null;
  end if;
  begin
  select rp.report_id, rp.report_type, rp.certificate_number, rp.status, rp.client_name,
         rp.installation_address, rp.inspection_date
    into r from public.reports rp where rp.id = new.report_uuid;
  perform public._firm_webhook_enqueue(new.employer_id, 'certificate.linked', jsonb_build_object(
    'certificate', jsonb_build_object(
      'id', new.report_uuid, 'link_id', new.id, 'job_id', new.job_id, 'report_id', r.report_id,
      'type', r.report_type, 'certificate_number', r.certificate_number, 'status', r.status,
      'client_name', r.client_name, 'installation_address', r.installation_address,
      'inspection_date', r.inspection_date, 'linked_at', new.linked_at)));
  exception when others then
    raise warning '[tg_firm_webhook_certificate] %', sqlerrm;
  end;
  return null;
end $$;
revoke all on function public.tg_firm_webhook_certificate() from public, anon, authenticated;

drop trigger if exists zz_firm_webhook_certificate on public.employer_job_certificates;
create trigger zz_firm_webhook_certificate
  after insert on public.employer_job_certificates
  for each row execute function public.tg_firm_webhook_certificate();

-- 6 ─ The read API. Service role only; every query pinned to p_firm ─────────
create or replace function public._firm_api_read(
  p_firm uuid, p_resource text, p_since timestamptz, p_limit integer, p_offset integer)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 100), 500));
  v_offset integer := greatest(0, coalesce(p_offset, 0));
  v_since timestamptz := coalesce(p_since, '-infinity'::timestamptz);
  v jsonb;
begin
  if p_firm is null then return '[]'::jsonb; end if;
  if p_resource = 'jobs' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select j.id, j.title, j.client, j.customer_id, j.location, j.status, j.board_stage as stage, j.job_type,
             j.start_date, j.end_date, j.completed_at, j.archived_at, j.created_at, j.updated_at
        from public.employer_jobs j
       where j.user_id = p_firm and coalesce(j.is_template, false) = false and j.updated_at > v_since
       order by j.updated_at, j.id limit v_limit offset v_offset) x;
  elsif p_resource = 'customers' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select c.id, c.name, c.company_name, c.email, c.phone, c.address, c.postcode, c.tags, c.status,
             c.created_at, coalesce(c.updated_at, c.created_at) as updated_at
        from public.customers c
       where c.user_id = p_firm and coalesce(c.updated_at, c.created_at) > v_since
       order by coalesce(c.updated_at, c.created_at), c.id limit v_limit offset v_offset) x;
  elsif p_resource = 'quotes' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select q.id, q.quote_number, q.customer_id, q.employer_job_id as job_id, q.client_data->>'name' as client_name,
             q.status, q.acceptance_status, q.accepted_at, q.expiry_date, q.subtotal, q.vat_amount, q.total,
             q.created_at, q.updated_at
        from public.quotes q
       where q.user_id = p_firm and q.deleted_at is null and coalesce(q.invoice_raised, false) = false
         and q.updated_at > v_since
       order by q.updated_at, q.id limit v_limit offset v_offset) x;
  elsif p_resource = 'invoices' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select q.id, q.invoice_number, q.quote_number, q.customer_id, q.employer_job_id as job_id,
             q.client_data->>'name' as client_name, q.invoice_status as status, q.invoice_date,
             q.invoice_due_date as due_date, q.invoice_sent_at as sent_at, q.invoice_paid_at as paid_at,
             q.subtotal, q.vat_amount, q.total, q.total_paid, q.created_at, q.updated_at
        from public.quotes q
       where q.user_id = p_firm and q.deleted_at is null and q.invoice_raised is true
         and q.updated_at > v_since
       order by q.updated_at, q.id limit v_limit offset v_offset) x;
  elsif p_resource = 'timesheets' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select t.id, t.employee_id, e.name as employee_name, t.job_id, t.date, t.clock_in, t.clock_out,
             t.break_minutes, t.total_hours, t.status, t.approved_at, t.created_at, t.updated_at
        from public.employer_timesheets t
        join public.employer_employees e on e.id = t.employee_id
       where e.employer_id = p_firm and t.updated_at > v_since
       order by t.updated_at, t.id limit v_limit offset v_offset) x;
  elsif p_resource = 'certificates' then
    select coalesce(jsonb_agg(to_jsonb(x) order by x.updated_at, x.id), '[]'::jsonb) into v from (
      select r.id, l.job_id, r.report_id, r.report_type as type, r.certificate_number, r.status, r.client_name,
             r.installation_address, r.inspection_date, l.linked_at,
             greatest(l.linked_at, r.updated_at) as updated_at
        from public.employer_job_certificates l
        join public.reports r on r.id = l.report_uuid
       where l.employer_id = p_firm and greatest(l.linked_at, r.updated_at) > v_since
       order by greatest(l.linked_at, r.updated_at), r.id limit v_limit offset v_offset) x;
  else
    raise exception 'unknown resource' using errcode = '22023';
  end if;
  return v;
end $$;
revoke all on function public._firm_api_read(uuid, text, timestamptz, integer, integer) from public, anon, authenticated;

revoke all on function public._firm_owner_only() from authenticated;

-- 7 ─ Table grants (applied as inbox_api_lock_table_grants_ele2070_ele2077) ───
-- These tables are reached only through SECURITY DEFINER functions and the
-- service role. Take away the default table grants so RLS is not the only wall.
revoke all on table public.firm_messaging_settings, public.firm_customer_messages, public.firm_message_templates,
  public.firm_message_opt_outs, public.firm_api_keys, public.firm_api_access_log, public.firm_webhooks,
  public.firm_webhook_deliveries from anon;
revoke insert, update, delete, truncate, references, trigger on table public.firm_messaging_settings,
  public.firm_customer_messages, public.firm_message_templates, public.firm_message_opt_outs from authenticated;
revoke all on table public.firm_api_keys, public.firm_api_access_log, public.firm_webhooks,
  public.firm_webhook_deliveries from authenticated;
revoke all on sequence public.firm_api_access_log_id_seq from anon, authenticated;
