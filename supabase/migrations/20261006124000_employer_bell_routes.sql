-- ELE-1988 review pass 2: boss-side alerts that opened nothing or the wrong page.
-- Found 6 Oct:
--   leave_requested, snag_reported, task_done/blocked, pack_signed → no route
--   expense claim → '/employer?section=timesheets' (wrong page)
--   task comment → '/electrician/worker-tools?task=…' (a worker page, sent to the boss)
--   decide_employer_quote → no route
-- Every boss alert goes through notify_employer_bell, so destinations are
-- normalised here: a route already inside the Employer Hub is kept (incidents,
-- apprentice hours, leads…); anything else gets the right hub page by type.
--
-- Also: the worker's "Job pack to sign" push pointed at
-- '/electrician/worker-tools?signoff=…' — the page is /worker-tools/signoffs.

create or replace function public.notify_employer_bell(
  p_employer uuid, p_type text, p_title text, p_message text, p_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_central text;
  v_meta jsonb := coalesce(p_meta, '{}'::jsonb);
  v_route text := coalesce(v_meta->>'route', v_meta->>'link');
begin
  if p_employer is null then return; end if;

  if v_route is null or v_route not like '/employer%' then
    v_route := case
      when p_type like 'expense%'   then '/employer?section=expenses'
      when p_type like 'timesheet%' then '/employer?section=timesheets&tab=pending'
      when p_type like 'leave%'     then '/employer?section=timesheets&tab=leave'
      when p_type like 'snag%'      then '/employer?section=quality'
      when p_type like 'pack%'      then '/employer?section=jobpacks'
      when p_type like 'task%'      then '/employer?section=jobs'
                                         || coalesce('&job=' || (v_meta->>'job_id'), '')
      when p_type like 'quote%'     then '/employer?section=quotes'
                                         || coalesce('&quote=' || (v_meta->>'quote_id'), '')
      else v_route
    end;
  end if;
  if v_route is not null then
    v_meta := v_meta || jsonb_build_object('route', v_route);
  end if;

  if exists (select 1 from public.notification_types t where t.type = p_type) then
    v_central := p_type;
  else
    v_central := case
      when p_type like 'timesheet%' then 'timesheet'
      when p_type like 'leave%'     then 'leave'
      when p_type like 'expense%'   then 'expense'
      when p_type like 'snag%'      then 'snag'
      when p_type like 'task%'      then 'task_due'
      when p_type like 'pack%'      then 'task_due'
      else null
    end;
  end if;

  for r in
    select p_employer as uid
    union
    select a.user_id
      from public.employer_admins a
     where a.employer_id = p_employer
       and a.status = 'active'
       and a.user_id is not null
  loop
    begin
      if v_central is not null then
        perform public.notify_user(
          r.uid, v_central, p_title, p_message,
          v_meta || jsonb_build_object('source_type', p_type)
        );
      else
        insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
        values (r.uid, p_type, p_title, p_message, v_route, v_meta);
      end if;
    exception when others then
      raise warning '[notify_employer_bell] recipient % failed: %', r.uid, sqlerrm;
    end;
  end loop;
end;
$function$;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.trg_notify_pack_ack'::regproc);
  if position('''/electrician/worker-tools?signoff=''' in v_def) > 0 then
    execute replace(v_def,
      '''/electrician/worker-tools?signoff=''',
      '''/electrician/worker-tools/signoffs?signoff=''');
  end if;
end $$;

-- The expense trigger hard-codes the Timesheets page and the timesheet trigger
-- the default tab; both are Employer Hub routes, so the normaliser above keeps
-- them. Correct them at source.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.trg_notify_expense_claim'::regproc);
  if position('''/employer?section=timesheets''' in v_def) > 0 then
    execute replace(v_def, '''/employer?section=timesheets''', '''/employer?section=expenses''');
  end if;
  v_def := pg_get_functiondef('public.trg_notify_timesheet_submission'::regproc);
  if position('''/employer?section=timesheets''' in v_def) > 0 then
    execute replace(v_def, '''/employer?section=timesheets''', '''/employer?section=timesheets&tab=pending''');
  end if;
end $$;
