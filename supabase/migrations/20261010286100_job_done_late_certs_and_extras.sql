-- Gap #3 follow-ups (ELE-2068), journey breaks 18 and 23 in 07 Gap analysis §3B.
--
-- #18 A certificate finished AFTER Job done never went to QS review (Job done
--     only sends the ones already completed). New AFTER UPDATE OF status
--     trigger on reports, trg_job_done_late_cert_qs: when a certificate on a
--     job that was finished with Job done becomes completed, the firm requires
--     QS sign-off (company_profiles.qs_approval_required) and it has no pending
--     or approved review, it goes to QS review through the existing
--     submit_report_for_qs_review (which never doubles up). It only runs for
--     the certificate's own author (submit_report_for_qs_review needs it) and
--     never raises: any error is a warning and the save goes through.
--     Proven before applying with rolled-back updates as the author and as the
--     service role (see the ELE-2068 Linear comment).
--
--     Also: _job_done_cert_state now treats a completed certificate as issued
--     when the firm does NOT require QS sign-off, even while a review is
--     pending (Job done sends every completed certificate to review, and a
--     firm without QS sign-off should not have its customer's email held for
--     it). A review that came back "returned" still holds it.
--
-- #23 Extras agreed and signed on site were lost money when there was no draft
--     invoice to put them on ("Draft the invoice" off, or the job's invoice
--     already sent): they became an approved variation order on no invoice.
--     complete_job_on_site now puts them on the job's draft invoice when there
--     is one at the same VAT rate the customer signed for, or makes ONE draft
--     invoice of the extras (_job_done_extras_draft). The office bell says so.
--
-- Additive: one new trigger (proved), new functions, two functions new this
-- week patched in place (same signatures; not called by HEAD or build 49).

-- ── #18 ─────────────────────────────────────────────────────────────────────
create or replace function public.trg_job_done_late_cert_qs()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed'
     and new.deleted_at is null
     and lower(coalesce(new.report_type, '')) in ('eicr', 'eic', 'minor-works')
     and auth.uid() is not null and new.user_id = auth.uid()
     and exists (select 1 from public.employer_job_certificates l
                   join public.employer_job_completions c on c.job_id = l.job_id
                   join public.company_profiles cp on cp.user_id = l.employer_id
                  where l.report_uuid = new.id and coalesce(cp.qs_approval_required, false))
     and not exists (select 1 from public.report_qs_reviews q
                      where q.report_uuid = new.id and q.status in ('pending', 'approved')) then
    perform public.submit_report_for_qs_review(new.id, 'Finished after Job done on site');
  end if;
  return null;
exception when others then
  raise warning '[trg_job_done_late_cert_qs] %: %', new.id, sqlerrm;
  return null;
end;
$$;
revoke all on function public.trg_job_done_late_cert_qs() from public, anon, authenticated;

drop trigger if exists trg_job_done_late_cert_qs on public.reports;
create trigger trg_job_done_late_cert_qs
  after update of status on public.reports
  for each row execute function public.trg_job_done_late_cert_qs();

