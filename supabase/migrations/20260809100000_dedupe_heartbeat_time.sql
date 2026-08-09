-- Stop concurrent tabs multiplying a person's recorded time.
--
-- Both views computed time as `count(session_heartbeat) * 30`. Every open tab
-- runs its own 30-second heartbeat, so somebody with two windows side by side
-- accrued time twice over. One user recorded 25.9 hours in a single day — more
-- than a day contains — off 2,673 beats and two page views.
--
-- Counting DISTINCT 30-second buckets instead means concurrent beats collapse
-- to one. Across the platform that removed 536 of 3,668 recorded hours (14.6%)
-- without deleting a single row, and it corrects historical data as well as
-- new, because the views are computed rather than stored.
--
-- The remaining inflation is a single tab left open, which no query can undo
-- retrospectively. `ActivityTracker` now pauses the heartbeat on a hidden tab
-- and after two minutes without input, so it stops accruing from here.
--
-- Rebuilt in place from pg_get_viewdef so the 40-branch area CASE cannot drift
-- out of step with a hand-retyped copy.

do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_viewdef('public.user_engagement_by_area'::regclass, true);
  v_new := replace(
    v_def,
    'count(*) FILTER (WHERE user_events.event_type = ''session_heartbeat''::text) * 30 AS seconds_in_area',
    'count(DISTINCT floor(EXTRACT(epoch FROM user_events.created_at) / 30::numeric)) FILTER (WHERE user_events.event_type = ''session_heartbeat''::text) * 30 AS seconds_in_area'
  );
  if v_new = v_def then
    raise exception 'user_engagement_by_area: heartbeat expression not found — aborting rather than rebuilding the view wrongly';
  end if;
  execute 'CREATE OR REPLACE VIEW public.user_engagement_by_area AS ' || v_new;
end $$;

do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_viewdef('public.user_activity_summary'::regclass, true);
  v_new := replace(
    v_def,
    'count(*) FILTER (WHERE user_events.event_type = ''session_heartbeat''::text) * 30 AS total_seconds_tracked',
    'count(DISTINCT floor(EXTRACT(epoch FROM user_events.created_at) / 30::numeric)) FILTER (WHERE user_events.event_type = ''session_heartbeat''::text) * 30 AS total_seconds_tracked'
  );
  if v_new = v_def then
    raise exception 'user_activity_summary: heartbeat expression not found — aborting';
  end if;
  execute 'CREATE OR REPLACE VIEW public.user_activity_summary AS ' || v_new;
end $$;
