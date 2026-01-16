import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule3Section4 = () => {
  useSEO({
    title: "Supplementary Bonding Verification | Inspection & Testing",
    description: "Learn supplementary bonding requirements, testing methods, and compliance verification for special locations."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Supplementary bonding connects exposed and extraneous-conductive-parts in special locations",
    "Required in bathrooms, swimming pools, and locations with increased shock risk",
    "Must have resistance ≤ (50V ÷ Ia) where Ia is the RCD trip current"
  ];

  const learningOutcomes = [
    { title: "Understand Requirements", desc: "Know when supplementary bonding is required" },
    { title: "Identify Conductive Parts", desc: "Recognise what needs bonding" },
    { title: "Test Resistance", desc: "Measure bonding conductor resistance" },
    { title: "Calculate Compliance", desc: "Apply the 50V/Ia formula" },
    { title: "Document Results", desc: "Record supplementary bonding tests" },
    { title: "Verify Connections", desc: "Check bonding clamp integrity" }
  ];

  const faqs = [
    {
      q: "When is supplementary bonding required?",
      a: "Required in special locations like bathrooms (zones 1-3), swimming pools, saunas, and any location where BS 7671 specifies increased shock risk protection. Also needed where automatic disconnection times cannot be achieved."
    },
    {
      q: "What parts need supplementary bonding in a bathroom?",
      a: "All accessible extraneous-conductive-parts: metallic pipes (hot/cold water, gas), radiators, metal baths, exposed metallic structural parts, and any Class I equipment. CPCs of circuits serving the location must also be included."
    },
    {
      q: "What resistance value indicates compliance?",
      a: "The resistance between any two simultaneously accessible parts must satisfy: R ≤ 50V ÷ Ia. For a 30mA RCD, this gives R ≤ 50/0.03 = 1667Ω. In practice, much lower values (typically <1Ω) indicate good connections."
    },
    {
      q: "Can supplementary bonding be omitted from bathrooms?",
      a: "Yes, under Regulation 701.415.2, supplementary bonding can be omitted if: (a) all circuits comply with automatic disconnection requirements, (b) all circuits are RCD-protected at ≤30mA, and (c) all extraneous-conductive-parts are effectively connected to the protective equipotential bonding."
    },
    {
      q: "How do you test supplementary bonding?",
      a: "Use a low-resistance ohmmeter. Connect between the CPC at the local distribution point and each extraneous-conductive-part requiring bonding. Also test between simultaneously accessible parts. Resistance should be very low (<1Ω typically)."
    },
    {
      q: "What size conductor is required for supplementary bonding?",
      a: "Per BS 7671 Table 54.8: minimum 2.5mm² if mechanically protected, 4mm² if not. The CSA must be not less than half the CPC of the circuit, with a minimum of 2.5mm²."
    }
  ];

  const quizQuestions = [
    {
      question: "What formula determines supplementary bonding compliance?",
      options: ["R ≤ 50V × Ia", "R ≤ 50V ÷ Ia", "R ≤ 230V ÷ Ia", "R ≤ Ia × Zs"],
      correctIndex: 1,
      explanation: "The resistance must satisfy R ≤ 50V ÷ Ia, where Ia is the operating current of the protective device (typically RCD trip current)."
    },
    {
      question: "For a 30mA RCD, what is the maximum permissible supplementary bonding resistance?",
      options: ["50Ω", "167Ω", "1667Ω", "16670Ω"],
      correctIndex: 2,
      explanation: "R ≤ 50V ÷ 0.03A = 1667Ω. However, practical connections should be much lower than this maximum."
    },
    {
      question: "What is the minimum supplementary bonding conductor size if mechanically protected?",
      options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
      correctIndex: 1,
      explanation: "Per BS 7671 Table 54.8, minimum 2.5mm² if mechanically protected, 4mm² if not mechanically protected."
    },
    {
      question: "Which of these does NOT typically require supplementary bonding in a bathroom?",
      options: ["Metal water pipes", "Plastic waste pipes", "Metal bath", "Radiator"],
      correctIndex: 1,
      explanation: "Plastic pipes are not extraneous-conductive-parts and do not require bonding. Only metallic parts that could introduce a potential need bonding."
    },
    {
      question: "Under what conditions can supplementary bonding be omitted from a bathroom?",
      options: [
        "If the installation is less than 5 years old",
        "If all circuits are RCD-protected and main bonding is in place",
        "If SELV lighting is used",
        "It can never be omitted"
      ],
      correctIndex: 1,
      explanation: "Regulation 701.415.2 permits omission if automatic disconnection requirements are met, all circuits have ≤30mA RCD protection, and main protective bonding is effective."
    },
    {
      question: "What instrument is used for supplementary bonding tests?",
      options: ["Insulation resistance tester", "Earth fault loop impedance tester", "Low-resistance ohmmeter", "RCD tester"],
      correctIndex: 2,
      explanation: "A low-resistance ohmmeter measures the small resistances in bonding conductors, typically giving readings in milliohms."
    },
    {
      question: "What does 'simultaneously accessible' mean for bonding?",
      options: [
        "Parts that can be seen at the same time",
        "Parts that can be touched at the same time",
        "Parts in the same room",
        "Parts on the same circuit"
      ],
      correctIndex: 1,
      explanation: "Simultaneously accessible means parts that could be touched at the same time, creating a potential shock hazard if at different potentials."
    },
    {
      question: "The supplementary bonding conductor size must be at least:",
      options: [
        "Equal to the circuit CPC",
        "Half the circuit CPC (min 2.5mm²)",
        "Quarter the circuit CPC",
        "Same as the phase conductor"
      ],
      correctIndex: 1,
      explanation: "The supplementary bonding conductor must be not less than half the CPC, with an absolute minimum of 2.5mm² (protected) or 4mm² (unprotected)."
    },
    {
      question: "In zone 1 of a bathroom, which bonding connection method is NOT acceptable?",
      options: ["BS 951 clamp", "Compression fitting", "Solder joint", "Mechanical connector"],
      correctIndex: 2,
      explanation: "Soldered connections are not acceptable for protective bonding as the solder could melt under fault conditions, compromising the protective connection."
    },
    {
      question: "What reading would typically indicate a good supplementary bonding connection?",
      options: ["<1Ω", "<100Ω", "<500Ω", "<1667Ω"],
      correctIndex: 0,
      explanation: "While the formula allows up to 1667Ω for a 30mA RCD, practical bonding connections should be <1Ω, indicating sound metallic connections throughout."
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
          <span className="text-sm text-white/50 font-medium">Section 4 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">Module 3 • Continuity Testing</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Supplementary Bonding Verification
          </h1>
          <p className="text-ios-body text-white/70">
            Understanding when supplementary bonding is required, testing methods, and compliance calculations.
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
            <h2 className="text-ios-title-2 font-bold text-white">What is Supplementary Bonding?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              <strong className="text-white">Supplementary bonding</strong> is an additional protective measure that connects
              all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within a specific
              location. It creates a local equipotential zone to reduce touch voltage during faults.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Key Difference:</strong> Main protective bonding connects at the origin
                of the installation; supplementary bonding provides additional local protection in high-risk areas.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">When is it Required?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              BS 7671 requires supplementary bonding in <strong className="text-white">special locations</strong> where
              there is increased shock risk:
            </p>
            <ul className="space-y-2">
              {[
                "Bathrooms - Section 701",
                "Swimming pools and fountains - Section 702",
                "Saunas and steam rooms - Section 703",
                "Agricultural premises - Section 705",
                "Medical locations - Section 710"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Also required where automatic disconnection times cannot be met, or where touch voltage limits require additional protection.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What is the primary purpose of supplementary bonding?"
          options={[
            "To provide the main earth connection",
            "To create a local equipotential zone",
            "To protect against overcurrent",
            "To test insulation resistance"
          ]}
          correctIndex={1}
          explanation="Supplementary bonding creates a local equipotential zone by connecting all simultaneously accessible conductive parts, reducing touch voltage during faults."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Identifying Parts to Bond</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="grid gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-2">Exposed-Conductive-Parts</p>
                <p className="text-white/70 text-sm">Parts of equipment that can be touched and may become live under fault conditions (Class I equipment enclosures).</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-2">Extraneous-Conductive-Parts</p>
                <p className="text-white/70 text-sm">Parts not part of the electrical installation that may introduce a potential (metal pipes, structural steelwork, radiators).</p>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              In a bathroom: metal water pipes, gas pipes, central heating pipes, radiators, metal baths, metal waste pipes,
              and CPCs of circuits in the location all require bonding.
            </p>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">The Compliance Formula</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">R ≤ 50V ÷ Ia</p>
              <p className="text-white/60 text-sm">Where Ia = operating current of protective device</p>
            </div>
            <div className="space-y-3">
              <p className="text-white/80">
                <strong className="text-white">For a 30mA RCD:</strong>
              </p>
              <p className="text-white/70 font-mono text-center">
                R ≤ 50 ÷ 0.03 = 1667Ω
              </p>
              <p className="text-white/60 text-sm">
                While 1667Ω is the theoretical maximum, practical connections should measure well under 1Ω,
                indicating sound metallic continuity throughout the bonding network.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="For a 30mA RCD, what is the maximum permissible resistance between bonded parts?"
          options={["50Ω", "500Ω", "1667Ω", "16670Ω"]}
          correctIndex={2}
          explanation="R ≤ 50V ÷ 0.03A = 1667Ω. This is the calculated maximum, though good connections will measure much lower."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Testing Procedure</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              {[
                { step: 1, text: "Isolate the installation safely" },
                { step: 2, text: "Use a low-resistance ohmmeter (not an insulation tester)" },
                { step: 3, text: "Connect between the CPC at the local distribution point and each bonded part" },
                { step: 4, text: "Also test between simultaneously accessible parts" },
                { step: 5, text: "Record all readings - should be <1Ω typically" },
                { step: 6, text: "Verify calculation: R ≤ 50V ÷ Ia" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Omission of Supplementary Bonding</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              <strong className="text-white">Regulation 701.415.2</strong> permits omission of supplementary bonding
              in bathrooms when ALL conditions are met:
            </p>
            <ul className="space-y-2">
              {[
                "All circuits comply with automatic disconnection requirements",
                "All circuits are protected by a 30mA (or less) RCD",
                "Main protective bonding is in place and effective",
                "All extraneous-conductive-parts are reliably connected to the protective bonding"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Important:</strong> Even when omitted, you must verify main bonding
                is effective and document your reasoning on the certificate.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What minimum conductor size is required for supplementary bonding if mechanically protected?"
          options={["1.5mm²", "2.5mm²", "4mm²", "6mm²"]}
          correctIndex={1}
          explanation="Per BS 7671 Table 54.8, minimum 2.5mm² if mechanically protected, 4mm² if not mechanically protected."
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
                <p className="text-emerald-400 font-semibold mb-1">Use BS 951 Clamps</p>
                <p className="text-white/70 text-sm">Proper earthing clamps ensure reliable connections. Never use soldered joints for protective bonding.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Check for Plastic Inserts</p>
                <p className="text-white/70 text-sm">Modern plumbing often uses plastic fittings. Test continuity - don't assume metal pipes are continuous.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Label Everything</p>
                <p className="text-white/70 text-sm">Apply "SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE" labels to all bonding connections.</p>
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
          title="Supplementary Bonding Quick Reference"
          items={[
            { term: "Compliance Formula", definition: "R ≤ 50V ÷ Ia" },
            { term: "30mA RCD Max R", definition: "1667Ω (practical <1Ω)" },
            { term: "Min CSA (protected)", definition: "2.5mm²" },
            { term: "Min CSA (unprotected)", definition: "4mm²" },
            { term: "Test Instrument", definition: "Low-resistance ohmmeter" },
            { term: "Key Regulation", definition: "BS 7671 Section 415, 701.415" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3/section3')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3/section5')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule3Section4;
