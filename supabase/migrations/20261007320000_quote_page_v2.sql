-- ELE-1989 Quote page v2: something a firm puts on its van, its Google profile
-- and every invoice.
--
--  * company_profiles: services, areas, about, trading-since and display toggles
--    for the public page, plus lead_page_on_documents (link on invoice/quote
--    emails; only takes effect while the page is live).
--  * employer_leads: job_type / postcode / preferred_timing / photos captured by
--    the 3-step form. The lead still lands in Leads + Enquiries exactly as before.
--  * lead_page_requests: server-side rate limit log + photo upload sessions.
--  * lead_page_stats: page views and enquiries per firm per day (no third-party
--    tracking).
--  * quote-page-photos bucket: private; anon may upload ONLY into a live,
--    unexpired upload session (max 3 photos), the firm reads its own.
--  * Public RPCs (anon): get_lead_page, record_lead_page_view,
--    begin_lead_page_upload, submit_quote_request, submit_lead_enquiry (legacy,
--    now rate limited). Hub RPCs (owner/admin): get_quote_page_admin,
--    update_quote_page.

-- ── Columns ──────────────────────────────────────────────────────────────
alter table public.company_profiles
  add column if not exists lead_page_services text[] not null default '{}',
  add column if not exists lead_page_areas text[] not null default '{}',
  add column if not exists lead_page_about text,
  add column if not exists lead_page_trading_since smallint,
  add column if not exists lead_page_show_certs boolean not null default true,
  add column if not exists lead_page_show_registration boolean not null default true,
  add column if not exists lead_page_show_insurance boolean not null default true,
  add column if not exists lead_page_on_documents boolean not null default true;

comment on column public.company_profiles.lead_page_services is 'ELE-1989 Quote page: the jobs the firm wants (also the job-type chips on the form).';
comment on column public.company_profiles.lead_page_areas is 'ELE-1989 Quote page: towns / postcode areas covered, shown publicly.';
comment on column public.company_profiles.lead_page_about is 'ELE-1989 Quote page: short public "about us".';
comment on column public.company_profiles.lead_page_trading_since is 'ELE-1989 Quote page: year the firm started trading (owner declared).';
comment on column public.company_profiles.lead_page_on_documents is 'ELE-1989: add the quote page link to invoice and quote emails while the page is live.';

alter table public.employer_leads
  add column if not exists job_type text,
  add column if not exists postcode text,
  add column if not exists preferred_timing text,
  add column if not exists photos text[] not null default '{}';
comment on column public.employer_leads.photos is 'ELE-1989: storage paths in the private quote-page-photos bucket (<firm>/<request>/<file>), set by submit_quote_request.';

