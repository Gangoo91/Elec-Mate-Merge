/**
 * Module 3 · Section 2 · Subsection 3 — Phase Angle and Phasor Diagrams
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The graphical and complex-number language for AC analysis — phasors collapse a sinusoid
 *   into a magnitude and angle so the engineer can add voltages and currents like vectors.
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

const TITLE = 'Phase Angle and Phasor Diagrams - HNC Module 3 Section 2.3';
const DESCRIPTION =
  'Master phase angle concepts and phasor diagram techniques for AC circuit analysis in building services: sinusoidal waveforms, leading/lagging relationships, and R-L-C circuit behaviour.';

const quickCheckQuestions = [
  {
    id: 'phase-angle-def',
    question: 'What does a phase angle of +30 degrees indicate?',
    options: [
      'Current lags voltage by 30 degrees',
      'Current leads voltage by 30 degrees',
      'Voltage and current are in phase',
      'The frequency is 30Hz',
    ],
    correctIndex: 1,
    explanation:
      'A positive phase angle indicates that the quantity leads the reference. So +30 degrees means current leads voltage by 30 degrees, as seen in capacitive circuits.',
  },
  {
    id: 'inductor-phase',
    question: 'In a pure inductor, by how much does current lag voltage?',
    options: ['0 degrees', '45 degrees', '90 degrees', '180 degrees'],
    correctIndex: 2,
    explanation:
      'In a pure inductor, current lags voltage by exactly 90 degrees (or pi/2 radians). This is because the induced EMF opposes changes in current, causing a quarter-cycle delay.',
  },
  {
    id: 'phasor-length',
    question: 'What does the length of a phasor represent?',
    options: ['Frequency', 'Phase angle', 'Peak or RMS magnitude', 'Angular velocity'],
    correctIndex: 2,
    explanation:
      'The length (magnitude) of a phasor represents the peak or RMS value of the sinusoidal quantity. The angle represents the phase, and all phasors rotate at the same angular frequency.',
  },
  {
    id: 'capacitor-phase',
    question: 'In a capacitive circuit, which statement is correct?',
    options: [
      'Current lags voltage',
      'Current leads voltage',
      'Current and voltage are in phase',
      'Voltage leads current by 180 degrees',
    ],
    correctIndex: 1,
    explanation:
      "In a capacitor, current leads voltage by up to 90 degrees. The mnemonic 'CIVIL' helps: in a Capacitor (C), I leads V; in an Inductor (L), V leads I.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the angular frequency (omega) of a 50Hz AC supply?',
    options: ['50 rad/s', '100 rad/s', '157 rad/s', '314 rad/s'],
    correctAnswer: 3,
    explanation:
      'Angular frequency omega = 2 times pi times f = 2 times 3.14159 times 50 = 314.16 rad/s. This represents how fast the phasor rotates.',
  },
  {
    id: 2,
    question: 'A voltage is expressed as v = 325 sin(314t + 30 degrees). What is the RMS voltage?',
    options: ['325V', '230V', '163V', '460V'],
    correctAnswer: 1,
    explanation:
      'The peak voltage Vm = 325V. RMS = Vm divided by root 2 = 325 / 1.414 = 230V. The phase angle (30 degrees) does not affect the magnitude.',
  },
  {
    id: 3,
    question:
      'Two phasors are 90 degrees apart and have magnitudes of 3 and 4 units. What is the magnitude of their phasor sum?',
    options: ['1 unit', '5 units', '7 units', '12 units'],
    correctAnswer: 1,
    explanation:
      'When phasors are 90 degrees apart, use Pythagoras: magnitude = root(3 squared + 4 squared) = root(9 + 16) = root 25 = 5 units.',
  },
  {
    id: 4,
    question: 'In the expression v = Vm sin(omega t + phi), what does phi represent?',
    options: ['Peak voltage', 'Angular frequency', 'Phase angle at t=0', 'Time period'],
    correctAnswer: 2,
    explanation:
      'Phi is the phase angle at t=0, measured in degrees or radians. It indicates where the waveform starts relative to a reference sine wave.',
  },
  {
    id: 5,
    question: 'What is the phase relationship between voltage and current in a pure resistor?',
    options: [
      'Current leads by 90 degrees',
      'Current lags by 90 degrees',
      'They are in phase (0 degrees)',
      'Current leads by 45 degrees',
    ],
    correctAnswer: 2,
    explanation:
      'In a pure resistor, voltage and current are in phase - they reach their peaks and zero crossings at the same instant. Phase angle = 0 degrees.',
  },
  {
    id: 6,
    question:
      'A motor draws 20A at 0.8 power factor lagging. What is the phase angle between voltage and current?',
    options: [
      '36.87 degrees lagging',
      '53.13 degrees lagging',
      '36.87 degrees leading',
      '0 degrees',
    ],
    correctAnswer: 0,
    explanation:
      'Power factor = cos(phi), so phi = arccos(0.8) = 36.87 degrees. Since it is lagging, current lags voltage by 36.87 degrees (inductive load).',
  },
  {
    id: 7,
    question: 'Which mnemonic helps remember the phase relationships in inductors and capacitors?',
    options: ['OHM', 'CIVIL', 'WAPITI', 'SOHCAHTOA'],
    correctAnswer: 1,
    explanation:
      "CIVIL: in a Capacitor (C), I leads V; in an Inductor (L), V leads I. The middle letters spell 'IV' and 'VI' showing the leading quantity.",
  },
  {
    id: 8,
    question:
      'Two voltages V1 = 100V at 0 degrees and V2 = 100V at 60 degrees are added. What is the resultant magnitude?',
    options: ['100V', '141V', '173V', '200V'],
    correctAnswer: 2,
    explanation:
      'Using the formula for phasor addition: V = root(V1 squared + V2 squared + 2 times V1 times V2 times cos(theta)) = root(10000 + 10000 + 20000 times 0.5) = root 30000 = 173V.',
  },
  {
    id: 9,
    question: 'A 7.5kW motor has high starting current. Adding a capacitor bank would:',
    options: [
      'Increase the starting current further',
      'Reduce the phase angle, improving power factor',
      'Increase the phase angle',
      'Have no effect on phase relationships',
    ],
    correctAnswer: 1,
    explanation:
      'Capacitors supply leading reactive current that partially cancels the lagging reactive current of inductive loads. This reduces the overall phase angle and improves power factor.',
  },
  {
    id: 10,
    question:
      'On a phasor diagram, if voltage is the reference (at 0 degrees), where would you draw current for an RL circuit?',
    options: [
      'Ahead of voltage (anti-clockwise)',
      'Behind voltage (clockwise)',
      'At 90 degrees leading',
      'Exactly on the voltage phasor',
    ],
    correctAnswer: 1,
    explanation:
      'In an RL circuit, current lags voltage due to the inductance. On a phasor diagram with anti-clockwise rotation, lagging means the current phasor is drawn clockwise from (behind) the voltage reference.',
  },
  {
    id: 11,
    question: 'What is the period of one complete rotation of a phasor at 50Hz?',
    options: ['10ms', '20ms', '50ms', '100ms'],
    correctAnswer: 1,
    explanation:
      'Period T = 1/f = 1/50 = 0.02 seconds = 20ms. This is the time for one complete cycle of the AC waveform or one full rotation of the phasor.',
  },
  {
    id: 12,
    question:
      'For a series RLC circuit at resonance, what is the phase angle between supply voltage and current?',
    options: ['90 degrees leading', '90 degrees lagging', '45 degrees', '0 degrees'],
    correctAnswer: 3,
    explanation:
      'At resonance, XL = XC, so the reactive components cancel. The circuit behaves as pure resistance, and voltage and current are in phase (0 degrees).',
  },
];

const faqs = [
  {
    question: 'Why do we use phasors instead of waveform diagrams?',
    answer:
      'Phasors simplify AC calculations enormously. Adding two sinusoidal waveforms mathematically requires complex trigonometric integration. With phasors, you simply add vectors using parallelogram rules or component methods. This is particularly valuable when analysing circuits with multiple voltage sources or parallel branches.',
  },
  {
    question: 'What is the practical significance of power factor in building services?',
    answer:
      'Power factor affects the current drawn from the supply. A 10kW load at 0.7 pf draws 62A, but the same real power at 0.95 pf draws only 46A. This impacts cable sizes, transformer ratings, and electricity bills (as suppliers charge for poor power factor). Motors, discharge lighting, and VFDs often require power factor correction.',
  },
  {
    question: 'How do I remember whether current leads or lags in different components?',
    answer:
      'Use the mnemonic CIVIL: in a Capacitor (C), I (current) leads V (voltage); in an Inductor (L), V leads I. Alternatively, think physically: capacitors must charge before voltage builds up (I leads V), while inductors resist current changes (I lags V).',
  },
  {
    question: 'Why does motor starting current have such a poor power factor?',
    answer:
      'At standstill, a motor is essentially a large inductor - the rotor is not yet generating back-EMF. The current is almost purely reactive, giving power factors as low as 0.2-0.3. As the motor accelerates, back-EMF develops and the power factor improves to the running value (typically 0.8-0.9).',
  },
  {
    question: 'How do phasor diagrams help with three-phase systems?',
    answer:
      'Three-phase phasors are separated by 120 degrees. Phasor diagrams clearly show why line voltage is root 3 times phase voltage (the phasor difference between two phases). They also help analyse unbalanced loads and understand neutral currents in star-connected systems.',
  },
];

const HNCModule3Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 3"
            title="Phase Angle and Phasor Diagrams"
            description="Understanding AC phase relationships and graphical analysis techniques for building services circuits"
            tone="purple"
          />

          <TLDR
            points={[
              'You can represent any sinusoidal voltage or current as a phasor (magnitude ∠ angle) and convert between time-domain v(t) = V_max sin(ωt + φ) and phasor V ∠ φ.',
              'You can add and subtract phasors graphically (head-to-tail) and analytically (rectangular: a + jb, polar: r ∠ θ).',
              'You can construct the impedance triangle (R, X, Z) and the power triangle (P, Q, S) and read the phase angle off either.',
              'You can use phasor analysis to combine three-phase voltages 120° apart and prove that a balanced linear three-phase load has zero neutral current.',
              'You can spot leading and lagging power factors from the relative angle of I to V — the basis of every PFC calculation.',
            ]}
          />

          <RegsCallout
            source="BS EN 60044-1 / IEC 60044-1 — Instrument transformers (Current transformers)"
            clause="The phase displacement of an instrument current transformer is the difference in phase between the primary and secondary current vectors, expressed in centiradians or minutes, with the convention that displacement is positive when the secondary current vector leads the primary."
            meaning={
              <>
                Power-quality and energy-monitoring CTs in a building services switchroom
                are specified by accuracy class AND phase displacement. A phase error of even
                a few minutes shows up as an apparent power-factor offset on the BMS metering
                screen — phasor arithmetic is the only way to interpret what the readings
                actually mean.
              </>
            }
            cite="Source: BS EN 60044-1; superseded by BS EN 61869 series for new equipment."
          />

          <LearningOutcomes
            outcomes={[
              'Express sinusoidal waveforms using v = Vm sin(omega t + phi)',
              'Interpret and calculate phase angles in degrees and radians',
              'Construct phasor diagrams for AC voltages and currents',
              'Add and subtract phasors graphically and mathematically',
              'Determine voltage-current phase relationships in R, L, and C',
              'Apply phasor analysis to motor starting and capacitor correction',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Phase angle measures the angular difference between AC waveforms; phasors are rotating vectors that make AC analysis easier."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase angle (phi):</strong> Angular difference between waveforms
              </li>
              <li>
                <strong>Phasors:</strong> Rotating vectors representing AC quantities
              </li>
              <li>
                <strong>Leading:</strong> Waveform peaks before reference (positive phi)
              </li>
              <li>
                <strong>Lagging:</strong> Waveform peaks after reference (negative phi)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor circuits:</strong> Current lags voltage (inductive)
              </li>
              <li>
                <strong>Capacitor banks:</strong> Power factor correction
              </li>
              <li>
                <strong>Discharge lighting:</strong> Requires PF correction
              </li>
              <li>
                <strong>VFDs:</strong> Complex harmonic phase relationships
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Sinusoidal Waveforms and Phase Angle">
            <p>
              Alternating current varies sinusoidally with time. The instantaneous value at any
              moment depends on the peak value, angular frequency, and phase angle - all captured in
              the standard sinusoidal equation.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Sinusoidal Equation</p>
            <p>
              v = V<sub>m</sub> sin(omega t + phi)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>v</strong> = instantaneous voltage at time t</li>
              <li><strong>V<sub>m</sub></strong> = peak (maximum) voltage</li>
              <li><strong>omega</strong> = angular frequency = 2 pi f (rad/s)</li>
              <li><strong>t</strong> = time (seconds)</li>
              <li><strong>phi</strong> = phase angle at t = 0 (degrees or radians)</li>
            </ul>
            <p className="text-sm font-medium text-white">Key relationships:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Angular frequency:</strong> omega = 2 pi f = 2 x 3.14159 x 50 = 314 rad/s
                (UK)
              </li>
              <li>
                <strong>Period:</strong> T = 1/f = 1/50 = 0.02s = 20ms
              </li>
              <li>
                <strong>RMS value:</strong> V<sub>RMS</sub> = V<sub>m</sub> / root 2 = 0.707 x V
                <sub>m</sub>
              </li>
              <li>
                <strong>UK mains:</strong> V<sub>m</sub> = 230 x root 2 = 325V peak
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phase Angle Interpretation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>phi = 0 degrees:</strong> In phase with reference — No shift, standard sine wave
              </li>
              <li>
                <strong>phi = +30 degrees:</strong> Leads reference by 30 degrees — Shifted left (earlier in time)
              </li>
              <li>
                <strong>phi = -45 degrees:</strong> Lags reference by 45 degrees — Shifted right (later in time)
              </li>
              <li>
                <strong>phi = +90 degrees:</strong> Leads by quarter cycle — Starts at peak (cosine wave)
              </li>
              <li>
                <strong>phi = 180 degrees:</strong> In anti-phase — Inverted waveform
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Conversion:</strong> To convert degrees to radians, multiply by pi/180. For
              example, 90 degrees = 90 x pi/180 = pi/2 radians.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Phasor Representation of AC Quantities">
            <p>
              A phasor is a rotating vector that represents a sinusoidal quantity. The length
              represents magnitude (peak or RMS), and the angle represents phase. All phasors in a
              circuit rotate at the same angular frequency omega, so we can "freeze" them and
              analyse their relative positions.
            </p>
            <p className="text-sm font-medium text-white">Phasor fundamentals:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Length:</strong> Represents peak or RMS magnitude
              </li>
              <li>
                <strong>Angle:</strong> Measured anti-clockwise from positive x-axis (reference)
              </li>
              <li>
                <strong>Rotation:</strong> All phasors rotate anti-clockwise at omega rad/s
              </li>
              <li>
                <strong>Projection:</strong> Vertical component gives instantaneous value
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phasor Notation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polar form:</strong> V = |V| angle phi (e.g., 230V angle 30 degrees)
              </li>
              <li>
                <strong>Rectangular form:</strong> V = a + jb (where a = |V| cos phi, b = |V| sin phi)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Drawing Phasor Diagrams</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Choose a reference phasor (usually voltage)</li>
              <li>Draw reference horizontally to the right (0 degrees)</li>
              <li>Draw other phasors at correct angle and length</li>
              <li>Leading angles: anti-clockwise from reference</li>
              <li>Lagging angles: clockwise from reference</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Converting Forms</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polar to rectangular:</strong> a = |V| cos phi, b = |V| sin phi
              </li>
              <li>
                <strong>Rectangular to polar:</strong> |V| = root(a squared + b squared); phi = arctan(b/a)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Convention:</strong> In building services, we typically use RMS values for
              phasor magnitudes unless otherwise stated.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Voltage-Current Phase Relationships in R, L, C">
            <p>
              Each circuit element - resistor, inductor, and capacitor - has a characteristic phase
              relationship between voltage and current. Understanding these is essential for
              analysing AC circuits in building services.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Component Phase Behaviour</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resistor (R):</strong> V and I in phase (phi = 0 degrees). Ohm's law: V = IR at all instants. Example: Electric heaters, incandescent lamps
              </li>
              <li>
                <strong>Inductor (L):</strong> I lags V by 90 degrees (V leads I). Induced EMF opposes current change. Example: Motor windings, chokes, transformers
              </li>
              <li>
                <strong>Capacitor (C):</strong> I leads V by 90 degrees (V lags I). Current flows to charge plates before voltage builds. Example: PF correction capacitors, filter circuits
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">The CIVIL Mnemonic</p>
            <p>
              <strong>C-I-V-I-L:</strong> In a <strong>C</strong>apacitor, <strong>I</strong>{' '}
              leads <strong>V</strong>. In an <strong>I</strong>nductor (<strong>L</strong>),{' '}
              <strong>V</strong> leads <strong>I</strong>.
            </p>
            <p>
              The middle letters show which quantity leads: "IV" (I leads V) for capacitor, "VI"
              (V leads I) for inductor.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Combined Circuits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RL circuit:</strong> Current lags voltage by angle between 0 degrees and
                90 degrees
              </li>
              <li>
                <strong>RC circuit:</strong> Current leads voltage by angle between 0 degrees and
                90 degrees
              </li>
              <li>
                <strong>RLC circuit:</strong> Current may lead or lag depending on whether X
                <sub>L</sub> &gt; X<sub>C</sub> or X<sub>C</sub> &gt; X<sub>L</sub>
              </li>
              <li>
                <strong>At resonance:</strong> X<sub>L</sub> = X<sub>C</sub>, phase angle = 0
                degrees (purely resistive)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Power factor:</strong> cos(phi) where phi is the phase angle between V and I.
              Unity power factor (pf = 1) means V and I are in phase.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Phasor Addition and Building Services Applications">
            <p>
              Phasor addition is essential for calculating resultant voltages and currents in AC
              circuits. In building services, this applies to voltage drops in circuits, parallel
              branch currents, and power factor correction.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Phasor Addition Methods</p>
            <p className="text-sm font-medium text-white">Graphical (Parallelogram)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Draw first phasor from origin</li>
              <li>Draw second phasor from origin</li>
              <li>Complete parallelogram</li>
              <li>Diagonal from origin = resultant</li>
            </ul>
            <p className="text-sm font-medium text-white">Mathematical (Rectangular)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Convert each phasor to a + jb form</li>
              <li>
                Add real parts: a<sub>total</sub> = a<sub>1</sub> + a<sub>2</sub>
              </li>
              <li>
                Add imaginary parts: b<sub>total</sub> = b<sub>1</sub> + b<sub>2</sub>
              </li>
              <li>Convert back to polar if needed</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Formula for Two Phasors at Angle theta
            </p>
            <p>
              |V<sub>R</sub>| = root(V<sub>1</sub>
              <sup>2</sup> + V<sub>2</sub>
              <sup>2</sup> + 2V<sub>1</sub>V<sub>2</sub>cos theta)
            </p>
            <p>
              Special cases: theta = 0 degrees gives V<sub>1</sub> + V<sub>2</sub>; theta = 90
              degrees gives root(V<sub>1</sub>
              <sup>2</sup> + V<sub>2</sub>
              <sup>2</sup>); theta = 180 degrees gives |V<sub>1</sub> - V<sub>2</sub>|
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Building Services Applications
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor starting:</strong> High inductive current (6-8x full load) at 0.2-0.3 pf; current phasor nearly 90 degrees behind voltage
              </li>
              <li>
                <strong>Power factor correction:</strong> Capacitor current (leading) cancels inductive current (lagging); resultant closer to voltage reference
              </li>
              <li>
                <strong>Series voltage drops:</strong> V<sub>R</sub>, V<sub>L</sub>, V<sub>C</sub> add as phasors; supply = phasor sum of component voltages
              </li>
              <li>
                <strong>Parallel branch currents:</strong> Total current = phasor sum of branch currents (different phases)
              </li>
              <li>
                <strong>Three-phase systems:</strong> Line voltages = phasor difference between phases (120 degrees apart)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> When correcting power factor from 0.7 to 0.95 on a
              50kVA load, current reduces from 71A to 53A - allowing smaller cables or more capacity
              from existing infrastructure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Sinusoidal Expression</p>
            <p>
              <strong>Question:</strong> UK mains voltage has RMS value 230V at 50Hz, referenced
              as 0 degrees. Write the expression for instantaneous voltage.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Peak voltage: V<sub>m</sub> = V<sub>RMS</sub> x root 2
              </li>
              <li>
                V<sub>m</sub> = 230 x 1.414 = <strong>325V</strong>
              </li>
              <li>Angular frequency: omega = 2 pi f</li>
              <li>
                omega = 2 x 3.14159 x 50 = <strong>314 rad/s</strong>
              </li>
              <li>Phase angle: phi = 0 degrees (reference)</li>
              <li><strong>v = 325 sin(314t) volts</strong></li>
              <li>or equivalently: v = 325 sin(100 pi t) volts</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Phase Angle from Power Factor</p>
            <p>
              <strong>Question:</strong> An AHU motor operates at 0.85 power factor lagging.
              Calculate the phase angle and describe the current phasor position.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power factor = cos(phi)</li>
              <li>0.85 = cos(phi)</li>
              <li>
                phi = arccos(0.85) = <strong>31.8 degrees</strong>
              </li>
              <li>Since power factor is lagging (inductive load):</li>
              <li>Current lags voltage by 31.8 degrees</li>
              <li>On phasor diagram: draw voltage at 0 degrees, current at -31.8 degrees (clockwise from voltage)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Phasor Addition for Series RL Circuit</p>
            <p>
              <strong>Question:</strong> A series RL circuit has V<sub>R</sub> = 120V and V
              <sub>L</sub> = 90V. Calculate the supply voltage.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                In series RL: V<sub>R</sub> is in phase with current
              </li>
              <li>
                V<sub>L</sub> leads current (and V<sub>R</sub>) by 90 degrees
              </li>
              <li>
                Since V<sub>R</sub> and V<sub>L</sub> are 90 degrees apart:
              </li>
              <li>
                V<sub>S</sub> = root(V<sub>R</sub>
                <sup>2</sup> + V<sub>L</sub>
                <sup>2</sup>)
              </li>
              <li>
                V<sub>S</sub> = root(120<sup>2</sup> + 90<sup>2</sup>)
              </li>
              <li>
                V<sub>S</sub> = root(14400 + 8100) = root(22500)
              </li>
              <li>
                <strong>V<sub>S</sub> = 150V</strong>
              </li>
              <li>
                Phase angle: phi = arctan(V<sub>L</sub>/V<sub>R</sub>) = arctan(90/120) = 36.87
                degrees
              </li>
              <li>Supply leads current by 36.87 degrees</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Motor Starting Current Analysis</p>
            <p>
              <strong>Question:</strong> A 7.5kW motor has full-load current of 15A at 0.85 pf.
              Starting current is 6 times FLC at 0.25 pf. Analyse the starting condition.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Full-load condition:</strong></li>
              <li>
                I<sub>FL</sub> = 15A at pf = 0.85
              </li>
              <li>Phase angle = arccos(0.85) = 31.8 degrees lagging</li>
              <li><strong>Starting condition:</strong></li>
              <li>
                I<sub>start</sub> = 6 x 15 = <strong>90A</strong>
              </li>
              <li>
                Phase angle = arccos(0.25) = <strong>75.5 degrees lagging</strong>
              </li>
              <li>At start, current is nearly in quadrature with voltage</li>
              <li>(75.5 degrees vs 90 degrees for pure inductor)</li>
              <li>Warning: This 90A starting current causes significant voltage drop on supply cables and may require star-delta or soft starter for larger installations</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 5: Power Factor Correction with Capacitors</p>
            <p>
              <strong>Question:</strong> A 20kW load operates at 0.7 pf lagging. Calculate the
              capacitor kVAr needed to improve pf to 0.95 lagging.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Original condition (pf = 0.7):</strong></li>
              <li>
                phi<sub>1</sub> = arccos(0.7) = 45.6 degrees
              </li>
              <li>
                kVA<sub>1</sub> = kW / pf = 20 / 0.7 = 28.6 kVA
              </li>
              <li>
                kVAr<sub>1</sub> = kVA x sin(phi) = 28.6 x sin(45.6) = 20.4 kVAr (lagging)
              </li>
              <li><strong>Target condition (pf = 0.95):</strong></li>
              <li>
                phi<sub>2</sub> = arccos(0.95) = 18.2 degrees
              </li>
              <li>
                kVAr<sub>2</sub> = kW x tan(phi<sub>2</sub>) = 20 x tan(18.2) = 6.6 kVAr (lagging)
              </li>
              <li><strong>Capacitor required:</strong></li>
              <li>
                kVAr<sub>C</sub> = kVAr<sub>1</sub> - kVAr<sub>2</sub> = 20.4 - 6.6
              </li>
              <li><strong>Capacitor bank required: 13.8 kVAr (leading)</strong></li>
              <li>Current reduction: from 28.6 / 0.23 = 124A to 21.1 / 0.23 = 92A (26% reduction)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>v = V<sub>m</sub> sin(omega t + phi)</strong> - Instantaneous voltage
              </li>
              <li>
                <strong>omega = 2 pi f</strong> - Angular frequency (314 rad/s at 50Hz)
              </li>
              <li>
                <strong>V<sub>RMS</sub> = V<sub>m</sub> / root 2</strong> - RMS from peak
              </li>
              <li>
                <strong>phi = arccos(pf)</strong> - Phase angle from power factor
              </li>
              <li>
                <strong>pf = cos(phi)</strong> - Power factor from phase angle
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phasor Diagram Rules</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Choose voltage as reference (0 degrees) unless stated otherwise</li>
              <li>Phasors rotate anti-clockwise; leading = anti-clockwise from reference</li>
              <li>In series circuits: current is common - draw current then add voltage phasors</li>
              <li>In parallel circuits: voltage is common - draw voltage then add current phasors</li>
              <li>Resultant = phasor sum using parallelogram or component method</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                UK mains: omega = <strong>314 rad/s</strong>, T = <strong>20ms</strong>
              </li>
              <li>
                UK mains: V<sub>peak</sub> = <strong>325V</strong>, V<sub>RMS</sub> ={' '}
                <strong>230V</strong>
              </li>
              <li>
                Pure R: phi = <strong>0 degrees</strong>, pf = 1
              </li>
              <li>
                Pure L: phi = <strong>90 degrees lagging</strong>, pf = 0
              </li>
              <li>
                Pure C: phi = <strong>90 degrees leading</strong>, pf = 0
              </li>
              <li>
                Typical motor pf: <strong>0.8-0.9</strong> lagging (running)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common phasor and phase angle mistakes"
            whatHappens={
              <>
                Confusing lead/lag relationships. Adding magnitudes directly when phasors are not in
                phase. Calculator in wrong mode (degrees vs radians). Forgetting to state whether
                the result is leading or lagging. Mixing RMS and peak values in the same
                calculation.
              </>
            }
            doInstead={
              <>
                Use CIVIL: C = I leads V, L = V leads I. Only add magnitudes directly when in
                phase; otherwise use phasor sum. Check calculator mode before using arccos/arctan.
                Always state direction (leading/lagging). Be explicit which value (RMS or peak) is
                being used.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Diagnosing a phase-rotation alarm on a new VFD-driven AHU"
            situation={
              <>
                You have just energised a new variable-speed AHU fed from a 400 V three-phase
                VFD. The drive is showing a phase-rotation alarm and refusing to run. The
                building services BMS metering on the same supply reads correct line voltages
                but flags an unusual reverse-power indication on one of the CTs.
              </>
            }
            whatToDo={
              <>
                Sketch the supply phasor diagram — in a healthy 400 V system, V_L1, V_L2,
                V_L3 sit 120° apart in positive sequence (L1 → L2 → L3 anticlockwise).
                Verify with a phase-rotation meter at the panel terminals. If the meter
                confirms reverse rotation, swap any two phases at the upstream feeder. The CT
                reverse-power flag is the same problem expressed in phasor terms — the
                current phasor on the misconnected channel is sitting 180° from where the
                BMS expects it. Re-check after the swap and clear both alarms.
              </>
            }
            whyItMatters={
              <>
                Phasor diagrams turn an abstract “phase rotation” alarm into a picture you
                can fix. Without phasor reasoning you would be guessing at terminations —
                with it, the diagnosis is one sketch and one swap.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A phasor is a frozen snapshot of a sinusoid — magnitude (RMS) and angle (phase). Time disappears, geometry takes over.',
              'Time-to-phasor: v(t) = V_max sin(ωt + φ) → V = V_RMS ∠ φ.',
              'Polar to rectangular: r ∠ θ = r cosθ + j r sinθ. Use rectangular for addition; use polar for multiplication and division.',
              'Phasor addition obeys the parallelogram rule — the sum of two AC voltages is NOT just the arithmetic sum unless they are in phase.',
              'Three-phase balanced linear load: I_L1 + I_L2 + I_L3 = 0 by phasor sum — the basis of zero neutral current and the equilateral phasor triangle.',
              'Impedance triangle (R, X_L−X_C, Z) and power triangle (P, Q, S) share the same phase angle φ.',
              'Lagging PF (inductive load) → current phasor sits behind voltage phasor. Leading PF (capacitive load) → current phasor sits ahead.',
              'CT phase displacement (BS EN 61869 / IEC 60044-1) shows up directly as a power-factor error on the metering screen — phasor arithmetic decodes it.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Capacitance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Complex Notation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_3;
