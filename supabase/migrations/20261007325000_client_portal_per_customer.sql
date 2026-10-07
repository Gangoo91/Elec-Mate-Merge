-- ELE-1996 + ELE-1837 — one client portal per CUSTOMER, not per job.
--
-- Before: client_portal_links were per employer_job (0 ever created), the
-- public RPCs were broken (get_portal_by_token read employer_jobs.address,
-- which does not exist), messages were keyed on the link token (so a new
-- token orphaned the thread) and the firm could only read them inside the
-- per-job portal sheet.
--
-- After:
--   * client_portal_links.customer_id: one live link per customer (owner,
--     admins and office managers create, share, pause, revoke, rotate and set
--     an expiry through SECURITY DEFINER functions; the table is read-only to
--     clients of the API).
--   * employer_client_messages belongs to the CUSTOMER thread (customer_id +
--     firm_id), survives token changes, and is written only through
--     functions. The firm is told through notify_employer_bell.
--   * client_portal_get(token) is the one public read: the firm's branding,
--     that customer's jobs (stage, dates, crew first names only for people
--     who have said yes), released certificates, quotes waiting for an answer,
--     invoices from the SHARED quotes table with the permanent /pay/<id> link,
--     the message thread and a review ask (only when the firm has a review
--     link on its profile). Nothing from Site Safety, no staff phones, no
--     surnames, no line items, no costs.
--   * Rate limits: per IP on every public call, per IP on bad tokens, per
--     link on messages.
--   * profiles.show_me_to_customers: the worker's own consent (default off).
--   * The old job-scoped public RPCs are closed to anon/authenticated.

-- ── 1. Worker consent ─────────────────────────────────────────────────────
alter table public.profiles
  add column if not exists show_me_to_customers boolean not null default false;
comment on column public.profiles.show_me_to_customers is
  'ELE-1837: the worker''s own consent to have their FIRST NAME shown to a firm''s customers on the client portal. Default off. Set only through set_show_me_to_customers().';

-- ── 2. Portal links: per customer ─────────────────────────────────────────
alter table public.client_portal_links
  add column if not exists customer_id uuid references public.customers(id) on delete cascade,
  add column if not exists revoked_at timestamptz,
  add column if not exists created_by uuid references auth.users(id) on delete set null,
  add column if not exists last_shared_at timestamptz,
  add column if not exists shared_via text,
  add column if not exists review_opt_out_at timestamptz;
alter table public.client_portal_links alter column job_id drop not null;
alter table public.client_portal_links alter column client_name drop not null;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'client_portal_links_scope_chk') then
    alter table public.client_portal_links
      add constraint client_portal_links_scope_chk check (customer_id is not null or job_id is not null);
  end if;
end $$;

create unique index if not exists client_portal_links_one_live_per_customer
  on public.client_portal_links (customer_id)
  where customer_id is not null and revoked_at is null;

-- A link can only ever point at a customer of the account that owns it.
create or replace function public._client_portal_links_guard()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.customer_id is not null and not exists (
    select 1 from public.customers c where c.id = new.customer_id and c.user_id = new.user_id
  ) then
    raise exception 'Portal link customer does not belong to this account' using errcode = '42501';
  end if;
  return new;
end $$;
revoke all on function public._client_portal_links_guard() from public, anon, authenticated;

drop trigger if exists trg_client_portal_links_guard on public.client_portal_links;
create trigger trg_client_portal_links_guard
  before insert or update of customer_id, user_id on public.client_portal_links
  for each row execute function public._client_portal_links_guard();

-- Writes only through the functions below; firm members read their own.
drop policy if exists "Firm managers manage client_portal_links" on public.client_portal_links;
drop policy if exists "Users can create their own portal links" on public.client_portal_links;
drop policy if exists "Users can delete their own portal links" on public.client_portal_links;
drop policy if exists "Users can update their own portal links" on public.client_portal_links;
drop policy if exists "Users can view their own portal links" on public.client_portal_links;
create policy "Firm office reads client_portal_links" on public.client_portal_links
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));
revoke all on public.client_portal_links from anon;
revoke insert, update, delete on public.client_portal_links from authenticated;

comment on table public.client_portal_links is
  '[EMPLOYER HUB] Customer portal links: one live link per customer (customer_id), plus legacy per-job rows (job_id, none exist). Scope: user_id = the owning account (for a firm: the owner''s profiles.id); owner, admins and office managers reach it via my_employer_scope(). Used by: Employer Hub client record (Share portal), Client portal section, invoice email, public /portal/:token via client_portal_get(). Rule: written only through ensure_customer_portal_link / manage_customer_portal_link; access_token is a 66-char random secret; revoked_at kills a token for good.';

