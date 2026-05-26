/**
 * Module 5 · Section 5 · Subsection 1 — Commissioning Planning
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   CIBSE Code M, BSRIA Soft Landings, commissioning management plans and integration of commissioning with the project programme.
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

const TITLE = 'Commissioning Planning - HNC Module 5 Section 5.1';
const DESCRIPTION =
  'Master commissioning planning for building services: CIBSE Code M principles, commissioning management plans, scheduling, resource coordination, and pre-requisites for successful system handover.';

const quickCheckQuestions = [
  {
    id: 'cibse-code-m-purpose',
    question: 'What is the primary purpose of CIBSE Code M?',
    options: [
      'To provide guidance on commissioning building services',
      'Openings are on opposite or adjacent walls with clear internal paths',
      'Need to convert 30 minutes to 0.5 hours first',
      'Shock protection, overcurrent protection, fire prevention',
    ],
    correctIndex: 0,
    explanation:
      'CIBSE Code M (Commissioning Management) provides comprehensive guidance on the commissioning of building services systems to ensure they operate as designed.',
  },
  {
    id: 'cmp-responsibility',
    question: 'Who is typically responsible for producing the Commissioning Management Plan?',
    options: [
      'The commissioning manager',
      'The main contractor',
      'The building owner',
      'The equipment manufacturer',
    ],
    correctIndex: 0,
    explanation:
      'The commissioning manager is responsible for producing and maintaining the Commissioning Management Plan, coordinating all commissioning activities across different building services disciplines.',
  },
  {
    id: 'commissioning-prerequisite',
    question: 'Which of the following is a pre-requisite for commissioning HVAC systems?',
    options: [
      'For circuits where 30mA would nuisance trip',
      'Electrical supplies energised and tested',
      'Overload — the circuit is carrying too much current',
      'Using a voltage indicator or socket tester',
    ],
    correctIndex: 1,
    explanation:
      'Electrical supplies must be energised and tested before HVAC commissioning can begin, as the systems require power to operate during the commissioning process.',
  },
  {
    id: 'witness-testing',
    question: 'What is the purpose of witness testing during commissioning?',
    options: [
      'To hold 30% of gross income for tax obligations',
      'To allow the client to verify system performance',
      'Square root of 2 times magnitude at 45 degrees',
      'The Health & Safety at Work Act 1974',
    ],
    correctIndex: 1,
    explanation:
      'Witness testing allows the client or their representative to observe commissioning activities and verify that systems achieve the specified performance requirements.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'CIBSE Code M is divided into how many main parts?',
    options: [
      'Two parts - planning and execution',
      'Three parts - management, air systems, water systems',
      'Four parts - planning, execution, recording, handover',
      'Five parts covering all building services disciplines',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Code M is structured in three main parts: Part A covers commissioning management, Part B covers air distribution systems, and Part C covers water distribution systems.',
  },
  {
    id: 2,
    question: 'At what project stage should the Commissioning Management Plan first be produced?',
    options: [
      'Prosecution and imprisonment',
      'Isolate and de-energise the circuit',
      'At design stage (RIBA Stage 3-4)',
      'The total loss through a connection point',
    ],
    correctAnswer: 2,
    explanation:
      'The Commissioning Management Plan should be initiated during the design stage (RIBA Stage 3-4) to ensure commissioning requirements are incorporated into the design and specification.',
  },
  {
    id: 3,
    question: 'What is the recommended minimum notice period for witness testing?',
    options: [
      '48 hours',
      '24 hours',
      '14 days',
      '7 days',
    ],
    correctAnswer: 3,
    explanation:
      "CIBSE Code M recommends a minimum of 7 days notice for witness testing to allow the client's representative adequate time to arrange attendance and prepare.",
  },
  {
    id: 4,
    question: 'Which document records all commissioning results for handover?',
    options: [
      'Commissioning Record',
      'Building Log Book',
      'O&M Manual',
      'As-built drawings',
    ],
    correctAnswer: 0,
    explanation:
      'The Commissioning Record documents all test results, settings, and commissioning data. This forms part of the handover documentation package alongside O&M manuals and as-built drawings.',
  },
  {
    id: 5,
    question:
      'What percentage of commissioning time should typically be allowed for snagging and re-commissioning?',
    options: [
      '10-15%',
      '15-25%',
      '25-35%',
      '5-10%',
    ],
    correctAnswer: 1,
    explanation:
      'Industry guidance suggests allowing 15-25% of total commissioning time for addressing snags and re-commissioning activities, as issues inevitably arise during the process.',
  },
  {
    id: 6,
    question: 'For a phased handover, commissioning should be planned to:',
    options: [
      'Complete all systems at once at the end',
      'Prioritise electrical systems first',
      'Match the phasing of building occupation',
      'Follow alphabetical order of systems',
    ],
    correctAnswer: 2,
    explanation:
      'Commissioning programmes must align with phased handover requirements, completing and demonstrating systems in each phase before that area is occupied.',
  },
  {
    id: 7,
    question: 'What is the role of commissioning specialists in the commissioning process?',
    options: [
      'Match the phasing of building occupation',
      'Electrical installation certificates and test results',
      'The main construction programme and all trade programmes',
      'To carry out independent testing and balancing',
    ],
    correctAnswer: 3,
    explanation:
      'Commissioning specialists are independent third parties who carry out testing, adjusting, and balancing of systems. Their independence provides quality assurance.',
  },
  {
    id: 8,
    question: 'Static completion of a system means:',
    options: [
      'Physical installation is complete but not powered',
      'The system has failed commissioning',
      'The system has been commissioned',
      'The system is operating at reduced capacity',
    ],
    correctAnswer: 0,
    explanation:
      'Static completion means the physical installation is complete, including all connections and containment, but the system has not yet been powered or commissioned.',
  },
  {
    id: 9,
    question:
      'Which building services system typically requires the longest commissioning duration?',
    options: [
      'Lighting controls',
      'BMS and controls',
      'Fire alarm',
      'Hot water systems',
    ],
    correctAnswer: 1,
    explanation:
      'Building Management Systems (BMS) and controls typically require the longest commissioning duration due to the complexity of integrating multiple systems, optimising control strategies, and seasonal commissioning requirements.',
  },
  {
    id: 10,
    question:
      'What documentation must be available before commissioning an electrical distribution system?',
    options: [
      'Match the phasing of building occupation',
      'To carry out independent testing and balancing',
      'Electrical installation certificates and test results',
      'The main construction programme and all trade programmes',
    ],
    correctAnswer: 2,
    explanation:
      'Before commissioning electrical distribution systems, electrical installation certificates (EIC) and test results must be available to confirm the installation is safe and compliant with BS 7671.',
  },
  {
    id: 11,
    question: 'Seasonal commissioning refers to:',
    options: [
      'Physical installation is complete but not powered',
      'Electrical installation certificates and test results',
      'The main construction programme and all trade programmes',
      'Commissioning heating and cooling systems in their respective seasons',
    ],
    correctAnswer: 3,
    explanation:
      'Seasonal commissioning involves testing heating systems during cold weather and cooling systems during warm weather to verify performance under actual load conditions.',
  },
  {
    id: 12,
    question: 'A commissioning schedule should interface with:',
    options: [
      'The main construction programme and all trade programmes',
      'Electrical installation certificates and test results',
      'Match the phasing of building occupation',
      'To carry out independent testing and balancing',
    ],
    correctAnswer: 0,
    explanation:
      'The commissioning schedule must interface with the main construction programme and all trade programmes to ensure pre-requisites are complete and resources are coordinated.',
  },
];

const faqs = [
  {
    question: 'What is the difference between commissioning and testing?',
    answer:
      'Testing verifies that individual components or systems meet specified parameters (e.g., insulation resistance, pressure tests). Commissioning is a broader process that includes testing but also involves setting up, adjusting, balancing, and optimising complete systems to achieve the design intent. Commissioning demonstrates that systems work together as an integrated whole.',
  },
  {
    question: 'When should the commissioning manager be appointed?',
    answer:
      'The commissioning manager should ideally be appointed during RIBA Stage 3 (Developed Design) or early Stage 4 (Technical Design). Early appointment allows input into buildability, commissioning access requirements, and ensures the design facilitates effective commissioning. Late appointment often leads to commissioning difficulties and programme delays.',
  },
  {
    question: 'How do you handle commissioning when seasonal conditions are not available?',
    answer:
      'For systems requiring seasonal conditions (heating in winter, cooling in summer), initial commissioning establishes base settings and verifies operation. Seasonal commissioning is then carried out during the appropriate season, often during the defects liability period. The contract should include provisions for return visits and seasonal commissioning activities.',
  },
  {
    question: 'What happens if commissioning reveals design or installation defects?',
    answer:
      'Defects discovered during commissioning are recorded and notified through the project defect reporting system. The commissioning manager assesses impact on programme and coordinates remedial works. Significant defects may require design changes and approvals. Re-commissioning is required after remedial works are complete.',
  },
  {
    question: 'How should commissioning be coordinated across multiple contractors?',
    answer:
      'The commissioning manager chairs regular commissioning progress meetings attended by all relevant contractors. A master commissioning schedule identifies interfaces and dependencies. Pre-commissioning checklists ensure each trade completes their pre-requisites. Clear communication protocols and a shared project platform help coordinate activities.',
  },
  {
    question: 'What training is required for commissioning specialists?',
    answer:
      'Commissioning specialists typically hold relevant trade qualifications plus specialist commissioning training. BSRIA offers accredited commissioning training courses. Many clients specify that commissioning engineers must hold CSCS cards and relevant competency certifications. BMS commissioning engineers often require manufacturer-specific training.',
  },
];

const HNCModule5Section5_1 = () => {
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
            eyebrow="Module 5 · Section 5 · Subsection 1"
            title="Commissioning Planning"
            description="CIBSE Code M principles, commissioning management plans, and coordination of building services commissioning."
            tone="purple"
          />

          <TLDR
            points={[
              "Commissioning is a process, not an event — planned from RIBA Stage 2, executed across stages 4–6, validated post-occupancy.",
              "CIBSE Commissioning Code M is the UK reference for management of commissioning; BSRIA BG 49/50 frame Soft Landings.",
              "Commissioning Management Plan (CMP) defines scope, programme, responsibilities, witness requirements, deliverables.",
              "Programme integration: commissioning windows in the master programme, not bolted on at the end.",
              "Soft Landings: design intent → build → handover → aftercare (Year 1 / Year 2 / Year 3) — close the performance gap.",
            ]}
          />

          <RegsCallout
            source="CIBSE Commissioning Code M: Commissioning Management"
            clause="CIBSE Commissioning Code M provides guidance on the management of the commissioning of building services, including the role of the commissioning manager, programme integration, witnessing, documentation and handover."
            meaning={
              <>
                Code M is the management spine for commissioning: who does what, when, to what standard, with what evidence. A commissioning plan aligned to Code M is the deliverable that gives the client confidence the building will perform — not just be built. Many specifications now explicitly require Code M compliance.
              </>
            }
            cite="Source: CIBSE Commissioning Code M (refer to CIBSE published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand CIBSE Code M structure and application',
              'Develop commissioning management plans for building services',
              'Schedule commissioning activities and resource requirements',
              'Identify pre-requisites for commissioning different systems',
              'Coordinate specialist commissioning contractors',
              'Integrate commissioning with project handover requirements',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CIBSE Code M Structure and Principles">
            <p>
              CIBSE Code M (Commissioning Management) is the industry standard guidance document for
              commissioning building services systems. It provides a structured framework ensuring
              that installed systems operate as designed and meet the client's requirements.
            </p>
            <p>
              <strong>Code M structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part A — Commissioning Management:</strong> Planning, organisation,
                documentation, handover
              </li>
              <li>
                <strong>Part B — Air Distribution Systems:</strong> Ductwork, AHUs, terminals,
                extract systems
              </li>
              <li>
                <strong>Part C — Water Distribution Systems:</strong> Heating, chilled water,
                domestic water
              </li>
            </ul>
            <p>
              <strong>Key commissioning principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Early planning:</strong> Commissioning requirements identified at design
                stage
              </li>
              <li>
                <strong>Clear responsibilities:</strong> Defined roles for all parties involved
              </li>
              <li>
                <strong>Systematic approach:</strong> Logical sequence from static to dynamic
                commissioning
              </li>
              <li>
                <strong>Documentation:</strong> Comprehensive records of all commissioning
                activities
              </li>
              <li>
                <strong>Verification:</strong> Independent checking and witness testing
              </li>
            </ul>
            <p>
              <strong>Related standards and guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BSRIA BG 8:</strong> Model Commissioning Plan
              </li>
              <li>
                <strong>BSRIA BG 29:</strong> Pre-commission Cleaning of Pipework Systems
              </li>
              <li>
                <strong>BSRIA AG 1:</strong> Commissioning Air Systems
              </li>
              <li>
                <strong>BSRIA AG 2:</strong> Commissioning Water Systems
              </li>
              <li>
                <strong>BS 7671:</strong> Electrical installation testing and commissioning
              </li>
            </ul>
            <p>
              <strong>Industry requirement:</strong> Most major building contracts and BREEAM
              assessments require compliance with CIBSE Code M commissioning principles.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Commissioning Management Plan Content">
            <p>
              The Commissioning Management Plan (CMP) is the master document that defines how
              commissioning will be organised, executed, and documented. It is a living document
              updated throughout the project.
            </p>
            <p>
              <strong>Management sections:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project description and scope</li>
              <li>Commissioning objectives and criteria</li>
              <li>Organisation and responsibilities</li>
              <li>Communication protocols</li>
              <li>Quality assurance procedures</li>
              <li>Health and safety requirements</li>
            </ul>
            <p>
              <strong>Technical sections:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Systems to be commissioned</li>
              <li>Commissioning procedures per system</li>
              <li>Pre-requisites and interfaces</li>
              <li>Test equipment requirements</li>
              <li>Acceptance criteria</li>
              <li>Record formats and templates</li>
            </ul>
            <p>
              <strong>CMP development stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Initial (RIBA 3-4):</strong> Strategy, objectives, initial programme
              </li>
              <li>
                <strong>Developed (RIBA 4-5):</strong> Detailed procedures, responsibilities,
                schedules
              </li>
              <li>
                <strong>Final (RIBA 5):</strong> Complete commissioning records, as-built data
              </li>
            </ul>
            <p>
              <strong>Real-world example — hospital development:</strong> A 400-bed hospital CMP
              identified 47 separate building services systems requiring commissioning, with 12
              specialist commissioning contractors. The CMP included detailed interface matrices
              showing dependencies between systems (e.g., medical gas commissioning requiring
              electrical completion, theatre ventilation requiring BMS integration). The
              commissioning programme spanned 18 months with seasonal commissioning provisions for
              heating and cooling systems.
            </p>
            <p>
              <strong>Best practice:</strong> The CMP should be reviewed and updated at each project
              milestone and after significant changes to design or programme.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Scheduling and Resource Coordination">
            <p>
              Effective commissioning scheduling requires integration with the main construction
              programme and coordination of specialist resources across multiple disciplines.
            </p>
            <p>
              <strong>Commissioning programme structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Level 1:</strong> Master commissioning milestones aligned with main
                programme
              </li>
              <li>
                <strong>Level 2:</strong> Commissioning phases by building zone or system type
              </li>
              <li>
                <strong>Level 3:</strong> Detailed commissioning activities with durations and
                resources
              </li>
              <li>
                <strong>Level 4:</strong> Daily task schedules during active commissioning
              </li>
            </ul>
            <p>
              <strong>Typical commissioning durations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical distribution:</strong> 2-4 weeks — Number of boards, protection
                coordination
              </li>
              <li>
                <strong>Lighting controls:</strong> 1-3 weeks — System complexity, scene programming
              </li>
              <li>
                <strong>HVAC air systems:</strong> 4-8 weeks — Number of AHUs, VAV terminals
              </li>
              <li>
                <strong>HVAC water systems:</strong> 3-6 weeks — Number of circuits, balancing
                complexity
              </li>
              <li>
                <strong>BMS and controls:</strong> 6-12 weeks — Points count, integration
                requirements
              </li>
              <li>
                <strong>Fire detection:</strong> 2-4 weeks — Device count, cause and effect
              </li>
              <li>
                <strong>Lifts:</strong> 2-4 weeks per lift — Type, traffic analysis, firefighting
                mode
              </li>
            </ul>
            <p>
              <strong>Specialist resources:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air balancing engineers (BSRIA/NEBB)</li>
              <li>Water balancing engineers</li>
              <li>BMS commissioning engineers</li>
              <li>Lighting control programmers</li>
              <li>Fire system engineers</li>
              <li>Lift commissioning engineers</li>
            </ul>
            <p>
              <strong>Coordination requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weekly commissioning coordination meetings</li>
              <li>Shared access schedules for plant rooms</li>
              <li>Coordinated witness testing programme</li>
              <li>Interface management between contractors</li>
              <li>Progress reporting and KPI tracking</li>
              <li>Defect management and resolution</li>
            </ul>
            <p>
              <strong>Programme tip:</strong> Build in 15-25% contingency for snagging and
              re-commissioning. Complex systems rarely commission perfectly first time.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Pre-requisites for Commissioning">
            <p>
              Each building services system has specific pre-requisites that must be complete before
              commissioning can commence. Missing pre-requisites are a major cause of commissioning
              delays.
            </p>
            <p>
              <strong>General pre-requisites (all systems):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installation physically complete (static completion)</li>
              <li>All safety systems operational or suitable temporary measures</li>
              <li>Area clean and free from construction debris</li>
              <li>Adequate lighting for commissioning activities</li>
              <li>Safe access to all equipment and controls</li>
              <li>Relevant drawings and documentation available</li>
            </ul>
            <p>
              <strong>System-specific pre-requisites:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical distribution:</strong> DNO supply available, installation
                certificates, earthing complete
              </li>
              <li>
                <strong>HVAC air systems:</strong> Ductwork pressure tested, electrical supplies,
                controls wired
              </li>
              <li>
                <strong>HVAC water systems:</strong> Pipework flushed and cleaned, chemical
                treatment, pump rotation checked
              </li>
              <li>
                <strong>BMS:</strong> All field devices connected, network installed, graphics
                available
              </li>
              <li>
                <strong>Fire detection:</strong> All devices installed, ceilings complete,
                interfaces connected
              </li>
              <li>
                <strong>Lifts:</strong> Shaft complete, machine room ready, electrical supplies,
                fire service connections
              </li>
              <li>
                <strong>Emergency lighting:</strong> Permanent power available, batteries charged
                (24-48 hours minimum)
              </li>
            </ul>
            <p>
              <strong>Pre-commissioning checklist process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Installing contractor completes pre-commissioning checklist</li>
              <li>Commissioning manager reviews and signs off checklist</li>
              <li>Any outstanding items documented with resolution dates</li>
              <li>Commissioning start date confirmed once all items complete</li>
              <li>Checklist forms part of commissioning record</li>
            </ul>
            <p>
              <strong>Real-world example — office building HVAC:</strong> A 15-storey office
              building commissioning was delayed by 3 weeks because water system pre-commissioning
              flushing was incomplete. Debris in pipework damaged pump seals during initial
              operation. The lesson: commissioning manager now requires photographic evidence of
              strainer condition and water sample test results before allowing pump energisation.
            </p>
            <p>
              <strong>Critical interface:</strong> Electrical installation must be complete with EIC
              issued before any HVAC, BMS, or life safety system commissioning can commence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Commissioning schedule development:</strong> Develop commissioning
              milestone dates for a 5,000m2 office building with handover on 1st September.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 Sept: Handover (practical completion)</li>
              <li>15 Aug: Witness testing complete (-2 weeks)</li>
              <li>1 Aug: BMS commissioning complete (-2 weeks)</li>
              <li>15 July: HVAC commissioning complete (-2 weeks)</li>
              <li>1 July: Electrical commissioning complete (-2 weeks)</li>
              <li>15 June: Static completion all systems (-2 weeks)</li>
              <li>Allow 2-week contingency before handover</li>
            </ul>
            <p>
              <strong>Example 2 — Resource calculation:</strong> Calculate air balancing resource
              requirement for 25 AHUs and 400 VAV terminals.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AHU commissioning: 1-2 days each = 25-50 days</li>
              <li>VAV commissioning: 8-12 per day = 33-50 days</li>
              <li>Total air balancing duration: 58-100 days</li>
              <li>With 2-person team (standard): Programme duration: 29-50 working days</li>
              <li>Allow 8-10 weeks for air balancing phase</li>
            </ul>
            <p>
              <strong>Example 3 — Interface matrix:</strong> Identify commissioning dependencies for
              a fire alarm system.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Before fire alarm:</strong> Electrical distribution commissioned
              </li>
              <li>All detectors and sounders installed</li>
              <li>Ceilings substantially complete</li>
              <li>Interface wiring to AHUs, dampers, lifts</li>
              <li>
                <strong>After fire alarm (dependent systems):</strong> Smoke damper operation
                testing
              </li>
              <li>AHU shutdown sequences</li>
              <li>Lift recall testing</li>
              <li>Door holder release testing</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning manager checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Produce and maintain Commissioning Management Plan</li>
              <li>Chair weekly commissioning coordination meetings</li>
              <li>Review and approve pre-commissioning checklists</li>
              <li>Coordinate specialist commissioning contractors</li>
              <li>Arrange and attend witness testing</li>
              <li>Compile commissioning records for handover</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Witness testing notice: <strong>7 days minimum</strong>
              </li>
              <li>
                Snagging contingency: <strong>15-25% of programme</strong>
              </li>
              <li>
                BMS commissioning: <strong>longest duration system</strong>
              </li>
              <li>
                CMP first issue: <strong>RIBA Stage 3-4</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Late CMP development</strong> - Leads to inadequate planning and resource
                  issues
                </li>
                <li>
                  <strong>Ignoring pre-requisites</strong> - Starting commissioning before systems
                  ready
                </li>
                <li>
                  <strong>Insufficient contingency</strong> - Unrealistic programmes without
                  snagging allowance
                </li>
                <li>
                  <strong>Poor coordination</strong> - Commissioning clashes between trades
                </li>
              </ul>
            }
            doInstead="Issue the CMP at RIBA 3-4, sign off pre-commissioning checklists before energising, build 15-25% snagging contingency into the programme, and chair weekly coordination meetings between all specialist contractors."
          />

          <SectionRule />

          <Scenario
            title="Commissioning bolted onto the end of the programme — chaos at handover"
            situation={
              <>
                The construction programme shows "commissioning" as a single 4-week activity at the end. As handover approaches, electrical commissioning is incomplete (cables still being terminated), mechanical balancing is starting on systems that have not been tested, the BMS contractor is on holiday, and witness testing is scheduled before functional performance is verified. Handover slips by 6 weeks.
              </>
            }
            whatToDo={
              <>
                Commissioning must be planned from day one. Build a Commissioning Management Plan aligned to CIBSE Code M; identify dependencies between commissioning activities (e.g., electrical complete before mechanical pre-commissioning before BMS integration). Show the dependencies on the master programme as logically-linked activities, not a single block. Brief subcontractors on commissioning programme. Hold weekly commissioning meetings from month nine onwards. Avoid the "commissioning as afterthought" trap — it is the most common cause of late handover in building services.
              </>
            }
            whyItMatters={
              <>
                Commissioning controls the handover date. A well-planned commissioning programme delivers a building that works on day one; a poorly-planned one delivers a building that limps into use, generates complaints, and absorbs aftercare resources for years. The PM's discipline at planning stage pays dividends at handover.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Commissioning = process, not event. Planned RIBA Stage 2, executed Stages 4–6, validated post-occupancy.",
              "CIBSE Code M = management spine; BSRIA BG 49/50 = Soft Landings framework.",
              "Commissioning Management Plan (CMP) defines scope, programme, responsibilities, witness, deliverables.",
              "Programme integration: dependencies shown logically, not \"one block at end\".",
              "Soft Landings: design intent → build → handover → aftercare (Year 1, 2, 3).",
              "Independent commissioning manager increasingly common on complex projects.",
              "Witness testing to be planned with client/end-user attendance — not surprise calls.",
              "Performance verification post-occupancy closes the design-vs-actual gap.",
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
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Electrical commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_1;
