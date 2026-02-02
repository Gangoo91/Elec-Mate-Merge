import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recognising Circuit Types on Site - Level 2 Module 2 Section 3.6";
const DESCRIPTION = "Identify series, parallel and mixed circuits on site for fault finding and planning. BS 7671 aligned guidance.";

const quickCheckQuestions = [
  {
    id: "series-identification",
    question: "What visual clue indicates a series circuit on site?",
    options: ["Multiple junction boxes", "One cable in, one out, no branches", "Ring connections", "Separate fuses for each load"],
    correctIndex: 1,
    explanation: "A single daisy-chain path without branching suggests series wiring."
  },
  {
    id: "parallel-recognition",
    question: "How can you recognise a parallel circuit?",
    options: ["All loads fail together", "Single cable between loads", "Independent operation of each load", "Current is same everywhere"],
    correctIndex: 2,
    explanation: "In parallel, each branch operates independently, so loads work separately."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a single path for current indicate?",
    options: ["Radial circuit", "Parallel circuit", "Ring final", "Series circuit"],
    correctAnswer: 3,
    explanation: "One path means series: the same current flows through all components."
  },
  {
    id: 2,
    question: "A parallel circuit can be recognised by:",
    options: ["A single cable between loads", "All loads losing power when one fails", "Independent operation of each load", "Always using ring connections"],
    correctAnswer: 2,
    explanation: "In parallel, each branch is supplied directly, so other loads keep working if one fails."
  },
  {
    id: 3,
    question: "Which type of installation is most likely to be parallel?",
    options: ["An old torch", "Christmas lights", "A domestic socket circuit", "A voltage tester"],
    correctAnswer: 2,
    explanation: "Socket circuits supply multiple outlets in parallel."
  },
  {
    id: 4,
    question: "Which is a clue you're looking at a series circuit?",
    options: ["Junction box with multiple terminals", "Ring main setup", "One cable in, one out, no branches", "Each load has a separate fuse"],
    correctAnswer: 2,
    explanation: "A single daisy-chain path without branching suggests series."
  },
  {
    id: 5,
    question: "Why is it important to recognise circuit types on site?",
    options: ["It looks good on your CV", "You'll impress the inspector", "It helps avoid unnecessary rewiring", "You won't need tools"],
    correctAnswer: 2,
    explanation: "Correct recognition speeds diagnosis, reduces rework and ensures safe planning."
  },
  {
    id: 6,
    question: "At a socket MCB, two conductors in both line and neutral terminals usually indicate:",
    options: ["A spur radial", "A ring final circuit", "A series circuit", "A three-phase circuit"],
    correctAnswer: 1,
    explanation: "Two conductors returning to the same protective device typically indicate a ring final."
  },
  {
    id: 7,
    question: "Before opening accessories to trace branches, your first step should be:",
    options: ["Prove dead using an approved tester after isolation", "Pull the main fuse", "Disconnect CPCs to avoid tripping RCDs", "Increase the breaker rating"],
    correctAnswer: 0,
    explanation: "Follow safe isolation procedures (prove your tester on a known source, isolate, test dead)."
  },
  {
    id: 8,
    question: "A lighting circuit where several lamps still work when one fails is most likely:",
    options: ["Series", "Parallel", "A short circuit", "SELV series"],
    correctAnswer: 1,
    explanation: "Independent operation of remaining lamps indicates a parallel arrangement."
  },
  {
    id: 9,
    question: "What indicates a ring final circuit at the consumer unit?",
    options: ["One conductor in, one out", "Two conductors at line terminal", "Three separate cables", "No neutral connection"],
    correctAnswer: 1,
    explanation: "Ring finals return to the same protective device, giving two conductors at each terminal."
  },
  {
    id: 10,
    question: "Which tool helps identify circuit types through continuity testing?",
    options: ["Voltage indicator", "Multimeter", "Clamp meter", "RCD tester"],
    correctAnswer: 1,
    explanation: "Multimeter continuity testing can trace circuit paths and identify series/parallel arrangements."
  }
];

