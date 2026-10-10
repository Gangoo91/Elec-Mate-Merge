-- ELE-2067 — fixes from the review of "Bring your data across".
--
--   * Undo keeps anything changed since the import. Each record the import
--     created gets a fingerprint when the import finishes (the row as JSON,
--     less updated_at; an invoice's sent/overdue count as one state, because
--     the old invoice screen flips sent to overdue on load). Undo compares it
--     and keeps a record that has changed, as "Changed since the import".
--     Imports finished before this have no fingerprint: there, a row whose
--     updated_at is after the import finished is kept.
--   * Undo takes out only the price book items the import added (and has not
--     been repriced since), not the whole list. The list goes only once it is
--     empty, so items added to it later stay.
--   * Undo refuses an import that is still running. One left "running" for
--     over 10 minutes (the tab was closed) is closed off as failed at its last
--     row, then undone.
--   * _imp_seen also counts failed imports and rows kept by an undo, so
--     running the same files again after a failed or partly undone import
--     does not bring the same kit, sites or jobs in twice.
--   * VAT is worked out as total − subtotal when the file has both but no
--     VAT column (it came in as 0 before).
--   * Each result row says which new customer it made ('nc'), so the check
--     step can count new customers once across chunks (the dry run rolls each
--     chunk back, so the same customer was counted again and again).
--   * An import does not fire the firm's job / invoice webhooks: the
--     deliveries it queued are removed in the same transaction, before any
--     dispatcher can see them.
--   * Only an employer account can ask for the free move (is_employer_account);
--     before, any signed-in user could file one for themselves.
--
-- Additive: one nullable column on ELE-2067's own employer_import_rows, new
-- helper functions, and ELE-2067's own functions (nothing in HEAD or build 49
-- calls them) replaced with the same signatures. The migration-request insert
-- policy is ELE-2067's own uncommitted table; it is tightened, not loosened.

alter table public.employer_import_rows add column if not exists fingerprint text;

comment on column public.employer_import_rows.fingerprint is
  'ELE-2067: md5 of the created record as it stood when the import finished (less updated_at). Undo keeps the record if it no longer matches.';

-- ── Fingerprint of one imported record ──────────────────────────────────
create or replace function public._imp_fingerprint(p_table text, p_id uuid, p_batch uuid)
returns text
language plpgsql stable security definer set search_path = public as $$
declare v text;
begin
  if p_table = 'quotes' then
    select md5(((to_jsonb(q) - 'updated_at' - 'invoice_status')
                || jsonb_build_object('invoice_status',
                     case when lower(coalesce(q.invoice_status, '')) in ('sent', 'overdue') then 'sent'
                          else q.invoice_status end))::text)
      into v from public.quotes q where q.id = p_id;
  elsif p_table in ('customers', 'customer_properties', 'employer_jobs', 'employer_employees', 'employer_company_tools') then
    execute format('select md5((to_jsonb(x) - ''updated_at'')::text) from public.%I x where x.id = $1', p_table)
      into v using p_id;
  elsif p_table = 'materials_list_items' then
    select md5(ei::text) into v
      from public.employer_import_rows l
      join public.materials_lists ml on ml.id = l.row_id,
           jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) ei
     where l.batch_id = p_batch and l.table_name = 'materials_lists' and ei ->> 'id' = p_id::text
     limit 1;
  end if;
  return v;
end $$;

revoke all on function public._imp_fingerprint(text, uuid, uuid) from public, anon, authenticated;

-- 'gone' when the record is no longer there, a reason when it has been
-- changed since the import, null when it is as the import left it.
create or replace function public._imp_changed_reason(
  p_table text, p_id uuid, p_fingerprint text, p_since timestamptz, p_batch uuid)
returns text
language plpgsql stable security definer set search_path = public as $$
declare v_now text; v_changed boolean;
begin
  if p_table not in ('quotes', 'customers', 'customer_properties', 'employer_jobs',
                     'employer_employees', 'employer_company_tools') then
    return null;
  end if;
  v_now := public._imp_fingerprint(p_table, p_id, p_batch);
  if v_now is null then return 'gone'; end if;
  if p_fingerprint is not null then
    return case when v_now <> p_fingerprint then 'Changed since the import' end;
  end if;
  execute format('select true from public.%I x where x.id = $1 and x.updated_at > $2', p_table)
    into v_changed using p_id, p_since + interval '1 second';
  return case when v_changed then 'Changed since the import' end;
