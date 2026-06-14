-- Fix two mis-coded EAL qualifications in the catalogue.
-- Source of truth: IET Electrotechnical Assessment Specification (EAS)
-- Qualifications Guide, June 2025. Neither code was in active use
-- (0 cohorts / 0 coverage rows / 0 AC sign-offs) at time of correction.
--
-- 1) 603/3929/9 was mislabelled "Electrotechnical Qualification (Installation) (NVQ)".
--    It is actually the EAL "Level 3 Award in the Requirements for the Installation
--    of Largescale Electric Vehicle Charging Installations" — a short knowledge award,
--    NOT a portfolio NVQ, and a different scope from the full electrotechnical qual.
--    Its mapping to 601/7345/2 was wrong and is removed so it cannot inherit the
--    electrotechnical LO/ACs.
--
-- 2) 603/4027/6 was a phantom code labelled as the EAL Experienced Worker qual.
--    The real EAL Electrotechnical Experienced Worker code is 603/5982/1
--    (603/6294/7 is the City & Guilds 2346 Experienced Worker — a different body).
--    The interim mapping to 601/7345/2 (shared competence backbone) is retained
--    until EAL provides the EW-specific units.

BEGIN;

UPDATE qualifications
SET title = 'Level 3 Award in the Requirements for the Installation of Largescale Electric Vehicle Charging Installations',
    requires_portfolio = false
WHERE code = '603/3929/9';

DELETE FROM qualification_requirement_mappings
WHERE qualification_code = '603/3929/9';

UPDATE qualifications
SET code = '603/5982/1',
    title = 'Level 3 Electrotechnical Experienced Worker Qualification and AM2E Assessment of Competence',
    requires_portfolio = true
WHERE code = '603/4027/6';

UPDATE qualification_requirement_mappings
SET qualification_code = '603/5982/1'
WHERE qualification_code = '603/4027/6';

-- 3) 600/4337/4 was mislabelled "Electrotechnical Occupational Competence (AM2 Gateway)".
--    It is actually the EAL "Level 3 Award in the Initial Verification and Certification
--    of Electrical Installations" — an inspection & testing award (different scope from
--    the full electrotechnical qual). Remove its wrong mapping to 601/7345/2.
UPDATE qualifications
SET title = 'Level 3 Award in the Initial Verification and Certification of Electrical Installations'
WHERE code = '600/4337/4';

DELETE FROM qualification_requirement_mappings
WHERE qualification_code = '600/4337/4';

-- 4) 610/3907/X mapped to itself (no direct rows → zero data). Remove the broken self-mapping.
DELETE FROM qualification_requirement_mappings
WHERE qualification_code = '610/3907/X' AND requirement_code = '610/3907/X';

COMMIT;
