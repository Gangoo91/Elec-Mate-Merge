import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section3 = () => {
  useSEO({
    title: "Ze Testing at Origin | Inspection & Testing",
    description: "Learn how to measure external earth fault loop impedance (Ze) at the installation origin."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Ze is the external impedance - everything outside your installation",
    "Measured at the origin with the main earthing conductor disconnected",
    "Essential for circuit design and verifying supply earthing"
  ];

  const learningOutcomes = [
    { title: "Understand Ze", desc: "What external impedance means" },
    { title: "Test Procedure", desc: "How to measure Ze safely" },
    { title: "Typical Values", desc: "Expected Ze for each system" },
    { title: "Disconnection", desc: "Why earthing must be disconnected" },
    { title: "Use Ze Values", desc: "Apply to circuit calculations" },
    { title: "Record Results", desc: "Document findings correctly" }
  ];

  const faqs = [
    {
      q: "Why disconnect the earthing conductor?",
      a: "With the installation earth connected, you measure Zs (total), not Ze. Disconnecting removes your installation from the measurement, leaving only the external supply impedance. This requires the installation to be isolated first."
    },
    {
      q: "Is Ze testing safe?",
      a: "Ze testing is live testing but with your installation isolated. The meter connects to incoming supply terminals. Work carefully - the supply side remains live. Use appropriate PPE and GS38 leads."
    },
    {
      q: "What if Ze is higher than expected?",
      a: "Higher Ze limits circuit lengths and may indicate supply problems. Check: service cable condition, main earth connection, DNO equipment. Report unusually high Ze to the DNO if persistent."
    },
    {
      q: "Can I measure Ze with main switch off?",
      a: "No - the incoming supply must be present to measure Ze. Isolate your installation by opening the main switch, but the supply to the switch must be on. The test is between incoming L and E terminals."
    },
    {
      q: "Why is TT Ze much higher?",
      a: "TT relies on earth electrode resistance (often 20-200Ω) rather than a metallic return. This inherently high Ze is why TT systems always need RCD protection - EFLI alone can't provide fast enough disconnection."
    },
    {
      q: "How often should Ze be measured?",
      a: "At every periodic inspection, and whenever supply conditions may have changed. Also measure if you suspect supply problems or before designing installations requiring low EFLI."
    }
  ];

  const quizQuestions = [
    {
      question: "Ze represents impedance of:",
      options: [
        "Your installation only",
        "External supply only (outside your installation)",
        "The circuit being tested",
        "The earth electrode"
      ],
      correctIndex: 1,
      explanation: "Ze is external earth fault loop impedance - everything outside your installation including supply transformer and cables."
    },
    {
      question: "To measure Ze, the main earthing conductor must be:",
      options: ["Left connected", "Disconnected", "Doubled up", "Extended"],
      correctIndex: 1,
      explanation: "Disconnect the earthing conductor to remove your installation's earth from the measurement, isolating just the external impedance."
    },
    {
      question: "Ze testing is performed with:",
      options: [
        "Installation completely dead",
        "Installation on but main switch open",
        "Incoming supply present, installation isolated",
        "Everything fully energised"
      ],
      correctIndex: 2,
      explanation: "The incoming supply must be present to measure Ze, but your installation should be isolated (main switch off, earthing disconnected)."
    },
    {
      question: "Typical Ze for TN-C-S (PME) is:",
      options: ["≤0.35Ω", "≤0.8Ω", "20-200Ω", ">1000Ω"],
      correctIndex: 0,
      explanation: "TN-C-S (PME) systems have low Ze due to the metallic return path via the combined neutral/earth."
    },
    {
      question: "Typical Ze for TN-S is:",
      options: ["≤0.35Ω", "≤0.8Ω", "20-200Ω", ">1000Ω"],
      correctIndex: 1,
      explanation: "TN-S has higher Ze than PME due to the separate earth conductor, but still relatively low."
    },
    {
      question: "Higher than expected Ze could indicate:",
      options: [
        "Good supply quality",
        "Problems with supply earthing or cables",
        "Your installation is correctly wired",
        "Low fault current capability"
      ],
      correctIndex: 1,
      explanation: "Unexpectedly high Ze suggests supply problems: deteriorated service cable, poor earthing connections, or DNO equipment issues."
    },
    {
      question: "Ze measurement location is:",
      options: [
        "At the furthest socket",
        "At the consumer unit/origin",
        "At the meter",
        "Outside the building"
      ],
      correctIndex: 1,
      explanation: "Ze is measured at the origin (consumer unit) between the incoming line and earth terminals."
    },
    {
      question: "Why is Ze important for circuit design?",
      options: [
        "It determines lamp wattage",
        "Combined with R1+R2 it must not exceed max Zs",
        "It sets the supply voltage",
        "It determines cable colours"
      ],
      correctIndex: 1,
      explanation: "Zs = Ze + R1+R2. Knowing Ze allows calculation of maximum allowable R1+R2 (circuit length/cable size) to meet Zs limits."
    },
    {
      question: "TT systems have high Ze because:",
      options: [
        "The cables are longer",
        "They use earth electrodes instead of metallic return",
        "The supply voltage is higher",
        "The fuses are larger"
      ],
      correctIndex: 1,
      explanation: "TT systems use earth electrodes (20-200Ω typical) rather than a low-resistance metallic return path."
    },
    {
      question: "Before Ze testing, you must:",
      options: [
        "Energise all circuits",
        "Isolate installation and disconnect main earth",
        "Connect additional earth rods",
        "Remove all fuses"
      ],
      correctIndex: 1,
      explanation: "Isolate the installation (main switch off) and disconnect the main earthing conductor before testing Ze."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 5</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 3 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Ze Testing at Origin
          </h1>
          <p className="text-ios-body text-white/70">
            Measuring external earth fault loop impedance at the installation origin.
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
            <h2 className="text-ios-title-2 font-bold text-white">What is Ze?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              <strong className="text-white">Ze</strong> (External earth fault loop impedance) is the impedance of the
              earth fault loop <strong className="text-white">outside</strong> your installation:
            </p>
            <ul className="space-y-2">
              {[
                "Supply transformer winding impedance",
                "DNO service cable (phase conductor)",
                "Return path via earthing system",
                "Service head connections"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Key point:</strong> Ze is fixed by the supply - you cannot change it. It determines the "headroom" available for your circuit wiring (R1+R2).
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Typical Ze Values</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">System</th>
                    <th className="text-center py-2 text-white/60">Typical Ze</th>
                    <th className="text-right py-2 text-white/60">Max (ESQCR)</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3 font-semibold text-elec-yellow">TN-C-S (PME)</td>
                    <td className="text-center font-mono">0.35Ω</td>
                    <td className="text-right">0.35Ω</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 font-semibold text-blue-400">TN-S</td>
                    <td className="text-center font-mono">0.8Ω</td>
                    <td className="text-right">0.8Ω</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-purple-400">TT</td>
                    <td className="text-center font-mono">20-200Ω</td>
                    <td className="text-right">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                If measured Ze significantly exceeds typical values, investigate supply problems.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Typical Ze for TN-C-S (PME) is:"
          options={["≤0.35Ω", "≤0.8Ω", "20-200Ω", ">1000Ω"]}
          correctIndex={0}
          explanation="TN-C-S (PME) has low Ze (≤0.35Ω) due to the metallic combined neutral/earth return path."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Test Procedure</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                { step: 1, text: "Isolate the installation - open main switch", warn: false },
                { step: 2, text: "Disconnect main earthing conductor from MET", warn: true },
                { step: 3, text: "Verify incoming supply is still present", warn: false },
                { step: 4, text: "Connect tester between incoming L and E terminals", warn: false },
                { step: 5, text: "Take Ze reading and record", warn: false },
                { step: 6, text: "Reconnect earthing conductor securely", warn: true },
                { step: 7, text: "Re-energise installation", warn: false }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full ${item.warn ? 'bg-amber-500/20 text-amber-400' : 'bg-orange-500/20 text-orange-400'} text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm font-semibold">Critical:</p>
              <p className="text-white/70 text-sm mt-1">
                Never leave the earthing conductor disconnected. Reconnect and tighten before re-energising.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Disconnect Earth?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              With the installation earth connected, you measure <strong className="text-white">Zs</strong> (total impedance),
              not just <strong className="text-white">Ze</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-orange-400 font-bold mb-1">Earth Connected</p>
                <p className="text-white/60 text-sm">Measures Zs (Ze + installation)</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-emerald-400 font-bold mb-1">Earth Disconnected</p>
                <p className="text-white/60 text-sm">Measures Ze (external only)</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Disconnecting removes your installation's earth path from the measurement circuit, leaving only the external supply impedance.
            </p>
          </Card>
        </section>

        <InlineCheck
          question="To measure Ze, the main earthing conductor must be:"
          options={["Left connected", "Disconnected", "Doubled up", "Extended"]}
          correctIndex={1}
          explanation="Disconnect the earthing conductor to remove your installation from the measurement, isolating just the external impedance."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Using Ze Values</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Ze determines how much "headroom" you have for circuit wiring:
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-lg font-mono text-elec-yellow mb-2">Max R1+R2 = (Max Zs - Ze) ÷ 1.2</p>
              <p className="text-white/60 text-sm">Maximum circuit impedance allowed</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">Example:</p>
              <p className="text-white/70 text-sm font-mono">
                Max Zs = 1.09Ω (32A Type B MCB)<br />
                Ze = 0.35Ω (TN-C-S)<br />
                Max R1+R2 = (1.09 - 0.35) ÷ 1.2 = 0.62Ω
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">High Ze Issues</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              If measured Ze is higher than expected:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Check Main Earth</p>
                <p className="text-white/70 text-sm">Verify the main earthing terminal and connections are secure.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Inspect Service</p>
                <p className="text-white/70 text-sm">Check service head connections and cable condition where visible.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Report to DNO</p>
                <p className="text-white/70 text-sm">If Ze exceeds ESQCR limits consistently, report to the Distribution Network Operator.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Why is Ze important for circuit design?"
          options={[
            "It determines lamp wattage",
            "Combined with R1+R2 it must not exceed max Zs",
            "It sets the supply voltage",
            "It determines cable colours"
          ]}
          correctIndex={1}
          explanation="Zs = Ze + R1+R2. Knowing Ze allows calculation of maximum allowable R1+R2 (circuit length/cable size) to stay within Zs limits."
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
                <p className="text-emerald-400 font-semibold mb-1">Record on Every Inspection</p>
                <p className="text-white/70 text-sm">Ze should be measured at every periodic inspection. Changes may indicate deteriorating supply.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Compare to Previous</p>
                <p className="text-white/70 text-sm">Compare current Ze to previous results. Significant increase warrants investigation.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Design Margin</p>
                <p className="text-white/70 text-sm">Allow margin in circuit design - Ze may vary. Don't design to exact limits.</p>
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
          title="Ze Testing Reference"
          items={[
            { term: "TN-C-S (PME)", definition: "≤0.35Ω typical" },
            { term: "TN-S", definition: "≤0.8Ω typical" },
            { term: "TT", definition: "20-200Ω (varies)" },
            { term: "Test Location", definition: "At origin/consumer unit" },
            { term: "Earth Status", definition: "Disconnected for test" },
            { term: "Purpose", definition: "Determine circuit headroom" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section2')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section4')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section3;
