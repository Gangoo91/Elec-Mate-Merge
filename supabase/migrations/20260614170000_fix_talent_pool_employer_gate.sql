-- get_talent_pool() gated on profiles.role = 'employer', but employers are
-- identified by subscription_tier — only 21 of 74 employer-tier accounts have
-- role='employer' (most are 'electrician'/'apprentice'), and admins have neither.
-- So the talent pool returned [] for most real employers. Gate on the real signals.
--
-- Reversible: restore the gate to `and role = 'employer'`.
CREATE OR REPLACE FUNCTION public.get_talent_pool()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_result jsonb;
begin
  -- employers (by tier), plus role='employer' and admins
  if not exists (
    select 1 from profiles
    where id = auth.uid()
      and (subscription_tier = 'employer' or role = 'employer' or admin_role is not null)
  ) then
    return '[]'::jsonb;
  end if;

  select coalesce(jsonb_agg(c order by (c->>'is_verified')::boolean desc, c->>'name'), '[]'::jsonb)
    into v_result
  from (
    select jsonb_build_object(
      'profile_id', p.id,
      'name', e.name,
      'photo_url', coalesce(nullif(e.photo_url, ''), nullif(pr.avatar_url, '')),
      'job_title', p.job_title,
      'bio', p.bio,
      'specialisations', p.specialisations,
      'ecs_card_type', p.ecs_card_type,
      'ecs_expiry_date', p.ecs_expiry_date,
      'is_verified', p.is_verified,
      'verification_tier', p.verification_tier,
      'verification_status', p.verification_status,
      'rate_type', p.rate_type,
      'rate_amount', p.rate_amount,
      'member_since', p.created_at,
      'skills', coalesce((
        select jsonb_agg(jsonb_build_object('name', s.skill_name, 'level', s.skill_level, 'years', s.years_experience))
        from employer_elec_id_skills s where s.profile_id = p.id), '[]'::jsonb),
      'qualifications_count', (select count(*) from employer_elec_id_qualifications q where q.profile_id = p.id),
      'verified_documents', coalesce((
        select jsonb_agg(distinct d.document_type)
        from elec_id_documents d
        where d.profile_id = p.id and d.verification_status = 'verified'), '[]'::jsonb),
      'work_history_count', (select count(*) from employer_elec_id_work_history w where w.profile_id = p.id)
    ) as c
    from employer_elec_id_profiles p
    join employer_employees e on e.id = p.employee_id
    left join profiles pr on pr.id = e.user_id
    where p.opt_out = false
      and p.available_for_hire = true
      and p.profile_visibility in ('public', 'employers_only')
      -- never list the employer's own team or themselves
      and (e.employer_id is null or e.employer_id <> auth.uid())
      and (e.user_id is null or e.user_id <> auth.uid())
  ) sub;

  return v_result;
end;
$function$;
