-- ELE-1913 (1/4): one push path for the College Hub <-> apprentice loop.
--
-- Before this, a College Hub state change reached people three different ways:
--   * notify_user()            bell + push + preferences + dedup (quiz, plan items)
--   * insert into user_notifications directly  bell only, never a push
--     (assessor decisions, review booked / to sign / signed, employer view in,
--      gateway declaration, app learning approved / left out, hours statement,
--      diary questions, shared-portfolio comments, assessor accepted)
--   * insert into push_notification_log only   NO push and NOT in the header bell
--     (safeguarding to the DSL, pastoral flags, grades, ILP reviewed, EPA
--      judgement, gateway passed, portfolio submission reviewed)
--
-- This migration:
--   1. registers every college/apprentice notification type with a category,
--      so per-category opt-outs work and the bell can group them;
--   2. adds five staff categories (college_marking, college_hours,
--      college_messages, college_reviews, college_safeguarding). Safeguarding
--      cannot be turned off: notify_user ignores an opt-out for it;
--   3. splits the push half of notify_user into _notify_push() so a bell row
--      written directly (by the functions listed above) pushes too, through an
--      AFTER INSERT trigger on user_notifications. The trigger only acts on
--      rows notify_user did NOT write (those carry metadata.category) and only
--      for college/apprentice categories, so nothing outside the college loop
--      starts pushing twice.
-- Quiet hours stay in send-push-notification (21:00-07:00 UK unless the user
-- turned them off); importance >= 2 (safeguarding only, here) goes through.

-- 1. Registry -----------------------------------------------------------------
insert into public.notification_types (type, category, push, importance) values
  -- learner side ('apprentice' = the learner's "College and apprenticeship" switch)
  ('assessment_decision',       'apprentice',           true,  1),
  ('assessment_plan_set',       'apprentice',           true,  1),
  ('quiz_set',                  'apprentice',           true,  1),
  ('quiz_marked',               'apprentice',           true,  1),
  ('quiz_ai_marked',            'apprentice',           true,  1),
  ('otj_verified',              'apprentice',           true,  1),
  ('otj_returned',              'apprentice',           true,  1),
  ('otj_app_approved',          'apprentice',           true,  1),
  ('otj_app_left_out',          'apprentice',           true,  1),
  ('otj_statement',             'apprentice',           true,  1),
  ('tripartite_booked',         'apprentice',           true,  1),
  ('tripartite_sign',           'apprentice',           true,  1),
  ('grade_recorded',            'apprentice',           true,  1),
  ('ilp_reviewed',              'apprentice',           true,  1),
  ('ilp_goal_set',              'apprentice',           true,  1),
  ('ilp_goal_comment',          'apprentice',           true,  1),
  ('epa_judgement',             'apprentice',           true,  1),
  ('gateway_passed',            'apprentice',           true,  1),
  ('portfolio_reviewed',        'apprentice',           true,  1),
  ('witness_signed',            'apprentice',           true,  1),
  ('share_review',              'apprentice',           true,  1),
  ('share_comment',             'apprentice',           true,  1),
  ('assessor_accepted',         'apprentice',           true,  1),
  ('tutor_message',             'messages',             true,  1),
  ('college_message',           'messages',             true,  1),
  -- staff side
  ('quiz_submitted',            'college_marking',      true,  1),
  ('assessment_plan_done',      'college_marking',      false, 1),
  ('witness_signed_staff',      'college_marking',      true,  1),
  ('otj_resubmitted',           'college_hours',        false, 1),
  ('learner_message',           'college_messages',     true,  1),
  ('diary_question',            'college_messages',     true,  1),
  ('ilp_goal_reply',            'college_messages',     true,  1),
  ('tripartite_employer_input', 'college_reviews',      true,  1),
  ('tripartite_signed',         'college_reviews',      true,  1),
  ('gateway_declaration',       'college_reviews',      true,  1),
  ('risk_critical',             'college_reviews',      true,  1),
  ('safeguarding_logged',       'college_safeguarding', true,  2),
  ('safeguarding_escalation',   'college_safeguarding', true,  2),
  ('pastoral_flag',             'college_safeguarding', true,  1),
  -- no category: answers to the person's own request / their daily summary
  ('export_ready',              null,                   true,  1),
  ('tutor_daily_digest',        null,                   true,  1)
on conflict (type) do update
  set category = excluded.category, push = excluded.push,
      importance = excluded.importance, updated_at = now();

-- 2. Push half, shared ----------------------------------------------------------
create or replace function public._notify_push(
  p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb,
  p_category text, p_importance smallint)
returns boolean
language plpgsql
security definer
set search_path to 'public', 'extensions'
as $function$
declare
  v_data jsonb := coalesce(p_data, '{}'::jsonb);
  v_ref text := v_data->>'ref_id'; v_route text := v_data->>'route';
  v_pref_enabled boolean; v_has_token boolean; v_already boolean;
  v_push_type text; v_push_data jsonb; service_key text;
begin
  if p_user_id is null then return false; end if;

  -- Per-category opt-out (default on). Safeguarding cannot be switched off.
  if p_category is not null and p_category <> 'college_safeguarding' then
    select enabled into v_pref_enabled
    from public.notification_preferences
    where user_id = p_user_id and category = p_category;
    if v_pref_enabled is false then return false; end if;
  end if;

  select exists(select 1 from public.push_subscriptions
    where user_id = p_user_id and is_active = true) into v_has_token;
  if not v_has_token then return false; end if;

  -- One push per user+type+ref per day.
  if v_ref is not null then
    select exists(select 1 from public.push_notification_log
      where user_id = p_user_id and type = p_type and reference_id = v_ref
        and sent_at::date = current_date) into v_already;
    if v_already then return false; end if;
  end if;

  select decrypted_secret into service_key
  from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if service_key is null then
    raise warning '[_notify_push] service_role_key not found in vault';
    return false;
  end if;

  v_push_type := coalesce(v_data->>'push_type', case
    when p_category = 'invoices_quotes' then 'invoice'
    when p_category = 'certificates_compliance' then 'certificate'
    when p_category = 'tasks_projects' then 'task'
    when p_category = 'messages' then 'team'
    when p_category = 'mental_health' then 'mental_health'
    when p_category = 'daily_briefing' then 'briefing'
    when p_category = 'apprentice' or p_category like 'college\_%' then 'college'
    else 'default' end);

  v_push_data := v_data || jsonb_build_object('importance', coalesce(p_importance, 1));
  if v_route is not null and (v_push_data->>'deep_link') is null then
    v_push_data := v_push_data || jsonb_build_object('deep_link', v_route);
  end if;

  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/send-push-notification',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || service_key),
    body := jsonb_build_object(
      'userId', p_user_id, 'title', p_title, 'body', p_message,
      'type', v_push_type, 'data', v_push_data,
      'skipQuietHours', coalesce(p_importance, 1) >= 2)
  );

  insert into public.push_notification_log (user_id, type, reference_id, title, body)
  values (p_user_id, p_type, v_ref, p_title, p_message);
  return true;
