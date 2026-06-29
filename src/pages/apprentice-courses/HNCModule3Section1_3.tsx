/**
 * Module 3 · Section 1 · Subsection 3 — Series Circuits
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Single-path circuits — the model behind cable resistance adding to load resistance,
 *   string-wired emergency lighting and any voltage-sensing or signal-conditioning network.
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

const TITLE = 'Series Circuits - HNC Module 3 Section 1.3';
const DESCRIPTION =
  'Understand series circuit behaviour: current distribution, voltage division, total resistance calculations, and practical building services applications.';

const quickCheckQuestions = [
  {
    id: 'series-current',
    question:
      'In a series circuit with three resistors, the current through R2 is 2A. What is the current through R1 and R3?',
    options: [
      '2A through each',
      'Depends on resistance values',
      '1A through each',
      '6A total split between them',
    ],
    correctIndex: 0,
    explanation:
      'In a series circuit, current is the SAME through all components. If 2A flows through R2, then 2A also flows through R1 and R3 - this is the defining characteristic of series circuits.',
  },
  {
    id: 'voltage-divider',
    question:
      'A 24V supply feeds two resistors in series: 100Ω and 200Ω. What voltage appears across the 200Ω resistor?',
    options: [
      '8V',
      '16V',
      '12V',
      '24V',
    ],
    correctIndex: 1,
    explanation:
      'Using the voltage divider rule: V2 = VT × (R2/RT) = 24V × (200/300) = 24V × 0.667 = 16V. The larger resistor drops the larger voltage.',
  },
  {
    id: 'total-resistance',
    question:
      'Three resistors of 10Ω, 22Ω, and 47Ω are connected in series. What is the total resistance?',
    options: [
      '47Ω',
      '79Ω',
      '6.1Ω',
      '26.3Ω',
    ],
    correctIndex: 1,
    explanation:
      'In series circuits, total resistance is simply the sum: RT = R1 + R2 + R3 = 10 + 22 + 47 = 79Ω. Series resistance always increases total resistance.',
  },
  {
    id: 'emergency-lighting',
    question:
      'An emergency lighting battery pack has 10 cells in series, each 1.2V. What is the total battery voltage?',
    options: [
      '120V',
      '12V',
      '1.2V',
      '6V',
    ],
    correctIndex: 1,
    explanation:
      'Voltage sources in series add together: VT = 10 × 1.2V = 12V. This is why NiCd/NiMH emergency lighting packs use multiple cells in series to achieve the required voltage.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the defining characteristic of a series circuit?',
    options: [
      'Voltage is the same across all components',
      'Current is the same through all components',
      'Resistance is the same for all components',
      'Power is equally distributed',
    ],
    correctAnswer: 1,
    explanation:
      'In a series circuit, there is only one path for current flow, so the current must be identical through every component. This is the fundamental property of series circuits.',
  },
  {
    id: 2,
    question:
      'Three resistors of 15Ω, 27Ω, and 33Ω are connected in series to a 230V supply. What current flows?',
    options: [
      '6.13A',
      '1.53A',
      '3.07A',
      '17.25A',
    ],
    correctAnswer: 2,
    explanation:
      "RT = 15 + 27 + 33 = 75Ω. Using Ohm's Law: I = V/R = 230/75 = 3.07A. This current flows through all three resistors.",
  },
  {
    id: 3,
    question: 'In a series circuit, how does voltage distribute across components?',
    options: [
      'Inversely proportional to resistance',
      'Equally across all components',
      'Randomly distributed',
      'Proportional to resistance',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage divides proportionally to resistance. Larger resistors drop more voltage (V = IR, and since I is constant, V is proportional to R).',
  },
  {
    id: 4,
    question:
      'A PIR sensor circuit has three series resistors: 4.7kΩ, 10kΩ, and 2.2kΩ from a 12V supply. What voltage appears across the 10kΩ resistor?',
    options: [
      '7.10V',
      '5.92V',
      '3.33V',
      '10V',
    ],
    correctAnswer: 0,
    explanation: 'RT = 4.7 + 10 + 2.2 = 16.9kΩ. V10k = 12V × (10/16.9) = 12V × 0.592 = 7.10V',
  },
  {
    id: 5,
    question: 'What happens to total resistance when more resistors are added in series?',
    options: [
      'Total resistance decreases',
      'Total resistance increases',
      'Depends on the voltage',
      'Total resistance stays the same',
    ],
    correctAnswer: 1,
    explanation:
      'Adding resistors in series always increases total resistance because RT = R1 + R2 + R3 + ... Each additional resistor adds to the total.',
  },
  {
    id: 6,
    question:
      'An emergency lighting unit contains 8 NiCd cells (1.2V each) in series. During discharge, each cell drops to 1.0V. What is the pack voltage?',
    options: [
      '1.0V',
      '9.6V',
      '8.0V',
      '12.8V',
    ],
    correctAnswer: 2,
    explanation:
      'With 8 cells at 1.0V each in series: VT = 8 × 1.0V = 8.0V. This voltage drop indicates the battery needs recharging.',
  },
  {
    id: 7,
    question:
      'A voltage divider uses R1 = 1kΩ and R2 = 2kΩ from a 9V supply. What voltage is available at the junction (across R2)?',
    options: [
      '3V',
      '4.5V',
      '9V',
      '6V',
    ],
    correctAnswer: 3,
    explanation:
      'V2 = VT × (R2/RT) = 9V × (2kΩ/3kΩ) = 9V × 0.667 = 6V. The output is taken across R2.',
  },
  {
    id: 8,
    question:
      'In a series circuit with a 12V supply, if one component drops 5V and another drops 3V, what must the third component drop?',
    options: [
      '4V',
      '8V',
      '2V',
      '12V',
    ],
    correctAnswer: 0,
    explanation:
      "Kirchhoff's Voltage Law states that the sum of voltage drops equals the supply voltage. 5V + 3V + V3 = 12V, therefore V3 = 4V.",
  },
  {
    id: 9,
    question: 'Why are fuses connected in series with the load they protect?',
    options: [
      'So the fuse only carries a fraction of the load current',
      'So current flows through both - if fuse blows, circuit opens',
      'So the supply voltage is shared between fuse and load',
      'So the fuse provides an alternative path around the load',
    ],
    correctAnswer: 1,
    explanation:
      'The fuse must carry the same current as the load (series connection). When current exceeds the rating, the fuse element melts, breaking the circuit and stopping current flow to the load.',
  },
  {
    id: 10,
    question:
      'A cable has resistance of 0.1Ω per metre. For a 50m single-phase run, what is the total cable resistance?',
    options: [
      '5Ω',
      '100Ω',
      '10Ω',
      '50Ω',
    ],
    correctAnswer: 2,
    explanation:
      'Cable resistance is in series: line conductor (50m × 0.1Ω = 5Ω) + neutral conductor (50m × 0.1Ω = 5Ω) = 10Ω total. Always remember both conductors in single-phase circuits.',
  },
];

const faqs = [
  {
    question: 'How do I remember the difference between series and parallel circuits?',
    answer:
      'Series = Single path (current has no choice but to flow through every component). Think of a string of Christmas lights where if one bulb fails, they all go out. Parallel = Multiple paths (current can choose different routes). Each component has its own direct connection to the supply.',
  },
  {
    question: 'Why does voltage divide in a series circuit?',
    answer:
      'Because energy is transferred as current flows through each resistance. Think of it like water flowing through pipes - pressure (voltage) drops as the water passes through restrictions (resistors). The larger the restriction, the greater the pressure drop. Mathematically, V = IR, and since I is constant in series, voltage is proportional to resistance.',
  },
  {
    question: 'What practical applications use series circuits in building services?',
    answer:
      'Emergency lighting battery packs (cells in series for higher voltage), fuses and circuit breakers (in series with protected circuits), voltage dividers in sensor circuits, cable resistance (inherently in series), and some LED strings. However, most power distribution uses parallel circuits for redundancy.',
  },
  {
    question: 'Why is total series resistance just the sum of individual resistances?',
    answer:
      'Because the same current must flow through each resistor in turn. The total opposition to current flow is cumulative - each resistor adds its resistance to the path. There is no alternative path, so the current faces all the resistances sequentially.',
  },
  {
    question: 'How do I calculate voltage drop across a specific resistor in series?',
    answer:
      'Two methods: (1) Calculate current first using I = VT/RT, then use V = I × R for the specific resistor. (2) Use the voltage divider rule directly: V1 = VT × (R1/RT). Both give the same answer - the divider rule is often quicker.',
  },
  {
    question: 'What happens if one component fails open in a series circuit?',
    answer:
      'The entire circuit stops working - current cannot flow because there is no complete path. This is why series circuits are used for safety devices (fuses, emergency stops) but not typically for power distribution where continuity of supply is important.',
  },
];

const HNCModule3Section1_3 = () => {
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
            eyebrow="Module 3 · Section 1 · Subsection 3"
            title="Series Circuits"
            description="Understanding how current, voltage, and resistance behave when components share a single path"
            tone="purple"
          />

          <TLDR
            points={[
              'You can recognise a series circuit (one path, one current) and apply R_T = R₁ + R₂ + R₃ — the model used every time cable resistance adds in series with the load.',
              'You can use the voltage-divider rule Vₙ = V_T × (Rₙ / R_T) for sensor circuits, control wiring and signal-conditioning networks.',
              'You can sum series voltage sources — the basis of every battery pack in emergency lighting, fire-alarm and BMS standby systems.',
              'You can spot the single-point-of-failure character of series circuits and design around it where reliability matters.',
              'You can use series analysis to estimate the voltage actually delivered to a load once cable losses are included.',
            ]}
          />

          <RegsCallout
            source="BS 5266-1 — Emergency lighting (Code of practice for the emergency lighting of premises)"
            clause="Self-contained and central-battery emergency luminaires shall maintain rated luminous output for the declared duration (typically 1 h or 3 h) at the end of life of the battery, with the supply voltage at the lower limit of the declared range."
            meaning={
              <>
                Series cell stacks in NiCd or LiFePO₄ emergency luminaire packs are sized
                so that the end-of-life cell voltage × number of cells still drives the
                LED string at rated lumen output. Series circuit analysis is the design
                arithmetic that proves the duration claim.
              </>
            }
            cite="Source: BS 5266-1 (latest edition); BS EN 1838 illuminance levels."
          />

          <LearningOutcomes
            outcomes={[
              'Identify the key characteristics of series circuits',
              'Calculate total resistance in series combinations',
              'Apply the voltage divider rule to practical circuits',
              'Analyse current flow in series configurations',
              'Design voltage divider circuits for sensor applications',
              'Understand series circuit applications in building services',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="One path for current. Same current through every component, voltage divides, resistances add."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current:</strong> Same through all components (I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub>)
              </li>
              <li>
                <strong>Voltage:</strong> Divides across components (V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub>)
              </li>
              <li>
                <strong>Resistance:</strong> Adds up (R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub>)
              </li>
              <li>Single path for current flow</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Emergency lighting:</strong> Battery cells in series
              </li>
              <li>
                <strong>Protection:</strong> Fuses/MCBs in series with loads
              </li>
              <li>
                <strong>Sensors:</strong> Voltage divider reference circuits
              </li>
              <li>
                <strong>Cables:</strong> Line + neutral resistance in series
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Series Circuit Fundamentals">
            <p>
              A series circuit has only one path for current to flow. Every electron that leaves the
              supply must pass through each component in turn before returning. This single-path
              characteristic determines all the behaviour of series circuits.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Three Rules of Series Circuits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current:</strong> I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub> — Same through all components
              </li>
              <li>
                <strong>Voltage:</strong> V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub> — Divides across components
              </li>
              <li>
                <strong>Resistance:</strong> R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> — Adds up (sum of all)
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Why Current is Constant:</p>
            <p>
              Think of water flowing through a pipe with several restrictions. The same amount of
              water must pass through each restriction - it cannot accumulate or disappear.
              Similarly, charge is conserved in electrical circuits. Every coulomb entering a
              component must exit it.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>If 2A enters a resistor, 2A must exit it</li>
              <li>Charge cannot be stored in a resistor</li>
              <li>This is Kirchhoff's Current Law in action</li>
            </ul>
            <p className="text-sm font-medium text-white">Why Voltage Divides:</p>
            <p>
              Energy is transferred as current flows through each resistance. The voltage drop
              across each resistor represents the energy converted per coulomb of charge. Larger
              resistors convert more energy, so they have larger voltage drops.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Kirchhoff's Voltage Law: V<sub>supply</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub>
              </li>
              <li>Voltage is proportional to resistance (V = IR, I is constant)</li>
              <li>Larger resistors drop more voltage</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Calculating Total Resistance">
            <p>
              Total resistance in a series circuit is simply the sum of all individual resistances.
              This is because the current must overcome each resistance in sequence - there is no
              alternative path.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Series Resistance Formula</p>
            <p>
              <strong>R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub></strong> — Simply add all resistance values together
            </p>
            <p className="text-sm font-medium text-white">Worked Example 1: Emergency Lighting Control Circuit</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> Control circuit with 3 resistors in series:
              </li>
              <li>R<sub>1</sub> = 1.2kΩ, R<sub>2</sub> = 3.3kΩ, R<sub>3</sub> = 2.7kΩ</li>
              <li>R<sub>T</sub> = 1.2kΩ + 3.3kΩ + 2.7kΩ = <strong>7.2kΩ</strong></li>
            </ul>
            <p className="text-sm font-medium text-white">Worked Example 2: Cable Resistance</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 25m cable run, 2.5mm² copper (7.41mΩ/m)
              </li>
              <li>Single-phase circuit (line + neutral in series)</li>
              <li>Line conductor: 25m × 7.41mΩ/m = 0.185Ω</li>
              <li>Neutral conductor: 25m × 7.41mΩ/m = 0.185Ω</li>
              <li>R<sub>cable</sub> = 0.185 + 0.185 = <strong>0.37Ω</strong></li>
              <li>(Or simply: 25m × 2 × 7.41mΩ/m = 0.37Ω)</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> Series resistance is always greater than the largest
              individual resistance. Adding any resistance to a series circuit increases the total -
              there is no way to reduce it by adding components in series.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Voltage Divider Rule">
            <p>
              The voltage divider rule allows direct calculation of the voltage across any resistor
              in a series circuit without first calculating the current. This is particularly useful
              for sensor circuits and reference voltage generation.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Divider Formula</p>
            <p>
              <strong>V<sub>x</sub> = V<sub>T</sub> × (R<sub>x</sub> / R<sub>T</sub>)</strong> —
              Voltage across any resistor = Total voltage × (that resistance / total resistance)
            </p>
            <p className="text-sm font-medium text-white">Worked Example 3: PIR Sensor Reference Voltage</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 12V DC supply, need 4V reference for comparator
              </li>
              <li>Using R<sub>1</sub> = 2kΩ (top) and R<sub>2</sub> = 1kΩ (bottom)</li>
              <li>R<sub>T</sub> = 2kΩ + 1kΩ = 3kΩ</li>
              <li>V<sub>out</sub> = 12V × (1kΩ / 3kΩ) = 12V × 0.333 = <strong>4V</strong> ✓</li>
            </ul>
            <p className="text-sm font-medium text-white">Worked Example 4: Two-Resistor Divider Design</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Task:</strong> Design a divider to give 5V from 24V DC (BMS sensor input)
              </li>
              <li>
                V<sub>out</sub>/V<sub>in</sub> = R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = 5/24 = 0.208
              </li>
              <li>Choose R<sub>2</sub> = 10kΩ</li>
              <li>0.208 = 10k/(R<sub>1</sub>+10k) → R<sub>1</sub> + 10k = 10k/0.208 = 48.1kΩ</li>
              <li>R<sub>1</sub> = <strong>38.1kΩ</strong> (use 39kΩ standard value)</li>
              <li>Check: V<sub>out</sub> = 24 × (10/49) = 4.9V ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Divider Advantages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple, passive, no power supply needed</li>
              <li>Creates reference voltages for sensors</li>
              <li>Scales high voltages for measurement</li>
              <li>Level shifting between systems</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Divider Limitations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Output changes if load is connected</li>
              <li>Wastes power (current flows constantly)</li>
              <li>Not suitable for power delivery</li>
              <li>Load must be high impedance</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Application 1: Emergency Lighting Battery Packs">
            <p>
              Emergency lighting units typically use NiCd or NiMH cells connected in series to
              achieve the required voltage. Each cell provides approximately 1.2V.
            </p>
            <p>
              <strong>V<sub>pack</sub> = n × V<sub>cell</sub></strong> — Pack voltage = number of
              cells × cell voltage
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> Emergency luminaire requires 24V battery backup
              </li>
              <li>Using NiCd cells: 1.2V per cell (charged)</li>
              <li>n = V<sub>required</sub> / V<sub>cell</sub> = 24V / 1.2V = <strong>20 cells</strong></li>
              <li>End of discharge (1.0V/cell): V<sub>min</sub> = 20 × 1.0V = 20V</li>
              <li>Luminaire must operate from 20V to 24V range</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Application 2: PIR Sensor Threshold Circuits">
            <p>
              PIR sensors use voltage dividers to set reference thresholds for motion detection
              comparators. The divider creates a stable reference voltage.
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> PIR circuit powered by 5V, needs 2.5V reference
              </li>
              <li>Using equal resistors: R<sub>1</sub> = R<sub>2</sub> = 10kΩ</li>
              <li>V<sub>ref</sub> = 5V × (10k / 20k) = 5V × 0.5 = <strong>2.5V</strong> ✓</li>
              <li>Current draw: I = 5V / 20kΩ = 0.25mA (negligible for battery operation)</li>
            </ul>
            <p>
              <strong>Design Note:</strong> High resistance values (10kΩ+) minimise current drain in
              battery-powered sensors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application 3: Protective Devices in Series">
            <p>
              Fuses, MCBs, and RCBOs are always connected in series with the circuit they protect.
              This ensures the protective device carries the full load current.
            </p>
            <p>
              <strong>Series connection ensures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Protective device sees full circuit current</li>
              <li>When device operates, circuit is completely disconnected</li>
              <li>No current can bypass the protection</li>
              <li>Fault current must flow through the device</li>
            </ul>
            <p className="text-sm text-orange-300">
              <strong>Critical:</strong> A protective device in parallel would be ineffective -
              current would bypass it through the lower-resistance parallel path.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application 4: Control Panel Indicator LEDs">
            <p>
              Multiple LEDs can be connected in series from a higher voltage supply. The supply
              voltage must exceed the sum of all LED forward voltages.
            </p>
            <p className="text-sm font-medium text-white">Worked Example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Given:</strong> 3 green LEDs (V<sub>f</sub>=2.2V each) from 24V DC
              </li>
              <li>Required current: 15mA per LED</li>
              <li>V<sub>LEDs</sub> = 3 × 2.2V = 6.6V</li>
              <li>V<sub>R</sub> = 24V - 6.6V = 17.4V</li>
              <li>R = 17.4V / 0.015A = <strong>1160Ω</strong></li>
              <li>Use 1.2kΩ standard value (I = 14.5mA)</li>
              <li>Power dissipation: P<sub>R</sub> = 0.0145² × 1200 = 0.25W (use 0.5W resistor)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Series Circuit Calculations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Total resistance:</strong> Simply add all values (R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + ...)
              </li>
              <li>
                <strong>Current:</strong> Calculate once, applies everywhere (I = V<sub>T</sub>/R<sub>T</sub>)
              </li>
              <li>
                <strong>Voltage drops:</strong> Use V = IR for each component, or voltage divider rule
              </li>
              <li>
                <strong>Cable resistance:</strong> Remember to double for single-phase (line + neutral)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Divider Design Tips</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Choose resistor values 10× higher than load impedance minimum</li>
              <li>Use 1% tolerance resistors for precision applications</li>
              <li>Consider temperature coefficient for outdoor installations</li>
              <li>Add decoupling capacitor for noise-sensitive circuits</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common series circuit mistakes"
            whatHappens={
              <>
                Forgetting cable return path (always ×2 for single-phase). Loading voltage dividers
                with low-impedance loads (output changes). Mixing units (kΩ, Ω, mΩ) when summing.
                Assuming voltage is constant (it divides — current is constant in series, not
                voltage).
              </>
            }
            doInstead={
              <>
                Always double cable runs for Vd. Use high-impedance loads (or buffer the divider
                with an op-amp). Convert all resistances to a single unit before adding. Remember:
                series = same current, parallel = same voltage.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing the battery string for a 3 h maintained emergency luminaire"
            situation={
              <>
                You are specifying a self-contained 3 h maintained emergency luminaire for a
                hotel escape route. The LED engine needs 24 V DC at 0.4 A under emergency
                operation. You are using LiFePO₄ cells (3.2 V nominal, 2.8 V end-of-life)
                in series.
              </>
            }
            whatToDo={
              <>
                Pick the cell count from the end-of-life voltage so the lamp still runs at
                spec when the battery is at the bottom of its discharge curve: ceiling(24 V /
                2.8 V) = 9 cells in series (giving 25.2 V end-of-life, 28.8 V nominal). Then
                size the series current-limiting resistor (or constant-current driver) to drop
                the surplus voltage to the LED engine’s forward voltage at 0.4 A. Finally,
                pick a cell capacity (Ah) of at least I_load × duration × derating
                factor — typically 0.4 A × 3 h × 1.25 ≈ 1.5 Ah minimum.
              </>
            }
            whyItMatters={
              <>
                The whole BS 5266-1 duration claim rests on series-circuit arithmetic. Get the
                cell count wrong and the lamp dims out before the 3 h is up — a
                certifiable non-compliance and a life-safety failure on the day it is needed.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Series circuits have a single current path — the same current flows through every component (I_T = I₁ = I₂ = I₃).',
              'Total resistance is the sum of individual resistances: R_T = R₁ + R₂ + R₃ + ... — always greater than the largest single R.',
              'Voltages add: V_T = V₁ + V₂ + V₃ — useful for both sources (battery cells in series) and resistive drops.',
              'Voltage-divider rule: Vₙ = V_T × (Rₙ / R_T) — the larger R drops the larger voltage.',
              'Cable resistance always sits in series with the load — this is why voltage drop matters and why long cable runs need bigger conductors.',
              'Series circuits are single-point-of-failure by design: one open-circuit and the whole chain dies. Use parallel where redundancy matters.',
              'Series battery cells multiply voltage but not capacity (Ah) — the underpinning model for every emergency-lighting pack and BMS UPS string.',
              'Series voltage division is the working model for sensor pull-up networks, control-circuit dividers and signal-conditioning interfaces.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Ohm's Law
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Parallel Circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_3;
