import { ArrowLeft, Search, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Systematic Diagnostic Approach - MOET Module 4 Section 3.2";
const DESCRIPTION = "Structured fault-finding methodology including half-split, input-to-output, six-point and function testing techniques for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "half-split-principle",
    question: "In the half-split diagnostic technique, where do you make your first test measurement?",
    options: [
      "At the power supply input",
      "At the final load",
      "At the approximate midpoint of the circuit or system",
      "At the earth connection"
    ],
    correctIndex: 2,
    explanation: "The half-split technique works by testing at the midpoint of the circuit. The result tells you which half contains the fault. You then test at the midpoint of the faulty half, and so on, rapidly narrowing down the fault location. Each test eliminates approximately half of the remaining possibilities."
  },
  {
    id: "input-output-method",
    question: "The input-to-output (signal tracing) method is most appropriate when:",
    options: [
      "You have no test equipment available",
      "The circuit has a clear signal flow path from input to output",
      "The fault is known to be in the power supply",
      "Multiple faults exist simultaneously"
    ],
    correctIndex: 1,
    explanation: "The input-to-output method follows the signal or power flow through the circuit from source to load. It is most effective when there is a clear, sequential flow path — such as a control circuit where the signal passes through a series of devices. You test at each stage until you find where the expected signal is lost."
  },
  {
    id: "six-point-technique",
    question: "The six-point fault-finding technique involves which sequence of steps?",
    options: [
      "Measure, record, replace, test, document, close",
      "Collect evidence, analyse evidence, locate fault, determine cause, rectify fault, check system",
      "Isolate, lock off, prove dead, repair, test, energise",
      "Plan, prepare, execute, verify, commission, handover"
    ],
    correctIndex: 1,
    explanation: "The six-point technique provides a structured framework: (1) collect evidence — gather symptoms and information, (2) analyse evidence — interpret the data logically, (3) locate the fault — identify exactly where the problem is, (4) determine the cause — understand why it happened, (5) rectify the fault — carry out the repair, (6) check the system — verify the repair has resolved the issue and no secondary faults exist."
  },
  {
    id: "hypothesis-testing",
    question: "In a systematic diagnostic approach, what should you do if your initial hypothesis is proved wrong by testing?",
    options: [
      "Replace the component anyway, as it may fail soon",
      "Return to the evidence, review your analysis, and form a new hypothesis based on the test results",
      "Ask another technician to take over the job",
      "Reset the equipment and hope the fault does not recur"
    ],
    correctIndex: 1,
    explanation: "A disproved hypothesis is not a failure — it is valuable information. The test result has eliminated one possible cause and may point towards the actual fault. Return to your evidence, incorporate the new data, and form a revised hypothesis. This iterative process is at the heart of systematic fault finding."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The primary advantage of a systematic diagnostic approach over trial-and-error is:",
    options: [
      "It requires less technical knowledge",
      "It minimises diagnostic time by eliminating possible causes logically rather than randomly",
      "It does not require any test equipment",
      "It only works on simple circuits"
    ],
    correctAnswer: 1,
    explanation: "A systematic approach uses logic and evidence to eliminate possible causes efficiently. Trial-and-error is random and can be extremely time-consuming, especially in complex systems where there are hundreds of potential fault locations."
  },
  {
    id: 2,
    question: "In a series control circuit with 8 devices, using the half-split technique, the maximum number of tests needed to locate a single open-circuit fault is:",
    options: [
      "8 tests",
      "4 tests",
      "3 tests",
      "2 tests"
    ],
    correctAnswer: 2,
    explanation: "Using half-split on 8 devices: test 1 (midpoint) narrows to 4 devices, test 2 narrows to 2 devices, test 3 identifies the faulty device. In general, the maximum number of tests is log2(n), rounded up. For 8 devices: log2(8) = 3 tests. Compare this to up to 8 tests with a sequential approach."
  },
  {
    id: 3,
    question: "When using the input-to-output method on a motor starter circuit, you find 230 V at the contactor coil terminal A1 but 0 V at terminal A2. This indicates:",
    options: [
      "The contactor coil is healthy",
      "The supply to the circuit is faulty",
      "The contactor coil has an open circuit (or the neutral connection to A2 is broken)",
      "The motor winding has failed"
    ],
    correctAnswer: 2,
    explanation: "If you measure 230 V at A1 (line side) but 0 V at A2 (neutral side), there are two possibilities: the coil is open-circuit (no current can flow to develop a voltage at A2), or the neutral connection from A2 back to the supply neutral is broken. Either way, the fault is localised to the coil circuit — not the supply or motor."
  },
  {
    id: 4,
    question: "The function testing method of fault finding involves:",
    options: [
      "Testing each component individually after removal from the circuit",
      "Operating the system step by step through its normal sequence and observing where it fails",
      "Measuring the resistance of every wire in the circuit",
      "Replacing components one at a time until the fault clears"
    ],
    correctAnswer: 1,
    explanation: "Function testing operates the system through its normal operational sequence while observing each stage. When the sequence stops or behaves abnormally, you have identified the stage where the fault lies. This is particularly effective for sequential control circuits and automated systems."
  },
  {
    id: 5,
    question: "A motor starter circuit has the following: supply present at the isolator output, supply present at the fuse output, no voltage at the contactor coil A1 terminal. The fault is most likely in:",
    options: [
      "The motor windings",
      "The control circuit between the fuses and the contactor coil — typically a control switch, interlock or overload contact",
      "The main power supply",
      "The cable between the starter and the motor"
    ],
    correctAnswer: 1,
    explanation: "Following the signal flow: supply is confirmed at the isolator and fuse outputs, but is lost before reaching the contactor coil A1. The fault lies in the control circuit between these two points. This section typically contains start/stop buttons, interlock contacts, overload relay contacts, and emergency stop devices — any of which could be open-circuit."
  },
  {
    id: 6,
    question: "Which diagnostic approach would be MOST efficient for a fault in a PLC-controlled conveyor system with 40 inputs and outputs?",
    options: [
      "Testing every input and output sequentially from the first",
      "Replacing the PLC and hoping the fault clears",
      "Using the PLC diagnostic display to identify which input or output has an unexpected state, then investigating that specific point",
      "Disconnecting all field wiring and testing each wire individually"
    ],
    correctAnswer: 2,
    explanation: "Modern PLCs provide diagnostic displays showing the real-time state of every input and output. By observing which signal has an unexpected state (e.g., an input that should be ON reading OFF), you can immediately identify the field device or wiring to investigate. This is far more efficient than testing all 40 I/O points."
  },
  {
    id: 7,
    question: "After repairing a fault, the 'check system' step of the six-point technique requires you to:",
    options: [
      "Simply switch on and walk away",
      "Verify the repair has resolved the original fault AND check for any secondary faults or collateral damage",
      "Only check the repaired component",
      "Write a report and close the job"
    ],
    correctAnswer: 1,
    explanation: "The final check must confirm that the original fault is resolved and that the repair has not introduced any new problems. Secondary faults may exist — for example, a short circuit that damaged a contactor may also have weakened the cable insulation. A thorough functional test of the complete system is essential before returning it to service."
  },
  {
    id: 8,
    question: "When fault finding a three-phase motor that runs but in the wrong direction, the systematic approach would identify the cause as:",
    options: [
      "A failed motor winding",
      "Two of the three phase connections being transposed (swapped)",
      "The motor overload setting being too high",
      "A faulty earth connection"
    ],
    correctAnswer: 1,
    explanation: "A three-phase motor's direction of rotation is determined by the phase sequence at its terminals. If two phases are transposed (e.g., L1 and L2 swapped), the motor will run in the opposite direction. This is a common occurrence after maintenance work where connections have been disturbed. Phase rotation can be verified using a phase rotation meter."
  },
  {
    id: 9,
    question: "The 'determine cause' step in the six-point technique is important because:",
    options: [
      "It satisfies the paperwork requirements",
      "It identifies the root cause so that the same fault does not recur after repair",
      "It determines who is to blame for the fault",
      "It is only required for warranty claims"
    ],
    correctAnswer: 1,
    explanation: "Determining the cause (root cause analysis) is critical for preventing recurrence. Simply replacing a failed component without understanding why it failed often results in the replacement failing in the same way. For example, if a contactor coil has burnt out due to a voltage dip causing the armature to chatter, replacing the coil without addressing the voltage issue will lead to another failure."
  },
  {
    id: 10,
    question: "A systematic diagnostic approach requires you to:",
    options: [
      "Always start by replacing the cheapest component first",
      "Form a hypothesis based on evidence, test the hypothesis, and revise if necessary",
      "Follow the same testing sequence regardless of the fault symptoms",
      "Only use the oscilloscope for all fault finding"
    ],
    correctAnswer: 1,
    explanation: "The systematic approach is evidence-based and hypothesis-driven. You gather evidence, form a hypothesis about the most likely cause, test that hypothesis, and revise your diagnosis based on the results. This scientific method ensures efficient use of time and resources."
  },
  {
    id: 11,
    question: "In a control circuit with a start button, stop button, contactor with auxiliary contact, overload relay and emergency stop, the half-split first test point would be:",
    options: [
      "The start button",
      "The contactor coil",
      "Approximately midway — at the auxiliary contact or overload relay contact",
      "The emergency stop"
    ],
    correctAnswer: 2,
    explanation: "With five series devices in the control circuit, the midpoint falls at approximately the third device — the auxiliary contact or overload relay contact. Testing here first tells you whether the fault is in the first half (start/stop buttons) or the second half (overload, emergency stop, contactor coil)."
  },
  {
    id: 12,
    question: "Documentation during the diagnostic process should include:",
    options: [
      "Only the final repair carried out",
      "Each test performed, its result, the reasoning behind the test, and the conclusions drawn",
      "Just the time spent on the job",
      "Only information requested by the supervisor"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive diagnostic documentation records the entire thought process: what was tested, what the results were, what conclusions were drawn, and what actions were taken. This creates a knowledge base for future fault finding, supports quality assurance, and provides evidence of a systematic approach as required by ST1426."
  }
];

