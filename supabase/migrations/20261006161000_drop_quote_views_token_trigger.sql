-- Applied live 6 Oct. The trigger added in 20261006151000 rewrote a new
-- quote_views token to the quote's own public_token, but the clients hand the
-- customer the token they generated locally, so a freshly copied link 404'd.
-- The loaders already resolve either token (resolve_quote_public_token).
drop trigger if exists trg_quote_views_use_quote_token on public.quote_views;
drop function if exists public.quote_views_use_quote_token();
