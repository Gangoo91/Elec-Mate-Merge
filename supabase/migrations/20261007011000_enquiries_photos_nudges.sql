-- ELE-2022 part 2: photos from the customer's email, waiting nudges + morning summary,
-- and realtime so a new enquiry appears in an open inbox straight away.

alter table public.enquiries
  add column if not exists photos text[] not null default '{}',
  add column if not exists nudged_at timestamptz;

comment on column public.enquiries.photos is 'Storage paths in the private enquiry-photos bucket: <user_id>/<enquiry_id>/<n>.<ext>. Written only by inbound-enquiry-email.';
comment on column public.enquiries.nudged_at is 'When the "still waiting" push was sent (enquiry-reminders). One nudge per enquiry.';

-- Keep nudged_at/photos server-owned like the raw_* evidence
create or replace function public.tg_enquiries_touch()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  if old.status = 'new' and new.status <> 'new' and new.first_actioned_at is null then
    new.first_actioned_at := now();
  end if;
  new.raw_from := old.raw_from;
  new.raw_subject := old.raw_subject;
  new.raw_text := old.raw_text;
  new.message_id := old.message_id;
  new.received_at := old.received_at;
  new.user_id := old.user_id;
  if current_user not in ('service_role', 'postgres', 'supabase_admin') then
    new.photos := old.photos;
    new.nudged_at := old.nudged_at;
  end if;
  return new;
end $$;

-- ── Photos bucket (private; read by the owning account, written by the fn) ──
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('enquiry-photos', 'enquiry-photos', false, 10485760,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif','image/gif'])
on conflict (id) do nothing;

drop policy if exists "Account reads its enquiry photos" on storage.objects;
create policy "Account reads its enquiry photos" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'enquiry-photos'
    and (storage.foldername(name))[1] in (select public.my_employer_scope()::text)
  );

-- ── Realtime ────────────────────────────────────────────────────────────────
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
     where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'enquiries'
  ) then
    alter publication supabase_realtime add table public.enquiries;
  end if;
end $$;

-- ── Reminders ───────────────────────────────────────────────────────────────
-- Every 15 min: "still waiting" nudge for enquiries untouched for 2h.
-- 06:30 UTC (07:30 BST / 06:30 GMT): morning summary of what's waiting.
select cron.unschedule(jobid) from cron.job where jobname in ('enquiry-nudges', 'enquiry-morning-summary');

select cron.schedule(
  'enquiry-nudges',
  '*/15 * * * *',
  $$select net.http_post(
     url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/enquiry-reminders',
     headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)),
     body := '{"action":"nudge"}'::jsonb,
     timeout_milliseconds := 60000)$$
);

select cron.schedule(
  'enquiry-morning-summary',
  '30 6 * * *',
  $$select net.http_post(
     url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/enquiry-reminders',
     headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)),
     body := '{"action":"morning"}'::jsonb,
     timeout_milliseconds := 60000)$$
);

-- ── Review fixes ────────────────────────────────────────────────────────────
-- Website forms get their OWN token: it sits in public page HTML, so it must not
-- be the email address token, and its traffic is limited separately.
alter table public.enquiry_inboxes
  add column if not exists form_token text unique check (form_token ~ '^[a-z0-9]{8,16}$');
update public.enquiry_inboxes
   set form_token = substr(md5(gen_random_uuid()::text), 1, 12)
 where form_token is null;
alter table public.enquiry_inboxes alter column form_token set not null;
alter table public.enquiry_inboxes
  alter column form_token set default substr(md5(gen_random_uuid()::text), 1, 12);

-- The inbox belongs to the ACCOUNT: an active co-admin gets the firm's inbox, not their own.
create or replace function public.enquiry_inbox_owner()
returns uuid language sql stable security definer set search_path = public as $$
  select coalesce(
    (select a.employer_id from public.employer_admins a
      where a.user_id = auth.uid() and a.status = 'active'
      order by a.employer_id limit 1),
    auth.uid())
$$;
revoke all on function public.enquiry_inbox_owner() from public, anon;
grant execute on function public.enquiry_inbox_owner() to authenticated;

create or replace function public.get_my_enquiry_inbox()
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
  v_prefix text;
begin
  if v_uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into v_row from public.enquiry_inboxes where user_id = v_uid;
  if found then return v_row; end if;
  select left(regexp_replace(lower(coalesce(cp.company_name, '')), '[^a-z0-9]', '', 'g'), 24)
    into v_prefix from public.company_profiles cp where cp.user_id = v_uid limit 1;
  if coalesce(v_prefix, '') = '' then v_prefix := 'enquiries'; end if;
  insert into public.enquiry_inboxes (user_id, token, address_prefix)
  values (v_uid, substr(md5(gen_random_uuid()::text), 1, 10), v_prefix)
  on conflict (user_id) do nothing;
  select * into v_row from public.enquiry_inboxes where user_id = v_uid;
  return v_row;
end $$;

-- p_which: 'email' | 'form' | 'both'
drop function if exists public.reset_my_enquiry_inbox_token();
create or replace function public.reset_my_enquiry_inbox_token(p_which text default 'both')
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if p_which not in ('email','form','both') then raise exception 'bad p_which'; end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes
     set token = case when p_which in ('email','both') then substr(md5(gen_random_uuid()::text), 1, 10) else token end,
         form_token = case when p_which in ('form','both') then substr(md5(gen_random_uuid()::text), 1, 12) else form_token end,
         forwarding_confirmation_code = case when p_which in ('email','both') then null else forwarding_confirmation_code end,
         forwarding_confirmation_link = case when p_which in ('email','both') then null else forwarding_confirmation_link end,
         forwarding_confirmation_at = case when p_which in ('email','both') then null else forwarding_confirmation_at end
   where user_id = v_uid
  returning * into v_row;
  return v_row;
end $$;

create or replace function public.set_my_enquiry_inbox_enabled(p_enabled boolean)
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes set enabled = p_enabled where user_id = v_uid returning * into v_row;
  return v_row;
end $$;

revoke all on function public.reset_my_enquiry_inbox_token(text) from public, anon;
revoke all on function public.set_my_enquiry_inbox_enabled(boolean) from public, anon;
revoke all on function public.get_my_enquiry_inbox() from public, anon;
grant execute on function public.reset_my_enquiry_inbox_token(text) to authenticated;
grant execute on function public.set_my_enquiry_inbox_enabled(boolean) to authenticated;
grant execute on function public.get_my_enquiry_inbox() to authenticated;

-- Pushes that skipped quiet hours (urgent), so a form can't page someone all night
alter table public.enquiry_inboxes add column if not exists last_urgent_push_at timestamptz;

-- ── Hosted enquiry page /enquire/:form_token (public) ───────────────────────
-- Only what the page shows: business name, logo, phone. Nothing if paused.
create or replace function public.get_enquiry_form_profile(p_token text)
returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select jsonb_build_object(
              'found', true,
              'company_name', coalesce(nullif(trim(cp.company_name), ''), 'Your electrician'),
              'logo', coalesce(cp.logo_url, cp.logo_data_url),
              'phone', cp.company_phone)
       from public.enquiry_inboxes i
       left join public.company_profiles cp on cp.user_id = i.user_id
      where i.form_token = lower(p_token) and i.enabled
      limit 1),
    jsonb_build_object('found', false))
$$;
revoke all on function public.get_enquiry_form_profile(text) from public;
grant execute on function public.get_enquiry_form_profile(text) to anon, authenticated;
