-- ============================================================
-- College Hub Tables Migration
-- Creates 11 tables for the College Hub feature set
-- Each table matches the TypeScript interfaces in src/services/college/
-- ============================================================

-- ============================================================
-- 1. colleges (parent institution table)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  address TEXT,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "colleges_select" ON public.colleges
  FOR SELECT USING (true);

CREATE POLICY "colleges_insert" ON public.colleges
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "colleges_update" ON public.colleges
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "colleges_delete" ON public.colleges
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- 2. college_staff
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('tutor', 'head_of_department', 'support', 'admin')),
  department TEXT,
  specialisations TEXT[],
  teaching_qual TEXT,
  assessor_qual TEXT,
  iqa_qual TEXT,
  max_teaching_hours INTEGER,
  status TEXT DEFAULT 'Active',
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_staff_select" ON public.college_staff
  FOR SELECT USING (true);

CREATE POLICY "college_staff_insert" ON public.college_staff
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_staff_update" ON public.college_staff
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_staff_delete" ON public.college_staff
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_staff_college_id ON public.college_staff(college_id);
CREATE INDEX idx_college_staff_role ON public.college_staff(role);
CREATE INDEX idx_college_staff_status ON public.college_staff(status);

-- ============================================================
-- 3. college_courses
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  level TEXT,
  awarding_body TEXT,
  duration_months INTEGER,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_courses_select" ON public.college_courses
  FOR SELECT USING (true);

CREATE POLICY "college_courses_insert" ON public.college_courses
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_courses_update" ON public.college_courses
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_courses_delete" ON public.college_courses
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_courses_college_id ON public.college_courses(college_id);
CREATE INDEX idx_college_courses_status ON public.college_courses(status);

-- ============================================================
-- 4. college_cohorts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  course_id UUID REFERENCES public.college_courses(id) ON DELETE SET NULL,
  tutor_id UUID REFERENCES public.college_staff(id) ON DELETE SET NULL,
  start_date DATE,
  end_date DATE,
  max_students INTEGER,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_cohorts_select" ON public.college_cohorts
  FOR SELECT USING (true);

CREATE POLICY "college_cohorts_insert" ON public.college_cohorts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_cohorts_update" ON public.college_cohorts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_cohorts_delete" ON public.college_cohorts
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_cohorts_college_id ON public.college_cohorts(college_id);
CREATE INDEX idx_college_cohorts_course_id ON public.college_cohorts(course_id);
CREATE INDEX idx_college_cohorts_tutor_id ON public.college_cohorts(tutor_id);
CREATE INDEX idx_college_cohorts_status ON public.college_cohorts(status);

-- ============================================================
-- 5. college_students
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  uln TEXT,
  cohort_id UUID REFERENCES public.college_cohorts(id) ON DELETE SET NULL,
  employer_id UUID,
  course_id UUID REFERENCES public.college_courses(id) ON DELETE SET NULL,
  start_date DATE,
  expected_end_date DATE,
  status TEXT DEFAULT 'Active',
  progress_percent INTEGER DEFAULT 0,
  risk_level TEXT DEFAULT 'Low',
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_students_select" ON public.college_students
  FOR SELECT USING (true);

CREATE POLICY "college_students_insert" ON public.college_students
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_students_update" ON public.college_students
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_students_delete" ON public.college_students
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_students_college_id ON public.college_students(college_id);
CREATE INDEX idx_college_students_cohort_id ON public.college_students(cohort_id);
CREATE INDEX idx_college_students_course_id ON public.college_students(course_id);
CREATE INDEX idx_college_students_status ON public.college_students(status);
CREATE INDEX idx_college_students_risk_level ON public.college_students(risk_level);

-- ============================================================
-- 6. college_attendance
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.college_students(id) ON DELETE CASCADE,
  cohort_id UUID REFERENCES public.college_cohorts(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('Present', 'Absent', 'Late', 'Authorised')),
  notes TEXT,
  recorded_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_attendance_select" ON public.college_attendance
  FOR SELECT USING (true);

CREATE POLICY "college_attendance_insert" ON public.college_attendance
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_attendance_update" ON public.college_attendance
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_attendance_delete" ON public.college_attendance
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_attendance_student_id ON public.college_attendance(student_id);
CREATE INDEX idx_college_attendance_cohort_id ON public.college_attendance(cohort_id);
CREATE INDEX idx_college_attendance_date ON public.college_attendance(date);

