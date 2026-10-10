-- ELE-2094 (gap #8, "one front door"): the Employer Hub's Leads page IS the
-- Enquiries system. Same `enquiries` table, same AI reader, same sources.
--
-- Additive only:
--   * two nullable link columns on enquiries (booking, firm job)
--   * read functions that show enquiries + legacy employer_leads rows + online
--     bookings as one list, and one thread per customer
--   * adopt_front_door_item: when the office acts on a legacy lead or a
--     booking, a COPY is made in enquiries (linked back by id). The original
--     row is never changed, moved or deleted.
-- No policy, column, FK, trigger or existing function is changed.

alter table public.enquiries
  add column if not exists booking_id uuid references public.employer_online_bookings(id) on delete set null,
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;

comment on column public.enquiries.booking_id is
  'ELE-2094: the online booking (employer_online_bookings) this enquiry came from. Set by adopt_front_door_item.';
comment on column public.enquiries.employer_job_id is
  'ELE-2094: the firm job made from this enquiry in the Employer Hub (one tap, details carried).';

create unique index if not exists enquiries_booking_id_uq
  on public.enquiries (booking_id) where booking_id is not null;
create index if not exists enquiries_employer_lead_id_idx
  on public.enquiries (employer_lead_id) where employer_lead_id is not null;
create index if not exists enquiries_employer_job_id_idx
  on public.enquiries (employer_job_id) where employer_job_id is not null;

-- ── Helpers ──────────────────────────────────────────────────────────────

-- Last 10 digits of a UK number, +44 folded to 0 ("07700 900123" = "+447700900123").
create or replace function public._fd_phone_key(p text)
returns text
language sql immutable
set search_path = public
as $$
  select nullif(right(regexp_replace(regexp_replace(coalesce(p, ''), '\D', '', 'g'), '^44', '0'), 10), '')
$$;

-- The firm's customer for an email or phone (oldest first), or null.
create or replace function public._fd_match_customer(p_firm uuid, p_email text, p_phone text)
returns uuid
language sql stable security definer
set search_path = public
as $$
  select c.id
    from public.customers c
   where c.user_id = p_firm
     and (
       (nullif(lower(trim(coalesce(p_email, ''))), '') is not null
          and lower(trim(c.email)) = lower(trim(p_email)))
       or (length(coalesce(public._fd_phone_key(p_phone), '')) = 10
          and public._fd_phone_key(c.phone) = public._fd_phone_key(p_phone))
     )
   order by c.created_at
   limit 1
$$;

revoke all on function public._fd_match_customer(uuid, text, text) from public, anon, authenticated;

-- One stage word for the list, from what has actually happened.
--   new     nobody has replied yet
--   open    replied / in touch / added as a customer
--   quoted  a quote exists and is not decided
--   job     a firm job exists (no quote decided)
--   won     the quote was ACCEPTED (never earlier)
--   lost    the quote was declined
--   closed  dismissed / declined booking
--   spam
create or replace function public._fd_enquiry_stage(
  p_status text, p_first_actioned timestamptz, p_visit text,
  p_quote_status text, p_quote_acceptance text, p_has_quote boolean, p_has_job boolean)
returns text
language sql immutable
set search_path = public
as $$
  select case
    when p_status = 'spam' then 'spam'
    when p_has_quote and (p_quote_acceptance = 'accepted' or p_quote_status = 'approved') then 'won'
    when p_has_quote and (p_quote_acceptance in ('rejected', 'declined') or p_quote_status in ('rejected', 'declined')) then 'lost'
    when p_status = 'dismissed' then 'closed'
    when p_has_quote then 'quoted'
    when p_has_job then 'job'
    when p_first_actioned is not null or p_visit = 'booked' or p_status = 'converted' then 'open'
    else 'new'
  end
$$;

-- ── The one list ─────────────────────────────────────────────────────────

create or replace function public.get_firm_front_door(p_firm uuid)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_items jsonb;
  v_spam int;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  with enq as (
    select e.*, q.id as q_id, q.quote_number as q_number, q.status as q_status,
           q.acceptance_status as q_acceptance, q.accepted_at as q_accepted_at, q.total as q_total,
           coalesce(c.name, mc.name) as cust_name,
           l.photos as lead_photos
      from public.enquiries e
      left join public.quotes q on q.id = e.quote_id and q.deleted_at is null
      left join public.customers c on c.id = e.customer_id
      left join public.customers mc on mc.id = e.matched_customer_id
      left join public.employer_leads l on l.id = e.employer_lead_id
     where e.user_id = p_firm and e.status <> 'spam'
     order by e.received_at desc
     limit 300
  ),
  items as (
    select jsonb_build_object(
      'kind', 'enquiry', 'id', e.id, 'enquiry_id', e.id,
      'source', e.source, 'name', e.name, 'email', e.email, 'phone', e.phone,
      'address', e.address, 'postcode', e.postcode,
      'job_type', e.job_type, 'job_key', e.job_key, 'summary', e.summary,
      'details', e.job_description, 'urgency', e.urgency,
      'received_at', e.received_at, 'first_actioned_at', e.first_actioned_at,
      'photo_count', coalesce(array_length(e.photos, 1), 0) + coalesce(array_length(e.lead_photos, 1), 0),
      'photo_danger', e.photo_danger, 'fit_note', e.fit_note, 'not_our_work', e.not_our_work,
      'distance_miles', e.distance_miles, 'is_test', e.is_test,
      'stage', public._fd_enquiry_stage(e.status, e.first_actioned_at, e.visit_status,
                 e.q_status, e.q_acceptance, e.q_id is not null, e.employer_job_id is not null),
      'customer_id', coalesce(e.customer_id, e.matched_customer_id),
      'customer_name', e.cust_name,
      'quote', case when e.q_id is null then null else jsonb_build_object(
                 'id', e.q_id, 'number', e.q_number, 'status', e.q_status,
                 'accepted', coalesce(e.q_acceptance = 'accepted' or e.q_status = 'approved', false),
                 'accepted_at', e.q_accepted_at,
                 'total', case when v_money then e.q_total end) end,
      'job_id', e.employer_job_id,
      'booking_id', e.booking_id, 'lead_id', e.employer_lead_id,
      'sort_at', e.received_at
    ) as j
    from enq e

    union all

    -- Legacy Hub leads that never reached Enquiries (read only, untouched)
    select jsonb_build_object(
      'kind', 'lead', 'id', l.id, 'enquiry_id', null,
      'source', case when l.source = 'Quote page' then 'quote_page' else 'manual' end,
      'source_text', l.source,
      'name', l.name, 'contact_name', l.contact_name, 'email', l.email, 'phone', l.phone,
      'address', null, 'postcode', l.postcode,
      'job_type', l.job_type, 'job_key', null, 'summary', null,
      'details', nullif(concat_ws(E'\n\n', nullif(trim(l.notes), ''),
                   case when nullif(trim(l.preferred_timing), '') is not null
                        then 'Best time: ' || l.preferred_timing end), ''),
      'urgency', null,
      'received_at', l.created_at,
      'first_actioned_at', case when l.stage <> 'New' then l.updated_at end,
      'photo_count', coalesce(array_length(l.photos, 1), 0),
      'photo_danger', false, 'fit_note', null, 'not_our_work', false,
      'distance_miles', null, 'is_test', false,
      'stage', case l.stage when 'New' then 'new' when 'Contacted' then 'open'
                 when 'Quoted' then 'quoted' when 'Won' then 'won' when 'Lost' then 'lost' else 'open' end,
      'customer_id', coalesce(l.converted_customer_id,
                       public._fd_match_customer(p_firm, l.email, l.phone)),
      'customer_name', c.name,
      'quote', null, 'job_id', null, 'booking_id', null, 'lead_id', l.id,
      'value', case when v_money and l.estimated_value > 0 then l.estimated_value end,
      'sort_at', l.created_at
    )
    from public.employer_leads l
    left join public.customers c on c.id = l.converted_customer_id
    where l.user_id = p_firm
      and not exists (select 1 from public.enquiries x where x.employer_lead_id = l.id)

    union all

    -- Online bookings (ELE-2079) not yet in Enquiries
    select jsonb_build_object(
      'kind', 'booking', 'id', b.id, 'enquiry_id', null,
      'source', 'booking', 'source_text', b.source,
      'name', b.customer_name, 'email', b.customer_email, 'phone', b.customer_phone,
      'address', b.address, 'postcode', b.postcode,
      'job_type', b.type_label, 'job_key', null, 'summary', null,
      'details', b.notes, 'urgency', null,
      'received_at', b.created_at, 'first_actioned_at', b.decided_at,
      'photo_count', 0, 'photo_danger', false, 'fit_note', null, 'not_our_work', false,
      'distance_miles', null, 'is_test', false,
      'stage', case b.status when 'tentative' then 'new' when 'confirmed' then 'job' else 'closed' end,
      'customer_id', public._fd_match_customer(p_firm, b.customer_email, b.customer_phone),
      'customer_name', (select c.name from public.customers c
                         where c.id = public._fd_match_customer(p_firm, b.customer_email, b.customer_phone)),
      'quote', null, 'job_id', b.job_id, 'booking_id', b.id, 'lead_id', null,
      'booking', jsonb_build_object('reference', b.reference, 'status', b.status,
                   'label', public._booking_half_label(b.day, b.half), 'day', b.day),
      'sort_at', b.created_at
    )
    from public.employer_online_bookings b
    where b.firm_id = p_firm
      and b.created_at > now() - interval '180 days'
      and not exists (select 1 from public.enquiries x where x.booking_id = b.id)
  )
  select coalesce(jsonb_agg(j order by (j->>'sort_at')::timestamptz desc), '[]'::jsonb)
    into v_items from items;

  select count(*) into v_spam from public.enquiries where user_id = p_firm and status = 'spam';

  return jsonb_build_object('money', v_money, 'spam', v_spam, 'items', v_items);
end;
$$;

-- ── Counts for the Overview and the Clients hub ─────────────────────────

create or replace function public.get_firm_front_door_counts(p_firm uuid)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v jsonb;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  with waiting as (
    select e.received_at as at, e.name as name, coalesce(e.urgency = 'emergency', false) as urgent, 'enquiry' as kind, e.id
      from public.enquiries e
     where e.user_id = p_firm and e.status = 'new' and e.first_actioned_at is null
       and e.quote_id is null and e.employer_job_id is null and not e.is_test
    union all
    select l.created_at, l.name, false, 'lead', l.id
      from public.employer_leads l
     where l.user_id = p_firm and l.stage = 'New'
       and not exists (select 1 from public.enquiries x where x.employer_lead_id = l.id)
    union all
    select b.created_at, b.customer_name, false, 'booking', b.id
      from public.employer_online_bookings b
     where b.firm_id = p_firm and b.status = 'tentative'
       and not exists (select 1 from public.enquiries x where x.booking_id = b.id)
  )
  select jsonb_build_object(
    'to_reply', count(*),
    'urgent', count(*) filter (where urgent),
    'oldest_at', min(at),
    'first', (select jsonb_build_object('kind', w2.kind, 'id', w2.id, 'name', w2.name, 'at', w2.at)
                from waiting w2 order by w2.urgent desc, w2.at asc limit 1),
    'week', (select count(*) from public.enquiries e
              where e.user_id = p_firm and e.status <> 'spam' and not e.is_test
                and e.received_at > now() - interval '7 days')
          + (select count(*) from public.employer_leads l
              where l.user_id = p_firm and l.created_at > now() - interval '7 days'
                and not exists (select 1 from public.enquiries x where x.employer_lead_id = l.id))
          + (select count(*) from public.employer_online_bookings b
              where b.firm_id = p_firm and b.created_at > now() - interval '7 days'
                and not exists (select 1 from public.enquiries x where x.booking_id = b.id))
  ) into v
  from waiting;
  return v;
end;
$$;

-- ── One item, in full ────────────────────────────────────────────────────

create or replace function public.get_front_door_item(p_kind text, p_id uuid)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v jsonb;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  if p_kind = 'enquiry' then
    select e.user_id into v_firm from public.enquiries e where e.id = p_id;
  elsif p_kind = 'lead' then
    select l.user_id into v_firm from public.employer_leads l where l.id = p_id;
  elsif p_kind = 'booking' then
    select b.firm_id into v_firm from public.employer_online_bookings b where b.id = p_id;
  end if;
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not found' using errcode = '42501';
  end if;

  if p_kind = 'enquiry' then
    select jsonb_build_object(
      'raw_from', e.raw_from, 'raw_subject', e.raw_subject, 'raw_text', e.raw_text,
      'draft_reply', e.draft_reply, 'sent_message', e.sent_message, 'replies', e.replies,
      'photo_findings', e.photo_findings, 'availability', e.availability,
      'voicemail_seconds', e.voicemail_seconds, 'contact_hidden', e.contact_hidden,
      'photos', coalesce((select jsonb_agg(jsonb_build_object('bucket', 'enquiry-photos', 'path', p))
                            from unnest(e.photos) p), '[]'::jsonb)
                || coalesce((select jsonb_agg(jsonb_build_object('bucket', 'quote-page-photos', 'path', p))
                               from public.employer_leads l, unnest(l.photos) p
                              where l.id = e.employer_lead_id), '[]'::jsonb)
    ) into v
    from public.enquiries e where e.id = p_id;
  elsif p_kind = 'lead' then
    select jsonb_build_object(
      'raw_text', l.notes, 'replies', '[]'::jsonb, 'photo_findings', '[]'::jsonb,
      'preferred_timing', l.preferred_timing,
      'photos', coalesce((select jsonb_agg(jsonb_build_object('bucket', 'quote-page-photos', 'path', p))
                            from unnest(l.photos) p), '[]'::jsonb)
    ) into v
    from public.employer_leads l where l.id = p_id;
  else
    select jsonb_build_object('raw_text', b.notes, 'replies', '[]'::jsonb,
             'photo_findings', '[]'::jsonb, 'photos', '[]'::jsonb)
      into v
      from public.employer_online_bookings b where b.id = p_id;
  end if;
  return v;
end;
$$;

-- ── One thread per customer ─────────────────────────────────────────────
-- Everything the firm has with this person: enquiries (any source), online
-- bookings, quotes and jobs. Matched on the customer record, or on email or
-- phone for rows that never got one. Messages come from
-- get_customer_conversation (ELE-2070) on the client side.

create or replace function public.get_front_door_thread(
  p_firm uuid, p_customer uuid, p_email text, p_phone text)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_phone text := public._fd_phone_key(p_phone);
  v_cust uuid := p_customer;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if length(coalesce(v_phone, '')) <> 10 then v_phone := null; end if;
  if v_cust is not null and not exists (select 1 from public.customers c where c.id = v_cust and c.user_id = p_firm) then
    v_cust := null;
  end if;
  if v_cust is null then
    v_cust := public._fd_match_customer(p_firm, v_email, v_phone);
  end if;
  -- The customer's own email and phone widen the match
  if v_cust is not null then
    select coalesce(v_email, nullif(lower(trim(c.email)), '')),
           coalesce(v_phone, case when length(coalesce(public._fd_phone_key(c.phone), '')) = 10
                                  then public._fd_phone_key(c.phone) end)
      into v_email, v_phone
      from public.customers c where c.id = v_cust;
  end if;
  v_money := public.can_see_firm_money(p_firm);

  if v_cust is null and v_email is null and v_phone is null then
    return jsonb_build_object('customer', null, 'enquiries', '[]'::jsonb, 'bookings', '[]'::jsonb,
                              'quotes', '[]'::jsonb, 'jobs', '[]'::jsonb);
  end if;

  return jsonb_build_object(
    'customer', (select jsonb_build_object('id', c.id, 'name', c.name, 'email', c.email,
                         'phone', c.phone, 'address', c.address, 'postcode', c.postcode)
                   from public.customers c where c.id = v_cust),
    'enquiries', coalesce((
      select jsonb_agg(jsonb_build_object('id', e.id, 'source', e.source, 'received_at', e.received_at,
               'title', coalesce(nullif(e.job_type, ''), e.summary, 'Enquiry'),
               'stage', public._fd_enquiry_stage(e.status, e.first_actioned_at, e.visit_status,
                          q.status, q.acceptance_status, q.id is not null, e.employer_job_id is not null),
               'replies', jsonb_array_length(coalesce(e.replies, '[]'::jsonb)))
             order by e.received_at desc)
        from public.enquiries e
        left join public.quotes q on q.id = e.quote_id and q.deleted_at is null
       where e.user_id = p_firm and e.status <> 'spam'
         and ((v_cust is not null and (e.customer_id = v_cust or e.matched_customer_id = v_cust))
              or (v_email is not null and lower(trim(e.email)) = v_email)
              or (v_phone is not null and public._fd_phone_key(e.phone) = v_phone))), '[]'::jsonb),
    'bookings', coalesce((
      select jsonb_agg(jsonb_build_object('id', b.id, 'reference', b.reference, 'status', b.status,
               'type', b.type_label, 'label', public._booking_half_label(b.day, b.half),
               'day', b.day, 'job_id', b.job_id, 'created_at', b.created_at)
             order by b.day desc)
        from public.employer_online_bookings b
       where b.firm_id = p_firm
         and ((v_email is not null and lower(trim(b.customer_email)) = v_email)
              or (v_phone is not null and public._fd_phone_key(b.customer_phone) = v_phone))), '[]'::jsonb),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object('id', q.id, 'number', q.quote_number, 'status', q.status,
               'accepted', coalesce(q.acceptance_status = 'accepted' or q.status = 'approved', false),
               'invoice', coalesce(q.invoice_raised, false),
               'title', q.job_details->>'title', 'created_at', q.created_at,
               'total', case when v_money then q.total end)
             order by q.created_at desc)
        from public.quotes q
       where q.user_id = p_firm and q.deleted_at is null
         and coalesce(q.invoice_raised, false) = false
         and ((v_cust is not null and q.customer_id = v_cust)
              or (v_email is not null and lower(trim(q.client_data->>'email')) = v_email))), '[]'::jsonb),
    'jobs', coalesce((
      select jsonb_agg(jsonb_build_object('id', j.id, 'title', j.title, 'status', j.status,
               'start_date', j.start_date, 'created_at', j.created_at)
             order by j.created_at desc)
        from public.employer_jobs j
       where j.user_id = p_firm and j.archived_at is null and coalesce(j.is_template, false) = false
         and ((v_cust is not null and j.customer_id = v_cust)
              or (v_email is not null and lower(trim(j.client_email)) = v_email)
              or (v_phone is not null and public._fd_phone_key(j.client_phone) = v_phone))), '[]'::jsonb)
  );
