-- Found by the new role-access suite (ELE-1914), 7 Oct.
--
-- 1. college_apprentice_survey_responses: the SELECT policy counted rows of
--    its own table inside the policy, so every read raised 42P17 (infinite
--    recursion) for every role and broke college_voice_rollup. The "at least
--    5 responses before anyone sees them" rule moves into a definer helper.
--
-- 2. Five per-user analytics views run with the owner's rights (definer) and
--    were readable by anon and every signed-in user: user_study_detail,
--    user_activity_summary, user_engagement_by_area, learner_assessments
--    (every user's quiz scores), ai_usage_stats. The admin pages and two
--    service-role functions read them. Keep them definer (admin pages rely on
--    seeing everyone) but filter rows: a platform admin or the service role
--    sees all, a signed-in user sees only their own, anon sees nothing.

create or replace function public._survey_response_count(p_survey uuid)
returns bigint
language sql
stable
security definer
set search_path to 'public'
as $$
  select count(*) from college_apprentice_survey_responses where survey_id = p_survey;
$$;
revoke all on function public._survey_response_count(uuid) from public, anon;
grant execute on function public._survey_response_count(uuid) to authenticated;

drop policy if exists apprentice_responses_select_agg on public.college_apprentice_survey_responses;
create policy apprentice_responses_select_agg on public.college_apprentice_survey_responses
  for select
  using (public._ch_same_college(college_id) and public._survey_response_count(survey_id) >= 5);

do $$
declare
  v text;
  def text;
begin
  foreach v in array array['user_study_detail','user_activity_summary','user_engagement_by_area','learner_assessments','ai_usage_stats'] loop
    select pg_get_viewdef(format('public.%I', v)::regclass, true) into def;
    def := rtrim(def, E' ;\n');
    execute format(
      'create or replace view public.%I as select * from (%s) _v where auth.role() = ''service_role'' or public._is_platform_admin() or _v.user_id = auth.uid()',
      v, def);
    execute format('revoke all on public.%I from anon', v);
  end loop;
end $$;
