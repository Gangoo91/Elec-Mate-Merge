-- Gap §3C #27: date of birth was typed twice, once by the worker with their
-- right-to-work share code (employer_rtw_submissions) and again by the office
-- in the pay profile (employer_employee_pay_profiles, for minimum wage and the
-- under-18 rules).
--
-- Now it is captured once and reused:
--   * rtw_submit_my_documents (same signature): a date of birth sent with the
--     share code fills the pay profile when the pay profile has none. It never
--     overwrites a date the office already holds.
--   * my_date_of_birth_on_file(roster): the worker's own date of birth as the
--     firm already holds it (pay profile, else an earlier submission), so the
--     right-to-work form arrives filled in. Only for the caller's own roster row.
-- No backfill of existing rows. Additive.

create or replace function public.rtw_submit_my_documents(
  p_roster_id uuid, p_share_code text, p_date_of_birth date, p_document_paths text[], p_note text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_r record;
  v_code text := nullif(upper(regexp_replace(coalesce(p_share_code, ''), '[^A-Za-z0-9]', '', 'g')), '');
  v_paths text[] := coalesce(p_document_paths, array[]::text[]);
  v_id uuid;
  p text;
begin
  select e.id, e.employer_id, e.name, e.team_role into v_r
    from public.employer_employees e
   where e.id = p_roster_id and e.user_id = auth.uid()
     and lower(coalesce(e.status, '')) = 'active' and e.employer_id is not null;
  if v_r.id is null then
    raise exception 'not_on_team';
  end if;
  if v_code is not null and v_code !~ '^W[A-Z0-9]{8}$' then
    raise exception 'share_code_format';
  end if;
  if v_code is null and cardinality(v_paths) = 0 then
    raise exception 'nothing_to_send';
  end if;
  foreach p in array v_paths loop
    if p not like v_r.employer_id || '/' || v_r.id || '/worker/%' then
      raise exception 'bad_path';
    end if;
  end loop;
  if p_date_of_birth is not null and (p_date_of_birth > current_date - 3650 or p_date_of_birth < date '1900-01-01') then
    raise exception 'date_of_birth';
  end if;

  insert into public.employer_rtw_submissions
    (employer_id, roster_id, user_id, share_code, date_of_birth, document_paths, note)
  values (v_r.employer_id, v_r.id, auth.uid(), v_code, p_date_of_birth, v_paths,
          nullif(left(trim(coalesce(p_note, '')), 1000), ''))
  returning id into v_id;

  -- Typed once: fill the pay profile if it has no date of birth yet.
  if p_date_of_birth is not null and p_date_of_birth >= date '1930-01-01'
     and coalesce(v_r.team_role, '') <> 'Subcontractor' then
    begin
      insert into public.employer_employee_pay_profiles (employee_id, employer_id, date_of_birth)
      values (v_r.id, v_r.employer_id, p_date_of_birth)
      on conflict (employee_id) do update
        set date_of_birth = excluded.date_of_birth
      where public.employer_employee_pay_profiles.date_of_birth is null;
    exception when others then
      raise warning '[rtw_submit_my_documents] pay profile not filled: %', sqlerrm;
    end;
  end if;

  insert into public.employer_expiry_sent (firm, ref)
  values (v_r.employer_id, 'log:rtw_submitted:' || v_r.id || ':' || current_date)
  on conflict do nothing;
  if found then
    perform public.notify_employer_admins_bell(
      v_r.employer_id, 'rtw_submitted',
      'Right to work: ' || coalesce(nullif(trim(v_r.name), ''), 'A team member') || ' sent their details',
      case when v_code is not null then 'A share code to check online. Record the check when you have done it.'
           else 'Documents to check. Record the check when you have seen the originals.' end,
      jsonb_build_object('employee_id', v_r.id, 'submission_id', v_id,
        'route', '/employer?section=team&member=' || v_r.id));
  end if;
  return jsonb_build_object('success', true, 'id', v_id);
end;
$function$;
revoke all on function public.rtw_submit_my_documents(uuid, text, date, text[], text) from public, anon;
grant execute on function public.rtw_submit_my_documents(uuid, text, date, text[], text) to authenticated;

create or replace function public.my_date_of_birth_on_file(p_roster_id uuid)
returns date
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(
    (select pp.date_of_birth from public.employer_employee_pay_profiles pp where pp.employee_id = e.id),
    (select s.date_of_birth from public.employer_rtw_submissions s
      where s.roster_id = e.id and s.user_id = auth.uid() and s.date_of_birth is not null
      order by s.submitted_at desc limit 1))
    from public.employer_employees e
   where e.id = p_roster_id and e.user_id = auth.uid() and auth.uid() is not null
$$;
revoke all on function public.my_date_of_birth_on_file(uuid) from public, anon;
grant execute on function public.my_date_of_birth_on_file(uuid) to authenticated;
