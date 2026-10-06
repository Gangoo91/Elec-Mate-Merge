-- ELE-1988: every employer event with a registered central type appeared TWICE
-- in the boss's bell, and the copy from employer_notifications could not be
-- tapped. notify_employer_bell wrote both employer_notifications (no action_url)
-- and, via notify_user, user_notifications (link = route); useUserNotifications
-- merges both tables into the one header bell. Seen live 6 Oct: "Timesheet
-- submitted", "Expense claim", "Job pack signed", "Snag reported" ×2 each.
--
-- Now: registered type → notify_user only (bell row with link, push, prefs,
-- dedup). Unregistered type → employer_notifications as before, but with
-- action_url filled from the route so it is tappable.
-- The only live reader of employer_notifications for employers is
-- useUserNotifications (useEmployerNotifications / notificationService are
-- not mounted anywhere).

create or replace function public.notify_employer_bell(
  p_employer uuid, p_type text, p_title text, p_message text, p_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_central text;
  v_route text := coalesce(p_meta->>'route', p_meta->>'link');
begin
  if p_employer is null then return; end if;

  if exists (select 1 from public.notification_types t where t.type = p_type) then
    v_central := p_type;
  else
    v_central := case
      when p_type like 'timesheet%' then 'timesheet'
      when p_type like 'leave%'     then 'leave'
      when p_type like 'expense%'   then 'expense'
      when p_type like 'snag%'      then 'snag'
      when p_type like 'task%'      then 'task_due'
      when p_type like 'pack%'      then 'task_due'
      else null
    end;
  end if;

  for r in
    select p_employer as uid
    union
    select a.user_id
      from public.employer_admins a
     where a.employer_id = p_employer
       and a.status = 'active'
       and a.user_id is not null
  loop
    begin
      if v_central is not null then
        perform public.notify_user(
          r.uid, v_central, p_title, p_message,
          coalesce(p_meta, '{}'::jsonb) || jsonb_build_object('source_type', p_type)
        );
      else
        insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
        values (r.uid, p_type, p_title, p_message, v_route, p_meta);
      end if;
    exception when others then
      raise warning '[notify_employer_bell] recipient % failed: %', r.uid, sqlerrm;
    end;
  end loop;
end;
$function$;