-- ── 3. Messages: the customer thread ──────────────────────────────────────
alter table public.employer_client_messages
  add column if not exists customer_id uuid references public.customers(id) on delete cascade,
  add column if not exists firm_id uuid,
  add column if not exists link_id uuid references public.client_portal_links(id) on delete set null,
  add column if not exists sender_user_id uuid references auth.users(id) on delete set null;
alter table public.employer_client_messages alter column access_token drop not null;

create index if not exists employer_client_messages_customer_idx
  on public.employer_client_messages (customer_id, created_at);
create index if not exists employer_client_messages_firm_unread_idx
  on public.employer_client_messages (firm_id, created_at desc)
  where sender_type = 'client' and read_at is null;

drop policy if exists "Portal owner marks read" on public.employer_client_messages;
drop policy if exists "Portal owner reads client messages" on public.employer_client_messages;
drop policy if exists "Portal owner replies" on public.employer_client_messages;
create policy "Firm office reads client messages" on public.employer_client_messages
  for select to authenticated
  using (firm_id in (select public.my_employer_scope()));
revoke all on public.employer_client_messages from anon;
revoke insert, update, delete on public.employer_client_messages from authenticated;

comment on table public.employer_client_messages is
  '[EMPLOYER HUB] The message thread between a firm and one customer (customer_id), from the client portal and the client record. Scope: firm_id = the owning account; owner, admins and office managers read via my_employer_scope(). Used by: client record Messages, Client portal section, public portal. Rule: written only through client_portal_send_message (customer) and reply_customer_message (firm); access_token/job_id are legacy and stay null on new rows.';

-- ── 4. Rate-limit ledger ──────────────────────────────────────────────────
create table if not exists public.client_portal_rate_events (
  id bigserial primary key,
  bucket text not null,
  created_at timestamptz not null default now()
);
create index if not exists client_portal_rate_events_bucket_idx
  on public.client_portal_rate_events (bucket, created_at desc);
alter table public.client_portal_rate_events enable row level security;
revoke all on public.client_portal_rate_events from anon, authenticated;
comment on table public.client_portal_rate_events is
  '[EMPLOYER HUB] Rate-limit ledger for the public client portal: one row per hit per bucket (ip:, bad:, msg:). Scope: system, no customer data. Used by: client_portal_* public functions. Rule: written only by _client_portal_rate_ok; rows older than a day are pruned.';

create or replace function public._client_portal_ip()
returns text language sql stable set search_path = public as $$
  select coalesce(
    nullif(btrim(split_part(
      coalesce(nullif(current_setting('request.headers', true), ''), '{}')::json->>'x-forwarded-for',
      ',', 1)), ''),
    'unknown')
$$;
revoke all on function public._client_portal_ip() from public, anon, authenticated;

create or replace function public._client_portal_rate_ok(p_bucket text, p_max integer, p_window interval)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_n integer;
begin
  select count(*) into v_n from public.client_portal_rate_events
   where bucket = p_bucket and created_at > now() - p_window;
  if v_n >= p_max then return false; end if;
  insert into public.client_portal_rate_events (bucket) values (p_bucket);
  if random() < 0.02 then
    delete from public.client_portal_rate_events where created_at < now() - interval '1 day';
  end if;
  return true;
end $$;
revoke all on function public._client_portal_rate_ok(text, integer, interval) from public, anon, authenticated;

-- ── 5. Shared helpers ─────────────────────────────────────────────────────
-- The live link behind a token, or null. Never raises.
create or replace function public._client_portal_link(p_token text)
returns public.client_portal_links language plpgsql stable security definer set search_path = public as $$
declare l public.client_portal_links;
begin
  if p_token is null or length(p_token) < 40 or length(p_token) > 128 then return null; end if;
  select * into l from public.client_portal_links
   where access_token = p_token and customer_id is not null;
  if not found then return null; end if;
  return l;
end $$;
revoke all on function public._client_portal_link(text) from public, anon, authenticated;

-- The firm (owning account) of a customer, if the caller may act for it.
create or replace function public._client_portal_firm_for(p_customer_id uuid)
returns uuid language plpgsql stable security definer set search_path = public as $$
declare v_firm uuid;
begin
  select c.user_id into v_firm from public.customers c
   where c.id = p_customer_id and c.user_id in (select public.my_employer_scope());
  if v_firm is null then
    raise exception 'Client not found' using errcode = '42501';
  end if;
  return v_firm;
