-- F1.2 / ELE-942 — public storage bucket for AI-generated slide images.
-- Public read because slide URLs are pasted into <img src> on the deck page;
-- writes are restricted to authenticated users via RLS on storage.objects.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'slide-deck-images',
  'slide-deck-images',
  true,
  10485760, -- 10 MB cap per image
  ARRAY['image/png','image/jpeg','image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS: anyone authenticated can write to this bucket (edge fn uses service
-- role and bypasses RLS, but tutors editing inline could replace too).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'slide_deck_images_authenticated_write'
  ) THEN
    CREATE POLICY slide_deck_images_authenticated_write
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'slide-deck-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'slide_deck_images_public_read'
  ) THEN
    CREATE POLICY slide_deck_images_public_read
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'slide-deck-images');
  END IF;
END $$;
