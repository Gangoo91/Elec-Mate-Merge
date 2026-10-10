-- ELE-1922: college billing and learners (P-ELE-13).
--
-- ⚠️ Superseded the same day by 20261010171900: the 'learner_pays' model is
-- removed and the default is 'to_confirm' (the funding rules may stop a
-- provider charging an apprentice for anything used to deliver the programme).
--
-- The commercial model, encoded:
--   * Pricing model: to be confirmed by Andrew; 'college_funded' = the college
--     pays per counted learner per year, invoiced by Elec-Mate.
--   * Learners are COUNTED ONCE A YEAR, at the start of the academic year: every
--     learner on a linked cohort on that day. Not per term, not re-counted at
--     each intake. A learner who leaves later costs the college nothing and
--     there is no seat to archive: the count is a snapshot, not a seat list.
--   * Linked cohorts: the cohorts covered by the college's agreement
--     (college_cohorts.billing_linked, on by default). Learners on a linked
--     cohort get the college's linked price.
--   * Invoices are raised through Elec-Mate's own invoicing (public.invoices,
--     from Elec-Mate's account) to the college's PO, BACS on 30-day terms. The
--     college sees its learner count, invoices and renewal date in Settings.
--   * Prices are NULL until Andrew sets them (the app shows "on your order
--     form"; Admin shows PRICE PLACEHOLDER). No Stripe object is made here.
--   * VAT watch: Admin shows college invoicing over the last 12 months against
--     the VAT registration threshold.
--
-- Additive only.

-- ─── linked cohorts ──────────────────────────────────────────────────────

alter table public.college_cohorts
  add column if not exists billing_linked boolean not null default true;
comment on column public.college_cohorts.billing_linked is
  '[COLLEGE ↔ BILLING] ELE-1922. True when the cohort is covered by the college''s agreement with Elec-Mate: its learners get the linked price and are counted at the start of the academic year. Set by a platform admin (admin_set_cohort_billing_linked). Default true.';

-- ─── accounts ────────────────────────────────────────────────────────────

create table if not exists public.college_billing_accounts (
  college_id                 uuid primary key references public.colleges(id) on delete cascade,
  pricing_model              text not null default 'learner_pays'
                               check (pricing_model in ('learner_pays', 'college_funded')),
  learner_price_pence        integer check (learner_price_pence is null or learner_price_pence >= 0),
  college_price_pence        integer check (college_price_pence is null or college_price_pence >= 0),
  setup_fee_pence            integer check (setup_fee_pence is null or setup_fee_pence >= 0),
  academic_year_start_month  smallint not null default 9 check (academic_year_start_month between 1 and 12),
  renewal_date               date,
  po_number                  text,
  billing_contact_name       text,
  billing_contact_email      text,
  payment_terms_days         integer not null default 30 check (payment_terms_days between 0 and 120),
  invoice_split              text not null default 'annual' check (invoice_split in ('annual', 'two_instalments')),
  notes                      text,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),
  updated_by                 uuid
);
comment on table public.college_billing_accounts is
  '[COLLEGE ↔ BILLING] ELE-1922. One row per college: the pricing model (learner_pays = learners pay, the college pays nothing; college_funded = the college pays per counted learner), prices in pence (NULL until Andrew sets them: the app then says "on your order form"), academic year start month, renewal date, PO, billing contact and payment terms. Scope: per college. Used by: /college/billing (read through get_college_billing), Admin → Colleges → Hub colleges → Billing (admin_college_billing_overview, admin_save_college_billing). Rule: written only by platform admins; college staff never write it; no Stripe object.';

create table if not exists public.college_learner_counts (
  id                 uuid primary key default gen_random_uuid(),
  college_id         uuid not null references public.colleges(id) on delete cascade,
  academic_year      text not null check (academic_year ~ '^[0-9]{4}/[0-9]{2}$'),
  counted_on         date not null,
  learner_count      integer not null check (learner_count >= 0),
  computed_count     integer not null,
  linked_cohort_ids  uuid[] not null default '{}',
  counted_by         uuid,
  note               text,
  corrections        jsonb not null default '[]'::jsonb,
  created_at         timestamptz not null default now(),
  unique (college_id, academic_year)
);
comment on table public.college_learner_counts is
  '[COLLEGE ↔ BILLING] ELE-1922. The once-a-year learner count: every learner on a linked cohort at the start of the academic year, taken once per college per academic year (unique). computed_count is what the roll said; learner_count is the agreed figure (equal unless a platform admin corrected it, each correction kept in corrections with who, when and why). A learner leaving later changes nothing: there are no seats. Used by: /college/billing, Admin billing, invoices. Rule: written only by admin_record_learner_count (platform admin); never deleted.';

