import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m1s2-check1",
    question: "What is the typical power rating for a domestic EV charger?",
    options: ["3.7kW", "7kW", "22kW", "50kW"],
    correctIndex: 1,
    explanation: "7kW is the most common domestic charger rating in the UK, providing a good balance between charging speed (4-6 hours for a typical EV) and installation cost on a single-phase supply."
  },
  {
    id: "evcharging-m1s2-check2",
    question: "Which of these is NOT typically required for commercial EV charging installations?",
    options: ["Load management systems", "Payment processing", "User authentication", "Battery replacement facilities"],
    correctIndex: 3,
    explanation: "Battery replacement facilities are separate from charging infrastructure. Commercial installations typically require load management, payment systems, and user authentication for public access."
  },
  {
    id: "evcharging-m1s2-check3",
    question: "What is the typical payback period for commercial EV charging installations?",
    options: ["6-12 months", "1-2 years", "3-7 years", "10-15 years"],
    correctIndex: 2,
    explanation: "Commercial EV charging typically has a payback period of 3-7 years depending on utilisation rates, tariffs, and installation costs. Higher utilisation locations may achieve faster payback."
  }
];

const faqs = [
  {
    question: "What's the main difference between domestic and commercial charging?",
    answer: "Domestic charging focuses on overnight use for a single household, typically 7kW single-phase. Commercial installations handle multiple users, require payment systems, load management, and higher power infrastructure (often three-phase up to 22kW per point or DC rapid charging)."
  },
  {
    question: "Do I need DNO notification for a domestic charger?",
    answer: "For loads ≤32A per phase, you can install under G98 with simple notification. For higher loads (>16A per phase in some cases), G99 applies requiring formal application. Always check current DNO requirements as these may vary."
  },
  {
    question: "What additional requirements apply to public charging installations?",
    answer: "Public installations require accessibility compliance (DDA), payment systems meeting OZEV regulations, adequate lighting, signage, GDPR compliance for user data, and often planning permission depending on location and scale."
  },
  {
    question: "Can a domestic installation be upgraded to commercial later?",
    answer: "It depends on the supply capacity and infrastructure. If designed with future expansion in mind (adequate supply, suitable cable routes), upgrading may be straightforward. Otherwise, significant infrastructure changes may be needed."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A workplace wants to install 10 × 7kW charging points. Using a diversity factor of 0.5, what maximum demand should be calculated?",
  options: [
    "35kW",
    "50kW",
    "70kW",
    "140kW"
  ],
  correctAnswer: 0,
  explanation: "Maximum demand = 10 × 7kW × 0.5 diversity = 35kW. A diversity factor accounts for the fact that not all chargers operate at full power simultaneously. The IET Code of Practice provides guidance on appropriate diversity factors."
  }
];

