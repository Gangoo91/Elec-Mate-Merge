-- Gap analysis §4 item 4: ONE rule for a supplier bill against its purchase order.
--
-- Before this there were three:
--   * match-supplier-invoice (edge fn, photo/PDF of a bill on a PO): 2% on the
--     total and 2% on each line, matched by the first 8 letters of the name.
--   * post_receipt_capture (ELE-2071, a receipt posted as a PO bill): any
--     difference over 1p on the total, either way.
--   * _bill_vs_order / record_bill_line_variances (ELE-2066): 1% plus half a
--     penny on each line, matched by code, then name, then a similar name.
--
-- The one rule (chosen: the ELE-2066 line rule, the most careful matcher, with
-- the same tolerance applied to the total):
--   * A price is "dearer" when it is more than 1% plus half a penny over what
--     the order said (_bill_dearer). The 1% absorbs a merchant's rounding of a
--     pack price; anything bigger is a real price rise worth a look.
--   * Total: flagged as an overcharge only when the bill is dearer than the
--     order total by that rule. A SMALLER bill is a part delivery or a credit,
--     not a problem (the edge function already treated it that way; the 1p
--     rule flagged it).
--   * Short delivery: billed about the full order (not cheaper by the rule)
--     while fewer items are marked received than were ordered.
--   * Lines: _bill_vs_order, unchanged except that its tolerance now comes
--     from _bill_dearer / _bill_cheaper: a dearer line is a price_hike, a line
--     on the bill that was never ordered is not_ordered.
--
-- _supplier_bill_check(order, bill total, bill lines) returns
--   {matched, variances[]} and is what all three now use:
--   * post_receipt_capture (live body patched in place, same signature)
--   * record_bill_line_variances (same signature; rewrites the bill's whole
--     verdict from the one rule, so the total and line flags never disagree)
--   * match-supplier-invoice (edge fn calls supplier_bill_check; falls back to
--     its own old rule only if this function is missing). NOT DEPLOYED.
--
-- Additive: two new helpers, one new internal function, one new public
-- wrapper, three bodies changed with no signature change. HEAD does not call
-- any of the changed functions (all ELE-2066/2071, uncommitted); HEAD's
-- ProcurementSection only reads employer_supplier_invoices.variances, whose
-- shape ({type, detail, amount}) is unchanged.

create or replace function public._bill_dearer(p_billed numeric, p_expected numeric)
returns boolean language sql immutable set search_path to 'public' as $$
  select p_billed is not null and p_expected is not null and p_billed > p_expected * 1.01 + 0.005
$$;

create or replace function public._bill_cheaper(p_billed numeric, p_expected numeric)
returns boolean language sql immutable set search_path to 'public' as $$
  select p_billed is not null and p_expected is not null and p_billed < p_expected * 0.99 - 0.005
$$;

revoke all on function public._bill_dearer(numeric, numeric) from public, anon;
revoke all on function public._bill_cheaper(numeric, numeric) from public, anon;
grant execute on function public._bill_dearer(numeric, numeric) to authenticated, service_role;
grant execute on function public._bill_cheaper(numeric, numeric) to authenticated, service_role;

-- ── _bill_vs_order takes its tolerance from the one rule ──────────────────
do $do$
declare
  v_def text := pg_get_functiondef('public._bill_vs_order(jsonb, uuid)'::regprocedure);
  v_new text;
begin
  v_new := replace(v_def, 'unit_price > po_unit * 1.01 + 0.005', 'public._bill_dearer(unit_price, po_unit)');
  v_new := replace(v_new, 'unit_price < po_unit * 0.99 - 0.005', 'public._bill_cheaper(unit_price, po_unit)');
  if v_new = v_def or position('1.01 + 0.005' in v_new) > 0 or position('0.99 - 0.005' in v_new) > 0 then
    raise exception '_bill_vs_order: tolerance text not found as expected';
  end if;
  execute v_new;
end
$do$;

-- ── The one check ─────────────────────────────────────────────────────────
-- p_lines: the bill's lines, [{description, code?, qty|quantity, unit_price, line_total|net}]
create or replace function public._supplier_bill_check(p_order uuid, p_bill_total numeric, p_lines jsonb)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  o public.employer_material_orders%rowtype;
  v jsonb;
  v_var jsonb := '[]'::jsonb;
  v_po numeric;
  v_bill numeric := round(coalesce(p_bill_total, 0), 2);
  v_ordered numeric;
  v_received numeric;
  m text := 'FM999999990.00';
