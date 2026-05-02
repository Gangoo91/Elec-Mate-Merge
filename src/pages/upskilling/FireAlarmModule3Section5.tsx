import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam3-s5-topology',
    question:
      'In a multi-panel networked fire alarm system, what is the difference between a RING and a STAR network topology?',
    options: [
      'Cable colour.',
      'Voltage.',
      'Ring (loop): each panel is connected to the next, with the cable returning to the first panel — a continuous loop. A single break in the network cable does NOT disconnect any panel because every panel is reachable from at least one direction. Star: all panels connect to a central hub / master panel; a single break disconnects only that one panel from the rest. Ring is fault-tolerant; star is simpler but loses fault tolerance for the affected panel.',
      'Number of panels.',
    ],
    correctIndex: 2,
    explanation:
      "Ring topology between fire alarm panels mirrors the Class A loop principle at the device level: redundancy through dual-feed wiring. A break is a single fault that the network survives. Star topology is sometimes used in retrofits where ring wiring is impractical; it accepts that a cable break disconnects one panel's reporting to the rest of the network. The fire-detection function within the affected panel continues to work locally.",
  },
  {
    id: 'fam3-s5-cable',
    question: 'What cable specifications apply to network cables BETWEEN fire alarm panels?',
    options: [
      'Standard CAT5.',
      'Standard CAT5 with PVC.',
      'Fire-resistant cable with at least the BS EN 50200 PH-30 grade (typical for general systems) or BS EN 50200 PH-120 / BS 8519 enhanced grade for higher-rated buildings (over 18 m, sleeping premises with vulnerable occupants, premises requiring higher fire integrity). Cable carries the network signalling between panels and must continue to function during a fire long enough for the system to coordinate evacuation.',
      'Any data cable.',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 50200 specifies fire-resistance categories for cables under fire conditions; PH-30 means the cable maintains circuit integrity for 30 minutes of fire exposure. BS 8519 extends to enhanced grades. The category required depends on the building risk profile. Fire alarm circuits — including network cables — are specified to the appropriate grade. Standard data cables would fail in minutes of fire exposure and are not acceptable for life-safety circuits.',
  },
  {
    id: 'fam3-s5-cyber',
    question:
      'BS 5839-1:2025 introduces clause 43.4 on remote services and cyber security. What does it require?',
    options: [
      'Encryption everywhere.',
      'Daily passwords.',
      'Physical lock-off of the CIE cabinet, anti-tamper plugs on patch leads, authentication of any request to accept a remote connection, and a thorough risk assessment before performing remote service. Particularly when executing read / control / write functions, the responsible individual must ensure the system is fully operational on completion. The clause is a 2025 addition responding to the all-IP networks and connected CIEs becoming common.',
      'No remote access.',
    ],
    correctIndex: 2,
    explanation:
      'The 2025 standard treats cyber security as a life-safety concern, not just an IT concern. Connected CIEs are an attack surface; uncontrolled remote access could disable detection, falsify alarm signals, or compromise data integrity. Clause 43.4 sets the baseline: physical security (lock-off, anti-tamper), authentication, risk assessment per operation, and verified system state on completion.',
  },
  {
    id: 'fam3-s5-distributed',
    question:
      'What is the difference between a DISTRIBUTED CIE architecture and a CENTRALISED CIE architecture in a multi-panel system?',
    options: [
      'Number of CIEs.',
      'Centralised: one master CIE displays all events for the whole system; remote panels are slaves that report to the master. Distributed: each panel has full CIE function locally — displays its own events, can be operated independently — and panels share status across the network. In distributed architecture, no single panel is the single point of failure; in centralised, the master is critical. Distributed is preferred for resilience; centralised is simpler to configure for smaller networks.',
      'Cable type.',
      'Power supply.',
    ],
    correctIndex: 1,
    explanation:
      'Both architectures comply with BS 5839-1; the choice depends on the building scale and the resilience requirements. Distributed CIE means a fire-fighter at any panel sees the whole picture; centralised means a fire-fighter at the master sees the whole picture but at remote panels sees only local events. The cause-and-effect matrix and the panel layout are designed together to give consistent indication regardless of the architecture.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Why are multi-panel networked fire alarm systems used instead of a single very large CIE?',
    options: [
      'Cost.',
      'Aesthetic.',
      'Practical reasons: (1) physical scale — buildings too large for one CIE to cover all wiring runs efficiently; (2) reliability — distributed CIEs avoid a single point of failure; (3) campus / multi-building installations — one panel per building, networked together for unified indication; (4) phased installations — extending coverage by adding panels rather than replacing the central one. The network cable carries event data between panels.',
      'Random choice.',
    ],
    correctAnswer: 2,
    explanation:
      'Multi-panel architecture solves the scale problem in fire alarm. Beyond a certain size, a single CIE is impractical (cable distances, loop loading, repair complexity). Networking multiple CIEs gives the same unified indication to occupants and fire-fighters while distributing the wiring efficiently. Common in hospitals, university campuses, large industrial sites, and high-rise residential blocks.',
  },
  {
    id: 2,
    question: 'What does BS EN 54-13 specify for networked fire alarm systems?',
    options: [
      'It does not apply.',
      'Cable type only.',
      'BS EN 54-13 governs system component compatibility — including the network components in a multi-panel system. The standard certifies that the panels, network protocol, repeaters, and other network-side components from a particular vendor work together correctly as an integrated system. Mixing networked panels from different vendors typically voids the BS EN 54-13 system certification.',
      'Sounder colour.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 54-13 system compatibility applies just as strongly to networked systems as to single-panel addressable systems — perhaps more so, because the integration complexity is higher. A networked system is a vendor-tested combination; deviating from the certified combination is unsafe and uncertified.',
  },
  {
    id: 3,
    question:
      'What is the typical cable specification for fire alarm network cables under BS 8519?',
    options: [
      'Cat5 / PVC.',
      'Twin-and-earth.',
      'Standard fire-resistant cable per BS EN 50200 (PH-30 or PH-60 for general systems) or BS 8519 enhanced grade (PH-120) for buildings of higher fire risk such as buildings over 18 m, premises with vulnerable sleeping occupants, and other categories per BS 9999 / BS 9991 fire engineering. The cable maintains network communication during fire exposure for the rated period.',
      'Standard PVC twin.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 8519 is the UK code of practice for the selection and installation of fire-resistant cables. It complements BS EN 50200 and gives building-specific guidance. Network cable selection follows the same principle as any other fire alarm cable: enhanced grade where the building demands it, standard grade where adequate. The fire engineering of the building drives the cable selection.',
  },
  {
    id: 4,
    question:
      'In a ring (loop) network of 5 fire alarm panels, what happens if the network cable is cut between panels 2 and 3?',
    options: [
      'All panels lose communication.',
      'Only panel 1 keeps working.',
      'No panel loses communication. The ring topology is fault-tolerant: each panel is reachable from both directions on the ring. Panel 3, 4, 5 reach the others via the unbroken cable in the other direction. The system reports the cable break as a fault but continues to function. This is the network-level analog of a Class A loop at the device level.',
      'Only panels 2 and 3 stop working.',
    ],
    correctAnswer: 2,
    explanation:
      'Ring topology gives every panel two paths to every other panel. A single break leaves all panels still reachable. The fault is reported (so it can be repaired) but the network continues to operate. Ring redundancy is the standard for life-safety multi-panel networks; star and bus topologies are used in less demanding applications.',
  },
  {
    id: 5,
    question:
      'What is the purpose of fire alarm system network monitoring beyond the fault tolerance of the topology?',
    options: [
      'Aesthetic.',
      'Continuous monitoring of the network status — communication quality, panel status, response times — at the master CIE or distributed across panels. The fault response is automatic (cable break = fault reported), but ongoing monitoring catches degraded performance: cables operating but with high error rates, panels with intermittent faults, panels rebooting unexpectedly. These signal an emerging problem that should be investigated before it becomes a hard failure.',
      'For statistics only.',
      'It is unnecessary.',
    ],
    correctAnswer: 1,
    explanation:
      'A fault-tolerant network with monitoring catches BOTH the hard failure (cable break, panel down) AND the soft signals (degrading communication quality). The latter is the more useful signal in mature systems — it gives advance warning of impending failure. Modern networked CIEs include extensive diagnostics; the maintenance organisation reviews them at every service.',
  },
  {
    id: 6,
    question:
      'BS 5839-1:2025 clause 43.4 (cyber security) requires what before any remote service is performed?',
    options: [
      'Manager approval.',
      'A thorough risk assessment to evaluate the potential impact on the operation of the CIE, particularly when executing read, control, or write functions. The responsible individual must ensure the system is fully operational on completion of the remote service. The clause anticipates that connected CIEs allow remote intervention — and treats each intervention as a controlled change with proper risk management.',
      'A coffee break.',
      'Nothing required.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 cyber security clause aligns with general IT-OT security best practice: privileged operations require risk assessment; system state must be verified after the operation; reads / writes / controls are different risk levels with proportionate controls. The fire alarm CIE is treated as a critical control system, not just a piece of building hardware.',
  },
  {
    id: 7,
    question: 'What is an "anti-tamper plug" on a network patch lead and why is it now expected?',
    options: [
      'Aesthetic.',
      'A physical device that secures a network patch lead to its socket so the lead cannot be unplugged without a key / tool. Used to prevent unauthorised disconnection of fire alarm network cabling. Per BS 5839-1:2025 clause 43.4, anti-tamper plugs are part of the physical-security baseline for cyber-security on connected CIEs — alongside locked cabinets and authentication for remote service.',
      'For colour-coding.',
      'Required by FCC.',
    ],
    correctAnswer: 1,
    explanation:
      'Cyber security has a physical-security component. An attacker (or, more commonly, an inadvertent maintenance error) that simply unplugs a network cable can isolate a panel, disrupt the network, or open a path for malicious traffic. Anti-tamper plugs raise the bar for physical access; combined with locked cabinets and authentication, they form the multi-layer baseline.',
  },
  {
    id: 8,
    question:
      'A campus university has 8 buildings, each with its own fire alarm panel, networked together. What architecture choices need to be made?',
    options: [
      'No choices.',
      'Topology (ring / star / bus / hybrid), centralised vs distributed CIE function, network cable specification (BS EN 50200 grade), cyber-security architecture (segregation, authentication, anti-tamper), failure modes and recovery (what happens if any single panel or cable fails), per-building autonomy (does each building work independently if the network fails), and integration with other campus systems (BMS, security, public address). The design package documents each choice and the rationale.',
      'Cable colour only.',
      'Battery type only.',
    ],
    correctAnswer: 1,
    explanation:
      "Multi-building networks require coordinated design across all the listed dimensions. The 2025 standard's emphasis on accessibility, cyber security, and the cause-and-effect matrix (now mandatory at handover) all apply across the entire networked system. The university's estate management and the fire alarm designer work together over the network architecture.",
  },
  {
    id: 9,
    question:
      'In a distributed-CIE multi-panel system, what does each panel typically display when an event occurs anywhere on the network?',
    options: [
      'Nothing.',
      "Each panel typically displays the same information — fire indication for any panel's zone, fault indication for any panel's fault, isolation indication for any panel's isolation. The display is unified across the network so a fire-fighter at any panel sees the same picture. This is the resilience advantage of distributed CIE: no single point of failure, no need to find the \"right\" panel.",
      "Only the local panel's events.",
      'Only fire events.',
    ],
    correctAnswer: 1,
    explanation:
      "Distributed CIE means every panel is functionally a master. Status is replicated across the network in real time. A fire-fighter approaching any panel can see the fire location, faults, and isolations across the whole site. This is the resilience advantage — and a small additional commissioning effort (every panel's display is configured the same way).",
  },
  {
    id: 10,
    question:
      'What is the role of a system-level fire risk assessment for a networked multi-panel installation?',
    options: [
      'It is not required.',
      "A risk-based design review covering: the network architecture and its failure modes; the cyber-security posture of the connected CIE; the cause-and-effect matrix across the whole network; the integration with other building systems; the maintenance access for all interfaces and panels; the response of staff to alarms across the network. The 2025 standard's combined emphasis on accessibility (clause 7), cyber security (clause 43.4), and mandatory cause-and-effect documentation makes this kind of review more important than ever.",
      'Visual inspection only.',
      'Per-detector test.',
    ],
    correctAnswer: 1,
    explanation:
      'Networked systems have more failure modes and more design dimensions than single-panel systems. A risk-based design review at the system level (across the network) is the proportionate response. The fire risk assessment for the building informs the alarm system design; the alarm system design feeds back into the fire risk assessment. The two evolve together.',
  },
];

const FireAlarmModule3Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Network and multi-panel systems | Fire Alarm Module 3.5 | Elec-Mate',
    description:
      'BS 5839-1:2025 multi-panel networks: ring vs star topology, redundancy, BS EN 54-13 system compatibility, fire-resistant network cabling per BS EN 50200 / BS 8519, distributed vs centralised CIE, network monitoring, and the new clause 43.4 cyber-security requirements.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5"
            title="Network and multi-panel systems"
            description="BS 5839-1:2025 networked architectures: ring vs star topology, BS EN 54-13 system compatibility, BS EN 50200 / BS 8519 cabling, distributed vs centralised CIE, network monitoring, fault tolerance, and the NEW clause 43.4 cyber-security requirements for connected systems."
            tone="yellow"
          />

          <TLDR
            points={[
              'Multi-panel networks are used for large buildings, campuses, and phased installations where a single CIE cannot cover the wiring efficiently.',
              'Ring (loop) network topology: each panel connected to the next, returning to the first. Single cable break = fault reported, network continues. Fault-tolerant.',
              'Star topology: panels connect to a central hub / master. Simpler but a break loses one panel from the network.',
              'Network cables: fire-resistant per BS EN 50200 (PH-30 / PH-60 / PH-120) or BS 8519 enhanced grade for higher-fire-risk buildings.',
              'BS EN 54-13 governs system compatibility — the panel + network combination must be a vendor-certified system.',
              'Distributed CIE: each panel has full CIE function locally; status replicated across network; no single point of failure.',
              'Centralised CIE: one master, others slave; simpler config, but master is critical.',
              'NEW BS 5839-1:2025 clause 43.4 — cyber security: physical lock-off of CIE cabinet, anti-tamper plugs on patch leads, authentication for remote service, risk assessment before remote read / control / write operations, verified system state on completion.',
              'Network monitoring catches not just hard failures but degraded performance — cable error rates, panel reboots, intermittent faults — giving advance warning.',
              'The cause-and-effect matrix spans the whole network — a cause on one panel can drive effects on another panel via the network signalling.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Choose between ring, star, bus, and hybrid network topologies for multi-panel fire alarm systems based on size, redundancy, and cable practicality',
              'Specify network cable per BS EN 50200 / BS 8519 to match the building fire-engineering risk profile',
              'Apply BS EN 54-13 system compatibility — networked panels and infrastructure must be a vendor-certified compatible system',
              'Distinguish distributed vs centralised CIE architectures and match to the resilience and operational requirements',
              'Implement network monitoring beyond simple fault detection — degraded-performance signals, panel reboots, communication-quality trends',
              'Apply BS 5839-1:2025 clause 43.4 cyber security: physical security (lock-off, anti-tamper), authentication, risk assessment per remote operation, verified system state on completion',
              'Design the cause-and-effect matrix to span the whole network — events on one panel driving effects on another via network signalling',
              'Plan the system-level fire risk assessment for a multi-panel network: architecture, cyber-security posture, integration with other systems',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why multi-panel networks exist</ContentEyebrow>

          <ConceptBlock
            title="Beyond single-panel — when scale demands a network"
            plainEnglish="A single fire alarm panel can cover a building of moderate size — perhaps 8-16 zones, a few hundred addressable devices, two or three loops. Beyond that, a single panel becomes impractical: the cable runs to remote parts of the building become long, expensive, and harder to maintain; the loop loading exceeds vendor recommendations; and a single CIE is a single point of failure. Multi-panel networks distribute the panel function across the building (or across a campus). Each panel covers its own area; the panels share status across a network; the system presents as one unified fire alarm to occupants, fire-fighters, and the responsible person."
            onSite="When you arrive at a multi-panel site for service, the first question is: which panel covers what? The panel layout drawing in the design package answers it. Don't assume any one panel sees the whole picture until you've confirmed the network architecture."
          >
            <p>The drivers for multi-panel networks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Building size</strong> — the cable distance from a single CIE to remote
                detectors becomes excessive. Multi-panel allows panels close to their detectors.
              </li>
              <li>
                <strong>Campus / multi-building</strong> — separate buildings with their own
                fire-detection requirements; one panel per building; the network unifies the
                indication for site-wide fire warden / fire and rescue service response.
              </li>
              <li>
                <strong>Phased installation</strong> — a building extended over time; new panels
                added for new wings or new buildings; networked to existing panels for unified
                indication.
              </li>
              <li>
                <strong>Resilience</strong> — distributed CIE function means no single point of
                failure for the whole site. A fire in one part of the building destroys at most one
                panel; the others continue to work.
              </li>
              <li>
                <strong>Vendor / protocol scale limits</strong> — most vendor systems have a
                practical maximum number of devices / loops per panel; networked panels go beyond
                that limit.
              </li>
            </ul>
            <p>
              Multi-panel networks add complexity: more panels to commission, more interfaces to
              cable, more failure modes to consider. The 2025 standard\&apos;s emphasis on
              accessibility (clause 7), cyber security (clause 43.4), and mandatory cause-and-effect
              documentation all apply across the whole network.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Multi-panel network design (read with BS EN 54-13)"
            clause={
              <>
                Where a fire detection and fire alarm system comprises more than one control and
                indicating equipment, the system as a whole shall be designed so that the failure of
                any single component (including network communication infrastructure) does not
                compromise the protection of more than one fire detection zone. The network
                architecture and any associated cabling shall be specified to maintain communication
                and indication during fire conditions, with cable types per BS EN 50200 / BS 8519 as
                appropriate to the building risk profile.
              </>
            }
            meaning="The single-fault rule scales to the network. A single panel failure must not lose protection from more than one zone — the network communication maintains coverage of devices on the failed panel via continued operation of the remaining panels (or, more commonly, within the failed panel maintaining detection while losing only its network indication function). The cable specification follows the same risk-based logic as any other fire alarm cable."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — network topology comparison */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Network topology comparison — ring, star, bus
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="Three network topologies side by side: a ring (loop) of five fire alarm panels with cable returning to the first, a star with five panels around a central hub, and a bus with five panels along a single cable spine."
            >
              <text
                x="440"
                y="28"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                Multi-panel network topologies
              </text>

              {/* Left — Ring */}
              <text
                x="160"
                y="60"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="12"
                fontWeight="bold"
              >
                RING (loop)
              </text>
              <text x="160" y="76" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                fault-tolerant
              </text>

              <circle cx="160" cy="180" r="80" fill="none" stroke="#22D3EE" strokeWidth="1.6" />
              <circle
                cx="160"
                cy="100"
                r="14"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="105"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                P1
              </text>
              <circle
                cx="234"
                cy="148"
                r="14"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="234"
                y="153"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                P2
              </text>
              <circle
                cx="220"
                cy="226"
                r="14"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="220"
                y="231"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                P3
              </text>
              <circle
                cx="100"
                cy="226"
                r="14"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="100"
                y="231"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                P4
              </text>
              <circle
                cx="86"
                cy="148"
                r="14"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="86"
                y="153"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                P5
              </text>

              <text x="160" y="296" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Single break = network continues
              </text>
              <text x="160" y="310" textAnchor="middle" fill="rgba(34,211,238,0.7)" fontSize="9">
                Each panel has 2 paths to every other
              </text>

              {/* Centre — Star */}
              <text
                x="440"
                y="60"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                STAR
              </text>
              <text x="440" y="76" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                simple but central single point
              </text>

              <circle
                cx="440"
                cy="180"
                r="20"
                fill="rgba(251,191,36,0.2)"
                stroke="#FBBF24"
                strokeWidth="1.8"
              />
              <text
                x="440"
                y="185"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                HUB
              </text>

              <line x1="440" y1="160" x2="440" y2="110" stroke="#FBBF24" strokeWidth="1.4" />
              <circle
                cx="440"
                cy="100"
                r="14"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="105"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                P1
              </text>

              <line x1="456" y1="170" x2="510" y2="148" stroke="#FBBF24" strokeWidth="1.4" />
              <circle
                cx="514"
                cy="148"
                r="14"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="514"
                y="153"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                P2
              </text>

              <line x1="456" y1="190" x2="510" y2="226" stroke="#FBBF24" strokeWidth="1.4" />
              <circle
                cx="514"
                cy="232"
                r="14"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="514"
                y="237"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                P3
              </text>

              <line x1="424" y1="190" x2="370" y2="226" stroke="#FBBF24" strokeWidth="1.4" />
              <circle
                cx="366"
                cy="232"
                r="14"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="366"
                y="237"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                P4
              </text>

              <line x1="424" y1="170" x2="370" y2="148" stroke="#FBBF24" strokeWidth="1.4" />
              <circle
                cx="366"
                cy="148"
                r="14"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="366"
                y="153"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                P5
              </text>

              <text x="440" y="296" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Hub is central single point
              </text>
              <text x="440" y="310" textAnchor="middle" fill="rgba(251,191,36,0.7)" fontSize="9">
                Cable break = one panel isolated
              </text>

              {/* Right — Bus */}
              <text
                x="720"
                y="60"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="12"
                fontWeight="bold"
              >
                BUS
              </text>
              <text x="720" y="76" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                linear, simplest, cheapest
              </text>

              <line x1="600" y1="180" x2="840" y2="180" stroke="#A855F7" strokeWidth="1.6" />

              <circle
                cx="620"
                cy="180"
                r="14"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="620"
                y="185"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                P1
              </text>
              <line x1="620" y1="166" x2="620" y2="160" stroke="#A855F7" strokeWidth="1.4" />

              <circle
                cx="675"
                cy="180"
                r="14"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="675"
                y="185"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                P2
              </text>

              <circle
                cx="730"
                cy="180"
                r="14"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="730"
                y="185"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                P3
              </text>

              <circle
                cx="785"
                cy="180"
                r="14"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="785"
                y="185"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                P4
              </text>

              <circle
                cx="820"
                cy="180"
                r="14"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="820"
                y="185"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                P5
              </text>

              <text x="720" y="296" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Cable break = panels split into two segments
              </text>
              <text x="720" y="310" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="9">
                Used in less demanding applications
              </text>

              {/* Bottom — comparison */}
              <rect
                x="40"
                y="340"
                width="800"
                height="124"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
              />
              <text x="60" y="362" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Topology choice — life-safety considerations:
              </text>
              <text x="60" y="380" fill="rgba(34,211,238,0.85)" fontSize="10">
                RING — fault-tolerant; standard for life-safety; cable returns to first panel
              </text>
              <text x="60" y="396" fill="rgba(251,191,36,0.85)" fontSize="10">
                STAR — simple; hub = single point of failure; cable break loses one panel from
                network
              </text>
              <text x="60" y="412" fill="rgba(168,85,247,0.85)" fontSize="10">
                BUS — cheapest cable; less fault tolerance; smaller / less critical installations
              </text>
              <text x="60" y="432" fill="#FBBF24" fontSize="10" fontWeight="bold">
                Default for life-safety: RING + BS EN 50200 / BS 8519 cable + BS EN 54-13
                certification
              </text>
              <text x="60" y="452" fill="#EF4444" fontSize="10" fontWeight="bold">
                NEW BS 5839-1:2025 clause 43.4 — cyber security: physical lock-off + anti-tamper
                plugs + authentication
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Cabling — BS EN 50200 / BS 8519</ContentEyebrow>

          <ConceptBlock
            title="Fire-resistant cable for the network"
            plainEnglish="Network cables between fire alarm panels carry life-safety signalling. They must continue to communicate during a fire long enough for the integrated system to coordinate evacuation. Standard data cables (CAT5, CAT6, PVC-insulated) would melt in minutes of fire exposure and are not acceptable. Fire-resistant cables per BS EN 50200 maintain circuit integrity for defined periods (PH-30, PH-60, PH-90, PH-120) — 30 to 120 minutes of fire exposure at standard test temperatures. BS 8519 is the UK code of practice on the selection and installation of fire-resistant cables; it complements BS EN 50200 with building-specific guidance."
            onSite="When you specify or check network cabling, look for BS EN 50200 markings and the PH-grade. Anything not marked is suspect; PVC-only data cable on a fire alarm network is wrong."
          >
            <p>Cable categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS EN 50200 PH-30</strong> — standard grade. 30 minutes circuit integrity
                under standardised fire test. Used for general-purpose fire alarm circuits in
                buildings of low-to-moderate fire risk.
              </li>
              <li>
                <strong>BS EN 50200 PH-60 / PH-90</strong> — extended grade for more demanding
                applications.
              </li>
              <li>
                <strong>BS EN 50200 PH-120</strong> / <strong>BS 8519 enhanced</strong> — highest
                grade, 120 minutes circuit integrity. Used for buildings of higher fire risk
                profile: buildings over 18 m, sleeping premises with vulnerable occupants
                (hospitals, care homes), large public buildings, and any premises where the fire
                risk assessment / fire engineering requires it.
              </li>
              <li>
                <strong>Selection criteria</strong> — BS 8519 / BS 9999 / BS 9991 fire engineering
                determine the grade for the building. Network cables are typically specified to the
                same grade as the rest of the fire alarm cabling — there is no benefit in using a
                lower grade for the network when the device cables are higher.
              </li>
            </ul>
            <p>
              Cable installation must follow BS 5839-1 and BS 8519: protected against mechanical
              damage; supported at appropriate intervals; segregated from other services where
              required; installed in fire-resistant containment where applicable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50200 (Method of test for resistance to fire of unprotected small cables) and BS 8519 (Selection and installation of fire-resistant power and control cable systems for life safety and fire-fighting applications)"
            clause={
              <>
                Cables used for life-safety circuits, including network cables in multi-panel fire
                alarm systems, shall be of fire-resistant construction tested to BS EN 50200, with
                the appropriate PH grade selected according to the building risk profile and BS 8519
                guidance. Cable installation shall provide mechanical protection, appropriate
                fixings, segregation from other services as required, and clear identification per
                BS 5839-1.
              </>
            }
            meaning="The cable specification framework: BS EN 50200 sets the test categories; BS 8519 gives the building-specific selection guidance; BS 5839-1:2025 confirms the application to fire alarm circuits including networks. Standard data cables are excluded by this framework. Network cabling between panels is not a cable-savings opportunity — it is a life-safety circuit and is specified accordingly."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Distributed vs centralised CIE — resilience choices</ContentEyebrow>

          <ConceptBlock
            title="Distributed CIE — every panel is functionally a master"
            plainEnglish="In a distributed CIE architecture, each panel has full CIE functionality locally. It displays its own zones, its own faults, its own isolations — AND status from all other panels on the network in real time. A fire-fighter approaching any panel sees the same picture: where the fire is across the whole site, what is in fault, what is isolated. There is no 'master' panel; status is replicated across the network and presented identically at every panel."
          >
            <p>Architectural advantages:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>No single point of failure</strong> — any panel can fail and the others
                continue to display the full picture.
              </li>
              <li>
                <strong>Operational flexibility</strong> — fire-fighters do not need to find the
                'right' panel; any panel works.
              </li>
              <li>
                <strong>Resilient to network partition</strong> — if the network splits (multiple
                cable failures), each segment continues to provide local CIE function.
              </li>
              <li>
                <strong>Scales naturally</strong> — adding a panel adds another full CIE; the system
                gets stronger, not weaker, as it scales.
              </li>
            </ul>
            <p>
              Configuration overhead is higher: every panel needs the full system data (zone names,
              device addresses, cause-and-effect logic, text descriptors). Modern vendor systems
              handle this through configuration replication tools that apply the same data to every
              panel automatically.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Centralised CIE — one master, others slaves"
            plainEnglish="In a centralised CIE architecture, one panel is designated the master CIE. It carries the full system display: events from all panels are routed to the master for indication. Remote panels are slaves — they detect locally and signal to the master, but their local indication is limited or simply repeats what the master displays. A fire-fighter at a remote panel may not see events on other panels."
          >
            <p>When centralised is appropriate:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Smaller networks</strong> — 2-3 panels, where a single master is feasible
                and the remote panels are typically unmanned.
              </li>
              <li>
                <strong>Single fire warden control point</strong> — the building has a defined fire
                warden station where the master CIE lives; remote panels are not used as operational
                stations.
              </li>
              <li>
                <strong>Cost-driven retrofits</strong> — extending an existing system with
                additional panels but keeping the existing CIE as master.
              </li>
            </ul>
            <p>
              Trade-offs: the master is the single point of failure; remote panels are not full
              displays so fire-fighters must reach the master; failure of the network between master
              and remote = master loses sight of remote events (though the remote panel continues to
              detect and signal locally via its own sounders).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cyber security — BS 5839-1:2025 clause 43.4</ContentEyebrow>

          <ConceptBlock
            title="The 2025 cyber-security clause"
            plainEnglish="With all-IP networks and connected CIEs becoming common, BS 5839-1:2025 introduces clause 43.4 on remote services and cyber security. The clause acknowledges that fire alarm CIEs are increasingly accessible over networks for remote service, monitoring, and configuration — and that this access must be controlled. The clause sets out a baseline of physical and procedural controls."
            onSite="When you arrive at a site for service of a connected CIE, the clause 43.4 questions are: Is the CIE cabinet locked? Are the network patch leads anti-tampered? Have I authenticated to the CIE? Have I done a risk assessment for the work I am about to do? Each is a clause-43.4 conversation."
          >
            <p>The clause requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical lock-off</strong> — the CIE cabinet is physically locked. Keys are
                controlled. Not 'locked but anyone can find the key under the mat.'
              </li>
              <li>
                <strong>Anti-tamper plugs on patch leads</strong> — physical-security devices that
                prevent network cables being unplugged without a key / tool. Raises the bar for
                physical interference.
              </li>
              <li>
                <strong>Authentication of any request to accept a remote connection</strong> — the
                CIE / gateway authenticates the requester. Not just 'IP address allowed'; identity
                verification.
              </li>
              <li>
                <strong>Risk assessment before remote service</strong> — particularly when executing
                read, control, or write functions. The risk assessment evaluates the potential
                impact on the operation of the CIE.
              </li>
              <li>
                <strong>System fully operational on completion</strong> — the responsible individual
                must ensure the system is fully operational when the remote service ends. Not 'left
                in a degraded state.'
              </li>
            </ul>
            <p>
              The clause is consistent with general critical-infrastructure cyber security practice:
              defence in depth, identity-based access, change management, verified system state on
              completion. Applied to fire alarm, the same principles produce a proportionate
              baseline.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.4 (Remote services and cyber security)"
            clause={
              <>
                With the rise of all-IP networks and the connected CIE, remote services and cyber
                security are now given more prominence. The 2025 revision acknowledges the use of
                such technology and includes recommendations for preventing unauthorised access to
                the system, access points, and network pathways by physical means such as locking
                the comms cabinet or fitting anti-tamper plugs to patch leads. A method of
                authentication of a request to accept a remote connection should be included in the
                CIE or gateway software before remote access is allowed. Prior to performing any
                remote service, particularly when executing read, control, or write functions, a
                thorough risk assessment should be conducted to evaluate the potential impact on the
                operation of the CIE. If there is any risk that the remote service might compromise
                the correct functioning of the CIE, the responsible individual must ensure that the
                system is fully operational upon completion of the remote service.
              </>
            }
            meaning="Five requirements packed into one clause. (1) Physical lock-off of CIE cabinet. (2) Anti-tamper plugs on patch leads. (3) Authentication for remote connections. (4) Risk assessment before remote ops. (5) Verified system state on completion. None of these are technically novel — they are standard cyber-security baseline. What is novel is BS 5839-1's explicit mandate. The fire alarm system is now a controlled asset with documented cyber-security requirements."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <Scenario
            title="University campus — designing the multi-panel network"
            situation="A university is consolidating its fire alarm provision across an 8-building campus. Existing systems are a mix of single-panel installations from different vendors, installed over the past 20 years. The estate management wants a unified system: one operational picture across the campus, one service contract, one set of records. The fire alarm designer is engaged to specify the new architecture."
            whatToDo="Design a multi-panel ring-network architecture. (1) New panels in each building, sized to that building's coverage; vendor chosen for whole-campus consistency (BS EN 54-13 system certification across the network). (2) Ring network topology: cable runs from building 1 → building 2 → ... → building 8 → back to building 1, with redundant routes between buildings where the campus layout permits. Network cable: BS EN 50200 PH-60 between buildings (campus exposure considered moderate) or PH-120 if specific buildings are higher fire risk (sleeping accommodation, laboratories). (3) Distributed CIE architecture: each panel has full CIE function; status replicated across the network. A fire warden at the campus security desk uses one panel as the operational position; another panel at the estate management office is equally functional. (4) Cyber security per clause 43.4: each CIE cabinet locked; anti-tamper plugs on all network patch leads; authentication for remote service; written risk assessment for any remote operation. Network segregated from corporate IT; dedicated fire alarm VLAN where shared infrastructure used. (5) Cause-and-effect matrix at campus level: causes can be on any panel; effects can be on any panel. E.g. 'fire in building 3, zone 2' triggers sounders in building 3 (immediate), the campus security desk indication (immediate), the estate management office (immediate), the fire alarm signal to ARC (immediate). Buildings not affected continue normally. (6) System-level fire risk assessment reviewing all the above: architecture failure modes, cyber posture, integration with campus access control / BMS / public address. (7) Documentation: campus zone plan, panel layout, network architecture diagram, cable schedule, interface schedule, cause-and-effect matrix, cyber-security risk assessment, commissioning certificate covering the integrated system, and a system extension or modification certificate for each building's contribution to the campus system per clause 47."
            whyItMatters="Multi-panel campus fire alarm is one of the more demanding fire-detection design exercises. The 2025 standard's explicit attention to cyber security, accessibility, and mandatory cause-and-effect documentation all apply to this kind of project. A well-designed campus network gives the university one operational picture and a maintenance posture that can be sustained over 20 years; a poorly-designed one creates a fragmented infrastructure that erodes into multiple silos. The design package documents every architectural choice and every safeguard."
          />

          <SectionRule />

          <ContentEyebrow>Network monitoring beyond hard-failure detection</ContentEyebrow>

          <ConceptBlock
            title="Catching degradation before it becomes failure"
            plainEnglish="Fault-tolerant network topology + cable monitoring catches the hard failures: cable cut, panel down, network partition. But the most useful diagnostic signals come BEFORE hard failure: rising error rates on a particular cable section, intermittent panel reboots, slowing response to network polls. These signals indicate components ageing, environmental degradation, or emerging hardware faults. A well-instrumented system surfaces them; a poorly-instrumented system finds out about them only when they become hard failures."
          >
            <p>What to monitor:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable error rates</strong> — packets retransmitted, parity errors, checksum
                failures. Normal background rate is near zero. Rising rates over weeks indicate
                degradation.
              </li>
              <li>
                <strong>Panel response times</strong> — how long each panel takes to respond to a
                network poll. Slowing response indicates panel CPU stress, memory issues, or network
                congestion.
              </li>
              <li>
                <strong>Panel reboots</strong> — how often each panel restarts unexpectedly. A panel
                rebooting once a month is suspect; once a week is a problem.
              </li>
              <li>
                <strong>Battery age and capacity</strong> — backup battery monitoring per panel;
                aged batteries with reduced capacity are a common pre-failure signal.
              </li>
              <li>
                <strong>Environment</strong> — temperature / humidity in panel cabinets where
                instrumentation exists; out-of-spec environment reduces panel reliability.
              </li>
            </ul>
            <p>
              The 6-monthly service is the natural moment to review these diagnostics. Modern vendor
              systems include extensive logs and reports; the maintenance organisation extracts and
              reviews them. Trends are reported in the service record; emerging issues are flagged
              for repair before they become hard failures.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Using standard data cable for the inter-panel network"
            whatHappens="A retrofit fire alarm extension across two buildings uses standard CAT5e PVC-insulated data cable for the inter-panel network. The cable is cheap, easy to terminate, and 'works fine' at install. Two years later, a fire in a service corridor exposes the cable to flames; the PVC melts within 4 minutes; the network goes down; the two panels can no longer share status; the fire-fighters at one panel cannot see the alarm condition on the other. The fire is detected locally in each panel but the integrated cause-and-effect (cross-panel sounders, lift recall on the second building) does not happen."
            doInstead="Specify network cable per BS EN 50200 / BS 8519 to match the building risk profile. PH-30 minimum for general systems; PH-60 / PH-90 / PH-120 for higher-risk buildings. Standard data cables fail in minutes of fire exposure and are not acceptable for life-safety circuits — including network cables. The cable cost difference is modest; the safety case is decisive. BS 5839-1 / BS 8519 are unambiguous on this."
          />

          <CommonMistake
            title="Leaving a connected CIE on the corporate IT network without segregation"
            whatHappens="A fire alarm vendor offers a remote-monitoring service via the connected CIE. The IT department sets up the CIE on the standard corporate network for convenience. A few months later, a routine penetration test by the corporate security team accidentally probes the fire alarm CIE's IP address and triggers a CIE network fault that takes 20 minutes to clear. During those 20 minutes, the panel-to-panel network is disrupted and inter-panel communication is degraded. The fire alarm log shows the event; nobody had warned IT about the fire alarm system's presence."
            doInstead="Per BS 5839-1:2025 clause 43.4 — segregate the fire alarm network from the corporate IT network. Dedicated VLAN or physical separation. Access control: only authorised fire alarm vendor personnel can reach the CIE. Authentication: identity-based, not just IP-based. Risk assessment before any operation. The fire alarm CIE is a critical control system, not a generic IT asset. Treat it accordingly."
          />

          <CommonMistake
            title="Configuring distributed CIE inconsistently across panels"
            whatHappens="A campus has 6 panels in a distributed CIE architecture. Over time, each panel has had configuration changes applied locally without proper replication: panel 1 has updated text descriptors for a refurbished area; panels 2-6 still show old descriptors. Panel 4 has had a cause-and-effect change to add a new interface; panels 1-3 and 5-6 do not know about it. The network-replicated 'distributed' CIE is no longer fully replicated; what each panel shows depends on which panel you stand at."
            doInstead="Distributed CIE depends on consistent configuration across panels. Use the vendor's configuration replication tools — most modern systems support pushing configuration from a master (or any panel) to all others. Do not apply configuration changes locally without replicating. The 6-monthly service should include verification of configuration consistency across panels: run a 'compare config' if the vendor supports it; spot-check text descriptors; verify cause-and-effect entries are consistent. The 2025 standard's emphasis on documented cause-and-effect supports this — the matrix as a document is the source of truth, the panels are implementations of it."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Multi-panel networks distribute the CIE function across large buildings or campuses; the network unifies indication.',
              'Ring topology = fault-tolerant; standard for life-safety. Star and bus less so; used in smaller / less critical applications.',
              'Network cables = fire-resistant per BS EN 50200 / BS 8519, grade per building risk profile (PH-30 baseline; PH-120 for higher-risk).',
              'BS EN 54-13 system compatibility applies to the networked panel set — vendor-tested combination.',
              'Distributed CIE: every panel has full local function and replicates status across the network; resilient.',
              'Centralised CIE: one master, others slaves; simpler config; master is single point.',
              'NEW BS 5839-1:2025 clause 43.4: physical lock-off + anti-tamper plugs + authentication + risk assessment + verified system state on completion.',
              'Network monitoring: hard failures (topology + cable) AND degradation (error rates, reboots, response times).',
              'Cause-and-effect matrix spans the whole network — events on one panel drive effects on another.',
              'System-level fire risk assessment for multi-panel networks: architecture, cyber posture, integration, maintenance access, staff response.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'When should a system be designed as multi-panel networked rather than single-panel?',
                answer:
                  'Whenever single-panel becomes impractical: when total devices / loops exceed vendor recommendations; when cable distances from the panel become long enough to require expensive cabling or repeaters; when the building is multi-block or campus-style; when resilience requires distributed CIE function. A practical rule of thumb: single-panel for under ~16 zones / few hundred devices; networked beyond that.',
              },
              {
                question:
                  "What does 'fire-resistant cable' actually mean for a fire alarm network?",
                answer:
                  'Cable that maintains circuit integrity under fire conditions for a defined period. BS EN 50200 specifies test methods producing PH-30 (30 minutes), PH-60 (60), PH-90 (90), PH-120 (120) categories. The cable insulation is mineral-based (e.g. mica tape) or specially formulated polymers that retain dielectric properties at high temperatures. The cable is mechanically protected, supported at appropriate intervals, and segregated from other services per BS 5839-1 / BS 8519.',
              },
              {
                question: 'Can fire alarm panels from different vendors be networked together?',
                answer:
                  'Generally no, not in compliance with BS EN 54-13 system certification. Each vendor uses proprietary network protocols; even where industry standards exist (e.g. BACnet for some integrations), the panel-to-panel protocol is typically vendor-specific. Mixing vendors loses the system-level certification and may not work at all. The pragmatic route in multi-vendor estates is to bridge via a higher-level system (BMS, integration platform) rather than direct fire-alarm-network connection.',
              },
              {
                question:
                  'What is the practical effect of clause 43.4 (cyber security) on a service visit?',
                answer:
                  'Several things. (1) The service engineer needs keys / authentication for the CIE cabinet — not just walk-up access. (2) Patch leads need anti-tamper plug keys for any reconfiguration. (3) Remote service (if used) requires authentication + risk assessment + verified system state on completion. (4) The service engineer documents what was changed and verifies the system is fully operational before leaving. The 6-monthly service paperwork now includes a clause-43.4 checklist where remote service was used.',
              },
              {
                question:
                  'How long should backup batteries last on each panel in a networked system?',
                answer:
                  "Per BS 5839-1 — typically 24 hours of standby followed by 30 minutes of alarm load (life-safety category L systems), or 72 hours / 30 minutes for some property-protection categories. The standard sets the requirement; the panel is sized accordingly. Network cables are powered by the panels; if all panels lose mains and run on batteries, the network continues to operate from each panel's backup. Battery monitoring is part of the panel's diagnostic outputs.",
              },
              {
                question:
                  'Is it acceptable to put the fire alarm network on the same physical cable as other low-voltage services?',
                answer:
                  'Generally no. BS 5839-1 / BS 8519 require segregation of fire alarm cabling from other services. Some level of physical co-routing in containment may be acceptable per BS 8519 guidance with appropriate separation distances and protection, but mixing fire alarm signal cores with other services in a single cable is not. The reasoning: a fault on the other service should not propagate to the fire alarm; mechanical / fire damage to the shared cable affects both.',
              },
              {
                question:
                  'Does network monitoring catch a panel that has been deliberately disabled by an authorised person?',
                answer:
                  "Yes — the network shows the disabled state, the same as it would show a power failure. Authorised disablement is a deliberate action that the responsible person logs in the system logbook (per BS 5839-1:2025 — all disablements recorded). The CIE indicates the disabled panel; the network propagates this to other panels. Distinguishing 'deliberate disable' from 'fault / failure' is by the cause: a logbook entry plus a deliberate user action vs an unexpected loss of communication.",
              },
              {
                question:
                  'For a networked system in a building over 18 m, what cable grade should I specify?',
                answer:
                  'Typically BS EN 50200 PH-120 / BS 8519 enhanced grade, per BS 8519 / BS 9999 / BS 9991 guidance for higher-risk buildings. Buildings over 18 m have additional fire engineering considerations (longer evacuation times, more complex compartmentation, stairway pressurisation possibly relevant). The cable specification follows the same logic as for any other life-safety circuit: enhanced grade where the building demands it. The fire engineering specification document is the source of truth.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Network and multi-panel systems — Module 3.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-3/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Design documentation
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule3Section5;
