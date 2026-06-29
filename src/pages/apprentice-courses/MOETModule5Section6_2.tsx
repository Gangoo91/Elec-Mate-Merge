import { ArrowLeft, Network, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Industrial Ethernet (Profinet, EtherNet/IP) - MOET Module 5 Section 6.2';
const DESCRIPTION =
  'Comprehensive guide to Industrial Ethernet protocols for maintenance technicians: Profinet IO and IRT, EtherNet/IP with CIP, Modbus TCP, managed switches, MRP ring redundancy, OPC UA vertical integration, and TSN converged networking. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'industrial-vs-office-ethernet',
    question: 'What distinguishes Industrial Ethernet from standard office Ethernet?',
    options: [
      'It uses a completely different cabling standard, incompatible with IEEE 802.3',
      'It always runs at a fixed 10 Mbit/s in order to guarantee link reliability',
      'It removes the need for any switches by connecting all the devices directly',
      'It adds deterministic real-time communication and ruggedised hardware to Ethernet',
    ],
    correctIndex: 3,
    explanation:
      'Industrial Ethernet uses standard IEEE 802.3 Ethernet infrastructure but adds real-time automation protocols (Profinet, EtherNet/IP), ruggedised switches and connectors rated for harsh environments, and deterministic communication mechanisms to meet the timing requirements of industrial control.',
  },
  {
    id: 'profinet-definition',
    question: 'What is Profinet and why is it significant in industrial automation?',
    options: [
      'A wireless protocol designed to replace all of the cabled field networks',
      'A proprietary fieldbus that only works with serial RS485 wiring connections',
      'The leading Industrial Ethernet protocol, integrating with existing Profibus',
      'A cybersecurity standard for isolating control networks from the IT networks',
    ],
    correctIndex: 2,
    explanation:
      'Profinet is the most widely installed Industrial Ethernet standard (IEC 61158/61784), developed by PI (Profibus International) and Siemens. It provides real-time communication for automation with native integration paths from existing Profibus networks, making migration straightforward.',
  },
  {
    id: 'deterministic-meaning',
    question: "What does 'deterministic' mean in the context of industrial communication networks?",
    options: [
      'The network topology is determined entirely by the IT department',
      'The number of devices on the network is fixed and cannot be changed',
      'The network always fails in the same way each time, predictably',
      'Communication has guaranteed timing — data arrives within a defined maximum time',
    ],
    correctIndex: 3,
    explanation:
      'Deterministic communication guarantees that data is delivered within a defined maximum time (the cycle time). This is essential for real-time control applications where late data could cause process upsets, product quality issues, or safety incidents.',
  },
  {
    id: 'modbus-tcp-role',
    question: 'What is Modbus TCP and where is it typically used in industrial systems?',
    options: [
      'The Modbus serial protocol over TCP/IP, used for simple device and SCADA links',
      'A safety-rated protocol used exclusively for SIL 3 emergency stop circuits',
      'A motion control protocol giving sub-microsecond synchronisation for servo drives',
      'A fibre-optic backbone protocol used only between separate buildings on a campus',
    ],
    correctIndex: 0,
    explanation:
      'Modbus TCP maps the established Modbus protocol (registers, coils, function codes) onto TCP/IP, providing simple, open communication over Ethernet. It is widely supported by diverse manufacturers and is commonly used for monitoring, SCADA integration, and energy metering where hard real-time performance is not required.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What speed does Industrial Ethernet typically operate at for field-level devices?',
    options: [
      '9.6 kbit/s, matching legacy serial fieldbus speeds',
      '100 Mbit/s (Fast Ethernet) or 1 Gbit/s for backbone connections',
      '10 Gbit/s minimum for every field-level connection',
      '1.2 Mbit/s, the maximum rate of a Profibus DP segment',
    ],
    correctAnswer: 1,
    explanation:
      'Industrial Ethernet typically operates at 100 Mbit/s (Fast Ethernet) for field-level devices, with 1 Gbit/s used for controller-to-controller communication and backbone connections between switches.',
  },
  {
    id: 2,
    question: 'What is the main difference between Profinet IO (RT) and Profinet IRT?',
    options: [
      'IO runs over copper cable only, whereas IRT runs only over fibre optic cable',
      'IO carries safety-rated data up to SIL 3, whereas IRT carries non-safety I/O',
      'IO uses standard switching (1-10 ms); IRT is isochronous for fast motion control',
      'IO is used for controller-to-controller links, whereas IRT is only for HMI updates',
    ],
    correctAnswer: 2,
    explanation:
      'Profinet IO (RT) provides real-time communication suitable for most automation tasks with cycle times of 1-10 ms. Profinet IRT provides isochronous real-time with sub-microsecond precision, required for demanding motion control applications such as coordinated multi-axis servo drives.',
  },
  {
    id: 3,
    question: 'What is EtherNet/IP and which vendor ecosystem primarily uses it?',
    options: [
      'A wireless Industrial Ethernet protocol from PI, dominant in Siemens systems',
      'A serial RS485 fieldbus protocol used mainly in legacy Profibus DP installs',
      'A safety-only protocol based on PROFIsafe, dominant in ABB process control',
      'The CIP-based Industrial Ethernet protocol from ODVA, dominant in Rockwell systems',
    ],
    correctAnswer: 3,
    explanation:
      'EtherNet/IP (Industrial Protocol) uses standard Ethernet with the CIP application layer, providing implicit (real-time I/O) and explicit (configuration and diagnostic) messaging. It is the primary protocol in Rockwell Automation (Allen-Bradley) ecosystems and is widely used in North American manufacturing.',
  },
  {
    id: 4,
    question: 'What type of network switch is required for Industrial Ethernet installations?',
    options: [
      'Managed industrial switches with DIN-rail mounting, redundancy and diagnostics',
      'Unmanaged domestic switches, as the automation protocol handles redundancy itself',
      'A simple Ethernet hub broadcasting every frame to all ports for deterministic delivery',
      'A wireless access point that removes the need for any cabled switch on the network',
    ],
    correctAnswer: 0,
    explanation:
      'Industrial managed switches provide DIN-rail mounting, wide temperature range (-40 to +75 degrees C), redundancy protocols (MRP, RSTP), VLAN support, QoS prioritisation for real-time frames, port mirroring for diagnostics, and SNMP monitoring capabilities.',
  },
  {
    id: 5,
    question: 'What is MRP (Media Redundancy Protocol) in Industrial Ethernet?',
    options: [
      'A protocol that assigns IP addresses automatically to every device on a star topology',
      'A protocol providing ring topology redundancy for Profinet networks with fast recovery after a link failure',
      'A protocol that prioritises real-time frames over best-effort traffic on a managed switch',
      'A protocol that encrypts control traffic crossing the boundary between the OT and IT networks',
    ],
    correctAnswer: 1,
    explanation:
      'MRP (Media Redundancy Protocol, IEC 62439-2) provides ring topology redundancy for Profinet networks. If a single cable is broken, the ring reconfigures and recovers communication within 200 ms (standard MRP) or 10 ms (enhanced MRP), maintaining network availability.',
  },
  {
    id: 6,
    question: 'What is a GSDML file in Profinet and what is it equivalent to in Profibus?',
    options: [
      'A firmware image loaded into the device at power-up, equivalent to the boot ROM in Profibus',
      'A log file recording communication errors, equivalent to the diagnostic buffer in Profibus',
      'The XML-based device description file for Profinet devices, equivalent to the GSD file used in Profibus',
      'An IP address configuration table, equivalent to the bus address rotary switches in Profibus',
    ],
    correctAnswer: 2,
    explanation:
      "GSDML (General Station Description Markup Language) is an XML-based device description file that describes a Profinet device's properties, modules, and communication parameters. It serves the same purpose as the GSD file in Profibus — enabling the controller's engineering tool to configure communication with the device.",
  },
  {
    id: 7,
    question:
      'What is TSN (Time-Sensitive Networking) and why is it important for industrial automation?',
    options: [
      'A cabling standard defining shielded Cat 6A and M12 connectors for field links',
      'A proprietary Siemens scheduling protocol that runs only on IRT Profinet hardware',
      'A wireless mesh standard synchronising mobile robots without cabled infrastructure',
      'IEEE 802.1 standards giving deterministic, low-latency comms over standard Ethernet',
    ],
    correctAnswer: 3,
    explanation:
      'TSN is a set of IEEE standards that enable deterministic, time-synchronised communication on standard Ethernet. It allows real-time control traffic, safety communication, and non-critical IT traffic to coexist on the same network infrastructure, potentially simplifying plant networking.',
  },
  {
    id: 8,
    question:
      'What cable category and connector type are typically specified for Industrial Ethernet in the field?',
    options: [
      'Cat 5e or Cat 6A shielded cable with M12 D-coded or IP67-rated RJ45 connectors',
      'Cat 3 unshielded cable with standard domestic RJ11 connectors',
      'Coaxial cable with BNC connectors as used in legacy 10BASE2 networks',
      'Single-pair telephone cable with insulation-displacement connectors',
    ],
    correctAnswer: 0,
    explanation:
      'Cat 5e supports 100 Mbit/s and Cat 6A supports up to 10 Gbit/s. Industrial installations use shielded cables with M12 D-coded connectors (providing IP67 environmental protection for field-level connections) or IP67-rated RJ45 connectors for less exposed locations.',
  },
  {
    id: 9,
    question: 'What advantage does OPC UA provide for industrial communication and integration?',
    options: [
      'It replaces the field-level I/O protocol, giving sub-microsecond motion control',
      'A secure, platform-independent interface for data exchange across automation and IT',
      'It locks the plant into a single vendor, with all devices from one manufacturer',
      'It guarantees deterministic real-time cyclic I/O without managed switches or TSN',
    ],
    correctAnswer: 1,
    explanation:
      'OPC UA (Unified Architecture) provides a secure, platform-independent data exchange standard enabling vertical integration from field devices through MES (Manufacturing Execution Systems) to enterprise ERP systems. It includes built-in security, information modelling, and is vendor-neutral.',
  },
  {
    id: 10,
    question: 'What is PROFIsafe and what safety integrity level can it achieve?',
    options: [
      'A cybersecurity firewall protocol for Profinet, blocking unauthorised access to SIL 1',
      'A diagnostic protocol that monitors switch health and reports faults up to SIL 2',
      'A safety protocol over Profinet, enabling safety comms to SIL 3 without safety wiring',
      'A redundancy protocol that duplicates safety frames on parallel rings up to SIL 4',
    ],
    correctAnswer: 2,
    explanation:
      'PROFIsafe is a safety communication protocol that runs over Profinet (and Profibus). It enables safety-related I/O communication up to SIL 3 (IEC 61508) / PL e (ISO 13849) using the same network infrastructure as standard I/O, eliminating the need for dedicated safety cabling.',
  },
  {
    id: 11,
    question: 'Why should the industrial control network be isolated from the office IT network?',
    options: [
      'Office Ethernet uses a cabling standard physically incompatible with control devices',
      'Isolation is needed as control and office protocols cannot share an IP address range',
      'It lets the control network run at a higher voltage than the office one, for range',
      'Direct connection exposes control to IT threats, broadcast storms and stray traffic',
    ],
    correctAnswer: 3,
    explanation:
      'Control networks must be isolated from office/IT networks using firewalls, DMZs, and network segmentation per IEC 62443. Direct connection risks IT security threats propagating to the control system, broadcast storms consuming bandwidth, and uncontrolled traffic disrupting the deterministic timing of real-time control communication.',
  },
  {
    id: 12,
    question: 'When is fibre optic cable used in Industrial Ethernet installations?',
    options: [
      'For long distances, isolation between buildings, EMI immunity and backbone links',
      'Only for the final short drop to each field device, where copper cannot terminate',
      'Whenever the network must carry safety-rated I/O, as copper cannot achieve SIL 3',
      'Only inside control panels, where short runs and low EMI make fibre the cheapest',
    ],
    correctAnswer: 0,
    explanation:
      'Fibre optic (single-mode or multi-mode) is used for long distances (up to several kilometres), electrical isolation between buildings or areas with different earth potentials, EMI-immune communication in electrically noisy environments (near VSD switchrooms), and high-bandwidth backbone connections between switches.',
  },
];

