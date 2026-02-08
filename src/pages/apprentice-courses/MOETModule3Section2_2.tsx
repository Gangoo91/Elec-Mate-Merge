import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Direct-On-Line (DOL) Starters - MOET Module 3 Section 2.2";
const DESCRIPTION = "Comprehensive guide to DOL motor starters for electrical maintenance technicians: contactor construction and operation, overload relay types, control circuit wiring, interlocking methods, starter sizing and common fault diagnosis under ST1426.";

const quickCheckQuestions = [
  {
    id: "ac3-rating",
    question: "What utilisation category is standard for motor starting and stopping contactors?",
    options: [
      "AC-1",
      "AC-2",
      "AC-3",
      "AC-4"
    ],
    correctIndex: 2,
    explanation: "AC-3 is the standard utilisation category for starting and stopping squirrel-cage motors under normal conditions. It accounts for the high inrush current during starting (6-8 times FLC) and the lower current at breaking (motor running at speed). AC-4 is for more demanding applications such as inching (jogging) and reversing, where the contactor must break full locked-rotor current."
  },
  {
    id: "trip-class",
    question: "What trip class is standard for most motor overload relay applications?",
    options: [
      "Class 5",
      "Class 10",
      "Class 20",
      "Class 30"
    ],
    correctIndex: 1,
    explanation: "Class 10 is the standard trip class for most motor applications. It defines the maximum time the relay allows the motor to draw 7.2 times full-load current before tripping: 10 seconds. Higher classes (20, 30) are used for high-inertia loads that require extended acceleration times."
  },
  {
    id: "no-volt-release",
    question: "What safety feature prevents a motor from restarting automatically after a power failure?",
    options: [
      "Overload relay",
      "No-volt release (contactor drop-out)",
      "Thermal trip",
      "Phase sequence relay"
    ],
    correctIndex: 1,
    explanation: "No-volt release is the inherent safety feature of a contactor-based starter. When the supply fails, the contactor coil de-energises and the contactor drops out (opens). When power returns, the contactor remains open and the motor must be manually restarted by pressing the START button. This prevents unexpected motor operation."
  },
  {
    id: "contact-welding",
    question: "What is the most likely cause if a motor continues to run even when the stop button is pressed?",
    options: [
      "Overload relay failure",
      "Contact welding on the main contactor",
      "Broken start button",
      "Low control voltage"
    ],
    correctIndex: 1,
    explanation: "Contact welding occurs when the main contacts fuse together due to excessive arcing, too many starts per hour, or undersized contacts. The motor continues to run regardless of the control circuit state because the power contacts cannot open. This is a serious safety issue requiring immediate isolation and contactor replacement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical starting current for a DOL-started motor?",
    options: ["1 to 2 times FLC", "3 to 4 times FLC", "6 to 8 times FLC", "12 to 15 times FLC"],
    correctAnswer: 2,
    explanation: "DOL starting connects the motor directly to full voltage, drawing 6 to 8 times the full-load current during starting. This high starting current is why DOL is typically limited to smaller motors."
  },
  {
    id: 2,
    question: "What utilisation category is standard for motor starting contactors?",
    options: ["AC-1", "AC-2", "AC-3", "AC-4"],
    correctAnswer: 2,
    explanation: "AC-3 is the standard for starting and stopping squirrel-cage motors. AC-1 is for non-inductive loads, AC-2 for slip-ring motors, AC-4 for inching and reversing."
  },
  {
    id: 3,
    question: "What does a thermal overload relay use to detect overcurrent?",
    options: ["Current transformers", "Bimetallic strips", "Hall effect sensors", "Fuses"],
    correctAnswer: 1,
    explanation: "Thermal overloads use bimetallic strips (one per phase) that heat and bend when current flows through them. When the bending exceeds a set threshold, the trip mechanism is activated."
  },
  {
    id: 4,
    question: "What is the standard trip class for most motor applications?",
    options: ["Class 5", "Class 10", "Class 20", "Class 30"],
    correctAnswer: 1,
    explanation: "Class 10 allows up to 10 seconds at 7.2 times FLC during starting. It is suitable for most normal-duty applications with standard inertia loads."
  },
  {
    id: 5,
    question: "What is the purpose of the holding (seal-in) contact in a DOL control circuit?",
    options: ["To protect against overcurrent", "To keep the coil energised after the start button is released", "To interlock with other motors", "To reduce starting current"],
    correctAnswer: 1,
    explanation: "The holding contact is an auxiliary NO contact that closes when the contactor operates, maintaining the coil circuit after the momentary start button is released. This creates the 'latch' or 'seal-in' that keeps the motor running."
  },
  {
    id: 6,
    question: "What safety feature prevents automatic restart after power failure?",
    options: ["Overload relay", "No-volt release", "Phase sequence relay", "Timer"],
    correctAnswer: 1,
    explanation: "No-volt release causes the contactor to drop out when power fails. Manual restart is required when power returns, preventing unexpected motor operation."
  },
  {
    id: 7,
    question: "What causes contactor chattering or buzzing?",
    options: ["Motor overload", "Low coil voltage or broken shading ring", "High ambient temperature", "Incorrect overload setting"],
    correctAnswer: 1,
    explanation: "Chattering is caused by low coil voltage, broken shading rings on AC coils, or contamination on magnet faces. The shading ring is a copper band that maintains holding force during AC zero-crossings."
  },
  {
    id: 8,
    question: "Why must forward/reverse interlocking use BOTH electrical and mechanical methods?",
    options: ["To reduce cost", "Because electrical interlocking alone can fail if a contact welds", "For aesthetic reasons", "To increase starting torque"],
    correctAnswer: 1,
    explanation: "Electrical interlocking can fail if an auxiliary contact welds. Mechanical interlocking provides a physical backup that prevents both contactors closing simultaneously regardless of electrical faults."
  },
  {
    id: 9,
    question: "What happens if the overload relay is set significantly above the motor FLC?",
    options: ["Motor runs faster", "Motor protection is reduced, risking winding damage", "Starting current is reduced", "Energy efficiency improves"],
    correctAnswer: 1,
    explanation: "Setting the overload above FLC removes proper thermal protection, allowing the motor to overheat and potentially damaging the windings. Always set the overload to the nameplate FLC."
  },
  {
    id: 10,
    question: "What is the most likely cause of a motor that will not stop when the stop button is pressed?",
    options: ["Blown coil", "Welded main contacts", "Open overload relay", "Broken start button"],
    correctAnswer: 1,
    explanation: "Welded contacts prevent the contactor from opening. The motor continues to run regardless of the control circuit. The contactor must be replaced."
  },
  {
    id: 11,
    question: "What causes main contact welding on a contactor?",
    options: ["Low ambient temperature", "Excessive starting duty or undersized contacts", "Clean magnet faces", "Correct overload setting"],
    correctAnswer: 1,
    explanation: "Excessive starting current, too many starts per hour (exceeding the duty cycle), or undersized contacts can cause the contacts to fuse together (weld). Always select the correct AC-3 rated contactor."
  },
  {
    id: 12,
    question: "What information determines the minimum contactor size for a DOL starter?",
    options: ["Cable length", "Motor full-load current and AC-3 duty rating", "Building size", "Number of floors"],
    correctAnswer: 1,
    explanation: "The contactor must have an AC-3 rating equal to or greater than the motor FLC, and must be suitable for the expected number of operations per hour and the supply voltage."
  }
];

