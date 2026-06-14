-- Employer Hub AI knowledge base (RAG). Applied live via MCP migration
-- `employer_knowledge_rag` 2026-06-13 — this file version-controls that schema.
--
-- Mirrors the bs7671_facets architecture: text-embedding-3-large stored as
-- halfvec(3072) (HNSW-indexable beyond 2000 dims) + a generated tsvector for
-- hybrid (vector + full-text) retrieval. Loaded with ~2,896 chunks from
-- authoritative business sources (RICS NRM1, JIB/SJIB, ACAS, gov.uk playbooks,
-- Spon's, Designing Buildings Wiki). AUTHORITATIVE SOURCES ONLY — no invented
-- content. Consumed by the employer-ai-assistant edge function.

create table if not exists public.employer_knowledge (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  domain text,
  source text,
  topic text,
  metadata jsonb not null default '{}'::jsonb,
  embedding halfvec(3072),
  fts tsvector generated always as (to_tsvector('english', content)) stored,
  created_at timestamptz not null default now()
);

create index if not exists employer_knowledge_embedding_idx
  on public.employer_knowledge using hnsw (embedding halfvec_cosine_ops);
create index if not exists employer_knowledge_fts_idx
  on public.employer_knowledge using gin (fts);
create index if not exists employer_knowledge_domain_idx
  on public.employer_knowledge (domain);

alter table public.employer_knowledge enable row level security;
drop policy if exists employer_knowledge_read on public.employer_knowledge;
create policy employer_knowledge_read on public.employer_knowledge
  for select to authenticated using (true);

-- Hybrid search: reciprocal-rank-fusion of cosine-vector + full-text.
create or replace function public.search_employer_knowledge(
  query_embedding halfvec(3072),
  query_text text default '',
  match_count int default 8,
  filter_domain text default null,
  rrf_k int default 50
)
returns table (id uuid, content text, domain text, source text, topic text, similarity float)
language sql stable security definer set search_path = public as $$
  with v as (
    select k.id, 1 - (k.embedding <=> query_embedding) as sim,
           row_number() over (order by k.embedding <=> query_embedding) as rnk
    from public.employer_knowledge k
    where (filter_domain is null or k.domain = filter_domain)
    order by k.embedding <=> query_embedding
    limit 60
  ),
  f as (
    select k.id,
           row_number() over (order by ts_rank(k.fts, websearch_to_tsquery('english', query_text)) desc) as rnk
    from public.employer_knowledge k
    where query_text <> '' and k.fts @@ websearch_to_tsquery('english', query_text)
      and (filter_domain is null or k.domain = filter_domain)
    limit 60
  ),
  fused as (
    select coalesce(v.id, f.id) as id,
           coalesce(1.0/(rrf_k + v.rnk), 0) + coalesce(1.0/(rrf_k + f.rnk), 0) as score,
           v.sim
    from v full outer join f on v.id = f.id
  )
  select k.id, k.content, k.domain, k.source, k.topic, coalesce(fused.sim, 0)::float
  from fused join public.employer_knowledge k on k.id = fused.id
  order by fused.score desc
  limit match_count;
$$;

revoke all on function public.search_employer_knowledge from anon;
grant execute on function public.search_employer_knowledge to authenticated, service_role;
