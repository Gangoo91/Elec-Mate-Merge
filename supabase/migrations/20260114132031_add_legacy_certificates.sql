-- Migration: Add legacy_certificates table and storage bucket
-- Purpose: Allow users to store PDF certificates from other software systems

-- Create the legacy_certificates table
CREATE TABLE IF NOT EXISTS public.legacy_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,

  -- File metadata
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size_bytes INTEGER,

  -- Certificate metadata (user-entered)
  certificate_type TEXT CHECK (certificate_type IN ('eicr', 'eic', 'minor-works', 'pir', 'other')),
  certificate_number TEXT,
  client_name TEXT,
  installation_address TEXT,
  issue_date DATE,
  expiry_date DATE,
  issuing_company TEXT,

  -- Migration metadata
  imported_from_system TEXT,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS idx_legacy_certificates_user_id ON public.legacy_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_legacy_certificates_customer_id ON public.legacy_certificates(customer_id);
CREATE INDEX IF NOT EXISTS idx_legacy_certificates_certificate_type ON public.legacy_certificates(certificate_type);

-- Enable RLS
ALTER TABLE public.legacy_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own certificates
CREATE POLICY "Users can view their own legacy certificates"
  ON public.legacy_certificates
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own legacy certificates"
  ON public.legacy_certificates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own legacy certificates"
  ON public.legacy_certificates
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own legacy certificates"
  ON public.legacy_certificates
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_legacy_certificates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_legacy_certificates_updated_at
  BEFORE UPDATE ON public.legacy_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_legacy_certificates_updated_at();

-- Create storage bucket for legacy certificates
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'legacy-certificates',
  'legacy-certificates',
  false,
  52428800,  -- 50MB max
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Users can upload their own legacy certificates"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'legacy-certificates'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own legacy certificates"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'legacy-certificates'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own legacy certificates"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'legacy-certificates'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
