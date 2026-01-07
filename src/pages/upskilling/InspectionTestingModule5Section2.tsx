import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section2 = () => {
  useSEO({
    title: "Zs Testing Methods | Inspection & Testing",
    description: "Learn Zs measurement techniques including live testing, two-wire method, and interpretation of results."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Zs is measured live - the circuit must be energised during testing",
    "The tester creates a brief controlled fault to measure impedance",
    "Results must not exceed maximum values from BS 7671 Chapter 41 tables"
  ];

  const learningOutcomes = [
    { title: "Test Method", desc: "How Zs testers work" },
    { title: "Safety Precautions", desc: "Live testing requirements" },
    { title: "Connection Points", desc: "Where to connect probes" },
    { title: "Reading Interpretation", desc: "What results mean" },
    { title: "Temperature Correction", desc: "Adjusting for operating temp" },
    { title: "Documentation", desc: "Recording Zs values" }
  ];

  const faqs = [
    {
      q: "Why must Zs be measured live?",
      a: "The test measures actual impedance including the external supply (Ze), which is only present when connected to the live supply. Dead testing only measures R1+R2 - you need Ze to calculate total Zs."
    },
    {
      q: "How does the tester work?",
      a: "The tester creates a brief, controlled fault current (typically for a few milliseconds) between line and earth. It measures the voltage drop and current, then calculates impedance using Ohm's law (Z=V/I)."
    },
    {
      q: "Will testing trip the RCD?",
      a: "Modern testers use a 'no-trip' technique that balances the test current to avoid tripping RCDs. However, very sensitive RCDs may still trip. Some testers have a specific 'no-trip' or '2-wire' mode."
    },
    {
      q: "What's the 2-wire method?",
      a: "Test between line and neutral instead of line-earth. This measures Zs via the neutral rather than CPC. Useful where RCDs trip during standard testing, but doesn't verify the CPC path."
    },
    {
      q: "When do I apply temperature correction?",
      a: "When verifying Zs by calculation (Ze + R1+R2), multiply R1+R2 by 1.2 to account for conductor heating under fault conditions. Direct Zs measurement doesn't need correction - it's already at ambient."
    },
    {
      q: "What if measured Zs exceeds the maximum?",
      a: "The circuit fails. Investigate: check connections are tight, verify correct cable size is installed, consider shorter cable run, or use a larger CPC. Re-test after any remedial work."
    }
  ];

  const quizQuestions = [
    {
      question: "Zs testing is performed with the circuit:",
      options: ["Dead and isolated", "Live and energised", "Under load only", "With all fuses removed"],
      correctIndex: 1,
      explanation: "Zs must be measured live because it includes Ze (external impedance), which requires connection to the supply."
    },
    {
      question: "A Zs tester works by:",
      options: [
        "Applying DC voltage",
        "Creating a brief controlled fault current",
        "Measuring insulation resistance",
        "Testing RCD operation"
      ],
      correctIndex: 1,
      explanation: "The tester creates a momentary controlled fault, measures voltage drop and current, then calculates impedance."
    },
    {
      question: "The standard Zs test connection is:",
      options: ["Line to Neutral", "Line to Earth", "Neutral to Earth", "Line to Line"],
      correctIndex: 1,
      explanation: "Standard Zs test connects between line and earth (CPC), testing the actual fault path through the protective conductor."
    },
    {
      question: "Why might RCDs trip during Zs testing?",
      options: [
        "The test current creates an earth leakage imbalance",
        "The test voltage is too high",
        "The RCD is faulty",
        "The circuit is overloaded"
      ],
      correctIndex: 0,
      explanation: "Zs testing creates deliberate earth leakage. Sensitive RCDs may detect this imbalance and trip."
    },
    {
      question: "The 2-wire (L-N) Zs test is useful when:",
      options: [
        "Testing SELV circuits",
        "RCDs trip during standard L-E testing",
        "The circuit has no earth",
        "Testing three-phase"
      ],
      correctIndex: 1,
      explanation: "2-wire testing avoids earth leakage by testing L-N. Useful when sensitive RCDs keep tripping, though it doesn't test the CPC."
    },
    {
      question: "When calculating Zs from Ze + R1+R2, apply factor:",
      options: ["1.0", "1.1", "1.2", "1.5"],
      correctIndex: 2,
      explanation: "Multiply R1+R2 by 1.2 to account for conductor resistance increase at maximum operating temperature."
    },
    {
      question: "If measured Zs exceeds maximum permitted:",
      options: [
        "The circuit passes",
        "Apply a larger correction factor",
        "The circuit fails - investigate and remediate",
        "Retest at a different time"
      ],
      correctIndex: 2,
      explanation: "Exceeding maximum Zs means the protective device may not operate quickly enough. Investigate and fix before energising."
    },
    {
      question: "Maximum Zs values are found in:",
      options: ["BS 7671 Chapter 41 tables", "The cable manufacturer data", "The meter manual", "Chapter 52"],
      correctIndex: 0,
      explanation: "BS 7671 Chapter 41 provides maximum Zs tables for various protective devices and disconnection times."
    },
    {
      question: "Direct Zs measurement at ambient temperature:",
      options: [
        "Needs temperature correction",
        "Is automatically at operating temperature",
        "Doesn't need correction as it measures actual impedance",
        "Always reads higher than calculated"
      ],
      correctIndex: 2,
      explanation: "Direct measurement gives actual impedance at test temperature. It's already a 'worst case' compared to calculated values at operating temp."
    },
    {
      question: "Before Zs testing, you should:",
      options: [
        "Isolate the circuit",
        "Verify the supply is on and circuit is accessible",
        "Remove all lamps",
        "Disconnect the earth"
      ],
      correctIndex: 1,
      explanation: "Zs testing is live testing. Ensure the supply is on, circuit is accessible, and you have appropriate safety measures in place."
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
          <span className="text-sm text-white/50 font-medium">Section 2 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Zs Testing Methods
          </h1>
          <p className="text-ios-body text-white/70">
            Learn how to measure earth fault loop impedance safely and accurately.
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

        {/* Link to detailed guide */}
        <Card variant="ios" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Detailed EFLI Testing Guide</p>
              <p className="text-white/60 text-sm">Step-by-step procedures with diagrams</p>
            </div>
            <Button
              variant="ios-primary"
              size="sm"
              onClick={() => navigate('/study-centre/upskilling/earth-fault-loop-guide')}
              className="touch-manipulation"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
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
            <h2 className="text-ios-title-2 font-bold text-white">How Zs Testers Work</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              A Zs tester creates a momentary, controlled fault current and measures the resulting impedance:
            </p>
            <div className="space-y-3">
              {[
                { step: 1, text: "Tester connects load between Line and Earth" },
                { step: 2, text: "A brief (millisecond) current pulse flows" },
                { step: 3, text: "Voltage drop across the loop is measured" },
                { step: 4, text: "Current is measured" },
                { step: 5, text: "Impedance calculated: Z = V ÷ I" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Safety Considerations</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Live Testing Hazards
              </p>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Circuit is energised during testing</li>
                <li>• Risk of electric shock if probes slip</li>
                <li>• Ensure proper PPE and insulated probes</li>
                <li>• Keep others away from test area</li>
              </ul>
            </div>
            <ul className="space-y-2">
              {[
                "Use GS38 compliant test leads",
                "Check test equipment calibration",
                "Ensure firm probe contact",
                "Be aware of RCD tripping possibility"
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
          question="Zs testing is performed with the circuit:"
          options={["Dead and isolated", "Live and energised", "Under load only", "With fuses removed"]}
          correctIndex={1}
          explanation="Zs must be measured live because it includes Ze (external impedance), which requires connection to the supply."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Test Connections</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold">Standard Method: Line-Earth (L-E)</p>
                <p className="text-white/70 text-sm mt-1">
                  Connect between line terminal and earth (CPC). Tests the actual fault path.
                  This is the primary test method.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold">Alternative: Line-Neutral (L-N)</p>
                <p className="text-white/70 text-sm mt-1">
                  2-wire test avoiding earth. Useful when RCDs trip on L-E test.
                  Doesn't verify CPC path.
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Test at the furthest point of the circuit for worst-case values.
            </p>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">RCD Considerations</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Standard Zs testing may trip RCDs because the test creates deliberate earth leakage:
            </p>
            <div className="space-y-3">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">No-Trip Mode</p>
                <p className="text-white/70 text-sm">Modern testers have modes that balance current to avoid tripping. Select 'No-Trip' or 'RCD' mode if available.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">2-Wire Method</p>
                <p className="text-white/70 text-sm">Test L-N instead of L-E. No earth leakage occurs, so RCD won't trip. Limited as doesn't test CPC.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-1">Calculation Method</p>
                <p className="text-white/70 text-sm">Measure Ze at origin (upstream of RCD) and R1+R2 dead. Calculate: Zs = Ze + (R1+R2 × 1.2)</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Why might RCDs trip during Zs testing?"
          options={[
            "The test current creates an earth leakage imbalance",
            "The test voltage is too high",
            "The RCD is faulty",
            "The circuit is overloaded"
          ]}
          correctIndex={0}
          explanation="Zs testing deliberately creates earth leakage current. RCDs are designed to detect this imbalance and may trip."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Temperature Correction</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-lg font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 × 1.2)</p>
              <p className="text-white/60 text-sm">When calculating from measured values</p>
            </div>
            <p className="text-white/80">
              The 1.2 multiplier accounts for conductor resistance increase when operating at maximum temperature (70°C for thermoplastic).
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Direct measurement:</strong> If Zs is measured directly (not calculated), the reading is at ambient temperature - already lower than worst-case operating conditions, so no correction needed for comparison.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              For each circuit, record:
            </p>
            <ul className="space-y-2">
              {[
                "Measured Zs value in ohms",
                "Maximum permitted Zs for the device",
                "Whether calculated or measured directly",
                "Test location (usually furthest point)",
                "Any factors affecting the test"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 text-sm font-semibold">Pass Criteria:</p>
              <p className="text-white/70 text-sm mt-1">
                Measured Zs must be ≤ Maximum Zs from BS 7671 tables
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="When calculating Zs from Ze + R1+R2, multiply R1+R2 by:"
          options={["1.0", "1.1", "1.2", "1.5"]}
          correctIndex={2}
          explanation="Multiply R1+R2 by 1.2 to account for increased resistance at maximum operating temperature."
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
                <p className="text-emerald-400 font-semibold mb-1">Test at Furthest Point</p>
                <p className="text-white/70 text-sm">Always test at the end of the circuit for worst-case impedance. Closer points will have lower, better values.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Check Supply Voltage</p>
                <p className="text-white/70 text-sm">Low supply voltage affects Zs readings. Note the voltage and consider if it affects results.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Compare Similar Circuits</p>
                <p className="text-white/70 text-sm">Circuits of similar length should have similar Zs. A significant outlier indicates a problem.</p>
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
          title="Zs Testing Reference"
          items={[
            { term: "Test Type", definition: "Live testing" },
            { term: "Standard Connection", definition: "Line to Earth (CPC)" },
            { term: "Alternative", definition: "Line to Neutral (2-wire)" },
            { term: "Temp Correction", definition: "×1.2 for calculations" },
            { term: "Test Location", definition: "Furthest point" },
            { term: "Max Zs Source", definition: "BS 7671 Chapter 41" }
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

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section1')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section3')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section2;
