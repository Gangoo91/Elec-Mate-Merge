-- The employer's own read/sign-off state on comms was local React state —
-- "Signed off · Acknowledged" evaporated on refresh, which for Mandatory
-- Reading is a fake compliance record. Persist it on the row (the hub is
-- admin-only, so employer-side receipts are per-company, not per-user).
-- Also make "requires acknowledgement" a real flag instead of inferring it
-- from priority (ticking "High priority" on a broadcast used to silently
-- convert it into a sign-off demand).
-- Rollback: alter table public.employer_communications
--   drop column employer_read_at, drop column employer_acknowledged_at,
--   drop column requires_acknowledgement;

alter table public.employer_communications
  add column if not exists employer_read_at timestamptz,
  add column if not exists employer_acknowledged_at timestamptz,
  add column if not exists requires_acknowledgement boolean not null default false;

-- History starts read on the employer surface (it was all authored or seen
-- pre-feature); preserve the current mandatory-reading display for old rows.
update public.employer_communications
  set employer_read_at = created_at
  where employer_read_at is null;

update public.employer_communications
  set requires_acknowledgement = true
  where priority in ('high', 'urgent') and type <> 'alert';
