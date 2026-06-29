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
    id: 'elm4-s4-2025new',
    question:
      'BS 5266-1:2025 introduces a new requirement for high-risk areas. State the two-part rule.',
    options: [
      'One circuit, with no limit on luminaires lost per fault.',
      'Two circuits, with no limit on luminaires lost per fault.',
      'At least two separate circuits, and no single fault disabling more than 20 luminaires.',
      'Five circuits, with a maximum of five luminaires lost per fault.',
    ],
    correctIndex: 2,
    explanation:
      'The 2025 rule has two parts: ≥ 2 circuits AND ≤ 20 luminaires per fault — architectural redundancy plus consequence containment. Two circuits keep the area partly lit if one fails; the 20-luminaire cap stops a localised fault blacking out a large zone. A 60-luminaire high-risk area must be split into at least three sub-zones on at least two circuits. It reflects lessons from incidents where single-circuit failures left areas dark during evacuation.',
  },
  {
    id: 'elm4-s4-segregation',
    question:
      'BS 7671 §528.1 requires segregation between safety-service circuits and other circuits. What does this mean for emergency lighting cable routing?',
    options: [
      'They may be run anywhere alongside general circuits without restriction.',
      'They must be physically separated from other circuits so faults cannot propagate to the safety circuit.',
      'They may share the same cable tray as general lighting if colour-coded.',
      'There is no segregation requirement for emergency lighting cables.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 §528.1 segregation prevents a fault on one circuit affecting another. Emergency lighting cables get their own routes — separate trays, separate compartments in segregated trunking, separate conduits, or maintained clearance — so a non-safety fault (overcurrent, short-circuit, fire) cannot propagate. It also addresses interference, mechanical damage during work, and independent isolation. The segregation is physical, electrical and operational.',
  },
  {
    id: 'elm4-s4-isolator',
    question:
      'BS 7671 Reg 560.11 requires the means of isolation for emergency lighting to be lockable AND labelled. What text and what location?',
    options: [
      'No labelling is required on the isolator.',
      'A permanent engraved "EMERGENCY LIGHTING — DO NOT SWITCH OFF" label at every isolation point.',
      'A sticky printed label at the main isolator only is sufficient.',
      'A label at floor level near the distribution board.',
    ],
    correctIndex: 1,
    explanation:
      'A permanent engraved Traffolyte (or equivalent) label, screw-fixed, reading "EMERGENCY LIGHTING — DO NOT SWITCH OFF", at the supply origin, sub-isolators, DB way and cabinet supply terminal — anywhere someone could switch off the supply unawares — visible from the operator\'s position. Sticky labels fall off and are not acceptable. The cheapest detail and the most commonly missed; without it a maintenance electrician can isolate the supply and the system runs out its autonomy and goes dark.',
  },
  {
    id: 'elm4-s4-firestop',
    question:
      'A cable tray supporting emergency lighting circuits passes through a 60-minute fire-rated wall. The tray is fire-rated; the cables are PH120 + W. What additional installation is required at the wall penetration?',
    options: [
      'Nothing — the fire-rated cable and tray already restore the wall.',
      'Some general packing material pushed into the gap around the tray.',
      'A certified 60-minute fire-stopping system matching the wall rating, cable and containment.',
      'A bead of plain sand-cement mortar around the cable tray.',
    ],
    correctIndex: 2,
    explanation:
      'A certified fire-stopping system must match the wall rating (60 min), the cable type/quantity and the containment — typically intumescent compound, fire pillows, fire-rated mortar or a proprietary cable transit, tested for the configuration and documented on the as-built. Fire-rated cable and tray are necessary but not sufficient: a 60-minute wall with an open hole around a cable becomes a 0-minute wall at that point. Building Regulations + BS 8519 + BS 7671.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'State the two-part BS 5266-1:2025 high-risk-area requirement for emergency lighting circuits.',
    options: [
      'At least two separate circuits, and no single fault disabling more than 20 luminaires.',
      'One dedicated circuit of up to 100 luminaires, provided it is fed from a central battery cabinet.',
      'Three separate circuits with no cap on the number of luminaires disabled by a single fault.',
      'At least two circuits, with no limit on how many luminaires a single fault may disable.',
    ],
    correctAnswer: 0,
    explanation:
      'The 2025 rule has both halves: ≥ 2 circuits AND ≤ 20 per fault — architectural redundancy plus consequence containment, both applying together. A 60-luminaire high-risk area must be split into at least three sub-zones on at least two circuits. It is the standard\'s response to major-incident lessons where single-circuit failures darkened areas during evacuation.',
  },
  {
    id: 2,
    question: 'A 60-luminaire high-risk area must be split into how many sub-zones to comply with the 2025 requirement?',
    options: [
      'No splitting is needed provided two circuits feed all 60 luminaires.',
      'Two sub-zones of 30 luminaires each, with no further protection within them.',
      'Four sub-zones of 15 luminaires each, the only arrangement that satisfies the rule.',
      'At least three sub-zones of no more than 20 luminaires each, on at least two circuits.',
    ],
    correctAnswer: 3,
    explanation:
      '60 luminaires / 20 per fault = ≥ 3 sub-zones, plus ≥ 2 circuits. Three circuits of 20 is the cleanest implementation; alternatives (two circuits split via fused taps, or self-contained backup combined with central) exist but must meet both halves of the rule. The architectural design is per-area; the implementation is at the installer\'s discretion within the constraint.',
  },
  {
    id: 3,
    question: 'What does BS 7671 §528.1 require for emergency lighting cables in relation to other circuits?',
    options: [
      'They may share containment with general circuits provided they are clearly colour-coded.',
      'They must be bonded to the general lighting circuits at each accessory to equalise potential.',
      'Physical segregation — separate trays, compartments, conduits or maintained clearance.',
      'No specific requirement, provided the emergency lighting cable is fire-rated.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 §528.1 requires emergency lighting cables physically separate from non-safety circuits — separate trays, compartments in segregated trunking, conduits, or maintained clearance. This prevents a non-safety fault (overcurrent, short-circuit, fire damage during work) propagating to the safety circuit, allows independent isolation and simplifies work on either circuit.',
  },
  {
    id: 4,
    question: 'What is the labelling requirement for the means of isolation of emergency lighting per BS 7671 Reg 560.11?',
    options: [
      'No labelling requirement applies to the isolator.',
      'A printed sticky label at the main isolator only.',
      'A permanent engraved "EMERGENCY LIGHTING — DO NOT SWITCH OFF" label at every isolation point.',
      'A handwritten marker-pen label on the enclosure door.',
    ],
    correctAnswer: 2,
    explanation:
      'A permanent engraved label (Traffolyte or equivalent), screw-fixed, with unambiguous text "EMERGENCY LIGHTING — DO NOT SWITCH OFF", at every isolation point (main isolator, sub-isolators, DB, cabinet supply terminal), visible from the operator\'s position, with the isolator lockable in OFF. Sticky labels fall off and are not compliant. The most commonly missed detail and the most important for preventing accidental isolation.',
  },
  {
    id: 5,
    question: 'BS 7671 §560.10 covers sources of supply for safety services. List three acceptable sources.',
    options: [
      'The public mains, a second public-mains supply from a separate substation, and a standby UPS.',
      'A photovoltaic array, a wind source, and a grid connection feeding a common inverter.',
      'A central battery, a capacitor bank, and the lift-motor regenerative supply on mains failure.',
      'A central battery, an automatically started generating set, and primary cells.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 §560.10 acceptable sources are the central battery (BS EN 50171:2021), the engine-driven generating set automatically started on mains failure, and primary (non-rechargeable) cells for limited applications. Combinations are also acceptable, e.g. a central battery covering changeover until a generator stabilises. The key requirement is independence — the safety supply must not fail just because the normal supply fails.',
  },
  {
    id: 6,
    question: 'A cable tray supporting emergency lighting circuits passes through a 90-minute fire-rated floor. What additional installation is required at the floor penetration?',
    options: [
      'A 90-minute certified fire-stopping system matching the floor rating, cable and containment.',
      'A 30-minute generic mastic seal, since the fire-rated cable carries the higher protection.',
      'Nothing further, because the cable\'s own PH rating restores the floor at the penetration.',
      'A coat of intumescent paint on the cable around the penetration, with no certified system.',
    ],
    correctAnswer: 0,
    explanation:
      'Every fire-rated wall/floor penetration needs certified fire-stopping matching the rating (90 min here), the cable type and quantity, and the containment — typically intumescent compound, fire pillows, fire-rated mortar or a proprietary cable transit, tested for the configuration and documented on the as-built. Fire-rated cable does not substitute; the floor rating must be restored at every penetration. Building Regs + BS 8519 + BS 7671.',
  },
  {
    id: 7,
    question: 'Why is a single shared cable tray with both emergency lighting and general lighting cables non-compliant with BS 7671 §528.1?',
    options: [
      'Mutual heating of the two cable groups pushes the emergency lighting flex above its rated temperature.',
      'Mixing safety and non-safety cables causes interference that corrupts the luminaire test signals.',
      'It overloads the tray mechanically, since safety circuits add weight the tray was not rated for.',
      'Shared containment defeats segregation — a fault on the general circuit can damage the safety cables.',
    ],
    correctAnswer: 3,
    explanation:
      'Single shared containment defeats segregation: a fault on the general lighting circuit (overcurrent, short-circuit, mechanical or fire damage) can damage the emergency lighting cables alongside, and independent isolation of one affects access to the other. BS 7671 §528.1 demands physical separation — a different tray, a separate compartment in segregated trunking, or a different conduit.',
  },
  {
    id: 8,
    question: 'What is a Class A circuit topology in BS EN 50172 fault-tolerance terms, compared with Class B?',
    options: [
      'Class A has higher fault tolerance — redundant paths so a single fault does not extinguish a luminaire.',
      'Class A uses smaller cross-section cable; Class B uses larger cable for higher loads.',
      'Class A energises faster on mains failure (under 0.15 s); Class B changes over more slowly.',
      'Class A and Class B are identical topologies differing only in manufacturer naming.',
    ],
    correctAnswer: 0,
    explanation:
      'Class A vs Class B in BS EN 50172 reflects fault-tolerance topology. Class A provides typically two independent paths from source to luminaire, so any single cable, connection or device fault does not extinguish it; Class B has lower tolerance, where a single fault may darken a number of luminaires. The 2025 high-risk rule (≥ 2 circuits, ≤ 20 per fault) effectively pushes high-risk areas toward Class A.',
  },
  {
    id: 9,
    question: 'What documentation does BS 5266-1:2025 require for the emergency lighting installation\'s segregated and high-risk-area architecture?',
    options: [
      'The original design drawings only, as they already show the intended circuit and luminaire layout.',
      'A single-line diagram of the supply plus the luminaire manufacturer data sheets.',
      'Zone plans, riser diagrams, cause-and-effect, cable schedules and as-built drawings.',
      'A commissioning certificate and the logbook only; drawings are not part of the pack.',
    ],
    correctAnswer: 2,
    explanation:
      'The 2025 pack comprises zone plans (high-risk areas and luminaire allocation), riser diagrams (circuit segregation and supply path), cause-and-effect documentation for the test sequences, cable schedules (circuit identity, route, fire-resistance category, segregation) and as-built drawings. Together they evidence that the architectural requirements — ≥ 2 circuits, ≤ 20 luminaires per fault, fire-rated cables, fire-stopping, labelled isolators — are realised and auditable.',
  },
  {
    id: 10,
    question: 'A central battery cabinet has a dedicated mains supply from a non-essential distribution board. The DB is upstream of any RCD-protected circuits. Is this compliant?',
    options: [
      'No — the cabinet supply must come from a completely separate utility supply, never a building DB.',
      'It does not matter where the supply originates, because the battery provides the output regardless.',
      'Yes, but only if a standby generator is also fitted to back up the cabinet supply.',
      'Yes — provided BS 7671 §560.10 independence is met, so the supply is not lost when ordinary circuits trip.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 §560.10 independence requires the cabinet supply not to be lost when ordinary circuits trip or are isolated. Practical implementations: a dedicated way on the main DB with its own MCB and no upstream RCD that could trip on a fault elsewhere; a separate sub-DB from the supply origin; or a designated supply source. The cabinet has its own labelled, lockable isolator at its supply terminal.',
  },
];

const EmergencyLightingModule4Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Circuit segregation and fire integrity | Emergency Lighting Module 4.4 | Elec-Mate',
    description:
      'BS 5266-1:2025 high-risk ≥2 circuits / ≤20 luminaires rule, BS 7671 §528.1 segregation, §560 safety services, fire-stopping, Class A/B topology, labelled isolators.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4"
            title="Circuit segregation and fire integrity"
            description="The 2025 edition of BS 5266-1 reframes circuit design: high-risk areas need at least two separate emergency lighting circuits with no single fault disabling more than 20 luminaires. Add BS 7671 §528.1 segregation, §560 safety services, certified fire-stopping at compartment penetrations, and the labelled lockable isolator — and you have the architecture that survives both real fires and routine maintenance errors."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 NEW high-risk rule: ≥ 2 separate emergency lighting circuits AND no single fault disabling more than 20 luminaires. BOTH halves apply.',
              'Architectural redundancy (≥ 2 circuits) plus consequence containment (≤ 20 per fault). A 60-luminaire high-risk area is split into ≥ 3 sub-zones on ≥ 2 circuits.',
              'BS 7671 §528.1 segregation: emergency lighting cables physically separated from non-safety circuits — separate trays, compartments, conduits, or maintained clearance.',
              'BS 7671 §560.10 sources of supply: central battery (BS EN 50171), generating set, primary cells, or combinations. Supply must be independent of the normal supply.',
              'BS 7671 Reg 560.11 dedicated lockable isolator with permanent engraved label "EMERGENCY LIGHTING — DO NOT SWITCH OFF" at every isolation point.',
              'Cable routing through fire-rated walls/floors requires certified fire-stopping matching the rating, the cable, and the containment. Fire-rated cable + unstopped penetration = breached compartment.',
              'Class A topology = redundant paths, single-fault tolerant (high-risk areas tend here). Class B topology = simpler, less tolerant. BS EN 50172 fault-tolerance language.',
              'Routing of redundant circuits: independent physical paths. Sharing a tray defeats the redundancy via common-mode failure.',
              '2025 documentation: zone plans, riser diagrams, cause-and-effect, cable schedules, as-built drawings — evidencing the architectural compliance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State and apply the BS 5266-1:2025 high-risk-area rule: ≥ 2 separate emergency lighting circuits AND ≤ 20 luminaires disabled per single fault',
              'Apply BS 7671 §528.1 segregation between safety service circuits and other circuits — physical separation via tray, compartment, conduit, or clearance',
              'Identify BS 7671 §560.10 acceptable sources of supply for safety services and apply the independence requirement',
              'Specify the BS 7671 Reg 560.11 lockable, labelled isolator at every isolation point — permanent engraved label "EMERGENCY LIGHTING — DO NOT SWITCH OFF"',
              'Identify fire-compartment penetrations and specify certified fire-stopping matching the wall/floor rating, the cable type, and the containment',
              'Distinguish Class A topology (redundant paths, single-fault tolerant) from Class B topology (simpler, less tolerant) and apply to high-risk vs general areas',
              'Route redundant circuits through independent physical paths to avoid common-mode failure',
              'Produce 2025 documentation pack: zone plans, riser diagrams, cause-and-effect, cable schedules, as-built drawings',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 2025 high-risk-area rule — architectural fault tolerance</ContentEyebrow>

          <ConceptBlock
            title="Two halves of one rule"
            plainEnglish="BS 5266-1:2025 introduces a new requirement for high-risk task areas: at least two separate emergency lighting circuits, AND no single fault shall disable more than 20 luminaires. Both halves apply simultaneously. The first half provides architectural redundancy — a fault on one circuit leaves the second operational, the area is not fully dark. The second half caps the consequence of any single fault — even within one circuit, a localised fault cannot black-out a large zone. Together they reflect lessons from major incidents where single-circuit failures left areas dark during evacuation."
            onSite="When a designer or a drawing claims '2025 compliant', check both halves. ≥ 2 circuits is easy to count; ≤ 20 luminaires per fault is harder — you have to trace the fault path. A circuit of 50 luminaires with no sub-zone protection is non-compliant even if there are two such circuits."
          >
            <p>The two-part rule unpacked:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>≥ 2 separate emergency lighting circuits in the high-risk area.</strong> The
                circuits must be electrically separate (different MCBs, different protective devices)
                AND physically separate (different routes, different containment) so that a single
                fire/mechanical event cannot take both out. The second circuit is the architectural
                redundancy — if the first goes down, the second remains.
              </li>
              <li>
                <strong>≤ 20 luminaires disabled per single fault.</strong> Whatever the single fault
                is — short circuit, cable damage, MCB trip, control fault, driver failure
                propagating along a control bus — it must not extinguish more than 20 luminaires.
                This forces sub-zoning within circuits. A circuit of 50 luminaires must be sub-divided
                so that a fault in one section affects only that section (≤ 20 luminaires), not the
                whole 50.
              </li>
              <li>
                <strong>Application: the 60-luminaire example.</strong> A high-risk area of 60
                luminaires must be split into at least three sub-zones of ≤ 20 luminaires each. Plus
                at least two circuits. Common implementations: three circuits of 20 (simplest);
                two circuits each with three sub-zones via fused taps or distribution; two circuits
                with self-contained backup providing the third independent path.
              </li>
              <li>
                <strong>"High-risk" means what the standard says.</strong> BS 5266-1:2025 defines
                high-risk task areas as those where (a) failure of emergency lighting could cause
                injury or significant harm during evacuation or task wind-down, or (b) complex
                processes require continued visibility for safe shut-down. Examples: industrial
                machinery rooms, laboratory hazard areas, kitchens with active cooking equipment,
                control rooms, dense-occupant escape routes. The risk assessment identifies which
                areas in the building are high-risk; not every space is.
              </li>
            </ul>
            <p>
              The rule does not apply universally — only in high-risk areas. Lower-risk corridors,
              offices, and storage continue to use the standard single-circuit approach (with all
              the other emergency lighting requirements applying). The architectural complexity is
              proportionate to the consequence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · High-risk task areas"
            clause={
              <>
                In high-risk task areas, emergency lighting shall be provided from at least two
                separate emergency lighting circuits arranged so that no single fault on either
                circuit shall disable the emergency lighting of more than 20 luminaires. The
                separation between circuits shall be physical as well as electrical, with cable
                routes arranged so that a single fire or mechanical event cannot disable both
                circuits simultaneously.
              </>
            }
            meaning="Three load-bearing phrases. (1) 'At least two separate emergency lighting circuits' — the redundancy half. (2) 'Not more than 20 luminaires' — the consequence-cap half. (3) 'Separation shall be physical as well as electrical' — the routing half: different trays, different containment, different paths. All three together. Specifying two circuits but routing them through the same tray fails the third."
          />

          <ConceptBlock
            title="Implementation patterns for the 2025 rule"
            plainEnglish="The two-part rule is implemented in different ways depending on the layout. There is no single 'correct' implementation — the designer chooses the pattern that best fits the area's geometry, the supply infrastructure, and the maintenance regime."
          >
            <p>Common implementation patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Multi-circuit alternation.</strong> Three circuits of ≤ 20 luminaires each,
                with the luminaires alternating along the area so that a fault on any one circuit
                leaves a coherent emergency lighting pattern from the other two. Simple to
                understand; symmetric. Common in linear corridors and large halls.
              </li>
              <li>
                <strong>Two circuits with sub-zoning.</strong> Two circuits of larger luminaire counts,
                each sub-divided via fused taps or distribution boxes so that a fault in any sub-zone
                affects only that sub-zone (≤ 20 luminaires). Reduces circuit count at the supply but
                increases distribution complexity.
              </li>
              <li>
                <strong>Central battery + self-contained backup.</strong> A central battery provides
                the primary emergency lighting; self-contained luminaires distributed in the same
                area provide a second independent path. The central is split into sub-zones for the
                20-luminaire rule; the self-contained units are not on the central battery and so
                are immune to cabinet failure. Used in high-criticality applications (operating
                theatres, ICUs, control rooms).
              </li>
              <li>
                <strong>Duty/standby cabinets.</strong> Two central battery cabinets, one duty and
                one standby, with automatic failover. Each feeds the area independently; a fault on
                one cabinet fails over to the other. Common in stair cores and other escape-critical
                paths.
              </li>
              <li>
                <strong>Hybrid supply sources.</strong> A central battery + generating set
                arrangement per BS 7671 §560.10. The battery covers changeover (0.5 second) and the
                first minutes of an event; the generator picks up after start-up. Provides extended
                duration and source diversity.
              </li>
            </ul>
            <p>
              The designer documents the pattern, the rationale, and the calculation showing the
              ≥ 2 circuits + ≤ 20 luminaires-per-fault rule is met. Auditors and successor designers
              read the documentation to confirm compliance and to plan modifications.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: 2025 high-risk area with 2 circuits, max 20 luminaires per fault */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5266-1:2025 high-risk-area architecture — ≥ 2 circuits, ≤ 20 luminaires per fault
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="A high-risk area with 60 luminaires split into three sub-zones of 20 luminaires each, fed from two emergency lighting circuits via independent cable routes."
            >
              <text x="440" y="28" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                60-luminaire high-risk area: 3 sub-zones of 20, on 2 circuits
              </text>

              {/* Supply / cabinet */}
              <rect x="350" y="50" width="180" height="60" rx="8" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="440" y="74" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Central battery cabinet</text>
              <text x="440" y="92" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">BS EN 50171:2021</text>

              {/* Two circuits leaving */}
              <line x1="400" y1="110" x2="400" y2="150" stroke="#22C55E" strokeWidth="2" />
              <text x="375" y="135" textAnchor="end" fill="#22C55E" fontSize="10" fontWeight="bold">Circuit A</text>
              <line x1="480" y1="110" x2="480" y2="150" stroke="#22D3EE" strokeWidth="2" />
              <text x="505" y="135" fill="#22D3EE" fontSize="10" fontWeight="bold">Circuit B</text>

              {/* Independent cable routes */}
              <line x1="400" y1="150" x2="200" y2="150" stroke="#22C55E" strokeWidth="2" />
              <line x1="200" y1="150" x2="200" y2="220" stroke="#22C55E" strokeWidth="2" />
              <text x="220" y="180" fill="rgba(34,197,94,0.65)" fontSize="9">left riser, PH120 + W</text>

              <line x1="480" y1="150" x2="680" y2="150" stroke="#22D3EE" strokeWidth="2" />
              <line x1="680" y1="150" x2="680" y2="220" stroke="#22D3EE" strokeWidth="2" />
              <text x="660" y="180" textAnchor="end" fill="rgba(34,211,238,0.65)" fontSize="9">right riser, PH120 + W</text>

              {/* Sub-zone 1 (20 luminaires) - fed from A */}
              <rect x="60" y="240" width="240" height="100" rx="10" fill="rgba(34,197,94,0.05)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="180" y="262" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Sub-zone 1 · 20 luminaires</text>
              <text x="180" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Circuit A · fused tap 1</text>
              {/* dots representing luminaires */}
              {[0,1,2,3,4].map((c) => [0,1,2,3].map((r) => (
                <circle key={`s1-${c}-${r}`} cx={80 + c * 42} cy={295 + r * 10} r="3" fill="rgba(255,255,255,0.6)" />
              )))}
              <line x1="200" y1="220" x2="200" y2="240" stroke="#22C55E" strokeWidth="1.6" />

              {/* Sub-zone 2 (20 luminaires) - fed from B */}
              <rect x="320" y="240" width="240" height="100" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="440" y="262" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">Sub-zone 2 · 20 luminaires</text>
              <text x="440" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Circuit B · fused tap 1</text>
              {[0,1,2,3,4].map((c) => [0,1,2,3].map((r) => (
                <circle key={`s2-${c}-${r}`} cx={340 + c * 42} cy={295 + r * 10} r="3" fill="rgba(255,255,255,0.6)" />
              )))}
              <line x1="440" y1="160" x2="440" y2="240" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Sub-zone 3 (20 luminaires) - fed from A or B (alternate) */}
              <rect x="580" y="240" width="240" height="100" rx="10" fill="rgba(34,197,94,0.05)" stroke="#22C55E" strokeWidth="1.4" strokeDasharray="4,2" />
              <text x="700" y="262" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Sub-zone 3 · 20 luminaires</text>
              <text x="700" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Circuit A · fused tap 2</text>
              {[0,1,2,3,4].map((c) => [0,1,2,3].map((r) => (
                <circle key={`s3-${c}-${r}`} cx={600 + c * 42} cy={295 + r * 10} r="3" fill="rgba(255,255,255,0.6)" />
              )))}
              <line x1="680" y1="220" x2="680" y2="240" stroke="#22C55E" strokeWidth="1.6" />

              {/* Annotation: 2-of-3 rule met */}
              <rect x="60" y="370" width="760" height="80" rx="10" fill="rgba(251,191,36,0.06)" stroke="#FBBF24" strokeWidth="1.4" strokeDasharray="6,3" />
              <text x="440" y="394" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Compliance check</text>
              <text x="440" y="412" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9.5">≥ 2 circuits ✓ (A and B, independent risers)       Single fault disables ≤ 20 luminaires ✓ (each sub-zone has its own fused tap)</text>
              <text x="440" y="428" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">Cable routes physically separate (left/right risers) — no common-mode failure</text>
              <text x="440" y="442" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Worst-case: fault on Circuit A loses 40 luminaires, Circuit B keeps 20 lit (sub-zone 2). Reverse: A keeps 40, B loses 20.</text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS 7671 §528.1 segregation — keeping safety circuits apart</ContentEyebrow>

          <ConceptBlock
            title="Why segregation matters"
            plainEnglish="Emergency lighting circuits are safety services. They must be kept apart from non-safety circuits — physically, electrically, and operationally — so that a fault on a non-safety circuit cannot propagate to the safety circuit. BS 7671 §528.1 specifies the segregation requirement; it is the rule that prevents the general lighting circuit's overcurrent from also damaging the emergency lighting cable in the same tray."
          >
            <p>What §528.1 segregation looks like:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Separate cable trays / ladders.</strong> Emergency lighting on its own tray;
                non-safety circuits on a different tray. Physical separation prevents fault
                propagation, work on either circuit affecting the other, and isolation conflicts.
              </li>
              <li>
                <strong>Compartmented trunking.</strong> Where space prevents separate trays,
                segregated trunking with internal partitions providing the equivalent of separate
                compartments. Each compartment is sealed and continuous; the partitions must be
                the trunking manufacturer's certified separation.
              </li>
              <li>
                <strong>Separate conduits.</strong> Where cables run in conduit, emergency lighting
                in its own conduit, non-safety in another. Shared conduit defeats segregation.
              </li>
              <li>
                <strong>Maintained physical clearance.</strong> Where cables run in free air or in
                building voids, a maintained clearance (typical 50-100 mm depending on cable type
                and the relevant standard) provides functional separation. Clearance is harder to
                evidence than physical separation but is recognised in the standard.
              </li>
              <li>
                <strong>Operational segregation.</strong> Independent isolation — the means of
                isolating the non-safety circuit must not also isolate the safety circuit. The
                safety circuit has its own labelled lockable isolator (Reg 560.11).
              </li>
            </ul>
            <p>
              Mixed cables in a single tray defeat segregation. The fix is dedicated trays/compartments
              for safety services or maintained physical clearance. The cost is more containment but
              the benefit is fault isolation and operational independence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 528.1 (Segregation of cables)"
            clause={
              <>
                Cables of safety service circuits shall be segregated from cables of other circuits
                so that any failure of one circuit cannot affect the other. Segregation may be
                achieved by physical separation in dedicated containment, by compartmented trunking,
                by separate conduit, or by maintained physical clearance appropriate to the cable
                type.
              </>
            }
            meaning="Physical separation by some means — tray, compartment, conduit, clearance. The intent is fault isolation: a problem on one circuit cannot become a problem on the other. Separation also serves operational purposes (independent isolation) and maintenance access."
          />

          <ConceptBlock
            title="BS 7671 §560 sources of supply for safety services"
            plainEnglish="The supply that powers emergency lighting is a safety supply. BS 7671 §560.10 lists the acceptable sources and the independence requirement; §560.11 covers circuits, segregation, fire-resistant wiring, and the labelled lockable isolator."
          >
            <p>§560.10 acceptable supply sources:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Central battery (BS EN 50171:2021 cabinet).</strong> The dominant choice for
                centralised emergency lighting. The cabinet provides the supply during mains failure;
                the cabinet's own input supply must be reliable but the OUTPUT to the luminaires is
                independent of the building's normal supply.
              </li>
              <li>
                <strong>Generating set (engine-driven, automatic start).</strong> A standby generator
                that starts on mains failure, runs the building's life-safety loads (including
                emergency lighting), and shuts down on mains restoration. Used in larger
                installations and where extended duration matters; combined with central battery for
                start-up coverage.
              </li>
              <li>
                <strong>Primary cells (non-rechargeable batteries).</strong> Used in very specific
                limited applications — typically remote signage or emergency exit signs in
                low-occupancy contexts. Not common in commercial emergency lighting because of
                replacement labour.
              </li>
              <li>
                <strong>Combinations.</strong> Central battery + generating set is common — battery
                covers the 0.5-second changeover and the first minutes; generator picks up after
                start-up and runs the extended duration. Per BS EN 50172.
              </li>
              <li>
                <strong>Self-contained luminaires.</strong> Each luminaire's own internal battery is
                its supply source. The supply requirement applies per-luminaire — the local mains is
                the charging path, and the local battery is the emergency supply.
              </li>
            </ul>
            <p>
              The independence requirement: the safety supply must NOT fail just because the normal
              supply fails. The whole point of emergency lighting is to provide light when the
              normal supply has gone. The supply architecture must be designed so that the safety
              supply is independent of the normal supply (different source, different path, separate
              isolation, separate protection).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The labelled lockable isolator — Reg 560.11</ContentEyebrow>

          <ConceptBlock
            title="The cheapest detail and the most commonly missed"
            plainEnglish="Every isolation point in the emergency lighting supply must be lockable in the OFF position AND labelled with a permanent engraved label. The label says 'EMERGENCY LIGHTING — DO NOT SWITCH OFF' or equivalent. The cost is a few pounds; the consequence of skipping it is that some maintenance electrician switches off the supply during an unrelated outage, the system runs out the autonomy on battery, and goes dark. This is the single most preventable failure mode of an emergency lighting system."
          >
            <p>The labelled-isolator requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lockable in OFF position.</strong> The isolator can be padlocked off for
                maintenance work. BS 7671 + Electricity at Work Regulations + safe-isolation
                practice. The maintenance electrician locks it off, works safely, unlocks it when
                done. The lock is what gives the worker confidence the isolator will not be
                re-energised without their knowledge.
              </li>
              <li>
                <strong>Permanent engraved label.</strong> Traffolyte (engraved phenolic laminate),
                stamped metal, or equivalent permanent material. Fixed by screws or mechanical
                attachment. NOT a sticky label — those fall off, get covered, get scuffed off, and
                the warning is lost.
              </li>
              <li>
                <strong>Unambiguous text.</strong> "EMERGENCY LIGHTING — DO NOT SWITCH OFF" is the
                standard wording. Variants like "EMERGENCY LIGHTING SUPPLY — DO NOT ISOLATE" are
                acceptable provided they are clear. Capital letters typically; high-contrast text on
                background.
              </li>
              <li>
                <strong>At every isolation point.</strong> Main supply isolator, sub-distribution
                board way isolator, cabinet supply isolator, any in-line isolators. Anywhere a
                person could reasonably switch off the supply without realising what it does.
              </li>
              <li>
                <strong>Visible from the operator's position.</strong> The label is visible to the
                person who would otherwise flip the switch — at the front of the panel, on the lid
                of the box, or on the cover of the device. A label hidden inside an enclosure that
                the operator opens AFTER the switch flip is no use.
              </li>
            </ul>
            <p>
              The label is the engineering control for human-error isolation. It is cheap, simple,
              and effective. Inspection regimes specifically check for it. Its absence is one of the
              most common defects on existing emergency lighting installations and one of the
              cheapest to remedy.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Two redundant circuits routed through the same cable tray"
            whatHappens="A high-risk area is correctly given two emergency lighting circuits per the BS 5266-1:2025 rule. Both circuits are PH120 + W cable, both terminated correctly at the cabinet and luminaires. Both share a single galvanised cable tray running along the corridor void. A fire breaks out in an adjacent space; smoke and heat rise into the void; the tray is mechanically damaged at one point. Both cables suffer mechanical damage simultaneously; both circuits go open-circuit. The architectural redundancy is defeated by common-mode failure at the tray. The corridor goes dark for the second half of the evacuation."
            doInstead="Route the two redundant circuits through INDEPENDENT physical paths. Different trays, different risers, opposite sides of the corridor at minimum. The cables themselves must be PH-rated, but the routing must be designed so that no single fire/mechanical event can take both out. The same logic applies to junction boxes (each circuit gets its own), to distribution boards (consider separate boards or at minimum separate ways), and to the supply itself. Document the routing on the as-built — auditors check for common-mode failure paths."
          />

          <CommonMistake
            title="Sticky label on the emergency lighting isolator"
            whatHappens="The 'EMERGENCY LIGHTING — DO NOT SWITCH OFF' warning is on a vinyl sticky label applied to the isolator cover. Eighteen months later, the label has yellowed, peeled at the corners, and the lower half is illegible. A maintenance contractor sees an unmarked isolator switch and assumes it is an ordinary supply. Flips it off to check a circuit issue. Walks away. The system runs out the autonomy on battery (1, 2, or 3 hours depending on design) and goes dark. The duty-holder discovers it the next day during the routine indicator check; the system has been off-duty for hours and would have been off-duty during a real event."
            doInstead="Permanent engraved label, screw-fixed. Traffolyte or equivalent. The cost is £2-5 per label. The consequence of cheap stickers is real-world isolation events. Specify permanent engraved labels in the schedule of work; check them at every inspection visit; replace immediately if damaged. The label is part of the installation, not an afterthought."
          />

          <Scenario
            title="A laboratory upgrade — applying the 2025 high-risk rule"
            situation="A pharmaceutical research laboratory is having its emergency lighting upgraded. The lab area is 600 m² with 60 luminaires. The risk assessment classifies it as 'high-risk' because of: chemical handling, sleeping research animals in adjacent rooms requiring extended evacuation supervision, dense occupant population during shifts, and complex shut-down procedures requiring continued visibility for 30+ minutes after a fire trigger."
            whatToDo="Apply the 2025 rule. (1) Split the 60 luminaires into three sub-zones of 20 each, geographically distributed so each sub-zone covers different parts of the lab (not just sequential thirds along one wall). (2) Provide two emergency lighting circuits — Circuit A and Circuit B — each fed from the central battery cabinet through different cable risers and physically independent routes. (3) Sub-zones 1 and 3 on Circuit A (different fused taps); sub-zone 2 on Circuit B. A fault on Circuit A loses sub-zones 1 and 3 (40 luminaires); Circuit B keeps sub-zone 2 (20 luminaires) lit. A fault on Circuit B loses sub-zone 2 (20); Circuit A keeps the other 40. A fault within sub-zone 1's fused tap loses only 20. (4) PH120 + W cabling throughout (high-criticality, life-critical signal path). (5) Cable routes through the lab service void use independent cable trays — Circuit A on the north tray, Circuit B on the south tray. (6) Fire-stopping at every compartment penetration (lab walls are 60-minute fire-rated). (7) Labelled lockable isolators at the cabinet, the DB, and any sub-points. (8) Document on zone plan, riser diagram, cause-and-effect, cable schedule, as-built. (9) Commission per BS EN 50172:2024 — verify the architectural compliance with simulated fault tests."
            whyItMatters="The 2025 rule is real engineering. A naive 'two circuits' specification with both routed through the same tray fails the architectural intent. A naive 'one circuit of 60' fails both halves of the rule. Done correctly, the laboratory has a fault-tolerant emergency lighting system that survives common-mode events and meets the 2025 standard. The documentation is what auditors and successor designers rely on."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fire-stopping at compartment penetrations</ContentEyebrow>

          <ConceptBlock
            title="Restoring the rating of the wall, every time"
            plainEnglish="Fire compartments contain fire spread between zones. Each compartment is bounded by walls, floors, and ceilings with a tested fire-resistance rating (typically 30, 60, 90, or 120 minutes). When a service (cable, pipe, duct) penetrates a compartment boundary, the boundary rating must be restored at the penetration with certified fire-stopping. Without fire-stopping, a 60-minute wall with a hole in it is a 0-minute wall AT THAT POINT — fire and smoke pass through unimpeded. The cable being fire-rated does not substitute for fire-stopping; the cable carries circuit integrity, the fire-stop carries compartment integrity."
          >
            <p>Fire-stopping requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Match to wall/floor rating.</strong> A 60-minute wall needs 60-minute
                fire-stopping. A 120-minute floor needs 120-minute fire-stopping. The fire-stop
                system carries a tested rating that must equal or exceed the element rating.
              </li>
              <li>
                <strong>Match to cable type and quantity.</strong> Fire-stop systems are tested for
                specific cable types, sizes, and quantities. A system tested for 4 × FP200 Gold may
                not be valid for 12 × MICC. The manufacturer's certification specifies the
                applicable configurations.
              </li>
              <li>
                <strong>Match to containment.</strong> Cable in a tray, cable in a conduit, cable in
                a basket, single cable through a small hole — each needs its own type of fire-stop.
                Intumescent compound for individual cables; fire pillows for cable bundles in trays;
                fire-rated mortar for masonry penetrations; fire collars on metal conduit; cable
                transit systems for high-density penetrations.
              </li>
              <li>
                <strong>Install per certified instructions.</strong> Fire-stop is a tested SYSTEM —
                compound + bonding + cover plates + supports per manufacturer datasheet. Deviations
                void the certification. Site improvisation (e.g. swapping in a generic mastic
                because it looks similar) destroys compliance.
              </li>
              <li>
                <strong>Document.</strong> Every fire-stopped penetration is logged with photo,
                location reference, certificate ID, manufacturer, installation date, and installer.
                The pack is the evidence presented at inspection and to insurers.
              </li>
            </ul>
            <p>
              Fire-stopping is the most-skipped element of life-safety installations because it
              comes at the end, when trades are under time pressure. It is also the most heavily
              checked at inspection because it is highly visible and a known weak point. Doing it
              right first time is far cheaper than retrofitting under client pressure.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations Approved Document B + BS 8519 · §6 (Installation system requirements)"
            clause={
              <>
                Penetrations of fire-resisting elements by services (cables, conduits, trunking,
                trays) shall be sealed with fire-stopping systems tested and certified to the
                fire-resistance rating of the element being penetrated, appropriate to the service
                type and quantity. The fire-stop installation shall maintain the fire-resistance
                performance of the building element across the penetration.
              </>
            }
            meaning="The compartment rating must be restored at every penetration. Tested and certified system; matched to the element rating, cable type, and containment. The cable being fire-rated is necessary but not sufficient — the wall rating is restored by the fire-stop, not by the cable. Approved Document B (Building Regulations) sets the regulatory requirement; BS 8519 sets the practical specification."
          />

          <ConceptBlock
            title="Class A vs Class B circuit topology — fault tolerance language"
            plainEnglish="BS EN 50172 and related standards describe circuit topology in terms of fault tolerance class. Class A is higher tolerance — typically multiple paths from supply to luminaire, so a single fault does not extinguish a luminaire. Class B is lower tolerance — single path, single fault may extinguish a number of luminaires. The 2025 high-risk rule effectively pushes high-risk areas toward Class A patterns; lower-risk areas remain on Class B."
          >
            <p>The classification distinction:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Class A — single-fault tolerant.</strong> Each luminaire is fed via two
                independent paths from the supply source, so any single cable / connection / device
                fault does not extinguish the luminaire. Achieved through dual-circuit feeds, ring
                topology, or redundant supply architectures. High capital cost; high fault tolerance.
                Used in escape stair cores, hospital theatres, control rooms.
              </li>
              <li>
                <strong>Class B — single path.</strong> Each luminaire fed by one path; a fault on
                that path extinguishes the luminaire. Lower capital cost; lower fault tolerance.
                Used in lower-criticality areas where the consequence of single luminaire loss is
                tolerable.
              </li>
              <li>
                <strong>The 2025 connection.</strong> The high-risk rule (≥ 2 circuits, ≤ 20
                luminaires per fault) is essentially mandating Class-A-equivalent fault tolerance for
                high-risk areas. Even if individual luminaires are not dual-fed, the architectural
                redundancy at the area level achieves the same fault-tolerance outcome.
              </li>
              <li>
                <strong>Mixed topology.</strong> Most buildings have Class A in the highest-criticality
                zones and Class B in the rest. The transition is documented on the as-built; the
                test regime adapts to the topology.
              </li>
            </ul>
            <p>
              The class is chosen at design stage and constrains everything downstream — cable
              schedule, distribution layout, isolation arrangement, test regime. Specifying "Class A"
              casually drives substantial cost; specifying "Class B" where Class A is needed is a
              compliance and safety failure. The choice follows the risk assessment.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Documentation — the audit trail</ContentEyebrow>

          <ConceptBlock
            title="What 2025 documentation looks like"
            plainEnglish="The 2025 edition tightens the documentation requirement. The pack must evidence the architectural compliance — that the ≥ 2 circuits / ≤ 20 luminaires per fault rule is implemented, that segregation is achieved, that fire-stopping is in place, that isolators are labelled. Drawings + certificates + cause-and-effect + as-built. The pack is the audit trail; without it, compliance is unevidenced."
          >
            <p>The 2025 documentation pack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zone plans.</strong> Floor plans showing the high-risk areas, the luminaire
                layout, the sub-zoning per the 20-luminaire rule, and the area-by-area architecture
                allocation (self-contained / central battery / hybrid).
              </li>
              <li>
                <strong>Riser diagrams.</strong> Vertical sections showing the supply path from
                source (cabinet / DB) to each zone, the circuit identity, and the routing through
                the building. Critical for verifying the physical separation of redundant circuits.
              </li>
              <li>
                <strong>Cause-and-effect documentation.</strong> Describes the system response to
                various trigger conditions: mains failure, fault on Circuit A, fault on Circuit B,
                cabinet fault, fire in zone X, etc. The matrix shows what stays lit, what goes dark,
                and how the redundancy plays out. Used in commissioning to verify the design works
                as intended.
              </li>
              <li>
                <strong>Cable schedule.</strong> Per circuit: cable type, rating (PH30 / PH60 / PH120
                + W), cross-section, route, fixings, containment, fire-rated route designation.
              </li>
              <li>
                <strong>Fire-stopping log.</strong> Every penetration with photo, location, certificate
                reference, installation date, installer. Plus the as-built drawings flagging each
                penetration.
              </li>
              <li>
                <strong>Isolator schedule.</strong> Every isolation point with location, type, label
                text, and confirmation of lockable and labelled status.
              </li>
              <li>
                <strong>Test certificates.</strong> Continuity, insulation resistance, cable route
                tests, photometric (BS 5266-1:2025 5-year check), commissioning records.
              </li>
              <li>
                <strong>As-built drawings.</strong> The complete pack reflecting the as-installed
                configuration, not the design intent. Updated at every modification.
              </li>
            </ul>
            <p>
              The pack is hand-over deliverable and a maintenance reference. The duty-holder retains
              it for the operational life of the installation. Inspectors, insurers, and
              post-incident investigators read it. Modifications must be reflected.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5266-1:2025 NEW high-risk rule: ≥ 2 separate emergency lighting circuits AND no single fault disabling more than 20 luminaires. Both halves apply.',
              'A 60-luminaire high-risk area must be split into ≥ 3 sub-zones of ≤ 20 luminaires each, on ≥ 2 circuits, with cable routes physically separate to avoid common-mode failure.',
              'BS 7671 §528.1 segregation: emergency lighting cables physically separated from non-safety circuits — separate trays, compartments, conduits, or maintained clearance.',
              'BS 7671 §560.10 acceptable supply sources: central battery (BS EN 50171:2021), generating set, primary cells, combinations. Supply must be independent of the normal supply.',
              'BS 7671 Reg 560.11 lockable, labelled isolator at every isolation point. Permanent engraved label "EMERGENCY LIGHTING — DO NOT SWITCH OFF". Sticky labels not acceptable.',
              'Fire-compartment penetrations require certified fire-stopping matching the wall/floor rating, the cable type, and the containment. Cable rating does not substitute for fire-stop.',
              'Class A topology = redundant paths, single-fault tolerant. Class B = single path. High-risk areas use Class A patterns; the 2025 rule essentially mandates this.',
              'Routing of redundant circuits: independent physical paths. Sharing a tray defeats the redundancy via common-mode failure.',
              '2025 documentation: zone plans, riser diagrams, cause-and-effect, cable schedule, fire-stopping log, isolator schedule, test certificates, as-built drawings.',
              'The supply to a central battery cabinet must be designed for independence — no upstream RCD that would trip on a downstream non-safety fault, dedicated DB way or separate sub-DB.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How do I know which areas in my building are "high-risk" for the 2025 rule?',
                answer:
                  'The risk assessment determines this — typically conducted by the system designer in consultation with the client and fire engineer. BS 5266-1:2025 defines high-risk task areas as those where (a) failure of emergency lighting could cause injury or significant harm during evacuation or task wind-down, or (b) complex processes require continued visibility for safe shut-down. Examples: industrial machinery rooms, laboratory hazard areas, kitchens with active cooking, control rooms, dense-occupant escape routes. Not every space is high-risk; the assessment is per-area, documented.',
              },
              {
                question: 'What if my high-risk area has fewer than 20 luminaires? Do I still need 2 circuits?',
                answer:
                  'Yes — the ≥ 2 circuits requirement is independent of the luminaire count. A 12-luminaire high-risk area still needs 2 circuits, with the 12 luminaires distributed across both. The 20-luminaire cap is the upper limit on how many luminaires any single fault can disable; if you only have 12, the cap is not the binding constraint, but the 2-circuit rule still is.',
              },
              {
                question: 'Can I use a single cable tray with internal partitions to run two redundant circuits?',
                answer:
                  'Possibly — BS 7671 §528.1 allows compartmented trunking with certified internal partitions to provide segregation. But for the 2025 high-risk redundancy purpose, a single tray (even partitioned) is typically not enough because mechanical damage to the tray itself could affect both compartments. Best practice for the 2025 rule is fully independent trays, on different routes, ideally on opposite sides of the room or different risers.',
              },
              {
                question: 'Why is a permanent engraved label required and not a sticky one?',
                answer:
                  'Sticky labels yellow, peel, get scuffed, get covered. After 18-24 months they are often illegible or missing entirely. The "EMERGENCY LIGHTING — DO NOT SWITCH OFF" warning has to be there for the life of the installation. Permanent engraved Traffolyte (or equivalent) screw-fixed remains legible for decades. The cost differential is a few pounds; the consequence of label failure is a maintenance contractor flipping the wrong switch and the system going dark for hours.',
              },
              {
                question: 'What is the difference between segregation (BS 7671 §528.1) and the 2025 high-risk rule?',
                answer:
                  '§528.1 segregation is between safety services and non-safety circuits — emergency lighting separated from general lighting / power / data. The 2025 high-risk rule is between two redundant emergency lighting circuits — ensuring the two safety paths are themselves physically separate. Both apply: emergency lighting is separated from non-safety (§528.1), and within emergency lighting the two circuits are separated from each other (BS 5266-1:2025).',
              },
              {
                question: 'How do I evidence fire-stopping at compartment penetrations?',
                answer:
                  'For each penetration: photo log entry showing the penetration before, during, and after fire-stopping; certificate reference for the fire-stop system used; manufacturer\'s installation instructions retained on file; date, installer, and location identifier; entry on the as-built drawings flagging the penetration. The pack is hand-over deliverable. Inspections check the physical work and the records.',
              },
              {
                question: 'Can I use the same cable tray for emergency lighting and a fire alarm circuit?',
                answer:
                  'Both are safety services; both need PH-rated cable; both are subject to BS 7671 §560 supply requirements and BS 5839 / BS 5266 application requirements. They CAN share certain containment (provided both are at the same fire-resistance category and the segregation between safety services is acceptable per the relevant codes), but careful design is needed because a fault on one could affect the other. Typically they are kept separate to maintain independence — separate trays or separate compartments.',
              },
              {
                question: 'What documentation does a duty-holder need to maintain over the operational life?',
                answer:
                  'The hand-over pack (zone plans, riser diagrams, cause-and-effect, cable schedules, fire-stopping log, isolator schedule, test certificates, as-built) PLUS ongoing test records (monthly functional, annual duration, 5-year photometric per 2025), fault log, modifications log, battery replacement records, and any incident investigation outputs. Together they form the operational record required by BS 5266-1:2025 and BS EN 50172:2024 for the operational life of the installation.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Circuit segregation and fire integrity — Module 4.4" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Remote testing and monitoring
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

export default EmergencyLightingModule4Section4;