const faqs = [
  {
    question: "What is the maximum motor size for DOL starting?",
    answer: "There is no absolute maximum, but supply capacity and voltage drop are the limiting factors. In most commercial installations, DOL starting is typically limited to motors up to about 7.5 kW. The DNO or supply authority may impose limits on the maximum starting current that can be drawn. For larger motors or weak supplies, reduced-voltage starting methods (star-delta, soft starters, VSDs) are used."
  },
  {
    question: "Why use both electrical and mechanical interlocking?",
    answer: "Electrical interlocking can fail if an auxiliary contact welds shut. Mechanical interlocking physically prevents both contactors from closing simultaneously, regardless of electrical faults. Using both methods provides redundant safety -- if one method fails, the other still prevents a phase-to-phase short circuit. This is mandatory for forward/reverse and any other mutually exclusive contactor arrangements."
  },
  {
    question: "What should the overload relay be set to?",
    answer: "The overload relay should be set to the motor's full-load current (FLC) as shown on the motor nameplate. Never set it higher to prevent nuisance tripping -- this removes the motor's thermal protection and risks winding damage from overheating. If the overload trips repeatedly, investigate the cause (mechanical overload, single-phasing, supply issues) rather than increasing the setting."
  },
  {
    question: "What is a shading ring and why does it matter?",
    answer: "A shading ring is a copper band fitted to the face of an AC contactor magnet. It creates a phase-shifted magnetic field component that maintains the holding force during the AC cycle zero-crossings, preventing the armature from chattering (vibrating at 100 Hz). A broken shading ring causes continuous buzzing, which leads to coil overheating and eventual failure."
  },
  {
    question: "How do I know if a contactor needs replacing?",
    answer: "Replace a contactor when: the main contacts are welded or show erosion beyond the manufacturer's wear limit; the coil is burnt or mechanically seized; the armature faces are pitted or contaminated and cannot be cleaned; auxiliary contacts show inconsistent operation; or the contactor has exceeded its rated number of electrical operations. During PPM, inspect contact condition and check for signs of overheating."
  }
];

