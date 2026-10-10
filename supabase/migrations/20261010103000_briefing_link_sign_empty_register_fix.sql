-- Fix: signing a toolbox talk by its public link failed when the register was
-- empty (ELE-1944 / ELE-2010, found while testing 10 Oct).
--
-- sign_briefing_by_token() rewrites team_briefings.attendees with
-- `SELECT jsonb_agg(...) FROM jsonb_array_elements(attendees)`. For an empty
-- register that aggregate is NULL, and attendees is NOT NULL, so the whole
-- signature was rejected with a not-null violation. A briefing with nobody
-- listed yet is exactly when the office shares the link, so this blocked real
-- signatures.
--
-- The rewrite now only runs when there is someone on the register. Same
-- signature; edits the live definition in place and fails loudly if it has
-- drifted.
do $fix$
declare
  v_def text;
  v_before text;
  v_old text := E'      AND jsonb_typeof(attendees) = ''array'';\n';
  v_new text := E'      AND jsonb_typeof(attendees) = ''array''\n      AND jsonb_array_length(attendees) > 0;\n';
begin
  v_def := pg_get_functiondef('public.sign_briefing_by_token(text,text,text,text,text,text)'::regprocedure);
  if position('jsonb_array_length(attendees) > 0' in v_def) > 0 then
    return;
  end if;
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'sign_briefing_by_token attendees clause not found exactly once — definition has changed';
  end if;
  v_before := v_def;
  v_def := replace(v_def, v_old, v_new);
  if v_def = v_before then
    raise exception 'sign_briefing_by_token attendees clause not replaced';
  end if;
  execute v_def;
end
$fix$;

-- The two tables added today are for signed-in people only (RLS already
-- returns nothing to anon; this removes the grant as well).
revoke all on table public.team_briefing_schedules from anon;
revoke all on table public.employer_policy_acknowledgements from anon;
