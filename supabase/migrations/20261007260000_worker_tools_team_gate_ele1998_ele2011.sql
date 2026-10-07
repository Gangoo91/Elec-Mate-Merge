-- ELE-1998 / ELE-2011 — Worker Tools gated on being on a team; apprentice hours split
--
-- 1. A removed (Archived) worker must be blocked server-side from every Worker
--    Tools page, not just the hub. Nearly every worker policy and RPC already
--    goes through my_employee_ids() / is_assigned_to_job() (both active-only).
--    Two did not: the worker's corrective safety actions matched the roster row
--    on user_id alone, so an archived worker could still list and tick off the
--    firm's safety actions. Both now require an ACTIVE roster row.
--
-- 2. ELE-2011: the apprentice's hours are shown as logged / waiting / attested by
--    the firm / verified by college, kept separate. get_otj_summary is THE
--    figure, so the split is added to _otj_summary_core (two extra keys whose sum
--    is verified_hours) rather than re-derived in the client.
--
-- Both changes PATCH the live definitions (same pattern as 20261007003000) so a
-- concurrent change elsewhere in those functions is kept, and fail loudly if
-- the anchor text has moved.

-- 1a. get_my_incident_actions: active roster row only -------------------------
do $$
declare d text;
begin
  d := pg_get_functiondef('public.get_my_incident_actions()'::regprocedure);
  if position('ELE-1998' in d) > 0 then return; end if;
  d := replace(d,
    '     and me.user_id = auth.uid()
',
    '     and me.user_id = auth.uid()
     and lower(coalesce(me.status, '''')) = ''active''  -- ELE-1998: removed workers see nothing
');
  if position('ELE-1998' in d) = 0 then
    raise exception 'get_my_incident_actions changed shape; patch by hand';
  end if;
  execute d;
end $$;
revoke all on function public.get_my_incident_actions() from public, anon;
grant execute on function public.get_my_incident_actions() to authenticated;

-- 1b. complete_my_incident_action: active roster row only ---------------------
do $$
declare d text;
begin
  d := pg_get_functiondef('public.complete_my_incident_action(uuid, text, text)'::regprocedure);
  if position('ELE-1998' in d) > 0 then return; end if;
  d := replace(d,
    '                    and me.user_id = auth.uid());',
    '                    and me.user_id = auth.uid()
                    and lower(coalesce(me.status, '''')) = ''active'');  -- ELE-1998');
  if position('ELE-1998' in d) = 0 then
    raise exception 'complete_my_incident_action changed shape; patch by hand';
  end if;
  execute d;
end $$;
revoke all on function public.complete_my_incident_action(uuid, text, text) from public, anon;
grant execute on function public.complete_my_incident_action(uuid, text, text) to authenticated;

-- 2. _otj_summary_core: split verified_hours into firm-attested + college ---
do $$
declare d text;
begin
  d := pg_get_functiondef('public._otj_summary_core(uuid)'::regprocedure);
  if position('employer_attested_hours' in d) > 0 then return; end if;
  d := replace(d,
    '''verified_hours'', round(v_verified / 60.0, 1),',
    '''verified_hours'', round(v_verified / 60.0, 1),
    -- ELE-2011: verified_hours split by who signed it. The two sum to verified_hours.
    ''employer_attested_hours'', (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1)
                                   from college_otj_entries o
                                  where o.student_id = u and o.verification_status = ''verified_by_employer''),
    ''college_verified_hours'', (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1)
                                  from college_otj_entries o
                                 where o.student_id = u and o.verification_status = ''verified''),');
  if position('employer_attested_hours' in d) = 0 then
    raise exception '_otj_summary_core changed shape; patch by hand';
  end if;
  execute d;
end $$;
-- Internal: never granted (get_otj_summary checks the caller first).
revoke all on function public._otj_summary_core(uuid) from public, anon, authenticated;

-- get_otj_summary was executable by PUBLIC and anon. Its guard refuses anon
-- already; take the grant away too (never open anything to anon).
revoke all on function public.get_otj_summary(uuid) from public, anon;
grant execute on function public.get_otj_summary(uuid) to authenticated, service_role;
