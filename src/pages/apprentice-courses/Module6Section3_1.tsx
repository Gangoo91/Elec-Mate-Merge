import { ArrowLeft, Zap, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_1 = () => {
  useSEO(
    "Introduction to Test Instruments - Level 2 Electrical Installation",
    "Multimeter, IR tester, and continuity tester fundamentals for electrical testing"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which instrument measures AC and DC voltage?",
      options: ["Continuity tester", "IR tester", "Multimeter", "Insulation tester"],
      correctAnswer: 2,
      explanation: "A multimeter is designed to measure AC and DC voltage, along with current and resistance."
    },
    {
      id: 2,
      question: "What unit is insulation resistance measured in?",
      options: ["Ohms", "Megaohms", "Volts", "Amperes"],
      correctAnswer: 1,
      explanation: "Insulation resistance is measured in megaohms (MΩ) due to the high resistance values involved."
    },
    {
      id: 3,
      question: "Before using an IR tester, what must you do?",
      options: ["Switch circuit on", "Disconnect and isolate circuit", "Reduce test voltage", "Connect all equipment"],
      correctAnswer: 1,
      explanation: "The circuit must be disconnected and isolated before IR testing to prevent damage to equipment and ensure safety."
    },
    {
      id: 4,
      question: "A continuity test shows 0 Ω. What does this mean?",
      options: ["Circuit is broken", "Good continuity", "High resistance fault", "Insulation failure"],
      correctAnswer: 1,
      explanation: "A reading of 0 Ω (or very close to 0) indicates good continuity with no breaks in the circuit."
    },
    {
      id: 5,
      question: "What is the typical insulation resistance value required by BS 7671 for new installations?",
      options: ["0.5 MΩ", "1 MΩ", "10 MΩ", "100 MΩ"],
      correctAnswer: 1,
      explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for new installations."
    },
    {
      id: 6,
      question: "Why should instruments comply with GS38?",
      options: ["To save battery life", "To ensure safety", "To improve insulation resistance", "To reduce testing time"],
      correctAnswer: 1,
      explanation: "GS38 compliance ensures safety through requirements like shrouded probes and fused leads."
    },
    {
      id: 7,
      question: "Which instrument is used to verify polarity at a socket outlet?",
      options: ["Multimeter", "Continuity tester", "IR tester", "Earth loop tester"],
      correctAnswer: 0,
      explanation: "A multimeter can measure voltage and verify polarity at socket outlets."
    },
    {
      id: 8,
      question: "What happens if you fail to zero a continuity tester?",
      options: ["Nothing changes", "Results will include lead resistance", "The tester will not work", "Battery life is reduced"],
      correctAnswer: 1,
      explanation: "Failing to zero the continuity tester means the lead resistance will be included in the results, affecting accuracy."
    },
    {
      id: 9,
      question: "Which test instrument applies high DC voltage to a circuit?",
      options: ["Continuity tester", "Multimeter", "Insulation resistance tester", "Current clamp"],
      correctAnswer: 2,
      explanation: "The insulation resistance tester applies high DC voltage (250V, 500V, or 1000V) to test insulation quality."
    },
    {
      id: 10,
      question: "Why is it important to use the correct range on a multimeter?",
      options: ["To make the numbers look smaller", "To protect the meter and get accurate readings", "To avoid checking resistance", "To save battery power"],
      correctAnswer: 1,
      explanation: "Using the correct range protects the meter from damage and ensures accurate, readable measurements."
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
              Back to Section 6.3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.3.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Introduction to Test Instruments
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Multimeter, IR tester, and continuity tester fundamentals for electrical testing
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-lg font-semibold text-white">Spot it in 30 Seconds</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
              <div>
                <p className="font-medium text-white mb-2">Key Points</p>
                <ul className="space-y-1.5">
                  <li>• Instrument selection: right tool for the test</li>
                  <li>• GS38 compliance: shrouded probes, fused leads</li>
                  <li>• Range setting: appropriate measurement range</li>
                  <li>• Safety procedures: isolation, disconnection, PPE</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Spot / Use / Check</p>
                <ul className="space-y-1.5">
                  <li><strong>Spot:</strong> Wrong instrument, non-compliant probes</li>
                  <li><strong>Use:</strong> Multimeter for voltage; IR tester for insulation</li>
                  <li><strong>Check:</strong> Calibration certificates; GS38 markings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical installation work relies on precise measurement and verification to ensure systems are safe, compliant, and functional. Test instruments are the foundation of this process, enabling electricians to check voltage, resistance, insulation quality, and continuity of circuits.
              </p>
              <p>
                In this subsection, we will introduce three key instruments: the Multimeter, Insulation Resistance (IR) Tester, and the Continuity Tester. These tools form the basis of electrical testing for apprentices and practicing electricians.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you will be able to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Describe the purpose of a multimeter, IR tester, and continuity tester.</li>
              <li>Identify the main parts and functions of each instrument.</li>
              <li>Understand when to use each tool during installation and testing.</li>
              <li>Recognise the safety precautions associated with these instruments.</li>
              <li>Perform basic setup and use of the instruments with confidence.</li>
            </ul>
          </section>

          {/* Multimeter */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Multimeter
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The multimeter is the most versatile electrical test instrument, capable of measuring multiple electrical parameters essential for installation and maintenance work.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-white mb-3">Primary Purpose</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Measures voltage (AC and DC) for live/dead circuit verification</li>
                  <li>• Checks resistance of conductors and components</li>
                  <li>• Measures current flow in electrical circuits</li>
                  <li>• Verifies polarity and phase relationships</li>
                  <li>• Provides basic electrical fault diagnosis capabilities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <h3 className="font-semibold text-white mb-3">Types and Features</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Digital Multimeter (DMM) – preferred for accuracy</li>
                  <li>• Analogue Multimeter – useful for trending measurements</li>
                  <li>• True RMS capability for accurate AC measurements</li>
                  <li>• Auto-ranging function for simplified operation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="font-medium text-amber-400 mb-2">Critical Limitation</p>
                <p className="text-sm">
                  Multimeters are NOT suitable for insulation resistance checks as they cannot apply the high voltages (250V-1000V) required for proper insulation testing. Maximum test voltage is typically only 3-9V DC.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="multimeter-check"
            question="What instrument would you use to measure current in a live circuit?"
            options={["Continuity tester", "IR tester", "Multimeter", "Insulation tester"]}
            correctIndex={2}
            explanation="A multimeter is the appropriate instrument for measuring current in live circuits, with proper safety precautions."
          />

          {/* IR Tester */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Insulation Resistance (IR) Tester
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The IR tester is a specialised instrument designed to assess the quality and integrity of electrical insulation by applying high DC voltage and measuring the resulting resistance.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <h3 className="font-semibold text-white mb-3">Operating Principle</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Applies high DC voltage (typically 250V, 500V, or 1000V)</li>
                  <li>• Measures resulting current flow through insulation</li>
                  <li>• Good insulation produces minimal current flow (high MΩ)</li>
                  <li>• Test voltage selection based on circuit nominal voltage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-white mb-3">Test Voltage Selection</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• 250V DC: For circuits up to 50V (ELV)</li>
                  <li>• 500V DC: For circuits between 50V and 500V</li>
                  <li>• 1000V DC: For circuits between 500V and 1000V</li>
                  <li>• BS 7671 minimum: 1 MΩ for new installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2">Critical Safety Protocol</p>
                <p className="text-sm">
                  Always ensure complete circuit isolation before IR testing. Remove all electronic equipment, LED lamps, RCD devices, and surge protectors. High test voltages WILL damage sensitive equipment.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-tester-check"
            question="What does a reading of 0.1 Ω on a continuity tester indicate?"
            options={["Circuit is broken", "Good continuity - very low resistance", "High resistance fault", "Insulation failure"]}
            correctIndex={1}
            explanation="A reading of 0.1 Ω indicates very good continuity with minimal resistance in the circuit path."
          />

          {/* Continuity Tester */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Continuity Tester
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The continuity tester verifies that electrical conductors form complete, unbroken paths with minimal resistance, essential for proper circuit operation and safety systems.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-white mb-3">Operating Method</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Passes small, safe DC current (typically 200mA max)</li>
                  <li>• Measures and displays total resistance of the path</li>
                  <li>• Four-wire measurement eliminates lead resistance errors</li>
                  <li>• Low resistance readings confirm good continuity</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <h3 className="font-semibold text-white mb-3">Essential Applications</h3>
                <ul className="text-sm space-y-1.5">
                  <li>• Ring final circuit testing: R1+R2 method</li>
                  <li>• Protective conductor testing: earthing integrity</li>
                  <li>• Equipotential bonding verification</li>
                  <li>• Cable fault location</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-2">Calibration and Accuracy</p>
                <p className="text-sm">
                  Always zero the continuity tester before each series of measurements to eliminate lead resistance. Use short, low-resistance test leads and maintain good contact pressure for accurate results.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-safety-check"
            question="Why must sensitive equipment be disconnected before using an IR tester?"
            options={["To save battery", "High voltage can damage sensitive equipment", "To get faster results", "To reduce test time"]}
            correctIndex={1}
            explanation="IR testers apply high DC voltages (250V-1000V) that can damage sensitive electronic equipment, so it must be disconnected before testing."
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-white mb-3">Core Testing Procedures</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li>• Always confirm instruments are GS38 compliant</li>
                  <li>• Check calibration certificates before use</li>
                  <li>• For multimeters: start on highest range, then step down</li>
                  <li>• For IR testers: ensure all sensitive equipment is disconnected</li>
                  <li>• For continuity testers: zero the instrument before testing</li>
                  <li>• Always use appropriate PPE and follow safe isolation procedures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <h3 className="font-semibold text-amber-400 mb-2">Safety Critical Reminders</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li>• Never exceed instrument CAT ratings</li>
                  <li>• Always verify instrument functionality with known sources</li>
                  <li>• IR testing can charge cables - discharge safely after testing</li>
                  <li>• Battery condition is critical for accuracy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-white/80 mb-4">
                An apprentice electrician is asked to test a ring final circuit in a new domestic property. First, they use a continuity tester to verify the ring is complete by measuring R1+R2 from the consumer unit to each socket. They then use the IR tester to confirm insulation resistance exceeds 1 MΩ at 500V DC. Finally, they use a multimeter to check voltage at each socket outlet, verifying 230V ±10% and correct polarity before handover.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-white/5 rounded border-l-2 border-amber-500/50">
                  <p className="font-medium text-white mb-1">Continuity Testing</p>
                  <p className="text-xs text-white/70">Verified ring integrity using R1+R2 method</p>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-2 border-amber-500/50">
                  <p className="font-medium text-white mb-1">Insulation Testing</p>
                  <p className="text-xs text-white/70">Confirmed &gt;1 MΩ using 500V DC</p>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-2 border-amber-500/50">
                  <p className="font-medium text-white mb-1">Final Verification</p>
                  <p className="text-xs text-white/70">Voltage and polarity confirmed</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Q: Can a multimeter test insulation resistance?</p>
                <p className="text-sm text-white/80">A: No. A dedicated insulation resistance tester must be used as multimeters cannot apply the high voltages required.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Q: Why do we zero a continuity tester?</p>
                <p className="text-sm text-white/80">A: To eliminate lead resistance and ensure accurate results by compensating for the resistance of the test leads themselves.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Q: What's the difference between a continuity tester and a multimeter?</p>
                <p className="text-sm text-white/80">A: A continuity tester is specialised for checking unbroken circuits, while a multimeter has broader applications including voltage, resistance, and current measurements.</p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide – Test Instruments</h2>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span className="text-white/90">Multimeter = Voltage, current, resistance.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span className="text-white/90">IR Tester = Insulation resistance (MΩ).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span className="text-white/90">Continuity Tester = Unbroken circuits, bonding, earthing.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span className="text-white/90">Always check calibration and compliance before use.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Zap className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Multimeter</p>
                <p className="text-xs text-white/60">Voltage, current, resistance</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">IR Testing</p>
                <p className="text-xs text-white/60">Insulation quality</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <FileText className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Continuity</p>
                <p className="text-xs text-white/60">Circuit paths</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">GS38</p>
                <p className="text-xs text-white/60">Safety compliance</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="font-medium text-white text-sm">Selection</p>
                <p className="text-xs text-white/60">Right tool for job</p>
              </div>
            </div>
            <p className="text-white/80">
              Multimeters measure voltage, current, and resistance. Insulation Resistance Testers measure insulation quality using high DC voltage. Continuity Testers confirm unbroken paths in circuits. Correct tool selection ensures accuracy, safety, and compliance.
            </p>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Section 6.3.1 Knowledge Check" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section Overview
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                Next: GS38 Compliance
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section3_1;
