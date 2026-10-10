-- ELE-1940: an owner-run "Move to firm" for RAMS a firm owner or admin made as
-- personal (before Site Safety knew about firms, 9 Oct 2026).
--
-- Opt-in only: nothing moves unless the person who made the RAMS asks, one
-- record or all of them. Never automatic, never a worker's RAMS, and undoable.
--
-- Rules (enforced here, not in the client):
--   * the caller made the record (user_id = auth.uid());
--   * the record is personal (employer_id is null, no firm job);
--   * the caller is the firm's owner or an active co-admin of it
--     (safety_is_firm_creator), and the firm is a real firm;
--   * the RAMS's own method statement and AI generation move with it, but only
--     when the caller made them too and they are personal.
-- Every move is logged in safety_firm_moves, which is what "Move back" undoes.
-- Additive only: one new table, three new functions. No existing policy,
-- column or function changes. The update goes through the live
-- safety_set_employer_scope trigger like any other write.

create table if not exists public.safety_firm_moves (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null,
  -- The RAMS the move was asked for; companions point at it.
  parent_id uuid not null,
  table_name text not null
    check (table_name in ('rams_documents', 'method_statements', 'rams_generation_jobs')),
  record_id uuid not null,
  employer_id uuid not null,
  moved_by uuid not null,
  moved_at timestamptz not null default now(),
  undone_at timestamptz
);

create index if not exists safety_firm_moves_parent_idx on public.safety_firm_moves (parent_id);
create index if not exists safety_firm_moves_moved_by_idx on public.safety_firm_moves (moved_by);

alter table public.safety_firm_moves enable row level security;

drop policy if exists "Movers read their own moves" on public.safety_firm_moves;
create policy "Movers read their own moves" on public.safety_firm_moves
  for select to authenticated using (moved_by = (select auth.uid()));

revoke all on public.safety_firm_moves from anon, public;
revoke insert, update, delete on public.safety_firm_moves from authenticated;
grant select on public.safety_firm_moves to authenticated;

-- Is this a firm the caller may move records into?
create or replace function public.safety_can_move_to_firm(p_employer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and p_employer_id is not null
     and p_employer_id in (select public.my_employer_scope())
     and public.safety_is_firm_creator(p_employer_id, auth.uid())
     -- A real firm: it has a team, a co-admin or a job. A sole trader's own id
     -- is in their scope too, but they have no firm to move anything into.
     and (
       exists (select 1 from public.employer_employees e where e.employer_id = p_employer_id)
       or exists (select 1 from public.employer_admins a
                   where a.employer_id = p_employer_id and a.status = 'active')
       or exists (select 1 from public.employer_jobs j where j.user_id = p_employer_id)
     );
$$;

-- The caller's own personal RAMS that could move into the firm, and the ones
-- they already moved (so they can be moved back).
create or replace function public.rams_firm_move_candidates(p_employer_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if not public.safety_can_move_to_firm(p_employer_id) then
    return jsonb_build_object('eligible', false, 'personal', '[]'::jsonb, 'moved', '[]'::jsonb);
  end if;

  return jsonb_build_object(
    'eligible', true,
    'personal', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', r.id, 'title', r.project_name, 'location', r.location,
               'status', r.status, 'created_at', r.created_at,
               'has_pdf', r.pdf_url is not null)
             order by r.created_at desc)
        from public.rams_documents r
       where r.user_id = v_uid
         and r.employer_id is null
         and r.employer_job_id is null
    ), '[]'::jsonb),
    'moved', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', r.id, 'title', r.project_name, 'location', r.location,
               'status', r.status, 'moved_at', m.moved_at,
               'on_job', r.employer_job_id is not null)
             order by m.moved_at desc)
        from public.safety_firm_moves m
        join public.rams_documents r on r.id = m.record_id
       where m.moved_by = v_uid
         and m.table_name = 'rams_documents'
         and m.undone_at is null
         and m.employer_id = p_employer_id
         and r.employer_id = p_employer_id
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.rams_move_to_firm(p_employer_id uuid, p_ids uuid[])
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_batch uuid := gen_random_uuid();
  v_doc record;
  v_gen uuid;
  v_moved int := 0;
  v_skipped int := 0;
