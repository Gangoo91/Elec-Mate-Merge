-- ELE-1957: a complete UK outward-code (postcode district) table, so the
-- talent pool can match on real distance ("12 within 20 miles").
--
-- uk_postcode_districts holds only 102 hand-entered districts (it feeds the
-- live-pricing tool and is left alone). This is a separate reference table of
-- every live outward code with its centroid, loaded from postcodes.io
-- (ONS Postcode Directory) in 20261009120100. No coordinates are invented.
--
-- Contains OS data © Crown copyright and database right 2026.
-- Contains Royal Mail data © Royal Mail copyright and database right 2026.
-- Contains National Statistics data © Crown copyright and database right 2026.
-- Open Government Licence v3.0.

create table if not exists public.uk_postcode_outcodes (
  outcode text primary key check (outcode ~ '^[A-Z]{1,2}[0-9][0-9A-Z]?$'),
  latitude double precision not null check (latitude between 49 and 61.5),
  longitude double precision not null check (longitude between -9 and 2.5),
  admin_districts text[] not null default '{}',
  places text[] not null default '{}',
  country text,
  source text not null default 'postcodes.io (ONS Postcode Directory), OGL v3',
  loaded_at timestamptz not null default now()
);

comment on table public.uk_postcode_outcodes is
  '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] Every live UK postcode outward code (e.g. S10) with its centroid lat/lng, local authority and parish names. Reference data, read-only. Scope: global. Used by: talent pool base location and vacancy distance (ELE-1957). Rule: Source postcodes.io / ONS Postcode Directory (OGL v3); reload, never hand-edit coordinates.';
comment on column public.uk_postcode_outcodes.places is
  'Parish / town names inside the outward code (from the ONS directory), used to resolve a typed town to a point.';

alter table public.uk_postcode_outcodes enable row level security;

drop policy if exists uk_postcode_outcodes_read on public.uk_postcode_outcodes;
create policy uk_postcode_outcodes_read on public.uk_postcode_outcodes
  for select to authenticated using (true);

revoke all on public.uk_postcode_outcodes from anon, public;
revoke insert, update, delete, truncate on public.uk_postcode_outcodes from authenticated;
grant select on public.uk_postcode_outcodes to authenticated;
