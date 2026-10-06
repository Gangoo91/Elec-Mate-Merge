-- Review fixes (6 Oct, evidence privacy pass):
--  1. Share-link feedback could be pinned to an item outside the share's scope
--     (first submission item, else the learner's newest item) and then vanish
--     from the scoped comment list right after "Feedback sent". Pick an item
--     inside the share's scope.
--  2. No rate limit: a leaked link could flood a learner's comments and
--     notifications. At most 20 comments per share link in any 10 minutes.
--  3. evidence-files used an owner-only read rule, so assessors could not sign
--     those files. Same rule as portfolio-evidence.

create or replace function public._share_comment_flood(p_share_user uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select count(*) >= 20
    from public.portfolio_comments
   where user_id = p_share_user
     and context_type in ('share_feedback', 'share_review')
     and created_at > now() - interval '10 minutes';
$$;
revoke all on function public._share_comment_flood(uuid) from public, anon, authenticated;

create or replace function public.add_share_comment(
  p_share_token text, p_author_name text, p_author_role text, p_content text, p_evidence_id uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_share record;
  v_comment_id uuid;
begin
  if coalesce(trim(p_author_name), '') = '' or coalesce(trim(p_content), '') = '' then
    return jsonb_build_object('error', 'Add your name and a comment');
  end if;
  select * into v_share from portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if v_share is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  if public._share_comment_flood(v_share.user_id) then
    return jsonb_build_object('error', 'Too many comments in a short time. Try again in a few minutes.');
  end if;
  if not exists (select 1 from portfolio_items where id = p_evidence_id and user_id = v_share.user_id) then
    return jsonb_build_object('error', 'Evidence not found');
  end if;
  if public._share_scope(v_share.entry_ids, v_share.portfolio_item_id) is not null
     and not (p_evidence_id = any(public._share_scope(v_share.entry_ids, v_share.portfolio_item_id))) then
    return jsonb_build_object('error', 'Evidence not found');
  end if;

  insert into portfolio_comments (user_id, evidence_id, context_type, author_name, author_role, author_initials, content)
  values (v_share.user_id, p_evidence_id, 'share_feedback', left(trim(p_author_name), 80),
          left(coalesce(p_author_role, 'reviewer'), 40), upper(left(trim(p_author_name), 2)), left(trim(p_content), 4000))
  returning id into v_comment_id;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (v_share.user_id, 'share_comment', 'New comment on your shared portfolio',
            left(trim(p_author_name), 80) || ': ' || left(trim(p_content), 140),
            '/apprentice/college/progress', jsonb_build_object('comment_id', v_comment_id, 'evidence_id', p_evidence_id));
  exception when others then null;
  end;
  return jsonb_build_object('success', true, 'comment_id', v_comment_id);
end; $$;
grant execute on function public.add_share_comment(text, text, text, text, uuid) to anon, authenticated;

create or replace function public.review_shared_submission(
  p_share_token text, p_submission_id uuid, p_reviewer_name text, p_reviewer_role text, p_action text,
  p_feedback text default null, p_grade text default null, p_action_required text default null,
  p_strengths text default null, p_areas_for_improvement text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_share record;
  v_submission record;
  v_scope uuid[];
  v_item uuid;
  v_text text;
begin
  if coalesce(trim(p_reviewer_name), '') = '' then
    return jsonb_build_object('error', 'Add your name');
  end if;
  select * into v_share from portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if v_share is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  if public._share_comment_flood(v_share.user_id) then
    return jsonb_build_object('error', 'Too many comments in a short time. Try again in a few minutes.');
  end if;
  select * into v_submission from portfolio_submissions
   where id = p_submission_id and user_id = v_share.user_id;
  if v_submission is null then
    return jsonb_build_object('error', 'Submission not found');
  end if;
  if p_action = 'approve' then
    return jsonb_build_object('error', 'assessor_account_required',
      'message', 'Only an assessor can approve. Ask the apprentice to invite you as their assessor from Elec-Mate.');
  end if;
  if p_action not in ('send_back', 'request_more_evidence', 'feedback') then
    return jsonb_build_object('error', 'Invalid action');
  end if;

  v_text := concat_ws(E'\n',
    nullif(trim(coalesce(p_feedback, '')), ''),
    case when nullif(trim(coalesce(p_action_required, '')), '') is not null then 'Action needed: ' || trim(p_action_required) end,
    case when nullif(trim(coalesce(p_strengths, '')), '') is not null then 'Strengths: ' || trim(p_strengths) end,
    case when nullif(trim(coalesce(p_areas_for_improvement, '')), '') is not null then 'To improve: ' || trim(p_areas_for_improvement) end);
  if coalesce(v_text, '') = '' then
    return jsonb_build_object('error', 'Add your feedback');
  end if;

  -- Pin the comment to an item the share can see, so it shows on the page.
  v_scope := public._share_scope(v_share.entry_ids, v_share.portfolio_item_id);
  select si.portfolio_item_id into v_item
    from portfolio_submission_items si
   where si.submission_id = p_submission_id
     and (v_scope is null or si.portfolio_item_id = any(v_scope))
   limit 1;
  if v_item is null then
    select id into v_item from portfolio_items
     where user_id = v_share.user_id and (v_scope is null or id = any(v_scope))
     order by created_at desc limit 1;
  end if;

  insert into portfolio_comments (user_id, evidence_id, context_type, author_name, author_role, author_initials, content)
  values (v_share.user_id, v_item, 'share_review', left(trim(p_reviewer_name), 80),
          left(coalesce(p_reviewer_role, 'reviewer'), 40), upper(left(trim(p_reviewer_name), 2)),
          '[Review via shared link, advisory] ' || left(v_text, 4000));

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (v_share.user_id, 'share_review', left(trim(p_reviewer_name), 80) || ' reviewed your shared portfolio',
            left(v_text, 160), '/apprentice/college/progress', jsonb_build_object('submission_id', p_submission_id));
  exception when others then null;
  end;

  return jsonb_build_object('success', true, 'advisory', true, 'reviewer', p_reviewer_name);
end; $$;
grant execute on function public.review_shared_submission(text, uuid, text, text, text, text, text, text, text, text) to anon, authenticated;

drop policy if exists "evidence-files: owner read" on storage.objects;
drop policy if exists "evidence-files: owner or assessor read" on storage.objects;
create policy "evidence-files: owner or assessor read" on storage.objects
  for select to authenticated
  using (bucket_id = 'evidence-files' and public._can_read_evidence_path(name));