create or replace function public._job_done_cert_state(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_choice text;
  v_held boolean;
  v_qs_required boolean;
  v_certs jsonb := '[]'::jsonb;
  v_waiting boolean := false;
  v_qs text;
  v_issued boolean;
  r record;
begin
  select c.certificate_status into v_choice
    from public.employer_job_completions c where c.job_id = p_job
   order by c.completed_at desc limit 1;
  select coalesce(cp.qs_approval_required, false) into v_qs_required
    from public.employer_jobs j join public.company_profiles cp on cp.user_id = j.user_id
   where j.id = p_job limit 1;
  v_qs_required := coalesce(v_qs_required, false);
  select exists (select 1 from public.quotes q
                  where q.employer_job_id = p_job and q.invoice_raised and q.deleted_at is null
                    and q.certificate_release_mode = 'on_payment' and q.certificate_released_at is null)
    into v_held;
  for r in
    select rp.id, rp.report_type, coalesce(rp.certificate_number, rp.report_id) as num, rp.status, rp.pdf_url
      from public.employer_job_certificates l
      join public.reports rp on rp.id = l.report_uuid and rp.deleted_at is null
     where l.job_id = p_job
     order by rp.created_at
  loop
    v_qs := null;
    select q.status into v_qs from public.report_qs_reviews q
     where q.report_uuid = r.id and q.status <> 'cancelled'
     order by q.created_at desc limit 1;
    v_issued := r.status = 'completed'
                and (coalesce(v_qs, 'approved') = 'approved'
                     or (not v_qs_required and v_qs is distinct from 'returned'));
    if not v_issued then v_waiting := true; end if;
    v_certs := v_certs || jsonb_build_array(jsonb_build_object(
      'report_uuid', r.id, 'type', r.report_type, 'number', r.num, 'issued', v_issued, 'qs', v_qs,
      'pdf_url', case when v_issued and not v_held and r.pdf_url like '%/storage/v1/object/public/%'
                      then r.pdf_url end));
  end loop;
  if jsonb_array_length(v_certs) = 0 and v_choice in ('started', 'later') then
    v_waiting := true;
  end if;
  return jsonb_build_object('waiting', v_waiting, 'held_until_paid', coalesce(v_held, false),
                            'qs_required', v_qs_required, 'choice', v_choice, 'certificates', v_certs);
end;
$$;
revoke all on function public._job_done_cert_state(uuid) from public, anon, authenticated;

-- ── #23 ─────────────────────────────────────────────────────────────────────
-- Put the signed extras on the job's draft invoice (same VAT rate as the
-- customer signed for), or make one draft invoice of them. Returns
-- { invoice_id, made } or null when there is nothing to do.
create or replace function public._job_done_extras_draft(
  p_job uuid, p_firm uuid, p_vo uuid, p_extras jsonb, p_net numeric, p_signed_by text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_basis jsonb;
  v_rate numeric;
  v_rc boolean;
  v_reg boolean;
  v_vat numeric;
  v_items jsonb;
  v_job record;
  v_draft record;
  v_id uuid;
  v_days int;
  v_due timestamptz;
  v_terms text;
begin
  if coalesce(p_net, 0) <= 0 or p_vo is null or jsonb_typeof(p_extras) <> 'array' or jsonb_array_length(p_extras) = 0 then
    return null;
  end if;
  -- Already on an invoice: nothing to do (never twice).
  if exists (select 1 from public.quotes q
               cross join lateral jsonb_array_elements(case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end) it
              where q.employer_job_id = p_job and q.deleted_at is null and it->>'variationId' = p_vo::text) then
    return null;
  end if;

  v_basis := public._job_done_vat_basis(p_job, p_firm);
  v_rate := coalesce((v_basis->>'rate')::numeric, 0);
  v_rc := coalesce((v_basis->>'reverse_charge')::boolean, false);

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', gen_random_uuid(),
           'description', 'Extra (agreed on site): ' || (x->>'description'),
           'quantity', (x->>'quantity')::numeric,
           'unit', x->>'unit',
           'unitPrice', (x->>'unit_price')::numeric,
           'total', (x->>'total')::numeric,
           'totalPrice', (x->>'total')::numeric,
           'category', case when x->>'item_id' is not null then 'materials' else 'manual' end,
           'type', case when x->>'item_id' is not null then 'materials' else 'manual' end,
           'subcategory', 'variation',
           'variationId', p_vo,
           'notes', 'Agreed and signed by ' || coalesce(p_signed_by, 'the customer') || ' on site')), '[]'::jsonb)
    into v_items from jsonb_array_elements(p_extras) x;
  v_vat := round(p_net * v_rate / 100, 2);

  -- A draft invoice on the job at the rate the customer signed for takes them.
  select q.id, q.settings into v_draft
    from public.quotes q
   where q.employer_job_id = p_job and q.invoice_raised and q.deleted_at is null
     and lower(coalesce(q.invoice_status, '')) = 'draft'
     and (case when coalesce(public._doc_flag(q.settings, 'reverseCharge'), false) then 0
               else public._doc_vat_rate(q.settings) end) = v_rate
   order by q.created_at desc limit 1
   for update;
  if v_draft.id is not null then
    update public.quotes
       set items = (case when jsonb_typeof(items) = 'array' then items else '[]'::jsonb end) || v_items,
           subtotal = coalesce(subtotal, 0) + p_net,
           vat_amount = coalesce(vat_amount, 0) + v_vat,
           total = coalesce(total, 0) + p_net + v_vat,
           invoice_notes = concat_ws(E'\n', nullif(invoice_notes, ''),
             'Includes extra work agreed and signed for on site by ' || coalesce(p_signed_by, 'the customer') || '.'),
           updated_at = now()
     where id = v_draft.id;
    return jsonb_build_object('invoice_id', v_draft.id, 'made', false);
  end if;

  -- Otherwise one draft invoice of the extras, for the office to check.
  select j.id, j.title, j.client, j.client_email, j.client_phone, coalesce(j.customer_id, j.client_id) as customer_id
    into v_job from public.employer_jobs j where j.id = p_job;
  select cp.payment_terms, coalesce(cp.default_vat_registered, false) into v_terms, v_reg
    from public.company_profiles cp where cp.user_id = p_firm limit 1;
  v_days := least(greatest(coalesce(substring(coalesce(v_terms, '') from '(\d+)')::int, 30), 0), 120);
  v_due := now() + make_interval(days => v_days);
  insert into public.quotes (
    user_id, quote_number, client_data, items, settings, subtotal, vat_amount, total,
    status, expiry_date, invoice_raised, invoice_status, invoice_date, invoice_due_date, invoice_notes,
    job_details, employer_job_id, customer_id)
  values (
    p_firm, null,
    jsonb_strip_nulls(jsonb_build_object('name', coalesce(v_job.client, ''),
      'email', nullif(btrim(coalesce(v_job.client_email, '')), ''),
      'phone', nullif(btrim(coalesce(v_job.client_phone, '')), ''),
      'customerId', v_job.customer_id)),
    v_items,
    jsonb_build_object('vatRate', v_rate, 'vatRegistered', v_rate > 0 or v_rc or coalesce(v_reg, false),
                       'reverseCharge', v_rc, 'cisEnabled', false),
    p_net, v_vat, p_net + v_vat,
    'approved', v_due, true, 'draft', now(), v_due,
    'Extra work agreed and signed for on site by ' || coalesce(p_signed_by, 'the customer')
      || '. Drafted by Job done because there was no draft invoice to add it to. Add the main work, or send it on its own.',
    jsonb_build_object('title', coalesce(v_job.title, '') || ': extras agreed on site'),
    p_job, v_job.customer_id)
  returning id into v_id;
  return jsonb_build_object('invoice_id', v_id, 'made', true);
