-- Message a group with their own figures (College Hub, 8 Oct 2026).
--
-- A tutor who sees "10 learners behind on hours" nudges all ten in one go,
-- each message carrying that learner's own figures. Two functions, both
-- additive; no table is created or altered.
--
--   get_group_message_figures(p_student_ids)  the merge fields per learner,
--     read from the same sources the rest of the hub uses:
--       hours        get_otj_summary (counted_hours, planned_to_date_hours), to
--                    0.1 h, behind = planned - counted from those same figures
--       criteria     get_portfolio_ac_state (passed + iqa_confirmed, total,
--                    referred / not_yet still not resubmitted)
--       next review  the earliest unlocked review booked from today, else
--                    tripartite_due_by
--       attendance   college_attendance over the last 28 days (present and
--                    late count as attended, as on the Learners list)
--     and whether each learner can be messaged at all.
--
--   send_group_message(p_subject, p_messages, p_scope)  one new thread per
--     learner in the existing tutor/learner channel (student_message_threads
--     + student_messages), in one transaction. The existing triggers do the
--     rest: bump_thread_counters sets the learner's unread count and
--     trg_notify_student_message writes their bell and push. Nothing new is
--     stored anywhere else.
--
-- Guard rails, enforced here and not only in the page: at most 60 learners a
-- send; every learner at the caller's college; the caller needs
-- messages.send for each learner and either learners.view_all or the learner
-- as one of theirs (only the latter when the page is on "My learners");
-- withdrawn or archived learners and learners with no account are skipped and
-- reported, never messaged.

create or replace function public.get_group_message_figures(p_student_ids uuid[])
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_today date := public._lon(now());
  v_out jsonb := '[]'::jsonb;
  s record;
  v_otj jsonb;
  v_passed int;
  v_total int;
  v_back int;
  v_review date;
  v_review_kind text;
  v_att_n int;
  v_att_in int;
  v_reason text;
