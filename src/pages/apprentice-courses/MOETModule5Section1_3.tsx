import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Temperature and Pressure Sensors - MOET Module 5 Section 1.3";
const DESCRIPTION = "Comprehensive guide to temperature and pressure measurement for maintenance technicians: thermocouples, RTDs, thermistors, pressure transmitters, gauge vs absolute pressure and calibration. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "thermocouple-principle",
    question: "What is the operating principle of a thermocouple?",
    options: [
      "The resistance of a platinum wire changes with temperature",
      "Two dissimilar metals joined at a junction generate a voltage proportional to the temperature difference (Seebeck effect)",
      "A semiconductor material changes capacitance with temperature",
      "A piezoelectric crystal vibrates at a frequency dependent on temperature"
    ],
    correctIndex: 1,
    explanation: "A thermocouple operates on the Seebeck effect: when two dissimilar metals are joined at a junction (the measuring junction) and exposed to a temperature, a small voltage (typically millivolts) is generated proportional to the temperature difference between the measuring junction and the reference (cold) junction. This makes thermocouples self-generating (passive) sensors."
  },
  {
    id: "rtd-advantage",
    question: "What is the main advantage of a Pt100 RTD over a thermocouple for temperature measurement?",
    options: [
      "RTDs are cheaper than thermocouples",
      "RTDs can measure higher temperatures than thermocouples",
      "RTDs offer higher accuracy, better stability and more linear output over their range",
      "RTDs do not require any signal conditioning"
    ],
    correctIndex: 2,
    explanation: "Pt100 RTDs (platinum resistance temperature detectors) provide superior accuracy (typically plus or minus 0.1 to 0.5 degrees C), excellent long-term stability and a nearly linear resistance-temperature relationship. Thermocouples cover a wider temperature range and are more robust, but their millivolt output is less accurate and requires cold junction compensation."
  },
  {
    id: "gauge-vs-absolute",
    question: "What is the difference between gauge pressure and absolute pressure?",
    options: [
      "They are different units for the same measurement",
      "Gauge pressure is measured relative to atmospheric pressure; absolute pressure is measured relative to a perfect vacuum",
      "Gauge pressure is always higher than absolute pressure",
      "Absolute pressure can only be measured with mercury manometers"
    ],
    correctIndex: 1,
    explanation: "Gauge pressure uses atmospheric pressure as its zero reference point — a tyre pressure gauge reads 0 when exposed to atmosphere. Absolute pressure uses a perfect vacuum as its zero reference. Absolute pressure = gauge pressure + atmospheric pressure (approximately 1.013 bar at sea level). Absolute pressure measurement is used in vacuum systems and altitude applications."
  },
  {
    id: "3-wire-rtd",
    question: "Why are Pt100 RTDs commonly wired in a 3-wire configuration rather than 2-wire?",
    options: [
      "To provide a redundant connection in case one wire breaks",
      "To allow the measuring instrument to compensate for the resistance of the connecting cable, which would otherwise add error to the temperature reading",
      "To enable simultaneous reading by two different instruments",
      "To comply with BS 7671 requirements for screened cables"
    ],
    correctIndex: 1,
    explanation: "In a 2-wire RTD connection, the resistance of the connecting cable is added to the RTD resistance, causing a positive temperature error. A 3-wire configuration uses the third wire to measure the cable resistance and subtract it from the total, compensating for cable length. For highest accuracy, a 4-wire (Kelvin) connection eliminates cable resistance entirely."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A Type K thermocouple uses which pair of metals?",
    options: [
      "Copper and constantan",
      "Chromel and alumel (nickel-chromium / nickel-aluminium)",
      "Platinum and platinum-rhodium",
      "Iron and constantan"
    ],
    correctAnswer: 1,
    explanation: "Type K (chromel-alumel) is the most widely used thermocouple in industrial maintenance. It covers -200 to +1250 degrees C and is suitable for most general-purpose applications. Type J (iron-constantan) is also common but has a lower maximum temperature. Type T (copper-constantan) is used for low-temperature work."
  },
  {
    id: 2,
    question: "A Pt100 RTD has a resistance of 100 ohms at 0 degrees C. At 100 degrees C, its resistance is approximately:",
    options: [
      "100 ohms",
      "138.5 ohms",
      "200 ohms",
      "1000 ohms"
    ],
    correctAnswer: 1,
    explanation: "Platinum has a temperature coefficient of approximately 0.385 ohms per degree C for a Pt100 element. At 100 degrees C: R = 100 + (0.385 x 100) = 138.5 ohms. This near-linear relationship is one of the key advantages of platinum RTDs. A Pt1000 element has 1000 ohms at 0 degrees C and 1385 ohms at 100 degrees C."
  },
  {
    id: 3,
    question: "Cold junction compensation in a thermocouple measurement system is necessary because:",
    options: [
      "Thermocouples only work in cold environments",
      "The thermocouple voltage is proportional to the temperature DIFFERENCE between the hot and cold junctions, so the cold junction temperature must be known to calculate the actual measurement temperature",
      "The thermocouple wires become brittle at low temperatures",
      "The PLC cannot process millivolt signals without compensation"
    ],
    correctAnswer: 1,
    explanation: "A thermocouple generates a voltage proportional to the temperature difference between its two junctions. To determine the actual (hot junction) temperature, the system must know the cold junction temperature and add the equivalent voltage. Modern transmitters and PLC input cards perform this automatically using an internal temperature sensor at the termination point."
  },
  {
    id: 4,
    question: "A thermistor differs from a Pt100 RTD in that:",
    options: [
      "A thermistor is made of platinum; an RTD is made of semiconductor material",
      "A thermistor has a highly non-linear resistance-temperature characteristic and a much larger change in resistance per degree, making it very sensitive but over a narrow range",
      "A thermistor is more accurate than an RTD",
      "A thermistor can measure higher temperatures than an RTD"
    ],
    correctAnswer: 1,
    explanation: "Thermistors are semiconductor devices with a large resistance change per degree C (typically 10 times that of a Pt100), making them very sensitive. However, their response is highly non-linear (exponential), limiting them to narrow temperature ranges where linearisation is applied. NTC (negative temperature coefficient) types decrease in resistance as temperature rises; PTC types increase."
  },
  {
    id: 5,
    question: "A pressure transmitter with a range of 0-10 bar gauge is reading 6.5 bar. The corresponding 4-20 mA output should be:",
    options: [
      "6.5 mA",
      "14.4 mA",
      "10.4 mA",
      "16.0 mA"
    ],
    correctAnswer: 1,
    explanation: "The percentage of range = (6.5 / 10) x 100 = 65 %. The 4-20 mA output = 4 + (0.65 x 16) = 4 + 10.4 = 14.4 mA. This calculation is fundamental to verifying transmitter calibration: measure the loop current, calculate the expected pressure, and compare with an independent reference gauge."
  },
  {
    id: 6,
    question: "Which pressure sensing element is most commonly used in modern industrial pressure transmitters?",
    options: [
      "Bourdon tube",
      "Piezoresistive silicon strain gauge on a diaphragm",
      "Mercury manometer",
      "Bellows element"
    ],
    correctAnswer: 1,
    explanation: "Modern electronic pressure transmitters predominantly use piezoresistive strain gauges on a silicon or stainless steel diaphragm. The diaphragm flexes under pressure, and the strain gauges (arranged in a Wheatstone bridge) change resistance proportionally. This provides a direct electrical output, excellent accuracy and fast response. Bourdon tubes are still used in mechanical gauges."
  },
  {
    id: 7,
    question: "A maintenance technician suspects a Pt100 sensor has failed. The resistance measured across the sensor terminals reads 0 ohms. This most likely indicates:",
    options: [
      "The sensor is reading exactly 0 degrees C",
      "A short circuit in the sensor element or wiring",
      "The sensor is reading a very low temperature",
      "Normal operation — the sensor is warming up"
    ],
    correctAnswer: 1,
    explanation: "A Pt100 reads 100 ohms at 0 degrees C, not 0 ohms. A reading of 0 ohms indicates a short circuit — either the sensor element has failed with an internal short, or there is a wiring fault (e.g., the signal wires are shorted together at a terminal). An open circuit (infinite resistance) would indicate a broken element or disconnected wire."
  },
  {
    id: 8,
    question: "Differential pressure measurement is used in industrial processes to:",
    options: [
      "Measure the difference between two temperature readings",
      "Measure flow rate (using an orifice plate), level in sealed vessels, and filter condition",
      "Measure the speed of pressure changes",
      "Calibrate gauge pressure transmitters"
    ],
    correctAnswer: 1,
    explanation: "Differential pressure (DP) is the difference between two pressure points. In flow measurement, a DP transmitter measures the pressure drop across an orifice plate (flow is proportional to the square root of DP). In level measurement, DP between the bottom and top of a sealed vessel gives the liquid level. Filter condition is assessed by measuring DP across the filter element — rising DP indicates blockage."
  },
  {
    id: 9,
    question: "Thermocouple compensating cable is necessary because:",
    options: [
      "Standard copper cable would be too expensive for the long runs involved",
      "The cable must have the same thermoelectric properties as the thermocouple to avoid introducing additional junctions that would create measurement errors",
      "Thermocouple signals are too weak for standard cable",
      "It provides electromagnetic screening for the millivolt signal"
    ],
    correctAnswer: 1,
    explanation: "When standard copper cable is connected to thermocouple wire, additional thermoelectric junctions are created at the connection points. If these junctions are at different temperatures, they generate unwanted voltages that add error. Compensating cable uses materials with matching thermoelectric properties (or the same materials) to extend the thermocouple circuit without introducing errors."
  },
  {
    id: 10,
    question: "An infrared (non-contact) temperature sensor measures temperature by:",
    options: [
      "Heating the target with infrared radiation and measuring the reflected energy",
      "Detecting the infrared radiation naturally emitted by the target surface, which is proportional to its temperature",
      "Measuring the infrared absorption of the air between sensor and target",
      "Using a thermocouple heated by infrared energy"
    ],
    correctAnswer: 1,
    explanation: "All objects above absolute zero emit infrared radiation. The intensity and spectral distribution of this radiation is a function of the object's temperature (Stefan-Boltzmann law). An infrared sensor focuses this radiation onto a detector element to determine the surface temperature without contact. Emissivity of the target surface must be known or measured for accurate readings."
  },
  {
    id: 11,
    question: "A process requires pressure measurement in a system that operates under vacuum (below atmospheric pressure). Which pressure measurement type is needed?",
    options: [
      "Gauge pressure (positive only)",
      "Absolute pressure or compound gauge (vacuum to positive range)",
      "Differential pressure only",
      "Any standard pressure gauge will work"
    ],
    correctAnswer: 1,
    explanation: "A standard gauge pressure transmitter reads zero at atmospheric pressure and only measures positive pressures above atmosphere. For vacuum measurement, you need either an absolute pressure transmitter (zero reference is vacuum) or a compound gauge transmitter that can measure both vacuum (negative gauge) and positive pressure ranges."
  },
  {
    id: 12,
    question: "When calibrating a temperature transmitter, the reference standard should be:",
    options: [
      "Another transmitter of the same type",
      "A calibrated reference thermometer or dry-block calibrator traceable to national standards",
      "The PLC display reading",
      "A glass mercury thermometer from the maintenance stores"
    ],
    correctAnswer: 1,
    explanation: "Calibration requires a reference standard of higher accuracy than the instrument being calibrated — typically 4:1 accuracy ratio. A calibrated reference thermometer (Pt100 or thermocouple) or a dry-block calibrator with a traceable calibration certificate provides the known temperature input. The calibration chain must be traceable to national standards (UKAS in the UK)."
  }
];

