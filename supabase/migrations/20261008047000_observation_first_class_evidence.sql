-- ELE-1873: observation and professional discussion as first-class evidence.
--
-- The tutor records it on a phone in the workshop: learner, activity, the
-- criteria seen (ticked from the catalogue, never typed codes), photos, video
-- or a recording, the narrative (dictated), outcome and action points. Sending
-- it makes it evidence in the learner's own portfolio through the Portfolio
-- 2.0 backbone, NOT a parallel scoring path:
--
--   college_observations.portfolio_item_id  -> one portfolio_items row owned by the
--                                              learner, metadata.source = 'college_observation'
--   portfolio_item_criteria (source 'assessor') the criteria the assessor saw; the
--                                              criterion reads "claimed" (Ready to assess)
--   record_ac_decisions(method 'observation' | 'professional_discussion')
--                                              the ONLY way a criterion is passed; the
--                                              assessor chooses to, now or later
--   portfolio_audit_events                     observation_recorded / observation_acknowledged
--                                              with the observation's content hash
--
-- The learner sees it in their evidence list ("Observed by ..."), gets a bell +
-- push with a link to the exact item, and acknowledges it (optionally with a
-- comment). The observer is told, with a link that opens the criteria ticked
-- and ready for a decision.
--
-- Also: the old observation trigger marked coverage 'assessed' straight from
-- the observation outcome (a second way to pass a criterion). It now only
-- marks legacy, unsent observations 'evidenced'; passing is decisions only.

-- 1. Columns ------------------------------------------------------------------
alter table public.college_observations
  add column if not exists kind text not null default 'observation',
  add column if not exists criteria jsonb not null default '[]'::jsonb,
  add column if not exists media jsonb not null default '[]'::jsonb,
  add column if not exists transcript text,
  add column if not exists learner_user_id uuid references auth.users(id) on delete set null,
  add column if not exists portfolio_item_id uuid references public.portfolio_items(id) on delete set null,
  add column if not exists sent_at timestamptz,
  add column if not exists content_hash text,
  add column if not exists learner_comment text;

do $$ begin
  alter table public.college_observations
    add constraint college_observations_kind_check check (kind in ('observation', 'professional_discussion'));
exception when duplicate_object then null; end $$;

create index if not exists college_observations_item_idx on public.college_observations (portfolio_item_id)
  where portfolio_item_id is not null;
create index if not exists college_observations_learner_idx on public.college_observations (learner_user_id, sent_at desc)
  where sent_at is not null;

comment on table public.college_observations is
  '[COLLEGE ASSESSMENT — OBSERVATION / PROFESSIONAL DISCUSSION] A tutor or assessor''s record of watching a learner work, or of a professional discussion with them. Scope: one row per observation, per college; drafts live here only. Used by: RecordObservationSheet (phone-first, College Hub Act button and Student 360), SectionObservations, the learner''s evidence detail (acknowledge), get_my_do_next. Rule: sending goes through save_college_observation, which makes ONE portfolio_items row owned by the learner with the criteria as assessor-tagged portfolio_item_criteria; a criterion is passed only by record_ac_decisions. A sent observation is never edited or deleted, only acknowledged.';

-- 2. Learner reads their own sent observations --------------------------------
drop policy if exists "Learner reads own sent observations" on public.college_observations;
create policy "Learner reads own sent observations" on public.college_observations
  for select to authenticated using (
    sent_at is not null and learner_user_id = auth.uid());

-- 3. A sent observation is part of the record --------------------------------
create or replace function public._college_obs_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  -- Definer functions (save / acknowledge) and the service role pass.
  if current_user not in ('authenticated', 'anon') then
    return coalesce(new, old);
  end if;
  if tg_op = 'INSERT' then
    -- Direct inserts are drafts. Sending is save_college_observation's job.
    new.sent_at := null; new.portfolio_item_id := null; new.content_hash := null;
    new.learner_acknowledged := false; new.learner_acknowledged_at := null; new.learner_comment := null;
    return new;
  end if;
  if tg_op = 'DELETE' then
    if old.sent_at is not null then
      raise exception 'a sent observation is part of the learner''s record and cannot be deleted'
        using errcode = '42501';
    end if;
    return old;
  end if;
  if old.sent_at is not null
     and (to_jsonb(new) - 'follow_up_required' - 'follow_up_date' - 'updated_at')
         is distinct from (to_jsonb(old) - 'follow_up_required' - 'follow_up_date' - 'updated_at') then
    raise exception 'a sent observation is never edited; record a new one' using errcode = '42501';
  end if;
  if old.sent_at is null and (new.sent_at is not null or new.portfolio_item_id is not null
                              or new.learner_acknowledged) then
    raise exception 'send an observation with save_college_observation' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_college_obs_guard on public.college_observations;
create trigger trg_college_obs_guard before insert or update or delete on public.college_observations
  for each row execute function public._college_obs_guard();

-- 4. Passing is decisions only ------------------------------------------------
create or replace function public.apply_observation_to_ac_coverage()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_ac text;
begin
  -- Sent observations count through the portfolio item and its criteria.
  if new.portfolio_item_id is not null or new.sent_at is not null
     or jsonb_array_length(coalesce(new.criteria, '[]'::jsonb)) > 0 then return new; end if;
  if new.college_student_id is null or array_length(new.acs_evidenced, 1) is null then return new; end if;
  if new.outcome not in ('passed', 'partial') then return new; end if;
  -- Legacy free-text codes: evidence only. A criterion is passed by a decision
  -- (record_ac_decisions), never by an observation outcome.
  foreach v_ac in array new.acs_evidenced loop
    update public.student_ac_coverage
       set status = case when status in ('not_started', 'in_progress') then 'evidenced' else status end,
           evidence_count = coalesce(evidence_count, 0) + 1,
           last_evidence_at = greatest(coalesce(last_evidence_at, '1970-01-01'::timestamptz), new.observed_at::timestamptz),
           updated_at = now()
     where student_id = new.college_student_id
       and ac_code = v_ac
       and (new.qualification_code is null or qualification_code = new.qualification_code)
       and (new.unit_code is null or unit_code = new.unit_code);
  end loop;
  return new;
