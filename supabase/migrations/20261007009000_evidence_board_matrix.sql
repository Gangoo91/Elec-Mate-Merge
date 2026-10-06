-- ELE-1908 board redesign: every item's status for every learner (for the
-- coverage matrix and per-item progress), not only the gaps.
create or replace function public.get_evidence_pack_board(p_college uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid := p_college;
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object('rows', coalesce((
    select jsonb_agg(jsonb_build_object(
             'student_id', s.id, 'name', s.name,
             'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
             'cohort_id', s.cohort_id,
             'items', (select jsonb_agg(jsonb_build_object('key', x->>'key', 'title', x->>'title', 'status', x->>'status',
                                                           'detail', x->>'detail', 'due_date', x->>'due_date'))
                         from jsonb_array_elements(pk.p->'items') x
                        where x->>'status' in ('missing', 'attention', 'due')),
             'statuses', (select jsonb_object_agg(x->>'key', x->>'status') from jsonb_array_elements(pk.p->'items') x),
             'catalog', (select jsonb_agg(jsonb_build_object('key', x->>'key', 'title', x->>'title', 'group', x->>'group',
                                                             'custom', coalesce((x->>'custom')::boolean, false)))
                           from jsonb_array_elements(pk.p->'items') x),
             'counts', pk.p->'counts')
           order by s.name)
      from college_students s
      cross join lateral (select public._learner_evidence_pack(s.id) p) pk
     where s.college_id = v_college
       and lower(coalesce(s.status, '')) not in ('archived')), '[]'::jsonb));
end; $$;
revoke all on function public.get_evidence_pack_board(uuid) from public, anon;
grant execute on function public.get_evidence_pack_board(uuid) to authenticated, service_role;
