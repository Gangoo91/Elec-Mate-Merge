import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "function-blocks-purpose",
    question: "What is the purpose of using function blocks instead of traditional coding?",
    options: [
      "They're faster to execute",
      "They provide a visual, graphical approach that's easier to understand and troubleshoot",
      "They use less memory"
    ],
    correctIndex: 1,
    explanation: "Function blocks provide a visual, graphical approach that's easier to understand, troubleshoot, and maintain. They use standardised symbols and clear signal flow that electricians can quickly interpret."
  },
  {
    id: "and-logic-requirement",
    question: "What does AND logic require for a true output?",
    options: [
      "Any one condition to be true",
      "All conditions must be true",
      "No conditions to be true"
    ],
    correctIndex: 1,
    explanation: "AND logic requires ALL conditions to be true for the output to be true. If any condition is false, the output will be false. This is essential for safety interlocks."
  },
  {
    id: "pid-integral-function",
    question: "Which part of PID control corrects long-term offset from setpoint?",
    options: [
      "Proportional (P)",
      "Integral (I)",
      "Derivative (D)"
    ],
    correctIndex: 1,
    explanation: "The Integral (I) component corrects long-term offset. It accumulates error over time and gradually increases the control output to eliminate steady-state drift from the setpoint."
  }
];

const faqs = [
  {
    question: "What's the difference between AND and OR logic?",
    answer: "AND logic requires ALL conditions to be true for output, while OR logic only requires ANY one condition to be true. AND is used for safety interlocks, OR for multiple triggers."
  },
  {
    question: "Why is PID control used instead of simple on/off switching?",
    answer: "PID provides smooth, precise control that maintains setpoints without oscillation. Simple on/off causes hunting and overshoots. PID is essential for temperature and pressure control."
  },
  {
    question: "Why are electricians involved in programming tests?",
    answer: "To verify that programmed logic matches physical installation, test physical responses, and confirm safety interlocks work correctly. Programming must align with actual wiring."
  },
  {
    question: "What happens if PID parameters are incorrectly tuned?",
    answer: "Incorrect tuning causes oscillation (hunting around setpoint), slow response, or overshoot. Proper tuning requires testing during commissioning with actual building loads."
  }
];

const quizQuestion = {
  question: "A supply fan continued running during a fire alarm test. Investigation found the program used OR logic instead of AND/NOT logic. What does this demonstrate?",
  options: [
    "OR logic is unsuitable for any BMS application",
    "Incorrect Boolean logic can create serious safety hazards",
    "Fire alarms should not be connected to the BMS",
    "The fan relay was faulty"
  ],
  correctAnswer: 1,
  explanation: "The case demonstrates that incorrect Boolean logic can create safety hazards. The OR logic meant the fan would run if ANY condition was true, including during fire alarm. Correct AND/NOT logic ensures the fan ONLY runs when enabled AND there's NO fire alarm."
};

