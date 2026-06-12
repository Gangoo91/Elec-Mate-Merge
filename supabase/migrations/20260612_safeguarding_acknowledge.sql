-- ============================================================================
-- Safeguarding acknowledgement (slice 3a) — a DSL records "I have seen this".
--
-- This is the state the escalation SLA (3b) keys off: an unacknowledged concern
-- past its window escalates. Acknowledgement is distinct from action_completed_at
-- (seen ≠ resolved).
--
-- Writes go through a SECURITY DEFINER RPC, not a broad UPDATE policy: the
-- pastoral_notes UPDATE policy is author-only, and we want a DSL to be able to
-- set ONLY the acknowledgement fields (never edit the concern), and only if they
-- are a designated lead at the concern's college.
-- ============================================================================

alter table public.pastoral_notes
  add column if not exists acknowledged_at timestamptz,
  add column if not exists acknowledged_by uuid;

create or replace function public.acknowledge_safeguarding_concern(p_concern_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_college uuid;
  v_staff_id uuid;
  v_ack timestamptz;
begin
  -- must be a safeguarding concern
  select college_id into v_college
  from pastoral_notes
  where id = p_concern_id and visibility = 'safeguarding';
  if v_college is null then
    raise exception 'not a safeguarding concern';
  end if;

  -- caller must be a designated lead at that college
  select id into v_staff_id
  from college_staff
  where college_id = v_college
    and user_id = auth.uid()
    and archived_at is null
    and (is_dsl or is_deputy_dsl)
  limit 1;
  if v_staff_id is null then
    raise exception 'not authorised — designated safeguarding leads only';
  end if;

  -- idempotent: first acknowledgement wins
  update pastoral_notes
  set acknowledged_at = now(), acknowledged_by = v_staff_id
  where id = p_concern_id and acknowledged_at is null;

  select acknowledged_at into v_ack from pastoral_notes where id = p_concern_id;
  return v_ack;
end;
$function$;

revoke execute on function public.acknowledge_safeguarding_concern(uuid) from anon, public;
grant execute on function public.acknowledge_safeguarding_concern(uuid) to authenticated;

-- ============================================================================
-- ROLLBACK:
--   drop function if exists public.acknowledge_safeguarding_concern(uuid);
--   alter table public.pastoral_notes drop column if exists acknowledged_at,
--     drop column if exists acknowledged_by;
-- ============================================================================
