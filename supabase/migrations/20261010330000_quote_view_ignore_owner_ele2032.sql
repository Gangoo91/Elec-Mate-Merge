-- ELE-2032 (same class): the electrician previewing their own quote link,
-- signed in, marked it "viewed" and notified them that the CLIENT had viewed
-- it. The owner's own view never counts. Applied live 10 Oct.
CREATE OR REPLACE FUNCTION public.mark_quote_viewed_by_token(token_param text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_id uuid; v_owner uuid;
begin
  if coalesce(btrim(token_param), '') = '' then return; end if;
  select q.id, q.user_id into v_id, v_owner
    from public.quotes q
   where q.public_token = token_param and q.deleted_at is null
   limit 1;
  if v_id is null then return; end if;
  if auth.uid() is not null and auth.uid() = v_owner then return; end if;
  perform public.mark_quote_viewed(v_id);
end;
$function$;
