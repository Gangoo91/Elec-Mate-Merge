-- Add photos column to team_briefings if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'team_briefings' AND column_name = 'photos'
    ) THEN
        ALTER TABLE team_briefings ADD COLUMN photos jsonb DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Create storage bucket for briefing photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('briefing-photos', 'briefing-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for briefing photos
CREATE POLICY "Users can upload briefing photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'briefing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own briefing photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'briefing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own briefing photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'briefing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view briefing photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'briefing-photos');