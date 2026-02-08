import { ArrowLeft, Grid3x3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Distributed Control Systems (DCS) - MOET Module 5 Section 4.5";
const DESCRIPTION = "Comprehensive guide to DCS architecture, controllers, redundancy, operator stations, historian servers, and comparison with PLC and SCADA systems for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What distinguishes a DCS from a standalone PLC system?",
    options: [
      "DCS is cheaper",
      "DCS integrates control, I/O, and operator interfaces across an entire plant in a unified architecture",
      "DCS only controls one loop",
      "DCS does not use digital communication"
    ],
    correctIndex: 1,
    explanation: "A DCS provides an integrated system covering all control, monitoring, and data management functions across the entire plant, with distributed processing and centralised engineering/operation."
  },
  {
    id: "qc2",
    question: "What is a controller in a DCS?",
    options: [
      "The operator's keyboard",
      "A processing unit that executes control strategies for a group of I/O points",
      "A network switch",
      "The historian database server"
    ],
    correctIndex: 1,
    explanation: "DCS controllers are redundant processing units that execute control algorithms (PID loops, sequences, logic) for their assigned I/O subsystems."
  },
  {
    id: "qc3",
    question: "What is the purpose of a DCS historian?",
    options: [
      "Recording who logged in and when",
      "Long-term storage of process data for trending, analysis, reporting, and compliance",
      "Backing up the control program",
      "Controlling the process during a network failure"
    ],
    correctIndex: 1,
    explanation: "The historian collects and stores time-stamped process data at defined intervals, enabling trend analysis, performance monitoring, batch reporting, and regulatory compliance."
  },
  {
    id: "qc4",
    question: "What does 'bumpless transfer' mean in a redundant DCS controller?",
    options: [
      "The controller reboots without errors",
      "Switchover from primary to standby controller occurs without any disturbance to the control outputs",
      "The operator does not notice any change on the screen",
      "The historian continues to log data"
    ],
    correctIndex: 1,
    explanation: "Bumpless transfer means the standby controller takes over from the primary without any step change or disturbance in the control outputs, maintaining stable process operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does DCS stand for?",
    options: ["Digital Communication System", "Distributed Control System", "Data Collection Server", "Direct Current Switching"],
    correctAnswer: 1,
    explanation: "DCS stands for Distributed Control System -- control processing is distributed across multiple controllers rather than centralised in a single unit."
  },
  {
    id: 2,
    question: "Which network topology is typical in a DCS?",
    options: ["Single bus with no redundancy", "Redundant Ethernet ring or dual-star topology", "Wireless mesh only", "Token ring"],
    correctAnswer: 1,
    explanation: "Modern DCS systems use redundant Ethernet networks (ring or dual-star topology) to ensure no single network failure disrupts control or operator access."
  },
  {
    id: 3,
    question: "What is the role of the engineering workstation in a DCS?",
    options: ["Running the control algorithms", "Configuring control strategies, I/O assignments, graphics, and alarm settings", "Providing operator interface only", "Acting as a data historian"],
    correctAnswer: 1,
    explanation: "The engineering workstation is used to configure and maintain the DCS including control strategies, I/O mapping, operator displays, alarm configuration, and system diagnostics."
  },
  {
    id: 4,
    question: "What is redundancy in a DCS controller?",
    options: ["Having spare parts in storage", "Two controllers running the same program, with automatic switchover if one fails", "Running the control program twice per scan", "Using two different programming languages"],
    correctAnswer: 1,
    explanation: "Controller redundancy means two identical controllers execute the same program simultaneously. If the primary fails, the standby takes over seamlessly (bumpless transfer) without process disruption."
  },
  {
    id: 5,
    question: "What is a marshalling cabinet in a DCS installation?",
    options: ["The main control room cabinet", "A cabinet where field wiring terminates and is cross-connected to the DCS I/O modules", "A cabinet containing the network switches only", "A fireproof enclosure for paper documents"],
    correctAnswer: 1,
    explanation: "Marshalling cabinets provide the termination point where field wiring from instruments and actuators is cross-connected to the DCS I/O modules, facilitating organised wiring and maintenance."
  },
  {
    id: 6,
    question: "What is the advantage of remote I/O in a DCS?",
    options: ["It eliminates the need for field wiring", "It reduces cable runs by placing I/O modules close to the field instruments, communicating over digital networks", "It is cheaper than local I/O", "It provides faster scan times"],
    correctAnswer: 1,
    explanation: "Remote I/O stations are located near the process area, significantly reducing the length of individual instrument cable runs. They communicate with the controller over a high-speed digital network."
  },
  {
    id: 7,
    question: "Which of these is a major DCS platform?",
    options: ["Siemens S7-1200", "Honeywell Experion PKS", "Arduino Mega", "Raspberry Pi"],
    correctAnswer: 1,
    explanation: "Honeywell Experion PKS is one of the major DCS platforms. Others include ABB Ability Symphony Plus, Emerson DeltaV, Siemens PCS 7, and Yokogawa CENTUM VP."
  },
  {
    id: 8,
    question: "What is alarm management in a DCS?",
    options: ["Turning off all alarms during maintenance", "A systematic approach to designing, implementing, and maintaining process alarms to ensure they are useful and actionable", "A list of emergency telephone numbers", "The volume control for the alarm horn"],
    correctAnswer: 1,
    explanation: "Alarm management (per ISA-18.2/IEC 62682) ensures alarms are properly rationalised, prioritised, and managed so operators receive timely, relevant alerts without alarm flooding."
  },
  {
    id: 9,
    question: "How does a DCS differ from SCADA?",
    options: ["They are identical", "DCS provides tightly integrated, high-speed control for a single plant; SCADA provides supervisory monitoring and control over geographically dispersed assets", "SCADA is always more expensive", "DCS cannot display process graphics"],
    correctAnswer: 1,
    explanation: "DCS is designed for integrated high-speed control within a plant. SCADA (Supervisory Control and Data Acquisition) is designed for monitoring and controlling geographically dispersed systems (pipelines, power grids) typically using RTUs and WAN communications."
  },
  {
    id: 10,
    question: "What is virtualisation in the context of DCS?",
    options: ["Running the DCS in a virtual reality environment", "Running operator stations, engineering workstations, and servers as virtual machines on shared hardware", "Simulating the process without real instruments", "Using virtual keyboards instead of physical ones"],
    correctAnswer: 1,
    explanation: "DCS virtualisation runs operator stations, engineering workstations, and historian servers as virtual machines on shared hardware, reducing hardware footprint, simplifying maintenance, and enabling automated backup/recovery."
  },
  {
    id: 11,
    question: "Which standard covers industrial automation cybersecurity?",
    options: ["BS 7671", "IEC 62443", "ISA-75.01", "ISO 9001"],
    correctAnswer: 1,
    explanation: "IEC 62443 is the international standard for industrial automation and control system cybersecurity, covering network segmentation, access control, and risk assessment."
  },
  {
    id: 12,
    question: "Under ST1426, why must maintenance technicians understand DCS systems?",
    options: ["They must design DCS systems from scratch", "They need to navigate operator displays, interpret alarms, understand loop configurations, and communicate with control engineers during fault-finding", "DCS is only relevant to software engineers", "It is optional knowledge not required for the EPA"],
    correctAnswer: 1,
    explanation: "Maintenance technicians working in plants with DCS systems must understand the architecture to navigate displays, interpret alarms, use trending tools for diagnostics, and work effectively with instrumentation and control engineers."
  }
];

