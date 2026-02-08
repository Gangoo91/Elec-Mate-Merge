import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control Circuit Faults - MOET Module 4 Section 3.5";
const DESCRIPTION = "Diagnosing faults in control circuits and automation systems including relay logic, PLC I/O, contactor circuits, timer faults, interlock failures and sensor diagnostics for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "contactor-buzz",
    question: "A contactor is buzzing loudly and the main contacts are chattering. The most likely cause is:",
    options: [
      "The motor connected to the contactor is overloaded",
      "Low control voltage at the contactor coil, or a damaged shading ring on the coil pole face",
      "The overload relay is set too high",
      "The cable to the motor is too long"
    ],
    correctIndex: 1,
    explanation: "A buzzing, chattering contactor indicates the magnetic force is insufficient to hold the armature fully closed. This is typically caused by low control voltage (supply dip, high-resistance connection in the control circuit) or a damaged shading ring — a copper band on the pole face that prevents the armature releasing at each zero-crossing of the AC waveform. Both conditions cause rapid make-break cycling that damages the main contacts."
  },
  {
    id: "plc-input-fault",
    question: "A PLC input LED is illuminated on the I/O module, but the programme shows the input as OFF. This suggests:",
    options: [
      "The field device (sensor/switch) is faulty",
      "A fault between the I/O module hardware and the PLC processor — possibly a faulty I/O module, backplane connection or configuration error",
      "The output connected to the same channel is faulty",
      "The PLC programme has a logic error"
    ],
    correctIndex: 1,
    explanation: "If the hardware LED on the I/O module shows the input is active but the PLC programme does not reflect this, the fault lies between the I/O hardware and the processor. This could be a faulty I/O module, a loose backplane connection, a configuration error (wrong I/O address mapped), or in rare cases, a processor fault. The field device and wiring are working correctly because the LED is illuminated."
  },
  {
    id: "timer-fault",
    question: "A process sequence stalls at a stage that should advance after a timed delay. The timer output does not energise after the set time. What should you check FIRST?",
    options: [
      "Replace the timer immediately",
      "Verify the timer is receiving its enable/trigger signal, check the time setting, and confirm the timer type (on-delay, off-delay, pulse) is correct for the application",
      "Increase the timer setting to allow more time",
      "Bypass the timer to keep production running"
    ],
    correctIndex: 1,
    explanation: "Before replacing any component, verify that it is receiving the correct input signals. A timer that does not start may simply not be receiving its enable signal due to an upstream fault. Also confirm the time base setting (seconds vs minutes — a common error) and that the timer type matches the application requirement. Replacing a timer without diagnosis wastes time and may not resolve the issue."
  },
  {
    id: "interlock-diagnosis",
    question: "In a motor starter circuit with multiple series-connected interlock contacts, the most efficient way to locate a single open interlock is:",
    options: [
      "Visually inspect every interlock in the circuit",
      "Use the half-split technique — measure voltage at the midpoint of the interlock chain to identify which half contains the open contact",
      "Replace all the interlocks",
      "Bypass the interlock circuit to identify which one is causing the problem"
    ],
    correctIndex: 1,
    explanation: "The half-split technique is the most efficient method for locating a single open contact in a series chain. Measure voltage at the midpoint: if supply voltage is present, the open contact is downstream; if no voltage, it is upstream. Continue halving until the specific open contact is identified. Never bypass interlocks — they are safety devices and bypassing them creates a serious hazard."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a conventional motor starter control circuit, the auxiliary contact (hold-on contact) across the start button serves to:",
    options: [
      "Provide additional starting current to the motor",
      "Maintain the contactor coil circuit after the start button is released, creating a latching function",
      "Protect the motor against overload",
      "Reduce the voltage to the coil during running"
    ],
    correctAnswer: 1,
    explanation: "The auxiliary (hold-on or seal-in) contact is wired in parallel with the start button. When the start button is pressed, the contactor energises and the auxiliary contact closes. When the start button is released, current continues to flow through the auxiliary contact, keeping the contactor energised. This latching arrangement is fundamental to motor starter control circuits."
  },
  {
    id: 2,
    question: "A stop button in a motor control circuit is wired as a normally closed (NC) contact in series with the coil circuit. This means:",
    options: [
      "The motor will only run while the stop button is held pressed",
      "Pressing the stop button opens the circuit, de-energising the coil; a broken wire to the stop button also stops the motor (fail-safe)",
      "The stop button has no effect on the motor",
      "The stop button must be pressed twice to stop the motor"
    ],
    correctAnswer: 1,
    explanation: "Using a normally closed stop button in series creates a fail-safe arrangement. If the wire to the stop button breaks, the circuit opens and the motor stops — the same as pressing the stop button. This is a fundamental safety design principle in control circuits: loss of the control signal results in a safe state (motor stopped)."
  },
  {
    id: 3,
    question: "A relay coil measures 0 ohms (short circuit) when tested with a multimeter. This indicates:",
    options: [
      "The relay is in good condition",
      "The coil winding has a short circuit between turns — the relay must be replaced",
      "The relay contacts are welded closed",
      "The multimeter is on the wrong range"
    ],
    correctAnswer: 1,
    explanation: "A healthy relay coil should have a measurable resistance (typically tens to thousands of ohms depending on the coil type and voltage rating). A reading of 0 ohms indicates a short circuit within the coil winding, meaning the turns are shorted together. The relay must be replaced. Note: also check for an open circuit (infinite resistance), which indicates a broken coil winding."
  },
  {
    id: 4,
    question: "Welded contactor contacts (contacts stuck together) are typically caused by:",
    options: [
      "The contactor being too large for the application",
      "Excessive inrush current, frequent switching under load, or chattering due to low coil voltage",
      "The overload relay being set correctly",
      "Clean, well-maintained contacts"
    ],
    correctAnswer: 1,
    explanation: "Welded contacts occur when excessive current flows through the contacts during making or breaking, generating enough heat to fuse the contact surfaces together. Common causes include high motor inrush current (especially DOL starting of large motors), frequent on/off cycling under load, and chattering (which causes repeated arcing). Welded contacts are a serious fault — the motor cannot be stopped by the control circuit."
  },
  {
    id: 5,
    question: "When diagnosing a PLC-controlled system, the FIRST step should be:",
    options: [
      "Modify the PLC programme to test different outputs",
      "Check the PLC diagnostic display for fault indicators and review the I/O status to identify unexpected states",
      "Replace the PLC processor module",
      "Disconnect all field wiring"
    ],
    correctAnswer: 1,
    explanation: "The PLC diagnostic display provides immediate, invaluable information. Fault LEDs indicate hardware problems. The I/O status display shows the real-time state of every input and output, allowing you to quickly identify which signal is in an unexpected state. This narrows the investigation to a specific field device or output without any physical testing."
  },
  {
    id: 6,
    question: "A proximity sensor used as an interlock in a control circuit shows 'sensor active' (LED on) when no target is present. This indicates:",
    options: [
      "Normal operation",
      "The sensor is faulty, misadjusted, or detecting a metallic object that should not be in range",
      "The PLC input is faulty",
      "The sensor cable is too long"
    ],
    correctAnswer: 1,
    explanation: "A proximity sensor showing active with no target present suggests the sensor is faulty (internal failure), misadjusted (sensitivity set too high), or detecting an unintended metallic object within its sensing range. Check the sensor's mounting position, sensing distance setting, and the surrounding area for metallic objects before replacing the sensor."
  },
  {
    id: 7,
    question: "In a star-delta starter, the motor fails to transition from star to delta. The motor runs in star but trips on overload. The fault could be:",
    options: [
      "The motor windings are connected incorrectly",
      "The changeover timer or the delta contactor coil circuit has a fault",
      "The star contactor has welded contacts preventing delta closure",
      "Both the timer/delta circuit fault and welded star contacts are possible causes"
    ],
    correctAnswer: 3,
    explanation: "Both conditions could cause this symptom. If the delta contactor fails to energise (due to a timer fault, coil fault, or wiring issue), the motor remains in star. If the star contactor contacts have welded (stuck closed), the delta contactor may be mechanically interlocked from closing. In either case, the motor runs in star at reduced voltage, drawing excessive current, and the overload eventually trips."
  },
  {
    id: 8,
    question: "A 24 V DC control circuit relay coil is rated at 24 V DC but the measured voltage at the coil is only 18 V. The relay does not reliably pull in. The cause is likely:",
    options: [
      "The relay is undersized",
      "Voltage drop across the control circuit due to high-resistance connections, long cable runs or undersized conductors",
      "The 24 V DC power supply is brand new",
      "The relay contacts are dirty"
    ],
    correctAnswer: 1,
    explanation: "A 6 V drop (25%) across the control circuit indicates excessive resistance in the wiring. This could be caused by high-resistance connections (loose terminals, corroded contacts), excessively long cable runs with undersized conductors, or multiple series-connected contacts each adding resistance. Most relay coils require at least 80% of rated voltage to reliably pull in — 18 V on a 24 V coil (75%) is marginal to insufficient."
  },
  {
    id: 9,
    question: "An emergency stop circuit using safety relays must be designed so that:",
    options: [
      "The emergency stop only works when the system is running",
      "A fault in the emergency stop circuit (broken wire, relay failure) results in the system stopping — fail-safe design",
      "The emergency stop can be overridden by the operator",
      "The safety relays are tested only during annual servicing"
    ],
    correctAnswer: 1,
    explanation: "Emergency stop circuits must be designed on the fail-safe principle: any fault in the circuit (broken wire, relay coil failure, contact welding) must result in the system achieving a safe state (stopped). Safety relays provide monitored contacts, cross-monitoring and force-guided operation to detect faults. This is a requirement of BS EN ISO 13849 (safety of machinery control systems)."
  },
  {
    id: 10,
    question: "When testing a control circuit with the power on, you measure 230 V across a closed contact. This indicates:",
    options: [
      "The contact is closed and conducting — this is normal",
      "The contact is open — voltage is present across it because no current is flowing through the load beyond it",
      "The measurement is meaningless",
      "The voltmeter is faulty"
    ],
    correctAnswer: 1,
    explanation: "In a series circuit, a closed (conducting) contact has virtually zero voltage across it. If you measure full supply voltage across a contact, it means the contact is open-circuit (or extremely high resistance). The voltage appears across the open contact because it is the break in the circuit, with supply voltage on one side and the load circuit (at neutral potential) on the other. This is a fundamental diagnostic principle."
  },
  {
    id: 11,
    question: "A safety light curtain protecting a machine access point trips the safety relay, but no obstruction is visible. You should:",
    options: [
      "Bypass the light curtain to keep production running",
      "Check for contamination on the lenses, misalignment, loose mounting, vibration, or environmental interference",
      "Replace the light curtain immediately",
      "Reduce the sensitivity of the light curtain"
    ],
    correctAnswer: 1,
    explanation: "False trips on safety light curtains are commonly caused by contaminated lenses (dust, oil, condensation), misalignment of sender and receiver units, loose mounting brackets that vibrate, or environmental factors (direct sunlight, steam, welding flash). Clean the lenses, check the alignment indicator LEDs, and verify the mounting is secure before considering replacement. Never bypass a safety device."
  },
  {
    id: 12,
    question: "A motor control centre (MCC) has multiple starters sharing a common control supply transformer. If this transformer fails:",
    options: [
      "Only one motor stops",
      "All motors fed from that control supply lose their control circuits — all contactors drop out simultaneously",
      "The motors continue running normally",
      "Only the lighting circuit is affected"
    ],
    correctAnswer: 1,
    explanation: "A common control supply transformer failure removes the control voltage from all starters it feeds. All contactor coils lose their supply, all contactors drop out, and all motors stop simultaneously. This is a single point of failure that should be considered in the design. Critical systems may use dual redundant control transformers or individual control transformers per starter."
  }
];

