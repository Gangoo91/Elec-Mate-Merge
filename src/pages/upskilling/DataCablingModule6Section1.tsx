import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "TIA/EIA 568 and ISO/IEC 11801 Overview | Data Cabling Module 6.1";
const DESCRIPTION = "Understanding international cabling standards for structured cabling system design and installation.";

const quickCheckQuestions = [
  {
    id: "datacabling-m6s1-check1",
    question: "What is the maximum horizontal cable length specified in TIA/EIA-568?",
    options: ["80 metres", "90 metres", "100 metres", "110 metres"],
    correctIndex: 1,
    explanation: "TIA/EIA-568 specifies a maximum horizontal cable length of 90 metres, with an additional 10 metres allowed for patch cords (5m each end) for a total channel length of 100m."
  },
  {
    id: "datacabling-m6s1-check2",
    question: "Which topology is specified as the primary architecture in TIA/EIA-568?",
    options: ["Ring topology", "Bus topology", "Star topology", "Mesh topology"],
    correctIndex: 2,
    explanation: "TIA/EIA-568 specifies star topology as the primary architecture, with each outlet connected directly to a telecommunications room via horizontal cabling."
  },
  {
    id: "datacabling-m6s1-check3",
    question: "What does ISO Class EA correspond to in TIA category terms?",
    options: ["Category 5e", "Category 6", "Category 6A", "Category 7"],
    correctIndex: 2,
    explanation: "ISO Class EA corresponds to TIA Category 6A, both supporting frequencies up to 500 MHz and enabling 10GBASE-T applications over the full 100-metre channel length."
  }
];

const faqs = [
  {
    question: "What's the difference between TIA-568 and ISO/IEC 11801?",
    answer: "TIA-568 is the North American standard, while ISO/IEC 11801 is the international equivalent. Both specify similar requirements for structured cabling but use different terminology (categories vs classes). Performance requirements are largely harmonised."
  },
  {
    question: "Which standard should I follow in the UK?",
    answer: "In the UK, EN 50173 applies, which is the European implementation of ISO/IEC 11801. It uses class designations (D, E, EA, F) rather than categories, though performance specifications align with TIA standards."
  },
  {
    question: "What does 'channel' mean in cabling standards?",
    answer: "A channel refers to the complete end-to-end transmission path including horizontal cables, patch cords, connectors, and all interconnection hardware. Maximum channel length is 100m (90m permanent link + 10m patch cords)."
  },
  {
    question: "Can I mix standards in the same installation?",
    answer: "Yes, but consistency is important. Use the same wiring scheme throughout (T568A or T568B), and ensure all components meet at least the minimum class/category specification. Documentation should clearly state which standards apply."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A multinational company needs to standardise network infrastructure across offices in New York, London, and Singapore. What is the key consideration for ensuring compatibility?",
  options: [
    "Use TIA-568 exclusively in all locations",
    "Ensure equivalent class/category performance despite different regional standards",
    "Install different cable types in each region",
    "Only use wireless networks to avoid standards conflicts"
  ],
  correctAnswer: 1,
  explanation: "Different regions follow different standards (TIA-568, EN 50173, ISO/IEC 11801), but performance specifications are harmonised. Using equivalent class/category specifications (e.g., Cat 6A/Class EA) ensures compatibility regardless of regional standard."
  }
];

