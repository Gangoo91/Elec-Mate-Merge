-- ELE-1272: close the hole. The old accept_employer_invite INSERTED a brand-new
-- active team member for anyone who typed the shared code — uncapped members +
-- uncapped seat billing + data exposure. Make it LINK-ONLY: it can only fill
-- user_id on a row the employer already added (email match). No creation.
-- Rollback: prior definition captured in the ELE-1272 design notes / git history.
create or replace function public.accept_employer_invite(p_invite_code text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_user uuid := auth.uid();
  v_invite record;
  v_email text;
  v_company text;
  v_existing uuid;
  v_rows int;
  v_linked_id uuid;
begin
  if v_user is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

  select * into v_invite from employer_invites
   where invite_code = upper(trim(p_invite_code))
     and is_active = true
     and (expires_at is null or expires_at > now())
     and (max_uses is null or use_count < max_uses);
  if v_invite is null then
    return jsonb_build_object('error', 'Invalid or expired invite code');
  end if;

  select email into v_email from auth.users
   where id = v_user and email_confirmed_at is not null;
  select company_name into v_company from company_profiles where user_id = v_invite.employer_id;

  -- already a member?
  select id into v_existing from employer_employees
   where user_id = v_user and employer_id = v_invite.employer_id;
  if v_existing is not null then
    return jsonb_build_object('success', true, 'already_member', true,
                              'company_name', coalesce(v_company,'your company'));
  end if;

  -- LINK ONLY: fill user_id on a roster row the employer pre-added with this
  -- confirmed email. Never create a member. (Seat trigger activates the seat.)
  update employer_employees
     set user_id = v_user, updated_at = now()
   where id = (
     select id from employer_employees
      where user_id is null
        and employer_id = v_invite.employer_id
        and v_email is not null
        and lower(btrim(coalesce(email,''))) = lower(btrim(v_email))
      order by created_at limit 1
   )
  returning id into v_linked_id;

  if v_linked_id is null then
    return jsonb_build_object(
      'error',
      'No matching invite for your email. Ask ' || coalesce(v_company,'your employer') ||
      ' to add you with this email address, then open the link they send you.'
    );
  end if;

  -- count the use only on a successful link
  update employer_invites set use_count = use_count + 1 where id = v_invite.id;

  return jsonb_build_object('success', true, 'linked_existing', true,
                            'company_name', coalesce(v_company,'your company'),
                            'employer_id', v_invite.employer_id);
end;
$$;
