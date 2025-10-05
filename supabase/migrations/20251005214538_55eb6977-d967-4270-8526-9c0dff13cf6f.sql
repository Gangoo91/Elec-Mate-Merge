-- Add status management columns to team_briefings
ALTER TABLE public.team_briefings 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
ADD COLUMN IF NOT EXISTS cancelled_reason text,
ADD COLUMN IF NOT EXISTS cancelled_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS started_at timestamp with time zone;

-- Create index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_team_briefings_status ON public.team_briefings(status);
CREATE INDEX IF NOT EXISTS idx_team_briefings_user_status ON public.team_briefings(user_id, status);