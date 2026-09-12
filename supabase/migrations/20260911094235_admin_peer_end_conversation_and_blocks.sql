-- Close a peer conversation that is going nowhere.
--
-- The page could name two people sitting in empty threads for 112 and 39 days
-- and offer nothing to do about either. Ending one is the same state change
-- either participant can already make from the app (`status = 'ended'`), just
-- reachable by an admin for a thread neither party is coming back to.
create or replace function public.admin_end_peer_conversation(p_conversation_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  update mental_health_peer_conversations
  set status = 'ended',
      ended_at = coalesce(ended_at, now())
  where id = p_conversation_id;
end;
$$;

grant execute on function public.admin_end_peer_conversation(uuid) to authenticated;

-- Blocks: the other safety signal with nowhere to appear.
--
-- Someone blocking the person they were matched with is the same class of
-- event as filing a report, and reports were the only thing this page could
-- see. There are none of either today, which is exactly why neither would
-- have been noticed when the first one arrives.
create or replace function public.admin_peer_blocks()
returns table (
  block_id uuid,
  created_at timestamptz,
  blocker_id uuid,
  blocker_name text,
  blocked_user_id uuid,
  blocked_name text,
  blocked_is_supporter boolean,
  blocked_supporter_active boolean
)
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  return query
  select
    b.id,
    b.created_at,
    b.blocker_id,
    nullif(btrim(pb.full_name), ''),
    b.blocked_user_id,
    coalesce(nullif(btrim(s.display_name), ''), nullif(btrim(pk.full_name), '')),
    (s.id is not null),
    coalesce(s.is_active, false)
  from mental_health_peer_blocks b
  left join profiles pb on pb.id = b.blocker_id
  left join profiles pk on pk.id = b.blocked_user_id
  -- Blocks name a USER; the supporter row is keyed on user_id, not its own id.
  left join mental_health_peer_supporters s on s.user_id = b.blocked_user_id
  order by b.created_at desc;
end;
$$;

grant execute on function public.admin_peer_blocks() to authenticated;
