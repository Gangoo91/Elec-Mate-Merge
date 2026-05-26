/**
 * Module 3 · Section 4 · Subsection 1 — Star and Delta Configurations
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The two fundamental three-phase winding topologies — star (Y) for distribution
 *   with neutral, delta (D) for motor running and transformer primary. Vector groups,
 *   star-delta starting and selection criteria for BSE designers.
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

const TITLE = 'Star and Delta Configurations - HNC Module 3 Section 4.1';
const DESCRIPTION =
  'Master star (Y) and delta (D) three-phase configurations for building services: winding connections, voltage relationships, motor starting methods and transformer applications.';

const quickCheckQuestions = [
  {
    id: 'star-neutral',
    question: 'In a star-connected system, where is the neutral point located?',
    options: [
      'Roger Fisher, William Ury and Bruce Patton',
      'Upgrading transceivers on existing fibres',
      'To control motor speed and reduce energy consumption',
      'At the junction of all three phase windings',
    ],
    correctIndex: 3,
    explanation:
      'In star connection, all three phase windings connect at a common junction point - this is the star point or neutral point. It provides the reference for phase voltages and allows the 4-wire distribution system.',
  },
  {
    id: 'delta-wires',
    question: 'How many conductors are used in a delta-connected three-phase system?',
    options: [
      '5 wires',
      '2 wires',
      '3 wires',
      '4 wires',
    ],
    correctIndex: 2,
    explanation:
      'Delta connection has no neutral point, so only 3 line conductors are required. This makes delta suitable for balanced three-phase loads like motors, but not for single-phase loads.',
  },
  {
    id: 'line-phase-voltage',
    question: 'In a star-connected system with 400V line voltage, what is the phase voltage?',
    options: [
      '400V',
      '692V',
      '230V',
      '133V',
    ],
    correctIndex: 2,
    explanation:
      'In star connection, VL = VP x root3, so VP = VL / root3 = 400 / 1.732 = 230V. This is why UK three-phase supplies give both 400V (line) and 230V (phase) from the same source.',
  },
  {
    id: 'star-delta-starting',
    question: 'Why is star-delta starting used for large motors?',
    options: [
      'It eliminates the need for a neutral',
      'It reduces starting current to one-third',
      'It reverses motor direction',
      'It increases motor speed',
    ],
    correctIndex: 1,
    explanation:
      'Star-delta starting reduces the starting current to approximately one-third (1/root3 squared = 1/3) of direct-on-line current. This reduces voltage dip and stress on the supply system.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the main advantage of star connection in distribution systems?',
    options: [
      'The height from the ground to the top of the working platform',
      'Provides both line and phase voltages for different loads',
      'Cannot be inadvertently re-energised by others',
      'At the furthest point from the distribution board',
    ],
    correctAnswer: 1,
    explanation:
      'Star connection provides access to both 400V (line-to-line) for three-phase equipment and 230V (phase-to-neutral) for single-phase loads, making it ideal for mixed building loads.',
  },
  {
    id: 2,
    question:
      'In a delta-connected motor, what is the relationship between line and phase current?',
    options: [
      'IL = IP / root3',
      'IL = IP',
      'IL = IP x root3',
      'IL = 3 x IP',
    ],
    correctAnswer: 2,
    explanation:
      'In delta connection, IL = IP x root3 (approximately 1.732). The line current is higher than the phase current because it combines currents from two phase windings.',
  },
  {
    id: 3,
    question:
      'A three-phase transformer has 400V applied to its delta-connected primary. What voltage appears across each primary winding?',
    options: [
      '692V',
      '230V',
      '133V',
      '400V',
    ],
    correctAnswer: 3,
    explanation:
      'In delta connection, VP = VL. Each winding is connected directly across two line conductors, so the full 400V line voltage appears across each winding.',
  },
  {
    id: 4,
    question: 'Why must the neutral in a star system be properly earthed?',
    options: [
      'To provide fault current path and stabilise phase voltages',
      'Contact burns, arc burns, and flash burns',
      'Both voltage and frequency differences affect operation',
      'A plug adapter allowing remote control and monitoring of connected devices',
    ],
    correctAnswer: 0,
    explanation:
      'Earthing the neutral provides a low-impedance path for earth fault currents (enabling protection to operate) and stabilises phase voltages under unbalanced load conditions.',
  },
  {
    id: 5,
    question:
      'What happens to motor starting torque when using star-delta starting compared to direct-on-line?',
    options: [
      'Torque remains the same',
      'Torque reduces to approximately one-third',
      'Torque reduces to approximately half',
      'Torque increases by a factor of 3',
    ],
    correctAnswer: 1,
    explanation:
      'Starting torque is proportional to voltage squared. In star, voltage is reduced by root3, so torque = (1/root3)squared = 1/3 of DOL torque. This may be insufficient for high-inertia loads.',
  },
  {
    id: 6,
    question: 'Which transformer connection provides a neutral on the secondary side?',
    options: [
      'Delta-delta',
      'Star-delta',
      'Delta-star',
      'Both delta-delta and star-delta',
    ],
    correctAnswer: 2,
    explanation:
      'Delta-star (Dy) connection is commonly used for distribution transformers. The delta primary eliminates third harmonic issues while the star secondary provides a neutral for single-phase loads.',
  },
  {
    id: 7,
    question: 'A 30kW motor runs at 400V in delta. What is the phase current in each winding?',
    options: [
      '25A',
      '129.9A',
      '75A',
      '43.3A',
    ],
    correctAnswer: 3,
    explanation:
      'Line current IL = P / (root3 x VL x pf) = 30000 / (1.732 x 400 x 1) = 43.3A. In delta, IP = IL / root3 = 43.3 / 1.732 = 25A per winding (assuming pf = 1).',
  },
  {
    id: 8,
    question: 'What is the vector group designation Dyn11 indicating?',
    options: [
      "Delta primary, star secondary with neutral, 330 degrees (11 o'clock) phase shift",
      "Related to phase conductor size per Table 54.7 or calculation",
      "Be individually removable so other employees cannot access personal data",
      "Understanding normal operation and basic troubleshooting",
    ],
    correctAnswer: 0,
    explanation:
      "Dyn11 means: D = delta primary, y = star secondary, n = neutral brought out, 11 = secondary leads primary by 330 degrees (11 x 30 degrees, like 11 o'clock position).",
  },
  {
    id: 9,
    question:
      'In building services, which configuration is typically used for the main distribution transformer?',
    options: [
      'Delta-delta (Dd)',
      'Delta-star (Dyn11)',
      'Star-star (Yy)',
      'Zig-zag (Zn)',
    ],
    correctAnswer: 1,
    explanation:
      'Dyn11 is standard for UK distribution transformers. It provides: delta primary (blocks third harmonics), star secondary with neutral (enables single-phase loads), and 30 degree phase shift.',
  },
  {
    id: 10,
    question: 'What is the minimum star-delta changeover time for a typical motor starter?',
    options: [
      'A fracture other than to fingers, thumbs and toes',
      'Compact size with good heat dissipation',
      '5-10 seconds (after motor reaches speed)',
      'On a straight line between the two states',
    ],
    correctAnswer: 2,
    explanation:
      'The motor must accelerate in star to approximately 75-80% of full speed (typically 5-10 seconds depending on load inertia) before switching to delta. Premature switching causes high current surge.',
  },
];

const faqs = [
  {
    question: 'Why is star connection preferred for distribution systems?',
    answer:
      'Star connection provides a neutral point, enabling both three-phase (400V) and single-phase (230V) supplies from the same system. This is essential for buildings with mixed loads - motors and large equipment use three-phase, while lighting and socket outlets use single-phase. The neutral also provides a reference for protective devices.',
  },
  {
    question: 'Can I connect single-phase loads to a delta system?',
    answer:
      'Not directly to the main supply. Delta has no neutral, so single-phase loads cannot be connected phase-to-neutral. You would need to use a transformer with a star secondary to derive a neutral, or use the delta supply for three-phase loads only. This is why delta distribution is rare in buildings.',
  },
  {
    question: 'What causes neutral current in a star system?',
    answer:
      'In a perfectly balanced system, the three phase currents sum to zero and no neutral current flows. In practice, single-phase loads cause imbalance - the neutral carries the vector sum of the unbalanced currents. High neutral currents indicate poor load balancing and waste energy.',
  },
  {
    question: 'Why do some motors have six terminals?',
    answer:
      'Six terminals allow the motor to be connected in either star or delta. Each winding has two ends brought out. For star, connect one end of each winding together; for delta, connect each winding end-to-end in a ring. This enables star-delta starting and voltage matching (e.g., 230V delta or 400V star give same winding voltage).',
  },
  {
    question: 'What is open-delta (V-connection)?',
    answer:
      'Open-delta uses only two transformers instead of three to supply three-phase power. It provides only 57.7% of the capacity of a full delta bank but can be useful as an emergency measure if one transformer fails, or where loads are light and may grow later.',
  },
  {
    question: 'How do I size the neutral conductor in a three-phase system?',
    answer:
      'For linear loads, neutral can be reduced to 50% of phase conductor CSA if loads are well-balanced. However, with non-linear loads (computers, LED drivers, VFDs), third harmonic currents add in the neutral and can exceed phase current. BS 7671 requires full-size neutral for these installations.',
  },
];

const HNCModule3Section4_1 = () => {
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
            eyebrow="Module 3 · Section 4 · Subsection 1"
            title="Star and Delta Configurations"
            description="The two fundamental three-phase winding arrangements that underpin power distribution and motor control"
            tone="purple"
          />

          <TLDR
            points={[
              'You design every UK distribution board off star-connected secondary windings (TN-S / TN-C-S) — the neutral point gives you 230 V single-phase off a 400 V three-phase system.',
              'You apply V&#x2097; = &radic;3 &times; V&#x209a; for star, and I&#x2097; = &radic;3 &times; I&#x209a; for delta — these two factors underpin every transformer kVA, motor starting and cable sizing calculation.',
              'You read transformer vector groups (Dyn11, Yyn0) on every distribution transformer nameplate &mdash; the group decides phase shift, fault behaviour and parallel operation.',
              'You specify star-delta starters for motors above ~7.5 kW where reduced inrush is needed but adjustable speed isn&rsquo;t — superseded by VSDs on most modern installations.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 312.2.1.1 (TN systems)"
            clause="TN systems have one point directly earthed at the source, the exposed-conductive-parts of the installation(s) being connected to that point by protective conductors. Two types of TN system are considered according to the arrangement of neutral and protective conductors: TN-S (neutral and protective conductors separate throughout) and TN-C-S (neutral and protective conductors combined in part of the system, usually the distributor's network)."
            meaning={
              <>
                The star-point of the DNO transformer is the system origin under BS 7671
                312.2.1.1 — earthed to provide the system reference for TN-S or TN-C-S
                operation. As a BSE designer you must know which earthing system the DNO
                provides at the cut-out (typically TN-C-S/PME on UK urban supplies, TN-S
                on older urban, TT on rural overhead) because that determines bonding,
                protection and ADS calculations for the entire downstream installation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 312.2.1.1; ENA Engineering Recommendation G12/4 (PME); BS EN 60076 (transformer vector groups)"
          />

          <LearningOutcomes
            outcomes={[
              'Explain star connection with neutral point and 4-wire system',
              'Describe delta connection and its 3-wire application',
              'Calculate line and phase voltages and currents for both configurations',
              'Justify star versus delta selection for different applications',
              'Apply star-delta starting principles to large motors',
              'Interpret transformer vector group designations (Dyn11)',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Star (Y) gives a neutral and two voltages; delta (D) gives 3-wire balanced supply only — choose based on whether you need single-phase loads."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Star (Y):</strong> Common neutral point, 4-wire system, VL = VP x root3
              </li>
              <li>
                <strong>Delta (D):</strong> No neutral, 3-wire system, VL = VP
              </li>
              <li>
                <strong>Star-delta starting:</strong> Reduces motor starting current to 1/3
              </li>
              <li>
                <strong>Transformer Dyn11:</strong> Standard UK distribution connection
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Distribution:</strong> Star for mixed single/three-phase loads
              </li>
              <li>
                <strong>Motors:</strong> Delta running, star-delta starting for large units
              </li>
              <li>
                <strong>Transformers:</strong> Dyn11 for building supplies
              </li>
              <li>
                <strong>Neutral:</strong> Essential for single-phase circuits
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Star (Y) Connection - The 4-Wire System">
            <p>
              In star (or wye) connection, one end of each of the three phase windings is connected
              together at a common point called the <strong>star point</strong> or{' '}
              <strong>neutral point</strong>. The other ends form the three line terminals.
            </p>
            <p className="text-sm font-medium text-white">
              Key Characteristics of Star Connection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4-wire system:</strong> Three lines (L1, L2, L3) plus neutral (N)
              </li>
              <li>
                <strong>Neutral point:</strong> Common junction of all three windings
              </li>
              <li>
                <strong>Line voltage:</strong> VL = VP x root3 = VP x 1.732
              </li>
              <li>
                <strong>Line current:</strong> IL = IP (same current in line and winding)
              </li>
              <li>
                <strong>Two voltage levels:</strong> 400V line-to-line, 230V line-to-neutral
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Star Connection Voltage Relationships
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line voltage (VL):</strong> 400V — Between any two lines
              </li>
              <li>
                <strong>Phase voltage (VP):</strong> 230V — VP = VL / root3 = 400 / 1.732
              </li>
              <li>
                <strong>Line current (IL):</strong> Varies — IL = IP (equal)
              </li>
              <li>
                <strong>Neutral current:</strong> 0 if balanced — Vector sum of phase currents
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key formula:</strong> VL = VP x root3, therefore VP = VL / root3 = 400 / 1.732
              = 230.9V (nominally 230V)
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Delta (D) Connection - The 3-Wire System">
            <p>
              In delta (or mesh) connection, the three phase windings are connected end-to-end in a
              closed loop, forming a triangle. Each corner of the triangle connects to a line
              conductor. There is no neutral point.
            </p>
            <p className="text-sm font-medium text-white">
              Key Characteristics of Delta Connection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3-wire system:</strong> Only three line conductors (L1, L2, L3)
              </li>
              <li>
                <strong>No neutral:</strong> Cannot supply single-phase loads directly
              </li>
              <li>
                <strong>Line voltage:</strong> VL = VP (winding sees full line voltage)
              </li>
              <li>
                <strong>Line current:</strong> IL = IP x root3 (line current is higher)
              </li>
              <li>
                <strong>Single voltage level:</strong> Only 400V available
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Delta Connection Current Relationships
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line voltage (VL):</strong> VL = VP — Winding connected across lines
              </li>
              <li>
                <strong>Phase voltage (VP):</strong> VP = VL = 400V — Full line voltage on winding
              </li>
              <li>
                <strong>Line current (IL):</strong> IL = IP x root3 — Line carries currents from two phases
              </li>
              <li>
                <strong>Phase current (IP):</strong> IP = IL / root3 — Current through each winding
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key formula:</strong> IL = IP x root3. Each line conductor carries the vector
              sum of currents from two adjacent windings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Line vs Phase - Understanding the Difference">
            <p>
              The distinction between <strong>line</strong> and <strong>phase</strong> quantities is
              fundamental to three-phase circuit analysis. The relationship differs depending on
              whether the system is star or delta connected.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Definitions</p>
            <p className="text-sm font-medium text-white">Line Quantities</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage between any two line conductors</li>
              <li>Current flowing in the line conductor</li>
              <li>What you measure at the supply terminals</li>
            </ul>
            <p className="text-sm font-medium text-white">Phase Quantities</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage across one winding</li>
              <li>Current flowing through one winding</li>
              <li>What the load or source winding experiences</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Comparison of Star and Delta Relationships
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage:</strong> Star VL = VP x root3 — Delta VL = VP
              </li>
              <li>
                <strong>Current:</strong> Star IL = IP — Delta IL = IP x root3
              </li>
              <li>
                <strong>UK example (400V line):</strong> Star VP = 230V across winding — Delta VP = 400V across winding
              </li>
              <li>
                <strong>Number of wires:</strong> Star 4 (3 lines + neutral) — Delta 3 (lines only)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Critical Point for Motor Nameplates
            </p>
            <p>
              A motor rated <strong>230V/400V</strong> (D/Y) means: 230V delta OR 400V star. In
              both cases, each winding sees 230V (phase voltage). The rating tells you which
              connection to use depending on your supply voltage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="When to Use Star vs Delta">
            <p>
              The choice between star and delta connection depends on the application, the voltage
              levels required, and whether a neutral is needed.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Use Star (Y) When:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mixed loads:</strong> Single-phase and three-phase loads in buildings
              </li>
              <li>
                <strong>Distribution:</strong> Main LV supply to premises (TN-S, TN-C-S)
              </li>
              <li>
                <strong>Neutral required:</strong> For single-phase circuits (lighting, sockets)
              </li>
              <li>
                <strong>Lower winding voltage:</strong> Thinner insulation acceptable
              </li>
              <li>
                <strong>Reduced starting current:</strong> Star connection during motor starting
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Use Delta (D) When:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Balanced loads only:</strong> Three-phase motors, heaters
              </li>
              <li>
                <strong>Higher power:</strong> Motor running connection (full torque)
              </li>
              <li>
                <strong>No neutral needed:</strong> Pure three-phase loads
              </li>
              <li>
                <strong>Transformer primary:</strong> Blocks third harmonics
              </li>
              <li>
                <strong>Higher fault tolerance:</strong> Can operate with one phase lost (open
                delta)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Building Services Selection Guide
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main distribution board:</strong> Star (4-wire) — Single-phase circuits need neutral
              </li>
              <li>
                <strong>AHU motor running:</strong> Delta — Full torque, balanced 3-phase load
              </li>
              <li>
                <strong>Large motor starting:</strong> Star then delta — Reduce starting current to 1/3
              </li>
              <li>
                <strong>Distribution transformer:</strong> Dyn11 — Delta blocks harmonics, star gives neutral
              </li>
              <li>
                <strong>Three-phase heater bank:</strong> Delta — Balanced load, no neutral needed
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Star-Delta Motor Starting">
            <p>
              Star-delta (Y-D) starting is a reduced voltage starting method for three-phase
              induction motors. It temporarily connects the motor in star during starting, then
              switches to delta for normal running.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Star-Delta Starting Sequence
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Star (Start):</strong> Motor connected in star. Winding voltage = 230V. Current = 1/3 of DOL.
              </li>
              <li>
                <strong>2. Transition:</strong> Timer (5-10 seconds). Motor accelerates to ~80% speed. Contactors changeover.
              </li>
              <li>
                <strong>3. Delta (Run):</strong> Motor reconnected in delta. Winding voltage = 400V. Full torque available.
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Star-Delta Starting Analysis
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Winding voltage:</strong> Star VL / root3 = 230V — Delta VL = 400V
              </li>
              <li>
                <strong>Line current:</strong> Star 1/3 of delta current — Delta full load current
              </li>
              <li>
                <strong>Starting torque:</strong> Star 1/3 of DOL torque — Delta full rated torque
              </li>
              <li>
                <strong>Power consumption:</strong> Star reduced (acceleration) — Delta rated (running)
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Advantages and Limitations:</p>
            <p className="text-sm font-medium text-white">Advantages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Starting current reduced to 1/3</li>
              <li>Reduces voltage dip on supply</li>
              <li>Simple, reliable, low cost</li>
              <li>No external resistors or autotransformers</li>
            </ul>
            <p className="text-sm font-medium text-white">Limitations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Starting torque also reduced to 1/3</li>
              <li>Motor must have 6 terminals accessible</li>
              <li>Transient current surge at changeover</li>
              <li>Not suitable for high-inertia loads</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Building services note:</strong> Star-delta starting is commonly used for
              large AHU fans, chiller compressors, and pump motors above 7.5kW where direct-on-line
              starting would cause unacceptable voltage disturbance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Transformer Winding Connections">
            <p>
              Three-phase transformers can have their primary and secondary windings connected in
              either star or delta configuration. The choice affects voltage transformation, neutral
              availability, and harmonic behaviour.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Common Transformer Connections
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dyn11:</strong> Primary delta, secondary star + neutral — UK distribution (standard)
              </li>
              <li>
                <strong>Yyn0:</strong> Primary star, secondary star + neutral — Transmission step-down
              </li>
              <li>
                <strong>Dd0:</strong> Primary delta, secondary delta — Industrial, no neutral needed
              </li>
              <li>
                <strong>Yd11:</strong> Primary star, secondary delta — Generator step-up
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Understanding Vector Groups
            </p>
            <p>
              The designation <strong>Dyn11</strong> tells you everything about the transformer
              connection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>D:</strong> Primary is Delta connected
              </li>
              <li>
                <strong>y:</strong> Secondary is star (wye) connected
              </li>
              <li>
                <strong>n:</strong> Neutral is brought out (available for connection)
              </li>
              <li>
                <strong>11:</strong> Secondary voltage leads primary by 330 degrees (11 x 30
                degrees = 11 o'clock position)
              </li>
            </ul>
            <p className="text-sm font-medium text-white">
              Why Dyn11 is Standard for UK Distribution:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Delta primary:</strong> Blocks third harmonic currents from circulating in
                the supply
              </li>
              <li>
                <strong>Star secondary:</strong> Provides neutral for single-phase loads (230V)
              </li>
              <li>
                <strong>Neutral earthed:</strong> Creates TN-S or TN-C-S earthing arrangement
              </li>
              <li>
                <strong>30 degree shift:</strong> Helps with parallel operation and fault limiting
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Neutral Earthing in Star Systems">
            <p>
              In star-connected systems, the neutral point is typically earthed (grounded). This
              provides a reference for phase voltages, a path for earth fault currents, and enables
              protection systems to operate.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Functions of Neutral Earthing
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage stabilisation:</strong> Maintains consistent phase-to-neutral
                voltages under unbalanced loads
              </li>
              <li>
                <strong>Fault current path:</strong> Provides low-impedance return for earth fault
                currents
              </li>
              <li>
                <strong>Protection operation:</strong> Enables RCDs, earth fault relays, and
                overcurrent devices to detect and clear faults
              </li>
              <li>
                <strong>Safety:</strong> Limits touch voltages on exposed metalwork during faults
              </li>
              <li>
                <strong>Lightning/surge protection:</strong> Provides path to earth for transient
                overvoltages
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Earthing Systems in UK Installations
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> Earthed at source, separate N and PE — Older installations, dedicated earth
              </li>
              <li>
                <strong>TN-C-S (PME):</strong> Combined PEN in supply, split at origin — Most UK buildings (standard)
              </li>
              <li>
                <strong>TT:</strong> Source earthed, local earth electrode — Rural, overhead supplies
              </li>
              <li>
                <strong>IT:</strong> Unearthed or impedance earthed — Hospitals, critical systems
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              PME and Neutral-Earth Faults
            </p>
            <p>
              In TN-C-S (PME) systems, loss of the combined neutral-earth (PEN) conductor can
              cause dangerous voltages on exposed metalwork. BS 7671 requires additional
              protective measures including main bonding and restrictions on PME connections to
              certain locations (swimming pools, petrol stations, caravans).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p>
              Understanding star and delta configurations is essential for designing and maintaining
              electrical systems in buildings. Different equipment and distribution systems require
              specific connection arrangements.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Distribution System Design
            </p>
            <p>A typical commercial building electrical distribution uses:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incoming supply transformer (Dyn11):</strong> 11kV/400V, delta primary,
                star secondary with neutral
              </li>
              <li>
                <strong>Main LV switchboard:</strong> 4-wire (L1, L2, L3, N) + PE, TN-C-S
                earthing
              </li>
              <li>
                <strong>Sub-distribution boards:</strong> 4-wire for mixed loads, 3-wire for
                motor-only boards
              </li>
              <li>
                <strong>Final circuits:</strong> Single-phase from each phase to neutral
                (balanced loading)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Motor Connections in Building Services
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Extract fans (small):</strong> Up to 3kW, DOL — Delta (400V)
              </li>
              <li>
                <strong>AHU supply fans:</strong> 7.5-30kW, Star-delta or VSD — Delta running
              </li>
              <li>
                <strong>Chiller compressors:</strong> 30-100kW+, Star-delta or soft start — Delta running
              </li>
              <li>
                <strong>LPHW pumps:</strong> 1.5-15kW, DOL or VSD — Delta (400V)
              </li>
              <li>
                <strong>Lift motors:</strong> 5-50kW, VSD (regenerative) — Delta via VSD
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Load Balancing in Star Systems
            </p>
            <p>Single-phase loads should be distributed evenly across the three phases to:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimise neutral current (reduces I squared R losses)</li>
              <li>Maintain stable phase voltages</li>
              <li>Optimise transformer loading</li>
              <li>Reduce cable heating</li>
            </ul>
            <p>
              <strong>BS 7671 guidance:</strong> Where practicable, single-phase loads should be
              distributed to achieve balance within 10-15% across phases.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Neutral Sizing for Non-Linear Loads
            </p>
            <p>
              Modern buildings with IT equipment, LED lighting, and VFDs generate significant
              third harmonic currents. These add arithmetically in the neutral rather than
              cancelling, potentially causing neutral current to exceed phase current. BS 7671
              requires:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full-size neutral where third harmonic content exceeds 15%</li>
              <li>Oversize neutral (up to 1.45 x phase) for very high harmonic loads</li>
              <li>Consideration of harmonic filters or active front-end drives</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Star Connection Calculations
            </p>
            <p>
              <strong>Question:</strong> A balanced three-phase load draws 45A per phase from a
              400V star-connected supply. Calculate the line voltage, phase voltage, and total
              power (assuming unity power factor).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line voltage VL = 400V (given)</li>
              <li>Phase voltage VP = VL / root3 = 400 / 1.732 = <strong>230.9V</strong></li>
              <li>In star: IL = IP = 45A</li>
              <li>Total power P = root3 x VL x IL x pf</li>
              <li>P = 1.732 x 400 x 45 x 1 = <strong>31.2kW</strong></li>
              <li>Or per phase: P = 3 x VP x IP = 3 x 230.9 x 45 = 31.2kW</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Delta Connection Calculations
            </p>
            <p>
              <strong>Question:</strong> A three-phase heater is delta-connected to a 400V supply
              and draws 30A line current. Calculate the phase current and total power.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In delta: VL = VP = 400V</li>
              <li>Line current IL = 30A</li>
              <li>Phase current IP = IL / root3 = 30 / 1.732 = <strong>17.3A</strong></li>
              <li>Power P = root3 x VL x IL x pf</li>
              <li>P = 1.732 x 400 x 30 x 1 = <strong>20.8kW</strong></li>
              <li>(For resistive heater, pf = 1)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Star-Delta Starting Current Reduction
            </p>
            <p>
              <strong>Question:</strong> A motor draws 180A starting current when started
              direct-on-line in delta. What starting current will it draw using star-delta
              starting?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DOL starting current (delta) = 180A</li>
              <li>Star-delta reduction factor = 1/3</li>
              <li>(Because voltage is 1/root3 and current is proportional to voltage)</li>
              <li>Star starting current = 180 / 3 = <strong>60A</strong></li>
              <li>Current reduction = 180 - 60 = 120A (67% reduction)</li>
              <li>Note: Torque also reduces to 1/3, so motor must be lightly loaded during start</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Motor Dual Voltage Rating
            </p>
            <p>
              <strong>Question:</strong> A motor nameplate shows 230V/400V (D/Y). Explain what
              this means and how to connect it to a UK 400V supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The rating 230V/400V (D/Y) means:</li>
              <li>- Connect in Delta for 230V line supply (winding sees 230V)</li>
              <li>- Connect in Star for 400V line supply (winding sees 400/root3 = 230V)</li>
              <li>For UK 400V supply: <strong>Connect in Star (Y)</strong></li>
              <li>Each winding will receive: 400V / 1.732 = 230V</li>
              <li>This matches the winding's rated voltage</li>
              <li>Star-delta starting: Start in Star, run in Delta would give winding 133V during start - too low. Use correct rating motor.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Star: VL = VP x root3</strong> - Line voltage is root3 times phase voltage
              </li>
              <li>
                <strong>Star: IL = IP</strong> - Line and phase currents are equal
              </li>
              <li>
                <strong>Delta: VL = VP</strong> - Line and phase voltages are equal
              </li>
              <li>
                <strong>Delta: IL = IP x root3</strong> - Line current is root3 times phase current
              </li>
              <li>
                <strong>Power: P = root3 x VL x IL x pf</strong> - Three-phase power formula
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>root3 = <strong>1.732</strong></li>
              <li>UK line voltage: <strong>400V</strong></li>
              <li>UK phase voltage: <strong>230V</strong> (400 / 1.732)</li>
              <li>Star-delta starting current reduction: <strong>1/3</strong></li>
              <li>Star-delta starting torque reduction: <strong>1/3</strong></li>
              <li>Dyn11 phase shift: <strong>330 degrees</strong> (11 x 30)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common star/delta mistakes"
            whatHappens={
              <>
                Wrong connection — connecting 230V rated windings in delta on 400V supply causes
                overvoltage. Attempting single-phase loads from delta without a transformer.
                Premature changeover from star to delta before motor reaches speed causes a
                current surge. Unbalanced loading overloads one phase and causes neutral current
                and voltage imbalance. Ignoring harmonics by under-sizing the neutral for
                non-linear loads.
              </>
            }
            doInstead={
              <>
                Match motor winding rating to supply (230V/400V D/Y → star on 400V). Derive a
                neutral via Dyn11 transformer if single-phase loads are needed from delta. Wait
                until 75-80% of full speed before star-to-delta changeover. Distribute
                single-phase loads across phases for balance within 10-15%. Use full-size (or
                up to 1.45x) neutral where 3rd harmonic content is significant.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="22 kW supply fan motor &mdash; star-delta vs VSD selection"
            situation={
              <>
                The mechanical schedule shows a 22 kW air-handling unit supply fan with
                fixed-speed operation acceptable to the AHU OEM. The contractor proposes
                a star-delta starter to reduce inrush from ~6&times; full-load current
                (DOL) to ~2&times;. The BSE engineer must decide between star-delta and a
                VSD-based soft starter / drive.
              </>
            }
            whatToDo={
              <>
                Specify a VSD even though variable speed isn&rsquo;t strictly required.
                Reasons: (a) VSD soft-start eliminates inrush completely (1.0&ndash;1.5&times;
                FLC), removing voltage dip on the busbar; (b) IE3+ motor + VSD is the
                Approved Document L 2021 default for AHU fans; (c) future-proofing for
                BMS-driven flow modulation; (d) star-delta requires the motor to be
                delta-rated for 400 V which limits choice in modern catalogues. Document
                the variation if the original spec was star-delta.
              </>
            }
            whyItMatters={
              <>
                Star-delta is largely a legacy starting method now. New BSE installations
                default to VSDs because the energy savings (typically 20&ndash;30 % on
                fan/pump duty under cube law) and the soft-start benefit usually pay for
                the VSD inside three years. The HNC engineer must make the comparison
                explicit on the design submission, not default to the contractor&rsquo;s
                proposal.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Star (Y) connection: V&#x2097; = &radic;3 &times; V&#x209a;, I&#x2097; = I&#x209a; — gives access to neutral, used for distribution.',
              'Delta (D) connection: V&#x2097; = V&#x209a;, I&#x2097; = &radic;3 &times; I&#x209a; — three-wire only, used for motor running and transformer primary.',
              'UK distribution: 400 V line / 230 V phase derived from a star secondary with neutral brought out.',
              'Vector groups (Dyn11 etc.): D=delta primary, y=star secondary, n=neutral brought out, 11 = 30&deg; lagging phase shift in clock notation.',
              'Star-delta starting: motor starts in star (1/3 voltage, 1/3 current, 1/3 torque) then switches to delta for full running power — used on lightly-loaded fan/pump starts.',
              'Star is BS 7671 312.2.1.1 origin for TN-S / TN-C-S earthing — the star-point earth is the system reference.',
              'Delta windings provide a circulating path for triplen harmonics — a key reason transformer primaries are delta on harmonic-rich downstream loads.',
              'Modern BSE practice prefers VSDs to star-delta for soft-starting fan/pump motors above ~7.5 kW.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3.7
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4.2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_1;
