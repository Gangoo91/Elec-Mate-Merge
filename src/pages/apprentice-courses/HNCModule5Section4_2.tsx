/**
 * Module 5 · Section 4 · Subsection 2 — Inspection and Test Plans
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   ITPs as the project-level quality plan — defining inspection points, witness/hold points, acceptance criteria and notification procedures for MEP works.
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

const TITLE = 'Inspection and Test Plans - HNC Module 5 Section 4.2';
const DESCRIPTION =
  'Master ITP development for MEP works: hold points, witness points, notification procedures, inspection scheduling, acceptance criteria, and sign-off procedures for building services quality management.';

const quickCheckQuestions = [
  {
    id: 'itp-definition',
    question: 'What is the primary purpose of an Inspection and Test Plan (ITP)?',
    options: [
      'To replace quality management systems',
      'To document inspection and verification stages throughout installation',
      'To record final test results only',
      'To schedule maintenance activities',
    ],
    correctIndex: 1,
    explanation:
      'An ITP documents all inspection, testing, and verification stages throughout the installation process, ensuring quality requirements are met at each critical point before work proceeds.',
  },
  {
    id: 'hold-point-def',
    question: 'What happens at a Hold Point in an ITP?',
    options: [
      'Work continues while inspection is arranged',
      'Contractor notifies client but proceeds',
      'Work MUST stop until formal sign-off is obtained',
      'Documentation is filed for later review',
    ],
    correctIndex: 2,
    explanation:
      'At a Hold Point, work must completely stop until the designated party (client, engineer, or authority) has inspected and formally signed off. Work cannot proceed without this approval.',
  },
  {
    id: 'witness-point-def',
    question: 'How does a Witness Point differ from a Hold Point?',
    options: [
      'Witness Points are more important',
      "Work may proceed if the witness doesn't attend after notification",
      "Witness Points don't require documentation",
      'They are the same thing',
    ],
    correctIndex: 1,
    explanation:
      "At a Witness Point, the contractor notifies the relevant party who may attend if they wish. If they don't attend within the notification period, work may proceed with contractor documentation.",
  },
  {
    id: 'notification-period',
    question: 'What is a typical notification period for Hold Points on MEP works?',
    options: ['2 hours', '24-48 hours', '7 days', 'Same day'],
    correctIndex: 1,
    explanation:
      'Hold Points typically require 24-48 hours advance notification to allow the witnessing party to schedule attendance. Critical or complex inspections may require longer notice periods.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which document forms the foundation for developing an ITP?',
    options: [
      "The contractor's standard procedures",
      'The project specification and quality requirements',
      'Previous project ITPs',
      "Manufacturer's installation guides",
    ],
    correctAnswer: 1,
    explanation:
      'The ITP must be developed from the project specification and quality requirements, ensuring all specified inspection and test stages are captured with appropriate acceptance criteria.',
  },
  {
    id: 2,
    question:
      'For a concealed cable installation, at what stage would a Hold Point typically be applied?',
    options: [
      'After final fix',
      'Before concealment/covering',
      'At project completion',
      'During cable delivery',
    ],
    correctAnswer: 1,
    explanation:
      'Hold Points for concealed work must occur before covering - once cables are plastered over or hidden, inspection becomes destructive. Pre-concealment inspection is critical.',
  },
  {
    id: 3,
    question: 'Who typically signs off Hold Points on MEP installations?',
    options: [
      'The installing electrician only',
      'The project manager or designated engineer',
      'Health and safety officer',
      "The client's receptionist",
    ],
    correctAnswer: 1,
    explanation:
      'Hold Points are typically signed off by the project manager, supervising engineer, or designated client representative who has authority to approve continuation of work.',
  },
  {
    id: 4,
    question: 'What documentation must be referenced in an ITP?',
    options: [
      'Applicable standards, specifications, and drawings',
      "Contractor's profit margins",
      'Staff holiday schedules',
      'Competitor pricing',
    ],
    correctAnswer: 0,
    explanation:
      'An ITP must reference all applicable standards (BS 7671, CIBSE guides), project specifications, relevant drawings, and any special requirements that define acceptance criteria.',
  },
  {
    id: 5,
    question:
      "A Witness Point notification states '48 hours notice required'. What does this mean?",
    options: [
      'Work must wait 48 hours after notification',
      'The witness has 48 hours to inspect after notification',
      'If no attendance after 48 hours, contractor may proceed',
      'Documentation must be submitted within 48 hours',
    ],
    correctAnswer: 2,
    explanation:
      "The notification period gives the witnessing party opportunity to attend. If they don't attend within the stated period after proper notification, the contractor may proceed with their own documentation.",
  },
  {
    id: 6,
    question: 'Which of these would typically be a Hold Point for main switchboard installation?',
    options: [
      'Cable tray installation',
      'Pre-energisation inspection and testing',
      'Labelling completion',
      'Drawing submission',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-energisation inspection is a critical Hold Point - once energised, the installation cannot be safely inspected in the same way. All testing and verification must be complete before power is applied.',
  },
  {
    id: 7,
    question: 'What information must each ITP entry include?',
    options: [
      'Activity, inspection stage, acceptance criteria, responsibility, and reference documents',
      'Activity name only',
      'Date completed only',
      'Cost of inspection',
    ],
    correctAnswer: 0,
    explanation:
      "Each ITP entry must detail the activity, inspection stage, acceptance criteria, responsible parties, reference documents, record requirements, and whether it's a Hold or Witness Point.",
  },
  {
    id: 8,
    question: 'How should non-conformances discovered at Hold Points be handled?',
    options: [
      'Ignore and continue',
      'Record, rectify, and re-inspect before sign-off',
      'Document for end of project review',
      'Notify insurance company',
    ],
    correctAnswer: 1,
    explanation:
      'Non-conformances at Hold Points must be recorded on an NCR (Non-Conformance Report), rectified, and re-inspected before sign-off can be given. The Hold Point cannot be released until resolved.',
  },
  {
    id: 9,
    question: 'For fire alarm system installation, which phase would require the most Hold Points?',
    options: [
      'Material delivery',
      'First fix cabling',
      'Testing and commissioning',
      'Documentation handover',
    ],
    correctAnswer: 2,
    explanation:
      'Testing and commissioning of fire alarm systems requires multiple Hold Points: cause and effect testing, integration testing, witness testing with fire authority, and final certification.',
  },
  {
    id: 10,
    question: 'What is the purpose of linking ITPs to the project programme?',
    options: [
      'To track contractor productivity',
      'To ensure inspection requirements are built into the schedule with adequate notice periods',
      'To calculate bonus payments',
      'To reduce inspection frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Linking ITPs to the programme ensures Hold Points are scheduled with adequate notification periods and that inspection resources are available when needed, preventing delays.',
  },
];

const faqs = [
  {
    question: 'How detailed should an ITP be for MEP installations?',
    answer:
      'ITPs should be detailed enough to capture every critical quality verification point without being unwieldy. For electrical installations, this typically means entries for: first fix containment, cable installation, equipment mounting, connections, testing phases, and pre-energisation. Each entry needs clear acceptance criteria linked to BS 7671 or project specifications.',
  },
  {
    question: 'Can Hold Points be waived or bypassed in urgent situations?',
    answer:
      'Hold Points should never be bypassed without formal approval. In genuine emergencies, a concession may be granted by the project manager or client representative, but this must be documented with risk assessment and alternative verification arrangements. Unauthorised bypass is a serious quality breach.',
  },
  {
    question: 'Who is responsible for scheduling inspections in the ITP?',
    answer:
      'The contractor is typically responsible for scheduling and issuing notifications for ITP inspections. They must provide adequate notice (usually 24-48 hours for Hold Points), ensure the work is ready for inspection, and have relevant documentation available. The witnessing party is responsible for attending within the notification period.',
  },
  {
    question: 'How do ITPs interface with BS 7671 certification requirements?',
    answer:
      'ITPs complement BS 7671 by capturing intermediate verification stages, while BS 7671 focuses on final certification. The ITP should include Hold Points for key BS 7671 tests (insulation resistance, earth continuity, RCD testing) and ensure Schedule of Test Results is compiled progressively. Final electrical certification becomes a Hold Point itself.',
  },
  {
    question: 'What records must be maintained from ITP inspections?',
    answer:
      'Each ITP inspection should generate: dated sign-off on the ITP sheet, inspection checklists or reports, test results where applicable, photographs of concealed work, non-conformance reports if issues found, and any concession or variation approvals. These form part of the O&M manual handover.',
  },
  {
    question: 'How are ITPs modified during a project?',
    answer:
      'ITP modifications require formal change control. If specifications change, the ITP must be updated to reflect new acceptance criteria. New activities may require additional Hold Points. Changes should be issued as controlled revisions with distribution records. Using superseded ITP versions is a common quality audit finding.',
  },
];

const HNCModule5Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 2"
            title="Inspection and Test Plans"
            description="ITP development, hold points, witness points, notification procedures, and inspection scheduling for MEP works."
            tone="purple"
          />

          <TLDR
            points={[
              "ITP = the project quality plan. Lists every inspection point, witness/hold point, test, acceptance criteria, responsible party, sign-off and record.",
              "Hold point = work cannot proceed past until inspection passed. Witness point = client/designer attends but does not stop work.",
              "ITP issued before work starts; signed off as sections complete; archived as part of O&M.",
              "For MEP, ITPs cover: rough-in inspection, pre-cover testing, in-service testing, commissioning, witness testing.",
              "NCRs raised against ITP failures; corrective action and re-inspection before close-out.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (Initial verification)"
            clause="Every electrical installation shall be inspected and tested during erection and on completion, before being put into service, to verify, so far as reasonably practicable, that the requirements of this Standard have been met."
            meaning={
              <>
                Initial verification under BS 7671 is mandatory and progressive — inspection and testing happen during erection (rough-in) AND on completion (final). The ITP is how this is planned and tracked: rough-in inspection before walls close up, continuity tests before energisation, full sequence at handover. Skipping the progressive verification means defects buried in the fabric.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 642.1."
          />


          <LearningOutcomes
            outcomes={[
              'Develop comprehensive ITPs for MEP installations',
              'Distinguish between Hold Points and Witness Points',
              'Implement effective notification procedures',
              'Schedule inspections aligned with project programmes',
              'Define clear acceptance criteria for each inspection stage',
              'Manage sign-off procedures and non-conformance handling',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="ITP Format and Content">
            <p>
              An Inspection and Test Plan (ITP) is a structured document that identifies all
              inspection, testing, and verification activities required throughout the installation
              process. For MEP works, the ITP ensures quality requirements from BS 7671, CIBSE
              guides, and project specifications are met at each critical stage.
            </p>
            <p>
              <strong>Essential ITP components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Activity description:</strong> Clear identification of the work stage
              </li>
              <li>
                <strong>Inspection type:</strong> Hold Point (H), Witness Point (W), or Review (R)
              </li>
              <li>
                <strong>Acceptance criteria:</strong> Measurable standards for compliance
              </li>
              <li>
                <strong>Reference documents:</strong> Standards, specifications, drawings
              </li>
              <li>
                <strong>Responsible parties:</strong> Who inspects and who signs off
              </li>
              <li>
                <strong>Records required:</strong> Checklists, test results, photographs
              </li>
            </ul>
            <p>
              <strong>Typical ITP structure for electrical installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Material delivery (R):</strong> Correct specification, undamaged — Material
                schedule
              </li>
              <li>
                <strong>Containment installation (W):</strong> Routing, fixings, segregation —
                Drawing series E-100
              </li>
              <li>
                <strong>Cable installation pre-cover (H):</strong> Types, routes, support spacing —
                BS 7671, Spec clause 5.3
              </li>
              <li>
                <strong>Equipment mounting (W):</strong> Heights, accessibility, fixings — Drawing
                E-201
              </li>
              <li>
                <strong>Pre-energisation testing (H):</strong> All BS 7671 tests complete — BS 7671
                Part 6
              </li>
              <li>
                <strong>Commissioning (H):</strong> Functional operation verified — Spec Section 8
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> The ITP captures quality gates - points where quality
              is verified before work proceeds. Missing an inspection point risks defects being
              concealed or costly rework.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Hold Points vs Witness Points">
            <p>
              Understanding the distinction between Hold Points and Witness Points is fundamental to
              effective ITP management. The wrong classification can cause unnecessary delays or
              inadequate quality verification.
            </p>
            <p>
              <strong>Hold Point (H):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work MUST stop completely</li>
              <li>Cannot proceed without formal sign-off</li>
              <li>Used for critical quality verification</li>
              <li>Typically requires engineer/client attendance</li>
              <li>Non-conformance must be resolved first</li>
              <li>Failure to observe: serious quality breach</li>
            </ul>
            <p>
              <strong>Witness Point (W):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Notification given to witnessing party</li>
              <li>Party may attend if they wish</li>
              <li>Work proceeds if no attendance after notice</li>
              <li>Contractor documents in their absence</li>
              <li>Used for important but not critical stages</li>
              <li>Notification period must be observed</li>
            </ul>
            <p>
              <strong>When to use each type:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Work to be concealed — Hold:</strong> Cannot inspect after covering
              </li>
              <li>
                <strong>Pre-energisation testing — Hold:</strong> Safety critical verification
              </li>
              <li>
                <strong>Fire authority witness test — Hold:</strong> Statutory requirement
              </li>
              <li>
                <strong>Containment installation — Witness:</strong> Visible, can be checked later
              </li>
              <li>
                <strong>Equipment positioning — Witness:</strong> Adjustable if issues found
              </li>
              <li>
                <strong>Final labelling check — Witness:</strong> Easily rectifiable
              </li>
            </ul>
            <p>
              <strong>Building services hold point examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical:</strong> Pre-concealment cable check, pre-energisation testing,
                EICR before handover
              </li>
              <li>
                <strong>Fire alarm:</strong> Cause and effect testing, fire authority witness test,
                certificate issue
              </li>
              <li>
                <strong>Emergency lighting:</strong> 3-hour duration test witness, certificate
                sign-off
              </li>
              <li>
                <strong>Data/comms:</strong> Pre-cover structured cabling, final test certification
              </li>
              <li>
                <strong>Earthing:</strong> Main earth electrode test before backfill
              </li>
            </ul>
            <p>
              <strong>Contract requirement:</strong> The specification typically defines minimum
              Hold Points. Contractors may add additional quality gates in their ITP.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Notification Requirements and Procedures">
            <p>
              Effective notification is essential for ITP management. Poor notification leads to
              either delays (inspection party not available) or quality lapses (work proceeding
              without required verification). A robust notification system protects both contractor
              and client.
            </p>
            <p>
              <strong>Typical notification periods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hold Points:</strong> Minimum 24-48 hours advance notice
              </li>
              <li>
                <strong>Witness Points:</strong> Minimum 24 hours advance notice
              </li>
              <li>
                <strong>Authority inspections:</strong> As required by authority (often 5+ days)
              </li>
              <li>
                <strong>Complex testing:</strong> May require 72 hours or agreed schedule
              </li>
            </ul>
            <p>
              <strong>Notification content requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ITP reference number:</strong> Unique identification of inspection point
              </li>
              <li>
                <strong>Activity description:</strong> Clear statement of what will be inspected
              </li>
              <li>
                <strong>Location/area:</strong> Where the inspection will take place
              </li>
              <li>
                <strong>Date and time:</strong> When work will be ready for inspection
              </li>
              <li>
                <strong>Documentation available:</strong> Test results, drawings, method statements
              </li>
              <li>
                <strong>Contact details:</strong> Who to meet on site
              </li>
              <li>
                <strong>PPE requirements:</strong> Safety equipment needed for inspection area
              </li>
            </ul>
            <p>
              <strong>Notification process flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Prepare:</strong> Complete work, gather records
              </li>
              <li>
                <strong>2. Notify:</strong> Issue formal notification
              </li>
              <li>
                <strong>3. Confirm:</strong> Receive acknowledgement
              </li>
              <li>
                <strong>4. Inspect:</strong> Conduct inspection, sign-off
              </li>
            </ul>
            <p>
              <strong>Digital notification systems:</strong> Modern projects often use digital
              platforms for ITP management. These provide automatic notifications, acknowledgement
              tracking, audit trails, and dashboard visibility of inspection status. Common
              platforms include Aconex, Procore, and project-specific QA systems.
            </p>
            <p>
              <strong>Record keeping:</strong> Always retain proof of notification (email
              timestamps, system logs) in case of disputes about inspection attendance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Inspection Scheduling and Sign-off Procedures">
            <p>
              Effective scheduling integrates ITP requirements with the project programme to ensure
              inspections don't become critical path delays. This requires forward planning,
              resource allocation, and coordination with multiple parties.
            </p>
            <p>
              <strong>Scheduling considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Programme integration:</strong> Mark Hold Points on construction programme
              </li>
              <li>
                <strong>Batch inspections:</strong> Group similar inspections where practical
              </li>
              <li>
                <strong>Lead times:</strong> Build notification periods into programme durations
              </li>
              <li>
                <strong>Resource availability:</strong> Confirm inspector availability in advance
              </li>
              <li>
                <strong>Dependent trades:</strong> Coordinate with following trades awaiting
                sign-off
              </li>
            </ul>
            <p>
              <strong>Inspection scheduling example — distribution board installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day 1-3:</strong> Board installation, cable glanding
              </li>
              <li>
                <strong>Day 3:</strong> Issue notification for W1 (Installation check)
              </li>
              <li>
                <strong>Day 4:</strong> Witness Point inspection — W1 completed
              </li>
              <li>
                <strong>Day 4-5:</strong> Terminations, labelling
              </li>
              <li>
                <strong>Day 5:</strong> Issue notification for H1 (48hr) — Pre-energisation
              </li>
              <li>
                <strong>Day 6:</strong> Complete testing, prepare records
              </li>
              <li>
                <strong>Day 7:</strong> Hold Point inspection — H1 sign-off required
              </li>
              <li>
                <strong>Day 8:</strong> Energisation (after H1 release)
              </li>
            </ul>
            <p>
              <strong>Sign-off requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dated signature from authorised representative</li>
              <li>Clear statement of acceptance or conditional acceptance</li>
              <li>Any observations or conditions noted</li>
              <li>Supporting documentation attached or referenced</li>
              <li>NCR numbers if non-conformances raised</li>
            </ul>
            <p>
              <strong>Minor non-conformance handling:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record on inspection sheet</li>
              <li>May allow conditional sign-off</li>
              <li>Rectify and close out</li>
              <li>Example: Missing label</li>
            </ul>
            <p>
              <strong>Major non-conformance handling:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Raise formal NCR</li>
              <li>Hold Point not released</li>
              <li>Requires re-inspection after rectification</li>
              <li>Example: Failed insulation test</li>
            </ul>
            <p>
              <strong>Audit trail:</strong> The completed ITP with all sign-offs, NCRs, and
              supporting records forms a key part of the O&M manual and demonstrates quality
              compliance throughout the project.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Fire alarm ITP development:</strong> Develop Hold Points for a
              Category L1 fire alarm system in a care home.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>H1:</strong> First fix cabling pre-concealment — verify correct cable types
                (FP200), check fire stopping penetrations
              </li>
              <li>
                <strong>H2:</strong> Device installation complete — detector spacing per BS 5839-1,
                sounder coverage verification
              </li>
              <li>
                <strong>H3:</strong> Cause and effect testing — all zones activate correct outputs,
                integration with door holders, HVAC
              </li>
              <li>
                <strong>H4:</strong> Fire authority witness test — minimum 5 days notice to
                authority, authority sign-off required
              </li>
              <li>
                <strong>H5:</strong> Final certificate issue — BS 5839-1 certificate complete
              </li>
            </ul>
            <p>
              <strong>Example 2 — Notification letter:</strong> Draft notification for
              pre-energisation Hold Point.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>To:</strong> Project Manager
              </li>
              <li>
                <strong>Ref:</strong> ITP-E-001 / HP-007
              </li>
              <li>
                <strong>Activity:</strong> Pre-energisation inspection - Main LV Switchboard
              </li>
              <li>
                <strong>Location:</strong> Level 1 Main Switch Room
              </li>
              <li>
                <strong>Proposed inspection:</strong> [Date + 48hrs] at 10:00
              </li>
              <li>Available documentation: Schedule of Test Results (complete)</li>
              <li>Electrical Installation Certificate (draft)</li>
              <li>As-installed single line diagram</li>
              <li>Test equipment calibration certificates</li>
              <li>
                <strong>Contact:</strong> [Site supervisor] - [Mobile number]
              </li>
              <li>
                <strong>PPE:</strong> Hard hat, safety boots, hi-vis
              </li>
              <li>Please confirm attendance or nominate alternate.</li>
            </ul>
            <p>
              <strong>Example 3 — Programme integration:</strong> A 5-day cabling activity requires
              a pre-cover Hold Point with 48hr notice. How should this be programmed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Day 1-4: Cable installation</li>
              <li>Day 3: Issue Hold Point notification (48hr notice)</li>
              <li>Day 5: Complete installation, await inspection</li>
              <li>Day 5: Hold Point inspection (if inspector available)</li>
              <li>Programme duration: 5 days minimum</li>
              <li>If Hold Point fails: +2 days for rectification and re-inspection</li>
              <li>
                <strong>Best practice:</strong> Build 1-day float after Hold Points
              </li>
              <li>
                <strong>Realistic duration:</strong> 6 days
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>ITP development checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review specification for mandatory inspection requirements</li>
              <li>Identify all concealed work requiring pre-cover inspection</li>
              <li>Include statutory inspections (fire authority, building control)</li>
              <li>Define clear acceptance criteria linked to standards</li>
              <li>Specify notification periods for each inspection type</li>
              <li>Identify responsible parties and sign-off authorities</li>
              <li>List records required at each stage</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Hold Point notice: <strong>Minimum 24-48 hours</strong>
              </li>
              <li>
                Fire authority notice: <strong>Typically 5+ working days</strong>
              </li>
              <li>
                Concealed work: <strong>Always Hold Point before covering</strong>
              </li>
              <li>
                Pre-energisation: <strong>Mandatory Hold Point</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Proceeding past Hold Points</strong> — serious quality breach, may require
                  opening up work
                </li>
                <li>
                  <strong>Insufficient notice</strong> — causes delays waiting for inspector
                </li>
                <li>
                  <strong>Vague acceptance criteria</strong> — leads to disputes about compliance
                </li>
                <li>
                  <strong>Missing records</strong> — cannot demonstrate quality compliance at
                  handover
                </li>
              </ul>
            }
            doInstead="Treat Hold Points as absolute stops, give 24-48hr formal notice with full documentation, write specific measurable acceptance criteria tied to BS 7671 / specs, and capture every sign-off, photo, and test result in the project record."
          />

          <SectionRule />

          <Scenario
            title="Hold point breached — work proceeds without inspection"
            situation={
              <>
                Your ITP defines a hold point at "containment installation, before cabling pulled". The electrical sub installs containment over a weekend and starts pulling cable before the inspection. On Monday the QA inspector finds the containment is wrongly sized in two zones; the cable already pulled has to be removed, the containment replaced, the cable re-pulled. Cost of rework: £18k. Programme impact: 1 week.
              </>
            }
            whatToDo={
              <>
                Reinforce hold-point discipline at the next site meeting. Update the ITP register so all subcontractors know which points are HOLD vs WITNESS vs INSPECTION. Re-issue site notice that work proceeding past a HOLD without sign-off is contractually a defect — rework at subcontractor cost. Implement a pre-pour / pre-cover walkover with the inspector for any concealed work. Close the NCR with corrective action.
              </>
            }
            whyItMatters={
              <>
                ITP discipline is what catches defects before they are buried. A hold point breached is not an inconvenience — it is an early warning of weak supervision and undisciplined working. Tighten now or pay at handover.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "ITP = project quality plan. Inspection points, hold/witness points, acceptance criteria, sign-off, records.",
              "Hold point: work cannot proceed past until inspection signed off.",
              "Witness point: client/designer attends but does not stop work.",
              "Issued before work; signed progressively; archived in O&M.",
              "For MEP: rough-in, pre-cover, in-service, commissioning, witness — all on the ITP.",
              "NCRs against ITP failures; root cause investigated; corrective action verified.",
              "BS 7671 Reg 642.1 makes progressive initial verification mandatory.",
              "ITP integrates with the WBS — every work package has its quality control points defined.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Material and equipment approval
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_2;
