-- AM2 (6 Oct 2026): the learner's booked AM2 date, on their account.
--
-- It lived only in one device's localStorage (`am2-target-date-<uid>`), so a
-- date set on a phone was missing on the college PC, and the tutor never saw
-- it. A plain date column on profiles: the learner updates it through the
-- existing "Users can update own profile" policy; staff read it through the
-- existing profile read policy. Additive and nullable — nothing else changes.

alter table public.profiles
  add column if not exists am2_exam_date date;

comment on column public.profiles.am2_exam_date is
  'The date the learner''s AM2 is booked for (set in the AM2 simulator). Null = not set.';
