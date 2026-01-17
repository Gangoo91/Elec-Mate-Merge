import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section2QuizData } from "@/data/upskilling/bmsModule2Section2QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "temp-sensor-use",
    question: "Give one example of where a temperature sensor is used in a BMS.",
    options: [
      "Detecting occupancy in meeting rooms",
      "Measuring CO2 levels in classrooms",
      "Controlling chilled water temperature in HVAC systems",
      "Monitoring door security contacts"
    ],
    correctIndex: 2,
    explanation: "Temperature sensors are commonly used to monitor and control chilled water temperature in HVAC systems, ensuring optimal cooling performance and energy efficiency."
  },
  {
    id: "humidity-output",
    question: "What type of output signal do most humidity sensors provide?",
    options: [
      "Digital on/off switching only",
      "Analog signals (0-10V or 4-20mA)",
      "High-frequency pulse trains",
      "230V relay contact switching"
    ],
    correctIndex: 1,
    explanation: "Most humidity sensors provide analog output signals (0-10V or 4-20mA) that correspond to the relative humidity percentage, allowing precise monitoring and control by the BMS."
  },
  {
    id: "co2-ventilation",
    question: "Why does a BMS increase ventilation when CO2 levels rise?",
    options: [
      "To reduce energy consumption in the building",
      "To ensure good air quality and prevent drowsiness",
      "To lower the room temperature automatically",
      "To activate fire safety systems"
    ],
    correctIndex: 1,
    explanation: "When CO2 levels rise, it indicates poor air quality and insufficient fresh air. The BMS increases ventilation to bring in fresh air, maintaining good indoor air quality and preventing occupant drowsiness."
  },
  {
    id: "occupancy-sensor",
    question: "What type of sensor is commonly used to detect movement in offices?",
    options: [
      "Temperature sensor for heat detection",
      "PIR (Passive Infrared) sensor",
      "CO2 sensor for breathing detection",
      "Humidity sensor for air quality"
    ],
    correctIndex: 1,
    explanation: "PIR (Passive Infrared) sensors are commonly used to detect occupancy in offices. They detect movement by sensing changes in infrared radiation from warm bodies moving through their detection zone."
  }
];

const faqs = [
  {
    question: "How accurate are temperature sensors in BMS applications?",
    answer: "RTD sensors (Pt100/Pt1000) provide ±0.1°C to ±0.3°C accuracy. Thermistors typically achieve ±0.1°C to ±0.5°C. Choose based on application requirements - precision control needs higher accuracy."
  },
  {
    question: "Why are CO2 sensors important for energy efficiency?",
    answer: "CO2 sensors enable demand-controlled ventilation (DCV), providing only the ventilation needed based on actual occupancy rather than designed maximum. This can reduce ventilation energy by 20-40% while maintaining air quality."
  },
  {
    question: "What's the difference between PIR and ultrasonic occupancy sensors?",
    answer: "PIR detects body heat movement and is best for general occupancy. Ultrasonic uses sound waves and detects small movements like typing. Dual-technology sensors combine both for enhanced accuracy and reduced false triggers."
  },
  {
    question: "How often should BMS sensors be calibrated?",
    answer: "Temperature and humidity sensors: annually. CO2 sensors: every 2-3 years or as manufacturer recommends. Occupancy sensors: typically don't need calibration, but sensitivity may need adjustment after installation."
  }
];

