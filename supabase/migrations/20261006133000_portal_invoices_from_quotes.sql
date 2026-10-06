-- ELE-1996: the client portal's invoices tab read employer_invoices (0 rows,
-- never written any more), so it was always empty. Now it lists the job's
-- customer's raised, non-draft invoices from `quotes` — the table both hubs
-- write — with the card payment link where one exists.
create or replace function public.get_portal_invoices(p_token text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_link record;
  v_customer uuid;
begin
  select cpl.job_id, cpl.user_id, cpl.permissions
    into v_link
  from client_portal_links cpl
  where cpl.access_token = p_token and cpl.is_active = true;

  if v_link is null
     or not coalesce((v_link.permissions->>'showInvoices')::boolean, false) then
    return jsonb_build_object('show', false, 'invoices', '[]'::jsonb);
  end if;

  select customer_id into v_customer from employer_jobs where id = v_link.job_id;

  return jsonb_build_object(
    'show', true,
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id,
        'number', q.invoice_number,
        'amount', coalesce(q.total, 0),
        'status', initcap(coalesce(q.invoice_status, 'sent')),
        'due_date', q.invoice_due_date,
        'paid', lower(coalesce(q.invoice_status, '')) = 'paid' or q.invoice_paid_at is not null,
        'pay_url', q.stripe_payment_link_url
      ) order by q.created_at desc)
      from quotes q
      where v_customer is not null
        and q.customer_id = v_customer
        and q.user_id = v_link.user_id
        and coalesce(q.invoice_raised, false)
        and lower(coalesce(q.invoice_status, '')) <> 'draft'
        and q.deleted_at is null
    ), '[]'::jsonb),
    'bank_details', (
      select nullif(trim(both E'\n' from concat_ws(E'\n',
        case when coalesce(bank_details->>'accountName','') <> '' then 'Account name: ' || (bank_details->>'accountName') end,
        case when coalesce(bank_details->>'bankName','') <> '' then 'Bank: ' || (bank_details->>'bankName') end,
        case when coalesce(bank_details->>'sortCode','') <> '' then 'Sort code: ' || (bank_details->>'sortCode') end,
        case when coalesce(bank_details->>'accountNumber','') <> '' then 'Account no: ' || (bank_details->>'accountNumber') end
      )), '')
      from company_profiles where user_id = v_link.user_id
    ),
    'payment_link', (select portal_payment_link from company_profiles where user_id = v_link.user_id)
  );
end;
$function$;
