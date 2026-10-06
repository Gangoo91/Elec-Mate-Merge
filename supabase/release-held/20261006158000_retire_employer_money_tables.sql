-- RELEASE-HELD — do NOT apply until the 6 Oct app release is live
-- (release checklist step 6d). The live app's quote list still selects
-- employer_quotes; dropping it first breaks that screen.
--
-- Andrew, 6 Oct: retire the legacy Employer Hub money tables. Every quote and
-- invoice lives in the shared `quotes` table; customers in `customers`.
-- All of these hold 0 rows except employer_clients (3, copied to customers on
-- 6 Oct — re-checked below before the drop).

begin;

-- 1. Legacy public-page RPCs (their pages and link functions are removed).
drop function if exists public.decide_employer_quote(text, text, text);
drop function if exists public.get_employer_quote_by_token(text);
drop function if exists public.get_employer_invoice_by_token(text);

-- 2. Account teardown stops deleting from the dropped tables.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.teardown_employer_tenant(uuid)'::regprocedure);
  v_def := replace(v_def, E'\n  delete from employer_invoice_access t using employer_invoices i\n    where t.invoice_id = i.id and i.employer_id = p_user;', '');
  v_def := replace(v_def, E'\n  delete from employer_quote_acceptances t using employer_quotes q\n    where t.quote_id = q.id and q.employer_id = p_user;', '');
  v_def := replace(v_def, E'\n  delete from employer_quotes where employer_id = p_user;', '');
  v_def := replace(v_def, E'\n  delete from employer_invoices where employer_id = p_user;', '');
  v_def := replace(v_def, E'\n  delete from employer_stripe_connected_accounts where employer_id = p_user;', '');
  if v_def ~ '(employer_quotes|employer_invoices|employer_quote_acceptances|employer_invoice_access|employer_stripe_connected_accounts)' then
    raise exception 'teardown_employer_tenant still references a legacy table';
  end if;
  execute v_def;
end $$;

-- 3. Guard: nothing may be lost.
do $$
begin
  if (select count(*) from public.employer_quotes) > 0
     or (select count(*) from public.employer_invoices) > 0
     or (select count(*) from public.employer_quote_acceptances) > 0
     or (select count(*) from public.employer_invoice_access) > 0
     or (select count(*) from public.employer_stripe_connected_accounts) > 0 then
    raise exception 'A legacy money table has rows — stop and migrate them first';
  end if;
  if exists (
    select 1 from public.employer_clients c
     where not exists (select 1 from public.customers k where k.user_id = c.employer_id and lower(k.name) = lower(c.name))
  ) then
    raise exception 'employer_clients has a row not copied to customers';
  end if;
end $$;

-- 4. Drop (children first). employer_jobs.client_id references employer_clients.
drop table if exists public.employer_quote_acceptances;
drop table if exists public.employer_invoice_access;
drop table if exists public.employer_invoices;   -- references employer_quotes
drop table if exists public.employer_quotes;
drop table if exists public.employer_stripe_connected_accounts;
alter table public.employer_jobs drop constraint if exists employer_jobs_client_id_fkey;
alter table public.employer_leads drop constraint if exists employer_leads_converted_client_id_fkey;
drop table if exists public.employer_clients;

commit;
