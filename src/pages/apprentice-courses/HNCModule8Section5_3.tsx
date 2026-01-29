import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Actuators and Output Devices - HNC Module 8 Section 5.3";
const DESCRIPTION = "Master actuators and output devices for BMS integration: valve actuators, damper actuators, modulating vs on/off control, control signals (0-10V, 2-10V), spring return mechanisms, torque requirements, and actuator sizing.";

const quickCheckQuestions = [
  {
    id: "valve-actuator-type",
    question: "What is the primary difference between a linear valve actuator and a rotary valve actuator?",
    options: ["Linear actuators are more expensive", "Linear actuators produce straight-line motion for globe valves, rotary actuators produce rotation for ball/butterfly valves", "Rotary actuators cannot be used for modulating control", "Linear actuators only work with on/off control"],
    correctIndex: 1,
    explanation: "Linear actuators produce straight-line (up/down) motion suited for globe and gate valves where the stem moves linearly. Rotary actuators produce rotational motion (typically 90°) suited for ball and butterfly valves where the disc or ball rotates to control flow."
  },
  {
    id: "spring-return-purpose",
    question: "What is the primary purpose of a spring return mechanism in a valve actuator?",
    options: ["To increase the actuator speed", "To reduce power consumption during normal operation", "To return the valve to a safe fail position on power loss or signal failure", "To provide modulating control capability"],
    correctIndex: 2,
    explanation: "Spring return actuators store mechanical energy in a spring during normal operation. On power loss or control signal failure, the spring drives the valve to a predetermined safe position (typically fully open or fully closed), ensuring fail-safe operation for critical HVAC applications."
  },
  {
    id: "control-signal-difference",
    question: "What is the key advantage of using a 2-10V control signal instead of 0-10V for modulating actuators?",
    options: ["2-10V signals are more accurate", "2-10V allows detection of cable faults since 0V indicates a broken connection", "2-10V actuators are cheaper", "2-10V provides faster response times"],
    correctIndex: 1,
    explanation: "With a 2-10V signal, the minimum valid control signal is 2V rather than 0V. If the signal drops to 0V, the BMS can detect this as a cable break or fault rather than a valid minimum position command. This provides important fault detection capability for critical applications."
  },
  {
    id: "damper-torque",
    question: "When sizing a damper actuator, what is the most critical parameter to calculate?",
    options: ["The voltage supply available", "The required torque based on damper area and static pressure", "The colour of the actuator housing", "The manufacturer's warranty period"],
    correctIndex: 1,
    explanation: "Damper actuator sizing is primarily determined by the torque required to operate the damper against the system static pressure. This is calculated from the damper area and the maximum static pressure differential, with appropriate safety factors applied."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 2-port modulating valve actuator is specified as 0-10V with 4mm stroke. What does the stroke measurement indicate?",
    options: [
      "The diameter of the actuator output shaft",
      "The linear travel distance of the valve stem from fully closed to fully open",
      "The maximum cable length for the control signal",
      "The response time in seconds"
    ],
    correctAnswer: 1,
    explanation: "Stroke indicates the linear travel distance of the valve stem. A 4mm stroke means the actuator moves the valve stem 4mm from the fully closed to fully open position. This must match the valve stroke requirement for proper control."
  },
  {
    id: 2,
    question: "What type of valve actuator motion is required for a butterfly valve?",
    options: ["Linear motion", "Rotary motion (typically 90°)", "Reciprocating motion", "Helical motion"],
    correctAnswer: 1,
    explanation: "Butterfly valves use a rotating disc to control flow, requiring 90° rotation from fully closed to fully open. A rotary actuator is therefore required to operate butterfly valves, unlike globe valves which require linear actuators."
  },
  {
    id: 3,
    question: "An actuator datasheet specifies 'running time 120 seconds'. What does this mean?",
    options: [
      "The actuator warranty is 120 seconds",
      "The time for the actuator to travel from fully closed to fully open (or vice versa)",
      "The actuator can only operate for 120 seconds continuously",
      "The minimum control signal pulse width required"
    ],
    correctAnswer: 1,
    explanation: "Running time (or stroke time) is the time taken for the actuator to complete its full travel range. A 120-second running time is typical for HVAC modulating actuators, providing smooth control without rapid hunting."
  },
  {
    id: 4,
    question: "What is the typical control signal range for a modulating damper actuator in a BMS system?",
    options: [
      "24V AC on/off",
      "0-10V DC or 2-10V DC analogue",
      "4-20mA only",
      "PWM at 1kHz"
    ],
    correctAnswer: 1,
    explanation: "Modulating damper actuators in BMS applications typically use 0-10V DC or 2-10V DC analogue control signals. The voltage corresponds proportionally to the damper position (e.g., 0V = 0% open, 10V = 100% open)."
  },
  {
    id: 5,
    question: "A spring return actuator is marked 'NO' (Normally Open). What position does the valve take on power failure?",
    options: [
      "The valve closes completely",
      "The valve opens completely",
      "The valve remains in its last position",
      "The valve moves to 50% position"
    ],
    correctAnswer: 1,
    explanation: "A Normally Open (NO) spring return actuator drives the valve to the fully open position when power is removed. The spring pushes the valve open, which is commonly used for heating valves to provide fail-safe heat during control system failures."
  },
  {
    id: 6,
    question: "When selecting a damper actuator, the calculation shows 8Nm torque is required. What minimum actuator torque should be specified?",
    options: [
      "8Nm exactly",
      "6Nm (20% below calculated)",
      "10Nm (25% above calculated)",
      "16Nm (100% above calculated)"
    ],
    correctAnswer: 2,
    explanation: "A safety factor of at least 25% should be applied to calculated torque requirements. For 8Nm calculated, specify minimum 10Nm actuator torque. This accounts for ageing, dirt build-up, and pressure fluctuations beyond design conditions."
  },
  {
    id: 7,
    question: "What is the primary advantage of a three-point floating control signal over analogue 0-10V?",
    options: [
      "More precise positioning",
      "Simpler wiring using open/close signals without position feedback",
      "Faster response time",
      "Lower power consumption"
    ],
    correctAnswer: 1,
    explanation: "Three-point floating control uses simple open/close/stop signals rather than analogue voltage, requiring only relay outputs from the controller. This is simpler and cheaper for basic applications where precise positioning is not critical."
  },
  {
    id: 8,
    question: "A BMS specification requires fail-safe heating. Which actuator configuration should be specified for the LTHW flow valve?",
    options: [
      "Non-spring return, normally closed",
      "Spring return, normally closed",
      "Spring return, normally open",
      "Non-spring return, normally open"
    ],
    correctAnswer: 2,
    explanation: "For fail-safe heating, the valve must open on power failure to maintain heat. A spring return normally open (NO) actuator ensures the heating valve opens if power or control signal is lost, preventing freeze conditions."
  },
  {
    id: 9,
    question: "What is the purpose of the anti-rotation feature on a linear valve actuator?",
    options: [
      "To prevent theft of the actuator",
      "To ensure the actuator body does not rotate, potentially damaging wiring or pipework",
      "To increase the actuator torque output",
      "To reduce the running time"
    ],
    correctAnswer: 1,
    explanation: "Anti-rotation mechanisms prevent the actuator body from rotating during operation. Without this, the reaction torque could twist the actuator, potentially damaging control wiring, feedback cables, or creating stress on pipework connections."
  },
  {
    id: 10,
    question: "A modulating actuator with position feedback provides a 2-10V signal back to the BMS. The BMS reads 6V. What position is the actuator indicating?",
    options: [
      "60% open",
      "50% open",
      "40% open",
      "75% open"
    ],
    correctAnswer: 1,
    explanation: "For a 2-10V position feedback signal: 2V = 0% (closed), 10V = 100% (open). The range is 8V. At 6V, the position is (6-2)/(10-2) × 100% = 4/8 × 100% = 50% open."
  },
  {
    id: 11,
    question: "What is the typical torque requirement per square metre of damper area for low-pressure air handling systems?",
    options: [
      "1-2 Nm/m²",
      "4-8 Nm/m²",
      "15-20 Nm/m²",
      "50-100 Nm/m²"
    ],
    correctAnswer: 1,
    explanation: "For low-pressure ductwork systems (up to 500Pa), the typical torque requirement is 4-8 Nm per square metre of damper area. Higher pressure systems require greater torque, and fire/smoke dampers may require 15+ Nm/m² due to higher friction."
  },
  {
    id: 12,
    question: "Why might a 24V AC actuator be preferred over a 230V AC actuator for HVAC applications?",
    options: [
      "24V actuators are more powerful",
      "Safety considerations - 24V is SELV (Safety Extra-Low Voltage), reducing electric shock risk",
      "24V actuators are always faster",
      "230V actuators cannot be used with BMS systems"
    ],
    correctAnswer: 1,
    explanation: "24V AC is a SELV (Safety Extra-Low Voltage) supply, significantly reducing electric shock risk during installation and maintenance. This is particularly important for actuators in accessible locations or where non-electrical personnel may work nearby."
  },
  {
    id: 13,
    question: "An on/off valve actuator is described as having 'synchronous motor' operation. What characteristic does this provide?",
    options: [
      "Variable speed control",
      "Consistent running time regardless of load, but no intermediate positioning",
      "Instant open/close operation",
      "Built-in position feedback"
    ],
    correctAnswer: 1,
    explanation: "Synchronous motor actuators run at a fixed speed determined by the AC supply frequency, providing consistent and predictable running times. However, they cannot stop at intermediate positions - they run to fully open or fully closed each time."
  },
  {
    id: 14,
    question: "What does 'close-off pressure rating' indicate for a valve actuator combination?",
    options: [
      "The maximum system static pressure",
      "The maximum differential pressure against which the actuator can fully close the valve",
      "The pressure at which the valve leaks",
      "The actuator housing pressure rating"
    ],
    correctAnswer: 1,
    explanation: "Close-off pressure rating is the maximum differential pressure across the valve against which the actuator can achieve tight shut-off. Exceeding this rating means the actuator cannot fully close the valve, leading to leakage and poor control."
  }
];

