-- Part P tracker — reconcile the open rows against their certificates (ELE-1715).
--
-- Dry run 29 Sep 2026 (187 open rows): 15 whose certificate has been deleted,
-- 10 whose certificate already records the notification as made, 49 whose
-- certificate says "not notifiable" (35 users, most already chased with an
-- OVERDUE email). 21 rows whose certificate never answered stay open and get
-- the "was this notifiable?" prompt in the app; 92 stay open as genuinely
-- notifiable. Certificates themselves are not touched here.

-- Certificate gone → nothing to submit.
update public.part_p_notifications p
   set notification_status = 'cancelled',
       updated_at = now()
 where p.notification_status in ('pending','in-progress','overdue')
   and not exists (
     select 1 from public.reports r
      where r.report_id = p.report_id and r.deleted_at is null
   );

-- Certificate says it was notified → submitted, dated from the certificate.
update public.part_p_notifications p
   set notification_status = 'submitted',
       submitted_at = coalesce(p.submitted_at, r.pdf_generated_at, r.updated_at, now()),
       local_authority_submitted = p.local_authority_submitted
         or coalesce(r.data->'buildingRegsSubmitted' = 'true'::jsonb, false),
       updated_at = now()
  from public.reports r
 where r.report_id = p.report_id
   and r.deleted_at is null
   and p.notification_status in ('pending','in-progress','overdue')
   and public.part_p_certificate_notified(r.data);

-- Certificate says not notifiable → not required.
update public.part_p_notifications p
   set notification_status = 'not_required',
       updated_at = now()
  from public.reports r
 where r.report_id = p.report_id
   and r.deleted_at is null
   and p.notification_status in ('pending','in-progress','overdue')
   and public.part_p_certificate_verdict(r.report_type, r.data) = 'no';

-- ── Reminder candidates ───────────────────────────────────────────────────
-- One row per open notification with what its certificate says, so the daily
-- reminder can ask "was this notifiable?" instead of shouting OVERDUE at a
-- row the certificate never confirmed.
create or replace function public.part_p_reminder_candidates()
returns table (
  id uuid,
  user_id uuid,
  report_id text,
  submission_deadline date,
  reminders_sent text[],
  notification_status text,
  verdict text,
  client_name text,
  installation_address text,
  certificate_number text
)
language sql
security definer
set search_path to 'public'
stable
as $$
  select p.id, p.user_id, p.report_id, p.submission_deadline, p.reminders_sent, p.notification_status,
         public.part_p_certificate_verdict(r.report_type, r.data) as verdict,
         r.client_name, r.installation_address, r.certificate_number
    from public.part_p_notifications p
    join public.reports r on r.report_id = p.report_id and r.deleted_at is null
   where p.notification_status in ('pending','in-progress','overdue')
     and p.submission_deadline is not null
     and not public.part_p_certificate_notified(r.data);
$$;

revoke all on function public.part_p_reminder_candidates() from public, anon, authenticated;
