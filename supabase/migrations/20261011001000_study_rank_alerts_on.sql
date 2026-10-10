-- Rank alerts: SWITCHED ON (Andrew, 10 Oct 2026: "switch them on").
--
-- Fix first: someone with no saved position who got a "final days" alert had
-- the alert time written to a row that didn't exist yet, so the next hourly run
-- could alert them again. The position is now saved before the alert, and the
-- alert time stamped after it.
--
-- Hourly at :15. In-app bell only, at most one a day per person, never for
-- anyone who has turned Study Centre notifications off.

create or replace function public.study_rank_alerts(p_send boolean default false)
returns table(user_id uuid, kind text, title text, message text)
language plpgsql security definer set search_path = public as $$
declare
  v_month date := (date_trunc('month', now() at time zone 'Europe/London'))::date;
  v_days_left integer := ((v_month + interval '1 month')::date - public.xp_london_day());
  r record;
  v_above record;
  v_title text;
  v_msg text;
  v_kind text;
begin
  -- The board once per run, not once per learner.
  drop table if exists _rank_board;
  create temp table _rank_board on commit drop as select * from public.study_board('month');

  for r in
    select b.uid, b.pos::int as pos, b.board_xp, s.last_pos, s.month as state_month, s.last_alert_at
    from _rank_board b
    left join public.study_rank_alert_state s on s.user_id = b.uid
    where not exists (
      select 1 from public.notification_preferences np
      where np.user_id = b.uid and np.category = 'study_centre' and np.enabled = false
    )
  loop
    v_kind := null;
    select a.display_name, a.board_xp into v_above
    from _rank_board a where a.pos = r.pos - 1;

    if r.state_month = v_month and r.last_pos is not null and r.pos > r.last_pos
       and v_above.board_xp is not null and v_above.board_xp - r.board_xp + 1 <= 300 then
      v_kind := 'overtaken';
      v_title := initcap(split_part(coalesce(v_above.display_name, 'Someone'), ' ', 1)) || ' just passed you';
      v_msg := (v_above.board_xp - r.board_xp + 1)::text || ' XP takes ' || r.last_pos::text ||
               case when r.last_pos % 10 = 1 and r.last_pos % 100 <> 11 then 'st'
                    when r.last_pos % 10 = 2 and r.last_pos % 100 <> 12 then 'nd'
                    when r.last_pos % 10 = 3 and r.last_pos % 100 <> 13 then 'rd' else 'th' end
               || ' back. A mock is worth up to 150.';
    elsif v_days_left <= 3 and r.pos between 4 and 10 then
      select (t.board_xp - r.board_xp + 1) into v_above.board_xp
      from _rank_board t where t.pos = 3;
      if v_above.board_xp <= 500 then
        v_kind := 'final_days';
        v_title := case when v_days_left <= 1 then 'Last day of the month' else v_days_left::text || ' days left this month' end;
        v_msg := v_above.board_xp::text || ' XP gets you into the top 3.';
      end if;
    end if;

    -- Remember this position first (keeping when they were last alerted)…
    if p_send then
      insert into public.study_rank_alert_state (user_id, month, last_pos)
      values (r.uid, v_month, r.pos)
      on conflict on constraint study_rank_alert_state_pkey do update set month = excluded.month, last_pos = excluded.last_pos,
        last_alert_at = case when public.study_rank_alert_state.month = excluded.month
                             then public.study_rank_alert_state.last_alert_at end;
    end if;

    -- …then at most one alert a day, stamped so the next hourly run skips them.
    if v_kind is not null and (r.last_alert_at is null or r.last_alert_at < now() - interval '24 hours') then
      user_id := r.uid; kind := v_kind; title := v_title; message := v_msg;
      return next;
      if p_send then
        insert into public.user_notifications (user_id, type, title, message, link, metadata)
        values (r.uid, 'study_rank_' || v_kind, v_title, v_msg, '/study-centre/leaderboard',
                jsonb_build_object('pos', r.pos, 'month', v_month, 'link', '/study-centre/leaderboard'));
        update public.study_rank_alert_state set last_alert_at = now()
        where study_rank_alert_state.user_id = r.uid;
      end if;
    end if;
  end loop;
end;
$$;

revoke all on function public.study_rank_alerts(boolean) from public, anon, authenticated;

-- First run remembers everyone's position (no "overtaken" without a previous one).
select count(*) from public.study_rank_alerts(true);

select cron.unschedule('study-rank-alerts') where exists (select 1 from cron.job where jobname = 'study-rank-alerts');
select cron.schedule('study-rank-alerts', '15 * * * *', 'select count(*) from public.study_rank_alerts(true)');
