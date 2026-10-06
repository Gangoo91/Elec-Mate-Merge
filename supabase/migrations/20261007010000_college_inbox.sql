-- One inbox for everything a college tutor has to act on (Andrew, 6 Oct:
-- "everything will come through this"). Before this the inbox read four
-- sources in the browser and the home page read others, so the counts
-- disagreed (3 against 10) and evidence, app learning, reviews and check-ins
-- never reached the inbox at all.
--
-- get_college_inbox(college) returns one normalised row per thing to do:
--   hours         off-the-job entries waiting for verification
--   app_learning  measured learning in the app waiting for approval (per learner)
--   evidence      portfolio submissions waiting for assessment
--   comment       a learner's reply on their portfolio that needs an answer
--   message       unread learner messages
--   iqa           IQA samples waiting for a verdict
--   review        progress reviews overdue, to book, to write up or to sign
--   checkin       learners the risk engine flags high or critical
-- Each row has the learner, cohort, whether it is the caller's own cohort,
-- how long it has waited, whether it is urgent, the verb for the button and
-- the exact link that opens it. Quiz marking is merged in by the client from
-- useMarkingQueue (it is derived per answer, not stored).
-- Read states for every inbox kind (it held only the original four).
alter table public.college_inbox_read_states drop constraint if exists college_inbox_read_states_source_check;
alter table public.college_inbox_read_states add constraint college_inbox_read_states_source_check
  check (source in ('portfolio', 'otj', 'iqa', 'message', 'hours', 'app_learning', 'evidence', 'comment',
                    'review', 'checkin', 'marking'));

