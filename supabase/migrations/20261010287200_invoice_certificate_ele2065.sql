-- ELE-2065 / gap analysis §3A #12: a certificate never travelled with a Hub
-- invoice. Nothing in the Employer Hub set quotes.linked_certificate_id, so
-- "hold the certificate until paid" (the release-certificate function, fired by
-- trg_quotes_cert_release when invoice_paid_at is stamped) could never work for
-- a firm, and the invoice email never carried the certificate.
--
-- Uses the existing machinery only; no edge function changes:
--   * linked_certificate_id / _type / _reference / _pdf_url on the invoice row,
--     the same fields the Electrical Hub's invoice builder writes;
--   * certificate_release_mode 'with_invoice' (send-invoice-resend attaches it)
--     or 'on_payment' (held; release-certificate emails it once paid).
--
-- New functions (additive):
--   get_job_invoice_certificates(job) the job's certificates that are ready to
--     send (completed, and signed off where a QS review exists) and its
--     invoices with what each carries. For the invoice sheet and the
--     certificate's Next steps.
--   set_invoice_certificate(invoice, report, mode) puts one of the job's ready
--     certificates on one of its invoices, or takes it off (null report).
--     Refuses a certificate from another job, an invoice already paid when
--     asking to hold, and any change once the certificate has been released.
-- Firm managers only (my_employer_scope); crew are not in it.

create or replace function public._cert_type_label(p_type text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case
    when lower(coalesce(p_type, '')) like 'eicr%' then 'EICR'
    when lower(coalesce(p_type, '')) like 'eic%' then 'EIC'
    when lower(coalesce(p_type, '')) like 'minor%' then 'Minor Works'
    when lower(coalesce(p_type, '')) like '%fire%' then 'Fire alarm certificate'
    when lower(coalesce(p_type, '')) like '%emergency%' then 'Emergency lighting certificate'
    when lower(coalesce(p_type, '')) like '%pat%' then 'PAT record'
    when lower(coalesce(p_type, '')) like '%ev%' then 'EV charger certificate'
    when lower(coalesce(p_type, '')) like '%solar%' or lower(coalesce(p_type, '')) like '%pv%' then 'Solar PV certificate'
    else 'Certificate'
  end;
$$;
revoke all on function public._cert_type_label(text) from public, anon;

create or replace function public.get_job_invoice_certificates(p_job_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_job public.employer_jobs;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select * into v_job from public.employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job.id is null then
    return jsonb_build_object('certificates', '[]'::jsonb, 'invoices', '[]'::jsonb);
  end if;

  return jsonb_build_object(
    'certificates', coalesce((
      select jsonb_agg(jsonb_build_object(
               'report_uuid', c.id, 'report_id', c.report_id,
               'label', public._cert_type_label(c.report_type),
               'reference', coalesce(nullif(c.certificate_number, ''), c.report_id),
               'has_pdf', c.pdf_url is not null,
               'client_name', c.client_name,
               'updated_at', c.updated_at) order by c.updated_at desc)
        from (
          select r.*,
                 (select q.status from public.report_qs_reviews q
                   where q.report_uuid = r.id and q.status <> 'cancelled'
                   order by q.created_at desc limit 1) as qs_status
            from public.employer_job_certificates l
            join public.reports r on r.id = l.report_uuid and r.deleted_at is null
           where l.job_id = p_job_id
        ) c
       where c.status = 'completed' and (c.qs_status is null or c.qs_status = 'approved')
    ), '[]'::jsonb),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q.id, 'invoice_number', q.invoice_number,
               'paid', q.invoice_paid_at is not null or lower(coalesce(q.invoice_status, '')) = 'paid',
               'status', initcap(coalesce(q.invoice_status, 'draft')),
               'linked_certificate_id', q.linked_certificate_id,
               'linked_certificate_label', q.linked_certificate_type,
               'linked_certificate_reference', q.linked_certificate_reference,
               'mode', coalesce(q.certificate_release_mode, 'with_invoice'),
               'released_at', q.certificate_released_at) order by q.created_at desc)
        from public.quotes q
       where q.employer_job_id = p_job_id and q.user_id = v_job.user_id
         and q.deleted_at is null and coalesce(q.invoice_raised, false)
         and lower(coalesce(q.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
    ), '[]'::jsonb));
