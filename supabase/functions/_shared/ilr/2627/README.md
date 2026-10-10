# ILR 2026/27 return (ELE-2087)

The College Hub builds an ILR 2026/27 XML file for a return period (R01 to R14),
checks it against the published 2026/27 schema and the validation rules our data
can trigger, and lists what to fix per learner. Edge function:
`supabase/functions/college-ilr-return`. Panel: Data and API page, "ILR return".

We never say a file is "DfE validated". The response says what it was checked
against; Submit learner data runs every rule when the file is uploaded.

## Source files (official, unedited)

All three were downloaded from the DfE "Submit learner data" guidance site on
10 Oct 2026 and are byte-identical to the published downloads.

| File | Source | Published | SHA-256 |
| --- | --- | --- | --- |
| `ILR-2026-27-schemafile-January.xsd` | https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/appendices (the "ILR-2026-27-schemafile-January.zip" link) | January 2026 (file dated 27 Jan 2026), namespace `ILR/2026-27` | `ffdc38e373f85a5eb5fb0ab7acf9de2c18fc9192c5dcaa4ad4f21d538d086c29` |
| `ILR-validation-rules-2627-v4.csv` | https://guidance.submit-learner-data.service.gov.uk/26-27/validation-download (linked from /26-27/validation-rules; announced at /update/validation2627v4) | Version 4, 10 Sep 2026 | `47a6a2abe43a38ea6ba65adaaae6829ebaf6c2c7b16df2544f93c09faf883195` |
| `ILR-99999999-2627-20250408-094403.xml` | same appendices page (the sample file zip) | sample file, ILR specification version 1 | `a2a8835ae399541abfbbe3ca5670aa297fd40f2b3e562e52d72a9e5d7738b10c` |

Field pages and code lists come from the ILR specification 2026 to 2027:
https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/overview. Return
periods and closing dates come from
https://guidance.submit-learner-data.service.gov.uk/26-27/data-collection-timetable.

Note: the official sample file itself fails the XSD at line 1259
(`LearnRefNumber` "GrowthskillsAppunits" is longer than the 12-character
pattern). Native `xmllint` and our validator report the same single error.

## Modules

| File | What it is |
| --- | --- |
| `schema.ts` | GENERATED: the XSD as a string plus its SHA-256 (edge functions bundle imports, not files). |
| `rules-meta.ts` | GENERATED: every published rule (id, severity, status, category, official message, the fields it reads). |
| `codes.ts` | Code lists and the R01 to R14 periods. |
| `fields.ts` | XSD element to plain name, Elec-Mate field and specification page. |
| `build.ts` | Rows from `college_ilr_return_rows()` to the ILR model to XML, in XSD order. Pure. |
| `validate.ts` | XSD validation with libxml2-wasm 0.7.2 (libxml2, the library behind xmllint, compiled to WebAssembly; runs in Deno), plus plain-English schema messages. |
| `rules.ts` | The implemented validation rules, each registered by its published id. |

Regenerate after replacing the XSD or the CSV, and check in CI:

```bash
node scripts/ilr-2627-generate.mjs          # write schema.ts and rules-meta.ts
node scripts/ilr-2627-generate.mjs --check  # exit 1 if out of date
```

`rule()` in `rules.ts` throws at load if an id is not in the published CSV or is
marked Deleted, so nothing can claim a rule that is not published.

## How Elec-Mate data maps to the ILR

- Learner: `college_students` (ULN, date of birth, NI number, dates) plus
  `college_student_ilr` (the rest). Family and given names fall back to the
  display name and are listed as "filled in for you".
- Apprenticeship standards (FundModel 36, ProgType 25): programme aim ZPROG001
  (AimType 1) with EPAOrgID, HRS and AppFin records; the learning aim reference
  held for the learner becomes the component aim (AimType 3). SOF 105 and ACT 1
  on both.
- HRS1 = planned off-the-job hours on the learner record (written by the training
  plan, ELE-2039, and reduced by prior learning, ELE-2042).
