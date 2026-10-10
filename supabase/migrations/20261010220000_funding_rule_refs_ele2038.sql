-- ELE-2038 — evidence pack cites the funding rules of the learner's own year.
--
-- The pack cited 2025/26 paragraph numbers for every learner, and some of them
-- were wrong even for 2025/26. The rules for a learner are the rules of the
-- funding year they STARTED in (2026/27 rules, paras 2–3: "These funding rules
-- will apply to all apprenticeships starting on or after 1 August 2026. Any
-- apprenticeship which started before 1 August 2026 will continue to follow
-- the rules applicable at that time").
--
-- Every paragraph below was located by an exact quote in the official PDF for
-- that year (pdftotext -layout), not recalled:
--   2026/27 v3  https://assets.publishing.service.gov.uk/media/6a68cabe229c578debc1a78c/Funding_Rules_2627_Version_3_Final.pdf
--   2025/26 v3  https://assets.publishing.service.gov.uk/media/6936acd76a167b6884b7360e/Funding_Rules_2025_to_2026.pdf
--   2024/25 v2  https://assets.publishing.service.gov.uk/media/6a5f80710dd52549f5f96c6a/Apprenticeship_funding_rules_2024_to_2025.pdf
-- Starts before 1 August 2024 are not mapped: the pack says "rules for your
-- start year: paragraph not checked" rather than guess.
-- A row with verified = false is shown as unverified, never as a citation.

create table if not exists public.college_funding_rule_refs (
  rule_key text not null,
  funding_year text not null check (funding_year in ('2024/25', '2025/26', '2026/27')),
  paras text,
  verified boolean not null default false,
  note text,
  primary key (rule_key, funding_year)
);

comment on table public.college_funding_rule_refs is
  '[COLLEGE] Paragraph map of the ESFA/DfE apprenticeship funding rules per funding year (ELE-2038). One row per evidence-pack item (rule_key) and funding year. Scope: global reference data, no learner data. Used by: _learner_evidence_pack (cites the learner''s start-year rules), evidence pack pages. Rule: every row verified against the official PDF by exact quote; verified=false rows are shown as unverified, never cited. Edit only by migration.';

alter table public.college_funding_rule_refs enable row level security;
drop policy if exists "college_funding_rule_refs: anyone signed in reads" on public.college_funding_rule_refs;
create policy "college_funding_rule_refs: anyone signed in reads"
  on public.college_funding_rule_refs for select to authenticated using (true);
revoke all on public.college_funding_rule_refs from anon;
revoke insert, update, delete on public.college_funding_rule_refs from authenticated;
grant select on public.college_funding_rule_refs to authenticated;

insert into public.college_funding_rule_refs (rule_key, funding_year, paras, verified, note) values
  -- identity and residency
  ('id_residency', '2024/25', '19.1; 291; Annex A', true, null),
  ('id_residency', '2025/26', '25.1; 318; Annex A', true, null),
  ('id_residency', '2026/27', '29.1; 354; Annex A', true, null),
  -- ULN and NI number
  ('identifiers', '2024/25', '282; 288', true, null),
  ('identifiers', '2025/26', '309; 315', true, null),
  ('identifiers', '2026/27', '344; 350', true, null),
  -- not on another funded programme; information confirmed correct; self-declarations
  ('eligibility', '2024/25', '22.4–22.7; 283.2; 290', true, null),
  ('eligibility', '2025/26', '29.4–29.7; 310.2; 317', true, null),
  ('eligibility', '2026/27', '34.4–34.8; 345.2; 353', true, null),
  -- employed for the whole apprenticeship, and until EPA completes
  ('employment', '2024/25', '67; 124', true, null),
  ('employment', '2025/26', '65; 120', true, null),
  ('employment', '2026/27', '69; 148', true, null),
  -- apprenticeship agreement
  ('agreement', '2024/25', '68–70', true, null),
  ('agreement', '2025/26', '66–68', true, null),
  ('agreement', '2026/27', '70–72', true, null),
  -- training plan: agreed, contents, re-signed after a material change
  ('training_plan', '2024/25', '99–100; 102.4.1', true, null),
  ('training_plan', '2025/26', '95–96; 98.4.1', true, null),
  ('training_plan', '2026/27', '99–100; 103.4.1', true, null),
  -- end-of-programme agreement that the plan was delivered: new in 2026/27
  ('training_plan_delivered', '2024/25', null, true, 'Not in the 2024/25 rules.'),
  ('training_plan_delivered', '2025/26', null, true, 'Not in the 2025/26 rules: new for 1 August 2026.'),
  ('training_plan_delivered', '2026/27', '101', true, null),
  -- initial assessment, skills scan, prior-learning summary
  ('initial_assessment', '2024/25', '18; 26.2; 28; 61', true, null),
  ('initial_assessment', '2025/26', '23; 33.2; 35; 59', true, null),
  ('initial_assessment', '2026/27', '27; 38.2; 39; 63', true, null),
  -- prior learning: price reduction and floors
  ('rpl_price', '2024/25', '28.2', true, null),
  ('rpl_price', '2025/26', '35.2', true, null),
  ('rpl_price', '2026/27', '39.3', true, null),
  ('rpl_floor', '2024/25', '28.1.1; 75', true, '2024/25: at least 12 months remaining; no 187-hour floor.'),
  ('rpl_floor', '2025/26', '35.1.1; 81.2; 73', true, '187 hours of evidenced delivery or 8 months.'),
  ('rpl_floor', '2026/27', '86.2; 77', true, '187 hours (86.2); 8-month minimum practical period (77).'),
  -- prior learning item: summary, floor, price (ELE-2042)
  ('prior_learning', '2024/25', '28; 28.1.1; 28.2', true, null),
  ('prior_learning', '2025/26', '35; 35.1.1; 35.2; 81.2', true, null),
  ('prior_learning', '2026/27', '39; 39.3; 86.2', true, null),
  -- planned off-the-job hours: the minimum and where it is documented
  ('planned_otj', '2024/25', '84; 89', true, '2024/25: 20% of normal working hours (para 84).'),
  ('planned_otj', '2025/26', '81; 84', true, null),
  ('planned_otj', '2026/27', '86; 89', true, null),
  -- active learning every 3 months (block/front-loaded) or every month
  ('monthly_otj_block', '2024/25', '93', true, null),
  ('monthly_otj_block', '2025/26', '88', true, null),
  ('monthly_otj_block', '2026/27', '93', true, null),
  ('monthly_otj', '2024/25', '94', true, null),
  ('monthly_otj', '2025/26', '89', true, null),
  ('monthly_otj', '2026/27', '94', true, null),
  -- progress reviews
  ('reviews', '2024/25', '101–102', true, null),
  ('reviews', '2025/26', '97–98', true, null),
  ('reviews', '2026/27', '102–103', true, null),
  -- learning support reviewed every 3 months
  ('learning_support', '2024/25', '33.5; 101.3', true, null),
  ('learning_support', '2025/26', '40.5; 97.3', true, null),
  ('learning_support', '2026/27', '44.5; 102.3', true, null),
  ('learning_support_na', '2024/25', '33.5', true, null),
  ('learning_support_na', '2025/26', '40.5', true, null),
  ('learning_support_na', '2026/27', '44.5', true, null),
  -- English and maths: written evidence at gateway (16–18 achieved; 19+ attempted)
  ('english_maths', '2024/25', null, false, 'Not pinned: the 2024/25 English and maths rules are paras 39 to 53 and were not checked line by line.'),
  ('english_maths', '2025/26', '45.4; 46.4', true, null),
  ('english_maths', '2026/27', '49.4; 50.5', true, null),
  -- minimum duration and the 30-hour basis
  ('duration', '2024/25', '75; 75.3', true, '2024/25: 12-month minimum.'),
  ('duration', '2025/26', '73; 73.3', true, null),
  ('duration', '2026/27', '77; 77.3', true, null),
  -- lawful wage
  ('wage', '2024/25', '73–74', true, null),
  ('wage', '2025/26', '71–72', true, null),
  ('wage', '2026/27', '75–76', true, null),
  -- care leavers' bursary
  ('care_leaver', '2024/25', '112', true, null),
  ('care_leaver', '2025/26', '108', true, null),
  ('care_leaver', '2026/27', '127', true, null),
  -- contract for services with the employer
  ('contract_for_services', '2024/25', '153', true, null),
  ('contract_for_services', '2025/26', '179', true, null),
  ('contract_for_services', '2026/27', '208', true, null),
  -- gateway
  ('gateway', '2024/25', '123', true, null),
  ('gateway', '2025/26', '119', true, null),
  ('gateway', '2026/27', '147', true, null),
  ('net_readiness_checklist', '2024/25', '123.2', true, null),
  ('net_readiness_checklist', '2025/26', '119.2', true, null),
  ('net_readiness_checklist', '2026/27', '147.2', true, null),
  -- employed until EPA completes, and the signed statement in the evidence box
  ('epa_employment', '2024/25', '124; box after 132', true, null),
  ('epa_employment', '2025/26', '120; box after 129', true, null),
  ('epa_employment', '2026/27', '148; box after 157', true, null),
  -- the EPAO: selected, contracted, written agreement, recorded on the ILR
  ('epao_agreement', '2024/25', '119; 121–122', true, null),
  ('epao_agreement', '2025/26', '115; 117–118', true, null),
  ('epao_agreement', '2026/27', '143; 145–146', true, null),
  -- the EPAO chosen on time (ELE-2041)
  ('epao_on_time', '2024/25', '119; 100.2.1', true, null),
  ('epao_on_time', '2025/26', '115; 96.2.1', true, null),
  ('epao_on_time', '2026/27', '143; 100.2.1', true, null),
  ('epao_on_time_revised', '2024/25', null, false, 'Revised assessment plans were not in the 2024/25 rules.'),
  ('epao_on_time_revised', '2025/26', '346', true, null),
  ('epao_on_time_revised', '2026/27', '382', true, null),
  -- the assessment result (evidence box)
  ('epa_result', '2024/25', 'box after 132', true, null),
  ('epa_result', '2025/26', 'box after 129', true, null),
  ('epa_result', '2026/27', 'box after 157', true, null),
  -- planned versus actual hours statement
  ('otj_statement', '2024/25', '97–98.2', true, '2024/25: only where delivered over a shorter duration AND fewer hours.'),
  ('otj_statement', '2025/26', '92–94', true, null),
  ('otj_statement', '2026/27', '96–98', true, null),
  -- breaks and changes
  ('episodes', '2024/25', '240; 249–251', true, null),
  ('episodes', '2025/26', '266; 276–278', true, null),
  ('episodes', '2026/27', '298; 309–311', true, null),
  -- page-level references
  ('evidence_section', '2024/25', '282–291', true, null),
  ('evidence_section', '2025/26', '309–318', true, null),
  ('evidence_section', '2026/27', '344–354', true, null),
  ('signatures', '2024/25', '284–285', true, null),
  ('signatures', '2025/26', '311–312', true, null),
  ('signatures', '2026/27', '346–347', true, null),
  ('leaver_end_date', '2024/25', '244; 250.1', true, null),
  ('leaver_end_date', '2025/26', '270; 277.1', true, null),
  ('leaver_end_date', '2026/27', '302; 310.1', true, null)
on conflict (rule_key, funding_year) do update
  set paras = excluded.paras, verified = excluded.verified, note = excluded.note;

-- The funding year whose rules a learner follows: the year they started in.
create or replace function public._funding_year_for(p_start date)
returns text
language sql
immutable
set search_path = public
as $$
  select case
    when p_start is null then null
    when p_start >= date '2026-08-01' then '2026/27'
    when p_start >= date '2025-08-01' then '2025/26'
    when p_start >= date '2024-08-01' then '2024/25'
    else 'before 2024/25' end;
$$;

create or replace function public._funding_rules_source(p_year text)
returns text
language sql
immutable
set search_path = public
as $$
  select case p_year
    when '2026/27' then 'https://assets.publishing.service.gov.uk/media/6a68cabe229c578debc1a78c/Funding_Rules_2627_Version_3_Final.pdf'
    when '2025/26' then 'https://assets.publishing.service.gov.uk/media/6936acd76a167b6884b7360e/Funding_Rules_2025_to_2026.pdf'
    when '2024/25' then 'https://assets.publishing.service.gov.uk/media/6a5f80710dd52549f5f96c6a/Apprenticeship_funding_rules_2024_to_2025.pdf'
  end;
$$;

-- {para, verified, note} for one item in one year; null para when not mapped.
create or replace function public._fr_ref(p_key text, p_year text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select jsonb_build_object('para', r.paras, 'verified', r.verified, 'note', r.note)
       from public.college_funding_rule_refs r where r.rule_key = p_key and r.funding_year = p_year),
    jsonb_build_object('para', null, 'verified', false,
                       'note', case when p_year is null then 'No start date, so the rules year is not known.'
                                    else 'Rules for this start year: paragraph not checked.' end));
$$;

revoke all on function public._fr_ref(text, text) from public, anon;
grant execute on function public._funding_year_for(date) to authenticated;
grant execute on function public._funding_rules_source(text) to authenticated;
