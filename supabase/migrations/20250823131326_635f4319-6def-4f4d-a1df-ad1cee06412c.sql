-- Create course enquiries table
CREATE TABLE public.course_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  course_provider TEXT NOT NULL,
  enquirer_name TEXT NOT NULL,
  enquirer_email TEXT NOT NULL,
  enquirer_phone TEXT,
  message TEXT,
  preferred_start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  response_received_at TIMESTAMP WITH TIME ZONE,
  provider_response TEXT
);

-- Enable RLS
ALTER TABLE public.course_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own enquiries" 
ON public.course_enquiries 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create enquiries" 
ON public.course_enquiries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create course dates cache table
CREATE TABLE public.course_dates_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  extracted_dates JSONB NOT NULL,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  UNIQUE(course_id, provider)
);

-- Enable RLS for course dates cache
ALTER TABLE public.course_dates_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for course dates cache
CREATE POLICY "Course dates cache is publicly readable" 
ON public.course_dates_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage course dates cache" 
ON public.course_dates_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Function to clean up expired course dates cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_course_dates_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.course_dates_cache 
  WHERE expires_at < now();
END;
$function$;