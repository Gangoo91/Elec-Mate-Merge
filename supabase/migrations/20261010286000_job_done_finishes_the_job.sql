-- Gap #3 (extends ELE-2068): "Job done" really finishes the job.
--
-- 1. A message to the customer, only when the firm switches it on.
--    employer_job_done_settings gets three nullable columns: customer_message
--    (off | office_checks | auto; null = off), customer_message_invoice
--    (none | invoice | pay_link) and customer_message_photos.
--    complete_job_on_site queues ONE row in employer_job_done_messages per job
--    (unique job_id and completion_id, so never twice), with the summary and
--    the photos the worker chose. It is never queued for a job created by an
--    import (employer_import_rows), never sent without a valid email, and it
--    waits while a certificate on the job is not issued yet (draft, waiting
--    for QS review, or returned), for up to 72 hours, then goes to the office.
--    "office_checks": the office previews it on the job and taps Send.
--    "auto": it is queued as soon as it is ready.
--    Sending is the edge function job-done-customer-message (Resend through
--    _shared/mailer.ts, the shared email shell). It claims the row atomically
--    (queued -> sending), so a repeated call never sends twice. The certificate
--    is linked only when it is issued, has a saved public PDF and is not held
--    until paid; the invoice only when the office has already sent it.
-- 2. note_cert_start_offline: the phone's queued "started a certificate"
--    (outbox), recorded at the phone's time so the finished certificate still
--    matches this job, and linked straight away if it already synced.
-- 3. get_job_done_summary: what the office sees under "Done on site".
--
-- Additive: new columns (nullable), one new table, new functions. Three
-- functions new this week (complete_job_on_site, get_job_done_context,
-- get_job_done_settings) are patched in place with the same signatures; HEAD
-- and iOS build 49 call none of them. The 5-minute dispatcher is written here
-- but NOT scheduled: supabase/release-held/20261010286900_job_done_messages_cron.sql
-- schedules it once the edge function is deployed.

-- ── Settings ────────────────────────────────────────────────────────────────
alter table public.employer_job_done_settings
  add column if not exists customer_message text
    check (customer_message in ('off', 'office_checks', 'auto')),
  add column if not exists customer_message_invoice text
    check (customer_message_invoice in ('none', 'invoice', 'pay_link')),
  add column if not exists customer_message_photos boolean;

-- ── One customer message per job ───────────────────────────────────────────
create table if not exists public.employer_job_done_messages (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  job_id uuid not null unique references public.employer_jobs(id) on delete cascade,
  completion_id uuid not null unique references public.employer_job_completions(id) on delete cascade,
  mode text not null check (mode in ('office_checks', 'auto')),
  status text not null check (status in ('waiting_certificate', 'to_check', 'queued', 'sending',
                                         'sent', 'skipped', 'cancelled', 'failed')),
  reason text,
  to_name text,
  summary text,
  photos text[] not null default '{}',
  include_invoice text not null default 'none' check (include_invoice in ('none', 'invoice', 'pay_link')),
  created_by uuid,
  created_by_name text,
  decided_by uuid,
  decided_by_name text,
  decided_at timestamptz,
  sent_to text,
  sent_at timestamptz,
  dispatched_at timestamptz,
  attempts int not null default 0,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_job_done_messages_firm_status
  on public.employer_job_done_messages (employer_id, status);
alter table public.employer_job_done_messages enable row level security;
revoke all on public.employer_job_done_messages from anon, authenticated;
grant select on public.employer_job_done_messages to authenticated;
drop policy if exists "Firm reads its job done messages" on public.employer_job_done_messages;
create policy "Firm reads its job done messages" on public.employer_job_done_messages
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));
comment on table public.employer_job_done_messages is
  '[EMPLOYER HUB] The customer''s "job done" email (gap #3, ELE-2068): one per job, queued by complete_job_on_site when the firm has switched it on. Scope: employer_id = firm owner, job_id -> employer_jobs, completion_id -> employer_job_completions. Used by: Employer Hub job sheet (Done on site), Worker Tools Job done, edge fn job-done-customer-message. Rule: written only by the job_done_message_* functions; unique per job so it is never sent twice; never for imported jobs or without a valid email.';

