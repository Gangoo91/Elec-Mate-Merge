-- Create automation_rules table
CREATE TABLE public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  trigger_type TEXT NOT NULL DEFAULT 'schedule',
  trigger_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  conditions JSONB NOT NULL DEFAULT '[]'::jsonb,
  actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_system BOOLEAN NOT NULL DEFAULT false,
  last_run_at TIMESTAMP WITH TIME ZONE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  run_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create automation_logs table
CREATE TABLE public.automation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID NOT NULL REFERENCES public.automation_rules(id) ON DELETE CASCADE,
  trigger_data JSONB,
  records_processed INTEGER NOT NULL DEFAULT 0,
  actions_taken JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'success',
  error_message TEXT,
  duration_ms INTEGER,
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies (permissive for now - will be tightened with auth)
CREATE POLICY "Allow all access to automation_rules" ON public.automation_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to automation_logs" ON public.automation_logs FOR ALL USING (true) WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON public.automation_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster log queries
CREATE INDEX idx_automation_logs_rule_id ON public.automation_logs(rule_id);
CREATE INDEX idx_automation_logs_executed_at ON public.automation_logs(executed_at DESC);
CREATE INDEX idx_automation_rules_is_active ON public.automation_rules(is_active);
CREATE INDEX idx_automation_rules_next_run_at ON public.automation_rules(next_run_at);

-- Seed default automation rules
INSERT INTO public.automation_rules (name, description, category, trigger_type, trigger_config, conditions, actions, is_system) VALUES
-- Compliance Automations
('Certification Expiry Warning (30 days)', 'Alerts when employee certifications are expiring within 30 days', 'compliance', 'schedule', '{"schedule": "0 8 * * *", "description": "Daily at 8am"}', '[{"field": "expiry_date", "operator": "within_days", "value": 30}]', '[{"type": "notification", "config": {"title": "Certification Expiring Soon", "message": "{{certification_name}} for {{employee_name}} expires on {{expiry_date}}"}}, {"type": "email", "config": {"template": "certification_expiry_warning"}}]', true),

('Certification Expired Alert', 'Urgent alert when certifications have expired', 'compliance', 'schedule', '{"schedule": "0 8 * * *", "description": "Daily at 8am"}', '[{"field": "expiry_date", "operator": "is_past", "value": null}]', '[{"type": "notification", "config": {"title": "Certification Expired!", "message": "{{certification_name}} for {{employee_name}} has expired", "priority": "urgent"}}, {"type": "email", "config": {"template": "certification_expired"}}]', true),

('ECS Card Expiry Warning', 'Alerts when ECS cards are expiring within 30 days', 'compliance', 'schedule', '{"schedule": "0 8 * * *", "description": "Daily at 8am"}', '[{"field": "ecs_expiry_date", "operator": "within_days", "value": 30}]', '[{"type": "notification", "config": {"title": "ECS Card Expiring", "message": "ECS card for {{employee_name}} expires on {{ecs_expiry_date}}"}}]', true),

-- Job Automations
('Job Progress Complete', 'Triggers when job progress reaches 100%', 'jobs', 'field_change', '{"table": "jobs", "field": "progress"}', '[{"field": "progress", "operator": "equals", "value": 100}]', '[{"type": "update_field", "config": {"table": "jobs", "field": "status", "value": "Completed"}}, {"type": "notification", "config": {"title": "Job Completed", "message": "{{job_title}} has been marked as complete"}}]', true),

('Job Overdue Alert', 'Alerts when jobs pass their end date without completion', 'jobs', 'schedule', '{"schedule": "0 9 * * *", "description": "Daily at 9am"}', '[{"field": "end_date", "operator": "is_past", "value": null}, {"field": "status", "operator": "not_equals", "value": "Completed"}]', '[{"type": "notification", "config": {"title": "Job Overdue", "message": "{{job_title}} is past its deadline", "priority": "high"}}]', true),

('New Worker Assignment', 'Notifies workers when assigned to a new job', 'jobs', 'record_created', '{"table": "job_assignments"}', '[]', '[{"type": "notification", "config": {"title": "New Job Assignment", "message": "You have been assigned to {{job_title}}"}}, {"type": "email", "config": {"template": "job_assignment"}}]', true),

-- Finance Automations
('Invoice Overdue Reminder', 'Sends reminders for overdue invoices', 'finance', 'schedule', '{"schedule": "0 9 * * *", "description": "Daily at 9am"}', '[{"field": "due_date", "operator": "is_past", "value": null}, {"field": "status", "operator": "equals", "value": "Sent"}]', '[{"type": "notification", "config": {"title": "Invoice Overdue", "message": "Invoice {{invoice_number}} for {{client}} is overdue"}}, {"type": "email", "config": {"template": "invoice_overdue_reminder"}}]', true),

('Quote Expiry Warning', 'Alerts when quotes are about to expire', 'finance', 'schedule', '{"schedule": "0 9 * * *", "description": "Daily at 9am"}', '[{"field": "valid_until", "operator": "within_days", "value": 3}, {"field": "status", "operator": "equals", "value": "Sent"}]', '[{"type": "notification", "config": {"title": "Quote Expiring Soon", "message": "Quote {{quote_number}} for {{client}} expires in 3 days"}}]', true),

('Auto-Create Invoice on Job Completion', 'Creates draft invoice when job is completed', 'finance', 'field_change', '{"table": "jobs", "field": "status"}', '[{"field": "status", "operator": "equals", "value": "Completed"}, {"field": "value", "operator": "greater_than", "value": 0}]', '[{"type": "create_record", "config": {"table": "invoices", "template": "from_job"}}]', true),

-- HR Automations
('Timesheet Reminder', 'Reminds employees to submit timesheets on Friday', 'hr', 'schedule', '{"schedule": "0 16 * * 5", "description": "Friday at 4pm"}', '[]', '[{"type": "notification", "config": {"title": "Timesheet Reminder", "message": "Please submit your timesheet for this week"}}, {"type": "email", "config": {"template": "timesheet_reminder"}}]', true),

('Leave Request Submitted', 'Notifies supervisors when leave is requested', 'hr', 'record_created', '{"table": "leave_requests"}', '[]', '[{"type": "notification", "config": {"title": "Leave Request", "message": "{{employee_name}} has requested {{total_days}} days leave from {{start_date}}"}}]', true),

('Work Anniversary', 'Celebrates employee work anniversaries', 'hr', 'schedule', '{"schedule": "0 9 * * *", "description": "Daily at 9am"}', '[{"field": "join_date", "operator": "anniversary_today", "value": null}]', '[{"type": "notification", "config": {"title": "Work Anniversary", "message": "{{employee_name}} is celebrating their work anniversary today!"}}]', true);