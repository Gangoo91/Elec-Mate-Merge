-- ELE-2071 — Receipts and supplier bills by photo (or PDF).
--
-- Snap it in Worker Tools or the Employer Hub. The file goes to the private
-- expense-receipts bucket (captures/<uid>/<id>.<ext>) and one row lands here,
-- through the worker outbox, so it works with no signal and lands once (the
-- row id is the phone's id). The read-receipt edge function reads it with AI
-- (supplier, date, lines, net / VAT / gross, VAT number) and suggests where it
-- goes. NOTHING is posted until the person confirms with post_receipt_capture:
--   * expense  → an employer_expense_claims row (Pending, the normal approval);
--   * po_cost  → an employer_supplier_invoices row on the purchase order (the
--                bill replaces the PO total in the job's costs);
--   * job_cost → record_job_cost (materials / equipment / other).
-- Each of those already feeds the job's financials (finance_cost_rows).
--
-- Duplicates: the same file (SHA-256 from the phone), or the same supplier,
-- date and total, or the same supplier invoice number, is flagged and has to
-- be posted on purpose.
--
-- Additive only: one table, one storage read policy, new functions.

create table if not exists public.employer_receipt_captures (
  id uuid primary key,                         -- the phone's id (outbox op id)
  employer_id uuid not null,
  captured_by uuid not null,
  employee_id uuid references public.employer_employees(id) on delete set null,
  source text not null default 'worker' check (source in ('worker', 'office', 'email')),
  file_path text not null,                     -- expense-receipts bucket
  file_mime text,
  file_name text,
  file_hash text,
  captured_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  job_id uuid references public.employer_jobs(id) on delete set null,
  note text,
  status text not null default 'new'
    check (status in ('new', 'reading', 'read', 'failed', 'posted', 'discarded')),
  read_at timestamptz,
  read_error text,
  extracted jsonb,
  suggestion jsonb not null default '{}'::jsonb,
  duplicate_of uuid,
  duplicate_reason text,
  posted_as text check (posted_as in ('expense', 'po_cost', 'job_cost')),
  posted_ref uuid,
  posted_amount numeric(12, 2),
  posted_vat numeric(12, 2),
  posted_by uuid,
  posted_at timestamptz,
  discarded_at timestamptz
);
create index if not exists employer_receipt_captures_firm on public.employer_receipt_captures (employer_id, created_at desc);
create index if not exists employer_receipt_captures_mine on public.employer_receipt_captures (captured_by, created_at desc);
create index if not exists employer_receipt_captures_hash on public.employer_receipt_captures (employer_id, file_hash) where file_hash is not null;
alter table public.employer_receipt_captures enable row level security;
revoke all on public.employer_receipt_captures from anon, authenticated;
grant select on public.employer_receipt_captures to authenticated;
drop policy if exists "Own or firm money reads receipt captures" on public.employer_receipt_captures;
create policy "Own or firm money reads receipt captures" on public.employer_receipt_captures
  for select to authenticated
  using (captured_by = auth.uid() or public.can_see_firm_money(employer_id));
comment on table public.employer_receipt_captures is
  '[EMPLOYER HUB ← WORKER TOOLS] Receipts and supplier bills captured by photo or PDF (ELE-2071), read by AI (read-receipt) and posted only on confirmation as an expense claim, a PO bill or a job cost. Scope: employer_id = firm owner; the capturer and owner/admin (can_see_firm_money) read it. Used by: Worker Tools Expenses, Employer Hub Expenses. Rule: written only by capture_receipt / post_receipt_capture / discard_receipt_capture and the read-receipt function (service role); id is the phone''s outbox id.';

-- The owner / admin can open a captured file (the capturer already can: owner policy).
drop policy if exists "Firm money reads receipt capture files" on storage.objects;
create policy "Firm money reads receipt capture files" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'expense-receipts'
    and name like 'captures/%'
    and exists (select 1 from public.employer_receipt_captures c
                 where c.file_path = objects.name and public.can_see_firm_money(c.employer_id))
  );

-- ── Who is capturing, for which firm ───────────────────────────────────────
create or replace function public._receipt_firm_member(p_firm uuid)
returns table (ok boolean, employee_id uuid, office boolean)
language sql
stable
security definer
set search_path to 'public'
as $$
  select (p_firm in (select public.my_employer_scope()) or e.id is not null),
         e.id,
         p_firm in (select public.my_employer_scope())
    from (select 1) one
    left join lateral (
      select x.id from public.employer_employees x
       where x.employer_id = p_firm and x.user_id = auth.uid()
         and lower(coalesce(x.status, '')) = 'active'
       order by x.created_at limit 1) e on true
$$;
revoke all on function public._receipt_firm_member(uuid) from public, anon, authenticated;

-- ── Duplicates and suggestions (after the AI read, or on capture) ─────────
create or replace function public.receipt_flag_duplicates(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  c public.employer_receipt_captures%rowtype;
  v_dup uuid;
  v_reason text;
  v_supplier text;
  v_date date;
  v_gross numeric;
  v_inv text;
  v_claim uuid;
  v_order uuid;
  v_sugg jsonb;
begin
  select * into c from public.employer_receipt_captures where id = p_id;
  if not found then return null; end if;

  v_supplier := nullif(lower(regexp_replace(coalesce(c.extracted->>'supplier', ''), '[^a-z0-9]', '', 'gi')), '');
  v_date := case when (c.extracted->>'date') ~ '^\d{4}-\d{2}-\d{2}$' then (c.extracted->>'date')::date end;
  v_gross := case when (c.extracted->>'gross') ~ '^-?\d+(\.\d+)?$' then round((c.extracted->>'gross')::numeric, 2) end;
  v_inv := nullif(lower(regexp_replace(coalesce(c.extracted->>'invoice_number', ''), '\s', '', 'g')), '');

  -- 1. The same file.
  if c.file_hash is not null then
    select x.id into v_dup from public.employer_receipt_captures x
     where x.employer_id = c.employer_id and x.id <> c.id and x.file_hash = c.file_hash
       and x.status <> 'discarded' and (x.created_at < c.created_at or (x.created_at = c.created_at and x.id < c.id))
     order by x.created_at limit 1;
    if v_dup is not null then v_reason := 'The same photo or file was sent before'; end if;
  end if;
  -- 2. The same supplier invoice number.
  if v_dup is null and v_inv is not null and v_supplier is not null then
    select x.id into v_dup from public.employer_receipt_captures x
     where x.employer_id = c.employer_id and x.id <> c.id and x.status <> 'discarded'
       and lower(regexp_replace(coalesce(x.extracted->>'invoice_number', ''), '\s', '', 'g')) = v_inv
       and lower(regexp_replace(coalesce(x.extracted->>'supplier', ''), '[^a-z0-9]', '', 'gi')) = v_supplier
       and (x.created_at < c.created_at or (x.created_at = c.created_at and x.id < c.id))
     order by x.created_at limit 1;
    if v_dup is not null then v_reason := 'A bill with the same supplier and invoice number was sent before'; end if;
  end if;
  -- 3. The same supplier, date and total.
  if v_dup is null and v_supplier is not null and v_date is not null and v_gross is not null then
    select x.id into v_dup from public.employer_receipt_captures x
     where x.employer_id = c.employer_id and x.id <> c.id and x.status <> 'discarded'
       and lower(regexp_replace(coalesce(x.extracted->>'supplier', ''), '[^a-z0-9]', '', 'gi')) = v_supplier
       and x.extracted->>'date' = v_date::text
       and case when (x.extracted->>'gross') ~ '^-?\d+(\.\d+)?$' then round((x.extracted->>'gross')::numeric, 2) end = v_gross
       and (x.created_at < c.created_at or (x.created_at = c.created_at and x.id < c.id))
     order by x.created_at limit 1;
    if v_dup is not null then v_reason := 'A receipt from the same supplier, on the same day, for the same total was sent before'; end if;
  end if;
  -- 4. An expense already claimed for the same amount on the same day by the same person.
  if v_dup is null and c.employee_id is not null and v_date is not null and v_gross is not null then
    select ec.id into v_claim from public.employer_expense_claims ec
     where ec.employee_id = c.employee_id and round(ec.amount, 2) = v_gross
       and coalesce(ec.incurred_on, ec.submitted_date) = v_date
       and lower(coalesce(ec.status, '')) <> 'rejected'
     limit 1;
    if v_claim is not null then
      v_reason := 'You already claimed this amount for that day';
    end if;
  end if;

  -- Where it probably goes.
  if v_supplier is not null then
    select mo.id into v_order from public.employer_material_orders mo
      left join public.employer_suppliers s on s.id = mo.supplier_id
     where mo.employer_id = c.employer_id
       and lower(coalesce(mo.status, '')) not in ('draft', 'cancelled', 'canceled')
       and lower(regexp_replace(coalesce(s.name, ''), '[^a-z0-9]', '', 'gi')) = v_supplier
       and not exists (select 1 from public.employer_supplier_invoices si where si.order_id = mo.id)
       and (c.job_id is null or mo.job_id = c.job_id)
     order by abs(coalesce(mo.total, 0) - coalesce(v_gross, 0)), mo.created_at desc
     limit 1;
  end if;
  v_sugg := jsonb_strip_nulls(jsonb_build_object(
    'post_as', case when v_order is not null then 'po_cost'
                    when c.source = 'worker' then 'expense'
                    when c.job_id is not null then 'job_cost'
                    else 'expense' end,
    'order_id', v_order,
    'job_id', coalesce(c.job_id, (select mo.job_id from public.employer_material_orders mo where mo.id = v_order)),
    'claim_id', v_claim));

  update public.employer_receipt_captures
     set duplicate_of = v_dup,
         duplicate_reason = v_reason,
         suggestion = v_sugg
   where id = p_id;
  return jsonb_build_object('duplicate_of', v_dup, 'duplicate_reason', v_reason, 'suggestion', v_sugg);
end;
$$;
revoke all on function public.receipt_flag_duplicates(uuid) from public, anon, authenticated;
grant execute on function public.receipt_flag_duplicates(uuid) to service_role;

-- ── Capture (from the outbox) ──────────────────────────────────────────────
create or replace function public.capture_receipt(
  p_id uuid, p_firm uuid, p_path text, p_mime text default null, p_hash text default null,
  p_source text default 'worker', p_job uuid default null, p_note text default null,
  p_file_name text default null, p_captured_at timestamptz default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  m record;
  c public.employer_receipt_captures%rowtype;
begin
  if v_uid is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  select * into c from public.employer_receipt_captures where id = p_id;
  if found then
    if c.captured_by <> v_uid then raise exception 'That was not yours' using errcode = '42501'; end if;
    return jsonb_build_object('id', c.id, 'already', true, 'duplicate_of', c.duplicate_of,
                              'duplicate_reason', c.duplicate_reason);
  end if;

  select * into m from public._receipt_firm_member(p_firm);
  if not coalesce(m.ok, false) then
    raise exception 'You are not part of this firm any more, so the receipt could not be added.' using errcode = 'P0001';
  end if;
  if p_path is null or p_path not like 'captures/' || v_uid::text || '/%' then
    raise exception 'That file could not be attached.' using errcode = '42501';
  end if;
  if p_source not in ('worker', 'office') then
    raise exception 'Unknown source' using errcode = '22023';
  end if;
  if p_job is not null and not exists (select 1 from public.employer_jobs j where j.id = p_job and j.user_id = p_firm) then
    p_job := null;
  end if;

  insert into public.employer_receipt_captures (
    id, employer_id, captured_by, employee_id, source, file_path, file_mime, file_name, file_hash,
    captured_at, job_id, note)
  values (
    p_id, p_firm, v_uid, m.employee_id, case when m.office and p_source = 'office' then 'office' else 'worker' end,
    p_path, left(p_mime, 80), left(p_file_name, 200), nullif(left(p_hash, 128), ''),
    least(coalesce(p_captured_at, now()), now()), p_job, nullif(left(btrim(coalesce(p_note, '')), 500), ''));

  perform public.receipt_flag_duplicates(p_id);
  select * into c from public.employer_receipt_captures where id = p_id;
  return jsonb_build_object('id', p_id, 'already', false, 'duplicate_of', c.duplicate_of,
                            'duplicate_reason', c.duplicate_reason);
end;
$$;
revoke all on function public.capture_receipt(uuid, uuid, text, text, text, text, uuid, text, text, timestamptz) from public, anon;
grant execute on function public.capture_receipt(uuid, uuid, text, text, text, text, uuid, text, text, timestamptz) to authenticated;

-- ── The list, with what can be posted where ───────────────────────────────
create or replace function public.get_receipt_captures(p_firm uuid, p_scope text default 'mine')
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  m record;
  v_money boolean;
  v_firm_scope boolean;
begin
  if v_uid is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  select * into m from public._receipt_firm_member(p_firm);
  if not coalesce(m.ok, false) then
    return jsonb_build_object('captures', '[]'::jsonb, 'can', '[]'::jsonb);
  end if;
  v_money := public.can_see_firm_money(p_firm);
  v_firm_scope := p_scope = 'firm' and v_money;

  return jsonb_build_object(
    'money', v_money,
    'employee_id', m.employee_id,
    -- What this person can post a receipt as.
    'can', to_jsonb(array_remove(array[
      case when m.employee_id is not null then 'expense' end,
      case when v_money then 'po_cost' end,
      case when v_money then 'job_cost' end], null)),
    'captures', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', c.id, 'source', c.source, 'status', c.status,
               'captured_at', c.captured_at, 'created_at', c.created_at,
               'captured_by_name', coalesce(e.name, p.full_name, 'Team member'),
               'mine', c.captured_by = v_uid,
               'file_path', c.file_path, 'file_mime', c.file_mime, 'file_name', c.file_name,
               'job_id', c.job_id, 'job_title', j.title, 'note', c.note,
               'extracted', c.extracted, 'read_error', c.read_error, 'read_at', c.read_at,
               'suggestion', c.suggestion,
               'duplicate_of', c.duplicate_of, 'duplicate_reason', c.duplicate_reason,
               'posted_as', c.posted_as, 'posted_ref', c.posted_ref, 'posted_at', c.posted_at,
               'posted_amount', c.posted_amount)
             order by c.created_at desc)
        from (select * from public.employer_receipt_captures x
               where x.employer_id = p_firm
                 and (v_firm_scope or x.captured_by = v_uid)
                 and (x.status not in ('posted', 'discarded') or x.posted_at > now() - interval '14 days')
               order by x.created_at desc limit 100) c
        left join public.employer_employees e on e.id = c.employee_id
        left join public.profiles p on p.id = c.captured_by
        left join public.employer_jobs j on j.id = c.job_id), '[]'::jsonb),
    'orders', case when v_money then coalesce((
      select jsonb_agg(jsonb_build_object('id', mo.id, 'order_number', mo.order_number,
               'supplier', s.name, 'total', mo.total, 'job_id', mo.job_id, 'job_title', j.title)
             order by mo.created_at desc)
        from (select * from public.employer_material_orders x
               where x.employer_id = p_firm
                 and lower(coalesce(x.status, '')) not in ('draft', 'cancelled', 'canceled')
                 and not exists (select 1 from public.employer_supplier_invoices si where si.order_id = x.id)
               order by x.created_at desc limit 40) mo
        left join public.employer_suppliers s on s.id = mo.supplier_id
        left join public.employer_jobs j on j.id = mo.job_id), '[]'::jsonb) else '[]'::jsonb end,
    'vat_registered', coalesce((select cp.default_vat_registered from public.company_profiles cp
                                 where cp.user_id = p_firm limit 1), false)
  );
