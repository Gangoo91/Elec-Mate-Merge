import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m2s2-check1",
    question: "What is the main advantage of a socketed EVSE system?",
    options: ["Faster charging speeds", "Universal compatibility with all vehicles", "Cheaper electricity rates", "Built-in payment system"],
    correctIndex: 1,
    explanation: "Socketed EVSE provides a charging outlet that accepts any compatible cable, offering universal compatibility with all EV connector types (Type 1, Type 2, etc.) since the user supplies their own cable."
  },
  {
    id: "evcharging-m2s2-check2",
    question: "What is a key disadvantage of tethered EVSE systems?",
    options: ["Cannot charge vehicles", "Higher maintenance requirements due to cable exposure", "Only works with DC charging", "Requires three-phase supply"],
    correctIndex: 1,
    explanation: "Tethered systems have permanently attached cables exposed to weather, UV radiation, and potential vandalism, resulting in higher maintenance requirements and cable replacement costs compared to socketed systems."
  },
  {
    id: "evcharging-m2s2-check3",
    question: "For a public charging installation, which EVSE type is typically preferred?",
    options: ["Socketed - lower cost", "Tethered - maximum user convenience", "Either type equally", "Mode 2 portable chargers"],
    correctIndex: 1,
    explanation: "Public charging installations almost universally use tethered systems (95% market share) because users expect immediate plug-and-charge capability without carrying their own cables."
  }
];

const faqs = [
  {
    question: "What's the typical cost difference between socketed and tethered EVSE?",
    answer: "Tethered systems typically cost £200-400 more initially, but when factoring in cable purchase for socketed systems (£150-300 for a quality Type 2 cable), the gap narrows. Over 5 years, tethered systems cost 20-30% more due to higher maintenance."
  },
  {
    question: "Can I convert a socketed EVSE to tethered or vice versa?",
    answer: "Generally no - the internal wiring and safety systems differ between types. Some manufacturers offer modular systems with interchangeable components, but these are the exception rather than the rule."
  },
  {
    question: "How long does a tethered cable typically last?",
    answer: "A quality tethered cable should last 5-10 years under normal domestic use. Commercial installations with heavy use may see cables degrade faster (3-5 years). Cable replacement typically costs £150-300."
  },
  {
    question: "Are there any safety differences between socketed and tethered?",
    answer: "Both types must meet the same safety standards (IEC 61851). Socketed systems may have marginally better contact reliability due to less wear, while tethered systems eliminate user error from poor cable connections."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer has a shared driveway where multiple households park, each with different EV models. What EVSE type would you recommend?",
  options: [
    "Tethered with Type 2 connector for convenience",
    "Socketed Type 2 for universal compatibility",
    "Tethered with dual connectors",
    "Mode 2 portable chargers only"
  ],
  correctAnswer: 1,
  explanation: "A socketed Type 2 outlet provides universal compatibility, allowing each household to use their own cable matching their vehicle's connector type (Type 1 or Type 2). This future-proofs the installation and avoids connector compatibility issues."
  }
];

