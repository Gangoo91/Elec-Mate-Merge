-- S1: project link inheritance (Jobs redesign slice 1) — applied to prod 2026-07-19 via MCP
-- Fill-only-if-null: these never overwrite an existing project_id.

-- 1) Invoice created from a quote inherits the quote's project
create or replace function public.inherit_invoice_project_from_quote()
returns trigger language plpgsql as $$
begin
  if new.project_id is null and new.quote_id is not null then
    select q.project_id into new.project_id from public.quotes q where q.id = new.quote_id;
  end if;
  return new;
end $$;

drop trigger if exists trg_inherit_invoice_project on public.invoices;
create trigger trg_inherit_invoice_project
  before insert or update of quote_id on public.invoices
  for each row execute function public.inherit_invoice_project_from_quote();

-- 2) Variation quote inherits the parent quote's project
create or replace function public.inherit_quote_project_from_parent()
returns trigger language plpgsql as $$
begin
  if new.project_id is null and new.parent_quote_id is not null then
    select q.project_id into new.project_id from public.quotes q where q.id = new.parent_quote_id;
  end if;
  return new;
end $$;

drop trigger if exists trg_inherit_quote_project on public.quotes;
create trigger trg_inherit_quote_project
  before insert or update of parent_quote_id on public.quotes
  for each row execute function public.inherit_quote_project_from_parent();

-- 3) Site visit tied to a quote inherits the quote's project
create or replace function public.inherit_visit_project_from_quote()
returns trigger language plpgsql as $$
begin
  if new.project_id is null and new.quote_id is not null then
    select q.project_id into new.project_id from public.quotes q where q.id = new.quote_id;
  end if;
  return new;
end $$;

drop trigger if exists trg_inherit_visit_project on public.site_visits;
create trigger trg_inherit_visit_project
  before insert or update of quote_id on public.site_visits
  for each row execute function public.inherit_visit_project_from_quote();

-- 4) Linking a quote to a project later pulls its chain in (invoices, visits, variations)
create or replace function public.cascade_quote_project_to_children()
returns trigger language plpgsql as $$
begin
  if new.project_id is not null and old.project_id is null then
    update public.invoices set project_id = new.project_id
      where quote_id = new.id and project_id is null;
    update public.site_visits set project_id = new.project_id
      where quote_id = new.id and project_id is null;
    update public.quotes set project_id = new.project_id
      where parent_quote_id = new.id and project_id is null;
  end if;
  return new;
end $$;

drop trigger if exists trg_cascade_quote_project on public.quotes;
create trigger trg_cascade_quote_project
  after update of project_id on public.quotes
  for each row execute function public.cascade_quote_project_to_children();

-- 5) Backfill: deterministic quote-chain inheritance (idempotent)
update public.invoices i set project_id = q.project_id
  from public.quotes q
  where i.quote_id = q.id and i.project_id is null and q.project_id is not null;
update public.quotes v set project_id = p.project_id
  from public.quotes p
  where v.parent_quote_id = p.id and v.project_id is null and p.project_id is not null;
update public.site_visits sv set project_id = q.project_id
  from public.quotes q
  where sv.quote_id = q.id and sv.project_id is null and q.project_id is not null;

-- 6) Backfill: customer match, ONLY when that customer has exactly one project (unambiguous)
update public.quotes qq set project_id = p.id
  from public.spark_projects p
  where qq.project_id is null and qq.customer_id is not null
    and p.customer_id = qq.customer_id and p.user_id = qq.user_id
    and (select count(*) from public.spark_projects p2
         where p2.customer_id = qq.customer_id and p2.user_id = qq.user_id) = 1;
update public.reports r set project_id = p.id
  from public.spark_projects p
  where r.project_id is null and r.customer_id is not null
    and p.customer_id = r.customer_id and p.user_id = r.user_id
    and (select count(*) from public.spark_projects p2
         where p2.customer_id = r.customer_id and p2.user_id = r.user_id) = 1;
update public.site_visits sv set project_id = p.id
  from public.spark_projects p
  where sv.project_id is null and sv.customer_id is not null
    and p.customer_id = sv.customer_id and p.user_id = sv.user_id
    and (select count(*) from public.spark_projects p2
         where p2.customer_id = sv.customer_id and p2.user_id = sv.user_id) = 1;

-- Pin search_path (all references are schema-qualified) — clears function_search_path_mutable advisor
alter function public.inherit_invoice_project_from_quote() set search_path = '';
alter function public.inherit_quote_project_from_parent() set search_path = '';
alter function public.inherit_visit_project_from_quote() set search_path = '';
alter function public.cascade_quote_project_to_children() set search_path = '';
