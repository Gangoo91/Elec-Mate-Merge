-- Follows 20261006155000: the college table's edit guard only let firm
-- managers attest, so a supervisor's confirm raised "not authorised". Swap that
-- one check for can_confirm_otj_for() (managers + named supervisor + team
-- Supervisor/PM/Apprentice Co-ordinator, never the apprentice). Every other
-- branch of the guard — college staff, learner edits, locked columns — is
-- unchanged.
do $$
declare
  v_def text;
  v_old text := 'AND EXISTS (
       SELECT 1 FROM public.employer_employees ee
        WHERE ee.user_id = OLD.student_id
          AND lower(coalesce(ee.status, '''')) = ''active''
          AND ee.employer_id IN (SELECT public.my_employer_scope())
     ) THEN';
begin
  v_def := pg_get_functiondef('public.tg_guard_otj_self_edit()'::regprocedure);
  if position('can_confirm_otj_for' in v_def) > 0 then
    return;
  end if;
  if position(v_old in v_def) = 0 then
    raise exception 'tg_guard_otj_self_edit: employer check not found, update by hand';
  end if;
  execute replace(v_def, v_old, 'AND public.can_confirm_otj_for(OLD.student_id) THEN');
end $$;
