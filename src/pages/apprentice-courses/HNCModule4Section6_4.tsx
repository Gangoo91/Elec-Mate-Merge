/**
 * Module 4 · Section 6 · Subsection 4 — Design Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Calculation report structure (cover sheet, design basis, assumptions, results), checking
 *   levels (self / peer / senior / independent), BS 7671 mandatory calculations (Iz, Vd, Ipf,
 *   Zs, k²S²) and design review / approval authority by complexity tier.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Design Calculations - HNC Module 4 Section 6.4';
const DESCRIPTION =
  'Master design calculation documentation for building services: calculation reports, verification procedures, checking methods, design reviews and approval processes.';

const quickCheckQuestions = [
  {
    id: 'calc-purpose',
    question: 'What is the primary purpose of documented design calculations?',
    options: [
      'Zero emissions and quieter operation, suitable for indoor use',
      'To distinguish between a zero reading and a fault condition',
      'Match the phasing of building occupation',
      'To demonstrate compliance and enable verification',
    ],
    correctIndex: 3,
    explanation:
      'Documented calculations demonstrate that designs meet regulatory and performance requirements, enabling independent verification and providing an audit trail.',
  },
  {
    id: 'verification',
    question: "What is 'verification' in the context of design calculations?",
    options: [
      'A maximum of 150 mm or 4 times the board thickness, whichever is less',
      'The smaller of the two CPCs connected to those exposed-conductive-parts',
      'Confirming calculations are correct through independent review',
      'Fixed losses become a larger proportion of reduced output',
    ],
    correctIndex: 2,
    explanation:
      'Verification involves independent checking of calculations to confirm they are technically correct, use appropriate methods and assumptions, and meet the design requirements.',
  },
  {
    id: 'assumptions',
    question: 'Why must calculation assumptions be documented?',
    options: [
      'Clearly identify amendments using project-specific text',
      'Cable temperature - cables become brittle below rated temperature',
      'As the first step before any electrical testing',
      'To enable review and identify if conditions change',
    ],
    correctIndex: 3,
    explanation:
      'Documented assumptions enable reviewers to understand the calculation basis and identify if site conditions differ from those assumed, requiring design review.',
  },
  {
    id: 'approval',
    question: 'Who typically approves design calculations in a building services project?',
    options: [
      'To verify systems perform as designed',
      'All incidents, near misses and safety observations',
      'A competent engineer at appropriate level',
      'Use work equipment or other measures to prevent falls',
    ],
    correctIndex: 2,
    explanation:
      'Design calculations should be approved by a competent engineer with appropriate experience and authority level for the complexity and risk of the design.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What should be included in a calculation report cover sheet?',
    options: [
      'In steady flow, an increase in velocity occurs simultaneously with a decrease in pressure or potential energy',
      'Project details, calculation reference, revision status, prepared/checked/approved names and dates',
      'To cooperate with their employer\\\\\\\'s safety measures and use PPE and RPE provided correctly',
      'ISO 50001 focuses on energy while ISO 14001 covers broader environmental management, but they share common structure',
    ],
    correctAnswer: 1,
    explanation:
      'Cover sheets provide essential identification: project, calc reference, revision, status, and the names and dates of those who prepared, checked and approved the calculation.',
  },
  {
    id: 2,
    question: "What is the difference between 'checking' and 'verification'?",
    options: [
      'For high-risk work, especially on HV systems or in industrial environments',
      'Reported the damaged probes and got compliant replacements',
      'Checking is arithmetic review; verification confirms methodology and compliance',
      'For easy identification, maintenance, and troubleshooting',
    ],
    correctAnswer: 2,
    explanation:
      'Checking typically focuses on arithmetic accuracy, while verification is broader - confirming appropriate methodology, standards application, and that the design meets requirements.',
  },
  {
    id: 3,
    question: 'Which calculations are mandatory for BS 7671 compliance?',
    options: [
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'A competent person with knowledge of the plant and authority to issue permits',
      'To ensure accurate horizontal and vertical alignment over long distances',
      'Prospective fault current, earth fault loop impedance, cable sizing, voltage drop',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires calculations for prospective fault current, earth fault loop impedance (Zs), cable sizing (current capacity), and voltage drop to demonstrate compliance.',
  },
  {
    id: 4,
    question: 'What should happen when design input data changes?',
    options: [
      'Review and revise affected calculations, then re-approve',
      'Provide evidence of ongoing professional development',
      'Fall of potential method using test electrodes',
      'Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan',
    ],
    correctAnswer: 0,
    explanation:
      'Changed input data (load changes, route changes, etc.) requires affected calculations to be reviewed, revised if necessary, and re-approved through the normal approval process.',
  },
  {
    id: 5,
    question: 'What software is commonly used for electrical design calculations?',
    options: [
      'The fibre core being off-centre from the cladding',
      'Amtech, Trimble, DIALux, spreadsheet templates',
      'The type of electrical system the equipment is rated for',
      'One socket showing half the expected value',
    ],
    correctAnswer: 1,
    explanation:
      'Specialised software like Amtech (cable sizing), Trimble (cable sizing), DIALux/Relux (lighting), and validated spreadsheets are commonly used, with appropriate verification.',
  },
  {
    id: 6,
    question: 'How should calculation software outputs be documented?',
    options: [
      'The weight of the load and, if the centre of gravity is not central, the location of the heaviest side',
      'Poor connections, oxidation, incorrect termination, or mechanical damage',
      'Print outputs with input data visible, version noted, and include in calc package',
      'The fraction of airborne particles that is inhaled through the nose and mouth during breathing',
    ],
    correctAnswer: 2,
    explanation:
      'Software outputs should be printed/exported with all input data visible, software version noted, and included in the calculation package for complete traceability.',
  },
  {
    id: 7,
    question: "What is 'design validation' as opposed to verification?",
    options: [
      'Hydraulic benders or specialised forming equipment',
      'Lower conductivity and connection issues',
      'Regularly, after incidents, when changes occur',
      'Confirming the design works as intended in practice',
    ],
    correctAnswer: 3,
    explanation:
      'Validation confirms that the completed installation performs as designed - typically through testing and commissioning. Verification is the design stage review process.',
  },
  {
    id: 8,
    question: 'At what project stage should calculations be complete?',
    options: [
      'Before construction information is issued',
      'To ensure switches operate only on line conductor',
      'Nonviolent Communication (NVC) in practice',
      'Finding voltage across individual components',
    ],
    correctAnswer: 0,
    explanation:
      'Calculations should be complete and approved before issuing construction information. This ensures designs are verified before installation begins.',
  },
  {
    id: 9,
    question: 'What calculation documentation is typically required for O&M manuals?',
    options: [
      'Linking physical I/O signals to software representations',
      'Key design calculations, assumptions, and any as-built revisions',
      'Possible intermittent fault or deteriorating insulation',
      'Automatic scheduling based on time of day and occupancy',
    ],
    correctAnswer: 1,
    explanation:
      'O&M manuals typically include key design calculations showing system capacity, major assumptions, and any variations from original design reflecting as-built conditions.',
  },
  {
    id: 10,
    question: 'How should calculation errors discovered during checking be handled?',
    options: [
      'All earthing and bonding conductors to the means of earthing',
      'Joints and connections must be properly made to be mechanically and electrically sound',
      'Document the error, correct the calculation, re-check and update revision',
      'Use fire resistant cables and follow BS 5839 requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Errors should be documented (for learning and audit), corrected, re-checked, and the calculation revision updated. This maintains the integrity of the quality system.',
  },
];

const faqs = [
  {
    question: 'What level of calculation detail is needed?',
    answer:
      'Sufficient detail for a competent engineer to understand and verify the work without access to the original designer. Include: input data sources, assumptions, calculation method, standards references, and clear conclusions. Over-complex calculations should be simplified where possible.',
  },
  {
    question: 'Should I use calculation software or manual methods?',
    answer:
      'Both are acceptable if properly documented. Software is faster and reduces arithmetic errors, but must be validated. Manual calculations may be preferred for simple cases or where software validation is uncertain. Many engineers use software with manual verification checks.',
  },
  {
    question: 'How do I handle calculations inherited from another designer?',
    answer:
      "Review the calculations for competence and accuracy. If satisfactory, document your review and acceptance. If deficient, either request corrections from the original designer or revise/replace them yourself. Never accept responsibility for calculations you haven't verified.",
  },
  {
    question: 'What is a Category 3 check?',
    answer:
      'In some engineering frameworks (e.g., rail), Category 3 is an independent design check by a party not involved in the original design. Building services typically uses similar concepts with Design Review (internal) and Independent Design Check (external) terminology.',
  },
  {
    question: 'How long should calculation records be retained?',
    answer:
      'As-built calculations should be retained for the life of the installation, ideally 25+ years for building services. They may be needed for future alterations, incident investigations, or when questions arise about original design intent.',
  },
];

const HNCModule4Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 4"
            title="Design Calculations"
            description="Documenting, verifying and approving engineering calculations for building services design."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Structure calculation reports for clarity and traceability',
              'Document assumptions and input data sources',
              'Apply verification and checking procedures',
              'Understand design review and approval processes',
              'Manage calculation revisions and change control',
              'Prepare calculations for project handover',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Design calculations cover load, voltage drop, fault level (PSCC, PEFC), earth fault loop impedance (Zs), disconnection time, RCD coordination and discrimination/selectivity.',
              'Cite sources: BS 7671 tables (Table 4D, Table 41.x, Table 41.5, Appendix 4), DNO PFC letter, manufacturer time-current curves, ambient/grouping/insulation factors.',
              'Reg 411.5.3 gives the RCD fault-protection equation: Ra × IΔn ≤ 50 V — the figure your TT installation Zs / Ra calculation must satisfy.',
              'Sign-off pattern: prepared / checked / approved with three engineers, three dates, three signatures. The legal record at handover.',
              'Software (Amtech, Trimble, ETAP) accelerates the work — but a hand sense-check at the end of every calc set is what catches the input error that ruins a design.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3"
            clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V where: Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms); IΔn is the rated residual operating current of the RCD. The requirements of this regulation are met if the earth fault loop impedance of the circuit protected by the RCD meets the requirements of Table 41.5."
            meaning={
              <>
                Reg 411.5.3 is the headline equation for any TT or RCD-protected design
                calculation: Ra × IΔn ≤ 50 V. With a 30 mA RCD, that gives Ra ≤ 1,667 Ω — easily
                achieved on most TT systems. With a 100 mA RCD, Ra ≤ 500 Ω. The HNC designer
                shows this calc explicitly in the design pack with the assumed Ra (electrode
                resistance + CPC), the RCD IΔn, and the verification against Table 41.5 Zs at
                <strong> 1×IΔn</strong> (per A4:2026, NOT 5×IΔn as previous editions read).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.5.3."
          />

          <SectionRule />

          <ConceptBlock title="Calculation Report Structure">
            <p>
              Well-structured calculation reports enable efficient review, provide clear audit
              trails, and support future reference. A consistent format across projects improves
              quality and reduces errors.
            </p>
            <p>
              <strong>Standard calculation report elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover sheet:</strong> Project, reference, revision, signatures
              </li>
              <li>
                <strong>Contents:</strong> List of calculations included
              </li>
              <li>
                <strong>Introduction:</strong> Scope and purpose
              </li>
              <li>
                <strong>Design basis:</strong> Standards, codes, criteria
              </li>
              <li>
                <strong>Input data:</strong> Parameters and sources
              </li>
              <li>
                <strong>Assumptions:</strong> Items assumed for calculation
              </li>
              <li>
                <strong>Calculations:</strong> Detailed working
              </li>
              <li>
                <strong>Results summary:</strong> Key findings and compliance
              </li>
              <li>
                <strong>References:</strong> Standards, drawings, data sources
              </li>
            </ul>
            <p>
              <strong>Cover sheet information (field / content):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project — name and number</li>
              <li>Calc reference — e.g., 12345-E-CALC-001</li>
              <li>Revision — Rev A, B, C... with date</li>
              <li>Prepared by — name, signature, date</li>
              <li>Checked by — name, signature, date</li>
              <li>Approved by — name, signature, date</li>
              <li>Status — Preliminary / For Construction / As-built</li>
            </ul>
            <p>
              <strong>Key point:</strong> Every calculation page should be identifiable with
              project, reference and revision even when separated from the cover.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Verification and Checking Procedures">
            <p>
              Verification ensures calculations are technically sound and appropriate for purpose. A
              systematic checking process catches errors before they reach site, preventing costly
              remediation and potential safety issues.
            </p>
            <p>
              <strong>Checking levels:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Self-check:</strong> Designer reviews own work before submission
              </li>
              <li>
                <strong>Peer check:</strong> Colleague at similar level reviews
              </li>
              <li>
                <strong>Senior review:</strong> Experienced engineer verifies approach
              </li>
              <li>
                <strong>Independent check:</strong> External party for critical items
              </li>
            </ul>
            <p>
              <strong>Arithmetic check:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Numbers correct from input data</li>
              <li>Formulas applied correctly</li>
              <li>Units consistent throughout</li>
              <li>Results reasonable (sense check)</li>
            </ul>
            <p>
              <strong>Technical verification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Appropriate method selected</li>
              <li>Correct standards applied</li>
              <li>Assumptions valid and documented</li>
              <li>Conclusions supported by results</li>
            </ul>
            <p>
              <strong>Checking scope by complexity (complexity / example / check level):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple — final circuit sizing — self + peer</li>
              <li>Standard — sub-main sizing, lighting — peer + senior review</li>
              <li>Complex — fault calculations, discrimination — full technical verification</li>
              <li>Critical — HV design, specialist systems — independent external check</li>
            </ul>
            <p>
              <strong>Best practice:</strong> The checker should be independent from the original
              calculation — not simply repeating the same method.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Design Review and Approval">
            <p>
              Design reviews provide structured opportunities to assess calculations and designs
              against requirements. The approval process confirms the design is fit for purpose
              before information is issued for construction.
            </p>
            <p>
              <strong>Design review stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Concept review:</strong> Validate approach and methodology
              </li>
              <li>
                <strong>Detailed design review:</strong> Check calculations against requirements
              </li>
              <li>
                <strong>Pre-issue review:</strong> Final check before construction issue
              </li>
              <li>
                <strong>As-built review:</strong> Verify changes during construction
              </li>
            </ul>
            <p>
              <strong>Review meeting agenda:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm design basis and requirements</li>
              <li>Review calculations against specification</li>
              <li>Check coordination with other disciplines</li>
              <li>Identify outstanding items and actions</li>
              <li>Agree approval status and next steps</li>
            </ul>
            <p>
              <strong>Approval authority matrix (design type / typical approver):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard circuits — Project Engineer</li>
              <li>Distribution systems — Senior Engineer</li>
              <li>HV/specialist systems — Principal Engineer/Director</li>
              <li>Safety-critical — Independent Certifier</li>
            </ul>
            <p>
              <strong>Important:</strong> Approvers take responsibility for the design — they must
              have appropriate competence and authority.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Calculation Types">
            <p>
              Building services electrical design requires specific calculation types to demonstrate
              compliance with BS 7671 and other standards. Each calculation type has defined
              methodology and acceptance criteria.
            </p>
            <p>
              <strong>BS 7671 required calculations (calculation / purpose / key criteria):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable sizing (Iz) — current capacity — Iz ≥ In ≥ Ib</li>
              <li>Voltage drop — supply quality — ≤3% lighting, ≤5% power</li>
              <li>Fault current (Ipf) — device breaking capacity — device Icn ≥ Ipf</li>
              <li>Earth fault loop (Zs) — ADS operation — Zs ≤ Zs max (Table 41.2-41.4)</li>
              <li>Adiabatic (k²S²) — conductor thermal limit — k²S² ≥ I²t</li>
            </ul>
            <p>
              <strong>Lighting calculations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Illuminance (lux levels)</li>
              <li>Uniformity ratio</li>
              <li>Glare rating (UGR)</li>
              <li>Emergency lighting coverage</li>
              <li>Energy efficiency (LENI)</li>
            </ul>
            <p>
              <strong>Load assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Connected load summation</li>
              <li>Diversity factors applied</li>
              <li>Maximum demand calculation</li>
              <li>Power factor consideration</li>
              <li>Future growth allowance</li>
            </ul>
            <p>
              <strong>Documentation:</strong> All calculations must clearly state the acceptance
              criteria and demonstrate compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Documenting assumptions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>State assumptions clearly at the start of calculations</li>
              <li>Reference sources for assumed values</li>
              <li>Identify critical assumptions affecting design decisions</li>
              <li>Flag assumptions requiring site verification</li>
            </ul>
            <p>
              <strong>Software calculation records:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record software name and version</li>
              <li>Include all input data in outputs</li>
              <li>Print/export complete calculation set</li>
              <li>Verify software is validated for purpose</li>
            </ul>
            <p>
              <strong>Calculation process — quick reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Define scope and basis</li>
              <li>2. Document assumptions</li>
              <li>3. Perform calculations</li>
              <li>4. Check and verify</li>
              <li>5. Review and approve</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671</strong> — wiring regulations
              </li>
              <li>
                <strong>BS EN 12464-1</strong> — lighting
              </li>
              <li>
                <strong>BS 5266</strong> — emergency lighting
              </li>
              <li>
                <strong>BS EN 61439</strong> — switchgear
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Missing assumptions</strong> — leaving reviewers guessing the basis
                </li>
                <li>
                  <strong>Unsigned calculations</strong> — no accountability or audit trail
                </li>
                <li>
                  <strong>Outdated inputs</strong> — using superseded load data or routes
                </li>
                <li>
                  <strong>Over-reliance on software</strong> — no manual sense-checking
                </li>
              </ul>
            }
            doInstead="State all assumptions and their sources at the front of the calculation, sign and date prepared / checked / approved boxes, refresh input data when loads or routes change, and add a manual sense-check (order-of-magnitude) for every software output."
          />

          <SectionRule />

          <Scenario
            title="Sub-main and final-circuit calc pack — the design review meeting"
            situation={
              <>
                You’re presenting the design calculation pack at the Stage 4 internal review for a
                light-industrial unit. Sub-main is 70 mm² SWA copper, 60 m route from MSB to a TT
                outbuilding fed by a separate earth electrode. 100 A 4-pole MCCB with a 100 mA
                S-type RCD upstream of the outbuilding DB. Reviewer asks for the Reg 411.5.3
                evidence.
              </>
            }
            whatToDo={
              <>
                Open the calc pack. Show the inputs: DNO PFC letter (16 kA at the cut-out),
                ambient 30 °C, grouping factor 1.0, insulation 90 °C XLPE. Walk the reviewer
                through: (1) load + diversity → 78 A design current; (2) Table 4D4A current
                rating reference for 70 mm² SWA → 165 A method E single-circuit; (3) Vdrop check
                — 60 m × 78 A × mV/A/m from Table 4Y → &lt; 5 % at the DB; (4) Zs at the DB,
                including the line and CPC contributions. (5) For the TT outbuilding: Ra of the
                local electrode 80 Ω (rod + CPC), 100 mA RCD: Ra × IΔn = 80 × 0.1 = 8 V ≤ 50 V
                → compliant. Then verify Zs at 1× IΔn against Table 41.5 (per A4:2026 — NOT
                5× IΔn). Document all four checks, the source of each input, and the prepared/
                checked/approved signatures.
              </>
            }
            whyItMatters={
              <>
                A reviewer who can’t trace your inputs and verify the equation will reject the
                calc — and rightly so. The Reg 411.5.3 evidence is the load-bearing line of any
                TT design calculation; everything else is supporting cast.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Calculation report structure: scope, inputs (with sources), assumptions, method, results, conclusions, signatures.',
              'Cite BS 7671 tables explicitly — Table 4D for cable rating, Table 41.x for Zs, Table 41.5 for RCD-protected Zs.',
              'A4:2026 currency: B32 max Zs = 1.37 Ω at 230 V (Table 41.3); RCD verification at 1× IΔn (NOT 5× IΔn).',
              'Reg 411.5.3 gives the TT/RCD design equation: Ra × IΔn ≤ 50 V — explicit on every TT calc.',
              'Reg 421.1.7 (A4:2026) recommends AFDDs; document where you’ve applied or omitted them and why.',
              'Sign-off: prepared / checked / approved, three engineers, three dates, three signatures.',
              'Software (Amtech, Trimble, ETAP) for speed; hand sense-check for catching the input error.',
              'Revise calculations alongside the drawings they support — never let calc pack and drawings drift apart.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Schedules and data sheets
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                CDM design risk register
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_4;
