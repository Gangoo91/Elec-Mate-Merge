-- ELE-1955 follow-up (Andrew 7 Oct: "do what you think is right"): a firm sees
-- an apprentice its college names BEFORE the apprentice has joined, so it gets
-- the minimum: name, course, college and review date, with the email masked
-- (j***@gmail.com). "Add to your team" runs on the server with the real
-- address from the college record, so the firm never sees it; the apprentice
-- still links their own account only by accepting the invite.
do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef('public.get_employer_unrostered_apprentices()'::regprocedure);
  if position('***@' in v_def) > 0 then return; end if;
  v_new := regexp_replace(v_def, 'cs\.id,\s*fe\.firm,\s*cs\.name,\s*cs\.email,\s*col\.name',
    'cs.id, fe.firm, cs.name, case when nullif(trim(cs.email), '''') is null then null else left(trim(cs.email), 1) || ''***@'' || split_part(trim(cs.email), ''@'', 2) end, col.name');
  if v_new = v_def then raise exception 'get_employer_unrostered_apprentices anchor not found'; end if;
  execute v_new;
end $$;

create or replace function public.add_unrostered_apprentice(p_student uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid; v_existing uuid; v_name text; v_email text; v_id uuid; v_initials text;
begin
  if auth.uid() is null then raise exception 'not_signed_in' using errcode = '42501'; end if;
  -- Same match as the list, run as the caller (my_employer_scope inside).
  select u.firm_id, u.invited_roster_id into v_firm, v_existing
    from public.get_employer_unrostered_apprentices() u
   where u.student_id = p_student
   limit 1;
  if v_firm is null then raise exception 'not_allowed' using errcode = '42501'; end if;
  if v_existing is not null then return v_existing; end if;

  select cs.name, lower(trim(cs.email)) into v_name, v_email
    from public.college_students cs where cs.id = p_student;
  if nullif(v_email, '') is null then raise exception 'no_email' using errcode = '22023'; end if;

  v_initials := upper(left(split_part(v_name, ' ', 1), 1) || left(split_part(v_name, ' ', 2), 1));
  insert into public.employer_employees (employer_id, name, email, team_role, role, status, avatar_initials)
  values (v_firm, v_name, v_email, 'Apprentice', 'Apprentice', 'Active', coalesce(nullif(v_initials, ''), 'AP'))
  returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.add_unrostered_apprentice(uuid) from public, anon;
grant execute on function public.add_unrostered_apprentice(uuid) to authenticated;
