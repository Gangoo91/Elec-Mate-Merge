import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { useState } from "react";

const Module6Section4_1 = () => {
  useSEO(
    "Continuity of Protective Conductors (CPCs) - Level 2 Electrical Testing & Inspection",
    "Essential testing procedures for CPCs to ensure electrical safety and fault protection"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What does CPC stand for?",
      options: ["Circuit Phase Conductor", "Circuit Protective Conductor", "Central Protective Cable"],
      correctAnswer: 1,
      explanation: "CPC stands for Circuit Protective Conductor."
    },
    {
      id: 2,
      question: "Why is CPC continuity essential?",
      options: ["It ensures lighting circuits operate correctly", "It provides a path for fault current to earth", "It reduces energy consumption"],
      correctAnswer: 1,
      explanation: "CPC continuity provides a path for fault current to earth, enabling protective device operation."
    },
    {
      id: 3,
      question: "Which test confirms both line and CPC continuity?",
      options: ["r1 test", "R1+R2 test", "End-to-end test only"],
      correctAnswer: 1,
      explanation: "The R1+R2 test confirms both line and CPC continuity simultaneously."
    },
    {
      id: 4,
      question: "What instrument is commonly used for CPC continuity testing?",
      options: ["Clamp meter", "Multifunction tester", "Thermal camera"],
      correctAnswer: 1,
      explanation: "A multifunction tester with low-resistance ohmmeter function is used for CPC testing."
    },
    {
      id: 5,
      question: "What should you do before testing?",
      options: ["Connect the supply", "Prove dead and isolate circuit", "Record initial readings"],
      correctAnswer: 1,
      explanation: "Always prove dead and isolate the circuit before conducting CPC continuity tests."
    },
    {
      id: 6,
      question: "What does a high resistance value on the CPC indicate?",
      options: ["Good continuity", "Loose or broken connection", "Oversized conductor"],
      correctAnswer: 1,
      explanation: "High resistance indicates loose connections, breaks, or other faults in the CPC."
    },
    {
      id: 7,
      question: "What document requires CPC continuity testing?",
      options: ["EAWR 1989", "BS 7671 Wiring Regulations", "Health and Safety at Work Act"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations require CPC continuity testing as part of verification procedures."
    },
    {
      id: 8,
      question: "In an R1+R2 test, what is linked together at the distribution board?",
      options: ["CPC and neutral", "Line and CPC", "Neutral and line"],
      correctAnswer: 1,
      explanation: "In an R1+R2 test, the line conductor and CPC are linked together at the distribution board."
    },
    {
      id: 9,
      question: "Why should test instruments be zeroed before testing?",
      options: ["To confirm earth fault loop impedance", "To remove lead resistance from results", "To protect the tester"],
      correctAnswer: 1,
      explanation: "Zeroing removes the resistance of test leads from the final results, ensuring accuracy."
    },
    {
      id: 10,
      question: "What is the main danger of a CPC not being continuous?",
      options: ["Circuit overload", "Risk of electric shock from exposed metalwork", "Poor lighting levels"],
      correctAnswer: 1,
      explanation: "A discontinuous CPC can result in exposed metalwork becoming live during fault conditions, creating a serious shock risk."
    }
  ];

  const faqs = [
    {
      question: "Do I need to test CPC continuity if the wiring is new?",
      answer: "Yes, all new installations require verification before being energised. New installations are no exception - testing verifies that installation work has been completed correctly."
    },
    {
      question: "What if my CPC readings vary slightly across sockets?",
      answer: "Small variations are normal due to differences in conductor length, but large discrepancies indicate a fault. Variations should be proportional to cable length and within expected ranges."
    },
    {
      question: "Is visual inspection enough?",
      answer: "No, physical testing is required to confirm electrical continuity. Visual inspection alone cannot detect high-resistance connections or internal cable damage."
    },
    {
      question: "How do I know if my readings are acceptable?",
      answer: "Compare results to design values or tables in BS 7671. Readings should be low and consistent with conductor size and length. Any sudden increases indicate potential faults."
    },
    {
      question: "What's the difference between end-to-end and R1+R2 testing?",
      answer: "End-to-end tests only the CPC, while R1+R2 tests both line and CPC simultaneously. R1+R2 is more comprehensive and commonly used in verification testing."
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
              Back to Section 6.4
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.4.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Continuity of Protective Conductors (CPCs)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential testing procedures for CPCs to ensure electrical safety and fault protection
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Quick Summary</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>CPC provides fault current path to earth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Test using low-resistance ohmmeter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>R1+R2 test confirms both line and CPC</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Always isolate circuit before testing</span>
              </li>
            </ul>
          </div>

          {/* Section 1: Purpose and Importance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Purpose and Importance of CPC Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The protective conductor, often referred to as the CPC (Circuit Protective Conductor), is essential in ensuring safety in electrical installations. It provides a low-resistance path for fault currents, ensuring protective devices operate quickly and safely.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Safety Protection</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Provides low-resistance path for fault currents to earth (typically less than 1.67 ohms for domestic circuits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Ensures protective devices (MCBs, RCDs) operate within required disconnection times (0.4s for socket circuits, 5s for fixed equipment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Prevents dangerous voltages appearing on exposed metalwork during fault conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Enables automatic disconnection of supply (ADS) - the primary method of protection in TN and TT systems</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Regulatory Compliance</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>BS 7671:2018+A2:2022 Section 612.2 requires verification of protective conductor continuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Part P Building Regulations compliance for notifiable work in domestic installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Electricity at Work Regulations 1989 - Regulation 4 requires precautions against danger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>IET Guidance Note 3 provides detailed testing procedures and acceptable values</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cpc-purpose-check"
            question="What is the primary purpose of CPC continuity testing?"
            options={["To measure power consumption", "To ensure protective devices operate during faults", "To check cable insulation", "To measure voltage drop"]}
            correctIndex={1}
            explanation="CPC continuity testing ensures protective devices can operate correctly during fault conditions by providing a low-resistance path to earth."
          />

          {/* Section 2: Testing Methods */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Testing Methods and Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">R1 + R2 Method (Recommended for New Installations)</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Link line and CPC at distribution board using temporary fly lead (typically 4mm² or appropriate size)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Measure resistance between line and CPC at each outlet point using low resistance ohmmeter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Tests both line conductor and CPC continuity simultaneously in one measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Results directly relate to fault loop impedance calculations (Zs = Ze + R1 + R2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Typical acceptable values: 0.05-2.0 ohms depending on conductor size and circuit length</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Step-by-Step Testing Procedure</h3>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">1.</span>
                    <span>Isolate circuit completely at consumer unit/distribution board and prove dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">2.</span>
                    <span>Remove or disconnect any electronic equipment (dimmers, timers, smoke detectors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">3.</span>
                    <span>Zero the ohmmeter using short test leads (typically 0.01-0.02 ohms lead resistance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">4.</span>
                    <span>For R1+R2: link line and CPC at board, measure at each outlet L-E terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">5.</span>
                    <span>Record results on appropriate test certificate (EIC, EICR, or Minor Works)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">6.</span>
                    <span>Compare results to expected values based on conductor specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">7.</span>
                    <span>Investigate any unusually high readings or unexpected variations</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cpc-methods-check"
            question="What does scorching around electrical accessories typically indicate?"
            options={["Normal ageing", "Overheating due to loose connections or overloading", "Recent cleaning", "High-quality installation"]}
            correctIndex={1}
            explanation="Scorching indicates overheating due to loose connections or overloading, which requires immediate investigation and rectification."
          />

          {/* Section 3: Interpretation of Results */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Interpretation of Results
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Acceptable Values and Limits</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Typical domestic socket circuit (32A, 4mm²): R1+R2 should be 0.2-1.2 ohms depending on length</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Lighting circuits (6A, 1.5mm²): R1+R2 typically 0.5-3.0 ohms for reasonable cable runs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Cooker circuits (32A, 6mm²): R1+R2 should be 0.15-0.8 ohms for typical installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Values must ensure maximum disconnection times are met (0.4s for TN systems)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-medium text-white mb-3">Fault Indicators</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Infinite resistance (open circuit) indicates broken or disconnected CPC - immediate safety concern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Unexpectedly high resistance suggests loose connections, corroded joints, or undersized conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Significantly different values at similar distances indicate installation faults or cable damage</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Example: Kitchen Ring Circuit
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-medium text-white mb-3">Scenario</h3>
              <p className="text-sm text-white/80 mb-4">
                You are testing a newly installed kitchen ring circuit (32A MCB, 2.5mm² twin and earth cable) that serves 6 double socket outlets. Total cable length is approximately 45 metres.
              </p>

              <h4 className="font-medium text-white mb-2">Test Results</h4>
              <div className="bg-[#121212] rounded p-3 mb-4">
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Socket 1 (nearest): 0.28Ω</li>
                  <li>Socket 2: 0.45Ω</li>
                  <li>Socket 3: 0.62Ω</li>
                  <li>Socket 4: 0.58Ω</li>
                  <li>Socket 5: 0.41Ω</li>
                  <li>Socket 6 (furthest): 0.31Ω</li>
                </ul>
              </div>

              <h4 className="font-medium text-white mb-2">Analysis</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>All readings acceptably low (under 1Ω) indicating good continuity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Sockets 1 and 6 show similar low values, confirming ring is complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Maximum reading (0.62Ω) well within limits for 32A protection</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-white/70">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Key Takeaways</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>CPC continuity ensures earth fault protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test using a low-resistance ohmmeter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>R1+R2 confirms both line and CPC continuity</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Zero instruments before every test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>High resistance = potential fault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Visual inspection is never enough</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Section Overview
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                Continue to 4.2
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section4_1;
