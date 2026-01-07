import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section5 = () => {
  useSEO({
    title: "Interpreting IR Results | Inspection & Testing",
    description: "Learn to interpret insulation resistance test results, understand minimum values, and assess installation condition."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Minimum acceptable IR is 1.0 MΩ for LV circuits (0.5 MΩ for SELV/PELV)",
    "New installations should achieve much higher values, typically >100 MΩ",
    "Low readings require investigation - they indicate potential safety hazards"
  ];

  const learningOutcomes = [
    { title: "Minimum Values", desc: "Know BS 7671 requirements" },
    { title: "Expected Readings", desc: "What good insulation looks like" },
    { title: "Interpret Low Values", desc: "Understand what they mean" },
    { title: "Age Considerations", desc: "How readings change over time" },
    { title: "Recording Results", desc: "Document findings properly" },
    { title: "Action Thresholds", desc: "When to take action" }
  ];

  const faqs = [
    {
      q: "What if reading is exactly 1.0 MΩ?",
      a: "1.0 MΩ is the minimum acceptable value. While technically compliant, it's borderline and suggests degradation. Investigate the cause - on new work this indicates a problem; on older installations monitor for further decline."
    },
    {
      q: "Why do new installations read >100 MΩ?",
      a: "Modern cable insulation materials have extremely high resistance when new. Readings of several hundred megohms or showing 'OL' (over limit) are normal. Low readings on new work always indicate a problem."
    },
    {
      q: "What's the relationship between cable length and IR?",
      a: "IR reading decreases as cable length increases (parallel insulation paths). A 100m circuit has approximately half the IR of a 50m circuit. This is normal physics, not degradation. Assess values relative to circuit length."
    },
    {
      q: "Do weather conditions affect readings?",
      a: "Yes significantly. Humidity increases surface leakage. Cold weather causing condensation can dramatically reduce readings. Test in stable, dry conditions where possible, or account for conditions in your assessment."
    },
    {
      q: "How do I record readings that exceed the meter range?",
      a: "Record as '>200 MΩ' or '>500 MΩ' depending on your instrument's maximum display. Many modern meters show 'OL' (Over Limit) for values beyond range. This indicates excellent insulation."
    },
    {
      q: "What if only one test (e.g., L-N) fails?",
      a: "Each test measures different insulation paths. A single failure identifies the specific problem area. For example, L-N failure with L-E and N-E passing suggests insulation breakdown between conductors, not to earth."
    }
  ];

  const quizQuestions = [
    {
      question: "The minimum acceptable IR for a 230V circuit is:",
      options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
      correctIndex: 1,
      explanation: "BS 7671 specifies minimum 1.0 MΩ for circuits above 50V (LV). SELV/PELV circuits have a minimum of 0.5 MΩ."
    },
    {
      question: "A new installation typically reads:",
      options: ["1-2 MΩ", "10-50 MΩ", ">100 MΩ or OL", "Exactly 1 MΩ"],
      correctIndex: 2,
      explanation: "New cable insulation has very high resistance. Readings over 100 MΩ or exceeding meter range (OL) are normal for new work."
    },
    {
      question: "A reading of 0.8 MΩ indicates:",
      options: [
        "Excellent insulation",
        "Below minimum - investigation required",
        "Normal for older installations",
        "Meter fault"
      ],
      correctIndex: 1,
      explanation: "0.8 MΩ is below the 1.0 MΩ minimum. This circuit fails and requires investigation before it can be energised."
    },
    {
      question: "As cable length increases, IR reading:",
      options: [
        "Increases proportionally",
        "Decreases (more parallel paths)",
        "Stays exactly the same",
        "Becomes unstable"
      ],
      correctIndex: 1,
      explanation: "Longer cables have more insulation in parallel, reducing overall IR. This is normal - a 100m cable has roughly half the IR of a 50m cable of the same type."
    },
    {
      question: "'OL' on an IR meter indicates:",
      options: [
        "Open circuit fault",
        "Overload condition",
        "Over Limit - excellent insulation",
        "Low battery"
      ],
      correctIndex: 2,
      explanation: "OL (Over Limit) means resistance exceeds the meter's range. This indicates excellent insulation - the reading is too high to measure."
    },
    {
      question: "A 5-year-old installation reading 50 MΩ is:",
      options: [
        "Failing",
        "Below minimum",
        "Still good - well above 1 MΩ",
        "Needs immediate attention"
      ],
      correctIndex: 2,
      explanation: "50 MΩ is well above the 1.0 MΩ minimum. While lower than new, this indicates healthy insulation for a 5-year-old installation."
    },
    {
      question: "Humidity affects IR readings by:",
      options: [
        "Having no effect",
        "Increasing readings",
        "Causing surface leakage, reducing readings",
        "Making readings unstable"
      ],
      correctIndex: 2,
      explanation: "High humidity creates moisture films on insulation surfaces, allowing surface leakage current and reducing apparent IR."
    },
    {
      question: "If L-E and N-E pass but L-N fails, the problem is:",
      options: [
        "Poor earth connection",
        "Insulation breakdown between line and neutral",
        "Disconnected neutral",
        "Wrong test voltage"
      ],
      correctIndex: 1,
      explanation: "Passing L-E and N-E tests show both conductors are insulated from earth. The L-N failure indicates conductor-to-conductor insulation breakdown."
    },
    {
      question: "An older installation reading 2 MΩ should be:",
      options: [
        "Failed immediately",
        "Monitored - acceptable but declining",
        "Ignored",
        "Tested at higher voltage"
      ],
      correctIndex: 1,
      explanation: "2 MΩ is above the 1.0 MΩ minimum so is acceptable, but lower than expected. Note the value and monitor for further decline at next inspection."
    },
    {
      question: "The minimum IR for SELV circuits is:",
      options: ["0.25 MΩ", "0.5 MΩ", "1.0 MΩ", "2.0 MΩ"],
      correctIndex: 1,
      explanation: "SELV and PELV circuits (extra-low voltage) have a lower minimum of 0.5 MΩ, tested at 250V DC per BS 7671."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 4</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 5 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Interpreting IR Results
          </h1>
          <p className="text-ios-body text-white/70">
            Understand what IR readings mean and when to take action.
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
            <h2 className="text-ios-title-2 font-bold text-white">Minimum Values</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Circuit Type</th>
                    <th className="text-center py-2 text-white/60">Test V</th>
                    <th className="text-right py-2 text-white/60">Min IR</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3">SELV/PELV</td>
                    <td className="text-center font-mono">250V</td>
                    <td className="text-right text-purple-400 font-semibold">≥0.5 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">LV up to 500V</td>
                    <td className="text-center font-mono">500V</td>
                    <td className="text-right text-elec-yellow font-semibold">≥1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-3">500V to 1000V</td>
                    <td className="text-center font-mono">1000V</td>
                    <td className="text-right text-red-400 font-semibold">≥1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                These are minimum values. New installations should read much higher.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Expected Readings</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold">New Installation</p>
                <p className="text-white/70 text-sm">&gt;100 MΩ or OL (Over Limit). Modern cables have excellent insulation when new.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold">5-10 Years Old</p>
                <p className="text-white/70 text-sm">20-100 MΩ typical. Some degradation is normal with age.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold">15-25 Years Old</p>
                <p className="text-white/70 text-sm">5-50 MΩ typical. Monitor for continued decline.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 font-semibold">&gt;25 Years / Poor Environment</p>
                <p className="text-white/70 text-sm">May approach minimum values. Consider replacement if declining.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="A new installation should typically read:"
          options={["1-2 MΩ", "10-50 MΩ", ">100 MΩ or OL", "Exactly 1 MΩ"]}
          correctIndex={2}
          explanation="New cable insulation has very high resistance. Readings exceeding 100 MΩ or showing OL (Over Limit) are normal for new installations."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Interpreting Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Reading</th>
                    <th className="text-left py-2 text-white/60">Assessment</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">&gt;100 MΩ / OL</td>
                    <td className="py-2 text-emerald-400">Excellent - no action needed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">10-100 MΩ</td>
                    <td className="py-2 text-emerald-400">Good - acceptable</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">2-10 MΩ</td>
                    <td className="py-2 text-amber-400">Acceptable - monitor trend</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">1-2 MΩ</td>
                    <td className="py-2 text-amber-400">Marginal - investigate cause</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">&lt;1 MΩ</td>
                    <td className="py-2 text-red-400">FAIL - remedial action required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Factors Affecting Readings</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { factor: "Cable Length", effect: "Longer = lower reading" },
                { factor: "Temperature", effect: "Higher = lower reading" },
                { factor: "Humidity", effect: "Higher = lower reading" },
                { factor: "Age", effect: "Older = lower reading" },
                { factor: "Environment", effect: "Harsh = lower reading" },
                { factor: "Cable Type", effect: "Varies by insulation" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">{item.factor}</p>
                  <p className="text-white/60 text-xs">{item.effect}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Note:</strong> Consider all factors when assessing results. A 10 MΩ reading on a 200m industrial circuit is very different from 10 MΩ on a 10m domestic circuit.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="As cable length increases, IR reading:"
          options={[
            "Increases proportionally",
            "Decreases (more parallel paths)",
            "Stays exactly the same",
            "Becomes unstable"
          ]}
          correctIndex={1}
          explanation="Longer cables have more insulation in parallel, reducing overall measured IR. This is normal physics, not degradation."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Individual Test Analysis</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Different test failures indicate different problems:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-semibold">L-E Fails</p>
                <p className="text-white/70 text-sm">Phase insulation to earth compromised. Risk of earth leakage and shock.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">N-E Fails</p>
                <p className="text-white/70 text-sm">Neutral to earth insulation problem. May indicate N-E fault or shared neutral issue.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">L-N Fails</p>
                <p className="text-white/70 text-sm">Conductor-to-conductor breakdown. High risk of short circuit if energised.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">All Three Fail</p>
                <p className="text-white/70 text-sm">Severe insulation breakdown or contamination. Likely water ingress or major damage.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording and Reporting</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Record all readings accurately:
            </p>
            <ul className="space-y-2">
              {[
                "Record actual values in MΩ (not just PASS/FAIL)",
                "Use '>200 MΩ' for readings exceeding meter range",
                "Note test voltage used",
                "Record any equipment disconnected",
                "Include observations (age, conditions, concerns)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <p className="text-elec-yellow text-sm font-semibold">Trending</p>
              <p className="text-white/70 text-sm mt-1">
                Comparing IR values between periodic inspections reveals degradation trends and helps predict when replacement will be needed.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="A reading of 0.8 MΩ indicates:"
          options={[
            "Excellent insulation",
            "Below minimum - investigation required",
            "Normal for older installations",
            "Meter fault"
          ]}
          correctIndex={1}
          explanation="0.8 MΩ is below the 1.0 MΩ minimum. The circuit fails and cannot be energised until the problem is resolved."
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
                <p className="text-emerald-400 font-semibold mb-1">Compare Similar Circuits</p>
                <p className="text-white/70 text-sm">Circuits of similar length and age should have similar readings. An outlier suggests a specific problem.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Re-test Low Readings</p>
                <p className="text-white/70 text-sm">If a reading seems wrong, verify probes are connected properly and re-test. Moisture may dry during testing.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Document Context</p>
                <p className="text-white/70 text-sm">Note weather conditions, building occupancy, and whether heating was on. This helps interpret borderline results.</p>
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
          title="IR Interpretation Reference"
          items={[
            { term: "Min LV Circuits", definition: "≥1.0 MΩ" },
            { term: "Min SELV/PELV", definition: "≥0.5 MΩ" },
            { term: "New Installation", definition: ">100 MΩ or OL" },
            { term: "5-10 Years", definition: "20-100 MΩ typical" },
            { term: "OL Display", definition: "Over Limit - excellent" },
            { term: "<1 MΩ", definition: "FAIL - investigate" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section4')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section6')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section5;
