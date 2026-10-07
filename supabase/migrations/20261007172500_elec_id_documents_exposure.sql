-- Security review (6 Oct night). Verified Elec-ID documents were readable
-- whole-row by ANY visitor (anon policy "Verified documents follow profile
-- visibility") and by employers — every document type (driving licence
-- included) and every column (document_number, extracted_data, raw_ocr_text).
-- The public Elec-ID page only shows qualification / ECS card / training /
-- certificate documents and a handful of columns (usePublicElecId).
--  * both outside-reader policies now cover only those four types;
--  * signed-out visitors can read only the columns the public page uses.
-- Column-level hiding for signed-in employers needs the client to stop reading
-- whole rows — see supabase/release-held/20261007169000_role_column_privacy.sql.
do $$
declare v_qual text;
begin
  select qual into v_qual from pg_policies
   where tablename = 'elec_id_documents' and policyname = 'Verified documents follow profile visibility';
  if v_qual is null then raise exception 'public documents policy not found'; end if;
  execute 'drop policy "Verified documents follow profile visibility" on public.elec_id_documents';
  execute format($p$create policy "Verified documents follow profile visibility" on public.elec_id_documents
    for select to anon, authenticated
    using ((%s) and document_type in ('qualification', 'ecs_card', 'training', 'certificate'))$p$, v_qual);
end $$;

drop policy if exists "Employers view verified documents of hireable profiles" on public.elec_id_documents;
create policy "Employers view verified documents of hireable profiles" on public.elec_id_documents
  for select to authenticated
  using (verification_status = 'verified'
         and document_type in ('qualification', 'ecs_card', 'training', 'certificate')
         and public.employer_can_view_elec_id(profile_id));

revoke select on public.elec_id_documents from anon;
grant select (id, profile_id, document_type, document_name, file_url, verification_status,
              document_number, issue_date, expiry_date, issuing_body)
  on public.elec_id_documents to anon;