const faqs = [
  {
    question: "When should I choose a DCS over a PLC-based system?",
    answer: "DCS is typically selected for large continuous or batch processes requiring hundreds or thousands of control loops, integrated operator interfaces, advanced control strategies, plant-wide data management, and high availability. PLC-based systems are preferred for discrete manufacturing, smaller installations, or where fast sequence/logic control is the primary requirement. Modern systems increasingly blur this distinction."
  },
  {
    question: "Can a DCS integrate with PLCs and third-party devices?",
    answer: "Yes. Modern DCS platforms support multiple communication protocols including OPC UA, Modbus TCP, EtherNet/IP, Profinet, and HART. This allows integration with PLCs (for package units or skids), smart instruments, safety systems, and enterprise-level systems (MES, ERP). Gateway and interface modules facilitate this integration."
  },
  {
    question: "What is virtualisation in the context of DCS?",
    answer: "DCS virtualisation runs operator stations, engineering workstations, and historian servers as virtual machines on shared hardware rather than dedicated physical computers. This reduces hardware footprint, simplifies maintenance and upgrades, provides automated backup/recovery, and enables centralised management of the computing infrastructure."
  },
  {
    question: "How is cybersecurity managed in a DCS?",
    answer: "DCS cybersecurity follows standards such as IEC 62443 (industrial automation security). Measures include network segmentation (DMZ between process and enterprise networks), firewalls, intrusion detection, role-based access control, patch management, secure remote access, and regular security assessments. The control system network must be isolated from direct internet access."
  },
  {
    question: "What happens if the DCS network fails?",
    answer: "With redundant networks, a single failure is transparent -- traffic switches to the surviving path automatically. If both network paths fail to a controller, the controller continues executing its control strategies using the last known setpoints and local I/O. Operator access may be lost temporarily, but process control continues. This 'degrade gracefully' philosophy is fundamental to DCS design."
  }
];