begin
  if v_uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  if p_student_ids is null or cardinality(p_student_ids) = 0 then
    return '[]'::jsonb;
  end if;
  if cardinality(p_student_ids) > 60 then
    raise exception 'at most 60 learners at a time' using errcode = '22023';
  end if;

  for s in
    select cs.id, cs.user_id, cs.college_id, cs.name, cs.status
      from public.college_students cs
     where cs.id = any (p_student_ids)
     order by cs.name
  loop
    -- Only learners the caller may see; anyone else is left out silently.
    if not (public.college_can('learners.view_all', s.college_id)
            or public.college_can('learners.view_mine', s.college_id, s.id)) then
      continue;
    end if;

    v_otj := null;
    v_passed := null;
    v_total := null;
    v_back := null;
    v_review := null;
    v_review_kind := null;

    if s.user_id is not null then
      begin
        v_otj := public.get_otj_summary(s.user_id);
      exception when others then
        v_otj := null;
      end;
      begin
        select count(*) filter (where a.state in ('passed', 'iqa_confirmed')),
               count(*),
               count(*) filter (where a.state in ('referred', 'not_yet'))
          into v_passed, v_total, v_back
          from public.get_portfolio_ac_state(s.user_id) a;
        if v_total = 0 then
          v_passed := null;
          v_total := null;
          v_back := null;
        end if;
      exception when others then
        v_passed := null;
        v_total := null;
        v_back := null;
      end;
    end if;

    select public._lon(r.scheduled_at)
      into v_review
      from public.college_tripartite_reviews r
     where r.student_id = s.id
       and r.status <> 'cancelled'
       and r.locked_at is null
       and r.scheduled_at is not null
       and public._lon(r.scheduled_at) >= v_today
     order by r.scheduled_at
     limit 1;
    if v_review is not null then
      v_review_kind := 'booked';
    else
      begin
        v_review := public.tripartite_due_by(s.id);
        v_review_kind := case when v_review is null then null else 'due' end;
      exception when others then
        v_review := null;
      end;
    end if;

    select count(*),
           count(*) filter (where lower(a.status) in ('present', 'late'))
      into v_att_n, v_att_in
      from public.college_attendance a
     where a.student_id = s.id
       and a.date > v_today - 28
       and a.date <= v_today;

    v_reason := case
      when lower(coalesce(s.status, '')) in ('withdrawn', 'archived') then 'withdrawn'
      when s.user_id is null then 'no_account'
      when not public.college_can('messages.send', s.college_id, s.id) then 'not_allowed'
      else null end;

    v_out := v_out || jsonb_build_array(jsonb_build_object(
      'student_id', s.id,
      'name', s.name,
      'first_name', coalesce(nullif(split_part(btrim(s.name), ' ', 1), ''), s.name),
      'status', s.status,
      'has_account', s.user_id is not null,
      'can_message', v_reason is null,
      'skip_reason', v_reason,
      'hours_counted', case when v_otj is null then null
                            else round(coalesce((v_otj->>'counted_hours')::numeric, 0), 1) end,
      'hours_planned_by_now', case when v_otj is null or v_otj->>'planned_to_date_hours' is null then null
                                   else round((v_otj->>'planned_to_date_hours')::numeric, 1) end,
      'hours_behind', case when v_otj is null or v_otj->>'planned_to_date_hours' is null then null
                           -- from the rounded figures, so the three numbers in a message agree
                           else greatest(0, round((v_otj->>'planned_to_date_hours')::numeric, 1)
                                            - round(coalesce((v_otj->>'counted_hours')::numeric, 0), 1)) end,
      'hours_required', case when v_otj is null or v_otj->>'required_hours' is null then null
                             else round((v_otj->>'required_hours')::numeric) end,
      'otj_risk', v_otj->>'risk',
      'criteria_passed', v_passed,
      'criteria_total', v_total,
      'criteria_sent_back', v_back,
      'next_review_date', v_review,
      'next_review_kind', v_review_kind,
      'attendance_last_4_weeks', case when v_att_n = 0 then null
                                      else round(100.0 * v_att_in / v_att_n) end,
      'sessions_last_4_weeks', v_att_n,
      'sessions_missed_last_4_weeks', v_att_n - v_att_in
    ));
  end loop;

  return v_out;
end;
$function$;

comment on function public.get_group_message_figures(uuid[]) is
  'College Hub group message: per-learner merge fields (OTJ hours, criteria, next review, 4-week attendance) and whether each can be messaged. Max 60. Staff only, scoped by college_can.';

revoke all on function public.get_group_message_figures(uuid[]) from public, anon;
grant execute on function public.get_group_message_figures(uuid[]) to authenticated;


create or replace function public.send_group_message(
  p_subject text,
  p_messages jsonb,
  p_scope text default 'college'
)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_subject text := nullif(btrim(coalesce(p_subject, '')), '');
  v_scope text := coalesce(p_scope, 'college');
  v_college uuid;
  v_staff uuid;
  v_n int;
  m jsonb;
  v_sid uuid;
  v_body text;
  s record;
  v_thread uuid;
  v_msg uuid;
  v_sent jsonb := '[]'::jsonb;
  v_skipped jsonb := '[]'::jsonb;
