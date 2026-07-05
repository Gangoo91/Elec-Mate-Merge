-- Fire the founder alert (notify-team-join) on EVERY seat activation, not just
-- the new-user accept path. Vault-authed pg_net, exception-guarded so a
-- notification failure never blocks the join.
create or replace function public.tg_employer_employee_seat()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_service_key text;
begin
  if tg_op = 'INSERT' then
    if new.employer_id is not null then
      insert into employer_seats (employer_id, employee_id, user_id, status, created_at)
      values (new.employer_id, new.id, new.user_id,
              case when new.user_id is not null then 'active' else 'pending' end, now());
    end if;
    return new;
  end if;

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

    -- Founder alert: a worker just joined → a seat activated (any path).
    begin
      select decrypted_secret into v_service_key
        from vault.decrypted_secrets where name = 'service_role_key' limit 1;
      if v_service_key is not null then
        perform net.http_post(
          url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/notify-team-join',
          headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_service_key),
          body := jsonb_build_object('employer_id', new.employer_id, 'person_name', new.name)
        );
      end if;
    exception when others then
      -- never let a notification failure block the join
      null;
    end;
  end if;

  if lower(coalesce(new.status,'')) = 'archived'
     and lower(coalesce(old.status,'')) <> 'archived' then
    update employer_seats set status = 'revoked', revoked_at = now()
     where employee_id = new.id and status in ('pending','active');
    update employer_team_invites set status = 'revoked'
     where employee_id = new.id and status = 'pending';
  end if;

  return new;
end;
$$;
