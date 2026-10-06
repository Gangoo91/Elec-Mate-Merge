-- College Hub session, 6 Oct: get_employer_apprentice_college_progress summed
-- college_otj_entries itself, so an employer could see different OTJ hours
-- from the apprentice and the tutor. _otj_summary_core (behind get_otj_summary)
-- is the one figure. Required, verified and counted hours and "on track" now
-- come from it; the employer-only columns (hours this firm confirmed, entries
-- waiting for them) are unchanged. Patched in place so the College Hub's own
-- edits to this function (review dates) are kept. Safe to re-run.
do $$
declare v_def text; v_old text;
begin
  v_def := pg_get_functiondef('public.get_employer_apprentice_college_progress()'::regprocedure);
  if position('_otj_summary_core' in v_def) > 0 then
    return;
  end if;
  v_old := v_def;

  v_def := replace(v_def,
    E'    base.otj_required_hours,\n    base.otj_verified_hours,\n    case\n',
    E'    coalesce((otj.s->>''required_hours'')::numeric, base.otj_required_hours)::int,\n'
    || E'    coalesce((otj.s->>''verified_hours'')::numeric, base.otj_verified_hours)::int,\n'
    || E'    case when coalesce(otj.s->>''risk'', ''unknown'') <> ''unknown'' then otj.s->>''risk'' = ''on_track'' else case\n');
  v_def := replace(v_def, E'    end as otj_on_track,', E'    end end as otj_on_track,');
  v_def := replace(v_def, E'    base.otj_total_hours,',
    E'    coalesce((otj.s->>''counted_hours'')::numeric, base.otj_total_hours)::int,');
  v_def := replace(v_def, E'  ) base\n',
    E'  ) base\n  cross join lateral (select public._otj_summary_core(base.student_user_id) as s) otj\n');

  if v_def = v_old
     or position('otj.s->>''counted_hours''' in v_def) = 0
     or position('end end as otj_on_track' in v_def) = 0
     or position('cross join lateral (select public._otj_summary_core' in v_def) = 0
     or position('otj.s->>''required_hours''' in v_def) = 0 then
    raise exception 'get_employer_apprentice_college_progress: patch did not apply cleanly';
  end if;
  execute v_def;
end $$;
