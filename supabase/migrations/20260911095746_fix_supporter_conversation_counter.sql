-- `total_conversations` only ever went up.
--
-- The trigger incremented on INSERT and had no DELETE branch, so every deleted
-- conversation left the counter permanently inflated. On 11 Sep 2026 the three
-- supporter rows summed to 9 against 2 conversations that exist, and the
-- supporter's own dashboard showed one of them "Total chats 5 — lifetime
-- conversations" when their real total was 1.
--
-- Also worth knowing: this trigger is the SECOND writer of `last_active_at`.
-- The first is a supporter toggling their own availability on
-- (peerSupportService.updateProfile). Neither is evidence the supporter was
-- present — this one fires when somebody ELSE starts a chat with them — so
-- `last_active_at` must never be rendered as presence. See AdminPeerSafety.
create or replace function public.update_supporter_conversation_count()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if TG_OP = 'INSERT' then
    update public.mental_health_peer_supporters
    set total_conversations = total_conversations + 1,
        last_active_at = now()
    where id = NEW.supporter_id;
  elsif TG_OP = 'DELETE' then
    -- greatest(...,0) so a counter that has already drifted low can never be
    -- driven negative by a delete.
    update public.mental_health_peer_supporters
    set total_conversations = greatest(coalesce(total_conversations, 0) - 1, 0)
    where id = OLD.supporter_id;
    return OLD;
  end if;
  return NEW;
end;
$function$;

drop trigger if exists update_supporter_stats on public.mental_health_peer_conversations;
create trigger update_supporter_stats
after insert or delete on public.mental_health_peer_conversations
for each row execute function public.update_supporter_conversation_count();

-- One-off correction of the existing drift.
update public.mental_health_peer_supporters s
set total_conversations = (
  select count(*) from public.mental_health_peer_conversations c
  where c.supporter_id = s.id
)
where s.total_conversations is distinct from (
  select count(*) from public.mental_health_peer_conversations c
  where c.supporter_id = s.id
);
