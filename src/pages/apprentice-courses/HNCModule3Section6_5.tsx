import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Controls and Building Automation - HNC Module 3 Section 6.5";
const DESCRIPTION = "Comprehensive coverage of Building Management Systems (BMS), control strategies, network protocols, and integration for energy-efficient building services.";

const quickCheckQuestions = [
  {
    id: "bms-primary-function",
    question: "What is the primary function of a Building Management System (BMS)?",
    options: ["Replace manual switches", "Monitor and control building services automatically", "Generate electricity", "Provide emergency lighting"],
    correctIndex: 1,
    explanation: "A BMS monitors and automatically controls building services (HVAC, lighting, security) to optimise energy use, maintain comfort, and reduce operational costs."
  },
  {
    id: "pid-controller",
    question: "In PID control, what does the 'I' (Integral) component address?",
    options: ["Immediate response to error", "Accumulated error over time", "Rate of change of error", "Maximum setpoint limit"],
    correctIndex: 1,
    explanation: "The Integral component addresses accumulated error over time, eliminating steady-state offset that proportional control alone cannot correct."
  },
  {
    id: "bacnet-protocol",
    question: "What type of protocol is BACnet?",
    options: ["Proprietary manufacturer protocol", "Open standard for building automation", "Residential-only protocol", "Power line carrier protocol"],
    correctIndex: 1,
    explanation: "BACnet (Building Automation and Control Networks) is an open, non-proprietary protocol specifically designed for building automation, enabling interoperability between different manufacturers' equipment."
  },
  {
    id: "optimum-start",
    question: "What does optimum start control achieve?",
    options: ["Immediate full heating on occupancy", "Pre-heats building to reach setpoint exactly at occupancy time", "Runs heating continuously", "Disables heating during peak hours"],
    correctIndex: 1,
    explanation: "Optimum start calculates the latest time to start heating/cooling so the building reaches the required temperature precisely when occupancy begins, avoiding wasted energy from starting too early."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the three main levels of a typical BMS architecture?",
    options: [
      "Sensor, actuator, and display",
      "Management, automation, and field level",
      "Input, processing, and output",
      "Local, regional, and national"
    ],
    correctAnswer: 1,
    explanation: "BMS architecture comprises: Management level (operator workstations, servers), Automation level (controllers, outstations), and Field level (sensors, actuators, final control elements)."
  },
  {
    id: 2,
    question: "A temperature sensor reads 18°C when the setpoint is 21°C. In a proportional controller with Kp = 2, what is the controller output percentage?",
    options: ["3%", "6%", "42%", "Cannot be calculated"],
    correctAnswer: 1,
    explanation: "Error = Setpoint - Measured = 21 - 18 = 3°C. Proportional output = Kp × Error = 2 × 3 = 6%. The controller outputs 6% demand to the heating system."
  },
  {
    id: 3,
    question: "Which network protocol operates at 9600 baud and uses master-slave communication?",
    options: ["BACnet IP", "KNX", "Modbus RTU", "LonWorks"],
    correctIndex: 2,
    explanation: "Modbus RTU operates over RS-485 at 9600 baud (or higher) using master-slave communication, where only the master initiates data exchanges."
  },
  {
    id: 4,
    question: "What is the typical supply voltage for KNX bus systems?",
    options: ["5V DC", "12V DC", "29V DC (nominal 30V)", "230V AC"],
    correctAnswer: 2,
    explanation: "KNX bus operates at 29V DC nominal (tolerance 21-30V). The bus provides both communication and power to devices, though high-power devices require separate mains supply."
  },
  {
    id: 5,
    question: "In HVAC control, what is 'dead band'?",
    options: [
      "A failed zone with no control",
      "A temperature range where neither heating nor cooling operates",
      "Maximum fan speed setting",
      "Emergency shutdown condition"
    ],
    correctAnswer: 1,
    explanation: "Dead band is a neutral zone between heating and cooling setpoints where neither operates, preventing rapid cycling. For example, heat below 20°C, cool above 24°C, dead band 20-24°C."
  },
  {
    id: 6,
    question: "What is the primary advantage of daylight harvesting in lighting control?",
    options: [
      "Increases lamp life only",
      "Reduces artificial lighting when natural daylight is sufficient",
      "Improves colour rendering",
      "Eliminates the need for emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses photocells to measure available daylight and dims artificial lighting accordingly, reducing energy consumption by 20-60% in perimeter zones while maintaining required illuminance levels."
  },
  {
    id: 7,
    question: "Which commissioning activity verifies that a BMS point displays the correct value?",
    options: ["Loop testing", "Point-to-point testing", "Trend logging", "Firmware update"],
    correctAnswer: 1,
    explanation: "Point-to-point testing verifies each BMS point by applying a known input (e.g., measured temperature) and confirming the BMS displays the correct value with proper engineering units and scaling."
  },
  {
    id: 8,
    question: "What does BEMS stand for and how does it differ from BMS?",
    options: [
      "Building Electrical Management System - focuses on electrical only",
      "Building Energy Management System - emphasises energy monitoring and optimisation",
      "Basic Emergency Management System - handles alarms only",
      "Broadband Energy Metering System - for utility billing"
    ],
    correctAnswer: 1,
    explanation: "BEMS (Building Energy Management System) emphasises energy monitoring, analysis, and optimisation features. While BMS focuses on control, BEMS adds energy dashboards, sub-metering, and analytics for energy reduction."
  },
  {
    id: 9,
    question: "Which sensor technology is most suitable for detecting occupancy in an open-plan office?",
    options: ["Magnetic reed switch", "Passive infrared (PIR) with microwave (dual-tech)", "Smoke detector", "Pressure mat"],
    correctAnswer: 1,
    explanation: "Dual-technology sensors combining PIR (detects movement via heat) and microwave (detects movement via Doppler) provide reliable occupancy detection in open-plan areas, reducing false triggers from HVAC drafts or small movements."
  },
  {
    id: 10,
    question: "What is the purpose of BACnet's 'COV' (Change of Value) service?",
    options: [
      "Continuous polling of all values",
      "Event-driven notification when a value changes significantly",
      "Overwriting corrupted data",
      "Verifying controller firmware"
    ],
    correctAnswer: 1,
    explanation: "COV (Change of Value) is an event-driven service where devices notify subscribers only when values change by a defined increment, reducing network traffic compared to continuous polling."
  }
];

const faqs = [
  {
    question: "What is the difference between BMS, BEMS, and BAS?",
    answer: "BMS (Building Management System) is the general term for automated building control systems. BEMS (Building Energy Management System) specifically emphasises energy monitoring and optimisation features. BAS (Building Automation System) is often used interchangeably with BMS, particularly in North America. All three describe systems that monitor and control HVAC, lighting, and other building services."
  },
  {
    question: "Why do some BMS installations use multiple protocols?",
    answer: "Legacy equipment may use older protocols (Modbus, LON) while newer devices support BACnet or KNX. Integration requires protocol gateways or multi-protocol controllers. Additionally, different subsystems may have evolved independently - lighting on DALI, HVAC on BACnet, security on proprietary protocols - requiring integration at the management level."
  },
  {
    question: "How do I select between BACnet MSTP and BACnet IP?",
    answer: "BACnet MS/TP uses RS-485 wiring (lower cost, limited distance/speed, up to 127 devices per segment), suitable for smaller installations or connecting field devices. BACnet IP uses Ethernet infrastructure (higher speed, unlimited distance with switches, leverages existing IT network), ideal for connecting controllers and management systems. Many installations use both: IP backbone with MS/TP field networks."
  },
  {
    question: "What commissioning documentation should be provided for a BMS?",
    answer: "Essential documentation includes: points list with all addresses and descriptions, control strategies and sequences of operation, network architecture diagrams, as-built schematics, commissioning test records, trend data proving control performance, operator training records, and maintenance procedures. BSRIA guides BG6 and BG49 provide detailed commissioning templates."
  },
  {
    question: "How does demand-controlled ventilation save energy?",
    answer: "Traditional ventilation runs at fixed rates regardless of occupancy. Demand-controlled ventilation uses CO2 sensors (proxy for occupancy) to modulate fresh air supply. In a meeting room occupied 4 hours daily, this can reduce ventilation energy by 60-80%. Combined with variable speed drives on fans, savings are substantial in commercial buildings."
  },
  {
    question: "What is the role of weather compensation in heating control?",
    answer: "Weather compensation adjusts heating water flow temperature based on external temperature. As outside temperature drops, flow temperature increases (and vice versa). This matches heat output to building heat loss, improving boiler efficiency (especially condensing boilers operating at lower return temperatures) and preventing overheating during mild weather."
  }
];

const HNCModule3Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 3.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Controls and Building Automation
          </h1>
          <p className="text-white/80">
            Intelligent systems for optimising energy use, comfort, and operational efficiency in modern buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BMS:</strong> Centralised monitoring and control of building services</li>
              <li className="pl-1"><strong>Control strategies:</strong> PID control, optimum start/stop, scheduling</li>
              <li className="pl-1"><strong>Protocols:</strong> BACnet, Modbus, KNX, DALI for interoperability</li>
              <li className="pl-1"><strong>Integration:</strong> HVAC, lighting, security unified management</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy savings:</strong> 15-30% reduction in operational costs</li>
              <li className="pl-1"><strong>Compliance:</strong> Part L, BREEAM, NABERS requirements</li>
              <li className="pl-1"><strong>Commissioning:</strong> Essential for achieving design performance</li>
              <li className="pl-1"><strong>Maintenance:</strong> Fault detection and diagnostic capabilities</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe BMS architecture and component functions",
              "Explain PID control theory and tuning principles",
              "Compare BACnet, Modbus, KNX and DALI protocols",
              "Design control strategies for HVAC and lighting systems",
              "Specify sensors for temperature, occupancy and light level",
              "Understand BMS commissioning and energy monitoring requirements"
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

        {/* Section 1: BMS Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Building Management Systems (BMS) Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System (BMS) is a computer-based control system that monitors and manages
              a building's mechanical and electrical equipment. Modern BMS installations integrate HVAC,
              lighting, fire systems, security, and energy metering into a unified management platform.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Architecture Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Components</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Management</td>
                      <td className="border border-white/10 px-3 py-2">Workstations, servers, web interface</td>
                      <td className="border border-white/10 px-3 py-2">Operator interface, data storage, analytics, reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Automation</td>
                      <td className="border border-white/10 px-3 py-2">Controllers, outstations, DDC panels</td>
                      <td className="border border-white/10 px-3 py-2">Execute control strategies, local processing, network communication</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Field</td>
                      <td className="border border-white/10 px-3 py-2">Sensors, actuators, valves, dampers</td>
                      <td className="border border-white/10 px-3 py-2">Measure conditions, execute control actions on plant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Key BMS Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Centralised monitoring and control</li>
                  <li className="pl-1">Automatic fault detection and alarms</li>
                  <li className="pl-1">Energy consumption tracking</li>
                  <li className="pl-1">Scheduled operation and optimisation</li>
                  <li className="pl-1">Historical trend logging and analysis</li>
                  <li className="pl-1">Remote access and management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Typical Systems Controlled</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">HVAC: AHUs, chillers, boilers, FCUs</li>
                  <li className="pl-1">Lighting: general, emergency, external</li>
                  <li className="pl-1">Metering: electricity, gas, water, heat</li>
                  <li className="pl-1">Fire: interface and status monitoring</li>
                  <li className="pl-1">Access control and security integration</li>
                  <li className="pl-1">Lifts and vertical transportation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry standard:</strong> BSRIA Guide BG6 provides comprehensive guidance on BMS design, commissioning, and operation for UK building services.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sensors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sensors: Temperature, Occupancy, Light Level
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sensors provide the input data that BMS controllers use to make control decisions. Selecting
              appropriate sensors with correct accuracy, range, and response time is critical for effective
              building automation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Sensors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Room sensor</td>
                      <td className="border border-white/10 px-3 py-2">NTC thermistor, Pt100/Pt1000</td>
                      <td className="border border-white/10 px-3 py-2">Space temperature control</td>
                      <td className="border border-white/10 px-3 py-2">±0.3°C to ±0.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duct sensor</td>
                      <td className="border border-white/10 px-3 py-2">Pt100 averaging element</td>
                      <td className="border border-white/10 px-3 py-2">Supply/return air temperature</td>
                      <td className="border border-white/10 px-3 py-2">±0.2°C to ±0.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe sensor</td>
                      <td className="border border-white/10 px-3 py-2">Pt100 pocket or strap-on</td>
                      <td className="border border-white/10 px-3 py-2">CHW/HHW flow temperature</td>
                      <td className="border border-white/10 px-3 py-2">±0.2°C to ±0.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outside air</td>
                      <td className="border border-white/10 px-3 py-2">Pt100/Pt1000 in housing</td>
                      <td className="border border-white/10 px-3 py-2">Weather compensation</td>
                      <td className="border border-white/10 px-3 py-2">±0.5°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Occupancy Sensors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PIR (Passive Infrared)</td>
                      <td className="border border-white/10 px-3 py-2">Body heat movement</td>
                      <td className="border border-white/10 px-3 py-2">Corridors, toilets, meeting rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Microwave</td>
                      <td className="border border-white/10 px-3 py-2">Doppler shift from movement</td>
                      <td className="border border-white/10 px-3 py-2">Areas requiring through-partition detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dual-tech (PIR + MW)</td>
                      <td className="border border-white/10 px-3 py-2">Both must trigger</td>
                      <td className="border border-white/10 px-3 py-2">Open-plan offices, reducing false triggers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic</td>
                      <td className="border border-white/10 px-3 py-2">Sound wave reflection</td>
                      <td className="border border-white/10 px-3 py-2">Partitioned spaces, cubicles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CO2 sensor (proxy)</td>
                      <td className="border border-white/10 px-3 py-2">Exhaled CO2 accumulation</td>
                      <td className="border border-white/10 px-3 py-2">Demand-controlled ventilation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Light Level Sensors (Photocells)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ceiling-mounted:</strong> Measure combined daylight and artificial light on working plane (typical 300-500 lux target)</li>
                <li className="pl-1"><strong>External:</strong> Measure external daylight for facade or blind control (0-100,000 lux range)</li>
                <li className="pl-1"><strong>Spectral response:</strong> Should match human eye response (photopic) for accurate lux measurement</li>
                <li className="pl-1"><strong>Calibration:</strong> Regular verification against calibrated lux meter recommended</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sensor placement:</strong> Position temperature sensors away from heat sources, draughts, and direct sunlight. Mount occupancy sensors to cover the required detection zone without obstructions.
            </p>
          </div>
        </section>

        {/* Section 3: Control Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Strategies: PID, Optimum Start/Stop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control strategies determine how the BMS responds to sensor inputs to maintain desired conditions.
              Understanding these strategies is essential for specifying, commissioning, and optimising building
              automation systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PID Control</p>
              <p className="text-sm text-white mb-3">
                PID (Proportional-Integral-Derivative) control is the most widely used feedback control algorithm.
                It calculates an error value as the difference between measured value and setpoint, then applies
                correction based on three terms:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P - Proportional</p>
                  <p className="text-white/70 text-xs">Output proportional to error</p>
                  <p className="text-white/90 text-xs mt-1">Responds immediately but leaves offset</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">I - Integral</p>
                  <p className="text-white/70 text-xs">Accumulates error over time</p>
                  <p className="text-white/90 text-xs mt-1">Eliminates steady-state error</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">D - Derivative</p>
                  <p className="text-white/70 text-xs">Rate of change of error</p>
                  <p className="text-white/90 text-xs mt-1">Anticipates and dampens overshoot</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PID Tuning Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proportional band (PB):</strong> Range over which output varies from 0-100%. Narrow PB = aggressive response</li>
                <li className="pl-1"><strong>Integral time (Ti):</strong> Time to repeat proportional action. Shorter Ti = faster error elimination</li>
                <li className="pl-1"><strong>Derivative time (Td):</strong> Time to anticipate error change. Often set to zero for HVAC (noise sensitivity)</li>
                <li className="pl-1"><strong>Rule of thumb:</strong> Start with P-only, add I to eliminate offset, add D only if oscillation persists</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Start/Stop Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Optimum Start</td>
                      <td className="border border-white/10 px-3 py-2">Calculates latest start time to reach setpoint at occupancy</td>
                      <td className="border border-white/10 px-3 py-2">Avoids over-early heating; adapts to thermal mass and weather</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Optimum Stop</td>
                      <td className="border border-white/10 px-3 py-2">Shuts down plant before end of occupancy using thermal storage</td>
                      <td className="border border-white/10 px-3 py-2">Utilises building thermal mass; reduces run hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Night Setback</td>
                      <td className="border border-white/10 px-3 py-2">Maintains minimum temperature (e.g., 12°C) overnight</td>
                      <td className="border border-white/10 px-3 py-2">Prevents frost damage; reduces morning preheat time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Free Cooling</td>
                      <td className="border border-white/10 px-3 py-2">Uses outside air for cooling when conditions permit</td>
                      <td className="border border-white/10 px-3 py-2">Reduces chiller operation; significant energy savings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Adaptive control:</strong> Modern optimum start algorithms learn building thermal characteristics over time, automatically adjusting preheat periods based on historical performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Network Protocols */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Network Protocols: BACnet, Modbus, KNX
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Communication protocols enable devices from different manufacturers to exchange data and work
              together. Selecting appropriate protocols affects system flexibility, cost, and long-term
              maintainability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Physical Layer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">BACnet</td>
                      <td className="border border-white/10 px-3 py-2">Open standard (ASHRAE/ISO)</td>
                      <td className="border border-white/10 px-3 py-2">HVAC, BMS integration</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet (IP), RS-485 (MS/TP)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Modbus</td>
                      <td className="border border-white/10 px-3 py-2">Open de facto standard</td>
                      <td className="border border-white/10 px-3 py-2">Metering, industrial equipment</td>
                      <td className="border border-white/10 px-3 py-2">RS-485 (RTU), Ethernet (TCP)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">KNX</td>
                      <td className="border border-white/10 px-3 py-2">Open standard (ISO/IEC)</td>
                      <td className="border border-white/10 px-3 py-2">Lighting, blinds, room control</td>
                      <td className="border border-white/10 px-3 py-2">Twisted pair, IP, RF, PLC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">DALI</td>
                      <td className="border border-white/10 px-3 py-2">Open standard (IEC 62386)</td>
                      <td className="border border-white/10 px-3 py-2">Lighting control</td>
                      <td className="border border-white/10 px-3 py-2">Two-wire bus (max 64 devices)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LonWorks</td>
                      <td className="border border-white/10 px-3 py-2">Open standard (ISO/IEC)</td>
                      <td className="border border-white/10 px-3 py-2">General building automation</td>
                      <td className="border border-white/10 px-3 py-2">Twisted pair, IP, power line</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Object-oriented data model (analog input, binary output, schedule, etc.)</li>
                  <li className="pl-1">Standard services: read/write property, COV, alarms, scheduling</li>
                  <li className="pl-1">Device interoperability profiles (BIBBs)</li>
                  <li className="pl-1">BTL certification for tested compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simple register-based data model</li>
                  <li className="pl-1">Master-slave communication</li>
                  <li className="pl-1">RTU: RS-485, up to 247 devices</li>
                  <li className="pl-1">TCP: Ethernet, port 502</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">KNX System Overview</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bus voltage:</strong> 29V DC (21-30V tolerance) supplied by KNX power supply</li>
                <li className="pl-1"><strong>Topology:</strong> Line, area, and backbone structure; 64 devices per line, 15 lines per area</li>
                <li className="pl-1"><strong>Addressing:</strong> Individual address (1.2.3) and group addresses for functions</li>
                <li className="pl-1"><strong>Programming:</strong> ETS (Engineering Tool Software) required for configuration</li>
                <li className="pl-1"><strong>Cable:</strong> Twisted pair, typically green LSZH sheathed, max 1000m per line</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always specify open protocols (BACnet, KNX, DALI) to avoid vendor lock-in and ensure long-term system flexibility and maintainability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: HVAC Control Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            HVAC Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HVAC systems represent the largest energy consumer in most commercial buildings. Effective
              control strategies can reduce HVAC energy consumption by 20-40% while maintaining or improving
              occupant comfort.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Handling Unit (AHU) Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Control Loop</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measured Variable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Controlled Element</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply air temperature</td>
                      <td className="border border-white/10 px-3 py-2">Duct temperature sensor</td>
                      <td className="border border-white/10 px-3 py-2">Heating/cooling valve, mixing dampers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply air pressure</td>
                      <td className="border border-white/10 px-3 py-2">Duct pressure sensor</td>
                      <td className="border border-white/10 px-3 py-2">Supply fan VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fresh air quantity</td>
                      <td className="border border-white/10 px-3 py-2">CO2 sensor, air flow station</td>
                      <td className="border border-white/10 px-3 py-2">Fresh air damper</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Room temperature</td>
                      <td className="border border-white/10 px-3 py-2">Room sensor</td>
                      <td className="border border-white/10 px-3 py-2">VAV box damper, reheat coil</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Humidity</td>
                      <td className="border border-white/10 px-3 py-2">Humidity sensor</td>
                      <td className="border border-white/10 px-3 py-2">Humidifier, cooling coil</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating System Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Weather compensation:</strong> Adjusts flow temperature based on external conditions</li>
                <li className="pl-1"><strong>Sequencing:</strong> Stages multiple boilers to meet load efficiently</li>
                <li className="pl-1"><strong>Return temperature limiting:</strong> Ensures condensing boiler operation</li>
                <li className="pl-1"><strong>Frost protection:</strong> Maintains minimum temperatures to prevent damage</li>
                <li className="pl-1"><strong>DHW priority:</strong> Prioritises domestic hot water heating when required</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chilled Water System Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load-based sequencing:</strong> Stages chillers to match building cooling load</li>
                <li className="pl-1"><strong>Supply temperature reset:</strong> Raises CHW temperature when full cooling not needed</li>
                <li className="pl-1"><strong>Free cooling:</strong> Uses cooling towers when wet bulb permits</li>
                <li className="pl-1"><strong>Differential pressure control:</strong> Modulates pump speed to maintain system delta-P</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dead Band and Changeover</p>
              <p className="text-sm text-white mb-2">
                Dead band prevents simultaneous heating and cooling (fighting), which wastes energy. Typical
                settings provide a 4°C neutral zone:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heating setpoint:</strong> 20°C - heating enabled below this</li>
                <li className="pl-1"><strong>Cooling setpoint:</strong> 24°C - cooling enabled above this</li>
                <li className="pl-1"><strong>Dead band:</strong> 20-24°C - neither heating nor cooling operates</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy consideration:</strong> Every 1°C reduction in heating setpoint or increase in cooling setpoint saves approximately 8-10% on HVAC energy consumption.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Lighting Control Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Lighting Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting control can reduce lighting energy consumption by 30-60% through occupancy sensing,
              daylight harvesting, scheduling, and task tuning. Integration with the BMS enables coordinated
              control with HVAC and security systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI (Digital Addressable Lighting Interface)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bus topology</td>
                      <td className="border border-white/10 px-3 py-2">Two-wire, polarity-independent, daisy-chain or star</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum devices</td>
                      <td className="border border-white/10 px-3 py-2">64 addresses per DALI line (drivers, sensors, switches)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dimming range</td>
                      <td className="border border-white/10 px-3 py-2">0.1-100% with logarithmic curve (matches human perception)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Groups/scenes</td>
                      <td className="border border-white/10 px-3 py-2">16 groups, 16 scenes per device</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI-2</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced standard with mandatory features, improved interoperability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Control Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Occupancy control:</strong> PIR/microwave sensors switch or dim lighting</li>
                  <li className="pl-1"><strong>Daylight harvesting:</strong> Photocells dim artificial lighting near windows</li>
                  <li className="pl-1"><strong>Time scheduling:</strong> Automated on/off based on building occupancy patterns</li>
                  <li className="pl-1"><strong>Task tuning:</strong> Set maximum output below 100% where full light not needed</li>
                  <li className="pl-1"><strong>Scene control:</strong> Pre-set combinations for different activities</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Energy Savings</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Occupancy sensing:</strong> 20-30% (offices), 40-60% (corridors/toilets)</li>
                  <li className="pl-1"><strong>Daylight harvesting:</strong> 20-40% (perimeter zones)</li>
                  <li className="pl-1"><strong>Time scheduling:</strong> 10-20% (depends on baseline)</li>
                  <li className="pl-1"><strong>Task tuning:</strong> 10-20% (when over-lit areas identified)</li>
                  <li className="pl-1"><strong>Combined strategies:</strong> 40-60% total reduction</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Integration</p>
              <p className="text-sm text-white mb-2">
                DALI emergency luminaires (Type 1) provide addressable monitoring and testing:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Automated function testing (monthly) and duration testing (annually)</li>
                <li className="pl-1">Battery and lamp status monitoring via DALI bus</li>
                <li className="pl-1">Automatic test logging for compliance documentation</li>
                <li className="pl-1">Rest mode: extinguish in mains-healthy condition to extend battery life</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Part L requires lighting controls in new non-domestic buildings. BREEAM credits available for metering, zoning, and occupant controls.
            </p>
          </div>
        </section>

        {/* Section 7: Integration and Interoperability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Integration and Interoperability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern buildings require integration between multiple systems - HVAC, lighting, security, fire,
              access control, and metering. Successful integration enables coordinated operation, unified
              monitoring, and enhanced energy management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Architecture</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Native protocol</td>
                      <td className="border border-white/10 px-3 py-2">Direct communication on same protocol</td>
                      <td className="border border-white/10 px-3 py-2">BACnet-to-BACnet device integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Protocol gateway</td>
                      <td className="border border-white/10 px-3 py-2">Translates between protocols</td>
                      <td className="border border-white/10 px-3 py-2">Modbus meter to BACnet BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hard-wired I/O</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contacts, 0-10V, 4-20mA</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm interface (status/trips)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">API/middleware</td>
                      <td className="border border-white/10 px-3 py-2">Software integration layer</td>
                      <td className="border border-white/10 px-3 py-2">Building analytics platforms, IoT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical System Integrations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fire alarm interface:</strong> BMS receives fire status, initiates smoke control, releases doors, activates smoke extract</li>
                <li className="pl-1"><strong>Security/access control:</strong> Occupancy data triggers HVAC and lighting modes; after-hours access activates local services</li>
                <li className="pl-1"><strong>Lighting and HVAC:</strong> Shared occupancy sensors; coordinated scheduling; lighting scenes trigger temperature setpoints</li>
                <li className="pl-1"><strong>Metering:</strong> Sub-metering data aggregated for tenant billing, energy dashboards, and automated M&T reports</li>
                <li className="pl-1"><strong>Lifts:</strong> Status monitoring, fault alarms, energy consumption tracking</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interoperability Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Protocol standardisation:</strong> Specify open protocols to enable multi-vendor integration</li>
                <li className="pl-1"><strong>Points list coordination:</strong> Define all integrated points, addresses, and data formats in specification</li>
                <li className="pl-1"><strong>Cybersecurity:</strong> Segment BMS networks; implement access control, encryption, and monitoring</li>
                <li className="pl-1"><strong>Testing:</strong> Factory acceptance testing (FAT) with simulated integration; site witness testing</li>
                <li className="pl-1"><strong>Documentation:</strong> System architecture diagrams, integration matrices, data flow documentation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification requirement:</strong> Include a detailed integration matrix in contract documents showing all system interfaces, protocols, responsible parties, and testing requirements.
            </p>
          </div>
        </section>

        {/* Section 8: Commissioning and Energy Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Commissioning BMS, Energy Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective BMS commissioning is essential to achieve design energy performance. Studies show
              that 15-30% of building energy is wasted due to poor commissioning and inadequate ongoing
              monitoring.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Commissioning Stages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Documentation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pre-commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Cable testing, power-on checks, software upload</td>
                      <td className="border border-white/10 px-3 py-2">Installation check sheets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Point-to-point</td>
                      <td className="border border-white/10 px-3 py-2">Verify each sensor/actuator displays/operates correctly</td>
                      <td className="border border-white/10 px-3 py-2">Points commissioning sheets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Loop testing</td>
                      <td className="border border-white/10 px-3 py-2">Verify control loops operate correctly (setpoint changes)</td>
                      <td className="border border-white/10 px-3 py-2">Control loop test records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Functional testing</td>
                      <td className="border border-white/10 px-3 py-2">Test sequences of operation, interlocks, alarms</td>
                      <td className="border border-white/10 px-3 py-2">Functional test scripts and results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Optimisation</td>
                      <td className="border border-white/10 px-3 py-2">Tune PID loops, adjust schedules, optimum start parameters</td>
                      <td className="border border-white/10 px-3 py-2">Trend logs, tuning records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Seasonal</td>
                      <td className="border border-white/10 px-3 py-2">Verify heating and cooling modes over full year</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning reports</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Monitoring Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sub-metering:</strong> Separate meters for major end uses (HVAC, lighting, small power, lifts, catering)</li>
                <li className="pl-1"><strong>Automatic meter reading:</strong> BMS polls meters (typically Modbus) for half-hourly data</li>
                <li className="pl-1"><strong>Energy dashboards:</strong> Real-time and historical consumption display</li>
                <li className="pl-1"><strong>Benchmarking:</strong> Compare performance against CIBSE TM46, DEC, NABERS benchmarks</li>
                <li className="pl-1"><strong>Automated M&T:</strong> Target setting, CUSUM analysis, exception reporting</li>
                <li className="pl-1"><strong>Tenant billing:</strong> Apportionment data for recoverable costs</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators (KPIs)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Energy Use Intensity:</strong> kWh/m²/year</li>
                  <li className="pl-1"><strong>Carbon intensity:</strong> kgCO2/m²/year</li>
                  <li className="pl-1"><strong>Baseload ratio:</strong> Out-of-hours vs occupied consumption</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Comfort compliance:</strong> % time within setpoint tolerance</li>
                  <li className="pl-1"><strong>System efficiency:</strong> COP, SEER for cooling plant</li>
                  <li className="pl-1"><strong>Run hours:</strong> Plant utilisation tracking</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings and Aftercare</p>
              <p className="text-sm text-white mb-2">
                BSRIA Soft Landings framework extends BMS commissioning with:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Extended aftercare:</strong> Design team involvement for first year of operation</li>
                <li className="pl-1"><strong>Post-occupancy evaluation:</strong> User satisfaction surveys and energy analysis</li>
                <li className="pl-1"><strong>Performance gap analysis:</strong> Compare predicted vs actual energy consumption</li>
                <li className="pl-1"><strong>Continuous improvement:</strong> Identify and implement energy saving opportunities</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry guidance:</strong> BSRIA BG6 (BMS Design Guide), BG49 (Soft Landings), and CIBSE TM63 (Operational Energy) provide comprehensive commissioning and energy monitoring guidance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: PID Controller Output Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A room temperature controller has setpoint 21°C, measured temperature 19°C, proportional band 4°C, and integral time 300 seconds. Calculate the proportional output.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Error = Setpoint - Measured = 21 - 19 = <strong>2°C</strong></p>
                <p className="mt-2">Proportional output = (Error / Proportional Band) × 100%</p>
                <p>= (2 / 4) × 100% = <strong>50% output</strong></p>
                <p className="mt-2 text-white/60">The heating valve opens to 50% position</p>
                <p className="text-white/60">Integral action will gradually increase output if error persists</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Daylight Harvesting Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 200m² perimeter zone has lighting load of 12 W/m². Daylight harvesting achieves 35% average dimming over 2,500 occupied hours. Calculate annual energy saving.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting load = 200m² × 12 W/m² = <strong>2,400W = 2.4kW</strong></p>
                <p className="mt-2">Without dimming: 2.4kW × 2,500h = 6,000 kWh/year</p>
                <p>With 35% average dimming: 6,000 × (1 - 0.35) = 3,900 kWh/year</p>
                <p className="mt-2">Annual saving = 6,000 - 3,900 = <strong>2,100 kWh/year</strong></p>
                <p className="mt-2 text-white/60">At £0.30/kWh = £630 annual cost saving</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Optimum Start Time Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Building requires 3 hours to preheat from 12°C to 21°C when outside temperature is 5°C. Occupancy starts at 08:00. When should heating start?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required preheat time = <strong>3 hours</strong></p>
                <p>Occupancy start = 08:00</p>
                <p className="mt-2">Heating start time = 08:00 - 3h = <strong>05:00</strong></p>
                <p className="mt-2 text-white/60">Adaptive algorithm adjusts based on:</p>
                <p className="text-white/60">- Actual external temperature (warmer = later start)</p>
                <p className="text-white/60">- Previous day's performance data</p>
                <p className="text-white/60">- Building thermal mass characteristics</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: CO2-Based Ventilation Saving</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A meeting room designed for 20 people typically has average occupancy of 8. Fresh air rate is 10 l/s/person. Calculate the ventilation reduction with demand control.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Design fresh air = 20 people × 10 l/s = <strong>200 l/s</strong></p>
                <p>Average actual need = 8 people × 10 l/s = <strong>80 l/s</strong></p>
                <p className="mt-2">Reduction = (200 - 80) / 200 × 100% = <strong>60% reduction</strong></p>
                <p className="mt-2 text-white/60">Plus fan energy savings (cube law):</p>
                <p className="text-white/60">Fan power at 40% = (0.4)³ = 6.4% of full power</p>
                <p className="text-white/60">Fan energy saving ≈ 93% during reduced occupancy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define open protocols (BACnet, KNX, DALI) for all major systems</li>
                <li className="pl-1">Include detailed points list with addresses, descriptions, and engineering units</li>
                <li className="pl-1">Specify control sequences of operation for all plant</li>
                <li className="pl-1">Define graphics requirements, alarm priorities, and trend logging</li>
                <li className="pl-1">Include integration matrix for all interfaced systems</li>
                <li className="pl-1">Specify commissioning requirements including seasonal testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Monitoring Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sub-meter major end uses: HVAC, lighting, small power, lifts, catering</li>
                <li className="pl-1">Collect half-hourly data minimum (15-minute for detailed analysis)</li>
                <li className="pl-1">Establish baselines and set reduction targets</li>
                <li className="pl-1">Monitor baseload (out-of-hours) consumption as key efficiency indicator</li>
                <li className="pl-1">Implement automated exception reporting for consumption anomalies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common BMS Problems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensor drift:</strong> Regular calibration checks essential, especially humidity sensors</li>
                <li className="pl-1"><strong>Control hunting:</strong> PID tuning required; check for oversized actuators</li>
                <li className="pl-1"><strong>Override abuse:</strong> Monitor and time-limit manual overrides</li>
                <li className="pl-1"><strong>Schedule drift:</strong> Regular review of time schedules against actual occupancy</li>
                <li className="pl-1"><strong>Integration failures:</strong> Gateway issues; protocol mismatches; address conflicts</li>
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
                <p className="font-medium text-white mb-1">BMS Architecture</p>
                <ul className="space-y-0.5">
                  <li>Management level - workstations, servers</li>
                  <li>Automation level - controllers, outstations</li>
                  <li>Field level - sensors, actuators</li>
                  <li>Open protocols: BACnet, KNX, DALI, Modbus</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Strategies</p>
                <ul className="space-y-0.5">
                  <li>PID: Proportional-Integral-Derivative</li>
                  <li>Optimum start/stop - adaptive preheat</li>
                  <li>Weather compensation - flow temp reset</li>
                  <li>Dead band - prevent heating/cooling conflict</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Protocol Selection</p>
                <ul className="space-y-0.5">
                  <li>BACnet - HVAC, BMS backbone</li>
                  <li>KNX - lighting, room controls</li>
                  <li>DALI - addressable lighting</li>
                  <li>Modbus - metering, industrial</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BSRIA BG6 - BMS design guide</li>
                  <li>BSRIA BG49 - Soft Landings</li>
                  <li>CIBSE TM63 - Operational energy</li>
                  <li>IEC 62386 - DALI standard</li>
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
            <Link to="../h-n-c-module3-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Motor and Lighting Design
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-6">
              Next: BS7671, CIBSE and Part L
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_5;
