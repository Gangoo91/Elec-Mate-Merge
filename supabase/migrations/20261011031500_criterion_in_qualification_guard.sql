-- A criterion claim or decision must use a criterion that is in the
-- qualification it is filed under.
--
-- Found 10 Oct 2026: 22 claims filed under 5357 used 2357 / 2365-02 unit and
-- AC codes. They matched nothing in qualification_requirements, so progress
-- read 0 of 340 with no error anywhere. Those rows are left exactly as they
-- are (a trigger only fires on writes, and a re-insert of an existing claim
-- is not re-checked).
--
-- Rule (public._criterion_in_qualification):
--   * no qualification on the row                      -> allowed
--   * we hold no criteria for that qualification yet   -> allowed
--   * (qualification, unit, AC) is a row in qualification_requirements -> allowed
--   * otherwise                                        -> rejected
-- qualification_requirements is unique on (qualification_code, unit_code,
-- ac_code) and has version_label / effective_from / effective_to. A row from
-- any version counts, so a claim against an older version is never blocked.
--
-- Guards:
--   portfolio_item_criteria         BEFORE INSERT OR UPDATE OF the codes.
--                                    A learner / assessor claim raises; an AI
--                                    suggestion that is not in the qualification
--                                    is dropped (it could never count, and a
--                                    bad suggestion must not fail the save).
--   portfolio_assessment_decisions   BEFORE INSERT (decisions are insert-only;
--                                    _pad_update_guard covers updates).
--   _portfolio_items_criteria_sync   the legacy string path (portfolio_items.
--                                    assessment_criteria_met) skips a criterion
--                                    that is not in the learner's qualification
--                                    instead of raising, so evidence is never
--                                    lost. The text stays on the item; the
--                                    client's set_portfolio_item_criteria call
--                                    reports it to the learner.
-- QA: public.list_mismatched_criterion_claims(p_college_id) for staff.

create or replace function public._criterion_in_qualification(
  p_qualification text, p_unit text, p_ac text
) returns boolean
language sql stable security definer
set search_path = public
as $$
  select p_qualification is null
      or not exists (select 1 from public.qualification_requirements r
                      where r.qualification_code = p_qualification)
      or exists (select 1 from public.qualification_requirements r
                  where r.qualification_code = p_qualification
                    and r.unit_code = p_unit
                    and r.ac_code = p_ac);
$$;

revoke all on function public._criterion_in_qualification(text, text, text) from public, anon;
grant execute on function public._criterion_in_qualification(text, text, text) to authenticated, service_role;

-- ─── portfolio_item_criteria ────────────────────────────────────────────
create or replace function public._pic_criterion_guard()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE'
     and new.qualification_code is not distinct from old.qualification_code
     and new.unit_code is not distinct from old.unit_code
     and new.ac_code is not distinct from old.ac_code then
    return new;
  end if;
  -- INSERT ... ON CONFLICT of a claim that already exists: the existing row is
  -- not re-checked (BEFORE INSERT fires before the conflict is found).
  if tg_op = 'INSERT' and exists (
       select 1 from public.portfolio_item_criteria c
        where c.portfolio_item_id = new.portfolio_item_id
          and c.unit_code = new.unit_code
          and c.ac_code = new.ac_code) then
    return new;
  end if;
  if public._criterion_in_qualification(new.qualification_code, new.unit_code, new.ac_code) then
    return new;
  end if;
  if tg_op = 'INSERT' and new.source = 'ai_suggested' then
    return null;
  end if;
  raise exception 'Criterion % % is not in qualification %',
    new.unit_code, new.ac_code, new.qualification_code
    using errcode = '23514',
          hint = 'Choose a criterion from this learner''s qualification.';
end;
$$;

-- Named to sort after trg_pic_before_write, which fills qualification_code on insert.
drop trigger if exists trg_pic_zz_criterion_guard on public.portfolio_item_criteria;
create trigger trg_pic_zz_criterion_guard
  before insert or update of qualification_code, unit_code, ac_code
  on public.portfolio_item_criteria
  for each row execute function public._pic_criterion_guard();

-- ─── portfolio_assessment_decisions ─────────────────────────────────────
create or replace function public._pad_criterion_guard()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if public._criterion_in_qualification(new.qualification_code, new.unit_code, new.ac_code) then
    return new;
  end if;
  raise exception 'Criterion % % is not in qualification %',
    new.unit_code, new.ac_code, new.qualification_code
    using errcode = '23514',
          hint = 'Choose a criterion from this learner''s qualification.';
