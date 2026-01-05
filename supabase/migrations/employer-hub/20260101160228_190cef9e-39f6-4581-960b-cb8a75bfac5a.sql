-- ELEC-MATE Database Schema
-- Complete schema for electrical contractor workforce management

-- =====================================================
-- EMPLOYEES TABLE
-- =====================================================
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Electrician',
  team_role TEXT NOT NULL DEFAULT 'Team Member',
  status TEXT NOT NULL DEFAULT 'Active',
  phone TEXT,
  email TEXT,
  avatar_initials TEXT NOT NULL,
  photo_url TEXT,
  hourly_rate NUMERIC NOT NULL DEFAULT 25.00,
  join_date DATE,
  certifications_count INTEGER NOT NULL DEFAULT 0,
  active_jobs_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- JOBS TABLE
-- =====================================================
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  location TEXT NOT NULL,
  lat NUMERIC,
  lng NUMERIC,
  status TEXT NOT NULL DEFAULT 'Active',
  progress INTEGER NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  workers_count INTEGER NOT NULL DEFAULT 0,
  value NUMERIC,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- WORKER LOCATIONS TABLE (Real-time GPS tracking)
-- =====================================================
CREATE TABLE public.worker_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  accuracy NUMERIC,
  status TEXT NOT NULL DEFAULT 'Off Duty',
  checked_in_at TIMESTAMPTZ,
  checked_out_at TIMESTAMPTZ,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- TIMESHEETS TABLE
-- =====================================================
CREATE TABLE public.timesheets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  break_minutes INTEGER NOT NULL DEFAULT 0,
  total_hours NUMERIC,
  status TEXT NOT NULL DEFAULT 'Pending',
  notes TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- LEAVE REQUESTS TABLE
-- =====================================================
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  employee_name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'annual',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  half_day TEXT,
  total_days NUMERIC NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending',
  reason TEXT,
  approved_by TEXT,
  approved_date TIMESTAMPTZ,
  rejected_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- CERTIFICATIONS TABLE
-- =====================================================
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_body TEXT,
  certificate_number TEXT,
  issue_date DATE,
  expiry_date DATE,
  status TEXT NOT NULL DEFAULT 'Valid',
  document_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_worker_locations_employee ON public.worker_locations(employee_id);
CREATE INDEX idx_worker_locations_job ON public.worker_locations(job_id);
CREATE INDEX idx_worker_locations_status ON public.worker_locations(status);
CREATE INDEX idx_timesheets_employee ON public.timesheets(employee_id);
CREATE INDEX idx_timesheets_job ON public.timesheets(job_id);
CREATE INDEX idx_timesheets_date ON public.timesheets(date);
CREATE INDEX idx_timesheets_status ON public.timesheets(status);
CREATE INDEX idx_leave_requests_employee ON public.leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON public.leave_requests(status);
CREATE INDEX idx_certifications_employee ON public.certifications(employee_id);
CREATE INDEX idx_certifications_expiry ON public.certifications(expiry_date);
CREATE INDEX idx_jobs_status ON public.jobs(status);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES (Permissive for development - tighten with auth later)
-- =====================================================
CREATE POLICY "Allow all access to employees" ON public.employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to jobs" ON public.jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to worker_locations" ON public.worker_locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to timesheets" ON public.timesheets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to leave_requests" ON public.leave_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to certifications" ON public.certifications FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- ENABLE REALTIME FOR WORKER LOCATIONS
-- =====================================================
ALTER TABLE public.worker_locations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.worker_locations;

-- =====================================================
-- SEED DATA: EMPLOYEES
-- =====================================================
INSERT INTO public.employees (name, role, team_role, status, phone, email, avatar_initials, hourly_rate, join_date, certifications_count, active_jobs_count) VALUES
  ('James Wilson', 'Lead Electrician', 'Site Supervisor', 'Active', '07700 900123', 'james.wilson@elecmate.co.uk', 'JW', 35.00, '2020-03-15', 5, 2),
  ('Sarah Mitchell', 'Electrician', 'Team Member', 'Active', '07700 900124', 'sarah.mitchell@elecmate.co.uk', 'SM', 28.00, '2021-06-01', 4, 1),
  ('David Brown', 'Apprentice', 'Trainee', 'Active', '07700 900125', 'david.brown@elecmate.co.uk', 'DB', 15.00, '2024-09-01', 1, 1),
  ('Emma Thompson', 'Electrician', 'Team Member', 'Active', '07700 900126', 'emma.thompson@elecmate.co.uk', 'ET', 28.00, '2022-01-10', 3, 2),
  ('Michael Clarke', 'Lead Electrician', 'Project Manager', 'Active', '07700 900127', 'michael.clarke@elecmate.co.uk', 'MC', 40.00, '2019-05-20', 6, 3),
  ('Lucy Adams', 'Electrician', 'Team Member', 'On Leave', '07700 900128', 'lucy.adams@elecmate.co.uk', 'LA', 28.00, '2023-02-14', 3, 0);

