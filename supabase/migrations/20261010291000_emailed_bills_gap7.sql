-- Gap #7: wholesalers by email, the Fergus route.
--
-- Each firm gets a bills address, bills-<token>@in.elec-mate.com. The
-- Cloudflare Email Worker already forwards everything for *@in.elec-mate.com
-- to inbound-enquiry-email; a bills address is handed to the bills path
-- (_shared/emailed-bills.ts) before any enquiry handling.
--
-- The bills path:
--   1. emailed_bill_inbox_found(token): is it a bills inbox at all? If not, the
--      enquiry path runs exactly as before.
--   2. emailed_bill_intake: duplicate, rate limit, who sent it. One receipt
--      capture (source 'email', ELE-2071) per PDF / photo / body, plus a row
--      here saying where it came from. Unknown senders are HELD: stored, not
--      read by AI, not posted.
--   3. The file goes to the private expense-receipts bucket; the AI read is
--      the read-receipt extraction (one call per bill).
--   4. emailed_bill_reading: stores the reading, flags duplicates
--      (receipt_flag_duplicates) and matches the PO and job with the one
--      supplier-bill rule (_supplier_bill_check, 20261010285000).
--   5. The office checks it in Receipts and posts it (post_receipt_capture,
--      unchanged). Then apply_emailed_bill_prices sends the bill's line prices
--      through the wholesaler price-move path (_supplier_apply_prices,
--      ELE-2066) so the price book and open quotes show the move, and sets
--      "last paid" on the matched price-book items.
--
-- Additive only: two new tables (RLS on), new functions. No trigger, no change
-- to an existing table, policy or function.

-- ── Tables ────────────────────────────────────────────────────────────────
create table if not exists public.employer_bill_inboxes (
  employer_id uuid primary key,
  token text not null unique check (token ~ '^[a-z0-9]{12}$'),
  enabled boolean not null default true,
  trusted_senders text[] not null default '{}',
  forwarding_confirmation_code text,
  forwarding_confirmation_link text,
  forwarding_confirmation_at timestamptz,
  last_received_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default now()
);
alter table public.employer_bill_inboxes enable row level security;
revoke all on public.employer_bill_inboxes from anon, authenticated;
comment on table public.employer_bill_inboxes is
  '[EMPLOYER HUB] A firm''s bills address bills-<token>@in.elec-mate.com (gap #7): wholesaler invoices forwarded here become receipt captures to check. Scope: employer_id = firm owner. No direct client access: read through get_bills_inbox (owner/admin), written by get_bills_inbox / reset_bills_address / trust_bill_sender and the inbound-enquiry-email function (service role). Rule: only the token identifies the firm.';

create table if not exists public.employer_emailed_bills (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  capture_id uuid unique references public.employer_receipt_captures(id) on delete cascade,
  message_id text,
  part integer not null default 0,
  from_address text,
  from_name text,
  envelope_from text,
  subject text,
  body_text text,
  sender_known text,
  received_at timestamptz not null default now(),
  status text not null default 'reading' check (status in ('held', 'reading', 'read', 'failed')),
  hold_reason text,
  order_ref text,
  match jsonb,
  prices_applied_at timestamptz,
  prices_result jsonb,
  unique (employer_id, message_id, part)
);
create index if not exists employer_emailed_bills_firm
  on public.employer_emailed_bills (employer_id, received_at desc);
alter table public.employer_emailed_bills enable row level security;
revoke all on public.employer_emailed_bills from anon, authenticated;
grant select on public.employer_emailed_bills to authenticated;
drop policy if exists "Firm money reads emailed bills" on public.employer_emailed_bills;
create policy "Firm money reads emailed bills" on public.employer_emailed_bills
  for select to authenticated using (public.can_see_firm_money(employer_id));
