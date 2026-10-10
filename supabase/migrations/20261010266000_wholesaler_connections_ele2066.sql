-- ELE-2066 — Wholesaler accounts, trade price files, price moves, PO codes.
--
-- What a firm gets:
--   * A wholesaler account per merchant (CEF, Edmundson, Rexel, ...): the
--     account number, branch and order email, linked to the firm's supplier
--     row so purchase orders go to the right inbox with the account number on
--     them. Owner/admin only (can_see_firm_money).
--   * Login details for a merchant's price feed are WRITE-ONLY: stored in
--     Supabase Vault by set_supplier_connection_credentials, read back only by
--     get_supplier_connection_secret, which only the service role (the
--     supplier-price-sync edge function) can call.
--   * The firm's own account prices, from the price file the merchant gives
--     them (CSV / Excel from the trade account, or a feed URL). Rows are
--     matched to price-book items by product code, then name, then a similar
--     name for a person to confirm (preview_supplier_price_file). Applying
--     (apply_supplier_price_file) keeps the merchant's prices, logs every
--     price move, and updates the buy price of linked price-book items.
--   * Price moves since a quote was sent, read-only (get_quote_price_moves).
--     Quotes are NEVER changed here.
--   * Supplier bills read by receipt capture (ELE-2071) compared line by line
--     with the purchase order (compare_bill_to_order), and the differences
--     written to the bill (record_bill_line_variances).
--
-- Additive only: new tables (RLS on), new functions. No trigger, no change to
-- an existing table, policy or function. The price book is the owner's
-- materials_lists jsonb (ELE-1991); applying a price file writes the same keys
-- save_firm_price_book_item writes, plus supplier_code.

-- ── Tables ────────────────────────────────────────────────────────────────
create table if not exists public.employer_supplier_connections (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  supplier_id uuid references public.employer_suppliers(id) on delete set null,
  wholesaler text not null check (wholesaler in (
    'cef', 'edmundson', 'rexel', 'denmans', 'yesss', 'tlc', 'screwfix', 'toolstation',
    'wf_senate', 'newey', 'other')),
  display_name text not null,
  account_number text,
  branch text,
  order_email text,
  route text not null default 'price_file' check (route in ('price_file', 'feed', 'api')),
  feed_url text,
  auto_sync boolean not null default false,
  price_alert_pct numeric(5, 1) not null default 5 check (price_alert_pct between 1 and 50),
  credential_set_at timestamptz,
  credential_hint text,
  last_synced_at timestamptz,
  last_sync_status text check (last_sync_status in ('ok', 'failed')),
  last_sync_message text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  removed_at timestamptz
);
create index if not exists employer_supplier_connections_firm
  on public.employer_supplier_connections (employer_id) where removed_at is null;
create unique index if not exists employer_supplier_connections_one_per_supplier
  on public.employer_supplier_connections (supplier_id) where removed_at is null and supplier_id is not null;
alter table public.employer_supplier_connections enable row level security;
revoke all on public.employer_supplier_connections from anon, authenticated;
grant select on public.employer_supplier_connections to authenticated;
drop policy if exists "Firm money reads wholesaler accounts" on public.employer_supplier_connections;
create policy "Firm money reads wholesaler accounts" on public.employer_supplier_connections
  for select to authenticated using (public.can_see_firm_money(employer_id));
comment on table public.employer_supplier_connections is
  '[EMPLOYER HUB] A firm''s wholesaler trade accounts (ELE-2066): account number, branch, order email, how prices arrive (price file, feed URL, API). Scope: employer_id = firm owner; owner/admin read (can_see_firm_money). Used by: Settings › Wholesaler accounts, Price book price files, supplier-price-sync. Rule: written only by save_supplier_connection / remove_supplier_connection / set_supplier_connection_credentials and the sync function; login details live in Vault, never here.';

create table if not exists public.employer_supplier_credentials (
  connection_id uuid primary key references public.employer_supplier_connections(id) on delete cascade,
  employer_id uuid not null,
  vault_secret_id uuid not null,
  updated_by uuid,
  updated_at timestamptz not null default now()
);
alter table public.employer_supplier_credentials enable row level security;
revoke all on public.employer_supplier_credentials from anon, authenticated;
comment on table public.employer_supplier_credentials is
  '[INTERNAL — NOT THE EMPLOYER HUB] Pointer from a wholesaler account to its login in Supabase Vault (ELE-2066). No client access at all: written by set_supplier_connection_credentials, read only by get_supplier_connection_secret (service role, supplier-price-sync).';

create table if not exists public.employer_supplier_prices (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  connection_id uuid not null references public.employer_supplier_connections(id) on delete cascade,
  product_code text not null,
  description text,
  unit text,
  trade_price numeric(12, 4) not null,
  list_price numeric(12, 4),
  price_book_item_id text,
  match_kind text check (match_kind in ('code', 'name', 'similar', 'manual', 'added')),
  previous_price numeric(12, 4),
  price_changed_at timestamptz,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (connection_id, product_code)
);
create index if not exists employer_supplier_prices_item
  on public.employer_supplier_prices (employer_id, price_book_item_id) where price_book_item_id is not null;
alter table public.employer_supplier_prices enable row level security;
revoke all on public.employer_supplier_prices from anon, authenticated;
grant select on public.employer_supplier_prices to authenticated;
drop policy if exists "Firm money reads wholesaler prices" on public.employer_supplier_prices;
create policy "Firm money reads wholesaler prices" on public.employer_supplier_prices
  for select to authenticated using (public.can_see_firm_money(employer_id));
comment on table public.employer_supplier_prices is
  '[EMPLOYER HUB] The firm''s own trade price per product code at each wholesaler (ELE-2066), from their account price file or feed. Scope: employer_id = firm owner; owner/admin read. Used by: Price book, purchase order codes, bill checks. Rule: written only by apply_supplier_price_file / _supplier_apply_prices; product_code is upper-case letters and digits only.';

create table if not exists public.employer_supplier_price_moves (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  connection_id uuid not null references public.employer_supplier_connections(id) on delete cascade,
  import_id uuid,
  product_code text not null,
  description text,
  price_book_item_id text,
  old_price numeric(12, 4) not null,
  new_price numeric(12, 4) not null,
  change_pct numeric(8, 2) not null,
  book_applied boolean not null default false,
  moved_at timestamptz not null default now()
);
create index if not exists employer_supplier_price_moves_firm
  on public.employer_supplier_price_moves (employer_id, moved_at desc);
