-- History sheet listing (ELE-1432, UI layer).
--
-- A revision's `changed` can carry a whole schedule of tests, so the sheet
-- must never pull the payloads to draw a list. This returns one light row per
-- revision: when it opened, when it last folded, the edit version it preceded,
-- which top-level keys it holds, and the payload size. Owner-only.

create or replace function public.list_report_revisions(p_report_id text)
returns table (
  id           bigint,
  saved_at     timestamptz,
  last_fold_at timestamptz,
  edit_version integer,
  keys         text[],
  bytes        integer
)
language sql
security definer
set search_path to 'public'
stable
as $$
  select r.id,
         r.saved_at,
         r.last_fold_at,
         r.edit_version,
         array(select k from jsonb_object_keys(r.changed) k order by k),
         length(r.changed::text)
    from public.report_revisions r
   where r.report_id = p_report_id
     and r.user_id = auth.uid()
   order by r.saved_at desc
   limit 100;
$$;

revoke all on function public.list_report_revisions(text) from public;
grant execute on function public.list_report_revisions(text) to authenticated;
