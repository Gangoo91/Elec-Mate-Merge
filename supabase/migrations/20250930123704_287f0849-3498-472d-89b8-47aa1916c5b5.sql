-- Add folder organization columns to safety_photos table
ALTER TABLE public.safety_photos 
ADD COLUMN folder_name text DEFAULT 'General',
ADD COLUMN project_reference text;

-- Create index for better performance when filtering by folder
CREATE INDEX idx_safety_photos_folder_name ON public.safety_photos(folder_name);

-- Update existing photos to have default folder
UPDATE public.safety_photos 
SET folder_name = 'General' 
WHERE folder_name IS NULL;