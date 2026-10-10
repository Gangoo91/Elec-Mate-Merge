-- Register the firm notifications added 7–8 Oct so notify_employer_bell sends
-- them through notify_user (push, the person's category preferences) instead
-- of the unregistered fallback. Also renames the 7am office brief's type so
-- it can't be mistaken for the Electrical Hub's own morning_brief.
insert into public.notification_types (type, category, push, importance) values
  ('office_morning_brief', 'daily_briefing', true, 2),
  ('cert_signed_off', 'certificates_compliance', true, 2),
  ('recurring_visit', 'tasks_projects', true, 1),
  ('apprentice_month', 'apprentice', true, 1)
on conflict (type) do nothing;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.notify_office_morning_brief()'::regprocedure);
  if position('office_morning_brief' in v_def) = 0 then
    v_def := replace(v_def, $q$r.firm, 'morning_brief', 'Today in your firm',$q$, $q$r.firm, 'office_morning_brief', 'Today in your firm',$q$);
    v_def := replace(v_def, $q$v_ref text := 'morning_brief:'$q$, $q$v_ref text := 'office_morning_brief:'$q$);
    execute v_def;
  end if;
end $$;