-- =====================================================
-- SEED DATA: JOBS
-- =====================================================
INSERT INTO public.jobs (title, client, location, lat, lng, status, progress, start_date, end_date, workers_count, value, description) VALUES
  ('Manchester Arena Rewire', 'ASM Global', 'Manchester Arena, M3 1AR', 53.4875, -2.2436, 'Active', 65, '2024-11-01', '2025-02-28', 4, 125000.00, 'Complete electrical rewiring of arena facilities'),
  ('Liverpool Docks Office Fit-out', 'Peel Holdings', 'Royal Albert Dock, L3 4BB', 53.4014, -2.9925, 'Active', 30, '2024-12-15', '2025-04-30', 3, 85000.00, 'New office electrical installation'),
  ('Birmingham New Build - Phase 2', 'Barratt Homes', 'Digbeth, B5 6DY', 52.4747, -1.8900, 'Active', 80, '2024-08-01', '2025-01-31', 5, 210000.00, 'Residential development electrical works'),
  ('Leeds Hospital Extension', 'NHS Trust', 'St James Hospital, LS9 7TF', 53.8067, -1.5210, 'Pending', 0, '2025-02-01', '2025-08-31', 0, 340000.00, 'New wing electrical infrastructure'),
  ('Sheffield Retail Park', 'Meadowhall Ltd', 'Meadowhall Way, S9 1EP', 53.4151, -1.4109, 'Completed', 100, '2024-06-01', '2024-12-15', 0, 95000.00, 'Retail unit electrical installations');

-- =====================================================
-- SEED DATA: WORKER LOCATIONS
-- =====================================================
INSERT INTO public.worker_locations (employee_id, job_id, lat, lng, accuracy, status, checked_in_at) 
SELECT 
  e.id,
  j.id,
  j.lat + (random() - 0.5) * 0.001,
  j.lng + (random() - 0.5) * 0.001,
  10.0,
  'On Site',
  now() - interval '2 hours'
FROM public.employees e
CROSS JOIN public.jobs j
WHERE e.name = 'James Wilson' AND j.title = 'Manchester Arena Rewire';

INSERT INTO public.worker_locations (employee_id, job_id, lat, lng, accuracy, status, checked_in_at) 
SELECT 
  e.id,
  j.id,
  j.lat + (random() - 0.5) * 0.001,
  j.lng + (random() - 0.5) * 0.001,
  15.0,
  'On Site',
  now() - interval '1 hour'
FROM public.employees e
CROSS JOIN public.jobs j
WHERE e.name = 'Sarah Mitchell' AND j.title = 'Liverpool Docks Office Fit-out';

INSERT INTO public.worker_locations (employee_id, job_id, lat, lng, accuracy, status, checked_in_at) 
SELECT 
  e.id,
  j.id,
  j.lat + (random() - 0.5) * 0.001,
  j.lng + (random() - 0.5) * 0.001,
  8.0,
  'On Site',
  now() - interval '3 hours'
FROM public.employees e
CROSS JOIN public.jobs j
WHERE e.name = 'Emma Thompson' AND j.title = 'Birmingham New Build - Phase 2';

INSERT INTO public.worker_locations (employee_id, job_id, lat, lng, accuracy, status) 
SELECT 
  e.id,
  NULL,
  53.4808,
  -2.2426,
  20.0,
  'En Route'
FROM public.employees e
WHERE e.name = 'David Brown';

INSERT INTO public.worker_locations (employee_id, job_id, lat, lng, accuracy, status) 
SELECT 
  e.id,
  NULL,
  53.4831,
  -2.2448,
  50.0,
  'Off Duty'
FROM public.employees e
WHERE e.name = 'Michael Clarke';

-- =====================================================
-- SEED DATA: CERTIFICATIONS
-- =====================================================
INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'ECS Gold Card', 'JIB', 'ECS-2024-001234', '2024-01-15', '2027-01-15', 'Valid'
FROM public.employees e WHERE e.name = 'James Wilson';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, '18th Edition Wiring Regulations', 'City & Guilds', 'CG-2382-56789', '2023-06-01', '2028-06-01', 'Valid'
FROM public.employees e WHERE e.name = 'James Wilson';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'ECS Gold Card', 'JIB', 'ECS-2024-001235', '2024-03-20', '2027-03-20', 'Valid'
FROM public.employees e WHERE e.name = 'Sarah Mitchell';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'CSCS Green Card', 'CSCS', 'CSCS-2024-98765', '2024-09-01', '2029-09-01', 'Valid'
FROM public.employees e WHERE e.name = 'David Brown';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'First Aid at Work', 'St John Ambulance', 'FA-2023-11111', '2023-03-15', '2024-03-15', 'Expired'
FROM public.employees e WHERE e.name = 'Emma Thompson';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'ECS Gold Card', 'JIB', 'ECS-2023-001100', '2023-05-20', '2026-05-20', 'Valid'
FROM public.employees e WHERE e.name = 'Michael Clarke';

INSERT INTO public.certifications (employee_id, name, issuing_body, certificate_number, issue_date, expiry_date, status)
SELECT e.id, 'IPAF Operator License', 'IPAF', 'IPAF-2024-22222', '2024-08-01', '2025-02-01', 'Expiring Soon'
FROM public.employees e WHERE e.name = 'Michael Clarke';