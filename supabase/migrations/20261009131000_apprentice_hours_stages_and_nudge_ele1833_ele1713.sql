-- ELE-1833 + ELE-1713: apprentice hours that nobody can miss, with the three
-- authorities visibly apart.
--
-- 1. get_job_training (the job sheet's "Counts as training" card) now returns,
--    per offer, the entry it became and its stage:
--      offered   → the apprentice hasn't logged it yet
--      logged    → logged by the apprentice, waiting for the firm to attest
--      attested  → attested by the firm (workplace), waiting for the college
--      verified  → verified by the college (attested_by tells who attested)
--      sent_back → the firm or college sent it back
--    plus can_confirm, so the card can offer a one-tap attest. Existing keys
--    (date, minutes, type, logged) are unchanged.
-- 2. notify_employer_waiting_otj (weekly, Mondays, only when something has
--    waited more than 3 days; deduped in employer_expiry_sent):
--      * counts in-app entries too, matching the inbox;
--      * with exactly one waiting, the bell opens that entry;
--      * the apprentice's named supervisor (and the team's Supervisors, PMs and
--        Apprentice Co-ordinators, the people can_confirm_otj_for lets attest)
--        get their own weekly nudge, deduped per person per week. Owners and
--        managers already get the firm bell, so they are skipped.
-- 3. Registers apprentice_hours_to_confirm as a notification type.

create or replace function public.get_job_training(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  j public.employer_jobs;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id not in (select public.my_employer_scope()) then
    return '[]'::jsonb;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'employee_id', e.id, 'name', e.name, 'joined', e.user_id is not null,
             'offers', (select coalesce(jsonb_agg(
                          jsonb_build_object(
                            'date', o.activity_date, 'minutes', o.minutes, 'type', o.activity_type,
                            'logged', x.id is not null and x.verification_status <> 'rejected',
                            'entry_id', x.id,
                            'stage', case
                                       when x.id is null then 'offered'
                                       when x.verification_status = 'rejected' then 'sent_back'
                                       when x.verification_status = 'verified' then 'verified'
                                       when x.verification_status = 'verified_by_employer' then 'attested'
                                       else 'logged'
                                     end,
                            'logged_minutes', x.duration_minutes,
                            'attested_by', x.attested_by_name,
                            'attested_at', case when x.attested_by_name is not null then x.verified_at end,
                            'can_confirm', x.id is not null and x.verification_status = 'pending'
                                           and public.can_confirm_otj_for(x.student_id))
                          order by o.created_at desc), '[]'::jsonb)
                          from public.employer_training_offers o
                          left join lateral (
                            select c.id, c.verification_status, c.duration_minutes, c.attested_by_name,
                                   c.verified_at, c.student_id
                              from public.college_otj_entries c
                             where c.student_id = o.apprentice_user_id
                               and c.activity_date = o.activity_date
                               and c.activity_type = o.activity_type
                               and c.created_at >= o.created_at
                             order by (c.verification_status <> 'rejected') desc, c.created_at desc
                             limit 1
                          ) x on true
                         where o.job_id = p_job and o.employee_id = e.id))
           order by e.name)
      from public.employer_employees e
     where e.employer_id = j.user_id
       and lower(coalesce(e.team_role, '')) = 'apprentice'
       and lower(coalesce(e.status, '')) <> 'archived'
       and exists (select 1 from public.employer_job_assignments a where a.job_id = p_job and a.employee_id = e.id)
  ), '[]'::jsonb);
end;
$$;

revoke all on function public.get_job_training(uuid) from public, anon;
grant execute on function public.get_job_training(uuid) to authenticated;

create or replace function public.notify_employer_waiting_otj()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  s record;
  v_ref text;
  v_week text := to_char((now() at time zone 'Europe/London')::date, 'IYYY-IW');
