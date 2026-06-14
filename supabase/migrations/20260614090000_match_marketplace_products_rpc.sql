-- A1: relevance-ranked match against the live elec-pipeline price feed
-- (marketplace_products, refreshed daily). Returns the top `per_item` most
-- relevant in-stock-priced products per query string, ranked by ts_rank over
-- the precomputed search_vector. Called by process-site-survey-analysis to
-- anchor AI material prices to real, current UK supplier prices.
create or replace function public.match_marketplace_products(
  item_queries text[],
  per_item integer default 3
)
returns table (
  query_text text,
  name text,
  current_price numeric,
  category text,
  rank real
)
language sql
stable
security definer
set search_path = public
as $$
  select q.query_text, m.name, m.current_price, m.category, m.rank
  from unnest(item_queries) as q(query_text)
  cross join lateral (
    select mp.name, mp.current_price, mp.category,
           ts_rank(mp.search_vector, websearch_to_tsquery('english', q.query_text)) as rank
    from marketplace_products mp
    where mp.current_price > 0
      and websearch_to_tsquery('english', q.query_text) @@ mp.search_vector
    order by ts_rank(mp.search_vector, websearch_to_tsquery('english', q.query_text)) desc,
             mp.scraped_at desc
    limit greatest(per_item, 1)
  ) m
$$;

grant execute on function public.match_marketplace_products(text[], integer) to authenticated, service_role;