comment on table public.employer_emailed_bills is
  '[EMPLOYER HUB] Where an emailed supplier bill came from (gap #7): sender, subject, held or read, the PO/job match from _supplier_bill_check, and whether its prices went to the price book. One row per bill (attachment). Scope: employer_id = firm owner; owner/admin read (can_see_firm_money). Rule: written only by the emailed_bill_* functions, trust_bill_sender, rematch_emailed_bill and apply_emailed_bill_prices.';

-- ── Helpers ───────────────────────────────────────────────────────────────
create or replace function public._bill_addr(p text)
returns text language sql immutable set search_path to 'public' as $$
  select nullif(lower(coalesce(substring(btrim(coalesce(p, '')) from '[^\s<>"]+@[^\s<>"]+'), '')), '')
$$;

create or replace function public._bill_personal_domain(p_domain text)
returns boolean language sql immutable set search_path to 'public' as $$
  select lower(coalesce(p_domain, '')) = any (array[
    'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'outlook.co.uk',
    'live.com', 'live.co.uk', 'msn.com', 'yahoo.com', 'yahoo.co.uk', 'icloud.com', 'me.com', 'mac.com',
    'aol.com', 'aol.co.uk', 'btinternet.com', 'btopenworld.com', 'sky.com', 'virginmedia.com',
    'ntlworld.com', 'blueyonder.co.uk', 'talktalk.net', 'tiscali.co.uk', 'protonmail.com', 'proton.me',
    'mail.com', 'gmx.com', 'gmx.co.uk', 'zoho.com'])
$$;

