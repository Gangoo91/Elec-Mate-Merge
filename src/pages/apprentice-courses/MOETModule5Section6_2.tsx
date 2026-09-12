/**
 * MOET · Module 5 · Section 6 · Subsection 2 — Industrial Ethernet
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
 * original page; structure, shell and reading measure rebuilt. The original
 * page had no "Quick Reference" block (unlike some sibling pages), so
 * KeyTakeaways here condenses facts already stated in the body prose rather
 * than a separate summary box.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
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
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.6 · Subsection 2"
        title="Industrial Ethernet"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Profinet, EtherNet/IP, Modbus TCP, and the convergence of automation and IT networking.
          </p>

          <TLDR
            points={[
              'Industrial Ethernet adds real-time protocols and ruggedised hardware to standard Ethernet.',
              'Profinet is the leading protocol globally, with RT and IRT variants for different performance needs.',
              'EtherNet/IP dominates in Rockwell Automation ecosystems using the CIP application layer.',
              'OPC UA and TSN are enabling converged, secure, vendor-neutral networking.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain how Industrial Ethernet differs from standard office Ethernet',
              'Compare Profinet, EtherNet/IP, and Modbus TCP protocols and their applications',
              'Describe network components: managed switches, cables, connectors, and redundancy',
              'Explain MRP ring redundancy and its importance for network availability',
              'Outline OPC UA for vertical integration and TSN for converged networking',
              'Apply network segmentation principles for security and performance',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> using managed switch diagnostics, port mirroring,
                and Wireshark for network analysis.
              </li>
              <li>
                <strong>Commissioning:</strong> configuring IP addresses, importing GSDML files,
                verifying ring redundancy.
              </li>
              <li>
                <strong>Replacement:</strong> matching device type, firmware version, IP settings,
                and GSDML configuration.
              </li>
              <li>
                <strong>ST1426:</strong> maps to industrial networking and Ethernet communication
                knowledge requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Industrial Ethernet fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Industrial Ethernet fundamentals"
            onSite="When troubleshooting Industrial Ethernet, standard IT network tools (ping, Wireshark, SNMP browsers) are useful starting points. However, understanding the specific automation protocol (Profinet, EtherNet/IP) and its diagnostic features is essential for resolving control-level communication issues."
          >
            <p>
              Industrial Ethernet builds on standard IEEE 802.3 Ethernet technology — the same
              physical layer and data link layer used in office networks — but adds real-time
              automation protocols and ruggedised infrastructure for factory and process
              environments. This approach leverages the massive investment in Ethernet technology
              (high bandwidth, wide availability, established tooling) whilst meeting the
              deterministic requirements of industrial control.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The determinism challenge">
            <p>
              Standard Ethernet is inherently non-deterministic — the original CSMA/CD mechanism
              does not guarantee when a frame will be delivered. Industrial protocols solve this
              through various mechanisms:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Profinet RT:</strong> uses priority-tagged frames and dedicated bandwidth
                allocation within standard switched Ethernet.
              </li>
              <li>
                <strong>Profinet IRT:</strong> uses time-synchronised switching hardware for
                sub-microsecond jitter — requires IRT-capable switches.
              </li>
              <li>
                <strong>EtherNet/IP:</strong> uses implicit messaging with configurable RPI
                (Requested Packet Interval) over UDP/IP.
              </li>
              <li>
                <strong>TSN (IEEE 802.1):</strong> provides standard time-aware scheduling for
                deterministic traffic alongside best-effort traffic.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Network convergence benefits">
            <p>
              Industrial Ethernet provides the bandwidth to converge multiple functions on a single
              network infrastructure:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real-time I/O control:</strong> cyclic exchange of process data between
                controllers and field devices.
              </li>
              <li>
                <strong>Safety communication:</strong> PROFIsafe and CIP Safety over the same
                network as standard I/O.
              </li>
              <li>
                <strong>Motion control:</strong> coordinated multi-axis servo drives with
                sub-millisecond synchronisation.
              </li>
              <li>
                <strong>Video and camera data:</strong> machine vision and CCTV over the same
                infrastructure.
              </li>
              <li>
                <strong>Energy monitoring:</strong> power metering and energy management data.
              </li>
              <li>
                <strong>IT integration:</strong> MES, ERP, and cloud connectivity via standard IT
                protocols.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Profinet, EtherNet/IP, and Modbus TCP</ContentEyebrow>

          <ConceptBlock title="Profinet, EtherNet/IP, and Modbus TCP">
            <p>
              Three Industrial Ethernet protocols dominate the automation landscape. Understanding
              their differences, strengths, and typical applications is essential for any
              maintenance technician working with modern control systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Profinet">
            <p>
              Profinet is the most widely installed Industrial Ethernet protocol globally. It
              provides three performance classes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Profinet RT (Real-Time):</strong> cycle times 1-10 ms, suitable for most
                factory and process automation — uses standard Ethernet switches.
              </li>
              <li>
                <strong>Profinet IRT (Isochronous Real-Time):</strong> cycle times below 1 ms with
                sub-microsecond jitter — requires IRT-capable hardware for motion control.
              </li>
              <li>
                <strong>PROFIsafe:</strong> safety communication up to SIL 3 over the same network
                as standard I/O.
              </li>
              <li>
                <strong>Integration:</strong> seamless connection to existing Profibus DP and PA
                installations via proxy devices.
              </li>
              <li>
                <strong>Device description:</strong> GSDML files (XML-based, equivalent to GSD files
                in Profibus).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EtherNet/IP">
            <p>
              EtherNet/IP uses the CIP (Common Industrial Protocol) application layer over standard
              TCP/IP and UDP/IP:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Implicit messaging:</strong> real-time I/O data via UDP multicast with
                configurable RPI.
              </li>
              <li>
                <strong>Explicit messaging:</strong> configuration, diagnostics, and parameter
                access via TCP.
              </li>
              <li>
                <strong>CIP Safety:</strong> safety communication for safety-rated I/O and drives.
              </li>
              <li>
                <strong>Ecosystem:</strong> dominant in Rockwell Automation (Allen-Bradley) and
                widely used in North America.
              </li>
              <li>
                <strong>Device description:</strong> EDS (Electronic Data Sheet) files.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Modbus TCP">
            <p>
              Modbus TCP is the simplest of the three — an open, lightweight protocol with massive
              device support:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Protocol:</strong> standard Modbus register and coil transactions
                encapsulated in TCP/IP packets.
              </li>
              <li>
                <strong>Strengths:</strong> open, vendor-neutral, widely supported, easy to
                implement and troubleshoot.
              </li>
              <li>
                <strong>Limitations:</strong> no built-in determinism, limited diagnostics, no
                safety communication.
              </li>
              <li>
                <strong>Typical use:</strong> SCADA integration, energy metering, BMS, simple device
                monitoring.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Protocol comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">Profinet</th>
                    <th className="py-2 pr-4 font-medium text-white">EtherNet/IP</th>
                    <th className="py-2 font-medium text-white">Modbus TCP</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Organisation</td>
                    <td className="py-2 pr-4">PI / Siemens</td>
                    <td className="py-2 pr-4">ODVA / Rockwell</td>
                    <td className="py-2">Open / Modbus.org</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Real-time</td>
                    <td className="py-2 pr-4">RT and IRT</td>
                    <td className="py-2 pr-4">Implicit messaging</td>
                    <td className="py-2">Non-deterministic</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safety</td>
                    <td className="py-2 pr-4">PROFIsafe (SIL 3)</td>
                    <td className="py-2 pr-4">CIP Safety</td>
                    <td className="py-2">None</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Device files</td>
                    <td className="py-2 pr-4">GSDML (XML)</td>
                    <td className="py-2 pr-4">EDS</td>
                    <td className="py-2">Not required</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Fieldbus integration</td>
                    <td className="py-2 pr-4">Profibus proxy</td>
                    <td className="py-2 pr-4">DeviceNet proxy</td>
                    <td className="py-2">Modbus RTU gateway</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Network infrastructure and redundancy</ContentEyebrow>

          <ConceptBlock title="Network infrastructure and redundancy">
            <p>
              The physical infrastructure of an Industrial Ethernet network — switches, cables,
              connectors, and redundancy mechanisms — is critical for achieving the reliability
              required in industrial automation. A single cable break or switch failure must not
              cause a plant-wide shutdown.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Managed industrial switches">
            <p>
              Managed switches are the backbone of Industrial Ethernet networks, providing
              capabilities far beyond simple packet forwarding:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VLAN segmentation:</strong> isolating control traffic from other network
                traffic.
              </li>
              <li>
                <strong>QoS (Quality of Service):</strong> prioritising real-time automation frames
                over non-critical traffic.
              </li>
              <li>
                <strong>Port mirroring:</strong> copying traffic to a diagnostic port for analysis
                with Wireshark or protocol analysers.
              </li>
              <li>
                <strong>SNMP monitoring:</strong> remote monitoring of switch health, port status,
                and traffic statistics.
              </li>
              <li>
                <strong>Environmental rating:</strong> DIN-rail mounting, -40 to +75 degrees C,
                vibration and EMI resistance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Redundancy protocols">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MRP:</strong> ring topology, recovery less than 200 ms (Profinet standard).
              </li>
              <li>
                <strong>RSTP:</strong> star/mesh topology, recovery 1-5 seconds.
              </li>
              <li>
                <strong>PRP:</strong> parallel paths, zero recovery time (sends each frame twice).
              </li>
              <li>
                <strong>HSR:</strong> high-availability seamless redundancy for ring topologies.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Industrial cabling">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cat 5e:</strong> supports 100 Mbit/s Fast Ethernet.
              </li>
              <li>
                <strong>Cat 6A:</strong> supports up to 10 Gbit/s.
              </li>
              <li>
                <strong>M12 D-coded:</strong> IP67 field connectors for Ethernet.
              </li>
              <li>
                <strong>Fibre optic:</strong> long distances, electrical isolation, EMI immunity.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical maintenance note">
            <p>
              When replacing a managed industrial switch, ensure the replacement is configured with
              the same VLAN settings, port assignments, MRP role (manager or client), IP addresses,
              and redundancy parameters as the original. A misconfigured replacement switch can
              cause network-wide communication failures. Always maintain a backup of every switch
              configuration and document changes in the network management system.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>OPC UA and vertical integration</ContentEyebrow>

          <ConceptBlock
            title="OPC UA and vertical integration"
            onSite="OPC UA over TSN is expected to become the unified standard for industrial communication, potentially replacing the proprietary aspects of current protocols. Understanding both OPC UA and TSN concepts is increasingly important for maintenance technicians working with modern automation systems."
          >
            <p>
              OPC UA (Unified Architecture) is a platform-independent, secure communication standard
              that enables data exchange from the field level through manufacturing execution
              systems (MES) to enterprise resource planning (ERP). It is increasingly important as
              plants seek to integrate operational technology (OT) with information technology (IT)
              for data-driven decision making.
            </p>
          </ConceptBlock>

          <ConceptBlock title="OPC UA key features">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Platform independent:</strong> runs on any operating system — Windows,
                Linux, embedded devices.
              </li>
              <li>
                <strong>Built-in security:</strong> authentication, authorisation, encryption, and
                audit logging as standard.
              </li>
              <li>
                <strong>Information modelling:</strong> rich data models that describe not just
                values but their context, relationships, and meaning.
              </li>
              <li>
                <strong>Vendor neutral:</strong> supported by all major automation vendors —
                Siemens, Rockwell, ABB, Schneider, Honeywell.
              </li>
              <li>
                <strong>Companion specifications:</strong> standardised data models for specific
                industries (PackML for packaging, EUROMAP for plastics).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="TSN — the future of converged networking">
            <p>
              Time-Sensitive Networking (TSN) is a set of IEEE 802.1 standards being adopted for
              industrial automation:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time synchronisation (802.1AS):</strong> sub-microsecond clock
                synchronisation across all network devices.
              </li>
              <li>
                <strong>Scheduled traffic (802.1Qbv):</strong> time-aware scheduling that guarantees
                bandwidth for real-time traffic.
              </li>
              <li>
                <strong>Frame replication (802.1CB):</strong> redundancy for critical frames without
                protocol-specific mechanisms.
              </li>
              <li>
                <strong>OPC UA over TSN:</strong> combines OPC UA&apos;s rich data modelling with
                TSN&apos;s deterministic transport.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Network segmentation and security</ContentEyebrow>

          <ConceptBlock
            title="Network segmentation and security"
            onSite="Under ST1426, maintenance technicians are expected to understand Industrial Ethernet principles, identify network components, explain the role of managed switches and redundancy, and carry out basic network diagnostics using standard IT tools and vendor-specific automation tools."
          >
            <p>
              As Industrial Ethernet connects the factory floor to enterprise systems, network
              security and proper segmentation become essential. An unsecured industrial network is
              vulnerable to cyber attacks, accidental disruption from IT traffic, and uncontrolled
              device access that could compromise safety and production.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Segmentation principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Control network isolation:</strong> separate the control (OT) network from
                the enterprise (IT) network using firewalls and DMZs.
              </li>
              <li>
                <strong>Cell segmentation:</strong> divide the control network into cells or zones,
                each containing a logical group of devices.
              </li>
              <li>
                <strong>VLAN implementation:</strong> use VLANs on managed switches to create
                logical network segments.
              </li>
              <li>
                <strong>Firewall rules:</strong> define explicit allow rules for required traffic
                between zones; deny all other traffic by default.
              </li>
              <li>
                <strong>IEC 62443 compliance:</strong> follow the zones and conduits model defined
                in the industrial cybersecurity standard.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety consideration">
            <p>
              Never connect the industrial control network directly to the internet or to an
              unsecured office network. A cyber attack that disrupts the control network could cause
              safety incidents, equipment damage, environmental releases, or production shutdowns.
              All data exchange between the OT and IT domains must pass through a properly
              configured DMZ with industrial firewalls and controlled access policies per IEC 62443.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Troubleshooting Industrial Ethernet">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switch diagnostics:</strong> check port status, error counters, link speed,
                and duplex settings via the switch web interface or SNMP.
              </li>
              <li>
                <strong>Ping and traceroute:</strong> verify basic IP connectivity between devices.
              </li>
              <li>
                <strong>Wireshark:</strong> capture and analyse network traffic via port mirroring
                on the managed switch.
              </li>
              <li>
                <strong>Protocol-specific tools:</strong> Siemens PRONETA for Profinet, Rockwell
                Logix tools for EtherNet/IP.
              </li>
              <li>
                <strong>Cable testing:</strong> use industrial Ethernet cable testers to verify
                cable quality, length, and connector integrity.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Profinet is the leading global Industrial Ethernet protocol, with RT (1-10 ms) and IRT (sub-millisecond) variants; PROFIsafe carries safety up to SIL 3.',
              'EtherNet/IP uses the CIP application layer and dominates Rockwell Automation ecosystems; CIP Safety is its safety protocol.',
              'Modbus TCP is open and simple but has no built-in determinism, diagnostics or safety communication.',
              'MRP gives ring-topology recovery under 200 ms; RSTP, PRP and HSR are the alternative redundancy protocols.',
              'OPC UA is a secure, vendor-neutral standard for vertical integration from the field to the enterprise.',
              'TSN (IEEE 802.1) brings deterministic, time-synchronised communication to standard Ethernet.',
              'The control (OT) network must be isolated from the office (IT) network via firewalls and DMZs, following IEC 62443.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Fieldbus and Profibus Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Wireless and IoT in Industry
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section6_2;
