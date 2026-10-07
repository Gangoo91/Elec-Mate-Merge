-- ELE-1909: learner risk, the last gaps.
--
-- 1. Per-college risk thresholds (college_risk_settings). One row per college,
--    absent = the built-in defaults compute-student-risk has always used, so
--    nothing changes for a college until a manager saves different numbers.
--    Read by every staff member at the college (the settings page shows them),
--    written only by someone college_can('settings.manage') allows.
-- 2. How a contact with a flagged learner was made (pastoral_notes.contact_method):
--    call, one_to_one, email or referral. Nullable and additive, so the released
--    web app and iOS build 49, which never send it, keep inserting notes as before.
begin;

create table if not exists public.college_risk_settings (
  college_id            uuid primary key references public.colleges(id) on delete cascade,
  attendance_target_pct int  not null default 85 check (attendance_target_pct between 50 and 100),
  evidence_quiet_days   int  not null default 14 check (evidence_quiet_days between 7 and 90),
  portfolio_stale_days  int  not null default 21 check (portfolio_stale_days between 7 and 120),
  observation_gap_days  int  not null default 60 check (observation_gap_days between 14 and 180),
  otj_gap_days          int  not null default 28 check (otj_gap_days between 7 and 120),
  review_grace_days     int  not null default 7  check (review_grace_days between 0 and 60),
  medium_from           int  not null default 25 check (medium_from between 5 and 95),
  high_from             int  not null default 50 check (high_from between 10 and 98),
  critical_from         int  not null default 70 check (critical_from between 15 and 100),
  updated_by            uuid references auth.users(id) on delete set null,
  updated_at            timestamptz not null default now(),
  created_at            timestamptz not null default now(),
  constraint college_risk_settings_bands_order check (medium_from < high_from and high_from < critical_from)
);
comment on table public.college_risk_settings is
  '[COLLEGE] Per-college thresholds for the nightly learner risk score (ELE-1909): attendance target, how many quiet days before evidence, portfolio, observation and off-the-job gaps count, review grace, and the score bands for medium / high / critical. No row = built-in defaults. Scope: one row per college. Used by: compute-student-risk (service role), Curriculum settings page (Risk flags card). Rule: written only by staff college_can(''settings.manage''); changes apply at the next nightly run or a "Recheck risk".';

alter table public.college_risk_settings enable row level security;

drop policy if exists "college staff read risk settings" on public.college_risk_settings;
create policy "college staff read risk settings" on public.college_risk_settings
  for select to authenticated
  using (public.college_can('learners.view_mine', college_id));

drop policy if exists "college managers write risk settings" on public.college_risk_settings;
create policy "college managers write risk settings" on public.college_risk_settings
  for all to authenticated
  using (public.college_can('settings.manage', college_id))
  with check (public.college_can('settings.manage', college_id));

revoke all on public.college_risk_settings from anon;
grant select, insert, update, delete on public.college_risk_settings to authenticated;
grant all on public.college_risk_settings to service_role;

create or replace function public._college_risk_settings_touch()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  return new;
end;
$function$;
revoke all on function public._college_risk_settings_touch() from anon, public;

drop trigger if exists trg_college_risk_settings_touch on public.college_risk_settings;
create trigger trg_college_risk_settings_touch
  before insert or update on public.college_risk_settings
  for each row execute function public._college_risk_settings_touch();

-- How the contact was made. Null on every note written before this, and on
-- notes from builds that do not send it.
alter table public.pastoral_notes add column if not exists contact_method text;
alter table public.pastoral_notes drop constraint if exists pastoral_notes_contact_method_check;
alter table public.pastoral_notes add constraint pastoral_notes_contact_method_check
  check (contact_method is null or contact_method in ('call', 'one_to_one', 'email', 'referral'));
comment on column public.pastoral_notes.contact_method is
  'ELE-1909: how a contact with a learner was made when logged from the risk flags (call, one_to_one, email, referral). Null for ordinary notes and older builds. A 1-2-1 is kind one_to_one; a call, email or referral is kind intervention.';

commit;
