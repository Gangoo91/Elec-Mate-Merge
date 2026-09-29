-- Part P — tell the client, and chase the missing reference (ELE-1715).
--
-- 107 rows were marked submitted; 2 carried a reference. The reference is
-- what the homeowner, a landlord or a conveyancer asks for years later, so:
--   1. `client_notified_at/_to` — the one-line email to the client ("your work
--      was notified to Building Control via NAPIT on …, reference …") is
--      recorded on the row and shown on the card.
--   2. `part_p_reference_nudge_candidates()` — rows marked submitted a week
--      ago with no reference on the row or the certificate; the daily
--      reminder sends one `ref_missing` nudge (push + bell, no email).

alter table public.part_p_notifications
  add column if not exists client_notified_at timestamptz,
  add column if not exists client_notified_to text;

create or replace function public.part_p_reference_nudge_candidates()
returns table (
  id uuid,
  user_id uuid,
  report_id text,
  submitted_at timestamptz,
  reminders_sent text[],
  certificate_number text,
  client_name text
)
language sql
security definer
set search_path to 'public'
stable
as $$
  select p.id, p.user_id, p.report_id, p.submitted_at, p.reminders_sent,
         r.certificate_number, r.client_name
    from public.part_p_notifications p
    join public.reports r on r.report_id = p.report_id and r.deleted_at is null
   where p.notification_status = 'submitted'
     and p.submitted_at is not null
     and p.submitted_at < now() - interval '7 days'
     and nullif(trim(coalesce(p.scheme_certificate_ref, '')), '') is null
     and nullif(trim(coalesce(r.data->>'buildingRegsReference', '')), '') is null
     and not ('ref_missing' = any(coalesce(p.reminders_sent, '{}'::text[])));
$$;

revoke all on function public.part_p_reference_nudge_candidates() from public, anon, authenticated;