const faqs = [
  {
    question: "Which diagnostic technique should I use — half-split, input-to-output, or six-point?",
    answer: "They are not mutually exclusive. The six-point technique is your overall framework for every fault. Within that framework, you choose the most appropriate locating method. Use half-split when you need to quickly narrow down a fault location in a long series circuit. Use input-to-output when the circuit has a clear signal flow path. Use function testing when the system has a defined operational sequence. In practice, you will often combine methods within a single diagnosis."
  },
  {
    question: "How do I decide where to start testing?",
    answer: "Start with the information you gathered during initial assessment. Your preliminary hypothesis should guide your first test point. If the operator reported a supply failure, start at the supply. If a drive is showing a specific fault code, start at the condition indicated by that code. If you have no strong hypothesis, the half-split method starting at the midpoint is statistically the most efficient approach."
  },
  {
    question: "What if I find multiple faults in the same circuit?",
    answer: "Multiple faults do occur, particularly after a major event such as a short circuit or lightning strike. Address them one at a time, starting with the most upstream fault (closest to the supply). A downstream fault may be a consequence of the upstream fault. After rectifying each fault, re-test before moving to the next. Document all faults found, even if they appear related."
  },
  {
    question: "Is it acceptable to use substitution (swapping components) as a diagnostic method?",
    answer: "Substitution can be useful as a confirmation step — swapping a suspected faulty component with a known good one to confirm the diagnosis. However, it should not be the primary diagnostic method. Randomly swapping components is inefficient and can introduce new faults if done carelessly. Always diagnose first, then use substitution only to confirm if needed."
  },
  {
    question: "How does systematic fault finding relate to the ST1426 End Point Assessment?",
    answer: "ST1426 EPA includes a practical assessment where you may be required to demonstrate fault-finding skills. Assessors will look for evidence of a systematic approach: gathering information, forming a hypothesis, selecting appropriate tests, interpreting results, and reaching a correct diagnosis. They are assessing your method as much as your result — an incorrect diagnosis reached systematically will score better than a correct diagnosis reached by luck."
  },
  {
    question: "What is the role of circuit diagrams in systematic fault finding?",
    answer: "Circuit diagrams are essential tools. A schematic diagram shows how the circuit works logically, helping you understand the expected signal flow and identify where to test. A wiring diagram shows the physical connections, helping you locate test points and trace cables. Always obtain and study the relevant diagrams before commencing fault diagnosis. If diagrams are not available, sketch one as you investigate — this structured approach prevents confusion in complex circuits."
  }
];

