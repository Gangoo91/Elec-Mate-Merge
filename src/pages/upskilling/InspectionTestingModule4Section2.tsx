import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section2 = () => {
  useSEO({
    title: "Test Voltages and Applications | Inspection & Testing",
    description: "Learn which test voltages to use for different circuit types and why voltage selection matters for safe, accurate IR testing."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Test voltage must be appropriate for the circuit's nominal voltage rating",
    "250V DC for SELV/PELV circuits, 500V DC for LV up to 500V, 1000V DC for 500V-1000V systems",
    "Using incorrect voltage can damage equipment or give misleading results"
  ];

  const learningOutcomes = [
    { title: "Select Correct Voltage", desc: "Choose appropriate test voltage" },
    { title: "Understand Ratios", desc: "Why voltage levels are specified" },
    { title: "Protect Equipment", desc: "Avoid damage from overvoltage" },
    { title: "BS 7671 Requirements", desc: "Know the regulations" },
    { title: "SELV/PELV Testing", desc: "Low voltage circuit testing" },
    { title: "Three-Phase Systems", desc: "Higher voltage testing" }
  ];

  const faqs = [
    {
      q: "Why are different test voltages specified?",
      a: "Test voltages are approximately double the circuit's nominal voltage to stress the insulation adequately. This reveals weaknesses without being so high as to cause breakdown of good insulation. It's a balance between thorough testing and avoiding unnecessary stress."
    },
    {
      q: "Can I use 500V on SELV circuits?",
      a: "No. SELV circuits operate at extra-low voltage (typically 12V or 24V) and their insulation may not withstand 500V test voltage. Use 250V DC maximum to avoid insulation damage on these circuits."
    },
    {
      q: "What if the instrument only has 500V?",
      a: "For SELV/PELV circuits, you cannot perform a compliant test with a 500V-only instrument. Either use an instrument with 250V range, or record that the test couldn't be performed with appropriate voltage."
    },
    {
      q: "When would I use 1000V DC?",
      a: "1000V DC is used for systems with nominal voltages between 500V and 1000V, such as 660V industrial motor circuits. It's also sometimes used for enhanced testing of HV cable insulation, though specialist equipment may be required."
    },
    {
      q: "Does higher test voltage give more accurate results?",
      a: "Not necessarily. Using voltage higher than specified can stress insulation unnecessarily and may even cause breakdown, giving false 'fail' results. Always use the voltage appropriate for the circuit being tested."
    },
    {
      q: "What about testing 400V three-phase circuits?",
      a: "400V three-phase systems are tested at 500V DC. The line-to-neutral voltage (230V) and line-to-line voltage (400V) are both below the 500V threshold, so 500V test voltage is appropriate."
    }
  ];

  const quizQuestions = [
    {
      question: "What test voltage should be used for a standard 230V domestic circuit?",
      options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
      correctIndex: 1,
      explanation: "230V circuits are tested at 500V DC per BS 7671 Table 6A. This applies to all LV circuits up to 500V nominal."
    },
    {
      question: "SELV circuits should be tested at:",
      options: ["500V DC", "250V DC", "1000V DC", "12V DC"],
      correctIndex: 1,
      explanation: "SELV and PELV circuits are tested at 250V DC to avoid damaging their lower-rated insulation."
    },
    {
      question: "What is the test voltage for circuits between 500V and 1000V?",
      options: ["250V DC", "500V DC", "1000V DC", "2000V DC"],
      correctIndex: 2,
      explanation: "Circuits with nominal voltage between 500V and 1000V are tested at 1000V DC per BS 7671."
    },
    {
      question: "Why is the test voltage approximately double the circuit voltage?",
      options: [
        "To cause insulation breakdown",
        "To adequately stress insulation while being safe",
        "It's required by equipment design",
        "To trip protective devices"
      ],
      correctIndex: 1,
      explanation: "The test voltage stresses insulation enough to reveal weaknesses, while not being high enough to damage good insulation."
    },
    {
      question: "Using 500V DC on a SELV circuit could:",
      options: [
        "Give more accurate readings",
        "Have no effect",
        "Damage the insulation",
        "Improve insulation quality"
      ],
      correctIndex: 2,
      explanation: "SELV circuit insulation is only rated for extra-low voltage. Applying 500V could permanently damage the insulation."
    },
    {
      question: "A 400V three-phase motor circuit should be tested at:",
      options: ["250V DC", "400V DC", "500V DC", "1000V DC"],
      correctIndex: 2,
      explanation: "400V is below the 500V threshold, so 500V DC test voltage is appropriate for three-phase 400V systems."
    },
    {
      question: "Which BS 7671 table specifies test voltages?",
      options: ["Table 4A", "Table 5B", "Table 6A", "Table 7A"],
      correctIndex: 2,
      explanation: "BS 7671 Table 6A specifies the DC test voltages for insulation resistance testing based on circuit nominal voltage."
    },
    {
      question: "The minimum insulation resistance is:",
      options: [
        "Different for each test voltage",
        "1 MΩ regardless of test voltage",
        "Higher for lower test voltages",
        "Lower for lower test voltages"
      ],
      correctIndex: 1,
      explanation: "The minimum acceptable insulation resistance of 1 MΩ applies regardless of which test voltage is used."
    },
    {
      question: "What test voltage for a 24V control circuit?",
      options: ["250V DC", "500V DC", "24V DC", "50V DC"],
      correctIndex: 0,
      explanation: "24V circuits (below 50V) are classified as extra-low voltage and tested at 250V DC."
    },
    {
      question: "If an instrument only offers 500V, you:",
      options: [
        "Can test all circuits",
        "Cannot perform compliant tests on SELV circuits",
        "Should use the next highest setting",
        "Should connect two leads to increase voltage"
      ],
      correctIndex: 1,
      explanation: "A 500V-only instrument cannot perform compliant insulation tests on SELV/PELV circuits, which require 250V."
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
          <span className="text-sm text-white/50 font-medium">Section 2 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Test Voltages and Applications
          </h1>
          <p className="text-ios-body text-white/70">
            Learn which test voltages to use for different circuit types and why selection matters.
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
            <h2 className="text-ios-title-2 font-bold text-white">BS 7671 Table 6A</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80 mb-4">
              Test voltages are specified in BS 7671 Table 6A based on circuit nominal voltage:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Circuit Voltage</th>
                    <th className="text-center py-2 text-white/60">Test Voltage</th>
                    <th className="text-right py-2 text-white/60">Min IR</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3">SELV & PELV</td>
                    <td className="text-center font-mono text-purple-400">250V DC</td>
                    <td className="text-right">≥0.5 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Up to 500V (inc. 230V, 400V)</td>
                    <td className="text-center font-mono text-elec-yellow">500V DC</td>
                    <td className="text-right">≥1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-3">500V to 1000V</td>
                    <td className="text-center font-mono text-red-400">1000V DC</td>
                    <td className="text-right">≥1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">SELV/PELV Circuits (250V)</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Zap className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-400 font-semibold">250V DC Test Voltage</p>
                <p className="text-white/60 text-sm">For extra-low voltage circuits</p>
              </div>
            </div>
            <p className="text-white/80">
              <strong className="text-white">SELV</strong> (Separated Extra-Low Voltage) and <strong className="text-white">PELV</strong> (Protective
              Extra-Low Voltage) circuits operate at 50V AC or 120V DC maximum.
            </p>
            <p className="text-white/70 text-sm">
              Examples: bathroom shaver supplies, garden lighting transformers, bell circuits, some LED drivers.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Using 500V on these circuits risks damaging insulation not rated for higher voltages.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What test voltage is used for SELV circuits?"
          options={["500V DC", "250V DC", "1000V DC", "50V DC"]}
          correctIndex={1}
          explanation="SELV and PELV circuits are tested at 250V DC to avoid damaging their lower-rated insulation."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Standard LV Circuits (500V)</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <Zap className="w-8 h-8 text-elec-yellow" />
              <div>
                <p className="text-elec-yellow font-semibold">500V DC Test Voltage</p>
                <p className="text-white/60 text-sm">For circuits up to 500V nominal</p>
              </div>
            </div>
            <p className="text-white/80">
              This covers the vast majority of domestic and commercial installations:
            </p>
            <ul className="space-y-2">
              {[
                "230V single-phase lighting and power",
                "400V three-phase supplies",
                "All standard socket outlets",
                "Fixed equipment connections",
                "Distribution board circuits"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Higher Voltage Circuits (1000V)</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <Zap className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-red-400 font-semibold">1000V DC Test Voltage</p>
                <p className="text-white/60 text-sm">For circuits 500V to 1000V nominal</p>
              </div>
            </div>
            <p className="text-white/80">
              Used primarily in industrial installations:
            </p>
            <ul className="space-y-2">
              {[
                "660V motor circuits",
                "Industrial control systems",
                "Large process equipment",
                "Mining and offshore installations"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm">
              Most domestic electricians rarely encounter circuits requiring 1000V testing.
            </p>
          </Card>
        </section>

        <InlineCheck
          question="What test voltage for a 400V three-phase supply?"
          options={["250V DC", "400V DC", "500V DC", "1000V DC"]}
          correctIndex={2}
          explanation="400V is below 500V, so 500V DC test voltage is appropriate for three-phase 400V systems."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why the 2× Ratio?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Test voltages are approximately twice the circuit voltage because:
            </p>
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Adequate Stress</p>
                <p className="text-white/70 text-sm">Double voltage stresses insulation enough to reveal developing weaknesses that might not show at normal operating voltage.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Safety Margin</p>
                <p className="text-white/70 text-sm">Good insulation easily withstands 2× voltage. If it fails at 2×, it may fail in service under transient overvoltages.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Not Too High</p>
                <p className="text-white/70 text-sm">Higher than 2× would risk damaging good insulation and cause unnecessary failures.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Common Mistakes</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Using 500V on SELV</p>
                <p className="text-white/70 text-sm">Damages insulation rated for extra-low voltage. Always check circuit type first.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Using 250V on LV</p>
                <p className="text-white/70 text-sm">Doesn't adequately stress insulation. May pass circuits that would fail at correct voltage.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Not Checking Instrument</p>
                <p className="text-white/70 text-sm">Always verify selected voltage before testing. Some instruments default to 500V.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Using 250V DC on a standard 230V circuit would:"
          options={[
            "Give accurate results",
            "Not adequately stress the insulation",
            "Damage the circuit",
            "Be more accurate than 500V"
          ]}
          correctIndex={1}
          explanation="250V doesn't stress 230V-rated insulation sufficiently. Weaknesses may not be revealed, giving false confidence in poor insulation."
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
                <p className="text-emerald-400 font-semibold mb-1">Check Voltage First</p>
                <p className="text-white/70 text-sm">Before each test, verify instrument is set to correct voltage for the circuit type.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Label SELV Circuits</p>
                <p className="text-white/70 text-sm">Mark SELV/PELV circuits clearly so they're not inadvertently tested at 500V.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Document Settings</p>
                <p className="text-white/70 text-sm">Record the test voltage used on certificates - it's a requirement.</p>
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
          title="Test Voltage Quick Reference"
          items={[
            { term: "SELV/PELV", definition: "250V DC → ≥0.5 MΩ" },
            { term: "Up to 500V (230V/400V)", definition: "500V DC → ≥1.0 MΩ" },
            { term: "500V to 1000V", definition: "1000V DC → ≥1.0 MΩ" },
            { term: "Reference Table", definition: "BS 7671 Table 6A" },
            { term: "Voltage Ratio", definition: "~2× circuit voltage" },
            { term: "Always Record", definition: "Test voltage used" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section1')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section3')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section2;
