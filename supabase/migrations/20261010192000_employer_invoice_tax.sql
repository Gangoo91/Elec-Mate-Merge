-- ELE-2064: the VAT and CIS treatment of the firm's invoices, for the screen.
--
-- get_employer_bridged_invoices() (HEAD) returns no VAT rate, reverse-charge or
-- CIS fields, so the invoice sheet never showed the reverse-charge wording even
-- though the PDF did. Rather than change that function's return type (HEAD and
-- iOS build 49 call it), this is a new read the client merges in.
--
-- CIS amount mirrors src/utils/employerMoney.ts: labour lines are type 'labour',
-- or untyped lines priced by the hour or day.

create or replace function public.get_employer_invoice_tax(p_ids uuid[])
returns table(id uuid, vat_rate numeric, reverse_charge boolean, cis_enabled boolean,
              cis_rate numeric, cis_amount numeric)
language sql
stable
security definer
set search_path = public
as $$
  select q.id,
         coalesce(nullif(q.settings->>'vatRate', '')::numeric, 20),
         coalesce((q.settings->>'reverseCharge')::boolean, false),
         coalesce((q.settings->>'cisEnabled')::boolean, false),
         case when coalesce((q.settings->>'cisEnabled')::boolean, false)
              then coalesce(nullif(q.settings->>'cisRate', '')::numeric, 20) end,
         case when coalesce((q.settings->>'cisEnabled')::boolean, false) then
           round(coalesce((
             select sum(coalesce(nullif(i->>'total', '')::numeric, 0))
               from jsonb_array_elements(case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end) i
              where i->>'type' = 'labour'
                 or (coalesce(i->>'type', '') = '' and coalesce(i->>'category', '') = ''
                     and i->>'unit' in ('hour', 'day'))
                 or i->>'category' = 'labour'), 0)
             * coalesce(nullif(q.settings->>'cisRate', '')::numeric, 20) / 100, 2)
         else 0 end
    from public.quotes q
   where q.id = any (p_ids)
     and q.user_id in (select public.my_employer_scope())
     and q.deleted_at is null
     and coalesce(q.invoice_raised, false)
$$;

revoke all on function public.get_employer_invoice_tax(uuid[]) from public, anon;
grant execute on function public.get_employer_invoice_tax(uuid[]) to authenticated;
