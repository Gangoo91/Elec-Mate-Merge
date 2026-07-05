-- Seat-activation trigger — single source of truth for seat billing + alerts.
--
-- Fires on employer_employees INSERT/UPDATE and, via vault-authed pg_net,
-- resyncs the employer's Stripe seat quantity (manage-employer-seats) and, on a
-- genuine JOIN, the founder alert (notify-team-join). It also drives the
-- "worker seat replaces the worker's own sub" flow by handing the worker id to
-- manage-employer-seats: joined_worker_id on JOIN (retire their personal sub,
-- cancel_at_period_end) and left_worker_id on LEAVE (reinstate a sub we parked,
-- so leaving never silently drops their access). Both remote fns stay behind
-- their own kill-switches (EMPLOYER_SEAT_PRICE_ID / WORKER_SEAT_REPLACES_SUB),
-- so this is inert until launch. All external calls are exception-wrapped so a
-- notification/billing hiccup never blocks the DML.
--
-- NOTE: applied to prod via MCP as three incremental CREATE OR REPLACE steps
-- (20260704191728 central, 20260704193203 joined_worker_id, this one adds
-- left_worker_id). This file captures the resulting authoritative final state.
CREATE OR REPLACE FUNCTION public.tg_employer_employee_seat()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_service_key text;
  v_joined boolean := false;         -- a worker JOINED → alert + retire their sub
  v_left boolean := false;           -- a worker LEFT → reinstate their parked sub
  v_billing_dirty boolean := false;  -- active seat count changed → resync Stripe
begin
  if tg_op = 'INSERT' then
    if new.employer_id is not null then
      insert into employer_seats (employer_id, employee_id, user_id, status, created_at)
      values (new.employer_id, new.id, new.user_id,
              case when new.user_id is not null then 'active' else 'pending' end, now());
      if new.user_id is not null then
        v_joined := true;
        v_billing_dirty := true;
      end if;
    end if;

  else  -- UPDATE
    -- Link: a pending seat becomes active when the worker's user_id is set.
    if old.user_id is null and new.user_id is not null then
      if exists (select 1 from employer_seats
                  where employer_id = new.employer_id and user_id = new.user_id) then
        update employer_seats
           set status = 'active', revoked_at = null, employee_id = new.id
         where employer_id = new.employer_id and user_id = new.user_id;
        delete from employer_seats
         where employee_id = new.id and user_id is null and status = 'pending';
      else
        update employer_seats
           set status = 'active', user_id = new.user_id
         where employee_id = new.id and status = 'pending';
      end if;
      update employer_team_invites
         set status = 'accepted', accepted_at = now(), accepted_by = new.user_id
       where employee_id = new.id and status = 'pending';
      v_joined := true;
      v_billing_dirty := true;
    end if;

    -- Archive: revoke the seat, resync billing down, and reinstate the worker's
    -- own sub (if we parked it) so leaving never silently drops their access.
    if lower(coalesce(new.status,'')) = 'archived'
       and lower(coalesce(old.status,'')) <> 'archived' then
      update employer_seats set status = 'revoked', revoked_at = now()
       where employee_id = new.id and status in ('pending','active');
      update employer_team_invites set status = 'revoked'
       where employee_id = new.id and status = 'pending';
      v_billing_dirty := true;
      if new.user_id is not null then
        v_left := true;
      end if;
    end if;
  end if;

  -- Side effects: resync the Stripe seat quantity and/or alert the founder.
  if v_billing_dirty or v_joined then
    begin
      select decrypted_secret into v_service_key
        from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    exception when others then
      v_service_key := null;
    end;

    if v_service_key is not null then
      if v_billing_dirty then
        begin
          perform net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/manage-employer-seats',
            headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
            -- Hand over the worker so their own sub is retired (join) or
            -- reinstated (leave). Plain qty sync when neither flag is set.
            body := jsonb_build_object('employer_id', new.employer_id)
                    || case when v_joined then jsonb_build_object('joined_worker_id', new.user_id) else '{}'::jsonb end
                    || case when v_left then jsonb_build_object('left_worker_id', new.user_id) else '{}'::jsonb end
          );
        exception when others then null;
        end;
      end if;

      if v_joined then
        begin
          perform net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/notify-team-join',
            headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
            body := jsonb_build_object('employer_id', new.employer_id, 'person_name', new.name)
          );
        exception when others then null;
        end;
      end if;
    end if;
  end if;

  return new;
end;
$function$;
