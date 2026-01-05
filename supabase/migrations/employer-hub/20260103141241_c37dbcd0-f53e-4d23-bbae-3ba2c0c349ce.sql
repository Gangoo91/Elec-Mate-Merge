-- Insert branding settings with defaults
INSERT INTO public.app_settings (key, value, description)
VALUES 
  ('company_logo_url', NULL, 'URL to company logo'),
  ('brand_primary_color', '#f59e0b', 'Primary brand colour (hex)'),
  ('brand_secondary_color', '#0f172a', 'Secondary brand colour (hex)')
ON CONFLICT (key) DO NOTHING;

-- Create company-assets storage bucket for logo uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-assets', 'company-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to company-assets bucket
CREATE POLICY "Public read access for company assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-assets');

-- Allow authenticated upload to company-assets bucket
CREATE POLICY "Allow uploads to company assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'company-assets');

-- Allow update/delete for company assets
CREATE POLICY "Allow update company assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'company-assets');

CREATE POLICY "Allow delete company assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'company-assets');