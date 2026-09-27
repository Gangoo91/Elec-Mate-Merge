-- ELE-1784 (27 Sep 2026) — residue of the certificate-opened-in-the-EICR-form incident.
-- 10 live rows of other certificate types carried EMPTY EICR-shaped arrays; removed. The three rows
-- whose arrays are NOT empty are left for a decision. Routine inspection and visual condition reports
-- legitimately carry their own inspectionItems and are excluded. updated_at / edit_version untouched.
alter table public.reports disable trigger set_reports_updated_at;
alter table public.reports disable trigger trigger_increment_edit_version;
update public.reports
   set data = (data - 'inspectionItems' - 'defectObservations' - 'scheduleOfTests')
 where deleted_at is null
   and report_type not in ('eicr','eic','testing-only','routine-inspection','visual-condition')
   and (data ? 'inspectionItems' or data ? 'defectObservations' or data ? 'scheduleOfTests')
   and coalesce(case when jsonb_typeof(data->'inspectionItems')='array' then jsonb_array_length(data->'inspectionItems') end, 0) = 0
   and coalesce(case when jsonb_typeof(data->'defectObservations')='array' then jsonb_array_length(data->'defectObservations') end, 0) = 0
   and coalesce(case when jsonb_typeof(data->'scheduleOfTests')='array' then jsonb_array_length(data->'scheduleOfTests') end, 0) = 0;
alter table public.reports enable trigger trigger_increment_edit_version;
alter table public.reports enable trigger set_reports_updated_at;
