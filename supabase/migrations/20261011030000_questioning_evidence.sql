-- Questioning as an evidence type (10 Oct 2026, batch 2 of the C&G 5357 gaps).
--
-- An assessor records oral or written questioning against criteria the same
-- way as an observation or a professional discussion: the questions asked,
-- the apprentice's answers summarised, the outcome, the criteria covered, the
-- date, oral or written, face to face or remote. It is a third `kind` of
-- college_observations, so it rides the existing draft → send flow
-- (save_college_observation), lands in the learner's portfolio as evidence
-- ("Questioning: …", metadata.observation.kind = 'questioning'), is
-- acknowledged by the learner, and passes criteria only through a decision
-- (record_ac_decisions, method 'questioning', already allowed).
--
-- Additive: the kind check is widened, three nullable columns are added, and
-- save_college_observation / get_my_do_next / acknowledge_college_observation
-- learn the new kind. Existing observations hash exactly as before (the
-- questioning keys are only added to the fingerprint for kind = questioning).
begin;
set local lock_timeout = '5s';

alter table public.college_observations drop constraint if exists college_observations_kind_check;
alter table public.college_observations add constraint college_observations_kind_check
  check (kind = any (array['observation'::text, 'professional_discussion'::text, 'questioning'::text]));

alter table public.college_observations
  add column if not exists questions jsonb,
  add column if not exists question_mode text,
  add column if not exists question_delivery text;

alter table public.college_observations drop constraint if exists college_observations_question_mode_check;
alter table public.college_observations add constraint college_observations_question_mode_check
  check (question_mode is null or question_mode in ('oral', 'written'));
alter table public.college_observations drop constraint if exists college_observations_question_delivery_check;
alter table public.college_observations add constraint college_observations_question_delivery_check
  check (question_delivery is null or question_delivery in ('face_to_face', 'remote'));

comment on column public.college_observations.questions is
  'kind = questioning: the questions asked and the apprentice''s answers summarised, [{question, answer}]. Null for other kinds.';
comment on column public.college_observations.question_mode is
  'kind = questioning: oral or written.';
comment on column public.college_observations.question_delivery is
  'kind = questioning: face_to_face or remote.';

