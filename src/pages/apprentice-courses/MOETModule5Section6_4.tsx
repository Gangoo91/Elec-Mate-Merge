import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cybersecurity in Industrial Networks - MOET Module 5 Section 6.4";
const DESCRIPTION = "Comprehensive guide to industrial cybersecurity for maintenance technicians: IEC 62443 framework, Purdue Model, DMZ architecture, defence in depth, network segmentation, access control, patch management, incident response, and the UK NIS Regulations. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "ot-cybersecurity-importance",
    question: "Why is cybersecurity critically important for industrial control systems?",
    options: [
      "Only to protect financial data and intellectual property",
      "Because a cyber attack on OT systems could cause physical harm, environmental damage, production loss, and safety hazards",
      "It is not important for industrial systems — they are isolated from the internet",
      "Only for regulatory compliance — there are no real technical risks"
    ],
    correctIndex: 1,
    explanation: "Unlike IT systems where the primary risk is data loss, attacks on industrial control systems can cause physical damage to equipment, safety incidents endangering workers and the public, environmental contamination, and extended production shutdowns costing millions of pounds."
  },
  {
    id: "iec-62443-scope",
    question: "What does the IEC 62443 standard series cover?",
    options: [
      "Electrical installation standards for industrial wiring",
      "A comprehensive framework for industrial automation and control system (IACS) cybersecurity",
      "PLC programming standards and best practices",
      "Cable colour codes and marking requirements for industrial networks"
    ],
    correctIndex: 1,
    explanation: "IEC 62443 is the international standard series specifically addressing cybersecurity for industrial automation and control systems (IACS). It covers organisational security policies, system architecture and design, component security requirements, and ongoing maintenance and operations."
  },
  {
    id: "dmz-purpose",
    question: "What is a DMZ in industrial network architecture?",
    options: [
      "A military exclusion zone around the plant perimeter",
      "A demilitarised zone — a network segment between the OT and IT networks that controls and monitors all data exchange between them",
      "A direct management zone where all PLCs are physically located",
      "A data monitoring zone for SCADA system displays"
    ],
    correctIndex: 1,
    explanation: "The DMZ (demilitarised zone) sits between the control (OT) network and the enterprise (IT) network. It contains data servers, historians, patch servers, and gateways that enable controlled data exchange. No direct connection exists between OT and IT — all traffic passes through DMZ services under controlled conditions."
  },
  {
    id: "defence-in-depth-concept",
    question: "What is the defence in depth approach to industrial cybersecurity?",
    options: [
      "Having a single, very strong firewall at the network perimeter",
      "Multiple overlapping layers of security controls so that if one layer is breached, additional layers continue to provide protection",
      "Burying all network cables underground for physical protection",
      "Using only the deepest encryption available for all communication"
    ],
    correctIndex: 1,
    explanation: "Defence in depth applies multiple, overlapping security measures (network segmentation, firewalls, access control, encryption, monitoring, physical security, procedures) so that no single point of failure compromises the entire system. If one layer is breached, the remaining layers continue to protect."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the Purdue Model in industrial cybersecurity?",
    options: [
      "A university research methodology for network testing",
      "A reference architecture defining hierarchical network zones from Level 0 (physical process) through Level 5 (enterprise) with security controls between each level",
      "A PLC programming model for structured text",
      "A calibration standard for network test equipment"
    ],
    correctAnswer: 1,
    explanation: "The Purdue Model (based on ISA-95/IEC 62264) defines network zones: Level 0 (physical process), Level 1 (basic control — PLCs, safety systems), Level 2 (area supervisory — HMIs), Level 3 (site operations — MES, historian), Level 3.5 (DMZ), Level 4 (enterprise — ERP), Level 5 (internet/cloud). Security controls are implemented at each boundary."
  },
  {
    id: 2,
    question: "What is network segmentation in the context of industrial systems?",
    options: [
      "Physically cutting network cables into shorter segments",
      "Dividing the network into separate zones using VLANs, firewalls, and access controls to limit the spread of threats and control traffic flow",
      "Connecting all devices to one large flat network for simplicity",
      "A method of increasing network speed by splitting bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Segmentation creates security zones that contain threats, limit the blast radius of an incident, and enable zone-specific access controls. Traffic between zones passes through firewalls or security appliances that enforce rules about what communication is permitted."
  },
  {
    id: 3,
    question: "What type of firewall is recommended between the OT and IT networks?",
    options: [
      "No firewall is needed — a standard router is sufficient",
      "An industrial firewall with deep packet inspection (DPI) that understands industrial protocols such as Modbus, OPC UA, and Profinet",
      "A standard consumer Wi-Fi router with basic NAT",
      "Only a software firewall installed on each HMI computer"
    ],
    correctAnswer: 1,
    explanation: "Industrial firewalls with deep packet inspection can inspect and filter industrial protocol traffic (Modbus, OPC UA, Profinet, EtherNet/IP), enforcing security rules at the application level rather than just the IP address and port level. This provides far more granular control over what commands and data can pass between zones."
  },
  {
    id: 4,
    question: "What is the purpose of security patch management for industrial OT systems?",
    options: [
      "To add new features and user interfaces to the PLC",
      "To fix known software vulnerabilities in operating systems, applications, and firmware before they can be exploited by attackers",
      "To improve production speed and throughput",
      "Patches are not relevant to industrial control systems"
    ],
    correctAnswer: 1,
    explanation: "Patch management addresses known vulnerabilities that could be exploited by attackers. For OT systems, patches must be tested in a representative non-production environment before deployment, and applied during planned maintenance windows to avoid disrupting control system operation."
  },
  {
    id: 5,
    question: "What is role-based access control (RBAC) in OT environments?",
    options: [
      "Allowing everyone the same level of access for simplicity",
      "Restricting system access based on the user's role, ensuring each person has only the minimum permissions needed for their job function",
      "Allowing remote access for all personnel at all times",
      "A backup control strategy using redundant controllers"
    ],
    correctAnswer: 1,
    explanation: "RBAC ensures that operators can view and control processes, engineers can configure and modify systems, and administrators can manage users and security — but no one has unnecessary access beyond their role. This limits the damage from compromised accounts and reduces the risk of accidental changes."
  },
  {
    id: 6,
    question: "What was the significance of the Stuxnet attack for industrial cybersecurity?",
    options: [
      "It had no lasting significance for the industry",
      "It demonstrated that industrial control systems (specifically PLCs) could be targeted by sophisticated cyber attacks to cause physical damage",
      "It only affected office computers and had no impact on industrial systems",
      "It was a minor inconvenience that was quickly resolved"
    ],
    correctAnswer: 1,
    explanation: "Stuxnet (discovered in 2010) was a highly sophisticated attack targeting Siemens S7-300 PLCs controlling uranium enrichment centrifuges. It demonstrated that cyber attacks could cross the digital-physical boundary and cause real physical damage to industrial equipment, fundamentally changing the perception of OT cybersecurity risk."
  },
  {
    id: 7,
    question: "What should an OT incident response plan include?",
    options: [
      "Only instructions for restarting computers after a virus scan",
      "Documented procedures for detecting, classifying, containing, investigating, and recovering from cybersecurity incidents in the OT environment, coordinated with operations and safety teams",
      "A list of IT helpdesk phone numbers",
      "Instructions for disconnecting all network cables"
    ],
    correctAnswer: 1,
    explanation: "An OT incident response plan defines procedures for the full incident lifecycle, considering the unique requirements of OT: maintaining safe process operation during the response, coordinating with operations and safety teams, preserving forensic evidence without disrupting production, and restoring systems to a known-good state."
  },
  {
    id: 8,
    question: "What is the purpose of OT network monitoring and anomaly detection?",
    options: [
      "Monitoring employee internet usage during work hours",
      "Continuously monitoring network traffic for unusual patterns that could indicate a cyber attack, unauthorised access, or a compromised device",
      "Measuring network speed for performance benchmarking only",
      "Tracking production output through network data"
    ],
    correctAnswer: 1,
    explanation: "OT network monitoring tools (such as Claroty, Nozomi Networks, Dragos) passively monitor network traffic, build asset inventories, learn normal communication patterns, and alert on anomalies such as new devices appearing, unusual protocol commands, or unexpected traffic that could indicate an attack or compromised device."
  },
  {
    id: 9,
    question: "What is the Security Level (SL) concept in IEC 62443?",
    options: [
      "The physical height of the security fence around the facility",
      "A measure of required security capability (SL 1 to SL 4) based on the threat level, from casual violations to sophisticated state-sponsored attacks",
      "The number of passwords required to access a system",
      "The encryption key length measured in bits"
    ],
    correctAnswer: 1,
    explanation: "IEC 62443 defines four Security Levels: SL 1 (protection against casual or accidental violations), SL 2 (intentional attack with low resources), SL 3 (intentional attack with moderate resources and expertise), SL 4 (intentional attack with high resources, such as state-sponsored). The required SL is determined by the risk assessment."
  },
  {
    id: 10,
    question: "How does OT cybersecurity differ from traditional IT cybersecurity?",
    options: [
      "There is no difference — they use identical approaches",
      "OT prioritises availability and safety over confidentiality, has long equipment lifecycles with legacy systems, limited downtime windows, and must consider physical safety implications",
      "OT cybersecurity is simpler because there are fewer devices",
      "IT cybersecurity is more important because it protects more valuable data"
    ],
    correctAnswer: 1,
    explanation: "OT prioritises availability and safety (a system shutdown can be more dangerous than a data breach). OT systems have long lifecycles (15-25 years) with legacy equipment that cannot be easily patched. Downtime windows for updates are limited. OT protocols often lack built-in security. Every security measure must be assessed for its impact on process safety."
  },
  {
    id: 11,
    question: "What are the UK NIS Regulations and who do they apply to?",
    options: [
      "Network Installation Standards that apply to all electrical contractors",
      "The Network and Information Systems Regulations 2018 requiring operators of essential services to manage cybersecurity risks to their OT systems and report significant incidents",
      "National Insurance Supplementary regulations for IT workers",
      "A voluntary code of practice with no enforcement"
    ],
    correctAnswer: 1,
    explanation: "The UK NIS Regulations (Network and Information Systems Regulations 2018) require operators of essential services (energy, water, transport, health, digital infrastructure) to take appropriate measures to manage cybersecurity risks to their OT and IT systems, and to report significant cyber incidents to the relevant competent authority. Non-compliance can result in enforcement action and financial penalties."
  },
  {
    id: 12,
    question: "What is the role of USB devices in OT security risks and what controls should be in place?",
    options: [
      "USB devices pose no security risk to OT systems",
      "USB is a significant attack vector — controls include disabling unused ports, whitelisting approved devices, scanning all media before use, and restricting personal USB devices from OT areas",
      "Only USB charging cables are a risk",
      "USB risks only apply to Windows computers, not PLCs"
    ],
    correctAnswer: 1,
    explanation: "USB devices are a significant attack vector for OT systems — Stuxnet famously spread via USB. Controls include: disabling unused USB ports (physically or via policy), whitelisting approved devices, scanning all USB media at a secure transfer station at the OT/IT boundary, and maintaining a policy that restricts personal USB devices from OT areas."
  }
];

