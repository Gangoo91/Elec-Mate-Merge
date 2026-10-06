-- ELE-1831: what each firm role can read. Run in the Supabase SQL editor or via
-- the MCP execute_sql tool. Everything happens inside one transaction that is
-- rolled back by the final RAISE, so nothing is left behind.
--
-- Builds a firm (FIRM = an existing employer account) with one person per role,
-- then signs in as each and counts rows they can SELECT in each table. The
-- result is a matrix: role -> table -> rows visible (and "-" for 0).
--
-- Set FIRM to a firm with data, and the five account ids to throwaway/test
-- accounts that are NOT already on that firm.
do $$
declare
  firm   uuid := 'b0113c59-8611-4c5e-8503-1797a75bb64f';
  owner_ uuid;
  office uuid := '447a7e47-12cc-4203-bbc0-365846eee998';
  admin_ uuid := '28a0fc81-3783-4c31-8e7e-1f52f778abb2';
  sup    uuid := 'aa69361d-dad9-4841-84e4-25ee41568594';
  engineer uuid := 'fd61bfe0-b027-45ee-a4a6-9f91fb5e3991';  -- already on this firm as an Operative
  stranger uuid;
  tables text[] := array['employer_employees', 'employer_jobs', 'customers', 'quotes',
                         'job_financials', 'job_cost_entries', 'employer_timesheets',
                         'employer_expense_claims', 'employer_leave_requests',
                         'employer_incidents', 'employer_price_book', 'employer_seats'];
  who record; t text; n int; line text; out text := E'\n';
begin
  owner_ := firm;
  -- Any account with no link to this firm.
  select u.id into stranger from auth.users u
   where u.id not in (firm, office, admin_, sup, engineer)
     and not exists (select 1 from public.employer_employees e where e.user_id = u.id and e.employer_id = firm)
     and not exists (select 1 from public.employer_admins a where a.user_id = u.id and a.employer_id = firm)
   limit 1;
  perform set_config('request.jwt.claims', '', true);
  insert into employer_admins(employer_id, user_id, email, status, invited_by, access_role)
  select firm, u.id, u.email, 'active', firm, r.role
    from (values (office, 'office'), (admin_, 'admin')) r(uid, role)
    join auth.users u on u.id = r.uid;
  update employer_employees set team_role = 'Supervisor', status = 'Active'
   where employer_id = firm and user_id = sup;
  if not found then
    insert into employer_employees(employer_id, user_id, name, status, avatar_initials, team_role)
    values (firm, sup, 'Role check supervisor', 'Active', 'RS', 'Supervisor');
  end if;

  for who in select * from (values ('owner', owner_), ('admin', admin_), ('office', office),
                                   ('supervisor', sup), ('engineer', engineer),
                                   ('stranger', stranger)) v(role, uid) loop
    perform set_config('request.jwt.claims',
      json_build_object('sub', who.uid, 'role', 'authenticated')::text, true);
    execute 'set local role authenticated';
    line := rpad(who.role, 11) || ' money=' || rpad(coalesce(public.can_see_firm_money(firm)::text, 'null'), 5);
    foreach t in array tables loop
      begin
        execute format(
          'select count(*) from public.%I where %s', t,
          case t
            when 'employer_employees' then 'employer_id = $1'
            when 'employer_seats' then 'employer_id = $1'
            when 'employer_price_book' then 'employer_id = $1'
            when 'employer_incidents' then 'employer_id = $1'
            when 'employer_timesheets' then 'employee_id in (select id from public.employer_employees where employer_id = $1)'
            when 'employer_expense_claims' then 'employee_id in (select id from public.employer_employees where employer_id = $1)'
            when 'employer_leave_requests' then 'employee_id in (select id from public.employer_employees where employer_id = $1)'
            else 'user_id = $1'
          end) into n using firm;
        line := line || ' ' || t || '=' || case when n = 0 then '-' else n::text end;
      exception when others then
        line := line || ' ' || t || '=ERR';
      end;
    end loop;
    execute 'reset role';
    out := out || line || E'\n';
  end loop;

  raise exception 'ROLE READ MATRIX (rolled back):%', out;
end $$;