const faqs = [
  {
    question: "What is the difference between a 2-port and 3-port valve actuator application?",
    answer: "A 2-port valve has one inlet and one outlet, controlling flow through a single path - used for simple on/off or modulating flow control. A 3-port valve has three connections configured as either mixing (two inlets, one outlet) or diverting (one inlet, two outlets). Mixing valves blend two water streams to achieve a desired temperature, while diverting valves split flow between two destinations. The actuator mechanism is similar, but 3-port valves require more precise characterisation to achieve linear heat output versus position."
  },
  {
    question: "How do I calculate the torque required for a damper actuator?",
    answer: "Damper torque is calculated as: Torque (Nm) = Damper Area (m²) × Pressure (Pa) × Torque Factor. The torque factor accounts for damper type (typically 8-10 Nm/m² for opposed blade, 6-8 Nm/m² for parallel blade at low pressure). For a 0.5m × 0.8m damper at 500Pa: Area = 0.4m², Torque = 0.4 × 500 × 0.016 = 3.2Nm base, then apply safety factor of 25-50% = 4-5Nm minimum actuator specification. Always consult manufacturer data for specific damper types."
  },
  {
    question: "When should I specify spring return versus non-spring return actuators?",
    answer: "Spring return actuators are essential where fail-safe operation is required - typically heating valves (fail open to prevent freezing), cooling valves in data centres (fail open to maintain cooling), and fire/smoke dampers (fail to safe position). Non-spring return actuators are suitable where fail-in-place is acceptable or preferable, such as general ventilation dampers, and are typically lower cost with longer service life as the spring mechanism adds wear. Consider the consequences of control system failure when making this decision."
  },
  {
    question: "What causes actuator hunting and how can it be prevented?",
    answer: "Hunting occurs when an actuator continuously oscillates around the setpoint rather than settling at a stable position. Common causes include: oversized actuators with excessive torque, running times too fast for the control loop, poor controller tuning (excessive gain), incorrect valve sizing (oversized valve causing high gain), or mechanical issues like backlash. Solutions include selecting appropriate running time (90-120 seconds for HVAC), correct actuator and valve sizing, proper PID tuning, and ensuring tight mechanical linkages."
  },
  {
    question: "What is the difference between clockwise and anti-clockwise rotation specification for rotary actuators?",
    answer: "Rotary actuator rotation direction determines which way the output shaft turns when the control signal increases. This must match the valve or damper orientation. For example, a butterfly valve may require clockwise rotation to open when viewed from the actuator end. Specifying the wrong rotation direction means increasing control signal closes the valve instead of opening it, resulting in reversed control action. Always verify rotation direction with valve/damper manufacturer data and confirm during commissioning."
  },
  {
    question: "How do I interface a 4-20mA actuator with a 0-10V BMS output?",
    answer: "When the actuator requires 4-20mA but the BMS provides 0-10V, a signal converter is required. These converters are active devices requiring power (typically 24V DC) and perform voltage-to-current conversion. The 0-10V input produces proportional 4-20mA output. Ensure the converter has adequate accuracy (typically 0.5% or better) and response time for the application. Some modern actuators accept both signal types - check the datasheet before adding converters. Consider specifying matched signal types during design to avoid additional components."
  }
];