const BMSModule2Section2 = () => {
  useSEO({
    title: "Types of Sensors | BMS Course",
    description: "Learn about temperature, humidity, CO2, and occupancy sensors in Building Management Systems. Understand sensor types, applications, wiring, and installation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Sensors
          </h1>
          <p className="text-white/80">
            Temperature, Humidity, CO2, and Occupancy Sensors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sensors:</strong> "Eyes and ears" of the BMS</li>
              <li><strong>Types:</strong> Temperature, humidity, CO2, occupancy</li>
              <li><strong>Output:</strong> Analog (0-10V, 4-20mA) or digital signals</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">On Site</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Position:</strong> Away from heat sources, draughts, direct sunlight</li>
              <li><strong>Wiring:</strong> Screened cables for analog, separate from mains</li>
              <li><strong>Calibrate:</strong> During commissioning using certified references</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the four main sensor types used in BMS applications",
              "Explain the purpose and operation of each sensor type",
              "Understand signal types and wiring requirements",
              "Recognise common applications and installation requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Temperature Sensors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Temperature Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature sensors measure air or water temperature and provide critical input to BMS for HVAC control,
              energy optimisation, and comfort management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Types</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Thermistors (NTC/PTC):</strong> Resistance changes with temperature, 10kΩ or 20kΩ at 25°C typical</li>
                <li><strong>RTDs (Pt100/Pt1000):</strong> Highly accurate platinum resistance, 100Ω or 1000Ω at 0°C</li>
                <li><strong>Thermocouples:</strong> High-temperature industrial applications, up to 1000°C+</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Specs</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Thermistor accuracy:</strong> ±0.1°C to ±0.5°C</li>
                  <li><strong>RTD accuracy:</strong> ±0.1°C (Class A), ±0.3°C (Class B)</li>
                  <li><strong>RTD wiring:</strong> 2-wire, 3-wire, or 4-wire configurations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Room temperature control</li>
                  <li>Chilled/heating water monitoring</li>
                  <li>Outside air compensation</li>
                  <li>Duct air temperature</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Wiring Best Practices</p>
              <ul className="text-sm text-white space-y-1">
                <li>Use twisted pair screened cable, minimum 0.5mm² for power</li>
                <li>3-wire RTD compensates for lead resistance, 4-wire is most accurate</li>
                <li>Keep separate from mains cables to prevent interference</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Humidity Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Humidity Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Humidity sensors measure relative humidity (RH) in air, providing essential data for comfort control,
              condensation prevention, and maintaining optimal indoor air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measure relative humidity (0-100% RH)</li>
                <li>Often combined with temperature sensors in single units</li>
                <li>Analog outputs typically 0–10V or 4–20mA</li>
                <li>Digital communication via Modbus or BACnet in advanced sensors</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Technologies</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Capacitive:</strong> Most common, ±2-3% RH accuracy</li>
                  <li><strong>Resistive:</strong> Lower cost, ±3-5% RH accuracy</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Condensation prevention (&lt;60% RH)</li>
                  <li>Dehumidification control</li>
                  <li>Humidification in winter</li>
                  <li>Energy optimisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Guidelines</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install away from direct air streams, heat sources, and moisture sources</li>
                <li>Representative of space conditions, typically 1.5m above floor level</li>
                <li>Protect from condensation, dust, and chemical contamination</li>
                <li>Use appropriate IP ratings for wet or dusty environments</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: CO2 Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CO2 Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CO2 sensors measure carbon dioxide levels in parts per million (ppm) and provide essential input for
              demand-controlled ventilation systems, ensuring good air quality and energy efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical CO2 Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Outside air:</strong> 400-450 ppm</li>
                  <li><strong>Good indoor:</strong> 400-700 ppm</li>
                  <li><strong>Acceptable:</strong> 700-1000 ppm</li>
                  <li><strong>Stuffy/drowsy:</strong> 1000-2000 ppm</li>
                  <li><strong>Poor quality:</strong> &gt;2000 ppm</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Setpoints</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ventilation increase:</strong> 1000 ppm</li>
                  <li><strong>Maximum ventilation:</strong> 1500 ppm</li>
                  <li><strong>Alarm level:</strong> 2000 ppm</li>
                  <li><strong>Immediate action:</strong> 5000 ppm</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Technology (NDIR)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Non-Dispersive Infrared — uses IR light absorption at 4.26μm wavelength</li>
                <li>Dual beam technology compensates for lamp aging and drift</li>
                <li>Auto-calibration (ABC) uses lowest reading over 7 days as baseline (~400ppm)</li>
                <li>Allow 30-60 minutes warm-up time for stable readings</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Installation Notes</p>
              <ul className="text-sm text-white space-y-1">
                <li>Install in return air paths or representative locations within occupied zones</li>
                <li>Avoid direct ventilation air streams and outdoor air intakes</li>
                <li>Calibrate using certified CO2 gas (typically 1000ppm and 2000ppm)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Occupancy Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Occupancy Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Occupancy sensors detect whether spaces are occupied and provide digital input signals to control
              lighting, HVAC, and security systems, helping reduce energy waste and improve building efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Technologies</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PIR (Passive Infrared):</strong> Detects body heat movement, most common type</li>
                <li><strong>Ultrasonic:</strong> Detects motion using sound waves, sensitive to small movements</li>
                <li><strong>Dual-Technology:</strong> Combines PIR and ultrasonic for enhanced accuracy</li>
                <li><strong>Microwave:</strong> High sensitivity, can detect through thin barriers</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PIR Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detection range: 5-20m typical</li>
                  <li>Coverage angle: 90° to 360°</li>
                  <li>Adjustable sensitivity threshold</li>
                  <li>Response time: 1-5 seconds</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automatic lighting control</li>
                  <li>HVAC setback in unoccupied spaces</li>
                  <li>Security after-hours detection</li>
                  <li>Energy management reporting</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Guidelines</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mounting height:</strong> PIR: 2.4-3.0m, Ultrasonic: 2.4-4.0m</li>
                <li>Account for dead zones behind furniture, ensure adequate overlap</li>
                <li>Avoid heat sources for PIR, consider air movement for ultrasonic</li>
                <li>Match sensor zones to lighting circuits and HVAC zones</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Delay Settings</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>On-delay:</strong> 0-30 seconds typical</li>
                <li><strong>Off-delay:</strong> 5-30 minutes based on application</li>
                <li>Longer delays for HVAC, shorter for lighting</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Practical Guidance Section */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Installation Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always confirm whether a sensor uses analog (0–10V, 4–20mA) or digital output before wiring</li>
                <li>Position sensors carefully — avoid direct sunlight, draughts, and obstructions</li>
                <li>Calibrate CO2 sensors during commissioning using certified calibration gases</li>
                <li>Label and record sensor locations, types, and settings for maintenance</li>
                <li>Keep sensor signal cables separate from mains power cables</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor placement:</strong> — CO2 sensors near windows give false low readings</li>
                <li><strong>Missing calibration:</strong> — uncalibrated sensors give inaccurate data</li>
                <li><strong>Wrong signal type:</strong> — wiring analog sensor to digital input</li>
                <li><strong>Environmental interference:</strong> — heat sources affecting temperature sensors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: School Ventilation System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A school installed CO2 sensors in classrooms to control ventilation for improved air quality.
              Initially, some sensors were placed too close to open windows, giving false low readings from
              the incoming fresh air.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">The Consequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ventilation fans did not activate when needed</li>
                  <li>Poor air quality during occupied periods</li>
                  <li>Students experienced drowsiness</li>
                  <li>Reduced concentration in afternoon classes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Solution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sensors repositioned away from windows</li>
                  <li>Located in return air paths</li>
                  <li>CO2 levels accurately detected</li>
                  <li>Appropriate ventilation triggered</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong>Key Lesson:</strong> Proper sensor placement is critical for system performance. Consider airflow
                patterns, external influences, and representative measurement locations during planning.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Temperature & Humidity</p>
              <ul className="space-y-0.5">
                <li>RTD: ±0.1-0.3°C accuracy, 2/3/4-wire</li>
                <li>Humidity: 0-100% RH, capacitive sensors</li>
                <li>Output: 0-10V or 4-20mA analog</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">CO2 & Occupancy</p>
              <ul className="space-y-0.5">
                <li>CO2: NDIR technology, 400-2000ppm range</li>
                <li>PIR: Body heat detection, 5-20m range</li>
                <li>Ultrasonic: Small movement detection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-2">
            {[
              "Temperature sensors (thermistors, RTDs) monitor air and water temperatures for HVAC control",
              "Humidity sensors prevent condensation and maintain comfort between 40-60% RH",
              "CO2 sensors enable demand-controlled ventilation based on actual occupancy",
              "Occupancy sensors reduce energy waste by controlling lighting and HVAC in unoccupied spaces",
              "Correct installation, positioning, and calibration are essential for accurate performance"
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section2QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section2;
