-- Review finding #10/#11 (6 Oct). can_read_visual_upload() granted a read when
-- ANY record the caller could see listed the path. A user could put someone
-- else's path into their own firm's job issue and read that file. Now the
-- uploader (the path's first folder) must belong to the same firm as the
-- record: the owner, an active manager, or someone on its team (now or before).
-- Also lets a worker see the photos on a job they are assigned to (#11).

create or replace function public.visual_upload_owner_in_firm(p_name text, p_firm uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  begin
    v_owner := ((storage.foldername(p_name))[1])::uuid;
  exception when others then
    return false;
  end;
  if v_owner is null or p_firm is null then
    return false;
  end if;
  return v_owner = p_firm
      or exists (select 1 from public.employer_admins a
                  where a.employer_id = p_firm and a.user_id = v_owner and a.status = 'active')
      -- Any status: a photo stays readable after its uploader leaves the firm.
      or exists (select 1 from public.employer_employees e
                  where e.employer_id = p_firm and e.user_id = v_owner);
end;
$$;
revoke execute on function public.visual_upload_owner_in_firm(text, uuid) from public, anon;
grant execute on function public.visual_upload_owner_in_firm(text, uuid) to authenticated;

create or replace function public.can_read_visual_upload(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_uid uuid := auth.uid();
  v_url_tail text := '/visual-uploads/' || p_name;
begin
  if v_uid is null or p_name is null then
    return false;
  end if;

  if exists (
    select 1 from public.job_issues ji
     where exists (select 1 from unnest(ji.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, ji.user_id)
       and (ji.user_id in (select public.my_employer_scope())
            or ji.reported_by in (select public.my_employee_ids())
            or (ji.job_id is not null and public.is_assigned_to_job(ji.job_id)))
  ) then return true; end if;

  if exists (
    select 1 from public.employer_incidents ei
     where exists (select 1 from unnest(ei.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, ei.employer_id)
       and (ei.employer_id in (select public.my_employer_scope())
            or ei.reported_by in (select public.my_employee_ids()::text))
  ) then return true; end if;

  if exists (
    select 1 from public.progress_logs pl
     where exists (select 1 from unnest(pl.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, pl.user_id)
       and (pl.user_id in (select public.my_employer_scope())
            or (pl.job_id is not null and public.is_assigned_to_job(pl.job_id)))
  ) then return true; end if;

  if exists (
    select 1 from public.briefings b
     where exists (select 1 from unnest(b.photo_evidence) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, b.user_id)
       and (b.user_id in (select public.my_employer_scope())
            or (b.job_id is not null and public.is_assigned_to_job(b.job_id)))
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_checks vc
      join public.vehicles v on v.id = vc.vehicle_id
     where exists (select 1 from unnest(vc.defect_photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_documents vd
      join public.vehicles v on v.id = vd.vehicle_id
     where (vd.file_url = p_name or right(vd.file_url, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_services vs
      join public.vehicles v on v.id = vs.vehicle_id
     where (vs.invoice_url = p_name or right(vs.invoice_url, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  return false;
end;
$function$;
