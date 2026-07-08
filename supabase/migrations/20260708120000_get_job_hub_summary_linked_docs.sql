-- Extend get_job_hub_summary with the actual linked document lists (quotes +
-- invoices) so the Job Control Centre can show exactly which docs belong to a
-- job, not just totals. Backward compatible — only adds `quotes` and `invoices`
-- arrays to the returned jsonb.
CREATE OR REPLACE FUNCTION public.get_job_hub_summary(p_job_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_job employer_jobs;
begin
  select * into v_job from employer_jobs where id = p_job_id and user_id = auth.uid();
  if v_job is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  return jsonb_build_object(
    'job_value', v_job.value,
    'quote', (
      select case when count(*) = 0 then null else jsonb_build_object(
        'count', count(*),
        'value', coalesce(sum(value), 0),
        'status', (array_agg(status order by created_at desc))[1],
        'quote_number', (array_agg(quote_number order by created_at desc))[1],
        'id', (array_agg(id order by created_at desc))[1]
      ) end
      from employer_quotes where job_id = p_job_id
    ),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id, 'quote_number', quote_number, 'status', status, 'value', coalesce(value, 0)
      ) order by created_at desc)
      from employer_quotes where job_id = p_job_id
    ), '[]'::jsonb),
    'invoiced', coalesce((select sum(amount) from employer_invoices where job_id = p_job_id), 0),
    'paid', coalesce((select sum(amount) from employer_invoices
                      where job_id = p_job_id and paid_date is not null), 0),
    'invoice_count', (select count(*) from employer_invoices where job_id = p_job_id),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id, 'invoice_number', invoice_number, 'status', status,
        'amount', coalesce(amount, 0), 'paid', paid_date is not null
      ) order by created_at desc)
      from employer_invoices where job_id = p_job_id
    ), '[]'::jsonb),
    'labour_hours', coalesce((select sum(total_hours) from employer_timesheets where job_id = p_job_id), 0),
    'labour_cost', coalesce((
      select sum(t.total_hours * coalesce(e.hourly_rate, 0))
      from employer_timesheets t
      left join employer_employees e on e.id = t.employee_id
      where t.job_id = p_job_id), 0),
    'tests_total', (select count(*) from job_tests where job_id = p_job_id),
    'tests_passed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'pass%'),
    'tests_failed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%'),
    'issues_open', (select count(*) from job_issues where job_id = p_job_id
                    and lower(coalesce(status, '')) not in ('resolved', 'closed')),
    'issues_critical', (select count(*) from job_issues where job_id = p_job_id
                        and lower(coalesce(status, '')) not in ('resolved', 'closed')
                        and lower(coalesce(severity, '')) in ('critical', 'high')),
    'budget_total', (select budget_total from job_financials where job_id = p_job_id limit 1),
    'actual_total', (select actual_total from job_financials where job_id = p_job_id limit 1)
  );
end;
$function$;
