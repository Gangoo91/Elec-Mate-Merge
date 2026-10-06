-- Advisor follow-up (6 Oct): internal helpers and signed-in-only functions are
-- not callable by signed-out visitors; _share_scope gets a fixed search_path.
-- Authenticated keeps EXECUTE on the helpers because RLS policies call them.
alter function public._share_scope(uuid[], uuid) set search_path to 'public';

revoke execute on function public._can_assess(uuid) from anon, public;
revoke execute on function public._can_iqa(uuid) from anon, public;
revoke execute on function public._can_manage_college_staff(uuid) from anon, public;
revoke execute on function public._college_unmanaged_staff(uuid) from anon, public;
revoke execute on function public._is_college_manager(uuid) from anon, public;
revoke execute on function public._is_platform_admin() from anon, public;
revoke execute on function public._is_staff_for(uuid) from anon, public;
revoke execute on function public._learner_direct_write(uuid) from anon, public;
revoke execute on function public.get_portfolio_ac_state(uuid) from anon, public;
revoke execute on function public.accept_assessor_invite(text) from anon, public;
grant execute on function public._can_assess(uuid), public._can_iqa(uuid),
  public._can_manage_college_staff(uuid), public._college_unmanaged_staff(uuid),
  public._is_college_manager(uuid), public._is_platform_admin(), public._is_staff_for(uuid),
  public._learner_direct_write(uuid), public.get_portfolio_ac_state(uuid),
  public.accept_assessor_invite(text) to authenticated;