- HRS3 = verified hours only: OTJ entries with status `verified` (college) or
  `verified_by_employer`. Pending, rejected and app-tracked learning time are
  never added (ELE-2037 is undecided). Returned when CompStatus is 2 or 3.
- HRS4 = hours removed for prior learning (ELE-2042), when above 0; RIP1 = the
  funding band maximum minus the agreed price recorded with that decision.
- EPAOrgID = the EPAO recorded for the learner (ELE-2041).
- TNP1 and TNP2 from the ILR fields, dated LearnStartDate.
- Apprenticeship Units (FundModel 39, ProgType 34, ELE-2053): a learner on an
  Apprenticeship Unit course (`college_courses.course_type =
  'apprenticeship_unit'`, the learner's course else the cohort's; the row's
  `unit` from `college_ilr_return_rows()`) with no programme type recorded, or
  with 34 recorded. The structure follows the official 2026/27 sample file
  (learner "GrowthskillsAppunits"): programme aim ZPROG001 (AimType 1) and
  exactly one component aim (AimType 3) whose LearnAimRef is the learning aim
  reference recorded for the learner, else the unit programme's aim reference.
  Both aims carry the same FundModel (39 unless recorded), ProgType 34 and
  dates (R_159, R_160, AimType_10). SOF 105 on both: the sample file has no
  SOF, but LearnDelFAMType_01 and _09 list FundModel 39, so the rules win.
  No ACT (LearnDelFAMType_63), no HRS (HRSType_13), no AppFinRecord, no
  EPAOrgID; StdCode only if recorded (and StdCode_03 then flags it). Programme
  type, funding model and aim reference filled in this way are listed as
  "filled in for you".
- DateEmpStatApp blank: the day before LearnStartDate. DateLevelApp blank:
  LearnStartDate. Both are listed as "filled in for you".

## Rules implemented (118 of the 866 not deleted in Version 4)

R_06, R_59, R_07, FD_LearnRefNumber_MA, FD_LearnRefNumber_AP, FD_ULN_MA,
FD_ULN_AR, ULN_04, FamilyName_01, GivenNames_01, FD_FamilyName_AP,
FD_GivenNames_AP, DateOfBirth_01, DateOfBirth_24, DateOfBirth_04,
DateOfBirth_48, FD_Ethnicity_MA, Ethnicity_01, FD_Sex_MA, Sex_01,
FD_LLDDHealthProb_MA, LLDDHealthProb_01, LLDDHealthProb_06, LLDDHealthProb_04,
LLDDCat_01, PrimaryLLDD_04, NINumber_01, NINumber_02, FD_PostcodePrior_MA,
PostcodePrior_02, FD_Postcode_MA, Postcode_15, PriorAttain_01, PriorAttain_09,
R_131, EmpStat_09, EmpStat_05, EmpStat_15, EmpStat_12, EmpId_02, EmpId_10,
EmpId_14, DateEmpStatApp_01, DateEmpStatApp_02, ESMType_02, ESMType_09,
FD_LearnAimRef_MA, FD_AimType_MA, AimType_01, FD_FundModel_MA, FundModel_01,
ProgType_03, StdCode_01, StdCode_03, FD_LearnStartDate_MA,
FD_LearnPlanEndDate_MA, LearnStartDate_02, LearnStartDate_03, LearnStartDate_05,
LearnStartDate_12, LearnPlanEndDate_02, LearnPlanEndDate_03, LearnActEndDate_01,
LearnActEndDate_04, OrigLearnStartDate_01, OrigLearnStartDate_02,
OrigLearnStartDate_03, FD_CompStatus_MA, CompStatus_01, CompStatus_03,
CompStatus_04, CompStatus_10, Outcome_01, Outcome_04, Outcome_05, Outcome_11,
WithdrawReason_02, WithdrawReason_03, WithdrawReason_04, AchDate_03, AchDate_04,
AchDate_05, AchDate_07, AchDate_14, FD_DelLocPostCode_MA, DelLocPostCode_11,
HRSType_01, HRSAmount_03, FD_HRSAmount_AR, HRSType_07, HRSType_08, HRSType_09,
HRSType_13, HRSType_14, HRSType_18, AFinType_12, EPAOrgID_03, FD_AFinAmount_AR,
R_119, AFinDate_09, R_161, R_162, AFinType_15, AFinType_16, R_31.