create index if not exists employer_supplier_price_moves_item
  on public.employer_supplier_price_moves (employer_id, price_book_item_id, moved_at) where price_book_item_id is not null;
alter table public.employer_supplier_price_moves enable row level security;
revoke all on public.employer_supplier_price_moves from anon, authenticated;
grant select on public.employer_supplier_price_moves to authenticated;
drop policy if exists "Firm money reads price moves" on public.employer_supplier_price_moves;
create policy "Firm money reads price moves" on public.employer_supplier_price_moves
  for select to authenticated using (public.can_see_firm_money(employer_id));
comment on table public.employer_supplier_price_moves is
  '[EMPLOYER HUB] Every change in a wholesaler trade price the firm imported (ELE-2066). book_applied = the price book buy price followed it. Scope: employer_id = firm owner; owner/admin read; quotes see percentages only through get_quote_price_moves. Rule: insert-only, by _supplier_apply_prices.';

create table if not exists public.employer_price_file_imports (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  connection_id uuid not null references public.employer_supplier_connections(id) on delete cascade,
  source text not null check (source in ('file', 'feed', 'api')),
  file_name text,
  row_count integer not null default 0,
  linked integer not null default 0,
  added integer not null default 0,
  price_changes integer not null default 0,
  big_moves integer not null default 0,
  book_updated integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default now()
);
create index if not exists employer_price_file_imports_conn
  on public.employer_price_file_imports (connection_id, created_at desc);
alter table public.employer_price_file_imports enable row level security;
revoke all on public.employer_price_file_imports from anon, authenticated;
grant select on public.employer_price_file_imports to authenticated;
drop policy if exists "Firm money reads price file imports" on public.employer_price_file_imports;
create policy "Firm money reads price file imports" on public.employer_price_file_imports
  for select to authenticated using (public.can_see_firm_money(employer_id));
comment on table public.employer_price_file_imports is
  '[EMPLOYER HUB] Log of each wholesaler price file or feed applied (ELE-2066): rows, links, new items, price changes. Scope: employer_id = firm owner; owner/admin read. Rule: insert-only, by _supplier_apply_prices.';

-- ── Helpers ───────────────────────────────────────────────────────────────
create or replace function public._sp_code(p text)
returns text language sql immutable set search_path to 'public' as $$
  select nullif(upper(regexp_replace(coalesce(p, ''), '[^A-Za-z0-9]', '', 'g')), '')
$$;

create or replace function public._sp_norm(p text)
returns text language sql immutable set search_path to 'public' as $$
  select nullif(lower(btrim(regexp_replace(regexp_replace(coalesce(p, ''), '[^A-Za-z0-9.&/ ]', ' ', 'g'), '\s+', ' ', 'g'))), '')
$$;

-- The firm's price-book items that have a real id (only those can be linked).
create or replace function public._sp_book(p_firm uuid)
returns table (item_id text, name text, norm text, supplier_code text, supplier_id uuid,
               cost numeric, markup numeric, sell numeric)
language sql stable security definer set search_path to 'public' as $$
  select e.it ->> 'id', btrim(e.it ->> 'name'), public._sp_norm(e.it ->> 'name'),
         public._sp_code(e.it ->> 'supplier_code'),
         case when (e.it ->> 'supplier_id') ~* '^[0-9a-f-]{36}$' then (e.it ->> 'supplier_id')::uuid end,
         public._pb_num(e.it, 'cost_price'), public._pb_num(e.it, 'markup_percent'),
         public._pb_num(e.it, 'estimated_price')
    from public.materials_lists ml
    cross join lateral jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) e(it)
   where ml.user_id = p_firm and jsonb_typeof(e.it) = 'object'
     and coalesce(e.it ->> 'id', '') <> '' and coalesce(btrim(e.it ->> 'name'), '') <> ''
$$;
revoke all on function public._sp_book(uuid) from public, anon, authenticated;

-- ── Accounts ──────────────────────────────────────────────────────────────
create or replace function public.get_supplier_connections(p_firm uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    return '[]'::jsonb;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', c.id, 'wholesaler', c.wholesaler, 'display_name', c.display_name,
             'supplier_id', c.supplier_id, 'supplier_name', s.name,
             'account_number', c.account_number, 'branch', c.branch, 'order_email', c.order_email,
             'route', c.route, 'feed_url', c.feed_url, 'auto_sync', c.auto_sync,
             'price_alert_pct', c.price_alert_pct,
             'has_credentials', c.credential_set_at is not null,
             'credential_hint', c.credential_hint, 'credential_set_at', c.credential_set_at,
             'last_synced_at', c.last_synced_at, 'last_sync_status', c.last_sync_status,
             'last_sync_message', c.last_sync_message,
             'price_count', (select count(*) from public.employer_supplier_prices p where p.connection_id = c.id),
             'linked_count', (select count(*) from public.employer_supplier_prices p
                               where p.connection_id = c.id and p.price_book_item_id is not null),
             'last_import', (select jsonb_build_object('at', i.created_at, 'file_name', i.file_name,
                                     'rows', i.row_count, 'price_changes', i.price_changes,
                                     'big_moves', i.big_moves, 'book_updated', i.book_updated,
                                     'added', i.added, 'source', i.source)
                               from public.employer_price_file_imports i
                              where i.connection_id = c.id order by i.created_at desc limit 1),
             'created_at', c.created_at)
           order by c.display_name)
      from public.employer_supplier_connections c
      left join public.employer_suppliers s on s.id = c.supplier_id
     where c.employer_id = p_firm and c.removed_at is null), '[]'::jsonb);
end;
$$;
revoke all on function public.get_supplier_connections(uuid) from public, anon;
grant execute on function public.get_supplier_connections(uuid) to authenticated;

create or replace function public.save_supplier_connection(
  p_firm uuid, p_id uuid, p_wholesaler text, p_display_name text,
  p_account_number text default null, p_branch text default null, p_order_email text default null,
  p_route text default 'price_file', p_feed_url text default null, p_auto_sync boolean default false,
  p_price_alert_pct numeric default 5, p_supplier_id uuid default null)
