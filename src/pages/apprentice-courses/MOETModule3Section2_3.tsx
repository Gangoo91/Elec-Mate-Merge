import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Star-Delta Starters - MOET Module 3 Section 2.3";
const DESCRIPTION = "Comprehensive guide to star-delta motor starting for electrical maintenance technicians: starting current reduction principles, open and closed transition methods, timer settings, winding connections, contactor arrangements, limitations and troubleshooting under ST1426.";

const quickCheckQuestions = [
  {
    id: "current-reduction",
    question: "By what factor is the starting current reduced in star compared to DOL?",
    options: [
      "One-half (1/2)",
      "One-third (1/3)",
      "One-quarter (1/4)",
      "Two-thirds (2/3)"
    ],
    correctIndex: 1,
    explanation: "In star connection, the starting current is reduced to approximately one-third of the DOL value. This is because the voltage across each winding is reduced to 58% (1/root 3), and since current is proportional to voltage, the line current is approximately 1/3 of DOL. The starting torque is also reduced to one-third, which limits the applications of this starting method."
  },
  {
    id: "open-transition",
    question: "What is the main disadvantage of open transition in star-delta starting?",
    options: [
      "Higher cost",
      "A transient current spike may occur during changeover",
      "The motor cannot reach full speed",
      "It requires more contactors"
    ],
    correctIndex: 1,
    explanation: "During open transition, the motor is briefly disconnected from the supply (30-50 milliseconds). When the delta contactor reconnects, the residual motor voltage may be out of phase with the supply, causing a current transient that can exceed DOL levels. This is the most common transition method but must be timed correctly."
  },
  {
    id: "timer-setting",
    question: "What speed should the motor reach in star before transition to delta?",
    options: [
      "50-60%",
      "65-75%",
      "80-90%",
      "100%"
    ],
    correctIndex: 2,
    explanation: "The motor should reach approximately 80-90% of full speed in star before transition occurs. This minimises the current transient at changeover and reduces mechanical shock to the drive coupling. The star-delta timer must be set to allow sufficient acceleration time."
  },
  {
    id: "cable-count",
    question: "How many cables are required from a star-delta starter to the motor?",
    options: [
      "Three",
      "Four",
      "Six",
      "Nine"
    ],
    correctIndex: 2,
    explanation: "Six cables are needed because all six winding terminals (U1, V1, W1, U2, V2, W2) must be individually connected to the starter. This is a significant disadvantage compared to DOL or soft starters, which only require three cables, resulting in more copper, larger containment and higher installation costs."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "By what factor is the starting current reduced in star compared to DOL?",
    options: ["1/2", "1/3", "1/4", "2/3"],
    correctAnswer: 1,
    explanation: "Star connection reduces both starting current and starting torque to approximately one-third of DOL values."
  },
  {
    id: 2,
    question: "By what factor is the starting torque reduced in star?",
    options: ["1/2", "1/3", "1/4", "Not reduced"],
    correctAnswer: 1,
    explanation: "Starting torque is proportional to voltage squared. At 58% voltage (star), torque is approximately 33% (one-third) of DOL. This is the main limitation of the method."
  },
  {
    id: 3,
    question: "How many contactors does a standard star-delta starter require?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: 2,
    explanation: "Three contactors: main (KM1), star (KM2) and delta (KM3). Closed transition requires additional contactors for the transition resistors."
  },
  {
    id: 4,
    question: "What is the main advantage of closed transition over open transition?",
    options: ["Lower cost", "Simpler wiring", "Eliminates current transient at changeover", "Higher starting torque"],
    correctAnswer: 2,
    explanation: "Closed transition maintains supply connection during changeover using transition resistors, preventing the current transient that occurs with open transition."
  },
  {
    id: 5,
    question: "How many cables are required from the starter to the motor?",
    options: ["Three", "Four", "Six", "Nine"],
    correctAnswer: 2,
    explanation: "Six cables are needed because all six winding terminals (U1, V1, W1, U2, V2, W2) must be individually connected to the starter."
  },
  {
    id: 6,
    question: "What is the typical star-delta timer setting range?",
    options: ["0.1 to 0.5 seconds", "3 to 10 seconds", "30 to 60 seconds", "5 to 10 minutes"],
    correctAnswer: 1,
    explanation: "The typical range is 3 to 10 seconds, depending on motor size, load inertia and starting torque requirements."
  },
  {
    id: 7,
    question: "What happens if the timer is set too short?",
    options: ["Motor overheats", "High current transient and mechanical shock at transition", "Motor runs slowly", "Overload relay resets"],
    correctAnswer: 1,
    explanation: "If the motor has not reached sufficient speed, the transition to delta causes a large current spike and mechanical shock to the drive coupling."
  },
  {
    id: 8,
    question: "What type of loads are NOT suitable for star-delta starting?",
    options: ["Centrifugal pumps", "Fans", "Conveyors and crushers (high starting torque loads)", "Compressors"],
    correctAnswer: 2,
    explanation: "Loads requiring high starting torque cannot be star-delta started because the starting torque in star is only one-third of DOL. The motor may stall or fail to accelerate."
  },
  {
    id: 9,
    question: "Why must the star and delta contactors be interlocked?",
    options: ["To save energy", "To reduce noise", "To prevent a short circuit across the supply", "To improve power factor"],
    correctAnswer: 2,
    explanation: "If both contactors close simultaneously, a short circuit occurs across the supply. Both electrical and mechanical interlocking are required."
  },
  {
    id: 10,
    question: "What motor nameplate voltage rating is required for star-delta on a 400 V supply?",
    options: ["230 V only", "400 V only", "400/690 V (delta/star)", "690 V only"],
    correctAnswer: 2,
    explanation: "The motor must be rated 400/690 V so that in star (for 690 V supply), each winding receives 400 V, and in delta (for 400 V supply), each winding receives 400 V."
  },
  {
    id: 11,
    question: "What is the most common reason a motor trips on star-delta transition?",
    options: ["Supply failure", "Timer too short -- high transition current trips overload", "Motor earthing fault", "Control transformer failure"],
    correctAnswer: 1,
    explanation: "If the timer is too short, the motor has not reached adequate speed and the delta transition current is excessive, tripping the overload relay."
  },
  {
    id: 12,
    question: "What technology is increasingly replacing star-delta starters?",
    options: ["DOL starters", "Autotransformer starters", "Soft starters and VSDs", "Resistance starters"],
    correctAnswer: 2,
    explanation: "Soft starters and variable speed drives offer smoother starting, adjustable parameters, fewer components, only three motor cables, and superior motor protection."
  }
];