const faqs = [
  {
    question: "How do I get started with OT cybersecurity at my facility?",
    answer: "Start with an asset inventory (know every device connected to the network), conduct a risk assessment per IEC 62443, implement network segmentation (separate OT from IT with a properly configured DMZ), enforce access control (remove default passwords, implement role-based access), establish patch management processes, and deploy passive network monitoring. Engage specialist OT cybersecurity consultants for the initial assessment and strategy development."
  },
  {
    question: "Should industrial control systems ever have internet access?",
    answer: "Control systems (Purdue Levels 0-2) should never have direct internet access. Data for remote monitoring or cloud services should be extracted through the DMZ using data diodes, secured gateways, or OPC UA servers. All external remote access should pass through VPN concentrators in the DMZ with multi-factor authentication and be logged and monitored."
  },
  {
    question: "What is the role of USB devices in OT security risks?",
    answer: "USB devices are a significant attack vector for OT systems — Stuxnet spread via infected USB drives. Controls include: disabling unused USB ports, whitelisting approved devices, scanning all USB media before use in OT systems using secure file transfer stations at the OT/IT boundary, and maintaining a policy that prohibits personal USB devices in OT areas."
  },
  {
    question: "How does OT cybersecurity differ from IT cybersecurity in practice?",
    answer: "OT prioritises availability and safety over confidentiality — a system shutdown can be more dangerous than a data breach. OT systems have long lifecycles (15-25 years) with legacy equipment that cannot be easily patched. Downtime windows for updates are extremely limited. OT protocols often lack built-in security features. Every security measure must be assessed for its potential impact on process safety and availability."
  },
  {
    question: "What training should maintenance technicians receive in cybersecurity?",
    answer: "All OT personnel should receive security awareness training covering: recognition of social engineering and phishing attempts, safe USB handling procedures, strong password management and avoidance of shared accounts, reporting procedures for suspicious activity or potential incidents, understanding of access control policies, and awareness of the potential consequences of cybersecurity breaches in an industrial environment."
  }
];

