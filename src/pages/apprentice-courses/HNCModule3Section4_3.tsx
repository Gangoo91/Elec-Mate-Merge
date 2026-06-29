/**
 * Module 3 · Section 4 · Subsection 3 — Balanced and Unbalanced Loads
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Three-phase load symmetry — neutral current behaviour, voltage asymmetry
 *   effects on motors, BS EN 50160 unbalance limits, distribution-board phase-balancing
 *   strategy. The arithmetic for healthy three-phase BSE distribution.
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

const TITLE = 'Balanced and Unbalanced Loads - HNC Module 3 Section 4.3';
const DESCRIPTION =
  'Master balanced and unbalanced three-phase load analysis: neutral current calculations, voltage asymmetry effects, load balancing strategies, and distribution board design for building services.';

const quickCheckQuestions = [
  {
    id: 'balanced-neutral',
    question:
      'In a perfectly balanced star-connected three-phase system, what is the neutral current?',
    options: [
      'Half the line current',
      'Equal to line current',
      '√3 times line current',
      'Zero',
    ],
    correctIndex: 3,
    explanation:
      'In a balanced star system, the three phase currents are equal in magnitude but displaced by 120°. They sum vectorially to zero, meaning no current flows in the neutral conductor.',
  },
  {
    id: 'phase-angle',
    question:
      'What is the phase angle separation between currents in a balanced three-phase system?',
    options: [
      '90°',
      '180°',
      '120°',
      '60°',
    ],
    correctIndex: 2,
    explanation:
      'In a balanced three-phase system, each phase is separated by 120° (360° ÷ 3 phases = 120°). This equal angular displacement is what causes the currents to cancel in the neutral.',
  },
  {
    id: 'unbalance-effect',
    question: 'What is the primary effect of significant load unbalance on a three-phase system?',
    options: [
      'Neutral current flow and voltage asymmetry',
      'A reduction in the line voltage across all three phases',
      'An increase in the supply frequency above 50 Hz',
      'Cancellation of all harmonic currents in the neutral',
    ],
    correctIndex: 0,
    explanation:
      'Load unbalance causes the phase currents to no longer cancel in the neutral, resulting in neutral current flow. This also creates voltage asymmetry between phases.',
  },
  {
    id: 'neutral-sizing',
    question:
      'In commercial buildings with predominantly single-phase non-linear loads, how should the neutral be sized?',
    options: [
      'At half the phase conductor cross-section',
      'Up to double the phase conductor size',
      'Always smaller than the line conductors',
      'It can be omitted entirely on these systems',
    ],
    correctIndex: 1,
    explanation:
      'Non-linear loads (computers, LED drivers) generate triplen harmonics (3rd, 9th, 15th) that add in the neutral rather than cancel. The neutral may need to be oversized, potentially up to 200% of phase size.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What defines a 'balanced' three-phase load?",
    options: [
      'All loads operate at the same power factor',
      'Each phase has equal impedance with the same phase angle',
      'The total power on each phase is exactly 10kW',
      'All loads are connected in delta configuration',
    ],
    correctAnswer: 1,
    explanation:
      'A balanced load has equal impedance magnitude and identical phase angles on each phase. This results in equal currents displaced by 120°, causing them to cancel in the neutral.',
  },
  {
    id: 2,
    question:
      'A star-connected load has phase currents of IR = 20A, IY = 20A, and IB = 20A, each at their respective phase angles. What is the neutral current?',
    options: [
      '20A',
      '60A',
      '0A',
      '34.6A',
    ],
    correctAnswer: 2,
    explanation:
      'With equal currents at 120° phase separation, the phasor sum is zero. IR + IY + IB = 0 when balanced. This is the fundamental principle of balanced three-phase systems.',
  },
  {
    id: 3,
    question:
      'In a star-connected system, if only the red phase carries 30A while yellow and blue carry 0A, what is the neutral current?',
    options: [
      '17.3A',
      '0A',
      '10A',
      '30A',
    ],
    correctAnswer: 3,
    explanation:
      'With only one phase loaded, the neutral must carry the full return current. IN = IR = 30A. This is the worst-case unbalance scenario.',
  },
  {
    id: 4,
    question: 'What is voltage unbalance typically expressed as?',
    options: [
      'The ratio of negative sequence to positive sequence voltage, as a percentage',
      'The difference between line voltage and phase voltage in volts',
      'The total harmonic distortion of the supply waveform',
      'The phase angle error away from 120° between phases',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage Unbalance Factor (VUF) = (V- / V+) × 100%, where V- is negative sequence and V+ is positive sequence voltage. This is the IEC standard definition.',
  },
  {
    id: 5,
    question: 'What is the maximum recommended voltage unbalance for most equipment?',
    options: [
      '1%',
      '2%',
      '10%',
      '5%',
    ],
    correctAnswer: 1,
    explanation:
      'IEC and BS EN standards recommend keeping voltage unbalance below 2%. Above this, motors experience increased heating, vibration, and reduced efficiency.',
  },
  {
    id: 6,
    question:
      'A distribution board has: Red = 8kW, Yellow = 6kW, Blue = 10kW single-phase loads at unity power factor. What are the phase currents?',
    options: [
      'Red: 26.1A, Yellow: 34.8A, Blue: 43.5A',
      'Red: 43.5A, Yellow: 26.1A, Blue: 34.8A',
      'Red: 34.8A, Yellow: 26.1A, Blue: 43.5A',
      'Red: 8.0A, Yellow: 6.0A, Blue: 10.0A',
    ],
    correctAnswer: 2,
    explanation:
      'At 230V: IR = 8000/230 = 34.8A, IY = 6000/230 = 26.1A, IB = 10000/230 = 43.5A. The unbalance is 17.4A between highest and lowest loaded phases.',
  },
  {
    id: 7,
    question: 'Why do triplen harmonics (3rd, 9th, 15th...) add in the neutral rather than cancel?',
    options: [
      'They are displaced by 120° like the fundamental currents',
      'They flow only in the line conductors, not the neutral',
      'They are filtered out by the distribution transformer',
      'They are all in phase with each other across the three phases',
    ],
    correctAnswer: 3,
    explanation:
      'Triplen harmonics (multiples of 3) are zero-sequence harmonics. They are in phase across all three phases, so instead of cancelling (like fundamental currents), they add arithmetically in the neutral.',
  },
  {
    id: 8,
    question:
      'What is the recommended practice for balancing single-phase loads across a three-phase distribution board?',
    options: [
      'Distribute loads so each phase carries approximately equal current',
      'Connect all the largest loads to a single dedicated phase',
      'Place every lighting circuit on one phase and power on another',
      'Leave one phase unloaded to act as a spare for future use',
    ],
    correctAnswer: 0,
    explanation:
      'Single-phase loads should be distributed across all three phases to achieve approximately equal loading. This minimises neutral current and voltage unbalance.',
  },
  {
    id: 9,
    question:
      'A three-phase induction motor is supplied with 3% voltage unbalance. What is the approximate increase in winding temperature rise?',
    options: [
      '9%',
      '18%',
      '27%',
      '3%',
    ],
    correctAnswer: 1,
    explanation:
      'Motor heating due to voltage unbalance increases approximately as the square of the unbalance percentage × 2. For 3% unbalance: increase ≈ 2 × 3² = 18%. This is why voltage unbalance must be minimised.',
  },
  {
    id: 10,
    question:
      'In a 100A three-phase distribution board for an office building, what neutral size would be appropriate if heavy non-linear loads are expected?',
    options: [
      '50A rated (50% of phase)',
      '100A rated (equal to phase, no oversizing needed)',
      '150-200A rated (150-200% of phase)',
      'No neutral required for non-linear loads',
    ],
    correctAnswer: 2,
    explanation:
      'With significant non-linear loads (IT equipment, LED lighting), triplen harmonics can cause neutral current to exceed phase current. Oversizing to 150-200% of phase rating is prudent practice.',
  },
];

const faqs = [
  {
    question: 'Why does a balanced three-phase load have zero neutral current?',
    answer:
      'In a balanced system, each phase carries equal current but shifted by 120°. When you add three equal vectors at 120° angles, they form a closed triangle and sum to zero. Mathematically: IR∠0° + IY∠-120° + IB∠-240° = 0. This is why the neutral conductor can theoretically be omitted in balanced three-phase systems.',
  },
  {
    question: 'How do I calculate neutral current for an unbalanced load?',
    answer:
      'The neutral current equals the phasor sum of the three phase currents: IN = IR + IY + IB (vectorially). For resistive loads at different magnitudes, you can use: IN = √(IR² + IY² + IB² - IR×IY - IY×IB - IB×IR). For complex impedances, full phasor addition accounting for phase angles is required.',
  },
  {
    question: 'What causes voltage unbalance in building supplies?',
    answer:
      'Main causes include: unequal single-phase loading between phases, asymmetrical transformer impedances, unbalanced supply from the DNO, single-phase faults on the network, and unequal cable impedances due to different run lengths. In buildings, poor load distribution is the most common cause.',
  },
  {
    question: 'Why are triplen harmonics a problem in modern buildings?',
    answer:
      'Non-linear loads like computers, LED drivers, and variable speed drives generate harmonic currents, particularly the 3rd harmonic. Unlike fundamental currents which cancel in the neutral, triplen harmonics (3rd, 9th, 15th) are zero-sequence and add arithmetically. This can cause neutral current to exceed phase current, potentially overloading undersized neutrals.',
  },
  {
    question: 'How do I balance loads on a distribution board?',
    answer:
      'List all single-phase loads with their currents. Start with the largest loads and allocate them to different phases. Continue adding loads, always placing the next load on the least-loaded phase. Aim for phase currents within 10-15% of each other. Consider future load growth and ensure similar load types (lighting, small power) are spread across phases.',
  },
  {
    question: 'Does BS 7671 specify neutral conductor sizing for harmonic loads?',
    answer:
      'BS 7671 Regulation 523.6.3 requires consideration of harmonic currents when sizing the neutral. Where the third harmonic content exceeds 15%, the neutral should not be smaller than the line conductors. For higher harmonic content (>33%), the neutral may need to be the dominant conductor for current-carrying capacity calculations.',
  },
];

const HNCModule3Section4_3 = () => {
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
            eyebrow="Module 3 · Section 4 · Subsection 3"
            title="Balanced and Unbalanced Loads"
            description="Understanding load distribution, neutral current flow, and the effects of asymmetrical loading in three-phase systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You design distribution boards to keep phase imbalance below 10 % at the busbar — single-phase circuits are spread L1/L2/L3 deliberately, not by accident.',
              'You account for neutral current = vector sum of phase currents on every distribution submain and final circuit.',
              'You investigate voltage unbalance &gt; 2 % under BS EN 50160 — even modest asymmetry can derate motor capacity by 10&ndash;20 % through negative-sequence heating.',
              'You combine load balancing with triplen harmonic management — both add to neutral loading and need joint analysis on modern BSE installations.',
            ]}
          />

          <RegsCallout
            source="BS EN 50160 — Voltage characteristics of electricity supplied by public distribution networks (voltage unbalance)"
            clause="Under normal operating conditions, during each period of one week, 95 % of the 10-minute mean RMS values of the negative-sequence component of the supply voltage shall be within the range 0 to 2 % of the positive-sequence component. In some areas with partly single-phase or two-phase connected installations, unbalances up to about 3 % at the supply terminals occur."
            meaning={
              <>
                BS EN 50160 sets the DNO target of &le; 2 % negative-sequence voltage
                unbalance at the LV PCC. As the BSE designer of a new distribution board
                you take responsibility for keeping the contribution from your installation
                below this threshold by balancing single-phase loads across L1/L2/L3
                during design stage and verifying at commissioning. Asymmetry above 2 %
                derates induction motor torque and accelerates winding failure.
              </>
            }
            cite="Source: BS EN 50160; BS 7671:2018+A4:2026, Reg 331.1 (assessment of harmful effects); IEEE 1159 (voltage characteristics)"
          />

          <LearningOutcomes
            outcomes={[
              'Define balanced and unbalanced three-phase loads',
              'Explain why neutral current is zero in balanced star systems',
              'Calculate neutral current for unbalanced resistive loads',
              'Understand voltage unbalance and its effects on equipment',
              'Apply load balancing strategies to distribution boards',
              'Size neutral conductors accounting for harmonic currents',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Balanced loads cancel in the neutral; unbalance causes neutral current, voltage asymmetry and equipment overheating."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Balanced:</strong> Equal impedance per phase, currents cancel in neutral
              </li>
              <li>
                <strong>Unbalanced:</strong> Unequal loading causes neutral current flow
              </li>
              <li>
                <strong>Effects:</strong> Voltage asymmetry, equipment overheating
              </li>
              <li>
                <strong>Harmonics:</strong> Triplen harmonics add in neutral
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DB design:</strong> Distribute single-phase loads across phases
              </li>
              <li>
                <strong>Neutral sizing:</strong> Consider harmonic content from IT loads
              </li>
              <li>
                <strong>Motor protection:</strong> Voltage unbalance limits critical
              </li>
              <li>
                <strong>Maximum VUF:</strong> Keep below 2% for equipment protection
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Balanced Three-Phase Loads">
            <p>
              A balanced three-phase load is one where each phase has identical impedance - both in
              magnitude and phase angle. This creates equal currents in each phase, displaced by
              120°, which is the ideal operating condition for three-phase systems.
            </p>
            <p className="text-sm font-medium text-white">Characteristics of a balanced load:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Z<sub>R</sub> = Z<sub>Y</sub> = Z<sub>B</sub> (equal impedances)
              </li>
              <li>
                I<sub>R</sub> = I<sub>Y</sub> = I<sub>B</sub> (equal current magnitudes)
              </li>
              <li>Phase currents displaced by exactly 120°</li>
              <li>
                Power delivered equally by each phase: P<sub>phase</sub> = P<sub>total</sub>/3
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Examples of Balanced Loads</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three-phase motors:</strong> Symmetrical windings draw balanced current
              </li>
              <li>
                <strong>Three-phase heaters:</strong> Equal resistance elements on each phase
              </li>
              <li>
                <strong>Balanced transformer banks:</strong> Equal loading on each winding
              </li>
              <li>
                <strong>Three-phase rectifiers:</strong> Symmetrical conversion circuits
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Three-phase motors and industrial equipment are
              designed as balanced loads. Single-phase loads connected to three-phase systems
              inherently create unbalance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Neutral Current in Balanced Star Systems">
            <p>
              In a star-connected balanced load, the neutral current is zero. This is because the
              three phase currents, being equal in magnitude but displaced by 120°, sum vectorially
              to zero.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Mathematical Proof</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>For balanced currents with magnitude I:</li>
              <li>
                I<sub>R</sub> = I∠0°
              </li>
              <li>
                I<sub>Y</sub> = I∠-120°
              </li>
              <li>
                I<sub>B</sub> = I∠-240° (or I∠+120°)
              </li>
              <li>
                Neutral current I<sub>N</sub> = I<sub>R</sub> + I<sub>Y</sub> + I<sub>B</sub>
              </li>
              <li>Converting to rectangular form:</li>
              <li>
                I<sub>R</sub> = I + j0
              </li>
              <li>
                I<sub>Y</sub> = -0.5I - j0.866I
              </li>
              <li>
                I<sub>B</sub> = -0.5I + j0.866I
              </li>
              <li>Sum = (I - 0.5I - 0.5I) + j(0 - 0.866I + 0.866I)</li>
              <li>
                <strong>
                  I<sub>N</sub> = 0 + j0 = 0A
                </strong>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phasor Diagram Visualisation</p>
            <p>Imagine three arrows of equal length, starting from the same point:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                I<sub>R</sub> pointing at 0° (horizontal right)
              </li>
              <li>
                I<sub>Y</sub> pointing at -120° (down and left)
              </li>
              <li>
                I<sub>B</sub> pointing at -240° (up and left)
              </li>
            </ul>
            <p>
              These three vectors form a closed equilateral triangle when placed head-to-tail,
              returning to the starting point - hence their sum is zero.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical implication:</strong> In a perfectly balanced four-wire system, the
              neutral carries no current. This is why three-phase motors (balanced loads) often
              don't require a neutral connection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Unbalanced Loads — Unequal Phase Loading">
            <p>
              An unbalanced load occurs when the three phases do not carry equal currents. This is
              common in building services where numerous single-phase loads are connected to a
              three-phase supply. The degree of unbalance affects system efficiency and equipment
              performance.
            </p>
            <p className="text-sm font-medium text-white">Common causes of unbalance in buildings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-phase loads distributed unevenly across phases</li>
              <li>Large single-phase equipment (lifts, air conditioning units)</li>
              <li>Varying occupancy patterns (one floor heavily loaded)</li>
              <li>Single-phase faults or open conductors</li>
              <li>Poor initial load scheduling during design</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Types of Unbalance</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current unbalance:</strong> Different current magnitudes per phase — e.g.
                R=30A, Y=25A, B=35A
              </li>
              <li>
                <strong>Voltage unbalance:</strong> Different voltage magnitudes per phase — e.g. V
                <sub>R</sub>=235V, V<sub>Y</sub>=228V, V<sub>B</sub>=232V
              </li>
              <li>
                <strong>Phase angle unbalance:</strong> Deviation from 120° separation — e.g.
                angles 0°, -118°, -243°
              </li>
              <li>
                <strong>Single-phasing:</strong> Loss of one phase (extreme unbalance) — blown fuse
                or open conductor
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design target:</strong> In building services, aim to keep phase currents
              within 10-15% of each other. This minimises neutral current and maintains acceptable
              voltage balance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Calculating Neutral Current with Unbalance">
            <p>
              When loads are unbalanced, the phase currents no longer cancel in the neutral. The
              neutral current must be calculated using phasor addition. For resistive loads at unity
              power factor, simplified formulas can be used.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">General Formula (Phasor Addition)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>
                  I<sub>N</sub> = I<sub>R</sub> + I<sub>Y</sub> + I<sub>B</sub>
                </strong>{' '}
                (vector sum)
              </li>
              <li>For resistive loads (unity pf) at different magnitudes:</li>
              <li>
                <strong>
                  I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I
                  <sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I
                  <sub>R</sub>)
                </strong>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Special Cases</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Balanced (I<sub>R</sub>=I<sub>Y</sub>=I<sub>B</sub>=I):</strong> I
                <sub>N</sub> = 0 — currents cancel
              </li>
              <li>
                <strong>One phase loaded (I, 0, 0):</strong> I<sub>N</sub> = I — full current
                returns via neutral
              </li>
              <li>
                <strong>Two phases equally loaded (I, I, 0):</strong> I<sub>N</sub> = I — equal to
                single phase current
              </li>
              <li>
                <strong>Two phases, one double (2I, I, 0):</strong> I<sub>N</sub> = √3 × I —
                neutral exceeds smaller phase
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Worked Example: Unbalanced Resistive Load
            </p>
            <p>
              <strong>Problem:</strong> A distribution board has: Red = 40A, Yellow = 30A, Blue =
              25A (all resistive loads). Calculate neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Using: I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I
                <sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I
                <sub>R</sub>)
              </li>
              <li>
                I<sub>N</sub> = √(40² + 30² + 25² - 40×30 - 30×25 - 25×40)
              </li>
              <li>
                I<sub>N</sub> = √(1600 + 900 + 625 - 1200 - 750 - 1000)
              </li>
              <li>
                I<sub>N</sub> = √(3125 - 2950)
              </li>
              <li>
                I<sub>N</sub> = √175 = <strong>13.2A</strong>
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Even with a 15A difference between highest and lowest
              phase currents, the neutral only carries 13.2A. The neutral current is always less
              than the arithmetic sum.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Effects of Unbalance: Voltage Asymmetry and Overheating">
            <p>
              Load unbalance creates several problems that affect equipment performance, energy
              efficiency, and system reliability. Understanding these effects is essential for
              proper system design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Unbalance Factor (VUF)</p>
            <p>Voltage unbalance is measured using symmetrical components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>
                  VUF = (V<sub>negative</sub> / V<sub>positive</sub>) × 100%
                </strong>
              </li>
              <li>
                Simplified approximation: VUF ≈ (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub>{' '}
                × 100%
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Effects on Three-Phase Equipment</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Induction motors:</strong> Negative sequence currents, increased heating —
                reduced life, derating required
              </li>
              <li>
                <strong>Transformers:</strong> Unequal phase loading — hotspots, reduced capacity
              </li>
              <li>
                <strong>VSDs/Inverters:</strong> Increased DC bus ripple — capacitor stress,
                harmonics
              </li>
              <li>
                <strong>Generators:</strong> Rotor heating, vibration — output derating required
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Motor Heating Due to Voltage Unbalance
            </p>
            <p>The temperature rise in motors increases approximately as:</p>
            <p>
              ΔT<sub>increase</sub> ≈ 2 × (% voltage unbalance)²
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2% VUF → ~8% temperature increase</li>
              <li>3% VUF → ~18% temperature increase</li>
              <li>5% VUF → ~50% temperature increase</li>
            </ul>
            <p>
              <strong>NEMA MG1:</strong> Motors should be derated if voltage unbalance exceeds 1%.
            </p>
            <p className="text-sm font-medium text-white">Other consequences of unbalance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Neutral overheating:</strong> Undersized neutrals may overheat with
                unbalanced loads
              </li>
              <li>
                <strong>Increased losses:</strong> I²R losses increase with unbalanced currents
              </li>
              <li>
                <strong>Nuisance tripping:</strong> Protection devices may trip on unbalanced faults
              </li>
              <li>
                <strong>Reduced power factor:</strong> Negative sequence power appears as reactive
                power
              </li>
              <li>
                <strong>Equipment malfunction:</strong> Sensitive electronics may malfunction
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Standard limits:</strong> BS EN 50160 specifies that voltage unbalance should
              not exceed 2% under normal operating conditions. Many equipment manufacturers specify
              stricter limits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Load Balancing Strategies">
            <p>
              Effective load balancing is achieved during the design phase and maintained through
              proper distribution board scheduling. The goal is to minimise the current difference
              between phases.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Design Phase Strategies</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load scheduling:</strong> Allocate single-phase loads evenly across phases
                during design
              </li>
              <li>
                <strong>Grouping similar loads:</strong> Distribute lighting circuits across all
                three phases
              </li>
              <li>
                <strong>Large load placement:</strong> Connect large single-phase loads to least
                loaded phase
              </li>
              <li>
                <strong>Future capacity:</strong> Allow spare ways on each phase for future loads
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Load Balancing Procedure</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>List all single-phase loads with their design currents</li>
              <li>Sort loads from largest to smallest</li>
              <li>Allocate largest load to any phase (e.g., Red)</li>
              <li>Allocate second largest to different phase (e.g., Yellow)</li>
              <li>Continue allocating each load to the phase with lowest total</li>
              <li>Check final balance - aim for within 10-15% variation</li>
              <li>Adjust allocation if necessary by swapping similar-sized loads</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Operational Strategies</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Monitoring:</strong> Regular current measurements on each phase
              </li>
              <li>
                <strong>Load transfer:</strong> Move circuits between phases if unbalance develops
              </li>
              <li>
                <strong>Static VAR compensators:</strong> Electronic balancing for critical loads
              </li>
              <li>
                <strong>Active filters:</strong> Power electronic compensation systems
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Worked Example: DB Load Schedule</p>
            <p>
              <strong>Problem:</strong> Allocate these loads across three phases: 20A, 15A, 12A,
              10A, 8A, 6A, 5A, 4A
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with empty phases: R=0, Y=0, B=0</li>
              <li>Add 20A → R=20, Y=0, B=0</li>
              <li>Add 15A → R=20, Y=15, B=0</li>
              <li>Add 12A → R=20, Y=15, B=12</li>
              <li>Add 10A → R=20, Y=15, B=22 (B was lowest)</li>
              <li>Add 8A → R=20, Y=23, B=22 (Y was lowest)</li>
              <li>Add 6A → R=26, Y=23, B=22 (R was lowest)</li>
              <li>Add 5A → R=26, Y=23, B=27 (B was lowest)</li>
              <li>Add 4A → R=26, Y=27, B=27 (Y was lowest)</li>
              <li>
                <strong>Final: R=26A, Y=27A, B=27A</strong> — excellent balance: only 1A variation
                (3.7%)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> In existing installations, use a clamp meter to
              measure phase currents during peak load. If unbalance exceeds 15%, consider relocating
              circuits.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Single-Phase Loads on Three-Phase Systems">
            <p>
              Most building loads are single-phase - lighting, socket outlets, small equipment.
              Connecting these to a three-phase system requires careful consideration of load
              distribution and neutral conductor sizing.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Connection Options</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase-to-Neutral:</strong> 230V — standard single-phase loads
              </li>
              <li>
                <strong>Phase-to-Phase:</strong> 400V — single-phase 400V loads (rare)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">The Neutral Problem</p>
            <p>
              When single-phase loads are connected phase-to-neutral, the neutral must carry the
              return current. With unbalanced loading, significant neutral current flows. With
              non-linear loads, the neutral can carry more current than any phase.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Harmonic Content in Modern Buildings
            </p>
            <p>
              Non-linear loads (computers, LED drivers, electronic equipment) generate harmonic
              currents:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fundamental (50Hz):</strong> Cancels in balanced neutral
              </li>
              <li>
                <strong>3rd harmonic (150Hz):</strong> Adds arithmetically in neutral
              </li>
              <li>
                <strong>5th, 7th:</strong> Cancel like fundamental (positive/negative sequence)
              </li>
              <li>
                <strong>9th, 15th:</strong> Add in neutral (triplen harmonics)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Triplen Harmonic Warning</p>
            <p>
              In an office building with computers on each phase drawing equal fundamental current
              but 50% third harmonic content, the neutral current from triplen harmonics alone
              equals 1.5× the phase fundamental current. Combined with any unbalance, the neutral
              can significantly exceed phase current.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Modern practice:</strong> For buildings with significant IT loads or LED
              lighting, consider the neutral as a current-carrying conductor and size it at least
              equal to, or larger than, the phase conductors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Building Services: DB Load Distribution and Neutral Sizing">
            <p>
              Practical application of load balancing principles in building services requires
              systematic distribution board design and appropriate neutral conductor sizing based on
              expected load characteristics.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Distribution Board Design Principles
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separate essential and non-essential loads</li>
              <li>Group similar load types (lighting, small power, mechanical)</li>
              <li>Balance phases within each DB and across the installation</li>
              <li>Allow 20-25% spare capacity for future loads</li>
              <li>Consider metering requirements per circuit/phase</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              BS 7671 Neutral Sizing Requirements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0 - 15% third harmonic:</strong> Based on phase size (can be reduced) —
                Reg. 523.6.3
              </li>
              <li>
                <strong>15 - 33%:</strong> Neutral = phase conductor size — Reg. 523.6.3
              </li>
              <li>
                <strong>&gt;33%:</strong> Neutral is sizing conductor (may exceed phase) — Reg.
                523.6.3
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Building Load Characteristics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Industrial (motors):</strong> Typical THD &lt;15% — neutral 50-100% of
                phase
              </li>
              <li>
                <strong>Residential:</strong> Typical THD 15-25% — neutral 100% of phase
              </li>
              <li>
                <strong>Commercial office:</strong> Typical THD 25-40% — neutral 100-150% of phase
              </li>
              <li>
                <strong>Data centre:</strong> Typical THD &gt;40% — neutral 150-200% of phase
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Worked Example: Office DB Design</p>
            <p>
              <strong>Problem:</strong> Design a distribution board for a 500m² open-plan office.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Load Assessment:</strong></li>
              <li>Lighting: 500m² × 12W/m² = 6kW → 26A at 230V</li>
              <li>Small power: 500m² × 25W/m² = 12.5kW → 54A at 230V</li>
              <li><strong>Distribution (balanced):</strong></li>
              <li>Lighting: 3 × 10A circuits (one per phase)</li>
              <li>Small power: 6 × 32A ring finals (2 per phase)</li>
              <li><strong>Phase allocation:</strong></li>
              <li>R: 1×10A lighting + 2×32A rings = ~26A design</li>
              <li>Y: 1×10A lighting + 2×32A rings = ~26A design</li>
              <li>B: 1×10A lighting + 2×32A rings = ~26A design</li>
              <li><strong>Neutral sizing:</strong></li>
              <li>IT-heavy office → expect ~30% THD</li>
              <li>Neutral sized equal to phase: 100A rated</li>
              <li>Consider 150% (150A) if high IT density expected</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document the load schedule showing phase allocation,
              expected diversity, and harmonic content assumptions. This aids future modifications
              and troubleshooting.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Neutral Current Calculation
            </p>
            <p>
              <strong>Problem:</strong> A four-wire star system supplies loads of 50A on Red, 40A
              on Yellow, and 30A on Blue (all resistive). Calculate the neutral current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Using: I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I
                <sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I
                <sub>R</sub>)
              </li>
              <li>
                I<sub>N</sub> = √(50² + 40² + 30² - 50×40 - 40×30 - 30×50)
              </li>
              <li>
                I<sub>N</sub> = √(2500 + 1600 + 900 - 2000 - 1200 - 1500)
              </li>
              <li>
                I<sub>N</sub> = √(5000 - 4700) = √300
              </li>
              <li>
                <strong>
                  I<sub>N</sub> = 17.3A
                </strong>
              </li>
              <li>
                The neutral carries 17.3A despite a 20A difference between max and min phase
                currents.
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Voltage Unbalance Factor
            </p>
            <p>
              <strong>Problem:</strong> Measured phase voltages are V<sub>R</sub> = 238V, V
              <sub>Y</sub> = 232V, V<sub>B</sub> = 235V. Calculate the approximate VUF.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                V<sub>max</sub> = 238V, V<sub>min</sub> = 232V
              </li>
              <li>
                V<sub>avg</sub> = (238 + 232 + 235) / 3 = 235V
              </li>
              <li>
                VUF ≈ (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub> × 100%
              </li>
              <li>VUF ≈ (238 - 232) / 235 × 100%</li>
              <li>
                <strong>VUF ≈ 2.55%</strong>
              </li>
              <li>Exceeds 2% limit - investigate cause and consider remedial action</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Motor Derating for Unbalance
            </p>
            <p>
              <strong>Problem:</strong> A 30kW motor operates with 2.5% voltage unbalance. What is
              the recommended output derating?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From NEMA MG1 derating factors:</li>
              <li>At 2.5% VUF → derating factor ≈ 0.925</li>
              <li>
                Derated output = 30kW × 0.925 = <strong>27.75kW</strong>
              </li>
              <li>Alternative: temperature rise increases by approximately:</li>
              <li>
                ΔT<sub>increase</sub> ≈ 2 × (2.5)² = 12.5%
              </li>
              <li>Either reduce load to 27.75kW or accept higher operating temperature.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Neutral current (balanced):</strong> I<sub>N</sub> = 0
              </li>
              <li>
                <strong>Neutral current (resistive unbalance):</strong> I<sub>N</sub> = √(I
                <sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I<sub>R</sub>I<sub>Y</sub> - I
                <sub>Y</sub>I<sub>B</sub> - I<sub>B</sub>I<sub>R</sub>)
              </li>
              <li>
                <strong>Single-phase only:</strong> I<sub>N</sub> = I<sub>phase</sub>
              </li>
              <li>
                <strong>VUF (approx):</strong> (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub>{' '}
                × 100%
              </li>
              <li>
                <strong>Motor temperature rise:</strong> ΔT ≈ 2 × (%VUF)²
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Phase separation: <strong>120°</strong>
              </li>
              <li>
                Maximum VUF (BS EN 50160): <strong>2%</strong>
              </li>
              <li>
                Motor derating threshold: <strong>1% VUF</strong>
              </li>
              <li>
                Target phase balance: <strong>within 10-15%</strong>
              </li>
              <li>
                Third harmonic threshold for neutral sizing: <strong>15%, 33%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common load balancing and neutral sizing mistakes"
            whatHappens={
              <>
                Adding phase currents arithmetically (Neutral ≠ I<sub>R</sub> + I<sub>Y</sub> + I
                <sub>B</sub>). Assuming neutral is always zero. Undersizing the neutral when
                non-linear loads are present. Ignoring voltage unbalance effects on motors. Poor
                load scheduling at design stage.
              </>
            }
            doInstead={
              <>
                Use phasor (vector) addition for neutral current. Only assume zero neutral for
                perfectly balanced loads. Oversize the neutral for IT/LED dominated buildings.
                Derate motors above 1% VUF. Schedule single-phase loads evenly across all three
                phases at design.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Office DB phase-balance investigation after a tenant fit-out"
            situation={
              <>
                A 250 A four-way distribution board in a refurbished open-plan office is
                tripping the upstream MCCB intermittently. Power-quality logging shows
                L1 = 195 A, L2 = 142 A, L3 = 178 A — a 23 % imbalance. Tenant fit-out
                added a kitchenette (single-phase 32 A on L1) and 30 desk PCs (also
                concentrated on L1). Upstream supply voltage shows 2.7 % negative-sequence.
              </>
            }
            whatToDo={
              <>
                Re-allocate single-phase circuits across L1, L2, L3 to bring imbalance
                below 10 %. Move the kitchenette circuit (and ideally the dishwasher /
                hot-water boiler) to L2 or L3. Split the desk power into three roughly
                equal phase groups. Verify with a true-RMS clamp meter at recommissioning,
                logging at least 24 hours. Investigate the upstream 2.7 %
                negative-sequence — could be DNO-side or another tenant — and raise with
                the landlord if outside this installation&rsquo;s control.
              </>
            }
            whyItMatters={
              <>
                Phase imbalance accelerates motor failure (negative-sequence torque heats
                the rotor) and breaches BS EN 50160 limits. It also wastes neutral capacity
                and trips upstream protection nuisance-style. Phase rebalancing is the
                cheapest, fastest power-quality fix on most commercial fit-out boards.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Balanced 3-phase load: I&#x2099; = 0 in star — each phase current cancels in the neutral.',
              'Unbalanced 3-phase load: I&#x2099; = vector sum of phase currents — can approach the highest phase current under severe imbalance.',
              'BS EN 50160: voltage unbalance &le; 2 % negative-sequence at the LV PCC under normal conditions.',
              'Voltage unbalance derates motor torque and current capacity; 1 % unbalance &asymp; 6&ndash;10 % derating.',
              'Triplen harmonic content adds to neutral loading on top of any imbalance — investigate together, not separately.',
              'Distribution-board phase balancing is a design-stage activity — single-phase circuits should be deliberately spread across L1/L2/L3.',
              'Imbalance &gt; 10 % at the busbar warrants reallocation of single-phase final circuits at next planned outage.',
              'BS 7671 Reg 331.1 forces assessment of any equipment characteristic that may impair the supply &mdash; severe unbalance qualifies.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Line and Phase Relationships
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Three-Phase Power
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_3;
