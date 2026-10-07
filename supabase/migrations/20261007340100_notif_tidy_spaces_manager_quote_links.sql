-- Follow-up to 20261007340000 (found by the rolled-back producer test):
--  * client names stored with a trailing space gave "Andrew Moore  viewed your
--    quote". The tidy rule now also collapses runs of spaces and trims.
--  * notify_company sends quote/invoice events to the owner AND managers with
--    the owner's sole-trader link (/electrician/quote-builder/<id>). A manager
--    works in the Employer Hub, so their copy opens the quote there instead.

create or replace function public._notif_tidy(p text)
returns text
language sql
immutable
set search_path to ''
as $function$
  -- Capital first letter (after any leading quote or bracket), no em dashes
  -- (" — " reads as a comma, a bare "—" as a hyphen), single spaces, trimmed.
  select public._notif_cap(btrim(regexp_replace(
           replace(replace(p, ' — ', ', '), '—', '-'), ' {2,}', ' ', 'g')))
$function$;

do $$
declare
  d text := pg_get_functiondef('public.notify_company(uuid,text,text,text,jsonb)'::regprocedure);
  old text := $q$      perform public.notify_user(r.uid, p_type, public._notif_tidy(p_title),
                                 public._notif_tidy(p_message), p_data);$q$;
  new text := $q$      perform public.notify_user(r.uid, p_type, public._notif_tidy(p_title),
                                 public._notif_tidy(p_message),
        case
          -- Managers open money/quote events in the Employer Hub, not the
          -- owner's sole-trader pages.
          when r.uid is distinct from p_owner and (p_data->>'quote_id') is not null
            then p_data || jsonb_build_object('route', '/employer?section=quotes&quote=' || (p_data->>'quote_id'))
          when r.uid is distinct from p_owner and (p_type like 'invoice%' or p_type like 'payment%')
            then p_data || jsonb_build_object('route', '/employer?section=quotes&tab=invoices')
          else p_data
        end);$q$;
begin
  if position(old in d) = 0 then
    raise exception 'notify_company: expected text not found';
  end if;
  execute replace(d, old, new);
end $$;
