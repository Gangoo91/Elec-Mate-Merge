-- ELE-2022 AI v2: fixed job types, business-aware fit, photo reading, written
-- replies that learn the electrician's tone, and a version stamp on every read.

alter table public.enquiries
  add column if not exists job_key text,
  add column if not exists work_category text check (work_category in ('domestic','landlord','commercial')),
  add column if not exists not_our_work boolean not null default false,
  add column if not exists fit_note text,
  add column if not exists contact_hidden boolean not null default false,
  add column if not exists photo_findings text[] not null default '{}',
  add column if not exists photo_danger boolean not null default false,
  add column if not exists draft_reply text,
  add column if not exists sent_message text,
  add column if not exists ai_model text,
  add column if not exists prompt_version text;

comment on column public.enquiries.job_key is 'Fixed job type key (eicr, consumer_unit, ev_charger, rewire, fault, sockets_lighting, fire_alarm, heating, solar_battery, outdoor, pat, commercial, other, not_electrical). job_type holds its label.';
comment on column public.enquiries.not_our_work is 'Reader judged it not electrical, or a service the account does not offer (enquiry_inboxes.services).';
comment on column public.enquiries.fit_note is 'Plain-English reason shown on the card: "Outside your 20-mile area", "Plumbing, not electrical".';
comment on column public.enquiries.contact_hidden is 'Lead-site email says the customer''s details are hidden until the lead is accepted / bought.';
comment on column public.enquiries.photo_findings is 'What the reader could see in the customer''s photos. Only what is visible; no guesses.';
comment on column public.enquiries.draft_reply is 'Reply written by the reader for this customer and job (booking link added in the app).';
comment on column public.enquiries.sent_message is 'The message the electrician actually sent (after edits). Recent ones teach the reader their tone.';
comment on column public.enquiries.prompt_version is 'Reader prompt version that produced the fields, for evals and regressions.';

-- What the business does and how far it travels (shapes "fit")
alter table public.enquiry_inboxes
  add column if not exists services text[],
  add column if not exists travel_radius_miles integer not null default 25
    check (travel_radius_miles between 1 and 200);

comment on column public.enquiry_inboxes.services is 'Job keys this business takes on. NULL = everything electrical.';

create or replace function public.set_my_enquiry_preferences(p_services text[], p_radius integer)
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
  v_allowed text[] := array['eicr','consumer_unit','ev_charger','rewire','fault','sockets_lighting',
                            'fire_alarm','heating','solar_battery','outdoor','pat','commercial','other'];
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if p_radius is null or p_radius < 1 or p_radius > 200 then raise exception 'radius must be 1-200 miles'; end if;
  if p_services is not null and not (p_services <@ v_allowed) then raise exception 'unknown service'; end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes
     set services = p_services, travel_radius_miles = p_radius
   where user_id = v_uid
  returning * into v_row;
  return v_row;
end $$;

revoke all on function public.set_my_enquiry_preferences(text[], integer) from public, anon;
grant execute on function public.set_my_enquiry_preferences(text[], integer) to authenticated;
