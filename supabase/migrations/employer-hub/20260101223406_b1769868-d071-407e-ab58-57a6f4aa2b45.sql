-- Create job_assignments table to track worker assignments to jobs
CREATE TABLE public.job_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  role_on_job TEXT,
  status TEXT NOT NULL DEFAULT 'assigned',
  assigned_by TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  notify_email BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, employee_id)
);

-- Create notifications table for in-app notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'job_assignment',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for job_assignments (allow all for now - no auth)
CREATE POLICY "Allow all access to job_assignments"
ON public.job_assignments
FOR ALL
USING (true)
WITH CHECK (true);

-- RLS policies for notifications (allow all for now - no auth)
CREATE POLICY "Allow all access to notifications"
ON public.notifications
FOR ALL
USING (true)
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_job_assignments_job_id ON public.job_assignments(job_id);
CREATE INDEX idx_job_assignments_employee_id ON public.job_assignments(employee_id);
CREATE INDEX idx_notifications_employee_id ON public.notifications(employee_id);
CREATE INDEX idx_notifications_read_at ON public.notifications(read_at);

-- Trigger to update updated_at on job_assignments
CREATE TRIGGER update_job_assignments_updated_at
BEFORE UPDATE ON public.job_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_job_packs_updated_at();