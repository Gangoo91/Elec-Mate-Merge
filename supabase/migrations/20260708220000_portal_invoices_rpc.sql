-- Pay-by-bank MVP: let a client see their job's invoices + how to pay in the
-- portal. Employer sets a "pay online" URL (their own payment link); bank
-- details reuse the existing company_profiles.bank_details (jsonb).
ALTER TABLE public.company_profiles
  ADD COLUMN IF NOT EXISTS portal_payment_link text;

-- Token-scoped, gated on the portal's showInvoices permission. bank_details is
-- jsonb {accountName,bankName,sortCode,accountNumber} → formatted to readable
-- text for the portal (blank fields skipped).
CREATE OR REPLACE FUNCTION public.get_portal_invoices(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_link record;
begin
  select cpl.job_id, cpl.user_id, cpl.permissions
    into v_link
  from client_portal_links cpl
  where cpl.access_token = p_token and cpl.is_active = true;

  if v_link is null
     or not coalesce((v_link.permissions->>'showInvoices')::boolean, false) then
    return jsonb_build_object('show', false, 'invoices', '[]'::jsonb);
  end if;

  return jsonb_build_object(
    'show', true,
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id,
        'number', invoice_number,
        'amount', coalesce(amount, 0),
        'status', status,
        'due_date', due_date,
        'paid', paid_date is not null
      ) order by created_at desc)
      from employer_invoices where job_id = v_link.job_id
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
