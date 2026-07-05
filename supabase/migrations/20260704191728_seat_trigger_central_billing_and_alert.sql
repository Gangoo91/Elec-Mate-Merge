-- Centralise the seat trigger as the single source of truth for
-- "a seat's active count changed" → resync Stripe (manage-employer-seats) and,
-- on a JOIN, fire the founder alert (notify-team-join). Previously these fired
-- only from app code / the UPDATE-link branch, so a pool-hire (INSERT with
-- user_id already set) billed no seat and sent no alert, and the existing-user
-- accept path (RPC) billed no seat. Both are covered now. All external calls are
-- exception-wrapped so a notification/billing hiccup never blocks the DML, and
-- both target functions stay behind their own kill-switches (inert pre-launch).
CREATE OR REPLACE FUNCTION public.tg_employer_employee_seat()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_service_key text;
  v_joined boolean := false;         -- a worker just JOINED → founder alert
  v_billing_dirty boolean := false;  -- active seat count changed → resync Stripe
begin
  if tg_op = 'INSERT' then
    if new.employer_id is not null then
      insert into employer_seats (employer_id, employee_id, user_id, status, created_at)
      values (new.employer_id, new.id, new.user_id,
              case when new.user_id is not null then 'active' else 'pending' end, now());
      -- A row inserted already-linked (e.g. a pool-hire) activates immediately.
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

    -- Archive: revoke the seat and resync so the employer stops being billed.
    if lower(coalesce(new.status,'')) = 'archived'
       and lower(coalesce(old.status,'')) <> 'archived' then
      update employer_seats set status = 'revoked', revoked_at = now()
       where employee_id = new.id and status in ('pending','active');
      update employer_team_invites set status = 'revoked'
       where employee_id = new.id and status = 'pending';
      v_billing_dirty := true;
    end if;
  end if;

  -- Side effects: resync the Stripe seat quantity and/or alert the founder.
  -- One vault lookup, each call independently guarded.
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
            body := jsonb_build_object('employer_id', new.employer_id)
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
