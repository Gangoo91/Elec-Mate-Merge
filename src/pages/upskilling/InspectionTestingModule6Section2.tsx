import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule6Section2 = () => {
  useSEO({
    title: "RCD Trip Time Testing | Inspection & Testing",
    description: "Learn how to test RCD trip times at rated and 5× rated current, and interpret results."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "RCDs must trip within 300ms at rated residual current (IΔn) and within 40ms at 5×IΔn",
    "Testing is performed at ×1, ×5, and optionally ×½ the rated residual current",
    "Record actual trip times on certificates - must meet BS EN 61008/61009 requirements"
  ];

  const learningOutcomes = [
    { title: "Trip Time Limits", desc: "300ms at IΔn, 40ms at 5×IΔn" },
    { title: "Test Procedure", desc: "How to perform RCD tests" },
    { title: "Test Currents", desc: "×½, ×1, ×5 testing" },
    { title: "Record Results", desc: "Document trip times" },
    { title: "Interpret Results", desc: "Pass/fail criteria" },
    { title: "Troubleshoot", desc: "Common test issues" }
  ];

  const faqs = [
    {
      q: "What are the maximum trip times?",
      a: "At IΔn (rated current): 300ms maximum. At 5×IΔn: 40ms maximum. Time-delayed (S-type) RCDs have different, longer limits as they're designed for discrimination."
    },
    {
      q: "Why test at both ×1 and ×5?",
      a: "The ×1 test confirms the RCD operates at its threshold. The ×5 test verifies fast operation for higher fault currents - important for shock protection where the dangerous current is greater."
    },
    {
      q: "What does the ×½ test confirm?",
      a: "Testing at half rated current (15mA for a 30mA RCD) confirms the RCD does NOT trip. This verifies it won't nuisance trip at normal leakage levels. No trip should occur within the test period."
    },
    {
      q: "Why test at both 0° and 180° phase angles?",
      a: "Fault currents can occur at any point in the AC waveform. Testing at both 0° and 180° checks the RCD operates correctly regardless of when the fault occurs. Record the longer of the two times."
    },
    {
      q: "What if trip time is just at the limit?",
      a: "If trip time is at or near the maximum, the RCD passes but may be deteriorating. Note this and recommend monitoring or replacement. Significantly over the limit is a failure."
    },
    {
      q: "How do I test a 30mA RCD?",
      a: "Set tester to 30mA (×1) for standard trip test. For ×5, set to 150mA. Record actual trip time displayed. Compare to maximum allowed (300ms at 30mA, 40ms at 150mA)."
    }
  ];

  const quizQuestions = [
    {
      question: "A 30mA RCD must trip within what time at rated current?",
      options: ["40ms", "150ms", "300ms", "1000ms"],
      correctIndex: 2,
      explanation: "At rated residual current (IΔn), RCDs must trip within 300ms maximum."
    },
    {
      question: "At 5× rated current, a standard RCD must trip within:",
      options: ["40ms", "150ms", "300ms", "500ms"],
      correctIndex: 0,
      explanation: "At 5×IΔn (150mA for a 30mA RCD), trip time must not exceed 40ms."
    },
    {
      question: "Testing at ×½ (half rated current) should result in:",
      options: [
        "Instant tripping",
        "Trip within 300ms",
        "No trip",
        "Trip within 40ms"
      ],
      correctIndex: 2,
      explanation: "The ×½ test confirms the RCD doesn't trip at currents below threshold, avoiding nuisance tripping."
    },
    {
      question: "For a 30mA RCD, the ×5 test current is:",
      options: ["15mA", "30mA", "150mA", "300mA"],
      correctIndex: 2,
      explanation: "5 × 30mA = 150mA. This is the current used for the 5× trip time test."
    },
    {
      question: "Why test at both 0° and 180° phase angles?",
      options: [
        "To check polarity",
        "To verify operation at any point in AC waveform",
        "To test the MCB",
        "To measure insulation"
      ],
      correctIndex: 1,
      explanation: "Testing both angles confirms the RCD operates correctly regardless of where in the AC cycle the fault occurs."
    },
    {
      question: "When recording trip times, note the:",
      options: [
        "Fastest time",
        "Average of times",
        "Longer of the two times",
        "Shortest time only"
      ],
      correctIndex: 2,
      explanation: "Record the longer trip time (worst case) as this determines compliance with maximum limits."
    },
    {
      question: "S-type (time-delayed) RCDs have trip times that are:",
      options: [
        "Same as standard RCDs",
        "Faster than standard RCDs",
        "Longer than standard RCDs",
        "Not measurable"
      ],
      correctIndex: 2,
      explanation: "S-type RCDs are deliberately time-delayed for discrimination. They have different (longer) maximum trip times."
    },
    {
      question: "If a 30mA RCD trips in 350ms at rated current:",
      options: [
        "This is acceptable",
        "This is a failure",
        "Retest at 180°",
        "Check the fuse"
      ],
      correctIndex: 1,
      explanation: "350ms exceeds the 300ms maximum. The RCD fails and should be replaced."
    },
    {
      question: "The RCD test should be performed:",
      options: [
        "With circuit dead",
        "With supply live to the RCD",
        "Without an earth connection",
        "Only on TT systems"
      ],
      correctIndex: 1,
      explanation: "RCD testing requires live supply. The test injects current to simulate a fault and measures trip response."
    },
    {
      question: "At 15mA (×½ of 30mA RCD), the expected result is:",
      options: [
        "Trip within 40ms",
        "Trip within 300ms",
        "No trip",
        "Trip within 1 second"
      ],
      correctIndex: 2,
      explanation: "At half rated current, the RCD should NOT trip. This confirms it won't nuisance trip at normal leakage levels."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 6</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 2 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full">
            <span className="text-cyan-400 text-sm font-medium">Module 6 • RCD Testing</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            RCD Trip Time Testing
          </h1>
          <p className="text-ios-body text-white/70">
            How to test and verify RCD trip times for compliance.
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
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Link to detailed guide */}
        <Card variant="ios" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Detailed RCD Testing Guide</p>
              <p className="text-white/60 text-sm">Complete procedures with diagrams</p>
            </div>
            <Button
              variant="ios-primary"
              size="sm"
              onClick={() => navigate('/study-centre/upskilling/rcd-testing-guide')}
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
            <h2 className="text-ios-title-2 font-bold text-white">Trip Time Requirements</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <Timer className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-cyan-400 font-semibold">Maximum Trip Times</p>
                <p className="text-white/60 text-sm">Per BS EN 61008/61009</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Test Current</th>
                    <th className="text-center py-2 text-white/60">Standard RCD</th>
                    <th className="text-center py-2 text-white/60">S-Type</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">×½ IΔn</td>
                    <td className="text-center text-emerald-400">No trip</td>
                    <td className="text-center text-emerald-400">No trip</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">×1 IΔn</td>
                    <td className="text-center font-mono">≤300ms</td>
                    <td className="text-center font-mono">130-500ms</td>
                  </tr>
                  <tr>
                    <td className="py-2">×5 IΔn</td>
                    <td className="text-center font-mono text-elec-yellow">≤40ms</td>
                    <td className="text-center font-mono">50-150ms</td>
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
            <h2 className="text-ios-title-2 font-bold text-white">Test Procedure</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                { step: 1, text: "Connect RCD tester to circuit (L-N-E or socket)" },
                { step: 2, text: "Ensure supply is on and RCD is in 'ON' position" },
                { step: 3, text: "Select test current (×½, ×1, or ×5)" },
                { step: 4, text: "Select phase angle (0° or 180°)" },
                { step: 5, text: "Press test button" },
                { step: 6, text: "Record displayed trip time" },
                { step: 7, text: "Reset RCD and repeat at other phase angle" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <InlineCheck
          question="A 30mA RCD must trip within what time at rated current?"
          options={["40ms", "150ms", "300ms", "1000ms"]}
          correctIndex={2}
          explanation="At rated residual current (IΔn), RCDs must trip within 300ms maximum."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Test Currents Explained</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold">×½ Test (15mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Confirms RCD does NOT trip at normal leakage levels. No trip should occur.</p>
              </div>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold">×1 Test (30mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Standard trip test at rated current. Must trip within 300ms.</p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-semibold">×5 Test (150mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Fast trip test for higher faults. Must trip within 40ms.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Phase Angle Testing</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Faults can occur at any point in the AC cycle. Testing at both <strong className="text-white">0°</strong> and <strong className="text-white">180°</strong> confirms reliable operation:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-elec-yellow font-bold text-2xl">0°</p>
                <p className="text-white/60 text-sm">Positive half-cycle</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-cyan-400 font-bold text-2xl">180°</p>
                <p className="text-white/60 text-sm">Negative half-cycle</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Record:</strong> The longer of the two trip times - this is the worst-case performance.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="At 5× rated current, a standard RCD must trip within:"
          options={["40ms", "150ms", "300ms", "500ms"]}
          correctIndex={0}
          explanation="At 5×IΔn (e.g., 150mA for a 30mA RCD), trip time must not exceed 40ms."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Document for each RCD:
            </p>
            <ul className="space-y-2">
              {[
                "RCD rating (30mA, 100mA, etc.)",
                "RCD type (AC, A, F, B, S-type)",
                "Trip time at ×1 IΔn (both angles)",
                "Trip time at ×5 IΔn (both angles)",
                "×½ result (no trip confirmed)",
                "Operating current if ramp tested"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <InlineCheck
          question="When recording trip times, note the:"
          options={[
            "Fastest time",
            "Average of times",
            "Longer of the two times",
            "Shortest time only"
          ]}
          correctIndex={2}
          explanation="Record the longer (worst case) trip time as this determines compliance with maximum limits."
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
                <p className="text-emerald-400 font-semibold mb-1">Warn Occupants</p>
                <p className="text-white/70 text-sm">RCD testing will cut power. Notify building users and check sensitive equipment.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Test All Applicable</p>
                <p className="text-white/70 text-sm">Test every RCD in the installation at both ×1 and ×5 with both phase angles.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Near-Limit Times</p>
                <p className="text-white/70 text-sm">If times are close to maximum, note concern. The RCD may be deteriorating.</p>
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
          title="RCD Trip Time Reference"
          items={[
            { term: "×1 IΔn Standard", definition: "≤300ms" },
            { term: "×5 IΔn Standard", definition: "≤40ms" },
            { term: "×½ IΔn", definition: "No trip" },
            { term: "30mA ×5", definition: "150mA test current" },
            { term: "S-type ×1", definition: "130-500ms" },
            { term: "Phase Angles", definition: "Test 0° and 180°" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6/section1')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6/section3')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule6Section2;
