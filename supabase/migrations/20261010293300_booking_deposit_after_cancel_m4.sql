-- M4 (review of ELE-2079): a booking deposit could be paid after the booking
-- was released or declined.
--
-- _expire_online_bookings and decide_online_booking set the deposit invoice
-- to 'cancelled', but the Stripe Checkout session made for it stays open for
-- 24 hours, and stripe-connect-webhook marked the invoice paid on
-- checkout.session.completed without looking at its status.
--
-- Three parts:
--  1. _expire_invoice_checkout(invoice): posts to the new edge function
--     invoice-checkout-expire, which expires the session stored on the
--     invoice (stripe_checkout_session_id, already written by
--     create-invoice-payment-link) and any other open session for the invoice.
--     Called by both booking functions straight after they cancel a deposit.
--     If the function is not deployed yet the post just 404s; part 3 still
--     stops the money being booked as paid.
--  2. A record of money taken on a cancelled invoice
--     (invoice_payments_after_cancel), written by record_payment_after_cancel,
--     which the webhook calls instead of marking a cancelled invoice paid. It
--     alerts the owner (bell + push) that the payment needs refunding.
--  3. stripe-connect-webhook (edge function, deployed separately) checks the
--     invoice status first.
--
-- Additive: one new table (RLS on, owner/admin money readers only), new
-- functions, one notification type, and two functions patched in place by
-- exact text replacement (signatures unchanged; HEAD calls
-- decide_online_booking from useSmartScheduling.ts with the same arguments).

insert into public.notification_types (type, category, push, importance)
values ('payment_after_cancel', 'invoices_quotes', true, 2)
on conflict (type) do nothing;

create table if not exists public.invoice_payments_after_cancel (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  invoice_id uuid not null,
  invoice_table text not null check (invoice_table in ('invoices', 'quotes')),
  invoice_number text,
  invoice_status text,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  amount numeric(12, 2),
  booking_id uuid,
  refunded_at timestamptz,
  refund_note text,
  created_at timestamptz not null default now()
);
create index if not exists invoice_payments_after_cancel_owner_idx
  on public.invoice_payments_after_cancel (owner_id, created_at desc);
alter table public.invoice_payments_after_cancel enable row level security;
create policy "Money readers see payments taken on cancelled invoices"
  on public.invoice_payments_after_cancel for select to authenticated
  using (owner_id = auth.uid() or public.can_see_firm_money(owner_id));
comment on table public.invoice_payments_after_cancel is
  '[EMPLOYER HUB] Card payments that arrived on an invoice already cancelled (e.g. a released or declined online booking deposit), so they can be refunded (M4, ELE-2079). Scope: owner_id = the invoice owner. Used by: stripe-connect-webhook via record_payment_after_cancel. Rule: written only by the webhook; the invoice is never marked paid; owner/admin money readers only.';

create or replace function public.record_payment_after_cancel(
  p_invoice uuid, p_session text, p_payment_intent text, p_amount numeric)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_table text;
  v_num text;
  v_status text;
  v_booking uuid;
  v_id uuid;
  v_amt text := '£' || to_char(coalesce(p_amount, 0), 'FM999,999,990.00');
  v_route text;
begin
  select i.user_id, 'invoices', i.invoice_number, i.status into v_owner, v_table, v_num, v_status
    from public.invoices i where i.id = p_invoice;
  if v_owner is null then
    select q.user_id, 'quotes', q.invoice_number, q.invoice_status into v_owner, v_table, v_num, v_status
      from public.quotes q where q.id = p_invoice;
  end if;
  if v_owner is null or coalesce(p_session, '') = '' then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;
  select b.id into v_booking from public.employer_online_bookings b
   where b.deposit_invoice_id = p_invoice order by b.created_at desc limit 1;

  insert into public.invoice_payments_after_cancel
    (owner_id, invoice_id, invoice_table, invoice_number, invoice_status, stripe_session_id,
     stripe_payment_intent_id, amount, booking_id)
  values (v_owner, p_invoice, v_table, v_num, v_status, p_session, nullif(p_payment_intent, ''),
          round(coalesce(p_amount, 0), 2), v_booking)
  on conflict (stripe_session_id) do nothing
  returning id into v_id;
  -- A webhook retry: already recorded and alerted.
  if v_id is null then return jsonb_build_object('ok', true, 'duplicate', true); end if;

  if public.is_employer_account(v_owner) then
    v_route := case when v_booking is not null then '/employer?section=diary&booking=' || v_booking
                    else '/employer?section=quotes&invoice=' || p_invoice end;
    perform public.notify_employer_bell(v_owner, 'payment_after_cancel',
      'Refund needed: ' || v_amt || ' paid on a cancelled invoice',
      'The customer paid ' || coalesce(v_num, 'the invoice') || ' by card after it was cancelled'
        || case when v_booking is not null then ' (the online booking was released or declined)' else '' end
        || '. It has not been marked paid. Refund it from your Stripe dashboard.',
      jsonb_build_object('invoice_id', p_invoice, 'booking_id', v_booking, 'route', v_route));
  else
    perform public.notify_user(v_owner, 'payment_after_cancel',
      'Refund needed: ' || v_amt || ' paid on a cancelled invoice',
      'The customer paid ' || coalesce(v_num, 'the invoice') || ' by card after it was cancelled. '
        || 'It has not been marked paid. Refund it from your Stripe dashboard.',
      jsonb_build_object('invoice_id', p_invoice, 'route', '/electrician/invoices/' || p_invoice));
  end if;
  return jsonb_build_object('ok', true, 'id', v_id);
end $$;
revoke all on function public.record_payment_after_cancel(uuid, text, text, numeric) from public, anon, authenticated;
grant execute on function public.record_payment_after_cancel(uuid, text, text, numeric) to service_role;

create or replace function public._expire_invoice_checkout(p_invoice uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_key text;
begin
  if p_invoice is null then return; end if;
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if v_key is null then return; end if;
  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/invoice-checkout-expire',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
    body := jsonb_build_object('invoiceId', p_invoice));
exception when others then
  raise warning '[_expire_invoice_checkout] %: %', p_invoice, sqlerrm;
end $$;
revoke all on function public._expire_invoice_checkout(uuid) from public, anon, authenticated;

-- Both booking paths expire the checkout once they cancel the deposit.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public._expire_online_bookings(uuid)'::regprocedure);
  if position('_expire_invoice_checkout' in d) = 0 then
    n := replace(d,
$a$    update public.invoices set status = 'cancelled', updated_at = now()
     where id = r.deposit_invoice_id and paid_at is null and coalesce(status, '') <> 'paid';
$a$,
$a$    update public.invoices set status = 'cancelled', updated_at = now()
     where id = r.deposit_invoice_id and paid_at is null and coalesce(status, '') <> 'paid';
    if found then perform public._expire_invoice_checkout(r.deposit_invoice_id); end if;
$a$);
    if n = d then raise exception '_expire_online_bookings patch did not apply'; end if;
    execute n;
  end if;

  d := pg_get_functiondef('public.decide_online_booking(uuid,text,uuid,date,text,text)'::regprocedure);
  if position('_expire_invoice_checkout' in d) = 0 then
    n := replace(d,
$a$      v_dep_cancelled := found;
$a$,
$a$      v_dep_cancelled := found;
      if v_dep_cancelled then perform public._expire_invoice_checkout(b.deposit_invoice_id); end if;
$a$);
    if n = d then raise exception 'decide_online_booking patch did not apply'; end if;
    execute n;
  end if;
end
$mig$;
