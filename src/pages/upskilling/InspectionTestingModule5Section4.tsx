import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maximum Zs Values - Module 5 Section 4";
const DESCRIPTION = "Understanding BS 7671 maximum Zs tables for different protective devices and disconnection times.";

const quickCheckQuestions = [
  {
    id: "socket-disconnect",
    question: "Socket outlets require disconnection within:",
    options: ["0.1s", "0.4s", "1s", "5s"],
    correctIndex: 1,
    explanation: "Socket outlets require 0.4s maximum disconnection time to protect users holding portable equipment."
  },
  {
    id: "type-c-reason",
    question: "Type C MCBs have lower max Zs than Type B because:",
    options: [
      "They are cheaper",
      "They trip magnetically at higher current multiples",
      "They are older technology",
      "They are used for lighting only"
    ],
    correctIndex: 1,
    explanation: "Type C trips at 5-10×In vs Type B at 3-5×In. Higher current is needed to trip, requiring lower impedance."
  },
  {
    id: "rcd-backup",
    question: "An RCD can provide 0.4s disconnection when:",
    options: [
      "Zs meets 5s requirements but not 0.4s",
      "There is no earth fault",
      "The circuit is overloaded",
      "Zs exceeds all limits"
    ],
    correctIndex: 0,
    explanation: "If Zs meets 5s limits but not 0.4s, an RCD provides the faster protection. Zs must still allow eventual device operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Maximum Zs values are found in BS 7671:",
    options: ["Chapter 41 tables", "Chapter 52", "Appendix 5B", "Part 7"],
    correctAnswer: 0,
    explanation: "BS 7671 Chapter 41 contains the maximum Zs tables for various protective devices and disconnection times."
  },
  {
    id: 2,
    question: "Socket outlets require disconnection within:",
    options: ["0.1s", "0.4s", "1s", "5s"],
    correctAnswer: 1,
    explanation: "Socket outlets require 0.4s maximum disconnection time to protect users who may be holding portable equipment."
  },
  {
    id: 3,
    question: "Distribution circuits can have disconnection time of:",
    options: ["0.4s only", "5s maximum", "Any time", "10s"],
    correctAnswer: 1,
    explanation: "Distribution circuits and fixed equipment can have 5s disconnection as users are less likely to directly contact faulted parts."
  },
  {
    id: 4,
    question: "A 32A Type B MCB has max Zs (0.4s) of approximately:",
    options: ["0.27Ω", "0.72Ω", "1.09Ω", "1.44Ω"],
    correctAnswer: 2,
    explanation: "A 32A Type B MCB has maximum Zs of approximately 1.09Ω for 0.4s disconnection (check current BS 7671 tables for exact values)."
  },
  {
    id: 5,
    question: "Type C MCBs have lower max Zs than Type B because:",
    options: [
      "They are cheaper",
      "They trip magnetically at higher current multiples",
      "They are older technology",
      "They are used for lighting only"
    ],
    correctAnswer: 1,
    explanation: "Type C trips at 5-10×In vs Type B at 3-5×In. Higher current needed means lower impedance required."
  },
  {
    id: 6,
    question: "If measured Zs exceeds the maximum, you can:",
    options: [
      "Accept the circuit anyway",
      "Increase cable size or add RCD protection",
      "Increase the MCB rating",
      "Only retest later"
    ],
    correctAnswer: 1,
    explanation: "Options include: larger cables (lower R1+R2), shorter runs, different device type, or RCD protection for 0.4s requirement."
  },
  {
    id: 7,
    question: "An RCD can provide 0.4s disconnection when:",
    options: [
      "Zs meets 5s requirements but not 0.4s",
      "There is no earth fault",
      "The circuit is overloaded",
      "Zs exceeds all limits"
    ],
    correctAnswer: 0,
    explanation: "RCDs trip within 40ms for faults above their rating. If Zs meets 5s limits, the RCD provides the faster 0.4s protection."
  },
  {
    id: 8,
    question: "Maximum Zs values in BS 7671 allow for:",
    options: [
      "Only ambient temperature",
      "Conductor temperature rise under fault",
      "Summer temperatures only",
      "No temperature effects"
    ],
    correctAnswer: 1,
    explanation: "The tabulated values already account for conductor heating. Ambient measurements should be well below these to ensure compliance."
  },
  {
    id: 9,
    question: "For a 6A Type B MCB at 0.4s, max Zs is approximately:",
    options: ["1.82Ω", "3.64Ω", "5.78Ω", "7.28Ω"],
    correctAnswer: 3,
    explanation: "Lower rated MCBs have higher max Zs because they trip at lower currents. 6A Type B allows approximately 7.28Ω."
  },
  {
    id: 10,
    question: "Lighting circuits typically use which disconnection time?",
    options: ["0.2s", "0.4s", "5s", "10s"],
    correctAnswer: 2,
    explanation: "Lighting is fixed equipment, so 5s disconnection is generally acceptable (though 0.4s often achieved anyway)."
  }
];