-- ============================================================
-- 7. college_grades
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.college_students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.college_courses(id) ON DELETE SET NULL,
  unit_name TEXT,
  assessment_type TEXT,
  grade TEXT,
  score NUMERIC,
  feedback TEXT,
  assessed_by UUID,
  assessed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_grades_select" ON public.college_grades
  FOR SELECT USING (true);

CREATE POLICY "college_grades_insert" ON public.college_grades
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_grades_update" ON public.college_grades
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_grades_delete" ON public.college_grades
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_grades_student_id ON public.college_grades(student_id);
CREATE INDEX idx_college_grades_course_id ON public.college_grades(course_id);
CREATE INDEX idx_college_grades_status ON public.college_grades(status);

-- ============================================================
-- 8. college_ilps (Individual Learning Plans)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_ilps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.college_students(id) ON DELETE CASCADE,
  targets JSONB,
  support_needs TEXT,
  review_date DATE,
  last_reviewed TIMESTAMPTZ,
  reviewed_by UUID,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_ilps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_ilps_select" ON public.college_ilps
  FOR SELECT USING (true);

CREATE POLICY "college_ilps_insert" ON public.college_ilps
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_ilps_update" ON public.college_ilps
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_ilps_delete" ON public.college_ilps
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_ilps_student_id ON public.college_ilps(student_id);
CREATE INDEX idx_college_ilps_status ON public.college_ilps(status);
CREATE INDEX idx_college_ilps_review_date ON public.college_ilps(review_date);

-- ============================================================
-- 9. college_epa (End Point Assessment)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_epa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.college_students(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Pre-Gateway', 'Gateway Ready', 'Complete')),
  gateway_date DATE,
  epa_date DATE,
  result TEXT,
  notes TEXT,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_epa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_epa_select" ON public.college_epa
  FOR SELECT USING (true);

CREATE POLICY "college_epa_insert" ON public.college_epa
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_epa_update" ON public.college_epa
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_epa_delete" ON public.college_epa
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_epa_student_id ON public.college_epa(student_id);
CREATE INDEX idx_college_epa_status ON public.college_epa(status);
CREATE INDEX idx_college_epa_epa_date ON public.college_epa(epa_date);

-- ============================================================
-- 10. college_lesson_plans
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_lesson_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  cohort_id UUID REFERENCES public.college_cohorts(id) ON DELETE SET NULL,
  tutor_id UUID REFERENCES public.college_staff(id) ON DELETE SET NULL,
  scheduled_date DATE,
  duration_minutes INTEGER,
  objectives TEXT,
  content JSONB,
  resources TEXT[],
  status TEXT DEFAULT 'Draft',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_lesson_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_lesson_plans_select" ON public.college_lesson_plans
  FOR SELECT USING (true);

CREATE POLICY "college_lesson_plans_insert" ON public.college_lesson_plans
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_lesson_plans_update" ON public.college_lesson_plans
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "college_lesson_plans_delete" ON public.college_lesson_plans
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_lesson_plans_college_id ON public.college_lesson_plans(college_id);
CREATE INDEX idx_college_lesson_plans_cohort_id ON public.college_lesson_plans(cohort_id);
CREATE INDEX idx_college_lesson_plans_tutor_id ON public.college_lesson_plans(tutor_id);
CREATE INDEX idx_college_lesson_plans_scheduled_date ON public.college_lesson_plans(scheduled_date);
CREATE INDEX idx_college_lesson_plans_status ON public.college_lesson_plans(status);

-- ============================================================
-- 11. college_activity (audit/activity log)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
  actor_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "college_activity_select" ON public.college_activity
  FOR SELECT USING (true);

CREATE POLICY "college_activity_insert" ON public.college_activity
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "college_activity_delete" ON public.college_activity
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX idx_college_activity_college_id ON public.college_activity(college_id);
CREATE INDEX idx_college_activity_actor_id ON public.college_activity(actor_id);
CREATE INDEX idx_college_activity_entity ON public.college_activity(entity_type, entity_id);
CREATE INDEX idx_college_activity_created_at ON public.college_activity(created_at DESC);

-- ============================================================
-- SEED DATA: Northgate Technical College
-- ============================================================

-- College
INSERT INTO public.colleges (id, name, code, address, settings)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Northgate Technical College',
  'NTC',
  '15 Northgate Road, Newcastle upon Tyne, NE1 5XL',
  '{"academic_year": "2025-26", "ofsted_rating": "Good", "apprenticeship_levy": true}'::jsonb
);