-- ── Rate limit log + upload sessions ────────────────────────────────────
create table if not exists public.lead_page_requests (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  kind text not null check (kind in ('upload', 'submit', 'blocked')),
  ip_hash text,
  contact_hash text,
  lead_id uuid references public.employer_leads(id) on delete set null,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists lead_page_requests_firm_idx on public.lead_page_requests (firm_id, created_at desc);
create index if not exists lead_page_requests_ip_idx on public.lead_page_requests (ip_hash, created_at desc);
alter table public.lead_page_requests enable row level security;
-- No policies: written and read only by the SECURITY DEFINER functions below.
comment on table public.lead_page_requests is '[EMPLOYER HUB] Quote page (ELE-1989) request log: one row per photo-upload session or submission, with hashed IP / contact for server-side rate limiting. Scope: firm_id = company owner. Used by: submit_quote_request, begin_lead_page_upload, quote-page-photos storage policy. Rule: no client access; rows older than 30 days are purged on submit.';

create table if not exists public.lead_page_stats (
  firm_id uuid not null,
  day date not null default current_date,
  views integer not null default 0,
  enquiries integer not null default 0,
  primary key (firm_id, day)
);
alter table public.lead_page_stats enable row level security;
drop policy if exists "Firm reads its quote page stats" on public.lead_page_stats;
create policy "Firm reads its quote page stats" on public.lead_page_stats
  for select to authenticated using (firm_id in (select public.my_employer_scope()));
comment on table public.lead_page_stats is '[EMPLOYER HUB] Quote page (ELE-1989) counters: page views and enquiries per firm per day, first-party only. Scope: firm_id = company owner. Used by: Quote page screen (get_quote_page_admin). Rule: written only by record_lead_page_view / submit_quote_request.';

-- ── Photos bucket ───────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quote-page-photos', 'quote-page-photos', false, 8388608,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Is this object name a valid slot in a live upload session?
create or replace function public.lead_page_upload_allowed(p_name text)
returns boolean
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_parts text[] := string_to_array(coalesce(p_name, ''), '/');
  v_req uuid;
  v_firm uuid;
  v_ok boolean;
  v_n int;
begin
  if array_length(v_parts, 1) <> 3 or v_parts[3] !~ '^[a-z0-9-]{1,60}\.(jpe?g|png|webp|heic|heif)$' then
    return false;
  end if;
  begin
    v_firm := v_parts[1]::uuid;
    v_req := v_parts[2]::uuid;
  exception when others then
    return false;
  end;
  select true into v_ok from public.lead_page_requests r
   where r.id = v_req and r.firm_id = v_firm and r.kind = 'upload'
     and r.submitted_at is null and r.created_at > now() - interval '45 minutes';
  if not coalesce(v_ok, false) then
    return false;
  end if;
  select count(*) into v_n from storage.objects o
   where o.bucket_id = 'quote-page-photos' and o.name like v_parts[1] || '/' || v_parts[2] || '/%';
  return v_n < 3;
end $$;
revoke all on function public.lead_page_upload_allowed(text) from public;
grant execute on function public.lead_page_upload_allowed(text) to anon, authenticated;

drop policy if exists "Quote page visitors upload into a live session" on storage.objects;
create policy "Quote page visitors upload into a live session" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'quote-page-photos' and public.lead_page_upload_allowed(name));

drop policy if exists "Firm reads its quote page photos" on storage.objects;
create policy "Firm reads its quote page photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'quote-page-photos'
         and (storage.foldername(name))[1] in (select public.my_employer_scope()::text));

-- ── Helpers ─────────────────────────────────────────────────────────────
create or replace function public._lead_page_ip_hash()
returns text
language plpgsql stable security definer
set search_path = public
as $$
declare h json; ip text;
begin
  begin
    h := current_setting('request.headers', true)::json;
  exception when others then
    h := null;
  end;
  ip := coalesce(
    nullif(trim(split_part(h->>'x-forwarded-for', ',', 1)), ''),
    nullif(h->>'cf-connecting-ip', ''),
    nullif(h->>'x-real-ip', ''),
    'unknown');
  return md5('elec-mate-quote-page:' || ip);
end $$;
revoke all on function public._lead_page_ip_hash() from public, anon, authenticated;

create or replace function public._lead_page_firm(p_slug text)
returns uuid
language sql stable security definer
set search_path = public
as $$
  select user_id from public.company_profiles
   where lower(lead_page_slug) = lower(trim(coalesce(p_slug, '')))
     and lead_page_enabled = true
   order by updated_at desc nulls last
   limit 1
$$;
revoke all on function public._lead_page_firm(text) from public, anon, authenticated;

-- ── Public: render the page ─────────────────────────────────────────────
create or replace function public.get_lead_page(p_slug text)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $function$
declare
  v record;
  v_colour text;
  v_certs int := null;
  v_reviews jsonb := null;
  v_rev_n int;
  v_rev_avg numeric;
  v_scheme jsonb := null;
  v_insured jsonb := null;
