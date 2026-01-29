import { ArrowLeft, Thermometer, CheckCircle, Droplets, Gauge, Wind, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sensors and Measurement - HNC Module 8 Section 5.2";
const DESCRIPTION = "Master BMS sensors for HVAC applications: temperature sensors (Pt100, Pt1000, NTC, thermocouples), humidity sensors, pressure transducers, flow meters, CO2 sensors, 4-20mA and 0-10V signals, accuracy specifications and calibration requirements.";

const quickCheckQuestions = [
  {
    id: "pt100-resistance",
    question: "What is the resistance of a Pt100 sensor at 0 degrees C?",
    options: ["10 ohms", "100 ohms", "1000 ohms", "10000 ohms"],
    correctIndex: 1,
    explanation: "Pt100 means platinum with 100 ohms resistance at 0 degrees C. The 'Pt' indicates platinum and '100' indicates the resistance at the ice point (0 degrees C). At 100 degrees C, the resistance is approximately 138.5 ohms."
  },
  {
    id: "ntc-behaviour",
    question: "How does an NTC thermistor behave as temperature increases?",
    options: [
      "Resistance increases linearly",
      "Resistance decreases",
      "Resistance stays constant",
      "Resistance increases exponentially"
    ],
    correctIndex: 1,
    explanation: "NTC (Negative Temperature Coefficient) thermistors decrease in resistance as temperature rises. This non-linear characteristic makes them highly sensitive but requires linearisation in the BMS for accurate readings."
  },
  {
    id: "4-20ma-advantage",
    question: "What is the main advantage of 4-20mA signals over 0-10V signals?",
    options: [
      "Lower cost",
      "Simpler wiring",
      "Immunity to cable resistance and noise",
      "Higher resolution"
    ],
    correctIndex: 2,
    explanation: "4-20mA current loop signals are immune to cable resistance effects and electrical noise. The current remains constant throughout the loop regardless of cable length, and the 4mA zero point allows fault detection (0mA indicates a broken wire)."
  },
  {
    id: "calibration-frequency",
    question: "How often should critical HVAC sensors typically be calibrated?",
    options: [
      "Every month",
      "Every 6-12 months",
      "Every 5 years",
      "Only when faulty"
    ],
    correctIndex: 1,
    explanation: "Critical HVAC sensors should typically be calibrated every 6-12 months depending on the application criticality. Sensors in critical environments such as laboratories or cleanrooms may require more frequent calibration. Calibration records must be maintained for compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of temperature sensor uses the Seebeck effect to generate a voltage?",
    options: [
      "Pt100 RTD",
      "NTC thermistor",
      "Thermocouple",
      "Pt1000 RTD"
    ],
    correctAnswer: 2,
    explanation: "Thermocouples use the Seebeck effect - when two dissimilar metals are joined and heated, a voltage is generated proportional to the temperature difference. Type K (chromel-alumel) and Type J (iron-constantan) are common in HVAC applications."
  },
  {
    id: 2,
    question: "A Pt1000 sensor has what resistance at 0 degrees C?",
    options: ["100 ohms", "500 ohms", "1000 ohms", "10000 ohms"],
    correctAnswer: 2,
    explanation: "Pt1000 sensors have 1000 ohms resistance at 0 degrees C. They offer 10 times the resistance change of Pt100 sensors, making them less susceptible to cable resistance errors over long cable runs."
  },
  {
    id: 3,
    question: "Which humidity sensor type measures the change in capacitance with moisture content?",
    options: [
      "Resistive humidity sensor",
      "Capacitive humidity sensor",
      "Thermal conductivity sensor",
      "Psychrometric sensor"
    ],
    correctAnswer: 1,
    explanation: "Capacitive humidity sensors use a polymer dielectric that absorbs moisture, changing the capacitance. They are the most common type in HVAC applications due to good accuracy (typically plus or minus 2-3% RH), stability and cost-effectiveness."
  },
  {
    id: 4,
    question: "What does a differential pressure sensor measure in a VAV system?",
    options: [
      "Room temperature",
      "Airflow rate via pressure drop across a flow station",
      "Refrigerant charge",
      "Motor speed"
    ],
    correctAnswer: 1,
    explanation: "In VAV systems, differential pressure sensors measure the pressure drop across a flow measuring station (such as a Pitot tube array). This pressure difference is proportional to the square of the airflow velocity, allowing airflow calculation."
  },
  {
    id: 5,
    question: "What is the typical measurement range for a duct CO2 sensor in a ventilation system?",
    options: [
      "0-100 ppm",
      "0-500 ppm",
      "0-2000 ppm",
      "0-10000 ppm"
    ],
    correctAnswer: 2,
    explanation: "Duct CO2 sensors typically measure 0-2000 ppm for demand-controlled ventilation. Outdoor air is around 400 ppm, and occupied spaces should be maintained below 1000 ppm (800 ppm above outdoor) for good air quality per CIBSE guidelines."
  },
  {
    id: 6,
    question: "A 4-20mA signal reading 12mA represents what percentage of the measured range?",
    options: ["30%", "50%", "60%", "75%"],
    correctAnswer: 1,
    explanation: "For 4-20mA signals: 4mA = 0%, 20mA = 100%. The span is 16mA. At 12mA: (12-4)/16 = 8/16 = 50% of the measured range."
  },
  {
    id: 7,
    question: "Which sensor type is most suitable for measuring chilled water flow rate in a large AHU?",
    options: [
      "Orifice plate",
      "Electromagnetic flow meter",
      "Turbine flow meter",
      "Thermal mass flow meter"
    ],
    correctAnswer: 1,
    explanation: "Electromagnetic flow meters are ideal for chilled water as they have no moving parts, cause minimal pressure drop, and work well with conductive liquids. They provide accurate readings across a wide flow range and are suitable for large pipe diameters."
  },
  {
    id: 8,
    question: "What is the typical accuracy specification for a building services grade temperature sensor?",
    options: [
      "Plus or minus 0.01 degrees C",
      "Plus or minus 0.1 to 0.3 degrees C",
      "Plus or minus 1 to 2 degrees C",
      "Plus or minus 5 degrees C"
    ],
    correctAnswer: 1,
    explanation: "Building services grade temperature sensors typically have accuracy of plus or minus 0.1 to 0.3 degrees C (Class A or Class B RTDs). This is sufficient for HVAC control where setpoint dead bands are usually 0.5 to 1 degrees C."
  },
  {
    id: 9,
    question: "Why is three-wire configuration preferred for Pt100 sensors over two-wire?",
    options: [
      "It is cheaper to install",
      "It compensates for cable resistance",
      "It provides faster response time",
      "It uses less power"
    ],
    correctAnswer: 1,
    explanation: "Three-wire Pt100 configuration uses the third wire to measure and compensate for cable resistance. This is important because cable resistance adds directly to the sensor reading - 1 ohm of cable resistance causes approximately 2.5 degrees C error in a Pt100."
  },
  {
    id: 10,
    question: "What parameter does an ultrasonic flow meter measure to calculate flow rate?",
    options: [
      "Pressure difference",
      "Temperature change",
      "Transit time difference of sound waves",
      "Magnetic field distortion"
    ],
    correctAnswer: 2,
    explanation: "Ultrasonic flow meters measure the transit time difference of ultrasonic pulses travelling with and against the flow. The difference in transit times is proportional to the flow velocity. They are non-invasive and suitable for large pipes."
  },
  {
    id: 11,
    question: "What is the purpose of a sensor averaging element in a large duct?",
    options: [
      "To increase signal voltage",
      "To measure temperature at multiple points and provide a representative average",
      "To filter electrical noise",
      "To reduce installation cost"
    ],
    correctAnswer: 1,
    explanation: "Sensor averaging elements (typically 3m or 6m long) measure temperature at multiple points across a duct cross-section. This provides a representative average reading in applications where temperature stratification may occur, such as after mixing boxes or coils."
  },
  {
    id: 12,
    question: "A pressure transducer with 0.25% FS accuracy measuring 0-10 bar has what maximum error?",
    options: [
      "0.025 bar",
      "0.25 bar",
      "2.5 bar",
      "0.0025 bar"
    ],
    correctAnswer: 0,
    explanation: "Full Scale (FS) accuracy means the error is a percentage of the full measurement range. 0.25% of 10 bar = 0.025 bar maximum error, regardless of the actual reading. This is why sensors should be sized appropriately for the expected measurement range."
  }
];

const faqs = [
  {
    question: "What is the difference between accuracy and resolution in sensors?",
    answer: "Accuracy is how close a measurement is to the true value (e.g., plus or minus 0.2 degrees C), while resolution is the smallest change the sensor can detect (e.g., 0.01 degrees C). A sensor can have high resolution but poor accuracy if not calibrated correctly. For BMS applications, accuracy is typically more important than resolution for control purposes."
  },
  {
    question: "When should I use 4-20mA versus 0-10V signal outputs?",
    answer: "Use 4-20mA for long cable runs (greater than 15m), electrically noisy environments, or where cable resistance might vary. The 4mA live zero also allows detection of wire breaks. Use 0-10V for short runs, lower cost applications, or where the BMS only accepts voltage inputs. Many modern sensors offer both outputs."
  },
  {
    question: "How do I select the correct pressure sensor range for an application?",
    answer: "Select a range where normal operating pressure is 50-80% of full scale for best accuracy. For duct static pressure (typically 250-500Pa), use a 0-1000Pa sensor. For water systems, consider maximum pump head plus safety margin. Differential pressure sensors for filters should accommodate the clean and dirty pressure drop range."
  },
  {
    question: "Why do some temperature sensors require a specific immersion depth?",
    answer: "Immersion depth affects measurement accuracy as heat conducts along the sensor stem. For water temperature, immersion depth should be at least 10 times the sensor probe diameter to ensure the sensing element reaches true fluid temperature. Thermowells provide protection while maintaining thermal contact with the fluid."
  },
  {
    question: "What calibration records should be maintained for BMS sensors?",
    answer: "Records should include: sensor identification and location, calibration date, reference standard used (traceable to national standards), as-found and as-left readings, any adjustments made, next calibration due date, and the technician's signature. These records demonstrate compliance with quality management systems and building regulations."
  },
  {
    question: "How do I verify a sensor is working correctly without removing it?",
    answer: "Compare readings with portable reference instruments, check against other sensors measuring similar conditions, verify signal levels at the controller match expected values, look for drift or erratic readings over time in trend logs, and check for appropriate response to known changes (e.g., setpoint changes). Many BMS systems include sensor health diagnostics."
  }
];

const HNCModule8Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 8.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sensors and Measurement
          </h1>
          <p className="text-white/80">
            Understanding HVAC sensors: temperature, humidity, pressure, flow and air quality measurement for BMS integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Temperature:</strong> Pt100/Pt1000 RTDs, NTC thermistors, thermocouples</li>
              <li className="pl-1"><strong>Humidity:</strong> Capacitive sensors, 0-100% RH range</li>
              <li className="pl-1"><strong>Pressure:</strong> Absolute, gauge, differential transducers</li>
              <li className="pl-1"><strong>Signals:</strong> 4-20mA, 0-10V, resistance outputs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BMS integration:</strong> Sensor selection for outstations</li>
              <li className="pl-1"><strong>Accuracy:</strong> Class A/B RTDs, calibration requirements</li>
              <li className="pl-1"><strong>Installation:</strong> Thermowells, averaging elements</li>
              <li className="pl-1"><strong>Maintenance:</strong> Calibration schedules and records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and select appropriate temperature sensors for HVAC applications",
              "Understand humidity sensor technologies and their characteristics",
              "Apply pressure and flow measurement principles to BMS systems",
              "Interpret 4-20mA and 0-10V signal specifications",
              "Specify sensor accuracy, resolution and range requirements",
              "Implement calibration procedures and maintain records"
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

        {/* Section 1: Temperature Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Temperature Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature is the most commonly measured parameter in HVAC systems. Accurate temperature
              measurement is essential for comfort control, energy efficiency and equipment protection.
              Different sensor technologies suit different applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resistance Temperature Detectors (RTDs)</p>
              <p className="text-sm text-white/90 mb-3">
                RTDs use the principle that metal resistance increases with temperature. Platinum is the most
                common material due to its stability, linearity and wide temperature range.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Sensor Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R at 0 deg C</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">HVAC Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pt100</td>
                      <td className="border border-white/10 px-3 py-2">100 ohms</td>
                      <td className="border border-white/10 px-3 py-2">-50 to +200 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Standard HVAC, AHU coils</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pt1000</td>
                      <td className="border border-white/10 px-3 py-2">1000 ohms</td>
                      <td className="border border-white/10 px-3 py-2">-50 to +200 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Long cable runs, remote sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ni1000</td>
                      <td className="border border-white/10 px-3 py-2">1000 ohms</td>
                      <td className="border border-white/10 px-3 py-2">-50 to +150 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Room sensors, lower cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RTD Accuracy Classes (IEC 60751)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Class AA:</strong> Plus or minus 0.1 deg C at 0 deg C - Laboratory grade</li>
                <li className="pl-1"><strong>Class A:</strong> Plus or minus 0.15 deg C at 0 deg C - High accuracy HVAC</li>
                <li className="pl-1"><strong>Class B:</strong> Plus or minus 0.3 deg C at 0 deg C - Standard HVAC applications</li>
                <li className="pl-1"><strong>Class C:</strong> Plus or minus 0.6 deg C at 0 deg C - Non-critical applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NTC Thermistors</p>
              <p className="text-sm text-white/90 mb-3">
                Negative Temperature Coefficient (NTC) thermistors decrease in resistance as temperature rises.
                They offer high sensitivity but non-linear output requiring linearisation.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>10k NTC:</strong> 10,000 ohms at 25 deg C - Common room sensor type</li>
                <li className="pl-1"><strong>High sensitivity:</strong> Large resistance change per degree</li>
                <li className="pl-1"><strong>Non-linear:</strong> Requires lookup tables or linearisation</li>
                <li className="pl-1"><strong>Lower cost:</strong> Suitable for mass-market applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermocouples</p>
              <p className="text-sm text-white/90 mb-3">
                Thermocouples generate a voltage (Seebeck effect) proportional to temperature difference between
                the measurement junction and reference junction. They suit high-temperature applications.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Materials</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type K</td>
                      <td className="border border-white/10 px-3 py-2">Chromel-Alumel</td>
                      <td className="border border-white/10 px-3 py-2">-200 to +1350 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Boilers, flue gases</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type J</td>
                      <td className="border border-white/10 px-3 py-2">Iron-Constantan</td>
                      <td className="border border-white/10 px-3 py-2">-40 to +750 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Industrial heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type T</td>
                      <td className="border border-white/10 px-3 py-2">Copper-Constantan</td>
                      <td className="border border-white/10 px-3 py-2">-200 to +350 deg C</td>
                      <td className="border border-white/10 px-3 py-2">Low temperature, food</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Configurations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>2-wire:</strong> Simple but cable resistance adds to reading (not recommended for Pt100)</li>
                <li className="pl-1"><strong>3-wire:</strong> Compensates for cable resistance - standard for Pt100 BMS applications</li>
                <li className="pl-1"><strong>4-wire:</strong> Most accurate, eliminates cable effects - for laboratory/precision use</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Use Pt1000 for cable runs greater than 20m to minimise cable resistance errors. Each 1 ohm cable resistance causes approximately 2.5 deg C error with Pt100 but only 0.25 deg C with Pt1000.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Humidity and Air Quality Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Humidity and Air Quality Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Humidity control is critical for comfort, health and building protection. CO2 sensors enable
              demand-controlled ventilation, optimising energy use while maintaining air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Humidity Sensor Technologies</p>
              <div className="grid sm:grid-cols-2 gap-6 my-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-elec-yellow/70" />
                    <p className="text-sm font-medium text-white">Capacitive Sensors</p>
                  </div>
                  <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Polymer film absorbs moisture</li>
                    <li className="pl-1">Capacitance changes with humidity</li>
                    <li className="pl-1">Accuracy: plus or minus 2-3% RH typical</li>
                    <li className="pl-1">Most common in HVAC applications</li>
                    <li className="pl-1">Good stability and response time</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-elec-yellow/70" />
                    <p className="text-sm font-medium text-white">Resistive Sensors</p>
                  </div>
                  <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Conductive polymer changes resistance</li>
                    <li className="pl-1">Lower cost than capacitive</li>
                    <li className="pl-1">Accuracy: plus or minus 3-5% RH</li>
                    <li className="pl-1">Less stable over time</li>
                    <li className="pl-1">Suitable for non-critical applications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Humidity Sensor Specifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Range</td>
                      <td className="border border-white/10 px-3 py-2">0-100% RH</td>
                      <td className="border border-white/10 px-3 py-2">Full range measurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accuracy</td>
                      <td className="border border-white/10 px-3 py-2">Plus or minus 2% RH</td>
                      <td className="border border-white/10 px-3 py-2">At 25 deg C, 10-90% RH</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long-term drift</td>
                      <td className="border border-white/10 px-3 py-2">Less than 1% RH/year</td>
                      <td className="border border-white/10 px-3 py-2">Affects calibration interval</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response time</td>
                      <td className="border border-white/10 px-3 py-2">Less than 30 seconds</td>
                      <td className="border border-white/10 px-3 py-2">To reach 63% of step change</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CO2 Sensors for Demand-Controlled Ventilation</p>
              <p className="text-sm text-white/90 mb-3">
                CO2 concentration indicates occupancy and air quality. Non-dispersive infrared (NDIR) sensors
                are standard for BMS applications, measuring CO2 absorption of infrared light.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Outdoor air:</strong> Approximately 400-420 ppm (rising due to climate change)</li>
                <li className="pl-1"><strong>Occupied spaces target:</strong> Less than 1000 ppm (800 ppm above outdoor)</li>
                <li className="pl-1"><strong>Poor air quality:</strong> Greater than 1500 ppm - increase ventilation</li>
                <li className="pl-1"><strong>Sensor range:</strong> 0-2000 ppm typical, 0-5000 ppm for high-occupancy</li>
                <li className="pl-1"><strong>Accuracy:</strong> Plus or minus 50 ppm or plus or minus 3% of reading</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Guide A - Recommended CO2 Levels</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category I (high expectation):</strong> Less than 550 ppm above outdoor</li>
                <li className="pl-1"><strong>Category II (normal expectation):</strong> Less than 800 ppm above outdoor</li>
                <li className="pl-1"><strong>Category III (moderate expectation):</strong> Less than 1350 ppm above outdoor</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation tip:</strong> Mount CO2 sensors at breathing height (1.1-1.5m) away from doors, windows and supply air diffusers. Avoid locations near plants or areas where people congregate.
            </p>
          </div>
        </section>

        {/* Section 3: Pressure and Flow Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pressure and Flow Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure and flow measurement are fundamental to HVAC control. Pressure sensors monitor duct
              static pressure, filter condition and pump operation. Flow meters verify water and air flow rates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Measurement Types</p>
              <div className="grid sm:grid-cols-3 gap-4 my-4">
                <div className="p-3 rounded bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-elec-yellow/70" />
                    <p className="font-medium text-sm">Absolute</p>
                  </div>
                  <p className="text-xs text-white/70">Referenced to perfect vacuum. Used for altitude compensation.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-elec-yellow/70" />
                    <p className="font-medium text-sm">Gauge</p>
                  </div>
                  <p className="text-xs text-white/70">Referenced to atmospheric pressure. Pump head, vessel pressure.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-elec-yellow/70" />
                    <p className="font-medium text-sm">Differential</p>
                  </div>
                  <p className="text-xs text-white/70">Difference between two points. Filter DP, duct static.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Transducer Technologies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Piezoresistive:</strong> Strain gauges on silicon diaphragm - most common in HVAC</li>
                <li className="pl-1"><strong>Capacitive:</strong> Diaphragm deflection changes capacitance - high accuracy</li>
                <li className="pl-1"><strong>Piezoelectric:</strong> Crystal generates voltage - for dynamic pressure/vibration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Pressure Sensor Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duct static pressure</td>
                      <td className="border border-white/10 px-3 py-2">Differential</td>
                      <td className="border border-white/10 px-3 py-2">0-1000 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Filter differential</td>
                      <td className="border border-white/10 px-3 py-2">Differential</td>
                      <td className="border border-white/10 px-3 py-2">0-500 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Room pressure</td>
                      <td className="border border-white/10 px-3 py-2">Differential</td>
                      <td className="border border-white/10 px-3 py-2">0-100 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW/CHW system</td>
                      <td className="border border-white/10 px-3 py-2">Gauge</td>
                      <td className="border border-white/10 px-3 py-2">0-10 bar</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump differential</td>
                      <td className="border border-white/10 px-3 py-2">Differential</td>
                      <td className="border border-white/10 px-3 py-2">0-6 bar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Measurement Methods</p>
              <div className="grid sm:grid-cols-2 gap-6 my-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-4 w-4 text-elec-yellow/70" />
                    <p className="text-sm font-medium text-white">Air Flow</p>
                  </div>
                  <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Pitot tube array:</strong> DP measurement across array</li>
                    <li className="pl-1"><strong>Thermal anemometer:</strong> Hot wire/film cooling rate</li>
                    <li className="pl-1"><strong>Vortex shedding:</strong> Frequency of vortices</li>
                    <li className="pl-1"><strong>Averaging element:</strong> Multiple sensing points</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-elec-yellow/70" />
                    <p className="text-sm font-medium text-white">Water Flow</p>
                  </div>
                  <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Electromagnetic:</strong> Conductive fluids, no moving parts</li>
                    <li className="pl-1"><strong>Ultrasonic:</strong> Transit time, clamp-on available</li>
                    <li className="pl-1"><strong>Turbine:</strong> Rotating impeller, pulse output</li>
                    <li className="pl-1"><strong>Orifice plate:</strong> DP across restriction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow-Pressure Relationship</p>
              <p className="text-sm text-white/90 mb-2">
                For differential pressure flow measurement, flow is proportional to the square root of pressure:
              </p>
              <p className="font-mono text-center text-lg text-elec-yellow mb-2">Q = k x sqrt(delta P)</p>
              <p className="text-xs text-white/70 text-center">Where Q = flow rate, k = constant, delta P = differential pressure</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Electromagnetic flow meters are preferred for chilled/heating water as they have no moving parts, minimal pressure drop, and work across wide flow ranges. Ensure adequate straight pipe lengths upstream (10 x diameter) and downstream (5 x diameter).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Signal Types, Accuracy and Calibration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Signal Types, Accuracy and Calibration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding signal types, accuracy specifications and calibration requirements is essential
              for proper BMS integration and maintaining measurement quality over the sensor lifetime.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analogue Signal Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disadvantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use When</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-20mA</td>
                      <td className="border border-white/10 px-3 py-2">Noise immune, fault detection (0mA = break)</td>
                      <td className="border border-white/10 px-3 py-2">Requires loop power, higher cost</td>
                      <td className="border border-white/10 px-3 py-2">Long runs, noisy environments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-10V DC</td>
                      <td className="border border-white/10 px-3 py-2">Simple, low cost, easy to measure</td>
                      <td className="border border-white/10 px-3 py-2">Susceptible to noise, voltage drop</td>
                      <td className="border border-white/10 px-3 py-2">Short runs, clean environments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-10V DC</td>
                      <td className="border border-white/10 px-3 py-2">Live zero for fault detection</td>
                      <td className="border border-white/10 px-3 py-2">Less common, limited compatibility</td>
                      <td className="border border-white/10 px-3 py-2">Critical applications needing fault detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistance</td>
                      <td className="border border-white/10 px-3 py-2">Direct connection, no transmitter</td>
                      <td className="border border-white/10 px-3 py-2">Cable resistance affects reading</td>
                      <td className="border border-white/10 px-3 py-2">RTDs, thermistors with short cables</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">4-20mA Signal Calculations</p>
              <div className="grid sm:grid-cols-2 gap-4 my-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Signal to Value</p>
                  <p className="font-mono text-sm text-elec-yellow">Value = ((mA - 4) / 16) x Span + Zero</p>
                  <p className="text-xs text-white/70 mt-2">Example: 12mA on 0-100 deg C sensor = ((12-4)/16) x 100 + 0 = 50 deg C</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Value to Signal</p>
                  <p className="font-mono text-sm text-elec-yellow">mA = ((Value - Zero) / Span) x 16 + 4</p>
                  <p className="text-xs text-white/70 mt-2">Example: 75 deg C on 0-100 deg C sensor = ((75-0)/100) x 16 + 4 = 16mA</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding Accuracy Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Accuracy (% FS):</strong> Error as percentage of full scale range - applies at any reading</li>
                <li className="pl-1"><strong>Accuracy (% reading):</strong> Error as percentage of actual reading - better at low readings</li>
                <li className="pl-1"><strong>Resolution:</strong> Smallest detectable change - not the same as accuracy</li>
                <li className="pl-1"><strong>Repeatability:</strong> Consistency of readings under same conditions</li>
                <li className="pl-1"><strong>Hysteresis:</strong> Difference between increasing and decreasing readings</li>
                <li className="pl-1"><strong>Drift:</strong> Change in accuracy over time - affects calibration interval</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accuracy Example</p>
              <p className="text-sm text-white/90">
                A pressure sensor has 0-10 bar range with 0.5% FS accuracy:
              </p>
              <ul className="text-sm text-white/90 mt-2 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Maximum error = 0.5% x 10 bar = <strong>0.05 bar</strong> at any reading</li>
                <li className="pl-1">At 8 bar reading: true value is 7.95 to 8.05 bar</li>
                <li className="pl-1">At 2 bar reading: true value is 1.95 to 2.05 bar (larger % error at low readings)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Traceability:</strong> Reference standards traceable to national standards (UKAS in UK)</li>
                <li className="pl-1"><strong>Frequency:</strong> Typically 6-12 months for critical sensors, annually for standard</li>
                <li className="pl-1"><strong>Documentation:</strong> As-found, as-left readings, date, reference used, technician</li>
                <li className="pl-1"><strong>Adjustment:</strong> Zero and span adjustment if within tolerance, replace if not</li>
                <li className="pl-1"><strong>Environment:</strong> Calibrate at conditions similar to installed environment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Procedure (General)</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Record sensor identification, location and current date</li>
                <li className="pl-1">Connect reference standard and allow stabilisation</li>
                <li className="pl-1">Record as-found readings at zero, mid and full scale</li>
                <li className="pl-1">Adjust zero offset if required</li>
                <li className="pl-1">Adjust span (gain) if required</li>
                <li className="pl-1">Record as-left readings at all test points</li>
                <li className="pl-1">Verify readings are within specification</li>
                <li className="pl-1">Apply calibration label and update records</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> For buildings with environmental controls (laboratories, hospitals, data centres), calibration records may be required for regulatory compliance. Maintain traceable records for audit purposes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measurement range covers expected operating conditions with margin</li>
                <li className="pl-1">Accuracy suitable for control requirements (typically 3-5x better than deadband)</li>
                <li className="pl-1">Signal output compatible with BMS controller inputs</li>
                <li className="pl-1">Environmental rating (IP rating, temperature range) suitable for location</li>
                <li className="pl-1">Response time adequate for control loop dynamics</li>
                <li className="pl-1">Mounting method and cable length considered</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Installation Mistakes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature:</strong> Insufficient immersion depth, thermal bridging from poor insulation</li>
                <li className="pl-1"><strong>Humidity:</strong> Located in stagnant air, exposed to direct spray or condensation</li>
                <li className="pl-1"><strong>Pressure:</strong> Impulse lines too long or not properly sloped, air trapped in liquid lines</li>
                <li className="pl-1"><strong>Flow:</strong> Insufficient straight pipe lengths, air in water flow meters</li>
                <li className="pl-1"><strong>CO2:</strong> Too close to supply diffusers, wrong height, drafty locations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Troubleshooting Sensor Problems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Erratic readings:</strong> Check wiring, shielding, earthing. Look for electrical interference sources.</li>
                <li className="pl-1"><strong>Offset error:</strong> Check zero calibration, thermal effects on wiring, reference junction compensation.</li>
                <li className="pl-1"><strong>Slow response:</strong> Check for fouling, thermal mass of installation, air in pressure lines.</li>
                <li className="pl-1"><strong>Drift over time:</strong> Normal ageing - recalibrate. Excessive drift may indicate contamination or damage.</li>
                <li className="pl-1"><strong>0mA or 0V:</strong> Check power supply, wiring continuity, sensor failure.</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Temperature Sensors</p>
                <ul className="space-y-0.5">
                  <li>Pt100: 100 ohms at 0 deg C, 3-wire preferred</li>
                  <li>Pt1000: 1000 ohms at 0 deg C, long runs</li>
                  <li>NTC: High sensitivity, non-linear</li>
                  <li>Thermocouple: High temp, mV output</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Signal Types</p>
                <ul className="space-y-0.5">
                  <li>4-20mA: Noise immune, 4mA = 0%</li>
                  <li>0-10V: Simple, short runs only</li>
                  <li>Accuracy: % FS or % reading</li>
                  <li>Calibrate: 6-12 months typical</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../h-n-c-module8-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5-3">
              Next: Actuators and Output Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_2;
