-- Access control per role (ELE-1914). One transaction that always rolls back.
--
--   npm run rls:verify            (runs this and every other scripts/rls/verify_*.sql)
--   npx supabase db query --linked -f scripts/rls/verify_roles.sql
--
-- Every row of the RESULTS: block should start with PASS. A FAIL names the
-- role, the table or function, and what it saw.
--
-- Actors. The fixture learner (28a0fc81…) and fixture tutor (447a7e47…) are
-- real sign-in accounts at the Northgate demo college. Every other role is a
-- TRANSIENT user created inside this transaction (auth.users + profile +
-- college_staff row) and switched to by setting request.jwt.claims — nothing
-- is committed, so no account outlives the run:
--   assessor, IQA, college admin, EQA, safeguarding lead (tutor + is_dsl) at
--   Northgate; a tutor at ANOTHER college; an outsider with no college; an
--   employer account; a platform admin; an independent (non-college) assessor
--   linked to the fixture learner by portfolio_assessor_links; and a second
--   Northgate learner, so "own rows only" is tested against real neighbours.
--
-- The sweeps are generic: for each college / portfolio / OTJ table and view,
-- every row a role can see must belong to it (learner), to its college
-- (staff), or to nobody it has a link to (outsider, other college, employer,
-- anonymous). A new table is covered the day it is created, as long as its
-- name starts with college_ / portfolio_ or it carries the usual columns.
begin;
create temp table _r (n serial, check_name text, result text) on commit drop;
grant all on _r to authenticated, anon; grant all on sequence _r_n_seq to authenticated, anon;

-- ------------------------------------------------------------------ constants
create temp table _k on commit drop as select
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid ng,          -- Northgate (demo college)
  'b2c3d4e5-f6a7-8901-bcde-f23456789012'::uuid other_college, -- South Thames
  '28a0fc81-3783-4c31-8e7e-1f52f778abb2'::uuid learner,
  '447a7e47-12cc-4203-bbc0-365846eee998'::uuid tutor,
  'f1e70000-0000-4000-8000-0000000000a1'::uuid assessor,
  'f1e70000-0000-4000-8000-0000000000a2'::uuid iqa,
  'f1e70000-0000-4000-8000-0000000000a3'::uuid cadmin,
  'f1e70000-0000-4000-8000-0000000000a4'::uuid eqa,
  'f1e70000-0000-4000-8000-0000000000a5'::uuid otutor,
  'f1e70000-0000-4000-8000-0000000000a6'::uuid outsider,
  'f1e70000-0000-4000-8000-0000000000a7'::uuid employer,
  'f1e70000-0000-4000-8000-0000000000a8'::uuid padmin,
  'f1e70000-0000-4000-8000-0000000000a9'::uuid dsl,
  'f1e70000-0000-4000-8000-0000000000aa'::uuid indep,
  'f1e70000-0000-4000-8000-0000000000b1'::uuid learner2,
  'f1e70000-0000-4000-8000-0000000000ab'::uuid ntutor,     -- Northgate tutor, NOT the fixture learner's tutor
  (select id from college_students where user_id = '28a0fc81-3783-4c31-8e7e-1f52f778abb2' limit 1) sid,
  (select cohort_id from college_students where user_id = '28a0fc81-3783-4c31-8e7e-1f52f778abb2' limit 1) cohort,
  gen_random_uuid() sid2, gen_random_uuid() note_sg, gen_random_uuid() note_tut,
  gen_random_uuid() item2, gen_random_uuid() review, gen_random_uuid() decision;
grant select on _k to authenticated, anon;

-- ------------------------------------------------------------------ transient actors
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, raw_app_meta_data,
                        created_at, updated_at, email_confirmed_at)
select v.id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
       'rls-verify-' || v.tag || '@example.invalid',
       jsonb_build_object('full_name', 'RLS ' || v.tag), '{}'::jsonb, now(), now(), now()
from _k, lateral (values (assessor,'assessor'), (iqa,'iqa'), (cadmin,'cadmin'), (eqa,'eqa'),
                         (otutor,'otutor'), (outsider,'outsider'), (employer,'employer'),
                         (padmin,'padmin'), (dsl,'dsl'), (indep,'indep'), (learner2,'learner2'),
                         (ntutor,'ntutor')) v(id, tag);

insert into college_staff (college_id, user_id, name, email, role, status, is_dsl, iqa_qual)
select c, u, 'RLS ' || r, 'rls-verify-' || r || '@example.invalid', r2, 'Active', d, q
from _k, lateral (values (ng, assessor, 'assessor', 'assessor', false, null::text),
                         (ng, iqa, 'iqa', 'iqa', false, 'TAQA'),
                         (ng, cadmin, 'cadmin', 'admin', false, null),
                         (ng, eqa, 'eqa', 'eqa', false, null),
                         (other_college, otutor, 'otutor', 'tutor', false, null),
                         (ng, dsl, 'dsl', 'tutor', true, null),
                         (ng, ntutor, 'ntutor', 'tutor', false, null)) v(c, u, r, r2, d, q);

update profiles set role = 'employer' where id = (select employer from _k);
update profiles set admin_role = 'admin' where id = (select padmin from _k);

-- A second Northgate learner in the fixture learner's cohort, with evidence.
insert into college_students (id, college_id, user_id, name, email, cohort_id, status)
select sid2, ng, learner2, 'RLS learner two', 'rls-verify-learner2@example.invalid', cohort, 'Active' from _k;
insert into portfolio_items (id, user_id, title, category)
select item2, learner2, 'RLS neighbour evidence', 'general' from _k;

-- An independent assessor linked to the fixture learner only.
insert into portfolio_assessor_links (learner_id, assessor_email, role, status, assessor_user_id, accepted_at)
select learner, 'rls-verify-indep@example.invalid', 'assessor', 'active', indep, now() from _k;

-- Pastoral notes on the fixture learner: one safeguarding, one for tutors.
insert into pastoral_notes (id, student_id, college_id, kind, visibility, title, body)
select note_sg, sid, ng, 'safeguarding', 'safeguarding', 'RLS', 'SAFEGUARDING-MARKER' from _k;
insert into pastoral_notes (id, student_id, college_id, kind, visibility, title, body)
select note_tut, sid, ng, 'note', 'tutors', 'RLS', 'tutor note' from _k;

-- Northgate's people, for the sweeps (read as each role, so computed here).
create temp table _ng on commit drop as
  select s.id sid, s.user_id uid from college_students s where s.college_id = (select ng from _k);
create temp table _ngstaff on commit drop as
  select st.user_id uid from college_staff st where st.college_id = (select ng from _k) and st.user_id is not null;
grant select on _ng, _ngstaff to authenticated, anon;

-- Tables and views under test, with the ownership columns each carries.
create temp table _t on commit drop as
select c.relname::text t, c.relkind::text kind,
       bool_or(a.attname = 'college_id') has_college,
       bool_or(a.attname = 'student_id') has_student,
       bool_or(a.attname = 'user_id')    has_user,
       bool_or(a.attname = 'learner_id') has_learner
