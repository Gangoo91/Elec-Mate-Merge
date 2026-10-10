-- ELE-2065 / gap #1: "Convert to invoice" in the Employer Hub never closed the
-- quote, and never took a paid deposit off the invoice.
--
-- The Hub raises a NEW `quotes` row (invoice_raised) for the invoice and then
-- tried to set the source quote's status to 'Converted', which isn't a status
-- the row can hold: the update threw, the error was only logged, and the quote
-- stayed in the convert list, so it could be invoiced twice. The Electrical Hub
-- converts the quote row in place (invoice_raised on the same row), so it never
-- had the problem.
--
-- Now (additive; no columns, no policies, no signature changes):
--   * _apply_quote_to_invoice(quote, invoice) links the two both ways in
--     settings (invoice.settings.fromQuoteId, quote.settings.convertedInvoiceId
--     / convertedInvoiceNumber / convertedAt), refuses a second invoice for
--     the same quote, and credits a PAID deposit exactly as ELE-1760 does in
--     the Electrical Hub: total_paid += deposit, settings.depositApplied
--     {amount, paidAt, depositInvoiceId} (the PDF's first deposit source).
--     The invoice total and VAT are untouched; the deposit is a payment.
--   * link_invoice_to_quote(quote, invoice): the Hub dialog's call. Firm
--     managers only (my_employer_scope, the same rule as the quotes RLS).
--   * (20261010275050) trg_automation_job_complete: the draft invoice from the job's
--     accepted quote now goes through the same function (deposit credited,
--     quote stamped), and it skips a quote that is already invoiced.
-- get_employer_bridged_quotes already returns `settings`, so HEAD and build 49
-- read the stamp without any change to that function.

create or replace function public._apply_quote_to_invoice(p_quote_id uuid, p_invoice_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  inv public.quotes;
  v_other public.quotes;
  v_dep numeric := 0;
  v_credited boolean := false;
begin
  select * into q from public.quotes where id = p_quote_id for update;
  if q.id is null or q.deleted_at is not null then
    raise exception 'That quote has gone.' using errcode = 'P0002';
  end if;
  select * into inv from public.quotes where id = p_invoice_id for update;
  if inv.id is null or inv.deleted_at is not null or not coalesce(inv.invoice_raised, false) then
    raise exception 'That invoice has gone.' using errcode = 'P0002';
  end if;
  if inv.user_id is distinct from q.user_id then
    raise exception 'The quote and the invoice belong to different firms.' using errcode = '42501';
  end if;
  if coalesce(q.invoice_raised, false) then
    raise exception 'Quote % is already an invoice.', coalesce(q.quote_number, '') using errcode = 'P0001';
  end if;

  -- One invoice per quote. A link to an invoice that has since been deleted
  -- doesn't count, so the quote can be invoiced again.
  if coalesce(q.settings->>'convertedInvoiceId', '') <> ''
     and q.settings->>'convertedInvoiceId' <> p_invoice_id::text then
    select * into v_other from public.quotes
     where id::text = q.settings->>'convertedInvoiceId' and deleted_at is null;
    if v_other.id is not null then
      raise exception 'Quote % is already on invoice %.', coalesce(q.quote_number, ''),
        coalesce(v_other.invoice_number, 'another invoice') using errcode = 'P0001';
    end if;
  end if;

  -- ELE-1760 credit, once: only a PAID deposit with a positive amount, and only
  -- if this invoice doesn't carry a deposit credit already.
  if q.deposit_paid_at is not null and coalesce(q.deposit_amount_pennies, 0) > 0
     and not (coalesce(inv.settings, '{}'::jsonb) ? 'depositApplied') then
    v_dep := round(q.deposit_amount_pennies::numeric / 100, 2);
    v_credited := true;
  end if;

  update public.quotes
     set settings = coalesce(settings, '{}'::jsonb)
           || jsonb_build_object('fromQuoteId', q.id, 'fromQuoteNumber', q.quote_number)
           || case when v_credited then jsonb_build_object('depositApplied', jsonb_build_object(
                'amount', v_dep, 'paidAt', q.deposit_paid_at, 'depositInvoiceId', q.deposit_invoice_id))
              else '{}'::jsonb end,
         total_paid = case when v_credited then round(coalesce(total_paid, 0) + v_dep, 2) else total_paid end,
         employer_job_id = coalesce(employer_job_id, q.employer_job_id),
         customer_id = coalesce(customer_id, q.customer_id)
   where id = inv.id
  returning * into inv;

  update public.quotes
     set settings = coalesce(settings, '{}'::jsonb) || jsonb_build_object(
           'convertedInvoiceId', inv.id,
           'convertedInvoiceNumber', inv.invoice_number,
           'convertedAt', now())
   where id = q.id;

  return jsonb_build_object(
    'quote_id', q.id,
    'invoice_id', inv.id,
    'invoice_number', inv.invoice_number,
    'deposit_credited', case when v_credited then v_dep else 0 end,
    'total', inv.total,
    'total_paid', inv.total_paid,
    'balance', greatest(coalesce(inv.total, 0) - coalesce(inv.total_paid, 0), 0));
end;
$$;
revoke all on function public._apply_quote_to_invoice(uuid, uuid) from public, anon, authenticated;

create or replace function public.link_invoice_to_quote(p_quote_id uuid, p_invoice_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_owner uuid;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select user_id into v_owner from public.quotes where id = p_quote_id and deleted_at is null;
  if v_owner is null or v_owner not in (select public.my_employer_scope()) then
    raise exception 'You can only invoice your own firm''s quotes.' using errcode = '42501';
  end if;
  return public._apply_quote_to_invoice(p_quote_id, p_invoice_id);
end;
$$;
revoke all on function public.link_invoice_to_quote(uuid, uuid) from public, anon;
grant execute on function public.link_invoice_to_quote(uuid, uuid) to authenticated;

comment on function public.link_invoice_to_quote(uuid, uuid) is
  'ELE-2065: links a Hub invoice to the quote it was raised from (settings.fromQuoteId / convertedInvoiceId), refuses a second invoice for one quote, and credits a paid deposit as total_paid + settings.depositApplied (ELE-1760). Firm managers only.';
