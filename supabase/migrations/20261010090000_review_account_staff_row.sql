-- ELE-1857 (re-applied 10 Oct 2026): the App Store review account
-- ("Demo Access", access@elec-mate.com) has profiles.college_id on the demo
-- college but no college_staff row, so it passed the guard into an empty hub.
-- Give it a tutor row on the demo college (Northgate, is_demo). Idempotent.
insert into public.college_staff (college_id, user_id, name, email, role)
select 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', u.id, 'Demo Access', u.email, 'tutor'
  from auth.users u
 where u.email = 'access@elec-mate.com'
   and not exists (
     select 1 from public.college_staff s
      where s.user_id = u.id and s.college_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
   );
