-- Why people actually leave, for the Trials page.
--
-- `cancel_survey_responses` is filled by the in-app cancel flow across the whole
-- paying base, not just trials, so it is labelled as such on the page. It earns
-- its place there because the top reason corroborates the return curve from a
-- completely independent source: "not using it" is 41% of every cancellation on
-- record, which is the same finding as four trials in ten never coming back
-- after signup day.
create or replace function public.get_trial_cancel_reasons()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  payload jsonb;
begin
  if not exists (select 1 from profiles where id = auth.uid() and admin_role is not null) then
    raise exception 'not authorized';
  end if;

  select jsonb_build_object(
    'total', (select count(*) from cancel_survey_responses),
    'reasons', (
      select coalesce(jsonb_agg(to_jsonb(r) order by r.n desc), '[]'::jsonb)
      from (
        select coalesce(nullif(btrim(reason), ''), 'unknown') as reason,
               count(*)::int as n
        from cancel_survey_responses
        group by 1
      ) r
    ),
    -- Cancellations that happened while the person was still inside a trial
    -- window. Small today, but it is the group the page can actually act on.
    'in_trial', (
      select count(*)::int
      from cancel_survey_responses c
      join profiles p on p.id = c.user_id
      where p.trial_end is not null
        and c.created_at between p.created_at and p.trial_end
    ),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_trial_cancel_reasons() to authenticated;
