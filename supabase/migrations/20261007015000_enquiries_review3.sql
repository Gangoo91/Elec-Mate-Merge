-- ELE-2022 review 3: an empty "work you take on" list means everything, not nothing
-- (an empty array made every enquiry "isn't on your list" and silenced all pushes).
create or replace function public.set_my_enquiry_preferences(p_services text[], p_radius integer)
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
  v_allowed text[] := array['eicr','consumer_unit','ev_charger','rewire','fault','sockets_lighting',
                            'fire_alarm','heating','solar_battery','outdoor','pat','commercial','other'];
  v_services text[] := case when p_services is null or cardinality(p_services) = 0 then null else p_services end;
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if p_radius is null or p_radius < 1 or p_radius > 200 then raise exception 'radius must be 1-200 miles'; end if;
  if v_services is not null and not (v_services <@ v_allowed) then raise exception 'unknown service'; end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes
     set services = v_services, travel_radius_miles = p_radius
   where user_id = v_uid
  returning * into v_row;
  return v_row;
end $$;
update public.enquiry_inboxes set services = null where services is not null and cardinality(services) = 0;