returns uuid
language plpgsql security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  v_name text := left(btrim(coalesce(p_display_name, '')), 120);
  v_email text := nullif(lower(btrim(coalesce(p_order_email, ''))), '');
  v_acct text := nullif(left(btrim(coalesce(p_account_number, '')), 60), '');
  v_feed text := nullif(btrim(coalesce(p_feed_url, '')), '');
  v_supplier uuid := p_supplier_id;
  v_id uuid := p_id;
  c public.employer_supplier_connections%rowtype;
begin
  if v_uid is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can set up wholesaler accounts' using errcode = '42501';
  end if;
  if v_name = '' then raise exception 'Give the account a name.' using errcode = '22023'; end if;
  if p_route not in ('price_file', 'feed', 'api') then raise exception 'Unknown route' using errcode = '22023'; end if;
  if v_email is not null and v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'That order email does not look right.' using errcode = '22023';
  end if;
  if v_feed is not null and (v_feed !~* '^https://[a-z0-9.-]+\.[a-z]{2,}(/|$|:|\?)' or length(v_feed) > 500) then
    raise exception 'The price feed must be an https:// web address.' using errcode = '22023';
  end if;
  if p_route = 'feed' and v_feed is null then
    raise exception 'Add the price feed address the wholesaler gave you.' using errcode = '22023';
  end if;
  if v_supplier is not null and not exists (
       select 1 from public.employer_suppliers s where s.id = v_supplier and s.employer_id = p_firm) then
    raise exception 'Unknown supplier.' using errcode = '22023';
  end if;

  if v_id is not null then
    select * into c from public.employer_supplier_connections
     where id = v_id and employer_id = p_firm and removed_at is null for update;
    if not found then raise exception 'That account was not found' using errcode = 'P0002'; end if;
    v_supplier := coalesce(v_supplier, c.supplier_id);
  end if;

  -- Purchase orders go to the supplier row: keep it in step (create it if new).
  if v_supplier is null then
    select s.id into v_supplier from public.employer_suppliers s
     where s.employer_id = p_firm and lower(btrim(s.name)) = lower(v_name)
       and not exists (select 1 from public.employer_supplier_connections x
                        where x.supplier_id = s.id and x.removed_at is null and x.id is distinct from v_id)
     limit 1;
  end if;
  if v_supplier is null then
    insert into public.employer_suppliers (employer_id, name, category, account_number, email,
                                           credit_limit, balance, delivery_days, discount_percent)
    values (p_firm, v_name, 'Wholesaler', v_acct, v_email, 0, 0, 1, 0)
    returning id into v_supplier;
  else
    if exists (select 1 from public.employer_supplier_connections x
                where x.supplier_id = v_supplier and x.removed_at is null and x.id is distinct from v_id) then
      raise exception 'That supplier already has a wholesaler account here.' using errcode = '23505';
    end if;
    update public.employer_suppliers
       set account_number = coalesce(v_acct, account_number),
           email = coalesce(v_email, email),
           updated_at = now()
     where id = v_supplier;
  end if;

  if v_id is null then
    insert into public.employer_supplier_connections (employer_id, supplier_id, wholesaler, display_name,
      account_number, branch, order_email, route, feed_url, auto_sync, price_alert_pct, created_by)
    values (p_firm, v_supplier, p_wholesaler, v_name, v_acct, nullif(left(btrim(coalesce(p_branch, '')), 120), ''),
            v_email, p_route, v_feed, coalesce(p_auto_sync, false) and p_route <> 'price_file',
            least(50, greatest(1, coalesce(p_price_alert_pct, 5))), v_uid)
    returning id into v_id;
  else
    update public.employer_supplier_connections
       set supplier_id = v_supplier, wholesaler = p_wholesaler, display_name = v_name,
           account_number = v_acct, branch = nullif(left(btrim(coalesce(p_branch, '')), 120), ''),
           order_email = v_email, route = p_route, feed_url = v_feed,
           auto_sync = coalesce(p_auto_sync, false) and p_route <> 'price_file',
           price_alert_pct = least(50, greatest(1, coalesce(p_price_alert_pct, 5))),
           updated_at = now()
     where id = v_id;
  end if;
  return v_id;
end;
$$;
revoke all on function public.save_supplier_connection(uuid, uuid, text, text, text, text, text, text, text, boolean, numeric, uuid) from public, anon;
grant execute on function public.save_supplier_connection(uuid, uuid, text, text, text, text, text, text, text, boolean, numeric, uuid) to authenticated;

-- Write-only: the login never comes back to the app.
create or replace function public.set_supplier_connection_credentials(p_id uuid, p_username text, p_secret text)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_supplier_connections%rowtype;
  v_secret uuid;
  v_user text := nullif(btrim(coalesce(p_username, '')), '');
  v_pass text := nullif(coalesce(p_secret, ''), '');
  v_hint text;
begin
  select * into c from public.employer_supplier_connections where id = p_id and removed_at is null for update;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) then
    raise exception 'That account was not found' using errcode = 'P0002';
  end if;
  select vault_secret_id into v_secret from public.employer_supplier_credentials where connection_id = p_id;

  if v_user is null and v_pass is null then
    -- Clear them.
    if v_secret is not null then
      delete from vault.secrets where id = v_secret;
      delete from public.employer_supplier_credentials where connection_id = p_id;
    end if;
    update public.employer_supplier_connections
       set credential_set_at = null, credential_hint = null, updated_at = now() where id = p_id;
    return jsonb_build_object('has_credentials', false);
  end if;
  if length(coalesce(v_user, '')) > 200 or length(coalesce(v_pass, '')) > 2000 then
    raise exception 'Those details are too long.' using errcode = '22023';
  end if;

  v_hint := case when v_user is not null then left(v_user, 2) || '…' || right(v_user, 2)
                 else '…' || right(v_pass, 2) end;
  if v_secret is null then
    v_secret := vault.create_secret(
      jsonb_build_object('username', v_user, 'secret', v_pass)::text,
      'supplier_conn_' || p_id::text, 'ELE-2066 wholesaler login');
    insert into public.employer_supplier_credentials (connection_id, employer_id, vault_secret_id, updated_by)
    values (p_id, c.employer_id, v_secret, auth.uid());
  else
    perform vault.update_secret(v_secret, jsonb_build_object('username', v_user, 'secret', v_pass)::text);
    update public.employer_supplier_credentials set updated_by = auth.uid(), updated_at = now()
     where connection_id = p_id;
  end if;
  update public.employer_supplier_connections
     set credential_set_at = now(), credential_hint = v_hint, updated_at = now() where id = p_id;
  return jsonb_build_object('has_credentials', true, 'hint', v_hint);
