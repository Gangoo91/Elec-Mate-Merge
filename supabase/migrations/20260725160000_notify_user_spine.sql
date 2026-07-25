-- ELE-226 — Unified notification spine.
--
-- ONE canonical entry point every producer calls: notify_user(). It writes the
-- in-app bell (user_notifications) AND fires a device push (via the proven
-- vault + pg_net → send-push-notification pattern used by team_push), applying
-- the registry (routing), the user's preferences, per-day dedup and logging —
-- the four things that were missing and scattered across ~20 functions.
--
-- Additive + dormant: nothing calls notify_user() yet, so applying this changes
-- no existing behaviour. Producers get repointed onto it in the next step.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Formatting helpers (fix quality/casing bugs at source)
-- ─────────────────────────────────────────────────────────────────────────

-- Certificate type → correct display label. Kills the "eicr" vs "EICR"
-- inconsistency (some producers upper()'d it, some hardcoded lowercase).
create or replace function public.notif_cert_label(p text)
returns text language sql immutable as $$
  select case lower(btrim(coalesce(p, '')))
    when 'eicr' then 'EICR'
    when 'eic' then 'EIC'
    when 'minor-works' then 'Minor Works'
    when 'minor_works' then 'Minor Works'
    when 'minorworks' then 'Minor Works'
    when 'mw' then 'Minor Works'
    when 'solar-pv' then 'Solar PV'
    when 'solar_pv' then 'Solar PV'
    when 'ev-charging' then 'EV Charging'
    when 'ev_charging' then 'EV Charging'
    when '' then ''
    else initcap(btrim(coalesce(p, '')))
  end
$$;

-- Normalise a person's name that may be stored ALL CAPS or all lower — fixes
-- the "Good morning, ANDREW" bug (ELE-1378). Leaves mixed-case names untouched.
create or replace function public.notif_person(p text)
returns text language sql immutable as $$
  select case
    when p is null or btrim(p) = '' then ''
    when btrim(p) = upper(btrim(p)) or btrim(p) = lower(btrim(p)) then initcap(btrim(p))
    else btrim(p)
  end
$$;

create or replace function public.notif_first_name(p text)
returns text language sql immutable as $$
  select split_part(public.notif_person(p), ' ', 1)
$$;

-- Money → "£1,234.50"
create or replace function public.notif_money(p numeric)
returns text language sql immutable as $$
  select '£' || to_char(coalesce(p, 0), 'FM999,999,990.00')
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Type registry — the routing brain (category + whether to push)
-- ─────────────────────────────────────────────────────────────────────────
-- category maps 1:1 to notification_preferences.category so a user opt-out is
-- honoured. push = fire a device push (not just the bell). Unknown types fall
-- back to bell-only (safe default).
create table if not exists public.notification_types (
  type        text primary key,
  category    text,                              -- null = always-on (no user toggle)
  push        boolean not null default true,
  importance  smallint not null default 1,       -- 0 low, 1 normal, 2 high
  updated_at  timestamptz not null default now()
);

alter table public.notification_types enable row level security;
drop policy if exists notification_types_read on public.notification_types;
create policy notification_types_read on public.notification_types for select using (true);

insert into public.notification_types (type, category, push, importance) values
  -- Money / pipeline (invoices_quotes)
  ('quote_accepted',        'invoices_quotes',          true,  2),
  ('quote_signed',          'invoices_quotes',          true,  2),
  ('quote_rejected',        'invoices_quotes',          true,  1),
  ('invoice_paid',          'invoices_quotes',          true,  2),
  ('payment_failed',        'invoices_quotes',          true,  2),
  ('new_lead',              'invoices_quotes',          true,  2),
  ('referral_reward',       'invoices_quotes',          false, 1),
  -- Certificates / compliance
  ('cert_completed',        'certificates_compliance',  false, 1),
  ('qs_review_submitted',   'certificates_compliance',  true,  2),
  ('qs_review_approved',    'certificates_compliance',  true,  2),
  ('qs_review_returned',    'certificates_compliance',  true,  2),
  ('qs_review_withdrawn',   'certificates_compliance',  true,  1),
  ('compliance_insurance',  'certificates_compliance',  true,  2),
  ('compliance_scheme',     'certificates_compliance',  true,  2),
  ('compliance_calibration','certificates_compliance',  true,  1),
  ('compliance_ecs_card',   'certificates_compliance',  true,  2),
  ('part_p_deadline',       'certificates_compliance',  true,  2),
  -- Tasks / jobs / worker
  ('job_assignment',        'tasks_projects',           true,  2),
  ('task_due',              'tasks_projects',           true,  1),
  ('leave',                 'tasks_projects',           true,  1),
  ('timesheet',             'tasks_projects',           true,  1),
  ('expense',               'tasks_projects',           true,  1),
  ('snag',                  'tasks_projects',           true,  1),
  -- Messages
  ('admin_message',         'messages',                 true,  2),
  ('peer',                  'mental_health',            true,  2),
  ('student_message',       'messages',                 true,  2),
  ('college_message',       'messages',                 true,  1),
  -- Digest
  ('morning_briefing',      'daily_briefing',           true,  1),
  -- Account (always-on, bell-preferred)
  ('subscription_status',   null,                       false, 0),
  ('subscription_cancelled',null,                       false, 1),
  ('subscription_welcome',  null,                       false, 1)
on conflict (type) do update
  set category = excluded.category,
      push = excluded.push,
      importance = excluded.importance,
      updated_at = now();

-- ─────────────────────────────────────────────────────────────────────────
-- 3. notify_user() — the canonical spine
-- ─────────────────────────────────────────────────────────────────────────
-- p_data conventions:
--   route      → deep-link path stored on the bell + push (data.route)
--   ref_id     → dedup key (one push per user+type+ref per day)
--   push_type  → optional send-push-notification "type" for its own routing
create or replace function public.notify_user(
  p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb default '{}'::jsonb
) returns uuid
language plpgsql security definer set search_path to 'public', 'extensions'
as $function$
declare
  v_id uuid; v_data jsonb := coalesce(p_data, '{}'::jsonb);
  v_cat text; v_push boolean; v_importance smallint;
  v_ref text := v_data->>'ref_id'; v_route text := v_data->>'route';
  v_pref_enabled boolean; v_has_token boolean; v_already boolean;
  v_push_type text; v_meta jsonb; v_push_data jsonb; service_key text;
begin
  if p_user_id is null then return null; end if;

  -- (1) Registry first — routing brain. Unknown types: bell only.
  select category, push, importance into v_cat, v_push, v_importance
  from public.notification_types where type = p_type;
  if not found then
    v_push := false; v_importance := 1;
  end if;

  -- (2) Always write the bell, with structured category/importance in metadata
  --     so the UI can style/group without regex-guessing from the copy.
  v_meta := v_data || jsonb_build_object('category', v_cat, 'importance', coalesce(v_importance,1));
  insert into public.user_notifications (user_id, type, title, message, link, metadata)
  values (p_user_id, p_type, p_title, p_message, v_route, v_meta)
  returning id into v_id;

  if v_push is not true then return v_id; end if;

  -- (3) Honour the user's per-category push preference (default on).
  if v_cat is not null then
    select enabled into v_pref_enabled
    from public.notification_preferences
    where user_id = p_user_id and category = v_cat;
    if v_pref_enabled is false then return v_id; end if;
  end if;

  -- (4) No active device → nothing to push to.
  select exists(select 1 from public.push_subscriptions
    where user_id = p_user_id and is_active = true) into v_has_token;
  if not v_has_token then return v_id; end if;

  -- (5) Dedup: one push per user+type+ref per day.
  if v_ref is not null then
    select exists(select 1 from public.push_notification_log
      where user_id = p_user_id and type = p_type and reference_id = v_ref
        and sent_at::date = current_date) into v_already;
    if v_already then return v_id; end if;
  end if;

  -- (6) Fire the push. Derive push "type" from category; set deep_link so both
  --     native and web tap-routing resolve; high-importance bypasses quiet hours.
  select decrypted_secret into service_key
  from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if service_key is null then
    raise warning '[notify_user] service_role_key not found in vault';
    return v_id;
  end if;

  v_push_type := coalesce(v_data->>'push_type', case v_cat
    when 'invoices_quotes' then 'invoice'
    when 'certificates_compliance' then 'certificate'
    when 'tasks_projects' then 'task'
    when 'messages' then 'team'
    when 'mental_health' then 'mental_health'
    when 'daily_briefing' then 'briefing'
    else 'default' end);

  v_push_data := v_data || jsonb_build_object('importance', coalesce(v_importance,1));
  if v_route is not null and (v_push_data->>'deep_link') is null then
    v_push_data := v_push_data || jsonb_build_object('deep_link', v_route);
  end if;

  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/send-push-notification',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || service_key),
    body := jsonb_build_object(
      'userId', p_user_id, 'title', p_title, 'body', p_message,
      'type', v_push_type, 'data', v_push_data,
      'skipQuietHours', coalesce(v_importance,1) >= 2)
  );

  -- (7) Log for dedup + delivery tracking.
  insert into public.push_notification_log (user_id, type, reference_id, title, body)
  values (p_user_id, p_type, v_ref, p_title, p_message);

  return v_id;
exception when others then
  raise warning '[notify_user] failed for % / %: %', p_user_id, p_type, sqlerrm;
  return v_id;
end;
$function$;

comment on function public.notify_user(uuid, text, text, text, jsonb) is
  'ELE-226 unified notification spine: writes the bell + fires push (registry + prefs + dedup + log). Every producer should call this.';

-- ─────────────────────────────────────────────────────────────────────────
-- 4. Lockdown (security advisors)
-- ─────────────────────────────────────────────────────────────────────────
-- notify_user is SECURITY DEFINER and must NOT be a public REST endpoint —
-- only internal triggers / definer functions may call it (owner-context calls
-- are unaffected). Callers wired in Phase 2 MUST be SECURITY DEFINER.
revoke execute on function public.notify_user(uuid, text, text, text, jsonb) from public, anon, authenticated;

-- Pin search_path on the pure formatting helpers.
alter function public.notif_cert_label(text) set search_path = '';
alter function public.notif_person(text)      set search_path = '';
alter function public.notif_first_name(text)  set search_path = '';
alter function public.notif_money(numeric)    set search_path = '';
