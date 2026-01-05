-- Function to update workers_count on jobs table when assignments change
CREATE OR REPLACE FUNCTION public.update_job_workers_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.jobs 
    SET workers_count = (
      SELECT COUNT(*) FROM public.job_assignments WHERE job_id = NEW.job_id
    ),
    updated_at = now()
    WHERE id = NEW.job_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.jobs 
    SET workers_count = (
      SELECT COUNT(*) FROM public.job_assignments WHERE job_id = OLD.job_id
    ),
    updated_at = now()
    WHERE id = OLD.job_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on job_assignments table
DROP TRIGGER IF EXISTS sync_job_workers_count ON public.job_assignments;
CREATE TRIGGER sync_job_workers_count
AFTER INSERT OR UPDATE OR DELETE ON public.job_assignments
FOR EACH ROW EXECUTE FUNCTION public.update_job_workers_count();

-- Fix existing data: update workers_count for all jobs based on current assignments
UPDATE public.jobs SET workers_count = (
  SELECT COUNT(*) FROM public.job_assignments WHERE public.job_assignments.job_id = public.jobs.id
);

-- Enable realtime for job_assignments table
ALTER TABLE public.job_assignments REPLICA IDENTITY FULL;