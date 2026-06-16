-- Admin analytics RPCs over user_events (event-driven overviews).
-- Captured from production to keep the repo reproducible; applied live on
-- 2026-06-16. All SECURITY DEFINER + admin-guarded (except get_lifetime_engagement,
-- which the admin-revenuecat-stats edge function calls via the service role).

CREATE OR REPLACE FUNCTION public.get_lifetime_engagement(p_user_ids uuid[])
 RETURNS TABLE(user_id uuid, login_count bigint, page_view_count bigint, feature_use_count bigint, active_days bigint, total_seconds_tracked bigint, unique_pages_visited bigint, last_activity timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    e.user_id,
    count(*) FILTER (WHERE e.event_type = 'login')::bigint,
    count(*) FILTER (WHERE e.event_type = 'page_view')::bigint,
    count(*) FILTER (WHERE e.event_type = 'feature_use')::bigint,
    count(DISTINCT date(e.created_at))::bigint,
    (count(*) FILTER (WHERE e.event_type = 'session_heartbeat') * 30)::bigint,
    count(DISTINCT e.page_path) FILTER (WHERE e.event_type = 'page_view')::bigint,
    max(e.created_at)
  FROM public.user_events e
  WHERE e.user_id = ANY(p_user_ids)
  GROUP BY e.user_id;
$function$;

CREATE OR REPLACE FUNCTION public.get_active_user_metrics()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  RETURN (
    WITH d AS (
      SELECT date(created_at AT TIME ZONE 'UTC') AS day, user_id
      FROM user_events
      WHERE created_at > now() - interval '30 days'
        AND user_id IS NOT NULL
    ),
    days AS (
      SELECT generate_series(
        (date(now() AT TIME ZONE 'UTC') - 29),
        date(now() AT TIME ZONE 'UTC'),
        interval '1 day'
      )::date AS day
    ),
    trend AS (
      SELECT dd.day, count(DISTINCT d.user_id) AS active
      FROM days dd
      LEFT JOIN d ON d.day = dd.day
      GROUP BY dd.day
    )
    SELECT jsonb_build_object(
      'dau', (SELECT count(DISTINCT user_id) FROM user_events
              WHERE created_at > now() - interval '1 day' AND user_id IS NOT NULL),
      'wau', (SELECT count(DISTINCT user_id) FROM user_events
              WHERE created_at > now() - interval '7 days' AND user_id IS NOT NULL),
      'mau', (SELECT count(DISTINCT user_id) FROM d),
      'trend', coalesce(
        (SELECT jsonb_agg(jsonb_build_object('day', day, 'active', active) ORDER BY day) FROM trend),
        '[]'::jsonb)
    )
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.get_active_user_metrics() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_retention_curve()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  RETURN (
    WITH signup AS (
      SELECT id AS user_id, created_at::date AS signup_day FROM profiles
    ),
    last_event AS (
      SELECT user_id, max(created_at)::date AS last_day FROM user_events GROUP BY user_id
    ),
    m AS (SELECT unnest(ARRAY[1,7,14,30,60,90]) AS milestone)
    SELECT coalesce(jsonb_agg(
      jsonb_build_object('day', milestone, 'eligible', eligible, 'retained', retained, 'pct', pct)
      ORDER BY milestone), '[]'::jsonb)
    FROM (
      SELECT m.milestone,
        count(*) FILTER (WHERE (now()::date - s.signup_day) >= m.milestone) AS eligible,
        count(*) FILTER (WHERE (now()::date - s.signup_day) >= m.milestone
                          AND le.last_day IS NOT NULL
                          AND (le.last_day - s.signup_day) >= m.milestone) AS retained,
        round(100.0 * count(*) FILTER (WHERE (now()::date - s.signup_day) >= m.milestone
                          AND le.last_day IS NOT NULL
                          AND (le.last_day - s.signup_day) >= m.milestone)
              / nullif(count(*) FILTER (WHERE (now()::date - s.signup_day) >= m.milestone), 0), 1) AS pct
      FROM signup s CROSS JOIN m LEFT JOIN last_event le ON le.user_id = s.user_id
      GROUP BY m.milestone
    ) q
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.get_retention_curve() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_at_risk_subscribers(p_days integer DEFAULT 30, p_limit integer DEFAULT 50)
 RETURNS TABLE(user_id uuid, full_name text, subscription_tier text, subscription_source text, last_active timestamp with time zone, days_quiet integer)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  RETURN QUERY
  WITH la AS (
    SELECT ue.user_id, max(ue.created_at) AS last_seen
    FROM user_events ue GROUP BY ue.user_id
  )
  SELECT p.id, p.full_name, p.subscription_tier, p.subscription_source,
         la.last_seen,
         coalesce((now()::date - la.last_seen::date), 9999)::int AS days_quiet
  FROM profiles p
  LEFT JOIN la ON la.user_id = p.id
  WHERE p.subscribed = true
    AND coalesce(p.free_access_granted, false) = false
    AND (la.last_seen IS NULL OR la.last_seen < now() - make_interval(days => p_days))
  ORDER BY (la.last_seen IS NULL) DESC, la.last_seen ASC NULLS FIRST
  LIMIT p_limit;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.get_at_risk_subscribers(integer, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_role_kpis()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  RETURN (
    SELECT coalesce(jsonb_agg(
      jsonb_build_object('role', role, 'total', total, 'paying', paying, 'wau', wau, 'conv_pct', conv_pct)
      ORDER BY total DESC), '[]'::jsonb)
    FROM (
      SELECT coalesce(p.role, 'visitor') AS role,
        count(*) AS total,
        count(*) FILTER (WHERE p.subscribed AND NOT coalesce(p.free_access_granted, false)) AS paying,
        count(DISTINCT w.user_id) AS wau,
        round(100.0 * count(*) FILTER (WHERE p.subscribed AND NOT coalesce(p.free_access_granted, false))
              / nullif(count(*), 0), 1) AS conv_pct
      FROM profiles p
      LEFT JOIN (
        SELECT DISTINCT user_id FROM user_events WHERE created_at > now() - interval '7 days'
      ) w ON w.user_id = p.id
      GROUP BY coalesce(p.role, 'visitor')
    ) q
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.get_role_kpis() TO authenticated;