create table if not exists public.college_billing_invoices (
  id                uuid primary key default gen_random_uuid(),
  college_id        uuid not null references public.colleges(id) on delete cascade,
  academic_year     text not null check (academic_year ~ '^[0-9]{4}/[0-9]{2}$'),
  learner_count_id  uuid references public.college_learner_counts(id) on delete set null,
  description       text not null,
  amount_pence      integer not null check (amount_pence >= 0),
  vat_pence         integer not null default 0 check (vat_pence >= 0),
  invoice_id        uuid references public.invoices(id) on delete set null,
  invoice_number    text,
  po_number         text,
  status            text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'void')),
  issued_on         date,
  due_on            date,
  paid_on           date,
  created_by        uuid,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists college_billing_invoices_college_idx on public.college_billing_invoices (college_id, created_at desc);
comment on table public.college_billing_invoices is
  '[COLLEGE ↔ BILLING] ELE-1922. Invoices Elec-Mate raised to a college (set-up, a year''s licence, an instalment). The invoice itself is made in Elec-Mate''s own invoicing (public.invoices, from Elec-Mate''s account; invoice_id / invoice_number link it) to the college''s PO, BACS on the account''s payment terms. Scope: per college. Used by: /college/billing (list), Admin billing (VAT watch sums sent and paid invoices over 12 months). Rule: written only by platform admins (admin_record_college_invoice, admin_set_college_invoice_status); no card payments, no Stripe.';

alter table public.college_billing_accounts enable row level security;
alter table public.college_learner_counts enable row level security;
alter table public.college_billing_invoices enable row level security;
revoke all on public.college_billing_accounts from anon;
revoke all on public.college_learner_counts from anon;
revoke all on public.college_billing_invoices from anon;

drop policy if exists "college billing: platform admin reads" on public.college_billing_accounts;
create policy "college billing: platform admin reads" on public.college_billing_accounts
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "college counts: platform admin reads" on public.college_learner_counts;
create policy "college counts: platform admin reads" on public.college_learner_counts
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "college invoices: platform admin reads" on public.college_billing_invoices;
create policy "college invoices: platform admin reads" on public.college_billing_invoices
  for select to authenticated using (public._is_platform_admin());

-- ─── helpers ─────────────────────────────────────────────────────────────

-- '2026/27' for a date in the academic year starting in p_start_month.
create or replace function public._academic_year_label(p_on date, p_start_month int default 9)
returns text
language sql
immutable
as $$
  select case when extract(month from p_on)::int >= p_start_month
              then extract(year from p_on)::int
              else extract(year from p_on)::int - 1 end::text
         || '/' ||
         lpad(((case when extract(month from p_on)::int >= p_start_month
                     then extract(year from p_on)::int
                     else extract(year from p_on)::int - 1 end + 1) % 100)::text, 2, '0');
$$;

-- Learners the count would take today: active roll rows on linked cohorts,
-- fixture and demo-visitor accounts left out.
create or replace function public._college_linked_learner_count(p_college uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'linked', (select count(*) from college_students s
                 join college_cohorts co on co.id = s.cohort_id and co.billing_linked
                where s.college_id = p_college
                  and lower(coalesce(s.status, 'active')) = 'active'
                  and lower(coalesce(s.email, '')) not like 'founder+collegedemo-%'),
    'no_cohort', (select count(*) from college_students s
                   where s.college_id = p_college and s.cohort_id is null
                     and lower(coalesce(s.status, 'active')) = 'active'
                     and lower(coalesce(s.email, '')) not like 'founder+collegedemo-%'),
    'linked_cohort_ids', coalesce((select array_agg(co.id order by co.name) from college_cohorts co
                                    where co.college_id = p_college and co.billing_linked
                                      and lower(coalesce(co.status, 'active')) not in ('archived', 'completed', 'cancelled')), '{}')
  );
$$;
revoke all on function public._college_linked_learner_count(uuid) from public, anon, authenticated;

-- ─── college side ────────────────────────────────────────────────────────

