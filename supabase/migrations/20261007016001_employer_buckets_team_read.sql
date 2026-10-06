-- briefings, task-photos and pack-documents had bucket-wide SELECT for every
-- signed-in user ("authenticated read briefings", "Read task photos", "Read
-- pack documents"): anyone could list and sign every firm's files. Now a file
-- is readable by its uploader and by members of the same firm — the rule
-- job-photos already uses (can_read_job_photo / firms_of). Paths are
-- <user_id>/... or signatures/<user_id>/... (briefing signatures).
create or replace function public.can_read_team_file(p_name text)
 returns boolean
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  v_folders text[];
  v_owner uuid;
begin
  if auth.uid() is null or p_name is null then
    return false;
  end if;
  v_folders := storage.foldername(p_name);
  begin
    v_owner := (case when v_folders[1] = 'signatures' then v_folders[2] else v_folders[1] end)::uuid;
  exception when others then
    return false;
  end;
  if v_owner = auth.uid() then
    return true;
  end if;
  return exists (
    select 1 from public.firms_of(auth.uid()) mine
     where mine in (select public.firms_of(v_owner, true))
  );
end;
$function$;
revoke execute on function public.can_read_team_file(text) from public, anon;
grant execute on function public.can_read_team_file(text) to authenticated, service_role;

drop policy if exists "authenticated read briefings" on storage.objects;
drop policy if exists "Read task photos" on storage.objects;
drop policy if exists "Read pack documents" on storage.objects;
create policy "Team reads briefing files" on storage.objects for select to authenticated
  using (bucket_id = 'briefings' and public.can_read_team_file(name));
create policy "Team reads task photos" on storage.objects for select to authenticated
  using (bucket_id = 'task-photos' and public.can_read_team_file(name));
create policy "Team reads pack documents" on storage.objects for select to authenticated
  using (bucket_id = 'pack-documents' and public.can_read_team_file(name));
