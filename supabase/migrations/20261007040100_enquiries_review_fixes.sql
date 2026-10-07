-- ELE-2022 review fixes (7 Oct)

-- 1. Add a message to a card in ONE step (two texts seconds apart both land), and
--    record its id in the same step so a retried webhook is caught as a duplicate.
create or replace function public.append_enquiry_text(p_id uuid, p_text text, p_message_id text default null)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_text text;
begin
  if p_message_id is not null and exists (
    select 1 from public.enquiries
    where message_id = p_message_id
      and user_id = (select user_id from public.enquiries where id = p_id)
  ) then
    return jsonb_build_object('status', 'duplicate');
  end if;
  update public.enquiries
     set raw_text = case when raw_text is null or raw_text = '' then p_text
                         else raw_text || E'\n\n' || p_text end,
         message_id = coalesce(p_message_id, message_id)
   where id = p_id
     and length(coalesce(raw_text, '')) + length(p_text) <= 60000
  returning raw_text into v_text;
  if v_text is null then
    return jsonb_build_object('status', 'full');
  end if;
  return jsonb_build_object('status', 'appended', 'text', v_text);
exception when unique_violation then
  return jsonb_build_object('status', 'duplicate');
end $$;
revoke all on function public.append_enquiry_text(uuid, text, text) from public, anon, authenticated;
grant execute on function public.append_enquiry_text(uuid, text, text) to service_role;

-- 2. "Replied" means someone actually contacted them. Dismissing, marking spam or
--    adding as a customer no longer stamps first_actioned_at (Undo used to land
--    in Replied, and the reply-time stat counted dismissals).
--    Leaving 'new' for dismissed/spam also kills the notification's Book button.
create or replace function public.tg_enquiries_touch()
returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  new.raw_from := old.raw_from;
  new.raw_subject := old.raw_subject;
  new.received_at := old.received_at;
  new.user_id := old.user_id;
  if new.status in ('dismissed', 'spam') and old.status is distinct from new.status then
    new.visit_action_hash := null;
  end if;
  if current_user in ('service_role', 'postgres', 'supabase_admin') then
    -- Append-only: what was there must still be there, unchanged, at the start
    if old.raw_text is not null
       and (new.raw_text is null or left(new.raw_text, length(old.raw_text)) <> old.raw_text) then
      new.raw_text := old.raw_text;
    end if;
    new.message_id := coalesce(new.message_id, old.message_id);
  else
    new.raw_text := old.raw_text;
    new.message_id := old.message_id;
    new.photos := old.photos;
    new.nudged_at := old.nudged_at;
  end if;
  return new;
end $$;

-- 3. An account (or a co-admin) can change the settings of its phone line, never
--    which number it is or whose it is.
revoke update on public.phone_lines from authenticated;
grant update (enabled, auto_text, auto_text_message, voicemail, greeting) on public.phone_lines to authenticated;
