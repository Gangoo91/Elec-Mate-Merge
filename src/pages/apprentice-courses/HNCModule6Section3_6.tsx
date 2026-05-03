/**
 * Module 6 · Section 3 · Subsection 6 — BREEAM Evidence and Certification
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Documentation requirements, design stage vs post-construction evidence, assessor verification, and achieving certification
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'BREEAM Evidence and Certification - HNC Module 6 Section 3.6';
const DESCRIPTION =
  'Master BREEAM evidence requirements and certification processes: documentation standards, design stage vs post-construction evidence, assessor verification, achieving target ratings, and certification timeline.';

const quickCheckQuestions = [
  {
    id: 'evidence-categories',
    question: 'What are the two main stages of BREEAM evidence submission?',
    options: [
      'Preliminary and Final',
      'Design Stage and Post-Construction Stage',
      'Planning and Building Control',
      'Pre-assessment and Assessment',
    ],
    correctIndex: 1,
    explanation:
      'BREEAM assessments have two main evidence submission stages: Design Stage (DS) and Post-Construction Stage (PCS). Design Stage confirms credits based on design intent, while Post-Construction Stage verifies actual implementation.',
  },
  {
    id: 'design-stage-evidence',
    question: 'What is the primary purpose of Design Stage evidence?',
    options: [
      'To obtain building control approval',
      'To demonstrate design intent and specification compliance',
      'To satisfy planning requirements',
      'To calculate energy costs',
    ],
    correctIndex: 1,
    explanation:
      "Design Stage evidence demonstrates that the design intent, specifications, and contractual requirements will achieve the targeted BREEAM credits. It confirms the design team's commitment to achieving specific performance levels.",
  },
  {
    id: 'pcs-evidence',
    question: 'Post-Construction Stage evidence must demonstrate:',
    options: [
      'Design calculations only',
      'Planning compliance only',
      'That design commitments have been built as specified',
      'Future maintenance plans',
    ],
    correctIndex: 2,
    explanation:
      'Post-Construction Stage evidence must demonstrate that the design commitments made at Design Stage have actually been implemented and built as specified. This includes as-built drawings, commissioning records, and installation verification.',
  },
  {
    id: 'assessor-role',
    question: "What is the BREEAM assessor's primary responsibility?",
    options: [
      'Designing the building systems',
      'Independently verifying evidence and awarding credits',
      'Obtaining planning permission',
      'Managing the construction contract',
    ],
    correctIndex: 1,
    explanation:
      'The licensed BREEAM assessor independently reviews submitted evidence against BREEAM criteria, verifies compliance, and awards credits accordingly. They do not design systems but verify that evidence supports claimed credits.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which document type provides the primary evidence for lighting design credits at Design Stage?',
    options: [
      'Building control approval',
      'Lighting design specification with lux levels and controls strategy',
      'Equipment delivery notes',
      "Contractor's programme",
    ],
    correctAnswer: 1,
    explanation:
      'Lighting design specifications detailing target lux levels, uniformity ratios, glare control, and lighting control strategies provide primary Design Stage evidence. These demonstrate compliance with Hea 01 Visual Comfort requirements.',
  },
  {
    id: 2,
    question:
      'What evidence is required to demonstrate Energy Sub-metering (Ene 02) compliance at Post-Construction Stage?',
    options: [
      'Design drawings only',
      'Equipment catalogues',
      'As-built drawings, commissioning records, and meter schedule',
      'Planning application',
    ],
    correctAnswer: 2,
    explanation:
      'Post-Construction Stage evidence for sub-metering requires as-built drawings showing installed meter locations, commissioning records proving functionality, and a meter schedule confirming coverage of all substantial energy uses.',
  },
  {
    id: 3,
    question:
      "A BREEAM credit requires 'Confirmation from a Suitably Qualified Person'. What does this typically involve?",
    options: [
      'A verbal confirmation',
      'A signed letter or report from a professional with relevant expertise',
      'An email from the contractor',
      "A planning officer's approval",
    ],
    correctAnswer: 1,
    explanation:
      'Confirmation from a Suitably Qualified Person requires a formal signed letter or report from a professional with demonstrable expertise in the relevant field (e.g., chartered engineer, registered specialist) confirming compliance with specific criteria.',
  },
  {
    id: 4,
    question: 'When must Design Stage assessment be completed?',
    options: [
      'After practical completion',
      'Before construction begins, based on developed design',
      'During demolition',
      'After building occupation',
    ],
    correctAnswer: 1,
    explanation:
      'Design Stage assessment should be completed before construction begins, typically at RIBA Stage 4 (Technical Design). This ensures design intent is locked in and contractually specified before work starts on site.',
  },
  {
    id: 5,
    question: 'Which of these is NOT acceptable as primary evidence for BREEAM assessment?',
    options: [
      'Signed specifications',
      'Detailed design drawings',
      'Verbal commitments from the design team',
      'Commissioning certificates',
    ],
    correctAnswer: 2,
    explanation:
      'Verbal commitments are not acceptable as BREEAM evidence. All evidence must be documented in written form - specifications, drawings, certificates, reports, or formal correspondence that can be verified and audited.',
  },
  {
    id: 6,
    question: 'What is a Schedule of Evidence in BREEAM assessment?',
    options: [
      'The project construction programme',
      'A tracker linking each credit to required evidence documents',
      "The building's energy certificate",
      "The assessor's fee proposal",
    ],
    correctAnswer: 1,
    explanation:
      'A Schedule of Evidence (Evidence Tracker) is a document linking each targeted BREEAM credit to the specific evidence documents required, responsible parties, and submission status. It ensures systematic evidence collection.',
  },
  {
    id: 7,
    question: 'For Wat 01 Water Consumption credits, which calculation tool must be used?',
    options: [
      'SAP calculation',
      'BREEAM Wat 01 Calculator',
      'Building Regulations Part G calculator',
      'SBEM model',
    ],
    correctAnswer: 1,
    explanation:
      "The BREEAM Wat 01 Calculator is the mandatory tool for calculating water consumption credits. It uses fixture specifications and flow rates to determine the building's water efficiency and corresponding credit achievement.",
  },
  {
    id: 8,
    question:
      'What happens if Post-Construction Stage evidence shows that a Design Stage credit cannot be achieved?',
    options: [
      'The assessment fails completely',
      'The credit is withdrawn and final rating may be affected',
      'Design Stage certificate is revoked',
      'No action is required',
    ],
    correctAnswer: 1,
    explanation:
      'If Post-Construction evidence shows a Design Stage credit cannot be achieved (e.g., system not installed as specified), the credit is withdrawn from the final assessment. This may affect the overall rating if insufficient credits remain.',
  },
  {
    id: 9,
    question:
      'Which professional typically provides evidence for Hea 02 Indoor Air Quality credits?',
    options: [
      'Quantity surveyor',
      'Building services engineer or ventilation specialist',
      'Structural engineer',
      'Planning consultant',
    ],
    correctAnswer: 1,
    explanation:
      'Building services engineers or ventilation specialists provide evidence for Indoor Air Quality credits, including ventilation design calculations, fresh air rates, CO2 monitoring strategies, and material specifications for low-VOC emissions.',
  },
  {
    id: 10,
    question:
      'A client wants to achieve BREEAM Excellent. At what percentage of available credits is this typically achieved?',
    options: ['55%', '70%', '85%', '95%'],
    correctAnswer: 1,
    explanation:
      'BREEAM Excellent rating typically requires achieving 70% or more of available credits. The exact threshold varies slightly by scheme version and building type, but 70% is the standard benchmark for Excellent.',
  },
  {
    id: 11,
    question: 'What is the purpose of a BREEAM Pre-Assessment?',
    options: [
      'To submit final evidence',
      'To identify achievable credits and evidence requirements early in design',
      'To obtain the final certificate',
      'To verify construction quality',
    ],
    correctAnswer: 1,
    explanation:
      'A BREEAM Pre-Assessment is conducted early in design (RIBA Stage 2-3) to identify which credits are achievable, their cost implications, and evidence requirements. This allows design decisions to be made while changes are still economical.',
  },
  {
    id: 12,
    question: 'Site photographs as Post-Construction evidence should include:',
    options: [
      'Marketing images only',
      'Clear images of installed systems with reference to specifications and dates',
      'Aerial photographs of the site',
      'Photos of the design team',
    ],
    correctAnswer: 1,
    explanation:
      'Site photographs for BREEAM evidence should clearly show installed systems, include references to relevant specifications or drawing details, be dated, and demonstrate that the photographed installations match the design intent.',
  },
];

const faqs = [
  {
    question: 'What happens if evidence is submitted late to the assessor?',
    answer:
      'Late evidence submission can delay certification and may incur additional assessor fees for extended assessment periods. BRE has time limits for completing assessments after practical completion (typically 3 months for Design Stage issue and 12 months for final certificate). If evidence is not provided within these timeframes, the assessment may need to restart or credits may be lost. Project teams should establish evidence submission schedules aligned with design and construction milestones.',
  },
  {
    question:
      'Can Design Stage credits be claimed without specifications being contractually fixed?',
    answer:
      "Design Stage credits require evidence that performance requirements will be achieved through contractual commitment. This typically means specifications must be included in tender documentation, employer's requirements, or formal design commitments. Credits based on 'design intent' alone without contractual backing may be challenged by the assessor. The key is demonstrating that the specified performance will be delivered, not just considered.",
  },
  {
    question: 'Who is responsible for collecting BREEAM evidence on a project?',
    answer:
      'Evidence collection responsibility varies by project structure but typically involves: the BREEAM Accredited Professional (AP) coordinating overall evidence strategy; design consultants providing design-stage specifications and calculations; the contractor providing installation records, commissioning data, and as-built documentation; and the client providing procurement evidence and sustainability policies. Clear responsibility allocation in the project execution plan prevents gaps.',
  },
  {
    question: 'What if the installed system differs from the Design Stage specification?',
    answer:
      'If installed systems differ from Design Stage specifications, the assessor must evaluate whether the actual installation still achieves the credit criteria. Minor variations that maintain performance compliance may be acceptable with supporting evidence. Significant changes require re-evaluation - if the actual installation meets or exceeds requirements, credits may be maintained; if it falls short, credits may be reduced or withdrawn. Change control documentation is essential.',
  },
  {
    question: 'How long does BREEAM certification take?',
    answer:
      'BREEAM certification timeline depends on evidence quality and assessor workload. Design Stage certificates are typically issued 4-6 weeks after complete evidence submission. Post-Construction certificates take 6-8 weeks from complete submission. However, evidence queries and incomplete submissions can extend timelines significantly. Projects should allow 3-6 months from practical completion for final certification, accounting for defects correction and commissioning completion.',
  },
  {
    question: 'Can existing buildings achieve BREEAM certification?',
    answer:
      'Yes, BREEAM In-Use assesses operational buildings without requiring original design documentation. However, BREEAM New Construction cannot be retrospectively applied to buildings completed without registration. For refurbishment projects, BREEAM Refurbishment & Fit-Out may apply. The key distinction is registration timing - projects must be registered with BRE before practical completion to achieve BREEAM New Construction certification.',
  },
];

const HNCModule6Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 6"
            title="BREEAM Evidence and Certification"
            description="Documentation requirements, design stage vs post-construction evidence, assessor verification, and achieving certification"
            tone="purple"
          />

          <TLDR
            points={[
              "BREEAM evidence is the responsibility of the design team and contractor — collected by the licensed Assessor, submitted to BRE for QA, and certificated in two stages (Design Stage and Post-Construction).",
              "Each credit has a defined evidence schedule (calculations, drawings, specifications, test certificates, photographs, declarations) — missing or non-compliant evidence loses the credit even if the technical performance was achieved.",
              "Design-Stage certification before construction starts is critical — credits depending on procurement (responsibly sourced materials, low-VOC specifications) cannot be earned retroactively at Post-Construction.",
            ]}
          />

          <RegsCallout
            source="BREEAM UK New Construction 2018 — Evidence requirements + QA"
            clause="The BREEAM Assessor shall collect, review and submit evidence to BRE Global for each claimed credit in accordance with the credit-specific evidence schedule. Evidence shall be of sufficient quality, completeness and traceability to allow an independent reviewer to verify compliance. Where evidence is found to be insufficient at QA, BRE Global may require additional evidence, withdraw the credit, or in cases of repeated non-compliance, suspend the Assessor licence."
            meaning={
              <>
                Evidence quality is QA-tested by BRE before certification. Common failure modes: photos without metadata or location reference, calculations without inputs/assumptions, drawings without revision control, declarations without signatures. The assessor cannot fix these on submission day — the evidence pack must be assembled progressively from design stage through construction.
              </>
            }
            cite="Source: BREEAM UK NC 2018 Technical Manual, Issue 4.0 — breeam.com"
          />

          <LearningOutcomes
            outcomes={[
              "Identify documentation requirements for BREEAM credits",
              "Distinguish between Design Stage and Post-Construction evidence",
              "Apply assessor verification standards to evidence preparation",
              "Develop evidence schedules for building services credits",
              "Understand certification timeline and process requirements",
              "Avoid common evidence issues that delay certification",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Documentation Requirements">
            <p>BREEAM assessment requires comprehensive documentation to demonstrate compliance with credit criteria. Evidence must be written, verifiable, and submitted in formats that allow independent audit. Verbal commitments, unsigned documents, and undated records are not acceptable.</p>
            <p><strong>Evidence Types Required for Building Services Credits:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design specifications:</strong> Signed technical specifications with performance requirements</li>
              <li><strong>Calculations:</strong> Energy models, lighting calculations, water consumption analyses</li>
              <li><strong>Drawings:</strong> Design drawings at DS, as-built drawings at PCS</li>
              <li><strong>Product data:</strong> Manufacturer datasheets, certifications, test reports</li>
              <li><strong>Commissioning records:</strong> Test certificates, commissioning reports, handover documentation</li>
            </ul>
            <p><strong>Evidence Quality Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dated:</strong> Clear issue date visible — Specification Rev C - 15/03/2024</li>
              <li><strong>Signed/Authorised:</strong> Named responsible person — Approved by: J. Smith CEng</li>
              <li><strong>Project-specific:</strong> References project name/number — Project: Manchester Office - Ref: 12345</li>
              <li><strong>Complete:</strong> All relevant information included — Full meter schedule with all locations</li>
              <li><strong>Traceable:</strong> Clear reference system — Drawing ME-101 Rev D correlates to spec clause 5.3</li>
            </ul>
            <p><strong>Key principle:</strong> If evidence cannot be independently verified by reading the document alone, it is insufficient for BREEAM assessment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Design Stage Evidence">
            <p>Design Stage (DS) assessment confirms that the building design will achieve targeted BREEAM credits when built as specified. Evidence must demonstrate design intent, specification compliance, and contractual commitment to achieving performance requirements.</p>
            <p><strong>Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Signed M&E specifications</li>
              <li>Employer's Requirements</li>
              <li>Performance standards stated</li>
              <li>Contractual obligations clear</li>
            </ul>
            <p><strong>Design Calculations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy modelling (SBEM/DSM)</li>
              <li>Lighting design calculations</li>
              <li>Wat 01 water calculations</li>
              <li>Ventilation airflow analysis</li>
            </ul>
            <p><strong>Design Drawings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Schematic layouts</li>
              <li>Equipment schedules</li>
              <li>Meter locations shown</li>
              <li>Control strategies illustrated</li>
            </ul>
            <p><strong>Building Services Design Stage Evidence by Credit</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ene 01 Energy Performance:</strong> SBEM/DSM calculations — M&E specifications, plant schedules</li>
              <li><strong>Ene 02 Sub-metering:</strong> Metering strategy document — Meter schedule, schematic drawings</li>
              <li><strong>Hea 01 Visual Comfort:</strong> Lighting design calculations — Luminaire specifications, control strategy</li>
              <li><strong>Hea 02 Indoor Air Quality:</strong> Ventilation design calculations — AHU schedules, fresh air rates</li>
              <li><strong>Wat 01 Water Consumption:</strong> BREEAM Wat 01 Calculator — Sanitaryware specifications</li>
            </ul>
            <p><strong>Timing:</strong> Design Stage assessment should be completed at RIBA Stage 4 (Technical Design) before construction contracts are let.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Post-Construction Stage Evidence">
            <p>Post-Construction Stage (PCS) assessment verifies that Design Stage commitments have been implemented as specified. Evidence must demonstrate actual installation, commissioning results, and operational compliance with credited performance levels.</p>
            <p><strong>PCS Evidence Hierarchy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1:</strong> As-built drawings (shows what was installed)</li>
              <li><strong>Level 2:</strong> Commissioning certificates (proves it works)</li>
              <li><strong>Level 3:</strong> Site photographs (visual verification)</li>
              <li><strong>Level 4:</strong> O&M manuals (handover documentation)</li>
            </ul>
            <p><strong>Post-Construction Evidence Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>As-built drawings:</strong> Final installation drawings showing actual meter locations, equipment positions, and system configurations</li>
              <li><strong>Commissioning records:</strong> Signed certificates demonstrating systems meet specified performance</li>
              <li><strong>Test results:</strong> Air tightness testing, water flow rates, lux level surveys, thermal imaging</li>
              <li><strong>Installation records:</strong> Delivery notes, installation sign-off sheets, quality records</li>
              <li><strong>Site photographs:</strong> Dated images showing installed systems with specification references</li>
            </ul>
            <p><strong>Building Services PCS Evidence Examples</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ene 01 Energy Performance:</strong> Final EPC, as-built SBEM, air tightness test — Energy assessor</li>
              <li><strong>Ene 02 Sub-metering:</strong> Meter commissioning certificates, as-built schedule — M&E contractor</li>
              <li><strong>Hea 01 Visual Comfort:</strong> Lux level survey results, lighting commissioning — Electrical contractor</li>
              <li><strong>Hea 02 Indoor Air Quality:</strong> Ventilation commissioning, air quality testing — Mechanical contractor</li>
              <li><strong>Wat 01 Water Consumption:</strong> Flow rate test results, sanitaryware installation photos — Plumbing contractor</li>
            </ul>
            <p><strong>Critical note:</strong> PCS evidence must correlate with Design Stage specifications. Any deviations must be documented with explanation of how credit compliance is maintained.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Assessor Verification and Certification">
            <p>Licensed BREEAM assessors independently verify submitted evidence against credit criteria before submitting the assessment to BRE for Quality Assurance audit. The certification process involves multiple verification stages to ensure assessment integrity.</p>
            <p><strong>Certification Process Timeline</strong></p>
            <p><strong>Design Stage Certificate</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Evidence submission to assessor</li>
              <li>2. Assessor review and queries (2-4 weeks)</li>
              <li>3. Evidence completion and sign-off</li>
              <li>4. Submission to BRE QA (1-2 weeks)</li>
              <li>5. BRE QA review and queries (2-3 weeks)</li>
              <li>6. Certificate issue (1 week)</li>
              <li>Total: 6-10 weeks typical</li>
            </ul>
            <p><strong>Post-Construction Certificate</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Practical completion achieved</li>
              <li>2. PCS evidence collection (2-8 weeks)</li>
              <li>3. Assessor review and site visit</li>
              <li>4. Evidence completion (2-4 weeks)</li>
              <li>5. BRE QA submission (2-3 weeks)</li>
              <li>6. Final certificate issue (1 week)</li>
              <li>Total: 8-16 weeks from PC</li>
            </ul>
            <p><strong>Assessor Verification Checks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Evidence authenticity:</strong> Dates, signatures, project references — Unsigned documents, generic templates</li>
              <li><strong>Criteria compliance:</strong> Evidence matches credit requirements — Partial compliance, missing elements</li>
              <li><strong>Calculation accuracy:</strong> Methodology and inputs verified — Errors in BREEAM calculators</li>
              <li><strong>Consistency:</strong> Evidence documents align — Specifications contradict drawings</li>
              <li><strong>Completeness:</strong> All required evidence present — Missing commissioning records</li>
            </ul>
            <p><strong>BREEAM Rating Thresholds</strong></p>
            <p><strong>Pass:</strong> 30% of available credits</p>
            <p><strong>Good:</strong> 45% of available credits</p>
            <p><strong>Very Good:</strong> 55% of available credits</p>
            <p><strong>Excellent:</strong> 70% of available credits</p>
            <p><strong>Outstanding:</strong> 85% of available credits</p>
            <p>Note: Minimum standards must be achieved in certain credits regardless of overall percentage.</p>
            <p><strong>BRE QA:</strong> All assessments undergo BRE Quality Assurance audit. Approximately 10% receive detailed technical audit which may raise additional queries.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Energy Sub-metering Evidence Package</strong>
            </p>
            <p><strong>Scenario:</strong> Compile evidence for Ene 02 Sub-metering credits (3 credits targeted).</p>
            <p>Design Stage Evidence:</p>
            <p>1. Metering Strategy Document (dated, signed)</p>
            <p>- Lists all energy uses over 10% of total</p>
            <p>- Identifies meter locations and types</p>
            <p>- States BMS integration requirements</p>
            <p>2. Electrical Specification Clause 5.7</p>
            <p>- "Sub-meters to all substantial loads (heating,</p>
            <p>cooling, lighting, small power, lifts, etc.)"</p>
            <p>3. Schematic Drawing ME-SK-101</p>
            <p>- Shows meter positions on distribution schematic</p>
            <p>Post-Construction Stage Evidence:</p>
            <p>4. As-built Meter Schedule (Rev Final)</p>
            <p>- Lists 24 meters installed with references</p>
            <p>5. Commissioning Certificates</p>
            <p>- Meter calibration certificates</p>
            <p>- BMS point verification sheets</p>
            <p>6. Site Photographs</p>
            <p>- Dated photos of installed meters with labels</p>
            <p>Result: 3 credits achieved - full sub-metering coverage verified</p>
            <p>
              <strong>Example 2: Lighting Design Evidence for Hea 01</strong>
            </p>
            <p><strong>Scenario:</strong> Prepare Visual Comfort evidence for office building.</p>
            <p>Design Stage Package:</p>
            <p>1. Lighting Design Report (by qualified designer)</p>
            <p>Target lux levels per space type:</p>
            <p>- Offices: 500 lux maintained, UGR &lt;19</p>
            <p>- Circulation: 200 lux maintained</p>
            <p>- Meeting rooms: 500 lux, dimming provision</p>
            <p>2. DIALux Calculation Outputs</p>
            <p>- Room-by-room calculations with uniformity</p>
            <p>- UGR calculations for desk positions</p>
            <p>3. Luminaire Schedule with Product Data</p>
            <p>- TM66 circularity data (if targeting exemplary)</p>
            <p>- Photometric files referenced</p>
            <p>Post-Construction Stage Package:</p>
            <p>4. Commissioning Lux Level Survey</p>
            <p>- Measured values per space (signed by engineer)</p>
            <p>- Results exceed design targets</p>
            <p>5. Lighting Control Commissioning</p>
            <p>- Dimming function tested and verified</p>
            <p>- Scene setting completed</p>
            <p>Result: Credits achieved - design targets met on site</p>
            <p>
              <strong>Example 3: Resolving a PCS Evidence Gap</strong>
            </p>
            <p><strong>Scenario:</strong> Design Stage specified DALI lighting controls, but contractor installed standard switching.</p>
            <p>Issue Identified:</p>
            <p>- DS specification: DALI dimming throughout</p>
            <p>- PCS reality: Manual switching only in some areas</p>
            <p>Impact Assessment:</p>
            <p>- Hea 01 Credit 2 (zoned control) at risk</p>
            <p>- ENE 01 assumptions may be affected</p>
            <p>Resolution Options:</p>
            <p>Option A: Remediation</p>
            <p>- Retrofit DALI drivers and controls</p>
            <p>- Commission and evidence as specified</p>
            <p>- Credit maintained</p>
            <p>Option B: Accept credit loss</p>
            <p>- Document variation with explanation</p>
            <p>- Withdraw credit from final assessment</p>
            <p>- Check overall rating impact</p>
            <p>Lesson: Early site monitoring prevents PCS surprises</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Evidence Collection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Create evidence tracker at project start with responsible parties</li>
              <li>Include BREEAM requirements in tender documentation</li>
              <li>Schedule evidence review meetings at key project stages</li>
              <li>Collect evidence progressively - don't wait until practical completion</li>
              <li>Maintain clear document version control and references</li>
              <li>Photograph installations during construction (before concealment)</li>
            </ul>
            <p>
              <strong>Key Deadlines to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project registration: <strong>Before practical completion</strong></li>
              <li>Design Stage submission: <strong>RIBA Stage 4</strong> (before construction)</li>
              <li>PCS evidence submission: <strong>Within 12 months</strong> of practical completion</li>
              <li>Final certificate: <strong>Typically 3-4 months</strong> after complete evidence submission</li>
            </ul>
            <p>
              <strong>Common Evidence Problems to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unsigned documents</strong> - All evidence requires named responsible person</li>
              <li><strong>Generic specifications</strong> - Must be project-specific with clear references</li>
              <li><strong>Undated photographs</strong> - Site photos must include date stamps</li>
              <li><strong>Missing commissioning records</strong> - Systems must be proven to work as designed</li>
              <li><strong>Inconsistent documents</strong> - Specifications must match drawings and as-built records</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="BRE QA challenge wipes out 6 credits at submission"
            situation={
              <>
                A development is targeting Excellent (70%). Pre-submission scoring shows 73% — 3% margin. After BRE Global QA review, six credits are withdrawn for evidence quality issues: three for inadequate procurement records (no signed declarations from suppliers), two for missing photographs (verbal confirmation only), one for outdated calculation (Stage 3 calc, not as-built). Final score 67% — Very Good, not Excellent.
              </>
            }
            whatToDo={
              <>
                Two-stage response: (1) immediate — appeal where there is genuine new evidence available (e.g. retrospective supplier declarations, post-completion site survey); (2) negotiate with the planning authority for a variation. Lesson: every credit on a tight margin must have its evidence pack QA-checked by the Assessor before submission, against a credit-by-credit checklist of BRE expectations. Build the evidence pack as construction proceeds, not at the end.
              </>
            }
            whyItMatters={
              <>
                BREEAM is won and lost on evidence quality. Clients (and contractors) often think compliance equals certification — it does not. BRE's QA process is rigorous; the assessor is your QA shield, not a rubber stamp. Budget time and fee for evidence collection from RIBA Stage 4 onwards.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Two-stage certification: Design Stage (pre-construction) + Post-Construction (post-handover).",
              "Each credit has a defined evidence schedule — calculations, drawings, specs, certificates, photos, declarations.",
              "Procurement-dependent credits cannot be earned retroactively — must be locked at order stage.",
              "BRE QA review can withdraw credits even after Assessor submission.",
              "Evidence pack assembled progressively — never at the end.",
              "Credit-by-credit checklist with the Assessor before each submission stage.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Health and wellbeing
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section4-1")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Carbon fundamentals
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_6;
