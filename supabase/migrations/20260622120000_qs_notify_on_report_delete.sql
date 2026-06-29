-- Notify the QS/employer when a certificate awaiting QS review is deleted.
--
-- cancel_qs_reviews_on_report_delete() already auto-cancels any pending review
-- when an electrician soft-deletes a cert, but the QS got no notice and would
-- hit REPORT_NOT_FOUND when opening the (now gone) cert. This adds a bell +
-- push to the employer and active QS team members on that auto-cancel.
--
-- SAFETY: the notification is wrapped in an exception-guarded block so a
-- notification failure can NEVER roll back the user's delete. The delete path
-- must always succeed.

create or replace function public.cancel_qs_reviews_on_report_delete()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_rev record;
  v_qs  record;
begin
  if new.deleted_at is not null and old.deleted_at is null then
    -- Cancel pending reviews, capturing each so we can notify its reviewers.
    for v_rev in
      update public.report_qs_reviews
         set status = 'cancelled', updated_at = now()
       where report_uuid = new.id
         and status = 'pending'
      returning id, employer_id
    loop
      begin
        insert into public.employer_notifications (user_id, type, title, message, metadata)
        values (
          v_rev.employer_id,
          'qs_review_withdrawn',
          'QS review withdrawn',
          'A certificate awaiting QS review was deleted by the sender and no longer needs reviewing.',
          jsonb_build_object(
            'review_id', v_rev.id,
            'report_id', new.report_id,
            'route', '/employer?section=qsreviews'
          )
        );

        -- Owner/employer push.
        perform public.qs_review_push(
          v_rev.employer_id,
          'QS review withdrawn',
          'A certificate awaiting QS review was deleted and no longer needs reviewing.',
          jsonb_build_object('review_id', v_rev.id, 'route', '/employer?section=qsreviews')
        );

        -- Active QS team members (excluding the owner, already pushed above).
        for v_qs in
          select user_id from public.employer_employees
          where employer_id = v_rev.employer_id
            and user_id is not null
            and user_id <> v_rev.employer_id
            and team_role ilike 'qs'
            and status ilike 'active'
        loop
          perform public.qs_review_push(
            v_qs.user_id,
            'QS review withdrawn',
            'A certificate awaiting your QS review was deleted and no longer needs reviewing.',
            jsonb_build_object('review_id', v_rev.id, 'route', '/employer?section=qsreviews')
          );
        end loop;
      exception
        when others then
          -- Notification is best-effort; the delete must always succeed.
          null;
      end;
    end loop;
  end if;

  return new;
end;
$function$;