const BMSModule7Section2 = () => {
  useSEO({
    title: "BMS Programming Methods | Module 7.2",
    description: "Learn BMS programming methods including function blocks, Boolean logic (AND/OR/NOT), and PID control for Building Management Systems."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Programming Methods
          </h1>
          <p className="text-white">
            Function blocks, Boolean logic, and PID control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Function blocks:</strong> Visual graphical programming</li>
              <li><strong>Boolean:</strong> AND/OR/NOT logic decisions</li>
              <li><strong>PID:</strong> Proportional, Integral, Derivative control</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Logic diagrams in control schematics</li>
              <li><strong>Use:</strong> Verify interlock logic during commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand function block programming concepts",
              "Apply Boolean logic (AND, OR, NOT) to control sequences",
              "Explain PID control principles for analogue outputs",
              "Support programming verification during commissioning"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Function Blocks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Function Blocks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Function blocks are <strong>graphical building blocks</strong> used to create control logic. They represent specific functions that process inputs and generate outputs, making complex sequences easier to understand.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Logic Gates</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AND gates: All inputs must be true</li>
                  <li>OR gates: Any input true gives output</li>
                  <li>NOT gates: Inverts input signal</li>
                  <li>NAND/XOR: Combined logic operations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Timing Functions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>On-delay timers: Delay before activate</li>
                  <li>Off-delay timers: Delay before deactivate</li>
                  <li>Pulse timers: Generate timed pulses</li>
                  <li>Counters: Count events or cycles</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">AHU Fan Control Example</p>
              <ol className="text-sm text-white space-y-1 ml-4">
                <li>1. Comparator: Filter DP &lt; 500Pa → Filter OK</li>
                <li>2. AND Block: (Enabled) AND (Fire Safe) AND (Filter OK) → Auto Run</li>
                <li>3. OR Block: (Auto Run) OR (Manual Override) → Fan Command</li>
                <li>4. Timer: 5-second delay → Output to relay</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Boolean Logic */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Boolean Logic
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Boolean logic uses <strong>True (1) and False (0)</strong> as its two basic states. These binary conditions form the foundation of all digital decision-making in BMS systems.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">AND Logic</p>
                <p className="text-sm text-white">ALL conditions must be true for output to be true. Used for safety interlocks where every requirement must be met.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">OR Logic</p>
                <p className="text-sm text-white">ANY one condition being true gives true output. Used for multiple triggers or alternative start conditions.</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">NOT Logic</p>
                <p className="text-sm text-white">Inverts the input signal. True becomes False, False becomes True. Used for "if NOT fire alarm" conditions.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Safety Interlock Example</p>
              <p className="text-sm text-white">Fan runs ONLY when: (System Enabled) AND (NOT Fire Alarm) AND (Flow Switch OK). If any condition fails, the fan stops - this is why AND logic is critical for safety.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: PID Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            PID Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PID control stands for <strong>Proportional, Integral, Derivative</strong> - a mathematical approach that provides smooth, precise control of analog outputs like valve positions or fan speeds.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Proportional (P)</p>
                <p className="text-sm text-white">Reacts to current error. Larger error = larger correction. Provides immediate response but can leave residual offset.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Integral (I)</p>
                <p className="text-sm text-white">Accumulates error over time. Gradually increases output to eliminate steady-state offset. Corrects long-term drift.</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">Derivative (D)</p>
                <p className="text-sm text-white">Reacts to rate of change. Anticipates future error based on trend. Helps prevent overshoot and oscillation.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Temperature Control Example</p>
              <p className="text-sm text-white">Setpoint: 21°C. Actual: 19°C (2°C error). P responds to the 2°C gap, I accumulates error if it persists, D predicts if temperature is rising or falling. Together they smoothly adjust the heating valve to reach and maintain 21°C.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Commissioning Support */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrician's Role in Program Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Programming and testing is done with electricians present to <strong>verify that programmed logic matches the physical installation</strong> and safety interlocks work correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Physical verification:</strong> Outputs match commands</li>
                  <li><strong>Interlock testing:</strong> Safety logic works correctly</li>
                  <li><strong>Sensor calibration:</strong> Readings match actual values</li>
                  <li><strong>Documentation:</strong> Record test results</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Issues to Check</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Inverted signals:</strong> NO vs NC confusion</li>
                  <li><strong>Wrong addressing:</strong> Output to wrong device</li>
                  <li><strong>Logic errors:</strong> AND vs OR mistakes</li>
                  <li><strong>Timer values:</strong> Too fast or too slow</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Fire Alarm Logic Error</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Problem</p>
              <p className="text-sm text-white">During fire alarm testing, a supply fan continued running instead of stopping. This could spread smoke through the building in a real fire.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Investigation</p>
              <p className="text-sm text-white">The program used OR logic: (Enabled) OR (NOT Fire Alarm). This meant the fan would run if EITHER condition was true - including when fire alarm was active.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Solution</p>
              <p className="text-sm text-white">Changed to AND logic: (Enabled) AND (NOT Fire Alarm). Now the fan only runs when BOTH conditions are true - system enabled AND no fire alarm.</p>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Boolean Logic</p>
              <ul className="space-y-0.5">
                <li>AND: All true → true output</li>
                <li>OR: Any true → true output</li>
                <li>NOT: Inverts the signal</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">PID Components</p>
              <ul className="space-y-0.5">
                <li>P: Current error response</li>
                <li>I: Long-term offset correction</li>
                <li>D: Rate of change prediction</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Design Documentation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-3">
              Next: Addressing and Mapping
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section2;
