-- Fix remaining security issues identified by the linter

-- Remove SECURITY DEFINER from views (these views should inherit caller permissions)
DROP VIEW IF EXISTS public.public_price_reports;
DROP VIEW IF EXISTS public.message_upvote_counts;

-- Recreate views without SECURITY DEFINER
CREATE VIEW public.public_price_reports AS
SELECT 
  id,
  job_type,
  region,
  county,
  price,
  currency,
  unit,
  complexity_level,
  data_source,
  created_at,
  -- Round coordinates to reduce precision (within ~1km accuracy)
  CASE 
    WHEN lat IS NOT NULL THEN ROUND(lat::numeric, 2)
    ELSE NULL 
  END as approximate_lat,
  CASE 
    WHEN lng IS NOT NULL THEN ROUND(lng::numeric, 2) 
    ELSE NULL
  END as approximate_lng
FROM public.price_reports
WHERE status = 'approved' 
  AND created_at >= CURRENT_DATE - INTERVAL '90 days';

CREATE VIEW public.message_upvote_counts AS
SELECT 
  message_id,
  COUNT(*) as upvote_count
FROM public.global_chat_upvotes
GROUP BY message_id;

-- Grant appropriate access to views
GRANT SELECT ON public.public_price_reports TO authenticated, anon;
GRANT SELECT ON public.message_upvote_counts TO authenticated, anon;

-- Fix functions that were flagged for missing search_path
-- Update all functions to have explicit search_path

CREATE OR REPLACE FUNCTION public.increment_content_view_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  CASE NEW.content_type
    WHEN 'safety_alerts' THEN
      UPDATE public.safety_alerts SET view_count = view_count + 1 WHERE id = NEW.content_id;
    WHEN 'industry_news' THEN
      UPDATE public.industry_news SET view_count = view_count + 1 WHERE id = NEW.content_id;
    WHEN 'lfe_reports' THEN
      UPDATE public.lfe_reports SET view_count = view_count + 1 WHERE id = NEW.content_id;
    WHEN 'major_projects' THEN
      UPDATE public.major_projects SET view_count = view_count + 1 WHERE id = NEW.content_id;
    WHEN 'safety_resources' THEN
      UPDATE public.safety_resources SET view_count = view_count + 1 WHERE id = NEW.content_id;
  END CASE;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- If user was active yesterday, increase streak
  IF EXISTS (
    SELECT 1 FROM user_activity 
    WHERE user_id = NEW.user_id 
    AND last_active_date = CURRENT_DATE - INTERVAL '1 day'
  ) THEN
    NEW.streak := NEW.streak + 1;
  -- If user wasn't active yesterday but is active today, reset streak to 1
  ELSE
    NEW.streak := 1;
  END IF;
  
  -- Update the last active date
  NEW.last_active_date := CURRENT_DATE;
  
  -- Update community stats for longest streak if this is a new record
  UPDATE community_stats
  SET longest_streak = NEW.streak
  WHERE NEW.streak > longest_streak;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_compliance_tracking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Update 20% OTJ compliance when time entries are added/updated
  UPDATE compliance_goals 
  SET 
    current_hours = (
      SELECT COALESCE(SUM(duration), 0) / 60 
      FROM time_entries 
      WHERE user_id = NEW.user_id 
      AND date >= CURRENT_DATE - INTERVAL '365 days'
    ),
    compliance_percentage = LEAST(100, ROUND(
      (SELECT COALESCE(SUM(duration), 0) / 60 FROM time_entries WHERE user_id = NEW.user_id AND date >= CURRENT_DATE - INTERVAL '365 days') * 100.0 / NULLIF(target_hours, 0)
    )),
    updated_at = now()
  WHERE user_id = NEW.user_id 
  AND goal_type = '20_percent_otj';

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_chat_messages_with_upvote_status(user_id uuid)
RETURNS TABLE(id uuid, author_id uuid, author_name text, author_avatar text, content text, category text, upvotes integer, created_at timestamp with time zone, updated_at timestamp with time zone, has_user_upvoted boolean)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT 
    m.id,
    m.author_id,
    m.author_name,
    m.author_avatar,
    m.content,
    m.category,
    m.upvotes,
    m.created_at,
    m.updated_at,
    EXISTS (
      SELECT 1 FROM global_chat_upvotes u 
      WHERE u.message_id = m.id AND u.user_id = get_chat_messages_with_upvote_status.user_id
    ) AS has_user_upvoted
  FROM global_chat_messages m
  ORDER BY m.created_at DESC;
$function$;

CREATE OR REPLACE FUNCTION public.update_content_average_rating()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  avg_rating DECIMAL(3,2);
BEGIN
  -- Calculate new average rating
  SELECT AVG(rating) INTO avg_rating
  FROM public.safety_content_ratings
  WHERE content_type = COALESCE(NEW.content_type, OLD.content_type)
    AND content_id = COALESCE(NEW.content_id, OLD.content_id);

  -- Update the appropriate content table
  CASE COALESCE(NEW.content_type, OLD.content_type)
    WHEN 'safety_alerts' THEN
      UPDATE public.safety_alerts SET average_rating = COALESCE(avg_rating, 0) 
      WHERE id = COALESCE(NEW.content_id, OLD.content_id);
    WHEN 'industry_news' THEN
      UPDATE public.industry_news SET average_rating = COALESCE(avg_rating, 0) 
      WHERE id = COALESCE(NEW.content_id, OLD.content_id);
    WHEN 'lfe_reports' THEN
      UPDATE public.lfe_reports SET average_rating = COALESCE(avg_rating, 0) 
      WHERE id = COALESCE(NEW.content_id, OLD.content_id);
    WHEN 'major_projects' THEN
      UPDATE public.major_projects SET average_rating = COALESCE(avg_rating, 0) 
      WHERE id = COALESCE(NEW.content_id, OLD.content_id);
    WHEN 'safety_resources' THEN
      UPDATE public.safety_resources SET average_rating = COALESCE(avg_rating, 0) 
      WHERE id = COALESCE(NEW.content_id, OLD.content_id);
  END CASE;

  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_scraping_source_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;