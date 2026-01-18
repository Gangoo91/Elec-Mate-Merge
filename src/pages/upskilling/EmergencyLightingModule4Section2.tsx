import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m4s2-check1",
    question: "What is the main advantage of self-contained emergency luminaires?",
    options: ["Lower initial cost", "Integrated battery and charger", "Higher light output", "Longer cable runs"],
    correctIndex: 1,
    explanation: "Self-contained luminaires have integral batteries and charging circuits, making installation simpler with no central battery room required. Each luminaire operates independently."
  },
  {
    id: "emergencylighting-m4s2-check2",
    question: "When is a central battery system typically preferred?",
    options: ["Small residential buildings", "Large installations with many luminaires", "Temporary installations", "Single-storey buildings"],
    correctIndex: 1,
    explanation: "Central battery systems are cost-effective for large installations where the central infrastructure cost is offset by simpler luminaires. They also allow centralised monitoring and maintenance."
  },
  {
    id: "emergencylighting-m4s2-check3",
    question: "What is the typical battery life for self-contained luminaires?",
    options: ["1-2 years", "3-4 years", "5-8 years", "10+ years"],
    correctIndex: 1,
    explanation: "NiCd and NiMH batteries in self-contained units typically last 3-4 years. Li-ion may last longer. Regular testing identifies batteries approaching end of life."
  }
];

const faqs = [
  {
    question: "Can I mix self-contained and central systems in one building?",
    answer: "Yes, hybrid installations are common. Self-contained units might protect escape routes while central systems serve larger areas. Each system must be compliant independently and documented clearly."
  },
  {
    question: "What happens to self-contained luminaires during extended power cuts?",
    answer: "Self-contained units illuminate for their rated duration (1 or 3 hours typically), then require 24 hours recharge before full duration is restored. Partial recharge gives partial duration."
  },
  {
    question: "How do central battery systems handle luminaire failures?",
    answer: "Central systems can monitor individual luminaires and report failures. The rest of the system continues operating. Self-contained failures affect only that luminaire but may go unnoticed without testing."
  },
  {
    question: "What are the maintenance differences between system types?",
    answer: "Central systems need centralised battery maintenance but luminaires need minimal attention. Self-contained requires each unit's battery to be maintained and eventually replaced across all luminaires."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A shopping centre with 200 emergency luminaires requires a new system. Which system type would typically be most cost-effective?",
  options: [
    "Self-contained throughout",
    "Central battery system",
    "Hybrid with mostly self-contained",
    "Individual generators per luminaire"
  ],
  correctAnswer: 1,
  explanation: "For large installations like shopping centres, central battery systems become cost-effective. The centralised infrastructure cost is offset by simpler luminaires, and maintenance is concentrated rather than distributed across 200 units."
  }
];

const EmergencyLightingModule4Section2 = () => {
  useSEO({
    title: "Self-Contained vs Central Battery | Emergency Lighting Module 4.2",
    description: "Compare self-contained and central battery emergency lighting systems, understand applications, costs, and maintenance considerations."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-4">
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
            <span>Module 4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Self-Contained vs Central Battery Systems
          </h1>
          <p className="text-white/80">
            System architectures and backup power options
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Self-contained:</strong> Integral battery per unit</li>
              <li><strong>Central:</strong> Shared battery room</li>
              <li><strong>Hybrid:</strong> Mix of both types</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Selection Factors</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Scale:</strong> Number of luminaires</li>
              <li><strong>Maintenance:</strong> Access considerations</li>
              <li><strong>Cost:</strong> Initial vs ongoing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare system architectures",
              "Identify suitable applications",
              "Understand cost implications",
              "Plan maintenance strategies",
              "Select appropriate systems",
              "Design hybrid solutions"
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
            Self-Contained Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Self-contained luminaires integrate the battery, charger, and control
              electronics within each fitting. They operate independently of other
              luminaires in the system.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple installation - mains only</li>
                  <li>No central battery room needed</li>
                  <li>Independent operation</li>
                  <li>Easy to add luminaires</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Battery replacement per unit</li>
                  <li>Distributed maintenance</li>
                  <li>Higher per-unit cost at scale</li>
                  <li>Individual testing required</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">NiCd/NiMH</p>
                <p className="text-white/90 text-xs">3-4 year life</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Li-ion</p>
                <p className="text-white/90 text-xs">5-7 year life</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">24 hours</p>
                <p className="text-white/90 text-xs">Full recharge time</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Central Battery Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Central battery systems locate all batteries in a dedicated room, with
              sub-circuits distributing DC power to simpler luminaires without integral
              batteries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Battery room:</strong> Dedicated space with ventilation</li>
                <li><strong>Charger:</strong> Maintains battery charge</li>
                <li><strong>Changeover:</strong> Switches to battery on mains fail</li>
                <li><strong>Sub-circuits:</strong> DC distribution to luminaires</li>
                <li><strong>Monitoring:</strong> Centralised fault detection</li>
              </ul>
            </div>

            <p>
              Central systems suit large installations where the infrastructure cost is
              offset by simpler luminaires and centralised maintenance. BS EN 50171
              specifies central power supply system requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selection depends on building size, maintenance capability, and total
              cost of ownership over the system lifetime.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Contained Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Small to medium buildings</li>
                  <li>Simple installations</li>
                  <li>Easy-access locations</li>
                  <li>Retrofit projects</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Large installations (100+ units)</li>
                  <li>High-rise buildings</li>
                  <li>Difficult access luminaires</li>
                  <li>Centralised maintenance teams</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Analysis Factors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Initial installation cost per luminaire</li>
                <li>Battery replacement costs over 20 years</li>
                <li>Testing and maintenance labour</li>
                <li>Central infrastructure space cost</li>
                <li>Monitoring system value</li>
                <li>End-of-life disposal costs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Selection Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Initial cost only:</strong> — Ignoring lifetime maintenance</li>
                <li><strong>Wrong scale choice:</strong> — Central for small, self-contained for large</li>
                <li><strong>Access ignored:</strong> — High-level self-contained units</li>
                <li><strong>No monitoring:</strong> — Missing failures until test</li>
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
              <p className="font-medium text-white mb-1">Self-Contained</p>
              <ul className="space-y-0.5">
                <li>Integral battery</li>
                <li>Mains supply only</li>
                <li>3-4 year battery life</li>
                <li>Simple installation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Central Battery</p>
              <ul className="space-y-0.5">
                <li>Dedicated battery room</li>
                <li>DC sub-circuits</li>
                <li>Centralised monitoring</li>
                <li>BS EN 50171 compliant</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-4-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule4Section2;