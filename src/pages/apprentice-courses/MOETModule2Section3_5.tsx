/**
 * MOET · Module 2 · Section 2.3 · Subsection 5 — Motor Starting Methods
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
 *
 * Note: motor starting-current and starting-torque multiples vary between
 * sources. The numbers below are exactly as the original page stated them —
 * they have not been altered.
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
import useSEO from '@/hooks/useSEO';

const TITLE = 'Motor Starting Methods - MOET Module 2.3.5';
const DESCRIPTION =
  'Comprehensive guide to motor starting methods for maintenance technicians: direct-on-line (DOL), star-delta, auto-transformer, soft starter, variable speed drive (VSD), rotor resistance starting, current limiting, torque characteristics, protection coordination and BS 7671 compliance for ST1426.';

const quickCheckQuestions = [
  {
    id: 'dol-starting-current',
    question:
      'A 15 kW three-phase induction motor has a full-load current of 28 A. When started direct-on-line (DOL), the typical starting current is approximately:',
    options: ['28 A', '56 A', '500 A', '168–224 A'],
    correctIndex: 3,
    explanation:
      'DOL starting draws 6 to 8 times the full-load current. For a 28 A motor: 28 × 6 = 168 A to 28 × 8 = 224 A. This high inrush current lasts for several seconds until the motor reaches speed. While the motor can withstand this, the supply system, cables and protective devices must be rated to handle it. On weak supplies, the voltage dip caused by this inrush can affect other equipment — which is why reduced-voltage starting methods are often required.',
  },
  {
    id: 'star-delta-voltage',
    question:
      'During star-delta starting, the voltage applied to each motor winding during the star connection phase is:',
    options: [
      'The full line voltage (approximately 400 V)',
      'Line voltage divided by √3 (approximately 230 V)',
      'Line voltage multiplied by √3 (approximately 690 V)',
      'Half the line voltage (approximately 200 V)',
    ],
    correctIndex: 1,
    explanation:
      'In star connection, each winding receives the phase voltage, which is the line voltage divided by √3. For a 400 V supply: 400 / 1.732 = 231 V per winding. Since starting current is proportional to applied voltage, and starting torque is proportional to the square of the voltage, star-delta starting reduces the starting current to one-third and the starting torque to one-third of the DOL values. The motor is then switched to delta for full-voltage running.',
  },
  {
    id: 'soft-starter-principle',
    question: 'A soft starter reduces motor starting current by:',
    options: [
      'Connecting the windings in star during starting, then switching to delta',
      'Inserting external resistance into the rotor circuit via slip rings',
      'Controlling the voltage applied to the motor using thyristors (phase-angle control)',
      'Reducing the supply frequency to limit the inrush current',
    ],
    correctIndex: 2,
    explanation:
      'A soft starter uses back-to-back thyristors (silicon controlled rectifiers) to control the voltage applied to the motor by varying the firing angle during each half-cycle. During starting, the voltage is ramped up gradually from a set initial level to the full supply voltage over a programmable time period. This provides a smooth, controlled current ramp without the current transients associated with star-delta changeover.',
  },
  {
    id: 'vsd-starting-advantage',
    question:
      'The primary advantage of using a variable speed drive (VSD) for motor starting, compared with a star-delta starter, is:',
    options: [
      'It requires no overload protection because the drive limits the current electronically',
      'Controlled starting current with full torque available from zero speed, and continuous speed control during running',
      'It eliminates the need for a six-terminal motor and a changeover timer',
      'It produces a lower starting current but only one-third of the starting torque',
    ],
    correctIndex: 1,
    explanation:
      "A VSD controls both voltage and frequency, so the motor can develop full rated torque from zero speed with a starting current limited to the motor's full-load current or less. Star-delta starting reduces both current and torque to one-third of DOL values, which may be insufficient for high-inertia loads. Additionally, a VSD provides continuous speed control during running, energy savings on variable-torque loads, and controlled deceleration — none of which star-delta offers.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Direct-on-line (DOL) starting is suitable for motors up to approximately:',
    options: [
      '0.5 kW (depending on supply capacity)',
      '7.5 kW (depending on supply capacity)',
      '75 kW (depending on supply capacity)',
      '500 kW (depending on supply capacity)',
    ],
    correctAnswer: 1,
    explanation:
      'While there is no absolute limit, DOL starting is typically used for motors up to about 7.5 kW on standard commercial/industrial supplies. Larger motors may cause unacceptable voltage dips on the supply, affecting other connected equipment. The distribution network operator (DNO) may impose limits on starting current — typically no more than 60-100 A starting current without prior agreement. The exact limit depends on the supply capacity and the prospective fault level at the point of connection.',
  },
  {
    id: 2,
    question: 'A star-delta starter requires the motor to have:',
    options: [
      'Only three terminals (U, V, W) brought out to the terminal box',
      'A wound rotor with slip rings to add external resistance',
      'All six winding ends brought out to the terminal box (U1, V1, W1, U2, V2, W2)',
      'Windings internally connected in delta at the factory',
    ],
    correctAnswer: 2,
    explanation:
      'Star-delta starting requires access to both ends of each of the three stator windings — six terminals in total, designated U1, V1, W1 (start) and U2, V2, W2 (finish). The contactor arrangement connects the windings in star for starting and then switches to delta for running. A motor with only three terminals (internally connected in star or delta) cannot be used with a star-delta starter.',
  },
  {
    id: 3,
    question: 'During star-delta starting, the starting torque is approximately:',
    options: [
      'One-half of DOL starting torque',
      'Equal to DOL starting torque',
      'Twice the DOL starting torque',
      'One-third of DOL starting torque',
    ],
    correctAnswer: 3,
    explanation:
      'Torque is proportional to the square of the applied voltage. In star, each winding receives V_line/√3 voltage. Since torque ∝ V², the star torque = (1/√3)² = 1/3 of the DOL torque. Similarly, the starting current is reduced to one-third. This reduction in starting torque means star-delta is unsuitable for loads that require high starting torque (e.g., loaded conveyors, positive displacement pumps) — the motor may not accelerate to the changeover speed.',
  },
  {
    id: 4,
    question: 'The main disadvantage of star-delta starting is:',
    options: [
      'A current transient (spike) occurs at the star-to-delta changeover point',
      'It draws a higher starting current than direct-on-line starting',
      'It cannot be used on three-phase induction motors',
      'It provides no overload protection for the motor windings',
    ],
    correctAnswer: 0,
    explanation:
      'When the star-delta starter switches from star to delta, the motor is momentarily disconnected from the supply. When delta is reconnected, the motor draws a transient current that can be as high as the DOL starting current. This current spike can trip protective devices, cause voltage dips, and impose mechanical stress on the drive train. Closed-transition star-delta starters use resistors to maintain a current path during changeover, reducing but not eliminating this transient.',
  },
  {
    id: 5,
    question: 'An auto-transformer starter reduces starting current by:',
    options: [
      'Connecting the windings in star, then switching to delta for running',
      'Applying a reduced voltage from a tapped auto-transformer during starting',
      'Inserting external resistance into the rotor circuit during acceleration',
      'Reducing the supply frequency applied to the motor during starting',
    ],
    correctAnswer: 1,
    explanation:
      'An auto-transformer starter uses a tapped auto-transformer to supply the motor at a reduced voltage during starting — typically 50%, 65% or 80% of the supply voltage. The starting current drawn from the supply is reduced by the square of the voltage ratio (e.g., at 65% tap: supply current = 0.65² × DOL current = 42% of DOL). Once the motor reaches speed, the auto-transformer is bypassed and full voltage is applied.',
  },
  {
    id: 6,
    question: 'A soft starter provides which advantage over a star-delta starter?',
    options: [
      'Continuous variable speed control of the motor during running',
      'Full rated starting torque from a reduced starting current',
      'Smooth, stepless voltage ramp with no changeover transient',
      'Lower running losses because no bypass contactor is needed',
    ],
    correctAnswer: 2,
    explanation:
      'The key advantage of a soft starter is smooth, stepless voltage ramping from a set initial level to full voltage over a programmable time period. There is no abrupt changeover as with star-delta, so there is no current transient spike. The starting current and torque profiles can be adjusted to suit the application. However, a soft starter does not provide speed control during running — once at full speed, the thyristors are bypassed and the motor runs at mains frequency.',
  },
  {
    id: 7,
    question:
      'When a variable speed drive (VSD) starts a motor, the starting current is typically limited to:',
    options: [
      '6-8 times full-load current (same as DOL)',
      '3 times full-load current',
      '50% of full-load current',
      '100-150% of full-load current',
    ],
    correctAnswer: 3,
    explanation:
      "A VSD starts the motor by applying a low-frequency, low-voltage supply and gradually increasing both to ramp the motor up to speed. The starting current is typically limited to 100-150% of the motor's full-load current by the drive's current-limiting function. This is dramatically lower than DOL (600-800%) or star-delta (200-300%) starting currents, and the motor develops full rated torque throughout the starting period because the V/f ratio is maintained.",
  },
  {
    id: 8,
    question: 'Rotor resistance starting is used with:',
    options: [
      'Wound-rotor (slip-ring) induction motors',
      'Squirrel-cage induction motors with six terminals',
      'Single-phase capacitor-start motors',
      'Synchronous motors with a brushless exciter',
    ],
    correctAnswer: 0,
    explanation:
      'Rotor resistance starting is used with wound-rotor (slip-ring) induction motors. External resistance is connected to the rotor windings via slip rings. The added resistance increases the rotor circuit impedance, reducing the starting current while simultaneously increasing the starting torque (up to the maximum value). As the motor accelerates, the resistance is progressively short-circuited in stages. This method provides excellent starting characteristics but is now largely superseded by VSDs.',
  },
  {
    id: 9,
    question:
      'Which motor starting method provides the lowest starting current drawn from the supply?',
    options: [
      'Direct-on-line (DOL)',
      'Variable speed drive (VSD)',
      'Star-delta starter',
      'Auto-transformer starter',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD provides the lowest starting current because it controls both voltage and frequency, maintaining the V/f ratio to keep the motor flux constant while limiting the current to typically 100-150% of FLC. Soft starters typically limit starting current to 200-400% FLC, star-delta to approximately 200% FLC (one-third of DOL), and DOL draws 600-800% FLC. The VSD is the most technically advanced starting method and also provides the most controllable starting torque.',
  },
  {
    id: 10,
    question:
      'When selecting a motor starting method, which of the following is the MOST important consideration?',
    options: [
      'The colour of the motor terminal box and the cable gland size',
      'The number of times the motor will be started each day only',
      'The starting torque required by the load, the supply capacity, and the acceptable voltage dip',
      'The ambient temperature of the control panel during running only',
    ],
    correctAnswer: 2,
    explanation:
      'The three primary considerations for selecting a starting method are: (1) the starting torque required by the mechanical load — if the load needs high torque from standstill (e.g., a loaded conveyor), methods that reduce starting torque (star-delta) may be unsuitable; (2) the available supply capacity and acceptable voltage dip — the DNO limits on starting current may dictate reduced-current methods; and (3) the cost and complexity versus the frequency of starting and the criticality of the application.',
  },
  {
    id: 11,
    question: 'A DOL starter typically consists of:',
    options: [
      'Three contactors (main, star, delta) and a changeover timer',
      'A tapped auto-transformer and a bypass contactor',
      'Back-to-back thyristors in each phase and a heat sink',
      'A contactor, an overload relay, and a control circuit (start/stop)',
    ],
    correctAnswer: 3,
    explanation:
      'A DOL starter is the simplest motor starting arrangement: a main contactor (to switch the supply to the motor), an overload relay (thermal or electronic, to protect the motor from sustained overcurrent), and a control circuit with start and stop push-buttons plus a holding contact. The simplicity of DOL starters makes them reliable and inexpensive, which is why they are used wherever the supply can tolerate the high starting current.',
  },
  {
    id: 12,
    question: 'BS 7671 requires that motor circuits are protected by:',
    options: [
      'An overload protective device (for sustained overcurrent) and a short-circuit protective device (for fault current)',
      'A single MCB sized to the motor full-load current for both overload and fault protection',
      'A 30 mA RCD as the only protective device required for the motor circuit',
      'An isolating transformer to separate the motor from the supply',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Section 552 requires motor circuits to have two types of protection: overcurrent protection (to protect the motor and cables from sustained overloads — typically an overload relay set to the motor FLC) and short-circuit protection (to protect against fault currents — typically fuses or an MCCB rated to handle the high starting current without tripping). The overload device must allow the starting current to flow for the duration of the start without tripping, while still protecting against genuine overloads during running.',
  },
];

const faqs = [
  {
    question: 'How do I know which starting method is used on a motor I am maintaining?',
    answer:
      'Check the motor control panel documentation and single-line diagram. A DOL starter has a single contactor and an overload relay. A star-delta starter has three contactors (main, star, delta) and a changeover timer. A soft starter has a thyristor unit (typically with a heat sink and a bypass contactor). A VSD has an electronic drive unit with a control panel, DC bus capacitors and power semiconductor modules. The motor terminal box also gives clues — six terminals indicate star-delta capability, while three terminals suggest DOL or soft-start/VSD. The nameplate on the starter should identify the type and the settings.',
  },
  {
    question: 'Can I change the starting method on an existing motor installation?',
    answer:
      'Yes, but it requires careful engineering assessment. Changing from DOL to star-delta requires a motor with six terminals and a cable with six cores (or two three-core cables) to the motor. Changing to a soft starter or VSD requires verifying that the cable type is suitable (shielded cable is recommended for VSD installations to reduce electromagnetic interference), that the motor insulation can withstand the voltage waveform from a VSD (dV/dt stress on older motors), and that the protective devices and cable sizing remain adequate. Any change must be designed and verified in accordance with BS 7671.',
  },
  {
    question:
      'Why does a motor sometimes fail to start with a star-delta starter but works with DOL?',
    answer:
      'Star-delta starting reduces the starting torque to one-third of the DOL value. If the load requires more torque to break away from standstill than the star-connected motor can provide, the motor will stall in star and may not reach sufficient speed before the timer switches to delta. Common causes include: belt-driven loads with high static friction, loaded conveyor belts, positive displacement pumps against back-pressure, and cold oil in hydraulic systems. The solution may be to use a soft starter or VSD that maintains better torque during starting, or to ensure the load is unloaded before starting.',
  },
  {
    question: 'What maintenance does a soft starter require?',
    answer:
      'Soft starters have fewer moving parts than star-delta starters (no changeover contactors) but do require maintenance: clean the heat sinks and check cooling fans (thyristors generate heat from conduction losses), check the bypass contactor contacts (if fitted — most soft starters bypass the thyristors once at full speed to reduce running losses), verify the current-limiting and ramp-time settings are still appropriate for the application, check for alarm/fault logs in the soft starter control panel, and perform periodic insulation resistance tests on the motor and cables. Replace the cooling fans every 3-5 years as a preventive measure.',
  },
  {
    question: "What is a 'current spike' at star-delta changeover and how can it be prevented?",
    answer:
      'When a star-delta starter switches from star to delta, the motor is briefly disconnected from the supply (open-transition changeover). During this brief disconnection, the motor decelerates slightly and the rotor flux decays. When delta is reconnected, the motor is momentarily out of synchronisation with the supply, drawing a high transient current that can be comparable to DOL starting current. A closed-transition star-delta starter uses resistors to maintain a current path during the changeover, preventing the motor from becoming fully disconnected and significantly reducing the transient. Alternatively, modern installations use soft starters or VSDs which eliminate the changeover transient entirely.',
  },
  {
    question: 'How does a VSD provide full torque at low speed during starting?',
    answer:
      "A VSD maintains a constant voltage-to-frequency (V/f) ratio during starting. At low speed, both voltage and frequency are low — for example, at 10 Hz the voltage might be 80 V. This maintains the motor's magnetic flux at the design value, which in turn maintains the motor's ability to produce full rated torque. The current is limited to approximately 150% of full-load current by the drive's current controller. This is fundamentally different from reduced-voltage starting methods (star-delta, soft starter) which reduce voltage at mains frequency, causing the motor's magnetic flux to decrease and the torque to fall. VSDs with sensorless vector control or closed-loop vector control can provide even better torque control at low speeds.",
  },
];

const MOETModule2Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.3 · Subsection 5"
        title="Motor Starting Methods"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Starting techniques, current limiting, torque characteristics and protection
            coordination.
          </p>

          <TLDR
            points={[
              'DOL: full voltage, 6-8x FLC starting current, simplest method.',
              'Star-delta: 1/3 current and torque, needs 6-terminal motor.',
              'Soft starter: thyristor voltage ramp, smooth start, no speed control.',
              'VSD: V/f control, full torque from zero speed, lowest starting current.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Selection:</strong> based on load torque, supply capacity and voltage dip
                limits.
              </li>
              <li>
                <strong>Protection:</strong> overload + short-circuit per BS 7671 Section 552.
              </li>
              <li>
                <strong>Fault-finding:</strong> timer settings, contactor sequencing, drive
                parameters.
              </li>
              <li>
                <strong>ST1426:</strong> understand and maintain motor starting equipment.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principle and operation of DOL, star-delta, soft start and VSD starting methods',
              'Compare starting current and starting torque characteristics of each method',
              'Select an appropriate starting method based on load requirements and supply constraints',
              'Describe the components and operation of each type of motor starter',
              'Identify common faults and maintenance requirements for motor starting equipment',
              'Apply BS 7671 Section 552 requirements for motor circuit protection',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why motor starting matters</ContentEyebrow>

          <ConceptBlock title="A short-circuited transformer, for a few seconds">
            <p>
              When an induction motor is started, the rotor is stationary and the slip is 100%. At
              this moment, the motor behaves almost like a short-circuited transformer — the
              impedance of the rotor circuit is very low, and the motor draws a very high current
              from the supply. This starting current (also called locked-rotor current or inrush
              current) is typically 6 to 8 times the motor's full-load current (FLC) and persists
              until the motor accelerates close to its synchronous speed.
            </p>
            <p>
              This high starting current creates several problems. It causes a voltage dip on the
              supply system that can affect other connected equipment — lights may dim, sensitive
              electronics may malfunction, and other motors may stall. The supply cables, switchgear
              and protective devices must be rated to carry the starting current without tripping or
              overheating. The mechanical shock of the high starting torque can damage couplings,
              gearboxes and driven equipment. For these reasons, various starting methods have been
              developed to reduce the starting current and/or control the starting torque.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Key relationships and method comparison"
            onSite="The choice of starting method is always a compromise between starting current (what the supply can tolerate), starting torque (what the load requires), cost, complexity, and the need for speed control during running. There is no single best method — each has its place."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Starting current proportional to applied voltage:</strong> reducing the
                voltage proportionally reduces the current
              </li>
              <li>
                <strong>Starting torque proportional to (applied voltage) squared:</strong> reducing
                voltage to 58% (1/√3, as in star) reduces torque to 33% (1/3)
              </li>
              <li>
                <strong>Supply current reduction:</strong> for auto-transformer starting, the supply
                current is reduced by the square of the tap ratio
              </li>
              <li>
                <strong>VSD starting:</strong> maintains V/f ratio, so full torque is available even
                at reduced frequency/speed
              </li>
            </ul>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Starting Current (x FLC)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Starting Torque (% DOL)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Typical Motor Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">DOL</td>
                    <td className="border border-white/10 px-3 py-2">6-8x</td>
                    <td className="border border-white/10 px-3 py-2">100%</td>
                    <td className="border border-white/10 px-3 py-2">Up to 7.5 kW</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Star-delta</td>
                    <td className="border border-white/10 px-3 py-2">2-2.7x</td>
                    <td className="border border-white/10 px-3 py-2">33%</td>
                    <td className="border border-white/10 px-3 py-2">7.5-75 kW</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Auto-transformer (65%)</td>
                    <td className="border border-white/10 px-3 py-2">2.5-3.5x</td>
                    <td className="border border-white/10 px-3 py-2">42%</td>
                    <td className="border border-white/10 px-3 py-2">15-200 kW</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Soft starter</td>
                    <td className="border border-white/10 px-3 py-2">2-4x</td>
                    <td className="border border-white/10 px-3 py-2">Variable (adjustable)</td>
                    <td className="border border-white/10 px-3 py-2">5-500+ kW</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">VSD</td>
                    <td className="border border-white/10 px-3 py-2">1-1.5x</td>
                    <td className="border border-white/10 px-3 py-2">
                      100% (full torque available)
                    </td>
                    <td className="border border-white/10 px-3 py-2">0.37-1000+ kW</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Rotor resistance</td>
                    <td className="border border-white/10 px-3 py-2">2-3x</td>
                    <td className="border border-white/10 px-3 py-2">Up to 200%</td>
                    <td className="border border-white/10 px-3 py-2">Wound-rotor motors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>DOL and star-delta starting</ContentEyebrow>

          <ConceptBlock title="The two most common electromechanical starting methods">
            <p>
              Direct-on-line (DOL) and star-delta are the two most common electromechanical starting
              methods found in industrial and commercial installations. DOL is the simplest and most
              cost-effective; star-delta is the traditional method for reducing starting current on
              larger motors. Both use contactors and are well-understood by maintenance technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Direct-on-line (DOL) starting">
            <p>
              DOL is the simplest starting method. The motor is connected directly to the full
              supply voltage by closing a single contactor. The starting current is high (6-8x FLC)
              but the starting torque is also high (100% of the motor's locked-rotor torque), making
              it suitable for loads that require high breakaway torque.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Components:</strong> main contactor (K1), thermal/electronic overload relay
                (F1), control circuit with start/stop buttons and holding contact
              </li>
              <li>
                <strong>Advantages:</strong> simple, cheap, reliable, high starting torque, easy to
                maintain
              </li>
              <li>
                <strong>Disadvantages:</strong> very high starting current, voltage dip on supply,
                mechanical shock to driven equipment
              </li>
              <li>
                <strong>Maintenance:</strong> check contactor contacts for pitting/erosion, verify
                overload relay setting matches motor FLC, test control circuit operation, check
                tightness of all terminations
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Star-delta starting">
            <p>
              Star-delta starting uses three contactors and a timer. During starting, the windings
              are connected in star (each winding receives line voltage / √3). After a timed period
              (typically 5-15 seconds), the star contactor opens and the delta contactor closes,
              connecting the windings in delta for normal full-voltage running.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Components:</strong> main contactor (K1), star contactor (K2), delta
                contactor (K3), changeover timer, overload relay
              </li>
              <li>
                <strong>Interlocking:</strong> K2 (star) and K3 (delta) must be electrically and
                mechanically interlocked to prevent both closing simultaneously (dead short circuit
                across windings)
              </li>
              <li>
                <strong>Timer setting:</strong> must allow the motor to accelerate close to full
                speed in star before changeover. Too short = motor stalls at changeover; too long =
                motor runs in star longer than necessary (reduced torque, higher winding current)
              </li>
              <li>
                <strong>Closed transition:</strong> advanced star-delta starters insert resistors
                during changeover to maintain a current path, reducing the current transient at the
                star-to-delta switch point
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Star-delta contactor interlock failure"
            whatHappens={
              <>
                If the electrical interlock between the star and delta contactors fails and both
                close simultaneously, the motor windings are short-circuited. This draws an
                extremely high fault current and will blow the fuses or trip the circuit breaker
                immediately.
              </>
            }
            doInstead={
              <>
                During maintenance, always verify both the electrical interlock (auxiliary NC
                contacts wired in series with the opposing contactor coil) and the mechanical
                interlock (physical bar preventing both contactors from pulling in). Replace
                interlocked contactor pairs as a set to ensure the mechanical interlock is correctly
                aligned.
              </>
            }
          />

          <ConceptBlock
            title="Fault-finding a slow star-delta start"
            onSite="When a star-delta starter is reported as tripping during starting, check the changeover timer setting first. If the motor has not reached sufficient speed in star before the timer switches to delta, the high transient current at changeover can trip the overload or supply fuse. Increasing the star time by 2-3 seconds may resolve the issue — but investigate why the motor is accelerating slowly (bearing failure, increased load, low voltage)."
          >
            <p>
              Interlock discipline and correct timer settings are the two checks that catch the
              majority of star-delta faults before they become a repeated nuisance trip.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Soft starters and electronic starting</ContentEyebrow>

          <ConceptBlock title="From electromechanical to electronic starting">
            <p>
              Soft starters represent the transition from electromechanical to electronic motor
              starting. They use power semiconductors (thyristors) to control the voltage applied to
              the motor, providing a smooth, stepless ramp from zero to full voltage. This
              eliminates the mechanical contactors used in star-delta starting and removes the
              problematic changeover transient.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How a soft starter works">
            <p>
              A soft starter has two back-to-back thyristors (or a triac) in each phase, forming a
              three-phase AC voltage controller. By varying the firing angle of the thyristors, the
              effective voltage applied to the motor is controlled.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Initial voltage:</strong> set between 30-70% of line voltage depending on
                the load torque requirement
              </li>
              <li>
                <strong>Ramp time:</strong> programmable from 1 to 60+ seconds — the time for the
                voltage to increase from initial to full
              </li>
              <li>
                <strong>Current limit:</strong> many soft starters can limit the starting current to
                a set maximum (e.g., 350% FLC)
              </li>
              <li>
                <strong>Soft stop:</strong> the voltage can also be ramped down for a controlled
                deceleration — useful for pumps (prevents water hammer)
              </li>
              <li>
                <strong>Bypass contactor:</strong> once the motor is at full speed, a bypass
                contactor closes to conduct the running current, and the thyristors are turned off.
                This reduces losses and heat generation during running
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Soft starter vs star-delta — key differences">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Star-Delta</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Soft Starter</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Starting current profile</td>
                    <td className="border border-white/10 px-3 py-2">Step change at changeover</td>
                    <td className="border border-white/10 px-3 py-2">Smooth ramp, no transient</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Motor requirement</td>
                    <td className="border border-white/10 px-3 py-2">6-terminal motor required</td>
                    <td className="border border-white/10 px-3 py-2">Any 3-phase motor</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cables to motor</td>
                    <td className="border border-white/10 px-3 py-2">6 cores required</td>
                    <td className="border border-white/10 px-3 py-2">3 cores sufficient</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Starting torque control</td>
                    <td className="border border-white/10 px-3 py-2">Fixed at 1/3 DOL in star</td>
                    <td className="border border-white/10 px-3 py-2">
                      Adjustable via initial voltage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Soft stop capability</td>
                    <td className="border border-white/10 px-3 py-2">No</td>
                    <td className="border border-white/10 px-3 py-2">Yes — voltage ramp-down</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Speed control during run</td>
                    <td className="border border-white/10 px-3 py-2">No</td>
                    <td className="border border-white/10 px-3 py-2">No</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Maintenance</td>
                    <td className="border border-white/10 px-3 py-2">
                      Contactors, timer, interlocks
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Bypass contactor, cooling fans, electronics
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Soft starter maintenance"
            onSite="A soft starter does not provide speed control during running. Once the motor reaches full speed, it runs at mains frequency. If variable speed operation is required, a variable speed drive (VSD) must be used instead."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cooling:</strong> clean heat sinks quarterly; replace cooling fans every 3-5
                years or when noisy/vibrating
              </li>
              <li>
                <strong>Bypass contactor:</strong> inspect contacts annually; replace on signs of
                pitting or erosion. The bypass contactor carries the full running current
                continuously
              </li>
              <li>
                <strong>Thyristors:</strong> check for signs of overheating (discolouration of heat
                sink compound). Thyristor failure usually presents as a short circuit or open
                circuit on one phase
              </li>
              <li>
                <strong>Settings verification:</strong> check initial voltage, ramp time and current
                limit settings match the application requirements — settings may need adjustment if
                the load changes
              </li>
              <li>
                <strong>Fault log:</strong> review the soft starter's fault log for recurring trips
                or warnings — patterns may indicate developing faults
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Variable speed drives for motor starting and control</ContentEyebrow>

          <ConceptBlock title="The most technically advanced starting method">
            <p>
              Variable speed drives (VSDs), also called variable frequency drives (VFDs) or inverter
              drives, represent the most technically advanced method of motor starting and control.
              A VSD converts the fixed-frequency, fixed-voltage mains supply into a
              variable-frequency, variable-voltage output, allowing precise control of motor speed,
              torque and acceleration from zero to above rated speed.
            </p>
            <p>
              For motor starting, the VSD provides the ideal characteristics: the motor can develop
              full rated torque from standstill, the starting current is limited to typically
              100-150% of FLC (compared with 600-800% for DOL), and the acceleration rate is fully
              programmable. After starting, the VSD continues to provide speed control during
              running, energy savings on variable-torque loads, and controlled deceleration.
            </p>
          </ConceptBlock>

          <ConceptBlock title="VSD starting principle">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V/f ratio:</strong> the VSD maintains a constant ratio of voltage to
                frequency. At 50% speed (25 Hz), it applies 50% voltage (200 V for a 400 V motor).
                This maintains constant motor flux and therefore constant torque capability
              </li>
              <li>
                <strong>Ramp time:</strong> the acceleration ramp is programmable — typically 5-30
                seconds for a smooth start. The VSD's current-limiting function prevents the motor
                from drawing more than the set current limit during acceleration
              </li>
              <li>
                <strong>S-curve ramp:</strong> advanced VSDs offer S-curve acceleration profiles
                that reduce the initial and final jerk, providing even smoother mechanical starting
              </li>
              <li>
                <strong>Flying start:</strong> if a motor is still spinning when the VSD is
                restarted (e.g., after a brief supply interruption), the VSD can detect the motor
                speed and synchronise its output frequency to match before ramping up — preventing a
                dangerous out-of-phase reconnection
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="VSD installation considerations (BS 7671)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable type:</strong> shielded (SY/CY or SWA) cable is recommended between
                the VSD and motor to contain electromagnetic emissions and prevent interference with
                adjacent circuits
              </li>
              <li>
                <strong>Cable length:</strong> long cable runs between the VSD and motor increase
                the dV/dt stress on the motor insulation and may require output chokes or dV/dt
                filters
              </li>
              <li>
                <strong>Earthing:</strong> the cable screen/armour must be earthed at both ends with
                360 degree terminations for effective EMC screening
              </li>
              <li>
                <strong>Motor insulation:</strong> older motors (pre-2000) may not have insulation
                rated for the voltage spikes from a VSD output. Verify the motor insulation is rated
                for VSD duty, or fit an output filter
              </li>
              <li>
                <strong>RCD compatibility:</strong> VSDs produce DC and high-frequency leakage
                currents that can trip standard Type A RCDs. Type B RCDs are required on circuits
                supplying VSDs
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="VSD advantages and maintenance requirements"
            onSite="A VSD is not just a starting device — it is a comprehensive motor control system. The initial cost is higher than a simple contactor starter, but the benefits in terms of energy savings, reduced mechanical stress, lower maintenance costs and precise process control often provide a payback period of 1-3 years on applications such as fans, pumps and compressors."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-white">VSD advantages for starting</p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Lowest starting current of any method</li>
                  <li>Full torque available from zero speed</li>
                  <li>Fully programmable acceleration profile</li>
                  <li>No mechanical contactors to wear out</li>
                  <li>Continuous speed control during running</li>
                  <li>Energy savings on fans/pumps (up to 50-70%)</li>
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-white">VSD maintenance requirements</p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Clean cooling fans and heat sinks regularly</li>
                  <li>DC bus capacitors degrade over time (replace every 5-7 years)</li>
                  <li>Check for harmonic distortion on the supply side</li>
                  <li>Verify parameter settings after firmware updates</li>
                  <li>Monitor fault logs for recurring alarms</li>
                  <li>Allow full discharge time before internal work</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Motor circuit protection and BS 7671 requirements</ContentEyebrow>

          <ConceptBlock title="Allowing the start, protecting against the fault">
            <p>
              BS 7671 Section 552 sets out the requirements for motor circuits. The fundamental
              challenge is that motor protective devices must allow the high starting current to
              flow for the duration of the start (several seconds) without tripping, while still
              providing protection against sustained overloads during running and rapid
              disconnection in the event of a short circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motor circuit protection requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overload protection:</strong> protects the motor from sustained overcurrent
                (e.g., mechanical overload, seized bearing, loss of phase). The overload device
                (thermal or electronic relay) is set to the motor's full-load current. It has a
                time-delay characteristic that allows the starting current to flow for the expected
                starting time without tripping
              </li>
              <li>
                <strong>Short-circuit protection:</strong> protects against high-level fault
                currents (e.g., insulation failure, terminal fault). Typically provided by fuses (gG
                or aM type) or an MCCB upstream of the contactor. Must operate fast enough to
                protect the contactor and overload relay from damage
              </li>
              <li>
                <strong>Coordination:</strong> the overload device and short-circuit device must be
                coordinated to ensure correct operation under all fault conditions. Type 1
                coordination allows the contactor and overload to be damaged but safe; Type 2
                coordination requires no damage to any component
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Motor-rated fuses">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Fuse Type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">gG</td>
                    <td className="border border-white/10 px-3 py-2">
                      General purpose — full-range breaking
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Cable and general circuit protection; can be used for motors if rated to
                      withstand starting current
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">aM</td>
                    <td className="border border-white/10 px-3 py-2">
                      Motor-rated — back-up protection only
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Specifically designed for motor circuits. Higher starting current withstand.
                      Must be used with a separate overload device
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Overload relay types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal (bimetallic):</strong> the traditional type. Bimetallic strips heat
                up with motor current and trip when they bend beyond a set point. Ambient
                temperature compensated versions are available. Simple and reliable but less
                accurate than electronic types
              </li>
              <li>
                <strong>Electronic (solid-state):</strong> uses current transformers to measure the
                motor current and a microprocessor to calculate the thermal model of the motor. More
                accurate, adjustable trip class (10, 20, 30), phase loss detection, ground fault
                detection and communication capabilities
              </li>
              <li>
                <strong>Thermistor (PTC):</strong> PTC thermistors embedded in the motor windings
                measure the actual winding temperature. Provides direct motor protection regardless
                of the cause of overheating (overload, blocked ventilation, high ambient, frequent
                starting)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Single phasing — a common and dangerous fault"
            whatHappens={
              <>
                If one phase of a three-phase motor supply is lost (single phasing), the motor
                continues to run but draws approximately 1.73 times normal current in the remaining
                two phases. The motor overheats rapidly and can fail within minutes. Modern
                electronic overload relays detect single phasing and trip immediately. Older thermal
                overload relays may not detect single phasing quickly enough, especially on lightly
                loaded motors.
              </>
            }
            doInstead={
              <>
                If you encounter repeated motor winding failures, check for evidence of single
                phasing — burnt windings on two phases with the third relatively undamaged is a
                classic indicator.
              </>
            }
          />

          <ConceptBlock title="ST1426 requirement">
            <p>
              The Maintenance and Operations Engineering Technician standard requires you to
              understand motor starting equipment, set overload relays to the correct motor rating,
              verify contactor operation, interpret starter fault codes, and replace components as
              part of planned and reactive maintenance. You must also understand the protection
              coordination requirements of BS 7671 Section 552.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=h89TTwlNnpY"

            title="Star Delta Starter Explained"

            channel="The Engineering Mindset"

            duration="11:08"

            topic="The contactor and timer sequence that cuts starting current to a third"

            caption="Walks the power and control circuits through the changeover — useful before you meet one in a panel."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DOL — 6-8x FLC, 100% torque, simplest method.',
              'Star-delta — 1/3 current and torque, needs a 6-terminal motor, and a changeover transient.',
              'Auto-transformer — adjustable voltage taps reduce supply current by the square of the tap ratio.',
              'Soft starter — thyristor voltage ramp, smooth start, no speed control during running.',
              'VSD — V/f control, 100-150% FLC, full torque available from zero speed.',
              'Rotor resistance starting — wound-rotor motors only, largely superseded by VSDs.',
              'Key references: BS 7671 Section 552 (motor circuits); BS EN 60947-4-1 (contactor starters); BS EN 60947-4-2 (soft starters); BS EN 61800-5-1 (VSD safety); IET Guidance Note 1 (selection and erection).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">DC Motors</div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Fuses and Circuit Breakers
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section3_5;
