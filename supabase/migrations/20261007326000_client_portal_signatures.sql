-- ELE-1996 / ELE-1837 x ELE-1993 — the portal lists documents waiting for the
-- customer's signature, using the signing flow's own table and /sign/:token
-- page (signature_requests, created by create_signature_request). A request
-- belongs to this customer when its job, quote/invoice or certificate does.
-- Only open, unexpired, unrevoked requests of THIS firm are listed.

create or replace function public.client_portal_get(p_token text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  v_ip text := public._client_portal_ip();
  l public.client_portal_links;
  v_firm uuid;
  v_cust uuid;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_qs boolean;
  v_cards boolean;
  v_storage text := 'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/';
  v_links jsonb;
  v_review jsonb;
begin
  if not public._client_portal_rate_ok('ip:' || v_ip, 300, interval '10 minutes') then
    return jsonb_build_object('error', 'rate_limited');
  end if;
  if (select count(*) from public.client_portal_rate_events
       where bucket = 'bad:' || v_ip and created_at > now() - interval '10 minutes') >= 20 then
    return jsonb_build_object('error', 'rate_limited');
  end if;

  l := public._client_portal_link(p_token);
  if l.id is null then
    perform public._client_portal_rate_ok('bad:' || v_ip, 1000000, interval '10 minutes');
    return jsonb_build_object('error', 'not_found');
  end if;
  if l.revoked_at is not null then return jsonb_build_object('error', 'not_found'); end if;
  if not coalesce(l.is_active, true) then return jsonb_build_object('error', 'paused'); end if;
  if l.expires_at is not null and l.expires_at <= now() then
    return jsonb_build_object('error', 'expired');
  end if;

  v_firm := l.user_id;
  v_cust := l.customer_id;

  update public.client_portal_links
     set views_count = coalesce(views_count, 0) + 1, last_accessed_at = now()
   where id = l.id;

  select coalesce(cp.qs_approval_required, false),
         (cp.stripe_account_id is not null and cp.stripe_account_status = 'active')
    into v_qs, v_cards
    from public.company_profiles cp where cp.user_id = v_firm
   order by cp.updated_at desc nulls last limit 1;
  v_qs := coalesce(v_qs, false);
  v_cards := coalesce(v_cards, false);

  -- Review destinations: only links the firm itself saved, never invented.
  select jsonb_agg(jsonb_build_object(
           'label', coalesce(nullif(btrim(x->>'label'), ''), 'Leave a review'),
           'url', substring(x->>'url' from 'https?://[^[:space:]"<>]+')))
    into v_links
    from public.company_profiles cp
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(cp.review_links) = 'array' then cp.review_links else '[]'::jsonb end) x
   where cp.user_id = v_firm
     and cp.review_request_enabled is distinct from false
     and substring(x->>'url' from 'https?://[^[:space:]"<>]+') is not null;

  if v_links is not null and l.review_opt_out_at is null then
    select jsonb_build_object(
             'job_id', j.id,
             'job_title', j.title,
             'completed_at', coalesce(j.completed_at, j.end_date::timestamptz),
             'names', coalesce((
               select jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                 from public.employer_job_assignments a
                 join public.employer_employees e on e.id = a.employee_id
                 join public.profiles pr on pr.id = e.user_id and pr.show_me_to_customers
                where a.job_id = j.id
                  and lower(coalesce(a.status, '')) not in ('cancelled', 'declined', 'removed')
                  and btrim(coalesce(e.name, '')) <> ''), '[]'::jsonb),
             'links', v_links,
             'message', (select nullif(btrim(cp.review_request_message), '')
                           from public.company_profiles cp where cp.user_id = v_firm
                          order by cp.updated_at desc nulls last limit 1))
      into v_review
      from public.employer_jobs j
     where j.customer_id = v_cust and j.user_id = v_firm and j.archived_at is null
       and (j.completed_at is not null or j.board_stage = 'Complete'
            or lower(coalesce(j.status, '')) in ('completed', 'complete'))
       and coalesce(j.completed_at, j.updated_at) > now() - interval '90 days'
     order by coalesce(j.completed_at, j.updated_at) desc
     limit 1;
  end if;

  return jsonb_build_object(
    'firm', (
      select jsonb_build_object(
        'name', coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'Your electrician'),
        'logo_url', coalesce(nullif(cp.logo_url, ''),
                             case when length(coalesce(cp.logo_data_url, '')) between 1 and 400000
                                  then cp.logo_data_url end),
        'primary_color', nullif(cp.primary_color, ''),
        'accent_color', nullif(cp.accent_color, ''),
        'phone', nullif(btrim(cp.company_phone), ''),
        'email', nullif(btrim(cp.company_email), ''),
        'website', nullif(btrim(cp.company_website), ''),
        'registration_scheme', nullif(btrim(cp.registration_scheme), ''))
      from public.profiles p
      left join lateral (select * from public.company_profiles c2 where c2.user_id = p.id
                          order by c2.updated_at desc nulls last limit 1) cp on true
      where p.id = v_firm),
    'customer', (
      select jsonb_build_object('name', c.name, 'company_name', nullif(c.company_name, ''))
        from public.customers c where c.id = v_cust),
    'today', v_today,
    'jobs', coalesce((
      select jsonb_agg(row_to_json(j)::jsonb order by j.sort_rank, j.sort_date)
      from (
        select ej.id,
               ej.title,
               nullif(btrim(ej.location), '') as address,
               ej.start_date, ej.end_date,
               ej.completed_at,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete') then 'complete'
                 when ej.board_stage = 'On Hold' or lower(coalesce(ej.status, '')) in ('on hold', 'paused') then 'on_hold'
                 when ej.board_stage in ('In Progress', 'Testing')
                      or (ej.start_date is not null and ej.start_date <= v_today
                          and coalesce(ej.end_date, ej.start_date) >= v_today) then 'in_progress'
                 when ej.start_date is not null and ej.start_date > v_today then 'booked'
                 when lower(coalesce(ej.status, '')) = 'active' and ej.start_date is not null then 'in_progress'
                 else 'arranging'
               end as stage,
               (select jsonb_build_object(
                  'count', count(distinct a.employee_id),
                  'named', coalesce(jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                             filter (where pr.show_me_to_customers and btrim(coalesce(e.name, '')) <> ''), '[]'::jsonb),
                  'today', coalesce(jsonb_agg(distinct split_part(btrim(e.name), ' ', 1))
                             filter (where pr.show_me_to_customers and btrim(coalesce(e.name, '')) <> ''
                                     and v_today between a.start_date and coalesce(a.end_date, a.start_date)), '[]'::jsonb),
                  'today_count', count(distinct a.employee_id)
                             filter (where v_today between a.start_date and coalesce(a.end_date, a.start_date)),
                  'next_date', min(a.start_date) filter (where a.start_date >= v_today),
                  'next_time', (array_agg(a.start_time order by a.start_date)
                                 filter (where a.start_date >= v_today))[1])
                  from public.employer_job_assignments a
                  join public.employer_employees e on e.id = a.employee_id
                  left join public.profiles pr on pr.id = e.user_id
                 where a.job_id = ej.id
                   and lower(coalesce(a.status, '')) not in ('cancelled', 'declined', 'removed')
                   and coalesce(a.end_date, a.start_date) >= v_today) as crew,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete') then 2
                 else 1 end as sort_rank,
               case
                 when ej.completed_at is not null or ej.board_stage = 'Complete'
                      or lower(coalesce(ej.status, '')) in ('completed', 'complete')
                   then -extract(epoch from coalesce(ej.completed_at, ej.end_date::timestamptz, ej.updated_at))
                 else extract(epoch from coalesce(ej.start_date::timestamptz, ej.created_at))
               end as sort_date
          from public.employer_jobs ej
         where ej.customer_id = v_cust and ej.user_id = v_firm
           and ej.archived_at is null and coalesce(ej.is_template, false) = false
           and lower(coalesce(ej.status, '')) not in ('cancelled')
           and coalesce(ej.board_stage, '') <> 'Enquiry'
         order by ej.created_at desc
         limit 100
      ) j), '[]'::jsonb),
    'certificates', coalesce((
      select jsonb_agg(row_to_json(x)::jsonb order by x.sort_at desc)
      from (
        select r.id, r.report_type, r.certificate_number,
               r.inspection_date, r.next_inspection_due,
               nullif(btrim(r.installation_address), '') as address,
               case
                 when held.yes or (v_qs and r.user_id <> v_firm and not qs_ok.yes) then 'finalising'
                 when r.pdf_url like v_storage || '%' then 'ready'
                 else 'ask'
               end as state,
               case
                 when held.yes or (v_qs and r.user_id <> v_firm and not qs_ok.yes) then null
                 when r.pdf_url like v_storage || '%' then r.pdf_url
               end as pdf_url,
               coalesce(r.inspection_date::timestamptz, r.created_at) as sort_at
          from public.reports r
          cross join lateral (select exists (
              select 1 from public.quotes q
               where q.linked_certificate_id = r.report_id and q.user_id = v_firm
                 and q.deleted_at is null and q.certificate_release_mode = 'on_payment'
                 and q.certificate_released_at is null) as yes) held
          cross join lateral (select exists (
              select 1 from public.report_qs_reviews qr
               where qr.report_uuid = r.id and qr.status = 'approved') as yes) qs_ok
         where r.customer_id = v_cust
           and (r.user_id = v_firm or r.user_id in (
                 select e.user_id from public.employer_employees e
                  where e.employer_id = v_firm and e.user_id is not null))
           and r.deleted_at is null and r.status = 'completed' and r.superseded_by is null
         order by coalesce(r.inspection_date::timestamptz, r.created_at) desc
         limit 60
      ) x), '[]'::jsonb),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q.id,
               'number', q.quote_number,
               'title', nullif(btrim(q.job_details->>'title'), ''),
               'total', coalesce(q.total, 0),
               'sent_at', coalesce(q.first_sent_at, q.created_at),
               'expires_at', q.expiry_date,
               'is_estimate', coalesce(q.is_estimate, false),
               'url', '/public-quote/' || q.public_token)
             order by q.created_at desc)
        from public.quotes q
       where q.customer_id = v_cust and q.user_id = v_firm
         and q.deleted_at is null and not coalesce(q.invoice_raised, false)
         and q.status = 'sent' and coalesce(q.acceptance_status, 'pending') = 'pending'
         and q.public_token is not null and coalesce(q.is_active_version, true)
         and (q.expiry_date is null or q.expiry_date >= now())), '[]'::jsonb),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q.id,
               'number', coalesce(q.invoice_number, q.quote_number),
               'title', nullif(btrim(q.job_details->>'title'), ''),
               'total', coalesce(q.total, 0),
               'paid_so_far', least(coalesce(q.total_paid, 0), coalesce(q.total, 0)),
               'issued_at', coalesce(q.invoice_date, q.invoice_sent_at, q.created_at),
               'due_date', q.invoice_due_date,
               'state', case
                          when lower(coalesce(q.invoice_status, '')) = 'paid' or q.invoice_paid_at is not null then 'paid'
                          when q.invoice_due_date is not null and q.invoice_due_date::date < v_today then 'overdue'
                          when coalesce(q.total_paid, 0) > 0 then 'part_paid'
                          else 'due' end,
               'pay_url', case
                            when lower(coalesce(q.invoice_status, '')) = 'paid' or q.invoice_paid_at is not null then null
                            when v_cards or q.stripe_payment_link_url is not null then '/pay/' || q.id
                          end,
               'pdf_url', case when q.pdf_url like v_storage || '%' then q.pdf_url end)
             order by coalesce(q.invoice_date, q.created_at) desc)
        from public.quotes q
       where q.customer_id = v_cust and q.user_id = v_firm
         and q.deleted_at is null and coalesce(q.invoice_raised, false)
         and lower(coalesce(q.invoice_status, '')) <> 'draft'), '[]'::jsonb),
    'bank_details', (
      select nullif(btrim(concat_ws(E'\n',
        case when coalesce(cp.bank_details->>'accountName', '') <> '' then 'Account name: ' || (cp.bank_details->>'accountName') end,
        case when coalesce(cp.bank_details->>'sortCode', '') <> '' then 'Sort code: ' || (cp.bank_details->>'sortCode') end,
        case when coalesce(cp.bank_details->>'accountNumber', '') <> '' then 'Account number: ' || (cp.bank_details->>'accountNumber') end
      )), '')
      from public.company_profiles cp where cp.user_id = v_firm
      order by cp.updated_at desc nulls last limit 1),
    'messages', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', m.id, 'message', m.message,
               'from', case when m.sender_type = 'client' then 'you' else 'firm' end,
               'created_at', m.created_at) order by m.created_at)
        from (select * from public.employer_client_messages
               where customer_id = v_cust and firm_id = v_firm
               order by created_at desc limit 200) m), '[]'::jsonb),
    'signatures', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', s.id,
               'type', s.document_type,
               'title', s.document_title,
               'expires_at', s.expires_at,
               'url', '/sign/' || s.access_token)
             order by s.created_at desc)
        from public.signature_requests s
       where s.user_id = v_firm
         and s.status in ('Pending', 'Sent', 'Viewed') and s.revoked_at is null
         and (s.expires_at is null or s.expires_at > now())
         and s.access_token is not null
         and (s.job_id in (select j2.id from public.employer_jobs j2
                            where j2.customer_id = v_cust and j2.user_id = v_firm)
              or (s.document_type in ('Quote', 'Invoice') and s.document_id in (
                    select q2.id from public.quotes q2
                     where q2.customer_id = v_cust and q2.user_id = v_firm and q2.deleted_at is null))
              or (s.document_type = 'Certificate' and s.document_id in (
                    select r2.id from public.reports r2
                     where r2.customer_id = v_cust and r2.deleted_at is null)))), '[]'::jsonb),
    'review', v_review,
    'expires_at', l.expires_at
  );
end $$;
revoke all on function public.client_portal_get(text) from public;
grant execute on function public.client_portal_get(text) to anon, authenticated;
