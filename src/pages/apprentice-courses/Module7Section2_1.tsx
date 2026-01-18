import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_1 = () => {
  useSEO(
    "Open Circuit Faults - Level 2 Module 7 Section 2.1",
    "Understanding detection, causes, and rectification of open circuit faults"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is an open circuit fault?",
      options: [
        "When two conductors touch each other",
        "When a conductor is broken or disconnected, preventing current flow",
        "When current flows to earth",
        "When voltage is too high"
      ],
      correctAnswer: 1,
      explanation: "An open circuit fault occurs when the intended path of current is broken, preventing electricity from flowing properly."
    },
    {
      id: 2,
      question: "What happens to current flow when a conductor is broken?",
      options: [
        "Current increases dramatically",
        "Current flows to earth",
        "Current cannot complete its path",
        "Current flows backwards"
      ],
      correctAnswer: 2,
      explanation: "When a conductor is broken or disconnected, current cannot complete its circuit path, so no current flows."
    },
    {
      id: 3,
      question: "Which of these is a common cause of open circuit faults?",
      options: [
        "Too much insulation",
        "Loose or poorly tightened connections",
        "Excessive earthing",
        "High voltage"
      ],
      correctAnswer: 1,
      explanation: "Loose or poorly tightened connections at terminals are one of the most common causes of open circuit faults."
    },
    {
      id: 4,
      question: "Why might a lighting point stop working due to an open circuit fault?",
      options: [
        "The circuit breaker has tripped",
        "There's too much current flowing",
        "A conductor in the lighting circuit is broken",
        "The earth connection is faulty"
      ],
      correctAnswer: 2,
      explanation: "If a conductor in the lighting circuit is broken, the circuit cannot complete and the light will not work."
    },
    {
      id: 5,
      question: "What risk occurs if a CPC (earth wire) suffers an open circuit fault?",
      options: [
        "The lights will not work",
        "The protective conductor will not function when needed",
        "The circuit breaker will trip immediately",
        "Voltage will increase"
      ],
      correctAnswer: 1,
      explanation: "If the CPC has an open circuit, it cannot provide protection during earth faults, creating a safety risk."
    },
    {
      id: 6,
      question: "What test is commonly used to detect open circuits in conductors?",
      options: [
        "Insulation resistance test",
        "Continuity test",
        "Earth fault loop impedance test",
        "Polarity test"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing checks that conductors are complete and can carry current, detecting open circuits."
    },
    {
      id: 7,
      question: "True or False: Open circuit faults always cause circuit breakers to trip.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Open circuits usually stop current flow altogether, so there's no overcurrent to cause tripping."
    },
    {
      id: 8,
      question: "Why might insulation resistance tests still pass even with an open CPC?",
      options: [
        "The test doesn't check earth conductors",
        "Insulation resistance testing doesn't detect breaks in conductors",
        "The readings are always misleading",
        "Open circuits improve insulation"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance testing measures resistance between conductors, not continuity within them, so it won't detect a broken CPC."
    },
    {
      id: 9,
      question: "How should an open circuit fault be corrected?",
      options: [
        "Increase the voltage",
        "Replace the circuit breaker",
        "Repair or replace the damaged conductor and retest",
        "Add more insulation"
      ],
      correctAnswer: 2,
      explanation: "Open circuits are corrected by repairing or replacing the damaged conductor, tightening connections, or re-terminating, followed by retesting."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake caused the socket to fail?",
      options: [
        "Wrong cable size was used",
        "The neutral conductor was not tightened properly",
        "Too much current was flowing",
        "The earth was disconnected"
      ],
      correctAnswer: 1,
      explanation: "The apprentice failed to tighten the neutral conductor properly at the terminal, causing it to come loose and create an open circuit."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span>Section 2.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Open Circuit Faults
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Understanding detection, causes, and rectification of open circuit faults
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              An <strong className="text-white">open circuit fault</strong> occurs when there is a break in the electrical path, preventing current from flowing. These are among the most common faults in electrical systems and require systematic testing to locate and repair.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Definition and Characteristics
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                An open circuit fault occurs when the electrical path becomes incomplete, preventing current from flowing. This can happen when a conductor is physically broken, disconnected, or when a connection becomes loose enough to break the circuit.
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Key Characteristics</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Complete interruption of current flow in the affected circuit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    No voltage present at load terminals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Equipment downstream of the fault will not operate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    No tripping of protective devices (unless safety systems are affected)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    High resistance measurement across the break point
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Types of Open Circuit Faults</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Complete break:</strong> Physical separation of conductor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Loose connection:</strong> High resistance joint that eventually fails
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Component failure:</strong> Blown fuse, failed switch contacts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Corrosion:</strong> Oxidation causing loss of conductivity
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="open-circuit-current"
                question="What happens to current flow when a conductor is broken or disconnected?"
                options={[
                  "Current increases dramatically",
                  "Current flows to earth instead",
                  "Current cannot complete its path",
                  "Current flows backwards through the circuit"
                ]}
                correctIndex={2}
                explanation="When a conductor is broken or disconnected, the circuit path is incomplete, so current cannot flow at all."
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Causes
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Open circuit faults can arise from various factors throughout the lifecycle of an electrical installation:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Installation Issues</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Insufficient tightening of terminal screws</li>
                    <li>• Poor quality connections during installation</li>
                    <li>• Inadequate cable preparation (stripped lengths)</li>
                    <li>• Missing connections at accessories</li>
                    <li>• Incorrect use of connectors or junction boxes</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Physical Damage</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Mechanical damage from drilling or nailing</li>
                    <li>• Cable crushing during construction work</li>
                    <li>• Rodent damage to cable insulation and conductors</li>
                    <li>• Vibration causing connections to work loose</li>
                    <li>• Thermal cycling causing expansion/contraction</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Component Failures</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Blown fuses due to overload or fault conditions</li>
                    <li>• Switch or breaker contact failure</li>
                    <li>• Lamp filament failure in series circuits</li>
                    <li>• Control relay contact deterioration</li>
                    <li>• Connection corrosion in damp environments</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Environmental Factors</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Corrosion due to moisture ingress</li>
                    <li>• Thermal damage from overheating</li>
                    <li>• UV degradation of cable insulation</li>
                    <li>• Chemical attack in industrial environments</li>
                    <li>• Age-related deterioration of materials</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="open-circuit-causes"
                question="Give two common causes of open circuit faults in electrical installations."
                options={[
                  "High voltage and low current",
                  "Loose connections and mechanical damage",
                  "Too much insulation and earthing",
                  "Circuit breakers and fuses"
                ]}
                correctIndex={1}
                explanation="Loose or poorly tightened connections and mechanical damage to cables are among the most common causes of open circuit faults."
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Effects and Safety Implications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                While open circuits may seem less dangerous than short circuits, they can have serious safety and operational consequences:
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Immediate Effects</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• Complete loss of function in affected circuits</li>
                  <li>• Lighting circuits leaving areas without illumination</li>
                  <li>• Power circuits causing equipment shutdown</li>
                  <li>• Partial failure in ring circuits (sockets may still work on one leg)</li>
                  <li>• Control circuits causing system malfunction</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h4 className="font-medium text-red-400 mb-3">Critical Safety Implications</h4>
                <ul className="space-y-1.5 text-sm text-red-200/80">
                  <li>• <strong className="text-red-300">CPC failure:</strong> Loss of earth fault protection</li>
                  <li>• <strong className="text-red-300">Emergency systems:</strong> Fire alarms, emergency lighting failure</li>
                  <li>• <strong className="text-red-300">Security systems:</strong> Intruder alarms, access control</li>
                  <li>• <strong className="text-red-300">Safety equipment:</strong> Ventilation, smoke extraction</li>
                  <li>• <strong className="text-red-300">Medical equipment:</strong> Life support systems in healthcare</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="text-sm text-red-200/80">
                  <strong className="text-red-300">Critical Safety Note:</strong> Open circuit faults in protective conductors (CPC) are particularly dangerous as they remove earth fault protection while equipment may continue to operate normally. This creates a hidden danger that could result in electric shock or fire.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Detection and Testing Methods
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Systematic testing approaches are essential for locating open circuit faults efficiently and safely:
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-3">Primary Testing Methods</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Continuity testing:</strong> Using multimeter or dedicated continuity tester</li>
                  <li>• <strong className="text-white">Visual inspection:</strong> Checking for obvious breaks or loose connections</li>
                  <li>• <strong className="text-white">Voltage testing:</strong> Measuring voltage presence at various points</li>
                  <li>• <strong className="text-white">Resistance measurement:</strong> Checking conductor resistance values</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Testing Sequence</h4>
                <ol className="space-y-1.5 text-sm list-decimal list-inside">
                  <li><strong className="text-white">Isolate</strong> the circuit and verify isolation</li>
                  <li><strong className="text-white">Visual inspection</strong> of accessible connections</li>
                  <li><strong className="text-white">Continuity test</strong> from supply to load</li>
                  <li><strong className="text-white">Section testing</strong> to narrow down fault location</li>
                  <li><strong className="text-white">Point-to-point testing</strong> to identify exact fault position</li>
                </ol>
              </div>

              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                <h4 className="font-medium text-orange-300 mb-3">Safety Considerations</h4>
                <ul className="space-y-1.5 text-sm text-orange-200/80">
                  <li>• Always isolate before testing - never test live circuits for continuity</li>
                  <li>• Use appropriate test instruments for the voltage level</li>
                  <li>• Verify test equipment operation before and after use</li>
                  <li>• Follow safe isolation procedures (secure isolation)</li>
                  <li>• Use appropriate PPE for the environment</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="open-circuit-testing"
                question="What is the first step when testing for open circuit faults?"
                options={[
                  "Start continuity testing immediately",
                  "Check the circuit breaker position",
                  "Isolate the circuit and verify isolation",
                  "Measure the voltage at the load"
                ]}
                correctIndex={2}
                explanation="Safety requires that the circuit is properly isolated and isolation verified before any testing begins."
              />
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Repair and Prevention
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective repair requires proper techniques and consideration of prevention measures:
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-3">Repair Procedures</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Reconnection:</strong> Clean and properly terminate loose connections</li>
                  <li>• <strong className="text-white">Cable repair:</strong> Use appropriate junction boxes or replacement sections</li>
                  <li>• <strong className="text-white">Component replacement:</strong> Replace blown fuses, failed switches</li>
                  <li>• <strong className="text-white">Re-termination:</strong> Strip and re-terminate damaged cable ends</li>
                  <li>• <strong className="text-white">Testing:</strong> Verify repair with continuity and function tests</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Prevention Measures</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• Use correct torque settings for terminal connections</li>
                  <li>• Provide adequate cable protection in vulnerable areas</li>
                  <li>• Regular inspection and maintenance schedules</li>
                  <li>• Quality installation practices and workmanship</li>
                  <li>• Environmental protection for exposed connections</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">BS 7671 Requirements</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• Continuity testing must be performed during installation</li>
                  <li>• Protective conductor continuity is critical for safety</li>
                  <li>• All connections must be accessible for inspection</li>
                  <li>• Appropriate cable selection for environmental conditions</li>
                  <li>• Documentation of test results and any faults found</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real World Example
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <h4 className="font-medium text-amber-300 mb-2">Case Study: Office Socket Circuit Failure</h4>
                <p className="text-sm text-amber-200/80">
                  During a routine office refurbishment, an apprentice electrician installed new socket outlets. Two weeks later, several sockets on the circuit stopped working, causing disruption to the office operations.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-red-300 mb-2">The Problem</h4>
                <p className="text-sm text-red-200/80">
                  Multiple socket outlets on a ring final circuit suddenly lost power. Initial checks showed the MCB had not tripped, and other sockets on the circuit were still working normally.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <h4 className="font-medium text-elec-yellow mb-2">The Investigation</h4>
                <p className="text-sm text-elec-yellow/80">
                  An experienced electrician performed continuity testing and discovered an open circuit in the neutral conductor at one of the newly installed sockets. The socket itself appeared to be properly connected.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <h4 className="font-medium text-orange-300 mb-2">The Root Cause</h4>
                <p className="text-sm text-orange-200/80">
                  Upon closer inspection, it was found that the neutral conductor terminal screw had not been properly tightened during installation. Vibration from normal office activity had caused the connection to gradually work loose until it made insufficient contact.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h4 className="font-medium text-green-300 mb-2">Lessons Learned</h4>
                <ul className="text-sm text-green-200/80 space-y-1">
                  <li>• Always use the correct torque settings for terminal connections</li>
                  <li>• Perform thorough testing after installation completion</li>
                  <li>• Quality control checks should verify all connections</li>
                  <li>• Proper supervision of apprentice work is essential</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">What's the difference between an open circuit and a short circuit?</h4>
                <p className="text-sm text-white/70">An open circuit has a break in the path preventing current flow, while a short circuit creates an unintended low-resistance path allowing excessive current flow.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">Can an open circuit be dangerous?</h4>
                <p className="text-sm text-white/70">While open circuits don't cause overcurrent, they can be dangerous if they affect safety systems like emergency lighting or protective devices.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">How do I test for continuity safely?</h4>
                <p className="text-sm text-white/70">Always isolate the circuit first, verify isolation, then use a multimeter set to continuity mode. Never test continuity on live circuits.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">What tools do I need for open circuit fault finding?</h4>
                <p className="text-sm text-white/70">Essential tools include a multimeter, continuity tester, voltage indicator, and basic hand tools for accessing connections.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Summary</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Open circuit faults represent one of the most common electrical problems, characterised by a complete break in the electrical path that prevents current flow. These faults can occur due to loose connections, mechanical damage, component failures, and environmental factors. While they may not immediately cause protective device operation, they can have serious safety implications, particularly when affecting protective conductors or safety-critical systems. Effective detection requires systematic testing with proper isolation procedures, and understanding their behaviour is fundamental for electrical technicians.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of open circuit faults" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] justify-center sm:justify-start"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Section 2 Overview
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-black justify-center sm:justify-start"
              asChild
            >
              <Link to="../2-2">
                Next: Short Circuits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_1;