end $$;
revoke all on function public._client_portal_firm_for(uuid) from public, anon, authenticated;

create or replace function public._client_portal_link_json(l public.client_portal_links)
returns jsonb language sql stable set search_path = public as $$
  select case when l.id is null then null else jsonb_build_object(
    'id', l.id,
    'token', l.access_token,
    'is_active', coalesce(l.is_active, true),
    'expires_at', l.expires_at,
    'expired', l.expires_at is not null and l.expires_at <= now(),
    'usable', coalesce(l.is_active, true) and l.revoked_at is null
              and (l.expires_at is null or l.expires_at > now()),
    'views', coalesce(l.views_count, 0),
    'last_opened_at', l.last_accessed_at,
    'last_shared_at', l.last_shared_at,
    'shared_via', l.shared_via,
    'created_at', l.created_at
  ) end
$$;
revoke all on function public._client_portal_link_json(public.client_portal_links) from public, anon, authenticated;

-- ── 6. Office functions (signed in, firm scope) ───────────────────────────
create or replace function public.get_customer_portal(p_customer_id uuid)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_firm uuid := public._client_portal_firm_for(p_customer_id);
  l public.client_portal_links;
begin
  select * into l from public.client_portal_links
   where customer_id = p_customer_id and revoked_at is null
   order by created_at desc limit 1;
  return jsonb_build_object(
    'link', public._client_portal_link_json(l),
    'unread', (select count(*) from public.employer_client_messages m
                where m.customer_id = p_customer_id and m.firm_id = v_firm
                  and m.sender_type = 'client' and m.read_at is null),
    'messages', (select count(*) from public.employer_client_messages m
                  where m.customer_id = p_customer_id and m.firm_id = v_firm)
  );
end $$;
revoke all on function public.get_customer_portal(uuid) from public, anon;
grant execute on function public.get_customer_portal(uuid) to authenticated;

-- Returns the customer's live link, creating it the first time.
create or replace function public.ensure_customer_portal_link(
  p_customer_id uuid, p_expires_days integer default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_firm uuid := public._client_portal_firm_for(p_customer_id);
  l public.client_portal_links;
begin
  if p_expires_days is not null and (p_expires_days < 1 or p_expires_days > 3650) then
    raise exception 'Expiry must be between 1 and 3650 days' using errcode = '22023';
  end if;
  select * into l from public.client_portal_links
   where customer_id = p_customer_id and revoked_at is null
   order by created_at desc limit 1 for update;
  if not found then
    insert into public.client_portal_links
      (user_id, customer_id, job_id, client_name, client_email, access_token,
       permissions, is_active, expires_at, created_by)
    select v_firm, c.id, null, c.name, c.email,
           'cp' || encode(extensions.gen_random_bytes(32), 'hex'),
           '{}'::jsonb, true,
           case when p_expires_days is null then null else now() + make_interval(days => p_expires_days) end,
           auth.uid()
      from public.customers c where c.id = p_customer_id
    returning * into l;
  end if;
  return public._client_portal_link_json(l);
end $$;
revoke all on function public.ensure_customer_portal_link(uuid, integer) from public, anon;
grant execute on function public.ensure_customer_portal_link(uuid, integer) to authenticated;

-- pause | resume | revoke | rotate | expiry | shared
create or replace function public.manage_customer_portal_link(
  p_link_id uuid, p_action text, p_days integer default null, p_via text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  l public.client_portal_links;
  n public.client_portal_links;
begin
  select * into l from public.client_portal_links
   where id = p_link_id and customer_id is not null
     and user_id in (select public.my_employer_scope())
   for update;
  if not found then
    raise exception 'Portal link not found' using errcode = '42501';
  end if;
  if l.revoked_at is not null and p_action <> 'shared' then
    raise exception 'This link has been switched off for good' using errcode = '22023';
  end if;
  if p_days is not null and (p_days < 1 or p_days > 3650) then
    raise exception 'Expiry must be between 1 and 3650 days' using errcode = '22023';
  end if;

  if p_action = 'pause' then
    update public.client_portal_links set is_active = false, updated_at = now()
     where id = l.id returning * into n;
  elsif p_action = 'resume' then
    update public.client_portal_links set is_active = true, updated_at = now()
     where id = l.id returning * into n;
  elsif p_action = 'revoke' then
    update public.client_portal_links set is_active = false, revoked_at = now(), updated_at = now()
     where id = l.id;
    return jsonb_build_object('link', null);
  elsif p_action = 'rotate' then
    update public.client_portal_links set is_active = false, revoked_at = now(), updated_at = now()
     where id = l.id;
    insert into public.client_portal_links
      (user_id, customer_id, job_id, client_name, client_email, access_token,
       permissions, is_active, expires_at, created_by, review_opt_out_at)
    values (l.user_id, l.customer_id, null, l.client_name, l.client_email,
            'cp' || encode(extensions.gen_random_bytes(32), 'hex'),
            '{}'::jsonb, true,
            case when p_days is null then null else now() + make_interval(days => p_days) end,
            auth.uid(), l.review_opt_out_at)
    returning * into n;
  elsif p_action = 'expiry' then
    update public.client_portal_links
       set expires_at = case when p_days is null then null else now() + make_interval(days => p_days) end,
           updated_at = now()
     where id = l.id returning * into n;
  elsif p_action = 'shared' then
    update public.client_portal_links
       set last_shared_at = now(),
           shared_via = left(nullif(btrim(coalesce(p_via, '')), ''), 30)
     where id = l.id returning * into n;
  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;
  return jsonb_build_object('link', public._client_portal_link_json(n));
end $$;
revoke all on function public.manage_customer_portal_link(uuid, text, integer, text) from public, anon;
grant execute on function public.manage_customer_portal_link(uuid, text, integer, text) to authenticated;

create or replace function public.get_customer_messages(p_customer_id uuid)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare v_firm uuid := public._client_portal_firm_for(p_customer_id);
begin
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'id', m.id, 'message', m.message, 'sender_type', m.sender_type,
      'created_at', m.created_at, 'read_at', m.read_at,
      'sender_name', case when m.sender_type = 'employer'
                          then nullif(split_part(btrim(coalesce(p.full_name, '')), ' ', 1), '') end
    ) order by m.created_at)
    from (select * from public.employer_client_messages
           where customer_id = p_customer_id and firm_id = v_firm
           order by created_at desc limit 300) m
    left join public.profiles p on p.id = m.sender_user_id
  ), '[]'::jsonb);
