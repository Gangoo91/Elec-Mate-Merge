-- ELE-1947: the hub's invoice list carried no client email/phone or pay link,
-- so Send always asked for an email, Call/Email said "nothing on file", and
-- Copy link only worked after a fresh send. Extra columns are ignored by the
-- live app.
drop function if exists public.get_employer_bridged_invoices();
create function public.get_employer_bridged_invoices()
returns table(
  id uuid, invoice_number text, client text, project text, amount numeric, status text,
  due_date timestamptz, paid_date timestamptz, job_id uuid, quote_id uuid,
  line_items jsonb, notes text, subtotal numeric, vat_amount numeric, total_paid numeric,
  created_at timestamptz, updated_at timestamptz, source text,
  client_email text, client_phone text, client_address text,
  pay_url text, public_token text, sent_at timestamptz
)
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    q.id, coalesce(q.invoice_number, q.quote_number),
    coalesce(nullif(q.client_data->>'name', ''), 'Client'),
    nullif(q.job_details->>'title', ''), coalesce(q.total, 0),
    initcap(coalesce(q.invoice_status, 'draft')),
    q.invoice_due_date, q.invoice_paid_at, null::uuid, q.id,
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
revoke execute on function public.get_employer_bridged_invoices() from public, anon;
grant execute on function public.get_employer_bridged_invoices() to authenticated;
