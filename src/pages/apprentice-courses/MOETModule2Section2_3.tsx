/**
 * MOET · Module 2 · Section 2.2 · Subsection 3 — Single-Phase vs Three-Phase Systems
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use…"
 *   · "Electrical. Functions and applications of electrical circuits."
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { ThreePhaseWave } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Single-Phase vs Three-Phase Systems - MOET Module 2.2.3';
const DESCRIPTION =
  'Comprehensive guide to single-phase and three-phase AC systems for maintenance technicians: 230 V single-phase, 400 V three-phase, star and delta connections, line vs phase values, neutral current, power calculations, balanced and unbalanced loads, and industrial applications under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'three-phase-voltage',
    question:
      'In a UK three-phase supply, the voltage between any two line conductors is 400 V. What is the voltage between any line and neutral?',
    options: ['400 V', '200 V', '230 V', '325 V'],
    correctIndex: 2,
    explanation:
      'In a star-connected three-phase system, the line-to-neutral voltage (phase voltage) equals the line voltage divided by √3: VL-N = VL-L / √3 = 400 / 1.732 = 230 V. This is the standard UK single-phase supply voltage and is derived directly from the three-phase system.',
  },
  {
    id: 'star-delta',
    question: 'In a star (Y) connection, the neutral point is formed by connecting together:',
    options: [
      'Both ends of a single phase winding',
      'The three line conductors at the supply head',
      'One end of each of the three phase windings',
      'The outer ends of the three phase windings',
    ],
    correctIndex: 2,
    explanation:
      'In a star connection, one end of each of the three phase windings is connected to a common point called the star point (or neutral point). The other ends of the windings connect to the three line conductors (L1, L2, L3). The neutral conductor is connected to the star point, providing the reference for the 230 V line-to-neutral voltage.',
  },
  {
    id: 'balanced-load',
    question: 'In a perfectly balanced three-phase four-wire system, the neutral current is:',
    options: [
      'Zero',
      'Equal to one line current',
      'Three times the line current',
      'Equal to the sum of all three line currents',
    ],
    correctIndex: 0,
    explanation:
      'In a perfectly balanced three-phase system, the three line currents are equal in magnitude and displaced by 120 degrees. When added vectorially, they cancel out completely, resulting in zero neutral current. This is one of the key advantages of three-phase systems — the neutral conductor carries no current under balanced conditions.',
  },
  {
    id: 'three-phase-power',
    question: 'The total power in a balanced three-phase load is calculated as:',
    options: ['P = VL x IL', 'P = √3 x VL x IL x cos φ', 'P = 3 x VL x IL', 'P = VL² / R'],
    correctIndex: 1,
    explanation:
      'The total three-phase power is: P = √3 x VL x IL x cos φ. The √3 factor accounts for the 120-degree phase displacement between the three phases. For a 400 V supply with 100 A line current at unity power factor: P = 1.732 x 400 x 100 x 1 = 69.28 kW.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A UK domestic property is typically supplied with:',
    options: [
      'Three-phase 400 V (three phases and neutral from the network)',
      'Single-phase 230 V (one phase and neutral from the three-phase network)',
      'Two-phase 460 V (two phases without a neutral)',
      'Single-phase 110 V (centre-tapped from a site transformer)',
    ],
    correctAnswer: 1,
    explanation:
      'UK domestic properties are typically supplied with single-phase 230 V — this is one phase conductor and a neutral conductor taken from the local three-phase distribution network. The DNO distributes three-phase 400 V along the street and connects individual properties to alternate phases to balance the load across the three-phase system.',
  },
  {
    id: 2,
    question: 'The phase displacement between L1, L2 and L3 in a three-phase supply is:',
    options: ['180 degrees', '90 degrees', '120 degrees', '360 degrees'],
    correctAnswer: 2,
    explanation:
      'In a three-phase supply, the three phases are displaced by 120 degrees (one-third of a complete cycle). This means L2 lags L1 by 120 degrees, and L3 lags L1 by 240 degrees (or leads by 120 degrees). This uniform displacement is what produces the constant instantaneous power and rotating magnetic field that make three-phase systems so efficient.',
  },
  {
    id: 3,
    question:
      'In a delta (Δ) connection, the relationship between line current and phase current is:',
    options: ['IL = IP / √3', 'IL = IP (they are equal)', 'IL = 3 x IP', 'IL = √3 x IP'],
    correctAnswer: 3,
    explanation:
      'In a delta connection, each line conductor is connected to the junction of two phase windings. The line current is the vector sum of the two phase currents meeting at each junction, giving: IL = √3 x IP. Conversely, in a delta connection the line voltage equals the phase voltage: VL = VP.',
  },
  {
    id: 4,
    question: 'Which connection type provides both 230 V and 400 V from the same system?',
    options: [
      'Star connection with neutral',
      'Delta connection',
      'Series connection',
      'Parallel connection',
    ],
    correctAnswer: 0,
    explanation:
      'A star connection with a neutral conductor provides two voltage levels: 400 V between any two lines (line voltage) and 230 V between any line and neutral (phase voltage). This is the standard distribution arrangement in the UK, allowing single-phase 230 V loads and three-phase 400 V loads to be supplied from the same system.',
  },
  {
    id: 5,
    question: "A three-phase motor has a nameplate rating of 'Δ 400 V'. This means:",
    options: [
      'The motor must be supplied at 400 V between each line and neutral',
      'Each motor winding is rated for 400 V, connected in delta across the 400 V supply',
      'The motor draws 400 V across each winding only when connected in star',
      'The motor is a 400 V single-phase machine wired between two lines',
    ],
    correctAnswer: 1,
    explanation:
      'A delta 400 V rating means each motor winding is rated for 400 V and is connected directly across the 400 V line voltage in delta configuration. In star, each winding would only receive 230 V (400/√3). Many motors are dual-rated (e.g., Δ400V/Y690V), allowing the winding configuration to be changed to match the available supply voltage.',
  },
  {
    id: 6,
    question: 'An unbalanced three-phase load causes which of the following problems?',
    options: [
      'A complete loss of supply on the most heavily loaded phase',
      'Reversal of the phase rotation seen by connected motors',
      'Current flowing in the neutral conductor, voltage imbalance between phases, increased losses',
      'An automatic increase in supply frequency to compensate for the imbalance',
    ],
    correctAnswer: 2,
    explanation:
      'Unbalanced loads cause neutral current to flow (which would be zero in a balanced system), create voltage imbalance between phases (the most heavily loaded phase has the lowest voltage), increase system losses (I²R losses increase with imbalance), and can cause overheating of the neutral conductor. Severe unbalance can also cause three-phase motors to overheat and fail.',
  },
  {
    id: 7,
    question:
      'Star-delta starting of a three-phase motor reduces the starting current to approximately:',
    options: [
      'Half of the direct-on-line starting current',
      'One-tenth of the direct-on-line starting current',
      'One-quarter of the direct-on-line starting current',
      'One-third of the direct-on-line starting current',
    ],
    correctAnswer: 3,
    explanation:
      'Star-delta starting connects the motor in star during start-up, reducing the voltage across each winding to 230 V (instead of 400 V in delta). Since power is proportional to V², the starting current is reduced to approximately one-third (1/√3² = 1/3) of the direct-on-line delta current. The motor is then switched to delta for full-speed running.',
  },
  {
    id: 8,
    question:
      'The main advantage of three-phase power over single-phase for industrial applications is:',
    options: [
      'Three-phase supplies provide constant instantaneous power and a rotating magnetic field for motors',
      'Three-phase supplies eliminate the need for any earthing or protective conductors',
      'Three-phase supplies operate at a lower frequency, reducing transformer losses',
      'Three-phase supplies allow motors to run without any starting current at all',
    ],
    correctAnswer: 0,
    explanation:
      'Three-phase power delivers constant instantaneous power (unlike single-phase, which pulsates at 100 Hz). This means three-phase motors produce smooth, constant torque with no vibration. Three-phase also provides a naturally rotating magnetic field, allowing simple and robust induction motors with no starting mechanisms. Additionally, three-phase transmits 73% more power than single-phase using only 50% more conductors.',
  },
  {
    id: 9,
    question:
      'A three-phase 400 V supply feeds a balanced load drawing 50 A per line at a power factor of 0.85. The total power consumed is:',
    options: ['17 kW', '29.4 kW', '34 kW', '58.8 kW'],
    correctAnswer: 1,
    explanation:
      'Total three-phase power P = √3 x VL x IL x cos φ = 1.732 x 400 x 50 x 0.85 = 29,444 W ≈ 29.4 kW. This formula applies to both star and delta balanced loads when using line values. Always remember to include the power factor — without it, you would calculate the apparent power (kVA), not the real power (kW).',
  },
  {
    id: 10,
    question: 'Phase rotation (phase sequence) is important because:',
    options: [
      'Incorrect phase rotation increases the supply voltage above 400 V',
      'Incorrect phase rotation causes the neutral current to rise sharply',
      'Incorrect phase rotation causes three-phase motors to rotate in the wrong direction',
      'Incorrect phase rotation stops the protective device from operating on fault',
    ],
    correctAnswer: 2,
    explanation:
      'Phase rotation (the order in which the three phases reach their peak values — typically L1-L2-L3) determines the direction of the rotating magnetic field in three-phase motors. Incorrect phase rotation causes the motor to rotate in the wrong direction, which can be dangerous for pumps, fans, conveyors and other driven equipment. Always verify phase rotation with a phase rotation meter before connecting three-phase motors.',
  },
  {
    id: 11,
    question:
      'In a star-connected system, the relationship between line voltage and phase voltage is:',
    options: ['VL = VP', 'VL = 3 x VP', 'VL = VP / √3', 'VL = √3 x VP'],
    correctAnswer: 3,
    explanation:
      'In a star connection, the line voltage is √3 times the phase voltage: VL = √3 x VP. This is because the line voltage is the vector difference between two phase voltages 120 degrees apart. For the UK: VP = 230 V, so VL = 1.732 x 230 = 400 V (approximately). The line current equals the phase current in a star connection: IL = IP.',
  },
  {
    id: 12,
    question:
      'Which of the following loads is most likely to cause a significant neutral current in a three-phase four-wire system?',
    options: [
      'A large number of single-phase computer loads unevenly distributed across phases',
      'A balanced three-phase induction motor running at full load',
      'A three-phase resistive heater with equal elements on each phase',
      'A delta-connected transformer with no neutral connection at all',
    ],
    correctAnswer: 0,
    explanation:
      'Single-phase loads (computers, lighting, socket outlets) connected unevenly across the three phases create an unbalanced system with neutral current. Additionally, computer power supplies draw current rich in third harmonics, which add arithmetically in the neutral (they are in phase on all three lines). In modern office buildings, the neutral current can actually exceed the line current due to triplen harmonics — a significant fire risk if the neutral is undersized.',
  },
];

const faqs = [
  {
    question: 'Why is the UK three-phase voltage 400 V and not 690 V?',
    answer:
      'The UK three-phase line voltage of 400 V is derived from the single-phase voltage of 230 V via the √3 relationship: 230 x 1.732 ≈ 400 V. The system was designed primarily to deliver 230 V single-phase to domestic consumers from a star-connected distribution transformer. The 400 V line voltage is a consequence of this design. Higher distribution voltages (e.g., 690 V) are used in some industrial applications where the benefits of reduced current (and therefore smaller conductors) outweigh the increased safety precautions required.',
  },
  {
    question: 'Can I connect a three-phase motor to a single-phase supply?',
    answer:
      'A standard three-phase induction motor cannot run directly on a single-phase supply because single-phase cannot produce a rotating magnetic field. However, solutions exist: a variable speed drive (VSD) can convert single-phase to three-phase (with derating); a static phase converter or rotary phase converter can generate the third phase; and some small motors can be rewound for single-phase operation. Running a three-phase motor from a single-phase VSD typically requires derating the drive by 50%.',
  },
  {
    question: 'What happens if the neutral conductor breaks in a three-phase four-wire system?',
    answer:
      'A broken neutral in a three-phase four-wire system (with single-phase loads) is extremely dangerous. Without the neutral reference point, the voltage across each single-phase load is no longer fixed at 230 V — it redistributes based on the impedance of the loads. Lightly loaded phases see voltages rising towards 400 V, while heavily loaded phases see reduced voltage. Overvoltage can destroy equipment and cause fires. This is why neutral conductors must never be switched or fused in TN systems under BS 7671.',
  },
  {
    question: 'What is the difference between a TN-S, TN-C-S and TT earthing system?',
    answer:
      "These are the three main earthing arrangements defined by BS 7671. TN-S: separate neutral and earth conductors throughout (supply earth via cable sheath). TN-C-S (PME): combined neutral and earth in the supply cable (PEN conductor), separated at the consumer's installation. TT: no earth from the supply — the consumer provides their own earth electrode. The earthing system determines the fault loop impedance, the type of protective device required, and the maximum disconnection times for safety.",
  },
  {
    question: 'Why are some three-phase motors rated 400V/690V?',
    answer:
      'Dual-voltage motors have windings that can be connected in either delta (Δ) or star (Y). At 400 V supply: delta connection puts 400 V across each winding. At 690 V supply: star connection puts 690/√3 = 400 V across each winding. In both cases, each winding receives 400 V and the motor operates identically. This allows the same motor to be used on either 400 V or 690 V three-phase supplies simply by changing the terminal links. Star-delta starting on a 400 V supply temporarily connects the motor in star (winding voltage = 230 V), then switches to delta for running.',
  },
];

const MOETModule2Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.2 · Subsection 3"
        title="Single-Phase vs Three-Phase Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding single-phase and three-phase supply arrangements, connections and
            applications in electrical maintenance.
          </p>

          <TLDR
            points={[
              'Single-phase: 230 V line-to-neutral — domestic and light commercial.',
              'Three-phase: 400 V line-to-line — industrial motors, large loads.',
              'Star (Y): VL = √3 x VP, provides both 230 V and 400 V.',
              'Delta (Δ): IL = √3 x IP, used for motor windings and distribution.',
            ]}
          />

          <ConceptBlock title="Key formulae">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Star:</strong> VL = √3 x VP | IL = IP
              </li>
              <li>
                <strong>Delta:</strong> VL = VP | IL = √3 x IP
              </li>
              <li>
                <strong>3φ Power:</strong> P = √3 x VL x IL x cos φ
              </li>
              <li>
                <strong>VL-N = VL-L / √3</strong> = 400/1.732 = 230 V
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the UK single-phase supply arrangement (230 V line-to-neutral)',
              'Describe three-phase generation and the 120-degree phase displacement',
              'Calculate line and phase values for star and delta connections',
              'Calculate three-phase power using P = √3 x VL x IL x cos φ',
              'Explain the effects of balanced and unbalanced loads on neutral current',
              'Identify applications for single-phase and three-phase supplies in industry',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Single-phase supply arrangements</ContentEyebrow>

          <ConceptBlock title="The most common supply in the UK">
            <p>
              The single-phase supply is the most common electrical supply in the UK. Every domestic
              property, most small commercial premises and many individual circuits within larger
              installations use single-phase power. The UK single-phase supply is 230 V AC at 50 Hz,
              delivered as one line (phase) conductor and one neutral conductor, with a separate or
              combined earth conductor depending on the earthing arrangement.
            </p>
            <p>
              The single-phase supply is derived from the three-phase distribution network. At the
              local distribution transformer, the secondary winding is star-connected, producing
              three phase voltages of 230 V (line-to-neutral) and three line voltages of 400 V
              (line-to-line). Each domestic property is connected between one line conductor and the
              neutral, receiving 230 V. The DNO (Distribution Network Operator) connects adjacent
              properties to different phases to balance the load across the three-phase system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Single-phase supply characteristics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Nominal voltage:</strong> 230 V +10%/-6% (216.2 V to 253 V) per ESQCR 2002.
              </li>
              <li>
                <strong>Frequency:</strong> 50 Hz ± 1% (49.5-50.5 Hz normal operating range).
              </li>
              <li>
                <strong>Conductors:</strong> Line (L), neutral (N), earth (E or PE).
              </li>
              <li>
                <strong>Colour coding:</strong> Line = brown, neutral = blue, earth = green/yellow
                (BS 7671 harmonised colours).
              </li>
              <li>
                <strong>Maximum demand:</strong> Typically 60-100 A for domestic (14-23 kW), limited
                by the DNO service fuse.
              </li>
              <li>
                <strong>Waveform:</strong> Sinusoidal — instantaneous power pulsates at 100 Hz
                (twice supply frequency).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Limitations of single-phase">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pulsating power:</strong> Single-phase power drops to zero twice per cycle
                (at the zero crossings). This causes vibration in single-phase motors and requires
                smoothing for sensitive DC loads.
              </li>
              <li>
                <strong>No rotating field:</strong> Single-phase cannot produce a rotating magnetic
                field — single-phase motors require additional starting mechanisms (capacitor start,
                shaded pole, etc.).
              </li>
              <li>
                <strong>Limited power capacity:</strong> At 230 V and 100 A, maximum power is
                approximately 23 kW. Larger loads require three-phase supplies.
              </li>
              <li>
                <strong>Conductor utilisation:</strong> Less efficient use of conductor material
                than three-phase for the same power transfer.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The neutral conductor carries the return current in a
              single-phase circuit. It is at or near earth potential under normal conditions but
              must be treated as a live conductor because it can become live at full line voltage if
              the neutral is broken upstream. Under BS 7671, the neutral must not be switched or
              fused independently of the line conductor in TN systems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Three-phase supply and generation</ContentEyebrow>

          <ConceptBlock title="Three windings, 120 degrees apart">
            <p>
              Three-phase power is generated by an alternator with three separate windings displaced
              by 120 electrical degrees around the stator. As the rotor turns, it induces three
              sinusoidal EMFs of equal magnitude but displaced in time by one-third of a cycle (120
              degrees). This three-phase arrangement is the standard for power generation,
              transmission and distribution worldwide.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Advantages of three-phase systems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant instantaneous power:</strong> The sum of the three instantaneous
                powers is constant at all times — no pulsation, no vibration, smooth motor
                operation.
              </li>
              <li>
                <strong>Rotating magnetic field:</strong> Three phases naturally produce a rotating
                magnetic field in three-phase motors — simple, robust, self-starting (no capacitors
                or centrifugal switches needed).
              </li>
              <li>
                <strong>Efficient power transmission:</strong> Three-phase transmits 73% more power
                than single-phase using only 50% more conductors (3 vs 2) and 75% of the copper
                weight.
              </li>
              <li>
                <strong>Dual voltage levels:</strong> Star connection provides both line (400 V) and
                phase (230 V) voltages from the same system.
              </li>
              <li>
                <strong>Reduced conductor sizing:</strong> For the same total power, three-phase
                line currents are lower than single-phase, requiring smaller conductors.
              </li>
              <li>
                <strong>Balanced neutral:</strong> Under balanced conditions, neutral current is
                zero — reducing losses and allowing a smaller neutral conductor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="UK three-phase voltage levels">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical Application
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Low voltage (LV)</td>
                    <td className="border border-white/10 px-3 py-2">400 V (line-to-line)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Final distribution to consumers, motors up to ~150 kW
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">High voltage (HV)</td>
                    <td className="border border-white/10 px-3 py-2">11 kV</td>
                    <td className="border border-white/10 px-3 py-2">
                      Primary distribution, large industrial sites
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">High voltage</td>
                    <td className="border border-white/10 px-3 py-2">33 kV</td>
                    <td className="border border-white/10 px-3 py-2">
                      Grid supply points, major substations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Extra-high voltage</td>
                    <td className="border border-white/10 px-3 py-2">132 kV</td>
                    <td className="border border-white/10 px-3 py-2">Sub-transmission</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Transmission</td>
                    <td className="border border-white/10 px-3 py-2">275 kV / 400 kV</td>
                    <td className="border border-white/10 px-3 py-2">
                      National Grid transmission (supergrid)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> All UK power stations generate three-phase AC (typically
              at 11-25 kV), which is stepped up to 275 kV or 400 kV for efficient transmission over
              the National Grid, then stepped down through a series of substations (132 kV, 33 kV,
              11 kV, 400 V) for local distribution.
            </p>
          </ConceptBlock>

          <ThreePhaseWave />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Star and delta connections</ContentEyebrow>

          <ConceptBlock title="Two fundamental winding configurations">
            <p>
              The three phase windings of a generator, transformer or motor can be connected in two
              fundamental configurations: star (Y) and delta (Δ). Each configuration has different
              voltage and current relationships between the line and phase quantities, and each has
              specific applications. Understanding these connections is critical for maintenance
              work on three-phase equipment.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded bg-white/5 p-4">
                <h4 className="mb-2 text-sm font-medium text-elec-yellow/80">
                  Star (Y) connection
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>One end of each winding connected to common star point.</li>
                  <li>Other ends connect to line conductors.</li>
                  <li>Neutral available from star point.</li>
                  <li>
                    <strong>VL = √3 x VP</strong> (400 = √3 x 230).
                  </li>
                  <li>
                    <strong>IL = IP</strong> (line current equals phase current).
                  </li>
                  <li>Used for: distribution transformers, motor starting, generators.</li>
                </ul>
              </div>
              <div className="rounded bg-white/5 p-4">
                <h4 className="mb-2 text-sm font-medium text-elec-yellow/80">
                  Delta (Δ) connection
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Windings connected end-to-end forming a closed loop.</li>
                  <li>Line conductors connected at the junctions.</li>
                  <li>No neutral point available.</li>
                  <li>
                    <strong>VL = VP</strong> (line voltage equals phase voltage).
                  </li>
                  <li>
                    <strong>IL = √3 x IP</strong> (400 V: line current is √3 x phase current).
                  </li>
                  <li>Used for: motor running, power distribution, transformers.</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Star-delta (Y-Δ) starting">
            <p>
              Star-delta starting is a widely used method for reducing the starting current of
              three-phase induction motors. The sequence is:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Star:</strong> Motor connected in star. Each winding receives VP =
                VL/√3 = 230 V. Starting current reduced to 1/3 of direct-on-line delta current.
                Starting torque also reduced to 1/3.
              </li>
              <li>
                <strong>Step 2 — Transition:</strong> After the motor has accelerated to near full
                speed (typically 3-10 seconds), the contactor switches from star to delta. A brief
                open transition occurs.
              </li>
              <li>
                <strong>Step 3 — Delta:</strong> Motor connected in delta. Each winding receives VP
                = VL = 400 V. Motor operates at full voltage, full speed, full torque.
              </li>
              <li>
                <strong>Limitation:</strong> The motor must be designed for delta running at the
                supply voltage (Δ400V). The reduced starting torque may be insufficient for
                high-inertia loads.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Motor terminal connections">
            <p>
              Three-phase motor terminal boxes contain six terminals labelled U1, V1, W1 (start of
              windings) and U2, V2, W2 (end of windings). The link configuration determines the
              connection:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Star:</strong> U2, V2, W2 linked together (star point). Supply connected to
                U1, V1, W1.
              </li>
              <li>
                <strong>Delta:</strong> U1-W2, V1-U2, W1-V2 linked. Supply connected at the
                junctions.
              </li>
              <li>
                <strong>Always verify:</strong> Check the motor nameplate rating matches the supply
                voltage and the correct link configuration before energising.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When working on motor terminal boxes, always
              photograph the existing link configuration before removing any links. Incorrect
              reconnection can result in the motor running at reduced power (star instead of delta),
              overheating, or in the worst case, destruction of the windings due to excessive
              voltage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Three-phase power and load balancing</ContentEyebrow>

          <ConceptBlock title="Line values, and the power factor you must not forget">
            <p>
              Calculating three-phase power is a fundamental skill for maintenance technicians. The
              standard formula uses line values (which are the values you measure at the terminals)
              and includes the power factor to account for the phase angle between voltage and
              current. Load balancing — ensuring approximately equal loading on all three phases —
              is essential for efficient and safe operation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three-phase power formulae (balanced loads)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real power (kW):</strong> P = √3 x VL x IL x cos φ.
              </li>
              <li>
                <strong>Reactive power (kVAr):</strong> Q = √3 x VL x IL x sin φ.
              </li>
              <li>
                <strong>Apparent power (kVA):</strong> S = √3 x VL x IL.
              </li>
              <li>
                <strong>Power triangle:</strong> S² = P² + Q² (Pythagoras).
              </li>
              <li>
                <strong>Power factor:</strong> cos φ = P / S = kW / kVA.
              </li>
            </ul>
            <div className="rounded bg-white/5 p-3">
              <p className="text-xs text-white">
                <strong>Example:</strong> 400 V, 3-phase motor drawing 25 A at PF 0.85.
              </p>
              <p className="text-xs text-white">P = √3 x 400 x 25 x 0.85 = 14.72 kW</p>
              <p className="text-xs text-white">S = √3 x 400 x 25 = 17.32 kVA</p>
              <p className="text-xs text-white">Q = √(17.32² - 14.72²) = 9.13 kVAr</p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Balanced vs unbalanced loads">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Balanced</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Unbalanced</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Line currents</td>
                    <td className="border border-white/10 px-3 py-2">Equal on all three phases</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unequal — different loads on each phase
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Neutral current</td>
                    <td className="border border-white/10 px-3 py-2">Zero</td>
                    <td className="border border-white/10 px-3 py-2">
                      Non-zero — can be significant
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Phase voltages</td>
                    <td className="border border-white/10 px-3 py-2">Equal (230 V each)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Unequal — voltage imbalance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">System losses</td>
                    <td className="border border-white/10 px-3 py-2">Minimised</td>
                    <td className="border border-white/10 px-3 py-2">Increased I²R losses</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Motor operation</td>
                    <td className="border border-white/10 px-3 py-2">Smooth, efficient</td>
                    <td className="border border-white/10 px-3 py-2">
                      Overheating, reduced efficiency, vibration
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Neutral overloading — a hidden danger"
            whatHappens={
              <>
                <p>
                  In modern installations with large numbers of non-linear single-phase loads
                  (computers, LED drivers, switch-mode power supplies), the neutral conductor can
                  carry more current than the line conductors. This occurs because third harmonic
                  currents from non-linear loads are in phase with each other on all three phases
                  and add arithmetically in the neutral, instead of cancelling as the fundamental 50
                  Hz currents do. As a result, the neutral current can reach up to 1.73 times the
                  line current in extreme cases.
                </p>
                <p className="mt-2">
                  The risk is overheated neutral conductors, insulation damage and fire —
                  particularly in older installations where the neutral was sized at 50% of line
                  conductors.
                </p>
              </>
            }
            doInstead={
              <>
                Size the neutral at 100% of line conductors (or larger) in installations with
                significant non-linear loads. BS 7671 requires this consideration in the design
                process.
              </>
            }
          />

          <ConceptBlock title="ST1426 link">
            <p>
              The maintenance technician must be able to identify single-phase and three-phase
              supplies, understand star and delta connections, calculate three-phase power and
              recognise the importance of load balancing. Phase rotation verification before motor
              connection is a critical maintenance procedure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=qthuFLNSrlg"

            title="Three Phase Electricity — Basics and Calculations"

            channel="The Engineering Mindset"

            duration="14:36"

            topic="Three-phase generation, star and delta, and the √3 relationship"

            caption="Works through the calculations as well as the theory — the √3 between line and phase is the bit people get wrong on site."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The neutral conductor carries the return current in a single-phase circuit and can become live at full line voltage if the neutral is broken upstream — it must never be switched or fused independently of the line conductor in TN systems.',
              'All UK power stations generate three-phase AC, stepped up for transmission and back down through 132 kV, 33 kV, 11 kV and 400 V for local distribution.',
              'When working on motor terminal boxes, always photograph the existing link configuration before removing any links — incorrect reconnection can destroy the windings.',
              'Size the neutral at 100% of line conductor CSA (or larger) in installations with significant non-linear loads — triplen harmonics can push neutral current above the line current.',
              'Always verify phase rotation with a phase rotation meter before connecting three-phase motors — reversed rotation can be dangerous for pumps, fans and conveyors.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Single-Phase vs Three-Phase"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Alternating Current Principles
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Frequency and Waveforms
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section2_3;