-- Settings → Learners and billing. Admins and heads of department of the
-- college (and platform admins) see everything; other staff get null.
create or replace function public.get_college_billing(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_college uuid := coalesce(p_college,
    (select college_id from college_staff where user_id = auth.uid() and archived_at is null order by created_at limit 1));
  v_acc     record;
  v_month   int;
  v_year    text;
  v_today   date := (now() at time zone 'Europe/London')::date;
  v_live    jsonb;
begin
  if v_college is null then
    return null;
  end if;
  if not (
    public._is_platform_admin()
    or exists (select 1 from college_staff where college_id = v_college and user_id = auth.uid()
                and archived_at is null and role in ('admin', 'head_of_department'))
  ) then
    return null;
  end if;

  select * into v_acc from college_billing_accounts where college_id = v_college;
  v_month := coalesce(v_acc.academic_year_start_month, 9);
  v_year := public._academic_year_label(v_today, v_month);
  v_live := public._college_linked_learner_count(v_college);

  return jsonb_build_object(
    'college_id', v_college,
    'college_name', (select name from colleges where id = v_college),
    'provider_type', (select provider_type from colleges where id = v_college),
    'has_account', v_acc.college_id is not null,
    'pricing_model', coalesce(v_acc.pricing_model, 'learner_pays'),
    'learner_price_pence', v_acc.learner_price_pence,
    'college_price_pence', v_acc.college_price_pence,
    'setup_fee_pence', v_acc.setup_fee_pence,
    'academic_year', v_year,
    'academic_year_start_month', v_month,
    'renewal_date', v_acc.renewal_date,
    'po_number', v_acc.po_number,
    'billing_contact_name', v_acc.billing_contact_name,
    'billing_contact_email', v_acc.billing_contact_email,
    'payment_terms_days', coalesce(v_acc.payment_terms_days, 30),
    'invoice_split', coalesce(v_acc.invoice_split, 'annual'),
    'live', v_live,
    'count', (select jsonb_build_object('academic_year', c.academic_year, 'counted_on', c.counted_on,
                                        'learner_count', c.learner_count, 'corrected', jsonb_array_length(c.corrections) > 0)
                from college_learner_counts c where c.college_id = v_college and c.academic_year = v_year),
    'previous_counts', coalesce((select jsonb_agg(jsonb_build_object('academic_year', c.academic_year, 'counted_on', c.counted_on,
                                                                     'learner_count', c.learner_count) order by c.academic_year desc)
                                   from college_learner_counts c where c.college_id = v_college and c.academic_year <> v_year), '[]'::jsonb),
    'cohorts', coalesce((select jsonb_agg(jsonb_build_object(
                           'id', co.id, 'name', co.name, 'billing_linked', co.billing_linked,
                           'learners', (select count(*) from college_students s where s.cohort_id = co.id
                                         and lower(coalesce(s.status, 'active')) = 'active'
                                         and lower(coalesce(s.email, '')) not like 'founder+collegedemo-%'))
                           order by co.name)
                           from college_cohorts co where co.college_id = v_college
                            and lower(coalesce(co.status, 'active')) not in ('archived', 'completed', 'cancelled')), '[]'::jsonb),
    'invoices', coalesce((select jsonb_agg(jsonb_build_object(
                            'id', i.id, 'academic_year', i.academic_year, 'description', i.description,
                            'amount_pence', i.amount_pence, 'vat_pence', i.vat_pence, 'invoice_number', i.invoice_number,
                            'po_number', i.po_number, 'status', i.status, 'issued_on', i.issued_on, 'due_on', i.due_on,
                            'paid_on', i.paid_on) order by coalesce(i.issued_on, i.created_at::date) desc)
                            from college_billing_invoices i where i.college_id = v_college and i.status <> 'void'
                             and i.status <> 'draft'), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_college_billing(uuid) from public, anon;
grant execute on function public.get_college_billing(uuid) to authenticated;

-- ─── platform admin ──────────────────────────────────────────────────────

create or replace function public.admin_college_billing_overview()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'vat_threshold_pence', 9000000,
    'invoiced_12m_pence', coalesce((select sum(amount_pence) from college_billing_invoices
                                     where status in ('sent', 'paid') and coalesce(issued_on, created_at::date) > v_today - 365), 0),
    'colleges', coalesce((select jsonb_agg(x order by x->>'name') from (
      select jsonb_build_object(
        'id', c.id, 'name', c.name, 'code', c.code, 'is_demo', c.is_demo, 'provider_type', c.provider_type,
        'pricing_model', coalesce(a.pricing_model, 'learner_pays'),
        'learner_price_pence', a.learner_price_pence, 'college_price_pence', a.college_price_pence,
        'setup_fee_pence', a.setup_fee_pence, 'renewal_date', a.renewal_date, 'po_number', a.po_number,
        'billing_contact_name', a.billing_contact_name, 'billing_contact_email', a.billing_contact_email,
        'payment_terms_days', coalesce(a.payment_terms_days, 30), 'invoice_split', coalesce(a.invoice_split, 'annual'),
        'academic_year_start_month', coalesce(a.academic_year_start_month, 9), 'notes', a.notes,
        'academic_year', public._academic_year_label(v_today, coalesce(a.academic_year_start_month, 9)),
        'live', public._college_linked_learner_count(c.id),
        'count', (select jsonb_build_object('id', lc.id, 'learner_count', lc.learner_count, 'computed_count', lc.computed_count,
                                            'counted_on', lc.counted_on, 'corrections', lc.corrections)
                    from college_learner_counts lc where lc.college_id = c.id
                     and lc.academic_year = public._academic_year_label(v_today, coalesce(a.academic_year_start_month, 9))),
        'invoices', coalesce((select jsonb_agg(jsonb_build_object('id', i.id, 'academic_year', i.academic_year,
                                'description', i.description, 'amount_pence', i.amount_pence, 'vat_pence', i.vat_pence,
                                'invoice_number', i.invoice_number, 'status', i.status, 'issued_on', i.issued_on,
                                'due_on', i.due_on, 'paid_on', i.paid_on) order by i.created_at desc)
                                from college_billing_invoices i where i.college_id = c.id), '[]'::jsonb)
      ) x
      from colleges c
      left join college_billing_accounts a on a.college_id = c.id
      where c.is_active
    ) t), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.admin_college_billing_overview() from public, anon;
grant execute on function public.admin_college_billing_overview() to authenticated;

create or replace function public.admin_save_college_billing(p_college uuid, p_patch jsonb)
returns void
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  insert into college_billing_accounts (college_id, updated_by) values (p_college, auth.uid())
  on conflict (college_id) do nothing;
  update college_billing_accounts set
    pricing_model = coalesce(p_patch->>'pricing_model', pricing_model),
    learner_price_pence = case when p_patch ? 'learner_price_pence' then (p_patch->>'learner_price_pence')::int else learner_price_pence end,
    college_price_pence = case when p_patch ? 'college_price_pence' then (p_patch->>'college_price_pence')::int else college_price_pence end,
    setup_fee_pence = case when p_patch ? 'setup_fee_pence' then (p_patch->>'setup_fee_pence')::int else setup_fee_pence end,
    academic_year_start_month = coalesce((p_patch->>'academic_year_start_month')::smallint, academic_year_start_month),
    renewal_date = case when p_patch ? 'renewal_date' then nullif(p_patch->>'renewal_date', '')::date else renewal_date end,
    po_number = case when p_patch ? 'po_number' then nullif(btrim(p_patch->>'po_number'), '') else po_number end,
    billing_contact_name = case when p_patch ? 'billing_contact_name' then nullif(btrim(p_patch->>'billing_contact_name'), '') else billing_contact_name end,
    billing_contact_email = case when p_patch ? 'billing_contact_email' then nullif(btrim(p_patch->>'billing_contact_email'), '') else billing_contact_email end,
    payment_terms_days = coalesce((p_patch->>'payment_terms_days')::int, payment_terms_days),
    invoice_split = coalesce(p_patch->>'invoice_split', invoice_split),
    notes = case when p_patch ? 'notes' then nullif(btrim(p_patch->>'notes'), '') else notes end,
    updated_at = now(),
    updated_by = auth.uid()
  where college_id = p_college;
end;
$$;
revoke all on function public.admin_save_college_billing(uuid, jsonb) from public, anon;
grant execute on function public.admin_save_college_billing(uuid, jsonb) to authenticated;

create or replace function public.admin_set_cohort_billing_linked(p_cohort uuid, p_linked boolean)
returns void
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  update college_cohorts set billing_linked = p_linked where id = p_cohort;
end;
$$;
revoke all on function public.admin_set_cohort_billing_linked(uuid, boolean) from public, anon;
grant execute on function public.admin_set_cohort_billing_linked(uuid, boolean) to authenticated;

-- Take this academic year's count (once). Calling again for the same year is
-- a correction: it needs a note and keeps the previous figure.
create or replace function public.admin_record_learner_count(
  p_college uuid, p_count integer default null, p_note text default null)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_month int := coalesce((select academic_year_start_month from college_billing_accounts where college_id = p_college), 9);
  v_today date := (now() at time zone 'Europe/London')::date;
  v_year  text := public._academic_year_label(v_today, v_month);
  v_live  jsonb := public._college_linked_learner_count(p_college);
  v_comp  int := (v_live->>'linked')::int;
  v_row   record;
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  if p_count is not null and p_count < 0 then
    raise exception 'A count cannot be negative';
  end if;
  select * into v_row from college_learner_counts where college_id = p_college and academic_year = v_year for update;
  if not found then
    insert into college_learner_counts (college_id, academic_year, counted_on, learner_count, computed_count,
                                        linked_cohort_ids, counted_by, note)
    values (p_college, v_year, v_today, coalesce(p_count, v_comp), v_comp,
            array(select jsonb_array_elements_text(v_live->'linked_cohort_ids'))::uuid[], auth.uid(),
            nullif(btrim(coalesce(p_note, '')), ''))
    returning * into v_row;
  else
    if nullif(btrim(coalesce(p_note, '')), '') is null then
      raise exception 'This year''s count was taken on %. Learners are counted once a year; a correction needs a note saying why.', to_char(v_row.counted_on, 'DD Mon YYYY');
    end if;
    update college_learner_counts set
      corrections = corrections || jsonb_build_array(jsonb_build_object(
        'at', now(), 'by', auth.uid(), 'from', v_row.learner_count, 'to', coalesce(p_count, v_comp), 'note', btrim(p_note))),
      learner_count = coalesce(p_count, v_comp)
    where id = v_row.id
    returning * into v_row;
  end if;
  return jsonb_build_object('id', v_row.id, 'academic_year', v_row.academic_year, 'learner_count', v_row.learner_count,
                            'computed_count', v_row.computed_count, 'counted_on', v_row.counted_on);
end;
$$;
revoke all on function public.admin_record_learner_count(uuid, integer, text) from public, anon;
grant execute on function public.admin_record_learner_count(uuid, integer, text) to authenticated;

create or replace function public.admin_record_college_invoice(p_college uuid, p_payload jsonb)
returns uuid
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_month int := coalesce((select academic_year_start_month from college_billing_accounts where college_id = p_college), 9);
  v_today date := (now() at time zone 'Europe/London')::date;
  v_terms int := coalesce((select payment_terms_days from college_billing_accounts where college_id = p_college), 30);
  v_id uuid;
  v_issued date := nullif(p_payload->>'issued_on', '')::date;
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  if coalesce(btrim(p_payload->>'description'), '') = '' then
    raise exception 'Say what the invoice is for';
  end if;
  insert into college_billing_invoices (college_id, academic_year, learner_count_id, description, amount_pence, vat_pence,
                                        invoice_id, invoice_number, po_number, status, issued_on, due_on, created_by)
  values (
    p_college,
    coalesce(nullif(p_payload->>'academic_year', ''), public._academic_year_label(v_today, v_month)),
    nullif(p_payload->>'learner_count_id', '')::uuid,
    btrim(p_payload->>'description'),
    coalesce((p_payload->>'amount_pence')::int, 0),
    coalesce((p_payload->>'vat_pence')::int, 0),
    nullif(p_payload->>'invoice_id', '')::uuid,
    nullif(btrim(p_payload->>'invoice_number'), ''),
    coalesce(nullif(btrim(p_payload->>'po_number'), ''), (select po_number from college_billing_accounts where college_id = p_college)),
    coalesce(nullif(p_payload->>'status', ''), case when v_issued is null then 'draft' else 'sent' end),
    v_issued,
    coalesce(nullif(p_payload->>'due_on', '')::date, v_issued + v_terms),
    auth.uid()
  ) returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.admin_record_college_invoice(uuid, jsonb) from public, anon;
grant execute on function public.admin_record_college_invoice(uuid, jsonb) to authenticated;

create or replace function public.admin_set_college_invoice_status(p_invoice uuid, p_status text, p_on date default null)
returns void
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  if p_status not in ('draft', 'sent', 'paid', 'void') then
    raise exception 'Unknown status %', p_status;
  end if;
  update college_billing_invoices set
    status = p_status,
    issued_on = case when p_status = 'sent' then coalesce(issued_on, p_on, v_today) else issued_on end,
    paid_on = case when p_status = 'paid' then coalesce(p_on, v_today) else paid_on end,
    updated_at = now()
  where id = p_invoice;
end;
$$;
revoke all on function public.admin_set_college_invoice_status(uuid, text, date) from public, anon;
grant execute on function public.admin_set_college_invoice_status(uuid, text, date) to authenticated;
