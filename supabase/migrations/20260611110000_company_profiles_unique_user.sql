-- One company profile per account. A real user double-submitted in April
-- (two identical rows 33s apart) — dedupe keeping the most recent, then
-- enforce uniqueness so the settings-spine upsert pattern is race-safe.
-- (Nothing FKs company_profiles; verified before delete.)

delete from public.company_profiles cp
 using public.company_profiles newer
 where cp.user_id = newer.user_id
   and cp.id <> newer.id
   and newer.updated_at > cp.updated_at;

create unique index if not exists uniq_company_profiles_user_id
  on public.company_profiles (user_id);
