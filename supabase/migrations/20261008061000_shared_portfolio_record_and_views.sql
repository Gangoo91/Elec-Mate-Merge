-- ELE-1885 / ELE-2016: the shared portfolio (/view/:token) shows the
-- assessment record, logs who opened it, and share links always expire.
--
-- 1. portfolio_share_views: one row per open of a share link (capped at one
--    per share per IP per 10 minutes). The share owner can read their own;
--    nobody inserts from the client. Rows are written only by
--    get_shared_portfolio_structured.
-- 2. _shared_portfolio_record(user, scope): current assessor decisions per
--    criterion + signed witness statements, reviewer-safe columns only
--    (never signature_data, signer_ip, token, witness email/phone).
-- 3. get_shared_portfolio_structured: copied from live (7 Oct, includes the
--    ELE-1926 feedback provenance keys). Adds 'decisions' + 'witnesses' to the
--    result and records the view. Every existing behaviour is kept, including
--    the view_count / last_viewed_at update.
-- 4. Share expiry: a BEFORE INSERT/UPDATE trigger sets an active share with no
--    expiry, or one past 91 days, to 90 days from creation. It only checks rows being inserted or
--    whose expires_at is changing, so existing "never" links are untouched
--    (including the lifecycle pause/resume path, which only flips is_active).

-- ── 1. View log ─────────────────────────────────────────────────────────────
create table if not exists public.portfolio_share_views (
  id uuid primary key default gen_random_uuid(),
  share_id uuid not null references public.portfolio_shares(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  user_agent text,
  ip text
);

create index if not exists portfolio_share_views_share_viewed_idx
  on public.portfolio_share_views (share_id, viewed_at desc);

comment on table public.portfolio_share_views is
  '[PORTFOLIO] One row each time a portfolio share link (/view/:token) is opened. Scope: the share owner (learner). Used by: SharePortfolioSheet (opened N times, last at), get_shared_portfolio_structured (writes). Rule: written only by the token RPC, at most one row per share per IP per 10 minutes; no client insert/update/delete.';

alter table public.portfolio_share_views enable row level security;

drop policy if exists "Share owner reads their views" on public.portfolio_share_views;
create policy "Share owner reads their views"
  on public.portfolio_share_views
  for select
  to authenticated
  using (exists (
    select 1 from public.portfolio_shares s
     where s.id = portfolio_share_views.share_id
       and s.user_id = (select auth.uid())
  ));

revoke all on public.portfolio_share_views from anon, authenticated;
grant select on public.portfolio_share_views to authenticated;
grant all on public.portfolio_share_views to service_role;

-- ── 2. Assessment record for a share ────────────────────────────────────────
create or replace function public._shared_portfolio_record(p_user_id uuid, p_scope uuid[])
 returns jsonb
 language plpgsql
 stable
 security definer
 set search_path to 'public'
as $function$
declare
  r record;
  v_decisions jsonb := '[]'::jsonb;
  v_witnesses jsonb;
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
             cur.evidence_item_ids,
             (select max(o.sent_at) from ev join open_items o on o.portfolio_item_id = ev.item_id
               where ev.u = qr.unit_code and ev.a = qr.ac_code) sent_at
        from public.qualification_requirements qr
        left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
       where qr.qualification_code = r.requirement_code
    )
    select coalesce(jsonb_agg(jsonb_build_object(
             'unit_code', x.unit_code,
             'unit_title', x.unit_title,
             'ac_code', x.ac_code,
             'ac_text', x.ac_text,
             'state', case
                        when x.decision in ('referred', 'not_yet') and x.sent_at > x.decided_at then 'submitted'
                        when x.decision is not null then x.decision
                        else 'submitted'
                      end,
             'decision', x.decision,
             'feedback', x.feedback,
             'assessor_name', x.assessor_name,
             'decided_at', x.decided_at,
             'iqa_verdict', x.iqa_verdict,
             'iqa_at', x.iqa_at)
             order by x.unit_code, x.lo_number, x.ac_code), '[]'::jsonb)
      into v_decisions
      from acs x
     where (x.decision is not null or x.sent_at is not null)
       and (not v_filter
            or x.evidence_item_ids && p_scope
            or exists (select 1 from ev
                        where ev.item_id = any(p_scope) and ev.u = x.unit_code and ev.a = x.ac_code));
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

  return jsonb_build_object('decisions', v_decisions, 'witnesses', v_witnesses);
end;
$function$;

revoke all on function public._shared_portfolio_record(uuid, uuid[]) from public, anon, authenticated;
grant execute on function public._shared_portfolio_record(uuid, uuid[]) to service_role;

