-- Add linking fields between near_miss_reports and team_briefings
ALTER TABLE team_briefings
ADD COLUMN IF NOT EXISTS linked_near_miss_id uuid REFERENCES near_miss_reports(id) ON DELETE SET NULL;

ALTER TABLE near_miss_reports
ADD COLUMN IF NOT EXISTS briefed_to_team boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS briefing_id uuid REFERENCES team_briefings(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS briefing_created_at timestamp with time zone;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_team_briefings_linked_near_miss ON team_briefings(linked_near_miss_id);
CREATE INDEX IF NOT EXISTS idx_near_miss_reports_briefing ON near_miss_reports(briefing_id);

-- Update near miss status options to include briefing-related statuses
COMMENT ON COLUMN near_miss_reports.status IS 'Status options: Reported, Under Review, Briefing Scheduled, Action Taken, Closed';