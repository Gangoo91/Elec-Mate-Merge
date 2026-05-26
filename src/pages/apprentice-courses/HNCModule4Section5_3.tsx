/**
 * Module 4 · Section 5 · Subsection 3 — Busbar Systems
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Rising mains, busbar trunking categories (lighting through high power), tap-off
 *   units (fused, MCB, MCCB), fire barriers at floor penetrations and BS EN 61439-6
 *   ratings (In, Icw, Ipk).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Busbar Systems - HNC Module 4 Section 5.3';
const DESCRIPTION =
  'Master busbar systems for building services: rising mains, busbar trunking, tap-off units, fire barriers, ratings and applications in commercial buildings.';

const quickCheckQuestions = [
  {
    id: 'rising-main',
    question: 'What is the primary advantage of a rising main busbar system over cable risers?',
    options: [
      '450mm from floor level (accessibility guidance)',
      'Unenforceable except where the payer is insolvent',
      'They are significantly reduced',
      'Easier tap-off connections at each floor',
    ],
    correctIndex: 3,
    explanation:
      'Rising mains allow standardised tap-off connections at each floor without the need to terminate heavy cables. This provides flexibility for future load changes and simplifies connections.',
  },
  {
    id: 'fire-barrier',
    question: 'How often must fire barriers be installed in vertical busbar risers?',
    options: [
      'Provide safe systems of work',
      'Investment-grade audit (Level 3)',
      'Multi-function power meter',
      'At each floor penetration',
    ],
    correctIndex: 3,
    explanation:
      'Fire barriers must be installed at each floor penetration to maintain the fire compartmentation of the building. This prevents fire and smoke spread through the riser void.',
  },
  {
    id: 'tap-off',
    question: 'What protection does a plug-in tap-off unit typically contain?',
    options: [
      'Earth fault protection only',
      'Surge protection only',
      'Fuse or circuit breaker',
      'No protection - connects directly',
    ],
    correctIndex: 2,
    explanation:
      'Tap-off units contain integral protection (fuse or MCB/MCCB) to protect the outgoing circuit. This provides isolation and overcurrent protection at the point of connection.',
  },
  {
    id: 'rating',
    question: 'A busbar system is rated at 1600A. What does this indicate?',
    options: [
      'Continuous current capacity',
      'Maximum fault current',
      'Peak current only',
      'Neutral current capacity',
    ],
    correctIndex: 0,
    explanation:
      'The busbar rating indicates the continuous current carrying capacity under specified conditions. This is the maximum sustained load current the system can carry without exceeding temperature limits.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is busbar trunking?',
    options: [
      'High-speed storage networking protocol commonly using fibre',
      'Prefabricated conductor system in protective housing',
      'Test date, next test date, and tester ID',
      'Where cables pass through fire-rated walls, floors and partitions',
    ],
    correctAnswer: 1,
    explanation:
      'Busbar trunking is a prefabricated power distribution system consisting of copper or aluminium conductors enclosed in a protective housing. It provides high-current distribution with easy tap-off capability.',
  },
  {
    id: 2,
    question:
      'Which type of busbar system is most commonly used for vertical distribution in multi-storey buildings?',
    options: [
      'Sandwich busbar',
      'Lighting trunking',
      'Rising main busbar',
      'Overhead busbar',
    ],
    correctAnswer: 2,
    explanation:
      'Rising main busbars run vertically through buildings, typically in dedicated risers, allowing floor-by-floor tap-off connections for distribution boards on each level.',
  },
  {
    id: 3,
    question: 'What is the purpose of a bus section unit in busbar systems?',
    options: [
      'To connect to transformers only',
      'To increase current capacity',
      'To reduce installation cost',
      'To provide isolation between sections',
    ],
    correctAnswer: 3,
    explanation:
      'Bus section units allow isolation of portions of the busbar run for maintenance or fault isolation without shutting down the entire system. They contain switches or circuit breakers.',
  },
  {
    id: 4,
    question: 'What conductor material is typically used for high-current busbar systems?',
    options: [
      'Copper or aluminium',
      'Steel only',
      'Bronze only',
      'Brass',
    ],
    correctAnswer: 0,
    explanation:
      'Copper and aluminium are used for busbar conductors. Copper has higher conductivity but aluminium is lighter and cheaper. Selection depends on current, space and cost requirements.',
  },
  {
    id: 5,
    question: 'Why must busbar joints be carefully torqued during installation?',
    options: [
      'One complete positive and negative alternation',
      'To ensure low-resistance connections and prevent overheating',
      'Fire hood or intumescent cover fitted where required',
      'Calculating optimal start times to reach target temperatures',
    ],
    correctAnswer: 1,
    explanation:
      'Properly torqued joints ensure good electrical contact, minimising resistance at the joint. Poor joints cause localised heating, which can lead to failure and fire.',
  },
  {
    id: 6,
    question: 'What is the typical application for lighting busbar trunking?',
    options: [
      'BRUKL (Building Regulations UK Part L)',
      'Logical sequence covering all relevant areas systematically',
      'Feeding multiple luminaires along a linear run',
      'They vary with the square of the load current (I squared R)',
    ],
    correctAnswer: 2,
    explanation:
      "Lighting trunking provides a continuous supply along its length with multiple tap-off points for luminaires. It's commonly used in warehouses, retail and industrial lighting installations.",
  },
  {
    id: 7,
    question: 'What protection is required where busbar trunking passes through fire barriers?',
    options: [
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Annually or when systems change significantly',
      'The bill of quantities or material schedule',
      'Fire-rated collars or seals to maintain compartmentation',
    ],
    correctAnswer: 3,
    explanation:
      'Fire barriers around busbar penetrations must maintain the fire rating of the compartment. Purpose-made fire-rated collars or intumescent seals are used to close gaps when fire occurs.',
  },
  {
    id: 8,
    question: 'What is the advantage of sandwich-type busbar construction?',
    options: [
      'Compact size with good heat dissipation',
      'A competent person scheme for electrical work',
      'Annually or as per manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s recommendations',
      'Failed battery or charging circuit fault',
    ],
    correctAnswer: 0,
    explanation:
      'Sandwich construction places conductors close together separated by insulation, providing compact dimensions and good natural heat dissipation through the enclosure surface.',
  },
  {
    id: 9,
    question: 'How are tap-off units typically connected to busbar trunking?',
    options: [
      '4mA baseline allows fault detection',
      'Plug-in connection through access opening',
      'Individual room temperature control',
      'Process material adhering to sensor surfaces',
    ],
    correctAnswer: 1,
    explanation:
      'Plug-in tap-off units connect through dedicated access openings in the busbar housing. Spring-loaded contacts ensure reliable connection, and units can be added or moved without system shutdown.',
  },
  {
    id: 10,
    question:
      'What derating factor must be considered for busbar systems at elevated ambient temperatures?',
    options: [
      'Initial verification (inspection and testing)',
      'Life safety and emergency systems',
      'Reduced rating per manufacturer data',
      'At least 3 out of 4 faults',
    ],
    correctAnswer: 2,
    explanation:
      'Busbar ratings are specified at standard ambient temperature (typically 35°C). Higher ambients require derating to prevent conductor temperature exceeding design limits - manufacturer tables provide factors.',
  },
];

const faqs = [
  {
    question: 'When should I specify busbar trunking instead of cables?',
    answer:
      'Consider busbar trunking when: current exceeds 400-600A (where multiple parallel cables become unwieldy), flexible tap-off is needed along the route, future load changes are likely, or installation time is critical. For straight runs with high current, busbar is often more economical than parallel cables.',
  },
  {
    question: 'How do I size a rising main busbar system?',
    answer:
      'Calculate the maximum demand at the base of the riser (sum of all floor loads with diversity). Select busbar rated for this current plus 20-30% growth margin. Verify voltage drop along the full length is acceptable. Consider tap-off unit ratings for each floor connection.',
  },
  {
    question: 'What maintenance do busbar systems require?',
    answer:
      'Annual thermal imaging of joints and connections to detect hot spots. Periodic torque checks on bolted connections. Inspection of tap-off units and fire barriers. Cleaning of enclosure ventilation openings. Check for signs of overheating, corrosion or mechanical damage.',
  },
  {
    question: 'Can busbar trunking be installed outdoors?',
    answer:
      'Yes, with appropriate IP rating (IP65 minimum for exposed outdoor locations). External busbars need protection against UV, temperature extremes and moisture. Thermal expansion joints are essential for long outdoor runs. Weatherproof tap-off units must be specified.',
  },
  {
    question: 'What is the difference between IP55 and IP65 rated busbar?',
    answer:
      'IP55 is dust-protected and protected against water jets - suitable for covered outdoor or industrial indoor locations. IP65 is dust-tight and protected against water jets - required for fully exposed outdoor installations or harsh wash-down environments.',
  },
];

const HNCModule4Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 3"
            title="Busbar Systems"
            description="High-current distribution solutions for commercial and industrial building services."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand rising main applications in multi-storey buildings',
              'Specify busbar trunking for different current requirements',
              'Select appropriate tap-off units with correct protection',
              'Apply fire barrier requirements at compartment penetrations',
              'Determine busbar ratings with derating factors',
              'Compare busbar versus cable solutions for different applications',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Busbar trunking (BS EN 61439-6) gives you a flexible, high-current vertical or horizontal distribution spine — typical ratings 100 A to 6,300 A.',
              'Tap-off units (TOUs) are the per-floor branches: each TOU contains its own MCCB or fused isolator, mechanical interlock against live insertion, and IP protection.',
              'Fire compartment penetrations need a tested fire barrier (BS EN 1366-3) at every floor — usually a manufacturer-supplied intumescent block, not site-fabricated mortar.',
              'Derating: ambient ≥ 35 °C, vertical orientation, grouped trunking, harmonic content (esp. third) all reduce the rated continuous current. Read the manufacturer’s tables.',
              'Busbar wins over cable on long high-current runs (lower voltage drop, smaller riser footprint, faster install). Cable wins for low-current branches and one-off feeds.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
            meaning={
              <>
                Busbar trunking is a type-tested assembly under BS EN 61439-6. Reg 510.3 means
                that the BS EN compliance only protects you if the install follows the
                manufacturer’s instructions exactly — joint torques, fire barrier products,
                expansion-joint spacing, support intervals, ambient/derating curves. Site
                substitutions of fire barriers or tap-off units invalidate the type test and
                shift fault liability onto the designer who allowed it.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 510.3."
          />

          <SectionRule />

          <ConceptBlock title="Rising Mains">
            <p>
              Rising mains provide vertical power distribution in multi-storey buildings. They run
              from the main switchroom through dedicated risers, with tap-off points at each floor
              for connection to floor distribution boards.
            </p>
            <p>
              <strong>Advantages of rising main systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standardised floor connections simplify installation</li>
              <li>Easy to add or modify floor connections</li>
              <li>Reduced cable congestion compared to multiple cable runs</li>
              <li>Lower voltage drop than equivalent cable systems</li>
              <li>Factory-tested components ensure quality</li>
            </ul>
            <p>
              <strong>Rising main system components (component / function / location):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Feed unit:</strong> Connects to main switchboard — base of riser
              </li>
              <li>
                <strong>Straight lengths:</strong> Conduct power vertically — throughout riser
              </li>
              <li>
                <strong>Tap-off boxes:</strong> Floor connection points — each floor level
              </li>
              <li>
                <strong>Fire barriers:</strong> Maintain fire compartmentation — each floor slab
              </li>
              <li>
                <strong>Support brackets:</strong> Carry weight, allow expansion — typically every
                2-3m
              </li>
              <li>
                <strong>End cap:</strong> Terminates system safely — top of riser
              </li>
            </ul>
            <p>
              <strong>Design tip:</strong> Size rising mains for the maximum demand at the base plus
              25% growth allowance. Voltage drop is cumulative up the riser.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Busbar Trunking Types">
            <p>
              Busbar trunking systems are manufactured for different current ranges and
              applications. Understanding the types enables correct specification for each project
              requirement.
            </p>
            <p>
              <strong>Busbar trunking categories (type / current range / typical applications):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting trunking — 25A - 63A — warehouse, retail lighting</li>
              <li>Low power trunking — 40A - 160A — office floor distribution</li>
              <li>Medium power trunking — 160A - 1000A — rising mains, sub-distribution</li>
              <li>High power trunking — 1000A - 6300A — main distribution, data centres</li>
              <li>Cast resin busbar — up to 6300A — transformer connections, harsh environments</li>
            </ul>
            <p>
              <strong>Conductor materials:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper:</strong> Higher conductivity, compact size
              </li>
              <li>
                <strong>Aluminium:</strong> Lighter weight, lower cost
              </li>
              <li>Copper typically 30% smaller for same current</li>
              <li>Aluminium typically 40% lighter for same rating</li>
            </ul>
            <p>
              <strong>Construction types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sandwich:</strong> Close-spaced conductors, compact
              </li>
              <li>
                <strong>Edge-mounted:</strong> Conductors on edge for ventilation
              </li>
              <li>
                <strong>Ventilated:</strong> Openings for natural cooling
              </li>
              <li>
                <strong>Enclosed:</strong> Sealed for IP protection
              </li>
            </ul>
            <p>
              <strong>Selection criteria:</strong> Consider current rating, voltage drop, available
              space, IP requirement, cost and availability of tap-off units.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Tap-Off Units">
            <p>
              Tap-off units provide connection points from busbar trunking to outgoing circuits.
              They contain protection devices and allow connection without system shutdown in many
              cases.
            </p>
            <p>
              <strong>Tap-off unit types (type / protection / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fused tap-off — HRC fuses (BS 88) — standard distribution connections</li>
              <li>MCB tap-off — miniature circuit breaker — light loads, frequent operation</li>
              <li>MCCB tap-off — moulded case circuit breaker — higher currents, adjustable</li>
              <li>Direct tap-off — none (protection elsewhere) — switchboard connections</li>
              <li>Lighting tap-off — MCB or fuse — individual luminaire connection</li>
            </ul>
            <p>
              <strong>Plug-in connection process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open tap-off access cover on busbar housing</li>
              <li>Ensure tap-off unit switch/breaker is OFF</li>
              <li>Insert tap-off unit into busbar contacts</li>
              <li>Secure unit with locking mechanism</li>
              <li>Close access cover and seal</li>
              <li>Connect outgoing cable and close tap-off cover</li>
              <li>Switch on and test</li>
            </ul>
            <p>
              <strong>Safety note:</strong> Many tap-off operations can be done live, but always
              follow manufacturer instructions and site safety procedures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Fire Barriers and System Ratings">
            <p>
              Busbar systems must maintain building fire compartmentation and be rated appropriately
              for continuous and fault current conditions. Fire barrier details are critical for
              building regulation compliance.
            </p>
            <p>
              <strong>Fire barrier requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire barriers required at each compartment penetration</li>
              <li>
                Must match the fire rating of the penetrated element (typically 60-120 minutes)
              </li>
              <li>Use manufacturer-approved fire barrier systems</li>
              <li>Intumescent materials expand when heated to seal gaps</li>
              <li>Fire barriers must be inspected and certified</li>
            </ul>
            <p>
              <strong>Busbar system ratings (rating / symbol / significance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rated current (In):</strong> Maximum continuous current
              </li>
              <li>
                <strong>Short-time withstand (Icw):</strong> Fault current for 1 second
              </li>
              <li>
                <strong>Peak withstand (Ipk):</strong> Maximum instantaneous current
              </li>
              <li>
                <strong>Rated voltage (Un):</strong> Maximum operating voltage
              </li>
              <li>
                <strong>Voltage drop (mV/A/m):</strong> Drop per amp per metre
              </li>
            </ul>
            <p>
              <strong>Derating factors — current ratings must be derated for:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ambient temperature above 35°C (0.95 at 40°C, 0.90 at 45°C typically)</li>
              <li>Altitude above 2000m</li>
              <li>Restricted ventilation</li>
              <li>Harmonic content above 15%</li>
            </ul>
            <p>
              <strong>Coordination:</strong> Ensure busbar Icw rating exceeds the let-through energy
              (I²t) of upstream protective devices to survive downstream faults.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — rising main sizing:</strong> 8-storey office building with 80kVA
              per floor. Size the rising main.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total load: 8 floors × 80kVA = 640kVA</li>
              <li>Apply diversity (0.8): 640 × 0.8 = 512kVA</li>
              <li>Current at 400V: 512000 ÷ (√3 × 400) = 739A</li>
              <li>Add 25% growth: 739 × 1.25 = 924A</li>
              <li>
                Specification: <strong>1000A rising main busbar</strong>
              </li>
              <li>Verify voltage drop at top floor</li>
            </ul>
            <p>
              <strong>Example 2 — voltage drop check:</strong> 1000A busbar, 35m height, 800A load
              at top floor. Busbar: 0.017 mV/A/m.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage drop = Current × Length × Drop factor</li>
              <li>Vd = 800A × 35m × 0.017 mV/A/m</li>
              <li>Vd = 476mV = 0.476V per phase</li>
              <li>
                As percentage of 230V: (0.476 ÷ 230) × 100 = <strong>0.21%</strong>
              </li>
              <li>Well within 5% limit — acceptable</li>
            </ul>
            <p>
              <strong>Example 3 — tap-off unit selection:</strong> Floor DB with 63A maximum demand.
              Select tap-off protection.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load current: 63A</li>
              <li>Tap-off rating: Next standard size = 80A</li>
              <li>80A HRC fuses (BS 88-2) — high breaking capacity</li>
              <li>80A MCCB — adjustable, resettable</li>
              <li>
                Recommendation: <strong>80A MCCB tap-off unit</strong> — allows easy resetting and
                adjustment
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Installation considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allow for thermal expansion in long runs (expansion joints)</li>
              <li>Support brackets at manufacturer-specified intervals</li>
              <li>Maintain ventilation clearances around enclosure</li>
              <li>Torque all joints to manufacturer specification</li>
              <li>Earth bonding at each section joint</li>
            </ul>
            <p>
              <strong>Specification checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated current with appropriate margin</li>
              <li>Short-circuit ratings matching system PFC</li>
              <li>IP rating for environment</li>
              <li>Conductor material (copper/aluminium)</li>
              <li>Number and rating of tap-off positions</li>
              <li>Fire barrier details and certification</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61439-6</strong> — busbar trunking
              </li>
              <li>
                <strong>BS 88</strong> — HRC fuses
              </li>
              <li>
                <strong>Building Regulations</strong> — fire barriers
              </li>
              <li>
                <strong>BS 7671</strong> — installation
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common installation errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Improper joint torque</strong> — causes hot spots and failures
                </li>
                <li>
                  <strong>Missing fire barriers</strong> — building regulation breach
                </li>
                <li>
                  <strong>Blocked ventilation</strong> — leads to overheating
                </li>
                <li>
                  <strong>No expansion provision</strong> — causes mechanical stress
                </li>
              </ul>
            }
            doInstead="Torque every joint to the manufacturer's value and confirm with thermal imaging at handover, certify a fire barrier at every floor penetration, keep ventilation clearances clear, and design in expansion joints for long runs and outdoor sections."
          />

          <SectionRule />

          <Scenario
            title="800 A rising main on a 6-storey office — sizing and tap-offs"
            situation={
              <>
                Six-storey commercial office, 1,200 m² per floor. Per-floor maximum demand 105 A
                three-phase after diversity. Riser shaft is 600 mm × 800 mm, naturally ventilated,
                ambient peaks 32 °C in summer. You’re pricing busbar versus parallel SWA cables
                with the QS today.
              </>
            }
            whatToDo={
              <>
                Total demand 6 × 105 A = 630 A. Apply 80 % diversity for non-coincident floor
                peaks → 504 A design load. Specify an 800 A 4-pole busbar trunking (BS EN 61439-6)
                with 25 % spare for future fit-out. Vertical orientation derating: typical 0.95
                factor. Ambient 32 °C: factor 1.0 (no derating below 35 °C). Net 760 A continuous
                — ample. Tap-off unit per floor: 160 A 4-pole MCCB with mechanical interlock,
                IP4X. Fire barrier per manufacturer (BS EN 1366-3 tested) at every floor slab.
                Specify two expansion joints in the run (one per 12 m as guidance). Joint torque
                values + thermographic survey at handover written into the spec. Compare against
                4× 240 mm² SWA in parallel — busbar wins on shaft footprint and install time, even
                if material cost is similar. Reg 510.3 in the spec narrative.
              </>
            }
            whyItMatters={
              <>
                A site-fabricated fire barrier round a busbar joint won’t pass a building control
                handover sign-off and could compromise compartmentation under a fire. A
                non-torqued joint runs hot, fails after 18 months and takes the building offline.
                Specify properly, sign off properly.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 61439-6 governs busbar trunking — it’s a type-tested assembly, not just a conductor.',
              'Tap-off units provide per-floor branches with their own protection, interlocks and IP rating.',
              'Fire barriers at compartment penetrations must be manufacturer-supplied and BS EN 1366-3 tested.',
              'Derate for orientation (vertical 0.95), ambient (above 35 °C), grouping and harmonic content.',
              'Joint torques are critical — mandate the manufacturer’s value plus a thermographic survey at handover.',
              'Expansion joints every ~12 m vertical and at building movement joints — copper grows with temperature.',
              'Busbar versus parallel SWA cables: busbar wins on long, high-current, expandable risers.',
              'Reg 510.3 binds the type-test certificate to the manufacturer’s install instructions — site deviations invalidate the test.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Distribution board design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                UPS and standby power
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_3;