const faqs = [
  {
    question: "How do I safely identify circuit types on an energised installation?",
    answer: "Never work on live circuits. Always follow safe isolation procedures: prove your tester, isolate the circuit, test dead, then trace wiring. Use visual inspection first - look at CU terminations and junction patterns."
  },
  {
    question: "What's the quickest way to spot a ring final circuit?",
    answer: "At the consumer unit, ring finals have two conductors at each terminal (line, neutral, earth). The conductors form a complete loop from the protective device and back again."
  },
  {
    question: "Can I use a multimeter to identify circuit types?",
    answer: "Yes, but only after safe isolation. Use continuity testing to trace paths between components. Series will show continuity through all components in sequence, parallel will show direct paths to each branch."
  },
  {
    question: "What if I find mixed series and parallel in one installation?",
    answer: "This is common - for example, parallel branches each containing series-connected components. Map the circuit carefully and consider each section's behaviour separately."
  },
  {
    question: "How does circuit type affect fault finding?",
    answer: "Series circuits: one fault affects all components. Check continuity through the entire chain. Parallel circuits: isolate each branch to identify which has the fault without affecting others."
  },
  {
    question: "Are there any visual clues without opening accessories?",
    answer: "Yes - observe failure patterns (does one fault affect all loads?), cable routing (single chain vs multiple branches), and protective device arrangements at the consumer unit."
  }
];

