/**
 * MOET · Module 2 · Section 2.2 · Subsection 1 — Direct Current Principles
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
} from '@/components/study-centre/learning';
import { SeriesCircuit, ParallelCircuit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Direct Current Principles - MOET Module 2.2.1';
const DESCRIPTION =
  'Comprehensive guide to direct current principles for maintenance technicians: DC characteristics, battery systems, DC motors, rectification, smoothing, DC distribution in industrial settings, DC testing and polarity under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'dc-characteristic',
    question: 'What is the defining characteristic of direct current (DC)?',
    options: [
      'Current reverses direction fifty times every second',
      'Current flows in one direction only with a constant or near-constant magnitude',
      'Current flows only when a transformer steps the voltage down',
      'Current varies sinusoidally between positive and negative peaks',
    ],
    correctIndex: 1,
    explanation:
      'Direct current flows in one direction only. Unlike AC, the electrons move consistently from the negative terminal to the positive terminal of the source. The magnitude may be constant (as from a regulated supply) or may vary (as from an unsmoothed rectifier), but the direction remains the same.',
  },
  {
    id: 'battery-series',
    question: 'Three 12 V batteries are connected in series. What is the total EMF?',
    options: ['36 V', '12 V', '4 V', '144 V'],
    correctIndex: 0,
    explanation:
      'In a series connection, individual battery EMFs are added together. Three 12 V batteries in series give 12 + 12 + 12 = 36 V. The total capacity (Ah) remains the same as a single battery. Series connection is used when a higher voltage is required.',
  },
  {
    id: 'rectification-type',
    question:
      'Which type of rectifier uses four diodes to convert AC to DC using both half-cycles of the waveform?',
    options: [
      'Half-wave rectifier',
      'Full-wave centre-tap rectifier',
      'Full-wave bridge rectifier',
      'Three-phase rectifier',
    ],
    correctIndex: 2,
    explanation:
      'A full-wave bridge rectifier uses four diodes arranged in a bridge configuration. During each half-cycle, two diodes conduct and two are reverse-biased, meaning both positive and negative half-cycles of the AC input are converted to a pulsating DC output. This is the most common rectifier configuration in industrial power supplies.',
  },
  {
    id: 'dc-polarity',
    question: 'Why is correct polarity essential when connecting DC equipment?',
    options: [
      'Reversed polarity increases the supply frequency and overspeeds motors',
      'Reversed polarity raises the voltage above the rated value of the supply',
      'Reversed polarity has no effect on DC equipment, only on AC equipment',
      'Reversed polarity can damage components, cause overheating, or create safety hazards',
    ],
    correctIndex: 3,
    explanation:
      'Correct polarity is critical in DC circuits. Reversed polarity can destroy electrolytic capacitors (which may explode), damage semiconductor devices, reverse-bias protective diodes rendering them ineffective, cause incorrect motor rotation, and damage sensitive electronic control equipment. Always verify polarity before energising DC circuits.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a primary source of direct current?',
    options: [
      'A three-phase alternator driven by a turbine',
      'A battery or electrochemical cell',
      'A step-down distribution transformer',
      'The mains supply at a 13 A socket-outlet',
    ],
    correctAnswer: 1,
    explanation:
      'Batteries and electrochemical cells are primary sources of DC — they convert chemical energy directly into electrical energy. Transformers and alternators produce AC. While rectifiers can convert AC to DC, the primary generating source of direct current is the electrochemical cell.',
  },
  {
    id: 2,
    question: 'What happens to the total capacity (Ah) when batteries are connected in parallel?',
    options: [
      'The total capacity stays the same as a single battery',
      'The total capacity is halved compared to a single battery',
      'The total capacity equals the sum of all individual capacities',
      'The total capacity depends on the total voltage of the string',
    ],
    correctAnswer: 2,
    explanation:
      'When batteries of the same voltage are connected in parallel, the total capacity (Ah) is the sum of all individual capacities. The voltage remains the same as a single battery. For example, three 12 V 100 Ah batteries in parallel give 12 V at 300 Ah. This is used when extended run-time is required.',
  },
  {
    id: 3,
    question: 'In a half-wave rectifier, what percentage of the AC input waveform is utilised?',
    options: ['75%', '25%', '100%', '50%'],
    correctAnswer: 3,
    explanation:
      'A half-wave rectifier uses only one half-cycle (positive or negative) of the AC waveform, blocking the other. This means only 50% of the input waveform is utilised, resulting in a lower average DC output and higher ripple. Full-wave rectification is preferred for most applications.',
  },
  {
    id: 4,
    question: 'What is the primary function of a smoothing capacitor in a DC power supply?',
    options: [
      'To reduce ripple and produce a steadier DC output',
      'To convert the alternating current into direct current',
      'To step the output voltage up to a higher level',
      'To protect the rectifier diodes from reverse voltage',
    ],
    correctAnswer: 0,
    explanation:
      'A smoothing (reservoir) capacitor is connected across the rectifier output. It charges during the peaks of the pulsating DC and discharges during the troughs, filling in the gaps and reducing the ripple voltage. This produces a much smoother DC output. Larger capacitance values and lower load currents give better smoothing.',
  },
  {
    id: 5,
    question:
      'A DC motor in a maintenance workshop suddenly reverses direction. The most likely cause is:',
    options: [
      'The motor has overheated',
      'The supply polarity has been reversed',
      'The supply frequency has changed',
      'The motor brushes are worn',
    ],
    correctAnswer: 1,
    explanation:
      "Reversing the polarity of the supply to a permanent-magnet DC motor reverses the direction of current through the armature, reversing the motor's direction of rotation. This is actually the standard method of reversing DC motors in many applications. DC motors do not depend on supply frequency (they operate on DC), and worn brushes would cause poor running rather than reversal.",
  },
  {
    id: 6,
    question: 'Which instrument would you use to verify correct polarity on a DC circuit?',
    options: [
      'A clamp meter set to AC',
      'An insulation resistance tester',
      'A multimeter set to DC volts',
      'An earth loop impedance tester',
    ],
    correctAnswer: 2,
    explanation:
      'A multimeter set to DC volts will show both the magnitude and polarity of the voltage. A positive reading confirms the red probe is on the positive conductor; a negative reading indicates reversed polarity. This is the standard method for verifying DC polarity during maintenance and commissioning.',
  },
  {
    id: 7,
    question: 'What is the main advantage of DC distribution in data centres?',
    options: [
      'DC equipment is always cheaper than AC equipment',
      'DC cables are always smaller than AC cables',
      'DC is safer than AC in all circumstances',
      'Fewer conversion stages reduce energy losses and improve efficiency',
    ],
    correctAnswer: 3,
    explanation:
      'In a conventional data centre, power is converted multiple times: AC to DC (UPS rectifier), DC to AC (UPS inverter), AC to DC (server PSU). Each conversion introduces losses (typically 2-5% per stage). DC distribution eliminates intermediate conversion stages, reducing losses and improving overall efficiency by 5-15%.',
  },
  {
    id: 8,
    question:
      'When measuring the internal resistance of a battery, a significant increase from the baseline value indicates:',
    options: [
      'The battery is degrading and may need replacement',
      'The measurement equipment is faulty',
      'The battery is fully charged',
      'The battery is new and performing well',
    ],
    correctAnswer: 0,
    explanation:
      "Internal resistance increases as a battery ages and degrades. Lead-acid batteries develop sulphation on the plates, lithium-ion batteries develop internal resistance from electrode degradation. A significant increase (typically >25% above baseline) indicates the battery's ability to deliver current under load is compromised and it may need replacement.",
  },
  {
    id: 9,
    question: 'What is the ripple factor of a power supply?',
    options: [
      'The ratio of DC output to AC input voltage',
      'The ratio of AC ripple component to the DC component of the output',
      'The number of diodes in the rectifier circuit',
      'The resistance of the smoothing capacitor',
    ],
    correctAnswer: 1,
    explanation:
      'The ripple factor is the ratio of the RMS value of the AC (ripple) component to the DC component of the rectifier output. A lower ripple factor indicates better smoothing and a purer DC output. A half-wave rectifier has a ripple factor of approximately 1.21, while a full-wave bridge rectifier has approximately 0.48 before smoothing.',
  },
  {
    id: 10,
    question: 'Under BS 7671, what is the upper voltage limit for Band I DC circuits?',
    options: ['50 V', '60 V', '120 V', '1500 V'],
    correctAnswer: 2,
    explanation:
      'Under BS 7671, Band I for DC extends up to 120 V ripple-free DC (compared to 50 V for AC). This higher threshold reflects the fact that DC is less likely to cause ventricular fibrillation at equivalent voltages. Band II DC extends from 120 V to 1500 V.',
  },
  {
    id: 11,
    question:
      'Which type of DC motor uses permanent magnets in the stator and is commonly found in small maintenance tools?',
    options: [
      'Shunt-wound DC motor',
      'Series-wound DC motor',
      'Compound-wound DC motor',
      'Permanent magnet DC motor (PMDC)',
    ],
    correctAnswer: 3,
    explanation:
      'Permanent magnet DC (PMDC) motors use permanent magnets to create the stator field, eliminating the need for field windings. They are compact, efficient, easy to control and commonly found in cordless power tools, small fans, pumps and automotive applications. Their speed is controlled by varying the armature voltage.',
  },
  {
    id: 12,
    question: 'What safety precaution is essential before working on a DC battery bank?',
    options: [
      'Remove all metallic jewellery and use insulated tools to prevent short circuits',
      'Switch off the supply at the consumer unit to make the battery dead',
      'Wait for the battery to fully discharge before touching the terminals',
      'Connect an additional battery in parallel to share the load first',
    ],
    correctAnswer: 0,
    explanation:
      'Battery banks can deliver extremely high short-circuit currents (thousands of amps) because they have very low internal impedance. A metal ring, watch or tool placed across terminals can cause an immediate short circuit, resulting in explosive arcing, severe burns and molten metal. Always remove jewellery and use insulated tools rated for the voltage present.',
  },
];

const faqs = [
  {
    question: 'Why is DC making a comeback in modern electrical installations?',
    answer:
      'DC is increasingly used because many modern loads (LED lighting, IT equipment, variable speed drives, EV chargers) ultimately require DC. Solar PV panels and batteries also produce DC. By distributing DC directly, intermediate AC-DC-AC conversion stages are eliminated, improving efficiency by 5-15%. Data centres, telecommunications and renewable energy systems are leading this trend.',
  },
  {
    question: 'Can you get a fatal electric shock from a 12 V battery?',
    answer:
      "A 12 V battery cannot normally drive sufficient current through intact skin to cause electrocution — the voltage is too low to overcome the skin's resistance. However, a 12 V battery can deliver extremely high short-circuit currents (hundreds or thousands of amps), which can cause explosive arcing, severe burns and fire if a conductor is placed across the terminals. The risk is thermal, not shock.",
  },
  {
    question: 'What is the difference between EMF and terminal voltage in a battery?',
    answer:
      "EMF (electromotive force) is the voltage produced by the battery's internal chemistry with no load connected — it represents the total energy per coulomb. Terminal voltage is the voltage measured at the battery's terminals when a load is connected. Terminal voltage is always lower than EMF because of the voltage drop across the battery's internal resistance: V_terminal = EMF - (I x r_internal). As the battery ages, internal resistance increases and terminal voltage under load decreases.",
  },
  {
    question: 'How do you safely dispose of industrial batteries?',
    answer:
      'Industrial batteries (lead-acid, lithium-ion, nickel-cadmium) are classified as hazardous waste under the Waste Batteries and Accumulators Regulations 2009. They must be collected by an approved waste carrier and recycled at a licensed facility. Never dispose of batteries in general waste. Lead-acid batteries are almost 100% recyclable. Lithium-ion batteries require specialist handling due to the risk of thermal runaway if damaged.',
  },
  {
    question: 'Why do DC arcs not self-extinguish like AC arcs?',
    answer:
      'AC arcs naturally extinguish briefly at every zero-crossing point (100 times per second at 50 Hz), giving the arc gap a chance to de-ionise and recover its insulating properties. DC has no zero-crossing — the current is continuous — so once a DC arc is established, it is sustained indefinitely until the circuit is broken by external means. This is why DC circuit breakers and fuses require special arc-quenching mechanisms and are rated differently from AC devices.',
  },
];

const MOETModule2Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.2 · Subsection 1"
        title="Direct Current Principles"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding DC characteristics, sources, applications and testing for electrical
            maintenance.
          </p>

          <TLDR
            points={[
              'DC flows in one direction — from negative to positive (conventional: positive to negative).',
              'Batteries — series increases voltage, parallel increases capacity.',
              'Rectification — converts AC to DC via half-wave or full-wave bridge circuits.',
              'Applications — battery systems, UPS, solar PV, EV charging, data centres.',
            ]}
          />

          <ConceptBlock title="Regulatory context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026:</strong> DC voltage bands — Band I up to 120 V DC.
              </li>
              <li>
                <strong>BS EN 62040:</strong> UPS systems — DC battery maintenance.
              </li>
              <li>
                <strong>EAWR 1989:</strong> Applies equally to DC and AC installations.
              </li>
              <li>
                <strong>ST1426:</strong> Understand AC/DC systems and test equipment.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the characteristics of direct current and how it differs from AC',
              'Explain battery construction, series and parallel connections, and capacity calculations',
              'Describe rectification methods including half-wave and full-wave bridge circuits',
              'Explain the function of smoothing capacitors and voltage regulators',
              'Identify DC motor types and their applications in industrial maintenance',
              'Carry out DC polarity testing and interpret measurements correctly',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>DC characteristics and sources</ContentEyebrow>

          <ConceptBlock title="Direct current flows one way">
            <p>
              Direct current (DC) is defined as electric current that flows in one direction only.
              Unlike alternating current, which reverses direction periodically, DC maintains a
              constant polarity — the positive terminal remains positive and the negative terminal
              remains negative at all times. The magnitude of DC may be perfectly constant (as from
              a regulated power supply) or may vary over time (as from a solar panel under changing
              cloud conditions), but the direction of current flow does not change.
            </p>
            <p>
              In electron flow terms, electrons move from the negative terminal through the external
              circuit to the positive terminal. Conventional current flow (used in circuit analysis
              and on all standard diagrams) is defined as flowing from positive to negative. Both
              conventions are correct — they simply describe the same phenomenon from different
              perspectives. As a maintenance technician, you must be comfortable with both
              conventions, though conventional current is used in virtually all circuit diagrams,
              equipment labels and test instrument readings.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Primary DC sources">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrochemical cells and batteries:</strong> Convert chemical energy to
                electrical energy — the most fundamental DC source. Examples: lead-acid,
                lithium-ion, nickel-metal hydride, alkaline cells.
              </li>
              <li>
                <strong>Photovoltaic (solar) cells:</strong> Convert light energy to electrical
                energy via the photovoltaic effect in semiconductor junctions. Output varies with
                irradiance and temperature.
              </li>
              <li>
                <strong>DC generators (dynamos):</strong> Convert mechanical energy to DC via
                electromagnetic induction with a commutator. Largely replaced by alternators with
                rectifiers in modern installations.
              </li>
              <li>
                <strong>Rectified AC supplies:</strong> AC converted to DC through diode rectifier
                circuits — the most common source of DC in industrial installations.
              </li>
              <li>
                <strong>Thermocouples:</strong> Generate a small DC voltage from the junction of two
                dissimilar metals at different temperatures — used extensively in temperature
                measurement.
              </li>
              <li>
                <strong>Fuel cells:</strong> Convert hydrogen and oxygen to electricity and water —
                emerging technology for backup power and transport.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="DC vs AC — key comparisons">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Direct Current (DC)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Alternating Current (AC)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Direction</td>
                    <td className="border border-white/10 px-3 py-2">Unidirectional</td>
                    <td className="border border-white/10 px-3 py-2">Reverses periodically</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Frequency</td>
                    <td className="border border-white/10 px-3 py-2">0 Hz (zero)</td>
                    <td className="border border-white/10 px-3 py-2">50 Hz (UK), 60 Hz (US)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Transformation</td>
                    <td className="border border-white/10 px-3 py-2">Requires DC-DC converters</td>
                    <td className="border border-white/10 px-3 py-2">Simple transformer action</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Transmission</td>
                    <td className="border border-white/10 px-3 py-2">
                      Lower losses over long distance (HVDC)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Easier to step up/down for distribution
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Storage</td>
                    <td className="border border-white/10 px-3 py-2">
                      Batteries store DC directly
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Must be converted to DC for storage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Arc behaviour</td>
                    <td className="border border-white/10 px-3 py-2">
                      Sustained — no zero crossing
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Self-extinguishes at zero crossing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> DC is increasingly prevalent in modern installations.
              Solar PV, battery energy storage, EV charging, LED lighting and IT equipment all
              fundamentally operate on DC. The maintenance technician must be equally competent with
              DC systems as with traditional AC installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Battery systems and connections</ContentEyebrow>

          <ConceptBlock title="Batteries convert chemistry into electricity">
            <p>
              Batteries are the most common DC source encountered in electrical maintenance. From
              small control circuit batteries to large UPS battery banks and emergency lighting
              systems, understanding battery technology, connection methods and maintenance
              procedures is essential. A battery consists of one or more electrochemical cells that
              convert chemical energy into electrical energy through redox (reduction-oxidation)
              reactions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common battery types in maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lead-acid (flooded):</strong> Cell voltage 2.0 V. Used in UPS systems,
                standby power and emergency lighting. Requires electrolyte level checking, specific
                gravity testing and terminal cleaning. Produces hydrogen gas during charging —
                ventilation essential.
              </li>
              <li>
                <strong>Lead-acid (VRLA/sealed):</strong> Cell voltage 2.0 V. Valve-regulated,
                maintenance-reduced (not maintenance-free). Used in UPS, telecommunications and fire
                alarm panels. No electrolyte topping-up but still requires temperature monitoring
                and impedance testing.
              </li>
              <li>
                <strong>Lithium-ion (Li-ion):</strong> Cell voltage 3.6-3.7 V. High energy density,
                low self-discharge. Used in portable tools, EV charging infrastructure and battery
                energy storage systems (BESS). Requires battery management systems (BMS) and thermal
                monitoring.
              </li>
              <li>
                <strong>Nickel-cadmium (NiCd):</strong> Cell voltage 1.2 V. Very robust, wide
                temperature range, long life. Used in industrial standby systems and emergency
                lighting. Being phased out due to cadmium toxicity (WEEE regulations).
              </li>
              <li>
                <strong>Nickel-metal hydride (NiMH):</strong> Cell voltage 1.2 V. Replacement for
                NiCd in many applications. Higher capacity, less toxic, but shorter cycle life.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Series and parallel battery connections">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Capacity (Ah)</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Series</td>
                    <td className="border border-white/10 px-3 py-2">V₁ + V₂ + V₃ ...</td>
                    <td className="border border-white/10 px-3 py-2">Same as one cell</td>
                    <td className="border border-white/10 px-3 py-2">
                      UPS battery strings (e.g., 20 x 12 V = 240 V DC)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Parallel</td>
                    <td className="border border-white/10 px-3 py-2">Same as one cell</td>
                    <td className="border border-white/10 px-3 py-2">Ah₁ + Ah₂ + Ah₃ ...</td>
                    <td className="border border-white/10 px-3 py-2">
                      Extended run-time applications
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Series-Parallel
                    </td>
                    <td className="border border-white/10 px-3 py-2">Sum of series string</td>
                    <td className="border border-white/10 px-3 py-2">Sum of parallel strings</td>
                    <td className="border border-white/10 px-3 py-2">
                      Large battery banks (BESS, telecom)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <SeriesCircuit
            eyebrow="Series connection"
            caption="A series string of cells — like R₁, R₂, R₃ here — adds the EMFs. This is how a 240 V DC UPS string is built from 12 V cells."
          />
          <ParallelCircuit
            eyebrow="Parallel connection"
            caption="Cells in parallel keep the same voltage but add their capacities — the mechanism behind extended battery run-time."
          />

          <ConceptBlock title="Battery safety hazards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Short circuit:</strong> Batteries deliver massive fault currents — a spanner
                across lead-acid terminals can weld itself and cause explosive arcing.
              </li>
              <li>
                <strong>Hydrogen gas:</strong> Lead-acid batteries produce hydrogen during charging
                — explosive concentration reached at 4% in air. Adequate ventilation and no ignition
                sources required.
              </li>
              <li>
                <strong>Acid/alkali:</strong> Flooded lead-acid contains sulphuric acid, NiCd
                contains potassium hydroxide — both cause severe chemical burns. PPE essential.
              </li>
              <li>
                <strong>Thermal runaway:</strong> Lithium-ion cells can enter thermal runaway if
                overcharged, physically damaged or operated above temperature limits — resulting in
                fire and toxic gas emission.
              </li>
              <li>
                <strong>Stored energy:</strong> Battery banks cannot be isolated by simply turning
                off a switch — the battery itself is always live. Physical disconnection is
                required.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When working on battery systems, always start
              disconnection from the load side and work back towards the battery. When reconnecting,
              start from the battery and work towards the load. This minimises the risk of
              accidental short circuits through the load circuit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Rectification and smoothing</ContentEyebrow>

          <ConceptBlock title="Converting AC to DC">
            <p>
              Rectification is the process of converting alternating current to direct current. In
              modern electrical installations, rectification is the most common method of producing
              DC — far more prevalent than DC generators. Every power supply unit, battery charger,
              variable speed drive and LED driver contains a rectifier stage. Understanding
              rectifier operation is essential for fault-finding and maintenance.
            </p>
            <p>
              Rectification relies on the unidirectional conduction property of semiconductor
              diodes. A diode conducts current freely in the forward direction (anode positive with
              respect to cathode) but blocks current in the reverse direction. By arranging diodes
              in specific configurations, the alternating half-cycles of an AC supply can be
              directed to produce a unidirectional (DC) output.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Rectifier types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Half-wave rectifier:</strong> Uses a single diode. Only the positive
                half-cycle passes; the negative half-cycle is blocked. Simple but inefficient — 50%
                of the input waveform is wasted. Ripple frequency equals the supply frequency (50
                Hz). Average DC output = 0.318 x V_peak.
              </li>
              <li>
                <strong>Full-wave centre-tap:</strong> Uses two diodes and a centre-tapped
                transformer. Both half-cycles are utilised, doubling the output frequency to 100 Hz.
                Requires a special transformer with a centre-tap — less common in modern circuits.
              </li>
              <li>
                <strong>Full-wave bridge rectifier:</strong> Uses four diodes in a bridge
                configuration. Both half-cycles are utilised without requiring a centre-tapped
                transformer. The most common configuration in industrial power supplies. Ripple
                frequency = 100 Hz. Average DC output = 0.636 x V_peak.
              </li>
              <li>
                <strong>Three-phase rectifier:</strong> Uses six diodes to rectify a three-phase
                supply. Produces a much smoother output with lower ripple (ripple frequency = 300
                Hz). Used in industrial drives, large battery chargers and high-power DC supplies.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Smoothing and regulation">
            <p>
              The output of a rectifier is pulsating DC — it has the correct polarity but varies
              significantly in magnitude. For most applications, this ripple must be reduced by
              smoothing circuits.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reservoir capacitor:</strong> A large electrolytic capacitor connected
                across the rectifier output. It charges to the peak voltage during conduction and
                discharges into the load between peaks, filling in the troughs. Larger capacitance =
                less ripple. Typical values: 1,000-10,000 μF.
              </li>
              <li>
                <strong>LC filter:</strong> An inductor (choke) in series with the load and a
                capacitor in parallel. The inductor opposes changes in current while the capacitor
                opposes changes in voltage — together they provide superior smoothing for
                high-current applications.
              </li>
              <li>
                <strong>Voltage regulator:</strong> Maintains a constant output voltage despite
                variations in input voltage or load current. Linear regulators (e.g., 7805, 7812
                series) are simple but waste energy as heat. Switch-mode regulators are more
                efficient but produce higher-frequency noise.
              </li>
              <li>
                <strong>Ripple voltage:</strong> The remaining AC component after smoothing.
                Expressed as peak-to-peak ripple voltage or as a percentage of the DC output.
                Acceptable ripple depends on the application — typically less than 1% for sensitive
                electronics.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Assuming a disconnected power supply has no stored charge"
            whatHappens={
              <>
                Smoothing capacitors in power supplies and variable speed drives can retain a lethal
                charge for minutes or even hours after the supply is disconnected. A 400 V DC bus
                capacitor in a VSD can store sufficient energy to cause a fatal shock.
              </>
            }
            doInstead={
              <>
                Always follow the manufacturer&apos;s specified discharge time before working inside
                equipment. Verify with a suitable voltage indicator that the capacitors have
                discharged to a safe level. Never rely on bleeder resistors alone — they can fail
                open-circuit.
              </>
            }
          />

          <ConceptBlock title="Fault-finding tip">
            <p>
              A common failure in power supplies is a dried-out or failed smoothing capacitor.
              Symptoms include excessive ripple on the DC output, audible hum from connected
              equipment, flickering LED drivers and intermittent operation of sensitive electronics.
              An oscilloscope or a multimeter with AC measurement on the DC output can confirm
              excessive ripple.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>DC motors, testing and industrial distribution</ContentEyebrow>

          <ConceptBlock title="DC motors remain important for specific applications">
            <p>
              Although AC induction motors dominate industrial applications, DC motors remain
              important in specific applications where precise speed control, high starting torque
              or battery-powered operation is required. Understanding DC motor types, their
              characteristics and common faults is an essential maintenance competency.
              Additionally, DC distribution is becoming increasingly relevant in data centres,
              renewable energy installations and electric vehicle charging infrastructure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DC motor types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Permanent magnet (PMDC):</strong> Stator field from permanent magnets.
                Simple, compact, easy speed control via armature voltage. Used in cordless tools,
                small fans, automotive applications. Speed decreases with increasing load.
              </li>
              <li>
                <strong>Shunt-wound:</strong> Field winding connected in parallel with the armature.
                Provides relatively constant speed under varying load — good for machine tools,
                conveyors and pumps. Speed controlled by field current or armature voltage.
              </li>
              <li>
                <strong>Series-wound:</strong> Field winding in series with the armature. Very high
                starting torque — ideal for cranes, hoists, traction motors and starter motors.
                Speed varies greatly with load; must never be run unloaded (can reach dangerously
                high speeds).
              </li>
              <li>
                <strong>Compound-wound:</strong> Combines series and shunt field windings. Provides
                a compromise between the constant speed of shunt motors and the high starting torque
                of series motors. Used in rolling mills, presses and elevators.
              </li>
              <li>
                <strong>Brushless DC (BLDC):</strong> Permanent magnet rotor, electronically
                commutated stator. No brushes to wear — very low maintenance. Used in fans, pumps,
                HVAC compressors and electric vehicles.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="DC testing and measurement">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polarity verification:</strong> Use a multimeter on DC volts range. Positive
                reading = correct polarity; negative reading = reversed. Essential before connecting
                any polarity-sensitive equipment.
              </li>
              <li>
                <strong>Battery voltage (open circuit):</strong> Measure across terminals with no
                load connected. Compare to the nominal voltage. A fully charged lead-acid cell reads
                approximately 2.1 V; fully discharged approximately 1.75 V.
              </li>
              <li>
                <strong>Battery voltage (under load):</strong> Apply a known load and measure
                voltage. A significant voltage drop indicates high internal resistance and a
                degraded battery.
              </li>
              <li>
                <strong>Ripple measurement:</strong> Set multimeter to AC volts and measure across a
                DC supply. The AC reading represents the ripple component. Alternatively, use an
                oscilloscope for a visual representation of ripple waveform.
              </li>
              <li>
                <strong>Internal resistance:</strong> Measured using a dedicated battery impedance
                tester. Rising internal resistance over time indicates battery degradation. Trend
                monitoring is essential for predictive maintenance of UPS battery banks.
              </li>
              <li>
                <strong>Insulation resistance:</strong> DC circuits require insulation resistance
                testing at appropriate voltage (typically 500 V DC for LV circuits). Minimum
                acceptable value per BS 7671: 1 MΩ for circuits up to 500 V.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="DC distribution in industry">
            <p>
              DC distribution is experiencing a renaissance driven by the proliferation of DC-native
              loads and generation sources. Key applications include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Data centres:</strong> 380 V DC distribution eliminates multiple AC-DC-AC
                conversion stages. Google, Facebook and other hyperscale operators have adopted DC
                distribution for efficiency gains of 5-15%.
              </li>
              <li>
                <strong>Telecommunications:</strong> -48 V DC has been the standard telecom power
                system for decades. The negative polarity minimises electrolytic corrosion on copper
                conductors.
              </li>
              <li>
                <strong>Solar PV:</strong> PV panels produce DC, which is fed to inverters for AC
                connection or used directly in DC-coupled battery systems. DC string voltages can
                exceed 1000 V — requiring HV DC competency.
              </li>
              <li>
                <strong>EV charging:</strong> DC fast chargers (50-350 kW) deliver DC directly to
                the vehicle battery, bypassing the vehicle&apos;s onboard AC charger. Voltages up to
                1000 V DC are used in high-power charging.
              </li>
              <li>
                <strong>HVDC transmission:</strong> High-voltage DC (up to 800 kV) is used for
                long-distance bulk power transmission, submarine cables and interconnectors. Lower
                losses than equivalent AC over distances exceeding approximately 600 km.
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires
              understanding of both AC and DC systems, including the ability to carry out testing,
              interpret results and maintain DC equipment safely. DC competency is increasingly
              important as the energy landscape evolves.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DC is increasingly prevalent in modern installations. Solar PV, battery energy storage, EV charging, LED lighting and IT equipment all fundamentally operate on DC.',
              'When working on battery systems, always start disconnection from the load side and work back towards the battery. When reconnecting, start from the battery and work towards the load.',
              'Smoothing capacitors in power supplies and variable speed drives can retain a lethal charge for minutes or even hours after the supply is disconnected — always verify discharge and never rely on bleeder resistors alone.',
              'A common failure in power supplies is a dried-out or failed smoothing capacitor, shown by excessive ripple, audible hum, flickering LED drivers and intermittent operation of sensitive electronics.',
              'DC competency is increasingly important as the energy landscape evolves — solar PV, EV charging and data centre distribution all depend on it.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — DC Principles" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Electrical Symbols and Conventions
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Alternating Current Principles
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section2_1;
