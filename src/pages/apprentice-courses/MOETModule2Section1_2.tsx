/**
 * MOET · Module 2 · Section 2.1 · Subsection 2 — Ohm's Law and Watt's Law
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical engineering principles: circuit terminology,
 *     Ohm’s Law, transformer theory, and power calculations."
 *   · "Use mathematical principles and formulae to support engineering
 *     maintenance."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { OhmsLawTriangle, PowerTriangle } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = "Ohm's Law and Watt's Law - MOET Module 2 Section 1.2";
const DESCRIPTION =
  "Comprehensive guide to Ohm's Law (V=IR) and Watt's Law (P=IV) for electrical maintenance technicians: series and parallel circuits, voltage dividers, current dividers, worked examples, troubleshooting applications per BS 7671:2018+A4:2026.";

const quickCheckQuestions = [
  {
    id: 'ohms-law-triangle',
    question:
      "Using Ohm's Law, what current flows through a 23 ohm resistor connected to a 230 V supply?",
    options: ['253 A', '5 A', '10 A', '0.1 A'],
    correctIndex: 2,
    explanation:
      "Using Ohm's Law: I = V / R = 230 / 23 = 10 A. This is a typical calculation you would perform when checking whether a load is drawing the correct current — for example, verifying a heater element is functioning correctly by comparing measured current against the calculated value.",
  },
  {
    id: 'series-voltage',
    question:
      'Three resistors of 10, 20 and 30 ohms are connected in series across a 120 V supply. What is the total current in the circuit?',
    options: ['12 A', '6 A', '0.5 A', '2 A'],
    correctIndex: 3,
    explanation:
      'In a series circuit, total resistance = R1 + R2 + R3 = 10 + 20 + 30 = 60 ohms. Total current = V / Rt = 120 / 60 = 2 A. In a series circuit, this same current flows through every component — it is the same at every point in the circuit.',
  },
  {
    id: 'parallel-resistance',
    question: 'Two 100 ohm resistors are connected in parallel. What is the total resistance?',
    options: ['50 ohms', '200 ohms', '25 ohms', '100 ohms'],
    correctIndex: 0,
    explanation:
      'For two equal resistors in parallel: Rt = R / n = 100 / 2 = 50 ohms. Using the formula: 1/Rt = 1/R1 + 1/R2 = 1/100 + 1/100 = 2/100, so Rt = 100/2 = 50 ohms. The total resistance of a parallel combination is always less than the smallest individual resistance.',
  },
  {
    id: 'watts-law',
    question:
      "A motor draws 15 A from a 400 V three-phase supply. Using the single-phase form of Watt's Law (P = V x I), what is the apparent power per phase?",
    options: ['415 W', '26.7 W', '6000 W', '6000 VA'],
    correctIndex: 3,
    explanation:
      'Per phase: P = V x I = 400 x 15 = 6000 VA (volt-amperes). Note we use VA (not watts) because this gives the apparent power. The true power in watts depends on the power factor. For a motor with a typical power factor of 0.85, the true power would be 6000 x 0.85 = 5100 W per phase.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Ohm's Law states that:",
    options: [
      'Current is directly proportional to resistance at constant voltage',
      'Voltage is directly proportional to current at constant resistance',
      'Power equals voltage multiplied by resistance',
      'Resistance is directly proportional to current at constant voltage',
    ],
    correctAnswer: 1,
    explanation:
      "Ohm's Law states that, for a conductor at constant temperature, the voltage across it is directly proportional to the current flowing through it: V = IR. If resistance remains constant, doubling the voltage will double the current.",
  },
  {
    id: 2,
    question: 'A 2 kW heater is connected to a 230 V supply. What current does it draw?',
    options: ['460 A', '0.115 A', '8.7 A', '4.6 A'],
    correctAnswer: 2,
    explanation:
      "Using Watt's Law rearranged: I = P / V = 2000 / 230 = 8.7 A. This is a common calculation for determining the current drawn by appliances to select the correct fuse rating or circuit breaker.",
  },
  {
    id: 3,
    question: 'In a series circuit, which quantity remains the same through all components?',
    options: ['Resistance', 'Voltage', 'Power', 'Current'],
    correctAnswer: 3,
    explanation:
      'In a series circuit, the current is the same at every point because there is only one path for current to flow. The voltage divides across the components in proportion to their resistances, and each component may dissipate different amounts of power.',
  },
  {
    id: 4,
    question:
      'Three resistors of 4, 6 and 12 ohms are connected in series. What is the total resistance?',
    options: ['22 ohms', '7.3 ohms', '12 ohms', '2 ohms'],
    correctAnswer: 0,
    explanation:
      'In a series circuit, total resistance is the sum of individual resistances: Rt = R1 + R2 + R3 = 4 + 6 + 12 = 22 ohms. Series resistance is always greater than the largest individual resistance.',
  },
  {
    id: 5,
    question: 'In a parallel circuit, which quantity is the same across all branches?',
    options: ['Resistance', 'Voltage', 'Power', 'Current'],
    correctAnswer: 1,
    explanation:
      'In a parallel circuit, the voltage across each branch is the same because they are all connected between the same two points. The current divides between the branches — more current flows through the branch with the lower resistance.',
  },
  {
    id: 6,
    question:
      'Two resistors of 6 ohms and 12 ohms are connected in parallel. What is the combined resistance?',
    options: ['9 ohms', '6 ohms', '4 ohms', '18 ohms'],
    correctAnswer: 2,
    explanation:
      'Using the product-over-sum formula for two resistors in parallel: Rt = (R1 x R2) / (R1 + R2) = (6 x 12) / (6 + 12) = 72 / 18 = 4 ohms. Note that 4 ohms is less than the smaller resistor (6 ohms), confirming the parallel combination has less resistance than either branch alone.',
  },
  {
    id: 7,
    question:
      'Using P = I squared x R, what power is dissipated in a cable with 0.5 ohm resistance carrying 20 A?',
    options: ['10 W', '40 W', '400 W', '200 W'],
    correctAnswer: 3,
    explanation:
      'P = I squared x R = 20 squared x 0.5 = 400 x 0.5 = 200 W. This represents the heat generated in the cable. This is a critical calculation in maintenance — excessive I squared R losses lead to cable overheating and potential fire risk, which is why cable sizing must account for current-carrying capacity.',
  },
  {
    id: 8,
    question:
      'A 230 V supply feeds two 100 ohm resistors in series. What voltage appears across each resistor?',
    options: ['115 V', '230 V', '23 V', '460 V'],
    correctAnswer: 0,
    explanation:
      'In a series circuit, voltage divides in proportion to resistance. Since both resistors are equal (100 ohms each), the voltage divides equally: 230 / 2 = 115 V across each. This is the voltage divider principle — the voltage across each component is proportional to its share of the total resistance.',
  },
  {
    id: 9,
    question:
      'A maintenance technician measures 230 V across a motor but only 0.5 A of current. The motor nameplate states 4.5 A. What does this suggest?',
    options: [
      'The supply voltage is too high for the motor to operate correctly',
      'There may be a high-resistance fault in the circuit or motor windings',
      'The motor is operating normally and drawing its rated current',
      'There is a short circuit between two of the motor windings',
    ],
    correctAnswer: 1,
    explanation:
      "If the voltage is correct (230 V) but the current is significantly lower than expected (0.5 A vs 4.5 A nameplate), Ohm's Law tells us the resistance must be much higher than normal: R = V/I = 230/0.5 = 460 ohms, compared to the expected R = 230/4.5 = 51 ohms. This points to a high-resistance fault — possibly a broken winding, corroded connection, or open-circuit phase.",
  },
  {
    id: 10,
    question: 'Which formula correctly relates power to voltage and resistance?',
    options: ['P = V x R', 'P = V / R', 'P = V squared / R', 'P = R squared / V'],
    correctAnswer: 2,
    explanation:
      'P = V squared / R is derived from substituting I = V/R into P = IV: P = V x (V/R) = V squared / R. This form is particularly useful when you know the supply voltage and the resistance of a load, such as calculating the power output of a heating element.',
  },
  {
    id: 11,
    question:
      'A 12 V supply feeds a parallel circuit with branches drawing 2 A, 3 A and 1 A respectively. What is the total current from the supply?',
    options: ['1 A', '2 A', '3 A', '6 A'],
    correctAnswer: 3,
    explanation:
      "In a parallel circuit, the total current is the sum of the branch currents: It = I1 + I2 + I3 = 2 + 3 + 1 = 6 A. This is Kirchhoff's Current Law — the total current entering a junction equals the total current leaving it. This principle is used when calculating the total load on a distribution board.",
  },
  {
    id: 12,
    question:
      'A heating element has a resistance of 19.3 ohms when cold but increases to 22.1 ohms when hot. At 230 V, what is the difference in current between cold and hot conditions?',
    options: [
      'Approximately 1.5 A',
      'Approximately 11.9 A',
      'Approximately 0.7 A',
      'Approximately 2.8 A',
    ],
    correctAnswer: 0,
    explanation:
      'Cold current: I = V/R = 230/19.3 = 11.9 A. Hot current: I = V/R = 230/22.1 = 10.4 A. Difference = 11.9 - 10.4 = 1.5 A. This demonstrates why heating elements draw more current when first switched on (inrush) and why protective devices must be selected to accommodate this initial surge without nuisance tripping.',
  },
];

const faqs = [
  {
    question: "Does Ohm's Law apply to all electrical components?",
    answer:
      "Ohm's Law applies to 'ohmic' or 'linear' components where resistance remains constant regardless of the applied voltage — such as resistors and most metallic conductors at constant temperature. Non-ohmic components include filament lamps (resistance increases with temperature), diodes (resistance depends on voltage polarity), and thermistors (resistance changes significantly with temperature). However, Ohm's Law can still be applied instantaneously to non-ohmic devices at any specific operating point.",
  },
  {
    question: 'Why do we need different forms of the power equation?',
    answer:
      'The three forms of the power equation (P = IV, P = I squared R, P = V squared / R) all give the same result, but each is useful in different situations depending on which quantities you know or can measure. For example, if you only have a voltmeter and know the resistance, use P = V squared / R. If you have a clamp meter and know the resistance, use P = I squared R. Having multiple forms means you can always calculate power without needing to find an intermediate value first.',
  },
  {
    question: 'What is the difference between series and parallel circuit behaviour in practice?',
    answer:
      'In series circuits (like old Christmas tree lights), if one component fails open-circuit, the entire circuit stops. In parallel circuits (like sockets on a ring final circuit), each branch operates independently — one branch failing does not affect the others. Most power distribution in buildings uses parallel connections so that each load can operate independently and at the full supply voltage.',
  },
  {
    question: "How does Ohm's Law help with fault-finding?",
    answer:
      "Ohm's Law is one of the most powerful fault-finding tools. By measuring any two of voltage, current and resistance, you can calculate the third and compare it to the expected value. If the measured current is lower than expected for the measured voltage, the resistance must be higher than normal — suggesting a high-resistance joint, corroded connection, or damaged conductor. Conversely, if current is higher than expected, resistance is lower — suggesting a partial short circuit or insulation breakdown.",
  },
  {
    question:
      'Why is the total resistance of a parallel circuit always less than the smallest individual resistance?',
    answer:
      "Adding resistors in parallel provides additional paths for current to flow. Each new path increases the total current drawn from the supply for the same voltage. Since total resistance = V / total current, and the total current increases with each parallel branch, the total resistance must decrease. Think of it like opening additional lanes on a motorway — adding more lanes reduces the overall 'resistance' to traffic flow, even though each individual lane has a fixed capacity.",
  },
];

const MOETModule2Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.1 · Subsection 2"
        title="Ohm's Law and Watt's Law"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The essential formulae that underpin all electrical circuit analysis and fault
            diagnosis.
          </p>

          <TLDR
            points={[
              "Ohm's Law: V = I x R — voltage, current and resistance relationship",
              "Watt's Law: P = I x V — power, current and voltage relationship",
              'Series: Current same everywhere; voltages add; resistances add',
              'Parallel: Voltage same everywhere; currents add; reciprocal resistances add',
              'Fault-finding: Compare measured V, I, R against calculated values',
              'Cable losses: P = I squared R gives heat generated in conductors',
              'Load assessment: I = P / V determines circuit loading',
              'ST1426: Essential calculation skills for maintenance practice',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply Ohm's Law (V=IR) and its transpositions to solve circuit problems",
              "Apply Watt's Law (P=IV) and derived formulae (P=I squared R, P=V squared /R)",
              'Analyse series circuits: calculate total resistance, current, and voltage drops',
              'Analyse parallel circuits: calculate total resistance and branch currents',
              'Apply voltage divider and current divider rules to practical circuits',
              "Use Ohm's Law as a diagnostic tool for electrical fault-finding",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Ohm's Law — V = I x R</ContentEyebrow>

          <ConceptBlock title="Ohm's Law — V = I x R">
            <p>
              Ohm's Law, discovered by Georg Simon Ohm in 1827, is the most fundamental relationship
              in electrical engineering. It states that the voltage across a conductor is directly
              proportional to the current flowing through it, provided the temperature (and
              therefore the resistance) remains constant.
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <p className="font-mono text-base text-elec-yellow">V = I x R</p>
              <p className="text-sm text-white">
                Voltage (volts) = Current (amperes) x Resistance (ohms)
              </p>
            </div>
            <p>
              From this single equation, we can derive two transpositions by rearranging
              algebraically. These three forms of Ohm's Law allow you to find any unknown quantity
              if you know the other two:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">To Find</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                    <th className="border border-white/10 px-3 py-2 text-left">You Need to Know</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Maintenance Application
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Voltage</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">V = I x R</td>
                    <td className="border border-white/10 px-3 py-2">Current and resistance</td>
                    <td className="border border-white/10 px-3 py-2">
                      Calculating voltage drop across a cable run
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Current</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">I = V / R</td>
                    <td className="border border-white/10 px-3 py-2">Voltage and resistance</td>
                    <td className="border border-white/10 px-3 py-2">
                      Predicting load current for protective device selection
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Resistance</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">R = V / I</td>
                    <td className="border border-white/10 px-3 py-2">Voltage and current</td>
                    <td className="border border-white/10 px-3 py-2">
                      Checking a heating element by measuring V and I on site
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The Ohm's Law Triangle">
            <p>
              A useful memory aid is the Ohm's Law triangle. Place V at the top and I and R at the
              bottom. Cover the quantity you want to find — what remains shows the formula:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Cover V — leaves I x R (voltage = current multiplied by resistance)</li>
              <li>Cover I — leaves V over R (current = voltage divided by resistance)</li>
              <li>Cover R — leaves V over I (resistance = voltage divided by current)</li>
            </ul>
          </ConceptBlock>

          <OhmsLawTriangle />

          <Scenario
            title="Maintenance Scenario"
            situation={
              <>
                A maintenance technician is fault-finding a 230 V single-phase heating circuit. The
                clamp meter reads 12.5 A. What is the resistance of the heating element?
              </>
            }
            whatToDo={
              <>
                <p>R = V / I</p>
                <p>R = 230 / 12.5</p>
                <p>
                  R = <strong>18.4 ohms</strong>
                </p>
              </>
            }
            whyItMatters={
              <>
                The nameplate states the element is 3 kW. Expected current: I = P/V = 3000/230 = 13
                A. The measured 12.5 A is slightly low, suggesting a minor increase in resistance —
                possibly due to ageing or a developing fault in the element.
              </>
            }
          />

          <ConceptBlock title="Limitations of Ohm's Law">
            <p>
              Ohm's Law assumes constant resistance. In practice, the resistance of many components
              changes with temperature (filament lamps, heating elements), voltage polarity
              (diodes), or light level (LDRs). These are called 'non-ohmic' or 'non-linear' devices.
              For AC circuits with inductors or capacitors, we must use impedance (Z) instead of
              simple resistance — impedance includes both resistance and reactance: V = I x Z. This
              is covered in detail in later sections.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The single most-used formula">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> Despite its apparent simplicity, Ohm's Law is the single
              most-used formula in electrical maintenance. You will apply it dozens of times every
              working day — when reading test results, verifying circuit performance, diagnosing
              faults, and checking that protective devices will operate within the required
              parameters.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Watt's Law and derived power formulae</ContentEyebrow>

          <ConceptBlock title="Watt's Law and Derived Power Formulae">
            <p>
              Watt's Law defines the relationship between electrical power, voltage and current.
              Combined with Ohm's Law, it provides a complete toolkit for analysing any DC circuit
              and many aspects of AC circuits.
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <p className="font-mono text-base text-elec-yellow">P = I x V</p>
              <p className="text-sm text-white">
                Power (watts) = Current (amperes) x Voltage (volts)
              </p>
            </div>
            <p>
              By substituting Ohm's Law into Watt's Law, we derive two additional power formulae.
              Together, these three equations let you calculate power from any combination of two
              known quantities:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Derivation</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Best Used When</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Practical Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-mono">P = I x V</td>
                    <td className="border border-white/10 px-3 py-2">Base formula</td>
                    <td className="border border-white/10 px-3 py-2">
                      You know voltage and current
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Clamp meter on circuit: 230 V, 10 A = 2300 W
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-mono">P = I² x R</td>
                    <td className="border border-white/10 px-3 py-2">
                      Substitute V = IR into P = IV
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      You know current and resistance
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Cable loss: 20 A through 0.5 ohm = 200 W heat
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-mono">P = V² / R</td>
                    <td className="border border-white/10 px-3 py-2">
                      Substitute I = V/R into P = IV
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      You know voltage and resistance
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Heater element: 230² / 19.3 = 2742 W
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <PowerTriangle />

          <ConceptBlock title="Transpositions of Watt's Law">
            <p>Each power formula can be rearranged to find any of its component quantities:</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-medium text-elec-yellow/70">From P = IV:</p>
                <ul className="space-y-0.5 text-xs text-white">
                  <li>I = P / V</li>
                  <li>V = P / I</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-elec-yellow/70">From P = I²R:</p>
                <ul className="space-y-0.5 text-xs text-white">
                  <li>I = square root of (P / R)</li>
                  <li>R = P / I²</li>
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-elec-yellow/70">From P = V²/R:</p>
                <ul className="space-y-0.5 text-xs text-white">
                  <li>V = square root of (P x R)</li>
                  <li>R = V² / P</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Critical Concept: I²R Losses">
            <p>
              The formula P = I²R is particularly important in maintenance because it describes the
              heat generated in any conductor carrying current. Since power loss is proportional to
              the <strong>square</strong> of the current, doubling the current quadruples the heat
              loss. This is why overloaded cables become dangerously hot, why high-resistance joints
              cause fires, and why BS 7671 places strict limits on cable current-carrying capacity.
              During thermal imaging surveys, you are looking for evidence of excessive I²R heating
              at connections and joints.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Converting connected load to current">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Maintenance application:</strong> When assessing circuit loading on a
              distribution board, use I = P/V to convert the connected load (in watts or kilowatts)
              to current (in amperes). This tells you whether the circuit is overloaded and whether
              the protective device rating is adequate. For example, a 32 A ring final circuit on a
              230 V supply can theoretically supply P = IV = 230 x 32 = 7360 W (7.36 kW).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Series circuits</ContentEyebrow>

          <ConceptBlock title="Series Circuits">
            <p>
              A series circuit has only one path for current to flow. All components are connected
              end-to-end in a single loop. If any component fails open-circuit (breaks), the entire
              circuit stops. Series connections are less common in power distribution but are found
              in control circuits, fuse arrangements, and safety interlocks.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three Rules of Series Circuits">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current is the same</strong> at every point in the circuit: I(total) = I1 =
                I2 = I3
              </li>
              <li>
                <strong>Voltages add up</strong> to equal the supply voltage: V(supply) = V1 + V2 +
                V3
              </li>
              <li>
                <strong>Resistances add up</strong> to give total resistance: R(total) = R1 + R2 +
                R3
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Voltage Divider Rule">
            <p>
              In a series circuit, the voltage across each component is proportional to its
              resistance as a fraction of the total resistance. This is the voltage divider
              principle:
            </p>
            <div className="text-center">
              <p className="font-mono text-base text-elec-yellow">
                V(n) = V(supply) x R(n) / R(total)
              </p>
            </div>
            <p>
              For example, in a series circuit with R1 = 20 ohms and R2 = 80 ohms across a 100 V
              supply: V1 = 100 x 20/100 = 20 V, V2 = 100 x 80/100 = 80 V. The larger resistor drops
              the larger voltage.
            </p>
          </ConceptBlock>

          <Scenario
            title="Series Circuit Analysis"
            situation={
              <>
                Three resistors (R1 = 10 ohms, R2 = 22 ohms, R3 = 15 ohms) are connected in series
                across a 230 V supply. Calculate: (a) total resistance, (b) circuit current, (c)
                voltage across each resistor, (d) power dissipated by each resistor.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>(a)</strong> Rt = 10 + 22 + 15 = <strong>47 ohms</strong>
                </p>
                <p>
                  <strong>(b)</strong> I = V / Rt = 230 / 47 = <strong>4.89 A</strong>
                </p>
                <p>
                  <strong>(c)</strong> V1 = IR1 = 4.89 x 10 = 48.9 V
                </p>
                <p>V2 = IR2 = 4.89 x 22 = 107.6 V</p>
                <p>V3 = IR3 = 4.89 x 15 = 73.4 V</p>
                <p>
                  Check: 48.9 + 107.6 + 73.4 = 229.9 V (rounding accounts for the 0.1 V difference)
                </p>
                <p>
                  <strong>(d)</strong> P1 = I²R1 = 4.89² x 10 = 239.1 W
                </p>
                <p>P2 = I²R2 = 4.89² x 22 = 526.0 W</p>
                <p>P3 = I²R3 = 4.89² x 15 = 358.6 W</p>
                <p>
                  Total power: 239.1 + 526.0 + 358.6 = 1123.7 W. Check: P = VI = 230 x 4.89 = 1124.7
                  W (close match)
                </p>
              </>
            }
          />

          <ConceptBlock title="Series Circuits in Maintenance">
            <p>
              The most common series circuit you will encounter is a safety interlock chain —
              emergency stop buttons, guard switches, and safety relays connected in series so that
              opening any one device breaks the circuit and stops the machine. Understanding series
              behaviour is essential for troubleshooting these circuits. If the machine will not
              start, check for an open switch or broken conductor anywhere in the series chain using
              a voltmeter to identify where voltage is being dropped.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Voltage drop as unwanted series resistance">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> In practice, voltage drop along cables acts as an unwanted
              series resistance. BS 7671 limits voltage drop to 3% for lighting and 5% for other
              circuits (from the origin of the installation to the load). This is calculated using
              the cable resistance per metre and the current flowing — a direct application of V =
              IR in a series context.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Parallel circuits</ContentEyebrow>

          <ConceptBlock title="Parallel Circuits">
            <p>
              A parallel circuit provides multiple paths for current to flow. Each branch is
              connected directly across the supply, so every branch receives the full supply
              voltage. Most electrical distribution systems use parallel connections — each socket,
              light fitting, and appliance on a circuit is connected in parallel so they all operate
              at the supply voltage and can function independently.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three Rules of Parallel Circuits">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage is the same</strong> across all branches: V(total) = V1 = V2 = V3
              </li>
              <li>
                <strong>Currents add up</strong> to give the total supply current: I(total) = I1 +
                I2 + I3
              </li>
              <li>
                <strong>Reciprocal resistances add:</strong> 1/R(total) = 1/R1 + 1/R2 + 1/R3
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Calculating Parallel Resistance">
            <p>
              There are several methods for calculating total parallel resistance, depending on the
              situation:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Use When</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Reciprocal formula</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">
                      1/Rt = 1/R1 + 1/R2 + 1/R3...
                    </td>
                    <td className="border border-white/10 px-3 py-2">Any number of resistors</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Product over sum</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">
                      Rt = (R1 x R2) / (R1 + R2)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Exactly two resistors</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Equal resistors</td>
                    <td className="border border-white/10 px-3 py-2 font-mono">Rt = R / n</td>
                    <td className="border border-white/10 px-3 py-2">
                      n identical resistors in parallel
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Current Divider Rule">
            <p>
              In a parallel circuit, the total current divides between the branches in inverse
              proportion to their resistance — more current flows through the lower resistance path:
            </p>
            <div className="text-center">
              <p className="font-mono text-base text-elec-yellow">
                I(n) = I(total) x R(total) / R(n)
              </p>
            </div>
            <p>
              For two resistors in parallel, a useful shortcut: I1 = I(total) x R2 / (R1 + R2). Note
              that the 'other' resistor appears in the numerator — the current in one branch depends
              on the resistance of the other branch.
            </p>
          </ConceptBlock>

          <Scenario
            title="Parallel Circuit Analysis"
            situation={
              <>
                Three loads (R1 = 46 ohms, R2 = 115 ohms, R3 = 230 ohms) are connected in parallel
                across a 230 V supply. Calculate: (a) branch currents, (b) total current, (c) total
                resistance.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>(a)</strong> I1 = V/R1 = 230/46 = 5 A
                </p>
                <p>I2 = V/R2 = 230/115 = 2 A</p>
                <p>I3 = V/R3 = 230/230 = 1 A</p>
                <p>
                  <strong>(b)</strong> I(total) = 5 + 2 + 1 = <strong>8 A</strong>
                </p>
                <p>
                  <strong>(c)</strong> Rt = V/I(total) = 230/8 = <strong>28.75 ohms</strong>
                </p>
                <p>Check: 1/Rt = 1/46 + 1/115 + 1/230 = 0.02174 + 0.00870 + 0.00435 = 0.03478</p>
                <p>Rt = 1/0.03478 = 28.75 ohms (confirmed)</p>
              </>
            }
          />

          <ConceptBlock title="Parallel Circuits in Maintenance Practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Distribution boards:</strong> Every circuit on a distribution board is
                connected in parallel across the supply. The total current drawn from the incoming
                supply is the sum of all circuit currents
              </li>
              <li>
                <strong>Ring final circuits:</strong> A ring final circuit is essentially two
                conductors in parallel, halving the effective cable resistance and allowing higher
                current capacity
              </li>
              <li>
                <strong>Earth paths:</strong> Multiple earth paths in parallel (CPC, armour,
                conduit, extraneous conductive parts) reduce the overall earth fault loop impedance,
                improving protection
              </li>
              <li>
                <strong>Adding loads:</strong> Each new parallel load reduces total resistance and
                increases total current — this is why overloading circuits is dangerous
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Adding loads increases total current">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> When loads are added in parallel, the total current
              increases. If too many appliances are connected to a single circuit, the total current
              may exceed the rating of the protective device or the current-carrying capacity of the
              cable, creating an overload condition. This is one of the most common causes of
              circuit breaker tripping that maintenance technicians are called to investigate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Troubleshooting with Ohm's Law and Watt's Law</ContentEyebrow>

          <ConceptBlock title="Troubleshooting with Ohm's Law and Watt's Law">
            <p>
              The real power of Ohm's Law and Watt's Law in maintenance is their application to
              fault diagnosis. By comparing measured values against calculated expected values, you
              can pinpoint the nature and location of faults without dismantling equipment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Diagnostic Framework">
            <p>When investigating an electrical fault, follow this logical process:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Determine the expected values from nameplate data, design
                documents, or previous test records
              </li>
              <li>
                <strong>Step 2:</strong> Measure the actual voltage, current, or resistance (as
                appropriate and safe to do so)
              </li>
              <li>
                <strong>Step 3:</strong> Calculate the 'missing' quantity using Ohm's Law or Watt's
                Law
              </li>
              <li>
                <strong>Step 4:</strong> Compare measured/calculated values against expected values
              </li>
              <li>
                <strong>Step 5:</strong> Determine the fault type based on the discrepancy
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fault Diagnosis Table">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Current</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Indicates</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Possible Cause</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Normal</td>
                    <td className="border border-white/10 px-3 py-2">Low</td>
                    <td className="border border-white/10 px-3 py-2">
                      Higher resistance than expected
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      High-resistance joint, corroded connection, partial winding failure
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Normal</td>
                    <td className="border border-white/10 px-3 py-2">High</td>
                    <td className="border border-white/10 px-3 py-2">
                      Lower resistance than expected
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Short-circuit between windings, insulation breakdown, overload
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Normal</td>
                    <td className="border border-white/10 px-3 py-2">Zero</td>
                    <td className="border border-white/10 px-3 py-2">
                      Open circuit (infinite resistance)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Broken conductor, blown fuse, open contactor, broken element
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Low</td>
                    <td className="border border-white/10 px-3 py-2">Normal/Low</td>
                    <td className="border border-white/10 px-3 py-2">Voltage drop in supply</td>
                    <td className="border border-white/10 px-3 py-2">
                      Supply overloaded, loose neutral, long cable run, poor supply connection
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">High</td>
                    <td className="border border-white/10 px-3 py-2">High</td>
                    <td className="border border-white/10 px-3 py-2">Overvoltage condition</td>
                    <td className="border border-white/10 px-3 py-2">
                      Lost neutral on three-phase supply, transformer tap setting wrong
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="High-Resistance Joint"
            situation={
              <>
                A maintenance technician is called to investigate a distribution board where one
                circuit breaker is running warm. The circuit supplies a 3 kW load.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Expected:</strong> I = P/V = 3000/230 = 13 A
                </p>
                <p>
                  <strong>Measured:</strong> I = 12.8 A (close to expected — load appears correct)
                </p>
                <p>
                  <strong>But:</strong> Thermal camera shows 85 degrees C at one terminal (others at
                  35 degrees C)
                </p>
                <p>
                  <strong>Analysis:</strong> The hot terminal has a high-resistance connection. Even
                  a small additional resistance generates significant heat at 13 A: if the bad
                  connection adds just 0.5 ohms, P = I²R = 13² x 0.5 = 84.5 W of localised heating
                </p>
              </>
            }
            whyItMatters={
              <>
                <strong>Action:</strong> Isolate, allow to cool, clean and re-make the connection,
                torque to manufacturer specification, re-test.
              </>
            }
          />

          <ConceptBlock title="Using Voltage Drop for Fault Location">
            <p>
              In a series circuit (such as a long cable run), you can locate a fault by measuring
              the voltage at different points along the circuit. A significant voltage drop across a
              short section indicates high resistance at that point — typically a damaged conductor,
              corroded joint, or loose connection. Under load, measure the voltage at the supply end
              and at the load end. The difference is the total voltage drop. If this exceeds the BS
              7671 limit (typically 3-5% of the nominal supply voltage), identify where in the run
              the excessive drop occurs by measuring at intermediate points.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Show your working">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to apply Ohm's Law and Watt's Law to
              fault-finding is a core competence for maintenance technicians. During the end-point
              assessment, you may be asked to demonstrate systematic fault diagnosis using these
              principles. Always show your working and explain the logic behind your measurements.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              "Ohm's Law: V = IR | I = V/R | R = V/I. Watt's Law: P = IV | I = P/V | V = P/I, plus P = I²R | P = V²/R.",
              'Series circuits: Rt = R1 + R2 + R3; It = I1 = I2 = I3; Vt = V1 + V2 + V3.',
              'Parallel circuits: 1/Rt = 1/R1 + 1/R2 + 1/R3 (two resistors: Rt = (R1 x R2)/(R1 + R2)); It = I1 + I2 + I3; Vt = V1 = V2 = V3.',
              'Key references: BS 7671:2018+A4:2026 — voltage drop limits; ST1426 — electrical fundamentals KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Voltage, Current, Resistance and Power
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Energy and Efficiency
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section1_2;