const faqs = [
  {
    question: "Which is better — a thermocouple or an RTD?",
    answer: "Neither is universally 'better' — the choice depends on the application. RTDs (Pt100) offer higher accuracy (plus or minus 0.1 degrees C vs plus or minus 1-2 degrees C), better stability and near-linear output, but are limited to about 600 degrees C and are more fragile. Thermocouples are cheaper, more robust, faster responding and can measure up to 1800 degrees C, but with lower accuracy and the need for cold junction compensation."
  },
  {
    question: "What does Pt100 mean?",
    answer: "Pt100 means a platinum (Pt) resistance temperature detector with a resistance of 100 ohms at 0 degrees C. The 'Pt' denotes the platinum sensing element, and '100' is the resistance at 0 degrees C. Pt1000 elements have 1000 ohms at 0 degrees C and offer better resolution for long cable runs because the cable resistance is a smaller proportion of the total."
  },
  {
    question: "How do I identify which type of thermocouple is installed?",
    answer: "Thermocouple type can be identified by the wire and connector colours (BS EN 60584-3): Type K = green sheath; Type J = black sheath; Type T = brown sheath. The compensating cable and miniature connectors follow the same colour coding. If unsure, measure the resistance of the thermocouple — each type has a characteristic resistance range based on its wire materials and length."
  },
  {
    question: "Why does my pressure reading drift over time?",
    answer: "Pressure transmitter drift can be caused by: diaphragm fatigue from pressure cycling; temperature effects on the sensing element; moisture ingress; blocked or partially blocked impulse lines; process material coating the diaphragm; or electronic component ageing. Regular calibration checks (typically annually, or more frequently for safety-critical instruments) will identify drift before it causes process issues."
  },
  {
    question: "What is a thermowell and why is it used?",
    answer: "A thermowell is a closed-end metal tube inserted into the process, into which the temperature sensor is placed. It protects the sensor from process pressure, flow velocity, corrosive media and mechanical damage, and allows sensor replacement without draining or shutting down the process. The trade-off is slower response time due to the thermal mass of the thermowell — typically 10-60 seconds T63 vs under 1 second for a bare sensor."
  }
];