const EVChargingModule2Section2 = () => {
  useSEO({
    title: "Socketed vs Tethered EVSE | EV Charging Module 2.2",
    description: "Compare socketed and tethered EV charging solutions, understanding advantages, applications, and selection criteria for different installation scenarios."
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
            <Link to="..">
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
            <span>Module 2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Socketed vs Tethered EVSE
          </h1>
          <p className="text-white/80">
            Choosing the right connection type for your installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Socketed:</strong> User supplies cable - universal compatibility</li>
              <li><strong>Tethered:</strong> Attached cable - maximum convenience</li>
              <li><strong>Choice:</strong> Based on location, users, and budget</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Socket outlet = socketed; hanging cable = tethered</li>
              <li><strong>Use:</strong> Public = tethered; multi-vehicle = socketed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish socketed from tethered systems",
              "Evaluate advantages of each type",
              "Match EVSE type to application",
              "Calculate total cost of ownership",
              "Advise customers on optimal choice",
              "Understand maintenance implications"
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
            Socketed EVSE Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Socketed EVSE provides a charging outlet (typically Type 2) into which users plug
              their own cable. The charger contains all control and safety systems but relies on
              the user to provide the connection to their vehicle.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Universal:</strong> Works with any cable/connector type</li>
                  <li><strong>Lower cost:</strong> £400-800 vs £600-1200 tethered</li>
                  <li><strong>Less vandalism:</strong> No exposed cable to damage</li>
                  <li><strong>Lower maintenance:</strong> No cable wear from weather</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>User cable required:</strong> £150-300 additional cost</li>
                  <li><strong>Less convenient:</strong> Must carry and connect cable</li>
                  <li><strong>Compatibility risk:</strong> User may have wrong cable</li>
                  <li><strong>Not public-friendly:</strong> Visitors unlikely to have cables</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Best Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Domestic installations with multiple vehicle types</li>
                <li>Workplace charging for employees (who carry cables)</li>
                <li>Secure locations with low vandalism risk</li>
                <li>Budget-conscious installations</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tethered EVSE Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tethered EVSE includes a permanently attached charging cable (typically 5-8m) with
              a vehicle connector. The cable includes all control conductors and is designed for
              frequent use with proper strain relief and weather protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Maximum convenience:</strong> Plug in and charge immediately</li>
                  <li><strong>Always available:</strong> No forgotten cables</li>
                  <li><strong>Public-ready:</strong> 95% of public chargers are tethered</li>
                  <li><strong>Guaranteed compatibility:</strong> Matched connector</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Higher cost:</strong> £200-400 premium over socketed</li>
                  <li><strong>Weather exposure:</strong> Cable degrades over time</li>
                  <li><strong>Vandalism target:</strong> Cable can be damaged or stolen</li>
                  <li><strong>Connector lock-in:</strong> Type 2 only (most common)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Protection Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Materials:</strong> UV-resistant TPU sheath, XLPE insulation</li>
                <li><strong>Temperature:</strong> Rated -30°C to +50°C operation</li>
                <li><strong>Security:</strong> Locking holster, tamper-resistant attachment</li>
                <li><strong>Durability:</strong> 10,000+ insertion cycles rated</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cost of Ownership Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When comparing EVSE types, consider total cost of ownership over 5+ years, not
              just initial purchase price. Maintenance, cable replacement, and operational
              factors significantly affect long-term costs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Socketed 5-Year TCO</p>
                <ul className="text-sm text-white space-y-1">
                  <li>EVSE unit: £600</li>
                  <li>User cable: £200</li>
                  <li>Installation: £300</li>
                  <li>5yr maintenance: £100</li>
                  <li className="font-semibold border-t border-white/20 pt-1">Total: ~£1,200</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tethered 5-Year TCO</p>
                <ul className="text-sm text-white space-y-1">
                  <li>EVSE unit: £900</li>
                  <li>User cable: £0</li>
                  <li>Installation: £350</li>
                  <li>5yr maintenance: £300</li>
                  <li className="font-semibold border-t border-white/20 pt-1">Total: ~£1,550</li>
                </ul>
              </div>
            </div>

            <p>
              Tethered systems typically cost 20-30% more over 5 years. However, for high-usage
              commercial scenarios, the convenience factor may justify the premium through better
              user experience and reduced support calls.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single vehicle, daily use → Tethered for convenience</li>
                <li>Multiple vehicles/users → Socketed for flexibility</li>
                <li>Public access → Tethered (industry standard)</li>
                <li>High vandalism risk → Socketed to protect cable</li>
                <li>Budget priority → Socketed with user-supplied cables</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong connector type:</strong> — Check customer's vehicle before specifying tethered</li>
                <li><strong>Ignoring maintenance:</strong> — Budget for annual cable inspection on tethered units</li>
                <li><strong>Public socketed:</strong> — Almost never appropriate for public/visitor charging</li>
                <li><strong>Short cable length:</strong> — Ensure 5-8m reach for vehicle positioning flexibility</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Socketed Best For</p>
              <ul className="space-y-0.5">
                <li>Multi-vehicle households</li>
                <li>Workplace employee charging</li>
                <li>Budget-conscious installations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Tethered Best For</p>
              <ul className="space-y-0.5">
                <li>Public charging stations</li>
                <li>Single-vehicle convenience</li>
                <li>Accessibility requirements</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule2Section2;