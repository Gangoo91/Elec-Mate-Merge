-- Policies the team reads and acknowledges (ELE-1946, ELE-2010).
--
-- employer_policies belongs to the firm (user_id = the owner's profiles.id) and
-- its existing policy already lets co-admins in through my_employer_scope().
-- This adds publishing and a per-version acknowledgement register:
--
--  - publish_firm_policy(): stamps a new version, and pushes "Policy to read and
--    sign" to everyone active on the firm's roster who is on the app. Returns
--    the people who are not, so the office knows who to chase.
--  - acknowledge_firm_policy(): the worker reads and signs in Worker Tools →
--    Sign-offs. Records who, when, which version, the signature, the phone's
--    location (when it gives one) and the device. Rings the firm's bell.
--  - get_firm_policy_tracker() / get_firm_policy_status(): "7 of 9 signed" per
--    policy, who is missing, and every acknowledgement for the PDF export.
--
-- Why not the College Hub's acknowledge-policy function: it writes
-- college_policies / policy_acknowledgements and checks college staff, so a
-- firm's worker cannot use it. This mirrors its rules (live version only, one
-- signature per version, re-sign on a new version) on the firm's own table.
--
-- Additive only: nullable columns, one new table, new functions.

alter table public.employer_policies
  add column if not exists version integer,
  add column if not exists published_version integer,
  add column if not exists published_at timestamptz,
  add column if not exists published_by uuid references public.profiles(id) on delete set null,
  add column if not exists ai_generated boolean,
  add column if not exists category text;

comment on column public.employer_policies.published_version is
  'The version the team was last asked to read and sign. Null = never published.';

create table if not exists public.employer_policy_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid not null references public.employer_policies(id) on delete cascade,
  policy_version integer not null,
  employer_id uuid not null references public.profiles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  employee_id uuid references public.employer_employees(id) on delete set null,
  signer_name text not null,
  signature text not null,
  signed_at timestamptz not null default now(),
  location jsonb,
  user_agent text,
  unique (policy_id, policy_version, user_id)
);

comment on table public.employer_policy_acknowledgements is
  '[EMPLOYER] A worker''s read-and-signed record of one version of a firm policy. Written only by acknowledge_firm_policy(); the signer and the firm''s managers read it. The SSIP / PQQ evidence that staff have read the policy.';

create index if not exists employer_policy_acks_policy_idx
  on public.employer_policy_acknowledgements (policy_id, policy_version);
create index if not exists employer_policy_acks_employer_idx
  on public.employer_policy_acknowledgements (employer_id);

alter table public.employer_policy_acknowledgements enable row level security;

create policy "Signers read their own policy acknowledgements"
  on public.employer_policy_acknowledgements for select to authenticated
  using (user_id = auth.uid());

create policy "Firm managers read the firm's policy acknowledgements"
  on public.employer_policy_acknowledgements for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