const faqs = [
  {
    question: "Can any three-phase motor be star-delta started?",
    answer: "No. The motor must have all six winding terminals brought out to the terminal box and must be rated for dual voltage operation (e.g., 400/690 V for a 400 V supply). A motor wired internally in delta with only three terminals cannot be star-delta started. Check the motor nameplate for a dual voltage rating before specifying star-delta starting."
  },
  {
    question: "Why are star-delta starters being replaced by soft starters?",
    answer: "Soft starters provide smooth, adjustable acceleration without the current transient at changeover. They require only three cables to the motor (not six), offer adjustable starting torque and current limit, include built-in motor protection features, and take up less panel space. They are now cost-competitive with star-delta starters for most applications above 7.5 kW."
  },
  {
    question: "What happens if the star and delta contactors close simultaneously?",
    answer: "A phase-to-phase short circuit occurs across the supply, typically resulting in blown fuses, tripped upstream protection, and potentially damaged contactors. This is a very dangerous condition. It is why star and delta contactors must always be electrically AND mechanically interlocked -- both methods are mandatory."
  },
  {
    question: "How do I determine the correct timer setting?",
    answer: "The correct setting can be determined by monitoring the motor current during starting with a clamp meter. Start with a conservative (longer) setting and reduce it until the star current has dropped close to the normal running current before transition. The motor should reach 80-90% of full speed. Typical settings are 3-10 seconds depending on motor size and load."
  },
  {
    question: "Can I reverse a motor on a star-delta starter?",
    answer: "Yes, but it requires additional contactors for reversing, making the starter more complex. Two of the three supply phases are swapped to reverse direction. The reversing contactors must be properly interlocked with both electrical and mechanical interlocks. In practice, a VSD is often a better choice for applications requiring forward/reverse operation."
  }
];