const faqs = [
  {
    question: "What is the difference between a relay and a contactor?",
    answer: "Functionally they are similar — both are electromagnetically operated switches. The main differences are size and application. Relays are typically smaller, used for control circuit switching (low current), and have multiple changeover contacts. Contactors are larger, designed for switching power circuits (motor loads), and have higher current-rated main contacts plus auxiliary contacts for the control circuit. In practice, the diagnostic approach is the same: check the coil circuit, check the contacts."
  },
  {
    question: "How do I trace a fault in a PLC programme without access to the programming software?",
    answer: "Many faults in PLC-controlled systems are in the field wiring and devices, not the programme. Use the PLC's built-in diagnostics: check the I/O LEDs on the modules to see which inputs and outputs are active. Compare what you see with what the system should be doing. If an input that should be ON is OFF, the fault is in the field device or wiring to it. If an output that should be ON is OFF but the programme appears to be calling for it, the I/O module or output device may be faulty."
  },
  {
    question: "Why do control circuit faults sometimes seem to come and go?",
    answer: "Intermittent control circuit faults are commonly caused by poor connections — loose terminals, corroded contacts, cracked solder joints or damaged cable insulation that makes intermittent contact. Temperature changes cause thermal expansion and contraction that can make a marginal connection break and remake. Vibration has the same effect. These are some of the most frustrating faults to diagnose because they may not be present when you arrive to investigate."
  },
  {
    question: "Should I use voltage testing or continuity testing when diagnosing control circuits?",
    answer: "Both have their place. Voltage testing with the circuit energised shows you where power is present and where it is lost — ideal for following the signal flow through a live control circuit. Continuity testing on a de-energised circuit confirms that contacts, coils and wiring are intact. Voltage testing is generally more informative because it shows the circuit operating under load conditions, but it requires Regulation 14 compliance for live working."
  },
  {
    question: "What is force-guided contact operation in safety relays?",
    answer: "Force-guided (also called positive-guided or mechanically linked) contacts are designed so that the normally open (NO) and normally closed (NC) contacts cannot both be in the closed position simultaneously. If a NO contact welds closed, the NC contacts are mechanically prevented from closing. This allows the safety monitoring circuit to detect a contact welding fault. It is a mandatory requirement for safety relay contacts used in emergency stop and safety interlock circuits under BS EN ISO 13849."
  },
  {
    question: "How does control circuit fault finding relate to ST1426?",
    answer: "ST1426 requires maintenance technicians to diagnose faults in control systems including relay logic, PLCs and associated field devices. The End Point Assessment may include scenarios involving control circuit faults. You should be able to read and interpret control circuit diagrams, use systematic diagnostic techniques to locate faults, and demonstrate understanding of safety circuit principles."
  }
];

