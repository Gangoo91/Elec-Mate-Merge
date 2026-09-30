-- Building Regulations sources in the bs7671_* RAG (30 Sep 2026).
--
--   approved_doc — Approved Documents P, B, F, L, M, S, R, 7 (England) and
--                  Approved Document P (Wales)
--   legislation  — The Building Regulations 2010 (revised), the Electrical
--                  Safety Standards in the Private Rented Sector (England)
--                  Regulations 2020
--
-- bs7671_editions.document_type has a CHECK constraint (the other bs7671_*
-- tables do not); without this the edition insert fails. Retrieval, citation
-- labels and routing are handled in _shared/building-regs-citation.ts,
-- bs7671-facet-retrieval.ts, bs7671-facets-rag.ts and
-- bs7671-query-understanding.ts.

alter table public.bs7671_editions drop constraint bs7671_editions_document_type_check;
alter table public.bs7671_editions add constraint bs7671_editions_document_type_check
  check (document_type = any (array[
    'bs7671', 'gn3', 'osg', 'gn1', 'gn2', 'gn4', 'gn5', 'gn6', 'gn7', 'gn8', 'bs5839',
    'approved_doc', 'legislation'
  ]));

-- Per-document-type partial HNSW indexes, matching the existing ones.
create index if not exists idx_bs7671_facets_approved_doc_embedding
  on public.bs7671_facets using hnsw (embedding halfvec_cosine_ops)
  with (m = '16', ef_construction = '64')
  where (document_type = 'approved_doc');

create index if not exists idx_bs7671_facets_legislation_embedding
  on public.bs7671_facets using hnsw (embedding halfvec_cosine_ops)
  with (m = '16', ef_construction = '64')
  where (document_type = 'legislation');
