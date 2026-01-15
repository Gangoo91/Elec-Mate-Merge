import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity and Polarity Checks (Functional, Non-Certified) - Module 4.6.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master functional continuity and polarity testing techniques for electrical installations. Learn to verify circuit integrity and correct conductor connections before formal certification testing.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What does \"continuity\" mean in electrical installation?",
    options: ["High voltage capability", "Unbroken electrical path", "Circuit switching ability", "Cable insulation strength"],
    correctIndex: 1,
    explanation: "Continuity refers to an unbroken, consistent electrical path through a conductor, ensuring proper electrical connection from one end to the other."
  },
  {
    id: 2,
    question: "Why is polarity important for safety?",
    options: ["For aesthetic reasons", "To prevent live parts on equipment casings", "To reduce installation costs", "For easier maintenance"],
    correctIndex: 1,
    explanation: "Correct polarity ensures live and neutral conductors are connected to proper terminals, preventing dangerous situations like live metal parts on appliance casings."
  },
  {
    id: 3,
    question: "Name one tool used for checking continuity.",
    options: ["Voltage indicator", "Continuity tester", "Current clamp", "Power analyser"],
    correctIndex: 1,
    explanation: "Continuity testers or low-resistance ohmmeters are used to verify unbroken electrical paths through conductors and protective circuits."
  }
];

