-- ELE-1834: the competence record counts training evidence, not just tickets.
--   * signed briefings / toolbox talks, read from the existing signing stores:
--       - team_briefings (the Site Safety model): attendees[].signature and
--         attendee_signatures[] (by link / marked present), matched to the
--         firm's roster by name, exactly as the Site Safety register does;
--       - briefings + briefing_attendees (the older employer store), by
--         employee_id.
--   * the apprentice's off-the-job hours: workplace-attested and
--     college-verified kept as separate figures, plus what is still waiting.
--
-- READ ONLY. Nothing here writes to or alters a briefing table. Site Safety is
-- adding team_briefings.employer_id in parallel; _firm_team_briefing_ids()
-- reads it only when the column exists (dynamic SQL), so this works before
-- and after that migration lands. Until then a firm's briefings are the ones
-- its owner account ran.
--
-- This is CPD / training evidence. It never makes a credential held and is
-- shown beside the matrix, never in a credential column.

create or replace function public._firm_team_briefing_ids(p_firm uuid)
returns setof uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_has_employer boolean;
begin
  if p_firm is null then
    return;
  end if;

  return query
    select tb.id
      from public.team_briefings tb
     where tb.user_id = p_firm
       and coalesce(lower(tb.status), '') <> 'cancelled';

  select exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'team_briefings' and column_name = 'employer_id'
  ) into v_has_employer;

  if v_has_employer then
    return query execute
      'select tb.id from public.team_briefings tb
        where tb.employer_id = $1 and coalesce(lower(tb.status), '''') <> ''cancelled'''
      using p_firm;
  end if;
end;
$$;

revoke all on function public._firm_team_briefing_ids(uuid) from public, anon, authenticated;

create or replace function public.get_team_training_evidence()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with roster as (
    select r.id, r.employer_id, r.user_id, lower(btrim(coalesce(r.name, ''))) as nm
      from public._my_team_roster() r
  ),
  firms as (
    select distinct employer_id from roster where employer_id is not null
  ),
  tb as (
    select distinct f.employer_id, x.id
      from firms f
      cross join lateral public._firm_team_briefing_ids(f.employer_id) as x(id)
  ),
  tb_rows as (
    select tb.employer_id, b.id,
           coalesce(nullif(btrim(b.briefing_name), ''), 'Briefing') as title,
           b.briefing_date as d,
           case when jsonb_typeof(b.attendees) = 'array' then b.attendees else '[]'::jsonb end as att,
           case when jsonb_typeof(b.attendee_signatures) = 'array' then b.attendee_signatures else '[]'::jsonb end as sig
      from tb
      join public.team_briefings b on b.id = tb.id
  ),
  signed as (
    -- Signed in the app against a listed attendee
    select r.id as employee_id, t.id as briefing_id, t.title, t.d, 'Signed'::text as how
      from tb_rows t
      join roster r on r.employer_id = t.employer_id and r.nm <> ''
     where exists (select 1 from jsonb_array_elements(t.att) a
                    where lower(btrim(coalesce(a->>'name', ''))) = r.nm
                      and coalesce(a->>'signature', '') <> '')
    union all
    -- Signed by the shared link, or marked present when it was delivered
    select r.id, t.id, t.title, t.d,
           case when s->>'signed_via' = 'in_person' then 'Marked present' else 'Signed by link' end
      from tb_rows t
      join roster r on r.employer_id = t.employer_id and r.nm <> ''
      cross join lateral (
        select s from jsonb_array_elements(t.sig) s
         where lower(btrim(coalesce(s->>'name', ''))) = r.nm
         limit 1
      ) z
    union all
    -- The older employer briefing store, keyed by roster row
    select r.id, b.id, coalesce(nullif(btrim(b.title), ''), 'Briefing'), b.date, 'Signed'
      from public.briefing_attendees ba
      join public.briefings b on b.id = ba.briefing_id
      join roster r on r.id = ba.employee_id and b.user_id = r.employer_id
     where ba.acknowledged
       and coalesce(lower(b.status), '') <> 'cancelled'
  ),
  signed_once as (
    select distinct on (employee_id, briefing_id) employee_id, briefing_id, title, d, how
      from signed
     order by employee_id, briefing_id, how
  ),
  briefs as (
    select s.employee_id,
           count(*)::int as n,
           max(s.d) as last_d,
           (select coalesce(jsonb_agg(jsonb_build_object('title', x.title, 'date', x.d, 'how', x.how)
                                      order by x.d desc nulls last), '[]'::jsonb)
              from (select * from signed_once y
                     where y.employee_id = s.employee_id
                     order by y.d desc nulls last
                     limit 5) x) as recent
      from signed_once s
     group by s.employee_id
  ),
  otj_rows as (
    select r.id as employee_id, o.duration_minutes as m, o.activity_type, o.verified_at,
           (o.verification_status = 'verified_by_employer'
            or (o.verification_status = 'verified'
                and (o.source_kind = 'employer_attested' or o.attested_by_name is not null))) as attested,
           (o.verification_status = 'verified') as college,
           (o.verification_status = 'pending'
            and o.source_kind in ('apprentice_submitted', 'in_app')) as waiting
      from roster r
      join public.college_otj_entries o on o.student_id = r.user_id
     where r.user_id is not null
  ),
  otj as (
    select employee_id,
           coalesce(sum(m) filter (where attested), 0)::int as attested_min,
           coalesce(sum(m) filter (where college), 0)::int as college_min,
           count(*) filter (where waiting)::int as waiting_n,
           max(verified_at) filter (where attested) as last_attested_at
      from otj_rows
     group by employee_id
  ),
  otj_types as (
    select employee_id, jsonb_object_agg(activity_type, mins) as by_type
      from (select employee_id, activity_type, sum(m)::int as mins
              from otj_rows where attested
             group by employee_id, activity_type) t
     group by employee_id
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'employee_id', r.id,
           'briefings_signed', coalesce(b.n, 0),
           'last_briefing_on', b.last_d,
           'recent_briefings', coalesce(b.recent, '[]'::jsonb),
           'otj_attested_minutes', coalesce(o.attested_min, 0),
           'otj_college_verified_minutes', coalesce(o.college_min, 0),
           'otj_waiting', coalesce(o.waiting_n, 0),
           'otj_last_attested_at', o.last_attested_at,
           'otj_attested_by_type', coalesce(ot.by_type, '{}'::jsonb)
         )), '[]'::jsonb)
    from roster r
    left join briefs b on b.employee_id = r.id
    left join otj o on o.employee_id = r.id
    left join otj_types ot on ot.employee_id = r.id
   where b.employee_id is not null or o.employee_id is not null;
$$;

revoke all on function public.get_team_training_evidence() from public, anon;
grant execute on function public.get_team_training_evidence() to authenticated;

comment on function public.get_team_training_evidence() is
  'ELE-1834: per roster member, briefings signed (team_briefings + briefing_attendees, read only) and off-the-job hours (workplace-attested, college-verified, waiting). Training evidence only; never a held credential.';
