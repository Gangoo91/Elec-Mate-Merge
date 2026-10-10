-- ELE-2083: names for "Raised by" / "Sent by" on Employer Hub quote and
-- invoice rows and sheets. A NEW function (the bridged list RPCs return a
-- fixed TABLE shape HEAD reads, so they are left alone).
--
-- Scoped to the caller's firm (my_employer_scope()); a row outside it returns
-- nothing. Names come from the firm's manager record (employer_admins) first,
-- then the person's profile. Unknown people (NULL ids, older rows) give NULL,
-- so the screens show nothing rather than a guess.
--
-- Applied live via Supabase MCP on 10 Oct 2026 (polish agent); recorded in
-- schema_migrations as 20261010103748 get_quote_attribution_ele2083.

create or replace function public.get_quote_attribution(p_ids uuid[])
returns table (
  id uuid,
  created_by_user_id uuid,
  created_by_name text,
  sent_by_user_id uuid,
  sent_by_name text,
  invoice_sent_by_user_id uuid,
  invoice_sent_by_name text
)
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select q.id, q.user_id, q.created_by_user_id, q.sent_by_user_id, q.invoice_sent_by_user_id
      from public.quotes q
     where q.id = any (p_ids)
       and q.user_id in (select public.my_employer_scope())
  ),
  people as (
    select distinct u as user_id, q.user_id as firm
      from q, unnest(array[q.created_by_user_id, q.sent_by_user_id, q.invoice_sent_by_user_id]) u
     where u is not null
  ),
  named as (
    select p.user_id, p.firm,
           coalesce(
             nullif(trim((select a.full_name from public.employer_admins a
                           where a.employer_id = p.firm and a.user_id = p.user_id
                           order by a.created_at desc limit 1)), ''),
             nullif(trim((select pr.full_name from public.profiles pr where pr.id = p.user_id)), '')
           ) as name
      from people p
  )
  select q.id,
         q.created_by_user_id,
         (select n.name from named n where n.user_id = q.created_by_user_id and n.firm = q.user_id),
         q.sent_by_user_id,
         (select n.name from named n where n.user_id = q.sent_by_user_id and n.firm = q.user_id),
         q.invoice_sent_by_user_id,
         (select n.name from named n where n.user_id = q.invoice_sent_by_user_id and n.firm = q.user_id)
    from q;
$$;

revoke all on function public.get_quote_attribution(uuid[]) from public, anon;
grant execute on function public.get_quote_attribution(uuid[]) to authenticated;
