-- report_revisions — two refinements from the bug pass.
--
-- 1. A revision records a key the save INTRODUCED as JSON null. Restoring
--    merged that null into the certificate, and a controlled input handed a
--    null goes uncontrolled and warns. The true "before" state is that the key
--    did not exist, so restore now REMOVES those keys instead of nulling them.
-- 2. Internal `_` keys (client identity, project prefill, draft timestamps)
--    are not certificate content; a save that only touched one of them no
--    longer opens a revision, and they never appear in a revision's key list.

create or replace function public.restore_report_revision(p_revision_id bigint)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_rev       public.report_revisions%rowtype;
  v_report    public.reports%rowtype;
  v_data      jsonb;
  v_absent    text[];
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

  -- Keys that did not exist before this save come back as absent, not null.
  select coalesce(array_agg(e.key), '{}'::text[]) into v_absent
    from jsonb_each(v_rev.changed) e
   where jsonb_typeof(e.value) = 'null';

  v_data := (coalesce(v_report.data, '{}'::jsonb) || (v_rev.changed - 'certificateNumber')) - v_absent;

  update public.reports
     set data = v_data
   where id = v_report.id;

  return v_data;
end;
$$;

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
    select coalesce(jsonb_object_agg(ks.k, coalesce(coalesce(old.data, '{}'::jsonb) -> ks.k, 'null'::jsonb)), '{}'::jsonb)
      into v_diff
      from (
        select jsonb_object_keys(coalesce(old.data, '{}'::jsonb)) as k
        union
        select jsonb_object_keys(coalesce(new.data, '{}'::jsonb))
      ) ks
     where ks.k not like '\_%'
       and (coalesce(old.data, '{}'::jsonb) -> ks.k) is distinct from (coalesce(new.data, '{}'::jsonb) -> ks.k);

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