Apprenticeship Units (ELE-2053): ProgType_25, FundModel_22, R_159, R_160,
AimType_10, LearnPlanEndDate_04, DateOfBirth_61, CompStatus_11, ULN_13,
EmpStat_24, ESMType_21, AgreemId_01, Outcome_13. Elec-Mate holds one
employment status record per learner; EmpStat_24, ESMType_21 and AgreemId_01
read it when its date is on or before the programme aim's start.

Derived data used inside them: DD01 (ULN check digit), DD04 (earliest programme
start), DD05 (employer identifier check digit). R_31's published text says the
component aim is "AimType = 1"; it is read as AimType 3 (a component), which is
what the rule's intent and flowchart describe.

The live list is also in every response (`rules.implemented`) and under "What
was checked" on the panel.

## Rules not implemented (748), and why

- Need DfE reference data we do not hold: LARS (aim validity, funding, dates,
  standard codes, about 135 rules), funding contracts and allocations (about 44),
  organisation, UKPRN and EPAO registers, ONS and postcode tables, and the
  Learner Register (a ULN beyond its check digit).
- Fields or entities Elec-Mate does not hold or write, so the rule cannot fire:
  HE rules (52), learner FAMs, learning delivery FAMs other than SOF and ACT,
  contact details, ALS, Skills Bootcamp, 16 to 19, adult skills and tailored
  learning specifics, restarts and price changes after the start.
- Field Definition rules on lengths, types and codes for fields we write are
  enforced by the XSD itself; the FD rules listed above are the ones we also
  explain in plain English.
- Apprenticeship Units, needing data we do not hold: LearnAimRef_156 to
  LearnAimRef_160 (the GROWTH_SKILLS_SHORT_COURSES validity in LARS),
  LearnDelFAMType_140 (LARS category 91), UKPRN_32 and UKPRN_34 (the
  apprenticeship service short course register). LDM 403 and 404 are not
  recorded or written, so LearnDelFAMType_135, _138, _139, _141 and _142
  cannot fire; Outcome_13 does fire when a unit is achieved, because LDM 404
  is missing.
- Prior-year and cross-return rules that need earlier submitted returns.
- File Level rules (file name, zip, namespace, duplicate file) run on upload in
  Submit learner data. Our file name follows `ILR-<UKPRN>-2627-<yyyymmdd>-<hhmmss>-<nn>.xml`.
- Derived Data entries (N/A severity) are definitions, not rules.

## Elec-Mate checks (not DfE rules, shown separately)

EM_UKPRN (the college UKPRN is set), EM_NO_LEARNERS, EM_NATION (the college is
in England), EM_HRS3_ZERO (a completed or withdrawn apprentice has no verified
hours), EM_ESM_CODES (EII and LOE codes are checked for presence only),
EM_UNIT_MILESTONE (an Apprenticeship Unit learner: LDM 404, the 30% and
onboarding milestone, is not recorded in Elec-Mate and must be added in the
MIS).

## What a college must supply

UKPRN; per learner: learner reference, ULN, names, date of birth, NI number, sex,
ethnicity, LLDDHealthProb (and categories when 1), prior attainment level,
postcodes (prior, current, delivery location), employment status with employer
identifier and the EII and LOE codes from its MIS, standard code, component
learning aim reference, TNP1 and TNP2, the EPAO, completion status, outcome and
withdrawal reason when learning ends. Apprenticeship Unit learners also need
the agreement identifier (AgreemId), employment status 10 with its LOE code,
the unit's LARS learning aim reference, and LDM 404 in the MIS once the 30%
and onboarding milestone is reached. Start, planned end and planned OTJ hours
come from the learner record and training plan.
