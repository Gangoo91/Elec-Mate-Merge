-- Migration: Add ON DELETE CASCADE to all user_id FKs that were missing it
-- Required so that auth.admin.deleteUser() cleanly removes all user data
-- without FK constraint violations blocking account deletion (ELE-11)

-- portfolio_items
ALTER TABLE public.portfolio_items
  DROP CONSTRAINT IF EXISTS portfolio_items_user_id_fkey,
  ADD CONSTRAINT portfolio_items_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- evidence_uploads
ALTER TABLE public.evidence_uploads
  DROP CONSTRAINT IF EXISTS evidence_uploads_user_id_fkey,
  ADD CONSTRAINT evidence_uploads_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- assessment_tracking
ALTER TABLE public.assessment_tracking
  DROP CONSTRAINT IF EXISTS assessment_tracking_user_id_fkey,
  ADD CONSTRAINT assessment_tracking_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- compliance_tracking
ALTER TABLE public.compliance_tracking
  DROP CONSTRAINT IF EXISTS compliance_tracking_user_id_fkey,
  ADD CONSTRAINT compliance_tracking_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- cost_engineer_jobs
ALTER TABLE public.cost_engineer_jobs
  DROP CONSTRAINT IF EXISTS cost_engineer_jobs_user_id_fkey,
  ADD CONSTRAINT cost_engineer_jobs_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- user_safety_documents
ALTER TABLE public.user_safety_documents
  DROP CONSTRAINT IF EXISTS user_safety_documents_user_id_fkey,
  ADD CONSTRAINT user_safety_documents_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- safety_achievements
ALTER TABLE public.safety_achievements
  DROP CONSTRAINT IF EXISTS safety_achievements_user_id_fkey,
  ADD CONSTRAINT safety_achievements_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- safe_isolation_records
ALTER TABLE public.safe_isolation_records
  DROP CONSTRAINT IF EXISTS safe_isolation_records_user_id_fkey,
  ADD CONSTRAINT safe_isolation_records_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- pre_use_checks
ALTER TABLE public.pre_use_checks
  DROP CONSTRAINT IF EXISTS pre_use_checks_user_id_fkey,
  ADD CONSTRAINT pre_use_checks_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- completion_signoffs
ALTER TABLE public.completion_signoffs
  DROP CONSTRAINT IF EXISTS completion_signoffs_user_id_fkey,
  ADD CONSTRAINT completion_signoffs_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- design_exports
ALTER TABLE public.design_exports
  DROP CONSTRAINT IF EXISTS design_exports_user_id_fkey,
  ADD CONSTRAINT design_exports_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- site_visits
ALTER TABLE public.site_visits
  DROP CONSTRAINT IF EXISTS site_visits_user_id_fkey,
  ADD CONSTRAINT site_visits_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
