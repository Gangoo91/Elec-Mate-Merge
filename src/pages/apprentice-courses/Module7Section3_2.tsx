import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sequence of Operation - Module 7.3.2 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding how circuits function in sequence to locate faults logically and efficiently.";

// Inline check questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg w-fit">
              <Target className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.3.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Understanding the Sequence of Operation
          </h1>
          <p className="text-white text-sm sm:text-base">
            Trace how a circuit functions to locate faults logically
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Every circuit has a specific sequence describing how current flows and devices interact.</li>
                <li>Understanding this sequence is vital for distinguishing normal from abnormal operation.</li>
                <li>Without this knowledge, fault finding becomes guesswork instead of logical analysis.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Circuit symptoms and where sequence might break.</li>
                <li><strong>Use:</strong> Mental tracing of current path, step-by-step testing.</li>
                <li><strong>Check:</strong> Inputs and outputs at each stage of the sequence.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white">
            <li>Explain what is meant by sequence of operation in electrical circuits.</li>
            <li>Describe how sequence of operation applies to both simple and complex electrical systems.</li>
            <li>Show how understanding the sequence helps identify where a fault may lie.</li>
            <li>Apply systematic thinking to trace current flow and device interactions.</li>
            <li>Prevent wasted time by focusing testing on logical sequence points.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* What sequence of operation means */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">What "Sequence of Operation" Means</p>
                    <p className="text-sm sm:text-base text-white mb-2">The sequence of operation is essentially the "story" of how a circuit works from beginning to end. It describes the intended path of current flow and how each component should function in order.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>The logical order in which electrical events should occur</li>
                      <li>How current flows through each component and connection</li>
                      <li>The function and timing of protective devices</li>
                      <li>How control signals activate or deactivate equipment</li>
                      <li>The return path for current to complete the circuit</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> When any part of this sequence is broken, the circuit will not function as intended
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Simple lighting circuit example */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Simple Lighting Circuit Sequence</p>
                    <p className="text-sm sm:text-base text-white mb-2">In a basic lighting circuit, the sequence is: power supplied from distribution board → protective device → switch → lamp → return on neutral conductor.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Step 1:</strong> Supply voltage available at distribution board</li>
                      <li><strong>Step 2:</strong> Current passes through MCB or fuse (protective device)</li>
                      <li><strong>Step 3:</strong> Current flows to light switch when closed</li>
                      <li><strong>Step 4:</strong> Current continues to lamp, energising it</li>
                      <li><strong>Step 5:</strong> Current returns via neutral conductor to complete circuit</li>
                    </ul>
                    <p className="text-sm sm:text-base text-white mb-2"><strong>Fault implications:</strong> If any part breaks down - loose neutral, faulty switch, blown lamp - the circuit fails.</p>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Diagnostic approach:</strong> Test each step in sequence to locate where the break occurs
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Using sequence for fault finding */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Using Sequence to Fault-Find</p>
                    <p className="text-sm sm:text-base text-white mb-2">When faults occur, electricians must mentally trace the sequence to predict where the fault might be located. This prevents random testing and component replacement.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Question 1:</strong> Has current reached the load? If not, work backwards</li>
                      <li><strong>Question 2:</strong> Is the control circuit functioning? Test switches and contactors</li>
                      <li><strong>Question 3:</strong> Are protective devices operating correctly?</li>
                      <li><strong>Question 4:</strong> Is there a complete return path for current?</li>
                      <li><strong>Question 5:</strong> Are connections secure at each stage?</li>
                    </ul>
                    <p className="text-sm sm:text-base text-white mb-2"><strong>Systematic approach:</strong> Test each stage methodically until the break in sequence is found.</p>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional practice:</strong> Understanding sequence prevents wasted time and unnecessary part replacement
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Complex systems example */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Complex Systems: Motor Control Circuits</p>
                    <p className="text-sm sm:text-base text-white mb-2">Motor control systems demonstrate complex sequences involving safety interlocks, overload protection, and start/stop controls that must operate in specific order.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Stage 1:</strong> Supply available and emergency stops not activated</li>
                      <li><strong>Stage 2:</strong> Safety interlocks satisfied (guards closed, permits active)</li>
                      <li><strong>Stage 3:</strong> Control circuit energised via start button</li>
                      <li><strong>Stage 4:</strong> Contactor operates connecting motor to supply</li>
                      <li><strong>Stage 5:</strong> Overload protection monitors motor current</li>
                      <li><strong>Stage 6:</strong> Motor runs until stop signal or protective operation</li>
                    </ul>
                    <p className="text-sm sm:text-base text-white mb-2"><strong>Fault location:</strong> A fault at any stage prevents motor operation - sequence understanding shows where to focus testing.</p>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Diagnostic efficiency:</strong> Testing each stage systematically avoids guesswork and component damage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical test mapping */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-teal-500 bg-teal-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">Practical Test Mapping</p>
                    <p className="text-sm sm:text-base text-white mb-2">Create simple checklists to confirm continuity and energisation at each stage of the sequence, building a clear picture of circuit operation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Supply side:</strong> Voltage present at origin, protective devices intact</li>
                      <li><strong>Control side:</strong> Switches operating, contacts making/breaking</li>
                      <li><strong>Load side:</strong> Voltage reaching equipment, return path complete</li>
                      <li><strong>Protection side:</strong> Earth paths continuous, RCD sensitivity correct</li>
                      <li><strong>Documentation:</strong> Record results at each test point for analysis</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Sequence verification:</strong> Each test confirms or eliminates that stage as the fault location
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="h-full">
              <div className="p-4 rounded-lg border border-green-400/30 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Best Practice Approach</h3>
                    <ul className="text-sm space-y-2 text-white">
                      <li>• Always recall the intended sequence before starting fault diagnosis</li>
                      <li>• Visualise the current path and list components in order</li>
                      <li>• Apply testing logically at each point in the sequence</li>
                      <li>• Work systematically from supply to load</li>
                      <li>• Document findings at each stage for reference</li>
                      <li>• Verify repair by confirming complete sequence operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full">
              <div className="p-4 rounded-lg border border-border/30 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-600 text-elec-yellow mb-3">Common Mistakes to Avoid</h3>
                    <ul className="text-sm space-y-2 text-white">
                      <li>• Starting testing without understanding the sequence</li>
                      <li>• Replacing components without confirming they are faulty</li>
                      <li>• Random testing instead of systematic sequence checking</li>
                      <li>• Ignoring the logical flow of circuit operation</li>
                      <li>• Focusing on symptoms rather than sequence breakdown</li>
                      <li>• Missing intermediate stages in complex control circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-border/30 ">
              <h3 className="font-semibold text-white mb-3">Domestic Lighting Fault</h3>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-elec-yellow text-elec-yellow mb-1">Situation</p>
                  <p className="text-white">Homeowner reported one light fitting stopped working completely.</p>
                </div>
                <div>
                  <p className="font-medium text-orange-600 text-elec-yellow mb-1">Investigation</p>
                  <p className="text-white">Apprentice replaced lamp holder first. Experienced electrician tested sequence: supply → switch → lamp holder.</p>
                </div>
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Fix</p>
                  <p className="text-white">Testing revealed loose line conductor at switch, interrupting the sequence before reaching lamp.</p>
                </div>
                <div>
                  <p className="font-medium text-purple-600 text-elec-yellow mb-1">Lesson Learned</p>
                  <p className="text-white">Understanding sequence prevents unnecessary component replacement and identifies real faults quickly.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border/30 ">
              <h3 className="font-semibold text-white mb-3">Factory Conveyor Motor</h3>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-elec-yellow text-elec-yellow mb-1">Situation</p>
                  <p className="text-white">Factory conveyor belt would not start. Staff assumed motor failure and prepared for replacement.</p>
                </div>
                <div>
                  <p className="font-medium text-orange-600 text-elec-yellow mb-1">Investigation</p>
                  <p className="text-white">Electrician tested control sequence systematically: supply → interlocks → contactor → motor.</p>
                </div>
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Fix</p>
                  <p className="text-white">Motor overload relay had tripped due to earlier fault condition. Reset relay and addressed overload cause.</p>
                </div>
                <div>
                  <p className="font-medium text-purple-600 text-elec-yellow mb-1">Lesson Learned</p>
                  <p className="text-white">Sequence understanding prevented expensive motor replacement and identified actual protective operation.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Recap</h2>
          
          {/* Mobile-friendly grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border/30">
              <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-2">Know the Story</h3>
              <p className="text-xs sm:text-sm text-white">Understand how the circuit is supposed to work before diagnosing faults.</p>
            </div>
            
            <div className="p-4 rounded-lg border border-green-400/30">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Test at Stage Boundaries</h3>
              <p className="text-xs sm:text-sm text-white">Focus testing at interfaces between sequence stages to isolate problems.</p>
            </div>
            
            <div className="p-4 rounded-lg border border-border/30">
              <h3 className="font-semibold text-orange-600 text-elec-yellow mb-2">Record and Confirm</h3>
              <p className="text-xs sm:text-sm text-white">Document findings at each stage and verify complete sequence after repair.</p>
            </div>
            
            <div className="p-4 rounded-lg border border-border/30">
              <h3 className="font-semibold text-purple-600 text-elec-yellow mb-2">Prevent Guesswork</h3>
              <p className="text-xs sm:text-sm text-white">Systematic sequence checking eliminates random testing and part replacement.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-400/30">
              <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">Apply to All Circuits</h3>
              <p className="text-xs sm:text-sm text-white">From simple lighting to complex industrial controls, sequence thinking applies universally.</p>
            </div>
            
            <div className="p-4 rounded-lg border border-border/30">
              <h3 className="font-semibold text-red-600 text-elec-yellow mb-2">Professional Practice</h3>
              <p className="text-xs sm:text-sm text-white">Understanding sequence demonstrates systematic electrical knowledge and competence.</p>
            </div>
          </div>
          
          {/* Key Success Factors */}
          <div className="mt-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <h3 className="font-semibold text-elec-yellow mb-2">Key Success Factors</h3>
            <p className="text-xs sm:text-sm text-white">Master sequence thinking early in your career - it forms the foundation for all advanced fault finding and diagnostic skills.</p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Knowledge Check: Sequence of Operation"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="../3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 3.1 - Tripping MCBs/RCDs
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-3">
              Next: 3.3 - Testing One Component at a Time
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section3_2;