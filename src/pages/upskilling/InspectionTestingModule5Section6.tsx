import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section6 = () => {
  useSEO({
    title: "EFLI Testing of RCD-Protected Circuits | Inspection & Testing",
    description: "Special considerations for earth fault loop testing on circuits protected by RCDs."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Standard Zs testing may trip RCDs - use no-trip mode or alternative methods",
    "Even with RCD protection, Zs must still be low enough for overcurrent device operation",
    "RCDs provide fast 0.4s disconnection regardless of Zs (if faults exceed trip current)"
  ];

  const learningOutcomes = [
    { title: "RCD Interference", desc: "Why RCDs trip during testing" },
    { title: "No-Trip Testing", desc: "Use instrument features" },
    { title: "Alternative Methods", desc: "Calculation from Ze + R1+R2" },
    { title: "Zs Requirements", desc: "What limits still apply" },
    { title: "Practical Solutions", desc: "Work around RCD tripping" },
    { title: "Documentation", desc: "Record RCD circuit tests" }
  ];

  const faqs = [
    {
      q: "Why do RCDs trip during Zs testing?",
      a: "Standard Zs testers create a deliberate imbalance between line and neutral by routing test current through earth. RCDs are designed to detect exactly this condition and trip - it's doing its job."
    },
    {
      q: "What is no-trip Zs testing?",
      a: "No-trip testers inject balanced test currents that don't create net earth leakage, avoiding RCD operation. The test measures impedance without triggering the RCD's protection function."
    },
    {
      q: "Is Zs testing required if there's an RCD?",
      a: "Yes. The RCD provides fast disconnection for earth faults, but Zs must still allow the overcurrent device (MCB) to operate for sustained or high-current faults. Zs should meet at least 5s requirements."
    },
    {
      q: "Can I just calculate Zs instead of measuring?",
      a: "Yes. Measure Ze at the origin (upstream of RCD) and R1+R2 on the circuit (dead test). Calculate: Zs = Ze + (R1+R2 × 1.2). This avoids RCD interference entirely."
    },
    {
      q: "What if my instrument doesn't have no-trip mode?",
      a: "Options: use calculation method (Ze + R1+R2), briefly bypass the RCD (only with appropriate authorisation and precautions), or use a 2-wire L-N test (measures loop but not via earth)."
    },
    {
      q: "Do RCDs guarantee 0.4s protection?",
      a: "For faults above their rated current (typically 30mA), yes - RCDs trip within 40ms (0.04s). But very low earth faults below 30mA won't trip the RCD, so the overcurrent device must still provide protection."
    }
  ];

  const quizQuestions = [
    {
      question: "Standard Zs testing may trip RCDs because:",
      options: [
        "The test voltage is too high",
        "The test creates earth leakage current",
        "The RCD is faulty",
        "The circuit is overloaded"
      ],
      correctIndex: 1,
      explanation: "Zs testing routes current through earth, creating the imbalance RCDs are designed to detect."
    },
    {
      question: "No-trip Zs testing works by:",
      options: [
        "Using higher voltage",
        "Using balanced currents that don't create net leakage",
        "Bypassing the RCD",
        "Testing only line-neutral"
      ],
      correctIndex: 1,
      explanation: "No-trip mode uses balanced test currents that don't create net earth leakage, avoiding RCD operation."
    },
    {
      question: "On RCD-protected circuits, Zs must still:",
      options: [
        "Not be tested at all",
        "Meet requirements for overcurrent device operation",
        "Be exactly 0Ω",
        "Exceed 10Ω"
      ],
      correctIndex: 1,
      explanation: "Zs must allow the overcurrent device (MCB) to operate for sustained faults. RCDs handle fast earth fault disconnection."
    },
    {
      question: "The calculation method for Zs is:",
      options: [
        "Zs = Ze - R1+R2",
        "Zs = Ze + (R1+R2 × 1.2)",
        "Zs = Ze × R1+R2",
        "Zs = R1+R2 only"
      ],
      correctIndex: 1,
      explanation: "Zs = Ze + (R1+R2 × 1.2). Measure Ze at origin, R1+R2 on circuit, multiply by temperature factor."
    },
    {
      question: "With RCD protection, which disconnection time applies?",
      options: [
        "0.4s from overcurrent device",
        "0.4s from RCD operation",
        "5s from RCD",
        "No time limit"
      ],
      correctIndex: 1,
      explanation: "The RCD provides 0.4s (actually faster - 40ms typical) disconnection for earth faults above its rating."
    },
    {
      question: "If using calculation method, Ze is measured:",
      options: [
        "At the furthest point",
        "At the origin, upstream of RCDs",
        "At each socket",
        "After the RCD"
      ],
      correctIndex: 1,
      explanation: "Ze is measured at the origin with the main earth disconnected - this is upstream of any RCDs in the installation."
    },
    {
      question: "The 2-wire (L-N) test avoids RCD tripping because:",
      options: [
        "It uses lower voltage",
        "It tests via neutral, not earth",
        "It's a dead test",
        "It uses DC"
      ],
      correctIndex: 1,
      explanation: "L-N testing measures the loop via neutral, not earth, so no earth leakage occurs to trip the RCD."
    },
    {
      question: "A 30mA RCD trips within:",
      options: ["5 seconds", "1 second", "300ms", "40ms (at 5× IΔn)"],
      correctIndex: 3,
      explanation: "At 5 times rated current (150mA), a 30mA RCD must trip within 40ms. At rated current, 300ms maximum."
    },
    {
      question: "Why test Zs even with RCD protection?",
      options: [
        "RCDs don't work for all faults",
        "It's not required",
        "To trip the RCD",
        "Only for TT systems"
      ],
      correctIndex: 0,
      explanation: "Very low earth faults (below RCD threshold) won't trip the RCD - overcurrent protection must handle these."
    },
    {
      question: "Documenting RCD circuit tests should include:",
      options: [
        "Only RCD trip times",
        "Zs value (measured or calculated) and test method used",
        "Only insulation resistance",
        "Nothing special"
      ],
      correctIndex: 1,
      explanation: "Record Zs value and specify whether measured directly (with no-trip) or calculated from Ze + R1+R2."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 5</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 6 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            RCD-Protected Circuit Testing
          </h1>
          <p className="text-ios-body text-white/70">
            Special considerations for EFLI testing on RCD-protected circuits.
          </p>
        </section>

        {/* In 30 Seconds */}
        <Card variant="ios-elevated" className="p-5">
          <h2 className="text-ios-headline font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <ul className="space-y-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-2 gap-3">
            {learningOutcomes.map((outcome, i) => (
              <Card key={i} variant="ios" className="p-4">
                <p className="text-elec-yellow font-semibold text-sm mb-1">{outcome.title}</p>
                <p className="text-white/60 text-sm">{outcome.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">The RCD Tripping Problem</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Standard Zs testing creates a <strong className="text-white">deliberate earth leakage</strong> - exactly
              what RCDs are designed to detect:
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <p className="text-amber-400 font-semibold">What Happens</p>
              </div>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Tester connects load between Line and Earth</li>
                <li>• Current flows through earth, not returning via neutral</li>
                <li>• RCD detects imbalance (exactly its purpose)</li>
                <li>• RCD trips, interrupting the test</li>
              </ul>
            </div>
            <p className="text-white/60 text-sm">
              The RCD is doing its job - it's not a fault, just an inconvenience for testing.
            </p>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">No-Trip Testing</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Modern testers include a <strong className="text-white">no-trip</strong> or <strong className="text-white">RCD mode</strong>:
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 font-semibold mb-2">How It Works</p>
              <p className="text-white/70 text-sm">
                The tester uses balanced test currents that cancel out, creating no net earth leakage.
                The RCD sees no imbalance and doesn't trip, allowing the Zs measurement to complete.
              </p>
            </div>
            <ul className="space-y-2">
              {[
                "Select 'No-Trip', 'RCD', or 'Low Current' mode",
                "Test may take slightly longer",
                "Results are equivalent to standard testing",
                "Check your meter's manual for specific instructions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <InlineCheck
          question="No-trip Zs testing works by:"
          options={[
            "Using higher voltage",
            "Using balanced currents that don't create net leakage",
            "Bypassing the RCD",
            "Testing only line-neutral"
          ]}
          correctIndex={1}
          explanation="No-trip mode uses balanced test currents that cancel out, avoiding the earth leakage that would trip the RCD."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Calculation Method</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              An alternative that completely avoids RCD interference:
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-xl font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 × 1.2)</p>
            </div>
            <div className="space-y-3">
              {[
                { step: 1, text: "Measure Ze at origin (upstream of RCDs)", note: "See Section 3" },
                { step: 2, text: "Measure R1+R2 on circuit (dead test)", note: "No RCD issue" },
                { step: 3, text: "Multiply R1+R2 by 1.2 for temperature", note: "" },
                { step: 4, text: "Add Ze + corrected R1+R2", note: "" },
                { step: 5, text: "Compare calculated Zs to maximum", note: "" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <span className="text-white/80">{item.text}</span>
                    {item.note && <span className="text-white/40 text-sm ml-2">({item.note})</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Zs Still Matters</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Even with RCD protection, Zs verification is still necessary:
            </p>
            <div className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Low-Level Faults</p>
                <p className="text-white/70 text-sm">Faults below 30mA won't trip the RCD. The overcurrent device must still protect against these.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-1">RCD Failure</p>
                <p className="text-white/70 text-sm">If the RCD fails, backup protection relies on EFLI. Zs should meet at least 5s requirements.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">High-Current Faults</p>
                <p className="text-white/70 text-sm">Sustained high-current faults need the MCB to operate. EFLI ensures adequate fault current.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="On RCD-protected circuits, Zs must still:"
          options={[
            "Not be tested at all",
            "Meet requirements for overcurrent device operation",
            "Be exactly 0Ω",
            "Exceed 10Ω"
          ]}
          correctIndex={1,
          explanation="Zs must allow the overcurrent device (MCB) to operate. RCDs provide additional fast earth fault protection."}
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">2-Wire (L-N) Alternative</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Testing Line to Neutral avoids RCD tripping entirely:
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">How It Works</p>
              <p className="text-white/70 text-sm">
                The test measures loop impedance via the neutral return path instead of earth.
                No earth leakage occurs, so the RCD is not affected.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                <strong>Limitation:</strong> This doesn't verify the CPC (earth) path. Use in combination
                with R1+R2 testing to confirm earth conductor continuity.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Documentation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              When recording Zs for RCD-protected circuits:
            </p>
            <ul className="space-y-2">
              {[
                "Record the Zs value obtained",
                "Indicate method: 'No-trip measurement' or 'Calculated'",
                "If calculated, show workings or reference",
                "Confirm value meets 5s requirement as minimum",
                "Note any issues encountered during testing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 text-sm font-semibold">Example Entry:</p>
              <p className="text-white/70 text-sm mt-1">
                "Zs: 0.85Ω (calculated from Ze 0.32Ω + R1+R2 0.44Ω × 1.2)"
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="The calculation method for Zs is:"
          options={[
            "Zs = Ze - R1+R2",
            "Zs = Ze + (R1+R2 × 1.2)",
            "Zs = Ze × R1+R2",
            "Zs = R1+R2 only"
          ]}
          correctIndex={1}
          explanation="Zs = Ze + (R1+R2 × 1.2). This includes temperature correction factor."
        />

        {/* Practical Tips */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-elec-yellow" />
            Practical Tips
          </h2>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Use No-Trip When Available</p>
                <p className="text-white/70 text-sm">It's the quickest method and gives direct measurement. Most modern MFTs have this feature.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Have Calculation Ready</p>
                <p className="text-white/70 text-sm">Know Ze value before testing circuits. Quick calculation is your backup if no-trip fails.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Test RCDs Separately</p>
                <p className="text-white/70 text-sm">RCD operation testing (trip times) is separate from Zs testing. Do both for complete verification.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                variant="ios"
                className="overflow-hidden"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <button className="w-full p-4 flex items-center justify-between text-left touch-manipulation">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <UnitsPocketCard
          title="RCD Circuit Testing Reference"
          items={[
            { term: "Problem", definition: "RCDs trip during Zs test" },
            { term: "Solution 1", definition: "No-trip / RCD mode" },
            { term: "Solution 2", definition: "Calculate Ze + (R1+R2 × 1.2)" },
            { term: "Solution 3", definition: "2-wire L-N test" },
            { term: "Still Required", definition: "Zs for MCB operation" },
            { term: "Documentation", definition: "State method used" }
          ]}
        />

        {/* Quiz */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz
            questions={quizQuestions}
            onComplete={() => {}}
          />
        </section>

        {/* Module Complete Card */}
        <Card variant="ios-elevated" className="p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Module 5 Complete!</h3>
          <p className="text-white/70 mb-4">
            You've mastered Earth Fault Loop Impedance testing. Ready for RCD Testing?
          </p>
          <Button
            variant="ios-primary"
            className="w-full h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6')}
          >
            Continue to Module 6
          </Button>
        </Card>

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section5')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6')}
          >
            Next Module
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section6;
