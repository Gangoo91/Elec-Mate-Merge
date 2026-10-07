-- Employer Hub + Worker Tools notification audit (7 Oct 2026).
--
-- Andrew: "all notifications should be a capital letter, the deep links need
-- to be 100% working, they go to the right places, concentrate on the
-- employer ones."
--
-- What this changes
--   1. One tidy rule at every sink: a capital first letter and no em dashes.
--      worker_notify, notify_employer_bell, notify_company, notify_user (non
--      college types; college types keep their own capital-only rule) and the
--      BEFORE INSERT triggers on employer_notifications / user_notifications.
--   2. Pushes from team_push now carry `deep_link` as well as `route`, so a
--      web/PWA tap lands on the same page as the bell (the service worker sent
--      every team push to /employer/team, which is not a route).
--   3. Deep links point at the record, not just the page: jobs?job=,
--      leads&lead=, expenses&expense=, qsreviews&review=, quality&job=,
--      jobpacks&job=, progresslogs&job=, team&member=, section=leave (was the
--      timesheets&tab=leave redirect), worker reports?job=&incident=,
--      tasks?task=, signoffs?signoff=, qs-reviews?review=.
--   4. Recipients: a removed (Archived) roster member gets nothing new;
--      payment events (invoice paid / failed / recovered / due) go to the owner
--      and Admin managers only, never Office managers; a quote-page lead reaches
--      the owner AND the managers; a certificate for QS review reaches the
--      owner and Admin managers (they can sign) and team QSs get a bell row on
--      their own Worker Tools page instead of an /employer link they cannot open.
--   5. Em dashes rewritten at the source in every employer/worker message.
--
-- Method: each function is patched from its LIVE definition
-- (pg_get_functiondef) with exact find/replace pairs. A pair that does not
-- match aborts the migration, so nothing is half-applied, and everything not
-- named here (grants, security definer, search_path) is kept as it is.

create or replace function pg_temp.patch_fn(p_sig text, p_pairs text[])
returns void language plpgsql as $$
declare
  d text := pg_get_functiondef(p_sig::regprocedure);
  i int;
begin
  if array_length(p_pairs, 1) % 2 <> 0 then
    raise exception 'patch_fn %: odd number of strings', p_sig;
  end if;
  for i in 1 .. array_length(p_pairs, 1) by 2 loop
    if position(p_pairs[i] in d) = 0 then
      raise exception 'patch_fn %: pair % not found: %', p_sig, (i + 1) / 2, left(p_pairs[i], 120);
    end if;
    d := replace(d, p_pairs[i], p_pairs[i + 1]);
  end loop;
  execute d;
end $$;

-- ───────────────────────── 1. The tidy rule ─────────────────────────

create or replace function public._notif_tidy(p text)
returns text
language sql
immutable
set search_path to ''
as $function$
  -- Capital first letter (after any leading quote or bracket) and no em dashes:
  -- " — " reads as a comma, a bare "—" as a hyphen.
  select public._notif_cap(replace(replace(p, ' — ', ', '), '—', '-'))
$function$;

grant execute on function public._notif_tidy(text) to authenticated, service_role;

-- worker_notify: tidy, skip an Archived roster member, and give the push the
-- same deep link as the bell row.
create or replace function public.worker_notify(p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb default '{}'::jsonb)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_emp text := p_data->>'employee_id';
begin
  if p_user_id is null then return; end if;
  -- A removed worker gets nothing new. Callers that know the roster row pass
  -- employee_id; the triggers also filter Archived rows when they look it up.
  if v_emp ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
     and exists (select 1 from public.employer_employees e
                  where e.id = v_emp::uuid and lower(coalesce(e.status, '')) = 'archived') then
    return;
  end if;
  p_title := public._notif_tidy(p_title);
  p_message := public._notif_tidy(p_message);
  p_data := coalesce(p_data, '{}'::jsonb);
  insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
  values (p_user_id, p_type, p_title, p_message, p_data->>'route', p_data);
  perform team_push(p_user_id, p_title, p_message, p_data);
exception when others then
  raise warning '[worker_notify] % / %: %', p_user_id, p_type, sqlerrm;
end; $function$;

