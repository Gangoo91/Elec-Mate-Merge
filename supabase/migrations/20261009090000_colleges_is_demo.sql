-- ELE-1856: demo mode. A college flagged is_demo (the Northgate demo college)
-- hides the app-update banner, cookie bar, push prompt and first-week tour
-- for everyone in it, so a demo on a real phone shows only the product.

alter table public.colleges add column if not exists is_demo boolean not null default false;

comment on column public.colleges.is_demo is
  'Demo college: members see the app without update/cookie/push/first-week prompts (ELE-1856). Never set on a real college.';

update public.colleges set is_demo = true where id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