const EVChargingModule1Section2 = () => {
  useSEO({
    title: "Domestic vs Commercial EV Charging | EV Charging Module 1.2",
    description: "Understand the key differences between domestic and commercial EV charging installations including power requirements, costs, and compliance."
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
            <Link to="../ev-charging-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Domestic vs Commercial EV Charging
          </h1>
          <p className="text-white/80">
            Understanding the key differences and requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Domestic:</strong> 7kW typical, overnight charging, £800-£2,500</li>
              <li><strong>Commercial:</strong> 7-350kW, payment systems, £3k-£50k+</li>
              <li><strong>Key difference:</strong> Scale, management, and compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wallboxes (domestic), pedestals with RFID (commercial)</li>
              <li><strong>Use:</strong> IET Code of Practice for design and sizing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish domestic from commercial requirements",
              "Identify appropriate charging solutions",
              "Understand power and infrastructure needs",
              "Recognise cost and business considerations",
              "Apply regulations to each installation type",
              "Plan for future expansion"
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
            Domestic EV Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Domestic charging focuses on overnight charging for private use. Most installations
              use 7kW single-phase chargers which provide adequate charging overnight for daily use.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Power:</strong> 3.7kW - 22kW (typically 7kW)</li>
                  <li><strong>Supply:</strong> 230V single / 400V three-phase</li>
                  <li><strong>Current:</strong> 16A - 32A</li>
                  <li><strong>Connector:</strong> Type 2 (universal)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Use pattern:</strong> Overnight, predictable</li>
                  <li><strong>Users:</strong> Household members only</li>
                  <li><strong>Authentication:</strong> Simple or none</li>
                  <li><strong>Maintenance:</strong> Minimal, user responsibility</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Costs (Typical):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>7kW unit:</strong> £500-£800</li>
                <li><strong>Installation:</strong> £300-£600</li>
                <li><strong>Materials/cable:</strong> £100-£300</li>
                <li><strong>Total:</strong> £900-£1,700 (before any grants)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Commercial EV Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial installations serve multiple users with higher power requirements,
              payment systems, and load management. They range from workplace charging to
              public rapid charging hubs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Power:</strong> 7kW - 22kW</li>
                  <li><strong>Users:</strong> Employees and visitors</li>
                  <li><strong>Duration:</strong> 8+ hours (working day)</li>
                  <li><strong>Payment:</strong> Free/subsidised typically</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Public/Destination</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Power:</strong> 7kW - 350kW</li>
                  <li><strong>Users:</strong> General public</li>
                  <li><strong>Duration:</strong> 30min - 4 hours</li>
                  <li><strong>Payment:</strong> Pay-per-use</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Commercial Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Load management:</strong> Static or dynamic power allocation</li>
                <li><strong>Payment systems:</strong> RFID, app, contactless</li>
                <li><strong>User authentication:</strong> Access control and billing</li>
                <li><strong>Monitoring:</strong> Remote diagnostics and maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Process Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The installation process differs significantly between domestic and commercial
              projects in terms of planning, infrastructure, and commissioning requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Site survey and supply assessment</li>
                  <li>2. DNO notification (if required)</li>
                  <li>3. Install dedicated circuit and charger</li>
                  <li>4. Test, commission, and certify</li>
                  <li>5. Customer handover with documentation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Load analysis and grid assessment</li>
                  <li>2. Planning permission (if needed)</li>
                  <li>3. Supply upgrade/infrastructure works</li>
                  <li>4. Install chargers and management systems</li>
                  <li>5. Commission, integrate, and train staff</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cost and Business Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the financial aspects helps select appropriate solutions and
              set realistic expectations for both installers and clients.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Economics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Running cost:</strong> 14-35p/kWh (home tariff)</li>
                  <li><strong>Smart tariff savings:</strong> £200-£500/year</li>
                  <li><strong>vs petrol:</strong> Typically 3-4x cheaper per mile</li>
                  <li><strong>Maintenance:</strong> £50-£100/year</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Economics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Capital per point:</strong> £5,000-£10,000 (22kW)</li>
                  <li><strong>Charging tariff:</strong> 25-45p/kWh</li>
                  <li><strong>Utilisation rate:</strong> 20-60%</li>
                  <li><strong>Payback:</strong> 3-7 years typical</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always assess supply capacity before specifying equipment</li>
                <li>Consider future expansion - specify adequate infrastructure now</li>
                <li>For commercial, calculate diversity factors per IET CoP</li>
                <li>Include load management for multiple charging points</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underestimating load:</strong> — Account for 100% capacity simultaneously possible</li>
                <li><strong>No expansion planning:</strong> — Second EV common within 2-3 years</li>
                <li><strong>Ignoring accessibility:</strong> — DDA applies to public installations</li>
                <li><strong>Missing payment requirements:</strong> — OZEV mandates for public chargers</li>
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
              <p className="font-medium text-white mb-1">Domestic</p>
              <ul className="space-y-0.5">
                <li>7kW typical, £900-£1,700</li>
                <li>Single-phase, overnight use</li>
                <li>Simple authentication</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Commercial</p>
              <ul className="space-y-0.5">
                <li>7-350kW, £3k-£50k+ per point</li>
                <li>Load management required</li>
                <li>Payment and RFID systems</li>
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
            <Link to="../ev-charging-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule1Section2;