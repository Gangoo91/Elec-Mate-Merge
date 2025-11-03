-- Add cancelled status to rams_generation_jobs table
-- This allows users to abort in-progress RAMS generation

COMMENT ON TABLE public.rams_generation_jobs IS 'Tracks AI RAMS generation jobs with support for user cancellation';

-- The status column already exists as text, so we just need to document the new status
-- Existing statuses: pending, processing, complete, failed
-- New status: cancelled (user-initiated abort)

-- No schema changes needed - just documenting the new status value
-- The application will now set status = 'cancelled' when users abort generation