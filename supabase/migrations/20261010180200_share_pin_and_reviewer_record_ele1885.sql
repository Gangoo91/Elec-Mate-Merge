-- ELE-1885 / ELE-2016: shared portfolio link, finished.
--
-- Andrew, 6 Oct: the portfolio-evidence bucket STAYS PUBLIC. Nothing here
-- touches storage; files keep coming through sign-shared-portfolio-evidence.
--
-- Already live (20261008061000): expiry presets with a 90-day ceiling,
-- revoke, the open log (portfolio_share_views), decisions + witness
-- statements on the share. This adds:
--
-- 1. Optional PIN. A share with a PIN is opened at /view/<public_token>; the
--    real token (what every existing token RPC and edge function reads) is
--    rotated when the PIN is set and is only handed out by
--    unlock_shared_portfolio after the right PIN. So no existing function
--    changes, and an old copy of the link stops working once a PIN is added.
--    Five wrong PINs in 15 minutes lock the link for 15 minutes and tell the
--    learner.
-- 2. _shared_portfolio_record (live definition kept) also returns:
--      criteria       every criterion with the same states get_portfolio_ac_state
--                     gives (AI suggestions read as not started: never fact)
--      item_criteria  what the learner mapped each shared item to (never AI)
--      otj            verified hours from _otj_summary_core (the OTJ source of truth)
--      decisions[].assessor_qualifications, decisions[].assessed_at
-- 3. request_to_assess: a reviewer on the share asks to become the learner's
--    assessor. The learner gets a notification that opens the invite sheet
--    filled in; nothing is created until the learner sends the invite.

-- ── 1. PIN ──────────────────────────────────────────────────────────────────
alter table public.portfolio_shares
  add column if not exists public_token text,
  add column if not exists pin_hash text,
  add column if not exists pin_set_at timestamptz;

create unique index if not exists portfolio_shares_public_token_key
  on public.portfolio_shares (public_token) where public_token is not null;

comment on column public.portfolio_shares.public_token is
  'ELE-1885: set only when the share has a PIN. The link is /view/<public_token>; the real token is released by unlock_shared_portfolio after the right PIN.';
comment on column public.portfolio_shares.pin_hash is
  'ELE-1885: bcrypt hash of the optional 4 to 8 digit PIN. Set by set_share_pin only.';

create table if not exists public.portfolio_share_pin_attempts (
  id uuid primary key default gen_random_uuid(),
  share_id uuid not null references public.portfolio_shares(id) on delete cascade,
  ok boolean not null,
  ip text,
  attempted_at timestamptz not null default now()
);
create index if not exists portfolio_share_pin_attempts_share_idx
  on public.portfolio_share_pin_attempts (share_id, attempted_at desc);

comment on table public.portfolio_share_pin_attempts is
  '[PORTFOLIO] Each PIN entered on a PIN-protected share link (ELE-1885), right or wrong. Scope: the share owner (learner). Used by: unlock_shared_portfolio (writes, lockout after 5 wrong in 15 minutes), SharePortfolioSheet (wrong attempts). Rule: written only by unlock_shared_portfolio; no client insert/update/delete.';

alter table public.portfolio_share_pin_attempts enable row level security;
drop policy if exists "Share owner reads PIN attempts" on public.portfolio_share_pin_attempts;
create policy "Share owner reads PIN attempts" on public.portfolio_share_pin_attempts
  for select to authenticated
  using (exists (select 1 from public.portfolio_shares s
                  where s.id = portfolio_share_pin_attempts.share_id
                    and s.user_id = (select auth.uid())));
revoke all on public.portfolio_share_pin_attempts from anon, authenticated;
grant select on public.portfolio_share_pin_attempts to authenticated;
grant all on public.portfolio_share_pin_attempts to service_role;

insert into public.notification_types (type, category, push, importance)
values ('share_pin_locked', 'apprentice', true, 1),
       ('assessor_request', 'apprentice', true, 1)
on conflict (type) do nothing;

create or replace function public._share_random_token(p_len int default 24)
returns text
language sql
volatile
set search_path to 'public'
as $$
  select left(translate(encode(extensions.gen_random_bytes(p_len), 'base64'), '+/=', 'xyz'), p_len);
$$;
revoke all on function public._share_random_token(int) from public, anon, authenticated;

