-- ELE-1949 part 3 follow-up. sign_briefing_by_token records a team member who
-- signed in as themselves as 'remote_link_signed_in' (proof of identity), but
-- the check constraint didn't allow it, so that one legitimate path failed.
alter table public.briefing_attendees drop constraint if exists briefing_attendees_signed_via_check;
alter table public.briefing_attendees add constraint briefing_attendees_signed_via_check
  check (signed_via = any (array['manual', 'qr_code', 'app', 'link', 'remote_link', 'remote_link_signed_in']));