-- Staff (4 members)
INSERT INTO public.college_staff (id, college_id, name, email, phone, role, department, specialisations, teaching_qual, assessor_qual, iqa_qual, max_teaching_hours, status)
VALUES
  (
    '11111111-aaaa-4000-8000-000000000001',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Sarah Mitchell',
    's.mitchell@northgate.ac.uk',
    '0191 555 0101',
    'head_of_department',
    'Electrical Installation',
    ARRAY['BS 7671', '18th Edition', 'Inspection & Testing'],
    'CertEd',
    'D32/D33',
    'V1 Award',
    20,
    'Active'
  ),
  (
    '11111111-aaaa-4000-8000-000000000002',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'James Cooper',
    'j.cooper@northgate.ac.uk',
    '0191 555 0102',
    'tutor',
    'Electrical Installation',
    ARRAY['Wiring Regulations', 'PAT Testing', 'Fault Finding'],
    'PGCE',
    'A1 Award',
    NULL,
    30,
    'Active'
  ),
  (
    '11111111-aaaa-4000-8000-000000000003',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Helen Clarke',
    'h.clarke@northgate.ac.uk',
    '0191 555 0103',
    'tutor',
    'Electrical Installation',
    ARRAY['Design & Verification', 'Solar PV', 'EV Charging'],
    'CertEd',
    'A1 Award',
    NULL,
    28,
    'Active'
  ),
  (
    '11111111-aaaa-4000-8000-000000000004',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'David Park',
    'd.park@northgate.ac.uk',
    '0191 555 0104',
    'admin',
    'Electrical Installation',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Active'
  );

-- Courses (2)
INSERT INTO public.college_courses (id, college_id, name, code, level, awarding_body, duration_months, status)
VALUES
  (
    '22222222-bbbb-4000-8000-000000000001',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Installation Electrician Apprenticeship',
    'C&G 5357-02',
    'Level 2',
    'City & Guilds',
    24,
    'Active'
  ),
  (
    '22222222-bbbb-4000-8000-000000000002',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Electrotechnical Apprenticeship',
    'C&G 5357-03',
    'Level 3',
    'City & Guilds',
    36,
    'Active'
  );

-- Cohorts (2)
INSERT INTO public.college_cohorts (id, college_id, name, course_id, tutor_id, start_date, end_date, max_students, status)
VALUES
  (
    '33333333-cccc-4000-8000-000000000001',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'L2 Electrical 2025-A',
    '22222222-bbbb-4000-8000-000000000001',
    '11111111-aaaa-4000-8000-000000000002',
    '2025-09-08',
    '2027-07-18',
    16,
    'Active'
  ),
  (
    '33333333-cccc-4000-8000-000000000002',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'L3 Electrotechnical 2025-A',
    '22222222-bbbb-4000-8000-000000000002',
    '11111111-aaaa-4000-8000-000000000003',
    '2025-09-08',
    '2028-07-14',
    12,
    'Active'
  );

-- Students (6 across 2 cohorts)
INSERT INTO public.college_students (id, college_id, name, email, phone, uln, cohort_id, course_id, start_date, expected_end_date, status, progress_percent, risk_level)
VALUES
  (
    '44444444-dddd-4000-8000-000000000001',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Ryan Hughes',
    'r.hughes@student.northgate.ac.uk',
    '07700 100001',
    '1234567890',
    '33333333-cccc-4000-8000-000000000001',
    '22222222-bbbb-4000-8000-000000000001',
    '2025-09-08',
    '2027-07-18',
    'Active',
    35,
    'Low'
  ),
  (
    '44444444-dddd-4000-8000-000000000002',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Amy Watson',
    'a.watson@student.northgate.ac.uk',
    '07700 100002',
    '1234567891',
    '33333333-cccc-4000-8000-000000000001',
    '22222222-bbbb-4000-8000-000000000001',
    '2025-09-08',
    '2027-07-18',
    'Active',
    42,
    'Low'
  ),
  (
    '44444444-dddd-4000-8000-000000000003',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Tom Blackwell',
    't.blackwell@student.northgate.ac.uk',
    '07700 100003',
    '1234567892',
    '33333333-cccc-4000-8000-000000000001',
    '22222222-bbbb-4000-8000-000000000001',
    '2025-09-08',
    '2027-07-18',
    'Active',
    18,
    'High'
  ),
  (
    '44444444-dddd-4000-8000-000000000004',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Lisa Fenwick',
    'l.fenwick@student.northgate.ac.uk',
    '07700 100004',
    '1234567893',
    '33333333-cccc-4000-8000-000000000002',
    '22222222-bbbb-4000-8000-000000000002',
    '2025-09-08',
    '2028-07-14',
    'Active',
    55,
    'Low'
  ),
  (
    '44444444-dddd-4000-8000-000000000005',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Mark Stephenson',
    'm.stephenson@student.northgate.ac.uk',
    '07700 100005',
    '1234567894',
    '33333333-cccc-4000-8000-000000000002',
    '22222222-bbbb-4000-8000-000000000002',
    '2025-09-08',
    '2028-07-14',
    'Active',
    48,
    'Medium'
  ),
  (
    '44444444-dddd-4000-8000-000000000006',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Katie Robinson',
    'k.robinson@student.northgate.ac.uk',
    '07700 100006',
    '1234567895',
    '33333333-cccc-4000-8000-000000000002',
    '22222222-bbbb-4000-8000-000000000002',
    '2025-09-08',
    '2028-07-14',
    'Active',
    60,
    'Low'
  );