end;
$$;
revoke all on function public.set_supplier_connection_credentials(uuid, text, text) from public, anon;
grant execute on function public.set_supplier_connection_credentials(uuid, text, text) to authenticated;

-- Edge functions only.
create or replace function public.get_supplier_connection_secret(p_id uuid)
returns jsonb
language sql stable security definer set search_path to 'public' as $$
  select ds.decrypted_secret::jsonb
    from public.employer_supplier_credentials k
    join vault.decrypted_secrets ds on ds.id = k.vault_secret_id
   where k.connection_id = p_id
$$;
revoke all on function public.get_supplier_connection_secret(uuid) from public, anon, authenticated;
grant execute on function public.get_supplier_connection_secret(uuid) to service_role;

create or replace function public.remove_supplier_connection(p_id uuid)
returns void
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_supplier_connections%rowtype;
  v_secret uuid;
begin
  select * into c from public.employer_supplier_connections where id = p_id and removed_at is null for update;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) then
    raise exception 'That account was not found' using errcode = 'P0002';
  end if;
  select vault_secret_id into v_secret from public.employer_supplier_credentials where connection_id = p_id;
  if v_secret is not null then
    delete from vault.secrets where id = v_secret;
    delete from public.employer_supplier_credentials where connection_id = p_id;
  end if;
  -- The supplier row and its purchase orders stay; prices and moves stay for history.
  update public.employer_supplier_connections
     set removed_at = now(), auto_sync = false, credential_set_at = null, credential_hint = null,
         updated_at = now()
   where id = p_id;
end;
$$;
revoke all on function public.remove_supplier_connection(uuid) from public, anon;
grant execute on function public.remove_supplier_connection(uuid) to authenticated;

-- ── Price file: preview (matching) ────────────────────────────────────────
-- p_rows: [{code, description, unit?, price}] — up to 2,000 a call.
create or replace function public.preview_supplier_price_file(p_connection uuid, p_rows jsonb)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  c public.employer_supplier_connections%rowtype;
begin
  select * into c from public.employer_supplier_connections where id = p_connection and removed_at is null;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) then
    raise exception 'That account was not found' using errcode = 'P0002';
  end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 2000 then
    raise exception 'Send up to 2,000 rows at a time.' using errcode = '22023';
  end if;

  return coalesce((
    with book as (select * from public._sp_book(c.employer_id)),
    rows_in as (
      select r.n, public._sp_code(r.x ->> 'code') as code, left(btrim(coalesce(r.x ->> 'description', '')), 300) as descr,
             public._sp_norm(r.x ->> 'description') as norm,
             case when (r.x ->> 'price') ~ '^\d+(\.\d+)?$' then (r.x ->> 'price')::numeric end as price
        from jsonb_array_elements(p_rows) with ordinality r(x, n)
    )
    select jsonb_agg(jsonb_build_object(
             'n', i.n, 'code', i.code, 'price', i.price,
             'current_price', sp.trade_price,
             'change_pct', case when sp.trade_price > 0 and i.price is not null
                                then round((i.price - sp.trade_price) / sp.trade_price * 100, 1) end,
             'item_id', m.item_id, 'item_name', m.name, 'match', m.kind,
             'item_cost', m.cost)
           order by i.n)
      from rows_in i
      left join public.employer_supplier_prices sp on sp.connection_id = c.id and sp.product_code = i.code
      left join lateral (
        select * from (
          -- 1. Already linked on an earlier import.
          select b.item_id, b.name, b.cost, 'linked'::text as kind, 1 as rank_
            from book b where sp.price_book_item_id is not null and b.item_id = sp.price_book_item_id
          union all
          -- 2. The same product code stored on the item.
          select b.item_id, b.name, b.cost, 'code', 2 from book b
           where i.code is not null and b.supplier_code = i.code
          union all
          -- 3. The same name.
          select b.item_id, b.name, b.cost, 'name', 3 from book b
           where i.norm is not null and b.norm = i.norm
          union all
          -- 4. A similar name, for a person to confirm.
          (select b.item_id, b.name, b.cost, 'similar', 4 from book b
            where i.norm is not null and length(i.norm) >= 4 and similarity(b.norm, i.norm) >= 0.45
            order by similarity(b.norm, i.norm) desc limit 1)
        ) cand order by rank_ limit 1
      ) m on true), '[]'::jsonb);
end;
$$;
revoke all on function public.preview_supplier_price_file(uuid, jsonb) from public, anon;
grant execute on function public.preview_supplier_price_file(uuid, jsonb) to authenticated;