end;
$$;
revoke all on function public._job_done_extras_draft(uuid, uuid, uuid, jsonb, numeric, text) from public, anon, authenticated;

do $$
declare
  d text;
  n int := 0;
begin
  d := pg_get_functiondef('public.complete_job_on_site(uuid, uuid, jsonb)'::regprocedure);
  if position('_job_done_extras_draft' in d) = 0 then
    if position(E'  v_cm jsonb;\nbegin' in d) > 0 then
      d := replace(d, E'  v_cm jsonb;\nbegin', E'  v_cm jsonb;\n  v_x jsonb;\nbegin'); n := n + 1;
    end if;
    if position(E'  -- Gap #3: the customer''s message' in d) > 0 then
      d := replace(d, E'  -- Gap #3: the customer''s message',
        E'  -- Gap #3 / #23: signed extras never end up on no invoice.\n'
        || E'  if v_net > 0 then\n'
        || E'    begin\n'
        || E'      v_x := public._job_done_extras_draft(p_job, w.firm, v_vo, v_extras, v_net, v_cust_name);\n'
        || E'      if (v_x->>''invoice_id'') is not null then\n'
        || E'        v_inv := (v_x->>''invoice_id'')::uuid;\n'
        || E'        v_inv_state := ''drafted'';\n'
        || E'      end if;\n'
        || E'    exception when others then\n'
        || E'      raise warning ''[complete_job_on_site] extras not put on an invoice: %'', sqlerrm;\n'
        || E'    end;\n'
        || E'  end if;\n\n'
        || E'  -- Gap #3: the customer''s message');
      n := n + 1;
    end if;
    if position(E'''customer_message'', v_cm,' in d) > 0 then
      d := replace(d, E'''customer_message'', v_cm,',
        E'''customer_message'', v_cm,\n    ''extras_invoice'', coalesce((v_x->>''made'')::boolean, false),');
      n := n + 1;
    end if;
    if position(E'else '''' end;\n  perform public.notify_employer_bell(' in d) > 0 then
      d := replace(d, E'else '''' end;\n  perform public.notify_employer_bell(',
        E'else '''' end\n    || case when coalesce((v_x->>''made'')::boolean, false) then '' That draft holds only the extras agreed on site: add the main work to it, or send it on its own.'' else '''' end;\n'
        || E'  perform public.notify_employer_bell(');
      n := n + 1;
    end if;
    if n <> 4 then
      raise exception 'complete_job_on_site did not match the expected shape (% of 4 patches)', n;
    end if;
    execute d;
  end if;
end $$;
