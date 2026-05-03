-- Policy Acknowledgements RLS — RLS was enabled but no policies existed,
-- which silently returned empty results for everyone (broke Ofsted EIF
-- dashboard, Compliance Pack, etc.).
--
-- Same-college staff can read acknowledgements for policies belonging
-- to their college. Users can write/update/delete their own acks.

CREATE POLICY pa_read_same_college
  ON public.policy_acknowledgements
  FOR SELECT
  TO authenticated
  USING (
    policy_id IN (
      SELECT cp.id
      FROM public.college_policies cp
      WHERE public._ch_same_college(cp.college_id)
    )
  );

CREATE POLICY pa_insert_self
  ON public.policy_acknowledgements
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY pa_update_self
  ON public.policy_acknowledgements
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY pa_delete_self
  ON public.policy_acknowledgements
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
