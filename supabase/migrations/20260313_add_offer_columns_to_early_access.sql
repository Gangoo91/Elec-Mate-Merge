-- Add offer campaign columns to early_access_invites
ALTER TABLE early_access_invites ADD COLUMN IF NOT EXISTS offer_sent_at timestamptz;
ALTER TABLE early_access_invites ADD COLUMN IF NOT EXISTS offer_email_id text;
