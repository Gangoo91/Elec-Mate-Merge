-- ELE-1865 Content hashes on evidence + an append-only audit trail (P-ELE-13).
--
-- An auditor, an EPAO or a tribunal needs to know what was uploaded when,
-- what was decided when and by whom, and that the file has not changed since.
--
--   * Every evidence file carries a SHA-256 of its bytes, computed on upload by
--     the client and stored on the file entry in portfolio_items.storage_urls
--     ({..., "sha256": "<hex>"}). Older files are hashed by a one-off backfill.
--   * portfolio_items.content_hash is the SHA-256 of what the learner wrote plus
--     the file hashes, recomputed by trigger on every change. A declaration
--     (ELE-1875) or a witness signs against it.
--   * portfolio_audit_events is append-only, written ONLY by the triggers here:
--     evidence added / edited / deleted, criteria claimed / suggested / tagged,
--     submissions, decisions, supersessions, IQA verdicts, witness requests and
--     signatures, declarations, assessor invites and shares.
-- The older portfolio_audit_log (submissions only, read by nothing) is left as it is.

-- 1. Item content hash ---------------------------------------------------------
alter table public.portfolio_items add column if not exists content_hash text;
alter table public.portfolio_items add column if not exists content_hashed_at timestamptz;

create or replace function public._portfolio_item_hash(p public.portfolio_items)
returns text language sql immutable set search_path to 'public' as $$
  select encode(extensions.digest(jsonb_build_object(
      'title', coalesce(p.title, ''),
      'description', coalesce(p.description, ''),
      'reflection', coalesce(p.reflection_notes, ''),
      'date_completed', p.date_completed,
      'work', coalesce(p.metadata, '{}'::jsonb) - 'ui',
      'files', coalesce((
        select jsonb_agg(jsonb_build_object('url', f->>'url', 'sha256', f->>'sha256') order by f->>'url')
          from jsonb_array_elements(case when jsonb_typeof(p.storage_urls) = 'array'
                                         then p.storage_urls else '[]'::jsonb end) f), '[]'::jsonb)
    )::text, 'sha256'), 'hex');
$$;

create or replace function public._portfolio_items_hash()
returns trigger language plpgsql set search_path to 'public' as $$
declare v text := public._portfolio_item_hash(new);
begin
  -- always recomputed: a client can never write its own hash
  if tg_op = 'INSERT' or v is distinct from old.content_hash then
    new.content_hashed_at := now();
  else
    new.content_hashed_at := old.content_hashed_at;
  end if;
  new.content_hash := v;
  return new;
end; $$;
drop trigger if exists trg_portfolio_items_hash on public.portfolio_items;
create trigger trg_portfolio_items_hash before insert or update on public.portfolio_items
  for each row execute function public._portfolio_items_hash();

-- Hash existing items without touching updated_at or firing other triggers.
set local session_replication_role = replica;
update public.portfolio_items set content_hash = public._portfolio_item_hash(portfolio_items), content_hashed_at = now()
 where content_hash is null;
set local session_replication_role = origin;

-- 2. The audit table -----------------------------------------------------------
create table if not exists public.portfolio_audit_events (
  id bigint generated always as identity primary key,
  learner_id uuid not null,
  actor_id uuid,
  actor_role text not null check (actor_role in ('learner', 'assessor', 'iqa', 'staff', 'witness', 'system')),
  action text not null,
  object_type text not null,
  object_id uuid,
  summary jsonb not null default '{}'::jsonb,
  content_hash text,
  ip text,
  created_at timestamptz not null default now()
);
create index if not exists pae_learner_idx on public.portfolio_audit_events (learner_id, created_at desc);
create index if not exists pae_object_idx on public.portfolio_audit_events (object_type, object_id, created_at desc);
alter table public.portfolio_audit_events enable row level security;

comment on table public.portfolio_audit_events is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Append-only audit trail of the portfolio: evidence added/edited/deleted with content hashes, criteria claims, submissions, assessor decisions, supersessions, IQA verdicts, witness signatures, declarations, assessor invites and shares (actor, role, action, object, before/after summary, ip). Scope: learner_id = apprentice auth uid. Used by: evidence detail (audit trail), assessor workspace, evidence/EPAO export pack. Rule: written only by the _pae_* triggers; never updated or deleted by any app role.';