end $$;
revoke all on function public.get_customer_messages(uuid) from public, anon;
grant execute on function public.get_customer_messages(uuid) to authenticated;

create or replace function public.reply_customer_message(p_customer_id uuid, p_message text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_firm uuid := public._client_portal_firm_for(p_customer_id);
  v_body text := btrim(coalesce(p_message, ''));
  v_id uuid;
  v_link uuid;
begin
  if length(v_body) = 0 then raise exception 'Write a message first' using errcode = '22023'; end if;
  if length(v_body) > 4000 then raise exception 'Message is too long' using errcode = '22023'; end if;
  select id into v_link from public.client_portal_links
   where customer_id = p_customer_id and revoked_at is null order by created_at desc limit 1;
  insert into public.employer_client_messages
    (customer_id, firm_id, link_id, message, sender_type, sender_user_id)
  values (p_customer_id, v_firm, v_link, v_body, 'employer', auth.uid())
  returning id into v_id;
  -- Replying means the office has read the thread.
  update public.employer_client_messages set read_at = now()
   where customer_id = p_customer_id and firm_id = v_firm
     and sender_type = 'client' and read_at is null;
  return jsonb_build_object('id', v_id);
end $$;
revoke all on function public.reply_customer_message(uuid, text) from public, anon;
grant execute on function public.reply_customer_message(uuid, text) to authenticated;

create or replace function public.mark_customer_messages_read(p_customer_id uuid)
returns integer language plpgsql security definer set search_path = public as $$
declare v_firm uuid := public._client_portal_firm_for(p_customer_id); v_n integer;
begin
  update public.employer_client_messages set read_at = now()
   where customer_id = p_customer_id and firm_id = v_firm
     and sender_type = 'client' and read_at is null;
  get diagnostics v_n = row_count;
  return v_n;
end $$;
revoke all on function public.mark_customer_messages_read(uuid) from public, anon;
grant execute on function public.mark_customer_messages_read(uuid) to authenticated;

-- Every customer thread the caller's firm(s) have, newest first.
create or replace function public.get_client_message_inbox()
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(t order by t->>'last_at' desc), '[]'::jsonb)
  from (
    select jsonb_build_object(
      'customer_id', c.id,
      'customer_name', coalesce(nullif(c.company_name, ''), c.name),
      'contact_name', c.name,
      'last_message', left(last.message, 160),
      'last_from', last.sender_type,
      'last_at', last.created_at,
      'unread', (select count(*) from public.employer_client_messages u
                  where u.customer_id = c.id and u.firm_id = c.user_id
                    and u.sender_type = 'client' and u.read_at is null)
    ) as t
    from public.customers c
    join lateral (
      select m.message, m.sender_type, m.created_at
        from public.employer_client_messages m
       where m.customer_id = c.id and m.firm_id = c.user_id
       order by m.created_at desc limit 1
    ) last on true
    where c.user_id in (select public.my_employer_scope())
    order by last.created_at desc
    limit 60
  ) x