const faqs = [
  {
    question: "Why do sockets need 0.4s disconnection?",
    answer: "Socket outlets can supply portable equipment held by users. The 0.4s limit minimises shock duration and energy, protecting against ventricular fibrillation which can occur with longer exposure to dangerous currents."
  },
  {
    question: "When is 5s disconnection acceptable?",
    answer: "For distribution circuits and fixed equipment where users are less likely to directly contact faulted parts. Includes lighting circuits, fixed appliances, and distribution boards - equipment people don't normally hold."
  },
  {
    question: "Why does a Type C MCB have lower max Zs than Type B?",
    answer: "Type C MCBs trip magnetically at higher current multiples (5-10×In vs 3-5×In for Type B). To achieve the required disconnection time, higher fault current is needed, meaning lower Zs is required."
  },
  {
    question: "What if measured Zs exceeds the maximum?",
    answer: "The circuit fails. Options: increase cable size (lower R1+R2), shorten the circuit run, use a device with higher max Zs, or add RCD protection (which can override EFLI for 0.4s requirement)."
  },
  {
    question: "How does RCD protection affect Zs requirements?",
    answer: "An RCD will disconnect within 0.4s for any earth fault above its rated residual current (typically 30mA). This can provide 0.4s disconnection even if Zs only meets 5s requirements, but Zs must still allow protective device operation."
  },
  {
    question: "Are the table values at operating temperature?",
    answer: "No - BS 7671 maximum Zs values allow for conductor temperature rise. If you measure at ambient temperature, your reading should be well under the maximum to ensure compliance when conductors heat up under fault."
  }
];

