-- Review fix M2 (ELE-2076), 10 Oct 2026.
--
-- compliance_documents.file_url holds a path in the private
-- compliance-documents bucket ({uploader uid}/{ms}-{name}). Anyone can insert
-- their own row ("Users can insert own compliance documents"), so a row could
-- hold another firm's path, and firm-pack-files would sign it. The edge
-- function now signs only paths in the document's firm's folders; this stops
-- such a path being saved at all.
--
-- Rule: a storage path saved in file_url must start with the folder of the
-- row's owner (user_id, the firm) or of someone on that firm's team
-- (employer_admins, any status: an admin or office manager uploads to their
-- own folder and saves the row against the firm). Full https:// URLs (older
-- rows, used as-is) and empty values are left alone. Only checked when
-- file_url or user_id is set or changed, so existing rows are untouched
-- (there are none today).
--
-- Additive: one new private helper and one new BEFORE trigger on a live
-- table. HEAD and build 49 upload to `${user.id}/...` and save user_id as the
-- firm the user acts for (useComplianceDocuments firmId()), which always
-- passes. Proved with rolled-back inserts and updates as an owner, an admin,
-- an outsider and the service role before applying.

create or replace function public._firm_folder_ok(p_firm uuid, p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $fn$
  select p_firm is not null
     and p_path is not null
     and position('..' in p_path) = 0
     and left(p_path, 1) <> '/'
     and split_part(p_path, '/', 2) <> ''
     and (
       lower(split_part(p_path, '/', 1)) = p_firm::text
       or exists (select 1 from public.employer_admins a
                   where a.employer_id = p_firm
                     and a.user_id is not null
                     and a.user_id::text = lower(split_part(p_path, '/', 1)))
     );
$fn$;
revoke all on function public._firm_folder_ok(uuid, text) from public, anon, authenticated;

create or replace function public.tg_compliance_document_file_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_f text := btrim(coalesce(new.file_url, ''));
begin
  if v_f = '' then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.file_url is not distinct from old.file_url
     and new.user_id is not distinct from old.user_id then
    return new;
  end if;
  if v_f ~* '^https://' then
    return new;
  end if;
  if v_f ~* '^[a-z]+:' or not public._firm_folder_ok(new.user_id, v_f) then
    raise exception 'file_outside_folder' using errcode = '42501',
      hint = 'The file must be one you or your firm uploaded.';
  end if;
  return new;
end;
$fn$;
revoke all on function public.tg_compliance_document_file_guard() from public, anon, authenticated;

drop trigger if exists compliance_document_file_guard on public.compliance_documents;
create trigger compliance_document_file_guard
  before insert or update of file_url, user_id on public.compliance_documents
  for each row execute function public.tg_compliance_document_file_guard();