const MOETModule4Section3_2 = () => {
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
            <Search className="h-4 w-4" />
            <span>Module 4.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Systematic Diagnostic Approach
          </h1>
          <p className="text-white/80">
            Structured fault-finding methodology and diagnostic procedures for efficient diagnosis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Six-point:</strong> Collect, analyse, locate, determine cause, rectify, check</li>
              <li className="pl-1"><strong>Half-split:</strong> Test at midpoint to eliminate half the circuit each time</li>
              <li className="pl-1"><strong>Input-to-output:</strong> Follow signal flow from supply to load</li>
              <li className="pl-1"><strong>Function test:</strong> Operate the system through its sequence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hypothesis driven:</strong> Form, test, revise — never guess randomly</li>
              <li className="pl-1"><strong>Evidence based:</strong> Every test should answer a specific question</li>
              <li className="pl-1"><strong>Root cause:</strong> Identify why the fault occurred, not just what failed</li>
              <li className="pl-1"><strong>ST1426:</strong> Systematic approach assessed in EPA practical element</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the six-point fault-finding technique to electrical maintenance scenarios",
              "Use the half-split method to rapidly locate faults in series circuits",
              "Follow the input-to-output method for sequential signal tracing",
              "Conduct function testing on automated and sequential control systems",
              "Form, test and revise diagnostic hypotheses based on evidence",
              "Carry out root cause analysis to prevent fault recurrence"
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
            The Six-Point Fault-Finding Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The six-point technique is the foundation of all structured fault finding in electrical maintenance. It provides a logical framework that guides you from the initial symptom through to a confirmed repair, ensuring nothing is missed and the root cause is addressed. This technique is explicitly referenced in electrical engineering training standards including the ST1426 Maintenance and Operations Engineering Technician pathway, and you should be able to describe and apply all six stages.
            </p>
            <p>
              Unlike ad-hoc or trial-and-error methods, the six-point technique forces discipline at every stage. It prevents the common pitfall of jumping to conclusions, where a technician assumes the cause based on past experience without verifying it for the current fault. While experience is valuable, every fault is unique in its specific context, and the systematic approach ensures you treat it as such.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Collect Evidence</h3>
                <p className="text-sm text-white">
                  Gather all available information about the fault. This includes the operator's account, visual and sensory observations, trip indicator readings, fault codes, alarm logs, maintenance history and circuit documentation. The quality of your diagnosis depends directly on the quality of the evidence you collect. As covered in Section 4.3.1, this step should be thorough and unhurried.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Analyse Evidence</h3>
                <p className="text-sm text-white">
                  Interpret the collected evidence logically. What do the symptoms suggest? What are the possible causes? Which causes are most likely given the evidence? This is where your technical knowledge is applied — understanding how the circuit works, what each symptom means, and what could produce the observed combination of symptoms. Form your preliminary hypothesis at this stage.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Locate the Fault</h3>
                <p className="text-sm text-white">
                  Using an appropriate diagnostic technique (half-split, input-to-output, function test or unit substitution), systematically narrow down the fault location. Each test should be designed to confirm or eliminate a specific hypothesis. Record every test result — even negative results (tests that show everything is normal) are valuable because they eliminate possible causes.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Determine the Cause</h3>
                <p className="text-sm text-white">
                  Once the fault is located, determine why it occurred. A blown fuse is a symptom, not a cause — what caused the excessive current? A burnt-out contactor coil is a component failure, but what caused the coil to overheat? Root cause analysis prevents recurrence and is a hallmark of a skilled maintenance technician. Common root causes include loose connections, incorrect settings, mechanical wear, environmental factors and design limitations.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 5 — Rectify the Fault</h3>
                <p className="text-sm text-white">
                  Carry out the repair, addressing both the immediate failure and the root cause. Use correct replacement components rated for the application. Follow manufacturer specifications and relevant standards. Ensure all connections are secure and correctly torqued. If the root cause cannot be addressed immediately (e.g., it requires design modification), document it and implement temporary controls.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 6 — Check the System</h3>
                <p className="text-sm text-white">
                  Verify that the repair has resolved the original fault. Carry out appropriate tests — insulation resistance, continuity, functional operation under load. Check for secondary faults or collateral damage that may have been caused by the original fault. Monitor the system for a suitable period to confirm stable operation. Only return the system to service when you are satisfied it is operating correctly.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The six-point technique is iterative, not linear. If your tests at Step 3 disprove your hypothesis from Step 2, return to Step 2 with the new evidence and re-analyse. Each iteration brings you closer to the correct diagnosis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Half-Split Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The half-split technique is one of the most powerful and efficient fault-locating methods available to the maintenance technician. It works on a simple mathematical principle: by testing at the midpoint of a circuit, you immediately eliminate half of the possible fault locations. Repeating this process on the remaining half, and then again on the quarter, you can locate a fault in a circuit with hundreds of components in remarkably few tests.
            </p>
            <p>
              Consider a series control circuit with 16 devices — start button, stop button, interlocks, overload contacts, auxiliary contacts, emergency stops and the contactor coil. Testing every device sequentially from the start could require up to 16 tests. Using half-split, you test at the midpoint (device 8). If the signal is present, the fault is in devices 9 to 16. Test at device 12 (midpoint of the remaining half). Continue this process, and you will locate the fault in a maximum of 4 tests — log2(16) = 4.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Half-Split in Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Identify the circuit extent:</strong> Determine the start point (supply) and end point (load) of the circuit section you are diagnosing</li>
                <li className="pl-1"><strong>Find the midpoint:</strong> Identify a test-accessible point approximately halfway through the circuit</li>
                <li className="pl-1"><strong>Test at the midpoint:</strong> Check for the expected signal (voltage, continuity, or logic state)</li>
                <li className="pl-1"><strong>Determine which half:</strong> If the signal is present at the midpoint, the fault is downstream; if absent, the fault is upstream</li>
                <li className="pl-1"><strong>Repeat:</strong> Apply the same process to the faulty half, testing at its midpoint</li>
                <li className="pl-1"><strong>Continue:</strong> Until the fault is localised to a single component or connection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Half-Split</p>
              <p className="text-sm text-white mb-3">
                The half-split technique is most effective for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Series circuits where a single open-circuit fault has broken the circuit</li>
                <li className="pl-1">Long cable runs where you need to locate a break or short circuit</li>
                <li className="pl-1">Control circuits with many series-connected contacts</li>
                <li className="pl-1">Lighting circuits where one section has failed</li>
                <li className="pl-1">Any circuit where you can access intermediate test points</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Limitation:</strong> The half-split technique assumes a single fault. If multiple faults exist in the same circuit, the results can be misleading. If your diagnosis does not converge on a single point, consider the possibility of multiple faults and switch to a sequential approach for the affected section.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Input-to-Output and Signal Tracing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The input-to-output method, also known as signal tracing or signal injection, follows the logical flow of a circuit from its power source or signal input through to its final output or load. At each stage, you verify that the expected signal is present and correct. When you reach a point where the signal is lost or corrupted, you have located the fault.
            </p>
            <p>
              This method is particularly effective for circuits with a clear sequential flow — such as motor starter control circuits, process control loops, and communication systems. It mirrors the way the circuit actually works, making it intuitive to follow. However, it can be less efficient than half-split for very long circuits, as you may need to test many points before reaching the fault.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Tracing Example — Motor Starter Control Circuit</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Test point 1:</strong> Supply at the control fuse — 230 V present? If yes, supply is confirmed</li>
                <li className="pl-1"><strong>Test point 2:</strong> Output of the emergency stop — 230 V present? If yes, E-stop is healthy</li>
                <li className="pl-1"><strong>Test point 3:</strong> Through the stop button — 230 V present? If yes, stop circuit is healthy</li>
                <li className="pl-1"><strong>Test point 4:</strong> Through the overload contact — 230 V present? If no, overload has tripped or contact is faulty</li>
                <li className="pl-1"><strong>Test point 5:</strong> At contactor coil A1 — should have 230 V if all upstream contacts are closed</li>
              </ul>
            </div>

            <p>
              A variation of this method is output-to-input (reverse tracing), which starts at the load and works backwards towards the supply. This can be more efficient when you suspect the fault is near the load end of the circuit. For example, if a motor is not running but the contactor is energised (main contacts closed), starting at the motor and working back towards the contactor is more logical than starting at the supply.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Consideration</p>
              <p className="text-sm text-white">
                When signal tracing in a control circuit that is energised (e.g., taking voltage measurements), you must follow Regulation 14 of the Electricity at Work Regulations 1989. Live testing is only permitted when it is unreasonable to work dead, it is reasonable to work live, and suitable precautions are in place. Use GS38-compliant test probes, maintain safe clearances, and ensure you are competent to carry out the measurements safely.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Always have the circuit schematic diagram in front of you when signal tracing. Mark each test point on the diagram and annotate it with the measured value. This visual record makes it much easier to see where the signal is lost and prevents you from missing any part of the circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Function Testing and Hypothesis Revision
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Function testing is a diagnostic approach where the system is operated through its normal sequence while you observe each stage. This method is particularly effective for sequential control systems, automated processes and interlocked systems where the failure manifests as the sequence stopping at a specific point. By identifying where the sequence halts, you immediately narrow the fault to the device or condition required to advance to the next stage.
            </p>
            <p>
              For example, consider a conveyor system that should start when a start button is pressed, provided all interlocks are satisfied. If pressing the start button does not energise the contactor, function testing involves checking each interlock in turn: guard switch, emergency stop, level sensor, temperature switch. The first interlock that is not in its correct state is the likely cause of the failure. Many modern control systems include diagnostic displays that show the state of each interlock, making function testing straightforward.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Function Testing Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Understand the sequence:</strong> Before testing, understand the system's normal operational sequence from the documentation or control logic</li>
                <li className="pl-1"><strong>Start at the beginning:</strong> Initiate the sequence from the normal starting condition</li>
                <li className="pl-1"><strong>Observe each stage:</strong> Watch for the expected response at each step — does the pilot light illuminate, does the contactor pull in, does the valve open?</li>
                <li className="pl-1"><strong>Identify the stall point:</strong> Note exactly where the sequence stops or deviates from normal</li>
                <li className="pl-1"><strong>Investigate the stall:</strong> Determine what condition is required to advance past the stall point, then verify that condition</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hypothesis Revision — The Diagnostic Cycle</p>
              <p className="text-sm text-white mb-3">
                Central to all systematic approaches is the concept of hypothesis revision. Fault finding is a scientific process: you observe evidence, form a hypothesis (your best theory of the fault), design a test to verify or disprove the hypothesis, and then act on the result.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>If the test confirms your hypothesis:</strong> Proceed to locate the specific fault within the suspected area and determine its cause</li>
                <li className="pl-1"><strong>If the test disproves your hypothesis:</strong> This is not a failure — it is progress. The test result has eliminated one possibility and may provide new evidence pointing to the actual fault. Return to the analysis step with this new information</li>
                <li className="pl-1"><strong>If the test is inconclusive:</strong> Redesign the test to be more specific, or gather additional evidence before re-testing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Avoiding Confirmation Bias</p>
              <p className="text-sm text-white">
                One of the most dangerous pitfalls in fault finding is confirmation bias — seeing only evidence that supports your initial theory while ignoring evidence that contradicts it. A skilled diagnostician actively looks for evidence that disproves their hypothesis. If your first hypothesis survives attempts to disprove it, you can have high confidence in the diagnosis. If it does not survive, you have learned something valuable.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The End Point Assessment for ST1426 explicitly assesses your ability to use a systematic approach. Assessors want to see you collecting evidence, forming hypotheses, selecting tests logically, and revising your diagnosis based on results — not guessing or randomly testing components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Combining Techniques and Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In real-world maintenance, you will rarely use a single diagnostic technique in isolation. Effective fault finding typically combines elements of several approaches, guided by the six-point framework. The skill lies in selecting the right technique for each stage of the diagnosis and adapting your approach as new information emerges.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Example — Combining Techniques</p>
              <p className="text-sm text-white mb-3">
                A packaging machine has stopped. The operator reports it "just stopped" mid-cycle with no warning. Here is how a systematic approach combines techniques:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Collect evidence (six-point Step 1):</strong> Interview operator, check machine display (shows "safety interlock fault"), check no tripped devices in the distribution board</li>
                <li className="pl-1"><strong>Analyse evidence (six-point Step 2):</strong> The display message suggests a safety interlock is open. The machine has 12 safety interlocks (guard switches, light curtains, emergency stops)</li>
                <li className="pl-1"><strong>Locate the fault (six-point Step 3):</strong> Use function testing — the PLC diagnostic screen shows all interlocks satisfied except "Guard 7 — conveyor discharge". Check Guard 7 physically — it is closed. Measure the signal at the PLC input — 0 V (should be 24 V). Use input-to-output: 24 V present at the guard switch, 0 V at the PLC input terminal. Fault is in the cable or connection between them</li>
                <li className="pl-1"><strong>Determine cause (six-point Step 4):</strong> Cable routing passes through a hinge point on a moving guard panel. Repeated flexing has fractured a conductor inside the cable</li>
                <li className="pl-1"><strong>Rectify (six-point Step 5):</strong> Replace the cable with a flexible type rated for the application, re-route to avoid the pinch point</li>
                <li className="pl-1"><strong>Check system (six-point Step 6):</strong> Verify Guard 7 signal at the PLC, function test all 12 interlocks, run the machine through a complete cycle</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Diagnostic Experience</h3>
                <p className="text-sm text-white">
                  Every fault you diagnose adds to your experience database. Over time, you will recognise patterns — certain symptoms that consistently point to specific causes. This experience accelerates diagnosis but must never replace the systematic approach. Use experience to guide your hypothesis, but always verify with testing.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Working Under Pressure</h3>
                <p className="text-sm text-white">
                  Production pressure to restore service quickly is a constant challenge for maintenance technicians. The systematic approach is actually the fastest method in most cases — despite appearing slower initially. A five-minute assessment that identifies the correct fault first time is always faster than 30 minutes of random component swapping that may not work at all.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Keep a personal fault-finding log. Record every significant fault you diagnose — the symptoms, your diagnostic process, the root cause, and the repair. Over time, this becomes an invaluable reference that accelerates your future diagnostics. Many experienced technicians can diagnose common faults in seconds because they have seen the same pattern dozens of times — but they all started by building their experience one fault at a time.
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
                <p className="font-medium text-white mb-1">Six-Point Technique</p>
                <ul className="space-y-0.5">
                  <li>1. Collect evidence — gather all available information</li>
                  <li>2. Analyse evidence — interpret logically, form hypothesis</li>
                  <li>3. Locate fault — use half-split, signal trace or function test</li>
                  <li>4. Determine cause — root cause analysis, not just symptom</li>
                  <li>5. Rectify fault — repair and address root cause</li>
                  <li>6. Check system — verify repair, test for secondary faults</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Choosing a Technique</p>
                <ul className="space-y-0.5">
                  <li>Half-split — long series circuits, cable faults</li>
                  <li>Input-to-output — sequential signal flow circuits</li>
                  <li>Function test — automated sequences, interlocked systems</li>
                  <li>Substitution — confirmation only, not primary method</li>
                  <li>Combine methods as needed within six-point framework</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Symptom Recognition
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-3">
              Next: Electrical Test Instruments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section3_2;
