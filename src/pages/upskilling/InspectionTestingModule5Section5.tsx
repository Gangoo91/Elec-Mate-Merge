import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section5 = () => {
  useSEO({
    title: "Prospective Fault Current | Inspection & Testing",
    description: "Understanding and calculating prospective fault current (PSCC/PFC) for protective device selection."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Prospective fault current (PSCC) is the maximum current that could flow during a short circuit",
    "It's calculated using Ipf = Uo / Zs where Uo is nominal voltage (230V)",
    "Protective devices must have breaking capacity greater than PSCC"
  ];

  const learningOutcomes = [
    { title: "Understand PSCC", desc: "What prospective fault current is" },
    { title: "Calculate Values", desc: "Use Ipf = Uo / Zs" },
    { title: "Breaking Capacity", desc: "Match devices to PSCC" },
    { title: "Measurement Methods", desc: "How to measure PSCC" },
    { title: "Record Values", desc: "Document on certificates" },
    { title: "Typical Values", desc: "Expected ranges" }
  ];

  const faqs = [
    {
      q: "Why is PSCC important?",
      a: "If a short circuit occurs, the fault current must be interrupted by the protective device. If fault current exceeds the device's breaking capacity, the device may fail catastrophically - potentially causing fire, explosion, or continuing the fault."
    },
    {
      q: "What's the difference between PSCC and PEFC?",
      a: "PSCC (Prospective Short Circuit Current) is the fault current for a line-neutral fault. PEFC (Prospective Earth Fault Current) is for a line-earth fault. PSCC is usually higher because neutral impedance is typically lower than earth path impedance."
    },
    {
      q: "Where is PSCC measured?",
      a: "PSCC should be measured or calculated at the origin of the installation (highest value) and at each distribution board. The value decreases along circuit lengths as impedance increases."
    },
    {
      q: "What breaking capacity do domestic MCBs have?",
      a: "Standard domestic MCBs typically have 6kA breaking capacity (Icn). Most domestic supplies have PSCC well under 6kA (typically 1-3kA). Industrial MCBs may have 10kA or higher ratings."
    },
    {
      q: "Can I calculate PSCC from Zs?",
      a: "Yes: Ipf = Uo / Zs where Uo = 230V. For example, if Zs = 0.5Ω: Ipf = 230 / 0.5 = 460A. Modern testers often display PSCC directly as well as impedance."
    },
    {
      q: "What if PSCC exceeds device rating?",
      a: "The protective device is inadequate. Options: use a device with higher breaking capacity, add upstream back-up protection (e.g., fuse), or introduce impedance to limit fault current. This is critical for safety."
    }
  ];

  const quizQuestions = [
    {
      question: "Prospective fault current is:",
      options: [
        "Normal load current",
        "Maximum current during a short circuit",
        "Current during insulation test",
        "Leakage current"
      ],
      correctIndex: 1,
      explanation: "PSCC is the maximum fault current that could flow during a short circuit at a given point."
    },
    {
      question: "The formula for calculating PSCC is:",
      options: ["Ipf = Uo × Zs", "Ipf = Uo / Zs", "Ipf = Zs / Uo", "Ipf = Uo - Zs"],
      correctIndex: 1,
      explanation: "Ipf = Uo / Zs (Ohm's Law). Where Uo is nominal voltage (230V) and Zs is earth fault loop impedance."
    },
    {
      question: "If Zs = 0.5Ω, the PSCC is:",
      options: ["115A", "230A", "460A", "920A"],
      correctIndex: 2,
      explanation: "Ipf = 230V / 0.5Ω = 460A"
    },
    {
      question: "Protective device breaking capacity must be:",
      options: [
        "Equal to PSCC",
        "Less than PSCC",
        "Greater than PSCC",
        "Double the PSCC"
      ],
      correctIndex: 2,
      explanation: "Breaking capacity must exceed PSCC to safely interrupt the maximum possible fault current without damage."
    },
    {
      question: "Typical domestic PSCC is:",
      options: ["<500A", "1-3kA", "10-20kA", ">50kA"],
      correctIndex: 1,
      explanation: "Domestic supplies typically have PSCC of 1-3kA, well within standard 6kA MCB breaking capacity."
    },
    {
      question: "PSCC is highest at:",
      options: [
        "The furthest point from supply",
        "The origin of the installation",
        "All points are equal",
        "Only socket outlets"
      ],
      correctIndex: 1,
      explanation: "PSCC is highest at the origin where impedance is lowest. It decreases along circuits as impedance increases."
    },
    {
      question: "Standard domestic MCBs have breaking capacity of:",
      options: ["1kA", "3kA", "6kA", "10kA"],
      correctIndex: 2,
      explanation: "Standard domestic MCBs (Type B/C) typically have 6kA (6000A) breaking capacity."
    },
    {
      question: "If PSCC exceeds device breaking capacity:",
      options: [
        "It's acceptable",
        "The device may fail catastrophically during a fault",
        "The circuit will work normally",
        "Only labelling is needed"
      ],
      correctIndex: 1,
      explanation: "If PSCC exceeds breaking capacity, the device may explode, burn, or fail to clear the fault - creating serious hazards."
    },
    {
      question: "PSCC should be recorded on:",
      options: [
        "Only new installations",
        "Only industrial sites",
        "All electrical certificates at the origin",
        "Only TT systems"
      ],
      correctIndex: 2,
      explanation: "PSCC at the origin must be recorded on Electrical Installation Certificates and Periodic Inspection Reports."
    },
    {
      question: "Lower Zs means:",
      options: [
        "Lower PSCC",
        "Higher PSCC",
        "No effect on PSCC",
        "Zero PSCC"
      ],
      correctIndex: 1,
      explanation: "Lower Zs allows more current to flow (Ipf = V/Z). Lower impedance = higher prospective fault current."
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
          <span className="text-sm text-white/50 font-medium">Section 5 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Prospective Fault Current
          </h1>
          <p className="text-ios-body text-white/70">
            Understanding PSCC calculation and protective device selection.
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
            <h2 className="text-ios-title-2 font-bold text-white">What is PSCC?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              <strong className="text-white">Prospective Short Circuit Current (PSCC)</strong> is the maximum
              current that would flow if a short circuit occurred at a specific point in the installation.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">Why It Matters</p>
              <p className="text-white/70 text-sm">
                Protective devices must be able to safely interrupt this current. If PSCC exceeds the device's
                breaking capacity, the device could explode, burn, or fail to clear the fault.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">The Calculation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calculator className="w-6 h-6 text-elec-yellow" />
                <p className="text-2xl font-mono text-elec-yellow">Ipf = Uo / Zs</p>
              </div>
              <p className="text-white/60 text-sm">Prospective Fault Current = Voltage ÷ Impedance</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">Example Calculation:</p>
              <p className="text-white/70 text-sm font-mono">
                Uo = 230V (nominal voltage)<br />
                Zs = 0.5Ω (measured impedance)<br />
                Ipf = 230 / 0.5 = <span className="text-elec-yellow">460A</span>
              </p>
            </div>
            <p className="text-white/60 text-sm">
              At the origin where Zs may be 0.1Ω: Ipf = 230 / 0.1 = 2300A (2.3kA)
            </p>
          </Card>
        </section>

        <InlineCheck
          question="If Zs = 0.5Ω, the PSCC is:"
          options={["115A", "230A", "460A", "920A"]}
          correctIndex={2}
          explanation="Ipf = Uo / Zs = 230V / 0.5Ω = 460A"
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Breaking Capacity</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Every protective device has a maximum current it can safely interrupt:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Device Type</th>
                    <th className="text-right py-2 text-white/60">Typical Icn</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Domestic MCB</td>
                    <td className="text-right font-mono text-elec-yellow">6kA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Commercial MCB</td>
                    <td className="text-right font-mono text-blue-400">10kA</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Industrial MCCB</td>
                    <td className="text-right font-mono text-purple-400">25-150kA</td>
                  </tr>
                  <tr>
                    <td className="py-2">HRC Fuse (BS 88)</td>
                    <td className="text-right font-mono text-emerald-400">80kA+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 text-sm">
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                Device breaking capacity must EXCEED measured/calculated PSCC
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Measurement vs Calculation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="grid gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold mb-2">Direct Measurement</p>
                <p className="text-white/70 text-sm">
                  Modern multifunction testers can measure and display PSCC directly (often labelled PFC or I fault).
                  This is the quickest method.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-2">Calculation from Zs</p>
                <p className="text-white/70 text-sm">
                  If your meter shows only impedance, calculate: Ipf = 230 / Zs.
                  Remember to use the lowest Zs (highest PSCC) point.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Protective device breaking capacity must be:"
          options={[
            "Equal to PSCC",
            "Less than PSCC",
            "Greater than PSCC",
            "Double the PSCC"
          ]}
          correctIndex={2}
          explanation="Breaking capacity must exceed PSCC to safely interrupt maximum possible fault current."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Typical Domestic Values</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              For most domestic installations:
            </p>
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">At Origin (Ze ≈ 0.35Ω)</span>
                <span className="text-white font-mono">~650A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Typical Range</span>
                <span className="text-white font-mono">1-3kA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Standard MCB Capacity</span>
                <span className="text-emerald-400 font-mono">6kA</span>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Domestic PSCC rarely exceeds 3kA, so standard 6kA MCBs are adequate.
              Higher values may occur close to transformers.
            </p>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording PSCC</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              PSCC must be recorded on certificates:
            </p>
            <ul className="space-y-2">
              {[
                "Electrical Installation Certificate (EIC)",
                "Periodic Inspection Report (EICR/PIR)",
                "Recorded at the origin of the installation",
                "Also record at distribution boards if significantly different"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Format:</strong> Record as "PSCC: 2.3kA" or "PFC: 2300A" at origin.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="PSCC is highest at:"
          options={[
            "The furthest point from supply",
            "The origin of the installation",
            "All points are equal",
            "Only socket outlets"
          ]}
          correctIndex={1}
          explanation="PSCC is highest at the origin where impedance is lowest. It decreases along circuits as impedance increases."
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
                <p className="text-emerald-400 font-semibold mb-1">Check at Origin</p>
                <p className="text-white/70 text-sm">Always measure PSCC at the origin - it's the highest value and determines minimum device ratings needed.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Use Direct Measurement</p>
                <p className="text-white/70 text-sm">Modern testers display PSCC directly. Quicker than calculating from Zs.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Industrial Sites</p>
                <p className="text-white/70 text-sm">Close to transformers, PSCC can exceed 6kA. Check and specify appropriate device ratings.</p>
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
          title="PSCC Quick Reference"
          items={[
            { term: "Formula", definition: "Ipf = Uo / Zs" },
            { term: "Uo (UK)", definition: "230V nominal" },
            { term: "Domestic MCB", definition: "6kA breaking capacity" },
            { term: "Typical Domestic", definition: "1-3kA at origin" },
            { term: "Record On", definition: "EIC/EICR at origin" },
            { term: "Requirement", definition: "Icn > PSCC" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section4')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section6')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section5;
