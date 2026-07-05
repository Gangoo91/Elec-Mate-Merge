-- Make seat activation collision-safe against the unique (employer_id,user_id):
-- if the person was seated before (revoked), reuse that seat row on re-hire.
create or replace function public.tg_employer_employee_seat()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
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
      -- re-hire: reactivate the existing seat, drop the redundant pending placeholder
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
