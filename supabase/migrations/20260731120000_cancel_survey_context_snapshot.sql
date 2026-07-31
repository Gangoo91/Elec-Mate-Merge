-- World-class cancellation analysis: every survey row carries a frozen
-- snapshot of who this user was at the moment they tried to leave — tenure,
-- engagement, and activation — so analysis never depends on later joins
-- against moving data.

alter table public.cancel_survey_responses
  add column if not exists context jsonb not null default '{}';

create or replace function public.cancel_survey_snapshot()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v jsonb := '{}';
  a record;
  joined timestamptz;
begin
  select created_at into joined from auth.users where id = new.user_id;

  select * into a from public.user_activity_summary where user_id = new.user_id;

  v := jsonb_build_object(
    'joined_at', joined,
    'tenure_days', case when joined is not null then (now()::date - joined::date) end,
    'active_days_30d', coalesce(a.active_days, 0),
    'sessions_30d', coalesce(a.session_count, 0),
    'hours_30d', round(coalesce(a.total_seconds_tracked, 0) / 3600.0, 1),
    'features_used', coalesce(to_jsonb(a.features_used), '[]'::jsonb),
    'certs_total', (select count(*) from public.reports r
                     where r.user_id = new.user_id and r.deleted_at is null),
    'invoices_total', (select count(*) from public.invoices i where i.user_id = new.user_id),
    'quotes_total', (select count(*) from public.quotes q where q.user_id = new.user_id)
  );

  new.context := v;
  return new;
exception when others then
  -- Snapshot must never block a cancellation being recorded
  return new;
end;
$$;

drop trigger if exists cancel_survey_snapshot_trg on public.cancel_survey_responses;
create trigger cancel_survey_snapshot_trg
  before insert on public.cancel_survey_responses
  for each row execute function public.cancel_survey_snapshot();
