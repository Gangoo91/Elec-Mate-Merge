import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  Shield,
  AlertTriangle,
  Network,
  Lock,
  FileText,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Server,
  Wifi,
  Key,
  Eye,
  BookOpen,
  Zap
} from 'lucide-react';

const EnergyEfficiencyModule5Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Cybersecurity in Energy Systems | Energy Efficiency Module 5 Section 5 | Elec-Mate',
    description: 'Learn essential cybersecurity practices for Building Management Systems and energy infrastructure. Covers OT security, network segmentation, UK NIS Regulations, and practical security measures for electricians.',
    keywords: [
      'cybersecurity energy systems',
      'BMS security',
      'OT security',
      'NIS Directive UK',
      'building management system security',
      'SCADA security',
      'network segmentation',
      'electrical cybersecurity',
      'critical infrastructure protection',
      'NCSC guidance'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-5/section-5'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What is the primary difference between OT and IT systems in terms of security priorities?',
      options: [
        'OT systems prioritise confidentiality over availability',
        'OT systems prioritise availability and safety over confidentiality',
        'IT systems prioritise safety over data integrity',
        'There is no significant difference in priorities'
      ],
      correctIndex: 1,
      explanation: 'Operational Technology (OT) systems like BMS prioritise availability and safety because downtime can affect building operations, comfort, and even life safety systems. IT systems typically prioritise confidentiality first (CIA triad), while OT follows AIC - Availability, Integrity, Confidentiality.'
    },
    {
      id: 'qc2',
      question: 'Why are default passwords particularly dangerous in Building Management Systems?',
      options: [
        'They are too long to remember',
        'They are publicly available and often never changed after installation',
        'They use special characters that confuse users',
        'They expire after 30 days automatically'
      ],
      correctIndex: 1,
      explanation: 'Default passwords for BMS equipment are widely published in manuals and online databases. Many systems remain on default credentials years after installation because changing them requires specialist knowledge or is overlooked. Attackers actively scan for devices using known default credentials.'
    },
    {
      id: 'qc3',
      question: 'What does the UK NIS Regulations require from Operators of Essential Services?',
      options: [
        'Only annual security audits',
        'Appropriate security measures and incident reporting within 72 hours',
        'Complete air-gapping of all systems',
        'Monthly password changes only'
      ],
      correctIndex: 1,
      explanation: 'The UK Network and Information Systems (NIS) Regulations 2018 require Operators of Essential Services to implement appropriate and proportionate security measures and report significant incidents to their competent authority within 72 hours. This applies to energy sector organisations including electricity distributors and suppliers.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does OT stand for in the context of building systems security?',
      options: [
        'Online Technology',
        'Operational Technology',
        'Optimised Transmission',
        'Output Terminal'
      ],
      correctAnswer: 'Operational Technology'
    },
    {
      question: 'Which network architecture approach isolates critical BMS components from general IT networks?',
      options: [
        'Flat networking',
        'Network segmentation with VLANs and firewalls',
        'Single subnet deployment',
        'Open mesh networking'
      ],
      correctAnswer: 'Network segmentation with VLANs and firewalls'
    },
    {
      question: 'What is a DMZ in the context of BMS network security?',
      options: [
        'A type of encryption protocol',
        'A demilitarised zone - a buffer network between trusted and untrusted networks',
        'A direct monitoring zone for CCTV',
        'A data management zone for backups'
      ],
      correctAnswer: 'A demilitarised zone - a buffer network between trusted and untrusted networks'
    },
    {
      question: 'Which UK regulation specifically addresses cybersecurity for critical infrastructure including energy?',
      options: [
        'Data Protection Act only',
        'Health and Safety at Work Act',
        'Network and Information Systems (NIS) Regulations 2018',
        'Building Regulations Part P'
      ],
      correctAnswer: 'Network and Information Systems (NIS) Regulations 2018'
    },
    {
      question: 'What is the recommended approach when discovering a BMS controller accessible via its default password?',
      options: [
        'Leave it as the customer prefers convenience',
        'Document and report to the client, recommending immediate password change',
        'Change it yourself without informing anyone',
        'Disconnect it from the network permanently'
      ],
      correctAnswer: 'Document and report to the client, recommending immediate password change'
    },
    {
      question: 'Which protocol is commonly used by BMS systems but lacks built-in security features?',
      options: [
        'HTTPS',
        'SSH',
        'BACnet (original specification)',
        'TLS 1.3'
      ],
      correctAnswer: 'BACnet (original specification)'
    },
    {
      question: 'What does the principle of "least privilege" mean for BMS access control?',
      options: [
        'Everyone shares one admin account',
        'Users only receive the minimum access rights needed for their role',
        'Privileges are reduced during holidays',
        'Only IT staff can access BMS systems'
      ],
      correctAnswer: 'Users only receive the minimum access rights needed for their role'
    },
    {
      question: 'Why should BMS systems avoid direct internet exposure?',
      options: [
        'Internet connections are too slow for BMS',
        'It increases attack surface and enables remote exploitation of vulnerabilities',
        'Internet access voids the warranty',
        'BMS protocols only work on local networks'
      ],
      correctAnswer: 'It increases attack surface and enables remote exploitation of vulnerabilities'
    },
    {
      question: 'What organisation provides UK-specific cybersecurity guidance for critical infrastructure?',
      options: [
        'FBI',
        'National Cyber Security Centre (NCSC)',
        'OFGEM only',
        'Local councils'
      ],
      correctAnswer: 'National Cyber Security Centre (NCSC)'
    },
    {
      question: 'Which security measure helps ensure only authorised devices connect to a BMS network?',
      options: [
        'Using longer Ethernet cables',
        'MAC address filtering and 802.1X port authentication',
        'Installing faster switches',
        'Using only wireless connections'
      ],
      correctAnswer: 'MAC address filtering and 802.1X port authentication'
    }
  ];

  const faqs = [
    {
      question: 'As an electrician, is cybersecurity really my responsibility?',
      answer: 'Yes, increasingly so. Modern electrical installations involve networked components - smart meters, BMS controllers, EV chargers, solar inverters, and IoT devices. While you may not be a cybersecurity specialist, you have a duty of care to avoid creating vulnerabilities. This includes changing default passwords, avoiding unnecessary internet exposure, documenting network settings for the client, and flagging security concerns. The IET Wiring Regulations increasingly reference data and network considerations. Your professional indemnity insurance may not cover losses from negligent security practices.'
    },
    {
      question: 'What should I do if I find a BMS system using default credentials?',
      answer: 'Document your findings professionally and inform the client or facilities manager immediately in writing. Explain the risks in non-technical terms - comparing it to leaving keys in a lock. Recommend they engage their IT team or a specialist to change credentials and review security. If you have the capability and authorisation, offer to assist with password changes. Never change passwords without explicit written permission. Keep records of your communication as evidence of due diligence. This protects both the client and yourself professionally.'
    },
    {
      question: 'How does the UK NIS Directive affect electrical contractors?',
      answer: 'The NIS Regulations 2018 primarily place obligations on Operators of Essential Services (OES) in sectors like energy, transport, and health. However, contractors working on OES sites must comply with their security requirements. This may include security vetting, following specific procedures, reporting incidents, and ensuring your work does not introduce vulnerabilities. When tendering for work with energy companies, DNOs, or large facilities, expect security questionnaires and compliance requirements. Non-compliance can result in contract termination and reputational damage.'
    },
    {
      question: 'What is the difference between IT security and OT security?',
      answer: 'IT (Information Technology) security protects data and business systems - computers, servers, databases. The priority order is typically Confidentiality, Integrity, Availability (CIA). OT (Operational Technology) security protects physical processes - BMS, SCADA, PLCs, industrial controls. The priority order reverses to Availability, Integrity, Confidentiality (AIC) because downtime can have physical consequences. OT systems often have longer lifecycles (15-20 years), cannot easily be patched, may run legacy operating systems, and use specialist protocols. Security approaches must account for these differences.'
    },
    {
      question: 'Can smart building systems be hacked, and what are the consequences?',
      answer: 'Yes, smart building systems are regularly compromised. Real-world consequences include: ransomware disabling heating/cooling systems, manipulation of energy systems causing equipment damage, using BMS as an entry point to steal corporate data, disabling fire and safety systems, causing power outages or equipment failures, and cryptocurrency mining using building computing resources. A compromised BMS can affect occupant safety, cause significant financial losses, damage equipment, and create legal liability. The 2013 Target data breach (affecting 40 million customers) originated through an HVAC contractor connection.'
    },
    {
      question: 'What security measures can I implement during installation without specialist IT knowledge?',
      answer: 'Several practical steps require no specialist knowledge: (1) Always change default passwords to strong unique passwords before handover, (2) Document all IP addresses, passwords, and network settings securely for the client, (3) Disable unused network ports and services, (4) Ensure firmware is updated to the latest version, (5) Use separate network segments where possible - do not connect BMS to guest WiFi, (6) Enable logging if available, (7) Use encrypted protocols where supported (HTTPS, BACnet/SC), (8) Physically secure network equipment in locked enclosures, (9) Label cables and ports clearly, (10) Provide security recommendations in your handover documentation.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 5 - Section 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Cybersecurity in Energy Systems</h1>
          <p className="text-gray-400">
            Essential security practices for Building Management Systems and energy infrastructure
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-3">Why Cybersecurity Matters for Electricians</h2>
              <p className="text-gray-300 mb-4">
                Modern electrical installations are increasingly networked. Smart meters, Building Management Systems,
                EV chargers, solar inverters, and IoT devices all connect to networks - and all can be compromised.
                A single vulnerable device can provide attackers access to entire building systems or corporate networks.
              </p>
              <p className="text-gray-300">
                As electrical professionals, we have a responsibility to understand these risks and implement
                basic security measures. The consequences of poor security can include ransomware attacks,
                equipment damage, safety system failures, and significant financial losses.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: OT vs IT Security */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold">OT vs IT Security Differences</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Understanding the fundamental differences between Information Technology (IT) and Operational Technology (OT)
              is crucial for effective security in building systems.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-blue-400">IT Systems</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">-</span>
                    Computers, servers, databases, business applications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">-</span>
                    Priority: Confidentiality, Integrity, Availability (CIA)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">-</span>
                    3-5 year lifecycle, regular patching acceptable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">-</span>
                    Reboots and downtime often acceptable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">-</span>
                    Standard protocols (TCP/IP, HTTP, SQL)
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-elec-yellow/30">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-elec-yellow">OT Systems</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">-</span>
                    BMS, SCADA, PLCs, HMIs, smart devices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">-</span>
                    Priority: Availability, Integrity, Confidentiality (AIC)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">-</span>
                    15-20 year lifecycle, patching often impossible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">-</span>
                    24/7 operation required, downtime has physical impact
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">-</span>
                    Specialist protocols (BACnet, Modbus, LonWorks)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">The Convergence Challenge</h4>
              <p className="text-gray-300 text-sm">
                Traditional OT systems were isolated ("air-gapped") from IT networks. Modern smart buildings
                increasingly connect OT to IT networks for remote monitoring, analytics, and cloud services.
                This convergence creates new attack vectors. Security strategies must address both worlds -
                applying IT security concepts while respecting OT operational requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Common Vulnerabilities */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold">Common Vulnerabilities in BMS and Energy Systems</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Building Management Systems and energy infrastructure have numerous common vulnerabilities.
              Understanding these helps identify and mitigate risks during installation and maintenance.
            </p>

            <div className="space-y-3">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold text-red-400">Default Credentials</h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  The most common and easily exploited vulnerability. Default usernames and passwords
                  (admin/admin, administrator/password) are published in manuals and online databases.
                </p>
                <div className="bg-red-500/10 rounded p-2 text-xs text-red-300">
                  <strong>Real Example:</strong> Shodan (a search engine for internet-connected devices)
                  lists thousands of BMS controllers accessible with default credentials worldwide.
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold text-orange-400">Unencrypted Protocols</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Legacy protocols like BACnet, Modbus, and LonWorks were designed for isolated networks
                  and lack encryption or authentication. Data travels in plaintext, vulnerable to
                  interception and manipulation. BACnet/SC (Secure Connect) addresses this but adoption is slow.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">Unpatched Systems</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  OT systems often run outdated operating systems (Windows XP, Windows 7) that no longer
                  receive security updates. Controllers may have firmware vulnerabilities that cannot be
                  patched without vendor support or system downtime that operations cannot accept.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-purple-400">Direct Internet Exposure</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  BMS web interfaces and controllers directly accessible from the internet without VPN
                  or firewall protection. Often done for convenience of remote access but creates
                  massive attack surface. Port forwarding to BMS devices is particularly dangerous.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-blue-400">Flat Network Architecture</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  All devices on a single network segment with no segregation. Once an attacker gains
                  access to any device, they can reach all others. Common in older installations and
                  small-to-medium buildings where network design was an afterthought.
                </p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Notable BMS Security Incidents</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong>Target (2013):</strong> 40 million credit cards compromised via HVAC contractor network access</li>
                <li><strong>German Steel Mill (2014):</strong> Blast furnace damaged by cyberattack through office network</li>
                <li><strong>Ukrainian Power Grid (2015, 2016):</strong> Substations remotely controlled, causing blackouts</li>
                <li><strong>Casino Fish Tank (2017):</strong> Network breached through internet-connected aquarium thermometer</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: Network Segmentation */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold">Network Segmentation and Firewalls</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Network segmentation is the practice of dividing a network into separate zones with controlled
              communication between them. This limits the spread of attacks and protects critical systems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">The Purdue Model for Industrial Networks</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 bg-purple-500/20 rounded">
                  <span className="text-purple-400 font-mono w-16">Level 5</span>
                  <span className="text-gray-300">Enterprise Network - Corporate IT, internet access</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-500/20 rounded">
                  <span className="text-blue-400 font-mono w-16">Level 4</span>
                  <span className="text-gray-300">Business Planning - ERP, business systems</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-500/20 rounded border-2 border-green-500/50">
                  <span className="text-green-400 font-mono w-16">DMZ</span>
                  <span className="text-gray-300">Demilitarised Zone - Secure buffer between IT and OT</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-yellow-500/20 rounded">
                  <span className="text-yellow-400 font-mono w-16">Level 3</span>
                  <span className="text-gray-300">Site Operations - BMS head-end, historian, engineering workstations</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-orange-500/20 rounded">
                  <span className="text-orange-400 font-mono w-16">Level 2</span>
                  <span className="text-gray-300">Area Control - Local HMIs, supervisory systems</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-red-500/20 rounded">
                  <span className="text-red-400 font-mono w-16">Level 1</span>
                  <span className="text-gray-300">Basic Control - PLCs, controllers, RTUs</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-500/20 rounded">
                  <span className="text-gray-400 font-mono w-16">Level 0</span>
                  <span className="text-gray-300">Physical Process - Sensors, actuators, field devices</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-blue-400 mb-2">VLAN Segmentation</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Virtual LANs separate network traffic at Layer 2. Different systems get different VLANs:
                </p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>- VLAN 10: Corporate IT</li>
                  <li>- VLAN 20: BMS/HVAC</li>
                  <li>- VLAN 30: Lighting controls</li>
                  <li>- VLAN 40: Access control/CCTV</li>
                  <li>- VLAN 50: Guest WiFi (isolated)</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-green-400 mb-2">Firewall Rules</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Firewalls control traffic between VLANs and networks using rules:
                </p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>- Allow BMS server to query controllers</li>
                  <li>- Block direct internet access from OT</li>
                  <li>- Allow specific management ports only</li>
                  <li>- Deny all traffic by default</li>
                  <li>- Log all connection attempts</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Practical Tip for Electricians</h4>
              <p className="text-gray-300 text-sm">
                When installing networked equipment, always ask the client about their network architecture.
                Request the correct VLAN assignment for your devices. Do not simply connect to the nearest
                available network port - it may be the wrong network segment. Document which VLAN/IP range
                your equipment uses and provide this to the client's IT team.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Authentication and Access Control */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold">Authentication and Access Control</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Proper authentication ensures only authorised users and devices can access systems.
              Access control limits what authenticated users can do based on their role.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-semibold">Password Best Practices</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Change all default passwords before handover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use minimum 12 characters with complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use unique passwords for each device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Store credentials securely (password manager)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Document and hand over credentials securely</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold">Common Mistakes to Avoid</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Leaving default passwords in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Using the same password for all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Writing passwords on labels attached to equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Sharing admin accounts among all staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Emailing credentials in plaintext</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Role-Based Access Control (RBAC)</h4>
              <p className="text-gray-300 text-sm mb-3">
                Users should only have access to what they need for their role - the principle of least privilege:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Role</th>
                      <th className="text-left py-2 text-elec-yellow">Access Level</th>
                      <th className="text-left py-2 text-elec-yellow">Typical Permissions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Administrator</td>
                      <td className="py-2">Full</td>
                      <td className="py-2">All functions, user management, configuration</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Engineer</td>
                      <td className="py-2">High</td>
                      <td className="py-2">Programming, setpoint changes, scheduling</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Operator</td>
                      <td className="py-2">Medium</td>
                      <td className="py-2">Acknowledge alarms, adjust setpoints within limits</td>
                    </tr>
                    <tr>
                      <td className="py-2">Viewer</td>
                      <td className="py-2">Low</td>
                      <td className="py-2">View dashboards and data only, no changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">Multi-Factor Authentication (MFA)</h4>
              <p className="text-gray-300 text-sm">
                MFA requires two or more verification methods: something you know (password), something you have
                (phone/token), or something you are (biometric). Increasingly supported by modern BMS platforms
                for web interfaces and remote access. Essential for any internet-accessible system. Even if
                passwords are compromised, MFA prevents unauthorised access.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: UK Regulatory Requirements */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold">UK Regulatory Requirements (NIS Directive)</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-blue-400">Network and Information Systems (NIS) Regulations 2018</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                The UK NIS Regulations implement the EU NIS Directive and establish a legal framework for
                cybersecurity in critical infrastructure sectors including energy. Key requirements:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">-</span>
                  <span><strong>Operators of Essential Services (OES)</strong> must implement appropriate security measures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">-</span>
                  <span>Report significant incidents to competent authority within <strong>72 hours</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">-</span>
                  <span>Energy sector OES include electricity generators, distributors, and suppliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">-</span>
                  <span>OFGEM is the competent authority for the energy sector</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">-</span>
                  <span>Penalties up to <strong>£17 million</strong> for non-compliance</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-green-400">NCSC Cyber Assessment Framework (CAF)</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                The National Cyber Security Centre provides the CAF to help organisations achieve NIS compliance:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-500/10 p-2 rounded">
                  <span className="text-green-400 font-medium">Objective A:</span>
                  <span className="text-gray-300"> Managing Security Risk</span>
                </div>
                <div className="bg-green-500/10 p-2 rounded">
                  <span className="text-green-400 font-medium">Objective B:</span>
                  <span className="text-gray-300"> Protecting Against Attacks</span>
                </div>
                <div className="bg-green-500/10 p-2 rounded">
                  <span className="text-green-400 font-medium">Objective C:</span>
                  <span className="text-gray-300"> Detecting Security Events</span>
                </div>
                <div className="bg-green-500/10 p-2 rounded">
                  <span className="text-green-400 font-medium">Objective D:</span>
                  <span className="text-gray-300"> Minimising Incident Impact</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-2">Implications for Contractors</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  While NIS obligations fall on OES organisations, contractors working on their sites must:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Comply with client security policies and procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Complete security vetting if required (BPSS, SC clearance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Report security incidents discovered during work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ensure work does not introduce new vulnerabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Complete supply chain security questionnaires for tenders</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Additional UK Guidance</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><strong>NCSC:</strong> Extensive free guidance at ncsc.gov.uk including OT-specific advice</li>
                <li><strong>CPNI:</strong> Centre for Protection of National Infrastructure physical security guidance</li>
                <li><strong>Energy Networks Association:</strong> Sector-specific cybersecurity requirements</li>
                <li><strong>BS EN 62443:</strong> Industrial automation security standards (British Standards)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 6: Security Best Practices for Electricians */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold">Security Best Practices for Electricians</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Practical cybersecurity measures that electrical professionals can implement without
              specialist IT knowledge. These actions significantly reduce risk exposure.
            </p>

            <div className="grid gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-elec-yellow/20 p-2 rounded">
                    <Wrench className="w-5 h-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-semibold">During Installation</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">1.</span>
                    <span><strong>Change all default passwords</strong> before system handover - document new credentials securely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">2.</span>
                    <span><strong>Update firmware</strong> to latest version before commissioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">3.</span>
                    <span><strong>Disable unused services</strong> and network ports on devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">4.</span>
                    <span><strong>Request correct network segment</strong> from IT - do not connect to random ports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">5.</span>
                    <span><strong>Enable encrypted protocols</strong> where available (HTTPS, BACnet/SC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">6.</span>
                    <span><strong>Physically secure</strong> network equipment in locked enclosures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500/20 p-2 rounded">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="font-semibold">Documentation and Handover</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span><strong>Create a secure credentials document</strong> - not just on a sticky note</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span><strong>Document all IP addresses</strong> and network configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span><strong>Provide security recommendations</strong> in handover pack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">4.</span>
                    <span><strong>Hand over credentials in person</strong> or via encrypted channel - not plain email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">5.</span>
                    <span><strong>Advise client on ongoing security</strong> - firmware updates, password changes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-orange-500/20 p-2 rounded">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="font-semibold">When You Discover Issues</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">1.</span>
                    <span><strong>Document findings</strong> professionally with screenshots if possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">2.</span>
                    <span><strong>Report to client in writing</strong> - email to facilities manager with IT cc'd</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">3.</span>
                    <span><strong>Explain risks in plain English</strong> - "This is like leaving your front door unlocked"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">4.</span>
                    <span><strong>Never exploit vulnerabilities</strong> or access systems without authorisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">5.</span>
                    <span><strong>Keep records</strong> of your due diligence for professional protection</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Warning: What NOT to Do</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never connect BMS directly to the internet "for convenience"</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never use port forwarding to BMS controllers</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never connect OT devices to guest WiFi networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never install remote access software without client IT approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Never bring USB drives from home/other sites to client networks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Installation Security Checklist</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>[ ] Default passwords changed</li>
                <li>[ ] Firmware updated to latest version</li>
                <li>[ ] Unused services disabled</li>
                <li>[ ] Connected to correct network segment/VLAN</li>
                <li>[ ] Encrypted protocols enabled</li>
                <li>[ ] Physical security in place</li>
                <li>[ ] Credentials documented securely</li>
                <li>[ ] Security recommendations provided</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Key Contacts and Resources</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><strong>NCSC:</strong> ncsc.gov.uk - Free security guidance</li>
                <li><strong>Action Fraud:</strong> 0300 123 2040 - Report cyber crime</li>
                <li><strong>NCSC Reporting:</strong> report.ncsc.gov.uk</li>
                <li><strong>ICO:</strong> Data breach reporting</li>
                <li><strong>Client IT Team:</strong> First point of contact</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Strong Password Format</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Minimum 12 characters</li>
                <li>- Mix of upper and lowercase</li>
                <li>- Include numbers and symbols</li>
                <li>- No dictionary words</li>
                <li>- Unique per device/system</li>
                <li>- Consider passphrases: "Correct-Horse-Battery-Staple!"</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Red Flags to Report</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Default credentials still in use</li>
                <li>- BMS accessible from internet</li>
                <li>- No network segmentation</li>
                <li>- Unpatched/unsupported systems</li>
                <li>- Shared/generic user accounts</li>
                <li>- No logging or monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-elec-yellow">Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow">Section Quiz</h2>
            {!showQuiz && (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
              >
                Start Quiz
              </Button>
            )}
          </div>

          {showQuiz ? (
            <Quiz
              questions={quizQuestions}
              moduleId="energy-efficiency-m5s5"
              onComplete={() => {}}
            />
          ) : (
            <p className="text-gray-400">
              Test your understanding of cybersecurity in energy systems with this 10-question quiz.
              You need 70% to pass.
            </p>
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-5/section-4')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div className="text-sm">Section 4: Data Analytics and AI</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-6')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <div className="text-right">
              <div className="text-xs opacity-70">Next</div>
              <div className="text-sm">Module 6: Renewable Integration</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule5Section5;
