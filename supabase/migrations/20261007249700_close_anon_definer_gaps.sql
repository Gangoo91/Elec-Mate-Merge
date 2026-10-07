-- 7 Oct advisor sweep: SECURITY DEFINER functions signed-out visitors could run.
-- complete_ai_job: anyone could mark any AI job complete with any result and
--   cost. Nothing in the app calls it; server (service role) only now.
-- search_employer_knowledge: the employer knowledge base (~2,900 rows) was
--   searchable signed-out (same class as the 6 Oct RAG leak). Signed-in only.
-- generate_certificate_number: signed-out callers could burn certificate
--   numbers. Signed-in only (the cert form is signed in).
revoke execute on function public.complete_ai_job(uuid, jsonb, integer, integer, numeric) from public, anon, authenticated;
revoke execute on function public.search_employer_knowledge(halfvec, text, integer, text, integer) from public, anon;
grant execute on function public.search_employer_knowledge(halfvec, text, integer, text, integer) to authenticated, service_role;
revoke execute on function public.generate_certificate_number(text) from public, anon;
grant execute on function public.generate_certificate_number(text) to authenticated, service_role;
grant execute on function public.complete_ai_job(uuid, jsonb, integer, integer, numeric) to service_role;
