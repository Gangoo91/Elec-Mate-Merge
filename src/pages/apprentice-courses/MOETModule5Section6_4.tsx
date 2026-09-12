/**
 * MOET · Module 5 · Section 6 · Subsection 4 — Cybersecurity in Industrial
 * Networks
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Industry 4.0 - the integration of physical systems with
 *                 internet connectivity and cloud computing: technologies,
 *                 systems, and benefits."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * placed its four InlineCheck questions out of numeric order (0, 2, 1, 3)
 * because each pairs with the section it follows — that pairing is preserved
 * here rather than renumbered. This is the last subsection of the last
 * section of Module 5, so the "next" nav card returns to the Module 5
 * overview, matching the original page's own navigation choice.
 *
 * Accuracy note: the UK NIS Regulations 2018 penalty figure (£17m) and the
 * incident-history dates (Stuxnet 2010, Ukraine 2015/2016, TRITON 2017,
 * Colonial Pipeline 2021) are carried over verbatim from the source and were
 * not independently re-verified against a primary source as part of this
 * conversion — flagged per the brief's "report, do not fix" rule for any
 * numeric value not confirmable from the page itself.
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cybersecurity in Industrial Networks - MOET Module 5 Section 6.4';
const DESCRIPTION =
  'Comprehensive guide to industrial cybersecurity for maintenance technicians: IEC 62443 framework, Purdue Model, DMZ architecture, defence in depth, network segmentation, access control, patch management, incident response, and the UK NIS Regulations. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'ot-cybersecurity-importance',
    question: 'Why is cybersecurity critically important for industrial control systems?',
    options: [
      'Because OT systems hold the most commercially sensitive corporate financial data on the network',
      'Because a cyber attack on OT systems could cause physical harm, environmental damage, production loss, and safety hazards',
      'Because control systems consume the largest share of the site electrical load',
      'Because OT equipment is more expensive to replace than office IT hardware',
    ],
    correctIndex: 1,
    explanation:
      'Unlike IT systems where the primary risk is data loss, attacks on industrial control systems can cause physical damage to equipment, safety incidents endangering workers and the public, environmental contamination, and extended production shutdowns costing millions of pounds.',
  },
  {
    id: 'iec-62443-scope',
    question: 'What does the IEC 62443 standard series cover?',
    options: [
      'A comprehensive framework for industrial automation and control system (IACS) cybersecurity',
      'Minimum insulation-resistance values for industrial fixed wiring installations',
      'Energy efficiency labelling requirements for industrial motors and drives',
      'The functional safety lifecycle for safety instrumented systems only',
    ],
    correctIndex: 0,
    explanation:
      'IEC 62443 is the international standard series specifically addressing cybersecurity for industrial automation and control systems (IACS). It covers organisational security policies, system architecture and design, component security requirements, and ongoing maintenance and operations.',
  },
  {
    id: 'dmz-purpose',
    question: 'What is a DMZ in industrial network architecture?',
    options: [
      'A redundant backup network that mirrors the entire control system in real time',
      'A wireless mesh zone used to connect mobile maintenance laptops directly to PLCs',
      'A high-security physical room where the main control servers are housed',
      'A buffer network segment between the OT and IT networks that controls all data exchange',
    ],
    correctIndex: 3,
    explanation:
      'The DMZ (demilitarised zone) sits between the control (OT) network and the enterprise (IT) network. It contains data servers, historians, patch servers, and gateways that enable controlled data exchange. No direct connection exists between OT and IT — all traffic passes through DMZ services under controlled conditions.',
  },
  {
    id: 'defence-in-depth-concept',
    question: 'What is the defence in depth approach to industrial cybersecurity?',
    options: [
      'Multiple overlapping layers of security controls so that if one layer is breached, additional layers continue to provide protection',
      'Concentrating all security investment into a single high-specification perimeter firewall',
      'Disconnecting the control network entirely so no external access is ever possible',
      'Relying on antivirus software installed on every device as the sole control',
    ],
    correctIndex: 0,
    explanation:
      'Defence in depth applies multiple, overlapping security measures (network segmentation, firewalls, access control, encryption, monitoring, physical security, procedures) so that no single point of failure compromises the entire system. If one layer is breached, the remaining layers continue to protect.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the Purdue Model in industrial cybersecurity?',
    options: [
      'A penetration-testing methodology used to probe industrial firewalls for weaknesses',
      'A reference architecture defining hierarchical network zones from the physical process up to enterprise level',
      'A risk-scoring formula that ranks discovered vulnerabilities by likelihood and consequence',
      'A change-management procedure governing how PLC programmes are reviewed and modified',
    ],
    correctAnswer: 1,
    explanation:
      'The Purdue Model (based on ISA-95/IEC 62264) defines network zones: Level 0 (physical process), Level 1 (basic control — PLCs, safety systems), Level 2 (area supervisory — HMIs), Level 3 (site operations — MES, historian), Level 3.5 (DMZ), Level 4 (enterprise — ERP), Level 5 (internet/cloud). Security controls are implemented at each boundary.',
  },
  {
    id: 2,
    question: 'What is network segmentation in the context of industrial systems?',
    options: [
      'Encrypting all traffic on the control network with a single shared key',
      'Replacing all copper Ethernet cabling with fibre-optic links',
      'Dividing the network into separate zones using VLANs, firewalls, and access controls to limit the spread of threats and control traffic flow',
      'Scheduling network maintenance into defined time windows to limit disruption',
    ],
    correctAnswer: 2,
    explanation:
      'Segmentation creates security zones that contain threats, limit the blast radius of an incident, and enable zone-specific access controls. Traffic between zones passes through firewalls or security appliances that enforce rules about what communication is permitted.',
  },
  {
    id: 3,
    question: 'What type of firewall is recommended between the OT and IT networks?',
    options: [
      'A basic packet-filter firewall that only checks source and destination IP addresses',
      'A host-based software firewall installed on each individual PLC',
      'A consumer-grade router with its built-in firewall feature enabled',
      'An industrial firewall with deep packet inspection (DPI) that understands industrial protocols such as Modbus, OPC UA, and Profinet',
    ],
    correctAnswer: 3,
    explanation:
      'Industrial firewalls with deep packet inspection can inspect and filter industrial protocol traffic (Modbus, OPC UA, Profinet, EtherNet/IP), enforcing security rules at the application level rather than just the IP address and port level. This provides far more granular control over what commands and data can pass between zones.',
  },
  {
    id: 4,
    question: 'What is the purpose of security patch management for industrial OT systems?',
    options: [
      'To fix known software vulnerabilities in operating systems, applications, and firmware before they can be exploited by attackers',
      'To increase the processing speed of legacy PLCs by removing unused features',
      'To add new functionality and HMI graphics requested by operators',
      'To compress stored historian data so it occupies less disk space',
    ],
    correctAnswer: 0,
    explanation:
      'Patch management addresses known vulnerabilities that could be exploited by attackers. For OT systems, patches must be tested in a representative non-production environment before deployment, and applied during planned maintenance windows to avoid disrupting control system operation.',
  },
  {
    id: 5,
    question: 'What is role-based access control (RBAC) in OT environments?',
    options: [
      'Assigning a single shared administrator login to all maintenance staff for convenience',
      "Restricting system access based on the user's role, ensuring each person has only the minimum permissions needed for their job function",
      'Granting access automatically to anyone physically present in the control room',
      'Logging every keystroke entered at an engineering workstation for later review',
    ],
    correctAnswer: 1,
    explanation:
      'RBAC ensures that operators can view and control processes, engineers can configure and modify systems, and administrators can manage users and security — but no one has unnecessary access beyond their role. This limits the damage from compromised accounts and reduces the risk of accidental changes.',
  },
  {
    id: 6,
    question: 'What was the significance of the Stuxnet attack for industrial cybersecurity?',
    options: [
      'It was the first ransomware to encrypt office documents on enterprise IT networks',
      'It proved that strong perimeter firewalls alone make OT networks fully secure',
      'It demonstrated that industrial control systems (specifically PLCs) could be targeted by sophisticated cyber attacks to cause physical damage',
      'It established the legal framework for reporting cyber incidents in the UK',
    ],
    correctAnswer: 2,
    explanation:
      'Stuxnet (discovered in 2010) was a highly sophisticated attack targeting Siemens S7-300 PLCs controlling uranium enrichment centrifuges. It demonstrated that cyber attacks could cross the digital-physical boundary and cause real physical damage to industrial equipment, fundamentally changing the perception of OT cybersecurity risk.',
  },
  {
    id: 7,
    question: 'What should an OT incident response plan include?',
    options: [
      'A fixed schedule of routine firmware updates for all field instruments',
      'A list of approved suppliers for replacement control system hardware',
      'The marketing communications strategy for reassuring affected customers',
      'Documented procedures for detecting, containing and recovering from OT cybersecurity incidents',
    ],
    correctAnswer: 3,
    explanation:
      'An OT incident response plan defines procedures for the full incident lifecycle, considering the unique requirements of OT: maintaining safe process operation during the response, coordinating with operations and safety teams, preserving forensic evidence without disrupting production, and restoring systems to a known-good state.',
  },
  {
    id: 8,
    question: 'What is the purpose of OT network monitoring and anomaly detection?',
    options: [
      'Continuously monitoring network traffic for unusual patterns that could indicate a cyber attack, unauthorised access, or a compromised device',
      'Measuring the bandwidth used by each device to optimise network throughput',
      'Recording operator actions to assess individual productivity and performance',
      'Automatically applying software patches to every device as soon as they are released',
    ],
    correctAnswer: 0,
    explanation:
      'OT network monitoring tools (such as Claroty, Nozomi Networks, Dragos) passively monitor network traffic, build asset inventories, learn normal communication patterns, and alert on anomalies such as new devices appearing, unusual protocol commands, or unexpected traffic that could indicate an attack or compromised device.',
  },
  {
    id: 9,
    question: 'What is the Security Level (SL) concept in IEC 62443?',
    options: [
      'A rating of how much electrical power a control system consumes during operation',
      'A measure of required security capability (SL 1 to SL 4) based on the threat level, from casual violations to sophisticated state-sponsored attacks',
      'A classification of how physically robust an enclosure is against dust and water',
      'A grade indicating how quickly a system can recover after a power failure',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 62443 defines four Security Levels: SL 1 (protection against casual or accidental violations), SL 2 (intentional attack with low resources), SL 3 (intentional attack with moderate resources and expertise), SL 4 (intentional attack with high resources, such as state-sponsored). The required SL is determined by the risk assessment.',
  },
  {
    id: 10,
    question: 'How does OT cybersecurity differ from traditional IT cybersecurity?',
    options: [
      'OT places confidentiality above all other concerns, exactly as IT systems do',
      'OT systems are replaced every two to three years like standard office computers',
      'OT prioritises availability and safety, has long legacy lifecycles and limited downtime windows',
      'OT networks never connect to enterprise systems and so face no meaningful risk',
    ],
    correctAnswer: 2,
    explanation:
      'OT prioritises availability and safety (a system shutdown can be more dangerous than a data breach). OT systems have long lifecycles (15-25 years) with legacy equipment that cannot be easily patched. Downtime windows for updates are limited. OT protocols often lack built-in security. Every security measure must be assessed for its impact on process safety.',
  },
  {
    id: 11,
    question: 'What are the UK NIS Regulations and who do they apply to?',
    options: [
      'A voluntary code of practice for software developers writing PLC firmware',
      'A standard limiting electromagnetic interference emitted by industrial equipment',
      'A scheme certifying the energy efficiency of data-centre cooling systems',
      'The 2018 regulations requiring operators of essential services to manage OT cyber risk',
    ],
    correctAnswer: 3,
    explanation:
      'The UK NIS Regulations (Network and Information Systems Regulations 2018) require operators of essential services (energy, water, transport, health, digital infrastructure) to take appropriate measures to manage cybersecurity risks to their OT and IT systems, and to report significant cyber incidents to the relevant competent authority. Non-compliance can result in enforcement action and financial penalties.',
  },
  {
    id: 12,
    question:
      'What is the role of USB devices in OT security risks and what controls should be in place?',
    options: [
      'A significant attack vector — disable unused ports, whitelist devices and scan all media',
      'No risk at all, because USB devices are physically unable to carry executable malware',
      'A minor concern — ports should stay open so any engineer can quickly transfer files',
      'A concern only for enterprise IT systems, never relevant to the OT environment itself',
    ],
    correctAnswer: 0,
    explanation:
      'USB devices are a significant attack vector for OT systems — Stuxnet famously spread via USB. Controls include: disabling unused USB ports (physically or via policy), whitelisting approved devices, scanning all USB media at a secure transfer station at the OT/IT boundary, and maintaining a policy that restricts personal USB devices from OT areas.',
  },
];

const faqs = [
  {
    question: 'How do I get started with OT cybersecurity at my facility?',
    answer:
      'Start with an asset inventory (know every device connected to the network), conduct a risk assessment per IEC 62443, implement network segmentation (separate OT from IT with a properly configured DMZ), enforce access control (remove default passwords, implement role-based access), establish patch management processes, and deploy passive network monitoring. Engage specialist OT cybersecurity consultants for the initial assessment and strategy development.',
  },
  {
    question: 'Should industrial control systems ever have internet access?',
    answer:
      'Control systems (Purdue Levels 0-2) should never have direct internet access. Data for remote monitoring or cloud services should be extracted through the DMZ using data diodes, secured gateways, or OPC UA servers. All external remote access should pass through VPN concentrators in the DMZ with multi-factor authentication and be logged and monitored.',
  },
  {
    question: 'What is the role of USB devices in OT security risks?',
    answer:
      'USB devices are a significant attack vector for OT systems — Stuxnet spread via infected USB drives. Controls include: disabling unused USB ports, whitelisting approved devices, scanning all USB media before use in OT systems using secure file transfer stations at the OT/IT boundary, and maintaining a policy that prohibits personal USB devices in OT areas.',
  },
  {
    question: 'How does OT cybersecurity differ from IT cybersecurity in practice?',
    answer:
      'OT prioritises availability and safety over confidentiality — a system shutdown can be more dangerous than a data breach. OT systems have long lifecycles (15-25 years) with legacy equipment that cannot be easily patched. Downtime windows for updates are extremely limited. OT protocols often lack built-in security features. Every security measure must be assessed for its potential impact on process safety and availability.',
  },
  {
    question: 'What training should maintenance technicians receive in cybersecurity?',
    answer:
      'All OT personnel should receive security awareness training covering: recognition of social engineering and phishing attempts, safe USB handling procedures, strong password management and avoidance of shared accounts, reporting procedures for suspicious activity or potential incidents, understanding of access control policies, and awareness of the potential consequences of cybersecurity breaches in an industrial environment.',
  },
];

const MOETModule5Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.6 · Subsection 4"
        title="Cybersecurity in Industrial Networks"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            IEC 62443 framework, network architecture, defence in depth, and protecting operational
            technology.
          </p>

          <TLDR
            points={[
              'OT cyber attacks can cause physical damage, safety incidents, and environmental harm.',
              'IEC 62443 is the international standard for industrial cybersecurity.',
              'Defence in depth applies multiple security layers — no single point of failure.',
              'DMZ architecture prevents direct OT-to-IT connectivity.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why cybersecurity is critical for industrial control systems',
              'Describe the IEC 62443 framework and its Security Level concept',
              'Apply the Purdue Model and DMZ architecture for network segmentation',
              'Implement defence in depth with firewalls, access control, and monitoring',
              'Outline patch management, incident response, and vulnerability management',
              'Differentiate between OT and IT cybersecurity priorities and challenges',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Access control:</strong> using strong passwords, avoiding shared accounts,
                following RBAC policies.
              </li>
              <li>
                <strong>Patch management:</strong> understanding why OT patches require testing and
                planned windows.
              </li>
              <li>
                <strong>USB safety:</strong> following procedures for connecting removable media to
                OT systems.
              </li>
              <li>
                <strong>NIS Regulations:</strong> UK legal requirements for operators of essential
                services.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Why industrial cybersecurity matters</ContentEyebrow>

          <ConceptBlock
            title="Why industrial cybersecurity matters"
            onSite="Cybersecurity is not just an IT problem. Every maintenance technician who connects a laptop, USB drive, or mobile device to an OT network is part of the security perimeter. Understanding basic cybersecurity principles is now an essential skill for all OT personnel."
          >
            <p>
              Industrial control systems manage physical processes — chemical reactions, power
              generation, water treatment, manufacturing. A cyber attack on these systems can have
              consequences far beyond data theft: physical damage to equipment, safety incidents
              endangering workers and the public, environmental releases of hazardous materials, and
              extended production shutdowns costing millions of pounds.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The evolving threat landscape">
            <p>The threat to industrial systems has evolved dramatically over the past decade:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stuxnet (2010):</strong> targeted Siemens S7-300 PLCs to physically damage
                uranium enrichment centrifuges — proved cyber attacks can cross the digital-physical
                boundary.
              </li>
              <li>
                <strong>Ukrainian power grid (2015/2016):</strong> coordinated attacks on
                distribution companies caused widespread power outages affecting hundreds of
                thousands of people.
              </li>
              <li>
                <strong>TRITON/TRISIS (2017):</strong> targeted Schneider Triconex safety
                instrumented systems — the first known attack specifically aimed at disabling safety
                systems.
              </li>
              <li>
                <strong>Colonial Pipeline (2021):</strong> ransomware attack on pipeline operations
                caused fuel supply disruptions across the southeastern United States.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why OT systems are vulnerable">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Increasing connectivity:</strong> IIoT, remote access, and cloud integration
                expand the attack surface.
              </li>
              <li>
                <strong>IT/OT convergence:</strong> connecting previously isolated control networks
                to enterprise systems introduces new risk pathways.
              </li>
              <li>
                <strong>Legacy systems:</strong> equipment with 15-25 year lifecycles running
                unsupported operating systems with no security patches available.
              </li>
              <li>
                <strong>Default credentials:</strong> many devices ship with default passwords that
                are never changed.
              </li>
              <li>
                <strong>Protocol vulnerabilities:</strong> industrial protocols (Modbus, older OPC)
                were designed without security features.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Network architecture and segmentation</ContentEyebrow>

          <ConceptBlock title="Network architecture and segmentation">
            <p>
              The foundation of industrial cybersecurity is proper network architecture. The Purdue
              Model provides the reference architecture that defines how industrial networks should
              be structured, with clear boundaries and security controls between each level.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Purdue Model — network levels">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Level</th>
                    <th className="py-2 pr-4 font-medium text-white">Name</th>
                    <th className="py-2 font-medium text-white">Contains</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">5</td>
                    <td className="py-2 pr-4">Enterprise/Internet</td>
                    <td className="py-2">Internet, cloud services, external partners</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2 pr-4">Enterprise Network</td>
                    <td className="py-2">ERP, email, intranet, business systems</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3.5</td>
                    <td className="py-2 pr-4">DMZ</td>
                    <td className="py-2">Historians, patch servers, remote access gateways</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2 pr-4">Site Operations</td>
                    <td className="py-2">MES, batch management, site historian</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">Area Supervisory</td>
                    <td className="py-2">HMI, SCADA, engineering workstations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2 pr-4">Basic Control</td>
                    <td className="py-2">PLCs, DCS controllers, SIS, drives</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">0</td>
                    <td className="py-2 pr-4">Physical Process</td>
                    <td className="py-2">Sensors, actuators, field instruments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The DMZ — critical separation layer">
            <p>
              The DMZ is the most critical element of the architecture. It provides controlled data
              exchange between OT (Levels 0-3) and IT (Level 4) without any direct connection:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Data historians in the DMZ receive process data from the OT side and make it
                available to the IT side.
              </li>
              <li>
                Patch management servers in the DMZ stage tested patches before deployment to OT
                systems.
              </li>
              <li>
                Remote access gateways in the DMZ provide VPN termination with multi-factor
                authentication.
              </li>
              <li>
                Firewalls on both sides of the DMZ filter traffic — the OT firewall and the IT
                firewall have different rule sets.
              </li>
              <li>
                No traffic passes directly from IT to OT or vice versa — all exchange goes through
                DMZ services.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Zones and conduits (IEC 62443-3-2)">
            <p>
              Within the OT network, further segmentation creates security zones with controlled
              communication paths:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zone:</strong> a group of assets with the same security requirements (e.g.,
                a production cell, a utility system).
              </li>
              <li>
                <strong>Conduit:</strong> a controlled communication path between zones with defined
                security controls.
              </li>
              <li>
                <strong>Blast radius:</strong> if one zone is compromised, segmentation prevents the
                attacker from moving to other zones.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Defence in depth and security controls</ContentEyebrow>

          <ConceptBlock title="Defence in depth and security controls">
            <p>
              Defence in depth is the principle of applying multiple, overlapping security layers so
              that no single failure compromises the entire system. This approach recognises that no
              single security measure is perfect — attackers may bypass any individual control, but
              a layered defence makes successful attacks much more difficult.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Network security">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Network segmentation (zones and conduits).</li>
              <li>Industrial firewalls with DPI.</li>
              <li>VPN with multi-factor authentication for remote access.</li>
              <li>Intrusion detection and prevention systems.</li>
              <li>Network monitoring and anomaly detection.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Access control">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Role-based access control (RBAC).</li>
              <li>Strong, unique passwords (no shared accounts).</li>
              <li>Multi-factor authentication for critical systems.</li>
              <li>Removal of all default credentials.</li>
              <li>Audit logging of all access and changes.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="OT network monitoring tools">
            <p>
              Specialist OT network monitoring tools provide passive, non-intrusive visibility into
              the control network:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Claroty:</strong> OT asset discovery, threat detection, and vulnerability
                management.
              </li>
              <li>
                <strong>Nozomi Networks:</strong> real-time OT network monitoring with
                protocol-aware anomaly detection.
              </li>
              <li>
                <strong>Dragos:</strong> industrial cybersecurity platform with threat intelligence
                and incident response.
              </li>
              <li>
                These tools understand industrial protocols (Modbus, OPC, Profinet, EtherNet/IP) and
                can detect malicious commands, configuration changes, and unusual device behaviour.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Endpoint protection for OT">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Application whitelisting:</strong> only approved applications can run on
                HMIs and engineering stations — blocks unknown malware.
              </li>
              <li>
                <strong>USB controls:</strong> disable unused ports, whitelist approved devices,
                scan all media at secure transfer stations.
              </li>
              <li>
                <strong>Encryption:</strong> TLS for data in transit; encrypted storage for
                sensitive configuration data.
              </li>
              <li>
                <strong>Backup and recovery:</strong> regular backups of PLC programmes, HMI
                configurations, and system images for rapid recovery.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Patch management and incident response</ContentEyebrow>

          <ConceptBlock title="Patch management and incident response">
            <p>
              Patch management and incident response are two of the most challenging aspects of OT
              cybersecurity. Unlike IT systems where patches can often be applied automatically, OT
              systems require careful testing and planned deployment to avoid disrupting critical
              processes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="OT patch management process">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inventory:</strong> maintain a complete inventory of all software versions
                on all OT devices.
              </li>
              <li>
                <strong>Monitor:</strong> track vendor security advisories for all OT software and
                firmware.
              </li>
              <li>
                <strong>Test:</strong> test patches in a representative non-production environment
                before deployment.
              </li>
              <li>
                <strong>Plan:</strong> schedule deployment during planned maintenance windows with
                rollback procedures.
              </li>
              <li>
                <strong>Deploy:</strong> apply patches with change management approval and
                documentation.
              </li>
              <li>
                <strong>Compensate:</strong> for legacy systems that cannot be patched, implement
                compensating controls (network isolation, enhanced monitoring, application
                whitelisting).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Incident response for OT">
            <p>
              An OT incident response plan must address the unique requirements of industrial
              environments:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Detection:</strong> network monitoring, operator awareness, automated alerts
                from security tools.
              </li>
              <li>
                <strong>Classification:</strong> assess severity and potential impact on safety,
                operations, and the environment.
              </li>
              <li>
                <strong>Containment:</strong> isolate affected systems whilst maintaining safe
                process operation — never shut down a process unsafely to contain a cyber incident.
              </li>
              <li>
                <strong>Investigation:</strong> preserve forensic evidence (network captures, log
                files, system images) without disrupting ongoing operations.
              </li>
              <li>
                <strong>Recovery:</strong> restore systems from known-good backups, verify
                integrity, and return to normal operation.
              </li>
              <li>
                <strong>Lessons learned:</strong> review the incident, update procedures, and
                improve defences.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical maintenance note">
            <p>
              As a maintenance technician, your role in cybersecurity includes: using strong unique
              passwords and never sharing accounts, following USB handling procedures, reporting any
              suspicious activity or unexpected system behaviour immediately, ensuring laptop and
              test equipment antivirus definitions are up to date before connecting to the OT
              network, and following the site&apos;s change management procedures for all system
              modifications.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>IEC 62443 and UK regulations</ContentEyebrow>

          <ConceptBlock
            title="IEC 62443 and UK regulations"
            onSite="Under ST1426, maintenance technicians are expected to understand the importance of cybersecurity in industrial environments, recognise common threats and vulnerabilities, follow organisational security policies and procedures, and understand the role of standards such as IEC 62443 in protecting industrial control systems."
          >
            <p>
              The IEC 62443 standard series is the internationally recognised framework for
              industrial cybersecurity. It provides a structured, risk-based approach to securing
              industrial automation and control systems, applicable to all industries from
              manufacturing to critical national infrastructure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="IEC 62443 structure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1 — General:</strong> concepts, models, and terminology.
              </li>
              <li>
                <strong>Part 2 — Policies and Procedures:</strong> requirements for the asset
                owner&apos;s security management system.
              </li>
              <li>
                <strong>Part 3 — System:</strong> security technologies for the automation system
                (zones, conduits, security levels).
              </li>
              <li>
                <strong>Part 4 — Component:</strong> security requirements for individual products
                (PLCs, switches, software).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Security Levels (SL)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Level</th>
                    <th className="py-2 pr-4 font-medium text-white">Threat description</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">SL 1</td>
                    <td className="py-2 pr-4">Casual or accidental violation</td>
                    <td className="py-2">Accidental configuration change by authorised user</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">SL 2</td>
                    <td className="py-2 pr-4">Intentional, low resources</td>
                    <td className="py-2">Disgruntled employee, basic hacking tools</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">SL 3</td>
                    <td className="py-2 pr-4">Intentional, moderate resources</td>
                    <td className="py-2">Organised criminal group, specialised ICS knowledge</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">SL 4</td>
                    <td className="py-2 pr-4">Intentional, high resources</td>
                    <td className="py-2">State-sponsored attack (e.g., Stuxnet level)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px]">
              The required Security Level is determined by a risk assessment considering the
              threats, vulnerabilities, and consequences specific to the facility.
            </p>
          </ConceptBlock>

          <ConceptBlock title="UK NIS Regulations">
            <p>
              The UK&apos;s Network and Information Systems Regulations 2018 (NIS Regulations)
              require operators of essential services — including energy, water, transport, health,
              and digital infrastructure — to take appropriate and proportionate measures to manage
              the cybersecurity risks to their OT and IT systems. Operators must report significant
              cyber incidents to the relevant competent authority. Non-compliance can result in
              enforcement action and financial penalties of up to 17 million pounds. The National
              Cyber Security Centre (NCSC) provides guidance and the Cyber Assessment Framework
              (CAF) for self-assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A laptop on the control network"

            situation={
              <>
                <p>
                  A contractor arrives to update a PLC program. To save time they plug their laptop
                  into a spare port on the control network switch. The laptop is also configured to
                  connect to the site guest wi-fi, and has a USB stick in it from another site.
                </p>

                <p>Nobody asks, because it is how the last update was done.</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Stop before the cable goes in. A laptop bridged between the control network and
                  any other network removes the separation that the control network depends on,
                  regardless of intent.
                </p>

                <p>
                  Establish what the site’s own rules are: whether a dedicated, controlled
                  engineering laptop exists, whether removable media is permitted, and who
                  authorises a connection to the control network.
                </p>

                <p>
                  If a connection is genuinely needed, it should be a machine used only for that
                  purpose, with wireless disabled while connected, and media that has been scanned
                  on an isolated station.
                </p>

                <p>
                  Record the connection — who, what, when, and what was changed. A control system
                  change with no record is indistinguishable from an unauthorised one when someone
                  looks back at it later.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Industrial control networks are usually protected by separation rather than by
                hardening, because the devices on them cannot defend themselves — a PLC will accept
                whatever it is told by anything that can reach it. The laptop in this scenario is
                not an attack, it is a convenience, and that is exactly how most incidents on
                control systems begin. The discipline is refusing the shortcut on a Tuesday when
                nothing is wrong.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The Purdue Model runs Level 0 (physical process) through Level 5 (enterprise/internet), with the DMZ sitting at Level 3.5 between OT and IT.',
              'IEC 62443 structures cybersecurity into Part 1 (general), Part 2 (policies and procedures), Part 3 (system), and Part 4 (component), with Security Levels SL 1-4 set by risk assessment.',
              'Defence in depth combines network segmentation, industrial firewalls, access control, monitoring and endpoint protection — no single control stands alone.',
              'OT patch management requires testing in a non-production environment and deployment in planned maintenance windows, with compensating controls for legacy systems that cannot be patched.',
              'Stuxnet (2010), the Ukrainian grid attacks (2015/2016), TRITON/TRISIS (2017) and Colonial Pipeline (2021) mark the escalation of OT-targeted cyber attacks.',
              'The UK NIS Regulations 2018 require operators of essential services to manage OT/IT cyber risk and report significant incidents.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Wireless and IoT in Industry
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to Module 5 <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Module Overview
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section6_4;