end $function$;

-- 5. The learner cannot rewrite what the observer recorded --------------------
create or replace function public._portfolio_items_observation_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin() then
    return coalesce(new, old);
  end if;
  if coalesce(old.metadata->>'source', '') <> 'college_observation' then
    return coalesce(new, old);
  end if;
  if tg_op = 'DELETE' then
    raise exception 'an observation your assessor recorded is part of your record and cannot be deleted'
      using errcode = '42501';
  end if;
  if new.user_id is distinct from old.user_id
  or new.title is distinct from old.title
  or new.description is distinct from old.description
  or new.storage_urls is distinct from old.storage_urls
  or new.file_url is distinct from old.file_url
  or new.date_completed is distinct from old.date_completed
  or (coalesce(new.metadata, '{}'::jsonb) - 'ui') is distinct from (coalesce(old.metadata, '{}'::jsonb) - 'ui') then
    raise exception 'an observation is recorded by your assessor; acknowledge it or add a comment instead'
      using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_portfolio_items_observation_guard on public.portfolio_items;
create trigger trg_portfolio_items_observation_guard before update or delete on public.portfolio_items
  for each row execute function public._portfolio_items_observation_guard();

-- 6. Media: the assessor uploads into the LEARNER's folder ---------------------
-- portfolio-evidence/<learner uid>/observations/<file>. The learner owns the
-- folder (and reads it like any of their evidence); the assessor may only add
-- to the observations sub-folder of a learner they assess. The bucket stays
-- public (Andrew, 6 Oct) — this only adds an insert path.
create or replace function public._can_upload_observation_media(p_name text)
returns boolean language plpgsql stable security definer set search_path to 'public' as $$
declare v_owner uuid;
begin
  if auth.uid() is null then return false; end if;
  if coalesce((storage.foldername(p_name))[2], '') <> 'observations' then return false; end if;
  begin
    v_owner := (storage.foldername(p_name))[1]::uuid;
  exception when others then return false; end;
  return v_owner <> auth.uid() and public._can_assess(v_owner);
end; $$;
revoke all on function public._can_upload_observation_media(text) from public, anon;
grant execute on function public._can_upload_observation_media(text) to authenticated;

drop policy if exists "portfolio-evidence: assessor adds observation media" on storage.objects;
create policy "portfolio-evidence: assessor adds observation media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio-evidence' and public._can_upload_observation_media(name));

-- A professional discussion is a recording. Audio was not an allowed type.
update storage.buckets
   set allowed_mime_types = (
     select array_agg(distinct m order by m)
       from unnest(coalesce(allowed_mime_types, '{}'::text[])
                   || array['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/aac',
                            'audio/x-m4a', 'audio/wav', 'video/webm']) m)
 where id = 'portfolio-evidence' and allowed_mime_types is not null;

-- 7. Notification types --------------------------------------------------------
insert into public.notification_types (type, category, push, importance) values
  ('observation_recorded', 'apprentice', true, 1),
  ('observation_acknowledged', 'college_marking', true, 1)
on conflict (type) do update set category = excluded.category, push = excluded.push;

