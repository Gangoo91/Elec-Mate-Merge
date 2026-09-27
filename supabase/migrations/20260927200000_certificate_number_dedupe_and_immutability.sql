-- Certificate number duplicates — clean the unambiguous cases, freeze issued numbers (ELE-1592, 27 Sep 2026)
--
-- 107 live rows across 36 (user, certificate_number) groups shared a number.
-- They are NOT one problem:
--
--   A. same job (same address, same certificate type) saved as several rows —
--      26 groups / 54 extra rows once the printed-number mirror (step 0) has
--      surfaced the rows whose column disagreed with the PDF. Examples: a
--      January "generate PDF" loop that created a new row each time, an
--      autosave burst, a recovered draft re-saved. Duplicates of one
--      certificate. Soft-deleted here, keeping per group: a locked row, else
--      an issued one, else the most recently updated. No locked row is deleted.
--   B. 1 group: two unissued drafts, different addresses. The later one is
--      given the next number from the business's own counter — same logic as
--      next_certificate_number(), inlined because that RPC needs auth.uid().
--   C. 11 groups: DIFFERENT certificates, already issued, sharing a printed
--      number. Deleting one destroys a customer's certificate; renumbering one
--      changes a number a client already holds on paper. Deliberately NOT
--      touched here — decision needed per group.
--
-- The partial unique index is therefore NOT created in this migration: it
-- cannot build while C exists, and until reportCloud stops adopting a row by
-- certificate number on 23505 (fixed in the same change set) the index would
-- turn a duplicate into an OVERWRITE of the earlier certificate.
--
-- What IS enforced now: an ISSUED certificate's number cannot change. Drafts
-- stay renumberable (that is how B is fixed, and how the client recovers from
-- a copied number), so this is deliberately narrower than the never-applied
-- 2025 migration's "cannot be modified after creation".

-- ── 0. The column is a MIRROR of the printed number — bring 241 rows (159 of them issued) into line ──
-- The PDF prints data->>'certificateNumber'; reports.certificate_number is what
-- the list, search and the numbering counter read. Every autosave mirrors
-- JSON → column, but 241 rows (159 of them issued) had not been saved since that
-- mirroring began and still carried a stale column. Aligned here so the trigger below
-- can treat "column catches up with the printed number" as a mirror, not a
-- change. set_reports_updated_at is disabled for it: updated_at feeds the
-- app's local-draft-vs-cloud comparison and must not move on a no-op mirror.
alter table public.reports disable trigger set_reports_updated_at;
update public.reports
   set certificate_number = trim(data->>'certificateNumber')
 where deleted_at is null
   and coalesce(trim(data->>'certificateNumber'), '') <> ''
   and trim(data->>'certificateNumber') is distinct from certificate_number;
alter table public.reports enable trigger set_reports_updated_at;

-- ── 1. Freeze the PRINTED number once the certificate is issued or locked ──
-- Two rules, both only for issued/locked rows:
--   (a) the printed number (data->>'certificateNumber') must not change once set;
--   (b) the column may only move TOWARDS the printed number (the autosave mirror),
--       never away from it.
-- Drafts stay renumberable: that is how bucket B is fixed below, and how the
-- client recovers from a copied number (reportCloud renumbers on 23505).
create or replace function public.prevent_certificate_number_update()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_issued boolean := old.pdf_url is not null or old.locked_at is not null;
  v_old_printed text := nullif(trim(old.data->>'certificateNumber'), '');
  v_new_printed text := nullif(trim(new.data->>'certificateNumber'), '');
begin
  if not v_issued then
    return new;
  end if;

  if v_old_printed is not null and v_new_printed is distinct from v_old_printed then
    raise exception 'The certificate number printed on an issued certificate cannot be changed (was %, attempted %)',
      v_old_printed, coalesce(v_new_printed, '(blank)')
      using errcode = 'P0001';
  end if;

  if new.certificate_number is distinct from old.certificate_number
     and new.certificate_number is distinct from coalesce(v_new_printed, v_old_printed) then
    raise exception 'certificate_number on an issued certificate may only mirror the printed number % (attempted %)',
      coalesce(v_new_printed, v_old_printed, '(none)'), coalesce(new.certificate_number, '(blank)')
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_cert_number_update on public.reports;
create trigger prevent_cert_number_update
  before update on public.reports
  for each row execute function public.prevent_certificate_number_update();