-- team_push: the service worker reads deep_link (native reads route). Send both.
select pg_temp.patch_fn('public.team_push(uuid,text,text,jsonb)', array[
  $q$      'data', p_data$q$,
  $q$      'data', case when (p_data->>'route') like '/%' and (p_data->>'deep_link') is null
                   then p_data || jsonb_build_object('deep_link', p_data->>'route')
                   else p_data end$q$
]);

select pg_temp.patch_fn('public.notify_employer_bell(uuid,text,text,text,jsonb)', array[
  -- tidy once, before the fan-out
  $q$  if p_employer is null then return; end if;
$q$,
  $q$  if p_employer is null then return; end if;
  p_title := public._notif_tidy(p_title);
  p_message := public._notif_tidy(p_message);
$q$,
  -- fallbacks open the record, not just the page
  $q$      when p_type like 'expense%'   then '/employer?section=expenses'
$q$,
  $q$      when p_type like 'expense%'   then '/employer?section=expenses'
                                         || coalesce('&expense=' || (v_meta->>'expense_id'), '')
$q$,
  $q$      when p_type like 'leave%'     then '/employer?section=timesheets&tab=leave'
      when p_type like 'snag%'      then '/employer?section=quality'
      when p_type like 'pack%'      then '/employer?section=jobpacks'
$q$,
  $q$      when p_type like 'leave%'     then '/employer?section=leave'
      when p_type like 'snag%'      then '/employer?section=quality'
                                         || coalesce('&job=' || (v_meta->>'job_id'), '')
      when p_type like 'pack%'      then '/employer?section=jobpacks'
                                         || coalesce('&job=' || (v_meta->>'job_id'), '')
$q$
]);

select pg_temp.patch_fn('public.fill_employer_notification_fields()', array[
  $q$  if new.action_url is null then$q$,
  $q$  new.title := public._notif_tidy(new.title);
  new.message := public._notif_tidy(new.message);

  if new.action_url is null then$q$
]);

-- notify_user: college types keep their capital-only rule (College Hub owns
-- that copy); every other type gets the tidy rule too.
select pg_temp.patch_fn('public.notify_user(uuid,text,text,text,jsonb)', array[
  $q$  if public._notif_is_college(p_type) then
    p_title := public._notif_cap(p_title);
    p_message := public._notif_cap(p_message);
  end if;$q$,
  $q$  if public._notif_is_college(p_type) then
    p_title := public._notif_cap(p_title);
    p_message := public._notif_cap(p_message);
  else
    p_title := public._notif_tidy(p_title);
    p_message := public._notif_tidy(p_message);
  end if;$q$
]);

-- Direct inserts into user_notifications (edge functions, older triggers).
select pg_temp.patch_fn('public.tg_user_notification_capitalise()', array[
  $q$    new.message := public._notif_cap(new.message);
  end if;$q$,
  $q$    new.message := public._notif_cap(new.message);
  else
    new.title := public._notif_tidy(new.title);
    new.message := public._notif_tidy(new.message);
  end if;$q$
]);

-- notify_company: payment events never reach Office managers (ELE-1831: Office
-- runs the hub without money). Owner + Admin managers only.
select pg_temp.patch_fn('public.notify_company(uuid,text,text,text,jsonb)', array[
  $q$     where a.employer_id = p_owner and a.status = 'active' and a.user_id is not null$q$,
  $q$     where a.employer_id = p_owner and a.status = 'active' and a.user_id is not null
       and (p_type not in ('invoice_paid', 'payment_failed', 'payment_recovered', 'invoice_due_soon')
            or a.access_role = 'admin')$q$,
  $q$      perform public.notify_user(r.uid, p_type, p_title, p_message, p_data);$q$,
  $q$      perform public.notify_user(r.uid, p_type, public._notif_tidy(p_title),
                                 public._notif_tidy(p_message), p_data);$q$
]);

-- ───────────────────────── 2. Worker → office ─────────────────────────

select pg_temp.patch_fn('public.trg_notify_expense_claim()', array[
  $q$coalesce(' — ' || new.category, ''),$q$,
  $q$coalesce(' (' || new.category || ')', ''),$q$,
  $q$'route', '/employer?section=expenses')$q$,
  $q$'route', '/employer?section=expenses&expense=' || new.id)$q$
]);

