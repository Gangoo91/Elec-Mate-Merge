-- ============================================================
-- Extend project_documents.doc_type to allow 'document'
-- for general file uploads (works orders, specs, client docs)
-- Ticket: ELE-315
-- ============================================================

-- Drop the existing check constraint and recreate with 'document'
alter table public.project_documents
  drop constraint if exists project_documents_doc_type_check;

alter table public.project_documents
  add constraint project_documents_doc_type_check
  check (doc_type in ('photo', 'drawing', 'document'));