-- The owner sets or clears a PIN. Returns the token the link should carry.
create or replace function public.set_share_pin(p_share_id uuid, p_pin text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v_pin text := nullif(btrim(coalesce(p_pin, '')), '');
begin
  if auth.uid() is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;
  select * into s from public.portfolio_shares where id = p_share_id for update;
  if s.id is null or s.user_id <> auth.uid() then
    return jsonb_build_object('error', 'not_found');
  end if;

  if v_pin is null then
    -- PIN removed: the link goes back to the real token, rotated so the
    -- PIN-free link is new too.
    update public.portfolio_shares
       set pin_hash = null, pin_set_at = null, public_token = null,
           token = public._share_random_token(20)
     where id = s.id
     returning * into s;
    return jsonb_build_object('pin', false, 'link_token', s.token);
  end if;

  if v_pin !~ '^[0-9]{4,8}$' then
    return jsonb_build_object('error', 'pin_format', 'message', 'Use 4 to 8 numbers.');
  end if;

  update public.portfolio_shares
     set pin_hash = extensions.crypt(v_pin, extensions.gen_salt('bf', 8)),
         pin_set_at = now(),
         public_token = coalesce(public_token, public._share_random_token(24)),
         -- Rotate the real token: a copy of the link sent before the PIN
         -- existed must not open the portfolio without it.
         token = public._share_random_token(20)
   where id = s.id
   returning * into s;
  delete from public.portfolio_share_pin_attempts where share_id = s.id;
  return jsonb_build_object('pin', true, 'link_token', s.public_token);
end;
$function$;
revoke all on function public.set_share_pin(uuid, text) from public, anon;
grant execute on function public.set_share_pin(uuid, text) to authenticated;

-- Signed out: does this link need a PIN? Says nothing about whose it is.
create or replace function public.get_share_gate(p_token text)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v_locked timestamptz;
begin
  select * into s from public.portfolio_shares
   where public_token = p_token and pin_hash is not null
     and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('pin_required', false);
  end if;
  select min(a.attempted_at) + interval '15 minutes' into v_locked
    from (select attempted_at from public.portfolio_share_pin_attempts
           where share_id = s.id and not ok and attempted_at > now() - interval '15 minutes'
           order by attempted_at desc limit 5) a
   having count(*) >= 5;
  return jsonb_build_object('pin_required', true, 'locked_until', v_locked);
end;
$function$;
revoke all on function public.get_share_gate(text) from public;
grant execute on function public.get_share_gate(text) to anon, authenticated;

-- Signed out: the right PIN releases the real token.
create or replace function public.unlock_shared_portfolio(p_token text, p_pin text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v_fails int;
  v_first timestamptz;
  v_ip text;
begin
  select * into s from public.portfolio_shares
   where public_token = p_token and pin_hash is not null
     and is_active and (expires_at is null or expires_at > now())
   for update;
  if s.id is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  select count(*), min(attempted_at) into v_fails, v_first
    from public.portfolio_share_pin_attempts
   where share_id = s.id and not ok and attempted_at > now() - interval '15 minutes';
  if v_fails >= 5 then
    return jsonb_build_object('error', 'locked', 'locked_until', v_first + interval '15 minutes');
  end if;

  begin
    v_ip := left(nullif(trim(split_part(
      (nullif(current_setting('request.headers', true), '')::jsonb)->>'x-forwarded-for', ',', 1)), ''), 60);
  exception when others then
    v_ip := null;
  end;

  if coalesce(p_pin, '') ~ '^[0-9]{4,8}$'
     and extensions.crypt(p_pin, s.pin_hash) = s.pin_hash then
    insert into public.portfolio_share_pin_attempts (share_id, ok, ip) values (s.id, true, v_ip);
    return jsonb_build_object('token', s.token);
  end if;

  insert into public.portfolio_share_pin_attempts (share_id, ok, ip) values (s.id, false, v_ip);
  v_fails := v_fails + 1;
  if v_fails >= 5 then
    perform public.notify_user(s.user_id, 'share_pin_locked',
      'Wrong PIN entered 5 times on your share link',
      'The link is locked for 15 minutes. If you did not expect this, turn the link off in Share portfolio.',
      jsonb_build_object('route', '/apprentice/hub?share=1', 'ref_id', s.id::text));
    return jsonb_build_object('error', 'locked', 'locked_until', now() + interval '15 minutes');
  end if;
  return jsonb_build_object('error', 'wrong_pin', 'attempts_left', 5 - v_fails);
end;
$function$;
revoke all on function public.unlock_shared_portfolio(text, text) from public;
grant execute on function public.unlock_shared_portfolio(text, text) to anon, authenticated;

-- ── 2. Reviewer record ──────────────────────────────────────────────────────
-- Where a decision was made: the college the assessor is (or was) staff at,
-- among the colleges this learner is or was with; 'Independent assessor' for
-- an assessor on the learner's own link.
create or replace function public._decision_assessed_at(p_learner uuid, p_assessor uuid)
returns text
language sql
stable security definer
set search_path to 'public'
as $$
  select coalesce(
    (select co.name
       from public.college_staff st
       join public.colleges co on co.id = st.college_id
      where st.user_id = p_assessor
        and st.college_id in (
              select s.college_id from public.college_students s where s.user_id = p_learner
              union
              select m.from_college_id from public.college_learner_moves m
               where m.user_id = p_learner and m.from_college_id is not null)
      order by (st.archived_at is null) desc
      limit 1),
    (select 'Independent assessor' from public.portfolio_assessor_links l
      where l.learner_id = p_learner and l.assessor_user_id = p_assessor limit 1));
$$;
revoke all on function public._decision_assessed_at(uuid, uuid) from public, anon, authenticated;

-- Live definition (8 Oct + the IQA-not-confirmed line) kept; adds criteria,
-- item_criteria, otj and two keys on each decision.
create or replace function public._shared_portfolio_record(p_user_id uuid, p_scope uuid[])
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  r record;
  v_decisions jsonb := '[]'::jsonb;
  v_criteria jsonb := '[]'::jsonb;
  v_item_criteria jsonb := '[]'::jsonb;
  v_witnesses jsonb;
  v_otj jsonb;
  v_filter boolean := p_scope is not null and array_length(p_scope, 1) is not null;
begin
  select * into r from public._resolve_qualification(p_user_id, null);

  -- Criteria with a current decision, or sent to an assessor and waiting,
  -- read as get_portfolio_ac_state reads them. A share scoped to some
  -- evidence only shows criteria that evidence is mapped to.
  if r.requirement_code is not null then
    with ev as (
      select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a
        from public.portfolio_item_criteria c
       where c.learner_id = p_user_id
         and c.source <> 'ai_suggested'
         and (c.qualification_code is null or c.qualification_code = r.requirement_code)
    ),
    open_items as (
      select si.portfolio_item_id, max(coalesce(ps.submitted_at, ps.created_at)) sent_at
        from public.portfolio_submission_items si
        join public.portfolio_submissions ps on ps.id = si.submission_id
       where ps.user_id = p_user_id
         and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
       group by si.portfolio_item_id
    ),
    cur as (
      select distinct on (d.unit_code, d.ac_code) d.*
        from public.portfolio_assessment_decisions d
       where d.learner_id = p_user_id
         and d.qualification_code = r.requirement_code
         and d.superseded_at is null
       order by d.unit_code, d.ac_code, d.decided_at desc
    ),
    acs as (
      select qr.unit_code, qr.unit_title, qr.lo_number, qr.ac_code, qr.ac_text, cur.decision,
             cur.feedback, cur.assessor_name, cur.decided_at, cur.iqa_verdict, cur.iqa_at,
             cur.evidence_item_ids, cur.assessor_id, cur.assessor_qualifications,
             (select max(o.sent_at) from ev join open_items o on o.portfolio_item_id = ev.item_id
               where ev.u = qr.unit_code and ev.a = qr.ac_code) sent_at,
             exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) claimed
        from public.qualification_requirements qr
        left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
       where qr.qualification_code = r.requirement_code
    ),
    scoped as (
      select x.* from acs x
       where not v_filter
          or x.evidence_item_ids && p_scope
          or exists (select 1 from ev
                      where ev.item_id = any(p_scope) and ev.u = x.unit_code and ev.a = x.ac_code)
    )
    select
      coalesce(jsonb_agg(jsonb_build_object(
             'unit_code', x.unit_code,
             'unit_title', x.unit_title,
             'ac_code', x.ac_code,
             'ac_text', x.ac_text,
             'state', case
                        when x.decision in ('referred', 'not_yet') and x.sent_at > x.decided_at then 'submitted'
                        when x.decision = 'passed' and x.iqa_verdict = 'not_confirmed' then 'referred'
                        when x.decision is not null then x.decision
                        else 'submitted'
                      end,
             'decision', x.decision,
             'feedback', x.feedback,
             'assessor_name', x.assessor_name,
             'assessor_qualifications', x.assessor_qualifications,
             'assessed_at', case when x.assessor_id is not null
                                 then public._decision_assessed_at(p_user_id, x.assessor_id) end,
             'decided_at', x.decided_at,
             'iqa_verdict', x.iqa_verdict,
             'iqa_at', x.iqa_at)
             order by x.unit_code, x.lo_number, x.ac_code)
        filter (where x.decision is not null or x.sent_at is not null), '[]'::jsonb),
      -- Same states as get_portfolio_ac_state; an AI suggestion is not a
      -- claim, so it reads as not started here.
      coalesce(jsonb_agg(jsonb_build_object(
             'unit_code', x.unit_code,
             'unit_title', x.unit_title,
             'lo_number', x.lo_number,
             'ac_code', x.ac_code,
             'ac_text', x.ac_text,
             'state', case
                        when x.decision = 'passed' and x.iqa_verdict = 'confirmed' then 'iqa_confirmed'
                        when x.decision = 'passed' and x.iqa_verdict = 'not_confirmed' then 'iqa_rejected'
                        when x.decision in ('referred', 'not_yet') and x.sent_at > x.decided_at then 'submitted'
                        when x.decision is not null then x.decision
                        when x.sent_at is not null then 'submitted'
                        when x.claimed then 'claimed'
                        else 'not_started'
                      end)
             order by x.unit_code, x.lo_number, x.ac_code), '[]'::jsonb)
      into v_decisions, v_criteria
      from scoped x;

    select coalesce(jsonb_agg(jsonb_build_object('item_id', ev.item_id, 'unit_code', ev.u, 'ac_code', ev.a)
                              order by ev.u, ev.a), '[]'::jsonb)
      into v_item_criteria
      from (select distinct c.portfolio_item_id item_id, c.unit_code u, c.ac_code a
              from public.portfolio_item_criteria c
             where c.learner_id = p_user_id
               and c.source <> 'ai_suggested'
               and (c.qualification_code is null or c.qualification_code = r.requirement_code)) ev
     where not v_filter or ev.item_id = any(p_scope);
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', w.id,
           'portfolio_item_id', w.portfolio_item_id,
           'witness_name', w.witness_name,
           'witness_role', w.witness_role,
           'witness_company', w.witness_company,
           'statement', w.statement,
           'criteria', w.criteria,
           'statement_hash', w.statement_hash,
           'signed_at', w.signed_at)
           order by w.signed_at desc), '[]'::jsonb)
    into v_witnesses
    from public.portfolio_witness_statements w
   where w.learner_id = p_user_id
     and w.status = 'signed'
     and (not v_filter or w.portfolio_item_id = any(p_scope));

  -- Hours as the OTJ source of truth counts them (frozen at a leave date).
  begin
    select jsonb_build_object(
             'verified_hours', o->'verified_hours',
             'required_hours', o->'required_hours',
             'college_verified_hours', o->'college_verified_hours',
             'employer_attested_hours', o->'employer_attested_hours',
             'frozen_at', o->'frozen_at')
      into v_otj
      from public._otj_summary_core(p_user_id) o;
  exception when others then
    v_otj := null;
  end;

  return jsonb_build_object('decisions', v_decisions, 'witnesses', v_witnesses,
                            'criteria', v_criteria, 'item_criteria', v_item_criteria,
                            'otj', v_otj);
