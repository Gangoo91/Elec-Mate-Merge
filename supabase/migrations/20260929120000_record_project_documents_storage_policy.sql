-- Record, in the repo, the storage policy that already exists live on
-- `project-documents` (29 Sep 2026). The floor planner stores the architect's
-- drawing under `<uid>/floor-plan-underlays/…` and relies on this policy; it
-- had only ever been created in the dashboard. Idempotent: a no-op where the
-- policy is already present, so it is safe on the live project.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Users manage own project docs storage'
  ) then
    create policy "Users manage own project docs storage"
      on storage.objects for all to authenticated
      using (bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text)
      with check (bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text);
  end if;
end $$;