begin
  if p_slug is null or length(p_slug) > 64 then
    return jsonb_build_object('found', false);
  end if;

  select cp.* into v
  from public.company_profiles cp
  where lower(cp.lead_page_slug) = lower(trim(p_slug))
  order by cp.updated_at desc nulls last
  limit 1;

  if v is null or not coalesce(v.lead_page_enabled, false) then
    return jsonb_build_object('found', false);
  end if;

  v_colour := coalesce(
    case when v.accent_color ~* '^#[0-9a-f]{6}$' then v.accent_color end,
    case when v.primary_color ~* '^#[0-9a-f]{6}$' then v.primary_color end);

  -- Registration: only while not expired (null expiry = as declared)
  if v.lead_page_show_registration and nullif(trim(v.registration_scheme), '') is not null
     and (v.registration_expiry is null or v.registration_expiry >= current_date) then
    v_scheme := jsonb_build_object(
      'scheme', left(trim(v.registration_scheme), 60),
      'number', nullif(left(trim(coalesce(v.registration_number, '')), 40), ''));
  end if;

  -- Insurance: provider named and not expired
  if v.lead_page_show_insurance and nullif(trim(v.insurance_provider), '') is not null
     and (v.insurance_expiry is null or v.insurance_expiry >= current_date) then
    v_insured := jsonb_build_object(
      'coverage', nullif(left(trim(coalesce(v.insurance_coverage, '')), 40), ''));
  end if;

  -- Certificates issued by the firm (owner + active team), only when meaningful
  if v.lead_page_show_certs then
    select count(*) into v_certs
    from public.reports r
    where r.status = 'completed' and r.deleted_at is null
      and r.user_id in (
        select v.user_id
        union
        select e.user_id from public.employer_employees e
         where e.employer_id = v.user_id and e.user_id is not null
           and lower(coalesce(e.status, '')) = 'active');
    if v_certs < 10 then v_certs := null; end if;
  end if;

  -- Reviews: only real, received, public ones
  select count(*), round(avg(cr.rating)::numeric, 1) into v_rev_n, v_rev_avg
  from public.client_reviews cr
  where cr.user_id = v.user_id and cr.is_public and cr.received_at is not null
    and cr.rating between 1 and 5;
  if v_rev_n > 0 then
    v_reviews := jsonb_build_object(
      'count', v_rev_n,
      'average', v_rev_avg,
      'items', coalesce((
        select jsonb_agg(jsonb_build_object('rating', x.rating, 'text', x.text, 'month', to_char(x.received_at, 'Mon YYYY')))
        from (
          select cr.rating, left(trim(cr.text), 400) as text, cr.received_at
          from public.client_reviews cr
          where cr.user_id = v.user_id and cr.is_public and cr.received_at is not null
            and cr.rating between 1 and 5 and nullif(trim(cr.text), '') is not null
          order by cr.received_at desc
          limit 3) x), '[]'::jsonb));
  end if;

  return jsonb_build_object(
    'found', true,
    'slug', lower(v.lead_page_slug),
    'company_name', coalesce(nullif(trim(v.company_name), ''), 'Your local electrician'),
    'logo', coalesce(nullif(v.logo_url, ''), v.logo_data_url),
    'phone', nullif(trim(v.company_phone), ''),
    'website', case when v.company_website ~* '^(https?://)?[a-z0-9.-]+\.[a-z]{2,}(/.*)?$' then v.company_website end,
    'headline', v.lead_page_headline,
    'about', v.lead_page_about,
    'colour', v_colour,
    'services', coalesce(to_jsonb(v.lead_page_services), '[]'::jsonb),
    'areas', coalesce(to_jsonb(v.lead_page_areas), '[]'::jsonb),
    'trust', jsonb_build_object(
      'registration', v_scheme,
      'insurance', v_insured,
      'trading_since', case when v.lead_page_trading_since between 1900 and extract(year from now())::int
                            then v.lead_page_trading_since end,
      'certificates', v_certs,
      'reviews', v_reviews)
  );
end;
$function$;
revoke all on function public.get_lead_page(text) from public;
grant execute on function public.get_lead_page(text) to anon, authenticated;

-- ── Public: count a page view ───────────────────────────────────────────
create or replace function public.record_lead_page_view(p_slug text)
returns void
language plpgsql security definer
set search_path = public
as $$
declare v_firm uuid := public._lead_page_firm(p_slug);
begin
  if v_firm is null then return; end if;
  insert into public.lead_page_stats (firm_id, day, views)
  values (v_firm, current_date, 1)
  on conflict (firm_id, day) do update
    set views = public.lead_page_stats.views + 1
    where public.lead_page_stats.views < 20000;
end $$;
revoke all on function public.record_lead_page_view(text) from public;
grant execute on function public.record_lead_page_view(text) to anon, authenticated;

-- ── Public: open a photo upload session ─────────────────────────────────
create or replace function public.begin_lead_page_upload(p_slug text)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare
  v_firm uuid := public._lead_page_firm(p_slug);
  v_ip text := public._lead_page_ip_hash();
  v_id uuid;
