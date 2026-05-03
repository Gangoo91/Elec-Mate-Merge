/**
 * Module 6 · Section 6 · Subsection 6 — Post-Occupancy Evaluation
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Performance monitoring, user satisfaction, lessons learned, and continuous improvement for building services
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

const TITLE = 'Post-Occupancy Evaluation - HNC Module 6 Section 6.6';
const DESCRIPTION =
  'Master post-occupancy evaluation for building services: POE methodology, soft landings framework, performance monitoring, user satisfaction surveys, BUS methodology, lessons learned, and continuous improvement.';

const quickCheckQuestions = [
  {
    id: 'poe-definition',
    question: 'What is the primary purpose of Post-Occupancy Evaluation (POE)?',
    options: [
      'To calculate final project costs',
      'To assess building performance and user satisfaction after handover',
      'To complete snagging lists',
      'To train maintenance staff',
    ],
    correctIndex: 1,
    explanation:
      'Post-Occupancy Evaluation (POE) systematically assesses building performance and user satisfaction after handover, comparing actual outcomes against design intent to identify improvements and lessons learned.',
  },
  {
    id: 'soft-landings',
    question: 'When does the Soft Landings framework engagement begin?',
    options: [
      'At practical completion',
      'During the defects liability period',
      'At the briefing and design stage',
      'Three years after handover',
    ],
    correctIndex: 2,
    explanation:
      'Soft Landings engagement begins at the briefing and design stage (Stage 1), not at handover. This early involvement ensures performance targets are defined and the team commits to aftercare from project inception.',
  },
  {
    id: 'bus-methodology',
    question: 'What does the BUS methodology primarily measure?',
    options: [
      'Building energy consumption',
      'Occupant satisfaction with comfort and building usability',
      'Construction defects',
      'Maintenance costs',
    ],
    correctIndex: 1,
    explanation:
      'The Building Use Studies (BUS) methodology is a standardised occupant satisfaction survey measuring comfort, health, productivity, and overall building usability through benchmarked questionnaires.',
  },
  {
    id: 'performance-gap',
    question: "The 'performance gap' in building services refers to:",
    options: [
      'The gap between tender and final account',
      'The difference between predicted and actual energy performance',
      'The gap between design and construction teams',
      'The time between handover and occupation',
    ],
    correctIndex: 1,
    explanation:
      'The performance gap is the well-documented difference between predicted (design) energy performance and actual measured performance in operation, often showing buildings using 2-5 times more energy than predicted.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which Soft Landings stage covers the period 1-3 years after handover?',
    options: [
      'Stage 4: Initial Aftercare',
      'Stage 5: Extended Aftercare and POE',
      'Stage 3: Pre-Handover',
      'Stage 6: Continuous Improvement',
    ],
    correctAnswer: 1,
    explanation:
      'Stage 5 (Extended Aftercare and POE) covers the period 1-3 years after handover, during which formal POE studies, energy monitoring, and user surveys are conducted to assess long-term performance.',
  },
  {
    id: 2,
    question: 'What is the recommended minimum duration for post-handover energy monitoring?',
    options: ['3 months', '6 months', '12 months (full seasonal cycle)', '24 months'],
    correctAnswer: 2,
    explanation:
      'A minimum of 12 months monitoring is recommended to capture a full seasonal cycle, ensuring heating and cooling seasons are assessed and seasonal variations in energy use are understood.',
  },
  {
    id: 3,
    question: 'In BUS surveys, which parameter is NOT typically measured?',
    options: [
      'Thermal comfort',
      'Lighting quality',
      'Construction programme duration',
      'Air quality',
    ],
    correctAnswer: 2,
    explanation:
      'BUS surveys measure occupant satisfaction with environmental conditions (thermal comfort, lighting, air quality, noise) and building usability, not construction-related metrics like programme duration.',
  },
  {
    id: 4,
    question: "What is 'continuous commissioning' in the context of POE?",
    options: [
      'Repeating initial commissioning tests',
      'Ongoing optimisation of building systems based on performance data',
      'Training new maintenance staff',
      'Extending the defects liability period',
    ],
    correctAnswer: 1,
    explanation:
      'Continuous commissioning (also called ongoing commissioning) involves ongoing monitoring and optimisation of building systems based on operational performance data, adjusting setpoints and controls to improve efficiency.',
  },
  {
    id: 5,
    question: 'Display Energy Certificates (DECs) are required for:',
    options: [
      'All new buildings over 50m²',
      'Public buildings over 250m² frequently visited by the public',
      'Only residential properties',
      'Industrial buildings only',
    ],
    correctAnswer: 1,
    explanation:
      'DECs are required for public buildings over 250m² that are frequently visited by the public, displaying actual operational energy ratings based on metered consumption data.',
  },
  {
    id: 6,
    question: "The 'lessons learned' process should primarily feed into:",
    options: [
      'The project final account',
      'Future project briefing, design, and specifications',
      'Building insurance documentation',
      'Planning permission applications',
    ],
    correctAnswer: 1,
    explanation:
      'Lessons learned should feed into future project briefing, design standards, and specifications to prevent recurring issues and improve outcomes on subsequent projects - closing the feedback loop.',
  },
  {
    id: 7,
    question:
      'What percentage energy uplift factor do CIBSE recommend applying to design predictions?',
    options: ['5-10%', '10-20%', '20-40%', '50-100%'],
    correctAnswer: 2,
    explanation:
      'CIBSE TM54 recommends applying a 20-40% uplift factor to design energy predictions to account for the typical performance gap, providing more realistic expectations of operational energy use.',
  },
  {
    id: 8,
    question: 'Thermal comfort surveys should assess which of the following?',
    options: [
      'Only temperature',
      'Temperature, humidity, air movement, and radiant temperature',
      'Only heating system efficiency',
      'Only air conditioning capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal comfort is multifactorial, requiring assessment of air temperature, humidity, air movement/draughts, and radiant temperature from surfaces - all contributing to perceived comfort per BS EN ISO 7730.',
  },
  {
    id: 9,
    question: 'What is the purpose of sub-metering in POE?',
    options: [
      'To reduce meter reading workload',
      'To identify energy use by system, zone, or tenant for targeted improvements',
      'To comply with planning conditions',
      'To satisfy building control requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Sub-metering enables disaggregation of energy use by system (HVAC, lighting, small power), zone, or tenant, allowing identification of high consumers and targeted efficiency improvements.',
  },
  {
    id: 10,
    question: 'Which document provides guidance on undertaking POE in the UK?',
    options: [
      'BS 7671',
      'CIBSE Guide L and TM22',
      'Building Regulations Part L',
      'HSE Guidance Note 85',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Guide L (Sustainability) and TM22 (Energy Assessment and Reporting Methodology) provide comprehensive guidance on undertaking POE, energy assessment, and building performance evaluation.',
  },
  {
    id: 11,
    question: 'The Soft Landings Champion role is responsible for:',
    options: [
      'Signing off defects',
      'Coordinating aftercare activities and maintaining focus on performance outcomes',
      'Approving final accounts',
      'Issuing practical completion certificates',
    ],
    correctAnswer: 1,
    explanation:
      'The Soft Landings Champion coordinates aftercare activities, maintains focus on performance outcomes throughout the project, and ensures the team delivers on Soft Landings commitments from design through occupation.',
  },
  {
    id: 12,
    question: 'Which factor commonly contributes to the building performance gap?',
    options: [
      'Accurate design assumptions',
      'Unregulated loads, extended operating hours, and poor controls commissioning',
      'Effective building handover',
      'Comprehensive O&M documentation',
    ],
    correctAnswer: 1,
    explanation:
      'Common contributors to the performance gap include: unregulated loads not in design calculations, extended actual operating hours, poor controls commissioning, user behaviour differences, and specification changes during construction.',
  },
];

const faqs = [
  {
    question: 'When should POE be conducted after building handover?',
    answer:
      'POE should be conducted at multiple stages: initial walkthrough within weeks of occupation to identify immediate issues, a formal 12-month assessment after a full seasonal cycle, and ideally a 3-year assessment for long-term performance trends. The Soft Landings framework recommends extended aftercare activities spanning 1-3 years post-handover to capture operational learning and optimise performance.',
  },
  {
    question: 'How do you measure user satisfaction objectively?',
    answer:
      'Objective measurement uses standardised survey instruments like the BUS methodology, which provides benchmarked questionnaires covering thermal comfort, air quality, lighting, noise, and overall satisfaction. Results are compared against a database of similar buildings, providing percentile rankings. Surveys should achieve minimum response rates (typically &gt;40%) and use consistent timing to enable valid comparisons.',
  },
  {
    question: 'What should be included in a lessons learned report?',
    answer:
      'A comprehensive lessons learned report should include: design assumptions versus actual performance data, user feedback summary and themes, technical issues encountered and resolutions, successful innovations worth repeating, recommendations for specification changes, maintenance and operational observations, and cost implications. Reports should be disseminated to design teams, client organisations, and industry bodies where appropriate.',
  },
  {
    question: 'Who is responsible for POE activities?',
    answer:
      "Responsibility varies by contract and project structure. Under Soft Landings, the design team maintains involvement through extended aftercare. Building Performance Evaluation (BPE) may be conducted by the client's FM team, specialist consultants, or the original design team. Clarity on POE responsibilities should be established at project inception and included in appointments.",
  },
  {
    question: 'How does POE relate to BREEAM In-Use certification?',
    answer:
      'BREEAM In-Use is a certification scheme for operational buildings that complements POE activities. It assesses three parts: Asset Performance (building design), Building Management, and Occupier Management. POE data directly supports BREEAM In-Use assessments and certification, while the certification framework provides a structured approach to ongoing performance evaluation.',
  },
  {
    question: 'What technology supports effective performance monitoring?',
    answer:
      'Effective monitoring relies on Building Management Systems (BMS) with trend logging, sub-metering of major systems, automatic meter reading (AMR), energy dashboards for visualisation, and Building Analytics platforms that use algorithms to identify faults and optimisation opportunities. Integration with utility data and weather information enables normalised performance comparison.',
  },
];

const HNCModule6Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 6"
            title="Post-Occupancy Evaluation"
            description="Performance monitoring, user satisfaction, lessons learned, and continuous improvement for building services"
            tone="purple"
          />

          <TLDR
            points={[
              "Post-Occupancy Evaluation (POE) systematically reviews building performance after handover — measuring energy, occupant satisfaction, IEQ (indoor environmental quality), and operational issues — to close the design-vs-actual gap and inform future design.",
              "CIBSE TM61 (operational performance), TM62 (occupant satisfaction surveys) and TM63 (in-use energy benchmarking) are the institutional UK methodology — turning POE from a discretionary post-project task into a structured engineering discipline.",
              "BUS (Building Use Studies) Methodology and Soft Landings (BSRIA BG 54) are the practical delivery frameworks — most major UK developers and public-sector clients now contractually require POE on completed projects.",
            ]}
          />

          <RegsCallout
            source="CIBSE TM61–63 (Operational Performance) + Soft Landings BSRIA BG 54 + Government Soft Landings (GSL)"
            clause="Post-occupancy evaluation shall be carried out at appropriate intervals (typically 6 months and 12-24 months post-handover) using the methodology in CIBSE TM61-63. The evaluation shall include energy and water consumption analysis benchmarked against design predictions and industry norms (TM63), occupant satisfaction surveys covering thermal comfort, indoor air quality, lighting, acoustics and overall workplace quality (TM62 / BUS Methodology), and operational performance review of building services systems against the commissioned strategy (TM61)."
            meaning={
              <>
                CIBSE TM61–63 is the UK technical reference for POE. Government Soft Landings (GSL) makes POE mandatory on central government projects. BUS Methodology survey is the most widely-used occupant satisfaction tool in the UK. POE outputs feed lessons learned into future projects and inform corrective action (re-commissioning, controls adjustment, training) on the current building.
              </>
            }
            cite="Source: CIBSE TM61 (2020), TM62 (2020), TM63 (2020) — cibse.org; BSRIA BG 54 Soft Landings Framework (2018); Government Soft Landings policy — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain POE methodology and its role in building performance",
              "Apply the Soft Landings framework to building services projects",
              "Design performance monitoring strategies using sub-metering",
              "Conduct user satisfaction surveys using BUS methodology",
              "Analyse the performance gap and implement closure strategies",
              "Develop lessons learned processes for continuous improvement",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="POE Fundamentals and Soft Landings">
            <p>Post-Occupancy Evaluation (POE) is the systematic assessment of buildings in use, comparing actual performance against design intent. It addresses a critical industry failing: the disconnection between design predictions and operational reality that results in buildings consuming 2-5 times more energy than anticipated.</p>
            <p><strong>Key POE objectives:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Performance verification:</strong> Confirm systems deliver design intent</li>
              <li><strong>User satisfaction:</strong> Assess occupant comfort and productivity</li>
              <li><strong>Operational optimisation:</strong> Identify and implement improvements</li>
              <li><strong>Lessons learned:</strong> Feed findings back to future designs</li>
            </ul>
            <p><strong>Soft Landings Framework Stages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1:</strong> Inception and Briefing — Define performance targets, agree POE scope</li>
              <li><strong>Stage 2:</strong> Design Development — Reality checking, metering strategy, user input</li>
              <li><strong>Stage 3:</strong> Pre-Handover — Commissioning reviews, O&M preparation</li>
              <li><strong>Stage 4:</strong> Initial Aftercare (0-12 months) — Resident on-site support, fine-tuning</li>
              <li><strong>Stage 5:</strong> Extended Aftercare (1-3 years) — Formal POE, seasonal reviews, user surveys</li>
            </ul>
            <p><strong>Key principle:</strong> Soft Landings commits the design team to operational outcomes, not just design delivery - a fundamental shift from traditional project completion approaches.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Performance Monitoring and Sub-Metering">
            <p>Effective performance monitoring requires comprehensive metering strategies that enable disaggregation of energy use by system, zone, and end use. Without sub-metering, identifying performance issues and optimisation opportunities becomes impossible.</p>
            <p><strong>Energy Metering</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fiscal meters for billing</li>
              <li>Sub-meters by system/zone</li>
              <li>Automatic meter reading</li>
              <li>Half-hourly data logging</li>
            </ul>
            <p><strong>Environmental Monitoring</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Temperature and humidity</li>
              <li>CO2 levels (air quality)</li>
              <li>Lux levels (lighting)</li>
              <li>Acoustic measurements</li>
            </ul>
            <p><strong>System Performance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plant efficiency (COP/EER)</li>
              <li>Flow rates and pressures</li>
              <li>Operating hours</li>
              <li>Control system logs</li>
            </ul>
            <p><strong>Recommended Sub-Metering Strategy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC:</strong> Chillers, boilers, AHUs, pumps, fans — Plant efficiency analysis</li>
              <li><strong>Lighting:</strong> General, emergency, external — Lighting energy density (W/m²)</li>
              <li><strong>Small Power:</strong> Floor/zone distribution boards — Unregulated load assessment</li>
              <li><strong>Lifts and Escalators:</strong> Per lift/bank — Transportation energy</li>
              <li><strong>Server Rooms:</strong> IT load and cooling — PUE calculation</li>
            </ul>
            <p><strong>Monitoring tip:</strong> Data without analysis is useless - implement automated fault detection and diagnostics (FDD) to convert data into actionable insights.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="User Satisfaction and BUS Methodology">
            <p>User satisfaction assessment provides essential feedback on how occupants experience the building environment. The Building Use Studies (BUS) methodology offers a standardised, benchmarked approach enabling comparison against hundreds of similar buildings.</p>
            <p><strong>BUS Survey Categories</strong></p>
            <p><strong>Environmental Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Temperature in winter and summer</li>
              <li>- Air quality (fresh/stuffy, dry/humid)</li>
              <li>- Lighting (natural and artificial)</li>
              <li>- Noise (from inside and outside)</li>
            </ul>
            <p><strong>Building Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Overall comfort</li>
              <li>- Design and image</li>
              <li>- Needs (does building meet needs?)</li>
              <li>- Productivity (perceived impact)</li>
              <li>- Health (perceived impact)</li>
            </ul>
            <p><strong>Survey Implementation Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Timing:</strong> Conduct surveys at consistent times (avoid holiday periods, extreme weather)</li>
              <li><strong>Response rate:</strong> Target &gt;40% minimum for statistical validity</li>
              <li><strong>Anonymity:</strong> Ensure responses cannot be traced to individuals</li>
              <li><strong>Communication:</strong> Explain purpose and how results will be used</li>
              <li><strong>Follow-up:</strong> Share results and planned actions with respondents</li>
            </ul>
            <p><strong>Interpreting BUS Results</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&gt;75th percentile:</strong> Excellent - top quartile performance — Maintain, share best practice</li>
              <li><strong>50th-75th percentile:</strong> Good - above average — Minor improvements possible</li>
              <li><strong>25th-50th percentile:</strong> Fair - below average — Investigate and address issues</li>
              <li><strong>&lt;25th percentile:</strong> Poor - bottom quartile — Priority intervention required</li>
            </ul>
            <p><strong>User engagement:</strong> Involve occupants in POE from the start - they provide invaluable operational insight and their buy-in improves survey response rates.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Lessons Learned and Continuous Improvement">
            <p>The ultimate value of POE lies in feeding lessons learned back into future projects. Without this feedback loop, the industry repeats the same mistakes. Continuous commissioning extends this principle to ongoing building optimisation.</p>
            <p><strong>Performance Gap Causes and Solutions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unregulated loads excluded:</strong> +30-50% energy use — TM54 operational energy modelling</li>
              <li><strong>Extended operating hours:</strong> +20-40% energy use — Realistic occupancy assumptions</li>
              <li><strong>Poor controls commissioning:</strong> +15-30% energy use — Extended commissioning, seasonal proving</li>
              <li><strong>Specification changes:</strong> Variable — Change impact assessment on energy</li>
              <li><strong>User behaviour differences:</strong> +10-20% energy use — User guides, displays, engagement</li>
            </ul>
            <p><strong>Continuous Commissioning</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ongoing BMS trend analysis</li>
              <li>Seasonal setpoint optimisation</li>
              <li>Fault detection and diagnostics</li>
              <li>Preventive maintenance triggers</li>
              <li>Energy baseline tracking</li>
            </ul>
            <p><strong>Lessons Learned Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design assumptions to revise</li>
              <li>Specification improvements</li>
              <li>Commissioning process changes</li>
              <li>Handover documentation gaps</li>
              <li>Innovations to repeat</li>
            </ul>
            <p><strong>Feedback Loop Implementation</strong></p>
            <p><strong>Step 1 - Capture:</strong> Document findings systematically using standard templates</p>
            <p><strong>Step 2 - Analyse:</strong> Identify root causes, not just symptoms</p>
            <p><strong>Step 3 - Validate:</strong> Review findings with project team and client</p>
            <p><strong>Step 4 - Disseminate:</strong> Share through design standards, briefing documents, CPD</p>
            <p><strong>Step 5 - Implement:</strong> Update specifications, checklists, and procedures</p>
            <p><strong>Step 6 - Verify:</strong> Check subsequent projects for improvement</p>
            <p><strong>Industry improvement:</strong> Consider contributing anonymised POE data to initiatives like CarbonBuzz to help close the industry-wide performance gap.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Energy Performance Gap Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> An office building was designed to achieve 85 kWh/m²/year but is consuming 195 kWh/m²/year after 12 months. Analyse the gap.</p>
            <p>Performance gap analysis:</p>
            <p>Design prediction: 85 kWh/m²/year</p>
            <p>Actual consumption: 195 kWh/m²/year</p>
            <p>Gap: 110 kWh/m²/year (129% over prediction)</p>
            <p>Sub-meter analysis reveals:</p>
            <p>- HVAC: 52 kWh/m² (design 45) → +7 kWh/m²</p>
            <p>- Lighting: 28 kWh/m² (design 22) → +6 kWh/m²</p>
            <p>- Small power: 85 kWh/m² (design 18) → +67 kWh/m²</p>
            <p>- Lifts/other: 30 kWh/m² (not in design) → +30 kWh/m²</p>
            <p>Key finding: 88% of gap from unregulated loads</p>
            <p>Action: Implement small power management, review</p>
            <p>TM54 methodology for future projects</p>
            <p>
              <strong>Example 2: BUS Survey Results Interpretation</strong>
            </p>
            <p><strong>Scenario:</strong> A newly occupied building scores 4.2/7 for summer temperature comfort (benchmark mean 4.8). Interpret and recommend actions.</p>
            <p>BUS survey analysis:</p>
            <p>Parameter: Temperature in summer</p>
            <p>Building score: 4.2/7</p>
            <p>Benchmark mean: 4.8/7</p>
            <p>Percentile: 32nd (below average)</p>
            <p>Associated comments analysis:</p>
            <p>- "Too hot in afternoon" (47 mentions)</p>
            <p>- "Solar glare from windows" (23 mentions)</p>
            <p>- "Cannot control temperature" (18 mentions)</p>
            <p>Recommended investigation:</p>
            <p>1. Review solar shading commissioning</p>
            <p>2. Check cooling setpoints and schedules</p>
            <p>3. Assess local control provision</p>
            <p>4. Log afternoon internal temperatures</p>
            <p>
              <strong>Example 3: Lessons Learned Documentation</strong>
            </p>
            <p><strong>Scenario:</strong> Document a lesson learned regarding lighting control commissioning issues discovered during POE.</p>
            <p>Lesson learned template:</p>
            <p><strong>Issue:</strong> Lighting controls operating inefficiently</p>
            <p><strong>Discovery:</strong> 12-month POE energy analysis</p>
            <p><strong>Impact:</strong> +15% lighting energy consumption</p>
            <p><strong>Root cause:</strong></p>
            <p>- Daylight dimming sensors facing wrong direction</p>
            <p>- Absence detection timeout set to 30 min (spec: 10 min)</p>
            <p>- Scene settings not configured post-handover</p>
            <p><strong>Recommendation for future projects:</strong></p>
            <p>1. Add lighting controls to extended commissioning</p>
            <p>2. Include sensor orientation check in ITP</p>
            <p>3. Require scene programming in commissioning scope</p>
            <p>4. Specify post-occupancy lighting adjustment period</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>POE Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define POE scope and objectives during project inception</li>
              <li>Establish performance targets and monitoring strategy</li>
              <li>Ensure sub-metering installed per CIBSE TM39 guidance</li>
              <li>Plan user surveys for 12 months post-occupation</li>
              <li>Allocate budget for POE activities (typically 0.5-1% of project cost)</li>
              <li>Identify Soft Landings Champion and responsibilities</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Performance gap: typically <strong>2-5 times</strong> design prediction</li>
              <li>Monitoring period: <strong>12 months minimum</strong> for seasonal cycle</li>
              <li>Survey response rate: <strong>&gt;40%</strong> for validity</li>
              <li>TM54 uplift factor: <strong>20-40%</strong> on design predictions</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Starting POE at handover</strong> - engagement should begin at project inception</li>
                <li><strong>Insufficient metering</strong> - cannot analyse what you cannot measure</li>
                <li><strong>Ignoring user feedback</strong> - occupants provide critical operational insight</li>
                <li><strong>No feedback loop</strong> - lessons not captured or disseminated waste the POE investment</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="POE survey reveals lighting controls source of major occupant complaint"
            situation={
              <>
                A 12-month POE on a new office building shows the lighting controls (DALI scenes with daylight harvesting and presence detection) are the largest single source of occupant complaint — 68% rate dissatisfied. The energy data (TM63) shows lighting consumption 35% below benchmark — the design works technically, but occupants find the dimming response erratic and find ceiling sensors triggering unwanted scene changes during meetings.
              </>
            }
            whatToDo={
              <>
                Investigate cause: typically (1) commissioning set scene transitions too rapid for human comfort (target 30–60 second fade); (2) presence sensors not zoned tightly enough — meeting rooms picked up by adjacent corridor sensors; (3) daylight harvesting target lux too aggressive (350 lux design vs occupant preference closer to 500). Re-commission with longer fades, tighter zoning, increased target lux. Re-survey at 6 months. Update the design standard for future projects: DALI commissioning is a comfort design decision, not just a technical setting.
              </>
            }
            whyItMatters={
              <>
                POE catches the gap between technical performance and occupant experience. Many "energy-saving" features fail in practice because the user experience is not designed alongside the energy intent. Lighting controls is the most common offender. Without POE, this learning never feeds back into design — and the same mistakes are repeated on the next project.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "POE = systematic review post-handover — energy, IEQ, occupant satisfaction, operational issues.",
              "CIBSE TM61 (operational), TM62 (satisfaction), TM63 (energy benchmark) — UK methodology.",
              "BUS Methodology survey is the most widely-used UK occupant satisfaction tool.",
              "Soft Landings (BSRIA BG 54) and Government Soft Landings (GSL) are the delivery frameworks.",
              "Standard intervals: 6 months (settling-in) + 12-24 months (full annual cycle).",
              "POE feeds learning into future design — lessons learned register.",
              "Lighting controls + thermal comfort are the most common occupant complaints.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Circular economy principles
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_6;
