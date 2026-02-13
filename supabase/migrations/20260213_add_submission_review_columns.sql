-- Add missing review columns to portfolio_submissions
-- These enable the full assessor ↔ apprentice feedback loop

-- 1. Add review tracking columns
ALTER TABLE portfolio_submissions
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS review_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS action_required text,
  ADD COLUMN IF NOT EXISTS strengths_noted text,
  ADD COLUMN IF NOT EXISTS areas_for_improvement text,
  ADD COLUMN IF NOT EXISTS previous_feedback text,
  ADD COLUMN IF NOT EXISTS previous_grade text;

-- 2. Performance indexes for assessor queue
CREATE INDEX IF NOT EXISTS idx_submissions_reviewed_by
  ON portfolio_submissions(reviewed_by)
  WHERE reviewed_by IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_submissions_status
  ON portfolio_submissions(status);

CREATE INDEX IF NOT EXISTS idx_submissions_assessor_status
  ON portfolio_submissions(assessor_id, status)
  WHERE assessor_id IS NOT NULL;

-- 3. Composite index for student lookup (used by useStudentSubmissions)
CREATE INDEX IF NOT EXISTS idx_submissions_user_qual
  ON portfolio_submissions(user_id, qualification_id);

-- 4. Trigger: auto-archive feedback when apprentice resubmits
-- This ensures previous_feedback/previous_grade are always populated
-- even if the client doesn't send them (defence in depth)
CREATE OR REPLACE FUNCTION archive_submission_feedback()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When status transitions FROM feedback_given TO submitted/resubmitted
  IF (NEW.status IN ('submitted', 'resubmitted')
      AND OLD.status = 'feedback_given') THEN

    -- Archive current feedback before it's cleared
    NEW.previous_feedback := OLD.assessor_feedback;
    NEW.previous_grade := OLD.grade;

    -- Auto-increment submission count if client didn't
    IF NEW.submission_count IS NULL OR NEW.submission_count <= OLD.submission_count THEN
      NEW.submission_count := COALESCE(OLD.submission_count, 1) + 1;
    END IF;

    -- Clear review fields for fresh assessor review
    NEW.assessor_feedback := NULL;
    NEW.grade := NULL;
    NEW.action_required := NULL;
    NEW.strengths_noted := NULL;
    NEW.areas_for_improvement := NULL;
    NEW.reviewed_by := NULL;
    NEW.review_started_at := NULL;
    NEW.reviewed_at := NULL;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_archive_submission_feedback ON portfolio_submissions;
CREATE TRIGGER trg_archive_submission_feedback
  BEFORE UPDATE ON portfolio_submissions
  FOR EACH ROW
  EXECUTE FUNCTION archive_submission_feedback();

-- 5. Column documentation
COMMENT ON COLUMN portfolio_submissions.reviewed_by IS
  'Assessor who performed the review (distinct from assessor_id which is the assigned assessor)';
COMMENT ON COLUMN portfolio_submissions.review_started_at IS
  'When the assessor began reviewing this submission';
COMMENT ON COLUMN portfolio_submissions.action_required IS
  'Specific actions the apprentice must take to address feedback';
COMMENT ON COLUMN portfolio_submissions.strengths_noted IS
  'Positive aspects noted by the assessor';
COMMENT ON COLUMN portfolio_submissions.areas_for_improvement IS
  'Areas the apprentice should focus on improving';
COMMENT ON COLUMN portfolio_submissions.previous_feedback IS
  'Archived feedback from previous submission attempt (auto-populated by trigger)';
COMMENT ON COLUMN portfolio_submissions.previous_grade IS
  'Grade from previous submission attempt (auto-populated by trigger)';