begin
  if v_firm is null then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;
  if (select count(*) from public.lead_page_requests
       where ip_hash = v_ip and kind = 'upload' and created_at > now() - interval '1 hour') >= 6
     or (select count(*) from public.lead_page_requests
       where firm_id = v_firm and kind = 'upload' and created_at > now() - interval '1 day') >= 60 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;
  insert into public.lead_page_requests (firm_id, kind, ip_hash)
  values (v_firm, 'upload', v_ip) returning id into v_id;
  return jsonb_build_object('ok', true, 'request_id', v_id, 'folder', v_firm::text || '/' || v_id::text);
end $$;
revoke all on function public.begin_lead_page_upload(text) from public;
grant execute on function public.begin_lead_page_upload(text) to anon, authenticated;

-- ── Public: submit a quote request ──────────────────────────────────────
create or replace function public.submit_quote_request(
  p_slug text,
  p_name text,
  p_email text default null,
  p_phone text default null,
  p_job_type text default null,
  p_details text default null,
  p_postcode text default null,
  p_timing text default null,
  p_request_id uuid default null,
  p_website text default null,      -- honeypot: real people never fill it
  p_elapsed_ms integer default null -- time on the form; bots post instantly
)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare
  v_firm uuid := public._lead_page_firm(p_slug);
  v_ip text := public._lead_page_ip_hash();
  v_name text := left(regexp_replace(trim(coalesce(p_name, '')), '\s+', ' ', 'g'), 120);
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_phone text := nullif(left(regexp_replace(trim(coalesce(p_phone, '')), '[^0-9+() -]', '', 'g'), 30), '');
  v_job text := nullif(left(trim(coalesce(p_job_type, '')), 60), '');
  v_details text := nullif(left(trim(coalesce(p_details, '')), 3000), '');
  v_pc text := nullif(upper(left(regexp_replace(trim(coalesce(p_postcode, '')), '\s+', ' ', 'g'), 10)), '');
  v_timing text := nullif(left(trim(coalesce(p_timing, '')), 40), '');
  v_contact text;
  v_photos text[] := '{}';
  v_lead uuid;
  v_notes text;
  v_key text;
