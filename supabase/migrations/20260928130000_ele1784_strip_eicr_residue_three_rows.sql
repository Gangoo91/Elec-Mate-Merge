-- ELE-1784 — the residue of the 26–27 Sep certificate-routing incident.
--
-- Three live rows are not EICRs but carry the EICR form's three body arrays,
-- all of them blank defaults (checked 28 Sep 2026, see the ticket):
--   18c48072 danger-notice  DANGER-NOTICE-2026-92A179  66 items / 0 outcomes, 0 obs, 1 blank schedule row
--   46ff557c smoke-co-alarm EICR-2026-3467             66 items / 0 outcomes, 0 obs, 1 blank schedule row
--   47d4b5fb smoke-co-alarm EICR-2026-4171             66 items / 0 outcomes, 0 obs, no schedule
-- Their own bodies (dangers / alarms) are untouched. Two other rows that
-- matched the key scan — routine-inspection RIR-2026-0004 and visual-condition
-- VCR-2026-0001 — legitimately own `inspectionItems` and are NOT touched.
--
-- Guarded: each row is only written if the arrays are still blank, so a user
-- who has since typed into one of them keeps their work. Triggers that would
-- bump edit_version / updated_at (and hand someone mid-edit a conflict dialog)
-- are off for the write. The blank-overwrite guard stays on: it compares the
-- type's own body array (alarms / dangers), which does not change.


alter table public.reports disable trigger set_reports_updated_at;
alter table public.reports disable trigger trigger_increment_edit_version;

update public.reports r
set data = r.data - 'inspectionItems' - 'defectObservations' - 'scheduleOfTests'
where r.id in (
  '18c48072-0873-48ab-bbe1-d456c2c0f70f',
  '46ff557c-ac69-4edb-93b6-8f7887f22172',
  '47d4b5fb-f000-4b35-babc-2b0dd8c24394'
)
and r.deleted_at is null
and r.report_type in ('danger-notice', 'smoke-co-alarm')
and not exists (
  select 1 from jsonb_array_elements(coalesce(r.data->'inspectionItems', '[]'::jsonb)) i
  where coalesce(i->>'outcome', '') <> '' or coalesce(i->>'notes', '') <> ''
)
and jsonb_array_length(coalesce(r.data->'defectObservations', '[]'::jsonb)) = 0
and not exists (
  select 1 from jsonb_array_elements(coalesce(r.data->'scheduleOfTests', '[]'::jsonb)) s,
       jsonb_each_text(s) kv
  where kv.key not in ('id', 'boardId', 'circuitNumber', 'circuitDesignation')
    and coalesce(kv.value, '') <> ''
);

alter table public.reports enable trigger trigger_increment_edit_version;
alter table public.reports enable trigger set_reports_updated_at;

