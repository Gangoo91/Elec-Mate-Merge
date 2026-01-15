import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sequence of Operation - Module 7.3.2 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding how circuits function in sequence to locate faults logically and efficiently.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the sequence of operation in electrical circuits?",
    options: ["Random component activation", "The order in which current flows and components function", "Circuit protection timing", "Installation procedure"],
    correctIndex: 1,
    explanation: "Sequence of operation describes the order in which current flows through components and how the circuit is intended to function."
  },
  {
    id: 2,
    question: "In a simple lighting circuit, what happens if the neutral conductor becomes loose?",
    options: ["Light works normally", "Circuit will not function as intended", "Only efficiency is affected", "Voltage increases"],
    correctIndex: 1,
    explanation: "A loose neutral breaks the sequence of operation, preventing the circuit from functioning correctly as current cannot return properly."
  },
  {
    id: 3,
    question: "Why is understanding sequence of operation important for fault finding?",
    options: ["It's required by regulations", "It helps identify where the sequence breaks down", "It reduces installation time", "It improves circuit efficiency"],
    correctIndex: 1,
    explanation: "Understanding the sequence helps electricians logically identify where faults have interrupted normal operation."
  }
];

const Module7Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does sequence of operation mean in electrical circuits?",
      options: [
        "The installation order of components",
        "The order in which current flows and devices interact",
        "The testing procedure for circuits",
        "The maintenance schedule"
      ],
      correctAnswer: 1,
      explanation: "Sequence of operation describes how current flows through the circuit and how devices interact in their intended order."
    },
    {
      id: 2,
      question: "Why is sequence of operation important for fault finding?",
      options: [
        "It reduces installation costs",
        "It helps electricians logically identify where faults occur",
        "It improves circuit efficiency",
        "It's required by BS 7671"
      ],
      correctAnswer: 1,
      explanation: "Understanding the sequence helps electricians trace where the normal operation breaks down, making fault finding logical rather than guesswork."
    },
    {
      id: 3,
      question: "In a simple lighting circuit, what is the basic sequence of operation?",
      options: [
        "Switch → Lamp → Distribution Board → Neutral",
        "Distribution Board → Protective Device → Switch → Lamp → Neutral Return",
        "Lamp → Switch → Distribution Board",
        "Neutral → Lamp → Switch → Distribution Board"
      ],
      correctAnswer: 1,
      explanation: "Current flows from the distribution board, through the protective device, to the switch, then to the lamp, and returns via the neutral conductor."
    },
    {
      id: 4,
      question: "What happens if the neutral conductor is loose in this sequence?",
      options: [
        "The circuit works normally",
        "The circuit will not function as current cannot return properly",
        "Only voltage is affected",
        "The lamp brightness increases"
      ],
      correctAnswer: 1,
      explanation: "A loose neutral breaks the return path, preventing the circuit from completing and functioning properly."
    },
    {
      id: 5,
      question: "How can an electrician use sequence of operation to locate a fault?",
      options: [
        "By replacing all components",
        "By mentally tracing the current path and testing each stage",
        "By increasing circuit protection",
        "By resetting all devices"
      ],
      correctAnswer: 1,
      explanation: "By following the sequence step by step and testing each stage, electricians can narrow down where the fault interrupts normal operation."
    },
    {
      id: 6,
      question: "True or False: Sequence of operation is only relevant in simple domestic circuits.",
      options: [
        "True - only for domestic circuits",
        "False - applies to all circuits from simple to complex industrial systems",
        "True - only for lighting circuits",
        "False - only for industrial circuits"
      ],
      correctAnswer: 1,
      explanation: "Sequence of operation applies to all electrical circuits, from simple domestic lighting to complex industrial control systems."
    },
    {
      id: 7,
      question: "Give one example of sequence of operation in an industrial circuit.",
      options: [
        "Simple on/off switch",
        "Motor control with safety interlocks, overload protection, and start/stop circuits",
        "Basic lighting circuit",
        "Single socket outlet"
      ],
      correctAnswer: 1,
      explanation: "Industrial motor control involves a complex sequence including safety interlocks, overload protection, and control circuits that must operate in order."
    },
    {
      id: 8,
      question: "What common mistake can occur if sequence of operation is not considered?",
      options: [
        "Installing components incorrectly",
        "Replacing working components instead of finding the real fault",
        "Using wrong cable sizes",
        "Poor documentation"
      ],
      correctAnswer: 1,
      explanation: "Without understanding the sequence, electricians may replace components that are actually working correctly instead of finding where the sequence is broken."
    },
    {
      id: 9,
      question: "In the real-world example, what fault caused the light not to work?",
      options: [
        "Faulty lamp holder",
        "Loose line conductor at the switch",
        "Blown lamp",
        "Faulty distribution board"
      ],
      correctAnswer: 1,
      explanation: "The loose line conductor at the switch interrupted the sequence of operation before current could reach the lamp."
    },
    {
      id: 10,
      question: "Why did understanding the sequence of operation save replacing the motor in the factory example?",
      options: [
        "The motor was expensive",
        "Testing the sequence revealed the overload relay had tripped, not motor failure",
        "The motor was new",
        "The sequence was documented"
      ],
      correctAnswer: 1,
      explanation: "By testing each stage of the control sequence, the electrician found the overload relay had tripped, avoiding unnecessary motor replacement."
    }
  ];

  const faqs = [
    {
      question: "What is meant by sequence of operation?",
      answer: "The order in which current flows through components in a circuit and how the circuit is intended to function."
    },
    {
      question: "Why is it important in fault finding?",
      answer: "It helps electricians logically identify where a fault has interrupted normal operation."
    },
    {
      question: "Can sequence of operation apply to complex circuits?",
      answer: "Yes, from simple lighting circuits to industrial control panels, the principle is the same."
    },
    {
      question: "What mistake is common when electricians ignore sequence of operation?",
      answer: "Replacing working components instead of identifying the real source of the fault."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 3</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Understanding the Sequence of Operation
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Trace how a circuit functions to locate faults logically.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm list-disc pl-4">
              <li>Every circuit has a specific sequence describing how current flows and devices interact.</li>
              <li>Understanding this sequence is vital for distinguishing normal from abnormal operation.</li>
              <li>Without this knowledge, fault finding becomes guesswork instead of logical analysis.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 text-sm list-disc pl-4">
              <li>Explain what is meant by sequence of operation in electrical circuits.</li>
              <li>Describe how sequence of operation applies to both simple and complex electrical systems.</li>
              <li>Show how understanding the sequence helps identify where a fault may lie.</li>
              <li>Apply systematic thinking to trace current flow and device interactions.</li>
              <li>Prevent wasted time by focusing testing on logical sequence points.</li>
            </ul>
          </section>

          {/* What Sequence of Operation Means */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              What "Sequence of Operation" Means
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The sequence of operation is essentially the "story" of how a circuit works from beginning to end. It describes the intended path of current flow and how each component should function in order.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Key Elements</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>The logical order in which electrical events should occur</li>
                  <li>How current flows through each component and connection</li>
                  <li>The function and timing of protective devices</li>
                  <li>How control signals activate or deactivate equipment</li>
                  <li>The return path for current to complete the circuit</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Key principle:</strong> When any part of this sequence is broken, the circuit will not function as intended.
              </div>
            </div>
          </section>

          {/* Simple Lighting Circuit Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Simple Lighting Circuit Sequence
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                In a basic lighting circuit, the sequence is: power supplied from distribution board → protective device → switch → lamp → return on neutral conductor.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Step-by-Step Sequence</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Step 1:</strong> Supply voltage available at distribution board</li>
                  <li><strong className="text-white">Step 2:</strong> Current passes through MCB or fuse (protective device)</li>
                  <li><strong className="text-white">Step 3:</strong> Current flows to light switch when closed</li>
                  <li><strong className="text-white">Step 4:</strong> Current continues to lamp, energising it</li>
                  <li><strong className="text-white">Step 5:</strong> Current returns via neutral conductor to complete circuit</li>
                </ul>
              </div>

              <p>
                <strong className="text-white">Fault implications:</strong> If any part breaks down - loose neutral, faulty switch, blown lamp - the circuit fails.
              </p>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Diagnostic approach:</strong> Test each step in sequence to locate where the break occurs.
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequence-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Using Sequence for Fault Finding */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Using Sequence to Fault-Find
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                When faults occur, electricians must mentally trace the sequence to predict where the fault might be located. This prevents random testing and component replacement.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Key Questions to Ask</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Question 1:</strong> Has current reached the load? If not, work backwards</li>
                  <li><strong className="text-white">Question 2:</strong> Is the control circuit functioning? Test switches and contactors</li>
                  <li><strong className="text-white">Question 3:</strong> Are protective devices operating correctly?</li>
                  <li><strong className="text-white">Question 4:</strong> Is there a complete return path for current?</li>
                  <li><strong className="text-white">Question 5:</strong> Are connections secure at each stage?</li>
                </ul>
              </div>

              <p>
                <strong className="text-white">Systematic approach:</strong> Test each stage methodically until the break in sequence is found.
              </p>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Professional practice:</strong> Understanding sequence prevents wasted time and unnecessary part replacement.
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequence-neutral-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Complex Systems Example */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Complex Systems: Motor Control Circuits
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Motor control systems demonstrate complex sequences involving safety interlocks, overload protection, and start/stop controls that must operate in specific order.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Motor Control Sequence</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Stage 1:</strong> Supply available and emergency stops not activated</li>
                  <li><strong className="text-white">Stage 2:</strong> Safety interlocks satisfied (guards closed, permits active)</li>
                  <li><strong className="text-white">Stage 3:</strong> Control circuit energised via start button</li>
                  <li><strong className="text-white">Stage 4:</strong> Contactor operates connecting motor to supply</li>
                  <li><strong className="text-white">Stage 5:</strong> Overload protection monitors motor current</li>
                  <li><strong className="text-white">Stage 6:</strong> Motor runs until stop signal or protective operation</li>
                </ul>
              </div>

              <p>
                <strong className="text-white">Fault location:</strong> A fault at any stage prevents motor operation - sequence understanding shows where to focus testing.
              </p>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Diagnostic efficiency:</strong> Testing each stage systematically avoids guesswork and component damage.
              </div>
            </div>
          </section>

          {/* Practical Test Mapping */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Test Mapping
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Create simple checklists to confirm continuity and energisation at each stage of the sequence, building a clear picture of circuit operation.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-teal-500/50">
                <p className="font-medium text-white mb-2">Test Points</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Supply side:</strong> Voltage present at origin, protective devices intact</li>
                  <li><strong className="text-white">Control side:</strong> Switches operating, contacts making/breaking</li>
                  <li><strong className="text-white">Load side:</strong> Voltage reaching equipment, return path complete</li>
                  <li><strong className="text-white">Protection side:</strong> Earth paths continuous, RCD sensitivity correct</li>
                  <li><strong className="text-white">Documentation:</strong> Record results at each test point for analysis</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Sequence verification:</strong> Each test confirms or eliminates that stage as the fault location.
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequence-importance-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Best Practice Approach</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Always recall the intended sequence before starting fault diagnosis</li>
                  <li>Visualise the current path and list components in order</li>
                  <li>Apply testing logically at each point in the sequence</li>
                  <li>Work systematically from supply to load</li>
                  <li>Document findings at each stage for reference</li>
                  <li>Verify repair by confirming complete sequence operation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-amber-500/50">
                <p className="font-medium text-amber-400 mb-2">Common Mistakes to Avoid</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Starting testing without understanding the sequence</li>
                  <li>Replacing components without confirming they are faulty</li>
                  <li>Random testing instead of systematic sequence checking</li>
                  <li>Ignoring the logical flow of circuit operation</li>
                  <li>Focusing on symptoms rather than sequence breakdown</li>
                  <li>Missing intermediate stages in complex control circuits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Domestic Lighting Fault</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="text-elec-yellow font-medium mb-1">Situation</p>
                    <p>Homeowner reported one light fitting stopped working completely.</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-medium mb-1">Investigation</p>
                    <p>Apprentice replaced lamp holder first. Experienced electrician tested sequence: supply → switch → lamp holder.</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium mb-1">Fix</p>
                    <p>Testing revealed loose line conductor at switch, interrupting the sequence before reaching lamp.</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium mb-1">Lesson Learned</p>
                    <p>Understanding sequence prevents unnecessary component replacement and identifies real faults quickly.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Factory Conveyor Motor</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="text-elec-yellow font-medium mb-1">Situation</p>
                    <p>Factory conveyor belt would not start. Staff assumed motor failure and prepared for replacement.</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-medium mb-1">Investigation</p>
                    <p>Electrician tested control sequence systematically: supply → interlocks → contactor → motor.</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium mb-1">Fix</p>
                    <p>Motor overload relay had tripped due to earlier fault condition. Reset relay and addressed overload cause.</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium mb-1">Lesson Learned</p>
                    <p>Sequence understanding prevented expensive motor replacement and identified actual protective operation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow text-sm mb-1">Know the Story</p>
                <p className="text-xs text-white/70">Understand how the circuit is supposed to work before diagnosing faults.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-green-400 text-sm mb-1">Test at Stage Boundaries</p>
                <p className="text-xs text-white/70">Focus testing at interfaces between sequence stages to isolate problems.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-orange-400 text-sm mb-1">Record and Confirm</p>
                <p className="text-xs text-white/70">Document findings at each stage and verify complete sequence after repair.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-purple-400 text-sm mb-1">Prevent Guesswork</p>
                <p className="text-xs text-white/70">Systematic sequence checking eliminates random testing and part replacement.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-teal-400 text-sm mb-1">Apply to All Circuits</p>
                <p className="text-xs text-white/70">From simple lighting to complex industrial controls, sequence thinking applies universally.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-red-400 text-sm mb-1">Professional Practice</p>
                <p className="text-xs text-white/70">Understanding sequence demonstrates systematic electrical knowledge and competence.</p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-elec-yellow mb-1 text-sm">Key Success Factors</p>
              <p className="text-xs text-white/70">Master sequence thinking early in your career - it forms the foundation for all advanced fault finding and diagnostic skills.</p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Knowledge Check: Sequence of Operation"
              questions={quizQuestions}
            />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Tripping MCBs/RCDs
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-3">
                Next: Testing One Component at a Time
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section3_2;
