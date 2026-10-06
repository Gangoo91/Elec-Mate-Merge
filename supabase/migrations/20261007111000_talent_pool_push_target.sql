-- ELE-1958 (part 4): a firm that invites or messages someone from the talent pool
-- could never notify them. Both client paths read the electrician's user_id
-- through employer_employees, whose RLS (rightly) hides another firm's roster
-- rows, so user_id came back null and the push was silently skipped.
-- This returns ONLY the account id to address an in-app push to, and only for an
-- Elec-ID the caller's firm is allowed to see (employer_can_view_elec_id). It is
-- not contact data: no phone, no email, no name.

create or replace function public.talent_pool_push_target(p_profile_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select e.user_id
  from public.employer_elec_id_profiles p
  join public.employer_employees e on e.id = p.employee_id
  where p.id = p_profile_id
    and public.employer_can_view_elec_id(p_profile_id)
  limit 1;
$$;

comment on function public.talent_pool_push_target(uuid) is
  'ELE-1958: account id to send an in-app push to when a firm invites/messages an electrician it can see (talent pool, applicant, existing conversation). Null otherwise. Never returns contact details.';

revoke all on function public.talent_pool_push_target(uuid) from public, anon;
grant execute on function public.talent_pool_push_target(uuid) to authenticated;
