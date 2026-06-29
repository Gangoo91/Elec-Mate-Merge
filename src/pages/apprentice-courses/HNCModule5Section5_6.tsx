/**
 * Module 5 · Section 5 · Subsection 6 — Handover Documentation
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   O&M manuals, as-built drawings, training delivery and Building Log Book — the deliverables that turn a built project into an operable asset.
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

const TITLE = 'Handover Documentation - HNC Module 5 Section 5.6';
const DESCRIPTION =
  'Master handover documentation for building services: O&M manual requirements per BSRIA BG 26, as-built drawings, training delivery, building log book compilation, and Soft Landings procedures.';

const quickCheckQuestions = [
  {
    id: 'om-manual-purpose',
    question: 'What is the primary purpose of an O&M manual?',
    options: [
      'To record the final account and payment details',
      'To enable safe and efficient operation throughout the building lifecycle',
      'To list the marketing brochures for the installed plant',
      'To provide a record of the construction programme',
    ],
    correctIndex: 1,
    explanation:
      'The O&M manual is a comprehensive document enabling building operators to safely and efficiently operate, maintain, and manage building services throughout the entire building lifecycle.',
  },
  {
    id: 'bsria-bg26',
    question: 'Which BSRIA guide provides the industry standard for O&M manual structure?',
    options: [
      'BSRIA BG 44',
      'BSRIA BG 8',
      'BSRIA BG 26',
      'BSRIA BG 6',
    ],
    correctIndex: 2,
    explanation:
      "BSRIA BG 26 'Operating and Maintenance Manuals for Building Services Installations' is the industry standard guide for O&M manual content, structure, and compilation.",
  },
  {
    id: 'as-built-timing',
    question: 'When should as-built drawings be prepared?',
    options: [
      'Only once the building is fully occupied',
      'Progressively throughout construction as changes occur',
      'Before any work begins on site',
      'Only if the client specifically requests them',
    ],
    correctIndex: 1,
    explanation:
      'As-built drawings should be prepared progressively throughout construction as variations and site changes occur. Leaving this until completion risks inaccurate records and missing information.',
  },
  {
    id: 'soft-landings-stage',
    question: 'During Soft Landings, when does the extended aftercare period typically occur?',
    options: [
      'Before practical completion',
      'During the first 12 months after handover',
      'Only during commissioning',
      'For 3 years post-completion',
    ],
    correctIndex: 3,
    explanation:
      'Soft Landings typically includes a 3-year extended aftercare period post-completion, with intensive support in Year 1, reducing in Years 2 and 3, to ensure the building performs as intended.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BSRIA BG 26, which section of the O&M manual contains emergency procedures?',
    options: [
      'Section A - Asset Register',
      'Section B - Operating Instructions',
      'Section C - Maintenance Information',
      'Section D - Health & Safety Information',
    ],
    correctAnswer: 1,
    explanation:
      'Section B (Operating Instructions) contains emergency procedures, including shutdown sequences, fault responses, and contact information for emergency situations.',
  },
  {
    id: 2,
    question:
      'What minimum information must as-built drawings show for electrical distribution systems?',
    options: [
      'The original tender prices for each cable run',
      'The names of the operatives who installed each circuit',
      'Circuit routes, cable sizes, protection settings, and final equipment positions',
      'The delivery dates of the distribution boards',
    ],
    correctAnswer: 2,
    explanation:
      'As-built drawings must accurately show circuit routes, cable sizes and types, protective device ratings and settings, and final installed positions of all equipment including any site variations.',
  },
  {
    id: 3,
    question: 'How long should training records be retained as part of handover documentation?',
    options: [
      'For 12 months from practical completion only',
      'Until the warranty period expires',
      'Only until the next periodic inspection',
      'For the life of the building or until superseded',
    ],
    correctAnswer: 3,
    explanation:
      "Training records should be retained for the building's operational life, demonstrating that operators received adequate instruction. This supports liability protection and aids future retraining needs.",
  },
  {
    id: 4,
    question: 'What is the primary function of the building log book?',
    options: [
      'To record energy consumption and maintenance activities throughout building operation',
      'Design parameters, installed capacities, control strategies and target energy consumption',
      'Independent body advising UK government on emissions targets and progress',
      'It automatically prioritised critical systems like operating theatres and ICU',
    ],
    correctAnswer: 0,
    explanation:
      "The building log book is an ongoing operational document recording energy consumption, maintenance activities, system modifications, and performance data throughout the building's life.",
  },
  {
    id: 5,
    question:
      "During Soft Landings Stage 5 (Aftercare), what is the contractor's typical commitment?",
    options: [
      'No further involvement after practical completion',
      'Regular seasonal visits and occupant feedback sessions',
      'Only attending for emergency callouts',
      'Full-time site presence for 3 years',
    ],
    correctAnswer: 1,
    explanation:
      'Soft Landings Stage 5 involves regular seasonal commissioning visits, occupant satisfaction surveys, energy performance reviews, and addressing operational issues - typically monthly in Year 1, quarterly in Years 2-3.',
  },
  {
    id: 6,
    question: 'Which document provides the framework for post-occupancy evaluation (POE)?',
    options: [
      'BS 7671 Wiring Regulations',
      'CDM Regulations 2015',
      'BSRIA BG 54 Soft Landings Framework',
      'Approved Document B',
    ],
    correctAnswer: 2,
    explanation:
      "BSRIA BG 54 'Soft Landings Framework' provides the structured approach to post-occupancy evaluation, ensuring buildings perform as designed through extended aftercare and feedback mechanisms.",
  },
  {
    id: 7,
    question: 'What format should O&M manuals be provided in for modern building handovers?',
    options: [
      'Hard copy ring binders only',
      'A single read-only image file',
      'Handwritten notes left with the client',
      'Both hard copy and searchable electronic format (typically PDF)',
    ],
    correctAnswer: 3,
    explanation:
      'Modern practice requires both hard copy reference sets and searchable electronic copies. Electronic formats enable easy searching, updating, and backup, whilst hard copies provide reliable site access.',
  },
  {
    id: 8,
    question: 'When should end-user training be scheduled for optimal effectiveness?',
    options: [
      'Close to handover when systems are commissioned and operational',
      'At the very start of construction, before any plant is installed',
      'Several months after the building is occupied',
      'Only when a fault first occurs in service',
    ],
    correctAnswer: 0,
    explanation:
      'Training should occur close to handover when commissioned systems can be demonstrated in operation. Training too early means staff forget procedures; too late risks unsafe operation.',
  },
  {
    id: 9,
    question:
      'What must the building log book include regarding the DEC (Display Energy Certificate)?',
    options: [
      'The original construction cost of the building',
      'Space to record annual DEC ratings and advisory report actions',
      'The personal details of every building occupant',
      'A list of all subcontractors used on the project',
    ],
    correctAnswer: 1,
    explanation:
      'The building log book should include DEC records and tracking of advisory report recommendations. This supports the requirement to improve energy performance and maintain compliance records.',
  },
  {
    id: 10,
    question: 'Which items should be included in the O&M manual asset register?',
    options: [
      'Only the most expensive items of plant',
      'Only items still under manufacturer warranty',
      'All maintainable assets with manufacturer, model, serial number, and location',
      'Only the items installed in the final week of the project',
    ],
    correctAnswer: 2,
    explanation:
      'The asset register should comprehensively list all maintainable items including manufacturer details, model numbers, serial numbers, locations, commissioning dates, and warranty information.',
  },
];

const faqs = [
  {
    question: "What's the difference between O&M manuals and the building log book?",
    answer:
      "The O&M manual is a fixed reference document compiled at handover containing manufacturer information, operating procedures, and maintenance schedules. The building log book is a live operational document that records ongoing activities - energy consumption, maintenance completed, system modifications, and performance data throughout the building's life. Think of the O&M manual as the instruction book, and the log book as the service history.",
  },
  {
    question: 'How detailed should training be for complex BMS systems?',
    answer:
      'BMS training should be tiered: basic operation for all building users, intermediate training for facilities staff (adjusting setpoints, acknowledging alarms, running reports), and advanced training for maintenance technicians (programming, trend analysis, system modifications). Allow 4-8 hours for intermediate training and 2-3 days for advanced training. Always provide hands-on sessions with the actual installed system.',
  },
  {
    question: "What happens if as-built drawings aren't provided at handover?",
    answer:
      'This is a serious contractual matter. As-built drawings are typically a condition precedent to practical completion certification and final payment. Without them, the client cannot safely maintain or modify installations. The contract administrator should withhold certification until compliant drawings are provided. Retrospective surveys to create as-builts are expensive and often incomplete.',
  },
  {
    question: 'Is Soft Landings mandatory for all projects?',
    answer:
      'Soft Landings is not universally mandatory but is required for all central government projects under the Government Soft Landings (GSL) policy. Many local authorities and private clients now specify it, particularly for complex or energy-sensitive buildings. BREEAM credits are available for implementing Soft Landings principles. Even when not contractually required, the principles represent best practice.',
  },
  {
    question: 'How long should spare parts and maintenance materials be held after handover?',
    answer:
      'Contracts typically require a spares package for the first 12-24 months of operation. This should include critical items with long lead times (specialist lamps, belts, filters, fuses, control cards). The O&M manual should list recommended spares stockholding. After handover, the building owner becomes responsible for spares procurement, guided by the O&M manual recommendations.',
  },
  {
    question: 'Who is responsible for keeping O&M manuals updated after handover?',
    answer:
      'After handover, the building owner/operator is responsible for maintaining and updating O&M documentation. Any modifications, replacements, or upgrades should trigger O&M manual updates. This is often overlooked, leading to outdated documentation. Modern practice includes digital O&M systems that facilitate updates. Major alterations should include updated O&M documentation as a deliverable.',
  },
];

const HNCModule5Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 6"
            title="Handover Documentation"
            description="O&M manuals, as-built drawings, training delivery, and building log book compilation for successful project handover."
            tone="purple"
          />

          <TLDR
            points={[
              "Handover documentation = O&M manuals + as-built drawings + test certificates + training records + Building Log Book + asset register.",
              "O&M manuals to BSRIA BG 79 / CIBSE TM31: structure, content, format — not a contractor freestyle.",
              "As-built drawings reflect actual installation, not the tender design — captured progressively, not reconstructed.",
              "Training: structured sessions for FM team on every system; recorded attendance; trainer materials retained.",
              "Building Log Book (Approved Document L) for non-domestic buildings: energy performance summary, key services, design intent.",
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (Conservation of fuel and power) — Building Log Book"
            clause="A Building Log Book must be provided for new buildings and major renovations. The Log Book should contain summary information on the building services and their controls, energy performance certificates, commissioning data, and operating instructions in sufficient detail to enable the building to be operated efficiently."
            meaning={
              <>
                The Building Log Book is mandatory under Approved Document L for non-domestic new build and major refurbishment. Failure to provide one is a Building Regulations breach. CIBSE TM31 is the recommended template. The Log Book is the operator's reference: services overview, control strategies, commissioning summary, EPC, design intent.
              </>
            }
            cite="Source: Building Regulations 2010 — Approved Document L; CIBSE TM31."
          />


          <LearningOutcomes
            outcomes={[
              'Structure O&M manuals to BSRIA BG 26 requirements',
              'Prepare accurate as-built drawings for electrical installations',
              'Plan and deliver effective training programmes',
              'Compile and maintain building log books',
              'Implement Soft Landings procedures for extended aftercare',
              'Support post-occupancy evaluation and building performance',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="O&M Manual Requirements - BSRIA BG 26">
            <p>
              Operation and Maintenance (O&M) manuals are essential handover documents enabling
              building operators to safely and efficiently manage building services throughout the
              building lifecycle. BSRIA BG 26 provides the industry-standard structure and content
              requirements.
            </p>
            <p>
              <strong>BSRIA BG 26 standard structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section A — Asset Register:</strong> Equipment list, manufacturers,
                model/serial numbers, locations
              </li>
              <li>
                <strong>Section B — Operating Instructions:</strong> Start-up/shutdown, normal
                operation, emergency procedures
              </li>
              <li>
                <strong>Section C — Maintenance Information:</strong> Schedules, procedures, spare
                parts lists, lubrication charts
              </li>
              <li>
                <strong>Section D — Health & Safety:</strong> Risk assessments, COSHH data,
                isolation procedures, PPE requirements
              </li>
              <li>
                <strong>Section E — Technical Data:</strong> Commissioning records, test
                certificates, warranties, design data
              </li>
              <li>
                <strong>Section F — Drawings:</strong> As-built drawings, schematics, wiring
                diagrams, layout plans
              </li>
            </ul>
            <p>
              <strong>Electrical installation content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution board schedules</li>
              <li>Circuit charts and cable schedules</li>
              <li>Protection coordination studies</li>
              <li>Emergency lighting test records</li>
              <li>Fire alarm zone plans and operation</li>
              <li>BMS point schedules and graphics</li>
            </ul>
            <p>
              <strong>Format requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hard copy in durable ring binders</li>
              <li>Searchable PDF electronic copy</li>
              <li>Native CAD files for drawings</li>
              <li>Indexed and tabbed for easy navigation</li>
              <li>Building-specific, not generic literature</li>
              <li>Updated to reflect as-installed conditions</li>
            </ul>
            <p>
              <strong>Quality check:</strong> O&M manuals must be reviewed by the commissioning
              manager before acceptance - generic manufacturer literature without project-specific
              information is unacceptable.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="As-Built Drawing Requirements">
            <p>
              As-built drawings (also called record drawings) accurately document the installation
              as actually constructed, including all variations from the original design. They are
              essential for future maintenance, modifications, and compliance verification.
            </p>
            <p>
              <strong>Critical requirement:</strong> As-built drawings must be prepared
              progressively during construction - not retrospectively after completion. Site
              supervisors should mark up design drawings with variations as they occur. Retrospective
              surveys are expensive, often inaccurate, and risk missing concealed services.
            </p>
            <p>
              <strong>Electrical as-built drawing content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Layout Plans:</strong> Equipment positions, containment routes, floor box
                locations, final luminaire positions
              </li>
              <li>
                <strong>Schematics:</strong> Single line diagrams showing actual protective device
                ratings, cable sizes, discrimination settings
              </li>
              <li>
                <strong>Distribution Boards:</strong> Board schedules, circuit references, phase
                allocation, spare capacity
              </li>
              <li>
                <strong>Containment:</strong> Cable tray and trunking routes, sizes, fixing centres,
                fire stopping locations
              </li>
              <li>
                <strong>Fire Alarm:</strong> Zone plans, detector types and locations, sounder
                coverage, cause and effect matrix
              </li>
              <li>
                <strong>Emergency Lighting:</strong> Luminaire positions, circuit references,
                duration ratings, test switch locations
              </li>
            </ul>
            <p>
              <strong>As-built drawing standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Format:</strong> Native CAD (DWG/DXF) plus PDF - minimum A3 for layout plans
              </li>
              <li>
                <strong>Scale:</strong> Layout plans at 1:50 or 1:100, schematics not to scale (NTS)
              </li>
              <li>
                <strong>Title block:</strong> Clear "AS BUILT" notation with revision date and
                approval
              </li>
              <li>
                <strong>Layer standards:</strong> Consistent with project CAD standards for future
                editing
              </li>
              <li>
                <strong>Coordination:</strong> Referenced to architect's floor plans and grid lines
              </li>
            </ul>
            <p>
              <strong>Real-world example:</strong> A hospital electrical upgrade required as-built
              drawings showing exact cable routes through ceiling voids. Without these records, a
              subsequent ward refurbishment accidentally severed theatre supply cables, causing
              significant patient safety concerns and costly emergency repairs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Training Programmes and Delivery">
            <p>
              Effective training ensures building operators can safely manage installed systems from
              day one. Training should be structured for different user levels and delivered close
              to handover when systems are commissioned and operational.
            </p>
            <p>
              <strong>Training level structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Level 1: Awareness Training</strong> — For all building users - fire alarm
                response, emergency procedures, reporting faults. Duration: 30-60 minutes.
              </li>
              <li>
                <strong>Level 2: Operational Training</strong> — For facilities staff - BMS
                operation, lighting controls, adjusting setpoints, acknowledging alarms. Duration:
                4-8 hours.
              </li>
              <li>
                <strong>Level 3: Technical Training</strong> — For maintenance technicians - fault
                diagnosis, BMS programming, testing procedures, equipment maintenance. Duration: 2-3
                days.
              </li>
              <li>
                <strong>Level 4: Specialist Training</strong> — Manufacturer-specific training for
                complex systems - UPS, generators, fire suppression, specialist controls. Duration:
                varies.
              </li>
            </ul>
            <p>
              <strong>Training delivery best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Timing:</strong> 2-4 weeks before practical completion when systems are
                commissioned
              </li>
              <li>
                <strong>Location:</strong> On-site using actual installed equipment, not off-site
                simulations
              </li>
              <li>
                <strong>Trainer:</strong> Equipment manufacturer or specialist commissioning
                engineer
              </li>
              <li>
                <strong>Materials:</strong> Project-specific handouts referencing actual O&M manual
                sections
              </li>
              <li>
                <strong>Documentation:</strong> Signed attendance register, training syllabus,
                competency checklist
              </li>
              <li>
                <strong>Follow-up:</strong> Refresher sessions during Soft Landings aftercare period
              </li>
            </ul>
            <p>
              <strong>Training record requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date, duration, and location of training session</li>
              <li>Name and qualifications of trainer</li>
              <li>Detailed syllabus/agenda covered</li>
              <li>Signed attendance register with attendee job roles</li>
              <li>Competency assessment results where applicable</li>
              <li>Copies of training materials provided</li>
            </ul>
            <p>
              <strong>Key principle:</strong> Training is not a box-ticking exercise - it must
              genuinely enable staff to operate systems safely and efficiently. Inadequate training
              transfers liability to the contractor if incidents occur.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Log Book and Soft Landings">
            <p>
              The building log book is an operational document recording energy consumption and
              maintenance activities throughout the building's life. Soft Landings extends
              contractor involvement beyond handover to ensure buildings perform as designed.
            </p>
            <p>
              <strong>Building log book — design information (Part L requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building performance targets</li>
              <li>Design assumptions (occupancy, hours)</li>
              <li>U-values and air permeability</li>
              <li>System efficiencies and outputs</li>
              <li>Predicted energy consumption</li>
            </ul>
            <p>
              <strong>Building log book — operational records:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Monthly energy consumption data</li>
              <li>Sub-metering readings</li>
              <li>Maintenance activities completed</li>
              <li>System modifications/upgrades</li>
              <li>DEC ratings and advisory reports</li>
            </ul>
            <p>
              <strong>BSRIA Soft Landings Framework (BG 54):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — Inception & Briefing:</strong> Define performance outcomes, engage
                FM early
              </li>
              <li>
                <strong>Stage 2 — Design Development:</strong> Reality checking, FM input on
                maintainability
              </li>
              <li>
                <strong>Stage 3 — Pre-Handover:</strong> Commissioning review, training,
                documentation
              </li>
              <li>
                <strong>Stage 4 — Initial Aftercare:</strong> Resident on-site support, settling-in
                period (4-6 weeks)
              </li>
              <li>
                <strong>Stage 5 — Extended Aftercare:</strong> 3-year POE, seasonal commissioning,
                energy monitoring
              </li>
            </ul>
            <p>
              <strong>Soft Landings Year 1 activities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Monthly visits:</strong> Review BMS trends, energy data, occupant feedback
              </li>
              <li>
                <strong>Seasonal commissioning:</strong> Heating season and cooling season
                optimisation
              </li>
              <li>
                <strong>Occupant surveys:</strong> Comfort, usability, and satisfaction feedback
              </li>
              <li>
                <strong>Energy review:</strong> Compare actual vs predicted consumption
              </li>
              <li>
                <strong>Fine-tuning:</strong> Adjust controls, setpoints, and schedules
              </li>
            </ul>
            <p>
              <strong>Post-occupancy evaluation (POE):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Energy POE:</strong> Actual consumption vs design predictions, identify
                performance gaps
              </li>
              <li>
                <strong>Functional POE:</strong> Does the building meet operational requirements?
              </li>
              <li>
                <strong>Occupant POE:</strong> User satisfaction with comfort, lighting, controls
              </li>
              <li>
                <strong>Technical POE:</strong> System reliability, maintenance issues, design
                shortcomings
              </li>
            </ul>
            <p>
              <strong>Real-world impact:</strong> A university building implementing Soft Landings
              achieved 15% energy savings in Year 1 through seasonal commissioning adjustments that
              would not have been identified without extended aftercare involvement. The performance
              gap between design predictions and actual consumption was closed within 2 years.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — O&M manual compilation schedule:</strong> 10,000m² office building
              with complex M&E systems. Practical completion target: Week 40.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Week 1-4: Issue O&M specification to subcontractors</li>
              <li>Week 20: First draft submissions from major packages</li>
              <li>Week 28: Review and return comments</li>
              <li>Week 32: Final draft submissions</li>
              <li>Week 36: Commissioning data integration</li>
              <li>Week 38: Final compilation and binding</li>
              <li>Week 40: Handover with practical completion</li>
              <li>Key: Start early - O&M compilation is on the critical path</li>
            </ul>
            <p>
              <strong>Example 2 — Training programme structure:</strong> New hospital wing with
              BMS-controlled HVAC, lighting controls, and standby generator.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day 1 — BMS Overview (8 hours):</strong> System architecture and graphics
                navigation
              </li>
              <li>Alarm management and acknowledgement</li>
              <li>Basic trending and reporting</li>
              <li>
                <strong>Day 2 — HVAC Controls (6 hours):</strong> Setpoint adjustments and
                scheduling
              </li>
              <li>AHU operation and fault diagnosis</li>
              <li>
                <strong>Day 3 — Electrical Systems (4 hours):</strong> Generator test procedures and
                manual operation
              </li>
              <li>Emergency lighting testing protocols</li>
              <li>Attendees: 2× Estates Managers, 4× Maintenance Technicians</li>
            </ul>
            <p>
              <strong>Example 3 — Soft Landings aftercare visit agenda:</strong> Month 6 review
              visit for commercial office building.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>09:00 - FM team briefing and issues review</li>
              <li>09:30 - BMS trend analysis (energy, temperatures)</li>
              <li>10:30 - Physical plant room inspection</li>
              <li>11:00 - Lighting control system check</li>
              <li>11:30 - Occupant feedback discussion</li>
              <li>12:00 - Action log update and next visit planning</li>
              <li>Outcome: 3 control strategy adjustments, 2 training refresher items identified</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Handover documentation checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>O&M manuals complete to BSRIA BG 26 structure</li>
              <li>As-built drawings in CAD and PDF format</li>
              <li>Commissioning certificates and test records</li>
              <li>Training records with signed attendance</li>
              <li>Spare parts package and recommended spares list</li>
              <li>Warranty certificates and contact details</li>
              <li>Building log book template populated with design data</li>
              <li>BMS graphics and point schedule</li>
            </ul>
            <p>
              <strong>Key standards and references:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BSRIA BG 26:</strong> O&M manual guidance
              </li>
              <li>
                <strong>BSRIA BG 54:</strong> Soft Landings Framework
              </li>
              <li>
                <strong>CIBSE TM31:</strong> Building log book toolkit
              </li>
              <li>
                <strong>Building Regulations Part L:</strong> Log book requirement
              </li>
              <li>
                <strong>BSRIA BG 8:</strong> Commissioning management
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common handover problems"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Generic O&M content:</strong> Manufacturer brochures without
                  project-specific information
                </li>
                <li>
                  <strong>Late as-built drawings:</strong> Prepared retrospectively with
                  inaccuracies
                </li>
                <li>
                  <strong>Rushed training:</strong> Delivered too early or with insufficient time
                  allocated
                </li>
                <li>
                  <strong>Missing commissioning data:</strong> Test results not included in O&M
                  manual
                </li>
                <li>
                  <strong>No aftercare plan:</strong> Contractor disengages immediately after
                  handover
                </li>
              </ul>
            }
            doInstead="Compile project-specific O&M content per BSRIA BG 26, mark up as-built drawings progressively during construction, deliver tiered hands-on training close to handover, integrate commissioning records into the O&M, and commit to a structured Soft Landings aftercare plan."
          />

          <SectionRule />

          <Scenario
            title="Late O&M issue delays final certificate and retention release"
            situation={
              <>
                The project achieved Practical Completion six weeks ago. The contract requires O&M manuals before PC; you persuaded the client to accept "draft O&Ms" at PC with finals "to follow shortly". Six weeks on, the O&Ms are still incomplete. The client refuses to release retention; the architect declines to issue the Final Certificate. The project director is asking why margin is locked up.
              </>
            }
            whatToDo={
              <>
                Treat O&M production as a programme deliverable from RIBA Stage 4 onwards — not a retrospective compilation. Allocate a documentation lead. Use BSRIA BG 79 as the structure. Capture commissioning data, as-built drawings and certificates progressively. Produce final O&Ms 2–4 weeks before PC with the design team's input. The O&Ms are the operator's manual — incomplete documentation is incomplete handover.
              </>
            }
            whyItMatters={
              <>
                O&Ms are commercially load-bearing — many contracts make their delivery a precondition for retention release and Final Certificate. Late O&Ms equal locked retention, contested final account, and a soured client relationship. Discipline at production stage protects margin and reputation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Handover docs = O&M + as-built + certificates + training records + Log Book + asset register.",
              "O&M to BSRIA BG 79 / CIBSE TM31 — structured, not contractor freestyle.",
              "As-built drawings reflect actual installation, captured progressively.",
              "Structured training for FM team; attendance recorded; materials retained.",
              "Building Log Book (Approved Doc L) mandatory for non-domestic new build.",
              "O&M production is a programme deliverable from Stage 4, not retrospective.",
              "Late O&Ms commonly hold retention release and Final Certificate.",
              "Soft Landings aftercare uses the O&M as the operator’s reference document.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Site management and CDM
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_6;
