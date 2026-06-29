/**
 * Module 6 · Section 3 · Subsection 1 — BREEAM Overview
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Schemes, rating levels, category weightings, assessment process, and the role of the licensed assessor
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

const TITLE = 'BREEAM Overview - HNC Module 6 Section 3.1';
const DESCRIPTION =
  'Master BREEAM assessment methodology: schemes, rating levels, category weightings, assessment process, and the role of the licensed assessor in achieving sustainable building certification.';

const quickCheckQuestions = [
  {
    id: 'breeam-definition',
    question: 'What does BREEAM stand for?',
    options: [
      'British Regulation for Energy and Environmental Assessment Measures',
      'Building Research Establishment Environmental Assessment Method',
      'Building Requirements for Ecological and Environmental Assessment Methods',
      'British Research Establishment Energy Assessment Methodology',
    ],
    correctIndex: 1,
    explanation:
      "BREEAM stands for Building Research Establishment Environmental Assessment Method. Developed by BRE in 1990, it was the world's first environmental assessment method for buildings.",
  },
  {
    id: 'breeam-ratings',
    question: 'What is the highest BREEAM rating that can be achieved?',
    options: [
      'Superior',
      'Excellent',
      'Outstanding',
      'Exceptional',
    ],
    correctIndex: 2,
    explanation:
      'Outstanding is the highest BREEAM rating, requiring a score of 85% or above. The five rating levels in ascending order are: Pass (30%), Good (45%), Very Good (55%), Excellent (70%), and Outstanding (85%).',
  },
  {
    id: 'breeam-assessor',
    question: 'Who is responsible for conducting a BREEAM assessment?',
    options: [
      'The building owner',
      'The local authority building control',
      'Any qualified architect',
      'A licensed BREEAM assessor',
    ],
    correctIndex: 3,
    explanation:
      'BREEAM assessments must be conducted by a licensed BREEAM assessor who has completed specific BRE training and maintains their accreditation. The assessor is independent and acts as the interface between the project team and BRE.',
  },
  {
    id: 'breeam-mandatory',
    question: 'What happens if a BREEAM project fails to achieve mandatory credits?',
    options: [
      'The project cannot achieve certification at the target rating',
      'The rating is reduced by exactly one level',
      'The project receives a conditional pass pending review',
      'Additional innovation points are awarded to compensate',
    ],
    correctIndex: 0,
    explanation:
      'Mandatory credits (also called minimum standards) must be achieved for any rating level. If a project fails to meet the mandatory requirements for its target rating, it cannot achieve certification at that level regardless of overall score.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BREEAM scheme would be used for assessing an existing office building that has been in operation for 5 years?',
    options: [
      'BREEAM New Construction',
      'BREEAM In-Use',
      'BREEAM Refurbishment and Fit-Out',
      'BREEAM Communities',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM In-Use is designed for assessing operational buildings. It evaluates asset performance, building management, and occupier management for existing buildings that are occupied and operating.',
  },
  {
    id: 2,
    question:
      'In BREEAM New Construction 2018, which assessment category typically carries the highest weighting?',
    options: [
      'Materials',
      'Management',
      'Energy',
      'Health and Wellbeing',
    ],
    correctAnswer: 2,
    explanation:
      'Energy typically carries the highest weighting in BREEAM assessments (around 15-19% depending on building type). This reflects the significant environmental impact of building energy consumption over its operational lifetime.',
  },
  {
    id: 3,
    question: 'A project scores 72% in a BREEAM assessment. What rating does this achieve?',
    options: [
      'Very Good',
      'Good',
      'Outstanding',
      'Excellent',
    ],
    correctAnswer: 3,
    explanation:
      'A score of 72% achieves an Excellent rating. The thresholds are: Pass (≥30%), Good (≥45%), Very Good (≥55%), Excellent (≥70%), Outstanding (≥85%).',
  },
  {
    id: 4,
    question: 'What is the purpose of the BREEAM pre-assessment?',
    options: [
      'To identify achievable credits and inform design decisions early',
      'To submit the final certification application',
      'To verify post-construction compliance',
      'To train the project team on BREEAM requirements',
    ],
    correctAnswer: 0,
    explanation:
      'Pre-assessment is conducted early in design to identify which credits are achievable, highlight potential issues, and inform design decisions while changes are still cost-effective. It helps set a realistic target rating.',
  },
  {
    id: 5,
    question: 'Which of these is NOT a BREEAM assessment category?',
    options: [
      'Pollution',
      'Cost Efficiency',
      'Transport',
      'Land Use and Ecology',
    ],
    correctAnswer: 1,
    explanation:
      'Cost Efficiency is not a BREEAM assessment category. The nine categories are: Management, Health and Wellbeing, Energy, Transport, Water, Materials, Waste, Land Use and Ecology, and Pollution.',
  },
  {
    id: 6,
    question: 'How are innovation credits used in BREEAM?',
    options: [
      'They replace any mandatory credits a project has failed to meet',
      'They are deducted from the score if standard criteria are exceeded',
      'They provide additional percentage points above the standard 100%',
      'They are only available for BREEAM In-Use assessments',
    ],
    correctAnswer: 2,
    explanation:
      'Innovation credits allow projects to earn additional percentage points (typically up to 10%) above the standard 100% for exemplary performance or innovative solutions. This can help push a project into a higher rating band.',
  },
  {
    id: 7,
    question: 'At which project stage is the Design Stage assessment typically completed?',
    options: [
      'RIBA Stage 0 (Strategic Definition)',
      'RIBA Stage 6 (Handover and Close Out)',
      'RIBA Stage 7 (In Use)',
      'End of RIBA Stage 3/4 (Technical Design)',
    ],
    correctAnswer: 3,
    explanation:
      'The Design Stage assessment is typically completed at the end of RIBA Stage 3 or 4 when technical design is substantially complete. This provides an interim certificate based on design intent and commitments.',
  },
  {
    id: 8,
    question:
      'What evidence would an assessor require for the Ene 01 (Reduction of energy use and carbon emissions) credit?',
    options: [
      'Energy modelling results from approved software (e.g., IES, TAS)',
      'A signed declaration from the building owner of expected energy use',
      'The manufacturer warranty documents for the HVAC plant',
      'A summary of the construction waste management plan',
    ],
    correctAnswer: 0,
    explanation:
      'Ene 01 requires dynamic thermal modelling results from approved software such as IES-VE, TAS, or EnergyPlus. This demonstrates the predicted energy performance and carbon emissions compared to the Part L notional building.',
  },
  {
    id: 9,
    question:
      'Which BREEAM category addresses internal air quality, lighting levels, and acoustic performance?',
    options: [
      'Management',
      'Health and Wellbeing',
      'Energy',
      'Pollution',
    ],
    correctAnswer: 1,
    explanation:
      'Health and Wellbeing (Hea) addresses factors affecting building occupants including visual comfort, indoor air quality, safe access, thermal comfort, acoustic performance, and water quality.',
  },
  {
    id: 10,
    question: 'What is the role of the BREEAM Quality Assurance (QA) process?',
    options: [
      'To set the category weightings used for each building type',
      'To award the innovation credits at the end of the assessment',
      'To verify assessor submissions and maintain assessment consistency',
      'To train the design team in BREEAM requirements before registration',
    ],
    correctAnswer: 2,
    explanation:
      "BRE's Quality Assurance process reviews assessor submissions to verify compliance, maintain consistency across assessments, and ensure the integrity of BREEAM certification. This independent review is mandatory before certification.",
  },
  {
    id: 11,
    question:
      'A healthcare building requires BREEAM Excellent. Which scheme-specific version would be used?',
    options: [
      'BREEAM New Construction (generic)',
      'BREEAM Clinical',
      'BREEAM In-Use Healthcare',
      'BREEAM Healthcare',
    ],
    correctAnswer: 3,
    explanation:
      'BREEAM Healthcare is a building type-specific scheme with tailored criteria for hospitals and clinical facilities. It includes credits relevant to healthcare environments such as infection control and clinical functionality.',
  },
  {
    id: 12,
    question:
      "What is the minimum percentage score required to achieve a BREEAM 'Very Good' rating?",
    options: [
      '55%',
      '70%',
      '30%',
      '45%',
    ],
    correctAnswer: 0,
    explanation:
      'Very Good requires a minimum score of 55%. The full scale is: Pass (≥30%), Good (≥45%), Very Good (≥55%), Excellent (≥70%), Outstanding (≥85%). Each level also requires achievement of specific mandatory credits.',
  },
];

const faqs = [
  {
    question: 'When should BREEAM be considered in a project?',
    answer:
      'BREEAM should be considered at the earliest possible stage - ideally during feasibility. Early engagement allows sustainability targets to influence site selection, building orientation, and fundamental design decisions. The pre-assessment at RIBA Stage 2 helps set achievable targets. Retrofitting BREEAM requirements late in design is costly and limits the achievable rating.',
  },
  {
    question:
      'What is the difference between Design Stage and Post-Construction Stage certificates?',
    answer:
      'The Design Stage certificate is an interim assessment based on design documentation and commitments - it shows what should be achieved if the design is built as specified. The Post-Construction Stage certificate is the final verification based on as-built evidence, confirming that commitments were actually delivered. Most clients require the final Post-Construction certificate.',
  },
  {
    question: 'How much does BREEAM certification cost?',
    answer:
      'Costs vary by project size and complexity. Registration fees are set by BRE (typically £1,500-£5,000 for New Construction). Assessor fees depend on the scope and range from £5,000-£30,000+. The main cost impact is design and construction measures to achieve credits - these should be considered design costs rather than assessment costs. Early engagement minimises the cost premium.',
  },
  {
    question: 'Can a project change its target BREEAM rating during design?',
    answer:
      'Yes, target ratings can be adjusted based on pre-assessment findings and value engineering decisions. However, changing targets late in design limits options and may result in abortive design work. If contractually committed to a rating, the client must be consulted on any proposed changes. The assessor can advise on the implications of different rating targets.',
  },
  {
    question:
      'What happens if credits claimed at Design Stage are not achieved at Post-Construction?',
    answer:
      'If Post-Construction evidence does not support Design Stage claims, those credits are removed from the final score. This may result in a lower rating than the interim certificate indicated. The assessor should flag risks during design and the project team must ensure design commitments are carried through to construction. Some shortfall can be offset if other credits over-perform.',
  },
  {
    question: 'Is BREEAM mandatory in the UK?',
    answer:
      'BREEAM is not mandated by Building Regulations but is often required by clients, planning conditions, or funding bodies. Government projects (central government, devolved administrations) typically require BREEAM Excellent. Many local planning authorities include BREEAM requirements in supplementary planning guidance. Institutional investors and lenders increasingly require minimum ratings for new builds.',
  },
];

const HNCModule6Section3_1 = () => {
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
            eyebrow="Module 6 · Section 3 · Subsection 1"
            title="BREEAM Overview"
            description="Schemes, rating levels, category weightings, assessment process, and the role of the licensed assessor"
            tone="purple"
          />

          <TLDR
            points={[
              "BREEAM is the BRE Environmental Assessment Method — the UK's primary sustainability rating scheme, with separate schemes for New Construction, Refurbishment, In-Use and Communities, and ratings from Pass through Outstanding.",
              "The assessment is delivered by a licensed BREEAM Assessor against weighted credits across nine categories (Management, Health, Energy, Transport, Water, Materials, Waste, Land Use, Pollution) plus Innovation.",
              "Local plans increasingly mandate BREEAM Excellent or above — particularly in London (London Plan), Manchester, and major commercial developments, making BREEAM compliance a planning condition rather than a nice-to-have.",
            ]}
          />

          <RegsCallout
            source="BREEAM UK New Construction 2018 — Technical Manual"
            clause="A BREEAM assessment shall be carried out by an Assessor licensed by BRE Global, against the credits and minimum standards defined in the relevant Technical Manual. The assessment shall comprise a Design Stage assessment (predicted rating, certified pre-construction) and a Post-Construction assessment (final rating, certified after handover) with formal evidence demonstrating each claimed credit. Minimum standards apply to certain categories (e.g. Mat 03 Responsible sourcing) and must be met regardless of the overall rating sought."
            meaning={
              <>
                Two-stage assessment is mandatory: design-stage certification before construction starts, post-construction certification after handover. Skipping the design-stage assessment is the most common failure mode — credits that needed early procurement or design decisions are then lost. Minimum standards trump the overall rating; you cannot skip them by over-achieving elsewhere.
              </>
            }
            cite="Source: BREEAM UK New Construction 2018 — breeam.com"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the purpose and scope of BREEAM assessment methodology",
              "Identify the main BREEAM schemes and their applications",
              "Describe the five rating levels and their percentage thresholds",
              "Analyse the nine assessment categories and their weightings",
              "Outline the assessment process from pre-assessment to certification",
              "Define the role and responsibilities of the licensed BREEAM assessor",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Introduction to BREEAM">
            <p>BREEAM (Building Research Establishment Environmental Assessment Method) is the world's longest-established method of assessing, rating, and certifying the sustainability of buildings. Developed by BRE in 1990, it has been used to certify over 2.3 million buildings globally and remains the predominant assessment method in the UK construction industry.</p>
            <p><strong>Key BREEAM Schemes:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>New Construction:</strong> New buildings, major extensions — Design Stage + Post-Construction certification</li>
              <li><strong>Refurbishment & Fit-Out:</strong> Existing building upgrades — Scalable scope: Part 1 (fabric), Part 2 (core services), Part 3 (local services), Part 4 (interior design)</li>
              <li><strong>In-Use:</strong> Operational buildings — Asset, Building Management, Occupier Management assessments</li>
              <li><strong>Communities:</strong> Masterplanning, neighbourhood scale — Assesses wider sustainability of developments</li>
              <li><strong>Infrastructure:</strong> Civil engineering projects — Roads, railways, utilities, bridges</li>
            </ul>
            <p><strong>Building Type-Specific Versions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BREEAM Healthcare:</strong> Hospitals and clinical facilities with infection control credits</li>
              <li><strong>BREEAM Education:</strong> Schools and universities with educational environment focus</li>
              <li><strong>BREEAM Retail:</strong> Shops, shopping centres with customer experience criteria</li>
              <li><strong>BREEAM Industrial:</strong> Warehouses, factories with operational flexibility</li>
              <li><strong>BREEAM Residential:</strong> Multi-residential (for individual homes, Home Quality Mark applies)</li>
            </ul>
            <p><strong>Industry context:</strong> BREEAM certification is often a planning requirement, client specification, or funding condition - making it a standard consideration for building services engineers.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Rating Levels and Scoring">
            <p>BREEAM uses a points-based system where credits are awarded for meeting specific criteria. Credits are weighted by category importance, summed to give a percentage score, and converted to a rating level. Each rating level also requires achievement of specific mandatory credits.</p>
            <p><strong>BREEAM Rating Levels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pass:</strong> ≥30% — Minimum compliance — Below market expectation</li>
              <li><strong>Good:</strong> ≥45% — Standard commercial — Market baseline</li>
              <li><strong>Very Good:</strong> ≥55% — Common client requirement — Above average practice</li>
              <li><strong>Excellent:</strong> ≥70% — Government, institutional — Best practice</li>
              <li><strong>Outstanding:</strong> ≥85% — Landmark, exemplary — Innovation leader</li>
            </ul>
            <p><strong>Mandatory Credits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required for each rating level</li>
              <li>Cannot be traded for other credits</li>
              <li>Failure means certification at lower level</li>
              <li>Examples: commissioning, water consumption, construction waste</li>
            </ul>
            <p><strong>Innovation Credits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Awarded for exemplary performance</li>
              <li>Up to 10% additional score available</li>
              <li>Can push projects into higher bands</li>
              <li>Requires exceeding standard criteria thresholds</li>
            </ul>
            <p><strong>Score Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy category:</strong> 12 credits achieved × 19% weighting = 2.28% contribution</li>
              <li><strong>Health & Wellbeing:</strong> 9 credits achieved × 14% weighting = 1.26% contribution</li>
              <li><strong>All categories summed:</strong> = Overall percentage score</li>
              <li><strong>Plus innovation:</strong> + Up to 10% additional</li>
            </ul>
            <p><strong>Target setting:</strong> Aim 5-10% above your target threshold to provide margin for credits that prove unachievable during construction.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Assessment Categories and Weightings">
            <p>BREEAM assesses buildings across nine environmental categories, each with different weightings that reflect their relative importance. Weightings vary slightly between building types and schemes, but the categories remain consistent.</p>
            <p><strong>Nine Assessment Categories (NC 2018 Offices)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy (Ene):</strong> 15-19% — Energy performance, sub-metering, external lighting, low carbon technologies</li>
              <li><strong>Health & Wellbeing (Hea):</strong> 14% — Visual comfort, indoor air quality, thermal comfort, acoustic performance</li>
              <li><strong>Materials (Mat):</strong> 12.5% — Responsible sourcing, environmental impact of M&E products</li>
              <li><strong>Management (Man):</strong> 12% — Commissioning, seasonal commissioning, building user guide, aftercare</li>
              <li><strong>Land Use & Ecology (LE):</strong> 10% — Limited M&E impact (ecological enhancement of site)</li>
              <li><strong>Water (Wat):</strong> 6% — Water consumption, monitoring, leak detection</li>
              <li><strong>Waste (Wst):</strong> 7.5% — Construction waste, operational waste, adaptability</li>
              <li><strong>Pollution (Pol):</strong> 6.5% — Refrigerant GWP, NOx emissions, flood risk, surface water run-off</li>
              <li><strong>Transport (Tra):</strong> 8% — EV charging provision, cyclist facilities</li>
            </ul>
            <p><strong>Example Credits - Building Services Impact</strong></p>
            <p><strong>Ene 01 - Reduction of energy use and carbon emissions (up to 15 credits)</strong></p>
            <p>Based on Energy Performance Ratio (EPR) comparing actual design to Part L notional building. Requires approved dynamic thermal modelling. Higher credits for better performance beyond regulation.</p>
            <p><strong>Ene 02 - Energy monitoring (up to 2 credits)</strong></p>
            <p>Sub-metering of major energy uses: heating, cooling, lighting, small power, renewables. Enables post-occupancy performance tracking and fault identification.</p>
            <p><strong>Hea 01 - Visual comfort (up to 4 credits)</strong></p>
            <p>Daylighting levels, view out, glare control, high-frequency lighting (≥3,000 Hz), colour rendering (Ra ≥80). Directly affects lighting design specifications.</p>
            <p><strong>Pol 01 - Impact of refrigerants (up to 3 credits)</strong></p>
            <p>Credits for low GWP refrigerants, leak detection systems, and eliminating refrigerants entirely. Affects HVAC system selection.</p>
            <p><strong>Design influence:</strong> Building services decisions directly impact approximately 50% of available BREEAM credits across Energy, Health, Water, and Pollution categories.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Assessment Process and Assessor Role">
            <p>BREEAM assessment follows a structured process from early design through to post-construction verification. A licensed BREEAM assessor is required throughout, acting as the independent interface between the project team and BRE.</p>
            <p><strong>Assessment Process Stages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-Assessment:</strong> Stage 2 — Credit targeting, feasibility review, cost implications — Pre-assessment report, target rating</li>
              <li><strong>Registration:</strong> Stage 2-3 — Project registration with BRE, fees paid — Registration confirmation, project ID</li>
              <li><strong>Design Stage:</strong> Stage 3-4 — Evidence collection, credit assessment, QA submission — Interim Design Stage certificate</li>
              <li><strong>Post-Construction:</strong> Stage 6 — As-built verification, commissioning evidence, final submission — Final BREEAM certificate</li>
            </ul>
            <p><strong>Assessor Responsibilities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Interpret BREEAM criteria for the project</li>
              <li>Advise on credit achievement strategies</li>
              <li>Collect and review evidence documentation</li>
              <li>Complete assessment tool scoring</li>
              <li>Submit to BRE for Quality Assurance</li>
              <li>Address QA queries and corrections</li>
              <li>Maintain independence from design team</li>
            </ul>
            <p><strong>Design Team Responsibilities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Integrate BREEAM requirements into design</li>
              <li>Provide evidence documentation</li>
              <li>Specifications referencing BREEAM criteria</li>
              <li>Calculations and modelling outputs</li>
              <li>Commissioning records and certificates</li>
              <li>Product certifications (EPDs, FSC, etc.)</li>
              <li>Respond to assessor queries promptly</li>
            </ul>
            <p><strong>Evidence Types for M&E Credits</strong></p>
            <p><strong>Design Stage:</strong> Specifications, design drawings, energy models (IES/TAS), daylight calculations, commissioning specifications, product data sheets with environmental certifications.</p>
            <p><strong>Post-Construction:</strong> As-built drawings, commissioning certificates, test results, sub-meter schedules, O&M manuals, building user guides, seasonal commissioning reports.</p>
            <p><strong>Quality Assurance Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Submission:</strong> Assessor submits completed assessment via BREEAM Projects portal</li>
              <li><strong>QA review:</strong> BRE auditor reviews evidence and scoring decisions</li>
              <li><strong>Queries:</strong> Auditor raises Technical Questions (TQs) requiring clarification</li>
              <li><strong>Response:</strong> Assessor provides additional evidence or justification</li>
              <li><strong>Certification:</strong> Once satisfied, BRE issues the certificate</li>
            </ul>
            <p><strong>Timing consideration:</strong> QA review typically takes 4-6 weeks. Allow sufficient time in the programme, especially if certification is needed for practical completion or funding drawdown.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Pre-Assessment Credit Targeting</strong>
            </p>
            <p><strong>Scenario:</strong> A new office building targeting BREEAM Excellent (70%). Identify key M&E credits.</p>
            <p>Target: 70% minimum (aim for 75% to provide margin)</p>
            <p>High-value M&E credits to target:</p>
            <p>Ene 01: 9 credits @ 19% = ~3.4% contribution</p>
            <p>Ene 02: 2 credits (sub-metering) = ~0.4%</p>
            <p>Hea 01: 3 credits (lighting quality) = ~0.6%</p>
            <p>Hea 04: 2 credits (thermal comfort) = ~0.4%</p>
            <p>Wat 01: 3 credits (water efficiency) = ~0.3%</p>
            <p>Pol 01: 2 credits (low GWP refrigerants) = ~0.2%</p>
            <p>M&E contribution: ~5.3% directly influenced</p>
            <p>Plus mandatory commissioning credits in Man category</p>
            <p>
              <strong>Example 2: Energy Credit Evidence Requirements</strong>
            </p>
            <p><strong>Scenario:</strong> Demonstrating compliance with Ene 01 for an Excellent rating.</p>
            <p>Ene 01 Evidence Checklist:</p>
            <p>Design Stage:</p>
            <p>- Energy model (IES-VE or TAS) with BRUKL output</p>
            <p>- EPR calculation showing improvement over Part L</p>
            <p>- M&E specification with efficiency requirements</p>
            <p>- Drawings showing renewable energy systems</p>
            <p>Post-Construction:</p>
            <p>- As-built energy model reflecting any changes</p>
            <p>- EPC certificate</p>
            <p>- Commissioning certificates for HVAC</p>
            <p>- Evidence renewables installed as designed</p>
            <p>Credits awarded: Based on actual EPR achieved</p>
            <p>
              <strong>Example 3: Selecting the Correct BREEAM Scheme</strong>
            </p>
            <p><strong>Scenario:</strong> Client has three projects - advise on appropriate BREEAM scheme.</p>
            <p>Project A: New-build warehouse</p>
            <p>→ BREEAM New Construction (Industrial)</p>
            <p>Design Stage + Post-Construction assessment</p>
            <p>Project B: Office fit-out in existing shell</p>
            <p>→ BREEAM Refurbishment & Fit-Out</p>
            <p>Part 3 (local services) + Part 4 (interior)</p>
            <p>Project C: Improving performance of existing HQ</p>
            <p>→ BREEAM In-Use</p>
            <p>Asset + Building Management assessments</p>
            <p>Annual recertification available</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Building Services Engineer's BREEAM Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain target BREEAM rating and pre-assessment report early in design</li>
              <li>Review Energy, Health & Wellbeing, Water, and Pollution categories for M&E requirements</li>
              <li>Specify sub-metering strategy aligned with Ene 02 requirements</li>
              <li>Include BREEAM compliance clauses in M&E specifications</li>
              <li>Coordinate with assessor on evidence requirements at each stage</li>
              <li>Plan commissioning to satisfy Man 01 (commissioning) and Man 04 (seasonal commissioning)</li>
            </ul>
            <p>
              <strong>Key Thresholds to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pass: <strong>≥30%</strong> | Good: <strong>≥45%</strong> | Very Good:  <strong>≥55%</strong></li>
              <li>Excellent: <strong>≥70%</strong> | Outstanding: <strong>≥85%</strong></li>
              <li>Innovation credits: Up to <strong>10% additional</strong></li>
              <li>Energy category weighting: <strong>15-19%</strong> (highest)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Late engagement:</strong> BREEAM considered after design freeze limits achievable rating</li>
                <li><strong>Missing mandatory credits:</strong> Prevents certification regardless of overall score</li>
                <li><strong>Specification gaps:</strong> Not including BREEAM requirements in M&E specs</li>
                <li><strong>Evidence management:</strong> Poor documentation makes post-construction verification difficult</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="BREEAM Excellent target slips on Mat 03 minimum standard"
            situation={
              <>
                A planning condition requires BREEAM Excellent on a 12,000 m² mixed-use scheme. Design-stage certification predicted Excellent at 71%. Post-construction, Mat 03 (Responsible Sourcing) evidence is incomplete — the steel frame package was procured without BES 6001 documentation and the contractor cannot retrospectively obtain it. Mat 03 is a minimum standard for Excellent.
              </>
            }
            whatToDo={
              <>
                Three options: (1) accept downgrade to Very Good (planning breach risk, possibly re-application required); (2) try to secure replacement BES 6001-certified material for a portion to reach the threshold (rarely possible at handover); (3) negotiate a planning variation accepting Very Good with offsetting commitments (additional BREEAM In-Use commitment, or higher BIK on operational performance). Going forward: every package on a BREEAM Excellent project must carry the responsible sourcing requirement in the procurement specification, with evidence collected at order, not at handover.
              </>
            }
            whyItMatters={
              <>
                Minimum standards are the silent killer of BREEAM ratings. Many credits can be earned by design tweaks at the eleventh hour; minimum standards almost always require procurement decisions that close out months earlier. The BREEAM Assessor Pre-Assessment is your one chance to map every minimum standard to a procurement clause.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BREEAM ratings: Pass (≥30%), Good (45%), Very Good (55%), Excellent (70%), Outstanding (85%).",
              "Nine categories + Innovation — weighted differently per scheme.",
              "Two-stage certification: Design Stage (pre-construction) + Post-Construction (after handover).",
              "Minimum standards must be met regardless of overall rating — they are non-negotiable.",
              "Licensed Assessor required; pre-assessment workshop before RIBA Stage 3 is best practice.",
              "BREEAM Excellent / Outstanding now common as planning conditions in major UK city authorities.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BREEAM assessment
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Water category
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_1;
