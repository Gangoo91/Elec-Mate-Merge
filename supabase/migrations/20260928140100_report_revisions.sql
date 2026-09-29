-- Certificate version history (ELE-1432, data layer).
--
-- Until now the only record of a certificate's past was report_audit_log's
-- "data_changed: true". On 28 Sep 2026 a subscriber asked where his EIC test
-- results had gone and nobody could say whether they had ever been saved.
--
-- Design — a revision is "the values this save overwrote":
--   • AFTER UPDATE on reports, only when data actually changed, store the OLD
--     value of every top-level key whose value differs (jsonb, TOAST-compressed).
--     Restoring a revision = merging those old values back over the current
--     row; the restore is itself a normal update, so it creates a revision too
--     and is reversible.
--   • Throttled: saves within 3 minutes of the last revision fold into it,
--     keeping the OLDEST value per key (the state before the window). Autosave
--     fires every few seconds; 7,500 updates a week would otherwise be 7,500
--     rows of mostly the same schedule of tests.
--   • Bounded: 60 revisions per certificate, 180 days.
--   • Fail-open: any error inside the trigger is logged and the user's save
--     goes through. History must never block a certificate.
--   • Owners can read their own revisions; nothing else is writable from the
--     client. Restore goes through an RPC that checks ownership and never
--     touches the certificate number (the printed number is immutable on
--     issued rows and the trigger would refuse anyway).

create table if not exists public.report_revisions (
  id           bigserial primary key,
  report_uuid  uuid not null references public.reports(id) on delete cascade,
  report_id    text,
  user_id      uuid not null,
  edit_version integer,
  -- OLD values of the top-level keys the save changed (state before the window)
  changed      jsonb not null,
  saved_at     timestamptz not null default now(),
  last_fold_at timestamptz not null default now()
);

create index if not exists report_revisions_report_saved_idx
  on public.report_revisions (report_uuid, saved_at desc);

alter table public.report_revisions enable row level security;

drop policy if exists "owner reads own revisions" on public.report_revisions;
create policy "owner reads own revisions" on public.report_revisions
  for select using (auth.uid() = user_id);

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
begin
  if old.data is not distinct from new.data then
    return new;
  end if;

  begin
    -- Old values of every top-level key whose value changed (or was removed).
    select coalesce(jsonb_object_agg(o.key, o.value), '{}'::jsonb)
      into v_diff
      from jsonb_each(coalesce(old.data, '{}'::jsonb)) o
     where o.value is distinct from (coalesce(new.data, '{}'::jsonb) -> o.key);

    if v_diff = '{}'::jsonb then
      return new;
    end if;

    select id, last_fold_at into v_last_id, v_last_at
      from public.report_revisions
     where report_uuid = old.id
     order by saved_at desc
     limit 1;

    if v_last_id is not null and v_last_at > now() - interval '3 minutes' then
      -- Fold into the open window: keep the OLDEST value per key.
      update public.report_revisions
         set changed = v_diff || changed,
             last_fold_at = now(),
             edit_version = coalesce(old.edit_version, edit_version)
       where id = v_last_id;
    else
      insert into public.report_revisions (report_uuid, report_id, user_id, edit_version, changed)
      values (old.id, old.report_id, old.user_id, old.edit_version, v_diff);

      -- Bound per certificate and by age.
      delete from public.report_revisions
       where report_uuid = old.id
         and (saved_at < now() - interval '180 days'
              or id in (
                select id from public.report_revisions
                 where report_uuid = old.id
                 order by saved_at desc
                 offset 60
              ));
    end if;
  exception when others then
    raise warning 'capture_report_revision failed for % : %', old.id, sqlerrm;
  end;

  return new;
end;
$$;

drop trigger if exists trg_capture_report_revision on public.reports;
create trigger trg_capture_report_revision
  after update on public.reports
  for each row
  execute function public.capture_report_revision();

-- Restore: merge the revision's old values back over the current data.
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

  -- Never move the certificate number: the printed number is immutable.
  v_data := coalesce(v_report.data, '{}'::jsonb) || (v_rev.changed - 'certificateNumber');

  update public.reports
     set data = v_data
   where id = v_report.id;

  return v_data;
end;
$$;

revoke all on function public.restore_report_revision(bigint) from public;
grant execute on function public.restore_report_revision(bigint) to authenticated;
