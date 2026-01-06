/**
 * Level 3 Module 4 Section 1.3 - Diagnostic Sequence and Logical Problem-Solving
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Diagnostic Sequence and Logical Problem-Solving - Level 3 Module 4 Section 1.3";
const DESCRIPTION = "Master systematic fault diagnosis approaches including the six-step method, half-split technique, and logical troubleshooting for electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the first step in any systematic fault diagnosis process?",
    options: [
      "Begin testing at the distribution board",
      "Gather information about the fault and its symptoms",
      "Isolate the supply and begin repairs",
      "Check the prospective fault current"
    ],
    correctIndex: 1,
    explanation: "Information gathering must come first. Before touching anything, understand what the fault is, when it occurs, what changed recently, and what symptoms are present. This information guides where to test and what to look for - jumping straight to testing wastes time."
  },
  {
    id: "check-2",
    question: "The half-split technique is particularly useful when:",
    options: [
      "You know exactly where the fault is located",
      "The circuit has multiple potential fault points in series",
      "Testing protective device operation",
      "The fault is clearly at the origin"
    ],
    correctIndex: 1,
    explanation: "Half-split works by testing at the midpoint of a circuit to determine which half contains the fault. This is efficient for long circuits or series of components - each test eliminates half of the potential fault locations, quickly narrowing down the position."
  },
  {
    id: "check-3",
    question: "Why should you form a hypothesis before testing?",
    options: [
      "To speed up paperwork",
      "To decide what test equipment to buy",
      "To guide your testing strategy and interpret results meaningfully",
      "It's not necessary - just test everything"
    ],
    correctIndex: 2,
    explanation: "A hypothesis predicts what type of fault exists and where it might be. This shapes your testing approach - testing to prove or disprove specific possibilities rather than random testing. Results become meaningful: 'This confirms my hypothesis' or 'I need to reconsider'."
  },
  {
    id: "check-4",
    question: "After finding and fixing a fault, what's the final step before restoring supply?",
    options: [
      "Documenting the repair in your notebook",
      "Verifying the repair was successful through re-testing",
      "Invoicing the customer",
      "Cleaning up the work area"
    ],
    correctIndex: 1,
    explanation: "Verification is essential. Test that the fault is actually cleared (insulation resistance improved, continuity restored, etc.) and that the repair hasn't introduced new problems. Never assume the fix worked - prove it with test results before restoring supply."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A ring final circuit has an open circuit fault. Using the half-split technique, you test continuity at the midpoint and find the fault is between there and the consumer unit. What should you do next?",
    options: [
      "Test at the consumer unit terminals",
      "Test at the point halfway between the midpoint and the consumer unit",
      "Replace all the cable from the consumer unit to the midpoint",
      "Test at every socket in sequence"
    ],
    correctAnswer: 1,
    explanation: "Half-split continues by testing at the midpoint of the remaining suspect section. You've established the fault is in the first half; now test at the quarter-point. Each test halves the suspect area, efficiently locating the fault in a few tests rather than checking every point."
  },
  {
    id: 2,
    question: "You're called to a property where 'nothing works'. What's your first question to the customer?",
    options: [
      "When did you last pay your electricity bill?",
      "Has anything similar happened before, and what exactly stopped working?",
      "Would you like me to upgrade your consumer unit?",
      "Can I see your electrical installation certificate?"
    ],
    correctAnswer: 1,
    explanation: "Establish the scope and history of the problem. 'Nothing works' might mean the whole house or just one area. Previous similar events might indicate recurring faults. Understanding exactly what stopped working guides your investigation - is it supply, main switch, or distribution issue?"
  },
  {
    id: 3,
    question: "The six-step diagnostic process includes: 1) Collect information, 2) Analyse information, 3) Locate fault, 4) Determine cause, 5) Rectify fault, 6) ?",
    options: [
      "Invoice customer",
      "Leave site",
      "Verify repair",
      "Order parts"
    ],
    correctAnswer: 2,
    explanation: "Verification is the crucial final step. Confirm the repair has cleared the fault through appropriate testing, ensure no new faults have been introduced, and check the circuit operates correctly. Only then should you restore supply and consider the job complete."
  },
  {
    id: 4,
    question: "During fault diagnosis, you find a fault but also notice an unrelated defect. What should you do?",
    options: [
      "Ignore it - you were only called for the original fault",
      "Fix it without mentioning it to keep the customer happy",
      "Document and report it to the customer, advising on necessary action",
      "Report it to the DNO"
    ],
    correctAnswer: 2,
    explanation: "You have a duty of care to inform customers of safety defects you discover. Document what you found, explain the risks, and advise on remedial action. You can't force them to have it fixed, but you must inform them. Record your advice in writing for liability protection."
  },
  {
    id: 5,
    question: "What does 'determine the cause' mean in the diagnostic sequence?",
    options: [
      "Find out who caused the fault so they can be blamed",
      "Understand WHY the fault occurred, not just WHERE it is",
      "Calculate the cost of the repair",
      "Determine which BS 7671 regulation applies"
    ],
    correctAnswer: 1,
    explanation: "Finding the fault location isn't enough - you must understand why it occurred. A loose connection might be caused by incorrect termination, vibration, thermal cycling, or wrong connector type. Without understanding the cause, your repair might fail because the underlying issue remains."
  },
  {
    id: 6,
    question: "An RCD is tripping intermittently. You disconnect all circuits and the RCD holds. What's your next step?",
    options: [
      "Replace the RCD as it must be faulty",
      "Reconnect circuits one at a time to identify which has the fault",
      "Tell the customer the problem has resolved itself",
      "Test the RCD's trip time"
    ],
    correctAnswer: 1,
    explanation: "You've established the fault is on a downstream circuit, not the RCD itself. Systematic reconnection identifies which circuit contains the earth fault. Once identified, further investigation of that circuit locates the specific fault. This is logical elimination - divide and conquer."
  },
  {
    id: 7,
    question: "Why is it important to consider what changed before the fault occurred?",
    options: [
      "To determine warranty coverage",
      "Changes often introduce faults - recent alterations are likely culprits",
      "To update the electrical installation certificate",
      "To decide if the customer caused the fault"
    ],
    correctAnswer: 1,
    explanation: "Recent changes frequently cause faults - new installations, DIY work, building work that might have damaged cables, new appliances. If the fault started after a specific event, that's where investigation should focus. 'It worked fine until...' is valuable diagnostic information."
  },
  {
    id: 8,
    question: "What's the purpose of analysing collected information before testing?",
    options: [
      "To write a longer report",
      "To form hypotheses about fault type and location to guide efficient testing",
      "To delay starting work",
      "To ensure you've asked enough questions"
    ],
    correctAnswer: 1,
    explanation: "Analysis converts raw information into actionable hypotheses. 'MCB trips instantly when light switched on' suggests short circuit, probably in the switch or lamp. This focuses your testing - start at the switch, not at random points. Analysis makes testing efficient and purposeful."
  },
  {
    id: 9,
    question: "You've located a fault in a junction box - a loose neutral connection. Before remaking the connection, what should you consider?",
    options: [
      "Whether to charge extra for finding it",
      "Why it came loose - was it poorly made originally, wrong connector, vibration?",
      "If the junction box colour matches the decor",
      "Whether to replace all the wiring"
    ],
    correctAnswer: 1,
    explanation: "Understanding the cause prevents recurrence. If it was poorly terminated, ensure correct technique this time. If vibration loosened it, consider a more secure connection method. If the connector is wrong for the cable size, fit the correct one. Fix the cause, not just the symptom."
  },
  {
    id: 10,
    question: "A customer reports that their cooker sometimes trips the circuit. It's working now. How should you approach this?",
    options: [
      "Tell them nothing is wrong since it's working",
      "Replace the cooker as a precaution",
      "Gather information about patterns, test the circuit thoroughly, inspect the cooker connection",
      "Install a bigger MCB"
    ],
    correctAnswer: 2,
    explanation: "Intermittent faults require thorough investigation even when not currently manifesting. Gather pattern information (when, how often, related to specific functions?), test the circuit's insulation and continuity, inspect connections for signs of overheating. The fault will likely worsen if not addressed."
  },
  {
    id: 11,
    question: "In logical problem-solving, what does 'working backwards' from the symptom mean?",
    options: [
      "Starting at the load and testing towards the supply",
      "Undoing recent changes",
      "Tracing what conditions must exist to cause the observed symptom",
      "Going back in time"
    ],
    correctAnswer: 2,
    explanation: "Working backwards means: 'For this symptom to occur, what must be true?' If lights are dim, either voltage is low, or resistance is high in the circuit. Each possibility can be tested. This logical approach generates a decision tree of tests that systematically identifies the fault."
  },
  {
    id: 12,
    question: "Why should you test with loads disconnected before testing with loads connected?",
    options: [
      "Connected loads make testing impossible",
      "To establish baseline circuit condition before introducing load-related variables",
      "BS 7671 prohibits testing with loads connected",
      "Test instruments can't measure with loads present"
    ],
    correctAnswer: 1,
    explanation: "Disconnected testing establishes the circuit's basic condition - its insulation, continuity, and earth path. If faults exist in the fixed installation, you'll find them. Then connecting loads introduces their characteristics - if new faults appear, they're load-related. This systematic approach isolates fault sources."
  }
];

const faqs = [
  {
    question: "How long should fault finding take?",
    answer: "This depends entirely on fault complexity. Some faults are found in minutes; others take hours. What matters is systematic approach, not speed. Rushing leads to missed faults and unsafe repairs. However, efficiency comes from good diagnostic technique - proper information gathering and logical testing minimise wasted time."
  },
  {
    question: "What if I can't find the fault?",
    answer: "This happens, especially with intermittent faults. Document what you've tested and ruled out. Consider whether the fault might be in connected equipment rather than the installation. Arrange to return when the fault is active if it's intermittent. Consulting colleagues is not weakness - it's professional practice. Never pretend a fault is fixed when it isn't."
  },
  {
    question: "Should I always follow the six-step sequence rigidly?",
    answer: "The sequence is a guide, not a straitjacket. In practice, steps overlap - you might test while gathering information, or discover new information while testing that changes your hypothesis. The key principles are: gather adequate information, think before testing, verify before finishing. How strictly you follow the steps matters less than applying the underlying logic."
  },
  {
    question: "How do I handle pressure from customers to 'just fix it quickly'?",
    answer: "Explain that proper diagnosis ensures the repair is effective and safe. A quick bodge might restore power temporarily but leave the underlying fault to cause bigger problems. Most customers appreciate this when explained. Your professional reputation depends on quality work, not speed. Document your reasoning if customers pressure you to cut corners."
  },
  {
    question: "When should I use instrument testing versus logical reasoning?",
    answer: "They work together. Logical reasoning tells you what to test and what results to expect. Instrument testing provides the data to confirm or refute your reasoning. Don't just test randomly - test to answer specific questions. Equally, don't just assume - verify your logic with measurements. Theory and measurement validate each other."
  },
  {
    question: "What's the difference between fault finding and fault diagnosis?",
    answer: "Fault finding locates WHERE the fault is. Fault diagnosis identifies WHAT the fault is and WHY it occurred. Full diagnosis is necessary for effective repair - knowing a connection is loose (the fault) doesn't help if you don't know why it loosened (the cause). Diagnosis leads to repairs that last; finding alone leads to repeat call-outs."
  }
];

const Level3Module4Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Diagnostic Sequence and Logical Problem-Solving
          </h1>
          <p className="text-white/80">
            Systematic approaches to finding and understanding electrical faults
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Step 1:</strong> Gather information before testing</li>
              <li><strong>Step 2:</strong> Analyse and form hypothesis</li>
              <li><strong>Step 3:</strong> Test systematically to locate fault</li>
              <li><strong>Step 4:</strong> Verify repair before restoring supply</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Use:</strong> Half-split for long circuit faults</li>
              <li><strong>Use:</strong> Symptom analysis before testing</li>
              <li><strong>Use:</strong> "What changed?" question always</li>
              <li><strong>Apply:</strong> Verify every repair with tests</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the six-step diagnostic sequence systematically",
              "Use the half-split technique for efficient fault location",
              "Form and test hypotheses about fault causes",
              "Distinguish between fault finding and fault diagnosis",
              "Apply logical reasoning to electrical problems",
              "Verify repairs before restoring supply"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Six-Step Diagnostic Sequence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Six-Step Diagnostic Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional fault diagnosis follows a logical sequence that ensures thoroughness and efficiency. Skipping steps leads to missed faults, incorrect repairs, and wasted time. The sequence may seem slow initially, but it actually speeds up fault finding by eliminating random guesswork.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Six Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Collect Information:</strong> Interview customer, observe symptoms, review history, note recent changes</li>
                <li><strong>2. Analyse Information:</strong> Identify patterns, form hypotheses about fault type and location</li>
                <li><strong>3. Locate the Fault:</strong> Use systematic testing to pinpoint fault position</li>
                <li><strong>4. Determine the Cause:</strong> Understand WHY the fault occurred, not just where</li>
                <li><strong>5. Rectify the Fault:</strong> Repair addressing both the fault and its underlying cause</li>
                <li><strong>6. Verify the Repair:</strong> Test to confirm fault is cleared and no new faults introduced</li>
              </ul>
            </div>

            <p>
              Each step builds on the previous. Good information gathering shapes your analysis. Clear analysis guides efficient testing. Understanding the cause ensures lasting repair. Verification confirms success. Miss any step and the process breaks down.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The six-step sequence isn't bureaucracy - it's the distilled wisdom of experienced electricians. Following it properly finds faults faster than random testing, even though it feels slower at first.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Half-Split Technique */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Half-Split Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a fault could be at any point along a circuit or sequence, the half-split technique rapidly narrows down the location. Instead of testing every point in sequence, you test at the midpoint first. This single test tells you which half contains the fault, immediately eliminating half the possibilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">How It Works</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test at the midpoint of the circuit</li>
                  <li>Result indicates which half has the fault</li>
                  <li>Test at midpoint of the faulty half</li>
                  <li>Continue until fault is isolated</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency Gains</p>
                <ul className="text-sm text-white space-y-1">
                  <li>10 possible points: 4 tests vs 10 sequential</li>
                  <li>20 possible points: 5 tests vs 20 sequential</li>
                  <li>Each test halves remaining possibilities</li>
                  <li>Scales excellently with circuit length</li>
                </ul>
              </div>
            </div>

            <p>
              Half-split is ideal for finding open circuits in long cable runs, locating faults in ring circuits, or identifying which section of a distribution system has a problem. It's less useful when you already have strong evidence of fault location, or when the fault is obviously at one end.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A ring final circuit has an open circuit. Instead of testing at each of the 8 sockets in sequence, test continuity at socket 4. If there's continuity from the board to socket 4, the fault is between sockets 4-8. Test at socket 6. If no continuity, fault is between 4-6. Test at socket 5. Found in 3 tests instead of potentially 8.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Forming and Testing Hypotheses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Forming and Testing Hypotheses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A hypothesis is an educated guess about what's wrong. Rather than testing blindly, you predict what the fault might be based on the evidence, then test specifically to confirm or rule out that prediction. This focused approach is far more efficient than random testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Building a hypothesis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>What symptom:</strong> MCB trips instantly when switching on lights</li>
                <li><strong>What type:</strong> Instant trip suggests short circuit, not overload</li>
                <li><strong>What location:</strong> Happens when THIS switch operates, so likely at switch or lamp</li>
                <li><strong>Hypothesis:</strong> Short circuit at the switch or in the switch-to-lamp cable</li>
                <li><strong>Test strategy:</strong> Isolate, inspect switch visually, test insulation resistance</li>
              </ul>
            </div>

            <p>
              If testing disproves your hypothesis, form a new one based on the additional information. Finding out what ISN'T the fault is still progress - it narrows down what IS. Each test, whether confirming or refuting, brings you closer to the answer.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Don't fall in love with your hypothesis. If test results contradict it, change the hypothesis - don't ignore the results. Confirmation bias is the enemy of good fault diagnosis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Verification and Completion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verification and Completion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Finding and repairing a fault isn't complete until you've verified the repair works and hasn't introduced new problems. Many electricians skip this step, leading to call-backs and damaged reputations. Verification is as important as the repair itself.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Fault Cleared?</p>
                <p className="text-white/90 text-xs">Retest original fault condition - IR improved, continuity restored</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">No New Faults?</p>
                <p className="text-white/90 text-xs">Check work hasn't introduced polarity, continuity or IR issues</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Circuit Functions?</p>
                <p className="text-white/90 text-xs">Operate the circuit normally - everything works as expected</p>
              </div>
            </div>

            <p>
              Document your verification results. Record the before and after test readings. This provides evidence of successful repair for your records and the customer. If the fault recurs, this documentation helps diagnose what went wrong with the original repair.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You repair a loose neutral connection causing intermittent socket failure. Before restoring supply: verify continuity is now correct (R1+Rn values match), insulation resistance is acceptable, polarity is correct at all sockets, and the ring is continuous. Only then switch on and test functionally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Questions to Ask Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>"When did it first happen?" - Establishes timeline</li>
                <li>"What exactly stopped working?" - Defines fault scope</li>
                <li>"What were you doing when it happened?" - Links cause and effect</li>
                <li>"Has anything changed recently - building work, new appliances?" - Identifies possible causes</li>
                <li>"Does it happen at particular times or randomly?" - Indicates intermittent patterns</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choosing Between Diagnostic Methods</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Half-split:</strong> Best for faults at unknown location in a long circuit</li>
                <li><strong>Sequential testing:</strong> Best when fault is likely near one end</li>
                <li><strong>Unit substitution:</strong> Best for suspected component failure (swap and test)</li>
                <li><strong>Input-output analysis:</strong> Best for checking system sections work correctly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping information gathering</strong> - Leads to unfocused, inefficient testing</li>
                <li><strong>Testing without a hypothesis</strong> - Random testing wastes time</li>
                <li><strong>Stopping at fault location</strong> - Must also determine cause for lasting repair</li>
                <li><strong>Skipping verification</strong> - Results in call-backs and reputation damage</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Six-Step Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Collect information</li>
                  <li>2. Analyse information</li>
                  <li>3. Locate fault</li>
                  <li>4. Determine cause</li>
                  <li>5. Rectify fault</li>
                  <li>6. Verify repair</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Half-Split Steps</p>
                <ul className="space-y-0.5">
                  <li>Test at circuit midpoint</li>
                  <li>Determine which half has fault</li>
                  <li>Test at midpoint of faulty half</li>
                  <li>Repeat until fault isolated</li>
                  <li>Typically 3-5 tests for any length</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Symptoms & Indicators
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1-4">
              Next: Safety Considerations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section1_3;
