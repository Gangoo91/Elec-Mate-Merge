-- ELE-226 Phase 2 — quote accepted / invoice paid now go through notify_user:
-- ONE bell + ONE push, deduped by (user, type, ref_id) per day. The DB trigger
-- is the single source of truth (fires on accepted_at / paid_at from ANY path —
-- public accept link or manual mark-accepted), adds the in-app bell (was
-- push-only), and — with accept-quote-public no longer notifying — removes the
-- double-push. The old trigger-transactional-push edge fn + its pg_net helper
-- call_transactional_push_trigger are deleted/dropped as orphans.

create or replace function public.trigger_quote_signed_push()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare client_name_val text; amount_val text;
begin
  if NEW.accepted_at is not null and OLD.accepted_at is null and NEW.user_id is not null then
    begin
      client_name_val := coalesce(NEW.client_data->>'name', NEW.client_data->>'full_name',
        NEW.client_data->>'client_name', 'Your client');
    exception when others then client_name_val := 'Your client'; end;
    begin amount_val := public.notif_money(NEW.total); exception when others then amount_val := ''; end;

    perform public.notify_user(
      NEW.user_id, 'quote_accepted',
      client_name_val || ' accepted your quote',
      case when amount_val <> '' then amount_val || '. ' else '' end || 'Tap to raise the invoice.',
      jsonb_build_object('ref_id', NEW.id::text,
        'route', '/electrician/quote-builder/' || NEW.id::text, 'quote_id', NEW.id::text));
  end if;
  return NEW;
end;
$function$;

create or replace function public.trigger_invoice_paid_push()
returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare client_name_val text; amount_val text;
begin
  if NEW.paid_at is not null and (OLD.paid_at is null or OLD.paid_at <> NEW.paid_at)
     and NEW.user_id is not null then
    begin
      client_name_val := coalesce(NEW.client_data->>'name', NEW.client_data->>'full_name',
        NEW.client_data->>'client_name', 'Your client');
    exception when others then client_name_val := 'Your client'; end;
    begin amount_val := public.notif_money(coalesce(NEW.total_paid, NEW.total)); exception when others then amount_val := ''; end;

    perform public.notify_user(
      NEW.user_id, 'invoice_paid',
      client_name_val || ' has paid',
      case when amount_val <> '' then amount_val || ' cleared. ' else 'Payment cleared. ' end || 'Tap to view.',
      jsonb_build_object('ref_id', NEW.id::text,
        'route', '/electrician/invoices/' || NEW.id::text, 'invoice_id', NEW.id::text));
  end if;
  return NEW;
end;
$function$;

drop function if exists public.call_transactional_push_trigger(uuid, text, jsonb);