begin
  if v_firm is null then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  -- Bots: honeypot filled or posted faster than a person can type. Pretend it
  -- worked so they learn nothing, store nothing, notify nobody.
  if nullif(trim(coalesce(p_website, '')), '') is not null
     or (p_elapsed_ms is not null and p_elapsed_ms < 2500) then
    insert into public.lead_page_requests (firm_id, kind, ip_hash) values (v_firm, 'blocked', v_ip);
    return jsonb_build_object('ok', true);
  end if;

  -- Validation
  if length(v_name) < 2 then
    return jsonb_build_object('ok', false, 'error', 'name');
  end if;
  if v_email is not null and (length(v_email) > 200 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    return jsonb_build_object('ok', false, 'error', 'email');
  end if;
  if v_phone is not null and length(regexp_replace(v_phone, '[^0-9]', '', 'g')) not between 7 and 15 then
    return jsonb_build_object('ok', false, 'error', 'phone');
  end if;
  if v_email is null and v_phone is null then
    return jsonb_build_object('ok', false, 'error', 'contact');
  end if;
  if v_details ~* '(https?://|www\.)\S+.*(https?://|www\.)\S+.*(https?://|www\.)' then
    return jsonb_build_object('ok', false, 'error', 'links');
  end if;

  v_contact := md5(coalesce(v_email, '') || '|' || coalesce(regexp_replace(v_phone, '[^0-9]', '', 'g'), ''));

  -- Rate limits (server side): per visitor, per contact, per firm
  if (select count(*) from public.lead_page_requests
       where ip_hash = v_ip and kind = 'submit' and created_at > now() - interval '1 hour') >= 3
     or (select count(*) from public.lead_page_requests
       where ip_hash = v_ip and kind = 'submit' and created_at > now() - interval '1 day') >= 8
     or (select count(*) from public.lead_page_requests
       where firm_id = v_firm and contact_hash = v_contact and kind = 'submit'
         and created_at > now() - interval '1 day') >= 2
     or (select count(*) from public.lead_page_requests
       where firm_id = v_firm and kind = 'submit' and created_at > now() - interval '1 day') >= 40 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;

  -- Photos uploaded in this visitor's session (only ones that really exist)
  if p_request_id is not null and exists (
       select 1 from public.lead_page_requests r
        where r.id = p_request_id and r.firm_id = v_firm and r.kind = 'upload' and r.submitted_at is null) then
    select coalesce(array_agg(o.name order by o.created_at), '{}') into v_photos
    from (select name, created_at from storage.objects
           where bucket_id = 'quote-page-photos'
             and name like v_firm::text || '/' || p_request_id::text || '/%'
           order by created_at limit 3) o;
  end if;

  v_notes := concat_ws(E'\n',
    case when v_job is not null then 'Job: ' || v_job end,
    case when v_timing is not null then 'When: ' || v_timing end,
    case when v_pc is not null then 'Postcode: ' || v_pc end,
    case when cardinality(v_photos) > 0 then 'Photos: ' || cardinality(v_photos) end,
    case when v_details is not null then E'\n' || v_details end);

  insert into public.employer_leads (user_id, name, email, phone, source, stage, notes,
                                     job_type, postcode, preferred_timing, photos)
  values (v_firm, v_name, v_email, v_phone, 'Quote page', 'New', nullif(v_notes, ''),
          v_job, v_pc, v_timing, v_photos)
  returning id into v_lead;

  if p_request_id is not null then
    update public.lead_page_requests set submitted_at = now(), lead_id = v_lead
     where id = p_request_id and firm_id = v_firm and kind = 'upload';
  end if;
  insert into public.lead_page_requests (firm_id, kind, ip_hash, contact_hash, lead_id, submitted_at)
  values (v_firm, 'submit', v_ip, v_contact, v_lead, now());

  insert into public.lead_page_stats (firm_id, day, enquiries)
  values (v_firm, current_date, 1)
  on conflict (firm_id, day) do update set enquiries = public.lead_page_stats.enquiries + 1;

  -- Emails (firm alert + customer confirmation) via quote-page-notify; async,
  -- never blocks the lead.
  begin
    select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    if v_key is not null then
      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/quote-page-notify',
        headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
        body := jsonb_build_object('lead_id', v_lead),
        timeout_milliseconds := 20000);
    end if;
  exception when others then
    raise warning '[submit_quote_request] notify: %', sqlerrm;
  end;

  -- Housekeeping
  delete from public.lead_page_requests where created_at < now() - interval '30 days';

  return jsonb_build_object('ok', true, 'reference', upper(substr(replace(v_lead::text, '-', ''), 1, 6)),
                            'photos', cardinality(v_photos));
end $$;
revoke all on function public.submit_quote_request(text, text, text, text, text, text, text, text, uuid, text, integer) from public;
grant execute on function public.submit_quote_request(text, text, text, text, text, text, text, text, uuid, text, integer) to anon, authenticated;

-- Legacy signature (old cached clients): same rules, no photos.
create or replace function public.submit_lead_enquiry(
  p_slug text, p_name text, p_email text, p_phone text, p_summary text
)
returns boolean
language plpgsql security definer
set search_path = public
as $$
declare r jsonb;
begin
  r := public.submit_quote_request(p_slug, p_name, p_email, p_phone, null, p_summary);
  return coalesce((r->>'ok')::boolean, false);
end $$;
revoke all on function public.submit_lead_enquiry(text, text, text, text, text) from public;
grant execute on function public.submit_lead_enquiry(text, text, text, text, text) to anon, authenticated;

-- ── Hub: read config + numbers (owner / admin) ──────────────────────────
create or replace function public.get_quote_page_admin()
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_role text := public.my_employer_role(v_firm);
  v record;
