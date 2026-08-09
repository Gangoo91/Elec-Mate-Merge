-- The lifetime cohort was a number with nothing behind it.
--
-- AdminRevenue counted lifetime buyers with
--   profiles.free_access_granted = true AND free_access_reason ILIKE '%lifetime%'
-- and rendered the count as "Lifetime (£300 one-off)". Two things wrong with
-- that: the label is not true — one buyer paid £499.99 for Lifetime EVERYTHING
-- — and a bare count cannot tell you who they are or what was banked.
--
-- There are two populations and neither alone is the answer:
--
--   * `lifetime_purchases` (4 rows) — the auto-fulfilment path, added partway
--     through the campaign. Carries an exact `amount_pence`.
--   * `profiles.free_access_reason` (12 rows) — every buyer, including the 8
--     granted by hand before the table existed. Carries only prose, in which
--     the amount is written "£300" even where Stripe actually took £299.99.
--
-- So: union on the profile, exact amount where a purchase row exists,
-- reason-parsed estimate otherwise, and say which is which rather than
-- presenting a guess as banked revenue.

create or replace function public.get_lifetime_buyers()
returns table (
  user_id uuid,
  email text,
  full_name text,
  amount_pence integer,
  amount_is_exact boolean,
  -- Deliberately not "purchased_at". Only the `lifetime_purchases` rows know
  -- when money moved; for the hand-granted eight this is when the grant was
  -- written, and all eight carry the same backfill timestamp. Callers must not
  -- present it as a purchase date, which is why it is not named like one.
  recorded_at timestamptz,
  fulfilled boolean,
  subscription_tier text,
  reason text
)
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
begin
  -- SECURITY DEFINER reaching into auth.users. Without this gate any
  -- authenticated caller could read the buyers' email addresses.
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  return query
  select
    p.id,
    coalesce(lp.email, u.email::text),
    nullif(btrim(p.full_name), ''),
    -- Exact where the checkout recorded it; otherwise the £ figure written
    -- into the grant reason, in pence. Falls back to the £300 campaign price
    -- only when the reason mentions lifetime but names no amount at all.
    coalesce(
      lp.amount_pence,
      (nullif(regexp_replace(
         substring(p.free_access_reason from '£[0-9]+(?:\.[0-9]{2})?'),
         '[^0-9.]', '', 'g'), '')::numeric * 100)::integer,
      30000
    ),
    lp.amount_pence is not null,
    coalesce(lp.created_at, p.updated_at, p.created_at),
    -- A purchase row that never fulfilled is someone who paid and did not get
    -- access. Where there is no purchase row the grant itself is the proof.
    -- Only the presence of the purchase row decides which test applies:
    -- `NULL is not null` is FALSE, not NULL, so a coalesce chain starting with
    -- lp.fulfilled_at would stop dead on the first argument for every
    -- hand-granted buyer and report all eight of them as paid-without-access.
    case
      when lp.id is null then coalesce(p.free_access_granted, false)
      else lp.fulfilled_at is not null
    end,
    p.subscription_tier,
    p.free_access_reason
  from profiles p
  left join auth.users u on u.id = p.id
  left join lateral (
    select l.* from lifetime_purchases l
    where l.user_id = p.id
    order by l.created_at desc
    limit 1
  ) lp on true
  where (p.free_access_granted = true and p.free_access_reason ilike '%lifetime%')
     or lp.id is not null

  union all

  -- Someone paid and we have no account to attach it to. None exist today,
  -- but this is the one row on this page that would be an emergency, and a
  -- profile-driven query cannot produce it — so it gets its own branch rather
  -- than being silently absent.
  select
    null::uuid,
    l.email,
    null::text,
    l.amount_pence,
    true,
    l.created_at,
    l.fulfilled_at is not null,
    null::text,
    'Paid — no matching account'
  from lifetime_purchases l
  where l.user_id is null

  order by 6 desc;
end;
$function$;

-- Public booking pages and marketing traffic hit this database as `anon`.
-- A buyer list must never be reachable from there.
revoke execute on function public.get_lifetime_buyers() from anon, public;
grant execute on function public.get_lifetime_buyers() to authenticated;

comment on function public.get_lifetime_buyers is
  'Admin-only. Merged lifetime cohort: lifetime_purchases (exact amount) unioned with hand-granted profiles (amount parsed from free_access_reason). amount_is_exact distinguishes the two.';
