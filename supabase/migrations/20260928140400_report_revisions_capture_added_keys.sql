-- report_revisions — capture keys the save ADDED, not only keys it changed.
--
-- Found on the first end-to-end restore test (28 Sep 2026, EICR-2026-5149):
-- typing an occupier into a certificate that had never had one produced no
-- revision at all. The diff walked OLD's keys only, and OLD had no `occupier`.
-- A revision must be able to say "this key did not exist before", so keys
-- present in NEW but absent in OLD are recorded with a JSON null; restoring
-- them sets the field back to null, which every form treats as blank.

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
    -- Old value of every top-level key that differs — including keys the save
    -- introduced (old value: JSON null) and keys it removed.
    select coalesce(jsonb_object_agg(ks.k, coalesce(coalesce(old.data, '{}'::jsonb) -> ks.k, 'null'::jsonb)), '{}'::jsonb)
      into v_diff
      from (
        select jsonb_object_keys(coalesce(old.data, '{}'::jsonb)) as k
        union
        select jsonb_object_keys(coalesce(new.data, '{}'::jsonb))
      ) ks
     where (coalesce(old.data, '{}'::jsonb) -> ks.k) is distinct from (coalesce(new.data, '{}'::jsonb) -> ks.k);

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
