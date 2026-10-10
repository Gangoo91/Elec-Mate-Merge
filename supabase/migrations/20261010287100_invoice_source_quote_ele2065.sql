-- ELE-2065 / gap analysis §3A #10: a Hub invoice dropped the quote it came
-- from. get_employer_bridged_invoices returned the invoice's own id as
-- quote_id, so an invoice raised from a quote never pointed back at it.
--
-- Same signature and columns (HEAD and build 49 call it); one column's value
-- changes: quote_id is now the source quote (settings.fromQuoteId, set by
-- link_invoice_to_quote and, from this change, by createInvoice itself) when
-- there is one, else the row's own id as before (the Electrical Hub converts a
-- quote into an invoice in place, so there the two ids are the same). No
-- employer screen in HEAD reads an invoice's quote_id.

create or replace function public.get_employer_bridged_invoices()
returns table(id uuid, invoice_number text, client text, project text, amount numeric, status text,
              due_date timestamp with time zone, paid_date timestamp with time zone, job_id uuid,
              quote_id uuid, line_items jsonb, notes text, subtotal numeric, vat_amount numeric,
              total_paid numeric, created_at timestamp with time zone, updated_at timestamp with time zone,
              source text, client_email text, client_phone text, client_address text, pay_url text,
              public_token text, sent_at timestamp with time zone)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select
    q.id, coalesce(q.invoice_number, q.quote_number),
    coalesce(nullif(q.client_data->>'name', ''), 'Client'),
    nullif(q.job_details->>'title', ''), coalesce(q.total, 0),
    initcap(coalesce(q.invoice_status, 'draft')),
    q.invoice_due_date, q.invoice_paid_at, q.employer_job_id,
    case when coalesce(q.settings->>'fromQuoteId', '')
              ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
         then (q.settings->>'fromQuoteId')::uuid else q.id end,
    coalesce(q.items, '[]'::jsonb), q.invoice_notes, q.subtotal, q.vat_amount,
    coalesce(q.total_paid, 0), coalesce(q.invoice_date, q.created_at), q.updated_at,
    'electrical_hub'::text,
    nullif(q.client_data->>'email', ''), nullif(q.client_data->>'phone', ''),
    nullif(q.client_data->>'address', ''),
    q.stripe_payment_link_url, q.public_token::text, q.invoice_sent_at
  from public.quotes q
  where q.user_id in (select public.my_employer_scope())
    and q.deleted_at is null
    and coalesce(q.invoice_raised, false) = true
  order by coalesce(q.invoice_date, q.created_at) desc;
$function$;
