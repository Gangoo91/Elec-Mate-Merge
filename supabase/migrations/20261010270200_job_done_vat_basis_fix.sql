-- ELE-2068 fix: the customer signs the same VAT figure the invoice gets.
--
-- The "Job done" sheet showed the extras plus a flat 20% VAT whenever the
-- firm's profile said VAT registered, while complete_job_on_site adds the
-- extras to the draft invoice at THAT invoice's rate (0% under the domestic
-- reverse charge, the quote's own rate otherwise). So a reverse-charge job
-- showed "plus VAT" to the customer and none went on the invoice.
--
--   _job_done_vat_basis(job)  the rate the extras will be invoiced at, worked
--                             out the same way the invoice will be:
--     1. the job already has an invoice: its settings
--     2. "Draft the invoice" is on and there is an accepted quote: the quote's
--        settings (trg_automation_job_complete copies them onto the draft)
--     3. "Draft the invoice" is on, no quote, a job value: 20% if the profile
--        says VAT registered, else 0 (what that trigger does)
--     4. otherwise the profile flag (the office invoices it)
--   get_job_done_context      now returns vat_basis {rate, reverse_charge,
--                             source}; vat_registered = rate > 0
--   complete_job_on_site      the rate it adds to the draft also respects
--                             vatRegistered = false (it charged the stored
--                             vatRate even on a non-VAT-registered invoice)
--
-- Also: the price list no longer falls back to cost x (1 + markup). With no
-- markup that showed the crew the buy price. Only the sell price
-- (estimated_price) is shown. No live price book item relies on the fallback
-- (0 of 1,497 items on firm price books have a cost and no sell price).
--
-- Additive: new helper; the two functions are new this week (not called by
-- HEAD or iOS build 49) and keep their signatures. Patched in place like
-- 20261010201100 so nothing else in them changes.

create or replace function public._job_done_vat_basis(p_job uuid, p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_inv record;
  v_q record;
  v_value numeric;
  v_reg boolean;
begin
  select coalesce(cp.default_vat_registered, false) into v_reg
    from public.company_profiles cp where cp.user_id = p_firm limit 1;
  v_reg := coalesce(v_reg, false);

  select q.settings, q.invoice_status into v_inv
    from public.quotes q
   where q.employer_job_id = p_job and q.invoice_raised and q.deleted_at is null
   order by q.created_at desc limit 1;
  if found then
    return jsonb_build_object(
      'rate', case when coalesce(public._doc_flag(v_inv.settings, 'reverseCharge'), false) then 0
                   else public._doc_vat_rate(v_inv.settings) end,
      'reverse_charge', coalesce(public._doc_flag(v_inv.settings, 'reverseCharge'), false),
      'source', case when lower(coalesce(v_inv.invoice_status, '')) = 'draft' then 'draft_invoice' else 'invoice' end);
  end if;

  if public._automation_on(p_firm, 'job_complete_draft_invoice') then
    select x.settings into v_q from public.quotes x
     where x.employer_job_id = p_job and not coalesce(x.invoice_raised, false) and x.deleted_at is null
       and coalesce(x.is_active_version, true)
       and (x.acceptance_status = 'accepted' or x.accepted_at is not null)
     order by x.accepted_at desc nulls last, x.created_at desc limit 1;
    if found then
      return jsonb_build_object(
        'rate', case when coalesce(public._doc_flag(v_q.settings, 'reverseCharge'), false) then 0
                     else public._doc_vat_rate(v_q.settings) end,
        'reverse_charge', coalesce(public._doc_flag(v_q.settings, 'reverseCharge'), false),
        'source', 'accepted_quote');
    end if;
    select j.value into v_value from public.employer_jobs j where j.id = p_job;
    if coalesce(v_value, 0) > 0 then
      return jsonb_build_object('rate', case when v_reg then 20 else 0 end, 'reverse_charge', false,
                                'source', 'job_value');
    end if;
  end if;

  return jsonb_build_object('rate', case when v_reg then 20 else 0 end, 'reverse_charge', false, 'source', 'firm');
end;
$$;
revoke all on function public._job_done_vat_basis(uuid, uuid) from public, anon, authenticated;

do $$
declare d text; a text; b text;
begin
  -- complete_job_on_site: the draft invoice's rate, respecting vatRegistered.
  d := pg_get_functiondef('public.complete_job_on_site(uuid, uuid, jsonb)'::regprocedure);
  a := $x$v_vat_rate := case when coalesce((v_inv_row.settings->>'reverseCharge')::boolean, false) then 0
                         else coalesce(nullif(v_inv_row.settings->>'vatRate', '')::numeric, 0) end;$x$;
  b := $x$v_vat_rate := case when coalesce(public._doc_flag(v_inv_row.settings, 'reverseCharge'), false) then 0
                         else public._doc_vat_rate(v_inv_row.settings) end;$x$;
  if position(a in d) > 0 then
    execute replace(d, a, b);
  elsif position(b in d) = 0 then
    raise exception 'complete_job_on_site: VAT expression not found';
  end if;

  -- get_job_done_context: the VAT basis, and sell prices only.
  d := pg_get_functiondef('public.get_job_done_context(uuid)'::regprocedure);
  a := $x$'price', coalesce(
                     nullif(public._pb_num(e.it, 'estimated_price'), 0),
                     case when coalesce(public._pb_num(e.it, 'cost_price'), 0) > 0
                          then round(public._pb_num(e.it, 'cost_price')
                                     * (1 + coalesce(public._pb_num(e.it, 'markup_percent'), 0) / 100), 2)
                     end)) as x$x$;
  b := $x$'price', nullif(public._pb_num(e.it, 'estimated_price'), 0)) as x$x$;
  if position(a in d) > 0 then
    d := replace(d, a, b);
  elsif position(b in d) = 0 then
    raise exception 'get_job_done_context: price expression not found';
  end if;
  a := $x$'vat_registered', coalesce(v_vat, false),$x$;
  b := $x$'vat_registered', coalesce((public._job_done_vat_basis(p_job, w.firm)->>'rate')::numeric, 0) > 0,
    'vat_basis', public._job_done_vat_basis(p_job, w.firm),$x$;
  if position(a in d) > 0 then
    d := replace(d, a, b);
  elsif position(b in d) = 0 then
    raise exception 'get_job_done_context: vat_registered not found';
  end if;
  execute d;
end $$;
