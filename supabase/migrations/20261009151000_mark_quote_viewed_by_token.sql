-- "Customer viewed your quote" stopped on 7 Oct when mark_quote_viewed(p_quote_id)
-- lost its public grants: keyed on the quote id, anyone holding an id could mark
-- any quote viewed. This version is keyed on the public link token the customer
-- already holds, so only someone with the link can mark it. Same notification.
create or replace function public.mark_quote_viewed_by_token(token_param text)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_id uuid;
begin
  if coalesce(btrim(token_param), '') = '' then return; end if;
  select q.id into v_id
    from public.quotes q
   where q.public_token = token_param and q.deleted_at is null
   limit 1;
  if v_id is null then return; end if;
  perform public.mark_quote_viewed(v_id);
end;
$function$;

revoke all on function public.mark_quote_viewed_by_token(text) from public;
grant execute on function public.mark_quote_viewed_by_token(text) to anon, authenticated;
