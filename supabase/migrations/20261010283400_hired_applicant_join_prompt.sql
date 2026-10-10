-- Gap §3C #24: a hire whose account is known still waited for an email match.
--
-- hire_applicant adds the hire UNLINKED on purpose (6 Oct,
-- 20261006195500_roster_link_needs_worker.sql): only the worker links their
-- own account, by tapping Join on the "X added you to their team" prompt.
-- That prompt matched on email only. An applicant who applied with their
-- Elec-ID under a different address than their account never saw it, so the
-- account never linked and the pending seat never became active.
--
-- Now the prompt (get_my_team_invites) and the answer (respond_team_invite)
-- also match a roster row opened by hiring the caller's own Elec-ID
-- application (employer_starters.application_id → the application's Elec-ID
-- profile → that profile's own roster stub → user_id = the caller). The
-- worker still taps Join; nothing links without them. The seat then goes from
-- pending to active through the existing trg_employer_employee_seat, exactly
-- as for an invite.
--
-- Same signatures and return shapes (HEAD and build 49 call both). Additive.

create or replace function public._roster_row_is_my_hire(p_employee uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select auth.uid() is not null and exists (
    select 1
      from public.employer_starters s
      join public.employer_vacancy_applications a on a.id = s.application_id
      join public.employer_vacancies v on v.id = a.vacancy_id and v.employer_id = s.employer_id
      join public.employer_elec_id_profiles p on p.id = a.applicant_profile_id
      join public.employer_employees mine on mine.id = p.employee_id
     where s.roster_id = p_employee
       and lower(coalesce(a.status, '')) = 'hired'
       and mine.user_id = auth.uid())
$$;
revoke all on function public._roster_row_is_my_hire(uuid) from public, anon, authenticated;

create or replace function public.get_my_team_invites()
returns table(employee_id uuid, employer_id uuid, company_name text, role text, team_role text, added_at timestamptz)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select e.id, e.employer_id,
         coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'A firm'),
         e.role, e.team_role, e.created_at
    from public.employer_employees e
    join auth.users u on u.id = auth.uid() and u.email_confirmed_at is not null
    left join public.company_profiles cp on cp.user_id = e.employer_id
    left join public.profiles p on p.id = e.employer_id
   where e.employer_id is not null
     and e.employer_id <> auth.uid()
     and e.user_id is null
     and e.link_declined_at is null
     and lower(coalesce(e.status, '')) <> 'archived'
     and (lower(btrim(coalesce(e.email, ''))) = lower(u.email)
          or public._roster_row_is_my_hire(e.id))
     and not exists (select 1 from public.employer_employees mine
                      where mine.user_id = auth.uid() and mine.employer_id = e.employer_id)
   order by e.created_at
$function$;

create or replace function public.respond_team_invite(p_employee_id uuid, p_accept boolean)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_row public.employer_employees%rowtype;
  v_email text;
begin
  select lower(email) into v_email from auth.users
   where id = auth.uid() and email_confirmed_at is not null;
  if v_email is null then
    raise exception 'Confirm your email address first';
  end if;

  select * into v_row from public.employer_employees
   where id = p_employee_id
     and user_id is null
     and link_declined_at is null
     and lower(coalesce(status, '')) <> 'archived'
     and (lower(btrim(coalesce(email, ''))) = v_email
          or public._roster_row_is_my_hire(id))
   for update;
  if not found then
    raise exception 'This invite is no longer open';
  end if;

  if p_accept then
    update public.employer_employees
       set user_id = auth.uid(), claimed_at = now(), updated_at = now()
     where id = p_employee_id;
    return jsonb_build_object('ok', true, 'status', 'joined', 'employer_id', v_row.employer_id);
  end if;

  update public.employer_employees set link_declined_at = now(), updated_at = now() where id = p_employee_id;
  perform public.notify_employer_bell(
    v_row.employer_id, 'team_invite_declined',
    coalesce(v_row.name, 'Someone') || ' said the invite isn''t for them',
    'Check the email address on their team record.',
    jsonb_build_object('route', '/employer?section=team&tab=invited&member=' || p_employee_id,
                       'employee_id', p_employee_id));
  return jsonb_build_object('ok', true, 'status', 'declined');
end;
$function$;