drop policy if exists "Learner reads own audit trail" on public.portfolio_audit_events;
create policy "Learner reads own audit trail" on public.portfolio_audit_events
  for select to authenticated using (learner_id = auth.uid());
drop policy if exists "Assessing staff read audit trail" on public.portfolio_audit_events;
create policy "Assessing staff read audit trail" on public.portfolio_audit_events
  for select to authenticated using (public._can_assess(learner_id));
-- No insert/update/delete policies. Triggers write as the definer.

create or replace function public._pae_immutable()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  raise exception 'the portfolio audit trail is append-only' using errcode = '42501';
end; $$;
drop trigger if exists trg_pae_immutable on public.portfolio_audit_events;
create trigger trg_pae_immutable before update or delete on public.portfolio_audit_events
  for each row execute function public._pae_immutable();
revoke update, delete, truncate on public.portfolio_audit_events from anon, authenticated;

-- 3. Writer helper -------------------------------------------------------------
create or replace function public._pae_write(
  p_learner uuid, p_action text, p_object_type text, p_object_id uuid,
  p_summary jsonb default '{}'::jsonb, p_hash text default null, p_role text default null)
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_actor uuid := auth.uid(); v_role text := p_role; v_ip text;
begin
  if p_learner is null then return; end if;
  if v_role is null then
    v_role := case
      when v_actor is null then 'system'
      when v_actor = p_learner then 'learner'
      when public._can_iqa(p_learner) and p_action like 'iqa_%' then 'iqa'
      when public._can_assess(p_learner) then 'assessor'
      else 'staff' end;
  end if;
  begin
    v_ip := left(split_part(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', ',', 1), 60);
  exception when others then v_ip := null; end;
  insert into public.portfolio_audit_events
    (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash, ip)
  values (p_learner, v_actor, v_role, p_action, p_object_type, p_object_id,
          coalesce(p_summary, '{}'::jsonb), p_hash, v_ip);
end; $$;
revoke all on function public._pae_write(uuid, text, text, uuid, jsonb, text, text) from public, anon, authenticated;

-- 4. Triggers ------------------------------------------------------------------
-- Evidence items
create or replace function public._pae_items()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.user_id, 'evidence_added', 'portfolio_item', new.id,
      jsonb_build_object('title', new.title,
                         'files', case when jsonb_typeof(new.storage_urls) = 'array'
                                       then jsonb_array_length(new.storage_urls) else 0 end),
      new.content_hash);
  elsif tg_op = 'UPDATE' then
    if new.content_hash is distinct from old.content_hash then
      perform public._pae_write(new.user_id, 'evidence_edited', 'portfolio_item', new.id,
        jsonb_build_object('title', new.title,
                           'before', jsonb_build_object('title', old.title, 'content_hash', old.content_hash),
                           'after', jsonb_build_object('title', new.title, 'content_hash', new.content_hash)),
        new.content_hash);
    end if;
    if new.is_supervisor_verified is distinct from old.is_supervisor_verified then
      perform public._pae_write(new.user_id, 'supervisor_verified', 'portfolio_item', new.id,
        jsonb_build_object('title', new.title, 'before', old.is_supervisor_verified, 'after', new.is_supervisor_verified),
        new.content_hash);
    end if;
  else
    perform public._pae_write(old.user_id, 'evidence_deleted', 'portfolio_item', old.id,
      jsonb_build_object('title', old.title), old.content_hash);
  end if;
  return coalesce(new, old);
end; $$;
drop trigger if exists trg_pae_items on public.portfolio_items;
create trigger trg_pae_items after insert or update or delete on public.portfolio_items
  for each row execute function public._pae_items();

-- Criteria on items (ELE-1864)
create or replace function public._pae_criteria()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare r public.portfolio_item_criteria; v_action text;
begin
  r := coalesce(new, old);
  -- a whole item being deleted cascades here; the item event already covers it
  if tg_op = 'DELETE' and not exists (select 1 from public.portfolio_items where id = old.portfolio_item_id) then
    return old;
  end if;
  v_action := case
    when tg_op = 'INSERT' and new.source = 'learner' then 'criterion_claimed'
    when tg_op = 'INSERT' and new.source = 'ai_suggested' then 'criterion_suggested'
    when tg_op = 'INSERT' then 'criterion_tagged_by_assessor'
    when tg_op = 'DELETE' then 'criterion_unclaimed'
    when old.source = 'ai_suggested' and new.source = 'learner' then 'criterion_suggestion_confirmed'
    when old.source = 'learner' and new.source = 'ai_suggested' then 'criterion_unclaimed'
    when old.source is distinct from new.source then 'criterion_tagged_by_assessor'
    else null end;
  if v_action is null then return coalesce(new, old); end if;
  perform public._pae_write(r.learner_id, v_action, 'portfolio_item', r.portfolio_item_id,
    jsonb_build_object('unit_code', r.unit_code, 'ac_code', r.ac_code, 'source', r.source,
                       'confidence', r.confidence));
  return coalesce(new, old);
end; $$;
drop trigger if exists trg_pae_criteria on public.portfolio_item_criteria;
create trigger trg_pae_criteria after insert or update or delete on public.portfolio_item_criteria
  for each row execute function public._pae_criteria();

-- Submissions
create or replace function public._pae_submissions()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.user_id, 'submission_' || coalesce(new.status, 'submitted'), 'portfolio_submission', new.id,
      jsonb_build_object('status', new.status, 'category_id', new.category_id));
  elsif new.status is distinct from old.status then
    perform public._pae_write(new.user_id, 'submission_' || coalesce(new.status, 'updated'), 'portfolio_submission', new.id,
      jsonb_build_object('before', old.status, 'after', new.status, 'grade', new.grade,
                         'feedback', left(new.assessor_feedback, 280)));
  end if;
  return new;