const MOETModule5Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Grid3x3 className="h-4 w-4" />
            <span>Module 5.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Distributed Control Systems (DCS)
          </h1>
          <p className="text-white/80">
            Architecture, components, redundancy and industrial applications of DCS
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Distributed processing:</strong> Control spread across multiple controllers</li>
              <li className="pl-1"><strong>Redundancy:</strong> Controllers, networks and I/O all duplicated</li>
              <li className="pl-1"><strong>Bumpless transfer:</strong> Seamless switchover on controller failure</li>
              <li className="pl-1"><strong>Historian:</strong> Long-term time-series data storage and trending</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault isolation:</strong> One controller failure only affects its area</li>
              <li className="pl-1"><strong>Alarm management:</strong> ISA-18.2 rationalisation and prioritisation</li>
              <li className="pl-1"><strong>Cybersecurity:</strong> IEC 62443 network segmentation essential</li>
              <li className="pl-1"><strong>Major platforms:</strong> Honeywell, ABB, Emerson, Siemens, Yokogawa</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the architecture and key components of a Distributed Control System",
              "Explain the roles of controllers, operator stations, engineering stations, and historian",
              "Understand controller redundancy, bumpless transfer, and high-availability design",
              "Differentiate between local I/O, remote I/O, and fieldbus I/O integration",
              "Compare DCS with PLC-based systems and SCADA for different applications",
              "Outline alarm management principles per ISA-18.2 and cybersecurity requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DCS Architecture Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Distributed Control System distributes control processing across multiple controllers located throughout
              the plant, connected by redundant high-speed communication networks. Unlike centralised systems where
              failure of a single processor halts the entire plant, a DCS ensures that failure of one controller only
              affects its assigned area while the rest of the plant continues operating normally.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DCS Architecture Layers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Field level:</strong> Instruments, actuators, field wiring -- the physical process interface</li>
                <li className="pl-1"><strong>I/O level:</strong> Input/output modules converting between field signals and digital data</li>
                <li className="pl-1"><strong>Control level:</strong> Controllers executing control strategies (PID, sequence, logic)</li>
                <li className="pl-1"><strong>Plant network:</strong> Redundant Ethernet connecting controllers, servers and workstations</li>
                <li className="pl-1"><strong>Operator/engineering level:</strong> HMI workstations, engineering stations, historian servers</li>
              </ul>
            </div>

            <p>
              Major DCS platforms include Honeywell Experion PKS, ABB Ability Symphony Plus, Emerson DeltaV,
              Siemens SIMATIC PCS 7/PCS neo, and Yokogawa CENTUM VP. Each provides a complete integrated system
              covering all levels from field I/O through to operator interface and plant data management.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Advantage of Distributed Architecture</p>
              <p className="text-sm text-white">
                If one controller fails, only its assigned area is affected. The rest of the plant continues operating
                normally. Combined with controller redundancy (primary/standby pairs), this provides the high availability
                (typically 99.99% or better) required for continuous process plants such as oil refineries, chemical
                plants, and power stations.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Understanding the DCS architecture layers helps maintenance technicians
              locate faults quickly -- is the problem at field level, I/O level, controller level, or network level?
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Controllers and Redundancy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DCS controllers are high-performance processing units that execute control strategies including PID loops,
              cascade control, ratio control, feedforward, batch sequences, and logic programmes. Each controller manages
              a defined set of I/O points -- typically several hundred analogue and digital signals representing a plant
              area or functional unit.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Controller Redundancy</h3>
                <p className="text-sm text-white">
                  Two identical controllers (primary and standby) run the same control strategies simultaneously. They
                  continuously synchronise their internal states so that if the primary fails, the standby takes over
                  with <strong>bumpless transfer</strong> -- no disturbance to the control outputs. The switchover
                  typically occurs within one control scan (10-100 ms).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Network Redundancy</h3>
                <p className="text-sm text-white">
                  Dual redundant Ethernet networks (ring or dual-star topology) ensure that no single cable break
                  or switch failure disconnects any component. I/O modules can also be configured with redundancy
                  for critical measurements. The combination provides the high availability required for continuous
                  process plants.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">I/O Subsystem Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">I/O Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Local I/O</td>
                      <td className="border border-white/10 px-3 py-2">In the control room / equipment room</td>
                      <td className="border border-white/10 px-3 py-2">Easy access for maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Remote I/O</td>
                      <td className="border border-white/10 px-3 py-2">Near the field instruments</td>
                      <td className="border border-white/10 px-3 py-2">Reduces cable runs significantly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fieldbus I/O</td>
                      <td className="border border-white/10 px-3 py-2">Digital communication to smart devices</td>
                      <td className="border border-white/10 px-3 py-2">Multi-drop wiring, diagnostics, less cabling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When a DCS controller reports a fault, check whether the standby
              has taken over successfully before investigating. If bumpless transfer has occurred, the process
              continues normally, giving you time to diagnose the failed primary controller without time pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Operator and Engineering Stations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Operator stations</strong> (HMI workstations) provide the interface for process operators to monitor
              and control the plant. They display process graphics (P&amp;ID-style diagrams with live data), trend displays,
              alarm lists, and faceplates for individual control loops. Modern DCS operator stations support multi-monitor
              configurations, allowing operators to view multiple areas simultaneously.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Engineering Stations</h3>
                <p className="text-sm text-white mb-2">
                  Used by control engineers to configure and maintain the DCS. Key functions include:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Defining control strategies using function block diagrams or structured text</li>
                  <li className="pl-1">Configuring I/O channel mappings and signal scaling</li>
                  <li className="pl-1">Designing operator display graphics and navigation</li>
                  <li className="pl-1">Setting up alarm priorities, limits, and deadbands</li>
                  <li className="pl-1">Tuning PID controllers and monitoring loop performance</li>
                  <li className="pl-1">Managing system security and user access levels</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Historian Server</h3>
                <p className="text-sm text-white">
                  The historian collects and stores time-stamped process data from all controllers at defined intervals
                  (typically 1-10 seconds). This data is used for trend analysis, performance optimisation, batch
                  reporting, regulatory compliance, and incident investigation. Modern historians use data compression
                  algorithms to efficiently store years of high-resolution process data.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Alarm Management Matters</p>
              <p className="text-sm text-white">
                Alarm management (per ISA-18.2/IEC 62682) is critical for safe operation. Poorly managed alarm systems
                result in alarm flooding -- operators receive so many alarms that they cannot distinguish genuine
                emergencies from nuisance alerts. Proper rationalisation, prioritisation, and suppression of
                standing alarms ensures operators receive timely, relevant alerts that require action.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Maintenance technicians must be able to use operator station trend
              displays for fault diagnosis, interpret alarm information, and navigate DCS graphics to locate
              loop information relevant to the equipment they are maintaining.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            DCS vs PLC vs SCADA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the differences between DCS, PLC-based systems, and SCADA helps maintenance technicians
              work effectively across different types of industrial automation. While modern technology is blurring
              the boundaries, each approach has distinct strengths.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DCS</td>
                      <td className="border border-white/10 px-3 py-2">Large continuous/batch process control</td>
                      <td className="border border-white/10 px-3 py-2">Oil refineries, chemical plants, power stations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PLC + HMI</td>
                      <td className="border border-white/10 px-3 py-2">Discrete manufacturing, fast sequence control</td>
                      <td className="border border-white/10 px-3 py-2">Automotive assembly, packaging, material handling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SCADA</td>
                      <td className="border border-white/10 px-3 py-2">Geographically dispersed supervisory control</td>
                      <td className="border border-white/10 px-3 py-2">Pipelines, power distribution, water/wastewater</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              <strong>DCS</strong> is optimised for large continuous and batch process control where tight integration,
              high-speed analogue control, plant-wide data management, and operator interfaces are required.
              <strong> PLC-based systems</strong> excel at discrete manufacturing and high-speed sequence control.
              <strong> SCADA</strong> is designed for supervisory monitoring and control of geographically dispersed
              assets using RTUs and WAN communications.
            </p>

            <p>
              The boundary between these systems is increasingly blurred as technology converges. Modern PLC systems
              with SCADA software can achieve DCS-like functionality for medium-scale applications, and DCS platforms
              now include PLC-style logic execution. Hybrid systems using all three technologies in a single plant
              are commonplace.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When starting work at a new site, ask what control system platform is
              installed and request an orientation. Understanding the system architecture and how to navigate the
              operator displays will significantly speed up your fault-finding work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cybersecurity and Modern DCS Trends
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As DCS systems become increasingly connected to enterprise networks and the internet, cybersecurity has
              become a critical concern. Industrial control systems are attractive targets for cyber attacks because
              disruption can have physical consequences -- process upsets, equipment damage, environmental releases,
              and safety incidents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 62443 Cybersecurity Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Network segmentation:</strong> DMZ between process and enterprise networks prevents direct access</li>
                <li className="pl-1"><strong>Firewalls and intrusion detection:</strong> Monitor and control traffic between network zones</li>
                <li className="pl-1"><strong>Role-based access control:</strong> Users only access functions appropriate to their role</li>
                <li className="pl-1"><strong>Patch management:</strong> Systematic testing and deployment of security updates</li>
                <li className="pl-1"><strong>Secure remote access:</strong> VPN with multi-factor authentication for remote support</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern DCS Trends</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Virtualisation:</strong> Running workstations and servers as virtual machines on shared hardware</li>
                <li className="pl-1"><strong>Cloud connectivity:</strong> Secure data transfer to cloud platforms for advanced analytics</li>
                <li className="pl-1"><strong>IIoT integration:</strong> Edge devices providing additional process data and diagnostics</li>
                <li className="pl-1"><strong>Advanced process control (APC):</strong> Model predictive control and optimisation layers</li>
                <li className="pl-1"><strong>Mobile operator stations:</strong> Tablet-based access for field operators</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Cybersecurity Is Everyone's Responsibility</p>
              <p className="text-sm text-white">
                As a maintenance technician, you play a role in DCS cybersecurity. Never connect unauthorised USB
                devices to DCS workstations. Never bypass access controls. Report any suspicious activity. Follow
                the site's IT/OT security procedures when connecting laptops or calibration equipment to the
                control system network.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> DCS systems form the backbone of large-scale industrial automation. The principles
              covered here provide the foundation for working effectively in DCS-controlled environments as
              required by ST1426.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">DCS Components</p>
                <ul className="space-y-0.5">
                  <li>Controllers -- execute control strategies</li>
                  <li>I/O modules -- field signal interface</li>
                  <li>Operator stations -- process monitoring and control</li>
                  <li>Engineering stations -- configuration and tuning</li>
                  <li>Historian -- long-term data storage and trending</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>ISA-18.2 / IEC 62682 -- alarm management</li>
                  <li>IEC 62443 -- industrial cybersecurity</li>
                  <li>Bumpless transfer -- seamless controller switchover</li>
                  <li>99.99% availability -- typical DCS target</li>
                  <li>Redundant Ethernet -- dual network paths</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Control Valves and Actuators
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-6">
              Next: Calibration of Process Instruments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_5;
