-- Self-healing user attribution for Play Store cancel reasons.
--
-- WHY: play-rtdn-cancel-survey resolves the user by looking for a PLAY_STORE
-- cancellation in billing_events within ±45 min of the notification. That row
-- is written by RevenueCat's webhook, and Pub/Sub delivers to RevenueCat and
-- to us simultaneously — our path is much shorter, so we routinely arrive
-- first. The function retries for ~28s (bounded by the Pub/Sub ack deadline)
-- and then gives up. In practice it lost every single one: all 5 rows written
-- between 23 Aug and 7 Sep 2026 were `unmatched`, and 3 of them had exactly
-- one obvious candidate by the time anyone looked.
--
-- An unmatched row is not just untidy — it is a churned payer we cannot
-- win back, because we do not know who they are.
--
-- Rather than lengthen a retry that cannot outlast the ack deadline, the match
-- is retried out of band, where there is no deadline at all.
create or replace function public.resolve_unmatched_store_cancel_reasons()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  matched integer := 0;
begin
  with candidates as (
    select
      s.id,
      (
        select array_agg(distinct b.user_id)
          from billing_events b
         where b.store = 'PLAY_STORE'
           and b.event_type in ('CANCELLATION', 'EXPIRATION')
           and b.user_id is not null
           and b.created_at between s.cancelled_at - interval '45 min'
                               and s.cancelled_at + interval '45 min'
      ) as users
    from store_cancel_reasons s
    where s.user_id is null
  )
  update store_cancel_reasons s
     set user_id      = c.users[1],
         -- Named distinctly from the edge function's own 'time_window' so the
         -- digest can tell a live match from one recovered afterwards.
         match_method = 'time_window_backfill'
    from candidates c
   where c.id = s.id
     -- Exactly one plausible person. Two or more is a guess, and a wrong
     -- attribution is worse than none: it points a win-back at the wrong
     -- customer and corrupts the churn digest.
     and array_length(c.users, 1) = 1;

  get diagnostics matched = row_count;
  return matched;
end;
$$;

comment on function public.resolve_unmatched_store_cancel_reasons is
  'Retries user attribution for Play cancel-survey rows the RTDN handler could not match in time. Only matches when exactly one candidate exists. Returns the number of rows resolved.';