end; $$;
drop trigger if exists trg_pae_submissions on public.portfolio_submissions;
create trigger trg_pae_submissions after insert or update on public.portfolio_submissions
  for each row execute function public._pae_submissions();

create or replace function public._pae_submission_items()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_learner uuid; v_hash text; v_title text;
begin
  select user_id, content_hash, title into v_learner, v_hash, v_title
    from public.portfolio_items where id = new.portfolio_item_id;
  perform public._pae_write(v_learner, 'item_submitted', 'portfolio_item', new.portfolio_item_id,
    jsonb_build_object('submission_id', new.submission_id, 'title', v_title), v_hash);
  return new;
end; $$;
drop trigger if exists trg_pae_submission_items on public.portfolio_submission_items;
create trigger trg_pae_submission_items after insert on public.portfolio_submission_items
  for each row execute function public._pae_submission_items();

-- Decisions, supersessions, IQA verdicts
create or replace function public._pae_decisions()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.learner_id, 'decision_' || new.decision, 'assessment_decision', new.id,
      jsonb_build_object('unit_code', new.unit_code, 'ac_code', new.ac_code, 'decision', new.decision,
                         'method', new.method, 'assessor_name', new.assessor_name,
                         'evidence_item_ids', to_jsonb(new.evidence_item_ids),
                         'feedback', left(new.feedback, 280)),
      new.content_hash);
  else
    if new.superseded_at is not null and old.superseded_at is null then
      perform public._pae_write(new.learner_id, 'decision_superseded', 'assessment_decision', new.id,
        jsonb_build_object('unit_code', new.unit_code, 'ac_code', new.ac_code,
                           'superseded_by', new.superseded_by), new.content_hash, 'system');
    end if;
    if new.iqa_verdict is distinct from old.iqa_verdict then
      perform public._pae_write(new.learner_id, 'iqa_' || coalesce(new.iqa_verdict, 'cleared'), 'assessment_decision', new.id,
        jsonb_build_object('unit_code', new.unit_code, 'ac_code', new.ac_code,
                           'before', old.iqa_verdict, 'after', new.iqa_verdict,
                           'feedback', left(new.iqa_feedback, 280)),
        new.content_hash, 'iqa');
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists trg_pae_decisions on public.portfolio_assessment_decisions;
create trigger trg_pae_decisions after insert or update on public.portfolio_assessment_decisions
  for each row execute function public._pae_decisions();

