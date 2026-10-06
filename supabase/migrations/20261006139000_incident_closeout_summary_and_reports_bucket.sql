-- ELE-1945: actions_taken was doing two jobs. The office form writes the
-- IMMEDIATE action into it, and the close-out notification + the worker's
-- "Action taken" line read it as the OUTCOME. Closing a report therefore told
-- the worker whatever was typed on day one. closeout_summary is the outcome.

alter table public.employer_incidents
  add column if not exists closeout_summary text;

comment on column public.employer_incidents.closeout_summary is
  'What was done, written at close-out. Shown to the reporter and sent in the close notification. actions_taken = the IMMEDIATE action on the day.';

-- Close-out message prefers the summary.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.notify_incident()'::regprocedure);
  if position('closeout_summary' in v_def) = 0 then
    v_def := replace(v_def,
      'coalesce(nullif(NEW.actions_taken, ''''), ''The office has closed your report.'')',
      'coalesce(nullif(NEW.closeout_summary, ''''), nullif(NEW.actions_taken, ''''), ''The office has closed your report.'')');
    if position('closeout_summary' in v_def) = 0 then
      raise exception 'notify_incident close-out message not found; update by hand';
    end if;
    execute v_def;
  end if;
end $$;

-- Private bucket for generated incident / RIDDOR PDFs. Written only by the
-- generate-incident-report-pdf function (service role); read only through
-- short-lived signed URLs it returns. No client policies on purpose.
insert into storage.buckets (id, name, public)
values ('incident-reports', 'incident-reports', false)
on conflict (id) do update set public = false;
