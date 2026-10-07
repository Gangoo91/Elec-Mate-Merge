-- ELE-1951: chase people who were invited to the team but never joined.
--
-- The roster already knows who hasn't joined (employer_employees.user_id is
-- null) and employer_team_invites holds one row per invite email sent (the
-- send-team-welcome function mints a fresh token each time). What was missing
-- was a gate on re-sending: "Resend" fired the email as often as it was tapped.
--
-- chase_team_invite() is the gate. The office calls it first; on success the
-- client asks send-team-welcome to re-send (that function re-mints the token).
-- It records when the person was last chased and how many times, and refuses:
--   * anyone outside the firm (owner or an active manager only),
--   * someone who has already joined, was archived, has no email, or said
--     "Not me" (link_declined_at) — the email address needs fixing first,
--   * a second email inside 24 hours of the last one,
--   * a fourth chase — after three reminders a phone call is the answer.
-- A failed email send does not burn the 24-hour window, because the window is
-- measured from the last invite actually minted (employer_team_invites).

alter table public.employer_employees
  add column if not exists invite_last_chased_at timestamptz,
  add column if not exists invite_chase_count integer not null default 0;

comment on column public.employer_employees.invite_last_chased_at is
  'ELE-1951: when the office last chased this person''s team invite (set by chase_team_invite()).';
comment on column public.employer_employees.invite_chase_count is
  'ELE-1951: how many reminders the office has sent. chase_team_invite() stops at 3.';

create or replace function public.chase_team_invite(p_employee_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_employees%rowtype;
  v_last timestamptz;
  v_next timestamptz;
begin
  if auth.uid() is null then
    raise exception 'Sign in again';
  end if;

  select * into v_row from public.employer_employees where id = p_employee_id for update;
  if not found or v_row.employer_id is null
     or v_row.employer_id not in (select public.my_employer_scope()) then
    raise exception 'That person is not on your team';
  end if;
  if v_row.user_id is not null then
    raise exception '% has already joined', coalesce(v_row.name, 'They');
  end if;
  if lower(coalesce(v_row.status, '')) = 'archived' then
    raise exception 'Restore % to the team before chasing the invite', coalesce(v_row.name, 'them');
  end if;
  if nullif(btrim(coalesce(v_row.email, '')), '') is null then
    raise exception 'Add an email address for % first', coalesce(v_row.name, 'them');
  end if;
  if v_row.link_declined_at is not null then
    raise exception '% said the invite wasn''t for them. Check the email address, then save it to send a fresh invite', coalesce(v_row.name, 'They');
  end if;

  select max(i.created_at) into v_last
    from public.employer_team_invites i
   where i.employee_id = v_row.id;
  if v_last is not null and v_last > now() - interval '24 hours' then
    v_next := v_last + interval '24 hours';
    raise exception 'An invite went to % in the last 24 hours. You can chase again after % %',
      coalesce(v_row.name, 'them'),
      to_char(v_next at time zone 'Europe/London', 'HH24:MI'),
      case when (v_next at time zone 'Europe/London')::date = (now() at time zone 'Europe/London')::date
           then 'today' else 'tomorrow' end;
  end if;
  if v_row.invite_chase_count >= 3 then
    raise exception '% has been chased 3 times. Give them a ring, or check the email address', coalesce(v_row.name, 'They');
  end if;

  update public.employer_employees
     set invite_last_chased_at = now(),
         invite_chase_count = invite_chase_count + 1
   where id = v_row.id;

  return jsonb_build_object('ok', true, 'chase_count', v_row.invite_chase_count + 1);
end;
$$;

revoke all on function public.chase_team_invite(uuid) from public, anon;
grant execute on function public.chase_team_invite(uuid) to authenticated;

comment on function public.chase_team_invite(uuid) is
  'ELE-1951: gate + record for re-sending a team invite. Owner/manager only; 24h between sends; max 3 chases.';

-- A corrected email address is a fresh start: the reminder count and the
-- "said it's not me" flag belonged to the old address.
create or replace function public.reset_invite_chase_on_email_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(btrim(coalesce(new.email, ''))) is distinct from lower(btrim(coalesce(old.email, '')))
     and new.user_id is null then
    new.invite_chase_count := 0;
    new.invite_last_chased_at := null;
    new.link_declined_at := null;
  end if;
  return new;
end;
$$;

revoke all on function public.reset_invite_chase_on_email_change() from public, anon;

drop trigger if exists trg_reset_invite_chase_on_email_change on public.employer_employees;
create trigger trg_reset_invite_chase_on_email_change
  before update of email on public.employer_employees
  for each row execute function public.reset_invite_chase_on_email_change();