begin
  if v_uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  if v_scope not in ('mine', 'college') then
    raise exception 'scope must be mine or college' using errcode = '22023';
  end if;
  if p_messages is null or jsonb_typeof(p_messages) <> 'array' then
    raise exception 'messages must be a list' using errcode = '22023';
  end if;
  v_n := jsonb_array_length(p_messages);
  if v_n = 0 then
    raise exception 'nobody to send to' using errcode = '22023';
  end if;
  if v_n > 60 then
    raise exception 'at most 60 learners in one send' using errcode = '22023';
  end if;
  if v_subject is not null and length(v_subject) > 120 then
    raise exception 'subject is too long' using errcode = '22023';
  end if;
  if (select count(distinct x->>'student_id') from jsonb_array_elements(p_messages) x) <> v_n then
    raise exception 'each learner once per send' using errcode = '22023';
  end if;

  -- One college per send: the caller's, which every learner must belong to.
  select count(distinct cs.college_id), min(cs.college_id::text)::uuid
    into v_n, v_college
    from jsonb_array_elements(p_messages) x
    join public.college_students cs on cs.id = (x->>'student_id')::uuid;
  if v_n <> 1 or (select count(*) from jsonb_array_elements(p_messages) x
                   where not exists (select 1 from public.college_students cs
                                      where cs.id = (x->>'student_id')::uuid))
                  > 0 then
    raise exception 'every learner must be on one college roll' using errcode = '42501';
  end if;

  select st.id into v_staff
    from public.college_staff st
   where st.college_id = v_college
     and st.user_id = v_uid
     and st.archived_at is null
     and lower(coalesce(st.status, 'active')) <> 'archived'
   order by st.created_at
   limit 1;
  if v_staff is null then
    raise exception 'not on the staff at this college' using errcode = '42501';
  end if;

  -- Check everyone before writing anything.
  for m in select * from jsonb_array_elements(p_messages) loop
    v_sid := (m->>'student_id')::uuid;
    v_body := btrim(coalesce(m->>'body', ''));
    if v_body = '' then
      raise exception 'a message is empty' using errcode = '22023';
    end if;
    if length(v_body) > 4000 then
      raise exception 'a message is longer than 4000 characters' using errcode = '22023';
    end if;
    if not public.college_can('messages.send', v_college, v_sid) then
      raise exception 'not allowed to message one of these learners' using errcode = '42501';
    end if;
    if v_scope = 'mine' then
      if not public.college_can('learners.view_mine', v_college, v_sid) then
        raise exception 'one of these learners is not one of yours' using errcode = '42501';
      end if;
    elsif not (public.college_can('learners.view_all', v_college)
               or public.college_can('learners.view_mine', v_college, v_sid)) then
      raise exception 'not allowed to see one of these learners' using errcode = '42501';
    end if;
  end loop;

  for m in select * from jsonb_array_elements(p_messages) loop
    v_sid := (m->>'student_id')::uuid;
    v_body := btrim(m->>'body');
    select cs.id, cs.user_id, cs.status into s
      from public.college_students cs where cs.id = v_sid;

    if lower(coalesce(s.status, '')) in ('withdrawn', 'archived') then
      v_skipped := v_skipped || jsonb_build_array(jsonb_build_object('student_id', v_sid, 'reason', 'withdrawn'));
      continue;
    end if;
    if s.user_id is null then
      v_skipped := v_skipped || jsonb_build_array(jsonb_build_object('student_id', v_sid, 'reason', 'no_account'));
      continue;
    end if;

    insert into public.student_message_threads (student_id, college_id, subject, created_by)
    values (v_sid, v_college, v_subject, v_staff)
    returning id into v_thread;

    insert into public.student_messages (thread_id, sender_kind, sender_id, body)
    values (v_thread, 'tutor', v_staff, v_body)
    returning id into v_msg;

    v_sent := v_sent || jsonb_build_array(jsonb_build_object(
      'student_id', v_sid, 'thread_id', v_thread, 'message_id', v_msg));
  end loop;

  return jsonb_build_object(
    'sent', jsonb_array_length(v_sent),
    'skipped', jsonb_array_length(v_skipped),
    'threads', v_sent,
    'skipped_learners', v_skipped);
end;
$function$;

comment on function public.send_group_message(text, jsonb, text) is
  'College Hub group message: one new thread + tutor message per learner in student_message_threads/student_messages, in one transaction. Max 60. messages.send + scope checked per learner; withdrawn and no-account learners skipped.';

revoke all on function public.send_group_message(text, jsonb, text) from public, anon;
grant execute on function public.send_group_message(text, jsonb, text) to authenticated;
