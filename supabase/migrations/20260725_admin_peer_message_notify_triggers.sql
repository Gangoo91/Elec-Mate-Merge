-- Message notification triggers — repo capture + refresh (2026-07-25).
--
-- Both trigger functions already exist in production (created outside the
-- repo — this file ends that drift). They fire the notify-message /
-- notify-peer-message edge functions on INSERT, authed with the vault
-- 'service_role_key' secret. Idempotent: CREATE OR REPLACE + drop/create
-- trigger.

create or replace function public.notify_admin_message()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'net', 'vault'
as $$
declare
  service_key text;
begin
  select decrypted_secret into service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/notify-message',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || coalesce(service_key, '')
    ),
    body := jsonb_build_object('type', 'INSERT', 'record', to_jsonb(NEW)),
    timeout_milliseconds := 10000
  );

  return NEW;
exception when others then
  -- A notification failure must never block the message insert.
  return NEW;
end;
$$;

drop trigger if exists trg_notify_admin_message on public.admin_messages;
create trigger trg_notify_admin_message
  after insert on public.admin_messages
  for each row execute function public.notify_admin_message();

create or replace function public.notify_peer_message()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'net', 'vault'
as $$
declare
  service_key text;
begin
  select decrypted_secret into service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/notify-peer-message',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || coalesce(service_key, '')
    ),
    body := jsonb_build_object('type', 'INSERT', 'record', to_jsonb(NEW)),
    timeout_milliseconds := 10000
  );

  return NEW;
exception when others then
  return NEW;
end;
$$;

drop trigger if exists trg_notify_peer_message on public.mental_health_peer_messages;
create trigger trg_notify_peer_message
  after insert on public.mental_health_peer_messages
  for each row execute function public.notify_peer_message();
