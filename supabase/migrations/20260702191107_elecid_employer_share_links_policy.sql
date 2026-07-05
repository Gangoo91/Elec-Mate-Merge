-- Employer-side Elec-ID share links: allow the employer to manage share links
-- for their own team's profiles (existing manage policy keyed on worker uid).
CREATE POLICY "Employers manage team share links"
  ON public.employer_elec_id_share_links FOR ALL TO authenticated
  USING (
    profile_id IN (
      SELECT p.id
      FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.employer_id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT p.id
      FROM employer_elec_id_profiles p
      JOIN employer_employees e ON e.id = p.employee_id
      WHERE e.employer_id = (SELECT auth.uid())
    )
  );
