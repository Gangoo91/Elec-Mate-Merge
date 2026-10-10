-- ELE-1912 performance budget: every College Hub screen loads the college's
-- lesson plans through CollegeSupabaseProvider, and it read select=* —
-- including the full lesson body (content) and slide deck (slide_deck_json),
-- ~8 KB a plan, 375 KB for the demo college on every screen. The list only
-- needs to know WHETHER a plan has a body (Start a lesson → "copy a past
-- plan" lists plans with one), so this exposes that as a PostgREST computed
-- column: select=...,has_content. Read-only, invoker rights (RLS applies as
-- for the row itself), additive.
create or replace function public.has_content(p public.college_lesson_plans)
returns boolean
language sql
stable
set search_path = public
as $$
  select p.content is not null;
$$;
comment on function public.has_content(public.college_lesson_plans) is
  '[COLLEGE] Computed column for college_lesson_plans: true when the plan has a lesson body. Lets list views skip the heavy content/slide_deck_json columns (ELE-1912).';
revoke all on function public.has_content(public.college_lesson_plans) from public, anon;
grant execute on function public.has_content(public.college_lesson_plans) to authenticated;
notify pgrst, 'reload schema';
