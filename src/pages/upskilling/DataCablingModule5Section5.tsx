import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Future-Proofing Network Infrastructure | Data Cabling Module 5.5";
const DESCRIPTION = "Emerging technologies, Category 8 systems, and strategic planning for next-generation network requirements.";

const quickCheckQuestions = [
  {
    id: "datacabling-m5s5-check1",
    question: "What is the maximum supported frequency for Category 8 cabling?",
    options: ["500 MHz", "1000 MHz", "1600 MHz", "2000 MHz"],
    correctIndex: 3,
    explanation: "Category 8 supports frequencies up to 2000 MHz (2 GHz), enabling 25GBASE-T and 40GBASE-T applications over distances up to 30 metres."
  },
  {
    id: "datacabling-m5s5-check2",
    question: "What is the maximum channel length for Category 8 installations?",
    options: ["30 metres", "50 metres", "90 metres", "100 metres"],
    correctIndex: 0,
    explanation: "Category 8 has a maximum channel length of 30 metres (24m permanent link + 6m patch cords) to maintain signal integrity at 2000 MHz frequencies."
  },
  {
    id: "datacabling-m5s5-check3",
    question: "Which connector type does Category 8.1 use for backward compatibility?",
    options: ["GG45", "TERA", "Standard RJ45 (8P8C)", "ARJ45"],
    correctIndex: 2,
    explanation: "Category 8.1 uses standard RJ45 (8P8C) connectors for backward compatibility with existing systems. Category 8.2 uses different connector types like GG45 or TERA."
  }
];

const faqs = [
  {
    question: "When should I use Category 8 instead of fibre optic?",
    answer: "Cat 8 is cost-effective for short data centre connections (under 30m) where 25G/40G speeds are needed. It uses existing copper infrastructure skills and RJ45 connectors. For longer distances or higher speeds, fibre remains the better choice."
  },
  {
    question: "Can I use Cat 8 for general office cabling?",
    answer: "Not recommended. Cat 8's 30m distance limit makes it unsuitable for typical office horizontal cabling (up to 90m). Use Cat 6A for office environments where 10Gbps capability is sufficient for foreseeable applications."
  },
  {
    question: "How do I future-proof without over-investing?",
    answer: "Install Cat 6A for horizontal cabling (supports 10G at 100m, adequate for most applications). Reserve Cat 8 for data centre ToR connections. Plan pathways and spaces for future upgrades rather than over-specifying cable."
  },
  {
    question: "What bandwidth growth should I plan for?",
    answer: "Historical data shows approximately 25-30% annual bandwidth growth. Plan for 10x current requirements over 10 years. Cat 6A provides good headroom for most applications through 2035."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A new data centre is being designed with servers in racks requiring 25Gbps connections to top-of-rack switches. Switch to spine connections will be 100Gbps. What cabling strategy is most appropriate?",
  options: [
    "Cat 6A throughout the data centre",
    "Cat 8 for server to ToR, fibre for spine connections",
    "Fibre optic for all connections",
    "Cat 5e to minimize costs"
  ],
  correctAnswer: 1,
  explanation: "Cat 8 is ideal for server-to-switch connections within the 30m limit and provides 25G/40G capability cost-effectively. Fibre is necessary for spine connections requiring 100G speeds and longer distances between racks."
  }
];

