-- ELE-1909: intervention history for the audit (compliance) pack.
--
-- "Log contact" on the risk flags writes pastoral_notes: kind 'one_to_one'
-- for a 1-2-1, kind 'intervention' for a call, email or referral, with
-- contact_method saying which (null on rows from older builds). This returns
-- that history for one college without the note bodies: an inspector sees
-- that contact happened, when, how and by whom, not what was said.
begin;

create or replace function public.get_intervention_history(p_college uuid default null, p_months int default 12)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_college uuid := p_college;
  v_months int := greatest(1, least(coalesce(p_months, 12), 36));
  v jsonb;
begin
  if v_college is null then
    select st.college_id into v_college from public.college_staff st
     where st.user_id = auth.uid() and st.archived_at is null order by st.created_at limit 1;
  end if;
  if v_college is null or not public.college_can('quality.view', v_college) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with n as (
    select pn.id, pn.created_at, pn.kind, pn.title, pn.action_required, pn.action_by_date,
           pn.action_completed_at, pn.student_id,
           case when pn.contact_method is not null then pn.contact_method
                when pn.kind = 'one_to_one' then 'one_to_one'
                else 'not_recorded' end as method,
           cs.name as learner, coalesce(st.name, p.full_name, 'Staff') as by_name
      from public.pastoral_notes pn
      join public.college_students cs on cs.id = pn.student_id and cs.college_id = v_college
      -- author_id is a college_staff id (older rows may hold an auth user id)
      left join public.college_staff st on st.id = pn.author_id
      left join public.profiles p on p.id = pn.author_id
     where pn.kind in ('one_to_one', 'intervention')
       and pn.created_at >= now() - make_interval(months => v_months)
  )
  select jsonb_build_object(
    'months', v_months,
    'total', (select count(*) from n),
    'learners', (select count(distinct student_id) from n),
    'by_method', jsonb_build_object(
       'call', (select count(*) from n where method = 'call'),
       'one_to_one', (select count(*) from n where method = 'one_to_one'),
       'email', (select count(*) from n where method = 'email'),
       'referral', (select count(*) from n where method = 'referral'),
       'not_recorded', (select count(*) from n where method = 'not_recorded')),
    'open_next_steps', (select count(*) from n where action_required is not null and action_completed_at is null),
    'rows', coalesce((select jsonb_agg(jsonb_build_object(
        'id', id, 'at', created_at, 'learner', learner, 'method', method, 'title', title,
        'by', by_name, 'next_step', action_required, 'next_step_by', action_by_date,
        'next_step_done', action_completed_at is not null) order by created_at desc)
      from (select * from n order by created_at desc limit 300) x), '[]'::jsonb))
  into v;
  return v;
end; $$;
revoke all on function public.get_intervention_history(uuid, int) from public, anon;
grant execute on function public.get_intervention_history(uuid, int) to authenticated;

commit;
