/**
 * MOET · Module 5 · Section 1 · Subsection 3 — Temperature and Pressure Sensors
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Structural note: the original placed InlineCheck quickCheckQuestions[3]
 * ("3-wire-rtd") after section 03 (Thermistors and infrared sensors) rather
 * than after section 02 (RTDs), where it topically belongs. That is a quirk
 * of the original page, not something this conversion introduced or should
 * silently "fix" — the question, its position in the reading flow, and its
 * content are preserved exactly as they were.
 *
 * No GS38, thermography ΔT, test-interval or C&G-qualification claims appear
 * on this page. BS 7671 is not cited here.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Temperature and Pressure Sensors - MOET Module 5 Section 1.3';
const DESCRIPTION =
  'Comprehensive guide to temperature and pressure measurement for maintenance technicians: thermocouples, RTDs, thermistors, pressure transmitters, gauge vs absolute pressure and calibration. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'thermocouple-principle',
    question: 'What is the operating principle of a thermocouple?',
    options: [
      'A platinum element changes its electrical resistance with temperature',
      'A semiconductor junction changes resistance exponentially with temperature',
      'A bimetallic strip bends to drive a mechanical pointer with temperature',
      'Two dissimilar metals joined at a junction generate a voltage proportional to the temperature difference (Seebeck effect)',
    ],
    correctIndex: 3,
    explanation:
      'A thermocouple operates on the Seebeck effect: when two dissimilar metals are joined at a junction (the measuring junction) and exposed to a temperature, a small voltage (typically millivolts) is generated proportional to the temperature difference between the measuring junction and the reference (cold) junction. This makes thermocouples self-generating (passive) sensors.',
  },
  {
    id: 'rtd-advantage',
    question:
      'What is the main advantage of a Pt100 RTD over a thermocouple for temperature measurement?',
    options: [
      'RTDs cover a much wider temperature range, up to 1800 degrees C',
      'RTDs offer higher accuracy, better stability and more linear output over their range',
      'RTDs are self-generating and need no excitation current or power supply',
      'RTDs respond far faster to sudden changes in process temperature',
    ],
    correctIndex: 1,
    explanation:
      'Pt100 RTDs (platinum resistance temperature detectors) provide superior accuracy (typically plus or minus 0.1 to 0.5 degrees C), excellent long-term stability and a nearly linear resistance-temperature relationship. Thermocouples cover a wider temperature range and are more robust, but their millivolt output is less accurate and requires cold junction compensation.',
  },
  {
    id: 'gauge-vs-absolute',
    question: 'What is the difference between gauge pressure and absolute pressure?',
    options: [
      'Gauge pressure is measured in bar; absolute pressure is measured in pascals',
      'Gauge pressure is always higher than the equivalent absolute pressure',
      'Gauge pressure is measured relative to atmospheric pressure; absolute pressure is measured relative to a perfect vacuum',
      'Gauge pressure is for liquids only; absolute pressure is for gases only',
    ],
    correctIndex: 2,
    explanation:
      'Gauge pressure uses atmospheric pressure as its zero reference point — a tyre pressure gauge reads 0 when exposed to atmosphere. Absolute pressure uses a perfect vacuum as its zero reference. Absolute pressure = gauge pressure + atmospheric pressure (approximately 1.013 bar at sea level). Absolute pressure measurement is used in vacuum systems and altitude applications.',
  },
  {
    id: '3-wire-rtd',
    question: 'Why are Pt100 RTDs commonly wired in a 3-wire configuration rather than 2-wire?',
    options: [
      'The third wire provides a backup signal path if one conductor fails',
      'The third wire supplies the excitation current that powers the element',
      'The third wire carries the cold junction compensation signal',
      'To allow the measuring instrument to compensate for the resistance of the connecting cable, which would otherwise add error to the temperature reading',
    ],
    correctIndex: 3,
    explanation:
      'In a 2-wire RTD connection, the resistance of the connecting cable is added to the RTD resistance, causing a positive temperature error. A 3-wire configuration uses the third wire to measure the cable resistance and subtract it from the total, compensating for cable length. For highest accuracy, a 4-wire (Kelvin) connection eliminates cable resistance entirely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A Type K thermocouple uses which pair of metals?',
    options: [
      'Iron and constantan (iron / copper-nickel)',
      'Chromel and alumel (nickel-chromium / nickel-aluminium)',
      'Copper and constantan (copper / copper-nickel)',
      'Platinum and platinum-rhodium',
    ],
    correctAnswer: 1,
    explanation:
      'Type K (chromel-alumel) is the most widely used thermocouple in industrial maintenance. It covers -200 to +1250 degrees C and is suitable for most general-purpose applications. Type J (iron-constantan) is also common but has a lower maximum temperature. Type T (copper-constantan) is used for low-temperature work.',
  },
  {
    id: 2,
    question:
      'A Pt100 RTD has a resistance of 100 ohms at 0 degrees C. At 100 degrees C, its resistance is approximately:',
    options: ['200 ohms', '100 ohms', '138.5 ohms', '1000 ohms'],
    correctAnswer: 2,
    explanation:
      'Platinum has a temperature coefficient of approximately 0.385 ohms per degree C for a Pt100 element. At 100 degrees C: R = 100 + (0.385 x 100) = 138.5 ohms. This near-linear relationship is one of the key advantages of platinum RTDs. A Pt1000 element has 1000 ohms at 0 degrees C and 1385 ohms at 100 degrees C.',
  },
  {
    id: 3,
    question:
      'Cold junction compensation in a thermocouple measurement system is necessary because:',
    options: [
      'The thermocouple output drifts with the age of the measuring instrument and must be re-zeroed',
      'The connecting cable adds resistance that must be subtracted from the reading',
      'The cold junction must be physically cooled to 0 degrees C for the sensor to work',
      'The thermocouple voltage is proportional to the temperature DIFFERENCE between the hot and cold junctions, so the cold junction temperature must be known to calculate the actual measurement temperature',
    ],
    correctAnswer: 3,
    explanation:
      'A thermocouple generates a voltage proportional to the temperature difference between its two junctions. To determine the actual (hot junction) temperature, the system must know the cold junction temperature and add the equivalent voltage. Modern transmitters and PLC input cards perform this automatically using an internal temperature sensor at the termination point.',
  },
  {
    id: 4,
    question: 'A thermistor differs from a Pt100 RTD in that:',
    options: [
      'A thermistor has a highly non-linear resistance-temperature characteristic and a much larger change in resistance per degree, making it very sensitive but over a narrow range',
      'A thermistor uses a platinum element while a Pt100 uses a semiconductor',
      'A thermistor generates its own voltage and needs no excitation current',
      'A thermistor has a perfectly linear output across the full -200 to +850 degrees C range',
    ],
    correctAnswer: 0,
    explanation:
      'Thermistors are semiconductor devices with a large resistance change per degree C (typically 10 times that of a Pt100), making them very sensitive. However, their response is highly non-linear (exponential), limiting them to narrow temperature ranges where linearisation is applied. NTC (negative temperature coefficient) types decrease in resistance as temperature rises; PTC types increase.',
  },
  {
    id: 5,
    question:
      'A pressure transmitter with a range of 0-10 bar gauge is reading 6.5 bar. The corresponding 4-20 mA output should be:',
    options: ['6.5 mA', '14.4 mA', '16.0 mA', '10.4 mA'],
    correctAnswer: 1,
    explanation:
      'The percentage of range = (6.5 / 10) x 100 = 65 %. The 4-20 mA output = 4 + (0.65 x 16) = 4 + 10.4 = 14.4 mA. This calculation is fundamental to verifying transmitter calibration: measure the loop current, calculate the expected pressure, and compare with an independent reference gauge.',
  },
  {
    id: 6,
    question:
      'Which pressure sensing element is most commonly used in modern industrial pressure transmitters?',
    options: [
      'A Bourdon tube driving a mechanical pointer',
      'A mercury column in a glass manometer',
      'Piezoresistive silicon strain gauge on a diaphragm',
      'A bimetallic strip linked to a pressure dial',
    ],
    correctAnswer: 2,
    explanation:
      'Modern electronic pressure transmitters predominantly use piezoresistive strain gauges on a silicon or stainless steel diaphragm. The diaphragm flexes under pressure, and the strain gauges (arranged in a Wheatstone bridge) change resistance proportionally. This provides a direct electrical output, excellent accuracy and fast response. Bourdon tubes are still used in mechanical gauges.',
  },
  {
    id: 7,
    question:
      'A maintenance technician suspects a Pt100 sensor has failed. The resistance measured across the sensor terminals reads 0 ohms. This most likely indicates:',
    options: [
      'The sensor is reading exactly 0 degrees C',
      'Normal operation — the sensor is warming up',
      'The sensor is reading a very low temperature',
      'A short circuit in the sensor element or wiring',
    ],
    correctAnswer: 3,
    explanation:
      'A Pt100 reads 100 ohms at 0 degrees C, not 0 ohms. A reading of 0 ohms indicates a short circuit — either the sensor element has failed with an internal short, or there is a wiring fault (e.g., the signal wires are shorted together at a terminal). An open circuit (infinite resistance) would indicate a broken element or disconnected wire.',
  },
  {
    id: 8,
    question: 'Differential pressure measurement is used in industrial processes to:',
    options: [
      'Measure flow rate (using an orifice plate), level in sealed vessels, and filter condition',
      'Measure absolute pressure referenced to a perfect vacuum',
      'Measure the surface temperature of pipework without contact',
      'Measure the rotational speed of a pump or fan shaft',
    ],
    correctAnswer: 0,
    explanation:
      'Differential pressure (DP) is the difference between two pressure points. In flow measurement, a DP transmitter measures the pressure drop across an orifice plate (flow is proportional to the square root of DP). In level measurement, DP between the bottom and top of a sealed vessel gives the liquid level. Filter condition is assessed by measuring DP across the filter element — rising DP indicates blockage.',
  },
  {
    id: 9,
    question: 'Thermocouple compensating cable is necessary because:',
    options: [
      'It carries a higher current than copper cable to boost the millivolt signal',
      'The cable must have the same thermoelectric properties as the thermocouple to avoid introducing additional junctions that would create measurement errors',
      'It provides the screened protection needed to reject electrical interference on the loop',
      'It supplies the excitation voltage required to energise the thermocouple junction',
    ],
    correctAnswer: 1,
    explanation:
      'When standard copper cable is connected to thermocouple wire, additional thermoelectric junctions are created at the connection points. If these junctions are at different temperatures, they generate unwanted voltages that add error. Compensating cable uses materials with matching thermoelectric properties (or the same materials) to extend the thermocouple circuit without introducing errors.',
  },
  {
    id: 10,
    question: 'An infrared (non-contact) temperature sensor measures temperature by:',
    options: [
      'Touching a probe to the surface and reading the change in resistance',
      'Emitting an infrared beam and timing how long the reflection takes to return',
      'Detecting the infrared radiation naturally emitted by the target surface, which is proportional to its temperature',
      'Measuring the change in air pressure close to the heated surface',
    ],
    correctAnswer: 2,
    explanation:
      "All objects above absolute zero emit infrared radiation. The intensity and spectral distribution of this radiation is a function of the object's temperature (Stefan-Boltzmann law). An infrared sensor focuses this radiation onto a detector element to determine the surface temperature without contact. Emissivity of the target surface must be known or measured for accurate readings.",
  },
  {
    id: 11,
    question:
      'A process requires pressure measurement in a system that operates under vacuum (below atmospheric pressure). Which pressure measurement type is needed?',
    options: [
      'A standard gauge pressure transmitter reading positive pressure only',
      'A differential pressure transmitter across an orifice plate',
      'A sealed gauge transmitter referenced to one bar at sea level',
      'Absolute pressure or compound gauge (vacuum to positive range)',
    ],
    correctAnswer: 3,
    explanation:
      'A standard gauge pressure transmitter reads zero at atmospheric pressure and only measures positive pressures above atmosphere. For vacuum measurement, you need either an absolute pressure transmitter (zero reference is vacuum) or a compound gauge transmitter that can measure both vacuum (negative gauge) and positive pressure ranges.',
  },
  {
    id: 12,
    question: 'When calibrating a temperature transmitter, the reference standard should be:',
    options: [
      'A calibrated reference thermometer or dry-block calibrator traceable to national standards',
      'Another uncalibrated transmitter of the same model on the same process',
      "The transmitter's own displayed reading taken as the true value",
      'A handheld infrared thermometer pointed at the sensor housing',
    ],
    correctAnswer: 0,
    explanation:
      'Calibration requires a reference standard of higher accuracy than the instrument being calibrated — typically 4:1 accuracy ratio. A calibrated reference thermometer (Pt100 or thermocouple) or a dry-block calibrator with a traceable calibration certificate provides the known temperature input. The calibration chain must be traceable to national standards (UKAS in the UK).',
  },
];

const faqs = [
  {
    question: 'Which is better — a thermocouple or an RTD?',
    answer:
      "Neither is universally 'better' — the choice depends on the application. RTDs (Pt100) offer higher accuracy (plus or minus 0.1 degrees C vs plus or minus 1-2 degrees C), better stability and near-linear output, but are limited to about 600 degrees C and are more fragile. Thermocouples are cheaper, more robust, faster responding and can measure up to 1800 degrees C, but with lower accuracy and the need for cold junction compensation.",
  },
  {
    question: 'What does Pt100 mean?',
    answer:
      "Pt100 means a platinum (Pt) resistance temperature detector with a resistance of 100 ohms at 0 degrees C. The 'Pt' denotes the platinum sensing element, and '100' is the resistance at 0 degrees C. Pt1000 elements have 1000 ohms at 0 degrees C and offer better resolution for long cable runs because the cable resistance is a smaller proportion of the total.",
  },
  {
    question: 'How do I identify which type of thermocouple is installed?',
    answer:
      'Thermocouple type can be identified by the wire and connector colours (BS EN 60584-3): Type K = green sheath; Type J = black sheath; Type T = brown sheath. The compensating cable and miniature connectors follow the same colour coding. If unsure, measure the resistance of the thermocouple — each type has a characteristic resistance range based on its wire materials and length.',
  },
  {
    question: 'Why does my pressure reading drift over time?',
    answer:
      'Pressure transmitter drift can be caused by: diaphragm fatigue from pressure cycling; temperature effects on the sensing element; moisture ingress; blocked or partially blocked impulse lines; process material coating the diaphragm; or electronic component ageing. Regular calibration checks (typically annually, or more frequently for safety-critical instruments) will identify drift before it causes process issues.',
  },
  {
    question: 'What is a thermowell and why is it used?',
    answer:
      'A thermowell is a closed-end metal tube inserted into the process, into which the temperature sensor is placed. It protects the sensor from process pressure, flow velocity, corrosive media and mechanical damage, and allows sensor replacement without draining or shutting down the process. The trade-off is slower response time due to the thermal mass of the thermowell — typically 10-60 seconds T63 vs under 1 second for a bare sensor.',
  },
];

const MOETModule5Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.1 · Subsection 3"
        title="Temperature and Pressure Sensors"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Thermocouples, RTDs, thermistors, pressure transmitters and calibration fundamentals —
            the temperature and pressure measurement every plant depends on.
          </p>

          <TLDR
            points={[
              'Thermocouples: Two dissimilar metals, Seebeck effect, millivolt output, wide range.',
              'RTDs (Pt100): Platinum resistance, high accuracy, 3/4-wire compensation.',
              'Pressure: Gauge (relative to atmosphere), absolute (relative to vacuum), differential.',
              'Calibration: Traceable standards, 4:1 accuracy ratio, regular intervals.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operating principles of thermocouples, RTDs and thermistors',
              'Compare thermocouple types (K, J, T) and their temperature ranges',
              'Describe 2-wire, 3-wire and 4-wire RTD configurations and cable compensation',
              'Distinguish between gauge, absolute and differential pressure measurement',
              'Identify piezoresistive, capacitive and mechanical pressure sensing elements',
              'Apply calibration principles using traceable reference standards',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Measure RTD resistance, thermocouple millivolts,
                loop current.
              </li>
              <li>
                <strong>Replacement:</strong> Match sensor type, range, wiring config and process
                connection.
              </li>
              <li>
                <strong>Commissioning:</strong> Verify output against known temperature/pressure
                reference.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to instrumentation knowledge and maintenance
                competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Thermocouples</ContentEyebrow>

          <ConceptBlock title="The most widely used temperature sensor in industry">
            <p>
              Thermocouples are the most widely used temperature sensors in industry. They are
              simple, robust, cover an enormous temperature range (-270 to +1800 degrees C depending
              on type), and are self-generating — they produce their own voltage without an external
              power supply. Every maintenance technician will encounter thermocouples in heating
              systems, furnaces, boilers, process ovens, HVAC systems and a vast range of industrial
              equipment.
            </p>
            <p>
              The operating principle is the Seebeck effect, discovered by Thomas Johann Seebeck in
              1821. When two dissimilar metals are joined at a point (the measuring or
              &quot;hot&quot; junction) and exposed to a temperature, a small voltage is generated.
              This voltage is proportional to the temperature difference between the measuring
              junction and the reference (&quot;cold&quot;) junction where the wires connect to the
              measuring instrument.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common thermocouple types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Metals</th>
                    <th className="py-2 pr-4 font-medium text-white">Range</th>
                    <th className="py-2 pr-4 font-medium text-white">BS colour</th>
                    <th className="py-2 font-medium text-white">Typical use</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">K</td>
                    <td className="py-2 pr-4">Chromel / Alumel</td>
                    <td className="py-2 pr-4">-200 to +1250 degrees C</td>
                    <td className="py-2 pr-4">Green</td>
                    <td className="py-2">General purpose, furnaces, ovens</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">J</td>
                    <td className="py-2 pr-4">Iron / Constantan</td>
                    <td className="py-2 pr-4">-40 to +750 degrees C</td>
                    <td className="py-2 pr-4">Black</td>
                    <td className="py-2">Older installations, plastics processing</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">T</td>
                    <td className="py-2 pr-4">Copper / Constantan</td>
                    <td className="py-2 pr-4">-200 to +350 degrees C</td>
                    <td className="py-2 pr-4">Brown</td>
                    <td className="py-2">Low temperature, food, HVAC</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">N</td>
                    <td className="py-2 pr-4">Nicrosil / Nisil</td>
                    <td className="py-2 pr-4">-270 to +1300 degrees C</td>
                    <td className="py-2 pr-4">Pink</td>
                    <td className="py-2">High stability, replacing Type K</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">R/S</td>
                    <td className="py-2 pr-4">Platinum / Pt-Rhodium</td>
                    <td className="py-2 pr-4">0 to +1600 degrees C</td>
                    <td className="py-2 pr-4">Orange (R)</td>
                    <td className="py-2">High temperature, glass, ceramics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Cold junction compensation">
            <p>
              Because the thermocouple measures temperature difference, the system must know the
              cold junction temperature to calculate the actual measurement. Modern instruments use
              automatic cold junction compensation (CJC):
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                A precision temperature sensor (thermistor or RTD) at the instrument terminals
                measures the cold junction temperature.
              </li>
              <li>
                The instrument adds the equivalent voltage for the cold junction temperature to the
                measured thermocouple voltage.
              </li>
              <li>
                The total voltage is converted to temperature using the type-specific look-up table
                (IEC 60584).
              </li>
              <li>
                Incorrect thermocouple type selection in the instrument configuration will give
                wrong readings.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When fault-finding a thermocouple circuit, always
              use the correct compensating cable or extension wire for the thermocouple type. Using
              standard copper wire creates additional thermoelectric junctions that introduce
              measurement errors. The error increases as the temperature at the junction between the
              copper and thermocouple wire differs from ambient.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Resistance Temperature Detectors (RTDs)</ContentEyebrow>

          <ConceptBlock title="A predictable, repeatable change in resistance">
            <p>
              Resistance temperature detectors exploit the predictable change in electrical
              resistance of a metal wire with temperature. Platinum is the preferred material
              because it has a stable, repeatable and nearly linear resistance-temperature
              relationship, excellent chemical inertness and high purity availability. The Pt100 is
              the industry standard — 100 ohms at 0 degrees C with a temperature coefficient of
              approximately 0.385 ohms per degree C.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RTD specifications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pt100:</strong> 100 ohms at 0 degrees C — the most common industrial RTD
                standard.
              </li>
              <li>
                <strong>Pt1000:</strong> 1000 ohms at 0 degrees C — better for long cable runs
                (cable resistance is smaller proportion of total).
              </li>
              <li>
                <strong>Temperature range:</strong> -200 to +600 degrees C (some to +850 degrees C).
              </li>
              <li>
                <strong>Accuracy classes:</strong> IEC 60751 defines Class A (plus or minus 0.15 +
                0.002 x T) and Class B (plus or minus 0.3 + 0.005 x T).
              </li>
              <li>
                <strong>Alpha value:</strong> 0.00385 ohms/ohm/degrees C (European standard
                DIN/IEC).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="2-wire connection">
            <p>
              The simplest but least accurate method. Both lead wires carry the measurement current
              and their resistance is added to the RTD resistance. Acceptable only for short cable
              runs (under 3 m) or where accuracy requirements are low (plus or minus 2 degrees C).
            </p>
          </ConceptBlock>

          <ConceptBlock title="3-wire connection">
            <p>
              The most common industrial configuration. The third wire allows the measuring
              instrument to measure the cable resistance and compensate for it. This assumes all
              three wires have equal resistance (same length, same gauge, same temperature).
              Accuracy is typically plus or minus 0.5 degrees C with reasonable cable lengths.
            </p>
          </ConceptBlock>

          <ConceptBlock title="4-wire (Kelvin) connection">
            <p>
              The most accurate method — two wires carry the excitation current and two separate
              wires measure the voltage across the RTD element. Cable resistance is completely
              eliminated from the measurement. Used in laboratory instruments and precision
              applications where accuracy better than plus or minus 0.1 degrees C is required.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Practical fault-finding: testing a Pt100">
            <p>
              To test a Pt100 sensor, disconnect it from the transmitter and measure the resistance
              across the element terminals. At room temperature (20 degrees C), a healthy Pt100
              should read approximately 107.8 ohms. An open circuit (infinite resistance) indicates
              a broken element or wire. A very low reading (near 0 ohms) indicates a short circuit.
              Compare the reading with the Pt100 resistance table to verify the indicated
              temperature is reasonable.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Thermistors and infrared temperature sensors</ContentEyebrow>

          <ConceptBlock title="Beyond thermocouples and RTDs">
            <p>
              Beyond thermocouples and RTDs, two other temperature sensing technologies are commonly
              encountered in electrical maintenance: thermistors (used in motor winding protection
              and HVAC) and infrared (non-contact) temperature sensors (used for surface temperature
              measurement and rotating equipment monitoring).
            </p>
          </ConceptBlock>

          <ConceptBlock title="NTC thermistors">
            <p>Negative Temperature Coefficient — resistance decreases as temperature increases.</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Very high sensitivity (large resistance change per degree).</li>
              <li>Non-linear response — exponential characteristic.</li>
              <li>Narrow useful range (typically -40 to +150 degrees C).</li>
              <li>Used in HVAC, automotive, consumer electronics.</li>
              <li>Low cost, fast response, small size.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PTC thermistors">
            <p>
              Positive Temperature Coefficient — resistance increases sharply at a defined trip
              temperature.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Used as over-temperature protection in motor windings.</li>
              <li>Three PTC sensors embedded in stator windings (one per phase).</li>
              <li>Connected to a thermistor relay (motor protection unit).</li>
              <li>Sharp resistance transition at the rated temperature (e.g. 155 degrees C).</li>
              <li>Provides binary trip/no-trip rather than proportional measurement.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Infrared (non-contact) temperature sensors">
            <p>
              Infrared temperature sensors measure the thermal radiation emitted by a surface
              without physical contact. They are essential for measuring rotating equipment,
              high-voltage components, hot surfaces and objects that are moving or inaccessible.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spot pyrometers:</strong> Handheld instruments for maintenance checks —
                point, trigger, read.
              </li>
              <li>
                <strong>Fixed sensors:</strong> Process-mounted for continuous monitoring.
              </li>
              <li>
                <strong>Thermal cameras:</strong> Create a temperature map of a surface — used in
                predictive maintenance for detecting hot joints, overloaded connections and
                insulation faults.
              </li>
              <li>
                <strong>Emissivity:</strong> Must be set correctly for the target surface — shiny
                metals have low emissivity (0.1-0.3) and will read incorrectly unless compensated.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When using a handheld IR thermometer, be aware of
              the distance-to-spot ratio (D:S). A sensor with D:S of 12:1 measures a spot 1 cm in
              diameter at 12 cm distance. At 1 m, the spot is approximately 8 cm. If the target is
              smaller than the measurement spot, the reading will include surrounding surfaces and
              be inaccurate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Pressure measurement</ContentEyebrow>

          <ConceptBlock title="Three references, three applications">
            <p>
              Pressure measurement is fundamental to industrial process control, building services
              and plant maintenance. From monitoring boiler steam pressure to verifying compressed
              air systems, maintenance technicians must understand pressure sensing principles,
              measurement types and the instruments used. The three primary pressure measurement
              references — gauge, absolute and differential — each serve different applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pressure measurement types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gauge pressure (barg):</strong> Measured relative to atmospheric pressure. A
                tyre gauge reads 0 when exposed to atmosphere. Most common in industrial
                applications.
              </li>
              <li>
                <strong>Absolute pressure (bara):</strong> Measured relative to a perfect vacuum.
                Atmospheric pressure = approximately 1.013 bara. Used in vacuum systems,
                meteorology, altitude measurement.
              </li>
              <li>
                <strong>Differential pressure (delta P):</strong> The difference between two
                pressure points. Used for flow measurement (orifice plates), filter monitoring and
                level measurement in sealed vessels.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Piezoresistive (strain gauge on diaphragm)">
            <p>
              The dominant technology in modern electronic transmitters. Strain gauges bonded to a
              diaphragm change resistance as pressure deflects the diaphragm. Four gauges in a
              Wheatstone bridge provide a proportional voltage output. Typical accuracy: plus or
              minus 0.1 to 0.5 % of span.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Capacitive">
            <p>
              Pressure deflects a diaphragm between two capacitor plates, changing the capacitance.
              Used in high-accuracy differential pressure transmitters. Rosemount (Emerson)
              capacitive DP cells are the industry benchmark for flow and level measurement.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bourdon tube (mechanical)">
            <p>
              A curved metal tube straightens under pressure, driving a pointer via a mechanical
              linkage. Still widely used in local pressure gauges. Simple, reliable, no power
              required, but no electrical output for remote monitoring.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pressure units conversion">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Unit</th>
                    <th className="py-2 pr-4 font-medium text-white">1 bar equals</th>
                    <th className="py-2 font-medium text-white">Common use</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">bar</td>
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2">European industry standard</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">kPa</td>
                    <td className="py-2 pr-4">100</td>
                    <td className="py-2">SI unit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">psi</td>
                    <td className="py-2 pr-4">14.504</td>
                    <td className="py-2">Imperial (US, older UK equipment)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">mbar</td>
                    <td className="py-2 pr-4">1000</td>
                    <td className="py-2">Low pressure, HVAC, gas systems</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">mmH2O</td>
                    <td className="py-2 pr-4">10,197</td>
                    <td className="py-2">Duct pressure, filter differential</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> When specifying or replacing a pressure transmitter,
              always confirm the pressure type (gauge, absolute or differential), the range, the
              process connection (thread size and type), wetted materials compatibility with the
              process media, and the output signal. A transmitter specified for gauge pressure will
              not read correctly in a vacuum application.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Calibration principles</ContentEyebrow>

          <ConceptBlock title="Comparing against a known, traceable reference">
            <p>
              Calibration is the process of comparing an instrument&apos;s readings against a known,
              traceable reference standard and adjusting if necessary to bring it within
              specification. For temperature and pressure sensors, regular calibration is essential
              to maintain measurement accuracy, ensure process quality and meet safety requirements.
              Poorly calibrated instruments can lead to product defects, energy waste, equipment
              damage or safety incidents.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Traceability:</strong> The reference standard must be traceable through an
                unbroken chain to national standards (UKAS in the UK).
              </li>
              <li>
                <strong>Accuracy ratio:</strong> The reference should be at least 4 times more
                accurate than the instrument being calibrated (4:1 TUR — Test Uncertainty Ratio).
              </li>
              <li>
                <strong>As-found / as-left:</strong> Record the readings before and after adjustment
                to track drift over time.
              </li>
              <li>
                <strong>Five-point check:</strong> Calibrate at 0 %, 25 %, 50 %, 75 % and 100 % of
                range, both ascending and descending.
              </li>
              <li>
                <strong>Calibration certificate:</strong> Document the results, reference standard
                used, environmental conditions and pass/fail status.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Temperature calibration equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Dry-block calibrator (portable, field use).</li>
              <li>Liquid bath calibrator (higher accuracy).</li>
              <li>Reference thermometer (Pt100 or SPRT).</li>
              <li>Ice point reference (0 degrees C check).</li>
              <li>Decade resistance box (for simulating RTDs).</li>
              <li>mV source (for simulating thermocouples).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pressure calibration equipment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Dead-weight tester (primary standard).</li>
              <li>Pneumatic hand pump with reference gauge.</li>
              <li>Digital pressure calibrator (portable).</li>
              <li>Pressure comparator.</li>
              <li>mA source/measure (for loop simulation).</li>
              <li>HART communicator (for smart transmitters).</li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians should be able to carry out basic calibration
              checks using portable calibration equipment, interpret calibration certificates, and
              understand when an instrument requires recalibration. Full calibration and adjustment
              of safety-critical instruments may require specialist instrumentation personnel.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=v7NUi88Lxi8"

            title="How Thermocouples Work"

            channel="The Engineering Mindset"

            duration="9:05"

            topic="The Seebeck effect, cold-junction compensation and thermocouple types"

            caption="Explains why a thermocouple needs a reference junction at all — the thing that catches people out when a reading drifts with ambient temperature."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Thermocouples generate a millivolt signal via the Seebeck effect and need cold junction compensation — they cover a wide range but are less accurate than RTDs.',
              'The Pt100 is 100 ohms at 0 degrees C, rising by about 0.385 ohms per degree C; Pt1000 is ten times that, which helps over long cable runs.',
              '2-wire RTD wiring adds cable resistance to the reading; 3-wire compensates for it; 4-wire (Kelvin) eliminates it entirely.',
              'NTC thermistors are highly sensitive but non-linear and narrow-range; PTC thermistors give a sharp trip at a set temperature and are used for motor winding protection.',
              'Infrared sensors measure emitted radiation, not reflected light — emissivity must be set for the target surface, and the distance-to-spot ratio limits how far away you can measure a small target.',
              'Gauge pressure is referenced to atmosphere, absolute pressure to a perfect vacuum, and differential pressure is the difference between two points — used for flow, level and filter condition.',
              'Piezoresistive strain gauges on a diaphragm are the dominant modern pressure-sensing technology; Bourdon tubes remain common in local mechanical gauges with no electrical output.',
              'Calibration needs a traceable reference at least 4 times more accurate than the instrument (4:1 TUR), checked at five points, both ascending and descending, with as-found/as-left readings recorded.',
              'Always confirm a replacement pressure transmitter matches on pressure type, range, process connection and wetted materials — a gauge-pressure transmitter will not read correctly under vacuum.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Proximity and Position Sensors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Flow and Level Measurement
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section1_3;