end;
$$;

-- ── Adopt: a legacy lead or a booking gets its Enquiries row ───────────
-- Copies, never moves. Idempotent: the same row comes back on a retry.

create or replace function public.adopt_front_door_item(p_kind text, p_id uuid)
returns uuid
language plpgsql volatile security definer
set search_path = public
as $$
declare
  v_id uuid;
  l public.employer_leads;
  b public.employer_online_bookings;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  if p_kind = 'enquiry' then
    select e.id into v_id from public.enquiries e
     where e.id = p_id and e.user_id in (select public.my_employer_scope());
    if v_id is null then raise exception 'Not found' using errcode = '42501'; end if;
    return v_id;
  end if;

  perform pg_advisory_xact_lock(hashtext('adopt_front_door:' || p_id::text));

  if p_kind = 'lead' then
    select * into l from public.employer_leads
     where id = p_id and user_id in (select public.my_employer_scope());
    if l.id is null then raise exception 'Not found' using errcode = '42501'; end if;
    select e.id into v_id from public.enquiries e where e.employer_lead_id = l.id order by e.created_at limit 1;
    if v_id is not null then return v_id; end if;
    insert into public.enquiries (
      user_id, source, status, name, email, phone, postcode, job_type, job_description, raw_text,
      received_at, customer_id, employer_lead_id, first_actioned_at)
    values (
      l.user_id,
      case when l.source = 'Quote page' then 'quote_page' else 'manual' end,
      case when l.stage = 'Lost' then 'dismissed'
           when l.converted_customer_id is not null then 'converted' else 'new' end,
      coalesce(nullif(trim(l.contact_name), ''), l.name),
      nullif(lower(trim(coalesce(l.email, ''))), ''),
      nullif(trim(coalesce(l.phone, '')), ''),
      nullif(trim(coalesce(l.postcode, '')), ''),
      nullif(trim(coalesce(l.job_type, '')), ''),
      nullif(concat_ws(E'\n\n', nullif(trim(l.notes), ''),
               case when nullif(trim(l.preferred_timing), '') is not null
                    then 'Best time: ' || l.preferred_timing end), ''),
      l.notes,
      l.created_at,
      l.converted_customer_id,
      l.id,
      case when l.stage <> 'New' then l.updated_at end)
    returning id into v_id;
    return v_id;
  end if;

  if p_kind = 'booking' then
    select * into b from public.employer_online_bookings
     where id = p_id and firm_id in (select public.my_employer_scope());
    if b.id is null then raise exception 'Not found' using errcode = '42501'; end if;
    select e.id into v_id from public.enquiries e where e.booking_id = b.id;
    if v_id is not null then return v_id; end if;
    insert into public.enquiries (
      user_id, source, status, name, email, phone, address, postcode, job_type, job_description,
      raw_text, received_at, latitude, longitude, booking_id, employer_job_id, first_actioned_at,
      customer_id)
    values (
      b.firm_id,
      case when b.source = 'quote_page' then 'quote_page' else 'website' end,
      case when b.status in ('declined', 'cancelled') then 'dismissed' else 'new' end,
      b.customer_name,
      nullif(lower(trim(coalesce(b.customer_email, ''))), ''),
      nullif(trim(coalesce(b.customer_phone, '')), ''),
      b.address, b.postcode, b.type_label, b.notes,
      concat_ws(E'\n', 'Online booking ' || b.reference || ': ' || b.type_label,
                public._booking_half_label(b.day, b.half), b.notes),
      b.created_at, b.lat, b.lng, b.id,
      (select j.id from public.employer_jobs j where j.id = b.job_id),
      b.decided_at,
      public._fd_match_customer(b.firm_id, b.customer_email, b.customer_phone))
    returning id into v_id;
    return v_id;
  end if;

  raise exception 'Unknown kind %', p_kind;
end;
$$;

revoke all on function public.get_firm_front_door(uuid) from public, anon;
revoke all on function public.get_firm_front_door_counts(uuid) from public, anon;
revoke all on function public.get_front_door_item(text, uuid) from public, anon;
revoke all on function public.get_front_door_thread(uuid, uuid, text, text) from public, anon;
revoke all on function public.adopt_front_door_item(text, uuid) from public, anon;
grant execute on function public.get_firm_front_door(uuid) to authenticated;
grant execute on function public.get_firm_front_door_counts(uuid) to authenticated;
grant execute on function public.get_front_door_item(text, uuid) to authenticated;
grant execute on function public.get_front_door_thread(uuid, uuid, text, text) to authenticated;
grant execute on function public.adopt_front_door_item(text, uuid) to authenticated;

comment on function public.get_firm_front_door(uuid) is
  'ELE-2094: the Employer Hub Enquiries list. enquiries + legacy employer_leads + online bookings, one shape. Firm scope via my_employer_scope; money only for can_see_firm_money.';
comment on function public.adopt_front_door_item(text, uuid) is
  'ELE-2094: copy a legacy lead or an online booking into enquiries when the office acts on it. Never changes the source row. Idempotent.';
