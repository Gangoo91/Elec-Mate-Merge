-- College Hub + apprentice notifications: exact-item links and capitals.
--
-- 1. Every college/apprentice notification title and message starts with a
--    capital: _notif_cap() in notify_user (bell row AND push text) and a
--    BEFORE INSERT trigger on user_notifications for the RPCs that insert
--    the bell row directly.
-- 2. Links land on the exact item, never a list (functions below are the live
--    definitions with only the link changed):
--      assessment_decision   /apprentice/college/progress?ac=U:A,...   (criteria ringed)
--      assessor_accepted     /apprentice/college/progress?assessor=<link>
--      grade_recorded        /apprentice/college/progress?grade=<id>
--      share_comment         /apprentice/hub?item=<evidence>
--      share_review          /apprentice/hub?item=<evidence>
--      portfolio_reviewed    /apprentice/hub?item=<first item in the submission>
--      otj_app_approved/left_out  /apprentice/ojt-hub?entry=<otj entry>
--      otj_statement         /apprentice/ojt-hub?statement=<id>
--      otj_attested/sent_back (worker bell) /apprentice/ojt-hub?entry=<id>
--      ilp_goal_reply        student360 &focus=<goal>#ilp
--      pastoral_flag         student360 &focus=<note>#notes
--      diary_question        student360 &focus=<diary entry>#diary
--      witness_signed_staff  student360 &focus=<evidence>#assess (criteria ticked)
--      assessment_plan_done  student360 &focus=<plan>#plan
--      gateway_declaration   student360 #export-gateway (the gateway pack sheet)

create or replace function public._notif_cap(p text)
returns text language sql immutable set search_path = '' as $$
  -- Capital on the first letter, after any leading quote or bracket.
  select case when p is null or p = '' then p else
    coalesce(substring(p from '^[^[:alnum:]]*'), '')
    || upper(substr(p, length(coalesce(substring(p from '^[^[:alnum:]]*'), '')) + 1, 1))
    || substr(p, length(coalesce(substring(p from '^[^[:alnum:]]*'), '')) + 2)
  end
$$;

create or replace function public._notif_is_college(p_type text)
returns boolean language sql stable security definer set search_path = 'public' as $$
  select p_type in ('tutor_message', 'college_message', 'learner_message', 'tutor_daily_digest', 'export_ready')
      or exists (select 1 from public.notification_types t
                  where t.type = p_type and (t.category = 'apprentice' or t.category like 'college\_%'));
$$;
revoke all on function public._notif_is_college(text) from public, anon;

create or replace function public.tg_user_notification_capitalise()
returns trigger language plpgsql security definer set search_path = 'public' as $$
begin
  if public._notif_is_college(new.type) then
    new.title := public._notif_cap(new.title);
    new.message := public._notif_cap(new.message);
  end if;
  return new;
end; $$;
revoke all on function public.tg_user_notification_capitalise() from public, anon;

drop trigger if exists trg_user_notification_capitalise on public.user_notifications;
create trigger trg_user_notification_capitalise
  before insert on public.user_notifications
  for each row execute function public.tg_user_notification_capitalise();

