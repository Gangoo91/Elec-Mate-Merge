import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m4s1-check1",
    question: "What is the maximum cable fill ratio for conduit systems?",
    options: ["30%", "40%", "50%", "60%"],
    correctIndex: 1,
    explanation: "Conduit should not exceed 40% fill ratio to allow for heat dissipation and future cable additions. For mixed cable types, 35% is recommended."
  },
  {
    id: "datacabling-m4s1-check2",
    question: "Which containment type provides the best EMC protection?",
    options: ["PVC trunking", "Cable basket", "Steel conduit", "Plastic conduit"],
    correctIndex: 2,
    explanation: "Steel conduit provides excellent EMC protection by creating a continuous metallic screen around cables when properly bonded."
  },
  {
    id: "datacabling-m4s1-check3",
    question: "What fire classification are steel containment systems?",
    options: ["A1 - Non-combustible", "B1 - Limited combustible", "B2 - Normal combustible", "C - Combustible"],
    correctIndex: 0,
    explanation: "Steel containment systems are classified A1 (non-combustible), meaning they make no contribution to fire and are suitable for all areas including escape routes."
  }
];

const faqs = [
  {
    question: "When should I use cable basket over trunking?",
    answer: "Use cable basket for high cable density areas where excellent ventilation is needed, such as above suspended ceilings and in plant rooms. Baskets are cost-effective for long horizontal runs and allow easy cable access."
  },
  {
    question: "What's the difference between heavy and light gauge conduit?",
    answer: "Heavy gauge steel conduit provides maximum mechanical protection and is suitable for exterior use and harsh environments. Light gauge is appropriate for interior installations where cost is a consideration but still provides good protection."
  },
  {
    question: "How do I calculate containment load requirements?",
    answer: "Calculate total cable weight using manufacturer data (e.g., Cat6 = 55g/m), then apply a safety factor of at least 2.5 for static loads. For a 100m run with 50 Cat6 cables: 50 × 55g × 100m × 2.5 = 687.5kg minimum rating."
  },
  {
    question: "What fire barriers are needed in containment systems?",
    answer: "Install intumescent fire barriers at all fire compartment boundaries. The barrier must maintain the same fire resistance rating as the penetrated element (e.g., 60 minutes for 60-minute walls). Document all penetrations and sealing methods."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client needs containment for a computer room with strict EMC requirements and high cable density. What would you recommend?",
  options: [
    "PVC trunking for easy installation",
    "Open cable basket with bonded steel construction",
    "Plastic conduit for corrosion resistance",
    "Mini trunking for a neat appearance"
  ],
  correctAnswer: 1,
  explanation: "Bonded steel cable basket provides excellent ventilation for high cable density whilst offering EMC screening when properly earthed. The open design allows heat dissipation while the steel construction provides EMC protection."
  }
];

