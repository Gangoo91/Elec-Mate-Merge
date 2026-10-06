-- ELE-1983 / ELE-1992: get_employer_overview counted any unpaid invoice past
-- its due date as OVERDUE — including drafts that were never sent. For
-- Elec-Mate Ltd all six "overdue" invoices (£5,655) were drafts, so the home
-- screen reported debt nobody owes. Now:
--   * overdue = sent and unpaid (not Paid / Draft / Cancelled / Void) past due;
--   * drafts get their own radar kind 'draft_invoice' ("never sent"), so they
--     still surface — as paperwork, not debt;
--   * invoiced_this_month excludes drafts.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_employer_overview'::regproc);

  v_def := replace(v_def,
    $a$'invoiced_this_month', coalesce(sum(i.amount) filter (where i.created_at >= v_month_start), 0),$a$,
    $a$'invoiced_this_month', coalesce(sum(i.amount) filter (where i.created_at >= v_month_start and i.status not in ('Draft','Cancelled','Void')), 0),$a$);

  v_def := replace(v_def,
    $a$filter (where i.status <> 'Paid' and i.due_date < current_date), 0),$a$,
    $a$filter (where i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date), 0),$a$);
  v_def := replace(v_def,
    $a$'overdue_count', count(*) filter (where i.status <> 'Paid' and i.due_date < current_date)$a$,
    $a$'overdue_count', count(*) filter (where i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date)$a$);

  v_def := replace(v_def,
    $a$    where i.employer_id = v_uid and i.status <> 'Paid' and i.due_date < current_date
$a$,
    $a$    where i.employer_id = v_uid and i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date

    union all
    select
      'draft_invoice', i.id::text,
      coalesce(i.invoice_number, 'Invoice') || ' — ' || coalesce(i.client, 'Client'),
      'Draft · never sent · £' || to_char(i.amount, 'FM999,999,990.00'),
      (current_date - i.created_at::date),
      'amber',
      'financehub',
      i.amount
    from public.employer_invoices_unified() i
    where i.employer_id = v_uid and i.status = 'Draft' and i.created_at < now() - interval '3 days'
$a$);

  execute v_def;
end $$;
