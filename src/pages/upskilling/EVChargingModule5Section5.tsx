import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m5s5-check1",
    question: "What is the primary challenge for EV charging in multi-unit developments?",
    options: ["Finding suitable locations", "Limited electrical supply capacity", "Planning permission", "Cable costs"],
    correctIndex: 1,
    explanation: "Multi-unit developments typically have limited electrical supply capacity shared across all units, requiring dynamic load management to enable charging without costly infrastructure upgrades."
  },
  {
    id: "evcharging-m5s5-check2",
    question: "Which load balancing strategy allows all vehicles to charge simultaneously?",
    options: ["Sequential charging", "Parallel load sharing", "Priority-based allocation", "Manual scheduling"],
    correctIndex: 1,
    explanation: "Parallel load sharing divides available power equally among all connected vehicles, allowing simultaneous charging at reduced individual power levels. This provides higher user satisfaction than sequential methods."
  },
  {
    id: "evcharging-m5s5-check3",
    question: "What billing model is most common for multi-tenancy EV charging?",
    options: ["Free electricity included in rent", "Cost per kWh consumed", "Annual flat fee", "Pay-per-session only"],
    correctIndex: 1,
    explanation: "Cost per kWh consumed is the most common and fairest billing model, accurately reflecting actual usage whilst ensuring residents only pay for what they use."
  }
];

const faqs = [
  {
    question: "Who is responsible for maintaining shared charging infrastructure?",
    answer: "Typically the building management company or residents' association. Maintenance contracts should cover electrical safety testing and software updates. Clear agreements should establish responsibility for repairs, upgrades, and electricity costs."
  },
  {
    question: "How do we handle disputes over charging access and costs?",
    answer: "Implement clear usage policies from the start, including booking systems, time limits, and fair billing practices. Consider a residents' committee to oversee charging policies and resolve disputes. Transparent usage reporting helps prevent conflicts."
  },
  {
    question: "Can visitors use the charging facilities?",
    answer: "This depends on building policies. Some developments offer visitor charging at higher rates or through temporary access codes. Consider separate visitor charging bays or time-limited access to prevent abuse of resident facilities."
  },
  {
    question: "How do we future-proof for increasing EV adoption?",
    answer: "Install infrastructure capable of easy expansion - oversized cable routes, spare ways in distribution boards, and scalable management systems. Consider conduit and ducting for future charging points even if not installing chargers initially."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 50-unit apartment block with 100A supply wants to install 10 × 7kW charging points. What load management approach is most appropriate?",
  options: [
    "No load management - install direct connections",
    "Sequential charging - one vehicle at a time",
    "Dynamic load management limiting total to 45kW",
    "Install only 3 charge points to stay within capacity"
  ],
  correctAnswer: 2,
  explanation: "Dynamic load management limiting total charging load to 45kW (65% of available capacity) allows all 10 charge points to operate simultaneously at an average of 4.5kW each, or full power when fewer vehicles are connected."
  }
];

