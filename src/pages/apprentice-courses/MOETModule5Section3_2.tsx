import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Guarding and Interlocking Devices - MOET Module 5 Section 3.2";
const DESCRIPTION = "Machine guarding principles, interlocking methods, trapped-key systems and safety distance calculation for maintenance technicians. BS EN ISO 14119, BS EN ISO 14120, BS EN ISO 13855 compliance. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "interlock-purpose",
    question: "What is the primary purpose of an interlocking guard?",
    options: [
      "Improve machine speed",
      "Prevent access to hazards while the machine is running",
      "Reduce energy consumption",
      "Enable remote operation"
    ],
    correctIndex: 1,
    explanation: "Interlocking guards ensure the machine cannot operate when the guard is open, preventing personnel access to dangerous parts during operation. When the guard is opened, the interlock signals the control system to stop the machine."
  },
  {
    id: "iso14119",
    question: "Which standard covers interlocking devices associated with guards?",
    options: [
      "BS EN 60204-1",
      "BS EN ISO 14119",
      "BS 7671",
      "IEC 61131-3"
    ],
    correctIndex: 1,
    explanation: "BS EN ISO 14119 specifies principles for the design and selection of interlocking devices associated with guards. It covers device types, coding levels, fault resistance and defeat prevention."
  },
  {
    id: "trapped-key",
    question: "What does a trapped-key interlock system ensure?",
    options: [
      "The key cannot be removed until the machine is safe",
      "The operator has the correct training certificate",
      "The machine runs at reduced speed",
      "Power is supplied from two independent sources"
    ],
    correctIndex: 0,
    explanation: "Trapped-key systems physically prevent key removal until the machine has reached a safe state (e.g., isolated and stopped). This enforces a strict sequence of operations that cannot be bypassed without breaking the lock."
  },
  {
    id: "guard-locking",
    question: "What is guard locking used for?",
    options: [
      "Locking the factory at night",
      "Preventing the guard from being opened until hazardous conditions have ceased",
      "Securing tools inside the machine enclosure",
      "Maintaining guard alignment during transport"
    ],
    correctIndex: 1,
    explanation: "Guard locking keeps the guard closed and locked until run-down hazards (e.g., rotating parts slowing to a stop, hot surfaces cooling) have ceased. It prevents premature access to residual hazards."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to the hierarchy of safeguarding measures, what is the first priority?",
    options: [
      "Interlocking guards",
      "Elimination of the hazard by design",
      "Warning signs",
      "Personal protective equipment"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy prioritises elimination of the hazard by inherently safe design before applying guarding, interlocking, or PPE. Only when elimination is not reasonably practicable should safeguarding measures be applied."
  },
  {
    id: 2,
    question: "Which type of guard physically prevents access to the danger zone at all times?",
    options: [
      "Interlocking guard",
      "Fixed guard",
      "Adjustable guard",
      "Self-adjusting guard"
    ],
    correctAnswer: 1,
    explanation: "A fixed guard is permanently attached and requires tools for removal, providing a continuous barrier. It cannot be opened for normal operation and is the simplest and most reliable guard type."
  },
  {
    id: 3,
    question: "What additional feature does a guard with guard locking provide beyond a standard interlocking guard?",
    options: [
      "Higher IP rating",
      "Keeps the guard locked closed until the hazard has ceased",
      "Wireless monitoring capability",
      "Automatic lubrication of the hinge"
    ],
    correctAnswer: 1,
    explanation: "Guard locking physically prevents the guard from being opened until hazardous conditions such as rotating parts have stopped. A standard interlock only stops the machine when opened — it does not prevent opening."
  },
  {
    id: 4,
    question: "In a tongue-operated interlock, what happens when the guard is opened?",
    options: [
      "An alarm sounds but the machine continues",
      "The tongue withdraws from the switch head, breaking the safety circuit",
      "The motor reverses direction",
      "Nothing until the operator presses stop"
    ],
    correctAnswer: 1,
    explanation: "When the guard opens, the coded tongue withdraws from the switch head, causing the safety contacts to open. This break in the safety circuit signals the control system to stop the machine."
  },
  {
    id: 5,
    question: "What is the purpose of using coded actuators in safety interlock switches?",
    options: [
      "To increase switching speed",
      "To prevent defeat of the interlock using substitution",
      "To enable wireless communication",
      "To reduce wiring costs"
    ],
    correctAnswer: 1,
    explanation: "Coded or unique actuators prevent operators from defeating the interlock by inserting an alternative object (such as a screwdriver or spare tongue). Higher coding levels provide greater resistance to defeat."
  },
  {
    id: 6,
    question: "Which of these is a non-contact interlocking technology?",
    options: [
      "Tongue-operated switch",
      "Trapped-key system",
      "RFID-coded safety sensor",
      "Bolt-lock interlock"
    ],
    correctAnswer: 2,
    explanation: "RFID-coded safety sensors use radio-frequency identification for non-contact detection of guard position. They offer high tolerance to misalignment, vibration and contamination."
  },
  {
    id: 7,
    question: "What does BS EN ISO 14120 cover?",
    options: [
      "Emergency stop devices",
      "General requirements for the design and construction of guards",
      "Safety relay wiring",
      "PLC programming languages"
    ],
    correctAnswer: 1,
    explanation: "BS EN ISO 14120 specifies general requirements for the design, construction, and selection of guards — covering material selection, fixing methods, reach distances and gap dimensions."
  },
  {
    id: 8,
    question: "In a trapped-key interlock system with multiple locks, what determines the sequence of operations?",
    options: [
      "The PLC programme",
      "The physical key transfer sequence between locks",
      "The operator's choice",
      "The machine speed setting"
    ],
    correctAnswer: 1,
    explanation: "The physical arrangement of keys and locks enforces a strict mechanical sequence that cannot be bypassed. Each key released from one lock is required to open the next lock in the sequence."
  },
  {
    id: 9,
    question: "What must be considered when selecting the approach speed for calculating safety distance?",
    options: [
      "Machine production rate",
      "Guard material thickness",
      "Hand/body approach speed per BS EN ISO 13855",
      "Ambient temperature"
    ],
    correctAnswer: 2,
    explanation: "BS EN ISO 13855 defines standard approach speeds (2000 mm/s for hand approach, 1600 mm/s for body approach) used to calculate minimum safety distances between the guard and the hazard."
  },
  {
    id: 10,
    question: "Why should safety interlock wiring be run separately from power wiring?",
    options: [
      "To save cable costs",
      "To prevent electromagnetic interference causing false safe states",
      "To simplify cable tray design",
      "It is not required to be separate"
    ],
    correctAnswer: 1,
    explanation: "Separating safety wiring from power circuits prevents electromagnetic interference from causing undetected faults in the safety system that could mask a dangerous condition."
  },
  {
    id: 11,
    question: "What is a muting function in a safety guarding system?",
    options: [
      "Silencing the machine alarm",
      "Temporarily suspending the safety function under specific conditions to allow material passage",
      "Reducing machine speed during guard opening",
      "Disabling the E-stop circuit for maintenance"
    ],
    correctAnswer: 1,
    explanation: "Muting temporarily suspends the safety function (e.g., a light curtain) to allow workpieces to pass through while maintaining personnel protection. Muting requires specific conditions to be met and is automatically reversed."
  },
  {
    id: 12,
    question: "Under PUWER 1998, who is responsible for ensuring that guards and interlocks are maintained in an efficient state?",
    options: [
      "Only the machine manufacturer",
      "The employer who provides the work equipment",
      "The HSE inspector",
      "The operator only"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 Regulation 5 places the duty on the employer to ensure that work equipment is maintained in an efficient state, in efficient working order and in good repair. This includes guards and safety interlocks."
  }
];

const faqs = [
  {
    question: "How often should interlocking devices be inspected?",
    answer: "BS EN ISO 14119 recommends regular inspection intervals determined by risk assessment. Typically, visual checks are performed daily or per shift, functional tests weekly or monthly, and full inspections annually. High-risk applications may require more frequent checks. All inspections must be documented."
  },
  {
    question: "Can I use a standard limit switch as a safety interlock?",
    answer: "No. Standard limit switches are not designed for safety applications. Safety interlock switches are built to positive-opening (direct-opening) principles per IEC 60947-5-1 Annex K, ensuring contacts open even if welded, and are rated for safety applications with appropriate coding levels."
  },
  {
    question: "What is the difference between a Type 2 and Type 4 interlock?",
    answer: "Type 2 interlocks use non-coded actuators (e.g., a standard tongue) that could potentially be defeated by substitution. Type 4 interlocks use coded or unique actuators (e.g., RFID) that are very difficult to defeat, providing a higher level of protection against tampering."
  },
  {
    question: "How do I calculate the minimum safety distance for a guard?",
    answer: "Use the formula from BS EN ISO 13855: S = (K x T) + C, where S is the minimum distance in mm, K is the approach speed (2000 mm/s for hands, 1600 mm/s for body), T is the overall stopping/response time in seconds, and C is an additional distance based on reach-through capability."
  },
  {
    question: "What are run-down hazards and why do they matter?",
    answer: "Run-down hazards occur when machine parts continue to move after power is removed (e.g., flywheels, spindles, centrifuges). Guard locking is required to keep guards locked until these parts have stopped, preventing exposure to residual kinetic energy that could cause serious injury."
  }
];

const MOETModule5Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
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
            <span>Module 5.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Guarding and Interlocking Devices
          </h1>
          <p className="text-white/80">
            Machine guarding principles, interlocking methods and safety distance calculation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hierarchy:</strong> Eliminate by design, then guard, then interlock, then PPE</li>
              <li className="pl-1"><strong>Guard types:</strong> Fixed, interlocking, guard-locking, adjustable, self-adjusting</li>
              <li className="pl-1"><strong>Interlock technologies:</strong> Tongue, RFID, magnetic, hinge-operated, trapped-key</li>
              <li className="pl-1"><strong>Safety distance:</strong> S = (K x T) + C per BS EN ISO 13855</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Inspection:</strong> Daily visual checks, weekly/monthly functional tests</li>
              <li className="pl-1"><strong>Defeat prevention:</strong> Coded actuators, tamper-resistant fixings</li>
              <li className="pl-1"><strong>Guard locking:</strong> Run-down hazards require locked guards until safe</li>
              <li className="pl-1"><strong>ST1426:</strong> Test, verify and maintain guarding systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the hierarchy of safeguarding measures and where guarding fits within it",
              "Identify guard types: fixed, movable, interlocking, adjustable and self-adjusting",
              "Describe interlocking device types including tongue, RFID-coded and magnetic",
              "Explain guard locking principles and their application for run-down hazards",
              "Understand trapped-key interlock systems and sequential access control",
              "Calculate safety distances using BS EN ISO 13855 for guard positioning"
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
            Hierarchy of Safeguarding Measures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Machinery Directive 2006/42/EC and BS EN ISO 12100 establish a hierarchy for risk reduction on machinery. The first priority is always inherently safe design — eliminating hazards through the design process itself. Where hazards cannot be eliminated, safeguarding measures are applied in a strict order of preference.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Reduction Hierarchy (ISO 12100)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — Inherently safe design:</strong> Eliminate hazards by design (e.g., reduce forces, speeds, energies; use inherently safe materials and substances)</li>
                <li className="pl-1"><strong>Step 2 — Safeguarding measures:</strong> Fixed guards (simplest, most reliable), interlocking guards (allow necessary access), protective devices (light curtains, safety mats, two-hand controls)</li>
                <li className="pl-1"><strong>Step 3 — Information for use:</strong> Warning signs, labels, markings, operating instructions and training. This is the last resort — information alone does not reduce risk</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Guards (BS EN ISO 14120)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fixed guards:</strong> Permanently attached using fasteners requiring tools for removal. Provide continuous protection but do not allow access for routine operations</li>
                <li className="pl-1"><strong>Movable (interlocking) guards:</strong> Can be opened without tools. Must be fitted with interlocking devices that stop the machine when the guard is opened</li>
                <li className="pl-1"><strong>Adjustable guards:</strong> Allow the opening to be adjusted to suit different workpiece sizes while maintaining protection (common on drilling machines and saws)</li>
                <li className="pl-1"><strong>Self-adjusting guards:</strong> Automatically adjust to the workpiece dimensions as it is fed into the machine (common on woodworking machines)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Guards must be designed so they cannot be easily defeated, remain in place during normal use, and do not create additional hazards such as sharp edges, trapping points or restricted visibility that could cause an operator to remove them.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Interlocking Device Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An interlocking device is a mechanical, electrical or electronic device that links the position of a guard to the control system of the machine. When the guard is opened, the interlock signals the control system to stop the machine or prevent it from starting. BS EN ISO 14119 classifies interlocking devices and specifies requirements for their design and selection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tongue-Operated Switches</h3>
                <p className="text-sm text-white mb-2">
                  A shaped metal tongue (actuator) inserts into the switch head when the guard is closed. Opening the guard withdraws the tongue, causing the safety contacts to open.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Available with coded tongues to prevent defeat</li>
                  <li className="pl-1">Robust and widely used on hinged/sliding guards</li>
                  <li className="pl-1">Positive-opening contacts per IEC 60947-5-1</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RFID-Coded Safety Sensors</h3>
                <p className="text-sm text-white mb-2">
                  Non-contact guard monitoring using radio-frequency identification. Each sensor-actuator pair has a unique RFID code.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Substitution virtually impossible</li>
                  <li className="pl-1">High tolerance to misalignment and vibration</li>
                  <li className="pl-1">Sealed construction for harsh environments</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Magnetic Safety Switches</h3>
                <p className="text-sm text-white">
                  Use magnetically coded actuators detected by Reed contacts or Hall-effect sensors. Non-contact operation with sealed construction suitable for washdown environments. Available in various coding levels from simple to high-coded for tamper resistance.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hinge-Operated Switches</h3>
                <p className="text-sm text-white">
                  Integrate directly into the guard hinge, monitoring door position without requiring a separate actuator. Compact installation, but limited to hinged guards. The switch body forms part of the hinge mechanism, making tampering difficult.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Defeat Prevention</p>
              <p className="text-sm text-white">
                BS EN ISO 14119 requires that interlocking devices are resistant to defeat (tampering). Defeat includes using alternative objects, removing actuators, or modifying the switch. Higher coding levels (Type 3 and Type 4) provide greater resistance. During maintenance inspections, always check for signs of tampering — taped switches, missing actuators, modified wiring or bypassed contacts.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Guard Locking and Run-Down Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standard interlocking stops the machine when the guard is opened, but some machines have run-down hazards — parts that continue to move after power is removed. Examples include flywheels, large rotating masses, centrifuges, spindles with high inertia, and heated elements that take time to cool. In these cases, guard locking (interlocking with guard locking) is required.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Guard Locking Principles</p>
              <p className="text-sm text-white mb-3">
                Guard locks use a solenoid-operated bolt that engages with the guard door. The bolt is released only when a safe condition is confirmed — typically by monitoring machine speed or a timed delay sufficient for moving parts to stop.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Spring-to-lock:</strong> The bolt is held locked by a spring and released by energising the solenoid. Fail-safe — the guard remains locked on power loss</li>
                <li className="pl-1"><strong>Solenoid-to-lock:</strong> The bolt is engaged by energising the solenoid. The guard can be opened if power is lost — used where trapped personnel must be able to escape</li>
                <li className="pl-1"><strong>Holding force:</strong> Must be sufficient to prevent the guard being forced open. Typical values range from 1000 N to 2600 N</li>
                <li className="pl-1"><strong>Escape release:</strong> An auxiliary mechanical release inside the guarded area allows trapped personnel to escape</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN ISO 14119 Clause 7 Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Guard locking devices must incorporate fault detection for the locking element</li>
                <li className="pl-1">The mechanical strength of the locking bolt must be rated for the application</li>
                <li className="pl-1">Resistance to defeat must match the overall interlock coding level</li>
                <li className="pl-1">Auxiliary release mechanisms must be provided where personnel could become trapped</li>
                <li className="pl-1">The unlock condition must be clearly defined and monitored (speed zero, time elapsed, temperature within limits)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When testing guard-locking interlocks, verify that the guard cannot be opened during the run-down period and that the unlock occurs reliably when the safe condition is reached. Check the bolt mechanism for wear, ensure the solenoid operates correctly, and verify the escape release functions from inside the enclosure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Trapped-Key Interlock Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trapped-key interlocks provide a purely mechanical means of enforcing a safe sequence of operations. The system consists of a series of locks, each trapping or releasing a key. The key released from one lock is required to operate the next, creating a chain of actions that must be performed in the correct order.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Trapped-Key Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Turn the key in the machine isolator to the OFF position — this traps one key and releases a transfer key</li>
                <li className="pl-1"><strong>Step 2:</strong> Use the transfer key to release the guard lock — the guard can now be opened</li>
                <li className="pl-1"><strong>Step 3:</strong> The guard lock traps the transfer key — the machine cannot be restarted until the guard is closed and relocked</li>
                <li className="pl-1"><strong>Step 4:</strong> Close and relock the guard — the transfer key is released</li>
                <li className="pl-1"><strong>Step 5:</strong> Return the transfer key to the isolator lock — the isolator can now be turned ON</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications and Manufacturers</p>
              <p className="text-sm text-white mb-3">
                Trapped-key systems are inherently tamper-resistant and do not rely on electrical circuits, making them suitable for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">High-voltage switchgear access control</li>
                <li className="pl-1">Robotic cell entry procedures</li>
                <li className="pl-1">Conveyor systems with multiple access points</li>
                <li className="pl-1">Multi-zone isolation on complex machinery</li>
                <li className="pl-1">Any application requiring strict procedural enforcement</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Major manufacturers include <strong>Castell</strong>, <strong>Kirk</strong> and <strong>Fortress</strong>, each offering proprietary key profiles to prevent cross-system defeat. Trapped-key systems can be combined with electrical interlocks for additional safety layers.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safety Distance Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When positioning guards and safety devices, the minimum distance from the hazard zone must be calculated to ensure the machine has stopped before an operator can reach the danger point. BS EN ISO 13855 provides the formula and the standard approach speeds used in the calculation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Distance Formula</p>
              <p className="text-sm text-white mb-3">
                <strong>S = (K x T) + C</strong>
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S</strong> = Minimum safety distance in mm</li>
                <li className="pl-1"><strong>K</strong> = Approach speed in mm/s (2000 mm/s for hand approach, 1600 mm/s for body approach)</li>
                <li className="pl-1"><strong>T</strong> = Overall stopping/response time in seconds (safety device + control system + machine)</li>
                <li className="pl-1"><strong>C</strong> = Additional distance accounting for reach-through capability</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Light curtain response time</td><td className="border border-white/10 px-3 py-2">20 ms</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Safety relay response time</td><td className="border border-white/10 px-3 py-2">15 ms</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Machine stopping time</td><td className="border border-white/10 px-3 py-2">200 ms</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Total T</td><td className="border border-white/10 px-3 py-2">0.235 s</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">K (body approach)</td><td className="border border-white/10 px-3 py-2">1600 mm/s</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">C (14 mm resolution)</td><td className="border border-white/10 px-3 py-2">850 mm</td></tr>
                    <tr className="bg-white/5"><td className="border border-white/10 px-3 py-2 font-medium">S = (1600 x 0.235) + 850</td><td className="border border-white/10 px-3 py-2 font-medium">1226 mm minimum</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">If this distance cannot be achieved, the machine stopping time must be reduced or a different safeguarding approach used.</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> All component response times must be measured and documented — they cannot be assumed. The machine stopping time is the most variable element and must be measured under worst-case conditions (maximum speed, maximum load, worn brakes).
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Stop Circuits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-3">
              Next: Safety Relays and Controllers
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section3_2;
