-- Briefing sign page: say who sent the link.
--
-- Adds company_name (the sender's company_profiles name) to
-- get_briefing_by_signing_token, so /briefing-sign shows "From <company>" and,
-- once a link has expired, who to ask for a new one.
--
-- Expiry itself is enforced by sign_briefing_by_token in
-- 20261006129000_briefing_sign_identity.sql (ELE-1949, employer session), which
-- ships WITH the frontend release; this file deliberately does not redefine it.
--
-- The public page now names who sent the link ("From <company>") and, once a
-- link has expired, who to ask for a new one. Adds company_name only; the rest
-- is the live function unchanged (attendee names + signed_at only, no
-- signatures, IPs or devices — 20261006123500).
CREATE OR REPLACE FUNCTION public.get_briefing_by_signing_token(token_param text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  result json;
  token_record record;
begin
  select bt.briefing_id, bt.expires_at, bt.is_active
  into token_record
  from briefing_signing_tokens bt
  where bt.public_token = token_param
    and bt.is_active = true;

  if not found then
    return null;
  end if;

  update briefing_signing_tokens
  set view_count = view_count + 1,
      last_viewed_at = now()
  where public_token = token_param;

  select json_build_object(
    'id', tb.id,
    'briefing_name', tb.briefing_name,
    'briefing_type', tb.briefing_type,
    'briefing_description', tb.briefing_description,
    'briefing_date', tb.briefing_date,
    'briefing_time', tb.briefing_time,
    'location', tb.location,
    'risk_level', tb.risk_level,
    'identified_hazards', tb.identified_hazards,
    'work_scope', tb.work_scope,
    'safety_warning', tb.safety_warning,
    'key_points', tb.key_points,
    'safety_points', tb.safety_points,
    'conductor_name', tb.conductor_name,
    'created_by_name', tb.created_by_name,
    'company_name', (select nullif(trim(cp.company_name), '') from company_profiles cp where cp.user_id = tb.user_id limit 1),
    'attendees', coalesce((
      select jsonb_agg(jsonb_build_object('name', a->>'name'))
      from jsonb_array_elements(
        case when jsonb_typeof(tb.attendees::jsonb) = 'array' then tb.attendees::jsonb else '[]'::jsonb end
      ) a
    ), '[]'::jsonb),
    'attendee_signatures', coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', s->>'name',
        'signed_at', coalesce(s->>'signed_at', s->>'timestamp')
      ))
      from jsonb_array_elements(
        case when jsonb_typeof(tb.attendee_signatures::jsonb) = 'array' then tb.attendee_signatures::jsonb else '[]'::jsonb end
      ) s
    ), '[]'::jsonb),
    'photos', tb.photos,
    'status', tb.status,
    'expired', (token_record.expires_at < now()),
    'expires_at', token_record.expires_at
  ) into result
  from team_briefings tb
  where tb.id = token_record.briefing_id;

  if result is not null then
    return result;
  end if;

  select json_build_object(
    'id', b.id,
    'briefing_name', b.title,
    'briefing_type', b.briefing_type,
    'briefing_description', b.content,
    'briefing_date', b.date,
    'briefing_time', b.time,
    'location', b.location,
    'risk_level', b.risk_level,
    'identified_hazards', null,
    'work_scope', null,
    'safety_warning', null,
    'key_points', null,
    'safety_points', null,
    'conductor_name', b.presenter,
    'created_by_name', b.presenter,
    'company_name', (select nullif(trim(cp.company_name), '') from company_profiles cp where cp.user_id = b.user_id limit 1),
    'attendees', coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', coalesce(ee.name, ba.guest_name),
        'timestamp', ba.acknowledged_at
      ))
      from briefing_attendees ba
      left join employer_employees ee on ee.id = ba.employee_id
      where ba.briefing_id = b.id
    ), '[]'::jsonb),
    'attendee_signatures', coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', coalesce(ee.name, ba.guest_name),
        'signed_at', ba.acknowledged_at
      ))
      from briefing_attendees ba
      left join employer_employees ee on ee.id = ba.employee_id
      where ba.briefing_id = b.id and ba.signature_url is not null
    ), '[]'::jsonb),
    'photos', to_jsonb(coalesce(b.photo_evidence, array[]::text[])),
    'status', b.status,
    'expired', (token_record.expires_at < now()),
    'expires_at', token_record.expires_at
  ) into result
  from briefings b
  where b.id = token_record.briefing_id;

  return result;
end;
$function$;