$$;
revoke all on function public.get_client_message_inbox() from public, anon;
grant execute on function public.get_client_message_inbox() to authenticated;

-- Worker consent (their own profile only).
create or replace function public.get_show_me_to_customers()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'on', coalesce((select p.show_me_to_customers from public.profiles p where p.id = auth.uid()), false),
    'on_roster', exists (select 1 from public.employer_employees e
                          where e.user_id = auth.uid() and e.employer_id is not null
                            and lower(coalesce(e.status, '')) = 'active'))
$$;
revoke all on function public.get_show_me_to_customers() from public, anon;
grant execute on function public.get_show_me_to_customers() to authenticated;

create or replace function public.set_show_me_to_customers(p_on boolean)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  update public.profiles set show_me_to_customers = coalesce(p_on, false) where id = auth.uid();
  return coalesce(p_on, false);
end $$;
revoke all on function public.set_show_me_to_customers(boolean) from public, anon;
grant execute on function public.set_show_me_to_customers(boolean) to authenticated;

-- ── 7. Public functions (token only) ──────────────────────────────────────
create or replace function public.client_portal_get(p_token text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  v_ip text := public._client_portal_ip();
  l public.client_portal_links;
  v_firm uuid;
  v_cust uuid;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_qs boolean;
  v_cards boolean;
  v_storage text := 'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/';
  v_links jsonb;
  v_review jsonb;
begin
  if not public._client_portal_rate_ok('ip:' || v_ip, 300, interval '10 minutes') then
    return jsonb_build_object('error', 'rate_limited');
  end if;
  if (select count(*) from public.client_portal_rate_events
       where bucket = 'bad:' || v_ip and created_at > now() - interval '10 minutes') >= 20 then
    return jsonb_build_object('error', 'rate_limited');
  end if;

  l := public._client_portal_link(p_token);
  if l.id is null then
    perform public._client_portal_rate_ok('bad:' || v_ip, 1000000, interval '10 minutes');
    return jsonb_build_object('error', 'not_found');
  end if;
  if l.revoked_at is not null then return jsonb_build_object('error', 'not_found'); end if;
  if not coalesce(l.is_active, true) then return jsonb_build_object('error', 'paused'); end if;
  if l.expires_at is not null and l.expires_at <= now() then
    return jsonb_build_object('error', 'expired');
  end if;

  v_firm := l.user_id;
  v_cust := l.customer_id;

  update public.client_portal_links
     set views_count = coalesce(views_count, 0) + 1, last_accessed_at = now()
   where id = l.id;

  select coalesce(cp.qs_approval_required, false),
         (cp.stripe_account_id is not null and cp.stripe_account_status = 'active')
    into v_qs, v_cards
    from public.company_profiles cp where cp.user_id = v_firm
   order by cp.updated_at desc nulls last limit 1;
  v_qs := coalesce(v_qs, false);
  v_cards := coalesce(v_cards, false);

  -- Review destinations: only links the firm itself saved, never invented.
  select jsonb_agg(jsonb_build_object(
           'label', coalesce(nullif(btrim(x->>'label'), ''), 'Leave a review'),
           'url', substring(x->>'url' from 'https?://[^[:space:]"<>]+')))
    into v_links
    from public.company_profiles cp
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(cp.review_links) = 'array' then cp.review_links else '[]'::jsonb end) x
   where cp.user_id = v_firm
     and cp.review_request_enabled is distinct from false
     and substring(x->>'url' from 'https?://[^[:space:]"<>]+') is not null;

  if v_links is not null and l.review_opt_out_at is null then
    select jsonb_build_object(
             'job_id', j.id,
             'job_title', j.title,
             'completed_at', coalesce(j.completed_at, j.end_date::timestamptz),
             'names', coalesce((
               select jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                 from public.employer_job_assignments a
                 join public.employer_employees e on e.id = a.employee_id
                 join public.profiles pr on pr.id = e.user_id and pr.show_me_to_customers
                where a.job_id = j.id
                  and lower(coalesce(a.status, '')) not in ('cancelled', 'declined', 'removed')
                  and btrim(coalesce(e.name, '')) <> ''), '[]'::jsonb),
             'links', v_links,
             'message', (select nullif(btrim(cp.review_request_message), '')
                           from public.company_profiles cp where cp.user_id = v_firm
                          order by cp.updated_at desc nulls last limit 1))
      into v_review
      from public.employer_jobs j
     where j.customer_id = v_cust and j.user_id = v_firm and j.archived_at is null
       and (j.completed_at is not null or j.board_stage = 'Complete'
            or lower(coalesce(j.status, '')) in ('completed', 'complete'))
       and coalesce(j.completed_at, j.updated_at) > now() - interval '90 days'
     order by coalesce(j.completed_at, j.updated_at) desc
     limit 1;
  end if;

  return jsonb_build_object(
    'firm', (
      select jsonb_build_object(
        'name', coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'Your electrician'),
        'logo_url', coalesce(nullif(cp.logo_url, ''),
                             case when length(coalesce(cp.logo_data_url, '')) between 1 and 400000
                                  then cp.logo_data_url end),
        'primary_color', nullif(cp.primary_color, ''),
        'accent_color', nullif(cp.accent_color, ''),
        'phone', nullif(btrim(cp.company_phone), ''),
        'email', nullif(btrim(cp.company_email), ''),
        'website', nullif(btrim(cp.company_website), ''),
        'registration_scheme', nullif(btrim(cp.registration_scheme), ''))
      from public.profiles p
      left join lateral (select * from public.company_profiles c2 where c2.user_id = p.id
                          order by c2.updated_at desc nulls last limit 1) cp on true
      where p.id = v_firm),
    'customer', (
      select jsonb_build_object('name', c.name, 'company_name', nullif(c.company_name, ''))
        from public.customers c where c.id = v_cust),
    'today', v_today,
    'jobs', coalesce((
      select jsonb_agg(row_to_json(j)::jsonb order by j.sort_rank, j.sort_date)
      from (
        select ej.id,
               ej.title,
               nullif(btrim(ej.location), '') as address,
               ej.start_date, ej.end_date,
               ej.completed_at,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete') then 'complete'
                 when ej.board_stage = 'On Hold' or lower(coalesce(ej.status, '')) in ('on hold', 'paused') then 'on_hold'
                 when ej.board_stage in ('In Progress', 'Testing')
                      or (ej.start_date is not null and ej.start_date <= v_today
                          and coalesce(ej.end_date, ej.start_date) >= v_today) then 'in_progress'
                 when ej.start_date is not null and ej.start_date > v_today then 'booked'
                 when lower(coalesce(ej.status, '')) = 'active' and ej.start_date is not null then 'in_progress'
                 else 'arranging'
               end as stage,
               (select jsonb_build_object(
                  'count', count(distinct a.employee_id),
                  'named', coalesce(jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                             filter (where pr.show_me_to_customers and btrim(coalesce(e.name, '')) <> ''), '[]'::jsonb),
                  'today', coalesce(jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                             filter (where pr.show_me_to_customers and btrim(coalesce(e.name, '')) <> ''
                                     and v_today between a.start_date and coalesce(a.end_date, a.start_date)), '[]'::jsonb),
                  'today_count', count(distinct a.employee_id)
                             filter (where v_today between a.start_date and coalesce(a.end_date, a.start_date)),
                  'next_date', min(a.start_date) filter (where a.start_date >= v_today),
                  'next_time', (array_agg(a.start_time order by a.start_date)
                                 filter (where a.start_date >= v_today))[1])
                  from public.employer_job_assignments a
                  join public.employer_employees e on e.id = a.employee_id
                  left join public.profiles pr on pr.id = e.user_id
                 where a.job_id = ej.id
                   and lower(coalesce(a.status, '')) not in ('cancelled', 'declined', 'removed')
                   and coalesce(a.end_date, a.start_date) >= v_today) as crew,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete') then 2
                 else 1 end as sort_rank,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete')
                   then -extract(epoch from coalesce(ej.completed_at, ej.end_date::timestamptz, ej.updated_at))
                 else extract(epoch from coalesce(ej.start_date::timestamptz, ej.created_at))
               end as sort_date
          from public.employer_jobs ej
         where ej.customer_id = v_cust and ej.user_id = v_firm
           and ej.archived_at is null and coalesce(ej.is_template, false) = false
           and lower(coalesce(ej.status, '')) not in ('cancelled')
           and coalesce(ej.board_stage, '') <> 'Enquiry'
         order by ej.created_at desc
         limit 100
      ) j), '[]'::jsonb),
    'certificates', coalesce((
      select jsonb_agg(row_to_json(x)::jsonb order by x.sort_at desc)
      from (
        select r.id, r.report_type, r.certificate_number,
               r.inspection_date, r.next_inspection_due,
               nullif(btrim(r.installation_address), '') as address,
               case
                 when held.yes or (v_qs and r.user_id <> v_firm and not qs_ok.yes) then 'finalising'
                 when r.pdf_url like v_storage || '%' then 'ready'
                 else 'ask'
               end as state,
               case
                 when held.yes or (v_qs and r.user_id <> v_firm and not qs_ok.yes) then null
                 when r.pdf_url like v_storage || '%' then r.pdf_url
               end as pdf_url,
               coalesce(r.inspection_date::timestamptz, r.created_at) as sort_at
          from public.reports r
          cross join lateral (select exists (
              select 1 from public.quotes q
               where q.linked_certificate_id = r.report_id and q.user_id = v_firm
                 and q.deleted_at is null and q.certificate_release_mode = 'on_payment'
                 and q.certificate_released_at is null) as yes) held
          cross join lateral (select exists (
              select 1 from public.report_qs_reviews qr
               where qr.report_uuid = r.id and qr.status = 'approved') as yes) qs_ok
         where r.customer_id = v_cust
           and (r.user_id = v_firm or r.user_id in (
                 select e.user_id from public.employer_employees e
                  where e.employer_id = v_firm and e.user_id is not null))
           and r.deleted_at is null and r.status = 'completed' and r.superseded_by is null
         order by coalesce(r.inspection_date::timestamptz, r.created_at) desc
         limit 60
      ) x), '[]'::jsonb),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q.id,
               'number', q.quote_number,
               'title', nullif(btrim(q.job_details->>'title'), ''),
               'total', coalesce(q.total, 0),
               'sent_at', coalesce(q.first_sent_at, q.created_at),
               'expires_at', q.expiry_date,
               'is_estimate', coalesce(q.is_estimate, false),
               'url', '/public-quote/' || q.public_token)
             order by q.created_at desc)
        from public.quotes q
       where q.customer_id = v_cust and q.user_id = v_firm
         and q.deleted_at is null and not coalesce(q.invoice_raised, false)
         and q.status = 'sent' and coalesce(q.acceptance_status, 'pending') = 'pending'
         and q.public_token is not null and coalesce(q.is_active_version, true)
         and (q.expiry_date is null or q.expiry_date >= now())), '[]'::jsonb),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q.id,
               'number', coalesce(q.invoice_number, q.quote_number),
               'title', nullif(btrim(q.job_details->>'title'), ''),
               'total', coalesce(q.total, 0),
               'paid_so_far', least(coalesce(q.total_paid, 0), coalesce(q.total, 0)),
               'issued_at', coalesce(q.invoice_date, q.invoice_sent_at, q.created_at),
               'due_date', q.invoice_due_date,
               'state', case
                          when lower(coalesce(q.invoice_status, '')) = 'paid' or q.invoice_paid_at is not null then 'paid'
                          when q.invoice_due_date is not null and q.invoice_due_date::date < v_today then 'overdue'
                          when coalesce(q.total_paid, 0) > 0 then 'part_paid'
                          else 'due' end,
               'pay_url', case
                            when lower(coalesce(q.invoice_status, '')) = 'paid' or q.invoice_paid_at is not null then null
                            when v_cards or q.stripe_payment_link_url is not null then '/pay/' || q.id
                          end,
               'pdf_url', case when q.pdf_url like v_storage || '%' then q.pdf_url end)
             order by coalesce(q.invoice_date, q.created_at) desc)
        from public.quotes q
       where q.customer_id = v_cust and q.user_id = v_firm
         and q.deleted_at is null and coalesce(q.invoice_raised, false)
         and lower(coalesce(q.invoice_status, '')) <> 'draft'), '[]'::jsonb),
    'bank_details', (
      select nullif(btrim(concat_ws(E'\n',
        case when coalesce(cp.bank_details->>'accountName', '') <> '' then 'Account name: ' || (cp.bank_details->>'accountName') end,
        case when coalesce(cp.bank_details->>'sortCode', '') <> '' then 'Sort code: ' || (cp.bank_details->>'sortCode') end,
        case when coalesce(cp.bank_details->>'accountNumber', '') <> '' then 'Account number: ' || (cp.bank_details->>'accountNumber') end
      )), '')
      from public.company_profiles cp where cp.user_id = v_firm
      order by cp.updated_at desc nulls last limit 1),
    'messages', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', m.id, 'message', m.message,
               'from', case when m.sender_type = 'client' then 'you' else 'firm' end,
               'created_at', m.created_at) order by m.created_at)
        from (select * from public.employer_client_messages
               where customer_id = v_cust and firm_id = v_firm
               order by created_at desc limit 200) m), '[]'::jsonb),
    'review', v_review,
    'expires_at', l.expires_at
  );
