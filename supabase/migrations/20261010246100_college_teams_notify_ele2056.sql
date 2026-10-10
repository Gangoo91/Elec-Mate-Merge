-- ELE-2056 Microsoft Teams notifications, phase 1. ADDITIVE ONLY.
--
-- A college admin or head of department pastes a Teams webhook URL in College
-- settings. New items in the tutor inbox (get_college_inbox) are posted to that
-- channel as one Adaptive Card per run, each line a deep link back into the hub.
--
-- Mechanism (checked 10 Oct 2026): Microsoft 365 (Office 365) connectors in
-- Teams are being retired; Microsoft's current guidance is the Workflows app,
-- template "Send webhook alerts to a channel", trigger "When a Teams webhook
-- request is received", which accepts an Adaptive Card message. Limits: 28 KB a
-- message, throttled above four requests a second.
--   https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook
--   https://support.microsoft.com/en-us/office/send-messages-in-teams-using-incoming-webhooks-323660ec-12ca-40b1-a1d3-a3df47e808c4
-- Legacy connector URLs (*.webhook.office.com) are still accepted while they
-- work; Workflows URLs are on *.logic.azure.com or *.powerplatform.com.
--
-- The URL is a secret: anyone holding it can post into the channel. It goes
-- into Supabase Vault (encrypted at rest); this table keeps only the vault id
-- and the host for display. No client policy can read either table, no RPC
-- returns the URL, and the edge function never logs it.
--
-- 1. college_teams_webhooks       one per college: vault id, host, switches
-- 2. college_teams_posted         which inbox items have been posted (dedup)
-- 3. _teams_webhook_url_ok()      the host allow-list
-- 4. college_teams_settings()     what staff may see (never the URL)
-- 5. college_teams_save() / college_teams_disconnect()   admin or head only
-- 6. _college_teams_url() / _college_teams_inbox()        service role only
-- 7. cron: college-teams-notify every 10 minutes, only when a college is on

-- 1 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_teams_webhooks (
  college_id uuid primary key references public.colleges(id) on delete cascade,
  secret_id uuid not null,
  url_host text not null,
  enabled boolean not null default true,
  categories text[] not null default array['college_marking', 'college_hours', 'college_messages', 'college_reviews']::text[]
    check (categories <@ array['college_marking', 'college_hours', 'college_messages', 'college_reviews']::text[]),
  quiet_hours boolean not null default true,
  include_names boolean not null default true,
  connected_by uuid references auth.users(id) on delete set null,
  connected_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  baseline_at timestamptz,
  last_run_at timestamptz,
  last_posted_at timestamptz,
  last_status integer,
  last_error text,
  posted_total integer not null default 0
);
alter table public.college_teams_webhooks enable row level security;
-- No client policies: read through college_teams_settings(), written through
-- college_teams_save() / _disconnect() and the edge function (service role).
comment on table public.college_teams_webhooks is
  '[COLLEGE] One Microsoft Teams webhook per college (ELE-2056). The URL itself lives in Supabase Vault (secret_id); url_host is for display only. Scope: per college. Used by: College settings Teams card, college-teams-notify edge function. Rule: never select the decrypted URL to a client, never log it; write via college_teams_save().';

-- 2 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_teams_posted (
  college_id uuid not null references public.colleges(id) on delete cascade,
  item_key text not null,
  posted_at timestamptz not null default now(),
  primary key (college_id, item_key)
);
create index if not exists college_teams_posted_age_idx on public.college_teams_posted (posted_at);
alter table public.college_teams_posted enable row level security;
comment on table public.college_teams_posted is
  '[COLLEGE] Inbox item keys (kind:source_id) already posted to a college''s Teams channel, so each item is posted once. The first run after connecting records the existing inbox without posting it. Scope: per college. Used by: college-teams-notify. Rule: service role only; pruned after 60 days.';

-- 3 ───────────────────────────────────────────────────────────────────────
create or replace function public._teams_webhook_url_ok(p_url text)
returns boolean
language sql immutable
set search_path to 'public'
as $$
  select p_url is not null
     and length(p_url) between 30 and 2048
     and p_url !~ '\s'
     and p_url ~* '^https://([a-z0-9-]+\.)+(logic\.azure\.com|powerplatform\.com|webhook\.office\.com)(:443)?/';
$$;

