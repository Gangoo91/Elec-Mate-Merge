-- Create real-time time tracking tables
CREATE TABLE IF NOT EXISTS public.time_tracking_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  activity_type TEXT NOT NULL,
  course_slug TEXT,
  unit_code TEXT,
  is_active BOOLEAN DEFAULT true,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.time_tracking_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tracking sessions" 
ON public.time_tracking_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tracking sessions" 
ON public.time_tracking_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracking sessions" 
ON public.time_tracking_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracking sessions" 
ON public.time_tracking_sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create compliance goals table
CREATE TABLE IF NOT EXISTS public.compliance_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_type TEXT NOT NULL, -- '20_percent_otj', 'portfolio_entries', etc.
  target_hours INTEGER,
  target_entries INTEGER,
  current_hours INTEGER DEFAULT 0,
  current_entries INTEGER DEFAULT 0,
  compliance_percentage INTEGER DEFAULT 0,
  deadline DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.compliance_goals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own compliance goals" 
ON public.compliance_goals 
FOR ALL 
USING (auth.uid() = user_id);

-- Create enhanced time entries with portfolio links
ALTER TABLE public.time_entries 
ADD COLUMN IF NOT EXISTS portfolio_item_id UUID,
ADD COLUMN IF NOT EXISTS session_id UUID,
ADD COLUMN IF NOT EXISTS compliance_category TEXT,
ADD COLUMN IF NOT EXISTS learning_outcomes TEXT[],
ADD COLUMN IF NOT EXISTS evidence_urls TEXT[];

-- Create trigger for automatic compliance tracking
CREATE OR REPLACE FUNCTION update_compliance_tracking()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER time_entry_compliance_update
  AFTER INSERT OR UPDATE OR DELETE ON time_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_compliance_tracking();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_time_tracking_sessions_user_id ON time_tracking_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_time_tracking_sessions_active ON time_tracking_sessions(user_id, is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_compliance_goals_user_id ON compliance_goals(user_id);

-- Add updated_at trigger for time_tracking_sessions
CREATE TRIGGER update_time_tracking_sessions_updated_at
  BEFORE UPDATE ON time_tracking_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger for compliance_goals
CREATE TRIGGER update_compliance_goals_updated_at
  BEFORE UPDATE ON compliance_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for new tables
ALTER TABLE time_tracking_sessions REPLICA IDENTITY FULL;
ALTER TABLE compliance_goals REPLICA IDENTITY FULL;

-- Add tables to realtime publication
SELECT 1; -- Placeholder for realtime publication setup