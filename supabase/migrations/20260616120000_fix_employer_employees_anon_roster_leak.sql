-- ELE-1066 security: the anon SELECT policy on employer_employees used USING(true),
-- exposing EVERY company's roster + PII to anonymous users. Scope anon access to
-- only employees who have opted into a public Elec-ID profile (the legitimate
-- verification use case), closing the cross-company roster leak.
-- Rollback:
--   drop policy "Public can view employees with public elec-id" on public.employer_employees;
--   create policy "Public can view employees for elec id verification" on public.employer_employees
--     for select to anon using (true);
drop policy if exists "Public can view employees for elec id verification" on public.employer_employees;

create policy "Public can view employees with public elec-id"
on public.employer_employees
for select
to anon
using (
  id in (
    select employee_id
    from public.employer_elec_id_profiles
    where profile_visibility = 'public'
      and opt_out = false
      and employee_id is not null
  )
);