from pg_class c
join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
join pg_attribute a on a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
where c.relkind in ('r', 'v', 'm')
  and (c.relname like 'college\_%' or c.relname like 'portfolio\_%' or c.relname like '%otj%'
       or c.relname in ('ac_signoffs', 'student_ac_coverage', 'student_message_threads', 'student_messages',
                        'pastoral_notes', 'supervisor_verifications', 'user_ksb_progress',
                        'epa_gateway_checklist', 'witness_testimonies', 'tutor_quizzes',
                        'tutor_quiz_attempts', 'student_risk_scores', 'apprentice_ksb_summary'))
  -- learner_assessments / user_* analytics views have their own checks below.
  and c.relname not in ('college_outreach')  -- platform-admin sales list, checked under anon only
group by 1, 2;
grant select on _t to authenticated, anon;

-- ------------------------------------------------------------------ the sweep
-- mode 'own'      every visible row is the caller's (learner)
-- mode 'college'  every visible row belongs to Northgate (staff at Northgate)
-- mode 'none'     no visible row belongs to Northgate (other college, employer, outsider)
-- mode 'nothing'  no rows at all, except reference tables (anonymous)
create function pg_temp.sweep(p_who text, p_mode text) returns void language plpgsql as $f$
declare
  r record; cond text; bad bigint; tables int := 0; fails int := 0;
  k record;
  -- Reference data a signed-in user may read (no learner data in them).
  reference text[] := array['colleges', 'college_courses', 'college_apprentice_surveys'];
begin
  select * into k from _k;
  for r in select * from _t order by t loop
    cond := null;
    if p_mode = 'own' then
      cond := concat_ws(' or ',
        case when r.has_college then format('(college_id is not null and college_id <> %L)', k.ng) end,
        case when r.has_student then format('(student_id is not null and student_id not in (%L, %L))', k.sid, k.learner) end,
        case when r.has_user and r.t not in ('college_staff', 'college_spag_checks')
             then format('(user_id is not null and user_id <> %L)', k.learner) end,
        case when r.has_learner then format('(learner_id is not null and learner_id <> %L)', k.learner) end);
    elsif p_mode = 'college' then
      cond := concat_ws(' or ',
        case when r.has_college then format('(college_id is not null and college_id <> %L)', k.ng) end,
        case when r.has_student then '(student_id is not null and student_id not in (select sid from _ng union all select uid from _ng where uid is not null))' end,
        case when r.has_user then format('(user_id is not null and user_id <> %L and user_id not in (select uid from _ng where uid is not null union all select uid from _ngstaff))', auth.uid()) end,
        case when r.has_learner then '(learner_id is not null and learner_id not in (select uid from _ng where uid is not null))' end);
    elsif p_mode = 'none' then
      cond := concat_ws(' or ',
        case when r.has_college then format('(college_id = %L)', k.ng) end,
        case when r.has_student then '(student_id in (select sid from _ng union all select uid from _ng where uid is not null))' end,
        case when r.has_user then '(user_id in (select uid from _ng where uid is not null))' end,
        case when r.has_learner then '(learner_id in (select uid from _ng where uid is not null))' end);
    elsif p_mode = 'nothing' then
      cond := case when r.t = any(reference) then null else 'true' end;
    end if;
    if cond is null or cond = '' then continue; end if;
    tables := tables + 1;
    begin
      execute format('select count(*) from public.%I where %s', r.t, cond) into bad;
    exception
      when insufficient_privilege then bad := 0;           -- not granted = cannot read
      when others then
        fails := fails + 1;
        insert into _r(check_name, result) values (p_who || ': read ' || r.t, 'FAIL error ' || sqlstate || ' ' || left(sqlerrm, 120));
        continue;
    end;
    if bad > 0 then
      fails := fails + 1;
      insert into _r(check_name, result) values (p_who || ': ' || r.t || ' (' || p_mode || ')', 'FAIL sees ' || bad || ' row(s) it should not');
    end if;
  end loop;
  insert into _r(check_name, result) values (
    p_who || ': ' || case p_mode when 'own' then 'own rows only' when 'college' then 'own college only'
                                 when 'none' then 'nothing from Northgate' else 'reads nothing' end
      || ' across ' || tables || ' tables/views',
    case when fails = 0 then 'PASS' else 'FAIL (' || fails || ' above)' end);
end $f$;

-- try(label, sql, expect): runs sql as the current role.
--   expect 'ok'      → must succeed
--   expect 'denied'  → must raise, or change 0 rows, or return null/false/empty/{"error":…}
create function pg_temp.try(p_label text, p_sql text, p_expect text) returns void language plpgsql as $f$
declare res text; n bigint; ok boolean;
begin
  begin
    execute p_sql into res;
    get diagnostics n = row_count;
    ok := true;
  exception when others then
    res := 'error ' || sqlstate || ' ' || left(sqlerrm, 100); ok := false;
    -- A refusal is a privilege error or a guard's raise. Anything else (a
    -- missing column, a not-null) means the TEST is broken, not the access.
    if sqlstate not in ('42501', 'P0001', '23514', '28000') then
      insert into _r(check_name, result) values (p_label, 'FAIL test error ' || res);
      return;
    end if;
  end;
  if p_expect = 'ok' then
    insert into _r(check_name, result) values (p_label, case when ok and coalesce(res, '') not like '{"error"%' then 'PASS' else 'FAIL ' || coalesce(res, 'null') end);
  else
    insert into _r(check_name, result) values (p_label,
      case when not ok then 'PASS'
           when p_sql ~* '^\s*(update|delete|insert)' and n = 0 then 'PASS'
           when p_sql ~* '^\s*select' and (res is null or res in ('false', '0', '[]', '{}', '') or res like '{"error"%') then 'PASS'
           else 'FAIL got ' || left(coalesce(res, 'null'), 120) end);
  end if;
end $f$;
grant execute on function pg_temp.sweep(text, text), pg_temp.try(text, text, text) to authenticated, anon;

create function pg_temp.as_user(p uuid) returns void language sql as $f$
  select set_config('request.jwt.claims', json_build_object('sub', p, 'role', 'authenticated')::text, true);
$f$;

