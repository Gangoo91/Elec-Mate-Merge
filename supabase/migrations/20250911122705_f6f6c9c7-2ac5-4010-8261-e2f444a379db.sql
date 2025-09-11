-- Create tables for Phase 2 site safety features

-- Photo Documentation table
CREATE TABLE public.safety_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  tags TEXT[],
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Team briefing attendance tracking
CREATE TABLE public.team_briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_id TEXT NOT NULL,
  briefing_name TEXT NOT NULL,
  location TEXT NOT NULL,
  briefing_date DATE NOT NULL,
  briefing_time TIME NOT NULL,
  attendees JSONB NOT NULL DEFAULT '[]'::jsonb,
  key_points TEXT[],
  safety_points TEXT[],
  equipment_required TEXT[],
  duration_minutes INTEGER,
  notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Near miss reporting with follow-up tracking
CREATE TABLE public.near_miss_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  incident_date DATE NOT NULL,
  incident_time TIME NOT NULL,
  location TEXT NOT NULL,
  reporter_name TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  potential_consequences TEXT,
  immediate_actions TEXT,
  preventive_measures TEXT,
  follow_up_required BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'reported',
  assigned_to UUID,
  due_date DATE,
  completed_date DATE,
  photos_attached TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.safety_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.near_miss_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for safety_photos
CREATE POLICY "Users can create their own safety photos"
ON public.safety_photos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own safety photos"
ON public.safety_photos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own safety photos"
ON public.safety_photos FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own safety photos"
ON public.safety_photos FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for team_briefings
CREATE POLICY "Users can create their own team briefings"
ON public.team_briefings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own team briefings"
ON public.team_briefings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own team briefings"
ON public.team_briefings FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own team briefings"
ON public.team_briefings FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for near_miss_reports
CREATE POLICY "Users can create their own near miss reports"
ON public.near_miss_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own near miss reports"
ON public.near_miss_reports FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own near miss reports"
ON public.near_miss_reports FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own near miss reports"
ON public.near_miss_reports FOR DELETE
USING (auth.uid() = user_id);

-- Create update triggers
CREATE TRIGGER update_safety_photos_updated_at
BEFORE UPDATE ON public.safety_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_briefings_updated_at
BEFORE UPDATE ON public.team_briefings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_near_miss_reports_updated_at
BEFORE UPDATE ON public.near_miss_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();