-- ── 3. Share page RPC: + record, + view log ─────────────────────────────────
-- Copied from the live get_shared_portfolio_structured (7 Oct).
create or replace function public.get_shared_portfolio_structured(p_share_token text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v jsonb;
  v_scope uuid[];
  v_comments jsonb;
  v_submissions jsonb;
  v_record jsonb;
  v_headers jsonb;
  v_ip text;
  v_ua text;
begin
  select * into s from public.portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  v_scope := public._share_scope(s.entry_ids, s.portfolio_item_id);
  v := public._portfolio_structured(s.user_id, v_scope, true);

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', pc.id, 'context_type', coalesce(pc.context_type, 'evidence'),
           'context_id', pc.evidence_id, 'parent_id', pc.parent_id,
           'author_name', pc.author_name, 'author_role', pc.author_role,
           'author_initials', pc.author_initials, 'content', pc.content,
           'requires_action', coalesce(pc.requires_action, false),
           'is_resolved', coalesce(pc.is_resolved, false), 'created_at', pc.created_at)
           order by pc.created_at desc), '[]'::jsonb)
    into v_comments
    from public.portfolio_comments pc
   where pc.user_id = s.user_id
     and (v_scope is null or pc.evidence_id = any(v_scope));

  if v_scope is null then
    select coalesce(jsonb_agg(jsonb_build_object(
             'id', ps.id, 'category_id', ps.category_id,
             'category_name', coalesce(qc.name, 'Unit'),
             'qualification_id', ps.qualification_id, 'status', ps.status,
             'submitted_at', ps.submitted_at, 'reviewed_at', ps.reviewed_at,
             'assessor_feedback', ps.assessor_feedback, 'grade', ps.grade,
             'action_required', ps.action_required, 'strengths_noted', ps.strengths_noted,
             'areas_for_improvement', ps.areas_for_improvement,
             'submission_count', coalesce(ps.submission_count, 1),
             'signed_off_at', ps.signed_off_at,
             -- ELE-1926
             'feedback_source', ps.feedback_source,
             'feedback_confirmed_at', ps.feedback_confirmed_at,
             'feedback_confirmed_by_name', ps.feedback_confirmed_by_name)
             order by ps.submitted_at desc nulls last), '[]'::jsonb)
      into v_submissions
      from public.portfolio_submissions ps
      left join public.qualification_categories qc on qc.id = ps.category_id
     where ps.user_id = s.user_id;
  end if;

  -- ELE-1885: assessor decisions + signed witness statements.
  v_record := public._shared_portfolio_record(s.user_id, v_scope);

  update public.portfolio_shares
     set view_count = coalesce(view_count, 0) + 1, last_viewed_at = now()
   where id = s.id;

  -- View log: one row per share per IP per 10 minutes.
  begin
    v_headers := nullif(current_setting('request.headers', true), '')::jsonb;
  exception when others then
    v_headers := null;
  end;
  v_ip := left(nullif(trim(split_part(v_headers->>'x-forwarded-for', ',', 1)), ''), 60);
  v_ua := left(v_headers->>'user-agent', 300);
  if not exists (select 1 from public.portfolio_share_views pv
                  where pv.share_id = s.id
                    and pv.ip is not distinct from v_ip
                    and pv.viewed_at > now() - interval '10 minutes') then
    insert into public.portfolio_share_views (share_id, user_agent, ip)
    values (s.id, v_ua, v_ip);
  end if;

  return v
    || jsonb_build_object('apprentice', (v->'apprentice') || jsonb_build_object(
         'share_title', coalesce(s.title, 'Portfolio'), 'share_description', s.description))
    || jsonb_build_object('comments', v_comments, 'submissions', coalesce(v_submissions, '[]'::jsonb))
    || v_record;
end;
$function$;

-- Live grants unchanged: anon + authenticated + service_role execute.
grant execute on function public.get_shared_portfolio_structured(text) to anon, authenticated, service_role;

-- ── 4. Share links must expire (max 90 days, 1 day grace) ──────────────────
create or replace function public._portfolio_shares_expiry_guard()
 returns trigger
 language plpgsql
 set search_path to 'public'
as $function$
begin
  if coalesce(new.is_active, true)
     and (tg_op = 'INSERT' or new.expires_at is distinct from old.expires_at) then
    -- Clamp rather than refuse: the live app (and iOS build 49) still offer
    -- "Never", and refusing would break sharing for them until they update.
    if new.expires_at is null
       or new.expires_at > coalesce(new.created_at, now()) + interval '91 days' then
      new.expires_at := coalesce(new.created_at, now()) + interval '90 days';
    end if;
  end if;
  return new;
end;
$function$;

revoke all on function public._portfolio_shares_expiry_guard() from public, anon, authenticated;

drop trigger if exists trg_portfolio_shares_expiry_guard on public.portfolio_shares;
create trigger trg_portfolio_shares_expiry_guard
  before insert or update on public.portfolio_shares
  for each row execute function public._portfolio_shares_expiry_guard();
