-- ELE-1913 (3/4): state changes in the College Hub <-> apprentice loop that
-- told nobody, and one that told the tutor too often.
--
--   * witness statement signed      -> learner + their tutors/assessors
--   * evidence / gateway pack ready -> whoever asked for it
--   * ILP target added              -> learner (first of a burst only; goals
--                                      carried into a new ILP version are not new)
--   * ILP comment, tutor -> learner and learner -> tutor
--   * risk rises to critical        -> the learner's tutors/assessors
--   * "Bulk jobs" message to a cohort: was written to push_notification_log by
--     the browser, so it never pushed and never reached the header bell. Now an
--     RPC that checks the sender is staff at each learner's college.
--   * hours logged: the per-entry "tap to verify" push to the tutor
--     (trg_notify_tutor_otj -> notify-tutor-otj) is retired; the 08:00
--     tutor-daily-digest already counts hours waiting, and the inbox lists them.

-- Witness signed ----------------------------------------------------------------
create or replace function public.tg_notify_witness_signed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_cs record;
  v_uid uuid;
  v_who text := coalesce(nullif(trim(new.witness_name), ''), 'Your witness');
begin
  if lower(coalesce(new.status, '')) <> 'signed'
     or lower(coalesce(old.status, '')) = 'signed' then
    return new;
  end if;

  perform public.notify_user(new.learner_id, 'witness_signed',
    v_who || ' signed your witness statement',
    'It is now attached to your evidence for your assessor to see.',
    jsonb_build_object('route', '/apprentice/hub?item=' || new.portfolio_item_id,
                       'ref_id', new.id::text, 'statement_id', new.id,
                       'portfolio_item_id', new.portfolio_item_id));

  select cs.id, cs.name into v_cs
  from college_students cs where cs.user_id = new.learner_id
  order by cs.created_at desc limit 1;
  if v_cs.id is not null then
    for v_uid in select public._learner_tutor_uids(new.learner_id) loop
      perform public.notify_user(v_uid, 'witness_signed_staff',
        'Witness statement signed for ' || coalesce(split_part(v_cs.name, ' ', 1), 'a learner'),
        v_who || coalesce(' (' || nullif(trim(new.witness_role), '') || ')', '')
          || ' signed. The evidence is ready to assess.',
        jsonb_build_object('route', '/college?section=student360&studentId=' || v_cs.id || '#portfolio',
                           'ref_id', new.id::text, 'statement_id', new.id));
    end loop;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_witness_signed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

drop trigger if exists trg_notify_witness_signed on public.portfolio_witness_statements;
create trigger trg_notify_witness_signed
  after update of status on public.portfolio_witness_statements
  for each row execute function public.tg_notify_witness_signed();

-- Pack ready ----------------------------------------------------------------------
create or replace function public.tg_notify_export_ready()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_learner_name text;
  v_kind text := case new.kind when 'gateway_pack' then 'gateway pack' else 'evidence pack' end;
begin
  if new.status <> 'ready' or old.status = 'ready' or new.requested_by is null then
    return new;
  end if;
  if new.requested_by = new.learner_id then
    perform public.notify_user(new.requested_by, 'export_ready',
      'Your ' || v_kind || ' is ready',
      'Open it to download the PDF and the files.',
      jsonb_build_object('route', '/apprentice/hub?export=1', 'ref_id', new.id::text, 'export_id', new.id));
  else
    select name into v_learner_name from college_students where id = new.college_student_id;
    perform public.notify_user(new.requested_by, 'export_ready',
      initcap(v_kind) || ' ready' || coalesce(' for ' || v_learner_name, ''),
      'Open the learner''s portfolio to download it.',
      jsonb_build_object('route',
        case when new.college_student_id is not null
             then '/college?section=student360&studentId=' || new.college_student_id || '#portfolio'
             else '/college' end,
        'ref_id', new.id::text, 'export_id', new.id));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_export_ready] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

drop trigger if exists trg_notify_export_ready on public.portfolio_exports;
create trigger trg_notify_export_ready
  after update of status on public.portfolio_exports
  for each row execute function public.tg_notify_export_ready();

-- ILP targets and comments -------------------------------------------------------
create or replace function public.tg_notify_ilp_goal()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_learner uuid;
  v_name text;
  v_uid uuid;
