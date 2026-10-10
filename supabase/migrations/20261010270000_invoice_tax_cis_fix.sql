-- ELE-2064 fix: the CIS and VAT the invoice sheet shows.
--
-- get_employer_invoice_tax (20261010192000) summed each line's 'total', but
-- invoices raised in the invoice builder store 'totalPrice' (every live CIS
-- invoice: 221 of 221 lines), so the CIS came out as £0 on every real CIS
-- invoice and the sheet hid "Less CIS" and "Due after CIS". It also said
-- "VAT @ 20%" for firms that are not VAT registered.
--
-- Now one helper, _doc_cis_amount, does what src/utils/quote-calculations.ts
-- computeQuoteTotals does: CIS is withheld from labour only, ex-VAT, as
-- labour's share of the post-discount net:
--
--   line value  = quantity x unitPrice x (1 + itemAdjustmentPercent / 100)
--                 (falling back to totalPrice, then total, for lines without both)
--   labour      = category 'labour'; or no category and type 'labour'; or no
--                 category or type and priced by the hour or day (employerMoney.ts)
--   category %  = settings.categoryAdjustments.{labour,materials,equipment}
--   labour net  = round(net x labour final / subtotal, 2)
--   CIS         = round(labour net x cisRate / 100, 2)
--
-- where net is the document's own stored net (total less VAT), so the figure
-- matches the invoice that was issued, discount included.
--
-- Additive: new helpers; get_employer_invoice_tax gains a vat_registered
-- column (it is new this week and neither HEAD nor iOS build 49 calls it).

-- A jsonb flag that tolerates true/'true'/missing.
create or replace function public._doc_flag(p jsonb, k text)
returns boolean
language sql
immutable
set search_path = public
as $$
  select case jsonb_typeof(p -> k)
           when 'boolean' then (p ->> k)::boolean
           when 'string' then case lower(btrim(p ->> k)) when 'true' then true when 'false' then false end
         end
$$;

-- The VAT rate a quote or invoice charges at, before any reverse charge.
-- 0 when the firm is not VAT registered.
create or replace function public._doc_vat_rate(p_settings jsonb)
returns numeric
language sql
immutable
set search_path = public
as $$
  select case when public._doc_flag(p_settings, 'vatRegistered') is false then 0
              else coalesce(public._pb_num(p_settings, 'vatRate'),
                            case when public._doc_flag(p_settings, 'vatRegistered') then 20 else 0 end)
         end
$$;

-- CIS withheld from a quote or invoice (0 when CIS is off).
create or replace function public._doc_cis_amount(p_items jsonb, p_settings jsonb, p_net numeric)
returns numeric
language sql
immutable
set search_path = public
as $$
  with s as (
    select coalesce(public._doc_flag(p_settings, 'cisEnabled'), false) as cis_on,
           coalesce(public._pb_num(p_settings, 'cisRate'), 20) as rate,
           coalesce(public._pb_num(p_settings -> 'categoryAdjustments', 'labour'), 0) as adj_labour,
           coalesce(public._pb_num(p_settings -> 'categoryAdjustments', 'materials'), 0) as adj_materials,
           coalesce(public._pb_num(p_settings -> 'categoryAdjustments', 'equipment'), 0) as adj_equipment
  ), l as (
    select coalesce(
             case when public._pb_num(i, 'quantity') is not null and public._pb_num(i, 'unitPrice') is not null
                  then public._pb_num(i, 'quantity') * public._pb_num(i, 'unitPrice')
                       * (1 + coalesce(public._pb_num(i, 'itemAdjustmentPercent'), 0) / 100) end,
             public._pb_num(i, 'totalPrice'), public._pb_num(i, 'total'), 0) as v,
           coalesce(i ->> 'category', '') as cat,
           (i ->> 'category' = 'labour'
             or (coalesce(i ->> 'category', '') = '' and i ->> 'type' = 'labour')
             or (coalesce(i ->> 'category', '') = '' and coalesce(i ->> 'type', '') = ''
                 and i ->> 'unit' in ('hour', 'day'))) as is_labour
      from jsonb_array_elements(case when jsonb_typeof(p_items) = 'array' then p_items else '[]'::jsonb end) i
     where jsonb_typeof(i) = 'object'
  ), t as (
    select coalesce(sum(l.v * (1 + case l.cat when 'labour' then s.adj_labour
                                              when 'materials' then s.adj_materials
                                              when 'equipment' then s.adj_equipment else 0 end / 100)), 0) as sub,
           coalesce(sum(l.v * (1 + case l.cat when 'labour' then s.adj_labour else 0 end / 100))
                      filter (where l.is_labour), 0) as labour
      from l cross join s
  )
  select case when not s.cis_on or t.sub <= 0 or coalesce(p_net, 0) <= 0 then 0
              else round(round(round(p_net, 2) * t.labour / t.sub, 2) * s.rate / 100, 2) end
    from s cross join t
$$;

revoke all on function public._doc_flag(jsonb, text) from public, anon, authenticated;
revoke all on function public._doc_vat_rate(jsonb) from public, anon, authenticated;
revoke all on function public._doc_cis_amount(jsonb, jsonb, numeric) from public, anon, authenticated;

drop function if exists public.get_employer_invoice_tax(uuid[]);
create function public.get_employer_invoice_tax(p_ids uuid[])
returns table(id uuid, vat_rate numeric, reverse_charge boolean, cis_enabled boolean,
              cis_rate numeric, cis_amount numeric, vat_registered boolean)
language sql
stable
security definer
set search_path = public
as $$
  select q.id,
         public._doc_vat_rate(q.settings),
         coalesce(public._doc_flag(q.settings, 'reverseCharge'), false),
         coalesce(public._doc_flag(q.settings, 'cisEnabled'), false),
         case when coalesce(public._doc_flag(q.settings, 'cisEnabled'), false)
              then coalesce(public._pb_num(q.settings, 'cisRate'), 20) end,
         public._doc_cis_amount(q.items, q.settings,
                                coalesce(q.total - coalesce(q.vat_amount, 0), q.subtotal)),
         public._doc_vat_rate(q.settings) > 0
    from public.quotes q
   where q.id = any (p_ids)
     and q.user_id in (select public.my_employer_scope())
     and q.deleted_at is null
     and coalesce(q.invoice_raised, false)
$$;

revoke all on function public.get_employer_invoice_tax(uuid[]) from public, anon;
grant execute on function public.get_employer_invoice_tax(uuid[]) to authenticated;
