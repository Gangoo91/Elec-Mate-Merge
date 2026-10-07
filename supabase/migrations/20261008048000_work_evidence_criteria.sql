-- ELE-1906 Electrical-specific evidence: certificates, schedules of test
-- results and calculations turned into portfolio evidence.
--
-- suggest_work_evidence_criteria() says which of the learner's REAL
-- qualification criteria a piece of their own work could evidence. It never
-- invents a code: every row comes from qualification_requirements for the
-- qualification _resolve_qualification() picks for the caller (college course
-- first, then the learner's own selection).
--
-- How it decides. The app knows what the work contains (an EIC with
-- insulation resistance and RCD results, a cable sizing calculation with a
-- volt drop check). The client turns that into signal keys; each key is a
-- pattern matched against the wording of every criterion:
--   ac_text match 4, lo_text 1, unit_title 1, per signal
--   +3 when the criterion is a performance one ("carry out", "complete",
--      "record", "verify", "select", "determine"...), because a certificate
--      the learner filled in shows doing, not knowing.
-- Rows need an ac_text match and a score of 6 or more. The result is only a
-- suggestion: the capture sheet shows it, the learner taps what the work
-- really shows, and those go in as typed criteria with source 'learner'
-- (set_portfolio_item_criteria). Nothing here writes, claims or passes.

create or replace function public.suggest_work_evidence_criteria(
  p_signals text[],
  p_limit integer default 8)
returns table (
  qualification_code text,
  unit_code text,
  unit_title text,
  ac_code text,
  ac_text text,
  score integer,
  matched text[],
  practical boolean)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  v_code text;
begin
  if v_uid is null then
    raise exception 'sign in to see suggested criteria' using errcode = '42501';
  end if;
  if coalesce(array_length(p_signals, 1), 0) = 0 then
    return;
  end if;
  select r.requirement_code into v_code from public._resolve_qualification(v_uid, null) r limit 1;
  if v_code is null then
    return;
  end if;

  return query
  with dict(key, pattern, label) as (
    values
      ('certification', '(certificat|documentation)', 'certification'),
      ('inspection', '\minspect', 'inspection'),
      ('test_results', '(test results?|record[a-z]* .*test|schedules? of test)', 'recording test results'),
      ('continuity', '(continuity|ring final)', 'continuity'),
      ('insulation', 'insulation resistance', 'insulation resistance'),
      ('polarity', 'polarity', 'polarity'),
      ('efli', '(earth fault loop|loop impedance)', 'earth fault loop impedance'),
      ('rcd', '(residual current|\mrcds?\M)', 'RCD testing'),
      ('pfc', '(prospective fault current|\mpfc\M)', 'prospective fault current'),
      ('commissioning', 'commission', 'commissioning'),
      ('periodic', '(periodic|condition report)', 'periodic inspection'),
      ('functional', 'functional (test|check)', 'functional testing'),
      ('cable_size', '(cable siz|sizing|selection of (cables|conductors)|current[- ]carrying capacity|cross[- ]sectional area|\mcsa\M)', 'cable sizing'),
      ('voltage_drop', 'volt(age)? drop', 'voltage drop'),
      ('max_demand', '(maximum demand|diversity)', 'maximum demand and diversity'),
      ('science', '(ohm.?s law|voltage and resistance|resistivity|power factor|values of power|electrical quantities)', 'electrical science'),
      ('protective_device', '(protective device|overcurrent|disconnection time|breaking capacity)', 'protective devices'),
      ('earthing', '(earthing|adiabatic|protective conductor)', 'earthing and protective conductors'),
      ('design', '(design current|circuit design|design calculation|designing)', 'circuit design')
  ),
  sig as (
    select d.key, d.pattern, d.label from dict d where d.key = any (p_signals)
  ),
  scored as (
    select r.qualification_code as q, r.unit_code as u, min(r.unit_title) as ut, r.ac_code as a, min(r.ac_text) as t,
           sum((case when r.ac_text ~* s.pattern then 4 else 0 end)
             + (case when coalesce(r.lo_text, '') ~* s.pattern then 1 else 0 end)
             + (case when coalesce(r.unit_title, '') ~* s.pattern then 1 else 0 end))::int as raw,
           array_agg(s.label order by s.label) filter (where r.ac_text ~* s.pattern) as m,
           bool_or(r.ac_text ~* '^\s*(carry out|complete|record|measure|verify|confirm|select|undertake|analyse|determine|calculate|conform|inspect|test|use|apply|check|interpret and apply|specify and (apply|undertake))') as prac
      from public.qualification_requirements r
      cross join sig s
     where r.qualification_code = v_code
       and r.ac_code is not null and r.ac_text is not null
     group by r.qualification_code, r.unit_code, r.ac_code
  )
  select sc.q, sc.u, sc.ut, sc.a, sc.t,
         (sc.raw + case when sc.prac then 3 else 0 end)::int,
         sc.m, coalesce(sc.prac, false)
    from scored sc
   where sc.m is not null
     and sc.raw + case when sc.prac then 3 else 0 end >= 6
   order by sc.raw + case when sc.prac then 3 else 0 end desc, sc.u, sc.a
   limit least(greatest(coalesce(p_limit, 8), 1), 20);
end; $$;

comment on function public.suggest_work_evidence_criteria(text[], integer) is
  'ELE-1906. Which of the caller''s real qualification criteria a certificate, schedule of test results or calculation could evidence. Signal keys from the client are matched against qualification_requirements wording; never invents codes, never writes. The learner claims what applies via set_portfolio_item_criteria.';

revoke all on function public.suggest_work_evidence_criteria(text[], integer) from public, anon;
grant execute on function public.suggest_work_evidence_criteria(text[], integer) to authenticated;
