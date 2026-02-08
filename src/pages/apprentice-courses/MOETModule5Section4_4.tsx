import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control Valves and Actuators - MOET Module 5 Section 4.4";
const DESCRIPTION = "Comprehensive guide to control valve types, flow characteristics, actuator selection, fail-safe configurations and smart positioner diagnostics for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What is the primary function of a control valve?",
    options: [
      "To measure process variables",
      "To regulate the flow of fluid in response to a control signal",
      "To generate the control signal",
      "To display process data"
    ],
    correctIndex: 1,
    explanation: "A control valve is the final control element that physically adjusts fluid flow in the pipeline in response to the controller output signal."
  },
  {
    id: "qc2",
    question: "What does 'fail-safe' mean for a control valve actuator?",
    options: [
      "The valve never fails",
      "The valve moves to a predetermined safe position on loss of signal or power",
      "The valve locks in its current position",
      "The valve sends an alarm signal"
    ],
    correctIndex: 1,
    explanation: "Fail-safe means the actuator drives the valve to a defined safe position (fully open or fully closed) when the control signal or power supply is lost."
  },
  {
    id: "qc3",
    question: "What is the standard pneumatic control signal range?",
    options: [
      "0-10 V DC",
      "4-20 mA",
      "3-15 psi (0.2-1.0 bar)",
      "0-5 V DC"
    ],
    correctIndex: 2,
    explanation: "The traditional pneumatic control signal is 3-15 psi (0.2-1.0 bar), where 3 psi represents 0% and 15 psi represents 100% of the valve travel."
  },
  {
    id: "qc4",
    question: "What does Cv (or Kv) represent for a control valve?",
    options: [
      "The valve cost value",
      "The flow coefficient -- the volume of water that will flow through the valve at a given pressure drop",
      "The valve's control voltage",
      "The cavitation value"
    ],
    correctIndex: 1,
    explanation: "Cv is the flow coefficient representing the number of US gallons per minute of water at 60 degrees F that flows through the valve with a 1 psi pressure drop. Kv is the metric equivalent."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which type of control valve body is best suited for throttling applications?",
    options: ["Ball valve", "Globe valve", "Butterfly valve", "Gate valve"],
    correctAnswer: 1,
    explanation: "Globe valves provide excellent throttling characteristics with a linear relationship between stem position and flow, and are the most common choice for modulating control."
  },
  {
    id: 2,
    question: "What is the characteristic curve of a valve?",
    options: ["The shape of the valve body", "The relationship between valve stem position (travel) and flow rate", "The pressure rating of the valve", "The valve's response time curve"],
    correctAnswer: 1,
    explanation: "The characteristic curve (inherent flow characteristic) describes how the flow through the valve changes as the stem moves from closed to fully open."
  },
  {
    id: 3,
    question: "An equal-percentage valve characteristic means:",
    options: ["Equal flow at all positions", "Equal increments of stem travel produce equal percentage changes in flow", "The valve is always 50% open", "Flow is directly proportional to stem position"],
    correctAnswer: 1,
    explanation: "With an equal-percentage characteristic, each unit of stem travel produces the same percentage change in flow relative to the current flow rate, giving a logarithmic curve."
  },
  {
    id: 4,
    question: "What type of actuator uses instrument air to position the valve?",
    options: ["Electric actuator", "Hydraulic actuator", "Pneumatic diaphragm actuator", "Manual handwheel"],
    correctAnswer: 2,
    explanation: "Pneumatic diaphragm actuators use compressed instrument air (typically 3-15 psi or 0.2-1.0 bar) acting on a flexible diaphragm to position the valve stem."
  },
  {
    id: 5,
    question: "What is a positioner on a control valve?",
    options: ["A bracket that holds the valve in place", "A device that compares the control signal with the actual valve position and adjusts the actuator output accordingly", "A sensor that measures process flow", "A safety device that limits valve travel"],
    correctAnswer: 1,
    explanation: "A positioner is a feedback device mounted on the valve that ensures the actual stem position matches the demanded position from the controller, overcoming friction and process forces."
  },
  {
    id: 6,
    question: "What is cavitation in a control valve?",
    options: ["Air entering the pipeline", "Formation and collapse of vapour bubbles due to pressure dropping below vapour pressure, causing damage", "The valve vibrating at its resonant frequency", "Sediment building up inside the valve"],
    correctAnswer: 1,
    explanation: "Cavitation occurs when the local pressure drops below the fluid's vapour pressure (forming bubbles) and then recovers above it (bubbles collapse violently), causing erosion damage to valve internals."
  },
  {
    id: 7,
    question: "A fail-closed valve with a pneumatic actuator would use:",
    options: ["Air-to-open (spring-to-close) configuration", "Air-to-close (spring-to-open) configuration", "Double-acting cylinder with no spring", "Manual override only"],
    correctAnswer: 0,
    explanation: "For fail-closed operation, the spring pushes the valve closed and air pressure opens it. On loss of air, the spring returns the valve to the closed (safe) position."
  },
  {
    id: 8,
    question: "What advantage does a smart valve positioner provide over a conventional positioner?",
    options: ["Lower cost", "Digital communication, diagnostics, auto-calibration, and valve performance monitoring", "Faster response only", "It eliminates the need for an actuator"],
    correctAnswer: 1,
    explanation: "Smart positioners use digital technology (HART, Foundation Fieldbus, Profibus PA) to provide auto-calibration, diagnostic data, partial stroke testing, and remote configuration capabilities."
  },
  {
    id: 9,
    question: "When would you select a butterfly valve for control applications?",
    options: ["High-pressure steam throttling", "Large-diameter, low-pressure applications where cost and weight are important", "Very small flow rates requiring precise control", "Corrosive slurry applications"],
    correctAnswer: 1,
    explanation: "Butterfly valves are compact, lightweight, and cost-effective for large-diameter pipes. They are suitable for low to moderate pressure applications but have limited throttling range compared to globe valves."
  },
  {
    id: 10,
    question: "What happens if a control valve is significantly oversized for the application?",
    options: ["It will operate more efficiently", "It operates near its closed position where control is poor and wear increases", "There is no practical effect", "The valve will fail to open"],
    correctAnswer: 1,
    explanation: "An oversized valve operates near its closed position where small changes in stem position cause large flow changes. This makes precise control difficult, increases wear on the seat and plug, and reduces the effective rangeability of the loop."
  },
  {
    id: 11,
    question: "What is partial stroke testing (PST) used for?",
    options: ["Testing the valve's maximum flow capacity", "Verifying that a safety shut-off valve is not stuck by partially moving it during operation", "Measuring the valve's Cv", "Adjusting the positioner calibration"],
    correctAnswer: 1,
    explanation: "PST is a diagnostic technique for safety shut-off valves where the valve is partially moved (typically 10-20% of travel) during operation to verify it is not stuck. The smart positioner monitors the response and reports pass/fail."
  },
  {
    id: 12,
    question: "Which standard covers control valve sizing calculations?",
    options: ["BS 7671", "IEC 61131-3", "ISA-75.01 / IEC 60534-2-1", "ISO 9001"],
    correctAnswer: 2,
    explanation: "ISA-75.01 and IEC 60534-2-1 are the industry standards for control valve sizing calculations, covering flow equations for incompressible and compressible fluids."
  }
];