-- =================================================================== learner
select pg_temp.as_user(learner) from _k; set local role authenticated;
select pg_temp.sweep('learner', 'own');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('learner: cannot read the neighbour''s evidence', format('select count(*) from portfolio_items where id = %L', k.item2), 'denied');
  perform pg_temp.try('learner: cannot read any pastoral note about self', format('select count(*) from pastoral_notes where student_id = %L', k.sid), 'denied');
  perform pg_temp.try('learner: cannot record an assessment decision on self',
    format($s$insert into portfolio_assessment_decisions(learner_id, qualification_code, unit_code, ac_code, decision, assessor_id) values (%L,'X','1','1.1','passed',%L) returning id$s$, k.learner, k.learner), 'denied');
  perform pg_temp.try('learner: cannot mark own attendance',
    format($s$insert into college_attendance(student_id, date, status) values (%L, current_date, 'Present') returning id$s$, k.sid), 'denied');
  perform pg_temp.try('learner: cannot verify own OTJ hours',
    format($s$update college_otj_entries set verification_status = 'verified', verified_by = %L where student_id = %L returning id$s$, k.learner, k.learner), 'denied');
  perform pg_temp.try('learner: cannot write a pastoral note', format($s$insert into pastoral_notes(student_id, college_id, body) values (%L, %L, 'x') returning id$s$, k.sid, k.ng), 'denied');
  perform pg_temp.try('learner: reads own OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'ok');
  perform pg_temp.try('learner: cannot read the neighbour''s OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner2), 'denied');
  perform pg_temp.try('learner: reads own criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'ok');
  perform pg_temp.try('learner: cannot read the neighbour''s criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner2), 'denied');
  perform pg_temp.try('learner: no staff inbox', format('select public.get_college_inbox(%L)::text', k.ng), 'denied');
  perform pg_temp.try('learner: no college evidence board', format('select public.get_evidence_pack_board(%L)::text', k.ng), 'denied');
  perform pg_temp.try('learner: cannot read college staff', 'select count(*) from college_staff', 'denied');
  perform pg_temp.try('learner: cannot read employer tokens', 'select count(*) from college_employer_tokens', 'denied');
  perform pg_temp.try('learner: cannot see other learners'' assessor invite tokens', 'select count(*) from portfolio_assessor_links where token is not null and learner_id <> auth.uid()', 'denied');
end $$;
reset role;

-- =================================================================== fixture tutor
select pg_temp.as_user(tutor) from _k; set local role authenticated;
select pg_temp.sweep('tutor', 'college');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('tutor: sees Northgate learners', 'select (count(*) > 0)::text from college_students', 'ok');
  perform pg_temp.try('tutor: reads a learner''s OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'ok');
  perform pg_temp.try('tutor: reads a learner''s criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'ok');
  perform pg_temp.try('tutor: has the college inbox', format('select public.get_college_inbox(%L)::text', k.ng), 'ok');
  perform pg_temp.try('tutor: reads the tutors'' pastoral note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k.note_tut), 'ok');
  -- ELE-1911 (Andrew, 8 Oct): the learner's OWN tutor (cohort tutor or named on
  -- the assignment) reads that learner's safeguarding notes. The fixture tutor
  -- tutors the fixture learner's cohort. Assessor, IQA, EQA and other tutors
  -- still cannot (checked below and under each role).
  perform pg_temp.try('tutor (own tutor, not DSL): reads own learner''s safeguarding note (ELE-1911)', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k.note_sg), 'ok');
  perform pg_temp.try('tutor: cannot see another college''s learners', format('select count(*) from college_students where college_id = %L', k.other_college), 'denied');
  perform pg_temp.try('tutor: cannot record an IQA verdict',
    format($s$update portfolio_assessment_decisions set iqa_verdict = 'confirmed' where learner_id = %L returning id$s$, k.learner), 'denied');
  perform pg_temp.try('tutor: cannot add a learner to another college',
    format($s$insert into college_students(college_id, name, email) values (%L, 'x', 'x@example.invalid') returning id$s$, k.other_college), 'denied');
end $$;
reset role;

-- ELE-1911 boundary: a Northgate tutor who does not tutor the learner's cohort
-- (and is not named on the learner's assignment) still cannot read it.
select pg_temp.as_user(ntutor) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('tutor (not own tutor, not DSL): cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
  perform pg_temp.try('tutor (not own tutor): reads the tutors'' pastoral note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k.note_tut), 'ok');
end $$;
reset role;

-- =================================================================== safeguarding lead
select pg_temp.as_user(dsl) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('DSL: reads the safeguarding note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k.note_sg), 'ok');
end $$;
reset role;

-- =================================================================== assessor
select pg_temp.as_user(assessor) from _k; set local role authenticated;
select pg_temp.sweep('assessor', 'college');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('assessor: records a decision for a Northgate learner',
    format($s$insert into portfolio_assessment_decisions(id, learner_id, qualification_code, unit_code, ac_code, decision, assessor_id, method, feedback_source) values (%L, %L, 'RLS', '1', '1.1', 'passed', %L, 'evidence_review', 'assessor') returning id$s$, k.decision, k.learner, k.assessor), 'ok');
  perform pg_temp.try('assessor: cannot confirm own decision as IQA',
    format($s$update portfolio_assessment_decisions set iqa_verdict = 'confirmed' where id = %L returning id$s$, k.decision), 'denied');
  perform pg_temp.try('assessor: cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
  perform pg_temp.try('assessor: cannot make self college admin',
    format($s$update college_staff set role = 'admin' where user_id = %L returning id$s$, k.assessor), 'denied');
end $$;
reset role;

-- =================================================================== IQA
select pg_temp.as_user(iqa) from _k; set local role authenticated;
select pg_temp.sweep('IQA', 'college');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('IQA: confirms the assessor''s decision',
    format($s$update portfolio_assessment_decisions set iqa_verdict = 'confirmed', iqa_by = %L, iqa_at = now() where id = %L returning id$s$, k.iqa, k.decision), 'ok');
  perform pg_temp.try('IQA: cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
  perform pg_temp.try('IQA: cannot sample another college',
    format($s$insert into college_iqa_findings(college_id, assessor_name, finding_type, description) values (%L, 'x', 'Concern', 'x') returning id$s$, k.other_college), 'denied');
end $$;
reset role;

-- =================================================================== college admin
select pg_temp.as_user(cadmin) from _k; set local role authenticated;
select pg_temp.sweep('college admin', 'college');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('college admin: adds a tutor',
    format($s$insert into college_staff(college_id, name, email, role, status) values (%L, 'RLS new tutor', 'rls-verify-new@example.invalid', 'tutor', 'Active') returning id$s$, k.ng), 'ok');
  perform pg_temp.try('college admin: cannot add staff to another college',
    format($s$insert into college_staff(college_id, name, email, role, status) values (%L, 'x', 'x@example.invalid', 'tutor', 'Active') returning id$s$, k.other_college), 'denied');
  perform pg_temp.try('college admin: cannot make self platform admin',
    format($s$update profiles set admin_role = 'super_admin' where id = %L returning id$s$, k.cadmin), 'denied');
  perform pg_temp.try('college admin: with a DSL named, cannot read the safeguarding note',
    format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
end $$;
reset role;

-- =================================================================== EQA (read-only)
select pg_temp.as_user(eqa) from _k; set local role authenticated;
select pg_temp.sweep('EQA', 'college');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('EQA: can read the roll', 'select (count(*) > 0)::text from college_students', 'ok');
  perform pg_temp.try('EQA: cannot edit a learner', format($s$update college_students set name = 'x' where id = %L returning id$s$, k.sid), 'denied');
  perform pg_temp.try('EQA: cannot take a register', format($s$insert into college_attendance(student_id, date, status) values (%L, current_date, 'Present') returning id$s$, k.sid), 'denied');
  perform pg_temp.try('EQA: cannot delete attendance', format('delete from college_attendance where student_id = %L returning id', k.sid), 'denied');
  perform pg_temp.try('EQA: cannot write a pastoral note', format($s$insert into pastoral_notes(student_id, college_id, body) values (%L, %L, 'x') returning id$s$, k.sid, k.ng), 'denied');
  perform pg_temp.try('EQA: cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
end $$;
reset role;

-- =================================================================== platform admin
select pg_temp.as_user(padmin) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('platform admin: reads a learner''s OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'ok');
  perform pg_temp.try('platform admin: reads a learner''s criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'ok');
end $$;
reset role;

-- =================================================================== independent assessor
select pg_temp.as_user(indep) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('independent assessor: reads the linked learner''s criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'ok');
  perform pg_temp.try('independent assessor: cannot read an unlinked learner''s evidence', format('select count(*) from portfolio_items where user_id = %L', k.learner2), 'denied');
  perform pg_temp.try('independent assessor: cannot read the college roll', format('select count(*) from college_students where college_id = %L', k.ng), 'denied');
  perform pg_temp.try('independent assessor: cannot read pastoral notes', format('select count(*) from pastoral_notes where student_id = %L', k.sid), 'denied');
  perform pg_temp.try('independent assessor: cannot read the learner''s OTJ hours', format('select public.get_otj_summary(%L)::text', k.learner2), 'denied');
end $$;
reset role;

-- =================================================================== tutor at another college
select pg_temp.as_user(otutor) from _k; set local role authenticated;
select pg_temp.sweep('other-college tutor', 'none');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('other-college tutor: no OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'denied');
  perform pg_temp.try('other-college tutor: no criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'denied');
  perform pg_temp.try('other-college tutor: no OTJ trajectory', format('select public.get_otj_trajectory(%L)::text', k.learner), 'denied');
  perform pg_temp.try('other-college tutor: no app-learning days', format('select public.get_learner_app_days(%L, current_date - 60)::text', k.learner), 'denied');
  perform pg_temp.try('other-college tutor: no Northgate evidence board', format('select public.get_evidence_pack_board(%L)::text', k.ng), 'denied');
  perform pg_temp.try('other-college tutor: cannot take a Northgate register', format($s$insert into college_attendance(student_id, date, status) values (%L, current_date, 'Present') returning id$s$, k.sid), 'denied');
  perform pg_temp.try('other-college tutor: cannot record a decision', format($s$insert into portfolio_assessment_decisions(learner_id, qualification_code, unit_code, ac_code, decision, assessor_id) values (%L,'X','1','1.1','passed',%L) returning id$s$, k.learner, k.otutor), 'denied');
  perform pg_temp.try('other-college tutor: cannot write a pastoral note', format($s$insert into pastoral_notes(student_id, college_id, body) values (%L, %L, 'x') returning id$s$, k.sid, k.ng), 'denied');
end $$;
reset role;

-- =================================================================== employer account
select pg_temp.as_user(employer) from _k; set local role authenticated;
select pg_temp.sweep('employer account', 'none');
reset role;

-- =================================================================== outsider (signed in, no college)
select pg_temp.as_user(outsider) from _k; set local role authenticated;
select pg_temp.sweep('outsider', 'none');
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('outsider: no OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'denied');
  perform pg_temp.try('outsider: no criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'denied');
  perform pg_temp.try('outsider: no OTJ trajectory', format('select public.get_otj_trajectory(%L)::text', k.learner), 'denied');
  perform pg_temp.try('outsider: no app-learning days', format('select public.get_learner_app_days(%L, current_date - 60)::text', k.learner), 'denied');
  perform pg_temp.try('outsider: no college inbox', format('select public.get_college_inbox(%L)::text', k.ng), 'denied');
  perform pg_temp.try('outsider: no portfolio summaries', 'select public.college_portfolio_summaries()::text', 'denied');
  perform pg_temp.try('outsider: cannot prepare a learner''s hours statement', format('select public.prepare_otj_hours_statement(%L, 100, null, null)::text', k.learner), 'denied');
  perform pg_temp.try('outsider: cannot read the tripartite token', format('select public.get_tripartite_employer_link(%L)', k.review), 'denied');
  perform pg_temp.try('outsider: cannot make self college staff',
    format($s$update profiles set college_id = %L, college_role = 'admin' where id = %L returning id$s$, k.ng, k.outsider), 'denied');
  perform pg_temp.try('outsider: cannot add self as Northgate staff',
    format($s$insert into college_staff(college_id, user_id, name, email, role, status) values (%L, %L, 'x', 'x@example.invalid', 'tutor', 'Active') returning id$s$, k.ng, k.outsider), 'denied');
  perform pg_temp.try('outsider: cannot join as a learner without a code',
    format($s$insert into college_students(college_id, user_id, name, email) values (%L, %L, 'x', 'x@example.invalid') returning id$s$, k.ng, k.outsider), 'denied');
  perform pg_temp.try('outsider: a made-up join code is refused', $s$select public.accept_college_invite('RLS-NOPE-0000')::text$s$, 'denied');
end $$;
reset role;

-- Per-user analytics views that bypass RLS (June audit, still open on 7 Oct)
select pg_temp.as_user(outsider) from _k; set local role authenticated;
do $$ declare v text; c bigint; begin
  foreach v in array array['learner_assessments', 'user_activity_summary', 'user_engagement_by_area', 'user_study_detail'] loop
    begin execute format('select count(*) from public.%I where user_id <> auth.uid()', v) into c;
    exception when insufficient_privilege then c := 0; end;
    insert into _r(check_name, result) values ('outsider: reads no one else''s rows in ' || v, case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows of other users' end);
  end loop;
end $$;
reset role;

-- =================================================================== tokens (employer / witness / share)
create temp table _tok (tok text) on commit drop;
grant all on _tok to authenticated, anon;
-- The tutor books a review; the employer opens it by the link's token, with no account.
select pg_temp.as_user(tutor) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  insert into college_tripartite_reviews(id, college_id, student_id, scheduled_at, mode, tutor_staff_id, outcomes)
  values (k.review, k.ng, k.sid, now() + interval '2 days', 'video',
          (select id from college_staff where user_id = auth.uid() limit 1),
          '{"safeguarding_check":"SAFEGUARDING-MARKER"}');
  insert into _tok values (public.get_tripartite_employer_link(k.review));
end $$;
reset role;

-- =================================================================== anonymous
select set_config('request.jwt.claims', '{"role":"anon"}', true); set local role anon;
select pg_temp.sweep('anonymous', 'nothing');
do $$ declare k record; res jsonb; c bigint; b text; begin select * into k from _k;
  res := public.get_tripartite_review_public((select tok from _tok));
  insert into _r(check_name, result) values ('employer token: opens its own review', case when res->>'learner_name' is not null and not res ? 'error' then 'PASS' else 'FAIL ' || left(res::text, 100) end);
  insert into _r(check_name, result) values ('employer token: no safeguarding text in the employer''s view', case when res::text not like '%SAFEGUARDING-MARKER%' then 'PASS' else 'FAIL' end);
  perform pg_temp.try('employer token: a made-up token opens nothing', $s$select public.get_tripartite_review_public(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('employer token: cannot submit input on a made-up token', $s$select public.submit_tripartite_employer_input(repeat('a', 40), '{}'::jsonb)::text$s$, 'denied');
  perform pg_temp.try('employer token: cannot sign a made-up review', $s$select public.sign_tripartite_review_employer(repeat('a', 40), 'x', 'x')::text$s$, 'denied');
  perform pg_temp.try('employer token: made-up OTJ statement token', $s$select public.get_otj_hours_statement_public(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('witness token: made-up token opens nothing', $s$select public.get_witness_request(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('assessor invite: made-up token opens nothing', $s$select public.get_assessor_invite(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('portfolio share: made-up token opens nothing', $s$select public.get_shared_portfolio(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('portfolio share: made-up token has no entries', $s$select public.get_shared_portfolio_entries(repeat('a', 40))::text$s$, 'denied');
  perform pg_temp.try('anonymous: cannot list share tokens', 'select count(*) from portfolio_shares', 'denied');
  perform pg_temp.try('anonymous: cannot read reviews off the table', 'select count(*) from college_tripartite_reviews', 'denied');
  perform pg_temp.try('anonymous: no OTJ summary', format('select public.get_otj_summary(%L)::text', k.learner), 'denied');
  perform pg_temp.try('anonymous: no criteria state', format('select public.get_portfolio_ac_state(%L)::text', k.learner), 'denied');
  perform pg_temp.try('anonymous: no OTJ trajectory', format('select public.get_otj_trajectory(%L)::text', k.learner), 'denied');
  perform pg_temp.try('anonymous: no app-learning days', format('select public.get_learner_app_days(%L, current_date - 60)::text', k.learner), 'denied');
  perform pg_temp.try('anonymous: no portfolio summaries', 'select public.college_portfolio_summaries()::text', 'denied');
  perform pg_temp.try('anonymous: no college OTJ', 'select public.get_college_otj(null)::text', 'denied');
  perform pg_temp.try('anonymous: cannot prepare a learner''s hours statement', format('select public.prepare_otj_hours_statement(%L, 100, null, null)::text', k.learner), 'denied');
  perform pg_temp.try('anonymous: cannot propose an ILP goal', $s$select public.propose_ilp_goal('x', null, null, null, null, null)::text$s$, 'denied');
  perform pg_temp.try('anonymous: cannot redeem a join code', $s$select public.accept_college_invite('NTCY2DEMO')::text$s$, 'denied');
  -- Storage: private college buckets list nothing; portfolio-evidence stays PUBLIC
  -- by Andrew's decision (6 Oct) but its objects must not be LISTABLE.
  foreach b in array array['college-learner-evidence', 'college-resources', 'portfolio-exports', 'tutor-assessment-docs', 'portfolio-evidence'] loop
    begin select count(*) into c from storage.objects where bucket_id = b;
    exception when insufficient_privilege then c := 0; end;
    insert into _r(check_name, result) values ('anonymous: cannot list ' || b, case when c = 0 then 'PASS' else 'FAIL lists ' || c || ' objects' end);
  end loop;
  begin select count(*) into c from public.user_study_detail;
  exception when insufficient_privilege then c := 0; end;
  insert into _r(check_name, result) values ('anonymous: reads no one''s study history (user_study_detail)', case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows' end);
  begin select count(*) into c from public.user_activity_summary;
  exception when insufficient_privilege then c := 0; end;
  insert into _r(check_name, result) values ('anonymous: reads no one''s activity (user_activity_summary)', case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows' end);
  begin select count(*) into c from public.user_engagement_by_area;
  exception when insufficient_privilege then c := 0; end;
  insert into _r(check_name, result) values ('anonymous: reads no one''s engagement (user_engagement_by_area)', case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows' end);
  begin select count(*) into c from public.college_outreach;
  exception when insufficient_privilege then c := 0; end;
  insert into _r(check_name, result) values ('anonymous: reads no college sales list', case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows' end);
end $$;
reset role;

-- Outsider and the other college's tutor cannot list college buckets either.
select pg_temp.as_user(outsider) from _k; set local role authenticated;
do $$ declare b text; c bigint; begin
  foreach b in array array['college-learner-evidence', 'college-resources', 'portfolio-exports', 'tutor-assessment-docs'] loop
    begin select count(*) into c from storage.objects where bucket_id = b;
    exception when insufficient_privilege then c := 0; end;
    insert into _r(check_name, result) values ('outsider: cannot list ' || b, case when c = 0 then 'PASS' else 'FAIL lists ' || c || ' objects' end);
  end loop;
end $$;
reset role;

-- Per-user analytics views: an ordinary signed-in user sees no one else's rows.
select pg_temp.as_user(outsider) from _k; set local role authenticated;
do $$ declare v text; c bigint; me uuid := auth.uid(); begin
  foreach v in array array['user_study_detail','user_activity_summary','user_engagement_by_area','learner_assessments','ai_usage_stats'] loop
    execute format('select count(*) from public.%I where user_id is distinct from $1', v) into c using me;
    insert into _r(check_name, result) values ('outsider: sees no other users in ' || v, case when c = 0 then 'PASS' else 'FAIL sees ' || c || ' rows' end);
  end loop;
end $$;
reset role;

-- =================================================================== ELE-1898: the permissions matrix
-- college_can() is the one answer to "may this person do X here?". Every
-- capability is checked for every role against the matrix written out BY
-- HAND below (not read from the table, so a change to the table that nobody
-- meant shows up here), then the RLS behind the important ones is exercised.
--
-- Northgate is MANAGED from here on (the transient college admin above is a
-- linked admin), so the no-manager bootstrap does not apply; it is checked
-- separately at South Thames, which has no manager.
--
-- Actors: the fixture tutor (447a7e47), Owen Price (assessor fixture), Priya
-- Nair (IQA fixture, also the named DSL), the transient college admin and
-- EQA from above, and two new transients: a head of department, and a
-- support worker who is ALSO a Northgate learner (the two-role person).
create temp table _k2 on commit drop as select
  'fc000000-1852-4000-8003-000000000002'::uuid owen,
  'fc000000-1852-4000-8003-000000000001'::uuid priya,
  'f1e70000-0000-4000-8000-0000000000c1'::uuid hod,
  'f1e70000-0000-4000-8000-0000000000c2'::uuid support,
  gen_random_uuid() support_sid, gen_random_uuid() note_only_me, gen_random_uuid() note_lead,
  gen_random_uuid() cohort_new, gen_random_uuid() plan_new;
grant select on _k2 to authenticated, anon;

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, raw_app_meta_data,
                        created_at, updated_at, email_confirmed_at)
select v.id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
       'rls-verify-' || v.tag || '@example.invalid', jsonb_build_object('full_name', 'RLS ' || v.tag),
       '{}'::jsonb, now(), now(), now()
from _k2, lateral (values (hod, 'hod'), (support, 'support')) v(id, tag);
insert into college_staff (college_id, user_id, name, email, role, status)
select k.ng, v.u, 'RLS ' || v.r, 'rls-verify-' || v.r || '@example.invalid', v.r2, 'Active'
from _k k, _k2 k2, lateral (values (k2.hod, 'hod', 'head_of_department'), (k2.support, 'support', 'support')) v(u, r, r2);
-- The support worker is also a learner at Northgate.
insert into college_students (id, college_id, user_id, name, email, cohort_id, status)
select k2.support_sid, k.ng, k2.support, 'RLS support learner', 'rls-verify-support@example.invalid', k.cohort, 'Active'
from _k k, _k2 k2;
-- Two private pastoral notes on the fixture learner, written by the DSL transient.
insert into pastoral_notes (id, student_id, college_id, author_id, kind, visibility, title, body)
select k2.note_only_me, k.sid, k.ng, (select id from college_staff where user_id = k.dsl), 'note', 'author_only', 'RLS', 'only me'
from _k k, _k2 k2;
insert into pastoral_notes (id, student_id, college_id, author_id, kind, visibility, title, body)
select k2.note_lead, k.sid, k.ng, (select id from college_staff where user_id = k.dsl), 'note', 'course_lead', 'RLS', 'course leads'
from _k k, _k2 k2;

-- The expected matrix, by hand. hod/admin: everything except safeguarding
-- (flag-driven) and read_only.
create temp table _exp (actor text, uid uuid, caps text[]) on commit drop;
grant select on _exp to authenticated;
insert into _exp
select 'tutor', k.tutor, array['learners.view_mine','learners.view_all','learners.edit','register.take','assess.decide',
  'pastoral.read','safeguarding.raise','messages.send','observations.record','reviews.write','exports'] from _k k
union all
select 'assessor', k2.owen, array['learners.view_mine','learners.view_all','learners.edit','register.take','assess.decide',
  'pastoral.read','safeguarding.raise','messages.send','observations.record','reviews.write','exports'] from _k2 k2
union all
select 'IQA (and DSL)', k2.priya, array['learners.view_mine','learners.view_all','learners.edit','assess.decide','iqa.sample',
  'iqa.verdict','pastoral.read','safeguarding.raise','safeguarding.read','safeguarding.manage','messages.send',
  'observations.record','reviews.write','exports','quality.view','quality.edit'] from _k2 k2
union all
select 'head of department', k2.hod, array(select key from college_capabilities where key not in ('safeguarding.read','safeguarding.manage','read_only')) from _k2 k2
union all
select 'college admin', k.cadmin, array(select key from college_capabilities where key not in ('safeguarding.read','safeguarding.manage','read_only')) from _k k
union all
select 'support', k2.support, array['learners.view_mine','learners.view_all','learner.view_as','read_only'] from _k2 k2
union all
select 'EQA', k.eqa, array['learners.view_mine','learners.view_all','read_only'] from _k k
union all
select 'outsider', k.outsider, array[]::text[] from _k k
union all
select 'other-college tutor', k.otutor, array[]::text[] from _k k;

create function pg_temp.matrix_for(p_actor text) returns void language plpgsql as $f$
declare e record; c record; got boolean; caps jsonb; k record;
begin
  select * into k from _k;
  select * into e from _exp where actor = p_actor;
  for c in select key from college_capabilities order by sort loop
    got := public.college_can(c.key, k.ng);
    insert into _r(check_name, result) values (
      'matrix: ' || p_actor || ' ' || case when c.key = any(e.caps) then 'CAN ' else 'cannot ' end || c.key,
      case when got = (c.key = any(e.caps)) then 'PASS' else 'FAIL college_can said ' || got end);
  end loop;
  -- The app's one RPC returns exactly the same answers.
  caps := public.get_my_college_capabilities(k.ng) -> 'can';
  insert into _r(check_name, result) values ('matrix: ' || p_actor || ' — get_my_college_capabilities agrees with college_can',
    case when (select bool_and((caps ->> key)::boolean = (key = any(e.caps))) from college_capabilities) then 'PASS'
         else 'FAIL ' || left(caps::text, 200) end);
end $f$;
grant execute on function pg_temp.matrix_for(text) to authenticated;

select pg_temp.as_user(tutor) from _k; set local role authenticated; select pg_temp.matrix_for('tutor'); reset role;
select pg_temp.as_user(owen) from _k2; set local role authenticated; select pg_temp.matrix_for('assessor'); reset role;
select pg_temp.as_user(priya) from _k2; set local role authenticated; select pg_temp.matrix_for('IQA (and DSL)'); reset role;
select pg_temp.as_user(hod) from _k2; set local role authenticated; select pg_temp.matrix_for('head of department'); reset role;
select pg_temp.as_user(cadmin) from _k; set local role authenticated; select pg_temp.matrix_for('college admin'); reset role;
select pg_temp.as_user(support) from _k2; set local role authenticated; select pg_temp.matrix_for('support'); reset role;
select pg_temp.as_user(eqa) from _k; set local role authenticated; select pg_temp.matrix_for('EQA'); reset role;
select pg_temp.as_user(outsider) from _k; set local role authenticated; select pg_temp.matrix_for('outsider'); reset role;
select pg_temp.as_user(otutor) from _k; set local role authenticated; select pg_temp.matrix_for('other-college tutor'); reset role;

-- Bootstrap: South Thames has no admin or head of department, so its tutor
-- runs the basics there, but can never hand out roles.
select pg_temp.as_user(otutor) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  insert into _r(check_name, result) values ('bootstrap: tutor at a college with no manager can manage staff there',
    case when public.college_can('staff.manage', k.other_college) then 'PASS' else 'FAIL' end);
  insert into _r(check_name, result) values ('bootstrap: … and cohorts and settings',
    case when public.college_can('cohorts.manage', k.other_college) and public.college_can('settings.manage', k.other_college) then 'PASS' else 'FAIL' end);
  insert into _r(check_name, result) values ('bootstrap: … but never give out roles',
    case when not public.college_can('staff.grant_roles', k.other_college) then 'PASS' else 'FAIL' end);
end $$;
reset role;

-- ---------------------------------------------------- behaviour behind the matrix
-- tutor (Northgate is managed now)
select pg_temp.as_user(tutor) from _k; set local role authenticated;
do $$ declare k record; k2 record; begin select * into k from _k; select * into k2 from _k2;
  perform pg_temp.try('tutor: takes a register', format($s$insert into college_attendance(student_id, date, status) values (%L, current_date - 400, 'Present') returning id$s$, k.sid), 'ok');
  perform pg_temp.try('tutor: cannot create a cohort', format($s$insert into college_cohorts(college_id, name) values (%L, 'RLS cohort') returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot delete a cohort', format('delete from college_cohorts where id = %L returning id', k.cohort), 'denied');
  perform pg_temp.try('tutor: cannot create a course', format($s$insert into college_courses(college_id, name) values (%L, 'RLS course') returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot change college settings', format($s$insert into college_settings(college_id) values (%L) on conflict (college_id) do update set updated_at = now() returning college_id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot change the college''s details', format($s$update colleges set phone = phone where id = %L returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot add staff', format($s$insert into college_staff(college_id, name, email, role, status) values (%L, 'x', 'x@example.invalid', 'tutor', 'Active') returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot create a staff invite', format($s$insert into college_invites(college_id, invite_code, invite_type, role_to_assign) values (%L, 'RLS-STAFF-1', 'staff', 'admin') returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot start an IQA sampling plan', format($s$insert into college_iqa_sampling(college_id, period_start, period_end) values (%L, current_date, current_date + 30) returning id$s$, k.ng), 'denied');
  perform pg_temp.try('tutor: cannot set the EQA visit', format('select public.set_college_next_eqa_visit(%L, current_date + 30)::text', k.ng), 'denied');
  perform pg_temp.try('tutor: cannot read a note marked "Only me" by someone else', format('select count(*) from pastoral_notes where id = %L', k2.note_only_me), 'denied');
  perform pg_temp.try('tutor: cannot read a "Course leads only" note', format('select count(*) from pastoral_notes where id = %L', k2.note_lead), 'denied');
  perform pg_temp.try('tutor: cannot log a support look at a learner', format('select public.log_college_view_as(%L)::text', k.sid), 'denied');
end $$;
reset role;

-- assessor (Owen)
select pg_temp.as_user(owen) from _k2; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('assessor: cannot change college settings', format($s$insert into college_settings(college_id) values (%L) on conflict (college_id) do update set updated_at = now() returning college_id$s$, k.ng), 'denied');
  perform pg_temp.try('assessor: cannot start an IQA sampling plan', format($s$insert into college_iqa_sampling(college_id, period_start, period_end) values (%L, current_date, current_date + 30) returning id$s$, k.ng), 'denied');
  perform pg_temp.try('assessor: cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
end $$;
reset role;

-- IQA (Priya)
select pg_temp.as_user(priya) from _k2; set local role authenticated;
do $$ declare k record; k2 record; begin select * into k from _k; select * into k2 from _k2;
  perform pg_temp.try('IQA: starts a sampling plan', format($s$insert into college_iqa_sampling(id, college_id, period_start, period_end) values (%L, %L, current_date, current_date + 30) returning id$s$, k2.plan_new, k.ng), 'ok');
  perform pg_temp.try('IQA: cannot sample their own assessing',
    format($s$insert into college_iqa_sampling(college_id, period_start, period_end, assessor_id) values (%L, current_date, current_date + 30, (select id from college_staff where user_id = auth.uid() limit 1)) returning id$s$, k.ng), 'denied');
  perform pg_temp.try('IQA: sets the next EQA visit', format('select public.set_college_next_eqa_visit(%L, current_date + 30)::text', k.ng), 'ok');
  perform pg_temp.try('IQA: does not take registers', format($s$insert into college_attendance(student_id, date, status) values (%L, current_date - 401, 'Present') returning id$s$, k.sid), 'denied');
  perform pg_temp.try('IQA (named DSL): reads the safeguarding note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k.note_sg), 'ok');
  perform pg_temp.try('IQA: cannot change college settings', format($s$update colleges set phone = phone where id = %L returning id$s$, k.ng), 'denied');
end $$;
reset role;

-- head of department
select pg_temp.as_user(hod) from _k2; set local role authenticated;
do $$ declare k record; k2 record; begin select * into k from _k; select * into k2 from _k2;
  perform pg_temp.try('head of department: creates a cohort', format($s$insert into college_cohorts(id, college_id, name) values (%L, %L, 'RLS cohort') returning id$s$, k2.cohort_new, k.ng), 'ok');
  perform pg_temp.try('head of department: deletes that cohort', format('delete from college_cohorts where id = %L returning id', k2.cohort_new), 'ok');
  perform pg_temp.try('head of department: changes college settings', format($s$insert into college_settings(college_id) values (%L) on conflict (college_id) do update set updated_at = now() returning college_id$s$, k.ng), 'ok');
  perform pg_temp.try('head of department: changes the college''s details', format($s$update colleges set phone = phone where id = %L returning id$s$, k.ng), 'ok');
  perform pg_temp.try('head of department: names a deputy safeguarding lead', format($s$update college_staff set is_deputy_dsl = true where user_id = %L returning id$s$, k.assessor), 'ok');
  perform pg_temp.try('head of department: cannot change own role', format($s$update college_staff set role = 'tutor' where user_id = %L returning id$s$, k2.hod), 'denied');
  perform pg_temp.try('head of department: reads a "Course leads only" note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k2.note_lead), 'ok');
  perform pg_temp.try('head of department: cannot read someone else''s "Only me" note', format('select count(*) from pastoral_notes where id = %L', k2.note_only_me), 'denied');
  perform pg_temp.try('head of department (DSL named): cannot read the safeguarding note', format('select count(*) from pastoral_notes where id = %L', k.note_sg), 'denied');
  perform pg_temp.try('head of department: logs a look at a learner', format('select public.log_college_view_as(%L)::text', k.sid), 'ok');
end $$;
reset role;

-- the note's author (the DSL transient)
select pg_temp.as_user(dsl) from _k; set local role authenticated;
do $$ declare k2 record; begin select * into k2 from _k2;
  perform pg_temp.try('author: reads own "Only me" note', format('select (count(*) = 1)::text from pastoral_notes where id = %L', k2.note_only_me), 'ok');
end $$;
reset role;

-- support (read only, and also a learner)
select pg_temp.as_user(support) from _k2; set local role authenticated;
do $$ declare k record; k2 record; caps jsonb; begin select * into k from _k; select * into k2 from _k2;
  perform pg_temp.try('support: reads the roll', 'select (count(*) > 1)::text from college_students', 'ok');
  perform pg_temp.try('support: cannot edit a learner', format($s$update college_students set name = name where id = %L returning id$s$, k.sid), 'denied');
  perform pg_temp.try('support: cannot take a register', format($s$insert into college_attendance(student_id, date, status) values (%L, current_date - 402, 'Present') returning id$s$, k.sid), 'denied');
  perform pg_temp.try('support: cannot write a pastoral note', format($s$insert into pastoral_notes(student_id, college_id, body) values (%L, %L, 'x') returning id$s$, k.sid, k.ng), 'denied');
  perform pg_temp.try('support: cannot read the tutors'' pastoral note', format('select count(*) from pastoral_notes where id = %L', k.note_tut), 'denied');
  perform pg_temp.try('support: cannot record a decision', format($s$insert into portfolio_assessment_decisions(learner_id, qualification_code, unit_code, ac_code, decision, assessor_id) values (%L,'X','1','1.1','passed',%L) returning id$s$, k.learner, k2.support), 'denied');
  perform pg_temp.try('support: cannot message a learner as staff', format($s$insert into student_message_threads(student_id, college_id) values (%L, %L) returning id$s$, k.sid, k.ng), 'denied');
  perform pg_temp.try('support: cannot add staff', format($s$insert into college_staff(college_id, name, email, role, status) values (%L, 'x', 'x@example.invalid', 'tutor', 'Active') returning id$s$, k.ng), 'denied');
  perform pg_temp.try('support: logs a read-only look at a learner', format('select public.log_college_view_as(%L)::text', k.sid), 'ok');
  -- the same person, as a learner
  perform pg_temp.try('two-role (support + learner): still opens own message thread as a learner', format($s$insert into student_message_threads(student_id, college_id) values (%L, %L) returning id$s$, k2.support_sid, k.ng), 'ok');
  caps := public.get_my_college_capabilities(k.ng);
  insert into _r(check_name, result) values ('two-role: capabilities say also_learner and read_only',
    case when (caps ->> 'also_learner')::boolean and (caps -> 'can' ->> 'read_only')::boolean then 'PASS' else 'FAIL ' || left(caps::text, 120) end);
end $$;
reset role;

-- audit: every role and duty change lands in college_activity
insert into _r(check_name, result)
select 'audit: adding staff is logged', case when count(*) > 0 then 'PASS' else 'FAIL no staff_added row' end
from college_activity where action = 'staff_added' and details ->> 'name' = 'RLS new tutor';
insert into _r(check_name, result)
select 'audit: naming a deputy DSL is logged with who did it', case when count(*) = 1 then 'PASS' else 'FAIL ' || count(*) || ' rows' end
from college_activity a, _k2 k2 where a.action = 'staff_duties_changed' and a.actor_id = k2.hod
  and a.details -> 'changes' ? 'is_deputy_dsl';
insert into _r(check_name, result)
select 'audit: a support look at a learner is logged', case when count(*) = 1 then 'PASS' else 'FAIL ' || count(*) || ' rows' end
from college_activity a, _k2 k2 where a.action = 'viewed_learner_as_support' and a.actor_id = k2.support;

-- last manager: the head of department leaves (the admin remains), then the
-- admin, now the last one, cannot remove themselves or step down.
select pg_temp.as_user(hod) from _k2; set local role authenticated;
do $$ declare k2 record; begin select * into k2 from _k2;
  perform pg_temp.try('last manager: a head of department can leave while an admin remains', format('delete from college_staff where user_id = %L returning id', k2.hod), 'ok');
end $$;
reset role;
select pg_temp.as_user(cadmin) from _k; set local role authenticated;
do $$ declare k record; begin select * into k from _k;
  perform pg_temp.try('last manager: the last admin cannot remove themselves', format('delete from college_staff where user_id = %L returning id', k.cadmin), 'denied');
end $$;
reset role;
insert into _r(check_name, result)
select 'last manager: Northgate still has its admin', case when count(*) = 1 then 'PASS' else 'FAIL' end
from college_staff s, _k k where s.user_id = k.cadmin and s.archived_at is null;

-- structure: every capability has a row decision for every role in this file's matrix
insert into _r(check_name, result)
select 'structure: every role in the matrix table is one college_staff.role allows',
  case when count(*) = 0 then 'PASS' else 'FAIL ' || string_agg(distinct role, ', ') end
from college_role_capabilities where role not in ('tutor','assessor','iqa','eqa','head_of_department','admin','support');
insert into _r(check_name, result)
select 'structure: college_can and the capability RPCs are not callable by anonymous',
  case when not has_function_privilege('anon', 'public.college_can(text, uuid, uuid)', 'execute')
        and not has_function_privilege('anon', 'public.get_my_college_capabilities(uuid)', 'execute')
        and not has_function_privilege('anon', 'public.log_college_view_as(uuid)', 'execute')
        and not has_function_privilege('anon', 'public.set_college_next_eqa_visit(uuid, date)', 'execute')
       then 'PASS' else 'FAIL' end;

-- =================================================================== structure
insert into _r(check_name, result)
select 'buckets: ' || id || ' is private', case when not public then 'PASS' else 'FAIL bucket is public' end
from storage.buckets where id in ('college-learner-evidence', 'college-resources', 'portfolio-exports', 'tutor-assessment-docs');
insert into _r(check_name, result)
select 'structure: RLS is on for ' || count(*) || ' college/portfolio tables',
       case when count(*) filter (where not c.relrowsecurity) = 0 then 'PASS'
            else 'FAIL off on ' || string_agg(c.relname, ', ') filter (where not c.relrowsecurity) end
from pg_class c join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
where c.relkind = 'r' and (c.relname like 'college\_%' or c.relname like 'portfolio\_%' or c.relname like '%otj%' or c.relname = 'pastoral_notes');
insert into _r(check_name, result)
select 'structure: college/portfolio views run as the caller (security_invoker)',
       case when count(*) = 0 then 'PASS' else 'FAIL definer views: ' || string_agg(c.relname, ', ') end
from pg_class c join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
where c.relkind = 'v' and (c.relname like 'college\_%' or c.relname like 'portfolio\_%' or c.relname like '%otj%' or c.relname like 'v\_%college%')
  and coalesce(array_to_string(c.reloptions, ','), '') !~ 'security_invoker=(on|true)';
insert into _r(check_name, result)
-- A per-user definer view is acceptable only if it filters rows to the caller
-- (auth.uid()) in its own definition (migration 20261008038000) and anon has
-- no access; the behavioural check above proves the filter works.
select 'structure: no per-user definer view is readable by signed-in users',
       case when count(*) = 0 then 'PASS' else 'FAIL ' || string_agg(c.relname, ', ' order by c.relname) end
from pg_class c join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
where c.relkind in ('v', 'm')
  and coalesce(array_to_string(c.reloptions, ','), '') !~ 'security_invoker=(on|true)'
  and exists (select 1 from pg_attribute a where a.attrelid = c.oid and a.attname = 'user_id' and not a.attisdropped)
  and (has_table_privilege('anon', c.oid, 'select')
       or (has_table_privilege('authenticated', c.oid, 'select') and pg_get_viewdef(c.oid) !~ 'auth\.uid\(\)'));

do $x$ begin raise exception 'RESULTS:%', (select string_agg(result || ' | ' || check_name, E'\n' order by n) from _r); end $x$;
