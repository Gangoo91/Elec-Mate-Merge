-- The seekers' side of peer support, which nothing surfaced.
--
-- AdminPeerSafety was built entirely around mental_health_peer_reports, a
-- table that has never had a row. Meanwhile two people opened a Mental Health
-- Mates conversation and received no reply at all, and nothing anywhere said
-- so. This returns the conversations themselves: who asked, who they were
-- matched to, and whether that supporter ever answered.
--
-- Note the id trap: mental_health_peer_conversations.supporter_id holds the
-- SUPPORTER ROW id, while seeker_id and messages.sender_id hold USER ids.
-- Joining supporter_id to profiles silently returns nothing.
create or replace function public.admin_peer_conversations()
returns table (
  conversation_id uuid,
  status text,
  started_at timestamptz,
  ended_at timestamptz,
  last_message_at timestamptz,
  seeker_id uuid,
  seeker_name text,
  supporter_row_id uuid,
  supporter_user_id uuid,
  supporter_name text,
  supporter_is_active boolean,
  supporter_is_available boolean,
  total_messages integer,
  seeker_messages integer,
  supporter_messages integer,
  last_sender_is_seeker boolean,
  reports_on_conversation integer
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
    c.id,
    c.status,
    c.started_at,
    c.ended_at,
    c.last_message_at,
    c.seeker_id,
    nullif(btrim(sk.full_name), ''),
    c.supporter_id,
    s.user_id,
    nullif(btrim(s.display_name), ''),
    coalesce(s.is_active, false),
    coalesce(s.is_available, false),
    coalesce(m.total, 0)::integer,
    coalesce(m.from_seeker, 0)::integer,
    coalesce(m.from_supporter, 0)::integer,
    m.last_is_seeker,
    coalesce(r.n, 0)::integer
  from mental_health_peer_conversations c
  left join mental_health_peer_supporters s on s.id = c.supporter_id
  left join profiles sk on sk.id = c.seeker_id
  left join lateral (
    select
      count(*) as total,
      count(*) filter (where mm.sender_id = c.seeker_id) as from_seeker,
      count(*) filter (where mm.sender_id = s.user_id) as from_supporter,
      (array_agg(mm.sender_id order by mm.created_at desc))[1] = c.seeker_id as last_is_seeker
    from mental_health_peer_messages mm
    where mm.conversation_id = c.id
  ) m on true
  left join lateral (
    select count(*) as n
    from mental_health_peer_reports rr
    where rr.conversation_id = c.id
  ) r on true
  order by c.started_at desc;
end;
$$;

grant execute on function public.admin_peer_conversations() to authenticated;

-- Take a supporter off the rota (or put them back) without needing a report.
--
-- The page could already deactivate a supporter, but only as a side effect of
-- resolving a report — and no report has ever been filed, so in practice the
-- action did not exist. `is_available` is the flag a person in distress is
-- matched against, so being able to clear it directly is the whole point.
create or replace function public.admin_set_peer_supporter_state(
  p_supporter_id uuid,
  p_is_active boolean default null,
  p_is_available boolean default null
)
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

  update mental_health_peer_supporters
  set
    is_active = coalesce(p_is_active, is_active),
    -- Off the rota follows from being deactivated: an inactive supporter must
    -- never remain bookable.
    is_available = case
      when coalesce(p_is_active, is_active) = false then false
      else coalesce(p_is_available, is_available)
    end,
    updated_at = now()
  where id = p_supporter_id;
end;
$$;

grant execute on function public.admin_set_peer_supporter_state(uuid, boolean, boolean) to authenticated;
