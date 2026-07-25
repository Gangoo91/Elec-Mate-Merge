-- ELE-226 Phase 2 — a new quote-page lead now PUSHES the owner (was bell-only).
-- worker_notify writes employer_notifications (action_url = data.route) + team_push,
-- so the owner gets a device push the moment a lead lands on their quote page.
create or replace function public.notify_owner_new_lead()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if NEW.source = 'Quote page' then
    perform worker_notify(
      NEW.user_id,
      'new_lead',
      'New quote request',
      coalesce(nullif(trim(NEW.name), ''), 'Someone') || ' asked for a quote'
        || case when NEW.notes is not null and length(trim(NEW.notes)) > 0
                then ': ' || left(trim(NEW.notes), 120) else '' end,
      jsonb_build_object('route','/employer?section=leads','lead_id', NEW.id, 'source', NEW.source)
    );
  end if;
  return NEW;
end;
$function$;