-- ── Price file: apply (shared by the app and the sync function) ───────────
-- p_rows: [{code, description, unit?, price, list_price?, item_id?, match?, add?}]
--   item_id  link this row to that price-book item (else an earlier link stays)
--   add      add it to the price book as a new item (only if it has no link)
create or replace function public._supplier_apply_prices(
  p_connection uuid, p_rows jsonb, p_file_name text, p_source text, p_actor uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_supplier_connections%rowtype;
  v_supplier_name text;
  v_import uuid := gen_random_uuid();
  v_now timestamptz := now();
  v_now_txt text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
  v_rows int;
  v_linked int;
  v_added int := 0;
  v_changes int;
  v_big int;
  v_book int := 0;
  v_markup numeric;
  v_list uuid;
  v_new jsonb;
  v_map jsonb;
begin
  select * into c from public.employer_supplier_connections where id = p_connection and removed_at is null for update;
  if not found then raise exception 'That account was not found' using errcode = 'P0002'; end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 20000 then
    raise exception 'Send up to 20,000 rows at a time.' using errcode = '22023';
  end if;
  select s.name into v_supplier_name from public.employer_suppliers s where s.id = c.supplier_id;
  v_supplier_name := coalesce(v_supplier_name, c.display_name);

  drop table if exists pg_temp._sp_in;
  create temp table _sp_in on commit drop as
  select distinct on (code) * from (
    select public._sp_code(x ->> 'code') as code,
           left(btrim(coalesce(x ->> 'description', '')), 300) as descr,
           nullif(left(btrim(coalesce(x ->> 'unit', '')), 30), '') as unit,
           round((x ->> 'price')::numeric, 4) as price,
           case when (x ->> 'list_price') ~ '^\d+(\.\d+)?$' then round((x ->> 'list_price')::numeric, 4) end as list_price,
           nullif(x ->> 'item_id', '') as item_id,
           case when x ->> 'match' in ('code', 'name', 'similar', 'manual') then x ->> 'match' end as match_kind,
           coalesce((x ->> 'add')::boolean, false) as add_new
      from jsonb_array_elements(p_rows) x
     where (x ->> 'price') ~ '^\d+(\.\d+)?$' and (x ->> 'price')::numeric > 0 and (x ->> 'price')::numeric < 1000000
  ) r where code is not null
  order by code;

  -- The price book as it stands before this file (read once).
  drop table if exists pg_temp._sp_bk;
  create temp table _sp_bk on commit drop as select * from public._sp_book(c.employer_id);

  -- Only real price-book items of this firm can be linked.
  update _sp_in i set item_id = null
   where i.item_id is not null and not exists (select 1 from _sp_bk b where b.item_id = i.item_id);

  -- New items for the price book (only rows with no link, now or before).
  if exists (select 1 from _sp_in where add_new and item_id is null) then
    select coalesce(nullif(cp.markup, 0), 30) into v_markup from public.company_profiles cp where cp.user_id = c.employer_id limit 1;
    v_markup := coalesce(v_markup, 30);
    -- An item with the same name already there is linked instead of doubled.
    update _sp_in i set item_id = b.item_id, match_kind = 'name'
      from _sp_bk b
     where i.add_new and i.item_id is null and b.norm = public._sp_norm(i.descr);
    update _sp_in i set add_new = false
     where i.add_new and exists (select 1 from public.employer_supplier_prices sp
                                  where sp.connection_id = c.id and sp.product_code = i.code and sp.price_book_item_id is not null);
    update _sp_in set item_id = gen_random_uuid()::text, match_kind = 'added'
     where add_new and item_id is null and descr <> '';
    select coalesce(jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
             'id', item_id, 'name', descr, 'unit', coalesce(unit, 'each'), 'quantity', 1, 'matched', false,
             'cost_price', price, 'markup_percent', v_markup,
             'estimated_price', round(price * (1 + v_markup / 100), 2),
             'supplier', v_supplier_name, 'supplier_id', c.supplier_id, 'supplier_code', code,
             'added_at', v_now_txt, 'price_updated_at', v_now_txt))), '[]'::jsonb)
      into v_new from _sp_in where match_kind = 'added';
    v_added := jsonb_array_length(v_new);
    if v_added > 0 then
      select ml.id into v_list from public.materials_lists ml
       where ml.user_id = c.employer_id and ml.name = 'Price Book' order by ml.created_at limit 1 for update;
      if v_list is null then
        insert into public.materials_lists (user_id, name, description, items)
        values (c.employer_id, 'Price Book', 'Saved prices for quotes, purchase orders and van stock', '[]'::jsonb)
        returning id into v_list;
      end if;
      update public.materials_lists set items = coalesce(items, '[]'::jsonb) || v_new where id = v_list;
    end if;
  end if;

  select count(*) into v_rows from _sp_in;

  -- Price moves (against the price we held before this file).
  insert into public.employer_supplier_price_moves (employer_id, connection_id, import_id, product_code, description,
    price_book_item_id, old_price, new_price, change_pct, book_applied, moved_at)
  select c.employer_id, c.id, v_import, i.code, coalesce(nullif(i.descr, ''), sp.description),
         coalesce(i.item_id, sp.price_book_item_id), sp.trade_price, i.price,
         round((i.price - sp.trade_price) / sp.trade_price * 100, 2),
         false, v_now
    from _sp_in i
    join public.employer_supplier_prices sp on sp.connection_id = c.id and sp.product_code = i.code
   where sp.trade_price > 0 and abs(i.price - sp.trade_price) >= 0.005;
  get diagnostics v_changes = row_count;
  select count(*) into v_big from public.employer_supplier_price_moves
   where import_id = v_import and abs(change_pct) >= c.price_alert_pct;

  -- Keep the firm's prices.
  insert into public.employer_supplier_prices as sp (employer_id, connection_id, product_code, description, unit,
    trade_price, list_price, price_book_item_id, match_kind, first_seen_at, last_seen_at)
  select c.employer_id, c.id, i.code, nullif(i.descr, ''), i.unit, i.price, i.list_price, i.item_id,
         case when i.item_id is not null then coalesce(i.match_kind, 'manual') end, v_now, v_now
    from _sp_in i
  on conflict (connection_id, product_code) do update
     set description = coalesce(excluded.description, sp.description),
         unit = coalesce(excluded.unit, sp.unit),
         previous_price = case when abs(excluded.trade_price - sp.trade_price) >= 0.005 then sp.trade_price else sp.previous_price end,
         price_changed_at = case when abs(excluded.trade_price - sp.trade_price) >= 0.005 then v_now else sp.price_changed_at end,
         trade_price = excluded.trade_price,
         list_price = coalesce(excluded.list_price, sp.list_price),
         price_book_item_id = coalesce(excluded.price_book_item_id, sp.price_book_item_id),
         match_kind = case when excluded.price_book_item_id is not null then excluded.match_kind else sp.match_kind end,
         last_seen_at = v_now;

  select count(*) into v_linked from public.employer_supplier_prices sp
    join _sp_in i on i.code = sp.product_code where sp.connection_id = c.id and sp.price_book_item_id is not null;

  -- The price book follows this wholesaler for items it supplies (or items with no supplier yet).
  select coalesce(jsonb_object_agg(sp.price_book_item_id, jsonb_build_object('price', sp.trade_price, 'code', sp.product_code)), '{}'::jsonb)
    into v_map
    from public.employer_supplier_prices sp
    join _sp_in i on i.code = sp.product_code
    join _sp_bk b on b.item_id = sp.price_book_item_id
   where sp.connection_id = c.id and sp.price_book_item_id is not null
     and (b.supplier_id is null or b.supplier_id = c.supplier_id)
     and coalesce(i.match_kind, '') <> 'added';

  if v_map <> '{}'::jsonb then
    select count(*) into v_book from _sp_bk b
     where v_map ? b.item_id and b.cost is distinct from ((v_map -> b.item_id ->> 'price')::numeric);
    update public.materials_lists ml
       set items = (
         select jsonb_agg(
                  case when jsonb_typeof(e.it) = 'object' and v_map ? (e.it ->> 'id') then
                    e.it
                    || jsonb_build_object('supplier_code', v_map -> (e.it ->> 'id') ->> 'code',
                                          'supplier_id', c.supplier_id)
                    || case when coalesce(btrim(e.it ->> 'supplier'), '') = '' then jsonb_build_object('supplier', v_supplier_name) else '{}'::jsonb end
                    || case when public._pb_num(e.it, 'cost_price') is distinct from (v_map -> (e.it ->> 'id') ->> 'price')::numeric then
                         jsonb_build_object('cost_price', (v_map -> (e.it ->> 'id') ->> 'price')::numeric, 'price_updated_at', v_now_txt)
                         || case when coalesce(public._pb_num(e.it, 'markup_percent'), 0) > 0 then
                              jsonb_build_object('estimated_price', round((v_map -> (e.it ->> 'id') ->> 'price')::numeric
                                                 * (1 + public._pb_num(e.it, 'markup_percent') / 100), 2))
                            else '{}'::jsonb end
                       else '{}'::jsonb end
                  else e.it end
                  order by e.n)
           from jsonb_array_elements(ml.items) with ordinality e(it, n))
     where ml.user_id = c.employer_id and jsonb_typeof(ml.items) = 'array'
       and exists (select 1 from jsonb_array_elements(ml.items) it where v_map ? (it ->> 'id'));
    update public.employer_supplier_price_moves m set book_applied = true
     where m.import_id = v_import and m.price_book_item_id is not null and v_map ? m.price_book_item_id;
  end if;

  insert into public.employer_price_file_imports (id, employer_id, connection_id, source, file_name, row_count,
    linked, added, price_changes, big_moves, book_updated, created_by)
  values (v_import, c.employer_id, c.id, p_source, left(p_file_name, 200), v_rows, v_linked, v_added,
          v_changes, v_big, v_book, p_actor);
  update public.employer_supplier_connections
     set last_synced_at = v_now, last_sync_status = 'ok',
         last_sync_message = v_rows || ' prices, ' || v_changes || ' changed', updated_at = v_now
   where id = c.id;

  return jsonb_build_object('import_id', v_import, 'rows', v_rows, 'linked', v_linked, 'added', v_added,
                            'price_changes', v_changes, 'big_moves', v_big, 'book_updated', v_book);