end $$;

revoke all on function public._imp_changed_reason(text, uuid, text, timestamptz, uuid) from public, anon, authenticated;

-- ── Seen before: failed imports and kept rows count too ─────────────────
create or replace function public._imp_seen(p_firm uuid, p_batch uuid, p_source text, p_kind text, p_ref text)
returns uuid language sql stable security definer set search_path = public as $$
  select r.row_id from public.employer_import_rows r
    join public.employer_import_batches b on b.id = r.batch_id
   where p_ref is not null and r.employer_id = p_firm and r.kind = p_kind and r.source_ref = p_ref
     and b.source = p_source
     and (b.status in ('running', 'complete', 'failed') or r.action = 'kept')
   order by r.id limit 1
$$;

revoke all on function public._imp_seen(uuid, uuid, text, text, text) from public, anon, authenticated;

-- ── Finish: counts, and a fingerprint of everything created ─────────────
create or replace function public.finish_firm_import(p_batch uuid, p_failed boolean default false)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare b public.employer_import_batches; v_counts jsonb;
begin
  select * into b from public.employer_import_batches where id = p_batch;
  if b.id is null or auth.uid() is null or not public.can_see_firm_money(b.employer_id) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select coalesce(jsonb_object_agg(kind, jsonb_build_object('created', c, 'matched', m)), '{}'::jsonb)
    into v_counts
    from (select kind, count(*) filter (where action = 'created') c, count(*) filter (where action = 'matched') m
            from public.employer_import_rows
           where batch_id = p_batch and table_name <> 'materials_lists' group by kind) x;
  if b.status = 'running' then
    update public.employer_import_rows x
       set fingerprint = public._imp_fingerprint(x.table_name, x.row_id, p_batch)
     where x.batch_id = p_batch and x.action = 'created' and x.table_name <> 'materials_lists'
       and x.fingerprint is null;
  end if;
  update public.employer_import_batches
     set status = case when p_failed then 'failed' else 'complete' end,
         counts = counts || v_counts, completed_at = now()
   where id = p_batch and status = 'running';
  return v_counts;
end $$;

-- ── import_firm_rows: VAT, new-customer keys, no webhooks ───────────────
-- Patched in place from the live definition; same signature.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.import_firm_rows(uuid, text, uuid, text, jsonb, boolean)'::regprocedure);
  if position('firm_webhook_deliveries' in d) > 0 then return; end if;
  n := d;

  -- VAT from total − subtotal when the file has no VAT column.
  n := replace(n,
    $a$v_vat := coalesce(public._imp_num(r, 'vat'), 0);$a$,
    $a$v_vat := coalesce(public._imp_num(r, 'vat'),
                       case when public._imp_num(r, 'subtotal') is not null and public._imp_num(r, 'total') is not null
                                 and public._imp_num(r, 'total') >= public._imp_num(r, 'subtotal')
                            then public._imp_num(r, 'total') - public._imp_num(r, 'subtotal') end,
                       0);$a$);
  if n = d then raise exception 'import_firm_rows VAT patch did not apply'; end if;
  d := n;

  -- Say which new customer a row made, so the client counts each one once.
  n := replace(n,
    $a$          'reason', v_reason)));$a$,
    $a$          'reason', v_reason,
          'nc', case when v_new then coalesce(public._imp_txt(r, 'customer_ref', 200),
                  'name:' || public._imp_name(coalesce(public._imp_txt(r, 'customer_name', 300),
                                                       public._imp_txt(r, 'customer_email', 320)))) end)));$a$);
  if n = d then raise exception 'import_firm_rows new-customer patch did not apply'; end if;
  d := n;

  -- No job / invoice webhooks for imported records.
  n := replace(n,
    $a$    if p_dry_run then
      raise exception using errcode = 'P0011';$a$,
    $a$    if not p_dry_run and to_regclass('public.firm_webhook_deliveries') is not null then
      begin
        execute $w$delete from public.firm_webhook_deliveries d
                    where d.firm_id = $1 and d.status = 'pending' and d.created_at = now()
                      and coalesce(d.payload #>> '{data,job,id}', d.payload #>> '{data,invoice,id}') in (
                        select x.row_id::text from public.employer_import_rows x
                         where x.batch_id = $2 and x.action = 'created'
                           and x.table_name in ('employer_jobs', 'quotes'))$w$
          using p_firm, v_batch;
      exception when others then
        raise warning '[import_firm_rows] webhook tidy: %', sqlerrm;
      end;
    end if;

    if p_dry_run then
      raise exception using errcode = 'P0011';$a$);
  if n = d then raise exception 'import_firm_rows webhook patch did not apply'; end if;
  execute n;
