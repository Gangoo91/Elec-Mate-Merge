-- Add INSERT policy for major_projects table to allow authenticated users to submit projects
CREATE POLICY "Authenticated users can submit major projects" 
ON public.major_projects 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);