/**
 * Module 2 · Section 6 · Subsection 5 — System Integration
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Multi-service coordination, commissioning, handover, building log books and
 *   Soft Landings — turning a coordinated design into a building that performs
 *   from day one.
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

const TITLE = 'System Integration - HNC Module 2 Section 6.5';
const DESCRIPTION =
  'Master multi-service coordination in building services: system integration, optimisation strategies, commissioning processes, handover procedures, and building log books.';

const quickCheckQuestions = [
  {
    id: 'commissioning-purpose',
    question: 'What is the primary purpose of commissioning?',
    options: [
      'To train maintenance staff',
      'To complete paperwork',
      'To satisfy planning conditions',
      'To verify systems perform as designed',
    ],
    correctIndex: 3,
    explanation:
      'Commissioning verifies that installed systems perform according to design intent, achieving specified capacities, efficiencies, and control responses. It bridges the gap between installation and operation.',
  },
  {
    id: 'bms-integration',
    question:
      'Which protocol is most commonly used for BMS integration of multiple building services?',
    options: [
      'WiFi',
      'Bluetooth',
      'BACnet',
      'Modbus only',
    ],
    correctIndex: 2,
    explanation:
      "BACnet (Building Automation and Control Network) is the ISO standard protocol for building services integration, allowing different manufacturers' equipment to communicate on a common network.",
  },
  {
    id: 'log-book-content',
    question: 'A building log book should contain:',
    options: [
      'All live conductors (line and neutral) connected together',
      'Operating and maintenance instructions for all systems',
      'Exposed parts may become live under fault conditions',
      'Stop the source, contain the spill, report to the Environment Agency',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE TM31 specifies that building log books should contain essential operating and maintenance information for all building services, enabling effective ongoing management.',
  },
  {
    id: 'soft-landings',
    question: 'Soft Landings extended aftercare typically lasts:',
    options: [
      '3 years',
      '6 months',
      '1 month',
      '10 years',
    ],
    correctIndex: 0,
    explanation:
      'The Soft Landings framework specifies a 3-year aftercare period with regular reviews, allowing building performance to be monitored, optimised, and issues resolved as they emerge in actual operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "BSRIA BG6 'A Design Framework for Building Services' recommends coordination meetings at which stage?",
    options: [
      'A log book recording all tests, inspections, and defects',
      'Throughout design, construction, and commissioning',
      'To provide brief on-site safety briefings on specific topics',
      'Category III — serious, irreversible or fatal risks',
    ],
    correctAnswer: 1,
    explanation:
      'BG6 recommends regular coordination meetings throughout the project lifecycle - design workshops, installation reviews, and commissioning coordination to ensure integrated outcomes.',
  },
  {
    id: 2,
    question: 'Which document typically defines commissioning responsibilities and procedures?',
    options: [
      "Architect's specification",
      'Building Regulations Approved Document L',
      'CIBSE Commissioning Codes',
      'Health and Safety file',
    ],
    correctAnswer: 2,
    explanation:
      'CIBSE Commissioning Codes (A for Air systems, W for Water, R for Refrigeration, etc.) define standard procedures, acceptable tolerances, and documentation requirements for commissioning.',
  },
  {
    id: 3,
    question: "What is 'witness testing' in commissioning?",
    options: [
      'COBie data and digital asset information',
      'Buildings requiring an EPC under Part L',
      'Equipment schedules, maintenance procedures, and spare parts',
      'Testing in the presence of the design team or client',
    ],
    correctAnswer: 3,
    explanation:
      'Witness testing involves demonstrations of system performance in the presence of the client, design team, or commissioning manager to verify critical parameters meet specification.',
  },
  {
    id: 4,
    question: 'The Building Log Book (CIBSE TM31) is required for:',
    options: [
      'Buildings requiring an EPC under Part L',
      'Corrosion inhibitor and biocide treatment',
      'After all dead tests and PFC measurement',
      'The ratio of minimum to average illuminance',
    ],
    correctAnswer: 0,
    explanation:
      'Part L requires a building log book for non-domestic buildings to facilitate energy-efficient operation. TM31 provides guidance on content and format.',
  },
  {
    id: 5,
    question: "What is 'seasonal commissioning'?",
    options: [
      'Equipment schedules, maintenance procedures, and spare parts',
      'Testing systems under both heating and cooling conditions',
      'To ensure electrical supplies match equipment needs and controls integrate',
      'BMS setpoint and schedule adjustment based on actual use',
    ],
    correctAnswer: 1,
    explanation:
      'Seasonal commissioning tests building services under both heating and cooling conditions, which may require returning to site after initial handover to verify winter/summer performance.',
  },
  {
    id: 6,
    question: 'BIM Level 2 requires handover of:',
    options: [
      'Evaluate against expected service life',
      'Personnel, tools, materials, and time requirements',
      'COBie data and digital asset information',
      'All of the listed verifications',
    ],
    correctAnswer: 2,
    explanation:
      'BIM Level 2 (now UK BIM Framework) requires structured data handover using COBie (Construction Operations Building Information Exchange) format for asset management.',
  },
  {
    id: 7,
    question: 'System optimisation during the first year typically includes:',
    options: [
      'A list of defects and incomplete items to be rectified',
      'Testing in the presence of the design team or client',
      'Equipment schedules, maintenance procedures, and spare parts',
      'BMS setpoint and schedule adjustment based on actual use',
    ],
    correctAnswer: 3,
    explanation:
      'First-year optimisation involves fine-tuning BMS control strategies, adjusting schedules to match actual occupancy, and optimising setpoints - not changing fundamental design or equipment.',
  },
  {
    id: 8,
    question: 'CIBSE Code W covers commissioning of:',
    options: [
      'Water distribution systems',
      'May require modified procedures',
      '6 months of practical completion',
      'Introduction, body, conclusion',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE Commissioning Code W covers water distribution systems including heating, chilled water, and condenser water pipework - flow rates, balancing, and pressure testing.',
  },
  {
    id: 9,
    question: 'What information should O&M manuals contain?',
    options: [
      'To ensure electrical supplies match equipment needs and controls integrate',
      'Equipment schedules, maintenance procedures, and spare parts',
      'Testing systems under both heating and cooling conditions',
      'A list of defects and incomplete items to be rectified',
    ],
    correctAnswer: 1,
    explanation:
      'O&M manuals should contain: equipment schedules with model numbers, maintenance procedures and frequencies, spare parts lists, as-built drawings, and commissioning records.',
  },
  {
    id: 10,
    question: 'Why is coordination between mechanical and electrical services critical?',
    options: [
      'Testing systems under both heating and cooling conditions',
      'Equipment schedules, maintenance procedures, and spare parts',
      'To ensure electrical supplies match equipment needs and controls integrate',
      'A list of defects and incomplete items to be rectified',
    ],
    correctAnswer: 2,
    explanation:
      "M&E coordination ensures electrical supplies (capacity, protection, phase) match mechanical equipment; control interfaces work correctly; and cable routes don't clash with ductwork/pipework.",
  },
  {
    id: 11,
    question: "The 'defects liability period' typically lasts:",
    options: [
      '1 week',
      '6 months',
      '5 years',
      '12 months',
    ],
    correctAnswer: 3,
    explanation:
      'The standard defects liability period is 12 months from practical completion, during which the contractor must rectify defects at their cost. This period is essential for seasonal commissioning.',
  },
  {
    id: 12,
    question: "What is a 'snagging list'?",
    options: [
      'A list of defects and incomplete items to be rectified',
      'COBie data and digital asset information',
      'Testing in the presence of the design team or client',
      'Buildings requiring an EPC under Part L',
    ],
    correctAnswer: 0,
    explanation:
      'A snagging list documents defects, incomplete works, and items not meeting specification, compiled during inspections prior to or after practical completion for contractor rectification.',
  },
];

const faqs = [
  {
    question: 'Why does commissioning often get compressed at the end of projects?',
    answer:
      'Programme delays during construction typically eat into commissioning time while the completion date remains fixed. This is a major cause of building performance problems. Best practice is to protect commissioning time in programmes, start commissioning progressively as systems complete, and resist pressure to shortcut procedures. Inadequate commissioning creates long-term operational problems.',
  },
  {
    question: "What's the difference between commissioning and testing?",
    answer:
      'Testing verifies individual components work (e.g., a fan runs, a valve opens). Commissioning verifies the complete system achieves design intent - correct airflows throughout the building, proper temperature control, systems working together. Commissioning includes testing but goes further to demonstrate integrated performance.',
  },
  {
    question: 'How should the building log book be maintained after handover?',
    answer:
      'The building operator should keep the log book updated with: any changes to systems or controls; maintenance records; energy consumption data; and occupancy changes. CIBSE TM31 recommends annual log book reviews. The log book should be a living document that reflects current building operation, not just as-built information.',
  },
  {
    question: 'What is progressive commissioning and when should it be used?',
    answer:
      "Progressive commissioning starts testing individual systems as they're installed rather than waiting for all systems to be complete. It's especially valuable for large buildings or phased handovers. Benefits include: early identification of problems; spreading commissioning workload; allowing time for seasonal testing; and reducing end-of-project pressure.",
  },
  {
    question: 'How do I handle commissioning when multiple contractors are involved?',
    answer:
      'Appoint a commissioning manager to coordinate across packages. Establish clear interface responsibilities in contracts. Hold regular commissioning coordination meetings. Define witness test requirements and notification procedures. Ensure all parties understand their commissioning scope and how it interfaces with others.',
  },
  {
    question: 'What training should building operators receive at handover?',
    answer:
      'Operators should receive training on: BMS operation and common adjustments; system start-up and shutdown procedures; filter changes and basic maintenance; alarm response procedures; energy monitoring interpretation; and emergency procedures. Training should be hands-on with the actual installed systems, not just generic instruction.',
  },
];

const HNCModule2Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 5"
            title="System Integration"
            description="Multi-service coordination, commissioning, handover, and building log books."
            tone="purple"
          />

          <TLDR
            points={[
              'You coordinate HVAC, electrical, public health, fire, security and lifts via a clear interface schedule and BIM clash-detection cycle.',
              'You apply BSRIA BG49/BG50 commissioning and CIBSE Commissioning Codes A–C as the contractual standards for AHU, water and lighting commissioning.',
              'You drive Soft Landings (BSRIA BG54) — the framework that bridges design intent, commissioning, handover and 3-year aftercare.',
              'You produce a building log book per Approved Document L — the as-built operational manual the FM team will use for the building&rsquo;s life.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (Building Log Book); CIBSE TM31 Building Logbook Toolkit"
            clause="Reasonable provision shall be made for the building log book to give the operator and occupier sufficient information to operate the building in such a manner as to use no more fuel and power than is reasonable in the circumstances."
            meaning={
              <>
                Approved Document L makes the building log book a legal handover deliverable.
                As HNC engineer you compile the log book using TM31 as the template, with the
                commissioning records, O&amp;M data, training records and Soft Landings
                aftercare plan. No log book = no L compliance sign-off.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L — gov.uk; CIBSE TM31 Building Logbook Toolkit; BSRIA BG54 Soft Landings Framework; CIBSE Commissioning Codes A–C."
          />

          <LearningOutcomes
            outcomes={[
              'Understand multi-service coordination requirements',
              'Describe commissioning processes and documentation',
              'Explain handover procedures and O&M requirements',
              'Understand building log book content and purpose',
              'Apply Soft Landings principles for aftercare',
              'Recognise system optimisation opportunities',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Multi-Service Coordination"
            plainEnglish="Heating, cooling, vent, lighting, fire, security, lifts - none of them work in isolation. Coordination meetings and a clear interface schedule keep them out of each other's way."
          >
            <p>
              Modern buildings contain multiple interacting services - heating, cooling,
              ventilation, lighting, fire safety, security, and lifts. Effective coordination
              ensures these systems work together efficiently without conflicts.
            </p>
            <p>
              <strong>Key coordination areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spatial:</strong> Ductwork, pipework, cables sharing routes
              </li>
              <li>
                <strong>Electrical:</strong> Power supplies matching equipment needs
              </li>
              <li>
                <strong>Controls:</strong> BMS integration of all services
              </li>
              <li>
                <strong>Structural:</strong> Plant room loading, penetrations
              </li>
              <li>
                <strong>Fire:</strong> Dampers, barriers, smoke control integration
              </li>
            </ul>
            <p>
              <strong>BMS integration protocols:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BACnet:</strong> Building automation - ISO 16484-5, most common
              </li>
              <li>
                <strong>Modbus:</strong> Industrial equipment - simple, widely supported
              </li>
              <li>
                <strong>LON:</strong> Distributed control - peer-to-peer network
              </li>
              <li>
                <strong>KNX:</strong> Lighting, blinds - European standard
              </li>
              <li>
                <strong>DALI:</strong> Lighting control - digital addressable
              </li>
            </ul>
            <p>
              <strong>Coordination workflow (BSRIA BG6):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design coordination workshops (RIBA Stage 3)</li>
              <li>Spatial coordination (clash detection)</li>
              <li>Interface schedules between packages</li>
              <li>Commissioning coordination meetings</li>
              <li>Integrated witness testing</li>
              <li>Handover coordination</li>
            </ul>
            <p>
              <strong>Key principle:</strong> Coordination costs time and money during design but
              saves far more during construction and operation. Early investment in coordination
              pays dividends.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Commissioning Process"
            plainEnglish="Commissioning is more than testing - it's proving the whole system delivers what was designed. CIBSE Codes A/W/R/B/C/L tell you how, with set tolerances."
          >
            <p>
              Commissioning verifies that installed building services perform according to design
              intent. It's not simply testing - it's the systematic process of achieving, verifying,
              and documenting performance.
            </p>
            <p>
              <strong>CIBSE Commissioning Codes (code / coverage / key tests):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Code A - Air distribution - airflow, pressure, duct leakage</li>
              <li>Code W - Water distribution - flow rates, balancing, pressure</li>
              <li>Code R - Refrigeration - capacity, efficiency, charge</li>
              <li>Code B - Boilers - output, efficiency, controls</li>
              <li>Code C - Controls/BMS - point-to-point, sequences</li>
              <li>Code L - Lighting - lux levels, controls</li>
            </ul>
            <p>
              <strong>Commissioning stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-commissioning:</strong> Visual checks, cleaning, flushing
              </li>
              <li>
                <strong>Static commissioning:</strong> Individual component tests
              </li>
              <li>
                <strong>Dynamic commissioning:</strong> System running tests
              </li>
              <li>
                <strong>Regulation:</strong> Balancing, setpoint adjustment
              </li>
              <li>
                <strong>Witness testing:</strong> Demonstrations to client
              </li>
              <li>
                <strong>Seasonal:</strong> Testing in heating and cooling modes
              </li>
            </ul>
            <p>
              <strong>Typical commissioning tolerances:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Airflow (main duct):</strong> ±5% of design
              </li>
              <li>
                <strong>Airflow (terminals):</strong> ±10% of design
              </li>
              <li>
                <strong>Water flow:</strong> ±10% of design
              </li>
              <li>
                <strong>Room temperature:</strong> ±1°C of setpoint
              </li>
              <li>
                <strong>Illuminance:</strong> 0.9 × design (minimum)
              </li>
            </ul>
            <p>
              <strong>Critical success factor:</strong> Allow adequate time for commissioning.
              Compressed commissioning is a primary cause of building performance problems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Handover and O&M Documentation"
            plainEnglish="Handover transfers the design intent to the operator. O&M manuals, as-builts, training and a building log book are all part of the package - skip any of them and the building underperforms."
          >
            <p>
              Effective handover transfers knowledge from the design and construction team to those
              who will operate and maintain the building. Poor handover leads to inefficient
              operation and performance degradation.
            </p>
            <p>
              <strong>O&amp;M manual contents - equipment information:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment schedules with model numbers</li>
              <li>Data sheets and specifications</li>
              <li>Installation certificates</li>
              <li>Warranty information</li>
              <li>Spare parts lists</li>
            </ul>
            <p>
              <strong>O&amp;M manual contents - operating information:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operating procedures</li>
              <li>Maintenance schedules</li>
              <li>As-built drawings</li>
              <li>Commissioning records</li>
              <li>BMS points list and graphics</li>
            </ul>
            <p>
              <strong>Handover process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Draft O&amp;M manuals reviewed before practical completion</li>
              <li>Witness tests completed and documented</li>
              <li>Operator training delivered (hands-on with systems)</li>
              <li>Snagging inspection completed</li>
              <li>Final O&amp;M manuals and as-builts delivered</li>
              <li>Building log book handed over</li>
              <li>Practical completion certificate issued</li>
              <li>Defects liability period begins (typically 12 months)</li>
            </ul>
            <p>
              <strong>Training requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BMS operation and common adjustments</li>
              <li>System start-up and shutdown procedures</li>
              <li>Routine maintenance (filter changes, etc.)</li>
              <li>Alarm response procedures</li>
              <li>Emergency procedures</li>
              <li>Energy monitoring interpretation</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Video record training sessions for future reference
              and new staff members.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Building Log Books and Soft Landings"
            plainEnglish="The log book is the operator's manual for the whole building. Soft Landings extends that with three years of structured aftercare to close the performance gap."
          >
            <p>
              The building log book is a regulatory requirement under Part L, providing essential
              information for energy-efficient operation. Soft Landings extends this with structured
              aftercare to close the performance gap.
            </p>
            <p>
              <strong>Building log book contents (CIBSE TM31):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building description: floor areas, use, occupancy</li>
              <li>Energy systems: plant schedules, efficiencies</li>
              <li>Control strategies: setpoints, schedules, optimisation</li>
              <li>Metering: meter locations, what they measure</li>
              <li>Target performance: design energy, benchmarks</li>
              <li>Maintenance: key maintenance affecting energy</li>
            </ul>
            <p>
              <strong>Soft Landings framework:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1:</strong> Inception and briefing - set performance targets
              </li>
              <li>
                <strong>Stage 2:</strong> Design development - reality checks on targets
              </li>
              <li>
                <strong>Stage 3:</strong> Pre-handover - prepare for operation
              </li>
              <li>
                <strong>Stage 4:</strong> Initial aftercare (first month) - intensive support
              </li>
              <li>
                <strong>Stage 5:</strong> Extended aftercare (3 years) - monitoring and tuning
              </li>
            </ul>
            <p>
              <strong>Soft Landings benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduced performance gap through early identification of issues</li>
              <li>Better operator understanding of design intent</li>
              <li>Continuous improvement over first 3 years</li>
              <li>Feedback to design teams for future projects</li>
              <li>Aligns with BREEAM Man 01 credits</li>
            </ul>
            <p>
              <strong>Industry direction:</strong> Soft Landings is increasingly required for public
              sector projects and BREEAM assessments, recognising that design intent only matters if
              achieved in operation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three scenarios covering a commissioning programme, a fire/HVAC interface, and first-year BMS optimisation closing the energy gap."
          >
            <p>
              <strong>Example 1 - Commissioning schedule:</strong> A new 3-storey office building
              with VAV air conditioning.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Week 1-2: Pre-commissioning - ductwork leakage tests, pipework pressure tests, electrical continuity and IR tests</li>
              <li>Week 3-4: Static commissioning - individual fan rotation checks, pump rotation and isolation, damper and valve stroke tests</li>
              <li>Week 5-6: Dynamic commissioning - AHU commissioning (Code A), CHW system balancing (Code W), VAV terminal commissioning</li>
              <li>Week 7-8: Controls and integration - BMS point-to-point verification, control sequence testing, integrated system tests</li>
              <li>Allow 6 months for seasonal commissioning</li>
            </ul>
            <p>
              <strong>Example 2 - Interface coordination:</strong> Coordinating fire alarm and
              HVAC systems.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire alarm → BMS interface: fire signal stops AHUs, fire dampers close automatically, smoke extract fans start, lifts return to ground</li>
              <li>Coordination checklist: interface cable route agreed, signal type defined (volt-free contact), response time requirements specified, testing procedure agreed, witness test scheduled</li>
              <li>Result: integrated fire/HVAC test passes</li>
            </ul>
            <p>
              <strong>Example 3 - First year optimisation:</strong> New office building energy
              higher than predicted after 6 months.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Investigation findings: heating running 6am-8pm (design 7am-6pm), night setback not activating, cooling setpoint 21°C (design 24°C), optimiser not enabled</li>
              <li>Optimisation actions: adjust schedules to match actual occupancy, enable night setback (16°C heating), reset cooling setpoint to 24°C, enable optimum start/stop, review holiday schedules</li>
              <li>Result: <strong>Energy reduced 25% to near design target</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The success factors and checklist items that make the difference between a smooth handover and a year of complaints."
          >
            <p>
              <strong>Commissioning success factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Protect commissioning time in programme</li>
              <li>Appoint commissioning manager early</li>
              <li>Define witness test requirements clearly</li>
              <li>Complete pre-commissioning before dynamic tests</li>
              <li>Document everything contemporaneously</li>
            </ul>
            <p>
              <strong>Handover checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>O&amp;M manuals complete and reviewed</li>
              <li>As-built drawings provided</li>
              <li>Building log book handed over</li>
              <li>Operator training completed</li>
              <li>Warranties and certificates collected</li>
              <li>BMS access credentials provided</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common problems to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Compressed commissioning:</strong> Protect time in programme
                </li>
                <li>
                  <strong>Poor documentation:</strong> Complete records as you go
                </li>
                <li>
                  <strong>No seasonal testing:</strong> Plan for winter/summer return
                </li>
                <li>
                  <strong>Inadequate training:</strong> Hands-on, not just manual handover
                </li>
              </ul>
            }
            doInstead="Ring-fence commissioning weeks in the programme, write up records as you go (not at the end), schedule seasonal return visits during the defects period, and deliver hands-on training on the actual installed systems."
          />

          <SectionRule />

          <Scenario
            title="Soft Landings handover for a 1,200-pupil secondary academy"
            situation={
              <>
                A 12,000 m² secondary academy is reaching practical completion. Soft
                Landings is contractually mandated by the funding agreement. You are the
                M&amp;E lead handing over a complex BMS-driven HVAC + LED lighting + BIPV
                + ASHP system to an FM team with no prior experience of any of these
                technologies.
              </>
            }
            whatToDo={
              <>
                Run the formal Soft Landings handover: training sessions for FM (BMS, lighting,
                ASHP), seasonal commissioning over the first heating + cooling season,
                monthly aftercare reviews for 12 months. Compile the building log book per
                CIBSE TM31 with all commissioning records, O&amp;M manuals, as-built
                drawings and the energy model. Set the energy targets in the BMS
                dashboard. Hand over emergency contact lists. Schedule the 3-year POE
                (post-occupancy evaluation) review.
              </>
            }
            whyItMatters={
              <>
                Schools have a poor reputation for performance gaps because the FM teams are
                stretched and the kit is unfamiliar. Soft Landings is the framework that
                catches BMS misconfiguration, schedules energy reviews and stops the building
                drifting in year-one. Ofsted-rated schools with high energy bills face board-
                level scrutiny; Soft Landings buys insurance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Multi-service coordination = interface schedule + BIM clash detection + weekly coordination meetings.',
              'Commissioning hierarchy: pre-commissioning checks → static commissioning → dynamic commissioning → witnessing → handover.',
              'BSRIA BG49 (water) + BG50 (air) + CIBSE Commissioning Codes A–C are the UK contractual standards.',
              'Building log book is a Part L compliance deliverable — use CIBSE TM31 as the template.',
              'Soft Landings (BSRIA BG54) extends responsibility through year-3 aftercare with seasonal commissioning.',
              'POE (post-occupancy evaluation) at 12 months and 36 months — measures performance gap and occupant satisfaction.',
              'Energy targets in BMS dashboard so the FM team has live performance feedback.',
              'Training sessions for FM — non-negotiable on complex systems (BMS, ASHP, BIPV, lighting controls).',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Design tools and software
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Compliance and verification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_5;
