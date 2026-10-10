-- ELE-2065: the draft invoice made when a job is marked Complete (rule
-- job_complete_draft_invoice) now links to its quote and credits a paid deposit
-- via _apply_quote_to_invoice (20261010275000), and skips a quote the Hub has
-- already invoiced. Proven with rolled-back job updates before applying.

-- ── The draft invoice made when a job is marked Complete ────────────────────
-- Same body as 20261008160000, with three changes marked ELE-2065.
create or replace function public.trg_automation_job_complete()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_firm uuid := new.user_id;
  v_run uuid;
  q public.quotes;
  cp record;
  v_inv uuid;
  v_num text;
  v_days int;
  v_due timestamptz;
  v_vat numeric;
  v_net numeric;
  v_vat_amt numeric;
  v_title text := coalesce(nullif(btrim(new.title), ''), 'the job');
  v_link jsonb;
  v_dep_note text := '';
begin
  if coalesce(new.is_template, false) then return new; end if;

  select company_name, payment_terms, default_vat_registered, review_request_enabled, review_links
    into cp from public.company_profiles where user_id = v_firm limit 1;

  if public._automation_on(v_firm, 'job_complete_draft_invoice') then
    begin
      v_run := public._automation_claim(v_firm, 'job_complete_draft_invoice', new.id::text, new.id, 'Drafting the invoice');
      if v_run is not null then
        if exists (select 1 from public.quotes x where x.employer_job_id = new.id and x.invoice_raised and x.deleted_at is null) then
          perform public._automation_finish(v_run, 'skipped', 'No draft made: ' || v_title || ' already has an invoice.');
        else
          v_days := least(greatest(coalesce(substring(coalesce(cp.payment_terms, '') from '(\d+)')::int, 30), 0), 120);
          v_due := now() + make_interval(days => v_days);
          select * into q from public.quotes x
           where x.employer_job_id = new.id and not coalesce(x.invoice_raised, false) and x.deleted_at is null
             and coalesce(x.is_active_version, true)
             and (x.acceptance_status = 'accepted' or x.accepted_at is not null)
             -- ELE-2065: a quote the Hub already invoiced is done.
             and coalesce(x.settings->>'convertedInvoiceId', '') = ''
           order by x.accepted_at desc nulls last, x.created_at desc limit 1;

          if q.id is not null then
            insert into public.quotes (
              user_id, quote_number, client_data, items, settings, subtotal, overhead, profit, vat_amount, total,
              status, expiry_date, invoice_raised, invoice_status, invoice_date, invoice_due_date, invoice_notes,
              job_details, employer_job_id, customer_id)
            values (
              v_firm, null, q.client_data, q.items,
              -- ELE-2065: never copy the quote's own link/credit keys onto the invoice.
              coalesce(q.settings, '{}'::jsonb) - 'convertedInvoiceId' - 'convertedInvoiceNumber' - 'convertedAt' - 'depositApplied',
              q.subtotal, q.overhead, q.profit, q.vat_amount, q.total,
              'approved', v_due, true, 'draft', now(), v_due,
              'Drafted automatically when the job was marked Complete, from quote ' || coalesce(q.quote_number, '') || '. Check it before you send it.',
              coalesce(q.job_details, '{}'::jsonb) || jsonb_build_object('title', new.title), new.id, q.customer_id)
            returning id, invoice_number into v_inv, v_num;

            -- ELE-2065: link it to the quote and take a paid deposit off, the
            -- same way the Hub's Convert to invoice does. If that fails the
            -- draft still lands (it is never sent automatically).
            begin
              v_link := public._apply_quote_to_invoice(q.id, v_inv);
              if coalesce((v_link->>'deposit_credited')::numeric, 0) > 0 then
                v_dep_note := ' The paid deposit of £' || to_char((v_link->>'deposit_credited')::numeric, 'FM999,999,990.00')
                  || ' is taken off the balance.';
              end if;
            exception when others then
              raise warning '[trg_automation_job_complete] link % → %: %', q.id, v_inv, sqlerrm;
            end;
          elsif coalesce(new.value, 0) > 0 then
            v_vat := case when coalesce(cp.default_vat_registered, false) then 20 else 0 end;
            v_net := round(new.value, 2);
            v_vat_amt := round(v_net * v_vat / 100, 2);
            insert into public.quotes (
              user_id, quote_number, client_data, items, settings, subtotal, vat_amount, total,
              status, expiry_date, invoice_raised, invoice_status, invoice_date, invoice_due_date, invoice_notes,
              job_details, employer_job_id, customer_id)
            values (
              v_firm, null,
              jsonb_strip_nulls(jsonb_build_object('name', coalesce(new.client, ''),
                'email', nullif(btrim(coalesce(new.client_email, '')), ''),
                'phone', nullif(btrim(coalesce(new.client_phone, '')), ''),
                'customerId', coalesce(new.customer_id, new.client_id))),
              jsonb_build_array(jsonb_build_object(
                'id', gen_random_uuid(), 'description', new.title, 'quantity', 1, 'unit', 'each',
                'unitPrice', v_net, 'total', v_net, 'totalPrice', v_net, 'type', 'labour', 'category', 'labour')),
              jsonb_build_object('vatRate', v_vat, 'vatRegistered', v_vat > 0, 'reverseCharge', false, 'cisEnabled', false),
              v_net, v_vat_amt, v_net + v_vat_amt,
              'approved', v_due, true, 'draft', now(), v_due,
              'Drafted automatically when the job was marked Complete, from the job value. Check the lines and VAT before you send it.',
              jsonb_build_object('title', new.title), new.id, coalesce(new.customer_id, new.client_id))
            returning id, invoice_number into v_inv, v_num;
          end if;

          if v_inv is null then
            perform public._automation_finish(v_run, 'skipped',
              'No draft made for ' || v_title || ': it has no accepted quote and no job value to invoice from.');
          else
            perform public._automation_finish(v_run, 'done',
              'Drafted invoice ' || coalesce(v_num, '') || ' for ' || v_title
                || case when q.id is not null then ' from the accepted quote' else ' from the job value' end
                || '. It has not been sent.' || v_dep_note,
              jsonb_build_object('invoice_id', v_inv, 'invoice_number', v_num));
            perform public.notify_employer_bell(v_firm, 'automation',
              'Invoice drafted: ' || v_title,
              'Draft ' || coalesce(v_num, '') || ' is ready. Check it and send it from Quotes & invoices.',
              jsonb_build_object('job_id', new.id, 'invoice_id', v_inv, 'rule', 'job_complete_draft_invoice',
                                 'route', '/employer?section=quotes'));
          end if;
        end if;
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'job_complete_draft_invoice', new.id::text, new.id, sqlerrm);
    end;
  end if;

  if public._automation_on(v_firm, 'job_complete_review_request') then
    begin
      if nullif(btrim(coalesce(new.client_email, '')), '') is null then
        v_run := public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id, '');
        if v_run is not null then
          perform public._automation_finish(v_run, 'skipped',
            'No review request for ' || v_title || ': the job has no customer email.');
        end if;
      elsif not exists (
        select 1 from jsonb_array_elements(case when jsonb_typeof(to_jsonb(cp.review_links)) = 'array'
                                                 then to_jsonb(cp.review_links) else '[]'::jsonb end) l
         where coalesce(l->>'url', '') ~* '^https?://') then
        v_run := public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id, '');
        if v_run is not null then
          perform public._automation_finish(v_run, 'skipped',
            'No review request for ' || v_title || ': add your review link in Settings first.');
        end if;
      else
        perform public._automation_claim(v_firm, 'job_complete_review_request', new.id::text, new.id,
          'Asking ' || coalesce(nullif(btrim(new.client), ''), 'the customer') || ' for a review');
      end if;
    exception when others then
      perform public._automation_fail(v_firm, 'job_complete_review_request', new.id::text, new.id, sqlerrm);
    end;
  end if;

  return new;
exception when others then
  raise warning '[trg_automation_job_complete] %', sqlerrm;
  return new;
end;
$function$;
