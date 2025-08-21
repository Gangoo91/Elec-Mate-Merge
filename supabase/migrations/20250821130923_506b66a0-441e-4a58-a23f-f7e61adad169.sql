-- Create storage bucket for visual analysis uploads if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('visual-uploads', 'visual-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for visual uploads bucket
CREATE POLICY "Users can upload their own visual analysis images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'visual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own visual analysis images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'visual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own visual analysis images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'visual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public access to visual uploads bucket (for AI analysis)
CREATE POLICY "Public access to visual uploads for AI analysis" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'visual-uploads');