begin
  if auth.uid() is null or v_role not in ('owner', 'admin') then
    raise exception 'Only the owner or an admin can manage the quote page' using errcode = '42501';
  end if;
  select * into v from public.company_profiles where user_id = v_firm
   order by updated_at desc nulls last limit 1;

  return jsonb_build_object(
    'firm_id', v_firm,
    'role', v_role,
    'has_profile', v.id is not null,
    'company_name', v.company_name,
    'logo', coalesce(nullif(v.logo_url, ''), v.logo_data_url),
    'phone', v.company_phone,
    'colour', coalesce(v.accent_color, v.primary_color),
    'registration_scheme', v.registration_scheme,
    'registration_expiry', v.registration_expiry,
    'insurance_provider', v.insurance_provider,
    'insurance_expiry', v.insurance_expiry,
    'lead_page_slug', v.lead_page_slug,
    'lead_page_enabled', coalesce(v.lead_page_enabled, false),
    'lead_page_headline', v.lead_page_headline,
    'lead_page_about', v.lead_page_about,
    'lead_page_services', coalesce(to_jsonb(v.lead_page_services), '[]'::jsonb),
    'lead_page_areas', coalesce(to_jsonb(v.lead_page_areas), '[]'::jsonb),
    'lead_page_trading_since', v.lead_page_trading_since,
    'lead_page_show_certs', coalesce(v.lead_page_show_certs, true),
    'lead_page_show_registration', coalesce(v.lead_page_show_registration, true),
    'lead_page_show_insurance', coalesce(v.lead_page_show_insurance, true),
    'lead_page_on_documents', coalesce(v.lead_page_on_documents, true),
    'stats', (
      select jsonb_build_object(
        'views_7', coalesce(sum(views) filter (where day > current_date - 7), 0),
        'enquiries_7', coalesce(sum(enquiries) filter (where day > current_date - 7), 0),
        'views_30', coalesce(sum(views) filter (where day > current_date - 30), 0),
        'enquiries_30', coalesce(sum(enquiries) filter (where day > current_date - 30), 0),
        'views_all', coalesce(sum(views), 0),
        'enquiries_all', coalesce(sum(enquiries), 0))
      from public.lead_page_stats where firm_id = v_firm),
    'leads_all', (select count(*) from public.employer_leads where user_id = v_firm and source = 'Quote page'),
    'recent', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', l.id, 'name', l.name, 'created_at', l.created_at, 'stage', l.stage,
        'job_type', l.job_type, 'postcode', l.postcode, 'timing', l.preferred_timing,
        'phone', l.phone, 'email', l.email, 'notes', l.notes, 'photos', to_jsonb(l.photos))
        order by l.created_at desc)
      from (select * from public.employer_leads
             where user_id = v_firm and source = 'Quote page'
             order by created_at desc limit 10) l), '[]'::jsonb)
  );
end $$;
revoke all on function public.get_quote_page_admin() from public, anon;
grant execute on function public.get_quote_page_admin() to authenticated;

-- ── Hub: save (owner / admin) ───────────────────────────────────────────
create or replace function public.update_quote_page(p_patch jsonb)
returns jsonb
language plpgsql security definer
set search_path = public
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_role text := public.my_employer_role(v_firm);
  v_id uuid;
  v_slug text;
  v_services text[];
  v_areas text[];
  v_year int;
