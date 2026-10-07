-- ELE-2006: the worker's own credentials — certificate photos (private bucket,
-- signed URLs) and expiry reminders to the worker AND the firm, folded into the
-- daily expiry job (cron 147 → notify_compliance_expiries) with its sent-log
-- (employer_expiry_sent). Never dedupes against user_notifications.

-- 1. Display names for stored qualification codes. Mirrors UK_QUALIFICATIONS in
--    src/data/uk-electrician-constants.ts (getQualificationLabel); free text
--    passes through unchanged.
create or replace function public.qualification_label(p_code text)
returns text
language sql
immutable
set search_path = public
as $fn$
  select coalesce(
    (select v.label from (values
    ('nvq_level_2', 'NVQ Level 2 Electrical Installation'),
    ('nvq_level_3', 'NVQ Level 3 Electrical Installation'),
    ('cg_2365_l2', 'City & Guilds 2365 Level 2'),
    ('cg_2365_l3', 'City & Guilds 2365 Level 3'),
    ('cg_2330_l2', 'City & Guilds 2330 Level 2 Theory'),
    ('cg_2330_l3', 'City & Guilds 2330 Level 3 Theory'),
    ('cg_5357_l2', 'City & Guilds 5357 Level 2 Diploma'),
    ('cg_5357_l3', 'City & Guilds 5357 Level 3 Diploma'),
    ('am2', 'AM2 Assessment'),
    ('am2s', 'AM2S Assessment (Scotland)'),
    ('eal_diploma', 'EAL Level 3 Diploma'),
    ('eal_level_2', 'EAL Level 2 Diploma in Electrical Installation'),
    ('eal_level_2_et', 'EAL Level 2 Certificate in Electrotechnical Technology'),
    ('eal_level_3_et', 'EAL Level 3 Certificate in Electrotechnical Technology'),
    ('eal_level_3_diploma', 'EAL Level 3 Diploma in Electrical Installation'),
    ('eal_domestic', 'EAL Level 2 Award in Domestic Electrical Installation'),
    ('btec_level_3', 'BTEC Level 3 National Diploma in Electrical Installation'),
    ('hnd_electrical', 'HND Electrical & Electronic Engineering'),
    ('degree_electrical', 'BSc/BEng Electrical Engineering'),
    ('2391_52', '2391-52 Initial & Periodic Inspection'),
    ('2391_51', '2391-51 Periodic Inspection & Testing'),
    ('2394', '2394 Initial Verification (withdrawn)'),
    ('2395', '2395 Periodic Inspection (withdrawn)'),
    ('2391_50', '2391-50 Initial Verification'),
    ('pat_testing', 'PAT Testing Qualification'),
    ('cg_2377', 'City & Guilds 2377 PAT Testing'),
    ('eal_inspection_testing', 'EAL Level 3 Certificate in Inspection, Testing & Certification'),
    ('eal_initial_verification', 'EAL Level 3 Award in Initial Verification'),
    ('eal_periodic_testing', 'EAL Level 3 Award in Periodic Inspection & Testing'),
    ('thermal_imaging', 'Thermal Imaging Level 1'),
    ('thermal_imaging_l2', 'Thermal Imaging Level 2'),
    ('18th_edition', '18th Edition (BS 7671:2018+A2:2022)'),
    ('cg_2382_22', 'City & Guilds 2382-22 (18th Edition)'),
    ('eal_18th_edition', 'EAL Level 3 Award in BS 7671:2018+A2:2022'),
    ('part_p', 'Part P Building Regulations'),
    ('part_l', 'Part L Building Regulations (Energy)'),
    ('cg_2396', 'City & Guilds 2396 Design & Verification'),
    ('eal_design_verification', 'EAL Level 4 Award in Design & Verification'),
    ('ecs_gold', 'ECS Gold Card (Approved Electrician)'),
    ('ecs_blue', 'ECS Blue Card (Electrician)'),
    ('ecs_yellow', 'ECS Yellow Card (Apprentice)'),
    ('ecs_white', 'ECS White Card (Electrical Labourer)'),
    ('ecs_black', 'ECS Black Card (Manager/Supervisor)'),
    ('ecs_red', 'ECS Red Card (Experienced Worker)'),
    ('cscs_green', 'CSCS Green Card'),
    ('cscs_blue', 'CSCS Blue Card'),
    ('cscs_gold', 'CSCS Gold Card'),
    ('jib_grading', 'JIB Grading Card'),
    ('ipaf_3a', 'IPAF 3a (Static Vertical)'),
    ('ipaf_3b', 'IPAF 3b (Mobile Vertical)'),
    ('ipaf_1b', 'IPAF 1b (Static Boom)'),
    ('pasma', 'PASMA Tower Scaffold'),
    ('pasma_towers', 'PASMA Towers for Users'),
    ('asbestos', 'Asbestos Awareness (Cat A)'),
    ('asbestos_cat_b', 'Asbestos Cat B (Non-Licensed)'),
    ('first_aid', 'First Aid at Work'),
    ('first_aid_emergency', 'Emergency First Aid at Work'),
    ('confined_spaces', 'Confined Spaces Entry'),
    ('confined_spaces_rescue', 'Confined Spaces Rescue'),
    ('working_at_height', 'Working at Height'),
    ('manual_handling', 'Manual Handling'),
    ('coshh', 'COSHH Awareness'),
    ('smsts', 'SMSTS (Site Management Safety)'),
    ('sssts', 'SSSTS (Site Supervisor Safety)'),
    ('health_safety_env', 'Health, Safety & Environment Test'),
    ('ev_charging', 'EV Charging Equipment Installation'),
    ('ev_2919', 'City & Guilds 2919 EV Charging'),
    ('eal_ev_charging', 'EAL Level 3 Award in EV Charging Installation'),
    ('imi_ev', 'IMI Level 3 EV Charging Installation'),
    ('solar_pv', 'Solar PV Installation'),
    ('solar_pv_design', 'Solar PV System Design'),
    ('mcs_pv', 'MCS Solar PV Installation'),
    ('bess', 'Battery Energy Storage Systems (BESS)'),
    ('bess_domestic', 'Domestic Battery Storage Installation'),
    ('bess_commercial', 'Commercial Battery Storage'),
    ('heat_pumps', 'Heat Pump Installation (Electrical)'),
    ('ashp', 'Air Source Heat Pump Installation'),
    ('gshp', 'Ground Source Heat Pump Installation'),
    ('eal_smart_home', 'EAL Level 3 Award in Smart Home Technology'),
    ('smart_home_systems', 'Smart Home Systems Installation'),
    ('fire_alarm', 'Fire Alarm Systems Installation'),
    ('fire_alarm_design', 'Fire Alarm System Design (BS 5839)'),
    ('fia_foundation', 'FIA Foundation in Fire Detection & Alarm'),
    ('fia_level_3', 'FIA Level 3 Fire Alarm Systems'),
    ('emergency_lighting', 'Emergency Lighting Installation'),
    ('emergency_lighting_design', 'Emergency Lighting Design (BS 5266)'),
    ('intruder_alarm', 'Intruder Alarm Systems'),
    ('sia_cctv', 'SIA CCTV Operative'),
    ('cctv', 'CCTV Installation'),
    ('access_control', 'Access Control Systems'),
    ('door_entry', 'Door Entry Systems'),
    ('data_cabling', 'Data & Comms Cabling'),
    ('fibre_optic', 'Fibre Optic Installation'),
    ('cat5e_6', 'Cat5e/Cat6 Cabling Installation'),
    ('cat6a_7', 'Cat6a/Cat7 Cabling Installation'),
    ('fibre_termination', 'Fibre Optic Termination & Splicing'),
    ('network_testing', 'Network Cable Testing & Certification'),
    ('wifi_installation', 'WiFi System Installation'),
    ('cctv_ip', 'IP CCTV Systems'),
    ('av_systems', 'Audio Visual Systems'),
    ('plc_programming', 'PLC Programming'),
    ('siemens_plc', 'Siemens PLC Programming'),
    ('allen_bradley', 'Allen-Bradley PLC Programming'),
    ('hmi_scada', 'HMI/SCADA Systems'),
    ('motor_control', 'Motor Control & Drives'),
    ('vsd_vfd', 'Variable Speed/Frequency Drives'),
    ('bms_systems', 'Building Management Systems'),
    ('hvac_controls', 'HVAC Control Systems'),
    ('high_voltage', 'High Voltage Switching (HV Authorised)'),
    ('hv_jointing', 'HV Cable Jointing'),
    ('compex', 'CompEx (Hazardous Areas)')
    ) v(code, label) where v.code = p_code),
    nullif(trim(p_code), ''),
    'A qualification');
