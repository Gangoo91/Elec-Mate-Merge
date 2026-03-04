-- Public verification: allow anonymous reads for Elec-ID verification page
-- These policies enable https://elec-mate.com/verify/EM-XXXXXX and /share/:token
-- to work without requiring the viewer to be logged in.
-- Writes remain fully protected (no anon INSERT/UPDATE/DELETE added).

-- 1. employer_elec_id_profiles: public can look up any profile by elec_id_number
CREATE POLICY "Public can view elec id profiles for verification"
  ON employer_elec_id_profiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2. employer_employees: public needs name + photo for the verification view
CREATE POLICY "Public can view employees for elec id verification"
  ON employer_employees FOR SELECT
  TO anon
  USING (true);

-- 3. employer_elec_id_qualifications: public read for verification
CREATE POLICY "Public can view qualifications for verification"
  ON employer_elec_id_qualifications FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. employer_elec_id_skills: public read for verification
CREATE POLICY "Public can view skills for verification"
  ON employer_elec_id_skills FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. employer_elec_id_training: public read for verification
CREATE POLICY "Public can view training for verification"
  ON employer_elec_id_training FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. employer_elec_id_work_history: public read for verification
CREATE POLICY "Public can view work history for verification"
  ON employer_elec_id_work_history FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7. elec_id_documents: public can view verified documents only (not pending/rejected)
CREATE POLICY "Public can view verified documents"
  ON elec_id_documents FOR SELECT
  TO anon, authenticated
  USING (verification_status = 'verified');
