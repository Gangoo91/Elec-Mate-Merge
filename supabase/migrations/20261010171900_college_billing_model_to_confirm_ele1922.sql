-- ELE-1922 follow-up, same day (10 Oct 2026). The commercial model is NOT
-- decided: the apprenticeship funding rules for 2026/27 may stop a provider
-- asking an apprentice to contribute to eligible costs, and software licences
-- used to deliver the programme are eligible costs. So no college record may
-- default to "learner pays". The default is now 'to_confirm' (Andrew to
-- confirm the model); 'college_funded' = the college pays per counted learner
-- per year. learner_price_pence stays as a column but is not used for
-- delivery; learner-paid access can only ever be optional personal revision.
--
-- Tables were created earlier today and hold no rows. Additive in effect: the
-- check constraint on this new table is replaced to remove 'learner_pays'.

alter table public.college_billing_accounts alter column pricing_model set default 'to_confirm';

do $$
declare
  v_name text;
begin
  select conname into v_name
    from pg_constraint
   where conrelid = 'public.college_billing_accounts'::regclass
     and contype = 'c'
     and pg_get_constraintdef(oid) ilike '%pricing_model%';
  if v_name is not null then
    execute format('alter table public.college_billing_accounts drop constraint %I', v_name);
  end if;
end $$;

update public.college_billing_accounts set pricing_model = 'to_confirm' where pricing_model = 'learner_pays';

alter table public.college_billing_accounts
  add constraint college_billing_accounts_pricing_model_chk
  check (pricing_model in ('to_confirm', 'college_funded'));

comment on table public.college_billing_accounts is
  '[COLLEGE ↔ BILLING] ELE-1922. One row per college: the pricing model (to_confirm = Andrew has not confirmed the commercial model yet, the default; college_funded = the college pays per learner counted at the start of the academic year), prices in pence (NULL until Andrew sets them: the app then says "on your order form", Admin shows PRICE PLACEHOLDER), academic year start month, renewal date, PO, billing contact and payment terms. learner_price_pence is not used: nothing a college uses to deliver the programme is ever charged to the apprentice. Scope: per college. Used by: /college/billing (get_college_billing), Admin → Colleges → Hub colleges → Billing (admin_college_billing_overview, admin_save_college_billing). Rule: written only by platform admins; no Stripe object.';

comment on column public.college_billing_accounts.learner_price_pence is
  '[COLLEGE ↔ BILLING] Not used for delivery. Kept only in case Andrew offers optional personal revision access outside the programme; never shown as a cost of the college''s programme.';

comment on column public.college_cohorts.billing_linked is
  '[COLLEGE ↔ BILLING] ELE-1922. True when the cohort is covered by the college''s agreement with Elec-Mate: its learners are counted once at the start of the academic year. Set by a platform admin (admin_set_cohort_billing_linked). Default true.';

-- get_college_billing / admin overview: default model is 'to_confirm'.
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
    'pricing_model', coalesce(v_acc.pricing_model, 'to_confirm'),
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
                            from college_billing_invoices i where i.college_id = v_college
                             and i.status in ('sent', 'paid')), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_college_billing(uuid) from public, anon;
grant execute on function public.get_college_billing(uuid) to authenticated;

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
        'pricing_model', coalesce(a.pricing_model, 'to_confirm'),
        'college_price_pence', a.college_price_pence,
        'setup_fee_pence', a.setup_fee_pence, 'renewal_date', a.renewal_date, 'po_number', a.po_number,
        'billing_contact_name', a.billing_contact_name, 'billing_contact_email', a.billing_contact_email,
        'payment_terms_days', coalesce(a.payment_terms_days, 30), 'invoice_split', coalesce(a.invoice_split, 'annual'),
        'academic_year_start_month', coalesce(a.academic_year_start_month, 9), 'notes', a.notes,
        'academic_year', public._academic_year_label(v_today, coalesce(a.academic_year_start_month, 9)),
        'live', public._college_linked_learner_count(c.id),
        'cohorts', coalesce((select jsonb_agg(jsonb_build_object('id', co.id, 'name', co.name, 'billing_linked', co.billing_linked)
                               order by co.name) from college_cohorts co where co.college_id = c.id
                               and lower(coalesce(co.status, 'active')) not in ('archived', 'completed', 'cancelled')), '[]'::jsonb),
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