begin
  select * into o from public.employer_material_orders where id = p_order;
  if not found then
    return jsonb_build_object('matched', false, 'variances', '[]'::jsonb);
  end if;
  v_po := round(coalesce(o.total, 0), 2);

  select coalesce(sum(coalesce(public._pb_num(l, 'qty'), 0)), 0),
         coalesce(sum(coalesce(public._pb_num(l, 'received_qty'), 0)), 0)
    into v_ordered, v_received
    from jsonb_array_elements(case when jsonb_typeof(o.items) = 'array' then o.items else '[]'::jsonb end) l
   where jsonb_typeof(l) = 'object';

  if public._bill_dearer(v_bill, v_po) then
    v_var := v_var || jsonb_build_object('type', 'overcharge', 'source', 'total',
      'detail', 'Billed £' || to_char(v_bill, m) || ' but the order was £' || to_char(v_po, m),
      'amount', round(v_bill - v_po, 2));
  end if;

  if v_ordered > 0 and v_received < v_ordered and not public._bill_cheaper(v_bill, v_po) then
    v_var := v_var || jsonb_build_object('type', 'short_delivery', 'source', 'total',
      'detail', 'Billed £' || to_char(v_bill, m) || ', about the full order, but only '
                || trim(to_char(v_received, 'FM999999990.##')) || ' of '
                || trim(to_char(v_ordered, 'FM999999990.##')) || ' items are marked received',
      'amount', 0);
  end if;

  v := public._bill_vs_order(coalesce(p_lines, '[]'::jsonb), p_order);
  v_var := v_var || coalesce((
    select jsonb_agg(case
             when l ->> 'status' = 'dearer' then jsonb_build_object('type', 'price_hike', 'source', 'line_check',
               'detail', (l ->> 'po_name') || ': billed £' || to_char((l ->> 'unit_price')::numeric, m)
                         || ' each, the order said £' || to_char((l ->> 'po_unit_cost')::numeric, m),
               'amount', coalesce((l ->> 'diff_total')::numeric, 0))
             else jsonb_build_object('type', 'not_ordered', 'source', 'line_check',
               'detail', (l ->> 'description') || ' is on the bill but not on the order',
               'amount', coalesce((l ->> 'net')::numeric, 0)) end)
      from jsonb_array_elements(v -> 'lines') l
     where l ->> 'status' in ('dearer', 'not_ordered')), '[]'::jsonb);

  return jsonb_build_object('matched', jsonb_array_length(v_var) = 0, 'variances', v_var,
                            'bill_total', v_bill, 'po_total', v_po,
                            'dearer_total', coalesce(v -> 'dearer_total', '0'::jsonb));
end;
$$;
revoke all on function public._supplier_bill_check(uuid, numeric, jsonb) from public, anon, authenticated;

-- The same check for the match-supplier-invoice edge function (it runs as the
-- caller). Owner and admins only, like purchase orders themselves.
create or replace function public.supplier_bill_check(p_order uuid, p_bill_total numeric, p_lines jsonb)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid;
begin
  select employer_id into v_firm from public.employer_material_orders where id = p_order;
  if v_firm is null or auth.uid() is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Purchase order not found' using errcode = 'P0002';
  end if;
  return public._supplier_bill_check(p_order, p_bill_total, p_lines);
end;
$$;
revoke all on function public.supplier_bill_check(uuid, numeric, jsonb) from public, anon;
grant execute on function public.supplier_bill_check(uuid, numeric, jsonb) to authenticated;

-- ── post_receipt_capture: a receipt posted as a PO bill uses the one rule ──
do $do$
declare
  v_sig regprocedure := 'public.post_receipt_capture(uuid, text, numeric, numeric, text, date, uuid, uuid, text, text, text, text, boolean)'::regprocedure;
  v_def text := pg_get_functiondef(v_sig);
  v_from text := $f$            abs(v_gross - coalesce(v_po.total, 0)) <= 0.01,
            case when abs(v_gross - coalesce(v_po.total, 0)) <= 0.01 then '[]'::jsonb
                 else jsonb_build_array(jsonb_build_object('type', 'total',
                   'detail', 'Bill total differs from the order total',
                   'amount', round(v_gross - coalesce(v_po.total, 0), 2))) end)$f$;
  v_to text := $t$            -- Gap §4.4: the one supplier-bill rule (_supplier_bill_check).
            coalesce((public._supplier_bill_check(v_po.id, v_gross, v_lines) ->> 'matched')::boolean, false),
            coalesce(public._supplier_bill_check(v_po.id, v_gross, v_lines) -> 'variances', '[]'::jsonb))$t$;
begin
  if position(v_from in v_def) = 0 then
    raise exception 'post_receipt_capture: PO bill rule text not found';
  end if;
  execute replace(v_def, v_from, v_to);
end
$do$;

-- ── record_bill_line_variances: the bill's whole verdict from the one rule ─
create or replace function public.record_bill_line_variances(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
  si public.employer_supplier_invoices%rowtype;
  v jsonb;
begin
  select * into c from public.employer_receipt_captures where id = p_capture;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) then
    raise exception 'That bill was not found' using errcode = 'P0002';
  end if;
  if c.status <> 'posted' or c.posted_as <> 'po_cost' or c.posted_ref is null then
    return jsonb_build_object('recorded', false);
  end if;
  select * into si from public.employer_supplier_invoices where id = c.posted_ref and employer_id = c.employer_id for update;
  if not found then return jsonb_build_object('recorded', false); end if;

  v := public._supplier_bill_check(si.order_id, coalesce(si.invoice_total, 0), c.extracted -> 'lines');

  -- Keep any variance some other process wrote (anything without a source
  -- this rule owns); replace the rule's own.
  update public.employer_supplier_invoices
     set variances = coalesce((select jsonb_agg(x) from jsonb_array_elements(coalesce(variances, '[]'::jsonb)) x
                                where coalesce(x ->> 'source', '') not in ('line_check', 'total')
                                  and coalesce(x ->> 'type', '') not in ('total', 'overcharge', 'short_delivery')),
                             '[]'::jsonb) || (v -> 'variances'),
         matched = (v ->> 'matched')::boolean
               and not exists (select 1 from jsonb_array_elements(coalesce(variances, '[]'::jsonb)) x
                                where coalesce(x ->> 'source', '') not in ('line_check', 'total')
                                  and coalesce(x ->> 'type', '') not in ('total', 'overcharge', 'short_delivery'))
   where id = si.id;
  return jsonb_build_object('recorded', true,
                            'flags', (select count(*) from jsonb_array_elements(v -> 'variances') x
                                       where x ->> 'source' = 'line_check'),
                            'dearer_total', v -> 'dearer_total');
end;
$$;
revoke all on function public.record_bill_line_variances(uuid) from public, anon;
grant execute on function public.record_bill_line_variances(uuid) to authenticated;
