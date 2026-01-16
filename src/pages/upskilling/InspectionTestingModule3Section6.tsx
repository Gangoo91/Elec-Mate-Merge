import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Calculator, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule3Section6 = () => {
  useSEO({
    title: "Interpreting Continuity Results | Inspection & Testing",
    description: "Learn to interpret continuity test results, calculate expected values, and identify faults from test data."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Compare measured R1+R2 values against calculated expected values from BS 7671 tables",
    "High readings indicate poor connections, wrong CSA, or incorrect test setup",
    "R1+R2 values are needed to calculate maximum Zs for fault loop verification"
  ];

  const learningOutcomes = [
    { title: "Calculate Expected Values", desc: "Use conductor resistance tables" },
    { title: "Compare Results", desc: "Assess measured vs expected" },
    { title: "Identify Faults", desc: "Recognise abnormal readings" },
    { title: "Temperature Correction", desc: "Apply correction factors" },
    { title: "Document Findings", desc: "Record and report results" },
    { title: "Use R1+R2 Values", desc: "Apply to Zs calculations" }
  ];

  const faqs = [
    {
      q: "How do I calculate expected R1+R2?",
      a: "Use BS 7671 Table 5B/5C for conductor resistance (mΩ/m). Multiply by circuit length. Add R1 (line) + R2 (CPC) values together. For example: 20m circuit with 2.5/1.5mm² = (7.41×20) + (12.10×20) = 390.2mΩ = 0.39Ω."
    },
    {
      q: "What if measured values exceed calculated values?",
      a: "Investigate: (1) Poor connections at terminals, (2) Damaged conductor reducing CSA, (3) Incorrect conductor size actually installed, (4) Longer cable route than assumed, (5) High resistance joint or accessory. Re-test after checking."
    },
    {
      q: "Why apply temperature correction?",
      a: "Tables give resistance at 20°C. Copper resistance increases ~0.4% per °C above this. At 30°C, multiply by 1.04. At 10°C, multiply by 0.96. This matters for accurate fault loop impedance verification."
    },
    {
      q: "How do I use R1+R2 for Zs verification?",
      a: "Zs = Ze + (R1+R2). Measure Ze at origin. Add measured R1+R2 for the circuit. The sum must not exceed maximum Zs values from BS 7671 Chapter 41. Apply temperature correction factor (multiply R1+R2 by 1.2 for max operating temp)."
    },
    {
      q: "What's an acceptable tolerance on calculated values?",
      a: "Measured values should be within ±10-15% of calculated. Minor differences are normal due to: actual vs nominal CSA, connection resistances, temperature variations. Significant deviations warrant investigation."
    },
    {
      q: "How do ring circuit results differ?",
      a: "Ring circuits should show approximately equal resistance at each socket (r1/4 + r2/4 pattern). Significant variation between sockets indicates broken ring, crossed connections, or interconnections."
    }
  ];

  const quizQuestions = [
    {
      question: "The resistance per metre of 2.5mm² copper at 20°C is approximately:",
      options: ["4.61 mΩ/m", "7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m"],
      correctIndex: 1,
      explanation: "From BS 7671 Table 5B, 2.5mm² copper has a resistance of approximately 7.41 mΩ/m at 20°C."
    },
    {
      question: "To calculate expected R1+R2 for a radial circuit, you need:",
      options: [
        "Only the phase conductor resistance",
        "Only the CPC resistance",
        "Phase conductor + CPC resistance × circuit length",
        "Phase conductor × CPC resistance"
      ],
      correctIndex: 2,
      explanation: "R1+R2 = (resistance/m of line + resistance/m of CPC) × one-way circuit length."
    },
    {
      question: "A measured R1+R2 significantly higher than calculated suggests:",
      options: [
        "Good quality installation",
        "Smaller conductor than specified",
        "Shorter cable run",
        "Low-resistance connections"
      ],
      correctIndex: 1,
      explanation: "Higher resistance than expected often indicates smaller conductor CSA, poor connections, or longer cable run than assumed."
    },
    {
      question: "The temperature correction multiplier for Zs at maximum operating temperature is:",
      options: ["1.0", "1.1", "1.2", "1.5"],
      correctIndex: 2,
      explanation: "A multiplier of 1.2 is applied to account for conductor resistance increase at maximum operating temperature (typically 70°C for thermoplastic)."
    },
    {
      question: "For Zs verification, the formula is:",
      options: ["Zs = Ze - R1+R2", "Zs = Ze + (R1+R2)", "Zs = Ze × R1+R2", "Zs = Ze ÷ R1+R2"],
      correctIndex: 1,
      explanation: "Total earth fault loop impedance (Zs) = External impedance (Ze) + Circuit impedance (R1+R2)."
    },
    {
      question: "1.5mm² copper conductor has approximately what resistance per metre?",
      options: ["7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m", "30.20 mΩ/m"],
      correctIndex: 1,
      explanation: "From BS 7671 Table 5B, 1.5mm² copper has a resistance of approximately 12.10 mΩ/m at 20°C."
    },
    {
      question: "An acceptable variation between measured and calculated R1+R2 is typically:",
      options: ["±1-2%", "±5%", "±10-15%", "±25%"],
      correctIndex: 2,
      explanation: "Variations of ±10-15% are generally acceptable, accounting for actual vs nominal CSA, connection resistances, and measurement tolerances."
    },
    {
      question: "In a correctly wired ring circuit, measurements at each socket should show:",
      options: [
        "Increasing values around the ring",
        "Decreasing values around the ring",
        "Approximately equal values",
        "Random values"
      ],
      correctIndex: 2,
      explanation: "A healthy ring shows approximately equal r1+r2 values at each socket position, following the r1/4 + r2/4 pattern."
    },
    {
      question: "Why multiply R1+R2 by 1.2 for Zs verification?",
      options: [
        "To add a safety margin",
        "To account for conductor temperature rise",
        "To include connection resistance",
        "To compensate for meter accuracy"
      ],
      correctIndex: 1,
      explanation: "The 1.2 multiplier accounts for conductor resistance increase when operating at maximum temperature compared to test conditions at ambient temperature."
    },
    {
      question: "If R1+R2 measures lower than calculated, this could indicate:",
      options: [
        "Larger conductor installed than specified",
        "Poor connections",
        "Damaged conductor",
        "Longer cable route"
      ],
      correctIndex: 0,
      explanation: "Lower than expected resistance suggests the actual conductor CSA is larger than assumed in calculations, which is acceptable."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 3</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 6 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">Module 3 • Continuity Testing</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Interpreting Continuity Results
          </h1>
          <p className="text-ios-body text-white/70">
            Learn to analyse test results, calculate expected values, and identify faults from continuity data.
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
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
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
            <h2 className="text-ios-title-2 font-bold text-white">Conductor Resistance Tables</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              BS 7671 Appendix 5B provides resistance values for copper conductors at 20°C:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">CSA (mm²)</th>
                    <th className="text-right py-2 text-white/60">mΩ/m</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 font-mono">
                  <tr className="border-b border-white/10">
                    <td className="py-2">1.0</td>
                    <td className="text-right">18.10</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">1.5</td>
                    <td className="text-right">12.10</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">2.5</td>
                    <td className="text-right">7.41</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">4.0</td>
                    <td className="text-right">4.61</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">6.0</td>
                    <td className="text-right">3.08</td>
                  </tr>
                  <tr>
                    <td className="py-2">10.0</td>
                    <td className="text-right">1.83</td>
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
            <h2 className="text-ios-title-2 font-bold text-white">Calculating Expected R1+R2</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-5 h-5 text-elec-yellow" />
                <p className="text-elec-yellow font-semibold">Formula</p>
              </div>
              <p className="font-mono text-white text-center text-lg">
                R1+R2 = (mΩ/m<sub>line</sub> + mΩ/m<sub>CPC</sub>) × Length
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              <p className="text-white font-semibold">Example Calculation:</p>
              <p className="text-white/70 text-sm">
                20m circuit using 2.5mm² line and 1.5mm² CPC:
              </p>
              <div className="font-mono text-white/80 text-sm space-y-1">
                <p>R1 = 7.41 × 20 = 148.2 mΩ</p>
                <p>R2 = 12.10 × 20 = 242.0 mΩ</p>
                <p className="text-elec-yellow">R1+R2 = 390.2 mΩ = 0.39Ω</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What is the resistance per metre of 1.5mm² copper conductor?"
          options={["7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m", "4.61 mΩ/m"]}
          correctIndex={1}
          explanation="From BS 7671 Table 5B, 1.5mm² copper has a resistance of 12.10 mΩ/m at 20°C."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Comparing Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              When measured R1+R2 differs from calculated values:
            </p>
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Lower than expected</p>
                <p className="text-white/70 text-sm">Usually acceptable - may indicate larger CSA conductor installed or shorter route than estimated.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Within ±10-15%</p>
                <p className="text-white/70 text-sm">Normal variation due to actual vs nominal CSA, connections, and temperature.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 font-semibold mb-1">Higher than expected</p>
                <p className="text-white/70 text-sm">Investigate! Could indicate poor connections, smaller CSA, longer route, or damaged conductor.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Temperature Correction</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Conductor resistance changes with temperature. Copper increases ~0.4% per °C.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-semibold mb-3">Correction Factors:</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <span className="text-white/60">At 10°C:</span>
                <span className="text-white/80">× 0.96</span>
                <span className="text-white/60">At 20°C:</span>
                <span className="text-white/80">× 1.00 (reference)</span>
                <span className="text-white/60">At 30°C:</span>
                <span className="text-white/80">× 1.04</span>
                <span className="text-white/60">At 70°C (max):</span>
                <span className="text-elec-yellow">× 1.20</span>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                For Zs verification, multiply R1+R2 by 1.2 to account for maximum operating temperature.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="The temperature correction multiplier for maximum operating temperature is:"
          options={["1.0", "1.1", "1.2", "1.5"]}
          correctIndex={2}
          explanation="1.2 multiplier accounts for conductor resistance increase at maximum operating temperature (typically 70°C) compared to 20°C test conditions."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Using R1+R2 for Zs Verification</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 × 1.2)</p>
              <p className="text-white/60 text-sm">Temperature-corrected fault loop impedance</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <p className="text-white font-semibold">Example:</p>
              <p className="text-white/70 text-sm font-mono">
                Ze = 0.35Ω (measured at origin)<br />
                R1+R2 = 0.39Ω (measured on circuit)<br />
                Zs = 0.35 + (0.39 × 1.2) = 0.35 + 0.47 = <span className="text-elec-yellow">0.82Ω</span>
              </p>
              <p className="text-white/60 text-sm mt-2">
                Compare this calculated Zs against maximum values from BS 7671 Chapter 41.
              </p>
            </div>

            {/* Link to detailed guide */}
            <Button
              variant="ios-secondary"
              className="w-full h-12 touch-manipulation"
              onClick={() => navigate('/study-centre/upskilling/earth-fault-loop-guide')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Detailed Earth Fault Loop Guide
            </Button>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Common Fault Patterns</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Very High R1+R2</p>
                <p className="text-white/70 text-sm">Poor connection, loose terminal, corroded joint, or damaged conductor. Check all terminations.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Inconsistent Readings</p>
                <p className="text-white/70 text-sm">Intermittent connection. Likely loose terminal or broken conductor strand making variable contact.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Ring Circuit Variation</p>
                <p className="text-white/70 text-sm">Readings vary significantly around ring. Check for broken ring, crossed connections, or interconnections.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">OL / Open Circuit</p>
                <p className="text-white/70 text-sm">No continuity. Broken conductor, disconnected terminal, or testing wrong circuit.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="If R1+R2 is significantly higher than calculated, you should:"
          options={[
            "Accept the result - it's safe",
            "Investigate connections and conductor integrity",
            "Reduce the test current",
            "Apply a larger multiplier"
          ]}
          correctIndex={1}
          explanation="Higher than expected R1+R2 may indicate safety issues like poor connections or damaged conductors. Always investigate the cause."
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
                <p className="text-emerald-400 font-semibold mb-1">Document Your Calculations</p>
                <p className="text-white/70 text-sm">Record both expected and measured values. This demonstrates competence and helps identify patterns.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Check Cable Routes</p>
                <p className="text-white/70 text-sm">Actual cable routes may be longer than direct distances. Add 10-15% for typical building layouts.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Re-test After Remedial Work</p>
                <p className="text-white/70 text-sm">If you tighten connections or make repairs, always re-test to verify the improvement.</p>
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
          title="Continuity Results Reference"
          items={[
            { term: "1.5mm² Cu", definition: "12.10 mΩ/m" },
            { term: "2.5mm² Cu", definition: "7.41 mΩ/m" },
            { term: "4.0mm² Cu", definition: "4.61 mΩ/m" },
            { term: "Temp Correction", definition: "×1.2 for max temp" },
            { term: "Zs Formula", definition: "Ze + (R1+R2 × 1.2)" },
            { term: "Acceptable Variance", definition: "±10-15% of calculated" }
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
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Module 3 Complete!</h3>
          <p className="text-white/70 mb-4">
            You've completed all sections on Continuity Testing. Ready for Insulation Resistance Testing?
          </p>
          <Button
            variant="ios-primary"
            className="w-full h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
          >
            Continue to Module 4
          </Button>
        </Card>

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3/section5')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
          >
            Next Module
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule3Section6;
