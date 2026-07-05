-- Symmetric to a worker leaving: when an employer DOWNGRADES, the workers lose
-- their seat coverage — so reinstate any personal sub we parked (cancel_at_
-- period_end) on their behalf, exactly like the archive/leave path. Capture the
-- covered workers before revoking, then hand each to manage-employer-seats via
-- left_worker_id (it only un-cancels a sub WE tagged, and only if they hold no
-- active seat anywhere). Gated by WORKER_SEAT_REPLACES_SUB in the fn → inert
-- pre-launch. All pg_net exception-guarded.
CREATE OR REPLACE FUNCTION public.tg_employer_tier_seat_cleanup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_service_key text;
  v_downgraded boolean;
  v_newly_comped boolean;
  v_workers uuid[];
  v_w uuid;
begin
  v_downgraded := lower(coalesce(old.subscription_tier,'')) like 'employer%'
              and lower(coalesce(new.subscription_tier,'')) not like 'employer%';
  v_newly_comped := coalesce(old.free_access_granted,false) = false
                and coalesce(new.free_access_granted,false) = true;

  if not (v_downgraded or v_newly_comped) then
    return new;
  end if;

  -- Downgrade → seats no longer valid. Capture the covered workers BEFORE
  -- revoking so we can reinstate any personal sub we parked for them.
  if v_downgraded then
    select array_agg(distinct user_id) into v_workers
      from employer_seats
     where employer_id = new.id and status in ('active','pending') and user_id is not null;

    update employer_seats set status = 'revoked', revoked_at = now()
     where employer_id = new.id and status in ('active','pending');
  end if;

  -- Sync Stripe (removes the £9.99 seat items) + reinstate workers' parked subs.
  begin
    select decrypted_secret into v_service_key
      from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    if v_service_key is not null then
      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/manage-employer-seats',
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
        body := jsonb_build_object('employer_id', new.id)
      );
      -- Losing the team plan shouldn't silently lapse a sub we cancelled for them.
      if v_workers is not null then
        foreach v_w in array v_workers loop
          perform net.http_post(
            url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/manage-employer-seats',
            headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
            body := jsonb_build_object('employer_id', new.id, 'left_worker_id', v_w)
          );
        end loop;
      end if;
    end if;
  exception when others then
    null;
  end;

  return new;
end;
$function$;