begin
  if extract(isodow from (now() at time zone 'Europe/London')) <> 1 then
    return;
  end if;

  -- The firm: owner and managers, one bell per firm per week.
  for r in
    select e.employer_id as firm,
           count(distinct o.id) as n,
           min(o.activity_date) as oldest,
           (array_agg(o.id order by o.created_at))[1] as first_id
      from public.college_otj_entries o
      join public.employer_employees e
        on e.user_id = o.student_id and e.employer_id is not null
       and lower(coalesce(e.status, '')) = 'active'
     where o.verification_status = 'pending'
       and o.source_kind in ('apprentice_submitted', 'in_app')
       and o.created_at < now() - interval '3 days'
     group by e.employer_id
  loop
    begin
      v_ref := 'otj_waiting:' || v_week;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref)
      on conflict do nothing;
      continue when not found;
      perform public.notify_employer_bell(
        r.firm,
        'apprentice_hours_submitted',
        'Apprentice hours still waiting: ' || r.n,
        'The oldest is from ' || to_char(r.oldest, 'FMDD Mon')
          || '. Confirm them or send them back so the college can count them.',
        jsonb_build_object(
          'route', '/employer?section=apprentices'
                   || case when r.n = 1 then '&entry=' || r.first_id else '' end,
          'ref_id', v_ref));
    exception when others then
      raise warning '[notify_employer_waiting_otj] firm %: %', r.firm, sqlerrm;
    end;
  end loop;

  -- Supervisors who can attest (not owners or managers: they had the firm bell).
  for s in
    select x.firm, x.recipient,
           count(distinct x.entry_id) as n,
           min(x.activity_date) as oldest,
           (array_agg(x.entry_id order by x.created_at))[1] as first_id
      from (
        select ap.employer_id as firm, sup.user_id as recipient,
               o.id as entry_id, o.activity_date, o.created_at
          from public.college_otj_entries o
          join public.employer_employees ap
            on ap.user_id = o.student_id and ap.employer_id is not null
           and lower(coalesce(ap.status, '')) = 'active'
          join public.employer_employees sup
            on sup.employer_id = ap.employer_id
           and sup.user_id is not null
           and sup.user_id <> o.student_id
           and lower(coalesce(sup.status, '')) = 'active'
           and (sup.id = ap.supervisor_employee_id
                or sup.team_role in ('Supervisor', 'Project Manager', 'Apprentice Co-ordinator'))
         where o.verification_status = 'pending'
           and o.source_kind in ('apprentice_submitted', 'in_app')
           and o.created_at < now() - interval '3 days'
           and sup.user_id <> ap.employer_id
           and not exists (select 1 from public.employer_admins a
                            where a.employer_id = ap.employer_id
                              and a.user_id = sup.user_id
                              and a.status = 'active')
      ) x
     group by x.firm, x.recipient
  loop
    begin
      v_ref := 'otj_waiting_sup:' || s.recipient || ':' || v_week;
      insert into public.employer_expiry_sent (firm, ref) values (s.firm, v_ref)
      on conflict do nothing;
      continue when not found;
      perform public.worker_notify(
        s.recipient,
        'apprentice_hours_to_confirm',
        case when s.n = 1 then 'Apprentice hours waiting for you'
             else 'Apprentice hours waiting for you: ' || s.n end,
        'The oldest is from ' || to_char(s.oldest, 'FMDD Mon')
          || '. Confirm them or send them back so the college can count them.',
        jsonb_build_object(
          'route', '/electrician/worker-tools/apprentice-hours'
                   || case when s.n = 1 then '?entry=' || s.first_id else '' end,
          'entry_id', case when s.n = 1 then s.first_id end,
          'ref_id', v_ref));
    exception when others then
      raise warning '[notify_employer_waiting_otj] supervisor %: %', s.recipient, sqlerrm;
    end;
  end loop;
end;
$$;

revoke all on function public.notify_employer_waiting_otj() from public, anon, authenticated;

insert into public.notification_types (type, category, push, importance)
values ('apprentice_hours_to_confirm', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- Hardening: attesting needs a signed-in user (the function already refuses
-- anon), so anon never needed EXECUTE.
revoke execute on function public.attest_otj_as_employer(uuid, text, text) from anon, public;
