-- Apprentice site diary: training time that counts, units, supervisor, tutor sharing.
-- Applied 6 Oct 2026 with Andrew's approval (site diary rebuild).
--
-- Why: every diary save had failed since February — the client sent
-- linked_time_entry_id, from a migration (20260214) that was never applied.
-- And the hours it tried to write went to time_entries, which the OTJ hub
-- itself says never count ("self-reported"). Training time now goes where the
-- OTJ hub, the tutor and the employer attestation already look:
-- college_otj_entries (apprentice_submitted, pending). The 20260214 column is
-- deliberately NOT added.

alter table public.site_diary_entries
  add column if not exists linked_otj_entry_id uuid
    references public.college_otj_entries(id) on delete set null,
  add column if not exists training_minutes integer
    check (training_minutes is null or (training_minutes > 0 and training_minutes <= 1440)),
  add column if not exists training_type text
    check (training_type is null or training_type in
      ('practical','shadowing','tutorial','manufacturer_training','workshop','mentoring','other')),
  add column if not exists unit_codes text[] not null default '{}',
  add column if not exists supervisor_user_id uuid,
  add column if not exists share_with_tutor boolean not null default false;

comment on column public.site_diary_entries.training_minutes is
  'Off-the-job TRAINING time that day (taught, shadowed, toolbox talk) — not hours on site. Sent to college_otj_entries for verification.';
comment on column public.site_diary_entries.share_with_tutor is
  'The apprentice chose to share this entry (and its question) with their college. Mood is never shown to staff.';

create index if not exists site_diary_entries_user_date_idx
  on public.site_diary_entries (user_id, date desc);

-- The learner's college staff can read entries the learner chose to share.
drop policy if exists "College staff read shared diary entries" on public.site_diary_entries;
create policy "College staff read shared diary entries"
  on public.site_diary_entries for select to authenticated
  using (share_with_tutor and public.is_staff_for_learner_user(user_id));
