-- report_revisions — restore an "added" key as a blank of its current type.
--
-- 140500 removed keys the save had introduced. Correct on the server, wrong
-- for the client: every form merges the restored data over its current state
-- (`{ ...prev, ...restored }`), so a key that is simply absent from the
-- restored data survives in the form and the next autosave writes it back.
-- Setting it to an empty value of the type it currently holds ("" / [] /
-- false / {}) restores what the user sees AND survives the merge.

create or replace function public.restore_report_revision(p_revision_id bigint)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_rev    public.report_revisions%rowtype;
  v_report public.reports%rowtype;
  v_data   jsonb;
  v_blanks jsonb;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into v_rev from public.report_revisions where id = p_revision_id;
  if not found then
    raise exception 'revision % not found', p_revision_id using errcode = 'P0002';
  end if;
  select * into v_report from public.reports where id = v_rev.report_uuid and deleted_at is null;
  if not found then
    raise exception 'certificate for revision % not found', p_revision_id using errcode = 'P0002';
  end if;
  if v_report.user_id <> auth.uid() then
    raise exception 'not your certificate' using errcode = '42501';
  end if;

  -- Keys that did not exist before this save: blank of whatever type they hold now.
  select coalesce(jsonb_object_agg(e.key,
           case jsonb_typeof(coalesce(v_report.data, '{}'::jsonb) -> e.key)
             when 'string'  then '""'::jsonb
             when 'array'   then '[]'::jsonb
             when 'boolean' then 'false'::jsonb
             when 'object'  then '{}'::jsonb
             else 'null'::jsonb
           end), '{}'::jsonb)
    into v_blanks
    from jsonb_each(v_rev.changed) e
   where jsonb_typeof(e.value) = 'null';

  v_data := coalesce(v_report.data, '{}'::jsonb)
            || (v_rev.changed - 'certificateNumber')
            || (v_blanks - 'certificateNumber');

  update public.reports
     set data = v_data
   where id = v_report.id;

  return v_data;
end;
$$;