CREATE OR REPLACE FUNCTION public.notify_user(p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb DEFAULT '{}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
declare
  v_id uuid; v_data jsonb := coalesce(p_data, '{}'::jsonb);
  v_cat text; v_push boolean; v_importance smallint;
  v_route text := v_data->>'route'; v_meta jsonb;
begin
  if p_user_id is null then return null; end if;
  if public._notif_is_college(p_type) then
    p_title := public._notif_cap(p_title);
    p_message := public._notif_cap(p_message);
  end if;

  select category, push, importance into v_cat, v_push, v_importance
  from public.notification_types where type = p_type;
  if not found then
    v_push := false; v_importance := 1;
  end if;

  -- metadata.category marks the row as written here, so the user_notifications
  -- push trigger leaves it alone.
  v_meta := v_data || jsonb_build_object('category', v_cat, 'importance', coalesce(v_importance,1));
  insert into public.user_notifications (user_id, type, title, message, link, metadata)
  values (p_user_id, p_type, p_title, p_message, v_route, v_meta)
  returning id into v_id;

  if v_push is true then
    perform public._notify_push(p_user_id, p_type, p_title, p_message, v_data, v_cat, v_importance);
  end if;
  return v_id;
exception when others then
  raise warning '[notify_user] failed for % / %: %', p_user_id, p_type, sqlerrm;
  return v_id;
end;
$function$;

CREATE OR REPLACE FUNCTION public.add_share_comment(p_share_token text, p_author_name text, p_author_role text, p_content text, p_evidence_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_share record;
  v_comment_id uuid;
begin
  if coalesce(trim(p_author_name), '') = '' or coalesce(trim(p_content), '') = '' then
    return jsonb_build_object('error', 'Add your name and a comment');
  end if;
  select * into v_share from portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if v_share is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  if public._share_comment_flood(v_share.user_id) then
    return jsonb_build_object('error', 'Too many comments in a short time. Try again in a few minutes.');
  end if;
  if not exists (select 1 from portfolio_items where id = p_evidence_id and user_id = v_share.user_id) then
    return jsonb_build_object('error', 'Evidence not found');
  end if;
  if public._share_scope(v_share.entry_ids, v_share.portfolio_item_id) is not null
     and not (p_evidence_id = any(public._share_scope(v_share.entry_ids, v_share.portfolio_item_id))) then
    return jsonb_build_object('error', 'Evidence not found');
  end if;

  insert into portfolio_comments (user_id, evidence_id, context_type, author_name, author_role, author_initials, content)
  values (v_share.user_id, p_evidence_id, 'share_feedback', left(trim(p_author_name), 80),
          left(coalesce(p_author_role, 'reviewer'), 40), upper(left(trim(p_author_name), 2)), left(trim(p_content), 4000))
  returning id into v_comment_id;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (v_share.user_id, 'share_comment', 'New comment on your shared portfolio',
            left(trim(p_author_name), 80) || ': ' || left(trim(p_content), 140),
            '/apprentice/hub?item=' || p_evidence_id, jsonb_build_object('comment_id', v_comment_id, 'evidence_id', p_evidence_id));
  exception when others then null;
  end;
  return jsonb_build_object('success', true, 'comment_id', v_comment_id);
end; $function$;

CREATE OR REPLACE FUNCTION public.review_shared_submission(p_share_token text, p_submission_id uuid, p_reviewer_name text, p_reviewer_role text, p_action text, p_feedback text DEFAULT NULL::text, p_grade text DEFAULT NULL::text, p_action_required text DEFAULT NULL::text, p_strengths text DEFAULT NULL::text, p_areas_for_improvement text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_share record;
  v_submission record;
  v_scope uuid[];
  v_item uuid;
  v_text text;
begin
  if coalesce(trim(p_reviewer_name), '') = '' then
    return jsonb_build_object('error', 'Add your name');
  end if;
  select * into v_share from portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if v_share is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  if public._share_comment_flood(v_share.user_id) then
    return jsonb_build_object('error', 'Too many comments in a short time. Try again in a few minutes.');
  end if;
  select * into v_submission from portfolio_submissions
   where id = p_submission_id and user_id = v_share.user_id;
  if v_submission is null then
    return jsonb_build_object('error', 'Submission not found');
  end if;
  if p_action = 'approve' then
    return jsonb_build_object('error', 'assessor_account_required',
      'message', 'Only an assessor can approve. Ask the apprentice to invite you as their assessor from Elec-Mate.');
  end if;
  if p_action not in ('send_back', 'request_more_evidence', 'feedback') then
    return jsonb_build_object('error', 'Invalid action');
  end if;

  v_text := concat_ws(E'\n',
    nullif(trim(coalesce(p_feedback, '')), ''),
    case when nullif(trim(coalesce(p_action_required, '')), '') is not null then 'Action needed: ' || trim(p_action_required) end,
    case when nullif(trim(coalesce(p_strengths, '')), '') is not null then 'Strengths: ' || trim(p_strengths) end,
    case when nullif(trim(coalesce(p_areas_for_improvement, '')), '') is not null then 'To improve: ' || trim(p_areas_for_improvement) end);
  if coalesce(v_text, '') = '' then
    return jsonb_build_object('error', 'Add your feedback');
  end if;

  v_scope := public._share_scope(v_share.entry_ids, v_share.portfolio_item_id);
  select si.portfolio_item_id into v_item
    from portfolio_submission_items si
   where si.submission_id = p_submission_id
     and (v_scope is null or si.portfolio_item_id = any(v_scope))
   limit 1;
  if v_item is null then
    select id into v_item from portfolio_items
     where user_id = v_share.user_id and (v_scope is null or id = any(v_scope))
     order by created_at desc limit 1;
  end if;

  insert into portfolio_comments (user_id, evidence_id, context_type, author_name, author_role, author_initials, content)
  values (v_share.user_id, v_item, 'share_review', left(trim(p_reviewer_name), 80),
          left(coalesce(p_reviewer_role, 'reviewer'), 40), upper(left(trim(p_reviewer_name), 2)),
          '[Review via shared link, advisory] ' || left(v_text, 4000));

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (v_share.user_id, 'share_review', left(trim(p_reviewer_name), 80) || ' reviewed your shared portfolio',
            left(v_text, 160), coalesce('/apprentice/hub?item=' || v_item, '/apprentice/hub'), jsonb_build_object('submission_id', p_submission_id, 'evidence_id', v_item));
  exception when others then null;
  end;

  return jsonb_build_object('success', true, 'advisory', true, 'reviewer', p_reviewer_name);
end; $function$;

CREATE OR REPLACE FUNCTION public.accept_assessor_invite(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare l public.portfolio_assessor_links%rowtype; v_name text; v_me text; v_my_name text;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'sign_in_required'); end if;
  select * into l from public.portfolio_assessor_links where token = p_token for update;
  if l.id is null then return jsonb_build_object('error', 'invite_not_found'); end if;
  if l.status = 'revoked' then return jsonb_build_object('error', 'invite_revoked'); end if;
  if l.learner_id = auth.uid() then return jsonb_build_object('error', 'cannot_assess_self'); end if;
  if l.status = 'active' then
    if l.assessor_user_id = auth.uid() then
      return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'already', true);
    end if;
    return jsonb_build_object('error', 'invite_already_used');
  end if;
  if l.expires_at < now() then return jsonb_build_object('error', 'invite_expired'); end if;
  select lower(email) into v_me from auth.users where id = auth.uid();
  if v_me is distinct from lower(trim(l.assessor_email)) then
    return jsonb_build_object('error', 'wrong_account', 'invited_email', l.assessor_email);
  end if;
  update public.portfolio_assessor_links
     set status = 'active', assessor_user_id = auth.uid(), accepted_at = now()
   where id = l.id;
  select coalesce(full_name, 'Apprentice') into v_name from public.profiles where id = l.learner_id;
  select coalesce(full_name, l.assessor_name, l.assessor_email) into v_my_name from public.profiles where id = auth.uid();
  begin
    insert into public.user_notifications (user_id, type, title, message, link, metadata)
    values (l.learner_id, 'assessor_accepted', coalesce(v_my_name, 'Your assessor') || ' accepted your invite',
            'They can now see your evidence and record decisions. You can remove them at any time.',
            '/apprentice/college/progress?assessor=' || l.id, jsonb_build_object('link_id', l.id));
  exception when others then null;
  end;
  return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'learner_name', v_name, 'role', l.role);
end; $function$;

CREATE OR REPLACE FUNCTION public.approve_app_learning(p_users uuid[], p_through date DEFAULT NULL::date, p_time_entry_ids uuid[] DEFAULT NULL::uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_staff uuid := auth.uid();
  v_staff_name text;
  v_through date := coalesce(p_through, (now() at time zone 'Europe/London')::date);
  u uuid;
  cs record;
  wk record;
  v_entry uuid;
  v_desc text;
  v_rows int := 0;
  v_ids uuid[] := '{}';
  v_minutes int := 0;
  v_learner_minutes int;
  v_learners int := 0;
  v_skipped int := 0;
  v_learner_first uuid;
begin
  if v_staff is null then raise exception 'not authorised' using errcode = '42501'; end if;
  if coalesce(array_length(p_users, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick at least one learner.');
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_staff_name from profiles where id = v_staff;

  foreach u in array p_users loop
    if not public._otj_staff_can_act(u) then
      v_skipped := v_skipped + 1;
      continue;
    end if;
    select s.id, s.college_id into cs
      from college_students s
     where s.user_id = u and s.college_id is not null
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
     order by s.created_at desc limit 1;
    if cs.id is null then v_skipped := v_skipped + 1; continue; end if;

    perform 1 from time_entries t
     where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes)
       and (p_time_entry_ids is null or t.id = any(p_time_entry_ids))
     for update;

    v_learner_minutes := 0;
    v_learner_first := null;
    for wk in
      with picked as (
        select t.id, t.date, t.duration
          from time_entries t
         where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
           and t.date <= v_through
           and (p_time_entry_ids is null or t.id = any(p_time_entry_ids))
           and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
      ), weeks as (
        select date_trunc('week', date)::date as wk, sum(duration) as total from picked group by 1
      )
      select case when w.total > 1440 then p.date else w.wk end as bucket,
             max(p.date) as last_day, sum(p.duration)::int as minutes, array_agg(p.id) as ids
        from picked p join weeks w on w.wk = date_trunc('week', p.date)::date
       group by 1 order by 1
    loop
      select string_agg(to_char(d.date, 'Dy DD Mon') || ' · ' || d.area || ' · ' || d.m || ' min', E'\n' order by d.date, d.m desc)
        into v_desc
        from (select t.date, public._otj_area(t.activity) as area, sum(t.duration)::int as m
                from time_entries t where t.id = any(wk.ids) group by 1, 2) d;

      insert into college_otj_entries (
        college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
        activity_type, title, description, source, source_kind, verification_status,
        verified_by, verified_at, verification_rationale)
      values (
        cs.college_id, u, v_staff, 'Recorded by Elec-Mate', wk.last_day, least(wk.minutes, 1440),
        'theory', 'Learning in Elec-Mate · week of ' || to_char(date_trunc('week', wk.last_day), 'DD Mon'),
        left(v_desc, 4000), 'college', 'in_app', 'verified',
        v_staff, now(), 'App learning approved by ' || v_staff_name)
      returning id into v_entry;
    v_ids := v_ids || v_entry;
    v_learner_first := coalesce(v_learner_first, v_entry);

      insert into otj_capture_links (time_entry_id, otj_entry_id, user_id)
      select unnest(wk.ids), v_entry, u;

      v_rows := v_rows + 1;
      v_learner_minutes := v_learner_minutes + least(wk.minutes, 1440);
    end loop;

    if v_learner_minutes > 0 then
      begin
        insert into user_notifications (user_id, type, title, message, link, metadata)
        values (u, 'otj_app_approved',
                v_staff_name || ' approved ' || round(v_learner_minutes / 60.0, 1) || 'h of your learning',
                'Your time learning in Elec-Mate is now verified towards your off-the-job hours.',
                coalesce('/apprentice/ojt-hub?entry=' || v_learner_first, '/apprentice/ojt-hub'),
                jsonb_build_object('minutes', v_learner_minutes, 'otj_entry_id', v_learner_first));
      exception when others then null;
      end;
    end if;
    v_minutes := v_minutes + v_learner_minutes;
    v_learners := v_learners + 1;
  end loop;

  return jsonb_build_object('success', true, 'entry_ids', v_ids, 'learners', v_learners, 'entries', v_rows,
                            'hours', round(v_minutes / 60.0, 1), 'skipped', v_skipped);
end; $function$;

CREATE OR REPLACE FUNCTION public.leave_out_app_learning(p_user uuid, p_time_entry_ids uuid[], p_reason text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  cs record;
  v_name text;
  d record;
  v_entry uuid;
  v_rows int := 0;
  v_ids uuid[] := '{}';
  v_minutes int := 0;
begin
  if not public._otj_staff_can_act(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if coalesce(array_length(p_time_entry_ids, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick the time to leave out.');
  end if;
  if length(trim(coalesce(p_reason, ''))) < 5 then
    return jsonb_build_object('error', 'Say why it does not count, so the learner knows.');
  end if;
  select s.id, s.college_id into cs from college_students s
   where s.user_id = p_user and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  for d in
    select t.date as day, sum(t.duration)::int as minutes, array_agg(t.id) as ids
      from time_entries t
     where t.id = any(p_time_entry_ids) and t.user_id = p_user
       and public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
       and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
     group by t.date
  loop
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, source, source_kind, verification_status,
      verified_by, verified_at, verification_rationale)
    values (
      cs.college_id, p_user, auth.uid(), 'Recorded by Elec-Mate', d.day, least(d.minutes, 1440),
      'theory', 'Learning in Elec-Mate · not counted',
      'App learning on ' || to_char(d.day, 'Dy DD Mon') || ' left out by ' || v_name,
      'college', 'in_app', 'rejected', auth.uid(), now(),
      'Left out by ' || v_name || ': ' || left(trim(p_reason), 500))
    returning id into v_entry;
    v_ids := v_ids || v_entry;
    insert into otj_capture_links (time_entry_id, otj_entry_id, user_id)
    select unnest(d.ids), v_entry, p_user;
    v_rows := v_rows + 1;
    v_minutes := v_minutes + d.minutes;
  end loop;

  if v_minutes > 0 then
    begin
      insert into user_notifications (user_id, type, title, message, link, metadata)
      values (p_user, 'otj_app_left_out',
              v_name || ' left out ' || round(v_minutes / 60.0, 1) || 'h of app learning',
              left(trim(p_reason), 200), coalesce('/apprentice/ojt-hub?entry=' || v_ids[1], '/apprentice/ojt-hub'),
              jsonb_build_object('minutes', v_minutes, 'otj_entry_id', v_ids[1]));
    exception when others then null;
    end;
  end if;

  return jsonb_build_object('success', true, 'entry_ids', v_ids, 'days', v_rows, 'hours', round(v_minutes / 60.0, 1));
end; $function$;

CREATE OR REPLACE FUNCTION public.prepare_otj_hours_statement(p_user uuid, p_planned_hours numeric, p_reason text, p_rpl_hours numeric DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s jsonb;
  cs record;
  v_name text;
  v_min numeric;
  v_actual numeric;
  v_row public.otj_hours_statements;
begin
  if auth.uid() is null or not public._otj_staff_can_act(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if coalesce(p_planned_hours, 0) <= 0 then
    return jsonb_build_object('error', 'Enter the planned hours agreed with the employer.');
  end if;
  if length(trim(coalesce(p_reason, ''))) < 10 then
    return jsonb_build_object('error', 'Give the reason fewer hours were delivered than planned.');
  end if;
  s := public.get_otj_summary(p_user);
  v_actual := (s->>'counted_hours')::numeric;
  v_min := nullif((s->>'required_hours')::numeric, 0);
  if v_min is not null then
    v_min := greatest(187, v_min - coalesce(p_rpl_hours, 0));
  end if;
  select id, college_id into cs from college_students where id = (s->>'college_student_id')::uuid;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  update otj_hours_statements set superseded_at = now()
   where user_id = p_user and superseded_at is null;

  insert into otj_hours_statements (
    user_id, college_student_id, college_id, planned_hours, minimum_hours, rpl_hours,
    actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by, prepared_by_name)
  values (
    p_user, cs.id, cs.college_id, round(p_planned_hours, 1), v_min, coalesce(p_rpl_hours, 0),
    v_actual, (s->>'verified_hours')::numeric, (s->>'app_learning_hours')::numeric,
    v_min is not null and v_actual >= v_min, trim(p_reason), auth.uid(), v_name)
  returning * into v_row;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (p_user, 'otj_statement', 'Sign your off-the-job hours statement',
            'Your tutor has prepared a statement of your planned and actual off-the-job hours. Read it and sign.',
            '/apprentice/ojt-hub?statement=' || v_row.id, jsonb_build_object('statement_id', v_row.id));
  exception when others then null;
  end;

  return jsonb_build_object('success', true, 'id', v_row.id, 'employer_token', v_row.employer_token,
                            'minimum_met', v_row.minimum_met);
end; $function$;

CREATE OR REPLACE FUNCTION public.record_ac_decisions(p_learner_id uuid, p_criteria jsonb, p_decision text, p_feedback text DEFAULT NULL::text, p_evidence_item_ids uuid[] DEFAULT '{}'::uuid[], p_submission_id uuid DEFAULT NULL::uuid, p_method text DEFAULT 'evidence_review'::text, p_feedback_source text DEFAULT 'assessor'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_code text;
  c jsonb;
  n int := 0;
  v_list text := '';
  v_name text;
  v_acs text := '';
  v_link text;
begin
  if not public._can_assess(p_learner_id) or p_learner_id = auth.uid() then
    raise exception 'you are not an assessor for this learner' using errcode = '42501';
  end if;
  select requirement_code into v_code from public._resolve_qualification(p_learner_id, null);
  if v_code is null then
    raise exception 'this learner has no qualification set' using errcode = 'P0001';
  end if;
  for c in select * from jsonb_array_elements(p_criteria) loop
    insert into public.portfolio_assessment_decisions
      (learner_id, qualification_code, unit_code, ac_code, decision, feedback, feedback_source,
       evidence_item_ids, submission_id, method, assessor_id)
    values (p_learner_id, v_code, c->>'unit_code', c->>'ac_code', p_decision, p_feedback,
            coalesce(p_feedback_source, 'assessor'), coalesce(p_evidence_item_ids, '{}'),
            p_submission_id, p_method, auth.uid());
    n := n + 1;
    if n <= 3 then
      v_list := v_list || case when n > 1 then ', ' else '' end || (c->>'unit_code') || ' AC ' || (c->>'ac_code');
    end if;
    if n <= 20 then
      v_acs := v_acs || case when n > 1 then ',' else '' end || (c->>'unit_code') || ':' || (c->>'ac_code');
    end if;
  end loop;

  if n > 0 then
    select coalesce(full_name, 'Your assessor') into v_name from public.profiles where id = auth.uid();
    -- The decided criteria themselves, ringed, with the assessor's feedback
    -- (and "Add what was missing" on any that need more).
    v_link := '/apprentice/college/progress?ac=' || v_acs;
    perform public.notify_user(p_learner_id, 'assessment_decision',
      case p_decision
        when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end || ' passed'
        when 'referred' then v_name || ' needs more on ' || n || case when n = 1 then ' criterion' else ' criteria' end
        else 'Not yet: ' || v_name || ' left feedback' end,
      v_list || case when n > 3 then ' and ' || (n - 3) || ' more' else '' end
        || coalesce(': ' || left(p_feedback, 160), ''),
      jsonb_build_object('route', v_link, 'decision', p_decision, 'count', n, 'assessor_id', auth.uid(),
                         'criteria', v_acs, 'evidence_item_ids', to_jsonb(coalesce(p_evidence_item_ids, '{}'::uuid[]))));
  end if;
  return jsonb_build_object('recorded', n, 'qualification_code', v_code);
end; $function$;

CREATE OR REPLACE FUNCTION public.sign_gateway_declaration_employer(p_token text, p_name text, p_role text, p_company text, p_signature text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  d public.epa_gateway_declarations;
  snap jsonb;
  stmt text;
  v_hash text;
begin
  if coalesce(length(p_token), 0) < 32 then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into d from public.epa_gateway_declarations
   where token = p_token and kind = 'employer' for update;
  if d.id is null or d.superseded_at is not null then
    return jsonb_build_object('error', 'This link is not valid any more. Ask the college for the latest link.');
  end if;
  if d.signed_at is not null then return jsonb_build_object('error', 'This declaration has already been signed.'); end if;
  if d.token_expires_at < now() then return jsonb_build_object('error', 'This link has expired. Ask the college for a new one.'); end if;
  if length(trim(coalesce(p_name, ''))) < 2 then return jsonb_build_object('error', 'Type your full name to sign.'); end if;
  if length(trim(coalesce(p_role, ''))) < 2 then return jsonb_build_object('error', 'Add your role, for example Director or Supervisor.'); end if;
  if length(trim(coalesce(p_company, ''))) < 2 then return jsonb_build_object('error', 'Add the company name.'); end if;
  if p_signature is not null and (left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 400000) then
    return jsonb_build_object('error', 'The signature could not be read. Draw it again.');
  end if;

  snap := public._gateway_snapshot(d.learner_id);
  stmt := public._gateway_statement('employer', snap, p_company);
  v_hash := encode(extensions.digest(stmt || '|' || (snap - 'taken_at')::text, 'sha256'), 'hex');

  -- An earlier signed employer declaration is replaced by this one.
  update public.epa_gateway_declarations set superseded_at = now()
   where learner_id = d.learner_id and kind = 'employer' and signed_at is not null and superseded_at is null;

  update public.epa_gateway_declarations
     set statement = stmt, statement_version = public._gateway_statement_version(), snapshot = snap, snapshot_hash = v_hash,
         signer_name = trim(p_name), signer_role = trim(p_role), signer_company = trim(p_company),
         signature_image = p_signature, signed_at = now()
   where id = d.id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (d.learner_id, null, 'employer', 'gateway_declaration_signed', 'gateway_declaration', d.id,
          jsonb_build_object('kind', 'employer', 'signer_name', trim(p_name), 'signer_role', trim(p_role),
                             'signer_company', trim(p_company), 'standard', snap#>>'{standard,code}',
                             'statement_version', public._gateway_statement_version()), v_hash);

  -- Tell whoever asked.
  if d.requested_by is not null then
    begin
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (d.requested_by, 'gateway_declaration',
              'Employer signed the gateway declaration',
              trim(p_name) || ' (' || trim(p_company) || ') signed the behaviours declaration for '
                || coalesce(snap->>'learner_name', 'your learner') || '.',
              case when d.college_student_id is not null then '/college?section=student360&studentId=' || d.college_student_id || '#export-gateway' else null end,
              jsonb_build_object('declaration_id', d.id, 'learner_id', d.learner_id));
    exception when others then null;
    end;
  end if;

  return jsonb_build_object('success', true, 'snapshot_hash', v_hash);
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_notify_grade_recorded()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_user uuid;
begin
  if lower(coalesce(new.status, '')) = 'graded'
     and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) is distinct from 'graded') then
    select user_id into v_user from college_students where id = new.student_id;
    if v_user is not null then
      perform public.notify_user(v_user, 'grade_recorded', 'New grade recorded',
        'Your assessment' || coalesce(' for ' || nullif(new.unit_name, ''), '') || ' has been graded.',
        jsonb_build_object('route', '/apprentice/college/progress?grade=' || new.id, 'ref_id', new.id::text, 'grade_id', new.id));
    end if;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_grade_recorded] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_notify_ilp_goal()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        jsonb_build_object('route', '/college?section=student360&studentId=' || new.student_id || '&focus=' || new.id || '#ilp',
                           'ref_id', new.id::text || ':' || md5(new.student_comment), 'goal_id', new.id));
    end loop;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_ilp_goal] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_notify_pastoral_concern()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_author_user uuid;
  v_learner uuid;
  v_uids uuid[] := '{}';
  v_title text; v_body text;
  v_uid uuid;
  v_link text := '/college?section=student360&studentId=' || new.student_id || '&focus=' || new.id || '#notes';
begin
  if new.kind not in ('flag', 'concern')
     or new.visibility in ('author_only', 'safeguarding') then
    return new;
  end if;

  select user_id into v_author_user from college_staff where id = new.author_id;
  select user_id into v_learner from college_students where id = new.student_id;

  if new.visibility = 'tutors' and v_learner is not null then
    select coalesce(array_agg(u), '{}') into v_uids
    from public._learner_tutor_uids(v_learner) u
    where u is distinct from v_author_user;
    v_title := 'A learner has been flagged';
    v_body := 'A flag has been raised about a learner you support. Open their record to review.';
  end if;

  if new.visibility = 'course_lead' or cardinality(v_uids) = 0 then
    select coalesce(array_agg(distinct s.user_id), '{}') into v_uids
    from college_staff s
    where s.college_id = new.college_id and s.role = 'head_of_department'
      and s.user_id is not null and s.archived_at is null
      and s.id is distinct from new.author_id;
    v_title := 'A concern needs your attention';
    v_body := 'A concern has been logged about a learner at your college. Open their record to review.';
  end if;

  if cardinality(v_uids) = 0 then
    select coalesce(array_agg(distinct s.user_id), '{}') into v_uids
    from college_staff s
    where s.college_id = new.college_id and s.role = 'admin'
      and s.user_id is not null and s.archived_at is null
      and s.id is distinct from new.author_id;
    v_title := 'A learner concern needs attention';
    v_body := 'A flagged concern about a learner has not reached a tutor or course lead. Review it and check staff roles are assigned.';
  end if;

  foreach v_uid in array v_uids loop
    perform public.notify_user(v_uid, 'pastoral_flag', v_title, v_body,
      jsonb_build_object('route', v_link, 'ref_id', new.id::text, 'note_id', new.id));
  end loop;
  return new;
exception when others then
  raise warning '[tg_notify_pastoral_concern] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_notify_submission_reviewed()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_item uuid;
begin
  if new.status is distinct from old.status
     and new.status in ('feedback_given', 'signed_off', 'iqa_verified') then
    select si.portfolio_item_id into v_item from public.portfolio_submission_items si
     where si.submission_id = new.id limit 1;
    perform public.notify_user(new.user_id, 'portfolio_reviewed',
      case new.status
        when 'feedback_given' then 'New feedback on your portfolio'
        when 'signed_off'     then 'Portfolio signed off'
        else 'Portfolio verified' end,
      case new.status
        when 'feedback_given' then 'Your assessor left feedback on a portfolio submission. Open it to see what to do next.'
        when 'signed_off'     then 'An assessor has signed off one of your portfolio submissions.'
        else 'A portfolio submission has been quality-verified by the IQA.' end,
      jsonb_build_object('route', coalesce('/apprentice/hub?item=' || v_item, '/apprentice/hub'), 'evidence_id', v_item,
                         'ref_id', new.id::text || ':' || new.status, 'submission_id', new.id));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_submission_reviewed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_notify_witness_signed()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        jsonb_build_object('route', '/college?section=student360&studentId=' || v_cs.id
                                    || '&focus=' || new.portfolio_item_id || '#assess',
                           'ref_id', new.id::text, 'statement_id', new.id,
                           'portfolio_item_id', new.portfolio_item_id));
    end loop;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_witness_signed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.tg_site_diary_question_notify()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  q text := btrim(coalesce(new.issues_or_questions, ''));
  v_student record;
  v_name text;
  v_uid uuid;
begin
  if not new.share_with_tutor then return new; end if;
  if length(q) <= 2
     or lower(regexp_replace(q, '[.!]+$', '')) in ('none', 'n/a', 'na', 'nope', 'nothing', 'no') then
    return new;
  end if;
  if tg_op = 'UPDATE'
     and old.share_with_tutor
     and old.issues_or_questions is not distinct from new.issues_or_questions then
    return new;
  end if;

  begin
    select s.id, s.name into v_student
    from public.college_students s
    where s.user_id = new.user_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;
    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'A learner');

    for v_uid in select public._learner_tutor_uids(new.user_id) loop
      perform public.notify_user(v_uid, 'diary_question',
        v_name || ' asked a question in their site diary',
        left(q, 160),
        jsonb_build_object('route', '/college?section=student360&studentId=' || v_student.id || '&focus=' || new.id || '#diary',
                           'ref_id', new.id::text,
                           'diary_entry_id', new.id, 'college_student_id', v_student.id));
    end loop;
  exception when others then
    null;
  end;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public._plan_mark_met(p_learner uuid, p_refs text[], p_by text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r record; n int := 0; v_name text;
begin
  if p_learner is null or coalesce(array_length(p_refs, 1), 0) = 0 then return 0; end if;
  update public.portfolio_assessment_plan_criteria c
     set met_at = now(), met_by = p_by
    from public.portfolio_assessment_plans p
   where p.id = c.plan_id and p.status = 'open' and c.learner_id = p_learner
     and c.met_at is null and (c.unit_code || '|' || c.ac_code) = any (p_refs);

  for r in
    update public.portfolio_assessment_plans p
       set status = 'done', closed_at = now(), close_reason = p_by, updated_at = now()
     where p.learner_id = p_learner and p.status = 'open'
       and exists (select 1 from public.portfolio_assessment_plan_criteria c where c.plan_id = p.id)
       and not exists (select 1 from public.portfolio_assessment_plan_criteria c where c.plan_id = p.id and c.met_at is null)
    returning p.id, p.set_by, p.activity, p.college_student_id
  loop
    n := n + 1;
    if r.set_by is not null then
      select public.notif_person(coalesce(s.name, 'Your learner')) into v_name
        from public.college_students s where s.id = r.college_student_id;
      perform public.notify_user(r.set_by, 'assessment_plan_done',
        coalesce(v_name, 'Your learner') || ' has evidenced a plan item',
        left(r.activity, 140) || case when p_by = 'criteria_passed' then ' · criteria passed' else ' · evidence sent for assessment' end,
        jsonb_build_object('ref_id', r.id::text, 'plan_id', r.id,
          'route', case when r.college_student_id is not null
                        then '/college?section=student360&studentId=' || r.college_student_id || '&focus=' || r.id || '#plan' end));
    end if;
  end loop;
  return n;
end; $function$;

CREATE OR REPLACE FUNCTION public.notify_employer_otj_submission()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  r record;
  v_name text;
  v_hours numeric;
  v_hours_txt text;
  v_attester text;
begin
  v_hours := round(coalesce(NEW.duration_minutes, 0) / 60.0, 1);
  v_hours_txt := case when v_hours = trunc(v_hours) then trunc(v_hours)::int::text else v_hours::text end
                 || case when v_hours = 1 then ' training hour' else ' training hours' end;

  if TG_OP = 'UPDATE'
     and NEW.verification_status is distinct from OLD.verification_status
     and coalesce(OLD.verification_status, '') = 'pending' then
    if NEW.verification_status = 'verified_by_employer' then
      v_attester := split_part(coalesce(NEW.attested_by_name, 'Your employer'), ' ', 1);
      perform public.worker_notify(
        NEW.student_id,
        'otj_attested',
        initcap(v_attester) || ' confirmed your hours',
        coalesce(NEW.title, 'Off-the-job training') || ' (' || v_hours_txt ||
          ') now counts as workplace-attested. Your college still verifies it separately.',
        jsonb_build_object('route', '/apprentice/ojt-hub?entry=' || NEW.id, 'entry_id', NEW.id)
      );
      return NEW;
    elsif NEW.verification_status = 'rejected'
          and coalesce(NEW.verification_rationale, '') like 'Employer%' then
      perform public.worker_notify(
        NEW.student_id,
        'otj_sent_back',
        'Your employer sent some hours back',
        coalesce(NEW.title, 'Off-the-job training') || ': ' ||
          left(regexp_replace(NEW.verification_rationale, '^Employer \([^)]*\):\s*', ''), 140),
        jsonb_build_object('route', '/apprentice/ojt-hub?entry=' || NEW.id, 'entry_id', NEW.id)
      );
      return NEW;
    end if;
  end if;

  if coalesce(NEW.source_kind, '') <> 'apprentice_submitted'
     or coalesce(NEW.verification_status, '') <> 'pending' then
    return NEW;
  end if;
  if TG_OP = 'UPDATE' and coalesce(OLD.verification_status, '') = 'pending' then
    return NEW;
  end if;

  for r in
    select distinct e.employer_id, e.name
      from public.employer_employees e
     where e.user_id = NEW.student_id
       and e.employer_id is not null
       and e.status = 'Active'
  loop
    v_name := split_part(coalesce(r.name, 'Your apprentice'), ' ', 1);
    perform public.notify_employer_bell(
      r.employer_id,
      'apprentice_hours_submitted',
      case when TG_OP = 'UPDATE'
           then v_name || ' resubmitted ' || v_hours_txt
           else v_name || ' logged ' || v_hours_txt end,
      coalesce(NEW.title, 'Off-the-job training') || ' · ' ||
        to_char(NEW.activity_date, 'FMDD Mon') || ' · tap to review',
      jsonb_build_object(
        'route', '/employer?section=apprentices&entry=' || NEW.id,
        'entry_id', NEW.id
      )
    );
  end loop;

  return NEW;
exception when others then
  raise warning '[notify_employer_otj_submission] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$function$;