const MOETModule4Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
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
            <Settings className="h-4 w-4" />
            <span>Module 4.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control Circuit Faults
          </h1>
          <p className="text-white/80">
            Diagnosing faults in control circuits, relay logic, PLCs and automation systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Relay logic:</strong> Coil faults, contact welding, voltage drop, wiring faults</li>
              <li className="pl-1"><strong>PLC systems:</strong> I/O diagnostics, field device failures, communication faults</li>
              <li className="pl-1"><strong>Safety circuits:</strong> Fail-safe design, force-guided contacts, monitored interlocks</li>
              <li className="pl-1"><strong>Voltage test:</strong> Full voltage across a contact = contact is open</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Circuit diagrams:</strong> Essential for tracing control circuit signal flow</li>
              <li className="pl-1"><strong>Fail-safe:</strong> NC stop buttons, safety relays — loss of signal = safe state</li>
              <li className="pl-1"><strong>Never bypass:</strong> Interlocks and safety devices must not be bypassed</li>
              <li className="pl-1"><strong>ST1426:</strong> Control system diagnosis assessed at EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Diagnose common relay and contactor control circuit faults",
              "Use PLC diagnostics to identify field device and I/O module faults",
              "Apply voltage measurement techniques to trace faults in live control circuits",
              "Understand fail-safe design principles in emergency stop and safety circuits",
              "Identify timer, sensor and interlock faults in automated systems",
              "Read and interpret control circuit schematic diagrams for fault finding"
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
            Relay and Contactor Control Circuit Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control circuits are the brain of any automated electrical system. They determine when motors start and stop, in what sequence, and under what conditions. When a control circuit fault occurs, the symptoms can range from a complete failure to start through to erratic, intermittent or unsafe operation. Diagnosing control circuit faults requires a solid understanding of how control circuits work and the ability to read circuit diagrams — skills that are explicitly required by the ST1426 standard.
            </p>
            <p>
              The fundamental components of relay-based control circuits are contactors, relays, pushbuttons, selector switches, limit switches, timers, overload relays and pilot lights. Each can fail in predictable ways, and understanding these failure modes allows you to diagnose faults efficiently using the systematic techniques covered in Section 4.3.2.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Control Circuit Component Failures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Failure Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symptom</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor coil</td>
                      <td className="border border-white/10 px-3 py-2">Open circuit (burnt out) or short circuit</td>
                      <td className="border border-white/10 px-3 py-2">Contactor does not pull in; or trips the control fuse</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor contacts</td>
                      <td className="border border-white/10 px-3 py-2">Welded closed, pitted, or high resistance</td>
                      <td className="border border-white/10 px-3 py-2">Motor cannot stop; intermittent operation; overheating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Auxiliary contact</td>
                      <td className="border border-white/10 px-3 py-2">Worn, high resistance, or open circuit</td>
                      <td className="border border-white/10 px-3 py-2">Loss of hold-on (motor stops when start button released)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overload relay</td>
                      <td className="border border-white/10 px-3 py-2">Tripped, contact failure, incorrect setting</td>
                      <td className="border border-white/10 px-3 py-2">Motor will not start; nuisance tripping; no protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pushbutton</td>
                      <td className="border border-white/10 px-3 py-2">Worn mechanism, contact failure, wiring fault</td>
                      <td className="border border-white/10 px-3 py-2">No response when pressed; intermittent operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Testing in Live Control Circuits</p>
              <p className="text-sm text-white mb-3">
                One of the most powerful diagnostic techniques for control circuits is voltage measurement across individual components in the live circuit. The principle is simple but frequently misunderstood:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>A closed (healthy) contact:</strong> Has virtually zero volts across it — current flows freely through it</li>
                <li className="pl-1"><strong>An open (faulty) contact:</strong> Has the full supply voltage across it — it is the break in the circuit</li>
                <li className="pl-1"><strong>A healthy coil:</strong> Has the supply voltage across it when energised (the voltage is being used to drive current through the coil)</li>
                <li className="pl-1"><strong>An open-circuit coil:</strong> May show supply voltage across it, but no current flows and the relay does not operate</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When measuring across contacts in a control circuit, full voltage across a contact means it is open. Zero volts across a contact means it is closed. This is counter-intuitive to beginners but is a fundamental diagnostic principle that you must understand and apply confidently.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PLC and Automation System Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Programmable Logic Controllers (PLCs) have largely replaced relay-based control in modern industrial systems. While PLCs are inherently more reliable than relay logic (no moving parts in the controller itself), the field devices connected to them — sensors, switches, actuators, solenoid valves — are still subject to failure. In practice, the vast majority of faults in PLC-controlled systems are in the field wiring and devices, not in the PLC itself.
            </p>
            <p>
              The great advantage of PLC systems for fault finding is their built-in diagnostics. Most PLCs provide real-time I/O status indication via LEDs on the I/O modules, diagnostic registers accessible through the programming terminal, and fault logs that record events with timestamps. Learning to use these diagnostic features is one of the most valuable skills a modern maintenance technician can develop.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PLC Fault Diagnosis Approach</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Check the PLC status:</strong> Is the PLC in RUN mode? Check the RUN/STOP/ERROR LEDs. A PLC in STOP or ERROR mode will not execute the programme</li>
                <li className="pl-1"><strong>Check the I/O LEDs:</strong> Compare the physical LED states on the I/O modules with the expected states. An input that should be ON but is OFF points to a field device or wiring fault</li>
                <li className="pl-1"><strong>Check the power supply:</strong> Verify the PLC power supply voltage and the field device power supply voltage (often 24 V DC). A drooping power supply can cause erratic I/O behaviour</li>
                <li className="pl-1"><strong>Check communication:</strong> If the PLC communicates with HMIs, other PLCs, or remote I/O, check communication status LEDs and network connections</li>
                <li className="pl-1"><strong>Isolate the fault domain:</strong> Is the fault in the input (sensor/switch), the PLC processing, or the output (actuator/contactor)? The I/O LED status tells you immediately</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Field Device Faults</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proximity sensors:</strong> Misalignment, contamination (metal swarf, oil), cable damage, sensing distance drift</li>
                <li className="pl-1"><strong>Photoelectric sensors:</strong> Dirty lenses, misalignment, ambient light interference, reflector damage</li>
                <li className="pl-1"><strong>Limit switches:</strong> Mechanical wear, actuator damage, contact failure, misadjustment</li>
                <li className="pl-1"><strong>Solenoid valves:</strong> Coil failure, mechanical jamming, contamination, air supply loss</li>
                <li className="pl-1"><strong>Pressure/temperature sensors:</strong> Drift, calibration loss, sensing element failure, wiring faults</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When a PLC output is commanded ON by the programme but the physical output LED is OFF, the output module or its fuse may have failed. When the output LED is ON but the connected device does not operate, the fault is in the output wiring or the device itself. This simple distinction immediately halves your diagnostic search area.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Timer, Counter and Sequential Control Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Timers and counters are fundamental to automated process control. They control sequence timing, delay periods, cycle counts and watchdog functions. When they malfunction, the entire process sequence can stall, run too fast, run too slow, or behave unpredictably. Diagnosing timer and counter faults requires understanding the different types (on-delay, off-delay, pulse, retentive) and how they are triggered and reset.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Timer Fault Diagnosis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Timer does not start:</strong> Check the enable/trigger signal is present. Check the timer has power. Check the timer type is correct (on-delay needs a rising edge; off-delay needs a falling edge)</li>
                <li className="pl-1"><strong>Timer runs but wrong duration:</strong> Check the time base setting (seconds vs minutes vs hours — a common error). Check the preset value. Check for a noisy or bouncing trigger signal that may be resetting the timer</li>
                <li className="pl-1"><strong>Timer output does not activate:</strong> Check the output contacts for failure. In PLC timers, check the addressing of the timer done bit</li>
                <li className="pl-1"><strong>Timer runs continuously:</strong> Check the reset signal. A timer that never receives its reset will continue running or remain latched</li>
              </ul>
            </div>

            <p>
              Sequential control faults — where a process stalls at a particular step — are diagnosed by identifying what condition is required to advance to the next step and then verifying that condition. In a PLC system, this means examining the transition conditions for the current step. In a relay-based sequencer, it means tracing the interlock chain for the next stage. Function testing, as described in Section 4.3.2, is the ideal diagnostic method for sequential faults.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Sequencing Error</p>
              <p className="text-sm text-white">
                A frequent cause of sequential control faults is sensor misadjustment after maintenance. If a limit switch that confirms a cylinder has fully extended is knocked out of position, the control system never receives the "extended" confirmation and the sequence stalls waiting for it. Always check sensor positions and adjustments after any mechanical maintenance work on automated equipment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When a sequence stalls, identify the current step and the condition required to advance. Then verify that condition. This focused approach is far more efficient than testing random components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Circuit Faults and Interlock Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety circuits — including emergency stop circuits, guard interlocks, safety light curtains and safety PLCs — are the most critical control circuits in any installation. They are designed to achieve a safe state (typically stopping the machine) whenever a hazardous condition is detected or an operator intervention is required. Faults in safety circuits must be treated with the highest priority and diagnosed with particular care.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Circuit Design Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fail-safe:</strong> Any fault in the safety circuit must result in the system achieving a safe state. NC contacts in series, de-energise to trip</li>
                <li className="pl-1"><strong>Redundancy:</strong> Dual-channel safety circuits (Category 3 and 4 of BS EN ISO 13849) use two independent paths that cross-monitor each other</li>
                <li className="pl-1"><strong>Force-guided contacts:</strong> Safety relays use mechanically linked contacts that prevent simultaneous closure of NO and NC contacts</li>
                <li className="pl-1"><strong>Monitoring:</strong> Safety controllers continuously monitor for discrepancies between redundant channels — a discrepancy triggers a fault state</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Bypass Safety Circuits</p>
              <p className="text-sm text-white">
                Under no circumstances should safety interlocks, emergency stops or guard switches be bypassed, defeated or jumpered out — even temporarily for diagnostic purposes. This is a criminal offence under the Health and Safety at Work Act 1974 and the Provision and Use of Work Equipment Regulations 1998 (PUWER). If a safety device needs to be defeated for testing, a formal safety procedure must be followed with specific risk controls in place.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnosing Safety Circuit Faults</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safety relay diagnostics:</strong> Most safety relays have LED indicators showing the status of each input channel and the output contacts. Use these to identify which channel has the fault</li>
                <li className="pl-1"><strong>Emergency stop chain:</strong> Use the half-split technique to locate an open e-stop in a series chain. Check each e-stop for correct latching and NC contact operation</li>
                <li className="pl-1"><strong>Guard switches:</strong> Check mechanical operation, wiring, and that the actuator correctly engages the switch when the guard is closed</li>
                <li className="pl-1"><strong>Safety light curtains:</strong> Check alignment LEDs, clean lenses, verify mounting security, and check for environmental interference</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Safety circuit understanding is a mandatory competence for maintenance technicians. You must be able to demonstrate knowledge of safety circuit principles, identify safety devices and their functions, and carry out fault diagnosis on safety circuits while maintaining the integrity of the safety function throughout.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Control Circuit Diagnostic Workflow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Applying the six-point technique to control circuit faults, here is a practical workflow that covers the key diagnostic steps for any control circuit problem.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Understand the Circuit</h3>
                <p className="text-sm text-white">
                  Obtain and study the circuit diagram before starting. Understand the normal sequence of operation, the function of each component, and the expected signal flow. If no diagram is available, sketch one as you investigate.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Identify the Symptom</h3>
                <p className="text-sm text-white">
                  Define exactly what is wrong: "The motor does not start when the start button is pressed" is much more useful than "it doesn't work". Check all relevant indicators — pilot lights, PLC LEDs, alarm displays, trip indicators.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Check the Control Supply</h3>
                <p className="text-sm text-white">
                  Verify that the control voltage is present and at the correct level. A missing or low control supply will cause all control functions to fail. Check the control transformer, control fuses and any control circuit isolators.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Trace the Signal</h3>
                <p className="text-sm text-white">
                  Using the circuit diagram, trace the signal flow from the supply through each device in the control circuit. Use voltage measurement to identify where the signal is lost. The point where you have supply voltage on one side but not the other is where the fault lies.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 5 — Verify and Repair</h3>
                <p className="text-sm text-white">
                  Once the faulty component is identified, confirm the diagnosis with a specific test (e.g., continuity test on the contact, resistance test on the coil). Carry out the repair, addressing the root cause. Test the complete circuit function before returning to service.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Control circuit faults are among the most satisfying to diagnose because they respond well to logical, systematic analysis. The circuit diagram is your map, the multimeter is your compass, and the six-point technique is your navigation method. With practice, you will develop the ability to diagnose most control circuit faults quickly and confidently.
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
                <p className="font-medium text-white mb-1">Control Circuit Voltage Test Rules</p>
                <ul className="space-y-0.5">
                  <li>Voltage across closed contact = 0 V (healthy)</li>
                  <li>Voltage across open contact = supply voltage (fault)</li>
                  <li>Voltage across energised coil = supply voltage (healthy)</li>
                  <li>No voltage anywhere = control supply fault</li>
                  <li>Always use GS38-compliant test equipment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Safety Circuit Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN ISO 13849 — Safety of machinery control systems</li>
                  <li>BS EN 62061 — Functional safety of control systems</li>
                  <li>BS EN 60204-1 — Safety of machinery electrical equipment</li>
                  <li>PUWER 1998 — Work equipment safety regulations</li>
                  <li>ST1426 — Control system diagnosis KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Motor and Drive Faults
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-6">
              Next: Intermittent Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section3_5;
