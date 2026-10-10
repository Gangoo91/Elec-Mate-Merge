-- ELE-1969: a minimum supported native build PER FEATURE, served from config.
--
-- 56 native users were still on build 46 while 47 was live; a college learner
-- on an old build sees a different College Hub from their tutor's projector.
-- app_versions already carries one app-wide min_supported_version (forces
-- EVERYONE to update). This adds a per-feature floor so the College Hub can
-- require a newer build of college-linked users only, without forcing the
-- whole user base.
--
--   feature_minimums  jsonb on the is_current row per platform, e.g.
--     {"college": {"build": 48, "version": "1.0.5"}}
--   Either key may be set; a device is below the floor when its build number
--   is lower than "build" OR its version is lower than "version".
--   '{}' (the default) gates nothing, so this changes no behaviour until a
--   floor is set.
--
-- Read by src/utils/app-version.ts (fetchVersionConfig) and the College gate in
-- src/components/app-update/AppUpdatePrompt.tsx. The existing read policy
-- ("Anyone can read current app version") already covers the new column.

alter table public.app_versions
  add column if not exists feature_minimums jsonb not null default '{}'::jsonb;

comment on column public.app_versions.feature_minimums is
  'ELE-1969: per-feature minimum native build, e.g. {"college": {"build": 48, "version": "1.0.5"}}. Set on the is_current row per platform. College-linked users below the college floor are asked to update (blocking on College Hub screens). Empty = no gate.';
