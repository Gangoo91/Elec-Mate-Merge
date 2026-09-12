-- College scheme accounts: mark admin-created accounts and record the
-- organisation a tutor account belongs to, so they stay out of signup and
-- paying-customer numbers and can be listed by college on the admin panel.
alter table public.profiles add column if not exists created_via text;
alter table public.profiles add column if not exists college_org text;
comment on column public.profiles.created_via is 'How the account came to exist: null = self sign-up, admin_bulk = made on Admin → Bulk create (tutors, cohorts, demo). Excluded from signup stats.';
comment on column public.profiles.college_org is 'For tutor/college staff accounts: the college or training provider they belong to, as typed on Bulk create.';
create index if not exists profiles_created_via_idx on public.profiles (created_via) where created_via is not null;

-- Backfill from auth metadata (the bulk-create function has always set created_via there).
update public.profiles p
   set created_via = u.raw_user_meta_data->>'created_via'
  from auth.users u
 where u.id = p.id and p.created_via is null and u.raw_user_meta_data->>'created_via' is not null;

-- Backfill the organisation for the tutor accounts made so far.
update public.profiles set college_org = 'Newcastle and Stafford Colleges Group' where free_access_reason ilike 'NSCG staff%' and college_org is null;
update public.profiles set college_org = 'Essex Electrical Training' where free_access_reason ilike 'Tutor access%Essex%' and college_org is null;
update public.profiles set college_org = 'HRUC' where free_access_reason ilike 'Tutor access%HRUC%' and college_org is null;
update public.profiles set college_org = 'Birmingham Electrical Training' where free_access_reason ilike 'Tutor access%BET%' and college_org is null;
update public.profiles set college_org = 'Exeter College' where free_access_reason ilike 'Tutor access%Exeter%' and college_org is null;
update public.profiles set college_org = 'XS Training' where free_access_reason ilike 'Tutor access%XS Training%' and college_org is null;
update public.profiles set college_org = 'Kendal College' where free_access_reason ilike 'Tutor access%Kendal%' and college_org is null;

-- New accounts: copy created_via from the auth metadata at profile creation, so
-- every path that sets it (bulk create, scripts) is covered without a second write.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  base_username TEXT;
  final_username TEXT;
  suffix_num INT := 0;
BEGIN
  base_username := split_part(NEW.email, '@', 1);
  final_username := base_username;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    suffix_num := suffix_num + 1;
    final_username := base_username || suffix_num::TEXT;
  END LOOP;
  INSERT INTO public.profiles (id, username, full_name, avatar_url, created_via)
  VALUES (
    NEW.id,
    final_username,
    COALESCE(NEW.raw_user_meta_data->>'full_name', base_username),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'created_via'
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    INSERT INTO public.profiles (id, username, full_name, avatar_url, created_via)
    VALUES (
      NEW.id,
      base_username || '_' || floor(random() * 10000)::TEXT,
      COALESCE(NEW.raw_user_meta_data->>'full_name', base_username),
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'created_via'
    );
    RETURN NEW;
END;
$function$;
