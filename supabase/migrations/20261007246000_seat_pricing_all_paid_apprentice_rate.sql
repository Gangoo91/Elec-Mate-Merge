-- Seat pricing (Andrew 7 Oct): everyone a firm puts in Worker Tools is a paid
-- seat on the employer's bill. £9.99 a month each, apprentices £4.99. No free
-- seats any more (replaces the ELE-1831 free supervisor / college-apprentice
-- rule). The firm's own plan is £49.99 a month.
--
-- Billing still only happens for a paying employer: manage-employer-seats
-- bills 0 seats to a comped (free_access_granted) firm, and check-subscription
-- only lets a seat in while the firm itself has access.

-- Every active seat is paid.
create or replace function public.employer_seat_is_paid(p_employee_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select true
$$;

-- Which seat price a person is on.
create or replace function public.employer_seat_kind(p_employee_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case when public.employer_access_role(e.team_role) = 'apprentice'
              then 'apprentice' else 'standard' end
    from (select 1) one
    left join public.employer_employees e on e.id = p_employee_id
$$;
revoke all on function public.employer_seat_kind(uuid) from public, anon;
grant execute on function public.employer_seat_kind(uuid) to authenticated;

-- What Stripe should bill, split by price.
create or replace function public.employer_seat_counts(p_employer uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'standard', count(*) filter (where public.employer_seat_kind(s.employee_id) = 'standard'),
    'apprentice', count(*) filter (where public.employer_seat_kind(s.employee_id) = 'apprentice'))
    from public.employer_seats s
   where s.employer_id = p_employer and s.status = 'active'
$$;
revoke all on function public.employer_seat_counts(uuid) from public, anon, authenticated;