const MOETModule5Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6">
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
            <Shield className="h-4 w-4" />
            <span>Module 5.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cybersecurity in Industrial Networks
          </h1>
          <p className="text-white/80">
            IEC 62443 framework, network architecture, defence in depth, and protecting operational technology
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>OT cyber attacks</strong> can cause physical damage, safety incidents, and environmental harm</li>
              <li className="pl-1"><strong>IEC 62443</strong> is the international standard for industrial cybersecurity</li>
              <li className="pl-1"><strong>Defence in depth</strong> applies multiple security layers — no single point of failure</li>
              <li className="pl-1"><strong>DMZ architecture</strong> prevents direct OT-to-IT connectivity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Access control:</strong> Using strong passwords, avoiding shared accounts, following RBAC policies</li>
              <li className="pl-1"><strong>Patch management:</strong> Understanding why OT patches require testing and planned windows</li>
              <li className="pl-1"><strong>USB safety:</strong> Following procedures for connecting removable media to OT systems</li>
              <li className="pl-1"><strong>NIS Regulations:</strong> UK legal requirements for operators of essential services</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why cybersecurity is critical for industrial control systems",
              "Describe the IEC 62443 framework and its Security Level concept",
              "Apply the Purdue Model and DMZ architecture for network segmentation",
              "Implement defence in depth with firewalls, access control, and monitoring",
              "Outline patch management, incident response, and vulnerability management",
              "Differentiate between OT and IT cybersecurity priorities and challenges"
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
            Why Industrial Cybersecurity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial control systems manage physical processes — chemical reactions, power generation, water treatment, manufacturing. A cyber attack on these systems can have consequences far beyond data theft: physical damage to equipment, safety incidents endangering workers and the public, environmental releases of hazardous materials, and extended production shutdowns costing millions of pounds.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Evolving Threat Landscape</p>
              <p className="text-sm text-white mb-3">
                The threat to industrial systems has evolved dramatically over the past decade:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stuxnet (2010):</strong> Targeted Siemens S7-300 PLCs to physically damage uranium enrichment centrifuges — proved cyber attacks can cross the digital-physical boundary</li>
                <li className="pl-1"><strong>Ukrainian power grid (2015/2016):</strong> Coordinated attacks on distribution companies caused widespread power outages affecting hundreds of thousands of people</li>
                <li className="pl-1"><strong>TRITON/TRISIS (2017):</strong> Targeted Schneider Triconex safety instrumented systems — the first known attack specifically aimed at disabling safety systems</li>
                <li className="pl-1"><strong>Colonial Pipeline (2021):</strong> Ransomware attack on pipeline operations caused fuel supply disruptions across the southeastern United States</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why OT Systems Are Vulnerable</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Increasing connectivity:</strong> IIoT, remote access, and cloud integration expand the attack surface</li>
                <li className="pl-1"><strong>IT/OT convergence:</strong> Connecting previously isolated control networks to enterprise systems introduces new risk pathways</li>
                <li className="pl-1"><strong>Legacy systems:</strong> Equipment with 15-25 year lifecycles running unsupported operating systems with no security patches available</li>
                <li className="pl-1"><strong>Default credentials:</strong> Many devices ship with default passwords that are never changed</li>
                <li className="pl-1"><strong>Protocol vulnerabilities:</strong> Industrial protocols (Modbus, older OPC) were designed without security features</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Cybersecurity is not just an IT problem. Every maintenance technician who connects a laptop, USB drive, or mobile device to an OT network is part of the security perimeter. Understanding basic cybersecurity principles is now an essential skill for all OT personnel.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Network Architecture and Segmentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The foundation of industrial cybersecurity is proper network architecture. The Purdue Model provides the reference architecture that defines how industrial networks should be structured, with clear boundaries and security controls between each level.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Purdue Model — Network Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Contains</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">5</td><td className="border border-white/10 px-3 py-2">Enterprise/Internet</td><td className="border border-white/10 px-3 py-2">Internet, cloud services, external partners</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4</td><td className="border border-white/10 px-3 py-2">Enterprise Network</td><td className="border border-white/10 px-3 py-2">ERP, email, intranet, business systems</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3.5</td><td className="border border-white/10 px-3 py-2">DMZ</td><td className="border border-white/10 px-3 py-2">Historians, patch servers, remote access gateways</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3</td><td className="border border-white/10 px-3 py-2">Site Operations</td><td className="border border-white/10 px-3 py-2">MES, batch management, site historian</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2</td><td className="border border-white/10 px-3 py-2">Area Supervisory</td><td className="border border-white/10 px-3 py-2">HMI, SCADA, engineering workstations</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">1</td><td className="border border-white/10 px-3 py-2">Basic Control</td><td className="border border-white/10 px-3 py-2">PLCs, DCS controllers, SIS, drives</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">0</td><td className="border border-white/10 px-3 py-2">Physical Process</td><td className="border border-white/10 px-3 py-2">Sensors, actuators, field instruments</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The DMZ — Critical Separation Layer</p>
              <p className="text-sm text-white mb-3">
                The DMZ is the most critical element of the architecture. It provides controlled data exchange between OT (Levels 0-3) and IT (Level 4) without any direct connection:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Data historians in the DMZ receive process data from the OT side and make it available to the IT side</li>
                <li className="pl-1">Patch management servers in the DMZ stage tested patches before deployment to OT systems</li>
                <li className="pl-1">Remote access gateways in the DMZ provide VPN termination with multi-factor authentication</li>
                <li className="pl-1">Firewalls on both sides of the DMZ filter traffic — the OT firewall and the IT firewall have different rule sets</li>
                <li className="pl-1">No traffic passes directly from IT to OT or vice versa — all exchange goes through DMZ services</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zones and Conduits (IEC 62443-3-2)</p>
              <p className="text-sm text-white mb-3">
                Within the OT network, further segmentation creates security zones with controlled communication paths:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Zone:</strong> A group of assets with the same security requirements (e.g., a production cell, a utility system)</li>
                <li className="pl-1"><strong>Conduit:</strong> A controlled communication path between zones with defined security controls</li>
                <li className="pl-1"><strong>Blast radius:</strong> If one zone is compromised, segmentation prevents the attacker from moving to other zones</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Defence in Depth and Security Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Defence in depth is the principle of applying multiple, overlapping security layers so that no single failure compromises the entire system. This approach recognises that no single security measure is perfect — attackers may bypass any individual control, but a layered defence makes successful attacks much more difficult.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Network Security</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Network segmentation (zones and conduits)</li>
                  <li className="pl-1">Industrial firewalls with DPI</li>
                  <li className="pl-1">VPN with multi-factor authentication for remote access</li>
                  <li className="pl-1">Intrusion detection and prevention systems</li>
                  <li className="pl-1">Network monitoring and anomaly detection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Access Control</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Role-based access control (RBAC)</li>
                  <li className="pl-1">Strong, unique passwords (no shared accounts)</li>
                  <li className="pl-1">Multi-factor authentication for critical systems</li>
                  <li className="pl-1">Removal of all default credentials</li>
                  <li className="pl-1">Audit logging of all access and changes</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OT Network Monitoring Tools</p>
              <p className="text-sm text-white mb-3">
                Specialist OT network monitoring tools provide passive, non-intrusive visibility into the control network:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Claroty:</strong> OT asset discovery, threat detection, and vulnerability management</li>
                <li className="pl-1"><strong>Nozomi Networks:</strong> Real-time OT network monitoring with protocol-aware anomaly detection</li>
                <li className="pl-1"><strong>Dragos:</strong> Industrial cybersecurity platform with threat intelligence and incident response</li>
                <li className="pl-1">These tools understand industrial protocols (Modbus, OPC, Profinet, EtherNet/IP) and can detect malicious commands, configuration changes, and unusual device behaviour</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Endpoint Protection for OT</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Application whitelisting:</strong> Only approved applications can run on HMIs and engineering stations — blocks unknown malware</li>
                <li className="pl-1"><strong>USB controls:</strong> Disable unused ports, whitelist approved devices, scan all media at secure transfer stations</li>
                <li className="pl-1"><strong>Encryption:</strong> TLS for data in transit; encrypted storage for sensitive configuration data</li>
                <li className="pl-1"><strong>Backup and recovery:</strong> Regular backups of PLC programmes, HMI configurations, and system images for rapid recovery</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Patch Management and Incident Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Patch management and incident response are two of the most challenging aspects of OT cybersecurity. Unlike IT systems where patches can often be applied automatically, OT systems require careful testing and planned deployment to avoid disrupting critical processes.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OT Patch Management Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inventory:</strong> Maintain a complete inventory of all software versions on all OT devices</li>
                <li className="pl-1"><strong>Monitor:</strong> Track vendor security advisories for all OT software and firmware</li>
                <li className="pl-1"><strong>Test:</strong> Test patches in a representative non-production environment before deployment</li>
                <li className="pl-1"><strong>Plan:</strong> Schedule deployment during planned maintenance windows with rollback procedures</li>
                <li className="pl-1"><strong>Deploy:</strong> Apply patches with change management approval and documentation</li>
                <li className="pl-1"><strong>Compensate:</strong> For legacy systems that cannot be patched, implement compensating controls (network isolation, enhanced monitoring, application whitelisting)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Incident Response for OT</p>
              <p className="text-sm text-white mb-3">
                An OT incident response plan must address the unique requirements of industrial environments:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Detection:</strong> Network monitoring, operator awareness, automated alerts from security tools</li>
                <li className="pl-1"><strong>Classification:</strong> Assess severity and potential impact on safety, operations, and the environment</li>
                <li className="pl-1"><strong>Containment:</strong> Isolate affected systems whilst maintaining safe process operation — never shut down a process unsafely to contain a cyber incident</li>
                <li className="pl-1"><strong>Investigation:</strong> Preserve forensic evidence (network captures, log files, system images) without disrupting ongoing operations</li>
                <li className="pl-1"><strong>Recovery:</strong> Restore systems from known-good backups, verify integrity, and return to normal operation</li>
                <li className="pl-1"><strong>Lessons learned:</strong> Review the incident, update procedures, and improve defences</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Maintenance Note</p>
              <p className="text-sm text-white">
                As a maintenance technician, your role in cybersecurity includes: using strong unique passwords and never sharing accounts, following USB handling procedures, reporting any suspicious activity or unexpected system behaviour immediately, ensuring laptop and test equipment antivirus definitions are up to date before connecting to the OT network, and following the site's change management procedures for all system modifications.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            IEC 62443 and UK Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IEC 62443 standard series is the internationally recognised framework for industrial cybersecurity. It provides a structured, risk-based approach to securing industrial automation and control systems, applicable to all industries from manufacturing to critical national infrastructure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 62443 Structure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part 1 — General:</strong> Concepts, models, and terminology</li>
                <li className="pl-1"><strong>Part 2 — Policies and Procedures:</strong> Requirements for the asset owner's security management system</li>
                <li className="pl-1"><strong>Part 3 — System:</strong> Security technologies for the automation system (zones, conduits, security levels)</li>
                <li className="pl-1"><strong>Part 4 — Component:</strong> Security requirements for individual products (PLCs, switches, software)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Levels (SL)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Threat Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">SL 1</td><td className="border border-white/10 px-3 py-2">Casual or accidental violation</td><td className="border border-white/10 px-3 py-2">Accidental configuration change by authorised user</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">SL 2</td><td className="border border-white/10 px-3 py-2">Intentional, low resources</td><td className="border border-white/10 px-3 py-2">Disgruntled employee, basic hacking tools</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">SL 3</td><td className="border border-white/10 px-3 py-2">Intentional, moderate resources</td><td className="border border-white/10 px-3 py-2">Organised criminal group, specialised ICS knowledge</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">SL 4</td><td className="border border-white/10 px-3 py-2">Intentional, high resources</td><td className="border border-white/10 px-3 py-2">State-sponsored attack (e.g., Stuxnet level)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">The required Security Level is determined by a risk assessment considering the threats, vulnerabilities, and consequences specific to the facility.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">UK NIS Regulations</p>
              <p className="text-sm text-white">
                The UK's Network and Information Systems Regulations 2018 (NIS Regulations) require operators of essential services — including energy, water, transport, health, and digital infrastructure — to take appropriate and proportionate measures to manage the cybersecurity risks to their OT and IT systems. Operators must report significant cyber incidents to the relevant competent authority. Non-compliance can result in enforcement action and financial penalties of up to 17 million pounds. The National Cyber Security Centre (NCSC) provides guidance and the Cyber Assessment Framework (CAF) for self-assessment.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand the importance of cybersecurity in industrial environments, recognise common threats and vulnerabilities, follow organisational security policies and procedures, and understand the role of standards such as IEC 62443 in protecting industrial control systems.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Wireless and IoT
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5">
              Back to Module 5 Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section6_4;
