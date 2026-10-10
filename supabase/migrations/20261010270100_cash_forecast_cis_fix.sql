-- ELE-2074 fix: get_cash_forecast, three corrections (same signature).
--
-- 1. Subcontractor CIS was counted twice. Labour went out at gross cost AND the
--    CIS deduction went out again to HMRC on the 22nd. Subcontractors are paid
--    gross less CIS, so labour now goes out net of the CIS on their timesheets
--    (rate from their CIS status: gross 0%, standard 20%, otherwise 30%), and
--    the HMRC payment stays. A tax month with no payment statements uses the
--    subcontractor timesheets for that month instead of £0.
--      Example: a subbie at £1,000 a week on standard (20%) was £1,000 labour
--      + £200 CIS = £1,200 out a week. Now £800 to the subbie + £200 to HMRC
--      = £1,000, which is what actually leaves the bank.
-- 2. CIS withheld from the firm's own sales invoices was not taken off. A CIS
--    customer pays the invoice less the deduction (paid to HMRC for the firm,
--    credited against its own tax), so money in is the balance less the CIS
--    (_doc_cis_amount, the same figure the invoice shows), floored at 0, and
--    the same for the balance on booked CIS work.
--      Example: invoice £1,200 (£1,000 labour + £200 VAT), unpaid, CIS 20%
--      of the £1,000 labour = £200, so money in is £1,000, not £1,200.
-- 3. Owner items: a one-off already in the bank balance was counted again,
--    and a weekly item stopped after 121 weeks (about 2.3 years) because the
--    series always started at the first date. Items now count only from the
--    day after the balance was taken (from today when there is no balance
--    date; at most 60 days back), and each series starts near the window.
--
-- Additive: replaces a function new this week; neither HEAD nor iOS build 49
-- calls it. Same arguments and return type.

