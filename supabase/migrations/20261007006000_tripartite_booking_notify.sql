-- The apprentice hears when a progress review is booked or moved, so they
-- can add their view and know when to be there (ELE-1880).
create or replace function public.tg_tripartite_notify_booking()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_user uuid;
begin
  if new.scheduled_at is null or new.status = 'cancelled' or new.locked_at is not null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.scheduled_at is not distinct from old.scheduled_at then
    return new;
  end if;
  select user_id into v_user from college_students where id = new.student_id;
  if v_user is null then return new; end if;
  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (v_user, 'tripartite_booked',
            case when tg_op = 'INSERT' then 'Progress review booked' else 'Progress review moved' end,
            to_char(new.scheduled_at at time zone 'Europe/London', 'Dy DD Mon, HH24:MI')
              || ' with your tutor and employer. Add your view before you meet.',
            '/apprentice/college-plan', jsonb_build_object('review_id', new.id));
  exception when others then null;
  end;
  return new;
end; $$;
drop trigger if exists trg_tripartite_notify_booking on public.college_tripartite_reviews;
create trigger trg_tripartite_notify_booking after insert or update of scheduled_at on public.college_tripartite_reviews
  for each row execute function public.tg_tripartite_notify_booking();
