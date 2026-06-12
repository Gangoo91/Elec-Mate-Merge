-- ============================================================================
-- Slice 3b — make the safeguarding escalation sweep key off ACKNOWLEDGEMENT.
--
-- The existing safeguarding-reescalation cron escalated on action_completed_at
-- (unactioned). Now that a DSL can ACKNOWLEDGE a concern (3a), the auto-escalation
-- chain should halt the moment a designated lead has taken ownership — escalating
-- a promptly-acknowledged-but-still-being-worked case to leadership at 24h is
-- wrong. The silent-loss guarantee is about a concern going UNSEEN, so gate on
-- acknowledged_at (and skip closed concerns). Pure SQL, no net.http_post.
--
-- Rollback: re-create the job with the action_completed_at gate.
-- ============================================================================

select cron.unschedule('safeguarding-reescalation');

select cron.schedule(
  'safeguarding-reescalation',
  '0 * * * *',
  $cron$
  -- Tier 1 (4h unacknowledged): re-alert designated leads to review/acknowledge.
  insert into push_notification_log (user_id, type, reference_id, title, body)
  select distinct s.user_id,
         'safeguarding_escalation',
         pn.id::text,
         'Safeguarding — not yet acknowledged',
         'A safeguarding concern logged 4+ hours ago has not been acknowledged. Please review and acknowledge it now.'
  from pastoral_notes pn
  join college_staff s
    on s.college_id = pn.college_id
   and (s.is_dsl is true or s.is_deputy_dsl is true)
   and s.user_id is not null
  where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
    and pn.acknowledged_at is null
    and pn.action_completed_at is null
    and pn.created_at < now() - interval '4 hours'
    and not exists (
      select 1 from push_notification_log l
      where l.reference_id = pn.id::text and l.type = 'safeguarding_escalation'
    );

  -- Tier 2 (24h unacknowledged): escalate to college leadership.
  insert into push_notification_log (user_id, type, reference_id, title, body)
  select distinct s.user_id,
         'safeguarding_escalation_24h',
         pn.id::text,
         'Safeguarding — escalated (24h+)',
         'A safeguarding concern has been unacknowledged for 24+ hours and is now escalated to college leadership. Immediate review required.'
  from pastoral_notes pn
  join college_staff s
    on s.college_id = pn.college_id
   and (s.is_dsl is true or s.is_deputy_dsl is true or s.role in ('admin', 'head_of_department'))
   and s.user_id is not null
  where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
    and pn.acknowledged_at is null
    and pn.action_completed_at is null
    and pn.created_at < now() - interval '24 hours'
    and not exists (
      select 1 from push_notification_log l
      where l.reference_id = pn.id::text and l.type = 'safeguarding_escalation_24h'
    );
  $cron$
);