-- ── 2. Bucket A: soft-delete the extra rows of same-address duplicate groups ──
with g as (
  select user_id, certificate_number
  from public.reports
  where deleted_at is null and coalesce(certificate_number, '') <> ''
  group by 1, 2 having count(*) > 1
), r as (
  select r.id, r.user_id, r.certificate_number, r.report_type,
         r.pdf_url is not null as issued, r.locked_at is not null as locked, r.updated_at,
         length(r.data::text) as bytes,
         lower(regexp_replace(coalesce(r.installation_address, r.data->>'installationAddress', r.data->>'propertyAddress', ''), '[^a-z0-9]', '', 'gi')) as addr_norm
  from public.reports r join g using (user_id, certificate_number)
  where r.deleted_at is null
), grp as (
  -- One job = one address AND one certificate type. An EICR and an EIC at the
  -- same address sharing a number are two different documents, not a duplicate.
  select user_id, certificate_number, count(distinct addr_norm) as addrs, count(distinct report_type) as types from r group by 1, 2
), ranked as (
  select r.id, r.locked,
         row_number() over (partition by r.user_id, r.certificate_number
                            order by r.locked desc, r.issued desc, r.updated_at desc, r.bytes desc) as rn
  from r join grp using (user_id, certificate_number)
  where grp.addrs = 1 and grp.types = 1
)
update public.reports p
set deleted_at = now()
from ranked
where p.id = ranked.id and ranked.rn > 1 and not ranked.locked;

-- ── 3. Bucket B: renumber the later of two unissued drafts that share a number ──
do $$
declare
  v_row record;
  v_scope uuid;
  v_year int := extract(year from current_date)::int;
  v_prefix text;
  v_next int;
  v_new text;
begin
  for v_row in
    with g as (
      select user_id, certificate_number
      from public.reports
      where deleted_at is null and coalesce(certificate_number, '') <> ''
      group by 1, 2 having count(*) > 1
    ), r as (
      select r.id, r.user_id, r.certificate_number, r.created_at,
             r.pdf_url is not null as issued, r.locked_at is not null as locked,
             lower(regexp_replace(coalesce(r.installation_address, r.data->>'installationAddress', r.data->>'propertyAddress', ''), '[^a-z0-9]', '', 'gi')) as addr_norm
      from public.reports r join g using (user_id, certificate_number)
      where r.deleted_at is null
    ), grp as (
      select user_id, certificate_number, count(distinct addr_norm) as addrs, bool_or(issued or locked) as any_issued
      from r group by 1, 2
    )
    select r.id, r.user_id, r.certificate_number,
           row_number() over (partition by r.user_id, r.certificate_number order by r.created_at) as rn
    from r join grp using (user_id, certificate_number)
    where (grp.addrs > 1) and not grp.any_issued
  loop
    if v_row.rn = 1 then continue; end if;  -- the first keeps its number

    v_prefix := regexp_replace(v_row.certificate_number, '-[0-9]{4}-.*$', '');
    select ee.employer_id into v_scope from public.employer_employees ee
      where ee.user_id = v_row.user_id and ee.employer_id is not null order by ee.employer_id limit 1;
    v_scope := coalesce(v_scope, v_row.user_id);

    -- Same allocation as next_certificate_number(): bump the firm's counter, or seed it.
    update public.certificate_number_counters
       set next_value = next_value + 1, updated_at = now()
     where scope_id = v_scope and prefix = v_prefix and year = v_year
     returning next_value into v_next;
    if v_next is null then
      select coalesce(max(nullif(regexp_replace(x.certificate_number, '^.*-([^-]+)$', '\1'), '')::int), 0) + 1
        into v_next
        from public.reports x
       where x.deleted_at is null
         and (x.user_id = v_scope or x.user_id in (select ee.user_id from public.employer_employees ee where ee.employer_id = v_scope and ee.user_id is not null))
         and x.certificate_number like v_prefix || '-' || v_year::text || '-%'
         and regexp_replace(x.certificate_number, '^.*-([^-]+)$', '\1') ~ '^[0-9]+$';
      insert into public.certificate_number_counters (scope_id, prefix, year, next_value)
      values (v_scope, v_prefix, v_year, v_next)
      on conflict (scope_id, prefix, year) do update
        set next_value = certificate_number_counters.next_value + 1, updated_at = now()
      returning next_value into v_next;
    end if;

    v_new := v_prefix || '-' || v_year::text || '-' || lpad(v_next::text, 4, '0');
    update public.reports
       set certificate_number = v_new,
           data = jsonb_set(data, '{certificateNumber}', to_jsonb(v_new), true)
     where id = v_row.id;
    raise notice 'renumbered % (%) -> %', v_row.id, v_row.certificate_number, v_new;
  end loop;
end $$;
