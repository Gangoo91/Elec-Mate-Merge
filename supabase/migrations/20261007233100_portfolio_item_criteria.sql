-- ELE-1864 Typed criteria on evidence (Portfolio 2.0, P-ELE-13).
--
-- Until now an item's criteria lived only as free-text strings in
-- portfolio_items.assessment_criteria_met ("204 AC 6.2: Test ring final"),
-- and the capture sheet auto-ticked AI matches at 80% into that array, so an
-- AI guess became a learner claim the moment it was saved.
--
-- portfolio_item_criteria is now the record of which criterion each item
-- covers and WHO says so:
--   learner       the learner ticked it (a claim)
--   ai_suggested  the AI matched it; NOT a claim until the learner confirms
--   assessor      an assessor tied this item to a criterion in a decision
--
-- Writers:
--   set_portfolio_item_criteria()  the capture sheet, detail sheet (learner only)
--   trigger on portfolio_items     older writers that still only set the strings
--                                  (diary-to-evidence, notebook) keep working
--   record_ac_decisions()          adds 'assessor' rows for the items it cites
-- The string array is still written for one release so older readers work.

-- 1. Parser for the legacy strings ------------------------------------------
create or replace function public._parse_ac_ref(p_ref text)
returns table (unit_code text, ac_code text)
language sql immutable set search_path to 'public' as $$
  select u, a from (
    select
      coalesce(
        (regexp_match(p_ref, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(p_ref, '\(([A-Za-z0-9/._-]+)\)\s*AC\y'))[1],
        (regexp_match(p_ref, '^\s*([A-Za-z0-9/._-]+)\s+AC\y'))[1],
        (regexp_match(p_ref, '([A-Za-z0-9/._-]+)\s*AC\y'))[1]) as u,
      (regexp_match(p_ref, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] as a
  ) x
  where u is not null and a is not null;
$$;

-- 2. The table ----------------------------------------------------------------
create table if not exists public.portfolio_item_criteria (
  id uuid primary key default gen_random_uuid(),
  portfolio_item_id uuid not null references public.portfolio_items(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  qualification_code text,
  unit_code text not null,
  ac_code text not null,
  source text not null check (source in ('learner', 'ai_suggested', 'assessor')),
  confidence smallint check (confidence between 0 and 100),
  ai_reason text,
  confirmed_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (portfolio_item_id, unit_code, ac_code)
);
create index if not exists pic_learner_idx on public.portfolio_item_criteria (learner_id, unit_code, ac_code);
alter table public.portfolio_item_criteria enable row level security;

comment on table public.portfolio_item_criteria is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Which assessment criterion each evidence item covers, and who says so (learner claim, AI suggestion, assessor). Scope: one row per item x criterion, owned by the learner (learner_id). Used by: capture sheet, evidence detail, get_portfolio_ac_state, assessor workspace, Student 360. Rule: an ai_suggested row is never a claim until the learner confirms it; writes go through set_portfolio_item_criteria / record_ac_decisions, never direct.';

drop policy if exists "Learner reads own item criteria" on public.portfolio_item_criteria;
create policy "Learner reads own item criteria" on public.portfolio_item_criteria
  for select to authenticated using (learner_id = auth.uid());
drop policy if exists "Assessing staff read item criteria" on public.portfolio_item_criteria;
create policy "Assessing staff read item criteria" on public.portfolio_item_criteria
  for select to authenticated using (public._can_assess(learner_id));
-- No insert/update/delete policies: writes go through the definer functions below.

create or replace function public._pic_before_write()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  select user_id into new.learner_id from public.portfolio_items where id = new.portfolio_item_id;
  if new.learner_id is null then
    raise exception 'evidence item not found' using errcode = 'P0002';
  end if;
  if tg_op = 'INSERT' then
    if new.qualification_code is null then
      select requirement_code into new.qualification_code
        from public._resolve_qualification(new.learner_id, null);
    end if;
    new.created_by := coalesce(auth.uid(), new.created_by);
    if new.source in ('learner', 'assessor') and new.confirmed_at is null then
      new.confirmed_at := now();
    end if;
  end if;
  new.updated_at := now();
  return new;
end; $$;
drop trigger if exists trg_pic_before_write on public.portfolio_item_criteria;
create trigger trg_pic_before_write before insert or update on public.portfolio_item_criteria
  for each row execute function public._pic_before_write();

-- 3. Keep the one-release string mirror in step -----------------------------
create or replace function public._pic_mirror_strings(p_item uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_old text[]; v_new text[] := '{}'; s text; c record; v_claimed text[];
begin
  select coalesce(assessment_criteria_met, '{}') into v_old from public.portfolio_items where id = p_item;
  select coalesce(array_agg(unit_code || '|' || ac_code), '{}') into v_claimed
    from public.portfolio_item_criteria
   where portfolio_item_id = p_item and source in ('learner', 'assessor');
  -- keep strings that still match a claim, and strings we cannot parse (never lose the learner's text)
  foreach s in array v_old loop
    if not exists (select 1 from public._parse_ac_ref(s)) then
      v_new := v_new || s;
    elsif exists (select 1 from public._parse_ac_ref(s) p where (p.unit_code || '|' || p.ac_code) = any (v_claimed)) then
      v_new := v_new || s;
    end if;
  end loop;
  for c in select unit_code, ac_code from public.portfolio_item_criteria
            where portfolio_item_id = p_item and source in ('learner', 'assessor')
            order by unit_code, ac_code loop
    if not exists (select 1 from unnest(v_new) x, public._parse_ac_ref(x) p
                    where p.unit_code = c.unit_code and p.ac_code = c.ac_code) then
      v_new := v_new || (c.unit_code || ' AC ' || c.ac_code);
    end if;
  end loop;
  if v_new is distinct from v_old then
    perform set_config('portfolio.criteria_sync', 'off', true);
    update public.portfolio_items set assessment_criteria_met = v_new where id = p_item;
    perform set_config('portfolio.criteria_sync', 'on', true);
  end if;
end; $$;
revoke all on function public._pic_mirror_strings(uuid) from public, anon, authenticated;

-- Older writers only set the strings: turn their claims into typed rows.
create or replace function public._portfolio_items_criteria_sync()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_refs text[];
begin
  if coalesce(current_setting('portfolio.criteria_sync', true), 'on') = 'off' then return new; end if;
  if tg_op = 'UPDATE' and new.assessment_criteria_met is not distinct from old.assessment_criteria_met then
    return new;
  end if;
  select coalesce(array_agg(distinct p.unit_code || '|' || p.ac_code), '{}') into v_refs
    from unnest(coalesce(new.assessment_criteria_met, '{}')) s, public._parse_ac_ref(s) p;

  -- claims no longer in the strings: a learner claim is withdrawn
  delete from public.portfolio_item_criteria
   where portfolio_item_id = new.id and source = 'learner'
     and not ((unit_code || '|' || ac_code) = any (v_refs));
  -- claims in the strings: confirm a suggestion, or add a learner claim
  update public.portfolio_item_criteria
     set source = 'learner', confirmed_at = now()
   where portfolio_item_id = new.id and source = 'ai_suggested'
     and (unit_code || '|' || ac_code) = any (v_refs);
  insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, unit_code, ac_code, source)
  select new.id, new.user_id, split_part(r, '|', 1), split_part(r, '|', 2), 'learner'
    from unnest(v_refs) r
  on conflict (portfolio_item_id, unit_code, ac_code) do nothing;
  return new;
end; $$;
drop trigger if exists trg_portfolio_items_criteria_sync on public.portfolio_items;
create trigger trg_portfolio_items_criteria_sync after insert or update of assessment_criteria_met on public.portfolio_items
  for each row execute function public._portfolio_items_criteria_sync();

-- 4. The learner's writer ---------------------------------------------------
-- p_claimed:   [{unit_code, ac_code}]  the complete set the learner claims
-- p_suggested: [{unit_code, ac_code, confidence, reason}] AI matches (null = leave as they are)
create or replace function public.set_portfolio_item_criteria(
  p_item_id uuid, p_claimed jsonb, p_suggested jsonb default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_owner uuid; v_claimed text[]; c jsonb; n_claimed int; n_suggested int;
begin
  select user_id into v_owner from public.portfolio_items where id = p_item_id;
  if v_owner is null or v_owner is distinct from auth.uid() then
    raise exception 'only the learner who owns this evidence can claim criteria for it' using errcode = '42501';
  end if;
  if jsonb_typeof(coalesce(p_claimed, '[]'::jsonb)) <> 'array' then
    raise exception 'p_claimed must be an array' using errcode = '22023';
  end if;
  if jsonb_array_length(coalesce(p_claimed, '[]'::jsonb)) > 200 then
    raise exception 'too many criteria' using errcode = '22023';
  end if;

  select coalesce(array_agg(distinct trim(x->>'unit_code') || '|' || trim(x->>'ac_code')), '{}') into v_claimed
    from jsonb_array_elements(coalesce(p_claimed, '[]'::jsonb)) x
   where coalesce(trim(x->>'unit_code'), '') <> '' and coalesce(trim(x->>'ac_code'), '') <> '';

  -- unclaim: a learner claim drops; if the AI had suggested it, it goes back to a suggestion
  update public.portfolio_item_criteria
     set source = 'ai_suggested', confirmed_at = null
   where portfolio_item_id = p_item_id and source = 'learner' and confidence is not null
     and not ((unit_code || '|' || ac_code) = any (v_claimed));
  delete from public.portfolio_item_criteria
   where portfolio_item_id = p_item_id and source = 'learner'
     and not ((unit_code || '|' || ac_code) = any (v_claimed));
  -- claim: confirm a suggestion or add a claim (assessor rows stay as they are)
  update public.portfolio_item_criteria
     set source = 'learner', confirmed_at = now()
   where portfolio_item_id = p_item_id and source = 'ai_suggested'
     and (unit_code || '|' || ac_code) = any (v_claimed);
  insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, unit_code, ac_code, source)
  select p_item_id, v_owner, split_part(r, '|', 1), split_part(r, '|', 2), 'learner'
    from unnest(v_claimed) r
  on conflict (portfolio_item_id, unit_code, ac_code) do nothing;

  if p_suggested is not null and jsonb_typeof(p_suggested) = 'array' then
    for c in select * from jsonb_array_elements(p_suggested) limit 100 loop
      continue when coalesce(trim(c->>'unit_code'), '') = '' or coalesce(trim(c->>'ac_code'), '') = '';
      insert into public.portfolio_item_criteria
        (portfolio_item_id, learner_id, unit_code, ac_code, source, confidence, ai_reason)
      values (p_item_id, v_owner, trim(c->>'unit_code'), trim(c->>'ac_code'), 'ai_suggested',
              least(100, greatest(0, coalesce((c->>'confidence')::numeric, 0)))::smallint,
              left(c->>'reason', 500))
      on conflict (portfolio_item_id, unit_code, ac_code) do update
        set confidence = coalesce(public.portfolio_item_criteria.confidence, excluded.confidence),
            ai_reason = coalesce(public.portfolio_item_criteria.ai_reason, excluded.ai_reason);
    end loop;
  end if;

  perform public._pic_mirror_strings(p_item_id);
  select count(*) filter (where source in ('learner', 'assessor')), count(*) filter (where source = 'ai_suggested')
    into n_claimed, n_suggested
    from public.portfolio_item_criteria where portfolio_item_id = p_item_id;
  return jsonb_build_object('claimed', n_claimed, 'suggested', n_suggested);
end; $$;
revoke all on function public.set_portfolio_item_criteria(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.set_portfolio_item_criteria(uuid, jsonb, jsonb) to authenticated;

-- 5. Assessor decisions tie the items they cite to the criterion -------------
create or replace function public._pad_tag_items()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if coalesce(array_length(new.evidence_item_ids, 1), 0) = 0 then return new; end if;
  insert into public.portfolio_item_criteria
    (portfolio_item_id, learner_id, qualification_code, unit_code, ac_code, source)
  select i.id, i.user_id, new.qualification_code, new.unit_code, new.ac_code, 'assessor'
    from public.portfolio_items i
   where i.id = any (new.evidence_item_ids) and i.user_id = new.learner_id
  on conflict (portfolio_item_id, unit_code, ac_code) do update
    set source = case when public.portfolio_item_criteria.source = 'ai_suggested' then 'assessor'
                      else public.portfolio_item_criteria.source end,
        confirmed_at = coalesce(public.portfolio_item_criteria.confirmed_at, now());
  return new;
end; $$;
drop trigger if exists trg_pad_tag_items on public.portfolio_assessment_decisions;
create trigger trg_pad_tag_items after insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_tag_items();

-- 6. Backfill from the old strings -------------------------------------------
insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, unit_code, ac_code, source, created_by)
select distinct on (pi.id, p.unit_code, p.ac_code) pi.id, pi.user_id, p.unit_code, p.ac_code, 'learner', pi.user_id
  from public.portfolio_items pi,
       unnest(coalesce(pi.assessment_criteria_met, '{}')) s,
       public._parse_ac_ref(s) p
on conflict (portfolio_item_id, unit_code, ac_code) do nothing;

-- 7. The state function reads the typed rows --------------------------------
-- Adds 'suggested' (AI only, not a claim) and suggested_item_ids.
drop function if exists public.get_portfolio_ac_state(uuid);
create function public.get_portfolio_ac_state(p_user_id uuid default null)
returns table (
  unit_code text, unit_title text, lo_number int, lo_text text, ac_code text, ac_text text,
  state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
  decided_at timestamptz, assessor_name text, iqa_verdict text, qualification_code text,
  assessor_id uuid, iqa_feedback text, decision_method text, suggested_item_ids uuid[])
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with ev as (
    select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a, c.source
      from public.portfolio_item_criteria c
     where c.learner_id = v_user
       and (c.qualification_code is null or c.qualification_code = r.requirement_code)
  ),
  open_items as (
    select si.portfolio_item_id
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
  ),
  cur as (
    select distinct on (d.unit_code, d.ac_code) d.*
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user and d.qualification_code = r.requirement_code and d.superseded_at is null
     order by d.unit_code, d.ac_code, d.decided_at desc
  )
  select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
    case
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'
      when cur.decision = 'passed' and cur.iqa_verdict = 'not_confirmed' then 'iqa_rejected'
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested') then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code
                    and ev.source <> 'ai_suggested') then 'claimed'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'suggested'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source = 'ai_suggested'), '{}')
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $$;
revoke all on function public.get_portfolio_ac_state(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated;

-- 8. The old coverage sync used '\b' (backspace in Postgres regex, not a word
-- boundary), so only "Unit X AC y" strings ever reached student_ac_coverage.
-- It now uses the same parser.
create or replace function public.sync_portfolio_ac_evidence()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_student_id uuid;
  v_qual text;
begin
  if new.assessment_criteria_met is null
     or array_length(new.assessment_criteria_met, 1) is null then
    return new;
  end if;
  select r.college_student_id, r.requirement_code into v_student_id, v_qual
    from public._resolve_qualification(new.user_id, null) r;
  if v_student_id is null then return new; end if;
  if v_qual is null then
    select qualification_code into v_qual
      from public.student_ac_coverage where student_id = v_student_id limit 1;
  end if;
  if v_qual is null then return new; end if;
  with parsed as (
    select distinct p.unit_code, p.ac_code
      from unnest(new.assessment_criteria_met) as s, public._parse_ac_ref(s) p
  )
  update public.student_ac_coverage sac
     set status = 'evidenced',
         evidence_count = greatest(coalesce(sac.evidence_count, 0), 1),
         last_evidence_at = now(),
         updated_at = now()
    from parsed p
   where sac.student_id = v_student_id
     and sac.qualification_code = v_qual
     and sac.unit_code = p.unit_code
     and sac.ac_code = p.ac_code
     and sac.status in ('not_started', 'in_progress');
  return new;
end;
$$;