const MOETModule3Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title Block */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-elec-yellow" />
            <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded-full text-sm font-semibold">
              Module 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            3.2.2 Direct-On-Line (DOL) Starters
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Contactor operation, overload relays, control circuits, interlocking, sizing and common faults
          </p>
        </div>

        {/* 2-Column Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">In 30 Seconds</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- <strong>DOL:</strong> Full voltage applied directly, 6-8x FLC inrush</li>
              <li>- <strong>Contactor:</strong> Electromagnetic switch, AC-3 rated for motors</li>
              <li>- <strong>Overload:</strong> Bimetallic or electronic, set to nameplate FLC</li>
              <li>- <strong>No-volt release:</strong> Prevents automatic restart after power loss</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">Electrical Maintenance Context</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- Most common motor starting method in industry</li>
              <li>- Core maintenance and troubleshooting competency</li>
              <li>- Contact condition assessment during PPM</li>
              <li>- Safety-critical: interlocking prevents short circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-elec-yellow/30 rounded-lg p-5 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Learning Outcomes
          </h2>
          <ol className="space-y-2 text-white list-decimal list-inside">
            <li>Describe the construction and operation of a power contactor</li>
            <li>Explain the function and types of overload relays used in DOL starters</li>
            <li>Draw and interpret a basic DOL starter control circuit</li>
            <li>Describe interlocking methods for motor control circuits</li>
            <li>Size a DOL starter for a given motor application</li>
            <li>Diagnose common DOL starter faults including coil failure and contact welding</li>
          </ol>
        </div>

        <hr className="border-white/10 my-8" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DOL Starter Principles and Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Direct-On-Line (DOL) starter is the simplest and most widely used method of starting a three-phase induction motor. It connects the motor directly to the full supply voltage in a single operation. The starting current is typically 6 to 8 times the full-load current (FLC), and the starting torque is the motor's full locked-rotor torque.
            </p>
            <p>
              DOL starting is suitable for motors up to approximately 7.5 kW in most commercial installations, though this depends on supply capacity and voltage drop constraints. For larger motors, reduced-voltage starting methods (star-delta, soft starters, VSDs) are used to limit the starting current and its effects on the supply network.
            </p>
            <p>
              A DOL starter consists of three main components: an isolator (for safe isolation during maintenance), a contactor (the main switching element that connects and disconnects the motor), and an overload relay (which protects the motor from sustained overcurrent).
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">1.1 The Power Contactor</h3>
            <p>
              The contactor is an electrically operated switch controlled by an electromagnetic coil. When the coil is energised (typically at 230 V AC or 24 V AC/DC), it creates a magnetic field that pulls the armature in, closing the three main power contacts and any auxiliary contacts. When the coil is de-energised, springs return the armature and contacts to the open (OFF) position. This spring-return mechanism is the basis of the "no-volt release" safety feature.
            </p>
            <p>
              Contactors are rated by utilisation category under IEC 60947-4-1. For motor starting, AC-3 is the standard rating, meaning the contactor can start and stop motors under normal running conditions. AC-4 is used for inching (jogging) and reversing applications where the contacts must break full motor current at full voltage -- a significantly more demanding duty.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Key Contactor Components</p>
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Main Contacts:</strong> Three sets of normally open (NO) contacts that carry the motor power current. Made from silver-alloy material for low contact resistance and long electrical life. Rated for many thousands of operations at AC-3 duty.</li>
                <li><strong className="text-elec-yellow">Auxiliary Contacts:</strong> Additional contacts (NO and NC) used in the control circuit for holding, interlocking and status indication. Typically rated at 10 A. Can be supplemented by adding auxiliary contact blocks.</li>
                <li><strong className="text-elec-yellow">Coil:</strong> The electromagnetic coil that operates the contactor mechanism. Available in various voltages (24 V DC, 110 V AC, 230 V AC, 400 V AC). DC coils are quieter and do not require shading rings.</li>
                <li><strong className="text-elec-yellow">Arc Chutes:</strong> Chambers above the main contacts that help extinguish the arc formed when contacts open under load. They split the arc into smaller segments, cooling and deionising it rapidly.</li>
                <li><strong className="text-elec-yellow">Shading Ring:</strong> A copper band on AC coil magnetic faces that creates a phase-shifted flux component, preventing armature chatter at twice the supply frequency (100 Hz).</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Overload Relay Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The overload relay protects the motor from sustained overcurrent that would cause overheating and winding insulation damage. It monitors the motor current and trips the contactor coil circuit if the current exceeds the set value for a defined time period. Unlike a fuse or circuit breaker, the overload relay is designed to protect against overload, not short circuit.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.1 Thermal Overload Relays</h3>
            <p>
              Thermal overload relays use bimetallic strips (one per phase) that heat and bend when current flows through them. When the current exceeds the set value for long enough, the bimetallic strip bends sufficiently to trigger the trip mechanism, opening a normally closed (NC) contact in the contactor coil circuit.
            </p>
            <p>
              The current setting is adjustable (typically from 70% to 100% of the relay's maximum rated current). The relay should be set to the motor's full-load current as shown on the nameplate. Thermal overloads have an inherent inverse time characteristic -- they take longer to trip at lower overloads, which naturally matches the motor's thermal behaviour.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Electronic Overload Relays</h3>
            <p>
              Electronic overloads use current transformers to measure the motor current and a microprocessor to calculate the thermal state of the motor using a mathematical model. They offer several advantages over thermal types:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li>- More accurate and repeatable trip characteristics</li>
                <li>- Wider adjustment range</li>
                <li>- Phase loss detection (single-phasing protection)</li>
                <li>- Phase imbalance detection</li>
                <li>- Ground fault detection (some models)</li>
                <li>- Programmable trip classes (Class 5, 10, 20, 30)</li>
                <li>- Communication interfaces for integration with building management systems</li>
              </ul>
            </div>
            <p>
              Trip class defines the maximum time the relay allows the motor to draw 7.2 times FLC before tripping. Class 10 (10 seconds) is standard for most applications. Class 20 or 30 is used for high-inertia loads such as large fans or centrifugal compressors that take longer to accelerate to full speed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DOL Control Circuit and Interlocking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The control circuit is the low-power circuit that controls the contactor coil. Understanding control circuit operation is essential for troubleshooting motor starters. A basic DOL control circuit includes:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li>- A <strong>stop push-button</strong> (momentary NC contact -- normally closed)</li>
                <li>- A <strong>start push-button</strong> (momentary NO contact -- normally open)</li>
                <li>- The <strong>contactor coil</strong></li>
                <li>- A <strong>holding contact</strong> (auxiliary NO contact on the contactor)</li>
                <li>- The <strong>overload relay NC contact</strong></li>
                <li>- Any <strong>interlock contacts</strong> from other equipment</li>
              </ul>
            </div>
            <p>
              When the START button is pressed, current flows through the stop button (NC, so normally closed and passing current), through the start button (now pressed closed), through the overload relay contact (NC, normally closed), and energises the contactor coil. The contactor closes its main contacts (starting the motor) and simultaneously closes the auxiliary holding contact. When the START button is released, current continues to flow through the holding contact, keeping the coil energised -- this is the "latch" or "seal-in" circuit.
            </p>
            <p>
              The motor stops when: the STOP button is pressed (breaks the coil circuit directly); the overload relay trips (opens the NC overload contact); or the supply fails (the contactor de-energises and drops out). The last point is the "no-volt release" safety feature -- the motor must be manually restarted when power returns.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">3.1 Interlocking</h3>
            <p>
              Interlocking prevents two mutually exclusive operations from occurring simultaneously. In motor control, the most critical interlocking application is forward/reverse control, which uses two contactors to reverse two of the three supply phases to the motor. If both contactors closed simultaneously, a phase-to-phase short circuit would occur.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Electrical Interlocking:</strong> The NC auxiliary contact of each contactor is wired in series with the opposing coil. When the forward contactor is energised, its NC contact opens and prevents the reverse coil from being energised, and vice versa.</li>
                <li><strong className="text-elec-yellow">Mechanical Interlocking:</strong> A physical linkage between the two contactors prevents both armatures from closing simultaneously. This provides backup protection if an electrical interlock contact welds.</li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Safety requirement:</strong> Both electrical AND mechanical interlocking must be used together. Electrical interlocking alone can fail if a contact welds. Mechanical interlocking alone does not prevent both coils from being energised simultaneously (which could damage the interlock mechanism).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sizing, Selection and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When sizing a DOL starter, the following factors must be considered to ensure correct operation and adequate motor protection:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li>- <strong>Motor full-load current:</strong> Determines the minimum contactor AC-3 rating and overload relay range</li>
                <li>- <strong>Starting current:</strong> Typically 6-8 times FLC -- affects the contactor's switching capacity and the isolator rating</li>
                <li>- <strong>Supply voltage:</strong> 400 V three-phase for power circuit; control voltage as specified (typically 230 V AC or 24 V DC)</li>
                <li>- <strong>Duty cycle:</strong> Number of starts per hour and continuous/intermittent operation -- affects contactor and overload selection</li>
                <li>- <strong>Ambient temperature:</strong> High temperatures reduce thermal overload capability -- derating may be required</li>
                <li>- <strong>Coordination type:</strong> Type 1 (starter may be damaged during short circuit but must not be a safety hazard) or Type 2 (starter must remain fully operational after short circuit clearing)</li>
              </ul>
            </div>
            <p>
              As a general rule: select a contactor with an AC-3 rating equal to or greater than the motor FLC; choose an overload relay with an adjustable range that includes the motor FLC; and select an isolator rated for the full motor starting current. The upstream short-circuit protective device (MCCB or fuses) must be coordinated with the starter to provide both short-circuit and overload protection.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Faults and Troubleshooting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault diagnosis of DOL starters is a core competency for maintenance technicians. A systematic approach -- checking supply, control circuit, contactor and overload in sequence -- prevents wasted time and missed diagnoses.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-4 text-left">
                <li><strong className="text-elec-yellow">Coil Failure:</strong> The contactor does not close when the start button is pressed. Check coil voltage with a multimeter. A burnt coil may have a visibly damaged bobbin or a burning smell. Replace the coil (or the entire contactor if the magnetic core is damaged). Coil failure is caused by overvoltage, undervoltage (coil chatters, overheats and fails), or mechanical seizure of the armature.</li>
                <li><strong className="text-elec-yellow">Contact Welding:</strong> Main contacts fuse together so the motor cannot be stopped. This is a serious safety issue. The motor continues to run even when the stop button is pressed. Caused by excessive starting current, too many starts per hour, or undersized contacts. The contactor must be replaced immediately.</li>
                <li><strong className="text-elec-yellow">Overload Tripping:</strong> The overload relay trips repeatedly. Check the current setting matches the motor nameplate FLC. Check for mechanical overload on the driven equipment. Check for single-phasing (loss of one supply phase). Check for low supply voltage (motor draws more current to maintain torque).</li>
                <li><strong className="text-elec-yellow">Chattering/Buzzing:</strong> The contactor armature vibrates rapidly at twice supply frequency, producing an audible buzz. Caused by low coil voltage, a broken shading ring on AC coils, or contamination on the magnet faces. Clean the magnet faces with a lint-free cloth or replace the contactor.</li>
                <li><strong className="text-elec-yellow">Contact Erosion:</strong> Main contacts become pitted and eroded over time due to arcing during switching. This increases contact resistance, causing overheating at the contacts. Replace the contact set or the entire contactor when erosion exceeds the manufacturer's wear limits (indicated by wear markers on many modern contactors).</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* FAQs */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5">
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Contactor Utilisation Categories</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>AC-1 = Non-inductive / resistive loads</li>
                <li>AC-2 = Slip-ring motor starting</li>
                <li>AC-3 = Squirrel-cage motor starting</li>
                <li>AC-4 = Inching / jogging / reversing</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Trip Classes</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Class 5 = 5 seconds at 7.2x FLC</li>
                <li>Class 10 = 10 seconds (standard)</li>
                <li>Class 20 = 20 seconds (high inertia)</li>
                <li>Class 30 = 30 seconds (very high inertia)</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">DOL Starter Components</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Isolator (safe isolation)</li>
                <li>Contactor (switching element)</li>
                <li>Overload relay (motor protection)</li>
                <li>Control circuit (start/stop/hold)</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Common Fault Indicators</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Will not start = coil / control circuit</li>
                <li>Will not stop = welded contacts</li>
                <li>Buzzing = shading ring / low voltage</li>
                <li>Repeated trips = overload / single-phase</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="border-t border-white/10 pt-8">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Motor Construction
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-3">
              Next: Star-Delta Starters
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MOETModule3Section2_2;
