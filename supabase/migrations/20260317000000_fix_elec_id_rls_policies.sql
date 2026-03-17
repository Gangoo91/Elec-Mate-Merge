-- Fix ELE-366: Elec-ID data tables are locked to employers only.
-- Replace "Employer access only" ALL policy with proper ownership-based policies
-- so any authenticated user can manage their OWN Elec-ID data, while employers
-- retain access to manage their employees' data.

-- ─────────────────────────────────────────────────────────────────────────────
-- HELPER: ownership check reused across all 4 tables
-- A row is "owned" by the current user if profile_id resolves back to their
-- employer_employees.user_id via employer_elec_id_profiles.
-- ─────────────────────────────────────────────────────────────────────────────

-- employer_elec_id_skills
DROP POLICY IF EXISTS "Employer access only" ON employer_elec_id_skills;

CREATE POLICY "Users can manage their own elec id skills"
  ON employer_elec_id_skills FOR ALL
  TO authenticated
  USING (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  );

-- employer_elec_id_work_history
DROP POLICY IF EXISTS "Employer access only" ON employer_elec_id_work_history;

CREATE POLICY "Users can manage their own elec id work history"
  ON employer_elec_id_work_history FOR ALL
  TO authenticated
  USING (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  );

-- employer_elec_id_qualifications
DROP POLICY IF EXISTS "Employer access only" ON employer_elec_id_qualifications;

CREATE POLICY "Users can manage their own elec id qualifications"
  ON employer_elec_id_qualifications FOR ALL
  TO authenticated
  USING (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  );

-- employer_elec_id_training
DROP POLICY IF EXISTS "Employer access only" ON employer_elec_id_training;

CREATE POLICY "Users can manage their own elec id training"
  ON employer_elec_id_training FOR ALL
  TO authenticated
  USING (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT p.id FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'employer'
    )
  );