-- Admin or head of department at this college (or Elec-Mate platform admin).
-- Never the "no manager yet" bootstrap in college_can (same rule as API keys).
create or replace function public._college_is_manager(p_college uuid)
returns boolean
language sql stable security definer
set search_path to 'public'
as $$
  select auth.uid() is not null and (
    exists (select 1 from public.college_staff m
             where m.college_id = p_college and m.user_id = auth.uid() and m.archived_at is null
               and m.role in ('admin', 'head_of_department'))
    or public._is_platform_admin());
$$;
revoke all on function public._college_is_manager(uuid) from public, anon;
grant execute on function public._college_is_manager(uuid) to authenticated;

-- 4 ───────────────────────────────────────────────────────────────────────
create or replace function public.college_teams_settings(p_college uuid)
returns json
language plpgsql stable security definer set search_path to 'public'
as $$
declare w public.college_teams_webhooks%rowtype; v_name text;
begin
  if not public._review_staff_can(p_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select * into w from public.college_teams_webhooks where college_id = p_college;
  if not found then
    return json_build_object('connected', false, 'can_manage', public._college_is_manager(p_college));
  end if;
  select full_name into v_name from public.profiles where id = w.connected_by;
  return json_build_object(
    'connected', true,
    'can_manage', public._college_is_manager(p_college),
    'url_host', w.url_host,
    'enabled', w.enabled,
    'categories', w.categories,
    'quiet_hours', w.quiet_hours,
    'include_names', w.include_names,
    'connected_at', w.connected_at,
    'connected_by_name', v_name,
    'last_run_at', w.last_run_at,
    'last_posted_at', w.last_posted_at,
    'last_status', w.last_status,
    'last_error', w.last_error,
    'posted_total', w.posted_total);
end;
$$;
revoke all on function public.college_teams_settings(uuid) from public, anon;
grant execute on function public.college_teams_settings(uuid) to authenticated;

-- 5 ───────────────────────────────────────────────────────────────────────
-- p_url null keeps the saved URL (switches only). A new URL replaces the
-- vault secret and starts a fresh baseline, so the existing inbox is not
-- dumped into the new channel.
create or replace function public.college_teams_save(
  p_college uuid, p_url text, p_enabled boolean, p_categories text[],
  p_quiet_hours boolean, p_include_names boolean)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  v_url text := nullif(trim(coalesce(p_url, '')), '');
  v_host text;
  v_secret uuid;
  v_cats text[];
begin
  if not public._college_is_manager(p_college) then
    raise exception 'only a college admin or head of department can connect Microsoft Teams' using errcode = '42501';
  end if;
  v_cats := (select coalesce(array_agg(distinct c order by c), '{}') from unnest(coalesce(p_categories, '{}')) c);
  if not (v_cats <@ array['college_marking', 'college_hours', 'college_messages', 'college_reviews']::text[]) then
    raise exception 'unknown notification group' using errcode = '22023';
  end if;

  if v_url is not null then
    if not public._teams_webhook_url_ok(v_url) then
      raise exception 'that is not a Teams webhook link: it should start https:// and come from the Teams Workflows app (logic.azure.com or powerplatform.com) or a Teams connector (webhook.office.com)'
        using errcode = '22023';
    end if;
    v_host := lower(substring(v_url from '^https://([^/:]+)'));
    select secret_id into v_secret from public.college_teams_webhooks where college_id = p_college;
    if v_secret is not null then
      perform vault.update_secret(v_secret, v_url);
    else
      v_secret := vault.create_secret(v_url, 'college_teams_webhook_' || p_college::text,
                                      'ELE-2056 Teams webhook for a college. Never return to a client.');
    end if;
    insert into public.college_teams_webhooks as w
      (college_id, secret_id, url_host, enabled, categories, quiet_hours, include_names,
       connected_by, connected_at, updated_by, updated_at, baseline_at, last_status, last_error)
    values (p_college, v_secret, v_host, coalesce(p_enabled, true), v_cats, coalesce(p_quiet_hours, true),
            coalesce(p_include_names, true), auth.uid(), now(), auth.uid(), now(), null, null, null)
    on conflict (college_id) do update set
      secret_id = excluded.secret_id, url_host = excluded.url_host, enabled = excluded.enabled,
      categories = excluded.categories, quiet_hours = excluded.quiet_hours,
      include_names = excluded.include_names, connected_by = excluded.connected_by,
      connected_at = excluded.connected_at, updated_by = excluded.updated_by, updated_at = now(),
      baseline_at = null, last_status = null, last_error = null;
    delete from public.college_teams_posted where college_id = p_college;
  else
    update public.college_teams_webhooks set
      enabled = coalesce(p_enabled, enabled), categories = v_cats,
      quiet_hours = coalesce(p_quiet_hours, quiet_hours),
      include_names = coalesce(p_include_names, include_names),
      updated_by = auth.uid(), updated_at = now()
    where college_id = p_college;
    if not found then
      raise exception 'paste the Teams webhook link first' using errcode = '22023';
    end if;
  end if;

  insert into public.college_activity (college_id, actor_id, action, entity_type, details)
  values (p_college, auth.uid(),
          case when v_url is not null then 'teams.connected' else 'teams.settings_changed' end,
          'college_teams_webhooks',
          jsonb_build_object('host', (select url_host from public.college_teams_webhooks where college_id = p_college),
                             'categories', v_cats, 'enabled', coalesce(p_enabled, true)));
  return public.college_teams_settings(p_college);
end;
$$;
revoke all on function public.college_teams_save(uuid, text, boolean, text[], boolean, boolean) from public, anon;
grant execute on function public.college_teams_save(uuid, text, boolean, text[], boolean, boolean) to authenticated;

create or replace function public.college_teams_disconnect(p_college uuid)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_secret uuid;
begin
  if not public._college_is_manager(p_college) then
    raise exception 'only a college admin or head of department can disconnect Microsoft Teams' using errcode = '42501';
  end if;
  select secret_id into v_secret from public.college_teams_webhooks where college_id = p_college;
  delete from public.college_teams_webhooks where college_id = p_college;
  delete from public.college_teams_posted where college_id = p_college;
  if v_secret is not null then
    delete from vault.secrets where id = v_secret;
  end if;
  insert into public.college_activity (college_id, actor_id, action, entity_type, details)
  values (p_college, auth.uid(), 'teams.disconnected', 'college_teams_webhooks', '{}'::jsonb);
end;
$$;
revoke all on function public.college_teams_disconnect(uuid) from public, anon;
grant execute on function public.college_teams_disconnect(uuid) to authenticated;

-- 6 ───────────────────────────────────────────────────────────────────────
create or replace function public._college_teams_url(p_college uuid)
returns text
language sql stable security definer set search_path to 'public'
as $$
  select s.decrypted_secret
    from public.college_teams_webhooks w
    join vault.decrypted_secrets s on s.id = w.secret_id
   where w.college_id = p_college;
$$;
revoke all on function public._college_teams_url(uuid) from public, anon, authenticated;
grant execute on function public._college_teams_url(uuid) to service_role;

-- The live tutor inbox, read as the person who connected Teams while they are
-- still active staff, otherwise as another active member of staff (managers
-- first). Any active staff member may read the whole college's inbox
-- (_review_staff_can), so the channel sees exactly what the inbox shows, and
-- there is one inbox definition, not two.
create or replace function public._college_teams_inbox(p_college uuid)
returns jsonb
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_as uuid;
begin
  select m.user_id into v_as
    from public.college_staff m
    left join public.college_teams_webhooks w on w.college_id = m.college_id
   where m.college_id = p_college and m.user_id is not null and m.archived_at is null
   order by (m.user_id = w.connected_by) desc nulls last,
            (m.role in ('admin', 'head_of_department')) desc, m.created_at
   limit 1;
  if v_as is null then
    raise exception 'no active staff member to read the inbox as' using errcode = 'P0001';
  end if;
  perform set_config('request.jwt.claims',
                     json_build_object('sub', v_as, 'role', 'authenticated')::text, true);
  return public.get_college_inbox(p_college);
end;
$$;
revoke all on function public._college_teams_inbox(uuid) from public, anon, authenticated;
grant execute on function public._college_teams_inbox(uuid) to service_role;

-- 7 ───────────────────────────────────────────────────────────────────────
-- Every 10 minutes, and only does anything while a college has Teams on.
-- Quiet hours are applied per college inside the edge function.
do $$ begin
  perform cron.unschedule('college-teams-notify');
exception when others then null; end $$;
select cron.schedule('college-teams-notify', '*/10 * * * *', $cron$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/college-teams-notify',
    headers := jsonb_build_object('Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)),
    body := '{"dispatch": true}'::jsonb)
  where exists (select 1 from public.college_teams_webhooks where enabled);
$cron$);
