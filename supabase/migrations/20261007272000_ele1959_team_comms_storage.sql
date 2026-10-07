-- ELE-1959 Team comms attachments: a PRIVATE bucket, signed URLs only.
-- Path: <firm id>/<uploader auth uid>/<random>-<file name>
--   upload  — only into your own folder of a firm you run or work for (active)
--   read    — your own uploads, or a file attached to a message / reply you can see
--   delete  — your own upload, only while it is not attached to anything

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'team-comms', 'team-comms', false, 15728640,
  array['image/jpeg','image/png','image/webp','image/heic','image/heif','image/gif','application/pdf']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.comms_attachment_visible(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm text := split_part(p_name, '/', 1);
  v_ref jsonb := jsonb_build_array(jsonb_build_object('path', p_name));
begin
  if auth.uid() is null or v_firm = '' then return false; end if;
  return exists (
      select 1 from public.employer_communications c
       where c.sender_id::text = v_firm
         and c.attachments @> v_ref
         and (c.sender_id in (select public.my_employer_scope()) or public.comms_i_receive(c.id))
    ) or exists (
      select 1 from public.employer_communication_replies x
       where x.employer_id::text = v_firm
         and x.attachments @> v_ref
         and (x.employer_id in (select public.my_employer_scope())
              or x.thread_employee_id in (select public.my_employee_ids())
              or (x.thread_employee_id is null and public.comms_i_receive(x.communication_id)))
    );
end;
$$;

create or replace function public.comms_attachment_in_use(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
      select 1 from public.employer_communications c
       where c.attachments @> jsonb_build_array(jsonb_build_object('path', p_name))
    ) or exists (
      select 1 from public.employer_communication_replies x
       where x.attachments @> jsonb_build_array(jsonb_build_object('path', p_name))
    );
$$;

revoke all on function public.comms_attachment_visible(text) from public, anon;
revoke all on function public.comms_attachment_in_use(text) from public, anon;
grant execute on function public.comms_attachment_visible(text) to authenticated;
grant execute on function public.comms_attachment_in_use(text) to authenticated;

drop policy if exists "Team comms upload own" on storage.objects;
create policy "Team comms upload own"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'team-comms'
    and (storage.foldername(name))[2] = (select auth.uid())::text
    and (
      (storage.foldername(name))[1] in (select s::text from public.my_employer_scope() s)
      or (storage.foldername(name))[1] in (
        select e.employer_id::text from public.employer_employees e
         where e.id in (select public.my_employee_ids())
      )
    )
  );

drop policy if exists "Team comms read attached" on storage.objects;
create policy "Team comms read attached"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'team-comms'
    and (owner_id = (select auth.uid())::text or public.comms_attachment_visible(name))
  );

drop policy if exists "Team comms delete own unsent" on storage.objects;
create policy "Team comms delete own unsent"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'team-comms'
    and owner_id = (select auth.uid())::text
    and not public.comms_attachment_in_use(name)
  );
