import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Performance Ratings and Bandwidth Limits | Data Cabling Module 2.3";
const DESCRIPTION = "Learn cable performance specifications, bandwidth limitations, and testing requirements for structured cabling per ISO/IEC standards.";

const quickCheckQuestions = [
  {
    id: "datacabling-m2s3-check1",
    question: "What is the maximum bandwidth for Category 6A cable?",
    options: ["100 MHz", "250 MHz", "500 MHz", "600 MHz"],
    correctIndex: 2,
    explanation: "Category 6A cable supports frequencies up to 500 MHz, enabling 10GBASE-T transmission over the full 100-metre channel length."
  },
  {
    id: "datacabling-m2s3-check2",
    question: "What does NEXT stand for in cable testing?",
    options: [
      "Network Extension Test",
      "Near End Cross Talk",
      "Nominal Extra Transmission",
      "Network Error X-Talk"
    ],
    correctIndex: 1,
    explanation: "NEXT (Near End Cross Talk) measures signal interference between adjacent pairs at the transmitting end of the cable. Higher NEXT values indicate better performance."
  },
  {
    id: "datacabling-m2s3-check3",
    question: "Which Class rating corresponds to Category 6A cable?",
    options: ["Class D", "Class E", "Class EA", "Class F"],
    correctIndex: 2,
    explanation: "Category 6A cable achieves Class EA performance rating under ISO/IEC standards, supporting frequencies up to 500 MHz."
  }
];

const faqs = [
  {
    question: "What's the difference between Category and Class ratings?",
    answer: "Category ratings (TIA/EIA) apply to components like cables and connectors, while Class ratings (ISO/IEC) apply to the complete installed channel. Class D corresponds to Cat5e, Class E to Cat6, and Class EA to Cat6A."
  },
  {
    question: "Why do cables perform worse at higher frequencies?",
    answer: "Signal attenuation (insertion loss) increases with frequency. Higher frequencies also experience greater crosstalk between pairs and more susceptibility to return loss from impedance mismatches. This is why higher category cables need stricter specifications."
  },
  {
    question: "What is alien crosstalk and why does it matter?",
    answer: "Alien crosstalk (ANEXT) is interference between adjacent cables in a bundle, not between pairs within the same cable. It becomes the limiting factor for 10GBASE-T transmission and is why Cat6A specifies ANEXT while Cat6 does not."
  },
  {
    question: "How can I verify my installation meets category requirements?",
    answer: "Use a Level III cable certifier that tests all performance parameters to the relevant category standard. The tester should be calibrated and test results should show pass/fail for each parameter with headroom measurements."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A cable test shows the installed link meets Cat6 parameters but fails Cat6A alien crosstalk requirements. What is the most likely cause?",
  options: [
    "Faulty cable",
    "Poor termination quality",
    "Cables bundled too tightly without proper separation",
    "Wrong test equipment"
  ],
  correctAnswer: 2,
  explanation: "Alien crosstalk occurs between cables, not within them. Tightly bundled cables without adequate separation or ANEXT-rated installation practices will fail Cat6A alien crosstalk testing even with good Cat6 performance."
  }
];