select pg_temp.patch_fn('public.trg_notify_snag()', array[
  $q$        jsonb_build_object('issue_id', new.id, 'job_id', new.job_id)$q$,
  $q$        jsonb_build_object('issue_id', new.id, 'job_id', new.job_id,
          'route', '/employer?section=quality' || coalesce('&job=' || new.job_id, ''))$q$
]);

select pg_temp.patch_fn('public.trg_notify_pack_ack()', array[
  $q$  select p.title, p.employer_id into v_pack$q$,
  $q$  select p.title, p.employer_id, p.job_id into v_pack$q$,
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$' — read and sign before you start'$q$,
  $q$': read and sign before you start'$q$,
  $q$      jsonb_build_object('job_pack_id', new.job_pack_id, 'employee_id', new.employee_id)$q$,
  $q$      jsonb_build_object('job_pack_id', new.job_pack_id, 'employee_id', new.employee_id,
        'job_id', v_pack.job_id,
        'route', '/employer?section=jobpacks' || coalesce('&job=' || v_pack.job_id, ''))$q$
]);

select pg_temp.patch_fn('public.trg_notify_task_comment()', array[
  $q$    select t.title, t.employer_id, t.assignee_employee_id into v_task$q$,
  $q$    select t.title, t.employer_id, t.assignee_employee_id, t.job_id into v_task$q$,
  $q$      select e.user_id into v_worker from employer_employees e where e.id = v_task.assignee_employee_id;$q$,
  $q$      select e.user_id into v_worker from employer_employees e
       where e.id = v_task.assignee_employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$          'route', '/electrician/worker-tools?task=' || new.task_id));$q$,
  $q$          'route', '/electrician/worker-tools/tasks?task=' || new.task_id));$q$,
  $q$        jsonb_build_object('task_id', new.task_id));$q$,
  $q$        jsonb_build_object('task_id', new.task_id, 'job_id', v_task.job_id));$q$
]);

select pg_temp.patch_fn('public.notify_progress_note()', array[
  $q$      'route', '/employer?section=progresslogs',$q$,
  $q$      'route', '/employer?section=progresslogs&job=' || new.job_id,$q$
]);

select pg_temp.patch_fn('public.respond_team_invite(uuid,boolean)', array[
  $q$    jsonb_build_object('route', '/employer?section=team'));$q$,
  $q$    jsonb_build_object('route', '/employer?section=team&tab=invited&member=' || p_employee_id,
                       'employee_id', p_employee_id));$q$
]);

-- Quote-page lead: owner AND managers (a lead is not a money event), opening
-- the lead itself.
create or replace function public.notify_owner_new_lead()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  r record;
begin
  if NEW.source = 'Quote page' then
    for r in
      select NEW.user_id as uid
      union
      select a.user_id from public.employer_admins a
       where a.employer_id = NEW.user_id and a.status = 'active' and a.user_id is not null
    loop
      perform worker_notify(
        r.uid,
        'new_lead',
        'New quote request',
        coalesce(nullif(trim(NEW.name), ''), 'Someone') || ' asked for a quote'
          || case when NEW.job_type is not null then ': ' || NEW.job_type
                  when NEW.notes is not null and length(trim(NEW.notes)) > 0
                  then ': ' || left(trim(NEW.notes), 120) else '' end
          || case when NEW.postcode is not null then ' (' || NEW.postcode || ')' else '' end
          || case when cardinality(NEW.photos) > 0 then ', with photos' else '' end,
        jsonb_build_object('route', '/employer?section=leads&lead=' || NEW.id,
                           'lead_id', NEW.id, 'source', NEW.source)
      );
    end loop;
  end if;
  return NEW;
exception when others then
  raise warning '[notify_owner_new_lead] %', sqlerrm;
  return new;
end;
$function$;

