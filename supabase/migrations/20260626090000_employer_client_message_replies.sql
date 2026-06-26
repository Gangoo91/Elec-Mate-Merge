-- Applied live 2026-06-26 (idempotent). Client-portal messaging: the CLIENT
-- side already worked via SECURITY DEFINER token RPCs (get/send_portal_message).
-- This adds the EMPLOYER (portal owner) side — read the thread, reply, mark
-- read — via RLS, plus a bell when a client messages. employer_client_messages
-- had RLS on but 0 policies. Owner = client_portal_links.user_id.
-- Rollback: drop these 3 policies + the trigger/function.

drop policy if exists "Portal owner reads client messages" on public.employer_client_messages;
create policy "Portal owner reads client messages"
  on public.employer_client_messages for select to authenticated
  using (exists (
    select 1 from public.client_portal_links l
    where l.access_token = employer_client_messages.access_token and l.user_id = auth.uid()
  ));

drop policy if exists "Portal owner replies" on public.employer_client_messages;
create policy "Portal owner replies"
  on public.employer_client_messages for insert to authenticated
  with check (
    sender_type = 'employer'
    and exists (
      select 1 from public.client_portal_links l
      where l.access_token = employer_client_messages.access_token and l.user_id = auth.uid()
    )
  );

drop policy if exists "Portal owner marks read" on public.employer_client_messages;
create policy "Portal owner marks read"
  on public.employer_client_messages for update to authenticated
  using (exists (
    select 1 from public.client_portal_links l
    where l.access_token = employer_client_messages.access_token and l.user_id = auth.uid()
  ));

create or replace function public.notify_client_portal_message()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_owner uuid;
begin
  if new.sender_type <> 'client' then return new; end if;
  select user_id into v_owner from public.client_portal_links
    where access_token = new.access_token limit 1;
  if v_owner is null then return new; end if;
  insert into public.employer_notifications (user_id, type, title, message, metadata)
  values (v_owner, 'client_message', 'New message from a client',
    left(new.message, 140),
    jsonb_build_object('job_id', new.job_id, 'route', '/employer?section=clientportal'));
  return new;
end; $$;

drop trigger if exists trg_notify_client_portal_message on public.employer_client_messages;
create trigger trg_notify_client_portal_message
  after insert on public.employer_client_messages
  for each row execute function public.notify_client_portal_message();