const DataCablingModule2Section3 = () => {
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
            <Link to="/electrician/upskilling/data-cabling-module-2">
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
            <span>Module 2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Performance Ratings and Bandwidth Limits
          </h1>
          <p className="text-white/80">
            Cable specifications and testing requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Bandwidth:</strong> Maximum frequency cable can carry</li>
              <li><strong>Insertion Loss:</strong> Signal attenuation through cable</li>
              <li><strong>Crosstalk:</strong> Interference between wire pairs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Test results showing dB margins</li>
              <li><strong>Use:</strong> Verify all parameters pass category spec</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand key performance parameters",
              "Interpret Category and Class standards",
              "Apply bandwidth limitations to design",
              "Recognise factors affecting performance",
              "Read cable test results",
              "Identify performance degradation causes"
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
            Key Performance Parameters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable performance is measured through several parameters that together determine
              the quality and speed of data transmission possible over the link.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Quality</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Insertion Loss:</strong> Signal attenuation (dB)</li>
                  <li><strong>Return Loss:</strong> Reflected signal (dB)</li>
                  <li><strong>Delay:</strong> Propagation time (ns)</li>
                  <li><strong>Delay Skew:</strong> Timing between pairs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crosstalk Measurements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>NEXT:</strong> Near End Cross Talk</li>
                  <li><strong>FEXT:</strong> Far End Cross Talk</li>
                  <li><strong>PSNEXT:</strong> Power Sum NEXT</li>
                  <li><strong>ANEXT:</strong> Alien crosstalk</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat5e @ 100MHz</p>
                <p className="text-white/90 text-xs">24.0 dB max loss</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat6 @ 250MHz</p>
                <p className="text-white/90 text-xs">35.3 dB max loss</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat6A @ 500MHz</p>
                <p className="text-white/90 text-xs">46.5 dB max loss</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Category and Class Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two parallel systems define cable performance: TIA/EIA Categories for components
              and ISO/IEC Classes for installed channels. Understanding both is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TIA/EIA Categories (Component Ratings):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category 5e:</strong> 100 MHz bandwidth, Gigabit Ethernet</li>
                <li><strong>Category 6:</strong> 250 MHz bandwidth, 10G to 55m</li>
                <li><strong>Category 6A:</strong> 500 MHz bandwidth, 10G to 100m</li>
                <li><strong>Category 7:</strong> 600 MHz bandwidth, fully shielded</li>
                <li><strong>Category 8:</strong> 2000 MHz, data centre short runs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO/IEC Classes (Channel Ratings):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class D:</strong> Equivalent to Cat5e (100 MHz)</li>
                <li><strong>Class E:</strong> Equivalent to Cat6 (250 MHz)</li>
                <li><strong>Class EA:</strong> Equivalent to Cat6A (500 MHz)</li>
                <li><strong>Class F:</strong> Equivalent to Cat7 (600 MHz)</li>
                <li><strong>Class FA:</strong> Extended Class F (1000 MHz)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bandwidth and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bandwidth limitations directly determine which applications and speeds each cable
              category can support reliably over standard channel lengths.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cat5e Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>100BASE-TX (100 Mbps)</li>
                  <li>1000BASE-T (1 Gbps)</li>
                  <li>PoE and PoE+ (up to 30W)</li>
                  <li>Basic IP telephony</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cat6A Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>10GBASE-T (10 Gbps full distance)</li>
                  <li>PoE++ Type 4 (up to 100W)</li>
                  <li>High-density Wi-Fi 6/6E backhaul</li>
                  <li>Future 25G/40G potential</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Degradation Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bundle size:</strong> Increases alien crosstalk</li>
                <li><strong>Temperature:</strong> Higher temps increase insertion loss</li>
                <li><strong>Termination quality:</strong> Poor terminations add loss</li>
                <li><strong>Bend radius:</strong> Sharp bends affect performance</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test to one category higher than installed cable</li>
                <li>Perform tests at both ends of permanent links</li>
                <li>Include alien crosstalk testing for Cat6A</li>
                <li>Document all results for warranty compliance</li>
                <li>Retest after any remedial work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming compliance:</strong> — Always certify installed links</li>
                <li><strong>Ignoring headroom:</strong> — Low margins indicate future problems</li>
                <li><strong>Wrong test limits:</strong> — Use correct category for testing</li>
                <li><strong>Incomplete testing:</strong> — Test all parameters, not just wiremap</li>
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
              <p className="font-medium text-white mb-1">Category ↔ Class</p>
              <ul className="space-y-0.5">
                <li>Cat5e = Class D (100 MHz)</li>
                <li>Cat6 = Class E (250 MHz)</li>
                <li>Cat6A = Class EA (500 MHz)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Parameters</p>
              <ul className="space-y-0.5">
                <li>IL: Insertion Loss (lower better)</li>
                <li>NEXT: Near End Crosstalk (higher better)</li>
                <li>RL: Return Loss (higher better)</li>
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
            <Link to="/electrician/upskilling/data-cabling-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-2-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule2Section3;