-- QS review submitted: owner + Admin managers get the bell (they can sign);
-- team QSs get a bell row + push that opens their own Worker Tools queue.
select pg_temp.patch_fn('public.submit_report_for_qs_review(uuid,text)', array[
  $q$    v_body := v_electrician_name || ' submitted ' || upper(v_report.report_type) || ' ' ||$q$,
  $q$    v_body := v_electrician_name || ' submitted ' || public.notif_cert_label(v_report.report_type) || ' ' ||$q$,
  $q$    insert into public.employer_notifications (user_id, type, title, message, metadata)
    values (
      v_employer_id,
      'qs_review_submitted',
      'Certificate awaiting QS review',
      v_body,
      jsonb_build_object(
        'review_id', v_review.id,
        'report_id', v_report.report_id,
        'report_type', v_report.report_type,
        'route', '/employer?section=qsreviews'
      )
    );

    -- Owner/employer push (oversight) — same bell+push pattern as snags.
    perform public.qs_review_push(
      v_employer_id,
      'Certificate awaiting QS review',
      v_body,
      jsonb_build_object('review_id', v_review.id, 'report_id', v_report.report_id, 'route', '/employer?section=qsreviews')
    );$q$,
  $q$    -- Owner and Admin managers (QS signers): bell + push into the hub queue.
    for v_qs in
      select v_employer_id as user_id
      union
      select a.user_id from public.employer_admins a
       where a.employer_id = v_employer_id and a.status = 'active'
         and a.access_role = 'admin' and a.user_id is not null
    loop
      continue when v_qs.user_id = auth.uid();
      insert into public.employer_notifications (user_id, type, title, message, metadata)
      values (
        v_qs.user_id,
        'qs_review_submitted',
        'Certificate awaiting QS review',
        v_body,
        jsonb_build_object(
          'review_id', v_review.id,
          'report_id', v_report.report_id,
          'report_type', v_report.report_type,
          'route', '/employer?section=qsreviews&review=' || v_review.id
        )
      );
      perform public.qs_review_push(
        v_qs.user_id,
        'Certificate awaiting QS review',
        v_body,
        jsonb_build_object('review_id', v_review.id, 'report_id', v_report.report_id,
                           'route', '/employer?section=qsreviews&review=' || v_review.id,
                           'deep_link', '/employer?section=qsreviews&review=' || v_review.id)
      );
    end loop;$q$,
  $q$        and team_role ilike 'qs'
        and status ilike 'active'
    loop
      perform public.qs_review_push(
        v_qs.user_id,
        'Certificate awaiting QS review',
        v_electrician_name || ' submitted a ' || upper(v_report.report_type) || ' for your review',
        jsonb_build_object('review_id', v_review.id, 'route', '/employer?section=qsreviews')
      );
    end loop;$q$,
  $q$        and team_role ilike 'qs'
        and status ilike 'active'
        and user_id not in (select a.user_id from public.employer_admins a
                             where a.employer_id = v_employer_id and a.status = 'active'
                               and a.access_role = 'admin' and a.user_id is not null)
    loop
      perform public.worker_notify(
        v_qs.user_id,
        'qs_review_submitted',
        'Certificate awaiting QS review',
        v_electrician_name || ' sent ' || public.notif_cert_label(v_report.report_type) || ' ' ||
          coalesce(v_report.certificate_number, v_report.report_id) || ' for your review',
        jsonb_build_object('review_id', v_review.id, 'report_id', v_report.report_id,
                           'route', '/electrician/worker-tools/qs-reviews?side=review&review=' || v_review.id)
      );
    end loop;$q$
]);

select pg_temp.patch_fn('public.cancel_qs_reviews_on_report_delete()', array[
  $q$            'A certificate awaiting your QS review was deleted and no longer needs reviewing.',
            jsonb_build_object('review_id', v_rev.id, 'route', '/employer?section=qsreviews')$q$,
  $q$            'A certificate awaiting your QS review was deleted and no longer needs reviewing.',
            jsonb_build_object('review_id', v_rev.id,
                               'route', '/electrician/worker-tools/qs-reviews?side=review',
                               'deep_link', '/electrician/worker-tools/qs-reviews?side=review')$q$,
  $q$          jsonb_build_object('review_id', v_rev.id, 'route', '/employer?section=qsreviews')
        );$q$,
  $q$          jsonb_build_object('review_id', v_rev.id, 'route', '/employer?section=qsreviews',
                             'deep_link', '/employer?section=qsreviews')
        );$q$
]);