const faqs = [
  {
    question: 'Can I use standard office Ethernet switches in an industrial control network?',
    answer:
      'Office switches are not recommended for industrial control networks. They lack the environmental ratings (temperature, vibration, EMI immunity), DIN-rail mounting, industrial redundancy protocols (MRP, PRP), and diagnostic capabilities required for reliable industrial operation. Always use managed industrial switches rated for the specific installation environment.',
  },
  {
    question: 'Should the control network be connected to the office or IT network?',
    answer:
      'Not directly. Control networks should be isolated from office/IT networks using firewalls, DMZs (demilitarised zones), and network segmentation per IEC 62443. Direct connection exposes the control system to IT security threats, broadcast storms, and uncontrolled traffic that could disrupt real-time control communication.',
  },
  {
    question: 'What is the difference between Profinet and EtherNet/IP?',
    answer:
      'Both are Industrial Ethernet protocols but from different ecosystems. Profinet is promoted by PI (Profibus International) and is dominant in Siemens and European automation. EtherNet/IP is promoted by ODVA and is dominant in Rockwell Automation and North American automation. They use different application layers but both run on standard Ethernet infrastructure. Gateways or proxy devices can translate between them when needed.',
  },
  {
    question: 'Is fibre optic cable used in Industrial Ethernet?',
    answer:
      'Yes. Fibre optic (single-mode or multi-mode) is used for long distances (up to several kilometres), electrical isolation between buildings, EMI-immune communication in electrically noisy environments (near VSD switchrooms or high-current busbars), and backbone connections between switches. Industrial fibre connectors include SC, LC, and ruggedised variants designed for harsh environments.',
  },
  {
    question: 'How do I migrate from Profibus to Profinet?',
    answer:
      'Migration is typically phased. Profinet controllers can communicate with existing Profibus DP and PA devices via proxy devices (such as Siemens IE/PB Link). This allows the controller-level network to be upgraded to Profinet whilst retaining the existing field-level Profibus infrastructure. New devices are added directly on Profinet. Profibus PA segments in hazardous areas are often the last to be migrated due to the cost and complexity of recertification.',
  },
];

