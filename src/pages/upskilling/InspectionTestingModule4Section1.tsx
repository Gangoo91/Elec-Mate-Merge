import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section1 = () => {
  useSEO({
    title: "Principles of Insulation Testing | Inspection & Testing",
    description: "Understand insulation resistance fundamentals, why testing is essential, and the physics behind IR measurements."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Insulation resistance testing verifies conductors are adequately isolated from each other and earth",
    "Tests apply a high DC voltage to stress insulation and measure leakage current",
    "Results indicate insulation condition - low values suggest degradation or contamination"
  ];

  const learningOutcomes = [
    { title: "Understand Purpose", desc: "Know why IR testing is essential" },
    { title: "Learn the Physics", desc: "How insulation resistance works" },
    { title: "Recognise Degradation", desc: "Causes of insulation breakdown" },
    { title: "Safety Implications", desc: "Consequences of poor insulation" },
    { title: "Testing Standards", desc: "BS 7671 requirements" },
    { title: "Equipment Function", desc: "How IR testers operate" }
  ];

  const faqs = [
    {
      q: "Why use DC voltage for insulation testing?",
      a: "DC voltage provides a constant stress on the insulation without the charging effects of AC. The steady current flow through insulation defects is easier to measure accurately, and DC won't trip RCDs during testing."
    },
    {
      q: "What does insulation resistance actually measure?",
      a: "It measures the resistance of the insulating material between conductors or between conductors and earth. High values (megohms) indicate good insulation; low values indicate degradation, damage, or contamination allowing leakage current."
    },
    {
      q: "Why does insulation degrade over time?",
      a: "Multiple factors: heat cycling causes expansion/contraction, moisture ingress, UV exposure, chemical contamination, mechanical damage, electrical stress, and natural aging of materials all contribute to gradual insulation breakdown."
    },
    {
      q: "What happens if insulation fails?",
      a: "Failed insulation can cause: electric shock to persons, fire from leakage currents, equipment damage, nuisance tripping of protective devices, and potential earth faults leading to dangerous touch voltages on exposed metalwork."
    },
    {
      q: "How does an insulation resistance tester work?",
      a: "The instrument generates a stabilised DC voltage (250V, 500V, or 1000V). This is applied to the insulation. The tester measures the tiny current that flows through the insulation and calculates resistance using Ohm's law (R=V/I)."
    },
    {
      q: "Can low readings be temporary?",
      a: "Yes. Moisture on insulation surfaces can cause low readings that improve when the circuit dries out. Condensation is common in unheated buildings. However, consistently low readings after drying indicate genuine insulation degradation."
    }
  ];

  const quizQuestions = [
    {
      question: "Insulation resistance testing verifies that:",
      options: [
        "Protective devices will operate",
        "Conductors are adequately isolated",
        "The circuit has low impedance",
        "RCDs will trip correctly"
      ],
      correctIndex: 1,
      explanation: "Insulation resistance testing confirms conductors are adequately separated from each other and from earth, preventing dangerous leakage currents."
    },
    {
      question: "Insulation resistance is measured in:",
      options: ["Ohms (Ω)", "Milliohms (mΩ)", "Megohms (MΩ)", "Amperes (A)"],
      correctIndex: 2,
      explanation: "Good insulation has very high resistance, typically measured in megohms (MΩ). 1 MΩ = 1,000,000 Ω."
    },
    {
      question: "Why is DC voltage used for insulation testing?",
      options: [
        "It's safer than AC",
        "It provides constant stress without charging effects",
        "It's required by law",
        "It gives higher readings"
      ],
      correctIndex: 1,
      explanation: "DC provides constant, steady stress on insulation. AC would cause capacitive charging effects that complicate measurement."
    },
    {
      question: "A low insulation resistance reading indicates:",
      options: [
        "Excellent insulation quality",
        "New cable installation",
        "Degraded or contaminated insulation",
        "Correct polarity"
      ],
      correctIndex: 2,
      explanation: "Low readings suggest insulation is degraded, damaged, contaminated, or wet - allowing leakage current to flow."
    },
    {
      question: "Which is NOT a common cause of insulation degradation?",
      options: [
        "Moisture ingress",
        "Heat cycling",
        "Correct installation",
        "UV exposure"
      ],
      correctIndex: 2,
      explanation: "Correct installation actually protects insulation. Moisture, heat, UV, mechanical damage, and age all cause degradation."
    },
    {
      question: "Failed insulation can result in:",
      options: [
        "Only nuisance tripping",
        "Only equipment damage",
        "Electric shock, fire, and equipment damage",
        "None of the above"
      ],
      correctIndex: 2,
      explanation: "Failed insulation can cause multiple hazards: electric shock, fire from leakage currents, equipment damage, and dangerous touch voltages."
    },
    {
      question: "An insulation resistance tester generates:",
      options: [
        "High AC voltage",
        "Low DC voltage",
        "Stabilised DC voltage at 250V, 500V, or 1000V",
        "Variable frequency AC"
      ],
      correctIndex: 2,
      explanation: "IR testers generate specific stabilised DC voltages - typically 250V, 500V, or 1000V depending on the circuit being tested."
    },
    {
      question: "Moisture on insulation surfaces will cause:",
      options: [
        "Higher readings",
        "Lower readings",
        "No change in readings",
        "Open circuit readings"
      ],
      correctIndex: 1,
      explanation: "Moisture creates a conductive path on insulation surfaces, reducing the measured resistance. Readings often improve when circuits dry out."
    },
    {
      question: "What unit represents 1,000,000 ohms?",
      options: ["Kilohm (kΩ)", "Megohm (MΩ)", "Gigohm (GΩ)", "Milliohm (mΩ)"],
      correctIndex: 1,
      explanation: "1 Megohm (MΩ) = 1,000,000 Ω. This is the typical unit for insulation resistance measurements."
    },
    {
      question: "The minimum acceptable insulation resistance per BS 7671 is:",
      options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
      correctIndex: 1,
      explanation: "BS 7671 specifies a minimum insulation resistance of 1.0 MΩ for most circuits. Lower values require investigation."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 4</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 1 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Principles of Insulation Testing
          </h1>
          <p className="text-ios-body text-white/70">
            Understand why insulation resistance testing is essential and the physics behind IR measurements.
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
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
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
            <h2 className="text-ios-title-2 font-bold text-white">What is Insulation Resistance?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              <strong className="text-white">Insulation resistance (IR)</strong> is a measure of how well the
              insulating materials in an electrical installation prevent unwanted current flow between conductors,
              or from conductors to earth.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                <span className="text-white font-semibold">Key Principle</span>
              </div>
              <p className="text-white/70 text-sm">
                Perfect insulation would have infinite resistance. In reality, all insulating materials allow
                some tiny current to pass - this is normal. Problems occur when this leakage becomes excessive.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Test Insulation?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Insulation testing is critical for electrical safety:
            </p>
            <div className="space-y-3">
              {[
                { icon: "🛡️", title: "Prevent Electric Shock", desc: "Ensures live conductors cannot contact accessible metalwork" },
                { icon: "🔥", title: "Prevent Fire", desc: "Detects leakage currents that could cause overheating" },
                { icon: "⚡", title: "Protect Equipment", desc: "Identifies degradation before failure occurs" },
                { icon: "✅", title: "Verify Installation", desc: "Confirms new work meets safety standards" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-white/60 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What does insulation resistance testing verify?"
          options={[
            "Circuit continuity",
            "Adequate isolation between conductors and earth",
            "Protective device operation",
            "Earth electrode resistance"
          ]}
          correctIndex={1}
          explanation="Insulation resistance testing confirms conductors are adequately isolated from each other and from earth, preventing dangerous leakage currents."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">How IR Testing Works</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              An insulation resistance tester applies a <strong className="text-white">stabilised DC voltage</strong> between
              the conductors under test.
            </p>
            <div className="space-y-3">
              {[
                { step: 1, text: "Instrument generates a stable DC voltage (250V, 500V, or 1000V)" },
                { step: 2, text: "Voltage is applied across the insulation being tested" },
                { step: 3, text: "Tiny leakage current flows through the insulation" },
                { step: 4, text: "Instrument measures this current (typically microamps)" },
                { step: 5, text: "Resistance calculated using Ohm's Law: R = V/I" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why DC Voltage?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              DC voltage is used for insulation testing because:
            </p>
            <ul className="space-y-2">
              {[
                "Provides constant, steady stress on insulation",
                "No capacitive charging effects to complicate readings",
                "Easier to measure small leakage currents accurately",
                "Won't trip RCDs during testing",
                "Reveals genuine insulation resistance, not capacitive reactance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                If AC were used, cables would act as capacitors, and the readings would include capacitive reactance rather than true insulation resistance.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Insulation resistance is typically measured in:"
          options={["Milliohms (mΩ)", "Ohms (Ω)", "Megohms (MΩ)", "Kilohms (kΩ)"]}
          correctIndex={2}
          explanation="Good insulation has very high resistance, typically measured in megohms (MΩ). 1 MΩ = 1,000,000 Ω."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Causes of Degradation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Insulation degrades over time due to various factors:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { factor: "Heat", effect: "Accelerates aging, causes brittleness" },
                { factor: "Moisture", effect: "Creates conductive paths" },
                { factor: "UV Light", effect: "Breaks down plastic materials" },
                { factor: "Chemicals", effect: "Attacks insulation compounds" },
                { factor: "Mechanical", effect: "Abrasion, crushing, cuts" },
                { factor: "Electrical", effect: "Overvoltage stress, arcing" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">{item.factor}</p>
                  <p className="text-white/60 text-xs">{item.effect}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">BS 7671 Requirements</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">Minimum: 1.0 MΩ</p>
              <p className="text-white/60 text-sm">Required insulation resistance per BS 7671</p>
            </div>
            <p className="text-white/80">
              This minimum applies to each circuit tested. In practice, new installations should achieve
              readings significantly higher than 1 MΩ - typically 100 MΩ or more.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Note:</strong> The 1 MΩ minimum is measured with all equipment
                disconnected. With equipment connected, readings may be lower due to electronic components.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What is the minimum acceptable insulation resistance per BS 7671?"
          options={["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"]}
          correctIndex={1}
          explanation="BS 7671 specifies a minimum insulation resistance of 1.0 MΩ. Values below this require investigation and remedial work."
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
                <p className="text-emerald-400 font-semibold mb-1">New Installations</p>
                <p className="text-white/70 text-sm">Expect readings of 100 MΩ or higher. Low readings on new work indicate installation problems.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Older Installations</p>
                <p className="text-white/70 text-sm">Readings decrease over time. Monitor trends - gradual decline is normal, sudden drops indicate problems.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Weather Effects</p>
                <p className="text-white/70 text-sm">Damp conditions reduce readings. Test in dry conditions or allow for moisture effects.</p>
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
          title="Insulation Resistance Reference"
          items={[
            { term: "Minimum IR", definition: "1.0 MΩ per BS 7671" },
            { term: "New Installation", definition: ">100 MΩ typical" },
            { term: "Test Voltages", definition: "250V, 500V, 1000V DC" },
            { term: "1 MΩ equals", definition: "1,000,000 Ω" },
            { term: "Measurement Unit", definition: "Megohms (MΩ)" },
            { term: "Test Type", definition: "DC voltage application" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
          >
            Back to Module
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section2')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section1;
