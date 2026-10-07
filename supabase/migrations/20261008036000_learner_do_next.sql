-- ELE-1896: "Do next" is the learner's home.
--
-- get_my_do_next() returns ONE ranked list of what the signed-in learner should
-- do, built from every source that asks something of them:
--   assessment plan items (ELE-1874)          → capture with the criteria ticked
--   criteria the assessor referred / not yet  → capture with those criteria ticked
--   off-the-job entries returned by the tutor → the hours page
--   proposed hours to confirm (ELE-1876)      → the confirm card
--   quizzes due / overdue / newly marked      → the quiz
--   ILP goals: new, blocked, overdue, comment → the goal
--   unread tutor messages                     → the thread
--   portfolio comments waiting on them        → the evidence
--   progress reviews to sign / add a view to  → the review
--   witness requests that expired or stall    → the evidence
--   next class this week                      → the day
-- Ranked by the cost of leaving it: urgency 'now' (overdue, referred, returned,
-- a review to sign), then 'soon' (due within 7 days, waiting on a reply), then
-- 'later'. Web and native read the same list, so they always agree.
--
-- Also returns `suggestion`: the one thing that would help most this week when
-- nothing is asked of them (no course chosen → OTJ pace behind → the unit with
-- the most criteria not started → a timed mock). Never a dead end.
--
-- Caller = the learner only, own data only (auth.uid()). No college needed:
-- plans, decisions, witnesses and comments are keyed on the auth user, so a
-- learner with an independent assessor gets their items too (ELE-1897).

create or replace function public._do_next_enc(p text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select replace(replace(replace(replace(replace(replace(coalesce(p, ''),
         '%', '%25'), ' ', '%20'), '&', '%26'), ',', '%2C'), '#', '%23'), '?', '%3F');
$$;
revoke all on function public._do_next_enc(text) from public, anon;
grant execute on function public._do_next_enc(text) to authenticated;

create or replace function public.get_my_do_next()
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $function$
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
  allrows as (
    select j from plans union all select j from referred union all select j from returned
    union all select j from proposals union all select j from quizzes union all select j from marked
    union all select j from goals union all select j from messages union all select j from comments
    union all select j from reviews union all select j from witness union all select j from lesson
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

comment on function public.get_my_do_next() is
  '[LEARNER] ELE-1896 "Do next": one ranked to-do list for the signed-in learner (plans, referred criteria, returned/proposed hours, quizzes, goals, messages, comments, reviews, witnesses, next class) plus the one suggestion that would help most. Caller = learner, own data only.';

revoke all on function public.get_my_do_next() from public, anon;
grant execute on function public.get_my_do_next() to authenticated;
