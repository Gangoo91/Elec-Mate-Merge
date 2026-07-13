-- ELE-1321 — auto-link quotes/invoices to CRM customers, mirroring the
-- reports_auto_link_customer trigger that already runs on `reports`.
-- Without this, invoices created after the 2026-07-08 backfill never link
-- (bit Mark Glowacki: S406/S418/S419 unlinked despite matching customers).
--
-- Match strategy: client_data->>'email' first (strongest signal), then a
-- unique case/whitespace-insensitive name match. Ambiguous matches are left
-- unlinked rather than guessed.
--
-- Rollback:
--   drop trigger if exists trg_quotes_auto_link_customer on public.quotes;
--   drop function if exists public.quotes_auto_link_customer();

create or replace function public.quotes_auto_link_customer()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_email text := lower(trim(coalesce(new.client_data->>'email', '')));
  v_name  text := lower(trim(coalesce(new.client_data->>'name', '')));
  v_cid uuid;
  v_n int;
begin
  if new.customer_id is not null or (v_email = '' and v_name = '') then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.client_data is not distinct from old.client_data then
    return new;
  end if;

  if v_email <> '' then
    select (array_agg(id))[1], count(*) into v_cid, v_n
    from customers
    where user_id = new.user_id
      and email is not null
      and lower(trim(email)) = v_email;
    if v_n = 1 then
      new.customer_id := v_cid;
      return new;
    end if;
  end if;

  if v_name <> '' then
    select (array_agg(id))[1], count(*) into v_cid, v_n
    from customers
    where user_id = new.user_id
      and lower(trim(name)) = v_name;
    if v_n = 1 then
      new.customer_id := v_cid;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_quotes_auto_link_customer on public.quotes;
-- UPDATE OF client_data: quotes is a hot table (10s draft autosaves, status
-- flips, pdf_url writes) — don't invoke plpgsql for writes that can't change
-- the linkage.
create trigger trg_quotes_auto_link_customer
  before insert or update of client_data on public.quotes
  for each row execute function public.quotes_auto_link_customer();

-- One-time backfill for rows created since the 2026-07-08 backfill:
-- link where a unique email or name match exists.
with candidates as (
  select q.id as quote_id,
    coalesce(
      (select (array_agg(c.id))[1] from customers c
       where c.user_id = q.user_id
         and nullif(lower(trim(c.email)), '') is not null
         and lower(trim(c.email)) = nullif(lower(trim(q.client_data->>'email')), '')
       having count(*) = 1),
      (select (array_agg(c.id))[1] from customers c
       where c.user_id = q.user_id
         and lower(trim(c.name)) = nullif(lower(trim(q.client_data->>'name')), '')
       having count(*) = 1)
    ) as cid
  from quotes q
  where q.customer_id is null
    and coalesce(
      nullif(trim(q.client_data->>'name'), ''),
      nullif(trim(q.client_data->>'email'), '')
    ) is not null
)
update quotes q
set customer_id = candidates.cid
from candidates
where q.id = candidates.quote_id and candidates.cid is not null;