const Module4Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is continuity?",
      options: [
        "The ability of a cable to carry high voltage",
        "An unbroken path in an electrical circuit",
        "The switching of polarity in a circuit",
        "The insulation resistance of a conductor"
      ],
      correctAnswer: 1,
      explanation: "Continuity refers to an unbroken electrical path in a circuit, ensuring proper electrical connection throughout the conductor."
    },
    {
      id: 2,
      question: "True or False: Polarity checks confirm that conductors are connected to the correct terminals.",
      options: [
        "True",
        "False",
        "Only for domestic installations",
        "Only for industrial installations"
      ],
      correctAnswer: 0,
      explanation: "True - Polarity checks verify that live, neutral, and earth conductors are connected to their designated terminals."
    },
    {
      id: 3,
      question: "Name one common fault discovered during a polarity check.",
      options: [
        "Reversed line and neutral conductors",
        "High insulation resistance",
        "Low current capacity",
        "Excessive voltage drop"
      ],
      correctAnswer: 0,
      explanation: "Reversed or swapped line and neutral conductors are commonly discovered during polarity checks and create serious safety hazards."
    },
    {
      id: 4,
      question: "What reading would you expect on a continuity tester for a good connection?",
      options: [
        "High resistance (mega-ohms)",
        "Close to zero ohms",
        "Infinite resistance",
        "Variable resistance"
      ],
      correctAnswer: 1,
      explanation: "A good continuous connection should show close to zero ohms resistance, indicating an unbroken electrical path."
    },
    {
      id: 5,
      question: "Which BS 7671 section covers inspection and testing?",
      options: [
        "Part 4",
        "Part 6",
        "Part 7",
        "Part 1"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Part 6 covers inspection and testing requirements for electrical installations."
    },
    {
      id: 6,
      question: "Why is sleeving used on switched live conductors?",
      options: [
        "To identify the conductor as live when switched on",
        "To improve insulation properties",
        "To reduce installation costs",
        "For aesthetic purposes only"
      ],
      correctAnswer: 0,
      explanation: "Sleeving (typically brown) identifies switched live conductors, making it clear which conductor becomes live when the switch is operated."
    },
    {
      id: 7,
      question: "What should you do before carrying out a continuity test?",
      options: [
        "Energise the circuit",
        "Isolate the circuit and verify isolation",
        "Connect test equipment only",
        "Check circuit ratings first"
      ],
      correctAnswer: 1,
      explanation: "Always isolate the circuit using appropriate switching and verify isolation with an approved voltage indicator before testing."
    },
    {
      id: 8,
      question: "True or False: Functional checks replace the need for full certification testing.",
      options: [
        "True",
        "False",
        "Only for simple circuits",
        "Only for experienced electricians"
      ],
      correctAnswer: 1,
      explanation: "False - Functional checks are preliminary tests that supplement but do not replace formal certification testing required under BS 7671."
    }
  ];

  const faqs = [
    {
      question: "Can I do polarity checks with the power on?",
      answer: "No — these are performed with the circuit safely isolated. Never attempt polarity or continuity checks on energised circuits as this creates serious safety hazards."
    },
    {
      question: "Are continuity and polarity checks recorded on the installation certificate?",
      answer: "Formal test results are recorded on certificates; basic functional checks are usually noted in site records for quality assurance and fault tracking purposes."
    },
    {
      question: "If I find a break in continuity, what's the next step?",
      answer: "Locate and repair the fault before progressing to formal testing. Document the fault location and corrective action taken for site records."
    },
    {
      question: "How often should functional checks be performed during installation?",
      answer: "Best practice is to test each circuit and accessory as it is installed, rather than waiting until the end of the job. This makes fault finding much easier."
    },
    {
      question: "What's the difference between functional and certification testing?",
      answer: "Functional checks are preliminary verification tests during installation, while certification testing follows formal BS 7671 procedures with calibrated instruments and documented results."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Continuity and Polarity Checks (Functional, Non-Certified)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master functional testing techniques to verify circuit integrity and correct conductor connections before formal certification testing
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Functional checks verify continuity and polarity before formal testing begins</li>
                  <li>These preliminary tests identify wiring faults early in the installation process</li>
                  <li>Proper checks prevent equipment damage and ensure safety before energisation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Conductor breaks, incorrect connections, polarity errors</li>
                  <li><strong>Use:</strong> Continuity testers, systematic checking methods, isolation procedures</li>
                  <li><strong>Check:</strong> Zero resistance paths, correct terminal connections, safety compliance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Define continuity and polarity in the context of electrical circuits and understand their safety implications</li>
              <li>Perform basic functional continuity tests on conductors and circuit protective conductors (CPCs)</li>
              <li>Verify polarity of outlets, switches, and light fittings using appropriate testing methods</li>
              <li>Recognise common faults found during functional checks and understand their potential consequences</li>
              <li>Understand when to escalate from basic functional checks to formal certification testing procedures</li>
            </ul>
          </section>

          {/* Understanding Continuity */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Understanding Continuity and Its Critical Importance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Continuity testing verifies the integrity of electrical connections throughout circuits, ensuring safe and reliable operation.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-white mb-2">Continuity Fundamentals and Testing Principles</p>
                <p className="text-sm mb-2"><strong>Definition and importance:</strong> Continuity ensures unbroken electrical paths through conductors.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Unbroken, consistent electrical path through conductors from origin to termination point</li>
                  <li>Essential for proper current flow and protection system operation</li>
                  <li>Critical for circuit protective conductor (CPC) effectiveness in fault conditions</li>
                  <li>Fundamental requirement for safe equipment operation and personnel protection</li>
                </ul>
                <p className="text-sm mb-2"><strong>Testing methodology:</strong> Low-resistance measurement techniques for accurate assessment.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Low-resistance ohmmeters provide accurate continuity measurements</li>
                  <li>Continuity testers offer simple pass/fail indication for basic checks</li>
                  <li>Test current typically 200mA or greater to overcome contact resistance</li>
                  <li>Resistance readings should be close to zero ohms for good continuity</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Safety critical:</strong> CPC continuity failures can result in dangerous touch voltages during fault conditions
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="continuity-definition-check"
                question={quickCheckQuestions[0].question}
                options={quickCheckQuestions[0].options}
                correctIndex={quickCheckQuestions[0].correctIndex}
                explanation={quickCheckQuestions[0].explanation}
              />
            </div>
          </section>

          {/* Understanding Polarity */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Understanding Polarity and Connection Verification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Polarity verification ensures conductors are connected to their designated terminals, preventing safety hazards.</p>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-white mb-2">Polarity Verification and Safety Requirements</p>
                <p className="text-sm mb-2"><strong>Polarity definition and significance:</strong> Correct conductor-to-terminal relationships for safe operation.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Live (line) conductors connected to designated live terminals</li>
                  <li>Neutral conductors connected to designated neutral terminals</li>
                  <li>Circuit protective conductors connected to earth terminals</li>
                  <li>Switched live conductors properly identified and connected</li>
                </ul>
                <p className="text-sm mb-2"><strong>Safety implications of polarity errors:</strong> Incorrect connections create serious hazards.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Live metal parts on equipment casings creating shock risk</li>
                  <li>Protective devices may not operate correctly in fault conditions</li>
                  <li>Equipment damage due to incorrect voltage application</li>
                  <li>Fire risk from overheating caused by incorrect connections</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Critical verification:</strong> All conductor connections must be verified before energisation
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="polarity-safety-check"
                question={quickCheckQuestions[1].question}
                options={quickCheckQuestions[1].options}
                correctIndex={quickCheckQuestions[1].correctIndex}
                explanation={quickCheckQuestions[1].explanation}
              />
            </div>
          </section>

          {/* Testing Procedures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Systematic Testing Procedures and Best Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Following structured procedures ensures comprehensive verification while maintaining safety throughout testing.</p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-white mb-2">Professional Testing Procedures and Safety Protocols</p>
                <p className="text-sm mb-2"><strong>Continuity testing procedure:</strong> Systematic approach for reliable results.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Isolate circuit using main switch or appropriate protective device</li>
                  <li>Verify isolation using approved voltage indicator and proving unit</li>
                  <li>Connect continuity tester between both ends of conductor under test</li>
                  <li>Record resistance readings - should be near zero ohms for good continuity</li>
                </ul>
                <p className="text-sm mb-2"><strong>Polarity verification procedure:</strong> Confirming correct conductor connections.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>With circuit safely isolated, identify conductors at each accessory</li>
                  <li>Verify line conductor connection to live terminal (typically L or phase)</li>
                  <li>Confirm neutral conductor connection to neutral terminal (typically N)</li>
                  <li>Check CPC connection to earth terminal (typically E or earth symbol)</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Safety first:</strong> Never attempt testing on energised circuits - always isolate and verify
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="testing-tools-check"
                question={quickCheckQuestions[2].question}
                options={quickCheckQuestions[2].options}
                correctIndex={quickCheckQuestions[2].correctIndex}
                explanation={quickCheckQuestions[2].explanation}
              />
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Common Issues and Fault Identification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding typical faults helps rapid identification and efficient resolution during functional testing.</p>

              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <p className="font-semibold text-white mb-2">Typical Installation Faults and Resolution Strategies</p>
                <p className="text-sm mb-2"><strong>Continuity-related faults:</strong> Common breaks and connection issues.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Broken CPC connections in socket ring final circuits affecting protection</li>
                  <li>Damaged conductors due to poor installation techniques or subsequent damage</li>
                  <li>Loose terminations causing high resistance connections</li>
                  <li>Incorrect conductor routing leading to stress and breakage</li>
                </ul>
                <p className="text-sm mb-2"><strong>Polarity-related faults:</strong> Incorrect conductor connections and identification.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Swapped neutral and earth conductors creating dangerous conditions</li>
                  <li>Reversed line and neutral at accessories compromising safety</li>
                  <li>Missing identification sleeving on switched live conductors</li>
                  <li>Incorrect terminal connections at distribution boards</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Early detection:</strong> Functional testing identifies problems before they become safety hazards
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-white/10">
                <p className="font-medium text-white mb-2">Required Testing Equipment</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Continuity tester or low-resistance ohmmeter for accurate resistance measurement</li>
                  <li>Multimeter with continuity function for versatile testing capabilities</li>
                  <li>Approved voltage indicator for safe isolation verification</li>
                  <li>Proving unit to verify voltage indicator operation</li>
                  <li>Insulated test leads rated for the voltage levels involved</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-green-400/30 bg-green-500/5">
                <p className="font-medium text-white mb-2">Professional Testing Techniques</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Label conductors before disconnection during installation to speed up testing</li>
                  <li>Test each accessory as it is installed rather than waiting until project completion</li>
                  <li>Use systematic approach working from distribution board to final points</li>
                  <li>Document all test results immediately to avoid errors and omissions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-world Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-world Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="font-semibold text-white mb-3">School Refurbishment Project - Critical Continuity Fault Discovery</p>
              <div className="text-white/80 space-y-3 text-sm">
                <p><strong>Situation:</strong> During a comprehensive school refurbishment project, functional continuity testing was performed on each circuit as installation progressed.</p>
                <p><strong>Discovery:</strong> A continuity check on the classroom socket ring circuit revealed a break in the circuit protective conductor (CPC) between two sockets. The initial reading showed infinite resistance instead of the expected near-zero value.</p>
                <p><strong>Investigation:</strong> Systematic testing traced the fault to a poorly crimped earth connection inside a junction box that had been hidden behind a wall panel.</p>
                <p><strong>Resolution:</strong> The junction box was accessed, and the faulty crimp connection was remade properly. Continuity testing confirmed the repair.</p>
                <div className="p-3 rounded bg-green-500/10 border border-green-400/30 mt-3">
                  <p className="font-medium text-white">Key Learning: Functional testing during installation saves time and money by identifying faults when they are easier to access and repair.</p>
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
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 mb-4">
                Functional continuity and polarity checks are essential preliminary tests that verify circuit integrity and correct conductor connections before formal certification testing. These checks identify installation faults early when they are easier and less expensive to correct.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Safety Benefits</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Early fault identification</li>
                    <li>Prevention of safety hazards</li>
                    <li>Equipment protection</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-green-400/30 bg-green-500/5">
                  <h3 className="font-medium text-green-400 mb-2">Quality Assurance</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Progressive quality control</li>
                    <li>Systematic fault detection</li>
                    <li>Installation verification</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Project Efficiency</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Reduced rework costs</li>
                    <li>Faster fault resolution</li>
                    <li>Enhanced reliability</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Do's and Don'ts */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Apprentice Do's and Don'ts
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-green-400">Do</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Always isolate circuits completely before attempting any testing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Use proper test equipment and verify its operation before use
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Test each circuit and accessory as installation progresses
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Document all test results and findings immediately
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-red-400">Don't</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Attempt testing on energised circuits - always isolate first
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Ignore unusual readings or assume they will resolve themselves
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Rush through testing to meet project deadlines
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Assume functional checks replace formal certification testing
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Visual Inspection
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-3">
                Next: Insulation Resistance Testing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_2;
