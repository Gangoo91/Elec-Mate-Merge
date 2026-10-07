-- ELE-1911: a designated safeguarding lead can close a concern with what was
-- done. Before this the only update rule on pastoral_notes was "the author
-- updates their own note", so a lead could acknowledge a concern but never
-- record that it had been dealt with. Leads only (DSL or deputy), same check
-- as acknowledge_safeguarding_concern; the closure is never deleted, and a
-- closed concern can be reopened by a lead with a reason.

alter table public.pastoral_notes
  add column if not exists closed_at timestamptz,
  add column if not exists closed_by uuid references public.college_staff(id) on delete set null,
  add column if not exists closure_note text;

create or replace function public.close_safeguarding_concern(p_concern_id uuid, p_outcome text, p_reopen boolean default false)
returns timestamptz
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_staff_id uuid;
  v_at timestamptz;
begin
  select college_id into v_college from pastoral_notes
   where id = p_concern_id and visibility = 'safeguarding';
  if v_college is null then
    raise exception 'not a safeguarding concern';
  end if;

  select id into v_staff_id from college_staff
   where college_id = v_college and user_id = auth.uid() and archived_at is null
     and (is_dsl or is_deputy_dsl)
   limit 1;
  if v_staff_id is null then
    raise exception 'not authorised — designated safeguarding leads only' using errcode = '42501';
  end if;

  if p_outcome is null or length(btrim(p_outcome)) < 3 then
    raise exception 'say what was done' using errcode = '22023';
  end if;

  if p_reopen then
    update pastoral_notes
       set closed_at = null, closed_by = null,
           closure_note = coalesce(closure_note || E'\n', '') || 'Reopened ' || to_char(now() at time zone 'Europe/London', 'DD Mon YYYY') || ': ' || btrim(p_outcome)
     where id = p_concern_id;
    return null;
  end if;

  update pastoral_notes
     set closed_at = now(), closed_by = v_staff_id,
         closure_note = coalesce(closure_note || E'\n', '') || btrim(p_outcome),
         acknowledged_at = coalesce(acknowledged_at, now()),
         acknowledged_by = coalesce(acknowledged_by, v_staff_id)
   where id = p_concern_id
   returning closed_at into v_at;
  return v_at;
end;
$$;

revoke all on function public.close_safeguarding_concern(uuid, text, boolean) from public, anon;
grant execute on function public.close_safeguarding_concern(uuid, text, boolean) to authenticated;