-- ── Helpers ─────────────────────────────────────────────────────────────────
create or replace function public._job_done_imported(p_job uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select exists (select 1 from public.employer_import_rows r
                  where r.table_name = 'employer_jobs' and r.row_id = p_job and r.action = 'created')
$$;
revoke all on function public._job_done_imported(uuid) from public, anon, authenticated;

create or replace function public._job_done_email_ok(p_email text)
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  select coalesce(btrim(p_email), '') ~* '^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$'
$$;
revoke all on function public._job_done_email_ok(text) from public, anon, authenticated;

-- The job's certificates as the customer would get them.
--   issued  = completed, and the latest QS review (if any) approved
--   pdf_url = only when issued, saved as a public PDF, and not held until paid
--   waiting = a certificate on the job is not issued yet, or the worker said
--             one is started / to do later and none is on the job
create or replace function public._job_done_cert_state(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_choice text;
  v_held boolean;
  v_certs jsonb := '[]'::jsonb;
  v_waiting boolean := false;
  v_qs text;
  v_issued boolean;
  r record;
begin
  select c.certificate_status into v_choice
    from public.employer_job_completions c where c.job_id = p_job
   order by c.completed_at desc limit 1;
  select exists (select 1 from public.quotes q
                  where q.employer_job_id = p_job and q.invoice_raised and q.deleted_at is null
                    and q.certificate_release_mode = 'on_payment' and q.certificate_released_at is null)
    into v_held;
  for r in
    select rp.id, rp.report_type, coalesce(rp.certificate_number, rp.report_id) as num, rp.status, rp.pdf_url
      from public.employer_job_certificates l
      join public.reports rp on rp.id = l.report_uuid and rp.deleted_at is null
     where l.job_id = p_job
     order by rp.created_at
  loop
    select q.status into v_qs from public.report_qs_reviews q
     where q.report_uuid = r.id and q.status <> 'cancelled'
     order by q.created_at desc limit 1;
    v_issued := r.status = 'completed' and coalesce(v_qs, 'approved') = 'approved';
    if not v_issued then v_waiting := true; end if;
    v_certs := v_certs || jsonb_build_array(jsonb_build_object(
      'report_uuid', r.id, 'type', r.report_type, 'number', r.num, 'issued', v_issued, 'qs', v_qs,
      'pdf_url', case when v_issued and not v_held and r.pdf_url like '%/storage/v1/object/public/%'
                      then r.pdf_url end));
  end loop;
  if jsonb_array_length(v_certs) = 0 and v_choice in ('started', 'later') then
    v_waiting := true;
  end if;
  return jsonb_build_object('waiting', v_waiting, 'held_until_paid', coalesce(v_held, false),
                            'choice', v_choice, 'certificates', v_certs);
end;
$$;
revoke all on function public._job_done_cert_state(uuid) from public, anon, authenticated;

-- The job's invoice as the customer would get it: only once the office has
-- sent it (never a draft). Pay link only while nothing has been paid.
create or replace function public._job_done_invoice_state(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  q record;
  v_stripe boolean;
begin
  select x.id, x.invoice_number, x.invoice_status, x.pdf_url, x.stripe_payment_link_url, x.total,
         coalesce(x.total_paid, 0) as paid, x.user_id
    into q
    from public.quotes x
   where x.employer_job_id = p_job and x.invoice_raised and x.deleted_at is null
   order by (x.id = (select c.invoice_id from public.employer_job_completions c where c.job_id = p_job
                      order by c.completed_at desc limit 1)) desc nulls last, x.created_at desc
   limit 1;
  if q.id is null then
    return jsonb_build_object('exists', false);
  end if;
  select coalesce(cp.stripe_account_id is not null and cp.stripe_account_status = 'active', false)
    into v_stripe from public.company_profiles cp where cp.user_id = q.user_id limit 1;
  return jsonb_build_object(
    'exists', true,
    'invoice_id', q.id,
    'number', q.invoice_number,
    'status', lower(coalesce(q.invoice_status, 'draft')),
    'sent', lower(coalesce(q.invoice_status, 'draft')) in ('sent', 'overdue', 'paid', 'partially_paid'),
    'paid', lower(coalesce(q.invoice_status, '')) = 'paid',
    'total', q.total,
    'balance', greatest(coalesce(q.total, 0) - q.paid, 0),
    'pdf_url', case when q.pdf_url like '%/storage/v1/object/public/%' then q.pdf_url end,
    'pay_url', case when coalesce(v_stripe, false) and q.paid <= 0
                     and lower(coalesce(q.invoice_status, '')) in ('sent', 'overdue')
                     and q.stripe_payment_link_url like 'https://%' then q.stripe_payment_link_url end);
end;
$$;
revoke all on function public._job_done_invoice_state(uuid) from public, anon, authenticated;

-- What the phone needs to show "The customer gets an email" (cached offline).
create or replace function public._job_done_customer_message_context(p_job uuid, p_firm uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'mode', coalesce(s.customer_message, 'off'),
    'photos', coalesce(s.customer_message_photos, true),
    'invoice', coalesce(s.customer_message_invoice, 'invoice'),
    'has_email', public._job_done_email_ok(j.client_email),
    'imported', public._job_done_imported(p_job),
    'already', exists (select 1 from public.employer_job_done_messages m where m.job_id = p_job))
  from public.employer_jobs j
  left join public.employer_job_done_settings s on s.employer_id = p_firm
  where j.id = p_job
$$;
revoke all on function public._job_done_customer_message_context(uuid, uuid) from public, anon, authenticated;

-- Queue the message for one completion (called by complete_job_on_site).
-- p_opts from the phone: { send: bool, summary: text, photo_indexes: [int] }
create or replace function public._job_done_queue_customer_message(p_completion uuid, p_opts jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  c public.employer_job_completions%rowtype;
  s record;
  v_mode text;
  v_job record;
  v_opts jsonb := coalesce(p_opts, '{}'::jsonb);
  v_photos text[] := '{}';
  v_i int;
  v_summary text;
  v_status text;
  v_reason text;
  v_id uuid;
  m record;
begin
  select * into c from public.employer_job_completions where id = p_completion;
  if c.id is null then return null; end if;
  select x.customer_message, x.customer_message_invoice, x.customer_message_photos into s
    from public.employer_job_done_settings x where x.employer_id = c.employer_id;
  v_mode := coalesce(s.customer_message, 'off');
  if v_mode = 'off' then
    return jsonb_build_object('status', 'off');
  end if;

  select m2.id, m2.status, m2.reason, m2.mode into m
    from public.employer_job_done_messages m2 where m2.job_id = c.job_id;
  if m.id is not null then
    return jsonb_build_object('id', m.id, 'status', m.status, 'reason', m.reason, 'mode', m.mode, 'already', true);
  end if;

  select j.id, j.client, j.client_email into v_job from public.employer_jobs j where j.id = c.job_id;

  if coalesce(s.customer_message_photos, true) then
    for v_i in
      select x::int from jsonb_array_elements_text(
        case when jsonb_typeof(v_opts->'photo_indexes') = 'array' then v_opts->'photo_indexes' else '[]'::jsonb end) x
       where x ~ '^\d{1,2}$'
    loop
      if v_i < coalesce(array_length(c.photos, 1), 0)
         and not (c.photos[v_i + 1] = any (v_photos))
         and coalesce(array_length(v_photos, 1), 0) < 6 then
        v_photos := v_photos || c.photos[v_i + 1];
      end if;
    end loop;
  end if;
  v_summary := left(coalesce(nullif(btrim(coalesce(v_opts->>'summary', '')), ''), c.note), 2000);

  if lower(coalesce(v_opts->>'send', 'true')) = 'false' then
    v_status := 'skipped';
    v_reason := 'Not sent: ' || coalesce(nullif(btrim(c.completed_by_name), ''), 'the engineer') || ' chose not to send it.';
  elsif public._job_done_imported(c.job_id) then
    v_status := 'skipped';
    v_reason := 'Not sent: this job came in with an import, so nothing goes to the customer.';
  elsif not public._job_done_email_ok(v_job.client_email) then
    v_status := 'skipped';
    v_reason := 'Not sent: there is no customer email on the job.';
  elsif coalesce((public._job_done_cert_state(c.job_id)->>'waiting')::boolean, false) then
    v_status := 'waiting_certificate';
    v_reason := 'Waiting for the certificate to be issued, so it goes with it.';
  else
    v_status := case v_mode when 'auto' then 'queued' else 'to_check' end;
  end if;

  insert into public.employer_job_done_messages (
    employer_id, job_id, completion_id, mode, status, reason, to_name, summary, photos,
    include_invoice, created_by, created_by_name)
  values (
    c.employer_id, c.job_id, c.id, v_mode, v_status, v_reason,
    coalesce(nullif(btrim(v_job.client), ''), c.customer_name), v_summary, v_photos,
    coalesce(s.customer_message_invoice, 'invoice'), c.completed_by, c.completed_by_name)
  on conflict do nothing
  returning id into v_id;

  return jsonb_build_object('id', v_id, 'status', v_status, 'reason', v_reason, 'mode', v_mode, 'already', v_id is null);
end;
$$;
revoke all on function public._job_done_queue_customer_message(uuid, jsonb) from public, anon, authenticated;

-- Re-check a message that waits for its certificate.
create or replace function public._job_done_message_refresh(p_msg uuid)
returns text
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  m record;
begin
  select id, job_id, mode, status, created_at into m
    from public.employer_job_done_messages where id = p_msg for update;
  if m.id is null then return null; end if;
  if m.status <> 'waiting_certificate' then return m.status; end if;
  if not coalesce((public._job_done_cert_state(m.job_id)->>'waiting')::boolean, false) then
    update public.employer_job_done_messages
       set status = case m.mode when 'auto' then 'queued' else 'to_check' end, reason = null, updated_at = now()
     where id = p_msg;
    return case m.mode when 'auto' then 'queued' else 'to_check' end;
  elsif m.created_at < now() - interval '72 hours' then
    update public.employer_job_done_messages
       set status = 'to_check',
           reason = 'The certificate still isn''t issued. Send the summary without it, or wait.',
           updated_at = now()
     where id = p_msg;
    return 'to_check';
  end if;
  return m.status;
end;
$$;
revoke all on function public._job_done_message_refresh(uuid) from public, anon, authenticated;

-- ── The office: "Done on site" on the job ──────────────────────────────────
create or replace function public.get_job_done_summary(p_job uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_job record;
  c public.employer_job_completions%rowtype;
  m public.employer_job_done_messages%rowtype;
  v_money boolean;
  v_set record;
  v_cert jsonb;
  v_inv jsonb;
  v_company text;
begin
  if auth.uid() is null or p_job is null then return null; end if;
  select j.id, j.user_id, j.title, j.client, j.client_email into v_job
    from public.employer_jobs j where j.id = p_job;
  if v_job.id is null or v_job.user_id not in (select public.my_employer_scope()) then
    return null;
  end if;
  select * into c from public.employer_job_completions x where x.job_id = p_job
   order by x.completed_at desc limit 1;
  if c.id is null then return null; end if;
  v_money := public.can_see_firm_money(v_job.user_id);

  select id into m.id from public.employer_job_done_messages where job_id = p_job;
  if m.id is not null then
    perform public._job_done_message_refresh(m.id);
    select * into m from public.employer_job_done_messages where id = m.id;
  end if;
  select s.customer_message, s.customer_message_invoice, s.customer_message_photos into v_set
    from public.employer_job_done_settings s where s.employer_id = v_job.user_id;
  v_cert := public._job_done_cert_state(p_job);
  v_inv := public._job_done_invoice_state(p_job);
  select coalesce(nullif(btrim(cp.company_name), ''), 'Your electrician') into v_company
    from public.company_profiles cp where cp.user_id = v_job.user_id limit 1;

  return jsonb_build_object(
    'can_see_money', v_money,
    'company_name', coalesce(v_company, 'Your electrician'),
    'job', jsonb_build_object('id', v_job.id, 'title', v_job.title, 'client', v_job.client,
                              'client_email', v_job.client_email,
                              'email_ok', public._job_done_email_ok(v_job.client_email),
                              'imported', public._job_done_imported(p_job)),
    'completion', jsonb_build_object(
      'id', c.id, 'by', c.completed_by_name, 'completed_at', c.completed_at, 'received_at', c.received_at,
      'note', c.note, 'photos', to_jsonb(c.photos), 'certificate_status', c.certificate_status,
      'customer_name', c.customer_name, 'signed', c.customer_signature is not null,
      'signature', c.customer_signature, 'signed_at', c.customer_signed_at,
      'absent_reason', c.customer_absent_reason,
      'extras', case when v_money then c.extras else
        coalesce((select jsonb_agg(jsonb_build_object('description', x->>'description', 'quantity', x->'quantity', 'unit', x->>'unit'))
                    from jsonb_array_elements(c.extras) x), '[]'::jsonb) end,
      'extras_net', case when v_money then c.extras_net end,
      'variation_order_id', c.variation_order_id,
      'invoice_state', case when v_money then c.invoice_state end,
      'invoice_id', case when v_money then c.invoice_id end,
      'invoice_number', case when v_money then v_inv->>'number' end,
      'invoice_status', case when v_money then v_inv->>'status' end),
    'certificates', v_cert,
    'invoice', case when v_money then v_inv - 'pay_url' - 'pdf_url'
                     || jsonb_build_object('has_pdf', v_inv->>'pdf_url' is not null,
                                           'has_pay_link', v_inv->>'pay_url' is not null)
               else jsonb_build_object('exists', coalesce((v_inv->>'exists')::boolean, false),
                                       'sent', coalesce((v_inv->>'sent')::boolean, false)) end,
    'settings', jsonb_build_object('mode', coalesce(v_set.customer_message, 'off'),
                                   'invoice', coalesce(v_set.customer_message_invoice, 'invoice'),
                                   'photos', coalesce(v_set.customer_message_photos, true)),
    'message', case when m.id is null then null else jsonb_build_object(
      'id', m.id, 'mode', m.mode, 'status', m.status, 'reason', m.reason, 'to_name', m.to_name,
      'summary', m.summary, 'photos', to_jsonb(m.photos), 'include_invoice', m.include_invoice,
      'created_at', m.created_at, 'decided_by_name', m.decided_by_name, 'decided_at', m.decided_at,
      'sent_to', m.sent_to, 'sent_at', m.sent_at,
      'can_send', m.status in ('to_check', 'waiting_certificate', 'failed', 'cancelled', 'skipped')
                  and not public._job_done_imported(p_job)
                  and public._job_done_email_ok(v_job.client_email),
      'can_cancel', m.status in ('to_check', 'waiting_certificate', 'queued', 'failed')) end);
end;
$$;
revoke all on function public.get_job_done_summary(uuid) from public, anon;
grant execute on function public.get_job_done_summary(uuid) to authenticated;

-- The office decides: send it (queued for the sender), save edits, or don't send.
create or replace function public.job_done_message_decide(
  p_msg uuid, p_action text, p_summary text default null, p_photos text[] default null,
  p_include_invoice text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  m public.employer_job_done_messages%rowtype;
  v_job record;
  v_all text[];
  v_name text;
begin
  if auth.uid() is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  select * into m from public.employer_job_done_messages where id = p_msg for update;
  if m.id is null or m.employer_id not in (select public.my_employer_scope()) then
    raise exception 'That message is not on your firm''s jobs' using errcode = '42501';
  end if;
  if p_action not in ('send', 'save', 'cancel') then
    raise exception 'Unknown choice' using errcode = '22023';
  end if;
  select coalesce(nullif(p.full_name, ''), 'Office') into v_name from public.profiles p where p.id = auth.uid();

  if p_action = 'cancel' then
    if m.status not in ('to_check', 'waiting_certificate', 'queued', 'failed') then
      raise exception 'It can''t be stopped now: it is %', replace(m.status, '_', ' ') using errcode = 'P0001';
    end if;
    update public.employer_job_done_messages
       set status = 'cancelled', reason = 'Not sent: ' || v_name || ' chose not to send it.',
           decided_by = auth.uid(), decided_by_name = v_name, decided_at = now(), updated_at = now()
     where id = p_msg;
    return public.get_job_done_summary(m.job_id);
  end if;

  if m.status in ('queued', 'sending', 'sent') then
    raise exception 'It has already gone to be sent. Nothing was sent twice.' using errcode = 'P0001';
  end if;
  if p_summary is not null and length(p_summary) > 2000 then
    raise exception 'Keep the summary under 2,000 characters.' using errcode = '22023';
  end if;
  if p_include_invoice is not null and p_include_invoice not in ('none', 'invoice', 'pay_link') then
    raise exception 'Unknown invoice choice' using errcode = '22023';
  end if;
  if p_photos is not null then
    select c.photos into v_all from public.employer_job_completions c where c.id = m.completion_id;
    if coalesce(array_length(p_photos, 1), 0) > 6 then
      raise exception 'Up to 6 photos in the email.' using errcode = '22023';
    end if;
    if exists (select 1 from unnest(p_photos) p where not (p = any (coalesce(v_all, '{}')))) then
      raise exception 'Only photos from this Job done can go in the email.' using errcode = '42501';
    end if;
  end if;

  update public.employer_job_done_messages
     set summary = coalesce(nullif(btrim(p_summary), ''), summary),
         photos = coalesce(p_photos, photos),
         include_invoice = coalesce(p_include_invoice, include_invoice),
         updated_at = now()
   where id = p_msg;

  if p_action = 'send' then
    select j.client_email into v_job from public.employer_jobs j where j.id = m.job_id;
    if public._job_done_imported(m.job_id) then
      raise exception 'This job came in with an import, so nothing goes to the customer from it.' using errcode = 'P0001';
    end if;
    if not public._job_done_email_ok(v_job.client_email) then
      raise exception 'Add the customer''s email to the job first.' using errcode = 'P0001';
    end if;
    update public.employer_job_done_messages
       set status = 'queued', reason = null, decided_by = auth.uid(), decided_by_name = v_name,
           decided_at = now(), updated_at = now()
     where id = p_msg;
  end if;
  return public.get_job_done_summary(m.job_id);
end;
$$;
revoke all on function public.job_done_message_decide(uuid, text, text, text[], text) from public, anon;
grant execute on function public.job_done_message_decide(uuid, text, text, text[], text) to authenticated;

-- May this signed-in person poke the sender for this message? (the firm, or
-- the worker who finished the job). Only a queued message is ever sent.
create or replace function public.job_done_message_can_poke(p_msg uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select auth.uid() is not null and exists (
    select 1 from public.employer_job_done_messages m
      join public.employer_job_completions c on c.id = m.completion_id
     where m.id = p_msg
       and (m.employer_id in (select public.my_employer_scope()) or c.completed_by = auth.uid()))
$$;
revoke all on function public.job_done_message_can_poke(uuid) from public, anon;
grant execute on function public.job_done_message_can_poke(uuid) to authenticated;

-- ── The sender's side (service role only) ──────────────────────────────────
-- Claim a queued message (queued -> sending, once) and hand over what to send.
create or replace function public.job_done_message_claim(p_msg uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  m public.employer_job_done_messages%rowtype;
  v_job record;
  c public.employer_job_completions%rowtype;
  v_mode text;
  v_inv jsonb;
  v_skip text;
begin
  update public.employer_job_done_messages
     set status = 'sending', dispatched_at = now(), attempts = attempts + 1, updated_at = now()
   where id = p_msg and status = 'queued'
  returning * into m;
  if m.id is null then
    return jsonb_build_object('claimed', false);
  end if;

  select j.id, j.title, j.client, j.client_email, j.location into v_job
    from public.employer_jobs j where j.id = m.job_id;
  select coalesce(s.customer_message, 'off') into v_mode
    from public.employer_job_done_settings s where s.employer_id = m.employer_id;
  v_skip := case
    when coalesce(v_mode, 'off') = 'off' and m.decided_by is null
      then 'Not sent: the firm switched the customer message off before it went.'
    when public._job_done_imported(m.job_id)
      then 'Not sent: this job came in with an import, so nothing goes to the customer.'
    when not public._job_done_email_ok(v_job.client_email)
      then 'Not sent: there is no customer email on the job.'
  end;
  if v_skip is not null then
    update public.employer_job_done_messages
       set status = 'skipped', reason = v_skip, updated_at = now() where id = p_msg;
    return jsonb_build_object('claimed', false, 'skipped', v_skip);
  end if;

  select * into c from public.employer_job_completions where id = m.completion_id;
  v_inv := public._job_done_invoice_state(m.job_id);
  return jsonb_build_object(
    'claimed', true,
    'id', m.id,
    'firm_id', m.employer_id,
    'job_id', m.job_id,
    'title', v_job.title,
    'client', coalesce(nullif(btrim(m.to_name), ''), v_job.client),
    'to', lower(btrim(v_job.client_email)),
    'location', v_job.location,
    'summary', m.summary,
    'photos', to_jsonb(m.photos),
    'completed_at', c.completed_at,
    'by', c.completed_by_name,
    'signed_by', case when c.customer_signature is not null then c.customer_name end,
    'extras', coalesce((select jsonb_agg(jsonb_build_object('description', x->>'description',
                                                            'quantity', (x->>'quantity')::numeric))
                          from jsonb_array_elements(c.extras) x), '[]'::jsonb),
    'certificates', public._job_done_cert_state(m.job_id)->'certificates',
    'invoice', case
      when m.include_invoice = 'none' or not coalesce((v_inv->>'sent')::boolean, false) then null
      else jsonb_build_object('number', v_inv->>'number', 'paid', (v_inv->>'paid')::boolean,
                              'balance', (v_inv->>'balance')::numeric,
                              'pdf_url', v_inv->>'pdf_url',
                              'pay_url', case when m.include_invoice = 'pay_link' then v_inv->>'pay_url' end) end);
end;
$$;
revoke all on function public.job_done_message_claim(uuid) from public, anon, authenticated;
grant execute on function public.job_done_message_claim(uuid) to service_role;

create or replace function public.job_done_message_finish(p_msg uuid, p_status text, p_summary text, p_detail jsonb default '{}'::jsonb)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  m public.employer_job_done_messages%rowtype;
  v_title text;
begin
  if p_status not in ('sent', 'failed', 'skipped') then
    raise exception 'Unknown status' using errcode = '22023';
  end if;
  update public.employer_job_done_messages
     set status = p_status,
         reason = case when p_status = 'sent' then null else left(p_summary, 300) end,
         sent_to = case when p_status = 'sent' then nullif(coalesce(p_detail, '{}'::jsonb)->>'to', '') else sent_to end,
         sent_at = case when p_status = 'sent' then now() else sent_at end,
         detail = detail || coalesce(p_detail, '{}'::jsonb),
         updated_at = now()
   where id = p_msg and status = 'sending'
  returning * into m;
  if m.id is null then return; end if;

  if p_status = 'sent' then
    insert into public.employer_job_comments (job_id, author_name, content, comment_type)
    values (m.job_id, 'Job done', left(p_summary, 4000), 'customer_contact');
  elsif p_status = 'failed' then
    select j.title into v_title from public.employer_jobs j where j.id = m.job_id;
    perform public.notify_employer_bell(
      m.employer_id, 'job_done_on_site',
      'Job summary not sent: ' || coalesce(nullif(btrim(v_title), ''), 'a job'),
      left(p_summary, 300),
      jsonb_build_object('route', '/employer?section=jobs&job=' || m.job_id, 'job_id', m.job_id,
                         'message_id', m.id));
  end if;
end;
$$;
revoke all on function public.job_done_message_finish(uuid, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.job_done_message_finish(uuid, text, text, jsonb) to service_role;

-- The 5-minute dispatcher. NOT scheduled here (see the release-held file):
-- it re-checks messages waiting for a certificate, frees a stuck send, and
-- posts each queued message to the edge function, which claims it once.
create or replace function public.job_done_messages_tick()
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  r record;
  v_key text;
  v_n int := 0;
begin
  for r in select id from public.employer_job_done_messages where status = 'waiting_certificate' limit 200 loop
    perform public._job_done_message_refresh(r.id);
  end loop;
  update public.employer_job_done_messages
     set status = 'failed', reason = 'Did not send: the sender did not answer. Try again from the job.', updated_at = now()
   where status = 'sending' and dispatched_at < now() - interval '1 hour';
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if v_key is null then
    raise warning '[job_done_messages_tick] service_role_key not in vault';
    return jsonb_build_object('dispatched', 0);
  end if;
  for r in select id from public.employer_job_done_messages
            where status = 'queued' and updated_at < now() - interval '1 minute'
            order by updated_at limit 25 loop
    perform net.http_post(
      url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/job-done-customer-message',
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
      body := jsonb_build_object('message_id', r.id));
    v_n := v_n + 1;
  end loop;
  return jsonb_build_object('dispatched', v_n);
end;
$$;
revoke all on function public.job_done_messages_tick() from public, anon, authenticated;

-- ── Settings: the customer message (owner or admin) ────────────────────────
create or replace function public.set_job_done_customer_message(
  p_firm uuid, p_mode text, p_invoice text default null, p_photos boolean default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_name text;
begin
  if auth.uid() is null or p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can change this' using errcode = '42501';
  end if;
  if p_mode not in ('off', 'office_checks', 'auto') then
    raise exception 'Unknown choice' using errcode = '22023';
  end if;
  if p_invoice is not null and p_invoice not in ('none', 'invoice', 'pay_link') then
    raise exception 'Unknown invoice choice' using errcode = '22023';
  end if;
  select coalesce(nullif(p.full_name, ''), 'Office') into v_name from public.profiles p where p.id = auth.uid();
  insert into public.employer_job_done_settings (employer_id, customer_message, customer_message_invoice,
                                                 customer_message_photos, updated_by, updated_by_name, updated_at)
  values (p_firm, p_mode, coalesce(p_invoice, 'invoice'), coalesce(p_photos, true), auth.uid(), v_name, now())
  on conflict (employer_id) do update
    set customer_message = excluded.customer_message,
        customer_message_invoice = coalesce(p_invoice, public.employer_job_done_settings.customer_message_invoice, 'invoice'),
        customer_message_photos = coalesce(p_photos, public.employer_job_done_settings.customer_message_photos, true),
        updated_by = excluded.updated_by, updated_by_name = excluded.updated_by_name, updated_at = now();
  return public.get_job_done_settings(p_firm);
end;
$$;
revoke all on function public.set_job_done_customer_message(uuid, text, text, boolean) from public, anon;
grant execute on function public.set_job_done_customer_message(uuid, text, text, boolean) to authenticated;

-- Same signature as 20261010201000; adds the customer message fields.
create or replace function public.get_job_done_settings(p_firm uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select case when auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope())
    then null else jsonb_build_object(
      'who_can_finish', coalesce(s.who_can_finish, 'crew'),
      'updated_by_name', s.updated_by_name,
      'updated_at', s.updated_at,
      'can_change', public.can_see_firm_money(p_firm),
      'draft_invoice_on', public._automation_on(p_firm, 'job_complete_draft_invoice'),
      'review_request_on', public._automation_on(p_firm, 'job_complete_review_request'),
      'customer_message', coalesce(s.customer_message, 'off'),
      'customer_message_invoice', coalesce(s.customer_message_invoice, 'invoice'),
      'customer_message_photos', coalesce(s.customer_message_photos, true),
      'company_name', (select coalesce(nullif(btrim(cp.company_name), ''), 'Your firm')
                         from public.company_profiles cp where cp.user_id = p_firm limit 1),
      'pay_links_on', coalesce((select cp.stripe_account_id is not null and cp.stripe_account_status = 'active'
                                  from public.company_profiles cp where cp.user_id = p_firm limit 1), false))
  end
  from (select 1) one
  left join public.employer_job_done_settings s on s.employer_id = p_firm
$$;
revoke all on function public.get_job_done_settings(uuid) from public, anon;
grant execute on function public.get_job_done_settings(uuid) to authenticated;

-- ── A certificate started on the phone with no signal ──────────────────────
create or replace function public.note_cert_start_offline(
  p_id uuid, p_job uuid, p_report_type text default null, p_started_at timestamptz default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  v_at timestamptz;
  v_type text := nullif(left(btrim(coalesce(p_report_type, '')), 40), '');
  v_linked int := 0;
  r record;
begin
  if v_uid is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  if p_id is null or p_job is null then raise exception 'Something was missing' using errcode = '22023'; end if;
  if not (public.is_assigned_to_job(p_job)
          or exists (select 1 from public.employer_jobs j where j.id = p_job and j.user_id in (select public.my_employer_scope()))) then
    raise exception 'Job not found' using errcode = '42501';
  end if;
  -- The phone's time (never in the future, never older than the matcher looks).
  v_at := greatest(least(coalesce(p_started_at, now()), now()), now() - interval '13 days');
  insert into public.employer_cert_starts (id, user_id, job_id, report_type, created_at)
  values (p_id, v_uid, p_job, v_type, v_at)
  on conflict (id) do nothing;
  -- A certificate that synced before this landed: link it now.
  for r in
    select rp.id from public.reports rp
     where rp.user_id = v_uid and rp.deleted_at is null
       and (v_type is null or lower(rp.report_type) = lower(v_type))
       and rp.created_at >= v_at - interval '1 minute'
       and not exists (select 1 from public.employer_job_certificates l where l.report_uuid = rp.id)
     order by rp.created_at limit 3
  loop
    if public._auto_link_certificate(r.id) is not null then v_linked := v_linked + 1; end if;
  end loop;
  return jsonb_build_object('linked', v_linked);
end;
$$;
revoke all on function public.note_cert_start_offline(uuid, uuid, text, timestamptz) from public, anon;
grant execute on function public.note_cert_start_offline(uuid, uuid, text, timestamptz) to authenticated;

-- ── Patch complete_job_on_site and get_job_done_context in place ───────────
-- (same approach as 20261010201100 / 270200; each replace must match once)
do $$
declare
  d text;
  n int;
begin
  d := pg_get_functiondef('public.complete_job_on_site(uuid, uuid, jsonb)'::regprocedure);
  if position('_job_done_queue_customer_message' in d) = 0 then
    n := 0;
    if position(E'  v_msg text;\nbegin' in d) > 0 then
      d := replace(d, E'  v_msg text;\nbegin', E'  v_msg text;\n  v_cm jsonb;\nbegin'); n := n + 1;
    end if;
    if position(E'  v_result := jsonb_build_object(' in d) > 0 then
      d := replace(d, E'  v_result := jsonb_build_object(',
        E'  -- Gap #3: the customer''s message, if the firm has it on (never breaks Job done).\n'
        || E'  begin\n'
        || E'    v_cm := public._job_done_queue_customer_message(p_id, v_p->''customer_message'');\n'
        || E'  exception when others then\n'
        || E'    raise warning ''[complete_job_on_site] customer message not queued: %'', sqlerrm;\n'
        || E'    v_cm := jsonb_build_object(''status'', ''error'');\n'
        || E'  end;\n\n'
        || E'  v_result := jsonb_build_object(');
      n := n + 1;
    end if;
    if position(E'''already'', false);' in d) > 0 then
      d := replace(d, E'''already'', false);', E'''customer_message'', v_cm,\n    ''already'', false);'); n := n + 1;
    end if;
    if position(E'else '''' end;\n  perform public.notify_employer_bell(' in d) > 0 then
      d := replace(d, E'else '''' end;\n  perform public.notify_employer_bell(',
        E'else '''' end\n    || case v_cm->>''status'' when ''to_check'' then '' The customer''''s job summary is ready to check and send.'''
        || E' when ''waiting_certificate'' then '' The customer''''s job summary goes when the certificate is issued.'' else '''' end;\n'
        || E'  perform public.notify_employer_bell(');
      n := n + 1;
    end if;
    if n <> 4 then
      raise exception 'complete_job_on_site did not match the expected shape (% of 4 patches)', n;
    end if;
    execute d;
  end if;

  d := pg_get_functiondef('public.get_job_done_context(uuid)'::regprocedure);
  if position('_job_done_customer_message_context' in d) = 0 then
    if position(E'    ''certificates'', coalesce((' in d) = 0 then
      raise exception 'get_job_done_context did not match the expected shape';
    end if;
    d := replace(d, E'    ''certificates'', coalesce((',
      E'    ''customer_message'', public._job_done_customer_message_context(p_job, w.firm),\n    ''certificates'', coalesce((');
    execute d;
  end if;
end $$;
