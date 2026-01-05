-- Create job labels table for coloured tags
CREATE TABLE public.job_labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  colour text NOT NULL DEFAULT '#3b82f6',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create junction table for job-label assignments
CREATE TABLE public.job_label_assignments (
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  label_id uuid NOT NULL REFERENCES public.job_labels(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (job_id, label_id)
);

-- Create job checklist items table
CREATE TABLE public.job_checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  title text NOT NULL,
  is_completed boolean NOT NULL DEFAULT false,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create job comments/activity table
CREATE TABLE public.job_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  comment_type text NOT NULL DEFAULT 'comment',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.job_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_label_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_comments ENABLE ROW LEVEL SECURITY;

-- Create permissive policies (matching existing pattern)
CREATE POLICY "Allow all access to job_labels" ON public.job_labels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to job_label_assignments" ON public.job_label_assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to job_checklist_items" ON public.job_checklist_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to job_comments" ON public.job_comments FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_job_label_assignments_job_id ON public.job_label_assignments(job_id);
CREATE INDEX idx_job_label_assignments_label_id ON public.job_label_assignments(label_id);
CREATE INDEX idx_job_checklist_items_job_id ON public.job_checklist_items(job_id);
CREATE INDEX idx_job_comments_job_id ON public.job_comments(job_id);

-- Trigger for checklist updated_at
CREATE TRIGGER update_job_checklist_items_updated_at
  BEFORE UPDATE ON public.job_checklist_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default labels
INSERT INTO public.job_labels (name, colour) VALUES
  ('Urgent', '#ef4444'),
  ('High Priority', '#f97316'),
  ('Commercial', '#3b82f6'),
  ('Domestic', '#22c55e'),
  ('Maintenance', '#8b5cf6'),
  ('New Install', '#06b6d4');