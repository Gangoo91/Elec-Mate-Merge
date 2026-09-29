-- Part P notifications — make the tracker and the certificate agree (ELE-1715).
--
-- Before this the two never spoke: a row was opened for EVERY issued EIC, EV
-- and solar certificate whether or not the certificate said the work was
-- notifiable, and "Mark as submitted" on the tracker left the certificate
-- printing "not submitted". 59 open rows sat on certificates that said
-- "not notifiable"; 55 of those had been chased with an OVERDUE email.
--
--  1. A `not_required` status, so a row can be closed honestly rather than
--     "cancelled".
--  2. `part_p_certificate_verdict(type, data)` — what the certificate says:
--     'yes' | 'no' | 'unknown'. One definition, used by the reconcile below,
--     the sync trigger, and (mirrored) by the client.
--  3. `record_building_regs_on_certificate(...)` — the tracker writes back to
--     the certificate (Part P answered / required / route / reference).
--  4. A trigger on reports.data: when the certificate is edited to say
--     "notified" or "not notifiable", the open tracker row follows.

alter table public.part_p_notifications
  drop constraint if exists part_p_notifications_notification_status_check;
alter table public.part_p_notifications
  add constraint part_p_notifications_notification_status_check
  check (notification_status = any (array['pending','in-progress','submitted','overdue','cancelled','not_required']));

create index if not exists part_p_notifications_report_id_idx
  on public.part_p_notifications (report_id);

-- ── What the certificate says ─────────────────────────────────────────────
-- Mirrors `certificateSaysNotifiable` in src/utils/notificationHelper.ts.
create or replace function public.part_p_certificate_verdict(p_report_type text, p_data jsonb)
returns text
language sql
immutable
as $$
  select case
    -- Part P is for dwellings; a known non-dwelling never notifies (ELE-1662).
    when lower(coalesce(d->>'installationType', d->>'propertyType', '')) in ('commercial','industrial','public') then 'no'
    -- An EICR is an inspection, never notifiable work.
    when p_report_type = 'eicr' then 'no'
    -- Minor works: the Part P tick on the declaration.
    when p_report_type = 'minor-works' then
      case when d->'partPNotification' = 'true'::jsonb then 'yes' else 'no' end
    -- EIC / EV / solar: the shared Building Regulations section, once answered.
    when d->'buildingRegsAnswered' = 'true'::jsonb
      or d->'buildingRegsRequired' = 'true'::jsonb
      or d->'buildingRegsViaScheme' = 'true'::jsonb
      or d->'buildingRegsSubmitted' = 'true'::jsonb then
      case when d->'buildingRegsRequired' = 'true'::jsonb then 'yes' else 'no' end
    -- EIC fallback: the Part P compliance chip on the details tab.
    when p_report_type = 'eic' and d->>'partPCompliance' = 'compliant' then 'yes'
    when p_report_type = 'eic' and d->>'partPCompliance' in ('nonNotifiable','notApplicable') then 'no'
    else 'unknown'
  end
  from (select coalesce(p_data, '{}'::jsonb) as d) x;
$$;

-- Has the certificate recorded the notification as made?
create or replace function public.part_p_certificate_notified(p_data jsonb)
returns boolean
language sql
immutable
as $$
  select coalesce(p_data->'buildingRegsViaScheme' = 'true'::jsonb, false)
      or coalesce(p_data->'buildingRegsSubmitted' = 'true'::jsonb, false)
      or nullif(trim(coalesce(p_data->>'buildingRegsReference', '')), '') is not null;
$$;

-- ── Tracker → certificate ─────────────────────────────────────────────────
-- Called by the notifications page. Writes the Part P answer onto the
-- certificate so the printed document and the tracker say the same thing.
-- Only the owner may call it; the merge never removes anything.
create or replace function public.record_building_regs_on_certificate(
  p_report_id text,
  p_required boolean,
  p_via_scheme boolean default false,
  p_direct boolean default false,
  p_reference text default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_report public.reports%rowtype;
  v_patch  jsonb;
  v_ppc    text;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into v_report from public.reports where report_id = p_report_id and deleted_at is null;
  if not found then
    raise exception 'certificate % not found', p_report_id using errcode = 'P0002';
  end if;
  if v_report.user_id <> auth.uid() then
    raise exception 'not your certificate' using errcode = '42501';
  end if;

  v_patch := jsonb_build_object(
    'buildingRegsAnswered',  true,
    'buildingRegsRequired',  coalesce(p_required, false),
    'buildingRegsViaScheme', coalesce(p_required, false) and coalesce(p_via_scheme, false),
    'buildingRegsSubmitted', coalesce(p_required, false) and coalesce(p_direct, false)
  );
  if coalesce(p_required, false) and nullif(trim(coalesce(p_reference, '')), '') is not null then
    v_patch := v_patch || jsonb_build_object('buildingRegsReference', trim(p_reference));
  end if;
  if v_report.report_type = 'minor-works' then
    v_patch := v_patch || jsonb_build_object('partPNotification', coalesce(p_required, false));
  end if;
  if v_report.report_type = 'eic' then
    -- Keep the details-tab chip in step, exactly as the EIC declarations tab does.
    v_ppc := coalesce(v_report.data->>'partPCompliance', '');
    if v_ppc in ('', 'compliant', 'nonNotifiable') then
      v_patch := v_patch || jsonb_build_object('partPCompliance',
        case when coalesce(p_required, false) then 'compliant' else 'nonNotifiable' end);
    end if;
  end if;

  update public.reports
     set data = coalesce(data, '{}'::jsonb) || v_patch
   where id = v_report.id;

  return v_patch;
end;
$$;

grant execute on function public.record_building_regs_on_certificate(text, boolean, boolean, boolean, text) to authenticated;

-- ── Certificate → tracker ─────────────────────────────────────────────────
-- An edit to the certificate closes (or reopens) its tracker row. Fail-open:
-- a certificate save must never be blocked by the tracker.
create or replace function public.sync_part_p_from_report()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_verdict  text;
  v_notified boolean;
begin
  if old.data is not distinct from new.data then
    return new;
  end if;
  begin
    v_verdict  := public.part_p_certificate_verdict(new.report_type, new.data);
    v_notified := public.part_p_certificate_notified(new.data);

    if v_notified then
      update public.part_p_notifications
         set notification_status = 'submitted',
             submitted_at = coalesce(submitted_at, now()),
             local_authority_submitted = local_authority_submitted
               or coalesce(new.data->'buildingRegsSubmitted' = 'true'::jsonb, false),
             updated_at = now()
       where report_id = new.report_id
         and user_id = new.user_id
         and notification_status in ('pending','in-progress','overdue');
    elsif v_verdict = 'no' then
      update public.part_p_notifications
         set notification_status = 'not_required',
             updated_at = now()
       where report_id = new.report_id
         and user_id = new.user_id
         and notification_status in ('pending','in-progress','overdue');
    elsif v_verdict = 'yes' then
      update public.part_p_notifications
         set notification_status = 'pending',
             updated_at = now()
       where report_id = new.report_id
         and user_id = new.user_id
         and notification_status = 'not_required';
    end if;
  exception when others then
    raise warning 'sync_part_p_from_report failed for %: %', new.report_id, sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists trg_sync_part_p_from_report on public.reports;
create trigger trg_sync_part_p_from_report
  after update of data on public.reports
  for each row execute function public.sync_part_p_from_report();
