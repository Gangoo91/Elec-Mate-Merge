-- Count only time the clock actually MEASURED as app learning.
-- Applied live as migration otj_count_measured_time_only.
--
-- time_entries.is_automatic held two kinds of row:
--   * 'Auto-tracked training time' — the route tracker: real elapsed seconds on
--     learning pages, idle and hidden time excluded (trainingTracker.ts).
--   * 'Auto-logged from <activity>' — copied by trigger from
--     learning_activity_log, whose durations are ESTIMATES for XP (one minute
--     per flashcard, one per quiz question, ten per diary entry).
-- The two overlapped: in the 30 days to 6 Oct, 538 of the 792 estimated hours
-- fell on days the tracker was measuring the same learner on the same Study
-- Centre pages. Counting both double-counted, and counting estimates at all
-- records time nobody measured. From here only measured time counts.
create or replace function public._otj_is_measured(p_is_automatic boolean, p_notes text)
returns boolean language sql immutable as $$
  select coalesce(p_is_automatic, false)
     and (p_notes = 'Auto-tracked training time' or p_notes like 'Auto-tracked session:%');
$$;

-- Every app-learning read in the OTJ functions now goes through it. The live
-- definitions were rewritten in place: each `t.is_automatic` / `t2.is_automatic`
-- (but not the diary query's `coalesce(t.is_automatic, false)`) became
-- `public._otj_is_measured(t.is_automatic, t.notes)`.
do $$
declare
  r record;
  d text;
begin
  for r in
    select p.oid from pg_proc p join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public'
       and p.proname in ('get_otj_summary','get_college_otj','get_learner_app_days',
                         'get_app_learning_breakdown','approve_app_learning','get_otj_trajectory')
  loop
    d := pg_get_functiondef(r.oid);
    if position('_otj_is_measured' in d) = 0 then
      d := regexp_replace(d, '(?<!coalesce\()\m(t2?)\.is_automatic\M', 'public._otj_is_measured(\1.is_automatic, \1.notes)', 'g');
      d := replace(d, 'where user_id = u and is_automatic and', 'where user_id = u and public._otj_is_measured(is_automatic, notes) and');
      execute d;
    end if;
  end loop;
end $$;
