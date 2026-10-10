-- Source of record for a trigger that was LIVE but in no migration (found by
-- review, 10 Oct 2026). Marking a DEP- invoice paid stamps its quote:
-- deposit_paid_at, and accepted_pending_deposit → accepted. ELE-1760 then
-- credits the deposit when the quote is converted. Byte-for-byte the live
-- definition; re-running it changes nothing.
CREATE OR REPLACE FUNCTION public.stamp_quote_deposit_paid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if new.deposit_for_quote is true
     and new.parent_quote_id is not null
     and new.paid_at is not null
     and (tg_op = 'INSERT' or old.paid_at is null) then
    update public.quotes
    set deposit_paid_at = coalesce(deposit_paid_at, new.paid_at),
        acceptance_status = case
          when acceptance_status = 'accepted_pending_deposit' then 'accepted'
          else acceptance_status
        end
    where id = new.parent_quote_id;
  end if;
  return new;
end
$function$;

DROP TRIGGER IF EXISTS trg_invoices_deposit_paid_stamps_quote ON public.invoices;
CREATE TRIGGER trg_invoices_deposit_paid_stamps_quote
  AFTER INSERT OR UPDATE OF paid_at ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.stamp_quote_deposit_paid();
