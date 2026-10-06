-- ELE-1879: a weekly email to each employer with their apprentices' progress
-- and the one link (employer-portal-view). Sent by college-review-mail.
alter table public.college_employers
  add column if not exists weekly_digest_opt_out_at timestamptz,
  add column if not exists last_digest_at timestamptz;

-- The employer stops (or restarts) the weekly email from their link.
create or replace function public.employer_portal_set_digest(p_token text, p_on boolean)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_emp uuid;
begin
  select employer_id into v_emp from college_employer_tokens
   where token = p_token and revoked_at is null and expires_at > now();
  if v_emp is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  update college_employers
     set weekly_digest_opt_out_at = case when p_on then null else now() end
   where id = v_emp;
  return jsonb_build_object('success', true, 'on', p_on);
end; $$;
revoke all on function public.employer_portal_set_digest(text, boolean) from public;
grant execute on function public.employer_portal_set_digest(text, boolean) to anon, authenticated;