-- Witness statements
create or replace function public._pae_witness()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.learner_id, 'witness_requested', 'witness_statement', new.id,
      jsonb_build_object('portfolio_item_id', new.portfolio_item_id, 'witness_email', new.witness_email,
                         'criteria', to_jsonb(new.criteria)), new.evidence_hash);
  elsif new.status is distinct from old.status then
    perform public._pae_write(new.learner_id, 'witness_' || new.status, 'witness_statement', new.id,
      jsonb_build_object('portfolio_item_id', new.portfolio_item_id, 'witness_name', new.witness_name,
                         'witness_role', new.witness_role, 'evidence_hash', new.evidence_hash),
      coalesce(new.statement_hash, new.evidence_hash),
      case when new.status = 'signed' then 'witness' else null end);
  end if;
  return new;
end; $$;
drop trigger if exists trg_pae_witness on public.portfolio_witness_statements;
create trigger trg_pae_witness after insert or update on public.portfolio_witness_statements
  for each row execute function public._pae_witness();

-- Signatures (learner declarations, ELE-1875; assessor signatures)
create or replace function public._pae_signatures()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_learner uuid;
begin
  select user_id into v_learner from public.portfolio_submissions where id = new.submission_id;
  if v_learner is null then
    select user_id into v_learner from public.portfolio_items where id = new.portfolio_item_id;
  end if;
  perform public._pae_write(v_learner, 'signed_' || new.signature_type, 'signature', new.id,
    jsonb_build_object('submission_id', new.submission_id, 'signer_role', new.signer_role,
                       'typed_name', new.signature_text));
  return new;
end; $$;
drop trigger if exists trg_pae_signatures on public.portfolio_signatures;
create trigger trg_pae_signatures after insert on public.portfolio_signatures
  for each row execute function public._pae_signatures();

-- Independent assessor invites
create or replace function public._pae_assessor_links()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.learner_id, 'assessor_invited', 'assessor_link', new.id,
      jsonb_build_object('email', new.assessor_email, 'role', new.role, 'organisation', new.organisation));
  elsif new.status is distinct from old.status then
    perform public._pae_write(new.learner_id, 'assessor_' || new.status, 'assessor_link', new.id,
      jsonb_build_object('email', new.assessor_email, 'role', new.role));
  end if;
  return new;
end; $$;
drop trigger if exists trg_pae_assessor_links on public.portfolio_assessor_links;
create trigger trg_pae_assessor_links after insert or update on public.portfolio_assessor_links
  for each row execute function public._pae_assessor_links();

-- Shares
create or replace function public._pae_shares()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    perform public._pae_write(new.user_id, 'shared', 'portfolio_share', new.id,
      jsonb_build_object('share_type', new.share_type, 'recipient_type', new.recipient_type,
                         'recipient_email', new.recipient_email, 'expires_at', new.expires_at,
                         'entries', coalesce(to_jsonb(new.entry_ids), to_jsonb(new.portfolio_item_id))));
  elsif new.is_active is distinct from old.is_active and not new.is_active then
    perform public._pae_write(new.user_id, 'share_revoked', 'portfolio_share', new.id,
      jsonb_build_object('share_type', new.share_type));
  end if;
  return new;
end; $$;
drop trigger if exists trg_pae_shares on public.portfolio_shares;
create trigger trg_pae_shares after insert or update on public.portfolio_shares
  for each row execute function public._pae_shares();

-- 5. Backfill: open each item's trail with what is
-- known now (marked backfilled so nobody reads it as the original moment).

insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash, created_at)
select pi.user_id, null, 'system', 'evidence_added', 'portfolio_item', pi.id,
       jsonb_build_object('title', pi.title, 'backfilled', true, 'original_created_at', pi.created_at),
       pi.content_hash, pi.created_at
  from public.portfolio_items pi
 where not exists (select 1 from public.portfolio_audit_events e
                    where e.object_type = 'portfolio_item' and e.object_id = pi.id);
