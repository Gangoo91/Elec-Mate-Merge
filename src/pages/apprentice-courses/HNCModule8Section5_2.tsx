/**
 * Module 8 · Section 5 · Subsection 2 — Sensors and Measurement
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Understanding HVAC sensors: temperature, humidity, pressure, flow and air quality measurement for BMS integration
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Sensors and Measurement - HNC Module 8 Section 5.2';
const DESCRIPTION =
  'Master BMS sensors for HVAC applications: temperature sensors (Pt100, Pt1000, NTC, thermocouples), humidity sensors, pressure transducers, flow meters, CO2 sensors, 4-20mA and 0-10V signals, accuracy specifications and calibration requirements.';

const quickCheckQuestions = [
  {
    id: 'pt100-resistance',
    question: 'What is the resistance of a Pt100 sensor at 0 degrees C?',
    options: [
      '1000 ohms',
      '10000 ohms',
      '100 ohms',
      '10 ohms',
    ],
    correctIndex: 2,
    explanation:
      "Pt100 means platinum with 100 ohms resistance at 0 degrees C. The 'Pt' indicates platinum and '100' indicates the resistance at the ice point (0 degrees C). At 100 degrees C, the resistance is approximately 138.5 ohms.",
  },
  {
    id: 'ntc-behaviour',
    question: 'How does an NTC thermistor behave as temperature increases?',
    options: [
      'Resistance increases exponentially',
      'Resistance stays constant',
      'Resistance decreases',
      'Resistance increases linearly',
    ],
    correctIndex: 2,
    explanation:
      'NTC (Negative Temperature Coefficient) thermistors decrease in resistance as temperature rises. This non-linear characteristic makes them highly sensitive but requires linearisation in the BMS for accurate readings.',
  },
  {
    id: '4-20ma-advantage',
    question: 'What is the main advantage of 4-20mA signals over 0-10V signals?',
    options: [
      'Immunity to cable resistance and noise',
      'Direction of induced current',
      'Pushing is generally safer than pulling',
      'Listen, Empathise, Ask, Paraphrase, Summarise',
    ],
    correctIndex: 0,
    explanation:
      '4-20mA current loop signals are immune to cable resistance effects and electrical noise. The current remains constant throughout the loop regardless of cable length, and the 4mA zero point allows fault detection (0mA indicates a broken wire).',
  },
  {
    id: 'calibration-frequency',
    question: 'How often should critical HVAC sensors typically be calibrated?',
    options: [
      'Every 6-12 months',
      'Every month',
      'Only when faulty',
      'Every 5 years',
    ],
    correctIndex: 0,
    explanation:
      'Critical HVAC sensors should typically be calibrated every 6-12 months depending on the application criticality. Sensors in critical environments such as laboratories or cleanrooms may require more frequent calibration. Calibration records must be maintained for compliance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What type of temperature sensor uses the Seebeck effect to generate a voltage?',
    options: [
      'Pt100 RTD',
      'Thermocouple',
      'NTC thermistor',
      'Pt1000 RTD',
    ],
    correctAnswer: 1,
    explanation:
      'Thermocouples use the Seebeck effect - when two dissimilar metals are joined and heated, a voltage is generated proportional to the temperature difference. Type K (chromel-alumel) and Type J (iron-constantan) are common in HVAC applications.',
  },
  {
    id: 2,
    question: 'A Pt1000 sensor has what resistance at 0 degrees C?',
    options: [
      '10000 ohms',
      '100 ohms',
      '1000 ohms',
      '500 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'Pt1000 sensors have 1000 ohms resistance at 0 degrees C. They offer 10 times the resistance change of Pt100 sensors, making them less susceptible to cable resistance errors over long cable runs.',
  },
  {
    id: 3,
    question:
      'Which humidity sensor type measures the change in capacitance with moisture content?',
    options: [
      'Thermal conductivity sensor',
      'Resistive humidity sensor',
      'Psychrometric sensor',
      'Capacitive humidity sensor',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitive humidity sensors use a polymer dielectric that absorbs moisture, changing the capacitance. They are the most common type in HVAC applications due to good accuracy (typically plus or minus 2-3% RH), stability and cost-effectiveness.',
  },
  {
    id: 4,
    question: 'What does a differential pressure sensor measure in a VAV system?',
    options: [
      'Airflow rate via pressure drop across a flow station',
      'Plan equipment use and resolve potential conflicts',
      'Verify the generator is isolated and cannot start automatically',
      'Protective device may not operate quickly enough',
    ],
    correctAnswer: 0,
    explanation:
      'In VAV systems, differential pressure sensors measure the pressure drop across a flow measuring station (such as a Pitot tube array). This pressure difference is proportional to the square of the airflow velocity, allowing airflow calculation.',
  },
  {
    id: 5,
    question:
      'What is the typical measurement range for a duct CO2 sensor in a ventilation system?',
    options: [
      '0-500 ppm',
      '0-2000 ppm',
      '0-10000 ppm',
      '0-100 ppm',
    ],
    correctAnswer: 1,
    explanation:
      'Duct CO2 sensors typically measure 0-2000 ppm for demand-controlled ventilation. Outdoor air is around 400 ppm, and occupied spaces should be maintained below 1000 ppm (800 ppm above outdoor) for good air quality per CIBSE guidelines.',
  },
  {
    id: 6,
    question: 'A 4-20mA signal reading 12mA represents what percentage of the measured range?',
    options: [
      '30%',
      '60%',
      '50%',
      '75%',
    ],
    correctAnswer: 2,
    explanation:
      'For 4-20mA signals: 4mA = 0%, 20mA = 100%. The span is 16mA. At 12mA: (12-4)/16 = 8/16 = 50% of the measured range.',
  },
  {
    id: 7,
    question:
      'Which sensor type is most suitable for measuring chilled water flow rate in a large AHU?',
    options: [
      'Conduction, convection, radiation',
      'Output (V1 × I1 = V2 × I2)',
      'Energy Use Intensity (EUI)',
      'Electromagnetic flow meter',
    ],
    correctAnswer: 3,
    explanation:
      'Electromagnetic flow meters are ideal for chilled water as they have no moving parts, cause minimal pressure drop, and work well with conductive liquids. They provide accurate readings across a wide flow range and are suitable for large pipe diameters.',
  },
  {
    id: 8,
    question:
      'What is the typical accuracy specification for a building services grade temperature sensor?',
    options: [
      'Plus or minus 0.1 to 0.3 degrees C',
      'Plus or minus 1 to 2 degrees C',
      'Plus or minus 0.01 degrees C',
      'Plus or minus 5 degrees C',
    ],
    correctAnswer: 0,
    explanation:
      'Building services grade temperature sensors typically have accuracy of plus or minus 0.1 to 0.3 degrees C (Class A or Class B RTDs). This is sufficient for HVAC control where setpoint dead bands are usually 0.5 to 1 degrees C.',
  },
  {
    id: 9,
    question: 'Why is three-wire configuration preferred for Pt100 sensors over two-wire?',
    options: [
      'Plus or minus 0.1 to 0.3 degrees C',
      'It compensates for cable resistance',
      'Capacitive humidity sensor',
      'Electromagnetic flow meter',
    ],
    correctAnswer: 1,
    explanation:
      'Three-wire Pt100 configuration uses the third wire to measure and compensate for cable resistance. This is important because cable resistance adds directly to the sensor reading - 1 ohm of cable resistance causes approximately 2.5 degrees C error in a Pt100.',
  },
  {
    id: 10,
    question: 'What parameter does an ultrasonic flow meter measure to calculate flow rate?',
    options: [
      'Raise temperature without adding moisture',
      'RCD test gives inconsistent results',
      'Transit time difference of sound waves',
      'Inform the supervisor immediately',
    ],
    correctAnswer: 2,
    explanation:
      'Ultrasonic flow meters measure the transit time difference of ultrasonic pulses travelling with and against the flow. The difference in transit times is proportional to the flow velocity. They are non-invasive and suitable for large pipes.',
  },
  {
    id: 11,
    question: 'What is the purpose of a sensor averaging element in a large duct?',
    options: [
      'High starting torque of series and good speed regulation of shunt',
      'Upstream devices to wait for downstream to clear faults',
      'To ensure medical equipment and procedures can continue during power failures',
      'To measure temperature at multiple points and provide a representative average',
    ],
    correctAnswer: 3,
    explanation:
      'Sensor averaging elements (typically 3m or 6m long) measure temperature at multiple points across a duct cross-section. This provides a representative average reading in applications where temperature stratification may occur, such as after mixing boxes or coils.',
  },
  {
    id: 12,
    question:
      'A pressure transducer with 0.25% FS accuracy measuring 0-10 bar has what maximum error?',
    options: [
      '0.025 bar',
      '0.0025 bar',
      '2.5 bar',
      '0.25 bar',
    ],
    correctAnswer: 0,
    explanation:
      'Full Scale (FS) accuracy means the error is a percentage of the full measurement range. 0.25% of 10 bar = 0.025 bar maximum error, regardless of the actual reading. This is why sensors should be sized appropriately for the expected measurement range.',
  },
];

const faqs = [
  {
    question: 'What is the difference between accuracy and resolution in sensors?',
    answer:
      'Accuracy is how close a measurement is to the true value (e.g., plus or minus 0.2 degrees C), while resolution is the smallest change the sensor can detect (e.g., 0.01 degrees C). A sensor can have high resolution but poor accuracy if not calibrated correctly. For BMS applications, accuracy is typically more important than resolution for control purposes.',
  },
  {
    question: 'When should I use 4-20mA versus 0-10V signal outputs?',
    answer:
      'Use 4-20mA for long cable runs (greater than 15m), electrically noisy environments, or where cable resistance might vary. The 4mA live zero also allows detection of wire breaks. Use 0-10V for short runs, lower cost applications, or where the BMS only accepts voltage inputs. Many modern sensors offer both outputs.',
  },
  {
    question: 'How do I select the correct pressure sensor range for an application?',
    answer:
      'Select a range where normal operating pressure is 50-80% of full scale for best accuracy. For duct static pressure (typically 250-500Pa), use a 0-1000Pa sensor. For water systems, consider maximum pump head plus safety margin. Differential pressure sensors for filters should accommodate the clean and dirty pressure drop range.',
  },
  {
    question: 'Why do some temperature sensors require a specific immersion depth?',
    answer:
      'Immersion depth affects measurement accuracy as heat conducts along the sensor stem. For water temperature, immersion depth should be at least 10 times the sensor probe diameter to ensure the sensing element reaches true fluid temperature. Thermowells provide protection while maintaining thermal contact with the fluid.',
  },
  {
    question: 'What calibration records should be maintained for BMS sensors?',
    answer:
      "Records should include: sensor identification and location, calibration date, reference standard used (traceable to national standards), as-found and as-left readings, any adjustments made, next calibration due date, and the technician's signature. These records demonstrate compliance with quality management systems and building regulations.",
  },
  {
    question: 'How do I verify a sensor is working correctly without removing it?',
    answer:
      'Compare readings with portable reference instruments, check against other sensors measuring similar conditions, verify signal levels at the controller match expected values, look for drift or erratic readings over time in trend logs, and check for appropriate response to known changes (e.g., setpoint changes). Many BMS systems include sensor health diagnostics.',
  },
];

const HNCModule8Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 5 · Subsection 2"
            title="Sensors and Measurement"
            description="Understanding HVAC sensors: temperature, humidity, pressure, flow and air quality measurement for BMS integration"
            tone="purple"
          />

          <ConceptBlock title="Temperature Sensors">
            <p>Temperature is the most commonly measured parameter in HVAC systems. Accurate temperature measurement is essential for comfort control, energy efficiency and equipment protection. Different sensor technologies suit different applications.</p>
            <p><strong>Resistance Temperature Detectors (RTDs)</strong></p>
            <p>RTDs use the principle that metal resistance increases with temperature. Platinum is the most common material due to its stability, linearity and wide temperature range.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pt100:</strong> 100 ohms — -50 to +200 deg C — Standard HVAC, AHU coils</li>
              <li><strong>Pt1000:</strong> 1000 ohms — -50 to +200 deg C — Long cable runs, remote sensors</li>
              <li><strong>Ni1000:</strong> 1000 ohms — -50 to +150 deg C — Room sensors, lower cost</li>
            </ul>
            <p><strong>RTD Accuracy Classes (IEC 60751)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class AA:</strong> Plus or minus 0.1 deg C at 0 deg C - Laboratory grade</li>
              <li><strong>Class A:</strong> Plus or minus 0.15 deg C at 0 deg C - High accuracy HVAC</li>
              <li><strong>Class B:</strong> Plus or minus 0.3 deg C at 0 deg C - Standard HVAC applications</li>
              <li><strong>Class C:</strong> Plus or minus 0.6 deg C at 0 deg C - Non-critical applications</li>
            </ul>
            <p><strong>NTC Thermistors</strong></p>
            <p>Negative Temperature Coefficient (NTC) thermistors decrease in resistance as temperature rises. They offer high sensitivity but non-linear output requiring linearisation.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>10k NTC:</strong> 10,000 ohms at 25 deg C - Common room sensor type</li>
              <li><strong>High sensitivity:</strong> Large resistance change per degree</li>
              <li><strong>Non-linear:</strong> Requires lookup tables or linearisation</li>
              <li><strong>Lower cost:</strong> Suitable for mass-market applications</li>
            </ul>
            <p><strong>Thermocouples</strong></p>
            <p>Thermocouples generate a voltage (Seebeck effect) proportional to temperature difference between the measurement junction and reference junction. They suit high-temperature applications.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type K:</strong> Chromel-Alumel — -200 to +1350 deg C — Boilers, flue gases</li>
              <li><strong>Type J:</strong> Iron-Constantan — -40 to +750 deg C — Industrial heating</li>
              <li><strong>Type T:</strong> Copper-Constantan — -200 to +350 deg C — Low temperature, food</li>
            </ul>
            <p><strong>Wiring Configurations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2-wire:</strong> Simple but cable resistance adds to reading (not recommended for Pt100)</li>
              <li><strong>3-wire:</strong> Compensates for cable resistance - standard for Pt100 BMS applications</li>
              <li><strong>4-wire:</strong> Most accurate, eliminates cable effects - for laboratory/precision use</li>
            </ul>
            <p><strong>Selection tip:</strong> Use Pt1000 for cable runs greater than 20m to minimise cable resistance errors. Each 1 ohm cable resistance causes approximately 2.5 deg C error with Pt100 but only 0.25 deg C with Pt1000.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Humidity and Air Quality Sensors">
            <p>Humidity control is critical for comfort, health and building protection. CO2 sensors enable demand-controlled ventilation, optimising energy use while maintaining air quality.</p>
            <p><strong>Humidity Sensor Technologies</strong></p>
            <p><strong>Capacitive Sensors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Polymer film absorbs moisture</li>
              <li>Capacitance changes with humidity</li>
              <li>Accuracy: plus or minus 2-3% RH typical</li>
              <li>Most common in HVAC applications</li>
              <li>Good stability and response time</li>
            </ul>
            <p><strong>Resistive Sensors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conductive polymer changes resistance</li>
              <li>Lower cost than capacitive</li>
              <li>Accuracy: plus or minus 3-5% RH</li>
              <li>Less stable over time</li>
              <li>Suitable for non-critical applications</li>
            </ul>
            <p><strong>Humidity Sensor Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Range:</strong> 0-100% RH — Full range measurement</li>
              <li><strong>Accuracy:</strong> Plus or minus 2% RH — At 25 deg C, 10-90% RH</li>
              <li><strong>Long-term drift:</strong> Less than 1% RH/year — Affects calibration interval</li>
              <li><strong>Response time:</strong> Less than 30 seconds — To reach 63% of step change</li>
            </ul>
            <p><strong>CO2 Sensors for Demand-Controlled Ventilation</strong></p>
            <p>CO2 concentration indicates occupancy and air quality. Non-dispersive infrared (NDIR) sensors are standard for BMS applications, measuring CO2 absorption of infrared light.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outdoor air:</strong> Approximately 400-420 ppm (rising due to climate change)</li>
              <li><strong>Occupied spaces target:</strong> Less than 1000 ppm (800 ppm above outdoor)</li>
              <li><strong>Poor air quality:</strong> Greater than 1500 ppm - increase ventilation</li>
              <li><strong>Sensor range:</strong> 0-2000 ppm typical, 0-5000 ppm for high-occupancy</li>
              <li><strong>Accuracy:</strong> Plus or minus 50 ppm or plus or minus 3% of reading</li>
            </ul>
            <p><strong>CIBSE Guide A - Recommended CO2 Levels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category I (high expectation):</strong> Less than 550 ppm above outdoor</li>
              <li><strong>Category II (normal expectation):</strong> Less than 800 ppm above outdoor</li>
              <li><strong>Category III (moderate expectation):</strong> Less than 1350 ppm above outdoor</li>
            </ul>
            <p><strong>Installation tip:</strong> Mount CO2 sensors at breathing height (1.1-1.5m) away from doors, windows and supply air diffusers. Avoid locations near plants or areas where people congregate.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Pressure and Flow Sensors">
            <p>Pressure and flow measurement are fundamental to HVAC control. Pressure sensors monitor duct static pressure, filter condition and pump operation. Flow meters verify water and air flow rates.</p>
            <p><strong>Pressure Measurement Types</strong></p>
            <p><strong>Absolute</strong></p>
            <p>Referenced to perfect vacuum. Used for altitude compensation.</p>
            <p><strong>Gauge</strong></p>
            <p>Referenced to atmospheric pressure. Pump head, vessel pressure.</p>
            <p><strong>Differential</strong></p>
            <p>Difference between two points. Filter DP, duct static.</p>
            <p><strong>Pressure Transducer Technologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Piezoresistive:</strong> Strain gauges on silicon diaphragm - most common in HVAC</li>
              <li><strong>Capacitive:</strong> Diaphragm deflection changes capacitance - high accuracy</li>
              <li><strong>Piezoelectric:</strong> Crystal generates voltage - for dynamic pressure/vibration</li>
            </ul>
            <p><strong>HVAC Pressure Sensor Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Duct static pressure:</strong> Differential — 0-1000 Pa</li>
              <li><strong>Filter differential:</strong> Differential — 0-500 Pa</li>
              <li><strong>Room pressure:</strong> Differential — 0-100 Pa</li>
              <li><strong>LTHW/CHW system:</strong> Gauge — 0-10 bar</li>
              <li><strong>Pump differential:</strong> Differential — 0-6 bar</li>
            </ul>
            <p><strong>Flow Measurement Methods</strong></p>
            <p><strong>Air Flow</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pitot tube array:</strong> DP measurement across array</li>
              <li><strong>Thermal anemometer:</strong> Hot wire/film cooling rate</li>
              <li><strong>Vortex shedding:</strong> Frequency of vortices</li>
              <li><strong>Averaging element:</strong> Multiple sensing points</li>
            </ul>
            <p><strong>Water Flow</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electromagnetic:</strong> Conductive fluids, no moving parts</li>
              <li><strong>Ultrasonic:</strong> Transit time, clamp-on available</li>
              <li><strong>Turbine:</strong> Rotating impeller, pulse output</li>
              <li><strong>Orifice plate:</strong> DP across restriction</li>
            </ul>
            <p><strong>Flow-Pressure Relationship</strong></p>
            <p>For differential pressure flow measurement, flow is proportional to the square root of pressure:</p>
            <p>Q = k x sqrt(delta P)</p>
            <p>Where Q = flow rate, k = constant, delta P = differential pressure</p>
            <p><strong>Key point:</strong> Electromagnetic flow meters are preferred for chilled/heating water as they have no moving parts, minimal pressure drop, and work across wide flow ranges. Ensure adequate straight pipe lengths upstream (10 x diameter) and downstream (5 x diameter).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Signal Types, Accuracy and Calibration">
            <p>Understanding signal types, accuracy specifications and calibration requirements is essential for proper BMS integration and maintaining measurement quality over the sensor lifetime.</p>
            <p><strong>Analogue Signal Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>4-20mA:</strong> Noise immune, fault detection (0mA = break) — Requires loop power, higher cost — Long runs, noisy environments</li>
              <li><strong>0-10V DC:</strong> Simple, low cost, easy to measure — Susceptible to noise, voltage drop — Short runs, clean environments</li>
              <li><strong>2-10V DC:</strong> Live zero for fault detection — Less common, limited compatibility — Critical applications needing fault detection</li>
              <li><strong>Resistance:</strong> Direct connection, no transmitter — Cable resistance affects reading — RTDs, thermistors with short cables</li>
            </ul>
            <p><strong>4-20mA Signal Calculations</strong></p>
            <p><strong>Signal to Value</strong></p>
            <p>Value = ((mA - 4) / 16) x Span + Zero</p>
            <p>Example: 12mA on 0-100 deg C sensor = ((12-4)/16) x 100 + 0 = 50 deg C</p>
            <p><strong>Value to Signal</strong></p>
            <p>mA = ((Value - Zero) / Span) x 16 + 4</p>
            <p>Example: 75 deg C on 0-100 deg C sensor = ((75-0)/100) x 16 + 4 = 16mA</p>
            <p><strong>Understanding Accuracy Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Accuracy (% FS):</strong> Error as percentage of full scale range - applies at any reading</li>
              <li><strong>Accuracy (% reading):</strong> Error as percentage of actual reading - better at low readings</li>
              <li><strong>Resolution:</strong> Smallest detectable change - not the same as accuracy</li>
              <li><strong>Repeatability:</strong> Consistency of readings under same conditions</li>
              <li><strong>Hysteresis:</strong> Difference between increasing and decreasing readings</li>
              <li><strong>Drift:</strong> Change in accuracy over time - affects calibration interval</li>
            </ul>
            <p><strong>Accuracy Example</strong></p>
            <p>A pressure sensor has 0-10 bar range with 0.5% FS accuracy:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum error = 0.5% x 10 bar = <strong>0.05 bar</strong> at any reading</li>
              <li>At 8 bar reading: true value is 7.95 to 8.05 bar</li>
              <li>At 2 bar reading: true value is 1.95 to 2.05 bar (larger % error at low readings)</li>
            </ul>
            <p><strong>Calibration Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Traceability:</strong> Reference standards traceable to national standards (UKAS in UK)</li>
              <li><strong>Frequency:</strong> Typically 6-12 months for critical sensors, annually for standard</li>
              <li><strong>Documentation:</strong> As-found, as-left readings, date, reference used, technician</li>
              <li><strong>Adjustment:</strong> Zero and span adjustment if within tolerance, replace if not</li>
              <li><strong>Environment:</strong> Calibrate at conditions similar to installed environment</li>
            </ul>
            <p><strong>Calibration Procedure (General)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record sensor identification, location and current date</li>
              <li>Connect reference standard and allow stabilisation</li>
              <li>Record as-found readings at zero, mid and full scale</li>
              <li>Adjust zero offset if required</li>
              <li>Adjust span (gain) if required</li>
              <li>Record as-left readings at all test points</li>
              <li>Verify readings are within specification</li>
              <li>Apply calibration label and update records</li>
            </ul>
            <p><strong>Compliance note:</strong> For buildings with environmental controls (laboratories, hospitals, data centres), calibration records may be required for regulatory compliance. Maintain traceable records for audit purposes.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Sensor Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measurement range covers expected operating conditions with margin</li>
              <li>Accuracy suitable for control requirements (typically 3-5x better than deadband)</li>
              <li>Signal output compatible with BMS controller inputs</li>
              <li>Environmental rating (IP rating, temperature range) suitable for location</li>
              <li>Response time adequate for control loop dynamics</li>
              <li>Mounting method and cable length considered</li>
            </ul>
            <p>
              <strong>Troubleshooting Sensor Problems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Erratic readings:</strong> Check wiring, shielding, earthing. Look for electrical interference sources.</li>
              <li><strong>Offset error:</strong> Check zero calibration, thermal effects on wiring, reference junction compensation.</li>
              <li><strong>Slow response:</strong> Check for fouling, thermal mass of installation, air in pressure lines.</li>
              <li><strong>Drift over time:</strong> Normal ageing - recalibrate. Excessive drift may indicate contamination or damage.</li>
              <li><strong>0mA or 0V:</strong> Check power supply, wiring continuity, sensor failure.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Temperature:</strong> Insufficient immersion depth, thermal bridging from poor insulation</li>
                <li><strong>Humidity:</strong> Located in stagnant air, exposed to direct spray or condensation</li>
                <li><strong>Pressure:</strong> Impulse lines too long or not properly sloped, air trapped in liquid lines</li>
                <li><strong>Flow:</strong> Insufficient straight pipe lengths, air in water flow meters</li>
                <li><strong>CO2:</strong> Too close to supply diffusers, wrong height, drafty locations</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BMS fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Actuators and output devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_2;
