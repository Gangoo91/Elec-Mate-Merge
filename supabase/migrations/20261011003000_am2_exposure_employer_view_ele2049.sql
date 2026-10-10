-- ELE-2049 — AM2 exposure on the employer's no-login page.
--
-- The exposure alert email sends the employer to /employer-view/:token, and
-- that page is built by the employer-portal-view edge function with the
-- service role. get_am2_exposure checks auth.uid() (_am2x_can_view), which is
-- null for the service role, so it cannot be used there.
--
-- This is the same per-area summary as get_am2_exposure (same areas, labels,
-- counts, last date and "past the college's N weeks" rule), for one learner,
-- with no viewer check. It is callable by the service role ONLY: the edge
-- function has already checked the employer's token and that the learner is
-- placed with that employer before calling it. It returns no evidence titles,
-- diary days or alert history, only the counts.
--
--   applies       the learner's course leads to an AM2-family assessment
--                 (the same test am2_exposure_due_alerts uses)
--   weeks         the college's N (default 6)
--   window_from   the first day of the last N weeks
--   counted_from  the day counting started for this learner (start date, never
--                 before the tracker existed on 10 Oct 2026)
--   areas[]       area, label, count, count_window (last N weeks), count_12w,
--                 last_done, days_since, overdue
--
-- Additive only.

create or replace function public._am2x_summary_service(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_cs public.college_students%rowtype;
  v_weeks int;
  v_cutoff date;
  v_applies boolean;
  v_areas jsonb;
begin
  if p_learner is null then
    return null;
  end if;

  select * into v_cs from public.college_students
   where user_id = p_learner
   order by (status = 'Active') desc, updated_at desc nulls last
   limit 1;
  v_weeks := public._am2x_weeks(v_cs.college_id);
  v_cutoff := current_date - (v_weeks * 7);

  select exists (select 1 from public._resolve_qualification(p_learner, null) q,
                        public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code)) g
                  where g.route <> 'none')
    into v_applies;

  with a(area, label, ord) as (
    values ('safe_isolation', 'Safe isolation', 1),
           ('inspection_testing', 'Inspection and testing', 2),
           ('fault_finding', 'Fault finding', 3)
  ),
  t as (
    select area, count(*) as n,
           count(*) filter (where activity_date > v_cutoff) as nw,
           count(*) filter (where activity_date >= current_date - 84) as n12,
           max(activity_date) as last_done
      from public.am2_exposure_tags
     where learner_id = p_learner and state = 'tagged' and activity_date <= current_date
     group by area
  )
  select jsonb_agg(jsonb_build_object(
           'area', a.area, 'label', a.label,
           'count', coalesce(t.n, 0), 'count_window', coalesce(t.nw, 0), 'count_12w', coalesce(t.n12, 0),
           'last_done', t.last_done,
           'days_since', case when t.last_done is null then null else current_date - t.last_done end,
           'overdue', public._am2x_clock_from(v_cs.start_date) <= v_cutoff
                      and (t.last_done is null or t.last_done < v_cutoff))
         order by a.ord)
    into v_areas
    from a left join t on t.area = a.area;

  return jsonb_build_object(
    'applies', coalesce(v_applies, false),
    'weeks', v_weeks,
    'window_from', v_cutoff + 1,
    'counted_from', public._am2x_clock_from(v_cs.start_date),
    'areas', v_areas);
end;
$$;

revoke all on function public._am2x_summary_service(uuid) from public, anon, authenticated;
grant execute on function public._am2x_summary_service(uuid) to service_role;

comment on function public._am2x_summary_service(uuid) is
  '[COLLEGE ↔ EMPLOYER] ELE-2049. One learner''s AM2 exposure per area (safe isolation, inspection and testing, fault finding): counts, count in the college''s last N weeks, last date, past N weeks. Same rules as get_am2_exposure, no viewer check. SERVICE ROLE ONLY: used by employer-portal-view after it has checked the employer''s token.';
