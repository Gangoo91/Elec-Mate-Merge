-- Rota changes and conversation closes leave a trace.
--
-- `is_available` decides whether a person in distress can be matched to
-- someone. Changing it moved `updated_at` and recorded nothing about who did
-- it or what it was before — on the one flag in the product with a safety
-- consequence. `admin_audit_logs` already exists and AdminAuditLogs.tsx
-- already reads it, so these just write to it.
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
declare
  v_old record;
  v_new record;
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  select id, display_name, is_active, is_available
    into v_old
  from mental_health_peer_supporters
  where id = p_supporter_id;

  if v_old.id is null then
    raise exception 'supporter not found';
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
  where id = p_supporter_id
  returning id, display_name, is_active, is_available into v_new;

  insert into admin_audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
  values (
    auth.uid(),
    'peer_supporter_state_changed',
    'mental_health_peer_supporters',
    p_supporter_id,
    jsonb_build_object(
      'display_name', v_old.display_name,
      'is_active', v_old.is_active,
      'is_available', v_old.is_available
    ),
    jsonb_build_object(
      'display_name', v_new.display_name,
      'is_active', v_new.is_active,
      'is_available', v_new.is_available
    )
  );
end;
$$;

grant execute on function public.admin_set_peer_supporter_state(uuid, boolean, boolean) to authenticated;

create or replace function public.admin_end_peer_conversation(p_conversation_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_old record;
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  select id, status, seeker_id, supporter_id
    into v_old
  from mental_health_peer_conversations
  where id = p_conversation_id;

  if v_old.id is null then
    raise exception 'conversation not found';
  end if;

  update mental_health_peer_conversations
  set status = 'ended',
      ended_at = coalesce(ended_at, now())
  where id = p_conversation_id;

  insert into admin_audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
  values (
    auth.uid(),
    'peer_conversation_ended',
    'mental_health_peer_conversations',
    p_conversation_id,
    jsonb_build_object('status', v_old.status, 'seeker_id', v_old.seeker_id),
    jsonb_build_object('status', 'ended')
  );
end;
$$;

grant execute on function public.admin_end_peer_conversation(uuid) to authenticated;
