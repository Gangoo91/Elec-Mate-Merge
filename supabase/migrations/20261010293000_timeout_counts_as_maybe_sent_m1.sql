-- M1 (review of ELE-2065 / review requests): a pg_net timeout is NOT "never
-- delivered".
--
-- Live timeout rows in net._http_response carry timed_out NULL and error_msg
-- 'Timeout of 5000 ms reached ...'. The old test
--   status_code is null and not coalesce(timed_out,false) and error_msg is not null
-- treated those as refused at the door, so the step was handed back and a
-- second chase / review email could go after the first had been sent.
--
-- Now: only a post refused at the door (401/403/404) or one that failed with
-- a non-timeout connection error counts as never delivered. Any timeout is
-- "possibly sent" and is left to the existing one-hour "Not confirmed" sweep.
--
-- Also: the sender-down signal is per firm. One firm's failed post can no
-- longer switch the old invoice_unpaid_reminder rule back on for every firm,
-- nor hand back every firm's taken-over quote follow-ups.
--
-- Additive: new helper + new one-argument overload; the existing functions
-- keep their signatures (none is called by HEAD or build 49; crons call the
-- run_* functions). No firm has chasing or review requests on today.

create or replace function public._http_never_reached(p_status int, p_timed_out boolean, p_error text)
returns boolean language sql immutable set search_path = public as $$
  select coalesce(p_status in (401, 403, 404), false)
      or (p_status is null
          and not coalesce(p_timed_out, false)
          and p_error is not null
          and p_error !~* '(timeout|timed out)')
$$;
revoke all on function public._http_never_reached(int, boolean, text) from public, anon, authenticated;

create or replace function public._firm_chase_reconcile_undelivered()
returns int language plpgsql security definer set search_path = public as $$
declare n int;
begin
  with gone as (
    select r.id, h.status_code, h.error_msg
      from public.employer_automation_runs r
      join net._http_response h
        on h.id = case when coalesce(r.detail ->> 'request_id', '') ~ '^[0-9]+$'
                       then (r.detail ->> 'request_id')::bigint end
     where r.rule_key in ('invoice_chase', 'quote_followup') and r.status = 'sending'
       and public._http_never_reached(h.status_code, h.timed_out, h.error_msg)
  )
  update public.employer_automation_runs r
     set status = 'skipped',
         ref = 'undelivered:' || r.id::text || ':' || r.ref,
         finished_at = now(),
         summary = 'Not sent yet: the chasing service did not take it. It will be tried again on the next run.',
         detail = r.detail || jsonb_build_object('undelivered', true, 'http_status', g.status_code,
                                                 'error', left(coalesce(g.error_msg, ''), 200))
    from gone g
   where r.id = g.id and r.status = 'sending';
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public._firm_chase_reconcile_undelivered() from public, anon, authenticated;

-- Per firm: the most recent answered chase post for THIS firm was refused.
create or replace function public._firm_chase_sender_down(p_firm uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((
    select coalesce((r.detail ->> 'undelivered')::boolean, false)
      from public.employer_automation_runs r
     where r.employer_id = p_firm
       and r.rule_key in ('invoice_chase', 'quote_followup')
       and r.detail ? 'request_id' and r.status <> 'sending'
     order by coalesce(r.dispatched_at, r.created_at) desc
     limit 1), false)
$$;
revoke all on function public._firm_chase_sender_down(uuid) from public, anon, authenticated;

-- run_employer_automations: the old unpaid-invoice rule looks at its own firm.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.run_employer_automations(timestamptz)'::regprocedure);
  if position('_firm_chase_sender_down(r.employer_id)' in d) > 0 then return; end if;
  n := replace(d, $a$and not public._firm_chase_sender_down())$a$,
                  $a$and not public._firm_chase_sender_down(r.employer_id))$a$);
  if n = d then raise exception 'run_employer_automations patch did not apply'; end if;
  execute n;
end
$mig$;

-- run_firm_money_chase: hand-back and take-over of quote follow-ups per firm.
-- (The one-probe-a-tick throttle stays global: it only slows posts, it never
-- sends twice.)
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.run_firm_money_chase(timestamptz)'::regprocedure);
  if position('_firm_chase_sender_down(f.employer_id)' in d) > 0 then return; end if;
  n := replace(d, $a$    if v_down then
      with back as ($a$, $a$    if public._firm_chase_sender_down(f.employer_id) then
      with back as ($a$);
  n := replace(n, $a$         and not v_down
      on conflict (quote_id) do nothing$a$, $a$         and not public._firm_chase_sender_down(f.employer_id)
      on conflict (quote_id) do nothing$a$);
  if position('_firm_chase_sender_down(f.employer_id) then' in n) = 0
     or position('not public._firm_chase_sender_down(f.employer_id)' in n) = 0 then
    raise exception 'run_firm_money_chase patch did not apply';
  end if;
  execute n;
end
$mig$;

-- run_review_requests: a timed-out post is not retried.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.run_review_requests(timestamptz)'::regprocedure);
  if position('_http_never_reached' in d) > 0 then return; end if;
  n := replace(d,
    $a$and (h.status_code in (401, 403, 404)
            or (h.status_code is null and not coalesce(h.timed_out, false) and h.error_msg is not null))$a$,
    $a$and public._http_never_reached(h.status_code, h.timed_out, h.error_msg)$a$);
  if n = d then raise exception 'run_review_requests patch did not apply'; end if;
  execute n;
end
$mig$;