const MOETModule5Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 5.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Temperature and Pressure Sensors
          </h1>
          <p className="text-white/80">
            Thermocouples, RTDs, thermistors, pressure transmitters and calibration fundamentals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Thermocouples:</strong> Two dissimilar metals, Seebeck effect, millivolt output, wide range</li>
              <li className="pl-1"><strong>RTDs (Pt100):</strong> Platinum resistance, high accuracy, 3/4-wire compensation</li>
              <li className="pl-1"><strong>Pressure:</strong> Gauge (relative to atmosphere), absolute (relative to vacuum), differential</li>
              <li className="pl-1"><strong>Calibration:</strong> Traceable standards, 4:1 accuracy ratio, regular intervals</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Measure RTD resistance, thermocouple millivolts, loop current</li>
              <li className="pl-1"><strong>Replacement:</strong> Match sensor type, range, wiring config and process connection</li>
              <li className="pl-1"><strong>Commissioning:</strong> Verify output against known temperature/pressure reference</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to instrumentation knowledge and maintenance competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of thermocouples, RTDs and thermistors",
              "Compare thermocouple types (K, J, T) and their temperature ranges",
              "Describe 2-wire, 3-wire and 4-wire RTD configurations and cable compensation",
              "Distinguish between gauge, absolute and differential pressure measurement",
              "Identify piezoresistive, capacitive and mechanical pressure sensing elements",
              "Apply calibration principles using traceable reference standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Thermocouples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermocouples are the most widely used temperature sensors in industry. They are simple, robust, cover an enormous temperature range (-270 to +1800 degrees C depending on type), and are self-generating — they produce their own voltage without an external power supply. Every maintenance technician will encounter thermocouples in heating systems, furnaces, boilers, process ovens, HVAC systems and a vast range of industrial equipment.
            </p>
            <p>
              The operating principle is the Seebeck effect, discovered by Thomas Johann Seebeck in 1821. When two dissimilar metals are joined at a point (the measuring or "hot" junction) and exposed to a temperature, a small voltage is generated. This voltage is proportional to the temperature difference between the measuring junction and the reference ("cold") junction where the wires connect to the measuring instrument.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Thermocouple Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Metals</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BS Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium">K</td><td className="border border-white/10 px-3 py-2">Chromel / Alumel</td><td className="border border-white/10 px-3 py-2">-200 to +1250 degrees C</td><td className="border border-white/10 px-3 py-2">Green</td><td className="border border-white/10 px-3 py-2">General purpose, furnaces, ovens</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium">J</td><td className="border border-white/10 px-3 py-2">Iron / Constantan</td><td className="border border-white/10 px-3 py-2">-40 to +750 degrees C</td><td className="border border-white/10 px-3 py-2">Black</td><td className="border border-white/10 px-3 py-2">Older installations, plastics processing</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium">T</td><td className="border border-white/10 px-3 py-2">Copper / Constantan</td><td className="border border-white/10 px-3 py-2">-200 to +350 degrees C</td><td className="border border-white/10 px-3 py-2">Brown</td><td className="border border-white/10 px-3 py-2">Low temperature, food, HVAC</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium">N</td><td className="border border-white/10 px-3 py-2">Nicrosil / Nisil</td><td className="border border-white/10 px-3 py-2">-270 to +1300 degrees C</td><td className="border border-white/10 px-3 py-2">Pink</td><td className="border border-white/10 px-3 py-2">High stability, replacing Type K</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium">R/S</td><td className="border border-white/10 px-3 py-2">Platinum / Pt-Rhodium</td><td className="border border-white/10 px-3 py-2">0 to +1600 degrees C</td><td className="border border-white/10 px-3 py-2">Orange (R)</td><td className="border border-white/10 px-3 py-2">High temperature, glass, ceramics</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cold Junction Compensation</p>
              <p className="text-sm text-white mb-3">
                Because the thermocouple measures temperature difference, the system must know the cold junction temperature to calculate the actual measurement. Modern instruments use automatic cold junction compensation (CJC):
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">A precision temperature sensor (thermistor or RTD) at the instrument terminals measures the cold junction temperature</li>
                <li className="pl-1">The instrument adds the equivalent voltage for the cold junction temperature to the measured thermocouple voltage</li>
                <li className="pl-1">The total voltage is converted to temperature using the type-specific look-up table (IEC 60584)</li>
                <li className="pl-1">Incorrect thermocouple type selection in the instrument configuration will give wrong readings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When fault-finding a thermocouple circuit, always use the correct compensating cable or extension wire for the thermocouple type. Using standard copper wire creates additional thermoelectric junctions that introduce measurement errors. The error increases as the temperature at the junction between the copper and thermocouple wire differs from ambient.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Resistance Temperature Detectors (RTDs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance temperature detectors exploit the predictable change in electrical resistance of a metal wire with temperature. Platinum is the preferred material because it has a stable, repeatable and nearly linear resistance-temperature relationship, excellent chemical inertness and high purity availability. The Pt100 is the industry standard — 100 ohms at 0 degrees C with a temperature coefficient of approximately 0.385 ohms per degree C.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RTD Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pt100:</strong> 100 ohms at 0 degrees C — the most common industrial RTD standard</li>
                <li className="pl-1"><strong>Pt1000:</strong> 1000 ohms at 0 degrees C — better for long cable runs (cable resistance is smaller proportion of total)</li>
                <li className="pl-1"><strong>Temperature range:</strong> -200 to +600 degrees C (some to +850 degrees C)</li>
                <li className="pl-1"><strong>Accuracy classes:</strong> IEC 60751 defines Class A (plus or minus 0.15 + 0.002 x T) and Class B (plus or minus 0.3 + 0.005 x T)</li>
                <li className="pl-1"><strong>Alpha value:</strong> 0.00385 ohms/ohm/degrees C (European standard DIN/IEC)</li>
              </ul>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">2-Wire Connection</h3>
                <p className="text-sm text-white">
                  The simplest but least accurate method. Both lead wires carry the measurement current and their resistance is added to the RTD resistance. Acceptable only for short cable runs (under 3 m) or where accuracy requirements are low (plus or minus 2 degrees C).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">3-Wire Connection</h3>
                <p className="text-sm text-white">
                  The most common industrial configuration. The third wire allows the measuring instrument to measure the cable resistance and compensate for it. This assumes all three wires have equal resistance (same length, same gauge, same temperature). Accuracy is typically plus or minus 0.5 degrees C with reasonable cable lengths.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">4-Wire (Kelvin) Connection</h3>
                <p className="text-sm text-white">
                  The most accurate method — two wires carry the excitation current and two separate wires measure the voltage across the RTD element. Cable resistance is completely eliminated from the measurement. Used in laboratory instruments and precision applications where accuracy better than plus or minus 0.1 degrees C is required.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Fault-Finding</p>
              <p className="text-sm text-white">
                To test a Pt100 sensor, disconnect it from the transmitter and measure the resistance across the element terminals. At room temperature (20 degrees C), a healthy Pt100 should read approximately 107.8 ohms. An open circuit (infinite resistance) indicates a broken element or wire. A very low reading (near 0 ohms) indicates a short circuit. Compare the reading with the Pt100 resistance table to verify the indicated temperature is reasonable.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermistors and Infrared Temperature Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond thermocouples and RTDs, two other temperature sensing technologies are commonly encountered in electrical maintenance: thermistors (used in motor winding protection and HVAC) and infrared (non-contact) temperature sensors (used for surface temperature measurement and rotating equipment monitoring).
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">NTC Thermistors</h3>
                <p className="text-sm text-white mb-2">
                  Negative Temperature Coefficient — resistance decreases as temperature increases.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Very high sensitivity (large resistance change per degree)</li>
                  <li className="pl-1">Non-linear response — exponential characteristic</li>
                  <li className="pl-1">Narrow useful range (typically -40 to +150 degrees C)</li>
                  <li className="pl-1">Used in HVAC, automotive, consumer electronics</li>
                  <li className="pl-1">Low cost, fast response, small size</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PTC Thermistors</h3>
                <p className="text-sm text-white mb-2">
                  Positive Temperature Coefficient — resistance increases sharply at a defined trip temperature.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Used as over-temperature protection in motor windings</li>
                  <li className="pl-1">Three PTC sensors embedded in stator windings (one per phase)</li>
                  <li className="pl-1">Connected to a thermistor relay (motor protection unit)</li>
                  <li className="pl-1">Sharp resistance transition at the rated temperature (e.g., 155 degrees C)</li>
                  <li className="pl-1">Provides binary trip/no-trip rather than proportional measurement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Infrared (Non-Contact) Temperature Sensors</h3>
              <p className="text-sm text-white mb-3">
                Infrared temperature sensors measure the thermal radiation emitted by a surface without physical contact. They are essential for measuring rotating equipment, high-voltage components, hot surfaces and objects that are moving or inaccessible.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Spot pyrometers:</strong> Handheld instruments for maintenance checks — point, trigger, read</li>
                <li className="pl-1"><strong>Fixed sensors:</strong> Process-mounted for continuous monitoring</li>
                <li className="pl-1"><strong>Thermal cameras:</strong> Create a temperature map of a surface — used in predictive maintenance for detecting hot joints, overloaded connections and insulation faults</li>
                <li className="pl-1"><strong>Emissivity:</strong> Must be set correctly for the target surface — shiny metals have low emissivity (0.1-0.3) and will read incorrectly unless compensated</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When using a handheld IR thermometer, be aware of the distance-to-spot ratio (D:S). A sensor with D:S of 12:1 measures a spot 1 cm in diameter at 12 cm distance. At 1 m, the spot is approximately 8 cm. If the target is smaller than the measurement spot, the reading will include surrounding surfaces and be inaccurate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pressure Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure measurement is fundamental to industrial process control, building services and plant maintenance. From monitoring boiler steam pressure to verifying compressed air systems, maintenance technicians must understand pressure sensing principles, measurement types and the instruments used. The three primary pressure measurement references — gauge, absolute and differential — each serve different applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Measurement Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Gauge pressure (barg):</strong> Measured relative to atmospheric pressure. A tyre gauge reads 0 when exposed to atmosphere. Most common in industrial applications.</li>
                <li className="pl-1"><strong>Absolute pressure (bara):</strong> Measured relative to a perfect vacuum. Atmospheric pressure = approximately 1.013 bara. Used in vacuum systems, meteorology, altitude measurement.</li>
                <li className="pl-1"><strong>Differential pressure (delta P):</strong> The difference between two pressure points. Used for flow measurement (orifice plates), filter monitoring and level measurement in sealed vessels.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Sensing Technologies</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-white font-medium mb-1">Piezoresistive (Strain Gauge on Diaphragm)</p>
                  <p className="text-sm text-white">The dominant technology in modern electronic transmitters. Strain gauges bonded to a diaphragm change resistance as pressure deflects the diaphragm. Four gauges in a Wheatstone bridge provide a proportional voltage output. Typical accuracy: plus or minus 0.1 to 0.5 % of span.</p>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-1">Capacitive</p>
                  <p className="text-sm text-white">Pressure deflects a diaphragm between two capacitor plates, changing the capacitance. Used in high-accuracy differential pressure transmitters. Rosemount (Emerson) capacitive DP cells are the industry benchmark for flow and level measurement.</p>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-1">Bourdon Tube (Mechanical)</p>
                  <p className="text-sm text-white">A curved metal tube straightens under pressure, driving a pointer via a mechanical linkage. Still widely used in local pressure gauges. Simple, reliable, no power required, but no electrical output for remote monitoring.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Units Conversion</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">1 bar Equals</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">bar</td><td className="border border-white/10 px-3 py-2">1</td><td className="border border-white/10 px-3 py-2">European industry standard</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">kPa</td><td className="border border-white/10 px-3 py-2">100</td><td className="border border-white/10 px-3 py-2">SI unit</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">psi</td><td className="border border-white/10 px-3 py-2">14.504</td><td className="border border-white/10 px-3 py-2">Imperial (US, older UK equipment)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">mbar</td><td className="border border-white/10 px-3 py-2">1000</td><td className="border border-white/10 px-3 py-2">Low pressure, HVAC, gas systems</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">mmH2O</td><td className="border border-white/10 px-3 py-2">10,197</td><td className="border border-white/10 px-3 py-2">Duct pressure, filter differential</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When specifying or replacing a pressure transmitter, always confirm the pressure type (gauge, absolute or differential), the range, the process connection (thread size and type), wetted materials compatibility with the process media, and the output signal. A transmitter specified for gauge pressure will not read correctly in a vacuum application.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Calibration Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration is the process of comparing an instrument's readings against a known, traceable reference standard and adjusting if necessary to bring it within specification. For temperature and pressure sensors, regular calibration is essential to maintain measurement accuracy, ensure process quality and meet safety requirements. Poorly calibrated instruments can lead to product defects, energy waste, equipment damage or safety incidents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Traceability:</strong> The reference standard must be traceable through an unbroken chain to national standards (UKAS in the UK)</li>
                <li className="pl-1"><strong>Accuracy ratio:</strong> The reference should be at least 4 times more accurate than the instrument being calibrated (4:1 TUR — Test Uncertainty Ratio)</li>
                <li className="pl-1"><strong>As-found / as-left:</strong> Record the readings before and after adjustment to track drift over time</li>
                <li className="pl-1"><strong>Five-point check:</strong> Calibrate at 0 %, 25 %, 50 %, 75 % and 100 % of range, both ascending and descending</li>
                <li className="pl-1"><strong>Calibration certificate:</strong> Document the results, reference standard used, environmental conditions and pass/fail status</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Calibration Equipment</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Dry-block calibrator (portable, field use)</li>
                  <li className="pl-1">Liquid bath calibrator (higher accuracy)</li>
                  <li className="pl-1">Reference thermometer (Pt100 or SPRT)</li>
                  <li className="pl-1">Ice point reference (0 degrees C check)</li>
                  <li className="pl-1">Decade resistance box (for simulating RTDs)</li>
                  <li className="pl-1">mV source (for simulating thermocouples)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Calibration Equipment</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Dead-weight tester (primary standard)</li>
                  <li className="pl-1">Pneumatic hand pump with reference gauge</li>
                  <li className="pl-1">Digital pressure calibrator (portable)</li>
                  <li className="pl-1">Pressure comparator</li>
                  <li className="pl-1">mA source/measure (for loop simulation)</li>
                  <li className="pl-1">HART communicator (for smart transmitters)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians should be able to carry out basic calibration checks using portable calibration equipment, interpret calibration certificates, and understand when an instrument requires recalibration. Full calibration and adjustment of safety-critical instruments may require specialist instrumentation personnel.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Proximity and Position Sensors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-4">
              Next: Flow and Level Measurement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section1_3;