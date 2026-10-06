-- Follow-up to tripartite_reviews_v2 (6 Oct 2026).
-- 1. "Employer opened the link" is evidence (97.2.1). A tutor checking the
--    link must not create it.
-- 2. The apprentice's "Sign your review" notification opens My college,
--    where the review card is (/apprentice/college-plan).
-- 3. EQA users are read-only across the College Hub; the new actions table
--    gets the same restrictive policies as the reviews table.
do $$
declare d text;
begin
  d := pg_get_functiondef('public.get_tripartite_review_public(text)'::regprocedure);
  if position('_review_staff_can(r.college_id)' in d) = 0 then
    d := replace(d, '  if r.employer_viewed_at is null then',
                    '  if r.employer_viewed_at is null and not public._review_staff_can(r.college_id) then');
    execute d;
  end if;

  d := pg_get_functiondef('public.sign_off_tripartite_review(uuid, date)'::regprocedure);
  d := replace(d, '''/apprentice/college/plan?review=''', '''/apprentice/college-plan?review=''');
  execute d;
end $$;

drop policy if exists eqa_readonly_no_insert on public.college_review_actions;
drop policy if exists eqa_readonly_no_update on public.college_review_actions;
drop policy if exists eqa_readonly_no_delete on public.college_review_actions;
create policy eqa_readonly_no_insert on public.college_review_actions as restrictive for insert to authenticated
  with check (not public.current_user_is_eqa());
create policy eqa_readonly_no_update on public.college_review_actions as restrictive for update to authenticated
  using (not public.current_user_is_eqa()) with check (not public.current_user_is_eqa());
create policy eqa_readonly_no_delete on public.college_review_actions as restrictive for delete to authenticated
  using (not public.current_user_is_eqa());
