-- Automatic acknowledgement for inbound support messages.
--
-- A user messaging the team currently gets nothing back until someone replies,
-- so the thread reads as though the message went nowhere. This inserts a single
-- system note per unanswered conversation, rendered in the UI as a centred note
-- rather than a chat bubble — it must never look like a person answered.
--
-- Deliberate choices:
--   * A trigger, not an RPC: the client cannot forget to call it, and RLS
--     ("Users can reply to admin" requires sender_id = auth.uid()) means a user
--     could not insert an admin-attributed row from the client anyway.
--   * message_type = 'system_ack' marks these rows so the admin inbox can
--     exclude them from "has the team replied?" — counting an ack as a reply
--     would drop a waiting user out of the needs-answering queue.
--   * read_at is pre-set so an automated note never raises an unread badge.
--   * One ack per unanswered run: we only ack when the team has not spoken
--     since the user's conversation resumed, so a burst of messages does not
--     produce a burst of acks.

create or replace function public.send_admin_message_ack()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  sender_is_admin boolean;
  last_admin_reply_at timestamptz;
  last_ack_at timestamptz;
begin
  -- Recursion guard: the ack insert re-enters this trigger.
  if new.message_type = 'system_ack' then
    return new;
  end if;

  select exists (
    select 1 from public.profiles
    where id = new.sender_id and admin_role is not null
  ) into sender_is_admin;

  -- Only inbound user messages get acknowledged.
  if sender_is_admin then
    return new;
  end if;

  select max(created_at) into last_admin_reply_at
  from public.admin_messages m
  where m.recipient_id = new.sender_id
    and m.message_type <> 'system_ack'
    and m.id <> new.id;

  select max(created_at) into last_ack_at
  from public.admin_messages m
  where m.recipient_id = new.sender_id
    and m.message_type = 'system_ack';

  -- Already acknowledged and nobody has answered since — stay quiet.
  if last_ack_at is not null
     and (last_admin_reply_at is null or last_ack_at > last_admin_reply_at) then
    return new;
  end if;

  insert into public.admin_messages (
    sender_id, recipient_id, subject, message, message_type, read_at
  )
  values (
    new.recipient_id,  -- the admin they wrote to, so the row sits on our side
    new.sender_id,
    'Received',
    'Thanks — your message has reached the Elec-Mate team. We''ll reply here, and you''ll get a notification when we do.',
    'system_ack',
    now()
  );

  return new;
exception when others then
  -- An acknowledgement failure must never block the user's message.
  return new;
end;
$function$;

drop trigger if exists trg_admin_message_ack on public.admin_messages;
create trigger trg_admin_message_ack
  after insert on public.admin_messages
  for each row
  execute function public.send_admin_message_ack();

-- Do not push-notify for an automated note: the person just used the app, and
-- a push saying "new message" for our own auto-reply reads as noise.
drop trigger if exists trg_notify_admin_message on public.admin_messages;
create trigger trg_notify_admin_message
  after insert on public.admin_messages
  for each row
  when (new.message_type <> 'system_ack')
  execute function public.notify_admin_message();
