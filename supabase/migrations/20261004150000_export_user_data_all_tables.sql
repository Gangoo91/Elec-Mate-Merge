-- Right of access / portability export: every row the user owns, from every
-- public table with a user_id column, plus their stored files.
--
-- Why: user-data-export read a hand-written list of tables, six of which no
-- longer exist ("certificates", "inspection_reports", "projects",
-- "price_book_items", "site_assessments", "study_progress"), so the export
-- silently left out certificates (they live in `reports`), jobs, calendar,
-- AI chats, flashcards, OJT and photos (found 4 Oct 2026). A list will always
-- drift; discovering the tables can't.
--
-- service_role only — the edge function verifies the caller's JWT and passes
-- their own id. Never grant this to anon/authenticated.

create or replace function public.export_user_data(p_user uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  t record;
  rows jsonb;
  result jsonb := '{}'::jsonb;
begin
  for t in
    select c.table_name
    from information_schema.columns c
    join information_schema.tables tb
      on tb.table_schema = c.table_schema and tb.table_name = c.table_name
    where c.table_schema = 'public'
      and c.column_name = 'user_id'
      and c.data_type = 'uuid'
      and tb.table_type = 'BASE TABLE'
    order by c.table_name
  loop
    -- Credentials are stripped: OAuth tokens (calendar, email, accounting),
    -- share/sign link tokens and anything marked secret. An export file gets
    -- emailed and saved to laptops — it must never be a way into an account.
    execute format(
      'select coalesce(jsonb_agg(
         (select coalesce(jsonb_object_agg(k, v), ''{}''::jsonb)
            from jsonb_each(to_jsonb(x)) e(k, v)
           where k !~* %L)
       ), ''[]''::jsonb)
       from (select * from public.%I where user_id = $1 limit 5000) x',
      '(encrypted|access_token|refresh_token|sync_token|public_token|share_token|invite_token|signing_token|purchase_token|secret|password|api_key|^token$)',
      t.table_name
    ) into rows using p_user;
    if jsonb_array_length(rows) > 0 then
      result := result || jsonb_build_object(t.table_name, rows);
    end if;
  end loop;

  -- Stored files (photos, documents, signatures) — paths only; the edge
  -- function turns them into time-limited download links.
  select coalesce(jsonb_agg(jsonb_build_object(
           'bucket', o.bucket_id, 'path', o.name, 'created_at', o.created_at,
           'size', o.metadata->>'size', 'type', o.metadata->>'mimetype')), '[]'::jsonb)
    into rows
    from storage.objects o
   where o.owner = p_user
      or o.name like p_user::text || '/%';  -- same rule as gdpr_list_user_storage
  if jsonb_array_length(rows) > 0 then
    result := result || jsonb_build_object('_files', rows);
  end if;

  return result;
end;
$$;

revoke all on function public.export_user_data(uuid) from public, anon, authenticated;
grant execute on function public.export_user_data(uuid) to service_role;