end;
$$;
revoke all on function public._supplier_apply_prices(uuid, jsonb, text, text, uuid) from public, anon, authenticated;
grant execute on function public._supplier_apply_prices(uuid, jsonb, text, text, uuid) to service_role;

create or replace function public.apply_supplier_price_file(p_connection uuid, p_rows jsonb, p_file_name text default null)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare v_firm uuid;
begin
  select employer_id into v_firm from public.employer_supplier_connections where id = p_connection and removed_at is null;
  if v_firm is null or auth.uid() is null or not public.can_see_firm_money(v_firm) then
    raise exception 'That account was not found' using errcode = 'P0002';
  end if;
  return public._supplier_apply_prices(p_connection, p_rows, p_file_name, 'file', auth.uid());
end;
$$;
revoke all on function public.apply_supplier_price_file(uuid, jsonb, text) from public, anon;
grant execute on function public.apply_supplier_price_file(uuid, jsonb, text) to authenticated;

-- The sync function records a failed fetch.
create or replace function public._supplier_sync_failed(p_connection uuid, p_message text)
returns void language sql security definer set search_path to 'public' as $$
  update public.employer_supplier_connections
     set last_synced_at = now(), last_sync_status = 'failed', last_sync_message = left(p_message, 300), updated_at = now()
   where id = p_connection
$$;
revoke all on function public._supplier_sync_failed(uuid, text) from public, anon, authenticated;
grant execute on function public._supplier_sync_failed(uuid, text) to service_role;

-- ── Price moves for the price book page ───────────────────────────────────
create or replace function public.get_firm_price_moves(p_firm uuid, p_days integer default 60)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    return '[]'::jsonb;
  end if;
  return coalesce((
    select jsonb_agg(x order by abs((x ->> 'change_pct')::numeric) desc, x ->> 'moved_at' desc)
      from (
        select jsonb_build_object(
                 'id', m.id, 'connection', c.display_name, 'product_code', m.product_code,
                 'description', m.description, 'item_id', m.price_book_item_id, 'item_name', b.name,
                 'old_price', m.old_price, 'new_price', m.new_price, 'change_pct', m.change_pct,
                 'big', abs(m.change_pct) >= c.price_alert_pct, 'book_applied', m.book_applied,
                 'moved_at', m.moved_at,
                 'open_quotes', (select count(*) from public.quotes q
                                  where q.user_id = p_firm and q.deleted_at is null
                                    and lower(coalesce(q.status, '')) in ('draft', 'sent')
                                    and coalesce(q.acceptance_status, 'pending') not in ('accepted', 'accepted_pending_deposit', 'rejected', 'declined')
                                    and coalesce(q.first_sent_at, q.created_at) < m.moved_at
                                    and exists (select 1 from jsonb_array_elements(case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end) li
                                                 where li ->> 'priceBookItemId' = m.price_book_item_id
                                                    or (b.norm is not null and public._sp_norm(li ->> 'description') = b.norm)))) as x
          from (select distinct on (mm.connection_id, mm.product_code) mm.*
                  from public.employer_supplier_price_moves mm
                 where mm.employer_id = p_firm and mm.moved_at > now() - make_interval(days => least(greatest(coalesce(p_days, 60), 1), 365))
                 order by mm.connection_id, mm.product_code, mm.moved_at desc) m
          join public.employer_supplier_connections c on c.id = m.connection_id
          left join public._sp_book(p_firm) b on b.item_id = m.price_book_item_id
         limit 200) s), '[]'::jsonb);
