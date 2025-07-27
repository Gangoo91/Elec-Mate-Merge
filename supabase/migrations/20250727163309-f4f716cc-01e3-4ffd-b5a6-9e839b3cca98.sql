-- Fix RLS for time_entries table (missing from previous tables)
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own time entries" 
ON public.time_entries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own time entries" 
ON public.time_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time entries" 
ON public.time_entries 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own time entries" 
ON public.time_entries 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fix RLS for community_stats table (missing from previous tables)
ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community stats" 
ON public.community_stats 
FOR SELECT 
USING (true);