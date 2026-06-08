-- =====================================================================
-- EAL Level 3 Electrotechnical Qualification — 601/7345/2 (Issue 8, © EAL 2025)
-- Seeds the RAG "brain" (qualification_requirements) so College Hub +
-- Apprentice Hub support EAL learners identically to City & Guilds.
--
-- Source of truth: authoritative © EAL 2025 unit PDFs (NETK3 Delivery Units
-- + NETP3 Qualification/Performance Units) + Qualification Specification
-- Issue 8 (601/7345/2). Every LO/AC transcribed from source — no invention.
--
-- Combined qualification: mandatory knowledge (NETK3) + performance (NETP3)
-- units under ONE qualification_code, per agreed structure.
--
-- Pipeline note: embedding is NULLed on INSERT by trigger
-- qualification_requirements_clear_embedding — rows must be embedded
-- (1536-dim, text-embedding-3-small) in a follow-up backfill or they are
-- invisible to match_qualification_acs.
-- =====================================================================

BEGIN;

-- 1) Upsert the qualification row -------------------------------------
INSERT INTO qualifications (awarding_body, level, title, code, description, requires_portfolio)
VALUES (
  'EAL',
  'Level 3',
  'Level 3 Electrotechnical Qualification',
  '601/7345/2',
  'EAL Level 3 Electrotechnical Qualification (Installation/Maintenance pathways). 745 GLH, TQT 866h. Combined knowledge (NETK3) and on-site performance (NETP3) units; occupational competence also requires the AM2S. Mandatory units plus one optional pathway performance unit.',
  true
)
ON CONFLICT (code) DO UPDATE SET
  awarding_body = EXCLUDED.awarding_body,
  level = EXCLUDED.level,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  requires_portfolio = EXCLUDED.requires_portfolio,
  updated_at = NOW();

-- 2) Remove the old, unsourced EAL rows (verified zero student progress)
DELETE FROM qualification_requirements WHERE qualification_code = 'EAL-NETP3';

-- 3) Clear any prior rows for this code so the seed is idempotent ------
DELETE FROM qualification_requirements WHERE qualification_code = '601/7345/2';

-- 4) Insert unit LO/AC rows -------------------------------------------
--    qualification_code / unit_code / unit_title / lo_number / lo_text / ac_code / ac_text

-- ---------------------------------------------------------------------
-- NETP3-01  Apply Health, Safety and Environmental Considerations (10 GLH)
-- Ofqual F/507/7342 · Performance Unit · Issue 3
-- ---------------------------------------------------------------------
INSERT INTO qualification_requirements (qualification_code, unit_code, unit_title, lo_number, lo_text, ac_code, ac_text) VALUES
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',1,'Be able to apply relevant health and safety legislation in the workplace','1.1','Identify which workplace health and safety procedures are relevant to the working environment and comply with their duties and obligations as defined by current legislation and organisational procedures'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',1,'Be able to apply relevant health and safety legislation in the workplace','1.2','Produce a risk assessment and method statement in accordance with organisational procedures for a given work activity'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',1,'Be able to apply relevant health and safety legislation in the workplace','1.3','Work within the requirements of: risk assessments; method statements; safe systems of work'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',2,'Be able to assess the work environment for hazards and identify remedial actions in accordance with health and safety legislation','2.1','Identify unsafe situations and conditions and take remedial actions'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',2,'Be able to assess the work environment for hazards and identify remedial actions in accordance with health and safety legislation','2.2','Assess the work environment and revise work practices accordingly to take into account hazards which could cause harm, including the handling of potentially hazardous: a) materials; b) tools; c) equipment'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',2,'Be able to assess the work environment for hazards and identify remedial actions in accordance with health and safety legislation','2.3','Identify any hazards which may present a high risk and report their presence to the relevant persons who have overall responsibility for health and safety in the workplace'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',2,'Be able to assess the work environment for hazards and identify remedial actions in accordance with health and safety legislation','2.4','Apply measures to control health and safety hazards'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',2,'Be able to assess the work environment for hazards and identify remedial actions in accordance with health and safety legislation','2.5','Select and use correct personal protective equipment'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',3,'Be able to apply methods and procedures to ensure work on site is in accordance with health and safety legislation','3.1','Demonstrate a level of personal conduct and behaviour within the workplace, to ensure that the health and safety of themselves and others is not endangered'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',3,'Be able to apply methods and procedures to ensure work on site is in accordance with health and safety legislation','3.2','Apply procedures to ensure the safe use, maintenance and storage of tools, plant and equipment as stipulated in: a) workplace policies (company and site); b) supplier information; c) manufacturer''s instructions'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',3,'Be able to apply methods and procedures to ensure work on site is in accordance with health and safety legislation','3.3','Comply with information, warning, mandatory instruction, and prohibition notices'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',3,'Be able to apply methods and procedures to ensure work on site is in accordance with health and safety legislation','3.4','Apply procedures to ensure the safety of the work location through the correct use of guards, barriers and notices'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',3,'Be able to apply methods and procedures to ensure work on site is in accordance with health and safety legislation','3.5','Use access equipment correctly (cover two): a) ladder; b) tower scaffold or MEWP; c) stepladder; d) platform'),
('601/7345/2','NETP3-01','Apply Health, Safety and Environmental Considerations',4,'Be able to work in accordance with environmental legislation for electrical services','4.1','Demonstrate appropriate procedures for the safe handling, storage and disposal of hazardous materials and products (cover one): a) Environmental Protection Act; b) Hazardous Waste Regulations; c) Pollution Prevention and Control Act; d) Control of Pollution Act; e) Control of Noise at Work Regulations; f) Environment Act');

COMMIT;
