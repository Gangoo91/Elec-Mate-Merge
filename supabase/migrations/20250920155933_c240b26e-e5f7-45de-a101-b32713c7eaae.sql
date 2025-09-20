-- Add image_url column to job_listings table
ALTER TABLE public.job_listings 
ADD COLUMN image_url TEXT;

-- Update existing job records with sample workplace images
UPDATE public.job_listings 
SET image_url = CASE 
  WHEN LOWER(title) LIKE '%electrician%' OR LOWER(title) LIKE '%electrical%' THEN 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
  WHEN LOWER(title) LIKE '%engineer%' THEN 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
  WHEN LOWER(title) LIKE '%technician%' THEN 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop'
  WHEN LOWER(title) LIKE '%apprentice%' THEN 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
  WHEN LOWER(title) LIKE '%maintenance%' THEN 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
  ELSE 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
END
WHERE image_url IS NULL;