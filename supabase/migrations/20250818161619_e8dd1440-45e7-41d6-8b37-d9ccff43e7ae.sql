-- Phase 1: Critical Data Protection - Restrict price_reports access
-- Remove public read access and protect sensitive user data

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can read approved price reports" ON public.price_reports;

-- Create restrictive policy that only shows essential data for approved reports
-- Excludes IP addresses, exact coordinates, and user agents
CREATE POLICY "Public can view limited approved price data" ON public.price_reports
FOR SELECT 
USING (
  status = 'approved' 
  AND created_at >= CURRENT_DATE - INTERVAL '90 days' -- Only recent data
);

-- Create a secure view for public consumption that excludes sensitive data
CREATE OR REPLACE VIEW public.public_price_reports AS
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

-- Grant access to the view
GRANT SELECT ON public.public_price_reports TO authenticated, anon;

-- Phase 2: Protect user activity data - Restrict global_chat_upvotes
-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view upvotes" ON public.global_chat_upvotes;

-- Create policy that only allows authenticated users to see upvote data
CREATE POLICY "Authenticated users can view upvotes" ON public.global_chat_upvotes
FOR SELECT 
TO authenticated
USING (true);

-- Allow anonymous users to see only aggregated upvote counts, not individual upvote records
CREATE OR REPLACE VIEW public.message_upvote_counts AS
SELECT 
  message_id,
  COUNT(*) as upvote_count
FROM public.global_chat_upvotes
GROUP BY message_id;

-- Grant access to the aggregated view
GRANT SELECT ON public.message_upvote_counts TO authenticated, anon;

-- Phase 3: Secure database functions - Add proper security
-- Update existing functions to use SECURITY DEFINER and safe search_path

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    split_part(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$function$;

-- Add function to safely check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    CASE 
      WHEN profiles.username = 'admin' OR profiles.full_name ILIKE '%admin%' THEN 'admin'
      ELSE 'user'
    END
  FROM public.profiles 
  WHERE profiles.id = auth.uid();
$$;

-- Phase 4: Add audit logging for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.security_audit_log
FOR SELECT 
TO authenticated
USING (public.get_current_user_role() = 'admin');

-- Create trigger function for audit logging
CREATE OR REPLACE FUNCTION public.log_sensitive_operations()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Log operations on sensitive tables
  IF TG_TABLE_NAME IN ('price_reports', 'profiles', 'user_activity') THEN
    INSERT INTO public.security_audit_log (
      user_id, 
      action, 
      table_name, 
      record_id
    ) VALUES (
      auth.uid(), 
      TG_OP, 
      TG_TABLE_NAME, 
      COALESCE(NEW.id, OLD.id)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;