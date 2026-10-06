-- ELE-1947: the Employer Hub's quote sheet showed client acceptance from
-- employer_quote_acceptances (legacy, 0 rows), so a customer accepting on the
-- public page never showed in the hub. Acceptance lives on `quotes` itself.
-- Adds those fields to the hub's quote list. Extra columns are ignored by the
-- live app, so this is safe ahead of the release.
drop function if exists public.get_employer_bridged_quotes();
create function public.get_employer_bridged_quotes()
returns table(
  id uuid, quote_number text, client text, client_address text, client_email text,
  client_phone text, job_title text, description text, value numeric, status text,
  sent_date timestamptz, valid_until timestamptz, job_id uuid, created_by text,
  line_items jsonb, notes text, subtotal numeric, vat_amount numeric,
  created_at timestamptz, updated_at timestamptz, source text,
  acceptance_status text, accepted_at timestamptz, accepted_by_name text,
  signature_url text, public_token text, invoice_raised boolean
)
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    q.id, q.quote_number,
    coalesce(nullif(q.client_data->>'name', ''), 'Client'),
    q.client_data->>'address', q.client_data->>'email', q.client_data->>'phone',
    nullif(q.job_details->>'title', ''),
    q.notes, coalesce(q.total, 0),
    -- One effective status: the customer's answer beats the stored status
    -- (75 accepted quotes are still status='draft'; 29 declined are 'sent').
    case
      when q.acceptance_status in ('accepted', 'accepted_pending_deposit') then 'Approved'
      when q.acceptance_status in ('rejected', 'declined') or q.status = 'rejected' then 'Rejected'
      else initcap(coalesce(q.status, 'draft'))
    end,
    q.first_sent_at, q.expiry_date, null::uuid, 'Electrical Hub'::text,
    coalesce(q.items, '[]'::jsonb), q.notes, q.subtotal, q.vat_amount,
    q.created_at, q.updated_at, 'electrical_hub'::text,
    q.acceptance_status, q.accepted_at, q.accepted_by_name,
    q.signature_url, q.public_token::text, coalesce(q.invoice_raised, false)
  from public.quotes q
  where q.user_id in (select public.my_employer_scope())
    and q.deleted_at is null
    and coalesce(q.invoice_raised, false) = false
  order by q.created_at desc;
$function$;
revoke execute on function public.get_employer_bridged_quotes() from public, anon;
grant execute on function public.get_employer_bridged_quotes() to authenticated;
