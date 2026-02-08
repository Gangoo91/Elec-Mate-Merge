import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pneumatic and Hydraulic Controls (Overview) - MOET Module 5 Section 4.3";
const DESCRIPTION = "Overview of pneumatic and hydraulic control systems for electrical maintenance technicians: operating principles, components, safety considerations and maintenance requirements under ST1426.";

const quickCheckQuestions = [
  {
    id: "pneumatic-signal",
    question: "What is the standard pneumatic signal range used in process control instrumentation?",
    options: [
      "0-10 psi",
      "3-15 psi",
      "0-100 psi",
      "15-30 psi"
    ],
    correctIndex: 1,
    explanation: "The standard pneumatic instrument signal range is 3-15 psi (approximately 0.2-1.0 bar). Like the 4-20 mA electrical standard, it uses a 'live zero' — 3 psi represents 0% of the process variable range, and 15 psi represents 100%. A signal of 0 psi indicates a fault (supply failure or disconnection) rather than a zero reading."
  },
  {
    id: "hydraulic-advantage",
    question: "What is the main advantage of hydraulic systems over pneumatic systems?",
    options: [
      "Hydraulic systems are cheaper to install",
      "Hydraulic systems can generate much higher forces in a compact space because liquids are virtually incompressible",
      "Hydraulic systems do not require any maintenance",
      "Hydraulic systems are lighter than pneumatic systems"
    ],
    correctIndex: 1,
    explanation: "The key advantage of hydraulic systems is their ability to generate very high forces in compact actuators. Because hydraulic fluid (oil) is virtually incompressible, force is transmitted directly and efficiently. Pneumatic systems use compressible air, which limits force output and can cause spongy, imprecise positioning under heavy loads."
  },
  {
    id: "ip-converter",
    question: "What does an I/P converter do in a control system?",
    options: [
      "Converts internet protocol signals to pneumatic signals",
      "Converts a 4-20 mA electrical signal to a 3-15 psi pneumatic signal",
      "Converts pneumatic energy into electrical power",
      "Converts imperial measurements to metric"
    ],
    correctIndex: 1,
    explanation: "An I/P (current-to-pressure) converter is a transducer that converts a 4-20 mA electrical signal from a controller into a proportional 3-15 psi pneumatic signal. This is essential in systems where the controller is electronic/digital but the final control element (typically a control valve) is pneumatically actuated. The I/P converter bridges the electronic and pneumatic domains."
  },
  {
    id: "pneumatic-safety",
    question: "Why is compressed air considered a hazard in industrial environments?",
    options: [
      "It can only cause minor injuries",
      "Compressed air stores significant energy; sudden release can cause impact injuries, hearing damage from noise, and eye injuries from debris",
      "Compressed air is flammable",
      "Compressed air is toxic"
    ],
    correctIndex: 1,
    explanation: "Compressed air stores significant energy and must be treated with respect. Hazards include: high-velocity air jets that can penetrate skin or inject air into the bloodstream; hearing damage from noise; eye injuries from blown debris; whiplash injuries from unsecured hoses; and burst injuries from over-pressurised components. Always depressurise systems before maintenance and never use compressed air to clean clothing or skin."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a pneumatic control system, instrument air supply is typically provided at:",
    options: [
      "1-2 bar (15-30 psi)",
      "1.4 bar (20 psi) regulated supply",
      "7-10 bar (100-150 psi)",
      "20 bar (300 psi)"
    ],
    correctAnswer: 1,
    explanation: "Instrument air is typically regulated to approximately 1.4 bar (20 psi) for pneumatic instruments. This provides sufficient pressure above the 3-15 psi signal range to drive actuators while remaining safe for instrumentation. Plant air for general pneumatic tools may be at 7-10 bar, but instrument air is always at a lower, regulated pressure."
  },
  {
    id: 2,
    question: "Pascal's law, which underpins hydraulic systems, states that:",
    options: [
      "Pressure in a fluid increases with depth",
      "Pressure applied to a confined fluid is transmitted equally in all directions",
      "Fluids always flow from high to low pressure",
      "The force of a fluid depends on its temperature"
    ],
    correctAnswer: 1,
    explanation: "Pascal's law states that pressure applied to a confined, incompressible fluid is transmitted equally and undiminished in all directions throughout the fluid. This principle allows hydraulic systems to multiply force: a small force applied to a small piston creates pressure that acts on a larger piston, producing a proportionally larger force."
  },
  {
    id: 3,
    question: "A pneumatic control valve with 'fail-close' action will:",
    options: [
      "Close slowly when the power supply fails",
      "Close fully when the air supply is lost, driven by the spring return",
      "Remain in its last position when air is lost",
      "Open fully when the air supply fails"
    ],
    correctAnswer: 1,
    explanation: "A fail-close (air-to-open) valve uses a spring to hold the valve closed. Pneumatic pressure must be applied against the spring to open the valve. If the air supply is lost for any reason, the spring forces the valve to its fully closed position. This is a critical safety feature — the failure mode is chosen to put the process in a safe state."
  },
  {
    id: 4,
    question: "Which of the following is a critical quality requirement for instrument air?",
    options: [
      "It must contain a minimum level of moisture for lubrication",
      "It must be clean, dry and oil-free to prevent instrument damage and blockages",
      "It must be heated to above 40 degrees C",
      "It must contain lubricating oil for valve stems"
    ],
    correctAnswer: 1,
    explanation: "Instrument air must be clean (filtered to remove particles), dry (dew point well below ambient to prevent condensation) and oil-free (to prevent contamination of instrument internals). Moisture causes corrosion, freezing in cold weather, and blockage of small orifices. Oil contaminates diaphragms and nozzles. ISA-7.0.01 specifies instrument air quality requirements."
  },
  {
    id: 5,
    question: "In a hydraulic system, what is the function of the relief valve?",
    options: [
      "To relieve the operator of maintenance duties",
      "To limit the maximum system pressure by diverting excess flow back to the reservoir, preventing damage from over-pressurisation",
      "To control the speed of the hydraulic cylinder",
      "To filter the hydraulic fluid"
    ],
    correctAnswer: 1,
    explanation: "The relief valve is a critical safety device that opens when system pressure exceeds its set value, allowing excess fluid to return to the reservoir. This protects pumps, cylinders, hoses and fittings from damage due to over-pressurisation. Every hydraulic system must have a properly set relief valve — failure of this valve can cause catastrophic equipment failure and serious injury."
  },
  {
    id: 6,
    question: "A positioner on a pneumatic control valve is used to:",
    options: [
      "Position the valve in the pipeline",
      "Ensure the valve reaches the exact position demanded by the controller signal, compensating for friction and pressure effects",
      "Record the valve position for maintenance logs",
      "Lock the valve in a fixed position during maintenance"
    ],
    correctAnswer: 1,
    explanation: "A valve positioner is a feedback device that ensures the valve stem position accurately matches the control signal. It uses a local feedback mechanism (position sensor on the valve stem) and a pneumatic amplifier to overcome friction, stem packing resistance, and process pressure forces. Without a positioner, the actual valve position may differ significantly from the demanded position, especially on larger valves."
  },
  {
    id: 7,
    question: "Hydraulic fluid contamination is a major cause of system failure. The most common contaminant is:",
    options: [
      "Water",
      "Metallic particles from component wear",
      "Sand from the environment",
      "Paint flakes from the reservoir"
    ],
    correctAnswer: 1,
    explanation: "Metallic particles generated by internal wear of pumps, valves and cylinders are the most common contaminant in hydraulic systems. These particles cause further abrasive wear, creating a self-accelerating cycle of contamination. Filtration is essential — most hydraulic systems use pressure-line and return-line filters rated to specific micron levels. Regular fluid analysis and filter changes are critical maintenance tasks."
  },
  {
    id: 8,
    question: "In electro-pneumatic systems, a solenoid valve is used to:",
    options: [
      "Generate compressed air from electrical energy",
      "Convert an electrical on/off signal into pneumatic switching, directing air to actuators",
      "Measure the pressure in the pneumatic supply",
      "Filter the air supply"
    ],
    correctAnswer: 1,
    explanation: "Solenoid valves are the interface between electrical control signals and pneumatic actuators. When the solenoid coil is energised by a PLC or controller output, it moves a spool or poppet that directs compressed air to the actuator. Solenoid valves come in various configurations (2-way, 3-way, 5-way) to control single-acting and double-acting cylinders."
  },
  {
    id: 9,
    question: "What does the term 'air-over-oil' describe in a pneumatic-hydraulic system?",
    options: [
      "A lubrication method for air compressors",
      "A system that uses compressed air to pressurize hydraulic oil, combining pneumatic simplicity with hydraulic force and precision",
      "A method of cooling hydraulic fluid",
      "An air filtration technique"
    ],
    correctAnswer: 1,
    explanation: "Air-over-oil (also called pneumatic-hydraulic) systems use compressed air acting on a reservoir of hydraulic oil to drive hydraulic cylinders. This combines the simplicity and availability of compressed air with the incompressibility and force multiplication of hydraulic fluid. It is used where smooth, precise motion is needed but a full hydraulic power unit is not justified."
  },
  {
    id: 10,
    question: "Before carrying out maintenance on a hydraulic system, the first safety step is to:",
    options: [
      "Start the hydraulic pump to check for leaks",
      "Isolate the power, relieve all stored pressure and ensure accumulators are fully discharged",
      "Remove the hydraulic reservoir cap",
      "Check the fluid colour"
    ],
    correctAnswer: 1,
    explanation: "Hydraulic systems store dangerous amounts of energy in pressurised fluid and accumulators. Before any maintenance: isolate the electrical supply to the pump motor; operate valves to relieve line pressure; ensure any hydraulic accumulators are fully discharged (these can store pressure even after the pump is off); lock out/tag out; and verify zero pressure with a gauge. Failure to discharge accumulators has caused fatal injuries."
  },
  {
    id: 11,
    question: "The 3-15 psi pneumatic signal standard uses a 'live zero' at 3 psi for the same reason as the 4-20 mA standard uses 4 mA, which is:",
    options: [
      "To save energy",
      "To differentiate between a genuine zero reading and a system fault",
      "To reduce noise in the signal",
      "To make calibration easier"
    ],
    correctAnswer: 1,
    explanation: "Both the 3-15 psi and 4-20 mA standards use a live zero so that a complete loss of signal (0 psi or 0 mA) always indicates a fault condition — a broken tube, disconnected fitting, or failed supply — rather than a genuine zero process reading. This allows immediate detection of instrumentation failures, which is critical for safe plant operation."
  },
  {
    id: 12,
    question: "Under ST1426, maintenance technicians working with pneumatic and hydraulic systems should understand:",
    options: [
      "Only the electrical aspects; fluid power is not their concern",
      "The operating principles, safety hazards, maintenance requirements and how these systems integrate with electrical control systems",
      "Only how to replace hoses and fittings",
      "Fluid power theory at degree level"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to have a working knowledge of pneumatic and hydraulic systems as part of their overall capability in maintaining automated plant. This includes understanding operating principles, recognising safety hazards, carrying out routine maintenance (filter changes, fluid checks, leak detection) and understanding how these systems interface with electrical controls."
  }
];

const faqs = [
  {
    question: "Why are pneumatic systems still widely used when electronic controls are more modern?",
    answer: "Pneumatic actuators remain popular because they are intrinsically safe (no electrical spark risk in hazardous areas), they are simple and robust with few moving parts, they can generate high forces from compact actuators, and the installed base is enormous. Many existing plants have thousands of pneumatic control valves that would be extremely costly to replace. Modern practice uses electronic controllers with I/P converters to drive pneumatic actuators, combining digital control intelligence with pneumatic reliability."
  },
  {
    question: "What is the difference between single-acting and double-acting pneumatic cylinders?",
    answer: "A single-acting cylinder uses air pressure on one side of the piston to extend (or retract) and a spring to return it. It can only exert force in one direction under air power. A double-acting cylinder uses air pressure on both sides of the piston — one port to extend, another to retract — giving powered motion in both directions. Double-acting cylinders are more versatile and commonly used in automation, while single-acting are simpler and used for clamping, pressing and fail-safe applications."
  },
  {
    question: "How often should hydraulic fluid be changed?",
    answer: "There is no single answer — it depends on the operating conditions, fluid type and system design. Best practice is condition-based maintenance: sample the fluid regularly and test for contamination (particle count, water content, acidity, viscosity). Many well-maintained systems can run for thousands of hours between changes. However, the filters should be changed at recommended intervals or whenever the differential pressure indicator shows restriction. Regular fluid analysis is far more effective than fixed-interval changes."
  },
  {
    question: "What causes a hydraulic system to overheat?",
    answer: "Common causes include: insufficient fluid in the reservoir; blocked heat exchanger or cooler; internal leakage past worn components (pumps, valves, cylinders) converting pressure energy into heat; relief valve set too low, causing continuous bypassing; operating at excessive pressure or flow for the system design; clogged filters causing pressure drops; and incorrect fluid viscosity. Overheating degrades the fluid, accelerates seal wear and can cause system failure."
  },
  {
    question: "Can I use any compressed air supply for pneumatic instruments?",
    answer: "No. Instrument air must meet strict quality standards (ISA-7.0.01 or equivalent): it must be filtered to remove particles (typically 5 microns or better), dried to a dew point well below the minimum ambient temperature to prevent condensation, and free of oil. General plant air from a workshop compressor is not suitable — it typically contains moisture, oil and particulate contamination that would damage sensitive instrument components. A dedicated instrument air dryer and filter system is required."
  },
  {
    question: "What safety precautions apply to hydraulic hose inspection?",
    answer: "Hydraulic hoses must be inspected regularly for: external damage (cuts, abrasion, kinking); bulging or blistering (indicating internal damage); weeping or leaking at fittings; hardening or cracking of the outer cover; corrosion of fittings; and exceeding the manufacturer's recommended service life. Never use your hand to check for leaks — a pinhole leak in a high-pressure hose can inject fluid through the skin (a serious medical emergency). Use a piece of cardboard or paper to detect fine leaks."
  }
];

const MOETModule5Section4_3 = () => {
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Wind className="h-4 w-4" />
            <span>Module 5.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pneumatic and Hydraulic Controls
          </h1>
          <p className="text-white/80">
            Pneumatic and hydraulic control systems, components and maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Pneumatic:</strong> Uses compressed air; 3-15 psi signal standard</li>
              <li className="pl-1"><strong>Hydraulic:</strong> Uses oil under pressure; high force, compact</li>
              <li className="pl-1"><strong>I/P converter:</strong> Bridges electronic and pneumatic systems</li>
              <li className="pl-1"><strong>Safety:</strong> Stored energy hazards in both systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Air quality:</strong> Instrument air must be clean, dry, oil-free</li>
              <li className="pl-1"><strong>Fluid analysis:</strong> Regular hydraulic fluid testing prevents failure</li>
              <li className="pl-1"><strong>Fail-safe:</strong> Understand valve failure modes (fail-open/closed)</li>
              <li className="pl-1"><strong>ST1426:</strong> Fluid power systems maintenance knowledge required</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of pneumatic and hydraulic systems",
              "Identify the key components of pneumatic and hydraulic circuits",
              "Describe the 3-15 psi pneumatic signal standard and I/P conversion",
              "Explain fail-safe valve actions and their importance in process safety",
              "Identify safety hazards associated with compressed air and hydraulic pressure",
              "Describe routine maintenance requirements for fluid power systems under ST1426"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamentals of Pneumatic Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pneumatic control systems use compressed air as the power medium to drive actuators, transmit signals
              and operate control elements. Despite the dominance of electronic control, pneumatic actuators remain
              ubiquitous in process industries because of their inherent safety advantages in hazardous areas, their
              mechanical simplicity and the enormous installed base worldwide.
            </p>
            <p>
              For the electrical maintenance technician, understanding pneumatic systems is essential because
              virtually every process plant uses pneumatic control valves — even when the controller, transmitters
              and communication networks are fully electronic. The interface between the electronic control system
              and the pneumatic actuator is a key area of maintenance responsibility.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components of a Pneumatic Control System</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Air compressor:</strong> Generates compressed air from atmospheric air — typically reciprocating or rotary screw type</li>
                <li className="pl-1"><strong>Air receiver:</strong> Storage vessel that smooths pulsations and provides a buffer for peak demands</li>
                <li className="pl-1"><strong>Air treatment:</strong> Filters, dryers and regulators that condition the air to instrument quality (clean, dry, oil-free)</li>
                <li className="pl-1"><strong>Distribution pipework:</strong> Header and branch piping delivering instrument air to field devices</li>
                <li className="pl-1"><strong>I/P converter:</strong> Converts 4-20 mA electronic signal to 3-15 psi pneumatic signal</li>
                <li className="pl-1"><strong>Valve positioner:</strong> Ensures accurate valve position by using local feedback from the valve stem</li>
                <li className="pl-1"><strong>Pneumatic actuator:</strong> Converts air pressure into linear or rotary motion to position the control valve</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 3-15 psi Signal Standard</p>
              <p className="text-sm text-white mb-3">
                The 3-15 psi standard is the pneumatic equivalent of the 4-20 mA electrical standard. The signal
                range of 12 psi (15 minus 3) corresponds to 0-100% of the controlled range. Like 4-20 mA, the
                live zero at 3 psi allows distinction between a genuine zero reading and a supply failure.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pneumatic (psi)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical (mA)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">3</td><td className="border border-white/10 px-3 py-2">4</td><td className="border border-white/10 px-3 py-2">0%</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">6</td><td className="border border-white/10 px-3 py-2">8</td><td className="border border-white/10 px-3 py-2">25%</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">9</td><td className="border border-white/10 px-3 py-2">12</td><td className="border border-white/10 px-3 py-2">50%</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">12</td><td className="border border-white/10 px-3 py-2">16</td><td className="border border-white/10 px-3 py-2">75%</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">15</td><td className="border border-white/10 px-3 py-2">20</td><td className="border border-white/10 px-3 py-2">100%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Many existing process plants have a mixture of pneumatic and electronic
              instrumentation. The I/P converter is the critical interface — understanding its operation, calibration
              and fault modes is essential for maintenance technicians.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fundamentals of Hydraulic Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hydraulic systems use pressurised fluid (typically mineral oil or synthetic hydraulic fluid) to transmit
              force and motion. The fundamental principle is Pascal's law: pressure applied to a confined fluid is
              transmitted equally in all directions. This allows hydraulic systems to multiply force, making them
              ideal for applications requiring high force in a compact space.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components of a Hydraulic System</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hydraulic power unit (HPU):</strong> Electric motor, pump, reservoir, filters, cooler and relief valve — the heart of the system</li>
                <li className="pl-1"><strong>Pump:</strong> Converts mechanical energy from the motor into hydraulic pressure (gear, vane or piston types)</li>
                <li className="pl-1"><strong>Reservoir (tank):</strong> Stores the hydraulic fluid, allows air separation and heat dissipation</li>
                <li className="pl-1"><strong>Directional control valves:</strong> Solenoid or pilot-operated valves that direct fluid to the actuators</li>
                <li className="pl-1"><strong>Pressure relief valve:</strong> Limits maximum system pressure to protect components — a critical safety device</li>
                <li className="pl-1"><strong>Flow control valves:</strong> Regulate the speed of actuator movement by controlling fluid flow rate</li>
                <li className="pl-1"><strong>Actuators:</strong> Cylinders (linear motion) and motors (rotary motion) that perform the physical work</li>
                <li className="pl-1"><strong>Accumulators:</strong> Pressurised vessels that store hydraulic energy for peak demands or emergency operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pneumatic vs Hydraulic Comparison</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pneumatic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hydraulic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Medium</td><td className="border border-white/10 px-3 py-2">Compressed air (compressible)</td><td className="border border-white/10 px-3 py-2">Oil (incompressible)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Pressure range</td><td className="border border-white/10 px-3 py-2">6-10 bar typical</td><td className="border border-white/10 px-3 py-2">100-350 bar typical</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Force capability</td><td className="border border-white/10 px-3 py-2">Low to moderate</td><td className="border border-white/10 px-3 py-2">Very high</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Speed</td><td className="border border-white/10 px-3 py-2">Fast but imprecise</td><td className="border border-white/10 px-3 py-2">Precise speed control</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cleanliness</td><td className="border border-white/10 px-3 py-2">Clean exhaust (air)</td><td className="border border-white/10 px-3 py-2">Potential oil leaks</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Hazardous areas</td><td className="border border-white/10 px-3 py-2">Intrinsically safe</td><td className="border border-white/10 px-3 py-2">Not intrinsically safe</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> In many industrial plants, you will encounter both systems — pneumatic
              actuators on control valves and hydraulic systems on presses, injection moulding machines, and heavy
              mechanical equipment. Understanding both is essential for the multi-skilled maintenance technician.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electro-Pneumatic and Electro-Hydraulic Interfaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern industrial control systems are predominantly electronic or digital, but the final control
              elements are often pneumatic or hydraulic. The interface between these domains — the electro-pneumatic
              or electro-hydraulic interface — is a critical area for the electrical maintenance technician, as
              faults at this interface are common and can be difficult to diagnose without understanding both sides.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electro-Pneumatic Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>I/P converter:</strong> Converts 4-20 mA to 3-15 psi — the primary proportional interface for analogue control valve positioning</li>
                <li className="pl-1"><strong>Solenoid valve:</strong> Converts digital (on/off) electrical signals to pneumatic switching — used for discrete actuators and safety systems</li>
                <li className="pl-1"><strong>Smart positioner:</strong> Combines I/P conversion, position feedback and diagnostics in a single device — increasingly common in modern plants</li>
                <li className="pl-1"><strong>Pneumatic limit switch:</strong> Converts valve position into a pneumatic signal for non-electrical areas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electro-Hydraulic Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Solenoid directional valve:</strong> Uses electrical solenoids to shift a hydraulic spool valve, directing oil flow to actuators</li>
                <li className="pl-1"><strong>Proportional valve:</strong> Provides proportional control of hydraulic flow or pressure from an analogue electrical signal</li>
                <li className="pl-1"><strong>Servo valve:</strong> High-precision proportional valve used in closed-loop position, velocity or force control systems</li>
                <li className="pl-1"><strong>Pressure transducer:</strong> Converts hydraulic pressure into a 4-20 mA or digital signal for monitoring and control</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Interface Faults</p>
              <p className="text-sm text-white">
                When a control valve is not responding correctly, the fault could be in the electronic signal chain,
                the electro-pneumatic interface, or the pneumatic actuator. A systematic approach is essential:
                check the controller output signal (4-20 mA), verify the I/P converter output (3-15 psi), check
                the positioner output, and finally check the valve position. Isolating the fault to the correct
                domain saves significant time and avoids the common problem of electrical technicians blaming
                instrument engineers and vice versa.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Carry a pneumatic test gauge and a 4-20 mA loop calibrator together
              when fault-finding control valve problems. You can then quickly check both the electrical and pneumatic
              sides of the interface at the valve.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Considerations and Maintenance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Both pneumatic and hydraulic systems store significant energy in compressed fluids, springs and
              accumulators. This stored energy presents serious safety hazards that must be understood and managed
              by every maintenance technician. The Provision and Use of Work Equipment Regulations (PUWER) 1998
              and the Pressure Systems Safety Regulations 2000 provide the regulatory framework for safe operation
              and maintenance of these systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Pneumatic Hazards</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High-velocity air jets causing skin penetration</li>
                  <li className="pl-1">Noise damage from venting or leaks</li>
                  <li className="pl-1">Eye injuries from blown debris</li>
                  <li className="pl-1">Whiplash from unsecured hoses</li>
                  <li className="pl-1">Spring-loaded actuators releasing when air is removed</li>
                  <li className="pl-1">Asphyxiation in confined spaces (nitrogen-driven systems)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Hydraulic Hazards</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fluid injection through skin from pinhole leaks</li>
                  <li className="pl-1">Burns from hot hydraulic fluid</li>
                  <li className="pl-1">Crushing from uncontrolled actuator movement</li>
                  <li className="pl-1">Accumulator energy release after pump shutdown</li>
                  <li className="pl-1">Slip hazards from oil leaks</li>
                  <li className="pl-1">Fire risk from oil mist or spray on hot surfaces</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routine Maintenance Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pneumatic:</strong> Check air quality (moisture, oil), drain condensate from receivers and traps, replace filters, check for leaks (using ultrasonic leak detector), verify regulator settings, inspect hoses and fittings</li>
                <li className="pl-1"><strong>Hydraulic:</strong> Check fluid level and condition, sample fluid for analysis, change filters (pressure and return line), inspect hoses for damage, check for leaks, monitor system pressure and temperature, verify relief valve settings</li>
                <li className="pl-1"><strong>Both:</strong> Test safety devices (relief valves, emergency stops), check actuator operation and stroke, verify control signal calibration, inspect mounting and support structures</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under the Pressure Systems Safety Regulations 2000, certain pneumatic and
              hydraulic components (receivers, accumulators, high-pressure vessels) require a written scheme of
              examination prepared by a competent person. As a maintenance technician, you must ensure these
              examinations are carried out at the specified intervals and that any defects found are rectified
              before the system is returned to service.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Signal Standards</p>
                <ul className="space-y-0.5">
                  <li>Pneumatic: 3-15 psi (0.2-1.0 bar)</li>
                  <li>Electronic: 4-20 mA</li>
                  <li>I/P converter bridges the two</li>
                  <li>Both use live zero for fault detection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety Essentials</p>
                <ul className="space-y-0.5">
                  <li>Always depressurise before maintenance</li>
                  <li>Discharge hydraulic accumulators</li>
                  <li>Never check for leaks with your hand</li>
                  <li>Lock out/tag out all energy sources</li>
                  <li>PSSR 2000 for pressure equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PID Control Loops
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-4">
              Next: Control Valves and Actuators
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_3;