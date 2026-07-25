-- ELE-226 — two more spine-driven notifications:
--   1. "your quote was viewed" (close-rate lever) — fires once when a client
--      first opens the public quote page (PublicQuoteView calls mark_quote_viewed).
--   2. invoice_due_soon registry type — the digest now nudges the day BEFORE an
--      invoice goes overdue (added in daily-notification-digest).

insert into public.notification_types (type, category, push, importance) values
  ('quote_viewed',      'invoices_quotes', true, 1),
  ('invoice_due_soon',  'invoices_quotes', true, 1)
on conflict (type) do update set category = excluded.category, push = excluded.push,
  importance = excluded.importance, updated_at = now();

alter table public.quotes add column if not exists first_viewed_at timestamptz;

-- Anon-callable (public quote page has no auth), SECURITY DEFINER so it can call
-- the locked-down notify_user. Idempotent: only the FIRST view notifies, and
-- quote ids are unguessable UUIDs so this isn't an abuse vector.
create or replace function public.mark_quote_viewed(p_quote_id uuid)
returns void language plpgsql security definer set search_path to 'public'
as $function$
declare v_user uuid; v_client text; v_total numeric; v_number text;
begin
  update public.quotes
     set first_viewed_at = now()
   where id = p_quote_id and first_viewed_at is null
  returning user_id,
    coalesce(client_data->>'name', client_data->>'full_name', client_data->>'client_name', 'A client'),
    total, quote_number
  into v_user, v_client, v_total, v_number;

  if v_user is not null then
    perform public.notify_user(
      v_user, 'quote_viewed',
      v_client || ' viewed your quote',
      'Quote ' || coalesce(v_number, '') || ' — ' || public.notif_money(v_total)
        || '. A good moment to follow up.',
      jsonb_build_object('route', '/electrician/quote-builder/' || p_quote_id::text,
        'ref_id', p_quote_id::text, 'quote_id', p_quote_id::text));
  end if;
end;
$function$;

revoke all on function public.mark_quote_viewed(uuid) from public;
grant execute on function public.mark_quote_viewed(uuid) to anon, authenticated;