const DataCablingModule6Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            TIA/EIA 568 and ISO/IEC 11801 Overview
          </h1>
          <p className="text-white/80">
            International cabling standards and requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TIA-568:</strong> North American standard (categories)</li>
              <li><strong>ISO/IEC 11801:</strong> International standard (classes)</li>
              <li><strong>Key limit:</strong> 90m horizontal + 10m patch cords</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Star topology, category markings on cables</li>
              <li><strong>Use:</strong> Match regional standard, ensure class equivalence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand TIA-568 and ISO 11801 scope",
              "Compare categories and classes",
              "Apply architectural requirements",
              "Identify regional standards differences",
              "Select appropriate specifications",
              "Ensure international compatibility"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            TIA/EIA-568: North American Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TIA/EIA-568 is the premier North American standard for commercial building
              telecommunications cabling infrastructure, defining requirements for design,
              installation, and testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Standard Structure</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>TIA-568.0-E:</strong> Generic Cabling (2020)</li>
                  <li><strong>TIA-568.1-E:</strong> Commercial Buildings (2020)</li>
                  <li><strong>TIA-568.2-D:</strong> Twisted-Pair (2018)</li>
                  <li><strong>TIA-568.3-D:</strong> Optical Fibre (2016)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Topology:</strong> Star configuration</li>
                  <li><strong>Horizontal:</strong> 90m maximum</li>
                  <li><strong>Channel:</strong> 100m total</li>
                  <li><strong>No splices:</strong> Point-to-point only</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 5e</p>
                <p className="text-white/90 text-xs">100MHz, 1Gbps</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 6/6A</p>
                <p className="text-white/90 text-xs">250/500MHz</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 8</p>
                <p className="text-white/90 text-xs">2000MHz, 30m</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            ISO/IEC 11801: International Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO/IEC 11801 provides the international framework for structured cabling systems,
              harmonising standards globally while allowing regional adaptations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Series Structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>ISO/IEC 11801-1:</strong> General Requirements (2017)</li>
                <li><strong>ISO/IEC 11801-2:</strong> Office Premises (2017)</li>
                <li><strong>ISO/IEC 11801-3:</strong> Industrial Premises (2017)</li>
                <li><strong>ISO/IEC 11801-5:</strong> Data Centres (2017)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permanent Link</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fixed cabling: outlet to patch panel</li>
                  <li>90m maximum length</li>
                  <li>Excludes patch cords</li>
                  <li>Used for installation verification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Channel</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Complete transmission path</li>
                  <li>100m maximum length</li>
                  <li>Includes all patch cords</li>
                  <li>Real-world performance test</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Class and Category Equivalence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the relationship between ISO classes and TIA categories is essential
              for specifying compatible cabling across different regional standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class/Category Comparison:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">ISO Classes</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Class D: 100MHz (Cat 5e)</li>
                    <li>Class E: 250MHz (Cat 6)</li>
                    <li>Class EA: 500MHz (Cat 6A)</li>
                    <li>Class F/FA: 600-1000MHz (Cat 7)</li>
                    <li>Class I/II: 2000MHz (Cat 8)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Regional Implementation</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>North America: TIA-568</li>
                    <li>Europe: EN 50173</li>
                    <li>International: ISO/IEC 11801</li>
                    <li>Performance: Harmonised</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical implications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Category 6A and Class EA are functionally equivalent</li>
                <li>Both support 10GBASE-T at 100 metres</li>
                <li>Testing standards are harmonised across regions</li>
                <li>Components meeting one standard typically meet equivalent</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regional Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify which standard applies in your region</li>
                <li>Use equivalent class/category for multinational projects</li>
                <li>Document the standard followed in all installations</li>
                <li>Ensure test equipment is configured for correct standard</li>
                <li>Include standard references in specifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing terminology:</strong> — Confusing classes with categories</li>
                <li><strong>Wrong test limits:</strong> — Using TIA limits for ISO certification</li>
                <li><strong>Exceeding distances:</strong> — Not accounting for total channel length</li>
                <li><strong>Ignoring regional:</strong> — Assuming TIA applies everywhere</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">TIA-568 (North America)</p>
              <ul className="space-y-0.5">
                <li>Categories: 5e, 6, 6A, 8</li>
                <li>T568A/B wiring</li>
                <li>110-style terminations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">ISO/IEC 11801 (International)</p>
              <ul className="space-y-0.5">
                <li>Classes: D, E, EA, F, I</li>
                <li>Harmonised performance</li>
                <li>Regional adaptations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-5-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-6-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule6Section1;