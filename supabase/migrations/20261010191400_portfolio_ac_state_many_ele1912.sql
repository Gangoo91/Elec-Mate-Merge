-- ELE-1912 performance budget: the cohort EPA page (/college/epa) and the
-- cohort readiness models called get_portfolio_ac_state once PER LEARNER from
-- the browser, six at a time: for the demo college's 27 learners that was 27
-- requests in five sequential waves and 7.6 MB of JSON (every criterion's full
-- wording, for every learner), only to count criteria per unit.
--
-- get_portfolio_ac_state_many returns the same rows for many learners in one
-- call, compactly: per learner the qualification code, the unit titles once,
-- and one [unit_code, ac_code, state] triple per criterion, in the function's
-- own order. Each learner goes through get_portfolio_ac_state itself, so the
-- permission check and the answers are exactly the single-learner ones; a
-- learner the caller may not read (or with no qualification) is left out,
-- as the browser loop did.
create or replace function public.get_portfolio_ac_state_many(p_user_ids uuid[])
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_one jsonb;
  v_out jsonb := '{}'::jsonb;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if coalesce(cardinality(p_user_ids), 0) > 1000 then
    raise exception 'too many learners in one call' using errcode = '22023';
  end if;
  for v_uid in select distinct u from unnest(coalesce(p_user_ids, '{}'::uuid[])) u where u is not null loop
    begin
      with x as materialized (
        select t.unit_code, t.unit_title, t.ac_code, t.state, t.qualification_code, t.n
          from public.get_portfolio_ac_state(v_uid) with ordinality
               as t(unit_code, unit_title, lo_number, lo_text, ac_code, ac_text, state, evidence_item_ids,
                    decision_id, decision_feedback, decided_at, assessor_name, iqa_verdict, qualification_code,
                    assessor_id, iqa_feedback, decision_method, suggested_item_ids, decision_feedback_source,
                    decision_feedback_confirmed_at, assessor_qualifications, n)
      )
      select case when count(*) = 0 then null else jsonb_build_object(
               'q', max(x.qualification_code),
               'u', (select jsonb_object_agg(z.unit_code, z.unit_title)
                       from (select distinct on (x2.unit_code) x2.unit_code, x2.unit_title
                               from x x2 order by x2.unit_code, x2.n) z),
               'r', jsonb_agg(jsonb_build_array(x.unit_code, x.ac_code, x.state) order by x.n))
             end
        into v_one
        from x;
    exception when others then
      v_one := null;
    end;
    if v_one is not null then
      v_out := v_out || jsonb_build_object(v_uid::text, v_one);
    end if;
  end loop;
  return v_out;
end;
$$;
comment on function public.get_portfolio_ac_state_many(uuid[]) is
  '[COLLEGE] Criterion state (get_portfolio_ac_state) for many learners in one call, compact: {user_id: {q, u: {unit_code: unit_title}, r: [[unit_code, ac_code, state]]}}. Same permission check per learner; unreadable learners are left out. ELE-1912.';
revoke all on function public.get_portfolio_ac_state_many(uuid[]) from public, anon;
grant execute on function public.get_portfolio_ac_state_many(uuid[]) to authenticated;
notify pgrst, 'reload schema';
