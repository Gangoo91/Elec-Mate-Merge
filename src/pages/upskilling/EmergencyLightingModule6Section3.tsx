import { ArrowLeft, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm6-s3-art9',
    question: 'RRO 2005 Article 9 — what does it require, and how does emergency lighting fit?',
    options: [
      'A safety policy only.',
      'A SUITABLE AND SUFFICIENT FIRE RISK ASSESSMENT (FRA). Article 9 requires the responsible person (RP) to make a written assessment of fire risk, identify general fire precautions, and review it whenever there is reason to suspect it is no longer valid or there has been a significant change. Emergency lighting is a general fire precaution within Article 9 — the FRA must consider escape routes, sleeping risk, mobility-impaired occupants, external assembly point illumination and any high-risk task lighting need. The FRA outputs feed directly into the BS 5266-1:2025 design-and-installation record.',
      'An annual electrical test.',
      'A signage audit only.',
    ],
    correctIndex: 1,
    explanation:
      'RRO 2005 Article 9 is the assessment hook. It is the duty to think systematically about fire risk and record the conclusions. BS 5266-1:2025 §5 binds the emergency lighting design to the FRA outputs — design that has not been derived from the FRA fails both Article 9 and BS 5266-1.',
  },
  {
    id: 'elm6-s3-pas79',
    question: 'PAS 79-1:2020 — what is its role in fire risk assessment?',
    options: [
      'A statutory instrument.',
      'PAS 79-1:2020 is a publicly available specification giving a METHODOLOGY for fire risk assessment of premises (other than housing). It is not law, but it is the most widely used FRA methodology in the UK. PAS 79-2:2020 covers housing. Both walk the assessor through hazard identification, occupancy analysis, building inspection, the assessment matrix, the action plan and the review schedule. Emergency lighting is one of the elements assessed at the building inspection step and recorded in the action plan.',
      'A piece of test equipment.',
      'A luminaire product standard.',
    ],
    correctIndex: 1,
    explanation:
      'PAS 79 is methodology, not law. The legal duty is RRO Article 9; PAS 79 is the standard recipe for satisfying it. Most insurers and FRS inspectors expect to see a PAS 79-format FRA — its absence is not an offence in itself, but its absence raises the question of whether the assessment was suitable and sufficient.',
  },
  {
    id: 'elm6-s3-art22',
    question: 'A multi-let office building has six tenants and one freeholder. What does RRO 2005 Article 22 require?',
    options: [
      'Each tenant works independently.',
      'A duty to CO-OPERATE and CO-ORDINATE between all responsible persons. Article 22 applies where two or more responsible persons share, or have duties in respect of, the same premises. Each must take reasonable steps to: co-operate with the others to enable each to comply with their duties; co-ordinate the measures they take; and inform the others of any risks. Emergency lighting in shared escape routes (stairs, lobbies) is the classic Article 22 issue — the freeholder typically holds the duty for common parts; tenants for their demised areas; co-ordination required at the boundary.',
      'The freeholder has all duty.',
      'Tenants have all duty.',
    ],
    correctIndex: 1,
    explanation:
      'Article 22 is the multi-occupancy co-operation rule. In emergency lighting, the boundary between common-parts EL (freeholder) and tenant-area EL (tenant) is exactly where the co-ordination must happen — testing, maintenance, fault rectification, and the FRA review must align. A tenant whose unit FRA records a stair issue cannot fix it alone; the freeholder must be engaged.',
  },
  {
    id: 'elm6-s3-goldenthread',
    question: 'A 30-storey residential block is registered as an HRB. The FRA identifies two areas where emergency lighting is below BS EN 1838:2024 minima. Where does this go in the regulatory regime?',
    options: [
      'On a paper file only.',
      'INTO THE BUILDING SAFETY CASE AND THE GOLDEN THREAD. Building Safety Act 2022: HRBs (≥ 18 m or ≥ 7 storeys, ≥ 2 residential units) require an Accountable Person to maintain a safety case. The FRA is one input; the emergency lighting evidence (design records, photometric calculations, commissioning, maintenance, 5-year verification under BS 5266-1:2025) sits within the safety case. The Golden Thread is the digital record of the building maintained throughout its life — accessible to the BSR. Two FRA findings on emergency lighting are golden-thread items: they go into the digital record, into the action plan, and the remediation evidence comes back into the digital record on closure.',
      'Held by the contractor.',
      'Sent to the leaseholders only.',
    ],
    correctIndex: 1,
    explanation:
      'In an HRB the FRA is not a stand-alone document. It is part of an integrated, digital, regulator-accessible safety case. Emergency lighting findings have a regulatory life beyond the FRA itself — into the safety case, the Golden Thread, the resident engagement strategy, and into BSR audits.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which Article of the RRO 2005 imposes the fire risk assessment duty?',
    options: [
      'Article 5.',
      'Article 9 — Risk assessment. The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions needed to comply with the requirements and prohibitions imposed on them by the Order. The assessment must be in writing where there are 5 or more employees, where a licence is in force in respect of the premises, or where an alterations notice requiring it has been served. Article 9 is the foundation duty — every other safety duty in the RRO depends on it.',
      'Article 14.',
      'Article 32.',
    ],
    correctAnswer: 1,
    explanation:
      'RRO 2005 Article 9 is the FRA duty. Emergency lighting is a general fire precaution within the meaning of the Order, so the FRA must consider it. A written FRA that ignores emergency lighting is, by definition, not suitable and sufficient.',
  },
  {
    id: 2,
    question:
      'Under BS 5266-1:2025, what is the correct relationship between the fire risk assessment and the emergency lighting design?',
    options: [
      'The FRA copies the design.',
      'The DESIGN IS DERIVED FROM the FRA. BS 5266-1:2025 §5 makes this explicit. The FRA outputs (escape route layout, sleeping risk, mobility-impaired occupants, refuges, external assembly points, high-risk task areas) are inputs to the emergency lighting design. The design-and-installation record then records, against each FRA output, how the design provides for it. A design that pre-dates the FRA, or that ignores it, fails §5 and fails the underlying RRO Article 9 duty.',
      'They are independent.',
      'BS 5266-1 requires no FRA link.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §5 is the formal FRA-to-design link. The 2025 revision strengthened it — the design-and-installation record now expressly references the FRA outputs. A risk-based design is required, not a pattern-book one.',
  },
  {
    id: 3,
    question: 'BS EN 1838:2024 distinguishes three categories of emergency lighting — what are they, and how does the FRA decide which apply?',
    options: [
      'One category — escape only.',
      'ESCAPE ROUTE lighting (BS EN 1838:2024: 1 lx minimum across the FULL OPEN WIDTH of the route, with edge exclusions — outer 0.5 m on routes > 2 m wide, outer ¼ width on routes ≤ 2 m. The 2024 revision superseded the 2013 centre-line + 50 % central-band wording), ANTI-PANIC open-area lighting (0.5 lx in open areas > 60 m², with 40:1 max:min uniformity), STANDBY lighting (operational continuity where mains failure would create danger or major loss, level set by application), and HIGH-RISK TASK lighting (15 lx or 10 % of normal, whichever is higher, where dangerous tasks must be safely shut down). The FRA identifies which categories apply: escape lighting is universal in non-domestic buildings; standby is application-driven (process plant, operating theatre); high-risk task is identified from the hazard analysis (operator at a press, near unguarded machinery, in a chemical lab).',
      'Standby and escape only.',
      'High-risk only.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4 sets the three categories. The FRA decides which categories apply. The design records, for each, the photometric solution. Missing the high-risk task assessment is a common FRA gap that leaves a real residual risk.',
  },
  {
    id: 4,
    question:
      'PAS 79-1:2020 sets out a 9-step methodology for fire risk assessment. Where does emergency lighting feature?',
    options: [
      'Only in the action plan.',
      'At MULTIPLE STEPS — most prominently at Step 6 (assessment of fire safety measures) and Step 7 (the fire safety measures action plan). The 9 steps in summary: (1) plan and prepare; (2) gather information; (3) identify the relevant persons; (4) identify fire hazards; (5) evaluate the risk; (6) assess the existing fire safety measures (including emergency lighting compliance with BS 5266-1 and BS EN 1838); (7) action plan; (8) record and communicate; (9) review. PAS 79-2:2020 follows the same methodology adapted for housing. Emergency lighting findings at Step 6 typically generate Step 7 actions ranked by priority.',
      'Only at the review step.',
      'Not at all.',
    ],
    correctAnswer: 1,
    explanation:
      'PAS 79 is a structured walk through the risk-assessment task. Emergency lighting is one of the technical fire safety measures assessed at Step 6 and remediated through Step 7. The methodology helps catch gaps that an unstructured walk-around assessment misses.',
  },
  {
    id: 5,
    question: 'BS 5266-1:2025 expanded the design considerations for evacuation. Which of the following is NEW in 2025?',
    options: [
      'Escape route 1 lx.',
      'EXTERNAL ESCAPE ROUTE LIGHTING TO THE PLACE OF ULTIMATE SAFETY. The 2025 revision expressly extends the design responsibility beyond the building envelope — the route from the final exit door to the external assembly point must be illuminated to BS EN 1838 standards. Earlier editions stopped at the door. The change addresses post-Grenfell evidence that occupants exiting a building at night faced unlit external routes, with falls, hesitation, and re-entry into smoke-filled buildings. The FRA must now identify the external assembly point and the route to it; the design must illuminate it.',
      'Anti-panic 0.5 lx.',
      'Refuge call-point illumination.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 extends the design boundary to the external assembly point. The FRA must define where this is; the design must illuminate the route to it. This is one of the most consequential changes in the 2025 revision and a frequent gap in retrofits.',
  },
  {
    id: 6,
    question: 'In a multi-let building, which body holds the FRA duty for the common-parts emergency lighting?',
    options: [
      'Each tenant individually.',
      'The RESPONSIBLE PERSON FOR THE COMMON PARTS — typically the freeholder or their managing agent. RRO 2005 Article 22 then imposes a co-operation duty on each tenant with the common-parts RP. The tenant remains the RP for their demised area; the boundary is at the door from the demised area into the common parts. Stairs, lobbies, lift lobbies, plant rooms, refuse rooms, refuges and external escape routes outside any single demise are common parts. Emergency lighting in these areas is the freeholder RP duty; the tenants must co-operate (e.g. permit access for tests, share fault information).',
      'The local authority.',
      'The fire alarm contractor.',
    ],
    correctAnswer: 1,
    explanation:
      'In multi-occupancy, RRO Article 22 operates on top of the individual Article 9 duties. The freeholder RP for common parts must produce the common-parts FRA; tenants must produce their unit FRAs; co-operation across the boundary is a statutory duty.',
  },
  {
    id: 7,
    question:
      'A care home FRA identifies that 60 % of residents have mobility impairment. How does this drive the emergency lighting design?',
    options: [
      'No effect.',
      'SLEEPING RISK + MOBILITY-IMPAIRED OCCUPANTS escalates the design. The FRA outputs translate to: longer effective evacuation time; refuge provision (if not already required by Approved Document M / BS 9999); enhanced escape lighting along bedroom corridors; refuge call-point illumination at 5 lx vertical (BS EN 1838 §4.5); illuminated wayfinding signage; staff stations with high-illuminance task lighting (registers, medication, communication); and longer-duration batteries (3 h minimum, often 3 h with a 30-min recovery margin). The design-and-installation record under BS 5266-1:2025 records each design choice against the FRA finding.',
      'Reduces requirements.',
      'Removes refuge need.',
    ],
    correctAnswer: 1,
    explanation:
      'The FRA-to-design link is nowhere more visible than in care homes, hospitals, hotels and similar sleeping-risk premises. The design must specifically respond to the FRA findings; a generic 1 lx escape lighting design fails the §5 link.',
  },
  {
    id: 8,
    question: 'The Fire Safety (England) Regulations 2022, Regulation 8 — what does it require for HRBs?',
    options: [
      'Daily inspection.',
      'WAYFINDING SIGNAGE in HRB stairwells. Reg 8 of the Fire Safety (England) Regulations 2022 (SI 2022/547) requires the RP of an HRB to install signage in every protected stairway visible in low light or smoky conditions, identifying floor numbers and the flat numbers on each floor. Emergency lighting interacts because the signs must be visible under emergency conditions, which engages the BS EN 1838:2024 sign-luminance standards. SECURE INFORMATION BOX (PIB) is a separate duty under Reg 4. Reg 9 covers information to residents (fire safety instructions tied to the evacuation strategy). Reg 10 covers FIRE DOORS. Standalone residential evacuation plans were added later by SI 2025/797 (Fire Safety (Residential Evacuation Plans) (England) Regulations 2025) — they are NOT in SI 2022/547.',
      'Annual structural test.',
      'No specific requirement.',
    ],
    correctAnswer: 1,
    explanation:
      'Fire Safety (England) Regulations 2022 are statutory regulations made under the Fire Safety Act 2021 — distinct from the RRO 2005, but operating in the same regime. Reg 8 wayfinding signage in HRBs is an emergency lighting concern: the signs must be illuminated under emergency conditions.',
  },
  {
    id: 9,
    question: 'How often must a fire risk assessment be reviewed under RRO 2005 Article 9(3)?',
    options: [
      'Every 5 years.',
      'WHENEVER THERE IS REASON TO SUSPECT IT IS NO LONGER VALID, OR THERE HAS BEEN A SIGNIFICANT CHANGE. There is no statutory periodic-review interval in Article 9(3) itself — but PAS 79 and most insurers expect annual review as a baseline, with re-assessment on any of: change of use, building alteration, occupancy change, evacuation incident, regulatory change (e.g. BS 5266-1:2025), enforcement notice, modification to fire safety systems. For HRBs, the BSA 2022 safety case regime requires more frequent and structured review. For emergency lighting specifically, BS 5266-1:2025 also drives review at the 5-year photometric verification cycle.',
      'Only after a fire.',
      'When the building is sold.',
    ],
    correctAnswer: 1,
    explanation:
      'Article 9(3) is principle-based, not interval-based. But waiting for a "trigger" without an annual baseline is not best practice. Annual review + significant-change review is the operating norm; the BS 5266-1 5-year photometric is an additional EL-specific check.',
  },
  {
    id: 10,
    question: 'A commercial premises has had its FRA, but the action plan flagged that emergency lighting in the rear loading bay is below 1 lx. Six months later, no action has been taken. Where does this leave the responsible person?',
    options: [
      'Compliant — assessment done.',
      'NON-COMPLIANT under both Article 9 (FRA must result in identification of and action on general fire precautions needed) and Article 14 (emergency lighting of adequate intensity) — and exposed to enforcement under Article 32 if the deficiency places persons at risk of death or serious injury. The FRA is not just a paperwork exercise; the action plan must be progressed. An action plan showing a known emergency lighting deficiency that is not remedied is, in practice, more damaging in court than a missing FRA — it evidences that the RP knew, and did nothing. The FRS can serve an enforcement notice (Article 30); a prohibition notice (Article 31) if the risk is imminent; or proceed to prosecution.',
      'Compliant if budget approved.',
      'Compliant if FRA is signed.',
    ],
    correctAnswer: 1,
    explanation:
      'A known unremediated deficiency is the worst position for the RP. The FRA is not the end of the duty; the action plan is the operative document. Inspectors and prosecutors specifically look for evidence that the RP knew of a deficiency and did not act.',
  },
];

const EmergencyLightingModule6Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'EL in fire risk assessments | Emergency Lighting Module 6.3 | Elec-Mate',
    description:
      'How emergency lighting feeds the FRA under RRO 2005 Article 9, BS 5266-1:2025 §5, PAS 79-1/-2:2020 methodology, BS EN 1838:2024 categories, Fire Safety Act 2021 and Building Safety Act 2022 Higher-Risk Buildings — risk-based design that withstands enforcement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() =>
              navigate('/electrician/upskilling/emergency-lighting-module-6')
            }
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3"
            title="Emergency lighting in fire risk assessments"
            description="Emergency lighting is not specified in isolation. It is one output of the fire risk assessment (FRA) duty under RRO 2005 Article 9, applied through BS 5266-1:2025 §5 and BS EN 1838:2024. This section walks the FRA-to-design pathway — what the FRA must consider, how PAS 79-1/-2:2020 methodology drives it, where emergency lighting sits in the action plan, how multi-occupancy and Higher-Risk Buildings change the regime, and what the design-and-installation record must say."
            tone="yellow"
          />

          <TLDR
            points={[
              'RRO 2005 Article 9 — the fire risk assessment duty. Suitable and sufficient assessment, in writing where 5+ employees. Emergency lighting is a general fire precaution within the FRA scope.',
              'BS 5266-1:2025 §5 — the design must be derived from the FRA. Pattern-book emergency lighting is non-compliant: design must respond to the FRA outputs (escape routes, sleeping risk, mobility impairment, refuges, external assembly points, high-risk task areas).',
              'BS EN 1838:2024 categories — escape route (1 lx minimum across the FULL OPEN WIDTH of the route, with edge exclusions per the 2024 revision; supersedes the 2013 centre-line + central-band wording), open-area anti-panic (0.5 lx in areas > 60 m², 40:1 max:min), standby (operational continuity), high-risk task (15 lx or 10 % of normal). The FRA decides which categories apply.',
              'PAS 79-1:2020 (commercial / non-housing) and PAS 79-2:2020 (housing) — the methodology most assessors use. 9 steps; emergency lighting features at Step 6 (assessment of measures) and Step 7 (action plan).',
              'Multi-occupancy + RRO 2005 Article 22 — co-operation duty between RPs sharing premises. Common parts EL is the freeholder RP duty; demised-area EL is the tenant RP duty; co-ordination at the boundary.',
              'Fire Safety Act 2021 — confirmed RRO scope covers external walls, balconies, flat entrance doors and common parts of buildings with ≥ 2 sets of domestic premises. EL in stairs, lobbies, corridors firmly in scope.',
              'Building Safety Act 2022 + Higher-Risk Buildings (≥ 18 m OR ≥ 7 storeys + ≥ 2 residential units) — Accountable Person, safety case, Golden Thread, BSR. The FRA is one input to the safety case; the EL evidence joins it.',
              'Fire Safety (England) Regulations 2022 (SI 2022/547) — Reg 4 (secure information box / PIB), Reg 8 (wayfinding signage in HRB stairwells), Reg 9 (information to residents — fire safety instructions tied to evacuation strategy), Reg 10 (fire doors). Standalone residential evacuation plans came later under SI 2025/797. Emergency lighting must support all of these — the signs, instructions and final-exit doors must remain visible and operable under emergency conditions.',
              'Significant findings + action plan — the operative paperwork. A known unremediated deficiency is the worst-case position; FRS inspectors specifically look for it.',
              'Review triggers — annual baseline + change-driven (use, layout, occupancy, incident, regulation update, enforcement). For HRBs, more structured under the safety case regime; for EL, BS 5266-1:2025 5-year photometric drives a parallel review.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply RRO 2005 Article 9 to identify the fire risk assessment duty and the emergency lighting elements that must be considered',
              'Apply BS 5266-1:2025 §5 to derive the emergency lighting design from the FRA outputs and record the linkage in the design-and-installation record',
              'Apply BS EN 1838:2024 categories — escape route (1 lx full open width, with edge exclusions), open-area anti-panic (0.5 lx, 40:1 max:min), standby and high-risk task — to the FRA findings',
              'Apply PAS 79-1:2020 (non-housing) and PAS 79-2:2020 (housing) 9-step methodology and identify where emergency lighting features',
              'Apply RRO 2005 Article 22 co-operation duty to multi-occupancy premises and identify the freeholder / tenant RP boundary for common-parts emergency lighting',
              'Apply Fire Safety Act 2021 to multi-occupied residential buildings and identify the emergency lighting RP duty for external walls, balconies, flat entrance doors and common parts',
              'Apply Building Safety Act 2022 Higher-Risk Buildings regime and identify how emergency lighting evidence flows into the safety case and the Golden Thread',
              'Apply Fire Safety (England) Regulations 2022 (SI 2022/547) — Reg 4 (secure information box / PIB), Reg 8 (wayfinding signage in HRB stairwells), Reg 9 (information to residents) and Reg 10 (fire doors) — and identify SI 2025/797 as the standalone residential evacuation-plans regulation',
              'Identify FRA review triggers — annual baseline, change-driven, enforcement-driven, BS 5266-1 5-year photometric verification',
              'Distinguish a suitable-and-sufficient FRA action plan from a paperwork-only FRA and recognise the enforcement implications of a known unremediated deficiency',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>RRO 2005 Article 9 — the FRA duty</ContentEyebrow>

          <ConceptBlock
            title="The fire risk assessment as the foundation of every safety duty"
            plainEnglish="The Regulatory Reform (Fire Safety) Order 2005 imposes a chain of duties on the responsible person (RP). At the head of the chain is Article 9 — the duty to make a suitable and sufficient assessment of the risks to which relevant persons are exposed. Every other safety duty — Article 14 (emergency routes and exits, including emergency lighting), Article 13 (firefighting and detection), Article 15 (procedures for serious and imminent danger), Article 17 (maintenance), Article 21 (training) — depends on the FRA. Without an FRA, none of the downstream duties can be evidenced as discharged."
            onSite="The FRA is the evidence that the RP has thought systematically about fire risk and identified the safety measures needed. In court, the FRA is the first document inspected. A missing, out-of-date or paperwork-only FRA is the start of the prosecutor's case — even before the technical breach is reached. Treat the FRA as the operating logbook for fire safety: alive, current, action-driven."
          >
            <p>What Article 9 requires:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 9(1) — make a suitable and sufficient assessment.</strong> The RP
                must make a suitable and sufficient assessment of the risks to which relevant
                persons are exposed for the purpose of identifying the general fire precautions
                needed to comply with the requirements and prohibitions imposed on them by the
                Order.
              </li>
              <li>
                <strong>Article 9(2) — particular regard.</strong> The assessment must have
                particular regard to: matters set out in Schedule 1 (Part 1, dangerous substances);
                young persons (under 18); and persons with disabilities. Emergency lighting is
                directly engaged for the latter two — egress for young persons in unfamiliar
                surroundings, and for persons with mobility, sensory or cognitive impairment.
              </li>
              <li>
                <strong>Article 9(3) — review.</strong> The assessment must be reviewed by the RP
                regularly so as to keep it up to date and in particular if there is reason to
                suspect it is no longer valid, or there has been a significant change. Review is
                not a fixed interval — but annual review is the operating norm, with change-driven
                re-assessment on top.
              </li>
              <li>
                <strong>Article 9(4) — amendment.</strong> Where changes are identified at review,
                the RP must make such changes as are required.
              </li>
              <li>
                <strong>Article 9(6) — record in writing.</strong> The RP must record the
                significant findings of the assessment, including the measures which have been or
                will be taken by them, and any group of persons identified by the assessment as
                being especially at risk, where: there are 5 or more employees; a licence is in
                force in respect of the premises; or an alterations notice requiring it has been
                served. Most non-domestic premises trigger one of these — a written FRA is the
                practical universal.
              </li>
              <li>
                <strong>Article 9(7) — bring to the attention of employees.</strong> The RP must
                inform employees of the significant findings and the measures taken in respect of
                them. Emergency lighting features include training on what occupants should do if
                normal lighting fails — locations of escape routes, refuges, assembly points.
              </li>
            </ul>
            <p>
              Article 9 is the foundation. Emergency lighting is a general fire precaution within
              the meaning of the Order. The FRA must therefore consider it; the FRA outputs become
              inputs to the BS 5266-1:2025 design.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 9(1)–(3) (Risk assessment)"
            clause={
              <>
                The responsible person must make a suitable and sufficient assessment of the risks
                to which relevant persons are exposed for the purpose of identifying the general
                fire precautions they need to take to comply with the requirements and prohibitions
                imposed on them by or under this Order. The assessment must have particular regard
                to the matters set out in Part 1 of Schedule 1, the matters set out in Part 2 of
                Schedule 1 in the case of young persons, and the matters set out in Part 3 of
                Schedule 1 in respect of persons with disabilities. Any such assessment must be
                reviewed by the responsible person regularly so as to keep it up to date.
              </>
            }
            meaning="Three phrases earn close reading. 'Suitable and sufficient' — the standard against which the assessment is judged in court. 'General fire precautions' — wide; emergency lighting is in scope. 'Reviewed regularly' — no statutory interval, but waiting for a trigger without an annual baseline is rarely defensible. The duty falls on the RP, and is non-delegable in legal terms even where operationally outsourced."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 §5 — design derived from the FRA</ContentEyebrow>

          <ConceptBlock
            title="The risk-based design — what BS 5266-1:2025 changed"
            plainEnglish="The 2025 revision of BS 5266-1 made the FRA-to-design link express. Earlier editions assumed a competent designer would work to the FRA; the 2025 revision requires the design-and-installation record to demonstrate it. The design is no longer a stand-alone calculation — it is a recorded response to the FRA outputs. Each significant FRA finding (escape route X, sleeping risk Y, mobility-impaired population Z, high-risk task area W, external assembly point V) must have a corresponding entry in the design record showing how the lighting provides for it."
            onSite="The practical change is the design record. Where the older record was a list of luminaires + photometric calculations, the 2025 record adds an FRA-mapping column: 'this luminaire / this group / this circuit responds to FRA finding number N'. Designers and inspectors should be able to walk a route from any FRA finding to a specific design provision. If the trail breaks, the design fails §5."
          >
            <p>How §5 operates in design and verification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FRA outputs → design inputs.</strong> The FRA identifies relevant persons
                (employees, visitors, residents, vulnerable groups), escape routes, sleeping
                accommodation, refuges, external assembly points, high-risk task areas, dangerous
                substances. Each is an input to the BS 5266-1 design.
              </li>
              <li>
                <strong>Design responds to each finding.</strong> For each FRA-identified element,
                the design specifies: the BS EN 1838 category (escape route / anti-panic / standby
                / high-risk task); the photometric requirement; the duration; the luminaire
                placement; the circuit topology; the test regime.
              </li>
              <li>
                <strong>Design-and-installation record evidences the linkage.</strong> The 2025
                record format requires the FRA reference to be cross-linked to each design
                decision. A pattern-book design with no FRA mapping is non-compliant.
              </li>
              <li>
                <strong>External escape and assembly point — new in 2025.</strong> The 2025
                revision extends the design boundary beyond the final exit door to the external
                assembly point. The FRA must identify the assembly point; the design must
                illuminate the route to it.
              </li>
              <li>
                <strong>5-year photometric verification — closing the loop.</strong> The 2025
                revision requires in-service photometric verification at 5-year intervals. The
                verification provides empirical evidence that the design is delivering against the
                FRA outputs throughout the installation's life. Falls below the design illuminance
                trigger remediation.
              </li>
              <li>
                <strong>FRA-driven design exceptions.</strong> Where a building has unusual
                features — historic fabric constraints, listed building consent restrictions,
                operational lighting overlap — the FRA records the constraint and the design
                records the engineered response. The §5 link is preserved even where the design
                cannot achieve a default solution.
              </li>
            </ul>
            <p>
              §5 is not a retrofit-by-paperwork exercise. Existing installations need to evidence
              the FRA linkage at major refit, recertification or remediation; new installations
              under the 2025 regime evidence it from day one.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 5 (Risk assessment and design)"
            clause={
              <>
                The design of the emergency escape lighting installation should be based on the
                outputs of the fire risk assessment carried out under the Regulatory Reform (Fire
                Safety) Order 2005. The design-and-installation record should clearly evidence the
                relationship between each significant fire risk assessment finding and the
                emergency lighting provision made for it. The boundary of the design should
                include the route from the final exit of the building to the external place of
                ultimate safety identified by the fire risk assessment.
              </>
            }
            meaning="Three phrases earn close reading. 'Based on the outputs of the fire risk assessment' — design is derived from the FRA, not the other way round. 'Clearly evidence the relationship' — the design record must show the linkage; opacity is non-compliance. 'External place of ultimate safety' — the new 2025 boundary; the design no longer stops at the door."
          />

          {/* FRA-to-design pathway diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              FRA-to-emergency-lighting design pathway — RRO Article 9 to BS 5266-1:2025 record
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="The FRA-to-design pathway. Top row: PAS 79 methodology drives the FRA. Middle: the FRA outputs (relevant persons, escape routes, sleeping risk, refuges, assembly points, high-risk tasks). These feed into the BS EN 1838 categorisation (escape, anti-panic, standby, high-risk task) and into the BS 5266-1 design-and-installation record. Bottom: the action plan tracks remediation and the 5-year photometric verification closes the loop."
            >
              {/* Top — methodology */}
              <rect
                x="60"
                y="18"
                width="700"
                height="58"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.8"
              />
              <text x="410" y="40" textAnchor="middle" fill="#22D3EE" fontSize="12" fontWeight="bold">
                METHODOLOGY — PAS 79-1:2020 (non-housing) / PAS 79-2:2020 (housing)
              </text>
              <text x="410" y="58" textAnchor="middle" fill="rgba(255,255,255,0.78)" fontSize="10">
                9 steps · plan · gather · identify persons · identify hazards · evaluate · assess measures · action · record · review
              </text>
              <text x="410" y="70" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Not law — but the standard methodology for satisfying RRO Article 9
              </text>

              <line x1="410" y1="76" x2="410" y2="100" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="410,100 405,92 415,92" fill="rgba(255,255,255,0.35)" />

              {/* Middle layer — FRA outputs */}
              <rect
                x="60"
                y="108"
                width="700"
                height="118"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2.2"
              />
              <text x="410" y="132" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                FIRE RISK ASSESSMENT OUTPUTS (RRO 2005 Article 9)
              </text>

              <text x="140" y="156" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Relevant persons
              </text>
              <text x="140" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Employees · visitors
              </text>
              <text x="140" y="182" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Vulnerable · sleeping
              </text>

              <text x="270" y="156" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Escape routes
              </text>
              <text x="270" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Stairs · lobbies
              </text>
              <text x="270" y="182" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Corridors · final exits
              </text>

              <text x="410" y="156" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Refuges
              </text>
              <text x="410" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Mobility-impaired
              </text>
              <text x="410" y="182" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Call-points (5 lx vert.)
              </text>

              <text x="550" y="156" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                External route
              </text>
              <text x="550" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Final exit → assembly
              </text>
              <text x="550" y="182" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                NEW in 2025
              </text>

              <text x="690" y="156" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                High-risk task
              </text>
              <text x="690" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Process shutdown
              </text>
              <text x="690" y="182" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                15 lx · 10 % normal
              </text>

              <text x="410" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Significant findings recorded under Article 9(6); brought to employees under Article 9(7)
              </text>
              <text x="410" y="220" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Where multi-occupied — Article 22 co-operation; freeholder common-parts RP / tenant demised-area RP
              </text>

              <line x1="410" y1="226" x2="410" y2="252" stroke="rgba(251,191,36,0.65)" strokeWidth="2" />
              <polygon points="410,252 404,242 416,242" fill="rgba(251,191,36,0.85)" />

              {/* Categorisation + design */}
              <rect
                x="60"
                y="258"
                width="345"
                height="92"
                rx="10"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.8"
              />
              <text x="232" y="282" textAnchor="middle" fill="#A855F7" fontSize="12" fontWeight="bold">
                BS EN 1838:2024 CATEGORIES
              </text>
              <text x="232" y="302" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Escape route — 1 lx full open width (2024)
              </text>
              <text x="232" y="316" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Anti-panic — 0.5 lx in {'>'}60 m² open
              </text>
              <text x="232" y="330" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Standby — application-driven
              </text>
              <text x="232" y="344" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                High-risk — 15 lx / 10 % normal
              </text>

              <rect
                x="415"
                y="258"
                width="345"
                height="92"
                rx="10"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.8"
              />
              <text x="587" y="282" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">
                BS 5266-1:2025 DESIGN-AND-INSTALLATION RECORD
              </text>
              <text x="587" y="302" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Each FRA finding → design provision
              </text>
              <text x="587" y="316" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Photometric calculations + layout
              </text>
              <text x="587" y="330" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Commissioning + acceptance
              </text>
              <text x="587" y="344" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                FRA-mapping column required
              </text>

              {/* Loop back */}
              <rect
                x="60"
                y="368"
                width="700"
                height="60"
                rx="10"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.45)"
                strokeWidth="1.6"
              />
              <text x="410" y="390" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
                ACTION PLAN + REVIEW LOOP
              </text>
              <text x="410" y="406" textAnchor="middle" fill="rgba(255,255,255,0.78)" fontSize="10">
                Significant findings → action plan → remediation → re-FRA. BS 5266-1 5-year photometric closes the loop empirically.
              </text>
              <text x="410" y="420" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Annual baseline review · change-driven re-assessment · enforcement-driven re-assessment
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS EN 1838:2024 — categories the FRA must trigger</ContentEyebrow>

          <ConceptBlock
            title="Escape, standby, high-risk task — what the FRA chooses"
            plainEnglish="BS EN 1838:2024 is the technical standard for emergency lighting illuminance. It distinguishes three families: escape lighting (which itself includes escape route lighting and anti-panic open-area lighting), standby lighting (operational continuity where mains failure creates danger or major loss), and high-risk task area lighting (where dangerous tasks must be safely shut down). Each family has photometric requirements. The FRA — not the designer's preference — decides which families apply to the building."
          >
            <p>Each category and the FRA trigger:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting (BS EN 1838:2024 §4.2).</strong> 1 lx minimum
                horizontal illuminance across the FULL OPEN WIDTH of every escape route, measured
                at floor level, with edge exclusions: routes wider than 2 m exclude the outer
                0.5 m each side; routes 2 m or narrower exclude the outer ¼ of the width each
                side. Maximum-to-minimum ratio along the route shall not exceed 40:1. The earlier
                2013 wording — 1 lx along the centre line plus 0.5 lx along a 50 % central band —
                was superseded by the 2024 revision. Triggered by any non-domestic escape route.
                The FRA may identify higher values for sleeping risk or mobility-impaired
                occupancy.
              </li>
              <li>
                <strong>Open-area (anti-panic) lighting (BS EN 1838 §4.3).</strong> 0.5 lx
                horizontal in any open area larger than 60 m². Triggered automatically by area
                size; the FRA may extend the trigger to smaller areas where occupant unfamiliarity
                or vulnerability is high.
              </li>
              <li>
                <strong>Standby lighting (BS EN 1838 §4.4).</strong> Lighting allowing normal
                activities to continue when normal mains fails. Application-driven — operating
                theatres, control rooms, data centres, broadcasting studios. The FRA identifies the
                operational risk of mains failure; the standby lighting is the response.
              </li>
              <li>
                <strong>High-risk task area lighting (BS EN 1838 §4.4 / §4.5).</strong> 15 lx
                minimum or 10 % of normal task illuminance, whichever is higher. Triggered where
                the FRA identifies a process or activity that, if interrupted by lighting failure,
                would expose persons to danger (a press operator, a chemical lab, a high-voltage
                switching task).
              </li>
              <li>
                <strong>Refuge call-point illumination (BS EN 1838 §4.5).</strong> 5 lx vertical
                illuminance at the call-point. Triggered where the FRA identifies refuges (under
                BS 9999 or Approved Document B / Approved Document M).
              </li>
              <li>
                <strong>Sign-luminance (BS EN 1838 §5).</strong> Internally and externally
                illuminated safety signs must achieve specified luminance contrast. Triggered for
                all escape signs.
              </li>
            </ul>
            <p>
              The FRA is the trigger. The designer cannot decide unilaterally to omit a category;
              the FRA must justify any omission. Conversely, the FRA may identify a category not
              automatically triggered (e.g. anti-panic in a 50 m² space because of vulnerable
              occupants) and the design must respond.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · Clause 4 (Photometric requirements)"
            clause={
              <>
                Emergency escape lighting comprises escape route lighting and open-area (anti-panic)
                lighting. Standby lighting and high-risk task area lighting are additional
                categories where operational or safety considerations require them. The fire risk
                assessment determines which categories apply at a given location and whether
                photometric values higher than the minima specified in this document are required.
              </>
            }
            meaning="Three phrases earn close reading. 'Comprises escape route lighting and open-area lighting' — both, not either; the FRA decides where each applies. 'Additional categories' — standby and high-risk task are not optional features; the FRA decides whether they are required. 'Higher than the minima' — minima are floors; the FRA can require more, never less."
          />

          <SectionRule />

          <ContentEyebrow>PAS 79 methodology — how an FRA is actually done</ContentEyebrow>

          <ConceptBlock
            title="The 9-step PAS 79-1:2020 methodology"
            plainEnglish="PAS 79-1:2020 is a publicly available specification giving a methodology for fire risk assessment of premises (other than housing). PAS 79-2:2020 covers housing. Neither is law — but both are the reference methodology that competent assessors and most insurers expect to see. The 9-step structure walks the assessor from gathering information through to action and review. Emergency lighting features at multiple steps but most prominently at Step 6 (assessment of fire safety measures) and Step 7 (action plan)."
            onSite="If the FRA you are reviewing does not follow a recognisable PAS 79 structure, raise it as a concern. A free-form FRA can be suitable and sufficient — but the burden of demonstrating it is harder. Ask the RP to provide the methodology used and the qualifications of the assessor. The assessor's competence is one of the key tests in court when a missing finding leads to harm."
          >
            <p>The 9 steps and where emergency lighting features:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Step 1 — Plan and prepare.</strong> Define scope, gather pre-existing
                information, identify the assessor and the RP. Confirm the boundary of the
                assessment (single tenancy, common parts, whole building).
              </li>
              <li>
                <strong>Step 2 — Gather information.</strong> Drawings, fire safety system records,
                previous FRA, incident log, training records, maintenance records. Includes the
                emergency lighting design records, commissioning certificate, logbook, last
                annual / 5-year test certificates.
              </li>
              <li>
                <strong>Step 3 — Identify the relevant persons.</strong> Employees, visitors,
                contractors, residents, neighbours. Specifically: young persons, persons with
                disabilities, sleeping occupants, persons with limited familiarity with the
                premises.
              </li>
              <li>
                <strong>Step 4 — Identify the fire hazards.</strong> Sources of ignition, fuel,
                oxygen. Dangerous substances (DSEAR overlap). Electrical infrastructure (BS 7671
                overlap).
              </li>
              <li>
                <strong>Step 5 — Evaluate the risk.</strong> Likelihood × consequence. Existing
                control measures considered.
              </li>
              <li>
                <strong>Step 6 — Assess the existing fire safety measures.</strong> Means of
                escape; means of detection and warning; firefighting; emergency lighting (BS 5266-1
                / BS EN 1838 compliance, condition, maintenance regime); signage; management
                arrangements; emergency plan; training; co-operation with other RPs.
                <em> Emergency lighting is checked here against the standards.</em>
              </li>
              <li>
                <strong>Step 7 — Action plan.</strong> Each shortfall identified at Step 6 becomes
                an action with priority, owner, target date, evidence requirement.
                <em> Emergency lighting actions sit here — illuminance shortfalls, missing 5-year
                photometric, missing FRA-design link, etc.</em>
              </li>
              <li>
                <strong>Step 8 — Record and communicate.</strong> The written record under Article
                9(6); information to employees under Article 9(7); information to other RPs in
                multi-occupancy under Article 22.
              </li>
              <li>
                <strong>Step 9 — Review.</strong> Annual baseline + change-driven. Re-assessment
                triggers.
              </li>
            </ul>
            <p>
              PAS 79-2:2020 follows the same 9-step structure adapted for housing. The principal
              adaptation is the treatment of relevant persons (residents, including children,
              older persons and disabled persons in their homes) and the longer evacuation
              assumptions in stay-put strategies for blocks of flats.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <Scenario
            title="The retail unit — sleeping risk introduced mid-lease"
            situation="A 3-storey city-centre retail unit has a 2024 PAS 79-1 FRA recording the building as ground-and-first retail with second-floor stockroom. The FRA records the EL provision as adequate to BS 5266-1 (1-hour duration, escape lighting on the staircase, anti-panic in the open shop floor). In 2026 the operator, with landlord consent, takes a 24-hour licence and starts overnight stocking with up to 2 staff sleeping in a converted second-floor room when emergency stock arrivals exceed the working day. No new FRA is commissioned. Six months later, an FRS audit identifies the change of use during a routine inspection."
            whatToDo="The change of use is a significant change under Article 9(3) — the FRA must be re-done. Sleeping risk fundamentally alters the EL profile: 3-hour duration is now appropriate (not 1-hour); the route from the sleeping room to the final exit must have continuous escape route illuminance to BS EN 1838 §4.2; anti-panic in the second-floor lobby may be required; refuge provision should be assessed for any mobility-impaired staff. Under PAS 79 Step 6, the existing EL is now non-compliant; under Step 7, the action plan requires upgrade. The FRA-design link under BS 5266-1:2025 §5 must be re-established. The FRS will likely serve an enforcement notice; an immediate prohibition notice is possible if sleeping continues without remediation."
            whyItMatters="Change of use is the most common trigger for FRA inadequacy in occupied premises. The original FRA was suitable for the original use; it is no longer suitable for the new use. The duty is on the RP to identify the change and re-assess — not on the assessor or the contractor. RPs frequently fail this step because the change is gradual or operational, not visible in physical building changes."
          />

          <SectionRule />

          <ContentEyebrow>Multi-occupancy + Article 22 co-operation</ContentEyebrow>

          <ConceptBlock
            title="Where the freeholder and the tenant meet — common parts emergency lighting"
            plainEnglish="In multi-let buildings, the RRO 2005 imposes co-operation duties between the multiple responsible persons. The freeholder (or their managing agent / RMC) is typically the RP for the common parts; each tenant is the RP for their demised area. Emergency lighting in common parts (stairs, lobbies, corridors, lift lobbies, refuse rooms, plant rooms, refuges, external escape routes) is the freeholder duty; emergency lighting within demised areas is the tenant duty. Article 22 requires each RP to take reasonable steps to co-operate with the others."
          >
            <p>How Article 22 works for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Article 22(1) — co-operation.</strong> Where two or more RPs share, or have
                duties in respect of, the same premises, each must co-operate with each other to
                the extent necessary to enable each to comply with their duties.
              </li>
              <li>
                <strong>Article 22(2) — co-ordination.</strong> Each RP must take reasonable steps
                to inform the others of the risks identified, and the measures taken in respect of
                them.
              </li>
              <li>
                <strong>Common-parts EL — typically freeholder RP.</strong> Stairs, lobbies, lift
                lobbies, plant rooms, refuse rooms, refuges, external escape routes outside any
                single demise. The freeholder commissions the FRA, the design, the commissioning,
                the maintenance.
              </li>
              <li>
                <strong>Demised-area EL — typically tenant RP.</strong> Inside each tenancy. The
                tenant commissions their own FRA, identifies the EL needs, and either has the
                landlord install or installs at their cost.
              </li>
              <li>
                <strong>Boundary at the demised-area door.</strong> The escape route from the
                demised-area door to the final exit is common parts (freeholder). The escape route
                inside the demised area is tenant. Tenants may rely on the freeholder's common-
                parts EL for the route from their door — but cannot test or change it without
                co-operation.
              </li>
              <li>
                <strong>Information-sharing duty.</strong> Tenants must inform the freeholder of
                EL issues found in their FRA that affect common parts; the freeholder must inform
                tenants of issues found in the common-parts FRA that affect their unit egress.
                Most leases now include explicit fire safety co-operation clauses to operationalise
                Article 22.
              </li>
              <li>
                <strong>Multi-occupancy declaration.</strong> Some FRS audit processes ask each
                multi-occupied building to nominate a lead RP for co-ordination — typically the
                freeholder. The lead RP holds the building-wide picture and acts as the FRS
                interface.
              </li>
            </ul>
            <p>
              Article 22 is most often a paper-thin duty in practice — co-operation in name, not in
              substance. FRS audits are increasingly testing it: asking tenants whether they have
              seen the common-parts FRA, and asking freeholders whether they have collated tenant
              FRAs. Building-wide co-ordination is the test.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RRO 2005 · Article 22 (Co-operation and co-ordination)"
            clause={
              <>
                Where two or more responsible persons share, or have duties in respect of, premises
                (whether on a temporary or a permanent basis), each such person must co-operate
                with the other responsible person concerned so far as is necessary to enable them
                to comply with the requirements and prohibitions imposed on them by or under this
                Order, take all reasonable steps to co-ordinate the measures they take to comply
                with the requirements and prohibitions imposed on them by or under this Order, and
                take all reasonable steps to inform the other responsible persons concerned of the
                risks to relevant persons arising out of or in connection with the conduct of the
                first-mentioned person's undertaking.
              </>
            }
            meaning="Three phrases earn close reading. 'Two or more responsible persons share, or have duties in respect of, premises' — multi-let, mixed-use, building-within-building cases. 'So far as is necessary to enable them to comply' — the duty is functional, not formal; it must actually enable compliance. 'Inform the other responsible persons of the risks' — proactive notification, not on-request only. Failure to co-operate is itself an offence under Article 32."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Treating the common parts FRA as the freeholder's private document"
            whatHappens="A freeholder of a 6-tenant office block commissions an annual common-parts FRA but does not share it with tenants. Three tenants raise queries about emergency lighting in the stairs after a power outage; the freeholder responds tenant-by-tenant. None of the tenants' own FRAs reference the common-parts findings. At an FRS audit triggered by a complaint, the inspector finds the common parts FRA flags illuminance issues in the second escape stair; none of the tenant FRAs do; no action plan exists at building level. The freeholder is in breach of Article 22 (failure to share); the tenants are in breach of Article 9 (FRA not suitable and sufficient because it ignores the common-parts risk to their evacuation). Enforcement notices to all RPs."
            doInstead="Operationalise Article 22. The common-parts FRA should be available to every tenant on commissioning; tenant FRAs should reference it; a building-wide co-ordination meeting should run at least annually. Lease clauses should require it; if they do not, the freeholder should issue a fire safety co-operation protocol. Building-wide action plans should be visible to all RPs. The FRS audit will test whether tenants have actually seen what they should have seen."
          />

          <SectionRule />

          <ContentEyebrow>Higher-Risk Buildings + Golden Thread</ContentEyebrow>

          <ConceptBlock
            title="Where the FRA meets the safety case"
            plainEnglish="The Building Safety Act 2022 created a new regulatory regime for the highest-risk residential buildings — those at least 18 m in height OR at least 7 storeys, with at least 2 residential units. The regime is run by the Building Safety Regulator (BSR), which sits within the HSE. It introduces the Accountable Person and Principal Accountable Person duty holders, the safety case obligation, the Golden Thread of digital information, the residents' engagement strategy, and the Mandatory Occurrence Reporting regime. The FRA does not disappear — it remains the RRO Article 9 duty — but it becomes one input into a much larger evidence base. Emergency lighting evidence flows through the FRA into the safety case and the Golden Thread."
          >
            <p>How HRB designation affects the FRA-to-EL pathway:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The FRA continues — Article 9 still applies.</strong> The HRB regime does
                not displace the RRO 2005. The Accountable Person is also (or appoints) the
                responsible person for the building. The Article 9 FRA is required.
              </li>
              <li>
                <strong>The safety case (BSA 2022 s.83-87).</strong> A documented case showing how
                building safety risks are identified, assessed, mitigated and managed throughout
                the building's life. The FRA is one input. Other inputs: structural assessment;
                services failure modes; resident engagement; maintenance regime; competent person
                arrangements; previous incidents.
              </li>
              <li>
                <strong>The Golden Thread (BSA 2022 + Building Regs).</strong> A digital record of
                the building, kept up to date throughout its life, accessible to the duty holders,
                the BSR and (in scope) residents. EL evidence within the Golden Thread: design
                drawings, photometric calculations, commissioning certificate, asset register,
                logbook, monthly / annual / 5-year test results, FRA references.
              </li>
              <li>
                <strong>Resident engagement strategy (BSA 2022 s.91).</strong> Residents must be
                engaged on building safety matters affecting them. EL relevance: notification of
                planned tests; communication of EL deficiencies and remediation; PEEP arrangements
                for individual residents.
              </li>
              <li>
                <strong>Mandatory Occurrence Reporting (MOR).</strong> The Accountable Person must
                report safety occurrences (e.g. failures of safety-critical systems including
                emergency lighting) to the BSR through the MOR regime.
              </li>
              <li>
                <strong>Gateway 2 / Gateway 3 (Building Regulations).</strong> Construction of an
                HRB cannot proceed without BSR approval at Gateway 2 (before construction) and
                cannot be occupied without Gateway 3 (before occupation) approval. EL design and
                installation evidence forms part of the Gateway submissions.
              </li>
            </ul>
            <p>
              For HRBs, the technical EL standards do not change — BS 5266-1:2025, BS EN 1838:2024,
              BS EN 50172:2024 still apply. What changes is the evidence regime. Records must be
              digital, accessible to the BSR, current and demonstrably linked to the safety case.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 · Section 83 (Safety case for occupied higher-risk buildings)"
            clause={
              <>
                The principal accountable person for an occupied higher-risk building must prepare
                a safety case report for the building. The report must include an assessment of
                the building safety risks for the building, and a description of the steps being
                taken to prevent the occurrence of the building safety risks and reduce their
                severity if they were to materialise. The principal accountable person must keep
                the safety case report under review and revise it as needed.
              </>
            }
            meaning="Three phrases earn close reading. 'Building safety risks' — defined in s.62 as the spread of fire and structural failure; emergency lighting is part of the controls against fire risk. 'Steps being taken' — present tense; the safety case is a living document. 'Keep under review' — continuous, not periodic; the FRA review under Article 9(3) feeds the safety case review."
          />

          <Scenario
            title="The 22-storey HRB — FRA findings into the safety case"
            situation="A 22-storey residential block (built 2009, registered as an HRB on the BSR register in 2024) has its 2025 PAS 79-2 FRA. The assessor identifies three EL deficiencies: (a) the second-escape stair on floors 12-22 has illuminance below 1 lx across sections of the full open width of the route (BS EN 1838:2024 §4.2); (b) the corridor wayfinding signs on floors 5-11 do not meet BS EN 1838:2024 sign-luminance requirements (degraded by age); (c) the external assembly point identified in the FRA is unlit at night. The Accountable Person asks how these go into the regulatory regime."
            whatToDo="All three findings flow into Article 9 significant findings, the FRA action plan, the safety case review, and the Golden Thread digital record. Specifically: (1) Update the FRA Step 7 action plan with three new actions, prioritised, owned, dated. (2) Notify residents under the engagement strategy of the findings and the remediation programme. (3) Update the safety case report under BSA 2022 s.83 — these are building safety risk findings affecting fire spread / evacuation. (4) Update the Golden Thread with the action items and, on remediation, the closure evidence (including the BS 5266-1:2025 photometric verification confirming compliance after fix). (5) Consider whether any finding meets the MOR threshold — typically only if a safety-critical occurrence has actually arisen, but a known active deficiency in a safety-critical system is borderline; check with the BSR. (6) Engage the freeholder if the building has a separate freeholder-AP under Article 22. (7) Programme the remediation contracts with a competent person under BS 5266-1:2025."
            whyItMatters="In an HRB, the FRA is not a stand-alone document. Findings have a regulatory life beyond the FRA — into the safety case, the Golden Thread, the engagement strategy, and potentially into MOR. The Accountable Person who treats the FRA as a paper exercise misses the integrated regime; the BSR audit will identify the gap quickly. Conversely, the AP who routes findings through all five regulatory channels demonstrates competent management — the BSR's primary test."
          />

          <CommonMistake
            title="Treating the safety case as a one-off submission, not a living document"
            whatHappens="An AP of a 30-storey HRB submits a safety case at registration (2024), then files it. The 2025 FRA identifies new EL findings; the AP updates the FRA but does not revise the safety case. The 2026 BSR audit finds the safety case dated 2024 with no record of the 2025 FRA findings. The AP is in breach of BSA 2022 s.83 (keep under review and revise). The BSR serves a notice; remediation is rushed."
            doInstead="Treat the safety case as the master document, refreshed at every FRA review and at every significant change. The FRA is one input — the Article 9 obligation; the safety case is the integrated picture. EL findings, structural assessments, services updates, resident engagement summaries, training records, occurrence logs all flow into the safety case. Set up a quarterly safety-case review with structured inputs from each evidence stream."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fire Safety (England) Regulations 2022 — Regs 4, 8, 9, 10 + SI 2025/797</ContentEyebrow>

          <ConceptBlock
            title="Secure information boxes, wayfinding signage, information to residents, fire doors, evacuation plans"
            plainEnglish="The Fire Safety (England) Regulations 2022 (SI 2022/547) are statutory regulations made under the Fire Safety Act 2021 — distinct instruments from the RRO 2005 but operating in the same regime. Several regulations are relevant for emergency lighting in HRBs and other multi-occupied residential buildings. Reg 4 requires a secure information box (premises information box / PIB) accessible to the FRS. Reg 8 requires wayfinding signage in HRB stairwells. Reg 9 requires fire safety instructions to residents (tied to the building's evacuation strategy). Reg 10 covers fire doors. SI 2022/547 itself contains NO standalone evacuation-plans regulation — standalone residential evacuation plans were introduced later by the Fire Safety (Residential Evacuation Plans) (England) Regulations 2025 (SI 2025/797). Emergency lighting must support all of these — the PIB, the signs, the resident instructions, the door route and the evacuation plans must remain visible and operable under emergency conditions."
          >
            <p>What Regs 4, 8, 9, 10 (SI 2022/547) and SI 2025/797 require:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 4 — secure information box (HRBs).</strong> The RP must install and
                maintain a secure information box (commonly called the premises information box,
                PIB) accessible to the FRS, containing the name and UK contact details of the RP,
                hard copies of the floor plans, and a single-page building plan identifying key
                fire safety features. EL interaction: the box itself should be locatable and
                operable under emergency conditions if accessed at night, and the FRS-search route
                to it must remain illuminated.
              </li>
              <li>
                <strong>Reg 8 — wayfinding signage (HRBs).</strong> The RP must install signage in
                every protected stairway, visible in low light or smoky conditions, identifying
                the floor number and the flat numbers on each floor. EL interaction:
                sign-luminance requirements under BS EN 1838:2024 §5 must be met; the FRA must
                verify illuminance at the signs throughout the protected stairway.
              </li>
              <li>
                <strong>Reg 9 — information to residents.</strong> The RP must provide each
                resident with fire safety instructions appropriate to the evacuation strategy of
                the building (stay-put, simultaneous evacuation, or phased), plus information on
                fire doors. The instructions must be in an accessible format. EL interaction:
                residents should know whether to expect emergency lighting on their escape route,
                what to do if it fails, and how the lighting supports the evacuation strategy.
              </li>
              <li>
                <strong>Reg 10 — fire doors.</strong> In buildings with two or more sets of
                domestic premises and over 11 m in height, the RP must conduct quarterly checks of
                fire doors in common parts and annual checks of flat entrance doors (so far as is
                reasonably practicable). EL interaction: the fire door inspection is undertaken
                under normal conditions, but the doors form part of the protected escape route
                that emergency lighting must illuminate during evacuation.
              </li>
              <li>
                <strong>SI 2025/797 — Fire Safety (Residential Evacuation Plans) (England)
                Regulations 2025.</strong> The standalone residential evacuation-plans regime,
                introduced after the original 2022 Regulations. The RP of a relevant residential
                building must produce a building evacuation plan, identify residents who would
                need assistance to evacuate (Person-Centred Fire Risk Assessments / Personal
                Emergency Evacuation Plans where applicable), share information with the FRS, and
                review the plans on change. EL interaction: every plan assumes the emergency
                lighting works on the routes the plan relies on; the FRA must verify it does.
              </li>
              <li>
                <strong>Sharing with the FRS — Reg 4(3), Reg 8(3) and SI 2025/797.</strong> The
                information box, the wayfinding signage strategy, and the evacuation plans (under
                SI 2025/797) must all be available to the FRS for inspection and operational
                planning. EL evidence supports each.
              </li>
              <li>
                <strong>Interaction with the BSA 2022 regime.</strong> For HRBs, the Regs 4, 8, 9
                and 10 obligations and the SI 2025/797 evacuation plans also flow into the safety
                case and the Golden Thread. The same evidence serves multiple regulatory channels.
              </li>
            </ul>
            <p>
              These regulations are post-Grenfell instruments responding directly to the Inquiry's
              findings on operational difficulties for residents and firefighters. Emergency
              lighting is a dependency for all of them — visible signs, accessible information
              boxes, readable resident instructions, working fire-door routes, and viable
              evacuation plans all assume the lighting works. The FRA must verify the assumption.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Significant findings + the action plan</ContentEyebrow>

          <ConceptBlock
            title="The operative paperwork — what the action plan must do"
            plainEnglish="The FRA is not the end of the duty. The significant findings recorded under Article 9(6) must be followed by action — and the action plan is the operative document. PAS 79 Step 7 sets out the structure: each significant finding becomes an action with a priority, an owner, a target date, and an evidence requirement for closure. For emergency lighting, common action items include illuminance shortfalls, missing 5-year photometric verifications, missing FRA-design link in the BS 5266-1:2025 record, expired batteries, deteriorated luminaires, and uplift to the new BS 5266-1:2025 external escape route requirement."
            onSite="The action plan is the document the FRS inspector reads first after the FRA. They check: are the actions specific? are they prioritised? are they assigned to a named owner? are the dates realistic? have completed actions been evidenced? An action plan with stale dates and no closure evidence is the worst position to be in — it evidences awareness of risk and inaction. Keep the action plan current, with closure evidence attached."
          >
            <p>What an action plan should contain for emergency lighting items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Specific finding.</strong> 'Stair B illuminance measured at 0.4 lx across
                sections of the full open width of the route on floors 3-7; below BS EN 1838:2024
                §4.2 1 lx minimum (full open width with edge exclusions)' — not 'EL inadequate'.
              </li>
              <li>
                <strong>Priority.</strong> Typically high / medium / low or numerical (P1-P4),
                tied to risk consequence. EL deficiencies on high-occupancy escape routes are
                usually P1; cosmetic issues P3-P4.
              </li>
              <li>
                <strong>Action.</strong> What will be done. 'Replace 12 fittings on stair B floors
                3-7 with LED equivalents to recover design illuminance; commission to BS 5266-1
                Annex F'.
              </li>
              <li>
                <strong>Owner.</strong> A named person — the RP, a competent person they have
                appointed, the maintenance contractor.
              </li>
              <li>
                <strong>Target date.</strong> Realistic — but tied to the priority. P1 actions
                typically within weeks; P2 within months; P3 within a year. Dates that drift are
                evidence of inadequate management.
              </li>
              <li>
                <strong>Evidence requirement.</strong> What must be produced to close the action.
                For EL: post-remediation photometric verification, updated logbook entry, updated
                design record, updated FRA reference.
              </li>
              <li>
                <strong>Closure record.</strong> Date of closure, evidence attached, assessor
                sign-off. The closed action stays in the action plan — it is part of the audit
                trail.
              </li>
              <li>
                <strong>Reopen on regression.</strong> If a closed action regresses (e.g. the
                replacement fittings degrade and illuminance falls again), the action reopens with
                a new date. Annual photometric checks and 5-year photometric verification under
                BS 5266-1:2025 are the empirical inputs that drive reopening.
              </li>
            </ul>
            <p>
              The action plan is the legal proof that significant findings have been acted on. A
              missing action plan, a stale action plan, or one with unevidenced closures is, in
              court, more damaging than a missing FRA — it evidences awareness without action.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Letting action plan dates drift without revising the priority"
            whatHappens="An action plan from a 2024 FRA flags an EL illuminance shortfall in a high-occupancy lobby as P2, target date 30 June 2024. By August 2025 the action is still open — the contractor was busy, the budget approval delayed, the building owner travelling. No revised date, no escalated priority, no risk-based interim mitigation. An FRS audit visits in September 2025; the inspector identifies the live action and the 14-month overrun. Enforcement notice; the public inquiry treatment of similar drift in the Grenfell Inquiry weighs against the RP. Defence becomes an evidential difficulty."
            doInstead="When an action overruns, the priority and the risk profile must be re-evaluated. Either the date is revised with a documented reason and (for higher-priority items) interim mitigations are put in place, or the priority is escalated. Drift without revision is the worst possible position. Set up a monthly action-plan review with the RP and the competent person; close-out evidence must be filed within agreed windows; overruns are flagged at the next review and either remedied or escalated."
          />

          <CommonMistake
            title="Recording a finding without recording the link to BS 5266-1:2025 §5"
            whatHappens="An FRA finds that an open-area workspace exceeds 60 m² and lacks anti-panic lighting. The finding is recorded; an action is set; the action is closed by installing one luminaire. No reference is made to BS EN 1838 §4.3 or the BS 5266-1:2025 design record. A subsequent re-FRA cannot tell whether the design intent was met — was the luminaire correctly placed? was the 0.5 lx achieved? are uniformity requirements met? Two years later, an audit identifies the finding as inadequately closed; the action reopens; remediation is repeated. Wasted cost, wasted time, evidence of inadequate competence."
            doInstead="Every EL action closure should reference the relevant BS 5266-1:2025 / BS EN 1838:2024 clause and produce the photometric evidence of compliance — not just a 'fixed' tick. The closure record should join the design-and-installation record; the design record updates on every modification. The FRA-design link under §5 is preserved at every action close-out."
          />

          <SectionRule />

          <ContentEyebrow>Review triggers</ContentEyebrow>

          <ConceptBlock
            title="When the FRA must be re-done — and what triggers re-design"
            plainEnglish="Article 9(3) is principle-based — the FRA must be reviewed regularly so as to keep it up to date and in particular if there is reason to suspect it is no longer valid or there has been a significant change. There is no statutory periodic-review interval in Article 9(3) itself. PAS 79 and most insurers expect annual review as a baseline. Specific triggers may demand re-assessment ahead of the annual cycle. For emergency lighting, BS 5266-1:2025 also imposes 5-year photometric verification — a parallel review cycle."
          >
            <p>Review triggers in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Annual baseline.</strong> Most assessors and insurers expect a routine
                annual review even where nothing significant has changed. Confirms the FRA remains
                current; identifies any creeping changes (occupancy growth, layout drift,
                unrecorded alterations).
              </li>
                <li>
                <strong>Change of use.</strong> Retail to mixed-use, office to residential, single
                tenant to multi-let, daytime use to 24-hour use. Each engages different escape
                profiles, different sleeping risks, different person profiles.
              </li>
              <li>
                <strong>Building alteration.</strong> Re-partitioning, extension, change of fire
                strategy, new openings, removal of fire compartmentation. Each may engage Building
                Regulations (material alteration) and re-engage Article 9 (significant change).
              </li>
              <li>
                <strong>Occupancy change.</strong> Rapid expansion of staff, addition of vulnerable
                groups (creche, nursery, care services), introduction of disabled employees or
                visitors needing PEEPs.
              </li>
              <li>
                <strong>Incident.</strong> Any near-miss, false alarm investigation, evacuation
                drill failure, EL failure event. Each is a trigger to review.
              </li>
              <li>
                <strong>Regulation or standard update.</strong> The transition from BS 5266-1:2016
                to BS 5266-1:2025 is itself a trigger; so was the Fire Safety Act 2021; so was the
                Building Safety Act 2022. RPs of relevant buildings should review on every
                significant statutory or standards change.
              </li>
              <li>
                <strong>Enforcement notice.</strong> An Article 30 enforcement notice or Article 31
                prohibition notice mandates remediation; the FRA must be reviewed to incorporate
                the remediation findings.
              </li>
              <li>
                <strong>BS 5266-1:2025 5-year photometric verification.</strong> The empirical
                check on whether the EL is delivering against design. A failure on the 5-year
                verification is a trigger to revisit the FRA — has the building changed in ways
                that affect the EL design assumptions?
              </li>
              <li>
                <strong>HRB safety case review.</strong> For HRBs, the safety case must be kept
                under review (BSA 2022 s.83). The FRA review feeds the safety case review;
                significant safety case findings feed back to the FRA.
              </li>
            </ul>
            <p>
              The standard rule of thumb: annual baseline + any of the above triggers → re-FRA. A
              5-year-old FRA in a building that has had multiple changes in that period is, on its
              face, no longer suitable and sufficient. The defence is only available where the
              building has genuinely not changed and the assessment has not been updated by virtue
              of the absence of change.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Putting it all together — the design-and-installation record</ContentEyebrow>

          <ConceptBlock
            title="The BS 5266-1:2025 design-and-installation record — what it must say"
            plainEnglish="The BS 5266-1:2025 design-and-installation record is the integrating document. It links the FRA outputs to the design provisions to the commissioning evidence to the maintenance regime. The 2025 revision strengthened the record requirements — pattern-book records are no longer accepted; a building-specific record showing the FRA-design linkage is required."
          >
            <p>What the record must contain:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FRA reference.</strong> Date, assessor, version, scope. Each significant
                FRA finding cross-referenced to its corresponding design provision.
              </li>
              <li>
                <strong>Design strategy.</strong> The overall approach (self-contained vs central
                battery; maintained vs non-maintained; addressable vs non-addressable; integrated
                vs stand-alone).
              </li>
              <li>
                <strong>Photometric calculations.</strong> For each escape route, anti-panic area,
                refuge, high-risk task area and external escape route — the calculation evidencing
                BS EN 1838:2024 minima are met (with margin).
              </li>
              <li>
                <strong>Layout drawings.</strong> Luminaire positions, types, identifications,
                circuits.
              </li>
              <li>
                <strong>Equipment schedule.</strong> Each luminaire by type, BS EN 60598-2-22
                certification, battery type and capacity, expected life.
              </li>
              <li>
                <strong>Circuit topology.</strong> Distribution, sub-circuits, monitoring,
                interaction with normal lighting (maintained vs non-maintained).
              </li>
              <li>
                <strong>Test regime.</strong> Monthly functional, annual full-duration, 5-year
                photometric. Method, schedule, owner.
              </li>
              <li>
                <strong>External escape route — NEW in 2025.</strong> Boundary of design extends
                to external assembly point. Photometric calculation and luminaire placement
                evidenced.
              </li>
              <li>
                <strong>Cause-and-effect interactions.</strong> Where EL is integrated with fire
                alarm cause-and-effect (BS 5839-1:2025), the document records the interactions.
              </li>
              <li>
                <strong>FRA-design map.</strong> A table listing each significant FRA finding
                against the design provision that responds to it. The most visible evidence of §5
                compliance.
              </li>
              <li>
                <strong>Commissioning record.</strong> Date, person, results. Results include
                in-situ illuminance measurements at sample points to verify against design.
              </li>
              <li>
                <strong>Logbook reference.</strong> Where the on-going test records will be
                kept; format; location; access arrangements.
              </li>
            </ul>
            <p>
              For HRBs, the design-and-installation record forms part of the Golden Thread and the
              safety case. For non-HRB buildings, it is the BS 5266-1:2025 record under the RRO
              regime. Either way, it is the document that must be produced first when an inspector
              asks to see how the EL was designed against the FRA.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Article 9 is the foundation — every other RRO duty (including Article 14 emergency lighting and Article 17 maintenance) depends on a suitable and sufficient FRA.',
              'BS 5266-1:2025 §5 — design must be derived from the FRA. The design-and-installation record must evidence the FRA-design linkage; a pattern-book design fails §5.',
              'BS EN 1838:2024 categories — escape route (1 lx minimum across the FULL OPEN WIDTH of the route with edge exclusions, superseding the 2013 centre-line + 50 % central-band wording), open-area anti-panic (0.5 lx in areas > 60 m², 40:1 max:min), standby, high-risk task (15 lx / 10 % of normal), refuge call-point (5 lx vertical). The FRA decides which apply.',
              'PAS 79-1:2020 (non-housing) / PAS 79-2:2020 (housing) — the standard 9-step methodology. Emergency lighting features at Step 6 (assessment of measures) and Step 7 (action plan).',
              'BS 5266-1:2025 NEW — the design boundary extends to the external place of ultimate safety. The route from the final exit door to the assembly point must be illuminated.',
              'Article 22 multi-occupancy co-operation — common-parts EL is the freeholder RP duty; demised-area EL is the tenant RP duty; co-ordination at the boundary is statutory.',
              'Fire Safety Act 2021 — RRO confirmed to cover external walls, balconies, flat entrance doors, common parts of buildings with ≥ 2 sets of domestic premises.',
              'Building Safety Act 2022 HRBs (≥ 18 m OR ≥ 7 storeys + ≥ 2 residential units) — Accountable Person, safety case, Golden Thread, BSR, MOR. EL evidence joins the safety case.',
              'Fire Safety (England) Regulations 2022 (SI 2022/547) — Reg 4 (secure information box / PIB), Reg 8 (wayfinding signage in HRB stairwells), Reg 9 (information to residents — evacuation strategy), Reg 10 (fire doors). Standalone residential evacuation plans came later under SI 2025/797. EL must support all of them.',
              'The action plan is the operative paperwork — significant findings + priorities + owners + dates + closure evidence. Drift without revision is the worst position to be in.',
              'Review triggers — annual baseline + change of use + alteration + occupancy change + incident + regulation update + enforcement + 5-year BS 5266-1 photometric. Stale FRAs fail Article 9(3).',
              'A known unremediated EL deficiency on the action plan, with no progress, is more damaging in court than no FRA at all — it evidences awareness of risk and inaction.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Does every building need a written fire risk assessment?',
                answer:
                  'Article 9(6) requires the significant findings to be recorded in writing where there are 5 or more employees, where a licence is in force in respect of the premises, or where an alterations notice has been served. In practice, almost all non-domestic premises trigger one of these — a written FRA is the operating norm. Even where the threshold is not technically met, a written FRA is the only practical way to evidence that the duty has been discharged. Verbal-only assessments are evidentially indefensible.',
              },
              {
                question: 'Who can carry out the fire risk assessment?',
                answer:
                  'The RP can do it themselves if competent, or appoint a competent person. Competence is judged against the complexity and risk of the building — for a small low-risk premises, the RP with training may be competent; for a multi-storey mixed-use building with sleeping risk, an external assessor with relevant qualifications (Member of the Institute of Fire Engineers; certification under one of the third-party certification schemes such as IFE Register of Risk Assessors, BAFE SP205, or NAFRAR) is the operating norm. The RP retains legal responsibility regardless of who does the assessment.',
              },
              {
                question: 'What is the difference between the FRA and the BS 5266-1 design-and-installation record?',
                answer:
                  'The FRA is the assessment of risk under RRO Article 9. It identifies what the emergency lighting needs to achieve. The BS 5266-1 design-and-installation record is the engineering response — it records how the installation provides for each FRA finding. The two are linked under BS 5266-1:2025 §5: the design record must evidence the linkage. Different documents, different authors (assessor vs designer), but the §5 link binds them.',
              },
              {
                question: 'Can a contractor rely on the existing FRA when quoting for emergency lighting works?',
                answer:
                  'Only if the FRA is current, suitable and sufficient, and addresses the works in scope. Where the FRA is silent on a point the works will affect, the contractor should ask the RP to update the FRA before designing or installing — or the design will fail BS 5266-1:2025 §5 (no FRA-design link) and the contractor risks being a co-defendant in any subsequent enforcement action. A contractor who quotes against an outdated or insufficient FRA inherits part of the compliance risk.',
              },
              {
                question: 'A small office has 4 employees. Does it need a written FRA?',
                answer:
                  'Strictly under Article 9(6), no — the 5-employee threshold is not met (and assuming no licence and no alterations notice). But: (a) most insurers require a written FRA regardless of employee number; (b) any prosecution defence will be evidentially harder without one; (c) a written FRA is cheap and quick for a small office. The right answer is almost always: do one anyway. The cost of a written FRA is far below the cost of defending a prosecution without one.',
              },
              {
                question: 'How does the BS 5266-1:2025 5-year photometric verification interact with the FRA review?',
                answer:
                  'They are parallel review cycles. The FRA reviews under Article 9(3) keep the assessment current; the BS 5266-1:2025 5-year photometric verification provides empirical evidence of EL performance against design. A failure on the photometric verification is a trigger to revisit the FRA (has the building changed?), the design (is the design still appropriate?), and the maintenance regime (are the monthly / annual tests catching the issues?). The two reviews should be co-ordinated — most operators run them in the same 5-year cycle to streamline procurement.',
              },
              {
                question: 'In a multi-let building, who pays for emergency lighting fixes in the common parts?',
                answer:
                  'The freeholder, typically through the service charge. The freeholder is the common-parts RP; the freeholder commissions the FRA, the design, the remediation. The cost is recovered from leaseholders / tenants through the service charge under the lease — subject to s.20 consultation for major works in residential leasehold. The fact that costs flow through the service charge does not displace the freeholder RP duty; legal responsibility remains with the freeholder.',
              },
              {
                question: 'What happens if the FRA identifies a need that cannot be met because of building constraints (e.g. a listed building)?',
                answer:
                  'The FRA must record the constraint and the engineered response. BS 5266-1:2025 §5 expressly contemplates FRA-driven design exceptions where building constraints prevent a default solution — the design records the constraint, the alternative solution, and the residual risk. Listed building consent overlay is common in heritage and historic buildings; the FRA-design record should reference the heritage decision and demonstrate that the residual fire safety case remains acceptable. Where it does not, change of use or building modification may be unavoidable.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Emergency lighting in fire risk assessments — Module 6.3"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate(
                  '/electrician/upskilling/emergency-lighting-module-6-section-2'
                )
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Integration with fire safety regs
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(
                  '/electrician/upskilling/emergency-lighting-module-6-section-4'
                )
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Documentation for audits
              </div>
            </button>
          </div>

          <div className="hidden">
            <ClipboardCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section3;
