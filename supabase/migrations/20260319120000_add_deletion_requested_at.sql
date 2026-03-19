-- ELE-402: Add soft-delete support to profiles
-- Account deletion is now a 30-day grace period rather than immediate hard delete

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS deletion_requested_at TIMESTAMPTZ DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_deletion_requested_at
  ON profiles(deletion_requested_at)
  WHERE deletion_requested_at IS NOT NULL;

COMMENT ON COLUMN profiles.deletion_requested_at IS
  'Set when user requests account deletion (GDPR Art. 17). Account and all associated data is permanently purged 30 days after this timestamp. NULL = active account.';
