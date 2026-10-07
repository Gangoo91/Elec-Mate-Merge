-- Longer evidence videos + server transcription (College Hub follow-up, 8 Oct 2026).
--
-- 1. portfolio-evidence: 10 MB (about 20 s of phone video) -> 100 MB. The
--    bucket STAYS PUBLIC (Andrew's standing rule); only the size changes.
--    The app caps clips at 2 minutes (no in-app video compression exists).
-- 2. evidence_types 'video': 50 -> 100 MB and iPhone .mov (video/quicktime).
-- 3. media_transcriptions: one row per server transcription request (who,
--    which file, size, outcome). It is the rate limit and the audit trail; the
--    transcript text itself is NOT kept here, it goes on the observation.

begin;

update storage.buckets
   set file_size_limit = 104857600
 where id = 'portfolio-evidence';

do $$
begin
  if not (select public from storage.buckets where id = 'portfolio-evidence') then
    raise exception 'portfolio-evidence must stay public';
  end if;
end $$;

update public.evidence_types
   set max_file_size_mb = 100,
       allowed_file_types = (select array_agg(distinct m) from unnest(allowed_file_types || array['video/quicktime']) m)
 where code = 'video';

create table if not exists public.media_transcriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  learner_id uuid not null,
  path text not null,
  bytes bigint,
  observation_id uuid references public.college_observations(id) on delete set null,
  provider text,
  status text not null default 'started' check (status in ('started', 'done', 'failed')),
  chars integer,
  error text,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists media_transcriptions_user_created_idx
  on public.media_transcriptions (user_id, created_at desc);

alter table public.media_transcriptions enable row level security;
-- No policies: written by definer functions and the transcribe-evidence-media
-- edge function (service role) only.
revoke all on public.media_transcriptions from anon, authenticated;

comment on table public.media_transcriptions is '[COLLEGE] One row per server transcription of an observation / professional discussion recording or video in portfolio-evidence (who asked, which learner file, size, provider, outcome). Scope: user_id = the caller (learner or their assessor); learner_id = the folder owner. Used by: transcribe-evidence-media fn (rate limit 20/hour, 60/day per caller) and audit. Rule: holds no transcript text; the text goes on college_observations.transcript.';

/* Can the caller transcribe this file? Learner (own folder) or staff allowed
   to assess that learner. Applies the rate limit and logs the request.
   Returns the request id, or raises. */
create or replace function public.begin_media_transcription(
  p_path text, p_bytes bigint default null, p_observation uuid default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_learner uuid;
  v_hour int;
  v_day int;
  v_id uuid;
  v_obs record;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  if p_path is null or p_path !~ '^[0-9a-f-]{36}/' or p_path like '%..%' then
    raise exception 'bad file path' using errcode = '22023';
  end if;
  v_learner := split_part(p_path, '/', 1)::uuid;

  if v_learner <> v_uid and not public._can_assess(v_learner) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  if p_observation is not null then
    select o.id, o.learner_user_id, o.sent_at into v_obs
      from college_observations o where o.id = p_observation;
    if v_obs.id is null or v_obs.learner_user_id is distinct from v_learner then
      raise exception 'that file is not on this observation' using errcode = '22023';
    end if;
  end if;

  select count(*) filter (where created_at > now() - interval '1 hour'),
         count(*) filter (where created_at > now() - interval '1 day')
    into v_hour, v_day
    from media_transcriptions where user_id = v_uid and created_at > now() - interval '1 day';
  if v_hour >= 20 or v_day >= 60 then
    raise exception 'transcription limit reached, try again later' using errcode = 'P0001', hint = 'rate_limited';
  end if;

  insert into media_transcriptions (user_id, learner_id, path, bytes, observation_id)
  values (v_uid, v_learner, p_path, p_bytes, p_observation)
  returning id into v_id;
  return v_id;
end; $$;

revoke all on function public.begin_media_transcription(text, bigint, uuid) from public, anon;
grant execute on function public.begin_media_transcription(text, bigint, uuid) to authenticated;

/* Append server transcript text to a draft observation's transcript. Staff who
   can assess the learner only; a sent observation is never edited. */
create or replace function public.append_observation_transcript(p_id uuid, p_text text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  o record;
  v_new text;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  select id, learner_user_id, sent_at, transcript into o from college_observations where id = p_id for update;
  if o.id is null then raise exception 'observation not found' using errcode = 'P0002'; end if;
  if o.learner_user_id is null or not public._can_assess(o.learner_user_id) or o.learner_user_id = v_uid then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if o.sent_at is not null then
    raise exception 'a sent observation cannot be changed' using errcode = '42501';
  end if;
  v_new := left(trim(both from concat_ws(E'\n\n', nullif(trim(coalesce(o.transcript, '')), ''),
                                          nullif(trim(coalesce(p_text, '')), ''))), 100000);
  update college_observations set transcript = v_new, updated_at = now() where id = p_id;
  return v_new;
end; $$;

revoke all on function public.append_observation_transcript(uuid, text) from public, anon;
grant execute on function public.append_observation_transcript(uuid, text) to authenticated;

commit;