end;
$$;
revoke all on function public.get_firm_price_moves(uuid, integer) from public, anon;
grant execute on function public.get_firm_price_moves(uuid, integer) to authenticated;

-- ── Read-only price moves on an open quote ────────────────────────────────
-- Never changes the quote. Office managers get the percentage, not the prices.
create or replace function public.get_quote_price_moves(p_quote uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  q public.quotes%rowtype;
  v_money boolean;
  v_since timestamptz;
  v_alert numeric;
begin
  select * into q from public.quotes where id = p_quote and deleted_at is null;
  if not found or auth.uid() is null or q.user_id not in (select public.my_employer_scope()) then
    return jsonb_build_object('lines', '[]'::jsonb);
  end if;
  if lower(coalesce(q.status, '')) not in ('draft', 'sent')
     or coalesce(q.acceptance_status, 'pending') in ('accepted', 'accepted_pending_deposit', 'rejected', 'declined') then
    return jsonb_build_object('lines', '[]'::jsonb, 'open', false);
  end if;
  v_money := public.can_see_firm_money(q.user_id);
  v_since := coalesce(q.first_sent_at, q.created_at);
  select coalesce(min(c.price_alert_pct), 5) into v_alert
    from public.employer_supplier_connections c where c.employer_id = q.user_id and c.removed_at is null;

  return jsonb_build_object(
    'open', true, 'sent', q.first_sent_at is not null, 'since', v_since, 'alert_pct', v_alert,
    'lines', coalesce((
      select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
               'description', l.descr, 'item_name', l.item_name, 'change_pct', l.pct,
               'old_price', case when v_money then l.old_price end,
               'new_price', case when v_money then l.new_price end,
               'moved_at', l.moved_at)) order by abs(l.pct) desc)
        from (
          select li.descr, b.name as item_name, mv.old_price, mv.new_price, mv.moved_at,
                 round((mv.new_price - mv.old_price) / mv.old_price * 100, 0) as pct
            from (select distinct on (coalesce(nullif(x ->> 'priceBookItemId', ''), public._sp_norm(x ->> 'description')))
                         nullif(x ->> 'priceBookItemId', '') as pb_id, btrim(coalesce(x ->> 'description', '')) as descr,
                         public._sp_norm(x ->> 'description') as norm
                    from jsonb_array_elements(case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end) x
                   where jsonb_typeof(x) = 'object' and coalesce(x ->> 'type', '') <> 'labour'
                     and coalesce(btrim(x ->> 'description'), '') <> '') li
            join public._sp_book(q.user_id) b on b.item_id = li.pb_id or (li.pb_id is null and b.norm = li.norm)
            cross join lateral (
              select (select m1.old_price from public.employer_supplier_price_moves m1
                       where m1.employer_id = q.user_id and m1.price_book_item_id = b.item_id and m1.book_applied
                         and m1.moved_at > v_since order by m1.moved_at asc limit 1) as old_price,
                     (select m2.new_price from public.employer_supplier_price_moves m2
                       where m2.employer_id = q.user_id and m2.price_book_item_id = b.item_id and m2.book_applied
                         and m2.moved_at > v_since order by m2.moved_at desc limit 1) as new_price,
                     (select max(m3.moved_at) from public.employer_supplier_price_moves m3
                       where m3.employer_id = q.user_id and m3.price_book_item_id = b.item_id and m3.book_applied
                         and m3.moved_at > v_since) as moved_at
            ) mv
           where mv.old_price > 0 and mv.new_price is not null
        ) l
       where abs(l.pct) >= v_alert), '[]'::jsonb));
end;
$$;
revoke all on function public.get_quote_price_moves(uuid) from public, anon;
grant execute on function public.get_quote_price_moves(uuid) to authenticated;

-- ── Product codes for purchase orders ─────────────────────────────────────
create or replace function public.get_firm_supplier_codes(p_firm uuid)
returns table (item_id text, supplier_id uuid, product_code text, trade_price numeric)
language sql stable security definer set search_path to 'public' as $$
  select sp.price_book_item_id, c.supplier_id, sp.product_code, sp.trade_price
    from public.employer_supplier_prices sp
    join public.employer_supplier_connections c on c.id = sp.connection_id and c.removed_at is null
   where sp.employer_id = p_firm and sp.price_book_item_id is not null
     and auth.uid() is not null and public.can_see_firm_money(p_firm)
$$;
revoke all on function public.get_firm_supplier_codes(uuid) from public, anon;
grant execute on function public.get_firm_supplier_codes(uuid) to authenticated;

