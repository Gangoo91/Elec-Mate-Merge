-- ELE-2065 / gap #1, journey break A4: a deposit the customer paid when they
-- accepted the quote lives in the `invoices` table (accept-quote-public,
-- ELE-954; DEP-… numbers), and no Employer Hub money screen read it. Paid this
-- month, the ledger, client and job money all missed real cash.
--
-- finance_invoice_rows is the one row source every money screen reads
-- (get_finance_summary, get_job_finance, get_employer_ledger, debtors, client
-- summaries, the job hub). Same signature; two changes:
--
--   1. A PAID deposit invoice is a row of its own: amount = paid = the deposit,
--      paid_on = the day it was paid. Unpaid deposit requests are left out
--      (they are not cash, and they are not on the debtors list either).
--   2. The final invoice that carries that deposit (the quote row itself when
--      the Electrical Hub converted it in place, or the Hub invoice whose
--      settings.fromQuoteId is the quote) is netted: amount and paid exclude
--      the deposit, and its balance is total − max(total_paid, deposit), the
--      same max() rule generate-pdf-monkey uses, so a deposit recorded as
--      total_paid too is never taken off twice. Only the first live final
--      invoice per quote is netted.
--
-- So deposit + final always add up to the quote total, cash lands in the month
-- it arrived, and nothing is counted twice. Consumers that join quotes on the
-- row id (debtors, money chase, accounting sync, job money status) never see
-- the deposit rows, which have no quotes row.

create or replace function public.finance_invoice_rows(p_owners uuid[])
returns table(id uuid, owner_id uuid, job_id uuid, customer_id uuid, client text, invoice_number text,
              project text, amount numeric, paid_amount numeric, balance numeric, money_state text,
              issued_on date, due_on date, paid_on date, created_at timestamp with time zone,
              issued_at timestamp with time zone)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with base as (
    select q.*,
           lower(coalesce(nullif(q.invoice_status, ''), 'draft')) as st,
           (now() at time zone 'Europe/London')::date as today
      from public.quotes q
     where q.user_id = any (p_owners)
       and q.deleted_at is null
       and coalesce(q.invoice_raised, false)
  ), s as (
    select b.*,
           case
             when b.st in ('cancelled', 'canceled', 'void', 'voided', 'written_off', 'written off') then 'void'
             when b.invoice_paid_at is not null or b.st = 'paid' then 'paid'
             when b.st = 'draft' then 'draft'
             when b.st = 'overdue'
               or (b.invoice_due_date is not null
                   and (b.invoice_due_date at time zone 'Europe/London')::date < b.today) then 'overdue'
             else 'sent'
           end as state
      from base b
  ),
  -- Paid deposit invoices, owner-scoped, on a live quote.
  dep as (
    select i.id, i.user_id, i.parent_quote_id, i.invoice_number, i.client_data, coalesce(i.total, 0) as total,
           coalesce(i.paid_at, i.invoice_date, i.created_at) as paid_ts,
           coalesce(i.invoice_date, i.created_at) as issued_ts, i.due_date, i.created_at,
           pq.employer_job_id as pq_job, pq.customer_id as pq_customer, pq.job_details as pq_details
      from public.invoices i
      join public.quotes pq on pq.id = i.parent_quote_id and pq.deleted_at is null
     where i.deposit_for_quote is true
       and i.deleted_at is null
       and i.user_id = any (p_owners)
       and (i.paid_at is not null or lower(coalesce(i.status, '')) = 'paid')
       and lower(coalesce(i.status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
  ),
  credit as (
    select d.parent_quote_id as quote_id, sum(d.total) as amt from dep d group by d.parent_quote_id
  ),
  -- The one final invoice per quote that carries its deposit.
  carrier as (
    select distinct on (c.quote_id) c.quote_id, s.id as inv_id, c.amt
      from credit c
      join s on s.state <> 'void'
            and (s.id = c.quote_id or s.settings->>'fromQuoteId' = c.quote_id::text)
     order by c.quote_id, (s.id = c.quote_id) desc, s.created_at
  ),
  s2 as (
    select s.*, least(coalesce(cr.amt, 0), greatest(coalesce(s.total, 0), 0)) as dep_credit
      from s left join carrier cr on cr.inv_id = s.id
  )
  select s.id, s.user_id, s.employer_job_id, s.customer_id,
         coalesce(nullif(s.client_data ->> 'name', ''), 'Client'),
         coalesce(s.invoice_number, s.quote_number),
         nullif(s.job_details ->> 'title', ''),
         coalesce(s.total, 0) - s.dep_credit,
         case
           when s.state = 'paid' and s.dep_credit > 0
             then greatest(greatest(coalesce(s.total_paid, 0), coalesce(s.total, 0)) - s.dep_credit, 0)
           when s.state = 'paid' then coalesce(nullif(s.total_paid, 0), s.total, 0)
           else greatest(least(greatest(coalesce(s.total_paid, 0), 0), coalesce(s.total, 0)) - s.dep_credit, 0)
         end,
         case when s.state in ('sent', 'overdue')
              then greatest(coalesce(s.total, 0) - greatest(coalesce(s.total_paid, 0), s.dep_credit), 0)
              else 0 end,
         s.state,
         (coalesce(s.invoice_date, s.created_at) at time zone 'Europe/London')::date,
         (s.invoice_due_date at time zone 'Europe/London')::date,
         case when s.state = 'paid'
              then (coalesce(s.invoice_paid_at,
                             least(s.invoice_due_date, now()),
                             s.invoice_date, s.created_at) at time zone 'Europe/London')::date
         end,
         s.created_at,
         coalesce(s.invoice_date, s.created_at)
    from s2 s
  union all
  select d.id, d.user_id, d.pq_job, d.pq_customer,
         coalesce(nullif(d.client_data ->> 'name', ''), 'Client'),
         coalesce(nullif(d.invoice_number, ''), 'Deposit'),
         nullif(d.pq_details ->> 'title', ''),
         d.total, d.total, 0::numeric, 'paid'::text,
         (d.issued_ts at time zone 'Europe/London')::date,
         (d.due_date at time zone 'Europe/London')::date,
         (d.paid_ts at time zone 'Europe/London')::date,
         d.created_at, d.issued_ts
    from dep d;
$function$;