-- ── Publish ──────────────────────────────────────────────────────────────
create or replace function public.publish_firm_policy(p_policy_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_p record;
  v_version int;
  r record;
  v_notified jsonb := '[]'::jsonb;
  v_off jsonb := '[]'::jsonb;
begin
  if v_uid is null then
    raise exception 'Sign in to publish this policy' using errcode = '42501';
  end if;
  select id, user_id, name, status, published_version into v_p
    from public.employer_policies where id = p_policy_id;
  if v_p.id is null or v_p.user_id not in (select public.my_employer_scope()) then
    raise exception 'Only a manager at the firm can publish this policy' using errcode = '42501';
  end if;
  if v_p.status = 'Archived' then
    raise exception 'This policy is archived. Restore it before publishing.' using errcode = '22023';
  end if;

  v_version := coalesce(v_p.published_version, 0) + 1;
  update public.employer_policies
     set version = v_version,
         published_version = v_version,
         published_at = now(),
         published_by = v_uid,
         status = case when status = 'Draft' then 'Active' else status end
   where id = p_policy_id;

  for r in
    select e.id, e.name, e.user_id, e.email, e.phone
      from public.employer_employees e
     where e.employer_id = v_p.user_id
       and e.status ilike 'active'
     order by e.name
  loop
    if r.user_id is not null then
      if r.user_id <> v_uid then
        perform public.worker_notify(
          r.user_id,
          'policy_to_acknowledge',
          'Policy to read and sign',
          coalesce(nullif(trim(v_p.name), ''), 'Company policy') || ' (version ' || v_version || ')',
          jsonb_build_object(
            'route', '/electrician/worker-tools/signoffs?policy=' || v_p.id,
            'policy_id', v_p.id,
            'employee_id', r.id,
            'ref_id', 'policy:' || v_p.id || ':' || v_version
          )
        );
      end if;
      v_notified := v_notified || jsonb_build_array(jsonb_build_object('employee_id', r.id, 'name', r.name));
    else
      v_off := v_off || jsonb_build_array(jsonb_build_object(
        'employee_id', r.id, 'name', r.name,
        'email', nullif(trim(coalesce(r.email, '')), ''),
        'phone', nullif(trim(coalesce(r.phone, '')), '')
      ));
    end if;
  end loop;

  return jsonb_build_object('version', v_version, 'notified', v_notified, 'off_app', v_off);
end;
$$;

revoke all on function public.publish_firm_policy(uuid) from public, anon;
grant execute on function public.publish_firm_policy(uuid) to authenticated;

-- ── Acknowledge ──────────────────────────────────────────────────────────
create or replace function public.acknowledge_firm_policy(
  p_policy_id uuid,
  p_signature text,
  p_location jsonb default null,
  p_user_agent text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_p record;
  v_emp record;
  v_id uuid;
  v_at timestamptz;
begin
  if v_uid is null then
    raise exception 'Sign in to sign this policy' using errcode = '42501';
  end if;
  if coalesce(p_signature, '') = '' then
    raise exception 'A signature is required' using errcode = '22023';
  end if;

  select id, user_id, name, status, published_version into v_p
    from public.employer_policies where id = p_policy_id;
  if v_p.id is null then
    raise exception 'This policy is not for you' using errcode = '42501';
  end if;

  select e.id, e.name into v_emp
    from public.employer_employees e
   where e.user_id = v_uid and e.employer_id = v_p.user_id and e.status ilike 'active'
   order by e.created_at
   limit 1;
  if v_emp.id is null then
    raise exception 'This policy is not for you' using errcode = '42501';
  end if;
  if v_p.published_version is null or v_p.status = 'Archived' then
    raise exception 'This policy is not published, so it cannot be signed.' using errcode = '22023';
  end if;

  insert into public.employer_policy_acknowledgements (
    policy_id, policy_version, employer_id, user_id, employee_id,
    signer_name, signature, location, user_agent
  ) values (
    v_p.id, v_p.published_version, v_p.user_id, v_uid, v_emp.id,
    coalesce(nullif(trim(v_emp.name), ''), 'Team member'), p_signature, p_location, left(p_user_agent, 400)
  )
  on conflict (policy_id, policy_version, user_id) do nothing
  returning id, signed_at into v_id, v_at;

  if v_id is null then
    return jsonb_build_object('success', true, 'already_signed', true);
  end if;

  begin
    perform public.notify_employer_bell(
      v_p.user_id,
      'policy_acknowledged',
      coalesce(nullif(trim(v_emp.name), ''), 'A team member') || ' signed a policy',
      coalesce(nullif(trim(v_p.name), ''), 'Company policy') || ' · version ' || v_p.published_version,
      jsonb_build_object(
        'route', '/employer?section=policies&policy=' || v_p.id,
        'policy_id', v_p.id,
        'employee_id', v_emp.id,
        'ref_id', 'policy:' || v_p.id || ':' || v_p.published_version
      )
    );
  exception when others then
    raise warning '[acknowledge_firm_policy] notify: %', sqlerrm;
  end;

  return jsonb_build_object('success', true, 'id', v_id, 'signed_at', v_at, 'version', v_p.published_version);
end;
$$;

revoke all on function public.acknowledge_firm_policy(uuid, text, jsonb, text) from public, anon;
grant execute on function public.acknowledge_firm_policy(uuid, text, jsonb, text) to authenticated;

-- ── Tracker for one policy ───────────────────────────────────────────────
-- The active roster against the published version, and every acknowledgement
-- ever made (all versions) for the export.
create or replace function public.get_firm_policy_tracker(p_policy_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_p record;
begin
  select id, user_id, published_version, published_at into v_p
    from public.employer_policies where id = p_policy_id;
  if v_p.id is null or v_p.user_id not in (select public.my_employer_scope()) then
    raise exception 'Only a manager at the firm can see who has signed' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'policy_id', v_p.id,
    'version', v_p.published_version,
    'published_at', v_p.published_at,
    'people', coalesce((
      select jsonb_agg(x order by x.signed_at is not null, x.name)
        from (
          select e.id as employee_id, e.name, e.user_id is not null as on_app,
                 nullif(trim(coalesce(e.email, '')), '') as email,
                 nullif(trim(coalesce(e.phone, '')), '') as phone,
                 a.signed_at, a.location,
                 (select max(o.policy_version) from public.employer_policy_acknowledgements o
                   where o.policy_id = v_p.id and o.user_id = e.user_id) as last_version
            from public.employer_employees e
            left join public.employer_policy_acknowledgements a
              on a.policy_id = v_p.id and a.policy_version = v_p.published_version and a.user_id = e.user_id
           where e.employer_id = v_p.user_id
             and e.status ilike 'active'
        ) x
    ), '[]'::jsonb),
    'acknowledgements', coalesce((
      select jsonb_agg(jsonb_build_object(
               'signer_name', a.signer_name,
               'policy_version', a.policy_version,
               'signed_at', a.signed_at,
               'location', a.location,
               'user_agent', a.user_agent,
               'signature', a.signature
             ) order by a.policy_version desc, a.signed_at)
        from public.employer_policy_acknowledgements a
       where a.policy_id = v_p.id
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_firm_policy_tracker(uuid) from public, anon;
grant execute on function public.get_firm_policy_tracker(uuid) to authenticated;

-- ── Status of every policy, for the list and Overview ────────────────────
create or replace function public.get_firm_policy_status()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with firm as (select public.my_default_employer_id() as id),
  team as (
    select e.user_id
      from public.employer_employees e, firm
     where e.employer_id = firm.id and e.status ilike 'active'
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id,
           'name', p.name,
           'status', p.status,
           'review_date', p.review_date,
           'published_version', p.published_version,
           'published_at', p.published_at,
           'updated_at', p.updated_at,
           'team', (select count(*) from team),
           'acknowledged', (
             select count(distinct a.user_id)
               from public.employer_policy_acknowledgements a
              where a.policy_id = p.id
                and a.policy_version = p.published_version
                and a.user_id in (select t.user_id from team t where t.user_id is not null))
         ) order by p.name), '[]'::jsonb)
    from public.employer_policies p, firm
   where p.user_id = firm.id
     and auth.uid() is not null
     and firm.id in (select public.my_employer_scope())
     and coalesce(p.status, '') <> 'Archived';
$$;

revoke all on function public.get_firm_policy_status() from public, anon;
grant execute on function public.get_firm_policy_status() to authenticated;
