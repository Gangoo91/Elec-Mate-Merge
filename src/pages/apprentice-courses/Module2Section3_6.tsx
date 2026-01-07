import React from "react";
import { ArrowLeft, ArrowRight, Search, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import SeriesParallelCalculators from "@/components/apprentice-courses/SeriesParallelCalculators";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.3.6
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Recognising Circuit Types on Site
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Identify series, parallel and mixed circuits for effective fault finding
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Series clues:</strong> Single path, daisy-chain wiring, all fail together.</li>
                <li><strong>Parallel clues:</strong> Multiple branches, independent operation, junction boxes.</li>
                <li><strong>Ring finals:</strong> Two conductors at MCB terminals, loop back to CU.</li>
                <li><strong>Safety first:</strong> Always isolate and prove dead before investigating.</li>
                <li><strong>BS 7671:</strong> Use continuity testing and visual inspection methods.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> CU terminations, junction patterns, failure modes.</li>
                <li><strong>Use:</strong> Fault diagnosis, circuit mapping, modification planning.</li>
                <li><strong>Apply:</strong> Safe isolation, continuity testing, circuit tracing.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Visually identify series and parallel wiring patterns on site</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise ring final circuits from consumer unit terminations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use safe methods to trace and verify circuit configurations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply circuit recognition skills to fault finding procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Interpret common installation configurations in real buildings</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Plan circuit modifications based on existing arrangements</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Visual Recognition Techniques */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Visual Clues and Recognition Techniques
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Circuit identification starts with systematic observation. Learn to read the visual clues that reveal circuit topology without energised testing.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-elec-yellow">Series circuit indicators:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Daisy-chain wiring:</strong> Single cable in, single cable out at each component</li>
                    <li><strong>No junction boxes:</strong> Components connected end-to-end</li>
                    <li><strong>Failure mode:</strong> One component failure stops entire circuit</li>
                    <li><strong>Common locations:</strong> Decorative lighting, training boards</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-elec-yellow">Parallel circuit indicators:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Junction boxes:</strong> Multiple terminations at distribution points</li>
                    <li><strong>Independent operation:</strong> Components work separately</li>
                    <li><strong>Multiple paths:</strong> Several cables from one supply point</li>
                    <li><strong>Common locations:</strong> Socket outlets, lighting points, appliance circuits</li>
                  </ul>
                </div>

                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Safety tip:</strong> Always isolate and prove dead before opening accessories. 
                    Visual inspection should be your first step, not energised testing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Consumer Unit Analysis */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Consumer Unit Termination Patterns
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The consumer unit tells the story of circuit configuration. Learn to read termination patterns to identify circuit types quickly.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-elec-yellow">Ring final circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Two conductors:</strong> Two line conductors at MCB/RCBO terminal</li>
                    <li><strong>Loop back:</strong> Circuit leaves CU and returns to same protective device</li>
                    <li><strong>Continuity test:</strong> End-to-end resistance on each conductor</li>
                    <li><strong>Common rating:</strong> Usually 32A for socket rings</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-elec-yellow">Radial circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Single conductors:</strong> One line conductor at protective device</li>
                    <li><strong>Tree structure:</strong> Branches at accessories, not at CU</li>
                    <li><strong>Various ratings:</strong> 16A, 20A, 32A depending on application</li>
                    <li><strong>Dead-end test:</strong> No return path to CU</li>
                  </ul>
                </div>

                <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-elec-yellow">
                    <strong>Practical check:</strong> Ring finals show low resistance (typically &lt;0.05Ω) 
                    between opposite ends when tested at CU. Radials show open circuit at far end.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Testing and Verification Methods */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Advanced Circuit Recognition Techniques
            </h2>
            <div className="space-y-6 text-white">
              
              {/* Testing methodology */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Systematic Circuit Analysis Method</h3>
                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
                    <div>
                      <p className="font-bold text-teal-300 mb-3">Visual Assessment Stage:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Examine consumer unit terminations</li>
                        <li>Count conductors at each protective device</li>
                        <li>Trace cable routes from CU</li>
                        <li>Identify junction/distribution points</li>
                        <li>Note accessory wiring patterns</li>
                        <li>Check for obvious series/parallel indicators</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-bold text-teal-300 mb-3">Testing Stage (Dead):</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Safe isolation and prove dead</li>
                        <li>Continuity testing between points</li>
                        <li>Ring final circuit tests (if applicable)</li>
                        <li>Insulation resistance measurements</li>
                        <li>Polarity verification</li>
                        <li>Document circuit configuration</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common configurations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Typical Installation Patterns</h3>
                
                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-3">Domestic Installations</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <p className="font-medium mb-2">Common Parallel Circuits:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Socket rings:</strong> 32A ring finals, 2 conductors at MCB</li>
                        <li><strong>Lighting:</strong> Radial circuits with parallel branches</li>
                        <li><strong>Cooker:</strong> 32A/40A radial to control unit</li>
                        <li><strong>Shower:</strong> Dedicated radial circuit</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Occasional Series Elements:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>LED strips:</strong> Series LEDs in parallel chains</li>
                        <li><strong>Switching:</strong> Series switches controlling parallel loads</li>
                        <li><strong>Controls:</strong> Series sensing in control circuits</li>
                        <li><strong>Decorative:</strong> Low-voltage festoon lighting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-3">Commercial/Industrial Patterns</h4>
                  <div className="text-sm text-slate-300">
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Distribution boards:</strong> Always radial feeds from main panels</li>
                      <li><strong>Lighting banks:</strong> Parallel circuits with series switching elements</li>
                      <li><strong>Motor circuits:</strong> Individual radial supplies for independent control</li>
                      <li><strong>Emergency systems:</strong> Parallel for redundancy, series for monitoring</li>
                      <li><strong>Data/communication:</strong> Often series (daisy-chain) topology</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Fault Finding Applications */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Fault Finding and BS 7671 Context
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Circuit recognition is essential for effective fault diagnosis and compliance with BS 7671 testing requirements.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-300">Fault Finding Strategy by Circuit Type</h3>
                
                <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-amber-300 mb-2">Series circuit faults:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Check continuity through entire chain</li>
                        <li>One open circuit stops everything</li>
                        <li>Test resistance of each component</li>
                        <li>Look for loose connections</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-amber-300 mb-2">Parallel circuit faults:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Isolate each branch individually</li>
                        <li>Check individual branch continuity</li>
                        <li>Test at junction/distribution points</li>
                        <li>Verify protective device operation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-amber-300">BS 7671 Testing Requirements</h3>
                
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-sm text-yellow-300">
                    <li><strong>Regulation 643.2:</strong> Continuity testing of protective conductors and equipotential bonding</li>
                    <li><strong>Regulation 643.3:</strong> Continuity of ring final circuit conductors</li>
                    <li><strong>Regulation 643.7:</strong> Functional testing to verify correct operation</li>
                    <li><strong>Part 6 requirements:</strong> Document circuit arrangements and test results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Circuit Recognition Pocket Guide */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">On-Site Circuit Recognition Guide</h2>
          <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">S</span>
                  Series Indicators
                </h3>
                <div className="bg-card border border-border/30 p-3 rounded">
                  <p className="font-medium text-elec-yellow mb-2">Look For:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white text-xs">
                    <li>Single cable in/out at each point</li>
                    <li>No junction boxes</li>
                    <li>All fail together</li>
                    <li>Daisy-chain wiring pattern</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">P</span>
                  Parallel Indicators
                </h3>
                <div className="bg-card border border-elec-yellow/30 p-3 rounded">
                  <p className="font-medium text-elec-yellow mb-2">Look For:</p>
                  <ul className="list-disc pl-4 space-y-1 text-elec-yellow text-xs">
                    <li>Multiple junction boxes</li>
                    <li>Independent operation</li>
                    <li>Branching cable routes</li>
                    <li>Individual switches/controls</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">R</span>
                  Ring Finals
                </h3>
                <div className="bg-card border border-amber-400/30 p-3 rounded">
                  <p className="font-medium text-amber-300 mb-2">Look For:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white text-xs">
                    <li>Two conductors at MCB</li>
                    <li>Loop back to CU</li>
                    <li>Low end-to-end resistance</li>
                    <li>Usually 32A socket circuits</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-medium text-white mb-2">Safety First:</p>
                  <p className="text-white">Always isolate and prove dead before investigating circuits. Use approved voltage indicators and follow safe isolation procedures.</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Quick Test:</p>
                  <p className="text-white">Ring finals: continuity between opposite ends. Radials: dead-end at furthest point. Series: continuity through all components.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Reference Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference: Circuit Recognition Checklist</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">At the Consumer Unit</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Count conductors at each terminal</li>
                <li>Two conductors = likely ring final</li>
                <li>One conductor = radial circuit</li>
                <li>Check protective device ratings</li>
                <li>Note circuit labelling</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white">At Accessories</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Multiple terminations = parallel branching</li>
                <li>Single in/out = series connection</li>
                <li>Test failure patterns (safe isolation first)</li>
                <li>Check junction box arrangements</li>
                <li>Verify continuity paths</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <Quiz title="Circuit Recognition Knowledge Check" questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../3-5"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../4-1">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section3_6;
