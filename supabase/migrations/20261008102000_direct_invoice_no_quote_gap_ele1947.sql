-- ELE-1947 follow-up. A direct invoice (inserted already invoice_raised, with
-- no quote number) was given a QUOTE number as well as its invoice number, so
-- every invoice raised straight from the Employer Hub (or the contract
-- generator) left a gap in the firm's quote numbers: 2026/057, 059, 061...
-- The app's own convention for a standalone invoice is quote_number =
-- invoice_number (see QuoteInvoiceDashboard rows like INV-2603-372), so the
-- trigger now does the same on INSERT. Converting a quote to an invoice is an
-- UPDATE of a row that already has its quote number and is unaffected.
create or replace function public.assign_document_numbers()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if NEW.user_id is null then
    return NEW;
  end if;

  if NEW.invoice_raised is true
     and (NEW.invoice_number is null or NEW.invoice_number = '' or NEW.invoice_number = 'Invoice/TEMP')
  then
    NEW.invoice_number := public.format_document_number(
      NEW.user_id, 'invoice', public.next_document_number_for(NEW.user_id, 'invoice')
    );
  end if;

  if NEW.quote_number is null or NEW.quote_number = '' then
    -- Guarded: a firm whose quote and invoice prefixes match could already have
    -- that number as a quote, and the (user_id, quote_number) index is unique.
    if tg_op = 'INSERT' and NEW.invoice_raised is true and coalesce(NEW.invoice_number, '') <> ''
       and not exists (select 1 from public.quotes x
                        where x.user_id = NEW.user_id and x.quote_number = NEW.invoice_number) then
      NEW.quote_number := NEW.invoice_number;
    else
      NEW.quote_number := public.format_document_number(
        NEW.user_id, 'quote', public.next_document_number_for(NEW.user_id, 'quote')
      );
    end if;
  end if;

  return NEW;
end;
$function$;