end $$;
revoke all on function public.client_portal_get(text) from public;
grant execute on function public.client_portal_get(text) to anon, authenticated;

create or replace function public.client_portal_send_message(p_token text, p_message text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  v_ip text := public._client_portal_ip();
  l public.client_portal_links;
  v_body text := btrim(coalesce(p_message, ''));
  v_id uuid;
  v_at timestamptz;
begin
  if not public._client_portal_rate_ok('ip:' || v_ip, 300, interval '10 minutes') then
    return jsonb_build_object('error', 'rate_limited');
  end if;
  l := public._client_portal_link(p_token);
  if l.id is null or l.revoked_at is not null or not coalesce(l.is_active, true)
     or (l.expires_at is not null and l.expires_at <= now()) then
    perform public._client_portal_rate_ok('bad:' || v_ip, 1000000, interval '10 minutes');
    return jsonb_build_object('error', 'not_found');
  end if;
  if length(v_body) = 0 then return jsonb_build_object('error', 'empty'); end if;
  if length(v_body) > 2000 then return jsonb_build_object('error', 'too_long'); end if;
  if not public._client_portal_rate_ok('msg:' || l.id, 10, interval '10 minutes')
     or (select count(*) from public.client_portal_rate_events
          where bucket = 'msg:' || l.id and created_at > now() - interval '1 day') > 60 then
    return jsonb_build_object('error', 'rate_limited');
  end if;

  insert into public.employer_client_messages
    (customer_id, firm_id, link_id, message, sender_type)
  values (l.customer_id, l.user_id, l.id, v_body, 'client')
  returning id, created_at into v_id, v_at;
  return jsonb_build_object('id', v_id, 'created_at', v_at);
end $$;
revoke all on function public.client_portal_send_message(text, text) from public;
grant execute on function public.client_portal_send_message(text, text) to anon, authenticated;

create or replace function public.client_portal_review_opt_out(p_token text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare l public.client_portal_links;
begin
  if not public._client_portal_rate_ok('ip:' || public._client_portal_ip(), 300, interval '10 minutes') then
    return jsonb_build_object('error', 'rate_limited');
  end if;
  l := public._client_portal_link(p_token);
  if l.id is null or l.revoked_at is not null or not coalesce(l.is_active, true) then
    return jsonb_build_object('error', 'not_found');
  end if;
  update public.client_portal_links set review_opt_out_at = now() where id = l.id;
  return jsonb_build_object('ok', true);
end $$;
revoke all on function public.client_portal_review_opt_out(text) from public;
grant execute on function public.client_portal_review_opt_out(text) to anon, authenticated;

-- ── 8. The firm hears about customer messages ─────────────────────────────
create or replace function public.notify_client_portal_message()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_name text;
begin
  if new.sender_type <> 'client' or new.firm_id is null then return new; end if;
  select coalesce(nullif(c.company_name, ''), c.name) into v_name
    from public.customers c where c.id = new.customer_id;
  perform public.notify_employer_bell(
    new.firm_id, 'client_message',
    'New message from ' || coalesce(v_name, 'a client'),
    left(new.message, 140),
    jsonb_build_object(
      'customer_id', new.customer_id,
      'route', '/employer?section=clients&client=' || new.customer_id || '&tab=messages'));
  return new;
exception when others then
  raise warning '[notify_client_portal_message] %', sqlerrm;
  return new;
end $$;
revoke all on function public.notify_client_portal_message() from public, anon, authenticated;

-- ── 9. Close the old job-scoped public surface (0 links ever existed) ─────
revoke execute on function public.get_portal_by_token(text) from public, anon, authenticated;
revoke execute on function public.get_portal_progress_logs(text) from public, anon, authenticated;
revoke execute on function public.get_portal_photos(text) from public, anon, authenticated;
revoke execute on function public.get_portal_messages(text) from public, anon, authenticated;
revoke execute on function public.send_portal_message(text, text) from public, anon, authenticated;
revoke execute on function public.get_portal_invoices(text) from public, anon, authenticated;
revoke execute on function public.regenerate_portal_token(uuid) from public, anon, authenticated;
