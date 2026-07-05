-- When an employer DOWNGRADES (employer tier -> non-employer) or is newly COMPED,
-- clean up seats so they stop being charged £9.99/seat on a lingering sub.
--  - downgrade: revoke the seat rows (they no longer have a team plan)
--  - both cases: call manage-employer-seats → removes the Stripe seat items
--    (the fn now targets quantity 0 for comped / non-employer)
-- Vault-authed pg_net, exception-guarded. Rollback: drop trigger + fn.
create or replace function public.tg_employer_tier_seat_cleanup()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_service_key text;
  v_downgraded boolean;
  v_newly_comped boolean;
begin
  v_downgraded := lower(coalesce(old.subscription_tier,'')) like 'employer%'
              and lower(coalesce(new.subscription_tier,'')) not like 'employer%';
  v_newly_comped := coalesce(old.free_access_granted,false) = false
                and coalesce(new.free_access_granted,false) = true;

  if not (v_downgraded or v_newly_comped) then
    return new;
  end if;

  -- Downgrade → the seats are no longer valid; revoke the rows.
  if v_downgraded then
    update employer_seats set status = 'revoked', revoked_at = now()
     where employer_id = new.id and status in ('active','pending');
  end if;

  -- Sync Stripe (removes the £9.99 seat items). Non-fatal.
  begin
    select decrypted_secret into v_service_key
      from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    if v_service_key is not null then
      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/manage-employer-seats',
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
        body := jsonb_build_object('employer_id', new.id)
      );
    end if;
  exception when others then
    null;
  end;

  return new;
end;
$$;

drop trigger if exists trg_employer_tier_seat_cleanup on public.profiles;
create trigger trg_employer_tier_seat_cleanup
  after update of subscription_tier, free_access_granted on public.profiles
  for each row execute function public.tg_employer_tier_seat_cleanup();