end;
$$;
revoke all on function public.get_receipt_captures(uuid, text) from public, anon;
grant execute on function public.get_receipt_captures(uuid, text) to authenticated;

-- ── Post it, only on confirmation ──────────────────────────────────────────
create or replace function public.post_receipt_capture(
  p_id uuid, p_as text, p_gross numeric, p_vat numeric default null, p_supplier text default null,
  p_date date default null, p_job uuid default null, p_order uuid default null,
  p_category text default null, p_description text default null, p_receipt_url text default null,
  p_invoice_number text default null, p_allow_duplicate boolean default false)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  c public.employer_receipt_captures%rowtype;
  m record;
  v_money boolean;
  v_ref uuid;
  v_vat numeric := round(coalesce(p_vat, 0), 2);
  v_gross numeric := round(p_gross, 2);
  v_net numeric;
  v_desc text;
  v_po record;
  v_lines jsonb;
  v_vatreg boolean;
  v_cat text;
begin
  if v_uid is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  select * into c from public.employer_receipt_captures where id = p_id for update;
  if not found then raise exception 'That receipt was not found' using errcode = 'P0002'; end if;
  v_money := public.can_see_firm_money(c.employer_id);
  if c.captured_by <> v_uid and not v_money then
    raise exception 'That receipt was not found' using errcode = 'P0002';
  end if;
  if c.status = 'posted' then
    return jsonb_build_object('already', true, 'posted_as', c.posted_as, 'posted_ref', c.posted_ref);
  end if;
  if c.status = 'discarded' then
    raise exception 'That receipt was removed.' using errcode = 'P0001';
  end if;
  if c.duplicate_of is not null and not coalesce(p_allow_duplicate, false) then
    raise exception '%. Check it is not the same one, then post it anyway.', coalesce(c.duplicate_reason, 'This looks like one sent before') using errcode = 'P0001';
  end if;
  if v_gross is null or v_gross <= 0 or v_gross > 1000000 then
    raise exception 'Enter the total on the receipt.' using errcode = '22023';
  end if;
  if v_vat < 0 or v_vat > v_gross then
    raise exception 'Check the VAT: it can''t be more than the total.' using errcode = '22023';
  end if;
  v_net := v_gross - v_vat;
  if p_job is not null and not exists (select 1 from public.employer_jobs j where j.id = p_job and j.user_id = c.employer_id) then
    raise exception 'That job is not one of the firm''s.' using errcode = 'P0001';
  end if;
  v_desc := left(coalesce(nullif(btrim(coalesce(p_description, '')), ''),
                          nullif(btrim(coalesce(p_supplier, '')), ''),
                          c.extracted->>'supplier', 'Receipt'), 500);

  if p_as = 'expense' then
    select * into m from public._receipt_firm_member(c.employer_id);
    if c.captured_by <> v_uid or m.employee_id is null then
      raise exception 'Only the person who paid can claim it as an expense.' using errcode = 'P0001';
    end if;
    if p_receipt_url is null or p_receipt_url not like '%/expense-receipts/' || c.file_path then
      raise exception 'The receipt file could not be attached.' using errcode = '42501';
    end if;
    v_cat := coalesce(nullif(btrim(coalesce(p_category, '')), ''), 'Materials');
    insert into public.employer_expense_claims (employee_id, job_id, category, description, amount,
                                                receipt_url, status, submitted_date, incurred_on)
    values (m.employee_id, p_job, left(v_cat, 60), v_desc, v_gross, p_receipt_url, 'Pending',
            (now() at time zone 'Europe/London')::date, coalesce(p_date, (c.captured_at at time zone 'Europe/London')::date))
    returning id into v_ref;

  elsif p_as = 'po_cost' then
    if not v_money then raise exception 'Only the owner or an admin can post a supplier bill' using errcode = '42501'; end if;
    select mo.id, mo.total, mo.job_id into v_po from public.employer_material_orders mo
     where mo.id = p_order and mo.employer_id = c.employer_id;
    if v_po.id is null then raise exception 'Pick the purchase order this bill is for.' using errcode = 'P0001'; end if;
    select coalesce(jsonb_agg(jsonb_build_object(
             'description', l->>'description',
             'qty', case when (l->>'quantity') ~ '^-?\d+(\.\d+)?$' then (l->>'quantity')::numeric end,
             'unit_price', case when (l->>'unit_price') ~ '^-?\d+(\.\d+)?$' then (l->>'unit_price')::numeric end,
             'line_total', case when (l->>'net') ~ '^-?\d+(\.\d+)?$' then (l->>'net')::numeric end)), '[]'::jsonb)
      into v_lines
      from jsonb_array_elements(case when jsonb_typeof(c.extracted->'lines') = 'array' then c.extracted->'lines' else '[]'::jsonb end) l;
    insert into public.employer_supplier_invoices (order_id, employer_id, supplier_name, invoice_number,
                                                   invoice_total, lines, matched, variances)
    values (v_po.id, c.employer_id, left(coalesce(p_supplier, c.extracted->>'supplier'), 200),
            left(coalesce(p_invoice_number, c.extracted->>'invoice_number'), 80), v_gross, v_lines,
            abs(v_gross - coalesce(v_po.total, 0)) <= 0.01,
            case when abs(v_gross - coalesce(v_po.total, 0)) <= 0.01 then '[]'::jsonb
                 else jsonb_build_array(jsonb_build_object('type', 'total',
                   'detail', 'Bill total differs from the order total',
                   'amount', round(v_gross - coalesce(v_po.total, 0), 2))) end)
    returning id into v_ref;
    p_job := coalesce(p_job, v_po.job_id);

  elsif p_as = 'job_cost' then
    if not v_money then raise exception 'Only the owner or an admin can add a job cost' using errcode = '42501'; end if;
    if p_job is null then raise exception 'Pick the job this cost is for.' using errcode = 'P0001'; end if;
    select coalesce(cp.default_vat_registered, false) into v_vatreg from public.company_profiles cp where cp.user_id = c.employer_id limit 1;
    v_cat := case when lower(coalesce(p_category, '')) in ('materials', 'equipment', 'overheads', 'other') then lower(p_category) else 'materials' end;
    -- A VAT-registered firm reclaims the VAT, so its job cost is the net.
    v_ref := public.record_job_cost(p_job, v_cat, case when coalesce(v_vatreg, false) then v_net else v_gross end,
                                    coalesce(p_date, (c.captured_at at time zone 'Europe/London')::date),
                                    left('Receipt: ' || v_desc, 500));
  else
    raise exception 'Choose where this receipt goes.' using errcode = '22023';
  end if;

  update public.employer_receipt_captures
     set status = 'posted', posted_as = p_as, posted_ref = v_ref, posted_amount = v_gross, posted_vat = v_vat,
         posted_by = v_uid, posted_at = now(), job_id = coalesce(p_job, job_id),
         extracted = coalesce(extracted, '{}'::jsonb) || jsonb_strip_nulls(jsonb_build_object(
           'confirmed', jsonb_build_object('supplier', p_supplier, 'date', p_date, 'gross', v_gross, 'vat', v_vat,
                                           'invoice_number', p_invoice_number)))
   where id = p_id;

  return jsonb_build_object('already', false, 'posted_as', p_as, 'posted_ref', v_ref);
end;
$$;
revoke all on function public.post_receipt_capture(uuid, text, numeric, numeric, text, date, uuid, uuid, text, text, text, text, boolean) from public, anon;
grant execute on function public.post_receipt_capture(uuid, text, numeric, numeric, text, date, uuid, uuid, text, text, text, text, boolean) to authenticated;

create or replace function public.discard_receipt_capture(p_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare c public.employer_receipt_captures%rowtype;
begin
  select * into c from public.employer_receipt_captures where id = p_id for update;
  if not found or (c.captured_by <> auth.uid() and not public.can_see_firm_money(c.employer_id)) then
    raise exception 'That receipt was not found' using errcode = 'P0002';
  end if;
  if c.status = 'posted' then
    raise exception 'It has already been posted. Change it where it went.' using errcode = 'P0001';
  end if;
  update public.employer_receipt_captures set status = 'discarded', discarded_at = now() where id = p_id;
end;
$$;
revoke all on function public.discard_receipt_capture(uuid) from public, anon;
grant execute on function public.discard_receipt_capture(uuid) to authenticated;