const DataCablingModule5Section5 = () => {
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
            <Link to="/electrician/upskilling/data-cabling-module-5">
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
            <span>Module 5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Future-Proofing Network Infrastructure
          </h1>
          <p className="text-white/80">
            Category 8 and strategic planning for next-generation requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cat 8:</strong> 2000MHz, 25/40Gbps, 30m max</li>
              <li><strong>Use case:</strong> Data centre ToR connections</li>
              <li><strong>Planning:</strong> Cat 6A for offices, Cat 8 for DC</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cat 8 = short runs, shielded, data centres</li>
              <li><strong>Use:</strong> Zone-based planning for cost efficiency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand Category 8 specifications",
              "Apply Cat 8 in appropriate scenarios",
              "Plan for bandwidth growth trends",
              "Design hybrid copper/fibre systems",
              "Balance cost with future requirements",
              "Implement zone-based cabling strategies"
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
            Category 8 Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Category 8 represents the latest evolution in copper cabling, designed specifically
              for short-distance, high-speed data centre applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Category 8.1 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> Up to 2000 MHz (2 GHz)</li>
                  <li><strong>Channel length:</strong> 30m maximum</li>
                  <li><strong>Permanent link:</strong> 24m maximum</li>
                  <li><strong>Connector:</strong> Standard RJ45 (8P8C)</li>
                  <li><strong>Shielding:</strong> S/FTP required</li>
                  <li><strong>Applications:</strong> 25GBASE-T, 40GBASE-T</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Category 8.2 Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> Up to 2000 MHz</li>
                  <li><strong>Channel length:</strong> 30m maximum</li>
                  <li><strong>Connectors:</strong> GG45, TERA, or ARJ45</li>
                  <li><strong>Compatibility:</strong> Limited backward compatibility</li>
                  <li><strong>Performance:</strong> Enhanced alien crosstalk</li>
                  <li><strong>Adoption:</strong> Limited market uptake</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 6A</p>
                <p className="text-white/90 text-xs">500MHz, 100m</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 8.1</p>
                <p className="text-white/90 text-xs">2000MHz, 30m</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 8.2</p>
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
            Data Centre Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Category 8 fills a specific niche in data centre connectivity where high speeds
              are needed over short distances without the complexity of fibre optics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Speed Ethernet Standards:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">25GBASE-T</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>25 Gbps speed</li>
                    <li>Cat 8 cable required</li>
                    <li>30m max distance</li>
                    <li>8-12W per port</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">40GBASE-T</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>40 Gbps speed</li>
                    <li>Cat 8 cable required</li>
                    <li>30m max distance</li>
                    <li>12-16W per port</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Where Cat 8 makes sense:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Top-of-Rack (ToR):</strong> Server to switch connections</li>
                <li><strong>Storage networks:</strong> High-bandwidth SAN connections</li>
                <li><strong>Switch interconnects:</strong> Within equipment rooms</li>
                <li><strong>HPC clusters:</strong> High-performance computing</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Strategic Infrastructure Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective future-proofing balances current requirements with anticipated growth,
              avoiding both under-specification and unnecessary over-investment.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Short-term (1-3 years)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cat 6A for new installations</li>
                  <li>10G infrastructure readiness</li>
                  <li>Wi-Fi 6 AP support</li>
                  <li>Advanced PoE planning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Medium-term (3-7 years)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cat 8 in data centres</li>
                  <li>25G server connections</li>
                  <li>Edge computing support</li>
                  <li>High-density PoE++</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Long-term (7-15 years)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>40G+ copper where applicable</li>
                  <li>Hybrid copper/fibre</li>
                  <li>IoT infrastructure</li>
                  <li>Pathway/space flexibility</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Zone-based approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Office areas:</strong> Cat 6A (10G ready, 100m reach)</li>
                <li><strong>Equipment rooms:</strong> Cat 8 for high-speed interconnects</li>
                <li><strong>Backbone:</strong> Fibre optic for long distances</li>
                <li><strong>Wireless:</strong> Cat 6A with PoE+ minimum</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Investment Strategies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install Cat 6A for general purpose - it covers most needs for 10+ years</li>
                <li>Reserve Cat 8 for data centre ToR connections under 30m</li>
                <li>Use fibre for backbone and inter-building connections</li>
                <li>Over-spec pathways and spaces rather than cable category</li>
                <li>Plan for 10x bandwidth growth over installation lifetime</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cat 8 everywhere:</strong> — Wasted cost for office cabling</li>
                <li><strong>Distance miscalculation:</strong> — Cat 8 won't reach 100m</li>
                <li><strong>Ignoring trends:</strong> — Under-spec leads to premature replacement</li>
                <li><strong>Pathway neglect:</strong> — Cables can be upgraded, pathways cannot</li>
                <li><strong>No documentation:</strong> — Future upgrades need accurate records</li>
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
              <p className="font-medium text-white mb-1">Category Comparison</p>
              <ul className="space-y-0.5">
                <li>Cat 6A: 500MHz, 100m, 10G</li>
                <li>Cat 8: 2000MHz, 30m, 25/40G</li>
                <li>Fibre: Unlimited, km range</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Zone Planning</p>
              <ul className="space-y-0.5">
                <li>Office: Cat 6A</li>
                <li>Data Centre: Cat 8</li>
                <li>Backbone: Fibre</li>
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
            <Link to="/electrician/upskilling/data-cabling-module-5-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-6">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule5Section5;