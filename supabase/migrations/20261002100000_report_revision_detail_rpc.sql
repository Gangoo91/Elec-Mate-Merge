-- ELE-1432 — what a revision actually held, for the history sheet's "what changed" view.
-- list_report_revisions deliberately returns keys only; this returns the stored
-- payload (the values the save overwrote) for one revision, owner only.
create or replace function public.get_report_revision(p_revision_id bigint)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select r.changed
    from public.report_revisions r
   where r.id = p_revision_id
     and r.user_id = auth.uid();
$$;

revoke all on function public.get_report_revision(bigint) from public, anon;
grant execute on function public.get_report_revision(bigint) to authenticated;
