-- Admin → Websites: Elec-Mate admins see and progress every website order.
drop policy if exists "Admins see website orders" on public.website_build_requests;
create policy "Admins see website orders" on public.website_build_requests
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "Admins progress website orders" on public.website_build_requests;
create policy "Admins progress website orders" on public.website_build_requests
  for update to authenticated using (public._is_platform_admin()) with check (public._is_platform_admin());

-- Tell the electrician when their site moves on (building / live)
create or replace function public.tg_website_build_progress()
returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if new.status is distinct from old.status and new.status in ('building', 'live') then
    insert into public.user_notifications (user_id, type, title, message, link, is_read)
    values (
      new.user_id,
      'billing',
      case when new.status = 'live' then 'Your website is live' else 'We''ve started building your website' end,
      case when new.status = 'live'
        then coalesce('Have a look: ' || new.site_url, 'Have a look and tell us if anything needs changing.')
        else 'We''ll be in touch if we need anything else from you.' end,
      '/electrician/enquiries/setup',
      false
    );
  end if;
  return new;
end $$;
drop trigger if exists website_build_progress on public.website_build_requests;
create trigger website_build_progress before update on public.website_build_requests
  for each row execute function public.tg_website_build_progress();
