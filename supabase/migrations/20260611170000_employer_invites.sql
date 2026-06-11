-- ============================================================================
-- Employer team invites — same onboarding pattern as the College Hub
-- (college_invites / accept_college_invite), adapted for employer rosters.
--
-- The employer shares a short code (WhatsApp the team group chat, text it,
-- print it). A worker redeems it in Worker Tools:
--   • an employer-created roster row matching their email gets LINKED, else
--   • a roster row is CREATED for them (role from the invite)
-- This composes with claim-by-email: pre-added members link by either path,
-- and the wrong-email DEAD-END disappears (a mismatched-email redeem creates a fresh row; the pre-added one stays for the employer to merge).
-- ============================================================================

create table public.employer_invites (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null default auth.uid() references public.profiles(id),
  invite_code text not null unique,
  role_to_assign text not null default 'Operative',
  is_active boolean not null default true,
  expires_at timestamptz,
  max_uses integer,
  use_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.employer_invites enable row level security;

create policy "Employer owns invites"
  on public.employer_invites
  for all to authenticated
  using (employer_id = (select auth.uid()))
  with check (employer_id = (select auth.uid()));

create index idx_employer_invites_code on public.employer_invites (invite_code) where is_active;

create or replace function public.accept_employer_invite(p_invite_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid;
  v_invite record;
  v_email text;
  v_company text;
  v_linked boolean := false;
  v_existing uuid;
begin
  v_user := auth.uid();
  if v_user is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

  select * into v_invite
  from employer_invites
  where invite_code = upper(trim(p_invite_code))
    and is_active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses);

  if v_invite is null then
    return jsonb_build_object('error', 'Invalid or expired invite code');
  end if;

  select email into v_email from auth.users where id = v_user;
  select company_name into v_company from company_profiles where user_id = v_invite.employer_id;

  select id into v_existing from employer_employees
   where user_id = v_user and employer_id = v_invite.employer_id;
  if v_existing is not null then
    return jsonb_build_object(
      'success', true, 'already_member', true,
      'company_name', coalesce(v_company, 'your company')
    );
  end if;

  update employer_employees
     set user_id = v_user, updated_at = now()
   where id = (
     select id from employer_employees
      where user_id is null
        and employer_id = v_invite.employer_id
        and v_email is not null
        and lower(btrim(coalesce(email, ''))) = lower(btrim(v_email))
      order by created_at
      limit 1
   );
  if found then v_linked := true; end if;

  if not v_linked then
    insert into employer_employees
      (user_id, employer_id, name, email, role, team_role, status, avatar_initials, hourly_rate)
    select v_user,
           v_invite.employer_id,
           coalesce(nullif(trim(p.full_name), ''), v_email, 'Team member'),
           coalesce(v_email, ''),
           'Electrician',
           coalesce(v_invite.role_to_assign, 'Operative'),
           'Active',
           upper(left(coalesce(nullif(trim(p.full_name), ''), v_email, 'TM'), 2)),
           0
      from profiles p
     where p.id = v_user;
  end if;

  update employer_invites set use_count = use_count + 1 where id = v_invite.id;

  return jsonb_build_object(
    'success', true,
    'linked_existing', v_linked,
    'company_name', coalesce(v_company, 'your company'),
    'employer_id', v_invite.employer_id
  );
end;
$$;

revoke all on function public.accept_employer_invite(text) from public, anon;
grant execute on function public.accept_employer_invite(text) to authenticated;