-- ── A supplier bill against its purchase order, line by line ──────────────
create or replace function public._bill_vs_order(p_lines jsonb, p_order uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_items jsonb;
  v_out jsonb;
begin
  select coalesce(mo.items, '[]'::jsonb) into v_items from public.employer_material_orders mo where mo.id = p_order;
  with po as (
    select p.n, btrim(coalesce(p.l ->> 'name', '')) as name, public._sp_norm(p.l ->> 'name') as norm,
           public._sp_code(p.l ->> 'sku') as code,
           coalesce(public._pb_num(p.l, 'qty'), 0) as qty, coalesce(public._pb_num(p.l, 'unit_cost'), 0) as unit_cost
      from jsonb_array_elements(case when jsonb_typeof(v_items) = 'array' then v_items else '[]'::jsonb end) with ordinality p(l, n)
     where jsonb_typeof(p.l) = 'object'
  ),
  bill as (
    select b.n, btrim(coalesce(b.l ->> 'description', '')) as descr, public._sp_norm(b.l ->> 'description') as norm,
           public._sp_code(b.l ->> 'code') as code,
           upper(coalesce(b.l ->> 'code', '') || ' ' || coalesce(b.l ->> 'description', '')) as hay,
           coalesce(public._pb_num(b.l, 'quantity'), public._pb_num(b.l, 'qty')) as qty,
           coalesce(public._pb_num(b.l, 'unit_price'),
                    case when coalesce(public._pb_num(b.l, 'quantity'), public._pb_num(b.l, 'qty'), 0) > 0
                         then round(coalesce(public._pb_num(b.l, 'net'), public._pb_num(b.l, 'line_total')) /
                                    coalesce(public._pb_num(b.l, 'quantity'), public._pb_num(b.l, 'qty')), 4) end) as unit_price,
           coalesce(public._pb_num(b.l, 'net'), public._pb_num(b.l, 'line_total')) as net
      from jsonb_array_elements(case when jsonb_typeof(p_lines) = 'array' then p_lines else '[]'::jsonb end) with ordinality b(l, n)
     where jsonb_typeof(b.l) = 'object' and coalesce(btrim(b.l ->> 'description'), '') <> ''
  ),
  matched as (
    select bl.*, m.po_n, m.po_name, m.po_qty, m.po_unit, m.how
      from bill bl
      left join lateral (
        select * from (
          select po.n as po_n, po.name as po_name, po.qty as po_qty, po.unit_cost as po_unit, 'code'::text as how, 1 as r_, 1.0::real as s_
            from po where po.code is not null and length(po.code) >= 3
                      and (bl.code = po.code or regexp_replace(bl.hay, '[^A-Z0-9]', '', 'g') like '%' || po.code || '%')
          union all
          select po.n, po.name, po.qty, po.unit_cost, 'name', 2, 1.0::real from po where po.norm = bl.norm
          union all
          select po.n, po.name, po.qty, po.unit_cost, 'similar', 3, similarity(po.norm, bl.norm)::real from po
           where po.norm is not null and bl.norm is not null and similarity(po.norm, bl.norm) >= 0.3
        ) cand order by r_, s_ desc limit 1
      ) m on true
  )
  select jsonb_build_object(
    'lines', coalesce((select jsonb_agg(jsonb_build_object(
                 'description', descr, 'qty', qty, 'unit_price', unit_price, 'net', net,
                 'po_name', po_name, 'po_qty', po_qty, 'po_unit_cost', po_unit, 'match', how,
                 'diff_each', case when po_n is not null and unit_price is not null then round(unit_price - po_unit, 2) end,
                 'diff_total', case when po_n is not null and unit_price is not null
                                    then round((unit_price - po_unit) * coalesce(qty, po_qty), 2) end,
                 'status', case when po_n is null then 'not_ordered'
                                when unit_price is null then 'no_price'
                                when unit_price > po_unit * 1.01 + 0.005 then 'dearer'
                                when unit_price < po_unit * 0.99 - 0.005 then 'cheaper'
                                else 'same' end) order by n) from matched), '[]'::jsonb),
    'not_billed', coalesce((select jsonb_agg(jsonb_build_object('name', po.name, 'qty', po.qty, 'unit_cost', po.unit_cost) order by po.n)
                              from po where not exists (select 1 from matched mt where mt.po_n = po.n)), '[]'::jsonb),
    'dearer_total', coalesce((select round(sum((unit_price - po_unit) * coalesce(qty, po_qty)), 2) from matched
                               where po_n is not null and unit_price > po_unit * 1.01 + 0.005), 0),
    'cheaper_total', coalesce((select round(sum((po_unit - unit_price) * coalesce(qty, po_qty)), 2) from matched
                                where po_n is not null and unit_price < po_unit * 0.99 - 0.005), 0)
  ) into v_out;
  return v_out;
end;
$$;
revoke all on function public._bill_vs_order(jsonb, uuid) from public, anon, authenticated;

create or replace function public.compare_bill_to_order(p_capture uuid, p_order uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
  o public.employer_material_orders%rowtype;
  v jsonb;
begin
  select * into c from public.employer_receipt_captures where id = p_capture;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) then
    raise exception 'That bill was not found' using errcode = 'P0002';
  end if;
  select * into o from public.employer_material_orders where id = p_order and employer_id = c.employer_id;
  if not found then raise exception 'That purchase order was not found' using errcode = 'P0002'; end if;
  v := public._bill_vs_order(c.extracted -> 'lines', p_order);
  return v || jsonb_build_object('order_number', o.order_number, 'po_subtotal', o.subtotal, 'po_total', o.total,
                                 'job_id', o.job_id,
                                 'job_title', (select j.title from public.employer_jobs j where j.id = o.job_id),
                                 'bill_net', c.extracted -> 'net', 'bill_gross', c.extracted -> 'gross');
end;
$$;
revoke all on function public.compare_bill_to_order(uuid, uuid) from public, anon;
grant execute on function public.compare_bill_to_order(uuid, uuid) to authenticated;

-- After a bill is posted to a PO (post_receipt_capture), write the line
-- differences onto it. Safe to run twice: it replaces its own variances.
create or replace function public.record_bill_line_variances(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
  si public.employer_supplier_invoices%rowtype;
  v jsonb;
  v_new jsonb;
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

  v := public._bill_vs_order(c.extracted -> 'lines', si.order_id);
  select coalesce(jsonb_agg(case
           when l ->> 'status' = 'dearer' then jsonb_build_object('type', 'price_hike', 'source', 'line_check',
             'detail', (l ->> 'po_name') || ': billed £' || to_char((l ->> 'unit_price')::numeric, 'FM999990.00')
                       || ' each, the order said £' || to_char((l ->> 'po_unit_cost')::numeric, 'FM999990.00'),
             'amount', (l ->> 'diff_total')::numeric)
           else jsonb_build_object('type', 'not_ordered', 'source', 'line_check',
             'detail', (l ->> 'description') || ' is on the bill but not on the order',
             'amount', coalesce((l ->> 'net')::numeric, 0)) end), '[]'::jsonb)
    into v_new
    from jsonb_array_elements(v -> 'lines') l
   where l ->> 'status' in ('dearer', 'not_ordered');

  update public.employer_supplier_invoices
     set variances = coalesce((select jsonb_agg(x) from jsonb_array_elements(variances) x
                                where coalesce(x ->> 'source', '') <> 'line_check'), '[]'::jsonb) || v_new,
         matched = matched and jsonb_array_length(v_new) = 0
   where id = si.id;
  return jsonb_build_object('recorded', true, 'flags', jsonb_array_length(v_new),
                            'dearer_total', v -> 'dearer_total');
end;
$$;
revoke all on function public.record_bill_line_variances(uuid) from public, anon;
grant execute on function public.record_bill_line_variances(uuid) to authenticated;

revoke all on function public._sp_code(text) from public, anon;
revoke all on function public._sp_norm(text) from public, anon;
grant execute on function public._sp_code(text) to authenticated, service_role;
grant execute on function public._sp_norm(text) to authenticated, service_role;
