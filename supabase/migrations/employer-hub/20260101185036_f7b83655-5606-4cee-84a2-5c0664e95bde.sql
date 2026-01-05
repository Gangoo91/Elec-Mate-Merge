-- Create app_settings table for centralized configuration
CREATE TABLE public.app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Allow all access (no auth in app currently)
CREATE POLICY "Allow all access to app_settings" 
ON public.app_settings 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert default settings
INSERT INTO public.app_settings (key, description) VALUES 
  ('elevenlabs_agent_id', 'ElevenLabs Voice Agent ID'),
  ('google_maps_api_key', 'Google Maps JavaScript API Key');