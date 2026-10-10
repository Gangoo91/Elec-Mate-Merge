-- Assessor authenticity countersign per piece of work (10 Oct 2026).
--
-- C&G record forms need the learner AND the assessor to confirm authenticity.
-- The learner already signs a declaration when they submit. The assessor now
-- confirms "I am satisfied this is the apprentice's own work" on each evidence
-- item they assess, stored with who, when, and the item's fingerprint at that
-- moment (portfolio_items.content_hash, the SHA-256 the item trigger keeps).
-- If the item changes afterwards, its content_hash no longer matches and the
-- app says so.
--
-- Additive: one new append-only table, read by the learner and anyone who can
-- assess them (the same rule as portfolio_assessment_decisions); written only
-- by confirm_evidence_authenticity().
begin;
set local lock_timeout = '5s';

create table if not exists public.portfolio_item_authenticity (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  portfolio_item_id uuid references public.portfolio_items(id) on delete set null,
  assessor_id uuid not null,
  assessor_name text,
  statement text not null,
  item_content_hash text,
  item_title text,
  submission_id uuid,
  record_hash text not null,
  confirmed_at timestamptz not null default now()
);
create index if not exists pia_learner_idx on public.portfolio_item_authenticity (learner_id, confirmed_at desc);
create index if not exists pia_item_idx on public.portfolio_item_authenticity (portfolio_item_id, confirmed_at desc);

alter table public.portfolio_item_authenticity enable row level security;

drop policy if exists "Assessing staff read authenticity" on public.portfolio_item_authenticity;
create policy "Assessing staff read authenticity" on public.portfolio_item_authenticity
  for select to authenticated using (public._can_assess(learner_id));
drop policy if exists "Learner reads own authenticity" on public.portfolio_item_authenticity;
create policy "Learner reads own authenticity" on public.portfolio_item_authenticity
  for select to authenticated using (learner_id = auth.uid());
-- No insert, update or delete policy: rows come only from the function below.

comment on table public.portfolio_item_authenticity is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Assessor authenticity countersign per evidence item: "I am satisfied this is the apprentice''s own work", with assessor, time and the item''s content_hash at that moment; append-only. Scope: learner_id = apprentice auth uid; written by anyone _can_assess(learner). Used by: AcDecisionSheet (Student 360, /assessor, marking), EvidenceDetailSheet, portfolio-export-pack. Rule: never update or delete; add a row via confirm_evidence_authenticity().';

create or replace function public.confirm_evidence_authenticity(
  p_learner uuid,
  p_item_ids uuid[],
  p_submission_id uuid default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
  v_stmt text := 'I am satisfied this is the apprentice''s own work.';
  it record;
  v_id uuid;
  v_now timestamptz := now();
  v_out jsonb := '[]'::jsonb;
  v_existing record;
begin
  if auth.uid() is null or p_learner is null or p_learner = auth.uid() or not public._can_assess(p_learner) then
    raise exception 'you are not an assessor for this learner' using errcode = '42501';
  end if;
  if public._viewing_as_now() then
    raise exception 'viewing as someone else: nothing can be signed' using errcode = '42501';
  end if;
  if coalesce(cardinality(p_item_ids), 0) = 0 then
    return jsonb_build_object('confirmed', 0, 'items', '[]'::jsonb);
  end if;
  if cardinality(p_item_ids) > 100 then
    raise exception 'too many items (100 at most)' using errcode = '22023';
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Assessor') into v_name from public.profiles where id = auth.uid();

  for it in
    select pi.id, pi.title, pi.content_hash
      from public.portfolio_items pi
     where pi.id = any (p_item_ids) and pi.user_id = p_learner
  loop
    -- Already confirmed by this assessor on this exact version: keep that one.
    select a.id, a.confirmed_at into v_existing
      from public.portfolio_item_authenticity a
     where a.portfolio_item_id = it.id and a.assessor_id = auth.uid()
       and a.item_content_hash is not distinct from it.content_hash
     order by a.confirmed_at desc limit 1;
    if v_existing.id is not null then
      v_out := v_out || jsonb_build_object('portfolio_item_id', it.id, 'id', v_existing.id,
                                           'confirmed_at', v_existing.confirmed_at, 'new', false);
      continue;
    end if;
    v_id := gen_random_uuid();
    insert into public.portfolio_item_authenticity
      (id, learner_id, portfolio_item_id, assessor_id, assessor_name, statement, item_content_hash,
       item_title, submission_id, record_hash, confirmed_at)
    values (v_id, p_learner, it.id, auth.uid(), v_name, v_stmt, it.content_hash, left(it.title, 200),
            p_submission_id,
            encode(extensions.digest(concat_ws('|', v_id, it.id, auth.uid(), coalesce(it.content_hash, ''), v_stmt,
                   to_char(v_now at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')), 'sha256'), 'hex'),
            v_now);
    insert into public.portfolio_audit_events
      (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
    values (p_learner, auth.uid(), 'assessor', 'authenticity_confirmed', 'portfolio_item', it.id,
            jsonb_build_object('title', it.title, 'assessor_name', v_name, 'authenticity_id', v_id),
            it.content_hash);
    v_out := v_out || jsonb_build_object('portfolio_item_id', it.id, 'id', v_id, 'confirmed_at', v_now, 'new', true);
  end loop;
  return jsonb_build_object('confirmed', jsonb_array_length(v_out), 'items', v_out);
end;
$$;
revoke all on function public.confirm_evidence_authenticity(uuid, uuid[], uuid) from public, anon;
grant execute on function public.confirm_evidence_authenticity(uuid, uuid[], uuid) to authenticated;

commit;
