-- ELE-1950 — say what "Verified" means, and make the person's Elec-ID
-- qualifications the ONE credentials store.
--
-- Findings (6 Oct 2026):
--   * employer_elec_id_profiles.is_verified = true on all 119 rows. Nothing set
--     it by default/trigger: every row has an 'approved' entry in
--     elec_id_verification_history by an Elec-Mate super admin (Admin → Elec-IDs,
--     bulk approve, via the admin-verify-elecid edge function). That function
--     writes reviewed_by/reviewed_at but never verified_by, hence 118 NULLs; the
--     119th says 'Employer Admin' — the firm-side "Verify" button
--     (elecIdService.verifyElecIdProfile) which let ANY firm flip the global flag.
--     So is_verified truthfully means "an Elec-Mate admin approved the profile";
--     it never meant the ECS card or any qualification was checked.
--   * Qualifications (85 rows) are all is_verified = false, and the uploaded
--     qualification documents cannot be matched to individual rows, so every
--     qualification is honestly 'self_declared'.
--   * 25 profiles have an ECS card image an Elec-Mate admin reviewed and approved
--     (elec_id_documents.document_type = 'ecs_card') → ECS card 'document_seen'.
--
-- Model:
--   verification level per item: self_declared | document_seen | verified_at_source
--   with who (verified_by), which firm (verifier_employer_id), how (method), when.
--   Levels can only be raised through the definer RPCs below (a firm checking a
--   team member's item, or an Elec-Mate admin) — never by the person themselves,
--   and any change to the substance of an item drops it back to self_declared.

-- ─── 1. Qualifications: verification + the fields training needs ──────────────
alter table public.employer_elec_id_qualifications
  add column if not exists verification_level text not null default 'self_declared',
  add column if not exists verified_by uuid references public.profiles(id) on delete set null,
  add column if not exists verified_at timestamptz,
  add column if not exists verification_method text,
  add column if not exists verifier_employer_id uuid references public.profiles(id) on delete set null,
  add column if not exists document_url text,
  add column if not exists training_type text,
  add column if not exists training_status text,
  add column if not exists start_date date,
  add column if not exists funded_by text,
  add column if not exists added_by uuid references public.profiles(id) on delete set null,
  add column if not exists added_by_employer_id uuid references public.profiles(id) on delete set null,
  add column if not exists source_table text,
  add column if not exists source_id uuid,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'elec_id_qual_verification_level_chk') then
    alter table public.employer_elec_id_qualifications
      add constraint elec_id_qual_verification_level_chk
      check (verification_level in ('self_declared', 'document_seen', 'verified_at_source'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'elec_id_qual_training_status_chk') then
    alter table public.employer_elec_id_qualifications
      add constraint elec_id_qual_training_status_chk
      check (training_status is null or training_status in ('Pending', 'In Progress', 'Completed', 'Failed', 'Expired'));
  end if;
end $$;

create unique index if not exists employer_elec_id_qualifications_source_uidx
  on public.employer_elec_id_qualifications (source_table, source_id)
  where source_id is not null;
create index if not exists employer_elec_id_qualifications_profile_idx
  on public.employer_elec_id_qualifications (profile_id);
create index if not exists employer_elec_id_qualifications_expiry_idx
  on public.employer_elec_id_qualifications (expiry_date)
  where expiry_date is not null;

comment on column public.employer_elec_id_qualifications.verification_level is
  'self_declared (the person typed it) | document_seen (someone looked at the certificate) | verified_at_source (checked with the awarding body / card scheme). Only raised via set_credential_verification(); any substantive edit drops it back to self_declared.';
comment on column public.employer_elec_id_qualifications.is_verified is
  'Derived: true only when verification_level = verified_at_source. Kept in sync by trigger; do not write.';
comment on column public.employer_elec_id_qualifications.training_status is
  'Training rows only: null/Completed = held; Pending/In Progress/Failed = not held yet (excluded from the competence matrix).';
comment on column public.employer_elec_id_qualifications.added_by_employer_id is
  'Firm (owner profiles.id) that recorded this item for a team member; that firm may edit/delete it via the team RPCs.';

-- ─── 2. Profiles: ECS card verification + how the profile was approved ───────
alter table public.employer_elec_id_profiles
  add column if not exists verification_method text,
  add column if not exists ecs_verification_level text not null default 'self_declared',
  add column if not exists ecs_verified_by uuid references public.profiles(id) on delete set null,
  add column if not exists ecs_verified_at timestamptz,
  add column if not exists ecs_verification_method text,
  add column if not exists ecs_verifier_employer_id uuid references public.profiles(id) on delete set null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'elec_id_profile_ecs_level_chk') then
    alter table public.employer_elec_id_profiles
      add constraint elec_id_profile_ecs_level_chk
      check (ecs_verification_level in ('self_declared', 'document_seen', 'verified_at_source'));
  end if;
