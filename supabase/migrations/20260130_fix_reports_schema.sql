-- Migration: Fix EICR save failure
-- Adds edit_version column for conflict detection and updates status constraint

-- Add edit_version column for conflict detection (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'reports'
    AND column_name = 'edit_version'
  ) THEN
    ALTER TABLE public.reports
    ADD COLUMN edit_version INTEGER DEFAULT 1;
  END IF;
END $$;

-- Drop existing status constraint if it exists
ALTER TABLE public.reports
DROP CONSTRAINT IF EXISTS reports_status_check;

-- Add updated status constraint that includes 'auto-draft'
ALTER TABLE public.reports
ADD CONSTRAINT reports_status_check
CHECK (status IN ('draft', 'in-progress', 'completed', 'auto-draft'));

-- Update any existing NULL edit_version values to 1
UPDATE public.reports
SET edit_version = 1
WHERE edit_version IS NULL;
