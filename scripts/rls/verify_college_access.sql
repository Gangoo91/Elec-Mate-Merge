-- College & apprentice access checks (ELE-1914). Read-and-rollback only:
-- every write happens inside one transaction that ends in ROLLBACK.
-- Run via the Supabase MCP execute_sql, the SQL editor, or
--   psql "$DB_URL" -f scripts/rls/verify_college_access.sql
-- Every row should read PASS. Actors are the fixture accounts in e2e/.auth/
-- (fictional "Demo Learner (fixture)" and "Demo Tutor (fixture)" at Northgate).
begin;
create temp table _r (check_name text, result text) on commit drop;
grant all on _r to authenticated, anon;
create temp table _ids on commit drop as select
  '28a0fc81-3783-4c31-8e7e-1f52f778abb2'::uuid learner,
  '447a7e47-12cc-4203-bbc0-365846eee998'::uuid tutor,
  (select id from college_students where user_id='28a0fc81-3783-4c31-8e7e-1f52f778abb2' limit 1) sid,
  (select college_id from college_students where user_id='28a0fc81-3783-4c31-8e7e-1f52f778abb2' limit 1) cid;
grant select on _ids to authenticated;
insert into college_tripartite_reviews(college_id, student_id, status, signatures)
  select cid, sid, 'scheduled', '{}'::jsonb from _ids;

-- ---------------------------------------------------------------- learner
select set_config('request.jwt.claims', '{"sub":"28a0fc81-3783-4c31-8e7e-1f52f778abb2","role":"authenticated"}', true);
set local role authenticated;
do $$
declare v uuid; n int;
  procedure_ok text;
begin
  -- reads: own rows only
  insert into _r select 'learner sees only own roll row', case when count(*)=1 then 'PASS' else 'FAIL '||count(*) end from college_students;
  insert into _r select 'learner sees no other learner''s attendance',
    case when count(*) = count(*) filter (where student_id=(select sid from _ids)) then 'PASS' else 'FAIL' end from college_attendance;
  insert into _r select 'learner reads no college staff rows', case when count(*)=0 then 'PASS' else 'FAIL '||count(*) end from college_staff;

  -- profile privilege fields
  begin update profiles set college_role='admin' where id=auth.uid(); insert into _r values ('learner cannot make self college admin','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot make self college admin','PASS'); end;
  begin update profiles set admin_role='super_admin' where id=auth.uid(); insert into _r values ('learner cannot make self platform admin','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot make self platform admin','PASS'); end;
  begin update profiles set role='admin' where id=auth.uid(); insert into _r values ('learner cannot set role admin','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot set role admin','PASS'); end;
  begin update profiles set free_access_expires_at=now()+interval '50 years' where id=auth.uid(); insert into _r values ('learner cannot extend own free access','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot extend own free access','PASS'); end;
  update profiles set last_study_title='rls check' where id=auth.uid();
  insert into _r values ('learner can still edit ordinary profile fields','PASS');

  -- submissions
  begin insert into portfolio_submissions(user_id,status,grade,signed_off_at) values (auth.uid(),'signed_off','Distinction',now());
    insert into _r values ('learner cannot insert a signed-off submission','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot insert a signed-off submission','PASS'); end;
  insert into portfolio_submissions(user_id,status,submitted_at,submission_count) values (auth.uid(),'submitted',now(),1) returning id into v;
  insert into _r values ('learner can submit','PASS');
  begin update portfolio_submissions set grade='Distinction' where id=v; insert into _r values ('learner cannot grade own submission','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot grade own submission','PASS'); end;
  begin update portfolio_submissions set status='signed_off' where id=v; insert into _r values ('learner cannot sign off own submission','FAIL');
  exception when insufficient_privilege or check_violation then insert into _r values ('learner cannot sign off own submission','PASS');
            when others then insert into _r values ('learner cannot sign off own submission','PASS ('||sqlstate||')'); end;
  update portfolio_submissions set status='resubmitted', submission_count=2, grade=null, assessor_feedback=null where id=v;
  insert into _r values ('learner can resubmit','PASS');

  -- tripartite review (the full cycle is in verify_tripartite_reviews.sql)
  update college_tripartite_reviews set status='completed' where student_id=(select sid from _ids);
  get diagnostics n = row_count;
  insert into _r values ('learner cannot complete own review', case when n=0 then 'PASS' else 'FAIL' end);
  update college_tripartite_reviews set signatures = signatures || '{"employer_name":"x"}'::jsonb where student_id=(select sid from _ids);
  get diagnostics n = row_count;
  insert into _r values ('learner cannot sign for the employer', case when n=0 then 'PASS' else 'FAIL' end);
  -- The learner cannot read the table (staff only); signing a review the tutor
  -- has not signed off is refused either way.
  insert into _r select 'learner cannot read reviews off the table', case when count(*)=0 then 'PASS' else 'FAIL' end
    from college_tripartite_reviews;