const MOETModule3Section2_3 = () => {
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
            3.2.3 Star-Delta Starters
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Starting current reduction, transition methods, timer settings, connections and troubleshooting
          </p>
        </div>

        {/* 2-Column Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">In 30 Seconds</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- <strong>Principle:</strong> Start in star (1/3 current), run in delta (full speed)</li>
              <li>- <strong>Transition:</strong> Open (simple) or closed (no spike)</li>
              <li>- <strong>Timer:</strong> 3-10 seconds, motor must reach 80-90% speed</li>
              <li>- <strong>Cables:</strong> Six required (all six terminals individually)</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 text-sm uppercase tracking-wide">Electrical Maintenance Context</h3>
            <ul className="text-left text-white text-sm space-y-1.5">
              <li>- Very common in existing UK installations</li>
              <li>- Timer setting is the most common adjustment</li>
              <li>- Transition faults cause nuisance tripping</li>
              <li>- Being replaced by soft starters and VSDs</li>
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
            <li>Explain the principle of star-delta starting and how it reduces starting current</li>
            <li>Describe open transition and closed transition methods and their differences</li>
            <li>Identify the correct timer settings for star-delta transition</li>
            <li>Draw and interpret star-delta starter wiring diagrams</li>
            <li>Recognise the limitations and applications of star-delta starting</li>
            <li>Troubleshoot common star-delta starter faults systematically</li>
          </ol>
        </div>

        <hr className="border-white/10 my-8" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Star-Delta Starting Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Star-delta starting reduces the starting current by initially connecting the motor windings in star (Y) configuration, then switching to delta (triangle) configuration once the motor has accelerated to near full speed. This is one of the oldest and most widely used reduced-voltage starting methods in the UK, though it is gradually being superseded by electronic alternatives.
            </p>
            <p>
              In star connection, each winding receives the line voltage divided by the square root of 3 (approximately 58% of line voltage). Since the current drawn is proportional to the applied voltage, and power is proportional to voltage squared, the starting current in star is reduced to approximately one-third of the DOL starting current. However, the starting torque is also reduced to one-third of the DOL starting torque.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Star vs DOL Comparison</p>
              <ul className="text-white space-y-2 text-left">
                <li><strong className="text-elec-yellow">DOL Starting Current:</strong> 6 to 8 times FLC</li>
                <li><strong className="text-elec-yellow">Star Starting Current:</strong> Approximately 2 to 2.7 times FLC (one-third of DOL)</li>
                <li><strong className="text-elec-yellow">DOL Starting Torque:</strong> 100% of locked-rotor torque</li>
                <li><strong className="text-elec-yellow">Star Starting Torque:</strong> Approximately 33% of locked-rotor torque (one-third of DOL)</li>
              </ul>
            </div>
            <p>
              This reduction in starting torque is the main limitation of star-delta starting. The motor must be able to accelerate the load to near full speed with only one-third of its normal starting torque. This means star-delta is only suitable for loads that start relatively unloaded, such as centrifugal pumps, fans and compressors. It is NOT suitable for loads that require high starting torque, such as conveyors, crushers, loaded lifts and positive displacement pumps.
            </p>
            <p>
              The motor must be designed for dual voltage operation (e.g., 400/690 V) with all six winding terminals brought out to the terminal box. A motor designed only for delta connection at 400 V cannot be star-delta started because the star voltage (230 V) would be below its rated winding voltage, causing overheating and poor performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transition Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <h3 className="text-lg font-semibold text-white mb-3">2.1 Open Transition</h3>
            <p>
              In open transition, there is a brief moment (typically 30-50 milliseconds) when the motor is completely disconnected from the supply during the changeover from star to delta. During this interval, the motor acts as a generator driven by its own inertia and the inertia of the load. When the delta contactor closes, the motor is reconnected to the supply.
            </p>
            <p>
              If the motor has slowed significantly or the residual voltage is out of phase with the supply, a large transient current can occur -- potentially exceeding the DOL starting current. This current spike causes:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li>- Mechanical shock to the drive coupling and driven equipment</li>
                <li>- Voltage dips on the supply network affecting other equipment</li>
                <li>- Nuisance tripping of the overload relay</li>
                <li>- Accelerated wear on contactor contacts</li>
              </ul>
            </div>
            <p>
              Open transition is the simplest and most common method. The transient current spike at changeover is usually acceptable for most applications, provided the timer is set correctly so the motor has reached near full speed before transition.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Closed Transition</h3>
            <p>
              Closed transition uses additional contactors and resistors (or reactors) to maintain a connection to the supply during the changeover. The sequence is:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ol className="text-white space-y-2 text-left list-decimal list-inside">
                <li>Motor runs in star at reduced voltage</li>
                <li>Transition resistors are connected across the motor windings</li>
                <li>Star contactor opens -- motor current flows through the resistors</li>
                <li>Delta contactor closes -- motor now in delta configuration</li>
                <li>Resistor contactors open -- resistors disconnected</li>
              </ol>
            </div>
            <p>
              This eliminates the open-circuit interval and prevents transient current spikes. Closed transition is more complex and expensive but is required where the transient current at changeover must be avoided, such as on weak supply networks or for large motors where the transient could cause voltage dips affecting other equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Timer Settings and Contactor Arrangement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <h3 className="text-lg font-semibold text-white mb-3">3.1 Timer Settings</h3>
            <p>
              The star-delta timer controls the duration of the star period -- the time the motor runs in star configuration before transitioning to delta. Setting this timer correctly is critical for proper starter operation and motor protection.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Timer too short:</strong> The motor has not reached sufficient speed when transition occurs. The delta contactor closes on a motor still drawing high current, creating a large current spike (may approach or exceed DOL levels) and a mechanical shock to the drive coupling. The overload relay may trip.</li>
                <li><strong className="text-elec-yellow">Timer too long:</strong> The motor runs in star longer than necessary. The motor may overheat in star (it is designed to run continuously in delta, not star). Wasted energy and unnecessary supply disturbance from the extended starting period.</li>
                <li><strong className="text-elec-yellow">Correct setting:</strong> The timer should allow the motor to reach approximately 80-90% of full speed in star before transition. This is typically 3 to 10 seconds depending on motor size, load inertia and the torque required to accelerate the load.</li>
              </ul>
            </div>
            <p>
              The correct timer setting can be determined by monitoring the motor current during starting with a clamp meter. The star current should have dropped to a level close to the normal running current before transition occurs. Start with a conservative (longer) setting and reduce gradually.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">3.2 Contactor Arrangement</h3>
            <p>
              A star-delta starter requires three contactors and six cables from the starter to the motor:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-3 text-left">
                <li><strong className="text-elec-yellow">Main Contactor (KM1):</strong> Connects the supply to the motor winding starts (U1, V1, W1). Closes first at the start of the sequence and remains closed throughout operation (both star and delta phases).</li>
                <li><strong className="text-elec-yellow">Star Contactor (KM2):</strong> Short-circuits the winding ends (U2, V2, W2) to form the star point. Closes during the star starting period, then opens at transition. Sized for approximately 58% of motor FLC.</li>
                <li><strong className="text-elec-yellow">Delta Contactor (KM3):</strong> Connects each winding end to the opposite phase supply to form the delta configuration. Closes after the star contactor opens and remains closed during running. Sized for approximately 58% of motor FLC.</li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Critical safety requirement:</strong> The star and delta contactors (KM2 and KM3) must be electrically and mechanically interlocked to prevent both closing simultaneously. If both closed at the same time, a short circuit would occur across the supply, with potentially catastrophic results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Limitations of Star-Delta Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While star-delta starting has been a reliable workhorse for decades, it has significant limitations compared to modern electronic starting methods:
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-2 text-left">
                <li>- Starting torque is only one-third of DOL -- unsuitable for high-torque loads</li>
                <li>- The motor must have all six winding terminals accessible (400/690 V rating)</li>
                <li>- Six cables required from starter to motor (more copper, larger containment, higher cost)</li>
                <li>- Current transient at changeover (open transition) can approach or exceed DOL levels</li>
                <li>- No smooth acceleration -- a fixed two-step voltage profile with an abrupt transition</li>
                <li>- No adjustable parameters -- cannot optimise for different load conditions</li>
                <li>- Three contactors required, plus timer and interlocking -- more components to maintain</li>
                <li>- No soft stop capability -- motor coasts to a halt when stopped</li>
                <li>- Being superseded by soft starters and VSDs which offer superior performance at comparable cost</li>
              </ul>
            </div>
            <p>
              Despite these limitations, star-delta starters remain very common in existing UK installations. Maintenance technicians must be proficient in their operation, adjustment and fault diagnosis, even as new installations increasingly specify electronic alternatives.
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
              A systematic approach to star-delta starter fault diagnosis starts with identifying at which stage the fault occurs: star starting, transition, or delta running. This narrows the possible causes significantly.
            </p>
            <div className="my-4 p-4 rounded-lg bg-white/5">
              <ul className="text-white space-y-4 text-left">
                <li><strong className="text-elec-yellow">Motor trips on transition:</strong> Timer set too short (motor has not reached speed). Overload relay trips on the high delta transition current. Solution: increase timer duration. If the problem persists, check for mechanical overload on the driven equipment preventing the motor from reaching speed in star.</li>
                <li><strong className="text-elec-yellow">Motor runs in star but will not transition:</strong> Timer fault (no output signal), delta contactor coil failure, or interlocking issue preventing the delta contactor from closing. Check: timer output voltage, delta coil continuity, and interlock contact status.</li>
                <li><strong className="text-elec-yellow">Motor runs in wrong direction:</strong> Two phases swapped at the motor terminals or starter output. Correction: swap any two of the three main supply connections at the starter input. Do NOT swap at the motor terminal box, as this can disrupt the star-delta winding configuration.</li>
                <li><strong className="text-elec-yellow">Loud bang at transition:</strong> Open transition with poor timing. The residual motor voltage is out of phase with the supply when delta closes, causing a violent current transient. Solution: check and adjust timer setting. If persistent, consider closed transition modification.</li>
                <li><strong className="text-elec-yellow">High current persists after transition:</strong> One phase of the delta contactor not making contact (single-phasing in delta). The motor draws excessive current on the remaining two phases. Check delta contactor contacts and connections for damage or poor contact.</li>
                <li><strong className="text-elec-yellow">Motor does not start at all:</strong> Check: supply voltage at the starter input; main contactor operation; star contactor operation; control circuit fuses and connections; overload relay status (reset if tripped).</li>
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
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Star vs DOL Values</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Starting current = 1/3 of DOL</li>
                <li>Starting torque = 1/3 of DOL</li>
                <li>Winding voltage = 58% of line</li>
                <li>Timer range = 3 to 10 seconds</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Contactor Designations</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>KM1 = Main contactor (always closed)</li>
                <li>KM2 = Star contactor (starting only)</li>
                <li>KM3 = Delta contactor (running)</li>
                <li>KM2 + KM3 MUST be interlocked</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Suitable Applications</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Centrifugal pumps (light start)</li>
                <li>Fans and blowers</li>
                <li>Compressors (unloaded start)</li>
                <li>NOT for: conveyors, crushers, lifts</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 text-sm uppercase tracking-wide">Transition Fault Diagnosis</h3>
              <ul className="text-white text-sm space-y-1.5">
                <li>Trips at transition = timer too short</li>
                <li>Stays in star = timer/delta fault</li>
                <li>Loud bang = out-of-phase reconnection</li>
                <li>High running current = single-phasing</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: DOL Starters
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-4">
              Next: VSDs and Soft Starters
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MOETModule3Section2_3;
