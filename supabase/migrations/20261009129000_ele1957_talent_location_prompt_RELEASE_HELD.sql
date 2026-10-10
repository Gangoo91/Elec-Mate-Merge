-- RELEASE-HELD (ELE-1957). Apply only AFTER the release that ships the
-- "Where you're based" field in Elec-ID → Let firms find me
-- (TalentPoolOptIn.tsx). The bell links to /settings?tab=elec-id&talent=location,
-- which the app on HEAD does not understand, so this must not run before it.
--
-- One in-app bell (user_notifications, no email and no push) for every
-- talent pool member who is listed but has not set a base location, so firms
-- searching "within 20 miles" can find them. Once only per person: a member
-- who already has this prompt is skipped. set_my_talent_location() marks it
-- read when they add a location.

insert into public.user_notifications (user_id, type, title, message, link, metadata)
select distinct e.user_id,
       'talent_location_prompt',
       'Add where you''re based',
       'Firms hiring near you can only find you if they know your area. Add a postcode district or town and how far you travel.',
       '/settings?tab=elec-id&talent=location',
       jsonb_build_object('source', 'ELE-1957')
  from public.employer_elec_id_profiles p
  join public.employer_employees e on e.id = p.employee_id
 where e.user_id is not null
   and coalesce(p.opt_out, false) = false
   and p.available_for_hire = true
   and p.available_for_hire_opted_in_at is not null
   and p.profile_visibility in ('public', 'employers_only')
   and p.base_outcode is null
   and not exists (
     select 1 from public.user_notifications n
      where n.user_id = e.user_id and n.type = 'talent_location_prompt');
