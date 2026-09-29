-- Part P write-back — a reopen must clear the reference too.
--
-- Found on the first end-to-end test (29 Sep 2026, MW-2026-1212): "Undo" on a
-- submitted row wrote viaScheme=false / submitted=false to the certificate but
-- left `buildingRegsReference` in place, and a reference alone counts as
-- "notified" — so the sync trigger flipped the row straight back to submitted.
-- Now, when neither route is set, the reference is removed as well.

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
  v_notified boolean;
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

  v_notified := coalesce(p_required, false) and (coalesce(p_via_scheme, false) or coalesce(p_direct, false));

  v_patch := jsonb_build_object(
    'buildingRegsAnswered',  true,
    'buildingRegsRequired',  coalesce(p_required, false),
    'buildingRegsViaScheme', coalesce(p_required, false) and coalesce(p_via_scheme, false),
    'buildingRegsSubmitted', coalesce(p_required, false) and coalesce(p_direct, false)
  );
  if v_notified and nullif(trim(coalesce(p_reference, '')), '') is not null then
    v_patch := v_patch || jsonb_build_object('buildingRegsReference', trim(p_reference));
  end if;
  if v_report.report_type = 'minor-works' then
    v_patch := v_patch || jsonb_build_object('partPNotification', coalesce(p_required, false));
  end if;
  if v_report.report_type = 'eic' then
    v_ppc := coalesce(v_report.data->>'partPCompliance', '');
    if v_ppc in ('', 'compliant', 'nonNotifiable') then
      v_patch := v_patch || jsonb_build_object('partPCompliance',
        case when coalesce(p_required, false) then 'compliant' else 'nonNotifiable' end);
    end if;
  end if;

  update public.reports
     set data = case
                  when v_notified then coalesce(data, '{}'::jsonb) || v_patch
                  -- Not (or no longer) notified: a stale reference would read as "notified".
                  else (coalesce(data, '{}'::jsonb) - 'buildingRegsReference') || v_patch
                end
   where id = v_report.id;

  return v_patch;
end;
$$;