const faqs = [
  {
    question: "How do I select the correct control valve size?",
    answer: "Valve sizing involves calculating the required Cv based on the design flow rate, fluid properties (density, viscosity, vapour pressure), upstream and downstream pressures, and allowable pressure drop. Manufacturers provide sizing software, or the ISA/IEC equations can be used manually. The valve should be sized to operate typically between 20-80% open at the design flow rate."
  },
  {
    question: "What is the difference between a pneumatic and electric actuator?",
    answer: "Pneumatic actuators use compressed air and provide fast response, inherent fail-safe action (via spring return), and are suitable for hazardous areas. Electric actuators use a motor and gearbox, offer precise positioning without an air supply, but require additional measures for fail-safe action (battery backup, spring return module). Electric actuators are typically used for on/off or slow-modulating applications."
  },
  {
    question: "What is partial stroke testing (PST)?",
    answer: "PST is a diagnostic technique for safety shut-off valves where the valve is partially moved (typically 10-20% of travel) during operation to verify it is not stuck. The smart positioner monitors the valve response and reports pass/fail. This increases confidence in valve availability without fully shutting down the process."
  },
  {
    question: "Why do control valves need regular maintenance?",
    answer: "Control valves are subject to wear from fluid erosion, cavitation, corrosion, packing friction, and seat damage. Regular maintenance includes checking for leakage, inspecting packing and seats, verifying actuator operation, calibrating the positioner, and testing fail-safe action. Predictive maintenance using smart positioner diagnostics can optimise maintenance scheduling."
  },
  {
    question: "What causes a control valve to stick or become sluggish?",
    answer: "Common causes include excessive packing friction (over-tightened or deteriorated packing), corrosion or scale buildup on the stem, process deposits on internal components, insufficient actuator force (low air supply pressure), and damaged or worn guide bushings. Smart positioners can detect increasing friction trends before the valve fails to respond."
  }
];