const HNCModule8Section5_3 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 8.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Actuators and Output Devices
          </h1>
          <p className="text-white/80">
            Valve actuators, damper actuators, control signal types, spring return mechanisms, and actuator sizing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Valve actuators:</strong> Linear (globe) or rotary (ball/butterfly)</li>
              <li className="pl-1"><strong>Control types:</strong> On/off (2-position) or modulating (proportional)</li>
              <li className="pl-1"><strong>Signals:</strong> 0-10V, 2-10V, 4-20mA, or three-point floating</li>
              <li className="pl-1"><strong>Safety:</strong> Spring return for fail-safe positioning</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Selection Criteria</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Torque:</strong> Must exceed load with 25% safety factor</li>
              <li className="pl-1"><strong>Stroke:</strong> Must match valve travel distance</li>
              <li className="pl-1"><strong>Running time:</strong> Typically 90-120 seconds for HVAC</li>
              <li className="pl-1"><strong>Supply:</strong> 24V AC (SELV) or 230V AC</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between linear and rotary valve actuator types",
              "Select appropriate actuators for modulating vs on/off control",
              "Understand 0-10V, 2-10V, and 4-20mA control signal applications",
              "Specify spring return actuators for fail-safe operation",
              "Calculate torque requirements for damper actuators",
              "Size actuators based on valve stroke and system requirements"
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

        {/* Section 1: Valve Actuator Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Valve Actuator Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Valve actuators convert electrical control signals into mechanical motion to position valves
              within HVAC systems. The actuator type must match both the valve mechanism and the required
              control precision. Understanding the differences between linear and rotary actuators is
              essential for correct specification.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Linear Valve Actuators</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Produce straight-line (up/down) motion</li>
                  <li className="pl-1">Used for: Globe valves, gate valves</li>
                  <li className="pl-1">Stroke: Typically 2.5mm to 40mm</li>
                  <li className="pl-1">Force output rated in Newtons (N)</li>
                  <li className="pl-1">Direct stem connection or yoke mounting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rotary Valve Actuators</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Produce rotational motion</li>
                  <li className="pl-1">Used for: Ball valves, butterfly valves</li>
                  <li className="pl-1">Rotation: Typically 90° (quarter-turn)</li>
                  <li className="pl-1">Torque output rated in Newton-metres (Nm)</li>
                  <li className="pl-1">Direct coupling to valve shaft</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Valve and Actuator Matching</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Valve Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Actuator Motion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-port globe valve</td>
                      <td className="border border-white/10 px-3 py-2">Linear</td>
                      <td className="border border-white/10 px-3 py-2">Stroke (mm), Force (N)</td>
                      <td className="border border-white/10 px-3 py-2">LTHW/CHW flow control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-port mixing valve</td>
                      <td className="border border-white/10 px-3 py-2">Linear</td>
                      <td className="border border-white/10 px-3 py-2">Stroke (mm), Force (N)</td>
                      <td className="border border-white/10 px-3 py-2">Temperature blending</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ball valve</td>
                      <td className="border border-white/10 px-3 py-2">Rotary 90°</td>
                      <td className="border border-white/10 px-3 py-2">Torque (Nm)</td>
                      <td className="border border-white/10 px-3 py-2">On/off isolation, 2-way control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Butterfly valve</td>
                      <td className="border border-white/10 px-3 py-2">Rotary 90°</td>
                      <td className="border border-white/10 px-3 py-2">Torque (Nm)</td>
                      <td className="border border-white/10 px-3 py-2">Large bore isolation, AHU coils</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Characterised ball valve</td>
                      <td className="border border-white/10 px-3 py-2">Rotary 90°</td>
                      <td className="border border-white/10 px-3 py-2">Torque (Nm)</td>
                      <td className="border border-white/10 px-3 py-2">Modulating control with equal percentage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Actuator Force and Stroke Requirements</p>
              <div className="text-sm space-y-1">
                <p>Linear actuator selection requires matching both parameters:</p>
                <p className="mt-2"><strong>Stroke:</strong> Must equal or exceed valve stem travel</p>
                <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                  <li className="pl-1">Small valves (DN15-25): Typically 5-10mm stroke</li>
                  <li className="pl-1">Medium valves (DN32-50): Typically 15-20mm stroke</li>
                  <li className="pl-1">Large valves (DN65+): Typically 20-40mm stroke</li>
                </ul>
                <p className="mt-2"><strong>Force:</strong> Must overcome valve close-off pressure</p>
                <p className="ml-4 text-white/70">Force (N) = Pressure (kPa) × Valve seat area (cm²) × 10</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Always verify actuator stroke matches valve requirement. An actuator with insufficient stroke will not fully open or close the valve, causing poor control and potential system issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Damper Actuators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Damper Actuators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Damper actuators control airflow in HVAC ductwork by positioning damper blades. Unlike valve
              actuators which deal with liquid pressure, damper actuators must overcome the resistance of
              damper blades against air static pressure and the friction of blade bearings and seals.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Damper actuator types by mounting:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct-coupled:</strong> Actuator mounts directly on damper shaft, no linkage required</li>
                <li className="pl-1"><strong>Crank arm/linkage:</strong> External actuator connected via mechanical linkage</li>
                <li className="pl-1"><strong>Jackshaft:</strong> Multiple dampers driven from single actuator via shaft and linkages</li>
                <li className="pl-1"><strong>Integral:</strong> Actuator built into damper assembly as complete unit</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Damper Actuator Torque Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Damper Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Static Pressure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Torque Factor (Nm/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Opposed blade (low pressure)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;500 Pa</td>
                      <td className="border border-white/10 px-3 py-2">4-8</td>
                      <td className="border border-white/10 px-3 py-2">Standard ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Opposed blade (medium pressure)</td>
                      <td className="border border-white/10 px-3 py-2">500-1000 Pa</td>
                      <td className="border border-white/10 px-3 py-2">8-12</td>
                      <td className="border border-white/10 px-3 py-2">VAV systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Parallel blade</td>
                      <td className="border border-white/10 px-3 py-2">&lt;500 Pa</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">2-position isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire/smoke damper</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">High friction seals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-pressure industrial</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1000 Pa</td>
                      <td className="border border-white/10 px-3 py-2">12-20</td>
                      <td className="border border-white/10 px-3 py-2">Process applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Torque Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Given:</span></p>
                <p className="ml-4">Damper size: 600mm × 400mm opposed blade</p>
                <p className="ml-4">System static pressure: 400 Pa</p>
                <p className="ml-4">Damper condition: Standard HVAC, clean</p>
                <p className="mt-2"><span className="text-white/60">Calculation:</span></p>
                <p className="ml-4">Damper area = 0.6m × 0.4m = 0.24 m²</p>
                <p className="ml-4">Torque factor (low pressure opposed blade) = 6 Nm/m²</p>
                <p className="ml-4">Base torque = 0.24 × 6 = 1.44 Nm</p>
                <p className="ml-4">Safety factor (25%) = 1.44 × 1.25 = 1.8 Nm</p>
                <p className="mt-2 text-green-400">Specify: Minimum 2 Nm actuator (next standard size up)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Direct-Coupled Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No mechanical linkage = no backlash</li>
                  <li className="pl-1">Simpler installation and adjustment</li>
                  <li className="pl-1">More accurate positioning</li>
                  <li className="pl-1">Lower maintenance requirements</li>
                  <li className="pl-1">Standard for BMS-controlled dampers</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Linkage Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Large dampers requiring high torque</li>
                  <li className="pl-1">Multiple dampers from one actuator</li>
                  <li className="pl-1">Retrofit installations with space constraints</li>
                  <li className="pl-1">Fire dampers with external actuation</li>
                  <li className="pl-1">Jackshaft systems for face/bypass</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation note:</strong> Direct-coupled actuators must be correctly oriented on the damper shaft. Most have a rotation direction marking - verify this matches the required open/close action before final fixing.
            </p>
          </div>
        </section>

        {/* Section 3: Control Signal Types and Modulating vs On/Off */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Signals: Modulating vs On/Off
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Actuators receive control signals from the BMS to determine their position. The control type -
              on/off (two-position) or modulating (proportional) - fundamentally affects system performance,
              energy efficiency, and comfort. Understanding the available signal types enables correct
              specification for each application.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">On/Off (Two-Position) Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Valve/damper is either fully open or fully closed</li>
                  <li className="pl-1">Controlled by simple relay contact (24V AC)</li>
                  <li className="pl-1">Lower cost actuator and controller</li>
                  <li className="pl-1">Causes temperature cycling (swing)</li>
                  <li className="pl-1">Used for: Zone isolation, on/off loads</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modulating (Proportional) Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Valve/damper positions anywhere 0-100%</li>
                  <li className="pl-1">Analogue signal (0-10V, 2-10V, 4-20mA)</li>
                  <li className="pl-1">Precise temperature/flow control</li>
                  <li className="pl-1">Eliminates cycling, improves comfort</li>
                  <li className="pl-1">Used for: AHU coils, VAV boxes, FCUs</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analogue Control Signal Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Detection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wiring</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-10V DC</td>
                      <td className="border border-white/10 px-3 py-2">0V = 0%, 10V = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Limited (0V valid)</td>
                      <td className="border border-white/10 px-3 py-2">2-core screened</td>
                      <td className="border border-white/10 px-3 py-2">Standard HVAC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-10V DC</td>
                      <td className="border border-white/10 px-3 py-2">2V = 0%, 10V = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Good (0V = fault)</td>
                      <td className="border border-white/10 px-3 py-2">2-core screened</td>
                      <td className="border border-white/10 px-3 py-2">Critical systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-20mA</td>
                      <td className="border border-white/10 px-3 py-2">4mA = 0%, 20mA = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Good (0mA = fault)</td>
                      <td className="border border-white/10 px-3 py-2">2-core screened, loop</td>
                      <td className="border border-white/10 px-3 py-2">Long distances, noisy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-point floating</td>
                      <td className="border border-white/10 px-3 py-2">Open/Close/Stop</td>
                      <td className="border border-white/10 px-3 py-2">Limited</td>
                      <td className="border border-white/10 px-3 py-2">3-core + common</td>
                      <td className="border border-white/10 px-3 py-2">Simple systems, retrofit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">0-10V vs 2-10V: The Critical Difference</p>
              <div className="text-sm space-y-2">
                <p><strong>0-10V signal:</strong></p>
                <p className="ml-4">0V = Actuator at 0% position (fully closed)</p>
                <p className="ml-4">Problem: If cable breaks, signal = 0V, same as valid minimum position</p>
                <p className="ml-4">BMS cannot distinguish between "drive to 0%" and "cable fault"</p>
                <p className="mt-2"><strong>2-10V signal:</strong></p>
                <p className="ml-4">2V = Actuator at 0% position (fully closed)</p>
                <p className="ml-4">If cable breaks, signal = 0V, which is below valid range</p>
                <p className="ml-4 text-green-400">BMS detects 0V as fault condition and can raise alarm</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Point Floating Control</p>
              <div className="text-sm text-white space-y-2">
                <p>
                  Three-point floating control uses three wires: Open, Close, and Common. The controller
                  energises the Open or Close wire to drive the actuator in the required direction. When
                  neither is energised, the actuator stops at its current position.
                </p>
                <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                  <li className="pl-1">Open wire energised: Actuator drives towards open</li>
                  <li className="pl-1">Close wire energised: Actuator drives towards closed</li>
                  <li className="pl-1">Neither energised: Actuator holds position</li>
                  <li className="pl-1">Controller estimates position by timing (no feedback)</li>
                </ul>
                <p className="mt-2 text-white/70">
                  Advantage: Uses simple relay outputs, no analogue channels required.
                  Disadvantage: Less precise, requires periodic recalibration to end stops.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> For critical applications (hospital wards, data centres, clean rooms), always specify 2-10V control signals to enable cable fault detection and improve system reliability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Spring Return and Actuator Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Spring Return, Fail-Safe, and Sizing Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fail-safe operation is critical in HVAC systems. Spring return actuators ensure valves and
              dampers move to a predetermined safe position on power failure or control signal loss. Correct
              sizing ensures the actuator can reliably operate the valve or damper throughout its service life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Spring return configurations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Normally Open (NO):</strong> Spring drives valve open on power loss - used for heating</li>
                <li className="pl-1"><strong>Normally Closed (NC):</strong> Spring drives valve closed on power loss - used for cooling, steam</li>
                <li className="pl-1"><strong>Non-spring return:</strong> Actuator holds last position on power loss - used where safe</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fail-Safe Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fail Position</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Actuator Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW heating valve</td>
                      <td className="border border-white/10 px-3 py-2">Open</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NO</td>
                      <td className="border border-white/10 px-3 py-2">Prevent freeze damage, maintain warmth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW cooling valve</td>
                      <td className="border border-white/10 px-3 py-2">Closed</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NC</td>
                      <td className="border border-white/10 px-3 py-2">Prevent overcooling, condensation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre cooling</td>
                      <td className="border border-white/10 px-3 py-2">Open</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NO</td>
                      <td className="border border-white/10 px-3 py-2">Maintain cooling for equipment protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steam valve</td>
                      <td className="border border-white/10 px-3 py-2">Closed</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NC</td>
                      <td className="border border-white/10 px-3 py-2">Safety - prevent uncontrolled steam flow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fresh air damper</td>
                      <td className="border border-white/10 px-3 py-2">Closed</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NC</td>
                      <td className="border border-white/10 px-3 py-2">Prevent uncontrolled outside air ingress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire/smoke damper</td>
                      <td className="border border-white/10 px-3 py-2">Closed</td>
                      <td className="border border-white/10 px-3 py-2">Spring return NC</td>
                      <td className="border border-white/10 px-3 py-2">Fire compartmentation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General ventilation damper</td>
                      <td className="border border-white/10 px-3 py-2">Last position</td>
                      <td className="border border-white/10 px-3 py-2">Non-spring return</td>
                      <td className="border border-white/10 px-3 py-2">No safety-critical fail position</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Sizing Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">For Valve Actuators:</p>
                  <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Stroke ≥ valve stem travel</li>
                    <li className="pl-1">Force ≥ close-off pressure requirement × 1.25</li>
                    <li className="pl-1">Running time appropriate for control loop</li>
                    <li className="pl-1">Supply voltage matches available power</li>
                    <li className="pl-1">Control signal compatible with BMS output</li>
                    <li className="pl-1">Fail position (spring return if required)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">For Damper Actuators:</p>
                  <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Torque ≥ calculated requirement × 1.25</li>
                    <li className="pl-1">Rotation angle matches damper (usually 90°)</li>
                    <li className="pl-1">Mounting type compatible (direct/linkage)</li>
                    <li className="pl-1">Running time suits application</li>
                    <li className="pl-1">Control signal matches BMS</li>
                    <li className="pl-1">Position feedback if required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Running Time Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Running Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Characteristic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-30 seconds</td>
                      <td className="border border-white/10 px-3 py-2">On/off actuators, quick-acting</td>
                      <td className="border border-white/10 px-3 py-2">Fast response, may cause hunting if used for modulating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60-90 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Fast modulating, small systems</td>
                      <td className="border border-white/10 px-3 py-2">Good response, suits tight control loops</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90-120 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Standard HVAC modulating</td>
                      <td className="border border-white/10 px-3 py-2">Smooth control, prevents hunting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">150-240 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Large dampers, high inertia systems</td>
                      <td className="border border-white/10 px-3 py-2">Stable control, slower response</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Sizing Errors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized torque:</strong> Actuator struggles or fails to move damper against pressure</li>
                <li className="pl-1"><strong>Oversized actuator:</strong> Can damage valve/damper, wastes energy, causes hunting</li>
                <li className="pl-1"><strong>Wrong stroke:</strong> Valve does not fully open or close, poor control</li>
                <li className="pl-1"><strong>Too fast running time:</strong> Causes control instability and hunting</li>
                <li className="pl-1"><strong>Wrong fail position:</strong> System fails to unsafe condition</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always apply a 25% safety factor to calculated torque or force requirements. This accounts for bearing friction increase over time, dirt accumulation, and operating conditions beyond design parameters.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Valve Actuator Selection for AHU Heating Coil</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select an actuator for a DN32 2-port LTHW valve on an AHU heating coil with 400kPa differential pressure.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Valve: DN32, 2-port globe valve, 10mm stroke</p>
                <p className="ml-4">Differential pressure: 400 kPa</p>
                <p className="ml-4">Control: Modulating 0-10V from BMS</p>
                <p className="ml-4">Fail-safe: Required (heating application)</p>
                <p className="mt-2">Force calculation:</p>
                <p className="ml-4">Valve seat area (DN32) ≈ 3.2 cm² (from valve datasheet)</p>
                <p className="ml-4">Force = 400 kPa × 3.2 cm² × 10 = 1,280 N</p>
                <p className="ml-4">With 25% safety factor = 1,280 × 1.25 = 1,600 N</p>
                <p className="mt-2">Actuator specification:</p>
                <p className="ml-4">- Stroke: ≥10mm (valve requirement)</p>
                <p className="ml-4">- Force: ≥1,600N</p>
                <p className="ml-4">- Control: 0-10V DC input</p>
                <p className="ml-4">- Running time: 90-120 seconds (standard HVAC)</p>
                <p className="ml-4">- Fail position: Spring return Normally Open (NO)</p>
                <p className="ml-4">- Supply: 24V AC (SELV for safety)</p>
                <p className="mt-2 text-green-400">Select: Linear actuator 2,500N, 15mm stroke, spring return NO</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Damper Actuator Sizing for Fresh Air Intake</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a direct-coupled actuator for an 800mm × 600mm fresh air intake damper operating against 600Pa static pressure.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Damper: 800mm × 600mm opposed blade</p>
                <p className="ml-4">Static pressure: 600 Pa (medium pressure)</p>
                <p className="ml-4">Control: Modulating 2-10V</p>
                <p className="ml-4">Position feedback: Required</p>
                <p className="mt-2">Torque calculation:</p>
                <p className="ml-4">Damper area = 0.8m × 0.6m = 0.48 m²</p>
                <p className="ml-4">Torque factor (medium pressure) = 10 Nm/m²</p>
                <p className="ml-4">Base torque = 0.48 × 10 = 4.8 Nm</p>
                <p className="ml-4">With 25% safety factor = 4.8 × 1.25 = 6.0 Nm</p>
                <p className="mt-2">Actuator specification:</p>
                <p className="ml-4">- Torque: ≥6 Nm</p>
                <p className="ml-4">- Rotation: 90°</p>
                <p className="ml-4">- Control: 2-10V DC (fault detection)</p>
                <p className="ml-4">- Feedback: 2-10V position signal</p>
                <p className="ml-4">- Running time: 90 seconds</p>
                <p className="ml-4">- Fail position: Spring return NC (prevent uncontrolled outside air)</p>
                <p className="mt-2 text-green-400">Select: 8 Nm direct-coupled, spring return closed, 2-10V with feedback</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Position Feedback Signal Interpretation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A modulating actuator with 2-10V feedback shows various readings. Interpret the damper positions.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Signal interpretation (2-10V range):</p>
                <p className="mt-2">Feedback reading: 2.0V</p>
                <p className="ml-4">Position = (2.0 - 2) / (10 - 2) × 100% = 0%</p>
                <p className="ml-4 text-green-400">Damper is fully closed</p>
                <p className="mt-2">Feedback reading: 6.0V</p>
                <p className="ml-4">Position = (6.0 - 2) / (10 - 2) × 100% = 50%</p>
                <p className="ml-4 text-green-400">Damper is half open</p>
                <p className="mt-2">Feedback reading: 10.0V</p>
                <p className="ml-4">Position = (10.0 - 2) / (10 - 2) × 100% = 100%</p>
                <p className="ml-4 text-green-400">Damper is fully open</p>
                <p className="mt-2">Feedback reading: 0.0V</p>
                <p className="ml-4 text-red-400">Invalid - below 2V minimum indicates cable fault!</p>
                <p className="ml-4 text-red-400">BMS should generate fault alarm</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Match actuator type to valve mechanism (linear vs rotary)</li>
                <li className="pl-1">Verify stroke or rotation angle meets valve/damper requirement</li>
                <li className="pl-1">Calculate force/torque requirement with 25% safety factor</li>
                <li className="pl-1">Specify appropriate running time for control application</li>
                <li className="pl-1">Determine fail-safe position requirement (spring return NO/NC)</li>
                <li className="pl-1">Confirm control signal compatibility with BMS outputs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard HVAC running time: <strong>90-120 seconds</strong></li>
                <li className="pl-1">Low-pressure damper torque factor: <strong>4-8 Nm/m²</strong></li>
                <li className="pl-1">Safety factor for sizing: <strong>25% minimum</strong></li>
                <li className="pl-1">2-10V fault threshold: <strong>&lt;2V indicates cable break</strong></li>
                <li className="pl-1">SELV supply voltage: <strong>24V AC</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using linear actuator on rotary valve</strong> - incompatible motion types</li>
                <li className="pl-1"><strong>Specifying wrong fail position</strong> - system fails to unsafe state</li>
                <li className="pl-1"><strong>Ignoring close-off pressure rating</strong> - valve leaks under pressure</li>
                <li className="pl-1"><strong>Running time too fast for modulating</strong> - causes control hunting</li>
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
                <p className="font-medium text-white mb-1">Actuator Types</p>
                <ul className="space-y-0.5">
                  <li>Linear: Globe/gate valves (stroke in mm)</li>
                  <li>Rotary: Ball/butterfly valves (90° rotation)</li>
                  <li>Spring return: Fail-safe positioning (NO/NC)</li>
                  <li>Non-spring return: Hold last position</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Signals</p>
                <ul className="space-y-0.5">
                  <li>0-10V: Standard modulating (0V = 0%)</li>
                  <li>2-10V: Fault-detecting (0V = cable break)</li>
                  <li>4-20mA: Long distance, noisy environments</li>
                  <li>Three-point: Open/close/stop relay control</li>
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
            <Link to="../h-n-c-module8-section5-4">
              Next: Communication Protocols
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_3;
