-- ELE-403: user_settings table for cross-device preference sync (cookie prefs etc.)
CREATE TABLE IF NOT EXISTS user_settings (
  user_id   UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key       TEXT    NOT NULL,
  value     JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, key)
);

-- ELE-405: metadata column on security_audit_log for GDPR audit detail
ALTER TABLE security_audit_log ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT NULL;

COMMENT ON TABLE user_settings IS 'Per-user key/value settings store (cookie prefs, UI preferences, etc.)';
COMMENT ON COLUMN security_audit_log.metadata IS 'Optional JSONB payload for GDPR audit entries (exported sections, purge dates, etc.)';
