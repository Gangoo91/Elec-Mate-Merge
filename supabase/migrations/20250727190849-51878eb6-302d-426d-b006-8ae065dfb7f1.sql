-- Add read-only policy for qualifications (public data that all users should see)
CREATE POLICY "Anyone can view qualifications" 
ON public.qualifications 
FOR SELECT 
USING (true);