exception when others then
  raise warning '[_notify_push] failed for % / %: %', p_user_id, p_type, sqlerrm;
  return false;
end;
$function$;

revoke all on function public._notify_push(uuid, text, text, text, jsonb, text, smallint) from public, anon, authenticated;

-- notify_user: same contract as before (bell always, push when registered),
-- now delegating the push half. Behaviour changes: college/apprentice types
-- push as type 'college', and a safeguarding push ignores an opt-out.
create or replace function public.notify_user(p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb default '{}'::jsonb)
returns uuid
language plpgsql
security definer
set search_path to 'public', 'extensions'
as $function$
declare
  v_id uuid; v_data jsonb := coalesce(p_data, '{}'::jsonb);
  v_cat text; v_push boolean; v_importance smallint;
  v_route text := v_data->>'route'; v_meta jsonb;
begin
  if p_user_id is null then return null; end if;

  select category, push, importance into v_cat, v_push, v_importance
  from public.notification_types where type = p_type;
  if not found then
    v_push := false; v_importance := 1;
  end if;

  -- metadata.category marks the row as written here, so the user_notifications
  -- push trigger leaves it alone.
  v_meta := v_data || jsonb_build_object('category', v_cat, 'importance', coalesce(v_importance,1));
  insert into public.user_notifications (user_id, type, title, message, link, metadata)
  values (p_user_id, p_type, p_title, p_message, v_route, v_meta)
  returning id into v_id;

  if v_push is true then
    perform public._notify_push(p_user_id, p_type, p_title, p_message, v_data, v_cat, v_importance);
  end if;
  return v_id;
exception when others then
  raise warning '[notify_user] failed for % / %: %', p_user_id, p_type, sqlerrm;
  return v_id;
end;
$function$;

revoke all on function public.notify_user(uuid, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.notify_user(uuid, text, text, text, jsonb) to service_role;

-- 3. Bell rows written directly push too (college loop only) -------------------
create or replace function public.tg_user_notification_push()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_cat text; v_push boolean; v_importance smallint; v_data jsonb;
begin
  -- Written by notify_user, which has already pushed (or chosen not to).
  if coalesce(new.metadata, '{}'::jsonb) ? 'category' then return new; end if;

  select category, push, importance into v_cat, v_push, v_importance
  from public.notification_types where type = new.type;
  if not found or v_push is not true then return new; end if;
  -- Scope: only the college <-> apprentice loop, so other areas that push
  -- separately (Part P, payments) are never pushed twice.
  if v_cat is null or not (v_cat = 'apprentice' or v_cat like 'college\_%'
                           or new.type in ('tutor_message', 'college_message')) then
    return new;
  end if;

  v_data := coalesce(new.metadata, '{}'::jsonb)
            || jsonb_build_object('notification_id', new.id)
            || case when new.link is not null then jsonb_build_object('route', new.link) else '{}'::jsonb end;
  perform public._notify_push(new.user_id, new.type, new.title, new.message, v_data, v_cat, v_importance);
  return new;
exception when others then
  raise warning '[tg_user_notification_push] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

revoke all on function public.tg_user_notification_push() from public, anon, authenticated;

drop trigger if exists trg_user_notification_push on public.user_notifications;
create trigger trg_user_notification_push
  after insert on public.user_notifications
  for each row execute function public.tg_user_notification_push();
