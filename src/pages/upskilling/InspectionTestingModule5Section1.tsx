import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section1 = () => {
  useSEO({
    title: "Earth Fault Path Principles | Inspection & Testing",
    description: "Understand the earth fault loop, its components, and why low impedance is essential for safety."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "The earth fault loop is the complete circuit path for fault current to return to the source",
    "Low impedance ensures high fault current, allowing protective devices to operate quickly",
    "Zs (total) = Ze (external) + R1+R2 (circuit) - must not exceed maximum values"
  ];

  const learningOutcomes = [
    { title: "Understand the Loop", desc: "Know each component of Zs" },
    { title: "Why It Matters", desc: "Relate to disconnection time" },
    { title: "Key Formula", desc: "Zs = Ze + (R1+R2)" },
    { title: "Safety Principles", desc: "How EFLI protects against shock" },
    { title: "Maximum Values", desc: "Why limits exist" },
    { title: "Testing Purpose", desc: "What EFLI testing verifies" }
  ];

  const faqs = [
    {
      q: "What is the earth fault loop?",
      a: "The complete path fault current takes: from the source transformer, through the phase conductor, through the fault, through the CPC back to the consumer unit, then via the earthing conductor and means of earthing back to the transformer neutral/earth point."
    },
    {
      q: "Why must impedance be low?",
      a: "Using Ohm's law (I=V/Z), lower impedance means higher fault current. Higher fault current causes the protective device (MCB, fuse) to operate faster. Fast operation limits the duration someone could receive an electric shock."
    },
    {
      q: "What's the difference between Ze and Zs?",
      a: "Ze is the external earth fault loop impedance - everything outside your installation (transformer, supply cables, DNO earthing). Zs is the total, including your circuit wiring (R1+R2). Zs = Ze + (R1+R2)."
    },
    {
      q: "What happens if Zs is too high?",
      a: "High Zs means low fault current. The protective device may not trip quickly enough (or at all for minor faults). This leaves dangerous voltage on exposed metalwork for longer, increasing shock risk."
    },
    {
      q: "How do maximum Zs values relate to protective devices?",
      a: "Each protective device has a characteristic showing how quickly it operates at different currents. Maximum Zs values are calculated to ensure fault current is high enough to trip the device within required disconnection times (0.4s or 5s)."
    },
    {
      q: "Why does TT earthing have higher external impedance?",
      a: "TT systems use a local earth electrode rather than the supply neutral. Earth electrode resistance (typically 20-200Ω) is much higher than the metallic return path in TN systems, resulting in higher Ze and Zs."
    }
  ];

  const quizQuestions = [
    {
      question: "The earth fault loop includes:",
      options: [
        "Only the circuit protective conductor",
        "The complete path from source, through fault, back to source",
        "Only the earthing conductor",
        "Only the supply cable"
      ],
      correctIndex: 1,
      explanation: "The loop is the complete path: source → phase conductor → fault → CPC → earthing → means of earthing → back to source."
    },
    {
      question: "Low earth fault loop impedance ensures:",
      options: [
        "Low fault current",
        "High fault current for fast device operation",
        "No RCD is needed",
        "Higher cable ratings"
      ],
      correctIndex: 1,
      explanation: "Low impedance allows high fault current (I=V/Z). High current makes protective devices operate faster, limiting shock duration."
    },
    {
      question: "The formula for total earth fault loop impedance is:",
      options: ["Zs = Ze × R1+R2", "Zs = Ze - R1+R2", "Zs = Ze + R1+R2", "Zs = Ze ÷ R1+R2"],
      correctIndex: 2,
      explanation: "Zs = Ze + R1+R2. Total impedance is external impedance plus circuit impedance."
    },
    {
      question: "Ze represents:",
      options: [
        "Total circuit impedance",
        "External impedance (outside the installation)",
        "Earth electrode resistance only",
        "CPC resistance"
      ],
      correctIndex: 1,
      explanation: "Ze is external earth fault loop impedance - everything outside your installation including supply transformer and cables."
    },
    {
      question: "R1+R2 in the Zs formula represents:",
      options: [
        "External supply impedance",
        "Earth electrode resistance",
        "Phase and CPC resistance of the circuit",
        "Protective device rating"
      ],
      correctIndex: 2,
      explanation: "R1+R2 is the combined resistance of the phase conductor (R1) and circuit protective conductor (R2) for the circuit."
    },
    {
      question: "If Zs is too high, the protective device:",
      options: [
        "Will trip instantly",
        "May not trip quickly enough",
        "Will trip before the fault",
        "Is not affected"
      ],
      correctIndex: 1,
      explanation: "High Zs means low fault current. The device may not reach its operating current quickly enough, delaying protection."
    },
    {
      question: "Maximum Zs values are determined by:",
      options: [
        "Cable manufacturer",
        "Customer preference",
        "Protective device characteristics and disconnection time requirements",
        "Length of circuit only"
      ],
      correctIndex: 2,
      explanation: "Maximum Zs ensures fault current is high enough to operate the device within required disconnection times (0.4s or 5s typically)."
    },
    {
      question: "In TT earthing systems, Ze is typically:",
      options: [
        "Very low (<0.5Ω)",
        "Higher due to earth electrode resistance",
        "Zero",
        "Not measurable"
      ],
      correctIndex: 1,
      explanation: "TT systems rely on earth electrodes (typically 20-200Ω) rather than a metallic return, giving higher Ze than TN systems."
    },
    {
      question: "The purpose of EFLI testing is to verify:",
      options: [
        "Insulation quality",
        "The fault loop allows sufficient current for device operation",
        "Polarity only",
        "Cable colours"
      ],
      correctIndex: 1,
      explanation: "EFLI testing confirms the earth fault path has low enough impedance to allow protective device operation within required times."
    },
    {
      question: "What happens during an earth fault?",
      options: [
        "Current flows through the CPC back to source",
        "The circuit continues normally",
        "Nothing - earth faults are harmless",
        "Only the neutral is affected"
      ],
      correctIndex: 0,
      explanation: "During an earth fault, current flows from phase through the fault into the CPC, then back to the source via the earthing system."
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
          <span className="text-sm text-white/50 font-medium">Section 1 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Earth Fault Path Principles
          </h1>
          <p className="text-ios-body text-white/70">
            Understanding the earth fault loop and why low impedance is essential for safety.
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
            <h2 className="text-ios-title-2 font-bold text-white">The Earth Fault Loop</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              When a fault occurs between a live conductor and earth (exposed metalwork), current must flow
              back to the source to be detected. The <strong className="text-white">earth fault loop</strong> is
              this complete circuit path.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">The Loop Path (TN-C-S):</p>
              <ol className="space-y-1 text-white/70 text-sm list-decimal list-inside">
                <li>Source transformer winding</li>
                <li>Supply phase conductor to installation</li>
                <li>Circuit phase conductor (R1)</li>
                <li>The fault itself</li>
                <li>Circuit protective conductor CPC (R2)</li>
                <li>Main earthing terminal</li>
                <li>Earthing conductor</li>
                <li>Means of earthing (supply cable sheath/PEN)</li>
                <li>Back to transformer</li>
              </ol>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Low Impedance Matters</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">I = V / Z</p>
              <p className="text-white/60 text-sm">Fault Current = Voltage ÷ Impedance</p>
            </div>
            <div className="space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold">Low Z = High I</p>
                <p className="text-white/70 text-sm">Low impedance allows high fault current to flow</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold">High I = Fast Trip</p>
                <p className="text-white/70 text-sm">High current causes quick protective device operation</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold">Fast Trip = Safety</p>
                <p className="text-white/70 text-sm">Quick disconnection limits shock duration and energy</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Why must earth fault loop impedance be low?"
          options={[
            "To reduce cable heating",
            "To allow high fault current for fast device operation",
            "To save energy",
            "To reduce cable costs"
          ]}
          correctIndex={1}
          explanation="Low impedance allows high fault current (I=V/Z). High current operates protective devices quickly, limiting shock duration."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">The Key Formula</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2)</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-elec-yellow font-bold text-xl">Zs</p>
                  <p className="text-white/60 text-xs">Total loop impedance</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-orange-400 font-bold text-xl">Ze</p>
                  <p className="text-white/60 text-xs">External impedance</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-emerald-400 font-bold text-xl">R1+R2</p>
                  <p className="text-white/60 text-xs">Circuit impedance</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                R1 = phase conductor resistance | R2 = CPC resistance
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">External vs Circuit Impedance</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-orange-400 font-semibold">Ze - External Impedance</p>
                <p className="text-white/70 text-sm">Everything outside your installation: supply transformer, DNO cables, service head, earthing arrangement. You cannot change this - it's provided by the supply.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">R1+R2 - Circuit Impedance</p>
                <p className="text-white/70 text-sm">Your circuit wiring: phase conductor (R1) and CPC (R2). Determined by cable size and length. You control this through design choices.</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Typical Ze values:</strong> TN-C-S ≈ 0.35Ω | TN-S ≈ 0.8Ω | TT = varies with electrode
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="The formula for total earth fault loop impedance is:"
          options={["Zs = Ze × R1+R2", "Zs = Ze - R1+R2", "Zs = Ze + R1+R2", "Zs = Ze ÷ R1+R2"]}
          correctIndex={2}
          explanation="Zs = Ze + R1+R2. Total impedance equals external impedance plus the circuit's phase and CPC resistance."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Maximum Zs Values</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              BS 7671 specifies maximum Zs values for each protective device to ensure disconnection within:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-elec-yellow">0.4s</p>
                <p className="text-white/60 text-sm">Socket outlets & portable equipment</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-400">5s</p>
                <p className="text-white/60 text-sm">Distribution circuits & fixed equipment</p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Maximum Zs values are found in BS 7671 Chapter 41 tables. Values depend on device type and rating.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Earthing Systems</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">System</th>
                    <th className="text-center py-2 text-white/60">Typical Ze</th>
                    <th className="text-right py-2 text-white/60">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-elec-yellow">TN-C-S</td>
                    <td className="text-center">≤0.35Ω</td>
                    <td className="text-right text-xs">PME, combined neutral/earth</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-blue-400">TN-S</td>
                    <td className="text-center">≤0.8Ω</td>
                    <td className="text-right text-xs">Separate earth conductor</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-purple-400">TT</td>
                    <td className="text-center">Higher</td>
                    <td className="text-right text-xs">Earth electrode, needs RCD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Ze represents:"
          options={[
            "Total circuit impedance",
            "External impedance (outside the installation)",
            "Earth electrode resistance only",
            "CPC resistance"
          ]}
          correctIndex={1}
          explanation="Ze is the external earth fault loop impedance - everything outside your installation including the supply network."
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
                <p className="text-emerald-400 font-semibold mb-1">Check Ze First</p>
                <p className="text-white/70 text-sm">Measure Ze at the origin before designing circuits. High Ze limits how long circuits can be.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Temperature Factor</p>
                <p className="text-white/70 text-sm">Multiply measured R1+R2 by 1.2 for Zs verification at conductor operating temperature.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">TT Systems</p>
                <p className="text-white/70 text-sm">On TT, EFLI alone often can't ensure fast enough disconnection - RCD protection is essential.</p>
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
          title="Earth Fault Loop Reference"
          items={[
            { term: "Key Formula", definition: "Zs = Ze + (R1+R2)" },
            { term: "Ze", definition: "External impedance" },
            { term: "R1+R2", definition: "Circuit impedance" },
            { term: "Socket Disconnect", definition: "≤0.4 seconds" },
            { term: "Distribution Disconnect", definition: "≤5 seconds" },
            { term: "Temp Correction", definition: "×1.2 for max temp" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5')}
          >
            Back to Module
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section2')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section1;