end;
$function$;

revoke all on function public._shared_portfolio_record(uuid, uuid[]) from public, anon, authenticated;
grant execute on function public._shared_portfolio_record(uuid, uuid[]) to service_role;

-- ── 3. "Become their assessor" ──────────────────────────────────────────────
create table if not exists public.portfolio_assessor_requests (
  id uuid primary key default gen_random_uuid(),
  share_id uuid references public.portfolio_shares(id) on delete set null,
  learner_id uuid not null references auth.users(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  role text not null default 'assessor' check (role in ('assessor', 'iqa', 'epa_assessor')),
  organisation text,
  note text,
  status text not null default 'open' check (status in ('open', 'invited', 'dismissed')),
  ip text,
  created_at timestamptz not null default now()
);
create index if not exists portfolio_assessor_requests_learner_idx
  on public.portfolio_assessor_requests (learner_id, created_at desc);

comment on table public.portfolio_assessor_requests is
  '[PORTFOLIO] Someone reading a shared portfolio asked to become the learner''s assessor (ELE-2016). Scope: the learner. Used by: SharedPortfolioView (request_to_assess writes), MyAssessmentCard (opens InviteAssessorSheet filled in). Rule: written only by request_to_assess; the learner can mark it invited or dismissed; nothing is granted until the learner sends an invite.';

alter table public.portfolio_assessor_requests enable row level security;
drop policy if exists "Learner reads own assessor requests" on public.portfolio_assessor_requests;
create policy "Learner reads own assessor requests" on public.portfolio_assessor_requests
  for select to authenticated using (learner_id = (select auth.uid()));
drop policy if exists "Learner closes own assessor requests" on public.portfolio_assessor_requests;
create policy "Learner closes own assessor requests" on public.portfolio_assessor_requests
  for update to authenticated
  using (learner_id = (select auth.uid()))
  with check (learner_id = (select auth.uid()) and status in ('invited', 'dismissed'));
revoke all on public.portfolio_assessor_requests from anon, authenticated;
grant select, update (status) on public.portfolio_assessor_requests to authenticated;
grant all on public.portfolio_assessor_requests to service_role;

create or replace function public.request_to_assess(
  p_share_token text, p_name text, p_email text, p_role text default 'assessor',
  p_organisation text default null, p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v_name text := left(btrim(coalesce(p_name, '')), 120);
  v_email text := lower(left(btrim(coalesce(p_email, '')), 200));
  v_role text := coalesce(nullif(p_role, ''), 'assessor');
  v_org text := nullif(left(btrim(coalesce(p_organisation, '')), 160), '');
  v_note text := nullif(left(btrim(coalesce(p_note, '')), 600), '');
  v_id uuid;
  v_ip text;
begin
  select * into s from public.portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  if length(v_name) < 2 then
    return jsonb_build_object('error', 'Add your name.');
  end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    return jsonb_build_object('error', 'Add an email address the apprentice can invite.');
  end if;
  if v_role not in ('assessor', 'iqa', 'epa_assessor') then
    v_role := 'assessor';
  end if;
  -- One open request per email per learner; at most five a day per learner.
  if exists (select 1 from public.portfolio_assessor_requests q
              where q.learner_id = s.user_id and q.requester_email = v_email and q.status = 'open') then
    return jsonb_build_object('success', true, 'already', true);
  end if;
  if (select count(*) from public.portfolio_assessor_requests q
       where q.learner_id = s.user_id and q.created_at > now() - interval '1 day') >= 5 then
    return jsonb_build_object('error', 'The apprentice has had several requests today. Try again tomorrow.');
  end if;

  begin
    v_ip := left(nullif(trim(split_part(
      (nullif(current_setting('request.headers', true), '')::jsonb)->>'x-forwarded-for', ',', 1)), ''), 60);
  exception when others then
    v_ip := null;
  end;

  insert into public.portfolio_assessor_requests
    (share_id, learner_id, requester_name, requester_email, role, organisation, note, ip)
  values (s.id, s.user_id, v_name, v_email, v_role, v_org, v_note, v_ip)
  returning id into v_id;

  perform public.notify_user(s.user_id, 'assessor_request',
    format('%s would like to be your %s', v_name,
           case v_role when 'iqa' then 'IQA' when 'epa_assessor' then 'end-point assessor' else 'assessor' end),
    format('They opened your shared portfolio%s. Send them an invite if you want them to assess your work.',
           case when v_org is not null then ' (' || v_org || ')' else '' end),
    jsonb_build_object('route', '/apprentice/college/progress?assessor_request=' || v_id, 'ref_id', v_id::text));

  return jsonb_build_object('success', true);
end;
$function$;
revoke all on function public.request_to_assess(text, text, text, text, text, text) from public;
grant execute on function public.request_to_assess(text, text, text, text, text, text) to anon, authenticated;