end $$;
reset role;

-- ---------------------------------------------------------------- tutor
select set_config('request.jwt.claims', '{"sub":"447a7e47-12cc-4203-bbc0-365846eee998","role":"authenticated"}', true);
set local role authenticated;
do $$ declare v uuid; begin
  insert into _r select 'tutor sees learners at own college', case when count(*)>=1 then 'PASS' else 'FAIL' end from college_students;
  begin update college_staff set role='admin' where user_id=auth.uid(); insert into _r values ('tutor cannot promote self','FAIL');
  exception when insufficient_privilege then insert into _r values ('tutor cannot promote self','PASS'); end;
  begin update college_staff set is_dsl=true where user_id=auth.uid(); insert into _r values ('tutor cannot make self safeguarding lead','FAIL');
  exception when insufficient_privilege then insert into _r values ('tutor cannot make self safeguarding lead','PASS'); end;
  begin insert into college_staff(college_id,name,email,role,status) select cid,'X','x@example.com','admin','Active' from _ids;
    insert into _r values ('tutor cannot create an admin','FAIL');
  exception when insufficient_privilege then insert into _r values ('tutor cannot create an admin','PASS'); end;
  update college_staff set phone='01234 567890' where user_id=auth.uid();
  insert into _r values ('tutor can edit own contact details','PASS');
  begin update profiles set college_id=gen_random_uuid() where id=auth.uid(); insert into _r values ('tutor cannot move self to another college','FAIL');
  exception when insufficient_privilege then insert into _r values ('tutor cannot move self to another college','PASS'); end;
end $$;
reset role;

-- ---------------------------------------------------------------- anonymous
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$ begin
  insert into _r select 'anon reads no learners', case when count(*)=0 then 'PASS' else 'FAIL' end from college_students;
  insert into _r select 'anon reads no submissions', case when count(*)=0 then 'PASS' else 'FAIL' end from portfolio_submissions;
end $$;
reset role;

-- ---------------------------------------------------------------- off-the-job hours (6 Oct 2026)
select set_config('request.jwt.claims', '{"sub":"28a0fc81-3783-4c31-8e7e-1f52f778abb2","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin insert into time_entries(user_id,date,duration,activity,notes,is_automatic)
          values (auth.uid(), current_date, 600, 'x', 'Auto-tracked training time', true);
    insert into _r values ('learner cannot forge 10h of measured time','FAIL');
  exception when check_violation then insert into _r values ('learner cannot forge 10h of measured time','PASS'); end;
  begin insert into time_entries(user_id,date,duration,activity,notes,is_automatic)
          values (auth.uid(), current_date - 60, 30, 'x', 'Auto-tracked training time', true);
    insert into _r values ('learner cannot back-date measured time','FAIL');
  exception when check_violation then insert into _r values ('learner cannot back-date measured time','PASS'); end;
  insert into time_entries(user_id,date,duration,activity,notes,is_automatic)
    values (auth.uid(), (now() at time zone 'Europe/London')::date, 14, 'Study Centre: x', 'Auto-tracked training time', true);
  insert into _r values ('tracker-shaped measured row still saves','PASS');
  begin perform public.approve_app_learning(array[auth.uid()]);
    insert into _r select 'learner cannot approve own app learning',
      case when (public.approve_app_learning(array[auth.uid()])->>'skipped')::int = 1 then 'PASS' else 'FAIL' end;
  exception when others then insert into _r values ('learner cannot approve own app learning','PASS'); end;
  begin perform 1 from otj_hours_statements where employer_token is not null;
    insert into _r values ('learner cannot read the employer signing token','FAIL');
  exception when insufficient_privilege then insert into _r values ('learner cannot read the employer signing token','PASS'); end;
end $$;
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000dead","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin perform public.get_otj_summary('28a0fc81-3783-4c31-8e7e-1f52f778abb2');
    insert into _r values ('stranger cannot read a learner''s hours','FAIL');
  exception when others then insert into _r values ('stranger cannot read a learner''s hours','PASS'); end;
end $$;
reset role;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$ begin
  begin perform public.get_otj_summary('28a0fc81-3783-4c31-8e7e-1f52f778abb2');
    insert into _r values ('anon cannot read a learner''s hours','FAIL');
  exception when others then insert into _r values ('anon cannot read a learner''s hours','PASS'); end;
end $$;
reset role;

select check_name, result from _r;
rollback;
