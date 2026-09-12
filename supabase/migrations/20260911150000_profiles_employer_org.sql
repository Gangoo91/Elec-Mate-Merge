-- Employer accounts made through Admin → Bulk create (a contractor looking at
-- the app for their own electricians). Sits beside college_org so the
-- Employers admin page can list them without them showing as tutors.
alter table public.profiles add column if not exists employer_org text;
create index if not exists profiles_employer_org_idx on public.profiles (employer_org) where employer_org is not null;
