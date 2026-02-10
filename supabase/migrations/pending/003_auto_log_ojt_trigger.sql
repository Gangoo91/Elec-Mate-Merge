-- Auto-log OJT hours from learning activities
CREATE OR REPLACE FUNCTION auto_log_ojt_from_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Only auto-log activities with duration > 0 that haven't been logged yet
  IF NEW.duration_minutes > 0 AND NEW.counted_as_ojt = false THEN
    INSERT INTO time_entries (user_id, activity, date, duration, notes, is_automatic, compliance_category)
    VALUES (
      NEW.user_id,
      COALESCE(NEW.source_title, NEW.activity_type),
      NEW.created_at::date,
      NEW.duration_minutes,
      'Auto-logged from ' || NEW.activity_type,
      true,
      CASE NEW.activity_type
        WHEN 'flashcard_session' THEN 'Self-study'
        WHEN 'quiz_completed' THEN 'Self-study'
        WHEN 'site_diary_entry' THEN 'Reflective Practice'
        WHEN 'mock_exam' THEN 'Self-study'
        WHEN 'video_watched' THEN 'Self-study'
        WHEN 'study_module' THEN 'Online Learning'
        WHEN 'portfolio_evidence' THEN 'Portfolio Building'
        ELSE 'Self-study'
      END
    );

    -- Mark as logged
    NEW.counted_as_ojt := true;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_log_ojt
  BEFORE INSERT ON learning_activity_log
  FOR EACH ROW
  EXECUTE FUNCTION auto_log_ojt_from_activity();
