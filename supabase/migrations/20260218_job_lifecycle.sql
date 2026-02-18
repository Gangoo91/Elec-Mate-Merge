-- Job Lifecycle: completion_signoffs table + site_visits.invoice_id

-- New table for completion sign-offs
CREATE TABLE IF NOT EXISTS completion_signoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  site_visit_id uuid REFERENCES site_visits NOT NULL,
  share_token text UNIQUE NOT NULL,
  title text,
  scope_summary jsonb,
  before_photo_urls text[],
  after_photo_urls text[],
  company_name text,
  requires_signature boolean DEFAULT true,
  client_name text,
  client_email text,
  signature_data text,
  signed_at timestamptz,
  view_count int DEFAULT 0,
  last_viewed_at timestamptz,
  expires_at timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active','signed','expired','revoked')),
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE completion_signoffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own completion signoffs"
  ON completion_signoffs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Public read completion signoffs by token"
  ON completion_signoffs FOR SELECT
  USING (true);

-- Add invoice linkage to site_visits
ALTER TABLE site_visits ADD COLUMN IF NOT EXISTS invoice_id uuid;