const InspectionTestingModule5Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maximum Zs Values
          </h1>
          <p className="text-white/80">
            Understanding BS 7671 maximum impedance tables for protective devices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Tables:</strong> BS 7671 Chapter 41 specifies max Zs</li>
              <li><strong>Times:</strong> 0.4s for sockets, 5s for distribution</li>
              <li><strong>Devices:</strong> Type and rating determine max Zs</li>
              <li><strong>RCD:</strong> Can provide 0.4s backup protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values (0.4s)</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>32A Type B:</strong> ~1.37Ω maximum</li>
              <li><strong>32A Type C:</strong> ~0.68Ω maximum</li>
              <li><strong>6A Type B:</strong> ~7.28Ω maximum</li>
              <li><strong>Always check:</strong> Current BS 7671 tables</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Find maximum Zs values in BS 7671 tables",
              "Understand 0.4s vs 5s disconnection requirements",
              "Compare MCB types B, C, and D differences",
              "Know fuse maximum Zs values (BS 88, BS 1361)",
              "Apply values by comparing measured to maximum",
              "Understand when RCDs provide backup protection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Disconnection Time Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Disconnection Time Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 specifies maximum disconnection times based on the type of circuit and equipment:
            </p>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
              <div className="p-4 rounded bg-transparent">
                <p className="text-3xl font-bold text-elec-yellow">0.4s</p>
                <p className="text-white/60 text-sm mt-1">Socket Outlets</p>
                <p className="text-white/40 text-xs">Portable equipment</p>
              </div>
              <div className="p-4 rounded bg-transparent">
                <p className="text-3xl font-bold text-blue-400">5s</p>
                <p className="text-white/60 text-sm mt-1">Distribution</p>
                <p className="text-white/40 text-xs">Fixed equipment</p>
              </div>
            </div>

            <p className="text-sm text-white/70">
              The shorter time for sockets protects users who may be holding equipment during a fault.
              Distribution circuits allow 5s because users are less likely to directly contact faulted parts.
            </p>
          </div>
        </section>

        {/* Section 2: MCB Type Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MCB Type Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p className="text-sm font-medium text-white mb-2">Typical Max Zs at 0.4s (Ω):</p>

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

            <p className="text-sm text-amber-300 mt-4">
              Values are indicative. Always refer to current BS 7671 tables for exact figures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Why Types Differ */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Types Differ
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCB types have different magnetic trip thresholds:
            </p>

            <div className="my-6 space-y-3">
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-1">Type B: 3-5× In</p>
                <p className="text-sm text-white/70">Trips magnetically at 3-5 times rated current. Highest max Zs - most lenient.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400 mb-1">Type C: 5-10× In</p>
                <p className="text-sm text-white/70">Trips at 5-10 times rated. Lower max Zs - needs higher fault current.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-400 mb-1">Type D: 10-20× In</p>
                <p className="text-sm text-white/70">Trips at 10-20 times rated. Lowest max Zs - very high fault current needed.</p>
              </div>
            </div>

            <p className="text-sm text-white/60">
              Higher trip multiples require higher fault current, which requires lower impedance.
            </p>
          </div>
        </section>

        {/* Section 4: Using the Tables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using the Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <ol className="text-sm text-white space-y-2 ml-4">
                {[
                  "Identify the protective device type and rating",
                  "Determine required disconnection time (0.4s or 5s)",
                  "Look up maximum Zs in BS 7671 Chapter 41",
                  "Compare your measured Zs to this maximum",
                  "If measured ≤ maximum = PASS"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: RCD Override */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            RCD Override
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs can provide the 0.4s requirement even when EFLI only meets 5s values:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-emerald-400 mb-2">RCD Trip Time</p>
              <p className="text-sm text-white/70">
                A 30mA RCD must trip within 300ms at rated current, and typically within 40ms at 5×In.
                This is well under the 0.4s requirement.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Zs must still be low enough to operate the overcurrent device
              eventually (to clear sustained faults), but the RCD provides the fast shock protection.
            </p>
          </div>
        </section>

        {/* Section 6: When Zs Exceeds Maximum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            When Zs Exceeds Maximum
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              If measured Zs exceeds the maximum for 0.4s disconnection:
            </p>

            <div className="my-6 space-y-3">
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold text-sm">Increase Cable Size</p>
                <p className="text-white/70 text-xs">Larger cables have lower R1+R2, reducing Zs.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold text-sm">Shorten Run</p>
                <p className="text-white/70 text-xs">Shorter cable length means lower resistance.</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold text-sm">Change Device Type</p>
                <p className="text-white/70 text-xs">Type B has higher max Zs than Type C or D.</p>
              </div>
              <div className="border-l-2 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-semibold text-sm">Add RCD Protection</p>
                <p className="text-white/70 text-xs">RCD provides 0.4s protection regardless of Zs (if meeting 5s limits).</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Keep Tables Handy</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Have BS 7671 Chapter 41 tables available on site</li>
                <li>Quick reference for testing and verification</li>
                <li>Consider laminated pocket cards</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Margin</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design circuits to achieve 80% of max Zs</li>
                <li>Allows for variations and temperature effects</li>
                <li>Provides safety margin for future changes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Check Both Times</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify both 0.4s and 5s requirements where relevant</li>
                <li>Particularly important for sockets on distribution circuits</li>
                <li>Don't assume - always check the specific requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
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

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Disconnection Times</p>
                <ul className="space-y-0.5">
                  <li>Sockets: 0.4s maximum</li>
                  <li>Fixed equipment: 5s maximum</li>
                  <li>Distribution: 5s maximum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">If Zs Exceeds Max</p>
                <ul className="space-y-0.5">
                  <li>Increase cable size</li>
                  <li>Shorten cable run</li>
                  <li>Add RCD protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section4;
