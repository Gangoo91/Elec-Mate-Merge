/**
 * Module 3 · Section 1 · Subsection 4 — Parallel Circuits
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Multi-path circuits — the model behind ring finals, parallel luminaire strings,
 *   distribution-board outgoing ways and any redundant-supply or PFC capacitor bank.
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

const TITLE = 'Parallel Circuits - HNC Module 3 Section 1.4';
const DESCRIPTION =
  'Master parallel circuit analysis for building services: voltage distribution, current division, equivalent resistance calculations, and practical applications in lighting, socket outlets, and distribution boards.';

const quickCheckQuestions = [
  {
    id: 'parallel-voltage',
    question: 'In a parallel circuit, what happens to voltage across each branch?',
    options: [
      'It divides equally between branches',
      'It is the same across all branches',
      'It depends on resistance values',
      'It increases with each branch',
    ],
    correctIndex: 1,
    explanation:
      'In parallel circuits, all branches share the same two connection points, so the voltage across each branch is identical - this is a fundamental characteristic of parallel connections.',
  },
  {
    id: 'parallel-current',
    question:
      'Three identical 100 ohm resistors are connected in parallel. What is the total resistance?',
    options: ['300 ohms', '100 ohms', '33.3 ohms', '50 ohms'],
    correctIndex: 2,
    explanation:
      'For identical resistors in parallel: RT = R/n = 100/3 = 33.3 ohms. Alternatively: 1/RT = 1/100 + 1/100 + 1/100 = 3/100, so RT = 100/3 = 33.3 ohms',
  },
  {
    id: 'current-divider',
    question:
      'A 10A current divides between two parallel branches: 30 ohms and 60 ohms. What current flows through the 30 ohm branch?',
    options: ['3.33A', '5A', '6.67A', '10A'],
    correctIndex: 2,
    explanation:
      'Using the current divider rule: I1 = IT x (R2/(R1+R2)) = 10 x (60/(30+60)) = 10 x (60/90) = 6.67A. More current flows through the lower resistance path.',
  },
  {
    id: 'lighting-circuit',
    question: 'Why are lighting circuits wired in parallel rather than series?',
    options: [
      "It's cheaper to install",
      'Each lamp gets full voltage and operates independently',
      'It uses less cable',
      'Series wiring is not allowed',
    ],
    correctIndex: 1,
    explanation:
      'Parallel wiring ensures each lamp receives full supply voltage (230V) and operates independently - if one lamp fails, others continue working. Series wiring would divide voltage and cause all lamps to fail if one breaks.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the defining characteristic of a parallel circuit?',
    options: [
      'Components share the same current',
      'Components are connected end-to-end',
      'Components share the same voltage',
      'Total resistance equals the sum of all resistors',
    ],
    correctAnswer: 2,
    explanation:
      'In a parallel circuit, all components are connected across the same two points, so they all share the same voltage. Current divides between branches.',
  },
  {
    id: 2,
    question: 'Calculate the total resistance of 20 ohm and 30 ohm resistors in parallel.',
    options: ['50 ohms', '25 ohms', '12 ohms', '10 ohms'],
    correctAnswer: 2,
    explanation:
      'Using product over sum: RT = (20 x 30)/(20 + 30) = 600/50 = 12 ohms. The parallel combination is always less than the smallest individual resistor.',
  },
  {
    id: 3,
    question:
      'A ring final circuit has two parallel 2.5mm squared cable paths. What is the effective cable size?',
    options: ['2.5mm squared', '5mm squared', '1.25mm squared', '3.75mm squared'],
    correctAnswer: 1,
    explanation:
      'With two parallel cable paths, the effective cross-sectional area doubles: 2.5mm squared + 2.5mm squared = 5mm squared, giving the ring final its higher current capacity.',
  },
  {
    id: 4,
    question:
      'What happens to total circuit resistance when another resistor is added in parallel?',
    options: ['It increases', 'It decreases', 'It stays the same', 'It doubles'],
    correctAnswer: 1,
    explanation:
      'Adding parallel paths always decreases total resistance because current has more routes to flow through. More paths = less overall opposition to current.',
  },
  {
    id: 5,
    question: 'A 230V supply feeds three parallel 1kW heaters. What is the total supply current?',
    options: ['4.35A', '8.7A', '13A', '39A'],
    correctAnswer: 2,
    explanation:
      'Total power = 3 x 1kW = 3kW. Total current I = P/V = 3000/230 = 13A. Each heater draws 4.35A, and these add together for the supply current.',
  },
  {
    id: 6,
    question:
      'Using the current divider rule, if IT = 12A flows into 40 ohm and 80 ohm in parallel, what current flows through the 40 ohm resistor?',
    options: ['4A', '6A', '8A', '12A'],
    correctAnswer: 2,
    explanation:
      'I1 = IT x (R2/(R1+R2)) = 12 x (80/(40+80)) = 12 x (80/120) = 8A. The lower resistance carries the larger current (inverse relationship).',
  },
  {
    id: 7,
    question: 'What is the equivalent resistance of four 100 ohm resistors in parallel?',
    options: ['400 ohms', '100 ohms', '50 ohms', '25 ohms'],
    correctAnswer: 3,
    explanation:
      'For n identical resistors in parallel: RT = R/n = 100/4 = 25 ohms. This is a useful shortcut for identical resistors.',
  },
  {
    id: 8,
    question:
      'In a distribution board, why are final circuits connected in parallel rather than series?',
    options: [
      'To share the load equally',
      'To ensure each circuit gets full voltage and can be individually protected',
      'To reduce cable costs',
      'Series connection is prohibited by regulations',
    ],
    correctAnswer: 1,
    explanation:
      "Parallel connection ensures each final circuit receives full supply voltage (230V) and can be individually protected by its own MCB. Fault in one circuit doesn't affect others.",
  },
  {
    id: 9,
    question:
      'A lighting circuit has 8 luminaires, each drawing 0.5A at 230V. What is the circuit current?',
    options: ['0.5A', '2A', '4A', '8A'],
    correctAnswer: 2,
    explanation:
      'In parallel, currents add: IT = 8 x 0.5A = 4A. Each luminaire gets full voltage and draws its rated current, with all currents combining at the supply.',
  },
  {
    id: 10,
    question:
      'Two cables supply a distribution board: each has 0.1 ohm resistance. What is the effective supply resistance?',
    options: ['0.2 ohms', '0.1 ohms', '0.05 ohms', '0.15 ohms'],
    correctAnswer: 2,
    explanation:
      'Parallel cables: RT = (R x R)/(R + R) = (0.1 x 0.1)/(0.1 + 0.1) = 0.01/0.2 = 0.05 ohms. Or for identical resistors: RT = R/n = 0.1/2 = 0.05 ohms',
  },
];

const faqs = [
  {
    question: 'Why is parallel resistance always less than the smallest individual resistor?',
    answer:
      'Adding parallel branches provides additional paths for current flow. More paths mean less total opposition (resistance) to current. Think of it like adding lanes to a motorway - more lanes reduce congestion even though each lane has the same capacity.',
  },
  {
    question: 'How do I remember the current divider rule?',
    answer:
      "Current takes the path of least resistance - literally. The formula I1 = IT x (R2/(R1+R2)) shows the current through R1 depends on R2 (the other resistance). Remember: lower resistance = higher current. It's the opposite fraction to what you might expect.",
  },
  {
    question: 'Why do ring final circuits use parallel cable paths?',
    answer:
      'A ring final creates two parallel paths from the consumer unit to any socket. This effectively doubles the cable capacity (2.5mm squared becomes 5mm squared effective) and reduces voltage drop. BS 7671 permits 32A protection because of this parallel arrangement.',
  },
  {
    question: 'What happens if one branch of a parallel circuit fails open?',
    answer:
      "If one branch opens (fails), the other branches continue to operate normally at full voltage. Only the failed branch stops conducting. This is why parallel circuits are preferred for lighting and socket outlets - one failure doesn't affect others.",
  },
  {
    question: 'How do I calculate parallel resistance quickly for two resistors?',
    answer:
      "Use the product-over-sum formula: RT = (R1 x R2)/(R1 + R2). For example, 60 ohms and 40 ohms: RT = (60 x 40)/(60 + 40) = 2400/100 = 24 ohms. For identical resistors, it's even simpler: RT = R/n.",
  },
  {
    question: 'Why must we balance loads across phases in three-phase distribution?',
    answer:
      'Unbalanced loads cause neutral current, increasing losses and potentially overloading the neutral conductor. Good practice distributes single-phase loads evenly across all three phases, effectively creating parallel loads on each phase to share the total building load.',
  },
];

const HNCModule3Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 4"
            title="Parallel Circuits"
            description="Understanding voltage distribution, current division, and equivalent resistance in parallel networks"
            tone="purple"
          />

          <TLDR
            points={[
              'You can recognise a parallel circuit (multiple paths, common voltage) and apply 1/R_T = 1/R₁ + 1/R₂ + 1/R₃ to find the equivalent resistance.',
              'You can use the current-divider rule to predict how load current splits between branches — the basis for sizing tap-off circuits at a distribution board.',
              'You can spot why a ring final has lower effective resistance than a single radial of the same conductor size, and why that matters for fault current.',
              'You can predict total currents on a parallel bank of luminaires or socket outlets and pick the right MCB rating.',
              'You can use parallel analysis on PFC capacitor banks, parallel UPS feeds and any redundant-supply arrangement.',
            ]}
          />

          <RegsCallout
            source="BS 7671 — Section 433 (Protection against overload current)"
            clause="The nominal current or current setting of the protective device (I_n) shall be greater than or equal to the design current of the circuit (I_b), and less than or equal to the lowest current-carrying capacity (I_z) of any conductor in the circuit."
            meaning={
              <>
                On a parallel-fed distribution board the design current at any point is the
                sum of the branch currents at that node — derived directly from the
                parallel-circuit current-divider analysis. Get the parallel arithmetic right
                and the Iᵇ ≤ Iₙ ≤ I_z chain holds for every device in the board.
              </>
            }
            cite="Source: BS 7671 (latest edition incl. A4:2026) Regulation 433.1.1."
          />

          <LearningOutcomes
            outcomes={[
              'Identify parallel circuit configurations and their characteristics',
              'Calculate total resistance using reciprocal and product/sum methods',
              'Apply the current divider rule to determine branch currents',
              'Analyse lighting circuits as parallel networks',
              'Understand ring final circuit parallel paths',
              'Design balanced loads for distribution boards',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Multiple paths for current. Same voltage across each branch, currents add, total resistance always less than the smallest branch."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage:</strong> Same across all parallel branches
              </li>
              <li>
                <strong>Current:</strong> Divides between branches (IT = I1 + I2 + I3...)
              </li>
              <li>
                <strong>Resistance:</strong> 1/RT = 1/R1 + 1/R2 + 1/R3...
              </li>
              <li>
                <strong>Total R:</strong> Always less than smallest individual R
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits:</strong> Each luminaire at full voltage
              </li>
              <li>
                <strong>Socket outlets:</strong> Independent operation
              </li>
              <li>
                <strong>Ring finals:</strong> Parallel cable paths for capacity
              </li>
              <li>
                <strong>Distribution boards:</strong> Parallel final circuits
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Parallel Circuit Fundamentals">
            <p>
              In a parallel circuit, components are connected across the same two points, creating
              multiple paths for current flow. This is the most common configuration in building
              electrical installations.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Key Parallel Circuit Rules</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VT = V1 = V2 = V3</strong> — Voltage is the SAME
              </li>
              <li>
                <strong>IT = I1 + I2 + I3</strong> — Currents ADD up
              </li>
              <li>
                <strong>RT &lt; R<sub>smallest</sub></strong> — Total R is LESS than the smallest
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Why voltage is the same across all branches:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All branches connect to the same two nodes (connection points)</li>
              <li>Voltage is a potential difference between two points</li>
              <li>Each branch experiences the full supply voltage</li>
              <li>This is why 230V luminaires work correctly on lighting circuits</li>
            </ul>
            <p className="text-sm font-medium text-white">Why current divides between branches:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current has multiple paths from source to load</li>
              <li>More current flows through lower resistance paths</li>
              <li>Total current equals the sum of all branch currents</li>
              <li>Using Kirchhoff's Current Law: current in = current out at any node</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Parallel circuits provide redundancy - if one branch fails
              open, the others continue operating normally.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Calculating Total Resistance">
            <p>
              Calculating equivalent resistance is essential for determining circuit current and
              power consumption. There are two main methods depending on the number of resistors.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Method 1: Reciprocal Formula (Any Number)</p>
            <p>
              <strong>1/RT = 1/R1 + 1/R2 + 1/R3 + ...</strong> Calculate the sum of reciprocals,
              then take the reciprocal of the result.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Example:</strong> 20 ohms, 30 ohms, and 60 ohms in parallel
              </li>
              <li>1/RT = 1/20 + 1/30 + 1/60 = 0.05 + 0.0333 + 0.0167 = 0.1</li>
              <li>RT = 1/0.1 = <strong>10 ohms</strong></li>
              <li>Note: 10 ohms &lt; 20 ohms (the smallest resistor)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Method 2: Product Over Sum (Two Resistors Only)</p>
            <p>
              <strong>RT = (R1 x R2) / (R1 + R2)</strong> — Quick method for two resistors:
              multiply then divide by sum.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Example:</strong> 40 ohms and 60 ohms in parallel
              </li>
              <li>RT = (40 x 60) / (40 + 60) = 2400 / 100 = <strong>24 ohms</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Method 3: Identical Resistors Shortcut</p>
            <p>
              <strong>RT = R / n</strong> (where n = number of identical resistors)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Example:</strong> Four 100 ohm resistors in parallel
              </li>
              <li>RT = 100 / 4 = <strong>25 ohms</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Parallel Resistance Quick Reference</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two 100 ohm:</strong> 50 ohms (R/n = 100/2)
              </li>
              <li>
                <strong>Three 100 ohm:</strong> 33.3 ohms (R/n = 100/3)
              </li>
              <li>
                <strong>100 ohm + 100 ohm:</strong> 50 ohms (Product/sum)
              </li>
              <li>
                <strong>100 ohm + 200 ohm:</strong> 66.7 ohms ((100x200)/(100+200))
              </li>
              <li>
                <strong>60 ohm + 40 ohm:</strong> 24 ohms ((60x40)/(60+40))
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Current Divider Rule">
            <p>
              The current divider rule calculates how total current splits between parallel
              branches. Understanding this is crucial for load balancing and cable sizing in
              distribution systems.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Current Divider Formula (Two Branches)</p>
            <p>
              <strong>I1 = IT x (R2 / (R1 + R2))</strong> — Note: Current through R1 uses R2 in
              the numerator (opposite to voltage divider).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>For R1 branch:</strong> I1 = IT x R2 / (R1 + R2)
              </li>
              <li>
                <strong>For R2 branch:</strong> I2 = IT x R1 / (R1 + R2)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Alternative Method: Using Ohm's Law</p>
            <p>
              Since voltage is the same across all branches, you can calculate each branch current
              directly: <strong>I1 = V / R1 and I2 = V / R2</strong>. This is often easier when
              you know the supply voltage.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Worked Example: Current Division</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> IT = 15A divides between 20 ohms and 30 ohms
              </li>
              <li>
                <strong>Method 1 - Current divider rule:</strong>
              </li>
              <li>I1 (through 20 ohm) = 15 x (30/(20+30)) = 15 x 0.6 = <strong>9A</strong></li>
              <li>I2 (through 30 ohm) = 15 x (20/(20+30)) = 15 x 0.4 = <strong>6A</strong></li>
              <li>Check: 9A + 6A = 15A (currents add up)</li>
              <li>
                <strong>Method 2 - Using Ohm's Law:</strong>
              </li>
              <li>RT = (20x30)/(20+30) = 12 ohms; V = IT x RT = 15 x 12 = 180V</li>
              <li>I1 = V/R1 = 180/20 = <strong>9A</strong>; I2 = V/R2 = 180/30 = <strong>6A</strong></li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Lower resistance carries higher current. The 20 ohm
              resistor (lower R) carries 9A while the 30 ohm resistor carries only 6A.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Application 1: Lighting Circuits">
            <p>
              All luminaires on a lighting circuit are connected in parallel, ensuring each
              receives full 230V supply and operates independently.
            </p>
            <p className="text-sm font-medium text-white">Worked Example: Office Lighting Analysis</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 12 LED luminaires, each 45W at 230V
              </li>
              <li>Luminaire resistance: R = V²/P = 230²/45 = 1176 ohms</li>
              <li>Current per luminaire: I = P/V = 45/230 = 0.196A</li>
              <li>Total circuit current: IT = 12 x 0.196A = <strong>2.35A</strong></li>
              <li>Total power: PT = 12 x 45W = <strong>540W</strong></li>
              <li>Combined resistance: RT = 1176/12 = <strong>98 ohms</strong></li>
              <li>Well within 6A MCB rating for lighting circuit</li>
            </ul>
            <p>
              <strong>Practical note:</strong> Even if one luminaire fails, others continue working
              - a key benefit of parallel connection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application 2: Ring Final Circuit">
            <p>
              A ring final provides two parallel cable paths to each socket, effectively doubling
              the cable capacity and reducing voltage drop.
            </p>
            <p className="text-sm font-medium text-white">Worked Example: Ring Circuit Calculation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 2.5mm squared ring, 50m total length, 32A load at far point
              </li>
              <li>Cable resistance: 7.41 milliohms/m</li>
              <li>
                <strong>With ring (two parallel paths):</strong>
              </li>
              <li>Path 1: 25m from one direction = 25 x 7.41 = 185 milliohms</li>
              <li>Path 2: 25m from other direction = 25 x 7.41 = 185 milliohms</li>
              <li>Parallel R: (185 x 185)/(185 + 185) = <strong>92.5 milliohms</strong></li>
              <li>Each path carries 16A (current divides equally)</li>
              <li>Voltage drop: V = 16A x 0.0925 ohms x 2 = <strong>2.96V</strong></li>
              <li>Only 1.3% drop (within 5% limit)</li>
              <li>
                <strong>If broken to radial:</strong> V = 32A x (50m x 0.00741) x 2 = 23.7V (10.3% - fails!)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Application 3: Distribution Board Load Balancing">
            <p>
              All final circuits connect in parallel at the distribution board. In three-phase
              systems, loads must be balanced across phases.
            </p>
            <p className="text-sm font-medium text-white">Worked Example: Three-Phase Load Balancing</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loads to distribute:</strong>
              </li>
              <li>Lighting: 2kW, 1.8kW, 2.2kW (three circuits)</li>
              <li>Sockets: 3kW, 3.5kW, 3.2kW (three circuits)</li>
              <li>HVAC: 5kW (single circuit)</li>
              <li>
                <strong>Balanced allocation:</strong>
              </li>
              <li>L1: 2kW + 3kW = 5kW</li>
              <li>L2: 1.8kW + 3.2kW + 5kW* = 5kW (*or HVAC on L2)</li>
              <li>L3: 2.2kW + 3.5kW = 5.7kW</li>
              <li>
                <strong>Phase currents at 230V:</strong> IL1 = 21.7A, IL2 = 21.7A, IL3 = 24.8A
              </li>
              <li>Reasonably balanced (max 14% imbalance)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Load Distribution Summary</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L1:</strong> Lighting 1, Sockets 1 — 5.0kW — 21.7A
              </li>
              <li>
                <strong>L2:</strong> Lighting 2, Sockets 3 — 5.0kW — 21.7A
              </li>
              <li>
                <strong>L3:</strong> Lighting 3, Sockets 2 — 5.7kW — 24.8A
              </li>
              <li>
                <strong>Total:</strong> All circuits in parallel — 15.7kW — ~23A avg
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Parallel Heater Installation</p>
            <p>
              <strong>Question:</strong> Three 2kW panel heaters are to be installed on a single
              circuit at 230V. Calculate the total current and recommend the MCB rating.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual heater current: I = P/V = 2000/230 = 8.7A each</li>
              <li>Heaters in parallel, currents add: IT = 8.7 + 8.7 + 8.7 = <strong>26.1A</strong></li>
              <li>Individual heater resistance: R = V/I = 230/8.7 = 26.4 ohms</li>
              <li>Total resistance: RT = 26.4/3 = <strong>8.8 ohms</strong></li>
              <li>Check: I = V/RT = 230/8.8 = 26.1A (confirmed)</li>
              <li>Recommend: 32A MCB with 4mm squared cable</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Parallel Supply Cables</p>
            <p>
              <strong>Question:</strong> Two 35mm squared cables (R = 0.524 milliohms/m) run 80m
              in parallel to supply a sub-board. Calculate the combined resistance and voltage drop
              at 100A.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single cable resistance (go + return): R = 80m x 2 x 0.524 milliohms = 83.8 milliohms = 0.0838 ohms</li>
              <li>Parallel cables: RT = 0.0838/2 = <strong>0.0419 ohms</strong></li>
              <li>Current per cable: 100A / 2 = 50A each</li>
              <li>Voltage drop: V = IT x RT = 100 x 0.0419 = <strong>4.19V</strong></li>
              <li>Percentage: (4.19/230) x 100 = <strong>1.82%</strong> ✓ within 5% limit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Mixed Load Analysis</p>
            <p>
              <strong>Question:</strong> A 230V circuit supplies: 6 LED downlights (10W each), 2
              decorative pendants (40W each), and 1 feature wall light (60W). Calculate total
              current and verify 6A MCB is adequate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LED downlights: 6 x 10W = 60W, I = 60/230 = 0.26A</li>
              <li>Pendants: 2 x 40W = 80W, I = 80/230 = 0.35A</li>
              <li>Wall light: 1 x 60W = 60W, I = 60/230 = 0.26A</li>
              <li>All loads in parallel, currents add: IT = 0.26 + 0.35 + 0.26 = <strong>0.87A</strong></li>
              <li>Total power: PT = 60 + 80 + 60 = <strong>200W</strong></li>
              <li>0.87A is well within 6A MCB capacity. Could add many more luminaires within rating</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Parallel Circuit Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1/RT = 1/R1 + 1/R2 + 1/R3...</strong> - General formula
              </li>
              <li>
                <strong>RT = (R1 x R2)/(R1 + R2)</strong> - Two resistors (product/sum)
              </li>
              <li>
                <strong>RT = R/n</strong> - n identical resistors
              </li>
              <li>
                <strong>IT = I1 + I2 + I3...</strong> - Total current
              </li>
              <li>
                <strong>I1 = IT x R2/(R1 + R2)</strong> - Current divider
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Principles to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage is the <strong>same</strong> across all parallel branches</li>
              <li>Current <strong>divides</strong> - more through lower resistance</li>
              <li>Total resistance is <strong>always less</strong> than the smallest branch</li>
              <li>Adding parallel paths <strong>decreases</strong> total resistance</li>
              <li>If one branch opens, others <strong>continue working</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common parallel circuit mistakes"
            whatHappens={
              <>
                Adding resistances directly (that's series). Forgetting to take the reciprocal at
                the end of the 1/RT calculation. Current-divider confusion: I1 uses R2 in the
                numerator, not R1. Expecting RT to be greater than the smallest resistor (it's
                always less in parallel).
              </>
            }
            doInstead={
              <>
                Use the reciprocal sum, then invert. For two resistors use product/sum. For
                identical use R/n. Cross-check by computing branch currents from V/R and adding —
                they must equal IT.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing a 4-way distribution board feeding a tenant lighting installation"
            situation={
              <>
                A small office tenant has four parallel lighting circuits feeding from one
                MCB-protected sub-board: 5 A, 4 A, 6 A and 3 A under design conditions. You
                need to choose the upstream device for the sub-board incoming feed.
              </>
            }
            whatToDo={
              <>
                Apply the parallel-current rule: I_T = I₁ + I₂ + I₃ + I₄ = 5 + 4 +
                6 + 3 = 18 A. Pick the next standard device above 18 A — a 20 A Type B
                MCB — and check the upstream cable I_z is at least 20 A under installation
                method, ambient and grouping factors. Confirm voltage drop on the longest
                branch using mV/A/m × length × I_b. Allow diversity per BS 7671
                Appendix 1 if all four circuits are not switched on simultaneously.
              </>
            }
            whyItMatters={
              <>
                A distribution board is just parallel branches with a common bus. Without the
                parallel-circuit model you cannot defend the upstream device choice, and an
                under-sized incomer will nuisance-trip on a Monday morning when every desk
                lamp comes on.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Parallel circuits share a common voltage across every branch (V_T = V₁ = V₂ = V₃) — the model behind any distribution board, ring final or socket bank.',
              'Total resistance: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃ + ... — always less than the smallest single R.',
              'Two-resistor shortcut: R_T = (R₁ × R₂) / (R₁ + R₂) — quick to use on parallel sub-mains and dual-source feeds.',
              'Currents add: I_T = I₁ + I₂ + I₃ — the basis for upstream device sizing on a distribution board.',
              'Current-divider rule: Iₙ = I_T × (R_T / Rₙ) — lower-resistance branch carries more current.',
              'Parallel reduces effective conductor resistance — why a ring final has roughly half the loop impedance of a single radial of the same conductor.',
              'Parallel paths give redundancy — lose one branch and the rest keep working, the design model for dual-feed UPS and dual-source switchgear.',
              'Diversity (BS 7671 Appendix 1) lets you size the upstream device below the simple sum of branch currents when not all loads run together.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Series Circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Kirchhoff's Laws
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_4;