-- Which wholesaler a name or a mail domain belongs to (the same keys as
-- employer_supplier_connections.wholesaler).
create or replace function public._bill_wholesaler_of(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case
    when x ~ '(cityelectricalfactors|^cef|cefcouk)' then 'cef'
    when x ~ 'edmundson' then 'edmundson'
    when x ~ 'rexel' then 'rexel'
    when x ~ 'denmans' then 'denmans'
    when x ~ 'yesss' then 'yesss'
    when x ~ '(tlcdirect|tlcelectrical|^tlc)' then 'tlc'
    when x ~ 'screwfix' then 'screwfix'
    when x ~ 'toolstation' then 'toolstation'
    when x ~ '(wfsenate|wfelectrical|senate)' then 'wf_senate'
    when x ~ 'newey' then 'newey'
  end
  from (select lower(regexp_replace(coalesce(p, ''), '[^A-Za-z0-9]', '', 'g')) as x) s
$$;

-- Why a sender is known to the firm, or null when it isn't.
create or replace function public._bill_sender_known(p_firm uuid, p_address text)
returns text
language plpgsql stable security definer set search_path to 'public' as $$
declare
  a text := public._bill_addr(p_address);
  d text;
  v_trusted text[];
begin
  if a is null or a !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then return null; end if;
  d := split_part(a, '@', 2);
  if d like '%elec-mate.com' then return null; end if;
  select trusted_senders into v_trusted from public.employer_bill_inboxes where employer_id = p_firm;
  if a = any (coalesce(v_trusted, '{}')) or ('@' || d) = any (coalesce(v_trusted, '{}')) then
    return 'trusted';
  end if;
  if exists (select 1 from auth.users u
              where lower(u.email) = a
                and (u.id = p_firm or u.id in (select ea.user_id from public.employer_admins ea
                                                where ea.employer_id = p_firm and ea.status = 'active'))) then
    return 'own';
  end if;
  if exists (select 1 from public.company_profiles cp
              where cp.user_id = p_firm
                and a in (lower(btrim(coalesce(cp.company_email, ''))), lower(btrim(coalesce(cp.notification_email, ''))))) then
    return 'own';
  end if;
  -- Below here a whole domain is trusted, so never a personal mail domain.
  if public._bill_personal_domain(d) then return null; end if;
  if exists (select 1 from public.employer_supplier_connections c
              where c.employer_id = p_firm and c.removed_at is null
                and lower(split_part(coalesce(c.order_email, ''), '@', 2)) = d)
     or exists (select 1 from public.employer_suppliers s
                 where s.employer_id = p_firm and lower(split_part(coalesce(s.email, ''), '@', 2)) = d) then
    return 'supplier';
  end if;
  if exists (select 1 from public.employer_supplier_connections c
              where c.employer_id = p_firm and c.removed_at is null
                and c.wholesaler <> 'other' and c.wholesaler = public._bill_wholesaler_of(d)) then
    return 'wholesaler';
  end if;
  return null;
end;
$$;

-- The best open purchase order for a read bill, by the one rule.
--   1. The bill quotes the PO number (order_ref) → that order.
--   2. Otherwise orders from the same supplier (name, account or wholesaler),
--      best first: the one _supplier_bill_check says matches, then the
--      nearest total.
create or replace function public._emailed_bill_match(p_capture uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
  v_ref text;
  v_sup text;
  v_whs text;
  v_gross numeric;
  v_lines jsonb;
  r record;
begin
  select * into c from public.employer_receipt_captures where id = p_capture;
  if not found or c.extracted is null then return jsonb_build_object('order_id', null); end if;
  select nullif(lower(regexp_replace(coalesce(eb.order_ref, ''), '[^A-Za-z0-9]', '', 'g')), '')
    into v_ref from public.employer_emailed_bills eb where eb.capture_id = c.id;
  v_sup := nullif(lower(regexp_replace(coalesce(c.extracted ->> 'supplier', ''), '[^A-Za-z0-9]', '', 'g')), '');
  v_whs := public._bill_wholesaler_of(c.extracted ->> 'supplier');
  v_gross := case when (c.extracted ->> 'gross') ~ '^-?\d+(\.\d+)?$' then round((c.extracted ->> 'gross')::numeric, 2) end;
  v_lines := case when jsonb_typeof(c.extracted -> 'lines') = 'array' then c.extracted -> 'lines' else '[]'::jsonb end;

  select x.*, public._supplier_bill_check(x.id, v_gross, v_lines) as chk into r
    from (
      select mo.id, mo.order_number, mo.job_id, mo.total, mo.created_at, s.name as supplier_name,
             (v_ref is not null
              and length(lower(regexp_replace(coalesce(mo.order_number, ''), '[^A-Za-z0-9]', '', 'g'))) >= 3
              and position(lower(regexp_replace(coalesce(mo.order_number, ''), '[^A-Za-z0-9]', '', 'g')) in v_ref) > 0) as ref_hit,
             (v_sup is not null and (
                lower(regexp_replace(coalesce(s.name, ''), '[^A-Za-z0-9]', '', 'g')) = v_sup
                or (length(lower(regexp_replace(coalesce(s.name, ''), '[^A-Za-z0-9]', '', 'g'))) >= 4
                    and (position(lower(regexp_replace(coalesce(s.name, ''), '[^A-Za-z0-9]', '', 'g')) in v_sup) > 0
                         or position(v_sup in lower(regexp_replace(coalesce(s.name, ''), '[^A-Za-z0-9]', '', 'g'))) > 0))
                or (v_whs is not null and (public._bill_wholesaler_of(s.name) = v_whs or conn.wholesaler = v_whs)))) as sup_hit
        from public.employer_material_orders mo
        left join public.employer_suppliers s on s.id = mo.supplier_id
        left join public.employer_supplier_connections conn on conn.supplier_id = mo.supplier_id and conn.removed_at is null
       where mo.employer_id = c.employer_id
         and lower(coalesce(mo.status, '')) not in ('draft', 'cancelled', 'canceled')
         and not exists (select 1 from public.employer_supplier_invoices si where si.order_id = mo.id)
         and mo.created_at > now() - interval '180 days'
    ) x
   where x.ref_hit or x.sup_hit
   order by x.ref_hit desc,
            coalesce((public._supplier_bill_check(x.id, v_gross, v_lines) ->> 'matched')::boolean, false) desc,
            abs(coalesce(x.total, 0) - coalesce(v_gross, 0)), x.created_at desc
   limit 1;

  if not found then return jsonb_build_object('order_id', null); end if;
  return jsonb_build_object(
    'order_id', r.id, 'order_number', r.order_number, 'supplier', r.supplier_name,
    'job_id', r.job_id, 'job_title', (select j.title from public.employer_jobs j where j.id = r.job_id),
    'how', case when r.ref_hit then 'reference'
                when coalesce((r.chk ->> 'matched')::boolean, false) then 'supplier_and_total'
                else 'supplier' end,
    'check', r.chk);
end;
$$;

-- After a read: suggestion and row updated from the match.
create or replace function public._emailed_bill_apply_match(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  v_match jsonb;
begin
  perform public.receipt_flag_duplicates(p_capture);
  v_match := public._emailed_bill_match(p_capture);
  if v_match ->> 'order_id' is not null then
    update public.employer_receipt_captures
       set suggestion = coalesce(suggestion, '{}'::jsonb)
                        || jsonb_strip_nulls(jsonb_build_object('post_as', 'po_cost',
                             'order_id', v_match ->> 'order_id', 'job_id', v_match ->> 'job_id'))
     where id = p_capture;
  end if;
  update public.employer_emailed_bills set match = v_match where capture_id = p_capture;
  return v_match;
end;
$$;

revoke all on function public._bill_addr(text) from public, anon;
revoke all on function public._bill_personal_domain(text) from public, anon;
revoke all on function public._bill_wholesaler_of(text) from public, anon;
grant execute on function public._bill_addr(text) to authenticated, service_role;
grant execute on function public._bill_personal_domain(text) to authenticated, service_role;
grant execute on function public._bill_wholesaler_of(text) to authenticated, service_role;
revoke all on function public._bill_sender_known(uuid, text) from public, anon, authenticated;
revoke all on function public._emailed_bill_match(uuid) from public, anon, authenticated;
revoke all on function public._emailed_bill_apply_match(uuid) from public, anon, authenticated;

-- ── Service role: the inbound path ───────────────────────────────────────
create or replace function public.emailed_bill_inbox_found(p_token text)
returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.employer_bill_inboxes where token = lower(btrim(coalesce(p_token, ''))))
$$;

create or replace function public.emailed_bill_forwarding(p_token text, p_code text, p_link text)
returns boolean
language plpgsql security definer set search_path to 'public' as $$
declare
  v_firm uuid;
begin
  update public.employer_bill_inboxes
     set forwarding_confirmation_code = left(nullif(btrim(coalesce(p_code, '')), ''), 20),
         forwarding_confirmation_link = left(nullif(btrim(coalesce(p_link, '')), ''), 1000),
         forwarding_confirmation_at = now()
   where token = lower(btrim(coalesce(p_token, '')))
  returning employer_id into v_firm;
  return v_firm is not null;
end;
$$;

-- p_email: {message_id, from, from_name, envelope_from, subject, body_text}
-- p_parts: [{part, mime, file_name, hash, size}]
create or replace function public.emailed_bill_intake(p_token text, p_email jsonb, p_parts jsonb)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  ib public.employer_bill_inboxes%rowtype;
  v_mid text := nullif(left(btrim(coalesce(p_email ->> 'message_id', '')), 300), '');
  v_recent int;
  v_held int;
  v_known text;
  v_from text := public._bill_addr(p_email ->> 'from');
  x jsonb;
  v_cap uuid;
  v_mime text;
  v_ext text;
  v_path text;
  v_out jsonb := '[]'::jsonb;
  v_n int := 0;
begin
  select * into ib from public.employer_bill_inboxes where token = lower(btrim(coalesce(p_token, ''))) for update;
  if not found then return jsonb_build_object('found', false); end if;
  if not ib.enabled then return jsonb_build_object('found', true, 'off', true); end if;
  if jsonb_typeof(p_parts) <> 'array' or jsonb_array_length(p_parts) = 0 then
    return jsonb_build_object('found', true, 'nothing', true);
  end if;
  if v_mid is not null and exists (select 1 from public.employer_emailed_bills
                                    where employer_id = ib.employer_id and message_id = v_mid) then
    return jsonb_build_object('found', true, 'duplicate', true);
  end if;

  v_known := public._bill_sender_known(ib.employer_id, p_email ->> 'from');
  -- Auto-forwarded by Gmail / Outlook from the firm's own mailbox: the
  -- envelope sender is the firm, the From is the wholesaler.
  if v_known is null and public._bill_sender_known(ib.employer_id, p_email ->> 'envelope_from') = 'own' then
    v_known := 'own_forward';
  end if;

  -- Rate limits: 30 bills an hour (each read by AI), 20 held from unknown senders.
  select count(*) filter (where status <> 'held'), count(*) filter (where status = 'held')
    into v_recent, v_held
    from public.employer_emailed_bills
   where employer_id = ib.employer_id and received_at > now() - interval '1 hour';
  if (v_known is not null and v_recent + jsonb_array_length(p_parts) > 30)
     or (v_known is null and v_held + jsonb_array_length(p_parts) > 20) then
    return jsonb_build_object('found', true, 'busy', true);
  end if;

  for x in select * from jsonb_array_elements(p_parts) limit 5 loop
    v_n := v_n + 1;
    v_mime := lower(coalesce(x ->> 'mime', ''));
    v_ext := case when v_mime = 'application/pdf' then 'pdf'
                  when v_mime = 'image/png' then 'png'
                  when v_mime = 'image/webp' then 'webp'
                  when v_mime in ('image/heic', 'image/heif') then 'heic'
                  when v_mime = 'image/jpeg' then 'jpg'
                  when v_mime = 'text/plain' then 'txt'
             end;
    continue when v_ext is null;
    v_cap := gen_random_uuid();
    v_path := 'captures/email/' || ib.employer_id::text || '/' || v_cap::text || '.' || v_ext;
    insert into public.employer_receipt_captures (id, employer_id, captured_by, employee_id, source, file_path,
                                                  file_mime, file_name, file_hash, captured_at, status, read_at)
    values (v_cap, ib.employer_id, ib.employer_id, null, 'email', v_path, v_mime,
            left(coalesce(nullif(btrim(coalesce(x ->> 'file_name', '')), ''),
                          case when v_ext = 'txt' then 'Email' else 'Bill' end), 200),
            nullif(left(coalesce(x ->> 'hash', ''), 128), ''), now(),
            case when v_known is null then 'new' else 'reading' end,
            case when v_known is null then null else now() end);
    insert into public.employer_emailed_bills (employer_id, capture_id, message_id, part, from_address, from_name,
                                               envelope_from, subject, body_text, sender_known, status, hold_reason)
    values (ib.employer_id, v_cap, v_mid, coalesce((x ->> 'part')::int, v_n - 1), v_from,
            left(nullif(btrim(coalesce(p_email ->> 'from_name', '')), ''), 200),
            public._bill_addr(p_email ->> 'envelope_from'),
            left(nullif(btrim(coalesce(p_email ->> 'subject', '')), ''), 300),
            left(nullif(p_email ->> 'body_text', ''), 12000), v_known,
            case when v_known is null then 'held' else 'reading' end,
            case when v_known is null then 'Not from an address the firm knows yet' end);
    v_out := v_out || jsonb_build_array(jsonb_build_object('capture_id', v_cap, 'path', v_path,
                                                           'part', coalesce((x ->> 'part')::int, v_n - 1),
                                                           'read', v_known is not null));
  end loop;

  update public.employer_bill_inboxes set last_received_at = now() where employer_id = ib.employer_id;
  return jsonb_build_object('found', true, 'firm', ib.employer_id, 'known', v_known, 'items', v_out);
end;
$$;

create or replace function public.emailed_bill_reading(p_capture uuid, p_extracted jsonb, p_order_ref text)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
begin
  update public.employer_receipt_captures
     set status = 'read', extracted = p_extracted, read_at = now(), read_error = null
   where id = p_capture and source = 'email' and status not in ('posted', 'discarded');
  if not found then return jsonb_build_object('stored', false); end if;
  update public.employer_emailed_bills
     set status = 'read', hold_reason = null,
         order_ref = left(nullif(btrim(coalesce(p_order_ref, '')), ''), 80)
   where capture_id = p_capture;
  return jsonb_build_object('stored', true, 'match', public._emailed_bill_apply_match(p_capture));
end;
$$;

create or replace function public.emailed_bill_failed(p_capture uuid, p_error text)
returns void
language sql security definer set search_path to 'public' as $$
  update public.employer_receipt_captures
     set status = 'failed', read_error = left(coalesce(p_error, 'Could not read it'), 300)
   where id = p_capture and source = 'email' and status not in ('posted', 'discarded');
  update public.employer_emailed_bills set status = 'failed'
   where capture_id = p_capture and status <> 'read';
$$;

revoke all on function public.emailed_bill_inbox_found(text) from public, anon, authenticated;
revoke all on function public.emailed_bill_forwarding(text, text, text) from public, anon, authenticated;
revoke all on function public.emailed_bill_intake(text, jsonb, jsonb) from public, anon, authenticated;
revoke all on function public.emailed_bill_reading(uuid, jsonb, text) from public, anon, authenticated;
revoke all on function public.emailed_bill_failed(uuid, text) from public, anon, authenticated;
grant execute on function public.emailed_bill_inbox_found(text) to service_role;
grant execute on function public.emailed_bill_forwarding(text, text, text) to service_role;
grant execute on function public.emailed_bill_intake(text, jsonb, jsonb) to service_role;
grant execute on function public.emailed_bill_reading(uuid, jsonb, text) to service_role;
grant execute on function public.emailed_bill_failed(uuid, text) to service_role;

-- ── Owner / admin: the app ───────────────────────────────────────────────
-- The address (made on first look) and the emailed bills, newest first.
create or replace function public.get_bills_inbox(p_firm uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  ib public.employer_bill_inboxes%rowtype;
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    return jsonb_build_object('allowed', false);
  end if;
  select * into ib from public.employer_bill_inboxes where employer_id = p_firm;
  if not found then
    insert into public.employer_bill_inboxes (employer_id, token, created_by)
    values (p_firm, substr(md5(gen_random_uuid()::text), 1, 12), auth.uid())
    on conflict (employer_id) do nothing;
    select * into ib from public.employer_bill_inboxes where employer_id = p_firm;
  end if;
  return jsonb_build_object(
    'allowed', true,
    'address', 'bills-' || ib.token || '@in.elec-mate.com',
    'enabled', ib.enabled,
    'last_received_at', ib.last_received_at,
    'forwarding_code', case when ib.forwarding_confirmation_at > now() - interval '7 days' then ib.forwarding_confirmation_code end,
    'forwarding_link', case when ib.forwarding_confirmation_at > now() - interval '7 days' then ib.forwarding_confirmation_link end,
    'forwarding_at', ib.forwarding_confirmation_at,
    'bills', coalesce((
      select jsonb_agg(jsonb_build_object(
               'capture_id', eb.capture_id, 'from_address', eb.from_address, 'from_name', eb.from_name,
               'subject', eb.subject, 'received_at', eb.received_at, 'status', eb.status,
               'sender_known', eb.sender_known, 'hold_reason', eb.hold_reason, 'order_ref', eb.order_ref,
               'match', eb.match, 'prices_applied_at', eb.prices_applied_at, 'prices_result', eb.prices_result)
             order by eb.received_at desc)
        from (select * from public.employer_emailed_bills x where x.employer_id = p_firm
               order by x.received_at desc limit 100) eb), '[]'::jsonb));
end;
$$;

-- A new address: the old one stops working at once (if it is being spammed).
create or replace function public.reset_bills_address(p_firm uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can change the bills address' using errcode = '42501';
  end if;
  update public.employer_bill_inboxes
     set token = substr(md5(gen_random_uuid()::text), 1, 12),
         forwarding_confirmation_code = null, forwarding_confirmation_link = null, forwarding_confirmation_at = null
   where employer_id = p_firm;
  return public.get_bills_inbox(p_firm);
end;
$$;

-- Held bill: trust whoever sent it, so their next bills are read straight away.
create or replace function public.trust_bill_sender(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  eb public.employer_emailed_bills%rowtype;
begin
  select * into eb from public.employer_emailed_bills where capture_id = p_capture;
  if not found or auth.uid() is null or not public.can_see_firm_money(eb.employer_id) then
    raise exception 'That bill was not found' using errcode = 'P0002';
  end if;
  if eb.from_address is null then
    return jsonb_build_object('trusted', false);
  end if;
  update public.employer_bill_inboxes
     set trusted_senders = (select array(select distinct t from unnest(trusted_senders || array[eb.from_address]) t order by t))
   where employer_id = eb.employer_id;
  update public.employer_emailed_bills
     set sender_known = 'trusted', hold_reason = null, status = case when status = 'held' then 'reading' else status end
   where employer_id = eb.employer_id and from_address = eb.from_address and status = 'held';
  return jsonb_build_object('trusted', true, 'address', eb.from_address);
end;
$$;

-- Match again (after a read in the app, or to refresh the PO list).
create or replace function public.rematch_emailed_bill(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
begin
  select * into c from public.employer_receipt_captures where id = p_capture;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) or c.source <> 'email' then
    raise exception 'That bill was not found' using errcode = 'P0002';
  end if;
  if c.extracted is null or c.status in ('posted', 'discarded') then
    return jsonb_build_object('order_id', null);
  end if;
  return public._emailed_bill_apply_match(p_capture);
end;
$$;

-- After the office posts an emailed bill: its line prices go through the
-- wholesaler price-move path (ELE-2066), and "last paid" is set on the
-- matched price-book items. Once per bill.
create or replace function public.apply_emailed_bill_prices(p_capture uuid)
returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  c public.employer_receipt_captures%rowtype;
  eb public.employer_emailed_bills%rowtype;
  v_supplier_id uuid;
  v_conn uuid;
  v_supplier text;
  v_rows jsonb := '[]'::jsonb;
  v_paid jsonb := '{}'::jsonb;
  v_move jsonb;
  v_res jsonb;
  v_now text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
  l jsonb;
  it jsonb;
  v_code text;
  v_price numeric;
begin
  select * into c from public.employer_receipt_captures where id = p_capture for update;
  if not found or auth.uid() is null or not public.can_see_firm_money(c.employer_id) or c.source <> 'email' then
    raise exception 'That bill was not found' using errcode = 'P0002';
  end if;
  select * into eb from public.employer_emailed_bills where capture_id = c.id for update;
  if eb.prices_applied_at is not null then
    return coalesce(eb.prices_result, '{}'::jsonb) || jsonb_build_object('already', true);
  end if;
  if c.status <> 'posted' then
    return jsonb_build_object('applied', false, 'reason', 'not_posted');
  end if;
  v_supplier := coalesce(c.extracted -> 'confirmed' ->> 'supplier', c.extracted ->> 'supplier');

  -- Which wholesaler account: the PO's supplier, else the bill's wholesaler.
  if c.posted_as = 'po_cost' then
    select mo.supplier_id into v_supplier_id
      from public.employer_supplier_invoices si join public.employer_material_orders mo on mo.id = si.order_id
     where si.id = c.posted_ref;
  end if;
  select sc.id into v_conn from public.employer_supplier_connections sc
   where sc.employer_id = c.employer_id and sc.removed_at is null
     and ((v_supplier_id is not null and sc.supplier_id = v_supplier_id)
          or (public._bill_wholesaler_of(v_supplier) is not null and sc.wholesaler = public._bill_wholesaler_of(v_supplier)))
   order by (sc.supplier_id = v_supplier_id) desc nulls last, sc.created_at
   limit 1;

  for l in select * from jsonb_array_elements(case when jsonb_typeof(c.extracted -> 'lines') = 'array'
                                                   then c.extracted -> 'lines' else '[]'::jsonb end) loop
    v_price := case when (l ->> 'unit_price') ~ '^\d+(\.\d+)?$' then round((l ->> 'unit_price')::numeric, 4) end;
    continue when v_price is null or v_price <= 0;
    v_code := public._sp_code(l ->> 'code');
    it := public._price_book_find(c.employer_id, v_code, l ->> 'description');
    if it is not null and coalesce(it ->> 'id', '') <> '' then
      v_paid := v_paid || jsonb_build_object(it ->> 'id', v_price);
    end if;
    if v_code is not null then
      v_rows := v_rows || jsonb_build_array(jsonb_strip_nulls(jsonb_build_object(
        'code', v_code, 'description', l ->> 'description', 'price', v_price,
        'item_id', case when it is not null and coalesce(it ->> 'id', '') <> '' then it ->> 'id' end,
        'match', case when it is null or coalesce(it ->> 'id', '') = '' then null
                      when public._sp_code(coalesce(nullif(it ->> 'supplier_code', ''), it ->> 'code')) = v_code then 'code'
                      else 'name' end)));
    end if;
  end loop;

  if v_conn is not null and jsonb_array_length(v_rows) > 0 then
    v_move := public._supplier_apply_prices(
      v_conn, v_rows,
      left('Emailed bill' || coalesce(' ' || nullif(coalesce(c.extracted -> 'confirmed' ->> 'invoice_number', c.extracted ->> 'invoice_number'), ''), ''), 200),
      'file', auth.uid());
  end if;

  if v_paid <> '{}'::jsonb then
    update public.materials_lists ml
       set items = (select jsonb_agg(case when jsonb_typeof(e.it) = 'object' and v_paid ? (e.it ->> 'id') then
                                          e.it || jsonb_build_object('last_paid_price', (v_paid ->> (e.it ->> 'id'))::numeric,
                                                                     'last_paid_at', v_now,
                                                                     'last_paid_supplier', coalesce(v_supplier, ''))
                                        else e.it end order by e.n)
                      from jsonb_array_elements(ml.items) with ordinality e(it, n))
     where ml.user_id = c.employer_id and jsonb_typeof(ml.items) = 'array'
       and exists (select 1 from jsonb_array_elements(ml.items) x where v_paid ? (x ->> 'id'));
  end if;

  v_res := jsonb_strip_nulls(jsonb_build_object(
    'applied', true,
    'account', v_conn is not null,
    'coded_lines', jsonb_array_length(v_rows),
    'last_paid', (select count(*) from jsonb_object_keys(v_paid)),
    'price_changes', coalesce((v_move ->> 'price_changes')::int, 0),
    'book_updated', coalesce((v_move ->> 'book_updated')::int, 0),
    'import_id', v_move ->> 'import_id'));
  update public.employer_emailed_bills set prices_applied_at = now(), prices_result = v_res where id = eb.id;
  return v_res;
end;
$$;

revoke all on function public.get_bills_inbox(uuid) from public, anon;
revoke all on function public.reset_bills_address(uuid) from public, anon;
revoke all on function public.trust_bill_sender(uuid) from public, anon;
revoke all on function public.rematch_emailed_bill(uuid) from public, anon;
revoke all on function public.apply_emailed_bill_prices(uuid) from public, anon;
grant execute on function public.get_bills_inbox(uuid) to authenticated;
grant execute on function public.reset_bills_address(uuid) to authenticated;
grant execute on function public.trust_bill_sender(uuid) to authenticated;
grant execute on function public.rematch_emailed_bill(uuid) to authenticated;
grant execute on function public.apply_emailed_bill_prices(uuid) to authenticated;