-- ───────────────────────── 3. Office → worker ─────────────────────────

select pg_temp.patch_fn('public.trg_notify_assignment()', array[
  $q$  select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;$q$,
  $q$  select e.user_id into v_worker from employer_employees e
   where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$    jsonb_build_object('job_id', new.job_id, 'route', '/electrician/worker-tools/jobs'));$q$,
  $q$    jsonb_build_object('job_id', new.job_id, 'employee_id', new.employee_id,
                       'route', '/electrician/worker-tools/jobs?job=' || new.job_id));$q$
]);

select pg_temp.patch_fn('public.trg_notify_task_assignment()', array[
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.assignee_employee_id;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.assignee_employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$      coalesce(v_job, 'Job') || ' — ' || new.priority || ' priority',$q$,
  $q$      coalesce(v_job, 'Job') || ' · ' || coalesce(new.priority, 'Medium') || ' priority',$q$,
  $q$        'route', '/electrician/worker-tools?task=' || new.id)$q$,
  $q$        'employee_id', new.assignee_employee_id,
        'route', '/electrician/worker-tools/tasks?task=' || new.id)$q$
]);

select pg_temp.patch_fn('public.trg_notify_timesheet_decision()', array[
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$      to_char(new.date, 'DD Mon') || ' — ' ||$q$,
  $q$      to_char(new.date, 'FMDD Mon') || ': ' ||$q$
]);

select pg_temp.patch_fn('public.trg_notify_leave_decision()', array[
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$             then ' — ' || left(new.rejected_reason, 140)
             else ' — ' || lower(new.status) end,$q$,
  $q$             then ': ' || left(new.rejected_reason, 140)
             when lower(new.status) = 'approved' then ' approved'
             else ' declined' end,$q$
]);

select pg_temp.patch_fn('public.trg_notify_leave_request()', array[
  $q$  from employer_employees e where e.id = new.employee_id;$q$,
  $q$  from employer_employees e
  where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$      jsonb_build_object('leave_id', new.id)
    );$q$,
  $q$      jsonb_build_object('leave_id', new.id, 'route', '/employer?section=leave')
    );$q$,
  $q$      v_when || ' — ' ||$q$,
  $q$      v_when || ': ' ||$q$
]);

select pg_temp.patch_fn('public.trg_notify_expense_decision()', array[
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$        coalesce(' — ' || new.category, '') || ' ' || lower(new.status) ||$q$,
  $q$        coalesce(' (' || new.category || ')', '') || ' ' || lower(new.status) ||$q$
]);

select pg_temp.patch_fn('public.trg_notify_snag_decision()', array[
  $q$    select e.user_id into v_worker from employer_employees e where e.id = new.reported_by;$q$,
  $q$    select e.user_id into v_worker from employer_employees e
     where e.id = new.reported_by and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$      coalesce(new.title, 'Your reported issue') || ' — ' || lower(new.status),$q$,
  $q$      coalesce(new.title, 'Your reported issue') || ': ' || lower(new.status),$q$,
  $q$      jsonb_build_object('snag_id', new.id, 'route', '/electrician/worker-tools/reports'));$q$,
  $q$      jsonb_build_object('snag_id', new.id, 'employee_id', new.reported_by,
        'route', '/electrician/worker-tools/reports' || coalesce('?job=' || new.job_id, '')));$q$
]);

select pg_temp.patch_fn('public.chase_pack_signoff(uuid)', array[
  $q$  select e.user_id into v_worker from employer_employees e where e.id = v_ack.employee_id;$q$,
  $q$  select e.user_id into v_worker from employer_employees e
   where e.id = v_ack.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$'route', '/electrician/worker-tools?signoff=' || v_ack.id)$q$,
  $q$'employee_id', v_ack.employee_id, 'route', '/electrician/worker-tools/signoffs?signoff=' || v_ack.id)$q$
]);

select pg_temp.patch_fn('public.notify_worker_status_override()', array[
  $q$  select e.user_id into v_worker from public.employer_employees e where e.id = new.employee_id;$q$,
  $q$  select e.user_id into v_worker from public.employer_employees e
   where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';$q$
]);

