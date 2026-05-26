/**
 * Module 8 · Section 6 · Subsection 6 — Handover and Training
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Client training, operational handover, defects liability period, and post-occupancy support for building services
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Handover and Training - HNC Module 8 Section 6.6';
const DESCRIPTION =
  'Master client training, operational handover, defects liability period and post-occupancy support for building services. Covers Soft Landings framework, FM team handover, and aftercare arrangements.';

const quickCheckQuestions = [
  {
    id: 'soft-landings-purpose',
    question: 'What is the primary purpose of the Soft Landings framework?',
    options: [
      'To remove the resistance of the leads from the measurement',
      'Dynamic effects synchronized with content or music',
      'To show the project team structure and reporting relationships',
      'To bridge the gap between design intent and operational performance',
    ],
    correctIndex: 3,
    explanation:
      'Soft Landings is a building handover process designed to bridge the gap between design intent and operational performance. It ensures a smooth transition from construction to occupation through extended aftercare and performance monitoring.',
  },
  {
    id: 'defects-period',
    question:
      'What is the typical duration of the defects liability period for building services installations?',
    options: [
      '3 months',
      '12 months',
      '6 months',
      '24 months',
    ],
    correctIndex: 1,
    explanation:
      'The defects liability period (also known as the rectification period) is typically 12 months from practical completion. During this time, the contractor must return to rectify any defects that become apparent under normal use.',
  },
  {
    id: 'fm-training-requirement',
    question:
      'Which personnel must receive training before building handover under best practice guidance?',
    options: [
      'Varies with cable size and construction - from tables',
      'Secure connections and accessibility',
      'To ensure work is completed safely and efficiently',
      'Facilities management team and operational staff',
    ],
    correctIndex: 3,
    explanation:
      'The facilities management team and all operational staff who will interact with building services must receive comprehensive training before handover. This ensures they can safely operate, maintain, and respond to emergencies affecting the electrical systems.',
  },
  {
    id: 'poe-timing',
    question: 'When should Post-Occupancy Evaluation (POE) typically be conducted?',
    options: [
      'At 12 months and optionally at 3 years post-occupation',
      'Installing containment systems and routing cables',
      'The difference between synchronous speed and actual rotor speed',
      'By promoting automation for lighting, HVAC, and shading systems',
    ],
    correctIndex: 0,
    explanation:
      "Post-Occupancy Evaluation is typically conducted at 12 months after occupation (end of defects period) and optionally at 3 years. This timing allows seasonal performance assessment and captures the building's performance under actual operational conditions.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under the Soft Landings framework, when should the process ideally begin?',
    options: [
      'At practical completion',
      'During the design stage (RIBA Stage 2)',
      'After the first year of occupation',
      'When problems are identified',
    ],
    correctAnswer: 1,
    explanation:
      'Soft Landings should ideally begin at RIBA Stage 2 (Concept Design) to ensure that operational requirements and maintainability are considered from the outset. Early engagement leads to better outcomes during handover and operation.',
  },
  {
    id: 2,
    question: "What is the contractor's obligation during the defects liability period?",
    options: [
      'A minimum of one full day, with follow-up sessions',
      'To optimise systems for heating and cooling seasons after initial occupation',
      'To rectify defects in workmanship and materials at their own cost',
      'Normal operation, emergency procedures, and basic fault diagnosis',
    ],
    correctAnswer: 2,
    explanation:
      'During the defects liability period, the contractor must rectify defects in workmanship and materials that become apparent under normal use, at their own cost. This does not include damage caused by misuse, fair wear and tear, or client-requested changes.',
  },
  {
    id: 3,
    question:
      'Which document typically defines the aftercare arrangements following practical completion?',
    options: [
      'The planning permission',
      'The building regulations',
      "The architect's appointment",
      'The contract (e.g., JCT or NEC)',
    ],
    correctAnswer: 3,
    explanation:
      "Aftercare arrangements are defined in the construction contract (JCT, NEC, or bespoke). The contract specifies the defects period duration, contractor's obligations, retention release conditions, and any extended aftercare requirements.",
  },
  {
    id: 4,
    question:
      'What is the recommended minimum duration of operational training for complex building services?',
    options: [
      'A minimum of one full day, with follow-up sessions',
      'Normal operation, emergency procedures, and basic fault diagnosis',
      'To rectify defects in workmanship and materials at their own cost',
      'Resident on-site support and fine-tuning of building systems',
    ],
    correctAnswer: 0,
    explanation:
      'Complex building services require a minimum of one full day of operational training, with follow-up sessions recommended during the initial occupation period. Training should be documented with signed attendance records and competency assessments.',
  },
  {
    id: 5,
    question:
      "BSRIA Soft Landings identifies which of the following as a key activity during the 'Initial Aftercare' stage?",
    options: [
      '1 year, 2 years, and 5 years post-occupation',
      'Resident on-site support and fine-tuning of building systems',
      'To optimise systems for heating and cooling seasons after initial occupation',
      'To rectify defects in workmanship and materials at their own cost',
    ],
    correctAnswer: 1,
    explanation:
      'During Initial Aftercare (typically the first four weeks post-handover), Soft Landings requires resident on-site support from key personnel who can respond to occupant queries and fine-tune building systems based on actual usage patterns.',
  },
  {
    id: 6,
    question: 'Post-Occupancy Evaluation (POE) typically assesses which of the following?',
    options: [
      'Resident on-site support and fine-tuning of building systems',
      'To optimise systems for heating and cooling seasons after initial occupation',
      'Building performance, occupant satisfaction, and comparison with design predictions',
      'The final certificate is issued after expiry of the defects period and rectification of notified defects',
    ],
    correctAnswer: 2,
    explanation:
      'POE assesses building performance (energy, comfort, indoor environment), occupant satisfaction, functionality, and compares actual performance against design predictions. This feedback loop helps identify improvements and informs future designs.',
  },
  {
    id: 7,
    question:
      'What percentage of construction contract value is typically held as retention during the defects period?',
    options: [
      '1-2%',
      'No retention is held',
      '10%',
      '2.5-5%',
    ],
    correctAnswer: 3,
    explanation:
      'Typically 2.5-5% of the contract value is held as retention, with half released at practical completion and the remainder at the end of the defects period. This provides the client with security that defects will be rectified.',
  },
  {
    id: 8,
    question: 'FM team training for electrical systems should include which of the following?',
    options: [
      'Normal operation, emergency procedures, and basic fault diagnosis',
      'Representatives from the design team, contractor, and building services engineer',
      'Building performance, occupant satisfaction, and comparison with design predictions',
      'A minimum of one full day, with follow-up sessions',
    ],
    correctAnswer: 0,
    explanation:
      'FM training must cover normal operation procedures, emergency procedures (including isolation and lock-off), basic fault diagnosis, BMS/control system operation, and when to call specialist support. This ensures safe and efficient building operation.',
  },
  {
    id: 9,
    question:
      'The Building Performance Evaluation (BPE) programme recommends assessments at which intervals?',
    options: [
      'To facilitate maintenance and testing',
      '1 year, 2 years, and 5 years post-occupation',
      'Testing without disconnecting sensitive equipment',
      'Automatic Disconnection of Supply',
    ],
    correctAnswer: 1,
    explanation:
      'The BPE programme recommends assessments at 1 year (to capture seasonal performance), 2 years (to assess settled operation), and optionally 5 years (to evaluate longer-term performance and any degradation issues).',
  },
  {
    id: 10,
    question: 'What is the primary purpose of seasonal commissioning?',
    options: [
      'Building performance, occupant satisfaction, and comparison with design predictions',
      'Normal operation, emergency procedures, and basic fault diagnosis',
      'To optimise systems for heating and cooling seasons after initial occupation',
      'Representatives from the design team, contractor, and building services engineer',
    ],
    correctAnswer: 2,
    explanation:
      'Seasonal commissioning optimises HVAC and controls for both heating and cooling seasons under actual occupancy conditions. Initial commissioning may occur in one season, so return visits ensure optimal performance year-round.',
  },
  {
    id: 11,
    question:
      "Under Soft Landings, who should attend the 'resident on-site' period during initial aftercare?",
    options: [
      'To optimise systems for heating and cooling seasons after initial occupation',
      'To rectify defects in workmanship and materials at their own cost',
      'Building performance, occupant satisfaction, and comparison with design predictions',
      'Representatives from the design team, contractor, and building services engineer',
    ],
    correctAnswer: 3,
    explanation:
      'Soft Landings requires representatives from the design team, contractor, and building services engineer to provide resident on-site support during initial aftercare. This multi-disciplinary presence ensures queries can be addressed and systems fine-tuned effectively.',
  },
  {
    id: 12,
    question:
      'What is the relationship between the defects liability period and the final certificate?',
    options: [
      'The final certificate is issued after expiry of the defects period and rectification of notified defects',
      'To optimise systems for heating and cooling seasons after initial occupation',
      'Building performance, occupant satisfaction, and comparison with design predictions',
      'Representatives from the design team, contractor, and building services engineer',
    ],
    correctAnswer: 0,
    explanation:
      'The final certificate is issued after the defects liability period has expired and any notified defects have been rectified. It marks the formal conclusion of the contract and triggers release of the remaining retention.',
  },
];

const faqs = [
  {
    question: 'What is the difference between practical completion and final completion?',
    answer:
      'Practical completion occurs when the works are substantially complete and the building can be used for its intended purpose, even if minor snagging items remain. This triggers the start of the defects liability period. Final completion occurs after the defects period expires and all notified defects have been rectified, triggering release of remaining retention. The period between them (typically 12 months) is when latent defects may emerge under operational conditions.',
  },
  {
    question: 'Who is responsible for organising client training during handover?',
    answer:
      'Responsibility for organising client training typically rests with the main contractor, who coordinates specialist sub-contractors to deliver training on their systems. The contract should specify training requirements, duration, and the number of sessions. On larger projects, the principal designer or project manager may oversee the training programme to ensure it meets client needs and covers all systems comprehensively.',
  },
  {
    question: 'What happens if defects are not rectified during the defects period?',
    answer:
      'If defects are not rectified, the client can: (1) withhold the retention money and use it to engage others to complete the work, (2) claim damages for breach of contract, or (3) seek specific performance through legal action. The client must notify defects in writing during the defects period. Latent defects discovered after the period may still be actionable under limitation periods (6 years for simple contracts, 12 years for deeds).',
  },
  {
    question: 'Is Soft Landings mandatory for all projects?',
    answer:
      "Soft Landings is mandatory for UK government projects (Government Soft Landings - GSL) but voluntary for private sector projects. However, many clients now include Soft Landings requirements in their employer's requirements, and BREEAM awards credits for projects implementing the framework. Even when not mandatory, the principles of extended aftercare and performance verification represent best practice.",
  },
  {
    question: 'How should training be documented for handover?',
    answer:
      "Training documentation should include: training programmes/agendas for each session, attendance registers signed by all participants, handout materials provided, competency assessment records (if applicable), certificates of completion, and video recordings where permitted. This documentation forms part of the Health and Safety File under CDM 2015 and provides evidence of discharge of the contractor's training obligations.",
  },
  {
    question: 'What support should the contractor provide after the defects period ends?',
    answer:
      'After the defects period, the contractor has no contractual obligation unless extended aftercare is specified. However, many contracts include optional maintenance agreements, spare parts supply arrangements, and technical support services. Equipment warranties may extend beyond the defects period. For critical systems, clients should establish ongoing maintenance contracts with either the original installer or specialist maintenance providers.',
  },
];

const HNCModule8Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · Subsection 6"
            title="Handover and Training"
            description="Client training, operational handover, defects liability period, and post-occupancy support for building services"
            tone="purple"
          />

          <ConceptBlock title="Client Training Requirements">
            <p>Comprehensive client training is essential for safe and efficient building operation. Training must be tailored to the audience, covering operational staff, facilities management, and emergency responders with appropriate levels of detail.</p>
            <p><strong>Training Programme Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>System overview:</strong> Purpose, main components, and distribution architecture</li>
              <li><strong>Normal operation:</strong> Starting, stopping, adjusting setpoints, and monitoring</li>
              <li><strong>Emergency procedures:</strong> Isolation, lock-off, and evacuation protocols</li>
              <li><strong>Fault diagnosis:</strong> Basic troubleshooting and alarm response</li>
              <li><strong>BMS/controls:</strong> User interface operation and adjustment limits</li>
              <li><strong>Maintenance access:</strong> Safe access requirements and permit systems</li>
            </ul>
            <p><strong>Training Audience and Content</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Building owner/client:</strong> Overview, key contacts, warranty arrangements — 1-2 hours</li>
              <li><strong>FM manager:</strong> Comprehensive system operation, maintenance planning — 1-2 days</li>
              <li><strong>Maintenance technicians:</strong> Detailed operation, fault finding, safe isolation — 2-3 days</li>
              <li><strong>Security/reception:</strong> Emergency procedures, basic BMS monitoring — 2-4 hours</li>
              <li><strong>General occupants:</strong> User controls, emergency evacuation — 30-60 minutes</li>
            </ul>
            <p><strong>Training Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Training programme with objectives and duration</li>
              <li>Attendance register signed by all participants</li>
              <li>Handout materials and reference guides</li>
              <li>Competency assessment records where applicable</li>
              <li>Video recordings for future reference (with permission)</li>
              <li>Certificate of completion for each attendee</li>
            </ul>
            <p><strong>Best practice:</strong> Schedule multiple training sessions, with initial training before occupation and follow-up sessions after one month of operation to address real-world queries.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Operational Handover and FM Team">
            <p>Operational handover transfers responsibility for building services from the contractor to the client's facilities management team. This process must be structured to ensure the FM team has the knowledge, documentation, and resources to operate the building safely.</p>
            <p><strong>Handover Process Stages</strong></p>
            <p><strong>FM Team Handover Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>O&amp;M manuals:</strong> Complete, indexed, and project-specific — Main contractor</li>
              <li><strong>As-built drawings:</strong> Full set reflecting actual installation — Main contractor</li>
              <li><strong>Test certificates:</strong> EIC, commissioning records, witness tests — Sub-contractors</li>
              <li><strong>Spare parts:</strong> Contractually specified spares with storage — Main contractor</li>
              <li><strong>Access keys:</strong> All panel keys, lock-off devices, access cards — Main contractor</li>
              <li><strong>Warranty documents:</strong> Equipment warranties with claim procedures — Sub-contractors</li>
              <li><strong>Contact list:</strong> Emergency contacts, specialist suppliers — Main contractor</li>
            </ul>
            <p><strong>Operational Demonstrations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main switchgear operation and interlocks</li>
              <li>Distribution board switching sequences</li>
              <li>Emergency lighting test procedures</li>
              <li>Generator start/stop and changeover</li>
              <li>UPS system operation and bypass</li>
              <li>BMS graphics and alarm response</li>
            </ul>
            <p><strong>Safety Briefings Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High voltage equipment hazards</li>
              <li>Arc flash risks and PPE requirements</li>
              <li>Lock-off/tag-out procedures</li>
              <li>Emergency isolation locations</li>
              <li>Permit to work requirements</li>
              <li>Competency requirements for access</li>
            </ul>
            <p><strong>Key point:</strong> FM involvement should begin during construction, not at handover. Early engagement allows the FM team to understand the systems and provide input on maintainability.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Defects Liability Period">
            <p>The defects liability period (DLP), also known as the rectification period, is the time following practical completion during which the contractor must return to rectify defects that become apparent under normal use. For building services, this is typically 12 months.</p>
            <p><strong>Standard Defects Period</strong></p>
            <p><strong>12 months from practical completion</strong></p>
            <p>Extended to 24 months for some specialist systems (BMS, fire alarm) under certain contracts</p>
            <p><strong>Contractor's Obligations During DLP</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Respond to defect notices:</strong> Acknowledge and arrange inspection — Within 48 hours</li>
              <li><strong>Rectify defects:</strong> Repair defects in workmanship/materials — Reasonable time</li>
              <li><strong>Emergency response:</strong> Attend dangerous defects immediately — Within 4 hours</li>
              <li><strong>Update documentation:</strong> Amend as-builts if repairs require changes — With final account</li>
              <li><strong>Seasonal commissioning:</strong> Return for heating/cooling season optimisation — As seasons occur</li>
            </ul>
            <p>Defects Covered</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Faulty workmanship</li>
              <li>• Defective materials</li>
              <li>• Equipment failure (manufacturing)</li>
              <li>• Non-compliance with specification</li>
              <li>• Latent defects becoming apparent</li>
            </ul>
            <p>Not Covered</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Damage by client/occupants</li>
              <li>• Fair wear and tear</li>
              <li>• Client-requested changes</li>
              <li>• Damage from misuse</li>
              <li>• Consumable replacements</li>
            </ul>
            <p><strong>Retention and Final Certificate</strong></p>
            <p><strong>At Practical Completion:</strong> Half of retention released (typically 2.5% of contract value retained)</p>
            <p><strong>During DLP:</strong> Client notifies defects in writing; contractor rectifies</p>
            <p><strong>At DLP End:</strong> Final inspection; making good of any outstanding defects</p>
            <p><strong>Final Certificate:</strong> Issued after all defects rectified; remaining retention released</p>
            <p><strong>Notification requirement:</strong> Defects must be notified in writing during the DLP to be covered. Keep detailed records with photographs of all reported defects.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Post-Occupancy Support and Soft Landings">
            <p>Post-occupancy support ensures buildings perform as intended under actual operational conditions. The Soft Landings framework provides a structured approach to extended aftercare, performance monitoring, and feedback for continuous improvement.</p>
            <p><strong>BSRIA Soft Landings Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1: Inception:</strong> RIBA Stage 1-2 — Set performance targets, define roles</li>
              <li><strong>Stage 2: Design:</strong> RIBA Stage 3-4 — Review for operational efficiency, involve FM</li>
              <li><strong>Stage 3: Pre-handover:</strong> Final 12 weeks — Commissioning, training preparation</li>
              <li><strong>Stage 4: Initial Aftercare:</strong> First 4 weeks — Resident support, system fine-tuning</li>
              <li><strong>Stage 5: Extended Aftercare:</strong> Years 1-3 — Seasonal commissioning, POE, reviews</li>
            </ul>
            <p><strong>Post-Occupancy Evaluation (POE)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy performance:</strong> Compare actual consumption against design predictions</li>
              <li><strong>Occupant satisfaction:</strong> Surveys on comfort, lighting, controls</li>
              <li><strong>Functional performance:</strong> Does the building work for its intended use?</li>
              <li><strong>Maintainability:</strong> Feedback on access, serviceability, spare parts</li>
              <li><strong>Lessons learned:</strong> Capture feedback for future projects</li>
            </ul>
            <p><strong>POE Timing and Activities</strong></p>
            <p><strong>12-Month POE</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Full seasonal energy analysis</li>
              <li>• Occupant satisfaction survey</li>
              <li>• System performance review</li>
              <li>• Defects analysis and feedback</li>
              <li>• End of DLP review meeting</li>
            </ul>
            <p><strong>3-Year POE (Optional)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Long-term energy trend analysis</li>
              <li>• Equipment reliability assessment</li>
              <li>• Maintenance cost evaluation</li>
              <li>• User adaptation observations</li>
              <li>• Lessons learned documentation</li>
            </ul>
            <p><strong>Government Soft Landings (GSL)</strong></p>
            <p><strong>Mandatory for UK government projects.</strong> Key requirements include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Champion identified at project inception</li>
              <li>Reality checking of designs against operational requirements</li>
              <li>Minimum 3-week resident aftercare period</li>
              <li>POE at 12 months and 3 years mandatory</li>
              <li>Performance metrics and lessons learned published</li>
            </ul>
            <p><strong>Aftercare Support Arrangements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Helpdesk support:</strong> Telephone/email technical queries — 12 months minimum</li>
              <li><strong>Site visits:</strong> Monthly review meetings reducing to quarterly — First 12 months</li>
              <li><strong>Seasonal commissioning:</strong> Heating and cooling season optimisation — First full year</li>
              <li><strong>BMS support:</strong> Remote monitoring, setpoint adjustment — 12-24 months</li>
              <li><strong>Extended warranty:</strong> Equipment manufacturer support — 2-5 years</li>
            </ul>
            <p><strong>Performance gap:</strong> Studies show that buildings often consume 2-5 times more energy than design predictions. Soft Landings and POE help identify and close this performance gap.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Training Programme Development</strong>
            </p>
            <p><strong>Scenario:</strong> Develop a training programme for a new office building with BMS-controlled lighting and HVAC.</p>
            <p>Training Programme - ABC Office Building</p>
            <p>Session 1: FM Manager Training (1 day)</p>
            <p>---------------------------------------------</p>
            <p>09:00 - System overview and distribution architecture</p>
            <p>10:30 - Main switchgear operation and interlocks</p>
            <p>12:00 - Lunch</p>
            <p>13:00 - BMS system overview and graphics tour</p>
            <p>15:00 - Emergency procedures and isolation</p>
            <p>16:30 - Q&amp;A and documentation review</p>
            <p>Session 2: Maintenance Team (2 days)</p>
            <p>---------------------------------------------</p>
            <p>Day 1: Electrical systems, testing, safe isolation</p>
            <p>Day 2: HVAC controls, lighting controls, fault finding</p>
            <p>Attendees: Sign attendance register and competency checklist</p>
            <p>
              <strong>Example 2: Defects Period Management</strong>
            </p>
            <p><strong>Scenario:</strong> Track and manage defects during the 12-month liability period.</p>
            <p>Defects Register - Project XYZ</p>
            <p>Practical Completion: 15 March 2024</p>
            <p>DLP Ends: 14 March 2025</p>
            <p>Ref | Date | Location | Description | Status</p>
            <p>-----|----------|-------------|----------------------|--------</p>
            <p>D001 | 20/03/24 | Level 2 DB | Loose terminations | Rectified</p>
            <p>D002 | 05/04/24 | Reception | Lighting flicker | Rectified</p>
            <p>D003 | 15/05/24 | Plant room | Contactor failure | Rectified</p>
            <p>D004 | 22/09/24 | Office area | Underfloor heating |  <span>Outstanding</span></p>
            <p>D005 | 10/01/25 | Server room | UPS alarm fault |  <span>Outstanding</span></p>
            <p>Next review meeting: 28 February 2025</p>
            <p>All outstanding items to be closed before final certificate</p>
            <p>
              <strong>Example 3: Post-Occupancy Evaluation Report</strong>
            </p>
            <p><strong>Scenario:</strong> Summarise findings from a 12-month POE for a commercial building.</p>
            <p>12-Month Post-Occupancy Evaluation Summary</p>
            <p>Energy Performance:</p>
            <p>- Design prediction: 85 kWh/m²/year</p>
            <p>- Actual consumption: 102 kWh/m²/year (+20%)</p>
            <p>- Main variance: Extended operating hours, IT load</p>
            <p>Occupant Satisfaction (scale 1-5):</p>
            <p>- Thermal comfort: 3.8/5</p>
            <p>- Lighting quality: 4.2/5</p>
            <p>- Controls usability: 3.1/5  <span>&lt;-- Action required</span></p>
            <p>Key Findings:</p>
            <p>- BMS setpoints required adjustment for occupancy patterns</p>
            <p>- Lighting controls too complex - simplified interface needed</p>
            <p>- Emergency lighting test procedure clarified with FM</p>
            <p>Recommendations implemented; 3-year POE scheduled</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Key Standards and References:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BSRIA BG 54:</strong> Soft Landings Framework - 2018 edition</li>
              <li><strong>BSRIA BG 64:</strong> Design Framework for Building Services</li>
              <li><strong>BS 8536-1:</strong> Briefing for design and construction (Code of practice)</li>
              <li><strong>Government Soft Landings:</strong> Mandatory for public sector projects</li>
              <li><strong>CIBSE TM22:</strong> Energy Assessment and Reporting Methodology</li>
              <li><strong>JCT/NEC contracts:</strong> Defects liability provisions</li>
            </ul>
            <p>
              <strong>Handover Checklist - Electrical Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All EICs issued and test results complete</li>
              <li>O&amp;M manuals indexed and project-specific</li>
              <li>As-built drawings issued (marked "As-Built")</li>
              <li>FM training completed with signed attendance</li>
              <li>Operational demonstrations witnessed and recorded</li>
              <li>Spare parts handed over with storage location confirmed</li>
              <li>Access keys, lock-off devices, and panel keys provided</li>
              <li>Emergency contact list issued</li>
            </ul>
            <p>
              <strong>Common Handover Problems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Late documentation:</strong> O&amp;M manuals arriving weeks after occupation</li>
              <li><strong>Rushed training:</strong> Inadequate time for FM team to absorb information</li>
              <li><strong>Missing spares:</strong> Contractual spares not delivered or stored incorrectly</li>
              <li><strong>Incomplete snagging:</strong> Minor defects still being rectified during occupation</li>
              <li><strong>No aftercare plan:</strong> Contractor disengages immediately after handover</li>
            </ul>
          </ConceptBlock>

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Documentation
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module9")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                HNC Module 9
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section6_6;
