-- Apprentice voice survey: one response per learner, still anonymous.
-- The client wrote a submission log row then an anonymous response row, but
-- the response insert policy was open to everyone (anon included), so the
-- one-per-learner rule could be bypassed by inserting responses directly.
-- Submission now goes through one definer function: signed-in learners on
-- the survey college's roll only, survey open, one per learner; the response
-- row is written without any link to the learner.

create or replace function public.submit_apprentice_survey(p_survey uuid, p_answers jsonb)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  v_college uuid;
begin
  if v_uid is null then
    raise exception 'sign in first' using errcode = '42501';
  end if;
  select s.college_id into v_college from college_apprentice_surveys s
   where s.id = p_survey and s.is_active and now() >= coalesce(s.open_at, now()) and now() < s.close_at;
  if v_college is null then
    raise exception 'this survey is not open' using errcode = '22023';
  end if;
  if not exists (select 1 from college_students cs where cs.user_id = v_uid and cs.college_id = v_college) then
    raise exception 'only apprentices at this college can answer' using errcode = '42501';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'answers missing' using errcode = '22023';
  end if;

  insert into college_apprentice_survey_submissions (user_id, survey_id) values (v_uid, p_survey);
  -- unique (user_id, survey_id) raises 23505 for a second attempt.

  insert into college_apprentice_survey_responses (survey_id, college_id, response_token, answers)
  values (p_survey, v_college, encode(extensions.gen_random_bytes(16), 'hex'), p_answers);
  return true;
end;
$$;

revoke all on function public.submit_apprentice_survey(uuid, jsonb) from public, anon;
grant execute on function public.submit_apprentice_survey(uuid, jsonb) to authenticated;

-- Close the direct paths.
drop policy if exists apprentice_responses_insert on public.college_apprentice_survey_responses;
revoke insert on public.college_apprentice_survey_responses from anon, authenticated;
