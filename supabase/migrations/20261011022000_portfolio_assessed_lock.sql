-- Evidence an assessor has PASSED is locked.
--
-- Before this, deleting such an item was already refused
-- (_portfolio_items_delete_guard), but the learner could still edit its
-- title, description, reflection, work details or swap its files, and could
-- delete the stored file itself from the portfolio-evidence bucket. The
-- fingerprint would show the change, but the evidence the assessor judged
-- would be gone.
--
-- Now, once any passing decision (current or superseded) cites an item:
--   * the learner cannot change what the evidence says or shows (the fields
--     that make up its fingerprint, plus file_url),
--   * the learner cannot delete its stored files,
--   * claims, comments, witnesses and submissions are untouched,
--   * a "new version" is a new item linked by previous_version_id
--     (create_portfolio_item_version), assessed on its own.
-- A referral ("needs more") does NOT lock the item: the learner is being asked
-- to add to it. Staff, service code and platform admins are not affected.
-- The fingerprint (_portfolio_item_hash) is unchanged.

create or replace function public._portfolio_item_assessed(p_item_id uuid, p_owner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.portfolio_assessment_decisions d
     where d.learner_id = p_owner
       and d.decision = 'passed'
       and p_item_id = any (d.evidence_item_ids)
  );
$$;
revoke all on function public._portfolio_item_assessed(uuid, uuid) from public, anon;
grant execute on function public._portfolio_item_assessed(uuid, uuid) to authenticated;

create or replace function public._portfolio_items_assessed_lock()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(old.user_id) then
    return new;
  end if;
  if not public._portfolio_item_assessed(old.id, old.user_id) then
    return new;
  end if;
  if new.title is distinct from old.title
  or new.description is distinct from old.description
  or new.reflection_notes is distinct from old.reflection_notes
  or new.date_completed is distinct from old.date_completed
  or new.file_url is distinct from old.file_url
  or new.storage_urls is distinct from old.storage_urls
  or (coalesce(new.metadata, '{}'::jsonb) - 'ui') is distinct from (coalesce(old.metadata, '{}'::jsonb) - 'ui') then
    raise exception 'this evidence has been assessed, so it cannot be changed; add a new version instead'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_portfolio_items_assessed_lock on public.portfolio_items;
create trigger trg_portfolio_items_assessed_lock
  before update on public.portfolio_items
  for each row execute function public._portfolio_items_assessed_lock();

-- The stored file behind assessed evidence cannot be deleted by the learner.
create or replace function public._evidence_object_locked(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.portfolio_items i
      cross join lateral jsonb_array_elements(
        case when jsonb_typeof(i.storage_urls) = 'array' then i.storage_urls else '[]'::jsonb end) f
     where i.user_id::text = split_part(p_name, '/', 1)
       and (f->>'url') like '%/portfolio-evidence/' || p_name
       and public._portfolio_item_assessed(i.id, i.user_id)
  )
  or exists (
    select 1 from public.portfolio_items i
     where i.user_id::text = split_part(p_name, '/', 1)
       and i.file_url like '%/portfolio-evidence/' || p_name
       and public._portfolio_item_assessed(i.id, i.user_id)
  );
$$;
revoke all on function public._evidence_object_locked(text) from public, anon;
grant execute on function public._evidence_object_locked(text) to authenticated;

drop policy if exists "portfolio-evidence: assessed files are kept" on storage.objects;
create policy "portfolio-evidence: assessed files are kept" on storage.objects
  as restrictive
  for delete
  to authenticated
  using (
    bucket_id <> 'portfolio-evidence'
    or public._is_platform_admin()
    or not public._evidence_object_locked(name)
  );

-- "Add a new version": a fresh draft that follows an assessed item. It copies
-- the words and the learner's own claims, not the files or any decision; the
-- learner adds what is new and sends it for assessment like any evidence.
create or replace function public.create_portfolio_item_version(p_item_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old public.portfolio_items%rowtype;
  v_id uuid := gen_random_uuid();
  v_claims jsonb;
begin
  select * into v_old from public.portfolio_items where id = p_item_id;
  if v_old.id is null or v_old.user_id is distinct from auth.uid() then
    raise exception 'only the learner who owns this evidence can add a new version' using errcode = '42501';
  end if;
  if coalesce(v_old.metadata->>'source', '') = 'college_observation' then
    raise exception 'an observation is your assessor''s record; capture new evidence instead' using errcode = '42501';
  end if;

  insert into public.portfolio_items
    (id, user_id, title, description, category, reflection_notes, skills_demonstrated, tags,
     awarding_body_standards, metadata, storage_urls, evidence_count, status, source, previous_version_id,
     ai_assisted, ai_use)
  values
    (v_id, v_old.user_id, left(coalesce(v_old.title, 'Evidence') || ' (new version)', 300),
     v_old.description, v_old.category, v_old.reflection_notes, v_old.skills_demonstrated, v_old.tags,
     v_old.awarding_body_standards,
     (coalesce(v_old.metadata, '{}'::jsonb) - 'ui' - 'observation' - 'source' - 'assistant' - 'ai_use')
       || jsonb_build_object('previousVersionOf', v_old.id),
     '[]'::jsonb, 0, 'draft', v_old.source, v_old.id,
     v_old.ai_assisted, v_old.ai_use);

  select coalesce(jsonb_agg(jsonb_build_object('unit_code', c.unit_code, 'ac_code', c.ac_code)), '[]'::jsonb)
    into v_claims
    from public.portfolio_item_criteria c
   where c.portfolio_item_id = v_old.id and c.source = 'learner';
  insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, unit_code, ac_code, source)
  select v_id, v_old.user_id, x->>'unit_code', x->>'ac_code', 'learner'
    from jsonb_array_elements(v_claims) x
  on conflict (portfolio_item_id, unit_code, ac_code) do nothing;
  perform public._pic_mirror_strings(v_id);
  return v_id;
end;
$$;
revoke all on function public.create_portfolio_item_version(uuid) from public, anon;
grant execute on function public.create_portfolio_item_version(uuid) to authenticated;
