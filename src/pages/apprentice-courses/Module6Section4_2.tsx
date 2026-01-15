import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { useState } from "react";

const Module6Section4_2 = () => {
  useSEO(
    "Continuity of Ring Circuits - Level 2 Electrical Testing & Inspection",
    "Essential testing procedures for ring final circuits to ensure proper ring integrity and safety"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum rating for ring final circuits in domestic installations?",
      options: ["20A", "32A", "40A"],
      correctAnswer: 1,
      explanation: "Ring final circuits are typically protected by 32A MCBs or RCBOs in domestic installations."
    },
    {
      id: 2,
      question: "What cable size is standard for ring final circuits?",
      options: ["1.5mm²", "2.5mm²", "4mm²"],
      correctAnswer: 1,
      explanation: "2.5mm² twin and earth cable is standard for 32A ring final circuits."
    },
    {
      id: 3,
      question: "How many paths does current have in a properly functioning ring circuit?",
      options: ["One", "Two", "Three"],
      correctAnswer: 1,
      explanation: "In a ring circuit, current has two paths to reach any point, sharing the load between both legs."
    },
    {
      id: 4,
      question: "What test confirms both legs of a ring are complete?",
      options: ["Voltage test", "End-to-end resistance test", "Insulation test"],
      correctAnswer: 1,
      explanation: "End-to-end resistance testing confirms both legs of the ring are complete and properly connected."
    },
    {
      id: 5,
      question: "What happens if one leg of a ring circuit is broken?",
      options: ["Circuit stops working", "Becomes overloaded radial", "Works more efficiently"],
      correctAnswer: 1,
      explanation: "A broken ring becomes an overloaded radial circuit, potentially causing overheating and safety hazards."
    },
    {
      id: 6,
      question: "What should you do before testing ring continuity?",
      options: ["Test with power on", "Isolate and prove dead", "Check with customers"],
      correctAnswer: 1,
      explanation: "Always isolate the circuit and prove dead before conducting any continuity tests."
    },
    {
      id: 7,
      question: "What document requires ring continuity verification?",
      options: ["EAWR 1989", "BS 7671", "Company policy"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations require verification of ring continuity as part of testing procedures."
    },
    {
      id: 8,
      question: "How should ring circuit readings compare between legs?",
      options: ["Identical", "Approximately equal", "Significantly different"],
      correctAnswer: 1,
      explanation: "Ring circuit legs should show approximately equal resistance values, indicating balanced construction."
    },
    {
      id: 9,
      question: "What could cause unusually high resistance in one leg?",
      options: ["Normal variation", "Loose connections or damage", "Good installation"],
      correctAnswer: 1,
      explanation: "High resistance indicates loose connections, cable damage, or poor terminations requiring investigation."
    },
    {
      id: 10,
      question: "Why is ring continuity testing critical for safety?",
      options: ["Reduces energy bills", "Prevents circuit overloading", "Improves lighting"],
      correctAnswer: 1,
      explanation: "Ring continuity testing prevents dangerous overloading that could cause fires and electrical hazards."
    }
  ];

  const faqs = [
    {
      question: "How often should ring circuits be tested?",
      answer: "Ring circuits should be tested during initial installation, at periodic inspections (typically every 10 years for domestic), and whenever modifications are made. Any signs of problems require immediate testing."
    },
    {
      question: "Can I tell if a ring is broken just by looking?",
      answer: "No, visual inspection cannot determine ring integrity. You need proper electrical testing with calibrated instruments to confirm both legs are complete and have correct resistance values."
    },
    {
      question: "What if my ring test shows unequal resistance values?",
      answer: "Slight variations are normal due to cable routing differences, but significant discrepancies indicate faults. Investigate loose connections, cable damage, or incorrect installation methods."
    },
    {
      question: "Do I need special qualifications to test ring circuits?",
      answer: "Yes, ring circuit testing requires appropriate electrical qualifications and competency. This is typically part of 18th Edition, inspection and testing courses, and relevant NVQ qualifications."
    },
    {
      question: "What should I do if I find a broken ring?",
      answer: "A broken ring is a serious safety issue. Isolate the circuit immediately, investigate the cause, repair the break, and retest before re-energising. Consider whether an EICR code is required."
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
              <span className="text-white/60">Section 6.4.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Continuity of Ring Circuits
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential testing procedures for ring final circuits to ensure proper ring integrity and safety
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Quick Summary</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Ring circuits must form complete loops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Test using end-to-end resistance method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Both legs should show similar resistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Broken rings become dangerous radials</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed mb-4">
              Ring final circuits are a unique UK wiring method where cables form a complete loop or 'ring' from the distribution board, around the circuit, and back to the board. This configuration allows current to flow through two paths, reducing voltage drop and enabling higher load capacity with smaller cable sizes.
            </p>
            <p className="text-white/80 leading-relaxed">
              Testing ring continuity is absolutely critical because a broken ring becomes an overloaded radial circuit, potentially causing dangerous overheating, cable damage, and fire risks.
            </p>
          </section>

          {/* Section 1: Ring Circuit Fundamentals */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Ring Circuit Fundamentals and Safety Importance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Ring Circuit Design Principles</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Cable forms complete loop from consumer unit outward terminals back to consumer unit return terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Current divides between two paths, reducing load on each cable leg by approximately 50%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Enables 32A protection with 2.5mm² cable (normally rated 27A as radial)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Reduces voltage drop across circuit by providing parallel current paths</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-white mb-3">Critical Safety Implications</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Broken ring becomes radial circuit carrying full load through single cable path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>2.5mm² cable carrying 32A load will overheat rapidly - cable rating exceeded by 18%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Overheating causes insulation degradation leading to fire risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>MCB may not protect adequately as current still below 32A trip point</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Regulatory Requirements</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>BS 7671:2018+A2:2022 Section 612.2.2 mandates ring continuity verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Appendix 15 provides specific guidance on ring circuit design and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>EICR Code C1 (Danger Present) applies to broken rings requiring immediate action</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ring-fundamentals-check"
            question="What happens when a ring circuit is broken and operates as a radial?"
            options={["Works more efficiently", "Becomes overloaded and dangerous", "Saves energy", "Improves voltage regulation"]}
            correctIndex={1}
            explanation="A broken ring becomes an overloaded radial circuit where the remaining cable carries the full load, causing dangerous overheating."
          />

          {/* Section 2: Testing Methods */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Ring Continuity Testing Methods
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">End-to-End Continuity Testing (Primary Method)</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Disconnect both line conductors at consumer unit and measure resistance between them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Repeat for neutral conductors - should give similar reading to line measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test CPC (earth) conductors separately - typically higher reading due to smaller CSA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Typical values for 2.5mm² ring: Line and Neutral ≈ 1.2Ω, CPC ≈ 1.9Ω (depends on length)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Reading of infinity (OL) indicates broken ring requiring immediate investigation</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Step-by-Step Testing Procedure</h3>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">1.</span>
                    <span>Isolate ring circuit at consumer unit and prove dead using GS38 voltage indicator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">2.</span>
                    <span>Identify outgoing and return legs of ring circuit at consumer unit terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">3.</span>
                    <span>Zero low-resistance ohmmeter using test leads (note lead resistance typically 0.01-0.02Ω)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">4.</span>
                    <span>Disconnect both line conductors and measure end-to-end resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">5.</span>
                    <span>Repeat for neutral conductors - values should be similar to line reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">6.</span>
                    <span>Test CPC conductors separately - expect higher reading due to smaller CSA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-medium">7.</span>
                    <span>Record all readings and compare to expected values for cable type and length</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ring-testing-check"
            question="What would an infinite resistance reading during end-to-end testing indicate?"
            options={["Perfect ring", "Broken ring circuit", "High quality cable", "Normal result"]}
            correctIndex={1}
            explanation="An infinite resistance reading indicates a broken ring circuit, which is a serious safety hazard requiring immediate investigation and repair."
          />

          {/* Section 3: Result Interpretation */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Result Interpretation and Fault Diagnosis
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Expected Values and Acceptance Criteria</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>2.5mm² copper ring (30m each leg): Line/Neutral ≈ 1.2Ω, CPC (1.5mm²) ≈ 1.9Ω</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>4mm² copper ring (40m each leg): Line/Neutral ≈ 0.9Ω, CPC (1.5mm²) ≈ 2.5Ω</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Readings should be consistent between line and neutral conductors (±10% variation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>CPC reading higher due to smaller cross-sectional area (typically 1.5mm² vs 2.5mm²)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-medium text-white mb-3">Common Fault Indicators</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Infinite resistance (OL): Complete break in ring - check all terminations and cable joints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Very high resistance (&gt;5Ω): Poor connections, loose terminals, or corroded joints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Unequal leg readings: Different cable sizes, poor connections, or partial damage</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Safety Assessment and EICR Codes</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">C1</span>
                    <span>Complete ring break: Danger Present - immediate disconnection required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">C2</span>
                    <span>High resistance connections: Potentially Dangerous - urgent remedial work needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">C3</span>
                    <span>Minor variations within limits: Improvement Recommended - monitor and review</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Example: Kitchen Ring Circuit Testing
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-medium text-white mb-3">Scenario</h3>
              <p className="text-sm text-white/80 mb-4">
                You're testing a kitchen ring circuit during a periodic inspection. The circuit is protected by a 32A MCB and serves 8 double socket outlets. Recent electrical work was carried out to install a new socket behind the fridge. The homeowner reports occasional tripping when multiple appliances are used.
              </p>

              <h4 className="font-medium text-white mb-2">Test Results</h4>
              <div className="bg-[#121212] rounded p-3 mb-4">
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Line conductors: ∞ (Open Circuit)</li>
                  <li>Neutral conductors: ∞ (Open Circuit)</li>
                  <li>CPC conductors: 1.8Ω (Normal)</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 mb-4">
                <p className="text-sm text-white/80">
                  <strong className="text-red-400">Critical Finding:</strong> Ring circuit is broken - line and neutral showing infinite resistance. Investigation revealed the ring was not properly restored at the new socket installation.
                </p>
              </div>

              <h4 className="font-medium text-white mb-2">Resolution</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Circuit isolated and locked off with clear labelling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Proper ring circuit restoration at new socket location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Retest: Line: 1.1Ω, Neutral: 1.1Ω, CPC: 1.8Ω - all acceptable</span>
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
                    <span>Ring circuits must form complete loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test using end-to-end resistance method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Both legs should show similar resistance</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Infinite resistance = broken ring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test line, neutral, and earth separately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Safety is paramount - isolate if in doubt</span>
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
              <Link to="../4-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: 4.1
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Section Overview
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section4_2;
