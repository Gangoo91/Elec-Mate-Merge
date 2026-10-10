-- ELE-2073 Quotes that win: options on one quote (chosen on the accept page),
-- job templates (the firm's own, plus starters priced from its price book with
-- labour from practical-work data), and win rate by job type, month and person.
-- The quote follow-up schedule lives with the invoice chasing schedule
-- (firm_chase_settings / run_firm_money_chase, migration 20261010185000).
--
-- Additive only. Options live in quotes.settings.options; a quote without
-- them behaves exactly as before, on HEAD and on this build.

-- ── Options: the customer picks one on the public page ───────────────────
-- settings.options = [{ id, label, description, items, subtotal, vat_amount,
-- total }]. The quote row always carries ONE option's lines and totals (the
-- first, until the customer picks), so the PDF, lists, deposit and HEAD's
-- accept page all keep working. Choosing copies that option onto the row; the
-- deposit (accept-quote-public) is then worked out on the chosen total.
create or replace function public.choose_quote_option_by_token(token_param text, option_id text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  q public.quotes;
  v_opt jsonb;
begin
  if coalesce(btrim(token_param), '') = '' or coalesce(btrim(option_id), '') = '' then
    raise exception 'Choose an option';
  end if;
  select * into q from public.quotes
   where public_token::text = public.resolve_quote_public_token(token_param) and deleted_at is null
   for update;
  if q.id is null then raise exception 'Quote not found'; end if;
  if coalesce(q.acceptance_status, 'pending') <> 'pending' then
    raise exception 'This quote has already been answered';
  end if;
  if q.expiry_date < now() then raise exception 'This quote has expired'; end if;
  if jsonb_typeof(q.settings->'options') <> 'array' or jsonb_array_length(q.settings->'options') < 2 then
    raise exception 'This quote has no options';
  end if;
  select o into v_opt from jsonb_array_elements(q.settings->'options') o where o->>'id' = option_id limit 1;
  if v_opt is null then raise exception 'That option is not on this quote'; end if;
  if jsonb_typeof(v_opt->'items') <> 'array'
     or coalesce(v_opt->>'total', '') !~ '^-?[0-9]+(\.[0-9]+)?$' then
    raise exception 'That option is incomplete';
  end if;
  if q.settings->>'chosenOptionId' = option_id then
    return jsonb_build_object('ok', true, 'option_id', option_id, 'total', q.total);
  end if;

  update public.quotes set
    items = v_opt->'items',
    subtotal = coalesce(nullif(v_opt->>'subtotal', '')::numeric, q.subtotal),
    vat_amount = coalesce(nullif(v_opt->>'vat_amount', '')::numeric, q.vat_amount),
    total = (v_opt->>'total')::numeric,
    settings = q.settings || jsonb_build_object('chosenOptionId', option_id, 'chosenOptionAt', now()),
    -- The stored PDF shows the first option; it is rebuilt on the next send.
    pdf_url = null
  where id = q.id;
  return jsonb_build_object('ok', true, 'option_id', option_id, 'total', (v_opt->>'total')::numeric);
end;
$$;
revoke all on function public.choose_quote_option_by_token(text, text) from public;
grant execute on function public.choose_quote_option_by_token(text, text) to anon, authenticated;

-- ── Job templates ─────────────────────────────────────────────────────────
create table if not exists public.firm_quote_templates (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  name text not null check (length(btrim(name)) between 1 and 120),
  job_type text,
  description text,
  labour jsonb not null default '[]'::jsonb,
  lines jsonb not null default '[]'::jsonb,
  created_by uuid,
  created_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists firm_quote_templates_employer_idx on public.firm_quote_templates (employer_id, name);
alter table public.firm_quote_templates enable row level security;
drop policy if exists "Firm quoting roles read quote templates" on public.firm_quote_templates;
create policy "Firm quoting roles read quote templates" on public.firm_quote_templates
  for select to authenticated using (public.my_employer_role(employer_id) in ('owner', 'admin', 'office'));
comment on table public.firm_quote_templates is '[EMPLOYER HUB — MONEY] Quote job templates a firm saved (ELE-2073): labour and material lines to start a quote from. Scope: firm. Used by: New quote, a job''s quote, a converted lead. Rule: written only by save_firm_quote_template / delete_firm_quote_template (owner, admin, office).';

-- Typical task times from practical_work_intelligence, worked out once here
-- (a regex over ~200k rows is too slow to run per quote). Starter templates
-- multiply these by quantities; a firm's own approved timesheets beat them.
create table if not exists public.quote_template_task_minutes (
  task_key text primary key,
  label text not null,
  median_minutes numeric not null,
  sample_size int not null,
  computed_at timestamptz not null default now()
);
alter table public.quote_template_task_minutes enable row level security;
drop policy if exists "Signed-in users read task minutes" on public.quote_template_task_minutes;
create policy "Signed-in users read task minutes" on public.quote_template_task_minutes
  for select to authenticated using (true);
comment on table public.quote_template_task_minutes is '[SHARED] Typical task times for starter quote templates (ELE-2073), the median typical_duration_minutes of matching practical_work_intelligence records. Scope: platform reference. Used by: Employer Hub quote templates. Rule: written only by refresh_quote_template_task_minutes.';

create or replace function public.refresh_quote_template_task_minutes()
returns int language plpgsql security definer set search_path to 'public' as $$
declare v_n int;
begin
  with k(task_key, label, pat) as (values
    ('cu_replace', 'Consumer unit change', 'consumer unit (replacement|change|upgrade)|replac\w* (a |the )?consumer unit'),
    ('ev_install', 'EV charger install', '(ev|electric vehicle) charg\w* (point )?install|install\w* (an? )?(ev|electric vehicle) charg'),
    ('socket_add', 'Add a socket', '(install|add|fit)\w* (an? )?(additional |new )?(double |twin )?socket'),
    ('light_point', 'Lighting point', '(install|fit)\w* (a |new )?(light(ing)? point|ceiling rose|pendant|downlight)'),
    ('smoke', 'Smoke or heat alarm', 'smoke alarm|fire alarm.*domestic'),
    ('shower', 'Electric shower', '(install|fit)\w* (an? )?(electric )?shower'),
    ('outdoor', 'Outdoor socket or lighting', 'outdoor socket|garden (lighting|socket)'),
    ('testing', 'Testing and certificate', 'initial verification'),
    ('eicr', 'Periodic inspection', 'periodic inspection'))
  insert into public.quote_template_task_minutes (task_key, label, median_minutes, sample_size, computed_at)
  select k.task_key, k.label,
         percentile_cont(0.5) within group (order by p.typical_duration_minutes), count(*), now()
    from k join public.practical_work_intelligence p
      on p.primary_topic ~* k.pat and p.typical_duration_minutes > 0
   group by k.task_key, k.label
  on conflict (task_key) do update set label = excluded.label, median_minutes = excluded.median_minutes,
    sample_size = excluded.sample_size, computed_at = now();
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;
revoke all on function public.refresh_quote_template_task_minutes() from public, anon, authenticated;
select public.refresh_quote_template_task_minutes();

create or replace function public._quote_firm_for_quoting()
returns uuid language plpgsql stable security definer set search_path to 'public' as $$
declare v_firm uuid := public.my_default_employer_id();
begin
  if auth.uid() is null or v_firm is null
     or coalesce(public.my_employer_role(v_firm), '') not in ('owner', 'admin', 'office') then
    raise exception 'Only the owner and office managers can use quote templates' using errcode = '42501';
  end if;
  return v_firm;
end;
$$;
revoke all on function public._quote_firm_for_quoting() from public, anon;

create or replace function public.get_firm_quote_templates()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_firm uuid := public._quote_firm_for_quoting();
begin
  return jsonb_build_object(
    'firm_id', v_firm,
    'own', coalesce((select jsonb_agg(to_jsonb(t) order by lower(t.name))
                       from public.firm_quote_templates t where t.employer_id = v_firm), '[]'::jsonb),
    'task_minutes', coalesce((select jsonb_object_agg(m.task_key, jsonb_build_object(
                         'label', m.label, 'minutes', m.median_minutes, 'sample', m.sample_size))
                       from public.quote_template_task_minutes m), '{}'::jsonb),
    -- The firm's own record: average approved hours on its last five
    -- completed jobs of each type.
    'history', coalesce((select jsonb_object_agg(x.jt, jsonb_build_object('avg_hours', x.avg_hours, 'jobs', x.n))
                  from (select lower(btrim(j.job_type)) as jt, round(avg(h.hours), 1) as avg_hours, count(*) as n
                          from public.employer_jobs j
                          cross join lateral (select sum(greatest(coalesce(t.total_hours, 0), 0)) as hours
                                                from public.employer_timesheets t
                                               where t.job_id = j.id and lower(coalesce(t.status, '')) = 'approved') h
                         where j.user_id = v_firm and nullif(btrim(coalesce(j.job_type, '')), '') is not null
                           and not coalesce(j.is_template, false)
                           and (j.completed_at is not null or lower(coalesce(j.status, '')) = 'completed')
                           and coalesce(h.hours, 0) > 0
                         group by lower(btrim(j.job_type))) x), '{}'::jsonb),
    'hourly_rate', (select cp.hourly_rate from public.company_profiles cp where cp.user_id = v_firm limit 1));
end;
$$;

create or replace function public.save_firm_quote_template(p jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_firm uuid := public._quote_firm_for_quoting();
  v_id uuid := nullif(p->>'id', '')::uuid;
  v_row public.firm_quote_templates;
begin
  if coalesce(btrim(p->>'name'), '') = '' then raise exception 'Give the template a name'; end if;
  if jsonb_typeof(coalesce(p->'labour', '[]')) <> 'array' or jsonb_typeof(coalesce(p->'lines', '[]')) <> 'array' then
    raise exception 'Template lines are not a list';
  end if;
  if jsonb_array_length(coalesce(p->'labour', '[]')) + jsonb_array_length(coalesce(p->'lines', '[]')) = 0 then
    raise exception 'Add at least one line before saving a template';
  end if;
  if jsonb_array_length(coalesce(p->'labour', '[]')) + jsonb_array_length(coalesce(p->'lines', '[]')) > 200 then
    raise exception 'Too many lines for one template';
  end if;
  if v_id is not null then
    update public.firm_quote_templates set
      name = left(btrim(p->>'name'), 120), job_type = nullif(btrim(coalesce(p->>'job_type', '')), ''),
      description = nullif(btrim(coalesce(p->>'description', '')), ''),
      labour = coalesce(p->'labour', '[]'), lines = coalesce(p->'lines', '[]'), updated_at = now()
    where id = v_id and employer_id = v_firm
    returning * into v_row;
    if v_row.id is null then raise exception 'Template not found'; end if;
  else
    insert into public.firm_quote_templates (employer_id, name, job_type, description, labour, lines, created_by, created_by_name)
    values (v_firm, left(btrim(p->>'name'), 120), nullif(btrim(coalesce(p->>'job_type', '')), ''),
            nullif(btrim(coalesce(p->>'description', '')), ''), coalesce(p->'labour', '[]'), coalesce(p->'lines', '[]'),
            auth.uid(), public._automation_actor_name(v_firm))
    returning * into v_row;
  end if;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.delete_firm_quote_template(p_id uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_firm uuid := public._quote_firm_for_quoting();
begin
  delete from public.firm_quote_templates where id = p_id and employer_id = v_firm;
  if not found then raise exception 'Template not found'; end if;
end;
$$;

revoke all on function public.get_firm_quote_templates() from public, anon;
revoke all on function public.save_firm_quote_template(jsonb) from public, anon;
revoke all on function public.delete_firm_quote_template(uuid) from public, anon;
grant execute on function public.get_firm_quote_templates() to authenticated;
grant execute on function public.save_firm_quote_template(jsonb) to authenticated;
grant execute on function public.delete_firm_quote_template(uuid) to authenticated;

-- ── Win rate ──────────────────────────────────────────────────────────────
create or replace function public._quote_job_type(p_settings jsonb, p_job_type text, p_title text, p_desc text)
returns text language sql immutable set search_path to 'public' as $$
  select coalesce(
    nullif(btrim(coalesce(p_settings->>'jobType', '')), ''),
    nullif(btrim(coalesce(p_job_type, '')), ''),
    case
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(consumer unit|fuse ?board|\mcu\M|distribution board)' then 'Consumer unit change'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(\mev\M|car charg|charge ?point|charger)' then 'EV charger'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* 'rewire' then 'Rewire'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(eicr|condition report|periodic)' then 'EICR'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(solar|\mpv\M|battery storage)' then 'Solar and battery'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(smoke|heat alarm|fire alarm)' then 'Alarms'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* 'shower' then 'Shower'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* 'socket' then 'Sockets'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(light|downlight)' then 'Lighting'
      when coalesce(p_title, '') || ' ' || coalesce(p_desc, '') ~* '(fault|repair|trip)' then 'Fault finding'
      else 'Other'
    end)
$$;

create or replace function public.get_firm_quote_win_rate(p_months int default 12)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_from timestamptz;
  v_months int := least(greatest(coalesce(p_months, 12), 1), 36);
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can see win rates' using errcode = '42501';
  end if;
  v_from := date_trunc('month', now() at time zone 'Europe/London') - make_interval(months => v_months - 1);

  return (
    with base as (
      select q.id, q.total,
             (coalesce(q.first_sent_at, q.created_at) at time zone 'Europe/London') as sent_local,
             public._quote_job_type(q.settings, j.job_type, q.job_details->>'title', q.job_details->>'description') as job_type,
             coalesce(nullif(btrim(q.settings->'createdBy'->>'name'), ''), 'Not recorded') as person,
             case
               when q.acceptance_status in ('accepted', 'accepted_pending_deposit') or q.status = 'approved' then 'won'
               when q.acceptance_status = 'rejected' or q.status = 'rejected' then 'lost'
               when q.expiry_date < now() then 'expired'
               else 'open'
             end as outcome
        from public.quotes q
        left join public.employer_jobs j on j.id = q.employer_job_id
       where q.user_id = v_firm and q.deleted_at is null
         and coalesce(q.first_sent_at, q.created_at) >= v_from
         -- Sent to a customer at some point.
         and (q.first_sent_at is not null or q.status in ('sent', 'approved', 'rejected')
              or coalesce(q.acceptance_status, 'pending') <> 'pending')
         -- Not an invoice raised on its own, a deposit invoice, a stage
         -- invoice or a superseded version.
         and not (coalesce(q.invoice_raised, false) and q.quote_number = q.invoice_number)
         and q.parent_quote_id is null
         and coalesce(q.is_active_version, true)
         and nullif(q.settings->>'stageOf', '') is null
    ),
    agg as (
      select 'all'::text as dim, 'All quotes'::text as key, b.* from base b
      union all select 'month', to_char(b.sent_local, 'YYYY-MM'), b.* from base b
      union all select 'type', b.job_type, b.* from base b
      union all select 'person', b.person, b.* from base b
    ),
    grp as (
      select dim, key,
             count(*) as sent,
             count(*) filter (where outcome = 'won') as won,
             count(*) filter (where outcome = 'lost') as lost,
             count(*) filter (where outcome = 'expired') as expired,
             count(*) filter (where outcome = 'open') as open,
             round(coalesce(sum(total), 0), 2) as sent_value,
             round(coalesce(sum(total) filter (where outcome = 'won'), 0), 2) as won_value,
             round(coalesce(avg(total), 0), 2) as avg_value,
             round(coalesce(avg(total) filter (where outcome = 'won'), 0), 2) as avg_won_value
        from agg group by dim, key
    )
    select jsonb_build_object(
      'firm_id', v_firm,
      'from', v_from::date,
      'months', v_months,
      'all', (select to_jsonb(g) - 'dim' from grp g where g.dim = 'all'),
      'by_month', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.key) from grp g where g.dim = 'month'), '[]'::jsonb),
      'by_type', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.sent desc, g.key) from grp g where g.dim = 'type'), '[]'::jsonb),
      'by_person', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.sent desc, g.key) from grp g where g.dim = 'person'), '[]'::jsonb))
  );
end;
$$;
revoke all on function public.get_firm_quote_win_rate(int) from public, anon;
grant execute on function public.get_firm_quote_win_rate(int) to authenticated;
