-- Part P helpers — NULL-safe.
--
-- `part_p_truthy(NULL)` returned NULL (NULL = 'true'::jsonb is NULL), so
-- `part_p_certificate_notified()` returned NULL for every certificate that
-- has no buildingRegs* keys at all — 91 of the 113 open rows on 29 Sep 2026
-- (older EICs, every Minor Works). `part_p_reminder_candidates()` filters on
-- `not part_p_certificate_notified(...)`, and NOT NULL is NULL, so those rows
-- silently dropped out of the daily reminders. Found by a dry run of the
-- deployed function (10 candidates where 20 were expected).
--
-- Both helpers now return a real boolean.

create or replace function public.part_p_truthy(v jsonb)
returns boolean
language sql
immutable
as $$
  select coalesce(v = 'true'::jsonb or v = '"true"'::jsonb, false);
$$;

create or replace function public.part_p_certificate_notified(p_data jsonb)
returns boolean
language sql
immutable
as $$
  select coalesce(
      public.part_p_truthy(p_data->'buildingRegsViaScheme')
      or public.part_p_truthy(p_data->'buildingRegsSubmitted')
      or nullif(trim(coalesce(p_data->>'buildingRegsReference', '')), '') is not null,
    false);
$$;
