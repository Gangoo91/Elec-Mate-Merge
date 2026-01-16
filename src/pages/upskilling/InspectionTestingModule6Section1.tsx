import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule6Section1 = () => {
  useSEO({
    title: "RCD Types and Applications | Inspection & Testing",
    description: "Understanding different RCD types (AC, A, F, B), ratings, and their appropriate applications."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "RCDs detect imbalance between line and neutral, tripping when earth leakage exceeds rated current",
    "Type AC for sinusoidal AC, Type A for pulsating DC, Type B for smooth DC faults",
    "30mA RCDs provide additional protection against electric shock in most circuits"
  ];

  const learningOutcomes = [
    { title: "RCD Principles", desc: "How RCDs detect faults" },
    { title: "Type Classifications", desc: "AC, A, F, B differences" },
    { title: "Ratings", desc: "30mA, 100mA, 300mA uses" },
    { title: "Applications", desc: "Where each type is used" },
    { title: "BS 7671 Requirements", desc: "When RCDs are mandatory" },
    { title: "Limitations", desc: "What RCDs don't protect" }
  ];

  const faqs = [
    {
      q: "How does an RCD work?",
      a: "An RCD has a toroidal core through which line and neutral pass. Under normal conditions, currents are equal and opposite, creating no net magnetic field. During an earth fault, current returns via earth instead of neutral, creating imbalance that is detected and triggers disconnection."
    },
    {
      q: "Why 30mA rating?",
      a: "30mA is chosen because it's below the threshold likely to cause ventricular fibrillation (the most dangerous cardiac arrhythmia). Tests show most people can let go of a conductor carrying 30mA, and exposure for the few milliseconds before RCD trips is survivable."
    },
    {
      q: "When is Type A required instead of Type AC?",
      a: "Type A is required for equipment that may produce pulsating DC fault currents - typically anything with electronic power supplies, rectifiers, or inverters. This includes EV chargers, variable speed drives, and modern electronic equipment."
    },
    {
      q: "What's the difference between RCCB and RCBO?",
      a: "RCCB (Residual Current Circuit Breaker) provides only earth leakage protection. RCBO (Residual Current Breaker with Overcurrent) combines RCD and MCB functions in one device, providing both earth fault and overcurrent protection."
    },
    {
      q: "Can RCDs prevent all electric shocks?",
      a: "No. RCDs don't protect against line-neutral shocks (where you're in series with the load), or shocks between two live conductors. They protect against line-earth faults where current leaks to earth via a person or equipment."
    },
    {
      q: "Why use 100mA or 300mA RCDs?",
      a: "Higher rated RCDs (100mA, 300mA) provide fire protection rather than personal shock protection. They're used for circuits where 30mA would cause nuisance tripping but where earth fault detection is still needed."
    }
  ];

  const quizQuestions = [
    {
      question: "RCDs detect faults by measuring:",
      options: [
        "Voltage between line and earth",
        "Current imbalance between line and neutral",
        "Cable temperature",
        "Insulation resistance"
      ],
      correctIndex: 1,
      explanation: "RCDs detect the difference between current in line and neutral. During an earth fault, some current returns via earth, creating detectable imbalance."
    },
    {
      question: "A 30mA RCD is designed to provide:",
      options: [
        "Fire protection only",
        "Overload protection",
        "Additional protection against electric shock",
        "Short circuit protection"
      ],
      correctIndex: 2,
      explanation: "30mA RCDs provide additional protection against electric shock. The 30mA level is below the threshold for ventricular fibrillation."
    },
    {
      question: "Type A RCDs detect:",
      options: [
        "Only sinusoidal AC fault currents",
        "Sinusoidal AC and pulsating DC fault currents",
        "Only smooth DC fault currents",
        "Only overcurrents"
      ],
      correctIndex: 1,
      explanation: "Type A detects both sinusoidal AC and pulsating DC faults, making it suitable for equipment with electronic power supplies."
    },
    {
      question: "Type AC RCDs are suitable for:",
      options: [
        "EV charging circuits",
        "Simple resistive loads with sinusoidal faults only",
        "Variable speed drives",
        "Solar PV systems"
      ],
      correctIndex: 1,
      explanation: "Type AC only detects sinusoidal AC faults. It's suitable for simple loads but not for electronic equipment that may produce DC faults."
    },
    {
      question: "An RCBO combines:",
      options: [
        "RCD and fuse",
        "RCD and MCB functions",
        "Two RCDs",
        "RCD and surge protection"
      ],
      correctIndex: 1,
      explanation: "RCBO = Residual Current Breaker with Overcurrent protection. It combines RCD (earth fault) and MCB (overcurrent) in one device."
    },
    {
      question: "100mA and 300mA RCDs are primarily for:",
      options: [
        "Personal shock protection",
        "Fire protection",
        "Lighting circuits only",
        "TT systems only"
      ],
      correctIndex: 1,
      explanation: "Higher rated RCDs (100mA, 300mA) provide fire protection by detecting earth leakage before it becomes dangerous, but don't provide personal shock protection."
    },
    {
      question: "RCDs do NOT protect against:",
      options: [
        "Earth faults",
        "Line-neutral shocks (touching L and N)",
        "Leakage to earth",
        "Faults via the CPC"
      ],
      correctIndex: 1,
      explanation: "RCDs don't protect against shocks between line and neutral (series with load) as no current leaks to earth in this scenario."
    },
    {
      question: "Type B RCDs are required for:",
      options: [
        "Standard socket outlets",
        "Lighting circuits",
        "Equipment producing smooth DC fault currents",
        "Simple resistive heaters"
      ],
      correctIndex: 2,
      explanation: "Type B detects all fault types including smooth DC. Required for some EV chargers, medical equipment, and industrial drives."
    },
    {
      question: "The symbol for Type A RCD includes:",
      options: [
        "A sine wave only",
        "A sine wave with half-wave rectified pulse",
        "Smooth DC symbol",
        "No symbol"
      ],
      correctIndex: 1,
      explanation: "Type A is marked with both a sine wave (AC) and a half-wave rectified pulse (pulsating DC) symbol."
    },
    {
      question: "30mA was chosen as a shock protection threshold because:",
      options: [
        "It's a round number",
        "Below ventricular fibrillation threshold",
        "Required by EU law",
        "It's the minimum detectable"
      ],
      correctIndex: 1,
      explanation: "30mA is below the level likely to cause ventricular fibrillation. Most people can let go at this level, and brief exposure is survivable."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 6</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 1 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full">
            <span className="text-cyan-400 text-sm font-medium">Module 6 • RCD Testing</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            RCD Types and Applications
          </h1>
          <p className="text-ios-body text-white/70">
            Understanding different RCD types, ratings, and their appropriate applications.
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
            <h2 className="text-ios-title-2 font-bold text-white">How RCDs Work</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <Shield className="w-10 h-10 text-cyan-400" />
              <div>
                <p className="text-cyan-400 font-semibold">Core Principle</p>
                <p className="text-white/60 text-sm">Detects current imbalance between L and N</p>
              </div>
            </div>
            <p className="text-white/80">
              Under normal conditions, all current flowing out on the line returns via neutral.
              During an earth fault, some current takes an alternative path to earth.
              The RCD detects this imbalance and trips.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Example:</strong> If 10A flows out on line but only 9.97A returns
                via neutral, the 30mA difference is detected and triggers disconnection.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">RCD Types</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold">Type AC</p>
                <p className="text-white/70 text-sm">Detects sinusoidal AC faults only. Basic type for simple resistive loads.</p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-semibold">Type A</p>
                <p className="text-white/70 text-sm">Detects sinusoidal AC and pulsating DC faults. Required for electronic equipment.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold">Type F</p>
                <p className="text-white/70 text-sm">Type A + high frequency fault detection. For VFDs and similar equipment.</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold">Type B</p>
                <p className="text-white/70 text-sm">Detects all fault types including smooth DC. Required for some EV chargers.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Type A RCDs detect:"
          options={[
            "Only sinusoidal AC fault currents",
            "Sinusoidal AC and pulsating DC fault currents",
            "Only smooth DC fault currents",
            "Only overcurrents"
          ]}
          correctIndex={1}
          explanation="Type A detects both sinusoidal AC and pulsating DC faults, suitable for electronic equipment."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Ratings and Applications</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Rating</th>
                    <th className="text-left py-2 text-white/60">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-cyan-400">10mA</td>
                    <td className="py-2">High-risk areas (medical, special)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-elec-yellow">30mA</td>
                    <td className="py-2">Additional shock protection (standard)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-amber-400">100mA</td>
                    <td className="py-2">Fire protection, time-delayed</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-red-400">300mA</td>
                    <td className="py-2">Fire protection, main switch</td>
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
            <h2 className="text-ios-title-2 font-bold text-white">BS 7671 Requirements</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              30mA RCD protection is required for:
            </p>
            <ul className="space-y-2">
              {[
                "Socket outlets rated ≤32A (with exceptions)",
                "Mobile equipment outdoors up to 32A",
                "Cables in walls without mechanical protection",
                "Circuits in bathrooms",
                "TT system fault protection"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Some exceptions exist for labelled sockets, monitored industrial installations, and specific applications.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="A 30mA RCD is designed to provide:"
          options={[
            "Fire protection only",
            "Overload protection",
            "Additional protection against electric shock",
            "Short circuit protection"
          ]}
          correctIndex={2}
          explanation="30mA RCDs provide additional protection against electric shock - the 30mA level is below ventricular fibrillation threshold."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">RCD Limitations</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              RCDs do NOT protect against:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Line-Neutral Shocks</p>
                <p className="text-white/70 text-sm">Touching L and N simultaneously - you're in series with load, no earth leakage.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Overcurrent</p>
                <p className="text-white/70 text-sm">RCDs don't provide overload or short circuit protection (unless RCBO).</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Overvoltage</p>
                <p className="text-white/70 text-sm">Voltage surges or transients are not detected by RCDs.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="RCDs do NOT protect against:"
          options={[
            "Earth faults",
            "Line-neutral shocks",
            "Leakage to earth",
            "Faults via the CPC"
          ]}
          correctIndex={1}
          explanation="RCDs don't protect against L-N shocks (in series with load) as no current leaks to earth."
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
                <p className="text-emerald-400 font-semibold mb-1">Check Type Marking</p>
                <p className="text-white/70 text-sm">Type A RCDs show sine wave + half-wave symbol. Verify correct type for application.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">EV Chargers</p>
                <p className="text-white/70 text-sm">Many require Type A minimum, some require Type B. Check manufacturer requirements.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Nuisance Tripping</p>
                <p className="text-white/70 text-sm">Excessive leakage from multiple circuits can cause tripping. Consider separate RCDs.</p>
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
          title="RCD Types Reference"
          items={[
            { term: "Type AC", definition: "Sinusoidal AC only" },
            { term: "Type A", definition: "AC + pulsating DC" },
            { term: "Type F", definition: "AC + mixed frequency" },
            { term: "Type B", definition: "All fault types inc. DC" },
            { term: "30mA", definition: "Shock protection" },
            { term: "100mA/300mA", definition: "Fire protection" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6')}
          >
            Back to Module
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module6/section2')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule6Section1;
