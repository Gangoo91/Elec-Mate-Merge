-- ELE-2065 / ELE-2074: a paid deposit and the final invoice from the same
-- quote, when nothing links them.
--
-- finance_invoice_rows (20261010275100) counts a paid DEP- deposit as money in
-- and takes it off the one invoice that carries it: the quote itself when the
-- Electrical Hub converted it in place, or the invoice whose
-- settings.fromQuoteId is the quote. Invoices raised by HEAD's (and iOS build
-- 49's) Employer Hub CreateInvoiceDialog are new rows with no link at all, so
-- if the quote had a paid deposit and the owner marks that invoice paid in
-- full, the deposit was counted twice (deposit + full invoice).
--
-- _quote_invoice_match(quote) finds the quote's final invoice:
--   1. the quote itself when it was converted in place;
--   2. an explicit link either way (invoice.settings.fromQuoteId, or
--      quote.settings.convertedInvoiceId);
--   3. otherwise, an invoice raised directly (never an accepted quote itself)
--      by the same firm, after the quote, with no fromQuoteId of its own, for
--      the same total, and for the same job, customer or customer name. The
--      earliest wins.
-- finance_invoice_rows now also uses 3 to choose the carrier (same signature,
-- same columns; patched in place). Live today no paid deposit lacks a carrier
-- (all 28 paid deposits sit on quotes converted in place), so live totals do
-- not move; this closes the gap until the linked dialog ships.
--
-- get_cash_forecast:
--   * a booked quote that already has its final invoice (by 1 to 3) is not
--     counted again as "balance on booked work" (HEAD's dialog left the quote
--     accepted, so the invoice and the booking were both counted);
--   * a deposit invoice that has been raised but not paid is still money to
--     come (it was dropped: excluded from deposits because it had an invoice,
--     and taken off the booked balance), on that invoice's due date;
--   * paid deposit rows now count towards a customer's payment history.

create or replace function public._quote_invoice_match(p_quote uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  with q as (select * from public.quotes where id = p_quote and deleted_at is null)
  select coalesce(
    (select q.id from q where coalesce(q.invoice_raised, false)),
    (select s.id
       from public.quotes s, q
      where s.user_id = q.user_id and s.id <> q.id and s.deleted_at is null
        and coalesce(s.invoice_raised, false)
        and lower(coalesce(s.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
        and (s.settings->>'fromQuoteId' = q.id::text or s.id::text = q.settings->>'convertedInvoiceId')
      order by s.created_at limit 1),
    (select s.id
       from public.quotes s, q
      where s.user_id = q.user_id and s.id <> q.id and s.deleted_at is null
        and coalesce(s.invoice_raised, false)
        and lower(coalesce(s.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
        and coalesce(s.settings->>'fromQuoteId', '') = ''
        and coalesce(s.acceptance_status, '') <> 'accepted' and s.accepted_at is null
        and s.created_at >= q.created_at
        and coalesce(q.total, 0) > 0 and abs(coalesce(s.total, 0) - q.total) < 0.01
        and (s.employer_job_id = q.employer_job_id
             or s.customer_id = q.customer_id
             or lower(btrim(coalesce(s.client_data->>'name', ''))) = lower(btrim(coalesce(q.client_data->>'name', '-'))))
      order by s.created_at limit 1))
$$;
revoke all on function public._quote_invoice_match(uuid) from public, anon, authenticated;

do $$
declare d text; a text; b text;
begin
  -- finance_invoice_rows: the carrier may be the unlinked final invoice.
  d := pg_get_functiondef('public.finance_invoice_rows(uuid[])'::regprocedure);
  a := $x$select d.parent_quote_id as quote_id, sum(d.total) as amt from dep d group by d.parent_quote_id$x$;
  b := $x$select d.parent_quote_id as quote_id, sum(d.total) as amt,
           public._quote_invoice_match(d.parent_quote_id) as match_id
      from dep d group by d.parent_quote_id$x$;
  if position(a in d) > 0 then
    d := replace(d, a, b);
  elsif position(b in d) = 0 then
    raise exception 'finance_invoice_rows: credit CTE not found';
  end if;
  a := $x$and (s.id = c.quote_id or s.settings->>'fromQuoteId' = c.quote_id::text)
     order by c.quote_id, (s.id = c.quote_id) desc, s.created_at$x$;
  b := $x$and (s.id = c.quote_id or s.settings->>'fromQuoteId' = c.quote_id::text or s.id = c.match_id)
     order by c.quote_id, (s.id = c.quote_id) desc,
              (s.settings->>'fromQuoteId' = c.quote_id::text) desc nulls last, s.created_at$x$;
  if position(a in d) > 0 then
    d := replace(d, a, b);
  elsif position(b in d) = 0 then
    raise exception 'finance_invoice_rows: carrier join not found';
  end if;
  execute d;

  -- get_cash_forecast
  d := pg_get_functiondef('public.get_cash_forecast(uuid, date)'::regprocedure);
  a := $x$      from public.finance_invoice_rows(array[p_firm]) i
      join public.quotes q on q.id = i.id$x$;
  b := $x$      from public.finance_invoice_rows(array[p_firm]) i
      left join public.quotes q on q.id = i.id$x$;
  if position(a in d) > 0 then d := replace(d, a, b);
  elsif position(b in d) = 0 then raise exception 'get_cash_forecast: inv_all not found'; end if;

  a := $x$       and lower(coalesce(q.status, '')) not in ('converted', 'cancelled', 'canceled', 'rejected', 'declined', 'expired')
  ),$x$;
  b := $x$       and lower(coalesce(q.status, '')) not in ('converted', 'cancelled', 'canceled', 'rejected', 'declined', 'expired')
       and public._quote_invoice_match(q.id) is null
  ),$x$;
  if position(a in d) > 0 then d := replace(d, a, b);
  elsif position(b in d) = 0 then raise exception 'get_cash_forecast: q_booked not found'; end if;

  a := $x$           coalesce(q.booked_slot_start::date, q.proposed_start_date, q.requested_start_date, q.job_start, v_today),
           round(q.deposit_amount_pennies / 100.0, 2),
           'Deposit on accepted quote', q.id
      from q_booked q
     where coalesce(q.deposit_required, false) and q.deposit_paid_at is null
       and q.deposit_invoice_id is null and coalesce(q.deposit_amount_pennies, 0) > 0$x$;
  b := $x$           coalesce((di.due_date at time zone 'Europe/London')::date,
                    q.booked_slot_start::date, q.proposed_start_date, q.requested_start_date, q.job_start, v_today),
           round(q.deposit_amount_pennies / 100.0, 2),
           case when di.id is not null then 'Deposit invoice ' || coalesce(nullif(di.invoice_number, ''), 'sent') || ', not paid yet'
                else 'Deposit on accepted quote' end, q.id
      from q_booked q
      left join public.invoices di on di.id = q.deposit_invoice_id and di.deleted_at is null
     where coalesce(q.deposit_required, false) and q.deposit_paid_at is null
       and coalesce(q.deposit_amount_pennies, 0) > 0$x$;
  if position(a in d) > 0 then d := replace(d, a, b);
  elsif position(b in d) = 0 then raise exception 'get_cash_forecast: deposit line not found'; end if;
  execute d;
end $$;