const MOETModule5Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Network className="h-4 w-4" />
            <span>Module 5.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Industrial Ethernet
          </h1>
          <p className="text-white">
            Profinet, EtherNet/IP, Modbus TCP, and the convergence of automation and IT networking
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Industrial Ethernet</strong> adds real-time protocols and ruggedised
                hardware to standard Ethernet
              </li>
              <li className="pl-1">
                <strong>Profinet</strong> is the leading protocol globally, with RT and IRT variants
                for different performance needs
              </li>
              <li className="pl-1">
                <strong>EtherNet/IP</strong> dominates in Rockwell Automation ecosystems using the
                CIP application layer
              </li>
              <li className="pl-1">
                <strong>OPC UA</strong> and <strong>TSN</strong> are enabling converged, secure,
                vendor-neutral networking
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Electrical Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Fault-finding:</strong> Using managed switch diagnostics, port mirroring,
                and Wireshark for network analysis
              </li>
              <li className="pl-1">
                <strong>Commissioning:</strong> Configuring IP addresses, importing GSDML files,
                verifying ring redundancy
              </li>
              <li className="pl-1">
                <strong>Replacement:</strong> Matching device type, firmware version, IP settings,
                and GSDML configuration
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Maps to industrial networking and Ethernet communication
                knowledge requirements
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain how Industrial Ethernet differs from standard office Ethernet',
              'Compare Profinet, EtherNet/IP, and Modbus TCP protocols and their applications',
              'Describe network components: managed switches, cables, connectors, and redundancy',
              'Explain MRP ring redundancy and its importance for network availability',
              'Outline OPC UA for vertical integration and TSN for converged networking',
              'Apply network segmentation principles for security and performance',
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
            Industrial Ethernet Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial Ethernet builds on standard IEEE 802.3 Ethernet technology — the same
              physical layer and data link layer used in office networks — but adds real-time
              automation protocols and ruggedised infrastructure for factory and process
              environments. This approach leverages the massive investment in Ethernet technology
              (high bandwidth, wide availability, established tooling) whilst meeting the
              deterministic requirements of industrial control.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Determinism Challenge
              </p>
              <p className="text-sm text-white mb-3">
                Standard Ethernet is inherently non-deterministic — the original CSMA/CD mechanism
                does not guarantee when a frame will be delivered. Industrial protocols solve this
                through various mechanisms:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Profinet RT:</strong> Uses priority-tagged frames and dedicated bandwidth
                  allocation within standard switched Ethernet
                </li>
                <li className="pl-1">
                  <strong>Profinet IRT:</strong> Uses time-synchronised switching hardware for
                  sub-microsecond jitter — requires IRT-capable switches
                </li>
                <li className="pl-1">
                  <strong>EtherNet/IP:</strong> Uses implicit messaging with configurable RPI
                  (Requested Packet Interval) over UDP/IP
                </li>
                <li className="pl-1">
                  <strong>TSN (IEEE 802.1):</strong> Provides standard time-aware scheduling for
                  deterministic traffic alongside best-effort traffic
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Network Convergence Benefits
              </p>
              <p className="text-sm text-white mb-3">
                Industrial Ethernet provides the bandwidth to converge multiple functions on a
                single network infrastructure:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Real-time I/O control:</strong> Cyclic exchange of process data between
                  controllers and field devices
                </li>
                <li className="pl-1">
                  <strong>Safety communication:</strong> PROFIsafe and CIP Safety over the same
                  network as standard I/O
                </li>
                <li className="pl-1">
                  <strong>Motion control:</strong> Coordinated multi-axis servo drives with
                  sub-millisecond synchronisation
                </li>
                <li className="pl-1">
                  <strong>Video and camera data:</strong> Machine vision and CCTV over the same
                  infrastructure
                </li>
                <li className="pl-1">
                  <strong>Energy monitoring:</strong> Power metering and energy management data
                </li>
                <li className="pl-1">
                  <strong>IT integration:</strong> MES, ERP, and cloud connectivity via standard IT
                  protocols
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When troubleshooting Industrial Ethernet, standard
              IT network tools (ping, Wireshark, SNMP browsers) are useful starting points. However,
              understanding the specific automation protocol (Profinet, EtherNet/IP) and its
              diagnostic features is essential for resolving control-level communication issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Profinet, EtherNet/IP, and Modbus TCP
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three Industrial Ethernet protocols dominate the automation landscape. Understanding
              their differences, strengths, and typical applications is essential for any
              maintenance technician working with modern control systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Profinet</p>
              <p className="text-sm text-white mb-3">
                Profinet is the most widely installed Industrial Ethernet protocol globally. It
                provides three performance classes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Profinet RT (Real-Time):</strong> Cycle times 1-10 ms, suitable for most
                  factory and process automation — uses standard Ethernet switches
                </li>
                <li className="pl-1">
                  <strong>Profinet IRT (Isochronous Real-Time):</strong> Cycle times below 1 ms with
                  sub-microsecond jitter — requires IRT-capable hardware for motion control
                </li>
                <li className="pl-1">
                  <strong>PROFIsafe:</strong> Safety communication up to SIL 3 over the same network
                  as standard I/O
                </li>
                <li className="pl-1">
                  <strong>Integration:</strong> Seamless connection to existing Profibus DP and PA
                  installations via proxy devices
                </li>
                <li className="pl-1">
                  <strong>Device description:</strong> GSDML files (XML-based, equivalent to GSD
                  files in Profibus)
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EtherNet/IP</p>
              <p className="text-sm text-white mb-3">
                EtherNet/IP uses the CIP (Common Industrial Protocol) application layer over
                standard TCP/IP and UDP/IP:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Implicit messaging:</strong> Real-time I/O data via UDP multicast with
                  configurable RPI
                </li>
                <li className="pl-1">
                  <strong>Explicit messaging:</strong> Configuration, diagnostics, and parameter
                  access via TCP
                </li>
                <li className="pl-1">
                  <strong>CIP Safety:</strong> Safety communication for safety-rated I/O and drives
                </li>
                <li className="pl-1">
                  <strong>Ecosystem:</strong> Dominant in Rockwell Automation (Allen-Bradley) and
                  widely used in North America
                </li>
                <li className="pl-1">
                  <strong>Device description:</strong> EDS (Electronic Data Sheet) files
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus TCP</p>
              <p className="text-sm text-white mb-3">
                Modbus TCP is the simplest of the three — an open, lightweight protocol with massive
                device support:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Protocol:</strong> Standard Modbus register and coil transactions
                  encapsulated in TCP/IP packets
                </li>
                <li className="pl-1">
                  <strong>Strengths:</strong> Open, vendor-neutral, widely supported, easy to
                  implement and troubleshoot
                </li>
                <li className="pl-1">
                  <strong>Limitations:</strong> No built-in determinism, limited diagnostics, no
                  safety communication
                </li>
                <li className="pl-1">
                  <strong>Typical use:</strong> SCADA integration, energy metering, BMS, simple
                  device monitoring
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Profinet</th>
                      <th className="border border-white/10 px-3 py-2 text-left">EtherNet/IP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modbus TCP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Organisation</td>
                      <td className="border border-white/10 px-3 py-2">PI / Siemens</td>
                      <td className="border border-white/10 px-3 py-2">ODVA / Rockwell</td>
                      <td className="border border-white/10 px-3 py-2">Open / Modbus.org</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Real-time</td>
                      <td className="border border-white/10 px-3 py-2">RT and IRT</td>
                      <td className="border border-white/10 px-3 py-2">Implicit messaging</td>
                      <td className="border border-white/10 px-3 py-2">Non-deterministic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety</td>
                      <td className="border border-white/10 px-3 py-2">PROFIsafe (SIL 3)</td>
                      <td className="border border-white/10 px-3 py-2">CIP Safety</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Device files</td>
                      <td className="border border-white/10 px-3 py-2">GSDML (XML)</td>
                      <td className="border border-white/10 px-3 py-2">EDS</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fieldbus integration</td>
                      <td className="border border-white/10 px-3 py-2">Profibus proxy</td>
                      <td className="border border-white/10 px-3 py-2">DeviceNet proxy</td>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU gateway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Network Infrastructure and Redundancy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The physical infrastructure of an Industrial Ethernet network — switches, cables,
              connectors, and redundancy mechanisms — is critical for achieving the reliability
              required in industrial automation. A single cable break or switch failure must not
              cause a plant-wide shutdown.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Managed Industrial Switches
              </p>
              <p className="text-sm text-white mb-3">
                Managed switches are the backbone of Industrial Ethernet networks, providing
                capabilities far beyond simple packet forwarding:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>VLAN segmentation:</strong> Isolating control traffic from other network
                  traffic
                </li>
                <li className="pl-1">
                  <strong>QoS (Quality of Service):</strong> Prioritising real-time automation
                  frames over non-critical traffic
                </li>
                <li className="pl-1">
                  <strong>Port mirroring:</strong> Copying traffic to a diagnostic port for analysis
                  with Wireshark or protocol analysers
                </li>
                <li className="pl-1">
                  <strong>SNMP monitoring:</strong> Remote monitoring of switch health, port status,
                  and traffic statistics
                </li>
                <li className="pl-1">
                  <strong>Environmental rating:</strong> DIN-rail mounting, -40 to +75 degrees C,
                  vibration and EMI resistance
                </li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Redundancy Protocols
                </h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>MRP:</strong> Ring topology, recovery less than 200 ms (Profinet
                    standard)
                  </li>
                  <li className="pl-1">
                    <strong>RSTP:</strong> Star/mesh topology, recovery 1-5 seconds
                  </li>
                  <li className="pl-1">
                    <strong>PRP:</strong> Parallel paths, zero recovery time (sends each frame
                    twice)
                  </li>
                  <li className="pl-1">
                    <strong>HSR:</strong> High-availability seamless redundancy for ring topologies
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Cabling</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>Cat 5e:</strong> Supports 100 Mbit/s Fast Ethernet
                  </li>
                  <li className="pl-1">
                    <strong>Cat 6A:</strong> Supports up to 10 Gbit/s
                  </li>
                  <li className="pl-1">
                    <strong>M12 D-coded:</strong> IP67 field connectors for Ethernet
                  </li>
                  <li className="pl-1">
                    <strong>Fibre optic:</strong> Long distances, electrical isolation, EMI immunity
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Maintenance Note</p>
              <p className="text-sm text-white">
                When replacing a managed industrial switch, ensure the replacement is configured
                with the same VLAN settings, port assignments, MRP role (manager or client), IP
                addresses, and redundancy parameters as the original. A misconfigured replacement
                switch can cause network-wide communication failures. Always maintain a backup of
                every switch configuration and document changes in the network management system.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            OPC UA and Vertical Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OPC UA (Unified Architecture) is a platform-independent, secure communication standard
              that enables data exchange from the field level through manufacturing execution
              systems (MES) to enterprise resource planning (ERP). It is increasingly important as
              plants seek to integrate operational technology (OT) with information technology (IT)
              for data-driven decision making.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OPC UA Key Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Platform independent:</strong> Runs on any operating system — Windows,
                  Linux, embedded devices
                </li>
                <li className="pl-1">
                  <strong>Built-in security:</strong> Authentication, authorisation, encryption, and
                  audit logging as standard
                </li>
                <li className="pl-1">
                  <strong>Information modelling:</strong> Rich data models that describe not just
                  values but their context, relationships, and meaning
                </li>
                <li className="pl-1">
                  <strong>Vendor neutral:</strong> Supported by all major automation vendors —
                  Siemens, Rockwell, ABB, Schneider, Honeywell
                </li>
                <li className="pl-1">
                  <strong>Companion specifications:</strong> Standardised data models for specific
                  industries (PackML for packaging, EUROMAP for plastics)
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                TSN — The Future of Converged Networking
              </p>
              <p className="text-sm text-white mb-3">
                Time-Sensitive Networking (TSN) is a set of IEEE 802.1 standards being adopted for
                industrial automation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Time synchronisation (802.1AS):</strong> Sub-microsecond clock
                  synchronisation across all network devices
                </li>
                <li className="pl-1">
                  <strong>Scheduled traffic (802.1Qbv):</strong> Time-aware scheduling that
                  guarantees bandwidth for real-time traffic
                </li>
                <li className="pl-1">
                  <strong>Frame replication (802.1CB):</strong> Redundancy for critical frames
                  without protocol-specific mechanisms
                </li>
                <li className="pl-1">
                  <strong>OPC UA over TSN:</strong> Combines OPC UA's rich data modelling with TSN's
                  deterministic transport
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> OPC UA over TSN is expected to become the unified standard
              for industrial communication, potentially replacing the proprietary aspects of current
              protocols. Understanding both OPC UA and TSN concepts is increasingly important for
              maintenance technicians working with modern automation systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Network Segmentation and Security
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As Industrial Ethernet connects the factory floor to enterprise systems, network
              security and proper segmentation become essential. An unsecured industrial network is
              vulnerable to cyber attacks, accidental disruption from IT traffic, and uncontrolled
              device access that could compromise safety and production.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Segmentation Principles
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Control network isolation:</strong> Separate the control (OT) network from
                  the enterprise (IT) network using firewalls and DMZs
                </li>
                <li className="pl-1">
                  <strong>Cell segmentation:</strong> Divide the control network into cells or
                  zones, each containing a logical group of devices
                </li>
                <li className="pl-1">
                  <strong>VLAN implementation:</strong> Use VLANs on managed switches to create
                  logical network segments
                </li>
                <li className="pl-1">
                  <strong>Firewall rules:</strong> Define explicit allow rules for required traffic
                  between zones; deny all other traffic by default
                </li>
                <li className="pl-1">
                  <strong>IEC 62443 compliance:</strong> Follow the zones and conduits model defined
                  in the industrial cybersecurity standard
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Consideration</p>
              <p className="text-sm text-white">
                Never connect the industrial control network directly to the internet or to an
                unsecured office network. A cyber attack that disrupts the control network could
                cause safety incidents, equipment damage, environmental releases, or production
                shutdowns. All data exchange between the OT and IT domains must pass through a
                properly configured DMZ with industrial firewalls and controlled access policies per
                IEC 62443.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Troubleshooting Industrial Ethernet
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Switch diagnostics:</strong> Check port status, error counters, link
                  speed, and duplex settings via the switch web interface or SNMP
                </li>
                <li className="pl-1">
                  <strong>Ping and traceroute:</strong> Verify basic IP connectivity between devices
                </li>
                <li className="pl-1">
                  <strong>Wireshark:</strong> Capture and analyse network traffic via port mirroring
                  on the managed switch
                </li>
                <li className="pl-1">
                  <strong>Protocol-specific tools:</strong> Siemens PRONETA for Profinet, Rockwell
                  Logix tools for EtherNet/IP
                </li>
                <li className="pl-1">
                  <strong>Cable testing:</strong> Use industrial Ethernet cable testers to verify
                  cable quality, length, and connector integrity
                </li>
              </ul>
            </div>

            <p className="text-sm text-white italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to
              understand Industrial Ethernet principles, identify network components, explain the
              role of managed switches and redundancy, and carry out basic network diagnostics using
              standard IT tools and vendor-specific automation tools.
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fieldbus and Profibus
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-3">
              Next: Wireless and IoT in Industry
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule5Section6_2;