const EVChargingModule5Section5 = () => {
  useSEO({
    title: "Multiple Unit Coordination | EV Charging Module 5.5",
    description: "Learn to manage EV charging infrastructure in multi-occupancy developments with intelligent coordination and fair allocation systems."
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
            <Link to="/electrician/upskilling/ev-charging-module-5">
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
            Multiple Unit Coordination
          </h1>
          <p className="text-white/80">
            Managing EV charging in flats and shared sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Challenge:</strong> Shared capacity across multiple users</li>
              <li><strong>Solution:</strong> Dynamic load balancing and scheduling</li>
              <li><strong>Billing:</strong> Per-kWh with RFID/app authentication</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Centralised controller, shared charging bays</li>
              <li><strong>Use:</strong> Booking systems, fair access policies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design load management for multiple points",
              "Implement fair allocation and billing",
              "Configure queue management systems",
              "Calculate multi-unit diversity factors",
              "Apply accessible charging requirements",
              "Plan capacity for future expansion"
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
            Load Management Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multi-unit developments require intelligent load management to share limited electrical
              capacity fairly among all users whilst preventing infrastructure overloads.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Sharing Algorithms</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Equal distribution:</strong> Power split equally</li>
                  <li><strong>First-come-first-served:</strong> Priority queuing</li>
                  <li><strong>Time-remaining:</strong> Optimise completion times</li>
                  <li><strong>Emergency override:</strong> Urgent need priority</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-Time Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Building electrical load tracking</li>
                  <li>Individual charger consumption</li>
                  <li>Grid supply capacity monitoring</li>
                  <li>Predictive demand forecasting</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Sequential</p>
                <p className="text-white text-xs">One at full power</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Parallel</p>
                <p className="text-white text-xs">Split equal share</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Intelligent</p>
                <p className="text-white text-xs">Departure optimised</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Billing and Access Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fair billing and secure access control are essential for successful shared charging
              installations, ensuring equitable cost distribution and preventing unauthorised use.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Authentication Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>RFID card/fob:</strong> Simple physical access</li>
                  <li><strong>Mobile app:</strong> Smartphone authentication</li>
                  <li><strong>PIN code:</strong> Numeric entry system</li>
                  <li><strong>Plug & Charge:</strong> Vehicle-to-charger ID</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Billing Models</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Per kWh:</strong> Fairest usage-based model</li>
                  <li><strong>Time-based:</strong> Per-hour charging fees</li>
                  <li><strong>Subscription:</strong> Monthly unlimited charging</li>
                  <li><strong>Overstay penalties:</strong> Discourage bay hogging</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fair Usage Policies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Time limits:</strong> Maximum 4-hour sessions for availability</li>
                <li><strong>Booking windows:</strong> Advance booking up to 7 days</li>
                <li><strong>Cancellation:</strong> 24-hour minimum notice required</li>
                <li><strong>Peak restrictions:</strong> Priority for essential charging</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Infrastructure Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful multi-unit charging requires careful planning of electrical capacity,
              physical infrastructure, and phased expansion strategies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacity Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Number of units/residents</li>
                  <li>Current EV ownership rate</li>
                  <li>Projected adoption growth</li>
                  <li>Existing supply capacity</li>
                  <li>Distribution board availability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phased Implementation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Phase 1:</strong> 20% capacity (immediate demand)</li>
                  <li><strong>Phase 2:</strong> 50% capacity (2-5 years)</li>
                  <li><strong>Phase 3:</strong> 80%+ capacity (5+ years)</li>
                  <li>Plan cable routes for future expansion</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Accessibility Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Minimum accessible charging bays (Building Regs Part M)</li>
                <li>Wheelchair-accessible connector height</li>
                <li>Voice guidance for visually impaired users</li>
                <li>Large emergency stop buttons</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Conduct resident EV ownership survey</li>
                <li>Assess current electrical infrastructure</li>
                <li>Obtain landlord/freeholder consent</li>
                <li>Review lease terms and service charges</li>
                <li>Select appropriate technology solution</li>
                <li>Design accessible, future-ready infrastructure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Challenges to Address</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Leaseholder consent:</strong> — complex approval processes</li>
                <li><strong>Service charge disputes:</strong> — fair cost allocation</li>
                <li><strong>Limited parking:</strong> — sharing vs dedicated bays</li>
                <li><strong>Cable routing:</strong> — listed building restrictions</li>
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
              <p className="font-medium text-white mb-1">Load Balancing Options</p>
              <ul className="space-y-0.5">
                <li>Sequential: Fastest per vehicle</li>
                <li>Parallel: Equal share for all</li>
                <li>Intelligent: Departure optimised</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Authentication Types</p>
              <ul className="space-y-0.5">
                <li>RFID cards/fobs</li>
                <li>Mobile app access</li>
                <li>PIN code entry</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-6">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule5Section5;