const DataCablingModule4Section1 = () => {
  useSEO({
    title: "Containment Systems | Data Cabling Module 4.1",
    description: "Learn about cable containment systems including baskets, conduit, and trunking for professional data cabling installations."
  });

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
            <Link to="/study-centre/upskilling/data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Containment Systems: Basket, Conduit, Trunking
          </h1>
          <p className="text-white/80">
            Cable containment systems and installation methods
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Basket:</strong> Best ventilation, high density, easy access</li>
              <li><strong>Conduit:</strong> Maximum protection, EMC screening</li>
              <li><strong>Trunking:</strong> Balance of protection and capacity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Steel basket = high capacity, conduit = maximum protection</li>
              <li><strong>Use:</strong> Match containment to environment and fire requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate containment for each application",
              "Calculate cable fill ratios and load requirements",
              "Understand fire performance classifications",
              "Apply IP rating requirements by location",
              "Design support spacing and fixing methods",
              "Install fire barriers at compartment boundaries"
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
            Cable Basket Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable basket systems provide excellent ventilation and easy access for maintenance whilst
              offering good cable support over long spans. They're ideal for high-density installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ventilation:</strong> Excellent heat dissipation</li>
                  <li><strong>Access:</strong> Easy cable additions and changes</li>
                  <li><strong>Capacity:</strong> High cable density capability</li>
                  <li><strong>Spans:</strong> Up to 3m between supports</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Plant rooms:</strong> High cable volumes</li>
                  <li><strong>Ceilings:</strong> Above suspended ceiling voids</li>
                  <li><strong>Offices:</strong> Long horizontal runs</li>
                  <li><strong>Data centres:</strong> Overhead distribution</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Widths</p>
                <p className="text-white/90 text-xs">50-600mm available</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Materials</p>
                <p className="text-white/90 text-xs">Steel or stainless</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Finish</p>
                <p className="text-white/90 text-xs">Galvanised or powder coat</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Conduit Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conduit provides maximum mechanical and EMC protection for cables in demanding
              environments or where high security is required.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steel Conduit</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Heavy gauge:</strong> Maximum protection, exterior use</li>
                  <li><strong>Light gauge:</strong> Interior installations</li>
                  <li><strong>Flexible:</strong> Equipment connections</li>
                  <li><strong>EMC:</strong> Excellent when properly bonded</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PVC Conduit</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standard:</strong> Interior dry locations</li>
                  <li><strong>LSZH:</strong> Public areas, low smoke</li>
                  <li><strong>Flexible:</strong> Tight bends, equipment</li>
                  <li><strong>Chemical:</strong> Excellent resistance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fill Ratio Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single cable type:</strong> Maximum 40% fill</li>
                <li><strong>Mixed cables:</strong> Maximum 35% fill</li>
                <li><strong>Heat dissipation:</strong> Always leave adequate space</li>
                <li><strong>Future expansion:</strong> Plan for 25% spare capacity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Trunking Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trunking offers a balance between protection, accessibility, and cable capacity
              for medium to large installations. Available in mini and maxi sizes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mini Trunking (25-50mm)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Desktop cable management</li>
                  <li>Small office installations</li>
                  <li>Patch cord organisation</li>
                  <li>Capacity: 2-8 Cat6 cables</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maxi Trunking (75-300mm)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Backbone cable routes</li>
                  <li>Floor/ceiling distribution</li>
                  <li>Mixed cable types</li>
                  <li>Capacity: 20-200+ Cat6 cables</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compartmentalisation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power separation:</strong> Minimum 25mm partition between mains and data</li>
                <li><strong>Fire barriers:</strong> Intumescent barriers at compartment boundaries</li>
                <li><strong>Access points:</strong> Maximum 3m spacing for maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Performance and IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Containment must meet fire performance standards and provide appropriate ingress
              protection for the installation environment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Classifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Steel (A1):</strong> Non-combustible, all areas</li>
                  <li><strong>Standard PVC (B2):</strong> Limited combustibility</li>
                  <li><strong>LSZH:</strong> Low smoke, halogen-free</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IP Ratings by Location</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IP20:</strong> Internal dry areas</li>
                  <li><strong>IP44:</strong> Plant rooms (water spray)</li>
                  <li><strong>IP65:</strong> External applications</li>
                  <li><strong>IP66:</strong> Wash-down areas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Plan routes to minimise bends and joints</li>
                <li>Maintain support spacing: light loads 1.5m, heavy loads 0.75m</li>
                <li>Bond metallic systems for EMC continuity</li>
                <li>Install containment before cable pulling</li>
                <li>Label all containment sections clearly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Exceeding fill ratios:</strong> — causes heat build-up and difficult pulls</li>
                <li><strong>No cooling plan:</strong> — active equipment areas need ventilation</li>
                <li><strong>Missing fire barriers:</strong> — compromises building compartmentation</li>
                <li><strong>Wrong fixings:</strong> — must match substrate type and load</li>
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
              <p className="font-medium text-white mb-1">Containment Selection</p>
              <ul className="space-y-0.5">
                <li>High density + ventilation = basket</li>
                <li>Maximum protection = steel conduit</li>
                <li>Balance + capacity = trunking</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Specifications</p>
              <ul className="space-y-0.5">
                <li>Fill ratio: 40% max single, 35% mixed</li>
                <li>Support: 1.5m light, 0.75m heavy</li>
                <li>Safety factor: 2.5× for static loads</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
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
            <Link to="/study-centre/upskilling/data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-4-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule4Section1;