-- Expose created_via and college_org on the admin users list so the dashboard
-- can keep admin-made accounts (tutors, cohorts, demo) out of signup numbers
-- and the Colleges page can group tutor accounts by organisation.
CREATE OR REPLACE FUNCTION public.get_admin_users()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  result json;
BEGIN
  SELECT json_agg(row_to_json(t) ORDER BY t.created_at DESC)
  INTO result
  FROM (
    SELECT
      au.id,
      au.email,
      au.email_confirmed_at IS NOT NULL AS email_confirmed,
      au.last_sign_in_at AS last_sign_in,
      au.created_at,
      p.full_name,
      p.username,
      p.avatar_url,
      p.role,
      p.admin_role,
      COALESCE(p.subscribed, false) AS subscribed,
      p.subscription_tier,
      p.subscription_start,
      p.subscription_end,
      p.stripe_customer_id,
      COALESCE(p.free_access_granted, false) AS free_access_granted,
      p.free_access_reason,
      p.free_access_expires_at,
      COALESCE(p.elec_id_enabled, false) AS elec_id_enabled,
      COALESCE(p.onboarding_completed, false) AS onboarding_completed,
      p.updated_at,
      p.created_via,
      p.college_org
    FROM auth.users au
    LEFT JOIN public.profiles p ON p.id = au.id
    WHERE au.deleted_at IS NULL
  ) t;
  RETURN COALESCE(result, '[]'::json);
END;
$function$;
