import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault Diagnosis Exercises - MOET Module 7 Section 2.2";
const DESCRIPTION = "Systematic fault diagnosis under observation: thinking aloud, using test instruments correctly, documenting findings and time-limited fault finding for the EPA practical assessment.";

const quickCheckQuestions = [
  {
    id: "systematic-approach",
    question: "What is the first step in a systematic fault diagnosis approach?",
    options: [
      "Start replacing components until the fault clears",
      "Gather information — symptoms, history, when the fault occurred, what changed",
      "Immediately test every circuit with a multimeter",
      "Ask the assessor where the fault is"
    ],
    correctIndex: 1,
    explanation: "Systematic fault diagnosis always starts with information gathering. Understanding the symptoms, history, and context narrows the search area and prevents wasted time testing irrelevant parts of the system. This logical approach is what the assessor is looking for."
  },
  {
    id: "thinking-aloud",
    question: "Why is 'thinking aloud' important during the EPA fault diagnosis observation?",
    options: [
      "It is not important — work silently",
      "It allows the assessor to follow your reasoning and confirm you are using a logical, systematic approach",
      "It distracts from the task",
      "It is only required if you cannot find the fault"
    ],
    correctIndex: 1,
    explanation: "Thinking aloud lets the assessor assess your diagnostic reasoning, not just the outcome. Even if you take longer to find the fault, demonstrating a logical, systematic approach scores higher than finding the fault by luck without a clear method."
  },
  {
    id: "documenting-findings",
    question: "Why should you document your findings during fault diagnosis?",
    options: [
      "It is only for paperwork purposes",
      "Documentation provides evidence of systematic work, aids in reporting to the client, and creates a record for future maintenance",
      "It slows you down unnecessarily",
      "Only senior technicians need to document"
    ],
    correctIndex: 1,
    explanation: "Documenting findings demonstrates professionalism, provides evidence for the assessor, creates a maintenance record, and enables clear communication with supervisors and clients. It is a key professional behaviour assessed in the EPA."
  },
  {
    id: "half-split-advantage",
    question: "What is the main advantage of the half-split fault-finding technique?",
    options: [
      "It requires less expensive test equipment",
      "It only works on simple circuits",
      "It efficiently narrows the fault location by halving the search area with each test, minimising diagnostic time",
      "It is the only method accepted in the EPA"
    ],
    correctIndex: 2,
    explanation: "The half-split technique reduces the fault search area by half with each measurement. For a circuit with 16 possible fault locations, you need at most 4 tests to pinpoint the fault (compared to up to 16 tests with a sequential approach). This efficiency is valued in the EPA where time is limited."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The systematic approach to fault diagnosis follows which general sequence?",
    options: [
      "Test, replace, test again",
      "Gather information, analyse, test, identify, rectify, verify",
      "Replace all suspect components, then test",
      "Ask someone else to diagnose the fault"
    ],
    correctAnswer: 1,
    explanation: "The systematic approach follows: gather information (symptoms, history), analyse (narrow down possible causes), test (use instruments to confirm), identify (pinpoint the fault), rectify (repair or replace), and verify (confirm the system works correctly after repair)."
  },
  {
    id: 2,
    question: "During the EPA observation, the assessor values a logical approach because:",
    options: [
      "It makes the observation last longer",
      "It demonstrates genuine competence — a technician who can diagnose any fault, not just familiar ones",
      "It is easier to observe",
      "The assessor prefers slow workers"
    ],
    correctAnswer: 1,
    explanation: "A logical, systematic approach is transferable to any fault situation. The assessor wants to confirm you can diagnose unfamiliar faults, not just ones you have seen before. The method demonstrates the underpinning knowledge and analytical skills required by ST1426."
  },
  {
    id: 3,
    question: "When using a multimeter for fault diagnosis, you should first:",
    options: [
      "Set it to the highest range and start measuring",
      "Select the correct function and range for the measurement, check leads, and confirm the meter is working",
      "Use it on the AC voltage setting for all measurements",
      "Borrow someone else's meter"
    ],
    correctAnswer: 1,
    explanation: "Correct instrument selection, function/range setting, lead inspection, and verification are essential. Using the wrong function (e.g., resistance mode on a live circuit) can damage the meter and give misleading readings. This basic competence is assessed during the observation."
  },
  {
    id: 4,
    question: "If you cannot find the fault within the allocated time, you should:",
    options: [
      "Panic and guess",
      "Explain to the assessor what you have done, what you have ruled out, and what your next steps would be",
      "Pretend you found and fixed it",
      "Leave without saying anything"
    ],
    correctAnswer: 1,
    explanation: "The assessor assesses your method and approach, not just the outcome. Clearly explaining your systematic process, what you have eliminated, and your planned next steps demonstrates competence even if time runs out. A logical approach with an incomplete result can still achieve a pass."
  },
  {
    id: 5,
    question: "A 'half-split' technique in fault diagnosis involves:",
    options: [
      "Cutting cables in half to test them",
      "Testing at the midpoint of a system to determine which half contains the fault, then repeating",
      "Splitting the work between two technicians",
      "Testing only half the circuits"
    ],
    correctAnswer: 1,
    explanation: "The half-split technique efficiently narrows the fault location by testing at the midpoint of a circuit or system. If the test is normal at the midpoint, the fault is in the second half; if abnormal, it is in the first half. Repeating this halves the search area each time."
  },
  {
    id: 6,
    question: "When documenting fault diagnosis findings, you should record:",
    options: [
      "Only the final fault identified",
      "The symptoms, tests performed, readings obtained, fault identified, repair carried out, and verification results",
      "Your personal opinion of the equipment quality",
      "Nothing — verbal reporting is sufficient"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation provides a complete record of the diagnostic process. This evidence supports your EPA assessment, aids future maintenance, and demonstrates the professional reporting skills required by ST1426."
  },
  {
    id: 7,
    question: "Insulation resistance testing during fault diagnosis requires:",
    options: [
      "The circuit to be energised",
      "The circuit to be de-energised, disconnected from sensitive equipment, and all switches closed",
      "No preparation — just connect and test",
      "Only a visual inspection"
    ],
    correctAnswer: 1,
    explanation: "IR testing applies a high voltage (typically 500 V DC for LV circuits) so the circuit must be dead and sensitive equipment (RCDs, electronic devices) disconnected. Switches should be closed so the full circuit is tested. These preparation steps demonstrate competence to the assessor."
  },
  {
    id: 8,
    question: "A continuity test reading of 'OL' (over limit) on a circuit that should be continuous indicates:",
    options: [
      "The circuit is healthy",
      "An open circuit — a break in the conductor somewhere in the circuit",
      "The test meter is faulty",
      "Normal for all circuits"
    ],
    correctAnswer: 1,
    explanation: "An OL reading means infinite or very high resistance — indicating a break (open circuit) in the conductor. This could be a broken wire, loose connection, blown fuse, or open switch. Your next step would be to use the half-split technique to locate the break."
  },
  {
    id: 9,
    question: "Before starting fault diagnosis on a motor control circuit, you should:",
    options: [
      "Energise the circuit and observe what happens",
      "Review the circuit diagram, understand the intended operation, and identify test points",
      "Replace the motor immediately",
      "Remove all wiring and start fresh"
    ],
    correctAnswer: 1,
    explanation: "Understanding the circuit's intended operation is essential before you can diagnose what is wrong. Reviewing the diagram identifies test points, expected readings, and the logical sequence of operation. Without this understanding, testing is random rather than systematic."
  },
  {
    id: 10,
    question: "The EPA practical observation for fault diagnosis typically expects you to demonstrate:",
    options: [
      "Knowledge of every possible fault in every type of equipment",
      "A systematic diagnostic method, safe working practices, correct use of instruments, and clear communication",
      "Speed above all else",
      "Memorised fault codes for specific equipment"
    ],
    correctAnswer: 1,
    explanation: "The assessor evaluates your approach and methodology, not encyclopaedic knowledge. Demonstrating a systematic method, safe practices, correct instrument use, and clear communication of your findings meets the EPA requirements for competence."
  },
  {
    id: 11,
    question: "When using the 'input-to-output' fault-finding technique on a control system, you:",
    options: [
      "Start by replacing the output device",
      "Check the input signal first, then trace it through each stage of the control system towards the output, identifying where the signal is lost",
      "Only test the power supply",
      "Disconnect all inputs and test them on the bench"
    ],
    correctAnswer: 1,
    explanation: "The input-to-output technique follows the signal path from sensor/input through the controller to the actuator/output. By checking at each stage, you identify precisely where the signal chain is broken. This is particularly effective for PLC-based systems where you can observe I/O status indicators."
  },
  {
    id: 12,
    question: "A GS38-compliant voltage indicator used during fault diagnosis must have:",
    options: [
      "Any type of probe — probe design is not important",
      "Fused leads, finger guards, protected tips with maximum 4 mm exposed, and a proving unit to confirm correct operation before and after use",
      "Only a digital display",
      "A built-in insulation resistance tester"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies safety requirements for test instruments. Voltage indicators must have fused leads, finger guards, probe tips with no more than 2-4 mm exposed, and be proved on a known source before and after testing (prove-test-prove). Using non-compliant instruments in the EPA would be a safety failure."
  }
];

const faqs = [
  {
    question: "What types of faults might I encounter in the EPA practical?",
    answer: "Common faults include: open circuits (broken conductors, loose connections), short circuits, earth faults, incorrect wiring, component failures (contactors, relays, fuses), and control system faults. The specific faults depend on your EPAO, but a systematic approach works for all types. Practise with a variety of fault types during your preparation."
  },
  {
    question: "Should I use a specific fault-finding method or can I use my own approach?",
    answer: "You should use a recognised systematic approach (e.g., the six-step method: gather, analyse, test, identify, rectify, verify). Your personal approach is fine as long as it is logical and systematic. The assessor wants to see method, not a specific prescribed procedure. Avoid random 'trial and error' — this is not considered systematic."
  },
  {
    question: "How much time is typically allowed for fault diagnosis in the EPA?",
    answer: "Time allocations vary by EPAO and the complexity of the fault. Typically 20-40 minutes per fault diagnosis exercise. Your training provider should confirm the expected timing. Practise working within these time limits so you are not caught out on the day."
  },
  {
    question: "What if I misidentify the fault?",
    answer: "If you identify the wrong fault but demonstrated a systematic approach, safe working, and correct instrument use, you may still achieve a pass for your method and process. However, correctly identifying and rectifying the fault is needed for higher marks. If you realise your diagnosis is wrong, explain your revised reasoning — self-correction demonstrates competence."
  },
  {
    question: "Can I ask the assessor for help during fault diagnosis?",
    answer: "No. The assessor observes but does not assist. You may ask clarifying questions about the task brief (e.g., 'What symptoms were reported?') but not diagnostic guidance. Treat the assessor as a client who reported the fault — they can describe symptoms but cannot diagnose it for you."
  },
  {
    question: "What test instruments should I be confident using before the EPA?",
    answer: "You should be proficient with a GS38-compliant voltage indicator, a digital multimeter (voltage, resistance, continuity), an insulation resistance tester, and a clamp meter. Know how to select the correct instrument, set the function and range, interpret readings, and perform the prove-test-prove procedure. Practise with the specific instruments you will use on the day."
  }
];

const MOETModule7Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
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
            <span>Module 7.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Diagnosis Exercises
          </h1>
          <p className="text-white/80">
            Systematic fault finding under observation with clear communication and documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Method:</strong> Gather, analyse, test, identify, rectify, verify</li>
              <li className="pl-1"><strong>Think aloud:</strong> Explain reasoning as you work</li>
              <li className="pl-1"><strong>Instruments:</strong> Correct selection, safe use, accurate readings</li>
              <li className="pl-1"><strong>Document:</strong> Record symptoms, tests, findings, repair</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Techniques:</strong> Half-split, input-to-output, unit substitution</li>
              <li className="pl-1"><strong>Safety:</strong> Safe isolation before testing dead circuits</li>
              <li className="pl-1"><strong>Instruments:</strong> Multimeter, insulation tester, clamp meter</li>
              <li className="pl-1"><strong>ST1426:</strong> Fault diagnosis is a core EPA competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the six-step systematic fault diagnosis method under observation",
              "Use the thinking-aloud technique to demonstrate reasoning to the assessor",
              "Select and use appropriate test instruments safely and correctly",
              "Apply the half-split technique to efficiently locate fault positions",
              "Document all findings clearly for evidence and reporting purposes",
              "Manage time effectively during fault diagnosis within EPA time limits"
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
            The Systematic Fault Diagnosis Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault diagnosis is not guesswork — it is a structured, logical process that applies to any electrical
              system. The six-step method provides a framework that ensures thorough, efficient diagnosis regardless
              of the system's complexity. During the EPA, the assessor wants to see this structured approach in action,
              not lucky guesses or random component swapping.
            </p>

            <p>
              The importance of systematic fault finding cannot be overstated. In industry, a technician who can
              methodically diagnose any fault — even on equipment they have never seen before — is far more valuable
              than one who can only fix familiar problems. The EPA is designed to assess this transferable competence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Six-Step Method</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Gather information:</strong> Symptoms reported, when did it start, what changed, any previous faults, review documentation and circuit diagrams</li>
                <li className="pl-1"><strong>Analyse:</strong> Based on the information, develop a list of possible causes ranked by likelihood</li>
                <li className="pl-1"><strong>Test:</strong> Use appropriate instruments to test the most likely cause first, working systematically through your list</li>
                <li className="pl-1"><strong>Identify:</strong> Confirm the specific fault based on your test results</li>
                <li className="pl-1"><strong>Rectify:</strong> Repair, replace, or adjust to correct the fault</li>
                <li className="pl-1"><strong>Verify:</strong> Test the system to confirm it is working correctly after the repair</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fault Types in Electrical Maintenance</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symptoms</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open circuit</td>
                      <td className="border border-white/10 px-3 py-2">No power, partial operation</td>
                      <td className="border border-white/10 px-3 py-2">Continuity test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short circuit</td>
                      <td className="border border-white/10 px-3 py-2">Blown fuse, tripped MCB</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault</td>
                      <td className="border border-white/10 px-3 py-2">RCD tripping</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance L-E, N-E</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High resistance joint</td>
                      <td className="border border-white/10 px-3 py-2">Overheating, intermittent</td>
                      <td className="border border-white/10 px-3 py-2">Thermal imaging, resistance test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Component failure</td>
                      <td className="border border-white/10 px-3 py-2">System not operating correctly</td>
                      <td className="border border-white/10 px-3 py-2">Functional test, coil resistance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Skip the Verify Step</p>
              <p className="text-sm text-white">
                A common mistake is declaring the fault fixed after the repair without verification testing. Always
                test the system after repair to confirm correct operation. This includes functional testing under
                normal operating conditions. In the EPA, skipping verification is a significant mark deduction.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The assessor is not expecting you to find the fault instantly. They are
              looking for a methodical approach, safe working, and clear communication throughout the process.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thinking Aloud and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During the EPA practical observation, the assessor cannot read your mind. Without verbal communication,
              they can only see what you do — not why you are doing it. Thinking aloud bridges this gap and is the
              single most effective way to demonstrate your diagnostic competence. Candidates who think aloud
              consistently score higher than those who work in silence.
            </p>

            <p>
              This does not mean providing a running commentary on every tiny action. The key is to communicate at
              decision points — when you are reasoning about what to test next, interpreting a reading, or ruling
              out a possible cause. This shows the assessor your analytical process.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Thinking-Aloud Phrases</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">"Based on the symptoms, I suspect the fault could be... because..."</li>
                <li className="pl-1">"I'm going to test at this point first because it will tell me which half of the circuit the fault is in"</li>
                <li className="pl-1">"This reading of [value] tells me that... which rules out..."</li>
                <li className="pl-1">"I've eliminated [cause] so I'm now going to check [next likely cause]"</li>
                <li className="pl-1">"The fault is located at... and is caused by... I will now rectify by..."</li>
                <li className="pl-1">"Before energising, I need to check... to ensure it is safe to proceed"</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Quality: Pass vs Distinction</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pass Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Distinction Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reasoning</td>
                      <td className="border border-white/10 px-3 py-2">States what they are testing</td>
                      <td className="border border-white/10 px-3 py-2">Explains why they chose this test and what it will confirm or eliminate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Readings</td>
                      <td className="border border-white/10 px-3 py-2">Reports the reading obtained</td>
                      <td className="border border-white/10 px-3 py-2">Interprets the reading, compares to expected values, draws conclusions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Progress</td>
                      <td className="border border-white/10 px-3 py-2">Moves to next test without comment</td>
                      <td className="border border-white/10 px-3 py-2">Summarises what has been ruled out and what remains</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Balance is Key</p>
              <p className="text-sm text-white">
                Think aloud at key decision points — do not narrate every tiny action ("Now I'm picking up my
                screwdriver"). Focus on explaining your reasoning at diagnostic decision points: why you are testing
                here, what the reading means, and what it tells you about the fault location.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A candidate who thinks aloud and demonstrates clear reasoning will score
              higher than one who silently finds the fault. The method matters as much as the result.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Using Test Instruments Correctly
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct instrument selection and use is fundamental to fault diagnosis. The assessor will observe
              whether you choose the right instrument, set it correctly, use it safely, and interpret the readings
              accurately. Instrument competence is not just about getting a number — it is about understanding
              what that number means in the context of your diagnosis.
            </p>

            <p>
              Before the EPA, ensure you are confident with every instrument you might need. Practise not just
              taking readings, but explaining to someone else what the reading means and how it informs your
              next step. This is exactly what the assessor wants to hear.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Instrument Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit State</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage presence</td>
                      <td className="border border-white/10 px-3 py-2">Voltage indicator / multimeter</td>
                      <td className="border border-white/10 px-3 py-2">Live (with care)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity</td>
                      <td className="border border-white/10 px-3 py-2">Low-resistance ohmmeter / multimeter</td>
                      <td className="border border-white/10 px-3 py-2">Dead and isolated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance tester</td>
                      <td className="border border-white/10 px-3 py-2">Dead and isolated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current flow</td>
                      <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                      <td className="border border-white/10 px-3 py-2">Live (non-contact)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop</td>
                      <td className="border border-white/10 px-3 py-2">Loop impedance tester</td>
                      <td className="border border-white/10 px-3 py-2">Live</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Prove-Test-Prove Procedure</h3>
              <p className="text-sm text-white mb-3">
                Before using a voltage indicator to confirm a circuit is dead, you must follow the prove-test-prove
                sequence. This is a safety-critical procedure that the assessor will specifically look for.
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Prove:</strong> Test the voltage indicator on a known live source to confirm it is working correctly</li>
                <li className="pl-1"><strong>Test:</strong> Use the proven instrument to test the isolated circuit — confirm no voltage is present on all conductors</li>
                <li className="pl-1"><strong>Prove:</strong> Test the instrument again on the known source to confirm it is still working — this rules out instrument failure during the test</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">GS38 Compliance is Non-Negotiable</p>
              <p className="text-sm text-white">
                All test instruments used in the EPA must comply with GS38 guidance. This includes: fused test leads,
                finger guards on probes, protected probe tips with maximum 4 mm exposed, and Category III or IV rating
                for LV work. Using non-compliant instruments is a safety failure that can result in a fail grade.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always check your instrument is suitable for the measurement, set to the
              correct function and range, and in good condition before use. Explain your instrument selection to the assessor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional documentation of your fault diagnosis process and findings is an important part of the
              EPA assessment. It demonstrates that you can communicate technical information clearly and create
              records suitable for maintenance management systems. Good documentation also shows the assessor
              that you understand the broader context of maintenance work — records enable future technicians
              to learn from your diagnosis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Date, time, location:</strong> Basic identification of the job</li>
                <li className="pl-1"><strong>Reported symptoms:</strong> What was the problem as described?</li>
                <li className="pl-1"><strong>Tests performed:</strong> What did you test, with what instrument, and what readings did you get?</li>
                <li className="pl-1"><strong>Fault identified:</strong> What was the root cause?</li>
                <li className="pl-1"><strong>Repair carried out:</strong> What did you do to fix it?</li>
                <li className="pl-1"><strong>Verification:</strong> How did you confirm the repair was successful?</li>
                <li className="pl-1"><strong>Recommendations:</strong> Any follow-up actions or preventive measures suggested</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Fault Report Entry</h3>
              <div className="text-sm text-white space-y-2 bg-white/5 p-3 rounded-lg">
                <p><strong>Date/Time:</strong> 15/01/2026, 09:30</p>
                <p><strong>Location:</strong> Workshop 3, Motor Control Panel MCC-04</p>
                <p><strong>Reported fault:</strong> Conveyor belt motor will not start from push-button station</p>
                <p><strong>Initial checks:</strong> Control supply present (24 V DC confirmed at panel). Emergency stop released. Guard interlock closed (confirmed by LED indicator).</p>
                <p><strong>Tests:</strong> Checked voltage at start button — 24 V present. Pressed start — no voltage at contactor coil terminal A1. Continuity tested start button contacts — OL (open circuit). Push-button mechanism found seized.</p>
                <p><strong>Fault:</strong> Start push-button NO contact failed open (mechanical seizure)</p>
                <p><strong>Repair:</strong> Replaced start push-button unit. Like-for-like replacement (Schneider XB5AA31).</p>
                <p><strong>Verification:</strong> Start/stop function tested — motor starts and stops correctly. Overload trip tested — resets correctly.</p>
                <p><strong>Recommendation:</strong> Add push-button inspection to quarterly PPM schedule.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Clear technical reporting is a key skill assessed across multiple KSBs
              in the maintenance technician standard. Good documentation during the EPA demonstrates professionalism
              and communication competence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Time Management and Practical Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EPA fault diagnosis exercise is time-limited, typically 20-40 minutes depending on the complexity
              of the fault and the EPAO's specification. Managing your time effectively within this window is a skill
              in itself. Candidates who run out of time often do so because they did not structure their approach
              from the outset.
            </p>

            <p>
              Effective time management does not mean rushing. It means working efficiently — spending your time on
              the most productive diagnostic steps first. A well-structured approach naturally leads to efficient
              use of time because you are not wasting effort on unnecessary tests.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time Allocation Guide (30-minute exercise)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minutes 1-3:</strong> Read the brief, review drawings, gather information from the task description</li>
                <li className="pl-1"><strong>Minutes 3-5:</strong> Analyse the information, form a list of likely causes, plan your first tests</li>
                <li className="pl-1"><strong>Minutes 5-20:</strong> Systematic testing — work through your diagnostic plan, thinking aloud</li>
                <li className="pl-1"><strong>Minutes 20-25:</strong> Rectify the fault and carry out verification testing</li>
                <li className="pl-1"><strong>Minutes 25-30:</strong> Complete documentation and tidy the work area</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Strategies for EPA Day</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prepare your tools:</strong> Lay out your instruments and tools neatly before starting — this saves time searching later</li>
                <li className="pl-1"><strong>Test the most likely cause first:</strong> Do not start with the least likely — base your test order on experience and analysis</li>
                <li className="pl-1"><strong>Use the half-split technique:</strong> When the fault could be in a long circuit, test the midpoint first to halve the search area</li>
                <li className="pl-1"><strong>Do not get fixated:</strong> If a test rules out your primary theory, accept it and move on to the next possibility</li>
                <li className="pl-1"><strong>Keep notes as you go:</strong> Brief notes prevent you from repeating tests and help with your final report</li>
                <li className="pl-1"><strong>Leave time for verification:</strong> Do not spend all your time diagnosing and have no time to test the repair</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">If Time Runs Out</p>
              <p className="text-sm text-white">
                If you have not completed the diagnosis within the time limit, do not panic. Calmly explain to the
                assessor: what you have done so far, what you have ruled out, what your current working theory is,
                and what your next steps would be. A clear, logical summary demonstrates competence even without a
                completed diagnosis. The assessor assesses your method, not just the outcome.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Practise fault diagnosis exercises under timed conditions before the EPA.
              The more you practise working within time limits, the more natural your time management becomes. Ask
              your training provider to set up realistic fault scenarios with a timer.
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
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Quick Reference — Fault Diagnosis Essentials</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-white mb-2">Six-Step Method</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Gather information</li>
                  <li className="pl-1">Analyse and prioritise causes</li>
                  <li className="pl-1">Test systematically</li>
                  <li className="pl-1">Identify the root cause</li>
                  <li className="pl-1">Rectify the fault</li>
                  <li className="pl-1">Verify correct operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Key Instruments</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Voltage indicator (GS38-compliant)</li>
                  <li className="pl-1">Digital multimeter</li>
                  <li className="pl-1">Insulation resistance tester</li>
                  <li className="pl-1">Clamp meter</li>
                  <li className="pl-1">Proving unit</li>
                  <li className="pl-1">Always: prove-test-prove</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Fault Diagnosis"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Isolation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-3">
              Next: Component Replacement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_2;
