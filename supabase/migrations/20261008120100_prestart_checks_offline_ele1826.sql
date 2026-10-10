-- ELE-1826 x ELE-1828: pre-start answers made with no signal keep the phone's time.
-- record_my_checklist_item gains p_answered_at (clamped to the last 7 days, never
-- in the future). It replaces the 11-argument version so named calls stay unambiguous.
-- A resend of the same answer updates the one row per item and person, never adds one.
drop function if exists public.record_my_checklist_item(uuid, text, jsonb, text[], text, text, text, numeric, numeric, numeric, text);

create or replace function public.record_my_checklist_item(
  p_job_checklist uuid,
  p_item_key text,
  p_value jsonb default '{}'::jsonb,
  p_photos text[] default '{}',
  p_signature text default null,
  p_signer_name text default null,
  p_note text default null,
  p_lat numeric default null,
  p_lng numeric default null,
  p_accuracy numeric default null,
  p_location_status text default null,
  -- ELE-1828: the phone's time when the worker answered (queued with no signal)
  p_answered_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_c public.employer_job_checklists;
  v_item jsonb;
  v_type text;
  v_me uuid;
  v_me_name text;
  v_subject uuid;
  v_satisfied boolean := true;
  v_bool boolean;
  v_num numeric;
  v_text text;
  v_id uuid;
  v_before_open int;
  v_job_title text;
  v_photo text;
  v_at timestamptz := least(now(), greatest(coalesce(p_answered_at, now()), now() - interval '7 days'));
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select * into v_c from public.employer_job_checklists where id = p_job_checklist;
  if v_c.id is null or not public.is_assigned_to_job(v_c.job_id) then
    raise exception 'This checklist isn''t on one of your jobs';
  end if;
  select e.id, e.name into v_me, v_me_name from public.employer_employees e
   where e.user_id = auth.uid() and e.employer_id = v_c.employer_id and e.status ilike 'active' limit 1;
  if v_me is null then raise exception 'You''re not on this firm''s team'; end if;

  select it.value into v_item from jsonb_array_elements(v_c.items) as it(value) where it.value->>'key' = p_item_key limit 1;
  if v_item is null then raise exception 'That item is no longer on the checklist'; end if;
  v_type := v_item->>'type';
  if v_type = 'rams' then raise exception 'RAMS are signed in Sign-offs'; end if;

  p_note := nullif(btrim(coalesce(p_note, '')), '');
  if v_type = 'tick' then
    v_bool := true;
  elsif v_type = 'yes_no' then
    v_text := lower(coalesce(p_value->>'answer', ''));
    if v_text not in ('yes', 'no') then raise exception 'Answer yes or no'; end if;
    if v_text = 'no' and p_note is null then raise exception 'Say why the answer is no'; end if;
    v_satisfied := v_text = 'yes';
  elsif v_type = 'number' then
    begin
      v_num := (p_value->>'number')::numeric;
    exception when others then
      raise exception 'Enter a number';
    end;
    if v_num is null then raise exception 'Enter a number'; end if;
  elsif v_type = 'photo' then
    p_photos := coalesce(p_photos, '{}');
    if cardinality(p_photos) = 0 then raise exception 'Add a photo'; end if;
    if cardinality(p_photos) > 6 then raise exception 'Six photos at most'; end if;
    foreach v_photo in array p_photos loop
      if v_photo not like auth.uid()::text || '/%' then raise exception 'Photos must be your own uploads'; end if;
    end loop;
  elsif v_type = 'signature' then
    if nullif(btrim(coalesce(p_signature, '')), '') is null then raise exception 'Add the signature'; end if;
    p_signer_name := nullif(btrim(coalesce(p_signer_name, '')), '');
    if v_item->>'signer' = 'customer' and p_signer_name is null then
      raise exception 'Add the name of the person signing';
    end if;
  end if;
  if v_type <> 'photo' then
    -- photos on other item types are allowed as extra evidence, still own uploads only
    foreach v_photo in array coalesce(p_photos, '{}') loop
      if v_photo not like auth.uid()::text || '/%' then raise exception 'Photos must be your own uploads'; end if;
    end loop;
  end if;

  v_subject := case when v_item->>'phase' = 'before' then v_me else null end;
  if v_subject is null then
    v_before_open := cardinality(public._completion_outstanding(v_c.job_id));
  end if;

  update public.employer_job_checklist_responses
     set employee_id = v_me, user_id = auth.uid(), done_by_name = v_me_name,
         satisfied = v_satisfied, value_bool = v_bool, value_number = v_num, value_text = v_text,
         photos = coalesce(p_photos, '{}'), signature_data = case when v_type = 'signature' then p_signature end,
         signer_name = case when v_type = 'signature' then coalesce(p_signer_name, v_me_name) end,
         note = p_note, lat = p_lat, lng = p_lng, accuracy_m = p_accuracy,
         location_status = case when p_location_status in ('captured', 'denied', 'unavailable') then p_location_status end,
         completed_at = v_at,
         countersigned_by = null, countersigned_by_name = null, countersigned_at = null, countersign_signature = null
   where job_checklist_id = v_c.id and item_key = p_item_key
     and subject_employee_id is not distinct from v_subject
  returning id into v_id;

  if v_id is null then
    insert into public.employer_job_checklist_responses
      (job_checklist_id, employer_id, job_id, item_key, subject_employee_id, employee_id, user_id, done_by_name,
       satisfied, value_bool, value_number, value_text, photos, signature_data, signer_name, note,
       lat, lng, accuracy_m, location_status, completed_at)
    values (v_c.id, v_c.employer_id, v_c.job_id, p_item_key, v_subject, v_me, auth.uid(), v_me_name,
            v_satisfied, v_bool, v_num, v_text, coalesce(p_photos, '{}'),
            case when v_type = 'signature' then p_signature end,
            case when v_type = 'signature' then coalesce(p_signer_name, v_me_name) end,
            p_note, p_lat, p_lng, p_accuracy,
            case when p_location_status in ('captured', 'denied', 'unavailable') then p_location_status end, v_at)
    returning id into v_id;
  end if;

  -- The last required completion check just went in: tell the office.
  if v_subject is null and v_before_open > 0 and cardinality(public._completion_outstanding(v_c.job_id)) = 0 then
    select title into v_job_title from public.employer_jobs where id = v_c.job_id;
    perform public.notify_employer_bell(
      v_c.employer_id, 'checklist_complete', 'Completion checks done',
      coalesce(v_job_title, 'A job') || ': every required completion check is in, from ' || coalesce(v_me_name, 'the crew') || '.',
      jsonb_build_object('route', '/employer?section=checklists&job=' || v_c.job_id, 'job_id', v_c.job_id));
  end if;
  return v_id;
end;
$$;

revoke all on function public.record_my_checklist_item(uuid, text, jsonb, text[], text, text, text, numeric, numeric, numeric, text, timestamptz) from public, anon;
grant execute on function public.record_my_checklist_item(uuid, text, jsonb, text[], text, text, text, numeric, numeric, numeric, text, timestamptz) to authenticated;