create or replace function public.get_cash_forecast(p_firm uuid, p_today date default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_today date := coalesce(p_today, (now() at time zone 'Europe/London')::date);
  v_end date := coalesce(p_today, (now() at time zone 'Europe/London')::date) + 55;
  v_set record;
  v_cp record;
  v_terms int;
  v_labour_week numeric;
  v_cis_week numeric;
  v_from date;
  v_items jsonb;
  v_weeks jsonb;
  v_low jsonb;
  v_open numeric;
begin
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  select * into v_set from employer_cash_settings s where s.employer_id = p_firm;
  select c.pay_frequency, c.payment_terms into v_cp from company_profiles c where c.user_id = p_firm limit 1;
  v_terms := coalesce(nullif(substring(coalesce(v_cp.payment_terms, '') from '(\d{1,3})'), '')::int, 30);
  v_open := coalesce(v_set.opening_balance, 0);

  -- Labour at cost over the last 4 weeks. Subcontractors are paid net of CIS
  -- (the deduction goes to HMRC on the 22nd, below), so it comes off here.
  select round(coalesce(sum(l.cost), 0) / 4, 2),
         round(coalesce(sum(l.cost * public.cis_rate_for(coalesce(tm.cis_status, 'unverified')))
                          filter (where e.team_role = 'Subcontractor'), 0) / 4, 2)
    into v_labour_week, v_cis_week
    from public.finance_labour_rows(array[p_firm], v_today - 28, v_today - 1) l
    join public.employer_employees e on e.id = l.employee_id
    left join public.employer_subcontractor_terms tm on tm.roster_id = e.id;
  v_labour_week := greatest(v_labour_week - v_cis_week, 0);

  -- Owner items already in the bank balance are not counted again: only dates
  -- after the day the balance was taken (and from today when there is none).
  v_from := case when v_set.balance_on is not null and v_set.balance_on < v_today
                 then greatest(v_set.balance_on + 1, v_today - 60) else v_today end;

  with
  inv_all as (
    select i.*,
           coalesce(public._doc_cis_amount(q.items, q.settings,
                                           coalesce(q.total - coalesce(q.vat_amount, 0), q.subtotal)), 0) as cis
      from public.finance_invoice_rows(array[p_firm]) i
      join public.quotes q on q.id = i.id
  ),
  late as (
    select coalesce(i.customer_id::text, lower(i.client)) as k,
           round(avg(i.paid_on - i.due_on))::int as days, count(*) as n
      from inv_all i
     where i.money_state = 'paid' and i.due_on is not null and i.paid_on is not null
     group by 1
  ),
  q_booked as (
    select q.*, j.start_date as job_start, j.end_date as job_end,
           coalesce(q.customer_id::text, lower(coalesce(nullif(q.client_data->>'name', ''), 'Client'))) as k
      from quotes q
      left join employer_jobs j on j.id = q.employer_job_id
     where q.user_id = p_firm and q.deleted_at is null
       and not coalesce(q.invoice_raised, false)
       and coalesce(q.acceptance_status, '') in ('accepted', 'accepted_pending_deposit')
       and lower(coalesce(q.status, '')) not in ('converted', 'cancelled', 'canceled', 'rejected', 'declined', 'expired')
  ),
  raw as (
    -- Invoices out there
    select 'in'::text as direction, 'invoice'::text as kind,
           i.client || coalesce(' · ' || i.invoice_number, '') as label,
           (coalesce(i.due_on, i.issued_on + v_terms) + coalesce(l.days, 0)) as d,
           greatest(i.balance - i.cis, 0)::numeric as amount,
           case when i.cis > 0 then 'Less £' || trim(to_char(i.cis, 'FM999999990.00')) || ' CIS. ' else '' end ||
           case when l.n is null then 'Due ' || to_char(coalesce(i.due_on, i.issued_on + v_terms), 'FMDD Mon') || ', no payment history'
                when l.days > 0 then 'Due ' || to_char(coalesce(i.due_on, i.issued_on + v_terms), 'FMDD Mon') || ', usually pays ' || l.days || ' day' || case when l.days = 1 then '' else 's' end || ' late'
                when l.days < 0 then 'Due ' || to_char(coalesce(i.due_on, i.issued_on + v_terms), 'FMDD Mon') || ', usually pays ' || abs(l.days) || ' day' || case when abs(l.days) = 1 then '' else 's' end || ' early'
                else 'Due ' || to_char(coalesce(i.due_on, i.issued_on + v_terms), 'FMDD Mon') || ', usually pays on time' end as note,
           i.id as ref
      from inv_all i
      left join late l on l.k = coalesce(i.customer_id::text, lower(i.client))
     where i.money_state in ('sent', 'overdue') and i.balance > 0

    union all
    -- Deposits still to come on booked work
    select 'in', 'deposit',
           coalesce(nullif(q.client_data->>'name', ''), 'Client') || coalesce(' · ' || q.quote_number, ''),
           coalesce(q.booked_slot_start::date, q.proposed_start_date, q.requested_start_date, q.job_start, v_today),
           round(q.deposit_amount_pennies / 100.0, 2),
           'Deposit on accepted quote', q.id
      from q_booked q
     where coalesce(q.deposit_required, false) and q.deposit_paid_at is null
       and q.deposit_invoice_id is null and coalesce(q.deposit_amount_pennies, 0) > 0

    union all
    -- The balance on booked work, once the job has an end date
    select 'in', 'booked',
           coalesce(nullif(q.client_data->>'name', ''), 'Client') || coalesce(' · ' || q.quote_number, ''),
           q.job_end + v_terms + coalesce(l.days, 0),
           greatest(round(coalesce(q.total, 0) - case when coalesce(q.deposit_required, false)
                                             then coalesce(q.deposit_amount_pennies, 0) / 100.0 else 0 end
                          - coalesce(public._doc_cis_amount(q.items, q.settings,
                                       coalesce(q.total - coalesce(q.vat_amount, 0), q.subtotal)), 0), 2), 0),
           case when coalesce(public._doc_flag(q.settings, 'cisEnabled'), false) then 'Less CIS. ' else '' end ||
           'Job ends ' || to_char(q.job_end, 'FMDD Mon') || ', invoiced then on ' || v_terms || '-day terms',
           q.id
      from q_booked q
      left join late l on l.k = q.k
     where q.job_end is not null

    union all
    -- CIS to HMRC on the 22nd
    select 'out', 'cis', 'CIS to HMRC',
           c.pay_by,
           c.amount,
           case when c.estimated then 'Estimate from the last month: ' || to_char(c.m_start, 'FMDD Mon') || ' to ' || to_char(c.m_end, 'FMDD Mon') || ' has not ended'
                else 'Deducted ' || to_char(c.m_start, 'FMDD Mon') || ' to ' || to_char(c.m_end, 'FMDD Mon') end,
           null::uuid
      from (
        select x.pay_by, x.m_start, x.m_end, x.m_end >= v_today as estimated,
               coalesce((select sum(s.cis_deduction) from employer_subcontractor_statements s
                          where s.employer_id = p_firm and s.voided_at is null
                            and s.period_end between y.a and y.b),
                        (select round(sum(l.cost * public.cis_rate_for(coalesce(tm.cis_status, 'unverified'))), 2)
                           from public.finance_labour_rows(array[p_firm], y.a, y.b) l
                           join public.employer_employees e on e.id = l.employee_id and e.team_role = 'Subcontractor'
                           left join public.employer_subcontractor_terms tm on tm.roster_id = e.id), 0) as amount
          from (
            select (date_trunc('month', g)::date + 21) as pay_by,
                   (date_trunc('month', g)::date + 4) as m_end,
                   ((date_trunc('month', g) - interval '1 month')::date + 5) as m_start
              from generate_series(date_trunc('month', v_today), date_trunc('month', v_end), interval '1 month') g
          ) x
          cross join lateral (
            select case when x.m_end >= v_today then (x.m_start - interval '1 month')::date else x.m_start end as a,
                   case when x.m_end >= v_today then (x.m_start - 1) else x.m_end end as b
          ) y
         where x.pay_by between v_today and v_end
           and not exists (select 1 from employer_cis_returns r
                            where r.employer_id = p_firm and r.tax_month_end = x.m_end and r.paid_on is not null)
      ) c
     where c.amount > 0

    union all
    -- VAT for the quarter
    select 'out', 'vat', 'VAT return',
           v.due, v.amount,
           'Quarter ' || to_char(v.q_start, 'FMDD Mon') || ' to ' || to_char(v.q_end, 'FMDD Mon YYYY')
             || case when v.q_end >= v_today then ', so far' else '' end,
           null::uuid
      from (
        select x.q_start, x.q_end, x.due,
               round(
                 coalesce((select sum(coalesce(q.vat_amount, 0)) from quotes q
                            where q.user_id = p_firm and q.deleted_at is null and coalesce(q.invoice_raised, false)
                              and lower(coalesce(q.invoice_status, 'draft')) not in ('draft', 'cancelled', 'canceled', 'void', 'voided')
                              and (coalesce(q.invoice_date, q.created_at) at time zone 'Europe/London')::date between x.q_start and x.q_end), 0)
               - coalesce((select sum(coalesce(mo.vat_amount, 0)) from employer_material_orders mo
                            where mo.employer_id = p_firm
                              and lower(coalesce(mo.status, '')) not in ('draft', 'cancelled', 'canceled')
                              and coalesce(mo.order_date, (mo.created_at at time zone 'Europe/London')::date) between x.q_start and x.q_end), 0)
               , 2) as amount
          from (
            select (date_trunc('month', e) - interval '2 months')::date as q_start,
                   (date_trunc('month', e) + interval '1 month' - interval '1 day')::date as q_end,
                   (date_trunc('month', e) + interval '2 months' + interval '6 days')::date as due
              from generate_series(date_trunc('month', v_today) - interval '3 months',
                                   date_trunc('month', v_end), interval '1 month') e
             where v_set.vat_stagger is not null
               and ((extract(month from e)::int - v_set.vat_stagger - 2 + 12) % 3) = 0
          ) x
         where x.due between v_today and v_end
      ) v
     where v.amount > 0

    union all
    -- Supplier bills
    select 'out', 'supplier',
           coalesce(sup.name, 'Supplier') || coalesce(' · ' || mo.order_number, ''),
           coalesce(mo.order_date, (mo.created_at at time zone 'Europe/London')::date) + coalesce(v_set.supplier_terms_days, 30),
           round(coalesce((select sum(coalesce(b.invoice_total, 0)) from employer_supplier_invoices b where b.order_id = mo.id),
                          mo.total, 0), 2),
           'Ordered ' || to_char(coalesce(mo.order_date, (mo.created_at at time zone 'Europe/London')::date), 'FMDD Mon')
             || ', ' || coalesce(v_set.supplier_terms_days, 30) || '-day terms',
           mo.id
      from employer_material_orders mo
      left join employer_suppliers sup on sup.id = mo.supplier_id
     where mo.employer_id = p_firm
       and lower(coalesce(mo.status, '')) not in ('draft', 'cancelled', 'canceled')
       and coalesce(mo.order_date, (mo.created_at at time zone 'Europe/London')::date) + coalesce(v_set.supplier_terms_days, 30)
           between v_today and v_end

    union all
    -- Labour
    select 'out', 'labour', 'Wages and labour', p.d, p.amount, p.note, null::uuid
      from (
        select v_today + (w * 7) + 6 as d, v_labour_week as amount,
               'Weekly, from the last 4 weeks of approved timesheets' as note
          from generate_series(0, 7) w
         where coalesce(v_cp.pay_frequency, 'weekly') = 'weekly'
        union all
        select v_today + (w * 7) + 6, v_labour_week * 2,
               'Fortnightly, from the last 4 weeks of approved timesheets'
          from generate_series(1, 7, 2) w
         where v_cp.pay_frequency = 'fortnightly'
        union all
        select v_today + (w * 7) + 6, v_labour_week * 4,
               'Every 4 weeks, from the last 4 weeks of approved timesheets'
          from generate_series(3, 7, 4) w
         where v_cp.pay_frequency = 'four_weekly'
        union all
        select coalesce(public._firm_payday(p_firm, (m + interval '1 month' - interval '1 day')::date),
                        (m + interval '1 month' - interval '1 day')::date),
               round(v_labour_week * 52 / 12, 2),
               'Monthly payday, from the last 4 weeks of approved timesheets'
          from generate_series(date_trunc('month', v_today), date_trunc('month', v_end), interval '1 month') m
         where v_cp.pay_frequency = 'monthly'
      ) p
     where p.amount > 0 and p.d between v_today and v_end

    union all
    -- What the owner told us about
    select ci.direction, ci.kind, ci.label, o.d, ci.amount::numeric,
           case ci.repeat when 'weekly' then 'Every week' when 'monthly' then 'Every month'
                          when 'quarterly' then 'Every quarter' else 'Added by you' end,
           ci.id
      from employer_cash_items ci
      -- Start the series near the window, however long ago the first date was.
      cross join lateral (
        select greatest(0, case ci.repeat
                 when 'weekly' then (v_from - ci.first_date) / 7 - 1
                 when 'monthly' then (extract(year from age(v_from, ci.first_date)) * 12
                                      + extract(month from age(v_from, ci.first_date)))::int - 1
                 when 'quarterly' then ((extract(year from age(v_from, ci.first_date)) * 12
                                        + extract(month from age(v_from, ci.first_date)))::int / 3) - 1
                 else 0 end) as n0
      ) s0
      cross join lateral (
        select (ci.first_date + (n * case ci.repeat when 'weekly' then interval '7 days'
                                                   when 'monthly' then interval '1 month'
                                                   when 'quarterly' then interval '3 months'
                                                   else interval '0' end))::date as d
          from generate_series(s0.n0, s0.n0 + case ci.repeat when 'weekly' then 20 when 'monthly' then 6
                                                             when 'quarterly' then 3 else 0 end) n
      ) o
     where ci.employer_id = p_firm
       and o.d between v_from and v_end
       and (ci.end_date is null or o.d <= ci.end_date)
  ),
  placed as (
    select r.*,
           least(greatest(((r.d - v_today) / 7) + 1, 1), 8) as week,
           r.d < v_today as late
      from raw r
     where r.amount > 0 and r.d <= v_end
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'direction', p.direction, 'kind', p.kind, 'label', p.label, 'date', p.d,
           'amount', round(p.amount, 2), 'note', p.note, 'week', p.week, 'late', p.late, 'ref', p.ref)
           order by p.week, p.direction, p.d, p.amount desc), '[]'::jsonb)
    into v_items
    from placed p;

  -- Weeks with a running balance.
  with w as (
    select n, v_today + (n - 1) * 7 as ws, v_today + (n - 1) * 7 + 6 as we
      from generate_series(1, 8) n
  ), sums as (
    select w.n, w.ws, w.we,
           coalesce((select sum((x->>'amount')::numeric) from jsonb_array_elements(v_items) x
                      where (x->>'week')::int = w.n and x->>'direction' = 'in'), 0) as money_in,
           coalesce((select sum((x->>'amount')::numeric) from jsonb_array_elements(v_items) x
                      where (x->>'week')::int = w.n and x->>'direction' = 'out'), 0) as money_out
      from w
  ), run as (
    select s.*, v_open + sum(s.money_in - s.money_out) over (order by s.n) as balance from sums s
  )
  select jsonb_agg(jsonb_build_object('week', n, 'start', ws, 'end', we,
                                      'money_in', round(money_in, 2), 'money_out', round(money_out, 2),
                                      'net', round(money_in - money_out, 2), 'balance', round(balance, 2))
                   order by n)
    into v_weeks
    from run;

  -- The low point and the biggest payments out in that week.
  select jsonb_build_object(
           'week', (x->>'week')::int, 'start', x->>'start', 'end', x->>'end',
           'balance', (x->>'balance')::numeric,
           'drivers', coalesce((select jsonb_agg(i order by (i->>'amount')::numeric desc)
                                  from (select i from jsonb_array_elements(v_items) i
                                         where (i->>'week')::int = (x->>'week')::int
                                           and i->>'direction' = 'out'
                                         order by (i->>'amount')::numeric desc limit 3) t), '[]'::jsonb))
    into v_low
    from jsonb_array_elements(v_weeks) x
   order by (x->>'balance')::numeric asc, (x->>'week')::int asc
   limit 1;

  return jsonb_build_object(
    'today', v_today,
    'end', v_end,
    'opening_balance', v_set.opening_balance,
    'balance_on', v_set.balance_on,
    'has_balance', v_set.opening_balance is not null,
    'weeks', v_weeks,
    'items', v_items,
    'low', v_low,
    'totals', jsonb_build_object(
      'money_in', (select coalesce(sum((x->>'money_in')::numeric), 0) from jsonb_array_elements(v_weeks) x),
      'money_out', (select coalesce(sum((x->>'money_out')::numeric), 0) from jsonb_array_elements(v_weeks) x)),
    'assumptions', jsonb_build_object(
      'labour_weekly', v_labour_week,
      'cis_withheld_weekly', v_cis_week,
      'pay_frequency', coalesce(v_cp.pay_frequency, 'weekly'),
      'payment_terms_days', v_terms,
      'supplier_terms_days', coalesce(v_set.supplier_terms_days, 30),
      'vat_stagger', v_set.vat_stagger),
    'settings', case when v_set.employer_id is null then null else jsonb_build_object(
      'opening_balance', v_set.opening_balance, 'balance_on', v_set.balance_on,
      'vat_stagger', v_set.vat_stagger, 'supplier_terms_days', v_set.supplier_terms_days) end
  );
end;
$$;

revoke all on function public.get_cash_forecast(uuid, date) from public, anon;
grant execute on function public.get_cash_forecast(uuid, date) to authenticated;
