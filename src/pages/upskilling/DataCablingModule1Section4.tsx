import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Network Speed & Future Proofing | Data Cabling Module 1.4";
const DESCRIPTION = "Learn about network bandwidth, data rates, and strategies for future-proofing structured cabling infrastructure.";

const quickCheckQuestions = [
  {
    id: "datacabling-m1s4-check1",
    question: "What is the maximum data rate for Cat6A cabling?",
    options: ["1 Gbps", "2.5 Gbps", "5 Gbps", "10 Gbps"],
    correctIndex: 3,
    explanation: "Cat6A supports 10 Gbps (10GBASE-T) over 100 metres. It provides 500 MHz bandwidth and includes improved alien crosstalk protection."
  },
  {
    id: "datacabling-m1s4-check2",
    question: "What is bandwidth measured in for network cabling?",
    options: ["Gbps", "MHz", "Metres", "Ohms"],
    correctIndex: 1,
    explanation: "Cable bandwidth is measured in MHz (megahertz) - the frequency range the cable can reliably carry. Data rate (Gbps) is different from bandwidth (MHz), though they're related."
  },
  {
    id: "datacabling-m1s4-check3",
    question: "When future-proofing a cabling installation, what growth factor should typically be applied?",
    options: ["10%", "20-40%", "50-75%", "100%"],
    correctIndex: 1,
    explanation: "A 20-40% growth factor is typically recommended for future-proofing. This accounts for additional devices, increased bandwidth needs, and unexpected requirements without excessive overbuilding."
  }
];

const faqs = [
  {
    question: "What's the difference between bandwidth and speed?",
    answer: "Bandwidth is the maximum amount of data that can be transmitted (like the width of a motorway), whilst speed refers to how fast individual data packets travel. Higher bandwidth allows more data to flow simultaneously."
  },
  {
    question: "How do I calculate how much bandwidth my organisation needs?",
    answer: "Add up bandwidth requirements for all applications, multiply by concurrent users, add 20-40% overhead for protocols, then add growth margin. Consider peak usage periods, not averages."
  },
  {
    question: "Is wireless fast enough to replace wired connections?",
    answer: "Modern Wi-Fi 6 can achieve high speeds, but wired connections offer more consistent performance, lower latency, and higher reliability. Use wireless for mobility, wired for critical applications."
  },
  {
    question: "What future technologies should I plan for?",
    answer: "Consider IoT device proliferation, edge computing, AI workloads, 8K video, VR/AR applications, and increased cloud dependency. These trends generally require higher bandwidth and lower latency."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client is installing cabling for an office that will be used for the next 15 years. What cable category should you recommend?",
  options: [
    "Cat5e - it's the cheapest option",
    "Cat6 - adequate for current needs",
    "Cat6A - provides 10Gbps headroom for future growth",
    "Cat8 - maximum future-proofing"
  ],
  correctAnswer: 2,
  explanation: "Cat6A is the best balance for long-term installations. It supports 10 Gbps over 100m, providing significant headroom for future applications. Cat8 is overkill for most office environments and Cat5e/Cat6 may become limiting within the 15-year period."
  }
];

const DataCablingModule1Section4 = () => {
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
            <Link to="/electrician/upskilling/data-cabling-module-1">
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
            <span>Module 1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Network Speed, Bandwidth, and Future Proofing
          </h1>
          <p className="text-white/80">
            Performance requirements and planning ahead
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Bandwidth:</strong> Cable capacity (MHz)</li>
              <li><strong>Data rate:</strong> Actual throughput (Gbps)</li>
              <li><strong>Future-proof:</strong> 20-40% growth factor</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cat6A = 500MHz, supports 10Gbps</li>
              <li><strong>Use:</strong> Plan for 15-25 year infrastructure life</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand bandwidth vs data rate",
              "Compare cable category capabilities",
              "Calculate bandwidth requirements",
              "Apply future-proofing principles",
              "Plan for emerging technologies",
              "Balance cost vs capability"
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
            Understanding Bandwidth and Data Rate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bandwidth and data rate are related but distinct concepts. Understanding the
              difference is essential for selecting appropriate cabling.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bandwidth (MHz)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Frequency range cable can carry</li>
                  <li>Physical cable characteristic</li>
                  <li>Fixed by cable construction</li>
                  <li>Higher = more capacity potential</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Rate (Gbps)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Actual data throughput achieved</li>
                  <li>Depends on bandwidth + encoding</li>
                  <li>Affected by distance and quality</li>
                  <li>What users experience</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat6</p>
                <p className="text-white/90 text-xs">250MHz / 1Gbps</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat6A</p>
                <p className="text-white/90 text-xs">500MHz / 10Gbps</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat8</p>
                <p className="text-white/90 text-xs">2000MHz / 40Gbps</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Category Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right cable category involves balancing current needs, future
              requirements, and budget constraints.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Category Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cat5e:</strong> 100MHz, 1Gbps - Legacy, avoid for new installs</li>
                <li><strong>Cat6:</strong> 250MHz, 1Gbps (10G to 55m) - Minimum for new work</li>
                <li><strong>Cat6A:</strong> 500MHz, 10Gbps - Recommended standard</li>
                <li><strong>Cat7:</strong> 600MHz - Limited adoption, not TIA standard</li>
                <li><strong>Cat8:</strong> 2000MHz, 25-40Gbps - Data centres only</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New offices:</strong> Cat6A minimum for 10+ year lifespan</li>
                <li><strong>Data centres:</strong> Consider Cat6A, Cat8, or fibre</li>
                <li><strong>Industrial:</strong> Cat6A with appropriate shielding</li>
                <li><strong>Budget-constrained:</strong> Cat6 with fibre backbone</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Future-Proofing Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cabling infrastructure lasts 15-25 years. Planning for future requirements
              is more cost-effective than retrofitting later.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Growth Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>20-40% spare capacity general rule</li>
                  <li>Consider IoT device proliferation</li>
                  <li>Plan for wireless access point density</li>
                  <li>Allow for technology changes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emerging Demands</p>
                <ul className="text-sm text-white space-y-1">
                  <li>4K/8K video streaming</li>
                  <li>Virtual/augmented reality</li>
                  <li>AI and machine learning</li>
                  <li>Edge computing applications</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Infrastructure Planning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install higher-category cabling than currently needed</li>
                <li>Provide spare cables to each location</li>
                <li>Size pathways for additional cables</li>
                <li>Design telecom rooms with expansion space</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Bandwidth Planning Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Audit current bandwidth consumption</li>
                <li>Identify bandwidth-intensive applications</li>
                <li>Project user and device growth</li>
                <li>Add 20-40% overhead margin</li>
                <li>Select cabling to exceed projected needs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Short-term thinking:</strong> — Cabling lasts longer than equipment</li>
                <li><strong>Ignoring growth:</strong> — Networks always expand</li>
                <li><strong>Cheapest option:</strong> — Cost of recabling exceeds savings</li>
                <li><strong>No spare capacity:</strong> — Adds cables to every location</li>
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
              <p className="font-medium text-white mb-1">Category Capabilities</p>
              <ul className="space-y-0.5">
                <li>Cat6: 250MHz, 1Gbps</li>
                <li>Cat6A: 500MHz, 10Gbps</li>
                <li>Cat8: 2000MHz, 40Gbps</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Planning Factors</p>
              <ul className="space-y-0.5">
                <li>Growth margin: 20-40%</li>
                <li>Infrastructure life: 15-25 years</li>
                <li>Active equipment: 3-7 years</li>
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
            <Link to="/electrician/upskilling/data-cabling-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-2">
              Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule1Section4;