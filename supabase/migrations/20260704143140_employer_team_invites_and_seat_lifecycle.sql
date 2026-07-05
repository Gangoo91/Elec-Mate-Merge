-- ELE-1272 Slice B: per-person single-use invites + pending/active/revoked seat
-- lifecycle. Bill-on-activation, link-only acceptance, retire the shared-code
-- "create a stranger" fallback. Rollback notes at each block.

-- 1) Per-person invite table -------------------------------------------------
create table if not exists public.employer_team_invites (
  id           uuid primary key default gen_random_uuid(),
  employer_id  uuid not null default auth.uid(),
  employee_id  uuid not null references public.employer_employees(id) on delete cascade,
  email        text not null,
  token        text not null unique,
  status       text not null default 'pending',   -- pending|accepted|expired|revoked
  expires_at   timestamptz not null default (now() + interval '14 days'),
  sent_count   integer not null default 1,
  last_sent_at timestamptz not null default now(),
  accepted_at  timestamptz,
  accepted_by  uuid,
  created_at   timestamptz not null default now()
);
-- one live (pending) invite per person
create unique index if not exists employer_team_invites_one_pending
  on public.employer_team_invites (employee_id) where status = 'pending';
create index if not exists employer_team_invites_employer_idx
  on public.employer_team_invites (employer_id);

alter table public.employer_team_invites enable row level security;
create policy "Employer manages own team invites"
  on public.employer_team_invites for all to authenticated
  using (employer_id = (select auth.uid()))
  with check (employer_id = (select auth.uid()));

-- 2) Seat lifecycle triggers on employer_employees ---------------------------
-- add -> pending seat (£0); link (user_id set) -> active; archive -> revoked.
create or replace function public.tg_employer_employee_seat()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    if new.employer_id is not null then
      insert into employer_seats (employer_id, employee_id, user_id, status,
                                  created_at, revoked_at)
      values (new.employer_id, new.id, new.user_id,
              case when new.user_id is not null then 'active' else 'pending' end,
              now(), null);
    end if;
    return new;
  end if;

  -- linking: user_id null -> set  => activate the pending seat
  if old.user_id is null and new.user_id is not null then
    update employer_seats
       set status = 'active', user_id = new.user_id
     where employee_id = new.id and status = 'pending';
    -- mark the person's pending invite accepted (belt-and-braces for email path)
    update employer_team_invites
       set status = 'accepted', accepted_at = now(), accepted_by = new.user_id
     where employee_id = new.id and status = 'pending';
  end if;

  -- archiving => revoke the seat and any pending invite
  if lower(coalesce(new.status,'')) = 'archived'
     and lower(coalesce(old.status,'')) <> 'archived' then
    update employer_seats
       set status = 'revoked', revoked_at = now()
     where employee_id = new.id and status in ('pending','active');
    update employer_team_invites
       set status = 'revoked'
     where employee_id = new.id and status = 'pending';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_employer_employee_seat on public.employer_employees;
create trigger trg_employer_employee_seat
  after insert or update on public.employer_employees
  for each row execute function public.tg_employer_employee_seat();

-- 3) Invite RPCs -------------------------------------------------------------
-- Mint (or regenerate) the single pending invite for a person. Employer-scoped.
create or replace function public.create_team_invite(p_employee_id uuid)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_emp record;
  v_token text;
begin
  select id, employer_id, email into v_emp
  from employer_employees where id = p_employee_id;
  if v_emp is null or v_emp.employer_id <> auth.uid() then
    return jsonb_build_object('error', 'Not your team member');
  end if;
  if coalesce(trim(v_emp.email),'') = '' then
    return jsonb_build_object('error', 'Team member has no email');
  end if;

  -- retire any existing pending invite for this person (one live per person)
  update employer_team_invites set status = 'revoked'
   where employee_id = p_employee_id and status = 'pending';

  v_token := encode(gen_random_bytes(24), 'hex');
  insert into employer_team_invites (employer_id, employee_id, email, token)
  values (auth.uid(), p_employee_id, lower(trim(v_emp.email)), v_token);

  return jsonb_build_object('success', true, 'token', v_token);
end;
$$;
grant execute on function public.create_team_invite(uuid) to authenticated;

-- Public read for the branded accept page (token is the secret).
create or replace function public.get_team_invite(p_token text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v record;
begin
  select ti.status, ti.email, ti.expires_at,
         e.name as employee_name,
         coalesce(cp.company_name, 'Your employer') as company_name
    into v
  from employer_team_invites ti
  join employer_employees e on e.id = ti.employee_id
  left join company_profiles cp on cp.user_id = ti.employer_id
  where ti.token = p_token
  limit 1;

  if v is null then
    return jsonb_build_object('error', 'not_found');
  end if;
  if v.status <> 'pending' then
    return jsonb_build_object('error', v.status);  -- accepted|revoked|expired
  end if;
  if v.expires_at < now() then
    return jsonb_build_object('error', 'expired');
  end if;
  return jsonb_build_object(
    'company_name', v.company_name,
    'employee_name', v.employee_name,
    'email', v.email
  );
end;
$$;
grant execute on function public.get_team_invite(text) to anon, authenticated;

-- Accept: LINK ONLY — never creates a member. Signed-in user takes the seat the
-- token points to. The seat trigger flips pending->active.
create or replace function public.accept_team_invite(p_token text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_user uuid := auth.uid();
  v_inv record;
  v_emp record;
  v_company text;
begin
  if v_user is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

  select * into v_inv from employer_team_invites
   where token = p_token and status = 'pending' and expires_at > now();
  if v_inv is null then
    return jsonb_build_object('error', 'Invalid or expired invite');
  end if;

  select * into v_emp from employer_employees where id = v_inv.employee_id;
  if v_emp is null then
    return jsonb_build_object('error', 'Team member record missing');
  end if;

  -- already linked to this person?
  if v_emp.user_id = v_user then
    update employer_team_invites set status='accepted', accepted_at=now(), accepted_by=v_user
      where id = v_inv.id;
    select company_name into v_company from company_profiles where user_id = v_inv.employer_id;
    return jsonb_build_object('success', true, 'already_member', true,
                              'company_name', coalesce(v_company,'your company'));
  end if;
  -- seat already taken by someone else
  if v_emp.user_id is not null then
    return jsonb_build_object('error', 'This invite has already been used');
  end if;

  update employer_employees set user_id = v_user, updated_at = now()
   where id = v_inv.employee_id and user_id is null;  -- trigger activates seat + marks invite

  select company_name into v_company from company_profiles where user_id = v_inv.employer_id;
  return jsonb_build_object('success', true, 'company_name', coalesce(v_company,'your company'),
                            'employer_id', v_inv.employer_id);
end;
$$;
grant execute on function public.accept_team_invite(text) to authenticated;