begin
  if not public.safety_can_move_to_firm(p_employer_id) then
    raise exception 'Only the firm''s owner or an admin can move their own RAMS into the firm'
      using errcode = '42501';
  end if;
  if p_ids is null or cardinality(p_ids) = 0 then
    return jsonb_build_object('moved', 0, 'skipped', 0, 'batch_id', null);
  end if;
  if cardinality(p_ids) > 500 then
    raise exception 'Move at most 500 RAMS at a time';
  end if;

  for v_doc in
    select r.id, r.ai_generation_metadata
      from public.rams_documents r
     where r.id = any (p_ids)
       and r.user_id = v_uid
       and r.employer_id is null
       and r.employer_job_id is null
       for update
  loop
    update public.rams_documents set employer_id = p_employer_id where id = v_doc.id;
    insert into public.safety_firm_moves (batch_id, parent_id, table_name, record_id, employer_id, moved_by)
    values (v_batch, v_doc.id, 'rams_documents', v_doc.id, p_employer_id, v_uid);

    -- Its method statement, when the caller made it and it is personal.
    with ms as (
      update public.method_statements s set employer_id = p_employer_id
       where s.rams_document_id = v_doc.id
         and s.user_id = v_uid
         and s.employer_id is null
         and s.employer_job_id is null
      returning s.id
    )
    insert into public.safety_firm_moves (batch_id, parent_id, table_name, record_id, employer_id, moved_by)
    select v_batch, v_doc.id, 'method_statements', ms.id, p_employer_id, v_uid from ms;

    -- The AI generation it was issued from, so the firm's AI list shows it too.
    begin
      v_gen := nullif(v_doc.ai_generation_metadata ->> 'generation_job_id', '')::uuid;
    exception when others then
      v_gen := null;
    end;
    if v_gen is not null then
      with g as (
        update public.rams_generation_jobs j set employer_id = p_employer_id
         where j.id = v_gen
           and j.user_id = v_uid
           and j.employer_id is null
           and j.employer_job_id is null
        returning j.id
      )
      insert into public.safety_firm_moves (batch_id, parent_id, table_name, record_id, employer_id, moved_by)
      select v_batch, v_doc.id, 'rams_generation_jobs', g.id, p_employer_id, v_uid from g;
    end if;

    v_moved := v_moved + 1;
  end loop;

  v_skipped := cardinality(p_ids) - v_moved;
  return jsonb_build_object('moved', v_moved, 'skipped', v_skipped, 'batch_id', v_batch);
end;
$$;

-- Undo: back to the caller's own records. Only what the caller moved, only
-- while it is still filed with that firm and not yet on a firm job.
create or replace function public.rams_move_back_to_personal(p_ids uuid[])
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_move record;
  v_restored int := 0;
  v_on_job int := 0;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if p_ids is null or cardinality(p_ids) = 0 then
    return jsonb_build_object('restored', 0, 'on_job', 0);
  end if;

  for v_move in
    select m.id, m.parent_id, m.employer_id
      from public.safety_firm_moves m
      join public.rams_documents r on r.id = m.record_id
     where m.table_name = 'rams_documents'
       and m.record_id = any (p_ids)
       and m.moved_by = v_uid
       and m.undone_at is null
       and r.user_id = v_uid
       and r.employer_id = m.employer_id
       for update of m
  loop
    if exists (select 1 from public.rams_documents r
                where r.id = v_move.parent_id and r.employer_job_id is not null) then
      v_on_job := v_on_job + 1;
      continue;
    end if;

    update public.rams_documents set employer_id = null
     where id = v_move.parent_id and user_id = v_uid and employer_id = v_move.employer_id
       and employer_job_id is null;
    update public.method_statements s set employer_id = null
     where s.id in (select c.record_id from public.safety_firm_moves c
                     where c.parent_id = v_move.parent_id and c.table_name = 'method_statements'
                       and c.moved_by = v_uid and c.undone_at is null)
       and s.user_id = v_uid and s.employer_id = v_move.employer_id and s.employer_job_id is null;
    update public.rams_generation_jobs j set employer_id = null
     where j.id in (select c.record_id from public.safety_firm_moves c
                     where c.parent_id = v_move.parent_id and c.table_name = 'rams_generation_jobs'
                       and c.moved_by = v_uid and c.undone_at is null)
       and j.user_id = v_uid and j.employer_id = v_move.employer_id and j.employer_job_id is null;

    update public.safety_firm_moves set undone_at = now()
     where parent_id = v_move.parent_id and moved_by = v_uid and undone_at is null;
    v_restored := v_restored + 1;
  end loop;

  return jsonb_build_object('restored', v_restored, 'on_job', v_on_job);
end;
$$;

revoke all on function public.safety_can_move_to_firm(uuid) from public, anon;
revoke all on function public.rams_firm_move_candidates(uuid) from public, anon;
revoke all on function public.rams_move_to_firm(uuid, uuid[]) from public, anon;
revoke all on function public.rams_move_back_to_personal(uuid[]) from public, anon;
grant execute on function public.safety_can_move_to_firm(uuid) to authenticated;
grant execute on function public.rams_firm_move_candidates(uuid) to authenticated;
grant execute on function public.rams_move_to_firm(uuid, uuid[]) to authenticated;
grant execute on function public.rams_move_back_to_personal(uuid[]) to authenticated;
