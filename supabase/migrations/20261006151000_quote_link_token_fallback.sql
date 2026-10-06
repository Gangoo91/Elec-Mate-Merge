-- Customer quote links that open "Quote not found" (found 6 Oct, ELE-1947).
--
-- The public quote page resolves a link through quotes.public_token. The
-- Electrical Hub's Copy link / WhatsApp share and QuoteViewPage build the link
-- from quote_views.public_token, which is generated SEPARATELY. 93 active links
-- carry a token that is not the quote's own, still being created (6 in Oct),
-- so the customer gets "not found".
--
-- 1. resolve_quote_public_token(): either token -> the quote's own token.
-- 2. The four loaders the page calls with the URL token use it.
--    (Accept and reject already pass the quote's own token from the loaded row.)
-- 3. New quote_views rows copy the quote's token, so they stop diverging.

create or replace function public.resolve_quote_public_token(p_token text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select q.public_token::text from public.quotes q where q.public_token::text = p_token limit 1),
    (select q.public_token::text
       from public.quote_views v
       join public.quotes q on q.id = v.quote_id
      where v.public_token::text = p_token
        and v.is_active
      limit 1)
  )
$$;

grant execute on function public.resolve_quote_public_token(text) to anon, authenticated;

do $$
declare
  v_fn text;
  v_def text;
  v_new text;
begin
  foreach v_fn in array array[
    'get_quote_by_public_token',
    'get_quote_terms_by_token',
    'get_company_brand_by_quote_token',
    'get_deposit_invoice_by_quote_token'
  ] loop
    select pg_get_functiondef(p.oid) into v_def
      from pg_proc p where p.proname = v_fn and p.pronamespace = 'public'::regnamespace;
    if v_def is null then
      raise exception 'function % not found', v_fn;
    end if;
    if position('resolve_quote_public_token' in v_def) > 0 then
      continue;
    end if;
    -- Every comparison against the caller's token now goes through the resolver.
    v_new := regexp_replace(v_def, '([=(,[:space:]])token_param\y', '\1public.resolve_quote_public_token(token_param)', 'g');
    -- ...but not the parameter declaration itself.
    v_new := replace(v_new, '(public.resolve_quote_public_token(token_param) text)', '(token_param text)');
    if v_new = v_def or position('(token_param text)' in v_new) = 0 then
      raise exception 'could not rewrite %', v_fn;
    end if;
    execute v_new;
  end loop;
end $$;

create or replace function public.quote_views_use_quote_token()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_token text;
begin
  select q.public_token::text into v_token from public.quotes q where q.id = NEW.quote_id;
  if v_token is not null then
    NEW.public_token := v_token;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_quote_views_use_quote_token on public.quote_views;
create trigger trg_quote_views_use_quote_token
  before insert on public.quote_views
  for each row execute function public.quote_views_use_quote_token();
