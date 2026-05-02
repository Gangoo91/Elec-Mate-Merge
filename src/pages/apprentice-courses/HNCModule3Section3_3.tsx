/**
 * Module 3 · Section 3 · Subsection 3 — Phase Difference and Vector Representation
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Phasors, phase angle, ELI/ICE, R-L-C circuits and three-phase sequence. The
 *   vector toolkit that turns time-varying sinusoids into a single drawing —
 *   essential for power factor correction, motor starting and three-phase analysis.
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

const TITLE = 'Phase Difference and Vector Representation - HNC Module 3 Section 3.3';
const DESCRIPTION =
  'Master phase angles, phasor diagrams and vector representation in AC circuits for building services applications including motor starting, capacitor effects and power factor correction.';

const quickCheckQuestions = [
  {
    id: 'phase-angle-def',
    question: 'What does a phase angle of +30 degrees indicate?',
    options: [
      'Current lags voltage by 30 degrees',
      'Current leads voltage by 30 degrees',
      'Voltage and current are in phase',
      'The circuit is purely resistive',
    ],
    correctIndex: 1,
    explanation:
      'A positive phase angle indicates that current leads voltage. This occurs in capacitive circuits where current flows to charge the capacitor before voltage builds up across it.',
  },
  {
    id: 'lagging-current',
    question: 'In which type of circuit does current lag behind voltage?',
    options: ['Purely resistive', 'Purely capacitive', 'Inductive', 'Open circuit'],
    correctIndex: 2,
    explanation:
      "In inductive circuits (motors, transformers, fluorescent ballasts), current lags voltage because the inductor opposes changes in current flow. This is remembered by 'ELI' - voltage (E) leads current (I) in inductors (L).",
  },
  {
    id: 'phasor-length',
    question: 'What does the length of a phasor represent?',
    options: ['Phase angle', 'Frequency', 'RMS magnitude', 'Time period'],
    correctIndex: 2,
    explanation:
      'The length (magnitude) of a phasor represents the RMS value of the quantity (voltage or current). The angle represents the phase relationship, and the phasor rotates at the supply frequency.',
  },
  {
    id: 'power-factor-angle',
    question: 'If power factor is 0.8 lagging, what is the phase angle?',
    options: ['36.87 degrees', '53.13 degrees', '45 degrees', '60 degrees'],
    correctIndex: 0,
    explanation:
      "Power factor = cos(phi), so phi = arccos(0.8) = 36.87 degrees. 'Lagging' indicates current lags voltage, typical of inductive loads like motors.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is phase difference in an AC circuit?',
    options: [
      'The difference in frequency between voltage and current',
      'The angular displacement between voltage and current waveforms',
      'The difference in peak values',
      'The time taken for one complete cycle',
    ],
    correctAnswer: 1,
    explanation:
      'Phase difference is the angular displacement (measured in degrees or radians) between voltage and current waveforms. It indicates how much one waveform is shifted relative to the other.',
  },
  {
    id: 2,
    question: 'What is the phase relationship in a purely resistive AC circuit?',
    options: [
      'Current leads voltage by 90 degrees',
      'Current lags voltage by 90 degrees',
      'Voltage and current are in phase',
      'Phase varies with frequency',
    ],
    correctAnswer: 2,
    explanation:
      "In a purely resistive circuit, voltage and current are in phase (phi = 0 degrees). The current instantaneously follows the applied voltage according to Ohm's Law.",
  },
  {
    id: 3,
    question: 'What is the mnemonic for remembering phase relationships in L and C circuits?',
    options: ['CIVIL', 'ELI the ICE man', 'SOHCAHTOA', 'ROY G BIV'],
    correctAnswer: 1,
    explanation:
      'ELI the ICE man: In inductors (L), voltage (E) leads current (I). In capacitors (C), current (I) leads voltage (E). This helps remember the 90-degree phase shifts in reactive components.',
  },
  {
    id: 4,
    question: 'When adding two phasors graphically, what method is used?',
    options: [
      'Multiply their magnitudes',
      'Add their angles only',
      'Head-to-tail vector addition',
      'Subtract the smaller from larger',
    ],
    correctAnswer: 2,
    explanation:
      'Phasors are added using the head-to-tail (parallelogram) method. Place the tail of the second phasor at the head of the first, then draw the resultant from the origin to the final head.',
  },
  {
    id: 5,
    question:
      'In a three-phase system with correct phase sequence, what is the angular separation between phases?',
    options: ['90 degrees', '120 degrees', '180 degrees', '60 degrees'],
    correctAnswer: 1,
    explanation:
      'In a balanced three-phase system, the phases (L1, L2, L3) are separated by 120 degrees. With correct sequence (L1-L2-L3), each phase reaches its peak 120 degrees after the previous one.',
  },
  {
    id: 6,
    question: 'What happens to a three-phase motor if two phases are swapped?',
    options: [
      'It runs at half speed',
      'It runs in reverse direction',
      'It draws more current',
      'No effect',
    ],
    correctAnswer: 1,
    explanation:
      'Swapping any two phases reverses the phase sequence, causing the motor to run in the opposite direction. This is critical for pumps, fans and conveyors where rotation direction matters.',
  },
  {
    id: 7,
    question: 'A motor has a power factor of 0.7 lagging. How can this be improved?',
    options: [
      'Add series inductance',
      'Add parallel capacitance',
      'Increase the load',
      'Reduce the supply voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Parallel capacitors provide leading reactive current that partially cancels the lagging reactive current of the motor. This reduces the overall phase angle and improves power factor towards unity.',
  },
  {
    id: 8,
    question: 'What is the resultant of two equal phasors at 90 degrees to each other?',
    options: [
      'Zero',
      'Twice the magnitude at 45 degrees',
      'Square root of 2 times magnitude at 45 degrees',
      'Same magnitude at 90 degrees',
    ],
    correctAnswer: 2,
    explanation:
      "Using Pythagoras: resultant = sqrt(V squared + V squared) = V times sqrt(2) = 1.414V. The resultant bisects the angle, so it's at 45 degrees to both original phasors.",
  },
  {
    id: 9,
    question: 'Why do large induction motors require reduced voltage starting?',
    options: [
      'To improve power factor',
      'To limit starting current which can be 6-8 times full load current',
      'To increase starting torque',
      'To match supply frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Induction motors can draw 6-8 times full load current at start (locked rotor current). Star-delta or soft starters reduce voltage to limit starting current and prevent supply disturbance.',
  },
  {
    id: 10,
    question: 'What is the relationship between power factor and phase angle?',
    options: [
      'Power factor = sin(phi)',
      'Power factor = tan(phi)',
      'Power factor = cos(phi)',
      'Power factor = 1/phi',
    ],
    correctAnswer: 2,
    explanation:
      'Power factor = cos(phi), where phi is the phase angle between voltage and current. Unity power factor (pf = 1) means phi = 0 degrees, i.e., voltage and current are in phase.',
  },
];

const faqs = [
  {
    question: 'Why do we use phasors instead of sine wave diagrams?',
    answer:
      'Phasors simplify AC circuit analysis. Instead of complex trigonometric equations with time-varying quantities, phasors reduce everything to simple vector addition and subtraction. The rotating nature of phasors (at supply frequency) captures all the information in a static diagram.',
  },
  {
    question: 'What causes lagging power factor in buildings?',
    answer:
      'Inductive loads cause lagging power factor: motors (lifts, HVAC, pumps), transformers, fluorescent lighting with magnetic ballasts, and welding equipment. In commercial buildings, motors typically account for 60-70% of the load, making power factor correction essential.',
  },
  {
    question: 'How does power factor correction save money?',
    answer:
      'Electricity suppliers charge penalties for poor power factor (typically below 0.95) because it requires them to supply more current for the same real power. Correcting power factor reduces maximum demand charges, network losses, and may allow existing cables and transformers to supply additional loads.',
  },
  {
    question: 'What is the difference between displacement and distortion power factor?',
    answer:
      'Displacement power factor is caused by phase shift between voltage and current fundamental frequencies (what we discuss here). Distortion power factor is caused by harmonic currents from non-linear loads (VFDs, LEDs, computers). Total power factor combines both effects.',
  },
  {
    question: 'Why is phase sequence important for three-phase motors?',
    answer:
      'Phase sequence determines motor rotation direction. L1-L2-L3 gives forward rotation, L1-L3-L2 gives reverse. For pumps, fans and conveyors, wrong rotation can cause damage (e.g., centrifugal pump running dry) or safety issues (conveyor moving wrong way).',
  },
  {
    question: 'Can you have leading power factor?',
    answer:
      'Yes, capacitive loads create leading power factor where current leads voltage. This occurs with capacitor banks, long unloaded cables, and synchronous motors running over-excited. Some sites deliberately over-correct to offset network losses.',
  },
];

const HNCModule3Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 3"
            title="Phase Difference and Vector Representation"
            description="Understanding phasor diagrams and phase relationships for AC circuit analysis in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You use phasor diagrams to size PFC capacitors, analyse motor starting, and verify three-phase sequence on every BSE installation with non-resistive load.',
              'You apply ELI / ICE — voltage leads current in inductors, current leads voltage in capacitors — to predict the sign of every reactive load.',
              'You convert pf &harr; phase angle (pf = cos &phi;) and use the power triangle (P, Q, S) for kVA sizing and DNO penalty calculations.',
              'You verify three-phase sequence (L1-L2-L3) with a sequence indicator before energising any motor — wrong rotation can damage pumps, fans and lifts.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13.1 (Phase identification and sequence)"
            clause="Each conductor shall be capable of being identified at terminations and preferably throughout its length. Conductors shall be identified by colour as listed in Table 51, including L1 (brown), L2 (black), L3 (grey), N (blue) and PE (green/yellow)."
            meaning={
              <>
                BS 7671 mandates the colour code that lets you verify phase sequence before
                energising. As the BSE engineer you must use a sequence-indicating
                instrument (Megger PSI, Fluke 9040 or equivalent) on every new three-phase
                final circuit, not assume the colours match the rotation. Wrong sequence
                can spin a centrifugal pump dry, run a lift the wrong way against a
                limit switch, or push a fan into stall.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 514.13.1, Table 51; Engineering Recommendation G99 for parallel-running plant"
          />

          <LearningOutcomes
            outcomes={[
              'Define phase angle and explain its significance in AC circuits',
              'Distinguish between leading and lagging current conditions',
              'Draw and interpret phasor diagrams for R, L, C circuits',
              'Add phasors graphically using vector methods',
              'Explain phase relationships in three-phase systems',
              'Calculate power factor from phase angle and vice versa',
              'Apply phase concepts to motor starting and capacitor correction',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Phase Angle - Definition and Measurement">
            <p>
              In AC circuits, voltage and current do not always reach their peak values at the same
              instant. The <strong>phase angle (phi)</strong> measures this time difference as an
              angular displacement, typically expressed in degrees or radians.
            </p>
            <p>
              <strong>Phase Angle Definition:</strong> phi = (delta t / T) x 360 degrees. Where
              delta t = time difference, T = period of one cycle.
            </p>
            <p>Key concepts:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>In phase:</strong> phi = 0 degrees - V and I peak together (resistive)</li>
              <li><strong>Leading:</strong> phi positive - current peaks before voltage</li>
              <li><strong>Lagging:</strong> phi negative - current peaks after voltage</li>
              <li>One complete cycle = 360 degrees = 2 pi radians</li>
              <li>At 50Hz, one cycle takes 20ms, so 1 degree = 0.056ms</li>
            </ul>
            <p>
              <strong>Phase Angle in Different Circuits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pure resistance — phi = 0 degrees, Power Factor 1.0 (unity)</li>
              <li>Pure inductance — phi = -90 degrees (lag), Power Factor 0 (lagging)</li>
              <li>Pure capacitance — phi = +90 degrees (lead), Power Factor 0 (leading)</li>
              <li>R-L (typical motor) — phi = -30 to -40 degrees, Power Factor 0.75-0.85 lagging</li>
              <li>R-C (PFC corrected) — phi = -5 to -10 degrees, Power Factor 0.95-0.99 lagging</li>
            </ul>
            <p>
              <strong>Remember:</strong> Power factor = cos(phi). A smaller phase angle means
              higher power factor and more efficient use of the supply.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Leading and Lagging Currents">
            <p>
              Understanding whether current leads or lags voltage is essential for power factor
              correction and reactive power management in building services installations.
            </p>
            <p>
              <strong>The ELI the ICE Man Mnemonic:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ELI</strong> — In an L (inductor): E (voltage) leads I (current). Current lags voltage by up to 90 degrees.</li>
              <li><strong>ICE</strong> — In a C (capacitor): I (current) leads E (voltage). Current leads voltage by up to 90 degrees.</li>
            </ul>
            <p>
              <strong>Lagging Current (Inductive):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current peaks after voltage</li>
              <li>Caused by magnetic field energy storage</li>
              <li>Building loads: motors, transformers, fluorescent ballasts</li>
              <li>Requires capacitors to correct</li>
              <li>Most common in commercial/industrial</li>
            </ul>
            <p>
              <strong>Leading Current (Capacitive):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current peaks before voltage</li>
              <li>Caused by electric field energy storage</li>
              <li>Building loads: PFC capacitors, lightly loaded cables</li>
              <li>Requires inductors to correct (rare)</li>
              <li>Less common - usually intentional</li>
            </ul>
            <p>
              <strong>Why Current Lags in Inductors:</strong> An inductor opposes changes in
              current. When voltage is applied, the magnetic field builds up, which opposes current
              flow. The current gradually increases, reaching its maximum 90 degrees (quarter
              cycle) after the voltage peak. This is why motors, which are essentially large
              inductors, have lagging power factor.
            </p>
            <p>
              <strong>Why Current Leads in Capacitors:</strong> A capacitor allows current to flow
              freely when uncharged. Maximum current flows at the instant voltage begins rising
              (to charge the capacitor). As voltage reaches its peak, the capacitor is fully
              charged and current drops to zero. Current therefore peaks 90 degrees before voltage.
            </p>
            <p>
              <strong>Practical tip:</strong> In most building services, you'll encounter lagging
              power factor because inductive motor loads dominate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Vector and Phasor Representation">
            <p>
              A <strong>phasor</strong> is a rotating vector that represents a sinusoidal quantity.
              Phasor diagrams simplify AC circuit analysis by converting time-varying sine waves
              into static vector diagrams.
            </p>
            <p>Phasor properties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Length:</strong> Represents the RMS magnitude of the quantity</li>
              <li><strong>Angle:</strong> Represents the phase relative to a reference (usually voltage)</li>
              <li><strong>Direction:</strong> Anti-clockwise rotation represents positive angle</li>
              <li><strong>Rotation:</strong> Phasors rotate at angular frequency omega = 2 x pi x f</li>
              <li><strong>Reference:</strong> Voltage is typically placed along the positive x-axis</li>
            </ul>
            <p>
              <strong>Standard Phasor Conventions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reference — Voltage at 0 degrees</li>
              <li>Leading — Anti-clockwise from V</li>
              <li>Lagging — Clockwise from V</li>
              <li>In Phase — Same direction as V</li>
            </ul>
            <p>
              <strong>Drawing Phasor Diagrams:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Draw the reference phasor (usually voltage) horizontally to the right</li>
              <li>Scale the length to represent RMS magnitude</li>
              <li>Draw current phasor at the appropriate angle: in phase (same direction), lagging (rotated clockwise), leading (rotated anti-clockwise)</li>
              <li>Label phasors with their symbol and magnitude</li>
              <li>Mark the phase angle phi clearly</li>
            </ul>
            <p>
              <strong>Mathematical Representation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Polar form — V angle phi or V at phi degrees. Use: Multiplication, division</li>
              <li>Rectangular form — a + jb. Use: Addition, subtraction</li>
              <li>Conversion — a = V cos(phi), b = V sin(phi). Use: Between forms</li>
            </ul>
            <p>
              <strong>Note:</strong> j is used in electrical engineering (instead of i) to
              represent the square root of -1, as i already represents current.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Adding Phasors Graphically">
            <p>
              When combining AC quantities (such as voltages in series or currents in parallel),
              phasors must be added vectorially, not algebraically. The phase relationships
              determine whether quantities reinforce or partially cancel each other.
            </p>
            <p>
              <strong>Head-to-Tail Method (Polygon Method):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Draw the first phasor from the origin</li>
              <li>Draw the second phasor with its tail at the head of the first</li>
              <li>Maintain the correct angle for each phasor</li>
              <li>The resultant is drawn from the origin to the final head</li>
              <li>Measure the resultant length and angle</li>
            </ul>
            <p>
              <strong>Parallelogram Method (Two Phasors):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Draw both phasors from a common origin</li>
              <li>Complete the parallelogram using parallel lines</li>
              <li>The diagonal from the origin is the resultant</li>
            </ul>
            <p>
              <strong>Special Cases:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In Phase (0 degrees) — Resultant = V1 + V2 (phasors simply add)</li>
              <li>Anti-Phase (180 degrees) — Resultant = |V1 - V2| (phasors subtract)</li>
              <li>Quadrature (90 degrees) — Resultant = sqrt(V1 squared + V2 squared) (Pythagoras applies)</li>
              <li>General Case — Use cosine rule or resolve into components</li>
            </ul>
            <p>
              <strong>Resolving into Components.</strong> For phasor V at angle theta: Horizontal
              component Vx = V x cos(theta); Vertical component Vy = V x sin(theta). To add two
              phasors: Resultant Vx = V1x + V2x, Resultant Vy = V1y + V2y. Magnitude = sqrt(Vx
              squared + Vy squared); Angle = arctan(Vy / Vx).
            </p>
            <p>
              <strong>Practical application:</strong> In three-phase systems, the line voltage is
              the phasor difference between two phase voltages, giving 400V = 230V x sqrt(3) from
              the 120-degree phase relationship.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Phase Relationships in R, L, C Circuits">
            <p>
              Each circuit element creates a specific phase relationship between voltage and
              current. Understanding these relationships is essential for analysing practical
              circuits.
            </p>
            <p>
              <strong>Resistor (R):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase angle: phi = 0 degrees</li>
              <li>V and I are in phase</li>
              <li>V = IR (Ohm's Law)</li>
              <li>Power = VI (all real power)</li>
              <li>Building examples: heaters, incandescent lamps, resistive heating elements</li>
            </ul>
            <p>
              <strong>Inductor (L):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase angle: phi = -90 degrees</li>
              <li>Current lags voltage by 90 degrees</li>
              <li>VL = I x XL where XL = 2 x pi x f x L</li>
              <li>Power oscillates, average = 0 (reactive)</li>
              <li>Building examples: motor windings, transformer cores, chokes, solenoid valves</li>
            </ul>
            <p>
              <strong>Capacitor (C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase angle: phi = +90 degrees</li>
              <li>Current leads voltage by 90 degrees</li>
              <li>VC = I x XC where XC = 1 / (2 x pi x f x C)</li>
              <li>Power oscillates, average = 0 (reactive)</li>
              <li>Building examples: PFC capacitors, motor run capacitors, filter capacitors</li>
            </ul>
            <p>
              <strong>Series R-L Circuit (Typical Motor):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Impedance (Z) = sqrt(R squared + XL squared) — Total opposition to current</li>
              <li>Phase angle (phi) = arctan(XL / R) — Current lags (negative)</li>
              <li>Power factor = cos(phi) = R / Z — Lagging</li>
              <li>Voltage phasors: V = sqrt(VR squared + VL squared) — VR and VL at 90 degrees</li>
            </ul>
            <p>
              <strong>Key insight:</strong> In a series circuit, current is the reference phasor
              (same through all components). Voltage phasors are drawn relative to this common
              current.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Phase Sequence in Three-Phase Systems">
            <p>
              In three-phase systems, the three phases (L1, L2, L3) are separated by 120 degrees.
              The <strong>phase sequence</strong> determines the order in which each phase reaches
              its positive peak, which is critical for motor rotation direction.
            </p>
            <p>
              <strong>Three-Phase Relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1 — Reference: 0 degrees</li>
              <li>L2 — Lags L1 by 120 degrees</li>
              <li>L3 — Lags L1 by 240 degrees</li>
            </ul>
            <p>Phase sequence conventions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Positive sequence (ABC or L1-L2-L3):</strong> Standard rotation, phases reach peak in order L1 then L2 then L3</li>
              <li><strong>Negative sequence (ACB or L1-L3-L2):</strong> Reverse rotation, phases reach peak in order L1 then L3 then L2</li>
              <li>Swapping any two phases reverses the sequence</li>
              <li>Line voltage = sqrt(3) x phase voltage = 1.732 x 230V = 400V</li>
            </ul>
            <p>
              <strong>Phase Sequence Importance in Building Services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Centrifugal pumps — Run dry, overheat, mechanical damage</li>
              <li>Extract fans — Push instead of extract, ventilation failure</li>
              <li>Lifts — Move in wrong direction, safety system trip</li>
              <li>Conveyor systems — Material moves wrong way, production issues</li>
              <li>Compressors — No compression, potential damage</li>
            </ul>
            <p>
              <strong>Phase Sequence Indicators:</strong> Always use a phase sequence indicator
              before connecting three-phase motors. Modern indicators show rotation direction with
              LED lights. The instrument is connected to L1, L2, L3 and indicates whether the
              sequence will give clockwise or anti-clockwise motor rotation.
            </p>
            <p>
              <strong>Testing tip:</strong> After installation, briefly run motors unloaded to
              verify rotation before coupling to driven equipment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Power Factor Relationship to Phase Angle">
            <p>
              Power factor is the cosine of the phase angle between voltage and current. It
              indicates what proportion of the apparent power (VA) is converted to useful work
              (Watts).
            </p>
            <p>
              <strong>The Power Triangle:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P (kW) — Real power, horizontal side</li>
              <li>Q (kVAr) — Reactive power, vertical side</li>
              <li>S (kVA) — Apparent power, hypotenuse</li>
            </ul>
            <p>
              <strong>Power Factor Equations:</strong> Power factor = cos(phi) = P / S = kW / kVA.
              Real power: P = V x I x cos(phi). Reactive power: Q = V x I x sin(phi). Apparent
              power: S = V x I = sqrt(P squared + Q squared). Phase angle: phi = arccos(pf) =
              arccos(kW / kVA).
            </p>
            <p>
              <strong>Power Factor Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.0 (unity) — Phase angle 0 degrees — All power is real - ideal</li>
              <li>0.95 — Phase angle 18.2 degrees — Typical target for PFC</li>
              <li>0.85 — Phase angle 31.8 degrees — Typical motor at full load</li>
              <li>0.70 — Phase angle 45.6 degrees — Lightly loaded motor</li>
              <li>0.50 — Phase angle 60 degrees — Poor - significant reactive power</li>
              <li>0 (zero) — Phase angle 90 degrees — Pure reactive - no real power</li>
            </ul>
            <p>
              <strong>Why Power Factor Matters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply capacity:</strong> Low pf means higher current for same real power</li>
              <li><strong>Cable losses:</strong> I squared R losses increase with higher current</li>
              <li><strong>Voltage drop:</strong> Higher current causes greater voltage drop</li>
              <li><strong>Transformer sizing:</strong> Transformers rated in kVA, not kW</li>
              <li><strong>Utility charges:</strong> Penalties applied for pf below 0.95</li>
            </ul>
            <p>
              <strong>Example:</strong> A 100kW load at 0.7 pf draws 143kVA (current for 143kVA).
              At 0.95 pf, it draws only 105kVA - a 26% reduction in current.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Building Services: Motor Starting and Capacitor Effects">
            <p>
              Phase relationships have significant practical implications in building services,
              particularly for motor starting methods and power factor correction.
            </p>
            <p>
              <strong>Motor Starting Current:</strong> Induction motors draw very high starting
              current (locked rotor current) because the rotor is stationary. At standstill, the
              motor acts almost as a short-circuited transformer with very low impedance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Direct-on-line (DOL) — Starting Current 6-8 x FLC, Starting Torque 100%, Application: Small motors less than 7.5kW</li>
              <li>Star-delta — Starting Current 2-3 x FLC, Starting Torque 33%, Application: Pumps, fans (low starting load)</li>
              <li>Soft starter — Starting Current 2-4 x FLC, Starting Torque Adjustable, Application: General purpose, conveyors</li>
              <li>VFD (Variable Frequency Drive) — Starting Current 1-1.5 x FLC, Starting Torque Adjustable, Application: Speed control required</li>
            </ul>
            <p>
              <strong>Star-Delta Starting - Phase Relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Star Connection (Start) — Each winding sees 230V (phase voltage); Current reduced by factor of sqrt(3); Power reduced to 1/3; Torque reduced to 1/3</li>
              <li>Delta Connection (Run) — Each winding sees 400V (line voltage); Full rated current; Full power capability; Full torque available</li>
            </ul>
            <p>
              <strong>Power Factor Correction Capacitors:</strong> Capacitors provide leading
              reactive current that cancels the lagging reactive current drawn by motors. This
              reduces the total current from the supply. Required kVAr = kW x (tan(phi1) -
              tan(phi2)). Where phi1 = original phase angle = arccos(original pf), phi2 = target
              phase angle = arccos(target pf).
            </p>
            <p>
              <strong>Example:</strong> 100kW at 0.7 pf, improve to 0.95. phi1 = arccos(0.7) =
              45.6 degrees. phi2 = arccos(0.95) = 18.2 degrees. kVAr = 100 x (tan(45.6) -
              tan(18.2)) = 100 x (1.02 - 0.33) = <strong>69 kVAr</strong>.
            </p>
            <p>
              <strong>Capacitor Installation Options:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual motor — Reduces cable current, switched with motor; Higher total cost, many units to maintain</li>
              <li>Group correction — Lower cost per kVAr, easier maintenance; Distribution cables not relieved</li>
              <li>Central automatic — Lowest cost, adapts to load changes; No cable relief, complex control</li>
            </ul>
            <p>
              <strong>Capacitor Safety Warning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacitors store dangerous charge - allow discharge time before working</li>
              <li>Never exceed motor no-load magnetising current with individual capacitors</li>
              <li>Self-excitation can occur if capacitor too large for motor</li>
              <li>Always use discharge resistors built into capacitor units</li>
            </ul>
            <p>
              <strong>Design note:</strong> For individual motor correction, size capacitors at
              approximately 30-40% of motor kW rating to stay below magnetising current.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Phase Angle from Power Factor.</strong> A 22kW motor has a power
              factor of 0.82 lagging at full load. Calculate the phase angle and the reactive
              power drawn.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase angle: phi = arccos(0.82) = <strong>34.9 degrees lagging</strong></li>
              <li>Apparent power: S = P / pf = 22 / 0.82 = 26.83 kVA</li>
              <li>Reactive power: Q = S x sin(phi) = 26.83 x sin(34.9) = 26.83 x 0.572 = <strong>15.35 kVAr</strong></li>
              <li>Alternatively: Q = sqrt(S squared - P squared) = sqrt(26.83 squared - 22 squared) = 15.35 kVAr</li>
            </ul>
            <p>
              <strong>Example 2: Adding Phasors.</strong> Two currents of 10A at 0 degrees and 8A
              at 60 degrees flow into a junction. Find the resultant current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I1: I1x = 10 x cos(0) = 10A, I1y = 10 x sin(0) = 0A</li>
              <li>I2: I2x = 8 x cos(60) = 4A, I2y = 8 x sin(60) = 6.93A</li>
              <li>Total components: Ix = 10 + 4 = 14A; Iy = 0 + 6.93 = 6.93A</li>
              <li>Resultant magnitude: I = sqrt(14 squared + 6.93 squared) = sqrt(196 + 48) = <strong>15.6A</strong></li>
              <li>Resultant angle: theta = arctan(6.93 / 14) = arctan(0.495) = <strong>26.3 degrees</strong></li>
            </ul>
            <p>
              <strong>Example 3: Power Factor Correction.</strong> An installation has a load of
              150kW at 0.75 power factor lagging. Calculate the capacitor bank size needed to
              improve to 0.95 pf.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original angle: phi1 = arccos(0.75) = 41.4 degrees</li>
              <li>Target angle: phi2 = arccos(0.95) = 18.2 degrees</li>
              <li>Required kVAr = kW x (tan(phi1) - tan(phi2)) = 150 x (tan(41.4) - tan(18.2))</li>
              <li>kVAr = 150 x (0.882 - 0.329) = 150 x 0.553 = <strong>83 kVAr</strong></li>
              <li>Standard capacitor bank: 90 kVAr (next standard size up)</li>
            </ul>
            <p>
              <strong>Example 4: Three-Phase Line Voltage.</strong> Using phasor addition, show
              why three-phase line voltage is sqrt(3) times the phase voltage.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line voltage VL1-L2 = V1 - V2 (phasor difference)</li>
              <li>V1 = Vp at 0 degrees = Vp; V2 = Vp at -120 degrees</li>
              <li>Converting to rectangular: V1 = Vp + j0; V2 = -0.5Vp - j0.866Vp</li>
              <li>V1 - V2 = Vp - (-0.5Vp - j0.866Vp) = 1.5Vp + j0.866Vp</li>
              <li>Magnitude = sqrt(1.5 squared + 0.866 squared) x Vp = sqrt(2.25 + 0.75) x Vp = sqrt(3) x Vp = <strong>1.732 x Vp</strong></li>
              <li>Therefore VL = sqrt(3) x Vp = 1.732 x 230 = 400V</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power factor = cos(phi)</strong> - phase angle to power factor</li>
              <li><strong>phi = arccos(pf)</strong> - power factor to phase angle</li>
              <li><strong>kVAr = kW x (tan(phi1) - tan(phi2))</strong> - capacitor sizing</li>
              <li><strong>VL = sqrt(3) x Vph</strong> - line to phase voltage relationship</li>
              <li><strong>Resultant = sqrt(Vx squared + Vy squared)</strong> - phasor magnitude</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Three-phase separation: <strong>120 degrees</strong></li>
              <li>sqrt(3) = <strong>1.732</strong></li>
              <li>Target power factor: <strong>0.95 or better</strong></li>
              <li>DOL starting current: <strong>6-8 x FLC</strong></li>
              <li>Star-delta starting current: <strong>1/3 of DOL</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Calculator mode:</strong> Ensure calculator is in degrees (not radians) for trigonometry</li>
                <li><strong>Sign convention:</strong> Lagging = negative angle, leading = positive</li>
                <li><strong>Adding phasors:</strong> Cannot simply add magnitudes - must use vector methods</li>
                <li><strong>Oversizing capacitors:</strong> Can cause self-excitation and overvoltage</li>
                <li><strong>Phase sequence:</strong> Always verify before connecting motors</li>
              </ul>
            }
            doInstead="Pick degrees mode for cos(phi) and arccos(pf). Treat lagging as negative and leading as positive consistently. Resolve phasors into components before summing. Size individual motor capacitors at 30-40% of motor kW. Verify rotation with a sequence indicator before mechanical coupling."
          />

          <SectionRule />

          <Scenario
            title="Sizing a PFC bank for a 250 kW supermarket refrigeration plant"
            situation={
              <>
                A supermarket refrigeration upgrade adds 250 kW of compressor load at an
                aggregate 0.78 pf lagging (mostly direct-on-line scroll compressors). The
                DNO supply contract levies a kVA-based capacity charge and excess reactive
                kVArh charges below 0.95 pf. You need to size a switched PFC bank.
              </>
            }
            whatToDo={
              <>
                Calculate kVAr = kW &times; (tan&phi;&#x2081; &minus; tan&phi;&#x2082;) =
                250 &times; (tan(arccos 0.78) &minus; tan(arccos 0.95)) = 250 &times;
                (0.802 &minus; 0.329) = 118 kVAr. Specify a 125 kVAr automatically switched
                detuned PFC bank (5.67 % or 7 % reactor blocking factor) sited at the MCC.
                Detuning is non-negotiable in supermarket installations because chiller
                VSDs inject 5th and 7th harmonics that resonate with bare capacitors.
              </>
            }
            whyItMatters={
              <>
                Wrongly sizing a bare-capacitor bank into a harmonic environment causes
                resonant amplification, capacitor failure, and potentially damages the
                upstream transformer. Detuning shifts the bank resonance below the 5th
                harmonic. The kVAr saving cuts the DNO capacity charge and removes the
                reactive penalty, typically paying back in 18&ndash;30 months.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Phase angle &phi; = arccos(pf) — measures the angular shift between voltage and current waveforms in degrees or radians.',
              'ELI / ICE — voltage leads current in inductors (motors lag); current leads voltage in capacitors (PFC banks lead).',
              'Phasor length = RMS magnitude; phasor angle = phase relative to reference; rotation is anti-clockwise for positive angles.',
              'Power triangle: P (kW) = real, Q (kVAr) = reactive, S (kVA) = apparent &mdash; pf = cos &phi; = P/S.',
              'PFC sizing: kVAr = kW &times; (tan&phi;&#x2081; &minus; tan&phi;&#x2082;) — target 0.95 pf to avoid DNO reactive penalties.',
              'Three-phase rotation 120&deg; apart — line voltage = &radic;3 &times; phase voltage = 1.732 &times; 230 V = 400 V on UK supplies.',
              'Reverse rotation by swapping any two phases — verify with a sequence indicator before mechanically coupling a motor.',
              'BS 7671 Table 51 colour code (L1 brown / L2 black / L3 grey / N blue) is the basis for phase identification but never substitutes for instrument testing.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Frequency, Period and Amplitude
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Sinusoidal and Distorted Waveforms
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_3;
