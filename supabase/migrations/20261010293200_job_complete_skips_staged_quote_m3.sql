-- M3 (review of ELE-2065): completing a job billed in stages drafted a 100%
-- invoice.
--
-- trg_automation_job_complete (zz_automation_job_complete on employer_jobs,
-- last set in 20261010275050) picked the job's accepted quote and drafted an
-- invoice for the whole of it, even when the quote carries settings.stages and
-- its stages raise their own invoices (PaymentStages.tsx). CreateInvoiceDialog
-- already leaves staged quotes out (src/components/employer/dialogs/
-- CreateInvoiceDialog.tsx, approvedQuotes). Now the trigger does the same: a
-- job with a staged quote gets no automatic draft, and the run says why. It
-- does not fall through to the job-value draft either.
--
-- Patched in place by text replacement (two exact strings, checked). The
-- trigger and its WHEN clause are unchanged. Proven before applying with
-- rolled-back status updates as an authenticated owner and as service role.

do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.trg_automation_job_complete()'::regprocedure);
  if position('is billed in stages' in d) > 0 then return; end if;
  n := replace(d,
$a$          perform public._automation_finish(v_run, 'skipped', 'No draft made: ' || v_title || ' already has an invoice.');
        else
$a$,
$a$          perform public._automation_finish(v_run, 'skipped', 'No draft made: ' || v_title || ' already has an invoice.');
        elsif exists (select 1 from public.quotes x
                       where x.employer_job_id = new.id and x.deleted_at is null
                         and not coalesce(x.invoice_raised, false)
                         and coalesce(x.settings->>'stageOf', '') = ''
                         and case when jsonb_typeof(x.settings->'stages') = 'array'
                                  then jsonb_array_length(x.settings->'stages') > 0 else false end) then
          perform public._automation_finish(v_run, 'skipped',
            'No draft made: ' || v_title || ' is billed in stages. Raise each stage from the job.');
        else
$a$);
  n := replace(n,
$a$             and coalesce(x.settings->>'convertedInvoiceId', '') = ''
$a$,
$a$             and coalesce(x.settings->>'convertedInvoiceId', '') = ''
             and not case when jsonb_typeof(x.settings->'stages') = 'array'
                          then jsonb_array_length(x.settings->'stages') > 0 else false end
$a$);
  if position('is billed in stages' in n) = 0 or position($a$then jsonb_array_length(x.settings->'stages') > 0 else false end
$a$ in n) = 0 then
    raise exception 'trg_automation_job_complete patch did not apply';
  end if;
  execute n;
end
$mig$;