end $$;

comment on column public.employer_elec_id_profiles.is_verified is
  'Approved by an Elec-Mate admin (verified_by/verified_at, verification_method = elec_mate_admin_review). It is a profile review, NOT a check of the ECS card (see ecs_verification_level) or of any qualification. Only the admin function can set it.';
comment on column public.employer_elec_id_profiles.ecs_verification_level is
  'self_declared | document_seen | verified_at_source — how the ECS card was checked, by whom (ecs_verified_by, ecs_verifier_employer_id) and when. Any change to the card details drops it to self_declared.';

-- ─── 3. Truth backfill ────────────────────────────────────────────────────────
-- Record who approved each profile and how (the admin's review), instead of
-- leaving verified_by NULL / 'Employer Admin'.
update public.employer_elec_id_profiles
   set verified_by = reviewed_by::text,
       verified_at = coalesce(reviewed_at, verified_at),
       verification_method = 'elec_mate_admin_review'
 where is_verified = true
   and reviewed_by is not null
   and verification_status = 'approved';

-- Anything flagged verified without an admin review on record is not verified.
update public.employer_elec_id_profiles
   set is_verified = false, verified_by = null, verified_at = null, verification_method = null
 where is_verified = true
   and (reviewed_by is null or verification_status is distinct from 'approved');

-- ECS card images an Elec-Mate admin reviewed and approved → 'document_seen'.
update public.employer_elec_id_profiles p
   set ecs_verification_level = 'document_seen',
       ecs_verified_by = d.reviewed_by,
       ecs_verified_at = d.reviewed_at,
       ecs_verification_method = 'ECS card image reviewed by Elec-Mate'
  from (
    select distinct on (profile_id) profile_id, reviewed_by, reviewed_at
      from public.elec_id_documents
     where document_type = 'ecs_card'
       and verification_status = 'verified'
       and reviewed_by is not null
     order by profile_id, reviewed_at desc nulls last
  ) d
 where d.profile_id = p.id
   and p.ecs_verification_level = 'self_declared';

-- Qualifications: none has ever been checked.
update public.employer_elec_id_qualifications
   set verification_level = 'self_declared', is_verified = false
 where verification_level is distinct from 'self_declared' or is_verified is distinct from false;

-- ─── 4. Guards ────────────────────────────────────────────────────────────────
-- "privileged" = the definer RPCs below (owned by postgres), the service role
-- (admin edge functions) and migrations. Everyone else writing directly through
-- PostgREST (the person editing their own Elec-ID, a firm on a roster-row
-- profile) cannot touch the verification columns.
create or replace function public.elec_id_writer_is_privileged()
returns boolean
language sql
stable
set search_path = public
as $$
  select current_user in ('postgres', 'supabase_admin', 'service_role')
      or coalesce(auth.role(), '') = 'service_role';
$$;
revoke all on function public.elec_id_writer_is_privileged() from public, anon;
grant execute on function public.elec_id_writer_is_privileged() to authenticated, service_role;

create or replace function public.guard_elec_id_qualification()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_priv boolean := public.elec_id_writer_is_privileged();
begin
  if tg_op = 'INSERT' then
    if not v_priv then
      new.verification_level := 'self_declared';
      new.verified_by := null;
      new.verified_at := null;
      new.verification_method := null;
      new.verifier_employer_id := null;
      new.added_by := auth.uid();
      new.added_by_employer_id := null;
      new.source_table := null;
      new.source_id := null;
    end if;
  else
    if not v_priv then
      new.verification_level := old.verification_level;
      new.verified_by := old.verified_by;
      new.verified_at := old.verified_at;
      new.verification_method := old.verification_method;
      new.verifier_employer_id := old.verifier_employer_id;
      new.added_by := old.added_by;
      new.added_by_employer_id := old.added_by_employer_id;
      new.source_table := old.source_table;
      new.source_id := old.source_id;
    end if;
    -- The thing that was checked changed → it is no longer checked, unless this
    -- same write is the (privileged) verification itself.
    if (new.qualification_name, new.awarding_body, new.certificate_number,
        new.date_achieved, new.expiry_date, new.grade, new.document_url)
       is distinct from
       (old.qualification_name, old.awarding_body, old.certificate_number,
        old.date_achieved, old.expiry_date, old.grade, old.document_url)
       and new.verified_at is not distinct from old.verified_at then
      new.verification_level := 'self_declared';
    end if;
    new.updated_at := now();
  end if;

  if new.verification_level = 'self_declared' then
    new.verified_by := null;
    new.verified_at := null;
    new.verification_method := null;
    new.verifier_employer_id := null;
  end if;
  new.is_verified := (new.verification_level = 'verified_at_source');
  return new;
end;
$$;

drop trigger if exists trg_guard_elec_id_qualification on public.employer_elec_id_qualifications;
create trigger trg_guard_elec_id_qualification
  before insert or update on public.employer_elec_id_qualifications
  for each row execute function public.guard_elec_id_qualification();

create or replace function public.guard_elec_id_profile_verification()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_priv boolean := public.elec_id_writer_is_privileged();
begin
  if tg_op = 'INSERT' then
    if not v_priv then
      new.is_verified := false;
      new.verified_by := null;
      new.verified_at := null;
      new.verification_method := null;
      new.reviewed_by := null;
      new.reviewed_at := null;
      if new.verification_status is distinct from 'pending' then
        new.verification_status := 'pending';
      end if;
      new.ecs_verification_level := 'self_declared';
      new.ecs_verified_by := null;
      new.ecs_verified_at := null;
      new.ecs_verification_method := null;
      new.ecs_verifier_employer_id := null;
    end if;
  else
    if not v_priv then
      new.is_verified := old.is_verified;
      new.verified_by := old.verified_by;
      new.verified_at := old.verified_at;
      new.verification_method := old.verification_method;
      new.reviewed_by := old.reviewed_by;
      new.reviewed_at := old.reviewed_at;
      if new.verification_status = 'approved' and old.verification_status is distinct from 'approved' then
        new.verification_status := old.verification_status;
      end if;
      new.ecs_verification_level := old.ecs_verification_level;
      new.ecs_verified_by := old.ecs_verified_by;
      new.ecs_verified_at := old.ecs_verified_at;
      new.ecs_verification_method := old.ecs_verification_method;
      new.ecs_verifier_employer_id := old.ecs_verifier_employer_id;
    end if;
    -- New card details are unchecked card details.
    if (new.ecs_card_type, new.ecs_card_number, new.ecs_expiry_date)
       is distinct from (old.ecs_card_type, old.ecs_card_number, old.ecs_expiry_date)
       and new.ecs_verified_at is not distinct from old.ecs_verified_at then
      new.ecs_verification_level := 'self_declared';
    end if;
    -- The admin function approves with reviewed_by but no verified_by: record
    -- the approver and the method so "verified" always says who and how.
    if new.is_verified and not coalesce(old.is_verified, false) then
      new.verified_by := coalesce(new.verified_by, new.reviewed_by::text);
      new.verified_at := coalesce(new.verified_at, new.reviewed_at, now());
      new.verification_method := coalesce(new.verification_method, 'elec_mate_admin_review');
    elsif not new.is_verified and coalesce(old.is_verified, false) then
      new.verified_by := null;
      new.verified_at := null;
      new.verification_method := null;
    end if;
  end if;

  if new.ecs_verification_level = 'self_declared' then
    new.ecs_verified_by := null;
    new.ecs_verified_at := null;
    new.ecs_verification_method := null;
    new.ecs_verifier_employer_id := null;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_elec_id_profile_verification on public.employer_elec_id_profiles;
create trigger trg_guard_elec_id_profile_verification
  before insert or update on public.employer_elec_id_profiles
  for each row execute function public.guard_elec_id_profile_verification();
