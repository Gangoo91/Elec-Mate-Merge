-- Site Safety: public signing links reveal only what a signer needs.
--
-- 1. get_briefing_by_signing_token (anon, SECURITY DEFINER) returned the raw
--    `attendee_signatures` column for team briefings — every earlier signer's
--    drawn signature image, IP address, user agent and company — to anyone
--    holding (or forwarded) the link. The employer branch returned every
--    attendee's signature image URL. The public page only reads name +
--    signed_at, so the response is narrowed to exactly that. Nothing stored
--    changes; the owner still sees everything in the app.
--
-- 2. Token INSERT/UPDATE policies checked only who created the token, not who
--    owns the briefing / permit it points at. With another user's record id a
--    signed-in user could mint a link to it and, through the definer RPCs, read
--    it or (for permits) record acceptance on it. The WITH CHECK now requires
--    ownership of the parent record.
--
-- Body of (1) is the live definition as of 6 Oct 2026 with only the signer
-- fields changed.

create or replace function public.get_briefing_by_signing_token(token_param text)
returns json
language plpgsql
security definer
set search_path to 'public'
as $function$
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

  -- Team briefing store
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
    -- Names only: in-app signatures live on attendees[].signature.
    'attendees', coalesce((
      select jsonb_agg(jsonb_build_object('name', a->>'name'))
      from jsonb_array_elements(
        case when jsonb_typeof(tb.attendees::jsonb) = 'array' then tb.attendees::jsonb else '[]'::jsonb end
      ) a
    ), '[]'::jsonb),
    -- Who has signed and when — never the signature, IP, device or company.
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

  -- Employer briefing store
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

-- (2) Ownership of the parent record on create/update.
drop policy if exists "Users can manage their own briefing signing tokens" on public.briefing_signing_tokens;
create policy "Users can manage their own briefing signing tokens"
  on public.briefing_signing_tokens
  for all
  using (created_by_user_id = auth.uid())
  with check (
    created_by_user_id = auth.uid()
    and (
      exists (select 1 from public.team_briefings tb where tb.id = briefing_id and tb.user_id = auth.uid())
      or exists (select 1 from public.briefings b where b.id = briefing_id and b.user_id = auth.uid())
    )
  );

drop policy if exists "Users manage own permit signing tokens" on public.permit_signing_tokens;
create policy "Users manage own permit signing tokens"
  on public.permit_signing_tokens
  for all
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.permits_to_work p where p.id = permit_id and p.user_id = auth.uid())
  );