create or replace function public.get_college_inbox(p_college uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid := p_college;
  v_staff uuid;
  v_today date := public._lon(now());
  v_items jsonb := '[]'::jsonb;
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select st.id into v_staff from college_staff st
   where st.user_id = auth.uid() and st.college_id = v_college and st.archived_at is null limit 1;

  with learners as (
    select s.id, s.user_id, s.name, s.cohort_id, c.name as cohort,
           (c.tutor_id is not null and c.tutor_id = v_staff) as mine
      from college_students s
      left join college_cohorts c on c.id = s.cohort_id
     where s.college_id = v_college
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
  ),
  hours as (
    select jsonb_build_object(
      'kind', 'hours', 'source_id', o.id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', o.title,
      'detail', concat_ws(' · ',
        case when o.duration_minutes >= 60 then round(o.duration_minutes / 60.0, 1) || 'h'
             when o.duration_minutes > 0 then o.duration_minutes || ' min' end,
        to_char(o.activity_date, 'DD Mon'), 'off-the-job to verify'),
      'occurred_at', coalesce(o.created_at, o.activity_date::timestamptz),
      'action', 'Verify', 'href', '/college/otj/inbox?entry=' || o.id) as j
      from college_otj_entries o join learners l on l.user_id = o.student_id
     where o.verification_status = 'pending' and coalesce(o.source_kind, '') <> 'in_app'
  ),
  app as (
    select jsonb_build_object(
      'kind', 'app_learning', 'source_id', l.id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', round(sum(t.duration) / 60.0, 1) || 'h of learning in the app',
      'detail', 'Measured as it happened · approve it or leave some out',
      'occurred_at', min(t.created_at),
      'action', 'Approve', 'href', '/college/otj?filter=approve&learner=' || l.id) as j
      from time_entries t join learners l on l.user_id = t.user_id
     where public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
       and not exists (select 1 from otj_capture_links k where k.time_entry_id = t.id)
     group by l.id, l.name, l.cohort, l.mine
    having sum(t.duration) >= 15
  ),
  evidence as (
    select jsonb_build_object(
      'kind', 'evidence', 'source_id', p.id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', case when p.status = 'resubmitted' then 'Evidence resubmitted' else 'Evidence submitted' end,
      'detail', coalesce(nullif(left(regexp_replace(coalesce(p.submission_notes, ''), '\s+', ' ', 'g'), 140), ''),
                         'Waiting for your assessment decision'),
      'occurred_at', coalesce(p.submitted_at, p.created_at),
      'action', 'Assess', 'href', '/college?section=student360&studentId=' || l.id || '#portfolio') as j
      from portfolio_submissions p join learners l on l.user_id = p.user_id
     where p.status in ('submitted', 'resubmitted')
  ),
  comments as (
    select jsonb_build_object(
      'kind', 'comment', 'source_id', c.id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', 'Replied on their portfolio',
      'detail', left(regexp_replace(c.content, '\s+', ' ', 'g'), 160),
      'occurred_at', c.created_at,
      'action', 'Reply', 'href', '/college?section=student360&studentId=' || l.id || '#portfolio') as j
      from portfolio_comments c join learners l on l.user_id = c.user_id
     where c.requires_action and not coalesce(c.is_resolved, false)
       and coalesce(c.author_role, 'apprentice') in ('apprentice', 'student')
  ),
  messages as (
    select jsonb_build_object(
      'kind', 'message', 'source_id', t.id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', case when t.unread_count_tutor > 1 then t.unread_count_tutor || ' new messages' else 'New message' end,
      'detail', coalesce((select left(regexp_replace(m.body, '\s+', ' ', 'g'), 160) from student_messages m
                           where m.thread_id = t.id order by m.created_at desc limit 1), t.subject, ''),
      'occurred_at', coalesce(t.last_message_at, t.created_at),
      'action', 'Reply', 'href', '/college?section=student360&studentId=' || l.id || '#messages') as j
      from student_message_threads t join learners l on l.id = t.student_id
     where t.college_id = v_college and coalesce(t.unread_count_tutor, 0) > 0
  ),
  iqa as (
    select jsonb_build_object(
      'kind', 'iqa', 'source_id', q.id, 'student_id', null, 'learner', null, 'cohort', null, 'mine', false,
      'title', coalesce(q.observation_title_snapshot, q.otj_title_snapshot, 'Sample'),
      'detail', 'IQA verdict due · ' || case when q.observation_id is not null then 'observation sample' else 'off-the-job sample' end,
      'occurred_at', q.sampled_at,
      'action', 'Decide', 'href', '/college/iqa/sampling/' || q.sampling_plan_id) as j
      from college_iqa_samples q join college_iqa_sampling sp on sp.id = q.sampling_plan_id
     where sp.college_id = v_college and q.verdict = 'pending'
  ),
  board as (
    select x from jsonb_array_elements(public.get_review_board(v_college)->'rows') x
  ),
  reviews as (
    select jsonb_build_object(
      'kind', 'review', 'source_id', coalesce(b.x->'next'->>'id', b.x->'to_sign'->>'id', b.x->>'student_id'),
      'student_id', b.x->>'student_id', 'learner', b.x->>'name', 'cohort', b.x->>'cohort',
      'mine', coalesce((select l.mine from learners l where l.id = (b.x->>'student_id')::uuid), false),
      'title', case b.x->>'state'
                 when 'overdue' then 'Progress review overdue'
                 when 'late' then 'Progress review booked after it is due'
                 when 'write_up' then 'Progress review to write up'
                 when 'due_soon' then 'Progress review to book'
                 when 'signatures' then 'Progress review waiting for signatures' end,
      'detail', case b.x->>'state'
                  when 'signatures' then concat_ws(' · ',
                    case when not coalesce((b.x->'to_sign'->>'learner_signed')::boolean, true) then 'apprentice to sign' end,
                    case when coalesce((b.x->'to_sign'->>'employer_must_sign')::boolean, false)
                          and not coalesce((b.x->'to_sign'->>'employer_signed')::boolean, true) then 'employer must sign' end)
                  else 'Due by ' || to_char((b.x->>'due_by')::date, 'DD Mon YYYY')
                       || case when (b.x->'next'->>'employer_input')::boolean then ' · employer view is in' else '' end end,
      'occurred_at', coalesce((b.x->>'due_by')::date, v_today)::timestamptz,
      'review_state', b.x->>'state',
      'action', case b.x->>'state' when 'overdue' then 'Book' when 'due_soon' then 'Book' when 'write_up' then 'Write up'
                                   when 'signatures' then 'Chase' else 'Open' end,
      'href', case when b.x->'next'->>'id' is not null and b.x->>'state' <> 'signatures'
                     then '/college/reviews?review=' || (b.x->'next'->>'id')
                   when b.x->>'state' = 'signatures' then '/college/reviews?review=' || (b.x->'to_sign'->>'id')
                   else '/college/reviews?student=' || (b.x->>'student_id') end) as j
      from board b
     where b.x->>'state' in ('overdue', 'late', 'write_up', 'due_soon', 'signatures')
  ),
  checkins as (
    select jsonb_build_object(
      'kind', 'checkin', 'source_id', r.student_id, 'student_id', l.id, 'learner', l.name, 'cohort', l.cohort, 'mine', l.mine,
      'title', case r.level when 'critical' then 'Needs a check-in today' else 'Worth a check-in' end,
      'detail', coalesce((select string_agg(f, ' · ') from (
                   select coalesce(e->>'label', e->>'factor', e #>> '{}') f
                     from jsonb_array_elements(case when jsonb_typeof(r.factors) = 'array' then r.factors else '[]'::jsonb end) e
                    limit 2) z), 'Flagged by the risk check'),
      'occurred_at', r.computed_at, 'risk_level', r.level,
      'action', 'Open', 'href', '/college?section=student360&studentId=' || l.id) as j
      from student_risk_scores r join learners l on l.id = r.student_id
     where r.is_current and r.level in ('high', 'critical')
  ),
  allrows as (
    select j from hours union all select j from app union all select j from evidence
    union all select j from comments union all select j from messages union all select j from iqa
    union all select j from reviews union all select j from checkins
  )
  select coalesce(jsonb_agg(
           j || jsonb_build_object(
             'key', (j->>'kind') || ':' || (j->>'source_id'),
             'waiting_days', greatest(0, v_today - public._lon((j->>'occurred_at')::timestamptz)),
             'seen', exists (select 1 from college_inbox_read_states rs
                              where rs.staff_id = v_staff and rs.source = j->>'kind'
                                and rs.source_id::text = j->>'source_id' and rs.read_at is not null),
             'urgent', case j->>'kind'
                         when 'hours' then v_today - public._lon((j->>'occurred_at')::timestamptz) >= 7
                         when 'evidence' then v_today - public._lon((j->>'occurred_at')::timestamptz) >= 7
                         when 'app_learning' then v_today - public._lon((j->>'occurred_at')::timestamptz) >= 14
                         when 'message' then v_today - public._lon((j->>'occurred_at')::timestamptz) >= 2
                         when 'comment' then v_today - public._lon((j->>'occurred_at')::timestamptz) >= 3
                         when 'review' then j->>'review_state' in ('overdue', 'late', 'write_up')
                         when 'checkin' then j->>'risk_level' = 'critical'
                         else false end)
           order by (j->>'occurred_at')::timestamptz), '[]'::jsonb)
    into v_items
    from allrows;

  return jsonb_build_object('college_id', v_college, 'staff_id', v_staff, 'generated_at', now(), 'items', v_items);
end; $$;
revoke all on function public.get_college_inbox(uuid) from public, anon;
grant execute on function public.get_college_inbox(uuid) to authenticated, service_role;
