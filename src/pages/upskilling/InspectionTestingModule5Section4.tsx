import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule5Section4 = () => {
  useSEO({
    title: "Maximum Zs Values | Inspection & Testing",
    description: "Understanding BS 7671 maximum Zs tables for different protective devices and disconnection times."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Maximum Zs values are specified in BS 7671 Chapter 41 tables",
    "Values differ for 0.4s disconnection (sockets) and 5s (distribution)",
    "Device type and rating determine the maximum permitted Zs"
  ];

  const learningOutcomes = [
    { title: "Find Max Zs", desc: "Use BS 7671 tables correctly" },
    { title: "Disconnect Times", desc: "0.4s vs 5s requirements" },
    { title: "Device Types", desc: "MCB types B, C, D differences" },
    { title: "Fuse Values", desc: "BS 88 and BS 1361 limits" },
    { title: "Apply Values", desc: "Compare measured to maximum" },
    { title: "RCD Override", desc: "When RCDs provide backup" }
  ];

  const faqs = [
    {
      q: "Why do sockets need 0.4s disconnection?",
      a: "Socket outlets can supply portable equipment held by users. The 0.4s limit minimises shock duration and energy, protecting against ventricular fibrillation which can occur with longer exposure to dangerous currents."
    },
    {
      q: "When is 5s disconnection acceptable?",
      a: "For distribution circuits and fixed equipment where users are less likely to directly contact faulted parts. Includes lighting circuits, fixed appliances, and distribution boards - equipment people don't normally hold."
    },
    {
      q: "Why does a Type C MCB have lower max Zs than Type B?",
      a: "Type C MCBs trip magnetically at higher current multiples (5-10×In vs 3-5×In for Type B). To achieve the required disconnection time, higher fault current is needed, meaning lower Zs is required."
    },
    {
      q: "What if measured Zs exceeds the maximum?",
      a: "The circuit fails. Options: increase cable size (lower R1+R2), shorten the circuit run, use a device with higher max Zs, or add RCD protection (which can override EFLI for 0.4s requirement)."
    },
    {
      q: "How does RCD protection affect Zs requirements?",
      a: "An RCD will disconnect within 0.4s for any earth fault above its rated residual current (typically 30mA). This can provide 0.4s disconnection even if Zs only meets 5s requirements, but Zs must still allow protective device operation."
    },
    {
      q: "Are the table values at operating temperature?",
      a: "No - BS 7671 maximum Zs values allow for conductor temperature rise. If you measure at ambient temperature, your reading should be well under the maximum to ensure compliance when conductors heat up under fault."
    }
  ];

  const quizQuestions = [
    {
      question: "Maximum Zs values are found in BS 7671:",
      options: ["Chapter 41 tables", "Chapter 52", "Appendix 5B", "Part 7"],
      correctIndex: 0,
      explanation: "BS 7671 Chapter 41 contains the maximum Zs tables for various protective devices and disconnection times."
    },
    {
      question: "Socket outlets require disconnection within:",
      options: ["0.1s", "0.4s", "1s", "5s"],
      correctIndex: 1,
      explanation: "Socket outlets require 0.4s maximum disconnection time to protect users who may be holding portable equipment."
    },
    {
      question: "Distribution circuits can have disconnection time of:",
      options: ["0.4s only", "5s maximum", "Any time", "10s"],
      correctIndex: 1,
      explanation: "Distribution circuits and fixed equipment can have 5s disconnection as users are less likely to directly contact faulted parts."
    },
    {
      question: "A 32A Type B MCB has max Zs (0.4s) of approximately:",
      options: ["0.27Ω", "0.72Ω", "1.09Ω", "1.44Ω"],
      correctIndex: 2,
      explanation: "A 32A Type B MCB has maximum Zs of approximately 1.09Ω for 0.4s disconnection (check current BS 7671 tables for exact values)."
    },
    {
      question: "Type C MCBs have lower max Zs than Type B because:",
      options: [
        "They are cheaper",
        "They trip magnetically at higher current multiples",
        "They are older technology",
        "They are used for lighting only"
      ],
      correctIndex: 1,
      explanation: "Type C trips at 5-10×In vs Type B at 3-5×In. Higher current needed means lower impedance required."
    },
    {
      question: "If measured Zs exceeds the maximum, you can:",
      options: [
        "Accept the circuit anyway",
        "Increase cable size or add RCD protection",
        "Increase the MCB rating",
        "Only retest later"
      ],
      correctIndex: 1,
      explanation: "Options include: larger cables (lower R1+R2), shorter runs, different device type, or RCD protection for 0.4s requirement."
    },
    {
      question: "An RCD can provide 0.4s disconnection when:",
      options: [
        "Zs meets 5s requirements but not 0.4s",
        "There is no earth fault",
        "The circuit is overloaded",
        "Zs exceeds all limits"
      ],
      correctIndex: 0,
      explanation: "RCDs trip within 40ms for faults above their rating. If Zs meets 5s limits, the RCD provides the faster 0.4s protection."
    },
    {
      question: "Maximum Zs values in BS 7671 allow for:",
      options: [
        "Only ambient temperature",
        "Conductor temperature rise under fault",
        "Summer temperatures only",
        "No temperature effects"
      ],
      correctIndex: 1,
      explanation: "The tabulated values already account for conductor heating. Ambient measurements should be well below these to ensure compliance."
    },
    {
      question: "For a 6A Type B MCB at 0.4s, max Zs is approximately:",
      options: ["1.82Ω", "3.64Ω", "5.78Ω", "7.28Ω"],
      correctIndex: 3,
      explanation: "Lower rated MCBs have higher max Zs because they trip at lower currents. 6A Type B allows approximately 7.28Ω."
    },
    {
      question: "Lighting circuits typically use which disconnection time?",
      options: ["0.2s", "0.4s", "5s", "10s"],
      correctIndex: 2,
      explanation: "Lighting is fixed equipment, so 5s disconnection is generally acceptable (though 0.4s often achieved anyway)."
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
          <span className="text-sm text-white/50 font-medium">Section 4 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">Module 5 • Earth Fault Loop</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Maximum Zs Values
          </h1>
          <p className="text-ios-body text-white/70">
            Understanding BS 7671 maximum impedance tables for protective devices.
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
            <h2 className="text-ios-title-2 font-bold text-white">Disconnection Time Requirements</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-elec-yellow">0.4s</p>
                <p className="text-white/60 text-sm mt-2">Socket Outlets</p>
                <p className="text-white/40 text-xs">Portable equipment</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-blue-400">5s</p>
                <p className="text-white/60 text-sm mt-2">Distribution</p>
                <p className="text-white/40 text-xs">Fixed equipment</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              The shorter time for sockets protects users who may be holding equipment during a fault.
            </p>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">MCB Type Comparison</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Table className="w-6 h-6 text-elec-yellow" />
              <p className="text-white font-semibold">Typical Max Zs at 0.4s (Ω)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Rating</th>
                    <th className="text-center py-2 text-elec-yellow">Type B</th>
                    <th className="text-center py-2 text-blue-400">Type C</th>
                    <th className="text-center py-2 text-purple-400">Type D</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 font-mono">
                  <tr className="border-b border-white/10">
                    <td className="py-2">6A</td>
                    <td className="text-center">7.28</td>
                    <td className="text-center">3.64</td>
                    <td className="text-center">1.82</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">16A</td>
                    <td className="text-center">2.73</td>
                    <td className="text-center">1.37</td>
                    <td className="text-center">0.68</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">32A</td>
                    <td className="text-center">1.37</td>
                    <td className="text-center">0.68</td>
                    <td className="text-center">0.34</td>
                  </tr>
                  <tr>
                    <td className="py-2">40A</td>
                    <td className="text-center">1.09</td>
                    <td className="text-center">0.55</td>
                    <td className="text-center">0.27</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Values are indicative. Always refer to current BS 7671 tables for exact figures.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Socket outlets require disconnection within:"
          options={["0.1s", "0.4s", "1s", "5s"]}
          correctIndex={1}
          explanation="Socket outlets require 0.4s maximum disconnection time to protect users holding portable equipment."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Types Differ</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              MCB types have different magnetic trip thresholds:
            </p>
            <div className="space-y-3">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold">Type B: 3-5× In</p>
                <p className="text-white/70 text-sm">Trips magnetically at 3-5 times rated current. Highest max Zs - most lenient.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold">Type C: 5-10× In</p>
                <p className="text-white/70 text-sm">Trips at 5-10 times rated. Lower max Zs - needs higher fault current.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold">Type D: 10-20× In</p>
                <p className="text-white/70 text-sm">Trips at 10-20 times rated. Lowest max Zs - very high fault current needed.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Using the Tables</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                { step: 1, text: "Identify the protective device type and rating" },
                { step: 2, text: "Determine required disconnection time (0.4s or 5s)" },
                { step: 3, text: "Look up maximum Zs in BS 7671 Chapter 41" },
                { step: 4, text: "Compare your measured Zs to this maximum" },
                { step: 5, text: "If measured ≤ maximum = PASS" }
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

        <InlineCheck
          question="Type C MCBs have lower max Zs than Type B because:"
          options={[
            "They are cheaper",
            "They trip magnetically at higher current multiples",
            "They are older technology",
            "They are used for lighting only"
          ]}
          correctIndex={1}
          explanation="Type C trips at 5-10×In vs Type B at 3-5×In. Higher current is needed to trip, requiring lower impedance."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">RCD Override</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              RCDs can provide the 0.4s requirement even when EFLI only meets 5s values:
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 font-semibold mb-2">RCD Trip Time</p>
              <p className="text-white/70 text-sm">
                A 30mA RCD must trip within 300ms at rated current, and typically within 40ms at 5×In.
                This is well under the 0.4s requirement.
              </p>
            </div>
            <p className="text-white/70 text-sm">
              <strong className="text-elec-yellow">Important:</strong> Zs must still be low enough to operate
              the overcurrent device eventually (to clear sustained faults), but the RCD provides the fast
              shock protection.
            </p>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">When Zs Exceeds Maximum</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              If measured Zs exceeds the maximum for 0.4s disconnection:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Increase Cable Size</p>
                <p className="text-white/70 text-sm">Larger cables have lower R1+R2, reducing Zs.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Shorten Run</p>
                <p className="text-white/70 text-sm">Shorter cable length means lower resistance.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Change Device Type</p>
                <p className="text-white/70 text-sm">Type B has higher max Zs than Type C or D.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-semibold">Add RCD Protection</p>
                <p className="text-white/70 text-sm">RCD provides 0.4s protection regardless of Zs (if meeting 5s limits).</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="An RCD can provide 0.4s disconnection when:"
          options={[
            "Zs meets 5s requirements but not 0.4s",
            "There is no earth fault",
            "The circuit is overloaded",
            "Zs exceeds all limits"
          ]}
          correctIndex={0}
          explanation="If Zs meets 5s limits but not 0.4s, an RCD provides the faster protection. Zs must still allow eventual device operation."
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
                <p className="text-emerald-400 font-semibold mb-1">Keep Tables Handy</p>
                <p className="text-white/70 text-sm">Have BS 7671 Chapter 41 tables available on site for quick reference during testing.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Design Margin</p>
                <p className="text-white/70 text-sm">Design circuits to achieve 80% of max Zs to allow for variations and temperature effects.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Check Both Times</p>
                <p className="text-white/70 text-sm">Verify both 0.4s and 5s requirements where relevant - particularly for sockets on distribution circuits.</p>
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
          title="Max Zs Quick Reference"
          items={[
            { term: "0.4s Disconnection", definition: "Socket outlets" },
            { term: "5s Disconnection", definition: "Fixed/distribution" },
            { term: "Type B (32A)", definition: "~1.37Ω at 0.4s" },
            { term: "Type C (32A)", definition: "~0.68Ω at 0.4s" },
            { term: "Tables Location", definition: "BS 7671 Chapter 41" },
            { term: "RCD Backup", definition: "Can provide 0.4s" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section3')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5/section5')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule5Section4;
