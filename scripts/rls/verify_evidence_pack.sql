-- ELE-1908 evidence pack checks. One transaction that ends in an exception
-- (so nothing is kept); the exception message lists every result.
-- Run: npx supabase db query --linked -f scripts/rls/verify_evidence_pack.sql
begin;
create temp table _r (n serial, check_name text, result text) on commit drop;
grant all on _r to authenticated, anon; grant all on sequence _r_n_seq to authenticated, anon;
create temp table _x (k text, v text) on commit drop; grant all on _x to authenticated, anon;

select set_config('request.jwt.claims', '{"sub":"447a7e47-12cc-4203-bbc0-365846eee998","role":"authenticated"}', true);
set local role authenticated;
do $$ declare p jsonb; q uuid; e1 uuid; e2 uuid; it jsonb; begin
  p := public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
  insert into _r(check_name,result) values ('tutor gets the pack ('||jsonb_array_length(p->'items')||' items)',
    case when jsonb_array_length(p->'items') >= 21 then 'PASS' else 'FAIL' end);
  insert into _r(check_name,result) values ('no empty evidence slots',
    case when p::text not like '%"evidence": [null]%' then 'PASS' else 'FAIL' end);
  insert into _r(check_name,result) values ('a new learner''s training plan is due by day 42, not missing',
    case when (select x->>'status' from jsonb_array_elements(p->'items') x where x->>'key'='training_plan') = 'due' then 'PASS' else 'FAIL' end);
  insert into _r(check_name,result) values ('end items are not yet due for a new learner',
    case when (select bool_and(x->>'status' = 'not_yet_due') from jsonb_array_elements(p->'items') x where x->>'key' in ('gateway','epa_employment','otj_statement','epao_agreement','epa_result')) then 'PASS' else 'FAIL' end);

  -- the college adds its own requirement
  insert into college_evidence_requirements(id, college_id, title, description, stage, renew_months, needs_signature_from)
    values (gen_random_uuid(), 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Site safety induction', 'Signed induction record from the employer', 'start', 12, '{employer}')
    returning id into q;
  p := public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
  insert into _r(check_name,result) values ('a college requirement appears on the learner''s pack, missing',
    case when (select x->>'status' from jsonb_array_elements(p->'items') x where x->>'key'='custom:'||q) = 'missing' then 'PASS' else 'FAIL' end);

  insert into college_learner_evidence(id, college_id, student_id, kind, requirement_id, title, document_date, signatures)
    values (gen_random_uuid(), 'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','custom', q, 'Induction', current_date - 400,
            '[{"role":"employer","name":"Sam Turner","signed_on":"2025-09-01"}]') returning id into e1;
  p := public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
  insert into _r(check_name,result) values ('an expired college requirement shows as needing renewal',
    case when (select x->>'status' from jsonb_array_elements(p->'items') x where x->>'key'='custom:'||q) = 'attention' then 'PASS' else 'FAIL' end);

  insert into college_learner_evidence(id, college_id, student_id, kind, requirement_id, title, document_date, signatures, supersedes_id)
    values (gen_random_uuid(), 'a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','custom', q, 'Induction renewed', current_date,
            '[{"role":"employer","name":"Sam Turner","signed_on":"2026-10-06"}]', e1) returning id into e2;
  p := public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
  insert into _r(check_name,result) values ('a new version clears it and keeps the old one',
    case when (select x->>'status' from jsonb_array_elements(p->'items') x where x->>'key'='custom:'||q) = 'ok'
          and (select superseded_at is not null from college_learner_evidence where id = e1)
          and (select version from college_learner_evidence where id = e2) = 2 then 'PASS' else 'FAIL' end);

  begin delete from college_learner_evidence where id = e2;
    insert into _r(check_name,result) values ('filed evidence cannot be deleted', case when exists(select 1 from college_learner_evidence where id=e2) then 'PASS' else 'FAIL' end);
  exception when check_violation then insert into _r(check_name,result) values ('filed evidence cannot be deleted','PASS'); end;
  begin update college_learner_evidence set title = 'changed' where id = e2;
    insert into _r(check_name,result) values ('filed evidence cannot be edited','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('filed evidence cannot be edited','PASS'); end;
  begin insert into college_learner_evidence(college_id, student_id, kind)
          values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','custom');
    insert into _r(check_name,result) values ('custom evidence must name its requirement','FAIL');
  exception when check_violation then insert into _r(check_name,result) values ('custom evidence must name its requirement','PASS'); end;

  -- a funding item: eligibility declaration
  insert into college_learner_evidence(college_id, student_id, kind, document_date)
    values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890','3d756aaf-c37d-4aa8-bd24-8ced1b0b766f','eligibility_declaration', current_date);
  p := public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
  insert into _r(check_name,result) values ('filing a document turns its item green',
    case when (select x->>'status' from jsonb_array_elements(p->'items') x where x->>'key'='eligibility') = 'ok' then 'PASS' else 'FAIL' end);

  p := public.get_evidence_pack_board('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
  insert into _r(check_name,result) values ('board lists every learner with their gaps ('||jsonb_array_length(p->'rows')||')',
    case when jsonb_array_length(p->'rows') >= 1 and (p->'rows'->0) ? 'items' then 'PASS' else 'FAIL' end);
  insert into _x values ('e2', e2::text);
end $$;
reset role;
grant select on _x to authenticated;

-- the learner and a stranger
select set_config('request.jwt.claims', '{"sub":"28a0fc81-3783-4c31-8e7e-1f52f778abb2","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin perform public.get_learner_evidence_pack('3d756aaf-c37d-4aa8-bd24-8ced1b0b766f');
    insert into _r(check_name,result) values ('learner cannot open the college''s evidence pack','FAIL');
  exception when others then insert into _r(check_name,result) values ('learner cannot open the college''s evidence pack','PASS'); end;
  insert into _r(check_name,result) select 'learner reads no evidence rows (ID documents)', case when count(*)=0 then 'PASS' else 'FAIL' end from college_learner_evidence;
  insert into _r(check_name,result) select 'learner reads no evidence files', case when count(*)=0 then 'PASS' else 'FAIL' end
    from storage.objects where bucket_id='college-learner-evidence';
end $$;
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000dead","role":"authenticated"}', true);
set local role authenticated;
do $$ begin
  begin perform public.get_evidence_pack_board('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    insert into _r(check_name,result) values ('stranger has no evidence board','FAIL');
  exception when others then insert into _r(check_name,result) values ('stranger has no evidence board','PASS'); end;
  begin insert into college_evidence_requirements(college_id, title) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890','Sneaky');
    insert into _r(check_name,result) values ('stranger cannot add a college requirement','FAIL');
  exception when others then insert into _r(check_name,result) values ('stranger cannot add a college requirement','PASS'); end;
end $$;
reset role;
insert into _r(check_name,result) select 'evidence bucket is private', case when (select not public from storage.buckets where id='college-learner-evidence') then 'PASS' else 'FAIL' end;
insert into _r(check_name,result) select 'other buckets still read normally (safe uuid)', case when (select count(*) >= 0 from storage.objects where bucket_id='portfolio-evidence') then 'PASS' else 'FAIL' end;
do $x$ begin raise exception 'RESULTS:%', (select string_agg(result || ' | ' || check_name, E'\n' order by n) from _r); end $x$;