end;
$$;
revoke all on function public.get_job_invoice_certificates(uuid) from public, anon;
grant execute on function public.get_job_invoice_certificates(uuid) to authenticated;
comment on function public.get_job_invoice_certificates(uuid) is
  'ELE-2065 §3A #12: a firm job''s ready-to-send certificates (completed; QS approved where reviewed) and its live invoices with the certificate each carries and how (with_invoice / on_payment). Firm managers only.';

create or replace function public.set_invoice_certificate(p_invoice_id uuid, p_report_uuid uuid, p_mode text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  inv public.quotes;
  r public.reports;
  v_qs text;
  v_paid boolean;
  v_mode text := case when p_mode in ('with_invoice', 'on_payment') then p_mode end;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select * into inv from public.quotes where id = p_invoice_id and deleted_at is null for update;
  if inv.id is null or inv.user_id not in (select public.my_employer_scope())
     or not coalesce(inv.invoice_raised, false) then
    raise exception 'Invoice not found.' using errcode = '42501';
  end if;
  if inv.certificate_released_at is not null then
    raise exception 'The certificate on this invoice has already been sent.' using errcode = '22023';
  end if;
  v_paid := inv.invoice_paid_at is not null or lower(coalesce(inv.invoice_status, '')) = 'paid';

  -- Take it off.
  if p_report_uuid is null then
    update public.quotes
       set linked_certificate_id = null, linked_certificate_type = null,
           linked_certificate_reference = null, linked_certificate_pdf_url = null,
           certificate_release_mode = 'with_invoice'
     where id = inv.id;
    return jsonb_build_object('invoice_id', inv.id, 'linked', false);
  end if;

  if v_mode is null then
    raise exception 'Choose when the certificate goes.' using errcode = '22023';
  end if;
  if inv.employer_job_id is null then
    raise exception 'Put the invoice on a job first.' using errcode = '22023';
  end if;
  select r2.* into r
    from public.employer_job_certificates l
    join public.reports r2 on r2.id = l.report_uuid and r2.deleted_at is null
   where l.job_id = inv.employer_job_id and l.report_uuid = p_report_uuid
   limit 1;
  if r.id is null then
    raise exception 'That certificate isn''t on this invoice''s job.' using errcode = '22023';
  end if;
  select q.status into v_qs from public.report_qs_reviews q
   where q.report_uuid = r.id and q.status <> 'cancelled' order by q.created_at desc limit 1;
  if r.status <> 'completed' or (v_qs is not null and v_qs <> 'approved') then
    raise exception 'Finish the certificate (and its QS sign-off) before it goes with an invoice.' using errcode = '22023';
  end if;
  if v_mode = 'on_payment' and v_paid then
    raise exception 'This invoice is already paid. Send the certificate from its Next steps instead.' using errcode = '22023';
  end if;

  update public.quotes
     set linked_certificate_id = coalesce(nullif(r.report_id, ''), r.id::text),
         linked_certificate_type = public._cert_type_label(r.report_type),
         linked_certificate_reference = coalesce(nullif(r.certificate_number, ''), r.report_id),
         linked_certificate_pdf_url = r.pdf_url,
         certificate_release_mode = v_mode
   where id = inv.id;

  return jsonb_build_object('invoice_id', inv.id, 'linked', true, 'mode', v_mode,
                            'label', public._cert_type_label(r.report_type),
                            'reference', coalesce(nullif(r.certificate_number, ''), r.report_id),
                            'has_pdf', r.pdf_url is not null);
end;
$$;
revoke all on function public.set_invoice_certificate(uuid, uuid, text) from public, anon;
grant execute on function public.set_invoice_certificate(uuid, uuid, text) to authenticated;
comment on function public.set_invoice_certificate(uuid, uuid, text) is
  'ELE-2065 §3A #12: put one of the job''s finished certificates on one of its invoices (linked_certificate_*), sent with the invoice (with_invoice) or held until paid (on_payment, released by release-certificate). Null report takes it off. Firm managers only.';