end
$mig$;

-- ── Undo ────────────────────────────────────────────────────────────────
create or replace function public.undo_firm_import(p_batch uuid, p_limit int default 300)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  b public.employer_import_batches;
  r record;
  it record;
  v_keep text;
  v_deleted int := 0;
  v_kept int := 0;
  v_remaining int;
  v_reasons jsonb := '[]'::jsonb;
  v_by jsonb := '{}'::jsonb;
  v_quotes uuid[];
  v_since timestamptz;
  v_last timestamptz;
  v_drop text[];
begin
  select * into b from public.employer_import_batches where id = p_batch for update;
  if b.id is null or auth.uid() is null or not public.can_see_firm_money(b.employer_id) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if b.status = 'undone' then
    return jsonb_build_object('deleted', 0, 'kept', 0, 'remaining', 0, 'status', 'undone');
  end if;
  if b.status = 'running' then
    select max(x.created_at) into v_last from public.employer_import_rows x where x.batch_id = p_batch;
    if greatest(b.created_at, coalesce(v_last, b.created_at)) > now() - interval '10 minutes' then
      raise exception 'This import is still running. Let it finish, or stop it, then undo it.' using errcode = '55006';
    end if;
    -- Left running by a closed tab: close it off where it stopped.
    update public.employer_import_batches
       set status = 'failed', completed_at = coalesce(v_last, b.created_at)
     where id = p_batch and status = 'running'
    returning * into b;
  end if;
  v_since := coalesce(b.completed_at, b.created_at);

  select coalesce(array_agg(row_id) filter (where table_name = 'quotes'), '{}')
    into v_quotes
    from public.employer_import_rows where batch_id = p_batch and action = 'created';

  for r in
    select x.* from public.employer_import_rows x
     where x.batch_id = p_batch and x.action = 'created' and x.table_name <> 'materials_list_items'
     order by case x.table_name
                when 'quotes' then 1 when 'materials_lists' then 2 when 'employer_company_tools' then 3
                when 'employer_employees' then 4 when 'employer_jobs' then 5
                when 'customer_properties' then 6 when 'customers' then 7 else 8 end, x.id
     limit greatest(1, least(coalesce(p_limit, 300), 1000))
  loop
    v_keep := null;

    -- Price book: item by item. Only items this import added and nobody has
    -- repriced or edited since; the list goes only when nothing is left in it.
    if r.table_name = 'materials_lists' then
      begin
        v_drop := '{}';
        for it in
          select x.id as map_id, x.row_id, x.fingerprint, e.item
            from public.employer_import_rows x
            left join lateral (
              select ei as item
                from public.materials_lists ml,
                     jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) ei
               where ml.id = r.row_id and ei ->> 'id' = x.row_id::text
               limit 1) e on true
           where x.batch_id = p_batch and x.table_name = 'materials_list_items' and x.action = 'created'
        loop
          if it.item is not null
             and ((it.fingerprint is not null and md5(it.item::text) <> it.fingerprint)
                  or (it.fingerprint is null and (it.item ->> 'price_updated_at') is distinct from (it.item ->> 'added_at'))) then
            update public.employer_import_rows set action = 'kept' where id = it.map_id;
            v_kept := v_kept + 1;
            v_reasons := v_reasons || jsonb_build_array(jsonb_build_object(
              'kind', 'price_book', 'id', it.row_id, 'reason', 'Changed since the import'));
          else
            if it.item is not null then v_drop := v_drop || it.row_id::text; end if;
            delete from public.employer_import_rows where id = it.map_id;
            v_deleted := v_deleted + 1;
            v_by := jsonb_set(v_by, array['price_book'], to_jsonb(coalesce((v_by ->> 'price_book')::int, 0) + 1));
          end if;
        end loop;
        if cardinality(v_drop) > 0 then
          update public.materials_lists ml
             set items = coalesce((select jsonb_agg(ei) from jsonb_array_elements(ml.items) ei
                                    where not ((ei ->> 'id') = any (v_drop))), '[]'::jsonb)
           where ml.id = r.row_id and ml.user_id = b.employer_id and jsonb_typeof(ml.items) = 'array';
        end if;
        if exists (select 1 from public.materials_lists ml where ml.id = r.row_id
                    and jsonb_array_length(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) > 0) then
          -- Items added later or kept: the list stays.
          update public.employer_import_rows set action = 'kept' where id = r.id;
        else
          delete from public.materials_lists where id = r.row_id and user_id = b.employer_id;
          delete from public.employer_import_rows where id = r.id;
        end if;
      exception when others then
        update public.employer_import_rows set action = 'kept' where id = r.id;
        v_reasons := v_reasons || jsonb_build_array(jsonb_build_object(
          'kind', 'price_book', 'id', r.row_id, 'reason', 'Still in use (' || left(sqlerrm, 120) || ')'));
      end;
      continue;
    end if;

    begin
      if r.table_name = 'quotes' then
        select case
                 when q.id is null then 'gone'
                 when q.invoice_sent_at is not null or q.first_sent_at is not null then 'Sent from Elec-Mate since the import'
                 when exists (select 1 from public.invoice_payments p where p.quote_id = q.id) then 'Has a payment recorded'
                 when exists (select 1 from public.credit_notes c where c.invoice_id = q.id) then 'Has a credit note'
                 when exists (select 1 from public.quotes z where (z.parent_quote_id = q.id or z.deposit_invoice_id = q.id or z.supersedes_id = q.id) and z.id <> all (v_quotes)) then 'Another quote or invoice is built on it'
               end
          into v_keep from (select 1) d left join public.quotes q on q.id = r.row_id;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.quotes where id = r.row_id;
        end if;

      elsif r.table_name = 'employer_company_tools' then
        if exists (select 1 from public.employer_tool_checks c where c.tool_id = r.row_id)
           or exists (select 1 from public.employer_tool_events e where e.tool_id = r.row_id) then
          v_keep := 'Has checks or movements recorded';
        end if;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.employer_company_tools where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'employer_employees' then
        if exists (select 1 from public.employer_employees e where e.id = r.row_id and e.user_id is not null) then
          v_keep := 'Has joined the team';
        elsif exists (select 1 from public.employer_job_assignments a where a.employee_id = r.row_id)
           or exists (select 1 from public.employer_timesheets t where t.employee_id = r.row_id) then
          v_keep := 'Booked on jobs or has time logged';
        end if;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.employer_seats where employee_id = r.row_id and user_id is null and status = 'pending';
          delete from public.employer_employees where id = r.row_id and employer_id = b.employer_id;
        end if;

      elsif r.table_name = 'employer_jobs' then
        if exists (select 1 from public.employer_job_assignments a where a.job_id = r.row_id)
           or exists (select 1 from public.employer_timesheets t where t.job_id = r.row_id)
           or exists (select 1 from public.employer_job_comments c where c.job_id = r.row_id)
           or exists (select 1 from public.employer_job_certificates c where c.job_id = r.row_id)
           or exists (select 1 from public.job_photos p where p.job_id = r.row_id)
           or exists (select 1 from public.employer_job_tasks t where t.job_id = r.row_id)
           or exists (select 1 from public.rams_documents d where d.employer_job_id = r.row_id)
           or exists (select 1 from public.employer_expense_claims x where x.job_id = r.row_id)
           or exists (select 1 from public.employer_material_orders o where o.job_id = r.row_id)
           or exists (select 1 from public.quotes q where q.employer_job_id = r.row_id) then
          v_keep := 'The job has been worked on since';
        end if;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.employer_jobs where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'customer_properties' then
        if exists (select 1 from public.reports x where x.property_id = r.row_id)
           or exists (select 1 from public.site_notes x where x.property_id = r.row_id)
           or exists (select 1 from public.photo_projects x where x.property_id = r.row_id) then
          v_keep := 'Has certificates, notes or photos';
        end if;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.customer_properties where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'customers' then
        if exists (select 1 from public.quotes x where x.customer_id = r.row_id)
           or exists (select 1 from public.employer_jobs x where x.customer_id = r.row_id)
           or exists (select 1 from public.reports x where x.customer_id = r.row_id)
           or exists (select 1 from public.customer_properties x where x.customer_id = r.row_id)
           or exists (select 1 from public.enquiries x where x.customer_id = r.row_id or x.matched_customer_id = r.row_id)
           or exists (select 1 from public.maintenance_contracts x where x.customer_id = r.row_id)
           or exists (select 1 from public.spark_projects x where x.customer_id = r.row_id)
           or exists (select 1 from public.client_portal_links x where x.customer_id = r.row_id)
           or exists (select 1 from public.employer_client_messages x where x.customer_id = r.row_id)
           or exists (select 1 from public.calendar_events x where x.client_id = r.row_id and x.mirrored_from_job is null) then
          v_keep := 'Has quotes, jobs, certificates or messages outside this import';
        end if;
        if v_keep is null then v_keep := public._imp_changed_reason(r.table_name, r.row_id, r.fingerprint, v_since, p_batch); end if;
        if v_keep is null then
          delete from public.customers where id = r.row_id and user_id = b.employer_id;
        end if;
      end if;
    exception when others then
      v_keep := 'Still in use (' || left(sqlerrm, 120) || ')';
    end;

    if v_keep = 'gone' then
      v_keep := null;  -- already deleted by hand; nothing to keep
    end if;
    if v_keep is null then
      delete from public.employer_import_rows where id = r.id;
      v_deleted := v_deleted + 1;
      v_by := jsonb_set(v_by, array[r.kind], to_jsonb(coalesce((v_by ->> r.kind)::int, 0) + 1));
    else
      update public.employer_import_rows set action = 'kept' where id = r.id;
      v_kept := v_kept + 1;
      v_reasons := v_reasons || jsonb_build_array(jsonb_build_object('kind', r.kind, 'id', r.row_id, 'reason', v_keep));
    end if;
  end loop;

  select count(*) into v_remaining from public.employer_import_rows
   where batch_id = p_batch and action = 'created' and table_name <> 'materials_list_items';

  update public.employer_import_batches
     set undo_counts = jsonb_build_object(
           'deleted', coalesce((undo_counts ->> 'deleted')::int, 0) + v_deleted,
           'kept', coalesce((undo_counts ->> 'kept')::int, 0) + v_kept,
           'kept_rows', coalesce(undo_counts -> 'kept_rows', '[]'::jsonb) || v_reasons),
         status = case when v_remaining = 0 then 'undone' else status end,
         undone_at = case when v_remaining = 0 then now() else undone_at end,
         undone_by = case when v_remaining = 0 then auth.uid() else undone_by end
   where id = p_batch;

  if v_remaining = 0 then
    -- Links to records that were already here go; kept rows stay as the
    -- record of what was left in.
    delete from public.employer_import_rows where batch_id = p_batch and action = 'matched';
  end if;

  return jsonb_build_object('deleted', v_deleted, 'kept', v_kept, 'remaining', v_remaining,
                            'by_kind', v_by, 'kept_rows', v_reasons,
                            'status', case when v_remaining = 0 then 'undone' else 'undoing' end);
end $$;

revoke all on function public.undo_firm_import(uuid, int) from public, anon;
grant execute on function public.undo_firm_import(uuid, int) to authenticated;
revoke all on function public.finish_firm_import(uuid, boolean) from public, anon;
grant execute on function public.finish_firm_import(uuid, boolean) to authenticated;

-- ── Free move requests: employer accounts only ──────────────────────────
drop policy if exists "Owner asks for a migration" on public.employer_migration_requests;
create policy "Owner asks for a migration" on public.employer_migration_requests
  for insert to authenticated
  with check (employer_id = (select auth.uid()) and requested_by = (select auth.uid()) and status = 'new'
              and public.is_employer_account((select auth.uid())));
