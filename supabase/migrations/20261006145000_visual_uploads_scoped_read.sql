-- ELE-2014: "authenticated read visual-uploads" let ANY signed-in account read
-- and list EVERY file in the bucket — other people's AI-tool photos, CV photos,
-- site photos. The bucket is private; that one policy was the hole.
--
-- Replacement: you can read a file when
--   (a) you uploaded it — first folder is your uid (existing owner policy), or
--   (b) it is attached to a record you are allowed to see:
--       job_issues.photos            firm managers, or the worker who reported it
--       employer_incidents.photos    firm managers, or the worker who reported it
--       progress_logs.photos         firm managers
--       briefings.photo_evidence     firm managers
--       vehicle_checks.defect_photos, vehicle_documents.file_url,
--       vehicle_services.invoice_url firm managers (the vehicle's firm)
-- Stored values are bare paths (new) or full public URLs (legacy), so both
-- forms are matched.
--
-- Edge functions use the service role and are unaffected (incident PDF,
-- evidence signing for colleges).

create or replace function public.can_read_visual_upload(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_url_tail text := '/visual-uploads/' || p_name;
begin
  if v_uid is null or p_name is null then
    return false;
  end if;

  -- Snags / defects
  if exists (
    select 1 from public.job_issues ji
     where exists (select 1 from unnest(ji.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and (ji.user_id in (select public.my_employer_scope())
            or ji.reported_by in (select public.my_employee_ids()))
  ) then return true; end if;

  -- Safety reports
  if exists (
    select 1 from public.employer_incidents ei
     where exists (select 1 from unnest(ei.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and (ei.employer_id in (select public.my_employer_scope())
            or ei.reported_by in (select public.my_employee_ids()::text))
  ) then return true; end if;

  -- Office site logs
  if exists (
    select 1 from public.progress_logs pl
     where exists (select 1 from unnest(pl.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and pl.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  -- Briefings (legacy photos; new ones live in briefing-photos)
  if exists (
    select 1 from public.briefings b
     where exists (select 1 from unnest(b.photo_evidence) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and b.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  -- Vans
  if exists (
    select 1 from public.vehicle_checks vc
      join public.vehicles v on v.id = vc.vehicle_id
     where exists (select 1 from unnest(vc.defect_photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_documents vd
      join public.vehicles v on v.id = vd.vehicle_id
     where (vd.file_url = p_name or right(vd.file_url, length(v_url_tail)) = v_url_tail)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_services vs
      join public.vehicles v on v.id = vs.vehicle_id
     where (vs.invoice_url = p_name or right(vs.invoice_url, length(v_url_tail)) = v_url_tail)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  return false;
end;
$$;

revoke execute on function public.can_read_visual_upload(text) from public, anon;
grant execute on function public.can_read_visual_upload(text) to authenticated;

drop policy if exists "Linked records can read visual-uploads" on storage.objects;
create policy "Linked records can read visual-uploads" on storage.objects
  for select to authenticated
  using (bucket_id = 'visual-uploads' and public.can_read_visual_upload(name));

drop policy if exists "authenticated read visual-uploads" on storage.objects;