-- Attendance (sample week for cohort 1)
INSERT INTO public.college_attendance (student_id, cohort_id, date, status, recorded_by)
VALUES
  ('44444444-dddd-4000-8000-000000000001', '33333333-cccc-4000-8000-000000000001', '2026-02-10', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000002', '33333333-cccc-4000-8000-000000000001', '2026-02-10', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000003', '33333333-cccc-4000-8000-000000000001', '2026-02-10', 'Absent', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000001', '33333333-cccc-4000-8000-000000000001', '2026-02-11', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000002', '33333333-cccc-4000-8000-000000000001', '2026-02-11', 'Late', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000003', '33333333-cccc-4000-8000-000000000001', '2026-02-11', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000001', '33333333-cccc-4000-8000-000000000001', '2026-02-12', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000002', '33333333-cccc-4000-8000-000000000001', '2026-02-12', 'Present', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000003', '33333333-cccc-4000-8000-000000000001', '2026-02-12', 'Authorised', '11111111-aaaa-4000-8000-000000000002'),
  -- Cohort 2 attendance
  ('44444444-dddd-4000-8000-000000000004', '33333333-cccc-4000-8000-000000000002', '2026-02-10', 'Present', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000005', '33333333-cccc-4000-8000-000000000002', '2026-02-10', 'Present', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000006', '33333333-cccc-4000-8000-000000000002', '2026-02-10', 'Present', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000004', '33333333-cccc-4000-8000-000000000002', '2026-02-11', 'Present', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000005', '33333333-cccc-4000-8000-000000000002', '2026-02-11', 'Late', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000006', '33333333-cccc-4000-8000-000000000002', '2026-02-11', 'Present', '11111111-aaaa-4000-8000-000000000003');

-- Grades (sample assessments)
INSERT INTO public.college_grades (student_id, course_id, unit_name, assessment_type, grade, score, feedback, assessed_by, assessed_at, status)
VALUES
  ('44444444-dddd-4000-8000-000000000001', '22222222-bbbb-4000-8000-000000000001', 'Health & Safety in Electrical Installation', 'Written Assessment', 'Pass', 78, 'Good understanding of safe isolation procedures. Review PPE selection criteria.', '11111111-aaaa-4000-8000-000000000002', '2026-01-20 14:30:00+00', 'Graded'),
  ('44444444-dddd-4000-8000-000000000002', '22222222-bbbb-4000-8000-000000000001', 'Health & Safety in Electrical Installation', 'Written Assessment', 'Merit', 85, 'Excellent responses throughout. Well-structured answers on risk assessment.', '11111111-aaaa-4000-8000-000000000002', '2026-01-20 14:30:00+00', 'Verified'),
  ('44444444-dddd-4000-8000-000000000003', '22222222-bbbb-4000-8000-000000000001', 'Health & Safety in Electrical Installation', 'Written Assessment', NULL, NULL, NULL, NULL, NULL, 'Pending'),
  ('44444444-dddd-4000-8000-000000000001', '22222222-bbbb-4000-8000-000000000001', 'Electrical Science & Principles', 'Practical Assessment', 'Pass', 72, 'Met all criteria. Continue practising Ohms law calculations.', '11111111-aaaa-4000-8000-000000000002', '2026-02-05 10:00:00+00', 'Graded'),
  ('44444444-dddd-4000-8000-000000000004', '22222222-bbbb-4000-8000-000000000002', 'Principles of Electrical Science', 'Written Assessment', 'Distinction', 92, 'Outstanding work. Deep understanding of electromagnetic induction.', '11111111-aaaa-4000-8000-000000000003', '2026-01-28 11:00:00+00', 'Verified'),
  ('44444444-dddd-4000-8000-000000000005', '22222222-bbbb-4000-8000-000000000002', 'Principles of Electrical Science', 'Written Assessment', NULL, NULL, NULL, NULL, NULL, 'Submitted'),
  ('44444444-dddd-4000-8000-000000000006', '22222222-bbbb-4000-8000-000000000002', 'Principles of Electrical Science', 'Written Assessment', 'Merit', 82, 'Solid work across all sections. Minor gaps in power factor correction.', '11111111-aaaa-4000-8000-000000000003', '2026-01-28 11:00:00+00', 'Graded');

-- ILPs (for each student)
INSERT INTO public.college_ilps (student_id, targets, support_needs, review_date, last_reviewed, reviewed_by, status)
VALUES
  (
    '44444444-dddd-4000-8000-000000000001',
    '[{"description": "Complete H&S practical assessment", "target_date": "2026-03-15", "status": "In Progress"}, {"description": "Improve maths skills for cable calculations", "target_date": "2026-04-01", "status": "Pending"}]'::jsonb,
    'Additional maths support sessions',
    '2026-03-01',
    '2026-02-01 10:00:00+00',
    '11111111-aaaa-4000-8000-000000000002',
    'Active'
  ),
  (
    '44444444-dddd-4000-8000-000000000002',
    '[{"description": "Submit portfolio evidence for Unit 2", "target_date": "2026-02-28", "status": "In Progress"}, {"description": "Attend site visit at employer premises", "target_date": "2026-03-10", "status": "Pending"}]'::jsonb,
    NULL,
    '2026-03-01',
    '2026-02-01 10:00:00+00',
    '11111111-aaaa-4000-8000-000000000002',
    'Active'
  ),
  (
    '44444444-dddd-4000-8000-000000000003',
    '[{"description": "Improve attendance to 90%+", "target_date": "2026-03-31", "status": "Pending"}, {"description": "Complete overdue H&S assessment", "target_date": "2026-02-28", "status": "Overdue"}, {"description": "Meet with tutor weekly for catch-up", "target_date": "2026-04-01", "status": "In Progress"}]'::jsonb,
    'Attendance monitoring, weekly check-ins, possible learning support assessment',
    '2026-02-15',
    '2026-01-15 10:00:00+00',
    '11111111-aaaa-4000-8000-000000000002',
    'Active'
  ),
  (
    '44444444-dddd-4000-8000-000000000004',
    '[{"description": "Begin gateway preparation portfolio", "target_date": "2026-06-01", "status": "In Progress"}, {"description": "Complete design project for Unit 5", "target_date": "2026-03-20", "status": "In Progress"}]'::jsonb,
    NULL,
    '2026-03-15',
    '2026-02-10 11:00:00+00',
    '11111111-aaaa-4000-8000-000000000003',
    'Active'
  ),
  (
    '44444444-dddd-4000-8000-000000000005',
    '[{"description": "Submit outstanding written assessment", "target_date": "2026-02-21", "status": "Overdue"}, {"description": "Improve practical skills in conduit bending", "target_date": "2026-04-01", "status": "In Progress"}]'::jsonb,
    'Extra workshop time for practical skills',
    '2026-02-20',
    '2026-01-20 11:00:00+00',
    '11111111-aaaa-4000-8000-000000000003',
    'Active'
  ),
  (
    '44444444-dddd-4000-8000-000000000006',
    '[{"description": "Complete EV charging point installation evidence", "target_date": "2026-03-30", "status": "In Progress"}, {"description": "Prepare for mock EPA interview", "target_date": "2026-05-01", "status": "Pending"}]'::jsonb,
    NULL,
    '2026-03-15',
    '2026-02-10 11:00:00+00',
    '11111111-aaaa-4000-8000-000000000003',
    'Active'
  );

-- EPA records
INSERT INTO public.college_epa (student_id, status, gateway_date, epa_date, result, notes, updated_by)
VALUES
  ('44444444-dddd-4000-8000-000000000001', 'In Progress', NULL, NULL, NULL, 'Working through Level 2 units, on track for gateway Q1 2027', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000002', 'In Progress', NULL, NULL, NULL, 'Good progress, potential early gateway candidate', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000003', 'Not Started', NULL, NULL, NULL, 'Attendance issues delaying progress', '11111111-aaaa-4000-8000-000000000002'),
  ('44444444-dddd-4000-8000-000000000004', 'Pre-Gateway', '2026-06-01', '2026-09-15', NULL, 'Preparing gateway portfolio. Strong candidate for distinction.', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000005', 'In Progress', NULL, NULL, NULL, 'Needs to submit outstanding assessment before gateway discussion', '11111111-aaaa-4000-8000-000000000003'),
  ('44444444-dddd-4000-8000-000000000006', 'Gateway Ready', '2026-04-01', '2026-07-15', NULL, 'All gateway criteria met. EPA booked with EPAO.', '11111111-aaaa-4000-8000-000000000003');

-- Lesson Plans (upcoming)
INSERT INTO public.college_lesson_plans (college_id, title, cohort_id, tutor_id, scheduled_date, duration_minutes, objectives, content, resources, status)
VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Safe Isolation Procedures',
    '33333333-cccc-4000-8000-000000000001',
    '11111111-aaaa-4000-8000-000000000002',
    '2026-02-17',
    180,
    'Understand and demonstrate safe isolation procedures per GN3',
    '{"introduction": "Lock-off procedures overview", "main_activity": "Practical safe isolation on training boards", "assessment": "Observed practical assessment", "plenary": "Q&A and review"}'::jsonb,
    ARRAY['GN3 Guidance Note', 'Safe isolation kit', 'Training board panels', 'Lock-off devices'],
    'Approved'
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Cable Selection & Sizing',
    '33333333-cccc-4000-8000-000000000001',
    '11111111-aaaa-4000-8000-000000000002',
    '2026-02-19',
    180,
    'Calculate cable sizes using BS 7671 Appendix 4 and apply correction factors',
    '{"introduction": "Design current and correction factors", "main_activity": "Worked examples using Appendix 4 tables", "assessment": "Calculation worksheet", "plenary": "Common errors review"}'::jsonb,
    ARRAY['BS 7671:2018+A2:2022', 'On-Site Guide', 'Scientific calculators', 'Worked example handouts'],
    'Draft'
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Three-Phase Systems Theory',
    '33333333-cccc-4000-8000-000000000002',
    '11111111-aaaa-4000-8000-000000000003',
    '2026-02-18',
    180,
    'Understand star and delta configurations, calculate line and phase voltages/currents',
    '{"introduction": "Recap single-phase principles", "main_activity": "Star-delta calculations and phasor diagrams", "assessment": "Formative quiz", "plenary": "Industrial applications discussion"}'::jsonb,
    ARRAY['Phasor diagram worksheets', 'Three-phase training panel', 'Multimeters'],
    'Approved'
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Inspection & Testing: Ring Final Circuits',
    '33333333-cccc-4000-8000-000000000002',
    '11111111-aaaa-4000-8000-000000000003',
    '2026-02-20',
    240,
    'Conduct ring final circuit tests using three-lead method per GN3',
    '{"introduction": "Theory of ring continuity testing", "main_activity": "Practical testing on training installation", "assessment": "Completed schedule of results", "plenary": "Common faults and interpretation"}'::jsonb,
    ARRAY['GN3 9th Edition', 'Multifunction testers', 'Training installation', 'Schedule of results forms'],
    'Approved'
  );

-- Activity log (recent entries)
INSERT INTO public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000002', 'recorded_attendance', 'cohort', '33333333-cccc-4000-8000-000000000001', '{"date": "2026-02-12", "present": 2, "absent": 0, "late": 0, "authorised": 1}'::jsonb),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000002', 'graded_assessment', 'student', '44444444-dddd-4000-8000-000000000001', '{"unit": "Electrical Science & Principles", "grade": "Pass", "score": 72}'::jsonb),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000003', 'updated_epa_status', 'student', '44444444-dddd-4000-8000-000000000006', '{"previous_status": "Pre-Gateway", "new_status": "Gateway Ready"}'::jsonb),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000003', 'approved_lesson_plan', 'lesson_plan', NULL, '{"title": "Three-Phase Systems Theory", "scheduled_date": "2026-02-18"}'::jsonb),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000001', 'reviewed_ilp', 'student', '44444444-dddd-4000-8000-000000000003', '{"concern": "Attendance below 80%, at-risk flag raised"}'::jsonb),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11111111-aaaa-4000-8000-000000000002', 'created_lesson_plan', 'lesson_plan', NULL, '{"title": "Cable Selection & Sizing", "scheduled_date": "2026-02-19"}'::jsonb);
