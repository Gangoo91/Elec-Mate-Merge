-- ELE-1396 v2 — Annex H front-sheet fields + 2025-edition entry types.
-- detector_count powers the Annex F false alarm rate (Afr = 100 × Afn/DAF,
-- preliminary investigation trigger >4 per 100 detectors/yr).
alter table public.fire_alarm_log_books
  add column detector_count int,
  add column arc_connected boolean not null default false,
  add column arc_phone text not null default '',
  add column servicing_org text not null default '',
  add column servicing_org_phone text not null default '',
  add column installation_date date,
  add column acceptance_date date,
  add column commissioning_cert_ref text not null default '';

alter table public.fire_alarm_log_entries
  drop constraint fire_alarm_log_entries_entry_type_check;
alter table public.fire_alarm_log_entries
  add constraint fire_alarm_log_entries_entry_type_check check (entry_type in
    ('weekly_test','fault','false_alarm','service','battery','panel_event','variation',
     'fire_event','drill','monthly_check'));