const MOETModule5Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
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
            <Wrench className="h-4 w-4" />
            <span>Module 5.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control Valves and Actuators
          </h1>
          <p className="text-white/80">
            Valve types, flow characteristics, actuator selection and smart positioner diagnostics
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Globe valves:</strong> Best for modulating/throttling -- linear stem-to-flow</li>
              <li className="pl-1"><strong>Cv/Kv:</strong> Flow coefficient used for sizing -- operate 20-80% open</li>
              <li className="pl-1"><strong>Pneumatic actuators:</strong> Spring-return provides fail-safe action</li>
              <li className="pl-1"><strong>Smart positioners:</strong> Auto-calibration, diagnostics and predictive maintenance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fail-safe selection:</strong> Determined by process safety requirements</li>
              <li className="pl-1"><strong>Cavitation:</strong> Pressure drops below vapour pressure -- causes erosion damage</li>
              <li className="pl-1"><strong>Positioner calibration:</strong> Ensures accurate stem positioning</li>
              <li className="pl-1"><strong>ISA-75.01 / IEC 60534:</strong> Control valve sizing standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the main types of control valves and their applications",
              "Explain valve flow characteristics: linear, equal-percentage, and quick-opening",
              "Describe pneumatic, electric, and hydraulic actuator types and their fail-safe modes",
              "Explain the role of valve positioners and smart positioner diagnostics",
              "Understand the Cv/Kv flow coefficient and its use in valve sizing",
              "Recognise common valve problems including cavitation, flashing, and seat leakage"
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
            Control Valve Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The control valve is the <strong>final control element</strong> in a process control loop -- the device that
              physically adjusts the process variable by regulating fluid flow. The valve body design determines its
              suitability for different applications based on factors including flow characteristic, rangeability, pressure
              rating, and shut-off capability.
            </p>
            <p>
              <strong>Globe valves</strong> are the most common for modulating (throttling) control. The plug moves linearly
              through the seat, providing precise flow regulation. Available in single-seat (tight shut-off, limited
              pressure), double-seat (higher pressure, less tight shut-off), and cage-guided (reduced noise/cavitation)
              configurations. They offer excellent control authority across the full range of stem travel.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Control Valve Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Valve Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Globe valve</td>
                      <td className="border border-white/10 px-3 py-2">Precise throttling/modulating control</td>
                      <td className="border border-white/10 px-3 py-2">Linear stem-to-flow, excellent rangeability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ball valve</td>
                      <td className="border border-white/10 px-3 py-2">On/off and moderate throttling</td>
                      <td className="border border-white/10 px-3 py-2">V-notch or segmented designs for control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Butterfly valve</td>
                      <td className="border border-white/10 px-3 py-2">Large diameter, low-pressure</td>
                      <td className="border border-white/10 px-3 py-2">Compact, lightweight, cost-effective</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Diaphragm valve</td>
                      <td className="border border-white/10 px-3 py-2">Corrosive, viscous, or slurry fluids</td>
                      <td className="border border-white/10 px-3 py-2">Fluid does not contact moving parts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              <strong>Ball valves</strong> use a rotating ball with a bore. Full-bore designs minimise pressure drop; V-notch
              or segmented ball designs provide better throttling characteristics. <strong>Butterfly valves</strong> use a
              disc rotating on a central shaft -- compact, lightweight, and cost-effective for large pipe sizes. High-performance
              butterfly valves with offset discs provide better throttling and sealing.
            </p>
            <p>
              <strong>Diaphragm valves</strong> use a flexible membrane pressed against a weir to control flow -- ideal for
              corrosive, viscous, or slurry applications where the fluid must not contact moving parts. Each valve type has
              specific advantages, and selecting the correct type is critical for reliable control performance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Globe valves are the default choice for modulating control because of their
              excellent throttling capability, good rangeability, and predictable flow characteristics.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Flow Characteristics and Valve Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>inherent flow characteristic</strong> describes the relationship between valve stem position
              and flow rate at a constant pressure drop. Understanding these characteristics is essential for selecting
              the correct valve for each application and for predicting how the control loop will behave.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Linear</h3>
                <p className="text-sm text-white">
                  Equal increments of stem travel produce equal changes in flow. The graph is a straight line. Used
                  where the system pressure drop is relatively constant across the operating range.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Equal-Percentage</h3>
                <p className="text-sm text-white">
                  Equal increments of stem travel produce equal percentage changes in the existing flow, giving a
                  logarithmic curve. The most common choice for process control because it compensates for varying
                  system pressure drops.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick-Opening</h3>
                <p className="text-sm text-white">
                  Large flow increase with small initial travel, levelling off at higher openings. Used for on/off
                  applications and safety relief, not for modulating control.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Cv Flow Coefficient</p>
              <p className="text-sm text-white mb-3">
                The <strong>Cv (flow coefficient)</strong> is the fundamental sizing parameter. It represents the number
                of US gallons per minute of water at 60 degrees F that passes through the fully-open valve with a pressure
                drop of 1 psi. The metric equivalent <strong>Kv</strong> uses cubic metres per hour with a 1 bar pressure drop.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Valve sizing accounts for fluid properties (density, viscosity, vapour pressure)</li>
                <li className="pl-1">Upstream and downstream pressures determine the available pressure drop</li>
                <li className="pl-1">Oversized valves operate near the closed position where control is poor</li>
                <li className="pl-1">Undersized valves cannot deliver the required maximum flow</li>
                <li className="pl-1">Design target: operate between 20-80% open at the design flow rate</li>
              </ul>
            </div>

            <p>
              Valve sizing calculations use the ISA-75.01 (IEC 60534-2-1) equations. These account for pipe size, required
              flow range, and the specific characteristics of the fluid. Manufacturers provide sizing software that
              simplifies these calculations, but understanding the underlying principles is essential for maintenance
              technicians who need to verify that installed valves are correctly sized.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> If a control valve is constantly operating below 20% or above 80% open,
              it is likely incorrectly sized. This should be flagged for review as it leads to poor control, increased
              wear, and potential process issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Actuators and Fail-Safe Action
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The actuator is the mechanism that converts the control signal into physical valve movement. The choice
              of actuator type depends on the required force, speed, fail-safe action, and the availability of utilities
              (compressed air, electrical power, hydraulic supply).
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pneumatic Diaphragm Actuators</h3>
                <p className="text-sm text-white mb-2">
                  The most common in process industries. Instrument air (3-15 psi / 0.2-1.0 bar, or 6-30 psi for
                  larger valves) acts on a flexible diaphragm opposed by a spring. The spring provides inherent
                  fail-safe action without any additional mechanism.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Air-to-open (fail-closed):</strong> Air pressure opens the valve; spring closes it on air failure</li>
                  <li className="pl-1"><strong>Air-to-close (fail-open):</strong> Air pressure closes the valve; spring opens it on air failure</li>
                  <li className="pl-1">Fast response, simple construction, suitable for hazardous areas</li>
                  <li className="pl-1">Fail-safe direction determined by process safety requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pneumatic Piston Actuators</h3>
                <p className="text-sm text-white">
                  Provide higher thrust than diaphragm types for large or high-pressure valves. They can be single-acting
                  (with spring return for fail-safe) or double-acting (requiring a separate fail-safe mechanism such
                  as a stored-energy accumulator). Used where diaphragm actuators cannot generate sufficient force.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electric and Hydraulic Actuators</h3>
                <p className="text-sm text-white">
                  <strong>Electric actuators</strong> use a motor and gearbox, offer precise positioning without an air
                  supply, but require additional measures for fail-safe action (battery backup, spring return module).
                  <strong> Hydraulic actuators</strong> provide very high forces for large valves and high-pressure applications.
                  <strong> Electro-hydraulic actuators</strong> combine an electric motor-driven hydraulic pump with a cylinder,
                  providing self-contained high-force actuation.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Fail-Safe Selection Is Critical</p>
              <p className="text-sm text-white">
                The fail-safe direction must be determined by a process hazard analysis. A cooling water valve should
                fail-open to maintain cooling on loss of instrument air. A fuel gas valve should fail-closed to prevent
                uncontrolled fuel flow. Getting this wrong can have serious safety consequences -- always verify the
                fail-safe action during commissioning and after any maintenance on the actuator.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Maintenance technicians must understand actuator types and fail-safe
              configurations to correctly verify valve operation during functional testing and to diagnose actuator faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Positioners and Smart Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>valve positioner</strong> is a feedback device that compares the control signal with the actual
              valve stem position and adjusts the actuator pressure to correct any error. Without a positioner, friction
              (packing, guides), process forces (pressure differential across the plug), and hysteresis cause the valve
              to deviate from the demanded position. Positioners are essential for accurate control in modulating applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart (Digital) Positioner Capabilities</p>
              <p className="text-sm text-white mb-3">
                Smart positioners incorporate microprocessor-based control with digital communication protocols (HART,
                Foundation Fieldbus, Profibus PA). They provide capabilities far beyond simple position control:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Auto-calibration:</strong> Automatic zero and span adjustment, reducing commissioning time</li>
                <li className="pl-1"><strong>Step response testing:</strong> Measures valve response to step changes, identifying friction and dead band</li>
                <li className="pl-1"><strong>Signature analysis:</strong> Records the valve's position/pressure response to detect developing problems</li>
                <li className="pl-1"><strong>Partial stroke testing:</strong> Verifies safety shut-off valves are not stuck without full closure</li>
                <li className="pl-1"><strong>Predictive diagnostics:</strong> Trends friction, seat leakage, travel deviation over time</li>
              </ul>
            </div>

            <p>
              Diagnostic data from smart positioners enables <strong>predictive maintenance</strong> -- identifying problems
              such as increasing packing friction, worn seats, or sticking before they cause process upsets or unplanned
              shutdowns. Integration with asset management systems (Emerson AMS, Siemens PDM, FieldCare) allows centralised
              monitoring of all control valves in the plant.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Diagnostic Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Reveals</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Friction trend</td>
                      <td className="border border-white/10 px-3 py-2">Packing condition, guide wear, stem corrosion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Actuator pressure profile</td>
                      <td className="border border-white/10 px-3 py-2">Diaphragm/spring condition, air supply issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Travel deviation</td>
                      <td className="border border-white/10 px-3 py-2">Positioner calibration drift, linkage wear</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cycle count</td>
                      <td className="border border-white/10 px-3 py-2">Valve utilisation for maintenance planning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When commissioning a control valve with a smart positioner, always run
              the auto-calibration routine and record a baseline valve signature. This provides the reference against
              which future diagnostic data can be compared to detect degradation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Valve Problems and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control valves operate in demanding conditions and are subject to a range of problems that affect control
              performance and process efficiency. As a maintenance technician, recognising the symptoms of these problems
              and understanding their causes is essential for effective fault diagnosis and repair.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Control Valve Problems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cavitation:</strong> Pressure drops below vapour pressure forming bubbles that collapse violently, causing severe erosion of valve internals. Symptoms include distinctive crackling noise, vibration, and visible damage to the plug and seat</li>
                <li className="pl-1"><strong>Flashing:</strong> Similar to cavitation, but pressure does not recover above vapour pressure downstream. The fluid remains partially vapour, causing erosion and flow choking. Anti-cavitation trim cannot prevent flashing</li>
                <li className="pl-1"><strong>Seat leakage:</strong> The valve does not shut off completely, allowing flow past the seat when closed. Caused by erosion, corrosion, foreign material trapped in the seat, or mechanical damage</li>
                <li className="pl-1"><strong>Stem packing leakage:</strong> Process fluid leaks past the valve stem packing. Caused by packing wear, under-tightening, thermal cycling, or chemical attack. A potential environmental and safety issue</li>
                <li className="pl-1"><strong>Stiction (stick-slip):</strong> The valve sticks and then jumps when friction is overcome. Causes jerky control action and poor control performance. Often caused by over-tightened packing or corrosion</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preventive Maintenance Tasks</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Check for external leakage (packing, body joints, actuator)</li>
                <li className="pl-1">Verify actuator air supply pressure and regulator operation</li>
                <li className="pl-1">Stroke the valve through full range and check for smooth travel</li>
                <li className="pl-1">Test fail-safe action by removing signal or air supply</li>
                <li className="pl-1">Calibrate the positioner and check for travel deviation</li>
                <li className="pl-1">Review smart positioner diagnostic data for developing trends</li>
                <li className="pl-1">Check handwheel operation (if fitted) and ensure it is disengaged</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Control valves are critical components in process control loops. Understanding
              valve types, actuator configurations, and diagnostic techniques covered here provides the foundation
              for effective maintenance of final control elements as required by ST1426.
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Valve Types</p>
                <ul className="space-y-0.5">
                  <li>Globe -- best for modulating/throttling control</li>
                  <li>Ball -- on/off and moderate throttling (V-notch)</li>
                  <li>Butterfly -- large diameter, low-pressure, compact</li>
                  <li>Diaphragm -- corrosive, slurry applications</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards and Parameters</p>
                <ul className="space-y-0.5">
                  <li>Cv -- flow coefficient (US gal/min at 1 psi drop)</li>
                  <li>Kv -- metric equivalent (m3/h at 1 bar drop)</li>
                  <li>3-15 psi (0.2-1.0 bar) -- pneumatic signal</li>
                  <li>ISA-75.01 / IEC 60534 -- sizing standards</li>
                  <li>Positioner -- ensures stem matches control signal</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pneumatic and Hydraulic Controls
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-5">
              Next: Distributed Control Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_4;
