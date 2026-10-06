-- ELE-1861 step 1: correct read rule on the portfolio-evidence bucket, before
-- the bucket is made private.
--
-- The old staff branch was `storage.foldername(cs.name)` — cs.name is the
-- learner's NAME column on college_students, not the object path — so staff
-- access never matched. It looked fine only because the bucket is public.
-- New rule: the owner (first folder = their uid), or anyone who may assess
-- that learner (_can_assess: platform admin, assignment, assessing staff at
-- their college, or an active invited assessor).

create or replace function public._can_read_evidence_path(p_name text)
returns boolean language plpgsql stable security definer set search_path to 'public' as $$
declare v_owner uuid;
begin
  begin
    v_owner := (storage.foldername(p_name))[1]::uuid;
  exception when others then
    return false; -- not a per-user path
  end;
  return v_owner = auth.uid() or public._can_assess(v_owner);
end; $$;
revoke all on function public._can_read_evidence_path(text) from public, anon;
grant execute on function public._can_read_evidence_path(text) to authenticated;

drop policy if exists "portfolio-evidence: owner or same-college staff read" on storage.objects;
drop policy if exists "portfolio-evidence: owner or assessor read" on storage.objects;
create policy "portfolio-evidence: owner or assessor read" on storage.objects
  for select to authenticated
  using (bucket_id = 'portfolio-evidence' and public._can_read_evidence_path(name));
