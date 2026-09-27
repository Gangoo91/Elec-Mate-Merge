-- Type-aware blank-overwrite guard + next_inspection_due sync/backfill (27 Sep 2026)
--
-- Two production defects, one migration, both found while fixing a user's
-- lost Smoke & CO alarm certificate (see project memory 2026-09-26/27).
--
-- ── 1. prevent_blank_report_overwrite was EICR-only ──────────────────────
-- It counted scheduleOfTests / circuits / distributionBoards. No specialist
-- certificate has those keys, so for 21 of 24 types the server-side guard
-- against a remounted blank form overwriting finished work could never fire.
-- The client guard (useReportSync BODY_ARRAYS) was fixed on 26 Sep; this makes
-- the trigger mirror it. The EICR family keeps EXACTLY its old thresholds —
-- the client's default branch was written to match them and must stay matched.
--
-- ── 2. next_inspection_due was null on every one of 1,262 EICR/EIC ───────
-- sync_report_next_due read only nextInspectionDue / nextTestDue. The EICR and
-- EIC store the date as nextInspectionDate, so it never matched one. It also
-- only ever filled a NULL column, so a corrected date never propagated, and it
-- cast through timestamptz into a date column. Rewritten to read the same key
-- list the client now writes (reportCloud.reportNextInspectionDue), strictly
-- ISO, re-derived whenever data changes. Then the existing rows are backfilled.
--
-- ── Backfill safety ──────────────────────────────────────────────────────
-- The backfill writes ONLY next_inspection_due. It does not touch data, so
-- increment_report_edit_version and log_report_audit (both gated on data /
-- status changing) do nothing, and trg_sync_report_next_due (UPDATE OF data)
-- does not fire. set_reports_updated_at WOULD stamp updated_at on every row,
-- and the app compares updated_at against a local draft's timestamp to decide
-- which copy is newer — bumping it could make a stale cloud copy win over
-- someone's unsaved work. It is disabled for the statement, inside the same
-- transaction, and re-enabled immediately after.

-- ── safe date parse: strict ISO, and an impossible calendar date is NULL, never an error ──
create or replace function public.safe_iso_date(p text)
returns date
language plpgsql
immutable
as $$
begin
  if p is null or p !~ '^\d{4}-\d{2}-\d{2}$' then
    return null;
  end if;
  return p::date;
exception when others then
  return null;
end;
$$;

-- ── next_inspection_due: same keys as the client, re-derived on every data change ──
create or replace function public.sync_report_next_due()
returns trigger
language plpgsql
set search_path to ''
as $$
declare
  v text;
begin
  -- Only when the form data itself changed (or on insert). A direct column
  -- write — the backfill below, or the client sending the derived value — is
  -- left alone.
  if tg_op = 'UPDATE' and new.data is not distinct from old.data then
    return new;
  end if;
  v := coalesce(
    nullif(new.data->>'nextInspectionDate', ''),   -- eicr, eic, ev-charging, smoke/CO, routine inspection
    nullif(new.data->>'nextInspectionDue', ''),    -- minor works, fire alarm G1/G7
    nullif(new.data->>'nextAnnualTestDue', ''),    -- emergency lighting
    nullif(new.data->>'nextTestDue', ''),          -- PAT
    nullif(new.data->>'nextServiceDue', '')        -- fire alarm service, solar PV
  );
  new.next_inspection_due := public.safe_iso_date(v);
  return new;
end;
$$;

-- ── blank-overwrite guard: type-aware ──
create or replace function public.prevent_blank_report_overwrite()
returns trigger
language plpgsql
as $$
declare
  v_type text := lower(trim(coalesce(new.report_type, '')));
  v_keys text[];
  v_k text;
  v_old_rows int := 0;
  v_new_rows int := 0;
  v_old_ident boolean;
  v_new_ident boolean;
  v_old_tell boolean := false;
  v_new_tell boolean := false;
  v_old_populated boolean;
  v_new_near_empty boolean;
  -- EICR family (unchanged thresholds — these MUST match the client default branch)
  old_sot_count   int;
  new_sot_count   int;
  old_circ_count  int;
  new_circ_count  int;
  old_board_count int;
  new_board_count int;