$fn$;
revoke all on function public.qualification_label(text) from public, anon;
grant execute on function public.qualification_label(text) to authenticated, service_role;

-- 2. Certificate photos live in the PRIVATE elec-id-documents bucket under the
--    worker's own folder; document_url holds the object path, never a URL.
--    The firm can read a photo only when it is attached to a credential on the
--    Elec-ID of someone on its team AND the file was uploaded by that person.
create or replace function public._firm_can_view_credential_doc(p_name text, p_owner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $fn$
  select auth.uid() is not null
     and p_owner is not null
     and exists (
       select 1
         from public.employer_elec_id_qualifications q
         join public._my_team_roster() r
           on public._elec_id_profile_for_roster(r.id) = q.profile_id
        where q.document_url = p_name
          and r.user_id = p_owner
     );
$fn$;
revoke all on function public._firm_can_view_credential_doc(text, uuid) from public, anon;
grant execute on function public._firm_can_view_credential_doc(text, uuid) to authenticated;

drop policy if exists "Firm managers read team credential photos" on storage.objects;
create policy "Firm managers read team credential photos"
  on storage.objects for select to authenticated
  using (bucket_id = 'elec-id-documents'
         and public._firm_can_view_credential_doc(name, owner));

-- 3. Worker reminders: 60 days, 14 days and on expiry, once per stage, logged in
--    employer_expiry_sent with recipient = the worker and ref 'mine:…'.
comment on table public.employer_expiry_sent is
  '[EMPLOYER] One row per expiry/RAMS reminder ever rung, so clearing the bell can''t make it repeat. Scope: firm = the recipient (the firm owner id; for refs starting ''mine:'' the WORKER''s user id; ''log:'' refs are rate-limit stamps, not alerts). Used by: notify_employer_expiries, notify_my_credential_expiries, notify_employer_waiting_otj, nudge_apprentice_review (cron 147). Rule: server-only, no client policies.';

insert into public.notification_types (type, category, push, importance)
values ('credential_expiry', 'certificates_compliance', true, 1)
on conflict (type) do nothing;

create or replace function public.notify_my_credential_expiries()
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_stage text;
  v_ref text;
  v_days int;
  v_label text;
begin
  for r in
    with mine as (
      select distinct on (e.user_id) e.user_id, p.id as profile_id
        from public.employer_elec_id_profiles p
        join public.employer_employees e on e.id = p.employee_id
       where e.user_id is not null
       order by e.user_id, coalesce(p.activated, false) desc, p.created_at asc
    )
    select m.user_id, q.id, q.qualification_name, q.expiry_date
      from mine m
      join public.employer_elec_id_qualifications q on q.profile_id = m.profile_id
     where q.expiry_date is not null
       and q.expiry_date <= current_date + 60
       and q.expiry_date >= current_date - 30
       and (q.training_status is null or q.training_status in ('Completed', 'Expired'))
  loop
    begin
      v_stage := case when r.expiry_date < current_date then 'overdue'
                      when r.expiry_date <= current_date + 14 then 'due14'
                      else 'due60' end;
      v_ref := 'mine:credential:' || r.id || ':' || r.expiry_date || ':' || v_stage;
      insert into public.employer_expiry_sent (firm, ref) values (r.user_id, v_ref)
      on conflict do nothing;
      continue when not found;
      v_label := public.qualification_label(r.qualification_name);
      v_days := r.expiry_date - current_date;
      perform public.notify_user(
        r.user_id,
        'credential_expiry',
        case when v_stage = 'overdue' then v_label || ' has expired'
             when v_days = 0 then v_label || ' expires today'
             else v_label || ' expires in ' || v_days || case when v_days = 1 then ' day' else ' days' end
        end,
        case when v_stage = 'overdue'
             then 'It expired on ' || to_char(r.expiry_date, 'FMDD Mon YYYY')
                  || '. Once it is renewed, update the date in Credentials so your firm sees it.'
             else 'It expires on ' || to_char(r.expiry_date, 'FMDD Mon YYYY')
                  || '. Book the renewal now, then update the date in Credentials.'
        end,
        jsonb_build_object(
          'route', '/electrician/worker-tools/credentials?item=' || r.id,
          'ref_id', v_ref, 'item_id', r.id, 'due', r.expiry_date)
      );
    exception when others then
      raise warning '[notify_my_credential_expiries] item %: %', r.id, sqlerrm;
    end;
  end loop;
end;
$fn$;
revoke all on function public.notify_my_credential_expiries() from public, anon, authenticated;

-- 4. The firm side read employer_certifications (LEGACY, 0 rows). Swap that
--    branch for THE credentials store + the ECS card, patched in place so the
--    other branches (fleet, kit, policies…) are untouched.
do $do$
declare
  v_def text := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  v_start int;
  v_end int;
  v_tail text := $t$<> 'archived'$t$;
  v_new text := $n$  union all
  select r.employer_id, 'team_credential', q.id, 'expiry_date',
         public.qualification_label(q.qualification_name), q.expiry_date,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=elecid&member=' || r.id
    from public.employer_employees r
    join public.employer_elec_id_qualifications q
      on q.profile_id = public._elec_id_profile_for_roster(r.id)
   where r.employer_id is not null
     and lower(coalesce(r.status, '')) <> 'archived'
     and q.expiry_date is not null
     and (q.training_status is null or q.training_status in ('Completed', 'Expired'))
  union all
  select r.employer_id, 'team_ecs_card', p.id, 'ecs_expiry_date', 'ECS card', p.ecs_expiry_date,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=elecid&member=' || r.id
    from public.employer_employees r
    join public.employer_elec_id_profiles p
      on p.id = public._elec_id_profile_for_roster(r.id)
   where r.employer_id is not null
     and lower(coalesce(r.status, '')) <> 'archived'
     and p.ecs_expiry_date is not null$n$;
begin
  v_start := position($a$  union all
  select e.employer_id, 'team_certification'$a$ in v_def);
  if v_start = 0 then
    raise exception 'employer_expiry_items: team_certification anchor not found — re-read the live definition';
  end if;
  v_end := v_start + position(v_tail in substr(v_def, v_start)) - 1 + length(v_tail);
  if position('employer_certifications' in substr(v_def, v_start, v_end - v_start)) = 0 then
    raise exception 'employer_expiry_items: legacy branch shape changed';
  end if;
  execute substr(v_def, 1, v_start - 1) || v_new || substr(v_def, v_end);
end
$do$;

-- 5. The daily office email counted every sent-log row as "new"; worker and
--    log rows are not office alerts.
do $do$
declare
  v_def text := pg_get_functiondef('public.notify_employer_expiries()'::regprocedure);
  v_old text := $o$where s.firm = r.firm and s.sent_at >= date_trunc('day', now());$o$;
  v_new text := $o$where s.firm = r.firm and s.sent_at >= date_trunc('day', now())
           and s.ref not like 'mine:%' and s.ref not like 'log:%';$o$;
begin
  if position(v_old in v_def) = 0 then
    raise exception 'notify_employer_expiries: summary-count anchor not found';
  end if;
  execute replace(v_def, v_old, v_new);
end
$do$;

-- 6. Fold the worker reminders into the daily job, before the firm block.
do $do$
declare
  v_def text := pg_get_functiondef('public.notify_compliance_expiries()'::regprocedure);
  v_anchor text := $o$  -- ELE-1988: firm-level expiries + the office summary email.$o$;
  v_new text := $o$  -- ELE-2006: the worker's own credentials (60 / 14 days / expired).
  begin
    perform public.notify_my_credential_expiries();
  exception when others then
    raise warning '[notify_compliance_expiries] my credentials: %', sqlerrm;
  end;

$o$;
begin
  if position('notify_my_credential_expiries' in v_def) > 0 then
    return;
  end if;
  if position(v_anchor in v_def) = 0 then
    raise exception 'notify_compliance_expiries: anchor not found';
  end if;
  execute replace(v_def, v_anchor, v_new || v_anchor);
end
$do$;