begin
  if auth.uid() is null or v_role not in ('owner', 'admin') then
    raise exception 'Only the owner or an admin can manage the quote page' using errcode = '42501';
  end if;
  if p_patch is null or jsonb_typeof(p_patch) <> 'object' then
    raise exception 'Nothing to save' using errcode = '22023';
  end if;

  select id into v_id from public.company_profiles where user_id = v_firm
   order by updated_at desc nulls last limit 1;
  if v_id is null then
    insert into public.company_profiles (user_id, company_name)
    values (v_firm, coalesce((select nullif(trim(full_name), '') from public.profiles where id = v_firm), 'My company'))
    returning id into v_id;
  end if;

  if p_patch ? 'lead_page_slug' then
    v_slug := lower(trim(coalesce(p_patch->>'lead_page_slug', '')));
    if v_slug !~ '^[a-z0-9](?:[a-z0-9-]{1,46}[a-z0-9])$' or v_slug ~ '--' then
      raise exception 'Use 3 to 48 letters, numbers or single dashes for the link name' using errcode = '22023';
    end if;
    if exists (select 1 from public.company_profiles
                where lower(lead_page_slug) = v_slug and user_id <> v_firm) then
      raise exception 'That link name is already taken' using errcode = '23505';
    end if;
    update public.company_profiles set lead_page_slug = v_slug where id = v_id;
  end if;

  if p_patch ? 'lead_page_services' then
    select coalesce(array_agg(s order by ord), '{}') into v_services from (
      select s, ord from (
        select s, ord, row_number() over (partition by lower(s) order by ord) as rn from (
          select left(trim(x), 40) as s, ord
            from jsonb_array_elements_text(coalesce(p_patch->'lead_page_services', '[]')) with ordinality t(x, ord)
        ) a where s <> ''
      ) b where rn = 1 order by ord limit 12) c;
    update public.company_profiles set lead_page_services = v_services where id = v_id;
  end if;
  if p_patch ? 'lead_page_areas' then
    select coalesce(array_agg(s order by ord), '{}') into v_areas from (
      select s, ord from (
        select s, ord, row_number() over (partition by lower(s) order by ord) as rn from (
          select left(trim(x), 40) as s, ord
            from jsonb_array_elements_text(coalesce(p_patch->'lead_page_areas', '[]')) with ordinality t(x, ord)
        ) a where s <> ''
      ) b where rn = 1 order by ord limit 20) c;
    update public.company_profiles set lead_page_areas = v_areas where id = v_id;
  end if;
  if p_patch ? 'lead_page_trading_since' then
    v_year := nullif(p_patch->>'lead_page_trading_since', '')::int;
    if v_year is not null and (v_year < 1900 or v_year > extract(year from now())::int) then
      raise exception 'Enter the year you started trading, for example 2014' using errcode = '22023';
    end if;
    update public.company_profiles set lead_page_trading_since = v_year where id = v_id;
  end if;

  update public.company_profiles set
    lead_page_headline = case when p_patch ? 'lead_page_headline'
      then nullif(left(trim(coalesce(p_patch->>'lead_page_headline', '')), 280), '') else lead_page_headline end,
    lead_page_about = case when p_patch ? 'lead_page_about'
      then nullif(left(trim(coalesce(p_patch->>'lead_page_about', '')), 1200), '') else lead_page_about end,
    lead_page_enabled = case when p_patch ? 'lead_page_enabled'
      then coalesce((p_patch->>'lead_page_enabled')::boolean, false) and lead_page_slug is not null
      else lead_page_enabled end,
    lead_page_show_certs = case when p_patch ? 'lead_page_show_certs'
      then coalesce((p_patch->>'lead_page_show_certs')::boolean, true) else lead_page_show_certs end,
    lead_page_show_registration = case when p_patch ? 'lead_page_show_registration'
      then coalesce((p_patch->>'lead_page_show_registration')::boolean, true) else lead_page_show_registration end,
    lead_page_show_insurance = case when p_patch ? 'lead_page_show_insurance'
      then coalesce((p_patch->>'lead_page_show_insurance')::boolean, true) else lead_page_show_insurance end,
    lead_page_on_documents = case when p_patch ? 'lead_page_on_documents'
      then coalesce((p_patch->>'lead_page_on_documents')::boolean, true) else lead_page_on_documents end,
    updated_at = now()
  where id = v_id;

  return public.get_quote_page_admin();
end $$;
revoke all on function public.update_quote_page(jsonb) from public, anon;
grant execute on function public.update_quote_page(jsonb) to authenticated;

-- ── Bell: say what the job is ───────────────────────────────────────────
create or replace function public.notify_owner_new_lead()
returns trigger
language plpgsql security definer
set search_path to 'public'
as $function$
begin
  if NEW.source = 'Quote page' then
    perform worker_notify(
      NEW.user_id,
      'new_lead',
      'New quote request',
      coalesce(nullif(trim(NEW.name), ''), 'Someone') || ' asked for a quote'
        || case when NEW.job_type is not null then ': ' || NEW.job_type
                when NEW.notes is not null and length(trim(NEW.notes)) > 0
                then ': ' || left(trim(NEW.notes), 120) else '' end
        || case when NEW.postcode is not null then ' (' || NEW.postcode || ')' else '' end
        || case when cardinality(NEW.photos) > 0 then ', with photos' else '' end,
      jsonb_build_object('route', '/employer?section=leads', 'lead_id', NEW.id, 'source', NEW.source)
    );
  end if;
  return NEW;
exception when others then
  raise warning '[notify_owner_new_lead] %', sqlerrm;
  return new;
end;
$function$;
-- Trigger functions need no EXECUTE grant
revoke all on function public.notify_owner_new_lead() from public, anon, authenticated;
