-- ELE-2073 win rate by person: name the person from the quote's own
-- attribution (ELE-2083 sent_by_user_id / created_by_user_id, named the same
-- way get_quote_attribution does), falling back to settings.createdBy.name.
-- Same signature; the function is new this build and HEAD never calls it.
create or replace function public.get_firm_quote_win_rate(p_months int default 12)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_firm uuid := public.my_default_employer_id();
  v_from timestamptz;
  v_months int := least(greatest(coalesce(p_months, 12), 1), 36);
begin
  if auth.uid() is null or v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can see win rates' using errcode = '42501';
  end if;
  v_from := date_trunc('month', now() at time zone 'Europe/London') - make_interval(months => v_months - 1);

  return (
    with base as (
      select q.id, q.total,
             (coalesce(q.first_sent_at, q.created_at) at time zone 'Europe/London') as sent_local,
             public._quote_job_type(q.settings, j.job_type, q.job_details->>'title', q.job_details->>'description') as job_type,
             coalesce(
               (select coalesce(
                  nullif(btrim((select a.full_name from public.employer_admins a
                                 where a.employer_id = q.user_id and a.user_id = u.uid
                                 order by a.created_at desc limit 1)), ''),
                  nullif(btrim((select pr.full_name from public.profiles pr where pr.id = u.uid)), ''))
                  from (select coalesce(q.sent_by_user_id, q.created_by_user_id) as uid) u
                 where u.uid is not null),
               nullif(btrim(q.settings->'createdBy'->>'name'), ''),
               'Not recorded') as person,
             case
               when q.acceptance_status in ('accepted', 'accepted_pending_deposit') or q.status = 'approved' then 'won'
               when q.acceptance_status = 'rejected' or q.status = 'rejected' then 'lost'
               when q.expiry_date < now() then 'expired'
               else 'open'
             end as outcome
        from public.quotes q
        left join public.employer_jobs j on j.id = q.employer_job_id
       where q.user_id = v_firm and q.deleted_at is null
         and coalesce(q.first_sent_at, q.created_at) >= v_from
         -- Sent to a customer at some point.
         and (q.first_sent_at is not null or q.status in ('sent', 'approved', 'rejected')
              or coalesce(q.acceptance_status, 'pending') <> 'pending')
         -- Not an invoice raised on its own, a deposit invoice, a stage
         -- invoice or a superseded version.
         and not (coalesce(q.invoice_raised, false) and q.quote_number = q.invoice_number)
         and q.parent_quote_id is null
         and coalesce(q.is_active_version, true)
         and nullif(q.settings->>'stageOf', '') is null
    ),
    agg as (
      select 'all'::text as dim, 'All quotes'::text as key, b.* from base b
      union all select 'month', to_char(b.sent_local, 'YYYY-MM'), b.* from base b
      union all select 'type', b.job_type, b.* from base b
      union all select 'person', b.person, b.* from base b
    ),
    grp as (
      select dim, key,
             count(*) as sent,
             count(*) filter (where outcome = 'won') as won,
             count(*) filter (where outcome = 'lost') as lost,
             count(*) filter (where outcome = 'expired') as expired,
             count(*) filter (where outcome = 'open') as open,
             round(coalesce(sum(total), 0), 2) as sent_value,
             round(coalesce(sum(total) filter (where outcome = 'won'), 0), 2) as won_value,
             round(coalesce(avg(total), 0), 2) as avg_value,
             round(coalesce(avg(total) filter (where outcome = 'won'), 0), 2) as avg_won_value
        from agg group by dim, key
    )
    select jsonb_build_object(
      'firm_id', v_firm,
      'from', v_from::date,
      'months', v_months,
      'all', (select to_jsonb(g) - 'dim' from grp g where g.dim = 'all'),
      'by_month', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.key) from grp g where g.dim = 'month'), '[]'::jsonb),
      'by_type', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.sent desc, g.key) from grp g where g.dim = 'type'), '[]'::jsonb),
      'by_person', coalesce((select jsonb_agg(to_jsonb(g) - 'dim' order by g.sent desc, g.key) from grp g where g.dim = 'person'), '[]'::jsonb))
  );
end;
$$;
revoke all on function public.get_firm_quote_win_rate(int) from public, anon;
grant execute on function public.get_firm_quote_win_rate(int) to authenticated;
