-- Part P verdict — accept "true" as well as true.
--
-- The client mirror (`certificateSaysNotifiable`) treats the string "true" as
-- ticked, because older form data and a few pickers store booleans as strings.
-- The SQL side compared against JSON true only, so a certificate whose
-- partPNotification / buildingRegs* keys held "true" read as unanswered here
-- and answered on the client. One helper, used by both functions.

create or replace function public.part_p_truthy(v jsonb)
returns boolean
language sql
immutable
as $$
  select v = 'true'::jsonb or v = '"true"'::jsonb;
$$;

create or replace function public.part_p_certificate_verdict(p_report_type text, p_data jsonb)
returns text
language sql
immutable
as $$
  select case
    when lower(coalesce(d->>'installationType', d->>'propertyType', '')) in ('commercial','industrial','public') then 'no'
    when p_report_type = 'eicr' then 'no'
    when p_report_type = 'minor-works' then
      case when public.part_p_truthy(d->'partPNotification') then 'yes' else 'no' end
    when public.part_p_truthy(d->'buildingRegsAnswered')
      or public.part_p_truthy(d->'buildingRegsRequired')
      or public.part_p_truthy(d->'buildingRegsViaScheme')
      or public.part_p_truthy(d->'buildingRegsSubmitted') then
      case when public.part_p_truthy(d->'buildingRegsRequired') then 'yes' else 'no' end
    when p_report_type = 'eic' and d->>'partPCompliance' = 'compliant' then 'yes'
    when p_report_type = 'eic' and d->>'partPCompliance' in ('nonNotifiable','notApplicable') then 'no'
    else 'unknown'
  end
  from (select coalesce(p_data, '{}'::jsonb) as d) x;
$$;

create or replace function public.part_p_certificate_notified(p_data jsonb)
returns boolean
language sql
immutable
as $$
  select public.part_p_truthy(p_data->'buildingRegsViaScheme')
      or public.part_p_truthy(p_data->'buildingRegsSubmitted')
      or nullif(trim(coalesce(p_data->>'buildingRegsReference', '')), '') is not null;
$$;
