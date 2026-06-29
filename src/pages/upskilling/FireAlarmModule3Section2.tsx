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
    id: 'fam3-s2-arch',
    question:
      'What is the fundamental architectural difference between a conventional and an addressable fire alarm system?',
    options: [
      'The colour of the system cabling used throughout.',
      'The number of zones the CIE is able to display.',
      'Conventional reports by zone (circuit = zone); addressable reports each device by address.',
      'The supply voltage the control panel runs at.',
    ],
    correctIndex: 2,
    explanation:
      'Conventional systems map zones onto wiring — one circuit, one zone. The CIE shows "Zone 3 fire" without identifying which detector. Addressable systems carry many devices on one loop, each individually addressed; the CIE shows "Smoke detector 3.07 — Kitchen, second floor". This resolution difference shapes design, fault diagnosis, and serviceability.',
  },
  {
    id: 'fam3-s2-loop',
    question:
      'A typical BS EN 54-13 addressable loop carries up to how many devices, and what does the protocol identify?',
    options: [
      'Up to 50 devices, identified by zone only rather than individually.',
      'Up to about 126 devices, each identified by its own unique digital address.',
      'Up to 256 devices, identified by zone and circuit number together.',
      'Up to 1,000 devices, identified by physical position on the loop.',
    ],
    correctIndex: 1,
    explanation:
      'Loop capacity varies by manufacturer / protocol but 126 is a common architectural limit (a common 7-bit address space minus reserved addresses). What matters is the principle: each device has a unique digital identity, polled by the CIE, and reported by name and number rather than just by zone. BS EN 54-13 governs system component compatibility — detectors, CIE, sounders that interoperate as a system.',
  },
  {
    id: 'fam3-s2-class',
    question:
      'Class A and Class B circuit configurations under BS EN 54-13: which continues to operate after a single open-circuit fault?',
    options: [
      'Class B only — the radial spur keeps devices reachable past a break.',
      'Class A — the ring keeps every device reachable from one side of the break.',
      'Both classes continue to operate equally after a single open-circuit fault.',
      'Neither class continues to operate after a single open-circuit fault.',
    ],
    correctIndex: 1,
    explanation:
      'Class A loop architecture is the standard for life-safety addressable systems specifically for the fault-tolerance reason. A single open-circuit fault on a Class A loop is reported as a fault but the system continues to detect fire because every device is still reachable from at least one end. On a Class B spur, the same fault disconnects every device beyond the break.',
  },
  {
    id: 'fam3-s2-textdesc',
    question:
      'BS 5839-1:2025 maintenance clause clarifies the responsibility for verifying detector text descriptors at the 12-month service. What does it say?',
    options: [
      'The servicing organisation must verify every descriptor at each routine service.',
      'The customer must verify every descriptor at each routine service visit.',
      'Routine verification is not recommended; premises management reports any changes.',
      'Text descriptors are not used on addressable systems, so none is needed.',
    ],
    correctIndex: 2,
    explanation:
      'The 2025 standard draws a clear line: the servicing organisation tests fire / fault response and signal transmission at every visit; the responsibility for keeping the text descriptors accurate (room names, locations) rests with the building management because they know when rooms change. Periodic confirmation is sensible practice but not mandated at every service.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the CIE display when a fire is detected on a CONVENTIONAL system?',
    options: [
      'The specific detector that operated, named individually on the display.',
      'The loop number the operated device sits on, shown on its own.',
      'The zone of the operated device; a person walks it to find the lit LED.',
      'The unique digital address programmed into the operated device.',
    ],
    correctAnswer: 2,
    explanation:
      'Zone-level resolution is the conventional architecture. The 60 m search distance rule in BS 5839-1 directly relates to this — a person walks the zone to find the operated device, and 60 m bounds the time that takes. Addressable systems break this constraint by giving the CIE the specific device address.',
  },
  {
    id: 2,
    question: 'What does the CIE display when a fire is detected on an ADDRESSABLE system?',
    options: [
      'The specific device by address and text descriptor, plus its zone and the time.',
      'The affected zone only, with no individual device named on the display.',
      'Just the loop number the operated device sits on, without its address.',
      'A flashing LED at the panel, with no further detail of the device.',
    ],
    correctAnswer: 0,
    explanation:
      'Device-level resolution is the addressable architecture. The CIE has a programmed text descriptor for each device address. When a device operates, the CIE displays the address and the text. The fire-fighter sees "Smoke detector 1.014 — Kitchen, ground floor" rather than "Zone 1 fire", and goes straight to the location.',
  },
  {
    id: 3,
    question:
      'Why is Class A loop wiring preferred over Class B radial wiring for life-safety addressable systems?',
    options: [
      'Class A cabling is cheaper to install than a Class B radial spur.',
      'Class A gives a measurably faster detector response time than Class B.',
      'Class A draws a lower standing current from the panel than Class B.',
      'Class A is fault-tolerant: a single break still leaves every device reachable.',
    ],
    correctAnswer: 3,
    explanation:
      'Fault tolerance is the architectural argument for Class A. The cable cost is higher (the cable runs as a ring, returning to the CIE) but the safety case is stronger. BS 5839-1 design for life safety leans Class A; some non-life-safety property protection schemes may be Class B.',
  },
  {
    id: 4,
    question: 'In a hybrid system, what is the typical architecture?',
    options: [
      'Every circuit is conventional radial wiring, with no addressable loops.',
      'Both conventional zones and addressable loops driven from the same CIE.',
      'Every circuit is an addressable loop, with no conventional radials.',
      'Two separate CIEs, one for each architecture, working side by side.',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid is a practical compromise. New extensions tend to be addressable; existing infrastructure may remain conventional to avoid wholesale replacement. The CIE can drive both architectures and present a unified zone map. Designers should specify the architecture per area in the design package so service organisations know what to expect.',
  },
  {
    id: 5,
    question:
      'A site has a conventional system installed in 2010. The owner wants to add coverage to a new extension. What design considerations apply?',
    options: [
      'Always replace the whole system, regardless of spare capacity.',
      'Always switch the entire site over to an addressable architecture.',
      'Extend the existing system or add a hybrid loop, and issue an extension certificate.',
      'Make no design changes at all; simply wire in the new devices.',
    ],
    correctAnswer: 2,
    explanation:
      'The 2025 standard recognises that extensions to existing systems are common and sometimes pragmatic. The new works must comply with the current standard, but the existing system does not need to be retrospectively brought up to current standard. A system extension certificate documents the change; the zone plan is updated.',
  },
  {
    id: 6,
    question:
      'What does BS EN 54-13 (system compatibility) achieve, and why does it matter for addressable systems?',
    options: [
      'It certifies that detectors, CIE and sounders from a range work together as a system.',
      'It defines the colour coding to be used on fire-alarm cabling throughout.',
      'It sets the minimum standby battery life required for the control panel.',
      'It specifies the typefaces and fonts shown on the CIE display screen.',
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 54 is a multi-part product standard; each part covers a specific component (smoke detectors EN 54-7, heat detectors EN 54-5, CIE EN 54-2, etc.). EN 54-13 is the system-level part that certifies a particular vendor combination as a compatible system. Mixing EN 54-7 detectors from one vendor onto another vendor's CIE protocol typically breaks the certification — and may not work technically.",
  },
  {
    id: 7,
    question: 'How do short-circuit isolators (SCIs) differ between Class A loop and Class B spur?',
    options: [
      'They function in exactly the same way on both topologies.',
      'A Class B spur always carries more SCIs than a Class A loop.',
      'Class A loops use no short-circuit isolators at all on the ring.',
      'On a Class A loop SCIs isolate one section; a Class B spur has no equivalent.',
    ],
    correctAnswer: 3,
    explanation:
      'Class A loop topology + SCIs delivers the BS 5839-1 architectural principle that a single fault loses no more than one zone of detection. Class B radial topology cannot achieve this without subdividing into separate radial circuits per zone (i.e. effectively reverting to conventional architecture).',
  },
  {
    id: 8,
    question:
      'Detector text descriptors on an addressable system: where are they programmed and who is responsible for keeping them accurate over time?',
    options: [
      'In the detector hardware; the manufacturer keeps them accurate over time.',
      'In the CIE at commissioning; management reports changes to keep them accurate.',
      'On a remote cloud server; the end user keeps them accurate over time.',
      'In each detector’s onboard memory; the installer keeps them accurate.',
    ],
    correctAnswer: 1,
    explanation:
      'Text descriptors are CIE-side configuration data, not hardware-side. They are entered at commissioning and updated when the building changes. The 2025 standard clarifies the responsibility: building management informs the servicing organisation of changes. The servicing organisation does not blindly verify descriptors at every service.',
  },
  {
    id: 9,
    question: 'Which of the following is a typical advantage of addressable over conventional?',
    options: [
      'It uses noticeably cheaper cable than a conventional installation.',
      'It detects fire physically faster than a conventional system does.',
      'Device-level identification, richer diagnostics and software reconfiguration.',
      'It is simpler and quicker to install than a conventional system.',
    ],
    correctAnswer: 2,
    explanation:
      'The addressable advantages are at the information layer (resolution at the CIE, diagnostics, reconfigurability). Cable savings exist on the ring-vs-many-radials axis but are not the headline. The trade-off is higher device cost and a system-level commissioning requirement (programming each address and descriptor).',
  },
  {
    id: 10,
    question:
      'In a sleeping premises hotel, the design team is choosing between conventional and addressable. What is the strong argument for addressable?',
    options: [
      'Device-level identification sends staff straight to the room, with no corridor search.',
      'Lower overall installation cost than an equivalent conventional system.',
      'Longer standby battery life than an equivalent conventional system.',
      'It is easier and quicker to install than a conventional system.',
    ],
    correctAnswer: 0,
    explanation:
      'Sleeping premises are the premier addressable use case. The fire is most likely at night; occupants are asleep; staff may be limited in number; response time is everything. Device-level identification at the CIE removes the search step. Conventional systems are still permitted in BS 5839-1 but the design conversation in any sleeping premises strongly favours addressable.',
  },
];

const FireAlarmModule3Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Addressable vs conventional | Fire Alarm Module 3.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 architecture choice: conventional zone-per-circuit, addressable device-level identification, Class A vs Class B circuits, BS EN 54-13 system compatibility, hybrid systems, and 2025 text-descriptor verification responsibilities.',
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
            eyebrow="Module 3 · Section 2"
            title="Addressable vs conventional"
            description="The two fire alarm architectures, the resolution difference at the CIE, Class A loop versus Class B spur, BS EN 54-13 system compatibility, hybrid systems, and the BS 5839-1:2025 maintenance clarifications on text-descriptor verification."
            tone="yellow"
          />

          <TLDR
            points={[
              'Conventional: each circuit (radial pair) IS a zone. Devices reported by ZONE only at the CIE — "Zone 3 fire". A person walks the zone to find the operated device (the 60 m search distance rule).',
              'Addressable: each device has a unique digital address on a shared loop. Devices reported INDIVIDUALLY at the CIE — "Detector 1.014 — Kitchen, ground floor". The 60 m rule is relaxed.',
              'Loop architecture: a typical BS EN 54-13 addressable loop carries up to ~126 devices, fed both ends from the CIE, with built-in short-circuit isolation.',
              'Class A (loop, fed both ends) — fault-tolerant. A single open-circuit fault is reported but every device remains reachable. Standard for life-safety.',
              'Class B (radial spur, fed one end) — not fault-tolerant. A break disconnects every device beyond. Used in some property-protection-only contexts.',
              'BS EN 54-13 governs system COMPATIBILITY — vendors test that their detectors, CIE, sounders interoperate as an integrated system. Mixing brands typically voids the certification.',
              'Hybrid: a mix of conventional circuits + addressable loops on the same CIE. Common in retrofits where existing infrastructure cannot be wholly replaced.',
              'Text descriptors (addressable): programmed at commissioning. Premises management notifies servicing organisation of changes. Periodic verification (e.g. 5-yearly) prudent. NOT a routine 6-monthly service action per the 2025 maintenance clarification.',
              'Sleeping premises strongly favour addressable for the response-time argument: operated device address resolves the location instantly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish conventional and addressable architectures by the resolution at the CIE — zone-level vs device-level',
              'Apply Class A loop wiring (fed both ends) versus Class B radial spur wiring and explain the fault-tolerance argument for Class A in life-safety designs',
              'Recognise BS EN 54-13 as the system-compatibility standard and the implication for mixing components across vendors',
              'Design a hybrid system that retains an existing conventional installation while extending coverage with an addressable loop',
              'Manage detector text descriptors over the system life: commissioning entry, premises management responsibility for change notification, BS 5839-1:2025 servicing-organisation scope',
              'Choose the appropriate architecture for sleeping premises, large open-plan, complex compartmented buildings, and small simple premises',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The architectural difference</ContentEyebrow>

          <ConceptBlock
            title="Conventional — circuit IS the zone"
            plainEnglish="In a conventional fire alarm system, each detection circuit is wired as a radial pair from the CIE: out to a string of detectors (and / or call points), terminating in an end-of-line device. The circuit is one zone. The CIE monitors the circuit for the rise in current that occurs when a detector operates (the detector goes from a high-impedance standby state to a low-impedance fire state). The CIE knows the circuit has gone into fire — it does NOT know which detector did it. The indication at the CIE is 'Zone 3 fire' (the circuit number / zone number). The fire warden walks the zone to find the detector with its red operated-LED illuminated."
            onSite="Conventional systems are still common, especially in smaller premises and in older installations. Recognise the architecture: many radial circuits leaving the CIE, each terminating in an end-of-line resistor or device. The zone resolution at the CIE is the design feature."
          >
            <p>The conventional pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Each circuit = one zone.</strong> The wiring topology defines the zoning;
                you cannot mix devices from different zones on one circuit.
              </li>
              <li>
                <strong>Detectors are simple.</strong> The detector senses smoke / heat and pulls
                the circuit into a low-impedance state. No address, no protocol, no individual
                identity.
              </li>
              <li>
                <strong>End-of-line monitoring</strong> — an end-of-line device (typically a
                resistor) lets the CIE distinguish open-circuit (cable break) from standby. The
                resistor sets the standby current; lower current = open; higher current = fire.
              </li>
              <li>
                <strong>The 60 m search distance rule applies.</strong> The CIE knows the zone; the
                person finds the device. 60 m bounds the time to find on the typical zone.
              </li>
              <li>
                <strong>Many cores, many circuits.</strong> A conventional install for a multi-zone
                building has many radial circuits, each typically two-core fire-rated cable. Total
                cable volume is significant.
              </li>
            </ul>
            <p>
              Conventional architecture is mature, well-understood, and cost-effective for small and
              simple buildings (≤ 4–8 zones, single storey or simple multi-storey). Its limitation
              is resolution at the CIE: zone-level only.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Addressable — device-level identification"
            plainEnglish="In an addressable fire alarm system, each device has a unique digital address. Devices are wired in a single ring (loop) shared across many devices. The CIE polls each address in turn and asks 'are you in fire?' Each device responds with its state (standby, fire, fault, isolated). When a device reports fire, the CIE records the specific address. Combined with a text descriptor programmed at commissioning ('Detector 1.014 — Kitchen, ground floor'), the CIE displays the operated device by name. The fire-fighter goes straight to the room — no zone walk, no 60 m search."
            onSite="Addressable systems are the standard for new installations of any complexity. Recognise the architecture: one loop cable returning to the CIE, with detectors / call points / sounders / interfaces tapped onto it at addressed positions."
          >
            <p>The addressable pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Each device has a unique digital address.</strong> Programmed at
                commissioning (typically by setting DIP switches / rotary switches on the device or
                via the CIE\'s programming menu).
              </li>
              <li>
                <strong>One loop carries many devices.</strong> Typically up to ~126 devices on a
                single loop (manufacturer / protocol specific; BS EN 54-13 governs system-level
                certification). The loop returns to the CIE so each device is reachable from both
                ends.
              </li>
              <li>
                <strong>Polling protocol.</strong> The CIE communicates digitally with each device.
                Standby state is polled in seconds; fire state is reported within tight time bounds
                set by the protocol.
              </li>
              <li>
                <strong>Device-level resolution at the CIE.</strong> The CIE displays the address
                and (typically) a text descriptor. The 60 m search distance rule is relaxed because
                the location is unambiguous.
              </li>
              <li>
                <strong>Built-in short-circuit isolators</strong> — modern addressable detectors
                typically include SCIs, simplifying the loop design (the SCI is at the device, not a
                separate component).
              </li>
            </ul>
            <p>
              Addressable architecture delivers more information at the CIE, easier fault diagnosis,
              fewer cables, and faster fire-finding. Trade-off: higher device unit cost, more
              complex commissioning (each address and descriptor must be programmed).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 13.2 (Subdivision and indication at the CIE)"
            clause={
              <>
                The distance any person may have to travel within a zone to determine the location
                of a fire (i.e. to identify a fire detector or manual call point operated as a
                result of a fire) should not exceed 60 m, unless the system provides an indication
                at the CIE of the particular detector or manual call point operated.
              </>
            }
            meaning="The 60 m search distance rule is the dividing line between conventional and addressable in zone-design terms. Conventional systems must keep zones small enough that the 60 m rule is satisfied — practically capping how big a zone can be in a long-narrow space. Addressable systems with device-level identification at the CIE relax this. The clause does not name addressable explicitly; it specifies the indication outcome (specific device identified). Any architecture meeting that outcome qualifies."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — conventional vs addressable wiring comparison */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Conventional radial circuits vs addressable Class A loop
            </h4>
            <svg
              viewBox="0 0 880 560"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison of conventional radial circuits (one circuit per zone, end-of-line resistor) versus addressable systems, with a separate panel showing the Class A loop (fed both ends, fault-tolerant) versus a Class B spur (fed one end, devices beyond a break are lost)."
            >
              {/* Top row — conventional vs addressable indication */}
              <text
                x="220"
                y="26"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="13"
                fontWeight="bold"
              >
                CONVENTIONAL — circuit-per-zone
              </text>
              <text x="220" y="44" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                CIE shows zone only
              </text>

              <rect
                x="60"
                y="64"
                width="80"
                height="80"
                rx="8"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="100"
                y="92"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="100" y="110" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                3 zone
              </text>
              <text x="100" y="124" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                circuits
              </text>

              {/* Circuit 1 — Zone 1 */}
              <text
                x="240"
                y="74"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Zone 1
              </text>
              <line
                x1="140"
                y1="86"
                x2="370"
                y2="86"
                stroke="rgba(34,211,238,0.6)"
                strokeWidth="1.6"
              />
              <circle
                cx="200"
                cy="86"
                r="7"
                fill="#22D3EE"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="260"
                cy="86"
                r="7"
                fill="#22D3EE"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="86"
                r="7"
                fill="#22D3EE"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <rect
                x="362"
                y="78"
                width="20"
                height="16"
                fill="rgba(34,211,238,0.3)"
                stroke="#22D3EE"
                strokeWidth="1"
              />
              <text
                x="372"
                y="89"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                EOL
              </text>

              {/* Circuit 2 — Zone 2 */}
              <text
                x="240"
                y="120"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Zone 2
              </text>
              <line
                x1="140"
                y1="132"
                x2="370"
                y2="132"
                stroke="rgba(168,85,247,0.6)"
                strokeWidth="1.6"
              />
              <circle
                cx="200"
                cy="132"
                r="7"
                fill="#A855F7"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="260"
                cy="132"
                r="7"
                fill="#A855F7"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="132"
                r="7"
                fill="#A855F7"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <rect
                x="362"
                y="124"
                width="20"
                height="16"
                fill="rgba(168,85,247,0.3)"
                stroke="#A855F7"
                strokeWidth="1"
              />
              <text
                x="372"
                y="135"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                EOL
              </text>

              {/* Highlight Z2 fire */}
              <circle cx="260" cy="132" r="11" fill="none" stroke="#FBBF24" strokeWidth="2.4" />
              <text
                x="260"
                y="158"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                operates
              </text>

              {/* Circuit 3 — Zone 3 */}
              <text
                x="240"
                y="178"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Zone 3
              </text>
              <line
                x1="140"
                y1="190"
                x2="370"
                y2="190"
                stroke="rgba(34,197,94,0.6)"
                strokeWidth="1.6"
              />
              <circle
                cx="200"
                cy="190"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="260"
                cy="190"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="190"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <rect
                x="362"
                y="182"
                width="20"
                height="16"
                fill="rgba(34,197,94,0.3)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="372"
                y="193"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                EOL
              </text>

              {/* Conventional CIE display */}
              <rect
                x="40"
                y="220"
                width="380"
                height="76"
                rx="8"
                fill="rgba(0,0,0,0.45)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1.4"
              />
              <text x="58" y="240" fill="rgba(34,211,238,0.9)" fontSize="11" fontWeight="bold">
                CIE display:
              </text>
              <text x="58" y="262" fill="#FBBF24" fontSize="14" fontWeight="bold">
                ZONE 2 — FIRE
              </text>
              <text x="58" y="284" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                specific device unknown — ≤ 60 m walk to find
              </text>

              {/* Right column — addressable indication */}
              <text
                x="660"
                y="26"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                ADDRESSABLE — Class A loop
              </text>
              <text x="660" y="44" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                CIE shows specific device
              </text>

              <rect
                x="500"
                y="64"
                width="80"
                height="80"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="540"
                y="92"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="540" y="110" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                1 loop
              </text>
              <text x="540" y="124" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                fed both ends
              </text>

              {/* Loop polygon */}
              <path
                d="M 580 86 L 720 86 L 820 124 L 820 168 L 720 206 L 580 140 Z"
                fill="none"
                stroke="rgba(251,191,36,0.7)"
                strokeWidth="1.8"
              />

              {/* Devices on loop with addresses */}
              <circle
                cx="640"
                cy="86"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="640" y="74" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.012
              </text>
              <circle
                cx="700"
                cy="86"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="700" y="74" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.014
              </text>
              <circle
                cx="760"
                cy="103"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="780" y="106" textAnchor="start" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.018
              </text>
              <circle
                cx="760"
                cy="190"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="780" y="193" textAnchor="start" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.024
              </text>
              <circle
                cx="700"
                cy="206"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="700" y="222" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.028
              </text>
              <circle
                cx="640"
                cy="140"
                r="7"
                fill="#FBBF24"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <text x="640" y="156" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                1.032
              </text>

              {/* Highlight 1.014 fire */}
              <circle cx="700" cy="86" r="11" fill="none" stroke="#EF4444" strokeWidth="2.4" />
              <text
                x="700"
                y="64"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                1.014 operates
              </text>

              {/* Addressable CIE display */}
              <rect
                x="460"
                y="220"
                width="380"
                height="76"
                rx="8"
                fill="rgba(0,0,0,0.45)"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1.4"
              />
              <text x="478" y="240" fill="rgba(251,191,36,0.9)" fontSize="11" fontWeight="bold">
                CIE display:
              </text>
              <text x="478" y="262" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Detector 1.014 — KITCHEN, ground
              </text>
              <text x="478" y="284" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                location resolved — 60 m rule relaxed
              </text>

              {/* Class A vs Class B comparison strip */}
              <text
                x="440"
                y="328"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                Class A loop vs Class B spur — fault tolerance
              </text>

              {/* Class A side */}
              <rect
                x="40"
                y="346"
                width="380"
                height="148"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text x="58" y="370" fill="#22C55E" fontSize="11" fontWeight="bold">
                CLASS A — fed both ends
              </text>
              <text x="58" y="388" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Single break = fault reported
              </text>
              <text x="58" y="404" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                ALL devices still reachable
              </text>

              {/* Class A loop visual */}
              <line x1="80" y1="448" x2="380" y2="448" stroke="#22C55E" strokeWidth="1.8" />
              <line x1="80" y1="468" x2="380" y2="468" stroke="#22C55E" strokeWidth="1.8" />
              <line x1="80" y1="448" x2="80" y2="468" stroke="#22C55E" strokeWidth="1.8" />
              <line x1="380" y1="448" x2="380" y2="468" stroke="#22C55E" strokeWidth="1.8" />
              <circle
                cx="140"
                cy="458"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="458"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="260"
                cy="458"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="458"
                r="7"
                fill="#22C55E"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              {/* Break X */}
              <line x1="225" y1="445" x2="245" y2="465" stroke="#EF4444" strokeWidth="2.4" />
              <line x1="245" y1="445" x2="225" y2="465" stroke="#EF4444" strokeWidth="2.4" />
              <text
                x="235"
                y="488"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                ✓ network continues
              </text>

              {/* Class B side */}
              <rect
                x="460"
                y="346"
                width="380"
                height="148"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text x="478" y="370" fill="#EF4444" fontSize="11" fontWeight="bold">
                CLASS B — fed one end (radial spur)
              </text>
              <text x="478" y="388" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Single break = devices beyond LOST
              </text>
              <text x="478" y="404" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Not fault-tolerant
              </text>

              {/* Class B spur visual */}
              <line x1="500" y1="458" x2="800" y2="458" stroke="#EF4444" strokeWidth="1.8" />
              <circle
                cx="540"
                cy="458"
                r="7"
                fill="#EF4444"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="600"
                cy="458"
                r="7"
                fill="#EF4444"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1"
              />
              <circle
                cx="660"
                cy="458"
                r="7"
                fill="rgba(239,68,68,0.25)"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <circle
                cx="720"
                cy="458"
                r="7"
                fill="rgba(239,68,68,0.25)"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <circle
                cx="780"
                cy="458"
                r="7"
                fill="rgba(239,68,68,0.25)"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              {/* Break X */}
              <line x1="620" y1="445" x2="640" y2="465" stroke="#EF4444" strokeWidth="2.4" />
              <line x1="640" y1="445" x2="620" y2="465" stroke="#EF4444" strokeWidth="2.4" />
              <text
                x="720"
                y="488"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                ✗ devices beyond unreachable
              </text>

              {/* Bottom strip */}
              <rect
                x="40"
                y="510"
                width="800"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="440"
                y="528"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Conventional → "Zone 2 fire" (60 m search) · Addressable → "Detector 1.014 Kitchen"
                (60 m relaxed)
              </text>
              <text x="440" y="544" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Class A loop is the BS 5839-1 default for life-safety; Class B used only in
                justified cases
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Class A vs Class B — fault tolerance on the loop</ContentEyebrow>

          <ConceptBlock
            title="Class A loop — fed both ends"
            plainEnglish="A Class A addressable loop is wired as a ring: cable leaves the CIE at terminal A, runs out around the protected area passing through every device, and returns to the CIE at terminal B. The CIE feeds the loop from both ends simultaneously. If a single open-circuit fault occurs anywhere on the cable, every device is still reachable from at least one end of the break — the CIE knows which devices are reached from which end and which device is on each side of the break. The system reports the fault but continues to detect fire on every device. This is the fault-tolerant architecture."
          >
            <p>The architectural argument:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single open-circuit</strong> on the loop = fault reported, but every device
                still reachable. Fire detection continues uninterrupted.
              </li>
              <li>
                <strong>Single short-circuit</strong> on the loop = SCIs at the section boundary
                isolate the affected section. Devices in that section may be lost; devices
                everywhere else continue to operate.
              </li>
              <li>
                <strong>Two simultaneous faults</strong> on the loop in different places = some
                devices may become unreachable. This is rare in practice but is part of the design
                consideration for very high-availability systems (where dual-loop or dual-path
                redundancy is added).
              </li>
            </ul>
            <p>
              Class A is the standard for life-safety systems under BS 5839-1. The cable cost is
              higher (the loop runs as a ring, returning to the CIE — typically twice as much cable
              as a Class B spur for the same coverage), but the safety margin is materially greater.
              Specify Class A unless there is a specific reason not to.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Class B spur — fed one end"
            plainEnglish="A Class B addressable spur is wired as a radial: cable leaves the CIE at terminal A and runs out to a string of devices, terminating at the last device. There is no return path. The CIE feeds the spur from one end only. A single open-circuit fault anywhere on the cable disconnects every device beyond the break. The CIE may report the fault but loses fire detection on the disconnected devices. This is not the fault-tolerant architecture."
          >
            <p>When Class B is acceptable:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Property-protection-only systems</strong> where the consequence of a
                fault-induced loss of detection is property damage, not life safety. Even here, the
                BS 5839-1 design conversation typically lands on Class A.
              </li>
              <li>
                <strong>Short spurs from a Class A loop</strong> — sometimes a small group of
                devices in a specific area is wired as a short Class B spur off a Class A loop, if
                the cable run is short and the area is contained. The spur is a known
                fault-tolerance compromise documented in the design.
              </li>
              <li>
                <strong>Conventional installations</strong> — Class A / Class B terminology applies
                to addressable; conventional radial circuits are intrinsically Class B in topology
                but the zone-per-circuit architecture means a single cable break loses exactly one
                zone (which is the BS 5839-1 architectural rule anyway).
              </li>
            </ul>
            <p>
              The default choice for new addressable life-safety installs is Class A. Class B is the
              exception, justified case by case, and documented.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 54-13 (System compatibility) and BS 5839-1:2025 design considerations"
            clause={
              <>
                System components including detectors, control and indicating equipment, sounders,
                and ancillary equipment shall be type-certified as compatible parts of an integrated
                system in accordance with BS EN 54-13. The system architecture, including circuit
                class (Class A or Class B per BS 5839-1) and short-circuit isolation, shall be
                designed so that no single fault results in the loss of protection from more than
                one zone or from an area greater than 2,000 m².
              </>
            }
            meaning="Two principles. First, system-level certification (BS EN 54-13) constrains the components — the addressable system is a vendor-tested combination of detectors, CIE, sounders. Mixing brands typically voids the certification (and may not work). Second, the architectural choice (Class A loop with SCIs) is the practical implementation of the BS 5839-1 single-fault rule. Class B sometimes meets the rule in trivial topologies but does not deliver the architectural fault-tolerance Class A provides."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hybrid systems and retrofits</ContentEyebrow>

          <ConceptBlock
            title="When the building has both architectures"
            plainEnglish="A hybrid system has both conventional radial circuits AND addressable loops connected to the same CIE. This is a common retrofit pattern: an existing conventional system covers the original building; a new extension adds an addressable loop. Modern CIEs support both architectures simultaneously. The design package documents which areas are conventional and which are addressable; the zone plan shows both clearly."
            onSite="When you arrive at a site for service, scan the CIE display: zone-only indications (e.g. 'Zone 5 fire') suggest conventional; device-address indications (e.g. 'Detector 2.012 fire') suggest addressable; mixed indications mean hybrid. Confirm by checking the design package and the wiring at the CIE."
          >
            <p>Common hybrid patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Original building conventional + extension addressable.</strong> The
                original wiring is retained; new coverage on a new loop. The loop is added as a new
                zone or set of zones; CIE has spare zone / loop capacity.
              </li>
              <li>
                <strong>Addressable detection + conventional sounders.</strong> Some addressable
                CIEs drive sounders on conventional radial circuits (for cable-cost reasons or
                because the sounder population predates addressable sounders).
              </li>
              <li>
                <strong>Multi-vendor hybrid</strong> — sometimes seen in legacy installations where
                one part of the building uses one vendor and another part uses another. From a BS EN
                54-13 system-certification perspective this is non-compliant; the design
                conversation must drive toward a single-vendor system at the next major
                refurbishment.
              </li>
            </ul>
            <p>
              Hybrid is pragmatic but adds complexity. Service organisations need to understand both
              architectures; spares and replacement parts must be available for both; commissioning
              and modification certificates must reflect the architecture per area.
            </p>
          </ConceptBlock>

          <Scenario
            title="Retrofit — extending a 2010 conventional system into a new wing"
            situation="A 2010-installed BS 5839-1 conventional system covers a small office with 4 zones (4 radial circuits to the CIE). The owner builds a new wing — 600 m² across two storeys — and asks for fire alarm coverage for the new wing. The CIE has 8 zone capacity; only 4 are used. The architect's drawings and the existing system documentation are available."
            whatToDo="Three viable design options. (1) Extend the existing conventional system: add 2 new radial circuits (one per new storey) to the CIE's spare zone inputs. New devices are conventional, matched to the existing system's vendor. The 2010 system's CIE must be checked for compatibility with currently-available conventional detectors. (2) Hybrid extension: add a new addressable loop module to the CIE if it supports one, then run a Class A loop through the new wing with addressable devices. The existing 4 zones remain conventional. The CIE displays zone-level for old areas, device-level for new. (3) Full upgrade: replace the CIE with a new addressable CIE, retain the existing conventional circuits as connected zones (most CIEs accept conventional inputs), add the new wing as an addressable loop. Higher cost; future-proofs the installation. In all cases, the new works must comply with BS 5839-1:2025 (zone area / search distance / compartment / storey / stairway rules). The existing system is not retrospectively brought up to current standard, but new works are. A system extension certificate (clause 47 — was modification certificate, renamed in 2025) records the change. The zone plan is updated. The logbook records the modification."
            whyItMatters="Pragmatic retrofits balance compliance, cost, and the long-term maintenance picture. Option (1) is cheapest but produces a system that is partially old and increasingly hard to source spares for. Option (2) is middle-ground and gives device-level resolution in the new wing where it matters most. Option (3) is the long-term right answer if budget allows. The 2025 standard explicitly accommodates extensions to non-current-standard systems — clause 47 makes this clear: new works comply with current standard, the overall system may not."
          />

          <RegsCallout
            source="BS 5839-1:2025 · Clause 47 (Section 7 — Extensions and modifications)"
            clause={
              <>
                Where an existing fire detection and fire alarm system is extended, the new works
                should comply with the current version of this part of BS 5839, but the overall
                system might not conform to the current standard. A certificate (extension or
                modification certificate) should be issued after any extension or modification has
                been completed. Updating the firmware of a CIE is a modification and as such
                requires a certificate to be produced.
              </>
            }
            meaning="Three things now explicit in 2025. First, extensions are recognised as a distinct activity from new-build (clarifying long-standing industry practice). Second, the certificate is renamed: extension OR modification certificate (was just modification). Third, firmware updates of the CIE count as modifications and require certificates — closing a loophole where remote firmware updates were not formally tracked. The 2025 standard treats firmware as part of the system."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Text descriptors — the 2025 maintenance clarification</ContentEyebrow>

          <ConceptBlock
            title="Who is responsible for keeping descriptors accurate?"
            plainEnglish="Each addressable device has a text descriptor programmed at the CIE — typically room name, location detail, device type. The descriptor is what the fire-fighter sees on the CIE display when the device operates. Over time, buildings change: rooms get re-purposed, partitions move, areas are renamed. The text descriptors in the CIE must keep up with these changes. The 2025 maintenance clause clarifies who is responsible for what."
          >
            <p>BS 5839-1:2025 maintenance clause:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At the 12-month service visit</strong>, the zone identification reported on
                the CIE should be verified to be the same zone that has been tested AND that it
                corresponds with the zone plan. This is a routine service action.
              </li>
              <li>
                <strong>Text descriptors</strong> on an addressable system are NOT specifically
                recommended as a routine 6-monthly verification. The premises management is
                responsible for informing the servicing organisation of any changes (room changes,
                partition changes, area renaming) so descriptors can be updated.
              </li>
              <li>
                <strong>Periodic confirmation</strong> (e.g. every 5 years) of text descriptors is
                prudent practice. The 5-year mark is a reasonable cadence at which to walk the site,
                identify each device, and verify the descriptor matches the current room.
              </li>
            </ul>
            <p>
              The clarification matters because, in practice, text descriptors drift out of date
              over a system\&apos;s 10-15 year service life. The 2025 standard does not put the
              continuous burden on the servicing organisation; it puts the change-notification
              responsibility on the building management and a sensible periodic check on the service
              organisation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.2 (12-month service)"
            clause={
              <>
                During the 12-month service visit, the zone identification reported on the CIE
                should be verified that it is the same zone that has been tested and that it
                corresponds with the zone plan. The verification of correct text descriptors on an
                addressable system is not specifically recommended as an action for the servicing
                organization to carry out during a routine service visit. It is deemed the
                responsibility of the premises management of the system to inform the servicing
                organization of any changes that are necessary. It might be prudent to confirm
                periodically (e.g. every 5 years) that the text descriptors are correct.
              </>
            }
            meaning="Three responsibilities clarified. (1) Zone identification verification at the 12-month visit — yes, routine. (2) Text descriptor verification at routine service — no, not the servicing organisation's default responsibility. (3) Change notification — premises management informs the servicing organisation. (4) Periodic check — every 5 years is the suggested cadence. This closes the long-standing ambiguity over text-descriptor maintenance."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Choosing the architecture</ContentEyebrow>

          <ConceptBlock
            title="The decision matrix"
            plainEnglish="The architecture choice is driven by the building, the occupant population, the response model, and the budget. There is no single right answer — each building demands its own analysis. Below is a decision matrix that captures the typical reasoning."
          >
            <p>Indicators favouring conventional:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Small building, ≤ 4–8 zones, simple compartmentation, single storey or simple
                multi-storey.
              </li>
              <li>Daytime-only occupancy with rapid evacuation likely (offices, retail).</li>
              <li>Limited budget; existing conventional infrastructure to extend.</li>
              <li>Property protection emphasis rather than life safety (rare in BS 5839-1).</li>
            </ul>
            <p>Indicators favouring addressable:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Sleeping premises (hotels, care, supported housing). Strong indicator.</li>
              <li>
                Complex multi-zone buildings (&gt;8 zones), large open-plan areas, non-trivial
                compartmentation.
              </li>
              <li>
                Reduced false-alarm objective — addressable multi-sensor detectors with programmable
                response characteristics are more sophisticated.
              </li>
              <li>Network / multi-panel systems with central monitoring.</li>
              <li>Future-proofing — addressable is the architecture for 2025+ installations.</li>
            </ul>
            <p>
              In sleeping premises, the design conversation strongly favours addressable. In small
              offices, conventional remains a viable cost-effective choice. The key is to think
              through the response model — who reads the CIE, when, and what they do next — and to
              design the architecture to support that response.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Mixing addressable detector vendors on the same CIE"
            whatHappens="A facilities manager replaces a faulty smoke detector and orders a 'compatible' unit from a different manufacturer because the original-vendor stock is unavailable that week. The new detector is fitted; it superficially appears to work. But the BS EN 54-13 system certification covers only the original vendor combination. The new detector's digital protocol may differ in subtle ways that affect polling reliability, false-alarm filtering, or status reporting. A subsequent fire test reveals delayed reporting on the substituted device."
            doInstead="Stay within the BS EN 54-13 system certification. Use the manufacturer-specified replacement parts. If the original vendor is unavailable, the right move is a planned upgrade — replace a defined area's detectors with a coherent vendor set, document the change, issue an extension or modification certificate. Mixing vendors on a loop is the wrong answer in nearly every practical scenario."
          />

          <CommonMistake
            title="Using Class B spurs on a life-safety addressable system without justification"
            whatHappens="A new-build commercial premises addressable system is designed with several short Class B spurs off the main loop, ostensibly to save cable. Years later, a contractor accidentally severs a Class B spur cable during plumbing work; every device beyond the break loses fire detection until the cable is repaired — potentially hours or days. During that period, the spur area is unprotected."
            doInstead="Default to Class A loop architecture for life-safety installations. Class A delivers the BS 5839-1 single-fault tolerance the standard expects. Class B spurs are acceptable only in narrowly justified cases (very short spur from a loop, contained area, documented in the design rationale). The cable savings of Class B over Class A are typically marginal for small spurs and never justify the loss of fault tolerance for substantial coverage."
          />

          <CommonMistake
            title="Letting addressable text descriptors drift out of date"
            whatHappens="A hotel undergoes a partial refurbishment: 6 guest rooms on the second floor are reconfigured as 4 larger suites. New room numbers and names are assigned. The fire alarm text descriptors on the CIE still show the old room names and numbers. Two years later, a fire in suite 207 (formerly room 213) causes the CIE to display 'Detector 2.014 — Room 213, second floor'. The night-shift staff search for room 213 — a room number that no longer exists. Response delayed."
            doInstead="When the building changes, the text descriptors must be updated. Per BS 5839-1:2025, the responsibility for notifying the servicing organisation of changes rests with the premises management. Keep a change log: every room renaming, partition move, or layout change goes to the fire alarm service contractor with a request to update descriptors. Confirm the update at the next service. Periodic 5-year audits catch any drift the change-log missed."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Conventional: circuit IS the zone, CIE shows zone only, 60 m search distance rule applies.',
              'Addressable: each device has a unique address, CIE shows the specific operated device, 60 m rule relaxed.',
              'Class A loop (fed both ends) — fault-tolerant, standard for life-safety.',
              'Class B spur (fed one end) — not fault-tolerant, used only in justified cases.',
              'BS EN 54-13 governs system component compatibility — mixing vendors typically voids certification.',
              'Hybrid systems are common in retrofits — conventional original + addressable extension.',
              'Text descriptor maintenance: premises management notifies servicing organisation of changes (per BS 5839-1:2025); periodic verification (e.g. 5-yearly) is prudent; not a routine 6-monthly task.',
              'BS 5839-1:2025 clause 47: extensions and modifications produce an extension OR modification certificate. Firmware updates count as modifications.',
              'New works on extensions comply with current standard; the overall system might not.',
              'Sleeping premises strongly favour addressable for response-time reasons. Small simple offices remain compatible with conventional.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I have a single zone with both conventional and addressable devices?',
                answer:
                  'No, not on the same circuit. A conventional zone is a radial circuit with conventional detectors. An addressable zone is a logical grouping of addressed devices on a loop. In a hybrid system, the building has both architectures but each zone is one or the other. The CIE knows which zones are conventional inputs and which are addressable, and reports each appropriately.',
              },
              {
                question: 'How many devices can I put on a single addressable loop?',
                answer:
                  "Manufacturer / protocol specific, with ~126 a common architectural limit on many systems. The BS EN 54-13 system certification specifies the maximum loaded loop tested; the manufacturer's installation manual gives the practical limit. A common rule of thumb: never load a loop above ~80% of its maximum capacity to leave headroom for retrofits. Going to ~126 leaves no headroom and constrains future modifications.",
              },
              {
                question:
                  'Why does Class A loop need cable run as a ring rather than just two cables?',
                answer:
                  'A Class A loop is the SAME cable returning to the CIE — one cable run that loops out, through every device, and back. Two terminals at the CIE (loop-start and loop-return). The CIE feeds the cable from both ends simultaneously and monitors continuity end-to-end. Splitting the cable into two separate cables is conceptually similar but loses the continuous-conductor benefit and is not the standard architecture.',
              },
              {
                question:
                  'I have a small simple two-zone office — is conventional still acceptable in 2025?',
                answer:
                  'Yes. BS 5839-1:2025 does not mandate addressable. Conventional architecture remains compliant for any scope where the 60 m search distance rule and the 2,000 m² zone area rule are satisfied. For a small office, conventional is often the simpler and cheaper choice. The decision matrix favours addressable in larger, sleeping, or response-time-critical premises.',
              },
              {
                question: 'Does BS 5839-1:2025 still recognise Class B?',
                answer:
                  'BS 5839-1 sets the architectural rule: a single fault must not lose protection from more than one zone or from an area greater than 2,000 m². Class A loop with SCIs implements this naturally. Class B can implement it on a one-zone-per-spur basis (each spur is a single zone, a fault on the spur loses that one zone). Both topologies can comply; Class A is the strongly preferred architecture for the higher fault-tolerance and is the practical default for new addressable installs.',
              },
              {
                question:
                  "What happens to addressable text descriptors if the CIE's firmware is updated?",
                answer:
                  "Firmware updates should retain the configuration including text descriptors (the manufacturer's upgrade procedure ensures this). Always back up the configuration before a firmware update. After the update, verify text descriptors are still correct — bring up each address on the CIE display and confirm. Per BS 5839-1:2025, firmware updates are modifications and produce a modification certificate documenting what was changed and when.",
              },
              {
                question:
                  'A retrofit job lists "extension or modification certificate" — what is the difference?',
                answer:
                  'The 2025 standard renamed the previous "modification certificate" to "extension or modification certificate" to clarify scope. An EXTENSION adds new coverage (new wing, new zone, new devices on a loop). A MODIFICATION changes existing coverage (replacing a CIE, updating firmware, reconfiguring causes-and-effects). Both produce a certificate; the certificate distinguishes the activity. The 2017 "modification" terminology was ambiguous and excluded extensions; 2025 is explicit.',
              },
              {
                question:
                  'Can the responsible person update text descriptors themselves on a CIE they have admin access to?',
                answer:
                  "Technically possible if the responsible person is competent and the CIE supports user-level access; in practice, descriptor changes are a configuration change that should go through the servicing organisation. The reason: a descriptor change is a record of the system's as-installed state; uncontrolled changes can drift the configuration in ways that are then not reflected in the documentation. Best practice: the responsible person notifies the servicing organisation of building changes; the servicing organisation updates descriptors and records the change in the logbook.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Addressable vs conventional — Module 3.2" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/fire-alarm-course/module-3/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Cause and effect programming
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

export default FireAlarmModule3Section2;