-- 8. Save (draft) or send ------------------------------------------------------
-- p: { id?, college_student_id, kind, activity_title, activity_summary, transcript,
--      observed_at, observed_time, duration_minutes, location, location_type,
--      criteria: [{unit_code, ac_code}], media: [{url, path, name, type, size, sha256}],
--      outcome, feedback_strengths, feedback_areas, action_points: [text],
--      follow_up_required, follow_up_date }
create or replace function public.save_college_observation(p jsonb, p_send boolean default false)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  v_student public.college_students%rowtype;
  v_staff public.college_staff%rowtype;
  v_obs public.college_observations%rowtype;
  v_id uuid := nullif(p->>'id', '')::uuid;
  v_kind text := coalesce(nullif(p->>'kind', ''), 'observation');
  v_title text := left(trim(coalesce(p->>'activity_title', '')), 200);
  v_outcome text := coalesce(nullif(p->>'outcome', ''), 'partial');
  v_req text;
  v_criteria jsonb := '[]'::jsonb;
  v_media jsonb := '[]'::jsonb;
  v_actions text[] := '{}';
  v_item uuid;
  v_hash text;
  v_observer text;
  v_files jsonb;
  c jsonb;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  if jsonb_typeof(p) <> 'object' then raise exception 'bad request' using errcode = '22023'; end if;

  select * into v_student from public.college_students where id = nullif(p->>'college_student_id', '')::uuid;
  if v_student.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;

  select * into v_staff from public.college_staff
   where user_id = v_uid and college_id = v_student.college_id and archived_at is null
     and coalesce(status, 'Active') <> 'Archived'
     and role in ('tutor', 'assessor', 'iqa', 'admin', 'head_of_department')
   order by created_at limit 1;
  if v_staff.id is null and not public._is_platform_admin() then
    raise exception 'you do not assess learners at this college' using errcode = '42501';
  end if;
  if v_student.user_id = v_uid then raise exception 'you cannot observe yourself' using errcode = '42501'; end if;

  if v_kind not in ('observation', 'professional_discussion') then
    raise exception 'unknown kind' using errcode = '22023';
  end if;
  if v_outcome not in ('passed', 'partial', 'referred', 'not_yet') then
    raise exception 'unknown outcome' using errcode = '22023';
  end if;
  if v_title = '' then raise exception 'add what the learner did' using errcode = '22023'; end if;

  -- Criteria: only real criteria of the learner's qualification, de-duplicated.
  if v_student.user_id is not null then
    select requirement_code into v_req from public._resolve_qualification(v_student.user_id, null);
  else
    select requirement_code into v_req from public._resolve_qualification(null, v_student.id);
  end if;
  if jsonb_typeof(p->'criteria') = 'array' then
    if jsonb_array_length(p->'criteria') > 80 then
      raise exception 'too many criteria for one observation' using errcode = '22023';
    end if;
    select coalesce(jsonb_agg(jsonb_build_object('unit_code', x.u, 'ac_code', x.a) order by x.u, x.a), '[]'::jsonb)
      into v_criteria
      from (select distinct trim(e->>'unit_code') u, trim(e->>'ac_code') a
              from jsonb_array_elements(p->'criteria') e
             where coalesce(trim(e->>'unit_code'), '') <> '' and coalesce(trim(e->>'ac_code'), '') <> '') x
     where v_req is null
        or exists (select 1 from public.qualification_requirements q
                    where q.qualification_code = v_req and q.unit_code = x.u and q.ac_code = x.a);
  end if;

  -- Media: our evidence bucket only, in this learner's folder.
  if jsonb_typeof(p->'media') = 'array' then
    select coalesce(jsonb_agg(jsonb_build_object(
             'url', m->>'url', 'path', m->>'path', 'name', left(coalesce(m->>'name', 'File'), 200),
             'type', left(coalesce(m->>'type', ''), 100), 'size', nullif(m->>'size', '')::bigint,
             'sha256', nullif(m->>'sha256', ''))), '[]'::jsonb)
      into v_media
      from (select m from jsonb_array_elements(p->'media') m limit 20) s
     where coalesce(m->>'url', '') like '%/portfolio-evidence/%'
       and (v_student.user_id is null or coalesce(m->>'path', '') like v_student.user_id::text || '/observations/%');
  end if;

  if jsonb_typeof(p->'action_points') = 'array' then
    select coalesce(array_agg(left(trim(x), 300)), '{}') into v_actions
      from jsonb_array_elements_text(p->'action_points') x where trim(x) <> '';
  end if;

  if v_id is not null then
    select * into v_obs from public.college_observations where id = v_id for update;
    if v_obs.id is null or v_obs.college_id is distinct from v_student.college_id then
      raise exception 'observation not found' using errcode = 'P0002';
    end if;
    if v_obs.sent_at is not null then
      raise exception 'this observation has been sent; record a new one' using errcode = '42501';
    end if;
    update public.college_observations set
      college_student_id = v_student.id, kind = v_kind, activity_title = v_title,
      activity_summary = nullif(trim(coalesce(p->>'activity_summary', '')), ''),
      transcript = nullif(trim(coalesce(p->>'transcript', '')), ''),
      observed_at = coalesce(nullif(p->>'observed_at', '')::date, observed_at),
      observed_time = nullif(p->>'observed_time', '')::time,
      duration_minutes = nullif(p->>'duration_minutes', '')::int,
      location = nullif(trim(coalesce(p->>'location', '')), ''),
      location_type = nullif(p->>'location_type', ''),
      criteria = v_criteria, media = v_media, outcome = v_outcome,
      acs_evidenced = coalesce((select array_agg(e->>'unit_code' || ':' || (e->>'ac_code')) from jsonb_array_elements(v_criteria) e), '{}'),
      qualification_code = v_req,
      feedback_strengths = nullif(trim(coalesce(p->>'feedback_strengths', '')), ''),
      feedback_areas = nullif(trim(coalesce(p->>'feedback_areas', '')), ''),
      action_points = v_actions,
      follow_up_required = coalesce((p->>'follow_up_required')::boolean, false),
      follow_up_date = nullif(p->>'follow_up_date', '')::date,
      learner_user_id = v_student.user_id
    where id = v_id returning * into v_obs;
  else
    insert into public.college_observations (
      college_id, college_student_id, college_staff_id, kind, activity_title, activity_summary, transcript,
      observed_at, observed_time, duration_minutes, location, location_type, criteria, media, outcome,
      acs_evidenced, qualification_code, feedback_strengths, feedback_areas, action_points,
      follow_up_required, follow_up_date, learner_user_id, created_by)
    values (
      v_student.college_id, v_student.id, v_staff.id, v_kind, v_title,
      nullif(trim(coalesce(p->>'activity_summary', '')), ''),
      nullif(trim(coalesce(p->>'transcript', '')), ''),
      coalesce(nullif(p->>'observed_at', '')::date, public._lon(now())),
      nullif(p->>'observed_time', '')::time,
      nullif(p->>'duration_minutes', '')::int,
      nullif(trim(coalesce(p->>'location', '')), ''),
      nullif(p->>'location_type', ''),
      v_criteria, v_media, v_outcome,
      coalesce((select array_agg(e->>'unit_code' || ':' || (e->>'ac_code')) from jsonb_array_elements(v_criteria) e), '{}'),
      v_req,
      nullif(trim(coalesce(p->>'feedback_strengths', '')), ''),
      nullif(trim(coalesce(p->>'feedback_areas', '')), ''),
      v_actions,
      coalesce((p->>'follow_up_required')::boolean, false),
      nullif(p->>'follow_up_date', '')::date,
      v_student.user_id, v_uid)
    returning * into v_obs;
  end if;

  if v_obs.observed_at > public._lon(now()) then
    raise exception 'the date cannot be in the future' using errcode = '22023';
  end if;

  if not p_send then
    return jsonb_build_object('id', v_obs.id, 'sent', false);
  end if;

  -- ── Send ──────────────────────────────────────────────────────────────
  if v_student.user_id is not null and v_req is not null and jsonb_array_length(v_criteria) = 0 then
    raise exception 'tick at least one criterion you saw' using errcode = '22023';
  end if;

  v_observer := coalesce(v_obs.assessor_name_snapshot, v_staff.name,
                         (select full_name from public.profiles where id = v_uid), 'Your assessor');
  v_hash := encode(extensions.digest(jsonb_build_object(
      'id', v_obs.id, 'learner', v_student.id, 'kind', v_obs.kind, 'title', v_obs.activity_title,
      'narrative', coalesce(v_obs.activity_summary, ''), 'transcript', coalesce(v_obs.transcript, ''),
      'observed_at', v_obs.observed_at, 'criteria', v_obs.criteria,
      'media', coalesce((select jsonb_agg(jsonb_build_object('url', m->>'url', 'sha256', m->>'sha256') order by m->>'url')
                           from jsonb_array_elements(v_obs.media) m), '[]'::jsonb),
      'outcome', v_obs.outcome, 'strengths', coalesce(v_obs.feedback_strengths, ''),
      'areas', coalesce(v_obs.feedback_areas, ''), 'actions', to_jsonb(v_obs.action_points),
      'observer', v_uid)::text, 'sha256'), 'hex');

  if v_student.user_id is not null then
    select coalesce(jsonb_agg(jsonb_build_object(
             'id', gen_random_uuid(), 'name', m->>'name', 'type', m->>'type', 'size', (m->>'size')::bigint,
             'url', m->>'url', 'sha256', m->>'sha256', 'uploadDate', now(),
             'evidenceType', case when (m->>'type') like 'video/%' then 'video'
                                  when (m->>'type') like 'image/%' then 'photo' else 'document' end)), '[]'::jsonb)
      into v_files from jsonb_array_elements(v_obs.media) m;

    insert into public.portfolio_items (
      user_id, title, description, category, storage_urls, status, date_completed, tags, metadata, evidence_count)
    values (
      v_student.user_id,
      case v_obs.kind when 'professional_discussion' then 'Professional discussion: ' else 'Observed: ' end
        || v_obs.activity_title,
      coalesce(v_obs.activity_summary, ''),
      case v_obs.kind when 'professional_discussion' then 'professional_discussion' else 'observation' end,
      v_files, 'completed', v_obs.observed_at::timestamptz,
      array[v_obs.kind],
      jsonb_build_object(
        'source', 'college_observation',
        'workDate', v_obs.observed_at,
        'observation', jsonb_build_object(
          'id', v_obs.id, 'kind', v_obs.kind, 'observer_name', v_observer, 'observer_user_id', v_uid,
          'observed_at', v_obs.observed_at, 'observed_time', v_obs.observed_time,
          'duration_minutes', v_obs.duration_minutes, 'location', v_obs.location,
          'location_type', v_obs.location_type, 'outcome', v_obs.outcome,
          'strengths', v_obs.feedback_strengths, 'areas', v_obs.feedback_areas,
          'action_points', to_jsonb(v_obs.action_points), 'transcript', v_obs.transcript,
          'follow_up_date', v_obs.follow_up_date, 'content_hash', v_hash)),
      jsonb_array_length(v_files))
    returning id into v_item;

    for c in select * from jsonb_array_elements(v_obs.criteria) loop
      insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, qualification_code, unit_code, ac_code, source)
      values (v_item, v_student.user_id, v_req, c->>'unit_code', c->>'ac_code', 'assessor')
      on conflict (portfolio_item_id, unit_code, ac_code) do nothing;
    end loop;
    perform public._pic_mirror_strings(v_item);
  end if;

  update public.college_observations
     set sent_at = now(), portfolio_item_id = v_item, content_hash = v_hash,
         assessor_signed = true, assessor_signed_at = now(),
         assessor_name_snapshot = coalesce(assessor_name_snapshot, v_observer)
   where id = v_obs.id;

  if v_student.user_id is not null then
    perform public._pae_write(v_student.user_id, 'observation_recorded', 'college_observation', v_obs.id,
      jsonb_build_object('portfolio_item_id', v_item, 'kind', v_obs.kind, 'title', v_obs.activity_title,
                         'observer_name', v_observer, 'outcome', v_obs.outcome,
                         'criteria', v_obs.criteria, 'files', jsonb_array_length(v_obs.media)),
      v_hash);
    perform public.notify_user(v_student.user_id, 'observation_recorded',
      split_part(v_observer, ' ', 1) || case v_obs.kind when 'professional_discussion'
        then ' recorded your professional discussion' else ' recorded an observation of your work' end,
      v_obs.activity_title || '. Read it and acknowledge it.',
      jsonb_build_object('route', '/apprentice/hub?item=' || v_item, 'ref_id', v_obs.id::text,
                         'observation_id', v_obs.id, 'portfolio_item_id', v_item));
  end if;

  return jsonb_build_object('id', v_obs.id, 'sent', true, 'portfolio_item_id', v_item,
                            'learner_joined', v_student.user_id is not null, 'content_hash', v_hash,
                            'learner_user_id', v_student.user_id,
                            'criteria', jsonb_array_length(v_obs.criteria));
