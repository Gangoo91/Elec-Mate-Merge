-- Tripartite review cycle, end to end, as each party. One rolled-back
-- transaction: run it whole (MCP execute_sql) and every row should read PASS.
-- Fixtures: tutor 447a7e47…, learner 28a0fc81… (college_students 3d756aaf…).
begin;
create temp table _r (n serial, check_name text, result text) on commit drop;
grant all on _r to authenticated, anon; grant all on sequence _r_n_seq to authenticated, anon;
insert into college_employers(id, college_id, company_name, contact_name, contact_email)
 values ('eeee0000-0000-4000-8000-000000000001','a1b2c3d4-e5f6-7890-abcd-ef1234567890','Test Sparks Ltd','Pat Boss','pat@example.com');
create temp table _rv on commit drop as select gen_random_uuid() id; grant select on _rv to authenticated, anon;

-- Tutor
select set_config('request.jwt.claims', '{"sub":"447a7e47-12cc-4203-bbc0-365846eee998","role":"authenticated"}', true);
set local role authenticated;
do $$ declare v uuid := (select id from _rv); res jsonb; begin
  insert into college_tripartite_reviews(id, college_id, student_id, employer_id, scheduled_at, mode, tutor_staff_id)
   values (v, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f',
           coalesce((select employer_id from college_students where id='3d756aaf-c37d-4aa8-bd24-8ced1b0b766f'), 'eeee0000-0000-4000-8000-000000000001'),
           now() - interval '1 hour', 'video', (select id from college_staff where user_id=auth.uid() limit 1));
  insert into _r(check_name,result) values ('tutor schedules a review','PASS');
  begin insert into college_tripartite_reviews(college_id, student_id, signatures)
          values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','{"employer_signed_at":"x"}');
    insert into _r(check_name,result) values ('a review cannot start pre-signed','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('a review cannot start pre-signed','PASS'); end;
  begin update college_tripartite_reviews set signatures='{"employer_name":"x","employer_signed_at":"2026-01-01"}' where id=v;
    insert into _r(check_name,result) values ('tutor cannot sign for the employer','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('tutor cannot sign for the employer','PASS'); end;
  begin perform employer_token from college_tripartite_reviews where id=v;
    insert into _r(check_name,result) values ('staff cannot read the token column','FAIL');
  exception when insufficient_privilege then insert into _r(check_name,result) values ('staff cannot read the token column','PASS'); end;
  res := public.sign_off_tripartite_review(v);
  insert into _r(check_name,result) values ('sign-off refuses an empty review', case when res ? 'error' then 'PASS' else 'FAIL' end);
  update college_tripartite_reviews set employer_attendance='contributed',
    outcomes = '{"summary":"Good progress on containment and testing this term.","plan_change":"none","safeguarding_check":"SECRET-NOTE"}' where id=v;
  res := public.sign_off_tripartite_review(v);
  insert into _r(check_name,result) values ('sign-off needs evidence the employer was asked', case when res->>'error' like 'Send the employer%' then 'PASS' else 'FAIL '||res::text end);
  perform public.get_tripartite_employer_link(v);
  perform public.log_tripartite_employer_contact(v,'shared_link','pat@example.com');
  res := public.sign_off_tripartite_review(v);
  insert into _r(check_name,result) values ('sign-off needs an agreed action', case when res->>'error' like 'Agree at least%' then 'PASS' else 'FAIL '||res::text end);
  insert into college_review_actions(review_id, college_id, student_id, action, owner_party, due_date)
   values (v,'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','Complete safe isolation practice log','apprentice', current_date+30);
  res := public.get_tripartite_prefill(v);
  insert into _r(check_name,result) values ('pre-fill carries the one OTJ figure', case when (res->'otj'->>'required_hours')::numeric = 1066 then 'PASS' else 'FAIL' end);
  res := public.sign_off_tripartite_review(v);
  insert into _r(check_name,result) values ('tutor signs off', case when res->>'success'='true' then 'PASS' else 'FAIL '||res::text end);
  begin update college_tripartite_reviews set outcomes = outcomes || '{"summary":"changed after"}' where id=v;
    insert into _r(check_name,result) values ('a signed review cannot be edited','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('a signed review cannot be edited','PASS'); end;
  begin delete from college_review_actions where review_id=v;
    insert into _r(check_name,result) values ('a signed review''s actions cannot be removed','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('a signed review''s actions cannot be removed','PASS'); end;
  begin delete from college_tripartite_reviews where id=v;
    insert into _r(check_name,result) values ('a signed review cannot be deleted', case when exists(select 1 from college_tripartite_reviews where id=v) then 'PASS' else 'FAIL' end);
  exception when check_violation then insert into _r(check_name,result) values ('a signed review cannot be deleted','PASS'); end;
  res := public.get_review_board();
  insert into _r(check_name,result) values ('board shows the review awaiting signatures', case when res->'rows' @> '[{"state":"signatures"}]' then 'PASS' else 'FAIL '||left(res::text,200) end);
end $$;
reset role;

-- Learner
select set_config('request.jwt.claims', '{"sub":"28a0fc81-3783-4c31-8e7e-1f52f778abb2","role":"authenticated"}', true);
set local role authenticated;
do $$ declare v uuid := (select id from _rv); res jsonb; begin
  update college_tripartite_reviews set signatures = signatures || '{"student_signed_at":"x"}' where id=v;
  insert into _r(check_name,result) values ('learner cannot write the review row', case when (select signatures ? 'student_signed_at' from college_tripartite_reviews where id=v) then 'FAIL' else 'PASS' end);
  res := public.get_my_tripartite_reviews();
  insert into _r(check_name,result) values ('learner sees the review and its actions',
    case when res->'reviews' @> jsonb_build_array(jsonb_build_object('id', v)) and jsonb_array_length(res->'open_actions')=1 then 'PASS' else 'FAIL '||left(res::text,200) end);
  insert into _r(check_name,result) values ('learner never sees safeguarding notes', case when res::text like '%SECRET-NOTE%' then 'FAIL' else 'PASS' end);
  res := public.sign_tripartite_review_learner(v);
  insert into _r(check_name,result) values ('learner signs and the review completes',
    case when res->>'success'='true'
          and (select x->'signatures'->>'student_signed_at' from jsonb_array_elements(public.get_my_tripartite_reviews()->'reviews') x where x->>'id' = v::text) is not null
         then 'PASS' else 'FAIL '||res::text end);
  begin perform public.get_tripartite_employer_link(v); insert into _r(check_name,result) values ('learner cannot get the employer link','FAIL');
  exception when others then insert into _r(check_name,result) values ('learner cannot get the employer link','PASS'); end;
end $$;
reset role;

-- Employer, no account
create temp table _tok on commit drop as select employer_token t from college_tripartite_reviews where id=(select id from _rv);
grant select on _tok to anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$ declare t text := (select t from _tok); res jsonb; begin
  res := public.get_tripartite_review_public(t);
  insert into _r(check_name,result) values ('employer reads the shared summary', case when res->'summary'->>'summary' is not null then 'PASS' else 'FAIL' end);
  insert into _r(check_name,result) values ('employer never sees safeguarding notes', case when res::text like '%SECRET-NOTE%' then 'FAIL' else 'PASS' end);
  res := public.get_tripartite_review_public(repeat('a',48));
  insert into _r(check_name,result) values ('a wrong token is refused', case when res->>'error'='invalid' then 'PASS' else 'FAIL' end);
  res := public.submit_tripartite_employer_input(t, '{"progress":"on_track","name":"Pat"}');
  insert into _r(check_name,result) values ('no new input once signed off', case when res ? 'error' then 'PASS' else 'FAIL' end);
  res := public.sign_tripartite_review_employer(t, 'Pat Boss', 'Director');
  insert into _r(check_name,result) values ('employer signs by link', case when res->>'success'='true' then 'PASS' else 'FAIL '||res::text end);
  res := public.sign_tripartite_review_employer(t, 'Someone Else', null);
  insert into _r(check_name,result) values ('employer signature cannot be replaced', case when res ? 'error' then 'PASS' else 'FAIL' end);
  begin perform public.get_tripartite_prefill((select id from _rv)); insert into _r(check_name,result) values ('anon cannot call the pre-fill','FAIL');
  exception when others then insert into _r(check_name,result) values ('anon cannot call the pre-fill','PASS'); end;
  begin perform public._otj_summary_core('28a0fc81-3783-4c31-8e7e-1f52f778abb2'); insert into _r(check_name,result) values ('anon cannot call the OTJ core','FAIL');
  exception when others then insert into _r(check_name,result) values ('anon cannot call the OTJ core','PASS'); end;
  begin perform 1 from college_tripartite_reviews; insert into _r(check_name,result) values ('anon reads no reviews', case when (select count(*) from college_tripartite_reviews)=0 then 'PASS' else 'FAIL' end);
  exception when insufficient_privilege then insert into _r(check_name,result) values ('anon reads no reviews','PASS'); end;
end $$;
reset role;

-- A signed-in stranger
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000dead","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  insert into _r(check_name,result) select 'stranger reads no reviews', case when count(*)=0 then 'PASS' else 'FAIL' end from college_tripartite_reviews;
  begin perform public.get_review_board(); insert into _r(check_name,result) values ('stranger has no review board','FAIL');
  exception when others then insert into _r(check_name,result) values ('stranger has no review board','PASS'); end;
end $$;
reset role;

-- ── Gaps found by the independent review (6 Oct) ─────────────────────
-- A learner with no account, in the same college.
select set_config('request.jwt.claims', '', true);
insert into college_students(id, college_id, name, email, status, start_date)
  values ('dddd0000-0000-4000-8000-000000000001','a1b2c3d4-e5f6-7890-abcd-ef1234567890','No Account Learner','noaccount@example.com','Active', current_date - 100);
insert into college_tripartite_reviews(id, college_id, student_id, scheduled_at, mode, status, locked_at, held_on, signatures, outcomes)
  values ('dddd0000-0000-4000-8000-0000000000a1','a1b2c3d4-e5f6-7890-abcd-ef1234567890','dddd0000-0000-4000-8000-000000000001',
          now() - interval '2 days', 'video', 'in_progress', now(), current_date - 2, '{"tutor_signed_at":"x"}', '{"safeguarding_check":"SECRET-NOTE"}');

select set_config('request.jwt.claims', '{"sub":"28a0fc81-3783-4c31-8e7e-1f52f778abb2","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  insert into _r(check_name,result) select 'learner reads no review rows off the table', case when count(*)=0 then 'PASS' else 'FAIL '||count(*) end
    from college_tripartite_reviews;
  insert into _r(check_name,result) select 'learner reads no action rows off the table', case when count(*)=0 then 'PASS' else 'FAIL' end
    from college_review_actions;
end $$;
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000dead","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin perform public.sign_tripartite_review_learner('dddd0000-0000-4000-8000-0000000000a1');
    insert into _r(check_name,result) values ('stranger cannot sign for a learner with no account','FAIL');
  exception when others then insert into _r(check_name,result) values ('stranger cannot sign for a learner with no account','PASS'); end;
  begin perform public.get_tripartite_prefill('dddd0000-0000-4000-8000-0000000000a1');
    insert into _r(check_name,result) values ('stranger cannot read a no-account learner''s pre-fill','FAIL');
  exception when others then insert into _r(check_name,result) values ('stranger cannot read a no-account learner''s pre-fill','PASS'); end;
end $$;
reset role;

insert into _r(check_name,result) select 'anon cannot execute any staff or learner review RPC',
  case when not has_function_privilege('anon','public.sign_tripartite_review_learner(uuid)','execute')
        and not has_function_privilege('anon','public.sign_off_tripartite_review(uuid,date)','execute')
        and not has_function_privilege('anon','public.get_tripartite_employer_link(uuid)','execute')
        and not has_function_privilege('anon','public.log_tripartite_employer_contact(uuid,text,text)','execute')
        and not has_function_privilege('anon','public.record_paper_learner_signature(uuid,date,text)','execute')
        and not has_function_privilege('anon','public.get_review_board(uuid)','execute')
        and not has_function_privilege('authenticated','public.employer_review_focus(uuid)','execute')
       then 'PASS' else 'FAIL' end;

select set_config('request.jwt.claims', '{"sub":"447a7e47-12cc-4203-bbc0-365846eee998","role":"authenticated"}', true);
set local role authenticated;
do $$ declare v uuid := (select id from _rv); v2 uuid := gen_random_uuid(); res jsonb; begin
  begin insert into college_tripartite_reviews(college_id, student_id, employer_viewed_at)
          values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f', now());
    insert into _r(check_name,result) values ('staff cannot insert a review with evidence pre-set','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('staff cannot insert a review with evidence pre-set','PASS'); end;

  -- a new, undated review for the same learner
  insert into college_tripartite_reviews(id, college_id, student_id, mode)
    values (v2, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','video');
  insert into college_review_actions(review_id, college_id, student_id, action, owner_party)
    values (v2,'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','Draft action in the new review','college');
  begin update college_review_actions set status = 'done' where review_id = v2;
    insert into _r(check_name,result) values ('an action cannot be closed in the review that agreed it','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('an action cannot be closed in the review that agreed it','PASS'); end;
  begin update college_review_actions set status = 'done', closed_in_review_id = null where review_id = v;
    insert into _r(check_name,result) values ('an earlier action cannot be closed outside a review','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('an earlier action cannot be closed outside a review','PASS'); end;
  update college_review_actions set status = 'done', closed_in_review_id = v2, outcome_note = 'Logged' where review_id = v;
  insert into _r(check_name,result) values ('an earlier action closes at the next review','PASS');

  res := public.get_review_board('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
  insert into _r(check_name,result) select 'board: undated review is not "late", next is never the signed one',
    case when (select x->>'state' from jsonb_array_elements(res->'rows') x where x->>'student_id'='3d756aaf-c37d-4aa8-bd24-8ced1b0b766f') not in ('late','overdue')
          and (select x->'next'->>'id' from jsonb_array_elements(res->'rows') x where x->>'student_id'='3d756aaf-c37d-4aa8-bd24-8ced1b0b766f') <> v::text
         then 'PASS' else 'FAIL '||left(res::text,300) end;

  update college_tripartite_reviews set employer_attendance='attended',
    outcomes='{"summary":"Second review summary, long enough.","plan_change":"none"}' where id = v2;
  res := public.sign_off_tripartite_review(v2, current_date - 1);
  insert into _r(check_name,result) values ('a review cannot be dated before the last one',
    case when res->>'error' like 'The date held must be after%' then 'PASS' else 'FAIL '||res::text end);

  res := public.record_paper_learner_signature('dddd0000-0000-4000-8000-0000000000a1', current_date, 'Learner file, scanned');
  insert into _r(check_name,result) values ('staff record a paper signature for a learner with no account',
    case when res->>'success'='true' then 'PASS' else 'FAIL '||res::text end);
  res := public.record_paper_learner_signature(v, current_date, 'Learner file');
  insert into _r(check_name,result) values ('no paper signature for a learner who has an account',
    case when res ? 'error' then 'PASS' else 'FAIL' end);
end $$;
reset role;

insert into _r(check_name,result) select 'next review due by end of the third month after',
  case when public.tripartite_due_by('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f') = date '2027-01-31' then 'PASS' else 'FAIL' end;
insert into _r(check_name,result) select 'invitation and view are on the record',
  case when (select jsonb_array_length(employer_contact_log) = 1 and employer_viewed_at is not null and employer_invited_at is not null
               from college_tripartite_reviews where id=(select id from _rv)) then 'PASS' else 'FAIL' end;
select check_name, result from _r order by n;
rollback;
