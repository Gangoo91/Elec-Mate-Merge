-- report_revisions — two corrections found on review, same evening.
--
-- 1. The fold window was measured from the LAST fold, so a four-hour editing
--    session with a save every minute folded into a single revision and the
--    history had no point inside the session to return to. A revision now also
--    closes 15 minutes after it opened, and the per-certificate cap rises to
--    100 so a long day's certificate keeps its "before today" state.
-- 2. restore_report_revision compared user_id <> auth.uid(); with no session
--    auth.uid() is null and the comparison is null, which `if` treats as
--    false — the ownership check did not fire. It now refuses when there is no
--    session at all.

create or replace function public.capture_report_revision()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_diff    jsonb;
  v_last_id bigint;
  v_last_at timestamptz;
  v_open_at timestamptz;
begin
  if old.data is not distinct from new.data then
    return new;
  end if;

  begin
    select coalesce(jsonb_object_agg(o.key, o.value), '{}'::jsonb)
      into v_diff
      from jsonb_each(coalesce(old.data, '{}'::jsonb)) o
     where o.value is distinct from (coalesce(new.data, '{}'::jsonb) -> o.key);

    if v_diff = '{}'::jsonb then
      return new;
    end if;

    select id, last_fold_at, saved_at into v_last_id, v_last_at, v_open_at
      from public.report_revisions
     where report_uuid = old.id
     order by saved_at desc
     limit 1;

    if v_last_id is not null
       and v_last_at > now() - interval '3 minutes'
       and v_open_at > now() - interval '15 minutes' then
      update public.report_revisions
         set changed = v_diff || changed,
             last_fold_at = now(),
             edit_version = coalesce(old.edit_version, edit_version)
       where id = v_last_id;
    else
      insert into public.report_revisions (report_uuid, report_id, user_id, edit_version, changed)
      values (old.id, old.report_id, old.user_id, old.edit_version, v_diff);

      delete from public.report_revisions
       where report_uuid = old.id
         and (saved_at < now() - interval '180 days'
              or id in (
                select id from public.report_revisions
                 where report_uuid = old.id
                 order by saved_at desc
                 offset 100
              ));
    end if;
  exception when others then
    raise warning 'capture_report_revision failed for % : %', old.id, sqlerrm;
  end;

  return new;
end;
$$;

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

  v_data := coalesce(v_report.data, '{}'::jsonb) || (v_rev.changed - 'certificateNumber');

  update public.reports
     set data = v_data
   where id = v_report.id;

  return v_data;
end;
$$;
