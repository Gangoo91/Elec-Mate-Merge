-- Add briefing_type column to team_briefings table
ALTER TABLE team_briefings 
ADD COLUMN IF NOT EXISTS briefing_type TEXT DEFAULT 'site-work';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_team_briefings_type 
ON team_briefings(briefing_type);

-- Add comment for documentation
COMMENT ON COLUMN team_briefings.briefing_type IS 'Type of briefing: site-work, lfe, hse-update, business-update, safety-alert, regulatory, or general';