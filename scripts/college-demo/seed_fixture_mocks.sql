-- Seed a believable mock-exam history for the Northgate demo learners
-- (ELE-1763), so the tutor's mock results screens show real patterns in a
-- demo. Fictional "(fixture)" learners only, rows marked source = 'fixture'
-- (analytics_daily excludes them). Idempotent: re-running replaces the seed.
--
--   npx --yes supabase db query --linked --project-ref jtwygbeceundfgnkirof -f scripts/college-demo/seed_fixture_mocks.sql

do $$
declare
  v_college constant uuid := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
  l record;
  i int;
  n_att int;
  base numeric;
  slope numeric;
  gap_days int;
  pct int;
  tq int;
  slug text;
  ename text;
  topics jsonb;
  t record;
  skill numeric;
  asked int;
  right_n int;
  ts timestamptz;
begin
  if not exists (select 1 from public.colleges where id = v_college and is_demo) then
    raise exception 'demo college not flagged is_demo; refusing to seed';
  end if;

  delete from public.seo_mock_attempts a
   using public.college_students cs
   where a.source = 'fixture' and a.user_id = cs.user_id
     and cs.college_id = v_college and cs.name like '%(fixture)%';

  for l in
    select cs.user_id, cs.name, cs.start_date,
           abs(hashtext(cs.user_id::text)) h
      from public.college_students cs
     where cs.college_id = v_college and cs.name like '%(fixture)%' and cs.user_id is not null
  loop
    -- Per learner: level 48–84, trend -14..+20 points over the period, 3–9 mocks.
    base := 48 + (l.h % 37);
    slope := ((l.h / 37) % 35) - 14;
    n_att := 3 + ((l.h / 7) % 7);
    gap_days := case when l.h % 9 = 0 then 35 else 0 end;   -- a few have gone quiet
    if l.start_date is not null and l.start_date > current_date - 21 then
      n_att := 1;                                            -- just started
    end if;

    for i in 1..n_att loop
      ts := now() - make_interval(days => gap_days + ((n_att - i) * (78 - gap_days) / greatest(n_att, 1))::int,
                                  hours => (l.h + i * 5) % 9 + 9);
      case (l.h + i) % 3
        when 0 then slug := 'inspection-testing'; ename := 'Inspection & Testing Mock Examination'; tq := 30;
        when 1 then slug := 'bs7671'; ename := null; tq := 30;
        else slug := 'level3-module8-mock3'; ename := null; tq := 60;
      end case;

      topics := '{}'::jsonb;
      pct := 0;
      right_n := 0;
      for t in
        select * from (values
          ('Calculations', 'Earth Fault Loop Impedance', -22),
          ('Earth Electrodes', 'Earth Fault Loop Impedance', -18),
          ('Inspection Intervals', 'Introduction', -14),
          ('RCD Testing', 'RCD Testing', -4),
          ('Insulation Resistance', 'Insulation Resistance', 0),
          ('Bonding', 'Continuity Testing', 4),
          ('Polarity', 'Polarity & Functional Testing', 6),
          ('Safe Isolation', 'Introduction', 10),
          ('Certification', 'Introduction', 2),
          ('Definitions', 'RCD Testing', 8)
        ) v(topic, sub, adj)
      loop
        skill := least(97, greatest(15, base + slope * i / n_att + t.adj + ((l.h + i * 13 + length(t.topic)) % 11) - 5));
        asked := greatest(1, tq / 10);
        topics := topics || jsonb_build_object(t.topic, jsonb_build_object(
          'n', asked, 'a', asked, 'r', round(asked * skill / 100.0)::int, 's', t.sub));
        right_n := right_n + round(asked * skill / 100.0)::int;
      end loop;
      pct := round(100.0 * right_n / (greatest(1, tq / 10) * 10))::int;

      insert into public.seo_mock_attempts
        (exam_slug, exam_name, score, total_questions, percentage, time_taken_seconds,
         passed, pass_mark, created_at, source, user_id, topic_stats)
      values
        (slug, ename, round(tq * pct / 100.0)::int, tq, pct, tq * (45 + (l.h % 40)),
         pct >= 60, 60, ts, 'fixture', l.user_id, topics);
    end loop;
  end loop;
end $$;

select count(*) as seeded, count(distinct user_id) as learners
  from public.seo_mock_attempts where source = 'fixture';
