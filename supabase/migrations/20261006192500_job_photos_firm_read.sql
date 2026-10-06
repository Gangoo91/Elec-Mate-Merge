-- Review finding (6 Oct, pre-existing): "authenticated read job-photos" let ANY
-- signed-in account read any firm's job photos, snag photos and delivery notes
-- by path. Every upload path starts with the uploader's id
-- (useJobPhotos, useSnags, useGoodsReceipts), so a file is readable when the
-- reader and the uploader share a firm. The client portal is unaffected: it
-- signs URLs with the service role (portal-photos-signed).

-- Firms a person belongs to. p_any_status: count a past team member too
-- (uploader side, so photos stay readable after someone leaves).
create or replace function public.firms_of(p_user uuid, p_any_status boolean default false)
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p_user where p_user is not null
  union
  select a.employer_id from public.employer_admins a
   where a.user_id = p_user
     and (a.status = 'active' or (p_any_status and a.status = 'revoked'))
  union
  select e.employer_id from public.employer_employees e
   where e.user_id = p_user and e.employer_id is not null
     and (p_any_status or lower(coalesce(e.status, '')) = 'active')
$$;
revoke execute on function public.firms_of(uuid, boolean) from public, anon;
grant execute on function public.firms_of(uuid, boolean) to authenticated;

create or replace function public.can_read_job_photo(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  if auth.uid() is null or p_name is null then
    return false;
  end if;
  begin
    v_owner := ((storage.foldername(p_name))[1])::uuid;
  exception when others then
    return false;
  end;
  return exists (
    select 1 from public.firms_of(auth.uid()) mine
     where mine in (select public.firms_of(v_owner, true))
  );
end;
$$;
revoke execute on function public.can_read_job_photo(text) from public, anon;
grant execute on function public.can_read_job_photo(text) to authenticated;

drop policy if exists "authenticated read job-photos" on storage.objects;
drop policy if exists "Firm reads job-photos" on storage.objects;
create policy "Firm reads job-photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'job-photos' and public.can_read_job_photo(name));
