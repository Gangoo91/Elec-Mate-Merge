-- ELE-1958: the talent-pool shortlist was localStorage (one device, invisible to
-- co-admins) yet drove the "Shortlisted" stat. Now one list per firm.
create table if not exists public.employer_talent_shortlist (
  employer_id uuid not null,
  profile_id uuid not null references public.employer_elec_id_profiles(id) on delete cascade,
  added_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (employer_id, profile_id)
);

alter table public.employer_talent_shortlist enable row level security;

drop policy if exists "Firm manages its shortlist" on public.employer_talent_shortlist;
create policy "Firm manages its shortlist" on public.employer_talent_shortlist
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (employer_id in (select public.my_employer_scope()));
