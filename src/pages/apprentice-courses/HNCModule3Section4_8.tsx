/**
 * Module 3 · Section 4 · Subsection 8 — Applications in Building Distribution Boards
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The complete BSE distribution-board specification — busbars, Forms of separation
 *   (BS EN 61439), SPDs (BS 7671 443), metering, panel scheduling. The integration
 *   exercise that ties every prior concept together on a real project.
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

const TITLE = 'Applications in Building Distribution Boards - HNC Module 3 Section 4.8';
const DESCRIPTION =
  'Comprehensive guide to three-phase distribution board design, busbar systems, forms of separation, surge protection, metering and panel scheduling for building services.';

const quickCheckQuestions = [
  {
    id: 'form-separation',
    question:
      'Which Form of separation provides compartmentalisation of functional units AND their terminals?',
    options: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
    correctIndex: 3,
    explanation:
      'Form 4 provides the highest level of separation with compartmentalised functional units AND segregated terminals. Form 3 has compartmentalised units but shared terminal spaces.',
  },
  {
    id: 'spd-type',
    question: 'Which SPD Type is typically installed at the main intake?',
    options: ['Type 1 (Class I)', 'Type 2 (Class II)', 'Type 3 (Class III)', 'Type 1+2 combined'],
    correctIndex: 0,
    explanation:
      'Type 1 SPDs are installed at the origin of the installation to handle direct lightning strikes. Type 2 is for sub-distribution, and Type 3 for final circuits near sensitive equipment.',
  },
  {
    id: 'busbar-rating',
    question:
      'A 400A main busbar supplies three 100A outgoing ways. What is the minimum busbar rating for the outgoing section?',
    options: ['100A', '200A', '300A', '400A'],
    correctIndex: 2,
    explanation:
      'The outgoing busbar section must be rated for the maximum possible load. With three 100A ways, diversity would typically allow 300A (or less), but engineering judgement and actual load analysis is required.',
  },
  {
    id: 'phase-rotation',
    question: 'In a UK three-phase system, what is the standard phase rotation?',
    options: [
      'L1-L2-L3 (clockwise)',
      'L3-L2-L1 (anti-clockwise)',
      'L1-L3-L2',
      'Any rotation is acceptable',
    ],
    correctIndex: 0,
    explanation:
      'The UK standard phase rotation is L1-L2-L3 in clockwise sequence (positive sequence). This is critical for motor rotation direction and three-phase equipment operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of busbar segregation in distribution boards?',
    options: [
      'To reduce installation cost',
      'To allow maintenance without total shutdown',
      'To increase current capacity',
      'To improve aesthetics',
    ],
    correctAnswer: 1,
    explanation:
      'Busbar segregation allows maintenance and modifications to be carried out on individual circuits whilst other circuits remain live, improving operational continuity and safety.',
  },
  {
    id: 2,
    question: 'According to BS EN 61439, what does IP rating XXB indicate?',
    options: [
      'Protection against dust ingress',
      'Protection against finger contact with live parts',
      'Protection against water spray',
      'Protection against mechanical impact',
    ],
    correctAnswer: 1,
    explanation:
      'The B designation in IP ratings (e.g., IP2XB) indicates protection against access to hazardous parts using an articulated test finger (12mm diameter, 80mm length).',
  },
  {
    id: 3,
    question: 'In a TN-C-S system, where should the main earthing terminal (MET) be located?',
    options: [
      'At the furthest point from the intake',
      'Adjacent to the main distribution board',
      'At each sub-distribution board',
      'External to the building',
    ],
    correctAnswer: 1,
    explanation:
      'The MET should be located as close as practicable to the main distribution board and incoming supply. It provides the single point of connection for all earthing and bonding conductors.',
  },
  {
    id: 4,
    question:
      'What is the maximum disconnection time for a Type B MCB on a 230V final circuit exceeding 32A?',
    options: ['0.1s', '0.2s', '0.4s', '5s'],
    correctAnswer: 2,
    explanation:
      'For TN systems with circuits exceeding 32A (but not >32A socket outlets), BS 7671 permits a maximum disconnection time of 0.4s. Final circuits ≤32A require 0.4s, and socket outlets >32A require 0.2s.',
  },
  {
    id: 5,
    question: 'Which distribution system type uses separate transformers for critical loads?',
    options: ['Type A', 'Type B', 'Type C', 'Type D'],
    correctAnswer: 1,
    explanation:
      'Type B distribution systems use independent transformers to supply critical and non-critical loads separately, providing enhanced resilience and power quality isolation.',
  },
  {
    id: 6,
    question:
      'A building has 150kVA of lighting (L1), 180kVA of small power (L2), and 200kVA of mechanical services (L3). What is the phase imbalance?',
    options: ['10%', '14%', '18%', '25%'],
    correctAnswer: 1,
    explanation:
      'Average load = (150+180+200)/3 = 176.7kVA. Maximum deviation = 200-176.7 = 23.3kVA. Imbalance = (23.3/176.7) × 100 = 13.2% ≈ 14%',
  },
  {
    id: 7,
    question: 'What SPD residual current (Ires) indicates the device needs replacement?',
    options: [
      'Any visible Ires',
      'Ires > 1mA',
      'When indicator shows fault',
      'When Imax is exceeded',
    ],
    correctAnswer: 2,
    explanation:
      'SPDs have status indicators (mechanical or electronic) that show when the device has operated beyond its limits. The device should be replaced when the indicator shows a fault condition.',
  },
  {
    id: 8,
    question: 'In Form 3b construction, what is segregated?',
    options: [
      'Busbars only',
      'Functional units from busbars',
      'Functional units, busbars, and terminals from each other',
      'Functional units and terminals, but busbars are common',
    ],
    correctAnswer: 2,
    explanation:
      'Form 3b provides separation of functional units from each other, separation of functional units from busbars, but terminals are not separated from the functional units they serve.',
  },
  {
    id: 9,
    question: 'What is the purpose of a Type Test Certificate for distribution boards?',
    options: [
      'To verify installation correctness',
      'To confirm the design meets BS EN 61439',
      'To record commissioning results',
      'To satisfy the DNO requirements',
    ],
    correctAnswer: 1,
    explanation:
      'A Type Test Certificate demonstrates that the distribution board design has been tested to BS EN 61439 standards, including temperature rise, dielectric properties, and short-circuit withstand capability.',
  },
  {
    id: 10,
    question: 'What information must be included on a panel schedule for each circuit?',
    options: [
      'Circuit number, description, and cable size only',
      'Circuit number, protective device rating, cable size, and load',
      'Circuit number, protective device rating, cable size, load, and design current',
      'All of the above plus phase allocation and route',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive panel schedule includes circuit number, description, protective device details, cable size, design current, connected load, phase allocation, cable route, and reference to the as-built drawings.',
  },
];

const faqs = [
  {
    question: 'What is the difference between Form 2 and Form 3 separation?',
    answer:
      'Form 2 provides separation of busbars from functional units (e.g., MCBs behind a busbar cover), whereas Form 3 adds compartmentalisation between functional units themselves. Form 3 is common in main switchboards where individual sections may need isolation for maintenance whilst adjacent sections remain live.',
  },
  {
    question: 'Why is phase rotation important in three-phase distribution?',
    answer:
      'Phase rotation (sequence) determines the direction of rotation for three-phase motors and must be consistent throughout an installation. Incorrect phase sequence can cause motors to run backwards, pumps to operate in reverse, or protection relays to malfunction. UK standard is L1-L2-L3 clockwise (positive sequence).',
  },
  {
    question: 'When are Type 1 SPDs mandatory under BS 7671?',
    answer:
      'Type 1 SPDs are required when the building is supplied by or incorporates overhead lines exposed to direct lightning strikes. This includes rural installations, buildings with external antenna masts, and structures where lightning protection systems (LPS) are installed. BS 7671:2018+A4:2026 also requires risk assessment for all installations.',
  },
  {
    question: 'How do I calculate the required busbar rating for a distribution board?',
    answer:
      'Busbar rating must consider: (1) Maximum design current including future capacity, (2) Diversity factors per BS 7671 Appendix 1, (3) Temperature rise limits from BS EN 61439, (4) Short-circuit withstand (Icw) matching the prospective fault current, and (5) Harmonic current effects (multiply neutral by 1.45 for LED/IT loads).',
  },
  {
    question: 'What documentation is required for a new distribution board installation?',
    answer:
      'Required documentation includes: Panel schedule with all circuit details, single-line diagram, as-built drawings, Type Test Certificate or Design Verification, Routine Test Certificate, BS 7671 Schedule of Inspections, Schedule of Test Results, Electrical Installation Certificate, and operation/maintenance manual.',
  },
  {
    question: 'How should phase allocation be determined for load balancing?',
    answer:
      'Phase allocation should aim for equal loading across all three phases. Group similar loads (lighting, small power, mechanical) and distribute across phases. Monitor actual consumption post-installation and re-allocate if imbalance exceeds 10-15%. Record allocations on panel schedules and as-built drawings for future modifications.',
  },
];

const HNCModule3Section4_8 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 8"
            title="Applications in Building Distribution Boards"
            description="Practical design and installation of three-phase distribution systems for commercial and industrial buildings"
            tone="purple"
          />

          <TLDR
            points={[
              'You specify distribution boards by Form of separation (BS EN 61439-1) — Form 4 (Type 7) for critical / public access boards, Form 2 acceptable for plantroom / staff-only boards.',
              'You apply BS 7671 A4:2026 SPD requirements (Reg 443) — Type 1+2 SPD at the origin of every installation; Type 2 at sub-boards in long-cable / high-CRL areas.',
              'You design phase allocation and neutral sizing into the panel schedule — distribution-board overheating in service is almost always a design omission, not an install fault.',
              'You document maximum demand, Zs at each device, and discrimination assessment on the as-built panel schedule — required for the EICR and the building&rsquo;s log book.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 443.4 (Risk assessment for protection against transient overvoltages of atmospheric origin or due to switching)"
            clause="Protection against transient overvoltages shall be provided where the consequence caused by overvoltage affects: (a) human life (e.g. medical safety services, life support), (b) public services and cultural heritage, (c) commercial or industrial activity, or (d) a large number of co-located individuals."
            meaning={
              <>
                BS 7671 A4:2026 made SPD provision the default for all but the simplest
                domestic installations. As the BSE designer of every commercial /
                industrial / public-access distribution board you must conduct the
                Reg 443.4 risk assessment, document the outcome, and specify SPDs to
                BS EN 61643-11 (Type 1 + 2 at the origin, Type 2 at sub-boards in
                long-cable runs). Failure to do so leaves the building&rsquo;s electronics
                exposed to switching and atmospheric transients with insurance and
                product-liability consequences.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 443.4 + Section 534; BS EN 61439-1/-2 (low-voltage switchgear assemblies, Forms of separation); BS EN 61643-11 (SPDs)"
          />

          <LearningOutcomes
            outcomes={[
              'Explain three-phase distribution board construction and components',
              'Apply busbar ratings and coordination principles',
              'Implement phase allocation strategies for load balancing',
              'Distinguish between Type A, B, and C distribution systems',
              'Specify and coordinate surge protection devices (SPDs)',
              'Interpret Forms of separation (Form 1-4) per BS EN 61439',
              'Design metering and monitoring arrangements',
              'Prepare comprehensive panel schedules and as-built documentation',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Distribution boards house busbars, protection, metering and SPDs — designed to BS EN 61439 with the right Form of separation and proper documentation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Distribution boards:</strong> Control and distribute power throughout
                buildings
              </li>
              <li>
                <strong>Forms 1-4:</strong> Levels of internal segregation per BS EN 61439
              </li>
              <li>
                <strong>SPDs:</strong> Types 1, 2, 3 for coordinated surge protection
              </li>
              <li>
                <strong>Panel schedules:</strong> Essential as-built documentation
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main switchboard:</strong> Intake, metering, main protection
              </li>
              <li>
                <strong>Sub-distribution:</strong> Floor/zone boards, final circuits
              </li>
              <li>
                <strong>Load balancing:</strong> Phase allocation for efficiency
              </li>
              <li>
                <strong>Documentation:</strong> Schedules, diagrams, O&amp;M manuals
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Three-Phase Distribution Board Construction">
            <p>
              Modern distribution boards are the nerve centres of building electrical systems,
              housing protection, switching, metering, and increasingly, intelligent monitoring
              equipment. Understanding their construction is essential for specification,
              installation, and maintenance.
            </p>
            <p className="text-sm font-medium text-white">Key Components</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Enclosure:</strong> Sheet steel or GRP, rated for environment (IP rating)
              </li>
              <li>
                <strong>Busbars:</strong> Copper or aluminium conductors for power distribution
              </li>
              <li>
                <strong>Main switch/isolator:</strong> Incoming supply control and isolation
              </li>
              <li>
                <strong>Protective devices:</strong> MCBs, MCCBs, RCDs, RCBOs
              </li>
              <li>
                <strong>Metering:</strong> kWh meters, power analysers, CT chambers
              </li>
              <li>
                <strong>Surge protection:</strong> SPDs coordinated with protective devices
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Distribution Board Types</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main LV Switchboard (MSB):</strong> 800A - 4000A — building intake, utility
                metering
              </li>
              <li>
                <strong>Sub-Main Distribution Board:</strong> 100A - 800A — floor/zone distribution
              </li>
              <li>
                <strong>Final Distribution Board:</strong> 63A - 250A — final circuits to loads
              </li>
              <li>
                <strong>Motor Control Centre (MCC):</strong> Variable — HVAC, lifts, pumps
              </li>
              <li>
                <strong>Essential Services Board:</strong> Variable — generator/UPS backed supplies
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">BS EN 61439 Requirements</p>
            <p>
              All low-voltage switchgear assemblies must comply with BS EN 61439-1 (general rules)
              and BS EN 61439-2 (power switchgear). Key requirements include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated operational voltage (Ue): 400V AC for three-phase</li>
              <li>Rated current (In): Main busbar and outgoing ways</li>
              <li>
                Short-circuit withstand (Icw): Must exceed prospective fault current
              </li>
              <li>IP rating: Minimum IP2X for finger protection</li>
              <li>Temperature rise limits: Maximum 70K at terminals</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Distribution boards must be accessible for operation and
              maintenance. Allow minimum 600mm clear space in front, 1000mm for boards over 200A.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Busbar Systems and Ratings">
            <p>
              Busbars are the backbone of any distribution system, conducting power from the
              incoming supply to outgoing protective devices. Their design determines the board's
              current-carrying capacity, short-circuit withstand capability, and thermal performance.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Busbar Materials</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper (Cu):</strong> Higher conductivity, compact, industry standard
              </li>
              <li>
                <strong>Aluminium (Al):</strong> Lighter, cheaper, larger cross-section needed
              </li>
              <li>
                <strong>Plating:</strong> Tin or silver for contact surfaces
              </li>
              <li>
                <strong>Insulation:</strong> Heat-shrink sleeves or moulded covers
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Current Capacity Factors</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cross-sectional area:</strong> Larger = higher capacity
              </li>
              <li>
                <strong>Ambient temperature:</strong> Derate above 35°C
              </li>
              <li>
                <strong>Enclosure ventilation:</strong> Natural or forced cooling
              </li>
              <li>
                <strong>Proximity:</strong> Adjacent busbars reduce capacity
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Copper Busbar Ratings (Natural Cooling, 35°C Ambient)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 × 5 (100mm²):</strong> DC/1φ 230A — 3φ 200A
              </li>
              <li>
                <strong>25 × 5 (125mm²):</strong> DC/1φ 275A — 3φ 245A
              </li>
              <li>
                <strong>30 × 5 (150mm²):</strong> DC/1φ 325A — 3φ 290A
              </li>
              <li>
                <strong>40 × 5 (200mm²):</strong> DC/1φ 415A — 3φ 370A
              </li>
              <li>
                <strong>50 × 6 (300mm²):</strong> DC/1φ 575A — 3φ 515A
              </li>
              <li>
                <strong>60 × 6 (360mm²):</strong> DC/1φ 665A — 3φ 595A
              </li>
              <li>
                <strong>80 × 6 (480mm²):</strong> DC/1φ 845A — 3φ 755A
              </li>
              <li>
                <strong>100 × 10 (1000mm²):</strong> DC/1φ 1500A — 3φ 1340A
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Neutral Busbar Sizing</p>
            <p>
              For balanced three-phase loads, the neutral carries minimal current. However, with
              high harmonic content from LED lighting, IT equipment, and VFDs, triplen harmonics
              (3rd, 9th, 15th) add in the neutral conductor. BS 7671 recommends:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>THD &lt; 33%:</strong> Neutral = Phase size
              </li>
              <li>
                <strong>THD 33-45%:</strong> Neutral = 1.45 × Phase size
              </li>
              <li>
                <strong>THD &gt; 45%:</strong> Detailed harmonic analysis required
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always verify short-circuit withstand (Icw) rating. A
              400A busbar may have Icw of 25kA for 1 second - this must exceed the prospective
              fault current at the installation point.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Phase Allocation and Load Balancing">
            <p>
              Effective phase allocation ensures balanced loading across all three phases,
              minimising neutral current, reducing losses, and preventing voltage imbalance that can
              damage three-phase equipment.
            </p>
            <p className="text-sm font-medium text-white">Why Balance Matters</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reduced neutral current:</strong> Balanced loads cancel in neutral
              </li>
              <li>
                <strong>Lower losses:</strong> I²R losses minimised across system
              </li>
              <li>
                <strong>Voltage stability:</strong> Equal voltage drop on all phases
              </li>
              <li>
                <strong>Motor protection:</strong> Imbalance causes heating in 3φ motors
              </li>
              <li>
                <strong>Transformer efficiency:</strong> Balanced loading optimises capacity
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phase Allocation Strategy</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting:</strong> Typical phase L1 — largest continuous load, predictable
              </li>
              <li>
                <strong>Small power (sockets):</strong> Typical phase L2 — variable load, high
                diversity
              </li>
              <li>
                <strong>Mechanical services:</strong> Typical phase L3 — motors, pumps, fans (often
                3φ)
              </li>
              <li>
                <strong>Lifts:</strong> L1-L2-L3 — three-phase balanced load
              </li>
              <li>
                <strong>Kitchen equipment:</strong> Distributed — high load, requires spreading
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Calculating Phase Imbalance</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average load = (IL1 + IL2 + IL3) / 3</li>
              <li>Maximum deviation = Max(|ILn - Average|)</li>
              <li>Imbalance (%) = (Maximum deviation / Average) × 100</li>
              <li>Target: Keep imbalance below 10-15%</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Worked Example: Office Building Phase Allocation
            </p>
            <p>
              <strong>Given loads:</strong> Lighting 45kVA, Small power 60kVA, HVAC 75kVA (3φ)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Option 1 - Poor allocation:</strong></li>
              <li>L1: 45kVA (lighting) = 45kVA</li>
              <li>L2: 60kVA (small power) = 60kVA</li>
              <li>L3: 25kVA (1/3 HVAC) = 25kVA</li>
              <li>→ Average: 43.3kVA, Max deviation: 16.7kVA (38.5% imbalance)</li>
              <li><strong>Option 2 - Better allocation:</strong></li>
              <li>L1: 15kVA lighting + 25kVA HVAC = 40kVA</li>
              <li>L2: 15kVA lighting + 25kVA HVAC + 10kVA SP = 50kVA</li>
              <li>L3: 15kVA lighting + 25kVA HVAC + 50kVA SP = 90kVA</li>
              <li>→ Still poor - need to split small power</li>
              <li><strong>Option 3 - Optimal allocation:</strong></li>
              <li>L1: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</li>
              <li>L2: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</li>
              <li>L3: 15kVA lighting + 25kVA HVAC + 20kVA SP = 60kVA</li>
              <li>→ Perfectly balanced (0% imbalance)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Perfect balance is theoretical. Real-world loads
              vary continuously. Design for reasonable balance at maximum demand, then monitor and
              adjust post-commissioning.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Type A, B, C Distribution Systems">
            <p>
              The choice of distribution system architecture affects resilience, power quality, and
              cost. Three main topologies are commonly used in building services, each with distinct
              characteristics.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Type A — Radial Distribution</p>
            <p>
              <strong>Configuration:</strong> Single source feeds all loads through individual
              radial circuits.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simplest and most economical topology</li>
              <li>Single point of failure at source</li>
              <li>Suitable for non-critical installations</li>
              <li>Easy fault location and isolation</li>
              <li>Application: Standard offices, retail, residential</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Type B — Duplicate/Parallel Sources
            </p>
            <p>
              <strong>Configuration:</strong> Two independent sources (transformers) with automatic
              changeover.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Enhanced resilience through source redundancy</li>
              <li>Automatic transfer switch (ATS) between sources</li>
              <li>Critical loads can be fed from either source</li>
              <li>Higher capital cost, improved availability</li>
              <li>Application: Data centres, hospitals, critical infrastructure</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Type C — Ring Main Distribution</p>
            <p>
              <strong>Configuration:</strong> Closed loop feeds multiple distribution points with
              alternative paths.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load can be fed from either direction</li>
              <li>Section can be isolated without losing supply</li>
              <li>Complex protection coordination required</li>
              <li>Higher installation cost, improved reliability</li>
              <li>Application: Large industrial sites, campus distributions, hospitals</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">System Selection Criteria</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capital cost:</strong> Type A low — Type B high — Type C medium-high
              </li>
              <li>
                <strong>Availability:</strong> Type A 99.9% — Type B 99.99% — Type C 99.95%
              </li>
              <li>
                <strong>Maintenance flexibility:</strong> Type A limited — Type B good — Type C
                excellent
              </li>
              <li>
                <strong>Protection complexity:</strong> Type A simple — Type B moderate — Type C
                complex
              </li>
              <li>
                <strong>Expansion capability:</strong> Type A moderate — Type B good — Type C
                excellent
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Many buildings use hybrid systems - Type B for critical loads
              (data, life safety) with Type A for general distribution. Cost-benefit analysis
              should consider downtime costs against infrastructure investment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Surge Protection Devices (SPDs)">
            <p>
              Transient overvoltages from lightning strikes and switching events can damage
              electronic equipment. SPDs divert surge energy safely to earth, protecting downstream
              equipment. BS 7671:2018+A4:2026 significantly strengthened SPD requirements (Section 443/Reg 443.4).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">SPD Types and Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 1 (Class I):</strong> Test current 10/350µs (Iimp) — origin/main
                intake
              </li>
              <li>
                <strong>Type 2 (Class II):</strong> Test current 8/20µs (In, Imax) —
                sub-distribution boards
              </li>
              <li>
                <strong>Type 3 (Class III):</strong> Test current 1.2/50µs (Uoc) — point of
                use/sensitive equipment
              </li>
              <li>
                <strong>Type 1+2 (combined):</strong> Both waveforms — compact installations
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              BS 7671 Regulation 443 Requirements
            </p>
            <p>SPD protection is required when the consequence of overvoltage affects:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Human life (medical facilities, safety systems)</li>
              <li>Public services and cultural heritage</li>
              <li>Commercial/industrial activities</li>
              <li>Large groups of individuals</li>
            </ul>
            <p>
              <strong>Risk assessment</strong> per BS EN 62305-2 determines necessity. When Crl
              (risk with lightning) exceeds Ct (tolerable risk), SPDs are mandatory.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">SPD Selection Parameters</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Uc (Max continuous voltage):</strong> ≥ 1.1 × Uo (253V for 230V systems)
              </li>
              <li>
                <strong>Up (Voltage protection level):</strong> Lower = better protection
              </li>
              <li>
                <strong>In (Nominal discharge current):</strong> Type 2 typically 20kA
              </li>
              <li>
                <strong>Imax (Maximum discharge):</strong> Must withstand expected surges
              </li>
              <li>
                <strong>Iimp (Impulse current):</strong> Type 1 rated, e.g., 12.5kA
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">SPD Coordination</p>
            <p>
              Multiple SPDs must be coordinated to share surge energy effectively. The distance
              rule applies:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable length &lt; 10m:</strong> Type 2 may protect without Type 1
              </li>
              <li>
                <strong>Cable length &gt; 10m:</strong> Coordination inductance required between
                stages
              </li>
              <li>
                <strong>Decoupling:</strong> Some manufacturers provide built-in coordination
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Installation note:</strong> SPD connecting cables should be as short as
              possible (&lt;0.5m) to minimise the voltage drop during surge conditions. Connection
              in a 'V' arrangement is preferred.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Metering and Monitoring">
            <p>
              Modern buildings require comprehensive energy monitoring for billing, efficiency
              analysis, and Building Management System (BMS) integration. Metering strategies range
              from simple fiscal meters to intelligent power monitoring systems.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Metering Hierarchy</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fiscal:</strong> Incoming supply — utility billing — DNO meter (MID
                approved)
              </li>
              <li>
                <strong>Check:</strong> Main switchboard — verify fiscal meter — power analyser
              </li>
              <li>
                <strong>Sub-metering:</strong> Sub-distribution — tenant/department billing — MID
                Class B meter
              </li>
              <li>
                <strong>Circuit:</strong> Individual circuits — energy analysis — CT-based energy
                monitor
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Current Transformers (CTs)</p>
            <p>CTs enable non-invasive current measurement for metering. Key specifications:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ratio:</strong> Primary current to secondary (e.g., 400/5A, 200/1A)
              </li>
              <li>
                <strong>Accuracy class:</strong> 0.2S/0.5S for fiscal, 1.0 for monitoring
              </li>
              <li>
                <strong>Burden (VA):</strong> Must match meter input impedance
              </li>
              <li>
                <strong>Type:</strong> Ring, split-core, or Rogowski coil
              </li>
              <li>
                Note: CT secondary circuits must never be open-circuited when energised - dangerous
                voltages develop.
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Quality Parameters</p>
            <p>Modern power analysers measure far more than simple kWh. Key parameters include:</p>
            <p className="text-sm font-medium text-white">Energy &amp; Power</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>kWh (active energy)</li>
              <li>kVArh (reactive energy)</li>
              <li>kVAh (apparent energy)</li>
              <li>Power factor</li>
              <li>Maximum demand</li>
            </ul>
            <p className="text-sm font-medium text-white">Power Quality</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>THD (Total Harmonic Distortion)</li>
              <li>Individual harmonics (up to 40th)</li>
              <li>Voltage sags/swells</li>
              <li>Phase imbalance</li>
              <li>Frequency deviation</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">BMS Integration</p>
            <p>Energy data typically communicates to Building Management Systems via:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Modbus RTU/TCP:</strong> Most common protocol for meters
              </li>
              <li>
                <strong>BACnet:</strong> Native building automation protocol
              </li>
              <li>
                <strong>M-Bus:</strong> European metering bus standard
              </li>
              <li>
                <strong>Pulse outputs:</strong> Simple kWh pulses (e.g., 1000 imp/kWh)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Specify meter communication requirements
              early. Retro-fitting protocol converters is expensive and adds failure points.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Forms of Separation (Form 1-4)">
            <p>
              BS EN 61439 defines Forms of internal separation that determine how different
              components within a switchboard are segregated. Higher forms provide greater safety
              during maintenance and reduced risk of fault propagation.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Forms of Separation Overview</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Form 1:</strong> No separation of busbars, functional units or terminals
              </li>
              <li>
                <strong>Form 2a:</strong> Busbars separated; functional units not separated;
                terminals not in same compartment
              </li>
              <li>
                <strong>Form 2b:</strong> Busbars separated; functional units not separated;
                terminals in same compartment
              </li>
              <li>
                <strong>Form 3a:</strong> Busbars separated; functional units separated; terminals
                not in same compartment
              </li>
              <li>
                <strong>Form 3b:</strong> Busbars separated; functional units separated; terminals
                in same compartment
              </li>
              <li>
                <strong>Form 4a:</strong> Busbars separated; functional units separated; terminals
                separated (not in same compartment)
              </li>
              <li>
                <strong>Form 4b:</strong> Busbars separated; functional units separated; terminals
                separated (in same compartment)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Form 1-2 — typical applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Final distribution boards</li>
              <li>Consumer units</li>
              <li>Small sub-distribution</li>
              <li>Non-critical applications</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Form 3-4 — typical applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main switchboards</li>
              <li>Motor control centres</li>
              <li>Critical infrastructure</li>
              <li>Where live maintenance required</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Benefits of Higher Forms</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault containment:</strong> Arc flash confined to compartment
              </li>
              <li>
                <strong>Live maintenance:</strong> Work on one section, others remain live
              </li>
              <li>
                <strong>Cable access:</strong> Terminate cables without busbar exposure
              </li>
              <li>
                <strong>Future expansion:</strong> Add circuits without shutdown
              </li>
              <li>
                <strong>Testing:</strong> Isolate circuits for individual testing
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Specification note:</strong> Form of separation must be specified at tender
              stage. It significantly affects cost and cannot easily be changed post-manufacture.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Panel Schedules and As-Built Documentation">
            <p>
              Comprehensive documentation is essential for safe operation, maintenance, and future
              modifications. Panel schedules and as-built drawings form the core of this
              documentation and must be maintained throughout the installation's life.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Panel Schedule Requirements</p>
            <p>Every distribution board must have a legible schedule showing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit number:</strong> Unique identifier matching cable labels
              </li>
              <li>
                <strong>Description:</strong> Clear identification of load/area served
              </li>
              <li>
                <strong>Protective device:</strong> Type, rating, and characteristics (e.g., B32)
              </li>
              <li>
                <strong>Cable size:</strong> Conductor CSA and type (e.g., 4mm² T&amp;E)
              </li>
              <li>
                <strong>Phase allocation:</strong> L1, L2, L3 or combination for 3φ
              </li>
              <li>
                <strong>Design current (Ib):</strong> Calculated load current
              </li>
              <li>
                <strong>Connected load:</strong> kW or kVA rating
              </li>
              <li>
                <strong>Cable route:</strong> Reference to cable containment drawings
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example Panel Schedule Extract</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cct 1:</strong> Lighting - Ground Floor — B16 — 1.5mm² T&amp;E — L1 —
                Ib 8.7A — load 2kW
              </li>
              <li>
                <strong>Cct 2:</strong> Sockets - Office 1 — B32 RCBO — 2.5mm² T&amp;E — L2 —
                Ib 20A — load 4.6kW
              </li>
              <li>
                <strong>Cct 3:</strong> AHU-01 — D32 3P — 4mm² SWA — 3φ — Ib 18A — load 11kW
              </li>
              <li>
                <strong>Cct 4:</strong> Server Room A/C — C20 — 2.5mm² FP200 — L3 — Ib 15A —
                load 3.5kW
              </li>
              <li>
                <strong>Cct 5:</strong> Spare — — — — — —
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">As-Built Documentation Package</p>
            <p>Complete handover documentation should include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-line diagrams:</strong> Showing all switchgear, protection settings
              </li>
              <li>
                <strong>Schematic drawings:</strong> Control circuits, interlocks
              </li>
              <li>
                <strong>Cable schedules:</strong> Routes, sizes, containment references
              </li>
              <li>
                <strong>Panel schedules:</strong> As described above, laminated inside door
              </li>
              <li>
                <strong>Test certificates:</strong> Type test, routine test (BS EN 61439)
              </li>
              <li>
                <strong>Installation certificates:</strong> EIC per BS 7671
              </li>
              <li>
                <strong>O&amp;M manuals:</strong> Equipment data sheets, maintenance schedules
              </li>
              <li>
                <strong>Spare parts list:</strong> Recommended spares, supplier contacts
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Labelling Requirements (BS 7671 Regulation 514)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution board designation (e.g., DB-01, MSB)</li>
              <li>Voltage and frequency (400V 50Hz TN-S)</li>
              <li>Prospective fault current (Ipf)</li>
              <li>Maximum demand and diversity applied</li>
              <li>RCD test frequency reminder (if applicable)</li>
              <li>Next inspection date</li>
              <li>Isolator positions (on/off clearly marked)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance requirement:</strong> Panel schedules must be updated whenever
              circuits are added, removed, or modified. Outdated schedules create safety hazards
              and complicate fault finding.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Distribution Board Specification
            </p>
            <p>
              <strong>Scenario:</strong> Specify a sub-distribution board for a 3-storey office
              with 45kW lighting, 60kW small power, and 30kW HVAC. Prospective fault current is
              15kA.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total connected load = 45 + 60 + 30 = 135kW</li>
              <li>Apply diversity (0.8): 135 × 0.8 = 108kW</li>
              <li>Design current at 400V 3φ:</li>
              <li>I = P / (√3 × V × pf) = 108000 / (1.732 × 400 × 0.9)</li>
              <li>
                I = 108000 / 623.5 = <strong>173A</strong>
              </li>
              <li><strong>Specification:</strong></li>
              <li>Main incomer: 250A MCCB, 3P+N</li>
              <li>Busbar rating: 250A, Icw ≥ 15kA for 1s</li>
              <li>Form of separation: Form 2b (sub-DB)</li>
              <li>IP rating: IP41 (indoor electrical room)</li>
              <li>20% spare ways for future expansion</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: SPD Selection</p>
            <p>
              <strong>Scenario:</strong> Select SPDs for a building with overhead line supply. Data
              centre equipment (Category 1) is located 25m from the main DB.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Overhead line → Type 1 SPD required at origin</li>
              <li><strong>Main intake (MSB):</strong></li>
              <li>Type 1+2 combined SPD</li>
              <li>Iimp ≥ 12.5kA (10/350µs)</li>
              <li>Uc ≥ 275V (1.1 × 250V tolerance)</li>
              <li>Up ≤ 2.5kV</li>
              <li><strong>Sub-DB (data centre, 25m from MSB):</strong></li>
              <li>Distance &gt; 10m → Type 2 SPD required</li>
              <li>In ≥ 20kA, Imax ≥ 40kA</li>
              <li>Up ≤ 1.5kV (Category 1 equipment)</li>
              <li><strong>Server racks (point of use):</strong></li>
              <li>Type 3 SPD in PDU or rack-mounted</li>
              <li>Up ≤ 1.0kV for sensitive electronics</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Phase Balance Calculation
            </p>
            <p>
              <strong>Scenario:</strong> A panel schedule shows: L1 = 85A, L2 = 72A, L3 = 93A.
              Calculate the imbalance and neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average current = (85 + 72 + 93) / 3 = 83.3A</li>
              <li>Maximum deviation = |93 - 83.3| = 9.7A</li>
              <li>
                Imbalance = (9.7 / 83.3) × 100 = <strong>11.6%</strong>
              </li>
              <li>Neutral current (simplified for unity pf):</li>
              <li>IN = √(IL1² + IL2² + IL3² - IL1·IL2 - IL2·IL3 - IL3·IL1)</li>
              <li>IN = √(7225 + 5184 + 8649 - 6120 - 6696 - 7905)</li>
              <li>
                IN = √337 = <strong>18.4A</strong>
              </li>
              <li>Note: Acceptable imbalance (&lt;15%) but monitor</li>
              <li>Consider moving 10A from L3 to L2</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">
              Distribution Board Design Checklist
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify prospective fault current from DNO/upstream protection</li>
              <li>Calculate design current with appropriate diversity</li>
              <li>Select busbar rating exceeding design current + growth margin</li>
              <li>Specify short-circuit withstand (Icw) ≥ Ipf</li>
              <li>Choose appropriate Form of separation</li>
              <li>Include SPD provision (risk assessment per Reg. 443)</li>
              <li>Allow minimum 20% spare ways</li>
              <li>Consider metering requirements (fiscal, check, sub-metering)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Standards Reference</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:</strong> IET Wiring Regulations - Installation requirements
              </li>
              <li>
                <strong>BS EN 61439-1:</strong> LV switchgear assemblies - General rules
              </li>
              <li>
                <strong>BS EN 61439-2:</strong> Power switchgear and controlgear assemblies
              </li>
              <li>
                <strong>BS EN 62305:</strong> Lightning protection - Risk assessment
              </li>
              <li>
                <strong>BS EN 61643:</strong> Surge protective devices
              </li>
              <li>
                <strong>IEC 60364:</strong> Electrical installations in buildings
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common distribution-board design errors"
            whatHappens={
              <>
                Undersizing the neutral by ignoring harmonic content. Specifying a busbar Icw
                below the prospective fault current. Leaving no spare ways. Forgetting derating
                above 35°C ambient. Long SPD connecting cables that destroy effectiveness.
                Outdated or missing panel schedules.
              </>
            }
            doInstead={
              <>
                Apply Table 5.4a / oversize neutrals for IT &amp; LED loads. Confirm Icw ≥ Ipf at
                the installation point. Allow 20% spare capacity. Derate busbars above 35°C. Keep
                SPD leads &lt;0.5m and use a V-arrangement. Update panel schedules every time a
                circuit changes.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Hospital ward distribution board &mdash; Form 4 vs Form 2 specification"
            situation={
              <>
                A new hospital ward refurbishment requires a 250 A distribution board
                feeding 24 single-phase final circuits (lighting, small power, medical
                socket-outlets) plus 4 three-phase circuits (AHU local plant, beverage
                bay). Initial cost-engineer proposal is a Form 2 board to save
                ~&pound;3.5k. The BSE engineer reviews against the brief and HTM 06-01.
              </>
            }
            whatToDo={
              <>
                Specify Form 4 Type 7 (BS EN 61439-1). Health Technical Memorandum
                HTM 06-01 (Electrical services supply and distribution) requires Form 4
                for healthcare patient-treatment areas because it allows live working on
                one functional unit while another remains energised, with full segregation
                of busbars, devices and outgoing cables. Form 2 would force a full board
                shutdown for any device replacement, which is not acceptable on a
                24-hour clinical ward. Document the Form 4 selection on the panel
                schedule.
              </>
            }
            whyItMatters={
              <>
                Selecting the wrong Form on a healthcare board breaches HTM 06-01 and
                creates a clinical risk: a full board shutdown means relocating patients
                and disabling ward equipment for the duration of the works. The Form 4
                cost premium is 5&ndash;10 % of the panel cost and is recovered many
                times over the panel&rsquo;s 25-year lifecycle through avoided clinical
                disruption.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Distribution boards specified to BS EN 61439-1/-2 — Form 1 (no separation) up to Form 4 Type 7 (full segregation including outgoing terminals).',
              'BS 7671 A4:2026 Reg 443.4 risk assessment for SPD &mdash; default Yes for all but simplest domestic installations.',
              'Type 1+2 SPDs at the origin (close to incoming TX or main switch); Type 2 SPDs at sub-boards in long-cable / high-CRL areas.',
              'Phase allocation: spread single-phase final circuits L1/L2/L3 deliberately at design, target imbalance &lt; 10 % at busbar.',
              'Neutral sizing: BS 7671 524.2 + Appendix 4 &sect;5.5 — full-rated or oversize neutral on harmonic-rich boards.',
              'Panel schedule: document Ib, In, Iz, Zs, voltage drop, phase allocation per circuit &mdash; required for EICR and log book.',
              'HTM 06-01 mandates Form 4 boards in healthcare patient-treatment areas; HTM 08-01 covers escape lighting in healthcare.',
              'Discrimination overlays the upstream MCCB trip curve over the downstream MCB curve — verified at design stage with manufacturer software.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Harmonics and Power Quality
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_8;
