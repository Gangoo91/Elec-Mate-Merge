
-- Create table for OJT goals tracking
CREATE TABLE public.ojt_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  unit TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  category TEXT NOT NULL CHECK (category IN ('training', 'portfolio', 'assessment', 'skill', 'certification')),
  deadline DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'overdue', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for assessment tracking enhancements
CREATE TABLE public.ojt_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Written', 'Practical', 'Oral', 'Portfolio', 'Observation')),
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  grade TEXT,
  feedback TEXT,
  tutor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tutor approval system
CREATE TABLE public.time_entry_approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  time_entry_id UUID NOT NULL REFERENCES public.time_entries(id) ON DELETE CASCADE,
  tutor_id UUID,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  tutor_comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for smart notifications
CREATE TABLE public.ojt_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deadline_reminder', 'goal_milestone', 'assessment_due', 'tutor_feedback', 'weekly_summary')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for enhanced reporting
CREATE TABLE public.ojt_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('weekly', 'monthly', 'progress', 'compliance', 'assessment')),
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  exported_at TIMESTAMP WITH TIME ZONE,
  export_format TEXT CHECK (export_format IN ('pdf', 'excel', 'json'))
);

-- Add indexes for performance
CREATE INDEX idx_ojt_goals_user_id ON public.ojt_goals(user_id);
CREATE INDEX idx_ojt_goals_deadline ON public.ojt_goals(deadline);
CREATE INDEX idx_ojt_assessments_user_id ON public.ojt_assessments(user_id);
CREATE INDEX idx_ojt_assessments_due_date ON public.ojt_assessments(due_date);
CREATE INDEX idx_time_entry_approvals_time_entry_id ON public.time_entry_approvals(time_entry_id);
CREATE INDEX idx_ojt_notifications_user_id ON public.ojt_notifications(user_id);
CREATE INDEX idx_ojt_notifications_scheduled_for ON public.ojt_notifications(scheduled_for);
CREATE INDEX idx_ojt_reports_user_id ON public.ojt_reports(user_id);

-- Enable RLS on all new tables
ALTER TABLE public.ojt_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ojt_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entry_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ojt_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ojt_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ojt_goals
CREATE POLICY "Users can view their own goals" ON public.ojt_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own goals" ON public.ojt_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON public.ojt_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own goals" ON public.ojt_goals FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ojt_assessments
CREATE POLICY "Users can view their own assessments" ON public.ojt_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own assessments" ON public.ojt_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own assessments" ON public.ojt_assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own assessments" ON public.ojt_assessments FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for time_entry_approvals
CREATE POLICY "Users can view approvals for their time entries" ON public.time_entry_approvals FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.time_entries WHERE time_entries.id = time_entry_approvals.time_entry_id AND time_entries.user_id = auth.uid()));
CREATE POLICY "Users can create approval requests for their time entries" ON public.time_entry_approvals FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.time_entries WHERE time_entries.id = time_entry_approvals.time_entry_id AND time_entries.user_id = auth.uid()));

-- Create RLS policies for ojt_notifications
CREATE POLICY "Users can view their own notifications" ON public.ojt_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.ojt_notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for ojt_reports
CREATE POLICY "Users can view their own reports" ON public.ojt_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own reports" ON public.ojt_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reports" ON public.ojt_reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reports" ON public.ojt_reports FOR DELETE USING (auth.uid() = user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ojt_goals_updated_at BEFORE UPDATE ON public.ojt_goals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_ojt_assessments_updated_at BEFORE UPDATE ON public.ojt_assessments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
