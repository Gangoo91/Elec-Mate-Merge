import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module7Section2_5 = () => {
  useSEO(
    "Incorrect Polarity - Level 2 Module 7 Section 2.5",
    "Understanding polarity faults, risks, testing and correction in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does incorrect polarity mean in an electrical installation?",
      options: [
        "The voltage is too high",
        "Line and neutral conductors are reversed or devices connected in wrong conductor",
        "There is no earthing",
        "The current is flowing backwards"
      ],
      correctAnswer: 1,
      explanation: "Incorrect polarity occurs when line and neutral are swapped, or when protective/switching devices are connected in the wrong conductor."
    },
    {
      id: 2,
      question: "What is a common example of incorrect polarity in lighting circuits?",
      options: [
        "Using the wrong cable size",
        "A light switch wired into the neutral conductor instead of the line",
        "Installing too many lights on one circuit",
        "Using the wrong type of bulb"
      ],
      correctAnswer: 1,
      explanation: "A common polarity fault is wiring a light switch into the neutral conductor rather than the line conductor, leaving the lamp holder live when switched off."
    },
    {
      id: 3,
      question: "Give two causes of polarity faults.",
      options: [
        "High voltage and low current",
        "Misidentification of conductors and careless wiring",
        "Too much earthing and insulation",
        "Circuit breakers and fuses"
      ],
      correctAnswer: 1,
      explanation: "Polarity faults are typically caused by misidentification of conductors and careless or rushed wiring during installation."
    },
    {
      id: 4,
      question: "Why is incorrect polarity dangerous even if equipment appears to work?",
      options: [
        "It uses more electricity",
        "It damages the equipment",
        "Equipment may remain live when switched off, creating shock risks",
        "It causes circuit breakers to trip frequently"
      ],
      correctAnswer: 2,
      explanation: "With incorrect polarity, equipment may still function but can remain electrically live when switched off, creating serious shock hazards."
    },
    {
      id: 5,
      question: "What regulation requires correct polarity?",
      options: [
        "Building Regulations Part P",
        "BS 7671 Wiring Regulations",
        "Health and Safety at Work Act",
        "Electricity at Work Regulations"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires correct polarity for all electrical installations."
    },
    {
      id: 6,
      question: "True or False: A polarity fault may leave lamp holders live even when switched off.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "True. If a switch is wired in the neutral instead of the line, the lamp holder remains live even when the switch is off."
    },
    {
      id: 7,
      question: "What tests are used to check polarity?",
      options: [
        "Insulation resistance tests only",
        "Continuity and functional tests",
        "Earth fault loop impedance tests",
        "RCD tests only"
      ],
      correctAnswer: 1,
      explanation: "Polarity is checked using continuity tests and functional tests to confirm correct line, neutral, and earth connections."
    },
    {
      id: 8,
      question: "What should be done if a polarity fault is discovered?",
      options: [
        "Ignore it if equipment works",
        "Add a warning label",
        "Correct the wiring immediately and retest before energising",
        "Reduce the voltage"
      ],
      correctAnswer: 2,
      explanation: "Polarity faults must be corrected immediately by re-terminating conductors correctly, followed by retesting before the circuit is energised."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring polarity is correct before energising?",
      options: [
        "Only the apprentice",
        "The building owner",
        "The qualified electrician carrying out the work",
        "The electrical supplier"
      ],
      correctAnswer: 2,
      explanation: "The qualified electrician carrying out the installation work is responsible for ensuring correct polarity before energising any circuit."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake caused the homeowner to receive a shock?",
      options: [
        "Wrong cable size was used",
        "The switch was wired into the neutral conductor",
        "No earth connection was made",
        "The circuit breaker was faulty"
      ],
      correctAnswer: 1,
      explanation: "The switch was incorrectly wired into the neutral conductor, leaving the lamp holder live even when switched off, causing a shock when changing the bulb."
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
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
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
              <span className="text-white/60">Section 2.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Incorrect Polarity
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Understanding polarity faults, risks, testing and correction in electrical installations
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-white/80">
              <div>
                <h3 className="font-medium text-white mb-2">Spot it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Equipment works but can shock when switched off</li>
                  <li>Unusual meter readings during testing</li>
                  <li>Switch in neutral instead of line conductor</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Use it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Two-pole voltage indicator and proving unit</li>
                  <li>Plug-in polarity tester for sockets</li>
                  <li>Continuity testing to verify connections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Define what incorrect polarity means in electrical installations</li>
              <li>Identify how polarity faults occur</li>
              <li>Recognise the dangers associated with incorrect polarity</li>
              <li>Understand how polarity faults are tested and corrected</li>
            </ul>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Definition of Incorrect Polarity
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Polarity refers to the correct connection of line, neutral, and earth conductors in a circuit. Incorrect polarity occurs when line and neutral are swapped, or when a protective or switching device is connected in the wrong conductor. A common example is a light switch wired into the neutral conductor instead of the line.</p>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                <h3 className="font-medium text-blue-400 mb-2">Key Polarity Requirements:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Single-pole switches and protective devices must be in the line conductor</li>
                  <li>• Edison screw lampholders must have the centre contact connected to line</li>
                  <li>• Socket outlets must have line connected to the correct terminal</li>
                  <li>• All protective and switching devices must interrupt the line conductor</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-medium text-red-400 mb-2">Critical Safety Point:</h3>
                <p className="text-sm">
                  With incorrect polarity, equipment may function normally but remain live when switched off, creating unexpected shock hazards during maintenance or bulb changes.
                </p>
              </div>

              <InlineCheck
                id="polarity-definition"
                question="What does incorrect polarity mean in an electrical circuit?"
                options={[
                  "The voltage is too high for the circuit",
                  "Line and neutral conductors are reversed or devices connected in wrong conductor",
                  "There is no earth connection present",
                  "The current is flowing in the wrong direction"
                ]}
                correctIndex={1}
                explanation="Incorrect polarity occurs when line and neutral are swapped, or when switching/protective devices are connected in the wrong conductor."
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Causes of Polarity Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Polarity faults are usually the result of human error during installation. Understanding these causes helps prevent future occurrences:</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2">Installation Errors:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Misidentification of conductors</li>
                    <li>• Careless or rushed wiring</li>
                    <li>• Poor cable management</li>
                    <li>• Inadequate conductor marking</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Human Factors:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Poor training or supervision</li>
                    <li>• Time pressure on installations</li>
                    <li>• Reconnection errors during maintenance</li>
                    <li>• Lack of proper testing procedures</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="font-medium text-elec-yellow mb-2">Prevention Strategy:</h3>
                <p className="text-sm">
                  Always use a systematic approach: identify conductors correctly, follow wiring diagrams, apply proper labelling, and conduct thorough testing before energising.
                </p>
              </div>

              <InlineCheck
                id="polarity-causes"
                question="Give two common causes of incorrect polarity faults."
                options={[
                  "High voltage and excessive current flow",
                  "Misidentification of conductors and careless wiring",
                  "Too much insulation and poor earthing",
                  "Faulty circuit breakers and blown fuses"
                ]}
                correctIndex={1}
                explanation="The main causes are misidentification of conductors and careless or rushed wiring during installation or maintenance."
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Risks and Dangers of Incorrect Polarity
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Incorrect polarity is especially dangerous because the installation may still appear to work. However, the risks include:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Electric shock risk:</strong> A switched-off appliance may still have live components</li>
                <li><strong>Inoperative protective devices:</strong> Fuses and breakers may not disconnect the circuit correctly</li>
                <li><strong>Legal and compliance issues:</strong> BS 7671 requires correct polarity for all installations</li>
              </ul>

              <InlineCheck
                id="polarity-dangers"
                question="Why is incorrect polarity considered especially dangerous for users?"
                options={[
                  "It causes equipment to use more electricity",
                  "It makes protective devices trip frequently",
                  "Equipment may appear to work but remain live when switched off",
                  "It causes voltage fluctuations in the supply"
                ]}
                correctIndex={2}
                explanation="Incorrect polarity is dangerous because equipment may function normally but remain electrically live when switched off, creating unexpected shock risks."
              />
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Testing and Correction of Polarity Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Polarity is checked during initial verification and periodic inspection using continuity and functional tests. Multiple testing methods ensure comprehensive verification:</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Testing Methods:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Plug-in polarity testers for socket outlets</li>
                    <li>• Continuity testing with test meters</li>
                    <li>• Functional testing of switching</li>
                    <li>• Visual inspection of terminations</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                  <h3 className="font-medium text-indigo-400 mb-2">Correction Process:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Isolate the circuit safely</li>
                    <li>• Re-terminate conductors correctly</li>
                    <li>• Retest the circuit thoroughly</li>
                    <li>• Document the correction</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-medium text-red-400 mb-2">Important:</h3>
                <p className="text-sm">
                  Never energise a circuit with suspected polarity faults. All corrections must be verified through retesting before the installation can be considered safe for use.
                </p>
              </div>

              <InlineCheck
                id="polarity-testing"
                question="What type of test can be used to confirm polarity in socket outlets?"
                options={[
                  "Insulation resistance test",
                  "Plug-in polarity tester",
                  "Earth fault loop impedance test",
                  "RCD test"
                ]}
                correctIndex={1}
                explanation="A plug-in polarity tester is a simple and effective way to check that socket outlets are wired with correct polarity."
              />
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
                <li>Always double-check conductor identification before termination</li>
                <li>Test polarity during every new installation, alteration, or inspection</li>
                <li>Never energise a circuit until polarity has been confirmed correct</li>
                <li>Treat polarity faults as urgent — they are never acceptable under BS 7671</li>
              </ul>
            </div>
          </section>

          {/* Real-World Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Real-World Case Study: The Hidden Danger</h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2 text-sm">The Incident:</h3>
                  <p className="text-xs text-white/70">
                    During a domestic lighting installation, an apprentice electrician incorrectly wired a bedroom light switch into the neutral conductor instead of the line. The installation was completed and commissioned without proper polarity testing.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2 text-sm">What Happened:</h3>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Lights operated normally when switched on/off</li>
                    <li>• No immediate signs of fault detected</li>
                    <li>• Homeowner received shock while changing bulb</li>
                    <li>• Lamp holder remained live when "switched off"</li>
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <h3 className="font-medium text-blue-400 mb-2 text-sm">Investigation Revealed:</h3>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>• Switch wired in neutral conductor</li>
                      <li>• Line remained connected to lamp holder</li>
                      <li>• No polarity testing carried out</li>
                      <li>• Poor supervision during installation</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <h3 className="font-medium text-purple-400 mb-2 text-sm">Consequences:</h3>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>• Minor shock injury to homeowner</li>
                      <li>• Complete rewiring of lighting circuit</li>
                      <li>• Investigation by building control</li>
                      <li>• Professional reputation damage</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                  <h3 className="font-medium text-elec-yellow mb-2 text-sm">Critical Lessons Learned:</h3>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs text-white/70">
                    <ul className="space-y-1">
                      <li>• Always test polarity before energising</li>
                      <li>• Switches must be in the line conductor</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Proper supervision is essential</li>
                      <li>• Functional testing saves lives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: Can a circuit still work with incorrect polarity?</h3>
                <p className="text-sm text-white/70">A: Yes, but it will be unsafe, as equipment may remain live when switched off.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: How is polarity checked during testing?</h3>
                <p className="text-sm text-white/70">A: By continuity and functional tests to confirm correct line, neutral, and earth connections.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: Why must polarity faults always be corrected before energising?</h3>
                <p className="text-sm text-white/70">A: Because they create immediate shock hazards and make protective devices unreliable.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-gradient-to-r from-elec-yellow/10 to-indigo-500/10 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Essential Knowledge Recap</h2>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2">What is Incorrect Polarity?</h3>
                  <p className="text-xs text-white/70">
                    Line and neutral conductors swapped, or switches/protective devices connected in wrong conductor, creating hidden shock hazards.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2">Why It's Dangerous:</h3>
                  <p className="text-xs text-white/70">
                    Equipment functions normally but remains live when switched off, creating unexpected shock risks during maintenance.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2">Common Causes:</h3>
                  <p className="text-xs text-white/70">
                    Poor workmanship, misidentification of conductors, rushed installations, and inadequate supervision.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Prevention & Testing:</h3>
                  <p className="text-xs text-white/70">
                    Systematic conductor identification, proper testing procedures, and thorough verification before energising.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Key Takeaway for Professionals:</h3>
                <p className="text-xs text-white/70">
                  Incorrect polarity is a "silent killer" - installations appear to work correctly but create life-threatening shock hazards. BS 7671 compliance demands correct polarity, and thorough testing is the only way to ensure safety. Never compromise on polarity verification - lives depend on it.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Overload Protection
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-6">
                Next: Loose Connections
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_5;