begin
  if new.data is not distinct from old.data then
    return new;
  end if;

  -- The body arrays each type's form actually stores. Mirror of BODY_ARRAYS in
  -- src/hooks/useReportSync.ts — change both or neither.
  v_keys := case v_type
    when 'pat-testing'              then array['appliances']
    when 'emergency-lighting'       then array['luminaires','luxReadings']
    when 'fire-alarm'               then array['detectors','zones','callPoints','sounders','interfaceEquipment','aspiratingUnits','repeaterPanels']
    when 'fire-alarm-design'        then array['zones','interfaceEquipment','drawings']
    when 'fire-alarm-commissioning' then array['detectors','zones','callPoints','sounders','interfaceEquipment']
    when 'fire-alarm-inspection'    then array['defectsFound','previousDefects','sampledDevices']
    when 'fire-alarm-modification'  then array['detectors','zones','callPoints','sounders','interfaceEquipment']
    when 'ev-charging'              then array['testResults']
    when 'solar-pv'                 then array['arrays','inverters']
    when 'smoke-co-alarm'           then array['alarms']
    when 'lightning-protection'     then array['visualInspection','earthElectrodeTests','downConductorTests','bondingTests','spdChecks','separationChecks','observations']
    when 'plug-in-solar'            then array['remedialItems']
    when 'visual-condition'         then array['inspectionItems','observations']
    when 'routine-inspection'       then array['inspectionItems','observations','spotChecks']
    when 'pre-purchase-survey'      then array['findings']
    when 'danger-notice'            then array['dangers']
    when 'limitation-notice'        then array['limitations']
    when 'non-compliance-notice'    then array['items']
    when 'completion-notice'        then array['workItems','materialsUsed']
    when 'board-schedule'           then array['circuits']
    else null
  end;

  if v_keys is null then
    -- EICR / EIC / minor-works / testing-only and anything unknown: the
    -- original rule, byte for byte.
    old_sot_count   := jsonb_array_length(coalesce(old.data->'scheduleOfTests',    '[]'::jsonb));
    new_sot_count   := jsonb_array_length(coalesce(new.data->'scheduleOfTests',    '[]'::jsonb));
    old_circ_count  := jsonb_array_length(coalesce(old.data->'circuits',           '[]'::jsonb));
    new_circ_count  := jsonb_array_length(coalesce(new.data->'circuits',           '[]'::jsonb));
    old_board_count := jsonb_array_length(coalesce(old.data->'distributionBoards', '[]'::jsonb));
    new_board_count := jsonb_array_length(coalesce(new.data->'distributionBoards', '[]'::jsonb));
    if ((old_sot_count >= 3) or (old_circ_count >= 3) or (old_board_count >= 2))
       and (new_sot_count <= 1 and new_circ_count = 0 and new_board_count = 0) then
      raise exception
        'reports.update blocked: blank-overwrite of populated draft (id=%, old sot=%, circ=%, boards=% -> new sot=%, circ=%, boards=%). Autosave race suspected.',
        new.id, old_sot_count, old_circ_count, old_board_count,
                new_sot_count, new_circ_count, new_board_count
        using errcode = 'P0001';
    end if;
    return new;
  end if;

  -- Specialist types: rows on the biggest body array, plus whether the payload
  -- still says whose certificate it is. The identity half is what separates a
  -- deliberate deletion (address still typed) from a blank remount (everything
  -- gone) — without it, removing an alarm would be blocked.
  foreach v_k in array v_keys loop
    if jsonb_typeof(old.data->v_k) = 'array' then
      v_old_rows := greatest(v_old_rows, jsonb_array_length(old.data->v_k));
    end if;
    if jsonb_typeof(new.data->v_k) = 'array' then
      v_new_rows := greatest(v_new_rows, jsonb_array_length(new.data->v_k));
    end if;
  end loop;

  v_old_ident := coalesce(
    nullif(trim(old.data->>'clientName'),'') is not null or nullif(trim(old.data->>'installationAddress'),'') is not null
    or nullif(trim(old.data->>'propertyAddress'),'') is not null or nullif(trim(old.data->>'premisesAddress'),'') is not null
    or nullif(trim(old.data->>'siteAddress'),'') is not null or nullif(trim(old.data->>'clientAddress'),'') is not null, false);
  v_new_ident := coalesce(
    nullif(trim(new.data->>'clientName'),'') is not null or nullif(trim(new.data->>'installationAddress'),'') is not null
    or nullif(trim(new.data->>'propertyAddress'),'') is not null or nullif(trim(new.data->>'premisesAddress'),'') is not null
    or nullif(trim(new.data->>'siteAddress'),'') is not null or nullif(trim(new.data->>'clientAddress'),'') is not null, false);

  -- EV charging is mostly one charge point in scalar fields.
  if v_type = 'ev-charging' then
    v_old_tell := nullif(trim(old.data->>'chargerMake'),'') is not null and nullif(trim(old.data->>'chargerModel'),'') is not null;
    v_new_tell := nullif(trim(new.data->>'chargerMake'),'') is not null and nullif(trim(new.data->>'chargerModel'),'') is not null;
  end if;

  v_old_populated  := v_old_rows >= 2 or (v_old_rows >= 1 and v_old_ident) or v_old_tell;
  v_new_near_empty := (not v_new_tell) and (v_new_rows = 0 or (v_new_rows <= 1 and not v_new_ident));

  if v_old_populated and v_new_near_empty then
    raise exception
      'reports.update blocked: blank-overwrite of populated % (id=%, old rows=% ident=% -> new rows=% ident=%). Autosave race suspected.',
      v_type, new.id, v_old_rows, v_old_ident, v_new_rows, v_new_ident
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

-- ── backfill next_inspection_due from the JSON, without stamping updated_at ──
alter table public.reports disable trigger set_reports_updated_at;

update public.reports r
set next_inspection_due = public.safe_iso_date(coalesce(
      nullif(r.data->>'nextInspectionDate', ''),
      nullif(r.data->>'nextInspectionDue', ''),
      nullif(r.data->>'nextAnnualTestDue', ''),
      nullif(r.data->>'nextTestDue', ''),
      nullif(r.data->>'nextServiceDue', '')))
where r.deleted_at is null
  and r.next_inspection_due is null
  and public.safe_iso_date(coalesce(
      nullif(r.data->>'nextInspectionDate', ''),
      nullif(r.data->>'nextInspectionDue', ''),
      nullif(r.data->>'nextAnnualTestDue', ''),
      nullif(r.data->>'nextTestDue', ''),
      nullif(r.data->>'nextServiceDue', ''))) is not null;

alter table public.reports enable trigger set_reports_updated_at;

