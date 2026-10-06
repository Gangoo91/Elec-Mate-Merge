-- Portfolio 2.0 backbone, step 2 (ELE-1860 / ELE-1867).
-- Staff write access to a learner's evidence and KSB progress only existed via
-- college_student_assignments rows, which most cohort tutors don't have. Proved
-- 6 Oct: the cohort tutor's KSB verification updated 0 rows; the staff
-- "link criteria" action in SubmissionReviewPanel updates 0 rows silently.
-- One rule for "may assess this learner": platform admin, an assignment, or
-- active staff in an assessing role at the learner's college.

create or replace function public._can_assess(p_learner uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public._is_platform_admin()
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner
                    and auth.uid() in (a.tutor_id, a.assessor_id, a.iqa_id))
      or exists (select 1
                   from public.college_students s
                   join public.college_staff st on st.college_id = s.college_id
                  where s.user_id = p_learner
                    and st.user_id = auth.uid()
                    and st.archived_at is null
                    and coalesce(st.status, 'Active') <> 'Archived'
                    and st.role in ('tutor', 'assessor', 'iqa', 'admin', 'head_of_department'));
$$;
grant execute on function public._can_assess(uuid) to authenticated;

drop policy if exists "Assessing staff update learner KSB progress" on public.user_ksb_progress;
create policy "Assessing staff update learner KSB progress"
  on public.user_ksb_progress for update to authenticated
  using (public._can_assess(user_id)) with check (public._can_assess(user_id));

drop policy if exists "Assessing staff read learner KSB progress" on public.user_ksb_progress;
create policy "Assessing staff read learner KSB progress"
  on public.user_ksb_progress for select to authenticated
  using (public._can_assess(user_id));

drop policy if exists "Assessing staff update learner evidence" on public.portfolio_items;
create policy "Assessing staff update learner evidence"
  on public.portfolio_items for update to authenticated
  using (public._can_assess(user_id)) with check (public._can_assess(user_id));

-- Staff may record assessment on a learner's evidence, never rewrite it.
create or replace function public._portfolio_items_staff_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or new.user_id = auth.uid()
     or public._is_platform_admin() then
    return new;
  end if;
  if new.user_id is distinct from old.user_id
  or new.title is distinct from old.title
  or new.description is distinct from old.description
  or new.file_url is distinct from old.file_url
  or new.storage_urls is distinct from old.storage_urls
  or new.reflection_notes is distinct from old.reflection_notes
  or new.self_assessment is distinct from old.self_assessment
  or new.date_completed is distinct from old.date_completed
  or new.time_spent is distinct from old.time_spent then
    raise exception 'staff can assess evidence but not change what the learner wrote'
      using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_portfolio_items_staff_guard on public.portfolio_items;
create trigger trg_portfolio_items_staff_guard
  before update on public.portfolio_items
  for each row execute function public._portfolio_items_staff_guard();
