-- Phase 1C: Global duplicate cleanup using DISTINCT ON, then add partial unique index and immutability

-- Step 1: Soft-delete older duplicates, keep most recent per (user_id, certificate_number)
WITH keepers AS (
  SELECT DISTINCT ON (user_id, certificate_number)
    id
  FROM reports
  WHERE deleted_at IS NULL
  ORDER BY user_id, certificate_number, created_at DESC, id DESC
),
old_dupes AS (
  SELECT r.id
  FROM reports r
  WHERE r.deleted_at IS NULL
    AND r.certificate_number IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM keepers k WHERE k.id = r.id
    )
)
UPDATE reports r
SET deleted_at = NOW(), updated_at = NOW()
WHERE r.id IN (SELECT id FROM old_dupes);

-- Step 2: Create a PARTIAL UNIQUE INDEX to enforce uniqueness only on active (not deleted) reports
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uniq_reports_user_cert_active'
  ) THEN
    CREATE UNIQUE INDEX uniq_reports_user_cert_active
    ON reports(user_id, certificate_number)
    WHERE deleted_at IS NULL;
  END IF;
END $$;

-- Step 3: Prevent certificate_number updates after creation
CREATE OR REPLACE FUNCTION prevent_certificate_number_update()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.certificate_number IS DISTINCT FROM NEW.certificate_number THEN
    RAISE EXCEPTION 'Certificate number cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS prevent_cert_number_update ON reports;
CREATE TRIGGER prevent_cert_number_update
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION prevent_certificate_number_update();

-- Step 4: Helpful indexes
CREATE INDEX IF NOT EXISTS idx_reports_user_status ON reports(user_id, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_reports_user_date ON reports(user_id, inspection_date) WHERE deleted_at IS NULL;