begin
  select user_id, split_part(name, ' ', 1) into v_learner, v_name
  from college_students where id = new.student_id;
  if v_learner is null then return new; end if;

  if tg_op = 'INSERT' then
    -- Not new: a goal carried into a fresh ILP version, or one the learner wrote.
    if new.created_by = v_learner
       or exists (select 1 from college_ilp_goals g
                  where g.student_id = new.student_id and g.ilp_id <> new.ilp_id
                    and g.title = new.title) then
      return new;
    end if;
    -- A plan written in one go is one notification, not one per target.
    if exists (select 1 from user_notifications un
               where un.user_id = v_learner and un.type = 'ilp_goal_set'
                 and un.metadata->>'ilp_id' = new.ilp_id::text
                 and un.created_at > now() - interval '10 minutes') then
      return new;
    end if;
    perform public.notify_user(v_learner, 'ilp_goal_set',
      'New target on your learning plan', left(new.title, 160),
      jsonb_build_object('route', '/apprentice/college/plan?goal=' || new.id,
                         'ref_id', new.ilp_id::text, 'ilp_id', new.ilp_id, 'goal_id', new.id));
    return new;
  end if;

  -- Tutor commented -> learner.
  if nullif(trim(new.tutor_comment), '') is not null
     and new.tutor_comment is distinct from old.tutor_comment then
    perform public.notify_user(v_learner, 'ilp_goal_comment',
      'Your tutor commented on a target',
      left(new.title, 60) || ': ' || left(new.tutor_comment, 140),
      jsonb_build_object('route', '/apprentice/college/plan?goal=' || new.id,
                         'ref_id', new.id::text || ':' || md5(new.tutor_comment), 'goal_id', new.id));
  end if;

  -- Learner replied -> their tutors.
  if nullif(trim(new.student_comment), '') is not null
     and new.student_comment is distinct from old.student_comment then
    for v_uid in select public._learner_tutor_uids(v_learner) loop
      perform public.notify_user(v_uid, 'ilp_goal_reply',
        coalesce(nullif(v_name, ''), 'A learner') || ' replied on a target',
        left(new.title, 60) || ': ' || left(new.student_comment, 140),
        jsonb_build_object('route', '/college?section=student360&studentId=' || new.student_id || '#ilp',
                           'ref_id', new.id::text || ':' || md5(new.student_comment), 'goal_id', new.id));
    end loop;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_ilp_goal] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

drop trigger if exists trg_notify_ilp_goal on public.college_ilp_goals;
create trigger trg_notify_ilp_goal
  after insert or update of tutor_comment, student_comment on public.college_ilp_goals
  for each row execute function public.tg_notify_ilp_goal();

-- Risk rises to critical -----------------------------------------------------------
create or replace function public.tg_notify_risk_critical()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_prev text;
  v_learner uuid;
  v_name text;
  v_uid uuid;
begin
  if new.is_current is not true or lower(coalesce(new.level, '')) <> 'critical' then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    v_prev := old.level;
    if lower(coalesce(old.level, '')) = 'critical' and old.is_current then return new; end if;
  else
    select level into v_prev from student_risk_scores
    where student_id = new.student_id and id <> new.id and computed_at <= new.computed_at
    order by computed_at desc limit 1;
  end if;
  if lower(coalesce(v_prev, '')) = 'critical' then return new; end if;

  select user_id, split_part(name, ' ', 1) into v_learner, v_name
  from college_students where id = new.student_id;
  if v_learner is null then return new; end if;

  for v_uid in select public._learner_tutor_uids(v_learner) loop
    perform public.notify_user(v_uid, 'risk_critical',
      coalesce(nullif(v_name, ''), 'A learner') || ' is now at critical risk',
      'Their risk rose to critical. Open their record to see why and what to do next.',
      jsonb_build_object('route', '/college?section=student360&studentId=' || new.student_id || '#risk',
                         'ref_id', new.student_id::text, 'risk_score_id', new.id));
  end loop;
  return new;
exception when others then
  raise warning '[tg_notify_risk_critical] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

drop trigger if exists trg_notify_risk_critical on public.student_risk_scores;
create trigger trg_notify_risk_critical
  after insert or update of level, is_current on public.student_risk_scores
  for each row execute function public.tg_notify_risk_critical();

revoke all on function public.tg_notify_witness_signed() from public, anon, authenticated;
revoke all on function public.tg_notify_export_ready() from public, anon, authenticated;
revoke all on function public.tg_notify_ilp_goal() from public, anon, authenticated;
revoke all on function public.tg_notify_risk_critical() from public, anon, authenticated;

-- Message a cohort ("Bulk jobs") ------------------------------------------------------
create or replace function public.send_college_announcement(p_student_ids uuid[], p_message text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_msg text := left(trim(coalesce(p_message, '')), 500);
  v_from text;
  r record;
  v_sent int := 0;
  v_no_account int := 0;
  v_denied int := 0;
begin
  if auth.uid() is null then
    raise exception 'sign in first' using errcode = '42501';
  end if;
  if v_msg = '' then
    raise exception 'write a message first' using errcode = '22023';
  end if;
  if coalesce(cardinality(p_student_ids), 0) = 0 or cardinality(p_student_ids) > 500 then
    raise exception 'choose between 1 and 500 learners' using errcode = '22023';
  end if;

  select coalesce(nullif(split_part(full_name, ' ', 1), ''), 'Your college') into v_from
  from profiles where id = auth.uid();

  for r in
    select cs.id, cs.user_id, cs.college_id
    from college_students cs where cs.id = any(p_student_ids)
  loop
    if not public._review_staff_can(r.college_id) then
      v_denied := v_denied + 1;
      continue;
    end if;
    if r.user_id is null then
      v_no_account := v_no_account + 1;
      continue;
    end if;
    perform public.notify_user(r.user_id, 'college_message',
      'Message from ' || coalesce(v_from, 'your college'), v_msg,
      jsonb_build_object('route', '/apprentice/college/plan', 'from_staff', auth.uid()));
    v_sent := v_sent + 1;
  end loop;

  if v_sent = 0 and v_denied > 0 then
    raise exception 'you can only message learners at your college' using errcode = '42501';
  end if;
  return jsonb_build_object('sent', v_sent, 'no_account', v_no_account, 'denied', v_denied);
end;
$function$;

revoke all on function public.send_college_announcement(uuid[], text) from public, anon;
grant execute on function public.send_college_announcement(uuid[], text) to authenticated;

-- Hours logged: digest, not a push per entry ---------------------------------------------
drop trigger if exists trg_notify_tutor_otj on public.college_otj_entries;