-- Safety reports: open the worker's report on its job.
select pg_temp.patch_fn('public.acknowledge_incident(uuid)', array[
  $q$     where e.id = v_row.reported_by::uuid and e.employer_id = v_row.employer_id;$q$,
  $q$     where e.id = v_row.reported_by::uuid and e.employer_id = v_row.employer_id
       and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$        jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', p_id)$q$,
  $q$        jsonb_build_object('route', '/electrician/worker-tools/reports?'
                             || coalesce('job=' || v_row.job_id || '&', '') || 'incident=' || p_id,
                           'incident_id', p_id)$q$
]);

select pg_temp.patch_fn('public.notify_incident()', array[
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)$q$,
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports?'
                             || coalesce('job=' || NEW.job_id || '&', '') || 'incident=' || NEW.id,
                         'incident_id', NEW.id, 'employee_id', NEW.reported_by)$q$
]);

select pg_temp.patch_fn('public.notify_incident_action_owners()', array[
  $q$     where e.id = v_owner and e.employer_id = NEW.employer_id;$q$,
  $q$     where e.id = v_owner and e.employer_id = NEW.employer_id
       and lower(coalesce(e.status, '')) <> 'archived';$q$,
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)$q$,
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports?'
                             || coalesce('job=' || NEW.job_id || '&', '') || 'incident=' || NEW.id,
                         'incident_id', NEW.id)$q$
]);

select pg_temp.patch_fn('public.notify_incident_supervisors()', array[
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)$q$,
  $q$      jsonb_build_object('route', '/electrician/worker-tools/reports?'
                             || coalesce('job=' || NEW.job_id || '&', '') || 'incident=' || NEW.id,
                         'incident_id', NEW.id)$q$
]);

-- QS decisions: open that certificate on the worker's QS page.
select pg_temp.patch_fn('public.approve_qs_review(uuid,text,text,text)', array[
  $q$jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews')$q$,
  $q$jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews?review=' || p_review_id, 'deep_link', '/electrician/worker-tools/qs-reviews?review=' || p_review_id)$q$,
  $q$      '/electrician/worker-tools/qs-reviews',$q$,
  $q$      '/electrician/worker-tools/qs-reviews?review=' || p_review_id,$q$
]);

select pg_temp.patch_fn('public.return_qs_review(uuid,text)', array[
  $q$' needs changes — see QS comments'$q$,
  $q$' needs changes. See the QS comments.'$q$,
  $q$jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews')$q$,
  $q$jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews?review=' || p_review_id, 'deep_link', '/electrician/worker-tools/qs-reviews?review=' || p_review_id)$q$,
  $q$    '/electrician/worker-tools/qs-reviews',$q$,
  $q$    '/electrician/worker-tools/qs-reviews?review=' || p_review_id,$q$
]);

select pg_temp.patch_fn('public.notify_report_owner_of_qs_edit(text)', array[
  $q$      || coalesce(' — ' || nullif(v_addr, ''), ''),$q$,
  $q$      || coalesce(' at ' || nullif(v_addr, ''), ''),$q$
]);

select pg_temp.patch_fn('public.log_report_edit()', array[
  $q$          ' was edited by your QS — now at a new version.',$q$,
  $q$          ' was edited by your QS. It is now at a new version.',$q$
]);

-- ───────────────────────── 4. Clients → office ─────────────────────────

select pg_temp.patch_fn('public.mark_quote_viewed(uuid)', array[
  $q$      'Quote ' || coalesce(v_number, '') || ' — ' || public.notif_money(v_total)$q$,
  $q$      coalesce('Quote ' || nullif(v_number, '') || ', ', 'Quote of ') || public.notif_money(v_total)$q$
]);

-- Legacy `invoices` table: there is no detail page for these rows (the invoice
-- page reads `quotes`), so open the invoices list rather than a blank page.
select pg_temp.patch_fn('public.trigger_invoice_paid_push()', array[
  $q$        'route', '/electrician/invoices/' || NEW.id::text, 'invoice_id', NEW.id::text));$q$,
  $q$        'route', '/electrician/invoices', 'invoice_id', NEW.id::text));$q$
]);

drop function pg_temp.patch_fn(text, text[]);