const Module2Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recognising Circuit Types on Site
          </h1>
          <p className="text-white/80">
            Identify series, parallel and mixed circuits for effective fault finding
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Series clues:</strong> Single path, daisy-chain wiring, all fail together</li>
              <li><strong>Parallel clues:</strong> Multiple branches, independent operation, junction boxes</li>
              <li><strong>Ring finals:</strong> Two conductors at MCB terminals, loop back to CU</li>
              <li><strong>Safety first:</strong> Always isolate and prove dead before investigating</li>
              <li><strong>BS 7671:</strong> Use continuity testing and visual inspection methods</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CU terminations, junction patterns, failure modes</li>
              <li><strong>Use:</strong> Fault diagnosis, circuit mapping, modification planning</li>
              <li><strong>Apply:</strong> Safe isolation, continuity testing, circuit tracing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Visually identify series and parallel wiring patterns on site",
              "Recognise ring final circuits from consumer unit terminations",
              "Use safe methods to trace and verify circuit configurations",
              "Apply circuit recognition skills to fault finding procedures",
              "Interpret common installation configurations in real buildings",
              "Plan circuit modifications based on existing arrangements"
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

        {/* Section 1: Visual Recognition Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Visual Clues and Recognition Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuit identification starts with systematic observation. Learn to read the visual clues that reveal circuit topology without energised testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series circuit indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Daisy-chain wiring:</strong> Single cable in, single cable out at each component</li>
                <li><strong>No junction boxes:</strong> Components connected end-to-end</li>
                <li><strong>Failure mode:</strong> One component failure stops entire circuit</li>
                <li><strong>Common locations:</strong> Decorative lighting, training boards</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel circuit indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Junction boxes:</strong> Multiple terminations at distribution points</li>
                <li><strong>Independent operation:</strong> Components work separately</li>
                <li><strong>Multiple paths:</strong> Several cables from one supply point</li>
                <li><strong>Common locations:</strong> Socket outlets, lighting points, appliance circuits</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety tip:</strong> Always isolate and prove dead before opening accessories.
              Visual inspection should be your first step, not energised testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Consumer Unit Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Consumer Unit Termination Patterns
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The consumer unit tells the story of circuit configuration. Learn to read termination patterns to identify circuit types quickly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring final circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Two conductors:</strong> Two line conductors at MCB/RCBO terminal</li>
                <li><strong>Loop back:</strong> Circuit leaves CU and returns to same protective device</li>
                <li><strong>Continuity test:</strong> End-to-end resistance on each conductor</li>
                <li><strong>Common rating:</strong> Usually 32A for socket rings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radial circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single conductors:</strong> One line conductor at protective device</li>
                <li><strong>Tree structure:</strong> Branches at accessories, not at CU</li>
                <li><strong>Various ratings:</strong> 16A, 20A, 32A depending on application</li>
                <li><strong>Dead-end test:</strong> No return path to CU</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical check:</strong> Ring finals show low resistance (typically less than 0.05 ohms)
              between opposite ends when tested at CU. Radials show open circuit at far end.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Testing and Verification Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Advanced Circuit Recognition Techniques
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Assessment Stage:</p>
                <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                  <li>Examine consumer unit terminations</li>
                  <li>Count conductors at each protective device</li>
                  <li>Trace cable routes from CU</li>
                  <li>Identify junction/distribution points</li>
                  <li>Note accessory wiring patterns</li>
                  <li>Check for obvious series/parallel indicators</li>
                </ol>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Stage (Dead):</p>
                <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                  <li>Safe isolation and prove dead</li>
                  <li>Continuity testing between points</li>
                  <li>Ring final circuit tests (if applicable)</li>
                  <li>Insulation resistance measurements</li>
                  <li>Polarity verification</li>
                  <li>Document circuit configuration</li>
                </ol>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="font-medium text-white mb-2">Domestic Installations</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white/70 mb-1">Common Parallel Circuits:</p>
                  <ul className="text-white space-y-0.5">
                    <li><strong>Socket rings:</strong> 32A ring finals, 2 conductors at MCB</li>
                    <li><strong>Lighting:</strong> Radial circuits with parallel branches</li>
                    <li><strong>Cooker:</strong> 32A/40A radial to control unit</li>
                    <li><strong>Shower:</strong> Dedicated radial circuit</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/70 mb-1">Occasional Series Elements:</p>
                  <ul className="text-white space-y-0.5">
                    <li><strong>LED strips:</strong> Series LEDs in parallel chains</li>
                    <li><strong>Switching:</strong> Series switches controlling parallel loads</li>
                    <li><strong>Controls:</strong> Series sensing in control circuits</li>
                    <li><strong>Decorative:</strong> Low-voltage festoon lighting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial/Industrial Patterns</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Distribution boards:</strong> Always radial feeds from main panels</li>
                <li><strong>Lighting banks:</strong> Parallel circuits with series switching elements</li>
                <li><strong>Motor circuits:</strong> Individual radial supplies for independent control</li>
                <li><strong>Emergency systems:</strong> Parallel for redundancy, series for monitoring</li>
                <li><strong>Data/communication:</strong> Often series (daisy-chain) topology</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Fault Finding Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Finding and BS 7671 Context
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuit recognition is essential for effective fault diagnosis and compliance with BS 7671 testing requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series circuit faults:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Check continuity through entire chain</li>
                  <li>One open circuit stops everything</li>
                  <li>Test resistance of each component</li>
                  <li>Look for loose connections</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel circuit faults:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Isolate each branch individually</li>
                  <li>Check individual branch continuity</li>
                  <li>Test at junction/distribution points</li>
                  <li>Verify protective device operation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Testing Requirements:</strong><br />
              Regulation 643.2: Continuity testing of protective conductors and equipotential bonding<br />
              Regulation 643.3: Continuity of ring final circuit conductors<br />
              Regulation 643.7: Functional testing to verify correct operation<br />
              Part 6 requirements: Document circuit arrangements and test results
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

        {/* On-Site Circuit Recognition Guide */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">On-Site Circuit Recognition Guide</h3>
            <div className="grid grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Series Indicators</p>
                <p className="text-white/70">Single cable in/out at each point, no junction boxes, all fail together, daisy-chain wiring pattern</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Indicators</p>
                <p className="text-white/70">Multiple junction boxes, independent operation, branching cable routes, individual switches/controls</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Ring Finals</p>
                <p className="text-white/70">Two conductors at MCB, loop back to CU, low end-to-end resistance, usually 32A socket circuits</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs mt-4">
              <div>
                <p className="font-medium text-white mb-1">Safety First:</p>
                <p className="text-white/70">Always isolate and prove dead before investigating circuits. Use approved voltage indicators and follow safe isolation procedures.</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quick Test:</p>
                <p className="text-white/70">Ring finals: continuity between opposite ends. Radials: dead-end at furthest point. Series: continuity through all components.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Circuit Recognition Knowledge Check" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/level2/module2/section3/3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/level2/module2/section4/4-1">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module2Section3_6;
