import { ArrowLeft, Radio, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heating Controls - HNC Module 8 Section 1.5";
const DESCRIPTION = "Master heating control systems: weather compensation, optimum start/stop algorithms, zone control strategies, OpenTherm protocol, BMS integration, Building Regulations Part L, and Boiler Plus legislation.";

const quickCheckQuestions = [
  {
    id: "weather-compensation",
    question: "What does a weather compensator adjust based on outdoor temperature?",
    options: [
      "Room thermostat setpoint",
      "Boiler flow temperature",
      "Pump speed only",
      "Hot water cylinder temperature"
    ],
    correctIndex: 1,
    explanation: "Weather compensation adjusts the boiler flow temperature based on outdoor temperature. As it gets colder outside, the flow temperature increases; as it gets warmer, the flow temperature decreases. This reduces cycling and improves efficiency."
  },
  {
    id: "optimum-start",
    question: "What is the primary purpose of optimum start control?",
    options: [
      "To reduce boiler cycling",
      "To ensure the building reaches setpoint at occupancy time",
      "To maximise boiler efficiency",
      "To reduce hot water temperature"
    ],
    correctIndex: 1,
    explanation: "Optimum start calculates the latest time to start the heating system so the building reaches the desired temperature exactly when occupancy begins, saving energy by avoiding unnecessary pre-heating."
  },
  {
    id: "boiler-plus",
    question: "Which of the following is a requirement of the Boiler Plus legislation for combi boilers?",
    options: [
      "Minimum 90% efficiency",
      "Weather compensation OR load compensation OR smart thermostat with automation",
      "Mandatory BMS connection",
      "Zone control on all systems"
    ],
    correctIndex: 1,
    explanation: "Boiler Plus (England, from April 2018) requires combi boilers to have one of: weather compensation, load compensation, flue gas heat recovery, or a smart thermostat with automation and optimisation."
  },
  {
    id: "opentherm",
    question: "What advantage does OpenTherm communication provide over on/off control?",
    options: [
      "Faster boiler ignition",
      "Modulating control allowing variable boiler output",
      "Higher flow temperatures",
      "Reduced maintenance requirements"
    ],
    correctIndex: 1,
    explanation: "OpenTherm is a communication protocol that enables modulating control between the thermostat and boiler. Instead of on/off operation, the boiler can modulate its output to match demand, reducing cycling and improving comfort and efficiency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A heating curve relates outdoor temperature to:",
    options: [
      "Boiler cycling rate",
      "Boiler flow temperature setpoint",
      "Room temperature setpoint",
      "Hot water demand"
    ],
    correctAnswer: 1,
    explanation: "The heating curve (or weather compensation curve) defines the relationship between outdoor temperature and the required boiler flow temperature. Steeper curves are used for poorly insulated buildings."
  },
  {
    id: 2,
    question: "What factors does an optimum start controller typically consider?",
    options: [
      "Outdoor temperature and building thermal mass only",
      "Indoor temperature, outdoor temperature, and historical data",
      "Boiler size and radiator output only",
      "Fuel cost and time of day"
    ],
    correctAnswer: 1,
    explanation: "Modern optimum start controllers use indoor temperature, outdoor temperature, and historical data about how the building responds to heating to calculate the optimal start time."
  },
  {
    id: 3,
    question: "According to Building Regulations Part L, what is required for new heating systems in dwellings?",
    options: [
      "Zone control with at least 2 zones",
      "BMS integration",
      "Condensing boilers only",
      "Underfloor heating in all rooms"
    ],
    correctAnswer: 0,
    explanation: "Part L requires new and replacement heating systems to have independent time and temperature control of space heating and hot water, with zoning typically requiring at least 2 zones (living areas and bedrooms)."
  },
  {
    id: 4,
    question: "What is load compensation in heating controls?",
    options: [
      "Adjusting flow temperature based on difference between room and setpoint temperature",
      "Balancing the heating load across zones",
      "Compensating for electrical load on the system",
      "Adjusting for hot water demand"
    ],
    correctAnswer: 0,
    explanation: "Load compensation adjusts the boiler flow temperature based on the difference between actual room temperature and the setpoint. As the room approaches setpoint, flow temperature reduces, preventing overshoot."
  },
  {
    id: 5,
    question: "TRVs (Thermostatic Radiator Valves) provide:",
    options: [
      "Time control of heating",
      "Individual room temperature control",
      "Boiler interlock function",
      "Weather compensation"
    ],
    correctAnswer: 1,
    explanation: "TRVs provide individual room temperature control by modulating the flow of hot water to each radiator based on room temperature. They do not provide time control or boiler interlock."
  },
  {
    id: 6,
    question: "What is the purpose of boiler interlock in a heating system?",
    options: [
      "To prevent the boiler from firing when there is no demand",
      "To lock out the boiler during maintenance",
      "To prevent simultaneous heating and hot water",
      "To limit maximum flow temperature"
    ],
    correctAnswer: 0,
    explanation: "Boiler interlock ensures the boiler and pump only operate when there is a genuine heat demand. It's achieved by wiring controls so the boiler cannot fire unless a room thermostat, programmer, or zone valve calls for heat."
  },
  {
    id: 7,
    question: "Which BMS protocol uses a twisted pair cable for communication?",
    options: [
      "BACnet/IP",
      "Modbus TCP",
      "BACnet MS/TP",
      "LonWorks IP"
    ],
    correctAnswer: 2,
    explanation: "BACnet MS/TP (Master-Slave/Token-Passing) uses RS-485 twisted pair cabling. BACnet/IP and Modbus TCP use Ethernet infrastructure, while LonWorks can use various media."
  },
  {
    id: 8,
    question: "What is the typical setback temperature reduction for optimum stop control?",
    options: [
      "1-2 degrees Celsius below occupied setpoint",
      "5-10 degrees Celsius below occupied setpoint",
      "Down to 10 degrees Celsius minimum",
      "No setback - heating stops completely"
    ],
    correctAnswer: 1,
    explanation: "Optimum stop typically allows the temperature to drift down 5-10 degrees Celsius to an unoccupied setpoint. The building thermal mass maintains reasonable temperatures while saving energy."
  },
  {
    id: 9,
    question: "Smart heating controls with automation and optimisation must be capable of:",
    options: [
      "Manual programming only",
      "Learning occupant behaviour and adjusting schedules automatically",
      "Controlling hot water only",
      "Fixed time schedules with no adaptation"
    ],
    correctAnswer: 1,
    explanation: "To qualify under Boiler Plus, smart thermostats must have automation (learning schedules, geofencing) and optimisation (adjusting start times and temperatures to minimise energy use while maintaining comfort)."
  },
  {
    id: 10,
    question: "In a zoned heating system, what happens when one zone reaches setpoint?",
    options: [
      "The boiler turns off completely",
      "That zone's valve closes but other zones continue",
      "All zones reduce to setback temperature",
      "The pump stops for that zone only"
    ],
    correctAnswer: 1,
    explanation: "In a properly designed zoned system, when one zone reaches setpoint, its zone valve closes but other zones continue to receive heat if needed. The boiler only stops when all zones are satisfied."
  },
  {
    id: 11,
    question: "What is the typical heating curve gradient for a well-insulated modern building?",
    options: [
      "0.5 (shallow curve)",
      "1.0 (moderate curve)",
      "1.5-2.0 (steep curve)",
      "2.5-3.0 (very steep curve)"
    ],
    correctAnswer: 0,
    explanation: "Well-insulated buildings require lower flow temperatures and have shallower heating curves (0.5-0.8). Poorly insulated buildings need steeper curves (1.5-2.0) to deliver more heat at low outdoor temperatures."
  },
  {
    id: 12,
    question: "Which organisation developed the OpenTherm communication protocol?",
    options: [
      "ASHRAE",
      "CIBSE",
      "OpenTherm Association",
      "British Standards Institution"
    ],
    correctAnswer: 2,
    explanation: "The OpenTherm protocol was developed by the OpenTherm Association, a consortium of heating equipment manufacturers. It's an open standard for communication between thermostats and boilers."
  },
  {
    id: 13,
    question: "What is 'self-learning' in optimum start controllers?",
    options: [
      "The controller automatically updates its firmware",
      "The controller adapts its algorithms based on building response history",
      "The controller learns occupant preferences for temperature",
      "The controller connects to weather forecasts"
    ],
    correctAnswer: 1,
    explanation: "Self-learning optimum start controllers record how the building responds to heating under different conditions and use this data to refine their start time calculations, becoming more accurate over time."
  },
  {
    id: 14,
    question: "Under Part L, what minimum control is required for hot water systems?",
    options: [
      "Manual on/off only",
      "Cylinder thermostat and programmer with independent timing",
      "Thermostatic mixing valve only",
      "No specific requirement"
    ],
    correctAnswer: 1,
    explanation: "Part L requires hot water systems to have a cylinder thermostat (typically set at 60 degrees Celsius for Legionella control) and a programmer allowing independent timing of heating and hot water."
  }
];

const faqs = [
  {
    question: "What is the difference between weather compensation and load compensation?",
    answer: "Weather compensation adjusts boiler flow temperature based on outdoor temperature only - as outdoor temperature drops, flow temperature increases according to a heating curve. Load compensation adjusts flow temperature based on the difference between actual room temperature and setpoint - as the room approaches setpoint, flow temperature reduces to prevent overshoot. Some advanced controls combine both methods for optimal efficiency."
  },
  {
    question: "Do I need both TRVs and a room thermostat?",
    answer: "Yes, for Part L compliance and proper system operation. TRVs provide individual room temperature control, but you need at least one room thermostat in a reference room (usually the living room) without a TRV to provide boiler interlock. The room thermostat ensures the boiler only fires when there's demand, while TRVs regulate individual rooms."
  },
  {
    question: "How do I choose the correct heating curve for weather compensation?",
    answer: "The heating curve depends on building insulation level, emitter sizing, and design flow/return temperatures. Start with the manufacturer's recommended curve for your building type. Well-insulated buildings with correctly sized radiators need shallow curves (0.5-0.8). Older, poorly insulated buildings need steeper curves (1.5-2.0). Fine-tune by observing performance in cold weather - if rooms overheat, reduce the curve gradient."
  },
  {
    question: "What are the benefits of BMS integration for heating systems?",
    answer: "BMS integration provides centralised monitoring and control, energy logging and analysis, automatic fault detection and alerts, coordination with other building systems (ventilation, lighting), remote access and adjustment, trend logging for optimisation, and compliance reporting. For larger buildings, BMS integration typically delivers 10-20% energy savings through improved control strategies and identification of inefficiencies."
  },
  {
    question: "Is OpenTherm compatible with all boilers?",
    answer: "No, OpenTherm requires both the boiler and the thermostat to support the protocol. Many modern condensing boilers support OpenTherm, but older or basic models may only accept on/off control. Check boiler specifications for OpenTherm compatibility. If using an incompatible boiler, a relay can provide on/off control from an OpenTherm thermostat, but modulating benefits are lost."
  },
  {
    question: "What happens if the outdoor sensor fails on a weather compensation system?",
    answer: "Most weather compensation controllers have a fail-safe mode. They typically revert to a fixed flow temperature (often 60-70 degrees Celsius) or use a default outdoor temperature assumption. The system will continue to operate but less efficiently. Some controllers can use an estimated outdoor temperature based on return water temperature. Always replace faulty sensors promptly to restore efficient operation."
  }
];

const HNCModule8Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
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
            <Radio className="h-4 w-4" />
            <span>Module 8.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heating Controls
          </h1>
          <p className="text-white/80">
            Weather compensation, optimum start, zone control, BMS integration and smart heating technologies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Weather comp:</strong> Adjusts flow temp based on outdoor temperature</li>
              <li className="pl-1"><strong>Optimum start:</strong> Calculates latest start time for occupancy</li>
              <li className="pl-1"><strong>OpenTherm:</strong> Modulating control protocol for boilers</li>
              <li className="pl-1"><strong>Part L:</strong> Minimum 2 zones required for new systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Regulations</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Building Regs Part L:</strong> Conservation of fuel and power</li>
              <li className="pl-1"><strong>Boiler Plus:</strong> Enhanced controls for combi boilers</li>
              <li className="pl-1"><strong>BS EN 12828:</strong> Heating systems design</li>
              <li className="pl-1"><strong>CIBSE Guide H:</strong> Building control systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain weather compensation principles and heating curve selection",
              "Design optimum start/stop control strategies for buildings",
              "Apply Building Regulations Part L requirements for heating controls",
              "Understand Boiler Plus legislation and compliant solutions",
              "Implement zone control strategies for energy efficiency",
              "Integrate heating systems with BMS using standard protocols"
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

        {/* Section 1: Weather Compensation and Load Compensation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Weather Compensation and Load Compensation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compensated control systems adjust boiler flow temperature to match actual heating demand,
              rather than operating at a fixed high temperature. This reduces boiler cycling, improves
              condensing operation, and can deliver 10-15% energy savings compared to fixed temperature control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weather Compensation Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Outdoor sensor:</strong> Measures external temperature, typically mounted on north-facing wall</li>
                <li className="pl-1"><strong>Heating curve:</strong> Defines relationship between outdoor temp and flow temp setpoint</li>
                <li className="pl-1"><strong>Lower flow temps:</strong> Enable condensing boiler to operate in condensing mode more often</li>
                <li className="pl-1"><strong>Reduced cycling:</strong> Continuous modulation replaces on/off operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Heating Curve Selection</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white"><strong>Curve Gradient:</strong> Determines how flow temp responds to outdoor temp</p>
                <p className="text-white/70 mt-2">Building Type | Typical Curve Gradient</p>
                <p className="text-white">Well-insulated modern: 0.5 - 0.8</p>
                <p className="text-white">Standard insulation: 0.8 - 1.2</p>
                <p className="text-white">Poor insulation/oversized rads: 1.2 - 1.8</p>
                <p className="text-white">Very poor insulation: 1.8 - 2.5</p>
                <p className="text-green-400 mt-2">Example: At -5°C outdoor, curve 1.0 might set 55°C flow</p>
                <p className="text-green-400">Same conditions, curve 1.5 might set 70°C flow</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Compensation (Room Compensation)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Adjusts flow temperature based on room temperature feedback</li>
                <li className="pl-1">As room approaches setpoint, flow temperature reduces</li>
                <li className="pl-1">Prevents temperature overshoot and improves comfort</li>
                <li className="pl-1">Can be combined with weather compensation for optimal control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OpenTherm Protocol</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">On/Off Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">OpenTherm Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boiler modulation</td>
                      <td className="border border-white/10 px-3 py-2">No - full power or off</td>
                      <td className="border border-white/10 px-3 py-2">Yes - variable output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow temp control</td>
                      <td className="border border-white/10 px-3 py-2">Fixed at boiler</td>
                      <td className="border border-white/10 px-3 py-2">Controlled by thermostat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cycling frequency</td>
                      <td className="border border-white/10 px-3 py-2">High - frequent on/off</td>
                      <td className="border border-white/10 px-3 py-2">Low - continuous operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condensing efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Lower - high temps</td>
                      <td className="border border-white/10 px-3 py-2">Higher - lower temps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Diagnostic info</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2">Yes - fault codes, temps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Efficiency gain:</strong> OpenTherm with weather compensation can improve seasonal efficiency by 10-15% compared to basic on/off control with a fixed flow temperature.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Optimum Start/Stop and Time Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Optimum Start/Stop and Time Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Optimum start control calculates the latest time to start the heating system so the building
              reaches the desired temperature at the beginning of the occupancy period. This avoids wasting
              energy by starting heating too early, while ensuring comfort when occupants arrive.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Start Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Current indoor temperature</li>
                  <li className="pl-1">Required setpoint temperature</li>
                  <li className="pl-1">Outdoor temperature</li>
                  <li className="pl-1">Building thermal mass</li>
                  <li className="pl-1">Heating system capacity</li>
                  <li className="pl-1">Historical performance data</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Stop Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heating stops before end of occupancy</li>
                  <li className="pl-1">Building thermal mass maintains comfort</li>
                  <li className="pl-1">Typical stop 30-60 minutes early</li>
                  <li className="pl-1">Temperature drifts to setback level</li>
                  <li className="pl-1">Significant energy savings</li>
                  <li className="pl-1">Reduces peak demand</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Optimum Start Calculation Example</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white/60">Building parameters:</p>
                <p className="text-white">Occupancy starts: 08:00</p>
                <p className="text-white">Required temp: 21°C</p>
                <p className="text-white">Current indoor: 16°C</p>
                <p className="text-white">Outdoor temp: 2°C</p>
                <p className="text-white">Building heat-up rate: 1.5°C per hour (learned)</p>
                <p className="mt-2 text-white">Temperature rise needed: 21 - 16 = 5°C</p>
                <p className="text-white">Preheat time: 5 ÷ 1.5 = 3.3 hours</p>
                <p className="text-green-400 mt-2">Optimum start time: 08:00 - 3h 20min = 04:40</p>
                <p className="text-white/60">Without optimum start, might have started at 06:00 (fixed)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Learning Algorithms</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Controller records actual heat-up times under different conditions</li>
                <li className="pl-1">Builds a model of building thermal response</li>
                <li className="pl-1">Adapts to seasonal changes and building modifications</li>
                <li className="pl-1">Typically requires 2-4 weeks to optimise fully</li>
                <li className="pl-1">May use weather forecasts for predictive control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Control Requirements (Part L)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Space heating</td>
                      <td className="border border-white/10 px-3 py-2">Programmer with on/off times</td>
                      <td className="border border-white/10 px-3 py-2">7-day programming with optimum start</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hot water</td>
                      <td className="border border-white/10 px-3 py-2">Independent timing from heating</td>
                      <td className="border border-white/10 px-3 py-2">Separate programmer, cylinder stat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zones</td>
                      <td className="border border-white/10 px-3 py-2">Independent time control per zone</td>
                      <td className="border border-white/10 px-3 py-2">Zone programmers or multi-zone controller</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy saving:</strong> Optimum start/stop typically saves 5-10% of heating energy compared to fixed time schedules, with greater savings in heavyweight buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Zone Control and Building Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Zone Control and Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zone control divides a building into areas with independent temperature and time control.
              Building Regulations Part L requires new and replacement heating systems to include zoning,
              typically separating living areas from bedrooms, or different floors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Part L Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum 2 zones:</strong> For dwellings over 150m², separate heating zones required</li>
                <li className="pl-1"><strong>Independent control:</strong> Each zone needs independent time and temperature control</li>
                <li className="pl-1"><strong>Room thermostats:</strong> At least one in a zone without TRVs</li>
                <li className="pl-1"><strong>TRVs:</strong> Required on all radiators except in rooms with room thermostats</li>
                <li className="pl-1"><strong>Boiler interlock:</strong> Wiring must prevent boiler firing when no demand</li>
                <li className="pl-1"><strong>Hot water:</strong> Separate timing from space heating with cylinder thermostat</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Boiler Plus Legislation (England from April 2018)</p>
              <div className="text-sm space-y-2">
                <p><strong>Applies to:</strong> All gas and oil boiler installations in existing dwellings</p>
                <p><strong>Combi boilers must have one of:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1 mt-2">
                  <li className="pl-1">Weather compensation</li>
                  <li className="pl-1">Load compensation</li>
                  <li className="pl-1">Flue gas heat recovery system</li>
                  <li className="pl-1">Smart thermostat with automation and optimisation features</li>
                </ul>
                <p className="mt-2"><strong>System/regular boilers:</strong> Not currently required but recommended</p>
                <p className="text-orange-400 mt-2">Note: Scotland has its own Building Standards; Wales follows England</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zone Valve Types and Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Valve Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-port motorised</td>
                      <td className="border border-white/10 px-3 py-2">Open/closed, one per zone</td>
                      <td className="border border-white/10 px-3 py-2">Standard zone control, 22mm/28mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-port mid-position</td>
                      <td className="border border-white/10 px-3 py-2">A only, B only, or A+B</td>
                      <td className="border border-white/10 px-3 py-2">Heating/hot water selection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-port diverter</td>
                      <td className="border border-white/10 px-3 py-2">A only or B only (not both)</td>
                      <td className="border border-white/10 px-3 py-2">Priority DHW systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermostatic radiator valve</td>
                      <td className="border border-white/10 px-3 py-2">Modulates on room temp</td>
                      <td className="border border-white/10 px-3 py-2">Individual radiator control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Centre Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Central connection point for heating controls</li>
                <li className="pl-1">Provides boiler interlock through switched live circuit</li>
                <li className="pl-1">Coordinates zone valves, thermostats, and programmer</li>
                <li className="pl-1">Ensures pump runs only when zone valve is open</li>
                <li className="pl-1">Common types: 5-wire and 8-wire systems for S and Y plans</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">S Plan (2 x 2-port valves)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Separate valve for heating and hot water</li>
                  <li className="pl-1">Full independent control</li>
                  <li className="pl-1">Easy to expand with additional zones</li>
                  <li className="pl-1">Preferred for larger systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Y Plan (3-port mid-position)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single valve controls both circuits</li>
                  <li className="pl-1">Simpler installation</li>
                  <li className="pl-1">Mid-position allows simultaneous operation</li>
                  <li className="pl-1">Limited expansion options</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Always check local Building Control requirements. Replacement boilers must meet current Part L and Boiler Plus standards, even if the original system was compliant at installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: BMS Integration and Smart Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BMS Integration and Smart Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Management Systems (BMS) provide centralised monitoring and control of heating
              alongside other building services. Smart controls use connectivity and data analytics to
              optimise comfort and efficiency, meeting Boiler Plus requirements when properly specified.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Communication Protocols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Physical Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet (Cat5e/6)</td>
                      <td className="border border-white/10 px-3 py-2">Building-wide HVAC control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet MS/TP</td>
                      <td className="border border-white/10 px-3 py-2">RS-485 twisted pair</td>
                      <td className="border border-white/10 px-3 py-2">Field device connection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU</td>
                      <td className="border border-white/10 px-3 py-2">RS-485 twisted pair</td>
                      <td className="border border-white/10 px-3 py-2">Equipment monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus TCP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet</td>
                      <td className="border border-white/10 px-3 py-2">Plant room integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KNX</td>
                      <td className="border border-white/10 px-3 py-2">TP/RF/IP variants</td>
                      <td className="border border-white/10 px-3 py-2">Building automation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OpenTherm</td>
                      <td className="border border-white/10 px-3 py-2">2-wire connection</td>
                      <td className="border border-white/10 px-3 py-2">Thermostat-boiler interface</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Functions for Heating Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monitoring:</strong> Temperatures, valve positions, boiler status, energy consumption</li>
                <li className="pl-1"><strong>Control:</strong> Setpoints, schedules, optimum start, weather compensation</li>
                <li className="pl-1"><strong>Alarming:</strong> Fault detection, temperature excursions, equipment failures</li>
                <li className="pl-1"><strong>Trending:</strong> Historical data logging for analysis and reporting</li>
                <li className="pl-1"><strong>Integration:</strong> Coordination with ventilation, lighting, fire systems</li>
                <li className="pl-1"><strong>Remote access:</strong> Web interface, mobile apps, cloud connectivity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Smart Thermostat Features (Boiler Plus Compliant)</p>
              <div className="text-sm space-y-2">
                <p className="text-white"><strong>Automation features:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li className="pl-1">Learning algorithms that adapt to occupant behaviour</li>
                  <li className="pl-1">Geofencing using smartphone location</li>
                  <li className="pl-1">Occupancy detection via sensors</li>
                  <li className="pl-1">Integration with calendars and schedules</li>
                </ul>
                <p className="text-white mt-2"><strong>Optimisation features:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li className="pl-1">Weather-adjusted heating curves</li>
                  <li className="pl-1">Self-learning optimum start</li>
                  <li className="pl-1">Energy usage reporting and insights</li>
                  <li className="pl-1">OpenTherm modulation control</li>
                </ul>
                <p className="text-green-400 mt-2">Examples: Nest, Hive, tado, Honeywell T6R</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wireless Protocols</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Z-Wave (mesh)</li>
                  <li className="pl-1">Zigbee (mesh)</li>
                  <li className="pl-1">WiFi (direct)</li>
                  <li className="pl-1">RF (433/868MHz)</li>
                  <li className="pl-1">Thread/Matter</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cloud Services</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Remote access</li>
                  <li className="pl-1">Data storage</li>
                  <li className="pl-1">Firmware updates</li>
                  <li className="pl-1">Voice control</li>
                  <li className="pl-1">IFTTT integration</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Demand response</li>
                  <li className="pl-1">Load shifting</li>
                  <li className="pl-1">Grid services</li>
                  <li className="pl-1">Tariff optimisation</li>
                  <li className="pl-1">Solar integration</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cybersecurity Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Secure network segmentation for BMS systems</li>
                <li className="pl-1">Regular firmware updates and patching</li>
                <li className="pl-1">Strong authentication and access control</li>
                <li className="pl-1">Encrypted communications (TLS/SSL)</li>
                <li className="pl-1">GDPR compliance for occupancy/usage data</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> When specifying BMS integration, ensure heating equipment has the required communication interfaces. Many modern boilers support BACnet, Modbus, or OpenTherm natively; older equipment may need gateway devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Heating Curve Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select the heating curve for a 1990s semi-detached house with standard insulation and correctly sized radiators.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building characteristics:</p>
                <p className="mt-2">Construction: 1990s cavity wall with partial fill</p>
                <p>Insulation: Reasonable but not modern standards</p>
                <p>Radiators: Sized for 75/65/20°C (flow/return/room)</p>
                <p>Design outdoor temp: -3°C</p>
                <p className="mt-2">Curve selection:</p>
                <p>Standard insulation building: Curve gradient 0.8 - 1.2</p>
                <p>Select: <strong>Curve 1.0</strong> as starting point</p>
                <p className="mt-2">Expected performance:</p>
                <p>At -3°C outdoor: Flow temp ~55-60°C</p>
                <p>At +10°C outdoor: Flow temp ~35-40°C</p>
                <p className="text-green-400 mt-2">Adjust based on observation:</p>
                <p className="text-white/60">If rooms too cool in cold weather: Increase to 1.2</p>
                <p className="text-white/60">If rooms overheat: Decrease to 0.8</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Zone Valve Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size zone valves for a domestic S-plan system with heating and hot water zones.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System data:</p>
                <p className="mt-2">Heating load: 15kW</p>
                <p>Hot water cylinder: Indirect 180L</p>
                <p>Boiler flow rate: 1200 L/hr at delta-T 20K</p>
                <p className="mt-2">Heating zone flow calculation:</p>
                <p>Flow = Power / (4.2 x delta-T)</p>
                <p>Flow = 15000 / (4.2 x 20) = 179 L/hr</p>
                <p>Add 20% margin: 215 L/hr = 3.6 L/min</p>
                <p className="mt-2">Valve selection:</p>
                <p>Heating zone: 22mm 2-port valve (Kv = 2.5 to 4.0)</p>
                <p>Check pressure drop at 3.6 L/min is acceptable (&lt;10 kPa)</p>
                <p className="mt-2">Hot water zone:</p>
                <p>Coil load typically 3kW for 180L cylinder</p>
                <p>22mm valve adequate; 28mm if high recovery rate needed</p>
                <p className="text-green-400 mt-2">Result: 2 x 22mm zone valves (S-plan wiring)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Boiler Plus Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify compliant controls for a combi boiler installation in England.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Installation requirements:</p>
                <p className="mt-2">Boiler: 30kW combi with OpenTherm</p>
                <p>Property: 3-bed semi, single heating zone</p>
                <p>Customer request: Smart phone control</p>
                <p className="mt-2">Boiler Plus options:</p>
                <p>1. Weather compensation built into boiler</p>
                <p>2. Load compensating thermostat</p>
                <p>3. Smart thermostat with automation + optimisation</p>
                <p className="mt-2">Selected solution:</p>
                <p>Smart thermostat (e.g., tado, Nest, Hive)</p>
                <p className="mt-2">Verification checklist:</p>
                <p className="text-green-400">Has automation: Learning schedule/geofencing</p>
                <p className="text-green-400">Has optimisation: Weather-adjusted start times</p>
                <p className="text-green-400">OpenTherm compatible: Yes - modulating control</p>
                <p className="text-green-400">Part L compliant: Room stat + TRVs + boiler interlock</p>
                <p className="mt-2 text-white/60">Document compliance on certificate/handover</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: BMS Integration Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify BMS connection for a commercial boiler plant room.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Plant room equipment:</p>
                <p className="mt-2">2 x 200kW cascade boilers</p>
                <p>4 x Variable speed pumps</p>
                <p>Weather compensation controller</p>
                <p>8 x Zone control valves</p>
                <p className="mt-2">BMS requirements:</p>
                <p>Protocol: BACnet/IP at supervisory level</p>
                <p>Protocol: Modbus RTU for boiler interface</p>
                <p>Protocol: BACnet MS/TP for zone controllers</p>
                <p className="mt-2">Points list (per boiler):</p>
                <p>AI: Flow temp, return temp, outdoor temp, flue temp</p>
                <p>DI: Boiler run status, fault status, flame status</p>
                <p>AO: Flow temp setpoint, modulation demand</p>
                <p>DO: Enable/disable, reset</p>
                <p className="mt-2">Network architecture:</p>
                <p>Boilers &gt; Gateway (Modbus to BACnet)</p>
                <p>Gateway &gt; Building controller (BACnet/IP)</p>
                <p>Zone controllers &gt; MS/TP network &gt; Router &gt; BACnet/IP</p>
                <p className="text-green-400 mt-2">Specify: Graphics, trending, alarms, schedules, reports</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Control System Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm boiler communication capability (OpenTherm, on/off, Modbus)</li>
                <li className="pl-1">Check Part L zone control requirements for building size</li>
                <li className="pl-1">Verify Boiler Plus compliance option for combi installations</li>
                <li className="pl-1">Assess customer smartphone/smart home preferences</li>
                <li className="pl-1">Consider future BMS or smart home integration requirements</li>
                <li className="pl-1">Specify compatible wiring centre for zone valve configuration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Weather compensation saves: <strong>10-15%</strong> vs fixed temperature</li>
                <li className="pl-1">Optimum start saves: <strong>5-10%</strong> vs fixed schedules</li>
                <li className="pl-1">Part L minimum zones: <strong>2 zones</strong> for &gt;150m² dwellings</li>
                <li className="pl-1">Cylinder thermostat setting: <strong>60°C</strong> (Legionella control)</li>
                <li className="pl-1">Heating curve for modern builds: <strong>0.5-0.8</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No boiler interlock:</strong> Boiler fires even when no demand - wire controls correctly</li>
                <li className="pl-1"><strong>TRV in thermostat room:</strong> Causes control conflict - leave thermostat room without TRV</li>
                <li className="pl-1"><strong>Wrong heating curve:</strong> Too steep = overheating; too shallow = underheating</li>
                <li className="pl-1"><strong>Outdoor sensor location:</strong> Not north-facing or affected by sun/heat sources</li>
                <li className="pl-1"><strong>Ignoring Boiler Plus:</strong> Installations without compliant controls fail inspection</li>
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
                <p className="font-medium text-white mb-1">Control Strategies</p>
                <ul className="space-y-0.5">
                  <li>Weather comp: Flow temp vs outdoor temp</li>
                  <li>Load comp: Flow temp vs room temp error</li>
                  <li>Optimum start: Latest start for comfort at occupancy</li>
                  <li>OpenTherm: Modulating boiler control</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Regulatory Requirements</p>
                <ul className="space-y-0.5">
                  <li>Part L: 2+ zones, TRVs, boiler interlock</li>
                  <li>Boiler Plus: Compensation or smart controls</li>
                  <li>Cylinder stat: 60°C for Legionella</li>
                  <li>Independent HW timing required</li>
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
            <Link to="../h-n-c-module8-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Radiator Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1-6">
              Next: System Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_5;
