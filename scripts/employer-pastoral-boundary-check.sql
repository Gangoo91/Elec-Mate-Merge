-- ELE-1833: proves the employer's college attendance / risk view cannot reach
-- any pastoral or safeguarding data. Run via the Supabase MCP execute_sql
-- tool or the SQL editor. Read only; it ends with RAISE so nothing persists.
--
-- Checks:
--   1. get_employer_apprentice_college_progress() returns only whitelisted,
--      non-sensitive columns (signature and real rows).
--   2. Its body reads no pastoral / safeguarding / SEND / identity column.
--   3. No RLS policy on a pastoral or student table grants access through an
--      employer relationship (employer_employees / employer_admins / scope).
--   4. Signed in as an employer manager (no college role), the pastoral and
--      safeguarding tables and the students' own college rows return nothing.
-- Result: "fails=0" in the raised message.
do $$
declare
  bad text := '(pastoral|safeguard|send_flag|ehcp|accessib|wellbeing|welfare|concern|note|birth|dob|ni_number|pronoun|first_language|eal|disab|medical|counsel|prevent)';
  employer_manager uuid := 'fd61bfe0-b027-45ee-a4a6-9f91fb5e3991';  -- admin of the demo firm, no college role
  firm uuid := 'b0113c59-8611-4c5e-8503-1797a75bb64f';
  cols text[]; src text; out text := E'\n'; r record; n int; t text; fails int := 0;
begin
  select array_agg(a) into cols
    from (select unnest(p.proargnames) a, unnest(p.proargmodes) m
            from pg_proc p where p.proname = 'get_employer_apprentice_college_progress') x
   where m = 't';
  out := out || '1. columns: ' || array_to_string(cols, ', ') || E'\n';
  if exists (select 1 from unnest(cols) c where c ~* bad) then
    fails := fails + 1; out := out || '   FAIL: sensitive column in the result' || E'\n';
  end if;

  select prosrc into src from pg_proc where proname = 'get_employer_apprentice_college_progress';
  if src ~* '(pastoral_notes|safeguarding|send_flags|ehcp_ref|accessibility_notes|date_of_birth|ni_number|pronouns|first_language|\.eal\M)' then
    fails := fails + 1; out := out || '2. FAIL: body reads a sensitive source' || E'\n';
  else
    out := out || '2. body reads no pastoral, safeguarding, SEND or identity column' || E'\n';
  end if;

  select count(*) into n from pg_policies
   where tablename in ('pastoral_notes', 'platform_safeguarding_alerts', 'college_students')
     and (coalesce(qual, '') ~* '(employer_employees|employer_admins|my_employer_scope|my_employer_admin_scope)'
          or coalesce(with_check, '') ~* '(employer_employees|employer_admins|my_employer_scope)');
  out := out || '3. policies granting through an employer link: ' || n || E'\n';
  if n > 0 then fails := fails + 1; end if;

  perform set_config('request.jwt.claims', json_build_object('sub', employer_manager, 'role', 'authenticated')::text, true);
  execute 'set local role authenticated';
  n := 0;
  for r in select to_jsonb(x) j from public.get_employer_apprentice_college_progress() x loop
    n := n + 1;
    if exists (select 1 from jsonb_object_keys(r.j) k where k ~* bad) then fails := fails + 1; end if;
  end loop;
  out := out || '4. as employer manager: rpc rows=' || n || ' (keys checked)' || E'\n';
  foreach t in array array['pastoral_notes', 'platform_safeguarding_alerts', 'v_platform_safeguarding_health'] loop
    begin
      execute format('select count(*) from public.%I', t) into n;
      out := out || '   ' || t || ' rows=' || n || E'\n';
      if n > 0 then fails := fails + 1; end if;
    exception when others then out := out || '   ' || t || ': ' || sqlerrm || E'\n'; end;
  end loop;
  execute 'select count(*) from public.college_students cs
            where cs.user_id in (select user_id from public.employer_employees where employer_id = $1)'
    into n using firm;
  out := out || '   college_students rows of their apprentices=' || n || E'\n';
  if n > 0 then fails := fails + 1; end if;
  execute 'reset role';

  raise exception 'EMPLOYER PASTORAL BOUNDARY (rolled back) fails=%:%', fails, out;
end $$;
