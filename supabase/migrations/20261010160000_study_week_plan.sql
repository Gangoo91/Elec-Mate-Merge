-- Your week: an automatic weekly study plan from the learner's weak spots
-- (10 Oct 2026). Study Centre only — built from mocks, revision, course
-- sections and XP; nothing from the College Hub.
--
-- The plan is written once per Europe/London week (Monday) the first time the
-- learner asks for it, so it stays put while they improve. Progress is worked
-- out live from what they actually did this week; nothing is ticked by hand.
-- Finishing every item pays a one-off 100 XP bonus through _xp_award (same
-- ledger, caps and rules as all XP).

create table if not exists public.study_week_plans (
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  items jsonb not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, week_start)
);
comment on table public.study_week_plans is
  '[STUDY] A learner''s automatic weekly plan (Monday, Europe/London): items chosen from their weak spots when first viewed that week. Scope: own row. Used by: my_week_plan, Study Centre "Your week". Rule: written only by my_week_plan; progress is never stored, always computed.';
alter table public.study_week_plans enable row level security;
drop policy if exists "Users read own week plans" on public.study_week_plans;
create policy "Users read own week plans" on public.study_week_plans
  for select to authenticated using (user_id = auth.uid());

-- Monday 00:00 London for the current week, as a date and an instant.
create or replace function public.xp_week_start_date()
returns date language sql stable as $$
  select (date_trunc('week', now() at time zone 'Europe/London'))::date;
$$;

create or replace function public.my_week_plan()
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_week date := public.xp_week_start_date();
  v_since timestamptz := public.xp_period_start('week');
  v_items jsonb;
  v_completed timestamptz;
  v_out jsonb := '[]'::jsonb;
  it jsonb;
  v_progress integer;
  v_target integer;
  v_all_done boolean := true;
  v_due integer;
begin
  if v_user is null then raise exception 'not authenticated'; end if;

  select items, completed_at into v_items, v_completed
  from public.study_week_plans where user_id = v_user and week_start = v_week;

  if v_items is null then
    -- Build this week's plan from where the learner is now.
    v_items := '[]'::jsonb;

    -- Two weakest topics with enough answers to mean something.
    v_items := v_items || coalesce((
      select jsonb_agg(jsonb_build_object('kind', 'practise', 'topic', t.topic, 'target', 5,
                                          'pct', round(100.0 * t.got_right / nullif(t.answered, 0))))
      from (
        select s.topic, s.answered, s.got_right
        from public.mock_topic_stats(365) s
        where s.answered >= 3 and s.got_right::numeric / s.answered < 0.75
        order by s.got_right::numeric / s.answered, s.answered desc
        limit 2
      ) t
    ), '[]'::jsonb);

    v_items := v_items || jsonb_build_array(jsonb_build_object('kind', 'study', 'target', 3));

    select count(*) into v_due from public.mock_revision_state
    where user_id = v_user and mastered_at is null and due_at <= now();
    if v_due > 0 then
      v_items := v_items || jsonb_build_array(jsonb_build_object('kind', 'revise', 'target', least(v_due, 10)));
    end if;

    v_items := v_items || jsonb_build_array(jsonb_build_object('kind', 'mock', 'target', 1));
    v_items := v_items || jsonb_build_array(jsonb_build_object('kind', 'xp', 'target', 400));

    insert into public.study_week_plans (user_id, week_start, items)
    values (v_user, v_week, v_items)
    on conflict (user_id, week_start) do nothing;
  end if;

  -- Progress, live.
  for it in select * from jsonb_array_elements(v_items) loop
    v_target := (it ->> 'target')::int;
    v_progress := case it ->> 'kind'
      when 'practise' then coalesce((
        select sum(case when jsonb_typeof(a.topic_stats -> (it ->> 'topic') -> 'a') = 'number'
                        then (a.topic_stats -> (it ->> 'topic') ->> 'a')::int
                        else (a.topic_stats -> (it ->> 'topic') ->> 'n')::int end)
        from public.seo_mock_attempts a
        where a.user_id = v_user and a.created_at >= v_since
          and jsonb_typeof(a.topic_stats -> (it ->> 'topic')) = 'object'), 0)
      when 'study' then (
        select count(*) from public.course_progress c
        where c.user_id = v_user and c.completed and c.updated_at >= v_since)
      when 'revise' then (
        select count(*) from public.mock_revision_state r
        where r.user_id = v_user and r.updated_at >= v_since)
      when 'mock' then (
        select count(*) from public.seo_mock_attempts a
        where a.user_id = v_user and a.created_at >= v_since and a.total_questions >= 20)
      when 'xp' then coalesce((
        select sum(l.xp_earned) from public.learning_activity_log l
        where l.user_id = v_user and l.voided_at is null and l.activity_type <> 'achievement'
          and l.created_at >= v_since), 0)
      else 0 end;
    v_progress := least(coalesce(v_progress, 0), v_target);
    if v_progress < v_target then v_all_done := false; end if;
    v_out := v_out || jsonb_build_array(it || jsonb_build_object('progress', v_progress, 'done', v_progress >= v_target));
  end loop;

  -- Whole week done: a one-off bonus, once.
  if v_all_done and v_completed is null and jsonb_array_length(v_out) > 0 then
    update public.study_week_plans set completed_at = now()
    where user_id = v_user and week_start = v_week and completed_at is null;
    if found then
      perform public._xp_award(v_user, 'weekly_plan', v_week::text, 'Your week completed', 100,
                               'week:' || v_week::text, 0, '{}'::jsonb, true);
      v_completed := now();
    end if;
  end if;

  return jsonb_build_object(
    'week_start', v_week,
    'ends_at', (v_week + 7)::timestamp at time zone 'Europe/London',
    'items', v_out,
    'completed_at', v_completed,
    'bonus_xp', 100
  );
end;
$$;
revoke all on function public.my_week_plan() from public, anon;
grant execute on function public.my_week_plan() to authenticated;

-- The weekly bonus has its own daily cap line (it is paid at most once a week).
create or replace function public._xp_daily_cap(p_type text)
returns integer language sql immutable as $$
  select case p_type
    when 'quiz_completed' then 1000
    when 'tutor_quiz' then 300
    when 'flashcard_session' then 250
    when 'video_watched' then 200
    when 'mock_exam' then 600
    when 'path_completed' then 200
    when 'site_diary_entry' then 100
    when 'portfolio_evidence' then 300
    when 'weekly_plan' then 100
    else 1500 end;
$$;
