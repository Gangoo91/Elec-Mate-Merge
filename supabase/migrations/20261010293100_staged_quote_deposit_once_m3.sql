-- M3 (review of ELE-2065): a quote billed in stages with a paid deposit
-- counted the deposit twice.
--
-- Stage invoices (PaymentStages.tsx) carry settings.stageOf / stageId, never
-- fromQuoteId, so finance_invoice_rows found no carrier for the deposit: the
-- paid deposit invoice showed as its own paid row AND the stage invoices
-- billed 100% of the quote. Worked example, £3,880 in three stages
-- (40 / 40 / 20) with a £500 deposit paid on acceptance:
--   before: stages 1,552 + 1,552 + 776 = 3,880, plus the deposit row 500
--           -> invoiced 4,380 (500 too much), paid 1,000 if the last stage
--              held total_paid 500 (deposit counted twice as paid).
--   after:  the stage that carries the deposit shows its amount less the
--           credit: 1,552 + 1,552 + (776 - 500 = 276) + deposit 500 = 3,880;
--           paid 500 (the deposit, once); balance 1,552 + 1,552 + 276 = 3,380.
--
-- How a stage carries a deposit: PaymentStages now writes
-- settings.depositCredit on each stage invoice it credits (the last stage
-- first, then earlier stages when the deposit is bigger than the last stage),
-- and sets total_paid to the same figure, as the Electrical Hub does for a
-- whole-quote deposit (ELE-1760). Here each such stage takes its credit,
-- capped at its own total and at what is left of the paid deposit, so the
-- credits can never add up to more than the deposit actually paid.
--
-- _quote_invoice_match is stage-aware: for a quote billed in stages it returns
-- the stage invoice carrying the deposit (else the first stage invoice), and
-- the step-3 guess (same total + client) never picks a stage invoice and now
-- needs the same job, or an invoice raised within 90 days of the quote being
-- accepted (L14).
--
-- Additive: both functions keep their signatures and return shapes. Live
-- today: no stage invoices and no staged quotes exist, so the live totals do
-- not move (checked before and after: 1,223 rows, £670,216.70).

create or replace function public._quote_invoice_match(p_quote uuid)
returns uuid
language sql
stable security definer
set search_path to 'public'
as $function$
  with q as (select * from public.quotes where id = p_quote and deleted_at is null)
  select coalesce(
    (select q.id from q where coalesce(q.invoice_raised, false)),
    (select s.id
       from public.quotes s, q
      where s.user_id = q.user_id and s.id <> q.id and s.deleted_at is null
        and coalesce(s.invoice_raised, false)
        and lower(coalesce(s.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
        and (s.settings->>'fromQuoteId' = q.id::text or s.id::text = q.settings->>'convertedInvoiceId')
      order by s.created_at limit 1),
    -- M3: a quote billed in stages is matched by its stage invoices.
    (select s.id
       from public.quotes s, q
      where s.user_id = q.user_id and s.id <> q.id and s.deleted_at is null
        and coalesce(s.invoice_raised, false)
        and lower(coalesce(s.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
        and s.settings->>'stageOf' = q.id::text
      order by (coalesce(public._pb_num(s.settings, 'depositCredit'), 0) > 0) desc, s.created_at limit 1),
    (select s.id
       from public.quotes s, q
      where s.user_id = q.user_id and s.id <> q.id and s.deleted_at is null
        and coalesce(s.invoice_raised, false)
        and lower(coalesce(s.invoice_status, '')) not in ('cancelled', 'canceled', 'void', 'voided')
        and coalesce(s.settings->>'fromQuoteId', '') = ''
        and coalesce(s.settings->>'stageOf', '') = ''
        and not case when jsonb_typeof(q.settings->'stages') = 'array'
                     then jsonb_array_length(q.settings->'stages') > 0 else false end
        and coalesce(s.acceptance_status, '') <> 'accepted' and s.accepted_at is null
        and s.created_at >= q.created_at
        and coalesce(q.total, 0) > 0 and abs(coalesce(s.total, 0) - q.total) < 0.01
        and (s.employer_job_id = q.employer_job_id
             or ((s.customer_id = q.customer_id
                  or lower(btrim(coalesce(s.client_data->>'name', ''))) = lower(btrim(coalesce(q.client_data->>'name', '-'))))
                 and s.created_at <= coalesce(q.accepted_at, q.created_at) + interval '90 days'))
      order by s.created_at limit 1))
$function$;
revoke all on function public._quote_invoice_match(uuid) from public, anon;

create or replace function public.finance_invoice_rows(p_owners uuid[])
returns table(id uuid, owner_id uuid, job_id uuid, customer_id uuid, client text, invoice_number text, project text,
              amount numeric, paid_amount numeric, balance numeric, money_state text, issued_on date, due_on date,
              paid_on date, created_at timestamp with time zone, issued_at timestamp with time zone)
language sql
stable security definer
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
    select d.parent_quote_id as quote_id, sum(d.total) as amt,
           public._quote_invoice_match(d.parent_quote_id) as match_id
      from dep d group by d.parent_quote_id
  ),
  -- M3: stage invoices that carry a share of the paid deposit, in the order
  -- raised, each capped at its own total and at what is left of the deposit.
  stage_raw as (
    select s.id as inv_id, c.quote_id, c.amt as dep_total, s.created_at,
           least(greatest(coalesce(public._pb_num(s.settings, 'depositCredit'), 0), 0),
                 greatest(coalesce(s.total, 0), 0)) as want
      from credit c
      join s on s.state <> 'void' and s.settings->>'stageOf' = c.quote_id::text
     where coalesce(public._pb_num(s.settings, 'depositCredit'), 0) > 0
  ),
  stage_carrier as (
    select r.quote_id, r.inv_id,
           greatest(least(r.want, r.dep_total - coalesce(sum(r.want) over (
             partition by r.quote_id order by r.created_at, r.inv_id
             rows between unbounded preceding and 1 preceding), 0)), 0) as amt
      from stage_raw r
  ),
  whole_carrier as (
    select distinct on (c.quote_id) c.quote_id, s.id as inv_id, c.amt
      from credit c
      join s on s.state <> 'void'
            and coalesce(s.settings->>'stageOf', '') = ''
            and (s.id = c.quote_id or s.settings->>'fromQuoteId' = c.quote_id::text or s.id = c.match_id)
     where not exists (select 1 from stage_raw r where r.quote_id = c.quote_id)
     order by c.quote_id, (s.id = c.quote_id) desc,
              (s.settings->>'fromQuoteId' = c.quote_id::text) desc nulls last, s.created_at
  ),
  carrier as (
    select quote_id, inv_id, amt from whole_carrier
    union all
    select quote_id, inv_id, amt from stage_carrier where amt > 0
  ),
  s2 as (
    select s.*, least(coalesce(cr.amt, 0), greatest(coalesce(s.total, 0), 0)) as dep_credit
      from s left join (select inv_id, sum(amt) as amt from carrier group by inv_id) cr on cr.inv_id = s.id
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
