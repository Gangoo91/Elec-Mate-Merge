/**
 * MOET · Module 2 · Section 2.1 · Subsection 1 — Voltage, Current,
 * Resistance and Power
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
  VideoCard,
} from '@/components/study-centre/learning';
import { OhmsLawTriangle, SeriesCircuit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Voltage, Current, Resistance and Power - MOET Module 2 Section 1.1';
const DESCRIPTION =
  'The four fundamental electrical quantities for maintenance technicians: voltage, current, resistance and power — definitions, units, symbols, how they relate (V=IR, P=VI), how to measure each safely on site, and the typical readings an ST1426 apprentice will meet in practice.';

const quickCheckQuestions = [
  {
    id: 'unit-of-current',
    question: 'Which of the following correctly pairs the quantity, its symbol and its unit?',
    options: [
      'Current — symbol V — measured in watts',
      'Current — symbol I — measured in amperes',
      'Voltage — symbol R — measured in ohms',
      'Resistance — symbol P — measured in volts',
    ],
    correctIndex: 1,
    explanation:
      'Current has the symbol I (from the French "intensité") and is measured in amperes (A). Voltage has the symbol V and is measured in volts (V); resistance has the symbol R and is measured in ohms; power has the symbol P and is measured in watts (W). Learning these pairings until they are automatic is essential — every formula and every test instrument uses them.',
  },
  {
    id: 'current-from-power',
    question:
      'A 2.3 kW load is connected to a 230 V single-phase supply. What current does it draw?',
    options: ['100 A', '2.3 A', '10 A', '23 A'],
    correctIndex: 2,
    explanation:
      'Rearranging P = V x I gives I = P / V = 2300 / 230 = 10 A. Converting the connected load in watts to current in amperes is one of the most common calculations in maintenance — it tells you whether the circuit and its protective device can handle the load.',
  },
  {
    id: 'i-squared-r',
    question:
      'A cable carries 10 A and has a total conductor resistance of 0.2 ohms. Using P = I squared x R, how much power is lost as heat in the cable?',
    options: ['2 W', '20 W', '200 W', '4 W'],
    correctIndex: 1,
    explanation:
      'P = I squared x R = 10 squared x 0.2 = 100 x 0.2 = 20 W. This 20 W is dissipated as heat along the cable. Because the loss depends on the square of the current, doubling the current to 20 A would quadruple the loss to 80 W — which is why overloaded cables run hot.',
  },
  {
    id: 'kwh-energy',
    question: 'A 2 kW heater runs continuously for 3 hours. How much energy does it use?',
    options: ['2 kWh', '5 kWh', '6 kWh', '0.67 kWh'],
    correctIndex: 2,
    explanation:
      'Energy = power x time = 2 kW x 3 h = 6 kWh. Power (kW) is the rate at which energy is used at any instant; energy (kWh) is the total amount used over time. Electricity meters record kWh — this is what the customer pays for.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the unit of electrical resistance?',
    options: ['The volt', 'The ampere', 'The watt', 'The ohm'],
    correctAnswer: 3,
    explanation:
      'Resistance is measured in ohms, named after Georg Simon Ohm. One ohm is the resistance that allows a current of one ampere to flow when one volt is applied across it. The quantity symbol is R and the unit symbol is the Greek letter omega.',
  },
  {
    id: 2,
    question:
      'A current of 5 A flows through a resistance of 9.2 ohms. What is the voltage across it?',
    options: ['46 V', '1.84 V', '0.54 V', '4.6 V'],
    correctAnswer: 0,
    explanation:
      'Using V = I x R = 5 x 9.2 = 46 V. This is a direct application of Ohm’s Law — if you know the current through a component and its resistance, you can calculate the voltage dropped across it.',
  },
  {
    id: 3,
    question: 'What current flows when a 230 V supply is connected across a 115 ohm load?',
    options: ['0.5 A', '2 A', '26,450 A', '20 A'],
    correctAnswer: 1,
    explanation:
      'Using I = V / R = 230 / 115 = 2 A. Rearranging Ohm’s Law to find current is the everyday form of the equation for a technician — you usually know the supply voltage and can measure or look up the resistance.',
  },
  {
    id: 4,
    question: 'A load draws 4 A from a 230 V supply. What power does it consume?',
    options: ['57.5 W', '234 W', '920 W', '9.2 kW'],
    correctAnswer: 2,
    explanation:
      'Using P = V x I = 230 x 4 = 920 W. This is the fundamental power equation. A clamp meter reading of 4 A on a 230 V circuit tells you the load is drawing roughly 920 W (for a resistive load — for motors the power factor must also be considered).',
  },
  {
    id: 5,
    question:
      'A heating element has a resistance of 52.9 ohms. What power does it produce on a 230 V supply?',
    options: ['1000 W', '4.35 W', '12,167 W', '230 W'],
    correctAnswer: 0,
    explanation:
      'Using P = V squared / R = 230 squared / 52.9 = 52,900 / 52.9 = 1000 W (1 kW). This form of the power equation is ideal when you know the supply voltage and have measured the element resistance with the circuit isolated.',
  },
  {
    id: 6,
    question: 'A 1.5 kW pump motor runs for 8 hours. How much energy does it consume?',
    options: ['9.5 kWh', '12 kWh', '1.5 kWh', '0.19 kWh'],
    correctAnswer: 1,
    explanation:
      'Energy = power x time = 1.5 kW x 8 h = 12 kWh. Note the distinction: the motor’s power is 1.5 kW (a rate), while the energy used is 12 kWh (an amount). Energy in kWh is what appears on the electricity bill.',
  },
  {
    id: 7,
    question: 'How should a clamp meter be used to measure the current in a circuit?',
    options: [
      'Clamped around the complete cable containing line and neutral together',
      'Connected in parallel across the load terminals',
      'Clamped around a single conductor only',
      'Connected in series after cutting the conductor',
    ],
    correctAnswer: 2,
    explanation:
      'A clamp meter must be placed around a single conductor. If you clamp around a complete cable containing both line and neutral, the magnetic fields of the outgoing and returning currents cancel and the meter reads (close to) zero. The great advantage of the clamp meter is that it measures current without breaking into the circuit.',
  },
  {
    id: 8,
    question: 'How is a voltmeter connected to measure the voltage across a component?',
    options: [
      'In series with the component, so the circuit current flows through the meter',
      'In parallel, across the two terminals of the component',
      'Between the line conductor and the meter’s internal battery',
      'Clamped around the conductor feeding the component',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage is a difference in potential between two points, so a voltmeter is always connected in parallel — across the two points being compared. The voltmeter has a very high internal resistance so it draws negligible current and does not disturb the circuit. An ammeter, by contrast, is connected in series and has a very low resistance.',
  },
  {
    id: 9,
    question:
      'At the distribution board a circuit measures 230 V, but at the far end of a long cable run the equipment terminals measure only 218 V under load. What is the most likely explanation?',
    options: [
      'The supply transformer is faulty and must be replaced',
      'Voltage drop along the cable due to its resistance and the load current',
      'The voltmeter is reading incorrectly at the far end only',
      'The equipment is generating its own opposing voltage',
    ],
    correctAnswer: 1,
    explanation:
      'The 12 V difference (about 5.2% of 230 V) is voltage drop: the load current flowing through the resistance of the cable conductors drops voltage along the run (V = I x R). Long runs, undersized conductors and heavy loads all make it worse. BS 7671 limits voltage drop in an installation — Appendix 4 gives the maximum values for lighting and other circuits (Regulation 525.202).',
  },
  {
    id: 10,
    question:
      'On a UK three-phase supply the line-to-line voltage is 400 V. What is the nominal line-to-neutral voltage?',
    options: ['400 V', '230 V', '200 V', '110 V'],
    correctAnswer: 1,
    explanation:
      'The line-to-neutral voltage equals the line-to-line voltage divided by the square root of 3: 400 / 1.732 = approximately 231 V, which corresponds to the nominal 230 V single-phase value. This is why the UK nominal voltages are quoted together as 230/400 V — they are two measurements of the same three-phase system.',
  },
  {
    id: 11,
    question: 'What is the difference between a kilowatt (kW) and a kilowatt-hour (kWh)?',
    options: [
      'They are two names for the same quantity',
      'kW measures energy; kWh measures power',
      'kW measures power (the rate of using energy); kWh measures energy (the amount used)',
      'kW is used for DC circuits and kWh for AC circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Power (kW) is the rate at which energy is converted at an instant — like the speed of a car. Energy (kWh) is the total amount converted over time — like the distance travelled. A 3 kW load running for 2 hours uses 6 kWh. Meters bill in kWh; nameplates and circuit calculations use kW.',
  },
  {
    id: 12,
    question:
      'Two 10 ohm resistors are connected first in series, then in parallel. What are the two total resistances?',
    options: [
      'Series 20 ohms; parallel 5 ohms',
      'Series 5 ohms; parallel 20 ohms',
      'Series 10 ohms; parallel 10 ohms',
      'Series 100 ohms; parallel 1 ohm',
    ],
    correctAnswer: 0,
    explanation:
      'In series, resistances add: 10 + 10 = 20 ohms. In parallel, two equal resistors give half the value of one: 10 / 2 = 5 ohms. Series connections increase total resistance; parallel connections reduce it. Section 2.1.2 develops this fully with Ohm’s Law applied to complete circuits.',
  },
];

const faqs = [
  {
    question: 'Why is the UK supply called 230 V when I often measure something different?',
    answer:
      'The 230 V figure is the nominal voltage — the declared design value of the supply, with 400 V as the nominal three-phase line-to-line value. The actual voltage at any moment is allowed to vary within tolerances defined by the harmonised voltage standard (BS EN 60038), and it also changes with network loading and your distance from the transformer. Measuring 235 V or 242 V at a socket is entirely normal. What matters in maintenance is whether the voltage at the equipment stays within the range the equipment is designed for — and whether excessive voltage drop within the installation is pulling it below that range under load.',
  },
  {
    question: 'What is the difference between conventional current and electron flow?',
    answer:
      'Conventional current is defined as flowing from positive to negative — a convention fixed before the electron was discovered. In a metal conductor the charge carriers are actually electrons, which drift from negative to positive. All circuit diagrams, formulae and instrument markings use conventional current, so that is what you work with in practice. The physics underneath does not change any calculation.',
  },
  {
    question: 'Why do multimeters have separate settings and leads for current measurement?',
    answer:
      'To measure current, an ammeter must be placed in series so the circuit current flows through it, and its internal resistance must be very low so it does not affect the circuit. That low resistance is exactly why connecting a meter set to amps across a supply (in parallel, like a voltmeter) creates a near short circuit — a common and dangerous mistake that blows the meter fuse at best. In power circuit maintenance you rarely break into a circuit to measure current; a clamp meter around a single conductor does the job without disconnection.',
  },
  {
    question: 'What does GS38 have to do with my test leads?',
    answer:
      'GS38 is the HSE guidance note covering test equipment used on low voltage electrical systems. In practical terms it means your voltage indicator and leads should have finger barriers, minimal exposed probe tips, fused or current-limited leads, and adequate insulation ratings. Before and after proving dead you also verify the voltage indicator itself against a known source (a proving unit). Your training centre and employer will drill the full safe isolation procedure — the key point for this section is that voltage measurement on live equipment is only done with suitable equipment and only when it cannot be avoided.',
  },
  {
    question: 'Why does resistance matter so much if loads are specified in watts?',
    answer:
      'Because resistance is what you can measure with the circuit safely isolated. A 2 kW element should have a resistance of roughly V squared / P = 230 squared / 2000 = 26.5 ohms when measured cold. If your meter reads open circuit, the element has failed; if it reads a few ohms, there may be a partial short. Comparing a measured resistance against the value calculated from the nameplate power rating is one of the fastest dead-testing diagnostics a maintenance technician has.',
  },
];

const MOETModule2Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.1 · Subsection 1"
        title="Voltage, Current, Resistance and Power"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The four quantities every electrical measurement, calculation and fault diagnosis is
            built on.
          </p>

          <TLDR
            points={[
              'Voltage (V, volts): the electrical pressure that drives current',
              'Current (I, amperes): the rate of flow of electric charge',
              'Resistance (R, ohms): opposition to current flow',
              'Power (P, watts): the rate of converting electrical energy — P = V x I',
              'UK nominal supply: 230 V single-phase, 400 V three-phase',
              'Multimeter: voltage in parallel; resistance on dead circuits only',
              'Clamp meter: current around a single conductor, no disconnection',
              'ST1426: foundation knowledge for all electrical maintenance KSBs',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define voltage, current, resistance and power with their symbols and units',
              'State the UK nominal supply voltages and where each is used',
              'Relate the four quantities using V = IR, P = VI, P = I squared R and P = V squared / R',
              'Select and connect the right instrument to measure each quantity safely',
              'Recognise the typical voltages and currents met in maintenance work',
              'Distinguish power (kW) from energy (kWh) and calculate running costs',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Voltage — electrical pressure</ContentEyebrow>

          <ConceptBlock title="Voltage — Electrical Pressure">
            <p>
              Voltage is the difference in electrical potential between two points — the 'pressure'
              that pushes current around a circuit. The quantity symbol is V (you will also see U in
              some European documentation) and the unit is the volt (V), named after Alessandro
              Volta. A useful mental model is water in a pipe system: voltage is the pressure
              difference between two points, current is the flow of water, and resistance is the
              narrowness of the pipe.
            </p>
            <p>
              Strictly, a source such as a battery or generator produces an electromotive force
              (EMF), while the voltage measured across any component in a circuit is a potential
              difference (p.d.). In everyday maintenance work both are simply called 'voltage' and
              both are measured in volts, but the distinction matters when you study sources and
              internal resistance later in this module.
            </p>
          </ConceptBlock>

          <ConceptBlock title="UK Nominal Supply Voltages">
            <p>
              The nominal voltage of the UK public low voltage supply is 230 V AC single-phase and
              400 V AC three-phase (line-to-line). These two figures describe the same three-phase
              system: 400 V divided by the square root of 3 gives approximately 230 V, the
              line-to-neutral value. The actual supply voltage is permitted to vary within
              tolerances defined by BS EN 60038, so a socket reading of 235 V or 240 V is normal.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>230 V single-phase:</strong> lighting, socket outlets, small machines, most
                domestic and light commercial loads
              </li>
              <li>
                <strong>400 V three-phase:</strong> motors, larger heating loads, distribution
                within industrial and commercial premises
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Voltages a Maintenance Technician Meets">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">400 V AC</td>
                    <td className="border border-white/10 px-3 py-2">
                      Three-phase motors, distribution boards, busbar systems
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Line-to-line value of the three-phase supply
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">230 V AC</td>
                    <td className="border border-white/10 px-3 py-2">
                      Single-phase circuits, control panels, socket outlets
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Line-to-neutral value; also common for contactor coils
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">110 V AC</td>
                    <td className="border border-white/10 px-3 py-2">
                      Site tools and temporary supplies via centre-tapped transformers
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Centre tap earthed so only 55 V exists to earth — reduced shock risk
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">24 V AC/DC</td>
                    <td className="border border-white/10 px-3 py-2">
                      Control circuits, PLC inputs/outputs, sensors, solenoid valves
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      The most common industrial control voltage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">12 V AC/DC</td>
                    <td className="border border-white/10 px-3 py-2">
                      Extra-low voltage lighting, battery systems, vehicle circuits
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Extra-low voltage — but still capable of high fault currents
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Measuring Voltage">
            <p>
              Voltage is measured with a voltmeter (usually the voltage range of a multimeter or a
              two-pole voltage tester) connected <strong>in parallel</strong> — across the two
              points whose potential difference you want to know. The instrument has a very high
              internal resistance, so it draws almost no current and does not disturb the circuit.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Select the correct range and AC/DC setting before connecting the leads</li>
              <li>
                Use GS38-compliant leads and probes for any measurement on low voltage systems
              </li>
              <li>
                Live measurement is a last resort — isolate and prove dead wherever the task allows,
                and follow your employer's safe isolation procedure
              </li>
              <li>
                Measure across the component: across a lamp, across a contactor coil, across a motor
                terminal pair — never 'at' a single point
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The Volt Drop Symptom"
            situation={
              <>
                A packaging machine at the far end of a warehouse keeps stalling under full load. At
                the distribution board the circuit measures 230 V, but at the machine terminals the
                reading falls to 216 V when the machine runs — a drop of 14 V, around 6% of nominal.
              </>
            }
            whatToDo={
              <>
                The cause is voltage drop: load current flowing through the resistance of a long
                cable run drops voltage along the way (V = I x R). BS 7671 limits the voltage drop
                within an installation — Regulation 525.202 points to Appendix 4 for the maximum
                values for lighting and other circuits — and a run this far outside normal readings
                needs investigating: undersized cable, an added load, or a deteriorating joint
                adding resistance.
              </>
            }
          />

          <ConceptBlock title="Voltage is always a measurement between two points">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> voltage is always a measurement{' '}
              <em>between two points</em>. When a drawing says a terminal is 'at 230 V', it means
              230 V measured with respect to neutral or earth. Keeping this in mind will save you
              from countless confusing meter readings during fault-finding.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Current — the flow of charge</ContentEyebrow>

          <ConceptBlock title="Current — The Flow of Charge">
            <p>
              Current is the rate of flow of electric charge through a conductor. The quantity
              symbol is I (from the French <em>intensité de courant</em>) and the unit is the ampere
              (A), commonly shortened to 'amp'. One ampere is a flow of one coulomb of charge per
              second. Smaller currents are expressed in milliamperes (mA, thousandths of an ampere)
              — a unit you will meet constantly in control and instrumentation work.
            </p>
            <p>
              By convention, current is drawn flowing from the positive terminal of a source,
              through the circuit, and back to the negative terminal. In a metal conductor the
              moving charges are actually electrons travelling the other way, but every diagram,
              formula and instrument uses conventional current, so that is the direction you work
              with.
            </p>
            <p>
              Current only flows in a <strong>complete circuit</strong>. Break the circuit anywhere
              — an open switch, a blown fuse, a snapped conductor — and the current everywhere in
              that loop stops. This single fact underpins a huge amount of fault-finding: 'no
              current' means 'the loop is broken somewhere', and your job becomes finding where.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Currents a Maintenance Technician Meets">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Typical Current</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">4–20 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Instrumentation signal loops (pressure, temperature, level transmitters)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      4 mA = minimum of range; 0 mA indicates a broken loop
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Tens to hundreds of mA
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Relay and contactor coils, indicator lamps, PLC outputs
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      A 24 V coil of 240 ohms draws I = 24 / 240 = 0.1 A (100 mA)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Up to 13 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Plug-connected equipment on 230 V socket circuits
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      A full 3 kW load draws I = 3000 / 230 = approximately 13 A
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Single amps to tens of amps
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Three-phase motor full-load currents
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      A 4 kW, 400 V motor at 0.8 power factor draws about 7.2 A per line
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      6–8 x full-load current
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Motor starting (inrush) current, for a few seconds
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Why motor circuits need protective devices that ride through starting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Measuring Current">
            <p>There are two ways to measure current, and choosing the right one matters:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Clamp meter (the maintenance workhorse):</strong> the jaws clamp around a{' '}
                <strong>single conductor</strong> and measure the magnetic field produced by the
                current — no disconnection, no breaking into the circuit. Clamping around a whole
                cable (line and neutral together) reads near zero because the two fields cancel
              </li>
              <li>
                <strong>Multimeter on a current range:</strong> connected <strong>in series</strong>{' '}
                so the circuit current flows through the meter. Practical for small control and
                signal currents (mA), but it requires breaking the circuit and the meter's fused
                range must exceed the expected current
              </li>
            </ul>
            <p>
              Never connect a meter set to a current range <em>across</em> a supply. Its very low
              internal resistance makes it a near short circuit — this blows the meter fuse at best
              and causes a dangerous arc flash at worst.
            </p>
          </ConceptBlock>

          <Scenario
            title="Reading a Clamp Meter"
            situation={
              <>
                You clamp one line conductor of a 4 kW, 400 V three-phase motor with a power factor
                of 0.8. What line current should you expect if the motor is fully loaded?
              </>
            }
            whatToDo={
              <>
                <p>I = P / (square root of 3 x V x power factor)</p>
                <p>I = 4000 / (1.732 x 400 x 0.8)</p>
                <p>I = 4000 / 554.2</p>
                <p>
                  I = <strong>approximately 7.2 A</strong>
                </p>
              </>
            }
            whyItMatters={
              <>
                If the clamp reads close to 7.2 A, the motor is working at around full load. A much
                lower reading suggests the machine is lightly loaded; a higher reading suggests
                mechanical overload, a failing bearing, or a supply problem. Comparing measured
                current against the calculated or nameplate value is one of the fastest health
                checks in maintenance.
              </>
            }
          />

          <ConceptBlock title="Current is what does the work — and what generates the heat">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> current is what does the work — and what generates the
              heat. Protective devices (fuses, circuit breakers) are rated in amperes because it is
              current, not voltage, that they monitor and interrupt.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Resistance — opposition to current</ContentEyebrow>

          <ConceptBlock title="Resistance — Opposition to Current">
            <p>
              Resistance is the opposition a material presents to the flow of current. The quantity
              symbol is R and the unit is the ohm, written with the Greek letter omega. One ohm
              allows one ampere to flow when one volt is applied. Every conductor, joint, winding
              and element in an installation has resistance — sometimes deliberately (a heating
              element), sometimes as an unavoidable property to be minimised (a cable run, a busbar
              joint).
            </p>
          </ConceptBlock>

          <ConceptBlock title="What Determines a Conductor's Resistance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Material:</strong> copper and aluminium conduct well (low resistivity);
                nichrome resists deliberately (heating elements); rubber and PVC barely conduct at
                all (insulators)
              </li>
              <li>
                <strong>Length:</strong> resistance is proportional to length — double the cable
                run, double the resistance. This is why long runs suffer more voltage drop
              </li>
              <li>
                <strong>Cross-sectional area:</strong> resistance is inversely proportional to csa —
                a 4 mm squared conductor has half the resistance of a 2 mm squared one over the same
                length. This is why bigger loads need bigger cables
              </li>
              <li>
                <strong>Temperature:</strong> for metals, resistance rises as temperature rises. A
                heating element or a motor winding reads a lower resistance cold than it presents
                when hot and running
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Measuring Resistance — Dead Circuits Only">
            <p>
              An ohmmeter works by passing a small test current from its own battery through the
              component and measuring the result. Two rules follow directly:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The circuit must be isolated and proved dead first.</strong> Any external
                voltage will damage the meter and give a meaningless reading — and measuring
                resistance on a live circuit is dangerous
              </li>
              <li>
                <strong>The component should be disconnected from parallel paths.</strong> If you
                measure a component still wired into a circuit, other components in parallel provide
                alternative paths for the test current and the reading will be lower than the
                component's true resistance
              </li>
            </ul>
            <p>
              Typical readings: a healthy heating element reads its design resistance (tens of
              ohms); a healthy motor winding reads low single-digit ohms to tens of ohms depending
              on size; a closed contact or a length of cable reads a fraction of an ohm; an open
              circuit reads 'OL' (over limit). Learning what 'normal' looks like for the plant you
              maintain is what turns a resistance reading into a diagnosis.
            </p>
          </ConceptBlock>

          <Scenario
            title="Checking an Element Dead"
            situation={
              <>
                A 2 kW, 230 V washer heating element is suspected of failure. With the machine
                isolated and proved dead, what resistance should the element read?
              </>
            }
            whatToDo={
              <>
                <p>From P = V squared / R, rearranged: R = V squared / P</p>
                <p>R = 230 squared / 2000 = 52,900 / 2000</p>
                <p>
                  R = <strong>approximately 26.5 ohms</strong>
                </p>
              </>
            }
            whyItMatters={
              <>
                A reading near 26.5 ohms means the element is electrically sound — look elsewhere
                (thermostat, contactor, supply). A reading of 'OL' means the element has gone open
                circuit and needs replacing. A very low reading suggests a shorted element. One dead
                test, three possible diagnoses.
              </>
            }
          />

          <ConceptBlock title="Unwanted Resistance Is the Silent Fault">
            <p>
              Loose terminals, corroded joints and damaged conductor strands all add resistance
              exactly where there should be almost none. That added resistance drops voltage (V = I
              x R) and generates heat (P = I squared x R) right at the fault. This is why thermal
              imaging of panels finds hot terminals, why connections are torqued to specification,
              and why a small resistance in the wrong place can start a fire while the circuit
              otherwise appears to work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conductors, insulation and loads">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> conductors should have as little resistance as possible;
              insulation should have as much as possible; loads sit in between with their designed
              value. Almost every electrical fault is one of these three quantities ending up in the
              wrong place.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>How the four quantities relate</ContentEyebrow>

          <ConceptBlock title="How the Four Quantities Relate">
            <p>
              Voltage, current and resistance are locked together by Ohm's Law, and power is derived
              from them. Fix any two and the others follow. These four equations are the complete
              toolkit for this section — Section 2.1.2 applies them to full series and parallel
              circuits.
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-base text-elec-yellow">V = I x R</p>
                  <p className="text-sm text-white">
                    Voltage (volts) = Current (amperes) x Resistance (ohms)
                  </p>
                </div>
                <div>
                  <p className="font-mono text-base text-elec-yellow">P = V x I</p>
                  <p className="text-sm text-white">
                    Power (watts) = Voltage (volts) x Current (amperes)
                  </p>
                </div>
                <div>
                  <p className="font-mono text-base text-elec-yellow">
                    P = I² x R &nbsp;|&nbsp; P = V² / R
                  </p>
                  <p className="text-sm text-white">
                    Derived forms — substitute Ohm's Law into P = V x I
                  </p>
                </div>
              </div>
            </div>
          </ConceptBlock>

          <OhmsLawTriangle />

          <Scenario
            title="One Circuit, All Four Quantities"
            situation={
              <>
                A 230 V single-phase circuit supplies a resistive load of 46 ohms. Find the current
                and the power.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Current:</strong> I = V / R = 230 / 46 = <strong>5 A</strong>
                </p>
                <p>
                  <strong>Power:</strong> P = V x I = 230 x 5 = <strong>1150 W</strong>
                </p>
              </>
            }
            whyItMatters={
              <>
                Cross-check with the derived forms: P = I squared x R = 25 x 46 = 1150 W, and P = V
                squared / R = 52,900 / 46 = 1150 W. All three power equations agree — they are the
                same relationship written three ways.
              </>
            }
          />

          <Scenario
            title="From Nameplate to Expected Reading"
            situation={
              <>
                A kettle is rated 3 kW at 230 V. What current should a clamp meter read on its
                supply lead, and roughly what current would a plug-in appliance draw at the 13 A
                limit of a standard plug?
              </>
            }
            whatToDo={
              <p>
                I = P / V = 3000 / 230 = <strong>approximately 13 A</strong>
              </p>
            }
            whyItMatters={
              <>
                A 3 kW appliance sits right at the 13 A plug limit (13 x 230 = 2990 W). This is why
                3 kW is the practical ceiling for plug-connected equipment on a 230 V supply —
                anything larger must be permanently connected on its own circuit.
              </>
            }
          />

          <Scenario
            title="The Overloaded Circuit"
            situation={
              <>
                A 20 A radial circuit keeps tripping in a workshop kitchen. A clamp meter on the
                circuit at the board reads 24 A with the kettle, microwave and heater all running.
              </>
            }
            whatToDo={
              <>
                Add up the loads: 3000 W + 900 W + 1600 W = 5500 W, so I = P / V = 5500 / 230 =
                approximately 24 A — the arithmetic matches the reading, and both exceed the 20 A
                device rating.
              </>
            }
            whyItMatters={
              <>
                Nothing is 'faulty': the circuit is overloaded, and the protective device is doing
                exactly its job. The fix is load management or a new circuit, not a bigger breaker.
              </>
            }
          />

          <ConceptBlock title="Predicting the reading before you take it">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> the skill being built here is{' '}
              <em>predicting the reading before you take it</em>. If you can calculate what the
              meter should say, every measurement becomes a pass/fail test — and a disagreement
              between calculation and meter is where every diagnosis starts.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Power and energy — kW versus kWh</ContentEyebrow>

          <ConceptBlock title="Power and Energy — kW versus kWh">
            <p>
              Power is the rate at which electrical energy is converted into another form — heat,
              light, motion. The quantity symbol is P and the unit is the watt (W); 1000 W is a
              kilowatt (kW). Energy is the total amount converted over time, and for electrical work
              it is billed and recorded in kilowatt-hours (kWh): one kilowatt-hour is one kilowatt
              flowing for one hour.
            </p>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <p className="font-mono text-base text-elec-yellow">
                Energy (kWh) = Power (kW) x Time (hours)
              </p>
              <p className="text-sm text-white">
                Power is a rate (like speed); energy is an amount (like distance)
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Power and energy compared">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      What It Tells You
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Where You See It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Power</td>
                    <td className="border border-white/10 px-3 py-2">W, kW</td>
                    <td className="border border-white/10 px-3 py-2">
                      Rate of energy use at this instant — sizes cables and protective devices
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Nameplates, motor ratings, heater ratings
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Energy</td>
                    <td className="border border-white/10 px-3 py-2">kWh</td>
                    <td className="border border-white/10 px-3 py-2">
                      Total energy used over a period — what the customer pays for
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Electricity meters, bills, energy surveys
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="Running Cost"
            situation={
              <>
                A 3 kW heater is left running for a 4-hour shift. At a unit price of 30p per kWh,
                what does it cost?
              </>
            }
            whatToDo={
              <>
                <p>
                  Energy = 3 kW x 4 h = <strong>12 kWh</strong>
                </p>
                <p>
                  Cost = 12 kWh x £0.30 = <strong>£3.60</strong>
                </p>
              </>
            }
            whyItMatters={
              <>
                Maintenance technicians are increasingly asked to support energy-reduction work.
                Being able to convert a nameplate rating and running hours into kWh and cost is the
                first step in every energy survey.
              </>
            }
          />

          <ConceptBlock title="A Note on Three-Phase Power and Power Factor">
            <p>
              For a three-phase load, total power is P = square root of 3 x V(line) x I(line) x
              power factor. The power factor accounts for the fact that motors and other inductive
              loads draw some current that does no useful work. For now, remember two things:
              three-phase calculations include the square root of 3 (approximately 1.732), and a
              motor's real power in watts is less than the simple V x I product. AC theory and power
              factor are covered fully later in this module.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Power is a rate; energy is an amount">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>Key point:</strong> when someone says a machine 'uses 5 kW', that is power — a
              rate. Only after you multiply by running time do you get energy in kWh. Confusing the
              two is one of the most common errors in reports and energy calculations, and assessors
              look for it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Putting it together on site</ContentEyebrow>

          <ConceptBlock title="Putting It Together on Site">
            <p>
              The four quantities are not four separate topics — every measurement you take on site
              reads one of them, and every diagnosis compares that reading with the value the other
              three predict. Here is the measurement toolkit in one view:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Circuit State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Voltage</td>
                    <td className="border border-white/10 px-3 py-2">
                      Multimeter / two-pole tester (GS38-compliant leads)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      In parallel, across two points
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Live (only when unavoidable, with precautions)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Current</td>
                    <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                    <td className="border border-white/10 px-3 py-2">Around a single conductor</td>
                    <td className="border border-white/10 px-3 py-2">Live, under load</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Current (small)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Multimeter (mA range)</td>
                    <td className="border border-white/10 px-3 py-2">In series with the circuit</td>
                    <td className="border border-white/10 px-3 py-2">
                      Live control/signal circuits
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Resistance</td>
                    <td className="border border-white/10 px-3 py-2">Multimeter (ohms range)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Across the component, ideally disconnected
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Isolated and proved dead — always
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Power</td>
                    <td className="border border-white/10 px-3 py-2">
                      Calculated from V and I (or power/energy meter)
                    </td>
                    <td className="border border-white/10 px-3 py-2">P = V x I</td>
                    <td className="border border-white/10 px-3 py-2">Live, under load</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="A Preview of Series and Parallel">
            <p>
              Real circuits combine components, and the way they combine decides how voltage and
              current distribute. The full treatment comes in Section 2.1.2, but the intuition is
              worth planting now:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>In series</strong> (one path): the same current flows through everything,
                and the supply voltage divides across the components. Two 10 ohm resistors in series
                make 20 ohms
              </li>
              <li>
                <strong>In parallel</strong> (multiple paths): every branch sees the full supply
                voltage, and the currents add. Two 10 ohm resistors in parallel make 5 ohms — more
                paths means less overall opposition
              </li>
              <li>
                <strong>On site:</strong> distribution circuits are parallel (every load gets full
                voltage); safety interlock chains are series (any open device stops the machine);
                and cable resistance acts as an unwanted series element in every circuit
              </li>
            </ul>
          </ConceptBlock>

          <SeriesCircuit />

          <Scenario
            title="Predict, Measure, Compare"
            situation={
              <>
                A 230 V process heater rated 2.3 kW is reported as 'slow to heat'. Walk the
                diagnostic.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Predict:</strong> expected current I = P / V = 2300 / 230 = 10 A
                </p>
                <p>
                  <strong>Measure:</strong> clamp meter reads 5 A with the heater calling for heat
                </p>
                <p>
                  <strong>Compare:</strong> half the expected current at full voltage means roughly
                  double the expected resistance (R = V / I = 230 / 5 = 46 ohms against an expected
                  230 / 10 = 23 ohms)
                </p>
                <p>
                  <strong>Diagnose:</strong> this heater has two elements in parallel — one has
                  failed open circuit, leaving one healthy element carrying on alone at half power
                </p>
                <p>
                  <strong>Confirm:</strong> isolate, prove dead, and measure each element's
                  resistance individually — one reads its design value, the other reads 'OL'
                </p>
              </>
            }
          />

          <ConceptBlock title="Predict-measure-compare">
            <p className="text-[13px] text-elec-yellow/70">
              <strong>ST1426 link:</strong> the maintenance and operations engineering technician
              standard expects you to apply electrical principles to safe, systematic maintenance
              and fault diagnosis. Predict-measure-compare, built on these four quantities, is that
              expectation in its simplest form — and it is the pattern every later section of this
              module builds on.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=kcL2_D33k3o"

            title="Electrical Current Explained — AC, DC, Fuses & Circuit Breakers"

            channel="The Engineering Mindset"

            duration="18:45"

            topic="The four quantities in motion — current, voltage, resistance and what protects them"

            caption="Covers the same ground as this page from first principles, and carries straight on into fuses and breakers, which you meet in 2.4."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltage — V — volt (V); Current — I — ampere (A); Resistance — R — ohm; Power — P — watt (W).',
              'Core equations: V = IR | I = V/R | R = V/I and P = VI | P = I²R | P = V²/R. Energy (kWh) = kW x hours.',
              'UK nominal voltages: 230 V AC single-phase (line to neutral) and 400 V AC three-phase (line to line); 400 / square root of 3 = approximately 230 V.',
              'Voltage is measured in parallel; current with a clamp meter around a single conductor, or in series for small mA ranges; resistance only on isolated, dead circuits.',
              'Key references: BS 7671:2018+A4:2026 — voltage drop: Reg 525.202 and Appendix 4; HSE GS38 — test equipment on LV systems; ST1426 — electrical fundamentals KSBs.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Electrical fundamentals
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section1-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Ohm's Law and Watt's Law
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section1_1;