end; $$;
revoke all on function public.save_college_observation(jsonb, boolean) from public, anon;
grant execute on function public.save_college_observation(jsonb, boolean) to authenticated;

-- 9. The learner acknowledges --------------------------------------------------
create or replace function public.acknowledge_college_observation(p_id uuid, p_comment text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  o public.college_observations%rowtype;
  v_name text;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  select * into o from public.college_observations where id = p_id for update;
  if o.id is null or o.sent_at is null or o.learner_user_id is distinct from v_uid then
    raise exception 'observation not found' using errcode = 'P0002';
  end if;
  if o.learner_acknowledged then
    return jsonb_build_object('acknowledged', true, 'already', true, 'at', o.learner_acknowledged_at);
  end if;
  update public.college_observations
     set learner_acknowledged = true, learner_acknowledged_at = now(),
         learner_comment = nullif(left(trim(coalesce(p_comment, '')), 2000), '')
   where id = o.id returning * into o;

  perform public._pae_write(v_uid, 'observation_acknowledged', 'college_observation', o.id,
    jsonb_build_object('portfolio_item_id', o.portfolio_item_id, 'kind', o.kind, 'title', o.activity_title,
                       'comment', left(o.learner_comment, 280)),
    o.content_hash, 'learner');

  select coalesce(nullif(split_part(s.name, ' ', 1), ''), 'Your learner') into v_name
    from public.college_students s where s.id = o.college_student_id;
  if o.created_by is not null and o.created_by <> v_uid then
    perform public.notify_user(o.created_by, 'observation_acknowledged',
      v_name || ' acknowledged your ' || case o.kind when 'professional_discussion'
        then 'professional discussion' else 'observation' end,
      o.activity_title || coalesce(': "' || left(o.learner_comment, 140) || '"', '. Record your decision on the criteria.'),
      jsonb_build_object('route', '/college?section=student360&studentId=' || o.college_student_id
                                  || '&focus=' || o.portfolio_item_id || '#assess',
                         'ref_id', o.id::text, 'observation_id', o.id,
                         'portfolio_item_id', o.portfolio_item_id));
  end if;
  return jsonb_build_object('acknowledged', true, 'at', o.learner_acknowledged_at);
end; $$;
revoke all on function public.acknowledge_college_observation(uuid, text) from public, anon;
grant execute on function public.acknowledge_college_observation(uuid, text) to authenticated;

-- 10. Do next: observations to acknowledge -----------------------------------
-- The live get_my_do_next (20261008036000) with one more source appended.
CREATE OR REPLACE FUNCTION public.get_my_do_next()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  u uuid := auth.uid();
  v_today date := public._lon(now());
  v_cs record;
  v_ac jsonb := '[]'::jsonb;
  v_has_qual boolean := false;
  v_otj jsonb;
  v_items jsonb := '[]'::jsonb;
  v_suggestion jsonb;
  v_unit record;
begin
  if u is null or coalesce(auth.role(), '') <> 'authenticated' then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  select s.id, s.cohort_id, s.college_id into v_cs
    from college_students s
   where s.user_id = u
     and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;

  -- Hours the app already knows about (registers, diary college days): keep
  -- the proposals fresh, exactly as get_otj_proposals does. Never fatal.
  begin
    perform public._otj_build_proposals(u);
  exception when others then
    raise warning '[get_my_do_next] proposals: %', sqlerrm;
  end;

  -- Every criterion's honest state (empty when no course is resolved).
  begin
    select coalesce(jsonb_agg(to_jsonb(a)), '[]'::jsonb) into v_ac
      from public.get_portfolio_ac_state(u) a;
  exception when others then
    v_ac := '[]'::jsonb;
  end;
  v_has_qual := jsonb_array_length(v_ac) > 0;

  with
  ac as (
    select * from jsonb_to_recordset(v_ac) as x(
      unit_code text, unit_title text, ac_code text, ac_text text, state text,
      evidence_item_ids uuid[], decision_feedback text, decided_at timestamptz, assessor_name text, iqa_feedback text)
  ),
  -- 1. Assessment plan items
  plans as (
    select jsonb_build_object(
      'kind', 'plan', 'id', p.id::text,
      'title', p.activity,
      'detail', public._plan_method_label(p.method) || ' for your assessment plan · '
                || (select count(*) from portfolio_assessment_plan_criteria c where c.plan_id = p.id and c.met_at is null)
                || ' of ' || (select count(*) from portfolio_assessment_plan_criteria c where c.plan_id = p.id)
                || ' criteria to go' || coalesce(' · set by ' || p.set_by_name, ''),
      'due', p.due_date,
      'urgency', case when p.due_date < v_today then 'now'
                      when p.due_date <= v_today + 7 then 'soon' else 'later' end,
      'w', 40, 'at', coalesce(p.due_date, p.created_at::date),
      'action', 'Capture', 'href', '/apprentice/hub?plan=' || p.id || '&capture=1') j
      from portfolio_assessment_plans p
     where p.learner_id = u and p.status = 'open'
  ),
  -- 2. Criteria the assessor sent back, one item per unit
  referred as (
    select jsonb_build_object(
      'kind', 'referred', 'id', a.unit_code,
      'title', case when count(*) = 1
                    then 'Add more evidence for ' || a.unit_code || ' AC ' || min(a.ac_code)
                    else 'Add more evidence for ' || count(*) || ' criteria in unit ' || a.unit_code end,
      'detail', coalesce(
                  nullif(left(regexp_replace(coalesce(
                    (array_agg(coalesce(nullif(a.decision_feedback, ''), nullif(a.iqa_feedback, '')) order by a.decided_at desc)
                       filter (where coalesce(nullif(a.decision_feedback, ''), nullif(a.iqa_feedback, '')) is not null))[1], ''),
                    '\s+', ' ', 'g'), 160), ''),
                  'Your assessor needs more before they can pass it')
                || coalesce(' · ' || (array_agg(a.assessor_name order by a.decided_at desc) filter (where a.assessor_name is not null))[1], ''),
      'due', null,
      'urgency', 'now', 'w', 20, 'at', max(a.decided_at)::date,
      'action', 'Add evidence',
      'href', '/apprentice/hub?capture=1&ac='
              || string_agg(public._do_next_enc(a.unit_code) || ':' || public._do_next_enc(a.ac_code), ',' order by a.ac_code)) j
      from ac a
     where a.state in ('referred', 'not_yet', 'iqa_rejected')
     group by a.unit_code
  ),
  -- 3. Off-the-job entries the tutor returned (not app learning: that is their call)
  returned as (
    select jsonb_build_object(
      'kind', 'otj_returned', 'id', o.id::text,
      'title', 'Returned hours: ' || o.title,
      'detail', coalesce(left(regexp_replace(o.verification_rationale, '\s+', ' ', 'g'), 160),
                         'Your tutor needs more detail before signing this off'),
      'due', null, 'urgency', 'now', 'w', 30, 'at', o.activity_date,
      'action', 'Fix', 'href', '/apprentice/ojt-hub#returned') j
      from college_otj_entries o
     where o.student_id = u and o.verification_status = 'rejected'
       and coalesce(o.source_kind, '') <> 'in_app'
       and coalesce(o.updated_at, o.created_at) > now() - interval '60 days'
     order by o.activity_date desc limit 3
  ),
  -- 4. Proposed hours to confirm, one item
  proposals as (
    select jsonb_build_object(
      'kind', 'hours_confirm', 'id', 'proposals',
      'title', 'Confirm ' || count(*) || case when count(*) = 1 then ' day' else ' days' end || ' of off-the-job hours',
      'detail', case when coalesce(sum(p.proposed_minutes), 0) > 0
                     then trim(to_char(sum(p.proposed_minutes) / 60.0, 'FM9990.0')) || 'h from your register and site diary'
                     else 'From your register and site diary' end
                || ' · one tap each, nothing to type',
      'due', null,
      'urgency', case when min(p.activity_date) < v_today - 14 then 'now' else 'soon' end,
      'w', 50, 'at', min(p.activity_date),
      'action', 'Confirm', 'href', '/apprentice/ojt-hub#confirm') j
      from otj_proposals p
     where p.user_id = u and p.status = 'proposed'
    having count(*) > 0
  ),
  -- 5. Quizzes set by the tutor and not finished
  myquiz as (
    select q.*,
           exists (select 1 from tutor_quiz_attempts a where a.quiz_id = q.id and a.student_id = u and a.completed_at is not null) done,
           exists (select 1 from tutor_quiz_attempts a where a.quiz_id = q.id and a.student_id = u and a.completed_at is null) started
      from tutor_quizzes q
     where q.is_published
       and (u = any(coalesce(q.assigned_student_ids, '{}'::uuid[]))
            or (v_cs.cohort_id is not null and q.cohort_id = v_cs.cohort_id))
  ),
  quizzes as (
    select jsonb_build_object(
      'kind', 'quiz', 'id', q.id::text,
      'title', case when q.started then 'Finish ' else 'Take ' end
               || case q.kind when 'assessment' then 'the assessment: ' when 'mock_exam' then 'the mock: ' else 'the quiz: ' end || q.title,
      'detail', case when q.due_date < v_today then 'Was due ' || to_char(q.due_date, 'FMDay FMDD Mon')
                     when q.due_date = v_today then 'Due today'
                     when q.due_date is not null then 'Due ' || to_char(q.due_date, 'FMDay FMDD Mon')
                     else 'No date set' end
                || ' · set by your tutor',
      'due', q.due_date,
      'urgency', case when q.due_date < v_today then 'now'
                      when q.due_date is null or q.due_date <= v_today + 7 then 'soon' else 'later' end,
      'w', 45, 'at', coalesce(q.due_date, q.published_at::date, q.created_at::date),
      'action', case when q.started then 'Finish' else 'Start' end,
      'href', '/apprentice/college/quiz/' || q.id) j
      from myquiz q
     where not q.done
  ),
  marked as (
    select distinct on (n.metadata->>'quiz_id') jsonb_build_object(
      'kind', 'quiz_marked', 'id', n.id::text,
      'title', n.title,
      'detail', left(coalesce(n.message, 'Your tutor marked your answers'), 160),
      'due', null, 'urgency', 'soon', 'w', 75, 'at', n.created_at::date,
      'action', 'See feedback',
      'href', coalesce(n.metadata->>'route', '/apprentice/college/quiz/' || (n.metadata->>'quiz_id'))) j
      from user_notifications n
     where n.user_id = u and n.type = 'quiz_marked' and not coalesce(n.is_read, false)
       and n.created_at > now() - interval '21 days'
     order by n.metadata->>'quiz_id', n.created_at desc
  ),
  -- 6. ILP goals
  goals as (
    select jsonb_build_object(
      'kind', g.k, 'id', g.id::text,
      'title', case g.k when 'goal_blocked' then 'Blocked: ' || g.title
                        when 'goal_overdue' then 'Goal overdue: ' || g.title
                        when 'goal_new' then 'New goal from your tutor: ' || g.title
                        when 'goal_comment' then 'Your tutor commented: ' || g.title
                        else 'Goal due soon: ' || g.title end,
      'detail', case g.k when 'goal_blocked' then 'Tell your tutor what is in the way'
                         when 'goal_comment' then coalesce(left(regexp_replace(g.tutor_comment, '\s+', ' ', 'g'), 140), 'Read it and reply')
                         when 'goal_new' then 'Read it, then say how you will get there'
                         else coalesce('Target ' || to_char(g.target_date, 'FMDD Mon'), 'On your learning plan') end,
      'due', g.target_date,
      'urgency', case when g.k in ('goal_blocked', 'goal_overdue') then 'now' else 'soon' end,
      'w', case g.k when 'goal_blocked' then 35 when 'goal_overdue' then 55 when 'goal_comment' then 62 when 'goal_new' then 70 else 85 end,
      'at', coalesce(g.target_date, g.created_at::date),
      'action', case g.k when 'goal_blocked' then 'Reply' when 'goal_comment' then 'Read' when 'goal_new' then 'Read' else 'Open' end,
      'href', '/apprentice/college/plan?goal=' || g.id) j
      from (
        select gg.*,
               case when lower(coalesce(gg.status, '')) = 'blocked' then 'goal_blocked'
                    when gg.target_date < v_today then 'goal_overdue'
                    when not coalesce(gg.student_acknowledged, false) then 'goal_new'
                    when gg.tutor_comment_at is not null
                         and (gg.student_acknowledged_at is null or gg.student_acknowledged_at < gg.tutor_comment_at)
                         and (gg.student_comment_at is null or gg.student_comment_at < gg.tutor_comment_at) then 'goal_comment'
                    when gg.target_date <= v_today + 7 then 'goal_due'
               end k
          from college_ilp_goals gg
          join college_ilps i on i.id = gg.ilp_id
         where v_cs.id is not null and gg.student_id = v_cs.id
           and lower(coalesce(gg.status, '')) not in ('completed', 'cancelled')
           and coalesce(i.is_current, true)
      ) g
     where g.k is not null
  ),
  -- 7. Unread tutor messages, per thread
  messages as (
    select jsonb_build_object(
      'kind', 'message', 'id', t.id::text,
      'title', case when t.unread_count_student > 1 then t.unread_count_student || ' new messages from your tutor'
                    else 'Your tutor has replied' end,
      'detail', coalesce((select left(regexp_replace(m.body, '\s+', ' ', 'g'), 160) from student_messages m
                           where m.thread_id = t.id and m.sender_kind <> 'student'
                           order by m.created_at desc limit 1), t.subject, 'Open the conversation'),
      'due', null,
      'urgency', case when t.last_message_at < now() - interval '3 days' then 'now' else 'soon' end,
      'w', 60, 'at', coalesce(t.last_message_at, t.created_at)::date,
      'action', 'Reply', 'href', '/apprentice/college/plan?thread=' || t.id) j
      from student_message_threads t
     where v_cs.id is not null and t.student_id = v_cs.id and coalesce(t.unread_count_student, 0) > 0
  ),
  -- 8. Portfolio comments waiting on the learner
  comments as (
    select jsonb_build_object(
      'kind', 'comment', 'id', c.id::text,
      'title', coalesce(nullif(c.author_name, ''), 'Your assessor') || ' needs a reply',
      'detail', left(regexp_replace(c.content, '\s+', ' ', 'g'), 160),
      'due', null,
      'urgency', case when c.created_at < now() - interval '7 days' then 'now' else 'soon' end,
      'w', 65, 'at', c.created_at::date,
      'action', 'Reply',
      'href', case when c.evidence_id is not null then '/apprentice/hub?item=' || c.evidence_id
                   else '/apprentice/college/activity' end) j
      from portfolio_comments c
     where c.action_owner = u and c.requires_action and not coalesce(c.is_resolved, false)
     order by c.created_at desc limit 5
  ),
  -- 9. Progress reviews
  reviews as (
    select jsonb_build_object(
      'kind', case when r.locked_at is not null then 'review_sign' else 'review_input' end, 'id', r.id::text,
      'title', case when r.locked_at is not null then 'Read and sign your progress review'
                    else 'Add your view before your progress review' end,
      'detail', case when r.locked_at is not null
                     then 'Held ' || to_char(coalesce(r.held_on, r.scheduled_at::date), 'FMDD Mon')
                          || coalesce(' with ' || (select st.name from college_staff st where st.id = r.tutor_staff_id), '')
                     else 'Booked for ' || to_char(r.scheduled_at at time zone 'Europe/London', 'FMDay FMDD Mon, HH24:MI')
                          || ' · what has gone well, what is hard' end,
      'due', case when r.locked_at is null then public._lon(r.scheduled_at) end,
      'urgency', case when r.locked_at is not null then 'now' else 'soon' end,
      'w', case when r.locked_at is not null then 10 else 68 end,
      'at', coalesce(r.held_on, public._lon(r.scheduled_at), r.created_at::date),
      'action', case when r.locked_at is not null then 'Sign' else 'Add your view' end,
      'href', '/apprentice/college-plan?review=' || r.id) j
      from college_tripartite_reviews r
     where v_cs.id is not null and r.student_id = v_cs.id and coalesce(r.status, '') <> 'cancelled'
       and (
         (r.locked_at is not null and (r.signatures->>'student_signed_at') is null)
         or (r.locked_at is null and r.learner_input is null and r.scheduled_at is not null
             and r.scheduled_at > now() and r.scheduled_at < now() + interval '14 days')
       )
  ),
  -- 10. Witness requests that stalled or expired
  witness as (
    select jsonb_build_object(
      'kind', 'witness', 'id', w.id::text,
      'title', case when w.expires_at < now() then 'Witness link expired: ask ' || coalesce(nullif(w.witness_name, ''), 'your witness') || ' again'
                    else 'Still waiting on ' || coalesce(nullif(w.witness_name, ''), 'your witness') || ' to sign' end,
      'detail', 'Asked ' || to_char(w.created_at at time zone 'Europe/London', 'FMDD Mon')
                || coalesce(' · ' || nullif(w.witness_email, ''), '')
                || ' · a signed witness statement makes the evidence count',
      'due', null,
      'urgency', case when w.expires_at < now() then 'soon' else 'later' end,
      'w', 80, 'at', w.created_at::date,
      'action', case when w.expires_at < now() then 'Ask again' else 'Remind' end,
      'href', '/apprentice/hub?item=' || w.portfolio_item_id) j
      from portfolio_witness_statements w
     where w.learner_id = u and w.status = 'requested' and w.portfolio_item_id is not null
       and (w.expires_at < now() or w.created_at < now() - interval '5 days')
       and w.created_at > now() - interval '60 days'
     order by w.created_at desc limit 3
  ),
  -- 11. Next class this week
  lesson as (
    select jsonb_build_object(
      'kind', 'lesson', 'id', l.id::text,
      'title', case when l.scheduled_date = v_today then 'Class today: ' else 'Next class: ' end || l.title,
      'detail', concat_ws(' · ',
                  case when l.scheduled_date = v_today then 'Today' else to_char(l.scheduled_date, 'FMDay FMDD Mon') end,
                  to_char(l.scheduled_start_time, 'HH24:MI'), nullif(l.scheduled_room, '')),
      'due', l.scheduled_date,
      'urgency', case when l.scheduled_date = v_today then 'soon' else 'later' end,
      'w', 90, 'at', l.scheduled_date,
      'action', 'See your day', 'href', '/apprentice/college/today') j
      from college_lesson_plans l
     where v_cs.cohort_id is not null and l.cohort_id = v_cs.cohort_id
       and l.scheduled_date between v_today and v_today + 7
       and lower(coalesce(l.status, '')) <> 'draft'
     order by l.scheduled_date, l.scheduled_start_time nulls last limit 1
  ),
  -- 12. Observations and professional discussions to acknowledge (ELE-1873)
  observations as (
    select jsonb_build_object(
      'kind', 'observation', 'id', o.id::text,
      'title', 'Acknowledge ' || coalesce(nullif(split_part(o.assessor_name_snapshot, ' ', 1), ''), 'your assessor')
               || case o.kind when 'professional_discussion' then '''s professional discussion' else '''s observation' end,
      'detail', o.activity_title
                || ' · ' || to_char(o.observed_at, 'FMDD Mon')
                || case when cardinality(o.action_points) > 0
                        then ' · ' || cardinality(o.action_points) || case when cardinality(o.action_points) = 1 then ' action point' else ' action points' end
                        else '' end,
      'due', null,
      'urgency', case when o.sent_at < now() - interval '3 days' then 'now' else 'soon' end,
      'w', 35, 'at', o.sent_at::date,
      'action', 'Read and acknowledge',
      'href', '/apprentice/hub?item=' || o.portfolio_item_id) j
      from college_observations o
     where o.learner_user_id = u and o.sent_at is not null and not o.learner_acknowledged
       and o.portfolio_item_id is not null
     order by o.sent_at desc limit 5
  ),
  allrows as (
    select j from plans union all select j from referred union all select j from returned
    union all select j from proposals union all select j from quizzes union all select j from marked
    union all select j from goals union all select j from messages union all select j from comments
    union all select j from reviews union all select j from witness union all select j from lesson
    union all select j from observations
  )
  select coalesce(jsonb_agg(
           (j - 'w' - 'at') || jsonb_build_object('key', (j->>'kind') || ':' || (j->>'id'))
           order by case j->>'urgency' when 'now' then 0 when 'soon' then 1 else 2 end,
                    (j->>'w')::int,
                    (j->>'at')::date nulls last), '[]'::jsonb)
    into v_items
    from allrows;

  -- The one thing that would help most this week (shown when the list is
  -- empty, and under it otherwise).
  if not v_has_qual then
    v_suggestion := jsonb_build_object(
      'kind', 'choose_course',
      'title', 'Choose the course you are working towards',
      'detail', 'Then every criterion is listed and this page can tell you what to capture next.',
      'action', 'Choose course', 'href', '/apprentice/hub?course=1');
  else
    begin
      v_otj := public._otj_summary_core(u);
    exception when others then
      v_otj := null;
    end;
    if v_otj is not null and v_otj->>'risk' in ('behind', 'slightly_behind')
       and coalesce((v_otj->>'weekly_needed_hours')::numeric, 0) > 0 then
      v_suggestion := jsonb_build_object(
        'kind', 'otj_pace',
        'title', 'Log ' || trim(to_char((v_otj->>'weekly_needed_hours')::numeric, 'FM990.0')) || ' hours of off-the-job training this week',
        'detail', 'You have ' || trim(to_char(coalesce((v_otj->>'counted_hours')::numeric, 0), 'FM99990.0')) || ' of the '
                  || trim(to_char(coalesce((v_otj->>'planned_to_date_hours')::numeric, 0), 'FM99990.0'))
                  || ' hours expected by now. Learning in the app counts too.',
        'action', 'Log hours', 'href', '/apprentice/ojt-hub');
    else
      select x.unit_code, max(x.unit_title) unit_title, count(*) n,
             count(*) filter (where x.state in ('not_started', 'suggested')) todo
        into v_unit
        from jsonb_to_recordset(v_ac) as x(unit_code text, unit_title text, state text)
       group by x.unit_code
      having count(*) filter (where x.state in ('not_started', 'suggested')) > 0
       order by count(*) filter (where x.state in ('passed', 'iqa_confirmed', 'submitted', 'claimed'))::numeric / count(*),
                count(*) filter (where x.state in ('not_started', 'suggested')) desc
       limit 1;
      if v_unit.unit_code is not null then
        v_suggestion := jsonb_build_object(
          'kind', 'coverage_gap',
          'title', 'Capture evidence for unit ' || v_unit.unit_code || coalesce(': ' || v_unit.unit_title, ''),
          'detail', case when v_unit.todo = v_unit.n then 'None of its ' || v_unit.n || ' criteria has evidence yet'
                         else v_unit.todo || ' of its ' || v_unit.n || ' criteria have no evidence yet' end
                    || ', the biggest gap on your course. '
                    || 'One job photo with a short note can cover several.',
          'action', 'Capture', 'href', '/apprentice/hub?capture=1&unit=' || public._do_next_enc(v_unit.unit_code));
      else
        v_suggestion := jsonb_build_object(
          'kind', 'mock',
          'title', 'Do a timed mock',
          'detail', 'Every criterion has evidence. A mock shows you, and your tutor, what to revise before your end-point assessment.',
          'action', 'Start a mock', 'href', case when v_cs.id is not null then '/apprentice/college/epa' else '/apprentice/epa-simulator' end);
      end if;
    end if;
  end if;

  return jsonb_build_object(
    'generated_at', now(),
    'today', v_today,
    'has_college', v_cs.id is not null,
    'has_course', v_has_qual,
    'counts', jsonb_build_object(
      'now', (select count(*) from jsonb_array_elements(v_items) e where e->>'urgency' = 'now'),
      'soon', (select count(*) from jsonb_array_elements(v_items) e where e->>'urgency' = 'soon'),
      'later', (select count(*) from jsonb_array_elements(v_items) e where e->>'urgency' = 'later'),
      'total', jsonb_array_length(v_items)),
    'items', v_items,
    'suggestion', v_suggestion);
end;
$function$;
