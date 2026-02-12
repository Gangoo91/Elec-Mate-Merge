-- Photo Share Links table for client-facing photo documentation sharing
-- Run this migration in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS photo_share_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT NOT NULL UNIQUE,
  project_reference TEXT NOT NULL,
  title TEXT,
  message TEXT,
  company_name TEXT,
  photos_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  requires_signature BOOLEAN DEFAULT false,
  client_name TEXT,
  client_email TEXT,
  signature_data TEXT,
  signed_at TIMESTAMPTZ,
  signer_ip TEXT,
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'signed', 'expired', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast token lookups (public page)
CREATE INDEX IF NOT EXISTS idx_photo_share_links_token ON photo_share_links(share_token);

-- Index for user's share links list
CREATE INDEX IF NOT EXISTS idx_photo_share_links_user ON photo_share_links(user_id, created_at DESC);

-- Index for project reference filtering
CREATE INDEX IF NOT EXISTS idx_photo_share_links_project ON photo_share_links(user_id, project_reference);

-- Enable RLS
ALTER TABLE photo_share_links ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own share links
CREATE POLICY "Users can view own share links"
  ON photo_share_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create share links"
  ON photo_share_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own share links"
  ON photo_share_links FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own share links"
  ON photo_share_links FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Public access for viewing shared links by token (no auth required)
-- This allows the public share page to read link data
CREATE POLICY "Public can view active share links by token"
  ON photo_share_links FOR SELECT
  USING (
    status IN ('active', 'signed')
    AND (expires_at IS NULL OR expires_at > now())
  );

-- Policy: Public can update share links (for signature submission and view count)
CREATE POLICY "Public can submit signatures on share links"
  ON photo_share_links FOR UPDATE
  USING (
    status = 'active'
    AND requires_signature = true
    AND (expires_at IS NULL OR expires_at > now())
  )
  WITH CHECK (
    status IN ('active', 'signed')
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_photo_share_links_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER photo_share_links_updated_at
  BEFORE UPDATE ON photo_share_links
  FOR EACH ROW
  EXECUTE FUNCTION update_photo_share_links_updated_at();