-- Copied from the LIVE definition (10 Oct 2026) and extended for questioning.
create or replace function public.save_college_observation(p jsonb, p_send boolean default false)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
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
  v_questions jsonb := null;
  v_qmode text := null;
  v_qdelivery text := null;
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

  if v_kind not in ('observation', 'professional_discussion', 'questioning') then
    raise exception 'unknown kind' using errcode = '22023';
  end if;
  if v_outcome not in ('passed', 'partial', 'referred', 'not_yet') then
    raise exception 'unknown outcome' using errcode = '22023';
  end if;
  if v_title = '' then raise exception 'add what the learner did' using errcode = '22023'; end if;

  -- Questioning: the questions and answers, oral or written, face to face or remote.
  if v_kind = 'questioning' then
    v_qmode := case when p->>'question_mode' in ('oral', 'written') then p->>'question_mode' else 'oral' end;
    v_qdelivery := case when p->>'question_delivery' in ('face_to_face', 'remote')
                        then p->>'question_delivery' else 'face_to_face' end;
    if jsonb_typeof(p->'questions') = 'array' then
      if jsonb_array_length(p->'questions') > 40 then
        raise exception 'too many questions for one record (40 at most)' using errcode = '22023';
      end if;
      select coalesce(jsonb_agg(jsonb_build_object(
               'question', left(trim(q->>'question'), 1000),
               'answer', left(trim(coalesce(q->>'answer', '')), 4000)) order by o), '[]'::jsonb)
        into v_questions
        from jsonb_array_elements(p->'questions') with ordinality as t(q, o)
       where jsonb_typeof(q) = 'object' and coalesce(trim(q->>'question'), '') <> '';
    else
      v_questions := '[]'::jsonb;
    end if;
  end if;

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
      learner_user_id = v_student.user_id,
      questions = v_questions, question_mode = v_qmode, question_delivery = v_qdelivery
    where id = v_id returning * into v_obs;
  else
    insert into public.college_observations (
      college_id, college_student_id, college_staff_id, kind, activity_title, activity_summary, transcript,
      observed_at, observed_time, duration_minutes, location, location_type, criteria, media, outcome,
      acs_evidenced, qualification_code, feedback_strengths, feedback_areas, action_points,
      follow_up_required, follow_up_date, learner_user_id, created_by,
      questions, question_mode, question_delivery)
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
      v_student.user_id, v_uid,
      v_questions, v_qmode, v_qdelivery)
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
  if v_obs.kind = 'questioning' and not exists (
       select 1 from jsonb_array_elements(coalesce(v_obs.questions, '[]'::jsonb)) q
        where coalesce(trim(q->>'answer'), '') <> '') then
    raise exception 'add at least one question and the answer given' using errcode = '22023';
  end if;

  v_observer := coalesce(v_obs.assessor_name_snapshot, v_staff.name,
                         (select full_name from public.profiles where id = v_uid), 'Your assessor');
  v_hash := encode(extensions.digest((jsonb_build_object(
      'id', v_obs.id, 'learner', v_student.id, 'kind', v_obs.kind, 'title', v_obs.activity_title,
      'narrative', coalesce(v_obs.activity_summary, ''), 'transcript', coalesce(v_obs.transcript, ''),
      'observed_at', v_obs.observed_at, 'criteria', v_obs.criteria,
      'media', coalesce((select jsonb_agg(jsonb_build_object('url', m->>'url', 'sha256', m->>'sha256') order by m->>'url')
                           from jsonb_array_elements(v_obs.media) m), '[]'::jsonb),
      'outcome', v_obs.outcome, 'strengths', coalesce(v_obs.feedback_strengths, ''),
      'areas', coalesce(v_obs.feedback_areas, ''), 'actions', to_jsonb(v_obs.action_points),
      'observer', v_uid)
      || case when v_obs.kind = 'questioning'
              then jsonb_build_object('questions', coalesce(v_obs.questions, '[]'::jsonb),
                                      'question_mode', v_obs.question_mode,
                                      'question_delivery', v_obs.question_delivery)
              else '{}'::jsonb end)::text, 'sha256'), 'hex');

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
      case v_obs.kind when 'professional_discussion' then 'Professional discussion: '
                      when 'questioning' then 'Questioning: '
                      else 'Observed: ' end
        || v_obs.activity_title,
      coalesce(v_obs.activity_summary, ''),
      case v_obs.kind when 'professional_discussion' then 'professional_discussion'
                      when 'questioning' then 'questioning'
                      else 'observation' end,
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
          'follow_up_date', v_obs.follow_up_date, 'content_hash', v_hash)
          || case when v_obs.kind = 'questioning'
                  then jsonb_build_object('questions', coalesce(v_obs.questions, '[]'::jsonb),
                                          'question_mode', v_obs.question_mode,
                                          'question_delivery', v_obs.question_delivery)
                  else '{}'::jsonb end),
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
      split_part(v_observer, ' ', 1) || case v_obs.kind
        when 'professional_discussion' then ' recorded your professional discussion'
        when 'questioning' then ' recorded your answers to their questions'
        else ' recorded an observation of your work' end,
      v_obs.activity_title || '. Read it and acknowledge it.',
      jsonb_build_object('route', '/apprentice/hub?item=' || v_item, 'ref_id', v_obs.id::text,
                         'observation_id', v_obs.id, 'portfolio_item_id', v_item));
  end if;

  return jsonb_build_object('id', v_obs.id, 'sent', true, 'portfolio_item_id', v_item,
                            'learner_joined', v_student.user_id is not null, 'content_hash', v_hash,
                            'learner_user_id', v_student.user_id,
                            'criteria', jsonb_array_length(v_obs.criteria));
end; $function$;

-- Wording in the two other places that name the kind. Patched in place on the
-- live text, so whatever else those functions do is left exactly as it is.
create or replace function pg_temp._patch_fn(p_sig text, p_old text, p_new text)
returns void language plpgsql as $$
declare v text;
begin
  v := pg_get_functiondef(p_sig::regprocedure);
  if position(p_new in v) > 0 then return; end if;  -- already patched
  if position(p_old in v) = 0 then
    raise exception 'patch target not found in %', p_sig;
  end if;
  execute replace(v, p_old, p_new);
end $$;

select pg_temp._patch_fn('public.get_my_do_next()',
  $o$case o.kind when 'professional_discussion' then '''s professional discussion'$o$,
  $n$case o.kind when 'questioning' then '''s questioning record' when 'professional_discussion' then '''s professional discussion'$n$);

select pg_temp._patch_fn('public.acknowledge_college_observation(uuid, text)',
  $o$v_name || ' acknowledged your ' || case o.kind when 'professional_discussion'$o$,
  $n$v_name || ' acknowledged your ' || case o.kind when 'questioning' then 'questioning record' when 'professional_discussion'$n$);

comment on table public.college_observations is
  '[COLLEGE ASSESSMENT — OBSERVATION / PROFESSIONAL DISCUSSION / QUESTIONING] A tutor or assessor''s record of watching a learner work, of a professional discussion with them, or of questioning them (kind = questioning: questions + answers summarised in `questions`, oral/written in question_mode, face to face/remote in question_delivery). Scope: one row per record, per college; drafts live here only. Used by: RecordObservationSheet (phone-first, College Hub Act button and Student 360), SectionObservations, the learner''s evidence detail (acknowledge), get_my_do_next, portfolio-export-pack. Rule: sending goes through save_college_observation, which makes ONE portfolio_items row owned by the learner with the criteria as assessor-tagged portfolio_item_criteria; a criterion is passed only by record_ac_decisions. A sent record is never edited or deleted, only acknowledged.';

commit;