end;
$$;

drop trigger if exists trg_pad_criterion_guard on public.portfolio_assessment_decisions;
create trigger trg_pad_criterion_guard
  before insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_criterion_guard();

-- ─── legacy string path: skip, never raise ──────────────────────────────
-- Same as the live definition (20261007233100) plus the qualification filter
-- on the insert.
create or replace function public._portfolio_items_criteria_sync()
returns trigger
language plpgsql security definer
set search_path = public
as $function$
declare v_refs text[]; v_q text;
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
  -- a criterion not in the learner's qualification is not typed (the text
  -- stays on the item; _pic_criterion_guard would otherwise fail the save)
  select requirement_code into v_q from public._resolve_qualification(new.user_id, null);
  insert into public.portfolio_item_criteria (portfolio_item_id, learner_id, unit_code, ac_code, source)
  select new.id, new.user_id, split_part(r, '|', 1), split_part(r, '|', 2), 'learner'
    from unnest(v_refs) r
   where public._criterion_in_qualification(v_q, split_part(r, '|', 1), split_part(r, '|', 2))
      or exists (select 1 from public.portfolio_item_criteria c
                  where c.portfolio_item_id = new.id
                    and c.unit_code = split_part(r, '|', 1)
                    and c.ac_code = split_part(r, '|', 2))
  on conflict (portfolio_item_id, unit_code, ac_code) do nothing;
  return new;
end; $function$;

-- ─── QA: claims and decisions that are not in their qualification ───────
create or replace function public.list_mismatched_criterion_claims(p_college_id uuid default null)
returns table (
  kind text,
  row_id uuid,
  learner_id uuid,
  learner_name text,
  college_id uuid,
  portfolio_item_id uuid,
  item_title text,
  qualification_code text,
  unit_code text,
  ac_code text,
  source text,
  created_at timestamptz,
  found_in_qualifications text[]
)
language plpgsql stable security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_admin boolean := public._is_platform_admin();
begin
  if auth.uid() is null then
    raise exception 'sign in to use this check' using errcode = '42501';
  end if;
  if not v_admin and (
       p_college_id is null
       or not (public.college_can('learners.view_all', p_college_id)
               or public.college_can('quality.view', p_college_id))) then
    raise exception 'only college staff who can see all learners can use this check' using errcode = '42501';
  end if;

  return query
  with bad as (
    select 'claim'::text as kind, c.id as row_id, c.learner_id, c.portfolio_item_id,
           c.qualification_code, c.unit_code, c.ac_code, c.source, c.created_at
      from public.portfolio_item_criteria c
     where not public._criterion_in_qualification(c.qualification_code, c.unit_code, c.ac_code)
    union all
    select 'decision', d.id, d.learner_id, null::uuid,
           d.qualification_code, d.unit_code, d.ac_code, d.decision, d.decided_at
      from public.portfolio_assessment_decisions d
     where d.superseded_at is null
       and not public._criterion_in_qualification(d.qualification_code, d.unit_code, d.ac_code)
  )
  select b.kind, b.row_id, b.learner_id, pr.full_name, cs.college_id, b.portfolio_item_id, pi.title,
         b.qualification_code, b.unit_code, b.ac_code, b.source, b.created_at,
         (select array_agg(r.qualification_code order by r.qualification_code)
            from public.qualification_requirements r
           where r.unit_code = b.unit_code and r.ac_code = b.ac_code)
    from bad b
    left join public.profiles pr on pr.id = b.learner_id
    left join public.portfolio_items pi on pi.id = b.portfolio_item_id
    left join lateral (
      select s.college_id from public.college_students s
       where s.user_id = b.learner_id
         and (p_college_id is null or s.college_id = p_college_id)
       order by s.created_at desc
       limit 1) cs on true
   where p_college_id is null or cs.college_id is not null
   order by b.created_at desc;
end;
$$;

revoke all on function public.list_mismatched_criterion_claims(uuid) from public, anon;
grant execute on function public.list_mismatched_criterion_claims(uuid) to authenticated, service_role;

comment on function public.list_mismatched_criterion_claims(uuid) is
  'QA: criterion claims (portfolio_item_criteria) and live decisions whose unit/AC is not in the qualification they are filed under. Platform admins: all (or one college). College staff with learners.view_all or quality.view: their college only.';
