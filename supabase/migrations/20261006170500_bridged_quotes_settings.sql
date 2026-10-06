-- Review finding #15 (6 Oct). Duplicate in ViewQuoteSheet copies vat_rate,
-- reverse_charge, cis_enabled and cis_rate, but get_employer_bridged_quotes
-- never returned them, so every copy fell back to 20% VAT, no CIS.
drop function if exists public.get_employer_bridged_quotes();
create function public.get_employer_bridged_quotes()
returns table(id uuid, quote_number text, client text, client_address text, client_email text, client_phone text,
              job_title text, description text, value numeric, status text, sent_date timestamptz,
              valid_until timestamptz, job_id uuid, created_by text, line_items jsonb, notes text,
              subtotal numeric, vat_amount numeric, created_at timestamptz, updated_at timestamptz, source text,
              acceptance_status text, accepted_at timestamptz, accepted_by_name text, signature_url text,
              public_token text, invoice_raised boolean,
              vat_rate numeric, reverse_charge boolean, cis_enabled boolean, cis_rate numeric)
language sql
stable
security definer
set search_path = public
as $function$
  select
    q.id, q.quote_number,
    coalesce(nullif(q.client_data->>'name', ''), 'Client'),
    q.client_data->>'address', q.client_data->>'email', q.client_data->>'phone',
    nullif(q.job_details->>'title', ''),
    q.notes, coalesce(q.total, 0),
    case
      when q.acceptance_status in ('accepted', 'accepted_pending_deposit') then 'Approved'
      when q.acceptance_status in ('rejected', 'declined') or q.status = 'rejected' then 'Rejected'
      else initcap(coalesce(q.status, 'draft'))
    end,
    q.first_sent_at, q.expiry_date, q.employer_job_id, 'Electrical Hub'::text,
    coalesce(q.items, '[]'::jsonb), q.notes, q.subtotal, q.vat_amount,
    q.created_at, q.updated_at, 'electrical_hub'::text,
    q.acceptance_status, q.accepted_at, q.accepted_by_name,
    q.signature_url, q.public_token::text, coalesce(q.invoice_raised, false),
    case when lower(coalesce(q.settings->>'vatRegistered', 'true')) = 'false' then 0
         when q.settings->>'vatRate' ~ '^\d+(\.\d+)?$' then (q.settings->>'vatRate')::numeric
         else 20 end,
    lower(coalesce(q.settings->>'reverseCharge', 'false')) = 'true',
    lower(coalesce(q.settings->>'cisEnabled', 'false')) = 'true',
    case when q.settings->>'cisRate' ~ '^\d+(\.\d+)?$' then (q.settings->>'cisRate')::numeric end
  from public.quotes q
  where q.user_id in (select public.my_employer_scope())
    and q.deleted_at is null
    and coalesce(q.invoice_raised, false) = false
  order by q.created_at desc;
$function$;
revoke execute on function public.get_employer_bridged_quotes() from public, anon;
grant execute on function public.get_employer_bridged_quotes() to authenticated;
