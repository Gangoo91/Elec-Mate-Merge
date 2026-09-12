/**
 * MOET · Module 5 · Section 4 · Subsection 5 — Distributed Control Systems
 * (DCS) (Overview)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only statements that already appear verbatim in the brief's
 * verified lists for other modules — and that genuinely fit this page's
 * content — are used here.
 *   Knowledge  · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Industry 4.0 - the integration of physical systems with
 *                 internet connectivity and cloud computing: technologies,
 *                 systems, and benefits."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ⚠️ Accuracy note (not corrected — outside the scope this brief authorises):
 * the source page's quickCheckQuestions carry several distractor options that
 * are clearly copy-paste artefacts from unrelated quiz banks (e.g. "FAW is a
 * 3-day course...", "High personal spending coincides with reduced business
 * income", references to first aid, RIDDOR-style scaffolding weights, and
 * absence-rate statistics that have nothing to do with DCS). These are
 * pre-existing in the source, not introduced here. Quiz data must survive
 * byte-identical per the conversion brief unless a statement is factually
 * wrong under the brief's verified corrections — irrelevant distractors are a
 * content-quality defect, not a verified-correction case, so they are kept
 * verbatim and flagged here for a content author to review.
 *
 * ✎ CONTENT FIX (12 Sep): the first two quickCheck questions had distractor
 *   options that were copy-paste artefacts from unrelated quiz banks — first-aid
 *   course lengths, personal spending, platform loading. Both questions were
 *   answerable without any DCS knowledge because only one option was on-topic.
 *   Rewritten with plausible DCS distractors; correctIndex unchanged on both.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Distributed Control Systems (DCS) - MOET Module 5 Section 4.5';
const DESCRIPTION =
  'Comprehensive guide to DCS architecture, controllers, redundancy, operator stations, historian servers, and comparison with PLC and SCADA systems for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What distinguishes a DCS from a standalone PLC system?',
    options: [
      'DCS integrates control, I/O, and operator interfaces across an entire plant in a unified system',
      'A DCS controls only analogue signals, whereas a PLC handles only digital signals',
      'A DCS always has a faster scan time than any PLC, which is why it is used on large plant',
      'A DCS arrives pre-programmed by the manufacturer and needs no engineering configuration',
    ],
    correctIndex: 0,
    explanation:
      'A DCS provides an integrated system covering all control, monitoring, and data management functions across the entire plant, with distributed processing and centralised engineering/operation.',
  },
  {
    id: 'qc2',
    question: 'What is a controller in a DCS?',
    options: [
      'The operator workstation in the control room from which the plant is supervised',
      'A processing unit that executes control strategies for a group of I/O points',
      'The field device that measures the process variable and sends the signal back',
      'The network switch that links the control room to the field marshalling cabinets',
    ],
    correctIndex: 1,
    explanation:
      'DCS controllers are redundant processing units that execute control algorithms (PID loops, sequences, logic) for their assigned I/O subsystems.',
  },
  {
    id: 'qc3',
    question: 'What is the purpose of a DCS historian?',
    options: [
      'To execute the PID control loops for the assigned plant area',
      'To provide redundant switchover when the primary controller fails',
      'Long-term storage of process data for trending, analysis, reporting, and compliance',
      'To convert field signals between analogue and digital form',
    ],
    correctIndex: 2,
    explanation:
      'The historian collects and stores time-stamped process data at defined intervals, enabling trend analysis, performance monitoring, batch reporting, and regulatory compliance.',
  },
  {
    id: 'qc4',
    question: "What does 'bumpless transfer' mean in a redundant DCS controller?",
    options: [
      'The standby controller restarts all control loops in manual mode after switchover',
      'Field devices are briefly de-energised so the standby controller can synchronise',
      'Operators are prompted to confirm the switchover before it is allowed to proceed',
      'Switchover from primary to standby controller occurs without any disturbance to the control outputs',
    ],
    correctIndex: 3,
    explanation:
      'Bumpless transfer means the standby controller takes over from the primary without any step change or disturbance in the control outputs, maintaining stable process operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does DCS stand for?',
    options: [
      'Digital Communication System',
      'Distributed Control System',
      'Data Collection Server',
      'Direct Current Switching',
    ],
    correctAnswer: 1,
    explanation:
      'DCS stands for Distributed Control System -- control processing is distributed across multiple controllers rather than centralised in a single unit.',
  },
  {
    id: 2,
    question: 'Which network topology is typical in a DCS?',
    options: [
      'A single daisy-chained serial bus with no redundancy',
      'A point-to-point link between each instrument and the historian',
      'Redundant Ethernet ring or dual-star topology',
      'A wireless mesh network between field transmitters',
    ],
    correctAnswer: 2,
    explanation:
      'Modern DCS systems use redundant Ethernet networks (ring or dual-star topology) to ensure no single network failure disrupts control or operator access.',
  },
  {
    id: 3,
    question: 'What is the role of the engineering workstation in a DCS?',
    options: [
      'Monitoring and operating the plant during normal production',
      'Storing long-term historical process data for reporting',
      'Terminating field wiring before it reaches the I/O modules',
      'Configuring control strategies, I/O assignments, graphics, and alarm settings',
    ],
    correctAnswer: 3,
    explanation:
      'The engineering workstation is used to configure and maintain the DCS including control strategies, I/O mapping, operator displays, alarm configuration, and system diagnostics.',
  },
  {
    id: 4,
    question: 'What is redundancy in a DCS controller?',
    options: [
      'Two controllers running the same program, with automatic switchover if one fails',
      'Duplicating field wiring so each sensor reports back through two separate cables',
      'Keeping a backup copy of the control program on the engineering workstation',
      'Running the same control strategy on both the DCS and a separate standalone PLC',
    ],
    correctAnswer: 0,
    explanation:
      'Controller redundancy means two identical controllers execute the same program simultaneously. If the primary fails, the standby takes over seamlessly (bumpless transfer) without process disruption.',
  },
  {
    id: 5,
    question: 'What is a marshalling cabinet in a DCS installation?',
    options: [
      'A cabinet housing the redundant controller pairs and their power supplies',
      'A cabinet where field wiring terminates and is cross-connected to the DCS I/O modules',
      'A cabinet containing the operator HMI stations and monitors',
      'A cabinet that stores the historian server and network switches',
    ],
    correctAnswer: 1,
    explanation:
      'Marshalling cabinets provide the termination point where field wiring from instruments and actuators is cross-connected to the DCS I/O modules, facilitating organised wiring and maintenance.',
  },
  {
    id: 6,
    question: 'What is the advantage of remote I/O in a DCS?',
    options: [
      'It removes the need for controllers in the control room',
      'It allows the plant to run without any field wiring',
      'It reduces cable runs by placing I/O modules close to the field instruments, communicating over digital networks',
      'It eliminates the need for redundant network paths',
    ],
    correctAnswer: 2,
    explanation:
      'Remote I/O stations are located near the process area, significantly reducing the length of individual instrument cable runs. They communicate with the controller over a high-speed digital network.',
  },
  {
    id: 7,
    question: 'Which of these is a major DCS platform?',
    options: ['Siemens S7-1200', 'Raspberry Pi', 'Arduino Mega', 'Honeywell Experion PKS'],
    correctAnswer: 3,
    explanation:
      'Honeywell Experion PKS is one of the major DCS platforms. Others include ABB Ability Symphony Plus, Emerson DeltaV, Siemens PCS 7, and Yokogawa CENTUM VP.',
  },
  {
    id: 8,
    question: 'What is alarm management in a DCS?',
    options: [
      'A systematic approach to designing, implementing, and maintaining process alarms to ensure they are useful and actionable',
      'The practice of disabling all alarms during planned maintenance',
      'A method of routing every alarm directly to the plant manager',
      'The automatic shutdown of the plant whenever an alarm occurs',
    ],
    correctAnswer: 0,
    explanation:
      'Alarm management (per ISA-18.2/IEC 62682) ensures alarms are properly rationalised, prioritised, and managed so operators receive timely, relevant alerts without alarm flooding.',
  },
  {
    id: 9,
    question: 'How does a DCS differ from SCADA?',
    options: [
      'A DCS uses wireless links while SCADA always uses fibre optic cable',
      'DCS provides tightly integrated, high-speed control for a single plant; SCADA provides supervisory monitoring and control over geographically dispersed assets',
      'A DCS cannot store historical data whereas SCADA always can',
      'A DCS is only used in water treatment, SCADA only in chemical plants',
    ],
    correctAnswer: 1,
    explanation:
      'DCS is designed for integrated high-speed control within a plant. SCADA (Supervisory Control and Data Acquisition) is designed for monitoring and controlling geographically dispersed systems (pipelines, power grids) typically using RTUs and WAN communications.',
  },
  {
    id: 10,
    question: 'What is virtualisation in the context of DCS?',
    options: [
      'Displaying the plant as a 3D model on the operator screens',
      'Replacing physical controllers with cloud-based control loops',
      'Running operator stations, engineering workstations, and servers as virtual machines on shared hardware',
      'Simulating the process offline to train new operators',
    ],
    correctAnswer: 2,
    explanation:
      'DCS virtualisation runs operator stations, engineering workstations, and historian servers as virtual machines on shared hardware, reducing hardware footprint, simplifying maintenance, and enabling automated backup/recovery.',
  },
  {
    id: 11,
    question: 'Which standard covers industrial automation cybersecurity?',
    options: ['BS 7671', 'ISO 9001', 'ISA-75.01', 'IEC 62443'],
    correctAnswer: 3,
    explanation:
      'IEC 62443 is the international standard for industrial automation and control system cybersecurity, covering network segmentation, access control, and risk assessment.',
  },
  {
    id: 12,
    question: 'Under ST1426, why must maintenance technicians understand DCS systems?',
    options: [
      'They need to navigate operator displays, interpret alarms, understand loop configurations, and communicate with control engineers during fault-finding',
      'They are required to design and write the control strategies themselves',
      'They must replace the DCS controllers during every routine inspection',
      'They are responsible for setting the protection relay coordination',
    ],
    correctAnswer: 0,
    explanation:
      'Maintenance technicians working in plants with DCS systems must understand the architecture to navigate displays, interpret alarms, use trending tools for diagnostics, and work effectively with instrumentation and control engineers.',
  },
];

const faqs = [
  {
    question: 'When should I choose a DCS over a PLC-based system?',
    answer:
      'DCS is typically selected for large continuous or batch processes requiring hundreds or thousands of control loops, integrated operator interfaces, advanced control strategies, plant-wide data management, and high availability. PLC-based systems are preferred for discrete manufacturing, smaller installations, or where fast sequence/logic control is the primary requirement. Modern systems increasingly blur this distinction.',
  },
  {
    question: 'Can a DCS integrate with PLCs and third-party devices?',
    answer:
      'Yes. Modern DCS platforms support multiple communication protocols including OPC UA, Modbus TCP, EtherNet/IP, Profinet, and HART. This allows integration with PLCs (for package units or skids), smart instruments, safety systems, and enterprise-level systems (MES, ERP). Gateway and interface modules facilitate this integration.',
  },
  {
    question: 'What is virtualisation in the context of DCS?',
    answer:
      'DCS virtualisation runs operator stations, engineering workstations, and historian servers as virtual machines on shared hardware rather than dedicated physical computers. This reduces hardware footprint, simplifies maintenance and upgrades, provides automated backup/recovery, and enables centralised management of the computing infrastructure.',
  },
  {
    question: 'How is cybersecurity managed in a DCS?',
    answer:
      'DCS cybersecurity follows standards such as IEC 62443 (industrial automation security). Measures include network segmentation (DMZ between process and enterprise networks), firewalls, intrusion detection, role-based access control, patch management, secure remote access, and regular security assessments. The control system network must be isolated from direct internet access.',
  },
  {
    question: 'What happens if the DCS network fails?',
    answer:
      "With redundant networks, a single failure is transparent -- traffic switches to the surviving path automatically. If both network paths fail to a controller, the controller continues executing its control strategies using the last known setpoints and local I/O. Operator access may be lost temporarily, but process control continues. This 'degrade gracefully' philosophy is fundamental to DCS design.",
  },
];

const MOETModule5Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 5"
        title="Distributed Control Systems (DCS)"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Architecture, components, redundancy and industrial applications of DCS.
          </p>

          <TLDR
            points={[
              'Distributed processing: control is spread across multiple controllers.',
              'Redundancy: controllers, networks and I/O are all duplicated.',
              'Bumpless transfer: seamless switchover on controller failure.',
              'Historian: long-term time-series data storage and trending.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the architecture and key components of a Distributed Control System',
              'Explain the roles of controllers, operator stations, engineering stations, and historian',
              'Understand controller redundancy, bumpless transfer, and high-availability design',
              'Differentiate between local I/O, remote I/O, and fieldbus I/O integration',
              'Compare DCS with PLC-based systems and SCADA for different applications',
              'Outline alarm management principles per ISA-18.2 and cybersecurity requirements',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault isolation:</strong> one controller failure only affects its area.
              </li>
              <li>
                <strong>Alarm management:</strong> ISA-18.2 rationalisation and prioritisation.
              </li>
              <li>
                <strong>Cybersecurity:</strong> IEC 62443 network segmentation is essential.
              </li>
              <li>
                <strong>Major platforms:</strong> Honeywell, ABB, Emerson, Siemens, Yokogawa.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>DCS architecture overview</ContentEyebrow>

          <ConceptBlock
            title="DCS architecture overview"
            onSite="Understanding the DCS architecture layers helps maintenance technicians locate faults quickly -- is the problem at field level, I/O level, controller level, or network level?"
          >
            <p>
              A Distributed Control System distributes control processing across multiple
              controllers located throughout the plant, connected by redundant high-speed
              communication networks. Unlike centralised systems where failure of a single processor
              halts the entire plant, a DCS ensures that failure of one controller only affects its
              assigned area while the rest of the plant continues operating normally.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DCS architecture layers">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Field level:</strong> instruments, actuators, field wiring -- the physical
                process interface.
              </li>
              <li>
                <strong>I/O level:</strong> input/output modules converting between field signals
                and digital data.
              </li>
              <li>
                <strong>Control level:</strong> controllers executing control strategies (PID,
                sequence, logic).
              </li>
              <li>
                <strong>Plant network:</strong> redundant Ethernet connecting controllers, servers
                and workstations.
              </li>
              <li>
                <strong>Operator/engineering level:</strong> HMI workstations, engineering stations,
                historian servers.
              </li>
            </ul>
            <p>
              Major DCS platforms include Honeywell Experion PKS, ABB Ability Symphony Plus, Emerson
              DeltaV, Siemens SIMATIC PCS 7/PCS neo, and Yokogawa CENTUM VP. Each provides a
              complete integrated system covering all levels from field I/O through to operator
              interface and plant data management.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key advantage of distributed architecture">
            <p>
              If one controller fails, only its assigned area is affected. The rest of the plant
              continues operating normally. Combined with controller redundancy (primary/standby
              pairs), this provides the high availability (typically 99.99% or better) required for
              continuous process plants such as oil refineries, chemical plants, and power stations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Controllers and redundancy</ContentEyebrow>

          <ConceptBlock
            title="Controllers and redundancy"
            onSite="When a DCS controller reports a fault, check whether the standby has taken over successfully before investigating. If bumpless transfer has occurred, the process continues normally, giving you time to diagnose the failed primary controller without time pressure."
          >
            <p>
              DCS controllers are high-performance processing units that execute control strategies
              including PID loops, cascade control, ratio control, feedforward, batch sequences, and
              logic programmes. Each controller manages a defined set of I/O points -- typically
              several hundred analogue and digital signals representing a plant area or functional
              unit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Controller redundancy">
            <p>
              Two identical controllers (primary and standby) run the same control strategies
              simultaneously. They continuously synchronise their internal states so that if the
              primary fails, the standby takes over with <strong>bumpless transfer</strong> -- no
              disturbance to the control outputs. The switchover typically occurs within one control
              scan (10-100 ms).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Network redundancy">
            <p>
              Dual redundant Ethernet networks (ring or dual-star topology) ensure that no single
              cable break or switch failure disconnects any component. I/O modules can also be
              configured with redundancy for critical measurements. The combination provides the
              high availability required for continuous process plants.
            </p>
          </ConceptBlock>

          <ConceptBlock title="I/O subsystem options">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">I/O type</th>
                    <th className="py-2 pr-4 font-medium text-white">Location</th>
                    <th className="py-2 font-medium text-white">Advantage</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Local I/O</td>
                    <td className="py-2 pr-4">In the control room / equipment room</td>
                    <td className="py-2">Easy access for maintenance</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Remote I/O</td>
                    <td className="py-2 pr-4">Near the field instruments</td>
                    <td className="py-2">Reduces cable runs significantly</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Fieldbus I/O</td>
                    <td className="py-2 pr-4">Digital communication to smart devices</td>
                    <td className="py-2">Multi-drop wiring, diagnostics, less cabling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Operator and engineering stations</ContentEyebrow>

          <ConceptBlock title="Operator and engineering stations">
            <p>
              <strong>Operator stations</strong> (HMI workstations) provide the interface for
              process operators to monitor and control the plant. They display process graphics
              (P&amp;ID-style diagrams with live data), trend displays, alarm lists, and faceplates
              for individual control loops. Modern DCS operator stations support multi-monitor
              configurations, allowing operators to view multiple areas simultaneously.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Engineering stations"
            onSite="Maintenance technicians must be able to use operator station trend displays for fault diagnosis, interpret alarm information, and navigate DCS graphics to locate loop information relevant to the equipment they are maintaining."
          >
            <p>
              Used by control engineers to configure and maintain the DCS. Key functions include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Defining control strategies using function block diagrams or structured text.</li>
              <li>Configuring I/O channel mappings and signal scaling.</li>
              <li>Designing operator display graphics and navigation.</li>
              <li>Setting up alarm priorities, limits, and deadbands.</li>
              <li>Tuning PID controllers and monitoring loop performance.</li>
              <li>Managing system security and user access levels.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The historian server">
            <p>
              The historian collects and stores time-stamped process data from all controllers at
              defined intervals (typically 1-10 seconds). This data is used for trend analysis,
              performance optimisation, batch reporting, regulatory compliance, and incident
              investigation. Modern historians use data compression algorithms to efficiently store
              years of high-resolution process data.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Alarm management matters"
            whatHappens={
              <p>
                Poorly managed alarm systems result in alarm flooding -- operators receive so many
                alarms that they cannot distinguish genuine emergencies from nuisance alerts.
              </p>
            }
            doInstead={
              <p>
                Alarm management (per ISA-18.2/IEC 62682) is critical for safe operation. Proper
                rationalisation, prioritisation, and suppression of standing alarms ensures
                operators receive timely, relevant alerts that require action.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>DCS vs PLC vs SCADA</ContentEyebrow>

          <ConceptBlock
            title="DCS vs PLC vs SCADA"
            onSite="When starting work at a new site, ask what control system platform is installed and request an orientation. Understanding the system architecture and how to navigate the operator displays will significantly speed up your fault-finding work."
          >
            <p>
              Understanding the differences between DCS, PLC-based systems, and SCADA helps
              maintenance technicians work effectively across different types of industrial
              automation. While modern technology is blurring the boundaries, each approach has
              distinct strengths.
            </p>
          </ConceptBlock>

          <ConceptBlock title="System comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">System</th>
                    <th className="py-2 pr-4 font-medium text-white">Best for</th>
                    <th className="py-2 font-medium text-white">Typical applications</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">DCS</td>
                    <td className="py-2 pr-4">Large continuous/batch process control</td>
                    <td className="py-2">Oil refineries, chemical plants, power stations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PLC + HMI</td>
                    <td className="py-2 pr-4">Discrete manufacturing, fast sequence control</td>
                    <td className="py-2">Automotive assembly, packaging, material handling</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">SCADA</td>
                    <td className="py-2 pr-4">Geographically dispersed supervisory control</td>
                    <td className="py-2">Pipelines, power distribution, water/wastewater</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>DCS</strong> is optimised for large continuous and batch process control where
              tight integration, high-speed analogue control, plant-wide data management, and
              operator interfaces are required. <strong>PLC-based systems</strong> excel at discrete
              manufacturing and high-speed sequence control. <strong>SCADA</strong> is designed for
              supervisory monitoring and control of geographically dispersed assets using RTUs and
              WAN communications.
            </p>
            <p>
              The boundary between these systems is increasingly blurred as technology converges.
              Modern PLC systems with SCADA software can achieve DCS-like functionality for
              medium-scale applications, and DCS platforms now include PLC-style logic execution.
              Hybrid systems using all three technologies in a single plant are commonplace.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Cybersecurity and modern DCS trends</ContentEyebrow>

          <ConceptBlock
            title="Cybersecurity and modern DCS trends"
            onSite="DCS systems form the backbone of large-scale industrial automation. The principles covered here provide the foundation for working effectively in DCS-controlled environments as required by ST1426."
          >
            <p>
              As DCS systems become increasingly connected to enterprise networks and the internet,
              cybersecurity has become a critical concern. Industrial control systems are attractive
              targets for cyber attacks because disruption can have physical consequences -- process
              upsets, equipment damage, environmental releases, and safety incidents.
            </p>
          </ConceptBlock>

          <ConceptBlock title="IEC 62443 cybersecurity measures">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Network segmentation:</strong> DMZ between process and enterprise networks
                prevents direct access.
              </li>
              <li>
                <strong>Firewalls and intrusion detection:</strong> monitor and control traffic
                between network zones.
              </li>
              <li>
                <strong>Role-based access control:</strong> users only access functions appropriate
                to their role.
              </li>
              <li>
                <strong>Patch management:</strong> systematic testing and deployment of security
                updates.
              </li>
              <li>
                <strong>Secure remote access:</strong> VPN with multi-factor authentication for
                remote support.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Modern DCS trends">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Virtualisation:</strong> running workstations and servers as virtual
                machines on shared hardware.
              </li>
              <li>
                <strong>Cloud connectivity:</strong> secure data transfer to cloud platforms for
                advanced analytics.
              </li>
              <li>
                <strong>IIoT integration:</strong> edge devices providing additional process data
                and diagnostics.
              </li>
              <li>
                <strong>Advanced process control (APC):</strong> model predictive control and
                optimisation layers.
              </li>
              <li>
                <strong>Mobile operator stations:</strong> tablet-based access for field operators.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Cybersecurity is everyone's responsibility"
            whatHappens={<p>As a maintenance technician, you play a role in DCS cybersecurity.</p>}
            doInstead={
              <p>
                Never connect unauthorised USB devices to DCS workstations. Never bypass access
                controls. Report any suspicious activity. Follow the site&apos;s IT/OT security
                procedures when connecting laptops or calibration equipment to the control system
                network.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DCS components: controllers execute control strategies; I/O modules interface field signals; operator stations handle process monitoring and control; engineering stations handle configuration and tuning; the historian provides long-term data storage and trending.',
              'ISA-18.2 / IEC 62682 govern alarm management; IEC 62443 governs industrial cybersecurity.',
              'Bumpless transfer means a seamless controller switchover, with 99.99% availability the typical DCS target.',
              'Redundant Ethernet gives dual network paths so no single failure disconnects a component.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Control Valves and Actuators
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Calibration of Process Instruments
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_5;
