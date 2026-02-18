-- Add company branding and certificate columns to completion_signoffs
ALTER TABLE completion_signoffs
  ADD COLUMN IF NOT EXISTS company_logo_url text,
  ADD COLUMN IF NOT EXISTS certificate_url text;

-- Fix: Allow anonymous clients to update completion_signoffs for signing
-- (matches the pattern already used on scope_share_links)
CREATE POLICY "Public can update completion signoffs for signing"
  ON completion_signoffs FOR UPDATE
  USING (status = 'active')
  WITH CHECK (status IN ('active', 'signed'));

-- Enable Supabase Realtime on completion_signoffs so the electrician
-- gets a live notification when the client signs
ALTER PUBLICATION supabase_realtime ADD TABLE completion_signoffs;
