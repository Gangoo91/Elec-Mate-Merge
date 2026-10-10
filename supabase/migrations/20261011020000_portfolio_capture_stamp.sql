-- When and roughly where a piece of evidence was captured, plus a link from a
-- new version of evidence to the assessed one it follows.
--
--   captured_at         the device time the evidence was made: the photo's EXIF
--                       DateTimeOriginal when it has one, else the moment it was
--                       captured on the phone
--   captured_at_source  'photo' (EXIF) or 'device'
--   capture_place       a town or area name, only when the learner allowed the
--                       platform location prompt for this capture
--   capture_lat/lng     the same position rounded to 0.1 degree (about 11 km
--                       north-south): coarse by construction, never exact
--   previous_version_id a new version made from an assessed item
--
-- All nullable; nothing is back-filled for existing items. Capture fields are
-- write-once for the learner (set on insert, or once while still empty) so a
-- stamp cannot be moved afterwards. They are not part of the content
-- fingerprint, so every existing fingerprint is unchanged.

alter table public.portfolio_items
  add column if not exists captured_at timestamptz,
  add column if not exists captured_at_source text,
  add column if not exists capture_place text,
  add column if not exists capture_lat numeric(4, 1),
  add column if not exists capture_lng numeric(4, 1),
  add column if not exists previous_version_id uuid references public.portfolio_items (id) on delete set null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'portfolio_items_captured_at_source_check') then
    alter table public.portfolio_items
      add constraint portfolio_items_captured_at_source_check
      check (captured_at_source is null or captured_at_source in ('photo', 'device'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'portfolio_items_capture_coarse_check') then
    alter table public.portfolio_items
      add constraint portfolio_items_capture_coarse_check
      check ((capture_lat is null or capture_lat between -90 and 90)
         and (capture_lng is null or capture_lng between -180 and 180)
         and (capture_place is null or length(capture_place) <= 80));
  end if;
end $$;

create index if not exists portfolio_items_previous_version_idx
  on public.portfolio_items (previous_version_id) where previous_version_id is not null;

comment on column public.portfolio_items.captured_at is
  'Device capture time: photo EXIF DateTimeOriginal when present, else capture time on the phone. Write-once.';
comment on column public.portfolio_items.capture_place is
  'Approximate place (town/area), only with the learner''s location permission for that capture. Write-once.';
comment on column public.portfolio_items.capture_lat is
  'Latitude rounded to 0.1 degree (coarse). Never exact. Write-once.';
comment on column public.portfolio_items.capture_lng is
  'Longitude rounded to 0.1 degree (coarse). Never exact. Write-once.';
comment on column public.portfolio_items.previous_version_id is
  'The assessed item this one is a new version of ("Add a new version").';

-- Capture stamp is write-once for clients; a time in the future is refused.
create or replace function public._portfolio_items_capture_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin() then
    return new;
  end if;
  if new.captured_at is not null and new.captured_at > now() + interval '1 day' then
    raise exception 'the capture time is in the future' using errcode = '22023';
  end if;
  if tg_op = 'UPDATE' then
    if (old.captured_at is not null and new.captured_at is distinct from old.captured_at)
    or (old.captured_at_source is not null and new.captured_at_source is distinct from old.captured_at_source)
    or (old.capture_place is not null and new.capture_place is distinct from old.capture_place)
    or (old.capture_lat is not null and new.capture_lat is distinct from old.capture_lat)
    or (old.capture_lng is not null and new.capture_lng is distinct from old.capture_lng)
    or (new.previous_version_id is distinct from old.previous_version_id) then
      raise exception 'when and where evidence was captured is recorded once and cannot be changed'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_portfolio_items_capture_guard on public.portfolio_items;
create trigger trg_portfolio_items_capture_guard
  before insert or update on public.portfolio_items
  for each row execute function public._portfolio_items_capture_guard();
