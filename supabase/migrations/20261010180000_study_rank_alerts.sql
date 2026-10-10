-- Rank alerts — BUILT, NOT SWITCHED ON (10 Oct 2026).
-- These message real users, so nothing is scheduled. Andrew decides.
--
--   Overtaken:  "Tom just passed you. 40 XP takes 5th back."
--               someone moved above you on this month's board since the last
--               run, and you can get the place back with ≤ 300 XP.
--   Final days: "3 days left: 120 XP off the top 3."
--               last 3 days of the month, you're 4th–10th, ≤ 500 XP off 3rd.
--
-- study_rank_alerts(false) = dry run: who would be told what, nothing written.
-- study_rank_alerts(true)  = in-app bell (user_notifications) + remember
--                            positions. At most one alert per person a day;
--                            Study Centre notifications turned off = never.
-- To switch on later: cron.schedule('study-rank-alerts', '15 * * * *',
--   'select count(*) from public.study_rank_alerts(true)');

create table if not exists public.study_rank_alert_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  month date not null,
  last_pos integer,
  last_alert_at timestamptz
);
comment on table public.study_rank_alert_state is
  '[STUDY] Last seen position on this month''s XP board and when the learner was last alerted. Scope: server only. Used by: study_rank_alerts. Rule: no client access.';
alter table public.study_rank_alert_state enable row level security;

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

    if v_kind is not null and (r.last_alert_at is null or r.last_alert_at < now() - interval '24 hours') then
      user_id := r.uid; kind := v_kind; title := v_title; message := v_msg;
      return next;
      if p_send then
        insert into public.user_notifications (user_id, type, title, message, link, metadata)
        values (r.uid, 'study_rank_' || v_kind, v_title, v_msg, '/study-centre/leaderboard',
                jsonb_build_object('pos', r.pos, 'month', v_month));
        update public.study_rank_alert_state set last_alert_at = now() where study_rank_alert_state.user_id = r.uid;
      end if;
    end if;

    if p_send then
      insert into public.study_rank_alert_state (user_id, month, last_pos)
      values (r.uid, v_month, r.pos)
      on conflict (user_id) do update set month = excluded.month, last_pos = excluded.last_pos,
        last_alert_at = case when public.study_rank_alert_state.month = excluded.month
                             then public.study_rank_alert_state.last_alert_at end;
    end if;
  end loop;
end;
$$;
revoke all on function public.study_rank_alerts(boolean) from public, anon, authenticated;
