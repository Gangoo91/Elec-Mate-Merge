-- ELE-1872: one gateway, everywhere. get_gateway_readiness (20261008059520)
-- is the gate the learner and tutor see; this lets screens that list many
-- learners (the cohort gateway page, Student 360's readiness model) read the
-- same lines in one call instead of re-deriving them from
-- epa_gateway_checklist booleans (src/lib/epa/readiness.ts gatewayItems,
-- which had no minimum-duration or NET checklist line and could disagree).
--
-- get_gateway_readiness_many(p_learners) returns { "<learner uuid>": <the
-- get_gateway_readiness output> } for every learner the caller may see (the
-- learner themselves, or staff who can assess them). Learners the caller may
-- not see, or whose check fails, are left out rather than failing the batch.
-- No rows are written. Capped at 500 learners a call.
begin;
set local lock_timeout = '5s';

create or replace function public.get_gateway_readiness_many(p_learners uuid[])
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  u uuid;
  v_out jsonb := '{}'::jsonb;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if coalesce(array_length(p_learners, 1), 0) > 500 then
    raise exception 'too many learners (500 at most)' using errcode = '22023';
  end if;

  foreach u in array coalesce((select array_agg(distinct x) from unnest(p_learners) x where x is not null), '{}'::uuid[]) loop
    if u = auth.uid() or public._can_assess(u) then
      begin
        v_out := v_out || jsonb_build_object(u::text, public.get_gateway_readiness(u));
      exception when others then
        -- One learner's bad record must not hide the rest of the cohort.
        null;
      end;
    end if;
  end loop;
  return v_out;
end;
$function$;

comment on function public.get_gateway_readiness_many(uuid[]) is
  'ELE-1872: get_gateway_readiness for many learners in one call, keyed by learner id. Only learners the caller is, or can assess. Used by: cohort gateway page and Student 360 readiness model (src/hooks/college/epaReadinessModels.ts).';

revoke all on function public.get_gateway_readiness_many(uuid[]) from public, anon;
grant execute on function public.get_gateway_readiness_many(uuid[]) to authenticated;

commit;
