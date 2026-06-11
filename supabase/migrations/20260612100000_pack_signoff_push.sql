-- Pack sent → assigned worker push ("read and sign before you start", deep
-- link ?signoff=<ackId>); worker signs → employer bell. Full body in DB
-- migration pack_signoff_push.

-- (applied additionally as pack_signoff_fixes):
alter table public.employer_job_pack_acknowledgements
  alter column acknowledged_at drop default;
-- (recursion-safe via definer helper — packs/acks policies referenced each
--  other)
create or replace function public.my_pack_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select a.job_pack_id
  from employer_job_pack_acknowledgements a
  where a.employee_id in (select public.my_employee_ids());
$$;
grant execute on function public.my_pack_ids() to authenticated;

create policy "Worker reads packs sent to them"
  on public.employer_job_packs
  for select to authenticated
  using (id in (select public.my_pack_ids()));
